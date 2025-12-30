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

    // Special rendering for laser beams
    if (this.isBeam) {
      // Create gradient for beam effect
      const gradient = ctx.createLinearGradient(
        this.x - this.width/2, this.y,
        this.x + this.width/2, this.y
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(0.2, this.color);
      gradient.addColorStop(0.5, '#FFFFFF');
      gradient.addColorStop(0.8, this.color);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

      // Glow effect
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 20;

      // Draw beam
      ctx.fillStyle = gradient;
      ctx.fillRect(
        this.x - this.width/2,
        this.y - this.height/2,
        this.width,
        this.height
      );

      // Draw bright core line
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(this.x - this.width/2, this.y);
      ctx.lineTo(this.x + this.width/2, this.y);
      ctx.stroke();

      // Add energy particles
      const particleCount = 3;
      for (let i = 0; i < particleCount; i++) {
        const particleX = this.x - this.width/2 + (this.width * i / particleCount) + Math.random() * 10;
        const particleY = this.y + (Math.random() - 0.5) * this.height;
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = Math.random();
        ctx.beginPath();
        ctx.arc(particleX, particleY, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Normal bullet rendering
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
    }

    ctx.restore();
  }

  destroy() {
    this.alive = false;
  }
}