/**
 * StateManager.js - Game state management
 * Manages state transitions and game flow
 */
export class StateManager {
  constructor() {
    // Game states
    this.states = {
      LOADING: 'loading',
      MENU: 'menu',
      TUTORIAL: 'tutorial',
      PLAYING: 'playing',
      PAUSED: 'paused',
      STAGE_CLEAR: 'stageClear',
      GAME_OVER: 'gameOver',
      VICTORY: 'victory'
    };

    this.currentState = this.states.LOADING;
    this.previousState = null;
    this.stateStack = [];

    // State data
    this.stateData = {};

    // State change callbacks
    this.onStateEnter = {};
    this.onStateExit = {};
    this.onStateUpdate = {};

    // Transition
    this.transitioning = false;
    this.transitionDuration = 0.5;
    this.transitionProgress = 0;
  }

  /**
   * Change to a new state
   */
  changeState(newState, data = {}) {
    if (!Object.values(this.states).includes(newState)) {
      console.error(`Invalid state: ${newState}`);
      return false;
    }

    // Exit current state
    if (this.onStateExit[this.currentState]) {
      this.onStateExit[this.currentState](this.stateData[this.currentState]);
    }

    // Store previous state
    this.previousState = this.currentState;

    // Change state
    this.currentState = newState;
    this.stateData[newState] = data;

    // Enter new state
    if (this.onStateEnter[newState]) {
      this.onStateEnter[newState](data);
    }

    console.log(`State: ${this.previousState} -> ${newState}`);
    return true;
  }

  /**
   * Push current state to stack
   */
  pushState(newState, data = {}) {
    this.stateStack.push({
      state: this.currentState,
      data: this.stateData[this.currentState]
    });

    this.changeState(newState, data);
  }

  /**
   * Pop state from stack
   */
  popState() {
    if (this.stateStack.length === 0) {
      console.warn('State stack is empty');
      return false;
    }

    const previousState = this.stateStack.pop();
    this.changeState(previousState.state, previousState.data);
    return true;
  }

  /**
   * Update current state
   */
  update(deltaTime) {
    if (this.onStateUpdate[this.currentState]) {
      this.onStateUpdate[this.currentState](deltaTime, this.stateData[this.currentState]);
    }

    // Update transition
    if (this.transitioning) {
      this.transitionProgress += deltaTime / this.transitionDuration;
      if (this.transitionProgress >= 1.0) {
        this.transitioning = false;
        this.transitionProgress = 0;
      }
    }
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
   * Set state data
   */
  setStateData(data, state = null) {
    this.stateData[state || this.currentState] = data;
  }

  /**
   * Check if in specific state
   */
  isState(state) {
    return this.currentState === state;
  }

  /**
   * Check if game is active
   */
  isPlaying() {
    return this.currentState === this.states.PLAYING;
  }

  /**
   * Check if game is paused
   */
  isPaused() {
    return this.currentState === this.states.PAUSED;
  }

  /**
   * Check if in menu
   */
  isMenu() {
    return this.currentState === this.states.MENU;
  }

  /**
   * Check if game over
   */
  isGameOver() {
    return this.currentState === this.states.GAME_OVER;
  }

  /**
   * Check if victory
   */
  isVictory() {
    return this.currentState === this.states.VICTORY;
  }

  /**
   * Register state enter callback
   */
  registerEnterCallback(state, callback) {
    this.onStateEnter[state] = callback;
  }

  /**
   * Register state exit callback
   */
  registerExitCallback(state, callback) {
    this.onStateExit[state] = callback;
  }

  /**
   * Register state update callback
   */
  registerUpdateCallback(state, callback) {
    this.onStateUpdate[state] = callback;
  }

  /**
   * Start transition effect
   */
  startTransition() {
    this.transitioning = true;
    this.transitionProgress = 0;
  }

  /**
   * Check if transitioning
   */
  isTransitioning() {
    return this.transitioning;
  }

  /**
   * Get transition progress (0-1)
   */
  getTransitionProgress() {
    return this.transitionProgress;
  }

  /**
   * Reset to initial state
   */
  reset() {
    this.currentState = this.states.MENU;
    this.previousState = null;
    this.stateStack = [];
    this.stateData = {};
    this.transitioning = false;
    this.transitionProgress = 0;
  }

  /**
   * Clear state stack
   */
  clearStack() {
    this.stateStack = [];
  }
}
