/**
 * EffectUI.js - Visual effects and user feedback
 * Features: damage effects, score animations, level up, item collection, combo
 */
export class EffectUI {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Active effects
    this.damageNumbers = [];
    this.screenShake = { active: false, intensity: 0, duration: 0, timeLeft: 0 };
    this.screenFlash = { active: false, color: '#ffffff', alpha: 0, duration: 0, timeLeft: 0 };
    this.floatingTexts = [];
  }

  /**
   * Update all effects
   */
  update(deltaTime) {
    // Update damage numbers
    this.damageNumbers = this.damageNumbers.filter(dmg => {
      dmg.timeLeft -= deltaTime;
      dmg.y -= 60 * deltaTime; // Float upward
      dmg.alpha = dmg.timeLeft / dmg.duration;
      return dmg.timeLeft > 0;
    });

    // Update screen shake
    if (this.screenShake.active) {
      this.screenShake.timeLeft -= deltaTime;
      if (this.screenShake.timeLeft <= 0) {
        this.screenShake.active = false;
      }
    }

    // Update screen flash
    if (this.screenFlash.active) {
      this.screenFlash.timeLeft -= deltaTime;
      this.screenFlash.alpha = (this.screenFlash.timeLeft / this.screenFlash.duration) * 0.5;
      if (this.screenFlash.timeLeft <= 0) {
        this.screenFlash.active = false;
      }
    }

    // Update floating texts
    this.floatingTexts = this.floatingTexts.filter(text => {
      text.timeLeft -= deltaTime;
      text.y -= 80 * deltaTime; // Float upward
      text.scale = Math.min(1.5, text.scale + deltaTime * 2);
      text.alpha = text.timeLeft / text.duration;
      return text.timeLeft > 0;
    });
  }

  /**
   * Render all effects
   */
  render(ctx) {
    ctx.save();

    // Apply screen shake
    if (this.screenShake.active) {
      const shakeX = (Math.random() - 0.5) * this.screenShake.intensity;
      const shakeY = (Math.random() - 0.5) * this.screenShake.intensity;
      ctx.translate(shakeX, shakeY);
    }

    // Screen flash
    if (this.screenFlash.active) {
      ctx.save();
      ctx.globalAlpha = this.screenFlash.alpha;
      ctx.fillStyle = this.screenFlash.color;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
    }

    // Damage numbers
    this.damageNumbers.forEach(dmg => {
      this.renderDamageNumber(ctx, dmg);
    });

    // Floating texts
    this.floatingTexts.forEach(text => {
      this.renderFloatingText(ctx, text);
    });

    ctx.restore();
  }

  /**
   * Render damage number
   */
  renderDamageNumber(ctx, dmg) {
    ctx.save();
    ctx.globalAlpha = dmg.alpha;

    // Shadow
    ctx.font = dmg.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(dmg.text, dmg.x + 2, dmg.y + 2);

    // Text
    ctx.fillStyle = dmg.color;
    ctx.fillText(dmg.text, dmg.x, dmg.y);

    ctx.restore();
  }

  /**
   * Render floating text
   */
  renderFloatingText(ctx, text) {
    ctx.save();
    ctx.globalAlpha = text.alpha;
    ctx.translate(text.x, text.y);
    ctx.scale(text.scale, text.scale);

    // Shadow
    ctx.font = text.font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(text.text, 2, 2);

    // Text
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, 0, 0);

    ctx.restore();
  }

  /**
   * Show damage number at position
   */
  showDamage(x, y, damage, isPlayer = false) {
    this.damageNumbers.push({
      x: x,
      y: y,
      text: `-${damage}`,
      color: isPlayer ? '#ff4444' : '#ffffff',
      font: 'bold 24px Arial',
      duration: 1.0,
      timeLeft: 1.0,
      alpha: 1.0
    });
  }

  /**
   * Show score gain animation
   */
  showScoreGain(x, y, score) {
    this.floatingTexts.push({
      x: x,
      y: y,
      text: `+${score}`,
      color: '#ffdd00',
      font: 'bold 28px Arial',
      duration: 1.5,
      timeLeft: 1.5,
      alpha: 1.0,
      scale: 0.5
    });
  }

  /**
   * Show level up effect
   */
  showLevelUp() {
    const x = this.width / 2;
    const y = this.height / 2 - 50;

    this.floatingTexts.push({
      x: x,
      y: y,
      text: 'LEVEL UP!',
      color: '#00ff00',
      font: 'bold 48px Arial',
      duration: 2.0,
      timeLeft: 2.0,
      alpha: 1.0,
      scale: 0.5
    });

    // Flash effect
    this.triggerFlash('#00ff00', 0.5);

    // Screen shake
    this.triggerShake(10, 0.3);
  }

  /**
   * Show item collected effect
   */
  showItemCollected(x, y, itemName) {
    this.floatingTexts.push({
      x: x,
      y: y,
      text: itemName,
      color: '#00ffff',
      font: 'bold 20px Arial',
      duration: 1.5,
      timeLeft: 1.5,
      alpha: 1.0,
      scale: 0.8
    });
  }

  /**
   * Show power-up effect
   */
  showPowerUp(type) {
    const x = this.width / 2;
    const y = this.height / 2 - 100;

    let text = '';
    let color = '#ffaa00';

    if (type === 'weapon') {
      text = 'ATTACK UP!';
      color = '#ff8800';
    } else if (type === 'magic') {
      text = 'MAGIC UP!';
      color = '#aa00ff';
    }

    this.floatingTexts.push({
      x: x,
      y: y,
      text: text,
      color: color,
      font: 'bold 36px Arial',
      duration: 2.0,
      timeLeft: 2.0,
      alpha: 1.0,
      scale: 0.5
    });

    // Flash effect
    this.triggerFlash(color, 0.3);
  }

  /**
   * Show combo effect
   */
  showCombo(combo) {
    if (combo < 10) return; // Only show for significant combos

    const x = this.width / 2;
    const y = this.height / 2 - 150;

    this.floatingTexts.push({
      x: x,
      y: y,
      text: `${combo} COMBO!`,
      color: '#ffdd00',
      font: 'bold 32px Arial',
      duration: 1.0,
      timeLeft: 1.0,
      alpha: 1.0,
      scale: 1.0
    });
  }

  /**
   * Trigger screen shake
   */
  triggerShake(intensity, duration) {
    this.screenShake = {
      active: true,
      intensity: intensity,
      duration: duration,
      timeLeft: duration
    };
  }

  /**
   * Trigger screen flash
   */
  triggerFlash(color, duration) {
    this.screenFlash = {
      active: true,
      color: color,
      duration: duration,
      timeLeft: duration,
      alpha: 0.5
    };
  }

  /**
   * Trigger damage flash (red)
   */
  triggerDamageFlash() {
    this.triggerFlash('#ff0000', 0.2);
    this.triggerShake(8, 0.2);
  }

  /**
   * Show stage clear effect
   */
  showStageClear(stage) {
    const x = this.width / 2;
    const y = this.height / 2;

    this.floatingTexts.push({
      x: x,
      y: y,
      text: `STAGE ${stage} CLEAR!`,
      color: '#00ff00',
      font: 'bold 56px Arial',
      duration: 2.5,
      timeLeft: 2.5,
      alpha: 1.0,
      scale: 0.3
    });

    // Flash effect
    this.triggerFlash('#00ff00', 0.5);
  }

  /**
   * Show boss warning
   */
  showBossWarning() {
    const x = this.width / 2;
    const y = this.height / 2;

    this.floatingTexts.push({
      x: x,
      y: y,
      text: '⚠ BOSS APPROACHING ⚠',
      color: '#ff0000',
      font: 'bold 48px Arial',
      duration: 3.0,
      timeLeft: 3.0,
      alpha: 1.0,
      scale: 0.5
    });

    // Red flash
    this.triggerFlash('#ff0000', 0.8);

    // Heavy shake
    this.triggerShake(15, 0.5);
  }

  /**
   * Clear all effects
   */
  clear() {
    this.damageNumbers = [];
    this.floatingTexts = [];
    this.screenShake.active = false;
    this.screenFlash.active = false;
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}
