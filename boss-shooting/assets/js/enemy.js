// Enemy class - Space Odyssey
class Enemy {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;

        // 敵タイプ別の設定（適切なサイズに調整）
        const enemyTypes = {
            basic: {
                width: 32,
                height: 32,
                hp: 1,
                speed: 2,
                scoreValue: 100,
                color: '#ff4444',
                movePattern: 'straight',
                attackPattern: 'single',
                attackInterval: 60
            },
            fast: {
                width: 28,
                height: 28,
                hp: 1,
                speed: 4,
                scoreValue: 150,
                color: '#ff8844',
                movePattern: 'zigzag',
                attackPattern: 'none',
                attackInterval: 0
            },
            tank: {
                width: 40,
                height: 40,
                hp: 3,
                speed: 1,
                scoreValue: 300,
                color: '#884444',
                movePattern: 'straight',
                attackPattern: 'spread',
                attackInterval: 90
            },
            sniper: {
                width: 32,
                height: 36,
                hp: 2,
                speed: 1.5,
                scoreValue: 250,
                color: '#ff44ff',
                movePattern: 'wave',
                attackPattern: 'aimed',
                attackInterval: 120
            },
            bomber: {
                width: 36,
                height: 36,
                hp: 2,
                speed: 2,
                scoreValue: 200,
                color: '#ffaa44',
                movePattern: 'dive',
                attackPattern: 'bomb',
                attackInterval: 80
            }
        };

        // デフォルト値
        const config = enemyTypes[type] || enemyTypes.basic;
        Object.assign(this, config);

        // 難易度による調整
        const diffSettings = this.game.difficultySettings[this.game.difficulty];
        this.hp = Math.ceil(this.hp * diffSettings.enemyHpMultiplier);
        this.maxHp = this.hp;

        // 移動関連
        this.vx = 0;
        this.vy = this.speed;
        this.moveTimer = 0;
        this.movePhase = 0;

        // 攻撃関連
        this.attackTimer = Math.random() * this.attackInterval;
        this.canAttack = this.attackPattern !== 'none';

        // ビジュアル
        this.rotation = 0;
        this.damageFlash = 0;

        // PNG画像を読み込み（存在する場合）
        this.imageLoaded = false;
        this.sprite = new Image();

        const typeToImageMap = {
            'basic': 'enemy_01',
            'fast': 'enemy_02',
            'tank': 'enemy_03',
            'sniper': 'enemy_04',
            'bomber': 'enemy_05'
        };

        const imageName = typeToImageMap[type] || 'enemy_01';

        this.sprite.onload = () => {
            this.imageLoaded = true;
        };

        this.sprite.onerror = () => {
            // PNGが見つからない場合はSVGを試す
            this.sprite.src = `assets/images/enemies/${imageName}.svg`;
        };

        // まずPNG画像を試す
        this.sprite.src = `assets/images/${imageName}.PNG`;
    }

    update(dt) {
        // 移動処理
        this.move(dt);

        // 攻撃処理
        if (this.canAttack) {
            this.attackTimer++;
            if (this.attackTimer >= this.attackInterval) {
                this.attack();
                this.attackTimer = 0;
            }
        }

        // ダメージフラッシュ更新
        if (this.damageFlash > 0) {
            this.damageFlash--;
        }

        // 回転演出を無効化
        // this.rotation += 0.02;
    }

    move(dt) {
        this.moveTimer++;

        switch (this.movePattern) {
            case 'straight':
                // 直進
                this.y += this.vy;
                break;

            case 'zigzag':
                // ジグザグ移動
                this.y += this.vy;
                this.x += Math.sin(this.moveTimer * 0.1) * 3;
                break;

            case 'wave':
                // 波状移動
                this.y += this.vy;
                this.x += Math.cos(this.moveTimer * 0.05) * 2;
                break;

            case 'circle':
                // 円運動
                const centerX = this.game.canvas.width / 2;
                const radius = 150;
                this.x = centerX + Math.cos(this.moveTimer * 0.03) * radius;
                this.y += this.vy * 0.5;
                break;

            case 'dive':
                // 急降下
                if (this.moveTimer < 60) {
                    this.y += this.vy * 0.5;
                } else {
                    this.y += this.vy * 3;
                }
                break;

            case 'spiral':
                // らせん移動
                const spiralRadius = 50 + this.moveTimer * 0.5;
                this.x += Math.cos(this.moveTimer * 0.1) * spiralRadius * 0.01;
                this.y += this.vy;
                break;

            case 'hover':
                // ホバリング（ボス用）
                if (this.y < 100) {
                    this.y += this.vy;
                } else {
                    this.x += Math.sin(this.moveTimer * 0.02) * 2;
                }
                break;
        }

        // 画面端での跳ね返り
        if (this.x < this.width / 2 || this.x > this.game.canvas.width - this.width / 2) {
            this.vx *= -1;
            this.x = Math.max(this.width / 2,
                     Math.min(this.game.canvas.width - this.width / 2, this.x));
        }
    }

    attack() {
        if (!this.game.player) return;

        const px = this.game.player.x;
        const py = this.game.player.y;

        switch (this.attackPattern) {
            case 'single':
                // 単発弾
                this.createBullet(this.x, this.y + this.height / 2, 0, 2.5);  // 3から2.5に減速
                break;

            case 'spread':
                // 拡散弾
                for (let i = -2; i <= 2; i++) {
                    this.createBullet(
                        this.x,
                        this.y + this.height / 2,
                        i * 1.2,  // 1.5から1.2に減速
                        2.5  // 3から2.5に減速
                    );
                }
                break;

            case 'aimed':
                // 狙い撃ち
                const angle = Math.atan2(py - this.y, px - this.x);
                const speed = 3;  // 4から3に減速
                this.createBullet(
                    this.x,
                    this.y + this.height / 2,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
                break;

            case 'bomb':
                // 爆弾投下
                this.createBullet(this.x, this.y + this.height / 2, 0, 2, 'bomb');
                break;

            case 'laser':
                // レーザー（ボス用）
                this.createBullet(this.x, this.y + this.height / 2, 0, 5, 'laser');
                break;

            case 'homing':
                // ホーミング弾（ボス用）
                this.createBullet(this.x, this.y + this.height / 2, 0, 2, 'homing');
                break;
        }

        // 効果音
        if (typeof playSFX === 'function') {
            playSFX('enemy_shoot', 0.3);
        }
    }

    createBullet(x, y, vx, vy, type = 'normal') {
        if (typeof Bullet !== 'undefined') {
            const bullet = new Bullet(x, y, vx, vy, 1, 'enemy', type);
            this.game.bullets.push(bullet);
        }
    }

    takeDamage(damage) {
        this.hp -= damage;
        this.damageFlash = 10;

        if (this.hp <= 0) {
            this.destroy();
        } else {
            // ヒット音
            if (typeof playSFX === 'function') {
                playSFX('enemy_hit', 0.5);
            }
        }
    }

    destroy() {
        // スコア加算
        this.game.addScore(this.scoreValue);

        // 爆発エフェクト
        this.game.createExplosion(this.x, this.y, 'small');

        // アイテムドロップ
        if (Math.random() < 0.15) {
            this.game.spawnPowerup(this.x, this.y);
        }

        // 効果音
        if (typeof playSFX === 'function') {
            playSFX('enemy_destroy');
        }

        // 配列から削除
        const index = this.game.enemies.indexOf(this);
        if (index > -1) {
            this.game.enemies.splice(index, 1);
        }
    }

    render(ctx) {
        ctx.save();

        // ダメージフラッシュ
        if (this.damageFlash > 0) {
            ctx.globalAlpha = 0.7;
            ctx.filter = 'brightness(2)';
        }

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
            ctx.lineWidth = 1;

        switch (this.type) {
            case 'basic':
                // 基本的な敵（ダイヤモンド型）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, 0);
                ctx.lineTo(0, this.height / 2);
                ctx.lineTo(this.width / 2, 0);
                ctx.closePath();
                break;

            case 'fast':
                // 高速敵（三角形）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, this.height / 2);
                ctx.lineTo(this.width / 2, this.height / 2);
                ctx.closePath();
                break;

            case 'tank':
                // 重装甲敵（四角形）
                ctx.beginPath();
                ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
                ctx.closePath();
                break;

            case 'sniper':
                // 狙撃敵（十字型）
                ctx.beginPath();
                ctx.moveTo(-this.width / 2, 0);
                ctx.lineTo(this.width / 2, 0);
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(0, this.height / 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, 0, this.width / 4, 0, Math.PI * 2);
                break;

            case 'bomber':
                // 爆撃機（六角形）
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI * 2 / 6) * i;
                    const px = Math.cos(angle) * this.width / 2;
                    const py = Math.sin(angle) * this.height / 2;
                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.closePath();
                break;

            default:
                // デフォルト（円形）
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
        }

        // HPバー表示（HP2以上の敵のみ）
        if (this.maxHp > 1) {
            ctx.restore();
            ctx.save();

            const barWidth = this.width;
            const barHeight = 4;
            const barY = this.y - this.height / 2 - 8;

            // 背景
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(this.x - barWidth / 2, barY, barWidth, barHeight);

            // HPバー
            const hpRatio = this.hp / this.maxHp;
            ctx.fillStyle = hpRatio > 0.5 ? '#00ff00' :
                           hpRatio > 0.25 ? '#ffff00' : '#ff0000';
            ctx.fillRect(this.x - barWidth / 2, barY, barWidth * hpRatio, barHeight);
        }

        ctx.restore();
    }

    getHitbox() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
}