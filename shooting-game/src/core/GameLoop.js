/**
 * GameLoop - Main game loop using requestAnimationFrame
 * Maintains 60 FPS and provides delta time for smooth updates
 */
export class GameLoop {
  constructor(updateFn, renderFn) {
    this.updateFn = updateFn;
    this.renderFn = renderFn;
    this.isRunning = false;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.fps = 60;
    this.frameCount = 0;
    this.fpsUpdateTime = 0;
    this.currentFPS = 60;
    this.animationId = null;
  }

  /**
   * Start the game loop
   */
  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastTime = performance.now();
    this.fpsUpdateTime = this.lastTime;
    this.loop();
  }

  /**
   * Stop the game loop
   */
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Pause the game loop
   */
  pause() {
    this.isRunning = false;
  }

  /**
   * Resume the game loop
   */
  resume() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  /**
   * Main loop function
   */
  loop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds

    // Cap delta time to prevent spiral of death
    if (this.deltaTime > 0.1) {
      this.deltaTime = 0.1;
    }

    // Update FPS counter
    this.frameCount++;
    if (currentTime - this.fpsUpdateTime >= 1000) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.fpsUpdateTime = currentTime;
    }

    // Update and render
    this.updateFn(this.deltaTime);
    this.renderFn();

    this.lastTime = currentTime;
    this.animationId = requestAnimationFrame(() => this.loop());
  }

  /**
   * Get current FPS
   */
  getFPS() {
    return this.currentFPS;
  }

  /**
   * Get delta time
   */
  getDeltaTime() {
    return this.deltaTime;
  }
}
