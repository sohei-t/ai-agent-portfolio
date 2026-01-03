/**
 * Enemy.js - Enemy Vehicle Class
 * AI-controlled enemy vehicles
 */

import { Vehicle } from './Vehicle.js';
import { Vector2 } from '../utils/Vector2.js';

// AI States
export const AIState = {
  PATROL: 'PATROL',
  CHASE: 'CHASE',
  ATTACK: 'ATTACK',
  EVADE: 'EVADE'
};

export class Enemy extends Vehicle {
  constructor(x = 0, y = 0, difficulty = 'normal') {
    super(x, y);

    this.type = 'enemy';
    this.difficulty = difficulty;

    // Set stats based on difficulty
    this.applyDifficulty(difficulty);

    // AI State
    this.aiState = AIState.PATROL;
    this.stateTimer = 0;
    this.patrolDirection = Vector2.randomUnit();
    this.patrolChangeInterval = 2 + Math.random() * 2;

    // AI Parameters
    this.detectionRange = 250;
    this.attackRange = 120;
    this.evadeRange = 80;

    // Attack
    this.attackCooldown = 0;
    this.attackCooldownTime = 3;
    this.canFireBombs = true;
    this.canFireMissiles = difficulty === 'hard';

    // Evasion
    this.evadeTimer = 0;
    this.evadeDuration = 1.5;
    this.evadeDirection = new Vector2();

    // Target reference
    this.target = null;

    // Score value
    this.scoreValue = difficulty === 'easy' ? 80 : difficulty === 'hard' ? 150 : 100;
  }

  /**
   * Apply difficulty settings
   */
  applyDifficulty(difficulty) {
    switch (difficulty) {
      case 'easy':
        this.health = 50;
        this.maxHealth = 50;
        this.speed = 100;
        this.maxSpeed = 120;
        this.acceleration = 200;
        this.color = '#66BB6A';
        break;
      case 'hard':
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 150;
        this.maxSpeed = 180;
        this.acceleration = 300;
        this.color = '#EF5350';
        break;
      default: // normal
        this.health = 75;
        this.maxHealth = 75;
        this.speed = 130;
        this.maxSpeed = 150;
        this.acceleration = 250;
        this.color = '#FFA726';
    }
  }

  /**
   * Update enemy AI
   * @param {number} deltaTime - Time since last update
   */
  update(deltaTime) {
    super.update(deltaTime);

    // Update attack cooldown
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }

    // Update state timer
    this.stateTimer += deltaTime;

    // Run AI state machine
    this.updateAI(deltaTime);
  }

  /**
   * Update AI state machine
   */
  updateAI(deltaTime) {
    if (!this.target || !this.target.active) {
      this.aiState = AIState.PATROL;
    }

    const distanceToTarget = this.target ?
      this.position.dist(this.target.position) : Infinity;

    // Evaluate state transitions
    this.evaluateStateTransitions(distanceToTarget);

    // Execute current state
    switch (this.aiState) {
      case AIState.PATROL:
        this.executePatrol(deltaTime);
        break;
      case AIState.CHASE:
        this.executeChase(deltaTime);
        break;
      case AIState.ATTACK:
        this.executeAttack(deltaTime);
        break;
      case AIState.EVADE:
        this.executeEvade(deltaTime);
        break;
    }
  }

  /**
   * Evaluate state transitions
   */
  evaluateStateTransitions(distanceToTarget) {
    const previousState = this.aiState;

    // Handle evade timer
    if (this.aiState === AIState.EVADE) {
      this.evadeTimer -= 0.016; // Approximate deltaTime
      if (this.evadeTimer <= 0) {
        this.aiState = AIState.CHASE;
      }
      return;
    }

    // Check for target
    if (!this.target || !this.target.active) {
      this.aiState = AIState.PATROL;
      return;
    }

    // State transitions
    if (distanceToTarget <= this.attackRange) {
      this.aiState = AIState.ATTACK;
    } else if (distanceToTarget <= this.detectionRange) {
      this.aiState = AIState.CHASE;
    } else if (distanceToTarget > this.detectionRange * 1.5) {
      this.aiState = AIState.PATROL;
    }

    // Reset timer on state change
    if (previousState !== this.aiState) {
      this.stateTimer = 0;
    }
  }

  /**
   * Execute PATROL state
   */
  executePatrol(deltaTime) {
    // Change direction periodically
    if (this.stateTimer >= this.patrolChangeInterval) {
      this.patrolDirection = Vector2.randomUnit();
      this.stateTimer = 0;
      this.patrolChangeInterval = 2 + Math.random() * 2;
    }

    // Move in patrol direction
    this.move(
      this.patrolDirection.x * 0.5,
      this.patrolDirection.y * 0.5,
      deltaTime
    );
  }

  /**
   * Execute CHASE state
   */
  executeChase(deltaTime) {
    if (!this.target) return;

    // Calculate direction to target
    const dx = this.target.position.x - this.position.x;
    const dy = this.target.position.y - this.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      // Add some prediction
      const predictionTime = 0.3;
      const predictedX = this.target.position.x + this.target.velocity.x * predictionTime;
      const predictedY = this.target.position.y + this.target.velocity.y * predictionTime;

      const pdx = predictedX - this.position.x;
      const pdy = predictedY - this.position.y;
      const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

      this.move(pdx / pdist, pdy / pdist, deltaTime);
    }
  }

  /**
   * Execute ATTACK state
   */
  executeAttack(deltaTime) {
    if (!this.target) return;

    // Continue chasing while attacking
    this.executeChase(deltaTime);

    // Try to attack
    if (this.attackCooldown <= 0) {
      this.performAttack();
    }
  }

  /**
   * Execute EVADE state
   */
  executeEvade(deltaTime) {
    // Move in evade direction
    this.move(
      this.evadeDirection.x,
      this.evadeDirection.y,
      deltaTime
    );
  }

  /**
   * Perform attack
   * @returns {Object|null} Attack data
   */
  performAttack() {
    if (this.attackCooldown > 0) return null;

    this.attackCooldown = this.attackCooldownTime;

    // Spawn bomb behind enemy
    const spawnDistance = this.height / 2 + 20;
    const spawnX = this.position.x - Math.sin(this.rotation) * spawnDistance;
    const spawnY = this.position.y + Math.cos(this.rotation) * spawnDistance;

    const bombSpeed = 30;
    const vx = -Math.sin(this.rotation) * bombSpeed;
    const vy = Math.cos(this.rotation) * bombSpeed;

    return {
      type: 'bomb',
      x: spawnX,
      y: spawnY,
      vx: vx,
      vy: vy,
      owner: this,
      damage: 20
    };
  }

  /**
   * Set target to chase
   * @param {Entity} target - Target entity
   */
  setTarget(target) {
    this.target = target;
  }

  /**
   * Take damage (override to trigger evade)
   */
  takeDamage(amount) {
    const alive = super.takeDamage(amount);

    // Trigger evade state
    if (alive && Math.random() > 0.5) {
      this.startEvade();
    }

    return alive;
  }

  /**
   * Start evasion
   */
  startEvade() {
    this.aiState = AIState.EVADE;
    this.evadeTimer = this.evadeDuration;

    // Calculate evade direction (away from target)
    if (this.target) {
      const dx = this.position.x - this.target.position.x;
      const dy = this.position.y - this.target.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        this.evadeDirection.set(dx / dist, dy / dist);
      } else {
        this.evadeDirection = Vector2.randomUnit();
      }
    } else {
      this.evadeDirection = Vector2.randomUnit();
    }

    // Add some randomness
    this.evadeDirection.rotate((Math.random() - 0.5) * Math.PI / 2);
  }

  /**
   * Die
   */
  die() {
    super.die();
    // Could spawn explosion effect here
  }

  /**
   * Reset enemy
   */
  reset() {
    super.reset();
    this.applyDifficulty(this.difficulty);
    this.aiState = AIState.PATROL;
    this.stateTimer = 0;
    this.attackCooldown = 0;
    this.evadeTimer = 0;
    this.target = null;
    this.patrolDirection = Vector2.randomUnit();
  }
}

export default Enemy;
