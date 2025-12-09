/**
 * Unit Tests for CollisionSystem.js
 * Tests AABB collision detection algorithm
 * ITERATION 1: Basic collision detection and edge cases
 */

const CollisionSystem = require('../../src/systems/CollisionSystem.js');

describe('CollisionSystem', () => {
  let collisionSystem;

  beforeEach(() => {
    collisionSystem = new CollisionSystem();
  });

  describe('AABB Collision Detection Algorithm', () => {
    test('should detect collision when rectangles overlap', () => {
      const rect1 = { left: 0, right: 50, top: 0, bottom: 50 };
      const rect2 = { left: 25, right: 75, top: 25, bottom: 75 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });

    test('should not detect collision when rectangles do not overlap', () => {
      const rect1 = { left: 0, right: 50, top: 0, bottom: 50 };
      const rect2 = { left: 100, right: 150, top: 100, bottom: 150 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(false);
    });

    test('should detect collision when rectangles perfectly overlap', () => {
      const rect1 = { left: 0, right: 50, top: 0, bottom: 50 };
      const rect2 = { left: 0, right: 50, top: 0, bottom: 50 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });

    test('should not detect collision when rectangles touch edges (edge case)', () => {
      const rect1 = { left: 0, right: 50, top: 0, bottom: 50 };
      const rect2 = { left: 50, right: 100, top: 0, bottom: 50 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(false);
    });

    test('should not detect collision when rectangles touch corners', () => {
      const rect1 = { left: 0, right: 50, top: 0, bottom: 50 };
      const rect2 = { left: 50, right: 100, top: 50, bottom: 100 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(false);
    });

    test('should detect collision when one rectangle contains another', () => {
      const rect1 = { left: 0, right: 100, top: 0, bottom: 100 };
      const rect2 = { left: 25, right: 75, top: 25, bottom: 75 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });

    test('should detect collision with minimal overlap (1 pixel)', () => {
      const rect1 = { left: 0, right: 50, top: 0, bottom: 50 };
      const rect2 = { left: 49, right: 100, top: 49, bottom: 100 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });

    test('should handle negative coordinates', () => {
      const rect1 = { left: -50, right: 0, top: -50, bottom: 0 };
      const rect2 = { left: -25, right: 25, top: -25, bottom: 25 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });
  });

  describe('Bullet-Player Collision', () => {
    let player, bullets;

    beforeEach(() => {
      player = {
        x: 400,
        y: 550,
        width: 40,
        height: 40,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      };

      bullets = [
        {
          x: 410,
          y: 560,
          width: 5,
          height: 10,
          isActive: true,
          isPlayerBullet: false,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        }
      ];
    });

    test('should detect enemy bullet hitting player', () => {
      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      expect(hits.length).toBe(1);
      expect(hits[0].bulletIndex).toBe(0);
    });

    test('should not detect collision with player bullets', () => {
      bullets[0].isPlayerBullet = true;

      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      expect(hits.length).toBe(0);
    });

    test('should not detect collision with inactive bullets', () => {
      bullets[0].isActive = false;

      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      expect(hits.length).toBe(0);
    });

    test('should detect multiple bullet hits', () => {
      bullets.push({
        x: 420,
        y: 570,
        width: 5,
        height: 10,
        isActive: true,
        isPlayerBullet: false,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      });

      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      expect(hits.length).toBe(2);
    });

    test('should not detect collision with missed bullets', () => {
      bullets[0].x = 1000;
      bullets[0].y = 1000;

      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      expect(hits.length).toBe(0);
    });
  });

  describe('Bullet-Enemy Collision', () => {
    let bullets, enemies;

    beforeEach(() => {
      bullets = [
        {
          x: 105,
          y: 55,
          width: 5,
          height: 10,
          isActive: true,
          isPlayerBullet: true,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        }
      ];

      enemies = [
        {
          x: 100,
          y: 50,
          width: 30,
          height: 30,
          isAlive: true,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        }
      ];
    });

    test('should detect player bullet hitting enemy', () => {
      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBe(1);
      expect(hits[0].bulletIndex).toBe(0);
      expect(hits[0].enemyIndex).toBe(0);
    });

    test('should not detect collision with enemy bullets', () => {
      bullets[0].isPlayerBullet = false;

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBe(0);
    });

    test('should not detect collision with inactive bullets', () => {
      bullets[0].isActive = false;

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBe(0);
    });

    test('should not detect collision with dead enemies', () => {
      enemies[0].isAlive = false;

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBe(0);
    });

    test('should detect bullet hitting multiple enemies in a line', () => {
      enemies.push({
        x: 100,
        y: 50,
        width: 30,
        height: 30,
        isAlive: true,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      });

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBe(2);
    });

    test('should handle grid of enemies efficiently', () => {
      // Create a 5x11 grid
      enemies = [];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 11; col++) {
          enemies.push({
            x: col * 40,
            y: row * 40,
            width: 30,
            height: 30,
            isAlive: true,
            getBounds() {
              return {
                left: this.x,
                right: this.x + this.width,
                top: this.y,
                bottom: this.y + this.height
              };
            }
          });
        }
      }

      bullets[0].x = 105;
      bullets[0].y = 55;

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBeGreaterThan(0);
    });
  });

  describe('Player-PowerUp Collision', () => {
    let player, powerUps;

    beforeEach(() => {
      player = {
        x: 400,
        y: 550,
        width: 40,
        height: 40,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      };

      powerUps = [
        {
          x: 410,
          y: 560,
          width: 20,
          height: 20,
          isActive: true,
          type: 'RAPID_FIRE',
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        }
      ];
    });

    test('should detect player collecting power-up', () => {
      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);

      expect(collected.length).toBe(1);
      expect(collected[0].powerUp.type).toBe('RAPID_FIRE');
    });

    test('should not detect inactive power-ups', () => {
      powerUps[0].isActive = false;

      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);

      expect(collected.length).toBe(0);
    });

    test('should detect multiple power-up collection', () => {
      powerUps.push({
        x: 420,
        y: 570,
        width: 20,
        height: 20,
        isActive: true,
        type: 'SHIELD',
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      });

      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);

      expect(collected.length).toBe(2);
    });

    test('should not detect missed power-ups', () => {
      powerUps[0].x = 1000;
      powerUps[0].y = 1000;

      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);

      expect(collected.length).toBe(0);
    });
  });

  describe('Player-Enemy Collision (Direct Contact)', () => {
    let player, enemies;

    beforeEach(() => {
      player = {
        x: 400,
        y: 550,
        width: 40,
        height: 40,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      };

      enemies = [
        {
          x: 410,
          y: 560,
          width: 30,
          height: 30,
          isAlive: true,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        }
      ];
    });

    test('should detect player touching enemy', () => {
      const result = collisionSystem.checkPlayerEnemyCollision(player, enemies);

      expect(result.collided).toBe(true);
      expect(result.enemy).toBe(enemies[0]);
    });

    test('should not detect collision with dead enemies', () => {
      enemies[0].isAlive = false;

      const result = collisionSystem.checkPlayerEnemyCollision(player, enemies);

      expect(result.collided).toBe(false);
      expect(result.enemy).toBeNull();
    });

    test('should detect first colliding enemy in grid', () => {
      enemies.push({
        x: 420,
        y: 570,
        width: 30,
        height: 30,
        isAlive: true,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      });

      const result = collisionSystem.checkPlayerEnemyCollision(player, enemies);

      expect(result.collided).toBe(true);
    });

    test('should not detect collision when enemies are far away', () => {
      enemies[0].x = 1000;
      enemies[0].y = 1000;

      const result = collisionSystem.checkPlayerEnemyCollision(player, enemies);

      expect(result.collided).toBe(false);
    });
  });

  describe('Performance and Edge Cases', () => {
    test('should handle empty arrays gracefully', () => {
      const player = {
        x: 400,
        y: 550,
        width: 40,
        height: 40,
        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        }
      };

      expect(collisionSystem.checkBulletPlayerCollision([], player)).toEqual([]);
      expect(collisionSystem.checkBulletEnemyCollision([], [])).toEqual([]);
      expect(collisionSystem.checkPlayerPowerUpCollision(player, [])).toEqual([]);
    });

    test('should handle large number of collision checks', () => {
      const bullets = [];
      const enemies = [];

      // Create 100 bullets
      for (let i = 0; i < 100; i++) {
        bullets.push({
          x: i * 10,
          y: i * 10,
          width: 5,
          height: 10,
          isActive: true,
          isPlayerBullet: true,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        });
      }

      // Create 55 enemies (5x11 grid)
      for (let i = 0; i < 55; i++) {
        enemies.push({
          x: (i % 11) * 40,
          y: Math.floor(i / 11) * 40,
          width: 30,
          height: 30,
          isAlive: true,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          }
        });
      }

      const startTime = performance.now();
      collisionSystem.checkBulletEnemyCollision(bullets, enemies);
      const endTime = performance.now();

      // Should complete in reasonable time (< 20ms)
      expect(endTime - startTime).toBeLessThan(20);
    });

    test('should handle very small hitboxes (1x1 pixel)', () => {
      const rect1 = { left: 100, right: 101, top: 100, bottom: 101 };
      const rect2 = { left: 100, right: 101, top: 100, bottom: 101 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });

    test('should handle very large hitboxes (screen-sized)', () => {
      const rect1 = { left: 0, right: 800, top: 0, bottom: 600 };
      const rect2 = { left: 400, right: 500, top: 300, bottom: 400 };

      expect(collisionSystem.checkCollision(rect1, rect2)).toBe(true);
    });
  });
});
