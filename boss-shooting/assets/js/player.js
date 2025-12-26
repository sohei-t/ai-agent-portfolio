// Player class - Space Odyssey
class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;

        // サイズ（視認性向上のため拡大）
        this.width = 10;  // 6→10（視認しやすいサイズ）
        this.height = 14;  // 8→14（視認しやすいサイズ）

        // 移動関連
        this.speed = 2.8;  // 3.5→2.8（少し落とす）
        this.vx = 0;
        this.vy = 0;
        this.maxSpeed = 4;  // 5→4（最大速度も少し落とす）

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

        // 新武器システム（デフォルト＋3種類の追加武器）
        this.weapons = {
            default: {
                type: 'beam',
                level: 1,
                maxLevel: 10,  // 最大レベル10
                color: '#00ffff',  // 水色（シアン）
                equipped: true,     // デフォルトは最初から装備
                lastFire: 0  // 最終発射時刻
            },
            green: {
                type: 'spread',
                level: 0,
                maxLevel: 10,  // 最大レベル10
                color: '#00ff00',  // 緑
                equipped: false,
                lastFire: 0
            },
            purple: {
                type: 'missile',  // ミサイル系に変更
                level: 0,
                maxLevel: 10,  // 最大レベル10
                color: '#ff00ff',  // 紫
                equipped: false,
                lastFire: 0
            },
            yellow: {
                type: 'sonic',  // ソニック系に変更
                level: 0,
                maxLevel: 10,  // 最大レベル10
                color: '#ffff00',  // 黄色
                equipped: false,
                lastFire: 0
            }
        };

        // HP関連（新規追加）
        this.hp = 100;
        this.maxHp = 100;

        this.life = 3;
        this.maxLife = 5;
        this.invincible = 0; // 無敵時間（フレーム）
        this.invincibleDuration = 300; // 5秒間（60fps × 5）

        // 爆弾システム
        this.bombLevel = 1;  // 爆弾レベル（初期値1）
        this.maxBombLevel = 5;  // 最大レベル

        // 特殊能力
        this.shield = false;
        this.speedBoost = false;
        this.powerBoost = false;

        // オプション機体システム
        this.options = [];
        this.maxOptions = 4;

        // 入力
        this.input = {
            left: false,
            right: false,
            up: false,
            down: false,
            fire: false
        };

        // 武器レベル管理（MAXアイテム除外用）
        this.weaponLevels = {
            default: 1,  // 青色武器（初期レベル1）
            green: 0,    // 緑色武器
            purple: 0,   // 紫色武器
            yellow: 0    // 黄色武器
        };

        // 武器インジケーターの初期化
        setTimeout(() => this.updateWeaponIndicators(), 0);

        // 自動連射
        this.autoFire = true;

        // ビジュアル（赤色に変更して視認性向上）
        this.color = '#ff0000';  // 赤色の機体
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
        this.sprite.src = `assets/images/player_ship_v2.svg`;
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

        // 分身の更新（ALL MAX時のみ）
        if (this.clones && this.clones.length > 0) {
            for (const clone of this.clones) {
                clone.update(this, dt);
            }
        }

        // エンジングロー演出
        this.engineGlow = (this.engineGlow + 0.1) % (Math.PI * 2);

        // オプション機体位置更新
        this.updateOptions();
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
        const bottomMargin = 30;  // 画面下部の追加マージン（UIや見やすさのため）

        if (this.game && this.game.canvas) {
            // 左右の制限
            this.x = Math.max(this.width / 2 + margin,
                    Math.min(this.game.canvas.width - this.width / 2 - margin, this.x));

            // 上下の制限（特に下端を厳密に制限、上部も強化）
            const topLimit = this.height / 2 + margin;
            const bottomLimit = this.game.canvas.height - this.height / 2 - bottomMargin;

            this.y = Math.max(topLimit, Math.min(bottomLimit, this.y));

            // 速度もリセット（境界に達したら）
            if (this.y >= bottomLimit || this.y <= topLimit) {
                this.vy = 0;
            }
            if (this.x <= this.width / 2 + margin || this.x >= this.game.canvas.width - this.width / 2 - margin) {
                this.vx = 0;
            }
        }
    }

    fire() {
        const now = Date.now();

        // 超強力武器が解放されている場合は優先的に発射
        if (this.ultimateWeaponUnlocked) {
            this.fireUltimateWeapon();
            return;
        }

        // 装備中の全武器から発射（新システム）
        if (typeof WeaponSystems !== 'undefined') {
            // 各武器を個別の発射間隔で管理

            // 青武器（デフォルト）
            if (this.weapons.default.equipped && this.weapons.default.level > 0) {
                const interval = WeaponSystems.getFireInterval('default', this.weapons.default.level);
                if (now - this.weapons.default.lastFire >= interval) {
                    WeaponSystems.fireBeamEnhanced(this, this.weapons.default);
                    this.weapons.default.lastFire = now;
                }
            }

            // 緑武器（スプレッド）
            if (this.weapons.green.equipped && this.weapons.green.level > 0) {
                const interval = WeaponSystems.getFireInterval('green', this.weapons.green.level);
                if (now - this.weapons.green.lastFire >= interval) {
                    WeaponSystems.fireSpreadEnhanced(this, this.weapons.green);
                    this.weapons.green.lastFire = now;
                }
            }

            // 紫武器（ミサイル）
            if (this.weapons.purple.equipped && this.weapons.purple.level > 0) {
                const interval = WeaponSystems.getFireInterval('purple', this.weapons.purple.level);
                if (now - this.weapons.purple.lastFire >= interval) {
                    WeaponSystems.fireLaserEnhanced(this, this.weapons.purple);
                    this.weapons.purple.lastFire = now;
                }
            }

            // 黄武器（ソニック）
            if (this.weapons.yellow.equipped && this.weapons.yellow.level > 0) {
                const interval = WeaponSystems.getFireInterval('yellow', this.weapons.yellow.level);
                if (now - this.weapons.yellow.lastFire >= interval) {
                    WeaponSystems.fireWaveEnhanced(this, this.weapons.yellow);
                    this.weapons.yellow.lastFire = now;
                }
            }
        } else {
            // フォールバック（従来のメソッドを使用）
            if (this.weapons.default.equipped && this.weapons.default.level > 0) {
                this.fireBeam(this.weapons.default);
            }
            if (this.weapons.green.equipped && this.weapons.green.level > 0) {
                this.fireSpreadNew(this.weapons.green);
            }
            if (this.weapons.purple.equipped && this.weapons.purple.level > 0) {
                this.fireLaserNew(this.weapons.purple);
            }
            if (this.weapons.yellow.equipped && this.weapons.yellow.level > 0) {
                this.fireWaveNew(this.weapons.yellow);
            }
        }

        // オプション機体からも発射（デフォルト武器のみ）
        this.fireFromOptions();

        // 効果音
        if (typeof playSFX === 'function') {
            playSFX('shoot');
        }
    }

    fireBeam(weaponData = null) {
        const weapon = weaponData || this.weapons.default;
        const level = weapon.level;

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

    fireSpreadNew(weapon) {
        const level = weapon.level;
        const bullets = 2 + level;  // レベルに応じた弾数（3〜7発）
        const baseAngle = -Math.PI / 2;
        const spreadAngle = Math.PI / 6;  // 30度の扇

        for (let i = 0; i < bullets; i++) {
            const angle = baseAngle - spreadAngle / 2 + (spreadAngle / (bullets - 1)) * i;
            const bullet = this.createBullet(
                this.x,
                this.y - 10,
                Math.cos(angle) * 8,
                Math.sin(angle) * 8,
                'spread'
            );
            if (bullet) {
                bullet.power = level;  // レベル＝威力
                bullet.color = weapon.color;
            }
        }
    }

    fireLaserNew(weapon) {
        const level = weapon.level;
        const width = 4 + level * 2;  // レベルに応じた太さ

        const bullet = this.createBullet(this.x, this.y - 20, 0, -20, 'laser', width);
        if (bullet) {
            bullet.power = level;  // レベル＝威力
            bullet.color = weapon.color;
            bullet.penetrating = true;  // 貫通
            bullet.pierceCount = level * 2;  // レベルに応じた貫通数
        }
    }

    fireWaveNew(weapon) {
        const level = weapon.level;

        // 黄色武器：レベルごとの詳細な実装
        switch(level) {
            case 1:
            case 2:
                // L1-L2: 単発ミサイル（ダメージ1）
                const missile = this.createBullet(this.x, this.y - 15, 0, -6, 'missile');
                if (missile) {
                    missile.power = 1;
                    missile.color = weapon.color;
                    missile.size = 4;
                }
                break;

            case 3:
                // L3: ダブルミサイル（ダメージ各1）
                for (let i = -1; i <= 1; i += 2) {
                    const missile = this.createBullet(this.x + i * 12, this.y - 15, 0, -6, 'missile');
                    if (missile) {
                        missile.power = 1;
                        missile.color = weapon.color;
                        missile.size = 4;
                    }
                }
                break;

            case 4:
                // L4: 貫通レーザービーム（ダメージ3）
                const laser = this.createBullet(this.x, this.y - 15, 0, -12, 'laser');
                if (laser) {
                    laser.power = 3;
                    laser.color = weapon.color;
                    laser.penetrating = true;
                    laser.width = 6;
                    laser.height = 30;
                }
                break;

            case 5:
                // L5: ダブル貫通レーザー（ダメージ各3）
                for (let i = -1; i <= 1; i += 2) {
                    const laser = this.createBullet(this.x + i * 15, this.y - 15, 0, -12, 'laser');
                    if (laser) {
                        laser.power = 3;
                        laser.color = weapon.color;
                        laser.penetrating = true;
                        laser.width = 6;
                        laser.height = 30;
                    }
                }
                break;

            case 6:
                // L6: 太さ3倍の単発レーザー（ダメージ5）
                const bigLaser = this.createBullet(this.x, this.y - 15, 0, -10, 'laser');
                if (bigLaser) {
                    bigLaser.power = 5;
                    bigLaser.color = weapon.color;
                    bigLaser.penetrating = true;
                    bigLaser.width = 18;  // 3倍の太さ
                    bigLaser.height = 40;
                }
                break;

            case 7:
                // L7: 単発超音波ビーム（広がる、範囲ダメージ1）
                const sonic = this.createBullet(this.x, this.y - 15, 0, -5, 'sonic');
                if (sonic) {
                    sonic.power = 1;
                    sonic.color = weapon.color;
                    sonic.expanding = true;
                    sonic.expansionRate = 0.5;
                    sonic.maxWidth = 100;
                    sonic.width = 10;
                }
                break;

            case 8:
                // L8: ダブル超音波ビーム（広がる、範囲ダメージ1）
                for (let i = -1; i <= 1; i += 2) {
                    const sonic = this.createBullet(this.x + i * 20, this.y - 15, 0, -5, 'sonic');
                    if (sonic) {
                        sonic.power = 1;
                        sonic.color = weapon.color;
                        sonic.expanding = true;
                        sonic.expansionRate = 0.5;
                        sonic.maxWidth = 100;
                        sonic.width = 10;
                    }
                }
                break;

            case 9:
                // L9: 3発貫通レーザー（ダメージ各6）
                for (let i = -1; i <= 1; i++) {
                    const laser = this.createBullet(this.x + i * 20, this.y - 15, i * 2, -12, 'laser');
                    if (laser) {
                        laser.power = 6;
                        laser.color = weapon.color;
                        laser.penetrating = true;
                        laser.width = 8;
                        laser.height = 35;
                    }
                }
                break;

            case 10:
                // L10: 継続レーザービーム（ダメージ5/秒）
                if (!this.continuousLaser || !this.continuousLaser.yellow) {
                    this.continuousLaser = this.continuousLaser || {};
                    this.continuousLaser.yellow = {
                        active: true,
                        x: this.x,
                        y: this.y,
                        width: 20,
                        power: 5,
                        color: weapon.color
                    };
                }
                // 継続レーザーは別途update/renderで処理
                break;
        }
    }

    fireFromOptions() {
        // オプション機体から発射
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            if (option && option.x && option.y) {
                // デフォルト武器のみ発射
                const level = this.weapons.default.level;
                this.createBullet(option.x, option.y - 10, 0, -10, 'beam', null, level);
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
            bullet.game = this.game;  // gameプロパティを設定（爆発処理に必要）
            this.game.bullets.push(bullet);
            return bullet;  // 弾を返すように変更（ホーミング用）
        }
        return null;
    }

    fireChargedBeam() {
        // チャージ量に応じた威力とサイズ
        const chargeRatio = this.weapon.chargeTime / this.weapon.maxCharge;
        const chargeLevel = Math.floor(chargeRatio * 5) + 1;  // レベル1-5

        // 巨大貫通レーザー発射
        if (typeof Bullet !== 'undefined') {
            // MAXチャージ時は威力5倍、それ以外は通常
            const basePower = this.powerBoost ? 2 : 1;
            const isMaxCharge = chargeLevel >= 5;
            const power = basePower * this.weapon.level * (isMaxCharge ? 5 : chargeLevel);  // MAXチャージ時5倍

            const bullet = new Bullet(this.x, this.y - 20, 0, -25, power, 'player', 'charged_laser');

            // MAXチャージ時のみ貫通属性
            if (isMaxCharge) {
                bullet.penetrating = true;  // 貫通レーザー属性
                bullet.pierceCount = 999;   // 無限貫通
                bullet.isChargedLaser = true;  // 敵弾も貫通する特別フラグ
            }

            // サイズ調整（チャージ量に応じて太くなる）
            bullet.width = 12 + chargeLevel * 6;   // より太く
            bullet.height = 30 + chargeLevel * 10; // より長く

            // 水色系統のグラデーション
            if (isMaxCharge) {
                bullet.color = '#00ffff';  // 最大チャージ: 明るい水色
                bullet.glowColor = '#00ffff';
                bullet.glowRadius = 30;
            } else if (chargeLevel >= 3) {
                bullet.color = '#00ccff';  // 中チャージ: 水色
                bullet.glowColor = '#00ccff';
                bullet.glowRadius = 20;
            } else {
                bullet.color = '#0099ff';  // 低チャージ: 青
                bullet.glowColor = '#0099ff';
                bullet.glowRadius = 10;
            }

            // 特殊効果フラグ（MAXチャージ時以外は通常レーザーの扱い）
            bullet.chargeLevel = chargeLevel;

            this.game.bullets.push(bullet);
        }

        // エフェクト
        if (typeof playSFX === 'function') {
            playSFX('charged_beam');
        }

        // 画面振動（チャージレベルに応じて強く）
        if (this.game.createExplosion) {
            // 発射位置に強力なエフェクト
            for (let i = 0; i < chargeLevel; i++) {
                setTimeout(() => {
                    this.game.createExplosion(this.x, this.y - 30 - i * 10, 'small');
                }, i * 50);
            }
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

        // 被弾時の爆発音を再生
        if (typeof playSFX === 'function') {
            playSFX('hit');  // 被弾音
        }

        // 被弾エフェクト
        if (this.game && this.game.createExplosion) {
            this.game.createExplosion(this.x, this.y, 'hit');
        }

        // HPが0以下になったらライフを減らしてHP回復
        if (this.hp <= 0) {
            this.life -= 1;
            this.hp = this.maxHp;  // HPを最大に回復

            // 機体破壊時の大きな表示
            if (this.game && this.game.uiTexts) {
                this.game.uiTexts.push({
                    text: `機体破壊！残機: ${this.life}`,
                    x: this.game.canvas.width / 2,
                    y: this.game.canvas.height / 2 - 50,
                    vy: 0,
                    alpha: 1.0,
                    lifeTime: 120,  // 2秒表示
                    color: '#ff0000',
                    fontSize: 48,
                    style: 'bold',
                    shadow: true,
                    textAlign: 'center'
                });

                // 爆発エフェクト
                if (this.game.createExplosion) {
                    this.game.createExplosion(this.x, this.y, 'large');
                }

                // 破壊音
                if (typeof playSFX === 'function') {
                    playSFX('player_destroy');
                }
            }
        }

        this.invincible = this.invincibleDuration;

        // 被弾時に最も高レベルの武器を1レベル下げる
        let highestWeapon = null;
        let highestLevel = 0;

        // 装備中の武器から最も高レベルのものを探す
        for (const [key, weapon] of Object.entries(this.weapons)) {
            if (weapon.equipped && weapon.level > highestLevel) {
                highestWeapon = key;
                highestLevel = weapon.level;
            }
        }

        // 最高レベルの武器を1レベル下げる
        if (highestWeapon && highestLevel > 1) {
            this.weapons[highestWeapon].level--;
            console.log(`被弾！${highestWeapon}武器がレベル${highestLevel}→${highestLevel-1}に低下`);
            this.updateWeaponIndicators();
        }

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
        this.invincible = this.invincibleDuration; // 5秒間の無敵時間（300フレーム）
        this.weapon.level = Math.max(1, this.weapon.level - 1); // 武器レベル低下
    }

    powerUp(type) {
        switch (type) {
            // 武器レベルアップ（統合版）
            case 'weapon_level':
                // 現在のweapon.levelを上げる
                this.weapon.level = Math.min(10, this.weapon.level + 1);
                this.triggerWeaponLevelUpEffect('default');
                this.updateWeaponIndicators();
                break;

            // デフォルト武器レベルアップ（後方互換性のため残す）
            case 'weapon_default':
                const oldDefaultLevel = this.weapons.default.level;
                this.weapons.default.level = Math.min(10, this.weapons.default.level + 1);
                this.weaponLevels.default = this.weapons.default.level;  // weaponLevelsも更新

                if (this.weapons.default.level > oldDefaultLevel) {
                    this.triggerWeaponLevelUpEffect('default');
                    this.updateWeaponIndicators();
                    this.checkUltimateWeapon();
                }
                break;

            // 緑武器（spread）レベルアップ
            case 'weapon_green':
                if (!this.weapons.green.equipped) {
                    this.weapons.green.equipped = true;
                    this.weapons.green.level = 1;
                    this.weaponLevels.green = 1;  // weaponLevelsも更新
                    this.triggerWeaponLevelUpEffect('green');
                    this.updateWeaponIndicators();
                } else {
                    const oldLevel = this.weapons.green.level;
                    this.weapons.green.level = Math.min(10, this.weapons.green.level + 1);
                    this.weaponLevels.green = this.weapons.green.level;  // weaponLevelsも更新
                    if (this.weapons.green.level > oldLevel) {
                        this.triggerWeaponLevelUpEffect('green');
                        this.updateWeaponIndicators();
                        this.checkUltimateWeapon();
                    }
                }
                break;

            // 紫武器（laser）レベルアップ
            case 'weapon_purple':
                if (!this.weapons.purple.equipped) {
                    this.weapons.purple.equipped = true;
                    this.weapons.purple.level = 1;
                    this.weaponLevels.purple = 1;  // weaponLevelsも更新
                    this.triggerWeaponLevelUpEffect('purple');
                    this.updateWeaponIndicators();
                } else {
                    const oldLevel = this.weapons.purple.level;
                    this.weapons.purple.level = Math.min(10, this.weapons.purple.level + 1);
                    this.weaponLevels.purple = this.weapons.purple.level;  // weaponLevelsも更新
                    if (this.weapons.purple.level > oldLevel) {
                        this.triggerWeaponLevelUpEffect('purple');
                        this.updateWeaponIndicators();
                        this.checkUltimateWeapon();
                    }
                }
                break;

            // 黄色武器（wave）レベルアップ
            case 'weapon_yellow':
                if (!this.weapons.yellow.equipped) {
                    this.weapons.yellow.equipped = true;
                    this.weapons.yellow.level = 1;
                    this.weaponLevels.yellow = 1;  // weaponLevelsも更新
                    this.triggerWeaponLevelUpEffect('yellow');
                    this.updateWeaponIndicators();
                } else {
                    const oldLevel = this.weapons.yellow.level;
                    this.weapons.yellow.level = Math.min(10, this.weapons.yellow.level + 1);
                    this.weaponLevels.yellow = this.weapons.yellow.level;  // weaponLevelsも更新
                    if (this.weapons.yellow.level > oldLevel) {
                        this.triggerWeaponLevelUpEffect('yellow');
                        this.updateWeaponIndicators();
                        this.checkUltimateWeapon();
                    }
                }
                break;

            // 残機増加（MAX5）
            case 'heart':
            case 'life':
            case 'item-life':
                if (this.game && this.game.lives < 5) {
                    this.game.lives++;
                    // 残機増加エフェクト
                    if (this.game.createExplosion) {
                        this.game.createExplosion(this.x, this.y, 'heal');
                    }
                    console.log('残機増加！現在の残機:', this.game.lives);
                }
                break;

            // 爆弾レベルアップ
            case 'bomb':
            case 'item-bomb':
                // 爆弾レベルを上げる（最大レベル5）
                if (this.bombLevel < 5) {
                    this.bombLevel++;
                    console.log('爆弾レベルアップ！レベル:', this.bombLevel);
                }
                // 爆弾も1個追加
                if (this.game) {
                    this.game.bombs = Math.min(this.game.bombs + 1, 10);
                }
                if (this.game && this.game.createExplosion) {
                    this.game.createExplosion(this.x, this.y, 'powerup');
                }
                break;

            // シールド追加
            case 'shield':
                this.shield = Math.min(this.shield + 1, 3); // 最大3枚のシールド
                console.log('シールド獲得！現在のシールド:', this.shield);
                if (this.game && this.game.createExplosion) {
                    this.game.createExplosion(this.x, this.y, 'shield');
                }
                break;

            // スピードアップ
            case 'speed':
                this.speed = Math.min(this.speed + 1, 10); // 最大速度10
                console.log('スピードアップ！現在の速度:', this.speed);
                if (this.game && this.game.createExplosion) {
                    this.game.createExplosion(this.x, this.y, 'powerup');
                }
                break;

            // オプション機体追加
            case 'option':
                if (this.options.length < this.maxOptions) {
                    this.addOption();
                }
                break;
            case 'summon_phoenix':
                if (typeof specialWeapon !== 'undefined' && specialWeapon) {
                    specialWeapon.summonCreature('phoenix');
                }
                break;
            case 'summon_dragon':
                if (typeof specialWeapon !== 'undefined' && specialWeapon) {
                    specialWeapon.summonCreature('dragon');
                }
                break;
            case 'summon_thunder':
                if (typeof specialWeapon !== 'undefined' && specialWeapon) {
                    specialWeapon.summonCreature('thunder');
                }
                break;
            case 'mega_laser':
                if (typeof specialWeapon !== 'undefined' && specialWeapon) {
                    specialWeapon.activateMegaLaser();
                }
                break;
            case 'combine':
                if (typeof specialWeapon !== 'undefined' && specialWeapon) {
                    specialWeapon.activateCombinedMode();
                }
                break;
            case 'score':
                // スコア2倍ボーナス（10秒間）
                if (this.game) {
                    this.game.scoreMultiplier = 2;
                    const gameRef = this.game;
                    setTimeout(function() {
                        if (gameRef) {
                            gameRef.scoreMultiplier = 1;
                        }
                    }, 10000);
                }
                break;
            // 存在しないタイプは青色武器として扱う（エラー回避）
            default:
                console.log('フォールバック処理: タイプ', type, '→ 青武器レベルアップ');
                // weapon_defaultと同じ処理を実行（フォールバック）
                const fallbackLevel = this.weapons.default.level;
                this.weapons.default.level = Math.min(10, this.weapons.default.level + 1);
                this.weaponLevels.default = this.weapons.default.level;
                if (this.weapons.default.level > fallbackLevel) {
                    this.triggerWeaponLevelUpEffect('default');
                    this.updateWeaponIndicators();
                    this.checkUltimateWeapon();
                } else {
                    console.log('青武器レベルアップ失敗: 既にMAX');
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

        // 爆弾レベルに応じたダメージと効果
        const bombLevel = this.bombLevel || 1;
        const baseDamage = 100;
        const damage = baseDamage * bombLevel;  // レベル1で100、レベル5で500ダメージ

        // 画面内のすべての敵弾を削除
        this.game.bullets = this.game.bullets.filter(b => b.owner === 'player');

        // すべての敵にダメージ（レベルに応じて増加）
        this.game.enemies.forEach(enemy => {
            enemy.takeDamage(damage);
        });

        // ボスにもダメージ（レベルに応じて増加）
        if (this.game.boss) {
            this.game.boss.takeDamage(damage * 2);  // ボスには2倍ダメージ
        }

        console.log(`爆弾発動！レベル${bombLevel} ダメージ:${damage}`);

        // 画面全体のフラッシュエフェクト
        this.createBombEffect();

        // 画面全体に稲妻エフェクト
        this.createLightningEffect();

        if (typeof playSFX === 'function') {
            playSFX('bomb');
        }
    }

    checkUltimateWeapon() {
        // 全武器がMAX(レベル10)かチェック
        const allMaxLevel =
            this.weapons.default.level >= 10 &&
            this.weapons.green.equipped && this.weapons.green.level >= 10 &&
            this.weapons.purple.equipped && this.weapons.purple.level >= 10 &&
            this.weapons.yellow.equipped && this.weapons.yellow.level >= 10;

        if (allMaxLevel && !this.ultimateWeaponUnlocked) {
            this.ultimateWeaponUnlocked = true;
            console.log('🔥🔥🔥 ULTIMATE WEAPON UNLOCKED! 🔥🔥🔥');

            // 分身を3体生成
            this.createClones();

            // 画面全体にエフェクト
            this.createUltimateUnlockEffect();
        }
    }

    createClones() {
        // 分身を3体生成（ALL MAX時のみ）
        if (!this.clones) {
            this.clones = [];

            for (let i = 0; i < 3; i++) {
                const clone = {
                    offsetAngle: (Math.PI * 2 / 3) * i,  // 120度ずつ配置
                    distance: 60,  // 自機からの距離
                    x: 0,
                    y: 0,
                    width: this.width * 0.8,  // 本体より少し小さめ
                    height: this.height * 0.8,
                    opacity: 0.7,  // 半透明
                    lastFire: 0,
                    fireInterval: 200,  // 200ms間隔で発射
                    trail: [],  // 残像エフェクト用
                    maxTrailLength: 8,  // 残像の数

                    update(player, dt) {
                        // 自機の周りを高速旋回
                        this.offsetAngle += 0.15;  // 回転速度を大幅に上げる（0.02→0.15）
                        this.x = player.x + Math.cos(this.offsetAngle) * this.distance;
                        this.y = player.y + Math.sin(this.offsetAngle) * this.distance;

                        // 残像を記録
                        this.trail.unshift({ x: this.x, y: this.y, opacity: this.opacity });
                        if (this.trail.length > this.maxTrailLength) {
                            this.trail.pop();
                        }

                        // 定期的に弾を発射
                        const now = Date.now();
                        if (now - this.lastFire >= this.fireInterval && player.game) {
                            this.fire(player);
                            this.lastFire = now;
                        }
                    },

                    fire(player) {
                        // 分身も同じ武器を発射
                        if (player.game && player.game.bullets) {
                            const bullet = {
                                x: this.x,
                                y: this.y - 10,
                                vx: 0,
                                vy: -15,
                                width: 8,
                                height: 12,
                                power: 5,  // 分身の弾は威力控えめ
                                damage: 5,
                                owner: 'player',
                                type: 'clone',
                                color: '#00ffff',

                                update(dt) {
                                    this.x += this.vx;
                                    this.y += this.vy;
                                },

                                render(ctx) {
                                    ctx.save();
                                    ctx.fillStyle = this.color;
                                    ctx.shadowBlur = 10;
                                    ctx.shadowColor = this.color;
                                    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
                                    ctx.restore();
                                },

                                getHitbox() {
                                    return {
                                        x: this.x - this.width / 2,
                                        y: this.y - this.height / 2,
                                        width: this.width,
                                        height: this.height
                                    };
                                }
                            };

                            player.game.bullets.push(bullet);
                        }
                    },

                    render(ctx, player) {
                        ctx.save();

                        // 残像を描画（バリア感を演出）
                        for (let i = this.trail.length - 1; i >= 0; i--) {
                            const point = this.trail[i];
                            const alpha = (this.maxTrailLength - i) / this.maxTrailLength * 0.3;

                            ctx.globalAlpha = alpha;
                            ctx.fillStyle = '#00ffff';
                            ctx.shadowBlur = 30;
                            ctx.shadowColor = '#00ffff';

                            // 円形のバリアエフェクト
                            ctx.beginPath();
                            ctx.arc(point.x, point.y, this.width * 1.5, 0, Math.PI * 2);
                            ctx.fill();

                            // 残像の機体
                            ctx.fillStyle = '#00aaff';
                            ctx.beginPath();
                            ctx.moveTo(point.x, point.y - this.height / 2);
                            ctx.lineTo(point.x - this.width / 2, point.y + this.height / 2);
                            ctx.lineTo(point.x, point.y + this.height / 3);
                            ctx.lineTo(point.x + this.width / 2, point.y + this.height / 2);
                            ctx.closePath();
                            ctx.fill();
                        }

                        // 分身本体
                        ctx.globalAlpha = this.opacity;

                        // 分身の発光エフェクト（強化）
                        ctx.shadowBlur = 40;
                        ctx.shadowColor = '#00ffff';
                        ctx.fillStyle = '#00ffff';
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, this.width * 1.2, 0, Math.PI * 2);
                        ctx.fill();

                        // 分身本体（小さめの自機）
                        ctx.fillStyle = '#00aaff';
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

                        ctx.restore();
                    },

                    // 分身のヒットボックス（シールド機能用）
                    getHitbox() {
                        return {
                            x: this.x - this.width / 2,
                            y: this.y - this.height / 2,
                            width: this.width,
                            height: this.height
                        };
                    }
                };

                this.clones.push(clone);
            }
        }
    }

    createUltimateUnlockEffect() {
        // 超強力武器解放時のエフェクト
        const canvas = this.game.canvas;
        const ctx = this.game.ctx;

        // 虹色のフラッシュ
        let flashCount = 0;
        const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0099ff', '#ff00ff'];

        const flashInterval = setInterval(() => {
            if (flashCount >= 6) {
                clearInterval(flashInterval);
                return;
            }

            ctx.save();
            ctx.fillStyle = colors[flashCount % colors.length];
            ctx.globalAlpha = 0.5;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            flashCount++;
        }, 100);
    }

    fireUltimateWeapon() {
        // 超強力ミサイル（1秒間隔で発射）
        if (!this.ultimateWeaponUnlocked) return;

        const now = Date.now();
        if (!this.lastUltimateFire) this.lastUltimateFire = 0;
        if (now - this.lastUltimateFire < 1000) return; // 1秒間隔
        this.lastUltimateFire = now;

        // 超強力ホーミングミサイル
        const bullet = {
            x: this.x,
            y: this.y - 30,
            vx: 0,
            vy: -8,  // 初速は遅め（ホーミング性能重視）
            width: 30,  // ミサイルサイズ
            height: 40,
            power: 100,  // 超高威力（通常の10倍）
            damage: 100,
            owner: 'player',
            type: 'ultimate_missile',
            color: '#ff00ff',
            penetrating: true,  // 貫通
            homing: true,  // ホーミング機能
            target: null,  // ターゲット
            maxSpeed: 15,  // 最高速度
            turnSpeed: 0.15,  // 旋回性能

            update(dt) {
                // ホーミング機能
                if (this.homing && this.game) {
                    // 最も近い敵を探す
                    let closestEnemy = null;
                    let minDistance = Infinity;

                    // 通常敵をチェック
                    if (this.game.enemies) {
                        for (const enemy of this.game.enemies) {
                            const dx = enemy.x - this.x;
                            const dy = enemy.y - this.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestEnemy = enemy;
                            }
                        }
                    }

                    // ボスもチェック
                    if (this.game.boss) {
                        const dx = this.game.boss.x - this.x;
                        const dy = this.game.boss.y - this.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < minDistance) {
                            closestEnemy = this.game.boss;
                        }
                    }

                    // ターゲットに向かって旋回
                    if (closestEnemy) {
                        const dx = closestEnemy.x - this.x;
                        const dy = closestEnemy.y - this.y;
                        const angle = Math.atan2(dy, dx);
                        const currentAngle = Math.atan2(this.vy, this.vx);

                        // 角度差を計算して旋回
                        let angleDiff = angle - currentAngle;
                        if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                        if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

                        const newAngle = currentAngle + angleDiff * this.turnSpeed;
                        const speed = Math.min(this.maxSpeed, Math.sqrt(this.vx * this.vx + this.vy * this.vy) * 1.1);

                        this.vx = Math.cos(newAngle) * speed;
                        this.vy = Math.sin(newAngle) * speed;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                // 煙のエフェクトを追加
                this.createSmokeTrail();
            },

            createSmokeTrail() {
                // 煙の軌跡
                if (Math.random() < 0.8 && this.game) {
                    if (this.game.createExplosion) {
                        this.game.createExplosion(
                            this.x + (Math.random() - 0.5) * 10,
                            this.y + this.height / 2,
                            'smoke'
                        );
                    }
                }
            },

            render(ctx) {
                ctx.save();

                // ミサイル本体
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 40;
                ctx.shadowColor = this.color;

                // ミサイルの形状（三角形）
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.height / 2);
                ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
                ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
                ctx.closePath();
                ctx.fill();

                // 炎のジェット
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + 40);
                gradient.addColorStop(0, 'rgba(255, 255, 0, 0.8)');
                gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.6)');
                gradient.addColorStop(1, 'rgba(255, 0, 0, 0.2)');

                ctx.fillStyle = gradient;
                for (let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(
                        this.x + (Math.random() - 0.5) * 10,
                        this.y + this.height / 2 + i * 10,
                        15 - i * 4,
                        0, Math.PI * 2
                    );
                    ctx.fill();
                }

                ctx.restore();
            },

            getHitbox() {
                return {
                    x: this.x - this.width / 2,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }
        };

        bullet.game = this.game;
        this.game.bullets.push(bullet);
    }

    createBombEffect() {
        // 画面全体を白くフラッシュ
        const canvas = this.game.canvas;
        const ctx = this.game.ctx;
        let flashIntensity = 1.0;
        let flashCount = 0;
        const maxFlashes = 3;

        const flashInterval = setInterval(() => {
            if (flashCount >= maxFlashes) {
                clearInterval(flashInterval);
                return;
            }

            // 画面全体を白でオーバーレイ
            ctx.save();
            ctx.fillStyle = `rgba(255, 255, 255, ${flashIntensity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            flashIntensity *= 0.5; // 段々薄くなる
            flashCount++;
        }, 50); // 50msごとにフラッシュ
    }

    createLightningEffect() {
        // 稲妻エフェクトを画面に追加
        const canvas = this.game.canvas;
        const ctx = this.game.ctx;
        const lightning = [];

        // ランダムな稲妻を生成
        for (let i = 0; i < 5; i++) {
            const startX = Math.random() * canvas.width;
            const startY = 0;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = canvas.height;

            lightning.push({ startX, startY, endX, endY, life: 10 });
        }

        // 稲妻を描画
        const drawLightning = () => {
            lightning.forEach((bolt, index) => {
                if (bolt.life <= 0) {
                    lightning.splice(index, 1);
                    return;
                }

                ctx.save();
                ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.life / 10})`;
                ctx.lineWidth = Math.random() * 3 + 2;
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#00ffff';

                ctx.beginPath();
                ctx.moveTo(bolt.startX, bolt.startY);

                // ジグザグパス
                const segments = 8;
                for (let j = 1; j <= segments; j++) {
                    const progress = j / segments;
                    const x = bolt.startX + (bolt.endX - bolt.startX) * progress + (Math.random() - 0.5) * 40;
                    const y = bolt.startY + (bolt.endY - bolt.startY) * progress;
                    ctx.lineTo(x, y);
                }

                ctx.stroke();
                ctx.restore();

                bolt.life--;
            });

            if (lightning.length > 0) {
                requestAnimationFrame(drawLightning);
            }
        };

        drawLightning();
    }

    render(ctx) {
        ctx.save();

        // 自機を目立たせる発光エフェクト
        // 外側のグロー（常に表示）
        const glowTime = Date.now() * 0.002;
        const glowPulse = Math.sin(glowTime) * 0.3 + 0.7; // 0.4〜1.0で脈動

        // 大きな外側のグロー（赤色に変更）
        ctx.shadowBlur = 40 * glowPulse;
        ctx.shadowColor = '#ff0000';
        ctx.globalAlpha = 0.7 * glowPulse;
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 2, 0, Math.PI * 2);
        ctx.fill();

        // 中間のグロー（オレンジ色）
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ff8800';
        ctx.globalAlpha = 0.5 * glowPulse;
        ctx.fillStyle = '#ff8800';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // 内側の明るいコア
        ctx.shadowBlur = 10;
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // シャドウをリセット
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

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
            // 画像がない場合は従来の描画（赤色の機体）
            ctx.fillStyle = this.color;
            ctx.strokeStyle = '#ffff00';  // 黄色の縁取りで視認性向上
            ctx.lineWidth = 3;  // 太めの線で目立たせる

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

        // 分身の描画（ALL MAX時のみ）
        if (this.clones && this.clones.length > 0) {
            for (const clone of this.clones) {
                clone.render(ctx, this);
            }
        }

        ctx.restore();
    }

    // 入力処理用のメソッド
    setInput(direction, value) {
        this.input[direction] = value;
    }

    setInputFromJoystick(x, y) {
        // ジョイスティック入力を速度に直接変換（アナログ操作）
        const deadZone = 0.1;  // デッドゾーンを狭くして反応良く
        const sensitivity = 1.2;  // 感度を適度に（1.5→1.2）

        // アナログ入力で滑らかな移動
        if (Math.abs(x) > deadZone) {
            this.vx = x * this.maxSpeed * sensitivity;
        } else {
            this.vx *= 0.9;  // 減速
        }

        if (Math.abs(y) > deadZone) {
            this.vy = y * this.maxSpeed * sensitivity;
        } else {
            this.vy *= 0.9;  // 減速
        }

        // デジタル入力も維持（互換性のため）
        this.input.left = x < -deadZone;
        this.input.right = x > deadZone;
        this.input.up = y < -deadZone;
        this.input.down = y > deadZone;
    }

    setInputFromGyro(x, y) {
        // ジャイロ入力を直接速度に変換（感度調整）
        const sensitivity = 1.1;  // 感度を適度に（1.3→1.1）
        this.vx = x * this.maxSpeed * sensitivity;
        this.vy = y * this.maxSpeed * sensitivity;
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

    addOption() {
        const option = {
            x: this.x,
            y: this.y,
            offsetX: (this.options.length + 1) * 30 * (this.options.length % 2 === 0 ? 1 : -1),
            offsetY: -30
        };
        this.options.push(option);
    }

    updateOptions() {
        // オプション機体の位置を更新
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            option.x = this.x + option.offsetX;
            option.y = this.y + option.offsetY;
        }
    }

    triggerWeaponLevelUpEffect(weaponType = 'default') {
        // 武器レベルアップ時の派手な演出

        // 1. 画面フラッシュ効果
        if (this.game && this.game.canvas) {
            const ctx = this.game.ctx;
            const originalComposite = ctx.globalCompositeOperation;

            // 白い画面フラッシュ（3フレーム）
            let flashCount = 0;
            const flashInterval = setInterval(() => {
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = `rgba(255, 255, 100, ${0.8 - flashCount * 0.2})`;
                ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
                ctx.restore();

                flashCount++;
                if (flashCount >= 3) {
                    clearInterval(flashInterval);
                }
            }, 50);
        }

        // 2. パーティクル爆発エフェクト
        if (this.game && this.game.createExplosion) {
            // 中心に大きなエフェクト
            this.game.createExplosion(this.x, this.y, 'large');

            // 周囲に小さなエフェクトをリング状に配置
            const particleCount = 12;
            const radius = 50;
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 / particleCount) * i;
                const px = this.x + Math.cos(angle) * radius;
                const py = this.y + Math.sin(angle) * radius;

                setTimeout(() => {
                    this.game.createExplosion(px, py, 'small');
                }, i * 30);
            }
        }

        // 3. 波紋エフェクト
        this.createWeaponLevelUpWave();

        // 4. サウンド再生
        if (typeof playSFX === 'function') {
            playSFX('levelup');  // レベルアップサウンド
            setTimeout(() => playSFX('power'), 200);  // パワーアップサウンド
        }

        // 5. テキスト表示
        this.showLevelUpText(weaponType);

        // 6. 一時的な無敵時間
        this.invincible = Math.max(this.invincible, 60);  // 1秒間無敵
    }

    createWeaponLevelUpWave() {
        // 波紋エフェクトの作成
        if (!this.game || !this.game.effects) return;

        const wave = {
            x: this.x,
            y: this.y,
            radius: 10,
            maxRadius: 200,
            alpha: 1.0,
            color: '#ffff00',
            lifeTime: 30,
            maxLifeTime: 30,
            type: 'levelup_wave'
        };

        // 複数の波紋を時間差で生成
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const newWave = Object.assign({}, wave);
                newWave.color = i === 0 ? '#ffff00' : (i === 1 ? '#00ffff' : '#ff00ff');
                if (!this.game.effects) this.game.effects = [];
                this.game.effects.push(newWave);
            }, i * 100);
        }
    }

    showLevelUpText(weaponType = 'default') {
        // レベルアップテキストの表示
        if (!this.game || !this.game.uiTexts) {
            if (this.game) this.game.uiTexts = [];
        }

        const weapon = this.weapons[weaponType];
        const weaponNames = {
            default: 'BEAM',
            green: 'SPREAD',
            purple: 'LASER',
            yellow: 'WAVE'
        };

        const levelText = {
            text: `${weaponNames[weaponType]} LEVEL ${weapon.level}!`,
            x: this.x,
            y: this.y - 50,
            vy: -2,
            alpha: 1.0,
            lifeTime: 60,
            color: '#ffff00',
            fontSize: 24,
            style: 'bold',
            shadow: true
        };

        if (this.game && this.game.uiTexts) {
            this.game.uiTexts.push(levelText);

            // MAXレベル時は追加テキスト
            if (weapon.level >= 5) {
                const maxText = Object.assign({}, levelText);
                maxText.text = 'MAXIMUM POWER!';
                maxText.y = this.y - 70;
                maxText.color = '#ff00ff';
                maxText.fontSize = 28;
                this.game.uiTexts.push(maxText);
            }
        }
    }

    updateWeaponIndicators() {
        // 武器インジケーターのUI更新
        const weaponTypes = ['default', 'green', 'purple', 'yellow'];

        weaponTypes.forEach(type => {
            const weapon = this.weapons[type];
            const indicator = document.getElementById(`weapon-${type}`);

            if (indicator) {
                const levelSpan = indicator.querySelector('.weapon-level');

                if (weapon.equipped) {
                    // 装備中の武器
                    indicator.classList.remove('inactive');
                    if (levelSpan) {
                        levelSpan.textContent = `LV${weapon.level}`;

                        // MAXレベル時の特殊表示
                        if (weapon.level >= 10) {
                            levelSpan.style.color = '#ffff00';
                            levelSpan.style.textShadow = '0 0 10px #ffff00';
                            levelSpan.textContent = 'MAX';
                        } else {
                            levelSpan.style.color = 'white';
                            levelSpan.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.8)';
                        }
                    }
                } else {
                    // 未装備の武器
                    indicator.classList.add('inactive');
                    levelSpan.textContent = '--';
                    levelSpan.style.color = 'white';
                    levelSpan.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.8)';
                }
            }
        });
    }
}