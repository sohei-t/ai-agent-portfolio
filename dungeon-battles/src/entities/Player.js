/**
 * Player.js - Player character entity
 */
import { Bullet } from './Bullet.js';

export class Player {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;

    // Size
    this.width = 32;
    this.height = 32;

    // Stats
    this.hp = 100;
    this.maxHP = 100;
    this.mp = 50;
    this.maxMP = 50;
    this.attackPower = 10;
    this.magicPower = 20;

    // Movement
    this.vx = 0;
    this.vy = 0;
    this.speed = 200;

    // State
    this.alive = true;
    this.invincible = false;
    this.invincibilityTimer = 0;

    // Attack
    this.attackCooldown = 0;
    this.attackRate = 0.3; // 3 attacks per second
    this.weaponLevel = 1; // 1=single, 2=2-way, 3=3-way, 4=+right, 5=+left, 6=+back
    this.maxWeaponLevel = 1; // Track the highest weapon level achieved
    this.lastHPPercentage = 100; // Track HP percentage for weapon downgrade

    // Options (clone satellites)
    this.options = []; // Array of option objects
    this.maxOptions = 4; // Maximum number of options
    this.optionOffset = 0; // For animation

    // Magic flag
    this.useMagic = false;

    // Speed boost
    this.baseSpeed = 200;
    this.speedMultiplier = 1.0;
    this.speedBoostTimer = 0;

    // Shield
    this.shieldHP = 0;
    this.maxShieldHP = 30; // Maximum shield strength
    this.hasShield = false;

    // Type for collision
    this.type = 'player';

    // Visual
    this.color = '#00FF00';

    // Sprite
    this.sprite = null;
    this.loadSprite();
  }

  loadSprite() {
    const img = new Image();
    img.onload = () => {
      this.sprite = img;
      console.log('[Player] Sprite loaded successfully:', img.width, 'x', img.height);
    };
    img.onerror = () => {
      console.warn('[Player] Failed to load sprite');
    };
    img.src = 'assets/sprites/player/player_ship.png';
  }

  /**
   * Update player state
   * Returns array of bullets created this frame
   */
  update(deltaTime, inputSystem) {
    if (!this.alive) return [];

    const bullets = [];

    // Update speed with boost
    this.speed = this.baseSpeed * this.speedMultiplier;

    // Update option animation
    this.optionOffset += deltaTime * 3;

    // Update speed boost timer
    if (this.speedBoostTimer > 0) {
      this.speedBoostTimer -= deltaTime;
      if (this.speedBoostTimer <= 0) {
        this.speedMultiplier = 1.0;
        console.log('[Player] Speed boost expired');
      }
    }

    // Handle input
    if (inputSystem) {
      const movement = inputSystem.getMovementAxis();
      this.vx = movement.x * this.speed;
      this.vy = movement.y * this.speed;

      // Handle attack (works for both keyboard and mobile)
      if (inputSystem.isAttackPressed() && this.attackCooldown <= 0) {
        const newBullets = this.attack();
        if (newBullets) bullets.push(...newBullets);

        // Options also attack
        this.options.forEach((option, index) => {
          const optionBullets = this.attackOption(option, index);
          if (optionBullets) bullets.push(...optionBullets);
        });

        this.attackCooldown = this.attackRate;
      }

      // Handle magic (works for both keyboard and mobile)
      if ((inputSystem.isMagicPressed() || inputSystem.isKeyDown('x')) && this.mp >= 10 && this.attackCooldown <= 0) {
        this.useMagic = true;
        this.attackCooldown = this.attackRate * 2; // Longer cooldown for powerful magic
      } else {
        this.useMagic = false;
      }
    }

    // Update position
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;

    // Update cooldowns
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }

    // Update invincibility
    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer -= deltaTime;
      if (this.invincibilityTimer <= 0) {
        this.invincible = false;
      }
    }

    // Keep player on screen
    this.x = Math.max(this.width/2, Math.min(800 - this.width/2, this.x));
    this.y = Math.max(this.height/2, Math.min(600 - this.height/2, this.y));

    return bullets;
  }

  /**
   * Render player
   */
  render(ctx, assetLoader) {
    if (!this.alive) return;

    ctx.save();

    // Shield effect (draw before player) - Enhanced visibility
    if (this.hasShield && this.shieldHP > 0) {
      ctx.save();

      // Stronger pulsing shield bubble effect
      const shieldPulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
      const shieldRadius = 45 + shieldPulse * 10; // Larger and more pulsing

      // Multi-layer shield for better visibility
      const shieldStrength = this.shieldHP / this.maxShieldHP;

      // Outer glow layer
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 20 + shieldPulse * 10;

      // Inner shield gradient (more opaque)
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, shieldRadius);
      gradient.addColorStop(0, `rgba(0, 255, 255, ${0.1 * shieldStrength})`);
      gradient.addColorStop(0.5, `rgba(0, 255, 255, ${0.3 * shieldStrength})`);
      gradient.addColorStop(0.8, `rgba(0, 200, 255, ${0.5 * shieldStrength})`);
      gradient.addColorStop(1, `rgba(0, 150, 255, ${0.7 * shieldStrength})`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, shieldRadius, 0, Math.PI * 2);
      ctx.fill();

      // Shield outline (thicker and brighter)
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.9 * shieldPulse})`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Hexagonal shield pattern overlay for sci-fi look
      ctx.strokeStyle = `rgba(100, 255, 255, ${0.3 * shieldPulse})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const innerRadius = shieldRadius * 0.8;
        ctx.beginPath();
        ctx.moveTo(
          this.x + Math.cos(angle) * innerRadius,
          this.y + Math.sin(angle) * innerRadius
        );
        ctx.lineTo(
          this.x + Math.cos(angle + Math.PI/3) * innerRadius,
          this.y + Math.sin(angle + Math.PI/3) * innerRadius
        );
        ctx.stroke();
      }

      // Shield HP indicator (larger and more prominent)
      const barWidth = 40;
      const barHeight = 5;
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(this.x - barWidth/2, this.y - 50, barWidth, barHeight);
      // Shield HP bar
      ctx.fillStyle = '#00FFFF';
      ctx.fillRect(this.x - barWidth/2, this.y - 50, barWidth * shieldStrength, barHeight);
      // Border
      ctx.strokeStyle = '#00CCCC';
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x - barWidth/2, this.y - 50, barWidth, barHeight);

      // Shield text indicator
      ctx.fillStyle = '#00FFFF';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SHIELD', this.x, this.y - 58);

      ctx.restore();
    }

    // Red glow effect when options are active
    if (this.options.length > 0) {
      ctx.shadowColor = '#FF0000';
      ctx.shadowBlur = 20 + Math.sin(Date.now() * 0.005) * 10; // Pulsing glow
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Flash when invincible
    if (this.invincible && Math.floor(this.invincibilityTimer * 10) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Use directly loaded sprite first, fallback to assetLoader
    const spriteImg = this.sprite || assetLoader?.getAsset?.('player');

    if (spriteImg && spriteImg.complete) {
      // Draw sprite image (resized to fit player size)
      const drawWidth = this.width * 2; // Make sprite larger
      const drawHeight = this.height * 2;

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
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.x - this.width/2,
        this.y - this.height/2,
        this.width,
        this.height
      );
    }

    ctx.restore();

    // Render options
    this.renderOptions(ctx, assetLoader);
  }

  /**
   * Render options (satellite clones)
   */
  renderOptions(ctx, assetLoader) {
    this.options.forEach((option, index) => {
      ctx.save();

      // Calculate option position
      const angle = this.optionOffset + (index * Math.PI * 2 / this.options.length);
      const radius = 50 + index * 20;
      const optionX = this.x + Math.cos(angle) * radius;
      const optionY = this.y + Math.sin(angle) * radius;

      // Semi-transparent
      ctx.globalAlpha = 0.7;

      // Use sprite or fallback
      const spriteImg = this.sprite || assetLoader?.getAsset?.('player');

      if (spriteImg && spriteImg.complete) {
        const drawWidth = this.width * 1.5;
        const drawHeight = this.height * 1.5;

        ctx.drawImage(
          spriteImg,
          optionX - drawWidth/2,
          optionY - drawHeight/2,
          drawWidth,
          drawHeight
        );
      } else {
        // Fallback to colored square
        ctx.fillStyle = '#00AAFF';
        ctx.fillRect(
          optionX - this.width/3,
          optionY - this.height/3,
          this.width/1.5,
          this.height/1.5
        );
      }

      // Show option weapon level
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Lv${option.weaponLevel}`, optionX, optionY - 20);

      ctx.restore();
    });
  }

  /**
   * Attack - Creates bullets based on weapon level
   */
  attack() {
    const bullets = [];

    switch (this.weaponLevel) {
      case 1: // Single shot (forward)
        bullets.push(new Bullet(
          this.x,
          this.y - this.height/2 - 10,
          0,
          -400,
          this.attackPower,
          'player'
        ));
        break;

      case 2: // 2-way shot (forward spread)
        bullets.push(new Bullet(
          this.x - 10,
          this.y - this.height/2 - 10,
          -50,
          -380,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + 10,
          this.y - this.height/2 - 10,
          50,
          -380,
          this.attackPower,
          'player'
        ));
        break;

      case 3: // Front 3-way only
        // Forward 3-way
        bullets.push(new Bullet(
          this.x,
          this.y - this.height/2 - 10,
          0,
          -400,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - 10,
          this.y - this.height/2 - 10,
          -100,
          -350,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + 10,
          this.y - this.height/2 - 10,
          100,
          -350,
          this.attackPower,
          'player'
        ));
        break;

      case 4: // Front 3-way + Right 3-way
        // Forward 3-way
        bullets.push(new Bullet(
          this.x,
          this.y - this.height/2 - 10,
          0,
          -400,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - 10,
          this.y - this.height/2 - 10,
          -100,
          -350,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + 10,
          this.y - this.height/2 - 10,
          100,
          -350,
          this.attackPower,
          'player'
        ));
        // Right 3-way
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y,
          400,
          0,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y - 10,
          350,
          -100,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y + 10,
          350,
          100,
          this.attackPower,
          'player'
        ));
        break;

      case 5: // Front 3-way + Right 3-way + Left 3-way
        // Forward 3-way
        bullets.push(new Bullet(
          this.x,
          this.y - this.height/2 - 10,
          0,
          -400,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - 10,
          this.y - this.height/2 - 10,
          -100,
          -350,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + 10,
          this.y - this.height/2 - 10,
          100,
          -350,
          this.attackPower,
          'player'
        ));
        // Right 3-way
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y,
          400,
          0,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y - 10,
          350,
          -100,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y + 10,
          350,
          100,
          this.attackPower,
          'player'
        ));
        // Left 3-way
        bullets.push(new Bullet(
          this.x - this.width/2 - 10,
          this.y,
          -400,
          0,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - this.width/2 - 10,
          this.y - 10,
          -350,
          -100,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - this.width/2 - 10,
          this.y + 10,
          -350,
          100,
          this.attackPower,
          'player'
        ));
        break;

      case 6: // MAX: All directions (Front + Right + Left + Back)
      default:
        // Forward 3-way
        bullets.push(new Bullet(
          this.x,
          this.y - this.height/2 - 10,
          0,
          -400,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - 10,
          this.y - this.height/2 - 10,
          -100,
          -350,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + 10,
          this.y - this.height/2 - 10,
          100,
          -350,
          this.attackPower,
          'player'
        ));
        // Right 3-way
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y,
          400,
          0,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y - 10,
          350,
          -100,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + this.width/2 + 10,
          this.y + 10,
          350,
          100,
          this.attackPower,
          'player'
        ));
        // Left 3-way
        bullets.push(new Bullet(
          this.x - this.width/2 - 10,
          this.y,
          -400,
          0,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - this.width/2 - 10,
          this.y - 10,
          -350,
          -100,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - this.width/2 - 10,
          this.y + 10,
          -350,
          100,
          this.attackPower,
          'player'
        ));
        // Back 3-way
        bullets.push(new Bullet(
          this.x,
          this.y + this.height/2 + 10,
          0,
          400,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x - 10,
          this.y + this.height/2 + 10,
          -100,
          350,
          this.attackPower,
          'player'
        ));
        bullets.push(new Bullet(
          this.x + 10,
          this.y + this.height/2 + 10,
          100,
          350,
          this.attackPower,
          'player'
        ));
        break;
    }

    return bullets;
  }

  /**
   * Attack from option - Creates bullets based on option's weapon level
   */
  attackOption(option, index) {
    const bullets = [];

    // Calculate option position
    const angle = this.optionOffset + (index * Math.PI * 2 / this.options.length);
    const radius = 50 + index * 20;
    const optionX = this.x + Math.cos(angle) * radius;
    const optionY = this.y + Math.sin(angle) * radius;

    // Create bullets based on option's weapon level
    switch (option.weaponLevel) {
      case 1: // Single shot
        bullets.push(new Bullet(
          optionX,
          optionY - 10,
          0,
          -400,
          this.attackPower * 0.7, // Options do slightly less damage
          'player'
        ));
        break;

      case 2: // 2-way shot
        bullets.push(new Bullet(
          optionX - 10,
          optionY - 10,
          -50,
          -380,
          this.attackPower * 0.7,
          'player'
        ));
        bullets.push(new Bullet(
          optionX + 10,
          optionY - 10,
          50,
          -380,
          this.attackPower * 0.7,
          'player'
        ));
        break;

      case 3: // Front 3-way
        bullets.push(new Bullet(
          optionX,
          optionY - 10,
          0,
          -400,
          this.attackPower * 0.7,
          'player'
        ));
        bullets.push(new Bullet(
          optionX - 10,
          optionY - 10,
          -100,
          -350,
          this.attackPower * 0.7,
          'player'
        ));
        bullets.push(new Bullet(
          optionX + 10,
          optionY - 10,
          100,
          -350,
          this.attackPower * 0.7,
          'player'
        ));
        break;

      case 4: // Front + Right
        // Forward 3-way
        for (let i = -1; i <= 1; i++) {
          bullets.push(new Bullet(
            optionX + i * 10,
            optionY - 10,
            i * 100,
            -350 - (i === 0 ? 50 : 0),
            this.attackPower * 0.7,
            'player'
          ));
        }
        // Right 3-way
        for (let i = -1; i <= 1; i++) {
          bullets.push(new Bullet(
            optionX + 10,
            optionY + i * 10,
            350 - (i === 0 ? 50 : 0),
            i * 100,
            this.attackPower * 0.7,
            'player'
          ));
        }
        break;

      case 5: // Front + Right + Left
        // Forward 3-way
        for (let i = -1; i <= 1; i++) {
          bullets.push(new Bullet(
            optionX + i * 10,
            optionY - 10,
            i * 100,
            -350 - (i === 0 ? 50 : 0),
            this.attackPower * 0.7,
            'player'
          ));
        }
        // Right 3-way
        for (let i = -1; i <= 1; i++) {
          bullets.push(new Bullet(
            optionX + 10,
            optionY + i * 10,
            350 - (i === 0 ? 50 : 0),
            i * 100,
            this.attackPower * 0.7,
            'player'
          ));
        }
        // Left 3-way
        for (let i = -1; i <= 1; i++) {
          bullets.push(new Bullet(
            optionX - 10,
            optionY + i * 10,
            -350 + (i === 0 ? 50 : 0),
            i * 100,
            this.attackPower * 0.7,
            'player'
          ));
        }
        break;

      case 6: // All directions
      default:
        // All 4 directions, 3 bullets each
        const directions = [
          { dx: 0, dy: -1 },   // Up
          { dx: 1, dy: 0 },    // Right
          { dx: -1, dy: 0 },   // Left
          { dx: 0, dy: 1 }     // Down
        ];

        directions.forEach(dir => {
          for (let i = -1; i <= 1; i++) {
            const perpX = -dir.dy * i;
            const perpY = dir.dx * i;
            bullets.push(new Bullet(
              optionX + perpX * 10,
              optionY + perpY * 10,
              (dir.dx * 350 + perpX * 100),
              (dir.dy * 350 + perpY * 100),
              this.attackPower * 0.7,
              'player'
            ));
          }
        });
        break;
    }

    return bullets;
  }

  /**
   * Cast magic - Creates multiple bullets in a spread pattern
   */
  castMagic() {
    if (this.mp >= 10) {
      this.mp -= 10;

      // Create 3 magic bullets in a spread
      const bullets = [];
      const speeds = [
        { vx: -100, vy: -350 },
        { vx: 0, vy: -400 },
        { vx: 100, vy: -350 }
      ];

      for (const speed of speeds) {
        bullets.push(new Bullet(
          this.x,
          this.y - this.height/2 - 10,
          speed.vx,
          speed.vy,
          this.magicPower,
          'player'
        ));
      }

      return bullets;
    }
    return [];
  }

  /**
   * Take damage
   */
  takeDamage(amount) {
    if (this.invincible) return;

    // Shield absorbs damage first
    if (this.hasShield && this.shieldHP > 0) {
      const shieldDamage = Math.min(this.shieldHP, amount);
      this.shieldHP -= shieldDamage;
      const remainingDamage = amount - shieldDamage;

      console.log(`[Player] Shield absorbed ${shieldDamage} damage. Shield HP: ${this.shieldHP}/${this.maxShieldHP}`);

      if (this.shieldHP <= 0) {
        this.hasShield = false;
        this.shieldHP = 0;
        console.log('[Player] Shield destroyed!');
      }

      // If shield didn't absorb all damage
      if (remainingDamage > 0) {
        this.hp -= remainingDamage;
        this.invincible = true;
        this.invincibilityTimer = 1.5; // 1.5 seconds of invincibility
      }
    } else {
      // No shield, take full damage
      this.hp -= amount;
      this.invincible = true;
      this.invincibilityTimer = 1.5; // 1.5 seconds of invincibility
    }

    // Check for weapon downgrade based on HP percentage
    this.checkWeaponDowngrade();

    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
      console.log('Player defeated!');
    }
  }

  /**
   * Check and apply weapon downgrade based on HP
   */
  checkWeaponDowngrade() {
    const currentHPPercentage = (this.hp / this.maxHP) * 100;

    // Check if we've crossed a 20% threshold downward
    const oldThreshold = Math.floor(this.lastHPPercentage / 20);
    const newThreshold = Math.floor(currentHPPercentage / 20);

    if (newThreshold < oldThreshold && this.weaponLevel > 1) {
      // Downgrade weapon but not below level 1
      this.weaponLevel = Math.max(1, this.weaponLevel - 1);
      console.log(`[Player] Weapon downgraded to level ${this.weaponLevel} due to low HP (${Math.floor(currentHPPercentage)}%)`);
    }

    // Also downgrade options
    this.checkOptionDowngrade();

    this.lastHPPercentage = currentHPPercentage;
  }

  /**
   * Heal
   */
  heal(amount) {
    const oldHP = this.hp;
    this.hp = Math.min(this.maxHP, this.hp + amount);

    // Update HP percentage tracking when healing
    this.lastHPPercentage = (this.hp / this.maxHP) * 100;

    // Check if we can restore weapon level when healing
    const healedAmount = this.hp - oldHP;
    if (healedAmount > 0) {
      const hpPercent = (this.hp / this.maxHP) * 100;

      // Restore main weapon
      if (this.weaponLevel < this.maxWeaponLevel) {
        const expectedLevel = Math.min(this.maxWeaponLevel, Math.floor(hpPercent / 20) + 1);
        if (expectedLevel > this.weaponLevel) {
          this.weaponLevel = expectedLevel;
          console.log(`[Player] Weapon restored to level ${this.weaponLevel} (HP: ${Math.floor(hpPercent)}%)`);
        }
      }

      // Restore option weapons
      this.options.forEach(option => {
        if (option.weaponLevel < option.maxWeaponLevel) {
          const expectedLevel = Math.min(option.maxWeaponLevel, Math.floor(hpPercent / 20) + 1);
          if (expectedLevel > option.weaponLevel) {
            option.weaponLevel = expectedLevel;
            console.log(`[Player] Option restored to level ${option.weaponLevel}`);
          }
        }
      });
    }
  }

  /**
   * Restore MP
   */
  restoreMP(amount) {
    this.mp = Math.min(this.maxMP, this.mp + amount);
  }

  /**
   * Apply speed boost
   */
  applySpeedBoost(multiplier, duration) {
    this.speedMultiplier = multiplier;
    this.speedBoostTimer = duration;
    console.log(`[Player] Speed boost active: x${multiplier} for ${duration}s`);
  }

  /**
   * Add shield to player
   */
  addShield(amount) {
    this.shieldHP = Math.min(this.maxShieldHP, this.shieldHP + amount);
    this.hasShield = true;
    console.log(`[Player] Shield activated! Shield HP: ${this.shieldHP}/${this.maxShieldHP}`);
  }

  /**
   * Upgrade weapon to next level
   */
  upgradeWeapon() {
    if (this.weaponLevel < 6) {
      // Upgrade main weapon
      this.weaponLevel++;
      this.maxWeaponLevel = Math.max(this.maxWeaponLevel, this.weaponLevel); // Track max level
      const weaponDescriptions = {
        1: 'Single shot',
        2: '2-way spread',
        3: 'Front 3-way',
        4: 'Front + Right 3-way',
        5: 'Front + Right + Left 3-way',
        6: 'MAX: All directions (12 bullets!)'
      };
      console.log(`[Player] Weapon upgraded to level ${this.weaponLevel}: ${weaponDescriptions[this.weaponLevel]}`);
    } else if (this.options.length < this.maxOptions) {
      // Main weapon is maxed, add an option
      const newOption = {
        weaponLevel: 1,
        maxWeaponLevel: 1
      };
      this.options.push(newOption);
      console.log(`[Player] Added Option #${this.options.length}! (Lv.1 weapon)`);
    } else {
      // Upgrade existing options
      let upgraded = false;
      for (let option of this.options) {
        if (option.weaponLevel < 6) {
          option.weaponLevel++;
          option.maxWeaponLevel = Math.max(option.maxWeaponLevel, option.weaponLevel);
          const descriptions = {
            1: 'Single',
            2: '2-way',
            3: '3-way',
            4: '+Right',
            5: '+Left',
            6: 'MAX'
          };
          console.log(`[Player] Option upgraded to level ${option.weaponLevel}: ${descriptions[option.weaponLevel]}`);
          upgraded = true;
          break;
        }
      }

      if (!upgraded) {
        // Everything is maxed - restore HP/MP as bonus
        this.heal(30);
        this.restoreMP(20);
        console.log('[Player] All weapons at MAX level! Large HP/MP bonus!');
      }
    }
  }

  /**
   * Check and apply weapon downgrade for options when HP decreases
   */
  checkOptionDowngrade() {
    // Options lose power with main weapon
    this.options.forEach(option => {
      const currentHPPercentage = (this.hp / this.maxHP) * 100;
      const expectedLevel = Math.min(option.maxWeaponLevel, Math.floor(currentHPPercentage / 20) + 1);

      if (expectedLevel < option.weaponLevel) {
        option.weaponLevel = Math.max(1, expectedLevel);
        console.log(`[Player] Option downgraded to level ${option.weaponLevel} due to low HP`);
      }
    });
  }
}