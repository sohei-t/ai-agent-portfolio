/**
 * Entity - Base class for all game objects
 */
import { Vector2D } from '../utils/Vector2D.js';

let entityIdCounter = 0;

export class Entity {
  constructor(x, y, width, height) {
    this.id = entityIdCounter++;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = new Vector2D(0, 0);
    this.active = true;
    this.type = 'entity';
  }

  /**
   * Update entity (override in subclasses)
   */
  update(deltaTime) {
    // Default: apply velocity
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
  }

  /**
   * Render entity (override in subclasses)
   */
  render(ctx) {
    // Default: draw rectangle
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Get bounding box for collision detection
   */
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  /**
   * Get center position
   */
  getCenter() {
    return new Vector2D(
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  /**
   * Check if entity is on screen
   */
  isOnScreen(screenWidth, screenHeight, padding = 50) {
    return (
      this.x + this.width > -padding &&
      this.x < screenWidth + padding &&
      this.y + this.height > -padding &&
      this.y < screenHeight + padding
    );
  }

  /**
   * Deactivate entity
   */
  destroy() {
    this.active = false;
  }

  /**
   * Set position
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Set velocity
   */
  setVelocity(vx, vy) {
    this.velocity.set(vx, vy);
  }
}
