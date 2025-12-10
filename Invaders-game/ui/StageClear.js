/**
 * StageClear.js
 * Stage clear celebration screen
 */

class StageClear {
  constructor(canvas, ctx) {
    this.canvas = canvas || { width: 800, height: 600 };
    this.ctx = ctx;
    this.wave = 1;
    this.score = 0;
    this.bonusScore = 0;
    this.animationFrame = 0;
    this.displayTime = 3000; // Display for 3 seconds
    this.startTime = 0;
    this.stars = [];
    this.fireworks = [];

    // Initialize celebration effects
    this.initStars();
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random()
      });
    }
  }

  initFireworks() {
    this.fireworks = [];
    // Create firework bursts at random positions
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.createFirework(
          Math.random() * this.canvas.width,
          100 + Math.random() * 200
        );
      }, i * 400);
    }
  }

  createFirework(x, y) {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#ff0080'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particles = [];

    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const speed = 3 + Math.random() * 3;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        color: color
      });
    }

    this.fireworks.push({
      particles: particles,
      active: true
    });
  }

  setStageClear(wave, score, bonusScore) {
    this.wave = wave;
    this.score = score;
    this.bonusScore = bonusScore;
    this.startTime = Date.now();
    this.animationFrame = 0;
    this.initFireworks();
  }

  update() {
    this.animationFrame++;

    // Update stars
    this.stars.forEach(star => {
      star.y += star.speed;
      if (star.y > this.canvas.height) {
        star.y = 0;
        star.x = Math.random() * this.canvas.width;
      }
      star.opacity = 0.5 + Math.sin(this.animationFrame * 0.05 + star.x) * 0.5;
    });

    // Update fireworks
    this.fireworks.forEach(firework => {
      if (!firework.active) return;

      let allDead = true;
      firework.particles.forEach(particle => {
        if (particle.life <= 0) return;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravity
        particle.life -= 0.015;

        if (particle.life > 0) allDead = false;
      });

      if (allDead) firework.active = false;
    });

    // Check if display time has elapsed
    return Date.now() - this.startTime < this.displayTime;
  }

  render() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Dark background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a0a2a');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Render stars
    this.stars.forEach(star => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Render fireworks
    this.fireworks.forEach(firework => {
      if (!firework.active) return;

      firework.particles.forEach(particle => {
        if (particle.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;

        ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
        ctx.restore();
      });
    });

    // Main text
    const centerX = width / 2;
    const centerY = height / 2;

    // "STAGE CLEAR!" text with glow
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00ffff';

    // Animated scaling
    const scale = 1 + Math.sin(this.animationFrame * 0.05) * 0.1;
    ctx.save();
    ctx.translate(centerX, centerY - 100);
    ctx.scale(scale, scale);

    ctx.font = 'bold 48px monospace';
    ctx.fillStyle = '#00ffff';
    ctx.fillText('STAGE CLEAR!', 0, 0);

    ctx.restore();

    // Stage number
    ctx.font = 'bold 32px monospace';
    ctx.fillStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.fillText(`STAGE ${this.wave} COMPLETE`, centerX, centerY - 20);

    // Score info
    ctx.font = '24px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#ffffff';

    ctx.fillText(`Score: ${this.score}`, centerX, centerY + 40);

    if (this.bonusScore > 0) {
      ctx.fillStyle = '#00ff00';
      ctx.shadowColor = '#00ff00';
      ctx.fillText(`Bonus: +${this.bonusScore}`, centerX, centerY + 80);
    }

    // Next stage indicator
    const progress = (Date.now() - this.startTime) / this.displayTime;
    const barWidth = 200;
    const barHeight = 10;
    const barX = centerX - barWidth / 2;
    const barY = centerY + 140;

    // Progress bar background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Progress bar fill
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);

    // Next stage text
    ctx.font = '18px monospace';
    ctx.fillStyle = '#888888';
    ctx.shadowBlur = 0;
    ctx.fillText('Preparing Next Stage...', centerX, barY + 30);

    ctx.restore();
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.StageClear = StageClear;
}