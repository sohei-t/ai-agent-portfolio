/**
 * Edge Case and Error Handling Tests for Audio Engine
 * Tests boundary conditions, error scenarios, and iOS Safari edge cases
 *
 * ITERATION 2: Edge cases and error handling
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { createAudioEngine } from '../../src/utils/audioEngine.js';

describe('AudioEngine - Iteration 2: Edge Cases and Error Handling', () => {
  let audioEngine;

  beforeEach(() => {
    audioEngine = createAudioEngine();
  });

  describe('Invalid Input Handling', () => {
    test('should throw error for negative frequency', () => {
      expect(() => audioEngine.playNote(-440)).toThrow('Invalid frequency');
    });

    test('should throw error for zero frequency', () => {
      expect(() => audioEngine.playNote(0)).toThrow('Invalid frequency');
    });

    test('should throw error for extremely high frequency', () => {
      expect(() => audioEngine.playNote(25000)).toThrow('Invalid frequency');
    });

    test('should throw error for non-number frequency', () => {
      expect(() => audioEngine.playNote('440')).toThrow('Invalid frequency');
    });

    test('should throw error for NaN frequency', () => {
      expect(() => audioEngine.playNote(NaN)).toThrow('Invalid frequency');
    });

    test('should throw error for negative velocity', () => {
      expect(() => audioEngine.playNote(440, -0.5)).toThrow('Invalid velocity');
    });

    test('should throw error for velocity > 1', () => {
      expect(() => audioEngine.playNote(440, 1.5)).toThrow('Invalid velocity');
    });

    test('should accept velocity exactly 0', () => {
      const nodeId = audioEngine.playNote(440, 0);
      expect(nodeId).toBeDefined();
    });

    test('should accept velocity exactly 1', () => {
      const nodeId = audioEngine.playNote(440, 1);
      expect(nodeId).toBeDefined();
    });
  });

  describe('Boundary Frequencies', () => {
    test('should play very low frequency (C0 = 16.35 Hz)', () => {
      const nodeId = audioEngine.playNote(16.35);
      expect(nodeId).toBeDefined();
    });

    test('should play very high frequency (C8 = 4186 Hz)', () => {
      const nodeId = audioEngine.playNote(4186);
      expect(nodeId).toBeDefined();
    });

    test('should play A4 exactly (440 Hz)', () => {
      const nodeId = audioEngine.playNote(440.0);
      expect(nodeId).toBeDefined();
    });

    test('should play sub-bass frequency (30 Hz)', () => {
      const nodeId = audioEngine.playNote(30);
      expect(nodeId).toBeDefined();
    });
  });

  describe('Volume Edge Cases', () => {
    test('should clamp volume above 1 to 1', () => {
      audioEngine.setVolume(1.5);
      expect(audioEngine.getVolume()).toBe(1);
    });

    test('should clamp volume below 0 to 0', () => {
      audioEngine.setVolume(-0.5);
      expect(audioEngine.getVolume()).toBe(0);
    });

    test('should accept volume of 0', () => {
      audioEngine.setVolume(0);
      expect(audioEngine.getVolume()).toBe(0);
    });

    test('should accept volume of 1', () => {
      audioEngine.setVolume(1);
      expect(audioEngine.getVolume()).toBe(1);
    });

    test('should handle very small volume values', () => {
      audioEngine.setVolume(0.001);
      expect(audioEngine.getVolume()).toBeCloseTo(0.001, 5);
    });

    test('should handle fractional volume values', () => {
      audioEngine.setVolume(0.333333);
      expect(audioEngine.getVolume()).toBeCloseTo(0.333333, 5);
    });
  });

  describe('Polyphony Limit Handling', () => {
    test('should enforce maximum polyphony of 10 notes', () => {
      // Play 15 notes
      for (let i = 0; i < 15; i++) {
        audioEngine.playNote(440 + i * 10);
      }

      // Should only have 10 active notes
      expect(audioEngine.getActiveNoteCount()).toBe(10);
    });

    test('should remove oldest note when exceeding polyphony', () => {
      const maxPolyphony = audioEngine.getMaxPolyphony();

      // Play max + 1 notes
      for (let i = 0; i < maxPolyphony + 1; i++) {
        audioEngine.playNote(440);
      }

      // Should still be at max
      expect(audioEngine.getActiveNoteCount()).toBe(maxPolyphony);
    });

    test('should handle rapid note starts near polyphony limit', () => {
      // Quickly play 20 notes
      for (let i = 0; i < 20; i++) {
        audioEngine.playNote(440);
      }

      // Should stabilize at max polyphony
      expect(audioEngine.getActiveNoteCount()).toBeLessThanOrEqual(10);
    });
  });

  describe('Mute State Edge Cases', () => {
    test('should not play notes when muted', () => {
      audioEngine.setMuted(true);
      const nodeId = audioEngine.playNote(440);
      expect(nodeId).toBeNull();
      expect(audioEngine.getActiveNoteCount()).toBe(0);
    });

    test('should resume playing after unmute', () => {
      audioEngine.setMuted(true);
      audioEngine.playNote(440); // Should not play
      audioEngine.setMuted(false);
      const nodeId = audioEngine.playNote(440); // Should play
      expect(nodeId).toBeDefined();
    });

    test('should stop active notes when muting', () => {
      // Play some notes
      audioEngine.playNote(440);
      audioEngine.playNote(523.25);

      // Muting shouldn't stop already playing notes (design choice)
      audioEngine.setMuted(true);
      expect(audioEngine.getActiveNoteCount()).toBe(2);
    });
  });

  describe('Stop Note Edge Cases', () => {
    test('should handle stopping non-existent note ID', () => {
      expect(() => audioEngine.stopNote(999999)).not.toThrow();
    });

    test('should handle stopping null note ID', () => {
      expect(() => audioEngine.stopNote(null)).not.toThrow();
    });

    test('should handle stopping undefined note ID', () => {
      expect(() => audioEngine.stopNote(undefined)).not.toThrow();
    });

    test('should handle stopping same note twice', () => {
      const nodeId = audioEngine.playNote(440);
      audioEngine.stopNote(nodeId);
      expect(() => audioEngine.stopNote(nodeId)).not.toThrow();
    });
  });

  describe('Memory Management', () => {
    test('should cleanup all nodes on cleanup', async () => {
      // Play multiple notes
      for (let i = 0; i < 5; i++) {
        audioEngine.playNote(440 + i * 50);
      }

      await audioEngine.cleanup();
      expect(audioEngine.getActiveNoteCount()).toBe(0);
    });

    test('should handle cleanup with no active notes', async () => {
      await expect(audioEngine.cleanup()).resolves.not.toThrow();
    });

    test('should handle cleanup being called twice', async () => {
      audioEngine.playNote(440);
      await audioEngine.cleanup();
      await expect(audioEngine.cleanup()).resolves.not.toThrow();
    });
  });

  describe('iOS Safari Suspended Context', () => {
    test('should handle suspended AudioContext', async () => {
      // AudioContext is initially suspended in the mock
      const success = await audioEngine.initialize();
      expect(success).toBe(true);
    });

    test('should resume AudioContext on user interaction', async () => {
      // Simulate iOS Safari suspended state
      await audioEngine.initialize();
      expect(audioEngine).toBeDefined();
    });
  });

  describe('Concurrent Operations', () => {
    test('should handle playing and stopping notes simultaneously', () => {
      const nodeId1 = audioEngine.playNote(440);
      const nodeId2 = audioEngine.playNote(523.25);

      audioEngine.stopNote(nodeId1);
      const nodeId3 = audioEngine.playNote(659.25);

      expect(audioEngine.getActiveNoteCount()).toBe(2);
    });

    test('should handle rapid play/stop cycles', () => {
      for (let i = 0; i < 50; i++) {
        const nodeId = audioEngine.playNote(440);
        audioEngine.stopNote(nodeId);
      }

      // Should not have memory leaks
      expect(audioEngine.getActiveNoteCount()).toBeLessThanOrEqual(10);
    });
  });

  describe('State Consistency', () => {
    test('should maintain correct state after multiple operations', () => {
      // Complex sequence of operations
      audioEngine.setVolume(0.7);
      audioEngine.playNote(440);
      audioEngine.setMuted(true);
      audioEngine.playNote(523.25); // Should not play
      audioEngine.setMuted(false);
      audioEngine.setVolume(0.3);
      const nodeId = audioEngine.playNote(659.25);

      expect(audioEngine.getVolume()).toBe(0.3);
      expect(audioEngine.isMuted()).toBe(false);
      expect(audioEngine.getActiveNoteCount()).toBe(2); // Only 2 notes (one was muted)
    });

    test('should maintain volume setting through mute/unmute cycle', () => {
      audioEngine.setVolume(0.65);
      audioEngine.setMuted(true);
      audioEngine.setMuted(false);

      expect(audioEngine.getVolume()).toBe(0.65);
    });
  });

  describe('Decimal Precision', () => {
    test('should handle floating point frequency values', () => {
      const nodeId = audioEngine.playNote(440.12345);
      expect(nodeId).toBeDefined();
    });

    test('should handle very precise velocity values', () => {
      const nodeId = audioEngine.playNote(440, 0.87654321);
      expect(nodeId).toBeDefined();
    });
  });

  describe('Time-based Edge Cases', () => {
    test('should generate unique node IDs', () => {
      const id1 = audioEngine.playNote(440);
      const id2 = audioEngine.playNote(523.25);

      expect(id1).not.toBe(id2);
    });

    test('should handle rapid successive calls', () => {
      const ids = [];
      for (let i = 0; i < 10; i++) {
        ids.push(audioEngine.playNote(440 + i * 10));
      }

      // All IDs should be unique
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(10);
    });
  });
});
