// UI management - Space Odyssey
function updateUI(game) {
    // スコア表示
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `SCORE: ${game.score.toLocaleString()}`;
    }

    // ライフ表示
    const livesElement = document.getElementById('lives');
    if (livesElement) {
        let heartsHtml = '';
        for (let i = 0; i < game.lives; i++) {
            heartsHtml += '❤️';
        }
        for (let i = game.lives; i < 5; i++) {
            heartsHtml += '🖤';
        }
        livesElement.innerHTML = heartsHtml;
    }

    // 武器レベル表示（パワーアップ状態を明確に表示）
    const weaponElement = document.getElementById('weaponLevel');
    if (weaponElement && game.player) {
        const weaponName = game.player.weapon.type.toUpperCase();
        const level = game.player.weapon.level;
        const maxLevel = 5;
        let gauge = '';
        for (let i = 0; i < maxLevel; i++) {
            gauge += i < level ? '■' : '□';
        }
        weaponElement.innerHTML = `${weaponName}: LV${level} <span style="color: #00ffff">${gauge}</span>`;
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