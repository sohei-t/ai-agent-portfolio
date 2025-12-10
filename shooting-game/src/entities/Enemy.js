/**
 * Enemy - Enemy ships with different types and movement patterns
 */
import { Entity } from './Entity.js';
import { GAME_CONFIG } from '../config/gameConfig.js';
import { getEnemyType } from '../config/enemyData.js';

export class Enemy extends Entity {
  constructor(x, y, enemyType = 'BASIC') {
    // Support config object (for tests) or x, y coordinates
    let enemyX, enemyY, type, enemyConfig;
    if (typeof x === 'object' && x !== null) {
      enemyConfig = x;
      enemyX = enemyConfig.x !== undefined ? enemyConfig.x : 0;
      enemyY = enemyConfig.y !== undefined ? enemyConfig.y : 0;
      type = enemyConfig.type !== undefined ? enemyConfig.type : 'BASIC';
    } else {
      enemyX = x;
      enemyY = y;
      type = enemyType;
      enemyConfig = {};
    }

    // Try to get from enemyData first, fallback to GAME_CONFIG
    let config = getEnemyType(type);
    if (!config || !config.health) {
      config = GAME_CONFIG.ENEMY_TYPES[type] || GAME_CONFIG.ENEMY_TYPES['BASIC'];
    }

    const width = enemyConfig.width !== undefined ? enemyConfig.width : config.width;
    const height = enemyConfig.height !== undefined ? enemyConfig.height : config.height;

    super(enemyX >= 0 ? enemyX : 0, enemyY >= 0 ? enemyY : 0, width, height);

    this.type = 'enemy';
    this.enemyType = type;
    this.health = enemyConfig.health !== undefined ? enemyConfig.health : config.health;
    this.maxHealth = config.health;
    this.speed = enemyConfig.speed !== undefined ? enemyConfig.speed : config.speed;
    this.scoreValue = enemyConfig.points !== undefined ? enemyConfig.points : (enemyConfig.scoreValue !== undefined ? enemyConfig.scoreValue : config.scoreValue);
    this.fireRate = config.fireRate;
    this.movePattern = config.movementPattern || config.movePattern || 'straight';
    this.movementPattern = this.movePattern; // Alias for tests
    this.color = config.color;

    this.lastFireTime = Math.random() * 2; // Random initial fire delay
    this.spawnTime = 0;
    this.patternTime = 0;

    // Pattern-specific data
    this.amplitude = 100;
    this.frequency = 0.02;
    this.startX = enemyX;
  }

  /**
   * Update enemy
   */
  update(deltaTime = 1, time = 0) {
    this.patternTime += deltaTime;

    // Update movement based on pattern
    this.updateMovement(deltaTime, time);

    // Update fire cooldown
    if (this.lastFireTime > 0) {
      this.lastFireTime -= deltaTime;
    }
  }

  /**
   * Update movement based on pattern
   */
  updateMovement(deltaTime, time) {
    switch (this.movePattern) {
      case 'straight':
        this.y += this.speed * deltaTime;
        break;

      case 'zigzag':
        this.y += this.speed * deltaTime;
        this.x += Math.sin(this.patternTime * 3) * this.speed * 0.5 * deltaTime;
        break;

      case 'sine':
        this.y += this.speed * deltaTime;
        this.x = this.startX + Math.sin(this.y * this.frequency) * this.amplitude;
        break;

      case 'circle':
        const radius = 100;
        const angle = this.patternTime * 2;
        this.x = this.startX + Math.cos(angle) * radius;
        this.y += this.speed * 0.5 * deltaTime;
        break;

      case 'homing':
        // Kamikaze - moves straight down quickly
        this.y += this.speed * deltaTime;
        break;

      case 'boss':
      case 'boss_pattern_1':
      case 'boss_pattern_2':
      case 'boss_pattern_3':
        // Boss pattern: move horizontally, enter screen first
        if (this.y < 100) {
          this.y += this.speed * deltaTime;
        } else {
          this.x += Math.sin(this.patternTime) * 50 * deltaTime;
        }
        break;
    }
  }

  /**
   * Check if can shoot
   */
  canShoot() {
    return this.fireRate !== null && this.lastFireTime <= 0;
  }

  /**
   * Shoot bullet
   */
  shoot() {
    // Don't shoot if off-screen
    if (this.y < 0) return null;

    if (!this.canShoot()) return null;

    this.lastFireTime = this.fireRate;

    const centerX = this.x + this.width / 2;
    const bulletY = this.y + this.height;

    return { x: centerX - 4, y: bulletY, vx: 0, vy: 300, velocity: 300 };
  }

  /**
   * Take damage
   */
  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.destroy();
      return {
        destroyed: true,
        explosion: {
          x: this.x + this.width / 2,
          y: this.y + this.height / 2,
          color: this.color
        }
      };
    }
    return { destroyed: false };
  }

  /**
   * Check collision with another object
   */
  checkCollision(other) {
    return this.x < other.x + other.width &&
           this.x + this.width > other.x &&
           this.y < other.y + other.height &&
           this.y + this.height > other.y;
  }

  /**
   * Check if out of bounds
   */
  isOutOfBounds(canvasHeight) {
    return this.y > canvasHeight;
  }

  /**
   * Check if should be removed
   */
  shouldBeRemoved() {
    return this.health <= 0 || !this.active;
  }

  /**
   * Spawn formation of enemies
   */
  static spawnFormation(pattern, count) {
    const enemies = [];
    const spacing = 80;
    const startX = 400 - ((count - 1) * spacing) / 2;

    for (let i = 0; i < count; i++) {
      let x = startX + i * spacing;
      let y = 50;

      if (pattern === 'V') {
        // V formation
        y = 50 + Math.abs(i - Math.floor(count / 2)) * 30;
      }

      enemies.push(new Enemy({ x, y }));
    }

    return enemies;
  }

  /**
   * Render enemy
   */
  render(ctx) {
    ctx.save();

    // Draw enemy ship
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;

    if (this.enemyType === 'BOSS') {
      // Boss: Large octagon
      this.drawPolygon(ctx, 8);

      // Health bar
      this.drawHealthBar(ctx);
    } else if (this.enemyType === 'TANK') {
      // Tank: Pentagon
      this.drawPolygon(ctx, 5);
    } else {
      // Basic/Fast: Triangle (inverted)
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, this.y + this.height);
      ctx.lineTo(this.x, this.y);
      ctx.lineTo(this.x + this.width, this.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw polygon shape
   */
  drawPolygon(ctx, sides) {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    const radius = this.width / 2;

    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const px = centerX + Math.cos(angle) * radius;
      const py = centerY + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  /**
   * Draw health bar for boss
   */
  drawHealthBar(ctx) {
    const barWidth = this.width;
    const barHeight = 5;
    const barX = this.x;
    const barY = this.y - 10;

    // Background
    ctx.fillStyle = '#333333';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Health
    const healthPercent = this.health / this.maxHealth;
    ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : '#FF0000';
    ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

    // Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
  }
}
