/**
 * ScoreSystem.js
 * Score calculation and combo system
 */

class ScoreSystem {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.consecutiveHits = 0;
    this.comboMultipliers = {
      5: 2,   // 2x at 5 hits
      10: 3   // 3x at 10 hits
    };
    this.lastHitTime = 0;
    this.comboResetDelay = 2000; // 2 seconds
  }

  addScore(points) {
    const multiplier = this.getComboMultiplier();
    const finalPoints = points * multiplier;
    this.score += finalPoints;
    return finalPoints;
  }

  addHit(points, currentTime) {
    this.consecutiveHits++;
    this.lastHitTime = currentTime;
    return this.addScore(points);
  }

  getComboMultiplier() {
    if (this.consecutiveHits >= 10) return 3;
    if (this.consecutiveHits >= 5) return 2;
    return 1;
  }

  update(currentTime) {
    // Reset combo if too much time passed since last hit
    if (this.consecutiveHits > 0 &&
        currentTime - this.lastHitTime > this.comboResetDelay) {
      this.resetCombo();
    }
  }

  resetCombo() {
    this.consecutiveHits = 0;
    this.combo = 0;
  }

  reset() {
    this.score = 0;
    this.consecutiveHits = 0;
    this.combo = 0;
    this.lastHitTime = 0;
  }

  getScore() {
    return this.score;
  }

  getCombo() {
    return this.consecutiveHits;
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.ScoreSystem = ScoreSystem;
}

