/**
 * AssetInitializer.js
 * Initializes all game assets and data
 */

import { assetLoader } from './AssetLoader.js';
import { PlaceholderAssets } from './PlaceholderAssets.js';
import { audioManager } from '../audio/AudioManager.js';

export class AssetInitializer {
  constructor() {
    this.assetsLoaded = false;
    this.loadingProgress = 0;
  }

  /**
   * Initialize all assets
   * @param {Function} onProgress - Progress callback (0-1)
   * @returns {Promise<void>}
   */
  async initialize(onProgress = null) {
    if (this.assetsLoaded) {
      return;
    }

    // Register progress callback
    if (onProgress) {
      assetLoader.onProgress(onProgress);
    }

    try {
      // Generate placeholder images
      const placeholders = PlaceholderAssets.generateAll();

      // Create image elements from data URLs
      const imagePromises = [];
      const imageKeys = [
        'player',
        'enemy1',
        'enemy2',
        'enemy3',
        'boss',
        'bulletPlayer',
        'bulletEnemy',
        'powerup',
        'background'
      ];

      for (const key of imageKeys) {
        const img = new Image();
        const loadPromise = new Promise((resolve, reject) => {
          img.onload = () => {
            assetLoader.images.set(key, img);
            resolve();
          };
          img.onerror = reject;
        });
        img.src = placeholders[key];
        imagePromises.push(loadPromise);
      }

      // Handle explosion frames
      if (placeholders.explosion && Array.isArray(placeholders.explosion)) {
        placeholders.explosion.forEach((frameUrl, index) => {
          const img = new Image();
          const loadPromise = new Promise((resolve, reject) => {
            img.onload = () => {
              assetLoader.images.set(`explosion_${index}`, img);
              resolve();
            };
            img.onerror = reject;
          });
          img.src = frameUrl;
          imagePromises.push(loadPromise);
        });
      }

      // Wait for all images to load
      await Promise.all(imagePromises);

      // Initialize placeholder sounds
      audioManager.createPlaceholderSounds();

      // Load stage data
      await this.loadStageData();

      this.assetsLoaded = true;
      console.log('All assets initialized successfully');
    } catch (error) {
      console.error('Failed to initialize assets:', error);
      throw error;
    }
  }

  /**
   * Load stage data files
   * @returns {Promise<void>}
   */
  async loadStageData() {
    const stageFiles = ['stage1.json', 'stage2.json', 'stage3.json'];
    const stageData = {};

    for (const file of stageFiles) {
      try {
        const response = await fetch(`/assets/data/${file}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }
        const data = await response.json();
        stageData[data.id] = data;
      } catch (error) {
        console.error(`Failed to load stage data: ${file}`, error);
        // Create fallback stage data
        stageData[file.replace('.json', '')] = this.createFallbackStageData(file);
      }
    }

    this.stageData = stageData;
  }

  /**
   * Create fallback stage data if loading fails
   * @param {string} filename - Stage filename
   * @returns {Object} Fallback stage data
   */
  createFallbackStageData(filename) {
    const stageNum = parseInt(filename.match(/\d+/)[0]);

    return {
      id: `stage${stageNum}`,
      name: `Stage ${stageNum}`,
      difficulty: stageNum,
      duration: 120000,
      scrollSpeed: 2,
      waves: [],
      boss: {
        time: 90000,
        type: 'boss1',
        health: 100 * stageNum,
        score: 5000 * stageNum
      },
      powerUpDropRate: 0.2,
      lifeDropRate: 0.1,
      scoreMultiplier: stageNum
    };
  }

  /**
   * Get stage data by ID
   * @param {string} stageId - Stage ID
   * @returns {Object|null} Stage data
   */
  getStageData(stageId) {
    return this.stageData?.[stageId] || null;
  }

  /**
   * Get all stage data
   * @returns {Object} All stage data
   */
  getAllStageData() {
    return this.stageData || {};
  }

  /**
   * Check if assets are loaded
   * @returns {boolean} True if loaded
   */
  isLoaded() {
    return this.assetsLoaded;
  }

  /**
   * Get asset by key
   * @param {string} key - Asset key
   * @returns {HTMLImageElement|null} Asset
   */
  getAsset(key) {
    return assetLoader.getImage(key);
  }

  /**
   * Get all assets
   * @returns {Map} All assets
   */
  getAllAssets() {
    return assetLoader.images;
  }

  /**
   * Create asset manifest for preloading
   * @returns {Object} Asset manifest
   */
  createManifest() {
    return {
      images: [
        { key: 'player', src: '/assets/images/sprites/player.png' },
        { key: 'enemy1', src: '/assets/images/sprites/enemy1.png' },
        { key: 'enemy2', src: '/assets/images/sprites/enemy2.png' },
        { key: 'enemy3', src: '/assets/images/sprites/enemy3.png' },
        { key: 'boss', src: '/assets/images/sprites/boss.png' },
        { key: 'bulletPlayer', src: '/assets/images/sprites/bullet_player.png' },
        { key: 'bulletEnemy', src: '/assets/images/sprites/bullet_enemy.png' },
        { key: 'powerup', src: '/assets/images/sprites/powerup.png' },
        { key: 'background', src: '/assets/images/backgrounds/space.png' }
      ],
      audio: [
        { key: 'shoot', src: '/assets/audio/sfx/shoot.mp3' },
        { key: 'explosion', src: '/assets/audio/sfx/explosion.mp3' },
        { key: 'powerup', src: '/assets/audio/sfx/powerup.mp3' },
        { key: 'hit', src: '/assets/audio/sfx/hit.mp3' },
        { key: 'stage1_music', src: '/assets/audio/music/stage1.mp3' },
        { key: 'stage2_music', src: '/assets/audio/music/stage2.mp3' },
        { key: 'stage3_music', src: '/assets/audio/music/stage3.mp3' }
      ]
    };
  }
}

// Export singleton instance
export const assetInitializer = new AssetInitializer();
