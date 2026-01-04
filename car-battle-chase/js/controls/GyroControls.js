/**
 * GyroControls.js - Smartphone Tilt Control System
 *
 * Controls:
 * - Tilt forward (pitch forward) = Accelerate
 * - Tilt backward (raise up) = Brake
 * - Tilt left/right (roll) = Steering
 * - Tap on screen = Use Item
 */

export class GyroControls {
  constructor() {
    // Gyro state
    this.enabled = false;
    this.available = false;
    this.permissionGranted = false;

    // Device orientation values
    this.alpha = 0;  // Compass direction (0-360)
    this.beta = 0;   // Front/back tilt (-180 to 180)
    this.gamma = 0;  // Left/right tilt (-90 to 90)

    // Calibrated neutral position
    this.neutralBeta = 45;   // Default holding angle (slightly tilted back)
    this.neutralGamma = 0;
    this.calibrated = false;

    // Sensitivity settings - REDUCED for better control
    this.steeringSensitivity = 1.2;   // Lower = less responsive (was 3.5)
    this.accelSensitivity = 2.5;      // Slightly higher for better speed control
    this.brakeSensitivity = 2.0;

    // Thresholds
    this.accelThreshold = -8;    // Easier to accelerate (was -10)
    this.brakeThreshold = 15;    // Easier to brake (was 20)
    this.steeringDeadzone = 8;   // Larger deadzone to prevent over-steering (was 3)

    // Output values (normalized -1 to 1 or 0 to 1)
    this.steerValue = 0;    // -1 (left) to 1 (right)
    this.accelValue = 0;    // 0 to 1
    this.brakeValue = 0;    // 0 to 1

    // Tap detection
    this.onTap = null;      // Callback for tap action
    this.tapZones = [];     // Exclusion zones (buttons)

    // Smoothing - more smoothing for easier control
    this.smoothingFactor = 0.2;  // Lower = smoother but more latency (was 0.3)

    // Check availability
    this.checkAvailability();
  }

  /**
   * Check if device orientation is available
   */
  checkAvailability() {
    this.available = 'DeviceOrientationEvent' in window;

    // Check if permission is needed (iOS 13+)
    this.needsPermission = typeof DeviceOrientationEvent.requestPermission === 'function';

    console.log(`Gyro available: ${this.available}, needs permission: ${this.needsPermission}`);

    return this.available;
  }

  /**
   * Request permission and enable gyro controls
   * IMPORTANT: Must be called from a user gesture (click/touchend)
   */
  async requestPermission() {
    if (!this.available) {
      console.warn('Device orientation not available');
      return false;
    }

    if (this.needsPermission) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== 'granted') {
          console.warn('Device orientation permission denied');
          return false;
        }
        this.permissionGranted = true;
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        return false;
      }
    } else {
      this.permissionGranted = true;
    }

    return this.enable();
  }

  /**
   * Enable gyro controls
   */
  enable() {
    if (!this.available || !this.permissionGranted) {
      return false;
    }

    // Add event listener
    window.addEventListener('deviceorientation', this.handleOrientation.bind(this), true);

    // Setup tap detection
    this.setupTapDetection();

    this.enabled = true;
    console.log('Gyro controls enabled');

    return true;
  }

  /**
   * Disable gyro controls
   */
  disable() {
    window.removeEventListener('deviceorientation', this.handleOrientation.bind(this), true);
    this.removeTapDetection();
    this.enabled = false;
    console.log('Gyro controls disabled');
  }

  /**
   * Handle device orientation event
   */
  handleOrientation(event) {
    if (!this.enabled) return;

    // Get raw values
    const rawAlpha = event.alpha || 0;
    const rawBeta = event.beta || 0;
    const rawGamma = event.gamma || 0;

    // Apply smoothing
    this.alpha = this.lerp(this.alpha, rawAlpha, this.smoothingFactor);
    this.beta = this.lerp(this.beta, rawBeta, this.smoothingFactor);
    this.gamma = this.lerp(this.gamma, rawGamma, this.smoothingFactor);

    // Calculate control values
    this.updateControlValues();
  }

  /**
   * Update control output values based on orientation
   */
  updateControlValues() {
    // Steering (left/right tilt - gamma)
    const steerInput = this.gamma - this.neutralGamma;

    if (Math.abs(steerInput) < this.steeringDeadzone) {
      this.steerValue = this.lerp(this.steerValue, 0, 0.2);
    } else {
      // Normalize and apply sensitivity
      const normalizedSteer = (steerInput / 45) * this.steeringSensitivity;
      this.steerValue = Math.max(-1, Math.min(1, normalizedSteer));
    }

    // Acceleration/Brake (forward/backward tilt - beta)
    const tiltInput = this.beta - this.neutralBeta;

    if (tiltInput < this.accelThreshold) {
      // Tilting forward - accelerate
      const accelIntensity = Math.abs(tiltInput - this.accelThreshold) / 30;
      this.accelValue = Math.min(1, accelIntensity * this.accelSensitivity);
      this.brakeValue = 0;
    } else if (tiltInput > this.brakeThreshold) {
      // Tilting backward - brake
      const brakeIntensity = (tiltInput - this.brakeThreshold) / 30;
      this.brakeValue = Math.min(1, brakeIntensity * this.brakeSensitivity);
      this.accelValue = 0;
    } else {
      // Neutral zone - coast
      this.accelValue = this.lerp(this.accelValue, 0, 0.1);
      this.brakeValue = this.lerp(this.brakeValue, 0, 0.1);
    }
  }

  /**
   * Calibrate neutral position
   * Call this when player is holding phone in comfortable position
   */
  calibrate() {
    this.neutralBeta = this.beta;
    this.neutralGamma = this.gamma;
    this.calibrated = true;
    console.log(`Calibrated: beta=${this.neutralBeta.toFixed(1)}, gamma=${this.neutralGamma.toFixed(1)}`);
  }

  /**
   * Setup tap detection on canvas/game area
   */
  setupTapDetection() {
    this.tapHandler = this.handleTap.bind(this);

    // Use touchend for iOS compatibility (touchstart doesn't work for permission)
    document.addEventListener('touchend', this.tapHandler, { passive: false });
    document.addEventListener('click', this.tapHandler);
  }

  /**
   * Remove tap detection
   */
  removeTapDetection() {
    document.removeEventListener('touchend', this.tapHandler);
    document.removeEventListener('click', this.tapHandler);
  }

  /**
   * Handle tap events
   */
  handleTap(event) {
    if (!this.enabled) return;

    // Get tap position
    let x, y;
    if (event.type === 'touchend' && event.changedTouches) {
      const touch = event.changedTouches[0];
      x = touch.clientX;
      y = touch.clientY;
    } else {
      x = event.clientX;
      y = event.clientY;
    }

    // Check if tap is on an excluded zone (button)
    const element = document.elementFromPoint(x, y);
    if (element && (
      element.tagName === 'BUTTON' ||
      element.classList.contains('control-btn') ||
      element.closest('.touch-controls') ||
      element.closest('.game-hud') ||
      element.id.startsWith('btn-')
    )) {
      return; // Let the button handle it
    }

    // Check custom exclusion zones
    for (const zone of this.tapZones) {
      if (x >= zone.x && x <= zone.x + zone.width &&
          y >= zone.y && y <= zone.y + zone.height) {
        return;
      }
    }

    // Trigger tap callback (use item)
    if (this.onTap) {
      this.onTap(x, y);
    }
  }

  /**
   * Add an exclusion zone for tap detection
   */
  addTapExclusionZone(x, y, width, height) {
    this.tapZones.push({ x, y, width, height });
  }

  /**
   * Clear exclusion zones
   */
  clearTapExclusionZones() {
    this.tapZones = [];
  }

  /**
   * Linear interpolation helper
   */
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /**
   * Get current control state
   */
  getState() {
    return {
      enabled: this.enabled,
      available: this.available,
      calibrated: this.calibrated,
      steer: this.steerValue,
      accel: this.accelValue,
      brake: this.brakeValue,
      raw: {
        alpha: this.alpha,
        beta: this.beta,
        gamma: this.gamma
      }
    };
  }

  /**
   * Set sensitivity
   */
  setSensitivity(steering, accel, brake) {
    if (steering !== undefined) this.steeringSensitivity = steering;
    if (accel !== undefined) this.accelSensitivity = accel;
    if (brake !== undefined) this.brakeSensitivity = brake;
  }

  /**
   * Check if device is mobile
   */
  static isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
