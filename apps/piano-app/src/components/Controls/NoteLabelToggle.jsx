/**
 * NoteLabelToggle Component
 * Allows user to toggle note label display mode
 */
import React from 'react';

const LABEL_MODES = [
  { value: 'english', label: 'English (C・D・E)' },
  { value: 'japanese', label: 'Japanese (ド・レ・ミ)' },
  { value: 'none', label: 'Hide Labels' }
];

/**
 * @param {Object} props
 * @param {string} props.labelMode - Current label mode
 * @param {Function} props.onLabelModeChange - Callback when label mode changes
 */
export const NoteLabelToggle = ({
  labelMode = 'english',
  onLabelModeChange
}) => {
  const handleLabelModeChange = (e) => {
    onLabelModeChange(e.target.value);
  };

  return (
    <div className="note-label-toggle" data-testid="note-label-toggle">
      <label htmlFor="label-mode-select">Note Labels:</label>
      <select
        id="label-mode-select"
        value={labelMode}
        onChange={handleLabelModeChange}
        data-testid="label-mode-select"
      >
        {LABEL_MODES.map(mode => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
    </div>
  );
};
