// 革新的なボス移動システム - Space Odyssey
class BossMovementSystem {
    constructor(boss) {
        this.boss = boss;
        this.patterns = {
            // 螺旋拡散移動
            spiral: {
                update: (t) => {
                    const radius = 100 + Math.sin(t * 0.02) * 200;
                    const angle = t * 0.05;
                    return {
                        x: this.boss.game.canvas.width * 0.5 + Math.cos(angle) * radius,
                        y: 150 + Math.sin(angle) * radius * 0.5
                    };
                }
            },

            // ランダムテレポート
            teleport: {
                update: (t) => {
                    if (t % 60 === 0) {
                        return {
                            x: 50 + Math.random() * (this.boss.game.canvas.width - 100),
                            y: 50 + Math.random() * 250
                        };
                    }
                    return null;
                }
            },

            // 正弦波移動（画面全体）
            sine_wave: {
                update: (t) => {
                    return {
                        x: this.boss.game.canvas.width * (0.1 + 0.8 * (0.5 + 0.5 * Math.sin(t * 0.03))),
                        y: 100 + Math.sin(t * 0.05) * 150
                    };
                }
            },

            // 追跡＆回避
            hunter: {
                update: (t) => {
                    if (!this.boss.game.player) return null;
                    const player = this.boss.game.player;
                    const phase = Math.floor(t / 100) % 3;

                    switch(phase) {
                        case 0: // 追跡
                            return {
                                x: this.boss.x + Math.sign(player.x - this.boss.x) * 5,
                                y: this.boss.y + Math.sign(player.y - this.boss.y) * 3
                            };
                        case 1: // 回避
                            return {
                                x: this.boss.x - Math.sign(player.x - this.boss.x) * 8,
                                y: Math.max(50, Math.min(300, this.boss.y + (Math.random() - 0.5) * 10))
                            };
                        case 2: // サークリング
                            const angle = Math.atan2(player.y - this.boss.y, player.x - this.boss.x);
                            return {
                                x: player.x + Math.cos(angle + Math.PI/2) * 200,
                                y: player.y + Math.sin(angle + Math.PI/2) * 150
                            };
                    }
                    return null;
                }
            },

            // インフィニティ（∞）パターン
            infinity: {
                update: (t) => {
                    const scale = 200;
                    const speed = 0.04;
                    const angle = t * speed;
                    return {
                        x: this.boss.game.canvas.width * 0.5 + Math.sin(angle) * scale,
                        y: 150 + Math.sin(angle * 2) * scale * 0.4
                    };
                }
            },

            // ジグザグ急降下
            zigzag_dive: {
                update: (t) => {
                    const phase = t % 200;
                    if (phase < 50) {
                        // 上部で待機
                        return {
                            x: this.boss.game.canvas.width * 0.5 + Math.sin(t * 0.1) * 100,
                            y: 80
                        };
                    } else if (phase < 150) {
                        // ジグザグ降下
                        const progress = (phase - 50) / 100;
                        return {
                            x: this.boss.game.canvas.width * (0.2 + 0.6 * Math.sin(progress * Math.PI * 4)),
                            y: 80 + progress * 300
                        };
                    } else {
                        // 上昇
                        const progress = (phase - 150) / 50;
                        return {
                            x: this.boss.x,
                            y: 380 - progress * 300
                        };
                    }
                }
            },

            // カオス移動（完全ランダム）
            chaos: {
                update: (t) => {
                    if (t % 20 === 0) {
                        const targetX = this.boss.x + (Math.random() - 0.5) * 200;
                        const targetY = this.boss.y + (Math.random() - 0.5) * 150;
                        return {
                            x: Math.max(50, Math.min(this.boss.game.canvas.width - 50, targetX)),
                            y: Math.max(50, Math.min(350, targetY))
                        };
                    }
                    return null;
                }
            },

            // 画面端バウンス
            bounce: {
                vx: 8,
                vy: 5,
                update: (t) => {
                    if (!this.vx) this.vx = 8;
                    if (!this.vy) this.vy = 5;

                    let newX = this.boss.x + this.vx;
                    let newY = this.boss.y + this.vy;

                    if (newX <= 50 || newX >= this.boss.game.canvas.width - 50) {
                        this.vx = -this.vx;
                    }
                    if (newY <= 50 || newY >= 350) {
                        this.vy = -this.vy;
                    }

                    return { x: newX, y: newY };
                }
            },

            // 分身移動（残像付き）
            phantom: {
                update: (t) => {
                    const baseX = this.boss.game.canvas.width * 0.5;
                    const baseY = 150;
                    const radius = 150;
                    const angle = t * 0.05;

                    // 高速円運動
                    return {
                        x: baseX + Math.cos(angle) * radius * (1 + Math.sin(t * 0.02) * 0.5),
                        y: baseY + Math.sin(angle) * radius * 0.5
                    };
                }
            }
        };
    }

    getNextPosition(patternName, timer) {
        const pattern = this.patterns[patternName];
        if (pattern && pattern.update) {
            return pattern.update(timer);
        }
        return null;
    }

    // 複数パターンのミックス
    getMixedPosition(patterns, timer) {
        let x = 0, y = 0, count = 0;

        for (const patternName of patterns) {
            const pos = this.getNextPosition(patternName, timer);
            if (pos) {
                x += pos.x;
                y += pos.y;
                count++;
            }
        }

        if (count > 0) {
            return {
                x: x / count,
                y: y / count
            };
        }
        return null;
    }
}

// グローバルに公開
window.BossMovementSystem = BossMovementSystem;