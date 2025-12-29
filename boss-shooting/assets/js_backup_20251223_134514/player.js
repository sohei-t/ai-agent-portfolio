// Player class - Space Odyssey
class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;

        // サイズ（さらに小型化・シンプル）
        this.width = 6;  // 12→6（極小サイズ）
        this.height = 8;  // 14→8（極小サイズ）

        // 移動関連
        this.speed = 2;  // 8→2（敵弾0.6より少し速い程度）
        this.vx = 0;
        this.vy = 0;
        this.maxSpeed = 3;  // 10→3（最大速度も大幅に下げる）

        // 戦闘関連
        this.weapon = {
            type: 'beam',
            level: 1,
            fireRate: 5, // 1秒間の発射回数
            lastFire: 0,
            charging: false,  // チャージ中フラグ
            chargeTime: 0,   // チャージ時間
            maxCharge: 100   // 最大チャージ時間（フレーム）
        };

        // HP関連（新規追加）
        this.hp = 100;
        this.maxHp = 100;

        this.life = 3;
        this.maxLife = 5;
        this.invincible = 0; // 無敵時間（フレーム）
        this.invincibleDuration = 60;

        // 特殊能力
        this.shield = false;
        this.speedBoost = false;
        this.powerBoost = false;

        // 入力
        this.input = {
            left: false,
            right: false,
            up: false,
            down: false,
            fire: false
        };

        // 自動連射
        this.autoFire = true;

        // ビジュアル
        this.color = '#00ffff';
        this.engineGlow = 0;

        // 画像を読み込み
        this.imageLoaded = false;
        this.sprite = new Image();

        this.sprite.onload = () => {
            this.imageLoaded = true;
            console.log('Player sprite loaded successfully');
        };

        this.sprite.onerror = () => {
            console.log('Failed to load player sprite, using fallback');
            this.imageLoaded = false;
        };

        // 画像を読み込む（PNG画像が存在する場合）
        this.sprite.src = `assets/images/player_ship.png`;
    }

    update(dt) {
        // 無敵時間更新
        if (this.invincible > 0) {
            this.invincible--;
        }

        // 移動処理
        this.handleMovement(dt);

        // チャージショットシステム
        if (this.input.fire) {
            // ボタンが押されている間チャージ
            if (!this.weapon.charging) {
                this.weapon.charging = true;
                this.weapon.chargeTime = 0;
            }
            this.weapon.chargeTime = Math.min(this.weapon.chargeTime + 1, this.weapon.maxCharge);

            // チャージ中も通常弾は発射可能（最初の10フレームのみ）
            if (this.weapon.chargeTime <= 10) {
                this.fire();
            }
        } else if (this.weapon.charging) {
            // ボタンを離したときにチャージショット発射
            if (this.weapon.chargeTime >= 20) {  // 最低チャージ時間
                this.fireChargedBeam();
            } else if (this.weapon.chargeTime < 10) {
                // チャージが短い場合は通常弾
                this.fire();
            }
            this.weapon.charging = false;
            this.weapon.chargeTime = 0;
        } else if (this.autoFire) {
            // オートファイア（チャージしていない時）
            this.fire();
        }

        // エンジングロー演出
        this.engineGlow = (this.engineGlow + 0.1) % (Math.PI * 2);
    }

    handleMovement(dt) {
        // 入力に基づく加速度
        let ax = 0;
        let ay = 0;

        if (this.input.left) ax -= this.speed;
        if (this.input.right) ax += this.speed;
        if (this.input.up) ay -= this.speed;
        if (this.input.down) ay += this.speed;

        // スピードブースト適用
        if (this.speedBoost) {
            ax *= 1.5;
            ay *= 1.5;
        }

        // 速度更新
        this.vx += ax * dt;
        this.vy += ay * dt;

        // 摩擦
        this.vx *= 0.9;
        this.vy *= 0.9;

        // 最大速度制限
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.maxSpeed) {
            this.vx = (this.vx / speed) * this.maxSpeed;
            this.vy = (this.vy / speed) * this.maxSpeed;
        }

        // 位置更新
        this.x += this.vx;
        this.y += this.vy;

        // 画面内制限（重要: 下端を含めて完全に画面内に制限）
        const margin = 5;  // 画面端からの最小マージン
        if (this.game && this.game.canvas) {
            // 左右の制限
            this.x = Math.max(this.width / 2 + margin,
                    Math.min(this.game.canvas.width - this.width / 2 - margin, this.x));

            // 上下の制限（特に下端を厳密に制限）
            this.y = Math.max(this.height / 2 + margin,
                    Math.min(this.game.canvas.height - this.height / 2 - margin, this.y));
        }
    }

    fire() {
        const now = Date.now();
        const fireInterval = 1000 / this.weapon.fireRate;

        if (now - this.weapon.lastFire < fireInterval) {
            return;
        }

        this.weapon.lastFire = now;

        // 武器タイプに応じた発射
        switch (this.weapon.type) {
            case 'beam':
                this.fireBeam();
                break;
            case 'spread':
                this.fireSpread();
                break;
            case 'laser':
                this.fireLaser();
                break;
            case 'homing':
                this.fireHoming();
                break;
            case 'wave':
                this.fireWave();
                break;
            default:
                this.fireBeam();
        }

        // 効果音
        if (typeof playSFX === 'function') {
            playSFX('shoot_' + this.weapon.type);
        }
    }

    fireBeam() {
        const level = this.weapon.level;

        // レベルに応じた弾数
        if (level === 1) {
            this.createBullet(this.x, this.y - 15, 0, -10);
        } else if (level === 2) {
            this.createBullet(this.x - 8, this.y - 15, 0, -10);
            this.createBullet(this.x + 8, this.y - 15, 0, -10);
        } else if (level === 3) {
            this.createBullet(this.x, this.y - 15, 0, -10);
            this.createBullet(this.x - 12, this.y - 10, -1, -10);
            this.createBullet(this.x + 12, this.y - 10, 1, -10);
        } else if (level === 4) {
            this.createBullet(this.x - 8, this.y - 15, 0, -10);
            this.createBullet(this.x + 8, this.y - 15, 0, -10);
            this.createBullet(this.x - 16, this.y - 10, -2, -10);
            this.createBullet(this.x + 16, this.y - 10, 2, -10);
        } else if (level >= 5) {
            // レベル5: 5方向
            for (let i = -2; i <= 2; i++) {
                this.createBullet(
                    this.x + i * 8,
                    this.y - 15,
                    i * 1.5,
                    -10
                );
            }
        }
    }

    fireSpread() {
        const level = this.weapon.level;
        // レベルに応じて扇状に広がる弾を発射
        const bulletCount = 2 + level;  // レベル1で3発、レベル5で7発
        const angleSpread = 15;  // 基本角度

        for (let i = 0; i < bulletCount; i++) {
            const angle = (i - (bulletCount - 1) / 2) * angleSpread * Math.PI / 180;
            const speed = 12;
            this.createBullet(
                this.x,
                this.y - 15,
                Math.sin(angle) * speed,
                -Math.cos(angle) * speed,
                'spread'
            );
        }
    }

    fireLaser() {
        // レーザーは特殊処理（貫通弾・持続型）
        const level = this.weapon.level;
        const width = 6 + level * 3;  // より太く

        // レベルに応じて複数レーザー
        if (level >= 3) {
            this.createBullet(this.x - 20, this.y - 20, 0, -20, 'laser', width);
            this.createBullet(this.x + 20, this.y - 20, 0, -20, 'laser', width);
        } else {
            this.createBullet(this.x, this.y - 20, 0, -20, 'laser', width * 1.5);
        }
    }

    fireHoming() {
        const level = this.weapon.level;
        const missiles = Math.min(level + 1, 4);  // 最大4発

        for (let i = 0; i < missiles; i++) {
            const offset = (i - (missiles - 1) / 2) * 20;
            const bullet = this.createBullet(
                this.x + offset,
                this.y - 10,
                0,
                -6,
                'homing'
            );
            // ホーミング用のターゲット設定
            if (bullet && this.game.enemies.length > 0) {
                bullet.target = this.game.enemies[0];  // 最も近い敵をターゲット
            }
        }
    }

    fireWave() {
        const level = this.weapon.level;
        // 波状の弾を発射
        const waves = Math.min(level, 3);  // 最大3列

        for (let w = 0; w < waves; w++) {
            for (let i = -1; i <= 1; i++) {
                const bullet = this.createBullet(
                    this.x + i * 15,
                    this.y - 15 - w * 10,
                    0,
                    -10,
                    'wave'
                );
                if (bullet) {
                    bullet.waveAmplitude = 3 + level;  // 波の振幅
                    bullet.waveFrequency = 0.1;  // 波の周波数
                    bullet.waveOffset = i * Math.PI / 2;  // 位相差
                }
            }
        }
    }

    createBullet(x, y, vx, vy, type = 'beam', width = 4) {
        if (typeof Bullet !== 'undefined') {
            const power = this.weapon.level * (this.powerBoost ? 1.5 : 1);
            const bullet = new Bullet(x, y, vx, vy, power, 'player', type);
            bullet.width = width;
            this.game.bullets.push(bullet);
            return bullet;  // 弾を返すように変更（ホーミング用）
        }
        return null;
    }

    fireChargedBeam() {
        // チャージ量に応じた威力とサイズ
        const chargeRatio = this.weapon.chargeTime / this.weapon.maxCharge;
        const chargeLevel = Math.floor(chargeRatio * 5) + 1;  // レベル1-5

        // 巨大ビーム発射
        if (typeof Bullet !== 'undefined') {
            const power = this.weapon.level * chargeLevel * 2;  // 威力倍増
            const bullet = new Bullet(this.x, this.y - 20, 0, -20, power, 'player', 'charged');

            // サイズ調整（チャージ量に応じて大きくなる）
            bullet.width = 8 + chargeLevel * 4;
            bullet.height = 16 + chargeLevel * 4;
            bullet.color = chargeLevel >= 3 ? '#00ffff' : '#0099ff';  // 高レベルで色変更

            this.game.bullets.push(bullet);
        }

        // エフェクト
        if (typeof playSFX === 'function') {
            playSFX('charged_beam');
        }

        // 画面振動
        if (this.game.createExplosion) {
            // 発射位置にエフェクト
            this.game.createExplosion(this.x, this.y - 30, 'small');
        }
    }

    takeDamage(amount = 1) {
        if (this.invincible > 0 || this.shield) {
            if (this.shield) {
                this.shield = false;
                if (typeof playSFX === 'function') {
                    playSFX('shield_hit');
                }
            }
            return;
        }

        // HPを減らす（1ダメージ = HP20減少）
        this.hp -= amount * 20;

        // HPが0以下になったらライフを減らしてHP回復
        if (this.hp <= 0) {
            this.life -= 1;
            this.hp = this.maxHp;  // HPを最大に回復
        }

        this.invincible = this.invincibleDuration;

        if (typeof playSFX === 'function') {
            playSFX('player_damage');
        }

        // 画面振動エフェクト
        if (typeof shakeScreen === 'function') {
            shakeScreen(5);
        }

        if (this.life <= 0) {
            this.onDestroy();
        }
    }

    onDestroy() {
        this.game.lives--;

        if (this.game.lives <= 0) {
            this.game.gameOver();
        } else {
            // リスポーン
            this.respawn();
        }

        // 爆発エフェクト
        this.game.createExplosion(this.x, this.y, 'medium');
    }

    respawn() {
        if (this.game && this.game.canvas) {
            this.x = this.game.canvas.width / 2;
            this.y = this.game.canvas.height - 100;
        }
        this.hp = this.maxHp;  // HPを最大に回復
        this.invincible = 120; // 2秒間の無敵時間
        this.weapon.level = Math.max(1, this.weapon.level - 1); // 武器レベル低下
    }

    powerUp(type) {
        switch (type) {
            case 'weapon':
                this.weapon.level = Math.min(5, this.weapon.level + 1);
                break;
            case 'weapon_spread':
                this.weapon.type = 'spread';
                this.weapon.level = Math.max(1, this.weapon.level);  // 武器切り替え時はレベル維持
                break;
            case 'weapon_laser':
                this.weapon.type = 'laser';
                this.weapon.level = Math.max(1, this.weapon.level);
                break;
            case 'weapon_homing':
                this.weapon.type = 'homing';
                this.weapon.level = Math.max(1, this.weapon.level);
                break;
            case 'weapon_wave':
                this.weapon.type = 'wave';
                this.weapon.level = Math.max(1, this.weapon.level);
                break;
            case 'life':
                this.life = Math.min(this.maxLife, this.life + 1);
                this.game.lives = Math.min(5, this.game.lives + 1);
                break;
            case 'bomb':
                this.game.bombs = Math.min(3, this.game.bombs + 1);
                break;
            case 'shield':
                this.shield = true;
                break;
            case 'speed':
                this.speedBoost = true;
                setTimeout(() => { this.speedBoost = false; }, 10000);
                break;
            case 'power':
                this.powerBoost = true;
                setTimeout(() => { this.powerBoost = false; }, 10000);
                break;
            case 'option':
                if (this.game && this.game.specialWeapon) {
                    this.game.specialWeapon.addOption();
                }
                break;
            case 'summon_phoenix':
                if (this.game && this.game.specialWeapon) {
                    this.game.specialWeapon.summonCreature('phoenix');
                }
                break;
            case 'summon_dragon':
                if (this.game && this.game.specialWeapon) {
                    this.game.specialWeapon.summonCreature('dragon');
                }
                break;
            case 'summon_thunder':
                if (this.game && this.game.specialWeapon) {
                    this.game.specialWeapon.summonCreature('thunder');
                }
                break;
            case 'mega_laser':
                if (this.game && this.game.specialWeapon) {
                    this.game.specialWeapon.activateMegaLaser();
                }
                break;
            case 'combine':
                if (this.game && this.game.specialWeapon) {
                    this.game.specialWeapon.activateCombinedMode();
                }
                break;
        }

        if (typeof playSFX === 'function') {
            playSFX('powerup');
        }
    }

    useBomb() {
        if (this.game.bombs <= 0) return;

        this.game.bombs--;

        // 画面内のすべての敵弾を削除
        this.game.bullets = this.game.bullets.filter(b => b.owner === 'player');

        // すべての敵にダメージ
        this.game.enemies.forEach(enemy => {
            enemy.takeDamage(100);
        });

        // ボスにもダメージ
        if (this.game.boss) {
            this.game.boss.takeDamage(50);
        }

        // 画面全体のフラッシュエフェクト
        if (typeof createScreenFlash === 'function') {
            createScreenFlash();
        }

        if (typeof playSFX === 'function') {
            playSFX('bomb');
        }
    }

    render(ctx) {
        ctx.save();

        // チャージエフェクト表示
        if (this.weapon.charging && this.weapon.chargeTime > 10) {
            const chargeRatio = this.weapon.chargeTime / this.weapon.maxCharge;
            const radius = 20 + chargeRatio * 30;

            ctx.globalAlpha = 0.3 + chargeRatio * 0.4;
            ctx.strokeStyle = chargeRatio > 0.5 ? '#00ffff' : '#0099ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.stroke();

            // 内側の円
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius * 0.7, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = 1;
        }

        // 無敵時は点滅
        if (this.invincible > 0 && this.invincible % 10 < 5) {
            ctx.globalAlpha = 0.5;
        }

        // 画像が読み込まれていれば画像を描画
        if (this.imageLoaded && this.sprite) {
            ctx.drawImage(
                this.sprite,
                this.x - this.width,
                this.y - this.height,
                this.width * 2,
                this.height * 2
            );
        } else {
            // 画像がない場合は従来の描画
            ctx.fillStyle = this.color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.height / 2);
            ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
            ctx.lineTo(this.x, this.y + this.height / 3);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
        }

        // エンジングロー
        const glowIntensity = 0.5 + Math.sin(this.engineGlow) * 0.5;
        ctx.fillStyle = `rgba(255, 100, 0, ${glowIntensity})`;

        ctx.beginPath();
        ctx.ellipse(
            this.x - 8,
            this.y + this.height / 2,
            4,
            6,
            0, 0, Math.PI * 2
        );
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(
            this.x + 8,
            this.y + this.height / 2,
            4,
            6,
            0, 0, Math.PI * 2
        );
        ctx.fill();

        // シールド表示
        if (this.shield) {
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }

    // 入力処理用のメソッド
    setInput(direction, value) {
        this.input[direction] = value;
    }

    setInputFromJoystick(x, y) {
        // ジョイスティック入力を方向に変換
        const deadZone = 0.2;

        this.input.left = x < -deadZone;
        this.input.right = x > deadZone;
        this.input.up = y < -deadZone;
        this.input.down = y > deadZone;
    }

    setInputFromGyro(x, y) {
        // ジャイロ入力を直接速度に変換（より自然な操作）
        this.vx = x * this.maxSpeed;
        this.vy = y * this.maxSpeed;
    }

    getHitbox() {
        // 当たり判定用の矩形を返す（実際のサイズよりかなり小さく）
        return {
            x: this.x - this.width / 4,  // より小さい当たり判定
            y: this.y - this.height / 4,
            width: this.width * 0.5,  // 50%のサイズに
            height: this.height * 0.5
        };
    }
}