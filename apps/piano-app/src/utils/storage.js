/**
 * LocalStorage Utilities
 * Provides safe storage operations with error handling and data validation
 */

export const STORAGE_KEYS = {
  THEME: 'piano_theme',
  VOLUME: 'piano_volume',
  LABEL_MODE: 'piano_label_mode',
  RECORDINGS: 'piano_recordings',
};

/**
 * Storage utility functions for piano app
 * Handles settings persistence and recording data storage
 */
const StorageUtils = {
  /**
   * Get item from localStorage with fallback
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist or error occurs
   * @returns {*} Parsed value or default value
   */
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   * @returns {boolean} Success status
   */
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key to remove
   * @returns {boolean} Success status
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
      return false;
    }
  },

  /**
   * Clear all piano app data
   * @returns {boolean} Success status
   */
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
      return false;
    }
  },

  /**
   * Save settings to localStorage
   * @param {Object} settings - Settings object
   * @param {string} [settings.theme] - Theme name
   * @param {number} [settings.volume] - Volume level (0-1)
   * @param {string} [settings.labelMode] - Label display mode
   */
  saveSettings: (settings) => {
    const { theme, volume, labelMode } = settings;
    if (theme !== undefined) StorageUtils.setItem(STORAGE_KEYS.THEME, theme);
    if (volume !== undefined) StorageUtils.setItem(STORAGE_KEYS.VOLUME, volume);
    if (labelMode !== undefined) StorageUtils.setItem(STORAGE_KEYS.LABEL_MODE, labelMode);
  },

  /**
   * Load settings from localStorage
   * @returns {Object} Settings object with defaults
   */
  loadSettings: () => {
    return {
      theme: StorageUtils.getItem(STORAGE_KEYS.THEME, 'classic'),
      volume: StorageUtils.getItem(STORAGE_KEYS.VOLUME, 0.5),
      labelMode: StorageUtils.getItem(STORAGE_KEYS.LABEL_MODE, 'english'),
    };
  },

  /**
   * Save recording to localStorage
   * Automatically adds ID and timestamp, limits to 10 recordings
   * @param {Object} recording - Recording data
   * @returns {boolean} Success status
   */
  saveRecording: (recording) => {
    const recordings = StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
    const newRecording = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...recording,
    };
    recordings.push(newRecording);

    // Keep only last 10 recordings
    if (recordings.length > 10) {
      recordings.shift();
    }

    return StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, recordings);
  },

  /**
   * Load recordings from localStorage
   * @returns {Array} Array of recording objects
   */
  loadRecordings: () => {
    return StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
  },

  /**
   * Delete recording by ID
   * @param {number} id - Recording ID
   * @returns {boolean} Success status
   */
  deleteRecording: (id) => {
    const recordings = StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
    const filtered = recordings.filter(r => r.id !== id);
    return StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, filtered);
  },

  /**
   * Get storage size estimate in bytes
   * @returns {number} Approximate storage size
   */
  getStorageSize: () => {
    let total = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        total += item.length * 2; // Approximate bytes (UTF-16)
      }
    });
    return total;
  },
};

export default StorageUtils;
