/**
 * Renderer - Main rendering engine for the game
 */
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    // Background
    this.backgroundY1 = 0;
    this.backgroundY2 = -this.height;
    this.backgroundSpeed = 50;
  }

  /**
   * Clear the canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Render scrolling background
   */
  renderBackground(deltaTime) {
    // Move background
    this.backgroundY1 += this.backgroundSpeed * deltaTime;
    this.backgroundY2 += this.backgroundSpeed * deltaTime;

    // Reset when off screen
    if (this.backgroundY1 >= this.height) {
      this.backgroundY1 = this.backgroundY2 - this.height;
    }
    if (this.backgroundY2 >= this.height) {
      this.backgroundY2 = this.backgroundY1 - this.height;
    }

    // Draw background
    this.drawStarfield(this.backgroundY1);
    this.drawStarfield(this.backgroundY2);
  }

  /**
   * Draw starfield background
   */
  drawStarfield(offsetY) {
    this.ctx.fillStyle = '#000814';
    this.ctx.fillRect(0, offsetY, this.width, this.height);

    // Draw stars
    const starCount = 100;
    this.ctx.fillStyle = '#FFFFFF';

    for (let i = 0; i < starCount; i++) {
      const x = (i * 73) % this.width; // Pseudo-random X
      const y = ((i * 131) % this.height + offsetY) % this.height;
      const size = (i % 3) + 1;

      this.ctx.globalAlpha = 0.3 + (i % 5) * 0.15;
      this.ctx.fillRect(x, y, size, size);
    }

    this.ctx.globalAlpha = 1.0;
  }

  /**
   * Render all entities
   */
  renderEntities(entities) {
    for (const entity of entities) {
      if (entity.active) {
        entity.render(this.ctx);
      }
    }
  }

  /**
   * Render particle effect
   */
  renderExplosion(x, y, radius, color = '#FF6600') {
    this.ctx.save();

    this.ctx.fillStyle = color;
    this.ctx.shadowBlur = 20;
    this.ctx.shadowColor = color;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  /**
   * Render text with shadow
   */
  renderText(text, x, y, size = 20, color = '#FFFFFF', align = 'left') {
    this.ctx.save();

    this.ctx.font = `${size}px 'Courier New', monospace`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'top';

    // Shadow
    this.ctx.shadowBlur = 5;
    this.ctx.shadowColor = '#000000';
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;

    this.ctx.fillText(text, x, y);

    this.ctx.restore();
  }

  /**
   * Render UI panel
   */
  renderPanel(x, y, width, height, fillColor = 'rgba(0, 0, 0, 0.7)', strokeColor = '#00b4d8') {
    this.ctx.save();

    this.ctx.fillStyle = fillColor;
    this.ctx.fillRect(x, y, width, height);

    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);

    this.ctx.restore();
  }

  /**
   * Render health bar
   */
  renderHealthBar(x, y, width, height, current, max) {
    const healthPercent = Math.max(0, current / max);

    // Background
    this.ctx.fillStyle = '#333333';
    this.ctx.fillRect(x, y, width, height);

    // Health
    const healthColor = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
    this.ctx.fillStyle = healthColor;
    this.ctx.fillRect(x, y, width * healthPercent, height);

    // Border
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
  }

  /**
   * Get context
   */
  getContext() {
    return this.ctx;
  }

  /**
   * Resize canvas
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
