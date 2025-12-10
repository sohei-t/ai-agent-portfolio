/**
 * HUD.js
 * Heads-Up Display for in-game information
 * Displays: Score, Lives, Wave, Active Power-ups with timers
 */


class HUD {
  constructor(canvas, ctx) {
    this.canvas = canvas || { width: 800, height: 600 };
    this.ctx = ctx;
    this.score = 0;
    this.lives = Config.player.maxLives;
    this.wave = 1;
    this.activePowerUps = new Map(); // Map of { type: { endTime, icon } }
    this.animationFrame = 0;

    // Cyberpunk neon colors
    this.colors = {
      primary: Config.colors.primary,      // cyan
      secondary: Config.colors.secondary,   // magenta
      accent: Config.colors.accent,         // yellow
      background: Config.colors.background, // dark blue/black
      warning: '#ff0000'                    // red for low health
    };

    // Power-up colors
    this.powerUpColors = {
      RAPID_FIRE: '#00ffff',    // cyan
      SHIELD: '#ff00ff',        // magenta
      MULTI_SHOT: '#ffff00'     // yellow
    };

    // Power-up icons (simple symbols)
    this.powerUpIcons = {
      RAPID_FIRE: '⚡',
      SHIELD: '🛡',
      MULTI_SHOT: '✦'
    };
  }

  update(deltaTime, gameState) {
    this.animationFrame += deltaTime;

    // Update from game state
    if (gameState) {
      this.score = gameState.score || this.score;
      this.lives = gameState.lives !== undefined ? gameState.lives : this.lives;
      this.wave = gameState.wave || this.wave;

      // Update active power-ups
      if (gameState.activePowerUps) {
        this.activePowerUps = new Map(gameState.activePowerUps);
      }
    }

    // Remove expired power-ups
    const now = Date.now();
    for (const [type, data] of this.activePowerUps) {
      if (data.endTime <= now) {
        this.activePowerUps.delete(type);
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const width = this.canvas.width;

    // Top bar background with gradient
    this.renderTopBar();

    // Left side: Score and Wave
    this.renderScore(20, 30);
    this.renderWave(20, 60);

    // Right side: Lives
    this.renderLives(width - 20, 45);

    // Bottom: Active Power-ups
    this.renderPowerUps();
  }

  renderTopBar() {
    const ctx = this.ctx;
    const width = this.canvas.width;

    // Semi-transparent dark background
    ctx.save();
    ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
    ctx.fillRect(0, 0, width, 80);

    // Top border with glow
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, this.colors.primary);
    gradient.addColorStop(0.5, this.colors.secondary);
    gradient.addColorStop(1, this.colors.accent);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.colors.primary;
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(width, 80);
    ctx.stroke();

    ctx.restore();
  }

  renderScore(x, y) {
    const ctx = this.ctx;

    ctx.save();
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Label
    ctx.fillStyle = this.colors.primary;
    ctx.globalAlpha = 0.8;
    ctx.fillText('SCORE:', x, y);

    // Value with glow
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.colors.accent;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.colors.accent;
    ctx.fillText(this.score.toLocaleString(), x + 90, y);

    ctx.restore();
  }

  renderWave(x, y) {
    const ctx = this.ctx;

    ctx.save();
    ctx.font = '16px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Label
    ctx.fillStyle = this.colors.secondary;
    ctx.globalAlpha = 0.8;
    ctx.fillText('WAVE:', x, y);

    // Value with pulsing effect
    const pulse = Math.sin(this.animationFrame * 0.003) * 0.2 + 0.8;
    ctx.globalAlpha = pulse;
    ctx.fillStyle = this.colors.secondary;
    ctx.shadowBlur = 8 * pulse;
    ctx.shadowColor = this.colors.secondary;
    ctx.fillText(this.wave.toString(), x + 70, y);

    ctx.restore();
  }

  renderLives(x, y) {
    const ctx = this.ctx;
    const heartSize = 20;
    const spacing = 30;

    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // Label
    ctx.font = '16px monospace';
    ctx.fillStyle = this.colors.primary;
    ctx.globalAlpha = 0.8;
    ctx.fillText('LIVES:', x - (this.lives * spacing) - 10, y);

    // Draw hearts/lives
    for (let i = 0; i < Config.player.maxLives; i++) {
      const heartX = x - (Config.player.maxLives - i - 1) * spacing;
      const isActive = i < this.lives;

      // Warning pulse for last life
      let pulse = 1;
      if (this.lives === 1 && isActive) {
        pulse = Math.sin(this.animationFrame * 0.01) * 0.3 + 0.7;
      }

      if (isActive) {
        // Active life with glow
        ctx.save();
        ctx.fillStyle = this.lives === 1 ? this.colors.warning : this.colors.accent;
        ctx.shadowBlur = 15 * pulse;
        ctx.shadowColor = this.lives === 1 ? this.colors.warning : this.colors.accent;
        ctx.globalAlpha = pulse;

        // Heart shape (simplified as triangle for game aesthetic)
        this.drawShip(heartX, y, heartSize);

        ctx.restore();
      } else {
        // Inactive life
        ctx.save();
        ctx.strokeStyle = this.colors.primary;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;

        this.drawShip(heartX, y, heartSize, true);

        ctx.restore();
      }
    }

    ctx.restore();
  }

  drawShip(x, y, size, outline = false) {
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x, y + size / 4);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();

    if (outline) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
  }

  renderPowerUps() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const bottomY = height - 60;
    const startX = width / 2 - (this.activePowerUps.size * 100) / 2;

    if (this.activePowerUps.size === 0) return;

    ctx.save();

    // Background bar
    ctx.fillStyle = 'rgba(10, 10, 26, 0.8)';
    ctx.fillRect(0, bottomY - 20, width, 80);

    // Title
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.colors.primary;
    ctx.globalAlpha = 0.7;
    ctx.fillText('ACTIVE POWER-UPS', width / 2, bottomY - 5);

    // Draw each power-up
    let index = 0;
    const now = Date.now();

    for (const [type, data] of this.activePowerUps) {
      const x = startX + index * 100;
      const y = bottomY + 20;

      // Calculate time remaining
      const timeRemaining = Math.max(0, data.endTime - now);
      const progress = timeRemaining / Config.powerUps.duration;

      // Power-up box
      this.renderPowerUpBox(x, y, type, progress);

      index++;
    }

    ctx.restore();
  }

  renderPowerUpBox(x, y, type, progress) {
    const ctx = this.ctx;
    const boxSize = 80;
    const color = this.powerUpColors[type] || this.colors.primary;

    ctx.save();

    // Box outline with glow
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.globalAlpha = progress * 0.5 + 0.5; // Fade as time runs out

    ctx.strokeRect(x - boxSize / 2, y - boxSize / 2, boxSize, boxSize);

    // Icon
    ctx.font = '32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.shadowBlur = 15;

    const icon = this.powerUpIcons[type] || '?';
    ctx.fillText(icon, x, y - 5);

    // Name
    ctx.font = '10px monospace';
    ctx.fillStyle = color;
    ctx.shadowBlur = 5;
    const name = type.replace('_', ' ');
    ctx.fillText(name, x, y + 25);

    // Progress bar
    const barWidth = boxSize - 10;
    const barHeight = 4;
    const barX = x - barWidth / 2;
    const barY = y + boxSize / 2 - 10;

    // Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.shadowBlur = 0;
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Progress
    ctx.fillStyle = color;
    ctx.shadowBlur = 5;
    ctx.shadowColor = color;
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);

    // Timer text
    const secondsLeft = Math.ceil((progress * Config.powerUps.duration) / 1000);
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = color;
    ctx.shadowBlur = 8;
    ctx.fillText(`${secondsLeft}s`, x, y - 28);

    ctx.restore();
  }

  // Public methods to update HUD state
  setScore(score) {
    this.score = score;
  }

  setLives(lives) {
    this.lives = lives;
  }

  setWave(wave) {
    this.wave = wave;
  }

  addPowerUp(type, duration) {
    this.activePowerUps.set(type, {
      endTime: Date.now() + duration
    });
  }

  removePowerUp(type) {
    this.activePowerUps.delete(type);
  }

  clearPowerUps() {
    this.activePowerUps.clear();
  }

  reset() {
    this.score = 0;
    this.lives = Config.player.maxLives;
    this.wave = 1;
    this.activePowerUps.clear();
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.HUD = HUD;
}
