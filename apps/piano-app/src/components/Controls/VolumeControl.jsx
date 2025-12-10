/**
 * VolumeControl Component
 * Allows user to adjust volume and mute/unmute
 */
import React from 'react';

/**
 * @param {Object} props
 * @param {number} props.volume - Current volume (0-1)
 * @param {boolean} props.isMuted - Whether audio is muted
 * @param {Function} props.onVolumeChange - Callback when volume changes
 * @param {Function} props.onMuteToggle - Callback when mute is toggled
 */
export const VolumeControl = ({
  volume = 0.5,
  onVolumeChange,
  isMuted = false,
  onMuteToggle
}) => {
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value) / 100;
    onVolumeChange(newVolume);
  };

  return (
    <div className="volume-control" data-testid="volume-control">
      <button
        className="mute-button"
        onClick={onMuteToggle}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
        data-testid="mute-button"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
        disabled={isMuted}
        aria-label="Volume"
        data-testid="volume-slider"
      />
      <span className="volume-display" data-testid="volume-display">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
};
