// Special Weapons System - Space Odyssey

class SpecialWeapon {
    constructor(game) {
        this.game = game;
        this.options = [];  // オプション（分身）
        this.summonActive = false;  // 召喚獣
        this.megaLaserActive = false;  // メガレーザー
        this.combinedMode = false;  // 合体モード
    }

    // オプション（分身）を追加
    addOption() {
        if (this.options.length < 4) {  // 最大4個
            const option = {
                x: this.game.player.x,
                y: this.game.player.y,
                offsetX: (this.options.length + 1) * 30,
                offsetY: (this.options.length + 1) * 20,
                trail: []  // 軌跡
            };
            this.options.push(option);

            // エフェクト
            this.game.createExplosion(option.x, option.y, 'small');
        }
    }

    // オプションを更新
    updateOptions() {
        this.options.forEach((option, index) => {
            // プレイヤーの軌跡を追従
            const delay = (index + 1) * 10;
            if (!option.trail) option.trail = [];

            option.trail.push({
                x: this.game.player.x,
                y: this.game.player.y
            });

            if (option.trail.length > delay) {
                const pos = option.trail.shift();
                option.x = pos.x;
                option.y = pos.y;
            }

            // オプションからも弾を発射
            if (Math.random() < 0.1) {  // 10%の確率で発射
                this.fireFromOption(option);
            }
        });
    }

    // オプションから発射
    fireFromOption(option) {
        if (typeof Bullet !== 'undefined') {
            const bullet = new Bullet(
                option.x,
                option.y - 10,
                0,
                -8,
                1,
                'player',
                'option'
            );
            bullet.color = '#00ffff';
            this.game.bullets.push(bullet);
        }
    }

    // 合体モード起動
    activateCombinedMode() {
        this.combinedMode = true;
        this.combinedTimer = 300;  // 5秒間

        // 視覚効果
        if (this.game.player) {
            this.game.player.width *= 2;
            this.game.player.height *= 2;
            this.game.player.weapon.level = 5;  // 最大レベル
            this.game.player.color = '#ff00ff';  // 色変更
        }

        // 画面フラッシュ
        this.createScreenFlash('#ff00ff');
    }

    // 召喚獣を呼び出す
    summonCreature(type) {
        if (this.summonActive) return;

        this.summonActive = true;
        this.summonType = type || 'phoenix';
        this.summonTimer = 180;  // 3秒間

        switch (this.summonType) {
            case 'phoenix':
                this.summonPhoenix();
                break;
            case 'dragon':
                this.summonDragon();
                break;
            case 'thunder':
                this.summonThunderGod();
                break;
        }
    }

    // フェニックス召喚
    summonPhoenix() {
        const phoenix = {
            x: this.game.gameWidth / 2,
            y: this.game.gameHeight,
            width: 200,
            height: 150,
            timer: 180
        };

        // 画面を横切る炎の嵐
        const fireStorm = setInterval(() => {
            if (phoenix.timer <= 0) {
                clearInterval(fireStorm);
                return;
            }

            phoenix.y -= 10;
            phoenix.timer--;

            // 全ての敵にダメージ
            this.game.enemies.forEach(enemy => {
                if (Math.abs(enemy.x - phoenix.x) < phoenix.width / 2) {
                    enemy.takeDamage(5);
                }
            });

            // 炎のパーティクル
            for (let i = 0; i < 5; i++) {
                this.createFireParticle(
                    phoenix.x + (Math.random() - 0.5) * phoenix.width,
                    phoenix.y
                );
            }
        }, 50);
    }

    // ドラゴン召喚
    summonDragon() {
        // 画面左から右へドラゴンブレス
        let x = 0;
        const dragonBreath = setInterval(() => {
            if (!this.game || !this.game.canvas || x > this.game.canvas.width) {
                clearInterval(dragonBreath);
                this.summonActive = false;
                return;
            }

            x += 20;

            // ブレスの軌道上の敵にダメージ
            if (this.game.enemies) {
                this.game.enemies.forEach(enemy => {
                    if (Math.abs(enemy.x - x) < 30) {
                        enemy.takeDamage(10);
                        if (this.game.createExplosion) {
                            this.game.createExplosion(enemy.x, enemy.y, 'small');
                        }
                    }
                });
            }

            // ブレスエフェクト（パーティクル作成メソッドがある場合のみ）
            if (this.createFireParticle) {
                for (let y = 0; y < this.game.canvas.height; y += 50) {
                    this.createFireParticle(x, y, '#00ff00');  // 緑の炎
                }
            }
        }, 50);
    }

    // 雷神召喚
    summonThunderGod() {
        // 画面全体に雷撃
        const thunderStrikes = 10;

        for (let i = 0; i < thunderStrikes; i++) {
            setTimeout(() => {
                if (!this.game || !this.game.canvas) return;

                const x = Math.random() * this.game.canvas.width;

                // 雷のビジュアル
                if (this.createLightning) {
                    this.createLightning(x, 0, x + (Math.random() - 0.5) * 100, this.game.canvas.height);
                }

                // 雷撃範囲内の敵にダメージ
                if (this.game.enemies) {
                    this.game.enemies.forEach(enemy => {
                        if (Math.abs(enemy.x - x) < 50) {
                            enemy.takeDamage(15);
                            if (this.game.createExplosion) {
                                this.game.createExplosion(enemy.x, enemy.y, 'medium');
                            }
                        }
                    });
                }

                if (i === thunderStrikes - 1) {
                    this.summonActive = false;
                }
            }, i * 200);
        }
    }

    // メガレーザー攻撃
    activateMegaLaser() {
        if (this.megaLaserActive) return;

        this.megaLaserActive = true;
        this.megaLaserTimer = 300;  // 5秒間（60fps * 5）

        // 画面下部から上へ向かって無数のレーザー
        const laserRain = setInterval(() => {
            if (!this.game || !this.game.canvas || this.megaLaserTimer <= 0) {
                clearInterval(laserRain);
                this.megaLaserActive = false;
                return;
            }

            this.megaLaserTimer--;

            // ランダムな位置から上向きレーザー
            if (typeof Bullet !== 'undefined' && this.game.bullets) {
                for (let i = 0; i < 5; i++) {
                    const x = Math.random() * this.game.canvas.width;
                    const laser = new Bullet(
                        x,
                        this.game.canvas.height,
                        (Math.random() - 0.5) * 2,
                        -15,
                        3,
                        'player',
                        'megalaser'
                    );
                    laser.width = 10;
                    laser.height = 30;
                    laser.color = `hsl(${Math.random() * 360}, 100%, 50%)`;  // 虹色
                    this.game.bullets.push(laser);
                }
            }
        }, 100);
    }

    // 画面フラッシュ効果
    createScreenFlash(color) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: ${color};
            opacity: 0.8;
            z-index: 9999;
            pointer-events: none;
            animation: flashFade 0.5s ease-out forwards;
        `;

        if (!document.getElementById('flashStyle')) {
            const style = document.createElement('style');
            style.id = 'flashStyle';
            style.textContent = `
                @keyframes flashFade {
                    from { opacity: 0.8; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
    }

    // 炎のパーティクル
    createFireParticle(x, y, color = '#ff6600') {
        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 5,
            life: 30,
            color: color,
            size: Math.random() * 10 + 5
        };
        this.game.particles.push(particle);
    }

    // 雷のビジュアル
    createLightning(x1, y1, x2, y2) {
        const canvas = this.game.ctx.canvas;
        const ctx = this.game.ctx;

        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;

        ctx.beginPath();
        ctx.moveTo(x1, y1);

        // ジグザグの雷
        const segments = 10;
        for (let i = 1; i <= segments; i++) {
            const progress = i / segments;
            const x = x1 + (x2 - x1) * progress + (Math.random() - 0.5) * 50;
            const y = y1 + (y2 - y1) * progress;
            ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.restore();
    }

    // 更新処理
    update() {
        // オプション更新
        this.updateOptions();

        // 合体モード
        if (this.combinedMode) {
            this.combinedTimer--;
            if (this.combinedTimer <= 0) {
                this.combinedMode = false;
                // 元に戻す
                if (this.game.player) {
                    this.game.player.width /= 2;
                    this.game.player.height /= 2;
                    this.game.player.color = '#00ffff';
                }
            }
        }
    }

    // 描画処理
    render(ctx) {
        // オプション描画
        this.options.forEach(option => {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.arc(option.x, option.y, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        });

        // 合体モードのオーラ
        if (this.combinedMode && this.game.player) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)';
            ctx.lineWidth = 5;
            ctx.shadowColor = '#ff00ff';
            ctx.shadowBlur = 20;

            ctx.beginPath();
            ctx.arc(this.game.player.x, this.game.player.y, 40, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }
    }
}

// グローバル変数として初期化
let specialWeapon = null;