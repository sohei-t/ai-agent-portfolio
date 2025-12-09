/**
 * Unit Tests for ParticleSystem.js
 * Tests particle effects and adaptive quality system
 * ITERATION 1: Basic particle management and performance adaptation
 */

const ParticleSystem = require('../../src/systems/ParticleSystem.js');
const Config = require('../../src/utils/Config.js');

describe('ParticleSystem', () => {
  let particleSystem;

  beforeEach(() => {
    particleSystem = new ParticleSystem();
  });

  describe('Particle Creation', () => {
    test('should create explosion with default 10 particles', () => {
      particleSystem.createExplosion(100, 100);

      expect(particleSystem.getCount()).toBe(10);
    });

    test('should create explosion with custom particle count', () => {
      particleSystem.createExplosion(100, 100, 20);

      expect(particleSystem.getCount()).toBe(20);
    });

    test('should create particles at specified position', () => {
      const particles = particleSystem.createExplosion(250, 350, 5);

      particles.forEach(particle => {
        expect(particle.x).toBe(250);
        expect(particle.y).toBe(350);
      });
    });

    test('should create particles with radial velocity', () => {
      const particles = particleSystem.createExplosion(100, 100, 8);

      // All particles should have velocity
      particles.forEach(particle => {
        const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
        expect(speed).toBeGreaterThan(0);
      });
    });

    test('should distribute particles in circular pattern', () => {
      // Temporarily increase maxParticles to allow full circular distribution
      particleSystem.maxParticles = 500;
      const particles = particleSystem.createExplosion(100, 100, 360);

      // Should have particles pointing in all directions
      const angles = particles.map(p => Math.atan2(p.vy, p.vx));

      // Check that we have good angular distribution
      expect(Math.max(...angles)).toBeGreaterThan(3);
      expect(Math.min(...angles)).toBeLessThan(-3);
    });

    test('should assign random colors to particles', () => {
      const particles = particleSystem.createExplosion(100, 100, 50);

      const colors = new Set(particles.map(p => p.color));

      // Should have multiple different colors
      expect(colors.size).toBeGreaterThan(1);
    });

    test('should initialize particles with full life', () => {
      const particles = particleSystem.createExplosion(100, 100, 5);

      particles.forEach(particle => {
        expect(particle.life).toBe(1.0);
      });
    });

    test('should mark particles as active', () => {
      const particles = particleSystem.createExplosion(100, 100, 5);

      particles.forEach(particle => {
        expect(particle.isActive).toBe(true);
      });
    });

    test('should respect max particle limit', () => {
      particleSystem.maxParticles = 20;

      particleSystem.createExplosion(100, 100, 50);

      expect(particleSystem.getCount()).toBeLessThanOrEqual(20);
    });

    test('should not exceed max particles with multiple explosions', () => {
      particleSystem.maxParticles = 30;

      particleSystem.createExplosion(100, 100, 20);
      particleSystem.createExplosion(200, 200, 20);

      expect(particleSystem.getCount()).toBeLessThanOrEqual(30);
    });
  });

  describe('Particle Update and Lifecycle', () => {
    test('should update particle positions', () => {
      const particles = particleSystem.createExplosion(100, 100, 1);
      const initialX = particles[0].x;
      const initialY = particles[0].y;

      particleSystem.update(16.67);

      expect(particles[0].x).not.toBe(initialX);
      expect(particles[0].y).not.toBe(initialY);
    });

    test('should decay particle life over time', () => {
      const particles = particleSystem.createExplosion(100, 100, 1);
      const initialLife = particles[0].life;

      particleSystem.update(16.67);

      expect(particles[0].life).toBeLessThan(initialLife);
    });

    test('should remove particles when life reaches 0', () => {
      const particles = particleSystem.createExplosion(100, 100, 1);

      // Update many times to deplete life
      for (let i = 0; i < 100; i++) {
        particleSystem.update(16.67);
      }

      expect(particleSystem.getCount()).toBe(0);
    });

    test('should mark inactive particles correctly', () => {
      const particles = particleSystem.createExplosion(100, 100, 5);

      // Force life to 0
      particles.forEach(p => p.life = 0.01);

      particleSystem.update(16.67);

      particles.forEach(p => {
        expect(p.isActive).toBe(false);
      });
    });

    test('should return count of removed particles', () => {
      const particles = particleSystem.createExplosion(100, 100, 10);

      // Force some particles to die
      particles[0].life = 0;
      particles[1].life = 0;

      const removed = particleSystem.update(16.67);

      expect(removed).toBe(2);
    });

    test('should handle empty particle array', () => {
      const removed = particleSystem.update(16.67);

      expect(removed).toBe(0);
      expect(particleSystem.getCount()).toBe(0);
    });
  });

  describe('Adaptive Quality System', () => {
    test('should reduce max particles when FPS drops below threshold', () => {
      particleSystem.maxParticles = 100;

      particleSystem.updateFPS(35); // Below 40 FPS threshold

      expect(particleSystem.maxParticles).toBe(50);
    });

    test('should restore max particles when FPS recovers', () => {
      particleSystem.maxParticles = 50;

      particleSystem.updateFPS(60); // Above threshold

      expect(particleSystem.maxParticles).toBe(100);
    });

    test('should remove excess particles when reducing quality', () => {
      particleSystem.createExplosion(100, 100, 80);

      particleSystem.updateFPS(30); // Trigger quality reduction

      expect(particleSystem.getCount()).toBeLessThanOrEqual(50);
    });

    test('should not exceed new limit after quality reduction', () => {
      particleSystem.updateFPS(30); // Reduce to 50 max

      particleSystem.createExplosion(100, 100, 100);

      expect(particleSystem.getCount()).toBeLessThanOrEqual(50);
    });

    test('should handle rapid FPS fluctuations', () => {
      for (let i = 0; i < 10; i++) {
        particleSystem.updateFPS(i % 2 === 0 ? 60 : 30);
      }

      // Should end with max based on last FPS value (30)
      expect(particleSystem.maxParticles).toBe(50);
    });

    test('should maintain quality at threshold FPS', () => {
      particleSystem.updateFPS(40); // Exactly at threshold

      expect(particleSystem.maxParticles).toBe(100);
    });

    test('should reduce quality just below threshold', () => {
      particleSystem.updateFPS(39); // Just below 40

      expect(particleSystem.maxParticles).toBe(50);
    });
  });

  describe('Performance Characteristics', () => {
    test('should handle high-end device (100 particles)', () => {
      particleSystem.maxParticles = 100;

      for (let i = 0; i < 5; i++) {
        particleSystem.createExplosion(100 + i * 50, 100 + i * 50, 20);
      }

      expect(particleSystem.getCount()).toBeLessThanOrEqual(100);
    });

    test('should handle low-end device (50 particles)', () => {
      particleSystem.maxParticles = 50;

      for (let i = 0; i < 5; i++) {
        particleSystem.createExplosion(100 + i * 50, 100 + i * 50, 20);
      }

      expect(particleSystem.getCount()).toBeLessThanOrEqual(50);
    });

    test('should update many particles efficiently', () => {
      particleSystem.createExplosion(100, 100, 100);

      const startTime = performance.now();

      for (let i = 0; i < 60; i++) {
        particleSystem.update(16.67);
      }

      const endTime = performance.now();

      // Should handle 60 frames worth of updates quickly
      expect(endTime - startTime).toBeLessThan(100);
    });

    test('should create multiple explosions efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 20; i++) {
        particleSystem.createExplosion(i * 10, i * 10, 10);
      }

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10);
    });
  });

  describe('Utility Methods', () => {
    test('should get accurate particle count', () => {
      particleSystem.createExplosion(100, 100, 15);

      expect(particleSystem.getCount()).toBe(15);
    });

    test('should clear all particles', () => {
      particleSystem.createExplosion(100, 100, 50);

      particleSystem.clear();

      expect(particleSystem.getCount()).toBe(0);
      expect(particleSystem.particles.length).toBe(0);
    });

    test('should get max particles setting', () => {
      expect(particleSystem.getMaxParticles()).toBe(100);

      particleSystem.maxParticles = 50;

      expect(particleSystem.getMaxParticles()).toBe(50);
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero particle explosion', () => {
      particleSystem.createExplosion(100, 100, 0);

      expect(particleSystem.getCount()).toBe(0);
    });

    test('should handle negative particle count', () => {
      particleSystem.createExplosion(100, 100, -5);

      expect(particleSystem.getCount()).toBe(0);
    });

    test('should handle very large particle count request', () => {
      particleSystem.createExplosion(100, 100, 10000);

      expect(particleSystem.getCount()).toBeLessThanOrEqual(100);
    });

    test('should handle particles at screen boundaries', () => {
      const particles = particleSystem.createExplosion(0, 0, 10);

      expect(particles.length).toBeGreaterThan(0);
      particles.forEach(p => {
        expect(p.x).toBe(0);
        expect(p.y).toBe(0);
      });
    });

    test('should handle very small decay rate', () => {
      const particles = particleSystem.createExplosion(100, 100, 1);
      particles[0].decay = 0.001; // Very slow decay

      particleSystem.update(16.67);

      expect(particles[0].life).toBeGreaterThan(0.9);
    });

    test('should handle very large decay rate', () => {
      const particles = particleSystem.createExplosion(100, 100, 1);
      particles[0].decay = 0.5; // Very fast decay

      particleSystem.update(16.67);
      particleSystem.update(16.67);

      expect(particleSystem.getCount()).toBe(0);
    });

    test('should handle simultaneous particle creation and removal', () => {
      const particles1 = particleSystem.createExplosion(100, 100, 10);
      particles1.forEach(p => p.life = 0.01); // About to die

      particleSystem.update(16.67);
      particleSystem.createExplosion(200, 200, 10);

      expect(particleSystem.getCount()).toBeGreaterThan(0);
    });

    test('should handle particles with zero velocity', () => {
      const particles = particleSystem.createExplosion(100, 100, 1);
      particles[0].vx = 0;
      particles[0].vy = 0;

      const initialX = particles[0].x;
      const initialY = particles[0].y;

      particleSystem.update(16.67);

      expect(particles[0].x).toBe(initialX);
      expect(particles[0].y).toBe(initialY);
    });
  });

  describe('Color Randomization', () => {
    test('should return valid color from palette', () => {
      const color = particleSystem.getRandomColor();

      // Colors from Config.colors
      const validColors = ['#ff0080', '#00ff80', '#8000ff', '#00ffff', '#ff00ff'];

      expect(validColors).toContain(color);
    });

    test('should return different colors over multiple calls', () => {
      const colors = new Set();

      for (let i = 0; i < 100; i++) {
        colors.add(particleSystem.getRandomColor());
      }

      // Should get at least 3 different colors in 100 calls
      expect(colors.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Integration with Game Loop', () => {
    test('should simulate 60 frames of particle lifecycle', () => {
      particleSystem.createExplosion(400, 300, 20);

      for (let i = 0; i < 60; i++) {
        particleSystem.update(16.67);
      }

      // Some particles should still be alive after 1 second
      expect(particleSystem.getCount()).toBeGreaterThan(0);
    });

    test('should simulate multiple explosions over time', () => {
      for (let i = 0; i < 10; i++) {
        particleSystem.createExplosion(i * 50, i * 50, 10);
        particleSystem.update(16.67);
      }

      expect(particleSystem.getCount()).toBeGreaterThan(0);
      expect(particleSystem.getCount()).toBeLessThanOrEqual(100);
    });

    test('should adapt quality during gameplay simulation', () => {
      // Simulate low FPS scenario
      particleSystem.updateFPS(35);

      for (let i = 0; i < 5; i++) {
        particleSystem.createExplosion(i * 100, i * 100, 20);
      }

      expect(particleSystem.getCount()).toBeLessThanOrEqual(50);

      // FPS recovers
      particleSystem.updateFPS(60);
      particleSystem.createExplosion(500, 500, 30);

      expect(particleSystem.maxParticles).toBe(100);
    });
  });
});
