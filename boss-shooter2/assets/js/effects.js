// Visual effects - Space Odyssey
let screenShake = 0;
let screenFlash = 0;

function shakeScreen(intensity) {
    screenShake = intensity;
}

function createScreenFlash() {
    screenFlash = 1;
}

function updateEffects(game) {
    // 画面振動
    if (screenShake > 0) {
        const canvas = game.canvas;
        const ctx = game.ctx;

        ctx.save();
        ctx.translate(
            (Math.random() - 0.5) * screenShake,
            (Math.random() - 0.5) * screenShake
        );

        screenShake *= 0.9;
        if (screenShake < 0.1) screenShake = 0;
    }

    // 画面フラッシュ
    if (screenFlash > 0) {
        const ctx = game.ctx;
        ctx.fillStyle = `rgba(255, 255, 255, ${screenFlash})`;
        ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

        screenFlash -= 0.05;
        if (screenFlash < 0) screenFlash = 0;
    }
}

// 画面エフェクトのリセット
function resetEffects() {
    screenShake = 0;
    screenFlash = 0;
}