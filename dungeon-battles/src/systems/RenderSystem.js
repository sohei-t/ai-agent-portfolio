/**
 * RenderSystem.js
 * High-performance rendering system with layer management
 *
 * Features:
 * - Layer-based rendering (background, game, effects, UI)
 * - Viewport culling for performance
 * - Offscreen canvas support
 * - 60 FPS target maintenance
 * - Debug rendering
 */

export class RenderSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true // Hint for better performance
    });

    this.width = canvas.width;
    this.height = canvas.height;

    // Rendering layers
    this.layers = {
      background: [],
      game: [],
      effects: [],
      ui: [],
      debug: []
    };

    // Viewport
    this.viewport = {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    };

    // Offscreen canvas for optimization
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    this.useOffscreen = false;

    // Performance tracking
    this.frameTime = 0;
    this.fps = 60;
    this.renderCalls = 0;

    // Debug mode
    this.debugMode = false;
  }

  /**
   * Initialize offscreen canvas
   */
  initializeOffscreenCanvas() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = this.width;
    this.offscreenCanvas.height = this.height;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', { alpha: false });
    this.useOffscreen = true;
  }

  /**
   * Set viewport position
   */
  setViewport(x, y) {
    this.viewport.x = x;
    this.viewport.y = y;
  }

  /**
   * Get viewport bounds
   */
  getViewportBounds() {
    return {
      left: this.viewport.x,
      right: this.viewport.x + this.viewport.width,
      top: this.viewport.y,
      bottom: this.viewport.y + this.viewport.height
    };
  }

  /**
   * Check if object is in viewport
   */
  isInViewport(x, y, width, height) {
    const bounds = this.getViewportBounds();

    return (
      x + width >= bounds.left &&
      x - width <= bounds.right &&
      y + height >= bounds.top &&
      y - height <= bounds.bottom
    );
  }

  /**
   * Add renderable to layer
   */
  addToLayer(layer, renderable) {
    if (!this.layers[layer]) {
      console.warn(`Layer not found: ${layer}`);
      return;
    }

    this.layers[layer].push(renderable);
  }

  /**
   * Remove renderable from layer
   */
  removeFromLayer(layer, renderable) {
    if (!this.layers[layer]) {
      return;
    }

    const index = this.layers[layer].indexOf(renderable);
    if (index !== -1) {
      this.layers[layer].splice(index, 1);
    }
  }

  /**
   * Clear layer
   */
  clearLayer(layer) {
    if (this.layers[layer]) {
      this.layers[layer] = [];
    }
  }

  /**
   * Clear all layers
   */
  clearAllLayers() {
    for (const layer in this.layers) {
      this.layers[layer] = [];
    }
  }

  /**
   * Begin rendering frame
   */
  begin() {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.width, this.height);

    // Reset render calls
    this.renderCalls = 0;

    // Save context state
    ctx.save();

    // Apply viewport transform
    ctx.translate(-this.viewport.x, -this.viewport.y);
  }

  /**
   * Render all layers
   */
  renderAllLayers() {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    // Render in layer order
    const layerOrder = ['background', 'game', 'effects', 'ui', 'debug'];

    for (const layerName of layerOrder) {
      this.renderLayer(layerName, ctx);
    }
  }

  /**
   * Render specific layer
   */
  renderLayer(layerName, ctx) {
    const layer = this.layers[layerName];

    if (!layer || layer.length === 0) {
      return;
    }

    for (const renderable of layer) {
      // Skip if outside viewport (except UI layer)
      if (layerName !== 'ui' && layerName !== 'debug') {
        if (renderable.x !== undefined && renderable.y !== undefined) {
          const width = renderable.width || renderable.size || 32;
          const height = renderable.height || renderable.size || 32;

          if (!this.isInViewport(renderable.x, renderable.y, width, height)) {
            continue;
          }
        }
      }

      // Call render method
      if (typeof renderable.render === 'function') {
        renderable.render(ctx);
        this.renderCalls++;
      } else if (typeof renderable === 'function') {
        renderable(ctx);
        this.renderCalls++;
      }
    }
  }

  /**
   * End rendering frame
   */
  end() {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    // Restore context state
    ctx.restore();

    // Copy offscreen to main canvas if using offscreen
    if (this.useOffscreen) {
      this.ctx.drawImage(this.offscreenCanvas, 0, 0);
    }
  }

  /**
   * Render complete frame
   */
  render() {
    const startTime = performance.now();

    this.begin();
    this.renderAllLayers();
    this.end();

    this.frameTime = performance.now() - startTime;
    this.fps = 1000 / this.frameTime;
  }

  /**
   * Draw sprite
   */
  drawSprite(sprite, x, y, options = {}) {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    if (!sprite || !sprite.canvas) {
      return;
    }

    ctx.save();

    // Apply alpha
    if (options.alpha !== undefined) {
      ctx.globalAlpha = options.alpha;
    }

    // Calculate dimensions
    const width = options.width || sprite.width;
    const height = options.height || sprite.height;

    // Apply rotation
    if (options.rotation) {
      ctx.translate(x, y);
      ctx.rotate(options.rotation);
      ctx.drawImage(sprite.canvas, -width / 2, -height / 2, width, height);
    } else {
      ctx.drawImage(sprite.canvas, x - width / 2, y - height / 2, width, height);
    }

    ctx.restore();
  }

  /**
   * Draw text
   */
  drawText(text, x, y, options = {}) {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    ctx.save();

    ctx.font = options.font || '16px Arial';
    ctx.fillStyle = options.color || '#FFFFFF';
    ctx.textAlign = options.align || 'left';
    ctx.textBaseline = options.baseline || 'top';

    if (options.stroke) {
      ctx.strokeStyle = options.strokeColor || '#000000';
      ctx.lineWidth = options.strokeWidth || 2;
      ctx.strokeText(text, x, y);
    }

    ctx.fillText(text, x, y);

    ctx.restore();
  }

  /**
   * Draw rectangle
   */
  drawRect(x, y, width, height, color, options = {}) {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    ctx.save();

    if (options.alpha !== undefined) {
      ctx.globalAlpha = options.alpha;
    }

    if (options.fill !== false) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }

    if (options.stroke) {
      ctx.strokeStyle = options.strokeColor || '#FFFFFF';
      ctx.lineWidth = options.strokeWidth || 1;
      ctx.strokeRect(x, y, width, height);
    }

    ctx.restore();
  }

  /**
   * Draw circle
   */
  drawCircle(x, y, radius, color, options = {}) {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    ctx.save();

    if (options.alpha !== undefined) {
      ctx.globalAlpha = options.alpha;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    if (options.fill !== false) {
      ctx.fillStyle = color;
      ctx.fill();
    }

    if (options.stroke) {
      ctx.strokeStyle = options.strokeColor || '#FFFFFF';
      ctx.lineWidth = options.strokeWidth || 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw line
   */
  drawLine(x1, y1, x2, y2, color, options = {}) {
    const ctx = this.useOffscreen ? this.offscreenCtx : this.ctx;

    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = options.width || 1;

    if (options.alpha !== undefined) {
      ctx.globalAlpha = options.alpha;
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Enable debug mode
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  /**
   * Draw debug info
   */
  renderDebugInfo() {
    if (!this.debugMode) {
      return;
    }

    this.drawText(`FPS: ${Math.round(this.fps)}`, 10, 10, {
      color: '#00FF00',
      stroke: true
    });

    this.drawText(`Frame Time: ${this.frameTime.toFixed(2)}ms`, 10, 30, {
      color: '#00FF00',
      stroke: true
    });

    this.drawText(`Render Calls: ${this.renderCalls}`, 10, 50, {
      color: '#00FF00',
      stroke: true
    });

    const bounds = this.getViewportBounds();
    this.drawText(
      `Viewport: ${Math.round(bounds.left)}, ${Math.round(bounds.top)}`,
      10,
      70,
      { color: '#00FF00', stroke: true }
    );
  }

  /**
   * Resize canvas
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.viewport.width = width;
    this.viewport.height = height;

    if (this.useOffscreen) {
      this.offscreenCanvas.width = width;
      this.offscreenCanvas.height = height;
    }
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      fps: Math.round(this.fps),
      frameTime: this.frameTime,
      renderCalls: this.renderCalls,
      layerCounts: {
        background: this.layers.background.length,
        game: this.layers.game.length,
        effects: this.layers.effects.length,
        ui: this.layers.ui.length,
        debug: this.layers.debug.length
      }
    };
  }
}
