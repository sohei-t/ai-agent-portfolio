// Stage management - Space Odyssey

// グローバル変数の初期化
if (typeof window !== 'undefined') {
    window.stageTimer = 0;
    window.currentWaveIndex = 0;
}

const stageData = {
    1: {
        name: "Space Frontier",
        bgColor: "#000033",
        scrollSpeed: 1,
        enemyWaves: [
            { time: 100, type: 'basic', count: 3, formation: 'line' },
            { time: 300, type: 'fast', count: 5, formation: 'v' },
            { time: 500, type: 'basic', count: 4, formation: 'square' },
            { time: 700, type: 'tank', count: 2, formation: 'line' },
            { time: 900, type: 'sniper', count: 3, formation: 'spread' },
            { time: 1200, type: 'bomber', count: 2, formation: 'line' },
            { time: 1500, type: 'mixed', count: 6, formation: 'random' },
        ],
        midBoss: { time: 1800, type: 'small_boss_01' },
        boss: { time: 2400, type: 'stage1' }
    },
    2: {
        name: "Asteroid Belt",
        bgColor: "#110022",
        scrollSpeed: 1.2,
        enemyWaves: [
            { time: 100, type: 'fast', count: 4, formation: 'diamond' },
            { time: 300, type: 'tank', count: 3, formation: 'line' },
            { time: 500, type: 'sniper', count: 4, formation: 'cross' },
            { time: 800, type: 'mixed', count: 8, formation: 'wave' },
            { time: 1100, type: 'bomber', count: 3, formation: 'v' },
            { time: 1400, type: 'fast', count: 6, formation: 'spiral' },
        ],
        midBoss: { time: 1700, type: 'small_boss_02' },
        boss: { time: 2200, type: 'stage2' }
    },
    3: {
        name: "Nebula Core",
        bgColor: "#220033",
        scrollSpeed: 1.5,
        enemyWaves: [
            { time: 100, type: 'mixed', count: 5, formation: 'random' },
            { time: 400, type: 'tank', count: 4, formation: 'wall' },
            { time: 700, type: 'sniper', count: 5, formation: 'star' },
            { time: 1000, type: 'bomber', count: 4, formation: 'diamond' },
            { time: 1300, type: 'fast', count: 8, formation: 'swarm' },
        ],
        midBoss: { time: 1600, type: 'small_boss_03' },
        boss: { time: 2100, type: 'stage3' }
    },
    4: {
        name: "Quantum Zone",
        bgColor: "#330044",
        scrollSpeed: 1.6,
        enemyWaves: [
            { time: 100, type: 'sniper', count: 6, formation: 'star' },
            { time: 400, type: 'bomber', count: 5, formation: 'wave' },
            { time: 700, type: 'mixed', count: 8, formation: 'random' },
            { time: 1000, type: 'tank', count: 4, formation: 'diamond' },
            { time: 1300, type: 'fast', count: 10, formation: 'spiral' },
        ],
        midBoss: { time: 1600, type: 'small_boss_04' },
        boss: { time: 2100, type: 'stage4' }
    },
    5: {
        name: "Dark Matter Field",
        bgColor: "#220055",
        scrollSpeed: 1.7,
        enemyWaves: [
            { time: 100, type: 'mixed', count: 7, formation: 'chaos' },
            { time: 400, type: 'tank', count: 5, formation: 'wall' },
            { time: 700, type: 'sniper', count: 6, formation: 'cross' },
            { time: 1000, type: 'bomber', count: 4, formation: 'v' },
            { time: 1300, type: 'all', count: 12, formation: 'random' },
        ],
        midBoss: { time: 1600, type: 'small_boss_05' },
        boss: { time: 2100, type: 'stage5' }
    },
    6: {
        name: "Plasma Storm",
        bgColor: "#440022",
        scrollSpeed: 1.8,
        enemyWaves: [
            { time: 100, type: 'fast', count: 12, formation: 'swarm' },
            { time: 400, type: 'mixed', count: 10, formation: 'wave' },
            { time: 700, type: 'tank', count: 6, formation: 'wall' },
            { time: 1000, type: 'all', count: 15, formation: 'random' },
        ],
        midBoss: { time: 1500, type: 'small_boss_06' },
        boss: { time: 2000, type: 'stage6' }
    },
    7: {
        name: "Hyper Dimension",
        bgColor: "#550022",
        scrollSpeed: 1.9,
        enemyWaves: [
            { time: 100, type: 'all', count: 8, formation: 'chaos' },
            { time: 400, type: 'tank', count: 6, formation: 'diamond' },
            { time: 700, type: 'mixed', count: 12, formation: 'spiral' },
            { time: 1000, type: 'fast', count: 15, formation: 'swarm' },
        ],
        midBoss: { time: 1400, type: 'small_boss_07' },
        boss: { time: 1900, type: 'stage7' }
    },
    8: {
        name: "Chaos Realm",
        bgColor: "#660011",
        scrollSpeed: 2.0,
        enemyWaves: [
            { time: 100, type: 'mixed', count: 10, formation: 'ultimate' },
            { time: 400, type: 'all', count: 12, formation: 'chaos' },
            { time: 700, type: 'tank', count: 8, formation: 'wall' },
            { time: 1000, type: 'bomber', count: 10, formation: 'spiral' },
        ],
        midBoss: { time: 1300, type: 'small_boss_08' },
        boss: { time: 1800, type: 'stage8' }
    },
    9: {
        name: "Void Gate",
        bgColor: "#770000",
        scrollSpeed: 2.1,
        enemyWaves: [
            { time: 100, type: 'all', count: 15, formation: 'chaos' },
            { time: 400, type: 'mixed', count: 12, formation: 'ultimate' },
            { time: 700, type: 'tank', count: 10, formation: 'wall' },
        ],
        midBoss: { time: 1200, type: 'small_boss_09' },
        boss: { time: 1700, type: 'stage9' }
    },
    10: {
        name: "Cosmic Abyss",
        bgColor: "#220044",
        scrollSpeed: 2.2,
        enemyWaves: [
            { time: 100, type: 'mixed', count: 12, formation: 'chaos' },
            { time: 400, type: 'bomber', count: 8, formation: 'ultimate' },
            { time: 700, type: 'all', count: 20, formation: 'swarm' },
        ],
        boss: { time: 1500, type: 'stage10' }
    },
    11: {
        name: "Final Dimension",
        bgColor: "#330011",
        scrollSpeed: 2.5,
        enemyWaves: [
            { time: 100, type: 'mixed', count: 15, formation: 'chaos' },
            { time: 500, type: 'tank', count: 8, formation: 'wall' },
            { time: 900, type: 'all', count: 25, formation: 'ultimate' },
        ],
        boss: { time: 1500, type: 'final' }
    }
};

// グローバル変数を window オブジェクトに明示的に定義
window.stageTimer = 0;
window.currentWaveIndex = 0;
window.stageBgm = null;

function loadStage(game, stageNumber) {
    const stage = stageData[stageNumber] || stageData[1];

    // リセット
    window.stageTimer = 0;
    window.currentWaveIndex = 0;
    game.enemies = [];
    game.bullets = [];
    game.powerups = [];
    game.particles = [];
    game.boss = null;

    // ステージ設定
    game.scrollSpeed = stage.scrollSpeed;

    // BGM再生
    if (typeof playBGM === 'function') {
        const bgmMap = {
            1: 'stage_1_2',
            2: 'stage_1_2',
            3: 'stage_3_5',
            4: 'stage_3_5',
            5: 'stage_3_5',
            6: 'stage_6_8',
            7: 'stage_6_8',
            8: 'stage_6_8',
            9: 'stage_9_10',
            10: 'stage_9_10'
        };
        playBGM(bgmMap[stageNumber] || 'stage_1_2');
    }

    // ステージ開始演出
    showStageTitle(stage.name, stageNumber);
}

function updateStage(game) {
    if (!stageData[game.stage]) {
        console.log('Stage data not found for stage:', game.stage);
        return;
    }

    // タイマーの初期化が漏れていた場合の対策
    if (typeof window.stageTimer === 'undefined') {
        window.stageTimer = 0;
        console.log('Initialized stageTimer');
    }
    if (typeof window.currentWaveIndex === 'undefined') {
        window.currentWaveIndex = 0;
        console.log('Initialized currentWaveIndex');
    }

    window.stageTimer++;
    const stage = stageData[game.stage];

    // 敵の出現
    if (window.currentWaveIndex < stage.enemyWaves.length) {
        const wave = stage.enemyWaves[window.currentWaveIndex];

        if (window.stageTimer >= wave.time) {
            console.log(`Spawning wave: ${wave.type} x${wave.count} at time ${window.stageTimer}`);
            spawnWave(game, wave);
            window.currentWaveIndex++;
        }
    }

    // 中ボス出現
    if (stage.midBoss && window.stageTimer === stage.midBoss.time) {
        spawnMidBoss(game, stage.midBoss.type);
    }

    // ボス出現
    if (stage.boss && window.stageTimer === stage.boss.time && !game.boss) {
        game.spawnBoss(stage.boss.type);
    }
}

function spawnWave(game, wave) {
    const formations = {
        line: (count) => {
            const spacing = game.canvas.width / (count + 1);
            const positions = [];
            for (let i = 0; i < count; i++) {
                positions.push({
                    x: spacing * (i + 1),
                    y: -30
                });
            }
            return positions;
        },
        v: (count) => {
            const positions = [];
            const centerX = game.canvas.width / 2;
            for (let i = 0; i < count; i++) {
                const offset = (i - count / 2) * 40;
                positions.push({
                    x: centerX + offset,
                    y: -30 - Math.abs(offset) / 2
                });
            }
            return positions;
        },
        diamond: (count) => {
            const positions = [];
            const centerX = game.canvas.width / 2;
            const centerY = -50;
            const radius = 40;

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 / count) * i;
                positions.push({
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius
                });
            }
            return positions;
        },
        random: (count) => {
            const positions = [];
            for (let i = 0; i < count; i++) {
                positions.push({
                    x: Math.random() * (game.canvas.width - 50) + 25,
                    y: -30 - Math.random() * 50
                });
            }
            return positions;
        },
        square: (count) => {
            return formations.diamond(count);
        },
        spread: (count) => {
            return formations.line(count);
        },
        cross: (count) => {
            const positions = [];
            const centerX = game.canvas.width / 2;
            const centerY = -50;

            for (let i = 0; i < count; i++) {
                if (i % 2 === 0) {
                    positions.push({
                        x: centerX + (i - count / 2) * 30,
                        y: centerY
                    });
                } else {
                    positions.push({
                        x: centerX,
                        y: centerY + (i - count / 2) * 30
                    });
                }
            }
            return positions;
        },
        wall: (count) => {
            const positions = [];
            const cols = Math.ceil(Math.sqrt(count));
            const spacing = game.canvas.width / (cols + 1);

            for (let i = 0; i < count; i++) {
                const col = i % cols;
                const row = Math.floor(i / cols);
                positions.push({
                    x: spacing * (col + 1),
                    y: -30 - row * 40
                });
            }
            return positions;
        },
        wave: (count) => {
            const positions = [];
            for (let i = 0; i < count; i++) {
                positions.push({
                    x: (game.canvas.width / count) * i + 30,
                    y: -30 - Math.sin(i * 0.5) * 30
                });
            }
            return positions;
        },
        spiral: (count) => {
            const positions = [];
            const centerX = game.canvas.width / 2;

            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const radius = 20 + i * 10;
                positions.push({
                    x: centerX + Math.cos(angle) * radius,
                    y: -30 - i * 10
                });
            }
            return positions;
        },
        swarm: (count) => {
            return formations.random(count);
        },
        star: (count) => {
            const positions = [];
            const centerX = game.canvas.width / 2;
            const centerY = -80;

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 / count) * i;
                const radius = i % 2 === 0 ? 30 : 60;
                positions.push({
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius
                });
            }
            return positions;
        },
        chaos: (count) => {
            return formations.random(count);
        },
        ultimate: (count) => {
            // 複数のフォーメーションを組み合わせ
            const positions = [];
            const third = Math.floor(count / 3);

            positions.push(...formations.line(third));
            positions.push(...formations.v(third));
            positions.push(...formations.diamond(count - third * 2));

            return positions;
        }
    };

    // 敵タイプ決定
    let enemyType = wave.type;
    if (wave.type === 'mixed') {
        const types = ['basic', 'fast', 'tank', 'sniper', 'bomber'];
        enemyType = types[Math.floor(Math.random() * types.length)];
    } else if (wave.type === 'all') {
        // すべてのタイプをランダムに
        enemyType = null;
    }

    // フォーメーション取得
    const formation = formations[wave.formation] || formations.random;
    const positions = formation(wave.count);

    // 敵生成
    positions.forEach((pos, index) => {
        setTimeout(() => {
            let type = enemyType;
            if (!type) {
                const types = ['basic', 'fast', 'tank', 'sniper', 'bomber'];
                type = types[Math.floor(Math.random() * types.length)];
            }
            game.spawnEnemy(type, pos.x, pos.y);
        }, index * 100);
    });
}

function spawnMidBoss(game, type) {
    // 中ボスは通常の敵として生成（大型・高HP）
    if (typeof Enemy !== 'undefined') {
        const midBoss = new Enemy(game.canvas.width / 2, -50, 'tank', game);
        midBoss.width = 100;  // 64→100（大型化）
        midBoss.height = 100;  // 64→100（大型化）
        midBoss.hp = 50;  // 20→50（2.5倍）
        midBoss.maxHp = 50;  // 20→50（2.5倍）
        midBoss.scoreValue = 5000;
        midBoss.movePattern = 'hover';
        midBoss.attackPattern = 'spread';
        midBoss.color = '#ff00ff';
        midBoss.attackInterval = 50;  // 攻撃頻度を上げる

        game.enemies.push(midBoss);
    }

    // 警告音
    if (typeof playSFX === 'function') {
        playSFX('warning');
    }
}

function showStageTitle(name, number) {
    const title = document.createElement('div');
    title.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 32px;
        font-weight: bold;
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
        z-index: 1000;
        pointer-events: none;
        text-align: center;
    `;
    title.innerHTML = `
        <div>STAGE ${number}</div>
        <div style="font-size: 24px; margin-top: 10px;">${name}</div>
    `;

    document.body.appendChild(title);

    // アニメーション
    title.style.animation = 'fadeInOut 3s ease-in-out';

    // CSSアニメーション追加
    if (!document.getElementById('stageAnimStyle')) {
        const style = document.createElement('style');
        style.id = 'stageAnimStyle';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                30% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        title.remove();
    }, 3000);
}