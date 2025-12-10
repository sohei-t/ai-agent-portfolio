/**
 * ThemeSelector Component
 * Allows user to switch between visual themes
 */
import React from 'react';

const THEMES = ['classic', 'modern', 'neon'];

/**
 * @param {Object} props
 * @param {string} props.theme - Current theme
 * @param {Function} props.onThemeChange - Callback when theme changes
 */
export const ThemeSelector = ({
  theme = 'classic',
  onThemeChange
}) => {
  const handleThemeChange = (e) => {
    onThemeChange(e.target.value);
  };

  return (
    <div className="theme-selector" data-testid="theme-selector">
      <label htmlFor="theme-select">Theme:</label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        data-testid="theme-select"
      >
        {THEMES.map(t => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};
