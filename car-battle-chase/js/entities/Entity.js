/**
 * Entity.js - Base Entity Class
 * Foundation for all game objects
 */

import { Vector2 } from '../utils/Vector2.js';

export class Entity {
  constructor(x = 0, y = 0) {
    this.id = null;
    this.type = 'entity';
    this.active = true;
    this.visible = true;
    this.zIndex = 0;

    // Transform
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.rotation = 0; // Radians

    // Dimensions
    this.width = 32;
    this.height = 32;

    // Collision
    this.collidable = true;
    this.collisionRadius = 16;

    // Visual
    this.sprite = null;
    this.color = '#FFFFFF';
    this.alpha = 1;

    // Internal
    this._group = null;
  }

  /**
   * Update entity state
   * @param {number} deltaTime - Time since last update
   */
  update(deltaTime) {
    // Apply velocity
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }

  /**
   * Render entity
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  render(ctx) {
    if (!this.visible) return;

    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    if (this.sprite) {
      ctx.drawImage(
        this.sprite,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    } else {
      // Fallback: draw colored rectangle
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    ctx.restore();
  }

  /**
   * Get bounding box
   * @returns {Object} { x, y, width, height }
   */
  getBounds() {
    return {
      x: this.position.x - this.width / 2,
      y: this.position.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }

  /**
   * Get center position
   * @returns {Vector2} Center position
   */
  getCenter() {
    return this.position.clone();
  }

  /**
   * Check AABB collision with another entity
   * @param {Entity} other - Other entity
   * @returns {boolean} True if colliding
   */
  intersects(other) {
    const a = this.getBounds();
    const b = other.getBounds();

    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Check circle collision with another entity
   * @param {Entity} other - Other entity
   * @returns {boolean} True if colliding
   */
  intersectsCircle(other) {
    const dx = this.position.x - other.position.x;
    const dy = this.position.y - other.position.y;
    const distSq = dx * dx + dy * dy;
    const radiusSum = this.collisionRadius + other.collisionRadius;
    return distSq < radiusSum * radiusSum;
  }

  /**
   * Check if point is inside entity
   * @param {number} x - X position
   * @param {number} y - Y position
   * @returns {boolean} True if point is inside
   */
  containsPoint(x, y) {
    const bounds = this.getBounds();
    return (
      x >= bounds.x &&
      x <= bounds.x + bounds.width &&
      y >= bounds.y &&
      y <= bounds.y + bounds.height
    );
  }

  /**
   * Get distance to another entity
   * @param {Entity} other - Other entity
   * @returns {number} Distance
   */
  distanceTo(other) {
    return this.position.dist(other.position);
  }

  /**
   * Get angle to another entity
   * @param {Entity} other - Other entity
   * @returns {number} Angle in radians
   */
  angleTo(other) {
    const dx = other.position.x - this.position.x;
    const dy = other.position.y - this.position.y;
    return Math.atan2(dy, dx);
  }

  /**
   * Look at another entity
   * @param {Entity} other - Other entity
   */
  lookAt(other) {
    this.rotation = this.angleTo(other);
  }

  /**
   * Move towards a point
   * @param {number} x - Target X
   * @param {number} y - Target Y
   * @param {number} speed - Movement speed
   */
  moveTowards(x, y, speed) {
    const dx = x - this.position.x;
    const dy = y - this.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      this.velocity.x = (dx / dist) * speed;
      this.velocity.y = (dy / dist) * speed;
    }
  }

  /**
   * Apply force to entity
   * @param {number} fx - Force X
   * @param {number} fy - Force Y
   */
  applyForce(fx, fy) {
    this.velocity.x += fx;
    this.velocity.y += fy;
  }

  /**
   * Reset entity to initial state
   */
  reset() {
    this.active = true;
    this.visible = true;
    this.position.set(0, 0);
    this.velocity.set(0, 0);
    this.rotation = 0;
    this.alpha = 1;
  }

  /**
   * Destroy entity
   */
  destroy() {
    this.active = false;
  }

  /**
   * Clone entity
   * @returns {Entity} Cloned entity
   */
  clone() {
    const cloned = new Entity(this.position.x, this.position.y);
    cloned.velocity = this.velocity.clone();
    cloned.rotation = this.rotation;
    cloned.width = this.width;
    cloned.height = this.height;
    cloned.type = this.type;
    cloned.sprite = this.sprite;
    cloned.color = this.color;
    return cloned;
  }
}

export default Entity;
