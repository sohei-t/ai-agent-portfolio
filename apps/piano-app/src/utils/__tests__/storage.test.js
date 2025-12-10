/**
 * Test suite for Storage Utilities
 * Tests localStorage operations with error handling
 */

import StorageUtils, { STORAGE_KEYS } from '../storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('STORAGE_KEYS', () => {
    test('should have all required keys', () => {
      expect(STORAGE_KEYS.THEME).toBe('piano_theme');
      expect(STORAGE_KEYS.VOLUME).toBe('piano_volume');
      expect(STORAGE_KEYS.LABEL_MODE).toBe('piano_label_mode');
      expect(STORAGE_KEYS.RECORDINGS).toBe('piano_recordings');
    });
  });

  describe('getItem', () => {
    test('should get item from localStorage', () => {
      localStorage.setItem('test_key', JSON.stringify({ value: 42 }));
      const result = StorageUtils.getItem('test_key');
      expect(result).toEqual({ value: 42 });
    });

    test('should return default value when key does not exist', () => {
      const result = StorageUtils.getItem('nonexistent', 'default');
      expect(result).toBe('default');
    });

    test('should return null when no default provided and key missing', () => {
      const result = StorageUtils.getItem('nonexistent');
      expect(result).toBe(null);
    });

    test('should handle JSON parse errors', () => {
      localStorage.setItem('invalid_json', 'not valid json {]');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = StorageUtils.getItem('invalid_json', 'fallback');

      expect(result).toBe('fallback');
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    test('should handle string values', () => {
      localStorage.setItem('string_key', JSON.stringify('hello'));
      const result = StorageUtils.getItem('string_key');
      expect(result).toBe('hello');
    });

    test('should handle number values', () => {
      localStorage.setItem('number_key', JSON.stringify(123));
      const result = StorageUtils.getItem('number_key');
      expect(result).toBe(123);
    });

    test('should handle boolean values', () => {
      localStorage.setItem('bool_key', JSON.stringify(true));
      const result = StorageUtils.getItem('bool_key');
      expect(result).toBe(true);
    });

    test('should handle array values', () => {
      localStorage.setItem('array_key', JSON.stringify([1, 2, 3]));
      const result = StorageUtils.getItem('array_key');
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('setItem', () => {
    test('should set item in localStorage', () => {
      const success = StorageUtils.setItem('test_key', { value: 42 });
      expect(success).toBe(true);
      expect(localStorage.getItem('test_key')).toBe(JSON.stringify({ value: 42 }));
    });

    test('should set string values', () => {
      StorageUtils.setItem('string_key', 'hello');
      expect(localStorage.getItem('string_key')).toBe(JSON.stringify('hello'));
    });

    test('should set number values', () => {
      StorageUtils.setItem('number_key', 123);
      expect(localStorage.getItem('number_key')).toBe(JSON.stringify(123));
    });

    test('should set boolean values', () => {
      StorageUtils.setItem('bool_key', false);
      expect(localStorage.getItem('bool_key')).toBe(JSON.stringify(false));
    });

    test('should set array values', () => {
      StorageUtils.setItem('array_key', [1, 2, 3]);
      expect(localStorage.getItem('array_key')).toBe(JSON.stringify([1, 2, 3]));
    });

    test('should handle errors and return false', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = jest.fn(() => {
        throw new Error('Storage full');
      });

      const success = StorageUtils.setItem('test_key', 'value');

      expect(success).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      Storage.prototype.setItem = originalSetItem;
      consoleErrorSpy.mockRestore();
    });
  });

  describe('removeItem', () => {
    test('should remove item from localStorage', () => {
      localStorage.setItem('test_key', 'test_value');
      const success = StorageUtils.removeItem('test_key');

      expect(success).toBe(true);
      expect(localStorage.getItem('test_key')).toBe(null);
    });

    test('should handle removing non-existent key', () => {
      const success = StorageUtils.removeItem('nonexistent');
      expect(success).toBe(true);
    });

    test('should handle errors and return false', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const originalRemoveItem = Storage.prototype.removeItem;
      Storage.prototype.removeItem = jest.fn(() => {
        throw new Error('Remove error');
      });

      const success = StorageUtils.removeItem('test_key');

      expect(success).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      Storage.prototype.removeItem = originalRemoveItem;
      consoleErrorSpy.mockRestore();
    });
  });

  describe('clearAll', () => {
    test('should clear all piano app data', () => {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify('dark'));
      localStorage.setItem(STORAGE_KEYS.VOLUME, JSON.stringify(0.8));
      localStorage.setItem(STORAGE_KEYS.LABEL_MODE, JSON.stringify('japanese'));
      localStorage.setItem(STORAGE_KEYS.RECORDINGS, JSON.stringify([]));

      const success = StorageUtils.clearAll();

      expect(success).toBe(true);
      expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe(null);
      expect(localStorage.getItem(STORAGE_KEYS.VOLUME)).toBe(null);
      expect(localStorage.getItem(STORAGE_KEYS.LABEL_MODE)).toBe(null);
      expect(localStorage.getItem(STORAGE_KEYS.RECORDINGS)).toBe(null);
    });

    test('should not clear non-piano app data', () => {
      localStorage.setItem('other_app_data', 'should remain');
      StorageUtils.clearAll();
      expect(localStorage.getItem('other_app_data')).toBe('should remain');
    });

    test('should handle errors and return false', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const originalRemoveItem = Storage.prototype.removeItem;
      Storage.prototype.removeItem = jest.fn(() => {
        throw new Error('Clear error');
      });

      const success = StorageUtils.clearAll();

      expect(success).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      Storage.prototype.removeItem = originalRemoveItem;
      consoleErrorSpy.mockRestore();
    });
  });

  describe('saveSettings', () => {
    test('should save theme setting', () => {
      StorageUtils.saveSettings({ theme: 'dark' });
      const theme = StorageUtils.getItem(STORAGE_KEYS.THEME);
      expect(theme).toBe('dark');
    });

    test('should save volume setting', () => {
      StorageUtils.saveSettings({ volume: 0.7 });
      const volume = StorageUtils.getItem(STORAGE_KEYS.VOLUME);
      expect(volume).toBe(0.7);
    });

    test('should save label mode setting', () => {
      StorageUtils.saveSettings({ labelMode: 'japanese' });
      const labelMode = StorageUtils.getItem(STORAGE_KEYS.LABEL_MODE);
      expect(labelMode).toBe('japanese');
    });

    test('should save multiple settings at once', () => {
      StorageUtils.saveSettings({
        theme: 'dark',
        volume: 0.8,
        labelMode: 'japanese',
      });

      expect(StorageUtils.getItem(STORAGE_KEYS.THEME)).toBe('dark');
      expect(StorageUtils.getItem(STORAGE_KEYS.VOLUME)).toBe(0.8);
      expect(StorageUtils.getItem(STORAGE_KEYS.LABEL_MODE)).toBe('japanese');
    });

    test('should not save undefined values', () => {
      StorageUtils.saveSettings({ theme: 'dark' });
      StorageUtils.saveSettings({ volume: undefined });

      expect(StorageUtils.getItem(STORAGE_KEYS.THEME)).toBe('dark');
      expect(StorageUtils.getItem(STORAGE_KEYS.VOLUME)).toBe(null);
    });

    test('should save zero values', () => {
      StorageUtils.saveSettings({ volume: 0 });
      expect(StorageUtils.getItem(STORAGE_KEYS.VOLUME)).toBe(0);
    });
  });

  describe('loadSettings', () => {
    test('should load default settings when empty', () => {
      const settings = StorageUtils.loadSettings();

      expect(settings.theme).toBe('classic');
      expect(settings.volume).toBe(0.5);
      expect(settings.labelMode).toBe('english');
    });

    test('should load saved settings', () => {
      StorageUtils.setItem(STORAGE_KEYS.THEME, 'dark');
      StorageUtils.setItem(STORAGE_KEYS.VOLUME, 0.8);
      StorageUtils.setItem(STORAGE_KEYS.LABEL_MODE, 'japanese');

      const settings = StorageUtils.loadSettings();

      expect(settings.theme).toBe('dark');
      expect(settings.volume).toBe(0.8);
      expect(settings.labelMode).toBe('japanese');
    });

    test('should mix saved and default settings', () => {
      StorageUtils.setItem(STORAGE_KEYS.THEME, 'dark');

      const settings = StorageUtils.loadSettings();

      expect(settings.theme).toBe('dark');
      expect(settings.volume).toBe(0.5);
      expect(settings.labelMode).toBe('english');
    });
  });

  describe('saveRecording', () => {
    test('should save recording with id and timestamp', () => {
      const recording = { events: [], duration: 10 };
      const success = StorageUtils.saveRecording(recording);

      expect(success).toBe(true);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(1);
      expect(recordings[0]).toHaveProperty('id');
      expect(recordings[0]).toHaveProperty('timestamp');
      expect(recordings[0].events).toEqual([]);
      expect(recordings[0].duration).toBe(10);
    });

    test('should append to existing recordings', () => {
      StorageUtils.saveRecording({ duration: 10 });
      StorageUtils.saveRecording({ duration: 20 });

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(2);
      expect(recordings[0].duration).toBe(10);
      expect(recordings[1].duration).toBe(20);
    });

    test('should limit to 10 recordings', () => {
      for (let i = 1; i <= 12; i++) {
        StorageUtils.saveRecording({ number: i });
      }

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(10);
      expect(recordings[0].number).toBe(3); // First two were removed
      expect(recordings[9].number).toBe(12);
    });

    test('should generate unique IDs', async () => {
      StorageUtils.saveRecording({ test: 1 });
      // Wait 1ms to ensure different timestamp
      await new Promise(resolve => setTimeout(resolve, 1));
      StorageUtils.saveRecording({ test: 2 });

      const recordings = StorageUtils.loadRecordings();
      expect(recordings[0].id).not.toBe(recordings[1].id);
    });

    test('should generate ISO timestamp', () => {
      StorageUtils.saveRecording({ test: 1 });

      const recordings = StorageUtils.loadRecordings();
      expect(recordings[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('loadRecordings', () => {
    test('should return empty array when no recordings', () => {
      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toEqual([]);
    });

    test('should return saved recordings', () => {
      const testRecordings = [
        { id: 1, events: [], duration: 10 },
        { id: 2, events: [], duration: 20 },
      ];
      StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, testRecordings);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toEqual(testRecordings);
    });
  });

  describe('deleteRecording', () => {
    test('should delete recording by ID', () => {
      // Directly set recordings with known IDs
      const testRecordings = [
        { id: 1001, test: 1 },
        { id: 1002, test: 2 },
      ];
      StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, testRecordings);

      const success = StorageUtils.deleteRecording(1001);
      expect(success).toBe(true);

      const remaining = StorageUtils.loadRecordings();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].test).toBe(2);
    });

    test('should handle deleting non-existent ID', () => {
      const testRecordings = [{ id: 1001, test: 1 }];
      StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, testRecordings);

      const success = StorageUtils.deleteRecording(999999);
      expect(success).toBe(true);

      const recordings = StorageUtils.loadRecordings();
      expect(recordings).toHaveLength(1);
    });

    test('should delete all when all IDs match', () => {
      const testRecordings = [{ id: 1001, test: 1 }];
      StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, testRecordings);

      StorageUtils.deleteRecording(1001);

      const remaining = StorageUtils.loadRecordings();
      expect(remaining).toHaveLength(0);
    });
  });

  describe('getStorageSize', () => {
    test('should return 0 for empty storage', () => {
      const size = StorageUtils.getStorageSize();
      expect(size).toBe(0);
    });

    test('should calculate storage size', () => {
      StorageUtils.setItem(STORAGE_KEYS.THEME, 'dark');
      StorageUtils.setItem(STORAGE_KEYS.VOLUME, 0.5);

      const size = StorageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });

    test('should include all piano app keys', () => {
      StorageUtils.setItem(STORAGE_KEYS.THEME, 'dark');
      StorageUtils.setItem(STORAGE_KEYS.VOLUME, 0.5);
      StorageUtils.setItem(STORAGE_KEYS.LABEL_MODE, 'english');
      StorageUtils.setItem(STORAGE_KEYS.RECORDINGS, []);

      const size = StorageUtils.getStorageSize();
      expect(size).toBeGreaterThan(0);
    });

    test('should not count non-piano app data', () => {
      localStorage.setItem('other_data', 'x'.repeat(1000));
      const size = StorageUtils.getStorageSize();
      expect(size).toBe(0);
    });

    test('should increase with more data', () => {
      StorageUtils.setItem(STORAGE_KEYS.THEME, 'dark');
      const size1 = StorageUtils.getStorageSize();

      StorageUtils.setItem(STORAGE_KEYS.VOLUME, 0.5);
      const size2 = StorageUtils.getStorageSize();

      expect(size2).toBeGreaterThan(size1);
    });
  });
});
