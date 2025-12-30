/**
 * ObjectPool - Memory optimization through object reuse
 * Prevents garbage collection stutters by pre-allocating objects
 */
export class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10, maxSize = 100) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];
    this.maxSize = maxSize;

    // Pre-allocate initial objects
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }

    console.log(`[ObjectPool] Created pool with ${initialSize} objects (max: ${maxSize})`);
  }

  /**
   * Acquire an object from the pool
   */
  acquire() {
    let obj;

    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else if (this.active.length < this.maxSize) {
      obj = this.createFn();
      console.warn('[ObjectPool] Pool exhausted, creating new object');
    } else {
      console.error('[ObjectPool] Pool at max capacity!');
      return null;
    }

    this.active.push(obj);
    return obj;
  }

  /**
   * Release an object back to the pool
   */
  release(obj) {
    const index = this.active.indexOf(obj);

    if (index !== -1) {
      this.active.splice(index, 1);
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }

  /**
   * Release all active objects
   */
  releaseAll() {
    this.active.forEach(obj => {
      this.resetFn(obj);
      this.pool.push(obj);
    });
    this.active = [];
  }

  /**
   * Get number of active objects
   */
  getActiveCount() {
    return this.active.length;
  }

  /**
   * Get number of available objects in pool
   */
  getAvailableCount() {
    return this.pool.length;
  }

  /**
   * Get total capacity
   */
  getTotalCapacity() {
    return this.pool.length + this.active.length;
  }

  /**
   * Get pool statistics
   */
  getStats() {
    return {
      active: this.active.length,
      available: this.pool.length,
      total: this.getTotalCapacity(),
      maxSize: this.maxSize,
      utilization: (this.active.length / this.maxSize * 100).toFixed(1) + '%'
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
