/**
 * MobileControls.js - Mobile UI controls
 * Features: Virtual joystick, attack/magic buttons
 */
import { VirtualJoystick } from './VirtualJoystick.js';

export class MobileControls {
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.enabled = false;

    // Default configuration
    const defaultConfig = {
      virtualJoystick: {
        position: { x: 100, y: 500 },
        radius: 50,
        opacity: 0.6
      },
      attackButton: {
        position: { x: 700, y: 500 },
        size: 60,
        label: 'ATK'
      },
      magicButton: {
        position: { x: 650, y: 420 },
        size: 60,
        label: 'MAG'
      }
    };

    // Merge with provided config
    const finalConfig = {
      virtualJoystick: config.virtualJoystick || defaultConfig.virtualJoystick,
      attackButton: config.attackButton || defaultConfig.attackButton,
      magicButton: config.magicButton || defaultConfig.magicButton
    };

    // Detect if mobile
    this.isMobile = this.detectMobile();

    // Virtual joystick
    this.joystick = new VirtualJoystick(finalConfig.virtualJoystick);

    // Attack button
    this.attackButton = {
      x: finalConfig.attackButton.position.x,
      y: finalConfig.attackButton.position.y,
      radius: finalConfig.attackButton.size / 2,
      label: finalConfig.attackButton.label,
      pressed: false,
      touchId: null
    };

    // Magic button
    this.magicButton = {
      x: finalConfig.magicButton.position.x,
      y: finalConfig.magicButton.position.y,
      radius: finalConfig.magicButton.size / 2,
      label: finalConfig.magicButton.label,
      pressed: false,
      touchId: null
    };

    // Opacity
    this.opacity = 0.6;

    // Touch tracking
    this.activeTouches = new Map();

    // Auto-enable on mobile
    if (this.isMobile) {
      this.enable();
    }
  }

  /**
   * Detect if device is mobile
   */
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  }

  /**
   * Enable mobile controls
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable mobile controls
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Update mobile controls
   */
  update(touches) {
    if (!this.enabled) return;

    // Update joystick
    this.joystick.update(touches);

    // Update buttons
    this.updateButton(this.attackButton, touches);
    this.updateButton(this.magicButton, touches);
  }

  /**
   * Update button state
   */
  updateButton(button, touches) {
    if (!touches || touches.length === 0) {
      button.pressed = false;
      button.touchId = null;
      return;
    }

    // Check if button is being touched
    let stillPressed = false;

    for (const touch of touches) {
      const dx = touch.clientX - button.x;
      const dy = touch.clientY - button.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < button.radius) {
        button.pressed = true;
        button.touchId = touch.identifier;
        stillPressed = true;
        break;
      }
    }

    // If no touch found, check if previous touch still exists
    if (!stillPressed && button.touchId !== null) {
      const existingTouch = Array.from(touches).find(t => t.identifier === button.touchId);
      if (!existingTouch) {
        button.pressed = false;
        button.touchId = null;
      }
    }
  }

  /**
   * Render mobile controls
   */
  render(ctx) {
    if (!this.enabled) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;

    // Render virtual joystick
    this.joystick.render(ctx);

    // Render attack button
    this.renderButton(ctx, this.attackButton, '#ff4444');

    // Render magic button
    this.renderButton(ctx, this.magicButton, '#aa00ff');

    ctx.restore();
  }

  /**
   * Render a button
   */
  renderButton(ctx, button, color) {
    // Outer circle
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(button.x, button.y, button.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner circle (filled when pressed)
    if (button.pressed) {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(button.x, button.y, button.radius * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = this.opacity;
    }

    // Label
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(button.label, button.x, button.y);
  }

  /**
   * Get joystick axis
   */
  getJoystickAxis() {
    return this.joystick.getAxis();
  }

  /**
   * Check if attack button is pressed
   */
  isAttackPressed() {
    return this.attackButton.pressed;
  }

  /**
   * Check if magic button is pressed
   */
  isMagicPressed() {
    return this.magicButton.pressed;
  }

  /**
   * Check if joystick is active
   */
  isJoystickActive() {
    return this.joystick.isActive();
  }

  /**
   * Handle touch start
   */
  handleTouchStart(touches) {
    this.update(touches);
  }

  /**
   * Handle touch move
   */
  handleTouchMove(touches) {
    this.update(touches);
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(touches) {
    this.update(touches);

    // Reset if no touches left
    if (touches.length === 0) {
      this.joystick.reset();
      this.attackButton.pressed = false;
      this.attackButton.touchId = null;
      this.magicButton.pressed = false;
      this.magicButton.touchId = null;
    }
  }

  /**
   * Reset all controls
   */
  reset() {
    this.joystick.reset();
    this.attackButton.pressed = false;
    this.attackButton.touchId = null;
    this.magicButton.pressed = false;
    this.magicButton.touchId = null;
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;

    // Reposition controls proportionally
    const scaleX = width / 800;
    const scaleY = height / 600;

    // Joystick (bottom-left)
    this.joystick.centerX = 100 * scaleX;
    this.joystick.centerY = 500 * scaleY;

    // Attack button (bottom-right)
    this.attackButton.x = 720 * scaleX;
    this.attackButton.y = 520 * scaleY;

    // Magic button (next to attack)
    this.magicButton.x = 630 * scaleX;
    this.magicButton.y = 480 * scaleY;
  }

  /**
   * Toggle visibility
   */
  toggle() {
    this.enabled = !this.enabled;
  }

  /**
   * Set opacity
   */
  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(1, opacity));
  }
}
