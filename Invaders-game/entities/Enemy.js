/**
 * Enemy.js
 * Enemy entity and grid management with movement algorithm
 */


class Enemy {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = Config.enemies.speed;
    this.direction = 1; // 1 = right, -1 = left
    this.type = type; // 0, 1, or 2
    this.isAlive = true;
    this.fireRate = Config.enemies.fireRate;
  }

  move() {
    this.x += this.speed * this.direction;
  }

  shouldFire() {
    return Math.random() < this.fireRate;
  }

  destroy() {
    this.isAlive = false;
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  getPoints() {
    const pointsByType = [100, 150, 200];
    return pointsByType[this.type];
  }
}

class EnemyGrid {
  constructor(canvasWidth, canvasHeight) {
    this.enemies = [];
    this.rows = Config.enemies.rows;
    this.cols = Config.enemies.cols;
    this.speed = Config.enemies.speed;
    this.baseSpeed = Config.enemies.speed;
    this.direction = 1;
    this.descentAmount = Config.enemies.descentAmount;
    this.wave = 1;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  init() {
    this.enemies = [];
    // Calculate grid width: (cols - 1) * spacing + enemy width
    const gridWidth = (this.cols - 1) * 40 + 30;
    const startX = (this.canvasWidth - gridWidth) / 2;
    const startY = 50;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.enemies.push({
          x: startX + col * 40,
          y: startY + row * 40,
          row,
          col,
          width: 30,
          height: 30,
          type: row % 3,
          isAlive: true,
          direction: this.direction,
          speed: this.speed,
          fireRate: Config.enemies.fireRate,

          shouldFire() {
            return Math.random() < this.fireRate;
          },

          destroy() {
            this.isAlive = false;
          },

          getBounds() {
            return {
              left: this.x,
              right: this.x + this.width,
              top: this.y,
              bottom: this.y + this.height
            };
          },

          getPoints() {
            const pointsByType = [100, 150, 200];
            return pointsByType[this.type];
          }
        });
      }
    }
  }

  update() {
    // Adjust speed based on remaining enemies (like classic Space Invaders)
    const aliveCount = this.getAliveEnemies().length;
    const totalCount = this.rows * this.cols;
    const deadRatio = 1 - (aliveCount / totalCount);

    // Speed increases as enemies are destroyed
    // When only 1 enemy left, it moves very fast
    if (aliveCount === 1) {
      this.speed = Config.enemies.maxSpeed || 8;
    } else if (aliveCount <= 5) {
      this.speed = this.baseSpeed * 4;
    } else if (aliveCount <= 10) {
      this.speed = this.baseSpeed * 3;
    } else if (aliveCount <= 20) {
      this.speed = this.baseSpeed * 2;
    } else {
      this.speed = this.baseSpeed * (1 + deadRatio * 2);
    }

    let shouldReverse = false;

    // Check if any enemy would hit edge after movement
    this.enemies.forEach(enemy => {
      if (!enemy.isAlive) return;

      const nextX = enemy.x + this.speed * this.direction;

      if (this.direction === 1 && nextX + enemy.width >= this.canvasWidth) {
        shouldReverse = true;
      } else if (this.direction === -1 && nextX <= 0) {
        shouldReverse = true;
      }
    });

    // Move all enemies
    this.enemies.forEach(enemy => {
      if (!enemy.isAlive) return;

      if (shouldReverse) {
        enemy.y += this.descentAmount;
      } else {
        enemy.x += this.speed * this.direction;
      }
    });

    // Reverse direction after movement if needed
    if (shouldReverse) {
      this.direction *= -1;
    }
  }

  increaseSpeed() {
    this.speed = this.baseSpeed * (1 + Config.enemies.speedIncreasePerWave * this.wave);
  }

  nextWave() {
    this.wave++;
    this.increaseSpeed();
  }

  getAliveEnemies() {
    return this.enemies.filter(e => e.isAlive);
  }

  getLowestEnemy() {
    const alive = this.getAliveEnemies();
    if (alive.length === 0) return null;

    return alive.reduce((lowest, enemy) =>
      enemy.y > lowest.y ? enemy : lowest
    );
  }

  hasReachedBottom() {
    const lowest = this.getLowestEnemy();
    if (!lowest) return false;

    return lowest.y + lowest.height >= this.canvasHeight * 0.9;
  }

  allDestroyed() {
    return this.getAliveEnemies().length === 0;
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Enemy = Enemy;
  window.EnemyGrid = EnemyGrid;
}

