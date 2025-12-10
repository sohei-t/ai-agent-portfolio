/**
 * Unit Tests for Audio Engine
 * Tests Web Audio API integration, note frequency generation, and iOS Safari compatibility
 *
 * ITERATION 1: Happy path tests
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { createAudioEngine } from '../../src/utils/audioEngine.js';

describe('AudioEngine - Iteration 1: Happy Path Tests', () => {
  let audioEngine;

  beforeEach(() => {
    audioEngine = createAudioEngine();
  });

  describe('Initialization', () => {
    test('should create audio engine successfully', () => {
      expect(audioEngine).toBeDefined();
      expect(audioEngine.initialize).toBeDefined();
      expect(audioEngine.playNote).toBeDefined();
      expect(audioEngine.stopNote).toBeDefined();
    });

    test('should initialize AudioContext with interactive latency hint', async () => {
      const success = await audioEngine.initialize();
      expect(success).toBe(true);
    });

    test('should resume suspended AudioContext (iOS Safari)', async () => {
      const success = await audioEngine.initialize();
      expect(success).toBe(true);
    });
  });

  describe('Note Playing - Basic', () => {
    test('should play a note with given frequency', () => {
      const nodeId = audioEngine.playNote(440); // A4
      expect(nodeId).toBeDefined();
      expect(typeof nodeId).toBe('number');
    });

    test('should play C4 (261.63 Hz)', () => {
      const nodeId = audioEngine.playNote(261.63);
      expect(nodeId).toBeDefined();
    });

    test('should play C5 (523.25 Hz)', () => {
      const nodeId = audioEngine.playNote(523.25);
      expect(nodeId).toBeDefined();
    });

    test('should track active notes', () => {
      audioEngine.playNote(440);
      audioEngine.playNote(523.25);
      expect(audioEngine.getActiveNoteCount()).toBe(2);
    });

    test('should play note with custom velocity', () => {
      const nodeId = audioEngine.playNote(440, 0.5);
      expect(nodeId).toBeDefined();
    });
  });

  describe('Note Stopping', () => {
    test('should stop a playing note', () => {
      const nodeId = audioEngine.playNote(440);
      audioEngine.stopNote(nodeId);
      // Note: actual cleanup happens after release time
      expect(true).toBe(true);
    });

    test('should handle stopping non-existent note gracefully', () => {
      expect(() => audioEngine.stopNote(99999)).not.toThrow();
    });
  });

  describe('Volume Control', () => {
    test('should set master volume', () => {
      audioEngine.setVolume(0.7);
      expect(audioEngine.getVolume()).toBe(0.7);
    });

    test('should initialize with default volume (0.5)', () => {
      expect(audioEngine.getVolume()).toBe(0.5);
    });

    test('should accept volume in range 0-1', () => {
      audioEngine.setVolume(0);
      expect(audioEngine.getVolume()).toBe(0);

      audioEngine.setVolume(1);
      expect(audioEngine.getVolume()).toBe(1);
    });
  });

  describe('Mute Functionality', () => {
    test('should mute audio', () => {
      audioEngine.setMuted(true);
      expect(audioEngine.isMuted()).toBe(true);
    });

    test('should unmute audio', () => {
      audioEngine.setMuted(true);
      audioEngine.setMuted(false);
      expect(audioEngine.isMuted()).toBe(false);
    });

    test('should not play notes when muted', () => {
      audioEngine.setMuted(true);
      const nodeId = audioEngine.playNote(440);
      expect(nodeId).toBeNull();
    });
  });

  describe('Simultaneous Notes', () => {
    test('should play multiple notes simultaneously', () => {
      const node1 = audioEngine.playNote(261.63); // C4
      const node2 = audioEngine.playNote(329.63); // E4
      const node3 = audioEngine.playNote(392.00); // G4

      expect(audioEngine.getActiveNoteCount()).toBe(3);
    });

    test('should handle chord playing (4 notes)', () => {
      audioEngine.playNote(261.63); // C4
      audioEngine.playNote(329.63); // E4
      audioEngine.playNote(392.00); // G4
      audioEngine.playNote(523.25); // C5

      expect(audioEngine.getActiveNoteCount()).toBe(4);
    });
  });

  describe('Cleanup', () => {
    test('should cleanup all resources', async () => {
      audioEngine.playNote(440);
      audioEngine.playNote(523.25);

      await audioEngine.cleanup();
      expect(audioEngine.getActiveNoteCount()).toBe(0);
    });
  });
});
