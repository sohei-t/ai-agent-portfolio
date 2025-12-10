/**
 * Game - Main game controller
 */
import { GameLoop } from './GameLoop.js';
import { InputHandler } from './InputHandler.js';
import { CollisionDetector } from './CollisionDetector.js';
import { Renderer } from '../rendering/Renderer.js';
import { ParticleSystem } from '../rendering/ParticleSystem.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { Bullet } from '../entities/Bullet.js';
import { PowerUp } from '../entities/PowerUp.js';
import { ObjectPool } from '../utils/ObjectPool.js';
import { EnemySpawner } from '../systems/EnemySpawner.js';
import { WaveManager } from '../systems/WaveManager.js';
import { LevelManager } from '../systems/LevelManager.js';
import { HUD } from '../ui/HUD.js';
import { Menu } from '../ui/Menu.js';
import { GameOverScreen } from '../ui/GameOverScreen.js';
import { GAME_CONFIG, GAME_STATES } from '../config/gameConfig.js';

export class Game {
  constructor(canvas) {
    // Support config object (for tests) or canvas element
    let actualCanvas;
    if (typeof canvas === 'object' && !canvas.getContext) {
      // Config object passed
      const config = canvas;
      actualCanvas = {
        width: config.width || 800,
        height: config.height || 600,
        addEventListener: () => {},
        removeEventListener: () => {},
        getContext: () => ({
          fillRect: () => {},
          clearRect: () => {},
          fillStyle: '',
          strokeStyle: '',
          lineWidth: 0,
          beginPath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          closePath: () => {},
          fill: () => {},
          stroke: () => {},
          arc: () => {},
          save: () => {},
          restore: () => {},
          translate: () => {},
          rotate: () => {},
          scale: () => {},
          globalAlpha: 1,
          font: '',
          textAlign: '',
          textBaseline: '',
          fillText: () => {},
          strokeRect: () => {},
          drawImage: () => {}
        })
      };
    } else {
      actualCanvas = canvas;
    }

    this.canvas = actualCanvas;
    this.state = GAME_STATES.MENU;
    this.frameCount = 0;

    // Core systems
    this.renderer = new Renderer(actualCanvas);
    this.inputHandler = new InputHandler(canvas);
    this.collisionDetector = new CollisionDetector(
      GAME_CONFIG.CANVAS_WIDTH,
      GAME_CONFIG.CANVAS_HEIGHT
    );
    this.particleSystem = new ParticleSystem();
    this.enemySpawner = new EnemySpawner(
      GAME_CONFIG.CANVAS_WIDTH,
      GAME_CONFIG.CANVAS_HEIGHT
    );
    this.levelManager = new LevelManager();
    this.waveManager = new WaveManager(this.levelManager);

    // Game loop
    this.gameLoop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render()
    );

    // Entities
    this.player = new Player(
      GAME_CONFIG.PLAYER.START_X - GAME_CONFIG.PLAYER.WIDTH / 2,
      GAME_CONFIG.PLAYER.START_Y - GAME_CONFIG.PLAYER.HEIGHT / 2
    );
    this.enemies = [];
    this.bullets = [];
    this.enemyBullets = [];
    this.powerups = [];

    // Object pools
    this.bulletPool = new ObjectPool(
      () => new Bullet(0, 0, 0, 0),
      (bullet, x, y, vx, vy, owner, type) =>
        bullet.reset(x, y, vx, vy, owner, type),
      GAME_CONFIG.POOLS.PLAYER_BULLETS
    );
    this.enemyBulletPool = new ObjectPool(
      () => new Bullet(0, 0, 0, 0),
      (bullet, x, y, vx, vy, owner, type) =>
        bullet.reset(x, y, vx, vy, owner, type),
      GAME_CONFIG.POOLS.ENEMY_BULLETS
    );
    this.powerupPool = new ObjectPool(
      () => new PowerUp(0, 0),
      (powerup, x, y, type) => powerup.reset(x, y, type),
      GAME_CONFIG.POOLS.POWERUPS
    );

    // UI
    this.hud = new HUD(this.renderer);
    this.menu = new Menu(this.renderer);
    this.gameOverScreen = new GameOverScreen(this.renderer);

    // Game state
    this.gameState = {
      score: 0,
      highScore: this.loadHighScore(),
      level: 1,
      combo: 0,
      comboTimer: 0,
      fps: 60,
      debug: false,
      time: 0
    };

    // Ship selection
    this.shipTypes = ['BALANCED', 'SPEED', 'POWER'];
    this.selectedShipIndex = 0;
    this.player.setShipType(this.shipTypes[this.selectedShipIndex]);

    // Level transitions
    this.levelTransitioning = false;

    // Input tracking
    this.lastShootPressed = false;
    this.lastPausePressed = false;
    this.lastSpacePressed = false;
    this.lastLeftPressed = false;
    this.lastRightPressed = false;
    this.lastBombPressed = false;
    this.lastTouchActive = false;
  }

  /**
   * Initialize game (for tests)
   */
  init() {
    this.reset();
  }

  /**
   * Cleanup game (for tests)
   */
  cleanup() {
    if (this.gameLoop) {
      this.gameLoop.stop();
    }
  }

  /**
   * Start the game
   */
  start() {
    this.gameLoop.start();
  }

  /**
   * Update game
   */
  update(deltaTime) {
    this.frameCount++;
    this.gameState.time += deltaTime;
    if (this.gameLoop) {
      this.gameState.fps = Math.round(this.gameLoop.getFPS());
    }

    switch (this.state) {
      case GAME_STATES.MENU:
        this.updateMenu(deltaTime);
        break;

      case GAME_STATES.PLAYING:
        this.updatePlaying(deltaTime);
        break;

      case GAME_STATES.PAUSED:
        this.updatePaused(deltaTime);
        break;

      case GAME_STATES.GAME_OVER:
        this.updateGameOver(deltaTime);
        break;
    }
  }

  /**
   * Update menu state
   */
  updateMenu(deltaTime) {
    const spacePressed = this.inputHandler.isShootPressed();
    const leftPressed = this.inputHandler.isLeftPressed();
    const rightPressed = this.inputHandler.isRightPressed();
    const touchPos = this.inputHandler.getTouchPosition();

    if (leftPressed && !this.lastLeftPressed) {
      this.changeShipSelection(-1);
    }

    if (rightPressed && !this.lastRightPressed) {
      this.changeShipSelection(1);
    }

    if (spacePressed && !this.lastSpacePressed) {
      this.startGame();
    }

    if (touchPos && !this.lastTouchActive) {
      const shipAreas = this.menu.getShipHitAreas(this.renderer.canvas);
      const hit = shipAreas.find(
        area =>
          touchPos.x >= area.x &&
          touchPos.x <= area.x + area.width &&
          touchPos.y >= area.y &&
          touchPos.y <= area.y + area.height
      );

      if (hit) {
        this.selectedShipIndex = this.shipTypes.indexOf(hit.id);
        this.player.setShipType(hit.id);
      } else {
        this.startGame();
      }
    }

    this.lastSpacePressed = spacePressed;
    this.lastLeftPressed = leftPressed;
    this.lastRightPressed = rightPressed;
    this.lastTouchActive = !!touchPos;
  }

  /**
   * Update playing state
   */
  updatePlaying(deltaTime) {
    // Check pause
    const pausePressed = this.inputHandler.isPausePressed();
    if (pausePressed && !this.lastPausePressed) {
      this.state = GAME_STATES.PAUSED;
    }
    this.lastPausePressed = pausePressed;

    // Update player
    this.updatePlayer(deltaTime);

    // Update enemies
    this.updateEnemies(deltaTime);

    // Update bullets
    this.updateBullets(deltaTime);

    // Update power-ups
    this.updatePowerUps(deltaTime);

    // Update particles
    this.particleSystem.update(deltaTime);

    // Handle collisions
    this.handleCollisions();

    // Spawn enemies
    this.spawnEnemies(deltaTime);

    // Update combo timer
    if (this.gameState.comboTimer > 0) {
      this.gameState.comboTimer -= deltaTime;
      if (this.gameState.comboTimer <= 0) {
        this.gameState.combo = 0;
      }
    }

    this.checkLevelProgression();

    // Check game over
    if (!this.player.active || !this.player.isAlive || this.player.health <= 0) {
      this.gameOver();
    }
  }

  /**
   * Update paused state
   */
  updatePaused(deltaTime) {
    const pausePressed = this.inputHandler.isPausePressed();

    if (pausePressed && !this.lastPausePressed) {
      this.state = GAME_STATES.PLAYING;
    }

    this.lastPausePressed = pausePressed;
  }

  /**
   * Update game over state
   */
  updateGameOver(deltaTime) {
    const spacePressed = this.inputHandler.isShootPressed();

    if (spacePressed && !this.lastSpacePressed) {
      this.state = GAME_STATES.MENU;
      this.reset();
    }

    this.lastSpacePressed = spacePressed;
  }

  /**
   * Update player
   */
  updatePlayer(deltaTime) {
    if (!this.player.active) return;

    // Movement
    let dx = 0;
    let dy = 0;

    const touchPos = this.inputHandler.getTouchPosition();
    const virtualDir = this.inputHandler.getVirtualDirection();

    if (touchPos) {
      // Follow touch position on canvas
      const targetX = touchPos.x - this.player.width / 2;
      const targetY = touchPos.y - this.player.height / 2;
      const deltaX = targetX - this.player.x;
      const deltaY = targetY - this.player.y;
      dx = Math.sign(deltaX);
      dy = Math.sign(deltaY);
    } else {
      if (this.inputHandler.isUpPressed()) dy -= 1;
      if (this.inputHandler.isDownPressed()) dy += 1;
      if (this.inputHandler.isLeftPressed()) dx -= 1;
      if (this.inputHandler.isRightPressed()) dx += 1;

      dx += virtualDir.x;
      dy += virtualDir.y;

      // Clamp magnitude to 1 for consistent speed
      const mag = Math.hypot(dx, dy);
      if (mag > 1) {
        dx /= mag;
        dy /= mag;
      }
    }

    if (dx !== 0 || dy !== 0) {
      this.player.move(dx, dy, deltaTime, this.canvas.width, this.canvas.height);
    }

    // Shooting
    const shootPressed = this.inputHandler.isShootPressed();
    if (shootPressed) {
      const bulletData = this.player.shoot();
      if (bulletData) {
        for (const data of bulletData) {
          const bullet = this.bulletPool.acquire(
            data.x,
            data.y,
            data.vx,
            data.vy,
            'player',
            data.bulletType || 'PLAYER_NORMAL'
          );
          this.bullets.push(bullet);
        }
      }
    }

    // Bomb
    const bombPressed = this.inputHandler.isBombPressed();
    if (bombPressed && !this.lastBombPressed) {
      if (this.player.useBomb()) {
        this.activateBomb();
      }
    }
    this.lastBombPressed = bombPressed;

    this.player.update(deltaTime);
  }

  /**
   * Update enemies
   */
  updateEnemies(deltaTime) {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];

      if (!enemy.active) {
        this.enemies.splice(i, 1);
        continue;
      }

      enemy.update(deltaTime, this.gameState.time);

      // Enemy shooting
      const bulletData = enemy.shoot();
      if (bulletData) {
        const bullet = this.enemyBulletPool.acquire(
          bulletData.x,
          bulletData.y,
          bulletData.vx,
          bulletData.vy,
          'enemy',
          'ENEMY_NORMAL'
        );
        this.enemyBullets.push(bullet);
      }

      // Remove if off screen
      if (!this.collisionDetector.isOnScreen(enemy)) {
        this.enemies.splice(i, 1);
      }
    }
  }

  /**
   * Update bullets
   */
  updateBullets(deltaTime) {
    // Player bullets
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];

      if (!bullet.active) {
        this.bulletPool.release(bullet);
        this.bullets.splice(i, 1);
        continue;
      }

      bullet.update(deltaTime);

      // Remove if off screen
      if (!this.collisionDetector.isOnScreen(bullet)) {
        this.bulletPool.release(bullet);
        this.bullets.splice(i, 1);
      }
    }

    // Enemy bullets
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const bullet = this.enemyBullets[i];

      if (!bullet.active) {
        this.enemyBulletPool.release(bullet);
        this.enemyBullets.splice(i, 1);
        continue;
      }

      bullet.update(deltaTime);

      // Remove if off screen
      if (!this.collisionDetector.isOnScreen(bullet)) {
        this.enemyBulletPool.release(bullet);
        this.enemyBullets.splice(i, 1);
      }
    }
  }

  /**
   * Update power-ups
   */
  updatePowerUps(deltaTime) {
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const powerup = this.powerups[i];

      if (!powerup.active) {
        this.powerupPool.release(powerup);
        this.powerups.splice(i, 1);
        continue;
      }

      powerup.update(deltaTime);

      // Remove if off screen
      if (!this.collisionDetector.isOnScreen(powerup)) {
        this.powerupPool.release(powerup);
        this.powerups.splice(i, 1);
      }
    }
  }

  /**
   * Handle collisions
   */
  handleCollisions() {
    // Player bullets vs enemies
    for (const bullet of this.bullets) {
      if (!bullet.active) continue;

      for (const enemy of this.enemies) {
        if (!enemy.active) continue;

        if (this.collisionDetector.isColliding(bullet, enemy)) {
          bullet.destroy();
          const destroyed = enemy.takeDamage(bullet.damage);

          if (destroyed) {
            this.onEnemyDestroyed(enemy);
          }
        }
      }
    }

    // Enemy bullets vs player
    for (const bullet of this.enemyBullets) {
      if (!bullet.active) continue;

      if (this.collisionDetector.isColliding(bullet, this.player)) {
        bullet.destroy();
        const died = this.player.takeDamage(bullet.damage);

        if (!died) {
          this.particleSystem.createExplosion(
            this.player.x + this.player.width / 2,
            this.player.y + this.player.height / 2,
            10,
            '#FFFFFF'
          );
        }
      }
    }

    // Enemies vs player
    for (const enemy of this.enemies) {
      if (!enemy.active) continue;

      if (this.collisionDetector.isColliding(enemy, this.player)) {
        enemy.destroy();
        const died = this.player.takeDamage(1);

        this.particleSystem.createExplosion(
          enemy.x + enemy.width / 2,
          enemy.y + enemy.height / 2,
          15,
          enemy.color
        );
      }
    }

    // Power-ups vs player
    for (const powerup of this.powerups) {
      if (!powerup.active) continue;

      if (this.collisionDetector.isColliding(powerup, this.player)) {
        powerup.destroy();
        this.collectPowerUp(powerup);
      }
    }
  }

  /**
   * Spawn a single enemy (for tests)
   */
  spawnEnemy(config) {
    const enemy = new Enemy(config);
    this.enemies.push(enemy);
    return enemy;
  }

  /**
   * Trigger a wave (for tests)
   */
  triggerWave(waveNumber) {
    this.gameState.currentWave = waveNumber;
    this.currentWave = waveNumber;

    // Spawn enemies for this wave
    const enemyCount = 3 + waveNumber * 2;
    for (let i = 0; i < enemyCount; i++) {
      const enemy = new Enemy({
        x: 100 + i * 80,
        y: 50
      });
      this.enemies.push(enemy);
    }
  }

  /**
   * Visibility change handler (for tests)
   */
  onVisibilityChange(visibility) {
    this.visibility = visibility;
  }

  /**
   * Spawn enemies
   */
  spawnEnemies(deltaTime) {
    // Use WaveManager for wave-based spawning
    const spawns = this.waveManager.update();

    for (const enemyData of spawns) {
      const enemy = new Enemy(enemyData);

      // Mark boss enemies
      if (enemyData.isBoss) {
        enemy.isBoss = true;
      }

      this.enemies.push(enemy);
    }
  }

  /**
   * Handle enemy destroyed
   */
  onEnemyDestroyed(enemy) {
    // Add score
    this.gameState.combo++;
    this.gameState.comboTimer = GAME_CONFIG.SCORE.COMBO_TIMEOUT / 1000;

    const comboBonus = Math.floor(
      enemy.scoreValue * this.gameState.combo * GAME_CONFIG.SCORE.COMBO_MULTIPLIER
    );
    this.gameState.score += enemy.scoreValue + comboBonus;

    // Create explosion
    this.particleSystem.createExplosion(
      enemy.x + enemy.width / 2,
      enemy.y + enemy.height / 2,
      20,
      enemy.color
    );

    // Spawn power-up
    if (Math.random() < 0.2) {
      const powerTypes = ['POWER', 'SHIELD', 'BOMB', 'LIFE'];
      const powerType = powerTypes[Math.floor(Math.random() * powerTypes.length)];
      const powerup = this.powerupPool.acquire(
        enemy.x + enemy.width / 2 - 16,
        enemy.y + enemy.height / 2 - 16,
        powerType
      );
      this.powerups.push(powerup);
    }
  }

  /**
   * Collect power-up
   */
  collectPowerUp(powerup) {
    switch (powerup.powerType) {
      case 'POWER':
        this.player.powerUp();
        break;

      case 'SHIELD':
        this.player.activateShield();
        break;

      case 'BOMB':
        this.player.bombs++;
        break;

      case 'LIFE':
        this.player.addLife();
        break;
    }
  }

  /**
   * Change selected ship type on menu
   */
  changeShipSelection(direction) {
    const total = this.shipTypes.length;
    this.selectedShipIndex = (this.selectedShipIndex + direction + total) % total;
    this.player.setShipType(this.shipTypes[this.selectedShipIndex]);
  }

  /**
   * Activate bomb
   */
  activateBomb() {
    // Destroy all enemies
    for (const enemy of this.enemies) {
      if (enemy.active) {
        enemy.destroy();
        this.onEnemyDestroyed(enemy);
      }
    }

    // Clear all bullets
    for (const bullet of this.enemyBullets) {
      bullet.destroy();
    }

    // Screen effect
    this.particleSystem.createExplosion(
      this.canvas.width / 2,
      this.canvas.height / 2,
      100,
      '#FFFFFF'
    );
  }

  /**
   * Check if current level should advance
   */
  checkLevelProgression() {
    if (this.levelTransitioning) return;

    const bossAlive = this.enemies.some(enemy => enemy.active && enemy.isBoss);
    const bossSpawned = this.waveManager.isBossSpawned();
    const wavesFinished = this.waveManager.isComplete();
    const enemiesRemaining = this.enemies.some(enemy => enemy.active);
    const enemyBulletsRemaining = this.enemyBullets.some(bullet => bullet.active);

    const bossCleared = bossSpawned &&
      !bossAlive &&
      wavesFinished &&
      !enemiesRemaining &&
      !enemyBulletsRemaining;

    const timeExpired = this.levelManager.isLevelComplete() &&
      wavesFinished &&
      !enemiesRemaining;

    if (bossCleared || timeExpired) {
      this.levelTransitioning = true;
      this.handleLevelClear();
    }
  }

  /**
   * Move to next level after clear
   */
  handleLevelClear() {
    this.gameState.score += GAME_CONFIG.SCORE.LEVEL_CLEAR_BONUS;
    this.gameState.level = this.levelManager.nextLevel();

    this.clearStageEntities();
    this.waveManager.initializeWaves();

    this.levelTransitioning = false;
  }

  /**
   * Clear enemies and bullets between stages
   */
  clearStageEntities() {
    this.enemies = [];

    this.bullets.forEach(bullet => this.bulletPool.release(bullet));
    this.bullets = [];

    this.enemyBullets.forEach(bullet => this.enemyBulletPool.release(bullet));
    this.enemyBullets = [];

    this.powerups.forEach(powerup => this.powerupPool.release(powerup));
    this.powerups = [];

    this.gameState.combo = 0;
    this.gameState.comboTimer = 0;

    this.particleSystem.clear();
  }

  /**
   * Start game
   */
  startGame() {
    this.state = GAME_STATES.PLAYING;
    this.reset();
  }

  /**
   * Game over
   */
  gameOver() {
    this.state = GAME_STATES.GAME_OVER;

    // Save high score
    if (this.gameState.score > this.gameState.highScore) {
      this.gameState.highScore = this.gameState.score;
      this.saveHighScore(this.gameState.highScore);
    }
  }

  /**
   * Reset game
   */
  reset() {
    const selectedShip = this.shipTypes[this.selectedShipIndex];

    this.player.reset(selectedShip);
    this.enemies = [];
    this.bullets = [];
    this.enemyBullets = [];
    this.powerups = [];
    this.bulletPool.releaseAll();
    this.enemyBulletPool.releaseAll();
    this.powerupPool.releaseAll();
    this.particleSystem.clear();
    this.enemySpawner.reset();

    this.gameState.score = 0;
    this.gameState.level = 1;
    this.gameState.combo = 0;
    this.gameState.comboTimer = 0;
    this.gameState.time = 0;
    this.levelTransitioning = false;

    // Initialize level and wave system
    this.levelManager.reset();
    this.levelManager.startLevel(1);
    this.waveManager.reset();
    this.waveManager.initializeWaves();
  }

  /**
   * Render game
   */
  render() {
    this.renderer.clear();

    switch (this.state) {
      case GAME_STATES.MENU:
        this.renderMenu();
        break;

      case GAME_STATES.PLAYING:
        this.renderPlaying();
        break;

      case GAME_STATES.PAUSED:
        this.renderPaused();
        break;

      case GAME_STATES.GAME_OVER:
        this.renderGameOver();
        break;
    }
  }

  /**
   * Render menu
   */
  renderMenu() {
    this.renderer.renderBackground(0);
    this.menu.render(
      this.shipTypes[this.selectedShipIndex],
      GAME_CONFIG.SHIP_TYPES
    );
  }

  /**
   * Render playing state
   */
  renderPlaying() {
    // Background
    this.renderer.renderBackground(this.gameLoop.getDeltaTime());

    // Entities
    if (this.player.active) {
      this.player.render(this.renderer.getContext());
    }

    for (const enemy of this.enemies) {
      enemy.render(this.renderer.getContext());
    }

    for (const bullet of this.bullets) {
      bullet.render(this.renderer.getContext());
    }

    for (const bullet of this.enemyBullets) {
      bullet.render(this.renderer.getContext());
    }

    for (const powerup of this.powerups) {
      powerup.render(this.renderer.getContext());
    }

    // Particles
    this.particleSystem.render(this.renderer.getContext());

    // HUD
    this.hud.render(this.gameState, this.player);

    // Combo
    if (this.gameState.combo > 1) {
      this.hud.renderCombo(this.renderer.getContext(), this.gameState.combo);
    }
  }

  /**
   * Render paused state
   */
  renderPaused() {
    // Render game in background
    this.renderPlaying();

    // Overlay
    this.renderer.renderPanel(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      'rgba(0, 0, 0, 0.5)'
    );

    this.renderer.renderText(
      'PAUSED',
      this.canvas.width / 2,
      this.canvas.height / 2 - 30,
      48,
      '#FFFF00',
      'center'
    );

    this.renderer.renderText(
      'Press ESC to Resume',
      this.canvas.width / 2,
      this.canvas.height / 2 + 30,
      20,
      '#FFFFFF',
      'center'
    );
  }

  /**
   * Render game over
   */
  renderGameOver() {
    // Render game in background
    this.renderer.renderBackground(0);

    // Game over screen
    const isNewHighScore = this.gameState.score === this.gameState.highScore &&
      this.gameState.score > 0;

    this.gameOverScreen.render(
      this.gameState.score,
      this.gameState.highScore,
      isNewHighScore
    );
  }

  /**
   * Load high score from localStorage
   */
  loadHighScore() {
    const saved = localStorage.getItem('shooter_highscore');
    return saved ? parseInt(saved, 10) : 0;
  }

  /**
   * Save high score to localStorage
   */
  saveHighScore(score) {
    localStorage.setItem('shooter_highscore', score.toString());
  }
}
