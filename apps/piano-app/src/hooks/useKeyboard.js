/**
 * useKeyboard Hook
 * Handles PC keyboard input for piano playing
 * Maps QWERTY keyboard to piano keys
 */

import { useEffect } from 'react';

/**
 * Keyboard mapping configuration
 * Maps keyboard keys to musical notes
 */
const KEY_MAP = {
  // White keys (natural notes)
  'q': 'C',
  'w': 'D',
  'e': 'E',
  'r': 'F',
  't': 'G',
  'y': 'A',
  'u': 'B',

  // Black keys (sharp notes)
  '2': 'C#',
  '3': 'D#',
  '5': 'F#',
  '6': 'G#',
  '7': 'A#',
};

/**
 * Custom hook for keyboard input handling
 * @param {Function} onKeyPress - Callback when key is pressed (note) => void
 * @param {Function} onKeyRelease - Callback when key is released (note) => void
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Enable/disable keyboard input (default: true)
 * @returns {Object} Hook state and utilities
 */
const useKeyboard = (onKeyPress, onKeyRelease, options = {}) => {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    /**
     * Handle keyboard key down event
     * @param {KeyboardEvent} event - Keyboard event
     */
    const handleKeyDown = (event) => {
      // Ignore key repeats (holding down key)
      if (event.repeat) return;

      const key = event.key.toLowerCase();
      const note = KEY_MAP[key];

      if (note && onKeyPress) {
        event.preventDefault(); // Prevent default browser behavior
        onKeyPress(note);
      }

      // Handle octave shift with modifier keys
      // Shift key: octave up
      // Ctrl/Cmd key: octave down
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        // These will be handled by parent component state
        // Just prevent default behavior for these keys
        if (KEY_MAP[key]) {
          event.preventDefault();
        }
      }
    };

    /**
     * Handle keyboard key up event
     * @param {KeyboardEvent} event - Keyboard event
     */
    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      const note = KEY_MAP[key];

      if (note && onKeyRelease) {
        event.preventDefault();
        onKeyRelease(note);
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyPress, onKeyRelease, enabled]);

  return {
    keyMap: KEY_MAP,
    enabled,
  };
};

export default useKeyboard;
