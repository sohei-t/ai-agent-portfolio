/**
 * main.js - Game Entry Point
 * Initializes the game and handles screen transitions
 */

import { GameCore, GameState } from './core/GameCore.js';
import { AssetLoader } from './utils/AssetLoader.js';

class CarBattleChase {
  constructor() {
    // Get DOM elements
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Screens
    this.screens = {
      loading: document.getElementById('loading-screen'),
      title: document.getElementById('title-screen'),
      settings: document.getElementById('settings-screen'),
      game: document.getElementById('game-screen'),
      pause: document.getElementById('pause-screen'),
      gameover: document.getElementById('gameover-screen'),
      victory: document.getElementById('victory-screen'),
      countdown: document.getElementById('countdown-overlay')
    };

    // Game instance
    this.game = null;
    this.assetLoader = new AssetLoader();

    // Settings
    this.settings = {
      difficulty: 'normal',
      bgmVolume: 0.5,
      sfxVolume: 0.7,
      controlMode: 'joystick'
    };

    // Load settings from localStorage
    this.loadSettings();

    // Initialize
    this.init();
  }

  /**
   * Initialize the game
   */
  async init() {
    console.log('Car Battle Chase initializing...');

    // Show loading screen
    this.showScreen('loading');

    // Setup canvas
    this.setupCanvas();

    // Load assets
    await this.loadAssets();

    // Create game instance
    this.game = new GameCore(this.canvas);

    // Setup game callbacks
    this.setupGameCallbacks();

    // Setup UI event listeners
    this.setupUIListeners();

    // Start game engine
    await this.game.start();

    // Show title screen
    this.showScreen('title');

    console.log('Game initialized successfully');
  }

  /**
   * Setup canvas
   */
  setupCanvas() {
    const resize = () => {
      const container = document.getElementById('game-screen');
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', resize);
    resize();
  }

  /**
   * Load game assets
   */
  async loadAssets() {
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');

    this.assetLoader.onProgress = (loaded, total, current) => {
      const percent = (loaded / total) * 100;
      progressBar.style.width = `${percent}%`;
      loadingText.textContent = `Loading ${current}...`;
    };

    // Define assets to load
    const images = {
      // Player car
      player: 'assets/images/player_car.svg',

      // Enemy cars
      enemy_easy: 'assets/images/enemy_car_green.svg',
      enemy_normal: 'assets/images/enemy_car_orange.svg',
      enemy_hard: 'assets/images/enemy_car_red.svg',

      // Weapons
      bomb: 'assets/images/bomb.svg',
      missile: 'assets/images/missile.svg',
      explosion: 'assets/images/explosion.svg',

      // Power-ups
      powerup_health: 'assets/images/powerup_health.svg',
      powerup_speed: 'assets/images/powerup_speed.svg',
      powerup_shield: 'assets/images/powerup_shield.svg',
      powerup_ammo: 'assets/images/powerup_ammo.svg',

      // UI
      heart: 'assets/images/heart.svg',
      background: 'assets/images/background.svg'
    };

    // Load images (with SVG fallback)
    await this.assetLoader.loadImages(images);

    // Short delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 500));

    loadingText.textContent = 'Ready!';
  }

  /**
   * Setup game callbacks
   */
  setupGameCallbacks() {
    // State change handler
    this.game.onStateChange = (newState, prevState) => {
      this.handleStateChange(newState, prevState);
    };

    // Game over handler
    this.game.onGameOver = (stats) => {
      this.handleGameOver(stats);
    };

    // Victory handler
    this.game.onVictory = (stats) => {
      this.handleVictory(stats);
    };
  }

  /**
   * Handle game state changes
   */
  handleStateChange(newState, prevState) {
    switch (newState) {
      case GameState.TITLE:
        this.showScreen('title');
        break;

      case GameState.SETTINGS:
        this.showScreen('settings');
        break;

      case GameState.COUNTDOWN:
        this.showScreen('game');
        break;

      case GameState.PLAYING:
        this.hideScreen('countdown');
        break;

      case GameState.PAUSED:
        this.showScreen('pause');
        break;

      case GameState.GAMEOVER:
        this.showScreen('gameover');
        break;

      case GameState.VICTORY:
        this.showScreen('victory');
        break;
    }

    // Hide pause screen when resuming
    if (prevState === GameState.PAUSED && newState === GameState.PLAYING) {
      this.hideScreen('pause');
    }
  }

  /**
   * Handle game over
   */
  handleGameOver(stats) {
    document.getElementById('final-score').textContent = stats.score;
    document.getElementById('enemies-defeated').textContent = stats.enemiesDefeated;
    document.getElementById('survival-time').textContent = this.formatTime(stats.gameTime);
  }

  /**
   * Handle victory
   */
  handleVictory(stats) {
    document.getElementById('victory-score').textContent = stats.score;
  }

  /**
   * Format time as MM:SS
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Setup UI event listeners
   */
  setupUIListeners() {
    // Title screen buttons
    document.getElementById('btn-start').addEventListener('click', () => {
      this.initAudioAndStart();
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
      this.game.setState(GameState.SETTINGS);
    });

    // Settings screen
    document.getElementById('btn-settings-back').addEventListener('click', () => {
      this.saveSettings();
      this.game.setState(GameState.TITLE);
    });

    // Difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.settings.difficulty = e.target.dataset.diff;
        this.game.setDifficulty(this.settings.difficulty);
      });
    });

    // Volume sliders
    document.getElementById('bgm-volume').addEventListener('input', (e) => {
      this.settings.bgmVolume = parseFloat(e.target.value) / 100;
      this.game.soundSystem.setBgmVolume(this.settings.bgmVolume);
      e.target.nextElementSibling.textContent = `${e.target.value}%`;
    });

    document.getElementById('sfx-volume').addEventListener('input', (e) => {
      this.settings.sfxVolume = parseFloat(e.target.value) / 100;
      this.game.soundSystem.setSfxVolume(this.settings.sfxVolume);
      e.target.nextElementSibling.textContent = `${e.target.value}%`;
    });

    // Control mode buttons
    document.getElementById('control-joystick').addEventListener('click', () => {
      document.getElementById('control-joystick').classList.add('active');
      document.getElementById('control-gyro').classList.remove('active');
      this.settings.controlMode = 'joystick';
      this.game.inputSystem.setMode('joystick');
    });

    document.getElementById('control-gyro').addEventListener('click', async () => {
      const success = await this.game.inputSystem.requestGyroPermission();
      if (success) {
        document.getElementById('control-gyro').classList.add('active');
        document.getElementById('control-joystick').classList.remove('active');
        this.settings.controlMode = 'gyro';
        document.getElementById('gyro-status').textContent = 'Gyro enabled!';
      } else {
        document.getElementById('gyro-status').textContent = 'Gyro permission denied or not available';
      }
    });

    // Pause screen buttons
    document.getElementById('btn-resume').addEventListener('click', () => {
      this.game.togglePause();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      this.hideScreen('pause');
      this.game.startGame();
    });

    document.getElementById('btn-quit').addEventListener('click', () => {
      this.hideScreen('pause');
      this.game.setState(GameState.TITLE);
    });

    // Game over screen buttons
    document.getElementById('btn-retry').addEventListener('click', () => {
      this.hideScreen('gameover');
      this.game.startGame();
    });

    document.getElementById('btn-title').addEventListener('click', () => {
      this.hideScreen('gameover');
      this.game.setState(GameState.TITLE);
    });

    // Victory screen buttons
    document.getElementById('btn-next').addEventListener('click', () => {
      this.hideScreen('victory');
      this.game.startGame();
    });

    document.getElementById('btn-victory-title').addEventListener('click', () => {
      this.hideScreen('victory');
      this.game.setState(GameState.TITLE);
    });

    // Pause button
    document.getElementById('btn-pause').addEventListener('click', () => {
      this.game.togglePause();
    });

    // Action buttons
    document.getElementById('btn-bomb').addEventListener('click', () => {
      this.game.inputSystem.triggerAction('bomb');
    });

    document.getElementById('btn-missile').addEventListener('click', () => {
      this.game.inputSystem.triggerAction('missile');
    });

    // Touch event handling for canvas
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.game.inputSystem.handleTouchStart(e);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.game.inputSystem.handleTouchMove(e);
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      this.game.inputSystem.handleTouchEnd(e);
    });

    this.canvas.addEventListener('touchcancel', (e) => {
      this.game.inputSystem.handleTouchEnd(e);
    });
  }

  /**
   * Initialize audio and start game
   * Must be called from user gesture for mobile audio
   */
  async initAudioAndStart() {
    // Resume audio context (required for mobile)
    await this.game.soundSystem.resume();

    // Request gyro permission if control mode is gyro
    if (this.settings.controlMode === 'gyro') {
      await this.game.inputSystem.requestGyroPermission();
    }

    // Play button sound
    this.game.soundSystem.playSfx('sfx_button');

    // Apply settings and start
    this.game.setDifficulty(this.settings.difficulty);
    this.game.startGame();
  }

  /**
   * Apply control mode setting
   */
  async applyControlMode() {
    if (this.settings.controlMode === 'gyro') {
      const success = await this.game.inputSystem.requestGyroPermission();
      if (!success) {
        // Fall back to joystick if gyro permission denied
        this.settings.controlMode = 'joystick';
        document.getElementById('control-joystick').classList.add('active');
        document.getElementById('control-gyro').classList.remove('active');
      }
    } else {
      this.game.inputSystem.setMode(this.settings.controlMode);
    }
  }

  /**
   * Show screen
   */
  showScreen(screenId) {
    const screen = this.screens[screenId];
    if (screen) {
      screen.classList.add('active');
    }
  }

  /**
   * Hide screen
   */
  hideScreen(screenId) {
    const screen = this.screens[screenId];
    if (screen) {
      screen.classList.remove('active');
    }
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem('carBattleChaseSettings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }

    // Apply loaded settings to UI
    setTimeout(() => {
      // Difficulty
      document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.diff === this.settings.difficulty);
      });

      // Volume
      const bgmSlider = document.getElementById('bgm-volume');
      const sfxSlider = document.getElementById('sfx-volume');
      if (bgmSlider) {
        bgmSlider.value = this.settings.bgmVolume * 100;
        bgmSlider.nextElementSibling.textContent = `${Math.round(this.settings.bgmVolume * 100)}%`;
      }
      if (sfxSlider) {
        sfxSlider.value = this.settings.sfxVolume * 100;
        sfxSlider.nextElementSibling.textContent = `${Math.round(this.settings.sfxVolume * 100)}%`;
      }

      // Control mode
      document.getElementById('control-joystick').classList.toggle('active', this.settings.controlMode === 'joystick');
      document.getElementById('control-gyro').classList.toggle('active', this.settings.controlMode === 'gyro');
    }, 0);
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem('carBattleChaseSettings', JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.game = new CarBattleChase();
});
