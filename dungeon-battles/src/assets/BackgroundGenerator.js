/**
 * BackgroundGenerator.js
 * Procedural background generation for dungeon theme
 *
 * Features:
 * - Dungeon stone wall patterns
 * - Debris and rubble
 * - Multi-layer parallax scrolling
 * - Dark atmospheric color palette
 */

export class BackgroundGenerator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.layers = [];

    // Dungeon color palette
    this.colors = {
      darkStone: '#2C3E50',
      mediumStone: '#34495E',
      lightStone: '#4A5568',
      accent: '#8B4513',
      shadow: '#1A1A2A',
      highlight: '#5D6D7E'
    };
  }

  /**
   * Generate all background layers
   */
  generateAll() {
    console.log('Generating dungeon backgrounds...');

    // Layer 1: Far background (darkest, slowest)
    this.layers.push({
      name: 'far',
      canvas: this.generateFarLayer(),
      scrollSpeed: 0.3
    });

    // Layer 2: Mid background (medium)
    this.layers.push({
      name: 'mid',
      canvas: this.generateMidLayer(),
      scrollSpeed: 0.6
    });

    // Layer 3: Near background (closest, fastest)
    this.layers.push({
      name: 'near',
      canvas: this.generateNearLayer(),
      scrollSpeed: 1.0
    });

    console.log('Background generation complete');

    return this.layers;
  }

  /**
   * Generate far background layer
   */
  generateFarLayer() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height * 2; // Double height for scrolling
    const ctx = canvas.getContext('2d');

    // Fill with dark gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, this.colors.shadow);
    gradient.addColorStop(0.5, this.colors.darkStone);
    gradient.addColorStop(1, this.colors.shadow);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle stone texture
    this.addStoneTexture(ctx, canvas.width, canvas.height, 0.1);

    // Add distant archways
    this.drawDistantArchways(ctx, canvas.width, canvas.height);

    return canvas;
  }

  /**
   * Generate mid background layer
   */
  generateMidLayer() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height * 2;
    const ctx = canvas.getContext('2d');

    // Semi-transparent layer
    ctx.fillStyle = this.colors.darkStone + '80';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add stone blocks
    this.drawStoneBlocks(ctx, canvas.width, canvas.height);

    // Add cracks
    this.drawCracks(ctx, canvas.width, canvas.height);

    return canvas;
  }

  /**
   * Generate near background layer
   */
  generateNearLayer() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height * 2;
    const ctx = canvas.getContext('2d');

    // Very subtle overlay
    ctx.fillStyle = this.colors.shadow + '40';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add debris
    this.drawDebris(ctx, canvas.width, canvas.height);

    // Add vignette effect
    this.addVignette(ctx, canvas.width, canvas.height);

    return canvas;
  }

  /**
   * Add stone texture
   */
  addStoneTexture(ctx, width, height, intensity = 0.2) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 255 * intensity;
      data[i] += noise;     // Red
      data[i + 1] += noise; // Green
      data[i + 2] += noise; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Draw distant archways
   */
  drawDistantArchways(ctx, width, height) {
    const archCount = 3;
    const archWidth = 80;
    const archHeight = 120;

    for (let i = 0; i < archCount; i++) {
      const x = (width / archCount) * i + archWidth / 2;
      const y = height * 0.3 + Math.random() * height * 0.4;

      ctx.save();

      // Draw arch
      ctx.fillStyle = this.colors.shadow;
      ctx.globalAlpha = 0.3;

      // Arch top (rounded)
      ctx.beginPath();
      ctx.arc(x, y, archWidth / 2, Math.PI, 0, false);
      ctx.fillRect(x - archWidth / 2, y, archWidth, archHeight);
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * Draw stone blocks
   */
  drawStoneBlocks(ctx, width, height) {
    const blockWidth = 60;
    const blockHeight = 40;
    const rows = Math.ceil(height / blockHeight);
    const cols = Math.ceil(width / blockWidth);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * blockWidth + (row % 2) * (blockWidth / 2);
        const y = row * blockHeight;

        // Random variation in stone color
        const variation = Math.random() * 20 - 10;
        const color = this.adjustBrightness(this.colors.mediumStone, variation);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, blockWidth - 2, blockHeight - 2);

        // Draw mortar lines
        ctx.strokeStyle = this.colors.shadow;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, blockWidth - 2, blockHeight - 2);
      }
    }
  }

  /**
   * Draw cracks
   */
  drawCracks(ctx, width, height) {
    const crackCount = 8;

    ctx.strokeStyle = this.colors.shadow;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;

    for (let i = 0; i < crackCount; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;

      ctx.beginPath();
      ctx.moveTo(startX, startY);

      let x = startX;
      let y = startY;

      const segments = 5 + Math.floor(Math.random() * 10);

      for (let j = 0; j < segments; j++) {
        x += (Math.random() - 0.5) * 40;
        y += Math.random() * 30;

        ctx.lineTo(x, y);
      }

      ctx.stroke();
    }

    ctx.globalAlpha = 1.0;
  }

  /**
   * Draw debris
   */
  drawDebris(ctx, width, height) {
    const debrisCount = 15;

    for (let i = 0; i < debrisCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 5 + Math.random() * 15;

      ctx.fillStyle = this.colors.accent;
      ctx.globalAlpha = 0.3;

      // Random debris shape
      ctx.beginPath();
      const sides = 3 + Math.floor(Math.random() * 3);

      for (let j = 0; j < sides; j++) {
        const angle = (Math.PI * 2 * j) / sides;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;

        if (j === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }

      ctx.closePath();
      ctx.fill();
    }

    ctx.globalAlpha = 1.0;
  }

  /**
   * Add vignette effect
   */
  addVignette(ctx, width, height) {
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) / 2
    );

    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Adjust color brightness
   */
  adjustBrightness(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0xff) + amount));

    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Get layer by name
   */
  getLayer(name) {
    return this.layers.find(layer => layer.name === name);
  }

  /**
   * Get all layers
   */
  getAllLayers() {
    return this.layers;
  }

  /**
   * Generate simple placeholder background
   */
  generateSimpleBackground() {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');

    // Simple gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, this.colors.shadow);
    gradient.addColorStop(1, this.colors.darkStone);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    return canvas;
  }

  /**
   * Clear all layers
   */
  clear() {
    this.layers = [];
  }
}
