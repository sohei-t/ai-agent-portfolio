/**
 * PlayState.js - Main game play state
 */
import { Player } from '../entities/Player.js?v=2';
import { Enemy } from '../entities/Enemy.js';
import { Bullet } from '../entities/Bullet.js';
import { Item } from '../entities/Item.js';
import { soundManager } from '../systems/SoundManager.js';

export class PlayState {
  constructor(gameCore) {
    this.gameCore = gameCore;
    this.player = null;
    this.enemies = [];
    this.bullets = [];
    this.items = [];
    this.stage = 1;
    this.initialized = false;

    // Difficulty settings
    this.difficulty = 'normal'; // Will be set from ScreenManager

    // Stage progress tracking
    this.enemiesDefeated = 0;
    this.enemiesPerStage = 10;
    this.maxStages = 5;
    this.isStageClearing = false;
    this.stageClearTimer = 0;
    this.stageClearDuration = 3.0; // 3 seconds to show stage clear
    this.loopCount = 0; // Track game loops after first boss defeat

    // Boss stage management
    this.isBossStage = false;
    this.bossesDefeated = 0;
    this.bossCount = 1; // Number of bosses to spawn
    this.minionCounts = {
      slime: 0,
      goblin: 0,
      skeleton: 0,
      demon: 0
    };
    this.minMinionCount = 1; // Respawn when below this count (keep 1 of each type)

    // Boss stage special effects
    this.bossIntroTimer = 0;
    this.bossIntroPhase = null; // 'warning', 'entrance', null
    this.bossVictoryTimer = 0;
    this.bossExplosionEffects = [];

    // New loop animation
    this.newLoopTimer = 0;
    this.newLoopMessage = '';

    // Item spawn tracking
    this.stageItemsSpawned = {
      mp: false,  // MP is still limited to once per stage
      shield: false  // Shield also limited to once per stage
    };
    this.hpItemTimer = 0;
    this.hpItemInterval = 60.0; // HP recovery every 1 minute (60 seconds) - increased frequency
    this.speedItemTimer = 0;
    this.speedItemInterval = 15.0; // Spawn speed item every 15 seconds
    this.weaponItemTimer = 0;
    this.weaponItemInterval = 20.0; // Spawn weapon upgrade every 20 seconds - increased frequency
    this.shieldItemTimer = 15.0; // Start closer to first spawn (15 seconds from start)
    this.shieldItemInterval = 25.0; // Spawn shield item every 25 seconds (more frequent)

    // Enemy spawn timer
    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 2.0; // Base spawn interval

    // Scroll offset for vertical scrolling effect
    this.scrollY = 0;
    this.scrollSpeed = 50; // pixels per second
  }

  /**
   * Initialize play state
   */
  init() {
    if (this.initialized) return;

    console.log('[PlayState] Initializing game...');

    // Get difficulty from ScreenManager
    const difficultyData = this.gameCore.screenManager.getStateData('play');
    this.difficulty = difficultyData.difficulty || 'normal';
    console.log('[PlayState] Starting with difficulty:', this.difficulty);

    // Adjust game parameters based on difficulty
    this.applyDifficultySettings();

    // Create player at center bottom
    this.player = new Player(400, 500);

    // Apply difficulty modifiers to player
    if (this.difficulty === 'easy') {
      this.player.hp = 150;
      this.player.maxHP = 150;
      this.player.mp = 75;
      this.player.maxMP = 75;
    } else if (this.difficulty === 'hard') {
      this.player.hp = 75;
      this.player.maxHP = 75;
      this.player.mp = 40;
      this.player.maxMP = 40;
    }

    // Reset arrays
    this.enemies = [];
    this.bullets = [];
    this.items = [];

    // Reset stage
    this.stage = 1;

    this.initialized = true;
    console.log('[PlayState] Game initialized with player at', this.player.x, this.player.y);
  }

  /**
   * Apply difficulty settings
   */
  applyDifficultySettings() {
    switch (this.difficulty) {
      case 'easy':
        this.enemiesPerStage = 8;
        this.enemySpawnInterval = 2.5;
        this.speedItemInterval = 10.0; // More frequent items
        break;
      case 'normal':
        this.enemiesPerStage = 10;
        this.enemySpawnInterval = 2.0;
        this.speedItemInterval = 15.0;
        break;
      case 'hard':
        this.enemiesPerStage = 12;
        this.enemySpawnInterval = 1.5;
        this.speedItemInterval = 20.0; // Less frequent items
        break;
    }
  }

  /**
   * Update game state
   */
  update(deltaTime) {
    if (!this.initialized) {
      this.init();
    }

    // Handle boss intro animation (pause game during intro)
    if (this.bossIntroTimer > 0) {
      this.bossIntroTimer -= deltaTime;
      if (this.bossIntroTimer <= 0) {
        this.bossIntroTimer = 0;
        this.bossIntroPhase = null;
        // Start boss stage after intro with 1 second delay
        if (this.stage === this.maxStages && !this.isBossStage) {
          // Use a small delay before actually starting boss battle
          setTimeout(() => {
            this.isBossStage = true;
            console.log('[PlayState] Boss stage starting after intro + 1 second delay!');
            // Spawn boss only after intro is completely done
            this.spawnBoss();
          }, 1000);
        }
      }
      return; // Don't update game logic during boss intro
    }

    // Handle stage clearing
    if (this.isStageClearing) {
      this.stageClearTimer += deltaTime;
      if (this.stageClearTimer >= this.stageClearDuration) {
        this.nextStage();
      }
      return; // Don't update game logic during stage clear
    }

    // Check for stage clear
    if (this.stage === 5) {
      // Boss stage clear conditions
      if (this.isBossStage) {
        const bosses = this.enemies.filter(e => e.isBoss);
        if (bosses.length === 0 && this.bossesDefeated >= this.bossCount && this.bossVictoryTimer === 0) {
          // Boss defeated! Victory animation will trigger new loop
          console.log(`[PlayState] Boss defeated! Victory sequence starting...`);
          return;
        }
      }
    } else {
      // Normal stage clear
      if (this.enemiesDefeated >= this.enemiesPerStage && this.enemies.length === 0) {
        if (this.stage < this.maxStages - 1) {
          this.isStageClearing = true;
          this.stageClearTimer = 0;
          console.log(`[PlayState] Stage ${this.stage} cleared!`);
        } else if (this.stage === this.maxStages - 1) {
          // Moving to boss stage
          this.isStageClearing = true;
          this.stageClearTimer = 0;
          console.log(`[PlayState] Moving to Boss Stage!`);
        }
      }
    }

    // Update scroll
    this.scrollY += this.scrollSpeed * deltaTime;

    // Update magic effect
    if (this.magicEffect && this.magicEffect.active) {
      this.magicEffect.timer -= deltaTime;
      if (this.magicEffect.timer <= 0) {
        this.magicEffect.active = false;
      }
    }

    // Spawn enemies (with stage-based difficulty)
    if (!this.isStageClearing) {
      if (this.stage === 5 && this.isBossStage) {
        // Boss stage spawning logic
        this.handleBossStageSpawning(deltaTime);
      } else if (this.enemiesDefeated < this.enemiesPerStage) {
        // Normal stage spawning
        // Adjust spawn rate based on stage
        const stageSpawnMultiplier = Math.max(0.5, 1.0 - (this.stage - 1) * 0.1);
        const currentSpawnInterval = this.enemySpawnInterval * stageSpawnMultiplier;

        this.enemySpawnTimer += deltaTime;
        if (this.enemySpawnTimer >= currentSpawnInterval) {
          this.spawnEnemy();
          this.enemySpawnTimer = 0;
        }
      }
    }

    // Spawn items
    this.handleItemSpawning(deltaTime);

    // Update player
    if (this.player && this.player.alive) {
      const newBullets = this.player.update(deltaTime, this.gameCore.systems.input);

      // Add new player bullets and play sound
      if (newBullets && newBullets.length > 0) {
        this.bullets.push(...newBullets);
        soundManager.playBeam('player');
      }

      // Handle magic attack (screen clear)
      if (this.player.useMagic && this.player.mp >= 10) {
        this.player.mp -= 10;
        this.castScreenClearMagic();
      }

      // Check player-enemy collisions
      this.enemies.forEach(enemy => {
        if (enemy.alive && this.checkCollision(this.player, enemy)) {
          this.player.takeDamage(enemy.damage);
        }
      });

      // Check player-item collisions
      this.items = this.items.filter(item => {
        if (item.alive && this.checkCollision(this.player, item)) {
          item.collect(this.player);
          soundManager.playPickup();
          return false;
        }
        return item.alive;
      });

      // Update game state for HUD
      if (this.gameCore.gameState) {
        this.gameCore.gameState.player = {
          hp: this.player.hp,
          maxHP: this.player.maxHP,
          mp: this.player.mp,
          maxMP: this.player.maxMP,
          attackPower: this.player.attackPower,
          magicPower: this.player.magicPower,
          hasShield: this.player.hasShield,
          shieldHP: this.player.shieldHP
        };
        this.gameCore.gameState.currentStage = this.stage;
      }
    }

    // Update enemies and their bullets
    this.enemies = this.enemies.filter(enemy => {
      const bulletResult = enemy.update(deltaTime, this.player ? this.player.x : 400, this.player ? this.player.y : 500);

      // Add enemy bullets (can be single bullet or array of bullets)
      if (bulletResult) {
        if (Array.isArray(bulletResult)) {
          this.bullets.push(...bulletResult);
        } else {
          this.bullets.push(bulletResult);
        }
        // Play enemy beam sound (less frequent for performance)
        if (Math.random() < 0.3) { // Only play 30% of enemy shots to avoid cacophony
          soundManager.playBeam('enemy');
        }
      }

      // Track minion counts in boss stage
      if (this.isBossStage && !enemy.alive && !enemy.isBoss) {
        if (this.minionCounts[enemy.type] !== undefined) {
          this.minionCounts[enemy.type] = Math.max(0, this.minionCounts[enemy.type] - 1);
        }
      }

      return enemy.alive;
    });

    // Update items
    this.items.forEach(item => {
      if (item.alive) {
        item.update(deltaTime);
      }
    });
    this.items = this.items.filter(item => item.alive);

    // Update bullets
    this.bullets = this.bullets.filter(bullet => {
      bullet.update(deltaTime);

      // Check bullet-enemy collisions (player bullets hitting enemies)
      if (bullet.owner === 'player' && bullet.alive) {
        this.enemies.forEach(enemy => {
          if (enemy.alive && this.checkCollision(bullet, enemy)) {
            enemy.takeDamage(bullet.damage);
            bullet.destroy();
            soundManager.playHit();

            // Award score and count defeat if enemy dies
            if (enemy.hp <= 0) {
              this.gameCore.scoreManager.addScore(enemy.score || 100);
              soundManager.playExplosion();

              // Special handling for boss defeat
              if (enemy.isBoss) {
                this.bossesDefeated++;
                console.log(`[PlayState] Boss defeated! (${this.bossesDefeated}/${this.bossCount})`);
              } else {
                this.enemiesDefeated++;
                console.log(`[PlayState] Enemy defeated! (${this.enemiesDefeated}/${this.enemiesPerStage})`);
              }
            }
          }
        });
      }

      // Check bullet-player collisions (enemy bullets hitting player)
      if (bullet.owner === 'enemy' && bullet.alive && this.player && this.player.alive) {
        if (this.checkCollision(bullet, this.player)) {
          this.player.takeDamage(bullet.damage);
          bullet.destroy();
          soundManager.playHit();
        }
      }

      return bullet.alive;
    });

    // Check for game over
    if (this.player && !this.player.alive) {
      this.gameCore.screenManager.changeState('gameover');
    }
  }

  /**
   * Handle boss stage spawning
   */
  handleBossStageSpawning(deltaTime) {
    // Check and respawn minions
    const types = ['slime', 'goblin', 'skeleton', 'demon'];

    types.forEach(type => {
      // Count current minions of this type
      const currentCount = this.enemies.filter(e => e.type === type && !e.isBoss).length;

      if (currentCount < this.minMinionCount) {
        // Spawn 1 new minion when count drops below minimum
        const x = Math.random() * 700 + 50;
        const y = -30; // Spawn from top
        const enemy = new Enemy(x, y, type, this.difficulty);

        // Apply difficulty scaling for boss stage
        enemy.hp *= 1.5;
        enemy.maxHP *= 1.5;
        enemy.damage = Math.floor(enemy.damage * 1.3);

        this.enemies.push(enemy);
        console.log(`[PlayState] Spawned 1 ${type} minion in boss stage`);
      }
    });
  }

  /**
   * Spawn boss and initial minions for boss stage
   */
  spawnBoss() {
    if (this.stage !== 5 || this.bossesDefeated > 0) {
      console.log('[PlayState] Cannot spawn boss - not in boss stage or boss already spawned');
      return;
    }

    console.log('[PlayState] Spawning boss and minions!');
    this.bossesDefeated = 0;

    // Clear any remaining enemies
    this.enemies = [];

    // Spawn bosses based on loop count
    const bossesToSpawn = this.loopCount > 0 ? 2 : 1; // 2 bosses after first loop

    for (let i = 0; i < bossesToSpawn; i++) {
      // Boss starts at top-right (700, 100)
      const x = i === 0 ? 700 : 500; // First at top-right, second more centered if multiple
      const boss = new Enemy(x, 100, 'dragon', this.difficulty);
      this.enemies.push(boss);
    }

    this.bossCount = bossesToSpawn;
    console.log(`[PlayState] Boss stage started with ${bossesToSpawn} boss(es)!`);

    // Spawn initial minions (1 of each type)
    const types = ['slime', 'goblin', 'skeleton', 'demon'];
    types.forEach(type => {
      const x = Math.random() * 700 + 50;
      const y = Math.random() * 200 + 50;
      const enemy = new Enemy(x, y, type, this.difficulty);

      // Make minions stronger in boss stage
      enemy.hp *= 1.5;
      enemy.maxHP *= 1.5;
      enemy.damage = Math.floor(enemy.damage * 1.3);

      this.enemies.push(enemy);
    });
  }

  /**
   * Spawn enemy
   */
  spawnEnemy() {
    let type;

    // Stage 5 is boss stage - don't spawn normal enemies during boss intro
    if (this.stage === 5) {
      // Boss spawning is now handled separately via spawnBoss() after intro
      return;
    }

    // For stages 1-4, spawn progressively harder enemies
    const stageEnemies = [
      ['slime'],                        // Stage 1: Only slimes
      ['slime', 'goblin'],              // Stage 2: Slimes and goblins
      ['goblin', 'skeleton'],           // Stage 3: Goblins and skeletons
      ['skeleton', 'demon']             // Stage 4: Skeletons and demons
    ];

    const enemyPool = stageEnemies[Math.min(this.stage - 1, stageEnemies.length - 1)];
    type = enemyPool[Math.floor(Math.random() * enemyPool.length)];

    const x = Math.random() * 700 + 50; // Random x position
    const enemy = new Enemy(x, -30, type, this.difficulty); // Start above screen

    // Scale enemy stats based on stage, loop, and difficulty
    let difficultyMultiplier = 1 + (this.stage - 1) * 0.2; // Stage scaling
    difficultyMultiplier *= (1 + this.loopCount * 0.25); // Loop scaling: 25% harder per loop

    // Additional difficulty mode scaling
    if (this.difficulty === 'easy') {
      difficultyMultiplier *= 0.8;
    } else if (this.difficulty === 'hard') {
      difficultyMultiplier *= 1.3;
    }

    // Apply scaling
    enemy.hp = Math.floor(enemy.hp * difficultyMultiplier);
    enemy.maxHP = Math.floor(enemy.maxHP * difficultyMultiplier);
    enemy.damage = Math.floor(enemy.damage * (1 + (this.stage - 1) * 0.15 + this.loopCount * 0.2));

    // Make enemies faster in later loops
    if (this.loopCount > 0) {
      enemy.speed *= (1 + this.loopCount * 0.1);
      enemy.shootInterval = Math.max(0.5, enemy.shootInterval * (1 - this.loopCount * 0.1));
    }

    this.enemies.push(enemy);
  }

  /**
   * Progress to next stage
   */
  nextStage() {
    this.stage++;
    this.enemiesDefeated = 0;
    this.isStageClearing = false;
    this.stageClearTimer = 0;

    // Special boss stage intro
    if (this.stage === this.maxStages) {
      this.bossIntroTimer = 3.0; // 3 seconds of boss intro
      this.bossIntroPhase = 'title';
      console.log('[PlayState] Starting Boss Stage Intro!');
    }

    // Reset item spawn flags for new stage
    this.stageItemsSpawned = {
      mp: false,  // MP is limited per stage
      shield: false  // Shield also limited to once per stage
    };

    // Restore some player HP and MP between stages
    if (this.player) {
      this.player.heal(30);
      this.player.restoreMP(20);
    }

    console.log(`[PlayState] Starting Stage ${this.stage}`);

    // If it's the boss stage, special setup
    if (this.stage === 5) {
      // Boss stage doesn't use normal enemy count
      this.enemiesPerStage = 999; // Effectively infinite
    }
  }

  /**
   * Start new loop after boss defeat
   */
  startNewLoop() {
    console.log(`[PlayState] Starting new loop ${this.loopCount + 1}`);

    // Reset to stage 1
    this.stage = 1;
    this.enemiesDefeated = 0;
    this.isBossStage = false;
    this.bossesDefeated = 0;

    // Calculate new difficulty scaling for the loop
    const difficultyScaling = 1 + (this.loopCount * 0.2); // 20% harder per loop
    this.enemiesPerStage = Math.floor(10 * (1 + this.loopCount * 0.3)); // 30% more enemies per loop

    console.log(`[PlayState] Loop ${this.loopCount + 1}: Enemies per stage = ${this.enemiesPerStage}, Difficulty scaling = ${difficultyScaling}x`);

    // Clear all enemies for fresh start
    this.enemies = [];

    // Restore player HP/MP
    if (this.player) {
      this.player.heal(50);
      this.player.restoreMP(30);
    }
  }

  /**
   * Handle item spawning logic
   */
  handleItemSpawning(deltaTime) {
    // Spawn HP recovery item every 1 minute (unlimited)
    this.hpItemTimer += deltaTime;
    if (this.hpItemTimer >= this.hpItemInterval) {
      this.spawnItem('hp_recovery', Math.random() * 600 + 100, Math.random() * 200 + 200);
      this.hpItemTimer = 0;
      console.log('[PlayState] HP recovery item spawned (1-minute interval)');
    }

    // Spawn MP item once per stage (after 6 enemies defeated)
    if (!this.stageItemsSpawned.mp && this.enemiesDefeated >= 6) {
      this.spawnItem('mp_recovery', Math.random() * 600 + 100, Math.random() * 200 + 200);
      this.stageItemsSpawned.mp = true;
    }

    // Spawn speed-up items randomly
    this.speedItemTimer += deltaTime;
    if (this.speedItemTimer >= this.speedItemInterval) {
      this.spawnItem('speed_up', Math.random() * 600 + 100, Math.random() * 400 + 100);
      this.speedItemTimer = 0;
      // Randomize next spawn interval
      this.speedItemInterval = 10 + Math.random() * 10; // 10-20 seconds
    }

    // Spawn weapon upgrade items regularly
    this.weaponItemTimer += deltaTime;
    if (this.weaponItemTimer >= this.weaponItemInterval) {
      this.spawnItem('weapon_upgrade', Math.random() * 600 + 100, Math.random() * 400 + 100);
      this.weaponItemTimer = 0;
      console.log('[PlayState] Weapon upgrade item spawned');
      // Randomize next spawn interval
      this.weaponItemInterval = 15 + Math.random() * 10; // 15-25 seconds - increased frequency
    }

    // Spawn shield item once per stage (after 5 enemies defeated, similar timing to MP)
    if (!this.stageItemsSpawned.shield && this.enemiesDefeated >= 5) {
      this.spawnItem('shield', Math.random() * 600 + 100, Math.random() * 400 + 100);
      this.stageItemsSpawned.shield = true;
      console.log('[PlayState] Shield item spawned (once per stage)');
    }
  }

  /**
   * Spawn an item
   */
  spawnItem(type, x, y) {
    const item = new Item(x, y, type);
    this.items.push(item);
    console.log(`[PlayState] Spawned item: ${type} at ${x}, ${y}`);
  }

  /**
   * Cast screen-clearing magic attack
   */
  castScreenClearMagic() {
    console.log('[PlayState] Casting screen-clear magic!');

    // Create visual effect
    this.magicEffect = {
      timer: 0.5,
      active: true
    };

    // Destroy all non-boss enemies on screen
    let enemiesDestroyed = 0;
    this.enemies.forEach(enemy => {
      if (enemy.alive && !enemy.isBoss) {
        // Don't count these kills toward stage progress
        enemy.hp = 0;
        enemy.alive = false;

        // Still give score
        this.gameCore.scoreManager.addScore((enemy.score || 100) * 0.5); // Half score for magic kills
        enemiesDestroyed++;
      } else if (enemy.alive && enemy.isBoss) {
        // Boss is completely immune to magic
        console.log('[PlayState] Boss is IMMUNE to magic attacks!');
      }
    });

    console.log(`[PlayState] Magic destroyed ${enemiesDestroyed} enemies!`);

    // Clear all bullets on screen
    let bulletsCleared = 0;
    this.bullets.forEach(bullet => {
      if (bullet.alive) {
        bullet.destroy();
        bulletsCleared++;
      }
    });
    console.log(`[PlayState] Magic cleared ${bulletsCleared} bullets!`);
  }

  /**
   * Check collision between two entities
   */
  checkCollision(a, b) {
    if (!a || !b) return false;

    const aLeft = a.x - a.width / 2;
    const aRight = a.x + a.width / 2;
    const aTop = a.y - a.height / 2;
    const aBottom = a.y + a.height / 2;

    const bLeft = b.x - b.width / 2;
    const bRight = b.x + b.width / 2;
    const bTop = b.y - b.height / 2;
    const bBottom = b.y + b.height / 2;

    return !(aRight < bLeft || aLeft > bRight || aBottom < bTop || aTop > bBottom);
  }

  /**
   * Render game state
   */
  render(ctx, assetLoader) {
    if (!this.initialized) return;

    // Clear with dark background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Render scrolling grid pattern for vertical scrolling effect
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < ctx.canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }

    // Horizontal lines with scroll effect
    const gridOffset = this.scrollY % 50;
    for (let y = -50; y < ctx.canvas.height + 50; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y + gridOffset);
      ctx.lineTo(ctx.canvas.width, y + gridOffset);
      ctx.stroke();
    }

    // Render enemies
    this.enemies.forEach(enemy => {
      if (enemy.alive) {
        enemy.render(ctx, assetLoader || this.gameCore?.assetLoader);
      }
    });

    // Render player (on top of enemies)
    if (this.player && this.player.alive) {
      this.player.render(ctx, assetLoader || this.gameCore?.assetLoader);
    }

    // Render items (before bullets for proper layering)
    this.items.forEach(item => {
      if (item.alive) {
        item.render(ctx);
      }
    });

    // Render bullets (between enemies and player for proper layering)
    this.bullets.forEach(bullet => {
      if (bullet.alive) {
        bullet.render(ctx);
      }
    });

    // Stage indicator and progress
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Stage ${this.stage}`, ctx.canvas.width / 2, 50);

    // Show difficulty mode
    const difficultyColors = {
      'easy': '#00FF00',
      'normal': '#FFFF00',
      'hard': '#FF4444'
    };
    ctx.fillStyle = difficultyColors[this.difficulty] || '#FFFFFF';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`[${this.difficulty.toUpperCase()}]`, 20, 30);

    // Show enemy defeat progress
    ctx.textAlign = 'center';
    if (this.stage < 5) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '16px Arial';
      ctx.fillText(`Enemies: ${this.enemiesDefeated}/${this.enemiesPerStage}`, ctx.canvas.width / 2, 75);
    } else {
      ctx.font = '24px Arial';
      ctx.fillStyle = '#FF0000';
      ctx.fillText('BOSS BATTLE!', ctx.canvas.width / 2, 75);

      // Show boss HP bar
      const bosses = this.enemies.filter(e => e.isBoss && e.alive);
      if (bosses.length > 0) {
        const boss = bosses[0];
        const barWidth = 300;
        const barHeight = 20;
        const barX = ctx.canvas.width / 2 - barWidth / 2;
        const barY = 100;

        // Background
        ctx.fillStyle = '#333333';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // HP bar
        const hpPercent = boss.hp / boss.maxHP;
        ctx.fillStyle = boss.invincible ? '#FF0000' : '#00FF00';
        ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

        // Border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // HP text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '14px Arial';
        ctx.fillText(`Boss HP: ${boss.hp}/${boss.maxHP}`, ctx.canvas.width / 2, barY + 14);
      }
    }

    // Show loop counter if in loop
    if (this.loopCount > 0) {
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`Loop: ${this.loopCount}`, ctx.canvas.width - 20, 30);
    }

    // Show weapon level with visual indicator
    if (this.player) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#00FFFF';
      ctx.font = '14px Arial';
      ctx.fillText(`Weapon Lv.${this.player.weaponLevel}`, 20, 50);

      // Weapon level bar
      for (let i = 1; i <= 6; i++) {
        const barX = 20 + (i - 1) * 20;
        const barY = 55;
        ctx.fillStyle = i <= this.player.weaponLevel ? '#00FFFF' : '#333333';
        ctx.fillRect(barX, barY, 15, 5);
      }

      // Show options count and status
      if (this.player.options.length > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = '14px Arial';
        ctx.fillText(`Options: ${this.player.options.length}`, 20, 90);

        // Show option levels
        this.player.options.forEach((option, index) => {
          const optX = 100 + index * 25;
          const optY = 90;
          ctx.fillStyle = '#FFD700';
          ctx.font = '12px Arial';
          ctx.fillText(`L${option.weaponLevel}`, optX, optY);
        });
      }

      // HP-based weapon warning
      const hpPercent = (this.player.hp / this.player.maxHP) * 100;
      if (hpPercent < 40) {
        // Flash warning when HP is low
        if (Math.floor(Date.now() / 500) % 2 === 0) {
          ctx.fillStyle = '#FF0000';
          ctx.font = 'bold 12px Arial';
          ctx.fillText('⚠ Low HP - Weapon Power Reduced!', 20, 75);
        }
      }
    }

    // Show stage clear message
    if (this.isStageClearing) {
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('STAGE CLEAR!', ctx.canvas.width / 2, ctx.canvas.height / 2);

      ctx.font = '24px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Proceeding to Stage ${this.stage + 1}...`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    }

    // Boss intro animation
    if (this.bossIntroTimer > 0) {
      ctx.save();

      // Full screen dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (this.bossIntroPhase === 'title') {
        // Red flashing background
        const flash = Math.sin(Date.now() * 0.01) * 0.3 + 0.2;
        ctx.fillStyle = `rgba(255, 0, 0, ${flash})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Animated scale
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(scale, scale);

        // Warning text
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 72px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeText('⚠ WARNING ⚠', 0, -60);
        ctx.fillText('⚠ WARNING ⚠', 0, -60);

        // Boss title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 84px Arial';
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 20;
        ctx.strokeText('BOSS BATTLE', 0, 20);
        ctx.fillText('BOSS BATTLE', 0, 20);

        // Subtitle
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        ctx.fillText('DRAGON LORD', 0, 80);

        ctx.restore();

        // Lightning effect occasionally
        if (Math.random() < 0.1) {
          ctx.strokeStyle = '#00FFFF';
          ctx.lineWidth = 3;
          ctx.globalAlpha = 0.7;
          ctx.beginPath();
          const startX = Math.random() * ctx.canvas.width;
          ctx.moveTo(startX, 0);
          for (let i = 0; i < 5; i++) {
            const nextX = startX + (Math.random() - 0.5) * 100;
            const nextY = (i + 1) * (ctx.canvas.height / 5);
            ctx.lineTo(nextX, nextY);
          }
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    // Boss victory animation
    if (this.bossVictoryTimer > 0) {
      ctx.save();

      // Dark overlay
      ctx.fillStyle = `rgba(0, 0, 20, ${0.8})`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Explosion effects
      this.bossExplosionEffects.forEach((effect, index) => {
        if (effect.timer <= 0) {
          effect.radius += 300 * (1/60); // Expand rapidly

          // Draw explosion
          const gradient = ctx.createRadialGradient(
            effect.x, effect.y, 0,
            effect.x, effect.y, effect.radius
          );
          gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
          gradient.addColorStop(0.4, 'rgba(255, 128, 0, 0.5)');
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        effect.timer -= 1/60;
      });

      // Victory text (after explosions start)
      if (this.bossVictoryTimer < 4) {
        const scale = 1 + Math.sin(Date.now() * 0.01) * 0.2;
        ctx.save();
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.scale(scale, scale);

        // Victory text with rainbow effect
        const hue = (Date.now() * 0.1) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.font = 'bold 84px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowBlur = 30;
        ctx.fillText('VICTORY!', 0, 0);

        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
        ctx.fillText('DRAGON DEFEATED!', 0, 60);

        // Score bonus
        ctx.font = '28px Arial';
        ctx.fillStyle = '#00FF00';
        ctx.fillText(`+${this.gameCore.scoreManager.getScore()} POINTS`, 0, 100);

        ctx.restore();
      }

      ctx.restore();

      // Update victory timer
      this.bossVictoryTimer -= 1/60;
      if (this.bossVictoryTimer <= 0) {
        // Continue to next loop instead of game over
        this.startNewLoop();
      }
    }

    // New loop message animation
    if (this.newLoopTimer > 0) {
      ctx.save();

      // Dark overlay
      ctx.fillStyle = `rgba(0, 0, 50, ${0.7 * (this.newLoopTimer / 3.0)})`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Animated text
      const scale = 1 + Math.sin(Date.now() * 0.01) * 0.1;
      ctx.save();
      ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.scale(scale, scale);

      // Loop number with golden glow
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 30;
      ctx.fillText(this.newLoopMessage, 0, 0);

      // Subtitle
      ctx.font = 'bold 32px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 10;
      ctx.fillText('NEW CHALLENGE AWAITS', 0, 60);

      // Difficulty increase warning
      ctx.font = '24px Arial';
      ctx.fillStyle = '#FF6B6B';
      const difficultyIncrease = Math.floor(this.loopCount * 25);
      ctx.fillText(`Difficulty +${difficultyIncrease}%`, 0, 100);

      ctx.restore();

      // Update timer
      this.newLoopTimer -= 1/60;

      ctx.restore();
    }

    // Draw magic effect
    if (this.magicEffect && this.magicEffect.active) {
      ctx.save();
      ctx.fillStyle = '#00FFFF';
      ctx.globalAlpha = this.magicEffect.timer;

      // Draw expanding circles
      const radius = (0.5 - this.magicEffect.timer) * 1000;
      ctx.beginPath();
      ctx.arc(this.player.x, this.player.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#00FFFF';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Flash effect
      if (this.magicEffect.timer > 0.3) {
        ctx.globalAlpha = (this.magicEffect.timer - 0.3) * 0.5;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }

      ctx.restore();
    }
  }

  /**
   * Start a new loop after boss defeat
   */
  startNewLoop() {
    console.log('[PlayState] Starting new loop! Loop count:', this.loopCount + 1);

    // Increment loop counter for difficulty scaling
    this.loopCount++;

    // Reset to stage 1 but keep player stats and score
    this.stage = 1;
    this.enemiesDefeated = 0;
    this.isStageClearing = false;
    this.stageClearTimer = 0;
    this.isBossStage = false;
    this.bossesDefeated = 0;
    this.bossVictoryTimer = 0;
    this.bossExplosionEffects = [];
    this.bossIntroTimer = 0;
    this.bossIntroPhase = null;

    // Clear current enemies and bullets
    this.enemies = [];
    this.bullets = [];
    this.items = [];

    // Reset minion counts
    this.minionCounts = {
      slime: 0,
      goblin: 0,
      skeleton: 0,
      demon: 0
    };

    // Reset item spawn timers
    this.stageItemsSpawned = {
      mp: false
    };
    this.shieldItemTimer = 10.0;

    // Give player bonus HP/MP for completing a loop
    if (this.player) {
      this.player.heal(50);  // Bonus HP
      this.player.restoreMP(30);  // Bonus MP
      console.log('[PlayState] Loop bonus: +50 HP, +30 MP');
    }

    // Show loop message with animation
    this.newLoopTimer = 3.0; // 3 seconds to show new loop message
    this.newLoopMessage = `LOOP ${this.loopCount}`;
    console.log(`[PlayState] Entering Loop ${this.loopCount + 1} - Difficulty increased!`);
  }

  /**
   * Reset state
   */
  reset() {
    this.initialized = false;
    this.player = null;
    this.enemies = [];
    this.bullets = [];
    this.items = [];
    this.stage = 1;
    this.enemiesDefeated = 0;
    this.isStageClearing = false;
    this.stageClearTimer = 0;
    this.shieldItemTimer = 10.0; // Start shield item spawn soon after game reset
    this.loopCount = 0; // Reset loop count on full reset
  }
}