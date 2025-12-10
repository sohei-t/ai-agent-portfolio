/**
 * SaveManager.js
 * Manages game save/load functionality using localStorage
 */

export class SaveManager {
  constructor() {
    this.storageKey = 'shootingGameSave';
    this.autoSaveInterval = 30000; // 30 seconds
    this.autoSaveTimer = null;
  }

  /**
   * Save game data to localStorage
   * @param {Object} data - Game data to save
   * @returns {boolean} Success status
   */
  save(data) {
    try {
      const saveData = {
        ...data,
        timestamp: Date.now(),
        version: '1.0.0'
      };

      localStorage.setItem(this.storageKey, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Failed to save game:', error);
      return false;
    }
  }

  /**
   * Load game data from localStorage
   * @returns {Object|null} Saved game data or null if not found
   */
  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) {
        return null;
      }

      const parsed = JSON.parse(data);

      // Validate version compatibility
      if (parsed.version !== '1.0.0') {
        console.warn('Save data version mismatch');
        return null;
      }

      return parsed;
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  }

  /**
   * Delete saved game data
   * @returns {boolean} Success status
   */
  deleteSave() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to delete save:', error);
      return false;
    }
  }

  /**
   * Check if save data exists
   * @returns {boolean} True if save exists
   */
  hasSave() {
    return localStorage.getItem(this.storageKey) !== null;
  }

  /**
   * Start auto-save timer
   * @param {Function} getGameData - Function that returns current game data
   */
  startAutoSave(getGameData) {
    this.stopAutoSave();

    this.autoSaveTimer = setInterval(() => {
      const data = getGameData();
      if (data) {
        this.save(data);
        console.log('Auto-saved at', new Date().toISOString());
      }
    }, this.autoSaveInterval);
  }

  /**
   * Stop auto-save timer
   */
  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  /**
   * Export save data as JSON file
   * @returns {boolean} Success status
   */
  exportSave() {
    try {
      const data = this.load();
      if (!data) {
        return false;
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shooting-game-save-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error('Failed to export save:', error);
      return false;
    }
  }

  /**
   * Import save data from JSON file
   * @param {File} file - JSON file to import
   * @returns {Promise<boolean>} Success status
   */
  async importSave(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      if (!data.version || !data.timestamp) {
        throw new Error('Invalid save file format');
      }

      return this.save(data);
    } catch (error) {
      console.error('Failed to import save:', error);
      return false;
    }
  }
}

// Export singleton instance
export const saveManager = new SaveManager();
