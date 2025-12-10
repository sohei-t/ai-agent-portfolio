/**
 * 2D Vector utility class for game physics and movement calculations
 */
export class Vector2D {
  /**
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add another vector to this vector
   * @param {Vector2D} vector
   * @returns {Vector2D} New vector
   */
  add(vector) {
    return new Vector2D(this.x + vector.x, this.y + vector.y);
  }

  /**
   * Subtract another vector from this vector
   * @param {Vector2D} vector
   * @returns {Vector2D} New vector
   */
  subtract(vector) {
    return new Vector2D(this.x - vector.x, this.y - vector.y);
  }

  /**
   * Multiply vector by a scalar
   * @param {number} scalar
   * @returns {Vector2D} New vector
   */
  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  /**
   * Divide vector by a scalar
   * @param {number} scalar
   * @returns {Vector2D} New vector
   */
  divide(scalar) {
    if (scalar === 0) {
      console.warn('Division by zero in Vector2D');
      return new Vector2D(this.x, this.y);
    }
    return new Vector2D(this.x / scalar, this.y / scalar);
  }

  /**
   * Get magnitude (length) of the vector
   * @returns {number}
   */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Get squared magnitude (for performance - avoids sqrt)
   * @returns {number}
   */
  magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Normalize the vector (make it unit length)
   * @returns {Vector2D} New normalized vector
   */
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector2D(0, 0);
    }
    return this.divide(mag);
  }

  /**
   * Calculate dot product with another vector
   * @param {Vector2D} vector
   * @returns {number}
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Calculate distance to another vector
   * @param {Vector2D} vector
   * @returns {number}
   */
  distanceTo(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate squared distance to another vector (for performance)
   * @param {Vector2D} vector
   * @returns {number}
   */
  distanceSquaredTo(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return dx * dx + dy * dy;
  }

  /**
   * Limit the magnitude of the vector
   * @param {number} max - Maximum magnitude
   * @returns {Vector2D} New vector with limited magnitude
   */
  limit(max) {
    const magSq = this.magnitudeSquared();
    if (magSq > max * max) {
      return this.normalize().multiply(max);
    }
    return new Vector2D(this.x, this.y);
  }

  /**
   * Get angle of the vector in radians
   * @returns {number}
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Rotate the vector by an angle in radians
   * @param {number} angle - Angle in radians
   * @returns {Vector2D} New rotated vector
   */
  rotate(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2D(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }

  /**
   * Create a copy of this vector
   * @returns {Vector2D}
   */
  clone() {
    return new Vector2D(this.x, this.y);
  }

  /**
   * Set the x and y values
   * @param {number} x
   * @param {number} y
   */
  set(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Create a vector from an angle
   * @param {number} angle - Angle in radians
   * @param {number} magnitude - Length of the vector
   * @returns {Vector2D}
   */
  static fromAngle(angle, magnitude = 1) {
    return new Vector2D(
      Math.cos(angle) * magnitude,
      Math.sin(angle) * magnitude
    );
  }

  /**
   * Create a zero vector
   * @returns {Vector2D}
   */
  static zero() {
    return new Vector2D(0, 0);
  }

  /**
   * Create a unit vector pointing up
   * @returns {Vector2D}
   */
  static up() {
    return new Vector2D(0, -1);
  }

  /**
   * Create a unit vector pointing down
   * @returns {Vector2D}
   */
  static down() {
    return new Vector2D(0, 1);
  }

  /**
   * Create a unit vector pointing left
   * @returns {Vector2D}
   */
  static left() {
    return new Vector2D(-1, 0);
  }

  /**
   * Create a unit vector pointing right
   * @returns {Vector2D}
   */
  static right() {
    return new Vector2D(1, 0);
  }
}
