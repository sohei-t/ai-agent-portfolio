// Save/Load system - Space Odyssey
const SAVE_KEY = 'spaceOdyssey_saveData';
const HIGHSCORE_KEY = 'spaceOdyssey_highScores';

function saveGame() {
    const saveData = {
        version: '1.0.0',
        player: {
            highScore: game ? game.score : 0,
            totalPlayTime: Date.now(),
            stagesCleared: game ? game.stage - 1 : 0
        },
        stages: [],
        settings: game ? game.settings : {
            bgmVolume: 0.5,
            sfxVolume: 0.7,
            effectQuality: 'medium',
            showFPS: false
        },
        achievements: []
    };

    // ステージ情報
    for (let i = 1; i <= 10; i++) {
        saveData.stages.push({
            stageNumber: i,
            unlocked: i <= (game ? game.stage : 1),
            bestScore: 0,
            bestTime: 0,
            difficulty: 'normal'
        });
    }

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    return saveData;
}

function loadGame() {
    const savedData = localStorage.getItem(SAVE_KEY);

    if (savedData) {
        try {
            return JSON.parse(savedData);
        } catch (e) {
            console.error('セーブデータの読み込みエラー:', e);
            return getDefaultSaveData();
        }
    }

    return getDefaultSaveData();
}

function getDefaultSaveData() {
    return {
        version: '1.0.0',
        player: {
            highScore: 0,
            totalPlayTime: 0,
            stagesCleared: 0
        },
        stages: Array(10).fill(0).map((_, i) => ({
            stageNumber: i + 1,
            unlocked: i === 0,
            bestScore: 0,
            bestTime: 0,
            difficulty: 'normal'
        })),
        settings: {
            bgmVolume: 0.5,
            sfxVolume: 0.7,
            effectQuality: 'medium',
            showFPS: false
        },
        achievements: []
    };
}

function saveHighScore(score, stage, difficulty) {
    let highScores = loadHighScores();

    const newScore = {
        score: score,
        stage: stage,
        difficulty: difficulty,
        date: new Date().toISOString()
    };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10); // Top 10のみ保持

    localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(highScores));
    return highScores;
}

function loadHighScores() {
    const saved = localStorage.getItem(HIGHSCORE_KEY);

    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('ハイスコアの読み込みエラー:', e);
            return [];
        }
    }

    return [];
}

function clearSaveData() {
    if (confirm('すべてのセーブデータを削除しますか？')) {
        localStorage.removeItem(SAVE_KEY);
        localStorage.removeItem(HIGHSCORE_KEY);
        location.reload();
    }
}

// 実績システム
const achievements = {
    firstKill: {
        id: 'firstKill',
        name: 'First Blood',
        description: '最初の敵を倒す',
        icon: '🎯',
        unlocked: false
    },
    survivor: {
        id: 'survivor',
        name: 'Survivor',
        description: 'ノーダメージでステージクリア',
        icon: '🛡️',
        unlocked: false
    },
    bomber: {
        id: 'bomber',
        name: 'Bomb Master',
        description: '1回のボムで10体以上の敵を倒す',
        icon: '💣',
        unlocked: false
    },
    millionaire: {
        id: 'millionaire',
        name: 'Millionaire',
        description: 'スコア1,000,000点達成',
        icon: '💰',
        unlocked: false
    },
    perfectionist: {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: '全ステージクリア',
        icon: '⭐',
        unlocked: false
    },
    speedRunner: {
        id: 'speedRunner',
        name: 'Speed Runner',
        description: 'ステージ1を2分以内にクリア',
        icon: '⚡',
        unlocked: false
    },
    collector: {
        id: 'collector',
        name: 'Collector',
        description: '1ステージで全種類のパワーアップを取得',
        icon: '📦',
        unlocked: false
    },
    untouchable: {
        id: 'untouchable',
        name: 'Untouchable',
        description: 'ボスをノーダメージで倒す',
        icon: '👑',
        unlocked: false
    },
    expert: {
        id: 'expert',
        name: 'Expert',
        description: 'EXPERTモードでゲームクリア',
        icon: '🏆',
        unlocked: false
    },
    comeback: {
        id: 'comeback',
        name: 'Comeback King',
        description: 'ライフ1から回復してステージクリア',
        icon: '❤️',
        unlocked: false
    }
};

function unlockAchievement(id) {
    if (achievements[id] && !achievements[id].unlocked) {
        achievements[id].unlocked = true;

        // 通知表示
        showAchievementNotification(achievements[id]);

        // セーブデータに記録
        const saveData = loadGame();
        if (!saveData.achievements.includes(id)) {
            saveData.achievements.push(id);
            localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        }

        return true;
    }
    return false;
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.5s ease-out;
        min-width: 250px;
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span style="font-size: 24px; margin-right: 10px;">${achievement.icon}</span>
            <div>
                <div style="font-weight: bold;">実績解除！</div>
                <div style="font-size: 14px;">${achievement.name}</div>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // アニメーションCSS
    if (!document.getElementById('achievementStyle')) {
        const style = document.createElement('style');
        style.id = 'achievementStyle';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}