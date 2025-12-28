// Game main script - Space Odyssey
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // ゲーム状態
        this.state = 'title'; // title, playing, paused, gameover, victory
        this.difficulty = 'normal';
        this.score = 0;
        this.stage = 1;
        this.lives = 3;
        this.bombs = 3;
        this.isPaused = false;

        // ゲームオブジェクト
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.powerups = [];
        this.particles = [];
        this.boss = null;

        // ボス管理システム
        this.bosses = [];  // 現在のステージに出現している全ボス
        this.defeatedBosses = [];  // 撃破済みボスのステージ番号リスト

        // ゲーム設定
        this.settings = {
            bgmVolume: 0.5,
            sfxVolume: 0.7,
            effectQuality: 'medium',
            showFPS: false
        };

        // パフォーマンス
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = 0;
        this.deltaTime = 0;

        // 背景スクロール
        this.scrollY = 0;
        this.scrollSpeed = 1;

        // 難易度設定
        this.difficultySettings = {
            easy: { enemyHpMultiplier: 0.7, playerLives: 5, scoreMultiplier: 0.8 },
            normal: { enemyHpMultiplier: 1.0, playerLives: 3, scoreMultiplier: 1.0 },
            hard: { enemyHpMultiplier: 1.5, playerLives: 2, scoreMultiplier: 1.5 },
            expert: { enemyHpMultiplier: 2.0, playerLives: 1, scoreMultiplier: 2.0 }
        };

        // 初期化
        this.init();
    }

    init() {
        // Canvas サイズ設定（モバイル対応）
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // 入力マネージャー初期化
        if (typeof initInputManager === 'function') {
            this.inputManager = initInputManager(this);
        }

        // ゲームループ開始
        this.lastTime = performance.now();
        this.gameLoop();

        // セーブデータ読み込み
        if (typeof loadGame === 'function') {
            const saveData = loadGame();
            if (saveData) {
                this.settings = saveData.settings || this.settings;
                this.applySettings();
            }
        }
    }

    resizeCanvas() {
        // Canvas実サイズをウィンドウサイズに設定
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // ゲーム内座標系を保持
        this.gameWidth = window.innerWidth;
        this.gameHeight = window.innerHeight;

        // 画質設定
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }

    gameLoop(timestamp) {
        // デルタタイム計算
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // FPS計算
        this.frameCount++;
        if (this.frameCount % 60 === 0 && this.settings.showFPS) {
            this.fps = Math.round(1 / this.deltaTime);
        }

        // ゲーム状態による処理
        if (this.state === 'playing' && !this.isPaused) {
            this.update(this.deltaTime);
            this.render();
        } else if (this.state === 'title') {
            this.renderTitleScreen();
        } else if (this.isPaused) {
            this.render();
            this.renderPauseScreen();
        }

        // 次フレーム
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
        // 背景スクロール
        this.scrollY += this.scrollSpeed;
        if (this.scrollY > this.gameHeight) {
            this.scrollY = 0;
        }

        // プレイヤー更新
        if (this.player) {
            this.player.update(dt);

            // 画面外制限（ゲーム座標系を使用）
            this.player.x = Math.max(16, Math.min(this.gameWidth - 16, this.player.x));
            this.player.y = Math.max(16, Math.min(this.gameHeight - 16, this.player.y));
        }

        // 敵更新
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(dt);

            // 画面外の敵を削除
            if (enemy.y > this.canvas.height + 50 || enemy.hp <= 0) {
                if (enemy.hp <= 0) {
                    this.addScore(enemy.scoreValue);
                    this.createExplosion(enemy.x, enemy.y, 'small');

                    // アイテムドロップ（10%の確率）
                    if (Math.random() < 0.1) {
                        this.spawnPowerup(enemy.x, enemy.y);
                    }
                }
                this.enemies.splice(i, 1);
            }
        }

        // 弾更新
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.update(dt);

            // 画面外の弾を削除
            if (bullet.y < -10 || bullet.y > this.canvas.height + 10 ||
                bullet.x < -10 || bullet.x > this.canvas.width + 10) {
                this.bullets.splice(i, 1);
            }
        }

        // パワーアップ更新
        for (let i = this.powerups.length - 1; i >= 0; i--) {
            const powerup = this.powerups[i];
            powerup.update(dt);

            if (powerup.y > this.canvas.height + 20) {
                this.powerups.splice(i, 1);
            }
        }

        // パーティクル更新
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(dt);

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // 複数ボス更新
        for (let i = this.bosses.length - 1; i >= 0; i--) {
            const boss = this.bosses[i];
            if (boss.destroyed || boss.hp <= 0) {
                // 破壊済みボスは配列から削除（onBossDefeatedで処理済み）
                if (!boss.destroyProcessed) {
                    boss.destroyProcessed = true;
                    // destroy()が呼ばれていない場合は呼ぶ
                    if (!boss.destroyed && boss.hp <= 0) {
                        boss.destroy();
                    }
                }
            } else {
                boss.update(dt);
            }
        }

        // 旧互換性のためのボス更新（削除予定）
        if (this.boss && !this.bosses.includes(this.boss)) {
            if (this.boss.destroyed || this.boss.hp <= 0) {
                this.boss = null;
            } else {
                this.boss.update(dt);
            }
        }

        // 当たり判定
        if (typeof checkCollisions === 'function') {
            checkCollisions(this);
        }

        // ステージ進行
        if (typeof updateStage === 'function') {
            updateStage(this);
        }
    }

    render() {
        // 画面クリア（実際のcanvasサイズで）
        this.ctx.fillStyle = '#000033';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 背景（星）
        this.renderBackground();

        // ゲームオブジェクト描画
        this.powerups.forEach(p => p.render(this.ctx));
        this.bullets.forEach(b => b.render(this.ctx));

        if (this.player) {
            this.player.render(this.ctx);
        }

        this.enemies.forEach(e => e.render(this.ctx));

        // 複数ボス描画
        this.bosses.forEach(boss => boss.render(this.ctx));

        // 旧互換性のためのボス描画（削除予定）
        if (this.boss && !this.bosses.includes(this.boss)) {
            this.boss.render(this.ctx);
        }

        this.particles.forEach(p => p.render(this.ctx));

        // UI更新
        if (typeof updateUI === 'function') {
            updateUI(this);
        }

        // FPS表示
        if (this.settings.showFPS) {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '12px monospace';
            this.ctx.fillText(`FPS: ${this.fps}`, 10, this.canvas.height - 10);
        }
    }

    renderBackground() {
        // 簡易的な星空背景
        this.ctx.fillStyle = 'white';

        // 固定の星
        for (let i = 0; i < 50; i++) {
            const x = (i * 73) % this.gameWidth;
            const y = (i * 37 + this.scrollY * 0.3) % this.gameHeight;
            const size = (i % 3) + 1;

            this.ctx.globalAlpha = 0.3 + (i % 5) * 0.1;
            this.ctx.fillRect(x, y, size, size);
        }

        // 動く星
        for (let i = 0; i < 30; i++) {
            const x = (i * 97) % this.gameWidth;
            const y = (i * 61 + this.scrollY) % this.gameHeight;

            this.ctx.globalAlpha = 0.6;
            this.ctx.fillRect(x, y, 1, 2);
        }

        this.ctx.globalAlpha = 1;
    }

    renderTitleScreen() {
        this.ctx.fillStyle = '#000033';
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        this.renderBackground();
    }

    renderPauseScreen() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }

    startGame(difficulty) {
        this.difficulty = difficulty;
        const settings = this.difficultySettings[difficulty];

        this.lives = settings.playerLives;
        this.score = 0;
        this.stage = 1;
        this.bombs = 3;

        // ボス管理システムをリセット
        this.bosses = [];
        this.defeatedBosses = [];

        // プレイヤー作成
        if (typeof Player !== 'undefined') {
            this.player = new Player(this.gameWidth / 2, this.gameHeight - 100, this);
        }

        // ゲーム開始
        this.state = 'playing';

        // ステージ初期化を追加
        if (typeof loadStage === 'function') {
            loadStage(this, 1);
        }

        // UI更新
        document.getElementById('titleScreen').style.display = 'none';
        document.getElementById('difficultySelect').style.display = 'none';

        // モバイルコントロール表示
        if ('ontouchstart' in window) {
            document.getElementById('virtualJoystick').style.display = 'block';
            document.getElementById('controlModeToggle').style.display = 'block';
        }

        // BGM再生（loadStageで行われるのでコメントアウト）
        // if (typeof playBGM === 'function') {
        //     playBGM('stage_1_2');
        // }
    }

    pauseGame() {
        this.isPaused = !this.isPaused;
        document.getElementById('pauseIndicator').style.display =
            this.isPaused ? 'block' : 'none';
    }

    gameOver() {
        this.state = 'gameover';

        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalStage').textContent = this.stage;
        document.getElementById('gameOverScreen').style.display = 'flex';

        // BGM停止
        if (typeof stopBGM === 'function') {
            stopBGM();
            playSFX('game_over');
        }

        // ハイスコア更新
        if (typeof saveHighScore === 'function') {
            saveHighScore(this.score, this.stage, this.difficulty);
        }
    }

    addScore(points) {
        const multiplier = this.difficultySettings[this.difficulty].scoreMultiplier;
        this.score += Math.floor(points * multiplier);
    }

    createExplosion(x, y, size) {
        if (typeof createParticles === 'function') {
            createParticles(this, x, y, size);
        }
    }

    spawnPowerup(x, y) {
        if (typeof Powerup !== 'undefined') {
            const types = ['weapon', 'life', 'bomb', 'shield'];
            const type = types[Math.floor(Math.random() * types.length)];
            this.powerups.push(new Powerup(x, y, type));
        }
    }

    spawnEnemy(type, x, y) {
        console.log('Spawning enemy:', type, 'at', x, y);
        if (typeof Enemy !== 'undefined') {
            const enemy = new Enemy(x, y, type, this);
            this.enemies.push(enemy);
            console.log('Enemy spawned, total enemies:', this.enemies.length);
        } else {
            console.error('Enemy class is undefined!');
        }
    }

    spawnBoss(type) {
        if (typeof Boss !== 'undefined') {
            // 現在のステージボスを生成
            const currentBoss = new Boss(this.gameWidth / 2, -100, type, this);
            currentBoss.stageNumber = this.stage;  // ボスのステージ番号を記録
            this.bosses.push(currentBoss);

            // 旧互換性のため、最初のボスをthis.bossにも設定
            if (!this.boss) {
                this.boss = currentBoss;
            }

            // ボス登場演出
            document.getElementById('bossHealth').style.display = 'block';

            if (typeof playBGM === 'function') {
                playBGM('boss');
            }
        }
    }

    // 繰り越しボス機能は削除されました
    // タイムアウトしても次のステージへ進みます

    onBossDefeated(defeatedBoss) {
        // 撃破されたボスを記録
        if (defeatedBoss && defeatedBoss.stageNumber) {
            this.defeatedBosses.push(defeatedBoss.stageNumber);
        }

        // bosses配列から削除
        const index = this.bosses.indexOf(defeatedBoss);
        if (index > -1) {
            this.bosses.splice(index, 1);
        }

        // 旧互換性のため
        if (this.boss === defeatedBoss) {
            this.boss = this.bosses.length > 0 ? this.bosses[0] : null;
        }

        // エフェクト
        this.createExplosion(defeatedBoss.x, defeatedBoss.y, 'large');
        this.addScore(defeatedBoss.scoreValue || 20000);

        // 全ボスが撃破されたかチェック
        if (this.bosses.length === 0) {
            this.onAllBossesDefeated();
        }
    }

    onAllBossesDefeated() {
        // 全ボス撃破時の処理
        document.getElementById('bossHealth').style.display = 'none';

        // ステージクリアチェック - ボスがタイムアウトしていないかを確認
        this.checkStageProgress();
    }

    checkStageProgress() {
        // タイムアウトに関わらず次のステージへ進む
        setTimeout(() => {
            // 次のステージへ
            this.stage++;
            if (this.stage > 10) {
                this.victory();
            } else {
                // 次ステージ
                if (typeof loadStage === 'function') {
                    loadStage(this, this.stage);

                    // ステージタイマーをリセット
                    window.stageTimer = 0;
                    window.currentWaveIndex = 0;
                }
            }
        }, 2000); // 2秒待ってから次ステージへ
    }

    getBossTypeForStage(stageNumber) {
        // ステージ番号からボスタイプを取得
        const bossTypes = {
            1: 'stage1',
            2: 'stage2',
            3: 'stage3',
            4: 'stage4',
            5: 'stage5',
            6: 'stage6',
            7: 'stage7',
            8: 'stage8',
            9: 'stage9',
            10: 'final'
        };
        return bossTypes[stageNumber] || 'stage1';
    }

    victory() {
        this.state = 'victory';
        // エンディング画面表示
        alert('Congratulations! You have completed Space Odyssey!');
        // backToTitle関数を直接呼び出す（グローバル関数として定義されている）
        if (typeof backToTitle === 'function') {
            backToTitle();
        } else {
            location.reload();
        }
    }

    applySettings() {
        // 音量設定適用
        if (typeof setVolumes === 'function') {
            setVolumes(this.settings.bgmVolume, this.settings.sfxVolume);
        }
    }
}

// グローバル関数
let game = null;

window.onload = () => {
    game = new Game();
};

function showDifficulty() {
    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('difficultySelect').style.display = 'flex';
}

function startGame(difficulty) {
    if (game) {
        game.startGame(difficulty);
    }
}

function backToTitle() {
    location.reload();
}

function retryGame() {
    if (game) {
        document.getElementById('gameOverScreen').style.display = 'none';
        game.startGame(game.difficulty);
    }
}

function showSettings() {
    alert('Settings menu - To be implemented');
}

function showHighScores() {
    alert('High Scores - To be implemented');
}

function showAchievements() {
    alert('Achievements - To be implemented');
}

// コントロールモード切り替え（グローバル関数）
function toggleControlMode() {
    const toggleButton = document.getElementById('controlModeToggle');
    if (!toggleButton) return;

    // gyroControlsが存在するかチェック
    if (typeof gyroControls !== 'undefined' && gyroControls) {
        if (gyroControls.enabled) {
            // ジャイロを無効化してジョイスティックに切り替え
            gyroControls.disable();
            toggleButton.innerHTML = '🕹️ ジョイスティック';
            toggleButton.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

            // ジョイスティック表示
            const joystickElement = document.getElementById('virtualJoystick');
            if (joystickElement) {
                joystickElement.style.display = 'block';
            }
        } else {
            // ジャイロ許可をリクエスト
            gyroControls.requestPermission().then(granted => {
                if (granted) {
                    toggleButton.innerHTML = '🎯 傾き操作';
                    toggleButton.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';

                    // ジョイスティック非表示
                    const joystickElement = document.getElementById('virtualJoystick');
                    if (joystickElement) {
                        joystickElement.style.display = 'none';
                    }
                } else {
                    alert('ジャイロセンサーが利用できません。ジョイスティックで操作してください。');
                }
            });
        }
    }
}