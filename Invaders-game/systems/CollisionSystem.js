/**
 * CollisionSystem.js
 * AABB collision detection for all game entities
 */

class CollisionSystem {
  constructor() {}

  // AABB Collision Detection Algorithm
  checkCollision(rect1, rect2) {
    return !(
      rect1.right <= rect2.left ||
      rect1.left >= rect2.right ||
      rect1.bottom <= rect2.top ||
      rect1.top >= rect2.bottom
    );
  }

  checkBulletPlayerCollision(bullets, player) {
    const playerBounds = player.getBounds();
    const hits = [];

    bullets.forEach((bullet, index) => {
      if (!bullet.isActive || bullet.isPlayerBullet) return;

      const bulletBounds = bullet.getBounds();

      if (this.checkCollision(bulletBounds, playerBounds)) {
        hits.push({ bulletIndex: index, bullet });
      }
    });

    return hits;
  }

  checkBulletEnemyCollision(bullets, enemies) {
    const hits = [];

    bullets.forEach((bullet, bulletIndex) => {
      if (!bullet.isActive || !bullet.isPlayerBullet) return;

      const bulletBounds = bullet.getBounds();

      enemies.forEach((enemy, enemyIndex) => {
        if (!enemy.isAlive) return;

        const enemyBounds = enemy.getBounds();

        if (this.checkCollision(bulletBounds, enemyBounds)) {
          hits.push({
            bulletIndex,
            enemyIndex,
            bullet,
            enemy
          });
        }
      });
    });

    return hits;
  }

  checkPlayerPowerUpCollision(player, powerUps) {
    const playerBounds = player.getBounds();
    const collected = [];

    powerUps.forEach((powerUp, index) => {
      if (!powerUp.isActive) return;

      const powerUpBounds = powerUp.getBounds();

      if (this.checkCollision(playerBounds, powerUpBounds)) {
        collected.push({ index, powerUp });
      }
    });

    return collected;
  }

  checkPlayerEnemyCollision(player, enemies) {
    const playerBounds = player.getBounds();

    for (let enemy of enemies) {
      if (!enemy.isAlive) continue;

      const enemyBounds = enemy.getBounds();

      if (this.checkCollision(playerBounds, enemyBounds)) {
        return { collided: true, enemy };
      }
    }

    return { collided: false, enemy: null };
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.CollisionSystem = CollisionSystem;
}

