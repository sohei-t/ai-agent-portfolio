// Boss class - Space Odyssey
class Boss {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.game = game;

        // ボスタイプ別の設定（超巨大化・大幅強化 + シールド追加）
        const bossTypes = {
            stage1: {
                width: 107,  // 1/3サイズ（320→107）
                height: 107,
                hp: 1500,  // 1/3に減少（4500→1500）：1分討伐可能
                speed: 1,
                scoreValue: 10000,
                color: '#ff0044',
                name: 'Alien Commander',
                attackPatterns: ['spread', 'aimed', 'laser', 'rapid'],  // rapid追加で攻撃強化
                glowColor: '#ff00ff',
                hasShield: false,  // バリア無効化
                summonMinions: false,
                attackInterval: 45  // 攻撃間隔を短縮（通常60→45）
            },
            stage2: {
                width: 120,  // 1/3サイズ（360→120）
                height: 120,
                hp: 2500,  // 1/3に減少（7500→2500）：1分討伐可能
                speed: 1.2,
                scoreValue: 15000,
                color: '#ff4400',
                name: 'Mechanical Destroyer',
                attackPatterns: ['laser', 'homing', 'bomb', 'spread'],  // spread追加で攻撃強化
                glowColor: '#ffaa00',
                hasShield: false,  // バリア無効化
                summonMinions: false,
                attackInterval: 40  // 攻撃間隔を短縮（通常60→40）
            },
            stage3: {
                width: 133,  // 1/3サイズ（400→133）
                height: 133,
                hp: 3250,  // 1/3に減少（9750→3250）：1分討伐可能
                speed: 2.4,  // 速度3倍で高速移動
                scoreValue: 20000,
                color: '#ff0088',
                name: 'Crystal Guardian',
                attackPatterns: ['spiral', 'laser', 'spread', 'aimed', 'rapid'],  // aimed,rapid追加で攻撃強化
                glowColor: '#00ffff',
                hasShield: false,  // バリア無効化
                summonMinions: false,
                attackInterval: 35  // 攻撃間隔を短縮（通常60→35）
            },
            stage4: {
                width: 120,  // 1/3サイズ（360→120）
                height: 120,
                hp: 6000,  // 1/2に減少（12000→6000）：1分討伐可能
                speed: 1.5,
                scoreValue: 25000,
                color: '#8800ff',
                name: 'Shadow Leviathan',
                attackPatterns: ['homing', 'bomb', 'spiral', 'minion', 'laser'],  // laser追加で攻撃強化
                glowColor: '#9900ff',
                hasShield: false,  // バリア無効化
                summonMinions: true,  // ミニオン召喚
                attackInterval: 30  // 攻撃間隔を短縮（通常60→30）
            },
            stage5: {
                width: 133,  // 1/3サイズ（400→133）
                height: 133,
                hp: 7500,  // 1/2に減少（15000→7500）：1分討伐可能
                speed: 3.0,  // 速度3倍で高速移動
                scoreValue: 30000,
                color: '#ff00ff',
                name: 'Quantum Hydra',
                attackPatterns: ['multi', 'laser', 'chaos', 'split'],
                glowColor: '#ff00ff',
                hasShield: false,  // バリア無効化
                summonMinions: true,
                canSplit: true  // 分裂能力
            },
            stage10: {  // ステージ10専用ボス（boss_10.PNG使用）
                width: 183,  // 1/3サイズ（550→183）
                height: 183,
                hp: 15000,  // 1/2に減少（30000→15000）：1分討伐可能
                speed: 5.4,  // 速度3倍で超高速移動
                scoreValue: 75000,
                color: '#aa00ff',
                name: 'Cosmic Horror',
                attackPatterns: ['ultimate', 'chaos', 'spiral', 'minion', 'laser', 'rapid'],  // rapid追加で攻撃強化
                glowColor: '#aa00ff',
                hasShield: false,  // バリア無効化
                regenerateShield: false,
                summonMinions: true,
                imageFile: 'boss_10.PNG',  // 明示的に指定
                attackInterval: 25  // 攻撃間隔を短縮（通常60→25）
            },
            final: {  // ステージ11第一形態（boss_11.PNG使用）
                width: 220,  // ステージ10（183）より一回り大きい
                height: 220,
                hp: 17500,  // 1/2に減少（35000→17500）：1分討伐可能
                speed: 4.5,  // 速度3倍で超高速移動
                scoreValue: 50000,
                color: '#ff0000',
                name: 'Omega Overlord',
                attackPatterns: ['ultimate', 'chaos', 'laser', 'summonBoss'],
                glowColor: '#ff0000',
                hasShield: false,  // バリア無効化
                summonMinions: true,
                canSummonBosses: true,  // 歴代ボスを召喚
                hasSecondForm: true,  // 第二形態あり
                imageFile: 'boss_11.PNG'  // boss_11.PNGを使用
            },
            finalSecond: {  // 最終ボス第二形態（boss_11.PNG使用）
                width: 240,  // 第二形態はさらに大きく
                height: 240,
                hp: 3000,  // MAX武器30発分（100×30）
                speed: 7.5,  // 速度3倍で超高速移動
                scoreValue: 100000,
                color: '#000000',
                name: 'True Omega',
                attackPatterns: ['ultimate', 'chaos', 'laser', 'summonBoss', 'apocalypse'],
                glowColor: '#ff00ff',
                hasShield: false,  // バリア無効化
                regenerateShield: false,  // シールド再生なし
                summonMinions: true,
                canSummonBosses: true,
                isSecondForm: true,
                imageFile: 'boss_11.PNG'  // boss_11.PNGを使用
            }
        };

        // デフォルト値
        const config = bossTypes[type] || bossTypes.stage1;
        Object.assign(this, config);

        // 難易度による調整
        const diffSettings = this.game.difficultySettings[this.game.difficulty];
        this.hp = Math.ceil(this.hp * diffSettings.enemyHpMultiplier);
        this.maxHp = this.hp;

        // シールドシステム（無効化）
        // バリアは使わず、HPのみでダメージ管理
        this.hasShield = false;
        this.shield = 0;
        this.maxShield = 0;

        // ミニオン管理
        this.minions = [];
        this.minionSpawnTimer = 0;
        this.maxMinions = 5;

        // ボス召喚管理（最終ボス用）
        this.summonedBosses = [];
        this.bossSpawnTimer = 0;
        this.maxSummonedBosses = 2;

        // コアシステムの追加
        this.hasCore = true;
        this.coreSize = 10;  // コアの大きさ（小さく）
        this.coreGlowTimer = 0;
        this.coreDamageMultiplier = 3;  // コアへのダメージは3倍
        this.coreOffsetX = 0;  // コアの位置（ボス中心からのオフセット）
        this.coreOffsetY = 0;

        // フェーズ管理
        this.phase = 1;
        this.maxPhase = 3;

        // 移動関連
        this.targetX = x;
        this.targetY = 100;
        this.baseSpeed = this.speed;  // 基本速度を保持
        this.movePattern = 'entering';
        this.moveTimer = 0;

        // 新しい動的移動システムの初期化
        this.movementSystem = window.BossMovementSystem ? new BossMovementSystem(this) : null;
        this.currentMovementPattern = null;
        this.movementPatternTimer = 0;
        this.movementPatternDuration = 300; // 5秒ごとにパターン変更

        // 攻撃関連
        this.attackTimer = 0;
        this.attackInterval = config.attackInterval || 60;  // タイプ別の攻撃間隔を使用
        this.currentPattern = 0;
        this.specialAttackCooldown = 0;

        // ビジュアル
        this.rotation = 0;
        this.damageFlash = 0;
        this.warningTimer = 0;
        this.parts = []; // ボスのパーツ（装飾用）

        // PNG画像を読み込み（ステージに応じて）
        this.imageLoaded = false;
        this.sprite = new Image();

        // 画像ファイルの決定
        let imageName;
        if (this.imageFile) {
            // 明示的に指定されている場合
            imageName = this.imageFile;
        } else {
            // ボス番号を決定（ステージ番号に基づく）
            const bossNumber = Math.min(this.game ? this.game.stage : 1, 11);
            imageName = `boss_${String(bossNumber).padStart(2, '0')}.PNG`;
        }

        this.sprite.onload = () => {
            this.imageLoaded = true;
        };

        this.sprite.onerror = () => {
            // PNGが見つからない場合はSVGを試す
            this.sprite.src = `assets/images/bosses/${imageName.replace('.PNG', '')}.svg`;
        };

        // まずPNG画像を試す
        this.sprite.src = `assets/images/${imageName}`;

        // 初期化
        this.initParts();

        // 最終ボス専用：武器レベルダウン攻撃
        this.hasUsedWeaponDown = false;  // 一度だけ発動
        this.weaponDownAnimating = false;
        this.weaponDownMissile = null;
    }

    initParts() {
        // ボスの装飾パーツを生成
        for (let i = 0; i < 4; i++) {
            this.parts.push({
                angle: (Math.PI * 2 / 4) * i,
                distance: this.width / 2,
                size: 8,
                rotation: 0
            });
        }
    }

    update(dt) {
        // 破壊済みチェック
        if (this.destroyed || this.hp <= 0) {
            if (!this.destroyed && this.hp <= 0) {
                this.destroy();
            }
            return;
        }

        // 最終ボス第二形態の特殊処理
        if (this.phase === 'finalSecond') {
            // バリアタイマーの初期化
            if (!this.barrierTimer) {
                this.barrierTimer = 0;
                this.hasBarrier = true;
                this.summonedMiniBosses = [];
            }

            // 1分間（60秒 = 3600フレーム）のバリア
            if (this.barrierTimer < 3600) {
                this.barrierTimer++;

                // 10秒ごとに歴代ボスのミニバージョンを召喚
                if (this.barrierTimer % 600 === 300 && this.game) {
                    this.summonMiniBoss();
                }

                // 1分経過でバリア解除と武器レベルダウン
                if (this.barrierTimer === 3600) {
                    this.hasBarrier = false;
                    this.clearMiniBosses();
                    this.executeWeaponDownAttack();

                    // 武器アイテムを大量生成
                    if (this.game) {
                        for (let i = 0; i < 8; i++) {
                            setTimeout(() => {
                                const x = 100 + Math.random() * (this.game.canvas.width - 200);
                                const y = 100 + Math.random() * 100;
                                this.game.spawnPowerup(x, y, true);
                            }, i * 200);
                        }
                    }
                }
            }
        }

        // 最終ボス専用：武器レベルダウン攻撃（第一形態のHP50%以下で一度だけ）
        if (this.phase === 'final' && !this.hasUsedWeaponDown && this.hp < this.maxHp * 0.5) {
            this.executeWeaponDownAttack();
            this.hasUsedWeaponDown = true;
        }

        // 武器ダウンミサイルのアニメーション処理
        if (this.weaponDownMissile) {
            this.updateWeaponDownMissile(dt);
        }

        // 移動処理
        this.move(dt);

        // 攻撃処理
        if (this.movePattern !== 'entering' && this.movePattern !== 'leaving') {
            this.attackTimer++;
            if (this.attackTimer >= this.attackInterval) {
                this.attack();
                this.attackTimer = 0;
            }

            // 特殊攻撃は削除（難易度が高すぎるため）
            // コアの脈動アニメーション
            this.coreGlowTimer += 0.1;
            this.coreOffsetX = Math.sin(this.coreGlowTimer) * 10;
            this.coreOffsetY = Math.cos(this.coreGlowTimer * 1.3) * 5;
        }

        // 定期的な武器アイテムドロップ（約1分に1回 = 3600フレーム）
        if (!this.itemDropTimer) {
            this.itemDropTimer = 0;
        }
        this.itemDropTimer++;

        // 60秒ごとに武器アイテムを確実にドロップ
        if (this.itemDropTimer >= 3600) {
            // ランダムな武器タイプを選択
            const weaponTypes = ['weapon_default', 'weapon_green', 'weapon_purple', 'weapon_yellow'];
            const randomType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];

            // 画面上部からランダムな位置に武器アイテムを出現
            const dropX = 50 + Math.random() * (this.game.canvas.width - 100);
            const dropY = 50;

            // 指定した武器アイテムを出現
            const powerup = new Powerup(dropX, dropY, randomType);
            powerup.game = this.game;
            this.game.powerups.push(powerup);

            // エフェクトで知らせる
            if (this.game) {
                this.game.createExplosion(dropX, dropY, 'powerup');
            }

            this.itemDropTimer = 0;
        }

        // フェーズ変更チェック
        const hpRatio = this.hp / this.maxHp;
        if (hpRatio <= 0.66 && this.phase === 1) {
            this.phase = 2;
            this.onPhaseChange();
        } else if (hpRatio <= 0.33 && this.phase === 2) {
            this.phase = 3;
            this.onPhaseChange();
        }

        // ダメージフラッシュ更新
        if (this.damageFlash > 0) {
            this.damageFlash--;
        }

        // シールド再生
        if (this.hasShield && this.shieldBroken && this.shieldRegenTimer > 0) {
            this.shieldRegenTimer--;
            if (this.shieldRegenTimer <= 0) {
                this.shield = this.maxShield * 0.5;  // 50%回復
                this.shieldBroken = false;

                // 再生エフェクト
                if (this.game && this.game.createExplosion) {
                    this.game.createExplosion(this.x, this.y, 'shield_restore');
                }
            }
        }

        // 回転演出
        // this.rotation += 0.01;  // 回転を無効化

        // パーツアニメーション
        this.parts.forEach((part, i) => {
            part.rotation += 0.05 + i * 0.01;
            part.angle += 0.02 * (i % 2 === 0 ? 1 : -1);
        });

        // HPバー更新
        this.updateHealthBar();
    }

    move(dt) {
        this.moveTimer++;

        switch (this.movePattern) {
            case 'entering':
                // 登場演出
                if (this.y < this.targetY) {
                    this.y += 2;
                } else {
                    this.movePattern = 'hover';
                    if (typeof playSFX === 'function') {
                        playSFX('warning');
                    }
                }
                break;

            case 'hover':
                // 新しい動的移動システムを使用
                if (this.movementSystem) {
                    // パターン選択とタイマー管理
                    this.movementPatternTimer++;

                    // パターンを定期的に変更
                    if (this.movementPatternTimer >= this.movementPatternDuration || !this.currentMovementPattern) {
                        this.selectNewMovementPattern();
                        this.movementPatternTimer = 0;
                    }

                    // 選択されたパターンで移動
                    if (this.currentMovementPattern) {
                        const newPos = this.movementSystem.getNextPosition(
                            this.currentMovementPattern,
                            this.moveTimer
                        );

                        if (newPos) {
                            this.targetX = newPos.x;
                            this.targetY = newPos.y;
                        }
                    }
                } else {
                    // フォールバック: 従来の移動パターン
                    const t = this.moveTimer * 0.02;
                    this.targetX = this.game.canvas.width * 0.5 + Math.sin(t) * 200;
                    this.targetY = 150 + Math.sin(t * 2) * 100;
                }

                // スムーズな移動（高速化）
                if (this.targetX !== undefined) {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 5) {
                        const moveSpeed = this.speed || this.baseSpeed;
                        this.x += (dx / dist) * moveSpeed;
                        this.y += (dy / dist) * moveSpeed;
                    }
                }
                break;

            case 'chase':
                // プレイヤー追跡
                if (this.game.player) {
                    const dx = this.game.player.x - this.x;
                    this.x += Math.sign(dx) * this.speed;
                }
                break;

            case 'pattern':
                // ステージごとに異なる動きパターン
                const stage = this.game ? this.game.stage : 1;

                if (stage === 1) {
                    // ステージ1: 左右に往復移動
                    const pattern = this.moveTimer % 120;
                    if (pattern < 60) {
                        this.x -= this.speed * 2;
                    } else {
                        this.x += this.speed * 2;
                    }
                } else if (stage === 2) {
                    // ステージ2: 8の字移動
                    const t = this.moveTimer * 0.05;
                    this.x = this.game.canvas.width / 2 + Math.sin(t) * 150;
                    this.y = 120 + Math.sin(t * 2) * 50;
                } else if (stage === 3) {
                    // ステージ3: 高速ジグザグ移動＋体当たり攻撃
                    const pattern = this.moveTimer % 90;
                    if (pattern < 30) {
                        // ジグザグ移動
                        this.x -= this.speed * 4;
                        this.y = 100 + Math.sin(this.moveTimer * 0.3) * 30;
                    } else if (pattern < 60) {
                        // ジグザグ移動（反対方向）
                        this.x += this.speed * 4;
                        this.y = 100 + Math.cos(this.moveTimer * 0.3) * 30;
                    } else {
                        // プレイヤーへの体当たり攻撃
                        if (this.game.player) {
                            const dx = this.game.player.x - this.x;
                            const dy = this.game.player.y - this.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist > 10) {
                                this.x += (dx / dist) * this.speed * 6;
                                this.y += (dy / dist) * this.speed * 3;
                            }
                        }
                    }
                } else if (stage === 4) {
                    // ステージ4: ランダムワープ＋体当たり攻撃
                    const pattern = this.moveTimer % 120;
                    if (pattern < 90) {
                        // ランダムワープ移動
                        if (this.moveTimer % 90 === 0) {
                            this.targetX = 100 + Math.random() * (this.game.canvas.width - 200);
                            this.targetY = 80 + Math.random() * 100;
                        }
                        // 目標地点へ高速移動
                        const dx = this.targetX - this.x;
                        const dy = this.targetY - this.y;
                        this.x += dx * 0.1;
                        this.y += dy * 0.1;
                    } else {
                        // 体当たり攻撃
                        if (this.game.player) {
                            const dx = this.game.player.x - this.x;
                            const dy = this.game.player.y - this.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist > 10) {
                                this.x += (dx / dist) * this.speed * 8;
                                this.y += (dy / dist) * this.speed * 4;
                            }
                        }
                    }
                } else if (stage === 5) {
                    // ステージ5: 螺旋移動
                    const t = this.moveTimer * 0.08;
                    const radius = 100 + Math.sin(t * 0.5) * 50;
                    this.x = this.game.canvas.width / 2 + Math.cos(t) * radius;
                    this.y = 120 + Math.sin(t) * radius * 0.5;
                } else if (stage >= 6 && stage <= 9) {
                    // ステージ6-9: 複合パターン
                    const pattern = Math.floor(this.moveTimer / 60) % 3;
                    if (pattern === 0) {
                        // 円運動
                        const t = this.moveTimer * 0.1;
                        this.x = this.game.canvas.width / 2 + Math.cos(t) * 120;
                        this.y = 120 + Math.sin(t) * 60;
                    } else if (pattern === 1) {
                        // プレイヤー追尾
                        if (this.game.player) {
                            const dx = this.game.player.x - this.x;
                            this.x += Math.sign(dx) * this.speed * 2;
                        }
                    } else {
                        // ランダム移動
                        if (this.moveTimer % 20 === 0) {
                            this.targetX = this.x + (Math.random() - 0.5) * 200;
                            this.targetY = this.y + (Math.random() - 0.5) * 80;
                        }
                        const dx = this.targetX - this.x;
                        const dy = this.targetY - this.y;
                        this.x += dx * 0.05;
                        this.y += dy * 0.05;
                    }
                } else if (stage >= 10) {
                    // ステージ10以降: 超高速変幻自在
                    const pattern = Math.floor(this.moveTimer / 45) % 4;
                    if (pattern === 0) {
                        // 瞬間移動
                        if (this.moveTimer % 45 === 0) {
                            this.x = 100 + Math.random() * (this.game.canvas.width - 200);
                            this.y = 80 + Math.random() * 120;
                        }
                    } else if (pattern === 1) {
                        // 高速円運動
                        const t = this.moveTimer * 0.2;
                        this.x = this.game.canvas.width / 2 + Math.cos(t) * 150;
                        this.y = 120 + Math.sin(t) * 80;
                    } else if (pattern === 2) {
                        // 急速接近
                        if (this.game.player) {
                            const dx = this.game.player.x - this.x;
                            const dy = 100 - this.y;
                            this.x += dx * 0.08;
                            this.y += dy * 0.08;
                        }
                    } else {
                        // カオス移動
                        this.x += Math.sin(this.moveTimer * 0.3) * this.speed * 5;
                        this.y += Math.cos(this.moveTimer * 0.2) * this.speed * 2;
                    }
                }
                break;

            case 'leaving':
                // 撤退
                this.y -= 3;
                if (this.y < -this.height) {
                    this.destroy();
                }
                break;
        }

        // 画面端制限
        this.x = Math.max(this.width / 2,
                 Math.min(this.game.canvas.width - this.width / 2, this.x));
        this.y = Math.max(50, Math.min(200, this.y));
    }

    attack() {
        // ステージによって攻撃パターンを変更
        let pattern;
        const stage = this.game ? this.game.stage : 1;

        if (stage <= 2) {
            // ステージ1-2: 基本攻撃のみ
            const basicPatterns = ['spread', 'aimed'];
            pattern = basicPatterns[this.currentPattern % basicPatterns.length];
        } else if (stage <= 4) {
            // ステージ3-4: レーザーとホーミング追加
            const midPatterns = ['spread', 'aimed', 'laser', 'homing'];
            pattern = midPatterns[this.currentPattern % midPatterns.length];
        } else if (stage <= 6) {
            // ステージ5-6: 爆弾と螺旋追加
            const advancedPatterns = ['spread', 'aimed', 'laser', 'homing', 'bomb', 'spiral'];
            pattern = advancedPatterns[this.currentPattern % advancedPatterns.length];
        } else if (stage <= 8) {
            // ステージ7-8: 複合攻撃追加
            const expertPatterns = ['laser', 'homing', 'bomb', 'spiral', 'multi', 'chaos'];
            pattern = expertPatterns[this.currentPattern % expertPatterns.length];
        } else {
            // ステージ9以降: 全攻撃パターン使用
            pattern = this.attackPatterns[this.currentPattern];
        }

        this.currentPattern = (this.currentPattern + 1) % this.attackPatterns.length;

        switch (pattern) {
            case 'spread':
                this.spreadAttack();
                break;
            case 'aimed':
                this.aimedAttack();
                break;
            case 'laser':
                this.laserAttack();
                break;
            case 'homing':
                this.homingAttack();
                break;
            case 'bomb':
                this.bombAttack();
                break;
            case 'spiral':
                this.spiralAttack();
                break;
            case 'multi':
                this.multiAttack();
                break;
            case 'chaos':
                this.chaosAttack();
                break;
            case 'ultimate':
                this.ultimateAttack();
                break;
            case 'minion':
                this.summonMinion();
                break;
            case 'split':
                this.splitAttack();
                break;
            case 'summonBoss':
                this.summonBossAttack();
                break;
            case 'apocalypse':
                this.apocalypseAttack();
                break;
            default:
                this.spreadAttack();
        }
    }

    spreadAttack() {
        // ランダム化された扇状拡散弾
        const bullets = 5 + this.phase * 2;
        const baseAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;  // 基準角度をランダム化
        const spreadRange = Math.PI * 0.6;  // 扇の範囲

        for (let i = 0; i < bullets; i++) {
            // 各弾の角度と速度をランダム化
            const angleOffset = (i / (bullets - 1)) * spreadRange - spreadRange / 2;
            const angle = baseAngle + angleOffset + (Math.random() - 0.5) * 0.2;
            const speed = 2 + Math.random() * 1.5;  // 速度もランダム化

            this.createBullet(
                this.x + (Math.random() - 0.5) * 40,  // 発射位置も少しずらす
                this.y + this.height / 2,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }

    aimedAttack() {
        // プレイヤー狙い撃ち（超強化版 - 直線的な狙撃）
        if (!this.game.player) return;

        const px = this.game.player.x;
        const py = this.game.player.y;

        // プレイヤーの現在位置を正確に狙う
        const angle = Math.atan2(py - this.y, px - this.x);

        // ステージが進むほど弾数と速度が増加
        const stage = this.game ? this.game.stage : 1;
        const bulletCount = Math.min(stage, 5); // ステージ番号の数だけ発射（最大5発）

        for (let i = 0; i < bulletCount; i++) {
            setTimeout(() => {
                // プレイヤーの現在位置を再計算（移動を予測）
                const currentPx = this.game.player.x;
                const currentPy = this.game.player.y;
                const currentAngle = Math.atan2(currentPy - this.y, currentPx - this.x);

                // 完全に直線的な狙い撃ち（拡散なし）
                const speed = 4 + stage * 0.3; // ステージが進むほど高速

                this.createBullet(
                    this.x,
                    this.y + this.height / 2,
                    Math.cos(currentAngle) * speed,
                    Math.sin(currentAngle) * speed,
                    'aimed'
                );
            }, i * 100); // 連射間隔
        }
    }

    laserAttack() {
        // レーザー攻撃
        for (let i = -1; i <= 1; i++) {
            this.createBullet(
                this.x + i * 30,
                this.y + this.height / 2,
                0,
                5,
                'laser'
            );
        }
    }

    homingAttack() {
        // ホーミング弾
        const missiles = 2 + this.phase;
        for (let i = 0; i < missiles; i++) {
            setTimeout(() => {
                this.createBullet(
                    this.x + (Math.random() - 0.5) * this.width,
                    this.y + this.height / 2,
                    (Math.random() - 0.5) * 2,
                    2,
                    'homing'
                );
            }, i * 200);
        }
    }

    bombAttack() {
        // 爆弾投下
        for (let i = 0; i < 3; i++) {
            this.createBullet(
                this.x + (i - 1) * 40,
                this.y + this.height / 2,
                0,
                1.5,
                'bomb'
            );
        }
    }

    spiralAttack() {
        // らせん弾幕
        const bulletCount = 12;
        for (let i = 0; i < bulletCount; i++) {
            setTimeout(() => {
                const angle = (Math.PI * 2 / bulletCount) * i + this.moveTimer * 0.1;
                this.createBullet(
                    this.x,
                    this.y,
                    Math.cos(angle) * 3,
                    Math.sin(angle) * 3
                );
            }, i * 50);
        }
    }

    multiAttack() {
        // 複合攻撃
        this.spreadAttack();
        setTimeout(() => this.aimedAttack(), 500);
    }

    chaosAttack() {
        // ランダム弾幕
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;
                this.createBullet(
                    this.x + (Math.random() - 0.5) * this.width,
                    this.y + (Math.random() - 0.5) * this.height,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }, i * 100);
        }
    }

    ultimateAttack() {
        // 究極攻撃
        this.chaosAttack();
        this.spiralAttack();
        this.homingAttack();
    }

    summonMinion() {
        // ミニオン召喚（小型の敵を生成）
        if (!this.summonMinions || !this.game) return;

        const minionsToSpawn = Math.min(3, this.maxMinions - this.minions.length);
        for (let i = 0; i < minionsToSpawn; i++) {
            const offsetX = (i - 1) * 100;
            const minion = {
                x: this.x + offsetX,
                y: this.y + 50,
                width: 40,
                height: 40,
                hp: 20,
                speed: 2,
                color: this.color,
                type: 'minion',
                parent: this
            };

            // ゲームの敵リストに追加
            if (this.game.enemies) {
                const enemy = new Enemy(minion.x, minion.y, 'minion', this.game);
                enemy.hp = minion.hp;
                enemy.width = minion.width;
                enemy.height = minion.height;
                enemy.scoreValue = 500;
                this.game.enemies.push(enemy);
                this.minions.push(enemy);
            }
        }

        // 召喚エフェクト
        if (this.game.createExplosion) {
            this.game.createExplosion(this.x, this.y, 'summon');
        }
    }

    splitAttack() {
        // 分裂攻撃（自身を2体に分裂）
        if (!this.canSplit || !this.game) return;

        // 分裂は1回だけ
        if (this.hasSplit) return;
        this.hasSplit = true;

        // 2体の小型ボスを生成
        for (let i = 0; i < 2; i++) {
            const splitBoss = new Boss(
                this.x + (i === 0 ? -150 : 150),
                this.y,
                'mini_' + this.type,
                this.game
            );

            splitBoss.width = this.width * 0.6;
            splitBoss.height = this.height * 0.6;
            splitBoss.hp = this.hp * 0.4;
            splitBoss.maxHp = splitBoss.hp;
            splitBoss.scoreValue = this.scoreValue * 0.3;
            splitBoss.hasShield = false;
            splitBoss.canSplit = false;

            this.game.enemies.push(splitBoss);
        }

        // 分裂エフェクト
        if (typeof createScreenFlash === 'function') {
            createScreenFlash('#ff00ff', 0.5);
        }
    }

    summonBossAttack() {
        // 歴代ボス召喚（最終ボス専用）
        if (!this.canSummonBosses || !this.game) return;

        if (this.summonedBosses.length >= this.maxSummonedBosses) return;

        // ランダムに過去のボスを1体召喚
        const bossTypes = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5'];
        const randomType = bossTypes[Math.floor(Math.random() * bossTypes.length)];

        const summonedBoss = new Boss(
            Math.random() * (this.game.canvas.width - 200) + 100,
            -100,
            randomType,
            this.game
        );

        // 召喚されたボスは弱体化
        summonedBoss.hp *= 0.3;
        summonedBoss.maxHp = summonedBoss.hp;
        summonedBoss.width *= 0.5;
        summonedBoss.height *= 0.5;
        summonedBoss.scoreValue *= 0.5;
        summonedBoss.hasShield = false;
        summonedBoss.canSummonBosses = false;
        summonedBoss.summonMinions = false;

        this.game.enemies.push(summonedBoss);
        this.summonedBosses.push(summonedBoss);

        // 召喚演出
        if (this.game.showBossWarning) {
            this.game.showBossWarning(`${summonedBoss.name} SUMMONED!`, summonedBoss.color);
        }
    }

    apocalypseAttack() {
        // 終末攻撃（第二形態専用）
        if (!this.isSecondForm) return;

        // 画面全体に弾幕
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * this.game.canvas.width;
                const y = 0;
                const angle = Math.atan2(this.game.player.y - y, this.game.player.x - x);
                const speed = 3 + Math.random() * 2;

                this.createBullet(
                    x,
                    y,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    'apocalypse'
                );
            }, i * 50);
        }

        // 画面効果
        if (typeof createScreenFlash === 'function') {
            createScreenFlash('#ff0000', 0.8);
        }
    }


    createBullet(x, y, vx, vy, type = 'normal') {
        if (typeof Bullet !== 'undefined') {
            const bullet = new Bullet(x, y, vx, vy, 1, 'enemy', type);

            // フェーズによる弾の強化
            if (this.phase >= 2) {
                bullet.speed *= 1.2;
            }
            if (this.phase >= 3) {
                bullet.damage = 2;
            }

            this.game.bullets.push(bullet);
        }
    }

    takeDamage(damage, hitCore = false) {
        // バリアがある場合は一切ダメージを受けない
        if (this.hasBarrier) {
            // バリア効果のビジュアルフィードバック
            if (this.game && this.game.createExplosion) {
                this.game.createExplosion(this.x, this.y, 'barrier');
            }
            return 0;
        }

        // シールドがある場合、シールドから先にダメージを受ける
        if (this.hasShield && this.shield > 0) {
            const shieldDamage = Math.min(this.shield, damage);
            this.shield -= shieldDamage;

            // シールドエフェクト
            if (this.game && this.game.createExplosion) {
                this.game.createExplosion(this.x, this.y, 'shield');
            }

            if (this.shield <= 0) {
                this.shieldBroken = true;
                this.shieldRegenTimer = 300;  // 5秒後に再生

                // シールド破壊エフェクト
                if (typeof createScreenFlash === 'function') {
                    createScreenFlash('#00ffff', 0.3);
                }
                if (typeof playSFX === 'function') {
                    playSFX('shield_break');
                }
            }

            // シールドが全ダメージを吸収した場合
            if (shieldDamage >= damage) {
                return shieldDamage;
            }

            // 残りのダメージをHPから減らす
            damage -= shieldDamage;
        }

        // コアに命中した場合はダメージ倍率を適用（シールドがない場合のみ）
        const actualDamage = hitCore && this.shield <= 0 ? damage * this.coreDamageMultiplier : damage;

        this.hp -= actualDamage;
        this.damageFlash = 10;

        // コアヒット時の特別なエフェクト
        if (hitCore && this.shield <= 0 && this.game) {
            // 大きな爆発エフェクト
            if (this.game.createExplosion) {
                this.game.createExplosion(
                    this.x + this.coreOffsetX,
                    this.y + this.coreOffsetY,
                    'large'
                );
            }

            // 画面フラッシュ
            if (typeof createScreenFlash === 'function') {
                createScreenFlash('#00ffff', 0.5);
            }

            if (typeof playSFX === 'function') {
                playSFX('critical_hit', 0.8);
            }
        } else if (typeof playSFX === 'function') {
            playSFX('boss_hit', 0.5);
        }

        if (this.hp <= 0) {
            // 最終ボスの第二形態チェック
            if (this.hasSecondForm && !this.isSecondForm && this.type === 'final') {
                // 変身中フラグを立てる
                this.isTransforming = true;
                this.transformToSecondForm();
                return actualDamage;
            }
            this.destroy();
        }

        return actualDamage;
    }

    transformToSecondForm() {
        // 第二形態への変身
        this.type = 'finalSecond';

        // 重要: destroyedフラグをリセット
        this.destroyed = false;

        const bossTypes = {
            finalSecond: {
                width: 800,  // 超巨大
                height: 800,
                hp: 6000,  // 超高耐久
                speed: 1.5,
                scoreValue: 100000,
                color: '#000000',
                name: 'True Omega',
                attackPatterns: ['ultimate', 'chaos', 'laser', 'summonBoss', 'apocalypse'],
                glowColor: '#ff00ff',
                hasShield: true,
                shieldHp: 1500,
                regenerateShield: true,
                summonMinions: true,
                canSummonBosses: true,
                isSecondForm: true,
                imageFile: 'boss_11.PNG'  // boss_11.PNGを使用
            }
        };

        const config = bossTypes.finalSecond;
        Object.assign(this, config);

        this.maxHp = this.hp;
        this.shield = this.shieldHp;
        this.maxShield = this.shield;
        this.phase = 1;
        this.damageFlash = 60;

        // 位置をリセット（画面中央上部）
        this.x = this.game.canvas.width / 2;
        this.y = 150;

        // boss_11.PNGに画像を変更
        this.sprite = new Image();
        this.sprite.onload = () => {
            this.imageLoaded = true;
        };
        this.sprite.onerror = () => {
            // フォールバック
            this.sprite.src = 'assets/images/bosses/boss_11.svg';
        };
        this.sprite.src = 'assets/images/boss_11.PNG';

        // 変身エフェクト
        if (typeof createScreenFlash === 'function') {
            createScreenFlash('#ff00ff', 1.0);
        }

        // finalSecond専用のフラグを設定
        this.phase = 'finalSecond';

        // 画面に警告メッセージ
        if (this.game) {
            // showBossWarningが存在する場合のみ呼び出し
            if (this.game.showBossWarning) {
                this.game.showBossWarning('TRUE FORM AWAKENED!', '#ff00ff');
            } else {
                // 代替として簡易的な警告表示
                console.log('BOSS: TRUE FORM AWAKENED!');

                // ボスのHPバーを更新
                const bossHealthBar = document.getElementById('bossHealthBar');
                if (bossHealthBar) {
                    bossHealthBar.style.width = '100%';
                    bossHealthBar.style.background = 'linear-gradient(to right, #ff00ff, #ff0000)';
                }

                const bossName = document.getElementById('bossName');
                if (bossName) {
                    bossName.textContent = 'TRUE OMEGA - FINAL FORM';
                    bossName.style.color = '#ff00ff';
                }
            }
        }

        // 変身中フラグをクリア
        this.isTransforming = false;
    }

    onPhaseChange() {
        // フェーズ変更演出
        this.damageFlash = 30;
        this.attackInterval = Math.max(30, this.attackInterval - 10);

        // 画面フラッシュ
        if (typeof createScreenFlash === 'function') {
            createScreenFlash();
        }
    }

    summonMiniBoss() {
        if (!this.game || !this.game.enemies) return;

        // 召喚するボスの番号（1～10をループ）
        if (!this.miniBossIndex) this.miniBossIndex = 0;
        this.miniBossIndex = (this.miniBossIndex % 10) + 1;

        // ミニボスのパラメータ（1/2サイズ、HP1/10）
        const miniBoss = {
            x: 100 + Math.random() * (this.game.canvas.width - 200),
            y: 50 + Math.random() * 100,
            width: 50,  // 1/2サイズ
            height: 50,
            hp: 100 + this.miniBossIndex * 50,  // ステージに応じたHP
            maxHp: 100 + this.miniBossIndex * 50,
            speed: 2,
            color: this.getMiniBossColor(this.miniBossIndex),
            type: 'miniBoss',
            bossNumber: this.miniBossIndex,
            attackTimer: 0,
            attackInterval: 90,
            damageFlash: 0,

            update: function(dt) {
                // 簡単な移動パターン
                this.x += Math.sin(Date.now() * 0.002) * this.speed;
                this.y += Math.cos(Date.now() * 0.003) * 0.5;

                // 画面内に留まる
                this.x = Math.max(30, Math.min(this.game.canvas.width - 30, this.x));
                this.y = Math.max(30, Math.min(200, this.y));

                // 攻撃
                this.attackTimer++;
                if (this.attackTimer >= this.attackInterval) {
                    this.fire();
                    this.attackTimer = 0;
                }

                // ダメージフラッシュ
                if (this.damageFlash > 0) {
                    this.damageFlash--;
                }
            },

            fire: function() {
                if (!this.game || !this.game.bullets) return;

                // プレイヤーを狙う
                if (this.game.player) {
                    const angle = Math.atan2(
                        this.game.player.y - this.y,
                        this.game.player.x - this.x
                    );

                    this.game.bullets.push({
                        x: this.x,
                        y: this.y,
                        vx: Math.cos(angle) * 3,
                        vy: Math.sin(angle) * 3,
                        width: 8,
                        height: 8,
                        owner: 'enemy',
                        type: 'normal',
                        damage: 1,
                        color: '#ff0000'
                    });
                }
            },

            takeDamage: function(damage) {
                this.hp -= damage;
                this.damageFlash = 10;

                if (this.hp <= 0) {
                    // 撃破時の処理
                    const index = this.game.enemies.indexOf(this);
                    if (index > -1) {
                        this.game.enemies.splice(index, 1);
                    }

                    // エフェクト
                    if (this.game.createExplosion) {
                        this.game.createExplosion(this.x, this.y, 'large');
                    }

                    // スコア
                    if (this.game.addScore) {
                        this.game.addScore(1000 * this.bossNumber);
                    }

                    // スモールボス撃破時に全種類のアイテムを出現
                    if (this.game.spawnPowerup) {
                        const itemTypes = [
                            'weapon_default',  // 青武器
                            'weapon_green',    // 緑武器
                            'weapon_purple',   // 紫武器
                            'weapon_yellow',   // 黄武器
                            'item-bomb',       // ボム
                            'item-life',       // ライフ
                            'shield',          // シールド
                            'speed'            // スピード
                        ];

                        // 全種類のアイテムを円形に配置
                        itemTypes.forEach((type, index) => {
                            const angle = (Math.PI * 2 / itemTypes.length) * index;
                            const radius = 50;
                            const itemX = this.x + Math.cos(angle) * radius;
                            const itemY = this.y + Math.sin(angle) * radius;

                            setTimeout(() => {
                                if (this.game && this.game.powerups) {
                                    const powerup = new Powerup(itemX, itemY, type);
                                    powerup.game = this.game;
                                    this.game.powerups.push(powerup);
                                }
                            }, index * 50);  // 少しずつ遅延して出現
                        });
                    }
                }
            },

            draw: function(ctx) {
                ctx.save();

                // ダメージフラッシュ
                if (this.damageFlash > 0 && this.damageFlash % 4 < 2) {
                    ctx.globalAlpha = 0.5;
                }

                // boss_01〜boss_10の画像パスを使用
                const imagePath = `assets/images/boss_${String(this.bossNumber).padStart(2, '0')}.PNG`;

                // 画像が存在する場合は描画、なければ代替表示
                const img = new Image();
                img.src = imagePath;

                if (img.complete && img.naturalHeight !== 0) {
                    // 画像を1/2サイズで描画
                    ctx.drawImage(img,
                        this.x - this.width/2,
                        this.y - this.height/2,
                        this.width,
                        this.height
                    );
                } else {
                    // 画像が読み込めない場合は色付き四角形で代替
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

                    // ボス番号を表示
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 16px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(`B${this.bossNumber}`, this.x, this.y + 5);
                }

                // HPバー表示（小さく）
                const barWidth = 40;
                const barHeight = 4;
                const barY = this.y - this.height/2 - 10;

                ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.fillRect(this.x - barWidth/2, barY, barWidth, barHeight);

                ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
                ctx.fillRect(this.x - barWidth/2, barY, barWidth * (this.hp / this.maxHp), barHeight);

                ctx.restore();
            },

            getHitbox: function() {
                return {
                    x: this.x - this.width/2,
                    y: this.y - this.height/2,
                    width: this.width,
                    height: this.height
                };
            },

            game: this.game
        };

        // ゲームに追加
        miniBoss.game = this.game;
        this.game.enemies.push(miniBoss);
        this.summonedMiniBosses.push(miniBoss);
    }

    getMiniBossColor(index) {
        const colors = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff',
            '#00ffff', '#ff8800', '#8800ff', '#00ff88', '#ff0088'
        ];
        return colors[(index - 1) % colors.length];
    }

    clearMiniBosses() {
        if (!this.game || !this.summonedMiniBosses) return;

        // すべてのミニボスを削除
        this.summonedMiniBosses.forEach(miniBoss => {
            const index = this.game.enemies.indexOf(miniBoss);
            if (index > -1) {
                // 爆発エフェクト
                if (this.game.createExplosion) {
                    this.game.createExplosion(miniBoss.x, miniBoss.y, 'large');
                }
                this.game.enemies.splice(index, 1);
            }
        });

        this.summonedMiniBosses = [];
    }

    executeWeaponDownAttack() {
        // 画面を赤くフラッシュ
        const canvas = this.game.canvas;
        const ctx = this.game.ctx;

        // 警告メッセージ表示
        this.weaponDownAnimating = true;

        // 特殊ミサイル生成（画面中央から）
        this.weaponDownMissile = {
            x: this.x,
            y: this.y + this.height / 2,
            targetX: this.game.player.x,
            targetY: this.game.player.y,
            speed: 2,
            time: 0,
            color: '#ff0000',
            size: 30
        };

        // 警告演出
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            if (flashCount >= 6) {
                clearInterval(flashInterval);
                return;
            }

            // 画面全体を赤くフラッシュ
            ctx.save();
            ctx.fillStyle = flashCount % 2 === 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 警告テキスト
            if (flashCount % 2 === 0) {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 30px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('⚠ WEAPON BREAKER ⚠', canvas.width / 2, canvas.height / 2);
            }
            ctx.restore();

            flashCount++;
        }, 200);
    }

    updateWeaponDownMissile(dt) {
        if (!this.weaponDownMissile) return;

        const missile = this.weaponDownMissile;
        missile.time += 0.05;

        // プレイヤーに向かってホーミング（避けられない速度で）
        const dx = this.game.player.x - missile.x;
        const dy = this.game.player.y - missile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            // 加速しながら追尾
            missile.speed = Math.min(missile.speed * 1.02, 15);
            missile.x += (dx / distance) * missile.speed;
            missile.y += (dy / distance) * missile.speed;
        } else {
            // プレイヤーに命中
            this.applyWeaponDown();
            this.weaponDownMissile = null;
        }
    }

    applyWeaponDown() {
        // 全武器レベルを-1
        if (this.game.player) {
            const player = this.game.player;

            // 各武器のレベルを1下げる（最低1）
            player.weapons.default.level = Math.max(1, player.weapons.default.level - 1);
            player.weapons.green.level = Math.max(0, player.weapons.green.level - 1);
            player.weapons.purple.level = Math.max(0, player.weapons.purple.level - 1);
            player.weapons.yellow.level = Math.max(0, player.weapons.yellow.level - 1);

            // weaponLevelsも更新
            player.weaponLevels.default = player.weapons.default.level;
            player.weaponLevels.green = player.weapons.green.level;
            player.weaponLevels.purple = player.weapons.purple.level;
            player.weaponLevels.yellow = player.weapons.yellow.level;

            // 超強力武器を解除
            player.ultimateWeaponUnlocked = false;

            // エフェクト
            if (this.game.createExplosion) {
                this.game.createExplosion(player.x, player.y, 'special');
            }

            // 画面揺れ
            this.shakeScreen();

            // インジケーター更新
            player.updateWeaponIndicators();

            console.log('武器レベルダウン！全武器-1');
        }
    }

    shakeScreen() {
        const canvas = this.game.canvas;
        let shakeCount = 0;
        const originalTransform = canvas.style.transform;

        const shakeInterval = setInterval(() => {
            if (shakeCount >= 20) {
                canvas.style.transform = originalTransform || '';
                clearInterval(shakeInterval);
                return;
            }

            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            canvas.style.transform = `translate(${x}px, ${y}px)`;

            shakeCount++;
        }, 50);
    }

    destroy() {
        // 二重破壊を防ぐ
        if (this.destroyed) return;

        // 第二形態への変身中の場合は破壊処理をスキップ
        if (this.isTransforming) return;

        this.destroyed = true;

        // 大爆発エフェクト
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                if (this.game) {
                    this.game.createExplosion(
                        this.x + (Math.random() - 0.5) * this.width,
                        this.y + (Math.random() - 0.5) * this.height,
                        'large'
                    );
                }
            }, i * 100);
        }

        if (typeof playSFX === 'function') {
            playSFX('boss_destroy');
        }

        // 少し遅延を入れてから次のステージへ
        setTimeout(() => {
            if (this.game) {
                this.game.onBossDefeated();
            }
        }, 500);
    }

    updateHealthBar() {
        const bar = document.getElementById('bossHealthBar');
        if (bar) {
            const ratio = Math.max(0, this.hp / this.maxHp);
            bar.style.width = `${ratio * 100}%`;
        }
    }

    render(ctx) {
        ctx.save();

        // 発光エフェクト（パルス）
        const glowIntensity = 0.5 + Math.sin(Date.now() * 0.003) * 0.3;
        ctx.shadowColor = this.glowColor || this.color;
        ctx.shadowBlur = 50 + glowIntensity * 30;

        // HPに応じた表情変化（怒りレベル）
        const hpRatio = this.hp / this.maxHp;
        if (hpRatio < 0.3) {
            // 瀕死状態（赤く点滅）
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 80;
        }

        // ダメージフラッシュ
        if (this.damageFlash > 0) {
            ctx.globalAlpha = 0.7;
            ctx.filter = `brightness(${2 + this.damageFlash / 10})`;
        }

        // バリア描画（最優先）
        if (this.hasBarrier) {
            ctx.save();
            const barrierTime = this.barrierTimer || 0;
            const remainingTime = Math.max(0, 3600 - barrierTime);
            const barrierAlpha = 0.5 + Math.sin(Date.now() * 0.01) * 0.3;

            // バリアの円（虹色に輝く）
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.width/2 + 40);
            const hue = (Date.now() * 0.1) % 360;
            gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0)`);
            gradient.addColorStop(0.5, `hsla(${hue + 60}, 100%, 60%, ${barrierAlpha})`);
            gradient.addColorStop(1, `hsla(${hue + 120}, 100%, 50%, ${barrierAlpha * 0.5})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.width/2 + 40, this.height/2 + 40, 0, 0, Math.PI * 2);
            ctx.stroke();

            // バリアタイマー表示
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            const seconds = Math.ceil(remainingTime / 60);
            ctx.fillText(`BARRIER: ${seconds}s`, this.x, this.y - this.height/2 - 60);

            ctx.restore();
        }

        // シールド描画
        else if (this.hasShield && this.shield > 0) {
            ctx.save();
            const shieldAlpha = 0.3 + Math.sin(Date.now() * 0.005) * 0.2;
            const shieldRatio = this.shield / this.maxShield;

            // シールドの色（ダメージに応じて変化）
            let shieldColor;
            if (shieldRatio > 0.7) {
                shieldColor = 'rgba(0, 255, 255, ';  // 水色
            } else if (shieldRatio > 0.3) {
                shieldColor = 'rgba(255, 255, 0, ';  // 黄色
            } else {
                shieldColor = 'rgba(255, 0, 0, ';  // 赤
            }

            ctx.strokeStyle = shieldColor + shieldAlpha + ')';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.width/2 + 20, this.height/2 + 20, 0, 0, Math.PI * 2);
            ctx.stroke();

            // シールドのパーティクル
            for (let i = 0; i < 3; i++) {
                const angle = Date.now() * 0.002 + i * (Math.PI * 2 / 3);
                const px = this.x + Math.cos(angle) * (this.width/2 + 25);
                const py = this.y + Math.sin(angle) * (this.height/2 + 25);

                ctx.fillStyle = shieldColor + '0.8)';
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        // 怒りモードのオーラ（多重層）
        if (this.isAngry || hpRatio < 0.5) {
            // 外側のオーラ
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.3 + glowIntensity * 0.3})`;
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2 + 40, 0, Math.PI * 2);
            ctx.stroke();

            // 内側のオーラ
            ctx.strokeStyle = `rgba(255, 100, 0, ${0.5 + glowIntensity * 0.3})`;
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2 + 20, 0, Math.PI * 2);
            ctx.stroke();
        }

        // 警告エフェクト
        if (this.warningTimer > 0) {
            this.warningTimer--;
            if (this.warningTimer % 10 < 5) {
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            }
        }

        // ボス本体
        ctx.translate(this.x, this.y);
        // ctx.rotate(this.rotation);  // 回転を無効化

        // 画像が読み込まれていれば画像を描画
        if (this.imageLoaded && this.sprite) {
            ctx.drawImage(
                this.sprite,
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height
            );
        } else {
            // 画像がない場合は従来の描画
            ctx.fillStyle = this.color;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;

            // 本体（複雑な形状）
            ctx.beginPath();
        const points = 8;
        for (let i = 0; i < points; i++) {
            const angle = (Math.PI * 2 / points) * i;
            const radius = i % 2 === 0 ? this.width / 2 : this.width / 3;
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        }

        // パーツの描画
        this.parts.forEach(part => {
            ctx.save();
            ctx.rotate(part.angle);
            ctx.translate(part.distance, 0);
            ctx.rotate(part.rotation);

            ctx.fillStyle = '#ffaa00';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.arc(0, 0, part.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        });

        ctx.restore();

        // コアシステムの描画（ボス本体とは別に描画）
        if (this.hasCore) {
            ctx.save();

            // コアの位置
            const coreX = this.x + this.coreOffsetX;
            const coreY = this.y + this.coreOffsetY;

            // コアの発光エフェクト
            const pulseScale = 1 + Math.sin(this.coreGlowTimer * 2) * 0.2;
            const glowAlpha = 0.6 + Math.sin(this.coreGlowTimer * 3) * 0.4;

            // 外側のグロー
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 30 * pulseScale;
            ctx.fillStyle = `rgba(0, 255, 255, ${glowAlpha * 0.3})`;
            ctx.beginPath();
            ctx.arc(coreX, coreY, this.coreSize * 1.5 * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // 中間層
            ctx.shadowBlur = 20;
            ctx.fillStyle = `rgba(100, 200, 255, ${glowAlpha * 0.5})`;
            ctx.beginPath();
            ctx.arc(coreX, coreY, this.coreSize * pulseScale, 0, Math.PI * 2);
            ctx.fill();

            // コア本体
            ctx.shadowBlur = 10;
            ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
            ctx.beginPath();
            ctx.arc(coreX, coreY, this.coreSize * 0.6, 0, Math.PI * 2);
            ctx.fill();

            // コアの十字マーク
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.globalAlpha = glowAlpha;
            ctx.beginPath();
            ctx.moveTo(coreX - this.coreSize, coreY);
            ctx.lineTo(coreX + this.coreSize, coreY);
            ctx.moveTo(coreX, coreY - this.coreSize);
            ctx.lineTo(coreX, coreY + this.coreSize);
            ctx.stroke();

            ctx.restore();
        }

        // 名前表示
        if (this.movePattern === 'entering') {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, this.game.canvas.width / 2, 50);
        }

        // 武器ダウンミサイルの描画を追加
        this.renderWeaponDownMissile(ctx);
    }

    renderWeaponDownMissile(ctx) {
        // 武器ダウンミサイルの描画
        if (this.weaponDownMissile) {
            const missile = this.weaponDownMissile;
            ctx.save();

            // ミサイル本体（赤く光る）
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 30;
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(missile.x, missile.y, missile.size, 0, Math.PI * 2);
            ctx.fill();

            // 内側のコア
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(missile.x, missile.y, missile.size / 3, 0, Math.PI * 2);
            ctx.fill();

            // 軌跡エフェクト
            for (let i = 1; i <= 3; i++) {
                ctx.globalAlpha = 0.3 / i;
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(
                    missile.x - (missile.speed * i * 2),
                    missile.y - (missile.speed * i),
                    missile.size - i * 5,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            // 警告文字
            ctx.globalAlpha = 0.8 + Math.sin(Date.now() * 0.01) * 0.2;
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('DANGER', missile.x, missile.y - missile.size - 10);

            ctx.restore();
        }
    }

    getHitbox() {
        // ボスは少し小さめの当たり判定
        return {
            x: this.x - this.width * 0.4,
            y: this.y - this.height * 0.4,
            width: this.width * 0.8,
            height: this.height * 0.8
        };
    }

    getCoreHitbox() {
        // コアの当たり判定
        if (!this.hasCore) return null;

        const coreX = this.x + this.coreOffsetX;
        const coreY = this.y + this.coreOffsetY;

        return {
            x: coreX - this.coreSize,
            y: coreY - this.coreSize,
            width: this.coreSize * 2,
            height: this.coreSize * 2,
            isCore: true
        };
    }

    selectNewMovementPattern() {
        // ステージとフェーズに応じたパターンを選択
        const patterns = [];

        // 基本パターン（全ボス共通）
        patterns.push('spiral', 'sine_wave', 'infinity', 'bounce');

        // ステージが進むごとに複雑なパターンを追加
        if (this.type === 'stage3' || this.type === 'stage4' || this.type === 'stage5') {
            patterns.push('zigzag_dive', 'chaos');
        }

        // ステージ10以上は全パターン使用可能
        if (this.type === 'stage10' || this.type === 'final' || this.type === 'finalSecond') {
            patterns.push('teleport', 'hunter', 'phantom', 'chaos', 'zigzag_dive');

            // フェーズが進むごとにより攻撃的に
            if (this.phase >= 2) {
                patterns.push('hunter', 'teleport');  // 追跡とテレポートの頻度増加
            }
            if (this.phase >= 3) {
                patterns.push('chaos', 'phantom');  // カオスとファントムの頻度増加
            }
        }

        // ランダムに選択（現在のパターンと異なるものを選ぶ）
        let newPattern;
        do {
            newPattern = patterns[Math.floor(Math.random() * patterns.length)];
        } while (newPattern === this.currentMovementPattern && patterns.length > 1);

        this.currentMovementPattern = newPattern;
    }
}