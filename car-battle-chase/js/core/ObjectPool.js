/**
 * ObjectPool.js - Object Pool Pattern Implementation
 * Reduces garbage collection by reusing objects
 */

export class ObjectPool {
  /**
   * Create an object pool
   * @param {Function} factory - Factory function to create new objects
   * @param {number} initialSize - Initial pool size
   */
  constructor(factory, initialSize = 10) {
    this.factory = factory;
    this.pool = [];
    this.active = [];

    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      const obj = this.factory();
      obj._pooled = true;
      this.pool.push(obj);
    }
  }

  /**
   * Acquire an object from the pool
   * @returns {Object} An object from the pool
   */
  acquire() {
    let obj;

    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else {
      // Pool is empty, create new object
      obj = this.factory();
      obj._pooled = true;
    }

    obj.active = true;
    this.active.push(obj);
    return obj;
  }

  /**
   * Release an object back to the pool
   * @param {Object} obj - Object to release
   */
  release(obj) {
    const index = this.active.indexOf(obj);
    if (index === -1) return;

    // Remove from active list
    this.active.splice(index, 1);

    // Reset and return to pool
    if (obj.reset && typeof obj.reset === 'function') {
      obj.reset();
    }
    obj.active = false;

    this.pool.push(obj);
  }

  /**
   * Release all active objects
   */
  releaseAll() {
    while (this.active.length > 0) {
      this.release(this.active[0]);
    }
  }

  /**
   * Get all active objects
   * @returns {Array} Array of active objects
   */
  getActive() {
    return this.active;
  }

  /**
   * Get count of active objects
   */
  getActiveCount() {
    return this.active.length;
  }

  /**
   * Get count of pooled (available) objects
   */
  getPooledCount() {
    return this.pool.length;
  }

  /**
   * Get total count (active + pooled)
   */
  getTotalCount() {
    return this.active.length + this.pool.length;
  }

  /**
   * Update all active objects
   * @param {number} deltaTime - Time since last update
   */
  updateActive(deltaTime) {
    // Iterate backwards to safely remove during iteration
    for (let i = this.active.length - 1; i >= 0; i--) {
      const obj = this.active[i];
      if (obj.update) {
        obj.update(deltaTime);
      }

      // Check if object should be released
      if (!obj.active) {
        this.release(obj);
      }
    }
  }

  /**
   * Render all active objects
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  renderActive(ctx) {
    for (const obj of this.active) {
      if (obj.render) {
        obj.render(ctx);
      }
    }
  }

  /**
   * Clear the pool completely
   */
  clear() {
    this.active = [];
    this.pool = [];
  }

  /**
   * Expand pool with additional objects
   * @param {number} count - Number of objects to add
   */
  expand(count) {
    for (let i = 0; i < count; i++) {
      const obj = this.factory();
      obj._pooled = true;
      this.pool.push(obj);
    }
  }

  /**
   * Shrink pool to specified size
   * @param {number} maxSize - Maximum pool size to maintain
   */
  shrink(maxSize) {
    while (this.pool.length > maxSize) {
      this.pool.pop();
    }
  }
}

export default ObjectPool;
