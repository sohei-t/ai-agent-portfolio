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

        // 逃したボスの累積システム
        this.escapedBosses = [];  // 逃したボスのステージ番号リスト
        this.accumulatedBosses = [];  // 現在ステージに追加されるボス

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

        // ステージアイテム管理システム
        this.stageItemsSpawned = {
            weapon_default: false,
            weapon_green: false,
            weapon_purple: false,
            weapon_yellow: false
        };
        this.stageItemTimer = 0;  // ステージ開始からの経過時間
        this.nextItemSpawnTime = 600;  // 10秒後に最初のアイテム
        this.itemSpawnOrder = ['weapon_default', 'weapon_green', 'weapon_purple', 'weapon_yellow'];
        this.currentItemIndex = 0;

        // 初期化
        this.init();
    }

    init() {
        // 特殊武器システムを初期化
        if (typeof SpecialWeapon !== 'undefined') {
            specialWeapon = new SpecialWeapon(this);
        }

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
            // 下部のUIエリア（高さ80px）より上に制限
            const bottomLimit = this.gameHeight - 100;  // UIエリアの上限
            this.player.x = Math.max(16, Math.min(this.gameWidth - 16, this.player.x));
            this.player.y = Math.max(16, Math.min(bottomLimit, this.player.y));
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

                    // 通常のアイテムドロップ率（増加）
                    if (Math.random() < 0.25) {  // 25%の確率に増加（累積ボス対策）
                        this.spawnPowerup(enemy.x, enemy.y, Math.random() < 0.6);  // 60%の確率で武器優先
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

        // ボス更新
        // 累積ボスの更新（追加実装）
        if (this.accumulatedBosses && this.accumulatedBosses.length > 0) {
            this.accumulatedBosses = this.accumulatedBosses.filter(accBoss => {
                if (accBoss.destroyed || accBoss.hp <= 0) {
                    // 累積ボスが倒された場合、逃したボスリストから削除
                    const index = this.escapedBosses.indexOf(accBoss.originalStage);
                    if (index > -1) {
                        this.escapedBosses.splice(index, 1);
                        console.log(`ステージ${accBoss.originalStage}の累積ボスを撃破！残り: ${this.escapedBosses}`);
                    }
                    return false;  // 配列から削除
                }
                accBoss.update(dt);
                return true;  // 配列に残す
            });
        }

        if (this.boss) {
            // ボスが破壊されていないかチェック
            if (this.boss.destroyed || this.boss.hp <= 0) {
                // onBossDefeatedは一度だけ呼ぶ
                if (!this.bossDefeated) {
                    this.bossDefeated = true;
                    // boss.destroy()が既に呼ばれていればonBossDefeatedも呼ばれている
                }
            } else {
                this.boss.update(dt);

                // 1分間タイマー処理（最終ステージ以外）
                // ステージ10と11（最終ボス）はタイマーなし
                if (this.stage < 10 && !this.bossTimeoutProcessing && !(this.boss && this.boss.phase === 'finalSecond')) {
                    if (!this.bossStageStartTime) {
                        this.bossStageStartTime = Date.now();
                    }

                    const elapsedTime = Date.now() - this.bossStageStartTime;
                    const timeLimit = 60000; // 1分（60秒）統一

                    if (elapsedTime >= timeLimit) {
                        // タイムアップでステージクリア（一度だけ実行）
                        this.bossTimeoutProcessing = true;
                        console.log('タイムアップ - ボスが逃げました！');

                        // 逃したボスを記録（累積システム）
                        if (this.boss && !this.boss.destroyed) {
                            this.escapedBosses.push(this.stage);  // 現在のステージ番号を記録
                            console.log(`ステージ${this.stage}のボスを逃しました。累積ボス: ${this.escapedBosses}`);

                            // ボスを撤退させる
                            this.boss.movePattern = 'leaving';
                        }

                        // ステージクリア処理（onBossDefeatedを呼ぶ）
                        setTimeout(() => {
                            this.boss = null;
                            this.bossStageStartTime = null;
                            this.bossTimeoutProcessing = false;  // リセット
                            this.onBossDefeated();  // 既存のボス撃破処理を使用
                        }, 2000);
                    }
                }
            }
        }

        // 当たり判定
        if (typeof checkCollisions === 'function') {
            checkCollisions(this);
        }

        // 特殊武器の更新
        if (specialWeapon) {
            specialWeapon.update();
        }

        // ステージアイテム管理（ボス戦でない場合）- 完全ランダム化
        if (!this.boss) {
            this.stageItemTimer++;

            // 定期的にランダムアイテムを出現させる
            if (this.stageItemTimer >= this.nextItemSpawnTime) {
                // MAXでない武器のみをリストに追加
                const itemTypes = [];

                // 各武器のレベルをチェック
                if (this.player && this.player.weaponLevels) {
                    if (this.player.weaponLevels.default < 10) {
                        itemTypes.push('weapon_default');
                    }
                    if (this.player.weaponLevels.green < 10) {
                        itemTypes.push('weapon_green');
                    }
                    if (this.player.weaponLevels.purple < 10) {
                        itemTypes.push('weapon_purple');
                    }
                    if (this.player.weaponLevels.yellow < 10) {
                        itemTypes.push('weapon_yellow');
                    }
                } else {
                    // weaponLevelsがまだ初期化されていない場合は全武器を追加
                    itemTypes.push('weapon_default', 'weapon_green', 'weapon_purple', 'weapon_yellow');
                }

                // その他のアイテムは常に追加（正しいタイプ名を使用）
                itemTypes.push('item-life', 'item-bomb', 'shield');

                // 武器アイテムがない場合は他のアイテムを増やす
                if (itemTypes.length === 3) {  // 武器が全てMAXの場合（他アイテム3種類のみ）
                    // 回復・ボム・シールドの出現率を上げる
                    itemTypes.push('item-life', 'item-bomb', 'shield');
                }

                const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];

                // 画面上部のランダムな位置に出現
                const x = 50 + Math.random() * (this.canvas.width - 100);
                const y = 50;

                // アイテムを出現
                const powerup = new Powerup(x, y, itemType);
                powerup.game = this;
                this.powerups.push(powerup);

                // エフェクトで知らせる
                this.createExplosion(x, y, 'powerup');

                // 次のアイテムまでの時間をランダムに設定（10-30秒）
                this.stageItemTimer = 0;
                this.nextItemSpawnTime = 600 + Math.random() * 600;  // 10-20秒間隔
            }
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

        if (this.boss) {
            this.boss.render(this.ctx);
            // 武器ダウンミサイルの描画
            if (this.boss.renderWeaponDownMissile) {
                this.boss.renderWeaponDownMissile(this.ctx);
            }
        }

        this.particles.forEach(p => p.render(this.ctx));

        // 特殊武器の描画
        if (specialWeapon) {
            specialWeapon.render(this.ctx);
        }

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

        // ステージアイテム管理を初期化
        this.stageItemsSpawned = {
            weapon_default: false,
            weapon_green: false,
            weapon_purple: false,
            weapon_yellow: false
        };
        this.currentItemIndex = 0;
        this.stageItemTimer = 0;
        this.nextItemSpawnTime = 600 + Math.random() * 600; // 10-20秒後に最初のアイテム

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

        // CONTINUE機能の表示（残機がない場合のみ）
        if (!this.continueUsed && this.score >= 1000) {  // 一度だけ使用可能、スコア1000以上で解放
            this.showContinue();
        } else {
            document.getElementById('gameOverScreen').style.display = 'flex';
        }

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

    showContinue() {
        // CONTINUE画面の作成（存在しない場合）
        let continueScreen = document.getElementById('continueScreen');
        if (!continueScreen) {
            continueScreen = document.createElement('div');
            continueScreen.id = 'continueScreen';
            continueScreen.className = 'screen';
            continueScreen.style.cssText = `
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family: 'Courier New', monospace;
                z-index: 1000;
            `;
            continueScreen.innerHTML = `
                <h1 style="font-size: 48px; margin-bottom: 30px; color: #ffff00;">CONTINUE?</h1>
                <p style="font-size: 24px; margin-bottom: 20px;">Score: <span id="continueScore">0</span></p>
                <p style="font-size: 20px; margin-bottom: 40px; color: #ff6600;">コンティニューは1回のみ使用可能です</p>
                <div style="display: flex; gap: 30px;">
                    <button id="continueYes" style="padding: 15px 30px; font-size: 24px; background: #00ff00; color: black; border: none; cursor: pointer;">YES (残機3で復活)</button>
                    <button id="continueNo" style="padding: 15px 30px; font-size: 24px; background: #ff0000; color: white; border: none; cursor: pointer;">NO</button>
                </div>
            `;
            document.body.appendChild(continueScreen);

            // ボタンイベント
            document.getElementById('continueYes').addEventListener('click', () => this.continueGame());
            document.getElementById('continueNo').addEventListener('click', () => {
                document.getElementById('continueScreen').style.display = 'none';
                document.getElementById('gameOverScreen').style.display = 'flex';
            });
        }

        document.getElementById('continueScore').textContent = this.score;
        continueScreen.style.display = 'flex';
    }

    continueGame() {
        // CONTINUE実行
        this.continueUsed = true;  // 一度だけ使用可能
        this.lives = 3;  // 残機を3に回復
        this.state = 'playing';

        // プレイヤーを復活
        if (this.player) {
            this.player.respawn();
            this.player.invincible = 300;  // 5秒間無敵
        }

        // 画面を隠す
        document.getElementById('continueScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';

        // BGM再開
        if (typeof playBGM === 'function') {
            playBGM('stage');
        }

        console.log('CONTINUE実行！残機3で復活');
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

    spawnPowerup(x, y, forceWeapon = false) {
        if (typeof Powerup !== 'undefined') {
            let type;

            // MAXでない武器のみをリストに追加
            const validItemTypes = [];

            // 各武器のレベルをチェック（MAXでない武器のみ追加）- 出現率増加
            if (this.player && this.player.weaponLevels) {
                if (this.player.weaponLevels.default < 10) {
                    // 青武器（5枚に増加）
                    for (let i = 0; i < 5; i++) validItemTypes.push('weapon_default');
                }
                if (this.player.weaponLevels.green < 10) {
                    // 緑武器（4枚に増加）
                    for (let i = 0; i < 4; i++) validItemTypes.push('weapon_green');
                }
                if (this.player.weaponLevels.purple < 10) {
                    // 紫武器（4枚に増加）
                    for (let i = 0; i < 4; i++) validItemTypes.push('weapon_purple');
                }
                if (this.player.weaponLevels.yellow < 10) {
                    // 黄武器（4枚に増加）
                    for (let i = 0; i < 4; i++) validItemTypes.push('weapon_yellow');
                }
            } else {
                // weaponLevelsがまだ初期化されていない場合は全武器を追加
                validItemTypes.push('weapon_default', 'weapon_default', 'weapon_default');
                validItemTypes.push('weapon_green', 'weapon_green');
                validItemTypes.push('weapon_purple', 'weapon_purple');
                validItemTypes.push('weapon_yellow', 'weapon_yellow');
            }

            // その他のアイテムは常に追加
            validItemTypes.push('item-bomb', 'item-bomb');  // ボム（2枚）
            validItemTypes.push('item-life', 'item-life');  // ライフ（2枚）
            validItemTypes.push('shield');  // シールド（1枚）
            validItemTypes.push('speed', 'speed');  // スピードアップ（2枚）

            if (forceWeapon) {
                // ボス戦中は武器アイテムを優先（MAXでない武器のみ）
                const weaponTypes = [];
                if (this.player && this.player.weaponLevels) {
                    if (this.player.weaponLevels.default < 10) weaponTypes.push('weapon_default');
                    if (this.player.weaponLevels.green < 10) weaponTypes.push('weapon_green');
                    if (this.player.weaponLevels.purple < 10) weaponTypes.push('weapon_purple');
                    if (this.player.weaponLevels.yellow < 10) weaponTypes.push('weapon_yellow');
                } else {
                    // weaponLevelsがまだ初期化されていない場合は全武器を追加
                    weaponTypes.push('weapon_default', 'weapon_green', 'weapon_purple', 'weapon_yellow');
                }

                // MAXでない武器がある場合はそれを出現
                if (weaponTypes.length > 0) {
                    type = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
                } else {
                    // 全武器MAXの場合は他のアイテムから選択
                    const otherTypes = ['item-bomb', 'item-life', 'shield', 'speed'];
                    type = otherTypes[Math.floor(Math.random() * otherTypes.length)];
                }
            } else {
                // 通常時：ランダムに選択（ただし出現可能なもののみ）
                if (validItemTypes.length > 0) {
                    type = validItemTypes[Math.floor(Math.random() * validItemTypes.length)];
                } else {
                    // 何もない場合は生命力アイテム
                    type = 'item-life';
                }
            }

            const powerup = new Powerup(x, y, type);
            powerup.game = this;  // gameの参照を追加
            this.powerups.push(powerup);
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

    getBossTypeByStage(stageNum) {
        const types = {
            1: 'stage1',
            2: 'stage2',
            3: 'stage3',
            4: 'stage4',
            5: 'stage5',
            6: 'stage1',  // ステージ6以降は循環
            7: 'stage2',
            8: 'stage3',
            9: 'stage4',
            10: 'stage10'
        };
        return types[stageNum] || 'stage1';
    }

    spawnBoss(type) {
        if (typeof Boss !== 'undefined') {
            // Boss Warning画面を表示
            if (typeof showBossWarning === 'function') {
                const bossNames = {
                    stage1: 'Alien Commander',
                    stage2: 'Mechanical Destroyer',
                    stage3: 'Crystal Guardian',
                    stage4: 'Shadow Leviathan',
                    stage5: 'Quantum Hydra',
                    final: 'Omega Overlord'
                };
                showBossWarning(this, bossNames[type] || 'Unknown Boss');
            }

            // 4秒後にボスを生成
            setTimeout(() => {
                this.boss = new Boss(this.gameWidth / 2, -100, type, this);

                // 累積ボスシステム：逃したボスを追加で出現
                if (this.escapedBosses.length > 0) {
                    console.log(`累積ボスを追加: ${this.escapedBosses}`);
                    this.accumulatedBosses = [];  // 現在の累積ボスをクリア

                    // 逃した各ボスを追加生成
                    this.escapedBosses.forEach((escapedStage, index) => {
                        setTimeout(() => {
                            const bossType = this.getBossTypeByStage(escapedStage);
                            const accumulatedBoss = new Boss(
                                100 + (index * 150) % (this.gameWidth - 200),  // 横位置をずらす
                                50 + (index * 50),  // 縦位置もずらす
                                bossType,
                                this
                            );

                            // 累積ボスは少し弱くする（HP 70%）
                            accumulatedBoss.hp = Math.floor(accumulatedBoss.hp * 0.7);
                            accumulatedBoss.maxHp = accumulatedBoss.hp;
                            accumulatedBoss.isAccumulated = true;  // 累積ボスフラグ
                            accumulatedBoss.originalStage = escapedStage;  // 元のステージ番号

                            this.accumulatedBosses.push(accumulatedBoss);
                            console.log(`ステージ${escapedStage}のボスを追加生成`);

                            // 累積ボス出現時に武器アイテムも配置（支援）
                            if (index === 0) {  // 最初の累積ボスの時だけ
                                const weaponTypes = ['weapon_default', 'weapon_green', 'weapon_purple', 'weapon_yellow'];
                                weaponTypes.forEach((wType, wIndex) => {
                                    setTimeout(() => {
                                        const itemX = 100 + (wIndex * 150);
                                        const itemY = this.canvas.height - 100;
                                        const powerup = new Powerup(itemX, itemY, wType);
                                        this.powerups.push(powerup);
                                    }, 1000 + wIndex * 200);
                                });
                            }
                        }, 500 + index * 500);  // 順番に出現
                    });
                }

                // ボス戦開始時にステージアイテム管理をリセット
                this.stageItemsSpawned = {
                    weapon_default: false,
                    weapon_green: false,
                    weapon_purple: false,
                    weapon_yellow: false
                };
                this.currentItemIndex = 0;

                // ボス登場演出
                document.getElementById('bossHealth').style.display = 'block';

                if (typeof playBGM === 'function') {
                    playBGM('boss');
                }
            }, 4000);
        }
    }

    onBossDefeated() {
        // 二重実行を防ぐ
        if (this.processingBossDefeat) return;
        this.processingBossDefeat = true;

        // ボスが存在する場合は爆発エフェクト
        if (this.boss) {
            this.createExplosion(this.boss.x, this.boss.y, 'large');
        }
        this.addScore(20000);

        document.getElementById('bossHealth').style.display = 'none';
        this.boss = null;
        this.bossDefeated = false; // リセット

        // ステージクリア演出を表示
        if (typeof showStageClear === 'function') {
            showStageClear(this, this.stage);
        }

        // ステージクリア処理はshowStageClear内で行われる
        setTimeout(() => {
            this.stage++;
            if (this.stage > 11) {  // ステージ11クリア後に終了
                this.victory();
            }
            // ステージタイマーをリセット
            window.stageTimer = 0;
            window.currentWaveIndex = 0;

            // 次のステージのためにアイテム管理をリセット
            this.stageItemsSpawned = {
                weapon_default: false,
                weapon_green: false,
                weapon_purple: false,
                weapon_yellow: false
            };
            this.currentItemIndex = 0;
            this.stageItemTimer = 0;
            this.nextItemSpawnTime = 600 + Math.random() * 600; // 10-20秒後に最初のアイテム

            // フラグをリセット
            this.processingBossDefeat = false;
        }, 4000); // 4秒待ってから（演出時間に合わせる）
    }

    victory() {
        this.state = 'victory';

        // 巨大な爆発エフェクトを生成（画面全体で連続爆発）
        const explosionCount = 30;  // 爆発の数
        const duration = 3000;  // 3秒間の演出

        for (let i = 0; i < explosionCount; i++) {
            setTimeout(() => {
                // ランダムな位置で爆発
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;

                // 爆発エフェクト作成
                if (this.createExplosion) {
                    this.createExplosion(x, y, 'huge');
                }

                // 爆発パーティクル
                for (let j = 0; j < 20; j++) {
                    const angle = (Math.PI * 2 / 20) * j;
                    const speed = 5 + Math.random() * 10;

                    this.particles.push({
                        x: x,
                        y: y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        size: 5 + Math.random() * 10,
                        color: `hsl(${Math.random() * 60}, 100%, 50%)`,  // 赤〜黄色系
                        lifetime: 60 + Math.random() * 30,
                        type: 'explosion'
                    });
                }

                // 画面を振動させる効果
                if (this.canvas) {
                    this.canvas.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                    setTimeout(() => {
                        this.canvas.style.transform = 'translate(0, 0)';
                    }, 100);
                }
            }, (i * duration) / explosionCount);
        }

        // 爆発演出後にビクトリー画面を表示
        setTimeout(() => {
            // キャンバスをクリア
            const ctx = this.canvas.getContext('2d');
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // ビクトリーメッセージ表示
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 72px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('VICTORY!', this.canvas.width / 2, this.canvas.height / 2 - 50);

            ctx.font = '36px Arial';
            ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);

            // さらに2秒後にタイトル画面へ戻る（ending.htmlではなく）
            setTimeout(() => {
                // スコアをローカルストレージに保存
                const currentScore = this.score || 0;
                const highScore = parseInt(localStorage.getItem('highScore') || '0');
                if (currentScore > highScore) {
                    localStorage.setItem('highScore', currentScore);
                }

                // タイトル画面に戻る
                location.reload();
            }, 2000);
        }, duration);
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
    document.getElementById('itemGuideScreen').style.display = 'none';
    document.getElementById('difficultySelect').style.display = 'none';
    document.getElementById('titleScreen').style.display = 'block';
}

function retryGame() {
    if (game) {
        document.getElementById('gameOverScreen').style.display = 'none';
        game.startGame(game.difficulty);
    }
}

function showItemGuide() {
    document.getElementById('titleScreen').style.display = 'none';
    document.getElementById('itemGuideScreen').style.display = 'flex';

    // アイテムアイコンを描画
    setTimeout(() => {
        drawItemIcons();
    }, 100);
}

function drawItemIcons() {
    // 各アイテムタイプの設定（現在のゲーム仕様に合わせて更新）
    const items = {
        'item-weapon': { color: '#00ffff', type: 'square', text: 'B' },    // 青武器（四角＋B）
        'item-spread': { color: '#00ff00', type: 'square', text: 'S' },    // 緑武器（四角＋S）
        'item-laser': { color: '#ff00ff', type: 'square', text: 'L' },     // 紫武器（四角＋L）
        'item-wave': { color: '#ffff00', type: 'square', text: 'W' },      // 黄武器（四角＋W）
        'item-life': { color: '#ff0066', type: 'heart' },                  // 残機（ハート）
        'item-bomb': { color: '#ff6600', type: 'bomb' },                   // 爆弾
        'item-shield': { color: '#00ffff', type: 'shield' },               // シールド
        'item-speed': { color: '#ff00ff', type: 'triangle', text: 'S' }    // スピード（三角＋S）
    };

    for (const [id, config] of Object.entries(items)) {
        const canvas = document.getElementById(id);
        if (!canvas) continue;

        const ctx = canvas.getContext('2d');
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // アイテムのグロー効果
        ctx.shadowBlur = 10;
        ctx.shadowColor = config.color;

        ctx.strokeStyle = config.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = config.color + '66'; // 半透明の塗りつぶし

        switch(config.type) {
            case 'star':
                // 星型
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                    const outerRadius = 12;
                    const innerRadius = 6;

                    const x1 = cx + Math.cos(angle) * outerRadius;
                    const y1 = cy + Math.sin(angle) * outerRadius;

                    const angle2 = angle + Math.PI / 5;
                    const x2 = cx + Math.cos(angle2) * innerRadius;
                    const y2 = cy + Math.sin(angle2) * innerRadius;

                    if (i === 0) {
                        ctx.moveTo(x1, y1);
                    } else {
                        ctx.lineTo(x1, y1);
                    }
                    ctx.lineTo(x2, y2);
                }
                ctx.closePath();
                break;

            case 'heart':
                // ハート型（簡略版）
                ctx.beginPath();
                ctx.arc(cx - 5, cy - 5, 5, 0, Math.PI * 2);
                ctx.arc(cx + 5, cy - 5, 5, 0, Math.PI * 2);
                ctx.moveTo(cx, cy);
                ctx.lineTo(cx - 10, cy - 5);
                ctx.lineTo(cx, cy + 10);
                ctx.lineTo(cx + 10, cy - 5);
                ctx.lineTo(cx, cy);
                break;

            case 'bomb':
                // 爆弾型
                ctx.beginPath();
                ctx.arc(cx, cy, 10, 0, Math.PI * 2);
                ctx.moveTo(cx, cy - 10);
                ctx.lineTo(cx, cy - 15);
                // 導火線
                ctx.moveTo(cx, cy - 15);
                ctx.lineTo(cx + 2, cy - 17);
                break;

            case 'shield':
                // シールド型
                ctx.beginPath();
                ctx.moveTo(cx, cy - 12);
                ctx.lineTo(cx - 10, cy - 6);
                ctx.lineTo(cx - 10, cy + 6);
                ctx.lineTo(cx, cy + 12);
                ctx.lineTo(cx + 10, cy + 6);
                ctx.lineTo(cx + 10, cy - 6);
                ctx.closePath();
                break;

            case 'square':
                // 四角形
                ctx.beginPath();
                ctx.rect(cx - 10, cy - 10, 20, 20);
                break;

            case 'triangle':
                // 三角形
                ctx.beginPath();
                ctx.moveTo(cx, cy - 12);
                ctx.lineTo(cx - 10, cy + 8);
                ctx.lineTo(cx + 10, cy + 8);
                ctx.closePath();
                break;

            case 'circle':
                // 円形
                ctx.beginPath();
                ctx.arc(cx, cy, 10, 0, Math.PI * 2);
                break;
        }

        ctx.fill();
        ctx.stroke();

        // テキストがある場合は中央に表示
        if (config.text) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 0;
            ctx.fillText(config.text, cx, cy);
        } else {
            // 中心の明るい点（テキストがない場合のみ）
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fill();
        }
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