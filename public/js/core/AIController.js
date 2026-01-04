/**
 * AIController.js - AI Racer Behavior
 * Controls AI racers with racing line following and item usage
 */

export class AIController {
  constructor(car, track, difficulty = 'normal') {
    this.car = car;
    this.track = track;
    this.difficulty = difficulty;

    // Difficulty settings
    this.settings = this.getDifficultySettings(difficulty);

    // Racing state
    this.targetPoint = null;
    this.targetIndex = 0;
    this.lookAhead = 2; // Points to look ahead
    this.stuckTimer = 0;
    this.lastPosition = { x: car.x, y: car.y };

    // Item usage
    this.itemUseDelay = 0;
    this.defensiveMode = false;

    // Rubber-banding
    this.rubberBandFactor = 1;
  }

  getDifficultySettings(difficulty) {
    const settings = {
      easy: {
        maxSpeed: 0.7,
        steerAccuracy: 0.6,
        itemUseSmart: 0.3,
        reactionTime: 0.5,
        driftSkill: 0.3,
        rubberBandStrength: 0.5
      },
      normal: {
        maxSpeed: 0.85,
        steerAccuracy: 0.8,
        itemUseSmart: 0.6,
        reactionTime: 0.3,
        driftSkill: 0.6,
        rubberBandStrength: 0.3
      },
      hard: {
        maxSpeed: 1.0,
        steerAccuracy: 0.95,
        itemUseSmart: 0.9,
        reactionTime: 0.1,
        driftSkill: 0.9,
        rubberBandStrength: 0.1
      }
    };

    return settings[difficulty] || settings.normal;
  }

  update(dt, cars, droppedItems) {
    // Check if stuck
    this.checkStuck(dt);

    // Update rubber-banding
    this.updateRubberBand(cars);

    // Get target racing line point
    this.updateTarget();

    // Generate input
    const input = this.generateInput(dt, cars, droppedItems);

    // Apply speed modifier from rubber-banding
    this.car.maxSpeed = 300 * this.settings.maxSpeed * this.rubberBandFactor;

    return input;
  }

  checkStuck(dt) {
    const moved = Math.hypot(
      this.car.x - this.lastPosition.x,
      this.car.y - this.lastPosition.y
    );

    if (moved < 1 && this.car.speed < 10) {
      this.stuckTimer += dt;
    } else {
      this.stuckTimer = 0;
    }

    this.lastPosition = { x: this.car.x, y: this.car.y };

    // If stuck for too long, try to recover
    if (this.stuckTimer > 2) {
      this.stuckTimer = 0;
      // Force a direction change
      this.targetIndex = (this.targetIndex + 4) % this.track.racingLine.length;
    }
  }

  updateRubberBand(cars) {
    // Find player position
    const player = cars.find(c => c.isPlayer);
    if (!player) {
      this.rubberBandFactor = 1;
      return;
    }

    const playerPos = player.position;
    const aiPos = this.car.position;
    const diff = aiPos - playerPos; // Positive = behind player

    // Rubber-banding: Speed up if behind, slow down if ahead
    const strength = this.settings.rubberBandStrength;

    if (diff > 0) {
      // AI is behind player - speed up
      this.rubberBandFactor = 1 + diff * 0.05 * strength;
    } else {
      // AI is ahead of player - slow down slightly
      this.rubberBandFactor = 1 + diff * 0.02 * strength;
    }

    // Clamp
    this.rubberBandFactor = Math.max(0.8, Math.min(1.3, this.rubberBandFactor));
  }

  updateTarget() {
    // Find nearest racing line point
    const nearest = this.track.getNearestRacingLinePoint(this.car.x, this.car.y);

    // Look ahead
    const targetIndex = (nearest.index + this.lookAhead) % this.track.racingLine.length;
    this.targetPoint = this.track.racingLine[targetIndex];
    this.targetIndex = targetIndex;
  }

  generateInput(dt, cars, droppedItems) {
    const input = {
      steering: 0,
      accelerating: true,
      braking: false
    };

    if (!this.targetPoint) return input;

    // Calculate angle to target
    const dx = this.targetPoint.x - this.car.x;
    const dy = this.targetPoint.y - this.car.y;
    const targetAngle = Math.atan2(dy, dx);

    // Calculate angle difference
    let angleDiff = targetAngle - this.car.angle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    // Steering with accuracy modifier
    const accuracy = this.settings.steerAccuracy;
    const noise = (Math.random() - 0.5) * 0.5 * (1 - accuracy);

    input.steering = Math.max(-1, Math.min(1, angleDiff * 2 + noise));

    // Braking for sharp turns
    const sharpTurn = Math.abs(angleDiff) > Math.PI / 3;
    if (sharpTurn && this.car.speed > 200) {
      input.braking = true;
      input.accelerating = false;
    }

    // Avoid obstacles (dropped items)
    this.avoidObstacles(input, droppedItems);

    // Avoid other cars
    this.avoidCars(input, cars);

    // Use item
    this.updateItemUsage(dt, cars, droppedItems);

    return input;
  }

  avoidObstacles(input, droppedItems) {
    if (!droppedItems) return;

    for (const item of droppedItems) {
      if (!item.active) continue;

      const dx = item.x - this.car.x;
      const dy = item.y - this.car.y;
      const distance = Math.hypot(dx, dy);

      // Only avoid nearby obstacles
      if (distance > 100) continue;

      // Check if obstacle is ahead
      const angleToItem = Math.atan2(dy, dx);
      let angleDiff = angleToItem - this.car.angle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // If obstacle is ahead, steer away
      if (Math.abs(angleDiff) < Math.PI / 2) {
        const avoidSteering = angleDiff > 0 ? -0.5 : 0.5;
        input.steering += avoidSteering * (1 - distance / 100);
        input.steering = Math.max(-1, Math.min(1, input.steering));
      }
    }
  }

  avoidCars(input, cars) {
    for (const other of cars) {
      if (other === this.car) continue;

      const dx = other.x - this.car.x;
      const dy = other.y - this.car.y;
      const distance = Math.hypot(dx, dy);

      // Only avoid very close cars
      if (distance > 60) continue;

      // Check if car is ahead
      const angleToOther = Math.atan2(dy, dx);
      let angleDiff = angleToOther - this.car.angle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // If car is directly ahead, steer around
      if (Math.abs(angleDiff) < Math.PI / 4) {
        const avoidSteering = angleDiff > 0 ? -0.3 : 0.3;
        input.steering += avoidSteering;
        input.steering = Math.max(-1, Math.min(1, input.steering));
      }
    }
  }

  updateItemUsage(dt, cars, droppedItems) {
    if (this.itemUseDelay > 0) {
      this.itemUseDelay -= dt;
      return null;
    }

    const item = this.car.currentItem;
    if (!item) return null;

    // Decision based on item type and situation
    const smartness = this.settings.itemUseSmart;
    const random = Math.random();

    if (random > smartness) {
      // Random timing
      if (Math.random() < 0.01) {
        return this.useItem(item);
      }
      return null;
    }

    // Smart item usage
    switch (item.id) {
      case 'banana':
        // Drop when someone is behind
        if (this.hasSomeoneClose(cars, 'behind')) {
          return this.useItem(item);
        }
        break;

      case 'green_shell':
      case 'red_shell':
        // Use when someone is ahead
        if (this.hasSomeoneClose(cars, 'ahead')) {
          return this.useItem(item);
        }
        break;

      case 'mushroom':
      case 'triple_mushroom':
        // Use on straight sections
        if (this.isOnStraight()) {
          return this.useItem(item);
        }
        break;

      case 'star':
        // Use when in bad position or when close to others
        if (this.car.position > 2 || this.hasSomeoneClose(cars, 'any')) {
          return this.useItem(item);
        }
        break;

      case 'lightning':
        // Use when in last place
        if (this.car.position >= 4) {
          return this.useItem(item);
        }
        break;
    }

    return null;
  }

  useItem(item) {
    this.itemUseDelay = 2; // Delay before next item use
    this.car.currentItem = null;
    return item;
  }

  hasSomeoneClose(cars, direction) {
    for (const other of cars) {
      if (other === this.car) continue;

      const dx = other.x - this.car.x;
      const dy = other.y - this.car.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 150) continue;

      const angleToOther = Math.atan2(dy, dx);
      let angleDiff = angleToOther - this.car.angle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      if (direction === 'ahead' && Math.abs(angleDiff) < Math.PI / 3) {
        return true;
      }
      if (direction === 'behind' && Math.abs(angleDiff) > Math.PI * 2 / 3) {
        return true;
      }
      if (direction === 'any') {
        return true;
      }
    }

    return false;
  }

  isOnStraight() {
    // Check if the next few racing line points are roughly straight
    const points = [];
    for (let i = 0; i < 5; i++) {
      const idx = (this.targetIndex + i) % this.track.racingLine.length;
      points.push(this.track.racingLine[idx]);
    }

    // Calculate total angle change
    let totalAngleChange = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const angle = Math.atan2(dy, dx);

      if (i > 1) {
        const prevDx = points[i - 1].x - points[i - 2].x;
        const prevDy = points[i - 1].y - points[i - 2].y;
        const prevAngle = Math.atan2(prevDy, prevDx);

        let diff = angle - prevAngle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        totalAngleChange += Math.abs(diff);
      }
    }

    return totalAngleChange < Math.PI / 4;
  }
}
