/**
 * Vector2D.js
 * 2D vector mathematics operations
 */

class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    if (scalar === 0) throw new Error('Division by zero');
    return new Vector2D(this.x / scalar, this.y / scalar);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const mag = this.magnitude();
    if (mag === 0) return new Vector2D(0, 0);
    return this.divide(mag);
  }

  distance(other) {
    return this.subtract(other).magnitude();
  }

  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

  equals(other, epsilon = 0.0001) {
    return Math.abs(this.x - other.x) < epsilon &&
           Math.abs(this.y - other.y) < epsilon;
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Vector2D = Vector2D;
}
