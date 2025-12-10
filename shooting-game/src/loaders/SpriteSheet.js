/**
 * SpriteSheet.js
 * Manages sprite sheets and sprite animations
 */

export class SpriteSheet {
  constructor(image, frameWidth, frameHeight) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frames = [];
    this.animations = new Map();

    this.calculateFrames();
  }

  /**
   * Calculate all frames in the sprite sheet
   */
  calculateFrames() {
    const cols = Math.floor(this.image.width / this.frameWidth);
    const rows = Math.floor(this.image.height / this.frameHeight);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.frames.push({
          x: col * this.frameWidth,
          y: row * this.frameHeight,
          width: this.frameWidth,
          height: this.frameHeight
        });
      }
    }
  }

  /**
   * Define an animation sequence
   * @param {string} name - Animation name
   * @param {Array<number>} frameIndices - Array of frame indices
   * @param {number} frameRate - Frames per second
   * @param {boolean} loop - Whether to loop the animation
   */
  defineAnimation(name, frameIndices, frameRate = 10, loop = true) {
    this.animations.set(name, {
      frameIndices,
      frameRate,
      loop,
      frameDuration: 1000 / frameRate
    });
  }

  /**
   * Get frame data by index
   * @param {number} index - Frame index
   * @returns {Object|null} Frame data
   */
  getFrame(index) {
    return this.frames[index] || null;
  }

  /**
   * Get animation data
   * @param {string} name - Animation name
   * @returns {Object|null} Animation data
   */
  getAnimation(name) {
    return this.animations.get(name) || null;
  }

  /**
   * Draw a specific frame
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} frameIndex - Frame index
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} scale - Scale factor (default 1)
   */
  drawFrame(ctx, frameIndex, x, y, scale = 1) {
    const frame = this.getFrame(frameIndex);
    if (!frame) return;

    ctx.drawImage(
      this.image,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      x,
      y,
      frame.width * scale,
      frame.height * scale
    );
  }

  /**
   * Get total number of frames
   * @returns {number} Total frames
   */
  getTotalFrames() {
    return this.frames.length;
  }
}

/**
 * Animation player for sprite sheets
 */
export class AnimationPlayer {
  constructor(spriteSheet, animationName) {
    this.spriteSheet = spriteSheet;
    this.animationName = animationName;
    this.animation = spriteSheet.getAnimation(animationName);

    if (!this.animation) {
      throw new Error(`Animation "${animationName}" not found`);
    }

    this.currentFrameIndex = 0;
    this.elapsedTime = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.onComplete = null;
  }

  /**
   * Start playing the animation
   */
  play() {
    this.isPlaying = true;
    this.isPaused = false;
  }

  /**
   * Pause the animation
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume the animation
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Stop and reset the animation
   */
  stop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentFrameIndex = 0;
    this.elapsedTime = 0;
  }

  /**
   * Reset to first frame
   */
  reset() {
    this.currentFrameIndex = 0;
    this.elapsedTime = 0;
  }

  /**
   * Update animation state
   * @param {number} deltaTime - Time elapsed since last update (ms)
   */
  update(deltaTime) {
    if (!this.isPlaying || this.isPaused) return;

    this.elapsedTime += deltaTime;

    if (this.elapsedTime >= this.animation.frameDuration) {
      this.elapsedTime -= this.animation.frameDuration;
      this.currentFrameIndex++;

      if (this.currentFrameIndex >= this.animation.frameIndices.length) {
        if (this.animation.loop) {
          this.currentFrameIndex = 0;
        } else {
          this.currentFrameIndex = this.animation.frameIndices.length - 1;
          this.isPlaying = false;
          if (this.onComplete) {
            this.onComplete();
          }
        }
      }
    }
  }

  /**
   * Draw current frame
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} scale - Scale factor
   */
  draw(ctx, x, y, scale = 1) {
    const frameIndex = this.animation.frameIndices[this.currentFrameIndex];
    this.spriteSheet.drawFrame(ctx, frameIndex, x, y, scale);
  }

  /**
   * Get current frame index in animation sequence
   * @returns {number} Current frame index
   */
  getCurrentFrameIndex() {
    return this.currentFrameIndex;
  }

  /**
   * Get current sprite sheet frame index
   * @returns {number} Sprite sheet frame index
   */
  getCurrentSpriteFrame() {
    return this.animation.frameIndices[this.currentFrameIndex];
  }

  /**
   * Check if animation is complete
   * @returns {boolean} True if complete
   */
  isComplete() {
    return !this.animation.loop &&
           this.currentFrameIndex >= this.animation.frameIndices.length - 1;
  }

  /**
   * Set animation completion callback
   * @param {Function} callback - Callback function
   */
  setOnComplete(callback) {
    this.onComplete = callback;
  }
}
