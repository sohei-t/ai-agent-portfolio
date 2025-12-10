/**
 * OctaveSelector Component
 * Allows user to change the current octave
 */
import React from 'react';

/**
 * @param {Object} props
 * @param {number} props.octave - Current octave
 * @param {Function} props.onOctaveChange - Callback when octave changes
 * @param {number} props.minOctave - Minimum octave (default: 3)
 * @param {number} props.maxOctave - Maximum octave (default: 7)
 */
export const OctaveSelector = ({
  octave = 4,
  onOctaveChange,
  minOctave = 3,
  maxOctave = 7
}) => {
  const handleDecrease = () => {
    if (octave > minOctave) {
      onOctaveChange(octave - 1);
    }
  };

  const handleIncrease = () => {
    if (octave < maxOctave) {
      onOctaveChange(octave + 1);
    }
  };

  return (
    <div className="octave-selector" data-testid="octave-selector">
      <button
        className="octave-down"
        onClick={handleDecrease}
        disabled={octave <= minOctave}
        aria-label="Decrease octave"
      >
        ▼
      </button>
      <span className="octave-display" data-testid="octave-display">
        C{octave}
      </span>
      <button
        className="octave-up"
        onClick={handleIncrease}
        disabled={octave >= maxOctave}
        aria-label="Increase octave"
      >
        ▲
      </button>
    </div>
  );
};
