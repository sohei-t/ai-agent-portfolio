/**
 * ScreenManager.js - Manages game state transitions
 * States: Menu, Play, Pause, GameOver, Victory
 */
export class ScreenManager {
  constructor() {
    this.states = {
      MENU: 'menu',
      PLAY: 'play',
      PAUSE: 'pause',
      GAMEOVER: 'gameover',
      VICTORY: 'victory'
    };

    this.currentState = this.states.MENU;
    this.previousState = null;
    this.stateStack = [];

    // State-specific data
    this.stateData = {};

    // Event callbacks
    this.onStateChange = null;

    // Difficulty settings
    this.difficulties = {
      EASY: 'easy',
      NORMAL: 'normal',
      HARD: 'hard'
    };
    this.selectedDifficulty = this.difficulties.NORMAL;
    this.difficultyIndex = 1; // 0=Easy, 1=Normal, 2=Hard
  }

  /**
   * Change to a new state
   */
  changeState(newState, data = {}) {
    if (!Object.values(this.states).includes(newState)) {
      console.error(`Invalid state: ${newState}`);
      return;
    }

    this.previousState = this.currentState;
    this.currentState = newState;
    this.stateData[newState] = data;

    // Trigger callback
    if (this.onStateChange) {
      this.onStateChange(newState, this.previousState, data);
    }

    console.log(`State changed: ${this.previousState} -> ${newState}`);
  }

  /**
   * Push current state to stack and change to new state
   */
  pushState(newState, data = {}) {
    this.stateStack.push({
      state: this.currentState,
      data: this.stateData[this.currentState]
    });

    this.changeState(newState, data);
  }

  /**
   * Pop state from stack and restore
   */
  popState() {
    if (this.stateStack.length === 0) {
      console.warn('State stack is empty');
      return;
    }

    const previousStateInfo = this.stateStack.pop();
    this.changeState(previousStateInfo.state, previousStateInfo.data);
  }

  /**
   * Get current state
   */
  getCurrentState() {
    return this.currentState;
  }

  /**
   * Get previous state
   */
  getPreviousState() {
    return this.previousState;
  }

  /**
   * Get state data
   */
  getStateData(state = null) {
    return this.stateData[state || this.currentState] || {};
  }

  /**
   * Check if in specific state
   */
  isState(state) {
    return this.currentState === state;
  }

  /**
   * Check if game is playing (not paused or in menu)
   */
  isPlaying() {
    return this.currentState === this.states.PLAY;
  }

  /**
   * Check if game is paused
   */
  isPaused() {
    return this.currentState === this.states.PAUSE;
  }

  /**
   * Reset to initial state
   */
  reset() {
    this.currentState = this.states.MENU;
    this.previousState = null;
    this.stateStack = [];
    this.stateData = {};
  }

  /**
   * Set state change callback
   */
  setStateChangeCallback(callback) {
    this.onStateChange = callback;
  }

  /**
   * Update method (called each frame)
   */
  update(deltaTime, inputSystem) {
    // State-specific update logic
    switch (this.currentState) {
      case this.states.MENU:
        // Navigate difficulty selection with arrow keys
        if (inputSystem) {
          if (inputSystem.isKeyDown('ArrowUp')) {
            this.difficultyIndex = Math.max(0, this.difficultyIndex - 1);
            this.updateSelectedDifficulty();
          }
          if (inputSystem.isKeyDown('ArrowDown')) {
            this.difficultyIndex = Math.min(2, this.difficultyIndex + 1);
            this.updateSelectedDifficulty();
          }
          // Check for start input
          if (inputSystem.isKeyDown(' ') || inputSystem.isKeyDown('Enter')) {
            this.startGame();
          }

          // Check for touch/tap on mobile - SIMPLIFIED FOR MOBILE
          const tap = inputSystem.checkTap();
          if (tap) {
            console.log(`[ScreenManager] Mobile tap detected - starting game with default difficulty!`);

            // For mobile, any tap starts the game with NORMAL difficulty
            // This simplifies the mobile experience
            if (inputSystem.isMobile) {
              this.difficultyIndex = 1; // Set to NORMAL
              this.updateSelectedDifficulty();
              console.log('[ScreenManager] Mobile: Starting game with NORMAL difficulty');
              this.startGame();
            } else {
              // Desktop keeps the original behavior
              console.log(`[ScreenManager] Desktop tap at: ${tap.x}, ${tap.y}`);

              // Canvas dimensions (get actual canvas size)
              const canvas = inputSystem.canvas;
              const canvasWidth = canvas.width;
              const canvasHeight = canvas.height;
              const centerX = canvasWidth / 2;

              // Scale Y coordinates based on canvas height (600px default)
              const scaleY = canvasHeight / 600;

              // Check if tap is on difficulty selection
              const difficultyY = [270 * scaleY, 320 * scaleY, 370 * scaleY]; // Scaled Y positions

              let difficultySelected = false;
              for (let i = 0; i < 3; i++) {
                if (Math.abs(tap.y - difficultyY[i]) < 35 * scaleY && Math.abs(tap.x - centerX) < 150) {
                  this.difficultyIndex = i;
                  this.updateSelectedDifficulty();
                  console.log(`[ScreenManager] Touch selected difficulty: ${this.selectedDifficulty}`);
                  difficultySelected = true;
                  break;
                }
              }

              // Only check start button if difficulty wasn't selected
              if (!difficultySelected) {
                // Check if tap is on start button (make hit area larger for mobile)
                const buttonY = 430 * scaleY;
                const buttonWidth = 250;  // Made wider
                const buttonHeight = 60 * scaleY;  // Made taller
                const buttonX = centerX - buttonWidth / 2;

                console.log(`[ScreenManager] Checking START button: tap.y=${tap.y}, buttonY=${buttonY}, range=[${buttonY - buttonHeight/2}, ${buttonY + buttonHeight/2}]`);

                // Also check a larger area around the button for mobile
                if (tap.y >= 400 * scaleY && tap.y <= 470 * scaleY) {
                  console.log('[ScreenManager] Touch in START button area - Starting game!');
                  this.startGame();
                }
              }
            }
          }
        }
        break;
      case this.states.PLAY:
        // Game logic handled by other systems
        if (inputSystem && inputSystem.isKeyDown('p')) {
          this.changeState(this.states.PAUSE);
        }
        break;
      case this.states.PAUSE:
        if (inputSystem && inputSystem.isKeyDown('p')) {
          this.changeState(this.states.PLAY);
        }
        break;
      case this.states.GAMEOVER:
      case this.states.VICTORY:
        if (inputSystem) {
          // Restart with R key
          if (inputSystem.isKeyDown('r')) {
            this.restartGame();
          }

          // Also restart with tap on mobile
          const tap = inputSystem.checkTap();
          if (tap) {
            console.log('[ScreenManager] Tap detected in game over/victory - restarting...');
            this.restartGame();
          }
        }
        break;
    }
  }

  /**
   * Update selected difficulty based on index
   */
  updateSelectedDifficulty() {
    const difficulties = Object.values(this.difficulties);
    this.selectedDifficulty = difficulties[this.difficultyIndex];
    console.log(`[ScreenManager] Difficulty selected: ${this.selectedDifficulty}`);
  }

  /**
   * Start the game from menu
   */
  startGame() {
    console.log(`[ScreenManager] Starting game with difficulty: ${this.selectedDifficulty}`);
    this.changeState(this.states.PLAY, { difficulty: this.selectedDifficulty });
    // Trigger game start event if needed
  }

  /**
   * Restart the game
   */
  restartGame() {
    console.log('[ScreenManager] Restarting game...');
    // Reset difficulty selection to default
    this.difficultyIndex = 1; // Reset to NORMAL
    this.selectedDifficulty = this.difficulties.NORMAL;
    this.changeState(this.states.MENU);
    // Reset game state if needed
    if (this.onStateChange) {
      this.onStateChange('reset', null, {});
    }
  }

  /**
   * Render method (called each frame)
   */
  render(ctx) {
    // State-specific rendering
    switch (this.currentState) {
      case this.states.MENU:
        this.renderMenu(ctx);
        break;
      case this.states.PLAY:
        // Game is rendered by other systems
        break;
      case this.states.PAUSE:
        this.renderPause(ctx);
        break;
      case this.states.GAMEOVER:
        this.renderGameOver(ctx);
        break;
      case this.states.VICTORY:
        this.renderVictory(ctx);
        break;
    }
  }

  /**
   * Render menu screen
   */
  renderMenu(ctx) {
    ctx.save();

    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DUNGEON BATTLES', ctx.canvas.width / 2, 100);

    // Subtitle
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.fillText('Action RPG', ctx.canvas.width / 2, 140);

    // Difficulty selection title
    ctx.fillStyle = '#00FF00';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('SELECT DIFFICULTY', ctx.canvas.width / 2, 220);

    // Difficulty options
    const difficulties = [
      { name: 'EASY', description: 'For beginners', color: '#00FF00' },
      { name: 'NORMAL', description: 'Balanced challenge', color: '#FFFF00' },
      { name: 'HARD', description: 'Omnidirectional attacks!', color: '#FF4444' }
    ];

    difficulties.forEach((diff, index) => {
      const y = 270 + index * 50;
      const isSelected = index === this.difficultyIndex;

      // Selection indicator
      if (isSelected) {
        ctx.fillStyle = diff.color;
        ctx.font = 'bold 24px Arial';
        ctx.fillText('▶', ctx.canvas.width / 2 - 120, y);
        ctx.fillText('◀', ctx.canvas.width / 2 + 120, y);
      }

      // Difficulty name
      ctx.fillStyle = isSelected ? diff.color : '#888888';
      ctx.font = isSelected ? 'bold 22px Arial' : '20px Arial';
      ctx.fillText(diff.name, ctx.canvas.width / 2, y);

      // Description
      ctx.fillStyle = isSelected ? '#CCCCCC' : '#666666';
      ctx.font = '14px Arial';
      ctx.fillText(diff.description, ctx.canvas.width / 2, y + 18);
    });

    // Start button for mobile/touch
    const buttonY = 430;
    const buttonWidth = 200;
    const buttonHeight = 40;
    const buttonX = ctx.canvas.width / 2 - buttonWidth / 2;

    // Draw start button
    ctx.fillStyle = '#00FF00';
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.fillRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('START GAME', ctx.canvas.width / 2, buttonY + 6);

    // Instructions for PC/Mobile
    ctx.fillStyle = '#FFFF00';
    ctx.font = 'bold 18px Arial';

    // Check if mobile (simple check - can be improved)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      ctx.fillText('TAP ANYWHERE TO START!', ctx.canvas.width / 2, 480);
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.fillText('Mobile: Difficulty is set to NORMAL', ctx.canvas.width / 2, 500);
    } else {
      ctx.fillStyle = '#888888';
      ctx.font = '14px Arial';
      ctx.fillText('PC: ↑↓ Select, SPACE/ENTER Start', ctx.canvas.width / 2, 480);
      ctx.fillText('Mobile: Tap anywhere to start (NORMAL)', ctx.canvas.width / 2, 500);
    }

    // Controls info
    ctx.fillStyle = '#666666';
    ctx.font = '12px Arial';
    ctx.fillText('Controls: Arrow Keys/WASD - Move | Space - Attack | X - Magic', ctx.canvas.width / 2, 540);

    ctx.restore();
  }

  /**
   * Render pause screen
   */
  renderPause(ctx) {
    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAUSED', ctx.canvas.width / 2, ctx.canvas.height / 2);

    ctx.font = '20px Arial';
    ctx.fillText('Press P to Resume', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);

    ctx.restore();
  }

  /**
   * Render game over screen
   */
  renderGameOver(ctx) {
    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.fillText('Press R to Restart', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);

    ctx.restore();
  }

  /**
   * Render victory screen
   */
  renderVictory(ctx) {
    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VICTORY!', ctx.canvas.width / 2, ctx.canvas.height / 2 - 50);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Arial';
    ctx.fillText('Congratulations!', ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.fillText('Press R to Play Again', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);

    ctx.restore();
  }
}
