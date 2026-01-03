/**
 * KeyboardInput.js - Keyboard Input Handler
 * Handles keyboard input for desktop play
 */

export class KeyboardInput {
  constructor() {
    // Key states
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      w: false,
      a: false,
      s: false,
      d: false,
      space: false,
      x: false,
      escape: false,
      enter: false
    };

    // Callbacks
    this.onPause = null;

    // Bind event handlers
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // Add event listeners
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  /**
   * Handle key down event
   */
  handleKeyDown(e) {
    const key = e.key.toLowerCase();

    switch (key) {
      case 'arrowup':
        this.keys.up = true;
        e.preventDefault();
        break;
      case 'arrowdown':
        this.keys.down = true;
        e.preventDefault();
        break;
      case 'arrowleft':
        this.keys.left = true;
        e.preventDefault();
        break;
      case 'arrowright':
        this.keys.right = true;
        e.preventDefault();
        break;
      case 'w':
        this.keys.w = true;
        break;
      case 'a':
        this.keys.a = true;
        break;
      case 's':
        this.keys.s = true;
        break;
      case 'd':
        this.keys.d = true;
        break;
      case ' ':
        this.keys.space = true;
        e.preventDefault();
        break;
      case 'x':
        this.keys.x = true;
        break;
      case 'escape':
        this.keys.escape = true;
        if (this.onPause) this.onPause();
        break;
      case 'enter':
        this.keys.enter = true;
        break;
    }
  }

  /**
   * Handle key up event
   */
  handleKeyUp(e) {
    const key = e.key.toLowerCase();

    switch (key) {
      case 'arrowup':
        this.keys.up = false;
        break;
      case 'arrowdown':
        this.keys.down = false;
        break;
      case 'arrowleft':
        this.keys.left = false;
        break;
      case 'arrowright':
        this.keys.right = false;
        break;
      case 'w':
        this.keys.w = false;
        break;
      case 'a':
        this.keys.a = false;
        break;
      case 's':
        this.keys.s = false;
        break;
      case 'd':
        this.keys.d = false;
        break;
      case ' ':
        this.keys.space = false;
        break;
      case 'x':
        this.keys.x = false;
        break;
      case 'escape':
        this.keys.escape = false;
        break;
      case 'enter':
        this.keys.enter = false;
        break;
    }
  }

  /**
   * Get current key states
   */
  getState() {
    return { ...this.keys };
  }

  /**
   * Check if any movement key is pressed
   */
  hasMovement() {
    return (
      this.keys.up || this.keys.down || this.keys.left || this.keys.right ||
      this.keys.w || this.keys.a || this.keys.s || this.keys.d
    );
  }

  /**
   * Check if specific key is pressed
   */
  isPressed(keyName) {
    return this.keys[keyName] || false;
  }

  /**
   * Reset all key states
   */
  reset() {
    for (const key in this.keys) {
      this.keys[key] = false;
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}

export default KeyboardInput;
