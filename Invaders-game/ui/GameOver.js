/**
 * GameOver.js
 * Game Over and Victory screens with cyberpunk aesthetic
 */


class GameOver {
  constructor(canvas, ctx) {
    this.canvas = canvas || { width: 800, height: 600 };
    this.ctx = ctx;
    this.isVictory = false;
    this.score = 0;
    this.wave = 1;
    this.selectedOption = 0;
    this.options = ['RESTART', 'MAIN MENU'];
    this.animationFrame = 0;
    this.particles = [];
    this.highScoreAchieved = false;

    // Cyberpunk neon colors
    this.colors = {
      primary: Config.colors.primary,      // cyan
      secondary: Config.colors.secondary,   // magenta
      accent: Config.colors.accent,         // yellow
      background: Config.colors.background, // dark blue/black
      success: '#00ff00',                   // green for victory
      failure: '#ff0000'                    // red for defeat
    };

    this.initParticles();
  }

  initParticles() {
    // Create floating particles for background effect
    this.particles = [];
    const width = this.canvas ? this.canvas.width : 800;
    const height = this.canvas ? this.canvas.height : 600;
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  setGameOver(isVictory, score, wave) {
    this.isVictory = isVictory;
    this.score = score;
    this.wave = wave;
    this.selectedOption = 0;
    this.animationFrame = 0;

    // Check if this is a high score
    this.highScoreAchieved = this.checkHighScore(score);

    // Save high score
    if (this.highScoreAchieved) {
      this.saveHighScore(score);
    }

    // Reset particles
    this.initParticles();
  }

  handleInput(key) {
    // Navigation
    if (key === 'ArrowUp' || key === 'w') {
      this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
    } else if (key === 'ArrowDown' || key === 's') {
      this.selectedOption = (this.selectedOption + 1) % this.options.length;
    } else if (key === 'Enter' || key === ' ') {
      // Execute selected option
      return this.selectedOption === 0 ? 'RESTART' : 'MENU';
    }
    return null;
  }

  handleTouch(x, y) {
    // Calculate menu item positions
    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height / 2 + 150;
    const spacing = 70;

    for (let i = 0; i < this.options.length; i++) {
      const itemY = startY + i * spacing;
      const itemHeight = 60;

      if (Math.abs(y - itemY) < itemHeight / 2) {
        return i === 0 ? 'RESTART' : 'MENU';
      }
    }
    return null;
  }

  update(inputHandler) {
    this.animationFrame++;

    // Update particles
    for (const particle of this.particles) {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    }

    // Handle input
    if (inputHandler) {
      if (inputHandler.isUp() && !this.lastUpKey) {
        this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
      }
      if (inputHandler.isDown() && !this.lastDownKey) {
        this.selectedOption = (this.selectedOption + 1) % this.options.length;
      }

      this.lastUpKey = inputHandler.isUp();
      this.lastDownKey = inputHandler.isDown();
    }
  }

  getSelectedOption() {
    return this.options[this.selectedOption];
  }

  render() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Clear canvas with dark background
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, width, height);

    // Render background particles
    this.renderParticles();

    // Render appropriate screen
    if (this.isVictory) {
      this.renderVictory();
    } else {
      this.renderDefeat();
    }

    // Render stats
    this.renderStats();

    // Render menu options
    this.renderMenuOptions();
  }

  renderParticles() {
    const ctx = this.ctx;

    ctx.save();
    for (const particle of this.particles) {
      const color = this.isVictory ? this.colors.success : this.colors.failure;
      ctx.fillStyle = color;
      ctx.globalAlpha = particle.opacity * 0.5;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  renderVictory() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const titleY = 120;

    // Pulsing glow effect
    const glowIntensity = Math.sin(this.animationFrame * 0.004) * 0.3 + 0.7;

    // Victory text
    ctx.save();
    ctx.font = 'bold 80px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Neon glow effect
    ctx.shadowBlur = 40 * glowIntensity;
    ctx.shadowColor = this.colors.success;
    ctx.fillStyle = this.colors.success;
    ctx.fillText('VICTORY!', centerX, titleY);
    ctx.restore();

    // Subtitle
    ctx.save();
    ctx.font = '24px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.colors.accent;
    ctx.fillText('// ALL WAVES CLEARED //', centerX, titleY + 60);
    ctx.restore();

    // Congratulations message
    if (this.highScoreAchieved) {
      ctx.save();
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      const pulse = Math.sin(this.animationFrame * 0.005) * 0.3 + 0.7;
      ctx.fillStyle = this.colors.accent;
      ctx.shadowBlur = 15 * pulse;
      ctx.shadowColor = this.colors.accent;
      ctx.globalAlpha = pulse;
      ctx.fillText('★ NEW HIGH SCORE! ★', centerX, titleY + 100);
      ctx.restore();
    }
  }

  renderDefeat() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const titleY = 120;

    // Pulsing glow effect
    const glowIntensity = Math.sin(this.animationFrame * 0.004) * 0.3 + 0.7;

    // Game Over text
    ctx.save();
    ctx.font = 'bold 80px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Neon glow effect
    ctx.shadowBlur = 40 * glowIntensity;
    ctx.shadowColor = this.colors.failure;
    ctx.fillStyle = this.colors.failure;
    ctx.fillText('GAME OVER', centerX, titleY);
    ctx.restore();

    // Subtitle
    ctx.save();
    ctx.font = '24px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.secondary;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.colors.secondary;
    ctx.fillText('// INVASION FAILED //', centerX, titleY + 60);
    ctx.restore();

    // High score message
    if (this.highScoreAchieved) {
      ctx.save();
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      const pulse = Math.sin(this.animationFrame * 0.005) * 0.3 + 0.7;
      ctx.fillStyle = this.colors.accent;
      ctx.shadowBlur = 15 * pulse;
      ctx.shadowColor = this.colors.accent;
      ctx.globalAlpha = pulse;
      ctx.fillText('★ NEW HIGH SCORE! ★', centerX, titleY + 100);
      ctx.restore();
    }
  }

  renderStats() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const statsY = this.canvas.height / 2 - 20;

    // Stats box
    ctx.save();
    ctx.strokeStyle = this.colors.primary;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.colors.primary;
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(centerX - 200, statsY - 40, 400, 120);
    ctx.restore();

    // Score
    ctx.save();
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.primary;
    ctx.globalAlpha = 0.8;
    ctx.fillText('FINAL SCORE', centerX, statsY);

    ctx.font = 'bold 48px monospace';
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.colors.accent;
    ctx.globalAlpha = 1;
    ctx.fillText(this.score.toLocaleString(), centerX, statsY + 40);
    ctx.restore();

    // Wave reached
    ctx.save();
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.secondary;
    ctx.fillText(`Wave ${this.wave} Reached`, centerX, statsY + 70);
    ctx.restore();
  }

  renderMenuOptions() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height / 2 + 150;
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

    // Footer
    ctx.save();
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.primary;
    ctx.globalAlpha = 0.5;
    ctx.fillText('USE ARROW KEYS OR TAP TO SELECT', centerX, this.canvas.height - 40);
    ctx.restore();
  }

  checkHighScore(score) {
    try {
      const scores = localStorage.getItem('spaceInvadersHighScores');
      if (!scores) return true; // First score is always a high score

      const highScores = JSON.parse(scores);
      if (highScores.length < 10) return true; // Top 10
      if (score > highScores[highScores.length - 1]) return true;
    } catch (e) {
      console.warn('Failed to check high score:', e);
    }
    return false;
  }

  saveHighScore(score) {
    try {
      const scores = localStorage.getItem('spaceInvadersHighScores');
      let highScores = scores ? JSON.parse(scores) : [];

      highScores.push(score);
      highScores.sort((a, b) => b - a);
      highScores = highScores.slice(0, 10); // Keep top 10

      localStorage.setItem('spaceInvadersHighScores', JSON.stringify(highScores));
    } catch (e) {
      console.warn('Failed to save high score:', e);
    }
  }

  reset() {
    this.isVictory = false;
    this.score = 0;
    this.wave = 1;
    this.selectedOption = 0;
    this.animationFrame = 0;
    this.highScoreAchieved = false;
    this.initParticles();
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.GameOver = GameOver;
}
