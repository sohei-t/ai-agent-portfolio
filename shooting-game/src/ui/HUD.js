/**
 * HUD - Heads-up display for game information
 */
export class HUD {
  constructor(renderer) {
    this.renderer = renderer;
  }

  /**
   * Render the HUD
   */
  render(gameState, player) {
    const ctx = this.renderer.getContext();
    const canvas = this.renderer.canvas;

    // Top panel
    this.renderTopPanel(ctx, canvas, gameState, player);

    // Power level indicator
    this.renderPowerLevel(ctx, player);

    // Bombs
    this.renderBombs(ctx, canvas, player);

    // FPS (debug)
    if (gameState.debug) {
      this.renderFPS(ctx, gameState.fps);
    }
  }

  /**
   * Render top panel with score and lives
   */
  renderTopPanel(ctx, canvas, gameState, player) {
    // Score
    this.renderer.renderText(
      `SCORE: ${gameState.score.toString().padStart(8, '0')}`,
      20,
      20,
      24,
      '#00FFFF',
      'left'
    );

    // High score
    this.renderer.renderText(
      `HIGH: ${gameState.highScore.toString().padStart(8, '0')}`,
      20,
      50,
      16,
      '#FFFF00',
      'left'
    );

    // Level
    this.renderer.renderText(
      `LEVEL ${gameState.level}`,
      canvas.width - 20,
      20,
      24,
      '#00FFFF',
      'right'
    );

    // Lives
    this.renderer.renderText(
      `LIVES:`,
      canvas.width - 20,
      50,
      16,
      '#FFFFFF',
      'right'
    );

    // Draw life icons
    for (let i = 0; i < player.health; i++) {
      this.drawLifeIcon(ctx, canvas.width - 30 - i * 25, 80);
    }
  }

  /**
   * Draw life icon
   */
  drawLifeIcon(ctx, x, y) {
    ctx.save();

    ctx.fillStyle = '#00FFFF';
    ctx.strokeStyle = '#00AAFF';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x - 5, y + 5);
    ctx.lineTo(x + 5, y + 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Render power level
   */
  renderPowerLevel(ctx, player) {
    const x = 20;
    const y = 90;

    this.renderer.renderText(
      `POWER:`,
      x,
      y,
      16,
      '#FFFFFF',
      'left'
    );

    // Draw power bars
    for (let i = 0; i < player.maxPower; i++) {
      const barX = x + 80 + i * 25;
      const barY = y;
      const filled = i < player.power;

      ctx.fillStyle = filled ? '#FF00FF' : '#333333';
      ctx.fillRect(barX, barY, 20, 20);

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(barX, barY, 20, 20);
    }
  }

  /**
   * Render bomb count
   */
  renderBombs(ctx, canvas, player) {
    const x = 20;
    const y = 120;

    this.renderer.renderText(
      `BOMBS:`,
      x,
      y,
      16,
      '#FFFFFF',
      'left'
    );

    // Draw bomb icons
    for (let i = 0; i < player.bombs; i++) {
      this.drawBombIcon(ctx, x + 80 + i * 25, y + 10);
    }
  }

  /**
   * Draw bomb icon
   */
  drawBombIcon(ctx, x, y) {
    ctx.save();

    ctx.fillStyle = '#FF6600';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Render FPS counter
   */
  renderFPS(ctx, fps) {
    this.renderer.renderText(
      `FPS: ${fps}`,
      this.renderer.width - 20,
      this.renderer.height - 30,
      16,
      fps >= 55 ? '#00FF00' : '#FF0000',
      'right'
    );
  }

  /**
   * Render combo counter
   */
  renderCombo(ctx, combo) {
    if (combo <= 1) return;

    const x = this.renderer.width / 2;
    const y = 100;

    this.renderer.renderText(
      `${combo} COMBO!`,
      x,
      y,
      32,
      '#FFFF00',
      'center'
    );
  }
}
