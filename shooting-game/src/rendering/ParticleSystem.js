/**
 * ParticleSystem - Handles explosion and visual effects
 */
export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  /**
   * Create explosion effect
   */
  createExplosion(x, y, count = 20, color = '#FF6600') {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 100 + Math.random() * 100;

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        maxLife: 1.0,
        size: 3 + Math.random() * 3,
        color: color,
        active: true
      });
    }
  }

  /**
   * Update all particles
   */
  update(deltaTime) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];

      if (!particle.active) {
        this.particles.splice(i, 1);
        continue;
      }

      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      // Apply gravity
      particle.vy += 200 * deltaTime;

      // Update life
      particle.life -= deltaTime;

      if (particle.life <= 0) {
        particle.active = false;
      }
    }
  }

  /**
   * Render all particles
   */
  render(ctx) {
    for (const particle of this.particles) {
      if (!particle.active) continue;

      const alpha = particle.life / particle.maxLife;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * Clear all particles
   */
  clear() {
    this.particles = [];
  }

  /**
   * Get particle count
   */
  getCount() {
    return this.particles.length;
  }
}
