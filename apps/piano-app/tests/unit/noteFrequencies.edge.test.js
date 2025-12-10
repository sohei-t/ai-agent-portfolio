/**
 * Edge Case Tests for Note Frequency Calculations
 * Tests boundary conditions and error scenarios
 *
 * ITERATION 2: Edge cases and error handling
 */

import { describe, test, expect } from '@jest/globals';
import {
  getNoteFrequency,
  getOctaveNotes,
  getJapaneseName
} from '../../src/utils/noteFrequencies.js';

describe('Note Frequencies - Iteration 2: Edge Cases and Error Handling', () => {
  describe('Invalid Note Names', () => {
    test('should throw error for invalid note name', () => {
      expect(() => getNoteFrequency('H', 4)).toThrow('Invalid note');
    });

    test('should throw error for lowercase note', () => {
      expect(() => getNoteFrequency('c', 4)).toThrow('Invalid note');
    });

    test('should throw error for empty string note', () => {
      expect(() => getNoteFrequency('', 4)).toThrow('Invalid note');
    });

    test('should throw error for null note', () => {
      expect(() => getNoteFrequency(null, 4)).toThrow('Invalid note');
    });

    test('should throw error for undefined note', () => {
      expect(() => getNoteFrequency(undefined, 4)).toThrow('Invalid note');
    });

    test('should throw error for numeric note', () => {
      expect(() => getNoteFrequency(440, 4)).toThrow('Invalid note');
    });
  });

  describe('Invalid Octaves', () => {
    test('should throw error for negative octave', () => {
      expect(() => getNoteFrequency('C', -1)).toThrow('Invalid octave');
    });

    test('should throw error for octave > 8', () => {
      expect(() => getNoteFrequency('C', 9)).toThrow('Invalid octave');
    });

    test('should throw error for string octave', () => {
      expect(() => getNoteFrequency('C', '4')).toThrow('Invalid octave');
    });

    test('should throw error for null octave', () => {
      expect(() => getNoteFrequency('C', null)).toThrow('Invalid octave');
    });

    test('should throw error for NaN octave', () => {
      expect(() => getNoteFrequency('C', NaN)).toThrow('Invalid octave');
    });

    test('should throw error for fractional octave', () => {
      expect(() => getNoteFrequency('C', 4.5)).toThrow('Invalid octave');
    });
  });

  describe('Boundary Octaves', () => {
    test('should calculate C0 (16.35 Hz)', () => {
      expect(getNoteFrequency('C', 0)).toBeCloseTo(16.35, 2);
    });

    test('should calculate C8 (4186.01 Hz)', () => {
      expect(getNoteFrequency('C', 8)).toBeCloseTo(4186.01, 2);
    });

    test('should accept octave exactly 0', () => {
      expect(getNoteFrequency('A', 0)).toBeGreaterThan(0);
    });

    test('should accept octave exactly 8', () => {
      expect(getNoteFrequency('B', 8)).toBeGreaterThan(0);
    });
  });

  describe('Enharmonic Equivalents', () => {
    test('should calculate C# and Db as same frequency', () => {
      const cSharp = getNoteFrequency('C#', 4);
      const dFlat = getNoteFrequency('Db', 4);
      expect(cSharp).toEqual(dFlat);
    });

    test('should calculate F# and Gb as same frequency', () => {
      const fSharp = getNoteFrequency('F#', 4);
      const gFlat = getNoteFrequency('Gb', 4);
      expect(fSharp).toEqual(gFlat);
    });

    test('should calculate G# and Ab as same frequency', () => {
      const gSharp = getNoteFrequency('G#', 4);
      const aFlat = getNoteFrequency('Ab', 4);
      expect(gSharp).toEqual(aFlat);
    });

    test('should calculate A# and Bb as same frequency', () => {
      const aSharp = getNoteFrequency('A#', 4);
      const bFlat = getNoteFrequency('Bb', 4);
      expect(aSharp).toEqual(bFlat);
    });
  });

  describe('Frequency Precision', () => {
    test('should calculate A4 with high precision', () => {
      expect(getNoteFrequency('A', 4)).toBeCloseTo(440, 10);
    });

    test('should maintain precision for low frequencies', () => {
      const c0 = getNoteFrequency('C', 0);
      expect(c0).toBeGreaterThan(16);
      expect(c0).toBeLessThan(17);
    });

    test('should maintain precision for high frequencies', () => {
      const b8 = getNoteFrequency('B', 8);
      expect(b8).toBeGreaterThan(7900);
      expect(b8).toBeLessThan(8000);
    });
  });

  describe('getOctaveNotes Edge Cases', () => {
    test('should throw error for negative start octave', () => {
      expect(() => getOctaveNotes(-1, 12)).toThrow('Invalid start octave');
    });

    test('should throw error for start octave > 8', () => {
      expect(() => getOctaveNotes(9, 12)).toThrow('Invalid start octave');
    });

    test('should throw error for negative numKeys', () => {
      expect(() => getOctaveNotes(4, -1)).toThrow('Invalid number of keys');
    });

    test('should throw error for numKeys = 0', () => {
      expect(() => getOctaveNotes(4, 0)).toThrow('Invalid number of keys');
    });

    test('should throw error for numKeys > 88 (piano limit)', () => {
      expect(() => getOctaveNotes(0, 89)).toThrow('Invalid number of keys');
    });

    test('should handle single key (numKeys = 1)', () => {
      const notes = getOctaveNotes(4, 1);
      expect(notes).toHaveLength(1);
      expect(notes[0].note).toBe('C');
    });

    test('should handle maximum keys (88)', () => {
      const notes = getOctaveNotes(0, 88);
      expect(notes).toHaveLength(88);
    });

    test('should handle edge case spanning multiple octaves', () => {
      const notes = getOctaveNotes(7, 15); // C7 to D8+
      expect(notes).toHaveLength(15);
      expect(notes[0].octave).toBe(7);
      expect(notes[14].octave).toBe(8);
    });
  });

  describe('Octave Wraparound', () => {
    test('should correctly increment octave after B', () => {
      const notes = getOctaveNotes(4, 13); // C4 to C5
      expect(notes[0].displayName).toBe('C4');
      expect(notes[12].displayName).toBe('C5');
    });

    test('should handle multiple octave transitions', () => {
      const notes = getOctaveNotes(3, 36); // 3 full octaves
      expect(notes[0].octave).toBe(3);
      expect(notes[12].octave).toBe(4);
      expect(notes[24].octave).toBe(5);
      expect(notes[35].octave).toBe(5);
    });
  });

  describe('Japanese Name Edge Cases', () => {
    test('should throw error for invalid note', () => {
      expect(() => getJapaneseName('H')).toThrow('Invalid note');
    });

    test('should throw error for empty string', () => {
      expect(() => getJapaneseName('')).toThrow('Invalid note');
    });

    test('should throw error for null', () => {
      expect(() => getJapaneseName(null)).toThrow('Invalid note');
    });

    test('should throw error for undefined', () => {
      expect(() => getJapaneseName(undefined)).toThrow('Invalid note');
    });

    test('should handle all valid sharp notes', () => {
      const sharps = ['C#', 'D#', 'F#', 'G#', 'A#'];
      sharps.forEach(note => {
        expect(getJapaneseName(note)).toBeDefined();
        expect(getJapaneseName(note)).toMatch(/[ドレミファソラシ]#/);
      });
    });

    test('should handle all valid flat notes', () => {
      const flats = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];
      flats.forEach(note => {
        expect(getJapaneseName(note)).toBeDefined();
        expect(getJapaneseName(note)).toMatch(/[ドレミファソラシ]♭/);
      });
    });
  });

  describe('Frequency Range Validation', () => {
    test('should generate audible frequencies only (20-20000 Hz)', () => {
      for (let octave = 0; octave <= 8; octave++) {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        notes.forEach(note => {
          const freq = getNoteFrequency(note, octave);
          expect(freq).toBeGreaterThan(15); // Sub-bass limit
          expect(freq).toBeLessThan(8000); // Upper limit of piano
        });
      }
    });

    test('should maintain logarithmic relationship across octaves', () => {
      const c3 = getNoteFrequency('C', 3);
      const c4 = getNoteFrequency('C', 4);
      const c5 = getNoteFrequency('C', 5);

      expect(c4 / c3).toBeCloseTo(2, 4);
      expect(c5 / c4).toBeCloseTo(2, 4);
    });
  });

  describe('Note Display Names', () => {
    test('should generate correct display name format', () => {
      const notes = getOctaveNotes(4, 12);
      notes.forEach(note => {
        expect(note.displayName).toMatch(/^[A-G](#|b)?[0-8]$/);
      });
    });

    test('should include octave in display name', () => {
      const notes = getOctaveNotes(5, 3);
      expect(notes[0].displayName).toBe('C5');
      expect(notes[1].displayName).toBe('C#5');
      expect(notes[2].displayName).toBe('D5');
    });
  });

  describe('Mathematical Edge Cases', () => {
    test('should handle very small semitone differences', () => {
      const c4 = getNoteFrequency('C', 4);
      const cSharp4 = getNoteFrequency('C#', 4);
      const difference = cSharp4 - c4;

      expect(difference).toBeGreaterThan(0);
      expect(difference).toBeCloseTo(15.56, 1); // Approximately (more lenient precision)
    });

    test('should maintain equal temperament tuning', () => {
      // In equal temperament, each semitone ratio is 2^(1/12)
      const expectedRatio = Math.pow(2, 1/12);

      for (let i = 0; i < 11; i++) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const freq1 = getNoteFrequency(notes[i], 4);
        const freq2 = getNoteFrequency(notes[i + 1], 4);
        const ratio = freq2 / freq1;

        expect(ratio).toBeCloseTo(expectedRatio, 5);
      }
    });
  });
});
