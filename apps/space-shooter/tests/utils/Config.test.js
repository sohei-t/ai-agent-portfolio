/**
 * Unit Tests for Config.js
 * Tests game configuration constants and values
 */

const Config = require('../../src/utils/Config.js');

describe('Config', () => {

  describe('Canvas Configuration', () => {
    test('should have correct canvas dimensions', () => {
      expect(Config.canvas.width).toBe(800);
      expect(Config.canvas.height).toBe(600);
    });

    test('should maintain 4:3 aspect ratio', () => {
      const ratio = Config.canvas.width / Config.canvas.height;
      expect(ratio).toBeCloseTo(4 / 3, 2);
    });

    test('should have valid background color', () => {
      expect(Config.canvas.backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Player Configuration', () => {
    test('should have correct player speed', () => {
      expect(Config.player.speed).toBe(5);
    });

    test('should have correct fire rate', () => {
      expect(Config.player.fireRate).toBe(300);
    });

    test('should have 3 lives', () => {
      expect(Config.player.maxLives).toBe(3);
    });

    test('player should have valid dimensions', () => {
      expect(Config.player.width).toBeGreaterThan(0);
      expect(Config.player.height).toBeGreaterThan(0);
    });
  });

  describe('Enemy Configuration', () => {
    test('should have 5 rows x 11 columns grid', () => {
      expect(Config.enemies.rows).toBe(5);
      expect(Config.enemies.cols).toBe(11);
    });

    test('should have 2px per frame speed', () => {
      expect(Config.enemies.speed).toBe(2);
    });

    test('should descend 20px after direction reversal', () => {
      expect(Config.enemies.descentAmount).toBe(20);
    });

    test('should have 1% fire probability', () => {
      expect(Config.enemies.fireRate).toBe(0.01);
    });

    test('should increase speed by 10% per wave', () => {
      expect(Config.enemies.speedIncreasePerWave).toBe(0.1);
    });
  });

  describe('Power-Up Configuration', () => {
    test('should have 15% drop rate', () => {
      expect(Config.powerUps.dropRate).toBe(0.15);
    });

    test('should last 10 seconds', () => {
      expect(Config.powerUps.duration).toBe(10000);
    });

    test('should allow maximum 3 active power-ups', () => {
      expect(Config.powerUps.maxActive).toBe(3);
    });

    test('should have exactly 3 power-up types', () => {
      expect(Config.powerUps.types).toHaveLength(3);
      expect(Config.powerUps.types).toContain('RAPID_FIRE');
      expect(Config.powerUps.types).toContain('SHIELD');
      expect(Config.powerUps.types).toContain('MULTI_SHOT');
    });
  });

  describe('Performance Configuration', () => {
    test('should have FPS targets for different device tiers', () => {
      expect(Config.performance.targetFPS.highEnd).toBe(60);
      expect(Config.performance.targetFPS.midRange).toBe(45);
      expect(Config.performance.targetFPS.lowEnd).toBe(30);
    });

    test('should have particle limits for performance tiers', () => {
      expect(Config.performance.maxParticles.highEnd).toBe(100);
      expect(Config.performance.maxParticles.lowEnd).toBe(50);
    });

    test('should reduce quality below 40 FPS', () => {
      expect(Config.performance.fpsThreshold).toBe(40);
    });

    test('should have memory limit under 100MB', () => {
      expect(Config.performance.memoryLimit).toBe(100);
    });
  });

  describe('Color Scheme', () => {
    test('should have cyberpunk neon colors', () => {
      expect(Config.colors.primary).toBe('#00ffff');
      expect(Config.colors.secondary).toBe('#ff00ff');
      expect(Config.colors.accent).toBe('#ffff00');
    });

    test('should have 3 different enemy colors', () => {
      expect(Config.colors.enemyTypes).toHaveLength(3);
      Config.colors.enemyTypes.forEach(color => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });
});
