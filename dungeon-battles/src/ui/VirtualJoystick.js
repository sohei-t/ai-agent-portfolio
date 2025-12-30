/**
 * VirtualJoystick - Touch-based movement control for mobile devices
 */
export class VirtualJoystick {
  constructor(config = {}) {
    console.log('[VirtualJoystick] Constructor called with config:', config);

    // Default configuration
    const defaultConfig = {
      position: { x: 100, y: 500 },
      radius: 50,
      opacity: 0.5
    };

    // Merge with provided config
    const finalConfig = {
      position: config && config.position ? config.position : defaultConfig.position,
      radius: config && config.radius !== undefined ? config.radius : defaultConfig.radius,
      opacity: config && config.opacity !== undefined ? config.opacity : defaultConfig.opacity
    };

    console.log('[VirtualJoystick] Final config:', finalConfig);

    this.centerX = finalConfig.position.x;
    this.centerY = finalConfig.position.y;
    this.radius = finalConfig.radius;
    this.opacity = finalConfig.opacity;

    this.active = false;
    this.touchId = null;
    this.currentX = this.centerX;
    this.currentY = this.centerY;
    this.axis = { x: 0, y: 0 };
  }

  /**
   * Update joystick state based on touch input
   */
  update(touches) {
    if (!touches || touches.length === 0) {
      this.reset();
      return;
    }

    // Find touch in joystick area
    if (!this.active) {
      for (const touch of touches) {
        const dx = touch.clientX - this.centerX;
        const dy = touch.clientY - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius * 2) {
          this.active = true;
          this.touchId = touch.identifier;
          this.updatePosition(touch.clientX, touch.clientY);
          break;
        }
      }
    } else {
      // Update existing touch
      const touch = Array.from(touches).find(t => t.identifier === this.touchId);
      if (touch) {
        this.updatePosition(touch.clientX, touch.clientY);
      } else {
        this.reset();
      }
    }
  }

  /**
   * Update joystick position and calculate axis
   */
  updatePosition(x, y) {
    const dx = x - this.centerX;
    const dy = y - this.centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.radius) {
      const angle = Math.atan2(dy, dx);
      this.currentX = this.centerX + Math.cos(angle) * this.radius;
      this.currentY = this.centerY + Math.sin(angle) * this.radius;
      this.axis.x = Math.cos(angle);
      this.axis.y = Math.sin(angle);
    } else {
      this.currentX = x;
      this.currentY = y;
      this.axis.x = dx / this.radius;
      this.axis.y = dy / this.radius;
    }
  }

  /**
   * Reset joystick to center
   */
  reset() {
    this.active = false;
    this.touchId = null;
    this.currentX = this.centerX;
    this.currentY = this.centerY;
    this.axis.x = 0;
    this.axis.y = 0;
  }

  /**
   * Get current axis values
   */
  getAxis() {
    return { x: this.axis.x, y: this.axis.y };
  }

  /**
   * Check if joystick is active
   */
  isActive() {
    return this.active;
  }

  /**
   * Render the virtual joystick
   */
  render(ctx) {
    ctx.save();

    // Outer circle
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner circle (thumb)
    ctx.fillStyle = this.active ? '#00ffff' : '#ffffff';
    ctx.beginPath();
    ctx.arc(this.currentX, this.currentY, this.radius * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Crosshair
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    const crossSize = 10;
    ctx.beginPath();
    ctx.moveTo(this.centerX - crossSize, this.centerY);
    ctx.lineTo(this.centerX + crossSize, this.centerY);
    ctx.moveTo(this.centerX, this.centerY - crossSize);
    ctx.lineTo(this.centerX, this.centerY + crossSize);
    ctx.stroke();

    ctx.restore();
  }
}
