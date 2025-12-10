/**
 * HighScoreManager.js
 * Manages high scores and leaderboard
 */

export class HighScoreManager {
  constructor() {
    this.storageKey = 'shootingGameHighScores';
    this.maxEntries = 10;
  }

  /**
   * Add a new high score entry
   * @param {number} score - Score achieved
   * @param {string} playerName - Player name
   * @param {number} stage - Stage reached
   * @returns {number} Rank achieved (0-based), or -1 if not in top scores
   */
  addScore(score, playerName = 'Anonymous', stage = 1) {
    const scores = this.getScores();

    const newEntry = {
      score,
      playerName,
      stage,
      date: new Date().toISOString()
    };

    scores.push(newEntry);
    scores.sort((a, b) => b.score - a.score);

    // Find rank of new entry
    const rank = scores.findIndex(entry =>
      entry.score === score &&
      entry.date === newEntry.date
    );

    // Keep only top scores
    const trimmedScores = scores.slice(0, this.maxEntries);

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(trimmedScores));
      return rank < this.maxEntries ? rank : -1;
    } catch (error) {
      console.error('Failed to save high score:', error);
      return -1;
    }
  }

  /**
   * Get all high scores
   * @returns {Array} Array of high score entries
   */
  getScores() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load high scores:', error);
      return [];
    }
  }

  /**
   * Get top N scores
   * @param {number} count - Number of scores to retrieve
   * @returns {Array} Top N scores
   */
  getTopScores(count = 5) {
    const scores = this.getScores();
    return scores.slice(0, Math.min(count, scores.length));
  }

  /**
   * Get player's best score
   * @param {string} playerName - Player name
   * @returns {Object|null} Best score entry or null
   */
  getPlayerBest(playerName) {
    const scores = this.getScores();
    const playerScores = scores.filter(entry => entry.playerName === playerName);
    return playerScores.length > 0 ? playerScores[0] : null;
  }

  /**
   * Check if score qualifies for high score list
   * @param {number} score - Score to check
   * @returns {boolean} True if score qualifies
   */
  isHighScore(score) {
    const scores = this.getScores();
    if (scores.length < this.maxEntries) {
      return true;
    }
    return score > scores[scores.length - 1].score;
  }

  /**
   * Get minimum score needed for high score list
   * @returns {number} Minimum qualifying score
   */
  getMinimumScore() {
    const scores = this.getScores();
    if (scores.length < this.maxEntries) {
      return 0;
    }
    return scores[scores.length - 1].score;
  }

  /**
   * Clear all high scores
   * @returns {boolean} Success status
   */
  clearScores() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Failed to clear high scores:', error);
      return false;
    }
  }

  /**
   * Get statistics from high scores
   * @returns {Object} Statistics object
   */
  getStatistics() {
    const scores = this.getScores();

    if (scores.length === 0) {
      return {
        totalGames: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        totalPlayers: 0
      };
    }

    const scoreValues = scores.map(entry => entry.score);
    const uniquePlayers = new Set(scores.map(entry => entry.playerName));

    return {
      totalGames: scores.length,
      averageScore: Math.round(scoreValues.reduce((a, b) => a + b, 0) / scores.length),
      highestScore: Math.max(...scoreValues),
      lowestScore: Math.min(...scoreValues),
      totalPlayers: uniquePlayers.size
    };
  }

  /**
   * Export high scores as JSON
   * @returns {boolean} Success status
   */
  exportScores() {
    try {
      const scores = this.getScores();
      const blob = new Blob([JSON.stringify(scores, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `high-scores-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('Failed to export high scores:', error);
      return false;
    }
  }
}

// Export singleton instance
export const highScoreManager = new HighScoreManager();
