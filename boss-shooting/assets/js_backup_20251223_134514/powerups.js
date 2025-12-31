// Power-ups - Space Odyssey
class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;

        // サイズ
        this.width = 20;
        this.height = 20;

        // 移動（ゆっくり流れる）
        this.vx = (Math.random() - 0.5) * 0.5;  // 横にもランダムに動く
        this.vy = 1.2;  // 下に流れる速度
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.08;  // 浮遊アニメーション

        // 生存時間（画面外に出るか時間経過で消える）
        this.lifeTime = 600;  // 10秒 * 60fps = 600フレーム
        this.fadeStartTime = 540;  // 9秒目から点滅開始

        // ビジュアル
        this.rotation = 0;
        this.glow = 0;

        // タイプ別設定
        this.setupType();
    }

    setupType() {
        const types = {
            weapon: {
                color: '#ffff00',
                icon: '⚡',
                description: 'Weapon Level Up'
            },
            // 新武器タイプ
            weapon_spread: {
                color: '#ff9900',
                icon: '🔥',
                description: 'Spread Shot'
            },
            weapon_laser: {
                color: '#00ff99',
                icon: '⚔️',
                description: 'Laser Beam'
            },
            weapon_homing: {
                color: '#9900ff',
                icon: '🎯',
                description: 'Homing Missile'
            },
            weapon_wave: {
                color: '#00ccff',
                icon: '〰️',
                description: 'Wave Cannon'
            },
            life: {
                color: '#ff0066',
                icon: '❤️',
                description: 'Life +1'
            },
            bomb: {
                color: '#ff6600',
                icon: '💣',
                description: 'Bomb +1'
            },
            shield: {
                color: '#00ffff',
                icon: '🛡️',
                description: 'Shield'
            },
            speed: {
                color: '#00ff00',
                icon: '⚡',
                description: 'Speed Boost'
            },
            power: {
                color: '#ff00ff',
                icon: '💪',
                description: 'Power Boost'
            },
            score: {
                color: '#ffaa00',
                icon: '⭐',
                description: 'Score x2'
            },
            // 新しい特殊パワーアップ
            option: {
                color: '#00ffff',
                icon: '◎',
                description: 'Option Unit'
            },
            summon_phoenix: {
                color: '#ff6600',
                icon: '🔥',
                description: 'Phoenix'
            },
            summon_dragon: {
                color: '#00ff00',
                icon: '🐉',
                description: 'Dragon'
            },
            summon_thunder: {
                color: '#ffff00',
                icon: '⚡',
                description: 'Thunder God'
            },
            mega_laser: {
                color: '#ff00ff',
                icon: '💠',
                description: 'Mega Laser'
            },
            combine: {
                color: '#ffffff',
                icon: '⚔️',
                description: 'Combine Mode'
            }
        };

        const config = types[this.type] || types.weapon;
        this.color = config.color;
        this.icon = config.icon;
        this.description = config.description;
    }

    update(dt) {
        // ゆっくり流れる（下に移動＋横にも少し）
        this.y += this.vy;
        this.x += this.vx;

        // 上下にゆらゆら浮遊（流れながら）
        this.floatOffset += this.floatSpeed;
        const floatAmount = Math.sin(this.floatOffset) * 2;  // 上下2ピクセル
        this.y += floatAmount * 0.1;  // ゆっくり上下

        // 横の動きに少し波を加える
        this.x += Math.sin(this.floatOffset * 0.5) * 0.3;

        // 回転
        this.rotation += 0.05;

        // グロー効果
        this.glow = (this.glow + 0.1) % (Math.PI * 2);

        // 生存時間カウントダウン
        this.lifeTime--;

        // 画面外に出たら削除
        if (this.y > window.innerHeight + 50 ||
            this.x < -50 ||
            this.x > window.innerWidth + 50) {
            this.destroy();
        }

        // 時間切れでも削除
        if (this.lifeTime <= 0) {
            this.destroy();
        }
    }

    destroy() {
        // 配列から削除
        if (this.game && this.game.powerups) {
            const index = this.game.powerups.indexOf(this);
            if (index > -1) {
                this.game.powerups.splice(index, 1);
            }
        }
    }

    render(ctx) {
        ctx.save();

        // 消滅前の点滅効果
        let alpha = 1.0;
        if (this.lifeTime < this.fadeStartTime - 300) {  // 最後の1秒
            // 高速点滅
            alpha = Math.sin(this.lifeTime * 0.5) > 0 ? 1.0 : 0.3;
        } else if (this.lifeTime < this.fadeStartTime) {  // 6秒目
            // ゆっくり点滅
            alpha = 0.5 + Math.sin(this.lifeTime * 0.1) * 0.5;
        }

        // グロー効果
        const glowIntensity = (0.5 + Math.sin(this.glow) * 0.3) * alpha;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;

        // 本体
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // 外枠
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = glowIntensity;

        switch (this.type) {
            case 'weapon':
            case 'power':
                // 星型
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                    const outerRadius = this.width / 2;
                    const innerRadius = outerRadius / 2;

                    const x1 = Math.cos(angle) * outerRadius;
                    const y1 = Math.sin(angle) * outerRadius;

                    const angle2 = angle + Math.PI / 5;
                    const x2 = Math.cos(angle2) * innerRadius;
                    const y2 = Math.sin(angle2) * innerRadius;

                    if (i === 0) {
                        ctx.moveTo(x1, y1);
                    } else {
                        ctx.lineTo(x1, y1);
                    }
                    ctx.lineTo(x2, y2);
                }
                ctx.closePath();
                break;

            case 'life':
                // ハート型（簡略版）
                ctx.beginPath();
                ctx.arc(-this.width / 4, -this.height / 4, this.width / 3, 0, Math.PI * 2);
                ctx.arc(this.width / 4, -this.height / 4, this.width / 3, 0, Math.PI * 2);
                ctx.moveTo(0, 0);
                ctx.lineTo(-this.width / 2, -this.height / 4);
                ctx.lineTo(0, this.height / 2);
                ctx.lineTo(this.width / 2, -this.height / 4);
                ctx.lineTo(0, 0);
                break;

            case 'bomb':
                // 爆弾型
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.moveTo(0, -this.width / 2);
                ctx.lineTo(0, -this.width * 0.75);
                break;

            case 'shield':
                // シールド型
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, -this.height / 4);
                ctx.lineTo(-this.width / 2, this.height / 4);
                ctx.lineTo(0, this.height / 2);
                ctx.lineTo(this.width / 2, this.height / 4);
                ctx.lineTo(this.width / 2, -this.height / 4);
                ctx.closePath();
                break;

            default:
                // デフォルト（円形）
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                break;
        }

        ctx.stroke();

        // 内部を塗りつぶし
        ctx.globalAlpha = glowIntensity * 0.5;
        ctx.fillStyle = this.color;
        ctx.fill();

        // 中心の明るい点
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();

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