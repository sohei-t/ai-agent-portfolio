// Collision detection - Space Odyssey
function checkCollisions(game) {
    if (!game.player) return;

    // プレイヤー弾 vs 敵
    for (let i = game.bullets.length - 1; i >= 0; i--) {
        const bullet = game.bullets[i];

        if (bullet.owner === 'player') {
            // 通常の敵
            for (let j = game.enemies.length - 1; j >= 0; j--) {
                const enemy = game.enemies[j];

                if (isColliding(bullet, enemy)) {
                    // ダメージ処理
                    enemy.takeDamage(bullet.power);

                    // 超強力武器（ドラゴンブレス）とチャージレーザーは貫通
                    // 貫通弾でない場合は弾を削除
                    if (!bullet.penetrating && bullet.type !== 'ultimate_dragon') {
                        game.bullets.splice(i, 1);
                        break;
                    }
                }
            }

            // ボス
            if (game.boss) {
                // まずコアへの命中をチェック
                const coreHitbox = game.boss.getCoreHitbox();
                let hitCore = false;

                if (coreHitbox && isColliding(bullet, coreHitbox)) {
                    // コアに命中
                    game.boss.takeDamage(bullet.power, true);  // true = core hit
                    hitCore = true;

                    // コアヒット時のエフェクト
                    if (game.createExplosion) {
                        game.createExplosion(bullet.x, bullet.y, 'medium');
                    }
                } else if (isColliding(bullet, game.boss)) {
                    // ボス本体に命中
                    game.boss.takeDamage(bullet.power, false);
                }

                // ラスボス（finalSecond）に対してはホーミングミサイルも1撃で消える
                const isFinalBoss = game.boss && game.boss.phase === 'finalSecond';
                const shouldRemoveBullet = (hitCore || isColliding(bullet, game.boss)) &&
                    (!bullet.penetrating || (isFinalBoss && bullet.type === 'ultimate_missile'));

                if (shouldRemoveBullet) {
                    game.bullets.splice(i, 1);
                }
            }
        }
    }

    // 弾の相殺システム（プレイヤー弾 vs 敵弾）
    for (let i = game.bullets.length - 1; i >= 0; i--) {
        const playerBullet = game.bullets[i];

        if (playerBullet && playerBullet.owner === 'player') {
            for (let j = game.bullets.length - 1; j >= 0; j--) {
                if (i === j) continue;
                const enemyBullet = game.bullets[j];

                if (enemyBullet && enemyBullet.owner === 'enemy') {
                    // 超強力武器（ultimate_dragon/ultimate_missile）は全ての敵弾を相殺
                    if (playerBullet.type === 'ultimate_dragon' || playerBullet.type === 'ultimate_missile') {
                        if (isColliding(playerBullet, enemyBullet)) {
                            // 敵弾を破壊（超強力武器は貫通）
                            if (game.createExplosion) {
                                game.createExplosion(enemyBullet.x, enemyBullet.y, 'small');
                            }
                            game.bullets.splice(j, 1);
                        }
                        continue; // 超強力武器は次の敵弾もチェック
                    }

                    // レーザー（大型赤色弾）のみ相殺不可
                    // ホーミング弾は相殺可能に変更
                    if (enemyBullet.type === 'laser') {
                        continue;
                    }

                    // チャージレーザーは敵弾も貫通する（相殺しない）
                    if (playerBullet.isChargedLaser) {
                        if (isColliding(playerBullet, enemyBullet)) {
                            // 敵弾を破壊するが、チャージレーザーは貫通
                            if (game.createExplosion) {
                                game.createExplosion(enemyBullet.x, enemyBullet.y, 'small');
                            }

                            // スコア追加（貫通ボーナス）
                            if (game.addScore) {
                                game.addScore(20);
                            }

                            // 敵弾のみ削除（チャージレーザーは貫通）
                            game.bullets.splice(j, 1);

                            // チャージレーザーの威力をわずかに減衰（オプション）
                            // playerBullet.power *= 0.95;
                        }
                        continue; // チャージレーザーは次の敵弾もチェック
                    }

                    if (isColliding(playerBullet, enemyBullet)) {
                        // 通常弾の相殺エフェクト
                        if (game.createExplosion) {
                            const x = (playerBullet.x + enemyBullet.x) / 2;
                            const y = (playerBullet.y + enemyBullet.y) / 2;
                            game.createExplosion(x, y, 'small');
                        }

                        // スコア追加（相殺ボーナス）
                        if (game.addScore) {
                            game.addScore(10);
                        }

                        // 両方の弾を削除（通常弾同士）
                        if (j > i) {
                            game.bullets.splice(j, 1);
                            game.bullets.splice(i, 1);
                        } else {
                            game.bullets.splice(i, 1);
                            game.bullets.splice(j, 1);
                        }
                        break;
                    }
                }
            }
        }
    }

    // 敵弾 vs 分身（シールド機能）
    if (game.player.clones && game.player.clones.length > 0) {
        for (let i = game.bullets.length - 1; i >= 0; i--) {
            const bullet = game.bullets[i];

            if (bullet && bullet.owner === 'enemy') {
                // 分身との当たり判定
                for (const clone of game.player.clones) {
                    if (isColliding(bullet, clone)) {
                        // 分身が敵弾をブロック（分身は破壊されない）
                        game.bullets.splice(i, 1);

                        // ブロック時のエフェクト
                        if (game.createExplosion) {
                            game.createExplosion(bullet.x, bullet.y, 'small');
                        }
                        break;
                    }
                }
            }
        }
    }

    // 敵弾 vs プレイヤー
    if (game.player.invincible <= 0) {
        for (let i = game.bullets.length - 1; i >= 0; i--) {
            const bullet = game.bullets[i];

            if (bullet.owner === 'enemy') {
                if (isColliding(bullet, game.player)) {
                    game.player.takeDamage(bullet.damage || 1);
                    game.bullets.splice(i, 1);
                }
            }
        }
    }

    // 敵 vs プレイヤー（体当たり）
    if (game.player.invincible <= 0) {
        for (const enemy of game.enemies) {
            if (isColliding(enemy, game.player)) {
                game.player.takeDamage(1);
                enemy.takeDamage(1);
            }
        }

        // ボス vs プレイヤー
        if (game.boss && isColliding(game.boss, game.player)) {
            game.player.takeDamage(2);
        }
    }

    // パワーアップ vs プレイヤー
    for (let i = game.powerups.length - 1; i >= 0; i--) {
        const powerup = game.powerups[i];

        if (isColliding(powerup, game.player)) {
            game.player.powerUp(powerup.type);
            game.powerups.splice(i, 1);
        }
    }
}

// 当たり判定（円形）
function isColliding(obj1, obj2) {
    const box1 = obj1.getHitbox ? obj1.getHitbox() : obj1;
    const box2 = obj2.getHitbox ? obj2.getHitbox() : obj2;

    // 円形判定（より正確）
    const cx1 = box1.x + box1.width / 2;
    const cy1 = box1.y + box1.height / 2;
    const cx2 = box2.x + box2.width / 2;
    const cy2 = box2.y + box2.height / 2;

    const dx = cx1 - cx2;
    const dy = cy1 - cy2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius1 = Math.min(box1.width, box1.height) / 2;
    const radius2 = Math.min(box2.width, box2.height) / 2;

    return distance < radius1 + radius2;
}

// 矩形判定（オプション）
function isCollidingRect(obj1, obj2) {
    const box1 = obj1.getHitbox ? obj1.getHitbox() : obj1;
    const box2 = obj2.getHitbox ? obj2.getHitbox() : obj2;

    return box1.x < box2.x + box2.width &&
           box1.x + box1.width > box2.x &&
           box1.y < box2.y + box2.height &&
           box1.y + box1.height > box2.y;
}

// 点と矩形の判定
function isPointInRect(x, y, rect) {
    return x >= rect.x &&
           x <= rect.x + rect.width &&
           y >= rect.y &&
           y <= rect.y + rect.height;
}

// 点と円の判定
function isPointInCircle(x, y, cx, cy, radius) {
    const dx = x - cx;
    const dy = y - cy;
    return Math.sqrt(dx * dx + dy * dy) < radius;
}

// 線分と矩形の判定（レーザー用）
function isLineIntersectingRect(x1, y1, x2, y2, rect) {
    // 簡易的な判定
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;

        if (isPointInRect(x, y, rect)) {
            return true;
        }
    }
    return false;
}