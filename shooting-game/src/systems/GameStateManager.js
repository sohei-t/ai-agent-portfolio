/**
 * Game State Manager
 * Manages overall game state and transitions
 */
import { GAME_STATES } from '../config/gameConfig.js';

export class GameStateManager {
  constructor() {
    this.currentState = GAME_STATES.LOADING;
    this.previousState = null;
    this.stateChangeListeners = [];
    this.stateData = {};
  }

  /**
   * Change game state
   * @param {string} newState - New game state
   * @param {Object} data - Optional state data
   */
  setState(newState, data = {}) {
    if (this.currentState === newState) {
      return;
    }

    this.previousState = this.currentState;
    this.currentState = newState;
    this.stateData = data;

    // Notify all listeners
    this.stateChangeListeners.forEach(listener => {
      listener(newState, this.previousState, data);
    });
  }

  /**
   * Get current state
   * @returns {string}
   */
  getState() {
    return this.currentState;
  }

  /**
   * Get previous state
   * @returns {string}
   */
  getPreviousState() {
    return this.previousState;
  }

  /**
   * Get state data
   * @returns {Object}
   */
  getStateData() {
    return this.stateData;
  }

  /**
   * Check if in specific state
   * @param {string} state
   * @returns {boolean}
   */
  isState(state) {
    return this.currentState === state;
  }

  /**
   * Check if game is playing
   * @returns {boolean}
   */
  isPlaying() {
    return this.currentState === GAME_STATES.PLAYING;
  }

  /**
   * Check if game is paused
   * @returns {boolean}
   */
  isPaused() {
    return this.currentState === GAME_STATES.PAUSED;
  }

  /**
   * Check if game is over
   * @returns {boolean}
   */
  isGameOver() {
    return this.currentState === GAME_STATES.GAME_OVER;
  }

  /**
   * Pause the game
   */
  pause() {
    if (this.currentState === GAME_STATES.PLAYING) {
      this.setState(GAME_STATES.PAUSED);
    }
  }

  /**
   * Resume the game
   */
  resume() {
    if (this.currentState === GAME_STATES.PAUSED) {
      this.setState(GAME_STATES.PLAYING);
    }
  }

  /**
   * Start the game
   */
  startGame() {
    this.setState(GAME_STATES.PLAYING);
  }

  /**
   * End the game
   * @param {Object} data - Game over data (score, etc.)
   */
  endGame(data = {}) {
    this.setState(GAME_STATES.GAME_OVER, data);
  }

  /**
   * Return to menu
   */
  toMenu() {
    this.setState(GAME_STATES.MENU);
  }

  /**
   * Level clear
   * @param {Object} data - Level clear data
   */
  levelClear(data = {}) {
    this.setState(GAME_STATES.LEVEL_CLEAR, data);
  }

  /**
   * Add state change listener
   * @param {Function} listener - Callback function
   */
  onStateChange(listener) {
    this.stateChangeListeners.push(listener);
  }

  /**
   * Remove state change listener
   * @param {Function} listener
   */
  offStateChange(listener) {
    const index = this.stateChangeListeners.indexOf(listener);
    if (index !== -1) {
      this.stateChangeListeners.splice(index, 1);
    }
  }

  /**
   * Reset state manager
   */
  reset() {
    this.currentState = GAME_STATES.MENU;
    this.previousState = null;
    this.stateData = {};
  }
}
