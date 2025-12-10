/**
 * ParticleSystem.js
 * Particle effects and adaptive quality system
 */


class ParticleSystem {
  constructor() {
    this.particles = [];
    this.maxParticles = Config.performance.maxParticles.highEnd;
    this.defaultMaxParticles = Config.performance.maxParticles.highEnd;
    this.lowEndMaxParticles = Config.performance.maxParticles.lowEnd;
    this.currentFPS = 60;
    this.fpsThreshold = Config.performance.fpsThreshold;
  }

  createExplosion(x, y, particleCount = 10) {
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      if (this.particles.length >= this.maxParticles) {
        break;
      }

      // Ensure even circular distribution with small randomness
      const baseAngle = (Math.PI * 2 * i) / particleCount;
      const randomOffset = (Math.random() - 0.5) * 0.2; // Smaller randomness for better distribution
      const angle = baseAngle + randomOffset;
      const speed = 2 + Math.random() * 3;

      const particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 0.015, // Slower decay so particles last longer (~66 frames)
        size: 2 + Math.random() * 3,
        color: this.getRandomColor(),
        isActive: true
      };

      this.particles.push(particle);
      newParticles.push(particle);
    }

    return newParticles;
  }

  getRandomColor() {
    const colors = Config.colors.enemyTypes.concat([
      Config.colors.primary,
      Config.colors.secondary
    ]);
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(deltaTime) {
    const inactive = [];

    this.particles.forEach((particle, index) => {
      if (!particle.isActive) return;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update life
      particle.life -= particle.decay;

      if (particle.life <= 0) {
        particle.isActive = false;
        inactive.push(index);
      }
    });

    // Remove inactive particles
    this.particles = this.particles.filter(p => p.isActive);

    return inactive.length;
  }

  updateFPS(fps) {
    this.currentFPS = fps;

    if (fps < this.fpsThreshold) {
      this.reduceQuality();
    } else {
      this.restoreQuality();
    }
  }

  reduceQuality() {
    this.maxParticles = this.lowEndMaxParticles;

    // Remove excess particles if needed
    if (this.particles.length > this.maxParticles) {
      this.particles = this.particles.slice(0, this.maxParticles);
    }
  }

  restoreQuality() {
    this.maxParticles = this.defaultMaxParticles;
  }

  clear() {
    this.particles = [];
  }

  getCount() {
    return this.particles.filter(p => p.isActive).length;
  }

  getMaxParticles() {
    return this.maxParticles;
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.ParticleSystem = ParticleSystem;
}

