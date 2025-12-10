/**
 * Test suite for useKeyboard Hook
 * Tests keyboard input handling for piano playing
 */

import { renderHook } from '@testing-library/react';
import useKeyboard from '../useKeyboard';

describe('useKeyboard Hook', () => {
  let onKeyPressMock;
  let onKeyReleaseMock;

  beforeEach(() => {
    onKeyPressMock = jest.fn();
    onKeyReleaseMock = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any remaining event listeners
    window.removeEventListener('keydown', () => {});
    window.removeEventListener('keyup', () => {});
  });

  describe('Initialization', () => {
    test('should return keyMap and enabled status', () => {
      const { result } = renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock)
      );

      expect(result.current.keyMap).toBeDefined();
      expect(result.current.enabled).toBe(true);
    });

    test('should have correct key mappings', () => {
      const { result } = renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock)
      );

      const expectedKeyMap = {
        'q': 'C',
        'w': 'D',
        'e': 'E',
        'r': 'F',
        't': 'G',
        'y': 'A',
        'u': 'B',
        '2': 'C#',
        '3': 'D#',
        '5': 'F#',
        '6': 'G#',
        '7': 'A#',
      };

      expect(result.current.keyMap).toEqual(expectedKeyMap);
    });

    test('should respect enabled option', () => {
      const { result } = renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock, { enabled: false })
      );

      expect(result.current.enabled).toBe(false);
    });

    test('should default to enabled when no options provided', () => {
      const { result } = renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock)
      );

      expect(result.current.enabled).toBe(true);
    });
  });

  describe('Key Down Events', () => {
    test('should call onKeyPress for white key (C)', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'q' });
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('C');
      expect(onKeyPressMock).toHaveBeenCalledTimes(1);
    });

    test('should call onKeyPress for white key (D)', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'w' });
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('D');
    });

    test('should call onKeyPress for black key (C#)', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: '2' });
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('C#');
    });

    test('should handle uppercase keys', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'Q' });
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('C');
    });

    test('should ignore unmapped keys', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'z' });
      window.dispatchEvent(event);

      expect(onKeyPressMock).not.toHaveBeenCalled();
    });

    test('should ignore key repeats', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      // First press (should trigger)
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q', repeat: false }));
      expect(onKeyPressMock).toHaveBeenCalledTimes(1);

      // Repeated press (should not trigger)
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q', repeat: true }));
      expect(onKeyPressMock).toHaveBeenCalledTimes(1);
    });

    test('should prevent default for mapped keys', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'q' });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      window.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should handle shift key modifier', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'q', shiftKey: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('C');
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should handle ctrl key modifier', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'q', ctrlKey: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('C');
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should handle meta key modifier', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'q', metaKey: true });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      window.dispatchEvent(event);

      expect(onKeyPressMock).toHaveBeenCalledWith('C');
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should not call onKeyPress when callback is undefined', () => {
      renderHook(() => useKeyboard(undefined, onKeyReleaseMock));

      const event = new KeyboardEvent('keydown', { key: 'q' });
      expect(() => window.dispatchEvent(event)).not.toThrow();
    });
  });

  describe('Key Up Events', () => {
    test('should call onKeyRelease for white key', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keyup', { key: 'q' });
      window.dispatchEvent(event);

      expect(onKeyReleaseMock).toHaveBeenCalledWith('C');
      expect(onKeyReleaseMock).toHaveBeenCalledTimes(1);
    });

    test('should call onKeyRelease for black key', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keyup', { key: '2' });
      window.dispatchEvent(event);

      expect(onKeyReleaseMock).toHaveBeenCalledWith('C#');
    });

    test('should handle uppercase keys on release', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keyup', { key: 'W' });
      window.dispatchEvent(event);

      expect(onKeyReleaseMock).toHaveBeenCalledWith('D');
    });

    test('should ignore unmapped keys on release', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keyup', { key: 'z' });
      window.dispatchEvent(event);

      expect(onKeyReleaseMock).not.toHaveBeenCalled();
    });

    test('should prevent default for mapped keys on release', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const event = new KeyboardEvent('keyup', { key: 'q' });
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
      window.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should not call onKeyRelease when callback is undefined', () => {
      renderHook(() => useKeyboard(onKeyPressMock, undefined));

      const event = new KeyboardEvent('keyup', { key: 'q' });
      expect(() => window.dispatchEvent(event)).not.toThrow();
    });
  });

  describe('Full Key Sequence', () => {
    test('should handle complete press and release cycle', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
      expect(onKeyPressMock).toHaveBeenCalledWith('C');

      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'q' }));
      expect(onKeyReleaseMock).toHaveBeenCalledWith('C');
    });

    test('should handle multiple keys in sequence', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));

      expect(onKeyPressMock).toHaveBeenCalledWith('C');
      expect(onKeyPressMock).toHaveBeenCalledWith('D');
      expect(onKeyPressMock).toHaveBeenCalledWith('E');
      expect(onKeyPressMock).toHaveBeenCalledTimes(3);
    });

    test('should handle alternating press and release', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'q' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' }));

      expect(onKeyPressMock).toHaveBeenCalledTimes(2);
      expect(onKeyReleaseMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('Enabled/Disabled State', () => {
    test('should not listen to events when disabled', () => {
      renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock, { enabled: false })
      );

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'q' }));

      expect(onKeyPressMock).not.toHaveBeenCalled();
      expect(onKeyReleaseMock).not.toHaveBeenCalled();
    });

    test('should listen to events when enabled', () => {
      renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock, { enabled: true })
      );

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));

      expect(onKeyPressMock).toHaveBeenCalled();
    });

    test('should update when enabled option changes', () => {
      const { rerender } = renderHook(
        ({ enabled }) => useKeyboard(onKeyPressMock, onKeyReleaseMock, { enabled }),
        { initialProps: { enabled: false } }
      );

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
      expect(onKeyPressMock).not.toHaveBeenCalled();

      rerender({ enabled: true });

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
      expect(onKeyPressMock).toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    test('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock)
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keyup',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });

    test('should not respond to events after unmount', () => {
      const { unmount } = renderHook(() =>
        useKeyboard(onKeyPressMock, onKeyReleaseMock)
      );

      unmount();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));

      expect(onKeyPressMock).not.toHaveBeenCalled();
    });
  });

  describe('All Key Mappings', () => {
    test('should handle all white keys', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const whiteKeys = [
        { key: 'q', note: 'C' },
        { key: 'w', note: 'D' },
        { key: 'e', note: 'E' },
        { key: 'r', note: 'F' },
        { key: 't', note: 'G' },
        { key: 'y', note: 'A' },
        { key: 'u', note: 'B' },
      ];

      whiteKeys.forEach(({ key, note }) => {
        onKeyPressMock.mockClear();
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
        expect(onKeyPressMock).toHaveBeenCalledWith(note);
      });
    });

    test('should handle all black keys', () => {
      renderHook(() => useKeyboard(onKeyPressMock, onKeyReleaseMock));

      const blackKeys = [
        { key: '2', note: 'C#' },
        { key: '3', note: 'D#' },
        { key: '5', note: 'F#' },
        { key: '6', note: 'G#' },
        { key: '7', note: 'A#' },
      ];

      blackKeys.forEach(({ key, note }) => {
        onKeyPressMock.mockClear();
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
        expect(onKeyPressMock).toHaveBeenCalledWith(note);
      });
    });
  });
});
