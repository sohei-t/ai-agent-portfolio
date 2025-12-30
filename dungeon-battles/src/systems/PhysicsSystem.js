/**
 * PhysicsSystem - Handles entity movement and boundary checking
 * Applies velocity and acceleration, enforces boundaries
 */
export class PhysicsSystem {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.gravity = 0; // Not used in this game, but available for future
    this.friction = 1.0; // No friction by default
  }

  /**
   * Initialize the physics system
   */
  init() {
    console.log('[PhysicsSystem] Initialized');
  }

  /**
   * Update all entities with physics
   */
  update(entities, deltaTime) {
    entities.forEach(entity => {
      if (entity.alive && entity.velocity) {
        this.applyVelocity(entity, deltaTime);
        this.checkBounds(entity);
      }
    });
  }

  /**
   * Apply velocity to entity position
   */
  applyVelocity(entity, deltaTime) {
    if (!entity.velocity) return;

    // Apply velocity
    entity.x += entity.velocity.x * deltaTime;
    entity.y += entity.velocity.y * deltaTime;

    // Apply friction if needed
    if (this.friction < 1.0) {
      entity.velocity.x *= this.friction;
      entity.velocity.y *= this.friction;
    }

    // Apply acceleration if exists
    if (entity.acceleration) {
      entity.velocity.x += entity.acceleration.x * deltaTime;
      entity.velocity.y += entity.acceleration.y * deltaTime;
    }
  }

  /**
   * Check if entity is within canvas bounds
   */
  checkBounds(entity) {
    const bounds = entity.getBounds();

    // Mark as dead if out of bounds (for bullets and enemies)
    if (entity.type === 'player-bullet' || entity.type === 'enemy-bullet' || entity.type === 'magic-bullet') {
      if (
        bounds.right < 0 ||
        bounds.left > this.canvasWidth ||
        bounds.bottom < 0 ||
        bounds.top > this.canvasHeight
      ) {
        entity.alive = false;
      }
    }

    // Constrain player within bounds
    if (entity.type === 'player' && entity.bounds) {
      if (entity.x < entity.bounds.minX) {
        entity.x = entity.bounds.minX;
        entity.velocity.x = 0;
      }
      if (entity.x > entity.bounds.maxX) {
        entity.x = entity.bounds.maxX;
        entity.velocity.x = 0;
      }
      if (entity.y < entity.bounds.minY) {
        entity.y = entity.bounds.minY;
        entity.velocity.y = 0;
      }
      if (entity.y > entity.bounds.maxY) {
        entity.y = entity.bounds.maxY;
        entity.velocity.y = 0;
      }
    }
  }

  /**
   * Check if entity is outside screen bounds
   */
  isOutOfBounds(entity) {
    const bounds = entity.getBounds();
    return (
      bounds.right < 0 ||
      bounds.left > this.canvasWidth ||
      bounds.bottom < 0 ||
      bounds.top > this.canvasHeight
    );
  }

  /**
   * Check if position is within canvas
   */
  isPositionInBounds(x, y) {
    return x >= 0 && x <= this.canvasWidth && y >= 0 && y <= this.canvasHeight;
  }

  /**
   * Clamp position to canvas bounds
   */
  clampPosition(x, y) {
    return {
      x: Math.max(0, Math.min(this.canvasWidth, x)),
      y: Math.max(0, Math.min(this.canvasHeight, y))
    };
  }

  /**
   * Set gravity (for future use)
   */
  setGravity(gravity) {
    this.gravity = gravity;
  }

  /**
   * Set friction (for future use)
   */
  setFriction(friction) {
    this.friction = Math.max(0, Math.min(1, friction));
  }
}
