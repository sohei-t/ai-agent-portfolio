/**
 * PauseScreen.js - Pause menu overlay
 * Features: Resume, Settings, Return to Menu
 */
export class PauseScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Button configuration
    this.buttons = {
      resume: {
        x: this.width / 2 - 100,
        y: this.height / 2 - 30,
        width: 200,
        height: 50,
        text: 'RESUME',
        hovered: false
      },
      menu: {
        x: this.width / 2 - 100,
        y: this.height / 2 + 40,
        width: 200,
        height: 50,
        text: 'RETURN TO MENU',
        hovered: false
      }
    };
  }

  /**
   * Render pause screen overlay
   */
  render(ctx, gameState) {
    ctx.save();

    // Semi-transparent dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Pause box
    const boxWidth = 400;
    const boxHeight = 300;
    const boxX = (this.width - boxWidth) / 2;
    const boxY = (this.height - boxHeight) / 2;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Title
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffaa00';
    ctx.fillText('PAUSED', this.width / 2, boxY + 60);

    // Current stats
    this.renderStats(ctx, gameState, boxY + 110);

    // Buttons
    this.renderButtons(ctx);

    // Instruction
    ctx.font = 'italic 14px Arial';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Press F3 or ESC to resume', this.width / 2, boxY + boxHeight - 20);

    ctx.restore();
  }

  /**
   * Render current game stats
   */
  renderStats(ctx, gameState, startY) {
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    const stats = [
      `Stage: ${gameState.currentStage} / ${gameState.totalStages}`,
      `Score: ${gameState.score.toString().padStart(8, '0')}`,
      `HP: ${Math.ceil(gameState.player.hp)} / ${gameState.player.maxHP}`,
      `MP: ${Math.ceil(gameState.player.mp)} / ${gameState.player.maxMP}`
    ];

    stats.forEach((stat, index) => {
      ctx.fillText(stat, this.width / 2, startY + index * 25);
    });
  }

  /**
   * Render menu buttons
   */
  renderButtons(ctx) {
    Object.values(this.buttons).forEach(button => {
      // Button background
      ctx.fillStyle = button.hovered ? '#ff8800' : '#444444';
      ctx.fillRect(button.x, button.y, button.width, button.height);

      // Button border
      ctx.strokeStyle = button.hovered ? '#ffaa00' : '#888888';
      ctx.lineWidth = 3;
      ctx.strokeRect(button.x, button.y, button.width, button.height);

      // Button text
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });
  }

  /**
   * Handle mouse/touch input
   */
  handleInput(x, y, type) {
    if (type === 'move') {
      // Update hover state
      this.buttons.resume.hovered = this.isPointInButton(x, y, this.buttons.resume);
      this.buttons.menu.hovered = this.isPointInButton(x, y, this.buttons.menu);
    } else if (type === 'click') {
      if (this.isPointInButton(x, y, this.buttons.resume)) {
        return 'resume';
      } else if (this.isPointInButton(x, y, this.buttons.menu)) {
        return 'menu';
      }
    }

    return null;
  }

  /**
   * Check if point is inside button
   */
  isPointInButton(x, y, button) {
    return x >= button.x && x <= button.x + button.width &&
           y >= button.y && y <= button.y + button.height;
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;

    // Reposition buttons
    this.buttons.resume.x = width / 2 - 100;
    this.buttons.resume.y = height / 2 - 30;
    this.buttons.menu.x = width / 2 - 100;
    this.buttons.menu.y = height / 2 + 40;
  }
}
