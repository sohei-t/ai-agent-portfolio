"""Web Claude Bridge v2 -- FastAPI main server.

Provides:
* REST API for session management
* SSE per-session output stream (diff-only)
* WebSocket for commands (send / approve / deny / ask_peer / refresh)
* Background polling (capture-pane every ~1 s) with diff + state detection
"""

from __future__ import annotations

import asyncio
import json
import logging
import re
import time
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import AsyncGenerator

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from sse_starlette.sse import EventSourceResponse

from async_tmux_manager import AsyncTmuxManager
from diff_engine import DiffEngine
from response_detector import SessionState
from session_state import SessionStateManager

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("bridge")

# ---------------------------------------------------------------------------
# Globals
# ---------------------------------------------------------------------------
# NOTE: The following module-level singletons assume a **single-worker**
# deployment (e.g. ``uvicorn --workers 1``).  Running multiple workers
# will result in each worker maintaining independent state, leading to
# inconsistent behaviour.  Do NOT scale horizontally without first
# migrating state to a shared store (e.g. Redis).
# ---------------------------------------------------------------------------

tmux = AsyncTmuxManager(capture_lines=200)
sessions = SessionStateManager()
diff_engine = DiffEngine()

_poll_tasks: dict[str, asyncio.Task] = {}  # type: ignore[type-arg]
_start_time: float = 0.0
_ws_clients: list[WebSocket] = []

# Interval (seconds) between capture polls
POLL_INTERVAL: float = 1.0

# Reviewer initialisation wait (seconds)
REVIEWER_INIT_WAIT: float = 15.0

# SSE heartbeat interval (seconds)
SSE_HEARTBEAT_INTERVAL: float = 15.0

# Session name validation pattern
_SESSION_NAME_RE = re.compile(r"^[a-zA-Z0-9\-]+$")


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------


class CreateSessionRequest(BaseModel):
    name: str = Field(..., pattern=r"^[a-zA-Z0-9\-]+$")
    cwd: str = Field(default="~")
    launch_claude: bool = True


class SendTextRequest(BaseModel):
    text: str = Field(..., max_length=50000)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


async def _broadcast_ws(message: dict) -> None:
    """Send *message* to all connected WebSocket clients."""
    dead: list[WebSocket] = []
    payload = json.dumps(message)
    for ws in _ws_clients:
        try:
            await ws.send_text(payload)
        except Exception:
            dead.append(ws)
    for ws in dead:
        try:
            _ws_clients.remove(ws)
        except ValueError:
            pass


# ---------------------------------------------------------------------------
# Background polling
# ---------------------------------------------------------------------------


async def _capture_loop(session_name: str) -> None:
    """Poll ``capture-pane -e`` for *session_name* and push diffs via SSE."""
    logger.info("Starting capture loop for session '%s'", session_name)

    while True:
        await asyncio.sleep(POLL_INTERVAL)

        info = sessions.get(session_name)
        if info is None:
            break

        # Check session still exists
        if not await tmux.session_exists(session_name):
            info.detector.set_disconnected()
            prev = sessions.update_state(session_name, SessionState.DISCONNECTED)
            if prev is not None:
                await sessions.push_sse_event(session_name, {
                    "event": "status",
                    "data": {
                        "session": session_name,
                        "state": "disconnected",
                        "previous_state": prev.value,
                        "timestamp": _now_iso(),
                    },
                })
                await sessions.push_sse_event(session_name, {
                    "event": "error",
                    "data": {
                        "code": "session_crashed",
                        "message": f"Session '{session_name}' has crashed",
                        "timestamp": _now_iso(),
                    },
                })
            break

        # Capture main pane
        content = await tmux.capture(session_name, escape=True)
        sessions.update_capture(session_name, content)

        # Compute diff
        diff_text = diff_engine.compute(session_name, content)

        # Detect state
        new_state = info.detector.detect_state(content)
        prev_state = sessions.update_state(session_name, new_state)

        # Push output diff
        if diff_text is not None:
            await sessions.push_sse_event(session_name, {
                "event": "output",
                "data": {
                    "session": session_name,
                    "diff": diff_text,
                    "timestamp": _now_iso(),
                },
            })

        # Push state change
        if prev_state is not None:
            await sessions.push_sse_event(session_name, {
                "event": "status",
                "data": {
                    "session": session_name,
                    "state": new_state.value,
                    "previous_state": prev_state.value,
                    "timestamp": _now_iso(),
                },
            })

        # --- Reviewer pane polling ---
        if info.has_reviewer:
            reviewer_content = await tmux.capture_pane(
                session_name, pane=info.reviewer.pane_index, escape=True
            )
            reviewer_key = f"{session_name}:reviewer"
            reviewer_diff = diff_engine.compute(reviewer_key, reviewer_content)

            if reviewer_diff is not None:
                await sessions.push_sse_event(session_name, {
                    "event": "reviewer_output",
                    "data": {
                        "session": session_name,
                        "reviewer": info.reviewer.name,
                        "diff": reviewer_diff,
                        "timestamp": _now_iso(),
                    },
                })

            # Detect reviewer completion
            if info.reviewer.detector is not None:
                rev_state = info.reviewer.detector.detect_state(reviewer_content)
                if rev_state == SessionState.IDLE:
                    await sessions.push_sse_event(session_name, {
                        "event": "notification",
                        "data": {
                            "kind": "review_complete",
                            "message": "Reviewer has finished",
                            "severity": "info",
                            "timestamp": _now_iso(),
                        },
                    })
                    await _broadcast_ws({
                        "type": "notification",
                        "kind": "review_complete",
                        "message": "Reviewer has finished the review",
                        "severity": "info",
                        "session": session_name,
                        "timestamp": _now_iso(),
                    })

    logger.info("Capture loop ended for session '%s'", session_name)


def _ensure_poll_task(session_name: str) -> None:
    """Ensure a background polling task is running for *session_name*."""
    task = _poll_tasks.get(session_name)
    if task is None or task.done():
        _poll_tasks[session_name] = asyncio.create_task(
            _capture_loop(session_name)
        )


# ---------------------------------------------------------------------------
# Ask-peer handler
# ---------------------------------------------------------------------------


async def _handle_ask_peer(session_name: str, question: str) -> bool:
    """Launch a reviewer in a split pane and send *question*.

    Returns ``True`` on success.
    """
    info = sessions.get(session_name)
    if info is None or info.has_reviewer:
        return False

    # Split window horizontally and launch Claude reviewer
    cmd = "claude --name peer-reviewer --dangerously-skip-permissions"
    ok = await tmux.split_window_horizontal(session_name, cmd, percent=50)
    if not ok:
        return False

    sessions.set_reviewer_active(session_name, True, pane=1)

    # Notify frontend
    await sessions.push_sse_event(session_name, {
        "event": "notification",
        "data": {
            "kind": "review_started",
            "message": "Reviewer launched",
            "severity": "info",
            "timestamp": _now_iso(),
        },
    })

    # Wait for reviewer to initialise
    await asyncio.sleep(REVIEWER_INIT_WAIT)

    # Send the question
    await tmux.send_to_pane(session_name, pane=1, text=question)

    return True


# ---------------------------------------------------------------------------
# App lifecycle
# ---------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    global _start_time
    _start_time = time.monotonic()
    logger.info("Bridge server starting")

    # Discover existing tmux sessions
    existing = await tmux.list_sessions()
    for name in existing:
        sessions.get_or_create(name)
        _ensure_poll_task(name)

    yield

    # Cancel all poll tasks
    for task in _poll_tasks.values():
        task.cancel()
    for task in _poll_tasks.values():
        try:
            await task
        except asyncio.CancelledError:
            pass
    logger.info("Bridge server stopped")


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

app = FastAPI(title="Web Claude Bridge v2", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# REST endpoints
# ---------------------------------------------------------------------------


@app.post("/api/sessions")
async def list_sessions() -> JSONResponse:
    """List all tmux sessions with their current state."""
    try:
        names = await tmux.list_sessions()
    except Exception:
        return JSONResponse(
            status_code=503,
            content={"error": "tmux_not_running", "message": "tmux server is not running"},
        )

    # Ensure state tracking for each discovered session
    for name in names:
        sessions.get_or_create(name)
        _ensure_poll_task(name)

    result = []
    for name in names:
        info = sessions.get(name)
        if info:
            result.append(info.to_dict())

    return JSONResponse(content={"sessions": result})


@app.post("/api/sessions/create")
async def create_session(req: CreateSessionRequest) -> JSONResponse:
    """Create a new tmux session (optionally launching Claude Code)."""
    if not _SESSION_NAME_RE.match(req.name):
        return JSONResponse(
            status_code=400,
            content={"error": "invalid_name", "message": "Session name must be alphanumeric with hyphens only"},
        )

    if await tmux.session_exists(req.name):
        return JSONResponse(
            status_code=409,
            content={"error": "session_exists", "message": f"Session '{req.name}' already exists"},
        )

    command = "claude" if req.launch_claude else None
    ok = await tmux.create_session(req.name, cwd=req.cwd, command=command)
    if not ok:
        return JSONResponse(
            status_code=500,
            content={"error": "create_failed", "message": "Failed to create tmux session"},
        )

    sessions.get_or_create(req.name)
    _ensure_poll_task(req.name)

    return JSONResponse(
        status_code=201,
        content={"name": req.name, "state": "idle", "message": "Session created successfully"},
    )


@app.post("/api/sessions/{name}/send")
async def send_text(name: str, req: SendTextRequest) -> JSONResponse:
    """Send text to a tmux session."""
    if not await tmux.session_exists(name):
        return JSONResponse(
            status_code=404,
            content={"error": "session_not_found", "message": f"Session '{name}' does not exist"},
        )

    method = "send-keys" if len(req.text) < 500 else "load-buffer"
    ok = await tmux.send(name, req.text)
    if not ok:
        return JSONResponse(
            status_code=500,
            content={"error": "send_failed", "message": "Failed to send text"},
        )

    # Reset detector after sending
    info = sessions.get(name)
    if info:
        info.detector.reset()

    return JSONResponse(content={"success": True, "session": name, "method": method})


@app.get("/api/sessions/{name}/capture")
async def capture_session(
    name: str,
    lines: int = Query(default=200, ge=1, le=5000),
    escape: bool = Query(default=True),
) -> JSONResponse:
    """Capture the current pane content of a session."""
    if not await tmux.session_exists(name):
        return JSONResponse(
            status_code=404,
            content={"error": "session_not_found", "message": f"Session '{name}' does not exist"},
        )

    content = await tmux.capture(name, lines=lines, escape=escape)

    info = sessions.get(name)
    state = info.state.value if info else "working"

    return JSONResponse(content={
        "session": name,
        "content": content,
        "lines": lines,
        "state": state,
        "timestamp": _now_iso(),
    })


@app.get("/api/health")
async def health_check() -> JSONResponse:
    """Server health check."""
    try:
        names = await tmux.list_sessions()
        tmux_ok = True
    except Exception:
        names = []
        tmux_ok = False

    uptime = time.monotonic() - _start_time if _start_time else 0

    return JSONResponse(content={
        "status": "healthy",
        "tmux_available": tmux_ok,
        "active_sessions": len(names),
        "uptime_seconds": round(uptime, 1),
    })


# ---------------------------------------------------------------------------
# SSE endpoint
# ---------------------------------------------------------------------------


@app.get("/api/sessions/{name}/stream")
async def session_stream(
    name: str,
    full_initial: bool = Query(default=True),
) -> EventSourceResponse:
    """Per-session SSE output stream (diff-only after initial full capture)."""

    async def event_generator() -> AsyncGenerator[dict, None]:
        # Register queue (may raise RuntimeError if limit reached)
        try:
            queue = sessions.add_sse_queue(name)
        except RuntimeError as exc:
            yield {
                "event": "error",
                "data": json.dumps({
                    "code": "sse_limit_reached",
                    "message": str(exc),
                    "timestamp": _now_iso(),
                }),
            }
            return

        try:
            # Send initial full capture if requested
            if full_initial:
                info = sessions.get(name)
                content = ""
                if info and info.last_capture:
                    content = info.last_capture
                else:
                    content = await tmux.capture(name, escape=True)

                yield {
                    "event": "full_capture",
                    "data": json.dumps({
                        "session": name,
                        "content": content,
                        "total_lines": len(content.splitlines()),
                        "timestamp": _now_iso(),
                    }),
                }

                # Also send current state
                if info:
                    yield {
                        "event": "status",
                        "data": json.dumps({
                            "session": name,
                            "state": info.state.value,
                            "previous_state": info.state.value,
                            "timestamp": _now_iso(),
                        }),
                    }

            # Ensure polling is running
            _ensure_poll_task(name)

            last_heartbeat = time.monotonic()

            while True:
                try:
                    event = await asyncio.wait_for(
                        queue.get(), timeout=SSE_HEARTBEAT_INTERVAL
                    )
                    yield {
                        "event": event["event"],
                        "data": json.dumps(event["data"]),
                    }
                    last_heartbeat = time.monotonic()
                except asyncio.TimeoutError:
                    # Send heartbeat
                    yield {
                        "event": "heartbeat",
                        "data": json.dumps({"timestamp": _now_iso()}),
                    }
                    last_heartbeat = time.monotonic()

        finally:
            sessions.remove_sse_queue(name, queue)

    return EventSourceResponse(event_generator())


# ---------------------------------------------------------------------------
# WebSocket endpoint
# ---------------------------------------------------------------------------


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> None:
    """WebSocket endpoint for commands (send / approve / deny / ask_peer)."""
    # --- Origin validation (Critical: reject non-local origins) ---
    origin = websocket.headers.get("origin", "")
    allowed_origins = {
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    }
    if origin and origin not in allowed_origins:
        logger.warning("WebSocket connection rejected: origin=%s", origin)
        await websocket.close(code=4003, reason="Forbidden origin")
        return

    await websocket.accept()
    _ws_clients.append(websocket)
    logger.info("WebSocket client connected (total: %d)", len(_ws_clients))

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                msg = json.loads(raw)
            except json.JSONDecodeError:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "code": "invalid_message",
                    "message": "Malformed JSON",
                    "timestamp": _now_iso(),
                }))
                continue

            msg_type = msg.get("type", "")
            msg_id = msg.get("id", "")
            session_name = msg.get("session", "")

            # --- ping ---
            if msg_type == "ping":
                await websocket.send_text(json.dumps({
                    "type": "pong",
                    "timestamp": _now_iso(),
                }))
                continue

            # --- refresh ---
            if msg_type == "refresh":
                try:
                    names = await tmux.list_sessions()
                except Exception:
                    names = []
                for n in names:
                    sessions.get_or_create(n)
                    _ensure_poll_task(n)

                sess_list = []
                for n in names:
                    info = sessions.get(n)
                    if info:
                        sess_list.append(info.to_dict())

                await websocket.send_text(json.dumps({
                    "type": "sessions_list",
                    "sessions": sess_list,
                    "timestamp": _now_iso(),
                }))
                continue

            # --- send ---
            if msg_type == "send":
                text = msg.get("text", "")
                if not session_name or not text:
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "id": msg_id,
                        "code": "invalid_message",
                        "message": "Missing session or text",
                        "timestamp": _now_iso(),
                    }))
                    continue

                ok = await tmux.send(session_name, text)
                if ok:
                    info = sessions.get(session_name)
                    if info:
                        info.detector.reset()
                await websocket.send_text(json.dumps({
                    "type": "ack",
                    "id": msg_id,
                    "success": ok,
                    "timestamp": _now_iso(),
                }))
                if not ok:
                    await _broadcast_ws({
                        "type": "notification",
                        "kind": "send_failed",
                        "message": f"Failed to send text to '{session_name}'",
                        "severity": "error",
                        "session": session_name,
                        "timestamp": _now_iso(),
                    })
                continue

            # --- approve ---
            if msg_type == "approve":
                ok = await tmux.send(session_name, "y")
                if ok:
                    info = sessions.get(session_name)
                    if info:
                        info.detector.reset()
                await websocket.send_text(json.dumps({
                    "type": "ack",
                    "id": msg_id,
                    "success": ok,
                    "timestamp": _now_iso(),
                }))
                continue

            # --- deny ---
            if msg_type == "deny":
                ok = await tmux.send(session_name, "n")
                if ok:
                    info = sessions.get(session_name)
                    if info:
                        info.detector.reset()
                await websocket.send_text(json.dumps({
                    "type": "ack",
                    "id": msg_id,
                    "success": ok,
                    "timestamp": _now_iso(),
                }))
                continue

            # --- ask_peer ---
            if msg_type == "ask_peer":
                question = msg.get("question", "")
                if not session_name or not question:
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "id": msg_id,
                        "code": "invalid_message",
                        "message": "Missing session or question",
                        "timestamp": _now_iso(),
                    }))
                    continue

                info = sessions.get(session_name)
                if info and info.has_reviewer:
                    await websocket.send_text(json.dumps({
                        "type": "error",
                        "id": msg_id,
                        "code": "reviewer_active",
                        "message": "Reviewer already running for this session",
                        "timestamp": _now_iso(),
                    }))
                    continue

                # Launch in background so we don't block the WS
                asyncio.create_task(_handle_ask_peer(session_name, question))
                await websocket.send_text(json.dumps({
                    "type": "ack",
                    "id": msg_id,
                    "success": True,
                    "timestamp": _now_iso(),
                }))
                continue

            # --- subscribe (SSE fallback -- no-op for WS) ---
            if msg_type == "subscribe":
                await websocket.send_text(json.dumps({
                    "type": "ack",
                    "id": msg_id,
                    "success": True,
                    "timestamp": _now_iso(),
                }))
                continue

            # --- unknown ---
            await websocket.send_text(json.dumps({
                "type": "error",
                "id": msg_id,
                "code": "invalid_message",
                "message": f"Unknown message type: {msg_type}",
                "timestamp": _now_iso(),
            }))

    except WebSocketDisconnect:
        pass
    except Exception as exc:
        logger.warning("WebSocket error: %s", exc)
    finally:
        try:
            _ws_clients.remove(websocket)
        except ValueError:
            pass
        logger.info("WebSocket client disconnected (total: %d)", len(_ws_clients))
