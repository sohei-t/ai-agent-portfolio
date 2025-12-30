/**
 * AssetLoader.js
 * Comprehensive asset loading system with automatic resizing and progress tracking
 *
 * Features:
 * - Pre-loading all game assets
 * - Automatic size adjustment via ImageProcessor
 * - Progress tracking and callbacks
 * - Error handling with fallbacks
 * - Placeholder generation for missing assets
 */

import { ImageProcessor } from './ImageProcessor.js';

export class AssetLoader {
  constructor() {
    this.imageProcessor = new ImageProcessor();
    this.assets = new Map();
    this.spriteConfig = null;
    this.loadingProgress = 0;
    this.totalAssets = 0;
    this.loadedAssets = 0;
    this.failedAssets = [];
    this.onProgressCallback = null;
    this.onCompleteCallback = null;
  }

  /**
   * Initialize asset loader
   */
  async initialize() {
    console.log('Initializing AssetLoader...');

    // Initialize image processor
    await this.imageProcessor.initialize();

    // Load sprite configuration
    try {
      const response = await fetch('/config/sprite_specifications.json');
      this.spriteConfig = await response.json();
      console.log('Sprite configuration loaded');
    } catch (error) {
      console.error('Failed to load sprite configuration:', error);
      this.spriteConfig = this.getDefaultSpriteConfig();
    }
  }

  /**
   * Get default sprite configuration
   */
  getDefaultSpriteConfig() {
    return {
      sprites: {
        player: {
          file: 'assets/sprites/player/player_ship.png',
          type: 'player',
          required: true,
          placeholder: {
            shape: 'triangle',
            color: '#4A90E2',
            outline: '#FFFFFF',
            outlineWidth: 2
          }
        },
        enemies: [
          {
            name: 'Enemy 1',
            file: 'assets/sprites/enemies/enemy_1.png',
            type: 'enemy_small',
            required: true,
            placeholder: { shape: 'circle', color: '#E74C3C', label: 'E1' }
          },
          {
            name: 'Enemy 2',
            file: 'assets/sprites/enemies/enemy_2.png',
            type: 'enemy_medium',
            required: true,
            placeholder: { shape: 'circle', color: '#E67E22', label: 'E2' }
          },
          {
            name: 'Enemy 3',
            file: 'assets/sprites/enemies/enemy_3.png',
            type: 'enemy_medium',
            required: true,
            placeholder: { shape: 'square', color: '#9B59B6', label: 'E3' }
          },
          {
            name: 'Enemy 4',
            file: 'assets/sprites/enemies/enemy_4.png',
            type: 'enemy_large',
            required: true,
            placeholder: { shape: 'square', color: '#8E44AD', label: 'E4' }
          }
        ],
        boss: {
          file: 'assets/sprites/boss/boss_1.png',
          type: 'boss',
          required: true,
          placeholder: {
            shape: 'hexagon',
            color: '#C0392B',
            outline: '#FF0000',
            outlineWidth: 4,
            label: 'BOSS'
          }
        },
        bullets: {
          player_normal: {
            file: 'assets/sprites/bullets/player_normal.png',
            type: 'bullet_player',
            placeholder: { shape: 'rectangle', color: '#3498DB' }
          },
          player_magic: {
            file: 'assets/sprites/bullets/player_magic.png',
            type: 'bullet_player_magic',
            placeholder: { shape: 'circle', color: '#00D4FF' }
          },
          enemy_bullet: {
            file: 'assets/sprites/bullets/enemy_bullet.png',
            type: 'bullet_enemy',
            placeholder: { shape: 'circle', color: '#E74C3C' }
          }
        },
        items: {
          hp_potion: {
            file: 'assets/sprites/items/hp_potion.png',
            type: 'powerup',
            placeholder: { shape: 'circle', color: '#2ECC71', label: 'HP' }
          },
          mp_potion: {
            file: 'assets/sprites/items/mp_potion.png',
            type: 'powerup',
            placeholder: { shape: 'circle', color: '#3498DB', label: 'MP' }
          },
          weapon_upgrade: {
            file: 'assets/sprites/items/weapon_upgrade.png',
            type: 'powerup',
            placeholder: { shape: 'diamond', color: '#F39C12', label: 'ATK' }
          },
          magic_upgrade: {
            file: 'assets/sprites/items/magic_upgrade.png',
            type: 'powerup',
            placeholder: { shape: 'diamond', color: '#9B59B6', label: 'MAG' }
          }
        }
      }
    };
  }

  /**
   * Set progress callback
   */
  onProgress(callback) {
    this.onProgressCallback = callback;
  }

  /**
   * Set completion callback
   */
  onComplete(callback) {
    this.onCompleteCallback = callback;
  }

  /**
   * Load specific assets by list
   */
  async loadAssets(assetList) {
    console.log('Loading specified assets...');

    for (const asset of assetList) {
      try {
        const img = new Image();
        img.src = asset.path;

        await new Promise((resolve, reject) => {
          img.onload = () => {
            this.assets.set(asset.id, img);
            console.log(`Loaded ${asset.id}: ${img.width}x${img.height}`);
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load ${asset.id} from ${asset.path}`);
            // Create placeholder
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');

            const colors = {
              'player': '#00FF00',
              'enemy_1': '#FF6B6B',
              'enemy_2': '#FFA500',
              'enemy_3': '#CCCCCC',
              'enemy_4': '#8B008B',
              'boss_1': '#FF0000'
            };

            ctx.fillStyle = colors[asset.id] || '#808080';
            ctx.fillRect(0, 0, 64, 64);

            const placeholderImg = new Image();
            placeholderImg.src = canvas.toDataURL();
            this.assets.set(asset.id, placeholderImg);
            resolve();
          };
        });
      } catch (error) {
        console.error(`Error loading ${asset.id}:`, error);
      }
    }

    this.loadedAssets = assetList.length;
    this.totalAssets = assetList.length;
    this.loadingProgress = 100;

    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
  }

  /**
   * Get an asset by ID
   */
  getAsset(id) {
    return this.assets.get(id);
  }

  /**
   * Load all game assets
   */
  async loadAll() {
    console.log('Loading all game assets...');

    const loadPromises = [];

    // Load player sprite
    loadPromises.push(this.loadAsset('player', this.spriteConfig.sprites.player));

    // Load enemy sprites
    this.spriteConfig.sprites.enemies.forEach((enemy, index) => {
      loadPromises.push(this.loadAsset(`enemy_${index + 1}`, enemy));
    });

    // Load boss sprite
    loadPromises.push(this.loadAsset('boss', this.spriteConfig.sprites.boss));

    // Load bullet sprites
    Object.entries(this.spriteConfig.sprites.bullets).forEach(([key, bullet]) => {
      loadPromises.push(this.loadAsset(key, bullet));
    });

    // Load item sprites
    Object.entries(this.spriteConfig.sprites.items).forEach(([key, item]) => {
      loadPromises.push(this.loadAsset(key, item));
    });

    this.totalAssets = loadPromises.length;

    // Wait for all assets to load
    await Promise.allSettled(loadPromises);

    console.log(`Asset loading complete: ${this.loadedAssets}/${this.totalAssets} loaded`);
    if (this.failedAssets.length > 0) {
      console.warn('Failed assets:', this.failedAssets);
    }

    // Call completion callback
    if (this.onCompleteCallback) {
      this.onCompleteCallback({
        total: this.totalAssets,
        loaded: this.loadedAssets,
        failed: this.failedAssets
      });
    }

    return this.assets;
  }

  /**
   * Load individual asset
   */
  async loadAsset(key, config) {
    try {
      const image = await this.loadImage(config.file);
      const processedCanvas = await this.imageProcessor.processImage(image, config.type);

      this.assets.set(key, {
        canvas: processedCanvas,
        type: config.type,
        width: processedCanvas.width,
        height: processedCanvas.height,
        placeholder: false
      });

      this.loadedAssets++;
      this.updateProgress();

      console.log(`Loaded: ${key} (${processedCanvas.width}x${processedCanvas.height})`);

      return true;
    } catch (error) {
      console.warn(`Failed to load ${key} from ${config.file}:`, error.message);

      // Create placeholder
      const placeholderCanvas = this.imageProcessor.createPlaceholder(config.type, config);

      this.assets.set(key, {
        canvas: placeholderCanvas,
        type: config.type,
        width: placeholderCanvas.width,
        height: placeholderCanvas.height,
        placeholder: true
      });

      this.failedAssets.push({ key, file: config.file, error: error.message });
      this.loadedAssets++;
      this.updateProgress();

      return false;
    }
  }

  /**
   * Load image from URL
   */
  loadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        resolve(image);
      };

      image.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`));
      };

      // Add timestamp to prevent caching issues
      const timestamp = new Date().getTime();
      image.src = url.includes('?') ? `${url}&t=${timestamp}` : `${url}?t=${timestamp}`;

      // Timeout after 10 seconds
      setTimeout(() => {
        if (!image.complete) {
          reject(new Error(`Image load timeout: ${url}`));
        }
      }, 10000);
    });
  }

  /**
   * Update loading progress
   */
  updateProgress() {
    this.loadingProgress = (this.loadedAssets / this.totalAssets) * 100;

    if (this.onProgressCallback) {
      this.onProgressCallback({
        progress: this.loadingProgress,
        loaded: this.loadedAssets,
        total: this.totalAssets
      });
    }
  }

  /**
   * Get loaded asset
   */
  getAsset(key) {
    return this.assets.get(key);
  }

  /**
   * Get asset canvas
   */
  getCanvas(key) {
    const asset = this.assets.get(key);
    return asset ? asset.canvas : null;
  }

  /**
   * Check if asset is placeholder
   */
  isPlaceholder(key) {
    const asset = this.assets.get(key);
    return asset ? asset.placeholder : false;
  }

  /**
   * Get all loaded assets
   */
  getAllAssets() {
    return this.assets;
  }

  /**
   * Get loading statistics
   */
  getStats() {
    return {
      total: this.totalAssets,
      loaded: this.loadedAssets,
      failed: this.failedAssets.length,
      progress: this.loadingProgress,
      failedAssets: this.failedAssets
    };
  }

  /**
   * Preload next stage assets (for optimization)
   */
  async preloadStageAssets(stageNumber) {
    console.log(`Preloading assets for stage ${stageNumber}...`);
    // Implementation for lazy loading if needed
  }

  /**
   * Clear all cached assets
   */
  clear() {
    this.assets.clear();
    this.imageProcessor.clearCache();
    this.loadedAssets = 0;
    this.failedAssets = [];
    this.loadingProgress = 0;
  }
}
