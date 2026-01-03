/**
 * GyroControls.js - Device Orientation Controls
 * iOS 18 compatible gyro/tilt control implementation
 * Follows GYRO_CONTROLS_STANDARD.md v2.0
 */

import { Vector2 } from '../utils/Vector2.js';

// Gyro states
export const GyroState = {
  NOT_SUPPORTED: 'not_supported',
  PERMISSION_REQUIRED: 'permission_required',
  PERMISSION_DENIED: 'permission_denied',
  READY: 'ready',
  ACTIVE: 'active'
};

export class GyroControls {
  constructor() {
    // State
    this.state = GyroState.NOT_SUPPORTED;
    this.enabled = false;
    this.hasPermission = false;

    // Input values (-1 to 1)
    this.input = new Vector2(0, 0);

    // Raw values
    this.beta = 0;  // Front/back tilt (-180 to 180)
    this.gamma = 0; // Left/right tilt (-90 to 90)

    // Calibration
    this.calibrated = false;
    this.calibrationBeta = 0;
    this.calibrationGamma = 0;

    // Settings (v2.0 high sensitivity)
    this.sensitivity = 3.5;
    this.deadzone = 0.08;
    this.maxTilt = 30; // Max tilt angle for full input

    // Smoothing
    this.smoothing = 0.3;

    // Orientation
    this.isLandscape = false;

    // Callbacks
    this.onStateChange = null;

    // Check support
    this.checkSupport();

    // Listen for orientation changes
    window.addEventListener('orientationchange', () => this.updateOrientation());
    this.updateOrientation();
  }

  /**
   * Check if device orientation is supported
   */
  checkSupport() {
    if ('DeviceOrientationEvent' in window) {
      // Check if permission API exists (iOS 13+)
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        this.state = GyroState.PERMISSION_REQUIRED;
      } else {
        // Android or older iOS - try to enable directly
        this.state = GyroState.READY;
        this.hasPermission = true;
      }
    } else {
      this.state = GyroState.NOT_SUPPORTED;
    }

    console.log('Gyro support check:', this.state);
  }

  /**
   * Request permission (iOS 13+)
   * MUST be called from click or touchend event (iOS 18 requirement)
   */
  async requestPermission() {
    if (this.state === GyroState.NOT_SUPPORTED) {
      console.log('Gyro not supported on this device');
      return false;
    }

    if (this.hasPermission) {
      this.setState(GyroState.READY);
      return true;
    }

    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await DeviceOrientationEvent.requestPermission();

        if (permission === 'granted') {
          this.hasPermission = true;
          this.setState(GyroState.READY);
          console.log('Gyro permission granted');
          return true;
        } else {
          this.setState(GyroState.PERMISSION_DENIED);
          console.log('Gyro permission denied');
          return false;
        }
      } else {
        // No permission API needed
        this.hasPermission = true;
        this.setState(GyroState.READY);
        return true;
      }
    } catch (error) {
      console.error('Error requesting gyro permission:', error);
      this.setState(GyroState.PERMISSION_DENIED);
      return false;
    }
  }

  /**
   * Enable gyro controls
   */
  enable() {
    if (!this.hasPermission || this.state === GyroState.NOT_SUPPORTED) {
      console.log('Cannot enable gyro:', this.state);
      return false;
    }

    if (!this.enabled) {
      this.boundHandler = this.handleOrientation.bind(this);
      window.addEventListener('deviceorientation', this.boundHandler);
      this.enabled = true;
      this.setState(GyroState.ACTIVE);
      console.log('Gyro enabled');
    }

    return true;
  }

  /**
   * Disable gyro controls
   */
  disable() {
    if (this.enabled) {
      window.removeEventListener('deviceorientation', this.boundHandler);
      this.enabled = false;
      this.input.set(0, 0);

      if (this.hasPermission) {
        this.setState(GyroState.READY);
      }

      console.log('Gyro disabled');
    }
  }

  /**
   * Handle device orientation event
   */
  handleOrientation(e) {
    if (!this.enabled) return;

    // Get raw values
    let beta = e.beta || 0;   // -180 to 180 (front/back)
    let gamma = e.gamma || 0; // -90 to 90 (left/right)

    // Auto-calibrate on first reading
    if (!this.calibrated) {
      this.calibrate(beta, gamma);
    }

    // Apply calibration offset
    beta -= this.calibrationBeta;
    gamma -= this.calibrationGamma;

    // Store raw values
    this.beta = beta;
    this.gamma = gamma;

    // Convert to input based on orientation
    let inputX, inputY;

    if (this.isLandscape) {
      // Landscape: beta controls X, gamma controls Y
      inputX = this.normalizeInput(beta);
      inputY = this.normalizeInput(-gamma);
    } else {
      // Portrait: gamma controls X, beta controls Y
      inputX = this.normalizeInput(gamma);
      inputY = this.normalizeInput(beta);
    }

    // Apply smoothing
    this.input.x = this.lerp(this.input.x, inputX, this.smoothing);
    this.input.y = this.lerp(this.input.y, inputY, this.smoothing);

    // Apply deadzone
    if (Math.abs(this.input.x) < this.deadzone) this.input.x = 0;
    if (Math.abs(this.input.y) < this.deadzone) this.input.y = 0;
  }

  /**
   * Normalize tilt angle to input value (-1 to 1)
   */
  normalizeInput(angle) {
    // Apply sensitivity
    let value = (angle / this.maxTilt) * this.sensitivity;

    // Clamp to -1 to 1
    return Math.max(-1, Math.min(1, value));
  }

  /**
   * Linear interpolation
   */
  lerp(from, to, amount) {
    return from + (to - from) * amount;
  }

  /**
   * Calibrate to current device position
   */
  calibrate(beta = null, gamma = null) {
    if (beta !== null && gamma !== null) {
      this.calibrationBeta = beta;
      this.calibrationGamma = gamma;
    } else {
      this.calibrationBeta = this.beta;
      this.calibrationGamma = this.gamma;
    }
    this.calibrated = true;
    console.log('Gyro calibrated:', this.calibrationBeta, this.calibrationGamma);
  }

  /**
   * Reset calibration
   */
  resetCalibration() {
    this.calibrated = false;
    this.calibrationBeta = 0;
    this.calibrationGamma = 0;
  }

  /**
   * Update orientation mode
   */
  updateOrientation() {
    const orientation = window.orientation || 0;
    this.isLandscape = Math.abs(orientation) === 90;
    console.log('Screen orientation:', this.isLandscape ? 'landscape' : 'portrait');
  }

  /**
   * Set state and trigger callback
   */
  setState(newState) {
    const oldState = this.state;
    this.state = newState;

    if (this.onStateChange && oldState !== newState) {
      this.onStateChange(newState, oldState);
    }
  }

  /**
   * Get current input vector
   */
  getInput() {
    return this.input.clone();
  }

  /**
   * Check if gyro is supported
   */
  isSupported() {
    return this.state !== GyroState.NOT_SUPPORTED;
  }

  /**
   * Check if gyro has permission
   */
  hasGrantedPermission() {
    return this.hasPermission;
  }

  /**
   * Check if gyro is currently active
   */
  isActive() {
    return this.enabled && this.state === GyroState.ACTIVE;
  }

  /**
   * Get current state
   */
  getState() {
    return this.state;
  }

  /**
   * Set sensitivity (0.5 - 5.0)
   */
  setSensitivity(value) {
    this.sensitivity = Math.max(0.5, Math.min(5.0, value));
  }

  /**
   * Get sensitivity
   */
  getSensitivity() {
    return this.sensitivity;
  }

  /**
   * Get debug info
   */
  getDebugInfo() {
    return {
      state: this.state,
      enabled: this.enabled,
      hasPermission: this.hasPermission,
      beta: this.beta.toFixed(1),
      gamma: this.gamma.toFixed(1),
      inputX: this.input.x.toFixed(2),
      inputY: this.input.y.toFixed(2),
      isLandscape: this.isLandscape,
      sensitivity: this.sensitivity
    };
  }

  /**
   * Cleanup
   */
  destroy() {
    this.disable();
    window.removeEventListener('orientationchange', () => this.updateOrientation());
  }
}

export default GyroControls;
