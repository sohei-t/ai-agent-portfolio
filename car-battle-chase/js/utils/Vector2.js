/**
 * Vector2.js - 2D Vector Math Utilities
 * Provides efficient vector operations for game physics
 */

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Create a copy of this vector
   */
  clone() {
    return new Vector2(this.x, this.y);
  }

  /**
   * Set vector values
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Copy values from another vector
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Add another vector
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Subtract another vector
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Multiply by scalar
   */
  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Divide by scalar
   */
  div(scalar) {
    if (scalar !== 0) {
      this.x /= scalar;
      this.y /= scalar;
    }
    return this;
  }

  /**
   * Get magnitude (length) of vector
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Get squared magnitude (faster, no sqrt)
   */
  magSq() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Normalize vector to unit length
   */
  normalize() {
    const m = this.mag();
    if (m > 0) {
      this.div(m);
    }
    return this;
  }

  /**
   * Limit magnitude to max value
   */
  limit(max) {
    const magSq = this.magSq();
    if (magSq > max * max) {
      this.div(Math.sqrt(magSq)).mult(max);
    }
    return this;
  }

  /**
   * Set magnitude to specific value
   */
  setMag(len) {
    return this.normalize().mult(len);
  }

  /**
   * Get angle of vector in radians
   */
  heading() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotate vector by angle (radians)
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = this.x * cos - this.y * sin;
    const y = this.x * sin + this.y * cos;
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Linear interpolation to target vector
   */
  lerp(target, amount) {
    this.x += (target.x - this.x) * amount;
    this.y += (target.y - this.y) * amount;
    return this;
  }

  /**
   * Calculate dot product with another vector
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Calculate cross product (z-component of 3D cross)
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Calculate distance to another vector
   */
  dist(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate squared distance (faster)
   */
  distSq(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  /**
   * Check if equal to another vector
   */
  equals(v) {
    return this.x === v.x && this.y === v.y;
  }

  /**
   * Get array representation
   */
  toArray() {
    return [this.x, this.y];
  }

  /**
   * String representation
   */
  toString() {
    return `Vector2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }

  // ========== Static Methods ==========

  /**
   * Create vector from angle (radians)
   */
  static fromAngle(angle, length = 1) {
    return new Vector2(Math.cos(angle) * length, Math.sin(angle) * length);
  }

  /**
   * Create random vector
   */
  static random(minX = -1, maxX = 1, minY = -1, maxY = 1) {
    return new Vector2(
      minX + Math.random() * (maxX - minX),
      minY + Math.random() * (maxY - minY)
    );
  }

  /**
   * Create random unit vector
   */
  static randomUnit() {
    const angle = Math.random() * Math.PI * 2;
    return new Vector2(Math.cos(angle), Math.sin(angle));
  }

  /**
   * Add two vectors
   */
  static add(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  /**
   * Subtract two vectors
   */
  static sub(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  /**
   * Multiply vector by scalar
   */
  static mult(v, scalar) {
    return new Vector2(v.x * scalar, v.y * scalar);
  }

  /**
   * Divide vector by scalar
   */
  static div(v, scalar) {
    return new Vector2(v.x / scalar, v.y / scalar);
  }

  /**
   * Calculate distance between two vectors
   */
  static dist(v1, v2) {
    return v1.dist(v2);
  }

  /**
   * Linear interpolation between two vectors
   */
  static lerp(v1, v2, amount) {
    return new Vector2(
      v1.x + (v2.x - v1.x) * amount,
      v1.y + (v2.y - v1.y) * amount
    );
  }

  /**
   * Get angle between two vectors
   */
  static angleBetween(v1, v2) {
    const dot = v1.dot(v2);
    const mag = v1.mag() * v2.mag();
    if (mag === 0) return 0;
    return Math.acos(Math.max(-1, Math.min(1, dot / mag)));
  }

  /**
   * Zero vector
   */
  static zero() {
    return new Vector2(0, 0);
  }

  /**
   * Up vector (0, -1)
   */
  static up() {
    return new Vector2(0, -1);
  }

  /**
   * Down vector (0, 1)
   */
  static down() {
    return new Vector2(0, 1);
  }

  /**
   * Left vector (-1, 0)
   */
  static left() {
    return new Vector2(-1, 0);
  }

  /**
   * Right vector (1, 0)
   */
  static right() {
    return new Vector2(1, 0);
  }
}

export default Vector2;
