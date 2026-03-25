"""ResponseDetector -- FSM-based state detector for Claude Code sessions.

Adapted from slack-bridge-for-claude-code ``bot/orchestrator.py``
ResponseDetector with improvements for the web bridge:

* Pure FSM (no blocking waits -- state is updated per poll)
* Debounced transitions (``stable_count`` consecutive detections)
* Separate idle / working / waiting / disconnected states
"""

from __future__ import annotations

import re
from enum import Enum


# ---------------------------------------------------------------------------
# ANSI helpers
# ---------------------------------------------------------------------------

_ANSI_RE = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")


def strip_ansi(text: str) -> str:
    """Remove ANSI escape sequences from *text*."""
    return _ANSI_RE.sub("", text)


# ---------------------------------------------------------------------------
# Session state enum
# ---------------------------------------------------------------------------


class SessionState(str, Enum):
    """Possible states for a Claude Code session."""

    IDLE = "idle"
    WORKING = "working"
    WAITING = "waiting"
    DISCONNECTED = "disconnected"


# ---------------------------------------------------------------------------
# ResponseDetector
# ---------------------------------------------------------------------------


class ResponseDetector:
    """FSM-based state detector for Claude Code sessions.

    On each call to :meth:`detect_state`, the detector analyses the raw
    pane content and applies debouncing so that a state change only
    occurs after ``stable_count`` consecutive detections of the new state.
    """

    # Prompt patterns -- Claude Code ready for input
    PROMPT_PATTERNS: tuple[str, ...] = ("❯",)

    # Permission patterns -- Claude asking for approval
    PERMISSION_PATTERNS: tuple[str, ...] = (
        "allow",
        "(y/n)",
        "do you want",
        "permit",
        "? (y)",
    )

    def __init__(self, stable_count: int = 2) -> None:
        """Initialise the detector.

        Args:
            stable_count: Number of consecutive polls that must agree
                          before a state transition is accepted.
        """
        self.stable_count: int = stable_count
        self._consecutive_idle: int = 0
        self._consecutive_waiting: int = 0
        self._current_state: SessionState = SessionState.IDLE

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def detect_state(self, pane_content: str) -> SessionState:
        """Analyse *pane_content* and return the detected state.

        Uses debouncing: the state only changes after ``stable_count``
        consecutive detections of the new state.
        """
        raw_state = self._analyse_content(pane_content)

        if raw_state == SessionState.IDLE:
            self._consecutive_idle += 1
            self._consecutive_waiting = 0
            if self._consecutive_idle >= self.stable_count:
                self._current_state = SessionState.IDLE
        elif raw_state == SessionState.WAITING:
            self._consecutive_waiting += 1
            self._consecutive_idle = 0
            if self._consecutive_waiting >= self.stable_count:
                self._current_state = SessionState.WAITING
        else:  # WORKING
            self._consecutive_idle = 0
            self._consecutive_waiting = 0
            self._current_state = SessionState.WORKING

        return self._current_state

    @property
    def current_state(self) -> SessionState:
        """Return the current debounced state without re-evaluating."""
        return self._current_state

    def reset(self) -> None:
        """Reset FSM counters (call after sending text to a session)."""
        self._consecutive_idle = 0
        self._consecutive_waiting = 0
        self._current_state = SessionState.WORKING

    def set_disconnected(self) -> None:
        """Mark the session as disconnected."""
        self._consecutive_idle = 0
        self._consecutive_waiting = 0
        self._current_state = SessionState.DISCONNECTED

    # ------------------------------------------------------------------
    # Internal analysis
    # ------------------------------------------------------------------

    def _analyse_content(self, pane: str) -> SessionState:
        """Single-poll state analysis (no debouncing applied here)."""
        clean = strip_ansi(pane)
        lines = [ln for ln in clean.splitlines() if ln.strip()]

        if not lines:
            return SessionState.WORKING

        # Check last 5 lines for permission patterns
        tail = "\n".join(lines[-5:]).lower()
        if any(p in tail for p in self.PERMISSION_PATTERNS):
            return SessionState.WAITING

        # Check last 10 lines for prompt pattern
        for line in lines[-10:]:
            stripped = strip_ansi(line).strip()
            if len(stripped) <= 80 and any(
                p in stripped for p in self.PROMPT_PATTERNS
            ):
                return SessionState.IDLE

        return SessionState.WORKING
