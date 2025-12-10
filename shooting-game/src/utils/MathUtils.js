/**
 * Mathematical utility functions for game calculations
 */
export class MathUtils {
  /**
   * Clamp a value between min and max
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Linear interpolation between two values
   * @param {number} start
   * @param {number} end
   * @param {number} t - Interpolation factor (0-1)
   * @returns {number}
   */
  static lerp(start, end, t) {
    return start + (end - start) * t;
  }

  /**
   * Map a value from one range to another
   * @param {number} value
   * @param {number} inMin
   * @param {number} inMax
   * @param {number} outMin
   * @param {number} outMax
   * @returns {number}
   */
  static map(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /**
   * Get a random number between min and max
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * Get a random integer between min and max (inclusive)
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Convert degrees to radians
   * @param {number} degrees
   * @returns {number}
   */
  static degToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert radians to degrees
   * @param {number} radians
   * @returns {number}
   */
  static radToDeg(radians) {
    return (radians * 180) / Math.PI;
  }

  /**
   * Check if a value is approximately equal to another (within epsilon)
   * @param {number} a
   * @param {number} b
   * @param {number} epsilon
   * @returns {boolean}
   */
  static approximately(a, b, epsilon = 0.0001) {
    return Math.abs(a - b) < epsilon;
  }

  /**
   * Wrap a value between 0 and max
   * @param {number} value
   * @param {number} max
   * @returns {number}
   */
  static wrap(value, max) {
    return ((value % max) + max) % max;
  }

  /**
   * Smooth step interpolation (ease in/out)
   * @param {number} edge0
   * @param {number} edge1
   * @param {number} x
   * @returns {number}
   */
  static smoothStep(edge0, edge1, x) {
    const t = this.clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  /**
   * Get sign of a number (-1, 0, or 1)
   * @param {number} value
   * @returns {number}
   */
  static sign(value) {
    return value > 0 ? 1 : value < 0 ? -1 : 0;
  }

  /**
   * Check if point is inside a rectangle
   * @param {number} px - Point x
   * @param {number} py - Point y
   * @param {number} rx - Rectangle x
   * @param {number} ry - Rectangle y
   * @param {number} rw - Rectangle width
   * @param {number} rh - Rectangle height
   * @returns {boolean}
   */
  static pointInRect(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }

  /**
   * Check if point is inside a circle
   * @param {number} px - Point x
   * @param {number} py - Point y
   * @param {number} cx - Circle center x
   * @param {number} cy - Circle center y
   * @param {number} radius - Circle radius
   * @returns {boolean}
   */
  static pointInCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= radius * radius;
  }

  /**
   * Check if two rectangles intersect (AABB collision)
   * @param {number} x1 - Rectangle 1 x
   * @param {number} y1 - Rectangle 1 y
   * @param {number} w1 - Rectangle 1 width
   * @param {number} h1 - Rectangle 1 height
   * @param {number} x2 - Rectangle 2 x
   * @param {number} y2 - Rectangle 2 y
   * @param {number} w2 - Rectangle 2 width
   * @param {number} h2 - Rectangle 2 height
   * @returns {boolean}
   */
  static rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  /**
   * Check if two circles intersect
   * @param {number} x1 - Circle 1 x
   * @param {number} y1 - Circle 1 y
   * @param {number} r1 - Circle 1 radius
   * @param {number} x2 - Circle 2 x
   * @param {number} y2 - Circle 2 y
   * @param {number} r2 - Circle 2 radius
   * @returns {boolean}
   */
  static circleIntersect(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distSquared = dx * dx + dy * dy;
    const radiusSum = r1 + r2;
    return distSquared <= radiusSum * radiusSum;
  }

  /**
   * Calculate Euclidean distance between two points (optimized - no sqrt)
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @returns {number} Squared distance
   */
  static distanceSquared(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
  }

  /**
   * Calculate Euclidean distance between two points
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @returns {number} Distance
   */
  static distance(x1, y1, x2, y2) {
    return Math.sqrt(this.distanceSquared(x1, y1, x2, y2));
  }

  /**
   * Get random item from array
   * @param {Array} array
   * @returns {any}
   */
  static randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Shuffle array in place (Fisher-Yates algorithm)
   * @param {Array} array
   * @returns {Array}
   */
  static shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
