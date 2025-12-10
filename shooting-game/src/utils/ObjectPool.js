/**
 * Object Pool for efficient memory management
 * Reduces garbage collection by reusing objects
 */
export class ObjectPool {
  /**
   * @param {Function} factory - Function that creates new objects
   * @param {Function} reset - Function to reset object state
   * @param {number} initialSize - Initial pool size
   */
  constructor(factory, reset, initialSize = 10) {
    this.factory = factory;
    this.reset = reset;
    this.pool = [];
    this.active = [];

    // Pre-populate pool
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory());
    }
  }

  /**
   * Get an object from the pool
   * @param {...any} args - Arguments to pass to reset function
   * @returns {any} Object from pool
   */
  acquire(...args) {
    let obj;

    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else {
      obj = this.factory();
    }

    this.reset(obj, ...args);
    this.active.push(obj);

    return obj;
  }

  /**
   * Return an object to the pool
   * @param {any} obj - Object to return
   */
  release(obj) {
    const index = this.active.indexOf(obj);
    if (index !== -1) {
      this.active.splice(index, 1);
      this.pool.push(obj);
    }
  }

  /**
   * Release all active objects
   */
  releaseAll() {
    while (this.active.length > 0) {
      this.pool.push(this.active.pop());
    }
  }

  /**
   * Get all active objects
   * @returns {Array} Active objects
   */
  getActive() {
    return this.active;
  }

  /**
   * Get pool statistics
   * @returns {Object} Pool stats
   */
  getStats() {
    return {
      poolSize: this.pool.length,
      activeSize: this.active.length,
      totalSize: this.pool.length + this.active.length
    };
  }

  /**
   * Clear the pool completely
   */
  clear() {
    this.pool = [];
    this.active = [];
  }
}
