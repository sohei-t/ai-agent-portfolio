/**
 * Controls - Unified input system
 * Handles both gyroscope (tilt) controls and virtual joystick
 * iOS 18 compatible: uses click/touchend for gyro permission
 */

export class Controls {
  constructor() {
    // Input state (-1 to 1 for both axes)
    this.input = { x: 0, y: 0 };

    // Control mode
    this.mode = 'joystick'; // 'gyro' or 'joystick'
    this.gyroAvailable = false;
    this.gyroPermissionGranted = false;

    // Gyro settings
    this.gyroSensitivity = 3.5;
    this.gyroDeadzone = 0.05;
    this.gyroBeta = 0;  // Front-back tilt
    this.gyroGamma = 0; // Left-right tilt

    // Joystick settings
    this.joystickContainer = null;
    this.joystickKnob = null;
    this.joystickActive = false;
    this.joystickCenter = { x: 0, y: 0 };
    this.joystickRadius = 50;

    // Toggle button
    this.toggleButton = null;
  }

  /**
   * Initialize controls
   */
  init() {
    this.setupJoystick();
    this.checkGyroAvailability();
    this.setupToggle();
  }

  /**
   * Setup virtual joystick
   */
  setupJoystick() {
    this.joystickContainer = document.getElementById('joystick-container');
    this.joystickKnob = document.getElementById('joystick-knob');

    if (!this.joystickContainer || !this.joystickKnob) return;

    // Touch events
    this.joystickContainer.addEventListener('touchstart', (e) => this.onJoystickStart(e), { passive: false });
    this.joystickContainer.addEventListener('touchmove', (e) => this.onJoystickMove(e), { passive: false });
    this.joystickContainer.addEventListener('touchend', (e) => this.onJoystickEnd(e));
    this.joystickContainer.addEventListener('touchcancel', (e) => this.onJoystickEnd(e));

    // Mouse events (for desktop testing)
    this.joystickContainer.addEventListener('mousedown', (e) => this.onJoystickStart(e));
    window.addEventListener('mousemove', (e) => this.onJoystickMove(e));
    window.addEventListener('mouseup', (e) => this.onJoystickEnd(e));

    // Calculate joystick dimensions
    this.updateJoystickDimensions();
    window.addEventListener('resize', () => this.updateJoystickDimensions());
  }

  /**
   * Update joystick dimensions on resize
   */
  updateJoystickDimensions() {
    if (!this.joystickContainer) return;

    const rect = this.joystickContainer.getBoundingClientRect();
    this.joystickCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    this.joystickRadius = rect.width / 2 - 25; // Account for knob size
  }

  /**
   * Joystick touch/mouse start
   */
  onJoystickStart(e) {
    if (this.mode !== 'joystick') return;

    e.preventDefault();
    this.joystickActive = true;
    this.updateJoystickDimensions();
    this.onJoystickMove(e);
  }

  /**
   * Joystick touch/mouse move
   */
  onJoystickMove(e) {
    if (!this.joystickActive || this.mode !== 'joystick') return;

    e.preventDefault();

    // Get position
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Calculate offset from center
    let dx = clientX - this.joystickCenter.x;
    let dy = clientY - this.joystickCenter.y;

    // Clamp to radius
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > this.joystickRadius) {
      dx = dx / distance * this.joystickRadius;
      dy = dy / distance * this.joystickRadius;
    }

    // Update knob position
    this.joystickKnob.style.marginLeft = `${-25 + dx}px`;
    this.joystickKnob.style.marginTop = `${-25 + dy}px`;

    // Normalize to -1 to 1
    this.input.x = dx / this.joystickRadius;
    this.input.y = -dy / this.joystickRadius; // Invert Y for forward motion
  }

  /**
   * Joystick touch/mouse end
   */
  onJoystickEnd(e) {
    if (this.mode !== 'joystick') return;

    this.joystickActive = false;

    // Reset knob position
    if (this.joystickKnob) {
      this.joystickKnob.style.marginLeft = '-25px';
      this.joystickKnob.style.marginTop = '-25px';
    }

    // Reset input
    this.input.x = 0;
    this.input.y = 0;
  }

  /**
   * Check if gyroscope is available
   */
  checkGyroAvailability() {
    if (window.DeviceOrientationEvent) {
      // Check if permission API exists (iOS 13+)
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        this.gyroAvailable = true;
      } else {
        // Android or older iOS - check for actual events
        const testHandler = (e) => {
          if (e.beta !== null || e.gamma !== null) {
            this.gyroAvailable = true;
            this.gyroPermissionGranted = true;
            this.setupGyro();
          }
          window.removeEventListener('deviceorientation', testHandler);
        };
        window.addEventListener('deviceorientation', testHandler, { once: true });

        // Timeout - assume no gyro if no event
        setTimeout(() => {
          window.removeEventListener('deviceorientation', testHandler);
        }, 1000);
      }
    }
  }

  /**
   * Request gyroscope permission (iOS)
   */
  async requestGyroPermission() {
    if (!window.DeviceOrientationEvent) {
      console.log('DeviceOrientation not supported');
      return false;
    }

    try {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          this.gyroPermissionGranted = true;
          this.setupGyro();
          return true;
        }
        console.log('Gyro permission denied');
        return false;
      } else {
        // No permission needed (Android)
        this.gyroPermissionGranted = true;
        this.setupGyro();
        return true;
      }
    } catch (error) {
      console.log('Error requesting gyro permission:', error);
      return false;
    }
  }

  /**
   * Setup gyroscope event listener
   */
  setupGyro() {
    window.addEventListener('deviceorientation', (e) => this.onDeviceOrientation(e));
  }

  /**
   * Handle device orientation event
   */
  onDeviceOrientation(e) {
    if (this.mode !== 'gyro') return;

    // Get tilt angles (in degrees)
    this.gyroBeta = e.beta || 0;   // Front-back: -180 to 180
    this.gyroGamma = e.gamma || 0; // Left-right: -90 to 90

    // Normalize and apply sensitivity
    // Beta controls forward/back (Y)
    let y = this.gyroBeta / 45; // Normalize to roughly -1 to 1
    y = Math.max(-1, Math.min(1, y * this.gyroSensitivity));

    // Gamma controls left/right (X)
    let x = this.gyroGamma / 45;
    x = Math.max(-1, Math.min(1, x * this.gyroSensitivity));

    // Apply deadzone
    if (Math.abs(x) < this.gyroDeadzone) x = 0;
    if (Math.abs(y) < this.gyroDeadzone) y = 0;

    this.input.x = x;
    this.input.y = y;
  }

  /**
   * Setup mode toggle button
   */
  setupToggle() {
    this.toggleButton = document.getElementById('control-toggle');
    if (!this.toggleButton) return;

    // iOS 18 requires click or touchend (not touchstart)
    this.toggleButton.addEventListener('click', async () => {
      await this.toggleMode();
    });

    this.updateToggleButton();
  }

  /**
   * Toggle between gyro and joystick
   */
  async toggleMode() {
    if (this.mode === 'joystick') {
      // Try to switch to gyro
      if (this.gyroPermissionGranted) {
        this.mode = 'gyro';
        this.hideJoystick();
      } else if (this.gyroAvailable) {
        const granted = await this.requestGyroPermission();
        if (granted) {
          this.mode = 'gyro';
          this.hideJoystick();
        }
      } else {
        console.log('Gyro not available on this device');
        // Stay in joystick mode
      }
    } else {
      // Switch to joystick
      this.mode = 'joystick';
      this.showJoystick();
      this.input = { x: 0, y: 0 };
    }

    this.updateToggleButton();
  }

  /**
   * Update toggle button text
   */
  updateToggleButton() {
    if (!this.toggleButton) return;

    if (this.mode === 'gyro') {
      this.toggleButton.textContent = 'Tilt';
    } else {
      this.toggleButton.textContent = 'Joystick';
    }
  }

  /**
   * Show joystick UI
   */
  showJoystick() {
    if (this.joystickContainer) {
      this.joystickContainer.style.display = 'block';
    }
  }

  /**
   * Hide joystick UI
   */
  hideJoystick() {
    if (this.joystickContainer) {
      this.joystickContainer.style.display = 'none';
    }
  }

  /**
   * Get current input state
   */
  getInput() {
    return { ...this.input };
  }

  /**
   * Get current control mode
   */
  getMode() {
    return this.mode;
  }

  /**
   * Check if gyro is available
   */
  isGyroAvailable() {
    return this.gyroAvailable;
  }
}
