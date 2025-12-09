/**
 * Unit Tests for Vector2D.js
 * Tests 2D vector mathematics operations
 */

const Vector2D = require('../../src/utils/Vector2D.js');

describe('Vector2D', () => {

  describe('Constructor', () => {
    test('should create vector with given coordinates', () => {
      const v = new Vector2D(3, 4);
      expect(v.x).toBe(3);
      expect(v.y).toBe(4);
    });

    test('should default to (0, 0) when no arguments', () => {
      const v = new Vector2D();
      expect(v.x).toBe(0);
      expect(v.y).toBe(0);
    });
  });

  describe('Addition', () => {
    test('should add two vectors correctly', () => {
      const v1 = new Vector2D(1, 2);
      const v2 = new Vector2D(3, 4);
      const result = v1.add(v2);
      expect(result.x).toBe(4);
      expect(result.y).toBe(6);
    });

    test('should not modify original vectors', () => {
      const v1 = new Vector2D(1, 2);
      const v2 = new Vector2D(3, 4);
      v1.add(v2);
      expect(v1.x).toBe(1);
      expect(v1.y).toBe(2);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two vectors correctly', () => {
      const v1 = new Vector2D(5, 7);
      const v2 = new Vector2D(2, 3);
      const result = v1.subtract(v2);
      expect(result.x).toBe(3);
      expect(result.y).toBe(4);
    });

    test('should handle negative results', () => {
      const v1 = new Vector2D(1, 2);
      const v2 = new Vector2D(3, 5);
      const result = v1.subtract(v2);
      expect(result.x).toBe(-2);
      expect(result.y).toBe(-3);
    });
  });

  describe('Scalar Multiplication', () => {
    test('should multiply vector by scalar', () => {
      const v = new Vector2D(2, 3);
      const result = v.multiply(3);
      expect(result.x).toBe(6);
      expect(result.y).toBe(9);
    });

    test('should handle negative scalar', () => {
      const v = new Vector2D(2, 3);
      const result = v.multiply(-2);
      expect(result.x).toBe(-4);
      expect(result.y).toBe(-6);
    });

    test('should handle zero scalar', () => {
      const v = new Vector2D(5, 7);
      const result = v.multiply(0);
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
    });
  });

  describe('Scalar Division', () => {
    test('should divide vector by scalar', () => {
      const v = new Vector2D(6, 9);
      const result = v.divide(3);
      expect(result.x).toBe(2);
      expect(result.y).toBe(3);
    });

    test('should throw error on division by zero', () => {
      const v = new Vector2D(5, 7);
      expect(() => v.divide(0)).toThrow('Division by zero');
    });
  });

  describe('Magnitude', () => {
    test('should calculate magnitude correctly', () => {
      const v = new Vector2D(3, 4);
      expect(v.magnitude()).toBe(5);
    });

    test('should return 0 for zero vector', () => {
      const v = new Vector2D(0, 0);
      expect(v.magnitude()).toBe(0);
    });

    test('should handle negative coordinates', () => {
      const v = new Vector2D(-3, -4);
      expect(v.magnitude()).toBe(5);
    });
  });

  describe('Normalization', () => {
    test('should create unit vector', () => {
      const v = new Vector2D(3, 4);
      const normalized = v.normalize();
      expect(normalized.magnitude()).toBeCloseTo(1, 5);
    });

    test('should maintain direction', () => {
      const v = new Vector2D(5, 0);
      const normalized = v.normalize();
      expect(normalized.x).toBeCloseTo(1, 5);
      expect(normalized.y).toBeCloseTo(0, 5);
    });

    test('should return zero vector when normalizing zero vector', () => {
      const v = new Vector2D(0, 0);
      const normalized = v.normalize();
      expect(normalized.x).toBe(0);
      expect(normalized.y).toBe(0);
    });
  });

  describe('Distance', () => {
    test('should calculate distance between two vectors', () => {
      const v1 = new Vector2D(0, 0);
      const v2 = new Vector2D(3, 4);
      expect(v1.distance(v2)).toBe(5);
    });

    test('should be symmetric', () => {
      const v1 = new Vector2D(1, 2);
      const v2 = new Vector2D(4, 6);
      expect(v1.distance(v2)).toBe(v2.distance(v1));
    });
  });

  describe('Dot Product', () => {
    test('should calculate dot product correctly', () => {
      const v1 = new Vector2D(2, 3);
      const v2 = new Vector2D(4, 5);
      expect(v1.dot(v2)).toBe(23); // 2*4 + 3*5
    });

    test('should return 0 for perpendicular vectors', () => {
      const v1 = new Vector2D(1, 0);
      const v2 = new Vector2D(0, 1);
      expect(v1.dot(v2)).toBe(0);
    });
  });

  describe('Clone', () => {
    test('should create independent copy', () => {
      const v1 = new Vector2D(3, 4);
      const v2 = v1.clone();
      v2.x = 10;
      expect(v1.x).toBe(3);
      expect(v2.x).toBe(10);
    });
  });

  describe('Equality', () => {
    test('should detect equal vectors', () => {
      const v1 = new Vector2D(3, 4);
      const v2 = new Vector2D(3, 4);
      expect(v1.equals(v2)).toBe(true);
    });

    test('should handle floating point precision', () => {
      const v1 = new Vector2D(0.1 + 0.2, 0);
      const v2 = new Vector2D(0.3, 0);
      expect(v1.equals(v2)).toBe(true);
    });

    test('should detect unequal vectors', () => {
      const v1 = new Vector2D(3, 4);
      const v2 = new Vector2D(3, 5);
      expect(v1.equals(v2)).toBe(false);
    });
  });
});
