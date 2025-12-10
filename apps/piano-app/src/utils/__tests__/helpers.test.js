/**
 * Test suite for Helper Utility Functions
 * Tests common utility functions for the piano app
 */

import {
  debounce,
  throttle,
  deepClone,
  deepMerge,
  clamp,
  formatDuration,
  generateId,
  isMobile,
  isTouchDevice,
  getScreenSize,
  requestAnimFrame,
  cancelAnimFrame,
} from '../helpers';

describe('Helper Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('debounce', () => {
    test('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockFn).toHaveBeenCalledWith('test');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 300);

      debouncedFn('first');
      jest.advanceTimersByTime(100);
      debouncedFn('second');
      jest.advanceTimersByTime(100);
      debouncedFn('third');
      jest.advanceTimersByTime(300);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('third');
    });

    test('should use default wait time if not provided', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn);

      debouncedFn();
      jest.advanceTimersByTime(299);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalled();
    });

    test('should pass multiple arguments', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2', 'arg3');
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });
  });

  describe('throttle', () => {
    test('should limit function execution', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('call1');
      throttledFn('call2');
      throttledFn('call3');

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call1');
    });

    test('should allow execution after wait time', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('first');
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);

      throttledFn('second');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenLastCalledWith('second');
    });

    test('should use default wait time if not provided', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    test('should pass all arguments', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('arg1', 'arg2');
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('deepClone', () => {
    test('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('string')).toBe('string');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    test('should clone arrays', () => {
      const original = [1, 2, 3, 4];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      cloned.push(5);
      expect(original).toHaveLength(4);
      expect(cloned).toHaveLength(5);
    });

    test('should clone nested arrays', () => {
      const original = [[1, 2], [3, 4]];
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[0]).not.toBe(original[0]);

      cloned[0].push(99);
      expect(original[0]).toHaveLength(2);
    });

    test('should clone objects', () => {
      const original = { a: 1, b: 2, c: 3 };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);

      cloned.d = 4;
      expect(original.d).toBeUndefined();
    });

    test('should clone nested objects', () => {
      const original = { a: { b: { c: 1 } } };
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.a).not.toBe(original.a);
      expect(cloned.a.b).not.toBe(original.a.b);

      cloned.a.b.c = 99;
      expect(original.a.b.c).toBe(1);
    });

    test('should clone Date objects', () => {
      const original = new Date('2025-12-10');
      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned instanceof Date).toBe(true);
    });

    test('should clone complex structures', () => {
      const original = {
        number: 42,
        string: 'test',
        array: [1, 2, 3],
        nested: {
          date: new Date('2025-12-10'),
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const cloned = deepClone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.nested).not.toBe(original.nested);
      expect(cloned.nested.items).not.toBe(original.nested.items);
    });
  });

  describe('deepMerge', () => {
    test('should merge simple objects', () => {
      const target = { a: 1, b: 2 };
      const source = { c: 3, d: 4 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    test('should override existing keys', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    test('should deep merge nested objects', () => {
      const target = { a: { b: 1, c: 2 } };
      const source = { a: { c: 3, d: 4 } };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
    });

    test('should not modify original objects', () => {
      const target = { a: 1 };
      const source = { b: 2 };
      deepMerge(target, source);

      expect(target).toEqual({ a: 1 });
      expect(source).toEqual({ b: 2 });
    });

    test('should handle non-object inputs', () => {
      expect(deepMerge({ a: 1 }, null)).toEqual({ a: 1 });
      expect(deepMerge({ a: 1 }, undefined)).toEqual({ a: 1 });
      expect(deepMerge({ a: 1 }, 'string')).toEqual({ a: 1 });
    });
  });

  describe('clamp', () => {
    test('should clamp value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test('should work with negative ranges', () => {
      expect(clamp(5, -10, -1)).toBe(-1);
      expect(clamp(-15, -10, -1)).toBe(-10);
    });

    test('should handle boundary values', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });

    test('should work with floating point numbers', () => {
      expect(clamp(0.5, 0, 1)).toBe(0.5);
      expect(clamp(1.5, 0, 1)).toBe(1);
      expect(clamp(-0.5, 0, 1)).toBe(0);
    });
  });

  describe('formatDuration', () => {
    test('should format seconds to MM:SS', () => {
      expect(formatDuration(0)).toBe('00:00');
      expect(formatDuration(30)).toBe('00:30');
      expect(formatDuration(60)).toBe('01:00');
      expect(formatDuration(90)).toBe('01:30');
      expect(formatDuration(125)).toBe('02:05');
    });

    test('should handle large durations', () => {
      expect(formatDuration(3600)).toBe('60:00');
      expect(formatDuration(3665)).toBe('61:05');
    });

    test('should pad single digits with zeros', () => {
      expect(formatDuration(9)).toBe('00:09');
      expect(formatDuration(69)).toBe('01:09');
    });

    test('should handle fractional seconds', () => {
      expect(formatDuration(30.7)).toBe('00:30');
      expect(formatDuration(90.9)).toBe('01:30');
    });
  });

  describe('generateId', () => {
    test('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(typeof id2).toBe('string');
    });

    test('should include timestamp', () => {
      const id = generateId();
      const timestamp = id.split('_')[0];

      expect(parseInt(timestamp)).toBeGreaterThan(0);
    });

    test('should include random component', () => {
      const id = generateId();
      const parts = id.split('_');

      expect(parts).toHaveLength(2);
      expect(parts[1].length).toBeGreaterThan(0);
    });
  });

  describe('isMobile', () => {
    const originalUserAgent = navigator.userAgent;

    afterEach(() => {
      Object.defineProperty(navigator, 'userAgent', {
        value: originalUserAgent,
        writable: true,
      });
    });

    test('should detect Android', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36',
        writable: true,
      });

      expect(isMobile()).toBe(true);
    });

    test('should detect iPhone', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)',
        writable: true,
      });

      expect(isMobile()).toBe(true);
    });

    test('should detect iPad', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPad; CPU OS 14_0)',
        writable: true,
      });

      expect(isMobile()).toBe(true);
    });

    test('should return false for desktop', () => {
      Object.defineProperty(navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        writable: true,
      });

      expect(isMobile()).toBe(false);
    });
  });

  describe('isTouchDevice', () => {
    test('should return boolean value', () => {
      const result = isTouchDevice();
      expect(typeof result).toBe('boolean');
    });

    test('should check for touch capabilities', () => {
      // This test just verifies the function executes without error
      // Actual touch detection depends on the test environment
      expect(() => isTouchDevice()).not.toThrow();
    });
  });

  describe('getScreenSize', () => {
    const setWindowWidth = (width) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    test('should return "xs" for very small screens', () => {
      setWindowWidth(320);
      expect(getScreenSize()).toBe('xs');
    });

    test('should return "sm" for small screens', () => {
      setWindowWidth(600);
      expect(getScreenSize()).toBe('sm');
    });

    test('should return "md" for medium screens', () => {
      setWindowWidth(800);
      expect(getScreenSize()).toBe('md');
    });

    test('should return "lg" for large screens', () => {
      setWindowWidth(1000);
      expect(getScreenSize()).toBe('lg');
    });

    test('should return "xl" for extra large screens', () => {
      setWindowWidth(1400);
      expect(getScreenSize()).toBe('xl');
    });

    test('should handle boundary values', () => {
      setWindowWidth(575);
      expect(getScreenSize()).toBe('xs');

      setWindowWidth(576);
      expect(getScreenSize()).toBe('sm');

      setWindowWidth(767);
      expect(getScreenSize()).toBe('sm');

      setWindowWidth(768);
      expect(getScreenSize()).toBe('md');
    });
  });

  describe('requestAnimFrame and cancelAnimFrame', () => {
    test('requestAnimFrame should be a function', () => {
      expect(typeof requestAnimFrame).toBe('function');
    });

    test('cancelAnimFrame should be a function', () => {
      expect(typeof cancelAnimFrame).toBe('function');
    });

    test('requestAnimFrame should execute callback', (done) => {
      jest.useRealTimers();
      const callback = jest.fn(() => {
        expect(callback).toHaveBeenCalled();
        done();
      });

      requestAnimFrame(callback);
    });
  });
});
