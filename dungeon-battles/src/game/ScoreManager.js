/**
 * ScoreManager.js - Score calculation and combo system
 * Features: Base scoring, bonuses, combos, high score tracking
 */
export class ScoreManager {
  constructor(config = {}) {
    // Default configuration
    const defaultConfig = {
      combo: {
        resetTime: 3.0,
        multipliers: {
          x1: 1.0,
          x2: 1.5,
          x3: 2.0
        }
      },
      scoring: {
        enemy: 100,
        boss: 1000,
        noDamageBonus: 500
      }
    };

    // Merge with provided config
    this.config = {
      combo: config.combo || defaultConfig.combo,
      scoring: config.scoring || defaultConfig.scoring
    };

    // Score tracking
    this.currentScore = 0;
    this.baseScore = 0;
    this.bonusScore = 0;

    // Combo system
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.comboResetTime = this.config.combo.resetTime;

    // Current multiplier
    this.multiplier = 1.0;

    // High score
    this.highScore = this.loadHighScore();

    // Stage tracking
    this.stageScores = [];
    this.noDamageBonus = false;

    // Callbacks
    this.onScoreChange = null;
    this.onComboChange = null;
    this.onNewHighScore = null;
  }

  /**
   * Update combo timer
   */
  update(deltaTime) {
    if (this.combo > 0 && this.comboTimer > 0) {
      this.comboTimer -= deltaTime;

      if (this.comboTimer <= 0) {
        this.resetCombo();
      }
    }
  }

  /**
   * Add points to score
   */
  addScore(points, applyMultiplier = true) {
    const finalPoints = applyMultiplier ? Math.floor(points * this.multiplier) : points;

    this.currentScore += finalPoints;
    this.baseScore += points;

    if (applyMultiplier && this.multiplier > 1.0) {
      this.bonusScore += finalPoints - points;
    }

    // Trigger callback
    if (this.onScoreChange) {
      this.onScoreChange(this.currentScore, finalPoints);
    }

    // Check for new high score
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      this.saveHighScore(this.highScore);

      if (this.onNewHighScore) {
        this.onNewHighScore(this.highScore);
      }
    }

    return finalPoints;
  }

  /**
   * Add to combo
   */
  addCombo() {
    this.combo++;
    this.comboTimer = this.comboResetTime;

    // Update max combo
    if (this.combo > this.maxCombo) {
      this.maxCombo = this.combo;
    }

    // Update multiplier based on combo tiers
    this.updateMultiplier();

    // Trigger callback
    if (this.onComboChange) {
      this.onComboChange(this.combo, this.multiplier);
    }
  }

  /**
   * Reset combo
   */
  resetCombo() {
    this.combo = 0;
    this.comboTimer = 0;
    this.updateMultiplier();

    if (this.onComboChange) {
      this.onComboChange(this.combo, this.multiplier);
    }
  }

  /**
   * Update score multiplier based on combo
   */
  updateMultiplier() {
    const comboConfig = this.config.combo;

    if (this.combo >= comboConfig.tier3.minHits) {
      this.multiplier = comboConfig.tier3.multiplier;
    } else if (this.combo >= comboConfig.tier2.minHits) {
      this.multiplier = comboConfig.tier2.multiplier;
    } else {
      this.multiplier = comboConfig.tier1.multiplier;
    }
  }

  /**
   * Award stage clear bonus
   */
  awardStageClear(stage, noDamage = false) {
    const basePoints = this.config.basePoints[`stage${stage}`] || 100;
    let totalPoints = basePoints;

    // No damage bonus
    if (noDamage) {
      const noDamagePoints = this.config.bonuses.noDamageStage;
      totalPoints += noDamagePoints;
      this.bonusScore += noDamagePoints;
    }

    this.addScore(totalPoints, false); // Don't apply multiplier to stage bonuses

    // Track stage score
    this.stageScores.push({
      stage: stage,
      score: totalPoints,
      noDamage: noDamage
    });

    return totalPoints;
  }

  /**
   * Award boss defeat bonus
   */
  awardBossDefeat(noDamage = false) {
    const basePoints = this.config.basePoints.boss;
    let totalPoints = basePoints;

    // No damage bonus
    if (noDamage) {
      const noDamagePoints = this.config.bonuses.noDamageBoss;
      totalPoints += noDamagePoints;
      this.bonusScore += noDamagePoints;
    }

    this.addScore(totalPoints, false);

    return totalPoints;
  }

  /**
   * Award enemy defeat points
   */
  awardEnemyDefeat(enemyType) {
    const points = this.config.basePoints[enemyType] || 50;
    return this.addScore(points, true); // Apply combo multiplier
  }

  /**
   * Award minion defeat points
   */
  awardMinionDefeat() {
    const points = this.config.basePoints.minion || 50;
    return this.addScore(points, true);
  }

  /**
   * Get current score
   */
  getScore() {
    return this.currentScore;
  }

  /**
   * Get high score
   */
  getHighScore() {
    return this.highScore;
  }

  /**
   * Get combo count
   */
  getCombo() {
    return this.combo;
  }

  /**
   * Get max combo
   */
  getMaxCombo() {
    return this.maxCombo;
  }

  /**
   * Get current multiplier
   */
  getMultiplier() {
    return this.multiplier;
  }

  /**
   * Get combo timer remaining
   */
  getComboTimeRemaining() {
    return this.comboTimer;
  }

  /**
   * Get detailed score breakdown
   */
  getScoreBreakdown() {
    return {
      total: this.currentScore,
      base: this.baseScore,
      bonus: this.bonusScore,
      stages: this.stageScores,
      combo: this.combo,
      maxCombo: this.maxCombo,
      multiplier: this.multiplier
    };
  }

  /**
   * Load high score from localStorage
   */
  loadHighScore() {
    try {
      const saved = localStorage.getItem('dungeonBattles_highScore');
      return saved ? parseInt(saved) : 0;
    } catch (e) {
      console.error('Failed to load high score:', e);
      return 0;
    }
  }

  /**
   * Save high score to localStorage
   */
  saveHighScore(score) {
    try {
      localStorage.setItem('dungeonBattles_highScore', score.toString());
    } catch (e) {
      console.error('Failed to save high score:', e);
    }
  }

  /**
   * Get ranking data
   */
  getRankingData() {
    // Could be extended to include online leaderboards
    return {
      highScore: this.highScore,
      currentScore: this.currentScore,
      rank: this.calculateRank(this.currentScore)
    };
  }

  /**
   * Calculate rank based on score
   */
  calculateRank(score) {
    if (score >= 50000) return 'S';
    if (score >= 30000) return 'A';
    if (score >= 20000) return 'B';
    if (score >= 10000) return 'C';
    if (score >= 5000) return 'D';
    return 'E';
  }

  /**
   * Reset score for new game
   */
  reset() {
    this.currentScore = 0;
    this.baseScore = 0;
    this.bonusScore = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.comboTimer = 0;
    this.multiplier = 1.0;
    this.stageScores = [];
    this.noDamageBonus = false;
  }

  /**
   * Set score change callback
   */
  setScoreChangeCallback(callback) {
    this.onScoreChange = callback;
  }

  /**
   * Set combo change callback
   */
  setComboChangeCallback(callback) {
    this.onComboChange = callback;
  }

  /**
   * Set new high score callback
   */
  setNewHighScoreCallback(callback) {
    this.onNewHighScore = callback;
  }
}
