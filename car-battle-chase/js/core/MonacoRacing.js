/**
 * MonacoRacing.js - SEGA Monaco GP Style Vertical Scrolling Racing
 *
 * Features:
 * - Top-down view with camera directly above player
 * - Vertical scrolling (road comes toward player)
 * - Long continuous course (not circular)
 * - Road narrows/widens
 * - Obstacles: other cars, puddles, oil slicks
 * - Day/night transitions with headlights
 * - Time-based gameplay
 * - Smartphone tilt controls (gyroscope)
 */

import { GyroControls } from '../controls/GyroControls.js';
import { SoundSystem } from '../audio/SoundSystem.js';
import { AssetLoader } from '../assets/AssetLoader.js';

export class MonacoRacing {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Asset and Sound systems
    this.soundSystem = new SoundSystem();
    this.assetLoader = new AssetLoader();
    this.assetsLoaded = false;

    // Game dimensions
    this.width = 0;
    this.height = 0;

    // Road properties
    this.roadWidth = 300;           // Base road width
    this.roadMinWidth = 150;        // Minimum road width (narrow sections)
    this.roadMaxWidth = 400;        // Maximum road width (wide sections)
    this.roadCenterX = 0;           // Road center position (shifts for curves)
    this.roadSegments = [];         // Road segment data
    this.segmentHeight = 20;        // Height of each road segment
    this.visibleSegments = 50;      // More segments visible for wider view (was 40)

    // Scrolling - SLOWED DOWN for better playability
    this.scrollSpeed = 0;           // Current scroll speed
    this.baseScrollSpeed = 150;     // Base pixels per second (was 400)
    this.maxScrollSpeed = 350;      // Maximum speed (was 800)
    this.distance = 0;              // Total distance traveled

    // Player car - smaller for better visibility
    this.player = {
      x: 0,                         // Horizontal position
      y: 0,                         // Vertical position (fixed near bottom)
      width: 32,                    // Smaller car (was 40)
      height: 56,                   // Smaller car (was 70)
      speed: 0,                     // 0-1 acceleration
      angle: 0,                     // Rotation from steering
      spinning: false,
      spinTime: 0,
      invincible: false,
      invincibleTime: 0
    };

    // Traffic (AI cars)
    this.traffic = [];
    this.trafficSpawnTimer = 0;
    this.trafficSpawnInterval = 1.5; // Seconds between spawns

    // Obstacles
    this.obstacles = [];            // Puddles, oil slicks, etc.
    this.obstacleSpawnTimer = 0;

    // Game state - LAP-BASED (not time-based)
    this.state = 'ready';           // ready, countdown, racing, finished, gameover
    this.totalLaps = 3;             // Race is 3 laps
    this.currentLap = 1;
    this.lapDistance = 0;           // Distance in current lap
    this.lapTimes = [];             // Array of lap times in seconds
    this.currentLapTime = 0;        // Current lap timer
    this.totalTime = 0;             // Total race time
    this.bestLapTime = parseFloat(localStorage.getItem('bestLapTime') || '999');
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('monacoHighScore') || '0');
    this.carsOvertaken = 0;

    // Selected course
    this.selectedCourse = 0;

    // Visual effects
    this.dayNightCycle = 0;         // 0 = day, 1 = night
    this.isNight = false;
    this.headlightRadius = 200;
    this.screenShake = 0;

    // Input
    this.keys = { left: false, right: false, up: false, down: false };
    this.touchX = 0;                // -1 to 1 for touch steering
    this.touchAccel = false;
    this.touchBrake = false;

    // Gyro controls
    this.gyroControls = new GyroControls();
    this.controlMode = 'touch';     // 'touch' or 'gyro'
    this.gyroEnabled = false;

    // Item system
    this.item = null;               // Current item
    this.itemCooldown = 0;
    this.itemTypes = ['boost', 'shield', 'slowmo'];
    this.itemSpawnTimer = 0;
    this.itemSpawnInterval = 15;    // Seconds between item spawns
    this.itemPickups = [];          // Items on track

    // Multiple course configurations
    this.courses = [
      {
        name: 'City Grand Prix',
        description: 'Urban streets and downtown tunnels',
        zones: [
          { name: 'Downtown', length: 3000, baseWidth: 320, curve: 0.2, surface: 'asphalt', night: false, scenery: 'city' },
          { name: 'Business District', length: 2500, baseWidth: 280, curve: 0.4, surface: 'asphalt', night: false, scenery: 'city' },
          { name: 'Underground', length: 2000, baseWidth: 240, curve: 0.3, surface: 'asphalt', night: true, scenery: 'tunnel' },
          { name: 'Park Avenue', length: 2500, baseWidth: 350, curve: 0.1, surface: 'asphalt', night: false, scenery: 'city' }
        ]
      },
      {
        name: 'Coastal Highway',
        description: 'Seaside roads with ocean views',
        zones: [
          { name: 'Beach Road', length: 3000, baseWidth: 350, curve: 0.3, surface: 'asphalt', night: false, scenery: 'coastal' },
          { name: 'Cliff Side', length: 2500, baseWidth: 250, curve: 0.6, surface: 'asphalt', night: false, scenery: 'mountain' },
          { name: 'Seaside Town', length: 2000, baseWidth: 300, curve: 0.2, surface: 'asphalt', night: false, scenery: 'city' },
          { name: 'Sunset Strip', length: 2500, baseWidth: 380, curve: 0.4, surface: 'asphalt', night: false, scenery: 'coastal' }
        ]
      },
      {
        name: 'Mountain Challenge',
        description: 'Treacherous mountain passes',
        zones: [
          { name: 'Forest Road', length: 2500, baseWidth: 300, curve: 0.3, surface: 'asphalt', night: false, scenery: 'mountain' },
          { name: 'Alpine Pass', length: 3000, baseWidth: 220, curve: 0.7, surface: 'asphalt', night: false, scenery: 'mountain' },
          { name: 'Ice Bridge', length: 2000, baseWidth: 200, curve: 0.2, surface: 'ice', night: false, scenery: 'ice' },
          { name: 'Summit', length: 2500, baseWidth: 280, curve: 0.5, surface: 'asphalt', night: false, scenery: 'mountain' }
        ]
      },
      {
        name: 'Night Circuit',
        description: 'Racing under the stars',
        zones: [
          { name: 'Neon City', length: 2500, baseWidth: 320, curve: 0.3, surface: 'asphalt', night: true, scenery: 'city' },
          { name: 'Dark Highway', length: 3000, baseWidth: 380, curve: 0.2, surface: 'asphalt', night: true, scenery: 'highway' },
          { name: 'Rain Section', length: 2500, baseWidth: 300, curve: 0.4, surface: 'wet', night: true, scenery: 'rain' },
          { name: 'Final Sprint', length: 2000, baseWidth: 350, curve: 0.1, surface: 'asphalt', night: true, scenery: 'city' }
        ]
      }
    ];

    // Current course zones (selected randomly or by player)
    this.zones = this.courses[0].zones;
    this.currentZoneIndex = 0;
    this.zoneProgress = 0;
    this.lapLength = this.zones.reduce((sum, z) => sum + z.length, 0);
    this.totalCourseLength = this.lapLength * this.totalLaps;

    // Scenery objects on track sides
    this.sceneryObjects = [];
    this.scenerySpawnTimer = 0;

    // Performance
    this.lastTime = 0;
    this.deltaTime = 0;
  }

  /**
   * Initialize the game
   */
  async init() {
    console.log('Initializing Monaco Racing...');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.generateRoadSegments();
    this.setupInput();
    this.setupUI();
    this.setupGyroControls();

    // Position player - lower on screen for more reaction time
    this.player.x = this.width / 2;
    this.player.y = this.height * 0.82;

    // Load assets (images and audio)
    console.log('Loading assets...');
    try {
      const [imageResult, audioResult] = await Promise.all([
        this.assetLoader.loadAll(),
        this.soundSystem.loadAll()
      ]);
      console.log(`Images: ${imageResult.loaded} loaded, ${imageResult.failed} fallback`);
      console.log(`Audio: ${audioResult.loaded} loaded, ${audioResult.failed} failed`);
      this.assetsLoaded = true;
    } catch (error) {
      console.warn('Asset loading error:', error);
    }

    console.log('Monaco Racing initialized!');
    this.state = 'ready';
  }

  /**
   * Setup gyroscope controls for mobile
   */
  setupGyroControls() {
    // Check if gyro is available
    if (this.gyroControls.available && GyroControls.isMobileDevice()) {
      console.log('Gyro controls available on mobile device');

      // Setup tap callback for item use
      this.gyroControls.onTap = (x, y) => {
        this.useItem();
      };

      // Show control mode toggle
      this.showControlModeToggle();
    }
  }

  /**
   * Show control mode toggle button
   */
  showControlModeToggle() {
    // Check if toggle already exists
    if (document.getElementById('control-mode-toggle')) return;

    const toggle = document.createElement('button');
    toggle.id = 'control-mode-toggle';
    toggle.className = 'control-mode-toggle';
    toggle.innerHTML = '🎯 傾き操作';
    toggle.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      border: 2px solid #0ff;
      border-radius: 20px;
      cursor: pointer;
      display: none;
    `;

    toggle.addEventListener('click', () => this.toggleControlMode());
    toggle.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.toggleControlMode();
    });

    document.body.appendChild(toggle);
  }

  /**
   * Toggle between touch and gyro control modes
   */
  async toggleControlMode() {
    const toggle = document.getElementById('control-mode-toggle');

    if (this.controlMode === 'touch') {
      // Switch to gyro
      if (!this.gyroEnabled) {
        // Request permission (must be from user gesture - click/touchend)
        const granted = await this.gyroControls.requestPermission();
        if (!granted) {
          console.warn('Gyro permission not granted');
          if (toggle) toggle.innerHTML = '❌ 傾き操作不可';
          setTimeout(() => {
            if (toggle) toggle.innerHTML = '🎯 傾き操作';
          }, 2000);
          return;
        }
        this.gyroEnabled = true;

        // Calibrate after short delay
        setTimeout(() => {
          this.gyroControls.calibrate();
        }, 500);
      }

      this.controlMode = 'gyro';
      if (toggle) toggle.innerHTML = '🕹️ ボタン操作';

      // Hide touch control buttons
      this.setTouchControlsVisible(false);

      console.log('Switched to gyro controls');
    } else {
      // Switch to touch
      this.controlMode = 'touch';
      if (toggle) toggle.innerHTML = '🎯 傾き操作';

      // Show touch control buttons
      this.setTouchControlsVisible(true);

      console.log('Switched to touch controls');
    }
  }

  /**
   * Show/hide touch control buttons
   */
  setTouchControlsVisible(visible) {
    const touchControls = document.querySelector('.touch-controls');
    if (touchControls) {
      touchControls.style.display = visible ? '' : 'none';
    }

    // Show/hide individual buttons
    const buttons = ['btn-steer-left', 'btn-steer-right', 'btn-accel', 'btn-brake'];
    buttons.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.style.display = visible ? '' : 'none';
    });
  }

  /**
   * Use current item
   */
  useItem() {
    if (!this.item || this.itemCooldown > 0 || this.state !== 'racing') return;

    console.log(`Using item: ${this.item}`);

    switch (this.item) {
      case 'boost':
        // Temporary speed boost
        this.player.speed = 1;
        this.player.boosted = true;
        this.player.boostTime = 3;
        this.soundSystem.playSfx('item_boost');
        break;

      case 'shield':
        // Temporary invincibility
        this.player.invincible = true;
        this.player.invincibleTime = 5;
        this.player.shielded = true;
        this.soundSystem.playSfx('item_shield');
        break;

      case 'slowmo':
        // Slow down time (traffic moves slower)
        this.slowmoActive = true;
        this.slowmoTime = 4;
        this.soundSystem.playSfx('item_slowmo');
        break;
    }

    this.item = null;
    this.itemCooldown = 1;

    // Update item display
    this.updateItemDisplay();
  }

  /**
   * Update item display in HUD
   */
  updateItemDisplay() {
    const itemIcon = document.getElementById('item-icon');
    if (itemIcon) {
      if (this.item) {
        const icons = { boost: '🚀', shield: '🛡️', slowmo: '⏱️' };
        itemIcon.textContent = icons[this.item] || '?';
        itemIcon.style.fontSize = '24px';
      } else {
        // Show score when no item
        itemIcon.textContent = this.score;
        itemIcon.style.fontSize = '14px';
      }
    }
  }

  /**
   * Resize canvas to fit container
   */
  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.parentElement.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) return;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.width = rect.width;
    this.height = rect.height;

    // Update road center
    this.roadCenterX = this.width / 2;

    // Update visible segments based on height
    this.visibleSegments = Math.ceil(this.height / this.segmentHeight) + 5;

    // Update player Y position - lower for more reaction time
    this.player.y = this.height * 0.82;
  }

  /**
   * Generate road segments for the visible area
   */
  generateRoadSegments() {
    this.roadSegments = [];

    for (let i = 0; i < this.visibleSegments + 50; i++) {
      this.roadSegments.push(this.createRoadSegment(i));
    }
  }

  /**
   * Create a single road segment
   */
  createRoadSegment(index) {
    const segmentDistance = index * this.segmentHeight;
    const zone = this.getZoneAtDistance(segmentDistance);

    // Calculate road width with smooth transitions
    const widthVariation = Math.sin(segmentDistance * 0.005) * 50;
    const roadWidth = Math.max(this.roadMinWidth,
      Math.min(this.roadMaxWidth, zone.baseWidth + widthVariation));

    // Calculate curve offset
    const curveOffset = Math.sin(segmentDistance * 0.003) * zone.curve * 150;

    return {
      index: index,
      distance: segmentDistance,
      width: roadWidth,
      curve: curveOffset,
      surface: zone.surface,
      isNight: zone.night,
      zoneName: zone.name,
      // Stripe pattern (alternating colors)
      stripe: Math.floor(index / 3) % 2 === 0
    };
  }

  /**
   * Get the zone at a given distance
   */
  getZoneAtDistance(distance) {
    let accumulated = 0;
    for (const zone of this.zones) {
      accumulated += zone.length;
      if (distance < accumulated) {
        return zone;
      }
    }
    // Loop back to first zone for endless mode
    return this.zones[0];
  }

  /**
   * Setup keyboard and touch input
   */
  setupInput() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft': case 'a': case 'A': this.keys.left = true; break;
        case 'ArrowRight': case 'd': case 'D': this.keys.right = true; break;
        case 'ArrowUp': case 'w': case 'W': this.keys.up = true; break;
        case 'ArrowDown': case 's': case 'S': this.keys.down = true; break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowLeft': case 'a': case 'A': this.keys.left = false; break;
        case 'ArrowRight': case 'd': case 'D': this.keys.right = false; break;
        case 'ArrowUp': case 'w': case 'W': this.keys.up = false; break;
        case 'ArrowDown': case 's': case 'S': this.keys.down = false; break;
      }
    });

    // Touch controls
    this.setupTouchControls();
  }

  /**
   * Setup touch control buttons
   */
  setupTouchControls() {
    const leftBtn = document.getElementById('btn-steer-left');
    const rightBtn = document.getElementById('btn-steer-right');
    const accelBtn = document.getElementById('btn-accel');
    const brakeBtn = document.getElementById('btn-brake');

    const addTouch = (el, onStart, onEnd) => {
      if (!el) return;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(); }, { passive: false });
      el.addEventListener('touchend', (e) => { e.preventDefault(); onEnd(); }, { passive: false });
      el.addEventListener('mousedown', onStart);
      el.addEventListener('mouseup', onEnd);
      el.addEventListener('mouseleave', onEnd);
    };

    addTouch(leftBtn, () => this.touchX = -1, () => { if (this.touchX === -1) this.touchX = 0; });
    addTouch(rightBtn, () => this.touchX = 1, () => { if (this.touchX === 1) this.touchX = 0; });
    addTouch(accelBtn, () => this.touchAccel = true, () => this.touchAccel = false);
    addTouch(brakeBtn, () => this.touchBrake = true, () => this.touchBrake = false);
  }

  /**
   * Setup UI button handlers
   */
  setupUI() {
    document.getElementById('btn-start')?.addEventListener('click', () => this.startRace());
    document.getElementById('btn-pause')?.addEventListener('click', () => this.togglePause());
    document.getElementById('btn-resume')?.addEventListener('click', () => this.togglePause());
    document.getElementById('btn-restart')?.addEventListener('click', () => this.restartRace());
    document.getElementById('btn-quit')?.addEventListener('click', () => this.quitToTitle());
    document.getElementById('btn-race-again')?.addEventListener('click', () => this.restartRace());
    document.getElementById('btn-back-title')?.addEventListener('click', () => this.quitToTitle());
    document.getElementById('btn-settings')?.addEventListener('click', () => this.showScreen('settings-screen'));
    document.getElementById('btn-settings-back')?.addEventListener('click', () => this.showScreen('title-screen'));
    document.getElementById('btn-how-to')?.addEventListener('click', () => this.showScreen('howto-screen'));
    document.getElementById('btn-howto-back')?.addEventListener('click', () => this.showScreen('title-screen'));

    this.showScreen('title-screen');
  }

  /**
   * Show a screen
   */
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId)?.classList.add('active');

    // Handle BGM for different screens
    if (screenId === 'title-screen') {
      // Play title BGM when showing title screen (only works after user interaction)
      this.soundSystem.playBgm('title');
    } else if (screenId === 'game-screen') {
      // CRITICAL: Stop any playing BGM when entering game screen
      // Race BGM is started in startRace() after countdown
      this.soundSystem.stopBgm();
    } else if (screenId === 'settings-screen' || screenId === 'howto-screen') {
      // Keep title BGM playing on settings/howto
    } else if (screenId === 'results-screen') {
      // BGM is handled in gameOver() or finishRace()
    }
  }

  /**
   * Show/hide overlay
   */
  showOverlay(overlayId, show = true) {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.classList.toggle('active', show);
  }

  /**
   * Start the race
   */
  async startRace() {
    // Prevent double-start (important for BGM double-play prevention)
    if (this.state === 'countdown' || this.state === 'racing') {
      console.log('Race already in progress, ignoring startRace call');
      return;
    }

    console.log('Starting Race...');

    // CRITICAL: Stop ALL BGM before anything else (prevents double-play)
    this.soundSystem.stopBgm();

    // Initialize audio context (must be from user gesture)
    await this.soundSystem.init();

    // Select random course
    this.selectedCourse = Math.floor(Math.random() * this.courses.length);
    this.zones = this.courses[this.selectedCourse].zones;
    this.lapLength = this.zones.reduce((sum, z) => sum + z.length, 0);
    this.totalCourseLength = this.lapLength * this.totalLaps;

    console.log(`Selected course: ${this.courses[this.selectedCourse].name}`);

    // Reset lap-based state
    this.distance = 0;
    this.lapDistance = 0;
    this.currentLap = 1;
    this.lapTimes = [];
    this.currentLapTime = 0;
    this.totalTime = 0;
    this.score = 0;
    this.carsOvertaken = 0;
    this.currentZoneIndex = 0;
    this.zoneProgress = 0;
    this.scrollSpeed = 0;
    this.traffic = [];
    this.obstacles = [];
    this.sceneryObjects = [];

    // Reset player - lower position for more reaction time
    this.player.x = this.width / 2;
    this.player.y = this.height * 0.82;
    this.player.speed = 0;
    this.player.angle = 0;
    this.player.spinning = false;

    // Regenerate road
    this.generateRoadSegments();

    // Show game screen
    this.showScreen('game-screen');

    // Show course name
    this.showCourseNamePopup();

    // Show control mode toggle on mobile
    const toggle = document.getElementById('control-mode-toggle');
    if (toggle && GyroControls.isMobileDevice() && this.gyroControls.available) {
      toggle.style.display = 'block';
    }

    // Reset item pickups
    this.itemPickups = [];
    this.itemSpawnTimer = 5; // First item spawns after 5 seconds
    this.slowmoActive = false;
    this.player.boosted = false;
    this.player.shielded = false;

    // Wait for layout
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => requestAnimationFrame(r));
    this.resizeCanvas();

    // Start countdown
    this.state = 'countdown';
    await this.runCountdown();

    // CRITICAL: Stop any lingering audio AGAIN right before starting race BGM
    // This ensures title BGM is fully stopped on iOS Safari
    this.soundSystem.stopBgm();

    // Start race music
    this.soundSystem.playBgm('race');

    // Start game loop
    this.state = 'racing';
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }

  /**
   * Show course name popup at race start
   */
  showCourseNamePopup() {
    const course = this.courses[this.selectedCourse];
    const popup = document.createElement('div');
    popup.className = 'course-name-popup';
    popup.innerHTML = `
      <div class="course-name">${course.name}</div>
      <div class="course-desc">${course.description}</div>
      <div class="course-laps">${this.totalLaps} LAPS</div>
    `;
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 100;
      color: #fff;
      font-family: 'Press Start 2P', monospace;
      animation: fadeInOut 3s ease-in-out forwards;
    `;

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; }
        100% { opacity: 0; }
      }
      .course-name { font-size: 1.5rem; color: #0ff; text-shadow: 0 0 10px #0ff; margin-bottom: 10px; }
      .course-desc { font-size: 0.7rem; color: #fff; margin-bottom: 10px; font-family: sans-serif; }
      .course-laps { font-size: 1rem; color: #ff0; }
    `;
    document.head.appendChild(style);

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
  }

  /**
   * Run countdown before race
   */
  async runCountdown() {
    this.showOverlay('countdown-overlay', true);
    const countdownEl = document.querySelector('#countdown-display .countdown-number');

    for (let i = 3; i >= 0; i--) {
      if (countdownEl) {
        countdownEl.textContent = i === 0 ? 'GO!' : i;
        countdownEl.className = 'countdown-number' + (i === 0 ? ' go' : '');
      }
      // Play countdown sounds
      if (i > 0) {
        this.soundSystem.playSfx('countdown_beep');
      } else {
        this.soundSystem.playSfx('countdown_go');
      }
      await this.delay(i === 0 ? 500 : 800);
    }

    this.showOverlay('countdown-overlay', false);
  }

  /**
   * Main game loop
   */
  gameLoop(timestamp) {
    if (this.state === 'ready') return;

    this.deltaTime = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    if (this.state === 'racing' && !this.paused) {
      this.update(this.deltaTime);
    }

    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  /**
   * Update game state - LAP-BASED RACING
   */
  update(dt) {
    // Update timers
    this.currentLapTime += dt;
    this.totalTime += dt;

    // Update player
    this.updatePlayer(dt);

    // Update scroll speed based on player speed
    this.scrollSpeed = this.baseScrollSpeed + (this.player.speed * this.maxScrollSpeed);

    // Update distance
    const distanceThisFrame = this.scrollSpeed * dt;
    this.distance += distanceThisFrame;
    this.lapDistance += distanceThisFrame;

    // Check for lap completion
    if (this.lapDistance >= this.lapLength) {
      this.completeLap();
    }

    // Update road segments (scroll)
    this.updateRoadSegments(dt);

    // Spawn and update traffic
    this.updateTraffic(dt);

    // Spawn and update obstacles
    this.updateObstacles(dt);

    // Check collisions
    this.checkCollisions();

    // Update score based on speed and overtakes
    this.score = Math.floor(this.distance / 10) + (this.carsOvertaken * 100);

    // Update slowmo effect
    if (this.slowmoActive) {
      this.slowmoTime -= dt;
      if (this.slowmoTime <= 0) {
        this.slowmoActive = false;
      }
    }

    // Spawn and update item pickups
    this.updateItemPickups(dt);

    // Update scenery objects
    this.updateScenery(dt);

    // Update screen shake
    if (this.screenShake > 0) {
      this.screenShake -= dt * 5;
    }

    // Update day/night cycle
    const currentSegment = this.roadSegments[Math.floor(this.visibleSegments / 2)];
    this.isNight = currentSegment?.isNight || false;

    // Update HUD
    this.updateHUD();
  }

  /**
   * Complete a lap
   */
  completeLap() {
    // Record lap time
    this.lapTimes.push(this.currentLapTime);

    // Check for best lap
    if (this.currentLapTime < this.bestLapTime) {
      this.bestLapTime = this.currentLapTime;
      localStorage.setItem('bestLapTime', this.bestLapTime.toString());
    }

    // Show lap complete popup
    this.showLapCompletePopup(this.currentLap, this.currentLapTime);

    // Play lap complete sound
    this.soundSystem.playSfx('lap_complete');

    // Check if race is complete
    if (this.currentLap >= this.totalLaps) {
      this.finishRace();
      return;
    }

    // Start next lap
    this.currentLap++;
    this.lapDistance = 0;
    this.currentLapTime = 0;

    // Reset zone progress for new lap
    this.currentZoneIndex = 0;
    this.zoneProgress = 0;
  }

  /**
   * Show lap complete popup
   */
  showLapCompletePopup(lap, time) {
    const popup = document.getElementById('lap-popup');
    const lapNumEl = document.getElementById('lap-complete-num');
    const lapTimeEl = document.getElementById('lap-time');

    if (popup && lapNumEl && lapTimeEl) {
      lapNumEl.textContent = lap;
      lapTimeEl.textContent = this.formatTime(time);
      popup.classList.add('active');

      setTimeout(() => {
        popup.classList.remove('active');
      }, 2000);
    }
  }

  /**
   * Format time as M:SS.mm
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }

  /**
   * Update scenery objects
   */
  updateScenery(dt) {
    // Move scenery down
    for (let i = this.sceneryObjects.length - 1; i >= 0; i--) {
      const obj = this.sceneryObjects[i];
      obj.y += this.scrollSpeed * dt;

      // Remove if off screen
      if (obj.y > this.height + 100) {
        this.sceneryObjects.splice(i, 1);
      }
    }

    // Spawn new scenery
    this.scenerySpawnTimer -= dt;
    if (this.scenerySpawnTimer <= 0) {
      this.spawnScenery();
      this.scenerySpawnTimer = 0.3 + Math.random() * 0.5; // Spawn every 0.3-0.8 seconds
    }
  }

  /**
   * Spawn scenery object
   */
  spawnScenery() {
    const currentSegment = this.roadSegments[0];
    if (!currentSegment) return;

    const zone = this.zones[this.currentZoneIndex];
    const sceneryType = zone?.scenery || 'city';

    // Calculate road center (includes curve)
    const roadCenterX = this.width / 2 + (currentSegment.curve || 0);
    const roadWidth = currentSegment.width || this.roadWidth;

    // Determine which side to spawn on
    const side = Math.random() < 0.5 ? 'left' : 'right';
    const roadEdge = side === 'left'
      ? roadCenterX - roadWidth / 2
      : roadCenterX + roadWidth / 2;

    // Offset from road edge
    const offset = 30 + Math.random() * 60;
    const x = side === 'left' ? roadEdge - offset : roadEdge + offset;

    // Keep within screen bounds
    if (x < 20 || x > this.width - 20) return;

    // Get scenery config based on zone type
    const sceneryConfig = this.getSceneryConfig(sceneryType);

    this.sceneryObjects.push({
      x: x,
      y: -50,
      type: sceneryType,
      variant: Math.floor(Math.random() * sceneryConfig.variants),
      width: sceneryConfig.width,
      height: sceneryConfig.height,
      color: sceneryConfig.color
    });
  }

  /**
   * Get scenery configuration for zone type
   */
  getSceneryConfig(type) {
    const configs = {
      city: { variants: 3, width: 40, height: 60, color: '#445' },
      highway: { variants: 2, width: 30, height: 20, color: '#666' },
      mountain: { variants: 3, width: 35, height: 40, color: '#2a5' },
      coastal: { variants: 2, width: 30, height: 50, color: '#4a8' },
      tunnel: { variants: 1, width: 50, height: 30, color: '#333' },
      ice: { variants: 2, width: 25, height: 35, color: '#aef' },
      rain: { variants: 2, width: 30, height: 25, color: '#558' }
    };
    return configs[type] || configs.city;
  }

  /**
   * Update player car
   */
  updatePlayer(dt) {
    // Handle spinning (crashed)
    if (this.player.spinning) {
      this.player.spinTime -= dt;
      this.player.angle += 8 * dt;
      this.player.speed *= 0.95;
      if (this.player.spinTime <= 0) {
        this.player.spinning = false;
        this.player.angle = 0;
        this.player.invincible = true;
        this.player.invincibleTime = 2;
      }
      return;
    }

    // Handle invincibility
    if (this.player.invincible) {
      this.player.invincibleTime -= dt;
      if (this.player.invincibleTime <= 0) {
        this.player.invincible = false;
        this.player.shielded = false;
      }
    }

    // Handle boost
    if (this.player.boosted) {
      this.player.boostTime -= dt;
      if (this.player.boostTime <= 0) {
        this.player.boosted = false;
      }
    }

    // Update item cooldown
    if (this.itemCooldown > 0) {
      this.itemCooldown -= dt;
    }

    // Get current road segment at player position
    const currentSegment = this.roadSegments[Math.floor(this.visibleSegments * 0.75)];
    const roadCenter = this.width / 2 + (currentSegment?.curve || 0);
    const roadWidth = currentSegment?.width || this.roadWidth;
    const surface = currentSegment?.surface || 'asphalt';

    // Get input based on control mode
    let accelInput = false;
    let brakeInput = false;
    let steerInput = 0;

    if (this.controlMode === 'gyro' && this.gyroEnabled) {
      // Gyro controls
      accelInput = this.gyroControls.accelValue > 0.2;
      brakeInput = this.gyroControls.brakeValue > 0.2;
      steerInput = this.gyroControls.steerValue;
    } else {
      // Touch/Keyboard controls
      accelInput = this.keys.up || this.touchAccel;
      brakeInput = this.keys.down || this.touchBrake;
      steerInput = (this.keys.left ? -1 : 0) + (this.keys.right ? 1 : 0) + this.touchX;
    }

    // Acceleration/Braking
    const accelRate = this.player.boosted ? 4 : 2;
    if (accelInput) {
      this.player.speed = Math.min(1, this.player.speed + dt * accelRate);
    } else if (brakeInput) {
      this.player.speed = Math.max(0, this.player.speed - dt * 3);
    } else {
      // Auto-accelerate slightly for arcade feel
      this.player.speed = Math.min(0.7, this.player.speed + dt * 0.5);
    }

    // Surface effects
    let steeringMultiplier = 1;
    if (surface === 'ice') {
      steeringMultiplier = 0.4; // Slippery
      this.player.speed *= 0.995; // Slight slowdown
    } else if (surface === 'wet') {
      steeringMultiplier = 0.7;
    }

    // Steering
    const steerSpeed = 400 * steeringMultiplier;
    this.player.x += steerInput * steerSpeed * dt;
    this.player.angle = steerInput * 0.2;

    // Road curves push player
    const curvePush = (currentSegment?.curve || 0) * 0.02 * this.player.speed;
    this.player.x += curvePush;

    // Keep player on road (with some leeway)
    const roadLeft = roadCenter - roadWidth / 2 - 20;
    const roadRight = roadCenter + roadWidth / 2 + 20;

    if (this.player.x < roadLeft) {
      this.player.x = roadLeft;
      this.player.speed *= 0.8; // Slow down when hitting edge
      this.screenShake = 0.3;
    } else if (this.player.x > roadRight) {
      this.player.x = roadRight;
      this.player.speed *= 0.8;
      this.screenShake = 0.3;
    }

    // Keep within screen bounds
    this.player.x = Math.max(this.player.width / 2, Math.min(this.width - this.player.width / 2, this.player.x));
  }

  /**
   * Update road segments (scrolling)
   */
  updateRoadSegments(dt) {
    const scrollPixels = this.scrollSpeed * dt;

    // Shift all segments down
    for (const segment of this.roadSegments) {
      segment.screenY = (segment.screenY || 0) + scrollPixels;
    }

    // Remove segments that scrolled off bottom
    while (this.roadSegments.length > 0 && this.roadSegments[0].screenY > this.height + 100) {
      this.roadSegments.shift();
    }

    // Add new segments at top
    while (this.roadSegments.length < this.visibleSegments + 20) {
      const lastSegment = this.roadSegments[this.roadSegments.length - 1];
      const newIndex = (lastSegment?.index || 0) + 1;
      const newSegment = this.createRoadSegment(newIndex);
      newSegment.screenY = (lastSegment?.screenY || 0) - this.segmentHeight;
      this.roadSegments.push(newSegment);
    }
  }

  /**
   * Update traffic cars
   */
  updateTraffic(dt) {
    // Apply slowmo effect
    const timeScale = this.slowmoActive ? 0.3 : 1.0;

    // Spawn new traffic
    this.trafficSpawnTimer -= dt * timeScale;
    if (this.trafficSpawnTimer <= 0) {
      this.spawnTrafficCar();
      this.trafficSpawnTimer = this.trafficSpawnInterval - (this.player.speed * 0.5);
    }

    // Update existing traffic
    const scrollPixels = this.scrollSpeed * dt * timeScale;

    for (let i = this.traffic.length - 1; i >= 0; i--) {
      const car = this.traffic[i];

      // Move down (relative to player movement)
      car.y += scrollPixels - (car.speed * dt);

      // Slight AI steering to stay on road
      const segment = this.roadSegments[Math.floor(this.visibleSegments / 2)];
      const roadCenter = this.width / 2 + (segment?.curve || 0);
      const diff = roadCenter - car.x;
      car.x += diff * 0.01;

      // Remove if off screen
      if (car.y > this.height + 100 || car.y < -200) {
        // Check if we overtook this car
        if (car.y > this.height && !car.overtaken) {
          this.carsOvertaken++;
          this.score += 100;
        }
        this.traffic.splice(i, 1);
      }
    }
  }

  /**
   * Spawn a traffic car
   */
  spawnTrafficCar() {
    const segment = this.roadSegments[this.roadSegments.length - 1];
    const roadCenter = this.width / 2 + (segment?.curve || 0);
    const roadWidth = segment?.width || this.roadWidth;

    // Random position on road
    const laneOffset = (Math.random() - 0.5) * (roadWidth - 80);

    // Get random car image
    const { key, image } = this.assetLoader.getRandomTrafficCar();
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

    this.traffic.push({
      x: roadCenter + laneOffset,
      y: -100,
      width: 28,                    // Smaller (was 35)
      height: 48,                   // Smaller (was 60)
      speed: 80 + Math.random() * 100, // Much slower traffic (was 150 + 200)
      color: colors[Math.floor(Math.random() * colors.length)],
      imageKey: key,
      image: image,
      overtaken: false
    });
  }

  /**
   * Update item pickups
   */
  updateItemPickups(dt) {
    // Spawn new items
    this.itemSpawnTimer -= dt;
    if (this.itemSpawnTimer <= 0 && !this.item) {
      this.spawnItemPickup();
      this.itemSpawnTimer = this.itemSpawnInterval;
    }

    // Update existing pickups
    const scrollPixels = this.scrollSpeed * dt;

    for (let i = this.itemPickups.length - 1; i >= 0; i--) {
      const pickup = this.itemPickups[i];
      pickup.y += scrollPixels;
      pickup.rotation += dt * 2; // Spin animation

      // Check if player collected it
      if (!this.item && this.boxCollision(
        this.player.x, this.player.y, this.player.width, this.player.height,
        pickup.x, pickup.y, pickup.width, pickup.height
      )) {
        this.item = pickup.type;
        this.itemPickups.splice(i, 1);
        this.updateItemDisplay();
        this.soundSystem.playSfx('item_pickup');
        console.log(`Collected item: ${this.item}`);
        continue;
      }

      // Remove if off screen
      if (pickup.y > this.height + 50) {
        this.itemPickups.splice(i, 1);
      }
    }
  }

  /**
   * Spawn an item pickup
   */
  spawnItemPickup() {
    const segment = this.roadSegments[this.roadSegments.length - 1];
    const roadCenter = this.width / 2 + (segment?.curve || 0);
    const roadWidth = segment?.width || this.roadWidth;

    const laneOffset = (Math.random() - 0.5) * (roadWidth - 60);
    const type = this.itemTypes[Math.floor(Math.random() * this.itemTypes.length)];

    this.itemPickups.push({
      x: roadCenter + laneOffset,
      y: -50,
      width: 40,
      height: 40,
      type: type,
      rotation: 0
    });
  }

  /**
   * Update obstacles
   */
  updateObstacles(dt) {
    // Spawn obstacles occasionally
    this.obstacleSpawnTimer -= dt;
    if (this.obstacleSpawnTimer <= 0) {
      this.spawnObstacle();
      this.obstacleSpawnTimer = 3 + Math.random() * 5;
    }

    // Update obstacles
    const scrollPixels = this.scrollSpeed * dt;

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.y += scrollPixels;

      if (obs.y > this.height + 50) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  /**
   * Spawn an obstacle
   */
  spawnObstacle() {
    const segment = this.roadSegments[this.roadSegments.length - 1];
    const roadCenter = this.width / 2 + (segment?.curve || 0);
    const roadWidth = segment?.width || this.roadWidth;

    const types = ['puddle', 'oil', 'pothole'];
    const type = types[Math.floor(Math.random() * types.length)];

    const laneOffset = (Math.random() - 0.5) * (roadWidth - 60);

    this.obstacles.push({
      x: roadCenter + laneOffset,
      y: -50,
      width: 50 + Math.random() * 30,
      height: 30 + Math.random() * 20,
      type: type
    });
  }

  /**
   * Check collisions
   */
  checkCollisions() {
    if (this.player.spinning || this.player.invincible) return;

    const px = this.player.x;
    const py = this.player.y;
    const pw = this.player.width;
    const ph = this.player.height;

    // Check traffic collisions
    for (const car of this.traffic) {
      if (this.boxCollision(px, py, pw, ph, car.x, car.y, car.width, car.height)) {
        this.crashPlayer();
        return;
      }
    }

    // Check obstacle collisions
    for (const obs of this.obstacles) {
      if (this.boxCollision(px, py, pw * 0.6, ph * 0.6, obs.x, obs.y, obs.width, obs.height)) {
        if (obs.type === 'puddle' || obs.type === 'oil') {
          this.spinPlayer();
        } else if (obs.type === 'pothole') {
          this.player.speed *= 0.5;
          this.screenShake = 0.5;
        }
      }
    }
  }

  /**
   * Simple box collision check
   */
  boxCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return Math.abs(x1 - x2) < (w1 + w2) / 2 &&
           Math.abs(y1 - y2) < (h1 + h2) / 2;
  }

  /**
   * Crash the player (full stop)
   */
  crashPlayer() {
    this.player.spinning = true;
    this.player.spinTime = 2;
    this.player.speed = 0;
    this.screenShake = 1;
    // Add 3 seconds penalty to current lap time
    this.currentLapTime += 3;
    this.soundSystem.playSfx('crash');
  }

  /**
   * Spin the player (recoverable)
   */
  spinPlayer() {
    this.player.spinning = true;
    this.player.spinTime = 1;
    this.player.speed *= 0.3;
    this.screenShake = 0.5;
    this.soundSystem.playSfx('spin');
  }

  /**
   * Update HUD elements - LAP-BASED DISPLAY
   */
  updateHUD() {
    // Current lap time display (show in position area)
    const posEl = document.getElementById('current-position');
    if (posEl) {
      // Show current lap time in seconds with 1 decimal
      posEl.textContent = this.currentLapTime.toFixed(1);
    }

    // Update suffix to show "s" for seconds
    const suffixEl = document.querySelector('.position-suffix');
    if (suffixEl) suffixEl.textContent = 's';

    // Update total display (shows total /X)
    const totalEl = document.querySelector('.position-total');
    if (totalEl) totalEl.textContent = '';

    // Lap counter
    const lapEl = document.getElementById('current-lap');
    if (lapEl) lapEl.textContent = this.currentLap;

    // Speed meter
    const speedFill = document.getElementById('speed-fill');
    if (speedFill) {
      speedFill.style.height = `${this.player.speed * 100}%`;
    }

    // Item display (shows item icon when item is held, otherwise score)
    if (!this.item) {
      const itemIcon = document.getElementById('item-icon');
      if (itemIcon) {
        itemIcon.textContent = this.score;
        itemIcon.style.fontSize = '14px';
      }
    }
  }

  /**
   * Show checkpoint popup
   */
  showCheckpointPopup() {
    const popup = document.getElementById('lap-popup');
    const numEl = document.getElementById('lap-complete-num');
    const timeEl = document.getElementById('lap-time');

    if (popup && numEl && timeEl) {
      numEl.textContent = 'CHECKPOINT';
      timeEl.textContent = '+15 SEC';
      popup.classList.add('active');
      setTimeout(() => popup.classList.remove('active'), 2000);
    }
    this.soundSystem.playSfx('checkpoint');
  }

  /**
   * Game over (time ran out)
   */
  gameOver() {
    this.state = 'finished';

    // Stop race music and play game over
    this.soundSystem.stopBgm();
    this.soundSystem.playBgm('gameover');

    // Update high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('monacoHighScore', this.highScore.toString());
    }

    // Update results screen
    const titleEl = document.querySelector('.results-title');
    if (titleEl) {
      titleEl.textContent = 'TIME UP!';
      titleEl.className = 'results-title';
    }

    this.showResults();
  }

  /**
   * Finish the race (completed all laps)
   */
  finishRace() {
    this.state = 'finished';

    // Stop race music and play victory
    this.soundSystem.stopBgm();
    this.soundSystem.playBgm('victory');

    // Calculate best lap from all laps
    const bestLap = Math.min(...this.lapTimes);

    // Save best lap time if it's a record
    if (bestLap < this.bestLapTime) {
      this.bestLapTime = bestLap;
      localStorage.setItem('bestLapTime', bestLap.toString());
    }

    // Update high score (based on total time - lower is better, but we store points)
    const timeBonus = Math.max(0, 300 - this.totalTime) * 10; // Bonus for fast times
    this.score += timeBonus + (this.carsOvertaken * 50);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('monacoHighScore', this.highScore.toString());
    }

    const titleEl = document.querySelector('.results-title');
    if (titleEl) {
      titleEl.textContent = '🏆 RACE COMPLETE! 🏆';
      titleEl.className = 'results-title victory';
    }

    this.showResults();
  }

  /**
   * Show results screen with lap times
   */
  showResults() {
    const resultTime = document.getElementById('result-time');
    const resultBestLap = document.getElementById('result-best-lap');
    const resultItems = document.getElementById('result-items');

    // Show total time
    if (resultTime) resultTime.textContent = this.formatTime(this.totalTime);

    // Show best lap
    const bestLap = this.lapTimes.length > 0 ? Math.min(...this.lapTimes) : 0;
    if (resultBestLap) resultBestLap.textContent = this.formatTime(bestLap);

    // Show cars overtaken
    if (resultItems) resultItems.textContent = this.carsOvertaken;

    // Update lap times in rankings list
    const rankingsList = document.getElementById('rankings-list');
    if (rankingsList && this.lapTimes.length > 0) {
      rankingsList.innerHTML = '';

      // Add course name header
      const courseHeader = document.createElement('div');
      courseHeader.className = 'rank-entry';
      courseHeader.style.cssText = 'background: rgba(0, 255, 255, 0.2); border-left: 3px solid #0ff;';
      courseHeader.innerHTML = `
        <span class="rank-pos" style="color: #0ff;">COURSE</span>
        <span class="rank-name" style="color: #fff;">${this.courses[this.selectedCourse].name}</span>
        <span class="rank-time"></span>
      `;
      rankingsList.appendChild(courseHeader);

      // Add each lap time
      this.lapTimes.forEach((time, index) => {
        const entry = document.createElement('div');
        entry.className = 'rank-entry' + (time === bestLap ? ' player' : '');
        entry.innerHTML = `
          <span class="rank-pos">LAP ${index + 1}</span>
          <span class="rank-name">${time === bestLap ? '⭐ BEST' : ''}</span>
          <span class="rank-time">${this.formatTime(time)}</span>
        `;
        rankingsList.appendChild(entry);
      });

      // Add total time
      const totalEntry = document.createElement('div');
      totalEntry.className = 'rank-entry';
      totalEntry.style.cssText = 'background: rgba(255, 255, 0, 0.2); border-left: 3px solid #ff0;';
      totalEntry.innerHTML = `
        <span class="rank-pos" style="color: #ff0;">TOTAL</span>
        <span class="rank-name"></span>
        <span class="rank-time" style="color: #ff0; font-weight: bold;">${this.formatTime(this.totalTime)}</span>
      `;
      rankingsList.appendChild(totalEntry);
    }

    setTimeout(() => this.showScreen('results-screen'), 1500);
  }

  /**
   * Render the game
   */
  render() {
    if (!this.width || !this.height) return;

    const ctx = this.ctx;

    // Apply screen shake
    ctx.save();
    if (this.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * this.screenShake * 10;
      const shakeY = (Math.random() - 0.5) * this.screenShake * 10;
      ctx.translate(shakeX, shakeY);
    }

    // Clear with grass/ground color
    ctx.fillStyle = this.isNight ? '#0a1a0a' : '#2d5a2d';
    ctx.fillRect(0, 0, this.width, this.height);

    // Render scenery (behind road)
    this.renderScenery(ctx);

    // Render road
    this.renderRoad(ctx);

    // Render obstacles
    this.renderObstacles(ctx);

    // Render item pickups
    this.renderItemPickups(ctx);

    // Render traffic
    this.renderTraffic(ctx);

    // Render player
    this.renderPlayer(ctx);

    // Render night overlay with headlights
    if (this.isNight) {
      this.renderNightOverlay(ctx);
    }

    // Render speed effect
    if (this.player.speed > 0.5) {
      this.renderSpeedEffect(ctx);
    }

    // Render slowmo effect
    if (this.slowmoActive) {
      this.renderSlowmoEffect(ctx);
    }

    // Render zone name
    this.renderZoneName(ctx);

    ctx.restore();
  }

  /**
   * Render the road
   */
  renderRoad(ctx) {
    // Sort segments by screenY (back to front)
    const sortedSegments = [...this.roadSegments].sort((a, b) => (a.screenY || 0) - (b.screenY || 0));

    for (let i = 0; i < sortedSegments.length - 1; i++) {
      const seg = sortedSegments[i];
      const nextSeg = sortedSegments[i + 1];

      const y1 = seg.screenY || (i * this.segmentHeight);
      const y2 = nextSeg.screenY || ((i + 1) * this.segmentHeight);

      if (y2 < -50 || y1 > this.height + 50) continue;

      const centerX = this.width / 2 + seg.curve;
      const nextCenterX = this.width / 2 + nextSeg.curve;

      const w1 = seg.width;
      const w2 = nextSeg.width;

      // Road surface colors based on surface type and stripe
      let roadColor;
      let stripeColor;

      if (seg.surface === 'ice') {
        roadColor = seg.stripe ? '#a8d5e8' : '#c8e5f8';
        stripeColor = '#fff';
      } else if (seg.surface === 'wet') {
        roadColor = seg.stripe ? '#334455' : '#3a4a5a';
        stripeColor = '#667788';
      } else {
        roadColor = seg.stripe ? '#444' : '#555';
        stripeColor = seg.stripe ? '#ff0' : '#fff';
      }

      // Draw road segment (trapezoid)
      ctx.fillStyle = roadColor;
      ctx.beginPath();
      ctx.moveTo(centerX - w1 / 2, y1);
      ctx.lineTo(centerX + w1 / 2, y1);
      ctx.lineTo(nextCenterX + w2 / 2, y2);
      ctx.lineTo(nextCenterX - w2 / 2, y2);
      ctx.closePath();
      ctx.fill();

      // Road edges (white/red stripes)
      const edgeWidth = 8;

      // Left edge
      ctx.fillStyle = seg.stripe ? '#f00' : '#fff';
      ctx.beginPath();
      ctx.moveTo(centerX - w1 / 2, y1);
      ctx.lineTo(centerX - w1 / 2 + edgeWidth, y1);
      ctx.lineTo(nextCenterX - w2 / 2 + edgeWidth, y2);
      ctx.lineTo(nextCenterX - w2 / 2, y2);
      ctx.closePath();
      ctx.fill();

      // Right edge
      ctx.beginPath();
      ctx.moveTo(centerX + w1 / 2 - edgeWidth, y1);
      ctx.lineTo(centerX + w1 / 2, y1);
      ctx.lineTo(nextCenterX + w2 / 2, y2);
      ctx.lineTo(nextCenterX + w2 / 2 - edgeWidth, y2);
      ctx.closePath();
      ctx.fill();

      // Center line (dashed)
      if (seg.stripe) {
        ctx.fillStyle = stripeColor;
        ctx.beginPath();
        ctx.moveTo(centerX - 3, y1);
        ctx.lineTo(centerX + 3, y1);
        ctx.lineTo(nextCenterX + 3, y2);
        ctx.lineTo(nextCenterX - 3, y2);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  /**
   * Render obstacles
   */
  renderObstacles(ctx) {
    for (const obs of this.obstacles) {
      ctx.save();
      ctx.translate(obs.x, obs.y);

      // Try to draw obstacle image
      const obsImage = this.assetLoader.getObstacle(obs.type);
      if (obsImage && obsImage.complete) {
        ctx.drawImage(obsImage, -obs.width / 2, -obs.height / 2, obs.width, obs.height);
      } else {
        // Canvas fallback
        if (obs.type === 'puddle') {
          ctx.fillStyle = 'rgba(30, 100, 200, 0.6)';
          ctx.beginPath();
          ctx.ellipse(0, 0, obs.width / 2, obs.height / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === 'oil') {
          ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
          ctx.beginPath();
          ctx.ellipse(0, 0, obs.width / 2, obs.height / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          // Rainbow sheen
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, obs.width / 2);
          gradient.addColorStop(0, 'rgba(255,0,255,0.2)');
          gradient.addColorStop(0.5, 'rgba(0,255,255,0.2)');
          gradient.addColorStop(1, 'rgba(255,255,0,0.1)');
          ctx.fillStyle = gradient;
          ctx.fill();
        } else if (obs.type === 'pothole') {
          ctx.fillStyle = '#222';
          ctx.beginPath();
          ctx.ellipse(0, 0, obs.width / 2, obs.height / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#111';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      ctx.restore();
    }
  }

  /**
   * Render item pickups
   */
  renderItemPickups(ctx) {
    for (const pickup of this.itemPickups) {
      ctx.save();
      ctx.translate(pickup.x, pickup.y);
      ctx.rotate(pickup.rotation);

      // Item box
      const size = pickup.width;
      const halfSize = size / 2;

      // Glow effect
      ctx.shadowColor = '#0ff';
      ctx.shadowBlur = 15;

      // Try to draw item image
      const itemImage = this.assetLoader.getItem(pickup.type);
      if (itemImage && itemImage.complete) {
        ctx.drawImage(itemImage, -halfSize, -halfSize, size, size);
      } else {
        // Canvas fallback
        // Box
        ctx.fillStyle = '#222';
        ctx.strokeStyle = '#0ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(-halfSize, -halfSize, size, size, 8);
        ctx.fill();
        ctx.stroke();

        // Icon
        ctx.shadowBlur = 0;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const icons = { boost: '🚀', shield: '🛡️', slowmo: '⏱️' };
        ctx.fillText(icons[pickup.type] || '?', 0, 0);
      }

      ctx.restore();
    }
  }

  /**
   * Render traffic cars
   */
  renderTraffic(ctx) {
    for (const car of this.traffic) {
      ctx.save();
      ctx.translate(car.x, car.y);

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(3, 5, car.width * 0.4, car.height * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();

      const w = car.width;
      const h = car.height;

      // Try to draw image, fallback to canvas
      if (car.image && car.image.complete) {
        ctx.drawImage(car.image, -w / 2, -h / 2, w, h);
      } else {
        // Canvas fallback
        ctx.fillStyle = car.color;
        ctx.beginPath();
        ctx.moveTo(0, -h / 2);           // Front
        ctx.lineTo(w / 2, -h / 4);
        ctx.lineTo(w / 2, h / 3);
        ctx.lineTo(w / 4, h / 2);
        ctx.lineTo(-w / 4, h / 2);
        ctx.lineTo(-w / 2, h / 3);
        ctx.lineTo(-w / 2, -h / 4);
        ctx.closePath();
        ctx.fill();

        // Windshield
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.moveTo(0, -h / 3);
        ctx.lineTo(w / 3, -h / 8);
        ctx.lineTo(w / 3, h / 10);
        ctx.lineTo(-w / 3, h / 10);
        ctx.lineTo(-w / 3, -h / 8);
        ctx.closePath();
        ctx.fill();

        // Outline
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  /**
   * Render player car
   */
  renderPlayer(ctx) {
    ctx.save();
    ctx.translate(this.player.x, this.player.y);
    ctx.rotate(this.player.angle);

    // Flash if invincible
    if (this.player.invincible && Math.floor(Date.now() / 100) % 2) {
      ctx.globalAlpha = 0.5;
    }

    const w = this.player.width;
    const h = this.player.height;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(4, 6, w * 0.45, h * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Try to draw player car image
    const playerImage = this.assetLoader.get('player_car');
    if (playerImage && playerImage.complete) {
      ctx.drawImage(playerImage, -w / 2, -h / 2, w, h);
    } else {
      // Canvas fallback - Formula 1 style
      ctx.fillStyle = '#FF2D55';  // Red
      ctx.beginPath();
      ctx.moveTo(0, -h / 2);              // Nose
      ctx.lineTo(w / 2.5, -h / 3);        // Front wing right
      ctx.lineTo(w / 2, -h / 4);
      ctx.lineTo(w / 2, h / 3);           // Side right
      ctx.lineTo(w / 2.5, h / 2);         // Rear wing right
      ctx.lineTo(-w / 2.5, h / 2);        // Rear wing left
      ctx.lineTo(-w / 2, h / 3);
      ctx.lineTo(-w / 2, -h / 4);
      ctx.lineTo(-w / 2.5, -h / 3);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.ellipse(0, -h / 8, w / 4, h / 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Driver helmet
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, -h / 8, 6, 0, Math.PI * 2);
      ctx.fill();

      // Outline
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -h / 2);
      ctx.lineTo(w / 2.5, -h / 3);
      ctx.lineTo(w / 2, -h / 4);
      ctx.lineTo(w / 2, h / 3);
      ctx.lineTo(w / 2.5, h / 2);
      ctx.lineTo(-w / 2.5, h / 2);
      ctx.lineTo(-w / 2, h / 3);
      ctx.lineTo(-w / 2, -h / 4);
      ctx.lineTo(-w / 2.5, -h / 3);
      ctx.closePath();
      ctx.stroke();
    }

    // Exhaust flames when accelerating
    if (this.player.speed > 0.3 && !this.player.spinning) {
      const flameLength = this.player.boosted ? 30 : 15;
      ctx.fillStyle = this.player.boosted ? '#00ffff' : '#ff6600';
      ctx.beginPath();
      ctx.moveTo(-w / 6, h / 2);
      ctx.lineTo(0, h / 2 + flameLength + Math.random() * 10);
      ctx.lineTo(w / 6, h / 2);
      ctx.fill();

      ctx.fillStyle = this.player.boosted ? '#ffffff' : '#ffcc00';
      ctx.beginPath();
      ctx.moveTo(-w / 10, h / 2);
      ctx.lineTo(0, h / 2 + flameLength * 0.6 + Math.random() * 5);
      ctx.lineTo(w / 10, h / 2);
      ctx.fill();
    }

    ctx.restore();

    // Shield effect (drawn after restore so it's not rotated)
    if (this.player.shielded) {
      ctx.save();
      ctx.translate(this.player.x, this.player.y);

      // Pulsing shield bubble
      const pulseSize = 1 + Math.sin(Date.now() * 0.01) * 0.1;
      const shieldRadius = Math.max(w, h) * 0.7 * pulseSize;

      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner glow
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.restore();
    }

    // Boost trail effect
    if (this.player.boosted) {
      ctx.save();
      ctx.translate(this.player.x, this.player.y);

      // Speed lines
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const offsetX = (Math.random() - 0.5) * w;
        const startY = h / 2 + 10;
        const endY = startY + 30 + Math.random() * 20;
        ctx.beginPath();
        ctx.moveTo(offsetX, startY);
        ctx.lineTo(offsetX, endY);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  /**
   * Render night overlay with headlights
   */
  renderNightOverlay(ctx) {
    // Dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Headlight cone
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    const gradient = ctx.createRadialGradient(
      this.player.x, this.player.y - 50,
      10,
      this.player.x, this.player.y - 100,
      this.headlightRadius
    );
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.player.x, this.player.y - 30);
    ctx.lineTo(this.player.x - this.headlightRadius * 0.8, this.player.y - this.headlightRadius * 1.5);
    ctx.lineTo(this.player.x + this.headlightRadius * 0.8, this.player.y - this.headlightRadius * 1.5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * Render speed effect lines
   */
  renderSpeedEffect(ctx) {
    const intensity = this.player.speed;
    const numLines = Math.floor(intensity * 15);

    ctx.strokeStyle = `rgba(255,255,255,${intensity * 0.3})`;
    ctx.lineWidth = 2;

    for (let i = 0; i < numLines; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const length = 20 + intensity * 40;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + length);
      ctx.stroke();
    }
  }

  /**
   * Render slowmo effect
   */
  renderSlowmoEffect(ctx) {
    // Blue tint overlay
    ctx.fillStyle = 'rgba(0, 100, 200, 0.15)';
    ctx.fillRect(0, 0, this.width, this.height);

    // Time indicator text
    ctx.fillStyle = '#0ff';
    ctx.font = 'bold 14px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`⏱️ SLOW TIME: ${this.slowmoTime.toFixed(1)}s`, this.width / 2, 110);

    // Vignette effect
    const gradient = ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, this.width * 0.7
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 50, 100, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Render zone name
   */
  renderZoneName(ctx) {
    const currentSegment = this.roadSegments[Math.floor(this.visibleSegments / 2)];
    if (!currentSegment) return;

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(currentSegment.zoneName || '', this.width / 2, 80);
  }

  /**
   * Render scenery objects on track sides
   */
  renderScenery(ctx) {
    for (const obj of this.sceneryObjects) {
      ctx.save();
      ctx.translate(obj.x, obj.y);

      const w = obj.width;
      const h = obj.height;

      // Draw based on scenery type
      switch (obj.type) {
        case 'city':
          // Buildings
          ctx.fillStyle = this.isNight ? '#1a1a2e' : obj.color;
          ctx.fillRect(-w / 2, -h / 2, w, h);
          // Windows
          ctx.fillStyle = this.isNight ? '#ff0' : '#87CEEB';
          const windowSize = 5;
          for (let wy = -h / 2 + 8; wy < h / 2 - 8; wy += 12) {
            for (let wx = -w / 2 + 6; wx < w / 2 - 6; wx += 10) {
              if (Math.random() > 0.3 || this.isNight) {
                ctx.fillRect(wx, wy, windowSize, windowSize);
              }
            }
          }
          break;

        case 'highway':
          // Highway barriers/signs
          ctx.fillStyle = '#888';
          ctx.fillRect(-w / 2, -h / 2, w, h);
          ctx.fillStyle = '#ff0';
          ctx.fillRect(-w / 2 + 2, -h / 2 + 2, w - 4, 4);
          break;

        case 'mountain':
          // Trees (pine tree shape)
          ctx.fillStyle = '#1a5f1a';
          ctx.beginPath();
          ctx.moveTo(0, -h / 2);
          ctx.lineTo(w / 2, h / 3);
          ctx.lineTo(w / 4, h / 3);
          ctx.lineTo(w / 3, h / 2);
          ctx.lineTo(-w / 3, h / 2);
          ctx.lineTo(-w / 4, h / 3);
          ctx.lineTo(-w / 2, h / 3);
          ctx.closePath();
          ctx.fill();
          // Trunk
          ctx.fillStyle = '#4a3020';
          ctx.fillRect(-w / 8, h / 3, w / 4, h / 6);
          break;

        case 'coastal':
          // Palm trees
          ctx.fillStyle = '#4a3020';
          ctx.fillRect(-3, -h / 4, 6, h / 2 + h / 4);
          // Fronds
          ctx.fillStyle = '#2d8a2d';
          for (let i = 0; i < 5; i++) {
            ctx.save();
            ctx.translate(0, -h / 4);
            ctx.rotate((i - 2) * 0.6);
            ctx.beginPath();
            ctx.ellipse(0, -10, 4, 20, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          break;

        case 'tunnel':
          // Tunnel wall segment
          ctx.fillStyle = '#333';
          ctx.fillRect(-w / 2, -h / 2, w, h);
          ctx.fillStyle = '#ff6600';
          ctx.beginPath();
          ctx.arc(0, 0, 4, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'ice':
          // Ice crystals
          ctx.fillStyle = '#aaddff';
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -h / 2);
          ctx.lineTo(w / 3, 0);
          ctx.lineTo(0, h / 2);
          ctx.lineTo(-w / 3, 0);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
          break;

        case 'rain':
          // Puddle/wet ground
          ctx.fillStyle = 'rgba(100, 150, 200, 0.4)';
          ctx.beginPath();
          ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          break;

        default:
          // Generic scenery
          ctx.fillStyle = obj.color;
          ctx.fillRect(-w / 2, -h / 2, w, h);
      }

      ctx.restore();
    }
  }

  /**
   * Toggle pause
   */
  togglePause() {
    this.paused = !this.paused;
    this.showOverlay('pause-overlay', this.paused);
  }

  /**
   * Restart race
   */
  restartRace() {
    // Stop any playing BGM before restarting
    this.soundSystem.stopBgm();
    this.showOverlay('pause-overlay', false);
    this.paused = false;
    this.state = 'ready';
    this.startRace();
  }

  /**
   * Quit to title
   */
  quitToTitle() {
    // Stop any playing BGM when returning to title
    this.soundSystem.stopBgm();
    this.state = 'ready';
    this.paused = false;
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
