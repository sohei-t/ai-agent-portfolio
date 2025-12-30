/**
 * Camera.js - Camera system for vertical scrolling
 * Handles view management and smooth camera movement
 */

export class Camera {
  constructor(width, height, worldWidth, worldHeight) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    // Target following
    this.target = null;
    this.followSpeed = 0.1;
    this.offsetX = 0;
    this.offsetY = 0;

    // Screen shake
    this.shaking = false;
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.shakeTime = 0;
    this.shakeOffsetX = 0;
    this.shakeOffsetY = 0;

    // Auto-scroll
    this.autoScroll = false;
    this.scrollSpeed = 50; // pixels per second
  }

  /**
   * Set target to follow
   */
  follow(target, offsetX = 0, offsetY = 0) {
    this.target = target;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  /**
   * Stop following target
   */
  unfollow() {
    this.target = null;
  }

  /**
   * Enable auto-scroll (vertical scrolling shooter)
   */
  enableAutoScroll(speed = 50) {
    this.autoScroll = true;
    this.scrollSpeed = speed;
  }

  /**
   * Disable auto-scroll
   */
  disableAutoScroll() {
    this.autoScroll = false;
  }

  /**
   * Shake the camera
   */
  shake(intensity = 10, duration = 0.3) {
    this.shaking = true;
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
    this.shakeTime = 0;
  }

  /**
   * Update camera position
   */
  update(deltaTime) {
    // Auto-scroll
    if (this.autoScroll) {
      this.y += this.scrollSpeed * deltaTime;
    }

    // Follow target
    if (this.target) {
      const targetX = this.target.x - this.width / 2 + this.offsetX;
      const targetY = this.target.y - this.height / 2 + this.offsetY;

      // Smooth follow
      this.x += (targetX - this.x) * this.followSpeed;
      this.y += (targetY - this.y) * this.followSpeed;
    }

    // Clamp to world bounds
    this.x = Math.max(0, Math.min(this.x, this.worldWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, this.worldHeight - this.height));

    // Update shake
    if (this.shaking) {
      this.shakeTime += deltaTime;

      if (this.shakeTime >= this.shakeDuration) {
        this.shaking = false;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
      } else {
        // Random shake offset
        const intensity = this.shakeIntensity * (1 - this.shakeTime / this.shakeDuration);
        this.shakeOffsetX = (Math.random() - 0.5) * intensity * 2;
        this.shakeOffsetY = (Math.random() - 0.5) * intensity * 2;
      }
    }
  }

  /**
   * Get camera position with shake
   */
  getX() {
    return this.x + this.shakeOffsetX;
  }

  /**
   * Get camera Y position with shake
   */
  getY() {
    return this.y + this.shakeOffsetY;
  }

  /**
   * Convert world coordinates to screen coordinates
   */
  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.getX(),
      y: worldY - this.getY()
    };
  }

  /**
   * Convert screen coordinates to world coordinates
   */
  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.getX(),
      y: screenY + this.getY()
    };
  }

  /**
   * Check if point is in view
   */
  isInView(x, y, margin = 0) {
    const camX = this.getX();
    const camY = this.getY();

    return (
      x >= camX - margin &&
      x <= camX + this.width + margin &&
      y >= camY - margin &&
      y <= camY + this.height + margin
    );
  }

  /**
   * Check if rectangle is in view
   */
  isRectInView(x, y, width, height, margin = 0) {
    const camX = this.getX();
    const camY = this.getY();

    return (
      x + width >= camX - margin &&
      x - width <= camX + this.width + margin &&
      y + height >= camY - margin &&
      y - height <= camY + this.height + margin
    );
  }

  /**
   * Set camera position directly
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Reset camera
   */
  reset() {
    this.x = 0;
    this.y = 0;
    this.target = null;
    this.shaking = false;
    this.shakeOffsetX = 0;
    this.shakeOffsetY = 0;
  }

  /**
   * Apply camera transform to context
   */
  applyTransform(ctx) {
    ctx.translate(-this.getX(), -this.getY());
  }

  /**
   * Get camera bounds
   */
  getBounds() {
    const camX = this.getX();
    const camY = this.getY();

    return {
      left: camX,
      right: camX + this.width,
      top: camY,
      bottom: camY + this.height
    };
  }
}
