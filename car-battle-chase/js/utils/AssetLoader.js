/**
 * AssetLoader.js - Game Asset Loading System
 * Handles loading of images and audio with progress tracking
 */

export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.audio = new Map();
    this.loadedCount = 0;
    this.totalCount = 0;
    this.onProgress = null;
    this.onComplete = null;
  }

  /**
   * Load multiple images
   * @param {Object} imageList - { key: path } pairs
   */
  async loadImages(imageList) {
    const entries = Object.entries(imageList);
    this.totalCount += entries.length;

    const promises = entries.map(([key, path]) => {
      return this.loadImage(key, path);
    });

    return Promise.all(promises);
  }

  /**
   * Load a single image
   * @param {string} key - Identifier for the image
   * @param {string} path - Path to the image file
   */
  loadImage(key, path) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.images.set(key, img);
        this.loadedCount++;
        this.reportProgress();
        resolve(img);
      };

      img.onerror = (error) => {
        console.warn(`Failed to load image: ${path}, using fallback`);
        // Create a placeholder image
        const placeholder = this.createPlaceholderImage(key);
        this.images.set(key, placeholder);
        this.loadedCount++;
        this.reportProgress();
        resolve(placeholder);
      };

      img.src = path;
    });
  }

  /**
   * Create a placeholder image for failed loads
   */
  createPlaceholderImage(key) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Draw a colored rectangle based on key
    const colors = ['#4FC3F7', '#EF5350', '#66BB6A', '#AB47BC', '#FFA726'];
    const colorIndex = Math.abs(this.hashCode(key)) % colors.length;
    ctx.fillStyle = colors[colorIndex];
    ctx.fillRect(0, 0, 64, 64);

    // Draw X pattern to indicate missing asset
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(64, 64);
    ctx.moveTo(64, 0);
    ctx.lineTo(0, 64);
    ctx.stroke();

    return canvas;
  }

  /**
   * Load multiple audio files
   * @param {Object} audioList - { key: path } pairs
   */
  async loadAudio(audioList) {
    const entries = Object.entries(audioList);
    this.totalCount += entries.length;

    const promises = entries.map(([key, path]) => {
      return this.loadAudioFile(key, path);
    });

    return Promise.all(promises);
  }

  /**
   * Load a single audio file
   */
  loadAudioFile(key, path) {
    return new Promise((resolve) => {
      const audio = new Audio();

      audio.oncanplaythrough = () => {
        this.audio.set(key, audio);
        this.loadedCount++;
        this.reportProgress();
        resolve(audio);
      };

      audio.onerror = () => {
        console.warn(`Failed to load audio: ${path}`);
        // Create null audio placeholder
        this.audio.set(key, null);
        this.loadedCount++;
        this.reportProgress();
        resolve(null);
      };

      // Set to not preload full file for faster loading
      audio.preload = 'auto';
      audio.src = path;
    });
  }

  /**
   * Report loading progress
   */
  reportProgress() {
    const progress = this.totalCount > 0 ? this.loadedCount / this.totalCount : 1;

    if (this.onProgress) {
      this.onProgress(progress);
    }

    if (progress >= 1 && this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * Get an image by key
   */
  getImage(key) {
    return this.images.get(key);
  }

  /**
   * Get an audio by key
   */
  getAudio(key) {
    return this.audio.get(key);
  }

  /**
   * Check if all assets are loaded
   */
  isComplete() {
    return this.loadedCount >= this.totalCount;
  }

  /**
   * Get loading progress (0-1)
   */
  getProgress() {
    return this.totalCount > 0 ? this.loadedCount / this.totalCount : 1;
  }

  /**
   * Simple hash function for string
   */
  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  /**
   * Create SVG-based sprite from fallback data
   */
  createSVGSprite(svgString, width = 64, height = 64) {
    return new Promise((resolve) => {
      const img = new Image();
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        URL.revokeObjectURL(url);

        // Create canvas from SVG
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(this.createPlaceholderImage('svg'));
      };

      img.src = url;
    });
  }
}

export default AssetLoader;
