/**
 * Particle.js
 * Individual particle class for visual effects
 *
 * Features:
 * - Position, velocity, acceleration
 * - Color, size, alpha
 * - Lifetime management
 * - Various visual effects (fade, glow, spiral)
 */

export class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.size = 4;
    this.color = '#FFFFFF';
    this.alpha = 1;
    this.lifetime = 1000;
    this.age = 0;
    this.gravity = 0;
    this.fade = true;
    this.glow = false;
    this.spiral = false;
    this.spiralSpeed = 2;
    this.spiralAngle = 0;
  }

  /**
   * Initialize particle with config
   */
  initialize(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.vx = config.vx || 0;
    this.vy = config.vy || 0;
    this.ax = config.ax || 0;
    this.ay = config.ay || 0;
    this.size = config.size || 4;
    this.color = config.color || '#FFFFFF';
    this.alpha = config.alpha !== undefined ? config.alpha : 1;
    this.lifetime = config.lifetime || 1000;
    this.age = 0;
    this.gravity = config.gravity || 0;
    this.fade = config.fade !== undefined ? config.fade : true;
    this.glow = config.glow !== undefined ? config.glow : false;
    this.spiral = config.spiral !== undefined ? config.spiral : false;
    this.spiralSpeed = config.spiralSpeed || 2;
    this.spiralAngle = Math.random() * Math.PI * 2;
  }

  /**
   * Update particle
   */
  update(deltaTime) {
    const dt = deltaTime / 1000; // Convert to seconds

    // Apply gravity
    if (this.gravity !== 0) {
      this.ay = this.gravity;
    }

    // Apply spiral effect
    if (this.spiral) {
      this.spiralAngle += this.spiralSpeed * dt;
      const spiralRadius = 20;
      this.vx += Math.cos(this.spiralAngle) * spiralRadius * dt;
      this.vy += Math.sin(this.spiralAngle) * spiralRadius * dt;
    }

    // Update velocity
    this.vx += this.ax * dt;
    this.vy += this.ay * dt;

    // Update position
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Update age
    this.age += deltaTime;

    // Update alpha (fade out)
    if (this.fade) {
      this.alpha = 1 - (this.age / this.lifetime);
    }

    // Apply damping
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  /**
   * Render particle
   */
  render(ctx) {
    if (this.alpha <= 0 || this.size <= 0) {
      return;
    }

    ctx.save();

    // Apply glow effect
    if (this.glow) {
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = this.color;
    }

    // Set alpha
    ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));

    // Draw particle
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Check if particle is dead
   */
  isDead() {
    return this.age >= this.lifetime || this.alpha <= 0;
  }

  /**
   * Reset particle (for pooling)
   */
  reset() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.size = 4;
    this.color = '#FFFFFF';
    this.alpha = 1;
    this.lifetime = 1000;
    this.age = 0;
    this.gravity = 0;
    this.fade = true;
    this.glow = false;
    this.spiral = false;
    this.spiralSpeed = 2;
    this.spiralAngle = 0;
  }

  /**
   * Get particle lifetime progress (0-1)
   */
  getProgress() {
    return Math.min(this.age / this.lifetime, 1);
  }

  /**
   * Set particle color
   */
  setColor(color) {
    this.color = color;
  }

  /**
   * Set particle size
   */
  setSize(size) {
    this.size = size;
  }

  /**
   * Set particle alpha
   */
  setAlpha(alpha) {
    this.alpha = Math.max(0, Math.min(1, alpha));
  }

  /**
   * Apply force to particle
   */
  applyForce(fx, fy) {
    this.ax += fx;
    this.ay += fy;
  }

  /**
   * Set velocity
   */
  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  /**
   * Get position
   */
  getPosition() {
    return { x: this.x, y: this.y };
  }

  /**
   * Set position
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
