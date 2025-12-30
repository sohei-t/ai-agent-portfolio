/**
 * GameOverScreen.js - Game over screen
 * Features: Final score, high score, continue (3x), restart, return to menu
 */
export class GameOverScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Button configuration
    this.buttons = {
      continue: {
        x: this.width / 2 - 100,
        y: this.height / 2 + 30,
        width: 200,
        height: 50,
        text: 'CONTINUE',
        hovered: false,
        enabled: true
      },
      menu: {
        x: this.width / 2 - 100,
        y: this.height / 2 + 100,
        width: 200,
        height: 50,
        text: 'RETURN TO MENU',
        hovered: false,
        enabled: true
      }
    };

    // Animation
    this.fadeAlpha = 0;
    this.fadeSpeed = 0.5;

    // Game over display timer
    this.displayTimer = 5.0; // 5 seconds display time
    this.canInteract = false; // Can't interact during display

    // High score
    this.highScore = this.loadHighScore();
    this.newHighScore = false;
  }

  /**
   * Update game over screen
   */
  update(deltaTime, gameState) {
    // Fade in animation
    if (this.fadeAlpha < 1.0) {
      this.fadeAlpha = Math.min(1.0, this.fadeAlpha + this.fadeSpeed * deltaTime);
    }

    // Update display timer
    if (this.displayTimer > 0) {
      this.displayTimer -= deltaTime;
      if (this.displayTimer <= 0) {
        this.canInteract = true;
      }
    }

    // Update continue button state
    this.buttons.continue.enabled = gameState.continuesRemaining > 0;
    this.buttons.continue.text = gameState.continuesRemaining > 0
      ? `CONTINUE (${gameState.continuesRemaining} left)`
      : 'NO CONTINUES';

    // Check for new high score
    if (gameState.score > this.highScore) {
      this.highScore = gameState.score;
      this.newHighScore = true;
      this.saveHighScore(this.highScore);
    }
  }

  /**
   * Render game over screen
   */
  render(ctx, gameState) {
    ctx.save();
    ctx.globalAlpha = this.fadeAlpha;

    // Dark background
    ctx.fillStyle = 'rgba(10, 10, 30, 0.9)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Game Over box
    const boxWidth = 500;
    const boxHeight = 400;
    const boxX = (this.width - boxWidth) / 2;
    const boxY = (this.height - boxHeight) / 2;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Title
    ctx.font = 'bold 56px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff4444';
    ctx.fillText('GAME OVER', this.width / 2, boxY + 60);

    // Scores
    this.renderScores(ctx, gameState, boxY + 120);

    // Buttons
    this.renderButtons(ctx);

    // New high score notification
    if (this.newHighScore) {
      this.renderNewHighScore(ctx, boxY + boxHeight - 30);
    }

    ctx.restore();
  }

  /**
   * Render score information
   */
  renderScores(ctx, gameState, startY) {
    // Final score
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('FINAL SCORE', this.width / 2, startY);

    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffdd00';
    ctx.fillText(gameState.score.toString().padStart(8, '0'), this.width / 2, startY + 50);

    // High score
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('HIGH SCORE', this.width / 2, startY + 110);

    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = this.newHighScore ? '#00ff00' : '#ffdd00';
    ctx.fillText(this.highScore.toString().padStart(8, '0'), this.width / 2, startY + 145);

    // Stage reached
    ctx.font = '18px Arial';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText(`Stage Reached: ${gameState.currentStage} / ${gameState.totalStages}`, this.width / 2, startY + 190);
  }

  /**
   * Render menu buttons
   */
  renderButtons(ctx) {
    Object.values(this.buttons).forEach(button => {
      const enabled = button.enabled !== false;

      // Button background
      let bgColor = '#444444';
      if (!enabled) {
        bgColor = '#222222';
      } else if (button.hovered) {
        bgColor = '#ff8800';
      }

      ctx.fillStyle = bgColor;
      ctx.fillRect(button.x, button.y, button.width, button.height);

      // Button border
      ctx.strokeStyle = enabled && button.hovered ? '#ffaa00' : '#888888';
      ctx.lineWidth = 3;
      ctx.strokeRect(button.x, button.y, button.width, button.height);

      // Button text
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = enabled ? '#ffffff' : '#666666';
      ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });
  }

  /**
   * Render new high score notification
   */
  renderNewHighScore(ctx, y) {
    const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;

    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('★ NEW HIGH SCORE! ★', this.width / 2, y);
    ctx.restore();
  }

  /**
   * Handle mouse/touch input
   */
  handleInput(x, y, type) {
    if (type === 'move') {
      // Update hover state
      this.buttons.continue.hovered = this.buttons.continue.enabled &&
                                       this.isPointInButton(x, y, this.buttons.continue);
      this.buttons.menu.hovered = this.isPointInButton(x, y, this.buttons.menu);
    } else if (type === 'click') {
      if (this.buttons.continue.enabled && this.isPointInButton(x, y, this.buttons.continue)) {
        return 'continue';
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
   * Load high score from localStorage
   */
  loadHighScore() {
    try {
      const saved = localStorage.getItem('dungeonBattles_highScore');
      return saved ? parseInt(saved) : 0;
    } catch (e) {
      return 0;
    }
  }

  /**
   * Save high score to localStorage
   */
  saveHighScore(score) {
    try {
      localStorage.setItem('dungeonBattles_highScore', score.toString());
    } catch (e) {
      console.error('Failed to save high score:', e);
    }
  }

  /**
   * Reset screen state
   */
  reset() {
    this.fadeAlpha = 0;
    this.newHighScore = false;
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;

    // Reposition buttons
    this.buttons.continue.x = width / 2 - 100;
    this.buttons.continue.y = height / 2 + 30;
    this.buttons.menu.x = width / 2 - 100;
    this.buttons.menu.y = height / 2 + 100;
  }
}
