/**
 * InputManager.js - Input System for Racing
 *
 * CRITICAL: Gyro steering implementation for mobile racing
 * - Uses gamma (left/right tilt) only for steering
 * - iOS permission request on user gesture (click/touchend, NOT touchstart)
 * - Fallback to touch/button controls if gyro unavailable
 */

export class InputManager {
  constructor(canvas) {
    this.canvas = canvas;

    // Control mode
    this.useGyro = true; // Default to gyro for racing game

    // Current input state
    this.steering = 0;        // -1 (left) to 1 (right)
    this.accelerating = true; // Auto-accelerate by default
    this.braking = false;
    this.useItem = false;

    // Gyro settings
    this.gyroEnabled = false;
    this.gyroSupported = false;
    this.gyroPermissionGranted = false;
    this.sensitivity = 3.5;   // Higher sensitivity for pseudo-3D racing
    this.deadzone = 2;        // Smaller dead zone for responsiveness
    this.maxTilt = 25;        // Maximum tilt angle

    // Raw gyro values
    this.rawGamma = 0;        // Left/Right tilt
    this.rawBeta = 0;         // Front/Back tilt (not used for steering)

    // Touch steering
    this.touchSteering = 0;

    // Keyboard (for desktop testing)
    this.keys = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false
    };

    // Debug logging
    this.debugMode = false;
    this.lastLogTime = 0;
  }

  /**
   * Initialize the input manager
   */
  init() {
    // Check gyro support
    this.checkGyroSupport();

    // Setup keyboard listeners (for testing)
    this.setupKeyboard();

    console.log('[InputManager] Initialized');
  }

  checkGyroSupport() {
    // Check if DeviceOrientationEvent is available
    if (typeof DeviceOrientationEvent !== 'undefined') {
      this.gyroSupported = true;

      // Check if permission API exists (iOS 13+)
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS - needs explicit permission request
        console.log('[InputManager] iOS detected - gyro permission required');
      } else {
        // Android/Desktop - try to enable directly
        console.log('[InputManager] Non-iOS device - attempting gyro enable');
        this.enableGyro();
      }
    } else {
      console.log('[InputManager] DeviceOrientationEvent not supported');
      this.gyroSupported = false;
    }
  }

  /**
   * Request gyro permission - MUST be called from user gesture
   * iOS 18+: Must use click or touchend, NOT touchstart
   */
  async requestGyroPermission() {
    if (!this.gyroSupported) {
      console.log('[InputManager] Gyro not supported on this device');
      return false;
    }

    // iOS permission request
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        console.log('[InputManager] Requesting iOS gyro permission...');
        const permission = await DeviceOrientationEvent.requestPermission();

        if (permission === 'granted') {
          console.log('[InputManager] iOS gyro permission GRANTED');
          this.gyroPermissionGranted = true;
          this.enableGyro();
          return true;
        } else {
          console.log('[InputManager] iOS gyro permission DENIED');
          this.gyroPermissionGranted = false;
          return false;
        }
      } catch (error) {
        console.error('[InputManager] iOS gyro permission error:', error);
        return false;
      }
    } else {
      // Non-iOS - already enabled
      return this.gyroEnabled;
    }
  }

  enableGyro() {
    if (this.gyroEnabled) return;

    console.log('[InputManager] Enabling gyro listener...');

    window.addEventListener('deviceorientation', (event) => {
      this.handleDeviceOrientation(event);
    }, true);

    this.gyroEnabled = true;
    console.log('[InputManager] Gyro listener enabled');
  }

  handleDeviceOrientation(event) {
    // gamma: left/right tilt (-90 to 90)
    // beta: front/back tilt (-180 to 180)
    // alpha: compass direction (0 to 360)

    if (event.gamma === null || event.gamma === undefined) {
      return;
    }

    this.rawGamma = event.gamma;
    this.rawBeta = event.beta || 0;

    // Debug logging
    if (this.debugMode) {
      const now = Date.now();
      if (now - this.lastLogTime > 500) {
        console.log(`[Gyro] gamma=${this.rawGamma.toFixed(1)}, beta=${this.rawBeta.toFixed(1)}, steering=${this.steering.toFixed(2)}`);
        this.lastLogTime = now;
      }
    }
  }

  setMode(mode) {
    this.mode = mode;
    console.log(`[InputManager] Mode set to: ${mode}`);
  }

  setSensitivity(value) {
    this.sensitivity = value;
    console.log(`[InputManager] Sensitivity set to: ${value}`);
  }

  // Touch control methods (called from UI buttons)
  setTouchSteering(value) {
    this.touchSteering = value;
  }

  setBraking(value) {
    this.braking = value;
  }

  setAccelerating(value) {
    this.accelerating = value;
  }

  triggerItemUse() {
    this.useItem = true;
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          this.keys.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          this.keys.right = true;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          this.keys.up = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          this.keys.down = true;
          break;
        case ' ':
          this.keys.space = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          this.keys.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          this.keys.right = false;
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          this.keys.up = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          this.keys.down = false;
          break;
        case ' ':
          this.keys.space = false;
          break;
      }
    });
  }

  /**
   * Get current input state
   * Returns normalized values for steering, acceleration, etc.
   */
  getInput() {
    // Determine steering based on mode
    let steer = 0;

    if (this.useGyro && this.gyroEnabled) {
      // Gyro steering
      steer = this.calculateGyroSteering();
    } else {
      // Touch/button steering
      steer = this.touchSteering;
    }

    // Keyboard override (for testing)
    if (this.keys.left) steer = -1;
    if (this.keys.right) steer = 1;

    // Accelerating - auto by default, but can be modified
    let accelerate = this.accelerating;
    if (this.keys.up) accelerate = true;

    // Braking
    let brake = this.braking;
    if (this.keys.down) brake = true;

    // Item use (one-shot)
    const item = this.useItem || this.keys.space;
    this.useItem = false; // Reset after reading

    return {
      steer: steer,
      accelerate: accelerate,
      brake: brake,
      useItem: item
    };
  }

  /**
   * Calculate steering from gyro gamma value
   *
   * Key points:
   * - gamma is left/right tilt (-90 to 90 degrees)
   * - Positive gamma = tilted right
   * - Negative gamma = tilted left
   * - Apply deadzone and sensitivity
   */
  calculateGyroSteering() {
    let gamma = this.rawGamma;

    // Handle device held in portrait mode
    // gamma is relative to screen orientation
    // When phone is tilted left, gamma is negative
    // When phone is tilted right, gamma is positive

    // Apply deadzone
    if (Math.abs(gamma) < this.deadzone) {
      gamma = 0;
    } else {
      // Remove deadzone from the value
      gamma = gamma - Math.sign(gamma) * this.deadzone;
    }

    // Normalize to -1 to 1 range
    const maxEffectiveTilt = this.maxTilt - this.deadzone;
    let steering = gamma / maxEffectiveTilt;

    // Apply sensitivity
    steering *= this.sensitivity;

    // Clamp to -1 to 1
    steering = Math.max(-1, Math.min(1, steering));

    return steering;
  }

  /**
   * Get gyro status for UI display
   */
  getGyroStatus() {
    if (!this.gyroSupported) {
      return { available: false, message: 'Not supported' };
    }

    if (!this.gyroEnabled) {
      return { available: false, message: 'Not enabled' };
    }

    if (!this.gyroPermissionGranted && typeof DeviceOrientationEvent.requestPermission === 'function') {
      return { available: false, message: 'Permission needed' };
    }

    return {
      available: true,
      message: 'Ready',
      gamma: this.rawGamma,
      steering: this.calculateGyroSteering()
    };
  }

  /**
   * Enable debug mode for gyro testing
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
    console.log(`[InputManager] Debug mode: ${enabled ? 'ON' : 'OFF'}`);
  }
}
