/**
 * EnemySpawner - Manages enemy wave spawning
 */
import { GAME_CONFIG } from '../config/gameConfig.js';

export class EnemySpawner {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.spawnTimer = 0;
    this.waveNumber = 0;
    this.currentLevel = 1;
  }

  /**
   * Update spawn timer
   */
  update(deltaTime) {
    this.spawnTimer += deltaTime;
  }

  /**
   * Check if should spawn enemies
   */
  shouldSpawn() {
    const level = GAME_CONFIG.LEVELS[this.currentLevel - 1];
    if (!level) return false;

    return this.spawnTimer >= level.spawnRate;
  }

  /**
   * Spawn enemy wave
   */
  spawnWave() {
    if (!this.shouldSpawn()) return [];

    this.spawnTimer = 0;
    this.waveNumber++;

    const level = GAME_CONFIG.LEVELS[this.currentLevel - 1];
    const enemyTypes = level.enemyTypes;
    const enemyCount = Math.floor(Math.random() * 3) + 3; // 3-5 enemies

    const enemies = [];

    for (let i = 0; i < enemyCount; i++) {
      const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const x = Math.random() * (this.canvasWidth - 100) + 50;
      const y = -50;

      enemies.push({
        type: enemyType,
        x: x,
        y: y
      });
    }

    return enemies;
  }

  /**
   * Spawn boss
   */
  spawnBoss() {
    const x = this.canvasWidth / 2 - 64;
    const y = -128;

    return {
      type: 'BOSS',
      x: x,
      y: y
    };
  }

  /**
   * Set level
   */
  setLevel(level) {
    this.currentLevel = level;
    this.waveNumber = 0;
    this.spawnTimer = 0;
  }

  /**
   * Reset spawner
   */
  reset() {
    this.spawnTimer = 0;
    this.waveNumber = 0;
    this.currentLevel = 1;
  }
}
