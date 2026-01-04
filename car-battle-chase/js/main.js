/**
 * Car Battle Chase Racing - Main Entry Point
 * Monaco GP Style Vertical Scrolling Racing
 */

import { MonacoRacing } from './core/MonacoRacing.js';

class CarBattleChaseRacing {
  constructor() {
    // Screen elements
    this.screens = {
      loading: document.getElementById('loading-screen'),
      title: document.getElementById('title-screen'),
      settings: document.getElementById('settings-screen'),
      howto: document.getElementById('howto-screen'),
      game: document.getElementById('game-screen'),
      results: document.getElementById('results-screen')
    };

    // Canvas
    this.canvas = document.getElementById('game-canvas');

    // Game instance
    this.game = null;

    // Initialize
    this.init();
  }

  async init() {
    console.log('🏎️ Car Battle Chase Racing initializing...');

    try {
      // Create game instance (Monaco GP style vertical scrolling)
      this.game = new MonacoRacing(this.canvas);

      // Initialize with loading progress
      const progressBar = document.querySelector('.loading-progress');

      // Update progress
      const updateProgress = (percent) => {
        if (progressBar) {
          progressBar.style.width = `${percent}%`;
        }
      };

      updateProgress(10);
      await this.delay(100);

      // Initialize game
      updateProgress(30);
      await this.game.init();

      updateProgress(80);
      await this.delay(200);

      updateProgress(100);
      await this.delay(400);

      console.log('✅ Game initialized successfully!');

    } catch (error) {
      console.error('Failed to initialize game:', error);

      // Show error on loading screen
      const loadingScreen = this.screens.loading;
      if (loadingScreen) {
        loadingScreen.innerHTML = `
          <div style="text-align: center; color: #fff; padding: 40px;">
            <h2 style="color: #f00;">Error Loading Game</h2>
            <p style="margin: 20px 0;">${error.message}</p>
            <button onclick="location.reload()" style="padding: 15px 30px; font-size: 18px; cursor: pointer;">
              Reload
            </button>
          </div>
        `;
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new CarBattleChaseRacing();
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Prevent pull-to-refresh on mobile
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const scrollable = e.target.closest('.scrollable');

  // If pulling down at top of page, prevent refresh
  if (!scrollable && touchY > touchStartY && window.scrollY === 0) {
    e.preventDefault();
  }
}, { passive: false });

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.gameApp?.game) {
    // Auto-pause when tab is hidden
    if (window.gameApp.game.state === 'racing') {
      window.gameApp.game.togglePause();
    }
  }
});
