/**
 * RacingGame.js - Main game controller for pseudo-3D racing
 * Coordinates all game systems: road, cars, items, input, audio
 */

import { Road } from './Road.js';
import { RacingCar, AIRacer } from './RacingCar.js';
import { SoundManager } from '../audio/SoundManager.js';
import { InputManager } from '../input/InputManager.js';

export class RacingGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Game systems
    this.road = new Road();
    this.sound = new SoundManager();
    this.input = new InputManager();

    // Cars
    this.player = null;
    this.aiCars = [];
    this.allCars = [];

    // Race settings
    this.totalLaps = 3;
    this.numOpponents = 4;
    this.difficulty = 'normal';

    // Game state
    this.state = 'loading';
    this.raceTime = 0;
    this.countdown = 0;
    this.paused = false;

    // Item boxes
    this.itemBoxes = [];
    this.activeItems = [];

    // UI references
    this.ui = {};

    // Loaded assets
    this.carImages = {};

    // Performance
    this.lastTime = 0;
    this.fps = 60;

    // Debug mode (press 'D' to toggle)
    this.debugMode = false;
  }

  /**
   * Initialize the game
   */
  async init() {
    console.log('Initializing Racing Game...');

    // Setup canvas
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Load assets
    await this.loadAssets();

    // Create track
    this.road.createTrack();

    // Create cars
    this.createCars();

    // Setup UI
    this.setupUI();

    // Setup input
    this.input.init();

    console.log('Game initialized!');
    this.state = 'ready';
    this.showScreen('title-screen');
  }

  /**
   * Resize canvas to fit screen
   */
  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.parentElement.getBoundingClientRect();

    // Skip if dimensions are invalid
    if (rect.width <= 0 || rect.height <= 0) {
      console.warn('Canvas parent has zero dimensions, skipping resize');
      return;
    }

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    // Reset transform before scaling to avoid cumulative scaling
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.width = rect.width;
    this.height = rect.height;
  }

  /**
   * Load all game assets
   */
  async loadAssets() {
    // Load road images
    await this.road.loadImages();

    // Load car images
    const carFiles = [
      { id: 'player', file: 'player_car.png' },
      { id: 'blue', file: 'opponent_car_blue.png' },
      { id: 'yellow', file: 'opponent_car_yellow.png' },
      { id: 'green', file: 'opponent_car_green.png' },
      { id: 'purple', file: 'opponent_car_purple.png' }
    ];

    for (const car of carFiles) {
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Process image to remove light gray background
          this.carImages[car.id] = this.removeImageBackground(img);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load car: ${car.file}`);
          resolve();
        };
        img.src = `assets/images/${car.file}`;
      });
    }

    console.log('Assets loaded');
  }

  /**
   * Remove light gray background from car images
   * Only removes light gray pixels from the top half (sky area)
   */
  removeImageBackground(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const w = canvas.width;
    const h = canvas.height;

    // Remove light gray pixels (background sky)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if pixel is light gray (background)
        // Light gray: R, G, B all similar and > 180
        const isGray = Math.abs(r - g) < 25 &&
                       Math.abs(g - b) < 25 &&
                       Math.abs(r - b) < 25;
        const isBright = r > 180 && g > 180 && b > 180;

        // Also remove very dark pixels at edges (shadows)
        const isDark = r < 50 && g < 50 && b < 50;
        const isEdge = x < 5 || x > w - 5 || y < 5;

        if ((isGray && isBright) || (isDark && isEdge)) {
          data[i + 3] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  /**
   * Create player and AI cars
   */
  createCars() {
    // Player car
    this.player = new RacingCar({
      id: 'player',
      isPlayer: true,
      name: 'YOU',
      maxSpeed: 320,
      acceleration: 100
    });
    this.player.sprite = this.carImages.player;

    // AI cars
    const aiConfigs = [
      { id: 'ai1', name: 'Blue Fury', color: 'blue' },
      { id: 'ai2', name: 'Yellow Flash', color: 'yellow' },
      { id: 'ai3', name: 'Green Storm', color: 'green' },
      { id: 'ai4', name: 'Purple Haze', color: 'purple' }
    ];

    this.aiCars = [];
    for (let i = 0; i < this.numOpponents; i++) {
      const config = aiConfigs[i];
      const ai = new AIRacer({
        id: config.id,
        name: config.name,
        difficulty: this.difficulty,
        maxSpeed: 300 + Math.random() * 40,
        acceleration: 90 + Math.random() * 20
      });
      ai.sprite = this.carImages[config.color];
      this.aiCars.push(ai);
    }

    this.allCars = [this.player, ...this.aiCars];
  }

  /**
   * Setup UI event handlers
   */
  setupUI() {
    // Cache UI elements
    this.ui = {
      position: document.getElementById('current-position'),
      lap: document.getElementById('current-lap'),
      speedFill: document.getElementById('speed-fill'),
      itemBox: document.getElementById('item-box'),
      itemIcon: document.getElementById('item-icon'),
      boostIndicator: document.getElementById('boost-indicator'),
      lapPopup: document.getElementById('lap-popup'),
      lapCompleteNum: document.getElementById('lap-complete-num'),
      lapTime: document.getElementById('lap-time'),
      countdownDisplay: document.getElementById('countdown-display'),
      wrongWay: document.getElementById('wrong-way'),
      resultTime: document.getElementById('result-time'),
      resultBestLap: document.getElementById('result-best-lap')
    };

    // Button handlers
    document.getElementById('btn-start')?.addEventListener('click', () => this.startRace());
    document.getElementById('btn-pause')?.addEventListener('click', () => this.togglePause());
    document.getElementById('btn-resume')?.addEventListener('click', () => this.togglePause());
    document.getElementById('btn-restart')?.addEventListener('click', () => this.restartRace());
    document.getElementById('btn-quit')?.addEventListener('click', () => this.quitToTitle());
    document.getElementById('btn-race-again')?.addEventListener('click', () => this.restartRace());
    document.getElementById('btn-back-title')?.addEventListener('click', () => this.quitToTitle());

    // Settings
    document.getElementById('btn-settings')?.addEventListener('click', () => this.showScreen('settings-screen'));
    document.getElementById('btn-settings-back')?.addEventListener('click', () => this.showScreen('title-screen'));
    document.getElementById('btn-how-to')?.addEventListener('click', () => this.showScreen('howto-screen'));
    document.getElementById('btn-howto-back')?.addEventListener('click', () => this.showScreen('title-screen'));

    // Control mode
    document.getElementById('control-gyro')?.addEventListener('click', () => this.setControlMode('gyro'));
    document.getElementById('control-touch')?.addEventListener('click', () => this.setControlMode('touch'));

    // Sensitivity slider
    document.getElementById('sensitivity-slider')?.addEventListener('input', (e) => {
      this.input.sensitivity = parseFloat(e.target.value);
      document.getElementById('sensitivity-value').textContent = e.target.value;
    });

    // Difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.diff;
      });
    });

    // Item use (touch/click on item box)
    document.getElementById('item-box')?.addEventListener('click', () => this.useItem());
    document.getElementById('btn-use-item')?.addEventListener('click', () => this.useItem());
    document.getElementById('btn-item-gyro')?.addEventListener('click', () => this.useItem());

    // Debug mode toggle (press 'D')
    window.addEventListener('keydown', (e) => {
      if (e.key === 'd' || e.key === 'D') {
        this.debugMode = !this.debugMode;
        console.log(`Debug mode: ${this.debugMode ? 'ON' : 'OFF'}`);
      }
    });
  }

  /**
   * Show a specific screen
   */
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId)?.classList.add('active');
  }

  /**
   * Show/hide overlay
   */
  showOverlay(overlayId, show = true) {
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      overlay.classList.toggle('active', show);
    }
  }

  /**
   * Set control mode
   */
  setControlMode(mode) {
    const gyroBtn = document.getElementById('control-gyro');
    const touchBtn = document.getElementById('control-touch');
    const sensitivityGroup = document.getElementById('sensitivity-group');
    const touchControls = document.getElementById('touch-controls');
    const gyroControls = document.getElementById('gyro-controls');

    if (mode === 'gyro') {
      gyroBtn?.classList.add('active');
      touchBtn?.classList.remove('active');
      sensitivityGroup?.style.setProperty('display', 'block');
      touchControls?.classList.remove('active');
      gyroControls?.classList.add('active');
      this.input.useGyro = true;
      this.input.requestGyroPermission();
    } else {
      gyroBtn?.classList.remove('active');
      touchBtn?.classList.add('active');
      sensitivityGroup?.style.setProperty('display', 'none');
      touchControls?.classList.add('active');
      gyroControls?.classList.remove('active');
      this.input.useGyro = false;
    }
  }

  /**
   * Start a new race
   */
  async startRace() {
    console.log('Starting race...');

    // Initialize sound (must be from user gesture)
    await this.sound.init();

    // Request gyro permission if enabled
    if (this.input.useGyro) {
      await this.input.requestGyroPermission();
    }

    // Reset cars
    this.player.reset(0);
    this.aiCars.forEach((ai, i) => {
      ai.reset(-200 - (i * 150));
    });

    // Place item boxes
    this.placeItemBoxes();

    // Show game screen
    this.showScreen('game-screen');

    // IMPORTANT: Wait for the next frame to ensure the screen is fully visible
    // This is needed because some browsers don't update layout immediately
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));

    // IMPORTANT: Resize canvas AFTER showing game screen
    // The canvas parent has 0 dimensions when hidden
    this.resizeCanvas();
    console.log(`Canvas resized: ${this.width}x${this.height}`);

    // Retry resize if dimensions are still 0
    if (this.width <= 0 || this.height <= 0) {
      console.warn('Canvas still has zero dimensions, retrying...');
      await this.delay(100);
      this.resizeCanvas();
      console.log(`Canvas resized (retry): ${this.width}x${this.height}`);
    }

    // Start countdown
    this.state = 'countdown';
    this.countdown = 4;
    this.raceTime = 0;

    // Start game loop
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);

    // Countdown sequence
    this.runCountdown();
  }

  /**
   * Run countdown sequence
   */
  async runCountdown() {
    this.showOverlay('countdown-overlay', true);

    const countdownEl = this.ui.countdownDisplay?.querySelector('.countdown-number');
    const lights = document.querySelectorAll('.countdown-lights .light');

    for (let i = 3; i >= 0; i--) {
      if (countdownEl) {
        countdownEl.textContent = i === 0 ? 'GO!' : i;
        countdownEl.classList.remove('animate');
        void countdownEl.offsetWidth;
        countdownEl.classList.add('animate');
      }

      // Light up countdown lights
      if (i > 0 && lights[3 - i]) {
        lights[3 - i].classList.add('active');
      }

      this.sound?.playCountdown?.(i === 0);

      await this.delay(1000);
    }

    // Clear lights and start race
    lights.forEach(l => l.classList.remove('active'));
    this.showOverlay('countdown-overlay', false);
    this.state = 'racing';
    this.sound?.playBGM?.('bgmRace');
  }

  /**
   * Place item boxes on the track
   */
  placeItemBoxes() {
    this.itemBoxes = [];
    const trackLength = this.road.totalLength;
    const numBoxes = 8;

    for (let i = 0; i < numBoxes; i++) {
      const z = (trackLength / numBoxes) * i + 1000;
      this.itemBoxes.push({
        z: z % trackLength,
        x: (Math.random() - 0.5) * 1.5,
        active: true,
        respawnTime: 0
      });
    }
  }

  /**
   * Main game loop
   */
  gameLoop(timestamp) {
    if (this.state === 'loading' || this.state === 'ready') return;

    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;

    if (!this.paused && this.state !== 'finished') {
      this.update(dt);
    }

    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  /**
   * Update game state
   */
  update(dt) {
    if (this.state !== 'racing') return;

    this.raceTime += dt;

    // Update player
    const playerInput = this.getPlayerInput();
    this.player.update(dt, playerInput, this.road);

    // Update AI cars
    for (const ai of this.aiCars) {
      const aiInput = ai.updateAI(dt, this.road, this.allCars);
      ai.update(dt, aiInput, this.road);
    }

    // Check collisions
    this.checkCollisions();

    // Check item box collection
    this.checkItemBoxes();

    // Update item boxes
    this.updateItemBoxes(dt);

    // Update active items
    this.updateActiveItems(dt);

    // Update positions
    this.updatePositions();

    // Check for race finish
    this.checkRaceFinish();

    // Update HUD
    this.updateHUD();

    // Assign cars to road segments for rendering
    this.updateCarSegments();
  }

  /**
   * Get player input
   */
  getPlayerInput() {
    const input = this.input.getInput();

    // Check touch controls
    const leftBtn = document.getElementById('btn-steer-left');
    const rightBtn = document.getElementById('btn-steer-right');
    const accelBtn = document.getElementById('btn-accel');
    const brakeBtn = document.getElementById('btn-brake');

    let touchSteer = 0;
    if (leftBtn?.matches(':active')) touchSteer -= 1;
    if (rightBtn?.matches(':active')) touchSteer += 1;

    return {
      steer: this.input.useGyro ? input.steer : touchSteer,
      accelerate: this.input.useGyro || accelBtn?.matches(':active') || true,
      brake: brakeBtn?.matches(':active') || false
    };
  }

  /**
   * Check car collisions
   */
  checkCollisions() {
    for (let i = 0; i < this.allCars.length; i++) {
      for (let j = i + 1; j < this.allCars.length; j++) {
        const car1 = this.allCars[i];
        const car2 = this.allCars[j];

        const xDist = Math.abs(car1.x - car2.x);
        const zDist = Math.abs(car1.z - car2.z);

        if (xDist < car1.width + car2.width && zDist < 50) {
          car1.collideWith(car2);
          car2.collideWith(car1);
        }
      }
    }
  }

  /**
   * Check item box collection
   */
  checkItemBoxes() {
    for (const box of this.itemBoxes) {
      if (!box.active) continue;

      const zDist = Math.abs(this.player.z - box.z);
      const xDist = Math.abs(this.player.x - box.x);

      if (zDist < 50 && xDist < 0.3 && !this.player.currentItem) {
        box.active = false;
        box.respawnTime = 5;
        this.giveRandomItem();
      }
    }
  }

  /**
   * Give random item to player
   */
  giveRandomItem() {
    const items = [
      { id: 'mushroom', name: 'Speed Boost', icon: '🍄' },
      { id: 'banana', name: 'Banana', icon: '🍌' },
      { id: 'shell', name: 'Shell', icon: '🐚' },
      { id: 'star', name: 'Star', icon: '⭐' }
    ];

    // Weight items based on position
    let weights = [0.4, 0.3, 0.2, 0.1];
    if (this.player.position > 2) {
      weights = [0.5, 0.2, 0.15, 0.15];
    }
    if (this.player.position > 3) {
      weights = [0.6, 0.15, 0.1, 0.15];
    }

    const rand = Math.random();
    let sum = 0;
    let selectedItem = items[0];

    for (let i = 0; i < items.length; i++) {
      sum += weights[i];
      if (rand < sum) {
        selectedItem = items[i];
        break;
      }
    }

    this.player.setItem(selectedItem);
    this.updateItemUI();
    this.sound?.playItem?.();
  }

  /**
   * Use current item
   */
  useItem() {
    const item = this.player.useItem();
    if (!item) return;

    switch (item.id) {
      case 'mushroom':
        this.player.applyBoost(1.8, 1.5);
        this.sound?.playBoost?.();
        break;
      case 'banana':
        this.activeItems.push({
          type: 'banana',
          z: this.player.z - 100,
          x: this.player.x,
          active: true
        });
        break;
      case 'shell':
        this.activeItems.push({
          type: 'shell',
          z: this.player.z,
          x: this.player.x,
          speed: 500,
          active: true
        });
        break;
      case 'star':
        this.player.makeInvincible(8);
        this.player.applyBoost(1.3, 8);
        this.sound?.playPowerUp?.();
        break;
    }

    this.updateItemUI();
  }

  /**
   * Update item boxes
   */
  updateItemBoxes(dt) {
    for (const box of this.itemBoxes) {
      if (!box.active) {
        box.respawnTime -= dt;
        if (box.respawnTime <= 0) {
          box.active = true;
        }
      }
    }
  }

  /**
   * Update active items (shells, bananas)
   */
  updateActiveItems(dt) {
    for (const item of this.activeItems) {
      if (!item.active) continue;

      if (item.type === 'shell') {
        item.z += item.speed * dt;

        // Check collision with AI cars
        for (const ai of this.aiCars) {
          const zDist = Math.abs(ai.z - item.z);
          const xDist = Math.abs(ai.x - item.x);

          if (zDist < 50 && xDist < 0.3) {
            ai.crash(1.5);
            item.active = false;
            this.sound?.playHit?.();
          }
        }

        // Remove if too far
        if (item.z > this.player.z + 2000) {
          item.active = false;
        }
      }

      if (item.type === 'banana') {
        // Check player collision
        const zDist = Math.abs(this.player.z - item.z);
        const xDist = Math.abs(this.player.x - item.x);

        if (zDist < 30 && xDist < 0.2 && !this.player.invincible) {
          this.player.crash(1);
          item.active = false;
          this.sound?.playHit?.();
        }

        // Check AI collision
        for (const ai of this.aiCars) {
          const aiZDist = Math.abs(ai.z - item.z);
          const aiXDist = Math.abs(ai.x - item.x);

          if (aiZDist < 30 && aiXDist < 0.2) {
            ai.crash(1);
            item.active = false;
          }
        }
      }
    }

    // Remove inactive items
    this.activeItems = this.activeItems.filter(i => i.active);
  }

  /**
   * Update race positions
   */
  updatePositions() {
    // Sort by total distance
    const sorted = [...this.allCars].sort((a, b) => {
      const aTotal = a.lap * this.road.totalLength + a.z;
      const bTotal = b.lap * this.road.totalLength + b.z;
      return bTotal - aTotal;
    });

    sorted.forEach((car, i) => {
      car.position = i + 1;
    });
  }

  /**
   * Check if race is finished
   */
  checkRaceFinish() {
    if (this.player.lap > this.totalLaps && !this.player.finished) {
      this.player.finish(this.raceTime);
      this.finishRace();
    }

    // Finish AI if they complete
    for (const ai of this.aiCars) {
      if (ai.lap > this.totalLaps && !ai.finished) {
        ai.finish(this.raceTime);
      }
    }
  }

  /**
   * Finish the race
   */
  finishRace() {
    this.state = 'finished';
    this.sound?.stopBGM?.();
    this.sound?.playFinish?.();

    // Update results screen
    const position = this.player.position;
    const titleEl = document.querySelector('.results-title');
    if (titleEl) {
      const suffixes = ['ST', 'ND', 'RD', 'TH', 'TH'];
      titleEl.textContent = position <= 3
        ? `🏆 ${position}${suffixes[position - 1]} PLACE! 🏆`
        : `${position}${suffixes[position - 1]} PLACE`;
      titleEl.className = `results-title ${position === 1 ? 'victory' : ''}`;
    }

    if (this.ui.resultTime) {
      this.ui.resultTime.textContent = this.formatTime(this.player.getTotalTime());
    }
    if (this.ui.resultBestLap) {
      this.ui.resultBestLap.textContent = this.formatTime(this.player.getBestLap());
    }

    // Show results after delay
    setTimeout(() => {
      this.showScreen('results-screen');
    }, 2000);
  }

  /**
   * Update car segments for rendering
   */
  updateCarSegments() {
    // Clear all car references
    for (const segment of this.road.segments) {
      segment.cars = [];
    }

    // Assign cars to segments
    for (const car of this.allCars) {
      const segment = this.road.getSegment(car.z);
      if (segment) {
        segment.cars.push(car.getRenderInfo());
      }
    }
  }

  /**
   * Update HUD elements
   */
  updateHUD() {
    // Position
    if (this.ui.position) {
      const suffixes = ['ST', 'ND', 'RD', 'TH', 'TH'];
      this.ui.position.textContent = this.player.position;
      const suffix = document.querySelector('.position-suffix');
      if (suffix) suffix.textContent = suffixes[this.player.position - 1];
    }

    // Lap
    if (this.ui.lap) {
      this.ui.lap.textContent = Math.min(this.player.lap, this.totalLaps);
    }

    // Speed
    if (this.ui.speedFill) {
      const speedPercent = (this.player.speed / this.player.maxSpeed) * 100;
      this.ui.speedFill.style.width = `${speedPercent}%`;
    }

    // Boost indicator
    if (this.ui.boostIndicator) {
      if (this.player.boostMultiplier > 1) {
        this.ui.boostIndicator.classList.add('active');
      } else {
        this.ui.boostIndicator.classList.remove('active');
      }
    }

    // Drift indicator
    if (this.player.drifting) {
      document.body.classList.add('drifting');
    } else {
      document.body.classList.remove('drifting');
    }
  }

  /**
   * Update item UI
   */
  updateItemUI() {
    if (this.ui.itemBox && this.ui.itemIcon) {
      if (this.player.currentItem) {
        this.ui.itemBox.classList.remove('empty');
        this.ui.itemIcon.textContent = this.player.currentItem.icon;
      } else {
        this.ui.itemBox.classList.add('empty');
        this.ui.itemIcon.textContent = '?';
      }
    }
  }

  /**
   * Render the game
   */
  render() {
    // Skip rendering if dimensions are invalid
    if (!this.width || !this.height || this.width <= 0 || this.height <= 0) {
      console.warn('Render skipped: invalid dimensions', this.width, this.height);
      // Try to fix dimensions
      this.resizeCanvas();
      return;
    }

    const ctx = this.ctx;

    // Clear canvas
    ctx.clearRect(0, 0, this.width, this.height);

    // Debug: Draw a colored rectangle to confirm canvas is rendering
    if (this.debugMode) {
      ctx.fillStyle = '#FF00FF';
      ctx.fillRect(10, 10, 50, 50);
      ctx.fillStyle = '#FFF';
      ctx.font = '12px Arial';
      ctx.fillText(`Canvas: ${this.width}x${this.height}`, 10, 80);
      ctx.fillText(`State: ${this.state}`, 10, 95);
      ctx.fillText(`Player Z: ${this.player?.z?.toFixed(0) || 'N/A'}`, 10, 110);
    }

    // Render road
    this.road.render(
      ctx,
      this.width,
      this.height,
      this.player.x,
      this.player.z,
      0
    );

    // Render player car (at bottom of screen)
    this.renderPlayerCar(ctx);

    // Render item boxes
    this.renderItemBoxes(ctx);

    // Render HUD effects
    this.renderEffects(ctx);
  }

  /**
   * Render player car
   */
  renderPlayerCar(ctx) {
    if (!this.player.sprite) return;

    const img = this.player.sprite;
    // Scale car to fit screen - target ~20% of screen height
    const targetHeight = this.height * 0.22;
    const scale = targetHeight / img.height;
    const w = img.width * scale;
    const h = img.height * scale;
    // Position car in the lower-center of the visible road area
    const x = this.width / 2 - w / 2 + (this.player.x * 80);
    const y = this.height * 0.55; // Position at 55% from top (on the road)

    // Tilt car based on steering
    const input = this.input.getInput();
    const tilt = input.steer * 8;

    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(tilt * Math.PI / 180);

    // Flash if invincible
    if (this.player.invincible && Math.floor(Date.now() / 100) % 2) {
      ctx.globalAlpha = 0.5;
    }

    ctx.drawImage(img, -w / 2, -h / 2, w, h);
    ctx.restore();

    // Drift sparks
    if (this.player.drifting) {
      this.renderDriftSparks(ctx, x, y + h, this.player.driftCharge);
    }
  }

  /**
   * Render drift sparks
   */
  renderDriftSparks(ctx, x, y, charge) {
    const colors = charge >= 2 ? ['#ff0', '#f00'] : ['#ff0', '#f80'];

    for (let i = 0; i < 5; i++) {
      const sx = x + (Math.random() - 0.5) * 60;
      const sy = y + Math.random() * 10;
      const size = 2 + Math.random() * 3;

      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /**
   * Render item boxes
   */
  renderItemBoxes(ctx) {
    const playerZ = this.player.z;

    for (const box of this.itemBoxes) {
      if (!box.active) continue;

      const relZ = box.z - playerZ;
      if (relZ < 0 || relZ > 3000) continue;

      const segment = this.road.getSegment(box.z);
      if (!segment || !segment.p1.screen.scale) continue;

      const scale = segment.p1.screen.scale * 50;
      const x = segment.p1.screen.x + (box.x * segment.p1.screen.w);
      const y = segment.p1.screen.y - scale;

      // Draw item box
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;

      const size = scale * 0.8;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
      ctx.strokeRect(x - size / 2, y - size / 2, size, size);

      // Question mark
      ctx.fillStyle = '#ff0';
      ctx.font = `${Math.max(10, size * 0.6)}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', x, y);
    }
  }

  /**
   * Render HUD effects
   */
  renderEffects(ctx) {
    // Speed lines at high speed
    if (this.player.speed > this.player.maxSpeed * 0.8) {
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 5; i++) {
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - 20, y + 50);
        ctx.stroke();
      }
    }

    // Boost effect
    if (this.player.boostMultiplier > 1) {
      const gradient = ctx.createRadialGradient(
        this.width / 2, this.height, 0,
        this.width / 2, this.height, this.width / 2
      );
      gradient.addColorStop(0, 'rgba(255,150,0,0.3)');
      gradient.addColorStop(1, 'rgba(255,150,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }

  /**
   * Format time as M:SS.mm
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toFixed(2).padStart(5, '0')}`;
  }

  /**
   * Toggle pause
   */
  togglePause() {
    this.paused = !this.paused;
    this.showOverlay('pause-overlay', this.paused);

    if (this.paused) {
      this.sound?.pauseBGM?.();
    } else {
      this.sound?.resumeBGM?.();
    }
  }

  /**
   * Restart race
   */
  restartRace() {
    this.showOverlay('pause-overlay', false);
    this.paused = false;
    this.state = 'ready';
    this.sound?.stopBGM?.();
    this.startRace();
  }

  /**
   * Quit to title screen
   */
  quitToTitle() {
    this.state = 'ready';
    this.paused = false;
    this.sound?.stopBGM?.();
    this.showOverlay('pause-overlay', false);
    this.showScreen('title-screen');
  }

  /**
   * Delay helper
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
