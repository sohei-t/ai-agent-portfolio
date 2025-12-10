/**
 * Movement Patterns for Enemies
 * Defines various movement behaviors for different enemy types
 */
import { Vector2D } from '../utils/Vector2D.js';
import { MathUtils } from '../utils/MathUtils.js';

export class MovementPatterns {
  /**
   * Straight downward movement
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static straight(entity, deltaTime) {
    entity.y += entity.speed * deltaTime;
  }

  /**
   * Zigzag movement pattern
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static zigzag(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        direction: Math.random() < 0.5 ? -1 : 1,
        switchTime: 0,
        switchInterval: 1.0 // Switch direction every 1 second
      };
    }

    const data = entity.patternData;
    data.switchTime += deltaTime;

    if (data.switchTime >= data.switchInterval) {
      data.direction *= -1;
      data.switchTime = 0;
    }

    entity.x += entity.speed * 0.5 * data.direction * deltaTime;
    entity.y += entity.speed * 0.8 * deltaTime;
  }

  /**
   * Sine wave movement pattern
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static sine(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        startX: entity.x,
        time: 0,
        amplitude: 100,
        frequency: 2
      };
    }

    const data = entity.patternData;
    data.time += deltaTime;

    entity.x = data.startX + Math.sin(data.time * data.frequency) * data.amplitude;
    entity.y += entity.speed * 0.7 * deltaTime;
  }

  /**
   * Circular movement pattern
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static circle(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        centerX: entity.x,
        centerY: entity.y,
        radius: 80,
        angle: 0,
        angularSpeed: 2, // radians per second
        descendSpeed: 30
      };
    }

    const data = entity.patternData;
    data.angle += data.angularSpeed * deltaTime;
    data.centerY += data.descendSpeed * deltaTime;

    entity.x = data.centerX + Math.cos(data.angle) * data.radius;
    entity.y = data.centerY + Math.sin(data.angle) * data.radius;
  }

  /**
   * Homing movement (targets player)
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   * @param {Object} player - Player entity
   */
  static homing(entity, deltaTime, player) {
    if (!player || !player.active) {
      // Fall back to straight if no player
      MovementPatterns.straight(entity, deltaTime);
      return;
    }

    const dx = player.x - entity.x;
    const dy = player.y - entity.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const dirX = dx / distance;
      const dirY = dy / distance;

      entity.x += dirX * entity.speed * deltaTime;
      entity.y += dirY * entity.speed * deltaTime;
    }
  }

  /**
   * Spiral movement pattern
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static spiral(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        startX: entity.x,
        time: 0,
        radius: 0,
        radiusGrowth: 30, // pixels per second
        angularSpeed: 3 // radians per second
      };
    }

    const data = entity.patternData;
    data.time += deltaTime;
    data.radius += data.radiusGrowth * deltaTime;

    const angle = data.time * data.angularSpeed;
    entity.x = data.startX + Math.cos(angle) * data.radius;
    entity.y += entity.speed * 0.5 * deltaTime;
  }

  /**
   * Figure-8 movement pattern
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static figure8(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        startX: entity.x,
        time: 0,
        amplitude: 80,
        frequency: 1.5
      };
    }

    const data = entity.patternData;
    data.time += deltaTime;

    const t = data.time * data.frequency;
    entity.x = data.startX + Math.sin(t) * data.amplitude;
    entity.y += entity.speed * 0.6 * deltaTime;

    // Add secondary sine wave for figure-8
    entity.x += Math.sin(t * 2) * (data.amplitude * 0.3);
  }

  /**
   * Dive attack pattern (rush towards player then return)
   * @param {Object} entity - Enemy entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   * @param {Object} player - Player entity
   */
  static dive(entity, deltaTime, player) {
    if (!entity.patternData) {
      entity.patternData = {
        state: 'approach', // approach, dive, return
        startX: entity.x,
        startY: entity.y,
        targetX: null,
        targetY: null,
        diveSpeed: entity.speed * 2
      };
    }

    const data = entity.patternData;

    switch (data.state) {
      case 'approach':
        entity.y += entity.speed * 0.5 * deltaTime;

        // Start dive when at certain Y position
        if (entity.y > 150 && player && player.active) {
          data.state = 'dive';
          data.targetX = player.x;
          data.targetY = player.y;
        }
        break;

      case 'dive':
        const dx = data.targetX - entity.x;
        const dy = data.targetY - entity.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
          entity.x += (dx / distance) * data.diveSpeed * deltaTime;
          entity.y += (dy / distance) * data.diveSpeed * deltaTime;
        } else {
          data.state = 'return';
        }
        break;

      case 'return':
        // Return to top of screen
        entity.y -= entity.speed * 1.5 * deltaTime;

        // Remove if off screen
        if (entity.y < -50) {
          entity.active = false;
        }
        break;
    }
  }

  /**
   * Boss pattern 1: Side-to-side movement at top of screen
   * @param {Object} entity - Boss entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static boss_pattern_1(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        targetY: 100,
        targetX: 400,
        moving: true,
        direction: 1,
        minX: 100,
        maxX: 700
      };
    }

    const data = entity.patternData;

    // Move to initial position
    if (entity.y < data.targetY) {
      entity.y += entity.speed * deltaTime;
      return;
    }

    // Side-to-side movement
    entity.x += entity.speed * data.direction * deltaTime;

    if (entity.x <= data.minX || entity.x >= data.maxX) {
      data.direction *= -1;
    }
  }

  /**
   * Boss pattern 2: Circular movement
   * @param {Object} entity - Boss entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static boss_pattern_2(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        centerX: 400,
        centerY: 150,
        radius: 100,
        angle: 0,
        angularSpeed: 1
      };
    }

    const data = entity.patternData;

    // Move to center position first
    if (entity.y < data.centerY) {
      entity.y += entity.speed * deltaTime;
      entity.x += (data.centerX - entity.x) * deltaTime;
      return;
    }

    // Circular movement
    data.angle += data.angularSpeed * deltaTime;
    entity.x = data.centerX + Math.cos(data.angle) * data.radius;
    entity.y = data.centerY + Math.sin(data.angle) * data.radius * 0.5;
  }

  /**
   * Boss pattern 3: Complex movement with phases
   * @param {Object} entity - Boss entity
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   */
  static boss_pattern_3(entity, deltaTime) {
    if (!entity.patternData) {
      entity.patternData = {
        phase: 0,
        phaseTime: 0,
        phaseDuration: 5,
        centerX: 400,
        centerY: 120,
        angle: 0
      };
    }

    const data = entity.patternData;

    // Move to initial position
    if (entity.y < data.centerY) {
      entity.y += entity.speed * deltaTime;
      return;
    }

    data.phaseTime += deltaTime;

    // Switch phases
    if (data.phaseTime >= data.phaseDuration) {
      data.phase = (data.phase + 1) % 3;
      data.phaseTime = 0;
    }

    // Execute phase movement
    switch (data.phase) {
      case 0: // Horizontal sweep
        entity.x += Math.sin(data.phaseTime * 2) * 200 * deltaTime;
        break;

      case 1: // Circular
        data.angle += deltaTime;
        entity.x = data.centerX + Math.cos(data.angle * 2) * 150;
        entity.y = data.centerY + Math.sin(data.angle * 2) * 50;
        break;

      case 2: // Figure-8
        data.angle += deltaTime;
        entity.x = data.centerX + Math.sin(data.angle) * 150;
        entity.y = data.centerY + Math.sin(data.angle * 2) * 40;
        break;
    }
  }

  /**
   * Get movement pattern function by name
   * @param {string} patternName - Name of the pattern
   * @returns {Function} Movement pattern function
   */
  static getPattern(patternName) {
    return MovementPatterns[patternName] || MovementPatterns.straight;
  }
}
