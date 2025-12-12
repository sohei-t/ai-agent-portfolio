/**
 * Tutorial.js - First-time player tutorial
 * Features: Operation guide, key bindings, mobile controls explanation
 */
export class Tutorial {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Tutorial state
    this.shown = this.checkIfShown();
    this.currentStep = 0;
    this.totalSteps = 3;
    this.skipRequested = false;

    // Detect mobile
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Tutorial steps
    this.steps = this.isMobile ? this.getMobileSteps() : this.getPCSteps();

    // Animation
    this.fadeAlpha = 0;
    this.fadeSpeed = 2.0;

    // Buttons
    this.buttons = {
      next: {
        x: this.width / 2 + 50,
        y: this.height - 100,
        width: 120,
        height: 40,
        text: 'NEXT',
        hovered: false
      },
      skip: {
        x: this.width / 2 - 170,
        y: this.height - 100,
        width: 120,
        height: 40,
        text: 'SKIP',
        hovered: false
      }
    };
  }

  /**
   * Get PC tutorial steps
   */
  getPCSteps() {
    return [
      {
        title: 'Welcome to Dungeon Battles!',
        content: [
          'Navigate through the dungeon and defeat all enemies.',
          'Use ARROW KEYS to move your character.',
          'Press SPACE for normal attack (Damage: 10).',
          'Press B KEY for magic attack (Damage: 20, MP Cost: 10).',
          '',
          'Collect items to restore HP and MP!',
          'Defeat enemies to gain power-ups and increase your strength.'
        ]
      },
      {
        title: 'Combat Tips',
        content: [
          'Watch your HP and MP bars in the top-left corner.',
          'Magic attacks are powerful but consume MP.',
          'Collect HP potions (red) and MP potions (blue).',
          'Power-ups drop from enemies:',
          '  • Weapon Upgrade: +5 Attack',
          '  • Magic Upgrade: +10 Magic Power',
          '',
          'Build combos to increase your score multiplier!'
        ]
      },
      {
        title: 'Debug & Controls',
        content: [
          'F1: Toggle debug mode (FPS, entity count)',
          'F2: Show collision boxes',
          'F3: Pause game',
          '',
          'Defeat all 5 stages to win!',
          'You have 3 continues if you die.',
          '',
          'Good luck, adventurer!'
        ]
      }
    ];
  }

  /**
   * Get mobile tutorial steps
   */
  getMobileSteps() {
    return [
      {
        title: 'Welcome to Dungeon Battles!',
        content: [
          'Navigate through the dungeon and defeat all enemies.',
          '',
          'Mobile Controls:',
          '• Virtual Joystick (bottom-left): Move',
          '• ATK Button (bottom-right): Normal attack',
          '• MAG Button (bottom-right): Magic attack',
          '',
          'Collect items to restore HP and MP!'
        ]
      },
      {
        title: 'Combat Tips',
        content: [
          'Watch your HP and MP bars at the top.',
          'Normal Attack: Damage 10, no cost',
          'Magic Attack: Damage 20, costs 10 MP',
          '',
          'Collect potions:',
          '  • Red potion: +30 HP',
          '  • Blue potion: +20 MP',
          '',
          'Defeat enemies to get power-ups!'
        ]
      },
      {
        title: 'Your Quest',
        content: [
          'Defeat all 5 stages to win!',
          'You have 3 continues if you die.',
          '',
          'Build combos to increase your score!',
          'Avoid enemy bullets and attacks.',
          '',
          'The final boss is extremely powerful!',
          '',
          'Good luck, adventurer!'
        ]
      }
    ];
  }

  /**
   * Check if tutorial has been shown
   */
  checkIfShown() {
    try {
      return localStorage.getItem('dungeonBattles_tutorialShown') === 'true';
    } catch (e) {
      return false;
    }
  }

  /**
   * Mark tutorial as shown
   */
  markAsShown() {
    try {
      localStorage.setItem('dungeonBattles_tutorialShown', 'true');
      this.shown = true;
    } catch (e) {
      console.error('Failed to save tutorial state:', e);
    }
  }

  /**
   * Should show tutorial
   */
  shouldShow() {
    return !this.shown;
  }

  /**
   * Update tutorial
   */
  update(deltaTime) {
    // Fade in
    if (this.fadeAlpha < 1.0) {
      this.fadeAlpha = Math.min(1.0, this.fadeAlpha + this.fadeSpeed * deltaTime);
    }
  }

  /**
   * Render tutorial
   */
  render(ctx) {
    ctx.save();
    ctx.globalAlpha = this.fadeAlpha;

    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Tutorial box
    const boxWidth = 700;
    const boxHeight = 500;
    const boxX = (this.width - boxWidth) / 2;
    const boxY = (this.height - boxHeight) / 2;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Render current step
    this.renderStep(ctx, this.steps[this.currentStep], boxX, boxY, boxWidth, boxHeight);

    // Step indicator
    this.renderStepIndicator(ctx, boxX, boxY + boxHeight - 150);

    // Buttons
    this.renderButtons(ctx);

    ctx.restore();
  }

  /**
   * Render tutorial step
   */
  renderStep(ctx, step, x, y, width, height) {
    // Title
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffaa00';
    ctx.fillText(step.title, x + width / 2, y + 60);

    // Content
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';

    let contentY = y + 120;
    step.content.forEach(line => {
      if (line === '') {
        contentY += 15; // Blank line spacing
      } else {
        ctx.fillText(line, x + 50, contentY);
        contentY += 30;
      }
    });
  }

  /**
   * Render step indicator (1/3, 2/3, etc.)
   */
  renderStepIndicator(ctx, x, y) {
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText(`Step ${this.currentStep + 1} / ${this.totalSteps}`, this.width / 2, y);

    // Progress dots
    const dotSpacing = 30;
    const startX = this.width / 2 - (this.totalSteps - 1) * dotSpacing / 2;

    for (let i = 0; i < this.totalSteps; i++) {
      ctx.beginPath();
      ctx.arc(startX + i * dotSpacing, y + 30, 6, 0, Math.PI * 2);

      if (i === this.currentStep) {
        ctx.fillStyle = '#ffaa00';
      } else if (i < this.currentStep) {
        ctx.fillStyle = '#00ff00';
      } else {
        ctx.fillStyle = '#444444';
      }

      ctx.fill();
    }
  }

  /**
   * Render buttons
   */
  renderButtons(ctx) {
    Object.entries(this.buttons).forEach(([key, button]) => {
      // Don't show next button on last step
      if (key === 'next' && this.currentStep === this.totalSteps - 1) {
        button.text = 'START';
      } else if (key === 'next') {
        button.text = 'NEXT';
      }

      // Button background
      ctx.fillStyle = button.hovered ? '#ff8800' : '#444444';
      ctx.fillRect(button.x, button.y, button.width, button.height);

      // Button border
      ctx.strokeStyle = button.hovered ? '#ffaa00' : '#888888';
      ctx.lineWidth = 3;
      ctx.strokeRect(button.x, button.y, button.width, button.height);

      // Button text
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    });
  }

  /**
   * Handle input
   */
  handleInput(x, y, type) {
    if (type === 'move') {
      // Update hover state
      this.buttons.next.hovered = this.isPointInButton(x, y, this.buttons.next);
      this.buttons.skip.hovered = this.isPointInButton(x, y, this.buttons.skip);
    } else if (type === 'click') {
      if (this.isPointInButton(x, y, this.buttons.next)) {
        return this.nextStep();
      } else if (this.isPointInButton(x, y, this.buttons.skip)) {
        return this.skip();
      }
    }

    return null;
  }

  /**
   * Handle keyboard input
   */
  handleKeyboard(key) {
    if (key === 'Enter' || key === ' ') {
      return this.nextStep();
    } else if (key === 'Escape') {
      return this.skip();
    }
    return null;
  }

  /**
   * Next step
   */
  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      return null;
    } else {
      // Last step - start game
      this.markAsShown();
      return 'start';
    }
  }

  /**
   * Skip tutorial
   */
  skip() {
    this.markAsShown();
    return 'skip';
  }

  /**
   * Reset tutorial
   */
  reset() {
    this.currentStep = 0;
    this.fadeAlpha = 0;
    this.skipRequested = false;
  }

  /**
   * Check if point is inside button
   */
  isPointInButton(x, y, button) {
    return x >= button.x && x <= button.x + button.width &&
           y >= button.y && y <= button.y + button.height;
  }

  /**
   * Force show tutorial (for debug/testing)
   */
  forceShow() {
    try {
      localStorage.removeItem('dungeonBattles_tutorialShown');
      this.shown = false;
    } catch (e) {
      console.error('Failed to reset tutorial:', e);
    }
  }

  /**
   * Resize handler
   */
  resize(width, height) {
    this.width = width;
    this.height = height;

    // Reposition buttons
    this.buttons.next.x = width / 2 + 50;
    this.buttons.next.y = height - 100;
    this.buttons.skip.x = width / 2 - 170;
    this.buttons.skip.y = height - 100;
  }
}
