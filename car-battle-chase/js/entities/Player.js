/**
 * Player.js - Player Vehicle Class
 * Handles player-specific behavior and weapons
 */

import { Vehicle } from './Vehicle.js';

export class Player extends Vehicle {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.type = 'player';
    this.color = '#4FC3F7';

    // Weapons
    this.bombs = 5;
    this.maxBombs = 10;
    this.missiles = 3;
    this.maxMissiles = 5;

    // Cooldowns
    this.bombCooldown = 0;
    this.bombCooldownTime = 0.5;
    this.missileCooldown = 0;
    this.missileCooldownTime = 1;

    // Score
    this.score = 0;
    this.enemiesDefeated = 0;

    // Power-ups
    this.hasShield = false;
    this.speedBoostTimer = 0;
    this.speedBoostMultiplier = 1.5;

    // Stats
    this.speed = 150;
    this.maxSpeed = 200;
    this.acceleration = 350;
  }

  /**
   * Update player state
   * @param {number} deltaTime - Time since last update
   */
  update(deltaTime) {
    super.update(deltaTime);

    // Update cooldowns
    if (this.bombCooldown > 0) {
      this.bombCooldown -= deltaTime;
    }
    if (this.missileCooldown > 0) {
      this.missileCooldown -= deltaTime;
    }

    // Update speed boost
    if (this.speedBoostTimer > 0) {
      this.speedBoostTimer -= deltaTime;
      if (this.speedBoostTimer <= 0) {
        this.maxSpeed = 200;
      }
    }
  }

  /**
   * Check if can fire bomb
   */
  canFireBomb() {
    return this.bombs > 0 && this.bombCooldown <= 0;
  }

  /**
   * Check if can fire missile
   */
  canFireMissile() {
    return this.missiles > 0 && this.missileCooldown <= 0;
  }

  /**
   * Fire bomb
   * @returns {Object|null} Bomb spawn data or null
   */
  fireBomb() {
    if (!this.canFireBomb()) return null;

    this.bombs--;
    this.bombCooldown = this.bombCooldownTime;

    // Spawn bomb behind player
    const spawnDistance = this.height / 2 + 20;
    const spawnX = this.position.x - Math.sin(this.rotation) * spawnDistance;
    const spawnY = this.position.y + Math.cos(this.rotation) * spawnDistance;

    // Bomb velocity (moving backward relative to player)
    const bombSpeed = 50;
    const vx = -Math.sin(this.rotation) * bombSpeed;
    const vy = Math.cos(this.rotation) * bombSpeed;

    return {
      x: spawnX,
      y: spawnY,
      vx: vx,
      vy: vy,
      owner: this
    };
  }

  /**
   * Fire missile
   * @returns {Object|null} Missile spawn data or null
   */
  fireMissile() {
    if (!this.canFireMissile()) return null;

    this.missiles--;
    this.missileCooldown = this.missileCooldownTime;

    // Spawn missile in front of player
    const spawnDistance = this.height / 2 + 10;
    const spawnX = this.position.x + Math.sin(this.rotation) * spawnDistance;
    const spawnY = this.position.y - Math.cos(this.rotation) * spawnDistance;

    // Missile velocity (forward)
    const missileSpeed = 300;
    const vx = Math.sin(this.rotation) * missileSpeed;
    const vy = -Math.cos(this.rotation) * missileSpeed;

    return {
      x: spawnX,
      y: spawnY,
      vx: vx,
      vy: vy,
      rotation: this.rotation,
      owner: this
    };
  }

  /**
   * Add score
   * @param {number} points - Points to add
   */
  addScore(points) {
    this.score += points;
  }

  /**
   * Collect power-up
   * @param {string} type - Power-up type
   */
  collectPowerUp(type) {
    switch (type) {
      case 'speed':
        this.activateSpeedBoost();
        break;
      case 'shield':
        this.activateShield();
        break;
      case 'ammo':
        this.refillAmmo();
        break;
      case 'health':
        this.heal(30);
        break;
    }
    this.addScore(10);
  }

  /**
   * Activate speed boost
   */
  activateSpeedBoost() {
    this.speedBoostTimer = 5;
    this.maxSpeed = 200 * this.speedBoostMultiplier;
  }

  /**
   * Activate shield
   */
  activateShield() {
    this.hasShield = true;
    this.isInvincible = true;
    this.invincibleTimer = 5;
  }

  /**
   * Refill ammunition
   */
  refillAmmo() {
    this.bombs = Math.min(this.bombs + 3, this.maxBombs);
    this.missiles = Math.min(this.missiles + 2, this.maxMissiles);
  }

  /**
   * Take damage (override for shield)
   */
  takeDamage(amount) {
    if (this.hasShield) {
      this.hasShield = false;
      this.isInvincible = false;
      return true;
    }
    return super.takeDamage(amount);
  }

  /**
   * Get bomb cooldown progress (0-1)
   */
  getBombCooldownProgress() {
    if (this.bombCooldown <= 0) return 1;
    return 1 - (this.bombCooldown / this.bombCooldownTime);
  }

  /**
   * Get missile cooldown progress (0-1)
   */
  getMissileCooldownProgress() {
    if (this.missileCooldown <= 0) return 1;
    return 1 - (this.missileCooldown / this.missileCooldownTime);
  }

  /**
   * Render player
   */
  render(ctx) {
    super.render(ctx);

    // Render speed boost effect
    if (this.speedBoostTimer > 0) {
      ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.rotation);

      // Speed lines behind car
      ctx.strokeStyle = 'rgba(255, 217, 61, 0.6)';
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        const offsetX = (i - 1) * 15;
        const len = 20 + Math.random() * 10;
        ctx.beginPath();
        ctx.moveTo(offsetX, this.height / 2);
        ctx.lineTo(offsetX, this.height / 2 + len);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  /**
   * Reset player
   */
  reset() {
    super.reset();
    this.bombs = 5;
    this.missiles = 3;
    this.bombCooldown = 0;
    this.missileCooldown = 0;
    this.score = 0;
    this.enemiesDefeated = 0;
    this.hasShield = false;
    this.speedBoostTimer = 0;
    this.maxSpeed = 200;
  }
}

export default Player;
