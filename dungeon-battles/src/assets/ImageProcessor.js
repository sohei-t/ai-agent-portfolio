/**
 * ImageProcessor.js
 * Automatic image resizing and optimization for game assets
 *
 * Features:
 * - Automatic size detection and resizing
 * - High-quality resampling with anti-aliasing
 * - Aspect ratio preservation
 * - Canvas-based processing (no external dependencies)
 */

export class ImageProcessor {
  constructor() {
    this.sizeConfig = null;
    this.processedCache = new Map();
  }

  /**
   * Initialize with size configuration
   */
  async initialize() {
    try {
      const response = await fetch('/config/asset_sizes.json');
      this.sizeConfig = await response.json();
      console.log('ImageProcessor initialized with size configuration');
    } catch (error) {
      console.error('Failed to load size configuration:', error);
      // Use default sizes if config fails
      this.sizeConfig = this.getDefaultSizes();
    }
  }

  /**
   * Get default size configuration
   */
  getDefaultSizes() {
    return {
      sizeCategories: {
        player: { recommended: { width: 64, height: 64 } },
        enemy_small: { recommended: { width: 32, height: 32 } },
        enemy_medium: { recommended: { width: 48, height: 48 } },
        enemy_large: { recommended: { width: 64, height: 64 } },
        boss: { recommended: { width: 128, height: 128 } },
        bullet_player: { recommended: { width: 8, height: 16 } },
        bullet_player_magic: { recommended: { width: 16, height: 16 } },
        bullet_enemy: { recommended: { width: 12, height: 12 } },
        powerup: { recommended: { width: 32, height: 32 } },
        explosion: { recommended: { width: 64, height: 64 } },
        hit: { recommended: { width: 48, height: 48 } },
        magic: { recommended: { width: 96, height: 96 } }
      }
    };
  }

  /**
   * Get optimal size for asset type
   */
  getOptimalSize(type) {
    if (!this.sizeConfig || !this.sizeConfig.sizeCategories) {
      const defaults = this.getDefaultSizes();
      return defaults.sizeCategories[type]?.recommended || { width: 64, height: 64 };
    }

    const category = this.sizeConfig.sizeCategories[type];
    return category?.recommended || { width: 64, height: 64 };
  }

  /**
   * Process image: resize to optimal size if needed
   * @param {HTMLImageElement} image - Source image
   * @param {string} targetType - Asset type (player, enemy_small, etc.)
   * @returns {Promise<HTMLCanvasElement>} Processed image canvas
   */
  async processImage(image, targetType) {
    // Check cache first
    const cacheKey = `${image.src}_${targetType}`;
    if (this.processedCache.has(cacheKey)) {
      return this.processedCache.get(cacheKey);
    }

    const optimalSize = this.getOptimalSize(targetType);
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;

    // Check if resize is needed
    const needsResize = this.shouldResize(
      sourceWidth,
      sourceHeight,
      optimalSize.width,
      optimalSize.height
    );

    let resultCanvas;

    if (needsResize) {
      console.log(`Resizing ${targetType} from ${sourceWidth}x${sourceHeight} to ${optimalSize.width}x${optimalSize.height}`);
      resultCanvas = this.resizeImage(image, optimalSize.width, optimalSize.height);
    } else {
      console.log(`Using original size for ${targetType}: ${sourceWidth}x${sourceHeight}`);
      resultCanvas = this.imageToCanvas(image);
    }

    // Cache the result
    this.processedCache.set(cacheKey, resultCanvas);

    return resultCanvas;
  }

  /**
   * Check if image should be resized
   */
  shouldResize(sourceW, sourceH, targetW, targetH) {
    const widthRatio = sourceW / targetW;
    const heightRatio = sourceH / targetH;

    // Resize if difference is more than 20%
    const threshold = 0.2;
    return Math.abs(widthRatio - 1) > threshold || Math.abs(heightRatio - 1) > threshold;
  }

  /**
   * High-quality image resize using multiple passes
   */
  resizeImage(image, targetWidth, targetHeight) {
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;

    // For large downscaling, use multi-pass approach
    if (sourceWidth > targetWidth * 2 || sourceHeight > targetHeight * 2) {
      return this.multiPassResize(image, targetWidth, targetHeight);
    }

    // Single-pass resize for smaller changes
    return this.singlePassResize(image, targetWidth, targetHeight);
  }

  /**
   * Single-pass high-quality resize
   */
  singlePassResize(image, targetWidth, targetHeight) {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    return canvas;
  }

  /**
   * Multi-pass resize for better quality on large downscaling
   */
  multiPassResize(image, targetWidth, targetHeight) {
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;

    let currentCanvas = this.imageToCanvas(image);

    // Calculate intermediate sizes (halve each dimension per pass)
    const passes = [];
    let w = sourceWidth;
    let h = sourceHeight;

    while (w > targetWidth * 2 || h > targetHeight * 2) {
      w = Math.max(Math.floor(w / 2), targetWidth);
      h = Math.max(Math.floor(h / 2), targetHeight);
      passes.push({ width: w, height: h });
    }

    // Final pass to exact target size
    passes.push({ width: targetWidth, height: targetHeight });

    // Apply each pass
    for (const pass of passes) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = pass.width;
      tempCanvas.height = pass.height;
      const ctx = tempCanvas.getContext('2d', { alpha: true });

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(currentCanvas, 0, 0, pass.width, pass.height);
      currentCanvas = tempCanvas;
    }

    return currentCanvas;
  }

  /**
   * Convert image to canvas
   */
  imageToCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.drawImage(image, 0, 0);
    return canvas;
  }

  /**
   * Create placeholder image when asset is missing
   */
  createPlaceholder(type, config) {
    const size = this.getOptimalSize(type);
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d', { alpha: true });

    // Clear canvas with transparency
    ctx.clearRect(0, 0, size.width, size.height);

    const shape = config?.placeholder?.shape || 'circle';
    const color = config?.placeholder?.color || '#888888';
    const outline = config?.placeholder?.outline || '#FFFFFF';
    const outlineWidth = config?.placeholder?.outlineWidth || 2;
    const label = config?.placeholder?.label || '';

    const centerX = size.width / 2;
    const centerY = size.height / 2;
    const radius = Math.min(size.width, size.height) / 2 - outlineWidth;

    ctx.save();

    // Draw shape
    switch (shape) {
      case 'triangle':
        this.drawTriangle(ctx, centerX, centerY, radius, color, outline, outlineWidth);
        break;
      case 'square':
        this.drawSquare(ctx, centerX, centerY, radius, color, outline, outlineWidth);
        break;
      case 'hexagon':
        this.drawHexagon(ctx, centerX, centerY, radius, color, outline, outlineWidth);
        break;
      case 'diamond':
        this.drawDiamond(ctx, centerX, centerY, radius, color, outline, outlineWidth);
        break;
      case 'rectangle':
        this.drawRectangle(ctx, centerX, centerY, size.width - outlineWidth * 2, size.height - outlineWidth * 2, color, outline, outlineWidth);
        break;
      case 'circle':
      default:
        this.drawCircle(ctx, centerX, centerY, radius, color, outline, outlineWidth);
        break;
    }

    // Draw label if present
    if (label) {
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.font = `bold ${Math.floor(size.height / 4)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeText(label, centerX, centerY);
      ctx.fillText(label, centerX, centerY);
    }

    ctx.restore();

    console.warn(`Created placeholder for ${type}: ${size.width}x${size.height}`);

    return canvas;
  }

  // Shape drawing methods
  drawCircle(ctx, x, y, radius, fillColor, strokeColor, strokeWidth) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  drawTriangle(ctx, x, y, radius, fillColor, strokeColor, strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x + radius * 0.866, y + radius * 0.5);
    ctx.lineTo(x - radius * 0.866, y + radius * 0.5);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  drawSquare(ctx, x, y, radius, fillColor, strokeColor, strokeWidth) {
    const size = radius * 1.4;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  }

  drawHexagon(ctx, x, y, radius, fillColor, strokeColor, strokeWidth) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  drawDiamond(ctx, x, y, radius, fillColor, strokeColor, strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x + radius, y);
    ctx.lineTo(x, y + radius);
    ctx.lineTo(x - radius, y);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  drawRectangle(ctx, x, y, width, height, fillColor, strokeColor, strokeWidth) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(x - width / 2, y - height / 2, width, height);
  }

  /**
   * Clear cache to free memory
   */
  clearCache() {
    this.processedCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.processedCache.size,
      keys: Array.from(this.processedCache.keys())
    };
  }
}
