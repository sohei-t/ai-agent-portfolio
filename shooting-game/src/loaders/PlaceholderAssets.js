/**
 * PlaceholderAssets.js
 * Generates placeholder images using Canvas API
 */

export class PlaceholderAssets {
  /**
   * Create player sprite (triangle ship)
   * @param {number} width - Sprite width
   * @param {number} height - Sprite height
   * @returns {string} Data URL
   */
  static createPlayer(width = 32, height = 48) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, '#0088ff');

    // Draw triangle ship
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(width / 2, height * 0.85);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Add outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add cockpit
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.3, 4, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL();
  }

  /**
   * Create enemy sprite (rectangular ship)
   * @param {number} width - Sprite width
   * @param {number} height - Sprite height
   * @param {string} color - Primary color
   * @returns {string} Data URL
   */
  static createEnemy(width = 32, height = 32, color = '#ff0000') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#880000');

    // Draw enemy body
    ctx.fillStyle = gradient;
    ctx.fillRect(width * 0.1, height * 0.2, width * 0.8, height * 0.6);

    // Draw wings
    ctx.beginPath();
    ctx.moveTo(0, height * 0.3);
    ctx.lineTo(width * 0.2, height * 0.5);
    ctx.lineTo(0, height * 0.7);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(width, height * 0.3);
    ctx.lineTo(width * 0.8, height * 0.5);
    ctx.lineTo(width, height * 0.7);
    ctx.closePath();
    ctx.fill();

    // Add outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(width * 0.1, height * 0.2, width * 0.8, height * 0.6);

    return canvas.toDataURL();
  }

  /**
   * Create bullet sprite (circular projectile)
   * @param {number} size - Bullet size
   * @param {string} color - Bullet color
   * @returns {string} Data URL
   */
  static createBullet(size = 8, color = '#ffff00') {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Gradient fill
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(1, color + '80'); // Semi-transparent

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL();
  }

  /**
   * Create boss sprite (large enemy)
   * @param {number} width - Sprite width
   * @param {number} height - Sprite height
   * @returns {string} Data URL
   */
  static createBoss(width = 96, height = 96) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#ff00ff');
    gradient.addColorStop(1, '#880088');

    // Draw main body
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width * 0.9, height * 0.4);
    ctx.lineTo(width * 0.7, height);
    ctx.lineTo(width * 0.3, height);
    ctx.lineTo(width * 0.1, height * 0.4);
    ctx.closePath();
    ctx.fill();

    // Draw core
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width * 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Add outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width * 0.15, 0, Math.PI * 2);
    ctx.stroke();

    return canvas.toDataURL();
  }

  /**
   * Create power-up sprite (star)
   * @param {number} size - Sprite size
   * @returns {string} Data URL
   */
  static createPowerUp(size = 24) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw star
    const spikes = 5;
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    const cx = size / 2;
    const cy = size / 2;

    ctx.fillStyle = '#ffff00';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / spikes) * i - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    return canvas.toDataURL();
  }

  /**
   * Create scrolling background
   * @param {number} width - Background width
   * @param {number} height - Background height
   * @returns {string} Data URL
   */
  static createBackground(width = 800, height = 600) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#000033');
    gradient.addColorStop(0.5, '#000066');
    gradient.addColorStop(1, '#000099');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1;
      const alpha = Math.random() * 0.5 + 0.5;

      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Add nebula effect
    ctx.fillStyle = '#4400ff';
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 100 + 50;

      const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      nebulaGradient.addColorStop(0, '#ffffff');
      nebulaGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = nebulaGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    return canvas.toDataURL();
  }

  /**
   * Create explosion animation frames
   * @param {number} size - Frame size
   * @param {number} frames - Number of frames
   * @returns {Array<string>} Array of data URLs
   */
  static createExplosion(size = 64, frames = 8) {
    const explosionFrames = [];

    for (let f = 0; f < frames; f++) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      const progress = f / frames;
      const radius = (size / 2) * progress;
      const particles = 12;

      // Draw explosion particles
      for (let i = 0; i < particles; i++) {
        const angle = (Math.PI * 2 * i) / particles;
        const distance = radius * (0.5 + Math.random() * 0.5);
        const x = size / 2 + Math.cos(angle) * distance;
        const y = size / 2 + Math.sin(angle) * distance;
        const particleSize = (size / 8) * (1 - progress);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, particleSize);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#ff8800');
        gradient.addColorStop(1, '#ff0000');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      explosionFrames.push(canvas.toDataURL());
    }

    return explosionFrames;
  }

  /**
   * Generate all placeholder assets
   * @returns {Object} Asset manifest
   */
  static generateAll() {
    return {
      player: this.createPlayer(),
      enemy1: this.createEnemy(32, 32, '#ff0000'),
      enemy2: this.createEnemy(40, 40, '#ff8800'),
      enemy3: this.createEnemy(48, 48, '#ff00ff'),
      boss: this.createBoss(),
      bulletPlayer: this.createBullet(8, '#00ffff'),
      bulletEnemy: this.createBullet(8, '#ff0000'),
      powerup: this.createPowerUp(),
      background: this.createBackground(),
      explosion: this.createExplosion()
    };
  }
}
