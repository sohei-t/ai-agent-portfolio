/**
 * IsometricRacing.js - Fast Arcade Racing with 45-degree Isometric View
 * Prioritizes gameplay over realism
 */

export class IsometricRacing {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Game dimensions
    this.width = 0;
    this.height = 0;

    // Track definition - oval circuit
    this.track = null;
    this.trackWidth = 120;

    // Cars
    this.player = null;
    this.aiCars = [];

    // Camera - faster follow for more responsive feel
    this.camera = { x: 0, y: 0 };
    this.cameraSmoothing = 0.15;  // Increased from 0.1 - snappier camera

    // Game state
    this.state = 'ready';
    this.raceTime = 0;
    this.countdown = 0;
    this.paused = false;

    // Items
    this.itemBoxes = [];
    this.activeItems = [];

    // Input state
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false
    };

    // Touch state
    this.touchSteering = 0;
    this.touchAccel = false;
    this.touchBrake = false;

    // Performance
    this.lastTime = 0;
    this.fps = 60;

    // Settings
    this.totalLaps = 3;
    this.numOpponents = 4;
  }

  /**
   * Initialize the game
   */
  async init() {
    console.log('Initializing Isometric Racing...');

    // Setup canvas
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Create track
    this.createTrack();

    // Create cars
    this.createCars();

    // Place item boxes
    this.placeItemBoxes();

    // Setup input
    this.setupInput();

    // Setup UI
    this.setupUI();

    console.log('Isometric Racing initialized!');
    this.state = 'ready';
  }

  /**
   * Resize canvas
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
  }

  /**
   * Create the race track - an oval circuit
   */
  createTrack() {
    // Track is defined as a series of center points
    // We'll create an oval with some interesting curves
    const points = [];
    const segments = 200;

    // Track parameters
    const trackLength = 800;  // horizontal length
    const trackHeight = 400;  // vertical height
    const centerX = 0;
    const centerY = 0;

    // Create oval with some variations
    for (let i = 0; i < segments; i++) {
      const t = (i / segments) * Math.PI * 2;

      // Basic oval
      let x = Math.cos(t) * trackLength;
      let y = Math.sin(t) * trackHeight;

      // Add some interesting variations
      const variation = Math.sin(t * 3) * 50 + Math.cos(t * 5) * 30;
      x += Math.cos(t + Math.PI/2) * variation * 0.3;
      y += Math.sin(t + Math.PI/2) * variation * 0.3;

      points.push({ x: centerX + x, y: centerY + y });
    }

    // Calculate distances and angles
    this.track = {
      points: points,
      width: this.trackWidth,
      totalLength: 0,
      distances: [],
      angles: []
    };

    let totalDist = 0;
    for (let i = 0; i < points.length; i++) {
      const next = points[(i + 1) % points.length];
      const dx = next.x - points[i].x;
      const dy = next.y - points[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      this.track.distances.push(totalDist);
      this.track.angles.push(angle);
      totalDist += dist;
    }

    this.track.totalLength = totalDist;
    console.log(`Track created: ${segments} points, length: ${totalDist.toFixed(0)}`);
  }

  /**
   * Create player and AI cars
   */
  createCars() {
    // Player car - FAST and responsive!
    this.player = this.createCar({
      id: 'player',
      isPlayer: true,
      color: '#FF2D95',  // Neon pink
      name: 'YOU',
      x: this.track.points[0].x,
      y: this.track.points[0].y - 50,
      angle: this.track.angles[0],
      maxSpeed: 1200,      // Increased from 800
      acceleration: 2000,  // Increased from 1200
      handling: 7.0,       // Increased from 5.0 - more responsive steering
      friction: 0.985      // Less friction = maintains speed better
    });

    // AI cars
    const aiColors = ['#00F5FF', '#FFE135', '#39FF14', '#BF40FF'];
    const aiNames = ['BLUE', 'GOLD', 'GREEN', 'PURPLE'];

    this.aiCars = [];
    for (let i = 0; i < this.numOpponents; i++) {
      const startIdx = Math.floor((i + 1) * this.track.points.length / (this.numOpponents + 2));
      const startPoint = this.track.points[startIdx];

      const ai = this.createCar({
        id: `ai${i}`,
        isPlayer: false,
        color: aiColors[i],
        name: aiNames[i],
        x: startPoint.x,
        y: startPoint.y,
        angle: this.track.angles[startIdx],
        maxSpeed: 1000 + Math.random() * 200,   // Faster AI
        acceleration: 1600 + Math.random() * 300,
        handling: 5.5 + Math.random() * 2.0,
        friction: 0.985
      });

      this.aiCars.push(ai);
    }
  }

  /**
   * Create a car object
   */
  createCar(config) {
    return {
      id: config.id,
      isPlayer: config.isPlayer,
      color: config.color,
      name: config.name,
      x: config.x,
      y: config.y,
      angle: config.angle,
      speed: 0,
      maxSpeed: config.maxSpeed,
      acceleration: config.acceleration,
      handling: config.handling,
      friction: config.friction,
      width: 30,
      height: 50,
      lap: 1,
      lapProgress: 0,
      lastCheckpoint: 0,
      position: 1,
      finished: false,
      finishTime: 0,
      bestLap: Infinity,
      currentLapTime: 0,
      item: null,
      boosting: false,
      boostTime: 0,
      spinning: false,
      spinTime: 0,
      invincible: false,
      invincibleTime: 0,
      // Drift
      drifting: false,
      driftAngle: 0,
      driftCharge: 0
    };
  }

  /**
   * Place item boxes on the track
   */
  placeItemBoxes() {
    this.itemBoxes = [];
    const numBoxes = 12;

    for (let i = 0; i < numBoxes; i++) {
      const idx = Math.floor((i / numBoxes) * this.track.points.length);
      const point = this.track.points[idx];
      const angle = this.track.angles[idx];

      // Offset to side of track
      const offset = (i % 2 === 0 ? 1 : -1) * this.trackWidth * 0.3;

      this.itemBoxes.push({
        x: point.x + Math.cos(angle + Math.PI/2) * offset,
        y: point.y + Math.sin(angle + Math.PI/2) * offset,
        active: true,
        respawnTime: 0
      });
    }
  }

  /**
   * Setup keyboard and touch input
   */
  setupInput() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowUp': case 'w': case 'W': this.keys.up = true; break;
        case 'ArrowDown': case 's': case 'S': this.keys.down = true; break;
        case 'ArrowLeft': case 'a': case 'A': this.keys.left = true; break;
        case 'ArrowRight': case 'd': case 'D': this.keys.right = true; break;
        case ' ': this.keys.space = true; this.useItem(); break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch(e.key) {
        case 'ArrowUp': case 'w': case 'W': this.keys.up = false; break;
        case 'ArrowDown': case 's': case 'S': this.keys.down = false; break;
        case 'ArrowLeft': case 'a': case 'A': this.keys.left = false; break;
        case 'ArrowRight': case 'd': case 'D': this.keys.right = false; break;
        case ' ': this.keys.space = false; break;
      }
    });

    // Touch controls
    this.setupTouchControls();
  }

  /**
   * Setup touch controls
   */
  setupTouchControls() {
    const leftBtn = document.getElementById('btn-steer-left');
    const rightBtn = document.getElementById('btn-steer-right');
    const accelBtn = document.getElementById('btn-accel');
    const brakeBtn = document.getElementById('btn-brake');
    const itemBtn = document.getElementById('btn-use-item');

    // Helper for touch events
    const addTouchEvents = (el, onStart, onEnd) => {
      if (!el) return;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(); }, { passive: false });
      el.addEventListener('touchend', (e) => { e.preventDefault(); onEnd(); }, { passive: false });
      el.addEventListener('mousedown', onStart);
      el.addEventListener('mouseup', onEnd);
      el.addEventListener('mouseleave', onEnd);
    };

    addTouchEvents(leftBtn, () => this.touchSteering = -1, () => { if (this.touchSteering === -1) this.touchSteering = 0; });
    addTouchEvents(rightBtn, () => this.touchSteering = 1, () => { if (this.touchSteering === 1) this.touchSteering = 0; });
    addTouchEvents(accelBtn, () => this.touchAccel = true, () => this.touchAccel = false);
    addTouchEvents(brakeBtn, () => this.touchBrake = true, () => this.touchBrake = false);
    addTouchEvents(itemBtn, () => this.useItem(), () => {});
  }

  /**
   * Setup UI handlers
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
    document.getElementById('item-box')?.addEventListener('click', () => this.useItem());
    document.getElementById('btn-item-gyro')?.addEventListener('click', () => this.useItem());

    this.showScreen('title-screen');
  }

  /**
   * Show screen
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
    if (overlay) overlay.classList.toggle('active', show);
  }

  /**
   * Start the race
   */
  async startRace() {
    console.log('Starting race...');

    // Reset cars
    this.resetCars();

    // Show game screen
    this.showScreen('game-screen');

    // Wait for layout
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => requestAnimationFrame(r));
    this.resizeCanvas();

    // Initialize camera
    this.camera.x = this.player.x;
    this.camera.y = this.player.y;

    // Start countdown
    this.state = 'countdown';
    this.countdown = 3;
    this.raceTime = 0;

    // Start game loop
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);

    // Countdown
    await this.runCountdown();
  }

  /**
   * Reset cars to starting positions
   */
  resetCars() {
    // Player at start
    this.player.x = this.track.points[0].x;
    this.player.y = this.track.points[0].y - 50;
    this.player.angle = this.track.angles[0];
    this.player.speed = 0;
    this.player.lap = 1;
    this.player.lapProgress = 0;
    this.player.lastCheckpoint = 0;
    this.player.position = 1;
    this.player.finished = false;
    this.player.item = null;
    this.player.boosting = false;
    this.player.spinning = false;
    this.player.currentLapTime = 0;
    this.player.bestLap = Infinity;

    // AI cars staggered behind
    this.aiCars.forEach((ai, i) => {
      const offset = -(i + 1) * 80;
      ai.x = this.track.points[0].x + offset * Math.cos(this.track.angles[0]);
      ai.y = this.track.points[0].y - 50 + offset * Math.sin(this.track.angles[0]) + (i % 2 === 0 ? 30 : -30);
      ai.angle = this.track.angles[0];
      ai.speed = 0;
      ai.lap = 1;
      ai.lapProgress = 0;
      ai.lastCheckpoint = 0;
      ai.finished = false;
      ai.item = null;
      ai.boosting = false;
      ai.spinning = false;
    });

    // Reset item boxes
    this.itemBoxes.forEach(box => {
      box.active = true;
      box.respawnTime = 0;
    });

    this.activeItems = [];
  }

  /**
   * Run countdown
   */
  async runCountdown() {
    this.showOverlay('countdown-overlay', true);
    const countdownEl = document.querySelector('#countdown-display .countdown-number');

    for (let i = 3; i >= 0; i--) {
      if (countdownEl) {
        countdownEl.textContent = i === 0 ? 'GO!' : i;
        countdownEl.className = 'countdown-number' + (i === 0 ? ' go' : '');
      }
      await this.delay(800);
    }

    this.showOverlay('countdown-overlay', false);
    this.state = 'racing';
  }

  /**
   * Main game loop
   */
  gameLoop(timestamp) {
    if (this.state === 'ready') return;

    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
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
    this.updateCar(this.player, this.getPlayerInput(), dt);

    // Update AI
    this.aiCars.forEach(ai => {
      const aiInput = this.getAIInput(ai);
      this.updateCar(ai, aiInput, dt);
    });

    // Check collisions
    this.checkCarCollisions();

    // Check item boxes
    this.checkItemCollection();

    // Update items
    this.updateItems(dt);

    // Update positions
    this.updatePositions();

    // Check finish
    this.checkRaceFinish();

    // Update camera
    this.updateCamera(dt);

    // Update HUD
    this.updateHUD();
  }

  /**
   * Get player input
   */
  getPlayerInput() {
    return {
      accelerate: this.keys.up || this.touchAccel || true,  // Auto-accelerate for arcade feel
      brake: this.keys.down || this.touchBrake,
      steer: (this.keys.left ? -1 : 0) + (this.keys.right ? 1 : 0) + this.touchSteering
    };
  }

  /**
   * Get AI input
   */
  getAIInput(ai) {
    // Find target point ahead on track
    const lookAhead = 100 + ai.speed * 0.15;
    const targetIdx = this.findClosestTrackPoint(ai.x, ai.y);
    const aheadIdx = (targetIdx + Math.floor(lookAhead / 10)) % this.track.points.length;
    const target = this.track.points[aheadIdx];

    // Calculate angle to target
    const dx = target.x - ai.x;
    const dy = target.y - ai.y;
    const targetAngle = Math.atan2(dy, dx);

    // Calculate steering
    let angleDiff = targetAngle - ai.angle;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    const steer = Math.max(-1, Math.min(1, angleDiff * 2));

    // Random variations
    const shouldBrake = Math.abs(angleDiff) > 0.5 && ai.speed > ai.maxSpeed * 0.7;

    return {
      accelerate: true,
      brake: shouldBrake,
      steer: steer + (Math.random() - 0.5) * 0.1
    };
  }

  /**
   * Update a car
   */
  updateCar(car, input, dt) {
    // Handle spinning (crashed)
    if (car.spinning) {
      car.spinTime -= dt;
      car.angle += 10 * dt;
      car.speed *= 0.95;
      if (car.spinTime <= 0) {
        car.spinning = false;
      }
      return;
    }

    // Handle boosting
    if (car.boosting) {
      car.boostTime -= dt;
      if (car.boostTime <= 0) {
        car.boosting = false;
      }
    }

    // Handle invincibility
    if (car.invincible) {
      car.invincibleTime -= dt;
      if (car.invincibleTime <= 0) {
        car.invincible = false;
      }
    }

    // Get max speed (with boost)
    const maxSpeed = car.maxSpeed * (car.boosting ? 1.5 : 1);

    // Acceleration
    if (input.accelerate && !input.brake) {
      car.speed += car.acceleration * dt;
    }

    // Braking
    if (input.brake) {
      car.speed -= car.acceleration * 1.5 * dt;
    }

    // Friction
    car.speed *= Math.pow(car.friction, dt * 60);

    // Clamp speed
    car.speed = Math.max(0, Math.min(maxSpeed, car.speed));

    // Steering (more responsive at higher speeds)
    const steerFactor = car.handling * (0.5 + car.speed / car.maxSpeed * 0.5);
    car.angle += input.steer * steerFactor * dt;

    // Drift detection
    const turning = Math.abs(input.steer) > 0.3;
    const fastEnough = car.speed > car.maxSpeed * 0.5;

    if (turning && fastEnough) {
      car.drifting = true;
      car.driftCharge = Math.min(3, car.driftCharge + dt * 2);
    } else if (car.drifting) {
      // Release drift boost
      if (car.driftCharge >= 1) {
        car.boosting = true;
        car.boostTime = 0.3 + car.driftCharge * 0.2;
      }
      car.drifting = false;
      car.driftCharge = 0;
    }

    // Move car
    car.x += Math.cos(car.angle) * car.speed * dt;
    car.y += Math.sin(car.angle) * car.speed * dt;

    // Keep car on track (push back if off track)
    const trackPoint = this.findClosestTrackPoint(car.x, car.y);
    const tp = this.track.points[trackPoint];
    const dist = Math.sqrt((car.x - tp.x) ** 2 + (car.y - tp.y) ** 2);

    if (dist > this.trackWidth) {
      // Off track - slow down and push back
      car.speed *= 0.8;
      const pushAngle = Math.atan2(tp.y - car.y, tp.x - car.x);
      car.x += Math.cos(pushAngle) * (dist - this.trackWidth) * 0.5;
      car.y += Math.sin(pushAngle) * (dist - this.trackWidth) * 0.5;
    }

    // Update lap progress
    this.updateCarLapProgress(car);

    // Update lap time
    if (car.isPlayer) {
      car.currentLapTime += dt;
    }
  }

  /**
   * Find closest track point to a position
   */
  findClosestTrackPoint(x, y) {
    let closest = 0;
    let closestDist = Infinity;

    for (let i = 0; i < this.track.points.length; i++) {
      const p = this.track.points[i];
      const d = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    }

    return closest;
  }

  /**
   * Update car's lap progress
   */
  updateCarLapProgress(car) {
    const currentPoint = this.findClosestTrackPoint(car.x, car.y);
    const totalPoints = this.track.points.length;

    // Check for lap completion
    const prevProgress = car.lapProgress;
    car.lapProgress = currentPoint / totalPoints;

    // Crossed start line (going forward)
    if (prevProgress > 0.9 && car.lapProgress < 0.1) {
      car.lap++;

      // Record lap time
      if (car.isPlayer) {
        if (car.currentLapTime < car.bestLap) {
          car.bestLap = car.currentLapTime;
        }
        car.currentLapTime = 0;
        this.showLapPopup(car.lap - 1);
      }
    }

    // Going backwards
    if (prevProgress < 0.1 && car.lapProgress > 0.9) {
      car.lap = Math.max(1, car.lap - 1);
    }
  }

  /**
   * Check car collisions
   */
  checkCarCollisions() {
    const allCars = [this.player, ...this.aiCars];

    for (let i = 0; i < allCars.length; i++) {
      for (let j = i + 1; j < allCars.length; j++) {
        const car1 = allCars[i];
        const car2 = allCars[j];

        const dx = car2.x - car1.x;
        const dy = car2.y - car1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = (car1.width + car2.width) / 2;

        if (dist < minDist) {
          // Collision!
          const angle = Math.atan2(dy, dx);
          const overlap = minDist - dist;

          // Push cars apart
          car1.x -= Math.cos(angle) * overlap * 0.5;
          car1.y -= Math.sin(angle) * overlap * 0.5;
          car2.x += Math.cos(angle) * overlap * 0.5;
          car2.y += Math.sin(angle) * overlap * 0.5;

          // Speed exchange
          const speed1 = car1.speed;
          const speed2 = car2.speed;
          car1.speed = speed2 * 0.8;
          car2.speed = speed1 * 0.8;

          // Check if invincible car hit another
          if (car1.invincible && !car2.invincible) {
            this.spinCar(car2);
          } else if (car2.invincible && !car1.invincible) {
            this.spinCar(car1);
          }
        }
      }
    }
  }

  /**
   * Spin a car (crash effect)
   */
  spinCar(car) {
    if (car.invincible) return;
    car.spinning = true;
    car.spinTime = 1.5;
    car.speed *= 0.3;
  }

  /**
   * Check item collection
   */
  checkItemCollection() {
    const allCars = [this.player, ...this.aiCars];

    for (const box of this.itemBoxes) {
      if (!box.active) continue;

      for (const car of allCars) {
        const dx = car.x - box.x;
        const dy = car.y - box.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 40 && !car.item) {
          box.active = false;
          box.respawnTime = 5;
          this.giveItem(car);
        }
      }
    }

    // Respawn item boxes
    this.itemBoxes.forEach(box => {
      if (!box.active) {
        box.respawnTime -= 1/60;
        if (box.respawnTime <= 0) {
          box.active = true;
        }
      }
    });
  }

  /**
   * Give random item to car
   */
  giveItem(car) {
    const items = [
      { id: 'mushroom', icon: '🍄', name: 'Boost' },
      { id: 'banana', icon: '🍌', name: 'Banana' },
      { id: 'shell', icon: '🐚', name: 'Shell' },
      { id: 'star', icon: '⭐', name: 'Star' }
    ];

    // Weight based on position (back of pack gets better items)
    let weights = [0.4, 0.3, 0.2, 0.1];
    if (car.position > 2) weights = [0.5, 0.2, 0.15, 0.15];
    if (car.position > 3) weights = [0.6, 0.1, 0.1, 0.2];

    const rand = Math.random();
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += weights[i];
      if (rand < sum) {
        car.item = items[i];
        break;
      }
    }

    if (car.isPlayer) {
      this.updateItemUI();
    }
  }

  /**
   * Use current item
   */
  useItem() {
    if (!this.player.item || this.state !== 'racing') return;

    const item = this.player.item;
    this.player.item = null;
    this.updateItemUI();

    switch (item.id) {
      case 'mushroom':
        this.player.boosting = true;
        this.player.boostTime = 1.5;
        break;

      case 'banana':
        this.activeItems.push({
          type: 'banana',
          x: this.player.x - Math.cos(this.player.angle) * 60,
          y: this.player.y - Math.sin(this.player.angle) * 60,
          active: true
        });
        break;

      case 'shell':
        this.activeItems.push({
          type: 'shell',
          x: this.player.x,
          y: this.player.y,
          angle: this.player.angle,
          speed: 1200,
          active: true
        });
        break;

      case 'star':
        this.player.invincible = true;
        this.player.invincibleTime = 8;
        this.player.boosting = true;
        this.player.boostTime = 8;
        break;
    }
  }

  /**
   * Update active items
   */
  updateItems(dt) {
    const allCars = [this.player, ...this.aiCars];

    this.activeItems = this.activeItems.filter(item => {
      if (!item.active) return false;

      if (item.type === 'shell') {
        // Move shell
        item.x += Math.cos(item.angle) * item.speed * dt;
        item.y += Math.sin(item.angle) * item.speed * dt;

        // Check collision with cars (except player who fired)
        for (const car of this.aiCars) {
          const dist = Math.sqrt((car.x - item.x) ** 2 + (car.y - item.y) ** 2);
          if (dist < 40) {
            this.spinCar(car);
            item.active = false;
            return false;
          }
        }

        // Check if off track
        const trackPoint = this.findClosestTrackPoint(item.x, item.y);
        const tp = this.track.points[trackPoint];
        const trackDist = Math.sqrt((item.x - tp.x) ** 2 + (item.y - tp.y) ** 2);
        if (trackDist > this.trackWidth * 2) {
          return false;
        }
      }

      if (item.type === 'banana') {
        // Check collision with all cars
        for (const car of allCars) {
          const dist = Math.sqrt((car.x - item.x) ** 2 + (car.y - item.y) ** 2);
          if (dist < 30 && !car.invincible) {
            this.spinCar(car);
            item.active = false;
            return false;
          }
        }
      }

      return true;
    });
  }

  /**
   * Update race positions
   */
  updatePositions() {
    const allCars = [this.player, ...this.aiCars];

    // Sort by lap and progress
    allCars.sort((a, b) => {
      if (a.lap !== b.lap) return b.lap - a.lap;
      return b.lapProgress - a.lapProgress;
    });

    allCars.forEach((car, i) => {
      car.position = i + 1;
    });
  }

  /**
   * Check race finish
   */
  checkRaceFinish() {
    if (this.player.lap > this.totalLaps && !this.player.finished) {
      this.player.finished = true;
      this.player.finishTime = this.raceTime;
      this.finishRace();
    }
  }

  /**
   * Finish race
   */
  finishRace() {
    this.state = 'finished';

    // Update results screen
    const titleEl = document.querySelector('.results-title');
    const pos = this.player.position;
    const suffixes = ['ST', 'ND', 'RD', 'TH', 'TH'];

    if (titleEl) {
      titleEl.textContent = pos <= 3
        ? `🏆 ${pos}${suffixes[pos-1]} PLACE! 🏆`
        : `${pos}${suffixes[pos-1]} PLACE`;
      titleEl.className = 'results-title' + (pos === 1 ? ' victory' : '');
    }

    const resultTime = document.getElementById('result-time');
    const resultBestLap = document.getElementById('result-best-lap');

    if (resultTime) resultTime.textContent = this.formatTime(this.raceTime);
    if (resultBestLap) resultBestLap.textContent = this.formatTime(this.player.bestLap);

    setTimeout(() => this.showScreen('results-screen'), 2000);
  }

  /**
   * Update camera
   */
  updateCamera(dt) {
    // Target significantly ahead of player for better visibility
    // More look-ahead at higher speeds
    const speedFactor = this.player.speed / this.player.maxSpeed;
    const lookAhead = 150 + speedFactor * 100;  // 150-250 based on speed
    const targetX = this.player.x + Math.cos(this.player.angle) * lookAhead;
    const targetY = this.player.y + Math.sin(this.player.angle) * lookAhead;

    // Smooth follow with speed-based responsiveness
    const smoothing = this.cameraSmoothing + speedFactor * 0.1;
    this.camera.x += (targetX - this.camera.x) * smoothing;
    this.camera.y += (targetY - this.camera.y) * smoothing;
  }

  /**
   * Update HUD
   */
  updateHUD() {
    const posEl = document.getElementById('current-position');
    const lapEl = document.getElementById('current-lap');
    const speedFill = document.getElementById('speed-fill');

    if (posEl) {
      posEl.textContent = this.player.position;
      const suffixEl = document.querySelector('.position-suffix');
      if (suffixEl) {
        const suffixes = ['ST', 'ND', 'RD', 'TH', 'TH'];
        suffixEl.textContent = suffixes[this.player.position - 1];
      }
    }

    if (lapEl) {
      lapEl.textContent = Math.min(this.player.lap, this.totalLaps);
    }

    if (speedFill) {
      const percent = (this.player.speed / this.player.maxSpeed) * 100;
      speedFill.style.height = `${percent}%`;
    }
  }

  /**
   * Update item UI
   */
  updateItemUI() {
    const itemBox = document.getElementById('item-box');
    const itemIcon = document.getElementById('item-icon');

    if (itemBox && itemIcon) {
      if (this.player.item) {
        itemBox.classList.remove('empty');
        itemBox.classList.add('has-item');
        itemIcon.textContent = this.player.item.icon;
      } else {
        itemBox.classList.add('empty');
        itemBox.classList.remove('has-item');
        itemIcon.textContent = '?';
      }
    }
  }

  /**
   * Show lap popup
   */
  showLapPopup(lap) {
    const popup = document.getElementById('lap-popup');
    const numEl = document.getElementById('lap-complete-num');
    const timeEl = document.getElementById('lap-time');

    if (popup && numEl && timeEl) {
      numEl.textContent = lap;
      timeEl.textContent = this.formatTime(this.player.bestLap);
      popup.classList.add('active');
      setTimeout(() => popup.classList.remove('active'), 2000);
    }
  }

  /**
   * Render the game
   */
  render() {
    if (!this.width || !this.height) return;

    const ctx = this.ctx;

    // Clear
    ctx.fillStyle = '#1a5f2a';  // Grass green
    ctx.fillRect(0, 0, this.width, this.height);

    // Save context for camera transform
    ctx.save();

    // Apply camera transform (center on camera position)
    ctx.translate(this.width / 2 - this.camera.x, this.height / 2 - this.camera.y);

    // Apply 45-degree rotation for isometric effect (optional - comment out for pure top-down)
    // ctx.translate(this.camera.x, this.camera.y);
    // ctx.rotate(-Math.PI / 4);
    // ctx.translate(-this.camera.x, -this.camera.y);

    // Render track
    this.renderTrack(ctx);

    // Render item boxes
    this.renderItemBoxes(ctx);

    // Render active items (bananas, shells)
    this.renderActiveItems(ctx);

    // Render cars (sorted by Y for proper overlap)
    const allCars = [this.player, ...this.aiCars].sort((a, b) => a.y - b.y);
    allCars.forEach(car => this.renderCar(ctx, car));

    ctx.restore();

    // Render speed lines effect - starts at 50% speed for more frequent visual feedback
    if (this.player.speed > this.player.maxSpeed * 0.5) {
      this.renderSpeedLines(ctx);
    }

    // Render boost effect
    if (this.player.boosting) {
      this.renderBoostEffect(ctx);
    }
  }

  /**
   * Render track
   */
  renderTrack(ctx) {
    const points = this.track.points;
    const width = this.trackWidth;

    // Draw track surface
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();

    // Track fill
    ctx.strokeStyle = '#333';
    ctx.lineWidth = width * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Track surface
    ctx.strokeStyle = '#555';
    ctx.lineWidth = width * 1.8;
    ctx.stroke();

    // Center line
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Edge lines
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;

    // Draw edges
    for (let edge = -1; edge <= 1; edge += 2) {
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const angle = this.track.angles[i] + Math.PI / 2;
        const x = points[i].x + Math.cos(angle) * width * 0.9 * edge;
        const y = points[i].y + Math.sin(angle) * width * 0.9 * edge;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Start/Finish line
    const start = points[0];
    const startAngle = this.track.angles[0] + Math.PI / 2;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(
      start.x + Math.cos(startAngle) * width,
      start.y + Math.sin(startAngle) * width
    );
    ctx.lineTo(
      start.x - Math.cos(startAngle) * width,
      start.y - Math.sin(startAngle) * width
    );
    ctx.stroke();

    // Checkered pattern on start line
    ctx.fillStyle = '#000';
    const checkSize = 15;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 2; j++) {
        if ((i + j) % 2 === 0) {
          const offset = (i - 4) * checkSize;
          ctx.fillRect(
            start.x + Math.cos(startAngle) * offset - checkSize/2,
            start.y + Math.sin(startAngle) * offset - checkSize/2,
            checkSize,
            checkSize
          );
        }
      }
    }
  }

  /**
   * Render item boxes
   */
  renderItemBoxes(ctx) {
    const time = Date.now() / 1000;

    this.itemBoxes.forEach(box => {
      if (!box.active) return;

      const bob = Math.sin(time * 3) * 3;
      const size = 30;

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.ellipse(box.x, box.y + 5, size * 0.6, size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Box
      ctx.fillStyle = '#ffcc00';
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 3;

      ctx.save();
      ctx.translate(box.x, box.y + bob);
      ctx.rotate(time * 2);
      ctx.fillRect(-size/2, -size/2, size, size);
      ctx.strokeRect(-size/2, -size/2, size, size);

      // Question mark
      ctx.fillStyle = '#000';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('?', 0, 0);
      ctx.restore();
    });
  }

  /**
   * Render active items
   */
  renderActiveItems(ctx) {
    this.activeItems.forEach(item => {
      if (item.type === 'banana') {
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🍌', item.x, item.y);
      }

      if (item.type === 'shell') {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.angle);
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐚', 0, 0);
        ctx.restore();
      }
    });
  }

  /**
   * Render a car
   */
  renderCar(ctx, car) {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle + Math.PI / 2);  // +90 degrees to align car forward

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(3, 3, car.width * 0.4, car.height * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flash if invincible
    if (car.invincible && Math.floor(Date.now() / 100) % 2) {
      ctx.globalAlpha = 0.5;
    }

    // Car body
    const w = car.width;
    const h = car.height;

    // Main body
    ctx.fillStyle = car.color;
    ctx.beginPath();
    ctx.moveTo(0, -h/2);  // Front tip
    ctx.lineTo(w/2, -h/4);  // Front right
    ctx.lineTo(w/2, h/3);   // Back right
    ctx.lineTo(w/4, h/2);   // Rear right
    ctx.lineTo(-w/4, h/2);  // Rear left
    ctx.lineTo(-w/2, h/3);  // Back left
    ctx.lineTo(-w/2, -h/4); // Front left
    ctx.closePath();
    ctx.fill();

    // Windshield
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.moveTo(0, -h/3);
    ctx.lineTo(w/3, -h/6);
    ctx.lineTo(w/3, h/10);
    ctx.lineTo(-w/3, h/10);
    ctx.lineTo(-w/3, -h/6);
    ctx.closePath();
    ctx.fill();

    // Outline
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -h/2);
    ctx.lineTo(w/2, -h/4);
    ctx.lineTo(w/2, h/3);
    ctx.lineTo(w/4, h/2);
    ctx.lineTo(-w/4, h/2);
    ctx.lineTo(-w/2, h/3);
    ctx.lineTo(-w/2, -h/4);
    ctx.closePath();
    ctx.stroke();

    // Boost flame
    if (car.boosting) {
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.moveTo(-w/4, h/2);
      ctx.lineTo(0, h/2 + 20 + Math.random() * 10);
      ctx.lineTo(w/4, h/2);
      ctx.fill();

      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.moveTo(-w/6, h/2);
      ctx.lineTo(0, h/2 + 12 + Math.random() * 5);
      ctx.lineTo(w/6, h/2);
      ctx.fill();
    }

    // Drift sparks
    if (car.drifting) {
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = car.driftCharge >= 2 ? '#ff0000' : '#ffff00';
        ctx.beginPath();
        ctx.arc(
          (Math.random() - 0.5) * w,
          h/2 + Math.random() * 10,
          2 + Math.random() * 3,
          0, Math.PI * 2
        );
        ctx.fill();
      }
    }

    ctx.restore();

    // Player name indicator
    if (car.isPlayer) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('▼', car.x, car.y - 40);
    }
  }

  /**
   * Render speed lines - intensity based on current speed
   */
  renderSpeedLines(ctx) {
    const speedFactor = this.player.speed / this.player.maxSpeed;
    const numLines = Math.floor(5 + speedFactor * 20);  // 5-25 lines based on speed
    const alpha = 0.2 + speedFactor * 0.4;  // 0.2-0.6 opacity

    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1 + speedFactor * 2;

    // Speed lines radiate from center-bottom (where player is)
    const centerX = this.width / 2;
    const centerY = this.height * 0.7;

    for (let i = 0; i < numLines; i++) {
      const angle = (Math.random() - 0.5) * Math.PI * 0.8;  // Spread angle
      const startDist = 50 + Math.random() * 100;
      const length = 30 + speedFactor * 80;

      const x1 = centerX + Math.cos(angle - Math.PI/2) * startDist;
      const y1 = centerY + Math.sin(angle - Math.PI/2) * startDist * 0.5;
      const x2 = x1 + Math.cos(angle - Math.PI/2) * length;
      const y2 = y1 - length * 0.8;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  /**
   * Render boost effect
   */
  renderBoostEffect(ctx) {
    const gradient = ctx.createRadialGradient(
      this.width / 2, this.height / 2, 0,
      this.width / 2, this.height / 2, this.width / 2
    );
    gradient.addColorStop(0, 'rgba(255,150,0,0)');
    gradient.addColorStop(0.5, 'rgba(255,150,0,0.1)');
    gradient.addColorStop(1, 'rgba(255,150,0,0.3)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Format time
   */
  formatTime(seconds) {
    if (!isFinite(seconds)) return '--:--.--';
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
  }

  /**
   * Restart race
   */
  restartRace() {
    this.showOverlay('pause-overlay', false);
    this.paused = false;
    this.state = 'ready';
    this.startRace();
  }

  /**
   * Quit to title
   */
  quitToTitle() {
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
