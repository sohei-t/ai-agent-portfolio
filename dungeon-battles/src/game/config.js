/**
 * config.js - Game configuration
 * Central configuration for all game systems
 */

export const GameConfig = {
  // Canvas settings
  canvas: {
    width: 1200,  // Increased from 800
    height: 800,  // Increased from 600
    backgroundColor: '#1a1a2e'
  },

  // Mobile controls (positions adjusted for larger canvas)
  mobileControls: {
    enabled: true,
    virtualJoystick: {
      position: { x: 150, y: 650 },  // Adjusted for larger screen
      radius: 60,  // Slightly larger for better visibility
      opacity: 0.6
    },
    attackButton: {
      enabled: true,
      position: { x: 1050, y: 650 },  // Adjusted for larger screen
      size: 70,  // Slightly larger
      label: 'ATK',
      opacity: 0.6
    },
    magicButton: {
      enabled: true,
      position: { x: 970, y: 560 },  // Adjusted for larger screen
      size: 70,  // Slightly larger
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

  // Player (size increased for larger screen)
  player: {
    width: 56,  // Increased from 48
    height: 56,  // Increased from 48
    speed: 250,  // Increased for larger play area
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
