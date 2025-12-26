// Boss Warning System - Space Odyssey

function showBossWarning(game, bossName) {
    // 警告音を再生
    if (typeof playSFX === 'function') {
        playSFX('boss_warning');
    }

    // 画面全体を暗くする
    const overlay = document.createElement('div');
    overlay.id = 'bossWarningOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(ellipse at center, rgba(255,0,0,0.2) 0%, rgba(0,0,0,0.95) 100%);
        z-index: 9998;
        animation: warningPulse 0.5s infinite;
    `;

    // ボス画像を表示（アニメーション付き）
    const bossImage = document.createElement('img');
    const stage = game ? game.stage : 1;
    const bossNumber = Math.min(stage, 11);
    bossImage.src = `assets/images/boss_${String(bossNumber).padStart(2, '0')}.PNG`;
    bossImage.onerror = () => {
        // PNGが見つからない場合はSVGを試す
        bossImage.src = `assets/images/bosses/boss_${String(bossNumber).padStart(2, '0')}.svg`;
    };
    bossImage.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 250px;
        height: 250px;
        object-fit: contain;
        z-index: 10001;
        filter: drop-shadow(0 0 30px #ff0000) drop-shadow(0 0 50px #ff0000);
        animation: bossAppear 1s ease-out forwards;
    `;

    // WARNING テキスト（位置調整）
    const warningText = document.createElement('div');
    warningText.style.cssText = `
        position: fixed;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 72px;
        font-weight: bold;
        color: #ff0000;
        text-shadow:
            0 0 20px #ff0000,
            0 0 40px #ff0000,
            0 0 60px #ff0000,
            0 0 80px #ff0000;
        z-index: 10000;
        letter-spacing: 10px;
        animation: warningFlash 0.2s infinite, warningShake 0.1s infinite;
        font-family: 'Impact', sans-serif;
    `;
    warningText.textContent = '⚠️ WARNING ⚠️';

    // BOSS APPROACHING（位置調整）
    const bossText = document.createElement('div');
    bossText.style.cssText = `
        position: fixed;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        font-weight: bold;
        color: #ffff00;
        text-shadow:
            0 0 10px #ffaa00,
            0 0 20px #ff6600,
            0 0 30px #ff3300;
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
    `;
    bossText.textContent = 'BOSS APPROACHING';

    // ボス名（位置調整）
    const nameText = document.createElement('div');
    nameText.style.cssText = `
        position: fixed;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 36px;
        font-weight: bold;
        color: #ffffff;
        text-shadow:
            0 0 10px #00ffff,
            0 0 20px #0099ff;
        z-index: 10000;
        animation: fadeIn 1s ease-out;
    `;
    nameText.textContent = bossName || 'UNKNOWN THREAT';

    // 雷エフェクト
    const lightning = document.createElement('div');
    lightning.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        animation: lightning 0.3s infinite;
        background: linear-gradient(
            45deg,
            transparent 48%,
            rgba(255,255,255,0.8) 50%,
            transparent 52%
        );
        opacity: 0;
    `;

    // スキャンライン効果
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        background: repeating-linear-gradient(
            0deg,
            rgba(255,0,0,0.1) 0px,
            transparent 2px,
            transparent 4px,
            rgba(255,0,0,0.1) 4px
        );
        animation: scanMove 0.5s infinite linear;
    `;

    // カウントダウン
    const countdown = document.createElement('div');
    countdown.style.cssText = `
        position: fixed;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 144px;
        font-weight: bold;
        color: #ff0000;
        text-shadow:
            0 0 30px #ff0000,
            0 0 60px #ff0000;
        z-index: 10001;
        font-family: 'Digital', monospace;
    `;

    // CSSアニメーションを追加
    if (!document.getElementById('bossWarningStyles')) {
        const style = document.createElement('style');
        style.id = 'bossWarningStyles';
        style.textContent = `
            @keyframes warningPulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }
            @keyframes warningFlash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            @keyframes warningShake {
                0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
                25% { transform: translate(-52%, -50%) rotate(-1deg); }
                75% { transform: translate(-48%, -50%) rotate(1deg); }
            }
            @keyframes slideIn {
                from { transform: translate(-50%, -50%) scale(0); }
                to { transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes lightning {
                0%, 90%, 100% { opacity: 0; }
                95% { opacity: 1; }
            }
            @keyframes scanMove {
                from { transform: translateY(0); }
                to { transform: translateY(4px); }
            }
            @keyframes explosionPulse {
                0% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.5); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes bossAppear {
                0% {
                    transform: translate(-50%, -50%) scale(0) rotate(720deg);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2) rotate(360deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // DOM に追加
    document.body.appendChild(overlay);
    document.body.appendChild(bossImage);  // ボス画像を追加
    document.body.appendChild(warningText);
    document.body.appendChild(bossText);
    document.body.appendChild(nameText);
    document.body.appendChild(lightning);
    document.body.appendChild(scanlines);
    document.body.appendChild(countdown);

    // カウントダウン処理
    let count = 3;
    countdown.textContent = count;

    const countInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdown.textContent = count;
            countdown.style.animation = 'explosionPulse 0.5s';
        } else {
            countdown.textContent = 'FIGHT!';
            countdown.style.color = '#00ffff';
            clearInterval(countInterval);

            // 1秒後に全て削除
            setTimeout(() => {
                overlay.remove();
                bossImage.remove();  // ボス画像も削除
                warningText.remove();
                bossText.remove();
                nameText.remove();
                lightning.remove();
                scanlines.remove();
                countdown.remove();
            }, 1000);
        }
    }, 1000);
}