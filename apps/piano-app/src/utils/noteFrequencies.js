/**
 * Note Frequency Calculation Module
 * Calculates piano note frequencies based on 12-tone equal temperament
 * Reference: A4 = 440Hz
 *
 * Formula: frequency = 440 * 2^((n-49)/12)
 * Where n is the semitone distance from A0
 */

// Note names in one octave
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// A4 reference frequency (concert pitch)
const A4_FREQUENCY = 440;
const A4_MIDI_NUMBER = 69;

/**
 * Calculate frequency from MIDI note number
 * @param {number} midiNumber - MIDI note number (0-127)
 * @returns {number} Frequency in Hz
 */
function midiToFrequency(midiNumber) {
  return A4_FREQUENCY * Math.pow(2, (midiNumber - A4_MIDI_NUMBER) / 12);
}

/**
 * Convert note name and octave to MIDI number
 * Supports both sharp (#) and flat (b) notation
 * @param {string} note - Note name (e.g., 'C', 'C#', 'Db')
 * @param {number} octave - Octave number (0-8)
 * @returns {number} MIDI note number
 */
function noteToMidi(note, octave) {
  // Map enharmonic equivalents (flat notes to sharp notes)
  const enharmonicMap = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#'
  };

  // Convert flat notation to sharp if needed
  const normalizedNote = enharmonicMap[note] || note;

  const noteIndex = NOTE_NAMES.indexOf(normalizedNote);
  if (noteIndex === -1) {
    throw new Error(`Invalid note name: ${note}`);
  }
  return 12 * (octave + 1) + noteIndex;
}

/**
 * Get frequency for a given note and octave
 * @param {string} note - Note name (e.g., 'C', 'C#', 'D')
 * @param {number} octave - Octave number (3-7)
 * @returns {number} Frequency in Hz
 */
export function getNoteFrequency(note, octave) {
  if (typeof note !== 'string' || note.trim() === '') {
    throw new Error('Invalid note name');
  }

  // Check if octave is NaN first (NaN has typeof === 'number')
  if (Number.isNaN(octave)) {
    throw new Error('Invalid octave number');
  }

  if (typeof octave !== 'number') {
    throw new Error('Invalid octave number');
  }

  if (!Number.isInteger(octave)) {
    throw new Error('Invalid octave number');
  }

  if (octave < 0 || octave > 8) {
    throw new Error('Invalid octave number');
  }

  const midiNumber = noteToMidi(note, octave);
  return midiToFrequency(midiNumber);
}

/**
 * Pre-calculated frequency table for C3-C7 (piano range)
 * Optimized for performance - avoids runtime calculations
 */
export const NOTE_FREQUENCIES = {
  // Octave 3
  'C3': 130.81,
  'C#3': 138.59,
  'D3': 146.83,
  'D#3': 155.56,
  'E3': 164.81,
  'F3': 174.61,
  'F#3': 185.00,
  'G3': 196.00,
  'G#3': 207.65,
  'A3': 220.00,
  'A#3': 233.08,
  'B3': 246.94,

  // Octave 4 (Middle C)
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00, // Concert A
  'A#4': 466.16,
  'B4': 493.88,

  // Octave 5
  'C5': 523.25,
  'C#5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'E5': 659.25,
  'F5': 698.46,
  'F#5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'A5': 880.00,
  'A#5': 932.33,
  'B5': 987.77,

  // Octave 6
  'C6': 1046.50,
  'C#6': 1108.73,
  'D6': 1174.66,
  'D#6': 1244.51,
  'E6': 1318.51,
  'F6': 1396.91,
  'F#6': 1479.98,
  'G6': 1567.98,
  'G#6': 1661.22,
  'A6': 1760.00,
  'A#6': 1864.66,
  'B6': 1975.53,

  // Octave 7
  'C7': 2093.00,
  'C#7': 2217.46,
  'D7': 2349.32,
  'D#7': 2489.02,
  'E7': 2637.02,
  'F7': 2793.83,
  'F#7': 2959.96,
  'G7': 3135.96,
  'G#7': 3322.44,
  'A7': 3520.00,
  'A#7': 3729.31,
  'B7': 3951.07,
};

/**
 * Get frequency from pre-calculated table or calculate on demand
 * @param {string} note - Note name (e.g., 'C', 'C#', 'D')
 * @param {number} octave - Octave number (3-7)
 * @returns {number} Frequency in Hz
 */
export function getFrequency(note, octave) {
  const key = `${note}${octave}`;

  // Try pre-calculated table first (fast path)
  if (NOTE_FREQUENCIES[key]) {
    return NOTE_FREQUENCIES[key];
  }

  // Fallback to calculation (for notes outside pre-calculated range)
  return getNoteFrequency(note, octave);
}

/**
 * Get all note names in one octave
 * @returns {string[]} Array of note names
 */
export function getNoteNames() {
  return [...NOTE_NAMES];
}

/**
 * Check if a note name is valid
 * @param {string} note - Note name to check
 * @returns {boolean} True if valid
 */
export function isValidNote(note) {
  return NOTE_NAMES.includes(note);
}

/**
 * Check if a note is a black key
 * @param {string} note - Note name (e.g., 'C#', 'D#')
 * @returns {boolean} True if black key
 */
export function isBlackKey(note) {
  return note.includes('#');
}

/**
 * Get all notes for a given octave range
 * @param {number} startOctave - Starting octave
 * @param {number} numKeys - Number of keys to generate (default: 12)
 * @returns {Array} Array of note objects
 */
export function getOctaveNotes(startOctave, numKeys = 12) {
  // Validate inputs
  if (typeof startOctave !== 'number' || startOctave < 0 || startOctave > 8) {
    throw new Error(`Invalid start octave: ${startOctave}`);
  }

  if (typeof numKeys !== 'number' || numKeys <= 0 || numKeys > 88) {
    throw new Error(`Invalid number of keys: ${numKeys}`);
  }

  const notes = getNoteNames();
  const result = [];

  let octave = startOctave;
  let noteIndex = 0;

  for (let i = 0; i < numKeys; i++) {
    const note = notes[noteIndex];
    result.push({
      note,
      octave,
      frequency: getNoteFrequency(note, octave),
      displayName: `${note}${octave}`,
    });

    noteIndex++;
    if (noteIndex >= notes.length) {
      noteIndex = 0;
      octave++;
    }
  }

  return result;
}

/**
 * Get Japanese note name
 * @param {string} note - Note name (e.g., 'C', 'C#')
 * @returns {string} Japanese note name
 */
export function getJapaneseName(note) {
  const nameMap = {
    'C': 'ド',
    'C#': 'ド#',
    'Db': 'レ♭',
    'D': 'レ',
    'D#': 'レ#',
    'Eb': 'ミ♭',
    'E': 'ミ',
    'F': 'ファ',
    'F#': 'ファ#',
    'Gb': 'ソ♭',
    'G': 'ソ',
    'G#': 'ソ#',
    'Ab': 'ラ♭',
    'A': 'ラ',
    'A#': 'ラ#',
    'Bb': 'シ♭',
    'B': 'シ',
  };

  if (!nameMap.hasOwnProperty(note)) {
    throw new Error(`Invalid note for Japanese name: ${note}`);
  }

  return nameMap[note];
}

export default {
  getNoteFrequency,
  getFrequency,
  getNoteNames,
  isValidNote,
  isBlackKey,
  getOctaveNotes,
  getJapaneseName,
  NOTE_FREQUENCIES,
};
