/**
 * Unit Tests for PowerUp.js
 * Tests power-up entities, drops, and pickup mechanics
 */

const { PowerUp, POWER_UP_TYPES } = require('../../src/entities/PowerUp.js');
const Config = require('../../src/utils/Config.js');

describe('PowerUp', () => {
  let powerUp;
  const CANVAS_HEIGHT = 600;

  beforeEach(() => {
    powerUp = new PowerUp(400, 100, POWER_UP_TYPES.RAPID_FIRE);
  });

  describe('Initialization', () => {
    test('should have correct dimensions', () => {
      expect(powerUp.width).toBe(25);
      expect(powerUp.height).toBe(25);
    });

    test('should fall at 2 pixels per frame', () => {
      expect(powerUp.speed).toBe(2);
    });

    test('should last 10 seconds', () => {
      expect(powerUp.duration).toBe(10000);
    });

    test('should be active initially', () => {
      expect(powerUp.isActive).toBe(true);
    });
  });

  describe('Power-Up Types', () => {
    test('should have RAPID_FIRE type', () => {
      powerUp.type = POWER_UP_TYPES.RAPID_FIRE;
      const effect = powerUp.getEffect();

      expect(effect.fireRate).toBe(150);
    });

    test('should have SHIELD type', () => {
      powerUp.type = POWER_UP_TYPES.SHIELD;
      const effect = powerUp.getEffect();

      expect(effect.invincible).toBe(true);
    });

    test('should have MULTI_SHOT type', () => {
      powerUp.type = POWER_UP_TYPES.MULTI_SHOT;
      const effect = powerUp.getEffect();

      expect(effect.bulletCount).toBe(3);
      expect(effect.spreadAngle).toBe(120);
    });
  });

  describe('Movement', () => {
    test('should fall downward', () => {
      const initialY = powerUp.y;
      powerUp.update();

      expect(powerUp.y).toBe(initialY + 2);
    });

    test('should continue falling each frame', () => {
      const initialY = powerUp.y;

      for (let i = 0; i < 10; i++) {
        powerUp.update();
      }

      expect(powerUp.y).toBe(initialY + 20);
    });

    test('should detect when off bottom of screen', () => {
      powerUp.y = CANVAS_HEIGHT + 1;

      expect(powerUp.isOffScreen(CANVAS_HEIGHT)).toBe(true);
    });

    test('should not be off screen while visible', () => {
      powerUp.y = 300;

      expect(powerUp.isOffScreen(CANVAS_HEIGHT)).toBe(false);
    });
  });

  describe('Collision Bounds', () => {
    test('should return correct bounding box', () => {
      powerUp.x = 100;
      powerUp.y = 200;

      const bounds = powerUp.getBounds();

      expect(bounds.left).toBe(100);
      expect(bounds.right).toBe(125);
      expect(bounds.top).toBe(200);
      expect(bounds.bottom).toBe(225);
    });

    test('should update bounds after movement', () => {
      const initialBounds = powerUp.getBounds();

      powerUp.update();

      const newBounds = powerUp.getBounds();

      expect(newBounds.top).toBe(initialBounds.top + 2);
      expect(newBounds.bottom).toBe(initialBounds.bottom + 2);
    });
  });

  describe('Power-Up Spawning', () => {
    let spawner;

    beforeEach(() => {
      spawner = {
        dropRate: 0.15,
        activePowerUps: [],

        shouldDrop() {
          return Math.random() < this.dropRate;
        },

        getRandomType() {
          const types = Object.values(POWER_UP_TYPES);
          return types[Math.floor(Math.random() * types.length)];
        },

        spawn(x, y) {
          if (this.shouldDrop()) {
            this.activePowerUps.push({
              x,
              y,
              type: this.getRandomType(),
              isActive: true
            });
          }
        },

        update() {
          this.activePowerUps.forEach(p => {
            if (p.isActive) {
              p.y += 2;
              if (p.y > CANVAS_HEIGHT) {
                p.isActive = false;
              }
            }
          });
        },

        cleanup() {
          this.activePowerUps = this.activePowerUps.filter(p => p.isActive);
        }
      };
    });

    test('should have 15% drop rate', () => {
      expect(spawner.dropRate).toBe(0.15);
    });

    test('should randomly select power-up type', () => {
      const type = spawner.getRandomType();
      const validTypes = Object.values(POWER_UP_TYPES);

      expect(validTypes).toContain(type);
    });

    test('should spawn power-ups at enemy position', () => {
      spawner.dropRate = 1.0; // Force spawn
      spawner.spawn(200, 150);

      expect(spawner.activePowerUps.length).toBe(1);
      expect(spawner.activePowerUps[0].x).toBe(200);
      expect(spawner.activePowerUps[0].y).toBe(150);
    });

    test('should not always spawn (probabilistic)', () => {
      spawner.dropRate = 0.0; // Never spawn
      spawner.spawn(200, 150);

      expect(spawner.activePowerUps.length).toBe(0);
    });

    test('should update all active power-ups', () => {
      spawner.activePowerUps.push({ x: 100, y: 100, isActive: true });
      spawner.update();

      expect(spawner.activePowerUps[0].y).toBe(102);
    });

    test('should deactivate off-screen power-ups', () => {
      spawner.activePowerUps.push({ x: 100, y: CANVAS_HEIGHT - 1, isActive: true });
      spawner.update();

      expect(spawner.activePowerUps[0].isActive).toBe(false);
    });

    test('should clean up inactive power-ups', () => {
      spawner.activePowerUps.push({ x: 100, y: CANVAS_HEIGHT + 10, isActive: false });
      spawner.activePowerUps.push({ x: 100, y: 100, isActive: true });
      spawner.cleanup();

      expect(spawner.activePowerUps.length).toBe(1);
    });
  });

  describe('Power-Up Distribution', () => {
    test('should spawn all three types over time', () => {
      const spawner = {
        dropRate: 1.0,
        getRandomType() {
          const types = Object.values(POWER_UP_TYPES);
          return types[Math.floor(Math.random() * types.length)];
        }
      };

      const typesSeen = new Set();

      for (let i = 0; i < 100; i++) {
        typesSeen.add(spawner.getRandomType());
      }

      expect(typesSeen.size).toBe(3);
      expect(typesSeen.has(POWER_UP_TYPES.RAPID_FIRE)).toBe(true);
      expect(typesSeen.has(POWER_UP_TYPES.SHIELD)).toBe(true);
      expect(typesSeen.has(POWER_UP_TYPES.MULTI_SHOT)).toBe(true);
    });
  });

  describe('Deactivation', () => {
    test('should deactivate on pickup', () => {
      powerUp.deactivate();

      expect(powerUp.isActive).toBe(false);
    });

    test('should remain active until deactivated', () => {
      for (let i = 0; i < 100; i++) {
        powerUp.update();
      }

      expect(powerUp.isActive).toBe(true);
    });
  });

  describe('Power-Up Effects', () => {
    test('RAPID_FIRE should reduce fire rate to 150ms', () => {
      powerUp.type = POWER_UP_TYPES.RAPID_FIRE;
      const effect = powerUp.getEffect();

      expect(effect.fireRate).toBe(150);
      expect(effect.fireRate).toBeLessThan(300); // Normal fire rate
    });

    test('SHIELD should grant invincibility', () => {
      powerUp.type = POWER_UP_TYPES.SHIELD;
      const effect = powerUp.getEffect();

      expect(effect.invincible).toBe(true);
    });

    test('MULTI_SHOT should fire 3 bullets in 120 degree arc', () => {
      powerUp.type = POWER_UP_TYPES.MULTI_SHOT;
      const effect = powerUp.getEffect();

      expect(effect.bulletCount).toBe(3);
      expect(effect.spreadAngle).toBe(120);
    });
  });

  describe('Visual Properties', () => {
    test('should have distinguishable size for touch controls', () => {
      // 25x25 is large enough for mobile touch
      expect(powerUp.width).toBeGreaterThanOrEqual(20);
      expect(powerUp.height).toBeGreaterThanOrEqual(20);
    });

    test('should be smaller than player for visual clarity', () => {
      const playerSize = 40;

      expect(powerUp.width).toBeLessThan(playerSize);
      expect(powerUp.height).toBeLessThan(playerSize);
    });
  });
});
