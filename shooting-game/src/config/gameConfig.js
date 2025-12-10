/**
 * Game Configuration
 * All game constants and parameters
 */

export const GAME_CONFIG = {
  // Canvas settings
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  TARGET_FPS: 60,
  MAX_DELTA_TIME: 100, // Maximum deltaTime in ms to prevent spiral of death
  BACKGROUND_COLOR: '#000011',

  // Player settings
  PLAYER: {
    WIDTH: 64,
    HEIGHT: 64,
    SPEED: 300, // px/sec
    MAX_POWER: 3,
    MAX_HEALTH: 3,
    FIRE_RATE: 0.15, // seconds
    BULLET_SPEED: 800,
    BULLET_DAMAGE: 1,
    INVINCIBLE_TIME: 2000, // milliseconds
    START_X: 400,
    START_Y: 500,
    HITBOX_SCALE: 0.8, // Make hitbox smaller for more forgiving gameplay
    STARTING_LIVES: 3
  },

  SHIP_TYPES: {
    BALANCED: {
      label: 'BALANCED',
      speed: 300,
      fireRate: 0.15,
      power: 1,
      maxPower: 3,
      bulletType: 'PLAYER_NORMAL'
    },
    SPEED: {
      label: 'SPEED',
      speed: 380,
      fireRate: 0.1,
      power: 1,
      maxPower: 2,
      bulletType: 'PLAYER_NORMAL'
    },
    POWER: {
      label: 'POWER',
      speed: 260,
      fireRate: 0.2,
      power: 2,
      maxPower: 4,
      bulletType: 'PLAYER_POWER'
    }
  },

  // Enemy types
  ENEMY_TYPES: {
    BASIC: {
      width: 48,
      height: 48,
      health: 1,
      speed: 100,
      scoreValue: 100,
      fireRate: 2.0,
      movePattern: 'straight',
      color: '#ff0000'
    },
    FAST: {
      width: 40,
      height: 40,
      health: 1,
      speed: 250,
      scoreValue: 150,
      fireRate: null,
      movePattern: 'zigzag',
      color: '#ff6600'
    },
    TANK: {
      width: 64,
      height: 64,
      health: 5,
      speed: 50,
      scoreValue: 300,
      fireRate: 1.5,
      movePattern: 'sine',
      color: '#ffaa00'
    },
    BOSS: {
      width: 128,
      height: 128,
      health: 100,
      speed: 30,
      scoreValue: 5000,
      fireRate: 0.5,
      movePattern: 'boss',
      color: '#ff00ff'
    }
  },

  // Bullet settings
  BULLET: {
    PLAYER_NORMAL: {
      width: 8,
      height: 16,
      speed: 800,
      damage: 1,
      color: '#00FFFF'
    },
    PLAYER_POWER: {
      width: 12,
      height: 20,
      speed: 1000,
      damage: 2,
      color: '#FF00FF'
    },
    ENEMY_NORMAL: {
      width: 8,
      height: 16,
      speed: 300,
      damage: 1,
      color: '#FF0000'
    }
  },

  // Power-up settings
  POWERUP: {
    POWER: {
      width: 32,
      height: 32,
      probability: 0.1,
      duration: 15000, // milliseconds
      color: '#FFFF00'
    },
    SHIELD: {
      width: 32,
      height: 32,
      probability: 0.05,
      duration: 8000,
      color: '#00FF00'
    },
    BOMB: {
      width: 32,
      height: 32,
      probability: 0.03,
      color: '#FF6600'
    },
    LIFE: {
      width: 32,
      height: 32,
      probability: 0.02,
      healAmount: 30,
      color: '#FF0088'
    },
    RAPID_FIRE: {
      width: 32,
      height: 32,
      probability: 0.08,
      duration: 10000,
      color: '#FF00FF'
    },
    SCORE_MULTIPLIER: {
      width: 32,
      height: 32,
      probability: 0.07,
      duration: 12000,
      multiplier: 2,
      color: '#00FFFF'
    },
    FALL_SPEED: 100, // pixels per second
    SPAWN_CHANCE: 0.3 // Chance to spawn when enemy is destroyed
  },

  // Pool sizes
  POOLS: {
    PLAYER_BULLETS: 100,
    ENEMY_BULLETS: 200,
    ENEMIES: 50,
    POWERUPS: 20,
    PARTICLES: 200
  },

  // Score system
  SCORE: {
    COMBO_TIMEOUT: 2000, // milliseconds
    COMBO_MULTIPLIER: 0.1,
    LEVEL_CLEAR_BONUS: 1000,
    NO_HIT_BONUS: 500
  },

  // Levels
  LEVELS: [
    {
      id: 1,
      duration: 60,
      spawnRate: 2.0,
      enemyTypes: ['BASIC', 'FAST']
    },
    {
      id: 2,
      duration: 90,
      spawnRate: 1.5,
      enemyTypes: ['BASIC', 'FAST', 'TANK']
    },
    {
      id: 3,
      duration: 120,
      spawnRate: 1.0,
      enemyTypes: ['BASIC', 'FAST', 'TANK'],
      boss: 'BOSS'
    }
  ],

  // Wave system
  WAVES: {
    SPAWN_INTERVAL: 3000, // milliseconds between waves
    ENEMIES_PER_WAVE_MIN: 3,
    ENEMIES_PER_WAVE_MAX: 8,
    BOSS_WAVE_INTERVAL: 5, // Boss appears every N waves
    DIFFICULTY_SCALING: 1.1 // Multiplier for each level
  },

  // Performance settings
  PERFORMANCE: {
    MAX_ENTITIES: 500,
    MAX_PARTICLES: 200,
    PARTICLE_LIFETIME: 1000, // milliseconds
    ENABLE_PARTICLES: true,
    ENABLE_SHADOWS: true
  },

  // Visual effects
  EFFECTS: {
    SCREEN_SHAKE: {
      ENABLED: true,
      INTENSITY: 5,
      DURATION: 200
    },
    EXPLOSIONS: {
      ENABLED: true,
      PARTICLE_COUNT: 20,
      COLORS: ['#ff6600', '#ff9900', '#ffcc00', '#ffffff']
    }
  }
};

export const CONTROLS = {
  KEYBOARD: {
    UP: ['ArrowUp', 'w', 'W'],
    DOWN: ['ArrowDown', 's', 'S'],
    LEFT: ['ArrowLeft', 'a', 'A'],
    RIGHT: ['ArrowRight', 'd', 'D'],
    SHOOT: [' ', 'Space'],
    BOMB: ['b', 'B'],
    PAUSE: ['Escape', 'p', 'P']
  }
};

// Game states
export const GAME_STATES = {
  LOADING: 'loading',
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'game_over',
  LEVEL_CLEAR: 'level_clear'
};

export default GAME_CONFIG;
