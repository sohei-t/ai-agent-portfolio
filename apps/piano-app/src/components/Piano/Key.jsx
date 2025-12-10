/**
 * Key Component - Individual Piano Key
 * Handles single key rendering and interaction
 */
import React from 'react';
import styles from './Key.module.css';

/**
 * Piano key component
 * @param {Object} props
 * @param {string} props.note - Note name (e.g., "C", "C#")
 * @param {boolean} props.isBlackKey - Whether this is a black key
 * @param {number} props.octave - Current octave
 * @param {Function} props.onPress - Callback when key is pressed
 * @param {Function} props.onRelease - Callback when key is released
 * @param {boolean} props.isPressed - Whether key is currently pressed
 * @param {string|null} props.label - Label to display (or null if hidden)
 * @param {string} props.theme - Current theme
 * @param {string} props.className - Optional CSS class name
 */
export const Key = React.memo(({
  note,
  isBlackKey,
  octave,
  onPress,
  onRelease,
  isPressed = false,
  label,
  theme,
  className = '',
  style = {}
}) => {
  const keyClass = isBlackKey ? styles.blackKey : styles.whiteKey;

  return (
    <button
      className={`${styles.key} ${keyClass} ${className}`}
      style={style}
      data-note={note}
      data-octave={octave}
      data-pressed={isPressed}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={(e) => {
        e.preventDefault();
        onPress();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onRelease();
      }}
      aria-label={`${note}${octave}`}
      aria-pressed={isPressed}
    >
      {label && <span className={styles.noteLabel}>{label}</span>}
    </button>
  );
});

Key.displayName = 'Key';
