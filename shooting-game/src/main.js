/**
 * Main Entry Point for Vertical Scrolling Shooter Game
 *
 * This file initializes the game and manages the loading process.
 */
import { Game } from './core/Game.js';

// Game instance
let game = null;

/**
 * Initialize the game
 */
function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.getElementById('loading-progress');

  console.log('Initializing game...');

  // Simulate loading with progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += 10;
    loadingProgress.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(loadingInterval);

      // Hide loading screen
      setTimeout(() => {
        loadingScreen.classList.add('hidden');

        // Create and start game
        game = new Game(canvas);
        setupMobileControls(game);
        game.start();

        console.log('Game started successfully!');
      }, 500);
    }
  }, 100);
}

/**
 * Handle window resize
 */
function handleResize() {
  if (!game) return;

  const canvas = game.canvas;
  const container = canvas.parentElement;

  // Calculate scale to fit container while maintaining aspect ratio
  const scaleX = container.clientWidth / 800;
  const scaleY = container.clientHeight / 600;
  const scale = Math.min(scaleX, scaleY);

  // Apply scale via CSS
  canvas.style.width = `${800 * scale}px`;
  canvas.style.height = `${600 * scale}px`;
}

/**
 * Handle visibility change (pause when tab is not visible)
 */
function handleVisibilityChange() {
  if (!game || !game.gameLoop) return;

  if (document.hidden) {
    // Pause game when tab is hidden
    if (game.state === 'playing') {
      game.gameLoop.pause();
    }
  } else {
    // Resume game when tab is visible
    if (game.state === 'playing' && !game.gameLoop.isRunning) {
      game.gameLoop.resume();
    }
  }
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', initGame);

// Handle window resize
window.addEventListener('resize', handleResize);

// Handle visibility change
document.addEventListener('visibilitychange', handleVisibilityChange);

// Initial resize
window.addEventListener('load', handleResize);

/**
 * Wire up mobile on-screen controls
 */
function setupMobileControls(gameInstance) {
  const dpad = document.getElementById('virtual-dpad');
  const shootButton = document.getElementById('shoot-button');
  const bombButton = document.getElementById('bomb-button');

  if (!gameInstance || !dpad || !shootButton) return;

  const input = gameInstance.inputHandler;

  const updateDirectionFromEvent = (evt) => {
    evt.preventDefault();
    const point = evt.touches ? evt.touches[0] : evt;
    const rect = dpad.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (point.clientX - cx) / (rect.width / 2);
    const dy = (point.clientY - cy) / (rect.height / 2);
    input.setVirtualDirection(dx, dy);
  };

  const clearDirection = () => input.setVirtualDirection(0, 0);

  // D-pad events
  ['touchstart', 'touchmove'].forEach(eventName => {
    dpad.addEventListener(eventName, updateDirectionFromEvent, { passive: false });
  });
  ['touchend', 'touchcancel'].forEach(eventName => {
    dpad.addEventListener(eventName, (e) => {
      e.preventDefault();
      clearDirection();
    }, { passive: false });
  });
  dpad.addEventListener('mousedown', updateDirectionFromEvent);
  dpad.addEventListener('mousemove', (e) => {
    if (e.buttons) updateDirectionFromEvent(e);
  });
  ['mouseup', 'mouseleave'].forEach(eventName => {
    dpad.addEventListener(eventName, clearDirection);
  });

  // Shoot button events
  const setShoot = (pressed) => (evt) => {
    if (evt) evt.preventDefault();
    input.setShootPressed(pressed);
  };

  ['touchstart', 'touchmove'].forEach(eventName => {
    shootButton.addEventListener(eventName, setShoot(true), { passive: false });
  });
  ['touchend', 'touchcancel'].forEach(eventName => {
    shootButton.addEventListener(eventName, setShoot(false), { passive: false });
  });
  shootButton.addEventListener('mousedown', setShoot(true));
  ['mouseup', 'mouseleave'].forEach(eventName => {
    shootButton.addEventListener(eventName, setShoot(false));
  });

  if (bombButton) {
    const setBomb = (pressed) => (evt) => {
      if (evt) evt.preventDefault();
      input.setBombPressed(pressed);
    };

    ['touchstart', 'touchmove'].forEach(eventName => {
      bombButton.addEventListener(eventName, setBomb(true), { passive: false });
    });
    ['touchend', 'touchcancel'].forEach(eventName => {
      bombButton.addEventListener(eventName, setBomb(false), { passive: false });
    });
    bombButton.addEventListener('mousedown', setBomb(true));
    ['mouseup', 'mouseleave'].forEach(eventName => {
      bombButton.addEventListener(eventName, setBomb(false));
    });
  }
}
