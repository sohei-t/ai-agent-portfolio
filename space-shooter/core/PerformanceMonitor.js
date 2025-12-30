/**
 * PerformanceMonitor.js
 * FPS tracking and adaptive quality system
 */

class PerformanceMonitor {
  constructor() {
    this.frameTimes = [];
    this.fpsHistory = [];
    this.currentFPS = 60;
    this.averageFPS = 60;
    this.frameCount = 0;
    this.lastFrameTime = 0;
    this.fpsUpdateInterval = 1000; // Update FPS every 1 second
    this.lastFpsUpdate = 0;
    this.qualityLevel = 'high'; // high, medium, low
  }

  /**
   * Update performance metrics
   * @param {number} currentTime - Current timestamp from performance.now()
   */
  update(currentTime) {
    if (this.lastFrameTime === 0) {
      this.lastFrameTime = currentTime;
      return;
    }

    const deltaTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    // Store frame time
    this.frameTimes.push(deltaTime);
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }

    this.frameCount++;

    // Update FPS every second
    if (currentTime - this.lastFpsUpdate >= this.fpsUpdateInterval) {
      this.calculateFPS();
      this.adjustQuality();
      this.lastFpsUpdate = currentTime;
    }
  }

  /**
   * Calculate current and average FPS
   */
  calculateFPS() {
    if (this.frameTimes.length === 0) return;

    const averageFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    this.currentFPS = Math.round(1000 / averageFrameTime);

    this.fpsHistory.push(this.currentFPS);
    if (this.fpsHistory.length > 10) {
      this.fpsHistory.shift();
    }

    this.averageFPS = Math.round(
      this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
    );
  }

  /**
   * Adjust quality level based on performance
   */
  adjustQuality() {
    if (this.averageFPS >= 55) {
      this.qualityLevel = 'high';
    } else if (this.averageFPS >= 40) {
      this.qualityLevel = 'medium';
    } else {
      this.qualityLevel = 'low';
    }
  }

  /**
   * Get maximum particle count based on quality level
   * @returns {number}
   */
  getMaxParticles() {
    return this.qualityLevel === 'high' ? 100 : 50;
  }

  /**
   * Check if effects should be reduced
   * @returns {boolean}
   */
  shouldReduceEffects() {
    return this.averageFPS < 40;
  }

  /**
   * Get current FPS
   * @returns {number}
   */
  getFPS() {
    return this.currentFPS;
  }

  /**
   * Get average FPS
   * @returns {number}
   */
  getAverageFPS() {
    return this.averageFPS;
  }

  /**
   * Get current quality level
   * @returns {string}
   */
  getQualityLevel() {
    return this.qualityLevel;
  }

  /**
   * Reset all metrics
   */
  reset() {
    this.frameTimes = [];
    this.fpsHistory = [];
    this.currentFPS = 60;
    this.averageFPS = 60;
    this.frameCount = 0;
    this.lastFrameTime = 0;
    this.lastFpsUpdate = 0;
    this.qualityLevel = 'high';
  }

  /**
   * Get performance stats for display
   * @returns {object}
   */
  getStats() {
    return {
      fps: this.currentFPS,
      averageFPS: this.averageFPS,
      qualityLevel: this.qualityLevel,
      frameCount: this.frameCount
    };
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.PerformanceMonitor = PerformanceMonitor;
}
