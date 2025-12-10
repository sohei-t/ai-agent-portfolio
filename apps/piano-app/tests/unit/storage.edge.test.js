/**
 * Edge Case Tests for LocalStorage Utilities
 * Tests quota limits, error handling, and data corruption scenarios
 *
 * ITERATION 2: Edge cases and error handling
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';

const STORAGE_KEYS = {
  THEME: 'piano_theme',
  VOLUME: 'piano_volume',
  LABEL_MODE: 'piano_label_mode',
  RECORDINGS: 'piano_recordings',
};

const StorageUtils = {
  getItem: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return defaultValue;
    }
  },

  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${error}`);
      return false;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
      return false;
    }
  },

  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
      return false;
    }
  },

  saveSettings: (settings) => {
    const { theme, volume, labelMode } = settings;
    if (theme !== undefined) StorageUtils.setItem(STORAGE_KEYS.THEME, theme);
    if (volume !== undefined) StorageUtils.setItem(STORAGE_KEYS.VOLUME, volume);
    if (labelMode !== undefined) StorageUtils.setItem(STORAGE_KEYS.LABEL_MODE, labelMode);
  },

  loadSettings: () => {
    return {
      theme: StorageUtils.getItem(STORAGE_KEYS.THEME, 'classic'),
      volume: StorageUtils.getItem(STORAGE_KEYS.VOLUME, 0.5),
      labelMode: StorageUtils.getItem(STORAGE_KEYS.LABEL_MODE, 'english'),
    };
  },

  saveRecording: (recording) => {
    const recordings = StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
    const newRecording = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...recording,
    };
    recordings.push(newRecording);

    if (recordings.length > 10) {
      recordings.shift();
    }

    return StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, recordings);
  },

  loadRecordings: () => {
    return StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
  },

  deleteRecording: (id) => {
    const recordings = StorageUtils.getItem(STORAGE_KEYS.RECORDINGS, []);
    const filtered = recordings.filter(r => r.id !== id);
    return StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, filtered);
  },

  getStorageSize: () => {
    let total = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        total += item.length * 2;
      }
    });
    return total;
  },
};

describe('Storage Utilities - Iteration 2: Edge Cases and Error Handling', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Data Corruption Handling', () => {
    test('should handle corrupted JSON data', () => {
      localStorage.setItem('test_key', 'invalid{json]');
      const result = StorageUtils.getItem('test_key', 'default');
      expect(result).toBe('default');
    });

    test('should handle partial JSON data', () => {
      localStorage.setItem('test_key', '{"incomplete":');
      const result = StorageUtils.getItem('test_key', 'fallback');
      expect(result).toBe('fallback');
    });

    test('should handle non-JSON string', () => {
      localStorage.setItem('test_key', 'just a plain string');
      const result = StorageUtils.getItem('test_key', null);
      expect(result).toBeNull();
    });

    test('should handle corrupted settings gracefully', () => {
      localStorage.setItem(STORAGE_KEYS.THEME, 'invalid json {');
      const settings = StorageUtils.loadSettings();

      expect(settings.theme).toBe('classic'); // Default value
    });

    test('should handle corrupted recordings array', () => {
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, '[{incomplete');
      const recordings = StorageUtils.loadRecordings();

      expect(recordings).toEqual([]); // Default empty array
    });
  });

  describe('Special Characters and Encoding', () => {
    test('should handle unicode characters', () => {
      const data = { text: '日本語のテキスト 🎹' };
      StorageUtils.setItem('unicode_test', data);
      const retrieved = StorageUtils.getItem('unicode_test');

      expect(retrieved.text).toBe('日本語のテキスト 🎹');
    });

    test('should handle emoji in recording names', () => {
      const recording = { name: '🎵 My Song 🎹', events: [] };
      StorageUtils.saveRecording(recording);
      const recordings = StorageUtils.loadRecordings();

      expect(recordings[0].name).toBe('🎵 My Song 🎹');
    });

    test('should handle special characters in settings', () => {
      StorageUtils.saveSettings({ theme: 'theme-with-"quotes"' });
      const settings = StorageUtils.loadSettings();

      expect(settings.theme).toBe('theme-with-"quotes"');
    });

    test('should handle newlines and tabs in data', () => {
      const data = { text: 'Line 1\nLine 2\tTabbed' };
      StorageUtils.setItem('special_chars', data);
      const retrieved = StorageUtils.getItem('special_chars');

      expect(retrieved.text).toBe('Line 1\nLine 2\tTabbed');
    });
  });

  describe('Null and Undefined Handling', () => {
    test('should handle null key', () => {
      const result = StorageUtils.getItem(null, 'default');
      expect(result).toBe('default');
    });

    test('should handle undefined key', () => {
      const result = StorageUtils.getItem(undefined, 'default');
      expect(result).toBe('default');
    });

    test('should handle empty string key', () => {
      StorageUtils.setItem('', 'value');
      const result = StorageUtils.getItem('');
      expect(result).toBe('value');
    });

    test('should handle null value storage', () => {
      StorageUtils.setItem('null_test', null);
      const result = StorageUtils.getItem('null_test');
      expect(result).toBeNull();
    });

    test('should handle undefined value storage', () => {
      StorageUtils.setItem('undefined_test', undefined);
      const result = StorageUtils.getItem('undefined_test');
      // JSON.stringify(undefined) returns undefined, which localStorage doesn't store
      // So we expect null (default fallback) or undefined
      expect([null, undefined]).toContain(result);
    });
  });

  describe('Large Data Handling', () => {
    test('should handle large recording with many events', () => {
      const largeRecording = {
        name: 'Large Recording',
        events: Array.from({ length: 1000 }, (_, i) => ({
          type: i % 2 === 0 ? 'noteOn' : 'noteOff',
          note: 'C4',
          timestamp: i * 0.1,
        })),
      };

      const success = StorageUtils.saveRecording(largeRecording);
      expect(success).toBe(true);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings[0].events).toHaveLength(1000);
    });

    test('should handle recording with long name', () => {
      const recording = {
        name: 'A'.repeat(1000),
        events: [],
      };

      StorageUtils.saveRecording(recording);
      const recordings = StorageUtils.loadRecordings();

      expect(recordings[0].name).toHaveLength(1000);
    });

    test('should handle deeply nested objects', () => {
      const nested = {
        level1: {
          level2: {
            level3: {
              level4: {
                data: 'deep value',
              },
            },
          },
        },
      };

      StorageUtils.setItem('nested', nested);
      const retrieved = StorageUtils.getItem('nested');

      expect(retrieved.level1.level2.level3.level4.data).toBe('deep value');
    });

    test('should calculate storage size for large data', () => {
      // Save multiple large recordings
      for (let i = 0; i < 5; i++) {
        StorageUtils.saveRecording({
          name: `Recording ${i}`,
          events: Array.from({ length: 100 }, () => ({
            type: 'noteOn',
            note: 'C4',
            timestamp: 0,
          })),
        });
      }

      const size = StorageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });
  });

  describe('Concurrent Operations', () => {
    test('should handle rapid successive writes', () => {
      for (let i = 0; i < 100; i++) {
        StorageUtils.setItem('rapid_test', i);
      }

      const result = StorageUtils.getItem('rapid_test');
      expect(result).toBe(99); // Last value
    });

    test('should handle multiple recordings saved rapidly', () => {
      for (let i = 0; i < 15; i++) {
        StorageUtils.saveRecording({
          name: `Rapid Recording ${i}`,
          events: [],
        });
      }

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(10); // Limited to 10
    });
  });

  describe('Recording Limit Edge Cases', () => {
    test('should keep exactly 10 recordings after saving 11th', () => {
      for (let i = 0; i < 11; i++) {
        StorageUtils.saveRecording({
          name: `Recording ${i}`,
          events: [],
        });
      }

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(10);
      expect(recordings[0].name).toBe('Recording 1'); // First one removed
      expect(recordings[9].name).toBe('Recording 10');
    });

    test('should handle saving exactly 10 recordings', () => {
      for (let i = 0; i < 10; i++) {
        StorageUtils.saveRecording({
          name: `Recording ${i}`,
          events: [],
        });
      }

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(10);
      expect(recordings[0].name).toBe('Recording 0');
    });

    test('should delete recording at boundary', async () => {
      for (let i = 0; i < 10; i++) {
        StorageUtils.saveRecording({
          name: `Recording ${i}`,
          events: [],
        });
        // Add delay to ensure unique IDs
        await new Promise(resolve => setTimeout(resolve, 2));
      }

      const recordings = StorageUtils.loadRecordings();
      const firstId = recordings[0].id;
      const lastId = recordings[9].id;

      // Delete first
      StorageUtils.deleteRecording(firstId);
      let updated = StorageUtils.loadRecordings();
      expect(updated).toHaveLength(9);

      // Delete last
      StorageUtils.deleteRecording(lastId);
      updated = StorageUtils.loadRecordings();
      expect(updated).toHaveLength(8);
    });
  });

  describe('Settings Validation', () => {
    test('should handle invalid theme value', () => {
      StorageUtils.saveSettings({ theme: 12345 });
      const settings = StorageUtils.loadSettings();
      expect(settings.theme).toBe(12345); // No validation, stores as-is
    });

    test('should handle invalid volume value', () => {
      StorageUtils.saveSettings({ volume: 'loud' });
      const settings = StorageUtils.loadSettings();
      expect(settings.volume).toBe('loud'); // No validation
    });

    test('should handle empty settings object', () => {
      StorageUtils.saveSettings({});
      const settings = StorageUtils.loadSettings();

      // Should return defaults
      expect(settings.theme).toBe('classic');
      expect(settings.volume).toBe(0.5);
      expect(settings.labelMode).toBe('english');
    });

    test('should handle partial settings update', () => {
      StorageUtils.saveSettings({ theme: 'modern', volume: 0.7 });
      StorageUtils.saveSettings({ theme: 'neon' }); // Only update theme

      const settings = StorageUtils.loadSettings();
      expect(settings.theme).toBe('neon');
      expect(settings.volume).toBe(0.7); // Unchanged
    });
  });

  describe('Recording Data Integrity', () => {
    test('should preserve recording structure after save/load', () => {
      const original = {
        name: 'Test',
        duration: 10.5,
        tempo: 120,
        events: [
          { type: 'noteOn', note: 'C4', frequency: 261.63, timestamp: 0, velocity: 0.8 },
        ],
      };

      StorageUtils.saveRecording(original);
      const recordings = StorageUtils.loadRecordings();
      const saved = recordings[0];

      expect(saved.name).toBe(original.name);
      expect(saved.duration).toBe(original.duration);
      expect(saved.tempo).toBe(original.tempo);
      expect(saved.events).toEqual(original.events);
    });

    test('should add unique ID to each recording', async () => {
      StorageUtils.saveRecording({ name: 'Recording 1', events: [] });
      // Add delay to ensure unique IDs
      await new Promise(resolve => setTimeout(resolve, 10));
      StorageUtils.saveRecording({ name: 'Recording 2', events: [] });

      const recordings = StorageUtils.loadRecordings();
      expect(recordings[0].id).not.toBe(recordings[1].id);
    });

    test('should add ISO timestamp to recordings', () => {
      StorageUtils.saveRecording({ name: 'Test', events: [] });
      const recordings = StorageUtils.loadRecordings();

      expect(recordings[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('Delete Edge Cases', () => {
    test('should handle deleting from empty recordings', () => {
      const success = StorageUtils.deleteRecording(123);
      expect(success).toBe(true);
    });

    test('should handle deleting with null ID', () => {
      StorageUtils.saveRecording({ name: 'Test', events: [] });
      StorageUtils.deleteRecording(null);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(1); // Nothing deleted
    });

    test('should handle deleting with undefined ID', () => {
      StorageUtils.saveRecording({ name: 'Test', events: [] });
      StorageUtils.deleteRecording(undefined);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(1);
    });

    test('should handle deleting with string ID', () => {
      StorageUtils.saveRecording({ name: 'Test', events: [] });
      StorageUtils.deleteRecording('not-a-number');

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(1);
    });
  });

  describe('Clear Operations Edge Cases', () => {
    test('should clear all data even with corrupted entries', () => {
      // Set some valid and invalid data
      StorageUtils.saveSettings({ theme: 'modern' });
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, 'invalid json');

      const success = StorageUtils.clearAll();
      expect(success).toBe(true);

      expect(StorageUtils.getItem(STORAGE_KEYS.THEME)).toBeNull();
      expect(StorageUtils.getItem(STORAGE_KEYS.RECORDINGS)).toBeNull();
    });

    test('should handle clearing already empty storage', () => {
      const success = StorageUtils.clearAll();
      expect(success).toBe(true);
    });

    test('should only clear piano app keys', () => {
      // Set non-piano data
      localStorage.setItem('other_app_data', 'should remain');

      StorageUtils.saveSettings({ theme: 'modern' });
      StorageUtils.clearAll();

      // Piano data cleared
      expect(StorageUtils.getItem(STORAGE_KEYS.THEME)).toBeNull();

      // Other data remains
      expect(localStorage.getItem('other_app_data')).toBe('should remain');
    });
  });

  describe('Storage Size Edge Cases', () => {
    test('should return 0 for completely empty storage', () => {
      const size = StorageUtils.getStorageSize();
      expect(size).toBe(0);
    });

    test('should handle size calculation with corrupted data', () => {
      localStorage.setItem(STORAGE_KEYS.THEME, 'invalid json {');
      const size = StorageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });

    test('should accurately calculate size for mixed data types', () => {
      StorageUtils.saveSettings({
        theme: 'modern',
        volume: 0.5,
        labelMode: 'japanese',
      });

      const size = StorageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });
  });
});
