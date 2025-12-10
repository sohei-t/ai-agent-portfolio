/**
 * Level Manager
 * Manages level progression and difficulty scaling
 */
import { GAME_CONFIG } from '../config/gameConfig.js';
import { getStageData } from '../config/stageData.js';

export class LevelManager {
  constructor() {
    this.currentLevel = 1;
    this.maxLevel = 10;
    this.levelStartTime = 0;
    this.levelDuration = 0;
    this.difficultyMultiplier = 1;
    this.levelChangeListeners = [];
  }

  /**
   * Start a level
   * @param {number} level - Level number
   */
  startLevel(level) {
    this.currentLevel = level;
    this.levelStartTime = Date.now();

    const stageData = getStageData(level);
    this.levelDuration = stageData.duration * 1000; // Convert to milliseconds

    // Calculate difficulty multiplier based on level
    this.difficultyMultiplier = Math.pow(
      GAME_CONFIG.WAVES.DIFFICULTY_SCALING,
      level - 1
    );

    // Notify listeners
    this.notifyLevelChange(level);
  }

  /**
   * Get current level
   * @returns {number}
   */
  getCurrentLevel() {
    return this.currentLevel;
  }

  /**
   * Get difficulty multiplier
   * @returns {number}
   */
  getDifficultyMultiplier() {
    return this.difficultyMultiplier;
  }

  /**
   * Get level progress (0-1)
   * @returns {number}
   */
  getLevelProgress() {
    if (this.levelDuration === 0) return 0;

    const elapsed = Date.now() - this.levelStartTime;
    return Math.min(1, elapsed / this.levelDuration);
  }

  /**
   * Get elapsed time in current level (seconds)
   * @returns {number}
   */
  getElapsedTime() {
    return (Date.now() - this.levelStartTime) / 1000;
  }

  /**
   * Get remaining time in current level (seconds)
   * @returns {number}
   */
  getRemainingTime() {
    const elapsed = Date.now() - this.levelStartTime;
    const remaining = this.levelDuration - elapsed;
    return Math.max(0, remaining / 1000);
  }

  /**
   * Check if level is complete
   * @returns {boolean}
   */
  isLevelComplete() {
    return Date.now() - this.levelStartTime >= this.levelDuration;
  }

  /**
   * Advance to next level
   * @returns {number} New level number
   */
  nextLevel() {
    if (this.currentLevel < this.maxLevel) {
      this.currentLevel++;
      this.startLevel(this.currentLevel);
    }
    return this.currentLevel;
  }

  /**
   * Check if at max level
   * @returns {boolean}
   */
  isMaxLevel() {
    return this.currentLevel >= this.maxLevel;
  }

  /**
   * Get level data
   * @returns {Object}
   */
  getLevelData() {
    return getStageData(this.currentLevel);
  }

  /**
   * Calculate enemy stats based on level difficulty
   * @param {Object} baseStats - Base enemy stats
   * @returns {Object} Scaled stats
   */
  scaleEnemyStats(baseStats) {
    return {
      ...baseStats,
      health: Math.floor(baseStats.health * this.difficultyMultiplier),
      speed: baseStats.speed * Math.sqrt(this.difficultyMultiplier), // Scale speed less aggressively
      scoreValue: Math.floor(baseStats.scoreValue * this.difficultyMultiplier)
    };
  }

  /**
   * Reset level manager
   */
  reset() {
    this.currentLevel = 1;
    this.levelStartTime = 0;
    this.levelDuration = 0;
    this.difficultyMultiplier = 1;
  }

  /**
   * Add level change listener
   * @param {Function} listener
   */
  onLevelChange(listener) {
    this.levelChangeListeners.push(listener);
  }

  /**
   * Remove level change listener
   * @param {Function} listener
   */
  offLevelChange(listener) {
    const index = this.levelChangeListeners.indexOf(listener);
    if (index !== -1) {
      this.levelChangeListeners.splice(index, 1);
    }
  }

  /**
   * Notify all level change listeners
   * @param {number} level
   */
  notifyLevelChange(level) {
    this.levelChangeListeners.forEach(listener => {
      listener(level, this.difficultyMultiplier);
    });
  }

  /**
   * Get level statistics
   * @returns {Object}
   */
  getStats() {
    return {
      currentLevel: this.currentLevel,
      maxLevel: this.maxLevel,
      progress: this.getLevelProgress(),
      elapsedTime: this.getElapsedTime(),
      remainingTime: this.getRemainingTime(),
      difficultyMultiplier: this.difficultyMultiplier
    };
  }
}
