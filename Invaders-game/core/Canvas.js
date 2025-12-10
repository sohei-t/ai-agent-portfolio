/**
 * Canvas.js
 * HTML5 Canvas management with 4:3 aspect ratio and responsive scaling
 */

class Canvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.logicalWidth = 800;
    this.logicalHeight = 600;
    this.scale = 1;

    // Bind resize handler
    this.handleResize = this.resize.bind(this);
  }

  /**
   * Initialize canvas with logical dimensions and responsive scaling
   */
  init() {
    // Set canvas internal resolution to logical size
    this.canvas.width = this.logicalWidth;
    this.canvas.height = this.logicalHeight;

    // Apply initial scaling
    this.resize();

    // Listen for window resize
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Calculate and apply responsive scaling
   * Maintains 4:3 aspect ratio and fits viewport (320-2560px)
   */
  resize() {
    const scaleX = window.innerWidth / this.logicalWidth;
    const scaleY = window.innerHeight / this.logicalHeight;

    // Use smaller scale to maintain aspect ratio
    this.scale = Math.min(scaleX, scaleY);

    // Apply CSS scaling
    this.canvas.style.width = `${this.logicalWidth * this.scale}px`;
    this.canvas.style.height = `${this.logicalHeight * this.scale}px`;
  }

  /**
   * Clear the entire canvas
   */
  clear() {
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
  }

  /**
   * Draw a filled rectangle
   */
  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  /**
   * Draw a filled circle
   */
  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Get the 2D rendering context
   */
  getContext() {
    return this.ctx;
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Canvas = Canvas;
}
