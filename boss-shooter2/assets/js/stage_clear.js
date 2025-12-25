// Stage Clear System - Space Odyssey

function showStageClear(game, stageNumber) {
    // ゲームを一時停止
    game.isPaused = true;

    // 勝利音を再生
    if (typeof playSFX === 'function') {
        playSFX('stage_clear');
    }

    // オーバーレイ
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(ellipse at center, rgba(0,255,255,0.2) 0%, rgba(0,0,50,0.95) 100%);
        z-index: 9998;
        animation: clearFadeIn 0.5s ease-out;
    `;

    // STAGE CLEAR
    const clearText = document.createElement('div');
    clearText.style.cssText = `
        position: fixed;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 64px;
        font-weight: bold;
        background: linear-gradient(45deg, #00ffff, #ffff00, #00ffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow:
            0 0 30px #00ffff,
            0 0 60px #00ffff;
        z-index: 10000;
        animation: clearZoom 0.5s ease-out, clearGlow 1s infinite;
    `;
    clearText.textContent = 'STAGE CLEAR!';

    // ステージ番号
    const stageText = document.createElement('div');
    stageText.style.cssText = `
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        color: #ffffff;
        z-index: 10000;
        animation: fadeIn 1s ease-out;
    `;
    stageText.textContent = `STAGE ${stageNumber} COMPLETED`;

    // ボーナススコア計算
    const bonusContainer = document.createElement('div');
    bonusContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 10000;
        animation: slideUp 0.5s ease-out;
    `;

    // ボーナス項目を順番に表示
    const bonuses = [
        { label: 'TIME BONUS', value: 5000 },
        { label: 'NO MISS BONUS', value: game.lives === 3 ? 10000 : 0 },
        { label: 'PERFECT CLEAR', value: 20000 }
    ];

    let totalBonus = 0;
    let bonusHTML = '<div style="color: #ffff00; font-size: 24px; margin-bottom: 20px;">BONUS POINTS</div>';

    bonuses.forEach((bonus, index) => {
        if (bonus.value > 0) {
            totalBonus += bonus.value;
            bonusHTML += `
                <div style="
                    color: #ffffff;
                    font-size: 18px;
                    margin: 10px 0;
                    opacity: 0;
                    animation: fadeIn 0.5s ease-out ${index * 0.3}s forwards;
                ">
                    ${bonus.label}: <span style="color: #00ff00;">+${bonus.value.toLocaleString()}</span>
                </div>
            `;
        }
    });

    bonusHTML += `
        <div style="
            color: #ffff00;
            font-size: 28px;
            margin-top: 20px;
            opacity: 0;
            animation: fadeIn 0.5s ease-out 1.5s forwards, pulse 1s infinite 2s;
        ">
            TOTAL: <span style="color: #00ffff;">+${totalBonus.toLocaleString()}</span>
        </div>
    `;

    bonusContainer.innerHTML = bonusHTML;

    // 次ステージ案内
    const nextStageText = document.createElement('div');
    nextStageText.style.cssText = `
        position: fixed;
        bottom: 15%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #00ffff;
        text-shadow: 0 0 10px #00ffff;
        z-index: 10000;
        opacity: 0;
        animation: fadeIn 1s ease-out 2s forwards, blink 1s infinite 3s;
    `;
    // ステージ11クリア時はエンディングページへ
    if (stageNumber >= 11) {
        nextStageText.textContent = `CONGRATULATIONS!`;
        nextStageText.style.fontSize = '36px';
        nextStageText.style.color = '#ffff00';
    } else {
        nextStageText.textContent = `NEXT STAGE: ${stageNumber + 1}`;
    }

    // GET READY
    const readyText = document.createElement('div');
    readyText.style.cssText = `
        position: fixed;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: #ffffff;
        z-index: 10000;
        opacity: 0;
        animation: fadeIn 1s ease-out 2.5s forwards;
    `;
    readyText.textContent = 'GET READY!';

    // パーティクルエフェクト
    const createParticle = () => {
        const particle = document.createElement('div');
        const x = Math.random() * window.innerWidth;
        const size = Math.random() * 4 + 2;

        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            bottom: -20px;
            width: ${size}px;
            height: ${size}px;
            background: #${Math.random() > 0.5 ? '00ffff' : 'ffff00'};
            border-radius: 50%;
            z-index: 9999;
            animation: floatUp 3s ease-out forwards;
        `;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    };

    // パーティクルを定期的に生成
    const particleInterval = setInterval(createParticle, 100);

    // CSSアニメーション
    if (!document.getElementById('stageClearStyles')) {
        const style = document.createElement('style');
        style.id = 'stageClearStyles';
        style.textContent = `
            @keyframes clearFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes clearZoom {
                from { transform: translate(-50%, -50%) scale(0); }
                to { transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes clearGlow {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(1.3); }
            }
            @keyframes slideUp {
                from { transform: translate(-50%, 100%); opacity: 0; }
                to { transform: translate(-50%, -50%); opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.3; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            @keyframes floatUp {
                to {
                    transform: translateY(-${window.innerHeight}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // DOM に追加
    document.body.appendChild(overlay);
    document.body.appendChild(clearText);
    document.body.appendChild(stageText);
    document.body.appendChild(bonusContainer);
    document.body.appendChild(nextStageText);
    document.body.appendChild(readyText);

    // スコア追加
    game.addScore(totalBonus);

    // 4秒後に削除して次のステージへ
    setTimeout(() => {
        clearInterval(particleInterval);
        overlay.remove();
        clearText.remove();
        stageText.remove();
        bonusContainer.remove();
        nextStageText.remove();
        readyText.remove();

        // ステージ11クリア時はエンディングページへ
        if (stageNumber >= 11) {
            // スコアを保存
            const currentScore = game.score || 0;
            window.location.href = `ending.html?score=${currentScore}`;
        } else {
            // ゲーム再開
            game.isPaused = false;

            // 次のステージをロード
            if (typeof loadStage === 'function') {
                loadStage(game, stageNumber + 1);
            }
        }
    }, 4000);
}