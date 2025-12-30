/**
 * Item - Collectible items (HP/MP recovery, upgrades)
 * Includes lifetime countdown and visual effects
 */
import { Entity } from './Entity.js';

export class Item extends Entity {
  constructor() {
    super(0, 0, 32, 32, 'item');

    this.itemType = 'hp_recovery'; // hp_recovery, mp_recovery, attack_boost, magic_boost
    this.value = 30;
    this.lifetime = 0;
    this.maxLifetime = 10;
    this.color = '#ff0000';
    this.pulseTime = 0;

    this.zIndex = 3; // Render below player and enemies
  }

  /**
   * Initialize item with configuration
   */
  init(x, y, itemType, config) {
    this.x = x;
    this.y = y;
    this.alive = true;

    this.itemType = itemType;
    this.value = config.value;
    this.maxLifetime = config.lifetime || 10;
    this.color = config.color;

    this.width = config.size.width;
    this.height = config.size.height;

    this.lifetime = 0;
    this.pulseTime = 0;

    // Gentle floating motion
    this.velocity.y = -20;

    return this;
  }

  /**
   * Update item
   */
  update(deltaTime) {
    // Update lifetime
    this.lifetime += deltaTime;

    if (this.lifetime >= this.maxLifetime) {
      this.alive = false;
      return;
    }

    // Pulse effect
    this.pulseTime += deltaTime;

    // Floating motion
    this.velocity.y = Math.sin(this.pulseTime * 3) * 20;

    // Start blinking when almost expired
    if (this.lifetime > this.maxLifetime - 3) {
      // Blink faster as time runs out
    }
  }

  /**
   * Collect the item
   */
  collect(player) {
    switch(this.itemType) {
      case 'hp_recovery':
        player.heal(this.value);
        break;

      case 'mp_recovery':
        player.restoreMP(this.value);
        break;

      case 'attack_boost':
        player.upgradeAttack(this.value);
        break;

      case 'magic_boost':
        player.upgradeMagic(this.value);
        break;
    }

    this.alive = false;
  }

  /**
   * Render item
   */
  render(ctx) {
    // Blink when almost expired
    const timeLeft = this.maxLifetime - this.lifetime;
    if (timeLeft < 3 && Math.floor(this.lifetime * 5) % 2 === 0) {
      return; // Skip rendering for blink effect
    }

    ctx.save();

    // Pulse scale
    const pulse = 1 + Math.sin(this.pulseTime * 5) * 0.1;

    ctx.translate(this.x, this.y);
    ctx.scale(pulse, pulse);

    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;

    ctx.fillStyle = this.color;

    // Different shapes for different item types
    switch(this.itemType) {
      case 'hp_recovery':
        // Draw cross (health)
        this.drawCross(ctx);
        break;

      case 'mp_recovery':
        // Draw circle (mana)
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, this.width / 4, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'attack_boost':
        // Draw sword (attack)
        this.drawSword(ctx);
        break;

      case 'magic_boost':
        // Draw star (magic)
        this.drawStar(ctx);
        break;
    }

    ctx.restore();
  }

  /**
   * Draw cross shape
   */
  drawCross(ctx) {
    const size = this.width / 2;
    const thickness = size / 3;

    ctx.fillRect(-thickness, -size, thickness * 2, size * 2); // Vertical
    ctx.fillRect(-size, -thickness, size * 2, thickness * 2); // Horizontal
  }

  /**
   * Draw sword shape
   */
  drawSword(ctx) {
    const size = this.width / 2;

    ctx.beginPath();
    ctx.moveTo(0, -size); // Tip
    ctx.lineTo(size / 3, 0); // Right edge
    ctx.lineTo(size / 4, size / 2); // Right lower
    ctx.lineTo(0, size); // Bottom center
    ctx.lineTo(-size / 4, size / 2); // Left lower
    ctx.lineTo(-size / 3, 0); // Left edge
    ctx.closePath();
    ctx.fill();

    // Hilt
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-size / 2, size / 3, size, size / 6);
  }

  /**
   * Draw star shape
   */
  drawStar(ctx) {
    const points = 5;
    const outerRadius = this.width / 2;
    const innerRadius = this.width / 4;

    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Get time remaining
   */
  getTimeRemaining() {
    return Math.max(0, this.maxLifetime - this.lifetime);
  }

  /**
   * Check if about to expire
   */
  isExpiringSoon() {
    return this.getTimeRemaining() < 3;
  }

  /**
   * Reset item for object pool
   */
  reset() {
    super.reset();
    this.lifetime = 0;
    this.pulseTime = 0;
  }
}
