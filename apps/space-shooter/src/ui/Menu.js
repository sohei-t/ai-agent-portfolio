/**
 * Menu.js
 * Title screen with cyberpunk neon aesthetic
 */


class Menu {
  constructor(canvas, ctx) {
    this.canvas = canvas || { width: 800, height: 600 };
    this.ctx = ctx;
    this.selectedOption = 0;
    this.options = ['START', 'HOW TO PLAY', 'HIGH SCORE'];
    this.showHelp = false;
    this.showHighScore = false;
    this.animationFrame = 0;

    // Cyberpunk neon colors
    this.colors = {
      primary: Config.colors.primary,      // cyan
      secondary: Config.colors.secondary,   // magenta
      accent: Config.colors.accent,         // yellow
      background: Config.colors.background  // dark blue/black
    };
  }

  handleInput(key) {
    if (this.showHelp || this.showHighScore) {
      // Close help/high score screen
      if (key === 'Escape' || key === 'Enter') {
        this.showHelp = false;
        this.showHighScore = false;
      }
      return null;
    }

    // Navigation
    if (key === 'ArrowUp' || key === 'w') {
      this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
    } else if (key === 'ArrowDown' || key === 's') {
      this.selectedOption = (this.selectedOption + 1) % this.options.length;
    } else if (key === 'Enter' || key === ' ') {
      // Execute selected option
      if (this.selectedOption === 0) {
        return 'START';
      } else if (this.selectedOption === 1) {
        this.showHelp = true;
      } else if (this.selectedOption === 2) {
        this.showHighScore = true;
      }
    }
    return null;
  }

  handleTouch(x, y) {
    if (this.showHelp || this.showHighScore) {
      this.showHelp = false;
      this.showHighScore = false;
      return null;
    }

    // Calculate menu item positions
    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height / 2 + 50;
    const spacing = 70;

    for (let i = 0; i < this.options.length; i++) {
      const itemY = startY + i * spacing;
      const itemHeight = 60;

      if (Math.abs(y - itemY) < itemHeight / 2) {
        if (i === 0) {
          return 'START';
        } else if (i === 1) {
          this.showHelp = true;
        } else if (i === 2) {
          this.showHighScore = true;
        }
      }
    }
    return null;
  }

  update(inputHandler) {
    this.animationFrame++;

    // Handle keyboard input
    if (inputHandler) {
      if (inputHandler.isUp() && !this.lastUpKey) {
        this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
      }
      if (inputHandler.isDown() && !this.lastDownKey) {
        this.selectedOption = (this.selectedOption + 1) % this.options.length;
      }

      this.lastUpKey = inputHandler.isUp();
      this.lastDownKey = inputHandler.isDown();

      // Handle selection
      if (inputHandler.isSpace() || inputHandler.keys['Enter']) {
        const option = this.options[this.selectedOption];
        if (option === 'HOW TO PLAY') {
          this.showHelp = true;
        } else if (option === 'HIGH SCORE') {
          this.showHighScore = true;
        }
      }

      // Return from help/high score screens
      if ((this.showHelp || this.showHighScore) && inputHandler.keys['Escape']) {
        this.showHelp = false;
        this.showHighScore = false;
      }
    }
  }

  getSelectedOption() {
    if (this.showHelp || this.showHighScore) {
      return null;
    }
    return this.options[this.selectedOption];
  }

  render() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Clear canvas
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, width, height);

    if (this.showHelp) {
      this.renderHelp();
      return;
    }

    if (this.showHighScore) {
      this.renderHighScore();
      return;
    }

    // Animated background grid
    this.renderBackgroundGrid();

    // Title
    this.renderTitle();

    // Menu options
    this.renderMenuOptions();

    // Footer
    this.renderFooter();
  }

  renderBackgroundGrid() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    ctx.save();
    ctx.strokeStyle = this.colors.primary;
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  renderTitle() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const titleY = 150;

    // Pulsing glow effect
    const glowIntensity = Math.sin(this.animationFrame * 0.003) * 0.3 + 0.7;

    // Title text
    ctx.save();
    ctx.font = 'bold 72px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Neon glow effect
    ctx.shadowBlur = 30 * glowIntensity;
    ctx.shadowColor = this.colors.primary;
    ctx.fillStyle = this.colors.primary;
    ctx.fillText('SPACE', centerX, titleY - 40);

    ctx.shadowColor = this.colors.secondary;
    ctx.fillStyle = this.colors.secondary;
    ctx.fillText('INVADERS', centerX, titleY + 40);

    ctx.restore();

    // Subtitle
    ctx.save();
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.colors.accent;
    ctx.fillText('// NEON WARFARE //', centerX, titleY + 90);
    ctx.restore();
  }

  renderMenuOptions() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height / 2 + 50;
    const spacing = 70;

    ctx.font = '32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < this.options.length; i++) {
      const y = startY + i * spacing;
      const isSelected = i === this.selectedOption;

      ctx.save();

      if (isSelected) {
        // Selected item with glow
        const pulse = Math.sin(this.animationFrame * 0.005) * 0.3 + 0.7;
        ctx.shadowBlur = 20 * pulse;
        ctx.shadowColor = this.colors.accent;
        ctx.fillStyle = this.colors.accent;

        // Selection brackets
        ctx.fillText('>', centerX - 150, y);
        ctx.fillText('<', centerX + 150, y);
      } else {
        // Unselected item
        ctx.fillStyle = this.colors.primary;
        ctx.globalAlpha = 0.6;
      }

      ctx.fillText(this.options[i], centerX, y);
      ctx.restore();
    }
  }

  renderFooter() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const footerY = this.canvas.height - 40;

    ctx.save();
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.primary;
    ctx.globalAlpha = 0.5;
    ctx.fillText('USE ARROW KEYS OR TAP TO SELECT • ENTER TO CONFIRM', centerX, footerY);
    ctx.restore();
  }

  renderHelp() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;

    // Background overlay
    ctx.fillStyle = 'rgba(10, 10, 26, 0.95)';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.save();
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.secondary;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.colors.secondary;
    ctx.fillText('HOW TO PLAY', centerX, 80);
    ctx.restore();

    // Instructions
    const instructions = [
      { text: 'CONTROLS:', color: this.colors.accent, size: 24, y: 150 },
      { text: 'Arrow Keys / A-D: Move Left/Right', color: this.colors.primary, size: 18, y: 190 },
      { text: 'Spacebar / Tap: Shoot', color: this.colors.primary, size: 18, y: 220 },
      { text: 'P: Pause Game', color: this.colors.primary, size: 18, y: 250 },
      { text: '', color: '', size: 0, y: 280 },
      { text: 'OBJECTIVE:', color: this.colors.accent, size: 24, y: 300 },
      { text: 'Destroy all enemies before they reach the bottom', color: this.colors.primary, size: 18, y: 340 },
      { text: 'Collect power-ups for special abilities', color: this.colors.primary, size: 18, y: 370 },
      { text: 'Survive multiple waves with increasing difficulty', color: this.colors.primary, size: 18, y: 400 },
      { text: '', color: '', size: 0, y: 430 },
      { text: 'POWER-UPS:', color: this.colors.accent, size: 24, y: 450 },
      { text: 'Rapid Fire (Cyan): Faster shooting', color: '#00ffff', size: 18, y: 490 },
      { text: 'Shield (Magenta): Temporary invincibility', color: '#ff00ff', size: 18, y: 520 },
      { text: 'Multi-Shot (Yellow): Spread fire', color: '#ffff00', size: 18, y: 550 }
    ];

    instructions.forEach(inst => {
      if (inst.text) {
        ctx.save();
        ctx.font = `${inst.size}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillStyle = inst.color;
        if (inst.size > 20) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = inst.color;
        }
        ctx.fillText(inst.text, centerX, inst.y);
        ctx.restore();
      }
    });

    // Back instruction
    ctx.save();
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.colors.accent;
    ctx.fillText('PRESS ENTER OR TAP TO RETURN', centerX, height - 40);
    ctx.restore();
  }

  renderHighScore() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;

    // Background overlay
    ctx.fillStyle = 'rgba(10, 10, 26, 0.95)';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.save();
    ctx.font = 'bold 48px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.colors.accent;
    ctx.fillText('HIGH SCORES', centerX, 80);
    ctx.restore();

    // Get high scores from localStorage
    const highScores = this.getHighScores();

    // Display scores
    const startY = 150;
    const spacing = 50;

    ctx.font = '24px monospace';
    ctx.textAlign = 'center';

    for (let i = 0; i < highScores.length; i++) {
      const y = startY + i * spacing;
      const rank = i + 1;
      const score = highScores[i];

      ctx.save();

      // Rank with color gradient
      const rankColor = i === 0 ? this.colors.accent :
                       i === 1 ? this.colors.primary :
                       this.colors.secondary;

      ctx.fillStyle = rankColor;
      if (i < 3) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = rankColor;
      }

      ctx.textAlign = 'right';
      ctx.fillText(`${rank}.`, centerX - 100, y);

      ctx.textAlign = 'left';
      ctx.fillText(score.toLocaleString(), centerX - 80, y);

      ctx.restore();
    }

    // No scores message
    if (highScores.length === 0) {
      ctx.save();
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = this.colors.primary;
      ctx.globalAlpha = 0.6;
      ctx.fillText('No high scores yet!', centerX, 250);
      ctx.fillText('Be the first to set a record!', centerX, 290);
      ctx.restore();
    }

    // Back instruction
    ctx.save();
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.colors.accent;
    ctx.fillText('PRESS ENTER OR TAP TO RETURN', centerX, height - 40);
    ctx.restore();
  }

  getHighScores() {
    try {
      const scores = localStorage.getItem('spaceInvadersHighScores');
      if (scores) {
        return JSON.parse(scores).slice(0, 10); // Top 10
      }
    } catch (e) {
      console.warn('Failed to load high scores:', e);
    }
    return [];
  }

  saveScore(score) {
    try {
      const scores = this.getHighScores();
      scores.push(score);
      scores.sort((a, b) => b - a);
      localStorage.setItem('spaceInvadersHighScores', JSON.stringify(scores.slice(0, 10)));
    } catch (e) {
      console.warn('Failed to save high score:', e);
    }
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Menu = Menu;
}
