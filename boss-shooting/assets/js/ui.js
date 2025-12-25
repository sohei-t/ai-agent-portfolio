// UI management - Space Odyssey
function updateUI(game) {
    // スコア表示
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `SCORE: ${game.score.toLocaleString()}`;
    }

    // ライフ表示（改善版 - より見やすく）
    const livesElement = document.getElementById('lives');
    if (livesElement) {
        // 残機数を大きく表示
        let livesHtml = '<span style="font-size: 18px; font-weight: bold; color: #ff3333;">LIFE: </span>';

        // 残機を大きなハートで表示
        for (let i = 0; i < game.lives; i++) {
            livesHtml += '<span style="font-size: 24px; margin: 0 2px;">❤️</span>';
        }

        // 失った残機を薄いハートで表示（最大5機まで表示）
        for (let i = game.lives; i < 5; i++) {
            livesHtml += '<span style="font-size: 24px; margin: 0 2px; opacity: 0.3;">🤍</span>';
        }

        // 残機数を数字でも表示
        livesHtml += `<span style="font-size: 20px; font-weight: bold; margin-left: 10px; color: #ffff00;"> (${game.lives})</span>`;

        livesElement.innerHTML = livesHtml;

        // 残機が少ない時は警告色にする
        if (game.lives <= 1) {
            livesElement.style.color = '#ff0000';
            // 点滅アニメーションを追加
            if (!livesElement.classList.contains('blinking')) {
                livesElement.classList.add('blinking');
            }
        } else {
            livesElement.style.color = '';
            livesElement.classList.remove('blinking');
        }
    }

    // ボス戦タイマー表示（3分カウントダウン - 最終ステージ以外）
    const bossTimerElement = document.getElementById('bossTimer');
    if (bossTimerElement) {
        if (game.boss && game.stage < 10 && game.bossStageStartTime) {
            const elapsedTime = Date.now() - game.bossStageStartTime;
            const timeLimit = 10000; // テスト用: 10秒（本番は180000）
            const remainingTime = Math.max(0, timeLimit - elapsedTime);

            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);

            let timerColor = '#00ff00';  // 緑
            if (remainingTime <= 3000) timerColor = '#ff0000';  // 3秒以下は赤
            else if (remainingTime <= 5000) timerColor = '#ffaa00';  // 5秒以下は黄色

            bossTimerElement.innerHTML = `<span style="color: ${timerColor}; font-size: 20px; font-weight: bold;">TIME: ${minutes}:${seconds.toString().padStart(2, '0')}</span>`;
            bossTimerElement.style.display = 'block';
        } else if (game.boss && game.stage >= 10) {
            // 最終ステージはタイマーなし
            bossTimerElement.innerHTML = '<span style="color: #ff00ff; font-size: 20px; font-weight: bold;">FINAL BOSS</span>';
            bossTimerElement.style.display = 'block';
        } else {
            bossTimerElement.style.display = 'none';
        }
    }

    // プレイヤーHP表示（新規追加）
    const playerHpElement = document.getElementById('playerHp');
    if (playerHpElement && game.player) {
        const maxHp = 100;  // プレイヤーの最大HP
        const currentHp = game.player.hp || maxHp;
        const hpPercent = (currentHp / maxHp) * 100;

        // HPバー表示
        let hpBar = '<span style="color: #00ff00">HP: </span>';
        const barLength = 20;
        const filledBars = Math.round((hpPercent / 100) * barLength);

        // HP残量で色を変更
        let color = '#00ff00';  // 緑
        if (hpPercent <= 30) color = '#ff0000';  // 赤
        else if (hpPercent <= 60) color = '#ffaa00';  // 黄色

        hpBar += `<span style="color: ${color}">`;
        for (let i = 0; i < barLength; i++) {
            hpBar += i < filledBars ? '█' : '░';
        }
        hpBar += '</span>';
        hpBar += ` ${Math.round(hpPercent)}%`;

        playerHpElement.innerHTML = hpBar;
    }

    // 武器レベル表示（パワーアップ状態を明確に表示）
    const weaponElement = document.getElementById('weaponLevel');
    if (weaponElement && game.player) {
        const weaponTypes = {
            'beam': 'BEAM',
            'spread': 'SPREAD',
            'laser': 'LASER',
            'homing': 'HOMING',
            'wave': 'WAVE'
        };
        const weaponName = weaponTypes[game.player.weapon.type] || 'BEAM';
        const level = game.player.weapon.level;
        const maxLevel = 5;
        let gauge = '';
        for (let i = 0; i < maxLevel; i++) {
            gauge += i < level ? '■' : '□';
        }

        // 武器の色を種類によって変更
        let weaponColor = '#00ffff';
        switch(game.player.weapon.type) {
            case 'spread': weaponColor = '#ff9900'; break;
            case 'laser': weaponColor = '#00ff99'; break;
            case 'homing': weaponColor = '#9900ff'; break;
            case 'wave': weaponColor = '#00ccff'; break;
        }

        weaponElement.innerHTML = `<span style="color: ${weaponColor}">${weaponName}</span>: LV${level} <span style="color: ${weaponColor}">${gauge}</span>`;
    }

    // チャージインジケーター（チャージ中のみ表示）
    const chargeElement = document.getElementById('chargeIndicator');
    if (chargeElement && game.player && game.player.weapon.charging) {
        chargeElement.style.display = 'block';
        const chargePercent = (game.player.weapon.chargeTime / game.player.weapon.maxCharge) * 100;

        // チャージバー表示
        let chargeBar = '<span style="color: #ffff00">CHARGE: </span>';
        const barLength = 15;
        const filledBars = Math.round((chargePercent / 100) * barLength);

        // チャージ量で色を変更
        let color = '#ffff00';  // 黄色
        if (chargePercent >= 80) color = '#ff00ff';  // 紫（フルチャージ近く）
        else if (chargePercent >= 50) color = '#ff9900';  // オレンジ

        chargeBar += `<span style="color: ${color}; text-shadow: 0 0 5px ${color}">`;
        for (let i = 0; i < barLength; i++) {
            chargeBar += i < filledBars ? '▮' : '▯';
        }
        chargeBar += '</span>';
        chargeBar += ` ${Math.round(chargePercent)}%`;

        chargeElement.innerHTML = chargeBar;
    } else if (chargeElement) {
        chargeElement.style.display = 'none';
    }

    // ボム数表示
    const bombsElement = document.getElementById('bombs');
    if (bombsElement) {
        let bombsHtml = '💣 x' + game.bombs;
        bombsElement.innerHTML = bombsHtml;
    }

    // ボスHP表示
    const bossHealthBar = document.getElementById('bossHealthBar');
    if (bossHealthBar && game.boss) {
        const hpPercent = (game.boss.hp / game.boss.maxHp) * 100;
        bossHealthBar.style.width = hpPercent + '%';

        // HPによって色を変更
        if (hpPercent > 66) {
            bossHealthBar.style.background = 'linear-gradient(90deg, #ff0000, #ff6600)';
        } else if (hpPercent > 33) {
            bossHealthBar.style.background = 'linear-gradient(90deg, #ff6600, #ffaa00)';
        } else {
            bossHealthBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffff00)';
        }
    }
}