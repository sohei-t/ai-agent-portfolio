/**
 * Unit Tests for PerformanceMonitor.js
 * Tests FPS tracking and adaptive quality system
 */

const PerformanceMonitor = require('../../src/core/PerformanceMonitor.js');

describe('PerformanceMonitor', () => {
  let performanceMonitor;

  beforeEach(() => {
    performanceMonitor = new PerformanceMonitor();
  });

  describe('Initialization', () => {
    test('should start with default high quality', () => {
      expect(performanceMonitor.qualityLevel).toBe('high');
      expect(performanceMonitor.currentFPS).toBe(60);
      expect(performanceMonitor.averageFPS).toBe(60);
    });

    test('should have empty frame time history', () => {
      expect(performanceMonitor.frameTimes).toHaveLength(0);
      expect(performanceMonitor.fpsHistory).toHaveLength(0);
    });
  });

  describe('FPS Tracking', () => {
    test('should track frame times', () => {
      performanceMonitor.update(0);
      performanceMonitor.update(16.67); // ~60 FPS
      performanceMonitor.update(33.34);

      expect(performanceMonitor.frameTimes.length).toBeGreaterThan(0);
    });

    test('should limit frame time history to 60 frames', () => {
      for (let i = 0; i < 100; i++) {
        performanceMonitor.update(i * 16.67);
      }

      expect(performanceMonitor.frameTimes.length).toBeLessThanOrEqual(60);
    });

    test('should calculate FPS correctly for 60 FPS', () => {
      performanceMonitor.update(0);
      for (let i = 1; i <= 60; i++) {
        performanceMonitor.update(i * 16.67); // 16.67ms = 60 FPS
      }
      performanceMonitor.update(1000);
      performanceMonitor.calculateFPS();

      expect(performanceMonitor.currentFPS).toBeGreaterThanOrEqual(55);
      expect(performanceMonitor.currentFPS).toBeLessThanOrEqual(65);
    });

    test('should calculate FPS correctly for 30 FPS', () => {
      performanceMonitor.update(0);
      for (let i = 1; i <= 30; i++) {
        performanceMonitor.update(i * 33.33); // 33.33ms = 30 FPS
      }
      performanceMonitor.update(1000);
      performanceMonitor.calculateFPS();

      expect(performanceMonitor.currentFPS).toBeGreaterThanOrEqual(25);
      expect(performanceMonitor.currentFPS).toBeLessThanOrEqual(35);
    });

    test('should maintain FPS history', () => {
      // Simulate 15 FPS calculations
      for (let i = 0; i < 15; i++) {
        performanceMonitor.update(i * 16.67);
      }
      // Trigger FPS calculation
      performanceMonitor.update(1000);
      performanceMonitor.calculateFPS();

      // Continue to add more FPS history entries
      for (let i = 0; i < 10; i++) {
        performanceMonitor.calculateFPS();
      }

      expect(performanceMonitor.fpsHistory.length).toBeLessThanOrEqual(10);
    });
  });

  describe('Quality Adjustment', () => {
    test('should set high quality for FPS >= 55', () => {
      performanceMonitor.averageFPS = 60;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('high');
    });

    test('should set medium quality for FPS 40-54', () => {
      performanceMonitor.averageFPS = 45;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('medium');
    });

    test('should set low quality for FPS < 40', () => {
      performanceMonitor.averageFPS = 30;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('low');
    });

    test('should reduce particle count on low FPS', () => {
      performanceMonitor.qualityLevel = 'high';
      expect(performanceMonitor.getMaxParticles()).toBe(100);

      performanceMonitor.qualityLevel = 'low';
      expect(performanceMonitor.getMaxParticles()).toBe(50);
    });

    test('should detect when to reduce effects', () => {
      performanceMonitor.averageFPS = 60;
      expect(performanceMonitor.shouldReduceEffects()).toBe(false);

      performanceMonitor.averageFPS = 35;
      expect(performanceMonitor.shouldReduceEffects()).toBe(true);
    });
  });

  describe('Adaptive Performance', () => {
    test('should adapt to performance drop', () => {
      // Start with good performance
      performanceMonitor.averageFPS = 60;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('high');

      // Simulate performance drop
      performanceMonitor.averageFPS = 35;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('low');
      expect(performanceMonitor.getMaxParticles()).toBe(50);
    });

    test('should recover quality when FPS improves', () => {
      performanceMonitor.averageFPS = 30;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('low');

      performanceMonitor.averageFPS = 60;
      performanceMonitor.adjustQuality();
      expect(performanceMonitor.qualityLevel).toBe('high');
    });
  });

  describe('Reset', () => {
    test('should reset all metrics', () => {
      performanceMonitor.frameTimes = [16, 17, 18];
      performanceMonitor.fpsHistory = [55, 58, 60];
      performanceMonitor.currentFPS = 58;
      performanceMonitor.averageFPS = 58;
      performanceMonitor.qualityLevel = 'medium';

      performanceMonitor.reset();

      expect(performanceMonitor.frameTimes).toHaveLength(0);
      expect(performanceMonitor.fpsHistory).toHaveLength(0);
      expect(performanceMonitor.currentFPS).toBe(60);
      expect(performanceMonitor.averageFPS).toBe(60);
      expect(performanceMonitor.qualityLevel).toBe('high');
    });
  });

  describe('Device Tier Detection', () => {
    test('should identify high-end device (60 FPS)', () => {
      // Simulate 60 FPS performance
      for (let i = 0; i < 60; i++) {
        performanceMonitor.update(i * 16.67); // ~60 FPS
      }
      performanceMonitor.update(1000);
      performanceMonitor.calculateFPS();

      // Add more samples
      for (let i = 0; i < 10; i++) {
        performanceMonitor.frameTimes = [16.67];
        performanceMonitor.calculateFPS();
      }

      performanceMonitor.adjustQuality();

      expect(performanceMonitor.qualityLevel).toBe('high');
      expect(performanceMonitor.getMaxParticles()).toBe(100);
    });

    test('should identify mid-range device (45 FPS)', () => {
      // Simulate 45 FPS performance
      for (let i = 0; i < 45; i++) {
        performanceMonitor.update(i * 22.22); // ~45 FPS
      }
      performanceMonitor.update(1000);
      performanceMonitor.calculateFPS();

      // Add more samples
      for (let i = 0; i < 10; i++) {
        performanceMonitor.frameTimes = [22.22];
        performanceMonitor.calculateFPS();
      }

      performanceMonitor.adjustQuality();

      expect(performanceMonitor.qualityLevel).toBe('medium');
    });

    test('should identify low-end device (30 FPS)', () => {
      // Simulate 30 FPS performance
      for (let i = 0; i < 30; i++) {
        performanceMonitor.update(i * 33.33); // ~30 FPS
      }
      performanceMonitor.update(1000);
      performanceMonitor.calculateFPS();

      // Add more samples
      for (let i = 0; i < 10; i++) {
        performanceMonitor.frameTimes = [33.33];
        performanceMonitor.calculateFPS();
      }

      performanceMonitor.adjustQuality();

      expect(performanceMonitor.qualityLevel).toBe('low');
      expect(performanceMonitor.shouldReduceEffects()).toBe(true);
    });
  });
});
