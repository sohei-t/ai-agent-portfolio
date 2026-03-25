"""SessionStateManager -- per-session state tracking.

Keeps track of the current state, last capture timestamp, reviewer
pane information, and connected SSE clients for each session.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Optional

from response_detector import ResponseDetector, SessionState

# Maximum number of concurrent SSE connections per session.
MAX_SSE_CONNECTIONS_PER_SESSION: int = 5


@dataclass
class ReviewerInfo:
    """Metadata about an active reviewer pane."""

    pane_index: int = 1
    name: str = "peer-reviewer"
    active: bool = False
    detector: Optional[ResponseDetector] = None


@dataclass
class SessionInfo:
    """Runtime state for a single tmux session."""

    name: str
    state: SessionState = SessionState.IDLE
    detector: ResponseDetector = field(default_factory=ResponseDetector)
    reviewer: ReviewerInfo = field(default_factory=ReviewerInfo)
    last_capture: str = ""
    last_capture_time: Optional[datetime] = None
    sse_queues: list[asyncio.Queue[dict]] = field(default_factory=list)

    @property
    def has_reviewer(self) -> bool:
        return self.reviewer.active

    def to_dict(self) -> dict:
        """Serialise to a JSON-friendly dictionary."""
        return {
            "name": self.name,
            "state": self.state.value,
            "has_reviewer": self.has_reviewer,
        }


class SessionStateManager:
    """Central registry for per-session state."""

    def __init__(self) -> None:
        self._sessions: dict[str, SessionInfo] = {}

    # ------------------------------------------------------------------
    # Session CRUD
    # ------------------------------------------------------------------

    def get(self, name: str) -> Optional[SessionInfo]:
        """Return the :class:`SessionInfo` for *name*, or ``None``."""
        return self._sessions.get(name)

    def get_or_create(self, name: str) -> SessionInfo:
        """Return the :class:`SessionInfo` for *name*, creating it if needed."""
        if name not in self._sessions:
            self._sessions[name] = SessionInfo(name=name)
        return self._sessions[name]

    def remove(self, name: str) -> None:
        """Remove session *name* from the registry."""
        self._sessions.pop(name, None)

    def all_sessions(self) -> list[SessionInfo]:
        """Return all tracked sessions."""
        return list(self._sessions.values())

    def session_names(self) -> list[str]:
        """Return all tracked session names."""
        return list(self._sessions.keys())

    # ------------------------------------------------------------------
    # State updates
    # ------------------------------------------------------------------

    def update_state(self, name: str, state: SessionState) -> Optional[SessionState]:
        """Update the state for *name*.

        Returns the *previous* state if it changed, or ``None`` if
        the state is unchanged.
        """
        info = self._sessions.get(name)
        if info is None:
            return None
        previous = info.state
        if previous == state:
            return None
        info.state = state
        return previous

    def update_capture(self, name: str, content: str) -> None:
        """Store the latest capture content for *name*."""
        info = self._sessions.get(name)
        if info is not None:
            info.last_capture = content
            info.last_capture_time = datetime.now(timezone.utc)

    # ------------------------------------------------------------------
    # Reviewer management
    # ------------------------------------------------------------------

    def set_reviewer_active(self, session: str, active: bool, pane: int = 1) -> None:
        """Mark the reviewer pane as active/inactive."""
        info = self._sessions.get(session)
        if info is not None:
            info.reviewer.active = active
            info.reviewer.pane_index = pane
            if active and info.reviewer.detector is None:
                info.reviewer.detector = ResponseDetector()
            if not active:
                info.reviewer.detector = None

    # ------------------------------------------------------------------
    # SSE subscriber management
    # ------------------------------------------------------------------

    def add_sse_queue(self, session: str) -> asyncio.Queue[dict]:
        """Create and register a new SSE queue for *session*.

        Returns the queue so the SSE endpoint can consume events from it.

        Raises:
            RuntimeError: If the session already has
                :data:`MAX_SSE_CONNECTIONS_PER_SESSION` active SSE
                connections.
        """
        info = self.get_or_create(session)
        if len(info.sse_queues) >= MAX_SSE_CONNECTIONS_PER_SESSION:
            raise RuntimeError(
                f"SSE connection limit ({MAX_SSE_CONNECTIONS_PER_SESSION}) "
                f"reached for session '{session}'"
            )
        queue: asyncio.Queue[dict] = asyncio.Queue(maxsize=256)
        info.sse_queues.append(queue)
        return queue

    def remove_sse_queue(self, session: str, queue: asyncio.Queue[dict]) -> None:
        """Unregister an SSE queue for *session*."""
        info = self._sessions.get(session)
        if info is not None:
            try:
                info.sse_queues.remove(queue)
            except ValueError:
                pass

    async def push_sse_event(self, session: str, event: dict) -> None:
        """Push *event* to all SSE subscribers for *session*."""
        info = self._sessions.get(session)
        if info is None:
            return
        dead_queues: list[asyncio.Queue[dict]] = []
        for q in info.sse_queues:
            try:
                q.put_nowait(event)
            except asyncio.QueueFull:
                dead_queues.append(q)
        for q in dead_queues:
            try:
                info.sse_queues.remove(q)
            except ValueError:
                pass
