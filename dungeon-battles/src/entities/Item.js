/**
 * Item.js - Collectible power-up items
 */

export class Item {
  constructor(x, y, type) {
    // Position
    this.x = x;
    this.y = y;

    // Size
    this.width = 24;
    this.height = 24;

    // Type and properties
    this.type = type;
    this.alive = true;
    this.entityType = 'item';

    // Timer for auto-disappear
    this.lifeTimer = 10.0; // 10 seconds

    // Visual effects
    this.floatOffset = 0;
    this.floatSpeed = 2;
    this.glowIntensity = 0;
    this.glowDirection = 1;

    // Initialize type-specific properties
    this.initItemProperties();
  }

  initItemProperties() {
    switch (this.type) {
      case 'hp_recovery':
        this.color = '#FF69B4';
        this.symbol = '♥';
        this.value = 30;
        this.description = 'HP Recovery';
        break;

      case 'mp_recovery':
        this.color = '#4169E1';
        this.symbol = '♦';
        this.value = 20;
        this.description = 'MP Recovery';
        break;

      case 'speed_up':
        this.color = '#FFD700';
        this.symbol = '↑';
        this.value = 1.2; // 20% speed increase
        this.duration = 5.0; // 5 seconds
        this.description = 'Speed Boost';
        break;

      case 'weapon_upgrade':
        this.color = '#FF4500';
        this.symbol = '★';
        this.value = 1; // Weapon level increase
        this.description = 'Weapon Upgrade';
        this.lifeTimer = 30.0; // Weapon upgrades last longer
        break;

      case 'shield':
        this.color = '#00FFFF';
        this.symbol = '🛡';
        this.value = 30; // Shield HP (normal bullet = 10 damage, so 3 hits)
        this.description = 'Shield';
        this.lifeTimer = 20.0; // Shield items last 20 seconds
        break;

      default:
        this.color = '#FFFFFF';
        this.symbol = '?';
        this.value = 0;
        this.description = 'Unknown Item';
    }
  }

  update(deltaTime) {
    if (!this.alive) return;

    // Update life timer
    this.lifeTimer -= deltaTime;
    if (this.lifeTimer <= 0) {
      this.alive = false;
      return;
    }

    // Floating animation
    this.floatOffset = Math.sin(Date.now() * 0.001 * this.floatSpeed) * 5;

    // Glowing effect
    this.glowIntensity += this.glowDirection * deltaTime * 2;
    if (this.glowIntensity >= 1) {
      this.glowIntensity = 1;
      this.glowDirection = -1;
    } else if (this.glowIntensity <= 0.3) {
      this.glowIntensity = 0.3;
      this.glowDirection = 1;
    }
  }

  render(ctx) {
    if (!this.alive) return;

    ctx.save();

    const drawY = this.y + this.floatOffset;

    // Flash faster when about to disappear
    if (this.lifeTimer < 3 && Math.floor(this.lifeTimer * 4) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10 * this.glowIntensity;

    // Draw item background
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(
      this.x - this.width / 2,
      drawY - this.height / 2,
      this.width,
      this.height
    );

    // Draw border
    ctx.globalAlpha = 1;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      this.x - this.width / 2,
      drawY - this.height / 2,
      this.width,
      this.height
    );

    // Draw symbol
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.symbol, this.x, drawY);

    // Draw timer if less than 3 seconds
    if (this.lifeTimer < 3) {
      ctx.fillStyle = '#FFFF00';
      ctx.font = '10px Arial';
      ctx.fillText(Math.ceil(this.lifeTimer), this.x, drawY - this.height - 5);
    }

    ctx.restore();
  }

  collect(player) {
    if (!this.alive) return false;

    switch (this.type) {
      case 'hp_recovery':
        player.heal(this.value);
        console.log(`[Item] HP recovered: +${this.value}`);
        break;

      case 'mp_recovery':
        player.restoreMP(this.value);
        console.log(`[Item] MP recovered: +${this.value}`);
        break;

      case 'speed_up':
        player.applySpeedBoost(this.value, this.duration);
        console.log(`[Item] Speed boost: x${this.value} for ${this.duration}s`);
        break;

      case 'weapon_upgrade':
        player.upgradeWeapon();
        console.log(`[Item] Weapon upgraded to level ${player.weaponLevel}`);
        break;

      case 'shield':
        player.addShield(this.value);
        console.log(`[Item] Shield added: +${this.value} HP`);
        break;
    }

    this.alive = false;
    return true;
  }
}