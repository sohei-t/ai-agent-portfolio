/**
 * Enemy type definitions and parameters
 */
export const enemyTypes = {
  BASIC: {
    id: 'basic',
    name: 'Scout',
    width: 30,
    height: 30,
    health: 10,
    speed: 150,
    scoreValue: 100,
    fireRate: 2000, // milliseconds
    color: '#ff0000',
    movementPattern: 'straight',
    bulletSpeed: 250,
    bulletDamage: 10,
    canShoot: true
  },

  FAST: {
    id: 'fast',
    name: 'Interceptor',
    width: 25,
    height: 25,
    health: 5,
    speed: 300,
    scoreValue: 150,
    fireRate: 0, // Doesn't shoot
    color: '#ff6600',
    movementPattern: 'zigzag',
    bulletSpeed: 0,
    bulletDamage: 0,
    canShoot: false
  },

  MEDIUM: {
    id: 'medium',
    name: 'Fighter',
    width: 40,
    height: 40,
    health: 25,
    speed: 120,
    scoreValue: 200,
    fireRate: 1500,
    color: '#ff00ff',
    movementPattern: 'sine',
    bulletSpeed: 300,
    bulletDamage: 15,
    canShoot: true
  },

  HEAVY: {
    id: 'heavy',
    name: 'Destroyer',
    width: 50,
    height: 50,
    health: 50,
    speed: 80,
    scoreValue: 300,
    fireRate: 1000,
    color: '#8800ff',
    movementPattern: 'straight',
    bulletSpeed: 200,
    bulletDamage: 20,
    canShoot: true
  },

  KAMIKAZE: {
    id: 'kamikaze',
    name: 'Suicide Drone',
    width: 20,
    height: 20,
    health: 1,
    speed: 350,
    scoreValue: 80,
    fireRate: 0,
    color: '#ffff00',
    movementPattern: 'homing',
    bulletSpeed: 0,
    bulletDamage: 0,
    canShoot: false,
    contactDamage: 30
  },

  SNIPER: {
    id: 'sniper',
    name: 'Railgun',
    width: 35,
    height: 35,
    health: 15,
    speed: 100,
    scoreValue: 250,
    fireRate: 3000,
    color: '#00ffff',
    movementPattern: 'circle',
    bulletSpeed: 600,
    bulletDamage: 25,
    canShoot: true
  },

  BOSS_1: {
    id: 'boss_1',
    name: 'Mothership',
    width: 120,
    height: 100,
    health: 500,
    speed: 50,
    scoreValue: 5000,
    fireRate: 500,
    color: '#ff0088',
    movementPattern: 'boss_pattern_1',
    bulletSpeed: 300,
    bulletDamage: 20,
    canShoot: true,
    isBoss: true,
    phases: [
      {
        healthThreshold: 1.0,
        fireRate: 800,
        pattern: 'spread'
      },
      {
        healthThreshold: 0.6,
        fireRate: 600,
        pattern: 'spiral'
      },
      {
        healthThreshold: 0.3,
        fireRate: 400,
        pattern: 'burst'
      }
    ]
  },

  BOSS_2: {
    id: 'boss_2',
    name: 'Dreadnought',
    width: 140,
    height: 120,
    health: 800,
    speed: 40,
    scoreValue: 8000,
    fireRate: 400,
    color: '#aa00ff',
    movementPattern: 'boss_pattern_2',
    bulletSpeed: 350,
    bulletDamage: 25,
    canShoot: true,
    isBoss: true,
    phases: [
      {
        healthThreshold: 1.0,
        fireRate: 600,
        pattern: 'laser'
      },
      {
        healthThreshold: 0.5,
        fireRate: 400,
        pattern: 'multi_spread'
      },
      {
        healthThreshold: 0.2,
        fireRate: 300,
        pattern: 'chaos'
      }
    ]
  },

  BOSS_3: {
    id: 'boss_3',
    name: 'Omega Carrier',
    width: 160,
    height: 140,
    health: 1200,
    speed: 35,
    scoreValue: 12000,
    fireRate: 350,
    color: '#ff0000',
    movementPattern: 'boss_pattern_3',
    bulletSpeed: 400,
    bulletDamage: 30,
    canShoot: true,
    isBoss: true,
    spawnMinions: true,
    minionSpawnRate: 5000,
    phases: [
      {
        healthThreshold: 1.0,
        fireRate: 500,
        pattern: 'ring'
      },
      {
        healthThreshold: 0.7,
        fireRate: 400,
        pattern: 'double_spiral'
      },
      {
        healthThreshold: 0.4,
        fireRate: 300,
        pattern: 'bullet_hell'
      }
    ]
  }
};

/**
 * Get enemy type by ID
 * @param {string} enemyId
 * @returns {Object} Enemy data
 */
export function getEnemyType(enemyId) {
  return enemyTypes[enemyId.toUpperCase()] || enemyTypes.BASIC;
}

/**
 * Get random enemy type (excluding bosses)
 * @returns {Object} Random enemy data
 */
export function getRandomEnemyType() {
  const normalEnemies = Object.values(enemyTypes).filter(e => !e.isBoss);
  return normalEnemies[Math.floor(Math.random() * normalEnemies.length)];
}

/**
 * Get boss for specific level
 * @param {number} level
 * @returns {Object} Boss enemy data
 */
export function getBossForLevel(level) {
  if (level <= 3) return enemyTypes.BOSS_1;
  if (level <= 7) return enemyTypes.BOSS_2;
  return enemyTypes.BOSS_3;
}

/**
 * Scale enemy stats based on difficulty and level
 * @param {Object} enemyData - Base enemy data
 * @param {number} difficultyMultiplier
 * @param {number} levelMultiplier
 * @returns {Object} Scaled enemy data
 */
export function scaleEnemy(enemyData, difficultyMultiplier = 1, levelMultiplier = 1) {
  return {
    ...enemyData,
    health: Math.floor(enemyData.health * difficultyMultiplier * levelMultiplier),
    speed: enemyData.speed * difficultyMultiplier,
    fireRate: Math.max(200, enemyData.fireRate / difficultyMultiplier),
    scoreValue: Math.floor(enemyData.scoreValue * levelMultiplier)
  };
}

export default enemyTypes;
