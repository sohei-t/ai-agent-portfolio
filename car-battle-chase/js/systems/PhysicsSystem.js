/**
 * PhysicsSystem.js - Physics and Movement System
 * Handles physics updates, boundary checking, and movement
 */

export class PhysicsSystem {
  constructor(worldWidth, worldHeight) {
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    // World boundaries with padding
    this.boundaryPadding = 50;

    // Physics settings
    this.globalFriction = 0.98;
    this.bounceRestitution = 0.5;
  }

  /**
   * Update entity physics
   */
  update(entities, deltaTime) {
    for (const entity of entities) {
      if (!entity.active) continue;

      // Apply velocity
      entity.position.x += entity.velocity.x * deltaTime;
      entity.position.y += entity.velocity.y * deltaTime;

      // Check world boundaries
      this.checkBoundaries(entity);
    }
  }

  /**
   * Check and handle world boundary collisions
   */
  checkBoundaries(entity) {
    const padding = this.boundaryPadding;
    const halfWidth = entity.width / 2;
    const halfHeight = entity.height / 2;

    // Left boundary
    if (entity.position.x - halfWidth < padding) {
      entity.position.x = padding + halfWidth;
      entity.velocity.x *= -this.bounceRestitution;
    }

    // Right boundary
    if (entity.position.x + halfWidth > this.worldWidth - padding) {
      entity.position.x = this.worldWidth - padding - halfWidth;
      entity.velocity.x *= -this.bounceRestitution;
    }

    // Top boundary
    if (entity.position.y - halfHeight < padding) {
      entity.position.y = padding + halfHeight;
      entity.velocity.y *= -this.bounceRestitution;
    }

    // Bottom boundary
    if (entity.position.y + halfHeight > this.worldHeight - padding) {
      entity.position.y = this.worldHeight - padding - halfHeight;
      entity.velocity.y *= -this.bounceRestitution;
    }
  }

  /**
   * Check if position is within world bounds
   */
  isInBounds(x, y, margin = 0) {
    return (
      x >= margin &&
      x <= this.worldWidth - margin &&
      y >= margin &&
      y <= this.worldHeight - margin
    );
  }

  /**
   * Wrap position around world (for projectiles/entities that should wrap)
   */
  wrapPosition(entity) {
    if (entity.position.x < 0) {
      entity.position.x = this.worldWidth;
    } else if (entity.position.x > this.worldWidth) {
      entity.position.x = 0;
    }

    if (entity.position.y < 0) {
      entity.position.y = this.worldHeight;
    } else if (entity.position.y > this.worldHeight) {
      entity.position.y = 0;
    }
  }

  /**
   * Get random position within world bounds
   */
  getRandomPosition(margin = 100) {
    return {
      x: margin + Math.random() * (this.worldWidth - margin * 2),
      y: margin + Math.random() * (this.worldHeight - margin * 2)
    };
  }

  /**
   * Get random position away from a point
   */
  getRandomPositionAwayFrom(x, y, minDistance, margin = 100) {
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const pos = this.getRandomPosition(margin);
      const dx = pos.x - x;
      const dy = pos.y - y;
      const distSq = dx * dx + dy * dy;

      if (distSq >= minDistance * minDistance) {
        return pos;
      }

      attempts++;
    }

    // Fallback: return any random position
    return this.getRandomPosition(margin);
  }

  /**
   * Apply separation force between entities
   */
  applySeparation(entityA, entityB, strength = 100) {
    const dx = entityB.position.x - entityA.position.x;
    const dy = entityB.position.y - entityA.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0 && dist < entityA.collisionRadius + entityB.collisionRadius) {
      const overlap = (entityA.collisionRadius + entityB.collisionRadius) - dist;
      const nx = dx / dist;
      const ny = dy / dist;

      // Push entities apart
      const pushX = nx * overlap * 0.5;
      const pushY = ny * overlap * 0.5;

      entityA.position.x -= pushX;
      entityA.position.y -= pushY;
      entityB.position.x += pushX;
      entityB.position.y += pushY;

      // Apply velocity change
      entityA.velocity.x -= nx * strength;
      entityA.velocity.y -= ny * strength;
      entityB.velocity.x += nx * strength;
      entityB.velocity.y += ny * strength;
    }
  }

  /**
   * Set world size
   */
  setWorldSize(width, height) {
    this.worldWidth = width;
    this.worldHeight = height;
  }

  /**
   * Get world bounds
   */
  getWorldBounds() {
    return {
      left: this.boundaryPadding,
      top: this.boundaryPadding,
      right: this.worldWidth - this.boundaryPadding,
      bottom: this.worldHeight - this.boundaryPadding,
      width: this.worldWidth - this.boundaryPadding * 2,
      height: this.worldHeight - this.boundaryPadding * 2
    };
  }
}

export default PhysicsSystem;
