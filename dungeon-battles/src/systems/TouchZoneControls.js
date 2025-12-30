/**
 * TouchZoneControls.js - Simple touch zone controls for mobile
 * Screen is divided into zones for different actions
 */

export class TouchZoneControls {
  constructor(canvas) {
    this.canvas = canvas;
    this.enabled = false;

    // Movement state
    this.movement = { x: 0, y: 0 };

    // Attack state
    this.attackPressed = false;
    this.magicPressed = false;

    // Active touches
    this.activeTouches = new Map();

    // Zone definitions
    this.zones = {
      left: { x: 0, y: 0, width: 0.33, height: 1.0 },
      right: { x: 0.67, y: 0, width: 0.33, height: 1.0 },
      top: { x: 0.33, y: 0, width: 0.34, height: 0.4 },
      bottom: { x: 0.33, y: 0.6, width: 0.34, height: 0.4 },
      center: { x: 0.33, y: 0.4, width: 0.34, height: 0.2 }
    };

    // Visual feedback
    this.touchVisuals = [];

    console.log('[TouchZoneControls] Initialized');
  }

  /**
   * Enable controls
   */
  enable() {
    this.enabled = true;
    console.log('[TouchZoneControls] Enabled');
  }

  /**
   * Disable controls
   */
  disable() {
    this.enabled = false;
    this.reset();
    console.log('[TouchZoneControls] Disabled');
  }

  /**
   * Update with touch events
   */
  update(touches) {
    if (!this.enabled) return;

    // Clear previous state
    this.movement.x = 0;
    this.movement.y = 0;
    // Don't clear attack state here - let it be read first

    // Clear old visuals
    this.touchVisuals = [];

    // Clear attack states when no touches
    if (!touches || touches.length === 0) {
      this.activeTouches.clear();
      this.attackPressed = false;
      this.magicPressed = false;
      return;
    }

    // Reset attack states for new touch processing
    this.attackPressed = false;
    this.magicPressed = false;

    // Get canvas bounds
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    // Process each touch
    for (const touch of touches) {
      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;

      // Normalized position (0-1)
      const normX = x / this.canvas.width;
      const normY = y / this.canvas.height;

      // Store visual feedback
      this.touchVisuals.push({ x, y });

      // Check zones
      const zone = this.getZone(normX, normY);

      switch (zone) {
        case 'left':
          this.movement.x = -1;
          break;
        case 'right':
          this.movement.x = 1;
          break;
        case 'top':
          this.movement.y = -1;
          break;
        case 'bottom':
          this.movement.y = 1;
          break;
        case 'center':
          this.attackPressed = true;
          break;
      }
    }

    // Handle multi-touch for magic
    if (touches.length >= 2) {
      this.magicPressed = true;
      this.attackPressed = false;
    }

    // Normalize diagonal movement
    if (this.movement.x !== 0 && this.movement.y !== 0) {
      const length = Math.sqrt(this.movement.x * this.movement.x + this.movement.y * this.movement.y);
      this.movement.x /= length;
      this.movement.y /= length;
    }
  }

  /**
   * Get which zone a touch is in
   */
  getZone(normX, normY) {
    // Check each zone
    for (const [name, zone] of Object.entries(this.zones)) {
      if (normX >= zone.x && normX < zone.x + zone.width &&
          normY >= zone.y && normY < zone.y + zone.height) {
        return name;
      }
    }
    return null;
  }

  /**
   * Get movement axis
   */
  getAxis() {
    return {
      x: this.movement.x,
      y: this.movement.y
    };
  }

  /**
   * Check if attack is pressed
   */
  isAttackPressed() {
    // Return current state without clearing
    // The state will be updated in the next update() call
    return this.attackPressed;
  }

  /**
   * Check if magic is pressed
   */
  isMagicPressed() {
    // Return current state without clearing
    // The state will be updated in the next update() call
    return this.magicPressed;
  }

  /**
   * Check if active
   */
  isActive() {
    return this.enabled && (Math.abs(this.movement.x) > 0.1 || Math.abs(this.movement.y) > 0.1);
  }

  /**
   * Reset controls
   */
  reset() {
    this.movement.x = 0;
    this.movement.y = 0;
    this.attackPressed = false;
    this.magicPressed = false;
    this.activeTouches.clear();
    this.touchVisuals = [];
  }

  /**
   * Render visual feedback
   */
  render(ctx) {
    if (!this.enabled) return;

    ctx.save();

    // Draw zone hints (subtle)
    if (this.touchVisuals.length === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const w = this.canvas.width;
      const h = this.canvas.height;

      // Movement hints
      ctx.fillText('←', w * 0.165, h * 0.5);
      ctx.fillText('→', w * 0.835, h * 0.5);
      ctx.fillText('↑', w * 0.5, h * 0.2);
      ctx.fillText('↓', w * 0.5, h * 0.8);
      ctx.fillText('FIRE', w * 0.5, h * 0.5);
    }

    // Draw active touches
    for (const visual of this.touchVisuals) {
      // Ripple effect
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(visual.x, visual.y, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Center dot
      ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(visual.x, visual.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw movement indicator
    if (this.movement.x !== 0 || this.movement.y !== 0) {
      const centerX = 50;
      const centerY = this.canvas.height - 50;
      const radius = 30;

      // Background circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Direction indicator
      ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
      ctx.beginPath();
      ctx.arc(
        centerX + this.movement.x * radius * 0.7,
        centerY + this.movement.y * radius * 0.7,
        8, 0, Math.PI * 2
      );
      ctx.fill();
    }

    // Attack/Magic indicator
    if (this.attackPressed || this.magicPressed) {
      ctx.fillStyle = this.magicPressed ? 'rgba(255, 0, 255, 0.5)' : 'rgba(255, 255, 0, 0.5)';
      ctx.fillRect(this.canvas.width - 100, this.canvas.height - 60, 80, 40);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(this.magicPressed ? 'MAGIC' : 'FIRE', this.canvas.width - 60, this.canvas.height - 35);
    }

    ctx.restore();
  }
}