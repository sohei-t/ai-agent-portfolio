/**
 * Wave Manager
 * Manages enemy wave spawning patterns and timing
 */
import { getStageData, getFormation } from '../config/stageData.js';
import { getEnemyType } from '../config/enemyData.js';

export class WaveManager {
  constructor(levelManager) {
    this.levelManager = levelManager;
    this.waves = [];
    this.currentWaveIndex = 0;
    this.activeWaves = [];
    this.levelStartTime = 0;
    this.bossSpawned = false;
  }

  /**
   * Initialize waves for current level
   */
  initializeWaves() {
    const stageData = getStageData(this.levelManager.getCurrentLevel());
    this.waves = [...stageData.waves];

    // Add boss wave if defined
    if (stageData.boss) {
      this.waves.push({
        time: stageData.boss.time,
        type: stageData.boss.type,
        count: 1,
        formation: 'line',
        isBoss: true
      });
    }

    // Sort waves by time
    this.waves.sort((a, b) => a.time - b.time);

    this.currentWaveIndex = 0;
    this.activeWaves = [];
    this.levelStartTime = Date.now();
    this.bossSpawned = false;
  }

  /**
   * Update wave spawning
   * @returns {Array} Array of enemy spawn data
   */
  update() {
    const elapsedTime = (Date.now() - this.levelStartTime) / 1000;
    const spawns = [];

    // Check if it's time to spawn the next wave
    while (
      this.currentWaveIndex < this.waves.length &&
      elapsedTime >= this.waves[this.currentWaveIndex].time
    ) {
      const wave = this.waves[this.currentWaveIndex];
      const enemies = this.spawnWave(wave);
      spawns.push(...enemies);

      if (wave.isBoss) {
        this.bossSpawned = true;
      }

      this.currentWaveIndex++;
    }

    return spawns;
  }

  /**
   * Spawn a wave of enemies
   * @param {Object} waveData - Wave configuration
   * @returns {Array} Array of enemy spawn data
   */
  spawnWave(waveData) {
    const enemies = [];
    const enemyType = getEnemyType(waveData.type);
    const formation = getFormation(waveData.formation);

    // Get spawn positions from formation
    const positions = formation.getPositions(
      waveData.count,
      400, // Center X
      -50  // Start above screen
    );

    // Create enemy spawn data for each position
    positions.forEach(pos => {
      const scaledEnemy = this.levelManager.scaleEnemyStats(enemyType);

      enemies.push({
        ...scaledEnemy,
        type: waveData.type, // Add type field for Enemy constructor
        x: pos.x,
        y: pos.y,
        isBoss: waveData.isBoss || false
      });
    });

    // Track boss spawn
    if (waveData.isBoss) {
      this.bossSpawned = true;
    }

    // Track active wave
    this.activeWaves.push({
      ...waveData,
      spawnTime: Date.now(),
      enemyCount: enemies.length
    });

    return enemies;
  }

  /**
   * Check if boss has been spawned
   * @returns {boolean}
   */
  isBossSpawned() {
    return this.bossSpawned;
  }

  /**
   * Check if all waves are complete
   * @returns {boolean}
   */
  isComplete() {
    return this.currentWaveIndex >= this.waves.length;
  }

  /**
   * Get remaining waves count
   * @returns {number}
   */
  getRemainingWaves() {
    return Math.max(0, this.waves.length - this.currentWaveIndex);
  }

  /**
   * Get next wave time
   * @returns {number} Time in seconds until next wave (or -1 if no waves left)
   */
  getNextWaveTime() {
    if (this.currentWaveIndex >= this.waves.length) {
      return -1;
    }

    const elapsedTime = (Date.now() - this.levelStartTime) / 1000;
    const nextWave = this.waves[this.currentWaveIndex];
    return Math.max(0, nextWave.time - elapsedTime);
  }

  /**
   * Get current wave info
   * @returns {Object|null}
   */
  getCurrentWave() {
    if (this.currentWaveIndex === 0) return null;
    return this.waves[this.currentWaveIndex - 1];
  }

  /**
   * Get next wave info
   * @returns {Object|null}
   */
  getNextWave() {
    if (this.currentWaveIndex >= this.waves.length) return null;
    return this.waves[this.currentWaveIndex];
  }

  /**
   * Reset wave manager
   */
  reset() {
    this.waves = [];
    this.currentWaveIndex = 0;
    this.activeWaves = [];
    this.levelStartTime = 0;
    this.bossSpawned = false;
  }

  /**
   * Get wave statistics
   * @returns {Object}
   */
  getStats() {
    return {
      totalWaves: this.waves.length,
      completedWaves: this.currentWaveIndex,
      remainingWaves: this.getRemainingWaves(),
      nextWaveTime: this.getNextWaveTime(),
      bossSpawned: this.bossSpawned,
      activeWaves: this.activeWaves.length
    };
  }
}
