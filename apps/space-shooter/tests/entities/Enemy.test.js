/**
 * Unit Tests for Enemy.js
 * Tests enemy movement algorithm, shooting, and grid behavior
 */

const { Enemy, EnemyGrid } = require('../../src/entities/Enemy.js');
const Config = require('../../src/utils/Config.js');

describe('Enemy', () => {
  let enemy, enemyGrid;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  beforeEach(() => {
    enemy = new Enemy(100, 50, 0);

    enemyGrid = new EnemyGrid(CANVAS_WIDTH, CANVAS_HEIGHT);
  });

  describe('Enemy Entity', () => {
    test('should have correct initial properties', () => {
      expect(enemy.width).toBe(30);
      expect(enemy.height).toBe(30);
      expect(enemy.speed).toBe(2);
      expect(enemy.isAlive).toBe(true);
    });

    test('should move horizontally based on direction', () => {
      const initialX = enemy.x;

      enemy.direction = 1;
      enemy.move();
      expect(enemy.x).toBe(initialX + 2);

      enemy.direction = -1;
      enemy.move();
      expect(enemy.x).toBe(initialX + 2 - 2);
    });

    test('should have 1% fire probability', () => {
      enemy.fireRate = 1.0; // 100% for testing
      expect(enemy.shouldFire()).toBe(true);

      enemy.fireRate = 0.0;
      expect(enemy.shouldFire()).toBe(false);
    });

    test('should be destroyable', () => {
      enemy.destroy();
      expect(enemy.isAlive).toBe(false);
    });

    test('should return correct bounds', () => {
      enemy.x = 100;
      enemy.y = 50;

      const bounds = enemy.getBounds();

      expect(bounds.left).toBe(100);
      expect(bounds.right).toBe(130);
      expect(bounds.top).toBe(50);
      expect(bounds.bottom).toBe(80);
    });

    test('should award different points by type', () => {
      enemy.type = 0;
      expect(enemy.getPoints()).toBe(100);

      enemy.type = 1;
      expect(enemy.getPoints()).toBe(150);

      enemy.type = 2;
      expect(enemy.getPoints()).toBe(200);
    });
  });

  describe('Enemy Grid Formation', () => {
    beforeEach(() => {
      enemyGrid.init();
    });

    test('should create 5 rows x 11 columns', () => {
      expect(enemyGrid.enemies.length).toBe(55);
    });

    test('should center grid on screen', () => {
      const firstEnemy = enemyGrid.enemies[0];
      const lastInRow = enemyGrid.enemies[10];

      const gridWidth = lastInRow.x + lastInRow.width - firstEnemy.x;
      const centerX = firstEnemy.x + gridWidth / 2;

      expect(centerX).toBeCloseTo(CANVAS_WIDTH / 2, 0);
    });

    test('should assign enemy types in pattern', () => {
      expect(enemyGrid.enemies[0].type).toBe(0); // Row 0
      expect(enemyGrid.enemies[11].type).toBe(1); // Row 1
      expect(enemyGrid.enemies[22].type).toBe(2); // Row 2
      expect(enemyGrid.enemies[33].type).toBe(0); // Row 3 (wraps)
    });

    test('should start all enemies alive', () => {
      const aliveCount = enemyGrid.getAliveEnemies().length;
      expect(aliveCount).toBe(55);
    });
  });

  describe('Enemy Movement Algorithm', () => {
    beforeEach(() => {
      enemyGrid.init();
    });

    test('should move all enemies right initially', () => {
      const firstEnemy = enemyGrid.enemies[0];
      const initialX = firstEnemy.x;

      enemyGrid.update();

      expect(firstEnemy.x).toBe(initialX + 2);
    });

    test('should reverse direction when hitting right edge', () => {
      // Move enemies to near right edge
      enemyGrid.enemies.forEach(e => {
        e.x = CANVAS_WIDTH - e.width - 1;
      });

      enemyGrid.update();

      expect(enemyGrid.direction).toBe(-1);
    });

    test('should reverse direction when hitting left edge', () => {
      enemyGrid.direction = -1;
      enemyGrid.enemies.forEach(e => {
        e.x = 1;
      });

      enemyGrid.update();

      expect(enemyGrid.direction).toBe(1);
    });

    test('should descend 20px on direction reversal', () => {
      const firstEnemy = enemyGrid.enemies[0];
      const initialY = firstEnemy.y;

      enemyGrid.enemies.forEach(e => {
        e.x = CANVAS_WIDTH - e.width - 1;
      });

      enemyGrid.update();

      expect(firstEnemy.y).toBe(initialY + 20);
    });

    test('should not descend during normal horizontal movement', () => {
      const firstEnemy = enemyGrid.enemies[0];
      const initialY = firstEnemy.y;

      enemyGrid.update();

      expect(firstEnemy.y).toBe(initialY);
    });
  });

  describe('Speed Scaling', () => {
    test('should increase speed by 10% per wave', () => {
      enemyGrid.wave = 1;
      enemyGrid.increaseSpeed();

      expect(enemyGrid.speed).toBeCloseTo(2.2, 1); // 2 * 1.1
    });

    test('should compound speed increases', () => {
      enemyGrid.wave = 1;
      enemyGrid.increaseSpeed();
      enemyGrid.wave = 2;
      enemyGrid.increaseSpeed();

      expect(enemyGrid.speed).toBeCloseTo(2.4, 1); // 2 * 1.2
    });

    test('should reset to base speed before each calculation', () => {
      enemyGrid.wave = 5;
      enemyGrid.increaseSpeed();

      const expectedSpeed = enemyGrid.baseSpeed * (1 + 0.1 * 5);
      expect(enemyGrid.speed).toBeCloseTo(expectedSpeed, 1);
    });
  });

  describe('Wave Progression', () => {
    test('should increment wave number', () => {
      enemyGrid.wave = 1;
      enemyGrid.nextWave();

      expect(enemyGrid.wave).toBe(2);
    });

    test('should increase speed on next wave', () => {
      const initialSpeed = enemyGrid.speed;
      enemyGrid.nextWave();

      expect(enemyGrid.speed).toBeGreaterThan(initialSpeed);
    });
  });

  describe('Game Over Conditions', () => {
    beforeEach(() => {
      enemyGrid.init();
    });

    test('should detect when enemies reach bottom 10%', () => {
      const bottomThreshold = CANVAS_HEIGHT * 0.9;

      enemyGrid.enemies[0].y = bottomThreshold;

      expect(enemyGrid.hasReachedBottom()).toBe(true);
    });

    test('should not trigger game over above threshold', () => {
      const bottomThreshold = CANVAS_HEIGHT * 0.9;

      enemyGrid.enemies.forEach(e => {
        e.y = bottomThreshold - 50;
      });

      expect(enemyGrid.hasReachedBottom()).toBe(false);
    });

    test('should detect when all enemies destroyed', () => {
      enemyGrid.enemies.forEach(e => {
        e.isAlive = false;
      });

      expect(enemyGrid.allDestroyed()).toBe(true);
    });

    test('should not detect victory with enemies remaining', () => {
      enemyGrid.enemies[0].isAlive = false;

      expect(enemyGrid.allDestroyed()).toBe(false);
    });
  });

  describe('Alive Enemy Tracking', () => {
    beforeEach(() => {
      enemyGrid.init();
    });

    test('should get all alive enemies', () => {
      enemyGrid.enemies[0].isAlive = false;
      enemyGrid.enemies[1].isAlive = false;

      const alive = enemyGrid.getAliveEnemies();

      expect(alive.length).toBe(53);
    });

    test('should find lowest enemy', () => {
      const lowest = enemyGrid.getLowestEnemy();

      expect(lowest.row).toBe(4); // Bottom row
    });

    test('should return null when no enemies alive', () => {
      enemyGrid.enemies.forEach(e => {
        e.isAlive = false;
      });

      const lowest = enemyGrid.getLowestEnemy();

      expect(lowest).toBeNull();
    });
  });
});
