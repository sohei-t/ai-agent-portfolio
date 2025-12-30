/**
 * Enemy - Enemy entity with AI movement and attack patterns
 * Supports stages 1-4 with different behaviors
 */
import { Entity } from './Entity.js';

export class Enemy extends Entity {
  constructor() {
    super(0, 0, 64, 64, 'enemy');

    this.hp = 30;
    this.maxHp = 30;
    this.damage = 10;
    this.fireRate = 2.0;
    this.fireCooldown = 0;
    this.moveSpeed = 50;
    this.movePattern = 'hover';
    this.attackPattern = 'linear';
    this.stage = 1;
    this.config = null;

    // Movement state
    this.moveTime = 0;
    this.moveAmplitude = 50;
    this.moveFrequency = 2;
    this.targetX = 0;

    // Drop items
    this.dropType = null;
    this.dropRate = 0;

    this.zIndex = 5; // Render below player
  }

  /**
   * Initialize enemy with configuration
   */
  init(x, y, enemyConfig, bulletConfig) {
    this.x = x;
    this.y = y;
    this.alive = true;

    // Apply configuration
    this.hp = enemyConfig.hp;
    this.maxHp = enemyConfig.hp;
    this.damage = enemyConfig.damage;
    this.fireRate = enemyConfig.fireRate;
    this.moveSpeed = enemyConfig.moveSpeed;
    this.movePattern = enemyConfig.movePattern;
    this.attackPattern = enemyConfig.attackPattern;
    this.stage = enemyConfig.stage;
    this.dropType = enemyConfig.dropType;
    this.dropRate = enemyConfig.dropRate;

    this.width = enemyConfig.size.width;
    this.height = enemyConfig.size.height;

    this.config = enemyConfig;
    this.bulletConfig = bulletConfig;

    // Reset state
    this.fireCooldown = 0;
    this.moveTime = 0;
    this.targetX = x;

    return this;
  }

  /**
   * Update enemy
   */
  update(deltaTime) {
    // Update movement
    this.updateMovement(deltaTime);

    // Update fire cooldown
    this.fireCooldown -= deltaTime;

    this.moveTime += deltaTime;
  }

  /**
   * Update movement based on pattern
   */
  updateMovement(deltaTime) {
    switch(this.movePattern) {
      case 'hover':
        // Gentle floating motion
        this.velocity.x = Math.sin(this.moveTime * this.moveFrequency) * this.moveSpeed;
        this.velocity.y = Math.cos(this.moveTime * this.moveFrequency * 0.5) * this.moveSpeed * 0.3;
        break;

      case 'horizontal_wave':
        // Move side to side in waves
        this.velocity.x = Math.sin(this.moveTime * this.moveFrequency) * this.moveSpeed;
        this.velocity.y = 0;
        break;

      case 'circle':
        // Circular motion
        const radius = 100;
        const speed = 1.5;
        this.targetX = 400 + Math.cos(this.moveTime * speed) * radius;
        const targetY = 150 + Math.sin(this.moveTime * speed) * radius;

        this.velocity.x = (this.targetX - this.x) * 2;
        this.velocity.y = (targetY - this.y) * 2;
        break;

      case 'aggressive':
        // Move towards player (requires player reference)
        // This will be set by game state
        break;

      default:
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
  }

  /**
   * Move towards target position
   */
  moveTowardsPlayer(playerX, playerY) {
    if (this.movePattern === 'aggressive') {
      const dx = playerX - this.x;
      const dy = (playerY - 100) - this.y; // Stay above player

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 150) { // Keep distance
        this.velocity.x = (dx / distance) * this.moveSpeed;
        this.velocity.y = (dy / distance) * this.moveSpeed;
      } else {
        this.velocity.x *= 0.9; // Slow down when close
        this.velocity.y *= 0.9;
      }
    }
  }

  /**
   * Check if can fire
   */
  canFire() {
    return this.fireCooldown <= 0;
  }

  /**
   * Fire bullets based on attack pattern
   */
  fire(playerX = null, playerY = null) {
    if (!this.canFire()) return [];

    this.fireCooldown = this.fireRate;

    const bullets = [];

    switch(this.attackPattern) {
      case 'linear':
        // Single bullet straight down
        bullets.push({
          x: this.x,
          y: this.y + this.height / 2,
          angle: Math.PI / 2, // Down
          type: 'enemy-bullet'
        });
        break;

      case 'spread_2way':
        // Two bullets at angles
        const spreadAngle = Math.PI / 6; // 30 degrees
        bullets.push({
          x: this.x,
          y: this.y + this.height / 2,
          angle: Math.PI / 2 - spreadAngle,
          type: 'enemy-bullet'
        });
        bullets.push({
          x: this.x,
          y: this.y + this.height / 2,
          angle: Math.PI / 2 + spreadAngle,
          type: 'enemy-bullet'
        });
        break;

      case 'homing':
        // Homing bullet
        bullets.push({
          x: this.x,
          y: this.y + this.height / 2,
          angle: Math.PI / 2,
          type: 'enemy-bullet',
          homing: true,
          playerX,
          playerY
        });
        break;

      case 'composite':
        // Spiral pattern or burst depending on HP phase
        if (this.config.phases && this.hp <= this.config.phases.phase1.hpThreshold) {
          // Phase 2: Burst + linear
          for (let i = 0; i < 5; i++) {
            bullets.push({
              x: this.x,
              y: this.y + this.height / 2,
              angle: (Math.PI / 4) + (i * Math.PI / 8),
              type: 'enemy-bullet'
            });
          }
        } else {
          // Phase 1: Spiral
          const angleOffset = this.moveTime * 3;
          for (let i = 0; i < 3; i++) {
            bullets.push({
              x: this.x,
              y: this.y + this.height / 2,
              angle: angleOffset + (i * Math.PI * 2 / 3),
              type: 'enemy-bullet'
            });
          }
        }
        break;
    }

    return bullets;
  }

  /**
   * Take damage
   */
  takeDamage(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  }

  /**
   * Render enemy
   */
  render(ctx) {
    ctx.save();

    // Flash when hit
    const hitFlash = this.hp < this.maxHp && (Date.now() % 200 < 100);

    if (hitFlash) {
      ctx.fillStyle = '#ffffff';
    } else {
      // Different colors by stage
      const colors = ['#ff4444', '#ff8844', '#ffaa44', '#ffcc44'];
      ctx.fillStyle = colors[this.stage - 1] || '#ff4444';
    }

    // Draw enemy as hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const px = this.x + Math.cos(angle) * this.width / 2;
      const py = this.y + Math.sin(angle) * this.height / 2;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();

    // Draw HP bar
    this.renderHPBar(ctx);

    ctx.restore();
  }

  /**
   * Render HP bar above enemy
   */
  renderHPBar(ctx) {
    const barWidth = this.width;
    const barHeight = 4;
    const barY = this.y - this.height / 2 - 10;

    // Background
    ctx.fillStyle = '#330000';
    ctx.fillRect(this.x - barWidth / 2, barY, barWidth, barHeight);

    // HP
    const hpPercent = this.hp / this.maxHp;
    ctx.fillStyle = hpPercent > 0.5 ? '#00ff00' : hpPercent > 0.25 ? '#ffaa00' : '#ff0000';
    ctx.fillRect(this.x - barWidth / 2, barY, barWidth * hpPercent, barHeight);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x - barWidth / 2, barY, barWidth, barHeight);
  }

  /**
   * Check if should drop item
   */
  shouldDropItem() {
    return Math.random() < this.dropRate;
  }

  /**
   * Get drop type
   */
  getDropType() {
    return this.dropType;
  }

  /**
   * Reset enemy for object pool
   */
  reset() {
    super.reset();
    this.hp = 0;
    this.fireCooldown = 0;
    this.moveTime = 0;
  }
}
