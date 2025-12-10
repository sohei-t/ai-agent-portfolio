/**
 * Score Manager
 * Manages score calculation, combo system, and high scores
 */
import { GAME_CONFIG } from '../config/gameConfig.js';

export class ScoreManager {
  constructor() {
    this.score = 0;
    this.highScore = this.loadHighScore();
    this.combo = 0;
    this.maxCombo = 0;
    this.lastKillTime = 0;
    this.comboMultiplier = 1;
    this.scoreMultiplier = 1; // Can be modified by power-ups
    this.kills = 0;
    this.scoreListeners = [];
  }

  /**
   * Add points to score
   * @param {number} points - Base points to add
   * @param {boolean} applyCombo - Whether to apply combo multiplier
   */
  addScore(points, applyCombo = true) {
    const currentTime = Date.now();

    // Calculate combo
    if (applyCombo) {
      if (currentTime - this.lastKillTime < GAME_CONFIG.SCORE.COMBO_TIMEOUT) {
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
      } else {
        this.combo = 1;
      }
      this.lastKillTime = currentTime;

      // Calculate combo multiplier
      this.comboMultiplier = 1 + (this.combo - 1) * GAME_CONFIG.SCORE.COMBO_MULTIPLIER;
    }

    // Apply multipliers
    const finalPoints = Math.floor(points * this.comboMultiplier * this.scoreMultiplier);
    this.score += finalPoints;

    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }

    // Notify listeners
    this.notifyScoreChange(finalPoints);

    return finalPoints;
  }

  /**
   * Add kill count
   */
  addKill() {
    this.kills++;
  }

  /**
   * Get current score
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * Get high score
   * @returns {number}
   */
  getHighScore() {
    return this.highScore;
  }

  /**
   * Get current combo
   * @returns {number}
   */
  getCombo() {
    return this.combo;
  }

  /**
   * Get max combo achieved in this session
   * @returns {number}
   */
  getMaxCombo() {
    return this.maxCombo;
  }

  /**
   * Get combo multiplier
   * @returns {number}
   */
  getComboMultiplier() {
    return this.comboMultiplier;
  }

  /**
   * Get total kills
   * @returns {number}
   */
  getKills() {
    return this.kills;
  }

  /**
   * Set score multiplier (from power-ups)
   * @param {number} multiplier
   */
  setScoreMultiplier(multiplier) {
    this.scoreMultiplier = multiplier;
  }

  /**
   * Reset score multiplier to 1
   */
  resetScoreMultiplier() {
    this.scoreMultiplier = 1;
  }

  /**
   * Reset combo
   */
  resetCombo() {
    this.combo = 0;
    this.comboMultiplier = 1;
  }

  /**
   * Check if combo is still valid
   * @returns {boolean}
   */
  isComboActive() {
    return Date.now() - this.lastKillTime < GAME_CONFIG.SCORE.COMBO_TIMEOUT;
  }

  /**
   * Get remaining combo time in milliseconds
   * @returns {number}
   */
  getComboTimeRemaining() {
    const remaining = GAME_CONFIG.SCORE.COMBO_TIMEOUT - (Date.now() - this.lastKillTime);
    return Math.max(0, remaining);
  }

  /**
   * Add level clear bonus
   * @param {number} level
   * @param {boolean} noHit - Whether player completed level without getting hit
   */
  addLevelClearBonus(level, noHit = false) {
    const bonus = GAME_CONFIG.SCORE.LEVEL_CLEAR_BONUS * level;
    this.addScore(bonus, false);

    if (noHit) {
      this.addScore(GAME_CONFIG.SCORE.NO_HIT_BONUS, false);
    }
  }

  /**
   * Reset score for new game
   */
  reset() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.lastKillTime = 0;
    this.comboMultiplier = 1;
    this.scoreMultiplier = 1;
    this.kills = 0;
  }

  /**
   * Add score change listener
   * @param {Function} listener
   */
  onScoreChange(listener) {
    this.scoreListeners.push(listener);
  }

  /**
   * Remove score change listener
   * @param {Function} listener
   */
  offScoreChange(listener) {
    const index = this.scoreListeners.indexOf(listener);
    if (index !== -1) {
      this.scoreListeners.splice(index, 1);
    }
  }

  /**
   * Notify all score listeners
   * @param {number} points - Points added
   */
  notifyScoreChange(points) {
    this.scoreListeners.forEach(listener => {
      listener(this.score, points, this.combo);
    });
  }

  /**
   * Load high score from local storage
   * @returns {number}
   */
  loadHighScore() {
    try {
      const saved = localStorage.getItem('verticalShooterHighScore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      console.warn('Failed to load high score:', error);
      return 0;
    }
  }

  /**
   * Save high score to local storage
   */
  saveHighScore() {
    try {
      localStorage.setItem('verticalShooterHighScore', this.highScore.toString());
    } catch (error) {
      console.warn('Failed to save high score:', error);
    }
  }

  /**
   * Get score statistics
   * @returns {Object}
   */
  getStats() {
    return {
      score: this.score,
      highScore: this.highScore,
      combo: this.combo,
      maxCombo: this.maxCombo,
      kills: this.kills,
      comboMultiplier: this.comboMultiplier,
      scoreMultiplier: this.scoreMultiplier
    };
  }
}
