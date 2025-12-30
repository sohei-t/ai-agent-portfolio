/**
 * Game.js
 * Main game loop, state management, and game logic
 */

const GAME_STATES = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME_OVER',
  VICTORY: 'VICTORY'
};

class Game {
  constructor() {
    this.state = GAME_STATES.MENU;
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.fixedTimeStep = 16.67; // 60 FPS
    this.accumulator = 0;
    this.wave = 1;
    this.score = 0;
    this.animationFrameId = null;
  }

  /**
   * Initialize the game
   */
  init() {
    this.state = GAME_STATES.MENU;
    this.isRunning = false;
    this.wave = 1;
    this.score = 0;
    this.accumulator = 0;
  }

  /**
   * Start the game
   */
  start() {
    this.state = GAME_STATES.PLAYING;
    this.isRunning = true;
    this.lastFrameTime = performance.now();
  }

  /**
   * Toggle pause state
   */
  pause() {
    if (this.state === GAME_STATES.PLAYING) {
      this.state = GAME_STATES.PAUSED;
    } else if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.PLAYING;
    }
  }

  /**
   * Set game over state
   */
  gameOver() {
    this.state = GAME_STATES.GAME_OVER;
    this.isRunning = false;
  }

  /**
   * Set victory state
   */
  victory() {
    this.state = GAME_STATES.VICTORY;
    this.isRunning = false;
  }

  /**
   * Restart the game
   */
  restart() {
    this.score = 0;
    this.wave = 1;
    this.start();
  }

  /**
   * Main game loop update with fixed timestep
   * @param {number} deltaTime - Time elapsed since last frame (ms)
   */
  update(deltaTime) {
    if (this.state !== GAME_STATES.PLAYING) return;

    this.accumulator += deltaTime;

    // Fixed timestep update
    while (this.accumulator >= this.fixedTimeStep) {
      this.fixedUpdate();
      this.accumulator -= this.fixedTimeStep;
    }
  }

  /**
   * Fixed timestep update for game logic
   */
  fixedUpdate() {
    // Update game entities (implemented by subclasses or extended functionality)
  }

  /**
   * Render the game
   */
  render() {
    // Render game (implemented by subclasses or extended functionality)
  }

  /**
   * Set game state with validation
   * @param {string} newState - New state to set
   */
  setState(newState) {
    const validStates = Object.values(GAME_STATES);
    if (validStates.includes(newState)) {
      this.state = newState;
    }
  }

  /**
   * Check if game is in specific state
   * @param {string} state - State to check
   * @returns {boolean}
   */
  isState(state) {
    return this.state === state;
  }

  /**
   * Add points to score
   * @param {number} points - Points to add
   */
  addScore(points) {
    this.score += points;
  }

  /**
   * Advance to next wave
   */
  nextWave() {
    this.wave++;
  }

  /**
   * Start the game loop using requestAnimationFrame
   */
  startLoop() {
    const gameLoop = (currentTime) => {
      if (!this.isRunning && this.state !== GAME_STATES.PLAYING) {
        return;
      }

      const deltaTime = currentTime - this.lastFrameTime;
      this.lastFrameTime = currentTime;

      this.update(deltaTime);
      this.render();

      this.animationFrameId = requestAnimationFrame(gameLoop);
    };

    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame(gameLoop);
  }

  /**
   * Stop the game loop
   */
  stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.Game = Game;
}
