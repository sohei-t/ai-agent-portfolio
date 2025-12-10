/**
 * Weapon System
 * Manages weapon types, upgrades, and firing patterns
 */
import { GAME_CONFIG } from '../config/gameConfig.js';

export const WEAPON_TYPES = {
  NORMAL: 'normal',
  SPREAD: 'spread',
  LASER: 'laser',
  MISSILE: 'missile',
  WAVE: 'wave'
};

export class WeaponSystem {
  constructor() {
    this.currentWeapon = WEAPON_TYPES.NORMAL;
    this.weaponLevel = 1;
    this.maxWeaponLevel = 5;
    this.fireRate = GAME_CONFIG.PLAYER.FIRE_RATE;
    this.damage = GAME_CONFIG.PLAYER.BULLET_DAMAGE;
    this.isRapidFire = false;
  }

  /**
   * Upgrade weapon
   */
  upgrade() {
    if (this.weaponLevel < this.maxWeaponLevel) {
      this.weaponLevel++;
      this.updateWeaponStats();
    }
  }

  /**
   * Downgrade weapon (on death)
   */
  downgrade() {
    if (this.weaponLevel > 1) {
      this.weaponLevel--;
      this.updateWeaponStats();
    }
  }

  /**
   * Change weapon type
   * @param {string} weaponType
   */
  setWeaponType(weaponType) {
    if (Object.values(WEAPON_TYPES).includes(weaponType)) {
      this.currentWeapon = weaponType;
      this.updateWeaponStats();
    }
  }

  /**
   * Enable rapid fire mode
   * @param {number} duration - Duration in milliseconds
   */
  enableRapidFire(duration) {
    this.isRapidFire = true;
    this.updateWeaponStats();

    if (duration) {
      setTimeout(() => {
        this.disableRapidFire();
      }, duration);
    }
  }

  /**
   * Disable rapid fire mode
   */
  disableRapidFire() {
    this.isRapidFire = false;
    this.updateWeaponStats();
  }

  /**
   * Update weapon statistics based on level and mode
   */
  updateWeaponStats() {
    const baseFireRate = GAME_CONFIG.PLAYER.FIRE_RATE;
    const baseDamage = GAME_CONFIG.PLAYER.BULLET_DAMAGE;

    // Apply weapon level bonuses
    this.damage = baseDamage * (1 + (this.weaponLevel - 1) * 0.2);

    // Apply rapid fire bonus
    if (this.isRapidFire) {
      this.fireRate = baseFireRate * 0.5; // Fire twice as fast
    } else {
      this.fireRate = baseFireRate;
    }
  }

  /**
   * Get bullet pattern for current weapon
   * @param {number} x - Player x position
   * @param {number} y - Player y position
   * @returns {Array} Array of bullet data {x, y, vx, vy, damage}
   */
  getBulletPattern(x, y) {
    const bullets = [];
    const speed = GAME_CONFIG.PLAYER.BULLET_SPEED;

    switch (this.currentWeapon) {
      case WEAPON_TYPES.NORMAL:
        bullets.push({
          x: x,
          y: y - 20,
          vx: 0,
          vy: -speed,
          damage: this.damage
        });

        // Add extra bullets at higher levels
        if (this.weaponLevel >= 3) {
          bullets.push(
            {
              x: x - 15,
              y: y - 10,
              vx: 0,
              vy: -speed,
              damage: this.damage * 0.8
            },
            {
              x: x + 15,
              y: y - 10,
              vx: 0,
              vy: -speed,
              damage: this.damage * 0.8
            }
          );
        }
        break;

      case WEAPON_TYPES.SPREAD:
        const angles = this.weaponLevel === 1 ? 3 : this.weaponLevel === 2 ? 5 : 7;
        const spread = Math.PI / 6; // 30 degrees

        for (let i = 0; i < angles; i++) {
          const angle = -Math.PI / 2 + spread * (i - (angles - 1) / 2) / (angles - 1);
          bullets.push({
            x: x,
            y: y - 20,
            vx: Math.sin(angle) * speed,
            vy: Math.cos(angle) * speed,
            damage: this.damage * 0.7
          });
        }
        break;

      case WEAPON_TYPES.LASER:
        bullets.push({
          x: x,
          y: y - 30,
          vx: 0,
          vy: -speed * 1.5,
          damage: this.damage * 1.5,
          isLaser: true,
          width: 6,
          height: 40
        });
        break;

      case WEAPON_TYPES.MISSILE:
        bullets.push({
          x: x,
          y: y - 20,
          vx: 0,
          vy: -speed * 0.8,
          damage: this.damage * 2,
          isMissile: true,
          homing: this.weaponLevel >= 3
        });
        break;

      case WEAPON_TYPES.WAVE:
        bullets.push({
          x: x,
          y: y - 20,
          vx: 0,
          vy: -speed,
          damage: this.damage * 1.2,
          isWave: true,
          amplitude: 30,
          frequency: 0.1
        });
        break;
    }

    return bullets;
  }

  /**
   * Get current weapon type
   * @returns {string}
   */
  getWeaponType() {
    return this.currentWeapon;
  }

  /**
   * Get weapon level
   * @returns {number}
   */
  getWeaponLevel() {
    return this.weaponLevel;
  }

  /**
   * Get fire rate
   * @returns {number}
   */
  getFireRate() {
    return this.fireRate;
  }

  /**
   * Get damage
   * @returns {number}
   */
  getDamage() {
    return this.damage;
  }

  /**
   * Reset weapon system
   */
  reset() {
    this.currentWeapon = WEAPON_TYPES.NORMAL;
    this.weaponLevel = 1;
    this.isRapidFire = false;
    this.updateWeaponStats();
  }

  /**
   * Get weapon statistics
   * @returns {Object}
   */
  getStats() {
    return {
      weaponType: this.currentWeapon,
      level: this.weaponLevel,
      maxLevel: this.maxWeaponLevel,
      fireRate: this.fireRate,
      damage: this.damage,
      isRapidFire: this.isRapidFire
    };
  }
}
