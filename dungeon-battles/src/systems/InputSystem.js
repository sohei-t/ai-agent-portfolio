/**
 * InputSystem - Handles keyboard and touch input
 * Supports both PC (keyboard) and mobile (touch) controls
 */
import { VirtualJoystick } from '../ui/VirtualJoystick.js';
import { TouchZoneControls } from './TouchZoneControls.js?v=2';
import { GyroControls } from './GyroControls.js?v=9';

export class InputSystem {
  constructor(canvas, config = {}) {
    console.log('[InputSystem] Constructor called with config:', config);

    this.canvas = canvas;
    this.keys = new Map();
    this.mousePos = { x: 0, y: 0 };
    this.touches = [];
    this.buttonStates = new Map();

    // Default configuration
    const defaultConfig = {
      virtualJoystick: {
        position: { x: 100, y: 500 },
        radius: 50,
        opacity: 0.6
      },
      attackButton: {
        enabled: true,
        position: { x: 700, y: 500 },
        size: 60,
        label: 'ATK'
      },
      magicButton: {
        enabled: true,
        position: { x: 650, y: 420 },
        size: 60,
        label: 'MAG'
      }
    };

    // Merge configs
    const finalConfig = {
      virtualJoystick: config && config.virtualJoystick ? config.virtualJoystick : defaultConfig.virtualJoystick,
      attackButton: config && config.attackButton ? config.attackButton : defaultConfig.attackButton,
      magicButton: config && config.magicButton ? config.magicButton : defaultConfig.magicButton
    };

    console.log('[InputSystem] Final config:', finalConfig);

    // Virtual joystick for mobile
    console.log('[InputSystem] Creating VirtualJoystick with:', finalConfig.virtualJoystick);
    this.virtualJoystick = new VirtualJoystick(finalConfig.virtualJoystick);

    // Touch buttons for mobile
    this.attackButton = {
      enabled: finalConfig.attackButton.enabled,
      x: finalConfig.attackButton.position.x,
      y: finalConfig.attackButton.position.y,
      size: finalConfig.attackButton.size,
      label: finalConfig.attackButton.label,
      pressed: false,
      touching: false
    };

    this.magicButton = {
      enabled: finalConfig.magicButton.enabled,
      x: finalConfig.magicButton.position.x,
      y: finalConfig.magicButton.position.y,
      size: finalConfig.magicButton.size,
      label: finalConfig.magicButton.label,
      pressed: false,
      touching: false
    };

    this.isMobile = this.detectMobile();

    // Touch tap detection
    this.lastTouchX = 0;
    this.lastTouchY = 0;
    this.lastTapX = 0;
    this.lastTapY = 0;
    this.touchStarted = false;
    this.tapDetected = false;

    // Callback to check if in game (set by GameCore)
    this.isInGame = null;

    // New mobile controls
    this.touchZoneControls = new TouchZoneControls(canvas);
    this.gyroControls = new GyroControls();

    // Control mode for mobile - Default to gyro for better UX
    this.mobileControlMode = 'gyro'; // 'touchZone', 'gyro', 'virtualJoystick'
  }

  /**
   * Initialize input listeners
   */
  init() {
    // Keyboard events
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });

    // Enable mobile controls if mobile
    if (this.isMobile) {
      // Try to initialize and enable gyro controls first (better UX)
      this.gyroControls.init().then(success => {
        if (success) {
          console.log('[InputSystem] Gyro controls enabled as default');
          this.gyroControls.enable();
          this.touchZoneControls.disable();
        } else {
          // Fallback to touch zone if gyro not available
          console.log('[InputSystem] Gyro not available, falling back to touch zone');
          this.mobileControlMode = 'touchZone';
          this.touchZoneControls.enable();
        }
      });
    }

    console.log('[InputSystem] Initialized', this.isMobile ? '(Mobile)' : '(Desktop)');
  }

  /**
   * Detect if device is mobile
   */
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Handle keyboard down
   */
  handleKeyDown(e) {
    this.keys.set(e.key, true);
    this.keys.set(e.key.toLowerCase(), true);

    // Prevent default for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'b', 'B'].includes(e.key)) {
      e.preventDefault();
    }
  }

  /**
   * Handle keyboard up
   */
  handleKeyUp(e) {
    this.keys.set(e.key, false);
    this.keys.set(e.key.toLowerCase(), false);
  }

  /**
   * Handle mouse move
   */
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos.x = e.clientX - rect.left;
    this.mousePos.y = e.clientY - rect.top;
  }

  /**
   * Handle mouse down
   */
  handleMouseDown(e) {
    this.buttonStates.set('mouse', true);
  }

  /**
   * Handle mouse up
   */
  handleMouseUp(e) {
    this.buttonStates.set('mouse', false);
  }

  /**
   * Handle touch start
   */
  handleTouchStart(e) {
    console.log('[InputSystem] Touch start detected');

    // Only prevent default if we're in game (not in menu)
    // This allows menu touch events to work properly
    if (this.isInGame && this.isInGame()) {
      e.preventDefault();
    }

    this.touches = Array.from(e.touches);

    // Store touch start position for menu interactions
    if (this.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();

      // Calculate the actual position considering canvas scaling
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;

      const clientX = this.touches[0].clientX - rect.left;
      const clientY = this.touches[0].clientY - rect.top;

      this.lastTouchX = clientX * scaleX;
      this.lastTouchY = clientY * scaleY;
      this.touchStarted = true;

      console.log(`[InputSystem] Canvas size: ${this.canvas.width}x${this.canvas.height}, Screen size: ${rect.width}x${rect.height}`);
      console.log(`[InputSystem] Scale: ${scaleX}x${scaleY}`);
      console.log(`[InputSystem] Client coords: ${clientX}, ${clientY}`);
      console.log(`[InputSystem] Scaled coords: ${this.lastTouchX}, ${this.lastTouchY}`);
    }

    // Check button presses
    this.touches.forEach(touch => {
      const rect = this.canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (this.isInsideButton(this.attackButton, x, y)) {
        this.attackButton.pressed = true;
        this.attackButton.touching = true;
      }

      if (this.isInsideButton(this.magicButton, x, y)) {
        this.magicButton.pressed = true;
        this.magicButton.touching = true;
      }
    });
  }

  /**
   * Handle touch move
   */
  handleTouchMove(e) {
    if (this.isInGame && this.isInGame()) {
      e.preventDefault();
    }
    this.touches = Array.from(e.touches);
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    console.log('[InputSystem] Touch end detected');

    if (this.isInGame && this.isInGame()) {
      e.preventDefault();
    }

    // Check for tap (touch start and end at same position)
    if (this.touchStarted && e.changedTouches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();

      // Calculate the actual position considering canvas scaling
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;

      const clientX = e.changedTouches[0].clientX - rect.left;
      const clientY = e.changedTouches[0].clientY - rect.top;

      const endX = clientX * scaleX;
      const endY = clientY * scaleY;

      // If touch hasn't moved much, consider it a tap (check in canvas coordinates)
      const distance = Math.sqrt(Math.pow(endX - this.lastTouchX, 2) + Math.pow(endY - this.lastTouchY, 2));
      if (distance < 20) {  // Increased threshold for mobile
        this.lastTapX = endX;
        this.lastTapY = endY;
        this.tapDetected = true;
        console.log(`[InputSystem] Tap detected at canvas coords: ${endX}, ${endY}`);

        // Check if tap is on control mode switcher
        this.handleControlModeTap(endX, endY);
      }
    }
    this.touchStarted = false;

    this.touches = Array.from(e.touches);

    // Release buttons if no longer touching
    if (!this.touches.some(t => this.isInsideButton(this.attackButton, t.clientX, t.clientY))) {
      this.attackButton.pressed = false;
      this.attackButton.touching = false;
    }

    if (!this.touches.some(t => this.isInsideButton(this.magicButton, t.clientX, t.clientY))) {
      this.magicButton.pressed = false;
      this.magicButton.touching = false;
    }
  }

  /**
   * Check if point is inside button
   */
  isInsideButton(button, x, y) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;
    const dx = canvasX - button.x;
    const dy = canvasY - button.y;
    return Math.sqrt(dx * dx + dy * dy) < button.size / 2;
  }

  /**
   * Update input state
   */
  update() {
    // Update mobile controls based on mode
    if (this.isMobile && this.isInGame && this.isInGame()) {
      switch (this.mobileControlMode) {
        case 'touchZone':
          this.touchZoneControls.update(this.touches);
          break;
        case 'virtualJoystick':
          this.virtualJoystick.update(this.touches);
          break;
        case 'gyro':
          // Gyro updates automatically via events
          break;
      }
    }
  }

  /**
   * Check if key is down
   */
  isKeyDown(key) {
    return this.keys.get(key) || false;
  }

  /**
   * Get movement axis (works for both keyboard and mobile controls)
   */
  getMovementAxis() {
    if (this.isMobile && this.isInGame && this.isInGame()) {
      switch (this.mobileControlMode) {
        case 'touchZone':
          return this.touchZoneControls.getAxis();
        case 'gyro':
          return this.gyroControls.getAxis();
        case 'virtualJoystick':
          if (this.virtualJoystick.isActive()) {
            return this.virtualJoystick.getAxis();
          }
          break;
      }
    }

    // Keyboard input
    let x = 0;
    let y = 0;

    if (this.isKeyDown('ArrowLeft') || this.isKeyDown('a')) x -= 1;
    if (this.isKeyDown('ArrowRight') || this.isKeyDown('d')) x += 1;
    if (this.isKeyDown('ArrowUp') || this.isKeyDown('w')) y -= 1;
    if (this.isKeyDown('ArrowDown') || this.isKeyDown('s')) y += 1;

    // Normalize diagonal movement
    if (x !== 0 && y !== 0) {
      const length = Math.sqrt(x * x + y * y);
      x /= length;
      y /= length;
    }

    return { x, y };
  }

  /**
   * Check if attack button is pressed
   */
  isAttackPressed() {
    if (this.isMobile && this.isInGame && this.isInGame()) {
      switch (this.mobileControlMode) {
        case 'touchZone':
          return this.touchZoneControls.isAttackPressed();
        case 'gyro':
          // With gyro, any active touch triggers attack
          // Simply check if there are touches
          return this.touches.length > 0;
        case 'virtualJoystick':
          const pressed = this.attackButton.pressed;
          this.attackButton.pressed = false; // Reset after check
          return pressed;
      }
    }
    return this.isKeyDown(' ');
  }

  /**
   * Check if magic button is pressed
   */
  isMagicPressed() {
    if (this.isMobile && this.isInGame && this.isInGame()) {
      switch (this.mobileControlMode) {
        case 'touchZone':
          return this.touchZoneControls.isMagicPressed();
        case 'gyro':
          // With gyro, double tap is magic
          return this.touches.length >= 2;
        case 'virtualJoystick':
          const pressed = this.magicButton.pressed;
          this.magicButton.pressed = false; // Reset after check
          return pressed;
      }
    }
    return this.isKeyDown('b') || this.isKeyDown('B');
  }

  /**
   * Check if there was a tap at the given position
   */
  checkTap() {
    if (this.tapDetected) {
      const tap = { x: this.lastTapX, y: this.lastTapY };
      this.tapDetected = false; // Clear after reading - IMPORTANT!
      console.log(`[InputSystem] checkTap() returning tap at ${tap.x}, ${tap.y} and clearing flag`);
      return tap;
    }
    return null;
  }

  /**
   * Get last tap position
   */
  getLastTap() {
    return { x: this.lastTapX, y: this.lastTapY };
  }

  /**
   * Set game state callback
   */
  setGameStateCallback(callback) {
    this.isInGame = callback;
  }

  /**
   * Render mobile controls
   */
  renderMobileControls(ctx) {
    if (!this.isMobile || !this.isInGame || !this.isInGame()) return;

    switch (this.mobileControlMode) {
      case 'touchZone':
        this.touchZoneControls.render(ctx);
        break;
      case 'gyro':
        this.gyroControls.renderDebug(ctx);
        break;
      case 'virtualJoystick':
        this.virtualJoystick.render(ctx);
        this.renderButton(ctx, this.attackButton);
        this.renderButton(ctx, this.magicButton);
        break;
    }

    // Render control mode switcher
    this.renderControlModeSwitcher(ctx);
  }

  /**
   * Handle tap on control mode switcher
   */
  handleControlModeTap(x, y) {
    if (!this.isMobile || !this.isInGame || !this.isInGame()) return;

    const switcherY = 50;
    const modes = ['gyro', 'touchZone'];

    // Check if tap is in switcher area - larger hit area
    if (y >= switcherY - 15 && y <= switcherY + 15) {
      modes.forEach((mode, i) => {
        const buttonX = this.canvas.width - 140 + (i * 90);
        if (x >= buttonX - 40 && x <= buttonX + 40) {
          // Switch to this mode
          if (mode === 'gyro' && !this.gyroControls.permissionGranted) {
            // Try to request permission for gyro
            this.gyroControls.init().then(success => {
              if (success) {
                this.mobileControlMode = 'gyro';
                this.gyroControls.enable();
                this.touchZoneControls.disable();
                console.log('[InputSystem] Switched to gyro controls');
              }
            });
          } else if (mode === 'gyro') {
            this.mobileControlMode = 'gyro';
            this.gyroControls.enable();
            this.touchZoneControls.disable();
            console.log('[InputSystem] Switched to gyro controls');
          } else {
            this.mobileControlMode = 'touchZone';
            this.touchZoneControls.enable();
            this.gyroControls.disable();
            console.log('[InputSystem] Switched to touch zone controls');
          }
        }
      });
    }
  }

  /**
   * Render control mode switcher
   */
  renderControlModeSwitcher(ctx) {
    ctx.save();

    // Make it more visible - larger and positioned better
    const y = 50;
    const modes = ['gyro', 'touchZone'];
    const labels = ['🎯 傾き操作', '👆 タッチ操作'];

    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';

    // Draw control mode label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('操作モード:', this.canvas.width - 120, y - 20);

    modes.forEach((mode, i) => {
      const x = this.canvas.width - 140 + (i * 90);
      const isActive = this.mobileControlMode === mode;

      // Larger background with better visibility
      ctx.fillStyle = isActive ? 'rgba(0, 255, 100, 0.5)' : 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(x - 40, y - 15, 80, 30);

      // Border for better visibility
      ctx.strokeStyle = isActive ? '#00FF00' : '#666666';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 40, y - 15, 80, 30);

      // Text with better contrast
      ctx.font = isActive ? 'bold 12px Arial' : '12px Arial';
      ctx.fillStyle = isActive ? '#00FF00' : '#CCCCCC';
      ctx.fillText(labels[i], x, y);
    });

    // Show instructions for current mode
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    const instruction = this.mobileControlMode === 'gyro'
      ? '傾けた方向に移動・タップで攻撃'
      : '画面の各エリアをタップで操作';
    ctx.fillText(instruction, this.canvas.width / 2, this.canvas.height - 20);

    ctx.restore();
  }

  /**
   * Render a single button
   */
  renderButton(ctx, button) {
    if (!button.enabled) return;

    ctx.save();
    ctx.globalAlpha = 0.5;

    // Button circle
    ctx.fillStyle = button.touching ? '#00ffff' : '#ffffff';
    ctx.beginPath();
    ctx.arc(button.x, button.y, button.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Button label
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(button.label, button.x, button.y);

    ctx.restore();
  }

  /**
   * Get whether mobile mode is active
   */
  isMobileMode() {
    return this.isMobile;
  }
}
