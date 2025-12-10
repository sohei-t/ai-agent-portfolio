/**
 * Boss AI
 * Advanced AI behavior for boss enemies
 */
import { MovementPatterns } from './MovementPatterns.js';

export class BossAI {
  constructor(boss, bossData) {
    this.boss = boss;
    this.bossData = bossData;
    this.currentPhase = 0;
    this.phaseStartTime = Date.now();
    this.attackTimer = 0;
    this.attackPatternIndex = 0;
    this.state = 'entering'; // entering, fighting, defeated
  }

  /**
   * Update boss AI
   * @param {number} deltaTime - Time elapsed since last update (seconds)
   * @param {Object} player - Player entity
   * @returns {Array} Array of bullet patterns to spawn
   */
  update(deltaTime, player) {
    const bullets = [];

    // Update state
    switch (this.state) {
      case 'entering':
        this.handleEntering(deltaTime);
        break;

      case 'fighting':
        bullets.push(...this.handleFighting(deltaTime, player));
        break;

      case 'defeated':
        this.handleDefeated(deltaTime);
        break;
    }

    return bullets;
  }

  /**
   * Handle entering state (boss moving to position)
   * @param {number} deltaTime
   */
  handleEntering(deltaTime) {
    const targetY = 100;

    if (this.boss.y < targetY) {
      this.boss.y += this.boss.speed * deltaTime;
    } else {
      this.state = 'fighting';
    }
  }

  /**
   * Handle fighting state
   * @param {number} deltaTime
   * @param {Object} player
   * @returns {Array} Bullets to spawn
   */
  handleFighting(deltaTime, player) {
    const bullets = [];

    // Update phase based on health
    this.updatePhase();

    // Update movement pattern
    const patternFunc = MovementPatterns.getPattern(this.bossData.movementPattern);
    if (patternFunc) {
      patternFunc(this.boss, deltaTime, player);
    }

    // Update attack timer
    this.attackTimer += deltaTime;

    const currentPhaseData = this.getCurrentPhaseData();
    const fireRate = currentPhaseData ? currentPhaseData.fireRate / 1000 : this.bossData.fireRate / 1000;

    if (this.attackTimer >= fireRate) {
      bullets.push(...this.executeAttackPattern(player));
      this.attackTimer = 0;
    }

    return bullets;
  }

  /**
   * Handle defeated state
   * @param {number} deltaTime
   */
  handleDefeated(deltaTime) {
    // Boss explosion effect (handled elsewhere)
    // Just mark as inactive
    this.boss.active = false;
  }

  /**
   * Update phase based on health percentage
   */
  updatePhase() {
    if (!this.bossData.phases) return;

    const healthPercent = this.boss.health / this.boss.maxHealth;

    for (let i = this.bossData.phases.length - 1; i >= 0; i--) {
      if (healthPercent <= this.bossData.phases[i].healthThreshold) {
        if (this.currentPhase !== i) {
          this.currentPhase = i;
          this.phaseStartTime = Date.now();
        }
        break;
      }
    }
  }

  /**
   * Get current phase data
   * @returns {Object|null}
   */
  getCurrentPhaseData() {
    if (!this.bossData.phases) return null;
    return this.bossData.phases[this.currentPhase];
  }

  /**
   * Execute attack pattern based on current phase
   * @param {Object} player
   * @returns {Array} Bullets to spawn
   */
  executeAttackPattern(player) {
    const bullets = [];
    const phaseData = this.getCurrentPhaseData();
    const pattern = phaseData ? phaseData.pattern : 'single';

    switch (pattern) {
      case 'single':
        bullets.push(this.createBulletTowardsPlayer(player));
        break;

      case 'spread':
        bullets.push(...this.createSpreadPattern(5, Math.PI / 4));
        break;

      case 'spiral':
        bullets.push(...this.createSpiralPattern(8));
        break;

      case 'burst':
        bullets.push(...this.createBurstPattern(12));
        break;

      case 'laser':
        bullets.push(this.createLaserBullet(player));
        break;

      case 'multi_spread':
        bullets.push(...this.createSpreadPattern(7, Math.PI / 3));
        bullets.push(...this.createSpreadPattern(7, Math.PI / 3, Math.PI));
        break;

      case 'chaos':
        bullets.push(...this.createRandomPattern(15));
        break;

      case 'ring':
        bullets.push(...this.createRingPattern(16));
        break;

      case 'double_spiral':
        bullets.push(...this.createSpiralPattern(6));
        bullets.push(...this.createSpiralPattern(6, Math.PI));
        break;

      case 'bullet_hell':
        bullets.push(...this.createBulletHellPattern());
        break;
    }

    return bullets;
  }

  /**
   * Create bullet towards player
   * @param {Object} player
   * @returns {Object}
   */
  createBulletTowardsPlayer(player) {
    const dx = player.x - this.boss.x;
    const dy = player.y - this.boss.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return {
      x: this.boss.x,
      y: this.boss.y + this.boss.height / 2,
      vx: (dx / distance) * this.bossData.bulletSpeed,
      vy: (dy / distance) * this.bossData.bulletSpeed,
      damage: this.bossData.bulletDamage
    };
  }

  /**
   * Create spread pattern
   * @param {number} count - Number of bullets
   * @param {number} spread - Spread angle in radians
   * @param {number} baseAngle - Base angle offset
   * @returns {Array}
   */
  createSpreadPattern(count, spread, baseAngle = Math.PI / 2) {
    const bullets = [];

    for (let i = 0; i < count; i++) {
      const angle = baseAngle + spread * (i - (count - 1) / 2) / (count - 1);
      bullets.push({
        x: this.boss.x,
        y: this.boss.y + this.boss.height / 2,
        vx: Math.cos(angle) * this.bossData.bulletSpeed,
        vy: Math.sin(angle) * this.bossData.bulletSpeed,
        damage: this.bossData.bulletDamage
      });
    }

    return bullets;
  }

  /**
   * Create spiral pattern
   * @param {number} count - Number of bullets
   * @param {number} angleOffset - Angle offset
   * @returns {Array}
   */
  createSpiralPattern(count, angleOffset = 0) {
    const bullets = [];
    const angleStep = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
      const angle = angleStep * i + angleOffset + (Date.now() / 1000);
      bullets.push({
        x: this.boss.x,
        y: this.boss.y + this.boss.height / 2,
        vx: Math.cos(angle) * this.bossData.bulletSpeed,
        vy: Math.sin(angle) * this.bossData.bulletSpeed,
        damage: this.bossData.bulletDamage
      });
    }

    return bullets;
  }

  /**
   * Create burst pattern (circle)
   * @param {number} count - Number of bullets
   * @returns {Array}
   */
  createBurstPattern(count) {
    const bullets = [];
    const angleStep = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
      const angle = angleStep * i;
      bullets.push({
        x: this.boss.x,
        y: this.boss.y + this.boss.height / 2,
        vx: Math.cos(angle) * this.bossData.bulletSpeed,
        vy: Math.sin(angle) * this.bossData.bulletSpeed,
        damage: this.bossData.bulletDamage
      });
    }

    return bullets;
  }

  /**
   * Create laser bullet
   * @param {Object} player
   * @returns {Object}
   */
  createLaserBullet(player) {
    const dx = player.x - this.boss.x;
    const dy = player.y - this.boss.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return {
      x: this.boss.x,
      y: this.boss.y + this.boss.height / 2,
      vx: (dx / distance) * this.bossData.bulletSpeed * 1.5,
      vy: (dy / distance) * this.bossData.bulletSpeed * 1.5,
      damage: this.bossData.bulletDamage * 1.5,
      isLaser: true
    };
  }

  /**
   * Create random pattern
   * @param {number} count
   * @returns {Array}
   */
  createRandomPattern(count) {
    const bullets = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = this.bossData.bulletSpeed * (0.7 + Math.random() * 0.6);

      bullets.push({
        x: this.boss.x + (Math.random() - 0.5) * this.boss.width,
        y: this.boss.y + this.boss.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        damage: this.bossData.bulletDamage
      });
    }

    return bullets;
  }

  /**
   * Create ring pattern
   * @param {number} count
   * @returns {Array}
   */
  createRingPattern(count) {
    return this.createBurstPattern(count);
  }

  /**
   * Create bullet hell pattern
   * @returns {Array}
   */
  createBulletHellPattern() {
    const bullets = [];

    // Multiple layers of spirals and bursts
    bullets.push(...this.createSpiralPattern(8, 0));
    bullets.push(...this.createSpiralPattern(8, Math.PI / 8));
    bullets.push(...this.createBurstPattern(16));

    return bullets;
  }

  /**
   * Boss takes damage
   * @param {number} damage
   */
  takeDamage(damage) {
    this.boss.health -= damage;

    if (this.boss.health <= 0) {
      this.state = 'defeated';
    }
  }

  /**
   * Get current state
   * @returns {string}
   */
  getState() {
    return this.state;
  }

  /**
   * Get current phase
   * @returns {number}
   */
  getCurrentPhase() {
    return this.currentPhase;
  }
}
