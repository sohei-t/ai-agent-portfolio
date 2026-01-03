/**
 * Missile.js - Homing Missile Projectile Class
 * Tracks target and deals damage on impact
 */

import { Entity } from './Entity.js';
import { Vector2 } from '../utils/Vector2.js';

export class Missile extends Entity {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.type = 'missile';
    this.width = 24;
    this.height = 48;
    this.collisionRadius = 10;
    this.color = '#FF5722';

    // Missile properties
    this.owner = null;
    this.target = null;
    this.damage = 30;
    this.speed = 300;
    this.turnRate = 4; // Radians per second
    this.lifeTime = 5;
    this.timer = 0;

    // Trail effect
    this.trail = [];
    this.trailMaxLength = 15;
    this.trailTimer = 0;
    this.trailInterval = 0.02;

    // Animation
    this.exhaustFlicker = 0;
  }

  /**
   * Initialize missile
   */
  init(x, y, vx, vy, rotation, owner = null, target = null) {
    this.position.set(x, y);
    this.velocity.set(vx, vy);
    this.rotation = rotation;
    this.owner = owner;
    this.target = target;
    this.timer = 0;
    this.active = true;
    this.trail = [];
    this.exhaustFlicker = 0;
  }

  /**
   * Update missile state
   */
  update(deltaTime) {
    this.timer += deltaTime;

    // Expire after lifetime
    if (this.timer >= this.lifeTime) {
      this.active = false;
      return;
    }

    // Track target if exists
    if (this.target && this.target.active) {
      this.trackTarget(deltaTime);
    }

    // Move forward
    const speed = this.velocity.mag();
    this.velocity.x = Math.sin(this.rotation) * speed;
    this.velocity.y = -Math.cos(this.rotation) * speed;

    // Update position
    super.update(deltaTime);

    // Update trail
    this.trailTimer += deltaTime;
    if (this.trailTimer >= this.trailInterval) {
      this.trailTimer = 0;
      this.trail.unshift({
        x: this.position.x - Math.sin(this.rotation) * 20,
        y: this.position.y + Math.cos(this.rotation) * 20,
        alpha: 1
      });

      if (this.trail.length > this.trailMaxLength) {
        this.trail.pop();
      }
    }

    // Fade trail
    for (let i = 0; i < this.trail.length; i++) {
      this.trail[i].alpha -= deltaTime * 3;
      if (this.trail[i].alpha <= 0) {
        this.trail.splice(i, 1);
        i--;
      }
    }

    // Animation
    this.exhaustFlicker += deltaTime * 30;
  }

  /**
   * Track target
   */
  trackTarget(deltaTime) {
    const dx = this.target.position.x - this.position.x;
    const dy = this.target.position.y - this.position.y;
    const targetAngle = Math.atan2(dx, -dy);

    // Calculate angle difference
    let angleDiff = targetAngle - this.rotation;

    // Normalize to -PI to PI
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    // Apply turn rate
    const maxTurn = this.turnRate * deltaTime;
    if (Math.abs(angleDiff) < maxTurn) {
      this.rotation = targetAngle;
    } else {
      this.rotation += Math.sign(angleDiff) * maxTurn;
    }

    // Normalize rotation
    while (this.rotation > Math.PI) this.rotation -= Math.PI * 2;
    while (this.rotation < -Math.PI) this.rotation += Math.PI * 2;
  }

  /**
   * Render missile
   */
  render(ctx) {
    // Render trail
    this.renderTrail(ctx);

    // Render missile
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);

    // Missile body
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(8, 8);
    ctx.lineTo(5, 20);
    ctx.lineTo(-5, 20);
    ctx.lineTo(-8, 8);
    ctx.closePath();
    ctx.fill();

    // Nose cone
    ctx.fillStyle = '#FF5722';
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(5, -12);
    ctx.lineTo(-5, -12);
    ctx.closePath();
    ctx.fill();

    // Fins
    ctx.fillStyle = '#FF5722';
    ctx.beginPath();
    ctx.moveTo(8, 8);
    ctx.lineTo(14, 18);
    ctx.lineTo(5, 14);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-8, 8);
    ctx.lineTo(-14, 18);
    ctx.lineTo(-5, 14);
    ctx.closePath();
    ctx.fill();

    // Exhaust flame
    const flameSize = 8 + Math.sin(this.exhaustFlicker) * 3;
    const gradient = ctx.createLinearGradient(0, 20, 0, 20 + flameSize);
    gradient.addColorStop(0, '#FFFF00');
    gradient.addColorStop(0.5, '#FF6600');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-4, 20);
    ctx.lineTo(0, 20 + flameSize);
    ctx.lineTo(4, 20);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * Render exhaust trail
   */
  renderTrail(ctx) {
    for (let i = 0; i < this.trail.length; i++) {
      const point = this.trail[i];
      const size = (1 - i / this.trail.length) * 6;

      ctx.save();
      ctx.globalAlpha = point.alpha * 0.5;

      // Trail particles
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, size
      );
      gradient.addColorStop(0, '#FFFF00');
      gradient.addColorStop(0.5, '#FF6600');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  /**
   * Check if missile hit target
   */
  hasHitTarget(entity) {
    if (entity === this.owner) return false;
    return this.intersectsCircle(entity);
  }

  /**
   * Explode on impact
   */
  explode() {
    this.active = false;
    // Return explosion data for effects
    return {
      x: this.position.x,
      y: this.position.y,
      radius: 40,
      damage: this.damage
    };
  }

  /**
   * Reset missile
   */
  reset() {
    super.reset();
    this.owner = null;
    this.target = null;
    this.timer = 0;
    this.trail = [];
    this.exhaustFlicker = 0;
  }
}

export default Missile;
