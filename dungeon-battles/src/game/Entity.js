/**
 * Entity - Base class for all game objects
 * Provides common properties and methods
 */
export class Entity {
  constructor(x, y, width, height, type) {
    this.id = 0; // Will be set by EntityManager
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = { x: 0, y: 0 };
    this.acceleration = null;
    this.alive = true;
    this.zIndex = 0; // Render order (higher = drawn later)
  }

  /**
   * Update entity (override in subclasses)
   */
  update(deltaTime) {
    // Override in subclasses
  }

  /**
   * Render entity (override in subclasses)
   */
  render(ctx) {
    // Override in subclasses
  }

  /**
   * Destroy the entity
   */
  destroy() {
    this.alive = false;
  }

  /**
   * Get bounding box for collision detection
   */
  getBounds() {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    return {
      left: this.x - halfWidth,
      right: this.x + halfWidth,
      top: this.y - halfHeight,
      bottom: this.y + halfHeight
    };
  }

  /**
   * Check if point is inside entity
   */
  containsPoint(x, y) {
    const bounds = this.getBounds();
    return (
      x >= bounds.left &&
      x <= bounds.right &&
      y >= bounds.top &&
      y <= bounds.bottom
    );
  }

  /**
   * Get distance to another entity
   */
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Get angle to another entity
   */
  angleTo(other) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }

  /**
   * Move towards a position
   */
  moveTowards(x, y, speed) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.velocity.x = (dx / distance) * speed;
      this.velocity.y = (dy / distance) * speed;
    }
  }

  /**
   * Reset entity to initial state (for object pooling)
   */
  reset() {
    this.alive = false;
    this.velocity.x = 0;
    this.velocity.y = 0;
    if (this.acceleration) {
      this.acceleration.x = 0;
      this.acceleration.y = 0;
    }
  }
}
