/**
 * ImageLoader.js - Utility for loading and caching sprite images
 */

export class ImageLoader {
  constructor() {
    this.images = {};
    this.loaded = false;
    this.loadPromise = null;
  }

  /**
   * Load all game sprites
   */
  async loadAll() {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = this._loadImages();
    await this.loadPromise;
    this.loaded = true;
    return this.images;
  }

  async _loadImages() {
    const basePath = './assets/images/';

    const imageMap = {
      player: 'player_ship.png',
      slime: 'enemy_1.png',
      goblin: 'enemy_2.png',
      skeleton: 'enemy_3.png',
      demon: 'enemy_4.png',
      dragon: 'boss_1.png'
    };

    const loadPromises = [];

    for (const [key, filename] of Object.entries(imageMap)) {
      const promise = this._loadImage(basePath + filename, key);
      loadPromises.push(promise);
    }

    await Promise.all(loadPromises);
    console.log('[ImageLoader] All sprites loaded successfully');
  }

  async _loadImage(src, key) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.images[key] = img;
        console.log(`[ImageLoader] Loaded ${key}: ${img.width}x${img.height}`);
        resolve(img);
      };

      img.onerror = (err) => {
        console.error(`[ImageLoader] Failed to load ${key} from ${src}`);
        // Create a fallback colored rectangle image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;

        // Draw a colored square as fallback
        const colors = {
          player: '#00FF00',
          slime: '#FF6B6B',
          goblin: '#FFA500',
          skeleton: '#CCCCCC',
          demon: '#8B008B',
          dragon: '#FF0000'
        };

        ctx.fillStyle = colors[key] || '#808080';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Convert canvas to image
        const fallbackImg = new Image();
        fallbackImg.src = canvas.toDataURL();
        this.images[key] = fallbackImg;

        console.warn(`[ImageLoader] Using fallback for ${key}`);
        resolve(fallbackImg);
      };

      // Load image from relative path
      img.src = src;
    });
  }

  /**
   * Get a specific image
   */
  getImage(key) {
    return this.images[key] || null;
  }

  /**
   * Check if all images are loaded
   */
  isLoaded() {
    return this.loaded;
  }
}

// Global singleton instance
export const imageLoader = new ImageLoader();