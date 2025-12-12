/**
 * EffectSystem.js
 * Particle and visual effects system
 *
 * Features:
 * - Particle effects (explosions, hits, sparks)
 * - Effect registration and spawning
 * - Particle pooling for performance
 * - Multiple effect types
 */

import { Particle } from '../assets/Particle.js';

export class EffectSystem {
  constructor() {
    this.effects = [];
    this.effectTypes = new Map();
    this.particlePool = [];
    this.maxParticles = 500;

    // Register default effects
    this.registerDefaultEffects();
  }

  /**
   * Register default effect types
   */
  registerDefaultEffects() {
    // Explosion effect
    this.registerEffect('explosion', {
      particleCount: 20,
      lifetime: 800,
      speed: { min: 50, max: 150 },
      size: { min: 3, max: 8 },
      colors: ['#FF6B00', '#FF8C00', '#FFA500', '#FFAA00', '#FFD700'],
      gravity: 50,
      fade: true
    });

    // Hit flash effect
    this.registerEffect('hit', {
      particleCount: 8,
      lifetime: 300,
      speed: { min: 30, max: 80 },
      size: { min: 2, max: 5 },
      colors: ['#FFFFFF', '#FFFF00', '#FFF000'],
      gravity: 0,
      fade: true
    });

    // Spawn effect
    this.registerEffect('spawn', {
      particleCount: 15,
      lifetime: 600,
      speed: { min: 20, max: 60 },
      size: { min: 2, max: 6 },
      colors: ['#00FFFF', '#00CCFF', '#0099FF'],
      gravity: -30,
      fade: true,
      spiral: true
    });

    // Death effect
    this.registerEffect('death', {
      particleCount: 25,
      lifetime: 1000,
      speed: { min: 40, max: 120 },
      size: { min: 4, max: 10 },
      colors: ['#FF0000', '#CC0000', '#990000', '#660000'],
      gravity: 80,
      fade: true
    });

    // Magic burst effect
    this.registerEffect('magic', {
      particleCount: 30,
      lifetime: 700,
      speed: { min: 60, max: 140 },
      size: { min: 3, max: 7 },
      colors: ['#9B59B6', '#8E44AD', '#6C3483', '#5B2C6F'],
      gravity: 0,
      fade: true,
      glow: true
    });

    // Item pickup sparkle
    this.registerEffect('sparkle', {
      particleCount: 10,
      lifetime: 500,
      speed: { min: 20, max: 50 },
      size: { min: 2, max: 4 },
      colors: ['#FFD700', '#FFC700', '#FFB700'],
      gravity: -20,
      fade: true,
      glow: true
    });
  }

  /**
   * Register custom effect type
   */
  registerEffect(name, config) {
    this.effectTypes.set(name, config);
  }

  /**
   * Spawn effect at position
   */
  spawn(effectName, x, y, options = {}) {
    const config = this.effectTypes.get(effectName);

    if (!config) {
      console.warn(`Effect type not found: ${effectName}`);
      return;
    }

    const particleCount = options.particleCount || config.particleCount;

    for (let i = 0; i < particleCount; i++) {
      const particle = this.createParticle(config, x, y, options);
      if (particle) {
        this.effects.push(particle);
      }
    }
  }

  /**
   * Create particle from config
   */
  createParticle(config, x, y, options = {}) {
    // Try to reuse particle from pool
    let particle = this.particlePool.pop();

    if (!particle) {
      if (this.effects.length >= this.maxParticles) {
        return null; // Max particles reached
      }
      particle = new Particle();
    }

    // Random angle
    const angle = options.angle !== undefined ? options.angle : Math.random() * Math.PI * 2;

    // Random speed
    const speed = this.randomRange(config.speed.min, config.speed.max);

    // Random size
    const size = this.randomRange(config.size.min, config.size.max);

    // Random color from palette
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];

    // Initialize particle
    particle.initialize({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color,
      lifetime: config.lifetime,
      gravity: config.gravity || 0,
      fade: config.fade || false,
      glow: config.glow || false,
      spiral: config.spiral || false,
      spiralSpeed: options.spiralSpeed || 2
    });

    return particle;
  }

  /**
   * Update all effects
   */
  update(deltaTime) {
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const particle = this.effects[i];

      particle.update(deltaTime);

      if (particle.isDead()) {
        // Return to pool
        this.effects.splice(i, 1);
        this.particlePool.push(particle);
      }
    }
  }

  /**
   * Render all effects
   */
  render(ctx) {
    for (const particle of this.effects) {
      particle.render(ctx);
    }
  }

  /**
   * Random number in range
   */
  randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
   * Clear all effects
   */
  clear() {
    // Return all particles to pool
    for (const particle of this.effects) {
      this.particlePool.push(particle);
    }
    this.effects = [];
  }

  /**
   * Get active effect count
   */
  getActiveCount() {
    return this.effects.length;
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      active: this.effects.length,
      pooled: this.particlePool.length,
      total: this.effects.length + this.particlePool.length,
      max: this.maxParticles
    };
  }

  /**
   * Set max particles
   */
  setMaxParticles(max) {
    this.maxParticles = max;
  }
}
