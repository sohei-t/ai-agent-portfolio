/**
 * Difficulty settings for different game modes
 */
export const difficultySettings = {
  EASY: {
    id: 'easy',
    name: 'Easy',
    description: 'Relaxed gameplay for beginners',
    settings: {
      enemyHealthMultiplier: 0.7,
      enemySpeedMultiplier: 0.8,
      enemyFireRateMultiplier: 0.7,
      playerDamageMultiplier: 1.3,
      powerUpSpawnRate: 0.4,
      startingLives: 5,
      scoreMultiplier: 0.8
    }
  },

  NORMAL: {
    id: 'normal',
    name: 'Normal',
    description: 'Balanced gameplay experience',
    settings: {
      enemyHealthMultiplier: 1.0,
      enemySpeedMultiplier: 1.0,
      enemyFireRateMultiplier: 1.0,
      playerDamageMultiplier: 1.0,
      powerUpSpawnRate: 0.3,
      startingLives: 3,
      scoreMultiplier: 1.0
    }
  },

  HARD: {
    id: 'hard',
    name: 'Hard',
    description: 'Challenging gameplay for experienced players',
    settings: {
      enemyHealthMultiplier: 1.3,
      enemySpeedMultiplier: 1.2,
      enemyFireRateMultiplier: 1.3,
      playerDamageMultiplier: 0.8,
      powerUpSpawnRate: 0.2,
      startingLives: 2,
      scoreMultiplier: 1.5
    }
  },

  EXTREME: {
    id: 'extreme',
    name: 'Extreme',
    description: 'Brutal difficulty for masochists',
    settings: {
      enemyHealthMultiplier: 1.5,
      enemySpeedMultiplier: 1.4,
      enemyFireRateMultiplier: 1.5,
      playerDamageMultiplier: 0.6,
      powerUpSpawnRate: 0.15,
      startingLives: 1,
      scoreMultiplier: 2.0
    }
  }
};

/**
 * Get difficulty settings by ID
 * @param {string} difficultyId
 * @returns {Object} Difficulty settings
 */
export function getDifficulty(difficultyId) {
  const difficulty = Object.values(difficultySettings).find(
    d => d.id === difficultyId
  );
  return difficulty || difficultySettings.NORMAL;
}

/**
 * Get all available difficulties
 * @returns {Array} Array of difficulty objects
 */
export function getAllDifficulties() {
  return Object.values(difficultySettings);
}

export default difficultySettings;
