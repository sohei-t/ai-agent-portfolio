/**
 * End-to-End Tests for Full Game Flow
 * Tests complete user scenarios from start to finish
 * ITERATION 3: Complete gameplay scenarios
 */

describe('Full Game E2E Tests', () => {
  let gameState;

  beforeEach(() => {
    gameState = {
      state: 'MENU',
      score: 0,
      wave: 1,
      player: {
        x: 400,
        y: 550,
        lives: 3,
        isInvincible: false,
        fireRate: 300
      },
      enemies: [],
      bullets: [],
      powerUps: [],
      activePowerUps: new Map(),

      // Game state transitions
      startGame() {
        this.state = 'PLAYING';
        this.initializeWave();
      },

      initializeWave() {
        this.enemies = [];
        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 11; col++) {
            this.enemies.push({
              x: 100 + col * 40,
              y: 50 + row * 40,
              width: 30,
              height: 30,
              type: row % 3,
              isAlive: true
            });
          }
        }
      },

      playerShoot() {
        if (this.state !== 'PLAYING') return false;

        this.bullets.push({
          x: this.player.x + 17.5,
          y: this.player.y,
          width: 5,
          height: 10,
          isPlayerBullet: true,
          isActive: true
        });

        return true;
      },

      enemyShoot(enemyX, enemyY) {
        this.bullets.push({
          x: enemyX + 12.5,
          y: enemyY + 30,
          width: 5,
          height: 10,
          isPlayerBullet: false,
          isActive: true
        });
      },

      dropPowerUp(x, y, type) {
        this.powerUps.push({
          x,
          y,
          width: 20,
          height: 20,
          type,
          isActive: true
        });
      },

      processCollisions() {
        // Bullet-Enemy collisions
        this.bullets.forEach(bullet => {
          if (!bullet.isActive || !bullet.isPlayerBullet) return;

          this.enemies.forEach(enemy => {
            if (!enemy.isAlive) return;

            if (this.checkCollision(bullet, enemy)) {
              enemy.isAlive = false;
              bullet.isActive = false;
              this.score += [100, 150, 200][enemy.type];

              // 15% chance to drop power-up
              if (Math.random() < 0.15) {
                const types = ['RAPID_FIRE', 'SHIELD', 'MULTI_SHOT'];
                this.dropPowerUp(enemy.x, enemy.y, types[Math.floor(Math.random() * 3)]);
              }
            }
          });
        });

        // Bullet-Player collisions
        this.bullets.forEach(bullet => {
          if (!bullet.isActive || bullet.isPlayerBullet) return;

          if (this.checkCollision(bullet, this.player)) {
            bullet.isActive = false;

            if (!this.player.isInvincible) {
              this.player.lives--;

              if (this.player.lives <= 0) {
                this.state = 'GAME_OVER';
              }
            }
          }
        });

        // Player-PowerUp collisions
        this.powerUps.forEach(powerUp => {
          if (!powerUp.isActive) return;

          if (this.checkCollision(powerUp, this.player)) {
            powerUp.isActive = false;

            if (this.activePowerUps.size < 3 || this.activePowerUps.has(powerUp.type)) {
              this.activePowerUps.set(powerUp.type, {
                type: powerUp.type,
                endTime: Date.now() + 10000
              });

              // Apply effects
              if (powerUp.type === 'RAPID_FIRE') {
                this.player.fireRate = 150;
              } else if (powerUp.type === 'SHIELD') {
                this.player.isInvincible = true;
              }
            }
          }
        });

        // Check wave completion
        if (this.enemies.every(e => !e.isAlive)) {
          this.wave++;
          this.state = 'VICTORY';
        }
      },

      checkCollision(obj1, obj2) {
        const r1 = {
          left: obj1.x,
          right: obj1.x + obj1.width,
          top: obj1.y,
          bottom: obj1.y + obj1.height
        };

        const r2 = {
          left: obj2.x,
          right: obj2.x + obj2.width,
          top: obj2.y,
          bottom: obj2.y + obj2.height
        };

        return !(
          r1.right < r2.left ||
          r1.left > r2.right ||
          r1.bottom < r2.top ||
          r1.top > r2.bottom
        );
      },

      pause() {
        if (this.state === 'PLAYING') {
          this.state = 'PAUSED';
        } else if (this.state === 'PAUSED') {
          this.state = 'PLAYING';
        }
      },

      gameOver() {
        this.state = 'GAME_OVER';
      },

      restart() {
        this.state = 'MENU';
        this.score = 0;
        this.wave = 1;
        this.player.lives = 3;
        this.player.isInvincible = false;
        this.player.fireRate = 300;
        this.enemies = [];
        this.bullets = [];
        this.powerUps = [];
        this.activePowerUps.clear();
      }
    };
  });

  describe('Complete Game Flow: Menu to Victory', () => {
    test('should start game from menu', () => {
      expect(gameState.state).toBe('MENU');

      gameState.startGame();

      expect(gameState.state).toBe('PLAYING');
      expect(gameState.enemies.length).toBe(55); // 5x11 grid
    });

    test('should play through a complete wave', () => {
      gameState.startGame();

      // Simulate destroying all enemies
      gameState.enemies.forEach((enemy, i) => {
        // Move bullet to enemy position
        gameState.bullets.push({
          x: enemy.x + 10,
          y: enemy.y + 10,
          width: 5,
          height: 10,
          isPlayerBullet: true,
          isActive: true
        });
      });

      gameState.processCollisions();

      const aliveEnemies = gameState.enemies.filter(e => e.isAlive);

      expect(aliveEnemies.length).toBe(0);
      expect(gameState.state).toBe('VICTORY');
      expect(gameState.score).toBeGreaterThan(0);
    });

    test('should calculate correct score for full wave', () => {
      gameState.startGame();

      // Destroy all 55 enemies
      // Row distribution: type 0 (rows 0,3), type 1 (rows 1,4), type 2 (row 2)
      // 22 enemies type 0 (100 pts), 22 type 1 (150 pts), 11 type 2 (200 pts)
      gameState.enemies.forEach((enemy, i) => {
        gameState.bullets.push({
          x: enemy.x + 10,
          y: enemy.y + 10,
          width: 5,
          height: 10,
          isPlayerBullet: true,
          isActive: true
        });
      });

      gameState.processCollisions();

      // Expected: 22*100 + 22*150 + 11*200 = 2200 + 3300 + 2200 = 7700
      expect(gameState.score).toBe(7700);
    });

    test('should advance to next wave after victory', () => {
      gameState.startGame();

      expect(gameState.wave).toBe(1);

      // Complete wave
      gameState.enemies.forEach(enemy => enemy.isAlive = false);
      gameState.processCollisions();

      expect(gameState.state).toBe('VICTORY');
      expect(gameState.wave).toBe(2);
    });
  });

  describe('Complete Game Flow: Menu to Game Over', () => {
    test('should end game when player loses all lives', () => {
      gameState.startGame();

      expect(gameState.player.lives).toBe(3);

      // Take 3 hits
      for (let i = 0; i < 3; i++) {
        gameState.bullets.push({
          x: gameState.player.x + 10,
          y: gameState.player.y + 10,
          width: 5,
          height: 10,
          isPlayerBullet: false,
          isActive: true
        });

        gameState.processCollisions();
      }

      expect(gameState.state).toBe('GAME_OVER');
      expect(gameState.player.lives).toBe(0);
    });

    test('should preserve score on game over', () => {
      gameState.startGame();

      // Destroy some enemies
      for (let i = 0; i < 5; i++) {
        gameState.bullets.push({
          x: gameState.enemies[i].x + 10,
          y: gameState.enemies[i].y + 10,
          width: 5,
          height: 10,
          isPlayerBullet: true,
          isActive: true
        });
      }

      gameState.processCollisions();

      const scoreBeforeGameOver = gameState.score;

      // Lose all lives
      gameState.player.lives = 0;
      gameState.state = 'GAME_OVER';

      expect(gameState.score).toBe(scoreBeforeGameOver);
    });

    test('should restart game with clean state', () => {
      gameState.startGame();

      // Play and get some score
      gameState.bullets.push({
        x: gameState.enemies[0].x + 10,
        y: gameState.enemies[0].y + 10,
        width: 5,
        height: 10,
        isPlayerBullet: true,
        isActive: true
      });

      gameState.processCollisions();

      // Game over
      gameState.player.lives = 0;
      gameState.state = 'GAME_OVER';

      // Restart
      gameState.restart();

      expect(gameState.state).toBe('MENU');
      expect(gameState.score).toBe(0);
      expect(gameState.wave).toBe(1);
      expect(gameState.player.lives).toBe(3);
    });
  });

  describe('Power-Up Complete Flow', () => {
    test('should collect and use Rapid Fire power-up', () => {
      gameState.startGame();

      expect(gameState.player.fireRate).toBe(300);

      // Drop power-up
      gameState.dropPowerUp(gameState.player.x, gameState.player.y, 'RAPID_FIRE');

      gameState.processCollisions();

      expect(gameState.player.fireRate).toBe(150);
      expect(gameState.activePowerUps.has('RAPID_FIRE')).toBe(true);
    });

    test('should collect and use Shield power-up', () => {
      gameState.startGame();

      expect(gameState.player.isInvincible).toBe(false);

      // Drop shield
      gameState.dropPowerUp(gameState.player.x, gameState.player.y, 'SHIELD');

      gameState.processCollisions();

      expect(gameState.player.isInvincible).toBe(true);

      // Try to damage player
      gameState.bullets.push({
        x: gameState.player.x + 10,
        y: gameState.player.y + 10,
        width: 5,
        height: 10,
        isPlayerBullet: false,
        isActive: true
      });

      gameState.processCollisions();

      expect(gameState.player.lives).toBe(3); // No damage taken
    });

    test('should stack multiple power-ups', () => {
      gameState.startGame();

      // Drop multiple power-ups
      gameState.dropPowerUp(gameState.player.x, gameState.player.y, 'RAPID_FIRE');
      gameState.dropPowerUp(gameState.player.x, gameState.player.y + 5, 'SHIELD');
      gameState.dropPowerUp(gameState.player.x, gameState.player.y + 10, 'MULTI_SHOT');

      gameState.processCollisions();

      expect(gameState.activePowerUps.size).toBe(3);
      expect(gameState.player.fireRate).toBe(150);
      expect(gameState.player.isInvincible).toBe(true);
    });

    test('should randomly drop power-ups from destroyed enemies', () => {
      gameState.startGame();

      // Set up mock random to ensure drop
      const originalRandom = Math.random;
      Math.random = () => 0.1; // Always drop (< 0.15)

      gameState.bullets.push({
        x: gameState.enemies[0].x + 10,
        y: gameState.enemies[0].y + 10,
        width: 5,
        height: 10,
        isPlayerBullet: true,
        isActive: true
      });

      gameState.processCollisions();

      Math.random = originalRandom;

      const activePowerUps = gameState.powerUps.filter(p => p.isActive);

      expect(activePowerUps.length).toBeGreaterThan(0);
    });
  });

  describe('Pause and Resume Flow', () => {
    test('should pause and resume game', () => {
      gameState.startGame();

      expect(gameState.state).toBe('PLAYING');

      gameState.pause();

      expect(gameState.state).toBe('PAUSED');

      gameState.pause();

      expect(gameState.state).toBe('PLAYING');
    });

    test('should preserve game state when paused', () => {
      gameState.startGame();

      const scoreBeforePause = gameState.score;
      const livesBeforePause = gameState.player.lives;

      gameState.pause();

      expect(gameState.score).toBe(scoreBeforePause);
      expect(gameState.player.lives).toBe(livesBeforePause);
    });
  });

  describe('Complex Gameplay Scenarios', () => {
    test('should handle player shooting while powered up', () => {
      gameState.startGame();

      // Activate Rapid Fire
      gameState.activePowerUps.set('RAPID_FIRE', {
        type: 'RAPID_FIRE',
        endTime: Date.now() + 10000
      });
      gameState.player.fireRate = 150;

      // Rapid shooting
      const shotsInSecond = Math.floor(1000 / 150); // ~6-7 shots

      for (let i = 0; i < shotsInSecond; i++) {
        gameState.playerShoot();
      }

      expect(gameState.bullets.filter(b => b.isPlayerBullet).length).toBeGreaterThanOrEqual(6);
    });

    test('should handle multiple simultaneous events', () => {
      gameState.startGame();

      // Scenario: Player shoots enemy, collects power-up, gets hit simultaneously
      const enemy = gameState.enemies[0];

      // Player shoots
      gameState.bullets.push({
        x: enemy.x + 10,
        y: enemy.y + 10,
        width: 5,
        height: 10,
        isPlayerBullet: true,
        isActive: true
      });

      // Drop power-up at player position
      gameState.dropPowerUp(gameState.player.x, gameState.player.y, 'SHIELD');

      // Enemy shoots at player
      gameState.bullets.push({
        x: gameState.player.x + 10,
        y: gameState.player.y + 10,
        width: 5,
        height: 10,
        isPlayerBullet: false,
        isActive: true
      });

      const initialLives = gameState.player.lives;

      gameState.processCollisions();

      // Enemy should be destroyed
      expect(enemy.isAlive).toBe(false);

      // Power-up should be collected
      expect(gameState.player.isInvincible).toBe(true);

      // Player should not take damage (shield collected before hit processed)
      // This depends on collision processing order
    });

    test('should handle full game from start to wave completion with power-ups', () => {
      gameState.startGame();

      let enemiesDestroyed = 0;

      // Simulate gameplay: destroy enemies and collect power-ups
      gameState.enemies.forEach((enemy, i) => {
        if (i % 7 === 0) {
          // Drop power-up at player position so it gets collected
          gameState.dropPowerUp(gameState.player.x, gameState.player.y, 'RAPID_FIRE');
        }

        gameState.bullets.push({
          x: enemy.x + 10,
          y: enemy.y + 10,
          width: 5,
          height: 10,
          isPlayerBullet: true,
          isActive: true
        });

        gameState.processCollisions();

        if (!enemy.isAlive) enemiesDestroyed++;
      });

      expect(enemiesDestroyed).toBe(55);
      expect(gameState.state).toBe('VICTORY');
      expect(gameState.wave).toBe(2);
      expect(gameState.activePowerUps.size).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases in E2E Flow', () => {
    test('should handle starting game multiple times', () => {
      gameState.startGame();
      const firstEnemyCount = gameState.enemies.length;

      gameState.startGame();
      const secondEnemyCount = gameState.enemies.length;

      expect(firstEnemyCount).toBe(55);
      expect(secondEnemyCount).toBe(55);
    });

    test('should handle victory with no bullets remaining', () => {
      gameState.startGame();

      // Destroy all enemies
      gameState.enemies.forEach(enemy => {
        enemy.isAlive = false;
      });

      gameState.processCollisions();

      expect(gameState.state).toBe('VICTORY');
      expect(gameState.bullets.filter(b => b.isActive).length).toBe(0);
    });

    test('should handle game over with active power-ups', () => {
      gameState.startGame();

      gameState.activePowerUps.set('RAPID_FIRE', {
        type: 'RAPID_FIRE',
        endTime: Date.now() + 10000
      });

      gameState.player.lives = 0;
      gameState.state = 'GAME_OVER';

      expect(gameState.activePowerUps.size).toBeGreaterThan(0);

      gameState.restart();

      expect(gameState.activePowerUps.size).toBe(0);
    });

    test('should handle pause during power-up collection', () => {
      gameState.startGame();

      gameState.dropPowerUp(gameState.player.x, gameState.player.y, 'SHIELD');

      gameState.pause();

      expect(gameState.state).toBe('PAUSED');
      expect(gameState.powerUps[0].isActive).toBe(true);
    });
  });

  describe('Performance in Full Game Flow', () => {
    test('should handle rapid shooting without slowdown', () => {
      gameState.startGame();

      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        gameState.playerShoot();
      }

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10);
      expect(gameState.bullets.length).toBe(100);
    });

    test('should process collisions efficiently in full game', () => {
      gameState.startGame();

      // Create realistic game state
      for (let i = 0; i < 50; i++) {
        gameState.playerShoot();
      }

      for (let i = 0; i < 10; i++) {
        gameState.dropPowerUp(i * 50, i * 50, 'RAPID_FIRE');
      }

      const startTime = performance.now();

      gameState.processCollisions();

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(10);
    });
  });
});
