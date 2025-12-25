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
        this.color = null; // 武器タイプの色（設定されない場合はデフォルト色を使用）

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
            // 爆発弾は爆発後に消滅
            this.destroy();
            return;
        }

        // チャージレーザーは無限貫通
        if (this.isChargedLaser) {
            // 貫通時にダメージエフェクト
            if (this.game && this.game.createExplosion) {
                this.game.createExplosion(target.x || this.x, target.y || this.y, 'small');
            }
            return; // 消滅しない
        }

        // 通常の貫通弾処理
        if (this.penetrating) {
            if (this.pierceCount !== undefined) {
                this.pierceCount--;
                if (this.pierceCount <= 0) {
                    this.destroy();
                }
            }
            // pierceCountが未定義または999以上なら無限貫通
        } else {
            // 貫通弾以外は消滅
            this.destroy();
        }
    }

    createExplosion() {
        if (!this.game) return;

        // 爆発エフェクト（爆発半径に応じたサイズ）
        const explosionSize = this.explosionRadius > 100 ? 'large' :
                             this.explosionRadius > 50 ? 'medium' : 'small';
        this.game.createExplosion(this.x, this.y, explosionSize);

        // 範囲ダメージ（設定された爆発半径を使用）
        const explosionRadius = this.explosionRadius || 50;
        this.game.enemies.forEach(enemy => {
            const dx = enemy.x - this.x;
            const dy = enemy.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < explosionRadius) {
                // 中心に近いほどダメージが大きい
                const damageRatio = 1 - (distance / explosionRadius) * 0.5;
                enemy.takeDamage(Math.ceil(this.power * damageRatio));
            }
        });

        // 画面揺れ演出（ニュークリアミサイル用）
        if (this.screenShake && this.game.canvas) {
            const canvas = this.game.canvas;
            let shakeCount = 0;
            const shakeInterval = setInterval(() => {
                canvas.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                shakeCount++;
                if (shakeCount > 10) {
                    clearInterval(shakeInterval);
                    canvas.style.transform = '';
                }
            }, 50);
        }
    }

    destroy() {
        if (this.game) {
            const index = this.game.bullets.indexOf(this);
            if (index > -1) {
                this.game.bullets.splice(index, 1);
            }
        }
    }

    // HEX色をRGBAに変換するヘルパー関数
    hexToRgba(hex, alpha) {
        let r = 0, g = 0, b = 0;

        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    render(ctx) {
        ctx.save();

        // トレイル描画
        if (this.trail.length > 0) {
            // 武器の色が設定されていればそれを使用、なければデフォルト
            if (this.color && this.owner === 'player') {
                // 武器カラーを使用（アルファ値を設定）
                const colorRgba = this.hexToRgba(this.color, 0.3);
                ctx.strokeStyle = colorRgba;
            } else {
                ctx.strokeStyle = this.owner === 'player' ?
                    'rgba(0, 255, 255, 0.3)' : 'rgba(255, 100, 100, 0.3)';
            }
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
                ctx.fillStyle = this.owner === 'player' ?
                    (this.color || '#00ffff') : '#ff6600';
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
                if (this.owner === 'player' && this.color) {
                    // 武器の色を使用
                    const rgba0 = this.hexToRgba(this.color, 0);
                    const rgba1 = this.hexToRgba(this.color, 1);
                    gradient.addColorStop(0, rgba0);
                    gradient.addColorStop(0.5, rgba1);
                    gradient.addColorStop(1, rgba0);
                } else if (this.owner === 'player') {
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
                ctx.shadowColor = this.owner === 'player' ?
                    (this.color || '#00ffff') : '#ff0000';
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                break;

            case 'charged_laser':
                // チャージレーザー（太い貫通ビーム）
                const laserGradient = ctx.createLinearGradient(0, -this.height / 2, 0, this.height / 2);

                // チャージレベルに応じた色
                if (this.color === '#ff00ff') {
                    // 最大チャージ: 紫
                    laserGradient.addColorStop(0, 'rgba(255, 0, 255, 0.2)');
                    laserGradient.addColorStop(0.3, 'rgba(255, 0, 255, 0.8)');
                    laserGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
                    laserGradient.addColorStop(0.7, 'rgba(255, 0, 255, 0.8)');
                    laserGradient.addColorStop(1, 'rgba(255, 0, 255, 0.2)');
                } else if (this.color === '#00ffff') {
                    // 中チャージ: 水色
                    laserGradient.addColorStop(0, 'rgba(0, 255, 255, 0.2)');
                    laserGradient.addColorStop(0.3, 'rgba(0, 255, 255, 0.8)');
                    laserGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
                    laserGradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.8)');
                    laserGradient.addColorStop(1, 'rgba(0, 255, 255, 0.2)');
                } else {
                    // 低チャージ: 青
                    laserGradient.addColorStop(0, 'rgba(0, 153, 255, 0.2)');
                    laserGradient.addColorStop(0.3, 'rgba(0, 153, 255, 0.8)');
                    laserGradient.addColorStop(0.5, 'rgba(200, 200, 255, 1)');
                    laserGradient.addColorStop(0.7, 'rgba(0, 153, 255, 0.8)');
                    laserGradient.addColorStop(1, 'rgba(0, 153, 255, 0.2)');
                }

                // グロー効果（強力）
                ctx.shadowBlur = this.glowRadius || 20;
                ctx.shadowColor = this.glowColor || this.color;

                // メインビーム（太く）
                ctx.fillStyle = laserGradient;
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

                // コアビーム（中心の明るい部分）
                const coreGradient = ctx.createLinearGradient(0, -this.height / 2, 0, this.height / 2);
                coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
                coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = coreGradient;
                ctx.fillRect(-this.width / 4, -this.height / 2, this.width / 2, this.height);

                // パルスエフェクト
                const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
                ctx.globalAlpha = pulse;
                ctx.fillStyle = 'white';
                ctx.fillRect(-this.width / 6, -this.height / 2, this.width / 3, this.height);
                ctx.globalAlpha = 1;
                break;

            case 'bomb':
                // 爆弾型
                ctx.fillStyle = this.color || '#444444';
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

            case 'sonic_blade':
                // ソニックブレード（半円刃型）
                ctx.save();

                // 回転アニメーション
                if (this.spinning) {
                    ctx.rotate(Date.now() * 0.01);
                }

                // グロー効果
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color || '#ffff00';

                // 半円刃の描画
                const bladeGradient = ctx.createLinearGradient(-this.width/2, 0, this.width/2, 0);
                bladeGradient.addColorStop(0, this.hexToRgba(this.color || '#ffff00', 0.3));
                bladeGradient.addColorStop(0.5, this.hexToRgba(this.color || '#ffff00', 1));
                bladeGradient.addColorStop(1, this.hexToRgba(this.color || '#ffff00', 0.3));

                ctx.fillStyle = bladeGradient;
                ctx.strokeStyle = this.color || '#ffff00';
                ctx.lineWidth = 2;

                // 半円形の刃を描画
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, Math.PI, 0, false);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // 中心の光
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(0, 0, 3, 0, Math.PI * 2);
                ctx.fill();

                // エッジの光沢
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2 - 2, Math.PI, 0, false);
                ctx.stroke();

                ctx.restore();
                break;

            case 'homing':
                // ホーミング弾
                ctx.fillStyle = this.color || '#ff00ff';
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
                ctx.fillStyle = this.owner === 'player' ?
                    (this.color || '#00ffff') : '#ff4444';
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