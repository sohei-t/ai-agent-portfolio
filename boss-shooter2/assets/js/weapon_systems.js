// 武器システム拡張版 - レベル1-10の詳細実装
class WeaponSystems {
    // 武器タイプごとの発射間隔（ミリ秒）
    static getFireInterval(weaponType, level) {
        switch(weaponType) {
            case 'default':  // 青：常に連射（変更なし）
                return 100;  // 一定の高速連射

            case 'green':    // 緑：断続的な拡散射撃（倍に延長）
                if (level <= 3) return 1400;   // 1.4秒間隔（700→1400）
                if (level <= 6) return 1800;   // 1.8秒間隔（900→1800）
                return 2200;  // 2.2秒間隔（1100→2200）

            case 'purple':   // 紫（ミサイル）：単発、長い休止時間（倍に延長）
                if (level <= 3) return 2400;  // 2.4秒間隔（1200→2400）
                if (level <= 5) return 3600;  // 3.6秒間隔（1800→3600）
                if (level <= 7) return 4800;  // 4.8秒間隔（2400→4800）
                if (level <= 9) return 6000;  // 6.0秒間隔（3000→6000）
                return 7200;  // L10: 7.2秒間隔（3600→7200）

            case 'yellow':   // 黄（ソニック）：中間的な断続射撃（倍に延長）
                if (level <= 3) return 1800;   // 1.8秒間隔（900→1800）
                if (level <= 6) return 2800;   // 2.8秒間隔（1400→2800）
                if (level <= 8) return 3600;   // 3.6秒間隔（1800→3600）
                return 4400;  // L10: 4.4秒間隔（2200→4400）

            default:
                return 150;
        }
    }
    static fireBeamEnhanced(player, weapon) {
        const level = weapon.level;

        // 青（シアン）武器：レベルごとの詳細実装
        switch(level) {
            case 1:
                // L1: 単発ビーム
                const b1 = player.createBullet(player.x, player.y - 15, 0, -10, 'beam');
                if (b1) {
                    b1.power = 1;
                    b1.color = weapon.color;
                    b1.size = 3;
                }
                break;

            case 2:
                // L2: ダブルビーム
                for (let i = -1; i <= 1; i += 2) {
                    const b = player.createBullet(player.x + i * 8, player.y - 15, 0, -10, 'beam');
                    if (b) {
                        b.power = 1.5;  // ダメージ1.5倍（1→1.5）
                        b.color = weapon.color;
                        b.size = 3;
                    }
                }
                break;

            case 3:
                // L3: トリプルビーム
                for (let i = -1; i <= 1; i++) {
                    const b = player.createBullet(player.x + i * 12, player.y - 15, i * 0.5, -10, 'beam');
                    if (b) {
                        b.power = 1.5;  // ダメージ1.5倍（1→1.5）
                        b.color = weapon.color;
                        b.size = 3;
                    }
                }
                break;

            case 4:
                // L4: 4方向ビーム
                for (let i = -1.5; i <= 1.5; i++) {
                    const b = player.createBullet(player.x + i * 10, player.y - 15, i * 0.8, -10, 'beam');
                    if (b) {
                        b.power = 2;
                        b.color = weapon.color;
                        b.size = 4;
                    }
                }
                break;

            case 5:
                // L5: 5連装ビーム（威力2）
                for (let i = -2; i <= 2; i++) {
                    const b = player.createBullet(player.x + i * 10, player.y - 15, i * 0.5, -10, 'beam');
                    if (b) {
                        b.power = 2;
                        b.color = weapon.color;
                        b.size = 4;
                    }
                }
                break;

            case 6:
                // L6: 貫通ツインレーザー
                for (let i = -1; i <= 1; i += 2) {
                    const l = player.createBullet(player.x + i * 12, player.y - 15, 0, -12, 'laser');
                    if (l) {
                        l.power = 3;
                        l.color = weapon.color;
                        l.penetrating = true;
                        l.width = 4;
                        l.height = 25;
                    }
                }
                break;

            case 7:
                // L7: ワイドビーム（7連装）
                for (let i = -3; i <= 3; i++) {
                    const b = player.createBullet(player.x + i * 8, player.y - 15, i * 0.3, -11, 'beam');
                    if (b) {
                        b.power = 2;
                        b.color = weapon.color;
                        b.size = 3;
                    }
                }
                break;

            case 8:
                // L8: ホーミングビーム×3
                for (let i = -1; i <= 1; i++) {
                    const h = player.createBullet(player.x + i * 15, player.y - 15, i * 2, -8, 'homing');
                    if (h) {
                        h.power = 3;
                        h.color = weapon.color;
                        h.homingStrength = 0.3;
                        h.size = 5;
                    }
                }
                break;

            case 9:
                // L9: 超貫通レーザー×3
                for (let i = -1; i <= 1; i++) {
                    const l = player.createBullet(player.x + i * 20, player.y - 15, i * 0.5, -14, 'laser');
                    if (l) {
                        l.power = 5;
                        l.color = weapon.color;
                        l.penetrating = true;
                        l.width = 6;
                        l.height = 35;
                    }
                }
                break;

            case 10:
                // L10: オールレンジビーム（全方向）
                for (let i = 0; i < 12; i++) {
                    const angle = (Math.PI * 2 / 12) * i;
                    const b = player.createBullet(
                        player.x,
                        player.y,
                        Math.cos(angle) * 10,
                        Math.sin(angle) * 10,
                        'beam'
                    );
                    if (b) {
                        b.power = 6;  // ダメージ1.5倍（4→6）
                        b.color = weapon.color;
                        b.penetrating = true;
                        b.size = 5;
                    }
                }
                break;
        }
    }

    static fireSpreadEnhanced(player, weapon) {
        const level = weapon.level;

        // 緑武器：拡散ショットガン系
        switch(level) {
            case 1:
                // L1: 3方向ショット
                for (let i = -1; i <= 1; i++) {
                    const angle = i * 0.3;
                    const b = player.createBullet(
                        player.x,
                        player.y - 15,
                        Math.sin(angle) * 5,
                        -8 + Math.abs(i),
                        'spread'
                    );
                    if (b) {
                        b.power = 1.5;  // ダメージ1.5倍（1→1.5）
                        b.color = weapon.color;
                        b.size = 3;
                    }
                }
                break;

            case 2:
                // L2: 5方向ショット
                for (let i = -2; i <= 2; i++) {
                    const angle = i * 0.25;
                    const b = player.createBullet(
                        player.x,
                        player.y - 15,
                        Math.sin(angle) * 6,
                        -8 + Math.abs(i) * 0.5,
                        'spread'
                    );
                    if (b) {
                        b.power = 1.5;  // ダメージ1.5倍（1→1.5）
                        b.color = weapon.color;
                        b.size = 3;
                    }
                }
                break;

            case 3:
                // L3: 7方向ショット
                for (let i = -3; i <= 3; i++) {
                    const angle = i * 0.2;
                    const b = player.createBullet(
                        player.x,
                        player.y - 15,
                        Math.sin(angle) * 7,
                        -9 + Math.abs(i) * 0.3,
                        'spread'
                    );
                    if (b) {
                        b.power = 1.5;  // ダメージ1.5倍（1→1.5）
                        b.color = weapon.color;
                        b.size = 3;
                    }
                }
                break;

            case 4:
                // L4: ダブルバレル（2×5方向）
                for (let side = -1; side <= 1; side += 2) {
                    for (let i = -2; i <= 2; i++) {
                        const angle = i * 0.2;
                        const b = player.createBullet(
                            player.x + side * 10,
                            player.y - 15,
                            Math.sin(angle) * 6 + side,
                            -9,
                            'spread'
                        );
                        if (b) {
                            b.power = 4.5;  // ダメージ1.5倍（3→4.5）  // ダメージ1.5倍（2→3）
                            b.color = weapon.color;
                            b.size = 4;
                        }
                    }
                }
                break;

            case 5:
                // L5: 爆散弾（分裂）
                const mainBullet = player.createBullet(player.x, player.y - 15, 0, -8, 'cluster');
                if (mainBullet) {
                    mainBullet.power = 2;
                    mainBullet.color = weapon.color;
                    mainBullet.clusterCount = 5;
                    mainBullet.size = 6;
                }
                break;

            case 6:
                // L6: ウェーブショット（波状拡散）
                for (let i = -4; i <= 4; i++) {
                    const angle = i * 0.15;
                    const b = player.createBullet(
                        player.x,
                        player.y - 15,
                        Math.sin(angle) * 8,
                        -10,
                        'wave_spread'
                    );
                    if (b) {
                        b.power = 2;
                        b.color = weapon.color;
                        b.waveMotion = true;
                        b.size = 4;
                    }
                }
                break;

            case 7:
                // L7: バウンドショット（跳弾）
                for (let i = -2; i <= 2; i++) {
                    const b = player.createBullet(
                        player.x + i * 15,
                        player.y - 15,
                        i * 3,
                        -8,
                        'bounce'
                    );
                    if (b) {
                        b.power = 4.5;  // ダメージ1.5倍（3→4.5）
                        b.color = weapon.color;
                        b.bounceCount = 3;
                        b.size = 5;
                    }
                }
                break;

            case 8:
                // L8: スパイラルショット（螺旋拡散）
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI * 2 / 8) * i;
                    const b = player.createBullet(
                        player.x,
                        player.y,
                        Math.cos(angle) * 6,
                        Math.sin(angle) * 6 - 5,
                        'spiral'
                    );
                    if (b) {
                        b.power = 4.5;  // ダメージ1.5倍（3→4.5）
                        b.color = weapon.color;
                        b.spiralMotion = true;
                        b.size = 4;
                    }
                }
                break;

            case 9:
                // L9: ショットガンストーム（大量拡散）
                for (let i = -6; i <= 6; i++) {
                    const angle = i * 0.12;
                    const speed = 12 - Math.abs(i) * 0.5;
                    const b = player.createBullet(
                        player.x,
                        player.y - 15,
                        Math.sin(angle) * 10,
                        -speed,
                        'spread'
                    );
                    if (b) {
                        b.power = 6;  // ダメージ1.5倍（4→6）
                        b.color = weapon.color;
                        b.penetrating = true;
                        b.size = 5;
                    }
                }
                break;

            case 10:
                // L10: オムニショット（全方向拡散）
                for (let i = 0; i < 16; i++) {
                    const angle = (Math.PI * 2 / 16) * i;
                    const b = player.createBullet(
                        player.x,
                        player.y,
                        Math.cos(angle) * 8,
                        Math.sin(angle) * 8,
                        'omni'
                    );
                    if (b) {
                        b.power = 5;
                        b.color = weapon.color;
                        b.penetrating = true;
                        b.homing = true;
                        b.size = 6;
                    }
                }
                break;
        }
    }

    static fireLaserEnhanced(player, weapon) {
        // 紫武器：エクスプロージョンミサイル（爆発・巻き込み型）
        const level = weapon.level;

        switch(level) {
            case 1:
                // L1: シングルロケット（小爆発）
                const r1 = player.createBullet(player.x, player.y - 15, 0, -6, 'missile');
                if (r1) {
                    r1.power = 3;  // ダメージ1.5倍（2→3）
                    r1.color = weapon.color;
                    r1.explosive = true;
                    r1.explosionRadius = 30;
                    r1.width = 6;
                    r1.height = 10;
                }
                break;

            case 2:
                // L2: ツインロケット
                for (let i = -1; i <= 1; i += 2) {
                    const r = player.createBullet(player.x + i * 12, player.y - 15, 0, -6, 'missile');
                    if (r) {
                        r.power = 3;  // ダメージ1.5倍（2→3）
                        r.color = weapon.color;
                        r.explosive = true;
                        r.explosionRadius = 30;
                        r.width = 6;
                        r.height = 10;
                    }
                }
                break;

            case 3:
                // L3: ヘビーボム（中爆発）
                const hb = player.createBullet(player.x, player.y - 15, 0, -5, 'bomb');
                if (hb) {
                    hb.power = 6;  // ダメージ1.5倍（4→6）
                    hb.color = weapon.color;
                    hb.explosive = true;
                    hb.explosionRadius = 50;
                    hb.width = 10;
                    hb.height = 10;
                }
                break;

            case 4:
                // L4: クラスター爆弾（分裂）
                const cb = player.createBullet(player.x, player.y - 15, 0, -5, 'cluster');
                if (cb) {
                    cb.power = 4.5;  // ダメージ1.5倍（3→4.5）
                    cb.color = weapon.color;
                    cb.explosive = true;
                    cb.explosionRadius = 40;
                    cb.clusterCount = 3;
                    cb.width = 8;
                    cb.height = 12;
                }
                break;

            case 5:
                // L5: ホーミングミサイル（誘導）
                const hm = player.createBullet(player.x, player.y - 15, 0, -4, 'homing');
                if (hm) {
                    hm.power = 6;  // ダメージ1.5倍（4→6）
                    hm.color = weapon.color;
                    hm.explosive = true;
                    hm.explosionRadius = 50;
                    hm.homingStrength = 0.3;
                    hm.width = 8;
                    hm.height = 12;
                }
                break;

            case 6:
                // L6: デュアルホーミング
                for (let i = -1; i <= 1; i += 2) {
                    const dhm = player.createBullet(player.x + i * 15, player.y - 15, i * 2, -4, 'homing');
                    if (dhm) {
                        dhm.power = 6;  // ダメージ1.5倍（4→6）
                        dhm.color = weapon.color;
                        dhm.explosive = true;
                        dhm.explosionRadius = 50;
                        dhm.homingStrength = 0.3;
                        dhm.width = 8;
                        dhm.height = 12;
                    }
                }
                break;

            case 7:
                // L7: スマートボム（高精度追尾・大爆発）
                const sb = player.createBullet(player.x, player.y - 15, 0, -3, 'homing');
                if (sb) {
                    sb.power = 9;  // ダメージ1.5倍（6→9）
                    sb.color = weapon.color;
                    sb.explosive = true;
                    sb.explosionRadius = 70;
                    sb.homingStrength = 0.5;
                    sb.width = 12;
                    sb.height = 16;
                }
                break;

            case 8:
                // L8: マルチロックオン（3発同時追尾）
                for (let i = -1; i <= 1; i++) {
                    const ml = player.createBullet(player.x + i * 20, player.y - 15, i * 3, -3, 'homing');
                    if (ml) {
                        ml.power = 7.5;  // ダメージ1.5倍（5→7.5）
                        ml.color = weapon.color;
                        ml.explosive = true;
                        ml.explosionRadius = 60;
                        ml.homingStrength = 0.4;
                        ml.width = 10;
                        ml.height = 14;
                    }
                }
                break;

            case 9:
                // L9: メガクラスター（5個分裂・連鎖爆発）
                const mc = player.createBullet(player.x, player.y - 15, 0, -3, 'mega_cluster');
                if (mc) {
                    mc.power = 12;  // ダメージ1.5倍（8→12）
                    mc.color = weapon.color;
                    mc.explosive = true;
                    mc.explosionRadius = 80;
                    mc.clusterCount = 5;
                    mc.width = 15;
                    mc.height = 20;
                }
                break;

            case 10:
                // L10: ニュークリアミサイル（超大爆発）
                const nuke = player.createBullet(player.x, player.y - 15, 0, -2, 'nuke');
                if (nuke) {
                    nuke.power = 22.5;  // ダメージ1.5倍（15→22.5）
                    nuke.color = weapon.color;
                    nuke.explosive = true;
                    nuke.explosionRadius = 150;
                    nuke.width = 20;
                    nuke.height = 25;
                    nuke.screenShake = true;  // 画面揺れ演出
                }
                break;
        }
    }

    static fireWaveEnhanced(player, weapon) {
        // 黄色武器：ソニックカッター（半円刃型レーザー）
        const level = weapon.level;

        switch(level) {
            case 1:
                // L1: ソニックブレード（小型半円刃）
                const sb1 = player.createBullet(player.x, player.y - 15, 0, -8, 'sonic_blade');
                if (sb1) {
                    sb1.power = 3;  // ダメージ1.5倍（2→3）
                    sb1.color = weapon.color;
                    sb1.penetrating = true;
                    sb1.pierceCount = 2;
                    sb1.width = 20;
                    sb1.height = 10;
                    sb1.type = 'sonic_blade';
                }
                break;

            case 2:
                // L2: ツインカッター（V字発射）
                for (let i = -1; i <= 1; i += 2) {
                    const tc = player.createBullet(player.x + i * 10, player.y - 15, i * 2, -8, 'sonic_blade');
                    if (tc) {
                        tc.power = 3;  // ダメージ1.5倍（2→3）
                        tc.color = weapon.color;
                        tc.penetrating = true;
                        tc.pierceCount = 2;
                        tc.width = 20;
                        tc.height = 10;
                        tc.type = 'sonic_blade';
                    }
                }
                break;

            case 3:
                // L3: ワイドカッター（大型半円刃）
                const wc = player.createBullet(player.x, player.y - 15, 0, -7, 'sonic_blade');
                if (wc) {
                    wc.power = 4.5;  // ダメージ1.5倍（3→4.5）
                    wc.color = weapon.color;
                    wc.penetrating = true;
                    wc.pierceCount = 3;
                    wc.width = 30;
                    wc.height = 15;
                    wc.type = 'sonic_blade';
                }
                break;

            case 4:
                // L4: スピンブレード（回転する刃）
                const spin = player.createBullet(player.x, player.y - 15, 0, -6, 'sonic_blade');
                if (spin) {
                    spin.power = 4.5;  // ダメージ1.5倍（3→4.5）
                    spin.color = weapon.color;
                    spin.penetrating = true;
                    spin.pierceCount = 5;
                    spin.width = 25;
                    spin.height = 12;
                    spin.spinning = true;
                    spin.type = 'sonic_blade';
                }
                break;

            case 5:
                // L5: トリプルスライサー（扇状発射）
                for (let i = -1; i <= 1; i++) {
                    const angle = i * 0.3;  // 扇状に広がる
                    const ts = player.createBullet(
                        player.x + i * 15,
                        player.y - 15,
                        Math.sin(angle) * 5,
                        -Math.cos(angle) * 8,
                        'sonic_blade'
                    );
                    if (ts) {
                        ts.power = 4.5;  // ダメージ1.5倍（3→4.5）
                        ts.color = weapon.color;
                        ts.penetrating = true;
                        ts.pierceCount = 3;
                        ts.width = 22;
                        ts.height = 11;
                        ts.type = 'sonic_blade';
                    }
                }
                break;

            case 6:
                // L6: ウェーブカッター（波動軌道）
                const wave = player.createBullet(player.x, player.y - 15, 0, -7, 'sonic_blade');
                if (wave) {
                    wave.power = 6;  // ダメージ1.5倍（4→6）
                    wave.color = weapon.color;
                    wave.penetrating = true;
                    wave.pierceCount = 999;  // 無限貫通
                    wave.width = 35;
                    wave.height = 17;
                    wave.waveMotion = true;  // 波動軌道
                    wave.type = 'sonic_blade';
                }
                break;

            case 7:
                // L7: ブーメランブレード（戻ってくる刃）
                const boomerang = player.createBullet(player.x, player.y - 15, 0, -6, 'sonic_blade');
                if (boomerang) {
                    boomerang.power = 7.5;  // ダメージ1.5倍（5→7.5）
                    boomerang.color = weapon.color;
                    boomerang.penetrating = true;
                    boomerang.pierceCount = 999;
                    boomerang.width = 30;
                    boomerang.height = 15;
                    boomerang.boomerang = true;  // 戻ってくる
                    boomerang.type = 'sonic_blade';
                }
                break;

            case 8:
                // L8: サークルスライサー（円形拡張波）
                const circle = player.createBullet(player.x, player.y - 15, 0, -5, 'sonic_blade');
                if (circle) {
                    circle.power = 7.5;  // ダメージ1.5倍（5→7.5）
                    circle.color = weapon.color;
                    circle.penetrating = true;
                    circle.pierceCount = 999;
                    circle.width = 40;
                    circle.height = 20;
                    circle.expanding = true;  // 拡張する円形波
                    circle.type = 'sonic_blade';
                }
                break;

            case 9:
                // L9: ディメンジョンカッター（空間を切り裂く巨大刃）
                const dimension = player.createBullet(player.x, player.y - 15, 0, -4, 'sonic_blade');
                if (dimension) {
                    dimension.power = 10.5;  // ダメージ1.5倍（7→10.5）
                    dimension.color = weapon.color;
                    dimension.penetrating = true;
                    dimension.pierceCount = 999;
                    dimension.width = 50;
                    dimension.height = 25;
                    dimension.dimensional = true;  // 次元切断エフェクト
                    dimension.type = 'sonic_blade';
                }
                break;

            case 10:
                // L10: インフィニティエッジ（連続発射される光の刃の嵐）
                // 3連射の巨大刃
                for (let j = 0; j < 3; j++) {
                    setTimeout(() => {
                        const infinity = player.createBullet(
                            player.x,
                            player.y - 15,
                            0,
                            -10,
                            'sonic_blade'
                        );
                        if (infinity) {
                            infinity.power = 15;  // ダメージ1.5倍（10→15）
                            infinity.color = weapon.color;
                            infinity.penetrating = true;
                            infinity.pierceCount = 999;
                            infinity.width = 60;
                            infinity.height = 30;
                            infinity.infinity = true;  // 無限の刃
                            infinity.type = 'sonic_blade';
                        }
                    }, j * 100);  // 100ms間隔で連射
                }
                break;
        }
    }
}

// グローバルに公開
window.WeaponSystems = WeaponSystems;