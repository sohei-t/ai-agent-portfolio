/**
 * MenuScreen.js - Title/Main menu screen
 * Features: Start button, controls guide, high score display
 */
export class MenuScreen {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Button configuration
    this.buttons = {
      start: {
        x: this.width / 2 - 100,
        y: this.height / 2,
        width: 200,
        height: 50,
        text: 'START GAME',
        hovered: false
      },
      controls: {
        x: this.width / 2 - 100,
        y: this.height / 2 + 70,
        width: 200,
        height: 50,
        text: 'CONTROLS',
        hovered: false
      }
    };

    // High score
    this.highScore = this.loadHighScore();

    // Animation
    this.titlePulse = 0;
    this.showControls = false;
  }

  /**
   * Update menu state
   */
  update(deltaTime) {
    this.titlePulse += deltaTime * 2;
  }

  /**
   * Render the menu screen
   */
  render(ctx) {
    ctx.save();

    // Dark background
    ctx.fillStyle = '#0a0a1e';
    ctx.fillRect(0, 0, this.width, this.height);

    // Render title
    this.renderTitle(ctx);

    // Render subtitle
    this.renderSubtitle(ctx);

    // Render high score
    this.renderHighScore(ctx);

    // Render buttons
    this.renderButtons(ctx);

    // Render controls overlay if shown
    if (this.showControls) {
      this.renderControlsOverlay(ctx);
    }

    // Render footer
    this.renderFooter(ctx);

    ctx.restore();
  }

  /**
   * Render game title with pulse effect
   */
  renderTitle(ctx) {
    const scale = 1.0 + Math.sin(this.titlePulse) * 0.05;

    ctx.save();
    ctx.translate(this.width / 2, this.height / 3);
    ctx.scale(scale, scale);

    // Title shadow
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText('DUNGEON BATTLES', 4, 4);

    // Title gradient
    const gradient = ctx.createLinearGradient(0, -32, 0, 32);
    gradient.addColorStop(0, '#ff6600');
    gradient.addColorStop(0.5, '#ffaa00');
    gradient.addColorStop(1, '#ff6600');

    ctx.fillStyle = gradient;
    ctx.fillText('DUNGEON BATTLES', 0, 0);

    ctx.restore();
  }

  /**
   * Render subtitle
   */
  renderSubtitle(ctx) {
    ctx.font = 'italic 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Face the darkness, conquer the dungeon', this.width / 2, this.height / 3 + 50);
  }

  /**
   * Render high score
   */
  renderHighScore(ctx) {
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffdd00';
    ctx.fillText(`HIGH SCORE: ${this.highScore.toString().padStart(8, '0')}`, this.width / 2, this.height / 3 + 100);
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
   * Render controls overlay
   */
  renderControlsOverlay(ctx) {
    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Controls box
    const boxWidth = 600;
    const boxHeight = 400;
    const boxX = (this.width - boxWidth) / 2;
    const boxY = (this.height - boxHeight) / 2;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 3;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Title
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffaa00';
    ctx.fillText('CONTROLS', this.width / 2, boxY + 50);

    // PC Controls
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PC CONTROLS', this.width / 2, boxY + 100);

    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaaaaa';
    const pcY = boxY + 130;
    ctx.fillText('Arrow Keys: Move', boxX + 50, pcY);
    ctx.fillText('Space: Normal Attack (ATK: 10)', boxX + 50, pcY + 30);
    ctx.fillText('B Key: Magic Attack (ATK: 20, MP Cost: 10)', boxX + 50, pcY + 60);
    ctx.fillText('F3: Pause Game', boxX + 50, pcY + 90);

    // Mobile Controls
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('MOBILE CONTROLS', this.width / 2, boxY + 260);

    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaaaaa';
    const mobileY = boxY + 290;
    ctx.fillText('Virtual Joystick (bottom-left): Move', boxX + 50, mobileY);
    ctx.fillText('ATK Button (bottom-right): Normal Attack', boxX + 50, mobileY + 30);
    ctx.fillText('MAG Button (bottom-right): Magic Attack', boxX + 50, mobileY + 60);

    // Close instruction
    ctx.font = 'italic 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffdd00';
    ctx.fillText('Press ESC or click anywhere to close', this.width / 2, boxY + boxHeight - 30);
  }

  /**
   * Render footer
   */
  renderFooter(ctx) {
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666666';
    ctx.fillText('© 2025 Dungeon Battles - Press F1 for Debug Mode', this.width / 2, this.height - 20);
  }

  /**
   * Handle mouse/touch input
   */
  handleInput(x, y, type) {
    if (this.showControls) {
      // Close controls overlay
      if (type === 'click') {
        this.showControls = false;
      }
      return null;
    }

    // Check button clicks
    if (type === 'move') {
      // Update hover state
      this.buttons.start.hovered = this.isPointInButton(x, y, this.buttons.start);
      this.buttons.controls.hovered = this.isPointInButton(x, y, this.buttons.controls);
    } else if (type === 'click') {
      if (this.isPointInButton(x, y, this.buttons.start)) {
        return 'start';
      } else if (this.isPointInButton(x, y, this.buttons.controls)) {
        this.showControls = true;
        return 'controls';
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
   * Handle keyboard input
   */
  handleKeyboard(key) {
    if (this.showControls && key === 'Escape') {
      this.showControls = false;
      return true;
    }
    return false;
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
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;

    // Reposition buttons
    this.buttons.start.x = width / 2 - 100;
    this.buttons.start.y = height / 2;
    this.buttons.controls.x = width / 2 - 100;
    this.buttons.controls.y = height / 2 + 70;
  }
}
