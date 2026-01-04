/**
 * RacingCar.js - Car for pseudo-3D racing
 * Handles position, physics, and sprite rendering
 */

export class RacingCar {
  constructor(options = {}) {
    // Identity
    this.id = options.id || 'player';
    this.isPlayer = options.isPlayer || false;
    this.name = options.name || 'Racer';

    // Position (x: -1 to 1 across road, z: distance along track)
    this.x = options.x || 0;
    this.z = options.z || 0;

    // Physics
    this.speed = 0;
    this.maxSpeed = options.maxSpeed || 300;  // Segments per second
    this.acceleration = options.acceleration || 100;
    this.deceleration = 50;
    this.braking = 150;
    this.offRoadDecel = 0.5;  // Speed multiplier when off road
    this.offRoadMaxSpeed = 0.3;  // Max speed multiplier off road

    // Steering
    this.steerSpeed = 2.0;  // How fast car responds to steering

    // Boost system
    this.boostMultiplier = 1;
    this.boostTime = 0;

    // Drift system
    this.drifting = false;
    this.driftCharge = 0;
    this.driftBoostReady = false;

    // Items
    this.currentItem = null;

    // Race status
    this.lap = 1;
    this.position = 1;
    this.totalDistance = 0;
    this.lapTimes = [];
    this.currentLapTime = 0;
    this.finished = false;
    this.finishTime = 0;

    // Visuals
    this.sprite = null;
    this.scale = 1;

    // Collision
    this.width = 0.15;  // Car width in road units

    // State
    this.crashed = false;
    this.crashTime = 0;
    this.invincible = false;
    this.invincibleTime = 0;
  }

  /**
   * Load car sprite
   */
  async loadSprite(imagePath) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.sprite = img;
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load car sprite: ${imagePath}`);
        resolve();
      };
      img.src = imagePath;
    });
  }

  /**
   * Update car physics
   */
  update(dt, input, road) {
    if (this.finished) return;

    // Handle crash recovery
    if (this.crashed) {
      this.crashTime -= dt;
      if (this.crashTime <= 0) {
        this.crashed = false;
        this.speed = 0;
      }
      return;
    }

    // Handle invincibility timer
    if (this.invincible) {
      this.invincibleTime -= dt;
      if (this.invincibleTime <= 0) {
        this.invincible = false;
      }
    }

    // Handle boost timer
    if (this.boostTime > 0) {
      this.boostTime -= dt;
      if (this.boostTime <= 0) {
        this.boostMultiplier = 1;
      }
    }

    // Calculate current max speed
    const isOffRoad = Math.abs(this.x) > 1;
    let currentMaxSpeed = this.maxSpeed * this.boostMultiplier;

    if (isOffRoad) {
      currentMaxSpeed *= this.offRoadMaxSpeed;
    }

    // Acceleration / Braking
    if (input.accelerate) {
      this.speed += this.acceleration * dt;
    } else if (input.brake) {
      this.speed -= this.braking * dt;
    } else {
      // Natural deceleration
      this.speed -= this.deceleration * dt;
    }

    // Off-road slowdown
    if (isOffRoad) {
      this.speed -= this.speed * this.offRoadDecel * dt;
    }

    // Clamp speed
    this.speed = Math.max(0, Math.min(currentMaxSpeed, this.speed));

    // Get road curve at current position
    const curve = road ? road.getCurveAt(this.z) : 0;

    // Centrifugal force - car naturally drifts outward on curves
    const centrifugalForce = curve * (this.speed / this.maxSpeed) * 0.002;
    this.x += centrifugalForce;

    // Steering
    const steerAmount = input.steer * this.steerSpeed * dt;

    // Steering is more effective at higher speeds
    const speedFactor = this.speed / this.maxSpeed;
    this.x += steerAmount * speedFactor;

    // Keep car on/near road
    this.x = Math.max(-2, Math.min(2, this.x));

    // Update position
    this.z += this.speed * dt;
    this.totalDistance += this.speed * dt;

    // Update lap time
    this.currentLapTime += dt;

    // Handle lap completion
    if (road) {
      const trackLength = road.totalLength;
      if (this.z >= trackLength) {
        this.completeLap(trackLength);
      }
    }

    // Drift detection
    this.updateDrift(input, curve);
  }

  /**
   * Update drift state
   */
  updateDrift(input, curve) {
    const isTurningHard = Math.abs(input.steer) > 0.7;
    const isHighSpeed = this.speed > this.maxSpeed * 0.6;
    const isOnCurve = Math.abs(curve) > 1;

    if (isTurningHard && isHighSpeed && (isOnCurve || this.drifting)) {
      if (!this.drifting) {
        this.drifting = true;
        this.driftCharge = 0;
      }
      this.driftCharge += 1 / 60;

      if (this.driftCharge >= 2) {
        this.driftBoostReady = true;
      }
    } else if (this.drifting) {
      // Release drift
      if (this.driftBoostReady) {
        this.applyBoost(1.5, 0.5);
      } else if (this.driftCharge >= 0.5) {
        this.applyBoost(1.3, 0.3);
      }
      this.drifting = false;
      this.driftCharge = 0;
      this.driftBoostReady = false;
    }
  }

  /**
   * Complete a lap
   */
  completeLap(trackLength) {
    this.lapTimes.push(this.currentLapTime);
    this.lap++;
    this.z -= trackLength;
    this.currentLapTime = 0;

    return this.lap;
  }

  /**
   * Apply boost
   */
  applyBoost(multiplier, duration) {
    this.boostMultiplier = Math.max(this.boostMultiplier, multiplier);
    this.boostTime = Math.max(this.boostTime, duration);
  }

  /**
   * Set item
   */
  setItem(item) {
    this.currentItem = item;
  }

  /**
   * Use current item
   */
  useItem() {
    const item = this.currentItem;
    this.currentItem = null;
    return item;
  }

  /**
   * Handle collision with another car
   */
  collideWith(other) {
    if (this.invincible) return;
    if (this.crashed) return;

    // Determine collision response based on relative positions
    const xDiff = this.x - other.x;
    const speedDiff = this.speed - other.speed;

    // Push cars apart
    this.x += xDiff * 0.1;
    this.speed *= 0.8;

    // If hit from behind, slow down more
    if (other.z > this.z && speedDiff > 0) {
      this.speed *= 0.6;
    }
  }

  /**
   * Crash the car
   */
  crash(duration = 1) {
    if (this.invincible) return;
    this.crashed = true;
    this.crashTime = duration;
    this.speed = 0;
  }

  /**
   * Make invincible
   */
  makeInvincible(duration) {
    this.invincible = true;
    this.invincibleTime = duration;
  }

  /**
   * Finish the race
   */
  finish(time) {
    this.finished = true;
    this.finishTime = time;
  }

  /**
   * Get render info for Road.renderSprite
   */
  getRenderInfo() {
    return {
      image: this.sprite,
      offset: this.x,
      scale: this.scale,
      z: this.z
    };
  }

  /**
   * Get total race time
   */
  getTotalTime() {
    let total = 0;
    for (const time of this.lapTimes) {
      total += time;
    }
    return total + this.currentLapTime;
  }

  /**
   * Get best lap time
   */
  getBestLap() {
    if (this.lapTimes.length === 0) return 0;
    return Math.min(...this.lapTimes);
  }

  /**
   * Reset for new race
   */
  reset(startZ = 0) {
    this.x = 0;
    this.z = startZ;
    this.speed = 0;
    this.lap = 1;
    this.position = 1;
    this.totalDistance = 0;
    this.lapTimes = [];
    this.currentLapTime = 0;
    this.finished = false;
    this.finishTime = 0;
    this.crashed = false;
    this.invincible = false;
    this.boostMultiplier = 1;
    this.boostTime = 0;
    this.drifting = false;
    this.driftCharge = 0;
    this.currentItem = null;
  }
}

/**
 * AI Racer - extends RacingCar with AI behavior
 */
export class AIRacer extends RacingCar {
  constructor(options = {}) {
    super({ ...options, isPlayer: false });

    this.difficulty = options.difficulty || 'normal';
    this.aggressiveness = options.aggressiveness || 0.5;

    // AI tuning based on difficulty
    switch (this.difficulty) {
      case 'easy':
        this.maxSpeed *= 0.85;
        this.reactionTime = 0.3;
        this.steerAccuracy = 0.7;
        break;
      case 'hard':
        this.maxSpeed *= 1.05;
        this.reactionTime = 0.1;
        this.steerAccuracy = 0.95;
        break;
      default:
        this.reactionTime = 0.2;
        this.steerAccuracy = 0.85;
    }

    // AI state
    this.targetX = 0;
    this.decisionTimer = 0;
  }

  /**
   * Update AI behavior
   */
  updateAI(dt, road, allCars) {
    this.decisionTimer -= dt;

    if (this.decisionTimer <= 0) {
      this.makeDecision(road, allCars);
      this.decisionTimer = this.reactionTime;
    }

    // Calculate steering towards target
    const steerError = (1 - this.steerAccuracy) * (Math.random() - 0.5) * 0.3;
    const targetSteer = (this.targetX - this.x) * 3 + steerError;

    return {
      accelerate: !this.finished,
      brake: false,
      steer: Math.max(-1, Math.min(1, targetSteer))
    };
  }

  /**
   * Make AI decision
   */
  makeDecision(road, allCars) {
    // Get upcoming curve
    const lookAhead = this.speed * 0.5 + 500;
    const curve = road ? road.getCurveAt(this.z + lookAhead) : 0;

    // Target racing line (apex of curve)
    this.targetX = -curve * 0.15 * this.steerAccuracy;

    // Avoid other cars
    for (const car of allCars) {
      if (car === this) continue;
      if (car.finished) continue;

      const zDiff = car.z - this.z;
      const xDiff = car.x - this.x;

      // Car ahead - avoid
      if (zDiff > 0 && zDiff < 300) {
        const avoidStrength = 1 - (zDiff / 300);
        if (Math.abs(xDiff) < this.width * 3) {
          this.targetX -= Math.sign(xDiff) * avoidStrength * 0.3;
        }
      }

      // Car alongside - don't bump
      if (Math.abs(zDiff) < 100) {
        if (Math.abs(xDiff) < this.width * 2) {
          this.targetX -= Math.sign(xDiff) * 0.2;
        }
      }
    }

    // Clamp target
    this.targetX = Math.max(-0.9, Math.min(0.9, this.targetX));
  }
}
