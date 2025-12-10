/**
 * Test suite for useRecorder Hook
 * Tests recording of piano performances
 */

import { renderHook, act } from '@testing-library/react';
import useRecorder from '../useRecorder';

describe('useRecorder Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    test('should initialize with default state', () => {
      const { result } = renderHook(() => useRecorder());

      expect(result.current.isRecording).toBe(false);
      expect(result.current.recordedEvents).toEqual([]);
    });

    test('should provide all required functions', () => {
      const { result } = renderHook(() => useRecorder());

      expect(typeof result.current.startRecording).toBe('function');
      expect(typeof result.current.stopRecording).toBe('function');
      expect(typeof result.current.recordEvent).toBe('function');
      expect(typeof result.current.clearRecording).toBe('function');
      expect(typeof result.current.pauseRecording).toBe('function');
      expect(typeof result.current.resumeRecording).toBe('function');
    });
  });

  describe('Recording Control', () => {
    test('should start recording', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
      });

      expect(result.current.isRecording).toBe(true);
      expect(result.current.recordedEvents).toEqual([]);
    });

    test('should stop recording', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
      });

      let recordingData;
      act(() => {
        recordingData = result.current.stopRecording();
      });

      expect(result.current.isRecording).toBe(false);
      expect(recordingData).toHaveProperty('events');
      expect(recordingData).toHaveProperty('duration');
      expect(typeof recordingData.duration).toBe('number');
    });

    test('should pause recording', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
        result.current.pauseRecording();
      });

      expect(result.current.isRecording).toBe(false);
    });

    test('should not resume if never started', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.resumeRecording();
      });

      expect(result.current.isRecording).toBe(false);
    });

    test('should clear recording data', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.clearRecording();
      });

      expect(result.current.recordedEvents).toEqual([]);
    });

    test('should clear events when starting new recording', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
      });

      act(() => {
        result.current.stopRecording();
        result.current.startRecording();
      });

      expect(result.current.recordedEvents).toEqual([]);
    });
  });

  describe('Recording Session', () => {
    test('should handle empty recording session', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
      });

      let recordingData;
      act(() => {
        recordingData = result.current.stopRecording();
      });

      expect(recordingData.events).toEqual([]);
      expect(recordingData.duration).toBeGreaterThanOrEqual(0);
    });

    test('should return duration in seconds', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
      });

      act(() => {
        const data = result.current.stopRecording();
        expect(typeof data.duration).toBe('number');
      });
    });
  });

  describe('Return Interface', () => {
    test('should return all required properties', () => {
      const { result } = renderHook(() => useRecorder());

      expect(result.current).toHaveProperty('isRecording');
      expect(result.current).toHaveProperty('recordedEvents');
      expect(result.current).toHaveProperty('startRecording');
      expect(result.current).toHaveProperty('stopRecording');
      expect(result.current).toHaveProperty('recordEvent');
      expect(result.current).toHaveProperty('clearRecording');
      expect(result.current).toHaveProperty('pauseRecording');
      expect(result.current).toHaveProperty('resumeRecording');
    });

    test('should maintain stable function references', () => {
      const { result, rerender } = renderHook(() => useRecorder());

      const firstStart = result.current.startRecording;
      const firstClear = result.current.clearRecording;

      rerender();

      expect(result.current.startRecording).toBe(firstStart);
      expect(result.current.clearRecording).toBe(firstClear);
    });
  });

  describe('Resume Recording', () => {
    test('should allow resume after pause', () => {
      const { result } = renderHook(() => useRecorder());

      act(() => {
        result.current.startRecording();
        result.current.pauseRecording();
      });

      expect(result.current.isRecording).toBe(false);

      act(() => {
        result.current.resumeRecording();
      });

      expect(result.current.isRecording).toBe(true);
    });
  });
});
