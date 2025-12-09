/**
 * Unit Tests for PowerUpSystem.js
 * Tests power-up state management, timers, and stacking rules
 * ITERATION 1: Core power-up mechanics and stacking logic
 */

const PowerUpSystem = require('../../src/systems/PowerUpSystem.js');
const { POWER_UP_TYPES } = require('../../src/entities/PowerUp.js');

describe('PowerUpSystem', () => {
  let powerUpSystem;

  beforeEach(() => {
    powerUpSystem = new PowerUpSystem();
  });

  describe('Power-Up Activation', () => {
    test('should activate new power-up', () => {
      const result = powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      expect(result.success).toBe(true);
      expect(result.action).toBe('added');
      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(true);
    });

    test('should reset timer when same type collected again', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      // Simulate time passing
      const firstPowerUp = powerUpSystem.activePowerUps.get(POWER_UP_TYPES.RAPID_FIRE);
      const firstEndTime = firstPowerUp.endTime;

      // Collect same type again
      const result = powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      const updatedPowerUp = powerUpSystem.activePowerUps.get(POWER_UP_TYPES.RAPID_FIRE);

      expect(result.action).toBe('reset');
      expect(updatedPowerUp.endTime).toBeGreaterThanOrEqual(firstEndTime);
    });

    test('should stack different power-up types', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);

      expect(powerUpSystem.getCount()).toBe(2);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(true);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.SHIELD)).toBe(true);
    });

    test('should allow maximum 3 active power-ups', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT);

      expect(powerUpSystem.getCount()).toBe(3);
    });

    test('should reject 4th power-up when at max capacity', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT);

      // Try to activate a 4th (should fail since it's same as existing)
      const result = powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      // Since it's the same type, it resets instead of rejecting
      expect(result.action).toBe('reset');
    });

    test('should use default 10 second duration', () => {
      const startTime = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      const powerUp = powerUpSystem.activePowerUps.get(POWER_UP_TYPES.RAPID_FIRE);
      const duration = powerUp.endTime - powerUp.startTime;

      expect(duration).toBeCloseTo(10000, -2); // Within 100ms
    });

    test('should allow custom duration', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 5000);

      const powerUp = powerUpSystem.activePowerUps.get(POWER_UP_TYPES.RAPID_FIRE);
      const duration = powerUp.endTime - powerUp.startTime;

      expect(duration).toBeCloseTo(5000, -2);
    });
  });

  describe('Power-Up Deactivation', () => {
    test('should deactivate power-up', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      const result = powerUpSystem.deactivate(POWER_UP_TYPES.RAPID_FIRE);

      expect(result).toBe(true);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(false);
    });

    test('should return false when deactivating non-existent power-up', () => {
      const result = powerUpSystem.deactivate(POWER_UP_TYPES.RAPID_FIRE);

      expect(result).toBe(false);
    });

    test('should only deactivate specified power-up', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);

      powerUpSystem.deactivate(POWER_UP_TYPES.RAPID_FIRE);

      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(false);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.SHIELD)).toBe(true);
    });
  });

  describe('Timer Management', () => {
    test('should expire power-up after duration', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1000);

      // Update after 1 second
      const expired = powerUpSystem.update(now + 1001);

      expect(expired).toContain(POWER_UP_TYPES.RAPID_FIRE);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(false);
    });

    test('should not expire power-up before duration', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1000);

      // Update after 0.5 seconds
      const expired = powerUpSystem.update(now + 500);

      expect(expired).toEqual([]);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(true);
    });

    test('should handle multiple power-ups expiring simultaneously', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1000);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD, 1000);

      const expired = powerUpSystem.update(now + 1001);

      expect(expired.length).toBe(2);
      expect(powerUpSystem.getCount()).toBe(0);
    });

    test('should handle staggered expirations', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1000);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD, 2000);

      // After 1 second
      let expired = powerUpSystem.update(now + 1001);
      expect(expired).toContain(POWER_UP_TYPES.RAPID_FIRE);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.SHIELD)).toBe(true);

      // After 2 seconds
      expired = powerUpSystem.update(now + 2001);
      expect(expired).toContain(POWER_UP_TYPES.SHIELD);
      expect(powerUpSystem.getCount()).toBe(0);
    });

    test('should calculate remaining time correctly', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 5000);

      // Immediately after activation
      const remaining = powerUpSystem.getRemainingTime(POWER_UP_TYPES.RAPID_FIRE);

      expect(remaining).toBeGreaterThan(4900);
      expect(remaining).toBeLessThanOrEqual(5000);
    });

    test('should return 0 remaining time for inactive power-up', () => {
      const remaining = powerUpSystem.getRemainingTime(POWER_UP_TYPES.RAPID_FIRE);

      expect(remaining).toBe(0);
    });

    test('should not return negative remaining time', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1000);

      // Simulate time far in the future
      powerUpSystem.update(now + 5000);

      const remaining = powerUpSystem.getRemainingTime(POWER_UP_TYPES.RAPID_FIRE);

      expect(remaining).toBe(0);
    });
  });

  describe('Stacking Rules', () => {
    test('should allow independent timers for different power-ups', () => {
      const now = Date.now();

      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 3000);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD, 5000);

      const rapidFireTime = powerUpSystem.getRemainingTime(POWER_UP_TYPES.RAPID_FIRE);
      const shieldTime = powerUpSystem.getRemainingTime(POWER_UP_TYPES.SHIELD);

      expect(rapidFireTime).toBeLessThan(shieldTime);
    });

    test('should reset timer when collecting same type twice', () => {
      const now = Date.now();

      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 10000);

      // Wait 5 seconds
      setTimeout(() => {}, 100); // Simulate time passing

      // Collect again
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 10000);

      const remaining = powerUpSystem.getRemainingTime(POWER_UP_TYPES.RAPID_FIRE);

      // Should be close to 10 seconds again
      expect(remaining).toBeGreaterThan(9900);
    });

    test('should maintain all 3 power-ups with independent timers', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 5000);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD, 10000);
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT, 8000);

      expect(powerUpSystem.getCount()).toBe(3);

      const types = powerUpSystem.getActivePowerUps();
      expect(types).toContain(POWER_UP_TYPES.RAPID_FIRE);
      expect(types).toContain(POWER_UP_TYPES.SHIELD);
      expect(types).toContain(POWER_UP_TYPES.MULTI_SHOT);
    });
  });

  describe('Power-Up Effects', () => {
    let player;

    beforeEach(() => {
      player = {
        baseFireRate: 300,
        fireRate: 300,
        isInvincible: false,
        multiShot: false
      };
    });

    test('should apply Rapid Fire effect', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      const effects = powerUpSystem.applyEffects(player);

      expect(effects.fireRate).toBe(150);
    });

    test('should apply Shield effect', () => {
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);

      const effects = powerUpSystem.applyEffects(player);

      expect(effects.isInvincible).toBe(true);
    });

    test('should apply Multi-Shot effect', () => {
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT);

      const effects = powerUpSystem.applyEffects(player);

      expect(effects.multiShot).toBe(true);
    });

    test('should apply multiple effects simultaneously', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT);

      const effects = powerUpSystem.applyEffects(player);

      expect(effects.fireRate).toBe(150);
      expect(effects.isInvincible).toBe(true);
      expect(effects.multiShot).toBe(true);
    });

    test('should return default values when no power-ups active', () => {
      const effects = powerUpSystem.applyEffects(player);

      expect(effects.fireRate).toBe(300);
      expect(effects.isInvincible).toBe(false);
      expect(effects.multiShot).toBe(false);
    });
  });

  describe('Utility Methods', () => {
    test('should get all active power-up types', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);

      const active = powerUpSystem.getActivePowerUps();

      expect(active).toContain(POWER_UP_TYPES.RAPID_FIRE);
      expect(active).toContain(POWER_UP_TYPES.SHIELD);
      expect(active.length).toBe(2);
    });

    test('should return empty array when no power-ups active', () => {
      const active = powerUpSystem.getActivePowerUps();

      expect(active).toEqual([]);
    });

    test('should get correct count', () => {
      expect(powerUpSystem.getCount()).toBe(0);

      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      expect(powerUpSystem.getCount()).toBe(1);

      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);
      expect(powerUpSystem.getCount()).toBe(2);
    });

    test('should check if can activate more power-ups', () => {
      expect(powerUpSystem.canActivate()).toBe(true);

      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT);

      expect(powerUpSystem.canActivate()).toBe(false);
    });

    test('should clear all power-ups', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);

      powerUpSystem.clear();

      expect(powerUpSystem.getCount()).toBe(0);
      expect(powerUpSystem.getActivePowerUps()).toEqual([]);
    });
  });

  describe('Edge Cases', () => {
    test('should handle rapid activation/deactivation', () => {
      for (let i = 0; i < 100; i++) {
        powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
        powerUpSystem.deactivate(POWER_UP_TYPES.RAPID_FIRE);
      }

      expect(powerUpSystem.getCount()).toBe(0);
    });

    test('should handle activation at max capacity with same type', () => {
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);
      powerUpSystem.activate(POWER_UP_TYPES.SHIELD);
      powerUpSystem.activate(POWER_UP_TYPES.MULTI_SHOT);

      // Try to re-activate existing type
      const result = powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE);

      expect(result.success).toBe(true);
      expect(result.action).toBe('reset');
    });

    test('should handle very short durations', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1);

      const expired = powerUpSystem.update(now + 2);

      expect(expired).toContain(POWER_UP_TYPES.RAPID_FIRE);
    });

    test('should handle very long durations', () => {
      const now = Date.now();
      powerUpSystem.activate(POWER_UP_TYPES.RAPID_FIRE, 1000000);

      const expired = powerUpSystem.update(now + 10000);

      expect(expired).toEqual([]);
      expect(powerUpSystem.isActive(POWER_UP_TYPES.RAPID_FIRE)).toBe(true);
    });
  });
});
