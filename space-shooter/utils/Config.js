/**
 * Config.js
 * Game configuration constants and values
 */

const Config = {
  canvas: {
    width: 800,
    height: 600,
    backgroundColor: '#0a0a1a'
  },
  player: {
    speed: 5,
    fireRate: 300,
    maxLives: 3,
    width: 30,
    height: 25
  },
  enemies: {
    rows: 5,
    cols: 11,
    speed: 1,
    descentAmount: 20,
    fireRate: 0.0008,
    speedIncreasePerWave: 0.1,
    baseSpeed: 1,
    maxSpeed: 8
  },
  bullet: {
    playerSpeed: 8,
    enemySpeed: 6,
    width: 4,
    height: 10
  },
  powerUps: {
    dropRate: 0.15,
    duration: 10000,
    maxActive: 3,
    types: ['RAPID_FIRE', 'SHIELD', 'MULTI_SHOT']
  },
  powerUpEffects: {
    RAPID_FIRE: { fireRate: 150 },
    SHIELD: { invincible: true },
    MULTI_SHOT: { bulletCount: 3, spreadAngle: 120 }
  },
  performance: {
    targetFPS: {
      highEnd: 60,
      midRange: 45,
      lowEnd: 30
    },
    maxParticles: {
      highEnd: 100,
      lowEnd: 50
    },
    fpsThreshold: 40,
    memoryLimit: 100
  },
  colors: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    background: '#0a0a1a',
    enemyTypes: ['#ff0080', '#00ff80', '#8000ff']
  }
};

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Config = Config;
}
