/**
 * Unit Tests for InputHandler.js
 * Tests unified keyboard and touch input handling
 */

const InputHandler = require('../../src/core/InputHandler.js');

describe('InputHandler', () => {
  let inputHandler;

  beforeEach(() => {
    inputHandler = new InputHandler();
  });

  describe('Initialization', () => {
    test('should initialize with empty keys', () => {
      inputHandler.init();
      expect(Object.keys(inputHandler.keys)).toHaveLength(0);
    });

    test('should initialize with empty touches', () => {
      inputHandler.init();
      expect(Object.keys(inputHandler.touches)).toHaveLength(0);
    });

    test('should have touch zone multiplier of 1.3', () => {
      expect(inputHandler.touchZoneMultiplier).toBe(1.3);
    });
  });

  describe('Keyboard Input', () => {
    beforeEach(() => {
      inputHandler.init();
    });

    test('should detect left arrow key', () => {
      inputHandler.setKeyPressed('ArrowLeft', true);
      expect(inputHandler.isMovingLeft()).toBe(true);
    });

    test('should detect right arrow key', () => {
      inputHandler.setKeyPressed('ArrowRight', true);
      expect(inputHandler.isMovingRight()).toBe(true);
    });

    test('should detect spacebar for shooting', () => {
      inputHandler.setKeyPressed(' ', true);
      expect(inputHandler.isShooting()).toBe(true);
    });

    test('should detect pause key (P)', () => {
      inputHandler.setKeyPressed('p', true);
      expect(inputHandler.isPaused()).toBe(true);
    });

    test('should detect escape key for pause', () => {
      inputHandler.setKeyPressed('Escape', true);
      expect(inputHandler.isPaused()).toBe(true);
    });

    test('should support WASD controls', () => {
      inputHandler.setKeyPressed('a', true);
      expect(inputHandler.isMovingLeft()).toBe(true);

      inputHandler.setKeyPressed('a', false);
      inputHandler.setKeyPressed('d', true);
      expect(inputHandler.isMovingRight()).toBe(true);
    });

    test('should handle key release', () => {
      inputHandler.setKeyPressed('ArrowLeft', true);
      expect(inputHandler.isMovingLeft()).toBe(true);

      inputHandler.setKeyPressed('ArrowLeft', false);
      expect(inputHandler.isMovingLeft()).toBe(false);
    });

    test('should handle simultaneous keys', () => {
      inputHandler.setKeyPressed('ArrowLeft', true);
      inputHandler.setKeyPressed(' ', true);

      expect(inputHandler.isMovingLeft()).toBe(true);
      expect(inputHandler.isShooting()).toBe(true);
    });
  });

  describe('Touch Input', () => {
    beforeEach(() => {
      inputHandler.init();
    });

    test('should register touch position', () => {
      inputHandler.setTouch(0, 100, 200);
      const touch = inputHandler.getTouchPosition(0);

      expect(touch).not.toBeNull();
      expect(touch.x).toBe(100);
      expect(touch.y).toBe(200);
    });

    test('should handle multiple simultaneous touches', () => {
      inputHandler.setTouch(0, 100, 200);
      inputHandler.setTouch(1, 300, 400);

      const touch0 = inputHandler.getTouchPosition(0);
      const touch1 = inputHandler.getTouchPosition(1);

      expect(touch0).not.toBeNull();
      expect(touch1).not.toBeNull();
      expect(touch0.x).toBe(100);
      expect(touch1.x).toBe(300);
    });

    test('should detect shooting from touch', () => {
      inputHandler.setTouch(0, 100, 200);
      expect(inputHandler.isShooting()).toBe(true);
    });

    test('should clear touch on release', () => {
      inputHandler.setTouch(0, 100, 200);
      expect(inputHandler.getTouchPosition(0)).not.toBeNull();

      inputHandler.clearTouch(0);
      expect(inputHandler.getTouchPosition(0)).toBeNull();
    });

    test('should return null for non-existent touch', () => {
      const touch = inputHandler.getTouchPosition(5);
      expect(touch).toBeNull();
    });
  });

  describe('Hybrid Input', () => {
    test('should handle keyboard and touch simultaneously', () => {
      inputHandler.setKeyPressed('ArrowLeft', true);
      inputHandler.setTouch(0, 400, 500);

      expect(inputHandler.isMovingLeft()).toBe(true);
      expect(inputHandler.isShooting()).toBe(true);
    });

    test('should prioritize any input method', () => {
      inputHandler.setKeyPressed(' ', true);
      expect(inputHandler.isShooting()).toBe(true);

      inputHandler.setKeyPressed(' ', false);
      inputHandler.setTouch(0, 100, 100);
      expect(inputHandler.isShooting()).toBe(true);
    });
  });

  describe('Reset', () => {
    test('should clear all keyboard input', () => {
      inputHandler.setKeyPressed('ArrowLeft', true);
      inputHandler.setKeyPressed(' ', true);

      inputHandler.reset();

      expect(Object.keys(inputHandler.keys)).toHaveLength(0);
      expect(inputHandler.isMovingLeft()).toBe(false);
      expect(inputHandler.isShooting()).toBe(false);
    });

    test('should clear all touch input', () => {
      inputHandler.setTouch(0, 100, 200);
      inputHandler.setTouch(1, 300, 400);

      inputHandler.reset();

      expect(Object.keys(inputHandler.touches)).toHaveLength(0);
      expect(inputHandler.getTouchPosition(0)).toBeNull();
    });
  });

  describe('Case Insensitivity', () => {
    test('should handle both uppercase and lowercase keys', () => {
      inputHandler.setKeyPressed('p', true);
      expect(inputHandler.isPaused()).toBe(true);

      inputHandler.setKeyPressed('p', false);
      inputHandler.setKeyPressed('P', true);
      expect(inputHandler.isPaused()).toBe(true);
    });

    test('should support both a/A and d/D for movement', () => {
      inputHandler.setKeyPressed('A', true);
      expect(inputHandler.isMovingLeft()).toBe(true);

      inputHandler.setKeyPressed('A', false);
      inputHandler.setKeyPressed('D', true);
      expect(inputHandler.isMovingRight()).toBe(true);
    });
  });

  describe('Touch Zone Enlargement', () => {
    test('should have 30% larger touch zones', () => {
      expect(inputHandler.touchZoneMultiplier).toBe(1.3);
    });

    test('should apply multiplier to button sizes', () => {
      const baseButtonSize = 60;
      const enlargedSize = baseButtonSize * inputHandler.touchZoneMultiplier;

      expect(enlargedSize).toBe(78);
    });
  });
});
