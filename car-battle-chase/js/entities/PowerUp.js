/**
 * PowerUp.js - Power-Up Item Class
 * Collectible items that grant bonuses
 */

import { Entity } from './Entity.js';

// Power-up types
export const PowerUpType = {
  HEALTH: 'health',
  SPEED: 'speed',
  SHIELD: 'shield',
  AMMO: 'ammo'
};

export class PowerUp extends Entity {
  constructor(x = 0, y = 0, type = PowerUpType.HEALTH) {
    super(x, y);

    this.type = 'powerup';
    this.powerUpType = type;
    this.width = 40;
    this.height = 40;
    this.collisionRadius = 18;

    // Animation
    this.bobTimer = Math.random() * Math.PI * 2;
    this.bobSpeed = 3;
    this.bobHeight = 5;
    this.rotationSpeed = 2;
    this.pulseTimer = 0;

    // Lifetime
    this.lifeTime = 10;
    this.timer = 0;
    this.blinkStart = 7;

    // Set color based on type
    this.setTypeColor();
  }

  /**
   * Set color based on power-up type
   */
  setTypeColor() {
    switch (this.powerUpType) {
      case PowerUpType.HEALTH:
        this.color = '#4CAF50';
        this.icon = '+';
        break;
      case PowerUpType.SPEED:
        this.color = '#FFD93D';
        this.icon = '>>>';
        break;
      case PowerUpType.SHIELD:
        this.color = '#4FC3F7';
        this.icon = 'O';
        break;
      case PowerUpType.AMMO:
        this.color = '#FF7043';
        this.icon = '*';
        break;
      default:
        this.color = '#FFFFFF';
        this.icon = '?';
    }
  }

  /**
   * Initialize power-up
   */
  init(x, y, type = PowerUpType.HEALTH) {
    this.position.set(x, y);
    this.powerUpType = type;
    this.timer = 0;
    this.active = true;
    this.bobTimer = Math.random() * Math.PI * 2;
    this.setTypeColor();
  }

  /**
   * Update power-up state
   */
  update(deltaTime) {
    this.timer += deltaTime;

    // Expire after lifetime
    if (this.timer >= this.lifeTime) {
      this.active = false;
      return;
    }

    // Animation
    this.bobTimer += deltaTime * this.bobSpeed;
    this.rotation += deltaTime * this.rotationSpeed;
    this.pulseTimer += deltaTime;

    // Blink when expiring
    if (this.timer >= this.blinkStart) {
      const blinkSpeed = 10 + (this.timer - this.blinkStart) * 5;
      this.alpha = 0.5 + Math.sin(this.timer * blinkSpeed) * 0.5;
    }
  }

  /**
   * Render power-up
   */
  render(ctx) {
    const bobOffset = Math.sin(this.bobTimer) * this.bobHeight;
    const pulseScale = 1 + Math.sin(this.pulseTimer * 4) * 0.1;

    ctx.save();
    ctx.translate(this.position.x, this.position.y + bobOffset);
    ctx.rotate(this.rotation);
    ctx.scale(pulseScale, pulseScale);
    ctx.globalAlpha = this.alpha;

    // Glow effect
    const glowSize = 25;
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
    ctx.fill();

    // Main body
    ctx.fillStyle = this.color;
    this.drawPowerUpShape(ctx);

    // Icon
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.icon, 0, 0);

    // Sparkles
    this.drawSparkles(ctx);

    ctx.restore();
  }

  /**
   * Draw power-up shape based on type
   */
  drawPowerUpShape(ctx) {
    const size = 16;

    switch (this.powerUpType) {
      case PowerUpType.HEALTH:
        // Cross shape
        ctx.beginPath();
        ctx.moveTo(-size / 3, -size);
        ctx.lineTo(size / 3, -size);
        ctx.lineTo(size / 3, -size / 3);
        ctx.lineTo(size, -size / 3);
        ctx.lineTo(size, size / 3);
        ctx.lineTo(size / 3, size / 3);
        ctx.lineTo(size / 3, size);
        ctx.lineTo(-size / 3, size);
        ctx.lineTo(-size / 3, size / 3);
        ctx.lineTo(-size, size / 3);
        ctx.lineTo(-size, -size / 3);
        ctx.lineTo(-size / 3, -size / 3);
        ctx.closePath();
        ctx.fill();
        break;

      case PowerUpType.SPEED:
        // Lightning bolt
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size / 2, -size / 4);
        ctx.lineTo(0, 0);
        ctx.lineTo(size / 2, size);
        ctx.lineTo(-size / 4, size / 4);
        ctx.lineTo(0, 0);
        ctx.lineTo(-size / 2, -size / 4);
        ctx.closePath();
        ctx.fill();
        break;

      case PowerUpType.SHIELD:
        // Shield shape
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.quadraticCurveTo(size, -size / 2, size, 0);
        ctx.quadraticCurveTo(size, size / 2, 0, size);
        ctx.quadraticCurveTo(-size, size / 2, -size, 0);
        ctx.quadraticCurveTo(-size, -size / 2, 0, -size);
        ctx.closePath();
        ctx.fill();
        break;

      case PowerUpType.AMMO:
        // Star shape
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        break;

      default:
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
    }
  }

  /**
   * Draw sparkle effects
   */
  drawSparkles(ctx) {
    ctx.fillStyle = '#FFFFFF';
    const sparkleCount = 4;
    const sparkleDistance = 20;

    for (let i = 0; i < sparkleCount; i++) {
      const angle = (i / sparkleCount) * Math.PI * 2 + this.pulseTimer * 2;
      const x = Math.cos(angle) * sparkleDistance;
      const y = Math.sin(angle) * sparkleDistance;
      const size = 2 + Math.sin(this.pulseTimer * 8 + i) * 1;

      ctx.globalAlpha = this.alpha * 0.7;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Get power-up effect description
   */
  getEffectDescription() {
    switch (this.powerUpType) {
      case PowerUpType.HEALTH:
        return 'Restores 30 HP';
      case PowerUpType.SPEED:
        return 'Speed boost for 5s';
      case PowerUpType.SHIELD:
        return 'Invincible for 5s';
      case PowerUpType.AMMO:
        return '+3 Bombs, +2 Missiles';
      default:
        return 'Unknown effect';
    }
  }

  /**
   * Reset power-up
   */
  reset() {
    super.reset();
    this.timer = 0;
    this.bobTimer = Math.random() * Math.PI * 2;
    this.pulseTimer = 0;
  }
}

/**
 * Get random power-up type
 */
export function getRandomPowerUpType() {
  const types = Object.values(PowerUpType);
  return types[Math.floor(Math.random() * types.length)];
}

export default PowerUp;
