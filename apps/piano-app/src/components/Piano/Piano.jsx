/**
 * Piano Component - Piano Keyboard Container
 * Renders 12 keys (one octave) and handles note events
 */
import React from 'react';
import { Key } from './Key';
import styles from './Piano.module.css';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Generate notes for 2 octaves
const generateTwoOctaveNotes = (baseOctave) => {
  const twoOctaveNotes = [];
  for (let octaveOffset = 0; octaveOffset < 2; octaveOffset++) {
    for (const note of NOTES) {
      twoOctaveNotes.push({
        note,
        octave: baseOctave + octaveOffset
      });
    }
  }
  // Add the final C of the next octave
  twoOctaveNotes.push({
    note: 'C',
    octave: baseOctave + 2
  });
  return twoOctaveNotes;
};

const JAPANESE_NOTE_NAMES = {
  'C': 'ド', 'C#': 'ド#', 'D': 'レ', 'D#': 'レ#',
  'E': 'ミ', 'F': 'ファ', 'F#': 'ファ#', 'G': 'ソ',
  'G#': 'ソ#', 'A': 'ラ', 'A#': 'ラ#', 'B': 'シ'
};

/**
 * Get note label based on label mode
 */
const getNoteLabel = (note, labelMode) => {
  if (labelMode === 'none') return null;
  if (labelMode === 'japanese') return JAPANESE_NOTE_NAMES[note];
  return note;
};

/**
 * Check if note is a black key
 */
const isBlackKey = (note) => note.includes('#');

/**
 * Piano keyboard component
 * @param {Object} props
 * @param {number} props.octave - Current octave (3-7)
 * @param {Function} props.onNotePlay - Callback when note starts
 * @param {Function} props.onNoteStop - Callback when note stops
 * @param {string} props.theme - Current theme
 * @param {string} props.showLabels - Label mode ('english', 'japanese', 'none')
 * @param {Set} props.pressedKeys - Currently pressed keys
 */
export const Piano = ({
  octave = 4,
  onNotePlay,
  onNoteStop,
  theme = 'classic',
  showLabels = 'english',
  pressedKeys = new Set()
}) => {
  const handleKeyPress = React.useCallback((note, noteOctave) => {
    if (onNotePlay) {
      onNotePlay(note, noteOctave);
    }
  }, [onNotePlay]);

  const handleKeyRelease = React.useCallback((note, noteOctave) => {
    if (onNoteStop) {
      onNoteStop(note, noteOctave);
    }
  }, [onNoteStop]);

  // Generate notes for 2 octaves
  const allNotes = generateTwoOctaveNotes(octave);

  // Separate white and black keys for proper layout
  const whiteNotes = allNotes.filter(({note}) => !isBlackKey(note));
  const blackNotes = allNotes.filter(({note}) => isBlackKey(note));

  return (
    <div className={styles.piano} data-theme={theme} data-testid="piano">
      <div className={styles.keys}>
        {/* Render white keys first */}
        {whiteNotes.map((noteInfo, index) => {
          const noteId = `${noteInfo.note}${noteInfo.octave}`;
          const isPressed = pressedKeys.has(noteId);
          const label = getNoteLabel(noteInfo.note, showLabels);

          return (
            <Key
              key={`${noteInfo.note}-${noteInfo.octave}-white`}
              note={noteInfo.note}
              isBlackKey={false}
              octave={noteInfo.octave}
              onPress={() => handleKeyPress(noteInfo.note, noteInfo.octave)}
              onRelease={() => handleKeyRelease(noteInfo.note, noteInfo.octave)}
              isPressed={isPressed}
              label={label}
              theme={theme}
              className={styles.whiteKey}
            />
          );
        })}

        {/* Render black keys on top */}
        {blackNotes.map((noteInfo, index) => {
          const noteId = `${noteInfo.note}${noteInfo.octave}`;
          const isPressed = pressedKeys.has(noteId);
          const label = getNoteLabel(noteInfo.note, showLabels);

          // Calculate black key position
          const blackKeyPositions = {
            'C#': 0.65,
            'D#': 1.65,
            'F#': 3.65,
            'G#': 4.65,
            'A#': 5.65
          };

          const octaveOffset = (noteInfo.octave - octave) * 7;
          const basePosition = blackKeyPositions[noteInfo.note];
          const leftPosition = `calc(100% / 15 * ${octaveOffset + basePosition})`;

          return (
            <Key
              key={`${noteInfo.note}-${noteInfo.octave}-black`}
              note={noteInfo.note}
              isBlackKey={true}
              octave={noteInfo.octave}
              onPress={() => handleKeyPress(noteInfo.note, noteInfo.octave)}
              onRelease={() => handleKeyRelease(noteInfo.note, noteInfo.octave)}
              isPressed={isPressed}
              label={label}
              theme={theme}
              className={styles.blackKey}
              style={{ left: leftPosition }}
            />
          );
        })}
      </div>
    </div>
  );
};
