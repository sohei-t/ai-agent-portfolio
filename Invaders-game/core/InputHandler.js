/**
 * InputHandler.js
 * Unified keyboard and touch input handling with responsive support
 */

class InputHandler {
  constructor() {
    this.keys = {};
    this.touches = {};
    this.touchZoneMultiplier = 1.3; // 30% larger touch zones
  }

  /**
   * Initialize input handlers
   */
  init() {
    this.keys = {};
    this.touches = {};
    this.setupKeyboardListeners();
    this.setupTouchListeners();
  }

  /**
   * Setup keyboard event listeners
   */
  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      this.setKeyPressed(e.key, true);

      // Prevent default for game controls
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Escape'].includes(e.key)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.setKeyPressed(e.key, false);
    });
  }

  /**
   * Setup touch event listeners
   */
  setupTouchListeners() {
    window.addEventListener('touchstart', (e) => {
      e.preventDefault();
      Array.from(e.touches).forEach((touch, index) => {
        this.setTouch(index, touch.clientX, touch.clientY);
      });
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
      Array.from(e.touches).forEach((touch, index) => {
        this.setTouch(index, touch.clientX, touch.clientY);
      });
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      e.preventDefault();
      // Clear touches that ended
      const activeTouches = Array.from(e.touches).map((_, i) => i);
      Object.keys(this.touches).forEach(index => {
        if (!activeTouches.includes(parseInt(index))) {
          this.clearTouch(parseInt(index));
        }
      });
    }, { passive: false });

    window.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      this.touches = {};
    }, { passive: false });
  }

  /**
   * Check if a key is pressed
   * @param {string} key - Key to check
   * @returns {boolean}
   */
  isKeyPressed(key) {
    return this.keys[key] === true;
  }

  /**
   * Set key press state
   * @param {string} key - Key to set
   * @param {boolean} value - Press state
   */
  setKeyPressed(key, value) {
    this.keys[key] = value;
  }

  /**
   * Get touch position by index
   * @param {number} index - Touch index
   * @returns {object|null} Touch position {x, y} or null
   */
  getTouchPosition(index = 0) {
    return this.touches[index] || null;
  }

  /**
   * Set touch position
   * @param {number} index - Touch index
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  setTouch(index, x, y) {
    this.touches[index] = { x, y };
  }

  /**
   * Clear a touch by index
   * @param {number} index - Touch index
   */
  clearTouch(index) {
    delete this.touches[index];
  }

  /**
   * Check if moving left
   * @returns {boolean}
   */
  isMovingLeft() {
    return this.isKeyPressed('ArrowLeft') ||
           this.isKeyPressed('a') ||
           this.isKeyPressed('A');
  }

  /**
   * Check if moving right
   * @returns {boolean}
   */
  isMovingRight() {
    return this.isKeyPressed('ArrowRight') ||
           this.isKeyPressed('d') ||
           this.isKeyPressed('D');
  }

  /**
   * Check if shooting
   * @returns {boolean}
   */
  isShooting() {
    return this.isKeyPressed(' ') ||
           this.isKeyPressed('Spacebar') ||
           Object.keys(this.touches).length > 0;
  }

  /**
   * Movement helpers
   */
  isUp() {
    return this.keys['ArrowUp'] || this.keys['w'] || this.keys['W'];
  }

  isDown() {
    return this.keys['ArrowDown'] || this.keys['s'] || this.keys['S'];
  }

  isLeft() {
    return this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A'];
  }

  isRight() {
    return this.keys['ArrowRight'] || this.keys['d'] || this.keys['D'];
  }

  isSpace() {
    return this.keys[' '] || this.keys['Space'];
  }

  /**
   * Check if paused
   * @returns {boolean}
   */
  isPaused() {
    return this.isKeyPressed('p') ||
           this.isKeyPressed('P') ||
           this.isKeyPressed('Escape');
  }

  /**
   * Reset all input state
   */
  reset() {
    this.keys = {};
    this.touches = {};
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    // Note: In a real implementation, we'd store references to the handlers
    // and remove them here. For simplicity, this is a placeholder.
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.InputHandler = InputHandler;
}
