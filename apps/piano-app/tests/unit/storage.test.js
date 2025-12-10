/**
 * Unit Tests for LocalStorage Utilities
 * Tests settings persistence and recording data storage
 *
 * ITERATION 1: Happy path tests
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

// Storage utility functions
const STORAGE_KEYS = {
  THEME: 'piano_theme',
  VOLUME: 'piano_volume',
  LABEL_MODE: 'piano_label_mode',
  RECORDINGS: 'piano_recordings',
};

const StorageUtils = {
  // Get item from localStorage with fallback
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  },

  // Set item in localStorage
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
      return false;
    }
  },

  // Remove item from localStorage
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
      return false;
    }
  },

  // Clear all piano app data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
      return false;
    }
  },

  // Save settings
  saveSettings: (settings) => {
    const { theme, volume, labelMode } = settings;
    if (theme !== undefined) StorageUtils.setItem(STORAGE_KEYS.THEME, theme);
    if (volume !== undefined) StorageUtils.setItem(STORAGE_KEYS.VOLUME, volume);
    if (labelMode !== undefined) StorageUtils.setItem(STORAGE_KEYS.LABEL_MODE, labelMode);
  },

  // Load settings
  loadSettings: () => {
    return {
      theme: StorageUtils.getItem(STORAGE_KEYS.THEME, 'classic'),
      volume: StorageUtils.getItem(STORAGE_KEYS.VOLUME, 0.5),
      labelMode: StorageUtils.getItem(STORAGE_KEYS.LABEL_MODE, 'english'),
    };
  },

  // Save recording
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

  // Load recordings
  loadRecordings: () => {
    return StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
  },

  // Delete recording
  deleteRecording: (id) => {
    const recordings = StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
    const filtered = recordings.filter(r => r.id !== id);
    return StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, filtered);
  },

  // Get storage size estimate
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

describe('Storage Utilities - Iteration 1: Happy Path Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Basic Storage Operations', () => {
    test('should save and retrieve a string value', () => {
      StorageUtils.setItem('test_key', 'test_value');
      expect(StorageUtils.getItem('test_key')).toBe('test_value');
    });

    test('should save and retrieve a number value', () => {
      StorageUtils.setItem('test_number', 42);
      expect(StorageUtils.getItem('test_number')).toBe(42);
    });

    test('should save and retrieve an object', () => {
      const obj = { name: 'Piano', version: 1 };
      StorageUtils.setItem('test_obj', obj);
      expect(StorageUtils.getItem('test_obj')).toEqual(obj);
    });

    test('should save and retrieve an array', () => {
      const arr = [1, 2, 3, 4, 5];
      StorageUtils.setItem('test_arr', arr);
      expect(StorageUtils.getItem('test_arr')).toEqual(arr);
    });

    test('should return default value for non-existent key', () => {
      expect(StorageUtils.getItem('non_existent', 'default')).toBe('default');
    });

    test('should return null for non-existent key without default', () => {
      expect(StorageUtils.getItem('non_existent')).toBeNull();
    });
  });

  describe('Remove and Clear Operations', () => {
    test('should remove an item', () => {
      StorageUtils.setItem('test_key', 'value');
      StorageUtils.removeItem('test_key');
      expect(StorageUtils.getItem('test_key')).toBeNull();
    });

    test('should clear all piano app data', () => {
      StorageUtils.setItem(STORAGE_KEYS.THEME, 'modern');
      StorageUtils.setItem(STORAGE_KEYS.VOLUME, 0.7);
      StorageUtils.clearAll();

      expect(StorageUtils.getItem(STORAGE_KEYS.THEME)).toBeNull();
      expect(StorageUtils.getItem(STORAGE_KEYS.VOLUME)).toBeNull();
    });
  });

  describe('Settings Persistence', () => {
    test('should save theme setting', () => {
      StorageUtils.saveSettings({ theme: 'modern' });
      const settings = StorageUtils.loadSettings();
      expect(settings.theme).toBe('modern');
    });

    test('should save volume setting', () => {
      StorageUtils.saveSettings({ volume: 0.7 });
      const settings = StorageUtils.loadSettings();
      expect(settings.volume).toBe(0.7);
    });

    test('should save label mode setting', () => {
      StorageUtils.saveSettings({ labelMode: 'japanese' });
      const settings = StorageUtils.loadSettings();
      expect(settings.labelMode).toBe('japanese');
    });

    test('should save multiple settings at once', () => {
      StorageUtils.saveSettings({
        theme: 'neon',
        volume: 0.8,
        labelMode: 'none',
      });

      const settings = StorageUtils.loadSettings();
      expect(settings.theme).toBe('neon');
      expect(settings.volume).toBe(0.8);
      expect(settings.labelMode).toBe('none');
    });

    test('should load default settings when none exist', () => {
      const settings = StorageUtils.loadSettings();
      expect(settings.theme).toBe('classic');
      expect(settings.volume).toBe(0.5);
      expect(settings.labelMode).toBe('english');
    });
  });

  describe('Recording Storage', () => {
    test('should save a recording', () => {
      const recording = {
        name: 'Test Recording',
        duration: 10.5,
        events: [
          { type: 'noteOn', note: 'C4', timestamp: 0 },
          { type: 'noteOff', note: 'C4', timestamp: 1 },
        ],
      };

      StorageUtils.saveRecording(recording);
      const recordings = StorageUtils.loadRecordings();

      expect(recordings).toHaveLength(1);
      expect(recordings[0].name).toBe('Test Recording');
      expect(recordings[0].duration).toBe(10.5);
    });

    test('should add id and timestamp to recordings', () => {
      const recording = {
        name: 'Test',
        events: [],
      };

      StorageUtils.saveRecording(recording);
      const recordings = StorageUtils.loadRecordings();

      expect(recordings[0].id).toBeDefined();
      expect(recordings[0].timestamp).toBeDefined();
    });

    test('should load empty array when no recordings exist', () => {
      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toEqual([]);
    });

    test('should save multiple recordings', () => {
      StorageUtils.saveRecording({ name: 'Recording 1', events: [] });
      StorageUtils.saveRecording({ name: 'Recording 2', events: [] });
      StorageUtils.saveRecording({ name: 'Recording 3', events: [] });

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(3);
    });

    test('should limit to 10 recordings', () => {
      // Save 15 recordings
      for (let i = 0; i < 15; i++) {
        StorageUtils.saveRecording({ name: `Recording ${i}`, events: [] });
      }

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(10);
      // Should keep the most recent 10
      expect(recordings[9].name).toBe('Recording 14');
    });
  });

  describe('Recording Deletion', () => {
    test('should delete a recording by id', async () => {
      StorageUtils.saveRecording({ name: 'Recording 1', events: [] });
      // Add delay to ensure unique IDs
      await new Promise(resolve => setTimeout(resolve, 10));
      StorageUtils.saveRecording({ name: 'Recording 2', events: [] });

      const recordings = StorageUtils.loadRecordings();
      const idToDelete = recordings[0].id;

      StorageUtils.deleteRecording(idToDelete);
      const updatedRecordings = StorageUtils.loadRecordings();

      expect(updatedRecordings).toHaveLength(1);
      expect(updatedRecordings[0].name).toBe('Recording 2');
    });

    test('should handle deleting non-existent recording', () => {
      StorageUtils.saveRecording({ name: 'Recording 1', events: [] });
      StorageUtils.deleteRecording(99999);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(1);
    });
  });

  describe('Storage Size', () => {
    test('should return 0 for empty storage', () => {
      const size = StorageUtils.getStorageSize();
      expect(size).toBe(0);
    });

    test('should calculate storage size', () => {
      StorageUtils.saveSettings({ theme: 'modern', volume: 0.5 });
      const size = StorageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });
  });

  describe('Recording Data Format', () => {
    test('should store recording with correct structure', () => {
      const recording = {
        name: 'Test Song',
        duration: 30.5,
        tempo: 120,
        events: [
          { type: 'noteOn', note: 'C4', frequency: 261.63, timestamp: 0, velocity: 0.8 },
          { type: 'noteOff', note: 'C4', timestamp: 0.5 },
          { type: 'noteOn', note: 'E4', frequency: 329.63, timestamp: 1.0, velocity: 0.8 },
          { type: 'noteOff', note: 'E4', timestamp: 1.5 },
        ],
      };

      StorageUtils.saveRecording(recording);
      const recordings = StorageUtils.loadRecordings();
      const saved = recordings[0];

      expect(saved.name).toBe('Test Song');
      expect(saved.duration).toBe(30.5);
      expect(saved.tempo).toBe(120);
      expect(saved.events).toHaveLength(4);
      expect(saved.events[0].type).toBe('noteOn');
      expect(saved.events[0].frequency).toBe(261.63);
    });
  });
});
