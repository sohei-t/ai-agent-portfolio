/**
 * Bullet.js - Projectile entity for player and enemy attacks
 */
export class Bullet {
  constructor(x, y, vx, vy, damage, owner) {
    // Position
    this.x = x;
    this.y = y;

    // Velocity
    this.vx = vx;
    this.vy = vy;

    // Properties
    this.damage = damage;
    this.owner = owner; // 'player' or 'enemy'
    this.alive = true;

    // Size
    this.width = owner === 'player' ? 6 : 8;
    this.height = owner === 'player' ? 12 : 12;

    // Visual
    this.color = owner === 'player' ? '#00FFFF' : '#FF00FF';

    // Type for collision detection
    this.entityType = owner === 'player' ? 'player-bullet' : 'enemy-bullet';
  }

  update(deltaTime) {
    if (!this.alive) return;

    // Update position
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    // Remove if off screen
    if (this.y < -50 || this.y > 650 || this.x < -50 || this.x > 850) {
      this.alive = false;
    }
  }

  render(ctx) {
    if (!this.alive) return;

    ctx.save();

    // Draw bullet as a glowing rectangle
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;

    ctx.fillRect(
      this.x - this.width/2,
      this.y - this.height/2,
      this.width,
      this.height
    );

    // Draw core (brighter center)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(
      this.x - this.width/4,
      this.y - this.height/4,
      this.width/2,
      this.height/2
    );

    ctx.restore();
  }

  destroy() {
    this.alive = false;
  }
}