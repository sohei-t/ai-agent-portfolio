/**
 * Game.js - Core Game Engine
 * Handles game loop, race logic, and coordination
 */

import { Track } from './Track.js';
import { Car } from './Car.js';
import { ItemBox, ItemType, getRandomItem, DroppedItem } from './ItemBox.js';
import { AIController } from './AIController.js';

export class Game {
  constructor(canvas, inputManager, soundManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.inputManager = inputManager;
    this.soundManager = soundManager;

    // Game state
    this.state = 'idle'; // 'idle', 'countdown', 'racing', 'paused', 'finished'
    this.difficulty = 'normal';

    // Race settings
    this.totalLaps = 3;
    this.racerCount = 5;

    // Timing
    this.lastTime = 0;
    this.deltaTime = 0;
    this.raceTime = 0;
    this.lapTimes = [];
    this.bestLap = Infinity;

    // Countdown
    this.countdownTimer = 0;
    this.countdownValue = 3;

    // Track
    this.track = new Track(canvas.width, canvas.height);

    // Player car
    this.player = null;

    // AI cars
    this.aiCars = [];
    this.aiControllers = [];

    // Items
    this.itemBoxes = [];
    this.activeItems = []; // Bananas, shells on track

    // Callbacks
    this.onCountdown = null;
    this.onRaceStart = null;
    this.onLapComplete = null;
    this.onPositionChange = null;
    this.onWrongWay = null;
    this.onRaceFinish = null;

    // Animation frame
    this.animationId = null;

    // Bind game loop
    this.gameLoop = this.gameLoop.bind(this);
  }

  handleResize(width, height) {
    this.track.resize(width, height);
  }

  startRace(difficulty = 'normal') {
    this.difficulty = difficulty;
    this.state = 'countdown';
    this.raceTime = 0;
    this.lapTimes = [];
    this.bestLap = Infinity;

    // Initialize track
    this.track.init();

    // Create player car
    const startPositions = this.track.getStartPositions(this.racerCount);
    this.player = new Car(
      startPositions[this.racerCount - 1].x,  // Player starts last
      startPositions[this.racerCount - 1].y,
      startPositions[this.racerCount - 1].angle,
      true,
      '#FF2D95' // Pink
    );
    this.player.name = 'Player';

    // Create AI cars
    this.aiCars = [];
    this.aiControllers = [];
    const aiColors = ['#00F5FF', '#FFE135', '#39FF14', '#BF40FF'];

    for (let i = 0; i < this.racerCount - 1; i++) {
      const pos = startPositions[i];
      const car = new Car(pos.x, pos.y, pos.angle, false, aiColors[i]);
      car.name = `CPU ${i + 1}`;

      const ai = new AIController(car, this.track, difficulty);
      this.aiCars.push(car);
      this.aiControllers.push(ai);
    }

    // Create item boxes
    this.itemBoxes = this.track.getItemBoxPositions().map(pos => {
      return new ItemBox(pos.x, pos.y);
    });

    this.activeItems = [];

    // Start countdown
    this.countdownTimer = 4; // 3, 2, 1, GO
    this.countdownValue = 3;
    if (this.onCountdown) this.onCountdown(3);

    // Start game loop
    this.lastTime = performance.now();
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  gameLoop(currentTime) {
    // Calculate delta time
    this.deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    // Update
    this.update(this.deltaTime);

    // Render
    this.render();

    // Continue loop
    if (this.state !== 'idle') {
      this.animationId = requestAnimationFrame(this.gameLoop);
    }
  }

  update(dt) {
    switch (this.state) {
      case 'countdown':
        this.updateCountdown(dt);
        break;

      case 'racing':
        this.updateRacing(dt);
        break;

      case 'paused':
        // Don't update
        break;
    }
  }

  updateCountdown(dt) {
    this.countdownTimer -= dt;

    const newValue = Math.ceil(this.countdownTimer);
    if (newValue !== this.countdownValue && newValue >= 0) {
      this.countdownValue = newValue;
      if (this.onCountdown) this.onCountdown(newValue);
      this.soundManager.playCountdown();
    }

    if (this.countdownTimer <= 0) {
      this.state = 'racing';
      this.soundManager.playGo();
      this.soundManager.playBGM('bgmRace');
      if (this.onRaceStart) this.onRaceStart();
    }
  }

  updateRacing(dt) {
    this.raceTime += dt;

    // Update input
    const input = this.inputManager.getInput();

    // Update player car
    this.player.update(dt, input, this.track);

    // Check player lap completion
    this.checkLapCompletion(this.player);

    // Check wrong way
    const isWrongWay = this.track.isWrongWay(this.player);
    if (this.onWrongWay) this.onWrongWay(isWrongWay);

    // Update AI cars
    this.aiControllers.forEach((ai, index) => {
      const aiInput = ai.update(dt, this.getAllCars(), this.activeItems);
      this.aiCars[index].update(dt, aiInput, this.track);
      this.checkLapCompletion(this.aiCars[index]);
    });

    // Update item boxes
    this.itemBoxes.forEach(box => box.update(dt));

    // Check item collection
    this.checkItemCollection();

    // Update active items (bananas, shells)
    this.updateActiveItems(dt);

    // Check collisions between cars
    this.checkCarCollisions();

    // Update positions
    this.updatePositions();

    // Check race finish
    this.checkRaceFinish();
  }

  checkLapCompletion(car) {
    const crossed = this.track.checkFinishLine(car);
    if (crossed && car.checkpoints >= this.track.checkpointCount) {
      car.lap++;
      car.checkpoints = 0;

      if (car.isPlayer) {
        const lapTime = this.raceTime - (this.lapTimes.reduce((a, b) => a + b, 0) || 0);
        this.lapTimes.push(lapTime);
        if (lapTime < this.bestLap) this.bestLap = lapTime;

        if (this.onLapComplete) this.onLapComplete(car.lap, lapTime);

        // Update HUD
        document.getElementById('current-lap').textContent = Math.min(car.lap + 1, this.totalLaps);
      }

      // Check if finished race
      if (car.lap >= this.totalLaps) {
        car.finished = true;
        car.finishTime = this.raceTime;
      }
    }

    // Check checkpoints
    this.track.checkCheckpoints(car);
  }

  checkItemCollection() {
    const allCars = this.getAllCars();

    this.itemBoxes.forEach(box => {
      if (!box.active) return;

      allCars.forEach(car => {
        if (box.checkCollision(car)) {
          // Collect item
          const item = this.getRandomItem(car);
          car.setItem(item);

          if (car.isPlayer) {
            this.soundManager.playItemGet();
            this.updateItemDisplay(item);
          }

          box.collect();
        }
      });
    });
  }

  getRandomItem(car) {
    const position = this.getCarPosition(car);
    const items = Object.values(ItemType);

    // Weight items based on position (rubber-banding)
    let weights;
    if (position === 1) {
      // First place gets weak items
      weights = [0.4, 0.4, 0.2, 0, 0, 0]; // Banana, Green Shell, Mushroom
    } else if (position >= 4) {
      // Back of pack gets strong items
      weights = [0.1, 0.1, 0.2, 0.2, 0.25, 0.15]; // More stars, lightning
    } else {
      // Middle gets balanced
      weights = [0.2, 0.2, 0.25, 0.15, 0.15, 0.05];
    }

    const random = Math.random();
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) {
        return items[i];
      }
    }
    return items[0]; // Default to banana
  }

  updateItemDisplay(item) {
    const itemBox = document.getElementById('item-box');
    const itemIcon = document.getElementById('item-icon');

    if (item) {
      itemBox.classList.add('has-item');
      itemBox.classList.remove('empty');
      itemIcon.textContent = item.emoji || '?';
    } else {
      itemBox.classList.remove('has-item');
      itemBox.classList.add('empty');
      itemIcon.textContent = '?';
    }
  }

  useItem() {
    if (!this.player.currentItem) return;

    const item = this.player.currentItem;
    this.player.currentItem = null;
    this.updateItemDisplay(null);
    this.soundManager.playBoost();
    this.player.itemsUsed = (this.player.itemsUsed || 0) + 1;

    switch (item.id) {
      case 'mushroom':
      case 'triple_mushroom':
        this.player.boost(2, 0.5);
        break;

      case 'banana':
        this.spawnBanana(this.player);
        break;

      case 'green_shell':
        this.spawnShell(this.player, false);
        break;

      case 'red_shell':
        this.spawnShell(this.player, true);
        break;

      case 'star':
        this.player.activateStar(5);
        break;

      case 'lightning':
        this.activateLightning();
        break;
    }
  }

  spawnBanana(car) {
    const angle = car.angle + Math.PI;
    const x = car.x + Math.cos(angle) * 50;
    const y = car.y + Math.sin(angle) * 50;

    this.activeItems.push({
      type: 'banana',
      x, y,
      active: true
    });
  }

  spawnShell(car, isHoming) {
    const shell = {
      type: 'shell',
      x: car.x,
      y: car.y,
      angle: car.angle,
      speed: 400,
      isHoming,
      target: null,
      bounces: 0,
      maxBounces: 3,
      active: true,
      owner: car
    };

    if (isHoming) {
      // Find target (car ahead)
      const position = this.getCarPosition(car);
      const ahead = this.getAllCars().find(c => this.getCarPosition(c) === position - 1);
      shell.target = ahead;
    }

    this.activeItems.push(shell);
  }

  activateLightning() {
    // Shrink all other cars
    this.aiCars.forEach(car => {
      car.shrink(3);
    });
    this.soundManager.playHit();
  }

  updateActiveItems(dt) {
    this.activeItems.forEach(item => {
      if (!item.active) return;

      if (item.type === 'shell') {
        // Move shell
        if (item.isHoming && item.target && !item.target.finished) {
          // Home towards target
          const dx = item.target.x - item.x;
          const dy = item.target.y - item.y;
          item.angle = Math.atan2(dy, dx);
        }

        item.x += Math.cos(item.angle) * item.speed * dt;
        item.y += Math.sin(item.angle) * item.speed * dt;

        // Check wall bounce (for green shells)
        if (!item.isHoming && this.track.isOffTrack(item.x, item.y)) {
          item.angle = item.angle + Math.PI; // Simple reverse
          item.bounces++;
          if (item.bounces >= item.maxBounces) {
            item.active = false;
          }
        }

        // Check car collision
        this.getAllCars().forEach(car => {
          if (car === item.owner) return;
          const dist = Math.hypot(car.x - item.x, car.y - item.y);
          if (dist < 30) {
            car.spinOut();
            item.active = false;
            this.soundManager.playHit();
          }
        });
      }
    });

    // Check banana collisions
    this.activeItems.filter(i => i.type === 'banana' && i.active).forEach(banana => {
      this.getAllCars().forEach(car => {
        const dist = Math.hypot(car.x - banana.x, car.y - banana.y);
        if (dist < 25) {
          car.spinOut();
          banana.active = false;
          this.soundManager.playHit();
        }
      });
    });

    // Remove inactive items
    this.activeItems = this.activeItems.filter(i => i.active);
  }

  checkCarCollisions() {
    const allCars = this.getAllCars();

    for (let i = 0; i < allCars.length; i++) {
      for (let j = i + 1; j < allCars.length; j++) {
        const car1 = allCars[i];
        const car2 = allCars[j];

        const dist = Math.hypot(car1.x - car2.x, car1.y - car2.y);
        if (dist < 35) {
          // Push cars apart
          const angle = Math.atan2(car2.y - car1.y, car2.x - car1.x);
          const push = (35 - dist) / 2;

          car1.x -= Math.cos(angle) * push;
          car1.y -= Math.sin(angle) * push;
          car2.x += Math.cos(angle) * push;
          car2.y += Math.sin(angle) * push;

          // Apply slight speed reduction
          car1.speed *= 0.95;
          car2.speed *= 0.95;
        }
      }
    }
  }

  updatePositions() {
    const allCars = this.getAllCars();

    // Sort by: finished > lap > checkpoint progress > distance to next checkpoint
    allCars.sort((a, b) => {
      if (a.finished !== b.finished) return b.finished - a.finished;
      if (a.lap !== b.lap) return b.lap - a.lap;
      if (a.checkpoints !== b.checkpoints) return b.checkpoints - a.checkpoints;
      return b.checkpointProgress - a.checkpointProgress;
    });

    // Update positions
    allCars.forEach((car, index) => {
      car.position = index + 1;
    });

    // Notify position change
    if (this.onPositionChange) {
      this.onPositionChange(this.player.position);
    }
  }

  getCarPosition(car) {
    return car.position || this.getAllCars().indexOf(car) + 1;
  }

  getAllCars() {
    return [this.player, ...this.aiCars];
  }

  checkRaceFinish() {
    // Check if player finished
    if (this.player.finished && this.state === 'racing') {
      this.finishRace();
    }

    // Or if all cars finished
    const allFinished = this.getAllCars().every(car => car.finished);
    if (allFinished && this.state === 'racing') {
      this.finishRace();
    }
  }

  finishRace() {
    this.state = 'finished';
    this.soundManager.stopBGM();

    // Play appropriate sound
    if (this.player.position === 1) {
      this.soundManager.playFinish();
    } else {
      this.soundManager.playFinish();
    }

    // Compile results
    const rankings = this.getAllCars()
      .sort((a, b) => a.finishTime - b.finishTime)
      .map(car => ({
        name: car.name,
        time: car.finishTime || this.raceTime + 999,
        isPlayer: car.isPlayer
      }));

    const results = {
      playerPosition: this.player.position,
      totalTime: this.player.finishTime || this.raceTime,
      bestLap: this.bestLap,
      itemsUsed: this.player.itemsUsed || 0,
      rankings
    };

    // Delay to show finish
    setTimeout(() => {
      if (this.onRaceFinish) this.onRaceFinish(results);
    }, 1500);
  }

  render() {
    const ctx = this.ctx;

    // Clear
    ctx.fillStyle = '#1a5a2a'; // Grass color
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render track
    this.track.render(ctx);

    // Render item boxes
    this.itemBoxes.forEach(box => box.render(ctx));

    // Render active items (bananas, shells)
    this.renderActiveItems(ctx);

    // Render all cars (sorted by Y for depth)
    const allCars = this.getAllCars().sort((a, b) => a.y - b.y);
    allCars.forEach(car => car.render(ctx));

    // Render minimap
    this.renderMinimap();

    // Update speed meter
    this.updateSpeedMeter();
  }

  renderActiveItems(ctx) {
    this.activeItems.forEach(item => {
      if (!item.active) return;

      ctx.save();
      ctx.translate(item.x, item.y);

      if (item.type === 'banana') {
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🍌', 0, 0);
      } else if (item.type === 'shell') {
        ctx.rotate(item.angle);
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.isHoming ? '🔴' : '🐚', 0, 0);
      }

      ctx.restore();
    });
  }

  renderMinimap() {
    const minimapCanvas = document.getElementById('minimap-canvas');
    if (!minimapCanvas) return;

    const mctx = minimapCanvas.getContext('2d');
    const w = minimapCanvas.width = 80;
    const h = minimapCanvas.height = 80;

    // Clear
    mctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    mctx.fillRect(0, 0, w, h);

    // Draw track outline
    mctx.strokeStyle = '#444';
    mctx.lineWidth = 8;
    this.track.renderMinimap(mctx, w, h);

    // Draw cars
    const allCars = this.getAllCars();
    allCars.forEach(car => {
      const mx = (car.x / this.canvas.width) * w;
      const my = (car.y / this.canvas.height) * h;

      mctx.fillStyle = car.isPlayer ? '#FF2D95' : '#00F5FF';
      mctx.beginPath();
      mctx.arc(mx, my, 3, 0, Math.PI * 2);
      mctx.fill();
    });
  }

  updateSpeedMeter() {
    const speedFill = document.getElementById('speed-fill');
    if (speedFill && this.player) {
      const percent = Math.min(100, (this.player.speed / this.player.maxSpeed) * 100);
      speedFill.style.height = `${percent}%`;
    }

    const boostIndicator = document.getElementById('boost-indicator');
    if (boostIndicator && this.player) {
      if (this.player.boostTime > 0) {
        boostIndicator.classList.add('active');
        boostIndicator.textContent = '🔥';
      } else if (this.player.driftCharge > 0) {
        boostIndicator.classList.add('active');
        boostIndicator.textContent = this.player.driftCharge > 1 ? '🟠' : '🔵';
      } else {
        boostIndicator.classList.remove('active');
      }
    }
  }

  pause() {
    if (this.state === 'racing') {
      this.state = 'paused';
      this.soundManager.stopBGM();
    }
  }

  resume() {
    if (this.state === 'paused') {
      this.state = 'racing';
      this.lastTime = performance.now();
      this.soundManager.playBGM('bgmRace');
    }
  }

  stop() {
    this.state = 'idle';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.soundManager.stopBGM();
  }
}
