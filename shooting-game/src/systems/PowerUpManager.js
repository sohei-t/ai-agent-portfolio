/**
 * PowerUp Manager
 * Manages power-up spawning, collection, and effects
 */
import { GAME_CONFIG } from '../config/gameConfig.js';
import { MathUtils } from '../utils/MathUtils.js';

export class PowerUpManager {
  constructor() {
    this.activePowerUps = new Map(); // type -> { endTime, data }
    this.powerUpListeners = [];
  }

  /**
   * Check if should spawn power-up when enemy is destroyed
   * @returns {string|null} Power-up type or null
   */
  shouldSpawnPowerUp() {
    if (Math.random() > GAME_CONFIG.POWERUP.SPAWN_CHANCE) {
      return null;
    }

    // Select random power-up type based on probabilities
    const types = Object.keys(GAME_CONFIG.POWERUP).filter(
      key => typeof GAME_CONFIG.POWERUP[key] === 'object' && GAME_CONFIG.POWERUP[key].probability
    );

    const totalProbability = types.reduce(
      (sum, type) => sum + GAME_CONFIG.POWERUP[type].probability,
      0
    );

    let random = Math.random() * totalProbability;

    for (const type of types) {
      random -= GAME_CONFIG.POWERUP[type].probability;
      if (random <= 0) {
        return type;
      }
    }

    return types[0]; // Fallback
  }

  /**
   * Activate a power-up
   * @param {string} type - Power-up type
   * @returns {boolean} Success
   */
  activatePowerUp(type) {
    const powerUpConfig = GAME_CONFIG.POWERUP[type];
    if (!powerUpConfig) {
      console.warn(`Unknown power-up type: ${type}`);
      return false;
    }

    const duration = powerUpConfig.duration;
    const endTime = duration ? Date.now() + duration : null;

    // Special handling for instant power-ups (no duration)
    if (!duration) {
      this.notifyPowerUpActivated(type, powerUpConfig);
      return true;
    }

    // For timed power-ups, store or extend duration
    if (this.activePowerUps.has(type)) {
      // Extend duration if already active
      const current = this.activePowerUps.get(type);
      current.endTime = Math.max(current.endTime, endTime);
    } else {
      // Activate new power-up
      this.activePowerUps.set(type, {
        endTime,
        data: powerUpConfig
      });
    }

    this.notifyPowerUpActivated(type, powerUpConfig);
    return true;
  }

  /**
   * Update active power-ups (remove expired ones)
   */
  update() {
    const now = Date.now();
    const expiredTypes = [];

    for (const [type, powerUp] of this.activePowerUps) {
      if (now >= powerUp.endTime) {
        expiredTypes.push(type);
      }
    }

    // Remove expired power-ups
    expiredTypes.forEach(type => {
      this.deactivatePowerUp(type);
    });
  }

  /**
   * Deactivate a power-up
   * @param {string} type
   */
  deactivatePowerUp(type) {
    if (this.activePowerUps.has(type)) {
      const powerUp = this.activePowerUps.get(type);
      this.activePowerUps.delete(type);
      this.notifyPowerUpDeactivated(type, powerUp.data);
    }
  }

  /**
   * Check if a power-up is active
   * @param {string} type
   * @returns {boolean}
   */
  isActive(type) {
    return this.activePowerUps.has(type);
  }

  /**
   * Get remaining time for a power-up
   * @param {string} type
   * @returns {number} Milliseconds remaining (or 0 if not active)
   */
  getRemainingTime(type) {
    if (!this.activePowerUps.has(type)) {
      return 0;
    }

    const powerUp = this.activePowerUps.get(type);
    return Math.max(0, powerUp.endTime - Date.now());
  }

  /**
   * Get all active power-ups
   * @returns {Array} Array of {type, timeRemaining, data}
   */
  getActivePowerUps() {
    const result = [];
    for (const [type, powerUp] of this.activePowerUps) {
      result.push({
        type,
        timeRemaining: this.getRemainingTime(type),
        data: powerUp.data
      });
    }
    return result;
  }

  /**
   * Clear all active power-ups
   */
  clearAll() {
    const types = Array.from(this.activePowerUps.keys());
    types.forEach(type => this.deactivatePowerUp(type));
  }

  /**
   * Reset power-up manager
   */
  reset() {
    this.clearAll();
  }

  /**
   * Add power-up listener
   * @param {Function} listener - Callback(type, action, data)
   */
  onPowerUpChange(listener) {
    this.powerUpListeners.push(listener);
  }

  /**
   * Remove power-up listener
   * @param {Function} listener
   */
  offPowerUpChange(listener) {
    const index = this.powerUpListeners.indexOf(listener);
    if (index !== -1) {
      this.powerUpListeners.splice(index, 1);
    }
  }

  /**
   * Notify listeners of power-up activation
   * @param {string} type
   * @param {Object} data
   */
  notifyPowerUpActivated(type, data) {
    this.powerUpListeners.forEach(listener => {
      listener(type, 'activated', data);
    });
  }

  /**
   * Notify listeners of power-up deactivation
   * @param {string} type
   * @param {Object} data
   */
  notifyPowerUpDeactivated(type, data) {
    this.powerUpListeners.forEach(listener => {
      listener(type, 'deactivated', data);
    });
  }

  /**
   * Get power-up statistics
   * @returns {Object}
   */
  getStats() {
    return {
      activePowerUps: this.getActivePowerUps().map(p => ({
        type: p.type,
        timeRemaining: p.timeRemaining
      })),
      count: this.activePowerUps.size
    };
  }
}
