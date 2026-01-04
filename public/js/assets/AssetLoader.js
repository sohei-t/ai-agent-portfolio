/**
 * AssetLoader.js - Image Asset Loading for Racing Game
 *
 * Loads car sprites and game assets with fallback support
 */

export class AssetLoader {
  constructor() {
    // Base path for images
    this.basePath = './assets/images/';

    // Loaded images
    this.images = {};

    // Loading state
    this.loaded = false;
    this.loadPromise = null;

    // Asset definitions with fallback colors
    this.assetDefs = {
      // Player car
      player_car: { fallback: '#FF2D55' },

      // Traffic cars
      traffic_blue_sedan: { fallback: '#3498db' },
      traffic_red_sports: { fallback: '#e74c3c' },
      traffic_green_suv: { fallback: '#2ecc71' },
      traffic_yellow_taxi: { fallback: '#f39c12' },
      traffic_purple_muscle: { fallback: '#9b59b6' },
      traffic_white_van: { fallback: '#ecf0f1' },
      traffic_orange_truck: { fallback: '#e67e22' },
      traffic_teal_compact: { fallback: '#1abc9c' },

      // Special vehicles
      police_car: { fallback: '#2c3e50' },

      // Items
      item_boost: { fallback: '#00bcd4', emoji: '🚀' },
      item_shield: { fallback: '#4caf50', emoji: '🛡️' },
      item_slowmo: { fallback: '#9c27b0', emoji: '⏱️' },

      // Obstacles
      obstacle_puddle: { fallback: '#3498db' },
      obstacle_oil: { fallback: '#2c3e50' },
      obstacle_pothole: { fallback: '#222222' }
    };

    // Traffic car keys for random selection
    this.trafficCarKeys = [
      'traffic_blue_sedan',
      'traffic_red_sports',
      'traffic_green_suv',
      'traffic_yellow_taxi',
      'traffic_purple_muscle',
      'traffic_white_van',
      'traffic_orange_truck',
      'traffic_teal_compact'
    ];
  }

  /**
   * Load all images
   */
  async loadAll() {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = this._loadAllImages();
    return this.loadPromise;
  }

  async _loadAllImages() {
    const loadPromises = [];

    for (const key of Object.keys(this.assetDefs)) {
      loadPromises.push(this._loadImage(key));
    }

    const results = await Promise.allSettled(loadPromises);

    const loaded = results.filter(r => r.status === 'fulfilled' && r.value).length;
    const failed = results.filter(r => r.status === 'rejected' || !r.value).length;

    console.log(`Images loaded: ${loaded} success, ${failed} using fallback`);
    this.loaded = true;

    return { loaded, failed };
  }

  async _loadImage(key) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = this.basePath + key + '.png';

      img.onload = () => {
        this.images[key] = img;
        resolve(true);
      };

      img.onerror = () => {
        // Create fallback image
        this.images[key] = this._createFallback(key);
        resolve(false);
      };
    });
  }

  /**
   * Create fallback canvas image
   */
  _createFallback(key) {
    const def = this.assetDefs[key];
    const size = key.startsWith('item_') || key.startsWith('obstacle_') ? 64 : 128;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (key.startsWith('item_') && def.emoji) {
      // Draw emoji for items
      ctx.font = `${size * 0.8}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(def.emoji, size / 2, size / 2);
    } else if (key.includes('car') || key.includes('traffic') || key.includes('police')) {
      // Draw car shape
      this._drawCarFallback(ctx, size, def.fallback);
    } else if (key.startsWith('obstacle_')) {
      // Draw obstacle shape
      this._drawObstacleFallback(ctx, size, def.fallback, key);
    } else {
      // Generic circle
      ctx.fillStyle = def.fallback;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  _drawCarFallback(ctx, size, color) {
    const w = size * 0.4;
    const h = size * 0.7;
    const x = (size - w) / 2;
    const y = (size - h) / 2;

    // Car body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();

    // Windshield
    ctx.fillStyle = '#333';
    ctx.fillRect(x + w * 0.15, y + h * 0.15, w * 0.7, h * 0.2);

    // Wheels
    ctx.fillStyle = '#111';
    ctx.fillRect(x - 4, y + h * 0.1, 6, h * 0.2);
    ctx.fillRect(x + w - 2, y + h * 0.1, 6, h * 0.2);
    ctx.fillRect(x - 4, y + h * 0.7, 6, h * 0.2);
    ctx.fillRect(x + w - 2, y + h * 0.7, 6, h * 0.2);
  }

  _drawObstacleFallback(ctx, size, color, key) {
    ctx.fillStyle = color;

    if (key === 'obstacle_puddle') {
      // Water puddle - ellipse
      ctx.beginPath();
      ctx.ellipse(size / 2, size / 2, size * 0.4, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.ellipse(size * 0.4, size * 0.4, size * 0.1, size * 0.05, -0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (key === 'obstacle_oil') {
      // Oil slick - irregular shape
      ctx.beginPath();
      ctx.ellipse(size / 2, size / 2, size * 0.35, size * 0.3, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Rainbow sheen
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, 'rgba(255,0,255,0.2)');
      gradient.addColorStop(0.5, 'rgba(0,255,255,0.2)');
      gradient.addColorStop(1, 'rgba(255,255,0,0.2)');
      ctx.fillStyle = gradient;
      ctx.fill();
    } else if (key === 'obstacle_pothole') {
      // Pothole - dark circle with edge
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  /**
   * Get image by key
   */
  get(key) {
    return this.images[key] || null;
  }

  /**
   * Get random traffic car image
   */
  getRandomTrafficCar() {
    const key = this.trafficCarKeys[Math.floor(Math.random() * this.trafficCarKeys.length)];
    return {
      key,
      image: this.images[key]
    };
  }

  /**
   * Get item image
   */
  getItem(type) {
    const key = `item_${type}`;
    return this.images[key] || null;
  }

  /**
   * Get obstacle image
   */
  getObstacle(type) {
    const key = `obstacle_${type}`;
    return this.images[key] || null;
  }
}
