/**
 * PowerUp - Collectible power-ups
 */
import { Entity } from './Entity.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class PowerUp extends Entity {
  constructor(x, y, powerType = 'POWER') {
    const config = GAME_CONFIG.POWERUP[powerType];
    super(x, y, config.width, config.height);

    this.type = 'powerup';
    this.powerType = powerType;
    this.color = config.color;
    this.velocity.set(0, 100); // Slow downward movement
    this.rotationAngle = 0;
  }

  /**
   * Update power-up
   */
  update(deltaTime) {
    super.update(deltaTime);
    this.rotationAngle += deltaTime * 3; // Rotate for visual effect
  }

  /**
   * Render power-up
   */
  render(ctx) {
    ctx.save();

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Rotate
    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotationAngle);
    ctx.translate(-centerX, -centerY);

    // Draw glow
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;

    // Draw power-up icon
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;

    if (this.powerType === 'POWER') {
      // Star shape
      this.drawStar(ctx, centerX, centerY, 5, this.width / 2, this.width / 4);
    } else if (this.powerType === 'SHIELD') {
      // Shield shape
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (this.powerType === 'BOMB') {
      // Diamond shape
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - this.height / 2);
      ctx.lineTo(centerX + this.width / 2, centerY);
      ctx.lineTo(centerX, centerY + this.height / 2);
      ctx.lineTo(centerX - this.width / 2, centerY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (this.powerType === 'LIFE') {
      // Heart shape (simple diamond for now)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + this.height / 3);
      ctx.lineTo(centerX + this.width / 3, centerY - this.height / 3);
      ctx.lineTo(centerX, centerY - this.height / 2);
      ctx.lineTo(centerX - this.width / 3, centerY - this.height / 3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draw star shape
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
    ctx.fill();
    ctx.stroke();
  }

  /**
   * Reset power-up for object pooling
   */
  reset(x, y, powerType = 'POWER') {
    const config = GAME_CONFIG.POWERUP[powerType];

    this.x = x;
    this.y = y;
    this.width = config.width;
    this.height = config.height;
    this.powerType = powerType;
    this.color = config.color;
    this.velocity.set(0, 100);
    this.rotationAngle = 0;
    this.active = true;
  }
}
