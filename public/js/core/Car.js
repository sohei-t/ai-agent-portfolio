/**
 * Car.js - Car Physics and Rendering
 * Handles car movement, drifting, and visual representation
 */

export class Car {
  constructor(x, y, angle, isPlayer = false, color = '#FF2D95') {
    // Position
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;

    // Rotation
    this.angle = angle;

    // Velocity
    this.speed = 0;
    this.maxSpeed = 300;
    this.acceleration = 400;
    this.brakeForce = 600;
    this.friction = 0.98;
    this.offTrackFriction = 0.85;

    // Steering
    this.steerSpeed = 3.5;
    this.steerInput = 0;

    // Drift
    this.drifting = false;
    this.driftAngle = 0;
    this.driftCharge = 0;
    this.maxDriftCharge = 2;

    // Boost
    this.boostTime = 0;
    this.boostMultiplier = 1;

    // State
    this.isPlayer = isPlayer;
    this.color = color;
    this.name = 'Car';

    // Race progress
    this.lap = 0;
    this.checkpoints = 0;
    this.checkpointProgress = 0;
    this.position = 1;
    this.finished = false;
    this.finishTime = 0;

    // Item
    this.currentItem = null;
    this.itemsUsed = 0;

    // Effects
    this.spinOutTime = 0;
    this.shrinkTime = 0;
    this.starTime = 0;
    this.scale = 1;

    // Visual
    this.wheelAngle = 0;
    this.exhaustFlame = 0;
  }

  update(dt, input, track) {
    this.prevX = this.x;
    this.prevY = this.y;

    // Handle spin out
    if (this.spinOutTime > 0) {
      this.spinOutTime -= dt;
      this.angle += 10 * dt;
      this.speed *= 0.95;
      return;
    }

    // Handle shrink effect
    if (this.shrinkTime > 0) {
      this.shrinkTime -= dt;
      this.scale = 0.5;
      this.maxSpeed = 200;
    } else {
      this.scale = 1;
      this.maxSpeed = 300;
    }

    // Handle star effect
    if (this.starTime > 0) {
      this.starTime -= dt;
      this.maxSpeed = 400;
    }

    // Handle boost
    if (this.boostTime > 0) {
      this.boostTime -= dt;
    } else {
      this.boostMultiplier = 1;
    }

    // Get input
    const steering = input.steering || 0;
    const accelerating = input.accelerating !== false; // Auto-accelerate by default
    const braking = input.braking || false;

    // Apply steering
    this.steerInput = steering;

    // Check if on track
    const onTrack = track.isOnTrack(this.x, this.y);

    // Acceleration
    if (accelerating && !braking) {
      const maxSpd = this.maxSpeed * this.boostMultiplier;
      this.speed = Math.min(this.speed + this.acceleration * dt, maxSpd);
      this.exhaustFlame = Math.min(this.exhaustFlame + dt * 5, 1);
    } else {
      this.exhaustFlame = Math.max(this.exhaustFlame - dt * 5, 0);
    }

    // Braking
    if (braking) {
      this.speed = Math.max(this.speed - this.brakeForce * dt, -100);
    }

    // Friction
    if (!accelerating && !braking) {
      this.speed *= onTrack ? this.friction : this.offTrackFriction;
    }

    // Off-track penalty
    if (!onTrack) {
      this.speed *= this.offTrackFriction;
    }

    // Steering (only when moving)
    if (Math.abs(this.speed) > 10) {
      const steerAmount = this.steerSpeed * steering * dt;
      const speedFactor = Math.min(1, Math.abs(this.speed) / 200);

      // Drift mechanics
      if (Math.abs(steering) > 0.5 && this.speed > 150) {
        if (!this.drifting) {
          this.drifting = true;
          this.driftAngle = 0;
        }

        // Build drift charge
        this.driftCharge = Math.min(this.driftCharge + dt, this.maxDriftCharge);

        // Drift angle
        this.driftAngle += steering * 2 * dt;
        this.driftAngle = Math.max(-0.5, Math.min(0.5, this.driftAngle));

        this.angle += steerAmount * speedFactor * 1.3;
      } else {
        // Release drift boost
        if (this.drifting && this.driftCharge > 0.3) {
          const boostPower = this.driftCharge > 1 ? 1.5 : 1.2;
          const boostDuration = this.driftCharge > 1 ? 0.5 : 0.3;
          this.boost(boostPower, boostDuration);
        }

        this.drifting = false;
        this.driftCharge = 0;
        this.driftAngle *= 0.9;

        this.angle += steerAmount * speedFactor;
      }
    }

    // Move
    const moveAngle = this.angle + this.driftAngle;
    this.x += Math.cos(moveAngle) * this.speed * dt;
    this.y += Math.sin(moveAngle) * this.speed * dt;

    // Update wheel visual
    this.wheelAngle = steering * 0.5;

    // Keep on screen (with bounce)
    if (this.x < 20) { this.x = 20; this.speed *= -0.3; }
    if (this.x > track.width - 20) { this.x = track.width - 20; this.speed *= -0.3; }
    if (this.y < 20) { this.y = 20; this.speed *= -0.3; }
    if (this.y > track.height - 20) { this.y = track.height - 20; this.speed *= -0.3; }
  }

  boost(multiplier, duration) {
    this.boostMultiplier = multiplier;
    this.boostTime = duration;
    this.speed = Math.min(this.speed * 1.2, this.maxSpeed * multiplier);
  }

  spinOut() {
    if (this.starTime > 0) return; // Invincible with star
    this.spinOutTime = 1;
    this.speed *= 0.5;
  }

  shrink(duration) {
    if (this.starTime > 0) return; // Invincible with star
    this.shrinkTime = duration;
  }

  activateStar(duration) {
    this.starTime = duration;
    this.maxSpeed = 400;
  }

  setItem(item) {
    this.currentItem = item;
  }

  render(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.scale(this.scale, this.scale);

    // Draw exhaust flame
    if (this.exhaustFlame > 0 || this.boostTime > 0) {
      const flameLength = this.boostTime > 0 ? 25 : 15 * this.exhaustFlame;
      const gradient = ctx.createLinearGradient(-20 - flameLength, 0, -20, 0);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, '#FF6B35');
      gradient.addColorStop(1, '#FFE135');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-20, -6);
      ctx.lineTo(-20 - flameLength, 0);
      ctx.lineTo(-20, 6);
      ctx.closePath();
      ctx.fill();
    }

    // Draw drift sparks
    if (this.drifting && this.driftCharge > 0) {
      const sparkColor = this.driftCharge > 1 ? '#FF6B35' : '#00F5FF';
      ctx.fillStyle = sparkColor;

      for (let i = 0; i < 5; i++) {
        const sparkX = -15 + Math.random() * 10 - 5;
        const sparkY = (Math.random() - 0.5) * 20;
        ctx.fillRect(sparkX, sparkY, 3, 3);
      }
    }

    // Star effect
    if (this.starTime > 0) {
      // Rainbow glow
      const hue = (Date.now() / 10) % 360;
      ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
      ctx.shadowBlur = 20;
    }

    // Car body
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // Main body
    ctx.beginPath();
    ctx.roundRect(-20, -12, 40, 24, 5);
    ctx.fill();
    ctx.stroke();

    // Cockpit
    ctx.fillStyle = '#00F5FF';
    ctx.fillRect(-5, -8, 15, 16);
    ctx.strokeRect(-5, -8, 15, 16);

    // Wheels
    ctx.fillStyle = '#222';
    ctx.save();

    // Front wheels (with steering)
    ctx.translate(12, -14);
    ctx.rotate(this.wheelAngle);
    ctx.fillRect(-5, -3, 10, 6);
    ctx.restore();

    ctx.save();
    ctx.translate(12, 14);
    ctx.rotate(this.wheelAngle);
    ctx.fillRect(-5, -3, 10, 6);
    ctx.restore();

    // Rear wheels
    ctx.fillRect(-17, -14, 10, 6);
    ctx.fillRect(-17, 8, 10, 6);

    // Number or player indicator
    if (this.isPlayer) {
      ctx.fillStyle = '#FFE135';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('P1', 0, 0);
    }

    ctx.restore();

    // Draw position indicator above car
    if (!this.finished) {
      ctx.save();
      ctx.translate(this.x, this.y - 25 * this.scale);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.isPlayer ? '#FFE135' : '#FFFFFF';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.position.toString(), 0, 0);
      ctx.restore();
    }

    // Draw item indicator
    if (this.currentItem && this.isPlayer) {
      // Item is shown in HUD instead
    }
  }
}
