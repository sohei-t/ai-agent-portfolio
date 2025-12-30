/**
 * Player - Player character with HP, MP, attacks, and movement
 */
import { Entity } from './Entity.js';

export class Player extends Entity {
  constructor(x, y, config) {
    super(x, y, config.size.width, config.size.height, 'player');

    // Stats
    this.hp = config.maxHP;
    this.maxHp = config.maxHP;
    this.mp = config.maxMP;
    this.maxMp = config.maxMP;
    this.attackPower = config.baseAttackPower;
    this.magicPower = config.baseMagicPower;
    this.magicCost = config.magicCost;
    this.movementSpeed = config.movementSpeed;

    // Cooldowns
    this.attackCooldown = 0;
    this.attackCooldownTime = config.attackCooldown;
    this.magicCooldown = 0;
    this.magicCooldownTime = config.magicCooldown;

    // Invincibility (after taking damage)
    this.invincible = false;
    this.invincibleTime = 0;
    this.invincibleDuration = config.invincibilityDuration;

    // Movement bounds
    this.bounds = config.bounds;

    // Visual effect
    this.flashTimer = 0;

    this.zIndex = 10; // Render above enemies
  }

  /**
   * Update player
   */
  update(deltaTime) {
    // Update cooldowns
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }

    if (this.magicCooldown > 0) {
      this.magicCooldown -= deltaTime;
    }

    // Update invincibility
    if (this.invincible) {
      this.invincibleTime += deltaTime;
      if (this.invincibleTime >= this.invincibleDuration) {
        this.invincible = false;
        this.invincibleTime = 0;
      }
    }

    // Update flash effect
    if (this.flashTimer > 0) {
      this.flashTimer -= deltaTime;
    }
  }

  /**
   * Handle movement input
   */
  handleMovement(axis, deltaTime) {
    this.velocity.x = axis.x * this.movementSpeed;
    this.velocity.y = axis.y * this.movementSpeed;
  }

  /**
   * Attempt normal attack
   */
  canAttack() {
    return this.attackCooldown <= 0;
  }

  /**
   * Perform normal attack
   */
  attack() {
    if (!this.canAttack()) return null;

    this.attackCooldown = this.attackCooldownTime;
    return {
      x: this.x,
      y: this.y - this.height / 2,
      damage: this.attackPower,
      type: 'player-bullet'
    };
  }

  /**
   * Check if can cast magic
   */
  canCastMagic() {
    return this.magicCooldown <= 0 && this.mp >= this.magicCost;
  }

  /**
   * Perform magic attack
   */
  magicAttack() {
    if (!this.canCastMagic()) return null;

    this.magicCooldown = this.magicCooldownTime;
    this.mp -= this.magicCost;

    return {
      x: this.x,
      y: this.y - this.height / 2,
      damage: this.magicPower,
      type: 'magic-bullet'
    };
  }

  /**
   * Take damage
   */
  takeDamage(damage) {
    if (this.invincible) return;

    this.hp -= damage;
    this.flashTimer = 0.2;

    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    } else {
      this.invincible = true;
      this.invincibleTime = 0;
    }
  }

  /**
   * Heal HP
   */
  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  /**
   * Restore MP
   */
  restoreMP(amount) {
    this.mp = Math.min(this.maxMp, this.mp + amount);
  }

  /**
   * Upgrade attack power
   */
  upgradeAttack(amount) {
    this.attackPower += amount;
  }

  /**
   * Upgrade magic power
   */
  upgradeMagic(amount) {
    this.magicPower += amount;
  }

  /**
   * Render player
   */
  render(ctx) {
    ctx.save();

    // Flash white when hit
    if (this.flashTimer > 0) {
      ctx.fillStyle = '#ffffff';
    } else if (this.invincible) {
      // Blink during invincibility
      const alpha = Math.sin(this.invincibleTime * 20) * 0.5 + 0.5;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#00ffff';
    } else {
      ctx.fillStyle = '#00ffff';
    }

    // Draw player as triangle (spaceship)
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height / 2); // Top point
    ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2); // Bottom left
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2); // Bottom right
    ctx.closePath();
    ctx.fill();

    // Draw outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Get HP percentage
   */
  getHPPercent() {
    return this.hp / this.maxHp;
  }

  /**
   * Get MP percentage
   */
  getMPPercent() {
    return this.mp / this.maxMp;
  }

  /**
   * Check if dead
   */
  isDead() {
    return this.hp <= 0;
  }
}
