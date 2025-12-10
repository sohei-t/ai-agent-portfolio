/**
 * SettingsManager.js
 * Manages game settings and user preferences
 */

export class SettingsManager {
  constructor() {
    this.storageKey = 'shootingGameSettings';
    this.defaultSettings = {
      // Audio settings
      masterVolume: 0.7,
      musicVolume: 0.5,
      sfxVolume: 0.8,
      audioEnabled: true,

      // Graphics settings
      quality: 'high', // 'low', 'medium', 'high'
      particleEffects: true,
      screenShake: true,
      showFPS: false,

      // Gameplay settings
      difficulty: 'normal', // 'easy', 'normal', 'hard'
      autoFire: false,
      playerType: 'balanced', // 'balanced', 'speed', 'power'

      // Controls
      keyboardControls: {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        fire: 'Space',
        bomb: 'KeyX',
        pause: 'Escape'
      },
      touchSensitivity: 1.0,

      // Display settings
      language: 'en', // 'en', 'ja'
      colorBlindMode: false,
      reduceMotion: false,

      // Other
      showTutorial: true,
      allowAnalytics: false
    };

    this.settings = this.loadSettings();
  }

  /**
   * Load settings from localStorage
   * @returns {Object} Settings object
   */
  loadSettings() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) {
        return JSON.parse(JSON.stringify(this.defaultSettings));
      }

      const loaded = JSON.parse(data);
      // Deep merge with defaults to ensure all settings exist
      const defaults = JSON.parse(JSON.stringify(this.defaultSettings));
      return this.deepMerge(defaults, loaded);
    } catch (error) {
      console.error('Failed to load settings:', error);
      return JSON.parse(JSON.stringify(this.defaultSettings));
    }
  }

  /**
   * Deep merge two objects
   * @param {Object} target - Target object
   * @param {Object} source - Source object
   * @returns {Object} Merged object
   */
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        result[key] = this.deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  /**
   * Save settings to localStorage
   * @returns {boolean} Success status
   */
  saveSettings() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  }

  /**
   * Get a specific setting value
   * @param {string} key - Setting key (supports dot notation)
   * @returns {*} Setting value
   */
  get(key) {
    const keys = key.split('.');
    let value = this.settings;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return undefined;
      }
    }

    return value;
  }

  /**
   * Set a specific setting value
   * @param {string} key - Setting key (supports dot notation)
   * @param {*} value - New value
   * @returns {boolean} Success status
   */
  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let target = this.settings;

    for (const k of keys) {
      if (!(k in target)) {
        target[k] = {};
      }
      target = target[k];
    }

    target[lastKey] = value;
    return this.saveSettings();
  }

  /**
   * Reset all settings to defaults
   * @returns {boolean} Success status
   */
  resetToDefaults() {
    this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
    return this.saveSettings();
  }

  /**
   * Reset specific category to defaults
   * @param {string} category - Category to reset (e.g., 'keyboardControls')
   * @returns {boolean} Success status
   */
  resetCategory(category) {
    if (category in this.defaultSettings) {
      // Deep copy for nested objects
      if (typeof this.defaultSettings[category] === 'object' && this.defaultSettings[category] !== null) {
        this.settings[category] = JSON.parse(JSON.stringify(this.defaultSettings[category]));
      } else {
        this.settings[category] = this.defaultSettings[category];
      }
      return this.saveSettings();
    }
    return false;
  }

  /**
   * Get all settings
   * @returns {Object} All settings
   */
  getAll() {
    return { ...this.settings };
  }

  /**
   * Apply multiple settings at once
   * @param {Object} newSettings - Settings object to merge
   * @returns {boolean} Success status
   */
  applySettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    return this.saveSettings();
  }

  /**
   * Validate control key binding
   * @param {string} key - Key code to validate
   * @returns {boolean} True if key is valid and not already used
   */
  validateControlKey(key) {
    const controls = this.settings.keyboardControls;
    const usedKeys = Object.values(controls);
    return !usedKeys.includes(key);
  }

  /**
   * Set control key binding
   * @param {string} action - Action name
   * @param {string} key - Key code
   * @returns {boolean} Success status
   */
  setControlKey(action, key) {
    if (action in this.settings.keyboardControls) {
      this.settings.keyboardControls[action] = key;
      return this.saveSettings();
    }
    return false;
  }

  /**
   * Get volume settings as object
   * @returns {Object} Volume settings
   */
  getVolumes() {
    return {
      master: this.settings.masterVolume,
      music: this.settings.musicVolume,
      sfx: this.settings.sfxVolume,
      enabled: this.settings.audioEnabled
    };
  }

  /**
   * Set volume
   * @param {string} type - Volume type ('master', 'music', 'sfx')
   * @param {number} value - Volume value (0-1)
   * @returns {boolean} Success status
   */
  setVolume(type, value) {
    const key = `${type}Volume`;
    if (key in this.settings) {
      this.settings[key] = Math.max(0, Math.min(1, value));
      return this.saveSettings();
    }
    return false;
  }

  /**
   * Toggle audio on/off
   * @returns {boolean} New audio state
   */
  toggleAudio() {
    this.settings.audioEnabled = !this.settings.audioEnabled;
    this.saveSettings();
    return this.settings.audioEnabled;
  }

  /**
   * Export settings as JSON
   * @returns {boolean} Success status
   */
  exportSettings() {
    try {
      const blob = new Blob([JSON.stringify(this.settings, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `game-settings-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Failed to export settings:', error);
      return false;
    }
  }

  /**
   * Import settings from JSON file
   * @param {File} file - JSON file to import
   * @returns {Promise<boolean>} Success status
   */
  async importSettings(file) {
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      this.settings = { ...this.defaultSettings, ...imported };
      return this.saveSettings();
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }
}

// Export singleton instance
export const settingsManager = new SettingsManager();
