/**
 * Boss - Final boss with multiple phases and complex attack patterns
 * Dungeon Lord with 3 phases and minion summoning
 */
import { Enemy } from './Enemy.js';

export class Boss extends Enemy {
  constructor() {
    super();
    this.type = 'boss';

    this.phase = 1;
    this.summonCooldown = 0;
    this.summonInterval = 30;
    this.summonCount = 2;
    this.patterns = [];
    this.currentPatternIndex = 0;
    this.patternCooldown = 0;
    this.patternInterval = 5;

    this.width = 96;
    this.height = 96;

    this.zIndex = 6; // Render above regular enemies
  }

  /**
   * Initialize boss
   */
  init(x, y, bossConfig, bulletConfig) {
    super.init(x, y, bossConfig, bulletConfig);

    this.summonInterval = bossConfig.summonInterval;
    this.summonCount = bossConfig.summonCount;
    this.summonCooldown = this.summonInterval;

    this.updatePhase();

    return this;
  }

  /**
   * Update boss
   */
  update(deltaTime) {
    super.update(deltaTime);

    // Check for phase transitions
    this.checkPhaseTransition();

    // Update summon cooldown
    this.summonCooldown -= deltaTime;

    // Update pattern cooldown
    this.patternCooldown -= deltaTime;
  }

  /**
   * Check and handle phase transitions
   */
  checkPhaseTransition() {
    const phases = this.config.phases;

    if (this.phase === 1 && this.hp <= phases.phase2.hpThreshold) {
      this.switchPhase(2);
    } else if (this.phase === 2 && this.hp <= phases.phase3.hpThreshold) {
      this.switchPhase(3);
    }
  }

  /**
   * Switch to new phase
   */
  switchPhase(newPhase) {
    this.phase = newPhase;
    this.updatePhase();
    console.log(`[Boss] Switched to phase ${newPhase}`);
  }

  /**
   * Update phase properties
   */
  updatePhase() {
    const phases = this.config.phases;
    let phaseConfig;

    if (this.phase === 1) {
      phaseConfig = phases.phase1;
    } else if (this.phase === 2) {
      phaseConfig = phases.phase2;
    } else {
      phaseConfig = phases.phase3;
      // Phase 3 speed increase
      if (phaseConfig.speedMultiplier) {
        this.moveSpeed *= phaseConfig.speedMultiplier;
        this.fireRate /= phaseConfig.speedMultiplier;
      }
    }

    this.patterns = phaseConfig.patterns;
    this.patternInterval = phaseConfig.patternInterval;
  }

  /**
   * Boss movement pattern
   */
  updateMovement(deltaTime) {
    // Boss moves in complex pattern
    const amplitude = 150;
    const frequency = 0.5;

    this.targetX = 400 + Math.sin(this.moveTime * frequency) * amplitude;
    this.velocity.x = (this.targetX - this.x) * 2;
    this.velocity.y = Math.cos(this.moveTime * frequency * 0.3) * this.moveSpeed * 0.5;
  }

  /**
   * Execute current attack pattern
   */
  fire(playerX, playerY) {
    if (this.patternCooldown > 0) return [];

    this.patternCooldown = this.patternInterval;

    // Cycle through patterns
    const patternName = this.patterns[this.currentPatternIndex];
    this.currentPatternIndex = (this.currentPatternIndex + 1) % this.patterns.length;

    return this.executePattern(patternName, playerX, playerY);
  }

  /**
   * Execute specific attack pattern
   */
  executePattern(patternName, playerX, playerY) {
    const bullets = [];

    switch(patternName) {
      case 'radial_8way':
        // 8-way radial burst
        for (let i = 0; i < 8; i++) {
          bullets.push({
            x: this.x,
            y: this.y,
            angle: (Math.PI * 2 / 8) * i,
            type: 'boss-bullet'
          });
        }
        break;

      case 'laser_sweep':
        // Sweeping laser (multiple bullets in line)
        const sweepAngle = Math.sin(this.moveTime * 2) * Math.PI / 3;
        for (let i = 0; i < 5; i++) {
          bullets.push({
            x: this.x,
            y: this.y,
            angle: sweepAngle + Math.PI / 2,
            type: 'boss-bullet'
          });
        }
        break;

      case 'homing_triple':
        // Three homing missiles
        for (let i = 0; i < 3; i++) {
          bullets.push({
            x: this.x,
            y: this.y,
            angle: Math.PI / 2 + (i - 1) * 0.3,
            type: 'boss-bullet',
            homing: true,
            playerX,
            playerY
          });
        }
        break;

      case 'wave':
        // Wave pattern
        for (let i = 0; i < 12; i++) {
          const angle = (Math.PI / 6) * i - Math.PI / 2;
          bullets.push({
            x: this.x,
            y: this.y,
            angle: angle,
            type: 'boss-bullet'
          });
        }
        break;

      case 'spiral':
        // Spiral pattern
        const spiralAngle = this.moveTime * 5;
        for (let i = 0; i < 4; i++) {
          bullets.push({
            x: this.x,
            y: this.y,
            angle: spiralAngle + (Math.PI / 2) * i,
            type: 'boss-bullet'
          });
        }
        break;
    }

    return bullets;
  }

  /**
   * Check if should summon minions
   */
  shouldSummon() {
    return this.summonCooldown <= 0;
  }

  /**
   * Summon minions
   */
  summonMinions() {
    if (!this.shouldSummon()) return [];

    this.summonCooldown = this.summonInterval;

    const minions = [];
    for (let i = 0; i < this.summonCount; i++) {
      const offsetX = (i - 0.5) * 100;
      minions.push({
        x: this.x + offsetX,
        y: this.y + 50,
        type: 'minion'
      });
    }

    console.log(`[Boss] Summoned ${this.summonCount} minions`);
    return minions;
  }

  /**
   * Render boss
   */
  render(ctx) {
    ctx.save();

    // Flash when hit
    const hitFlash = this.hp < this.maxHp && (Date.now() % 200 < 100);

    // Phase color
    const phaseColors = ['#ff0000', '#ff00ff', '#ffff00'];
    const color = phaseColors[this.phase - 1];

    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;

    if (hitFlash) {
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = color;
    }

    // Draw boss as star
    const points = 8;
    const outerRadius = this.width / 2;
    const innerRadius = this.width / 4;

    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const px = this.x + Math.cos(angle) * radius;
      const py = this.y + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();

    // Draw phase indicator
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`PHASE ${this.phase}`, this.x, this.y);

    // Draw HP bar
    this.renderBossHPBar(ctx);

    ctx.restore();
  }

  /**
   * Render boss HP bar at top of screen
   */
  renderBossHPBar(ctx) {
    const barWidth = 600;
    const barHeight = 20;
    const barX = 100;
    const barY = 30;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(barX - 5, barY - 5, barWidth + 10, barHeight + 10);

    // HP background
    ctx.fillStyle = '#330000';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // HP
    const hpPercent = this.hp / this.maxHp;
    const phaseColors = ['#ff0000', '#ff00ff', '#ffff00'];
    ctx.fillStyle = phaseColors[this.phase - 1];
    ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('DUNGEON LORD', barX, barY - 10);

    // HP text
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.ceil(this.hp)} / ${this.maxHp}`, barX + barWidth, barY - 10);
  }
}
