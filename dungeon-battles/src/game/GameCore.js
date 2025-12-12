/**
 * GameCore - Central game loop coordinator (< 200 LINES)
 * Delegates all logic to systems, does NOT contain game logic
 */
import { InputSystem } from '../systems/InputSystem.js?v=15';
import { PhysicsSystem } from '../systems/PhysicsSystem.js?v=4';
import { CollisionSystem } from '../systems/CollisionSystem.js?v=4';
import { RenderSystem } from '../systems/RenderSystem.js?v=4';
import { EffectSystem } from '../systems/EffectSystem.js?v=4';
import { DebugSystem } from '../systems/DebugSystem.js?v=4';
import { EntityManager } from './EntityManager.js?v=4';
import { StateManager } from './StateManager.js?v=4';
import { ScoreManager } from './ScoreManager.js?v=4';
import { ObjectPool } from './ObjectPool.js?v=4';
import { PerformanceMonitor } from './PerformanceMonitor.js?v=4';
import { Camera } from './Camera.js?v=4';
import { EventBus } from './EventBus.js?v=4';
import { AssetLoader } from '../assets/AssetLoader.js?v=4';
import { SpriteManager } from '../assets/SpriteManager.js?v=4';
import { ScreenManager } from '../ui/ScreenManager.js?v=9';
import { HUD } from '../ui/HUD.js?v=4';
import { MobileControls } from '../ui/MobileControls.js?v=5';
import { GameConfig } from './config.js?v=4';
import { PlayState } from '../states/PlayState.js?v=3';

export class GameCore {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = GameConfig;
    this.running = false;
    this.lastTime = 0;

    // Set canvas size
    this.canvas.width = this.config.canvas.width;
    this.canvas.height = this.config.canvas.height;

    // Event bus
    this.eventBus = new EventBus();

    // Asset loading
    this.assetLoader = new AssetLoader();
    this.spriteManager = new SpriteManager();

    // Camera
    this.camera = new Camera(
      this.config.canvas.width,
      this.config.canvas.height,
      this.config.canvas.width,
      this.config.canvas.height * 100 // Large world for scrolling
    );

    // Systems
    console.log('[GameCore] Creating systems with config.mobileControls:', this.config.mobileControls);
    this.systems = {
      input: new InputSystem(canvas, this.config.mobileControls),
      physics: new PhysicsSystem(this.config.canvas.width, this.config.canvas.height),
      collision: new CollisionSystem(this.config.canvas.width, this.config.canvas.height),
      render: new RenderSystem(canvas),
      effect: new EffectSystem(),
      debug: new DebugSystem()
    };
    console.log('[GameCore] Systems created successfully');

    // Managers
    this.entityManager = new EntityManager();
    this.stateManager = new StateManager();
    this.scoreManager = new ScoreManager();
    this.screenManager = new ScreenManager();

    // UI
    this.hud = new HUD(canvas);
    this.mobileControls = new MobileControls(canvas, this.config.mobileControls);

    // Object pools
    this.pools = new Map();

    // Performance
    this.performance = new PerformanceMonitor();

    // Game states
    this.playState = new PlayState(this);
    this.gameState = null; // Will be set in update
  }

  async init() {
    console.log('[GameCore] Initializing...');

    // Initialize asset loader first
    await this.assetLoader.initialize();
    console.log('[GameCore] AssetLoader initialized');

    // Load critical game assets
    const assetList = [
      { id: 'player', path: 'assets/sprites/player/player_ship.png' },
      { id: 'enemy_1', path: 'assets/sprites/enemies/enemy_1.png' },
      { id: 'enemy_2', path: 'assets/sprites/enemies/enemy_2.png' },
      { id: 'enemy_3', path: 'assets/sprites/enemies/enemy_3.png' },
      { id: 'enemy_4', path: 'assets/sprites/enemies/enemy_4.png' },
      { id: 'boss_1', path: 'assets/sprites/boss/boss_1.png' }
    ];

    try {
      await this.assetLoader.loadAssets(assetList);
      console.log('[GameCore] Assets loaded successfully');
    } catch (error) {
      console.warn('[GameCore] Some assets failed to load:', error);
      // Continue anyway with placeholders
    }

    // Initialize systems in correct order
    this.systems.input.init();

    // Set up input system to know when we're in game
    this.systems.input.setGameStateCallback(() => {
      return this.screenManager.isPlaying();
    });

    this.systems.physics.init();
    this.systems.collision.init();
    this.systems.effect.init?.();  // Optional since EffectSystem doesn't have init
    this.systems.render.init?.();
    this.systems.debug.init();

    // Register collision pairs
    this.registerCollisions();

    // Initialize managers - ScreenManager doesn't have initialize()
    this.screenManager.changeState('menu');

    // Set up state change callback
    this.screenManager.setStateChangeCallback((newState, oldState, data) => {
      if (newState === 'reset') {
        // Reset play state when restarting
        this.playState.reset();
      }
    });

    console.log('[GameCore] Initialization complete');
  }

  registerCollisions() {
    const collision = this.systems.collision;

    // Player-Enemy collision
    collision.registerPair('player', 'enemy', (player, enemy) => {
      if (!player.invincible) {
        player.takeDamage(enemy.damage);
        this.camera.shake(8, 0.2);
        this.systems.effect.spawn('hit', player.x, player.y);
      }
    });

    // Player bullet hits enemy
    collision.registerPair('player-bullet', 'enemy', (bullet, enemy) => {
      enemy.takeDamage(bullet.damage);
      bullet.destroy();
      this.systems.effect.spawn('hit', enemy.x, enemy.y);
      if (enemy.hp <= 0) {
        this.systems.effect.spawn('explosion', enemy.x, enemy.y);
        this.scoreManager.addScore(enemy.score || 100);
      }
    });

    // Enemy bullet hits player
    collision.registerPair('enemy-bullet', 'player', (bullet, player) => {
      if (!player.invincible) {
        player.takeDamage(bullet.damage);
        bullet.destroy();
        this.camera.shake(8, 0.2);
        this.systems.effect.spawn('hit', player.x, player.y);
      }
    });

    // Player collects item
    collision.registerPair('player', 'item', (player, item) => {
      item.collect(player);
      this.systems.effect.spawn('sparkle', item.x, item.y);
    });

    console.log('[GameCore] Collision pairs registered');
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
    console.log('[GameCore] Game loop started');
  }

  stop() {
    this.running = false;
    console.log('[GameCore] Game loop stopped');
  }

  loop() {
    if (!this.running) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Cap delta to prevent spiral of death
    const cappedDelta = Math.min(deltaTime, 0.1);

    // Update if not paused
    if (this.systems.debug.shouldUpdate()) {
      this.update(cappedDelta);
    }

    this.render();

    requestAnimationFrame(() => this.loop());
  }

  update(deltaTime) {
    this.performance.startFrame();

    // Create game state for HUD
    this.gameState = {
      player: {
        hp: 100,
        maxHP: 100,
        mp: 50,
        maxMP: 50,
        attackPower: 10,
        magicPower: 20
      },
      score: this.scoreManager.getScore(),
      currentStage: 1,
      totalStages: 5,
      combo: this.scoreManager.getCombo()
    };

    // Update game based on screen state
    if (this.screenManager.isPlaying()) {
      this.playState.update(deltaTime);
    }

    // Update in fixed order (CRITICAL)
    this.systems.input.update();
    this.stateManager.update(deltaTime);
    this.entityManager.update(deltaTime);
    this.camera.update(deltaTime);
    this.systems.physics.update(this.entityManager.getAliveEntities(), deltaTime);
    this.systems.collision.update(this.entityManager.getAliveEntities());
    this.systems.effect.update(deltaTime);
    this.hud.update(deltaTime, this.gameState);
    this.screenManager.update(deltaTime, this.systems.input);
    this.systems.debug.update();

    this.performance.endFrame();
  }

  render() {
    // Clear
    this.systems.render.begin();

    // Render game if playing
    if (this.screenManager.isPlaying()) {
      this.playState.render(this.ctx, this.assetLoader);
    }

    // Render layers
    this.systems.render.renderLayer('background');
    this.systems.render.renderLayer('game');
    this.systems.render.renderLayer('effects');

    // Render effects
    this.systems.effect.render(this.ctx);

    // Render UI
    this.hud.render(this.ctx, this.gameState);
    this.screenManager.render(this.ctx);

    // Only render mobile controls if on mobile
    if (this.systems.input && this.systems.input.isMobileMode()) {
      this.systems.input.renderMobileControls(this.ctx);
    }

    // Debug
    this.systems.debug.render(this.ctx, this);

    this.systems.render.end();
  }

  // Public API
  addEntity(entity) { this.entityManager.addEntity(entity); }
  removeEntity(entity) { this.entityManager.removeEntity(entity); }
  getSystem(name) { return this.systems[name]; }
  getPool(name) { return this.pools.get(name); }
  setPool(name, pool) { this.pools.set(name, pool); }
  isGodMode() { return this.systems.debug.isGodMode(); }

  getStats() {
    return {
      fps: this.performance.getFPS(),
      entities: this.entityManager.getStats(),
      collision: this.systems.collision.getStats(),
      performance: this.performance.getStatus()
    };
  }
}
