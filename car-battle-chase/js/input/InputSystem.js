/**
 * InputSystem.js - Unified Input Management
 * Integrates keyboard, touch (virtual joystick), and gyro controls
 * Follows GYRO_CONTROLS_STANDARD.md v2.0
 */

import { Vector2 } from '../utils/Vector2.js';
import { KeyboardInput } from './KeyboardInput.js';
import { VirtualJoystick } from './VirtualJoystick.js';
import { GyroControls } from './GyroControls.js';
import { TouchButtons } from './TouchButtons.js';

// Input modes
export const InputMode = {
  KEYBOARD: 'keyboard',
  JOYSTICK: 'joystick',
  GYRO: 'gyro'
};

export class InputSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.currentMode = InputMode.JOYSTICK; // Default to joystick

    // Input sources
    this.keyboard = new KeyboardInput();
    this.joystick = new VirtualJoystick(canvas);
    this.gyro = new GyroControls();
    this.touchButtons = new TouchButtons(canvas);

    // Normalized movement vector (-1 to 1)
    this.movement = new Vector2(0, 0);

    // Action states
    this.actions = {
      bomb: false,
      missile: false,
      pause: false
    };

    // Action callbacks
    this.onBomb = null;
    this.onMissile = null;
    this.onPause = null;

    // Mode switching
    this.modeChangeCallback = null;

    // Setup event listeners
    this.setupEventListeners();

    // Auto-detect best input mode
    this.detectInputMode();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Touch button callbacks
    this.touchButtons.onBomb = () => {
      if (this.onBomb) this.onBomb();
    };

    this.touchButtons.onMissile = () => {
      if (this.onMissile) this.onMissile();
    };

    // Keyboard pause
    this.keyboard.onPause = () => {
      if (this.onPause) this.onPause();
    };

    // Gyro state change
    this.gyro.onStateChange = (state) => {
      console.log('Gyro state:', state);
    };
  }

  /**
   * Detect best input mode for device
   */
  detectInputMode() {
    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry/i.test(navigator.userAgent);
    const hasTouch = 'ontouchstart' in window;

    if (isMobile || hasTouch) {
      this.currentMode = InputMode.JOYSTICK;
    } else {
      this.currentMode = InputMode.KEYBOARD;
    }

    console.log('Detected input mode:', this.currentMode);
  }

  /**
   * Request gyro permission (iOS 18+ requirement)
   * Must be called from user gesture (click/touchend)
   */
  async requestGyroPermission() {
    const result = await this.gyro.requestPermission();
    if (result) {
      this.setMode(InputMode.GYRO);
    }
    return result;
  }

  /**
   * Set input mode
   */
  setMode(mode) {
    const previousMode = this.currentMode;
    this.currentMode = mode;

    // Update visibility of controls
    if (mode === InputMode.JOYSTICK) {
      this.joystick.show();
    } else {
      this.joystick.hide();
    }

    if (mode === InputMode.GYRO) {
      this.gyro.enable();
    } else {
      this.gyro.disable();
    }

    if (this.modeChangeCallback) {
      this.modeChangeCallback(mode, previousMode);
    }

    console.log('Input mode changed:', previousMode, '->', mode);
  }

  /**
   * Toggle between joystick and gyro
   */
  toggleTouchMode() {
    if (this.currentMode === InputMode.JOYSTICK) {
      this.requestGyroPermission();
    } else if (this.currentMode === InputMode.GYRO) {
      this.setMode(InputMode.JOYSTICK);
    }
  }

  /**
   * Update input state
   */
  update(deltaTime) {
    // Reset movement
    this.movement.set(0, 0);

    // Get movement based on current mode
    switch (this.currentMode) {
      case InputMode.KEYBOARD:
        this.updateKeyboard();
        break;

      case InputMode.JOYSTICK:
        this.updateJoystick();
        break;

      case InputMode.GYRO:
        this.updateGyro();
        break;
    }

    // Update touch buttons (always active on mobile)
    this.touchButtons.update(deltaTime);

    // Check keyboard actions (always active)
    this.updateKeyboardActions();
  }

  /**
   * Update keyboard input
   */
  updateKeyboard() {
    const keys = this.keyboard.getState();

    if (keys.up || keys.w) this.movement.y = -1;
    if (keys.down || keys.s) this.movement.y = 1;
    if (keys.left || keys.a) this.movement.x = -1;
    if (keys.right || keys.d) this.movement.x = 1;

    // Normalize diagonal movement
    if (this.movement.magSq() > 1) {
      this.movement.normalize();
    }
  }

  /**
   * Update joystick input
   */
  updateJoystick() {
    const joystickInput = this.joystick.getInput();
    this.movement.set(joystickInput.x, joystickInput.y);
  }

  /**
   * Update gyro input
   */
  updateGyro() {
    if (!this.gyro.isActive()) {
      // Fallback to joystick if gyro not available
      this.updateJoystick();
      return;
    }

    const gyroInput = this.gyro.getInput();
    this.movement.set(gyroInput.x, gyroInput.y);
  }

  /**
   * Update keyboard action keys
   */
  updateKeyboardActions() {
    const keys = this.keyboard.getState();

    // Check for bomb (space or z)
    if (keys.space && !this.actions.bomb) {
      this.actions.bomb = true;
      if (this.onBomb) this.onBomb();
    } else if (!keys.space) {
      this.actions.bomb = false;
    }

    // Check for missile (x)
    if (keys.x && !this.actions.missile) {
      this.actions.missile = true;
      if (this.onMissile) this.onMissile();
    } else if (!keys.x) {
      this.actions.missile = false;
    }
  }

  /**
   * Get current movement vector
   */
  getMovement() {
    return this.movement.clone();
  }

  /**
   * Get movement X
   */
  getMovementX() {
    return this.movement.x;
  }

  /**
   * Get movement Y
   */
  getMovementY() {
    return this.movement.y;
  }

  /**
   * Check if there's any movement input
   */
  hasMovement() {
    return this.movement.magSq() > 0.01;
  }

  /**
   * Get current input mode
   */
  getMode() {
    return this.currentMode;
  }

  /**
   * Get mode display name
   */
  getModeDisplayName() {
    switch (this.currentMode) {
      case InputMode.KEYBOARD:
        return 'Keyboard';
      case InputMode.JOYSTICK:
        return 'Joystick';
      case InputMode.GYRO:
        return 'Tilt';
      default:
        return 'Unknown';
    }
  }

  /**
   * Check if gyro is available
   */
  isGyroAvailable() {
    return this.gyro.isSupported();
  }

  /**
   * Check if gyro permission is granted
   */
  isGyroPermissionGranted() {
    return this.gyro.hasPermission();
  }

  /**
   * Render input controls (joystick, buttons)
   */
  render(ctx) {
    if (this.currentMode === InputMode.JOYSTICK || this.currentMode === InputMode.GYRO) {
      // Render joystick only in joystick mode
      if (this.currentMode === InputMode.JOYSTICK) {
        this.joystick.render(ctx);
      }

      // Always render touch buttons on mobile
      this.touchButtons.render(ctx);
    }
  }

  /**
   * Handle touch start (for joystick and buttons)
   */
  handleTouchStart(e) {
    if (this.currentMode === InputMode.JOYSTICK) {
      this.joystick.handleTouchStart(e);
    }
    this.touchButtons.handleTouchStart(e);
  }

  /**
   * Handle touch move
   */
  handleTouchMove(e) {
    if (this.currentMode === InputMode.JOYSTICK) {
      this.joystick.handleTouchMove(e);
    }
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    if (this.currentMode === InputMode.JOYSTICK) {
      this.joystick.handleTouchEnd(e);
    }
    this.touchButtons.handleTouchEnd(e);
  }

  /**
   * Reset all input states
   */
  reset() {
    this.movement.set(0, 0);
    this.actions = {
      bomb: false,
      missile: false,
      pause: false
    };
    this.joystick.reset();
    this.touchButtons.reset();
  }

  /**
   * Cleanup
   */
  destroy() {
    this.keyboard.destroy();
    this.joystick.destroy();
    this.gyro.destroy();
    this.touchButtons.destroy();
  }
}

export default InputSystem;
