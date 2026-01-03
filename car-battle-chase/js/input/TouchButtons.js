/**
 * TouchButtons.js - Touch Action Buttons
 * Bomb and Missile buttons for mobile play
 */

export class TouchButtons {
  constructor(canvas) {
    this.canvas = canvas;

    // Button configuration
    this.buttonRadius = 35;
    this.buttonSpacing = 90;

    // Button positions (right side of screen)
    this.bombButton = {
      x: 0,
      y: 0,
      pressed: false,
      color: '#FF6B35',
      icon: 'B',
      label: 'BOMB'
    };

    this.missileButton = {
      x: 0,
      y: 0,
      pressed: false,
      color: '#4FC3F7',
      icon: 'M',
      label: 'MISSILE'
    };

    // Touch tracking
    this.bombTouchId = null;
    this.missileTouchId = null;

    // Callbacks
    this.onBomb = null;
    this.onMissile = null;

    // Visual effects
    this.bombPressTimer = 0;
    this.missilePressTimer = 0;

    // Cooldown display
    this.bombCooldown = 0;
    this.missileCooldown = 0;

    // Setup
    this.updatePositions();
    window.addEventListener('resize', () => this.updatePositions());
  }

  /**
   * Update button positions based on screen size
   */
  updatePositions() {
    const rect = this.canvas.getBoundingClientRect();
    const rightMargin = 80;
    const bottomMargin = 120;

    // Bomb button (lower)
    this.bombButton.x = rect.width - rightMargin;
    this.bombButton.y = rect.height - bottomMargin;

    // Missile button (upper)
    this.missileButton.x = rect.width - rightMargin;
    this.missileButton.y = rect.height - bottomMargin - this.buttonSpacing;
  }

  /**
   * Update button states
   */
  update(deltaTime) {
    // Update press animations
    if (this.bombPressTimer > 0) {
      this.bombPressTimer -= deltaTime;
    }
    if (this.missilePressTimer > 0) {
      this.missilePressTimer -= deltaTime;
    }
  }

  /**
   * Set cooldown values (0-1)
   */
  setCooldowns(bombCooldown, missileCooldown) {
    this.bombCooldown = bombCooldown;
    this.missileCooldown = missileCooldown;
  }

  /**
   * Handle touch start
   */
  handleTouchStart(e) {
    for (const touch of e.changedTouches) {
      const pos = this.getTouchPosition(touch);

      // Check bomb button
      if (this.isInsideButton(pos, this.bombButton)) {
        this.bombButton.pressed = true;
        this.bombTouchId = touch.identifier;
        this.bombPressTimer = 0.2;

        if (this.onBomb) {
          this.onBomb();
        }
        e.preventDefault();
        continue;
      }

      // Check missile button
      if (this.isInsideButton(pos, this.missileButton)) {
        this.missileButton.pressed = true;
        this.missileTouchId = touch.identifier;
        this.missilePressTimer = 0.2;

        if (this.onMissile) {
          this.onMissile();
        }
        e.preventDefault();
        continue;
      }
    }
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    for (const touch of e.changedTouches) {
      if (touch.identifier === this.bombTouchId) {
        this.bombButton.pressed = false;
        this.bombTouchId = null;
      }
      if (touch.identifier === this.missileTouchId) {
        this.missileButton.pressed = false;
        this.missileTouchId = null;
      }
    }
  }

  /**
   * Check if position is inside button
   */
  isInsideButton(pos, button) {
    const dx = pos.x - button.x;
    const dy = pos.y - button.y;
    return (dx * dx + dy * dy) <= (this.buttonRadius * this.buttonRadius * 1.5);
  }

  /**
   * Get touch position relative to canvas
   */
  getTouchPosition(touch) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  /**
   * Render buttons
   */
  render(ctx) {
    this.renderButton(ctx, this.bombButton, this.bombPressTimer, 1 - this.bombCooldown);
    this.renderButton(ctx, this.missileButton, this.missilePressTimer, 1 - this.missileCooldown);
  }

  /**
   * Render a single button
   */
  renderButton(ctx, button, pressTimer, cooldownProgress) {
    ctx.save();

    const pressed = pressTimer > 0;
    const scale = pressed ? 0.9 : 1;

    ctx.translate(button.x, button.y);
    ctx.scale(scale, scale);

    // Button glow
    if (pressed) {
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.buttonRadius * 1.5);
      glowGradient.addColorStop(0, button.color);
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGradient;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, this.buttonRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Button background
    ctx.fillStyle = button.pressed ? button.color : 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(0, 0, this.buttonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Button border
    ctx.strokeStyle = button.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Cooldown overlay
    if (cooldownProgress < 1) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, this.buttonRadius, -Math.PI / 2, -Math.PI / 2 + (1 - cooldownProgress) * Math.PI * 2);
      ctx.lineTo(0, 0);
      ctx.fill();
    }

    // Button icon
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(button.icon, 0, 0);

    // Button label (below)
    ctx.font = '10px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(button.label, 0, this.buttonRadius + 15);

    ctx.restore();
  }

  /**
   * Reset button states
   */
  reset() {
    this.bombButton.pressed = false;
    this.missileButton.pressed = false;
    this.bombTouchId = null;
    this.missileTouchId = null;
    this.bombPressTimer = 0;
    this.missilePressTimer = 0;
  }

  /**
   * Cleanup
   */
  destroy() {
    // No event listeners to remove (handled by InputSystem)
  }
}

export default TouchButtons;
