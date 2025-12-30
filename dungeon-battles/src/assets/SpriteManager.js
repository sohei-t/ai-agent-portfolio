/**
 * SpriteManager.js
 * Sprite management and rendering system
 *
 * Features:
 * - Sprite creation from processed images
 * - Frame animation support
 * - Sprite transformation (rotation, scaling, flipping)
 * - Efficient rendering
 */

export class SpriteManager {
  constructor(assetLoader) {
    this.assetLoader = assetLoader;
    this.sprites = new Map();
    this.spriteSheets = new Map();
  }

  /**
   * Create sprite from loaded asset
   */
  createSprite(assetKey, options = {}) {
    const asset = this.assetLoader.getAsset(assetKey);

    if (!asset) {
      console.error(`Asset not found: ${assetKey}`);
      return null;
    }

    const sprite = {
      key: assetKey,
      canvas: asset.canvas,
      width: asset.width,
      height: asset.height,
      placeholder: asset.placeholder,

      // Transform properties
      scale: options.scale || 1.0,
      rotation: options.rotation || 0,
      flipX: options.flipX || false,
      flipY: options.flipY || false,
      alpha: options.alpha !== undefined ? options.alpha : 1.0,

      // Animation properties
      animated: options.animated || false,
      frameCount: options.frameCount || 1,
      currentFrame: 0,
      frameTime: options.frameTime || 100,
      lastFrameUpdate: 0
    };

    this.sprites.set(assetKey, sprite);

    return sprite;
  }

  /**
   * Get sprite by key
   */
  getSprite(key) {
    return this.sprites.get(key);
  }

  /**
   * Draw sprite to context
   */
  drawSprite(ctx, sprite, x, y, options = {}) {
    if (!sprite || !sprite.canvas) {
      console.warn('Invalid sprite');
      return;
    }

    ctx.save();

    // Apply alpha
    const alpha = options.alpha !== undefined ? options.alpha : sprite.alpha;
    ctx.globalAlpha = alpha;

    // Calculate dimensions
    const width = (options.width || sprite.width) * sprite.scale;
    const height = (options.height || sprite.height) * sprite.scale;

    // Apply transformations
    ctx.translate(x, y);

    if (sprite.rotation !== 0) {
      ctx.rotate(sprite.rotation);
    }

    if (sprite.flipX || sprite.flipY) {
      ctx.scale(sprite.flipX ? -1 : 1, sprite.flipY ? -1 : 1);
    }

    // Draw sprite centered
    ctx.drawImage(
      sprite.canvas,
      -width / 2,
      -height / 2,
      width,
      height
    );

    ctx.restore();
  }

  /**
   * Draw sprite with custom transform
   */
  drawSpriteTransformed(ctx, sprite, transform) {
    if (!sprite || !sprite.canvas) {
      return;
    }

    ctx.save();

    // Apply transform matrix
    if (transform.matrix) {
      ctx.setTransform(...transform.matrix);
    } else {
      ctx.translate(transform.x || 0, transform.y || 0);
      ctx.rotate(transform.rotation || 0);
      ctx.scale(transform.scaleX || 1, transform.scaleY || 1);
    }

    // Apply alpha
    ctx.globalAlpha = transform.alpha !== undefined ? transform.alpha : 1.0;

    // Draw sprite
    const width = transform.width || sprite.width;
    const height = transform.height || sprite.height;

    ctx.drawImage(
      sprite.canvas,
      -width / 2,
      -height / 2,
      width,
      height
    );

    ctx.restore();
  }

  /**
   * Update animated sprite
   */
  updateAnimation(sprite, deltaTime) {
    if (!sprite.animated || sprite.frameCount <= 1) {
      return;
    }

    sprite.lastFrameUpdate += deltaTime;

    if (sprite.lastFrameUpdate >= sprite.frameTime) {
      sprite.currentFrame = (sprite.currentFrame + 1) % sprite.frameCount;
      sprite.lastFrameUpdate = 0;
    }
  }

  /**
   * Create sprite sheet from image
   */
  createSpriteSheet(assetKey, frameWidth, frameHeight, options = {}) {
    const asset = this.assetLoader.getAsset(assetKey);

    if (!asset) {
      console.error(`Asset not found: ${assetKey}`);
      return null;
    }

    const columns = Math.floor(asset.width / frameWidth);
    const rows = Math.floor(asset.height / frameHeight);
    const totalFrames = columns * rows;

    const spriteSheet = {
      key: assetKey,
      canvas: asset.canvas,
      frameWidth,
      frameHeight,
      columns,
      rows,
      totalFrames,
      frames: []
    };

    // Extract individual frames
    for (let i = 0; i < totalFrames; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);

      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = frameWidth;
      frameCanvas.height = frameHeight;
      const frameCtx = frameCanvas.getContext('2d');

      frameCtx.drawImage(
        asset.canvas,
        col * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        0,
        0,
        frameWidth,
        frameHeight
      );

      spriteSheet.frames.push(frameCanvas);
    }

    this.spriteSheets.set(assetKey, spriteSheet);

    return spriteSheet;
  }

  /**
   * Get frame from sprite sheet
   */
  getSpriteSheetFrame(key, frameIndex) {
    const spriteSheet = this.spriteSheets.get(key);

    if (!spriteSheet) {
      console.error(`Sprite sheet not found: ${key}`);
      return null;
    }

    if (frameIndex < 0 || frameIndex >= spriteSheet.totalFrames) {
      console.error(`Frame index out of range: ${frameIndex}`);
      return null;
    }

    return spriteSheet.frames[frameIndex];
  }

  /**
   * Draw sprite sheet frame
   */
  drawSpriteSheetFrame(ctx, key, frameIndex, x, y, options = {}) {
    const frame = this.getSpriteSheetFrame(key, frameIndex);

    if (!frame) {
      return;
    }

    ctx.save();

    // Apply alpha
    ctx.globalAlpha = options.alpha !== undefined ? options.alpha : 1.0;

    // Calculate dimensions
    const width = options.width || frame.width;
    const height = options.height || frame.height;

    // Apply transformations
    ctx.translate(x, y);

    if (options.rotation) {
      ctx.rotate(options.rotation);
    }

    if (options.flipX || options.flipY) {
      ctx.scale(options.flipX ? -1 : 1, options.flipY ? -1 : 1);
    }

    // Draw frame centered
    ctx.drawImage(
      frame,
      -width / 2,
      -height / 2,
      width,
      height
    );

    ctx.restore();
  }

  /**
   * Clone sprite
   */
  cloneSprite(sprite) {
    return {
      ...sprite,
      currentFrame: 0,
      lastFrameUpdate: 0
    };
  }

  /**
   * Set sprite scale
   */
  setSpriteScale(sprite, scale) {
    if (sprite) {
      sprite.scale = scale;
    }
  }

  /**
   * Set sprite rotation
   */
  setSpriteRotation(sprite, rotation) {
    if (sprite) {
      sprite.rotation = rotation;
    }
  }

  /**
   * Set sprite alpha
   */
  setSpriteAlpha(sprite, alpha) {
    if (sprite) {
      sprite.alpha = Math.max(0, Math.min(1, alpha));
    }
  }

  /**
   * Flip sprite horizontally
   */
  flipSpriteX(sprite, flip = true) {
    if (sprite) {
      sprite.flipX = flip;
    }
  }

  /**
   * Flip sprite vertically
   */
  flipSpriteY(sprite, flip = true) {
    if (sprite) {
      sprite.flipY = flip;
    }
  }

  /**
   * Get sprite dimensions
   */
  getSpriteDimensions(sprite) {
    if (!sprite) {
      return { width: 0, height: 0 };
    }

    return {
      width: sprite.width * sprite.scale,
      height: sprite.height * sprite.scale
    };
  }

  /**
   * Clear all sprites
   */
  clear() {
    this.sprites.clear();
    this.spriteSheets.clear();
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      sprites: this.sprites.size,
      spriteSheets: this.spriteSheets.size
    };
  }
}
