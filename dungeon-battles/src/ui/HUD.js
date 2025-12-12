/**
 * HUD.js - Heads-Up Display for game information
 * Displays HP, MP, score, stage, attack/magic power, combo
 */
export class HUD {
  constructor(canvas) {
    if (!canvas) {
      throw new Error('HUD requires a canvas element');
    }
    this.canvas = canvas;
    this.width = canvas.width || 800;
    this.height = canvas.height || 600;

    // Font settings
    this.fontSize = 16;
    this.fontFamily = 'Arial, sans-serif';
    this.fontBold = 'bold 18px Arial, sans-serif';

    // Colors
    this.colors = {
      hp: '#00ff00',
      hpLow: '#ff4444',
      hpCritical: '#ff0000',
      mp: '#00aaff',
      mpLow: '#ffaa00',
      shield: '#00ffff',
      shieldLow: '#88ddff',
      text: '#ffffff',
      textShadow: '#000000',
      barBg: '#333333',
      barBorder: '#ffffff',
      combo: '#ffdd00'
    };

    // Bar dimensions
    this.barWidth = 200;
    this.barHeight = 20;
    this.barBorderWidth = 2;

    // Animation
    this.damageFlashTimer = 0;
    this.itemEffectTimer = 0;
    this.itemEffectText = '';
  }

  /**
   * Update HUD state
   */
  update(deltaTime, gameState) {
    // Update timers
    if (this.damageFlashTimer > 0) {
      this.damageFlashTimer -= deltaTime;
    }

    if (this.itemEffectTimer > 0) {
      this.itemEffectTimer -= deltaTime;
    }
  }

  /**
   * Trigger damage flash effect
   */
  triggerDamageFlash() {
    this.damageFlashTimer = 0.3; // 300ms flash
  }

  /**
   * Show item effect notification
   */
  showItemEffect(text, duration = 2.0) {
    this.itemEffectText = text;
    this.itemEffectTimer = duration;
  }

  /**
   * Render the HUD
   */
  render(ctx, gameState) {
    ctx.save();

    // Top-left: HP, MP, and Shield bars
    this.renderHealthBar(ctx, gameState.player);
    this.renderManaBar(ctx, gameState.player);
    this.renderShieldBar(ctx, gameState.player);

    // Top-right: Score
    this.renderScore(ctx, gameState.score);

    // Top-center: Stage indicator
    this.renderStage(ctx, gameState.currentStage, gameState.totalStages);

    // Bottom-left corner: Attack/Magic power
    this.renderStats(ctx, gameState.player);

    // Combo display (center-right)
    if (gameState.combo > 1) {
      this.renderCombo(ctx, gameState.combo);
    }

    // Item effect notification (center)
    if (this.itemEffectTimer > 0) {
      this.renderItemEffect(ctx);
    }

    // Damage flash overlay
    if (this.damageFlashTimer > 0) {
      this.renderDamageFlash(ctx);
    }

    ctx.restore();
  }

  /**
   * Render HP bar
   */
  renderHealthBar(ctx, player) {
    const x = 20;
    const y = 20;
    const hpPercent = Math.max(0, player.hp / player.maxHP);

    // Label
    this.renderText(ctx, 'HP', x, y - 5, this.fontBold, this.colors.text);

    // Bar background
    ctx.fillStyle = this.colors.barBg;
    ctx.fillRect(x, y, this.barWidth, this.barHeight);

    // HP bar (color changes based on HP level)
    let barColor = this.colors.hp;
    if (hpPercent < 0.25) {
      barColor = this.colors.hpCritical;
    } else if (hpPercent < 0.5) {
      barColor = this.colors.hpLow;
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, this.barWidth * hpPercent, this.barHeight);

    // Border
    ctx.strokeStyle = this.colors.barBorder;
    ctx.lineWidth = this.barBorderWidth;
    ctx.strokeRect(x, y, this.barWidth, this.barHeight);

    // HP text
    const hpText = `${Math.ceil(player.hp)} / ${player.maxHP}`;
    this.renderText(ctx, hpText, x + this.barWidth / 2, y + this.barHeight / 2 + 5, this.fontBold, this.colors.text, 'center');
  }

  /**
   * Render MP bar
   */
  renderManaBar(ctx, player) {
    const x = 20;
    const y = 50;
    const mpPercent = Math.max(0, player.mp / player.maxMP);

    // Label
    this.renderText(ctx, 'MP', x, y - 5, this.fontBold, this.colors.text);

    // Bar background
    ctx.fillStyle = this.colors.barBg;
    ctx.fillRect(x, y, this.barWidth, this.barHeight);

    // MP bar
    let barColor = this.colors.mp;
    if (mpPercent < 0.2) {
      barColor = this.colors.mpLow;
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, this.barWidth * mpPercent, this.barHeight);

    // Border
    ctx.strokeStyle = this.colors.barBorder;
    ctx.lineWidth = this.barBorderWidth;
    ctx.strokeRect(x, y, this.barWidth, this.barHeight);

    // MP text
    const mpText = `${Math.ceil(player.mp)} / ${player.maxMP}`;
    this.renderText(ctx, mpText, x + this.barWidth / 2, y + this.barHeight / 2 + 5, this.fontBold, this.colors.text, 'center');
  }

  /**
   * Render shield bar
   */
  renderShieldBar(ctx, player) {
    // Only render if player has shield
    if (!player.hasShield || player.shieldHP <= 0) {
      return;
    }

    const x = 20;
    const y = 80;
    const maxShieldHP = 30; // Shield max HP is 30 (3 normal hits)
    const shieldPercent = Math.max(0, player.shieldHP / maxShieldHP);

    // Label with shield emoji
    this.renderText(ctx, '🛡 SHIELD', x, y - 5, this.fontBold, this.colors.text);

    // Bar background
    ctx.fillStyle = this.colors.barBg;
    ctx.fillRect(x, y, this.barWidth, this.barHeight);

    // Shield bar (cyan color)
    let barColor = this.colors.shield;
    if (shieldPercent < 0.3) {
      barColor = this.colors.shieldLow;
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(x, y, this.barWidth * shieldPercent, this.barHeight);

    // Border with glow effect
    ctx.strokeStyle = this.colors.shield;
    ctx.lineWidth = this.barBorderWidth;
    ctx.shadowColor = this.colors.shield;
    ctx.shadowBlur = 5;
    ctx.strokeRect(x, y, this.barWidth, this.barHeight);
    ctx.shadowBlur = 0;

    // Shield HP text
    const shieldText = `${Math.ceil(player.shieldHP)} / ${maxShieldHP}`;
    this.renderText(ctx, shieldText, x + this.barWidth / 2, y + this.barHeight / 2 + 5, this.fontBold, this.colors.text, 'center');
  }

  /**
   * Render score
   */
  renderScore(ctx, score) {
    const x = this.width - 20;
    const y = 30;

    const scoreText = `SCORE: ${score.toString().padStart(8, '0')}`;
    this.renderText(ctx, scoreText, x, y, this.fontBold, this.colors.text, 'right');
  }

  /**
   * Render stage indicator
   */
  renderStage(ctx, currentStage, totalStages) {
    const x = this.width / 2;
    const y = 30;

    const stageText = `STAGE ${currentStage} / ${totalStages}`;
    this.renderText(ctx, stageText, x, y, this.fontBold, this.colors.text, 'center');
  }

  /**
   * Render player stats (attack/magic power)
   */
  renderStats(ctx, player) {
    const x = 20;
    const y = this.height - 60;

    const atkText = `ATK: ${player.attackPower}`;
    const magText = `MAG: ${player.magicPower}`;

    this.renderText(ctx, atkText, x, y, '14px ' + this.fontFamily, this.colors.text);
    this.renderText(ctx, magText, x, y + 20, '14px ' + this.fontFamily, this.colors.text);
  }

  /**
   * Render combo counter
   */
  renderCombo(ctx, combo) {
    const x = this.width - 100;
    const y = this.height / 2;

    // Combo background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(x - 10, y - 40, 100, 60);

    // Combo text
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = this.colors.combo;
    ctx.textAlign = 'center';
    ctx.fillText(`${combo}`, x + 40, y - 5);

    ctx.font = '16px Arial';
    ctx.fillStyle = this.colors.text;
    ctx.fillText('COMBO', x + 40, y + 15);
  }

  /**
   * Render item effect notification
   */
  renderItemEffect(ctx) {
    const x = this.width / 2;
    const y = this.height / 2 + 100;

    // Fade in/out effect
    const alpha = Math.min(1.0, this.itemEffectTimer / 0.5);

    ctx.save();
    ctx.globalAlpha = alpha;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x - 120, y - 30, 240, 50);

    // Text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffdd00';
    ctx.textAlign = 'center';
    ctx.fillText(this.itemEffectText, x, y);

    ctx.restore();
  }

  /**
   * Render damage flash overlay
   */
  renderDamageFlash(ctx) {
    const alpha = this.damageFlashTimer / 0.3;

    ctx.save();
    ctx.globalAlpha = alpha * 0.3;
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  /**
   * Render text with shadow for better visibility
   */
  renderText(ctx, text, x, y, font, color, align = 'left') {
    ctx.font = font || `${this.fontSize}px ${this.fontFamily}`;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';

    // Shadow
    ctx.fillStyle = this.colors.textShadow;
    ctx.fillText(text, x + 2, y + 2);

    // Text
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
  }
}
