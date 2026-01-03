/**
 * RenderSystem.js - Rendering System
 * Handles all game rendering including camera, entities, and effects
 */

export class RenderSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Camera
    this.camera = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      smoothing: 0.1,
      shake: 0,
      shakeIntensity: 0
    };

    // Viewport
    this.viewportWidth = canvas.width;
    this.viewportHeight = canvas.height;

    // World
    this.worldWidth = 800;
    this.worldHeight = 600;

    // Background
    this.backgroundColor = '#1a1a2e';
    this.gridColor = 'rgba(255, 255, 255, 0.05)';
    this.gridSize = 50;

    // Effects
    this.screenFlash = 0;
    this.screenFlashColor = '#FFFFFF';

    // Debug
    this.debugMode = false;
  }

  /**
   * Set world size
   */
  setWorldSize(width, height) {
    this.worldWidth = width;
    this.worldHeight = height;
  }

  /**
   * Update camera to follow target
   */
  updateCamera(target, deltaTime) {
    if (target) {
      // Set camera target to center on entity
      this.camera.targetX = target.position.x - this.viewportWidth / 2;
      this.camera.targetY = target.position.y - this.viewportHeight / 2;
    }

    // Smooth camera movement
    this.camera.x += (this.camera.targetX - this.camera.x) * this.camera.smoothing;
    this.camera.y += (this.camera.targetY - this.camera.y) * this.camera.smoothing;

    // Clamp camera to world bounds
    this.camera.x = Math.max(0, Math.min(this.worldWidth - this.viewportWidth, this.camera.x));
    this.camera.y = Math.max(0, Math.min(this.worldHeight - this.viewportHeight, this.camera.y));

    // Update camera shake
    if (this.camera.shake > 0) {
      this.camera.shake -= deltaTime;
    }

    // Update screen flash
    if (this.screenFlash > 0) {
      this.screenFlash -= deltaTime * 5;
    }
  }

  /**
   * Apply camera shake
   */
  shake(intensity = 10, duration = 0.2) {
    this.camera.shakeIntensity = intensity;
    this.camera.shake = duration;
  }

  /**
   * Flash the screen
   */
  flash(color = '#FFFFFF', intensity = 1) {
    this.screenFlashColor = color;
    this.screenFlash = intensity;
  }

  /**
   * Begin frame rendering
   */
  beginFrame() {
    // Clear canvas
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Save context state
    this.ctx.save();

    // Apply camera transform
    let offsetX = -this.camera.x;
    let offsetY = -this.camera.y;

    // Apply shake
    if (this.camera.shake > 0) {
      offsetX += (Math.random() - 0.5) * this.camera.shakeIntensity;
      offsetY += (Math.random() - 0.5) * this.camera.shakeIntensity;
    }

    this.ctx.translate(offsetX, offsetY);
  }

  /**
   * End frame rendering
   */
  endFrame() {
    // Restore context state
    this.ctx.restore();

    // Draw screen flash
    if (this.screenFlash > 0) {
      this.ctx.fillStyle = this.screenFlashColor;
      this.ctx.globalAlpha = this.screenFlash * 0.5;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalAlpha = 1;
    }
  }

  /**
   * Render background grid
   */
  renderBackground() {
    this.ctx.strokeStyle = this.gridColor;
    this.ctx.lineWidth = 1;

    // Calculate visible grid area
    const startX = Math.floor(this.camera.x / this.gridSize) * this.gridSize;
    const startY = Math.floor(this.camera.y / this.gridSize) * this.gridSize;
    const endX = startX + this.viewportWidth + this.gridSize * 2;
    const endY = startY + this.viewportHeight + this.gridSize * 2;

    // Draw vertical lines
    for (let x = startX; x <= endX; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, startY);
      this.ctx.lineTo(x, endY);
      this.ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = startY; y <= endY; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(endX, y);
      this.ctx.stroke();
    }

    // Draw world boundary
    this.ctx.strokeStyle = 'rgba(255, 100, 100, 0.3)';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(0, 0, this.worldWidth, this.worldHeight);
  }

  /**
   * Render entity group
   */
  renderEntities(entities) {
    for (const entity of entities) {
      if (entity.active && entity.visible) {
        entity.render(this.ctx);
      }
    }
  }

  /**
   * Render single entity
   */
  renderEntity(entity) {
    if (entity && entity.active && entity.visible) {
      entity.render(this.ctx);
    }
  }

  /**
   * Render debug info for entities
   */
  renderDebug(entities) {
    if (!this.debugMode) return;

    this.ctx.strokeStyle = '#00FF00';
    this.ctx.lineWidth = 1;

    for (const entity of entities) {
      if (!entity.active) continue;

      // Draw collision circle
      this.ctx.beginPath();
      this.ctx.arc(
        entity.position.x,
        entity.position.y,
        entity.collisionRadius,
        0,
        Math.PI * 2
      );
      this.ctx.stroke();

      // Draw velocity vector
      this.ctx.strokeStyle = '#FF0000';
      this.ctx.beginPath();
      this.ctx.moveTo(entity.position.x, entity.position.y);
      this.ctx.lineTo(
        entity.position.x + entity.velocity.x * 0.5,
        entity.position.y + entity.velocity.y * 0.5
      );
      this.ctx.stroke();
      this.ctx.strokeStyle = '#00FF00';
    }
  }

  /**
   * Render particle effects
   */
  renderParticles(particles) {
    for (const particle of particles) {
      if (!particle.active) continue;

      this.ctx.save();
      this.ctx.globalAlpha = particle.alpha;
      this.ctx.fillStyle = particle.color;

      if (particle.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(
          particle.x - particle.size / 2,
          particle.y - particle.size / 2,
          particle.size,
          particle.size
        );
      }

      this.ctx.restore();
    }
  }

  /**
   * World to screen coordinates
   */
  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.camera.x,
      y: worldY - this.camera.y
    };
  }

  /**
   * Screen to world coordinates
   */
  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.camera.x,
      y: screenY + this.camera.y
    };
  }

  /**
   * Check if entity is visible on screen
   */
  isVisible(entity, margin = 100) {
    const screenPos = this.worldToScreen(entity.position.x, entity.position.y);
    return (
      screenPos.x >= -margin &&
      screenPos.x <= this.viewportWidth + margin &&
      screenPos.y >= -margin &&
      screenPos.y <= this.viewportHeight + margin
    );
  }

  /**
   * Resize viewport
   */
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.viewportWidth = width;
    this.viewportHeight = height;
  }

  /**
   * Toggle debug mode
   */
  toggleDebug() {
    this.debugMode = !this.debugMode;
  }

  /**
   * Get canvas context
   */
  getContext() {
    return this.ctx;
  }
}

export default RenderSystem;
