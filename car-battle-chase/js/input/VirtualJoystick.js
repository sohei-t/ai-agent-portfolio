/**
 * VirtualJoystick.js - Touch Joystick Control
 * Default mobile control method (always works)
 */

import { Vector2 } from '../utils/Vector2.js';

export class VirtualJoystick {
  constructor(canvas) {
    this.canvas = canvas;

    // Joystick configuration
    this.baseRadius = 60;
    this.stickRadius = 30;
    this.maxDistance = 50;

    // Position (bottom-left of screen)
    this.basePosition = new Vector2(100, 0); // Y set on resize
    this.stickPosition = new Vector2(0, 0);

    // State
    this.isActive = false;
    this.touchId = null;
    this.visible = true;

    // Input values (-1 to 1)
    this.input = new Vector2(0, 0);

    // Visual settings
    this.baseColor = 'rgba(255, 255, 255, 0.3)';
    this.stickColor = 'rgba(255, 255, 255, 0.6)';
    this.activeBaseColor = 'rgba(255, 255, 255, 0.4)';
    this.activeStickColor = 'rgba(79, 195, 247, 0.8)';

    // Setup
    this.updatePosition();
    this.setupEventListeners();
  }

  /**
   * Setup touch event listeners
   */
  setupEventListeners() {
    this.boundTouchStart = this.handleTouchStart.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);
    this.boundTouchEnd = this.handleTouchEnd.bind(this);

    this.canvas.addEventListener('touchstart', this.boundTouchStart, { passive: false });
    this.canvas.addEventListener('touchmove', this.boundTouchMove, { passive: false });
    this.canvas.addEventListener('touchend', this.boundTouchEnd);
    this.canvas.addEventListener('touchcancel', this.boundTouchEnd);

    // Handle resize
    window.addEventListener('resize', () => this.updatePosition());
  }

  /**
   * Update joystick position based on screen size
   */
  updatePosition() {
    const rect = this.canvas.getBoundingClientRect();
    this.basePosition.x = 100;
    this.basePosition.y = rect.height - 120;
    this.stickPosition.set(this.basePosition.x, this.basePosition.y);
  }

  /**
   * Handle touch start
   */
  handleTouchStart(e) {
    if (!this.visible) return;

    for (const touch of e.changedTouches) {
      const pos = this.getTouchPosition(touch);

      // Check if touch is in left half of screen (joystick area)
      const rect = this.canvas.getBoundingClientRect();
      if (pos.x < rect.width / 2) {
        // Check if within joystick base area (or start new joystick there)
        const dist = pos.dist(this.basePosition);
        if (dist < this.baseRadius * 2 || this.touchId === null) {
          this.touchId = touch.identifier;
          this.isActive = true;

          // Move base to touch position for floating joystick
          this.basePosition.set(pos.x, pos.y);
          this.stickPosition.set(pos.x, pos.y);

          e.preventDefault();
          break;
        }
      }
    }
  }

  /**
   * Handle touch move
   */
  handleTouchMove(e) {
    if (!this.isActive || !this.visible) return;

    for (const touch of e.changedTouches) {
      if (touch.identifier === this.touchId) {
        const pos = this.getTouchPosition(touch);

        // Calculate distance from base
        const dx = pos.x - this.basePosition.x;
        const dy = pos.y - this.basePosition.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Clamp to max distance
        if (dist <= this.maxDistance) {
          this.stickPosition.set(pos.x, pos.y);
        } else {
          const angle = Math.atan2(dy, dx);
          this.stickPosition.x = this.basePosition.x + Math.cos(angle) * this.maxDistance;
          this.stickPosition.y = this.basePosition.y + Math.sin(angle) * this.maxDistance;
        }

        // Calculate normalized input
        this.input.x = (this.stickPosition.x - this.basePosition.x) / this.maxDistance;
        this.input.y = (this.stickPosition.y - this.basePosition.y) / this.maxDistance;

        e.preventDefault();
        break;
      }
    }
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    for (const touch of e.changedTouches) {
      if (touch.identifier === this.touchId) {
        this.isActive = false;
        this.touchId = null;

        // Reset stick to center
        this.stickPosition.set(this.basePosition.x, this.basePosition.y);
        this.input.set(0, 0);

        // Reset base position to default
        this.updatePosition();
        break;
      }
    }
  }

  /**
   * Get touch position relative to canvas
   */
  getTouchPosition(touch) {
    const rect = this.canvas.getBoundingClientRect();
    return new Vector2(
      touch.clientX - rect.left,
      touch.clientY - rect.top
    );
  }

  /**
   * Get normalized input vector
   */
  getInput() {
    return this.input.clone();
  }

  /**
   * Show joystick
   */
  show() {
    this.visible = true;
  }

  /**
   * Hide joystick
   */
  hide() {
    this.visible = false;
    this.isActive = false;
    this.input.set(0, 0);
  }

  /**
   * Render joystick
   */
  render(ctx) {
    if (!this.visible) return;

    ctx.save();

    // Draw base
    ctx.fillStyle = this.isActive ? this.activeBaseColor : this.baseColor;
    ctx.beginPath();
    ctx.arc(this.basePosition.x, this.basePosition.y, this.baseRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw base border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw directional lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    const lineLength = this.baseRadius * 0.7;

    // Up
    ctx.beginPath();
    ctx.moveTo(this.basePosition.x, this.basePosition.y - 10);
    ctx.lineTo(this.basePosition.x, this.basePosition.y - lineLength);
    ctx.stroke();

    // Down
    ctx.beginPath();
    ctx.moveTo(this.basePosition.x, this.basePosition.y + 10);
    ctx.lineTo(this.basePosition.x, this.basePosition.y + lineLength);
    ctx.stroke();

    // Left
    ctx.beginPath();
    ctx.moveTo(this.basePosition.x - 10, this.basePosition.y);
    ctx.lineTo(this.basePosition.x - lineLength, this.basePosition.y);
    ctx.stroke();

    // Right
    ctx.beginPath();
    ctx.moveTo(this.basePosition.x + 10, this.basePosition.y);
    ctx.lineTo(this.basePosition.x + lineLength, this.basePosition.y);
    ctx.stroke();

    // Draw stick
    ctx.fillStyle = this.isActive ? this.activeStickColor : this.stickColor;
    ctx.beginPath();
    ctx.arc(this.stickPosition.x, this.stickPosition.y, this.stickRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw stick highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(
      this.stickPosition.x - this.stickRadius * 0.3,
      this.stickPosition.y - this.stickRadius * 0.3,
      this.stickRadius * 0.4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.restore();
  }

  /**
   * Reset joystick state
   */
  reset() {
    this.isActive = false;
    this.touchId = null;
    this.input.set(0, 0);
    this.updatePosition();
    this.stickPosition.set(this.basePosition.x, this.basePosition.y);
  }

  /**
   * Cleanup
   */
  destroy() {
    this.canvas.removeEventListener('touchstart', this.boundTouchStart);
    this.canvas.removeEventListener('touchmove', this.boundTouchMove);
    this.canvas.removeEventListener('touchend', this.boundTouchEnd);
    this.canvas.removeEventListener('touchcancel', this.boundTouchEnd);
  }
}

export default VirtualJoystick;
