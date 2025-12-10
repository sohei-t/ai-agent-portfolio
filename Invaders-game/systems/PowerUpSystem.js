/**
 * PowerUpSystem.js
 * Power-up state management, timers, and stacking rules
 */

// Use POWER_UP_TYPES from PowerUp.js (already loaded)

class PowerUpSystem {
  constructor() {
    this.activePowerUps = new Map();
    this.maxActivePowerUps = Config.powerUps.maxActive;
    this.defaultDuration = Config.powerUps.duration;
  }

  activate(type, duration = this.defaultDuration) {
    if (this.activePowerUps.has(type)) {
      // Reset timer for existing power-up
      const powerUp = this.activePowerUps.get(type);
      powerUp.endTime = Date.now() + duration;
      return { success: true, action: 'reset' };
    } else if (this.activePowerUps.size < this.maxActivePowerUps) {
      // Add new power-up
      this.activePowerUps.set(type, {
        type,
        startTime: Date.now(),
        endTime: Date.now() + duration,
        duration
      });
      return { success: true, action: 'added' };
    } else {
      // Max capacity reached
      return { success: false, action: 'rejected', reason: 'max_capacity' };
    }
  }

  deactivate(type) {
    return this.activePowerUps.delete(type);
  }

  isActive(type) {
    return this.activePowerUps.has(type);
  }

  update(currentTime) {
    const expired = [];

    for (let [type, powerUp] of this.activePowerUps) {
      if (currentTime >= powerUp.endTime) {
        expired.push(type);
      }
    }

    expired.forEach(type => this.deactivate(type));

    return expired;
  }

  getRemainingTime(type) {
    if (!this.activePowerUps.has(type)) return 0;

    const powerUp = this.activePowerUps.get(type);
    const remaining = powerUp.endTime - Date.now();

    return Math.max(0, remaining);
  }

  getActivePowerUps() {
    return Array.from(this.activePowerUps.keys());
  }

  getCount() {
    return this.activePowerUps.size;
  }

  clear() {
    this.activePowerUps.clear();
  }

  canActivate() {
    return this.activePowerUps.size < this.maxActivePowerUps;
  }

  applyEffects(player) {
    // Apply power-up effects to player
    const effects = {
      fireRate: player.baseFireRate || Config.player.fireRate,
      isInvincible: false,
      multiShot: false
    };

    if (this.isActive(POWER_UP_TYPES.RAPID_FIRE)) {
      effects.fireRate = Config.powerUpEffects.RAPID_FIRE.fireRate;
    }

    if (this.isActive(POWER_UP_TYPES.SHIELD)) {
      effects.isInvincible = true;
    }

    if (this.isActive(POWER_UP_TYPES.MULTI_SHOT)) {
      effects.multiShot = true;
    }

    return effects;
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.PowerUpSystem = PowerUpSystem;
}

