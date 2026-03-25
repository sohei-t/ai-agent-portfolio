"""DiffEngine -- computes line-level diffs between terminal captures.

Only *new* lines (appended content) are extracted so that the SSE
stream sends minimal data to the frontend.
"""

from __future__ import annotations

from typing import Optional


class DiffEngine:
    """Computes line-level diffs between consecutive terminal captures.

    For each session the engine remembers the previous capture and, on
    the next call to :meth:`compute`, returns only the lines that are
    new relative to the previous state.
    """

    def __init__(self) -> None:
        self._previous: dict[str, str] = {}

    def compute(self, session: str, current: str) -> Optional[str]:
        """Compare *current* capture with the stored previous for *session*.

        Returns only new lines (appended content), or ``None`` if
        nothing changed.
        """
        previous = self._previous.get(session, "")
        self._previous[session] = current

        if current == previous:
            return None

        prev_lines = previous.splitlines()
        curr_lines = current.splitlines()

        # Fast path: previous is empty -- return everything
        if not prev_lines:
            return current

        # Strategy: find the last line of previous in current,
        # then return everything after it.
        anchor = prev_lines[-1]
        for i in range(len(curr_lines) - 1, -1, -1):
            if curr_lines[i] == anchor:
                new_lines = curr_lines[i + 1 :]
                if new_lines:
                    return "\n".join(new_lines)
                return None

        # No anchor found (terminal scrolled significantly).
        # Return full content to let the frontend resync.
        return current

    def get_previous(self, session: str) -> str:
        """Return the last stored capture for *session* (or ``""``).

        This is useful when a new SSE client connects and needs the
        full initial content.
        """
        return self._previous.get(session, "")

    def reset(self, session: str) -> None:
        """Clear stored state for *session*."""
        self._previous.pop(session, None)

    def reset_all(self) -> None:
        """Clear all stored state."""
        self._previous.clear()
