/**
 * AssetLoader.js
 * Handles asynchronous loading of game assets (images and audio)
 */

export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.audio = new Map();
    this.loadedCount = 0;
    this.totalCount = 0;
    this.onProgressCallbacks = [];
  }

  /**
   * Register progress callback
   * @param {Function} callback - Callback function (progress: 0-1)
   */
  onProgress(callback) {
    this.onProgressCallbacks.push(callback);
  }

  /**
   * Update loading progress
   */
  updateProgress() {
    const progress = this.totalCount > 0 ? this.loadedCount / this.totalCount : 0;
    this.onProgressCallbacks.forEach(callback => callback(progress));
  }

  /**
   * Load a single image
   * @param {string} key - Unique identifier for the image
   * @param {string} src - Image source path
   * @returns {Promise<HTMLImageElement>} Loaded image
   */
  loadImage(key, src) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.images.set(key, img);
        this.loadedCount++;
        this.updateProgress();
        resolve(img);
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  /**
   * Load multiple images
   * @param {Array<{key: string, src: string}>} imageList - Array of images to load
   * @returns {Promise<void>}
   */
  async loadImages(imageList) {
    this.totalCount += imageList.length;
    const promises = imageList.map(({ key, src }) => this.loadImage(key, src));
    await Promise.all(promises);
  }

  /**
   * Load a single audio file
   * @param {string} key - Unique identifier for the audio
   * @param {string} src - Audio source path
   * @returns {Promise<HTMLAudioElement>} Loaded audio
   */
  loadAudio(key, src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.addEventListener('canplaythrough', () => {
        this.audio.set(key, audio);
        this.loadedCount++;
        this.updateProgress();
        resolve(audio);
      }, { once: true });

      audio.addEventListener('error', () => {
        console.error(`Failed to load audio: ${src}`);
        reject(new Error(`Failed to load audio: ${src}`));
      }, { once: true });

      audio.src = src;
      audio.load();
    });
  }

  /**
   * Load multiple audio files
   * @param {Array<{key: string, src: string}>} audioList - Array of audio files to load
   * @returns {Promise<void>}
   */
  async loadAudioFiles(audioList) {
    this.totalCount += audioList.length;
    const promises = audioList.map(({ key, src }) => this.loadAudio(key, src));
    await Promise.all(promises);
  }

  /**
   * Load all assets from manifest
   * @param {Object} manifest - Asset manifest object
   * @returns {Promise<void>}
   */
  async loadAll(manifest) {
    const { images = [], audio = [] } = manifest;

    this.totalCount = images.length + audio.length;
    this.loadedCount = 0;

    await Promise.all([
      this.loadImages(images),
      this.loadAudioFiles(audio)
    ]);
  }

  /**
   * Get loaded image
   * @param {string} key - Image key
   * @returns {HTMLImageElement|null} Image element or null
   */
  getImage(key) {
    return this.images.get(key) || null;
  }

  /**
   * Get loaded audio
   * @param {string} key - Audio key
   * @returns {HTMLAudioElement|null} Audio element or null
   */
  getAudio(key) {
    return this.audio.get(key) || null;
  }

  /**
   * Check if all assets are loaded
   * @returns {boolean} True if all loaded
   */
  isComplete() {
    return this.loadedCount === this.totalCount && this.totalCount > 0;
  }

  /**
   * Get loading progress
   * @returns {number} Progress (0-1)
   */
  getProgress() {
    return this.totalCount > 0 ? this.loadedCount / this.totalCount : 0;
  }

  /**
   * Clear all loaded assets
   */
  clear() {
    this.images.clear();
    this.audio.clear();
    this.loadedCount = 0;
    this.totalCount = 0;
    this.onProgressCallbacks = [];
  }

  /**
   * Create a canvas-based placeholder image
   * @param {number} width - Image width
   * @param {number} height - Image height
   * @param {string} color - Fill color
   * @param {string} shape - Shape type ('rect', 'circle', 'triangle', 'star')
   * @returns {HTMLImageElement} Generated image
   */
  createPlaceholderImage(width, height, color, shape = 'rect') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;

    switch (shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
        break;

      case 'star':
        this.drawStar(ctx, width / 2, height / 2, 5, Math.min(width, height) / 2, Math.min(width, height) / 4);
        ctx.fill();
        break;

      case 'rect':
      default:
        ctx.fillRect(0, 0, width, height);
        break;
    }

    const img = new Image();
    img.src = canvas.toDataURL();
    return img;
  }

  /**
   * Draw a star shape on canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   * @param {number} cx - Center X
   * @param {number} cy - Center Y
   * @param {number} spikes - Number of spikes
   * @param {number} outerRadius - Outer radius
   * @param {number} innerRadius - Inner radius
   */
  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }
}

// Export singleton instance
export const assetLoader = new AssetLoader();
