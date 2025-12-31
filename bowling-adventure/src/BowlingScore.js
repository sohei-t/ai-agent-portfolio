/**
 * BowlingScore - Standard bowling scoring logic
 * Handles strikes, spares, and the special 10th frame rules
 */

export class BowlingScore {
  constructor() {
    this.frames = [];
    this.reset();
  }

  /**
   * Reset all scores
   */
  reset() {
    this.frames = Array(10).fill(null).map(() => ({
      throws: [],
      score: null,
      bonus: null // 'strike', 'spare', or null
    }));
    this.currentFrame = 0;
  }

  /**
   * Record a throw
   * @param {number} pinsKnocked - Number of pins knocked down
   */
  recordThrow(pinsKnocked) {
    const frame = this.frames[this.currentFrame];

    // Validate pins
    const maxPins = this.getMaxPinsForThrow();
    pinsKnocked = Math.min(Math.max(0, pinsKnocked), maxPins);

    frame.throws.push(pinsKnocked);

    // Handle frame completion
    if (this.currentFrame < 9) {
      // Frames 1-9
      if (frame.throws[0] === 10) {
        // Strike
        frame.bonus = 'strike';
        this.currentFrame++;
      } else if (frame.throws.length === 2) {
        if (frame.throws[0] + frame.throws[1] === 10) {
          frame.bonus = 'spare';
        }
        this.currentFrame++;
      }
    } else {
      // 10th frame special rules
      this.handle10thFrame(frame);
    }

    // Calculate all scores
    this.calculateScores();
  }

  /**
   * Get maximum pins available for current throw
   */
  getMaxPinsForThrow() {
    const frame = this.frames[this.currentFrame];

    if (this.currentFrame < 9) {
      // Frames 1-9: 10 on first throw, remaining on second
      if (frame.throws.length === 0) {
        return 10;
      }
      return 10 - frame.throws[0];
    } else {
      // 10th frame
      const t = frame.throws;
      if (t.length === 0) {
        return 10;
      } else if (t.length === 1) {
        // After first throw
        if (t[0] === 10) {
          return 10; // Strike, reset pins
        }
        return 10 - t[0];
      } else if (t.length === 2) {
        // After second throw
        if (t[0] === 10 && t[1] === 10) {
          return 10; // Two strikes, reset pins
        } else if (t[0] === 10) {
          return 10 - t[1]; // One strike
        } else if (t[0] + t[1] === 10) {
          return 10; // Spare, reset pins
        }
        return 0; // No bonus throw
      }
    }
    return 0;
  }

  /**
   * Handle 10th frame special rules
   */
  handle10thFrame(frame) {
    const t = frame.throws;

    if (t.length === 1) {
      if (t[0] === 10) {
        frame.bonus = 'strike';
      }
    } else if (t.length === 2) {
      if (t[0] === 10) {
        // Had a strike on first, continue
        if (t[1] === 10) {
          // Two strikes
        }
      } else if (t[0] + t[1] === 10) {
        frame.bonus = 'spare';
      } else {
        // No bonus, game over
        this.currentFrame++;
      }
    } else if (t.length === 3) {
      // 10th frame complete
      this.currentFrame++;
    }
  }

  /**
   * Calculate all frame scores
   */
  calculateScores() {
    let runningTotal = 0;

    for (let i = 0; i < 10; i++) {
      const frame = this.frames[i];
      if (frame.throws.length === 0) continue;

      let frameScore = this.getFrameBaseScore(i);

      // Add bonus for strikes and spares (frames 1-9)
      if (i < 9) {
        if (frame.bonus === 'strike') {
          const bonusThrows = this.getNextThrows(i, 2);
          frameScore += bonusThrows.reduce((a, b) => a + b, 0);
        } else if (frame.bonus === 'spare') {
          const bonusThrows = this.getNextThrows(i, 1);
          frameScore += bonusThrows[0] || 0;
        }
      }

      // Only set score if we have enough throws to calculate it
      if (this.canScoreFrame(i)) {
        runningTotal += frameScore;
        frame.score = runningTotal;
      }
    }
  }

  /**
   * Get base score for a frame (sum of throws)
   */
  getFrameBaseScore(frameIndex) {
    return this.frames[frameIndex].throws.reduce((a, b) => a + b, 0);
  }

  /**
   * Get the next N throws after a frame
   */
  getNextThrows(frameIndex, count) {
    const throws = [];
    for (let i = frameIndex + 1; i < 10 && throws.length < count; i++) {
      throws.push(...this.frames[i].throws);
    }
    return throws.slice(0, count);
  }

  /**
   * Check if a frame can be scored (all bonus throws are in)
   */
  canScoreFrame(frameIndex) {
    const frame = this.frames[frameIndex];

    if (frameIndex === 9) {
      // 10th frame: need all throws
      if (frame.throws[0] === 10 || (frame.throws[0] + (frame.throws[1] || 0)) === 10) {
        return frame.throws.length >= 3;
      }
      return frame.throws.length >= 2;
    }

    if (frame.bonus === 'strike') {
      return this.getNextThrows(frameIndex, 2).length >= 2;
    } else if (frame.bonus === 'spare') {
      return this.getNextThrows(frameIndex, 1).length >= 1;
    }

    return frame.throws.length >= 2;
  }

  /**
   * Check if current frame is complete
   */
  isFrameComplete(frameIndex) {
    const frame = this.frames[frameIndex];

    if (frameIndex < 9) {
      // Strike completes frame
      if (frame.throws[0] === 10) return true;
      // Two throws complete frame
      return frame.throws.length >= 2;
    } else {
      // 10th frame
      const t = frame.throws;
      if (t.length >= 3) return true;
      if (t.length === 2 && t[0] !== 10 && t[0] + t[1] !== 10) return true;
      return false;
    }
  }

  /**
   * Get total score
   */
  getTotalScore() {
    // Sum all scored frames
    let total = 0;
    for (const frame of this.frames) {
      if (frame.score !== null) {
        total = frame.score;
      }
    }
    return total;
  }

  /**
   * Get frames data for display
   */
  getFrames() {
    return this.frames.map((frame, index) => ({
      number: index + 1,
      throws: [...frame.throws],
      score: frame.score,
      bonus: frame.bonus,
      is10th: index === 9
    }));
  }

  /**
   * Get current frame index
   */
  getCurrentFrame() {
    return this.currentFrame;
  }

  /**
   * Check if game is complete
   */
  isGameComplete() {
    return this.currentFrame >= 10;
  }

  /**
   * Format throw for display (X for strike, / for spare)
   */
  static formatThrow(pins, isSecondThrow = false, firstThrowPins = 0) {
    if (pins === 10 && !isSecondThrow) {
      return 'X';
    }
    if (isSecondThrow && firstThrowPins + pins === 10) {
      return '/';
    }
    if (pins === 0) {
      return '-';
    }
    return pins.toString();
  }
}
