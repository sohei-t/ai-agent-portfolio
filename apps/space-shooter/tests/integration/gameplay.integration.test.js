/**
 * Integration Tests for Gameplay
 * Tests interaction between game systems
 * ITERATION 2: Advanced integration scenarios
 */

describe('Gameplay Integration', () => {
  let game, player, enemies, collisionSystem, scoreSystem, powerUpSystem;

  beforeEach(() => {
    // Player setup
    player = {
      x: 400,
      y: 550,
      width: 40,
      height: 40,
      lives: 3,
      fireRate: 300,
      lastFireTime: 0,
      isInvincible: false,
      score: 0,

      getBounds() {
        return {
          left: this.x,
          right: this.x + this.width,
          top: this.y,
          bottom: this.y + this.height
        };
      },

      takeDamage() {
        if (this.isInvincible) return false;
        this.lives--;
        return true;
      },

      isDead() {
        return this.lives <= 0;
      }
    };

    // Enemies setup
    enemies = [];
    for (let i = 0; i < 5; i++) {
      enemies.push({
        x: 100 + i * 50,
        y: 50,
        width: 30,
        height: 30,
        isAlive: true,
        type: i % 3,

        getBounds() {
          return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
          };
        },

        getPoints() {
          return [100, 150, 200][this.type];
        }
      });
    }

    // Collision system
    collisionSystem = {
      checkCollision(rect1, rect2) {
        return !(
          rect1.right < rect2.left ||
          rect1.left > rect2.right ||
          rect1.bottom < rect2.top ||
          rect1.top > rect2.bottom
        );
      },

      checkBulletEnemyCollision(bullets, enemies) {
        const hits = [];
        bullets.forEach((bullet, bulletIndex) => {
          if (!bullet.isActive || !bullet.isPlayerBullet) return;
          enemies.forEach((enemy, enemyIndex) => {
            if (!enemy.isAlive) return;
            if (this.checkCollision(bullet.getBounds(), enemy.getBounds())) {
              hits.push({ bulletIndex, enemyIndex, bullet, enemy });
            }
          });
        });
        return hits;
      },

      checkBulletPlayerCollision(bullets, player) {
        const hits = [];
        bullets.forEach((bullet, index) => {
          if (!bullet.isActive || bullet.isPlayerBullet) return;
          if (this.checkCollision(bullet.getBounds(), player.getBounds())) {
            hits.push({ bulletIndex: index, bullet });
          }
        });
        return hits;
      },

      checkPlayerPowerUpCollision(player, powerUps) {
        const collected = [];
        powerUps.forEach((powerUp, index) => {
          if (!powerUp.isActive) return;
          if (this.checkCollision(player.getBounds(), powerUp.getBounds())) {
            collected.push({ index, powerUp });
          }
        });
        return collected;
      }
    };

    // Score system
    scoreSystem = {
      score: 0,
      consecutiveHits: 0,

      addHit(points, currentTime) {
        this.consecutiveHits++;
        const multiplier = this.getComboMultiplier();
        const finalPoints = points * multiplier;
        this.score += finalPoints;
        return finalPoints;
      },

      getComboMultiplier() {
        if (this.consecutiveHits >= 10) return 3;
        if (this.consecutiveHits >= 5) return 2;
        return 1;
      },

      reset() {
        this.score = 0;
        this.consecutiveHits = 0;
      }
    };

    // Power-up system
    powerUpSystem = {
      activePowerUps: new Map(),
      maxActivePowerUps: 3,

      activate(type, duration = 10000) {
        if (this.activePowerUps.has(type)) {
          const powerUp = this.activePowerUps.get(type);
          powerUp.endTime = Date.now() + duration;
          return { success: true, action: 'reset' };
        } else if (this.activePowerUps.size < this.maxActivePowerUps) {
          this.activePowerUps.set(type, {
            type,
            endTime: Date.now() + duration
          });
          return { success: true, action: 'added' };
        }
        return { success: false };
      },

      isActive(type) {
        return this.activePowerUps.has(type);
      },

      applyEffects(player) {
        return {
          fireRate: this.isActive('RAPID_FIRE') ? 150 : 300,
          isInvincible: this.isActive('SHIELD')
        };
      }
    };
  });

  describe('Player Shooting Enemy', () => {
    test('should destroy enemy and award points when bullet hits', () => {
      const now = Date.now();
      const bullets = [{
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
      }];

      // Detect collision
      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);
      expect(hits.length).toBeGreaterThan(0);

      // Process hit
      const hit = hits[0];
      enemies[hit.enemyIndex].isAlive = false;
      bullets[hit.bulletIndex].isActive = false;

      const points = scoreSystem.addHit(enemies[hit.enemyIndex].getPoints(), now);

      expect(enemies[hit.enemyIndex].isAlive).toBe(false);
      expect(bullets[hit.bulletIndex].isActive).toBe(false);
      expect(scoreSystem.score).toBeGreaterThan(0);
    });

    test('should build combo when destroying enemies consecutively', () => {
      const now = Date.now();
      const bullets = [];

      // Create bullets for each enemy
      enemies.forEach((enemy, i) => {
        bullets.push({
          x: enemy.x + 5,
          y: enemy.y + 5,
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
      });

      let totalScore = 0;

      // Process all hits
      bullets.forEach((bullet, i) => {
        const hits = collisionSystem.checkBulletEnemyCollision([bullet], enemies);

        if (hits.length > 0) {
          const hit = hits[0];
          enemies[hit.enemyIndex].isAlive = false;
          const points = scoreSystem.addHit(enemies[hit.enemyIndex].getPoints(), now + i * 100);
          totalScore += points;
        }
      });

      // Should have combo bonus (5 hits = 2x multiplier)
      expect(scoreSystem.consecutiveHits).toBe(5);
      expect(totalScore).toBeGreaterThan(100 * 5); // More than base points
    });
  });

  describe('Enemy Shooting Player', () => {
    test('should damage player when enemy bullet hits', () => {
      const bullets = [{
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
      }];

      const initialLives = player.lives;
      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      expect(hits.length).toBe(1);

      // Process hit
      player.takeDamage();

      expect(player.lives).toBe(initialLives - 1);
    });

    test('should trigger game over when player loses all lives', () => {
      player.lives = 1;

      const bullets = [{
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
      }];

      collisionSystem.checkBulletPlayerCollision(bullets, player);
      player.takeDamage();

      expect(player.isDead()).toBe(true);
    });
  });

  describe('Power-Up Collection and Effects', () => {
    test('should collect power-up and apply effects', () => {
      const powerUps = [{
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
      }];

      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);

      expect(collected.length).toBe(1);

      // Activate power-up
      powerUpSystem.activate(collected[0].powerUp.type);
      powerUps[collected[0].index].isActive = false;

      // Apply effects
      const effects = powerUpSystem.applyEffects(player);

      expect(effects.fireRate).toBe(150); // Rapid fire active
    });

    test('should protect player with shield power-up', () => {
      const powerUps = [{
        x: 410,
        y: 560,
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
      }];

      // Collect shield
      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);
      powerUpSystem.activate(collected[0].powerUp.type);

      // Apply shield effect
      const effects = powerUpSystem.applyEffects(player);
      player.isInvincible = effects.isInvincible;

      // Try to damage player
      const bullets = [{
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
      }];

      const hits = collisionSystem.checkBulletPlayerCollision(bullets, player);
      const damaged = player.takeDamage();

      expect(damaged).toBe(false); // Should not take damage
      expect(player.lives).toBe(3); // Lives unchanged
    });

    test('should stack multiple different power-ups', () => {
      const powerUps = [
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
        },
        {
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
        }
      ];

      // Collect both
      const collected = collisionSystem.checkPlayerPowerUpCollision(player, powerUps);
      collected.forEach(c => powerUpSystem.activate(c.powerUp.type));

      // Apply effects
      const effects = powerUpSystem.applyEffects(player);

      expect(effects.fireRate).toBe(150);
      expect(effects.isInvincible).toBe(true);
    });
  });

  describe('Complex Gameplay Scenarios', () => {
    test('should handle simultaneous player and enemy shooting', () => {
      const bullets = [
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
        },
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

      const initialPlayerLives = player.lives;
      const initialEnemyCount = enemies.filter(e => e.isAlive).length;

      // Process both collisions
      const enemyHits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);
      const playerHits = collisionSystem.checkBulletPlayerCollision(bullets, player);

      // Apply effects
      if (enemyHits.length > 0) {
        enemies[enemyHits[0].enemyIndex].isAlive = false;
      }

      if (playerHits.length > 0) {
        player.takeDamage();
      }

      expect(enemies.filter(e => e.isAlive).length).toBeLessThan(initialEnemyCount);
      expect(player.lives).toBeLessThan(initialPlayerLives);
    });

    test('should handle wave completion scenario', () => {
      const now = Date.now();

      // Destroy all enemies
      enemies.forEach((enemy, i) => {
        enemy.isAlive = false;
        scoreSystem.addHit(enemy.getPoints(), now + i * 100);
      });

      const aliveEnemies = enemies.filter(e => e.isAlive);

      expect(aliveEnemies.length).toBe(0);
      expect(scoreSystem.score).toBeGreaterThan(0);
      expect(scoreSystem.consecutiveHits).toBe(5);
    });

    test('should handle player with power-up destroying enemies', () => {
      const now = Date.now();

      // Activate rapid fire
      powerUpSystem.activate('RAPID_FIRE');
      const effects = powerUpSystem.applyEffects(player);

      expect(effects.fireRate).toBe(150);

      // Destroy enemies faster
      let shotsNeeded = 0;
      let timeElapsed = 0;

      enemies.forEach((enemy, i) => {
        if (timeElapsed >= effects.fireRate * i) {
          enemy.isAlive = false;
          scoreSystem.addHit(enemy.getPoints(), now + timeElapsed);
          shotsNeeded++;
          timeElapsed += effects.fireRate;
        }
      });

      // Should be able to shoot more frequently
      expect(shotsNeeded).toBeGreaterThan(0);
      expect(timeElapsed).toBeLessThan(5 * 300); // Faster than normal fire rate
    });

    test('should handle game state after taking multiple hits', () => {
      player.lives = 3;

      for (let i = 0; i < 2; i++) {
        const bullets = [{
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
        }];

        collisionSystem.checkBulletPlayerCollision(bullets, player);
        player.takeDamage();
      }

      expect(player.lives).toBe(1);
      expect(player.isDead()).toBe(false);

      // One more hit should end game
      player.takeDamage();
      expect(player.isDead()).toBe(true);
    });
  });

  describe('Edge Case Integration', () => {
    test('should handle empty enemy array', () => {
      const bullets = [{
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
      }];

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, []);

      expect(hits).toEqual([]);
    });

    test('should handle empty bullet array', () => {
      const hits = collisionSystem.checkBulletEnemyCollision([], enemies);

      expect(hits).toEqual([]);
    });

    test('should handle all enemies dead', () => {
      enemies.forEach(e => e.isAlive = false);

      const bullets = [{
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
      }];

      const hits = collisionSystem.checkBulletEnemyCollision(bullets, enemies);

      expect(hits.length).toBe(0);
    });

    test('should handle power-up at max capacity', () => {
      // Fill to max capacity
      powerUpSystem.activate('RAPID_FIRE');
      powerUpSystem.activate('SHIELD');
      powerUpSystem.activate('MULTI_SHOT');

      // Try to collect same type
      const result = powerUpSystem.activate('RAPID_FIRE');

      expect(result.success).toBe(true);
      expect(result.action).toBe('reset');
    });
  });

  describe('Performance Integration', () => {
    test('should handle large-scale collision detection', () => {
      // Create many bullets
      const bullets = [];
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

      // Create many enemies
      const manyEnemies = [];
      for (let i = 0; i < 55; i++) {
        manyEnemies.push({
          x: (i % 11) * 40,
          y: Math.floor(i / 11) * 40,
          width: 30,
          height: 30,
          isAlive: true,
          type: i % 3,
          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          },
          getPoints() {
            return [100, 150, 200][this.type];
          }
        });
      }

      const startTime = performance.now();
      const hits = collisionSystem.checkBulletEnemyCollision(bullets, manyEnemies);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10); // Should be fast
    });
  });
});
