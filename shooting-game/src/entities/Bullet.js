/**
 * Bullet - Projectiles fired by player and enemies
 */
import { Entity } from './Entity.js';
import { GAME_CONFIG } from '../config/gameConfig.js';

export class Bullet extends Entity {
  constructor(x, y, vx, vy, owner = 'player', bulletType = 'PLAYER_NORMAL') {
    const config = GAME_CONFIG.BULLET[bulletType];
    super(x, y, config.width, config.height);

    this.type = 'bullet';
    this.owner = owner;
    this.bulletType = bulletType;
    this.damage = config.damage;
    this.color = config.color;

    this.velocity.set(vx, vy);
  }

  /**
   * Update bullet
   */
  update(deltaTime) {
    super.update(deltaTime);
  }

  /**
   * Render bullet
   */
  render(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;

    // Draw bullet
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Add glow effect
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.restore();
  }

  /**
   * Reset bullet for object pooling
   */
  reset(x, y, vx, vy, owner = 'player', bulletType = 'PLAYER_NORMAL') {
    const config = GAME_CONFIG.BULLET[bulletType];

    this.x = x;
    this.y = y;
    this.width = config.width;
    this.height = config.height;
    this.damage = config.damage;
    this.color = config.color;
    this.owner = owner;
    this.bulletType = bulletType;
    this.velocity.set(vx, vy);
    this.active = true;
  }
}
