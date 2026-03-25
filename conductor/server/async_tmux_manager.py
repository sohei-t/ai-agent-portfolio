"""AsyncTmuxManager -- async wrapper for tmux subprocess operations.

All methods use ``asyncio.create_subprocess_exec`` for non-blocking I/O.
Adapted from slack-bridge-for-claude-code ``bot/bot.py`` TmuxManager.
"""

from __future__ import annotations

import asyncio
import os
import re
import tempfile
from typing import Optional

# Pattern matching dangerous shell meta-characters that could allow
# command injection via tmux send-keys.  We block semicolons, pipes,
# logical operators (&&, ||), backtick execution, and $() sub-shells
# when they appear *outside* of normal prose / code content that is
# being sent to Claude Code as a prompt.
#
# NOTE: We only apply this check to the short-path (<500 chars) which
# uses ``send-keys -l``.  The long-path already writes to a temp file
# and uses ``load-buffer`` / ``paste-buffer`` which is not susceptible.
_SHELL_INJECTION_RE = re.compile(
    r"""
      (?:^|(?<=\s))    # start of string or preceded by whitespace
      (?:
        ;               # command separator
        | &&            # logical AND
        | \|\|          # logical OR
        | `[^`]*`       # backtick execution
        | \$\(          # $() sub-shell
      )
    """,
    re.VERBOSE,
)


class AsyncTmuxManager:
    """Manages interactions with tmux sessions asynchronously.

    Provides methods to list, verify, send text to, and capture output
    from tmux sessions via async subprocess calls.
    """

    def __init__(self, capture_lines: int = 200) -> None:
        """Initialise the AsyncTmuxManager.

        Args:
            capture_lines: Default number of lines to capture from a pane.
        """
        self.capture_lines: int = capture_lines

    # ------------------------------------------------------------------
    # Internal helper
    # ------------------------------------------------------------------

    async def _run(self, *args: str) -> tuple[int, str, str]:
        """Execute a tmux command asynchronously.

        Returns:
            A tuple of ``(returncode, stdout, stderr)``.
        """
        try:
            proc = await asyncio.create_subprocess_exec(
                "tmux",
                *args,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout_bytes, stderr_bytes = await proc.communicate()
            return (
                proc.returncode or 0,
                stdout_bytes.decode().strip(),
                stderr_bytes.decode().strip(),
            )
        except FileNotFoundError:
            return (127, "", "tmux: command not found")
        except OSError as exc:
            return (1, "", str(exc))

    # ------------------------------------------------------------------
    # Session queries
    # ------------------------------------------------------------------

    async def list_sessions(self) -> list[str]:
        """Return a list of running tmux session names.

        Returns an empty list if tmux is not running.
        """
        rc, stdout, _stderr = await self._run(
            "list-sessions", "-F", "#{session_name}"
        )
        if rc != 0:
            return []
        return [s.strip() for s in stdout.splitlines() if s.strip()]

    async def session_exists(self, name: str) -> bool:
        """Check whether a tmux session with the given *name* exists."""
        rc, _stdout, _stderr = await self._run("has-session", "-t", name)
        return rc == 0

    # ------------------------------------------------------------------
    # Sending text
    # ------------------------------------------------------------------

    @staticmethod
    def _sanitize_send_keys_text(text: str) -> str:
        """Sanitize *text* for use with ``tmux send-keys -l``.

        Replaces shell meta-characters that could lead to command injection
        when delivered via ``send-keys``.  The ``-l`` flag treats input as
        literal, but tmux still interprets certain sequences in some
        versions.  As defence-in-depth we escape dangerous patterns.

        Raises :class:`ValueError` if the text contains patterns that
        strongly indicate an injection attempt (e.g. ``$(...)``, backticks
        at word boundaries).
        """
        if _SHELL_INJECTION_RE.search(text):
            raise ValueError(
                "Text contains potentially dangerous shell meta-characters"
            )
        return text

    async def send(self, session: str, text: str, target: Optional[str] = None) -> bool:
        """Send *text* to a tmux session followed by Enter.

        For text >= 500 chars, ``load-buffer`` / ``paste-buffer`` is used
        instead of ``send-keys -l`` to avoid truncation.

        Args:
            session: The target session name.
            text: The text to send.
            target: Optional pane target (e.g. ``session:0.1``).
                    Defaults to *session*.

        Returns:
            ``True`` if the text was sent successfully.
        """
        if not await self.session_exists(session):
            return False

        pane_target = target or session

        use_send_keys = False
        if len(text) < 500:
            try:
                sanitized = self._sanitize_send_keys_text(text)
                use_send_keys = True
            except ValueError:
                # Dangerous characters detected -- fall through to
                # the safe load-buffer path instead of rejecting.
                use_send_keys = False

        if use_send_keys:
            await self._run("send-keys", "-t", pane_target, "-l", sanitized)
        else:
            # Write to temp file -> load-buffer -> paste-buffer
            # This path is safe from injection as tmux reads the file
            # contents verbatim.
            fd, tmp_path = tempfile.mkstemp(suffix=".txt")
            try:
                with os.fdopen(fd, "w") as fh:
                    fh.write(text)
                await self._run("load-buffer", tmp_path)
                await self._run("paste-buffer", "-t", pane_target)
            finally:
                try:
                    os.unlink(tmp_path)
                except OSError:
                    pass

        await self._run("send-keys", "-t", pane_target, "Enter")
        return True

    # ------------------------------------------------------------------
    # Capturing output
    # ------------------------------------------------------------------

    async def capture(
        self,
        session: str,
        lines: Optional[int] = None,
        escape: bool = True,
    ) -> str:
        """Capture pane content from a tmux session.

        Args:
            session: The session name to capture.
            lines: Number of lines to capture. Defaults to
                   ``self.capture_lines``.
            escape: When ``True`` the ``-e`` flag is passed to preserve
                    ANSI escape sequences.

        Returns:
            The captured pane text, or an empty string on failure.
        """
        if not await self.session_exists(session):
            return ""

        capture_count = lines if lines is not None else self.capture_lines

        cmd: list[str] = [
            "capture-pane",
            "-t",
            session,
            "-p",
            "-S",
            f"-{capture_count}",
        ]
        if escape:
            cmd.append("-e")

        rc, stdout, _stderr = await self._run(*cmd)
        if rc != 0:
            return ""
        return stdout

    async def capture_pane(
        self,
        session: str,
        pane: int = 0,
        lines: Optional[int] = None,
        escape: bool = True,
    ) -> str:
        """Capture content from a specific pane.

        Args:
            session: The session name.
            pane: The pane index (default ``0``).
            lines: Number of lines (defaults to ``self.capture_lines``).
            escape: Preserve ANSI escapes.

        Returns:
            The captured pane text, or an empty string on failure.
        """
        target = f"{session}:0.{pane}"
        capture_count = lines if lines is not None else self.capture_lines

        cmd: list[str] = [
            "capture-pane",
            "-t",
            target,
            "-p",
            "-S",
            f"-{capture_count}",
        ]
        if escape:
            cmd.append("-e")

        rc, stdout, _stderr = await self._run(*cmd)
        if rc != 0:
            return ""
        return stdout

    # ------------------------------------------------------------------
    # Session / pane management
    # ------------------------------------------------------------------

    async def create_session(
        self,
        name: str,
        cwd: str = "~",
        command: Optional[str] = None,
    ) -> bool:
        """Create a new detached tmux session.

        Args:
            name: Session name.
            cwd: Working directory for the session.
            command: Optional shell command to run in the session.

        Returns:
            ``True`` on success.
        """
        if await self.session_exists(name):
            return False

        expanded_cwd = os.path.expanduser(cwd)
        args: list[str] = [
            "new-session",
            "-d",
            "-s",
            name,
            "-c",
            expanded_cwd,
        ]
        if command:
            args.append(command)

        rc, _stdout, _stderr = await self._run(*args)
        return rc == 0

    async def split_window_horizontal(
        self,
        session: str,
        command: str,
        percent: int = 50,
    ) -> bool:
        """Split the window horizontally and run *command* in the new pane.

        Args:
            session: The target session.
            command: Shell command to run in the new pane.
            percent: Size of the new pane as a percentage.

        Returns:
            ``True`` on success.
        """
        rc, _stdout, _stderr = await self._run(
            "split-window",
            "-h",
            "-t",
            session,
            "-p",
            str(percent),
            command,
        )
        return rc == 0

    async def send_to_pane(
        self,
        session: str,
        pane: int,
        text: str,
    ) -> bool:
        """Send text to a specific pane within a session.

        Args:
            session: The session name.
            pane: The pane index.
            text: The text to send.

        Returns:
            ``True`` on success.
        """
        target = f"{session}:0.{pane}"
        return await self.send(session, text, target=target)

    async def kill_pane(self, session: str, pane: int = 1) -> bool:
        """Kill a specific pane (e.g. for reviewer cleanup).

        Args:
            session: The session name.
            pane: The pane index to kill (default ``1``).

        Returns:
            ``True`` on success.
        """
        target = f"{session}:0.{pane}"
        rc, _stdout, _stderr = await self._run("kill-pane", "-t", target)
        return rc == 0
