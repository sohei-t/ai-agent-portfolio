// Bullet class - Space Odyssey
class Bullet {
    constructor(x, y, vx, vy, power, owner, type = 'normal') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.power = power;
        this.owner = owner; // 'player' or 'enemy'
        this.type = type;

        // サイズ設定
        this.width = 4;
        this.height = 8;

        // タイプ別設定
        switch (type) {
            case 'missile':
                this.width = 6;
                this.height = 12;
                this.speed = 6;
                this.homing = true;
                break;
            case 'laser':
                this.width = 8;
                this.height = 20;
                this.speed = 15;
                this.penetrating = true;
                break;
            case 'bomb':
                this.width = 10;
                this.height = 10;
                this.speed = 2;
                this.explosive = true;
                break;
            case 'homing':
                this.width = 5;
                this.height = 5;
                this.speed = 3;
                this.homing = true;
                this.homingStrength = 0.1;
                break;
            default:
                this.speed = 10;
        }

        // ビジュアル
        this.trail = [];
        this.maxTrailLength = 5;
        this.rotation = Math.atan2(vy, vx);
        this.glowIntensity = 0;
    }

    update(dt) {
        // ホーミング処理
        if (this.homing && this.owner === 'enemy') {
            const target = this.game ? this.game.player : null;
            if (target) {
                const dx = target.x - this.x;
                const dy = target.y - this.y;
                const angle = Math.atan2(dy, dx);

                // 徐々に方向を調整
                this.vx += Math.cos(angle) * this.homingStrength;
                this.vy += Math.sin(angle) * this.homingStrength;

                // 速度制限
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > this.speed) {
                    this.vx = (this.vx / speed) * this.speed;
                    this.vy = (this.vy / speed) * this.speed;
                }

                this.rotation = Math.atan2(this.vy, this.vx);
            }
        }

        // 位置更新
        this.x += this.vx;
        this.y += this.vy;

        // トレイル更新
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }

        // グロー演出
        this.glowIntensity = (this.glowIntensity + 0.2) % 1;
    }

    checkCollision(target) {
        // 簡易的な矩形判定
        const targetBox = target.getHitbox ? target.getHitbox() : target;

        return this.x < targetBox.x + targetBox.width &&
               this.x + this.width > targetBox.x &&
               this.y < targetBox.y + targetBox.height &&
               this.y + this.height > targetBox.y;
    }

    onHit(target) {
        // ヒット時の処理
        if (this.explosive) {
            // 爆発ダメージ（周囲の敵にもダメージ）
            this.createExplosion();
        }

        if (!this.penetrating) {
            // 貫通弾以外は消滅
            this.destroy();
        }
    }

    createExplosion() {
        if (!this.game) return;

        // 爆発エフェクト
        this.game.createExplosion(this.x, this.y, 'medium');

        // 範囲ダメージ
        const explosionRadius = 50;
        this.game.enemies.forEach(enemy => {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < explosionRadius) {
                enemy.takeDamage(this.power * 0.5);
            }
        });
    }

    destroy() {
        if (this.game) {
            const index = this.game.bullets.indexOf(this);
            if (index > -1) {
                this.game.bullets.splice(index, 1);
            }
        }
    }

    render(ctx) {
        ctx.save();

        // トレイル描画
        if (this.trail.length > 0) {
            ctx.strokeStyle = this.owner === 'player' ?
                'rgba(0, 255, 255, 0.3)' : 'rgba(255, 100, 100, 0.3)';
            ctx.lineWidth = this.width * 0.5;
            ctx.beginPath();

            this.trail.forEach((point, i) => {
                if (i === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.stroke();
        }

        // 弾本体
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // タイプ別描画
        switch (this.type) {
            case 'missile':
                // ミサイル型
                ctx.fillStyle = this.owner === 'player' ? '#00ffff' : '#ff6600';
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, this.height / 2);
                ctx.lineTo(0, this.height / 3);
                ctx.lineTo(this.width / 2, this.height / 2);
                ctx.closePath();
                ctx.fill();

                // 炎エフェクト
                ctx.fillStyle = `rgba(255, 200, 0, ${0.5 + this.glowIntensity * 0.5})`;
                ctx.beginPath();
                ctx.ellipse(0, this.height / 2, 3, 5, 0, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'laser':
                // レーザー型
                const gradient = ctx.createLinearGradient(0, -this.height / 2, 0, this.height / 2);
                if (this.owner === 'player') {
                    gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
                    gradient.addColorStop(0.5, 'rgba(0, 255, 255, 1)');
                    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                } else {
                    gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
                    gradient.addColorStop(0.5, 'rgba(255, 0, 0, 1)');
                    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
                }
                ctx.fillStyle = gradient;
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

                // グロー効果
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.owner === 'player' ? '#00ffff' : '#ff0000';
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                break;

            case 'bomb':
                // 爆弾型
                ctx.fillStyle = '#444444';
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.fill();

                // 導火線
                ctx.strokeStyle = '#ff6600';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -this.width / 2);
                ctx.lineTo(0, -this.width);
                ctx.stroke();

                // 火花
                ctx.fillStyle = `rgba(255, 200, 0, ${this.glowIntensity})`;
                ctx.beginPath();
                ctx.arc(0, -this.width, 3, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'homing':
                // ホーミング弾
                ctx.fillStyle = '#ff00ff';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;

                // 星型
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                    const x = Math.cos(angle) * this.width / 2;
                    const y = Math.sin(angle) * this.height / 2;
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;

            default:
                // 通常弾
                ctx.fillStyle = this.owner === 'player' ? '#00ffff' : '#ff4444';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;

                // 楕円形の弾
                ctx.beginPath();
                ctx.ellipse(0, 0, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // 中心のグロー
                ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + this.glowIntensity * 0.5})`;
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 4, 0, Math.PI * 2);
                ctx.fill();
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