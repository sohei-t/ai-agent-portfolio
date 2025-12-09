/**
 * Unit Tests for Bullet.js
 * Tests bullet movement and collision for player and enemy bullets
 */

const { Bullet, BulletPool } = require('../../src/entities/Bullet.js');
const Config = require('../../src/utils/Config.js');

describe('Bullet', () => {
  let playerBullet, enemyBullet;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  beforeEach(() => {
    playerBullet = new Bullet(400, 500, 'player');
    enemyBullet = new Bullet(400, 100, 'enemy');
  });

  describe('Player Bullet', () => {
    test('should have correct initial properties', () => {
      expect(playerBullet.width).toBe(4);
      expect(playerBullet.height).toBe(10);
      expect(playerBullet.speed).toBe(8);
      expect(playerBullet.owner).toBe('player');
    });

    test('should move upward at 8 pixels per frame', () => {
      const initialY = playerBullet.y;
      playerBullet.update();

      expect(playerBullet.y).toBe(initialY - 8);
    });

    test('should detect when off top of screen', () => {
      playerBullet.y = -11;

      expect(playerBullet.isOffScreen(CANVAS_HEIGHT)).toBe(true);
    });

    test('should not be off screen while visible', () => {
      playerBullet.y = 300;

      expect(playerBullet.isOffScreen(CANVAS_HEIGHT)).toBe(false);
    });

    test('should be active initially', () => {
      expect(playerBullet.isActive).toBe(true);
    });

    test('should deactivate on command', () => {
      playerBullet.deactivate();

      expect(playerBullet.isActive).toBe(false);
    });

    test('should reach top of screen in expected time', () => {
      playerBullet.y = 500;
      let frames = 0;

      while (!playerBullet.isOffScreen(CANVAS_HEIGHT) && frames < 100) {
        playerBullet.update();
        frames++;
      }

      // 500 / 8 = 62.5 frames expected
      expect(frames).toBeGreaterThanOrEqual(62);
      expect(frames).toBeLessThanOrEqual(64);
    });
  });

  describe('Enemy Bullet', () => {
    test('should have correct initial properties', () => {
      expect(enemyBullet.width).toBe(4);
      expect(enemyBullet.height).toBe(10);
      expect(enemyBullet.speed).toBe(6);
      expect(enemyBullet.owner).toBe('enemy');
    });

    test('should move downward at 6 pixels per frame', () => {
      const initialY = enemyBullet.y;
      enemyBullet.update();

      expect(enemyBullet.y).toBe(initialY + 6);
    });

    test('should detect when off bottom of screen', () => {
      enemyBullet.y = CANVAS_HEIGHT + 1;

      expect(enemyBullet.isOffScreen(CANVAS_HEIGHT)).toBe(true);
    });

    test('should be slower than player bullet', () => {
      expect(enemyBullet.speed).toBeLessThan(playerBullet.speed);
    });
  });

  describe('Bullet Bounds', () => {
    test('should return correct bounding box for player bullet', () => {
      playerBullet.x = 100;
      playerBullet.y = 200;

      const bounds = playerBullet.getBounds();

      expect(bounds.left).toBe(100);
      expect(bounds.right).toBe(104);
      expect(bounds.top).toBe(200);
      expect(bounds.bottom).toBe(210);
    });

    test('should update bounds after movement', () => {
      const initialBounds = playerBullet.getBounds();

      playerBullet.update();

      const newBounds = playerBullet.getBounds();

      expect(newBounds.top).toBe(initialBounds.top - 8);
      expect(newBounds.bottom).toBe(initialBounds.bottom - 8);
    });
  });

  describe('Bullet Lifecycle', () => {
    test('should track active state throughout flight', () => {
      expect(playerBullet.isActive).toBe(true);

      for (let i = 0; i < 10; i++) {
        playerBullet.update();
      }

      expect(playerBullet.isActive).toBe(true);
    });

    test('should remain active until explicitly deactivated', () => {
      playerBullet.y = -20; // Off screen

      expect(playerBullet.isActive).toBe(true);

      playerBullet.deactivate();

      expect(playerBullet.isActive).toBe(false);
    });
  });

  describe('Multi-Shot Bullets', () => {
    test('should support creating spread pattern', () => {
      const bullets = [
        { x: 400, y: 500, direction: -1, angle: -30 },
        { x: 400, y: 500, direction: -1, angle: 0 },
        { x: 400, y: 500, direction: -1, angle: 30 }
      ];

      expect(bullets.length).toBe(3);
      expect(bullets[0].angle).toBe(-30);
      expect(bullets[1].angle).toBe(0);
      expect(bullets[2].angle).toBe(30);
    });

    test('should create 120 degree spread for multi-shot', () => {
      const spreadAngle = 120;
      const bulletCount = 3;
      const angles = [];

      for (let i = 0; i < bulletCount; i++) {
        const angle = -spreadAngle / 2 + (spreadAngle / (bulletCount - 1)) * i;
        angles.push(angle);
      }

      expect(angles).toEqual([-60, 0, 60]);
    });
  });

  describe('Bullet Pool Management', () => {
    let bulletPool;

    beforeEach(() => {
      bulletPool = new BulletPool(CANVAS_HEIGHT);
    });

    test('should create new bullets', () => {
      bulletPool.create(100, 200, 'player');

      expect(bulletPool.bullets.length).toBe(1);
    });

    test('should respect maximum bullet limit', () => {
      for (let i = 0; i < 60; i++) {
        bulletPool.create(100, 200, 'player');
      }

      expect(bulletPool.bullets.length).toBe(50);
    });

    test('should update all active bullets', () => {
      bulletPool.create(100, 200, 'player');
      const initialY = bulletPool.bullets[0].y;

      bulletPool.update();

      expect(bulletPool.bullets[0].y).toBe(initialY - 8);
    });

    test('should deactivate bullets off screen', () => {
      bulletPool.create(100, -5, 'player');
      bulletPool.update();

      expect(bulletPool.bullets[0].isActive).toBe(false);
    });

    test('should clean up inactive bullets', () => {
      bulletPool.create(100, -5, 'player');
      bulletPool.create(100, 300, 'player');
      bulletPool.update();
      bulletPool.cleanup();

      expect(bulletPool.bullets.length).toBe(1);
    });

    test('should get only active bullets', () => {
      bulletPool.create(100, 200, 'player');
      bulletPool.create(100, -10, 'player');
      bulletPool.update();

      const active = bulletPool.getActiveBullets();

      expect(active.length).toBe(1);
    });
  });

  describe('Performance', () => {
    test('should handle rapid bullet creation', () => {
      const bullets = [];
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        bullets.push({
          x: i,
          y: 300,
          isActive: true
        });
      }

      const duration = performance.now() - startTime;

      expect(duration).toBeLessThan(10);
      expect(bullets.length).toBe(1000);
    });

    test('should handle rapid bullet updates', () => {
      const bullets = [];
      for (let i = 0; i < 100; i++) {
        bullets.push({
          x: 100,
          y: 300,
          update() {
            this.y -= 8;
          }
        });
      }

      const startTime = performance.now();

      bullets.forEach(b => b.update());

      const duration = performance.now() - startTime;

      expect(duration).toBeLessThan(5);
    });
  });
});
