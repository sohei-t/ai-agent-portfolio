/**
 * GyroControls.js - Device orientation (tilt) controls for mobile
 * Uses device accelerometer/gyroscope for movement
 */

export class GyroControls {
  constructor() {
    this.enabled = false;
    this.permissionGranted = false;

    // Movement values from tilt
    this.tiltX = 0;  // Left/Right (-1 to 1)
    this.tiltY = 0;  // Forward/Back (-1 to 1)

    // Calibration
    this.calibratedAlpha = 0;
    this.calibratedBeta = 0;
    this.calibratedGamma = 0;

    // Sensitivity settings - Improved for better responsiveness
    this.sensitivity = 3.5;  // Increased from 2.0 for better response
    this.deadZone = 2;      // Reduced from 5 degrees for quicker response
    this.maxTilt = 20;      // Reduced from 30 degrees - less tilt needed

    // Check if DeviceOrientation is available
    this.isAvailable = window.DeviceOrientationEvent !== undefined;

    // Show first time message
    this.showInitialMessage = true;

    console.log('[GyroControls] Available:', this.isAvailable);
  }

  /**
   * Request permission and initialize (iOS 13+ requires permission)
   */
  async init() {
    if (!this.isAvailable) {
      console.log('[GyroControls] Device orientation not available');
      return false;
    }

    // iOS 13+ requires permission
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        this.permissionGranted = permission === 'granted';
        console.log('[GyroControls] Permission:', permission);
      } catch (error) {
        console.error('[GyroControls] Permission error:', error);
        return false;
      }
    } else {
      // Non-iOS or older iOS
      this.permissionGranted = true;
    }

    if (this.permissionGranted) {
      this.enable();
      return true;
    }

    return false;
  }

  /**
   * Enable gyro controls
   */
  enable() {
    if (!this.permissionGranted) return;

    this.enabled = true;

    // Add event listener
    window.addEventListener('deviceorientation', this.handleOrientation.bind(this));

    console.log('[GyroControls] Enabled');
  }

  /**
   * Disable gyro controls
   */
  disable() {
    this.enabled = false;
    window.removeEventListener('deviceorientation', this.handleOrientation.bind(this));
    this.reset();
    console.log('[GyroControls] Disabled');
  }

  /**
   * Handle device orientation event
   */
  handleOrientation(event) {
    if (!this.enabled) return;

    const { alpha, beta, gamma } = event;

    // Beta: front-to-back tilt (-180 to 180)
    // Gamma: left-to-right tilt (-90 to 90)

    if (beta !== null && gamma !== null) {
      // Detect if in landscape mode
      const isLandscape = window.innerWidth > window.innerHeight;

      let tiltX, tiltY;

      if (isLandscape) {
        // Landscape mode - axes need special handling
        // Based on actual testing:
        // - Beta (forward/back tilt) controls LEFT/RIGHT movement
        // - Gamma (left/right tilt) controls UP/DOWN movement
        // - Directions are inverted
        let adjustedBeta = Math.abs(beta) > this.deadZone ? beta : 0;
        let adjustedGamma = Math.abs(gamma) > this.deadZone ? gamma : 0;

        // Clamp to max tilt
        adjustedBeta = Math.max(-this.maxTilt, Math.min(this.maxTilt, adjustedBeta));
        adjustedGamma = Math.max(-this.maxTilt, Math.min(this.maxTilt, adjustedGamma));

        // Landscape mode mapping (device held horizontally)
        // When thinking in portrait orientation:
        // - Tilting right (gamma positive) → move UP in game
        // - Tilting left (gamma negative) → move DOWN in game
        // - Tilting forward (beta negative) → move RIGHT in game (swapped)
        // - Tilting backward (beta positive) → move LEFT in game (swapped)
        tiltX = (adjustedBeta / this.maxTilt) * this.sensitivity;   // 前に倒す=右移動, 手前に倒す=左移動
        tiltY = -(adjustedGamma / this.maxTilt) * this.sensitivity; // 右に倒す=上移動, 左に倒す=下移動
      } else {
        // Portrait mode - normal axes
        let adjustedBeta = Math.abs(beta) > this.deadZone ? beta : 0;
        let adjustedGamma = Math.abs(gamma) > this.deadZone ? gamma : 0;

        // Clamp to max tilt
        adjustedBeta = Math.max(-this.maxTilt, Math.min(this.maxTilt, adjustedBeta));
        adjustedGamma = Math.max(-this.maxTilt, Math.min(this.maxTilt, adjustedGamma));

        // Normal portrait mapping
        tiltX = (adjustedGamma / this.maxTilt) * this.sensitivity;
        tiltY = -(adjustedBeta / this.maxTilt) * this.sensitivity;
      }

      // Clamp final values
      this.tiltX = Math.max(-1, Math.min(1, tiltX));
      this.tiltY = Math.max(-1, Math.min(1, tiltY));

      // Debug log every 60 frames (roughly once per second)
      if (!this.debugCounter) this.debugCounter = 0;
      this.debugCounter++;
      if (this.debugCounter % 60 === 0) {
        console.log(`[GyroControls] Landscape: ${isLandscape}, Beta: ${beta?.toFixed(1)}, Gamma: ${gamma?.toFixed(1)}, TiltX: ${this.tiltX.toFixed(2)}, TiltY: ${this.tiltY.toFixed(2)}`);
      }
    }
  }

  /**
   * Calibrate current position as neutral
   */
  calibrate() {
    // Store current orientation as neutral
    // This would require storing the current values
    console.log('[GyroControls] Calibrated');
  }

  /**
   * Get movement axis
   */
  getAxis() {
    return {
      x: this.tiltX,
      y: this.tiltY
    };
  }

  /**
   * Check if active
   */
  isActive() {
    return this.enabled && (Math.abs(this.tiltX) > 0.1 || Math.abs(this.tiltY) > 0.1);
  }

  /**
   * Reset controls
   */
  reset() {
    this.tiltX = 0;
    this.tiltY = 0;
  }

  /**
   * Render debug info
   */
  renderDebug(ctx) {
    if (!this.enabled) return;

    ctx.save();

    // Get canvas dimensions from context
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Show initial guidance
    if (this.showInitialMessage) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(width/2 - 150, height/2 - 60, 300, 120);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🎮 傾き操作モード', width/2, height/2 - 30);

      ctx.font = '14px Arial';
      ctx.fillText('傾けた方向に移動', width/2, height/2);
      ctx.fillText('画面タップでミサイル発射', width/2, height/2 + 20);
      ctx.fillText('2本指タップで魔法', width/2, height/2 + 40);

      // Hide message after 3 seconds
      setTimeout(() => {
        this.showInitialMessage = false;
      }, 3000);
    }

    // Debug info (smaller, less intrusive)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`傾き X: ${this.tiltX.toFixed(2)}`, 10, 30);
    ctx.fillText(`傾き Y: ${this.tiltY.toFixed(2)}`, 10, 45);

    // Visual indicator
    const centerX = 50;
    const centerY = 100;
    const radius = 30;

    // Draw circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw position
    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(
      centerX + this.tiltX * radius,
      centerY + this.tiltY * radius,
      5, 0, Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
  }
}