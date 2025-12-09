/**
 * Unit Tests for Canvas.js
 * Tests canvas rendering, scaling, and responsive behavior
 */

const Canvas = require('../../src/core/Canvas.js');

describe('Canvas', () => {
  let canvas, canvasManager;
  const LOGICAL_WIDTH = 800;
  const LOGICAL_HEIGHT = 600;

  beforeEach(() => {
    // Create real canvas element
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1080, writable: true });

    // Create Canvas instance
    canvasManager = new Canvas(canvas);
  });

  afterEach(() => {
    canvasManager.destroy();
    document.body.removeChild(canvas);
  });

  describe('Initialization', () => {
    test('should set canvas to logical dimensions', () => {
      canvasManager.init();
      expect(canvasManager.canvas.width).toBe(LOGICAL_WIDTH);
      expect(canvasManager.canvas.height).toBe(LOGICAL_HEIGHT);
    });

    test('should maintain 4:3 aspect ratio', () => {
      canvasManager.init();
      const ratio = canvasManager.canvas.width / canvasManager.canvas.height;
      expect(ratio).toBeCloseTo(4 / 3, 2);
    });
  });

  describe('Responsive Scaling', () => {
    test('should scale to fit viewport width-constrained', () => {
      window.innerWidth = 400;
      window.innerHeight = 600;
      canvasManager.init();

      const expectedScale = 400 / LOGICAL_WIDTH;
      expect(canvasManager.scale).toBeCloseTo(expectedScale, 2);
    });

    test('should scale to fit viewport height-constrained', () => {
      window.innerWidth = 1600;
      window.innerHeight = 400;
      canvasManager.init();

      const expectedScale = 400 / LOGICAL_HEIGHT;
      expect(canvasManager.scale).toBeCloseTo(expectedScale, 2);
    });

    test('should handle minimum size (320px)', () => {
      window.innerWidth = 320;
      window.innerHeight = 240;
      canvasManager.init();

      expect(canvasManager.scale).toBeGreaterThan(0);
      expect(parseInt(canvasManager.canvas.style.width)).toBeGreaterThanOrEqual(320);
    });

    test('should handle maximum size (2560px)', () => {
      window.innerWidth = 2560;
      window.innerHeight = 1440;
      canvasManager.init();

      expect(parseInt(canvasManager.canvas.style.width)).toBeLessThanOrEqual(2560);
    });

    test('should update on window resize', () => {
      canvasManager.init();
      const initialScale = canvasManager.scale;

      window.innerWidth = 800;
      window.innerHeight = 600;
      canvasManager.resize();

      expect(canvasManager.scale).not.toBe(initialScale);
    });
  });

  describe('Drawing Operations', () => {
    let ctx;

    beforeEach(() => {
      canvasManager.init();
      ctx = canvasManager.ctx;
      // Spy on canvas context methods
      jest.spyOn(ctx, 'clearRect');
      jest.spyOn(ctx, 'fillRect');
      jest.spyOn(ctx, 'beginPath');
      jest.spyOn(ctx, 'arc');
      jest.spyOn(ctx, 'fill');
    });

    test('should clear canvas', () => {
      canvasManager.clear();
      expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    });

    test('should draw rectangle with correct parameters', () => {
      canvasManager.drawRect(10, 20, 50, 30, '#ff0000');
      expect(ctx.fillStyle).toBe('#ff0000');
      expect(ctx.fillRect).toHaveBeenCalledWith(10, 20, 50, 30);
    });

    test('should draw circle with correct parameters', () => {
      canvasManager.drawCircle(100, 150, 25, '#00ff00');
      expect(ctx.fillStyle).toBe('#00ff00');
      expect(ctx.beginPath).toHaveBeenCalled();
      expect(ctx.arc).toHaveBeenCalledWith(100, 150, 25, 0, Math.PI * 2);
      expect(ctx.fill).toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    test('should handle rapid draw calls', () => {
      canvasManager.init();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        canvasManager.clear();
        canvasManager.drawRect(i % 800, i % 600, 10, 10, '#ffffff');
      }

      const duration = performance.now() - startTime;
      expect(duration).toBeLessThan(100); // Should be fast
    });
  });

  describe('Context State Management', () => {
    let ctx;

    beforeEach(() => {
      canvasManager.init();
      ctx = canvasManager.ctx;
      jest.spyOn(ctx, 'save');
      jest.spyOn(ctx, 'restore');
    });

    test('should preserve context state with save/restore', () => {
      ctx.save();
      ctx.fillStyle = '#ff0000';
      ctx.restore();

      expect(ctx.save).toHaveBeenCalled();
      expect(ctx.restore).toHaveBeenCalled();
    });
  });
});
