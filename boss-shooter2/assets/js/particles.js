// Particle effects - Space Odyssey
class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.life = life;
        this.maxLife = life;
        this.gravity = 0;
        this.fade = true;
    }

    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        // 摩擦
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.life--;

        // サイズ減少
        if (this.life < this.maxLife / 2) {
            this.size *= 0.95;
        }
    }

    render(ctx) {
        ctx.save();

        const lifeRatio = this.life / this.maxLife;
        ctx.globalAlpha = this.fade ? lifeRatio : 1;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

function createParticles(game, x, y, type) {
    const configs = {
        small: {
            count: 10,
            speed: 3,
            size: 2,
            life: 30,
            colors: ['#ff6600', '#ffaa00', '#ffff00']
        },
        medium: {
            count: 20,
            speed: 5,
            size: 3,
            life: 40,
            colors: ['#ff0000', '#ff6600', '#ffaa00', '#ffff00']
        },
        large: {
            count: 30,
            speed: 7,
            size: 4,
            life: 50,
            colors: ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffcc00']
        },
        powerup: {
            count: 15,
            speed: 2,
            size: 2,
            life: 40,
            colors: ['#00ffff', '#00ff00', '#ffff00']
        }
    };

    const config = configs[type] || configs.small;

    for (let i = 0; i < config.count; i++) {
        const angle = (Math.PI * 2 / config.count) * i + Math.random() * 0.5;
        const speed = config.speed * (0.5 + Math.random() * 0.5);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        const size = config.size * (0.5 + Math.random() * 0.5);

        const particle = new Particle(x, y, vx, vy, color, size, config.life);
        game.particles.push(particle);
    }

    // 追加エフェクト（火花）
    if (type === 'large') {
        for (let i = 0; i < 10; i++) {
            const spark = new Particle(
                x, y,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                '#ffffff',
                1,
                20
            );
            spark.gravity = 0.2;
            game.particles.push(spark);
        }
    }
}

// スターフィールドパーティクル
function createStarfield(game) {
    const star = new Particle(
        Math.random() * game.canvas.width,
        -10,
        0,
        1 + Math.random() * 2,
        'white',
        Math.random() * 2,
        game.canvas.height + 20
    );
    star.fade = false;
    game.particles.push(star);
}