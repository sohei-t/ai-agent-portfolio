/**
 * PerformanceMonitor - Track game performance metrics
 * FPS calculation, frame time tracking, memory monitoring
 */
export class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameTime = 0;
    this.frameCount = 0;
    this.lastFpsUpdate = 0;
    this.fpsUpdateInterval = 500; // Update FPS every 500ms
    this.frameStartTime = 0;
    this.memoryUsage = 0;
  }

  /**
   * Mark start of frame
   */
  startFrame() {
    this.frameStartTime = performance.now();
  }

  /**
   * Mark end of frame and calculate metrics
   */
  endFrame() {
    const now = performance.now();
    this.frameTime = now - this.frameStartTime;
    this.frameCount++;

    // Update FPS counter
    if (now - this.lastFpsUpdate >= this.fpsUpdateInterval) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }
  }

  /**
   * Get current FPS
   */
  getFPS() {
    return this.fps;
  }

  /**
   * Get frame time in milliseconds
   */
  getFrameTime() {
    return this.frameTime;
  }

  /**
   * Check if performance is acceptable
   */
  isPerformanceGood() {
    return this.fps >= 50 && this.frameTime <= 20;
  }

  /**
   * Get performance status
   */
  getStatus() {
    if (this.fps >= 55) return 'excellent';
    if (this.fps >= 45) return 'good';
    if (this.fps >= 30) return 'fair';
    return 'poor';
  }

  /**
   * Reset metrics
   */
  reset() {
    this.fps = 60;
    this.frameTime = 0;
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();
  }
}
