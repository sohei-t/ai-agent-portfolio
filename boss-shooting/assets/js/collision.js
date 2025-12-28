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

                    // 貫通弾でない場合は弾を削除
                    if (!bullet.penetrating) {
                        game.bullets.splice(i, 1);
                        break;
                    }
                }
            }

            // 複数ボスとの当たり判定
            for (const boss of game.bosses) {
                if (!boss.destroyed && isColliding(bullet, boss)) {
                    boss.takeDamage(bullet.power);

                    if (!bullet.penetrating) {
                        game.bullets.splice(i, 1);
                        break;
                    }
                }
            }

            // 旧互換性のためのボス判定（削除予定）
            if (game.boss && !game.bosses.includes(game.boss) && isColliding(bullet, game.boss)) {
                game.boss.takeDamage(bullet.power);

                if (!bullet.penetrating) {
                    game.bullets.splice(i, 1);
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

        // 複数ボス vs プレイヤー
        for (const boss of game.bosses) {
            if (!boss.destroyed && isColliding(boss, game.player)) {
                game.player.takeDamage(2);
                break; // 一度に複数ボスからダメージを受けないように
            }
        }

        // 旧互換性のためのボス判定（削除予定）
        if (game.boss && !game.bosses.includes(game.boss) && isColliding(game.boss, game.player)) {
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