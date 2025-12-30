/**
 * config.js - Game configuration
 * Central configuration for all game systems
 */

export const GameConfig = {
  // Canvas settings
  canvas: {
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e'
  },

  // Mobile controls
  mobileControls: {
    enabled: true,
    virtualJoystick: {
      position: { x: 100, y: 500 },
      radius: 50,
      opacity: 0.6
    },
    attackButton: {
      enabled: true,
      position: { x: 700, y: 500 },
      size: 60,
      label: 'ATK',
      opacity: 0.6
    },
    magicButton: {
      enabled: true,
      position: { x: 650, y: 420 },
      size: 60,
      label: 'MAG',
      opacity: 0.6
    }
  },

  // Physics
  physics: {
    gravity: 0, // No gravity for vertical scrolling shooter
    friction: 0.98
  },

  // Collision
  collision: {
    quadTreeMaxObjects: 10,
    quadTreeMaxLevels: 5
  },

  // Player
  player: {
    width: 48,
    height: 48,
    speed: 200,
    maxHp: 100,
    maxMp: 100,
    attackPower: 10,
    magicPower: 20,
    attackCooldown: 0.3,
    magicCooldown: 1.0,
    invincibleTime: 2.0
  },

  // Enemy
  enemy: {
    spawnInterval: 2.0,
    maxActive: 15
  },

  // Boss
  boss: {
    hpMultiplier: 10,
    damageMultiplier: 2
  },

  // Bullets
  bullet: {
    playerSpeed: 400,
    enemySpeed: 250,
    lifetime: 3.0
  },

  // Items
  item: {
    spawnChance: 0.3,
    lifetime: 10.0
  },

  // Effects
  effects: {
    maxParticles: 500
  },

  // Performance
  performance: {
    targetFPS: 60,
    showFPS: true
  },

  // Debug
  debug: {
    enabled: true,
    showCollisionBoxes: false,
    showFPS: true,
    showEntityCount: true,
    godMode: false
  },

  // Game progression
  game: {
    totalStages: 10,
    continues: 3,
    difficultyRamp: 1.2 // Enemy HP/Damage multiplier per stage
  },

  // Asset paths
  assets: {
    basePath: './assets/',
    images: {
      player: 'images/player.png',
      enemy: 'images/enemy.png',
      boss: 'images/boss.png',
      bullet: 'images/bullet.png',
      item: 'images/item.png',
      background: 'images/background.png'
    },
    sounds: {
      shoot: 'sounds/shoot.mp3',
      explosion: 'sounds/explosion.mp3',
      hit: 'sounds/hit.mp3',
      powerup: 'sounds/powerup.mp3',
      bgm: 'sounds/bgm.mp3'
    }
  }
};
