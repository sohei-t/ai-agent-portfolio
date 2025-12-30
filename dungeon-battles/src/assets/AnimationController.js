/**
 * AnimationController.js
 * Animation system for sprites and effects
 *
 * Features:
 * - Frame-based animation
 * - Tween animation (position, scale, rotation, alpha)
 * - Easing functions
 * - Animation sequencing
 * - Callback support
 */

export class AnimationController {
  constructor() {
    this.animations = new Map();
    this.tweens = [];
    this.sequences = new Map();
  }

  /**
   * Create frame animation
   */
  createFrameAnimation(key, frames, options = {}) {
    const animation = {
      key,
      frames,
      currentFrame: 0,
      frameTime: options.frameTime || 100,
      loop: options.loop !== undefined ? options.loop : true,
      playing: false,
      paused: false,
      elapsed: 0,
      onComplete: options.onComplete || null,
      onFrameChange: options.onFrameChange || null
    };

    this.animations.set(key, animation);

    return animation;
  }

  /**
   * Play frame animation
   */
  playAnimation(key) {
    const animation = this.animations.get(key);

    if (animation) {
      animation.playing = true;
      animation.paused = false;
      animation.currentFrame = 0;
      animation.elapsed = 0;
    }
  }

  /**
   * Pause animation
   */
  pauseAnimation(key) {
    const animation = this.animations.get(key);

    if (animation) {
      animation.paused = true;
    }
  }

  /**
   * Resume animation
   */
  resumeAnimation(key) {
    const animation = this.animations.get(key);

    if (animation) {
      animation.paused = false;
    }
  }

  /**
   * Stop animation
   */
  stopAnimation(key) {
    const animation = this.animations.get(key);

    if (animation) {
      animation.playing = false;
      animation.paused = false;
      animation.currentFrame = 0;
      animation.elapsed = 0;
    }
  }

  /**
   * Update frame animation
   */
  updateAnimation(key, deltaTime) {
    const animation = this.animations.get(key);

    if (!animation || !animation.playing || animation.paused) {
      return null;
    }

    animation.elapsed += deltaTime;

    if (animation.elapsed >= animation.frameTime) {
      const previousFrame = animation.currentFrame;
      animation.currentFrame++;

      if (animation.currentFrame >= animation.frames.length) {
        if (animation.loop) {
          animation.currentFrame = 0;
        } else {
          animation.playing = false;
          animation.currentFrame = animation.frames.length - 1;

          if (animation.onComplete) {
            animation.onComplete();
          }
        }
      }

      if (animation.onFrameChange && animation.currentFrame !== previousFrame) {
        animation.onFrameChange(animation.currentFrame);
      }

      animation.elapsed = 0;
    }

    return animation.frames[animation.currentFrame];
  }

  /**
   * Get current frame
   */
  getCurrentFrame(key) {
    const animation = this.animations.get(key);

    if (!animation) {
      return null;
    }

    return animation.frames[animation.currentFrame];
  }

  /**
   * Create tween animation
   */
  createTween(target, properties, duration, options = {}) {
    const tween = {
      target,
      properties,
      duration,
      elapsed: 0,
      startValues: {},
      playing: true,
      easing: options.easing || 'linear',
      delay: options.delay || 0,
      delayElapsed: 0,
      yoyo: options.yoyo || false,
      repeat: options.repeat || 0,
      repeatCount: 0,
      reversed: false,
      onStart: options.onStart || null,
      onUpdate: options.onUpdate || null,
      onComplete: options.onComplete || null,
      onRepeat: options.onRepeat || null,
      started: false
    };

    // Store start values
    for (const prop in properties) {
      if (target[prop] !== undefined) {
        tween.startValues[prop] = target[prop];
      }
    }

    this.tweens.push(tween);

    return tween;
  }

  /**
   * Update all tweens
   */
  updateTweens(deltaTime) {
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const tween = this.tweens[i];

      if (!tween.playing) {
        continue;
      }

      // Handle delay
      if (tween.delay > 0 && tween.delayElapsed < tween.delay) {
        tween.delayElapsed += deltaTime;
        continue;
      }

      // Start callback
      if (!tween.started) {
        tween.started = true;
        if (tween.onStart) {
          tween.onStart(tween.target);
        }
      }

      // Update tween
      tween.elapsed += deltaTime;
      const progress = Math.min(tween.elapsed / tween.duration, 1);
      const easedProgress = this.ease(progress, tween.easing);

      // Apply properties
      for (const prop in tween.properties) {
        const start = tween.reversed ? tween.properties[prop] : tween.startValues[prop];
        const end = tween.reversed ? tween.startValues[prop] : tween.properties[prop];
        const value = start + (end - start) * easedProgress;
        tween.target[prop] = value;
      }

      // Update callback
      if (tween.onUpdate) {
        tween.onUpdate(tween.target, progress);
      }

      // Completion
      if (progress >= 1) {
        if (tween.yoyo && !tween.reversed) {
          tween.reversed = true;
          tween.elapsed = 0;
        } else if (tween.repeat > 0 && tween.repeatCount < tween.repeat) {
          tween.repeatCount++;
          tween.elapsed = 0;
          tween.reversed = false;

          if (tween.onRepeat) {
            tween.onRepeat(tween.target, tween.repeatCount);
          }
        } else {
          tween.playing = false;

          if (tween.onComplete) {
            tween.onComplete(tween.target);
          }

          this.tweens.splice(i, 1);
        }
      }
    }
  }

  /**
   * Easing functions
   */
  ease(t, type) {
    switch (type) {
      case 'linear':
        return t;

      case 'easeInQuad':
        return t * t;

      case 'easeOutQuad':
        return t * (2 - t);

      case 'easeInOutQuad':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      case 'easeInCubic':
        return t * t * t;

      case 'easeOutCubic':
        return (--t) * t * t + 1;

      case 'easeInOutCubic':
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

      case 'easeInSine':
        return 1 - Math.cos((t * Math.PI) / 2);

      case 'easeOutSine':
        return Math.sin((t * Math.PI) / 2);

      case 'easeInOutSine':
        return -(Math.cos(Math.PI * t) - 1) / 2;

      case 'easeInElastic':
        return t === 0
          ? 0
          : t === 1
          ? 1
          : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3));

      case 'easeOutElastic':
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;

      case 'easeOutBounce':
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }

      default:
        return t;
    }
  }

  /**
   * Create animation sequence
   */
  createSequence(key, steps) {
    const sequence = {
      key,
      steps,
      currentStep: 0,
      playing: false,
      onComplete: null
    };

    this.sequences.set(key, sequence);

    return sequence;
  }

  /**
   * Play animation sequence
   */
  playSequence(key, onComplete) {
    const sequence = this.sequences.get(key);

    if (!sequence) {
      return;
    }

    sequence.playing = true;
    sequence.currentStep = 0;
    sequence.onComplete = onComplete;

    this.executeSequenceStep(sequence);
  }

  /**
   * Execute sequence step
   */
  executeSequenceStep(sequence) {
    if (sequence.currentStep >= sequence.steps.length) {
      sequence.playing = false;

      if (sequence.onComplete) {
        sequence.onComplete();
      }

      return;
    }

    const step = sequence.steps[sequence.currentStep];

    // Execute step action
    if (step.action) {
      step.action();
    }

    // Wait for delay or animation
    if (step.delay) {
      setTimeout(() => {
        sequence.currentStep++;
        this.executeSequenceStep(sequence);
      }, step.delay);
    } else if (step.animation) {
      this.playAnimation(step.animation);

      const animation = this.animations.get(step.animation);
      if (animation) {
        const originalOnComplete = animation.onComplete;
        animation.onComplete = () => {
          if (originalOnComplete) {
            originalOnComplete();
          }
          sequence.currentStep++;
          this.executeSequenceStep(sequence);
        };
      }
    } else {
      sequence.currentStep++;
      this.executeSequenceStep(sequence);
    }
  }

  /**
   * Stop tween
   */
  stopTween(tween) {
    const index = this.tweens.indexOf(tween);
    if (index !== -1) {
      this.tweens.splice(index, 1);
    }
  }

  /**
   * Stop all tweens for target
   */
  stopTweensForTarget(target) {
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      if (this.tweens[i].target === target) {
        this.tweens.splice(i, 1);
      }
    }
  }

  /**
   * Update all animations
   */
  update(deltaTime) {
    this.updateTweens(deltaTime);
  }

  /**
   * Clear all animations
   */
  clear() {
    this.animations.clear();
    this.tweens = [];
    this.sequences.clear();
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      animations: this.animations.size,
      activeTweens: this.tweens.length,
      sequences: this.sequences.size
    };
  }
}
