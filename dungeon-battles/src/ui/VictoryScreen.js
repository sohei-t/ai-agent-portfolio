/**
 * VictoryScreen.js - Victory/Game Clear screen
 * Features: Final score, clear time, bonuses, high score
 */
export class VictoryScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Button configuration
    this.buttons = {
      menu: {
        x: this.width / 2 - 100,
        y: this.height / 2 + 180,
        width: 200,
        height: 50,
        text: 'RETURN TO MENU',
        hovered: false
      }
    };

    // Animation
    this.fadeAlpha = 0;
    this.fadeSpeed = 0.5;
    this.starScale = 0;

    // High score
    this.highScore = this.loadHighScore();
    this.newHighScore = false;
  }

  /**
   * Update victory screen
   */
  update(deltaTime, gameState) {
    // Fade in animation
    if (this.fadeAlpha < 1.0) {
      this.fadeAlpha = Math.min(1.0, this.fadeAlpha + this.fadeSpeed * deltaTime);
    }

    // Star scale animation
    if (this.starScale < 1.0) {
      this.starScale = Math.min(1.0, this.starScale + deltaTime * 2);
    }

    // Check for new high score
    if (gameState.score > this.highScore) {
      this.highScore = gameState.score;
      this.newHighScore = true;
      this.saveHighScore(this.highScore);
    }
  }

  /**
   * Render victory screen
   */
  render(ctx, gameState) {
    ctx.save();
    ctx.globalAlpha = this.fadeAlpha;

    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#0a0a1e');
    gradient.addColorStop(0.5, '#1a1a3e');
    gradient.addColorStop(1, '#0a0a1e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    // Victory box
    const boxWidth = 600;
    const boxHeight = 500;
    const boxX = (this.width - boxWidth) / 2;
    const boxY = (this.height - boxHeight) / 2;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#ffdd00';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Title with stars
    this.renderTitle(ctx, boxY + 60);

    // Scores and bonuses
    this.renderScores(ctx, gameState, boxY + 140);

    // Buttons
    this.renderButtons(ctx);

    // New high score notification
    if (this.newHighScore) {
      this.renderNewHighScore(ctx, boxY + boxHeight - 60);
    }

    // Congratulations message
    this.renderCongratulations(ctx, boxY + boxHeight - 30);

    ctx.restore();
  }

  /**
   * Render title with animated stars
   */
  renderTitle(ctx, y) {
    // Stars
    ctx.save();
    ctx.translate(this.width / 2, y);
    ctx.scale(this.starScale, this.starScale);

    const starSize = 30;
    ctx.fillStyle = '#ffdd00';
    this.drawStar(ctx, -150, 0, starSize);
    this.drawStar(ctx, 150, 0, starSize);

    ctx.restore();

    // Title
    ctx.font = 'bold 56px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Shadow
    ctx.fillStyle = '#000000';
    ctx.fillText('VICTORY!', this.width / 2 + 3, y + 3);

    // Gradient text
    const gradient = ctx.createLinearGradient(0, y - 28, 0, y + 28);
    gradient.addColorStop(0, '#ffdd00');
    gradient.addColorStop(0.5, '#ffaa00');
    gradient.addColorStop(1, '#ff8800');

    ctx.fillStyle = gradient;
    ctx.fillText('VICTORY!', this.width / 2, y);
  }

  /**
   * Draw a star shape
   */
  drawStar(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();

    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const radius = i % 2 === 0 ? size : size / 2;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /**
   * Render score information
   */
  renderScores(ctx, gameState, startY) {
    // Final score
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('FINAL SCORE', this.width / 2, startY);

    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffdd00';
    ctx.fillText(gameState.score.toString().padStart(8, '0'), this.width / 2, startY + 45);

    // Bonuses breakdown
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaaaaa';

    const bonusX = this.width / 2 - 200;
    let bonusY = startY + 100;

    const bonuses = [
      { label: 'Base Score', value: gameState.baseScore || 0 },
      { label: 'No Damage Bonus', value: gameState.noDamageBonus || 0 },
      { label: 'Boss Bonus', value: gameState.bossBonus || 0 },
      { label: 'Combo Bonus', value: gameState.comboBonus || 0 }
    ];

    bonuses.forEach(bonus => {
      ctx.fillStyle = '#aaaaaa';
      ctx.fillText(bonus.label, bonusX, bonusY);

      ctx.textAlign = 'right';
      ctx.fillStyle = bonus.value > 0 ? '#00ff00' : '#666666';
      ctx.fillText(`+${bonus.value}`, bonusX + 400, bonusY);

      ctx.textAlign = 'left';
      bonusY += 30;
    });

    // High score
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('HIGH SCORE', this.width / 2, startY + 250);

    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = this.newHighScore ? '#00ff00' : '#ffdd00';
    ctx.fillText(this.highScore.toString().padStart(8, '0'), this.width / 2, startY + 285);
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
   * Render new high score notification
   */
  renderNewHighScore(ctx, y) {
    const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;

    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('★★★ NEW HIGH SCORE! ★★★', this.width / 2, y);
    ctx.restore();
  }

  /**
   * Render congratulations message
   */
  renderCongratulations(ctx, y) {
    ctx.font = 'italic 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('You have conquered the dungeon!', this.width / 2, y);
  }

  /**
   * Handle mouse/touch input
   */
  handleInput(x, y, type) {
    if (type === 'move') {
      // Update hover state
      this.buttons.menu.hovered = this.isPointInButton(x, y, this.buttons.menu);
    } else if (type === 'click') {
      if (this.isPointInButton(x, y, this.buttons.menu)) {
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
    this.starScale = 0;
    this.newHighScore = false;
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;

    // Reposition buttons
    this.buttons.menu.x = width / 2 - 100;
    this.buttons.menu.y = height / 2 + 180;
  }
}
