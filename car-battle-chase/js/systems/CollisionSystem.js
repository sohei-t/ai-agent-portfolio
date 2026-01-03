/**
 * CollisionSystem.js - Collision Detection and Response
 * AABB and circle-based collision detection
 */

export class CollisionSystem {
  constructor() {
    // Collision layers
    this.layers = {
      PLAYER: 1,
      ENEMY: 2,
      PLAYER_PROJECTILE: 4,
      ENEMY_PROJECTILE: 8,
      POWERUP: 16,
      OBSTACLE: 32
    };

    // Collision pairs that should be checked
    this.collisionPairs = [
      { a: this.layers.PLAYER, b: this.layers.ENEMY },
      { a: this.layers.PLAYER, b: this.layers.ENEMY_PROJECTILE },
      { a: this.layers.PLAYER, b: this.layers.POWERUP },
      { a: this.layers.ENEMY, b: this.layers.PLAYER_PROJECTILE },
      { a: this.layers.PLAYER_PROJECTILE, b: this.layers.OBSTACLE },
      { a: this.layers.ENEMY_PROJECTILE, b: this.layers.OBSTACLE }
    ];

    // Collision callbacks
    this.onCollision = null;
  }

  /**
   * Check collisions between entity groups
   */
  checkCollisions(groups) {
    const collisions = [];

    // Player vs Enemies
    if (groups.player && groups.enemies) {
      for (const enemy of groups.enemies) {
        if (!enemy.active) continue;

        if (this.checkCircleCollision(groups.player, enemy)) {
          collisions.push({
            type: 'player-enemy',
            entityA: groups.player,
            entityB: enemy
          });
        }
      }
    }

    // Player vs Enemy Bombs
    if (groups.player && groups.bombs) {
      for (const bomb of groups.bombs) {
        if (!bomb.active) continue;

        // Check if bomb is exploding and player is in range
        if (bomb.exploded && bomb.isInExplosion(groups.player)) {
          collisions.push({
            type: 'player-explosion',
            entityA: groups.player,
            entityB: bomb
          });
        }
      }
    }

    // Player vs Missiles
    if (groups.player && groups.missiles) {
      for (const missile of groups.missiles) {
        if (!missile.active) continue;
        if (missile.owner === groups.player) continue;

        if (this.checkCircleCollision(groups.player, missile)) {
          collisions.push({
            type: 'player-missile',
            entityA: groups.player,
            entityB: missile
          });
        }
      }
    }

    // Player vs PowerUps
    if (groups.player && groups.powerups) {
      for (const powerup of groups.powerups) {
        if (!powerup.active) continue;

        if (this.checkCircleCollision(groups.player, powerup)) {
          collisions.push({
            type: 'player-powerup',
            entityA: groups.player,
            entityB: powerup
          });
        }
      }
    }

    // Enemies vs Player Bombs
    if (groups.enemies && groups.bombs) {
      for (const bomb of groups.bombs) {
        if (!bomb.active) continue;

        if (bomb.exploded) {
          for (const enemy of groups.enemies) {
            if (!enemy.active) continue;
            if (bomb.owner === enemy) continue;

            if (bomb.isInExplosion(enemy)) {
              collisions.push({
                type: 'enemy-explosion',
                entityA: enemy,
                entityB: bomb
              });
            }
          }
        }
      }
    }

    // Enemies vs Player Missiles
    if (groups.enemies && groups.missiles) {
      for (const missile of groups.missiles) {
        if (!missile.active) continue;
        if (!groups.player || missile.owner !== groups.player) continue;

        for (const enemy of groups.enemies) {
          if (!enemy.active) continue;

          if (this.checkCircleCollision(enemy, missile)) {
            collisions.push({
              type: 'enemy-missile',
              entityA: enemy,
              entityB: missile
            });
          }
        }
      }
    }

    return collisions;
  }

  /**
   * Process collision results
   */
  processCollisions(collisions, gameState) {
    for (const collision of collisions) {
      switch (collision.type) {
        case 'player-enemy':
          this.handlePlayerEnemyCollision(collision, gameState);
          break;

        case 'player-explosion':
          this.handlePlayerExplosionCollision(collision, gameState);
          break;

        case 'player-missile':
          this.handlePlayerMissileCollision(collision, gameState);
          break;

        case 'player-powerup':
          this.handlePlayerPowerupCollision(collision, gameState);
          break;

        case 'enemy-explosion':
          this.handleEnemyExplosionCollision(collision, gameState);
          break;

        case 'enemy-missile':
          this.handleEnemyMissileCollision(collision, gameState);
          break;
      }
    }
  }

  /**
   * Handle player-enemy collision
   */
  handlePlayerEnemyCollision(collision, gameState) {
    const player = collision.entityA;
    const enemy = collision.entityB;

    // Damage both
    player.takeDamage(10);
    enemy.takeDamage(20);

    // Push apart
    this.separateEntities(player, enemy);

    if (this.onCollision) {
      this.onCollision('player-enemy', player, enemy);
    }
  }

  /**
   * Handle player-explosion collision
   */
  handlePlayerExplosionCollision(collision, gameState) {
    const player = collision.entityA;
    const bomb = collision.entityB;

    if (bomb.owner !== player) {
      player.takeDamage(bomb.damage);

      if (this.onCollision) {
        this.onCollision('player-explosion', player, bomb);
      }
    }
  }

  /**
   * Handle player-missile collision
   */
  handlePlayerMissileCollision(collision, gameState) {
    const player = collision.entityA;
    const missile = collision.entityB;

    player.takeDamage(missile.damage);
    missile.explode();

    if (this.onCollision) {
      this.onCollision('player-missile', player, missile);
    }
  }

  /**
   * Handle player-powerup collision
   */
  handlePlayerPowerupCollision(collision, gameState) {
    const player = collision.entityA;
    const powerup = collision.entityB;

    player.collectPowerUp(powerup.powerUpType);
    powerup.active = false;

    if (this.onCollision) {
      this.onCollision('player-powerup', player, powerup);
    }
  }

  /**
   * Handle enemy-explosion collision
   */
  handleEnemyExplosionCollision(collision, gameState) {
    const enemy = collision.entityA;
    const bomb = collision.entityB;

    const wasAlive = enemy.health > 0;
    enemy.takeDamage(bomb.damage);

    if (wasAlive && enemy.health <= 0) {
      // Enemy was killed by explosion
      if (gameState && gameState.player) {
        gameState.player.addScore(enemy.scoreValue);
        gameState.player.enemiesDefeated++;
      }
    }

    if (this.onCollision) {
      this.onCollision('enemy-explosion', enemy, bomb);
    }
  }

  /**
   * Handle enemy-missile collision
   */
  handleEnemyMissileCollision(collision, gameState) {
    const enemy = collision.entityA;
    const missile = collision.entityB;

    const wasAlive = enemy.health > 0;
    enemy.takeDamage(missile.damage);
    missile.explode();

    if (wasAlive && enemy.health <= 0) {
      // Enemy was killed by missile
      if (gameState && gameState.player) {
        gameState.player.addScore(enemy.scoreValue);
        gameState.player.enemiesDefeated++;
      }
    }

    if (this.onCollision) {
      this.onCollision('enemy-missile', enemy, missile);
    }
  }

  /**
   * Check circle-based collision
   */
  checkCircleCollision(entityA, entityB) {
    if (!entityA.collidable || !entityB.collidable) return false;

    const dx = entityB.position.x - entityA.position.x;
    const dy = entityB.position.y - entityA.position.y;
    const distSq = dx * dx + dy * dy;
    const radiusSum = entityA.collisionRadius + entityB.collisionRadius;

    return distSq < radiusSum * radiusSum;
  }

  /**
   * Check AABB collision
   */
  checkAABBCollision(entityA, entityB) {
    const a = entityA.getBounds();
    const b = entityB.getBounds();

    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Separate two colliding entities
   */
  separateEntities(entityA, entityB) {
    const dx = entityB.position.x - entityA.position.x;
    const dy = entityB.position.y - entityA.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist === 0) {
      // Entities at same position, push in random direction
      const angle = Math.random() * Math.PI * 2;
      entityA.position.x -= Math.cos(angle) * 10;
      entityA.position.y -= Math.sin(angle) * 10;
      return;
    }

    const overlap = (entityA.collisionRadius + entityB.collisionRadius) - dist;

    if (overlap > 0) {
      const nx = dx / dist;
      const ny = dy / dist;

      // Push apart equally
      entityA.position.x -= nx * overlap * 0.5;
      entityA.position.y -= ny * overlap * 0.5;
      entityB.position.x += nx * overlap * 0.5;
      entityB.position.y += ny * overlap * 0.5;
    }
  }

  /**
   * Get distance between two entities
   */
  getDistance(entityA, entityB) {
    const dx = entityB.position.x - entityA.position.x;
    const dy = entityB.position.y - entityA.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Find nearest entity in array to target
   */
  findNearest(target, entities) {
    let nearest = null;
    let nearestDist = Infinity;

    for (const entity of entities) {
      if (!entity.active || entity === target) continue;

      const dist = this.getDistance(target, entity);
      if (dist < nearestDist) {
        nearest = entity;
        nearestDist = dist;
      }
    }

    return { entity: nearest, distance: nearestDist };
  }

  /**
   * Find all entities within radius
   */
  findInRadius(center, entities, radius) {
    const result = [];
    const radiusSq = radius * radius;

    for (const entity of entities) {
      if (!entity.active) continue;

      const dx = entity.position.x - center.x;
      const dy = entity.position.y - center.y;
      const distSq = dx * dx + dy * dy;

      if (distSq <= radiusSq) {
        result.push({
          entity,
          distance: Math.sqrt(distSq)
        });
      }
    }

    return result;
  }
}

export default CollisionSystem;
