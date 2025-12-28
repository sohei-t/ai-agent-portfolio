// Power-ups - Space Odyssey
class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;

        // サイズ
        this.width = 20;
        this.height = 20;

        // 移動
        this.vy = 1.5;
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.05;

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
            }
        };

        const config = types[this.type] || types.weapon;
        this.color = config.color;
        this.icon = config.icon;
        this.description = config.description;
    }

    update(dt) {
        // 落下
        this.y += this.vy;

        // 横揺れ
        this.floatOffset += this.floatSpeed;
        this.x += Math.sin(this.floatOffset) * 0.5;

        // 回転
        this.rotation += 0.05;

        // グロー効果
        this.glow = (this.glow + 0.1) % (Math.PI * 2);
    }

    render(ctx) {
        ctx.save();

        // グロー効果
        const glowIntensity = 0.5 + Math.sin(this.glow) * 0.3;
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