/**
 * UI - User Interface manager
 * Handles HUD, screens, score display, and speed gauge
 */

import { BowlingScore } from './BowlingScore.js';

export class UI {
  constructor(game) {
    this.game = game;

    // UI Elements
    this.frameDisplay = document.getElementById('frame-display');
    this.throwDisplay = document.getElementById('throw-display');
    this.scoreDisplay = document.getElementById('score-display');
    this.speedGauge = document.getElementById('speed-gauge');
    this.finalScore = document.getElementById('final-score');
    this.scoreboard = document.getElementById('scoreboard');
    this.hud = document.getElementById('hud');
    this.speedGaugeContainer = document.getElementById('speed-gauge-container');
    this.controlToggle = document.getElementById('control-toggle');
    this.joystickContainer = document.getElementById('joystick-container');

    // Screens
    this.screens = {
      title: document.getElementById('title-screen'),
      loading: document.getElementById('loading-screen'),
      result: document.getElementById('result-screen')
    };
  }

  /**
   * Show HUD elements
   */
  showHUD() {
    if (this.hud) this.hud.style.display = 'flex';
    if (this.speedGaugeContainer) this.speedGaugeContainer.style.display = 'block';
    if (this.controlToggle) this.controlToggle.style.display = 'block';
    if (this.joystickContainer) this.joystickContainer.style.display = 'block';
  }

  /**
   * Hide HUD elements
   */
  hideHUD() {
    if (this.hud) this.hud.style.display = 'none';
    if (this.speedGaugeContainer) this.speedGaugeContainer.style.display = 'none';
    if (this.controlToggle) this.controlToggle.style.display = 'none';
    if (this.joystickContainer) this.joystickContainer.style.display = 'none';
  }

  /**
   * Update frame display
   */
  updateFrame(frame, throwNum) {
    if (this.frameDisplay) {
      this.frameDisplay.textContent = `Frame: ${frame} / 10`;
    }
    if (this.throwDisplay) {
      this.throwDisplay.textContent = `Throw: ${throwNum}`;
    }
  }

  /**
   * Update score display
   */
  updateScore(score) {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = score.toString();
    }
  }

  /**
   * Update speed gauge
   * @param {number} normalizedSpeed - Speed from 0 to 1
   */
  updateSpeedGauge(normalizedSpeed) {
    if (this.speedGauge) {
      const percentage = Math.min(100, Math.max(0, normalizedSpeed * 100));
      this.speedGauge.style.height = `${percentage}%`;
    }
  }

  /**
   * Show a specific screen
   */
  showScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.remove('hidden');
    }
  }

  /**
   * Hide a specific screen
   */
  hideScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.add('hidden');
    }
  }

  /**
   * Show loading screen
   */
  showLoading() {
    this.showScreen('loading-screen');
  }

  /**
   * Hide loading screen
   */
  hideLoading() {
    this.hideScreen('loading-screen');
  }

  /**
   * Show results screen with final score
   */
  showResults(score, frames) {
    this.hideHUD();

    // Update final score
    if (this.finalScore) {
      this.finalScore.textContent = score.toString();
    }

    // Build scoreboard
    if (this.scoreboard) {
      this.buildScoreboard(frames);
    }

    this.showScreen('result-screen');
  }

  /**
   * Build the scoreboard display
   */
  buildScoreboard(frames) {
    if (!this.scoreboard) return;

    this.scoreboard.innerHTML = '';

    frames.forEach((frame, index) => {
      const frameBox = document.createElement('div');
      frameBox.className = 'frame-box';

      // Frame number
      const frameNum = document.createElement('div');
      frameNum.className = 'frame-number';
      frameNum.textContent = frame.number.toString();
      frameBox.appendChild(frameNum);

      // Throws
      const throwsDiv = document.createElement('div');
      throwsDiv.className = 'frame-throws';

      if (frame.is10th) {
        // 10th frame: show all throws
        const displayThrows = frame.throws.map((pins, i) => {
          if (pins === 10) {
            // Check if it's a strike (reset pins)
            if (i === 0 || frame.throws[i - 1] === 10 ||
                (i === 1 && frame.throws[0] !== 10)) {
              return 'X';
            }
            return 'X';
          }
          if (i > 0 && frame.throws[i - 1] !== 10 &&
              frame.throws[i - 1] + pins === 10) {
            return '/';
          }
          return pins === 0 ? '-' : pins.toString();
        });
        throwsDiv.textContent = displayThrows.join(' ');
      } else {
        // Normal frame
        const displayThrows = frame.throws.map((pins, i) => {
          return BowlingScore.formatThrow(pins, i === 1, frame.throws[0] || 0);
        });
        throwsDiv.textContent = displayThrows.join(' ');
      }

      frameBox.appendChild(throwsDiv);

      // Score
      const scoreDiv = document.createElement('div');
      scoreDiv.className = 'frame-score';
      scoreDiv.textContent = frame.score !== null ? frame.score.toString() : '';
      frameBox.appendChild(scoreDiv);

      this.scoreboard.appendChild(frameBox);
    });
  }

  /**
   * Show message overlay (for notifications)
   */
  showMessage(message, duration = 2000) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 20px 40px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: bold;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    `;
    messageEl.textContent = message;

    document.body.appendChild(messageEl);

    // Remove after duration
    setTimeout(() => {
      messageEl.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(messageEl);
      }, 300);
    }, duration);
  }

  /**
   * Show strike animation
   */
  showStrike() {
    this.showMessage('STRIKE!', 1500);
  }

  /**
   * Show spare animation
   */
  showSpare() {
    this.showMessage('SPARE!', 1500);
  }

  /**
   * Show gutter message
   */
  showGutter() {
    this.showMessage('Gutter Ball!', 1000);
  }
}
