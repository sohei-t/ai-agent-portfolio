/**
 * Unit Tests for Note Frequency Calculations
 * Tests accurate pitch generation based on A4=440Hz
 *
 * ITERATION 1: Happy path tests
 */

import { describe, test, expect } from '@jest/globals';
import {
  getNoteFrequency,
  getFrequency,
  getNoteNames,
  isValidNote,
  isBlackKey,
  getOctaveNotes,
  getJapaneseName,
  NOTE_FREQUENCIES
} from '../../src/utils/noteFrequencies.js';

describe('Note Frequencies - Iteration 1: Happy Path Tests', () => {
  describe('Basic Frequency Calculation', () => {
    test('should calculate A4 as 440 Hz', () => {
      expect(getNoteFrequency('A', 4)).toBeCloseTo(440, 2);
    });

    test('should calculate C4 (middle C) correctly', () => {
      expect(getNoteFrequency('C', 4)).toBeCloseTo(261.63, 2);
    });

    test('should calculate C5 correctly', () => {
      expect(getNoteFrequency('C', 5)).toBeCloseTo(523.25, 2);
    });

    test('should calculate E4 correctly', () => {
      expect(getNoteFrequency('E', 4)).toBeCloseTo(329.63, 2);
    });

    test('should calculate G4 correctly', () => {
      expect(getNoteFrequency('G', 4)).toBeCloseTo(392.00, 2);
    });
  });

  describe('Octave Range - C3 to C7', () => {
    test('should calculate C3 correctly', () => {
      expect(getNoteFrequency('C', 3)).toBeCloseTo(130.81, 2);
    });

    test('should calculate C7 correctly', () => {
      expect(getNoteFrequency('C', 7)).toBeCloseTo(2093.00, 2);
    });

    test('should calculate all octaves in supported range', () => {
      for (let octave = 3; octave <= 7; octave++) {
        const freq = getNoteFrequency('C', octave);
        expect(freq).toBeGreaterThan(0);
        expect(freq).toBeLessThan(5000);
      }
    });
  });

  describe('Sharp Notes', () => {
    test('should calculate C# correctly', () => {
      const cFreq = getNoteFrequency('C', 4);
      const cSharpFreq = getNoteFrequency('C#', 4);
      expect(cSharpFreq).toBeGreaterThan(cFreq);
      expect(cSharpFreq).toBeCloseTo(277.18, 2);
    });

    test('should calculate F# correctly', () => {
      expect(getNoteFrequency('F#', 4)).toBeCloseTo(369.99, 2);
    });

    test('should calculate all black keys (sharps)', () => {
      const sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];
      sharps.forEach(note => {
        const freq = getNoteFrequency(note, 4);
        expect(freq).toBeGreaterThan(0);
        expect(freq).toBeLessThan(1000);
      });
    });
  });

  describe('Octave Note Generation', () => {
    test('should generate 12 notes for 1 octave (C4-B4)', () => {
      const notes = getOctaveNotes(4, 12);
      expect(notes).toHaveLength(12);
      expect(notes[0].note).toBe('C');
      expect(notes[11].note).toBe('B');
    });

    test('should generate 18 notes for 1.5 octaves (C4-F5)', () => {
      const notes = getOctaveNotes(4, 18);
      expect(notes).toHaveLength(18);
      expect(notes[0].displayName).toBe('C4');
      expect(notes[17].displayName).toBe('F5');
    });

    test('should generate 24 notes for 2 octaves (C4-B5)', () => {
      const notes = getOctaveNotes(4, 24);
      expect(notes).toHaveLength(24);
      expect(notes[0].displayName).toBe('C4');
      expect(notes[23].displayName).toBe('B5');
    });

    test('should generate 30 notes for 2.5 octaves (C4-F6)', () => {
      const notes = getOctaveNotes(4, 30);
      expect(notes).toHaveLength(30);
      expect(notes[0].displayName).toBe('C4');
      expect(notes[29].displayName).toBe('F6');
    });

    test('should include correct frequencies in generated notes', () => {
      const notes = getOctaveNotes(4, 12);
      expect(notes[0].frequency).toBeCloseTo(261.63, 2); // C4
      expect(notes[9].frequency).toBeCloseTo(440, 2);    // A4
    });
  });

  describe('Japanese Note Names', () => {
    test('should return Japanese name for C (ド)', () => {
      expect(getJapaneseName('C')).toBe('ド');
    });

    test('should return Japanese name for D (レ)', () => {
      expect(getJapaneseName('D')).toBe('レ');
    });

    test('should return Japanese name for E (ミ)', () => {
      expect(getJapaneseName('E')).toBe('ミ');
    });

    test('should return Japanese name for F (ファ)', () => {
      expect(getJapaneseName('F')).toBe('ファ');
    });

    test('should return Japanese name for G (ソ)', () => {
      expect(getJapaneseName('G')).toBe('ソ');
    });

    test('should return Japanese name for A (ラ)', () => {
      expect(getJapaneseName('A')).toBe('ラ');
    });

    test('should return Japanese name for B (シ)', () => {
      expect(getJapaneseName('B')).toBe('シ');
    });

    test('should handle sharp notes in Japanese', () => {
      expect(getJapaneseName('C#')).toBe('ド#');
      expect(getJapaneseName('F#')).toBe('ファ#');
    });
  });

  describe('Frequency Relationships', () => {
    test('should have octave relationship (2:1 ratio)', () => {
      const c4 = getNoteFrequency('C', 4);
      const c5 = getNoteFrequency('C', 5);
      expect(c5 / c4).toBeCloseTo(2, 2);
    });

    test('should have semitone relationship', () => {
      const c4 = getNoteFrequency('C', 4);
      const cSharp4 = getNoteFrequency('C#', 4);
      const ratio = cSharp4 / c4;
      expect(ratio).toBeCloseTo(Math.pow(2, 1/12), 4);
    });

    test('should have perfect fifth relationship (G/C = 3/2)', () => {
      const c4 = getNoteFrequency('C', 4);
      const g4 = getNoteFrequency('G', 4);
      expect(g4 / c4).toBeCloseTo(1.498, 2); // Slightly less than 3/2 in equal temperament
    });
  });
});
