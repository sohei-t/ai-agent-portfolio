// Boss class - Space Odyssey
class Boss {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;

        // ボスタイプ別の設定（超巨大化・大幅強化）
        const bossTypes = {
            stage1: {
                width: 320,  // 160→320（2倍）
                height: 320,  // 160→320（2倍）
                hp: 400,  // 200→400（さらに2倍）
                speed: 1,
                scoreValue: 10000,
                color: '#ff0044',
                name: 'Alien Commander',
                attackPatterns: ['spread', 'aimed', 'laser'],
                glowColor: '#ff00ff'
            },
            stage2: {
                width: 360,  // 180→360（2倍）
                height: 360,  // 180→360（2倍）
                hp: 600,  // 300→600（2倍）
                speed: 1.2,
                scoreValue: 15000,
                color: '#ff4400',
                name: 'Mechanical Destroyer',
                attackPatterns: ['laser', 'homing', 'bomb'],
                glowColor: '#ffaa00'
            },
            stage3: {
                width: 400,  // 200→400（2倍）
                height: 400,  // 200→400（2倍）
                hp: 800,  // 400→800（2倍）
                speed: 0.8,
                scoreValue: 20000,
                color: '#ff0088',
                name: 'Crystal Guardian',
                attackPatterns: ['spiral', 'laser', 'spread'],
                glowColor: '#00ffff'
            },
            stage4: {
                width: 360,  // 180→360（2倍）
                height: 360,  // 180→360（2倍）
                hp: 1000,  // 500→1000（2倍）
                speed: 1.5,
                scoreValue: 25000,
                color: '#8800ff',
                name: 'Shadow Leviathan',
                attackPatterns: ['homing', 'bomb', 'spiral'],
                glowColor: '#9900ff'
            },
            stage5: {
                width: 400,  // 200→400（2倍）
                height: 400,  // 200→400（2倍）
                hp: 1200,  // 600→1200（2倍）
                speed: 1,
                scoreValue: 30000,
                color: '#ff00ff',
                name: 'Quantum Hydra',
                attackPatterns: ['multi', 'laser', 'chaos'],
                glowColor: '#ff00ff'
            },
            final: {
                width: 480,  // 240→480（2倍・超巨大）
                height: 480,  // 240→480（2倍・超巨大）
                hp: 2000,  // 1000→2000（2倍）
                speed: 0.5,
                scoreValue: 50000,
                color: '#ff0000',
                name: 'Omega Overlord',
                attackPatterns: ['ultimate', 'chaos', 'laser'],
                glowColor: '#ff0000'
            }
        };

        // デフォルト値
        const config = bossTypes[type] || bossTypes.stage1;
        Object.assign(this, config);

        // 難易度による調整
        const diffSettings = this.game.difficultySettings[this.game.difficulty];
        this.hp = Math.ceil(this.hp * diffSettings.enemyHpMultiplier);
        this.maxHp = this.hp;

        // コアシステムの追加
        this.hasCore = true;
        this.coreSize = 40;  // コアの大きさ（ボスに比例）
        this.coreGlowTimer = 0;
        this.coreDamageMultiplier = 3;  // コアへのダメージは3倍
        this.coreOffsetX = 0;  // コアの位置（ボス中心からのオフセット）
        this.coreOffsetY = 0;

        // フェーズ管理
        this.phase = 1;
        this.maxPhase = 3;

        // 移動関連
        this.targetX = x;
        this.targetY = 100;
        this.baseSpeed = this.speed;  // 基本速度を保持
        this.movePattern = 'entering';
        this.moveTimer = 0;

        // 攻撃関連
        this.attackTimer = 0;
        this.attackInterval = 60;
        this.currentPattern = 0;
        this.specialAttackCooldown = 0;

        // ビジュアル
        this.rotation = 0;
        this.damageFlash = 0;
        this.warningTimer = 0;
        this.parts = []; // ボスのパーツ（装飾用）

        // PNG画像を読み込み（ステージに応じて）
        this.imageLoaded = false;
        this.sprite = new Image();

        // ボス番号を決定（ステージ番号に基づく）
        const bossNumber = Math.min(this.game ? this.game.stage : 1, 11);
        const imageName = `boss_${String(bossNumber).padStart(2, '0')}`;

        this.sprite.onload = () => {
            this.imageLoaded = true;
        };

        this.sprite.onerror = () => {
            // PNGが見つからない場合はSVGを試す
            this.sprite.src = `assets/images/bosses/${imageName}.svg`;
        };

        // まずPNG画像を試す
        this.sprite.src = `assets/images/${imageName}.PNG`;

        // 初期化
        this.initParts();
    }

    initParts() {
        // ボスの装飾パーツを生成
        for (let i = 0; i < 4; i++) {
            this.parts.push({
                angle: (Math.PI * 2 / 4) * i,
                distance: this.width / 2,
                size: 8,
                rotation: 0
            });
        }
    }

    update(dt) {
        // 破壊済みチェック
        if (this.destroyed || this.hp <= 0) {
            if (!this.destroyed && this.hp <= 0) {
                this.destroy();
            }
            return;
        }

        // 移動処理
        this.move(dt);

        // 攻撃処理
        if (this.movePattern !== 'entering' && this.movePattern !== 'leaving') {
            this.attackTimer++;
            if (this.attackTimer >= this.attackInterval) {
                this.attack();
                this.attackTimer = 0;
            }

            // 特殊攻撃は削除（難易度が高すぎるため）
            // コアの脈動アニメーション
            this.coreGlowTimer += 0.1;
            this.coreOffsetX = Math.sin(this.coreGlowTimer) * 10;
            this.coreOffsetY = Math.cos(this.coreGlowTimer * 1.3) * 5;
        }

        // フェーズ変更チェック
        const hpRatio = this.hp / this.maxHp;
        if (hpRatio <= 0.66 && this.phase === 1) {
            this.phase = 2;
            this.onPhaseChange();
        } else if (hpRatio <= 0.33 && this.phase === 2) {
            this.phase = 3;
            this.onPhaseChange();
        }

        // ダメージフラッシュ更新
        if (this.damageFlash > 0) {
            this.damageFlash--;
        }

        // 回転演出
        // this.rotation += 0.01;  // 回転を無効化

        // パーツアニメーション
        this.parts.forEach((part, i) => {
            part.rotation += 0.05 + i * 0.01;
            part.angle += 0.02 * (i % 2 === 0 ? 1 : -1);
        });

        // HPバー更新
        this.updateHealthBar();
    }

    move(dt) {
        this.moveTimer++;

        switch (this.movePattern) {
            case 'entering':
                // 登場演出
                if (this.y < this.targetY) {
                    this.y += 2;
                } else {
                    this.movePattern = 'hover';
                    if (typeof playSFX === 'function') {
                        playSFX('warning');
                    }
                }
                break;

            case 'hover':
                // ダイナミックな移動パターン
                const phase = Math.floor(this.moveTimer / 200) % 4;

                switch (phase) {
                    case 0: // 8の字移動
                        const t = this.moveTimer * 0.02;
                        this.targetX = this.game.canvas.width * 0.5 + Math.sin(t) * 200;
                        this.targetY = 150 + Math.sin(t * 2) * 100;
                        break;

                    case 1: // 円運動
                        const angle = this.moveTimer * 0.03;
                        this.targetX = this.game.canvas.width * 0.5 + Math.cos(angle) * 250;
                        this.targetY = 200 + Math.sin(angle) * 100;
                        break;

                    case 2: // ジグザグ移動
                        this.targetX = this.game.canvas.width * (0.2 + (Math.floor(this.moveTimer / 30) % 3) * 0.3);
                        this.targetY = 100 + Math.sin(this.moveTimer * 0.05) * 50;
                        break;

                    case 3: // 体当たり攻撃
                        const subPhase = this.moveTimer % 200;
                        if (subPhase < 50) {
                            // 構え
                            this.targetX = this.game.canvas.width * 0.5;
                            this.targetY = 100;
                        } else if (subPhase < 100 && this.game.player) {
                            // 突進！
                            this.targetX = this.game.player.x;
                            this.targetY = this.game.player.y;
                            this.speed = 8;
                        } else {
                            // 戻る
                            this.targetX = this.game.canvas.width * 0.5;
                            this.targetY = 150;
                            this.speed = this.baseSpeed;
                        }
                        break;
                }

                // スムーズな移動
                if (this.targetX !== undefined) {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 5) {
                        const moveSpeed = this.speed || this.baseSpeed;
                        this.x += (dx / dist) * moveSpeed;
                        this.y += (dy / dist) * moveSpeed;
                    }
                }
                break;

            case 'chase':
                // プレイヤー追跡
                if (this.game.player) {
                    const dx = this.game.player.x - this.x;
                    this.x += Math.sign(dx) * this.speed;
                }
                break;

            case 'pattern':
                // パターン移動
                const pattern = this.moveTimer % 240;
                if (pattern < 60) {
                    this.x -= this.speed * 2;
                } else if (pattern < 120) {
                    this.x += this.speed * 2;
                } else if (pattern < 180) {
                    this.y += this.speed;
                } else {
                    this.y -= this.speed;
                }
                break;

            case 'leaving':
                // 撤退
                this.y -= 3;
                if (this.y < -this.height) {
                    this.destroy();
                }
                break;
        }

        // 画面端制限
        this.x = Math.max(this.width / 2,
                 Math.min(this.game.canvas.width - this.width / 2, this.x));
        this.y = Math.max(50, Math.min(200, this.y));
    }

    attack() {
        const pattern = this.attackPatterns[this.currentPattern];
        this.currentPattern = (this.currentPattern + 1) % this.attackPatterns.length;

        switch (pattern) {
            case 'spread':
                this.spreadAttack();
                break;
            case 'aimed':
                this.aimedAttack();
                break;
            case 'laser':
                this.laserAttack();
                break;
            case 'homing':
                this.homingAttack();
                break;
            case 'bomb':
                this.bombAttack();
                break;
            case 'spiral':
                this.spiralAttack();
                break;
            case 'multi':
                this.multiAttack();
                break;
            case 'chaos':
                this.chaosAttack();
                break;
            case 'ultimate':
                this.ultimateAttack();
                break;
        }
    }

    spreadAttack() {
        // ランダム化された扇状拡散弾
        const bullets = 5 + this.phase * 2;
        const baseAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;  // 基準角度をランダム化
        const spreadRange = Math.PI * 0.6;  // 扇の範囲

        for (let i = 0; i < bullets; i++) {
            // 各弾の角度と速度をランダム化
            const angleOffset = (i / (bullets - 1)) * spreadRange - spreadRange / 2;
            const angle = baseAngle + angleOffset + (Math.random() - 0.5) * 0.2;
            const speed = 2 + Math.random() * 1.5;  // 速度もランダム化

            this.createBullet(
                this.x + (Math.random() - 0.5) * 40,  // 発射位置も少しずらす
                this.y + this.height / 2,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }

    aimedAttack() {
        // プレイヤー狙い撃ち
        if (!this.game.player) return;

        const angle = Math.atan2(
            this.game.player.y - this.y,
            this.game.player.x - this.x
        );

        for (let i = 0; i < this.phase; i++) {
            setTimeout(() => {
                this.createBullet(
                    this.x,
                    this.y + this.height / 2,
                    Math.cos(angle) * 4,
                    Math.sin(angle) * 4
                );
            }, i * 100);
        }
    }

    laserAttack() {
        // レーザー攻撃
        for (let i = -1; i <= 1; i++) {
            this.createBullet(
                this.x + i * 30,
                this.y + this.height / 2,
                0,
                5,
                'laser'
            );
        }
    }

    homingAttack() {
        // ホーミング弾
        const missiles = 2 + this.phase;
        for (let i = 0; i < missiles; i++) {
            setTimeout(() => {
                this.createBullet(
                    this.x + (Math.random() - 0.5) * this.width,
                    this.y + this.height / 2,
                    (Math.random() - 0.5) * 2,
                    2,
                    'homing'
                );
            }, i * 200);
        }
    }

    bombAttack() {
        // 爆弾投下
        for (let i = 0; i < 3; i++) {
            this.createBullet(
                this.x + (i - 1) * 40,
                this.y + this.height / 2,
                0,
                1.5,
                'bomb'
            );
        }
    }

    spiralAttack() {
        // らせん弾幕
        const bulletCount = 12;
        for (let i = 0; i < bulletCount; i++) {
            setTimeout(() => {
                const angle = (Math.PI * 2 / bulletCount) * i + this.moveTimer * 0.1;
                this.createBullet(
                    this.x,
                    this.y,
                    Math.cos(angle) * 3,
                    Math.sin(angle) * 3
                );
            }, i * 50);
        }
    }

    multiAttack() {
        // 複合攻撃
        this.spreadAttack();
        setTimeout(() => this.aimedAttack(), 500);
    }

    chaosAttack() {
        // ランダム弾幕
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                this.createBullet(
                    this.x + (Math.random() - 0.5) * this.width,
                    this.y + (Math.random() - 0.5) * this.height,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }, i * 100);
        }
    }

    ultimateAttack() {
        // 究極攻撃
        this.chaosAttack();
        this.spiralAttack();
        this.homingAttack();
    }


    createBullet(x, y, vx, vy, type = 'normal') {
        if (typeof Bullet !== 'undefined') {
            const bullet = new Bullet(x, y, vx, vy, 1, 'enemy', type);

            // フェーズによる弾の強化
            if (this.phase >= 2) {
                bullet.speed *= 1.2;
            }
            if (this.phase >= 3) {
                bullet.damage = 2;
            }

            this.game.bullets.push(bullet);
        }
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.damageFlash = 10;

        if (typeof playSFX === 'function') {
            playSFX('boss_hit', 0.5);
        }

        if (this.hp <= 0) {
            this.destroy();
        }
    }

    onPhaseChange() {
        // フェーズ変更演出
        this.damageFlash = 30;
        this.attackInterval = Math.max(30, this.attackInterval - 10);

        // 画面フラッシュ
        if (typeof createScreenFlash === 'function') {
            createScreenFlash();
        }

        // 特殊攻撃
        this.specialAttack();
    }

    destroy() {
        // 二重破壊を防ぐ
        if (this.destroyed) return;
        this.destroyed = true;

        // 大爆発エフェクト
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                if (this.game) {
                    this.game.createExplosion(
                        this.x + (Math.random() - 0.5) * this.width,
                        this.y + (Math.random() - 0.5) * this.height,
                        'large'
                    );
                }
            }, i * 100);
        }

        if (typeof playSFX === 'function') {
            playSFX('boss_destroy');
        }

        // 少し遅延を入れてから次のステージへ
        setTimeout(() => {
            if (this.game) {
                this.game.onBossDefeated();
            }
        }, 500);
    }

    updateHealthBar() {
        const bar = document.getElementById('bossHealthBar');
        if (bar) {
            const ratio = Math.max(0, this.hp / this.maxHp);
            bar.style.width = `${ratio * 100}%`;
        }
    }

    render(ctx) {
        ctx.save();

        // 発光エフェクト（パルス）
        const glowIntensity = 0.5 + Math.sin(Date.now() * 0.003) * 0.3;
        ctx.shadowColor = this.glowColor || this.color;
        ctx.shadowBlur = 50 + glowIntensity * 30;

        // HPに応じた表情変化（怒りレベル）
        const hpRatio = this.hp / this.maxHp;
        if (hpRatio < 0.3) {
            // 瀕死状態（赤く点滅）
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 80;
        }

        // ダメージフラッシュ
        if (this.damageFlash > 0) {
            ctx.globalAlpha = 0.7;
            ctx.filter = `brightness(${2 + this.damageFlash / 10})`;
        }

        // 怒りモードのオーラ（多重層）
        if (this.isAngry || hpRatio < 0.5) {
            // 外側のオーラ
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.3 + glowIntensity * 0.3})`;
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2 + 40, 0, Math.PI * 2);
            ctx.stroke();

            // 内側のオーラ
            ctx.strokeStyle = `rgba(255, 100, 0, ${0.5 + glowIntensity * 0.3})`;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2 + 20, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 警告エフェクト
        if (this.warningTimer > 0) {
            this.warningTimer--;
            if (this.warningTimer % 10 < 5) {
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            }
        }

        // ボス本体
        ctx.translate(this.x, this.y);
        // ctx.rotate(this.rotation);  // 回転を無効化

        // 画像が読み込まれていれば画像を描画
        if (this.imageLoaded && this.sprite) {
            ctx.drawImage(
                this.sprite,
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height
            );
        } else {
            // 画像がない場合は従来の描画
            ctx.fillStyle = this.color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;

            // 本体（複雑な形状）
            ctx.beginPath();
        const points = 8;
        for (let i = 0; i < points; i++) {
            const angle = (Math.PI * 2 / points) * i;
            const radius = i % 2 === 0 ? this.width / 2 : this.width / 3;
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        }

        // パーツの描画
        this.parts.forEach(part => {
            ctx.save();
            ctx.rotate(part.angle);
            ctx.translate(part.distance, 0);
            ctx.rotate(part.rotation);

            ctx.fillStyle = '#ffaa00';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.arc(0, 0, part.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        });

        ctx.restore();

        // コアシステムの描画（ボス本体とは別に描画）
        if (this.hasCore) {
            ctx.save();

            // コアの位置
            const coreX = this.x + this.coreOffsetX;
            const coreY = this.y + this.coreOffsetY;

            // コアの発光エフェクト
            const pulseScale = 1 + Math.sin(this.coreGlowTimer * 2) * 0.2;
            const glowAlpha = 0.6 + Math.sin(this.coreGlowTimer * 3) * 0.4;

            // 外側のグロー
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 30 * pulseScale;
            ctx.fillStyle = `rgba(0, 255, 255, ${glowAlpha * 0.3})`;
            ctx.beginPath();
            ctx.arc(coreX, coreY, this.coreSize * 1.5 * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // 中間層
            ctx.shadowBlur = 20;
            ctx.fillStyle = `rgba(100, 200, 255, ${glowAlpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(coreX, coreY, this.coreSize * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // コア本体
            ctx.shadowBlur = 10;
            ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
            ctx.beginPath();
            ctx.arc(coreX, coreY, this.coreSize * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // コアの十字マーク
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.globalAlpha = glowAlpha;
            ctx.beginPath();
            ctx.moveTo(coreX - this.coreSize, coreY);
            ctx.lineTo(coreX + this.coreSize, coreY);
            ctx.moveTo(coreX, coreY - this.coreSize);
            ctx.lineTo(coreX, coreY + this.coreSize);
            ctx.stroke();

            ctx.restore();
        }

        // 名前表示
        if (this.movePattern === 'entering') {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, this.game.canvas.width / 2, 50);
        }
    }

    getHitbox() {
        // ボスは少し小さめの当たり判定
        return {
            x: this.x - this.width * 0.4,
            y: this.y - this.height * 0.4,
            width: this.width * 0.8,
            height: this.height * 0.8
        };
    }

    getCoreHitbox() {
        // コアの当たり判定
        if (!this.hasCore) return null;

        const coreX = this.x + this.coreOffsetX;
        const coreY = this.y + this.coreOffsetY;

        return {
            x: coreX - this.coreSize,
            y: coreY - this.coreSize,
            width: this.coreSize * 2,
            height: this.coreSize * 2,
            isCore: true
        };
    }

    takeDamage(amount, hitCore = false) {
        // コアに命中した場合はダメージ倍率を適用
        const actualDamage = hitCore ? amount * this.coreDamageMultiplier : amount;

        this.hp -= actualDamage;
        this.damageFlash = 10;

        // コアヒット時の特別なエフェクト
        if (hitCore && this.game) {
            // 大きな爆発エフェクト
            this.game.createExplosion(
                this.x + this.coreOffsetX,
                this.y + this.coreOffsetY,
                'large'
            );

            // 画面フラッシュ
            if (typeof createScreenFlash === 'function') {
                createScreenFlash('#00ffff', 0.5);
            }

            if (typeof playSFX === 'function') {
                playSFX('critical_hit');
            }
        }

        if (this.hp <= 0 && !this.destroyed) {
            this.destroy();
        }

        return actualDamage;
    }
}