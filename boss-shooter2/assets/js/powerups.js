// Power-ups - Space Odyssey
class Powerup {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;

        // サイズ（少し大きくして見やすく）
        this.width = 25;
        this.height = 25;

        // 移動（ゆっくり流れる）
        this.vx = (Math.random() - 0.5) * 0.2;  // 横の動きをさらに減らす
        this.vy = 0.5;  // 下に流れる速度を半分に（0.5倍）
        this.floatOffset = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.08;  // 浮遊アニメーション

        // 生存時間（画面外に出るか時間経過で消える）
        this.lifeTime = 480;  // 8秒 * 60fps = 480フレーム
        this.fadeStartTime = 420;  // 7秒目から点滅開始

        // ビジュアル
        this.rotation = 0;
        this.glow = 0;

        // タイプ別設定
        this.setupType();
    }

    setupType() {
        const types = {
            // デフォルト武器レベルアップ（水色）
            weapon_default: {
                color: '#00ffff',
                icon: 'B',
                description: 'Beam Level Up'
            },
            // 緑武器レベルアップ
            weapon_green: {
                color: '#00ff00',
                icon: 'S',
                description: 'Spread Level Up'
            },
            // 紫武器レベルアップ
            weapon_purple: {
                color: '#ff00ff',
                icon: 'L',
                description: 'Laser Level Up'
            },
            // 黄色武器レベルアップ
            weapon_yellow: {
                color: '#ffff00',
                icon: 'W',
                description: 'Wave Level Up'
            },
            // HP回復（ハートマーク）
            heart: {
                color: '#ff0066',
                icon: '❤',
                description: 'HP Recovery'
            },
            // オプション機体
            option: {
                color: '#00ffff',
                icon: 'O',
                description: 'Option Unit'
            }
        };

        const config = types[this.type] || types.weapon_default;
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

        // アイテムタイプ別の形状描画
        switch (this.type) {
            case 'weapon':
                // 稲妻型（攻撃的な形状）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 4, -this.height / 6);
                ctx.lineTo(this.width / 6, -this.height / 6);
                ctx.lineTo(-this.width / 6, this.height / 6);
                ctx.lineTo(this.width / 4, this.height / 6);
                ctx.lineTo(0, this.height / 2);
                ctx.closePath();
                break;

            case 'power':
                // 炎型（パワーアップを表現）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.bezierCurveTo(
                    -this.width / 2, -this.height / 3,
                    -this.width / 3, this.height / 3,
                    0, this.height / 2
                );
                ctx.bezierCurveTo(
                    this.width / 3, this.height / 3,
                    this.width / 2, -this.height / 3,
                    0, -this.height / 2
                );
                ctx.closePath();
                break;

            case 'life':
                // ハート型（より明確に）
                const w = this.width / 2;
                const h = this.height / 2;
                ctx.beginPath();
                ctx.moveTo(0, -h * 0.3);
                ctx.bezierCurveTo(-w * 0.5, -h, -w, -h * 0.5, -w, 0);
                ctx.bezierCurveTo(-w, h * 0.5, 0, h, 0, h);
                ctx.bezierCurveTo(0, h, w, h * 0.5, w, 0);
                ctx.bezierCurveTo(w, -h * 0.5, w * 0.5, -h, 0, -h * 0.3);
                ctx.closePath();
                break;

            case 'bomb':
                // 爆弾型（丸い本体と導火線）
                ctx.beginPath();
                ctx.arc(0, this.height / 6, this.width / 3, 0, Math.PI * 2);
                ctx.moveTo(0, -this.height / 6);
                ctx.lineTo(0, -this.height / 2);
                // 導火線の火花
                ctx.moveTo(-5, -this.height / 2);
                ctx.lineTo(5, -this.height / 2);
                break;

            case 'shield':
                // シールド型（盾の形）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, -this.height / 3);
                ctx.lineTo(-this.width / 2, this.height / 3);
                ctx.quadraticCurveTo(-this.width / 2, this.height / 2, 0, this.height / 2);
                ctx.quadraticCurveTo(this.width / 2, this.height / 2, this.width / 2, this.height / 3);
                ctx.lineTo(this.width / 2, -this.height / 3);
                ctx.closePath();
                break;

            case 'speed':
                // 矢印型（スピードアップ）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, 0);
                ctx.lineTo(-this.width / 4, 0);
                ctx.lineTo(-this.width / 4, this.height / 2);
                ctx.lineTo(this.width / 4, this.height / 2);
                ctx.lineTo(this.width / 4, 0);
                ctx.lineTo(this.width / 2, 0);
                ctx.closePath();
                break;

            case 'score':
                // 星型（スコアアップ）
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                    const outerRadius = this.width / 2;
                    const innerRadius = outerRadius * 0.4;
                    const x1 = Math.cos(angle) * outerRadius;
                    const y1 = Math.sin(angle) * outerRadius;
                    const angle2 = angle + Math.PI / 5;
                    const x2 = Math.cos(angle2) * innerRadius;
                    const y2 = Math.sin(angle2) * innerRadius;
                    if (i === 0) ctx.moveTo(x1, y1);
                    else ctx.lineTo(x1, y1);
                    ctx.lineTo(x2, y2);
                }
                ctx.closePath();
                break;

            default:
                // その他特殊アイテム（ダイヤ型）
                ctx.beginPath();
                ctx.moveTo(0, -this.height / 2);
                ctx.lineTo(-this.width / 2, 0);
                ctx.lineTo(0, this.height / 2);
                ctx.lineTo(this.width / 2, 0);
                ctx.closePath();
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
        // 取得判定を適度に緩和（実際のサイズより少し大きめ）
        const multiplier = 2.0;  // 判定を2倍に拡大（適正化）
        return {
            x: this.x - this.width * multiplier / 2,
            y: this.y - this.height * multiplier / 2,
            width: this.width * multiplier,
            height: this.height * multiplier
        };
    }
}