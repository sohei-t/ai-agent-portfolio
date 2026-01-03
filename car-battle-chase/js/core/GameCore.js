/**
 * GameCore.js - Main Game Engine
 * Core game loop, state management, and system coordination
 */

import { EntityManager } from './EntityManager.js';
import { ObjectPool } from './ObjectPool.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { Bomb } from '../entities/Bomb.js';
import { Missile } from '../entities/Missile.js';
import { PowerUp, PowerUpType, getRandomPowerUpType } from '../entities/PowerUp.js';
import { InputSystem } from '../input/InputSystem.js';
import { PhysicsSystem } from '../systems/PhysicsSystem.js';
import { CollisionSystem } from '../systems/CollisionSystem.js';
import { RenderSystem } from '../systems/RenderSystem.js';
import { SoundSystem } from '../systems/SoundSystem.js';
import { HUD } from '../ui/HUD.js';

// Game states
export const GameState = {
  LOADING: 'loading',
  TITLE: 'title',
  SETTINGS: 'settings',
  COUNTDOWN: 'countdown',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAMEOVER: 'gameover',
  VICTORY: 'victory'
};

export class GameCore {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Game state
    this.state = GameState.LOADING;
    this.previousState = null;

    // World settings
    this.worldWidth = 1600;
    this.worldHeight = 1200;

    // Game settings
    this.difficulty = 'normal';
    this.enemyCount = 5;
    this.victoryKillCount = 10;

    // Timing
    this.lastTime = 0;
    this.deltaTime = 0;
    this.accumulator = 0;
    this.fixedDeltaTime = 1 / 60; // 60 FPS
    this.maxDeltaTime = 0.1;

    // Countdown
    this.countdownTime = 3;
    this.countdownTimer = 0;

    // Game stats
    this.gameTime = 0;
    this.isPaused = false;

    // Initialize systems
    this.initSystems();

    // Initialize entity pools
    this.initPools();

    // State callbacks
    this.onStateChange = null;
    this.onGameOver = null;
    this.onVictory = null;

    // Bind methods
    this.gameLoop = this.gameLoop.bind(this);
    this.handleResize = this.handleResize.bind(this);

    // Setup resize handler
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  /**
   * Initialize game systems
   */
  initSystems() {
    this.entityManager = new EntityManager();
    this.inputSystem = new InputSystem(this.canvas);
    this.physicsSystem = new PhysicsSystem(this.worldWidth, this.worldHeight);
    this.collisionSystem = new CollisionSystem();
    this.renderSystem = new RenderSystem(this.canvas);
    this.soundSystem = new SoundSystem();
    this.hud = new HUD(this.canvas);

    // Set world size in render system
    this.renderSystem.setWorldSize(this.worldWidth, this.worldHeight);

    // Setup input callbacks
    this.inputSystem.onBomb = () => this.fireBomb();
    this.inputSystem.onMissile = () => this.fireMissile();
    this.inputSystem.onPause = () => this.togglePause();

    // Setup collision callback
    this.collisionSystem.onCollision = (type, entityA, entityB) => {
      this.handleCollisionEffect(type, entityA, entityB);
    };
  }

  /**
   * Initialize object pools
   */
  initPools() {
    this.bombPool = new ObjectPool(
      () => new Bomb(),
      20
    );

    this.missilePool = new ObjectPool(
      () => new Missile(),
      10
    );

    this.powerupPool = new ObjectPool(
      () => new PowerUp(),
      10
    );

    this.enemyPool = new ObjectPool(
      () => new Enemy(),
      15
    );
  }

  /**
   * Start the game
   */
  async start() {
    // Initialize sound system
    await this.soundSystem.init();

    // Start game loop
    this.lastTime = performance.now();
    requestAnimationFrame(this.gameLoop);

    // Set initial state
    this.setState(GameState.TITLE);
  }

  /**
   * Main game loop
   */
  gameLoop(currentTime) {
    // Calculate delta time
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.deltaTime = Math.min(this.deltaTime, this.maxDeltaTime);
    this.lastTime = currentTime;

    // Fixed timestep accumulator
    this.accumulator += this.deltaTime;

    // Fixed update
    while (this.accumulator >= this.fixedDeltaTime) {
      this.fixedUpdate(this.fixedDeltaTime);
      this.accumulator -= this.fixedDeltaTime;
    }

    // Variable update (rendering)
    this.update(this.deltaTime);
    this.render();

    // Continue loop
    requestAnimationFrame(this.gameLoop);
  }

  /**
   * Fixed timestep update (physics, collision)
   */
  fixedUpdate(deltaTime) {
    if (this.state !== GameState.PLAYING) return;

    // Update input
    this.inputSystem.update(deltaTime);

    // Update player movement
    if (this.player && this.player.active) {
      const movement = this.inputSystem.getMovement();
      this.player.move(movement.x, movement.y, deltaTime);
    }

    // Update all entities
    this.updateEntities(deltaTime);

    // Update physics
    this.updatePhysics(deltaTime);

    // Check collisions
    this.checkCollisions();

    // Update game time
    this.gameTime += deltaTime;
  }

  /**
   * Variable update (animations, effects)
   */
  update(deltaTime) {
    switch (this.state) {
      case GameState.COUNTDOWN:
        this.updateCountdown(deltaTime);
        break;

      case GameState.PLAYING:
        // Update HUD
        this.hud.update(deltaTime, this.player);

        // Update render camera
        this.renderSystem.updateCamera(this.player, deltaTime);

        // Check win/lose conditions
        this.checkGameConditions();
        break;
    }
  }

  /**
   * Update all game entities
   */
  updateEntities(deltaTime) {
    // Update player
    if (this.player) {
      this.player.update(deltaTime);
    }

    // Update enemies
    for (const enemy of this.enemies) {
      if (enemy.active) {
        enemy.update(deltaTime);

        // Check if enemy should attack
        const attackData = enemy.performAttack();
        if (attackData) {
          this.spawnEnemyBomb(attackData);
        }
      }
    }

    // Update bombs
    for (const bomb of this.bombs) {
      if (bomb.active) {
        bomb.update(deltaTime);
      }
    }

    // Update missiles
    for (const missile of this.missiles) {
      if (missile.active) {
        missile.update(deltaTime);
      }
    }

    // Update powerups
    for (const powerup of this.powerups) {
      if (powerup.active) {
        powerup.update(deltaTime);
      }
    }
  }

  /**
   * Update physics
   */
  updatePhysics(deltaTime) {
    // Update entity positions and boundaries
    if (this.player) {
      this.physicsSystem.checkBoundaries(this.player);
    }

    for (const enemy of this.enemies) {
      if (enemy.active) {
        this.physicsSystem.checkBoundaries(enemy);
      }
    }
  }

  /**
   * Check collisions
   */
  checkCollisions() {
    const groups = {
      player: this.player,
      enemies: this.enemies,
      bombs: this.bombs,
      missiles: this.missiles,
      powerups: this.powerups
    };

    const collisions = this.collisionSystem.checkCollisions(groups);

    const gameState = {
      player: this.player
    };

    this.collisionSystem.processCollisions(collisions, gameState);
  }

  /**
   * Handle collision visual/audio effects
   */
  handleCollisionEffect(type, entityA, entityB) {
    switch (type) {
      case 'player-enemy':
        this.renderSystem.shake(5, 0.1);
        this.soundSystem.playSfx('sfx_hit');
        break;

      case 'player-explosion':
      case 'player-missile':
        this.renderSystem.shake(10, 0.2);
        this.renderSystem.flash('#FF0000', 0.3);
        this.soundSystem.playSfx('sfx_explosion');
        break;

      case 'player-powerup':
        this.soundSystem.playSfx('sfx_powerup');
        break;

      case 'enemy-explosion':
      case 'enemy-missile':
        this.renderSystem.shake(3, 0.1);
        this.soundSystem.playSfx('sfx_explosion');

        // Chance to spawn powerup on enemy death
        if (!entityA.active && Math.random() < 0.3) {
          this.spawnPowerup(entityA.position.x, entityA.position.y);
        }
        break;
    }
  }

  /**
   * Render game
   */
  render() {
    // Begin frame
    this.renderSystem.beginFrame();

    // Render based on state
    switch (this.state) {
      case GameState.PLAYING:
      case GameState.PAUSED:
      case GameState.COUNTDOWN:
        this.renderGame();
        break;
    }

    // End frame
    this.renderSystem.endFrame();

    // Render UI (not affected by camera)
    this.renderUI();
  }

  /**
   * Render game world
   */
  renderGame() {
    // Render background
    this.renderSystem.renderBackground();

    // Render powerups
    this.renderSystem.renderEntities(this.powerups);

    // Render bombs
    this.renderSystem.renderEntities(this.bombs);

    // Render missiles
    this.renderSystem.renderEntities(this.missiles);

    // Render enemies
    this.renderSystem.renderEntities(this.enemies);

    // Render player
    this.renderSystem.renderEntity(this.player);

    // Debug rendering
    if (this.renderSystem.debugMode) {
      this.renderSystem.renderDebug([
        this.player,
        ...this.enemies,
        ...this.bombs,
        ...this.missiles
      ]);
    }
  }

  /**
   * Render UI overlay
   */
  renderUI() {
    if (this.state === GameState.PLAYING || this.state === GameState.PAUSED) {
      // Render HUD
      this.hud.render(this.player, {
        enemies: this.enemies,
        powerups: this.powerups,
        totalEnemies: this.victoryKillCount,
        worldWidth: this.worldWidth,
        worldHeight: this.worldHeight
      });

      // Render touch controls
      this.inputSystem.render(this.ctx);
    }

    if (this.state === GameState.COUNTDOWN) {
      this.renderCountdownOverlay();
    }
  }

  /**
   * Update countdown
   */
  updateCountdown(deltaTime) {
    this.countdownTimer -= deltaTime;

    if (this.countdownTimer <= 0) {
      this.setState(GameState.PLAYING);
      this.soundSystem.playSfx('sfx_start');
      this.soundSystem.playBgm('bgm_game');
    } else if (Math.floor(this.countdownTimer) !== Math.floor(this.countdownTimer + deltaTime)) {
      // Play countdown sound on each second
      this.soundSystem.playSfx('sfx_countdown');
    }
  }

  /**
   * Render countdown overlay
   */
  renderCountdownOverlay() {
    // Semi-transparent overlay
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Countdown number
    const count = Math.ceil(this.countdownTimer);
    const text = count > 0 ? count.toString() : 'GO!';
    const scale = 1 + (1 - (this.countdownTimer % 1)) * 0.3;

    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(scale, scale);

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 100px "Press Start 2P", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, 0, 0);

    this.ctx.restore();
  }

  /**
   * Check win/lose conditions
   */
  checkGameConditions() {
    // Check player death
    if (this.player && !this.player.active) {
      this.gameOver();
      return;
    }

    // Check victory condition
    if (this.player && this.player.enemiesDefeated >= this.victoryKillCount) {
      this.victory();
      return;
    }

    // Spawn new enemies if needed
    const activeEnemies = this.enemies.filter(e => e.active).length;
    if (activeEnemies < this.enemyCount) {
      this.spawnEnemy();
    }
  }

  /**
   * Fire player bomb
   */
  fireBomb() {
    if (this.state !== GameState.PLAYING) return;
    if (!this.player || !this.player.canFireBomb()) return;

    const bombData = this.player.fireBomb();
    if (bombData) {
      const bomb = this.bombPool.get();
      bomb.init(bombData.x, bombData.y, bombData.vx, bombData.vy, bombData.owner);
      this.bombs.push(bomb);
      this.soundSystem.playSfx('sfx_bomb');
    }
  }

  /**
   * Fire player missile
   */
  fireMissile() {
    if (this.state !== GameState.PLAYING) return;
    if (!this.player || !this.player.canFireMissile()) return;

    const missileData = this.player.fireMissile();
    if (missileData) {
      // Find nearest enemy as target
      const target = this.collisionSystem.findNearest(this.player, this.enemies);

      const missile = this.missilePool.get();
      missile.init(
        missileData.x,
        missileData.y,
        missileData.vx,
        missileData.vy,
        missileData.rotation,
        missileData.owner,
        target.entity
      );
      this.missiles.push(missile);
      this.soundSystem.playSfx('sfx_missile');
    }
  }

  /**
   * Spawn enemy bomb
   */
  spawnEnemyBomb(attackData) {
    const bomb = this.bombPool.get();
    bomb.init(
      attackData.x,
      attackData.y,
      attackData.vx,
      attackData.vy,
      attackData.owner
    );
    bomb.damage = attackData.damage;
    this.bombs.push(bomb);
  }

  /**
   * Spawn enemy
   */
  spawnEnemy() {
    const pos = this.physicsSystem.getRandomPositionAwayFrom(
      this.player.position.x,
      this.player.position.y,
      300
    );

    // Random difficulty
    const difficulties = ['easy', 'normal', 'hard'];
    const diffIndex = Math.floor(Math.random() * 3);
    const difficulty = this.difficulty === 'hard' ?
      difficulties[Math.min(2, diffIndex + 1)] :
      difficulties[diffIndex];

    const enemy = this.enemyPool.get();
    enemy.position.set(pos.x, pos.y);
    enemy.applyDifficulty(difficulty);
    enemy.setTarget(this.player);
    enemy.active = true;
    this.enemies.push(enemy);
  }

  /**
   * Spawn powerup
   */
  spawnPowerup(x, y) {
    const powerup = this.powerupPool.get();
    const type = getRandomPowerUpType();
    powerup.init(x, y, type);
    this.powerups.push(powerup);
  }

  /**
   * Set game state
   */
  setState(newState) {
    this.previousState = this.state;
    this.state = newState;

    console.log('Game state:', this.previousState, '->', newState);

    if (this.onStateChange) {
      this.onStateChange(newState, this.previousState);
    }
  }

  /**
   * Start new game
   */
  startGame() {
    // Reset entities
    this.player = new Player(this.worldWidth / 2, this.worldHeight / 2);
    this.enemies = [];
    this.bombs = [];
    this.missiles = [];
    this.powerups = [];

    // Reset pools
    this.bombPool.releaseAll();
    this.missilePool.releaseAll();
    this.powerupPool.releaseAll();
    this.enemyPool.releaseAll();

    // Reset game stats
    this.gameTime = 0;

    // Spawn initial enemies
    for (let i = 0; i < this.enemyCount; i++) {
      this.spawnEnemy();
    }

    // Start countdown
    this.countdownTimer = this.countdownTime;
    this.setState(GameState.COUNTDOWN);
  }

  /**
   * Toggle pause
   */
  togglePause() {
    if (this.state === GameState.PLAYING) {
      this.setState(GameState.PAUSED);
      this.soundSystem.stopBgm(false);
    } else if (this.state === GameState.PAUSED) {
      this.setState(GameState.PLAYING);
      this.soundSystem.playBgm('bgm_game');
    }
  }

  /**
   * Game over
   */
  gameOver() {
    this.setState(GameState.GAMEOVER);
    this.soundSystem.stopBgm();
    this.soundSystem.playBgm('bgm_gameover');

    if (this.onGameOver) {
      this.onGameOver({
        score: this.player.score,
        enemiesDefeated: this.player.enemiesDefeated,
        gameTime: this.gameTime
      });
    }
  }

  /**
   * Victory
   */
  victory() {
    this.setState(GameState.VICTORY);
    this.soundSystem.stopBgm();
    this.soundSystem.playBgm('bgm_victory');

    if (this.onVictory) {
      this.onVictory({
        score: this.player.score,
        enemiesDefeated: this.player.enemiesDefeated,
        gameTime: this.gameTime
      });
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    const parent = this.canvas.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.renderSystem.resize(width, height);
    this.inputSystem.joystick.updatePosition();
    this.inputSystem.touchButtons.updatePositions();
  }

  /**
   * Set difficulty
   */
  setDifficulty(difficulty) {
    this.difficulty = difficulty;

    switch (difficulty) {
      case 'easy':
        this.enemyCount = 3;
        this.victoryKillCount = 5;
        break;
      case 'normal':
        this.enemyCount = 5;
        this.victoryKillCount = 10;
        break;
      case 'hard':
        this.enemyCount = 7;
        this.victoryKillCount = 15;
        break;
    }
  }

  /**
   * Get current game stats
   */
  getStats() {
    return {
      score: this.player ? this.player.score : 0,
      health: this.player ? this.player.health : 0,
      enemiesDefeated: this.player ? this.player.enemiesDefeated : 0,
      gameTime: this.gameTime,
      state: this.state
    };
  }

  /**
   * Toggle debug mode
   */
  toggleDebug() {
    this.renderSystem.toggleDebug();
  }

  /**
   * Cleanup
   */
  destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.inputSystem.destroy();
    this.soundSystem.destroy();
  }
}

export default GameCore;
