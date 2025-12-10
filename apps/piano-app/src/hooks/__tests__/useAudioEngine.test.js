/**
 * Test suite for useAudioEngine Hook
 * Comprehensive tests for audio engine React integration
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useAudioEngine } from '../useAudioEngine';
import { createAudioEngine } from '../../utils/audioEngine';
import { getFrequency } from '../../utils/noteFrequencies';

// Mock dependencies
jest.mock('../../utils/audioEngine');
jest.mock('../../utils/noteFrequencies');

describe('useAudioEngine Hook', () => {
  let mockAudioEngine;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock audio engine instance
    mockAudioEngine = {
      initialize: jest.fn().mockResolvedValue(true),
      playNote: jest.fn().mockReturnValue(1),
      stopNote: jest.fn(),
      setVolume: jest.fn(),
      setMuted: jest.fn(),
      isMuted: jest.fn().mockReturnValue(false),
      getActiveNoteCount: jest.fn().mockReturnValue(0),
      getState: jest.fn().mockReturnValue('running'),
      cleanup: jest.fn().mockResolvedValue(true),
    };

    // Mock createAudioEngine to return our mock
    createAudioEngine.mockReturnValue(mockAudioEngine);

    // Mock getFrequency
    getFrequency.mockImplementation((note, octave) => {
      const baseFreqs = {
        'C': 261.63,
        'C#': 277.18,
        'D': 293.66,
        'E': 329.63,
      };
      return baseFreqs[note] || 440;
    });
  });

  afterEach(() => {
    // Clean up any event listeners
    const events = ['touchstart', 'mousedown', 'keydown'];
    events.forEach(event => {
      document.removeEventListener(event, () => {});
    });
  });

  describe('Initialization', () => {
    test('should create audio engine on mount', () => {
      renderHook(() => useAudioEngine());
      expect(createAudioEngine).toHaveBeenCalledTimes(1);
    });

    test('should initialize as not initialized', () => {
      const { result } = renderHook(() => useAudioEngine());
      expect(result.current.isInitialized).toBe(false);
    });

    test('should set up user gesture listeners', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      renderHook(() => useAudioEngine());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        expect.any(Function),
        { once: true }
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function),
        { once: true }
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function),
        { once: true }
      );

      addEventListenerSpy.mockRestore();
    });

    test('should initialize on user gesture', async () => {
      const { result } = renderHook(() => useAudioEngine());

      // Simulate user click
      await act(async () => {
        document.dispatchEvent(new MouseEvent('mousedown'));
        await waitFor(() => expect(mockAudioEngine.initialize).toHaveBeenCalled());
      });

      expect(result.current.isInitialized).toBe(true);
    });

    test('should handle initialization failure', async () => {
      mockAudioEngine.initialize.mockResolvedValue(false);
      const { result } = renderHook(() => useAudioEngine());

      await act(async () => {
        document.dispatchEvent(new MouseEvent('mousedown'));
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      expect(result.current.isInitialized).toBe(false);
    });

    test('should manually initialize via initialize method', async () => {
      const { result } = renderHook(() => useAudioEngine());

      let initResult;
      await act(async () => {
        initResult = await result.current.initialize();
      });

      expect(initResult).toBe(true);
      expect(result.current.isInitialized).toBe(true);
      expect(mockAudioEngine.initialize).toHaveBeenCalled();
    });

    test('should return false when manually initializing without engine', async () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      let initResult;
      await act(async () => {
        initResult = await result.current.initialize();
      });

      expect(initResult).toBe(false);
    });
  });

  describe('Note Playback', () => {
    test('should play note with correct frequency', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.playNote('C', 4, 0.8);
      });

      expect(getFrequency).toHaveBeenCalledWith('C', 4);
      expect(mockAudioEngine.playNote).toHaveBeenCalledWith(261.63, 0.8);
    });

    test('should use default velocity if not provided', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.playNote('D', 4);
      });

      expect(mockAudioEngine.playNote).toHaveBeenCalledWith(293.66, 0.8);
    });

    test('should return node ID from playNote', () => {
      mockAudioEngine.playNote.mockReturnValue(42);
      const { result } = renderHook(() => useAudioEngine());

      let nodeId;
      act(() => {
        nodeId = result.current.playNote('E', 4);
      });

      expect(nodeId).toBe(42);
    });

    test('should handle playNote when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { result } = renderHook(() => useAudioEngine());

      let nodeId;
      act(() => {
        nodeId = result.current.playNote('C', 4);
      });

      expect(nodeId).toBe(null);
      expect(consoleWarnSpy).toHaveBeenCalledWith('Audio engine not initialized');
      consoleWarnSpy.mockRestore();
    });

    test('should handle playNote error gracefully', () => {
      mockAudioEngine.playNote.mockImplementation(() => {
        throw new Error('Playback error');
      });
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const { result } = renderHook(() => useAudioEngine());

      let nodeId;
      act(() => {
        nodeId = result.current.playNote('C', 4);
      });

      expect(nodeId).toBe(null);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to play note:',
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Note Stopping', () => {
    test('should stop note with valid nodeId', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.stopNote(42);
      });

      expect(mockAudioEngine.stopNote).toHaveBeenCalledWith(42);
    });

    test('should not stop note when nodeId is null', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.stopNote(null);
      });

      expect(mockAudioEngine.stopNote).not.toHaveBeenCalled();
    });

    test('should not stop note when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.stopNote(42);
      });

      expect(mockAudioEngine.stopNote).not.toHaveBeenCalled();
    });

    test('should handle stopNote error gracefully', () => {
      mockAudioEngine.stopNote.mockImplementation(() => {
        throw new Error('Stop error');
      });
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.stopNote(42);
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to stop note:',
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Volume Control', () => {
    test('should set volume correctly', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.setVolume(0.7);
      });

      expect(mockAudioEngine.setVolume).toHaveBeenCalledWith(0.7);
      expect(result.current.volume).toBe(0.7);
    });

    test('should clamp volume to 0-1 range (too low)', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.setVolume(-0.5);
      });

      expect(mockAudioEngine.setVolume).toHaveBeenCalledWith(0);
      expect(result.current.volume).toBe(0);
    });

    test('should clamp volume to 0-1 range (too high)', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.setVolume(1.5);
      });

      expect(mockAudioEngine.setVolume).toHaveBeenCalledWith(1);
      expect(result.current.volume).toBe(1);
    });

    test('should handle setVolume when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.setVolume(0.7);
      });

      expect(mockAudioEngine.setVolume).not.toHaveBeenCalled();
    });

    test('should have default volume of 0.5', () => {
      const { result } = renderHook(() => useAudioEngine());
      expect(result.current.volume).toBe(0.5);
    });
  });

  describe('Mute Control', () => {
    test('should set muted state', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.setMuted(true);
      });

      expect(mockAudioEngine.setMuted).toHaveBeenCalledWith(true);
      expect(result.current.isMuted).toBe(true);
    });

    test('should toggle mute state', () => {
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.toggleMute();
      });

      expect(mockAudioEngine.setMuted).toHaveBeenCalledWith(true);
      expect(result.current.isMuted).toBe(true);
    });

    test('should toggle mute state back to false', () => {
      mockAudioEngine.isMuted.mockReturnValue(true);
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.toggleMute();
      });

      expect(mockAudioEngine.setMuted).toHaveBeenCalledWith(false);
    });

    test('should handle setMuted when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.setMuted(true);
      });

      expect(mockAudioEngine.setMuted).not.toHaveBeenCalled();
    });

    test('should handle toggleMute when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      act(() => {
        result.current.toggleMute();
      });

      expect(mockAudioEngine.setMuted).not.toHaveBeenCalled();
    });

    test('should have default muted state as false', () => {
      const { result } = renderHook(() => useAudioEngine());
      expect(result.current.isMuted).toBe(false);
    });
  });

  describe('Status Methods', () => {
    test('should get active note count', () => {
      mockAudioEngine.getActiveNoteCount.mockReturnValue(5);
      const { result } = renderHook(() => useAudioEngine());

      let count;
      act(() => {
        count = result.current.getActiveNoteCount();
      });

      expect(count).toBe(5);
    });

    test('should return 0 for active note count when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      let count;
      act(() => {
        count = result.current.getActiveNoteCount();
      });

      expect(count).toBe(0);
    });

    test('should get audio context state', () => {
      mockAudioEngine.getState.mockReturnValue('suspended');
      const { result } = renderHook(() => useAudioEngine());

      let state;
      act(() => {
        state = result.current.getState();
      });

      expect(state).toBe('suspended');
    });

    test('should return "closed" for state when engine not initialized', () => {
      createAudioEngine.mockReturnValue(null);
      const { result } = renderHook(() => useAudioEngine());

      let state;
      act(() => {
        state = result.current.getState();
      });

      expect(state).toBe('closed');
    });
  });

  describe('Cleanup', () => {
    test('should cleanup on unmount', async () => {
      const { unmount } = renderHook(() => useAudioEngine());

      await act(async () => {
        unmount();
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      expect(mockAudioEngine.cleanup).toHaveBeenCalled();
    });

    test('should handle cleanup error gracefully', async () => {
      mockAudioEngine.cleanup.mockRejectedValue(new Error('Cleanup error'));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const { unmount } = renderHook(() => useAudioEngine());

      await act(async () => {
        unmount();
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to cleanup audio engine:',
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });

    test('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      const { unmount } = renderHook(() => useAudioEngine());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Hook Stability', () => {
    test('should maintain stable function references', () => {
      const { result, rerender } = renderHook(() => useAudioEngine());

      const firstPlayNote = result.current.playNote;
      const firstStopNote = result.current.stopNote;
      const firstSetVolume = result.current.setVolume;

      rerender();

      expect(result.current.playNote).toBe(firstPlayNote);
      expect(result.current.stopNote).toBe(firstStopNote);
      expect(result.current.setVolume).toBe(firstSetVolume);
    });
  });

  describe('Return Interface', () => {
    test('should return all required properties', () => {
      const { result } = renderHook(() => useAudioEngine());

      expect(result.current).toHaveProperty('playNote');
      expect(result.current).toHaveProperty('stopNote');
      expect(result.current).toHaveProperty('volume');
      expect(result.current).toHaveProperty('setVolume');
      expect(result.current).toHaveProperty('isMuted');
      expect(result.current).toHaveProperty('setMuted');
      expect(result.current).toHaveProperty('toggleMute');
      expect(result.current).toHaveProperty('isInitialized');
      expect(result.current).toHaveProperty('getActiveNoteCount');
      expect(result.current).toHaveProperty('getState');
      expect(result.current).toHaveProperty('initialize');
    });

    test('should return functions for all methods', () => {
      const { result } = renderHook(() => useAudioEngine());

      expect(typeof result.current.playNote).toBe('function');
      expect(typeof result.current.stopNote).toBe('function');
      expect(typeof result.current.setVolume).toBe('function');
      expect(typeof result.current.setMuted).toBe('function');
      expect(typeof result.current.toggleMute).toBe('function');
      expect(typeof result.current.getActiveNoteCount).toBe('function');
      expect(typeof result.current.getState).toBe('function');
      expect(typeof result.current.initialize).toBe('function');
    });
  });
});
