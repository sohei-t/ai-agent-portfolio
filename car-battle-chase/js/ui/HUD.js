/**
 * HUD.js - Heads-Up Display
 * In-game UI overlay showing health, score, weapons, etc.
 */

export class HUD {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // HUD elements
    this.padding = 20;
    this.barHeight = 20;
    this.barWidth = 150;

    // Colors
    this.colors = {
      healthBg: 'rgba(255, 255, 255, 0.2)',
      healthFull: '#4CAF50',
      healthMid: '#FFC107',
      healthLow: '#F44336',
      scoreBg: 'rgba(0, 0, 0, 0.5)',
      scoreText: '#FFFFFF',
      weaponBg: 'rgba(255, 255, 255, 0.1)',
      weaponFill: '#4FC3F7',
      weaponEmpty: 'rgba(255, 255, 255, 0.3)'
    };

    // Animation
    this.scoreDisplay = 0;
    this.scorePulse = 0;
    this.healthPulse = 0;
    this.lastHealth = 100;

    // Mini-map
    this.miniMapEnabled = true;
    this.miniMapSize = 100;
    this.miniMapMargin = 15;
  }

  /**
   * Update HUD animations
   */
  update(deltaTime, player) {
    if (!player) return;

    // Animate score display
    const scoreDiff = player.score - this.scoreDisplay;
    if (Math.abs(scoreDiff) > 1) {
      this.scoreDisplay += scoreDiff * deltaTime * 5;
      this.scorePulse = 0.5;
    } else {
      this.scoreDisplay = player.score;
    }

    // Update score pulse
    if (this.scorePulse > 0) {
      this.scorePulse -= deltaTime * 2;
    }

    // Health change pulse
    if (player.health !== this.lastHealth) {
      if (player.health < this.lastHealth) {
        this.healthPulse = 0.5;
      }
      this.lastHealth = player.health;
    }

    if (this.healthPulse > 0) {
      this.healthPulse -= deltaTime * 3;
    }
  }

  /**
   * Render HUD
   */
  render(player, gameState = {}) {
    if (!player) return;

    this.renderHealthBar(player);
    this.renderScore(player);
    this.renderWeapons(player);
    this.renderEnemyCount(gameState);

    if (this.miniMapEnabled && gameState.enemies) {
      this.renderMiniMap(player, gameState);
    }
  }

  /**
   * Render health bar
   */
  renderHealthBar(player) {
    const x = this.padding;
    const y = this.padding;

    // Health percentage
    const healthPercent = player.getHealthPercent();

    // Determine color based on health
    let healthColor;
    if (healthPercent > 0.6) {
      healthColor = this.colors.healthFull;
    } else if (healthPercent > 0.3) {
      healthColor = this.colors.healthMid;
    } else {
      healthColor = this.colors.healthLow;
    }

    // Background
    this.ctx.fillStyle = this.colors.healthBg;
    this.roundRect(x, y, this.barWidth, this.barHeight, 5);

    // Health fill
    const fillWidth = this.barWidth * healthPercent;
    this.ctx.fillStyle = healthColor;
    if (fillWidth > 0) {
      this.roundRect(x, y, fillWidth, this.barHeight, 5);
    }

    // Pulse effect when taking damage
    if (this.healthPulse > 0) {
      this.ctx.fillStyle = `rgba(255, 0, 0, ${this.healthPulse * 0.3})`;
      this.roundRect(x, y, this.barWidth, this.barHeight, 5);
    }

    // Border
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, this.barWidth, this.barHeight, 5);
    this.ctx.stroke();

    // Health text
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 12px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      `${Math.ceil(player.health)}/${player.maxHealth}`,
      x + this.barWidth / 2,
      y + this.barHeight / 2
    );

    // Heart icon
    this.ctx.fillStyle = healthColor;
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('❤️', x + this.barWidth + 5, y + this.barHeight / 2);
  }

  /**
   * Render score
   */
  renderScore(player) {
    const x = this.canvas.width / 2;
    const y = this.padding + 5;

    // Score background
    this.ctx.fillStyle = this.colors.scoreBg;
    const scoreText = `SCORE: ${Math.floor(this.scoreDisplay)}`;
    this.ctx.font = 'bold 24px "Press Start 2P", monospace';
    const metrics = this.ctx.measureText(scoreText);
    const scoreWidth = metrics.width + 30;

    this.roundRect(x - scoreWidth / 2, y - 5, scoreWidth, 35, 5);

    // Score text with pulse
    const pulseScale = 1 + this.scorePulse * 0.2;
    this.ctx.save();
    this.ctx.translate(x, y + 12);
    this.ctx.scale(pulseScale, pulseScale);

    this.ctx.fillStyle = this.colors.scoreText;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(scoreText, 0, 0);

    this.ctx.restore();
  }

  /**
   * Render weapon indicators
   */
  renderWeapons(player) {
    const x = this.padding;
    const y = this.padding + this.barHeight + 15;
    const iconSize = 30;
    const spacing = 40;

    // Bomb indicator
    this.renderWeaponIndicator(
      x,
      y,
      '💣',
      player.bombs,
      player.maxBombs,
      player.getBombCooldownProgress()
    );

    // Missile indicator
    this.renderWeaponIndicator(
      x + spacing + 50,
      y,
      '🚀',
      player.missiles,
      player.maxMissiles,
      player.getMissileCooldownProgress()
    );
  }

  /**
   * Render single weapon indicator
   */
  renderWeaponIndicator(x, y, icon, count, max, cooldownProgress) {
    // Background
    this.ctx.fillStyle = this.colors.weaponBg;
    this.roundRect(x, y, 80, 30, 5);

    // Cooldown overlay
    if (cooldownProgress < 1) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      const overlayWidth = 80 * (1 - cooldownProgress);
      this.ctx.fillRect(x, y, overlayWidth, 30);
    }

    // Icon
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(icon, x + 5, y + 15);

    // Count
    this.ctx.font = 'bold 14px sans-serif';
    this.ctx.fillStyle = count > 0 ? '#FFFFFF' : '#666666';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`${count}/${max}`, x + 75, y + 15);
  }

  /**
   * Render enemy count
   */
  renderEnemyCount(gameState) {
    if (!gameState.enemies) return;

    const x = this.canvas.width - this.padding;
    const y = this.padding;

    const activeEnemies = gameState.enemies.filter(e => e.active).length;
    const totalEnemies = gameState.totalEnemies || activeEnemies;

    // Background
    this.ctx.fillStyle = this.colors.scoreBg;
    this.roundRect(x - 100, y, 100, 30, 5);

    // Text
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 14px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      `ENEMIES: ${totalEnemies - activeEnemies}/${totalEnemies}`,
      x - 50,
      y + 15
    );
  }

  /**
   * Render mini-map
   */
  renderMiniMap(player, gameState) {
    const mapX = this.canvas.width - this.miniMapSize - this.miniMapMargin;
    const mapY = this.canvas.height - this.miniMapSize - this.miniMapMargin - 50;

    // Map background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.roundRect(mapX, mapY, this.miniMapSize, this.miniMapSize, 5);

    // Map border
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.roundRect(mapX, mapY, this.miniMapSize, this.miniMapSize, 5);
    this.ctx.stroke();

    // Scale factor
    const worldWidth = gameState.worldWidth || 800;
    const worldHeight = gameState.worldHeight || 600;
    const scaleX = this.miniMapSize / worldWidth;
    const scaleY = this.miniMapSize / worldHeight;

    // Draw enemies
    if (gameState.enemies) {
      this.ctx.fillStyle = '#FF6B6B';
      for (const enemy of gameState.enemies) {
        if (!enemy.active) continue;

        const px = mapX + enemy.position.x * scaleX;
        const py = mapY + enemy.position.y * scaleY;

        this.ctx.beginPath();
        this.ctx.arc(px, py, 3, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // Draw power-ups
    if (gameState.powerups) {
      this.ctx.fillStyle = '#4CAF50';
      for (const powerup of gameState.powerups) {
        if (!powerup.active) continue;

        const px = mapX + powerup.position.x * scaleX;
        const py = mapY + powerup.position.y * scaleY;

        this.ctx.beginPath();
        this.ctx.arc(px, py, 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // Draw player
    const playerX = mapX + player.position.x * scaleX;
    const playerY = mapY + player.position.y * scaleY;

    this.ctx.fillStyle = '#4FC3F7';
    this.ctx.beginPath();
    this.ctx.arc(playerX, playerY, 4, 0, Math.PI * 2);
    this.ctx.fill();

    // Player direction indicator
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(playerX, playerY);
    this.ctx.lineTo(
      playerX + Math.sin(player.rotation) * 8,
      playerY - Math.cos(player.rotation) * 8
    );
    this.ctx.stroke();
  }

  /**
   * Helper: Draw rounded rectangle
   */
  roundRect(x, y, width, height, radius) {
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, width, height, radius);
    this.ctx.fill();
  }

  /**
   * Toggle mini-map
   */
  toggleMiniMap() {
    this.miniMapEnabled = !this.miniMapEnabled;
    return this.miniMapEnabled;
  }
}

export default HUD;
