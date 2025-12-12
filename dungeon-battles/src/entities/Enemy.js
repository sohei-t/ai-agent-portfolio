/**
 * Enemy.js - Basic enemy entity
 */
import { Bullet } from './Bullet.js';

// Static counter for boss encounters
let bossEncounterCount = 0;

export class Enemy {
  constructor(x, y, type = 'slime', difficulty = 'normal') {
    // Position
    this.x = x;
    this.y = y;

    // Size
    this.width = 28;
    this.height = 28;

    // Movement
    this.vx = 0;
    this.vy = 50; // Move down slowly

    // Type and stats based on enemy type
    this.type = type;
    this.difficulty = difficulty;
    this.initStats();

    // State
    this.alive = true;
    this.entityType = 'enemy';

    // Shooting
    this.shootTimer = 0;
    this.shootInterval = 2.0; // Seconds between shots
    this.canShoot = true;

    // Sprite
    this.sprite = null;
    this.loadSprite();
  }

  loadSprite() {
    const spriteMap = {
      'slime': 'enemy_1',
      'goblin': 'enemy_2',
      'skeleton': 'enemy_3',
      'demon': 'enemy_4',
      'dragon': 'boss_1'
    };

    const filename = spriteMap[this.type] || 'enemy_1';
    const path = this.type === 'dragon' ?
      `assets/sprites/boss/${filename}.png` :
      `assets/sprites/enemies/${filename}.png`;

    const img = new Image();
    img.onload = () => {
      this.sprite = img;
      console.log(`[Enemy ${this.type}] Sprite loaded:`, img.width, 'x', img.height);
    };
    img.onerror = () => {
      console.warn(`[Enemy ${this.type}] Failed to load sprite from ${path}`);
    };
    img.src = path;
  }

  /**
   * Get the current boss encounter count
   */
  getBossEncounterCount() {
    return bossEncounterCount;
  }

  /**
   * Increment boss encounter count when boss is created
   */
  incrementBossCount() {
    if (this.type === 'dragon') {
      bossEncounterCount++;
    }
  }

  /**
   * Reset boss encounter count (for new game)
   */
  static resetBossCount() {
    bossEncounterCount = 0;
  }

  initStats() {
    switch (this.type) {
      case 'slime':
        this.hp = 20;
        this.damage = 5;
        this.score = 100;
        this.color = '#FF6B6B';
        this.speed = 50;
        this.shootInterval = 3.0;
        this.canShoot = false; // Slimes don't shoot
        break;
      case 'goblin':
        this.hp = 30;
        this.damage = 8;
        this.score = 150;
        this.color = '#FFA500';
        this.speed = 70;
        this.shootInterval = 2.5;
        break;
      case 'skeleton':
        this.hp = 40;
        this.damage = 10;
        this.score = 200;
        this.color = '#CCCCCC';
        this.speed = 60;
        this.shootInterval = 2.0;
        break;
      case 'demon':
        this.hp = 60;
        this.damage = 15;
        this.score = 300;
        this.color = '#8B008B';
        this.speed = 80;
        this.shootInterval = 1.5;
        break;
      case 'dragon':
        // Progressive difficulty based on boss encounter count
        const bossCount = this.getBossEncounterCount();
        const difficultyMultiplier = 1 + (bossCount * 0.15); // 15% harder each time

        this.hp = Math.min(500 * difficultyMultiplier, 1000); // Max 1000 HP
        this.maxHP = this.hp;
        this.damage = Math.min(50 * difficultyMultiplier, 100); // Max 100 damage
        this.score = 1000 * difficultyMultiplier;
        this.color = '#FF0000';
        this.speed = Math.min(50 * (1 + bossCount * 0.1), 80); // Slightly faster each time
        this.width = 96; // Much bigger
        this.height = 96;
        this.shootInterval = Math.max(2.0 / difficultyMultiplier, 1.0); // Faster shooting
        this.isBoss = true;
        this.enraged = false; // New: rage mode flag
        this.invincible = false;
        this.invincibilityTimer = 0;
        this.invincibilityDuration = Math.max(2.5 - (bossCount * 0.2), 1.5); // Less invincibility time
        this.invincibilityCycle = Math.max(5.0 - (bossCount * 0.3), 3.0); // More frequent invincibility
        this.cycleTimer = 0;
        this.movePattern = 'circle'; // Boss movement pattern
        this.moveAngle = 0;
        this.bossEncounter = bossCount; // Track which encounter this is
        // Boss starts at top-right and waits (less time each encounter)
        this.initialWaitTimer = Math.max(5.0 - (bossCount * 0.5), 2.0);
        this.hasStartedMoving = false;
        // Set initial position to top-right
        if (this.x === 0 && this.y === 0) {
          this.x = 700;
          this.y = 100;
        }

        // Increment boss count for next encounter
        this.incrementBossCount();

        // Log difficulty scaling
        console.log(`[Boss] Encounter #${bossCount + 1} - HP: ${this.hp}, Damage: ${this.damage}, Shoot Interval: ${this.shootInterval}`);
        break;
    }

    this.maxHP = this.hp;
    this.vy = this.speed;
  }

  update(deltaTime, playerX = 400, playerY = 500) {
    if (!this.alive) return null;

    // Initialize bullets array at the start
    let bullets = [];

    // Boss-specific behavior
    if (this.isBoss) {
      // Handle initial wait timer
      if (!this.hasStartedMoving) {
        this.initialWaitTimer -= deltaTime;
        if (this.initialWaitTimer <= 0) {
          this.hasStartedMoving = true;
          console.log('[Boss] Starting movement after 5 second wait');
        }
        // Don't move or become invincible during wait period
        if (!this.hasStartedMoving) {
          return null;  // Return null during wait period, no bullets yet
        }
      }

      // Update invincibility cycle (only after starting to move)
      this.cycleTimer += deltaTime;
      if (this.cycleTimer >= this.invincibilityCycle) {
        this.cycleTimer = 0;
        this.invincible = true;
        this.invincibilityTimer = this.invincibilityDuration;
      }

      if (this.invincible) {
        this.invincibilityTimer -= deltaTime;
        if (this.invincibilityTimer <= 0) {
          this.invincible = false;
        }
      }

      // Boss movement pattern - reduced movement range (1/2 of original)
      this.moveAngle += deltaTime * 2;
      const centerX = 400;
      const centerY = 200;
      const radiusX = 100;  // Reduced from 200 to 100 (half)
      const radiusY = 50;   // Reduced from 100 to 50 (half)

      this.x = centerX + Math.cos(this.moveAngle) * radiusX;
      this.y = centerY + Math.sin(this.moveAngle * 0.7) * radiusY;

      // Keep boss on screen
      this.x = Math.max(this.width/2, Math.min(800 - this.width/2, this.x));
      this.y = Math.max(this.height/2, Math.min(300, this.y));
    } else {
      // Normal enemy movement
      this.y += this.vy * deltaTime;

      // Sine wave movement for variety (more aggressive in hard mode)
      const waveAmplitude = this.difficulty === 'hard' ? 75 : 50;
      this.x += Math.sin(this.y * 0.01) * waveAmplitude * deltaTime;
    }

    // Handle shooting
    if (this.canShoot) {
      this.shootTimer += deltaTime;

      // Rage mode - faster shooting when HP < 50
      const rageMultiplier = (this.isBoss && this.hp <= 50) ? 0.5 : 1;
      const actualShootInterval = this.shootInterval * rageMultiplier;

      const shootCondition = this.isBoss ?
        (this.shootTimer >= actualShootInterval) :
        (this.shootTimer >= this.shootInterval && this.y > 50 && this.y < 500);

      if (shootCondition) {
        if (this.isBoss) {
          // Boss shoots laser beams
          bullets = this.shootLaser(playerX, playerY);
        } else if (this.difficulty === 'hard') {
          bullets = this.shootOmnidirectional();
        } else {
          const bullet = this.shoot(playerX);
          if (bullet) bullets.push(bullet);
        }
        this.shootTimer = 0;
      }
    }

    // Remove normal enemies if off screen (boss never leaves)
    if (!this.isBoss && this.y > 650) {
      this.alive = false;
    }

    // Return array of bullets for compatibility
    return bullets.length > 0 ? (bullets.length === 1 ? bullets[0] : bullets) : null;
  }

  shoot(targetX) {
    // Calculate direction towards player
    const dx = targetX - this.x;
    const dy = 600 - this.y; // Aim towards bottom of screen
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize and scale velocity
    const speed = 200;
    const vx = (dx / distance) * speed;
    const vy = (dy / distance) * speed;

    return new Bullet(
      this.x,
      this.y + this.height/2 + 5,
      vx,
      vy,
      this.damage,
      'enemy'
    );
  }

  /**
   * Shoot bullets in multiple directions (hard mode)
   */
  shootOmnidirectional() {
    const bullets = [];
    const baseSpeed = 180;

    // Number of directions based on enemy type
    let directions = 4;
    if (this.type === 'demon' || this.type === 'dragon') {
      directions = 8;
    } else if (this.type === 'skeleton') {
      directions = 6;
    } else if (this.type === 'goblin') {
      directions = 4;
    } else {
      // Slimes shoot in 3 directions
      directions = 3;
    }

    // Create bullets in evenly spaced directions
    for (let i = 0; i < directions; i++) {
      const angle = (Math.PI * 2 * i) / directions;
      const vx = Math.cos(angle) * baseSpeed;
      const vy = Math.sin(angle) * baseSpeed;

      bullets.push(new Bullet(
        this.x,
        this.y,
        vx,
        vy,
        this.damage,
        'enemy'
      ));
    }

    return bullets;
  }

  /**
   * Shoot laser beams (boss attack)
   */
  shootLaser(targetX, targetY) {
    const bullets = [];

    // Calculate direction towards player
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Determine if in rage mode
    const isRageMode = this.hp <= 50;

    // Same speed as normal bullets (200) for fairness
    const speed = 200; // Keep same speed as normal bullets
    const vx = (dx / distance) * speed;
    const vy = (dy / distance) * speed;

    // Create large laser bullet
    const laser = new Bullet(
      this.x,
      this.y + this.height/2,
      vx,
      vy,
      this.damage * (isRageMode ? 1.5 : 1), // 1.5x damage in rage mode
      'enemy'
    );

    // Make laser look like a proper beam (horizontal rectangle)
    laser.width = 60;  // Wide horizontal beam
    laser.height = 8;  // Thin height for beam effect
    laser.color = '#00FFFF'; // Cyan laser (contrasts better with dark background)
    laser.isBeam = true; // Flag for special rendering

    bullets.push(laser);

    // Add more spread lasers in rage mode - wider angle for avoidability
    const spreadCount = isRageMode ? 2 : 1; // Double the spread lasers in rage
    const spreadAngle = isRageMode ? 0.4 : 0.35;  // Increased angle for more spread

    for (let j = 1; j <= spreadCount; j++) {
      for (let i = -1; i <= 1; i += 2) {
        const angle = Math.atan2(dy, dx) + (spreadAngle * i * j);
        const spreadVx = Math.cos(angle) * speed * 0.8;
        const spreadVy = Math.sin(angle) * speed * 0.8;

        const spreadLaser = new Bullet(
          this.x,
          this.y + this.height/2,
          spreadVx,
          spreadVy,
          this.damage * (isRageMode ? 1 : 0.7),
          'enemy'
        );
        spreadLaser.width = isRageMode ? 45 : 40;  // Slightly smaller than main beam
        spreadLaser.height = 6;  // Thin for beam effect
        spreadLaser.color = isRageMode ? '#FF00FF' : '#9966FF'; // Purple/magenta variants
        spreadLaser.isBeam = true;

        bullets.push(spreadLaser);
      }
    }

    return bullets;
  }

  render(ctx, assetLoader) {
    if (!this.alive) return;

    ctx.save();

    // Boss rage mode visual effect (when HP < 50)
    if (this.isBoss && this.hp <= 50) {
      // Intense pulsating red/orange glow for rage mode
      const pulse = Math.sin(Date.now() * 0.02) * 0.5 + 0.5;
      ctx.shadowColor = pulse > 0.5 ? '#FF0000' : '#FF8800';
      ctx.shadowBlur = 40 + pulse * 20;
      ctx.globalAlpha = 0.9 + Math.sin(Date.now() * 0.03) * 0.1;

      // Add secondary glow layer
      ctx.shadowOffsetX = Math.sin(Date.now() * 0.01) * 2;
      ctx.shadowOffsetY = Math.cos(Date.now() * 0.01) * 2;
    }
    // Boss invincibility visual effect
    else if (this.isBoss && this.invincible) {
      // Blue-white shield effect for invincibility
      ctx.shadowColor = '#00AAFF';
      ctx.shadowBlur = 30;
      ctx.globalAlpha = 0.8 + Math.sin(Date.now() * 0.01) * 0.2;
    }

    // Use directly loaded sprite first, fallback to assetLoader
    const spriteImg = this.sprite || (() => {
      const spriteMap = {
        'slime': 'enemy_1',
        'goblin': 'enemy_2',
        'skeleton': 'enemy_3',
        'demon': 'enemy_4',
        'dragon': 'boss_1'
      };
      const spriteId = spriteMap[this.type] || 'enemy_1';
      return assetLoader?.getAsset?.(spriteId);
    })();

    if (spriteImg && spriteImg.complete) {
      // Adjust size multiplier based on enemy type
      let sizeMultiplier = 1.2;
      if (this.type === 'dragon') {
        sizeMultiplier = 2.0; // Make boss much larger
      } else if (this.type === 'demon') {
        sizeMultiplier = 1.5;
      }

      const drawWidth = this.width * sizeMultiplier;
      const drawHeight = this.height * sizeMultiplier;

      ctx.drawImage(
        spriteImg,
        this.x - drawWidth/2,
        this.y - drawHeight/2,
        drawWidth,
        drawHeight
      );
    } else {
      // Fallback to colored square
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x - this.width/2,
        this.y - this.height/2,
        this.width,
        this.height
      );

      // Draw border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.x - this.width/2,
        this.y - this.height/2,
        this.width,
        this.height
      );
    }

    // Draw HP bar
    if (this.hp < this.maxHP) {
      const barWidth = this.width;
      const barHeight = 4;
      const hpPercent = this.hp / this.maxHP;

      // Background
      ctx.fillStyle = '#333333';
      ctx.fillRect(
        this.x - barWidth/2,
        this.y - this.height/2 - 10,
        barWidth,
        barHeight
      );

      // HP
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(
        this.x - barWidth/2,
        this.y - this.height/2 - 10,
        barWidth * hpPercent,
        barHeight
      );
    }

    ctx.restore();
  }

  takeDamage(amount) {
    // Boss doesn't take damage when invincible
    if (this.isBoss && this.invincible) {
      console.log('[Boss] Damage blocked - invincible!');
      return;
    }

    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  }
}