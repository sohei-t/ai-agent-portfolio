/**
 * InputHandler - Manages keyboard, mouse, and touch input
 */
import { CONTROLS } from '../config/gameConfig.js';

export class InputHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Map();
    this.mousePos = { x: 0, y: 0 };
    this.touchPos = { x: 0, y: 0 };
    this.isTouching = false;
    this.shootPressed = false;
    this.bombPressed = false;
    this.virtualDirection = { x: 0, y: 0 };

    this.init();
  }

  init() {
    // Keyboard events
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));

    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));

    // Touch events
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

    // Prevent context menu on right-click
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  handleKeyDown(e) {
    this.keys.set(e.key, true);

    // Prevent default for game keys
    if (this.isGameKey(e.key)) {
      e.preventDefault();
    }
  }

  handleKeyUp(e) {
    this.keys.set(e.key, false);
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.mousePos.x = (e.clientX - rect.left) * scaleX;
    this.mousePos.y = (e.clientY - rect.top) * scaleY;
  }

  handleMouseDown(e) {
    this.shootPressed = true;
  }

  handleMouseUp(e) {
    this.shootPressed = false;
  }

  handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      this.isTouching = true;
      this.updateTouchPosition(e.touches[0]);
      this.shootPressed = true; // allow tap-to-start / tap-to-fire on mobile
    }
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      this.updateTouchPosition(e.touches[0]);
    }
  }

  handleTouchEnd(e) {
    e.preventDefault();
    this.isTouching = false;
    this.shootPressed = false;
  }

  updateTouchPosition(touch) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.touchPos.x = (touch.clientX - rect.left) * scaleX;
    this.touchPos.y = (touch.clientY - rect.top) * scaleY;
  }

  isGameKey(key) {
    const allKeys = Object.values(CONTROLS.KEYBOARD).flat();
    return allKeys.includes(key);
  }

  isKeyPressed(keyNames) {
    if (!Array.isArray(keyNames)) {
      keyNames = [keyNames];
    }
    return keyNames.some(key => this.keys.get(key) === true);
  }

  isUpPressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.UP);
  }

  isDownPressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.DOWN);
  }

  isLeftPressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.LEFT);
  }

  isRightPressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.RIGHT);
  }

  isShootPressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.SHOOT) || this.shootPressed;
  }

  isBombPressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.BOMB) || this.bombPressed;
  }

  isPausePressed() {
    return this.isKeyPressed(CONTROLS.KEYBOARD.PAUSE);
  }

  getTouchPosition() {
    return this.isTouching ? this.touchPos : null;
  }

  getMousePosition() {
    return this.mousePos;
  }

  reset() {
    this.keys.clear();
    this.shootPressed = false;
    this.isTouching = false;
    this.bombPressed = false;
    this.virtualDirection = { x: 0, y: 0 };
  }

  /**
   * External hook for virtual joystick
   */
  setVirtualDirection(x, y) {
    this.virtualDirection = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    };
  }

  getVirtualDirection() {
    return this.virtualDirection;
  }

  /**
   * External hook for virtual fire button
   */
  setShootPressed(pressed) {
    this.shootPressed = pressed;
  }

  /**
   * External hook for bomb button
   */
  setBombPressed(pressed) {
    this.bombPressed = pressed;
  }
}
