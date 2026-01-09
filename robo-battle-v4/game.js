/**
 * ROBO BATTLE V2.0 - Photorealistic 3D Graphics Edition
 * Single-file game implementation with AI-generated robot sprites
 *
 * Features:
 * - 1P vs CPU robot battle
 * - 6 stages (Urban, Pyramid, Parthenon, Factory, Cave, Neo City)
 * - 4 parameter customization (JUMP, WALK, BEAM, KICK)
 * - Mobile support (Gyro + Zone Touch) with beam-kick (shoot at close range = kick)
 * - AI-generated 3D robot sprites (Vertex AI Imagen)
 * - Procedural chiptune BGM (Title & Battle)
 * - Sound effects (Beam, Hit, Kick, Jump, KO, Victory/Defeat)
 * - Particle system (Dust, Sparks, Explosions)
 * - Screen effects (Shake, Flash)
 * - Enhanced robot animation with joint-based limb movement
 * - Mobile control hints (JUMP/BEAM - outside canvas via HTML)
 * - 60FPS Canvas rendering
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS;

// Physics constants
const PHYSICS = {
    gravity: 0.5,
    maxFallSpeed: 15,
    friction: 0.8,
    airResistance: 0.95
};

// Robot constants (V4.1: Smaller for more tactical gameplay)
const ROBOT = {
    width: 54,            // 72 → 54 (75% of original)
    height: 72,           // 96 → 72 (75% of original)
    maxHp: 400,           // V4: Doubled HP for more weapon variety gameplay
    invincibleTime: 500,
    beamCooldown: 600,    // Slightly slower beam rate
    kickCooldown: 800,    // Slightly faster kick
    kickRange: 24,        // Scaled down (30 * 0.75)
    kickHeight: 36,       // Scaled down (48 * 0.75)
    knockback: 6          // Reduced knockback for smaller characters
};

// KO演出の設定
const KO_SETTINGS = {
    freezeTime: 1500,       // 1.5秒フリーズ
    slowMotionFactor: 0.2,  // スローモーション係数
    koTextScale: 3.0,       // KO!テキストの最大スケール
    explosionDuration: 800  // 爆発エフェクト時間
};

// Charge beam constants
const CHARGE_BEAM = {
    maxChargeTime: 3000,      // 3 seconds for max charge
    maxDamageMultiplier: 3,   // 3x damage at max charge
    minChargeTime: 100,       // Minimum time to register as charged
    sizeMultiplierMax: 2.0,   // Beam size at max charge
    chargeThresholds: {
        low: 0.33,            // 1 second - yellow glow
        mid: 0.66,            // 2 seconds - orange glow
        max: 1.0              // 3 seconds - red glow + MAX indicator
    }
};

// Beam constants
const BEAM = {
    width: 16,            // Slightly smaller beam
    height: 6,
    speed: 7              // 12 → 7 (much slower for tactical gameplay)
};

// Item Mode constants
const ITEMS = {
    enabled: false,  // Default: off (set by setup screen)
    spawnInterval: 3000,  // V4.2: Spawn new item every 3 seconds (was 8 seconds)
    itemLifetime: 12000,  // Items disappear after 12 seconds
    types: {
        HP: {
            healAmount: 40,
            color: '#00ff00',
            glowColor: 'rgba(0, 255, 0, 0.5)'
        },
        RAPID: {
            duration: 8000,  // 8 seconds of rapid fire
            cooldownMultiplier: 0.3,  // 70% faster beam
            color: '#ffff00',
            glowColor: 'rgba(255, 255, 0, 0.5)'
        },
        MEGA: {
            duration: 5000,  // 5 seconds of mega beam
            damageMultiplier: 2.5,
            sizeMultiplier: 2.0,
            color: '#ff00ff',
            glowColor: 'rgba(255, 0, 255, 0.5)'
        },
        SHIELD: {
            duration: 6000,  // 6 seconds of invincibility
            color: '#00ffff',
            glowColor: 'rgba(0, 255, 255, 0.5)'
        },
        // V4 Weapon Items
        W_BAZOOKA: {
            isWeapon: true,
            weaponType: 'BAZOOKA',
            color: '#ff6600',
            glowColor: 'rgba(255, 102, 0, 0.6)'
        },
        W_MACHINEGUN: {
            isWeapon: true,
            weaponType: 'MACHINEGUN',
            color: '#ffff00',
            glowColor: 'rgba(255, 255, 0, 0.5)'
        },
        W_SPREAD: {
            isWeapon: true,
            weaponType: 'SPREAD',
            color: '#00ff99',
            glowColor: 'rgba(0, 255, 153, 0.5)'
        },
        W_SWORD: {
            isWeapon: true,
            weaponType: 'SWORD',
            color: '#ff00ff',
            glowColor: 'rgba(255, 0, 255, 0.7)'
        },
        // V4 新武器アイテム
        W_HOMING: {
            isWeapon: true,
            weaponType: 'HOMING_MISSILE',
            color: '#ff3333',
            glowColor: 'rgba(255, 51, 51, 0.6)'
        },
        W_CLONE: {
            isWeapon: true,
            weaponType: 'SHADOW_CLONE',
            color: '#9933ff',
            glowColor: 'rgba(153, 51, 255, 0.5)'
        },
        W_TIGER: {
            isWeapon: true,
            weaponType: 'SPIRIT_TIGER',
            color: '#ff9900',
            glowColor: 'rgba(255, 153, 0, 0.7)'
        },
        W_AERIAL: {
            isWeapon: true,
            weaponType: 'AERIAL_BOMB',
            color: '#00ffff',
            glowColor: 'rgba(0, 255, 255, 0.6)'
        },
        // V4.3: 龍召喚アイテム
        W_DRAGON: {
            isWeapon: true,
            weaponType: 'GREEN_DRAGON',
            color: '#00ff66',
            glowColor: 'rgba(0, 255, 102, 0.8)'
        },
        // V4.3: メテオストライクアイテム
        W_METEOR: {
            isWeapon: true,
            weaponType: 'METEOR_STRIKE',
            color: '#ff6600',
            glowColor: 'rgba(255, 102, 0, 0.8)'
        },
        // V4.3: 魔獣召喚アイテム
        W_BEAST: {
            isWeapon: true,
            weaponType: 'BEAST_SUMMON',
            color: '#ff33ff',
            glowColor: 'rgba(255, 51, 255, 0.8)'
        }
    },
    warpZone: {
        width: 60,
        height: 80,
        color: '#9900ff',
        glowColor: 'rgba(153, 0, 255, 0.6)',
        // Dynamic warp zone settings (V4.2: faster spawns for more action)
        spawnIntervalMin: 5000,   // V4.2: Minimum 5 seconds between spawns (was 10)
        spawnIntervalMax: 10000,  // V4.2: Maximum 10 seconds between spawns (was 15)
        lifetime: 8000,           // Warp zone lasts 8 seconds (more time to use)
        warningTime: 1500,        // 1.5 second warning before activation
        maxActive: 1              // Only 1 warp zone at a time (less chaotic)
    },
    deathZone: {
        color: '#ff0000',
        glowColor: 'rgba(255, 0, 0, 0.4)'
    }
};

// ============================================================================
// WEAPONS SYSTEM (V4.2 - Balanced: Power vs Fire Rate trade-off)
// ============================================================================
// 基準: 通常弾 = 1.0x (25ダメージ), MEGA弾 = 2.5x (62.5ダメージ)
// バランス原則: 高威力 = 低連射, 低威力 = 高連射
const WEAPONS = {
    duration: 10000,  // All weapons last 10 seconds
    types: {
        // === 高連射・低威力 ===
        MACHINEGUN: {
            damage: 10,         // 0.4x - 低威力
            speed: 18, width: 14, height: 5,
            color: '#ffff00', glowColor: 'rgba(255, 255, 0, 0.5)',
            range: 350,
            cooldown: 150,      // 高連射 (150ms間隔)
            powerRating: 0.4,   // 威力評価
            rateRating: 5,      // 連射評価 (1-5)
            name: 'マシンガン', nameColor: '#FFFF00',
            description: '低威力・超高連射'
        },
        SPREAD: {
            damage: 15,         // 0.6x × 3発 = 1.8x total
            speed: 10, width: 14, height: 6,
            color: '#00ff99', glowColor: 'rgba(0, 255, 153, 0.5)',
            spreadCount: 3, spreadAngle: 15,
            cooldown: 700,      // 中連射
            powerRating: 1.8,
            rateRating: 3,
            name: 'スプレッド', nameColor: '#00FF99',
            description: '3方向同時発射'
        },
        // === 中威力・中連射 ===
        BAZOOKA: {
            damage: 50,         // 2.0x - 中威力
            speed: 6, width: 32, height: 16,
            color: '#ff6600', glowColor: 'rgba(255, 102, 0, 0.6)',
            explosionRadius: 60,
            cooldown: 1500,     // 低連射 (1.5秒間隔)
            powerRating: 2.0,
            rateRating: 2,
            name: 'バズーカ', nameColor: '#FF6600',
            description: '爆発範囲攻撃'
        },
        HOMING_MISSILE: {
            damage: 55,         // V4.3: ダメージ増加
            speed: 6, width: 28, height: 14,  // V4.3: 速度・サイズ増加
            color: '#ff3333', glowColor: 'rgba(255, 51, 51, 0.8)',
            turnRate: 0.15, missileCount: 1,  // V4.3: 1発に変更（必中なので）
            cooldown: 2500,
            singleUse: true,    // V4.3: 1アイテム1回のみ発射可能
            powerRating: 4.4,
            rateRating: 1,
            name: '誘導ミサイル', nameColor: '#FF3333',
            description: '強力追尾×1発'
        },
        AERIAL_BOMB: {
            damage: 35,         // 1.4x × 4発 = 5.6x total
            bombCount: 4, fallSpeed: 10,
            color: '#00ffff', glowColor: 'rgba(0, 255, 255, 0.6)',
            explosionRadius: 55,
            cooldown: 2500,     // 低連射 (2.5秒間隔)
            hoverDuration: 800,
            powerRating: 5.6,
            rateRating: 1,
            name: '空中爆撃', nameColor: '#00FFFF',
            description: '上空から4発投下'
        },
        // === 高威力・低連射 ===
        SWORD: {
            damage: 75,         // 3.0x - 高威力
            range: 70, width: 60, height: 90,
            color: '#ff00ff', glowColor: 'rgba(255, 0, 255, 0.7)',
            cooldown: 1000,     // 中連射 (近接のみ)
            swingDuration: 250,
            powerRating: 3.0,
            rateRating: 2,
            name: '斬撃', nameColor: '#FF00FF',
            description: '近接・高威力'
        },
        SPIRIT_TIGER: {
            damage: 80,         // 3.2x - 高威力
            speed: 14, width: 140, height: 90,
            color: '#ff9900', glowColor: 'rgba(255, 153, 0, 0.7)',
            cooldown: 3000,     // 超低連射 (3秒間隔)
            powerRating: 3.2,
            rateRating: 1,
            name: '虎召喚', nameColor: '#FF9900',
            description: '大型・高威力',
            explodeOnHit: true  // V4.3: 敵に当たったら爆発して消滅
        },
        // === 特殊武器 ===
        // V4.3: 緑龍召喚 (虎と同様の大型攻撃、緑色)
        GREEN_DRAGON: {
            damage: 70,         // 高ダメージ (虎と同等)
            speed: 6,           // 虎より少し遅い
            width: 180, height: 100,
            color: '#00ff66', glowColor: 'rgba(0, 255, 102, 0.8)',
            cooldown: 3500,     // 3.5秒間隔
            powerRating: 2.8,   // 威力2.8
            rateRating: 1,
            name: '龍召喚', nameColor: '#00FF66',
            description: '大型龍・高威力',
            explodeOnHit: true  // V4.3: 敵に当たったら爆発して消滅
        },
        // V4.3: メテオストライク (範囲攻撃)
        METEOR_STRIKE: {
            damage: 60,         // 高ダメージ
            speed: 12,          // 落下速度
            radius: 80,         // 爆発範囲
            width: 50, height: 50,
            color: '#ff6600', glowColor: 'rgba(255, 102, 0, 0.8)',
            cooldown: 4000,     // 4秒間隔
            powerRating: 2.4,   // 威力2.4
            rateRating: 1,
            name: 'メテオ', nameColor: '#FF6600',
            description: '隕石落下・範囲攻撃'
        },
        // V4.3: 魔獣召喚 (AI controlled beast)
        BEAST_SUMMON: {
            damage: 15,         // V4.3: Flame damage halved (30→15) for balance
            hp: 45,             // V4.3: Beast HP = 3 normal shots (15 damage × 3 = 45)
            speed: 1.5,         // Movement speed (slower for balance)
            flameRange: 120,    // Flame attack range (attack from distance)
            idealDistance: 70,  // Keep this distance from target
            flameCooldown: 1500,// Flame attack cooldown
            width: 96, height: 72,  // V4.3: Larger size (64x48→96x72) for easier targeting
            color: '#ff33ff', glowColor: 'rgba(255, 51, 255, 0.8)',
            cooldown: 5000,     // 5秒間隔（再召喚）
            powerRating: 3.5,
            rateRating: 1,
            name: '魔獣召喚', nameColor: '#FF33FF',
            description: 'AI追尾・炎攻撃'
        },
        // === パッシブ ===
        SHADOW_CLONE: {
            damage: 0, cloneCount: 2, cloneDelay: 150,
            color: '#9933ff', glowColor: 'rgba(153, 51, 255, 0.5)',
            cooldown: 0,
            powerRating: 0,
            rateRating: 0,
            name: '残像分身', nameColor: '#9933FF',
            description: '分身で撹乱'
        }
    }
};

// Game states
const GameState = {
    LOADING: 'loading',
    TITLE: 'title',
    SETUP: 'setup',
    ITEM_CONFIG: 'item_config',  // V4: Item selection screen
    BATTLE: 'battle',
    KO: 'ko',           // NEW: KO演出状態
    RESULT: 'result',
    PAUSED: 'paused',
    // Online mode states
    ONLINE_LOBBY: 'online_lobby',
    ONLINE_WAITING: 'online_waiting',
    ONLINE_CONNECTING: 'online_connecting'
};

// Colors
const COLORS = {
    playerPrimary: '#FF0000',
    playerSecondary: '#CC0000',
    playerDark: '#990000',
    enemyPrimary: '#0066FF',
    enemySecondary: '#0044CC',
    enemyDark: '#003399',
    beamRed: '#FF6600',
    beamBlue: '#0088FF',
    platform: '#4d4d6a',
    ui: '#ffffff'
};

// ============================================================================
// STAGE DATA
// ============================================================================

// Ground Y adjusted to match background road position (Y≈510)
// Robot height = 96, so spawn Y = 510 - 96 = 414
// V4.1: Platforms adjusted for smaller characters (72px height, ~100px jump)
const STAGES = [
    {
        name: 'Urban City',
        displayName: '市街地',
        bgColor: '#1a1a2e',
        platforms: [
            { x: 0, y: 510, width: 800, height: 90, type: 'solid' },  // Ground
            // V4.3: Enhanced platform layout for full-screen combat
            // Left side platforms (ビル壁沿い)
            { x: 0, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 0, y: 350, width: 90, height: 15, type: 'passthrough' },
            { x: 0, y: 270, width: 80, height: 15, type: 'passthrough' },
            { x: 0, y: 190, width: 70, height: 15, type: 'passthrough' },
            // Right side platforms (ビル壁沿い)
            { x: 700, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 710, y: 350, width: 90, height: 15, type: 'passthrough' },
            { x: 720, y: 270, width: 80, height: 15, type: 'passthrough' },
            { x: 730, y: 190, width: 70, height: 15, type: 'passthrough' },
            // Lower tier
            { x: 140, y: 440, width: 130, height: 15, type: 'passthrough' },
            { x: 335, y: 450, width: 130, height: 15, type: 'passthrough' },
            { x: 530, y: 440, width: 130, height: 15, type: 'passthrough' },
            // Middle tier
            { x: 100, y: 360, width: 140, height: 15, type: 'passthrough' },
            { x: 330, y: 370, width: 140, height: 15, type: 'passthrough' },
            { x: 560, y: 360, width: 140, height: 15, type: 'passthrough' },
            // Upper-middle tier
            { x: 170, y: 280, width: 120, height: 15, type: 'passthrough' },
            { x: 510, y: 280, width: 120, height: 15, type: 'passthrough' },
            // Top tier
            { x: 280, y: 200, width: 240, height: 15, type: 'passthrough' },
            // Highest platform (屋上)
            { x: 340, y: 120, width: 120, height: 15, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 80, y: 438 }, enemy: { x: 620, y: 438 } },
        warpZones: [],
        deathZones: [],
        itemSpawns: [
            { x: 400, y: 320, types: ['HP', 'RAPID'] },
            { x: 130, y: 230, types: ['MEGA', 'SHIELD'] },
            { x: 670, y: 400, types: ['HP', 'RAPID'] },
            { x: 400, y: 80, types: ['MEGA'] }
        ]
    },
    {
        name: 'Pyramid',
        displayName: 'ピラミッド',
        bgColor: '#ff9966',
        platforms: [
            { x: 0, y: 510, width: 800, height: 90, type: 'solid' },
            // V4.3: Left side platforms (added)
            { x: 0, y: 430, width: 80, height: 15, type: 'passthrough' },
            { x: 0, y: 340, width: 90, height: 15, type: 'passthrough' },
            { x: 0, y: 250, width: 80, height: 15, type: 'passthrough' },
            { x: 0, y: 160, width: 70, height: 15, type: 'passthrough' },
            // V4.3: Right side platforms (added)
            { x: 720, y: 430, width: 80, height: 15, type: 'passthrough' },
            { x: 710, y: 340, width: 90, height: 15, type: 'passthrough' },
            { x: 720, y: 250, width: 80, height: 15, type: 'passthrough' },
            { x: 730, y: 160, width: 70, height: 15, type: 'passthrough' },
            // Pyramid steps - central pyramid shape
            { x: 100, y: 440, width: 600, height: 15, type: 'passthrough' },
            { x: 150, y: 370, width: 500, height: 15, type: 'passthrough' },
            { x: 200, y: 300, width: 400, height: 15, type: 'passthrough' },
            { x: 250, y: 230, width: 300, height: 15, type: 'passthrough' },
            { x: 300, y: 160, width: 200, height: 15, type: 'passthrough' },
            { x: 350, y: 90, width: 100, height: 15, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 80, y: 438 }, enemy: { x: 620, y: 438 } },
        warpZones: [],
        deathZones: [],
        itemSpawns: [
            { x: 400, y: 50, types: ['MEGA', 'SHIELD'] },
            { x: 320, y: 120, types: ['HP'] },
            { x: 480, y: 120, types: ['RAPID'] },
            { x: 280, y: 190, types: ['HP', 'RAPID'] }
        ]
    },
    {
        name: 'Parthenon',
        displayName: 'パルテノン神殿',
        bgColor: '#87ceeb',
        platforms: [
            { x: 0, y: 510, width: 800, height: 90, type: 'solid' },
            // V4.3: Removed solid pillars - replaced with passthrough platforms
            // Left side platforms (階段状)
            { x: 0, y: 440, width: 100, height: 15, type: 'passthrough' },
            { x: 0, y: 360, width: 90, height: 15, type: 'passthrough' },
            { x: 0, y: 280, width: 80, height: 15, type: 'passthrough' },
            { x: 0, y: 200, width: 70, height: 15, type: 'passthrough' },
            // Right side platforms (階段状)
            { x: 700, y: 440, width: 100, height: 15, type: 'passthrough' },
            { x: 710, y: 360, width: 90, height: 15, type: 'passthrough' },
            { x: 720, y: 280, width: 80, height: 15, type: 'passthrough' },
            { x: 730, y: 200, width: 70, height: 15, type: 'passthrough' },
            // Lower-middle platforms (柱の位置にpassthrough)
            { x: 120, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 580, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 340, y: 450, width: 120, height: 15, type: 'passthrough' },
            // Middle tier platforms
            { x: 100, y: 360, width: 120, height: 15, type: 'passthrough' },
            { x: 340, y: 370, width: 120, height: 15, type: 'passthrough' },
            { x: 580, y: 360, width: 120, height: 15, type: 'passthrough' },
            // Upper-middle tier
            { x: 150, y: 280, width: 140, height: 15, type: 'passthrough' },
            { x: 510, y: 280, width: 140, height: 15, type: 'passthrough' },
            // Top tier (神殿の屋根イメージ)
            { x: 200, y: 200, width: 400, height: 15, type: 'passthrough' },
            // Highest platform
            { x: 320, y: 120, width: 160, height: 15, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 40, y: 438 }, enemy: { x: 730, y: 438 } },
        warpZones: [],
        deathZones: [],
        itemSpawns: [
            { x: 400, y: 160, types: ['HP', 'SHIELD'] },
            { x: 200, y: 240, types: ['RAPID'] },
            { x: 600, y: 240, types: ['MEGA'] },
            { x: 400, y: 320, types: ['HP', 'RAPID'] }
        ]
    },
    {
        name: 'Factory',
        displayName: '工場地帯',
        bgColor: '#2c3e50',
        platforms: [
            { x: 0, y: 510, width: 800, height: 90, type: 'solid' },
            // V4.3: Enhanced platform layout for full-screen combat
            // Left side platforms (壁沿い)
            { x: 0, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 0, y: 350, width: 90, height: 15, type: 'passthrough' },
            { x: 0, y: 270, width: 80, height: 15, type: 'passthrough' },
            { x: 0, y: 190, width: 70, height: 15, type: 'passthrough' },
            // Right side platforms (壁沿い)
            { x: 700, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 710, y: 350, width: 90, height: 15, type: 'passthrough' },
            { x: 720, y: 270, width: 80, height: 15, type: 'passthrough' },
            { x: 730, y: 190, width: 70, height: 15, type: 'passthrough' },
            // Lower tier (工場設備風)
            { x: 140, y: 440, width: 120, height: 15, type: 'passthrough' },
            { x: 340, y: 450, width: 120, height: 15, type: 'passthrough' },
            { x: 540, y: 440, width: 120, height: 15, type: 'passthrough' },
            // Middle tier
            { x: 100, y: 360, width: 140, height: 15, type: 'passthrough' },
            { x: 330, y: 370, width: 140, height: 15, type: 'passthrough' },
            { x: 560, y: 360, width: 140, height: 15, type: 'passthrough' },
            // Upper-middle tier
            { x: 180, y: 280, width: 130, height: 15, type: 'passthrough' },
            { x: 490, y: 280, width: 130, height: 15, type: 'passthrough' },
            // Top tier
            { x: 280, y: 200, width: 240, height: 15, type: 'passthrough' },
            // Highest platform (クレーン風)
            { x: 350, y: 120, width: 100, height: 15, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 80, y: 438 }, enemy: { x: 620, y: 438 } },
        warpZones: [],
        deathZones: [],  // V4.3: Removed death zones for better playability
        itemSpawns: [
            { x: 400, y: 400, types: ['HP', 'RAPID'] },
            { x: 400, y: 160, types: ['MEGA', 'SHIELD'] },
            { x: 175, y: 320, types: ['HP'] },
            { x: 625, y: 320, types: ['RAPID'] },
            { x: 400, y: 80, types: ['MEGA'] }
        ]
    },
    {
        name: 'Cave',
        displayName: '洞窟',
        bgColor: '#1a1a1a',
        platforms: [
            { x: 0, y: 510, width: 800, height: 90, type: 'solid' },
            // V4.3: Enhanced platform layout for full-screen combat
            // Left side platforms (洞窟壁沿い)
            { x: 0, y: 430, width: 110, height: 15, type: 'passthrough' },
            { x: 0, y: 350, width: 100, height: 15, type: 'passthrough' },
            { x: 0, y: 270, width: 90, height: 15, type: 'passthrough' },
            { x: 0, y: 190, width: 80, height: 15, type: 'passthrough' },
            // Right side platforms (洞窟壁沿い)
            { x: 690, y: 430, width: 110, height: 15, type: 'passthrough' },
            { x: 700, y: 350, width: 100, height: 15, type: 'passthrough' },
            { x: 710, y: 270, width: 90, height: 15, type: 'passthrough' },
            { x: 720, y: 190, width: 80, height: 15, type: 'passthrough' },
            // Lower tier (岩棚)
            { x: 150, y: 440, width: 130, height: 15, type: 'passthrough' },
            { x: 335, y: 450, width: 130, height: 15, type: 'passthrough' },
            { x: 520, y: 440, width: 130, height: 15, type: 'passthrough' },
            // Middle tier
            { x: 100, y: 360, width: 150, height: 15, type: 'passthrough' },
            { x: 325, y: 370, width: 150, height: 15, type: 'passthrough' },
            { x: 550, y: 360, width: 150, height: 15, type: 'passthrough' },
            // Upper-middle tier
            { x: 170, y: 280, width: 140, height: 15, type: 'passthrough' },
            { x: 490, y: 280, width: 140, height: 15, type: 'passthrough' },
            // Top tier (鍾乳洞風)
            { x: 280, y: 200, width: 240, height: 15, type: 'passthrough' },
            // Highest platform
            { x: 340, y: 120, width: 120, height: 15, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 80, y: 438 }, enemy: { x: 620, y: 438 } },
        warpZones: [],
        deathZones: [],  // V4.3: Removed death zones for better playability
        itemSpawns: [
            { x: 400, y: 330, types: ['HP', 'SHIELD'] },
            { x: 400, y: 160, types: ['MEGA'] },
            { x: 115, y: 390, types: ['RAPID'] },
            { x: 685, y: 390, types: ['HP'] },
            { x: 400, y: 80, types: ['SHIELD'] }
        ]
    },
    {
        name: 'Neo City',
        displayName: '未来都市',
        bgColor: '#0d0221',
        platforms: [
            { x: 0, y: 510, width: 800, height: 90, type: 'solid' },
            // V4.3: Enhanced platform layout for full-screen combat
            // Left side platforms (ビル壁沿い)
            { x: 0, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 0, y: 350, width: 90, height: 15, type: 'passthrough' },
            { x: 0, y: 270, width: 85, height: 15, type: 'passthrough' },
            { x: 0, y: 190, width: 80, height: 15, type: 'passthrough' },
            { x: 0, y: 110, width: 75, height: 15, type: 'passthrough' },
            // Right side platforms (ビル壁沿い)
            { x: 700, y: 430, width: 100, height: 15, type: 'passthrough' },
            { x: 710, y: 350, width: 90, height: 15, type: 'passthrough' },
            { x: 715, y: 270, width: 85, height: 15, type: 'passthrough' },
            { x: 720, y: 190, width: 80, height: 15, type: 'passthrough' },
            { x: 725, y: 110, width: 75, height: 15, type: 'passthrough' },
            // Lower tier (ホバーカー風)
            { x: 140, y: 440, width: 120, height: 15, type: 'passthrough' },
            { x: 340, y: 450, width: 120, height: 15, type: 'passthrough' },
            { x: 540, y: 440, width: 120, height: 15, type: 'passthrough' },
            // Middle-lower tier
            { x: 100, y: 370, width: 150, height: 15, type: 'passthrough' },
            { x: 325, y: 380, width: 150, height: 15, type: 'passthrough' },
            { x: 550, y: 370, width: 150, height: 15, type: 'passthrough' },
            // Middle tier
            { x: 160, y: 300, width: 130, height: 15, type: 'passthrough' },
            { x: 510, y: 300, width: 130, height: 15, type: 'passthrough' },
            // Upper-middle tier
            { x: 100, y: 230, width: 110, height: 15, type: 'passthrough' },
            { x: 345, y: 240, width: 110, height: 15, type: 'passthrough' },
            { x: 590, y: 230, width: 110, height: 15, type: 'passthrough' },
            // Top tier (スカイウェイ風)
            { x: 200, y: 160, width: 180, height: 15, type: 'passthrough' },
            { x: 420, y: 160, width: 180, height: 15, type: 'passthrough' },
            // Highest platform
            { x: 340, y: 80, width: 120, height: 15, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 40, y: 438 }, enemy: { x: 680, y: 438 } },
        warpZones: [],
        deathZones: [],  // V4.3: Removed death zones for better playability
        itemSpawns: [
            { x: 400, y: 40, types: ['MEGA', 'SHIELD'] },
            { x: 400, y: 200, types: ['HP', 'RAPID'] },
            { x: 200, y: 260, types: ['HP'] },
            { x: 600, y: 260, types: ['RAPID'] },
            { x: 40, y: 70, types: ['MEGA'] },
            { x: 760, y: 70, types: ['SHIELD'] }
        ]
    }
];

// ============================================================================
// SVG SPRITES (Fallback graphics)
// ============================================================================

const SPRITES = {
    robotRed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="20" y="8" width="24" height="20" fill="#FF0000" rx="4"/><rect x="24" y="28" width="16" height="24" fill="#CC0000"/><rect x="12" y="16" width="8" height="16" fill="#FF0000"/><rect x="44" y="16" width="8" height="16" fill="#FF0000"/><rect x="24" y="52" width="6" height="12" fill="#990000"/><rect x="34" y="52" width="6" height="12" fill="#990000"/><circle cx="28" cy="16" r="3" fill="#FFFF00"/><circle cx="36" cy="16" r="3" fill="#FFFF00"/></svg>`,
    robotBlue: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="20" y="8" width="24" height="20" fill="#0066FF" rx="4"/><rect x="24" y="28" width="16" height="24" fill="#0044CC"/><rect x="12" y="16" width="8" height="16" fill="#0066FF"/><rect x="44" y="16" width="8" height="16" fill="#0066FF"/><rect x="24" y="52" width="6" height="12" fill="#003399"/><rect x="34" y="52" width="6" height="12" fill="#003399"/><circle cx="28" cy="16" r="3" fill="#00FFFF"/><circle cx="36" cy="16" r="3" fill="#00FFFF"/></svg>`,
    beamRed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 8"><ellipse cx="16" cy="4" rx="14" ry="3" fill="#FF6600" opacity="0.5"/><ellipse cx="16" cy="4" rx="10" ry="2" fill="#FF0000"/><ellipse cx="16" cy="4" rx="6" ry="1" fill="#FFFF00"/></svg>`,
    beamBlue: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 8"><ellipse cx="16" cy="4" rx="14" ry="3" fill="#0066FF" opacity="0.5"/><ellipse cx="16" cy="4" rx="10" ry="2" fill="#0088FF"/><ellipse cx="16" cy="4" rx="6" ry="1" fill="#00FFFF"/></svg>`,
    effectHit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#FFFF00" opacity="0.3"/><circle cx="16" cy="16" r="8" fill="#FF6600" opacity="0.5"/><circle cx="16" cy="16" r="4" fill="#FFFFFF"/><line x1="16" y1="4" x2="16" y2="12" stroke="#FFFF00" stroke-width="2"/><line x1="16" y1="20" x2="16" y2="28" stroke="#FFFF00" stroke-width="2"/><line x1="4" y1="16" x2="12" y2="16" stroke="#FFFF00" stroke-width="2"/><line x1="20" y1="16" x2="28" y2="16" stroke="#FFFF00" stroke-width="2"/></svg>`
};

// ============================================================================
// HIGH-QUALITY SPRITE SYSTEM (PNG + Enhanced Canvas Fallback)
// ============================================================================

const SpriteLoader = {
    sprites: {},
    backgrounds: {},
    loaded: false,
    useHighQuality: true, // Enable high-quality rendering

    // Sprite file paths - All photorealistic 3D sprites
    spriteFiles: {
        // Player sprites
        player_idle: 'assets/sprites/player_idle.png',
        player_walk1: 'assets/sprites/player_walk1.png',
        player_walk2: 'assets/sprites/player_walk2.png',
        player_jump: 'assets/sprites/player_jump.png',
        player_beam: 'assets/sprites/player_beam.png',
        player_kick: 'assets/sprites/player_kick.png',
        player_hit: 'assets/sprites/player_hit.png',
        player_ko: 'assets/sprites/player_ko.png',
        player_guard: 'assets/sprites/player_guard.png',  // V4.2: Guard/Shield sprite
        // Enemy sprites
        enemy_idle: 'assets/sprites/enemy_idle.png',
        enemy_walk1: 'assets/sprites/enemy_walk1.png',
        enemy_walk2: 'assets/sprites/enemy_walk2.png',
        enemy_jump: 'assets/sprites/enemy_jump.png',
        enemy_beam: 'assets/sprites/enemy_beam.png',
        enemy_kick: 'assets/sprites/enemy_kick.png',
        enemy_hit: 'assets/sprites/enemy_hit.png',
        enemy_ko: 'assets/sprites/enemy_ko.png',
        enemy_guard: 'assets/sprites/enemy_guard.png',  // V4.2: Guard/Shield sprite
        // V4.3: Beast sprites (blue for player, red for enemy)
        beast_blue_idle: 'assets/sprites/beast_blue_idle.png',
        beast_blue_walk: 'assets/sprites/beast_blue_walk.png',
        beast_blue_jump: 'assets/sprites/beast_blue_jump.png',
        beast_blue_flame: 'assets/sprites/beast_blue_flame.png',
        beast_blue_down: 'assets/sprites/beast_blue_down.png',
        beast_red_idle: 'assets/sprites/beast_red_idle.png',
        beast_red_walk: 'assets/sprites/beast_red_walk.png',
        beast_red_jump: 'assets/sprites/beast_red_jump.png',
        beast_red_flame: 'assets/sprites/beast_red_flame.png',
        beast_red_down: 'assets/sprites/beast_red_down.png'
    },

    // Background file paths - Photorealistic AI-generated backgrounds
    backgroundFiles: {
        'Urban City': 'assets/backgrounds/bg_neo_city.jpg',
        'Pyramid': 'assets/backgrounds/bg_pyramid.jpg',
        'Parthenon': 'assets/backgrounds/bg_parthenon.jpg',
        'Factory': 'assets/backgrounds/bg_factory.jpg',
        'Cave': 'assets/backgrounds/bg_cave.jpg',
        'Neo City': 'assets/backgrounds/bg_final_arena.jpg'
    },

    // Load all PNG sprites and JPG backgrounds with retry logic
    async loadAll() {
        const promises = [];

        // Load single image with retry (V4: improved loading reliability)
        const loadImage = (path, key, maxRetries = 3) => {
            return new Promise((resolve) => {
                let retries = 0;
                const tryLoad = () => {
                    const img = new Image();
                    img.onload = () => {
                        this.sprites[key] = img;
                        console.log(`✅ Sprite loaded: ${key}`);
                        resolve(true);
                    };
                    img.onerror = () => {
                        retries++;
                        if (retries < maxRetries) {
                            console.log(`⚠️ Retry ${retries}/${maxRetries}: ${key}`);
                            setTimeout(tryLoad, 500 * retries); // Exponential backoff
                        } else {
                            console.log(`❌ Sprite failed after ${maxRetries} retries: ${key}`);
                            this.sprites[key] = null;
                            resolve(false);
                        }
                    };
                    // Add cache-busting for fresh load
                    img.src = path + '?v=' + Date.now();
                };
                tryLoad();
            });
        };

        // Load sprites with retry
        for (const [key, path] of Object.entries(this.spriteFiles)) {
            promises.push(loadImage(path, key));
        }

        // Load backgrounds
        for (const [key, path] of Object.entries(this.backgroundFiles)) {
            const img = new Image();
            promises.push(new Promise((resolve) => {
                img.onload = () => {
                    this.backgrounds[key] = img;
                    console.log(`✅ Background loaded: ${key}`);
                    resolve(true);
                };
                img.onerror = () => {
                    console.log(`⚠️ Background not found: ${key}, using fallback`);
                    this.backgrounds[key] = null;
                    resolve(false);
                };
                img.src = path;
            }));
        }

        await Promise.all(promises);
        this.loaded = true;
        console.log('🎨 V2 Sprite & Background system initialized');
    },

    // Get sprite for a robot state with animation frame support
    getSprite(isPlayer, state, animFrame = 0) {
        const prefix = isPlayer ? 'player' : 'enemy';
        let key;

        // Map states to sprite files
        switch (state) {
            case 'walk':
                // Alternate between walk1 and walk2
                key = `${prefix}_walk${(Math.floor(animFrame / 8) % 2) + 1}`;
                break;
            case 'attack':
                // Use beam sprite for attack state
                key = `${prefix}_beam`;
                break;
            case 'hurt':
                key = `${prefix}_hit`;
                break;
            case 'ko':
            case 'defeated':
                key = `${prefix}_ko`;
                break;
            default:
                key = `${prefix}_${state}`;
        }

        return this.sprites[key] || this.sprites[`${prefix}_idle`] || null;
    },

    // Get background image for a stage
    getBackground(stageName) {
        return this.backgrounds[stageName] || null;
    },

    // Check if high-quality sprite is available
    hasSprite(isPlayer, state) {
        return this.getSprite(isPlayer, state) !== null;
    },

    // Check if background is available
    hasBackground(stageName) {
        return this.backgrounds[stageName] !== null;
    }
};

// Enhanced Canvas Robot Renderer (for poses without PNG sprites)
// With dynamic arm/leg animations for more movement
const EnhancedRobotRenderer = {
    // Draw a high-quality robot with gradients, glow, and detailed limb animation
    draw(ctx, x, y, width, height, isPlayer, state, facingRight, animFrame) {
        ctx.save();

        const time = Date.now();

        // Colors based on player/enemy
        const colors = isPlayer ? {
            primary: '#FF2222',
            secondary: '#CC0000',
            dark: '#990000',
            glow: '#FF6600',
            visor: '#00FFFF',
            joint: '#666666'
        } : {
            primary: '#2266FF',
            secondary: '#0044CC',
            dark: '#003399',
            glow: '#0088FF',
            visor: '#FF3333',
            joint: '#555555'
        };

        // Scale factor (64x64 base to actual size)
        const scale = width / 64;
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        // Calculate animation values based on state
        let headBob = 0, bodyTilt = 0;
        let leftArmAngle = 0, rightArmAngle = 0;
        let leftLegAngle = 0, rightLegAngle = 0;
        let leftArmExtend = 0, rightArmExtend = 0;

        switch (state) {
            case 'idle':
                // Subtle breathing
                headBob = Math.sin(time * 0.003) * 1;
                leftArmAngle = Math.sin(time * 0.002) * 0.05;
                rightArmAngle = Math.sin(time * 0.002 + Math.PI) * 0.05;
                break;

            case 'walk':
                // Walking cycle with arm/leg swing
                const walkCycle = animFrame * 0.8;
                headBob = Math.abs(Math.sin(walkCycle)) * -2;
                bodyTilt = Math.sin(walkCycle * 0.5) * 0.03;
                leftArmAngle = Math.sin(walkCycle) * 0.4;
                rightArmAngle = Math.sin(walkCycle + Math.PI) * 0.4;
                leftLegAngle = Math.sin(walkCycle + Math.PI) * 0.35;
                rightLegAngle = Math.sin(walkCycle) * 0.35;
                break;

            case 'jump':
                // Arms up, legs tucked
                leftArmAngle = -0.6;
                rightArmAngle = -0.6;
                leftLegAngle = 0.4;
                rightLegAngle = 0.4;
                break;

            case 'attack':
                // Punch/shoot pose - front arm extended
                const attackPhase = (time % 250) / 250;
                if (attackPhase < 0.4) {
                    // Wind up
                    rightArmAngle = -0.3;
                    rightArmExtend = -3;
                } else {
                    // Strike!
                    rightArmAngle = 0.1;
                    rightArmExtend = 8;
                }
                leftArmAngle = 0.2; // Back arm bracing
                bodyTilt = facingRight ? -0.05 : 0.05;
                break;

            case 'hurt':
                // Recoil pose
                const hurtShake = Math.sin(time * 0.05) * 0.1;
                headBob = -3;
                bodyTilt = 0.1 + hurtShake;
                leftArmAngle = 0.3;
                rightArmAngle = 0.3;
                break;
        }

        // Body glow effect
        ctx.shadowColor = colors.glow;
        ctx.shadowBlur = 8;

        // === LEGS (draw first, behind body) ===
        ctx.save();

        // Left leg
        ctx.save();
        ctx.translate(27, 52);
        ctx.rotate(leftLegAngle);
        // Upper leg
        ctx.fillStyle = colors.dark;
        ctx.fillRect(-3, 0, 6, state === 'jump' ? 8 : 10);
        // Lower leg
        ctx.translate(0, state === 'jump' ? 6 : 8);
        ctx.rotate(state === 'jump' ? 0.3 : leftLegAngle * 0.3);
        ctx.fillRect(-3, 0, 6, state === 'jump' ? 6 : 8);
        // Foot
        ctx.fillStyle = colors.secondary;
        ctx.fillRect(-5, state === 'jump' ? 4 : 6, 10, 4);
        ctx.restore();

        // Right leg
        ctx.save();
        ctx.translate(37, 52);
        ctx.rotate(rightLegAngle);
        // Upper leg
        ctx.fillStyle = colors.dark;
        ctx.fillRect(-3, 0, 6, state === 'jump' ? 8 : 10);
        // Lower leg
        ctx.translate(0, state === 'jump' ? 6 : 8);
        ctx.rotate(state === 'jump' ? 0.3 : rightLegAngle * 0.3);
        ctx.fillRect(-3, 0, 6, state === 'jump' ? 6 : 8);
        // Foot
        ctx.fillStyle = colors.secondary;
        ctx.fillRect(-5, state === 'jump' ? 4 : 6, 10, 4);
        ctx.restore();

        ctx.restore();

        // === TORSO ===
        ctx.save();
        ctx.translate(32, 40);
        ctx.rotate(bodyTilt);
        ctx.translate(-32, -40);

        // Torso with gradient
        const torsoGrad = ctx.createLinearGradient(24, 28, 40, 52);
        torsoGrad.addColorStop(0, colors.secondary);
        torsoGrad.addColorStop(1, colors.dark);
        ctx.fillStyle = torsoGrad;
        ctx.fillRect(24, 28, 16, 24);

        // Chest detail
        ctx.fillStyle = colors.dark;
        ctx.fillRect(28, 32, 8, 4);
        ctx.fillStyle = colors.primary;
        ctx.fillRect(30, 34, 4, 2);
        // Energy core glow
        ctx.shadowColor = colors.visor;
        ctx.shadowBlur = 5;
        ctx.fillStyle = colors.visor;
        ctx.fillRect(31, 35, 2, 1);
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors.glow;

        ctx.restore();

        // === HEAD ===
        ctx.save();
        ctx.translate(32, 18 + headBob);
        ctx.rotate(bodyTilt * 0.5);
        ctx.translate(-32, -18);

        // Head with gradient
        const headGrad = ctx.createLinearGradient(20, 8, 44, 28);
        headGrad.addColorStop(0, colors.primary);
        headGrad.addColorStop(0.5, colors.secondary);
        headGrad.addColorStop(1, colors.dark);
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.roundRect(20, 8, 24, 20, 4);
        ctx.fill();

        // Antenna
        ctx.fillStyle = colors.joint;
        ctx.fillRect(30, 2, 4, 8);
        ctx.fillStyle = colors.visor;
        ctx.beginPath();
        ctx.arc(32, 2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Visor (eyes) with glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = colors.visor;
        ctx.fillStyle = colors.visor;
        const eyeFlicker = state === 'hurt' ? (Math.random() > 0.5 ? 0.3 : 1) : 1;
        ctx.globalAlpha = eyeFlicker;
        ctx.beginPath();
        ctx.ellipse(28, 16, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(36, 16, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors.glow;

        ctx.restore();

        // === ARMS ===
        // Left arm (back arm when facing right)
        ctx.save();
        ctx.translate(20, 32);
        ctx.rotate(leftArmAngle);
        // Shoulder joint
        ctx.fillStyle = colors.joint;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        // Upper arm
        ctx.fillStyle = colors.primary;
        ctx.fillRect(-4, 0, 8, 12);
        // Elbow joint
        ctx.translate(0, 12);
        ctx.fillStyle = colors.joint;
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        // Lower arm
        ctx.rotate(leftArmAngle * 0.5);
        ctx.fillStyle = colors.secondary;
        ctx.fillRect(-3, 0, 6, 10);
        // Hand
        ctx.fillStyle = colors.dark;
        ctx.fillRect(-4, 8, 8, 5);
        ctx.restore();

        // Right arm (front arm when facing right)
        ctx.save();
        ctx.translate(44 + rightArmExtend, 32);
        ctx.rotate(rightArmAngle);
        // Shoulder joint
        ctx.fillStyle = colors.joint;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        // Upper arm
        ctx.fillStyle = colors.primary;
        ctx.fillRect(-4, 0, 8, 12);
        // Elbow joint
        ctx.translate(0, 12);
        ctx.fillStyle = colors.joint;
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        // Lower arm
        ctx.rotate(rightArmAngle * 0.5);
        ctx.fillStyle = colors.secondary;
        ctx.fillRect(-3, 0, 6, 10);
        // Hand/Beam emitter
        ctx.fillStyle = colors.dark;
        ctx.fillRect(-4, 8, 8, 5);

        // Beam charging effect for attack state
        if (state === 'attack' && rightArmExtend > 0) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = colors.visor;
            ctx.fillStyle = colors.visor;
            ctx.beginPath();
            ctx.arc(0, 15, 5 + Math.sin(time * 0.02) * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // Damage effect overlay
        if (state === 'hurt') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillRect(0, 0, 64, 64);
        }

        ctx.restore();
    }
};

// ============================================================================
// SOUND SYSTEM (Web Audio API - Procedural Chiptune)
// ============================================================================

const SoundManager = {
    ctx: null,
    initialized: false,
    musicEnabled: true,
    sfxEnabled: true,
    masterVolume: 0.5,
    musicVolume: 0.3,
    sfxVolume: 0.6,

    // BGM state
    currentBGM: null,
    bgmInterval: null,
    bgmNotes: [],
    bgmIndex: 0,

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('🔊 Sound system initialized');
        } catch (e) {
            console.log('⚠️ Web Audio not supported');
        }
    },

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    // Create oscillator with envelope
    createTone(freq, duration, type = 'square', volume = 0.3) {
        if (!this.ctx || !this.sfxEnabled) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        const now = this.ctx.currentTime;
        const vol = volume * this.sfxVolume * this.masterVolume;

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(vol, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    },

    // Sound effects
    playBeamShoot(chargeLevel = 0) {
        if (!this.ctx) return;
        // Laser "pew" - frequency sweep down
        // Charged shots are louder and longer
        const duration = 0.15 + (chargeLevel * 0.2);  // Up to 0.35s for max charge
        const volume = 0.3 + (chargeLevel * 0.3);     // Up to 0.6 for max charge
        const startFreq = 880 + (chargeLevel * 440);  // Higher pitch for charged

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + duration);
        gain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);

        // Add bass rumble for charged shots
        if (chargeLevel > 0.5) {
            this.createTone(60 + (chargeLevel * 40), duration, 'sine', chargeLevel * 0.3);
        }
    },

    playChargeMax() {
        if (!this.ctx) return;
        // "Ding" sound when charge is full
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.value = 880;
        osc2.frequency.value = 1320;  // Perfect fifth

        gain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * 0.4, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(this.ctx.currentTime + 0.3);
        osc2.stop(this.ctx.currentTime + 0.3);
    },

    playBeamHit() {
        if (!this.ctx) return;
        // Impact - noise burst + low thump
        const noise = this.ctx.createBufferSource();
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * 0.4, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noise.start();

        // Low thump
        this.createTone(80, 0.1, 'sine', 0.5);
    },

    playKick() {
        if (!this.ctx) return;
        // Punch sound
        this.createTone(150, 0.08, 'sine', 0.4);
        this.createTone(100, 0.1, 'triangle', 0.3);
    },

    playJump() {
        if (!this.ctx) return;
        // Boing - frequency sweep up
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * 0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    },

    playKO() {
        if (!this.ctx) return;
        // Explosion - noise + descending tones
        const noise = this.ctx.createBufferSource();
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.5, this.ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * 0.5, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noise.start();

        // Descending tone
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.4);
        oscGain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * 0.3, this.ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.connect(oscGain);
        oscGain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    },

    playMenuSelect() {
        if (!this.ctx) return;
        this.createTone(660, 0.08, 'square', 0.2);
        setTimeout(() => this.createTone(880, 0.08, 'square', 0.2), 50);
    },

    playVictory() {
        if (!this.ctx) return;
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => this.createTone(freq, 0.2, 'square', 0.3), i * 150);
        });
    },

    playDefeat() {
        if (!this.ctx) return;
        const notes = [392, 349, 330, 262];
        notes.forEach((freq, i) => {
            setTimeout(() => this.createTone(freq, 0.3, 'sawtooth', 0.2), i * 200);
        });
    },

    // Item pickup sound (pleasant chime)
    playItemPickup() {
        if (!this.ctx) return;
        // Ascending arpeggio - sounds like collecting coins/power-ups
        const notes = [523, 659, 784, 1047];  // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;

                const vol = this.sfxVolume * this.masterVolume * 0.25;
                gain.gain.setValueAtTime(vol, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.15);
            }, i * 40);
        });
    },

    // BGM System - Procedural Chiptune
    titleBGMPattern: [
        // [note, duration, octave]
        ['C', 0.2, 4], ['E', 0.2, 4], ['G', 0.2, 4], ['C', 0.2, 5],
        ['G', 0.2, 4], ['E', 0.2, 4], ['C', 0.2, 4], ['G', 0.2, 3],
        ['A', 0.2, 3], ['C', 0.2, 4], ['E', 0.2, 4], ['A', 0.2, 4],
        ['E', 0.2, 4], ['C', 0.2, 4], ['A', 0.2, 3], ['E', 0.2, 3],
    ],

    battleBGMPattern: [
        // More intense pattern
        ['E', 0.15, 4], ['E', 0.15, 4], ['E', 0.15, 5], ['E', 0.15, 4],
        ['G', 0.15, 4], ['G', 0.15, 4], ['E', 0.15, 4], ['D', 0.15, 4],
        ['C', 0.15, 4], ['C', 0.15, 4], ['D', 0.15, 4], ['E', 0.15, 4],
        ['D', 0.15, 4], ['C', 0.15, 4], ['B', 0.15, 3], ['G', 0.15, 3],
        ['A', 0.15, 3], ['A', 0.15, 3], ['B', 0.15, 3], ['C', 0.15, 4],
        ['D', 0.15, 4], ['E', 0.15, 4], ['D', 0.15, 4], ['C', 0.15, 4],
    ],

    noteToFreq(note, octave) {
        const notes = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };
        const semitone = notes[note];
        return 440 * Math.pow(2, (semitone - 9) / 12 + (octave - 4));
    },

    playBGM(type = 'title') {
        if (!this.ctx || !this.musicEnabled) return;

        this.stopBGM();
        this.bgmNotes = type === 'title' ? this.titleBGMPattern : this.battleBGMPattern;
        this.bgmIndex = 0;

        const playNext = () => {
            if (!this.musicEnabled || !this.ctx) {
                this.stopBGM();
                return;
            }

            const note = this.bgmNotes[this.bgmIndex];
            const freq = this.noteToFreq(note[0], note[2]);
            const duration = note[1];

            // Main melody
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type === 'title' ? 'triangle' : 'square';
            osc.frequency.value = freq;

            const vol = this.musicVolume * this.masterVolume * 0.3;
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration * 0.9);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);

            // Bass (one octave lower)
            if (this.bgmIndex % 4 === 0) {
                const bass = this.ctx.createOscillator();
                const bassGain = this.ctx.createGain();
                bass.type = 'triangle';
                bass.frequency.value = freq / 2;
                bassGain.gain.setValueAtTime(vol * 0.5, this.ctx.currentTime);
                bassGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration * 2);
                bass.connect(bassGain);
                bassGain.connect(this.ctx.destination);
                bass.start();
                bass.stop(this.ctx.currentTime + duration * 2);
            }

            this.bgmIndex = (this.bgmIndex + 1) % this.bgmNotes.length;
        };

        playNext();
        this.bgmInterval = setInterval(playNext, type === 'title' ? 200 : 150);
    },

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
    },

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled) {
            this.stopBGM();
        }
        return this.musicEnabled;
    }
};

// ============================================================================
// ENHANCED PARTICLE SYSTEM
// ============================================================================

class Particle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || (Math.random() - 0.5) * 4;
        this.vy = options.vy || (Math.random() - 0.5) * 4;
        this.life = options.life || 30;
        this.maxLife = this.life;
        this.size = options.size || 4;
        this.color = options.color || '#ffff00';
        this.gravity = options.gravity || 0;
        this.friction = options.friction || 0.98;
        this.type = options.type || 'circle'; // circle, spark, smoke
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.life--;
    }

    render(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;

        if (this.type === 'spark') {
            // Spark with trail
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
            ctx.stroke();
        } else if (this.type === 'smoke') {
            // Smoke puff
            const size = this.size * (1 + (1 - alpha) * 2);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Circle particle
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }

    get isAlive() {
        return this.life > 0;
    }
}

const ParticleSystem = {
    particles: [],

    emit(x, y, count, options = {}) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, {
                ...options,
                vx: options.vx !== undefined ? options.vx + (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 6,
                vy: options.vy !== undefined ? options.vy + (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 6,
            }));
        }
    },

    // Preset effects
    beamTrail(x, y, isPlayer, chargeLevel = 0) {
        // More particles for charged beams
        const count = 2 + Math.floor(chargeLevel * 4);  // 2-6 particles
        const size = 3 + (chargeLevel * 3);  // Bigger particles

        this.emit(x, y, count, {
            color: isPlayer ? '#ff6600' : '#0088ff',
            size: size,
            life: 15 + (chargeLevel * 10),
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            type: 'spark'
        });
    },

    hit(x, y) {
        // Sparks
        this.emit(x, y, 12, {
            color: '#ffff00',
            size: 3,
            life: 20,
            type: 'spark'
        });
        // Core flash
        this.emit(x, y, 5, {
            color: '#ffffff',
            size: 8,
            life: 10
        });
    },

    explosion(x, y) {
        // Fire
        this.emit(x, y, 30, {
            color: '#ff4400',
            size: 8,
            life: 40,
            gravity: 0.1
        });
        // Smoke
        this.emit(x, y, 15, {
            color: '#666666',
            size: 10,
            life: 50,
            gravity: -0.05,
            type: 'smoke'
        });
        // Sparks
        this.emit(x, y, 20, {
            color: '#ffff00',
            size: 4,
            life: 30,
            type: 'spark'
        });
    },

    dust(x, y) {
        this.emit(x, y, 5, {
            color: '#aa9977',
            size: 4,
            life: 20,
            vy: -1,
            gravity: 0.1,
            type: 'smoke'
        });
    },

    charge(x, y, isPlayer) {
        this.emit(x, y, 3, {
            color: isPlayer ? '#00ffff' : '#ff3333',
            size: 5,
            life: 15,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
        });
    },

    // Explosion when charged beam is released
    chargeRelease(x, y, isPlayer, chargeLevel) {
        const count = Math.floor(10 + chargeLevel * 20);  // 10-30 particles
        const colors = isPlayer ?
            ['#ff0000', '#ff6600', '#ffff00', '#ffffff'] :
            ['#0000ff', '#0088ff', '#00ffff', '#ffffff'];

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 3 + chargeLevel * 5;
            this.emit(x, y, 1, {
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 4 + chargeLevel * 4,
                life: 20 + chargeLevel * 15,
                vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
                vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
                type: 'spark'
            });
        }

        // Core flash
        if (chargeLevel > 0.5) {
            this.emit(x, y, 5, {
                color: '#ffffff',
                size: 15 + chargeLevel * 10,
                life: 10
            });
        }
    },

    // V4.2: Shield block effect when guarding
    shieldBlock(x, y, isPlayer) {
        const colors = isPlayer ?
            ['#00ffff', '#00ccff', '#0099ff', '#ffffff'] :  // Cyan shield for player
            ['#ff3333', '#ff6666', '#ff9999', '#ffffff'];   // Red shield for enemy

        // Hexagonal shield flash effect
        for (let i = 0; i < 12; i++) {
            const angle = (Math.PI * 2 * i) / 12;
            this.emit(x, y, 1, {
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 6,
                life: 15,
                vx: Math.cos(angle) * 2,
                vy: Math.sin(angle) * 2,
                type: 'spark'
            });
        }

        // Central shield flash
        this.emit(x, y, 3, {
            color: isPlayer ? '#00ffff' : '#ff3333',
            size: 20,
            life: 10
        });

        // Deflection sparks
        this.emit(x - 20, y, 5, {
            color: '#ffffff',
            size: 3,
            life: 12,
            vx: -4,
            vy: (Math.random() - 0.5) * 3,
            type: 'spark'
        });
    },

    // Warp zone teleportation effect
    warpEffect(x, y, direction) {
        const colors = ['#9900ff', '#cc00ff', '#ff00ff', '#ffffff'];
        const count = 20;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = direction === 'out' ? 4 : -3;  // Expand out or contract in
            this.emit(x, y, 1, {
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 5,
                life: 25,
                vx: Math.cos(angle) * speed * (0.5 + Math.random()),
                vy: Math.sin(angle) * speed * (0.5 + Math.random()),
                type: 'spark'
            });
        }

        // Central flash
        this.emit(x, y, 5, {
            color: '#ffffff',
            size: 20,
            life: 15
        });
    },

    // Item pickup effect
    itemPickup(x, y, itemType) {
        const config = ITEMS.types[itemType];
        const color = config ? config.color : '#ffffff';

        // Ring of particles expanding outward
        for (let i = 0; i < 16; i++) {
            const angle = (Math.PI * 2 * i) / 16;
            this.emit(x, y, 1, {
                color: color,
                size: 4,
                life: 20,
                vx: Math.cos(angle) * 3,
                vy: Math.sin(angle) * 3,
                type: 'spark'
            });
        }

        // Rising sparkles
        this.emit(x, y, 8, {
            color: '#ffffff',
            size: 3,
            life: 30,
            vy: -3,
            gravity: -0.05,
            type: 'spark'
        });

        // Central flash
        this.emit(x, y, 3, {
            color: color,
            size: 15,
            life: 10
        });
    },

    update() {
        this.particles = this.particles.filter(p => {
            p.update();
            return p.isAlive;
        });
    },

    render(ctx) {
        this.particles.forEach(p => p.render(ctx));
    },

    clear() {
        this.particles = [];
    }
};

// ============================================================================
// SCREEN EFFECTS
// ============================================================================

const ScreenEffects = {
    shakeAmount: 0,
    shakeDuration: 0,
    flashAlpha: 0,
    flashColor: '#ffffff',

    shake(amount = 5, duration = 10) {
        this.shakeAmount = amount;
        this.shakeDuration = duration;
    },

    flash(color = '#ffffff', alpha = 0.5) {
        this.flashColor = color;
        this.flashAlpha = alpha;
    },

    update() {
        if (this.shakeDuration > 0) {
            this.shakeDuration--;
            if (this.shakeDuration === 0) {
                this.shakeAmount = 0;
            }
        }
        if (this.flashAlpha > 0) {
            this.flashAlpha -= 0.05;
        }
    },

    getShakeOffset() {
        if (this.shakeAmount === 0) return { x: 0, y: 0 };
        return {
            x: (Math.random() - 0.5) * this.shakeAmount * 2,
            y: (Math.random() - 0.5) * this.shakeAmount * 2
        };
    },

    renderFlash(ctx) {
        if (this.flashAlpha > 0) {
            ctx.save();
            ctx.fillStyle = this.flashColor;
            ctx.globalAlpha = this.flashAlpha;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            ctx.restore();
        }
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function checkCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// V4.2: Check collision with an object that has getHitbox() (e.g., Robot)
function checkCollisionWithHitbox(projectile, target) {
    // If target has getHitbox method (Robot), use it
    const hitbox = target.getHitbox ? target.getHitbox() : target;
    return (
        projectile.x < hitbox.x + hitbox.width &&
        projectile.x + projectile.width > hitbox.x &&
        projectile.y < hitbox.y + hitbox.height &&
        projectile.y + projectile.height > hitbox.y
    );
}

function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function svgToImage(svgString) {
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(blob);
    return img;
}

function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ============================================================================
// ROBOT CLASS
// ============================================================================

class Robot {
    constructor(x, y, isPlayer, color) {
        this.x = x;
        this.y = y;
        this.width = ROBOT.width;
        this.height = ROBOT.height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
        this.facingRight = isPlayer ? true : false;
        this.isPlayer = isPlayer;

        // V4.2: Guard/Shield state (blocks beams when active)
        this.isGuarding = false;
        this.guardDamageReduction = 0.9;  // 90% damage reduction when guarding

        // V4.3: Knockdown system (heavy damage causes stun)
        this.isDown = false;
        this.downTimer = 0;
        this.downDuration = 2000;  // 2 seconds of stun
        this.knockdownThreshold = 30;  // Damage >= 30 causes knockdown

        // Status
        this.hp = ROBOT.maxHp;
        this.maxHp = ROBOT.maxHp;
        this.isInvincible = false;
        this.invincibleTimer = 0;

        // Parameters (default: 5 each, total 20)
        this.jumpPower = 5;
        this.walkSpeed = 5;
        this.beamPower = 5;
        this.kickPower = 5;

        // Cooldowns
        this.beamCooldown = 0;
        this.kickCooldown = 0;

        // Charge beam state
        this.isCharging = false;
        this.chargeStartTime = 0;
        this.chargeLevel = 0;  // 0-1, where 1 = max charge

        // Animation
        this.animFrame = 0;
        this.animTimer = 0;
        this.state = 'idle'; // idle, walk, jump, attack, hurt, guard

        // Color
        this.color = color || (isPlayer ? 'red' : 'blue');

        // Sprite
        this.sprite = svgToImage(isPlayer ? SPRITES.robotRed : SPRITES.robotBlue);

        // Powerup state (for Items Mode)
        this.powerups = {
            rapid: { active: false, endTime: 0 },
            mega: { active: false, endTime: 0 },
            shield: { active: false, endTime: 0 }
        };

        // V4 Weapon state (fires WITH default beam)
        this.equippedWeapon = {
            type: null,      // 'BAZOOKA', 'MACHINEGUN', 'SPREAD', 'SWORD'
            endTime: 0,
            cooldown: 0      // Weapon-specific cooldown
        };

        // V4.1: Shadow clones array (for SHADOW_CLONE weapon)
        this.shadowClones = [];

        // Warp cooldown (prevents infinite warp loop)
        this.warpCooldown = 0;
    }

    // Apply a powerup effect
    applyPowerup(type) {
        const now = Date.now();

        // Check if it's a weapon item (starts with 'W_')
        if (type.startsWith('W_')) {
            const itemConfig = ITEMS.types[type];
            if (itemConfig && itemConfig.isWeapon) {
                this.equippedWeapon.type = itemConfig.weaponType;
                this.equippedWeapon.endTime = now + WEAPONS.duration;
                this.equippedWeapon.cooldown = 0;  // Ready to fire

                // V4.1: Create shadow clones when SHADOW_CLONE is equipped
                if (itemConfig.weaponType === 'SHADOW_CLONE') {
                    this.shadowClones = [
                        new ShadowClone(this, 0),  // First clone (closer, more opaque)
                        new ShadowClone(this, 1)   // Second clone (farther, more transparent)
                    ];
                    console.log(`[ShadowClone] Created 2 shadow clones for ${this.isPlayer ? 'player' : 'enemy'}`);
                }
                return;
            }
        }

        switch(type) {
            case 'HP':
                this.hp = Math.min(this.hp + ITEMS.types.HP.healAmount, this.maxHp);
                break;
            case 'RAPID':
                this.powerups.rapid.active = true;
                this.powerups.rapid.endTime = now + ITEMS.types.RAPID.duration;
                break;
            case 'MEGA':
                this.powerups.mega.active = true;
                this.powerups.mega.endTime = now + ITEMS.types.MEGA.duration;
                break;
            case 'SHIELD':
                this.powerups.shield.active = true;
                this.powerups.shield.endTime = now + ITEMS.types.SHIELD.duration;
                this.isInvincible = true;  // Shield grants invincibility
                break;
        }
    }

    // Update powerup timers
    updatePowerups() {
        const now = Date.now();

        if (this.powerups.rapid.active && now >= this.powerups.rapid.endTime) {
            this.powerups.rapid.active = false;
        }
        if (this.powerups.mega.active && now >= this.powerups.mega.endTime) {
            this.powerups.mega.active = false;
        }
        if (this.powerups.shield.active && now >= this.powerups.shield.endTime) {
            this.powerups.shield.active = false;
            // Only remove invincibility if not from damage
            if (this.invincibleTimer <= 0) {
                this.isInvincible = false;
            }
        }

        // V4: Update weapon timeout
        if (this.equippedWeapon.type && now >= this.equippedWeapon.endTime) {
            // V4.1: Clear shadow clones when weapon expires
            if (this.equippedWeapon.type === 'SHADOW_CLONE') {
                this.shadowClones = [];
                console.log(`[ShadowClone] Clones expired for ${this.isPlayer ? 'player' : 'enemy'}`);
            }
            this.equippedWeapon.type = null;
            this.equippedWeapon.cooldown = 0;
        }
    }

    // V4.1: Update shadow clones
    updateShadowClones(deltaTime) {
        for (const clone of this.shadowClones) {
            clone.update(deltaTime);
        }
        // Remove inactive clones
        this.shadowClones = this.shadowClones.filter(c => c.active);
    }

    // V4.1: Make shadow clones fire beams
    fireShadowCloneBeams(beams) {
        const firedBeams = [];
        for (const clone of this.shadowClones) {
            if (clone.shouldFire()) {
                const beam = clone.createBeam();
                firedBeams.push(beam);
            }
        }
        return firedBeams;
    }

    // V4: Check if weapon is ready to fire
    canFireWeapon() {
        if (!this.equippedWeapon.type) return false;
        return this.equippedWeapon.cooldown <= 0;
    }

    // V4: Get remaining weapon time (for UI display)
    getWeaponTimeRemaining() {
        if (!this.equippedWeapon.type) return 0;
        return Math.max(0, this.equippedWeapon.endTime - Date.now());
    }

    // Get effective beam cooldown (modified by RAPID powerup)
    get effectiveBeamCooldown() {
        if (this.powerups.rapid.active) {
            return ROBOT.beamCooldown * ITEMS.types.RAPID.cooldownMultiplier;
        }
        return ROBOT.beamCooldown;
    }

    get moveSpeed() {
        // V4.1: Slower movement for more tactical gameplay
        // Old: 3 + (5 * 0.5) = 5.5, New: 1.5 + (5 * 0.3) = 3
        return 1.5 + (this.walkSpeed * 0.3);
    }

    get jumpVelocity() {
        // V4.1: Slightly reduced jump for smaller characters
        return -(7 + (this.jumpPower * 0.7));
    }

    get beamDamage() {
        let damage = 8 + (this.beamPower * 1.2);
        if (this.powerups.mega.active) {
            damage *= ITEMS.types.MEGA.damageMultiplier;
        }
        return damage;
    }

    get kickDamage() {
        return 15 + (this.kickPower * 2.5);
    }

    setParameters(jump, walk, beam, kick) {
        this.jumpPower = jump;
        this.walkSpeed = walk;
        this.beamPower = beam;
        this.kickPower = kick;
    }

    move(direction) {
        this.velocityX = direction * this.moveSpeed;
        if (direction !== 0) {
            this.state = 'walk';
        }
    }

    jump() {
        if (this.onGround && !this.isGuarding) {
            this.velocityY = this.jumpVelocity;
            this.onGround = false;
            this.state = 'jump';
            this.isGuarding = false;  // Stop guarding when jumping

            // Play jump sound
            SoundManager.playJump();

            // Dust particles at feet
            ParticleSystem.dust(this.x + this.width / 2, this.y + this.height);

            return true;
        }
        return false;
    }

    // V4.2: Guard - activates shield to block incoming beams (90% damage reduction)
    guard() {
        if (this.onGround && !this.isGuarding) {
            this.isGuarding = true;
            this.state = 'guard';
            this.velocityX = 0;  // Stop movement when guarding
            return true;
        }
        return false;
    }

    // V4.2: Stop guarding
    stopGuarding() {
        if (this.isGuarding) {
            this.isGuarding = false;
            this.state = 'idle';
            return true;
        }
        return false;
    }

    // V4.2: Get hitbox (normal size, guard blocks damage instead of reducing hitbox)
    getHitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    // V4.2: Calculate damage with guard reduction
    calculateDamage(baseDamage) {
        if (this.isGuarding) {
            // Shield blocks 90% of damage
            return Math.floor(baseDamage * (1 - this.guardDamageReduction));
        }
        return baseDamage;
    }

    // Start charging beam (called when shoot button pressed)
    startCharging() {
        if (this.beamCooldown > 0 || this.isCharging) return false;

        // Check if already have a beam on screen
        this.isCharging = true;
        this.chargeStartTime = Date.now();
        this.chargeLevel = 0;
        this.state = 'attack';  // Show charging pose

        return true;
    }

    // Update charge level (called every frame while charging)
    updateCharge() {
        if (!this.isCharging) return;

        const chargeTime = Date.now() - this.chargeStartTime;
        this.chargeLevel = Math.min(chargeTime / CHARGE_BEAM.maxChargeTime, 1.0);

        // Play charge sound at MAX
        if (this.chargeLevel >= 1.0 && !this._maxChargeSoundPlayed) {
            SoundManager.playChargeMax();
            this._maxChargeSoundPlayed = true;
        }
    }

    // Cancel charging (e.g., if hit while charging)
    cancelCharge() {
        this.isCharging = false;
        this.chargeLevel = 0;
        this._maxChargeSoundPlayed = false;
    }

    // Release charged beam (called when shoot button released)
    releaseChargedBeam(beams) {
        if (!this.isCharging) return null;

        // 1発ずつルール: 自分のビームが画面上にあれば撃てない
        const owner = this.isPlayer ? 'player' : 'enemy';
        const existingBeam = beams.find(b => b.owner === owner && b.active);
        if (existingBeam) {
            this.cancelCharge();
            return null;
        }

        // Calculate charge multiplier (1x to 3x)
        const chargeMultiplier = 1 + (this.chargeLevel * (CHARGE_BEAM.maxDamageMultiplier - 1));
        const chargedDamage = Math.round(this.beamDamage * chargeMultiplier);

        // Calculate beam size multiplier
        const sizeMultiplier = 1 + (this.chargeLevel * (CHARGE_BEAM.sizeMultiplierMax - 1));

        this.beamCooldown = ROBOT.beamCooldown;
        this.state = 'attack';

        // Create charged beam
        const beamWidth = BEAM.width * sizeMultiplier;
        const beamHeight = BEAM.height * sizeMultiplier;

        // V4.2: Calculate beam Y position (normal position, can't fire while guarding)
        let beamY = this.y + this.height / 2 - beamHeight / 2;

        const beam = new Beam(
            this.facingRight ? this.x + this.width : this.x - beamWidth,
            beamY,
            this.facingRight ? 1 : -1,
            chargedDamage,
            owner,
            this.chargeLevel  // Pass charge level for visual effects
        );

        beams.push(beam);

        // V4.1: Shadow clones fire when owner fires (charged shot)
        if (this.equippedWeapon.type === 'SHADOW_CLONE' && this.shadowClones.length > 0) {
            for (const clone of this.shadowClones) {
                if (clone.shouldFire()) {
                    const cloneBeam = clone.createBeam();
                    beams.push(cloneBeam);
                }
            }
        }

        // Play beam shoot sound (louder for charged shots)
        SoundManager.playBeamShoot(this.chargeLevel);

        // Enhanced particle effect for charged shot
        const handX = this.facingRight ? this.x + this.width : this.x;
        const handY = this.y + this.height / 2;
        ParticleSystem.chargeRelease(handX, handY, this.isPlayer, this.chargeLevel);

        // Reset charge state
        this.isCharging = false;
        this.chargeLevel = 0;
        this._maxChargeSoundPlayed = false;

        return beam;
    }

    // Quick shot (no charge) - for AI and quick taps
    shoot(beams) {
        if (this.beamCooldown > 0) return null;

        // 1発ずつルール: 自分のビームが画面上にあれば撃てない
        const owner = this.isPlayer ? 'player' : 'enemy';
        const existingBeam = beams.find(b => b.owner === owner && b.active && !b.isCloneBeam);
        if (existingBeam) return null;

        // V4.2: Can't fire while guarding
        if (this.isGuarding) return null;

        this.beamCooldown = ROBOT.beamCooldown;
        this.state = 'attack';

        // V4.2: Calculate beam Y position (normal position)
        let beamY = this.y + this.height / 2 - BEAM.height / 2;

        const beam = new Beam(
            this.facingRight ? this.x + this.width : this.x - BEAM.width,
            beamY,
            this.facingRight ? 1 : -1,
            this.beamDamage,
            owner,
            0  // No charge
        );

        beams.push(beam);

        // V4.1: Shadow clones fire when owner fires
        if (this.equippedWeapon.type === 'SHADOW_CLONE' && this.shadowClones.length > 0) {
            for (const clone of this.shadowClones) {
                if (clone.shouldFire()) {
                    const cloneBeam = clone.createBeam();
                    beams.push(cloneBeam);
                }
            }
        }

        // Play beam shoot sound
        SoundManager.playBeamShoot();

        // Charge particle effect at hand
        const handX = this.facingRight ? this.x + this.width : this.x;
        const handY = this.y + this.height / 2;
        ParticleSystem.charge(handX, handY, this.isPlayer);

        return beam;
    }

    // V4: Fire equipped weapon (called alongside default beam)
    fireWeapon(weaponProjectiles, activeBeasts = [], target = null) {
        if (!this.equippedWeapon.type) return [];
        if (this.equippedWeapon.cooldown > 0) return [];

        const weaponType = this.equippedWeapon.type;
        const config = WEAPONS.types[weaponType];
        const owner = this.isPlayer ? 'player' : 'enemy';
        const direction = this.facingRight ? 1 : -1;

        // Position weapon fire at robot's hand
        const handX = this.facingRight ? this.x + this.width : this.x;
        const handY = this.y + this.height / 2;

        // Set weapon cooldown
        this.equippedWeapon.cooldown = config.cooldown;

        const projectiles = [];

        switch(weaponType) {
            case 'BAZOOKA':
                projectiles.push(new BazookaProjectile(
                    handX - (this.facingRight ? 0 : config.width),
                    handY - config.height / 2,
                    direction,
                    config.damage,
                    owner
                ));
                break;

            case 'MACHINEGUN':
                projectiles.push(new MachinegunProjectile(
                    handX - (this.facingRight ? 0 : config.width),
                    handY - config.height / 2,
                    direction,
                    config.damage,
                    owner
                ));
                break;

            case 'SPREAD':
                // Fire 3 projectiles with spread
                const angles = [-config.spreadAngle, 0, config.spreadAngle];
                for (const angle of angles) {
                    projectiles.push(new SpreadProjectile(
                        handX - (this.facingRight ? 0 : config.width),
                        handY - config.height / 2,
                        direction,
                        config.damage,
                        owner,
                        angle
                    ));
                }
                break;

            case 'SWORD':
                projectiles.push(new SwordSlash(
                    handX,
                    handY,
                    direction,
                    config.damage,
                    owner
                ));
                break;

            case 'HOMING_MISSILE':
                // Fire 2 homing missiles with slight offset
                // V4.3: Fixed parameter order (was passing damage as owner)
                for (let i = 0; i < config.missileCount; i++) {
                    const offsetY = (i - 0.5) * 30;
                    projectiles.push(new HomingMissile(
                        handX,
                        handY + offsetY,
                        direction,
                        owner,  // owner ('player' or 'enemy')
                        null    // target is set in game loop
                    ));
                }
                break;

            case 'SPIRIT_TIGER':
                // V4.3: Fixed - SpiritTiger gets damage from config internally
                projectiles.push(new SpiritTiger(
                    handX,
                    handY,
                    direction,
                    owner  // owner ('player' or 'enemy')
                ));
                break;

            case 'AERIAL_BOMB':
                // Drop bombs from above
                // V4.3: Fixed - AerialBomb gets damage from config internally
                for (let i = 0; i < config.bombCount; i++) {
                    const bombX = this.x + (direction * 80) + (i * 60 * direction);
                    projectiles.push(new AerialBomb(
                        bombX,
                        -30 - (i * 40),  // Stagger from top
                        owner  // owner ('player' or 'enemy')
                    ));
                }
                break;

            // V4.3: 緑龍召喚 (虎と同様の大型攻撃)
            case 'GREEN_DRAGON':
                projectiles.push(new GreenDragon(
                    handX,
                    handY - config.height / 2,
                    direction,
                    config.damage,
                    owner
                ));
                break;

            // V4.3: メテオストライク (上空から隕石落下)
            case 'METEOR_STRIKE':
                // 敵の位置めがけて隕石を落とす
                const targetX = owner === 'player' ?
                    (this.x + direction * 250) : // プレイヤーは前方に
                    (this.x + direction * 200);  // 敵は前方に
                projectiles.push(new MeteorStrike(
                    targetX,
                    -50,  // 画面外から落下開始
                    config.damage,
                    owner,
                    config.radius
                ));
                break;

            // V4.3: 魔獣召喚 (AI controlled beast)
            case 'BEAST_SUMMON':
                // V4.3: Only 1 beast per owner at a time
                const existingBeast = activeBeasts && activeBeasts.find(b => b.owner === owner && b.active);
                if (existingBeast) {
                    // Already have a beast, don't summon another
                    break;
                }
                // Summon beast next to the robot
                const beastX = this.facingRight ? this.x + this.width + 20 : this.x - config.width - 20;
                const beast = new Beast(
                    beastX,
                    this.y,
                    owner,
                    target  // The enemy robot to chase
                );
                // Add to activeBeasts instead of projectiles
                if (activeBeasts) {
                    activeBeasts.push(beast);
                }
                // Show summon effect
                ParticleSystem.emit(beastX + config.width/2, this.y + config.height/2, 15, {
                    color: owner === 'player' ? '#3399ff' : '#ff3333',
                    size: 6,
                    life: 30,
                    type: 'spark'
                });
                break;

            case 'SHADOW_CLONE':
                // Passive effect - no projectile fired
                // Effect is handled in update loop
                break;
        }

        // Add to weaponProjectiles array
        for (const proj of projectiles) {
            weaponProjectiles.push(proj);
        }

        // V4.3: Clear weapon immediately after firing if singleUse
        if (config.singleUse && projectiles.length > 0) {
            this.equippedWeapon.type = null;
            this.equippedWeapon.cooldown = 0;
            this.equippedWeapon.endTime = 0;
        }

        return projectiles;
    }

    kick(target) {
        if (this.kickCooldown > 0) return false;

        this.kickCooldown = ROBOT.kickCooldown;
        this.state = 'attack';

        // Check if target is in kick range
        const kickX = this.facingRight ? this.x + this.width : this.x - ROBOT.kickRange;
        const kickBox = {
            x: kickX,
            y: this.y + (this.height - ROBOT.kickHeight) / 2,
            width: ROBOT.kickRange,
            height: ROBOT.kickHeight
        };

        if (checkCollision(kickBox, target)) {
            return true;
        }
        return false;
    }

    takeDamage(damage, knockbackDir) {
        if (this.isInvincible) return false;

        // V4.2: Apply guard damage reduction (90% blocked when guarding)
        // V4.3: Cannot guard while knocked down
        const actualDamage = this.isDown ? damage : this.calculateDamage(damage);
        const wasGuarding = this.isGuarding && !this.isDown;

        this.hp = Math.max(0, this.hp - actualDamage);

        // V4.2: If guarding, show shield effect and reduced knockback
        if (wasGuarding) {
            // Shield block effect - cyan flash for player, red for enemy
            ParticleSystem.shieldBlock(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.isPlayer
            );
            // Reduced knockback when guarding
            this.velocityX = knockbackDir * ROBOT.knockback * 0.2;
            this.velocityY = -1;
            // Stay in guard state
            this.state = 'guard';
            // Brief invincibility
            this.isInvincible = true;
            this.invincibleTimer = ROBOT.invincibleTime * 0.5;
            // Smaller screen shake
            ScreenEffects.shake(2, 6);
        } else {
            // V4.3: Check for knockdown (heavy damage causes stun)
            if (actualDamage >= this.knockdownThreshold && !this.isDown) {
                this.triggerKnockdown(knockbackDir);
            } else {
                this.state = 'hurt';
                // Full knockback
                this.velocityX = knockbackDir * ROBOT.knockback;
                this.velocityY = -4;
                // Full invincibility
                this.isInvincible = true;
                this.invincibleTimer = ROBOT.invincibleTime;
                // Screen shake on damage
                ScreenEffects.shake(damage > 20 ? 8 : 5, 12);
                // Hit particles at robot center
                ParticleSystem.hit(this.x + this.width / 2, this.y + this.height / 2);
            }
        }

        return this.hp <= 0;
    }

    // V4.3: Trigger knockdown state with dramatic effects
    triggerKnockdown(knockbackDir) {
        console.log(`🌟 KNOCKDOWN triggered! ${this.isPlayer ? 'PLAYER' : 'ENEMY'} is DOWN for 2 seconds!`);
        this.isDown = true;
        this.downTimer = this.downDuration;
        this.state = 'down';
        this.isGuarding = false;  // Cancel guard

        // Strong knockback
        this.velocityX = knockbackDir * ROBOT.knockback * 1.5;
        this.velocityY = -8;

        // Dramatic screen effects
        ScreenEffects.shake(15, 20);
        ScreenEffects.flash('#ffffff', 0.6);

        // Heavy hit particles
        ParticleSystem.explosion(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.isPlayer ? '#ff6666' : '#6666ff',
            20
        );

        // Additional star particles for "seeing stars" effect
        ParticleSystem.emit(this.x + this.width / 2, this.y + 20, 8, {
            color: '#ffff00', size: 6, life: 60, type: 'spark'
        });

        // Brief invincibility during knockdown
        this.isInvincible = true;
        this.invincibleTimer = 500;  // 0.5s invincibility at start
    }

    // V4.3: Check if robot can perform actions (not knocked down)
    canAct() {
        return !this.isDown;
    }

    update(deltaTime, platforms) {
        // V4.3: Update knockdown timer
        if (this.isDown) {
            this.downTimer -= deltaTime;
            if (this.downTimer <= 0) {
                this.isDown = false;
                this.state = 'idle';
                // Brief invincibility when getting up
                this.isInvincible = true;
                this.invincibleTimer = 500;
            }
        }

        // Update cooldowns
        if (this.beamCooldown > 0) this.beamCooldown -= deltaTime;
        if (this.kickCooldown > 0) this.kickCooldown -= deltaTime;

        // Update invincibility
        if (this.isInvincible) {
            this.invincibleTimer -= deltaTime;
            if (this.invincibleTimer <= 0) {
                this.isInvincible = false;
            }
        }

        // Apply gravity
        this.velocityY += PHYSICS.gravity;
        this.velocityY = Math.min(this.velocityY, PHYSICS.maxFallSpeed);

        // Apply friction
        if (this.onGround) {
            this.velocityX *= PHYSICS.friction;
        } else {
            this.velocityX *= PHYSICS.airResistance;
        }

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Platform collision
        this.onGround = false;
        for (const platform of platforms) {
            if (this.velocityY > 0) {
                // Landing on platform
                if (this.y + this.height >= platform.y &&
                    this.y + this.height <= platform.y + 20 &&
                    this.x + this.width > platform.x &&
                    this.x < platform.x + platform.width) {

                    if (platform.type === 'solid' ||
                        (platform.type === 'passthrough' && this.y + this.height - this.velocityY <= platform.y)) {
                        this.y = platform.y - this.height;
                        this.velocityY = 0;
                        this.onGround = true;
                    }
                }
            }

            // Side collision (solid only)
            if (platform.type === 'solid') {
                if (checkCollision(this, platform)) {
                    // Push out horizontally
                    if (this.velocityX > 0) {
                        this.x = platform.x - this.width;
                    } else if (this.velocityX < 0) {
                        this.x = platform.x + platform.width;
                    }
                    this.velocityX = 0;
                }
            }
        }

        // Screen bounds
        this.x = clamp(this.x, 0, GAME_WIDTH - this.width);
        this.y = clamp(this.y, 0, GAME_HEIGHT - this.height);

        // Update state
        // Reset attack state when cooldown is done and not charging
        if (this.state === 'attack' && !this.isCharging && this.beamCooldown <= 0) {
            this.state = this.isGuarding ? 'guard' : 'idle';
        }

        // V4.2: Cancel guard when in the air
        if (!this.onGround && this.isGuarding) {
            this.isGuarding = false;
        }

        if (this.onGround && Math.abs(this.velocityX) < 0.5) {
            // V4.2: Don't override guard state
            // V4.3: Don't override down state (knockdown)
            if (this.state !== 'attack' && this.state !== 'hurt' && this.state !== 'guard' && this.state !== 'down') {
                this.state = 'idle';
            }
        } else if (!this.onGround) {
            // V4.3: Don't override down state when knocked into air
            if (this.state !== 'down') {
                this.state = 'jump';
            }
            this.isGuarding = false;  // V4.2: Can't guard in air
        }

        // Animation
        this.animTimer += deltaTime;
        if (this.animTimer >= 100) {
            this.animTimer = 0;
            this.animFrame = (this.animFrame + 1) % 4;
        }
    }

    render(ctx) {
        ctx.save();

        // V4.1: SHADOW_CLONE - Draw shadow clones (actual following clones)
        if (this.equippedWeapon.type === 'SHADOW_CLONE' && this.shadowClones.length > 0) {
            // Draw clones behind the main robot
            for (const clone of this.shadowClones) {
                clone.draw(ctx);
            }
        }

        // Flicker when invincible
        if (this.isInvincible && Math.floor(Date.now() / 50) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        // Calculate animation transforms based on state
        const time = Date.now();
        let offsetX = 0, offsetY = 0;
        let scaleX = 1, scaleY = 1;
        let rotation = 0;

        // State-based animations
        switch (this.state) {
            case 'idle':
                // Subtle breathing animation
                scaleX = 1 + Math.sin(time * 0.003) * 0.02;
                scaleY = 1 + Math.sin(time * 0.003 + Math.PI) * 0.02;
                offsetY = Math.sin(time * 0.002) * 1;
                break;

            case 'walk':
                // Bob up/down + lean in movement direction
                offsetY = Math.abs(Math.sin(this.animFrame * 0.8)) * -4;
                rotation = Math.sin(this.animFrame * 0.4) * 0.05;
                // Leg swing simulation via slight scale
                scaleX = 1 + Math.sin(this.animFrame * 0.8) * 0.03;
                break;

            case 'jump':
                if (this.velocityY < 0) {
                    // Rising - stretch vertically
                    scaleY = 1.15;
                    scaleX = 0.9;
                } else {
                    // Falling - slight squash
                    scaleY = 0.95;
                    scaleX = 1.05;
                }
                // Slight rotation based on horizontal movement
                rotation = this.velocityX * 0.01;
                break;

            case 'attack':
                // Recoil effect + arm extension simulation
                const attackPhase = (time % 300) / 300;
                if (attackPhase < 0.3) {
                    // Wind up
                    scaleX = 0.9;
                    offsetX = this.facingRight ? -3 : 3;
                } else if (attackPhase < 0.5) {
                    // Fire!
                    scaleX = 1.1;
                    offsetX = this.facingRight ? 5 : -5;
                } else {
                    // Recover
                    scaleX = 1 + (1 - attackPhase) * 0.1;
                }
                rotation = this.facingRight ? -0.05 : 0.05;
                break;

            case 'hurt':
                // Shake effect
                offsetX = Math.sin(time * 0.05) * 4;
                offsetY = Math.cos(time * 0.07) * 2;
                scaleX = 0.95;
                scaleY = 1.05;
                break;

            case 'guard':
                // V4.2: Guard animation - slight defensive stance
                scaleY = 0.95;  // Slightly crouched
                scaleX = 1.05;  // Slightly wider (bracing)
                offsetY = this.height * 0.025;  // Slight shift down
                // Shield glow effect will be added when rendering guard sprite
                break;
        }

        // Apply transforms
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        ctx.translate(centerX + offsetX, centerY + offsetY);
        ctx.rotate(rotation);

        // Try to use high-quality PNG sprite first (with state-specific sprites)
        // V4.3: Map 'down' state to 'ko' sprite
        const spriteState = this.state === 'down' ? 'ko' : this.state;
        const hqSprite = SpriteLoader.getSprite(this.isPlayer, spriteState, this.animFrame);

        // Flip logic - simplified after fixing sprite directions:
        // - Player (red) sprites: ALL face RIGHT natively
        // - Enemy (blue) sprites: ALL face LEFT natively
        //
        // facingRight=true means character should face RIGHT
        // facingRight=false means character should face LEFT
        let flipScale;
        if (this.isPlayer) {
            // Player sprites face RIGHT natively
            // facingRight=true (want RIGHT) → no flip (scaleX)
            // facingRight=false (want LEFT) → flip needed (-scaleX)
            flipScale = this.facingRight ? scaleX : -scaleX;
        } else {
            // Enemy sprites face LEFT natively
            // facingRight=true (want RIGHT) → flip needed (-scaleX)
            // facingRight=false (want LEFT) → no flip (scaleX)
            flipScale = this.facingRight ? -scaleX : scaleX;
        }

        ctx.scale(flipScale, scaleY);
        ctx.translate(-this.width / 2, -this.height / 2);

        if (SpriteLoader.useHighQuality && hqSprite) {
            // Use PNG sprite with proper sizing
            const spriteSize = Math.min(hqSprite.width, hqSprite.height);
            const sx = (hqSprite.width - spriteSize) / 2;
            const sy = (hqSprite.height - spriteSize) / 2;

            // Add glow effect for high-quality sprites
            ctx.shadowColor = this.isPlayer ? '#FF4400' : '#0066FF';
            ctx.shadowBlur = this.state === 'attack' ? 25 : (this.state === 'hurt' ? 15 : 10);

            // Draw with slight padding for glow - larger for photorealistic sprites
            ctx.drawImage(
                hqSprite,
                sx, sy, spriteSize, spriteSize,
                -12, -12, this.width + 24, this.height + 24
            );

            // Attack glow overlay
            if (this.state === 'attack') {
                ctx.shadowColor = this.isPlayer ? '#00FFFF' : '#FF3333';
                ctx.shadowBlur = 30;
                ctx.globalAlpha = 0.4;
                ctx.drawImage(
                    hqSprite,
                    sx, sy, spriteSize, spriteSize,
                    -12, -12, this.width + 24, this.height + 24
                );
            }

            // Hurt flash effect
            if (this.state === 'hurt') {
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(-12, -12, this.width + 24, this.height + 24);
                ctx.globalCompositeOperation = 'source-over';
            }

            // V4.3: Knockdown flash effect (glow only - stars rendered outside)
            if (this.state === 'down') {
                const pulse = Math.sin(Date.now() / 100) * 0.3 + 0.5;
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = pulse * 0.4;
                ctx.fillStyle = '#FF4400';
                ctx.fillRect(-12, -12, this.width + 24, this.height + 24);
                ctx.globalCompositeOperation = 'source-over';
            }
        } else if (SpriteLoader.useHighQuality) {
            // Use enhanced canvas rendering as fallback
            EnhancedRobotRenderer.draw(
                ctx,
                0, 0,
                this.width, this.height,
                this.isPlayer,
                this.state,
                true, // Always facing right (flip handled above)
                this.animFrame
            );
        } else {
            // Fall back to SVG sprite
            ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
        }

        ctx.restore();
        // V4.3: Dizzy stars are now drawn in main game loop (renderDizzyStars method)
    }

    // V4.3: Separate method to draw dizzy stars - called from main game loop
    renderDizzyStars(ctx) {
        if (this.state !== 'down') return;

        // Log once per knockdown
        if (!this._dizzyLogShown) {
            console.log(`⭐ renderDizzyStars called for ${this.isPlayer ? 'PLAYER' : 'ENEMY'} at (${this.x}, ${this.y})!`);
            this._dizzyLogShown = true;
        }

        // Save current context state
        ctx.save();

        // World coordinates: robot center, above the head
        const centerX = this.x + this.width / 2;
        const headY = this.y + 10; // Slightly below top of robot

        const time = Date.now() / 300;
        const starCount = 5;
        const orbitRadius = 40;

        for (let i = 0; i < starCount; i++) {
            const angle = time + (i * Math.PI * 2 / starCount);
            const starX = centerX + Math.cos(angle) * orbitRadius;
            const starY = headY + Math.sin(angle) * orbitRadius * 0.4 - 20; // Above head

            // Draw a bright yellow star
            ctx.beginPath();
            ctx.arc(starX, starY, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#ffff00';
            ctx.fill();
            ctx.strokeStyle = '#ff8800';
            ctx.lineWidth = 3;
            ctx.stroke();
        }

        ctx.restore();
    }
}

// ============================================================================
// BEAM CLASS
// ============================================================================

class Beam {
    constructor(x, y, direction, damage, owner, chargeLevel = 0) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.damage = damage;
        this.owner = owner;
        this.active = true;
        this.chargeLevel = chargeLevel;

        // Scale size based on charge level
        const sizeMultiplier = 1 + (chargeLevel * (CHARGE_BEAM.sizeMultiplierMax - 1));
        this.width = BEAM.width * sizeMultiplier;
        this.height = BEAM.height * sizeMultiplier;

        this.sprite = svgToImage(owner === 'player' ? SPRITES.beamRed : SPRITES.beamBlue);
    }

    update() {
        this.x += this.direction * BEAM.speed;

        // Out of bounds
        if (this.x < -this.width || this.x > GAME_WIDTH) {
            this.active = false;
        }

        // Beam trail particles (more for charged beams)
        const trailChance = 0.5 + (this.chargeLevel * 0.4);  // Up to 90% for max charge
        if (this.active && Math.random() < trailChance) {
            ParticleSystem.beamTrail(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.owner === 'player',
                this.chargeLevel
            );
        }
    }

    render(ctx) {
        ctx.save();

        if (this.direction < 0) {
            ctx.translate(this.x + this.width / 2, 0);
            ctx.scale(-1, 1);
            ctx.translate(-this.x - this.width / 2, 0);
        }

        // Glow effect for charged beams
        if (this.chargeLevel > 0.1) {
            const glowSize = 10 + (this.chargeLevel * 20);
            const glowAlpha = 0.3 + (this.chargeLevel * 0.4);
            const glowColor = this.owner === 'player' ?
                `rgba(255, ${Math.floor(100 - this.chargeLevel * 100)}, 0, ${glowAlpha})` :
                `rgba(0, ${Math.floor(100 + this.chargeLevel * 100)}, 255, ${glowAlpha})`;

            ctx.shadowColor = glowColor;
            ctx.shadowBlur = glowSize;
        }

        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}

// ============================================================================
// V4 WEAPON PROJECTILE CLASSES
// ============================================================================

// Base class for all weapon projectiles
class WeaponProjectile {
    constructor(x, y, direction, damage, owner, weaponType) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.damage = damage;
        this.owner = owner;
        this.weaponType = weaponType;
        this.active = true;
        this.startX = x;

        const config = WEAPONS.types[weaponType];
        this.speed = config.speed;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.glowColor = config.glowColor;
    }

    update() {
        this.x += this.direction * this.speed;

        // Out of bounds
        if (this.x < -this.width || this.x > GAME_WIDTH) {
            this.active = false;
        }
    }

    render(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

// Bazooka - Slow but powerful with explosion radius
class BazookaProjectile extends WeaponProjectile {
    constructor(x, y, direction, damage, owner) {
        super(x, y, direction, damage, owner, 'BAZOOKA');
        this.explosionRadius = WEAPONS.types.BAZOOKA.explosionRadius;
        this.hasExploded = false;
    }

    render(ctx) {
        ctx.save();

        // Rocket shape
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        // Glow
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 15;

        // Main body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.direction > 0) {
            ctx.moveTo(this.x + this.width, centerY);
            ctx.lineTo(this.x + this.width * 0.7, this.y);
            ctx.lineTo(this.x, this.y + 2);
            ctx.lineTo(this.x, this.y + this.height - 2);
            ctx.lineTo(this.x + this.width * 0.7, this.y + this.height);
        } else {
            ctx.moveTo(this.x, centerY);
            ctx.lineTo(this.x + this.width * 0.3, this.y);
            ctx.lineTo(this.x + this.width, this.y + 2);
            ctx.lineTo(this.x + this.width, this.y + this.height - 2);
            ctx.lineTo(this.x + this.width * 0.3, this.y + this.height);
        }
        ctx.closePath();
        ctx.fill();

        // Flame trail
        ctx.fillStyle = '#ffff00';
        const flameX = this.direction > 0 ? this.x - 8 : this.x + this.width;
        ctx.beginPath();
        ctx.arc(flameX, centerY, 6 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Called when hitting something - returns explosion data
    explode() {
        if (this.hasExploded) return null;
        this.hasExploded = true;
        this.active = false;

        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            radius: this.explosionRadius,
            damage: this.damage
        };
    }
}

// Machinegun - Rapid fire, short range
class MachinegunProjectile extends WeaponProjectile {
    constructor(x, y, direction, damage, owner) {
        super(x, y, direction, damage, owner, 'MACHINEGUN');
        this.range = WEAPONS.types.MACHINEGUN.range;
    }

    update() {
        super.update();

        // Limited range
        const traveled = Math.abs(this.x - this.startX);
        if (traveled >= this.range) {
            this.active = false;
        }
    }

    render(ctx) {
        ctx.save();

        // Small bullet shape
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 8;

        // Elongated bullet
        ctx.beginPath();
        ctx.ellipse(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width / 2,
            this.height / 2,
            0, 0, Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }
}

// Spread - 3-way projectile (this class represents one of the 3)
class SpreadProjectile extends WeaponProjectile {
    constructor(x, y, direction, damage, owner, angleOffset = 0) {
        super(x, y, direction, damage, owner, 'SPREAD');
        this.angleOffset = angleOffset;  // Degrees
        this.velocityX = Math.cos(angleOffset * Math.PI / 180) * this.speed * direction;
        this.velocityY = Math.sin(angleOffset * Math.PI / 180) * this.speed;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Out of bounds
        if (this.x < -this.width || this.x > GAME_WIDTH ||
            this.y < -this.height || this.y > GAME_HEIGHT) {
            this.active = false;
        }
    }

    render(ctx) {
        ctx.save();

        // Diamond shape
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(centerX, this.y);
        ctx.lineTo(this.x + this.width, centerY);
        ctx.lineTo(centerX, this.y + this.height);
        ctx.lineTo(this.x, centerY);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

// Sword - Melee attack (instant hit, short range)
class SwordSlash {
    constructor(x, y, direction, damage, owner) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.damage = damage;
        this.owner = owner;
        this.active = true;
        this.weaponType = 'SWORD';

        const config = WEAPONS.types.SWORD;
        this.range = config.range;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.glowColor = config.glowColor;
        this.swingDuration = config.swingDuration;

        this.startTime = Date.now();
        this.swingProgress = 0;  // 0 to 1
    }

    update() {
        const elapsed = Date.now() - this.startTime;
        this.swingProgress = Math.min(elapsed / this.swingDuration, 1);

        if (this.swingProgress >= 1) {
            this.active = false;
        }
    }

    // Get hitbox for collision detection
    getHitbox() {
        const swingX = this.direction > 0 ? this.x : this.x - this.width;
        return {
            x: swingX,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }

    render(ctx) {
        ctx.save();

        const centerX = this.x;
        const centerY = this.y;

        // Swing arc
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 8;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 20;
        ctx.lineCap = 'round';

        // Calculate swing angle based on progress
        const startAngle = this.direction > 0 ? -Math.PI / 3 : Math.PI + Math.PI / 3;
        const endAngle = this.direction > 0 ? Math.PI / 3 : Math.PI - Math.PI / 3;
        const currentAngle = startAngle + (endAngle - startAngle) * this.swingProgress;

        // Draw sword arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.range * 0.8, startAngle,
            startAngle + (endAngle - startAngle) * this.swingProgress);
        ctx.stroke();

        // Draw blade at current position
        const bladeX = centerX + Math.cos(currentAngle) * this.range * 0.9;
        const bladeY = centerY + Math.sin(currentAngle) * this.range * 0.9;

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(bladeX, bladeY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Trail effect
        ctx.globalAlpha = 0.5 - this.swingProgress * 0.4;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.range * 0.7, startAngle,
            startAngle + (endAngle - startAngle) * this.swingProgress);
        ctx.stroke();

        ctx.restore();
    }
}

// ============================================================================
// V4 NEW WEAPON CLASSES - 誘導ミサイル、残像分身、虎召喚、空中爆撃、レーザー、ブラックホール
// ============================================================================

// V4.1: Shadow Clone - Follows player and attacks like an "option" in shoot-em-ups
class ShadowClone {
    constructor(owner, offsetIndex) {
        this.owner = owner;
        this.offsetIndex = offsetIndex;  // 0 = first clone, 1 = second clone
        this.active = true;

        // Position history for delayed following
        this.positionHistory = [];
        this.historyLength = offsetIndex === 0 ? 15 : 30;  // First clone closer, second farther

        // Current position (starts at owner position)
        this.x = owner.x;
        this.y = owner.y;
        this.facingRight = owner.facingRight;

        // Clone properties
        this.alpha = offsetIndex === 0 ? 0.6 : 0.35;
        this.scale = offsetIndex === 0 ? 0.85 : 0.7;
        this.color = owner.isPlayer ? 'rgba(255, 100, 100, 0.7)' : 'rgba(100, 100, 255, 0.7)';
        this.glowColor = owner.isPlayer ? '#ff3366' : '#3366ff';

        // Attack state
        this.beamCooldown = 0;
        this.lastOwnerBeamTime = 0;
    }

    update(deltaTime) {
        if (!this.owner || this.owner.hp <= 0) {
            this.active = false;
            return;
        }

        // Record owner position
        this.positionHistory.push({
            x: this.owner.x,
            y: this.owner.y,
            facingRight: this.owner.facingRight
        });

        // Keep history at fixed length
        while (this.positionHistory.length > this.historyLength) {
            this.positionHistory.shift();
        }

        // Follow delayed position
        if (this.positionHistory.length > 0) {
            const delayedPos = this.positionHistory[0];
            this.x = delayedPos.x;
            this.y = delayedPos.y;
            this.facingRight = delayedPos.facingRight;
        }

        // Update cooldown
        if (this.beamCooldown > 0) {
            this.beamCooldown -= deltaTime;
        }
    }

    // Check if clone should fire (called when owner fires)
    shouldFire() {
        if (this.beamCooldown > 0) return false;
        this.beamCooldown = ROBOT.beamCooldown + (this.offsetIndex * 150);  // Stagger fire
        return true;
    }

    // Create a beam from this clone
    createBeam(weaponProjectiles) {
        const direction = this.facingRight ? 1 : -1;
        const beamX = this.x + (this.facingRight ? this.owner.width * this.scale : 0);
        const beamY = this.y + (this.owner.height * this.scale * 0.4);

        const beam = new Beam(
            beamX,
            beamY,
            direction,
            this.owner.isPlayer ? 'player' : 'enemy',
            0.7  // Reduced damage multiplier for clone beams
        );
        beam.isCloneBeam = true;  // Mark as clone beam for effects
        beam.cloneAlpha = this.alpha;

        return beam;
    }

    draw(ctx) {
        if (!this.owner) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;

        const drawX = this.x;
        const drawY = this.y;
        const width = this.owner.width * this.scale;
        const height = this.owner.height * this.scale;

        // Ghostly glow effect
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 20;

        // Draw ghostly silhouette
        ctx.fillStyle = this.color;

        // Simple robot shape
        const headHeight = height * 0.3;
        const bodyHeight = height * 0.7;

        // Head
        ctx.beginPath();
        ctx.arc(drawX + width/2, drawY + headHeight/2, width * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillRect(drawX + width * 0.15, drawY + headHeight, width * 0.7, bodyHeight * 0.6);

        // Legs
        ctx.fillRect(drawX + width * 0.2, drawY + headHeight + bodyHeight * 0.5, width * 0.2, bodyHeight * 0.5);
        ctx.fillRect(drawX + width * 0.6, drawY + headHeight + bodyHeight * 0.5, width * 0.2, bodyHeight * 0.5);

        // Glowing eyes
        ctx.shadowBlur = 10;
        ctx.fillStyle = this.owner.isPlayer ? '#ff0000' : '#0066ff';
        const eyeSize = width * 0.08;
        const eyeY = drawY + headHeight * 0.4;
        ctx.beginPath();
        ctx.arc(drawX + width * 0.35, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.arc(drawX + width * 0.65, eyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

// 誘導ミサイル - Homing Missile that tracks enemy
class HomingMissile {
    constructor(x, y, direction, owner, target) {
        const config = WEAPONS.types.HOMING_MISSILE;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.target = target;
        this.active = true;
        this.weaponType = 'HOMING_MISSILE';
        this.direction = direction;

        this.speed = config.speed;
        this.damage = config.damage;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.glowColor = config.glowColor;
        this.turnRate = config.turnRate;

        // Initial velocity
        this.angle = direction > 0 ? 0 : Math.PI;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        // Trail particles - V4.3: より長いトレイル
        this.trail = [];
        this.startTime = Date.now();

        // V4.3: Serpentine motion parameters (visible winding trajectory)
        this.serpentinePhase = Math.random() * Math.PI * 2;
        this.serpentineAmplitude = 12;    // Higher amplitude for visible winding
        this.serpentineFrequency = 0.012; // Lower frequency for smooth curves
    }

    update() {
        const elapsed = Date.now() - this.startTime;

        // Track target
        if (this.target && this.target.hp > 0) {
            const targetX = this.target.x + this.target.width / 2;
            const targetY = this.target.y + this.target.height / 2;
            const desiredAngle = Math.atan2(targetY - this.y, targetX - this.x);

            // Smoothly turn toward target
            let angleDiff = desiredAngle - this.angle;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

            this.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), this.turnRate);
        }

        // Accelerate over time
        const speedMultiplier = 1 + elapsed / 1500;

        // V4.3: Add serpentine motion (winding trajectory)
        const serpentineOffset = Math.sin(elapsed * this.serpentineFrequency + this.serpentinePhase) * this.serpentineAmplitude;
        const perpAngle = this.angle + Math.PI / 2;

        this.vx = Math.cos(this.angle) * this.speed * speedMultiplier + Math.cos(perpAngle) * serpentineOffset;
        this.vy = Math.sin(this.angle) * this.speed * speedMultiplier + Math.sin(perpAngle) * serpentineOffset;

        this.x += this.vx;
        this.y += this.vy;

        // Add trail particle - V4.3: より派手なトレイル
        this.trail.push({ x: this.x, y: this.y, alpha: 1, size: 5 + Math.random() * 3 });
        if (this.trail.length > 25) this.trail.shift();
        this.trail.forEach(p => p.alpha -= 0.04);

        // Bounds check
        if (this.x < -50 || this.x > GAME_WIDTH + 50 || this.y < -50 || this.y > GAME_HEIGHT + 50) {
            this.active = false;
        }
    }

    getHitbox() {
        return { x: this.x - this.width/2, y: this.y - this.height/2, width: this.width, height: this.height };
    }

    render(ctx) {
        ctx.save();

        // V4.3: Draw enhanced smoke trail with fire effect
        this.trail.forEach((p, i) => {
            ctx.globalAlpha = p.alpha * 0.7;
            // Inner fire (yellow-orange)
            ctx.fillStyle = i > this.trail.length * 0.6 ? '#ff6600' : '#ffaa00';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
            // Outer smoke
            ctx.fillStyle = '#666666';
            ctx.globalAlpha = p.alpha * 0.3;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw missile body
        ctx.globalAlpha = 1;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Missile shape
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 15;

        ctx.beginPath();
        ctx.moveTo(this.width/2, 0);
        ctx.lineTo(-this.width/2, -this.height/2);
        ctx.lineTo(-this.width/3, 0);
        ctx.lineTo(-this.width/2, this.height/2);
        ctx.closePath();
        ctx.fill();

        // Engine flame
        ctx.fillStyle = '#ffff00';
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(-this.width/3, 0);
        ctx.lineTo(-this.width/2 - 10 - Math.random() * 8, -3);
        ctx.lineTo(-this.width/2 - 10 - Math.random() * 8, 3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

// 虎召喚 - Spirit Tiger that rushes across screen
class SpiritTiger {
    constructor(x, y, direction, owner) {
        const config = WEAPONS.types.SPIRIT_TIGER;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.owner = owner;
        this.active = true;
        this.weaponType = 'SPIRIT_TIGER';

        this.speed = config.speed;
        this.damage = config.damage;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.glowColor = config.glowColor;

        this.startTime = Date.now();
        this.particles = [];
        this.animFrame = 0;
    }

    update() {
        this.x += this.direction * this.speed;
        this.animFrame++;

        // Add spirit particles
        for (let i = 0; i < 3; i++) {
            this.particles.push({
                x: this.x - this.direction * 30 + Math.random() * 40,
                y: this.y + (Math.random() - 0.5) * this.height,
                size: 5 + Math.random() * 10,
                alpha: 0.8
            });
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.alpha -= 0.05;
            p.x -= this.direction * 2;
            return p.alpha > 0;
        });

        // Bounds check
        if (this.x < -this.width || this.x > GAME_WIDTH + this.width) {
            this.active = false;
        }
    }

    getHitbox() {
        return {
            x: this.direction > 0 ? this.x - this.width/3 : this.x - this.width*2/3,
            y: this.y - this.height/2,
            width: this.width,
            height: this.height
        };
    }

    render(ctx) {
        ctx.save();

        // Draw spirit particles
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 0.9;
        ctx.translate(this.x, this.y);
        if (this.direction < 0) ctx.scale(-1, 1);

        // Tiger body glow
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 30;

        // Draw stylized tiger
        const bounce = Math.sin(this.animFrame * 0.3) * 5;

        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, bounce, this.width * 0.4, this.height * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(this.width * 0.35, bounce - 5, this.width * 0.2, this.height * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (glowing)
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(this.width * 0.4, bounce - 10, 6, 0, Math.PI * 2);
        ctx.arc(this.width * 0.45, bounce - 3, 6, 0, Math.PI * 2);
        ctx.fill();

        // Stripes
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.width * 0.2 + i * 20, bounce - 20);
            ctx.lineTo(-this.width * 0.15 + i * 20, bounce + 20);
            ctx.stroke();
        }

        // Front legs (running animation)
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glowColor;
        const legOffset = Math.sin(this.animFrame * 0.5) * 15;
        ctx.fillRect(this.width * 0.2, this.height * 0.2 + bounce + legOffset, 12, 25);
        ctx.fillRect(-this.width * 0.1, this.height * 0.2 + bounce - legOffset, 12, 25);

        ctx.restore();
    }
}

// V4.3: 魔獣召喚 - Beast Summon (AI controlled beast that follows and attacks)
class Beast {
    constructor(x, y, owner, target) {
        const config = WEAPONS.types.BEAST_SUMMON;
        this.x = x;
        this.y = y;
        this.owner = owner;  // 'player' (blue robot) or 'enemy' (red robot)
        this.target = target; // Reference to target robot
        this.active = true;
        this.weaponType = 'BEAST_SUMMON';

        // Beast properties
        this.hp = config.hp;           // 250 HP
        this.maxHp = config.hp;
        this.damage = config.damage;   // V4.3: 15 flame damage (halved for balance)
        this.speed = config.speed;     // 1.5 movement speed (slower)
        this.flameRange = config.flameRange;      // 120 pixels
        this.idealDistance = config.idealDistance || 70; // Keep this distance
        this.flameCooldown = config.flameCooldown; // 1500ms
        this.width = config.width;     // V4.3: 96 (larger for easier targeting)
        this.height = config.height;   // V4.3: 72 (larger for easier targeting)
        // V4.3: Beast color matches summoner's robot color
        // In this game: player robot = red, enemy robot = blue
        // So: player summons red beast, enemy summons blue beast
        this.color = owner === 'player' ? '#ff3333' : '#3399ff';
        this.glowColor = owner === 'player' ? 'rgba(255, 51, 51, 0.8)' : 'rgba(51, 153, 255, 0.8)';

        // State machine
        this.state = 'idle';  // idle, walk, jump, flame, down
        this.facingRight = owner === 'player';
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = true;

        // Animation
        this.animFrame = 0;
        this.lastFlameTime = 0;
        this.flameActive = false;
        this.flameDuration = 500; // Flame attack lasts 500ms
        this.flameStartTime = 0;

        // Knockdown state
        this.isDown = false;
        this.downTime = 0;
        this.invincibleUntil = 0;

        // Particles
        this.particles = [];
    }

    update(platforms) {
        if (!this.active) return;

        // Check if dead
        if (this.hp <= 0 && !this.isDown) {
            this.isDown = true;
            this.downTime = Date.now();
            this.state = 'down';
            return;
        }

        // If down, stay down for a bit then deactivate
        if (this.isDown) {
            if (Date.now() - this.downTime > 2000) {
                this.active = false;
            }
            return;
        }

        this.animFrame++;

        // AI behavior: follow and attack target
        if (this.target && !this.flameActive) {
            const targetCenterX = this.target.x + this.target.width / 2;
            const beastCenterX = this.x + this.width / 2;
            const targetCenterY = this.target.y + this.target.height / 2;
            const beastCenterY = this.y + this.height / 2;

            const distX = targetCenterX - beastCenterX;
            const distY = targetCenterY - beastCenterY;
            const distance = Math.hypot(distX, distY);

            // Face the target
            this.facingRight = distX > 0;

            // Check if in flame range and can attack
            if (distance < this.flameRange && Date.now() - this.lastFlameTime > this.flameCooldown) {
                // Attack!
                this.startFlameAttack();
            }

            // Movement logic: maintain ideal distance
            const tooClose = distance < this.idealDistance - 20;  // Too close (< 50)
            const tooFar = distance > this.idealDistance + 30;    // Too far (> 100)

            if (tooClose && !this.flameActive) {
                // Back away from target
                this.velocityX = (distX > 0 ? -1 : 1) * this.speed * 0.8;
                this.state = 'walk';
            } else if (tooFar && !this.flameActive) {
                // Move towards target
                this.velocityX = (distX > 0 ? 1 : -1) * this.speed;
                this.state = 'walk';

                // Jump if target is above
                if (distY < -50 && this.onGround) {
                    this.velocityY = -10;
                    this.onGround = false;
                    this.state = 'jump';
                }
            } else {
                // At good distance - stop and prepare to attack
                this.velocityX = 0;
                if (this.onGround && !this.flameActive) {
                    this.state = 'idle';
                }
            }
        }

        // Update flame attack
        if (this.flameActive) {
            if (Date.now() - this.flameStartTime > this.flameDuration) {
                this.flameActive = false;
                this.state = this.onGround ? 'idle' : 'jump';
            }
        }

        // Physics
        this.velocityY += PHYSICS.gravity;
        if (this.velocityY > PHYSICS.maxFallSpeed) {
            this.velocityY = PHYSICS.maxFallSpeed;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Platform collision (simplified)
        this.onGround = false;
        for (const platform of platforms) {
            if (this.y + this.height > platform.y &&
                this.y + this.height < platform.y + 20 &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width &&
                this.velocityY >= 0) {
                this.y = platform.y - this.height;
                this.velocityY = 0;
                this.onGround = true;
                if (this.state === 'jump') {
                    this.state = 'idle';
                }
            }
        }

        // Ground collision
        if (this.y > GAME_HEIGHT - 90 - this.height) {
            this.y = GAME_HEIGHT - 90 - this.height;
            this.velocityY = 0;
            this.onGround = true;
        }

        // Bounds
        if (this.x < 0) this.x = 0;
        if (this.x > GAME_WIDTH - this.width) this.x = GAME_WIDTH - this.width;

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });
    }

    startFlameAttack() {
        this.flameActive = true;
        this.flameStartTime = Date.now();
        this.lastFlameTime = Date.now();
        this.state = 'flame';

        // Add flame particles
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: this.x + (this.facingRight ? this.width : 0),
                y: this.y + this.height * 0.4,
                vx: (this.facingRight ? 1 : -1) * (3 + Math.random() * 4),
                vy: (Math.random() - 0.5) * 2,
                size: 8 + Math.random() * 8,
                life: 20 + Math.random() * 10,
                color: Math.random() > 0.5 ? '#ff6600' : '#ffcc00'
            });
        }

        SoundManager.playBeamHit(); // Flame sound
    }

    takeDamage(damage) {
        if (Date.now() < this.invincibleUntil) return false;

        this.hp -= damage;
        this.invincibleUntil = Date.now() + 200; // Brief invincibility

        // Create hit particles
        for (let i = 0; i < 5; i++) {
            this.particles.push({
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: 4 + Math.random() * 4,
                life: 15,
                color: this.color
            });
        }

        if (this.hp <= 0) {
            return true; // Beast defeated
        }
        return false;
    }

    getHitbox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    getFlameHitbox() {
        if (!this.flameActive) return null;

        const flameWidth = 60;
        const flameHeight = 30;
        return {
            x: this.facingRight ? this.x + this.width : this.x - flameWidth,
            y: this.y + this.height * 0.3,
            width: flameWidth,
            height: flameHeight
        };
    }

    render(ctx) {
        if (!this.active) return;

        ctx.save();

        // Draw particles first (behind beast)
        this.particles.forEach(p => {
            ctx.globalAlpha = p.life / 30;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;

        // Get beast sprite (player robot = red, so player beast = red)
        const spriteKey = this.owner === 'player' ? 'beast_red_' : 'beast_blue_';
        let spriteState = this.state;
        if (this.state === 'walk') {
            spriteState = 'walk';
        }
        const sprite = SpriteLoader.sprites[spriteKey + spriteState];

        // Draw beast
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        if (!this.facingRight) {
            ctx.scale(-1, 1);
        }

        // Invincibility flash
        if (Date.now() < this.invincibleUntil) {
            ctx.globalAlpha = 0.5;
        }

        if (sprite) {
            // Draw sprite
            ctx.drawImage(sprite, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            // Fallback: draw simple beast shape
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 20;

            // Body
            const bounce = Math.sin(this.animFrame * 0.2) * 3;
            ctx.beginPath();
            ctx.ellipse(0, bounce, this.width * 0.4, this.height * 0.4, 0, 0, Math.PI * 2);
            ctx.fill();

            // Head
            ctx.beginPath();
            ctx.ellipse(this.width * 0.25, bounce - 5, this.width * 0.2, this.height * 0.25, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eyes
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(this.width * 0.3, bounce - 8, 4, 0, Math.PI * 2);
            ctx.fill();

            // Small horns
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.width * 0.1, bounce - 20);
            ctx.lineTo(this.width * 0.15, bounce - 30);
            ctx.lineTo(this.width * 0.2, bounce - 20);
            ctx.fill();
        }

        // Draw flame if attacking
        if (this.flameActive) {
            const flameProgress = (Date.now() - this.flameStartTime) / this.flameDuration;
            ctx.globalAlpha = 1 - flameProgress * 0.5;

            // Flame gradient
            const gradient = ctx.createRadialGradient(30, 0, 5, 30, 0, 40);
            gradient.addColorStop(0, '#ffff00');
            gradient.addColorStop(0.5, '#ff6600');
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.shadowColor = '#ff6600';
            ctx.shadowBlur = 30;

            // Draw flame shape
            ctx.beginPath();
            ctx.ellipse(40, 0, 35, 15, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        // Draw HP bar
        if (this.hp < this.maxHp && this.hp > 0) {
            const barWidth = 40;
            const barHeight = 4;
            const barX = this.x + (this.width - barWidth) / 2;
            const barY = this.y - 10;

            // Background
            ctx.fillStyle = '#333333';
            ctx.fillRect(barX, barY, barWidth, barHeight);

            // HP
            const hpRatio = this.hp / this.maxHp;
            ctx.fillStyle = hpRatio > 0.5 ? '#00ff00' : hpRatio > 0.25 ? '#ffff00' : '#ff0000';
            ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);
        }
    }
}

// 空中爆撃 - Aerial Bomb (drops from above)
class AerialBomb {
    constructor(x, y, owner) {
        const config = WEAPONS.types.AERIAL_BOMB;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.active = true;
        this.weaponType = 'AERIAL_BOMB';

        this.fallSpeed = config.fallSpeed;
        this.damage = config.damage;
        this.explosionRadius = config.explosionRadius;
        this.color = config.color;
        this.glowColor = config.glowColor;

        this.width = 20;
        this.height = 24;
        this.exploded = false;
        this.explosionTime = 0;
        this.explosionDuration = 300;
    }

    update() {
        if (!this.exploded) {
            this.y += this.fallSpeed;

            // Hit ground
            if (this.y > GAME_HEIGHT - 80) {
                this.explode();
            }
        } else {
            if (Date.now() - this.explosionTime > this.explosionDuration) {
                this.active = false;
            }
        }
    }

    explode() {
        this.exploded = true;
        this.explosionTime = Date.now();
        SoundManager.playBeamHit();
        ScreenEffects.shake(8, 15);
    }

    getHitbox() {
        if (this.exploded) {
            return {
                x: this.x - this.explosionRadius,
                y: this.y - this.explosionRadius,
                width: this.explosionRadius * 2,
                height: this.explosionRadius * 2
            };
        }
        return { x: this.x - this.width/2, y: this.y - this.height/2, width: this.width, height: this.height };
    }

    render(ctx) {
        ctx.save();

        if (!this.exploded) {
            // Draw bomb
            ctx.translate(this.x, this.y);
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 15;

            // Bomb body
            ctx.beginPath();
            ctx.ellipse(0, 0, this.width/2, this.height/2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Fins
            ctx.fillStyle = '#666666';
            ctx.fillRect(-15, -this.height/2 - 8, 30, 10);

            // Warning stripe
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(-8, -5, 16, 10);
        } else {
            // Draw explosion
            const progress = (Date.now() - this.explosionTime) / this.explosionDuration;
            const radius = this.explosionRadius * (0.5 + progress * 0.5);

            ctx.globalAlpha = 1 - progress;

            // Outer ring
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 8;
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner explosion
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffff00';
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// V4.3: 緑龍召喚 - Green Dragon (similar to Spirit Tiger)
class GreenDragon {
    constructor(x, y, direction, damage, owner) {
        const config = WEAPONS.types.GREEN_DRAGON;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.owner = owner;
        this.active = true;
        this.weaponType = 'GREEN_DRAGON';

        this.speed = config.speed;
        this.damage = damage;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.glowColor = config.glowColor;
        this.explodeOnHit = config.explodeOnHit;

        this.startTime = Date.now();
        this.particles = [];
        this.animFrame = 0;
    }

    update() {
        this.x += this.direction * this.speed;
        this.animFrame++;

        // Add spirit particles (green flame)
        for (let i = 0; i < 4; i++) {
            this.particles.push({
                x: this.x - this.direction * 40 + Math.random() * 50,
                y: this.y + (Math.random() - 0.5) * this.height,
                size: 6 + Math.random() * 12,
                alpha: 0.9
            });
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.alpha -= 0.04;
            p.x -= this.direction * 3;
            p.size *= 0.95;
            return p.alpha > 0;
        });

        // Bounds check
        if (this.x < -this.width || this.x > GAME_WIDTH + this.width) {
            this.active = false;
        }
    }

    getHitbox() {
        return {
            x: this.direction > 0 ? this.x - this.width/3 : this.x - this.width*2/3,
            y: this.y - this.height/2,
            width: this.width,
            height: this.height
        };
    }

    render(ctx) {
        ctx.save();

        // Draw spirit particles (green flames)
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 0.95;
        ctx.translate(this.x, this.y);
        if (this.direction < 0) ctx.scale(-1, 1);

        // Dragon body glow
        ctx.shadowColor = this.glowColor;
        ctx.shadowBlur = 35;

        // Draw stylized dragon
        const wave = Math.sin(this.animFrame * 0.2) * 8;

        // Long serpentine body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, wave, this.width * 0.35, this.height * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head (larger, triangular)
        ctx.beginPath();
        ctx.moveTo(this.width * 0.4, wave - 15);
        ctx.lineTo(this.width * 0.6, wave);
        ctx.lineTo(this.width * 0.4, wave + 15);
        ctx.lineTo(this.width * 0.25, wave);
        ctx.closePath();
        ctx.fill();

        // Eyes (glowing)
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(this.width * 0.45, wave - 5, 5, 0, Math.PI * 2);
        ctx.arc(this.width * 0.45, wave + 5, 5, 0, Math.PI * 2);
        ctx.fill();

        // Whiskers/horns
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(this.width * 0.35, wave - 12);
        ctx.lineTo(this.width * 0.2, wave - 25);
        ctx.moveTo(this.width * 0.35, wave + 12);
        ctx.lineTo(this.width * 0.2, wave + 25);
        ctx.stroke();

        // Tail segments
        for (let i = 1; i <= 3; i++) {
            const tailWave = Math.sin(this.animFrame * 0.2 - i * 0.5) * 10;
            ctx.globalAlpha = 0.9 - i * 0.2;
            ctx.beginPath();
            ctx.ellipse(-this.width * 0.15 * i, tailWave, this.width * 0.12, this.height * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// V4.3: メテオストライク - Meteor Strike (falls from sky, area damage)
class MeteorStrike {
    constructor(x, y, damage, owner, radius) {
        const config = WEAPONS.types.METEOR_STRIKE;
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.active = true;
        this.weaponType = 'METEOR_STRIKE';

        this.damage = damage;
        this.speed = config.speed;
        this.radius = radius || config.radius;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.glowColor = config.glowColor;

        this.falling = true;
        this.exploded = false;
        this.explosionTime = 0;
        this.explosionDuration = 500;
        this.targetY = GAME_HEIGHT - 100;  // Ground level

        this.particles = [];
        this.rotation = 0;
    }

    update() {
        if (this.falling) {
            this.y += this.speed;
            this.rotation += 0.2;

            // Trail particles
            for (let i = 0; i < 3; i++) {
                this.particles.push({
                    x: this.x + (Math.random() - 0.5) * 20,
                    y: this.y - 20 + (Math.random() - 0.5) * 10,
                    vx: (Math.random() - 0.5) * 2,
                    vy: -2 - Math.random() * 2,
                    size: 5 + Math.random() * 8,
                    alpha: 1,
                    type: 'trail'
                });
            }

            // Check if hit ground
            if (this.y >= this.targetY) {
                this.falling = false;
                this.exploded = true;
                this.explosionTime = Date.now();

                // Create explosion particles
                for (let i = 0; i < 30; i++) {
                    const angle = (i / 30) * Math.PI * 2;
                    const speed = 3 + Math.random() * 5;
                    this.particles.push({
                        x: this.x,
                        y: this.y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 2,
                        size: 8 + Math.random() * 15,
                        alpha: 1,
                        type: 'explosion'
                    });
                }

                // Screen shake on impact
                ScreenEffects.shake(12, 15);
                ScreenEffects.flash('#ff6600', 0.5);
            }
        } else if (this.exploded) {
            const elapsed = Date.now() - this.explosionTime;
            if (elapsed > this.explosionDuration) {
                this.active = false;
            }
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;  // Gravity
            p.alpha -= 0.03;
            p.size *= 0.97;
            return p.alpha > 0;
        });
    }

    getHitbox() {
        if (this.falling) {
            // Hitbox while falling
            return {
                x: this.x - this.width / 2,
                y: this.y - this.height / 2,
                width: this.width,
                height: this.height
            };
        } else if (this.exploded) {
            // Explosion hitbox (only active briefly)
            const elapsed = Date.now() - this.explosionTime;
            if (elapsed < 100) {  // Only damage in first 100ms
                return {
                    x: this.x - this.radius,
                    y: this.y - this.radius,
                    width: this.radius * 2,
                    height: this.radius * 2
                };
            }
        }
        return null;
    }

    render(ctx) {
        ctx.save();

        // Draw particles
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.type === 'trail' ? '#ffaa00' : this.color;
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        if (this.falling) {
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            // Meteor body
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 30;

            // Main rock
            ctx.fillStyle = '#663300';
            ctx.beginPath();
            ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
            ctx.fill();

            // Hot glow
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(0, 0, this.width / 2 - 5, 0, Math.PI * 2);
            ctx.fill();

            // Inner core
            ctx.fillStyle = '#ffff00';
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(0, 0, this.width / 4, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.exploded) {
            // Explosion ring
            const elapsed = Date.now() - this.explosionTime;
            const progress = elapsed / this.explosionDuration;
            const ringRadius = this.radius * progress * 1.5;

            ctx.globalAlpha = 1 - progress;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 10 * (1 - progress);
            ctx.shadowColor = this.glowColor;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(this.x, this.y, ringRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Impact crater glow
            ctx.fillStyle = this.color;
            ctx.globalAlpha = (1 - progress) * 0.5;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius * (1 - progress * 0.5), this.radius * 0.3 * (1 - progress * 0.5), 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// 武器名表示システム - Weapon Name Announcement
const WeaponAnnouncement = {
    current: null,
    queue: [],

    show(weaponType) {
        const config = WEAPONS.types[weaponType];
        if (!config) return;

        this.current = {
            name: config.name,
            color: config.nameColor || config.color,
            startTime: Date.now(),
            duration: 1500,
            scale: 0
        };
    },

    update() {
        if (!this.current) return;

        const elapsed = Date.now() - this.current.startTime;
        if (elapsed > this.current.duration) {
            this.current = null;
            return;
        }

        // Scale animation
        const progress = elapsed / this.current.duration;
        if (progress < 0.1) {
            this.current.scale = progress / 0.1;
        } else if (progress > 0.8) {
            this.current.scale = (1 - progress) / 0.2;
        } else {
            this.current.scale = 1;
        }
    },

    render(ctx) {
        if (!this.current) return;

        ctx.save();

        const centerX = GAME_WIDTH / 2;
        const centerY = 80;

        ctx.globalAlpha = this.current.scale;
        ctx.translate(centerX, centerY);
        ctx.scale(this.current.scale, this.current.scale);

        // Glow effect
        ctx.shadowColor = this.current.color;
        ctx.shadowBlur = 30;

        // Text outline
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Multiple layers for neon effect
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 8;
        ctx.strokeText(this.current.name, 0, 0);

        ctx.strokeStyle = this.current.color;
        ctx.lineWidth = 4;
        ctx.strokeText(this.current.name, 0, 0);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.current.name, 0, 0);

        // Extra glow pass
        ctx.globalAlpha = this.current.scale * 0.5;
        ctx.shadowBlur = 50;
        ctx.fillText(this.current.name, 0, 0);

        ctx.restore();
    }
};

// ============================================================================
// ITEM CLASS (for Items Mode)
// ============================================================================

class Item {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;  // 'HP', 'RAPID', 'MEGA', 'SHIELD'
        this.width = 32;
        this.height = 32;
        this.active = true;
        this.spawnTime = Date.now();
        this.bobOffset = 0;
        this.bobSpeed = 0.003;
        this.glowPhase = 0;
    }

    update() {
        // Lifetime check
        if (Date.now() - this.spawnTime > ITEMS.itemLifetime) {
            this.active = false;
            return;
        }

        // Bobbing animation
        this.bobOffset = Math.sin(Date.now() * this.bobSpeed) * 4;
        this.glowPhase = (Date.now() * 0.005) % (Math.PI * 2);
    }

    render(ctx) {
        const itemConfig = ITEMS.types[this.type];
        const drawY = this.y + this.bobOffset;
        const glowIntensity = 0.5 + Math.sin(this.glowPhase) * 0.3;

        ctx.save();

        // Outer glow
        ctx.shadowColor = itemConfig.glowColor;
        ctx.shadowBlur = 15 + glowIntensity * 10;

        // Item shape based on type
        ctx.fillStyle = itemConfig.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;

        switch(this.type) {
            case 'HP':
                // Heart shape for HP
                this.drawHeart(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'RAPID':
                // Lightning bolt for Rapid
                this.drawLightning(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'MEGA':
                // Star for Mega
                this.drawStar(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4, 5);
                break;
            case 'SHIELD':
                // Shield shape
                this.drawShield(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            // V4 Weapon Items
            case 'W_BAZOOKA':
                this.drawBazooka(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_MACHINEGUN':
                this.drawMachinegun(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_SPREAD':
                this.drawSpread(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_SWORD':
                this.drawSword(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            // V4 New Weapon Items
            case 'W_HOMING':
                this.drawHomingMissile(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_CLONE':
                this.drawShadowClone(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_TIGER':
                this.drawTiger(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_AERIAL':
                this.drawAerialBomb(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_DRAGON':
                this.drawDragon(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_METEOR':
                this.drawMeteor(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
            case 'W_BEAST':
                this.drawBeast(ctx, this.x + this.width/2, drawY + this.height/2, this.width * 0.4);
                break;
        }

        // Label below item (display weapon name without W_ prefix)
        ctx.shadowBlur = 0;
        ctx.font = 'bold 10px Courier New';
        ctx.fillStyle = itemConfig.color;
        ctx.textAlign = 'center';
        const displayName = this.type.startsWith('W_') ? this.type.substring(2) : this.type;
        ctx.fillText(displayName, this.x + this.width/2, drawY + this.height + 12);

        ctx.restore();
    }

    drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y - size * 0.3, x - size, y - size * 0.3, x - size, y + size * 0.1);
        ctx.bezierCurveTo(x - size, y + size * 0.6, x, y + size, x, y + size);
        ctx.bezierCurveTo(x, y + size, x + size, y + size * 0.6, x + size, y + size * 0.1);
        ctx.bezierCurveTo(x + size, y - size * 0.3, x, y - size * 0.3, x, y + size * 0.3);
        ctx.fill();
        ctx.stroke();
    }

    drawLightning(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x - size * 0.1, y - size);
        ctx.lineTo(x + size * 0.5, y - size);
        ctx.lineTo(x + size * 0.1, y - size * 0.1);
        ctx.lineTo(x + size * 0.6, y - size * 0.1);
        ctx.lineTo(x - size * 0.3, y + size);
        ctx.lineTo(x, y + size * 0.1);
        ctx.lineTo(x - size * 0.5, y + size * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawStar(ctx, x, y, size, points) {
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? size : size * 0.4;
            const angle = (i * Math.PI) / points - Math.PI / 2;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawShield(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y - size * 0.5);
        ctx.lineTo(x + size, y + size * 0.3);
        ctx.quadraticCurveTo(x, y + size * 1.2, x, y + size * 1.2);
        ctx.quadraticCurveTo(x, y + size * 1.2, x - size, y + size * 0.3);
        ctx.lineTo(x - size, y - size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // V4: Weapon item drawing methods
    drawBazooka(ctx, x, y, size) {
        // Rocket/missile shape
        ctx.beginPath();
        // Body
        ctx.moveTo(x - size, y);
        ctx.lineTo(x - size * 0.3, y - size * 0.4);
        ctx.lineTo(x + size * 0.8, y - size * 0.3);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size * 0.8, y + size * 0.3);
        ctx.lineTo(x - size * 0.3, y + size * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Fins
        ctx.beginPath();
        ctx.moveTo(x - size * 0.8, y - size * 0.4);
        ctx.lineTo(x - size, y - size * 0.8);
        ctx.lineTo(x - size * 0.5, y - size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x - size * 0.8, y + size * 0.4);
        ctx.lineTo(x - size, y + size * 0.8);
        ctx.lineTo(x - size * 0.5, y + size * 0.3);
        ctx.closePath();
        ctx.fill();
    }

    drawMachinegun(ctx, x, y, size) {
        // Gun with multiple barrels
        ctx.beginPath();
        // Main body
        ctx.fillRect(x - size * 0.8, y - size * 0.5, size * 1.2, size * 0.4);
        ctx.fillRect(x - size * 0.8, y + size * 0.1, size * 1.2, size * 0.4);
        // Barrels
        ctx.fillRect(x + size * 0.4, y - size * 0.4, size * 0.6, size * 0.2);
        ctx.fillRect(x + size * 0.4, y + size * 0.2, size * 0.6, size * 0.2);
        // Handle
        ctx.fillRect(x - size * 0.4, y - size * 0.1, size * 0.3, size * 0.2);
        ctx.stroke();
    }

    drawSpread(ctx, x, y, size) {
        // Three diamond shapes in a fan pattern
        const drawDiamond = (cx, cy, s) => {
            ctx.beginPath();
            ctx.moveTo(cx, cy - s);
            ctx.lineTo(cx + s, cy);
            ctx.lineTo(cx, cy + s);
            ctx.lineTo(cx - s, cy);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        };
        // Center
        drawDiamond(x, y, size * 0.4);
        // Top
        drawDiamond(x, y - size * 0.7, size * 0.3);
        // Bottom
        drawDiamond(x, y + size * 0.7, size * 0.3);
    }

    drawSword(ctx, x, y, size) {
        // Sword shape
        ctx.beginPath();
        // Blade
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size * 0.2, y - size * 0.3);
        ctx.lineTo(x + size * 0.2, y + size * 0.2);
        ctx.lineTo(x - size * 0.2, y + size * 0.2);
        ctx.lineTo(x - size * 0.2, y - size * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Guard
        ctx.fillRect(x - size * 0.5, y + size * 0.2, size, size * 0.15);
        // Handle
        ctx.fillRect(x - size * 0.1, y + size * 0.35, size * 0.2, size * 0.5);
        ctx.stroke();
    }

    // V4 New Weapon Item Icons
    drawHomingMissile(ctx, x, y, size) {
        // Missile shape with fins
        ctx.beginPath();
        // Body
        ctx.moveTo(x + size, y);
        ctx.lineTo(x + size * 0.3, y - size * 0.25);
        ctx.lineTo(x - size * 0.6, y - size * 0.2);
        ctx.lineTo(x - size, y);
        ctx.lineTo(x - size * 0.6, y + size * 0.2);
        ctx.lineTo(x + size * 0.3, y + size * 0.25);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Fins
        ctx.beginPath();
        ctx.moveTo(x - size * 0.6, y - size * 0.2);
        ctx.lineTo(x - size * 0.8, y - size * 0.6);
        ctx.lineTo(x - size * 0.4, y - size * 0.2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x - size * 0.6, y + size * 0.2);
        ctx.lineTo(x - size * 0.8, y + size * 0.6);
        ctx.lineTo(x - size * 0.4, y + size * 0.2);
        ctx.fill();
        // Target circle
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(x + size * 0.5, y, size * 0.2, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawShadowClone(ctx, x, y, size) {
        // Multiple overlapping ghost figures
        const drawGhost = (cx, cy, alpha) => {
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            // Head
            ctx.arc(cx, cy - size * 0.3, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            // Body
            ctx.fillRect(cx - size * 0.3, cy, size * 0.6, size * 0.5);
        };
        // Shadow clones (back to front)
        drawGhost(x - size * 0.4, y, 0.3);
        drawGhost(x + size * 0.4, y, 0.3);
        drawGhost(x, y, 0.8);
        ctx.globalAlpha = 1;
        ctx.stroke();
    }

    drawTiger(ctx, x, y, size) {
        // Tiger face shape
        ctx.beginPath();
        // Face circle
        ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Ears
        ctx.beginPath();
        ctx.moveTo(x - size * 0.5, y - size * 0.4);
        ctx.lineTo(x - size * 0.7, y - size * 0.9);
        ctx.lineTo(x - size * 0.2, y - size * 0.5);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + size * 0.5, y - size * 0.4);
        ctx.lineTo(x + size * 0.7, y - size * 0.9);
        ctx.lineTo(x + size * 0.2, y - size * 0.5);
        ctx.fill();
        // Stripes (dark)
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - size * 0.3, y - size * 0.3);
        ctx.lineTo(x - size * 0.1, y - size * 0.1);
        ctx.moveTo(x + size * 0.3, y - size * 0.3);
        ctx.lineTo(x + size * 0.1, y - size * 0.1);
        ctx.moveTo(x, y - size * 0.5);
        ctx.lineTo(x, y - size * 0.2);
        ctx.stroke();
        // Eyes
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x - size * 0.2, y, size * 0.1, 0, Math.PI * 2);
        ctx.arc(x + size * 0.2, y, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    drawAerialBomb(ctx, x, y, size) {
        // Bomb shape falling
        ctx.beginPath();
        // Bomb body (oval)
        ctx.ellipse(x, y, size * 0.4, size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Fins at top
        ctx.beginPath();
        ctx.moveTo(x - size * 0.15, y - size * 0.5);
        ctx.lineTo(x - size * 0.5, y - size * 0.9);
        ctx.lineTo(x - size * 0.15, y - size * 0.7);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + size * 0.15, y - size * 0.5);
        ctx.lineTo(x + size * 0.5, y - size * 0.9);
        ctx.lineTo(x + size * 0.15, y - size * 0.7);
        ctx.fill();
        // Down arrow
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.7);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size * 0.2, y + size * 0.8);
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + size * 0.2, y + size * 0.8);
        ctx.stroke();
    }

    // V4.3: Dragon icon for W_DRAGON item
    drawDragon(ctx, x, y, size) {
        // Dragon head silhouette
        ctx.fillStyle = '#00ff66';
        ctx.strokeStyle = '#00cc55';
        ctx.lineWidth = 2;

        // Body/head
        ctx.beginPath();
        ctx.ellipse(x, y, size * 0.6, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Snout
        ctx.beginPath();
        ctx.moveTo(x + size * 0.5, y);
        ctx.lineTo(x + size, y - size * 0.1);
        ctx.lineTo(x + size, y + size * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(x + size * 0.2, y - size * 0.1, size * 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Horns
        ctx.strokeStyle = '#00ff66';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - size * 0.2, y - size * 0.3);
        ctx.lineTo(x - size * 0.4, y - size * 0.7);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + size * 0.1, y - size * 0.35);
        ctx.lineTo(x, y - size * 0.75);
        ctx.stroke();
    }

    // V4.3: Meteor icon for W_METEOR item
    drawMeteor(ctx, x, y, size) {
        // Meteor rock
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, '#ffaa00');
        gradient.addColorStop(0.5, '#ff6600');
        gradient.addColorStop(1, '#cc3300');
        ctx.fillStyle = gradient;

        // Irregular rock shape
        ctx.beginPath();
        ctx.moveTo(x + size * 0.8, y);
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const r = size * (0.6 + Math.sin(i * 2.3) * 0.2);
            ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();

        // Crater spots
        ctx.fillStyle = '#993300';
        ctx.beginPath();
        ctx.arc(x - size * 0.2, y - size * 0.1, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 0.25, y + size * 0.15, size * 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Flame trail
        ctx.strokeStyle = '#ff6600';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - size * 0.5, y - size * 0.3);
        ctx.quadraticCurveTo(x - size * 0.8, y, x - size, y + size * 0.2);
        ctx.stroke();
        ctx.strokeStyle = '#ffaa00';
        ctx.beginPath();
        ctx.moveTo(x - size * 0.4, y + size * 0.2);
        ctx.quadraticCurveTo(x - size * 0.7, y + size * 0.3, x - size * 0.9, y + size * 0.5);
        ctx.stroke();
    }

    // V4.3: Beast summon item icon
    drawBeast(ctx, x, y, size) {
        // Beast body (demon-like creature)
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, '#ff66ff');
        gradient.addColorStop(0.5, '#ff33ff');
        gradient.addColorStop(1, '#cc00cc');
        ctx.fillStyle = gradient;

        // Body shape
        ctx.beginPath();
        ctx.ellipse(x, y, size * 0.8, size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Horns
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.moveTo(x - size * 0.4, y - size * 0.3);
        ctx.lineTo(x - size * 0.6, y - size * 0.8);
        ctx.lineTo(x - size * 0.2, y - size * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + size * 0.4, y - size * 0.3);
        ctx.lineTo(x + size * 0.6, y - size * 0.8);
        ctx.lineTo(x + size * 0.2, y - size * 0.4);
        ctx.closePath();
        ctx.fill();

        // Eyes (glowing)
        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x - size * 0.25, y - size * 0.1, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 0.25, y - size * 0.1, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Flame breath effect
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.moveTo(x + size * 0.5, y + size * 0.1);
        ctx.lineTo(x + size * 1.0, y);
        ctx.lineTo(x + size * 0.5, y + size * 0.3);
        ctx.closePath();
        ctx.fill();
    }
}

// ============================================================================
// EFFECT CLASS
// ============================================================================

class Effect {
    constructor(x, y, type, options = {}) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.frame = 0;
        this.active = true;

        // V4.1: Enhanced effect options for item weapon hits
        this.isItemHit = options.isItemHit || false;
        this.color = options.color || '#ffffff';
        this.size = options.size || (this.isItemHit ? 64 : 32);
        this.maxFrames = options.maxFrames || (this.isItemHit ? 20 : 10);
        this.particles = [];

        // Create particles for item hits
        if (this.isItemHit) {
            const particleCount = options.particleCount || 12;
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 / particleCount) * i + Math.random() * 0.3;
                const speed = 3 + Math.random() * 4;
                this.particles.push({
                    x: 0,
                    y: 0,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: 4 + Math.random() * 6,
                    alpha: 1
                });
            }
        }

        this.sprite = svgToImage(SPRITES.effectHit);
    }

    update() {
        this.frame++;
        if (this.frame >= this.maxFrames) {
            this.active = false;
        }

        // Update particles
        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2;  // Gravity
            p.alpha = Math.max(0, 1 - (this.frame / this.maxFrames));
        }
    }

    render(ctx) {
        const progress = this.frame / this.maxFrames;
        const alpha = 1 - progress;

        ctx.save();

        if (this.isItemHit) {
            // V4.1: Big dramatic effect for item weapon hits
            // Central burst
            const burstScale = 1 + progress * 2;
            const burstSize = this.size * burstScale;

            // Outer glow
            ctx.globalAlpha = alpha * 0.5;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(this.x, this.y, burstSize * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Inner flash
            ctx.globalAlpha = alpha * 0.8;
            ctx.shadowBlur = 15;
            const innerSize = burstSize * (0.4 - progress * 0.2);
            ctx.beginPath();
            ctx.arc(this.x, this.y, innerSize, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Explosion ring
            ctx.globalAlpha = alpha * 0.6;
            ctx.shadowBlur = 0;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 4 - progress * 3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, burstSize * 0.8, 0, Math.PI * 2);
            ctx.stroke();

            // Particles
            ctx.shadowBlur = 5;
            for (const p of this.particles) {
                ctx.globalAlpha = p.alpha * 0.8;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x + p.x, this.y + p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
                ctx.fill();
            }

            // Impact lines
            ctx.globalAlpha = alpha * 0.7;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 / 8) * i;
                const innerR = burstSize * 0.3 * progress;
                const outerR = burstSize * (0.6 + progress * 0.4);
                ctx.beginPath();
                ctx.moveTo(this.x + Math.cos(angle) * innerR, this.y + Math.sin(angle) * innerR);
                ctx.lineTo(this.x + Math.cos(angle) * outerR, this.y + Math.sin(angle) * outerR);
                ctx.stroke();
            }
        } else {
            // Standard hit effect
            const scale = 1 + progress * 0.5;
            const size = this.size * scale;
            ctx.globalAlpha = alpha;
            ctx.drawImage(this.sprite, this.x - size/2, this.y - size/2, size, size);
        }

        ctx.restore();
    }
}

// ============================================================================
// AI CLASS
// ============================================================================

class EnemyAI {
    constructor(robot) {
        this.robot = robot;
        this.difficulty = 'normal';
        this.thinkTimer = 0;
        this.thinkInterval = 250; // ms
        this.currentAction = 'idle';
        // V4.4: Item pursuit and beast targeting
        this.targetItem = null;
        this.targetBeast = null;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        switch (difficulty) {
            case 'easy':
                this.thinkInterval = 500;
                break;
            case 'normal':
                this.thinkInterval = 250;
                break;
            case 'hard':
                this.thinkInterval = 100;
                break;
        }
    }

    update(deltaTime, player, beams, weaponProjectiles = [], activeBeasts = [], activeItems = []) {
        // V4.3: Skip AI if knocked down
        if (!this.robot.canAct()) {
            this.currentAction = 'idle';
            this.robot.velocityX = 0;
            this.robot.isCharging = false;
            this.robot.isGuarding = false;
            return;
        }

        // ALWAYS face the player (every frame, not just during decisions)
        // This gives consistent fighting game behavior
        this.robot.facingRight = player.x > this.robot.x;

        this.thinkTimer += deltaTime;

        if (this.thinkTimer >= this.thinkInterval) {
            this.thinkTimer = 0;
            this.decide(player, beams, activeBeasts, activeItems);
        }

        this.executeAction(player, beams, weaponProjectiles, activeBeasts);
    }

    decide(player, beams, activeBeasts = [], activeItems = []) {
        const dist = Math.abs(player.x - this.robot.x);
        const heightDiff = player.y - this.robot.y;

        // V4.4: Priority 1 - Check for enemy beasts attacking this robot
        const enemyBeast = activeBeasts.find(b =>
            b.active &&
            b.owner === 'player' &&  // Beast owned by player attacks enemy robot
            Math.abs(b.x - this.robot.x) < 200 &&
            Math.abs(b.y - this.robot.y) < 100
        );

        if (enemyBeast) {
            this.targetBeast = enemyBeast;
            this.currentAction = 'attack_beast';
            return;
        } else {
            this.targetBeast = null;
        }

        // V4.4: Priority 2 - Check for nearby items and pursue them
        // Only pursue if no weapon equipped or it's a healing item
        const nearbyItem = activeItems.find(item => {
            if (!item || !item.active) return false;
            const itemDist = Math.abs(item.x - this.robot.x);
            // Prioritize items within reasonable range (400px)
            return itemDist < 400;
        });

        if (nearbyItem) {
            // Sort items by distance and prioritize
            const sortedItems = activeItems
                .filter(item => item && item.active)
                .sort((a, b) => {
                    const distA = Math.abs(a.x - this.robot.x);
                    const distB = Math.abs(b.x - this.robot.x);
                    return distA - distB;
                });

            if (sortedItems.length > 0) {
                this.targetItem = sortedItems[0];
                this.currentAction = 'get_item';
                return;
            }
        }
        this.targetItem = null;

        // Check for incoming beams
        const incomingBeam = beams.find(b =>
            b.owner === 'player' &&
            Math.abs(b.y - this.robot.y) < 50 &&
            ((b.direction > 0 && b.x < this.robot.x) || (b.direction < 0 && b.x > this.robot.x))
        );

        if (incomingBeam && Math.abs(incomingBeam.x - this.robot.x) < 200) {
            // Evade
            this.currentAction = Math.random() < 0.7 ? 'jump' : 'evade';
            return;
        }

        // Close range
        if (dist < 60) {
            const actions = ['kick', 'jump_away', 'shoot'];
            const weights = this.difficulty === 'hard' ? [0.5, 0.3, 0.2] : [0.3, 0.4, 0.3];
            this.currentAction = this.weightedRandom(actions, weights);
            return;
        }

        // Medium range
        if (dist < 300) {
            if (heightDiff < -50) {
                this.currentAction = 'jump';
            } else {
                const actions = ['shoot', 'approach', 'idle'];
                const weights = this.difficulty === 'hard' ? [0.6, 0.3, 0.1] : [0.4, 0.4, 0.2];
                this.currentAction = this.weightedRandom(actions, weights);
            }
            return;
        }

        // Long range
        this.currentAction = 'approach';
    }

    weightedRandom(items, weights) {
        const total = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * total;
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) return items[i];
        }
        return items[items.length - 1];
    }

    executeAction(player, beams, weaponProjectiles = [], activeBeasts = []) {
        // V4.4: Immediately use weapon after pickup
        if (this.robot.equippedWeapon && this.robot.equippedWeapon.type) {
            // Fire weapon immediately when equipped (aggressive AI)
            this.robot.fireWeapon(weaponProjectiles, activeBeasts, player);
        }

        switch (this.currentAction) {
            case 'approach':
                const dir = player.x > this.robot.x ? 1 : -1;
                this.robot.move(dir);
                break;

            case 'shoot':
                this.robot.shoot(beams);
                // V4.2: CPU also fires equipped weapon alongside default beam
                if (this.robot.equippedWeapon && this.robot.equippedWeapon.type) {
                    // V4.3: Pass activeBeasts and target for beast summon
                    this.robot.fireWeapon(weaponProjectiles, activeBeasts, player);
                }
                break;

            case 'kick':
                // Will be handled by game logic
                break;

            case 'jump':
                this.robot.jump();
                break;

            case 'jump_away':
                this.robot.jump();
                const awayDir = player.x > this.robot.x ? -1 : 1;
                this.robot.move(awayDir);
                break;

            case 'evade':
                const evadeDir = player.x > this.robot.x ? -1 : 1;
                this.robot.move(evadeDir);
                break;

            // V4.4: Get item action - move toward target item
            case 'get_item':
                if (this.targetItem && this.targetItem.active) {
                    const itemDir = this.targetItem.x > this.robot.x ? 1 : -1;
                    this.robot.move(itemDir);
                    // Jump if item is above
                    if (this.targetItem.y < this.robot.y - 30) {
                        this.robot.jump();
                    }
                } else {
                    this.robot.move(0);
                }
                break;

            // V4.4: Attack beast action - shoot at enemy beast
            case 'attack_beast':
                if (this.targetBeast && this.targetBeast.active) {
                    // Face the beast
                    this.robot.facingRight = this.targetBeast.x > this.robot.x;
                    // Shoot at beast
                    this.robot.shoot(beams);
                    // Also fire weapon if available
                    if (this.robot.equippedWeapon && this.robot.equippedWeapon.type) {
                        this.robot.fireWeapon(weaponProjectiles, activeBeasts, player);
                    }
                    // Keep some distance from beast
                    const beastDist = Math.abs(this.targetBeast.x - this.robot.x);
                    if (beastDist < 80) {
                        // Too close, back away
                        const backDir = this.targetBeast.x > this.robot.x ? -1 : 1;
                        this.robot.move(backDir);
                    } else if (beastDist > 150) {
                        // Too far, approach a bit
                        const approachDir = this.targetBeast.x > this.robot.x ? 1 : -1;
                        this.robot.move(approachDir);
                    }
                } else {
                    this.robot.move(0);
                }
                break;

            case 'idle':
            default:
                this.robot.move(0);
                break;
        }
    }
}

// ============================================================================
// INPUT SYSTEM (Simplified for Mobile)
// ============================================================================

class InputSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.isMobileDevice = isMobile();

        // Keyboard state
        this.keys = {};
        this.prevKeys = {};  // Previous frame's key state

        // Shoot button state tracking (for charge beam)
        this.shootState = {
            held: false,
            justPressed: false,
            justReleased: false
        };

        // Jump button state tracking (for edge detection)
        this.jumpState = {
            held: false,
            justPressed: false,
            justReleased: false
        };

        // Mobile touch state (zone-based with multi-touch tracking)
        this.touchActions = {
            shoot: false,
            jump: false,
            guard: false  // V4.2: Guard action
        };
        this.prevTouchShoot = false;  // Previous frame's touch state

        // Multi-touch tracking: Map of touchId → 'beam' or 'jump' or 'guard'
        // This allows tracking which finger is doing which action
        this.activeTouches = new Map();

        // Gyro state
        this.gyro = {
            enabled: false,
            permissionGranted: false,
            gamma: 0,
            beta: 0,
            sensitivity: 3.5,
            deadZone: 3,
            maxTilt: 25,
            isLandscape: false
        };

        // Zone guide visibility timer
        this.zoneGuideTimer = 0;
        this.showZoneGuide = false;

        // Reference to game state (will be set by Game class)
        this.gameStateGetter = null;

        this.setupListeners();
    }

    // Allow Game class to provide state getter
    setGameStateGetter(getter) {
        this.gameStateGetter = getter;
    }

    setupListeners() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        if (this.isMobileDevice) {
            this.setupSimplifiedMobileControls();
        }
    }

    setupSimplifiedMobileControls() {
        console.log('[Mobile] Setting up simplified tilt + zone tap controls');

        // Show gyro permission dialog on first touch
        this.setupGyroPermission();

        // Setup zone-based touch controls (left = jump, right = beam)
        this.setupZoneTouchControls();

        // Orientation change detection
        window.addEventListener('orientationchange', () => {
            this.gyro.isLandscape = Math.abs(window.orientation) === 90;
        });
        this.gyro.isLandscape = Math.abs(window.orientation || 0) === 90;
    }

    setupGyroPermission() {
        const permissionDialog = document.getElementById('gyro-permission');
        const enableButton = document.getElementById('btn-enable-gyro');

        if (!permissionDialog || !enableButton) return;

        // Show permission dialog on mobile
        const showPermissionDialog = () => {
            permissionDialog.style.display = 'block';
        };

        enableButton.addEventListener('click', async () => {
            const success = await this.enableGyro();
            permissionDialog.style.display = 'none';

            if (success) {
                console.log('[Gyro] Permission granted, tilt control enabled');
                // Show zone guide briefly
                this.showZoneGuideBriefly();
            } else {
                console.log('[Gyro] Permission denied, game may be difficult to play');
                alert('傾きセンサーが使用できません。ゲームの操作が制限されます。');
            }
        });

        // Show dialog after a short delay
        setTimeout(showPermissionDialog, 500);
    }

    async enableGyro() {
        // iOS 13+ requires permission request via user gesture
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                this.gyro.permissionGranted = (permission === 'granted');
            } catch (e) {
                console.error('[Gyro] Permission request failed:', e);
                return false;
            }
        } else {
            // Android or older iOS - no permission needed
            this.gyro.permissionGranted = true;
        }

        if (this.gyro.permissionGranted) {
            this.gyro.enabled = true;
            window.addEventListener('deviceorientation', (e) => {
                this.gyro.gamma = e.gamma || 0;
                this.gyro.beta = e.beta || 0;
            });
            return true;
        }

        return false;
    }

    setupZoneTouchControls() {
        // Listen for touches on the entire document
        document.addEventListener('touchstart', (e) => {
            this.handleZoneTouch(e, 'start');
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            this.handleZoneTouch(e, 'end');
        }, { passive: false });

        document.addEventListener('touchcancel', (e) => {
            this.handleZoneTouch(e, 'end');
        }, { passive: false });
    }

    handleZoneTouch(e, eventType) {
        // Ignore if touching UI elements
        const target = e.target;
        if (target.tagName === 'BUTTON' || target.closest('#gyro-permission') || target.closest('#loading')) {
            return;
        }

        // Only intercept zone touches during BATTLE or KO states
        // Let other states (TITLE, SETUP, RESULT) handle touches normally via canvas click
        const currentState = this.gameStateGetter ? this.gameStateGetter() : null;
        if (currentState !== GameState.BATTLE && currentState !== GameState.KO) {
            // Don't prevent default - allow canvas click handler to work
            return;
        }

        e.preventDefault();

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const midPointX = screenWidth / 2;
        const midPointY = screenHeight / 2;  // V4.1: Vertical split for left zone

        if (eventType === 'start') {
            for (const touch of e.changedTouches) {
                const x = touch.clientX;
                const y = touch.clientY;
                const touchId = touch.identifier;

                // Create touch feedback effect
                this.createTouchFeedback(touch.clientX, touch.clientY);

                if (x < midPointX) {
                    // V4.2: Left half split vertically (GUARD upper, JUMP lower)
                    if (y < midPointY) {
                        // Left upper = Guard (less frequent)
                        this.activeTouches.set(touchId, 'guard');
                        this.touchActions.guard = true;
                        console.log('[Touch] Left upper zone - GUARD (id:', touchId, ')');
                    } else {
                        // Left lower = Jump (frequent use)
                        this.activeTouches.set(touchId, 'jump');
                        this.touchActions.jump = true;
                        console.log('[Touch] Left lower zone - JUMP (id:', touchId, ')');
                    }
                } else {
                    // Right half = Beam (symmetric with JUMP at bottom)
                    this.activeTouches.set(touchId, 'beam');
                    this.touchActions.shoot = true;
                    console.log('[Touch] Right zone - BEAM (id:', touchId, ')');
                }
            }
        } else if (eventType === 'end') {
            for (const touch of e.changedTouches) {
                const touchId = touch.identifier;
                const action = this.activeTouches.get(touchId);

                if (action) {
                    console.log('[Touch] Released:', action, '(id:', touchId, ')');
                    this.activeTouches.delete(touchId);

                    // Check if any other touches are still active for this action
                    let hasOtherBeamTouch = false;
                    let hasOtherJumpTouch = false;
                    let hasOtherGuardTouch = false;  // V4.2
                    for (const [id, a] of this.activeTouches) {
                        if (a === 'beam') hasOtherBeamTouch = true;
                        if (a === 'jump') hasOtherJumpTouch = true;
                        if (a === 'guard') hasOtherGuardTouch = true;  // V4.2
                    }

                    // Only reset the action if no other touches are active for it
                    if (action === 'beam' && !hasOtherBeamTouch) {
                        // Beam released - this triggers charge beam fire
                        // Set shoot to false after a brief delay to allow detection
                        setTimeout(() => {
                            // Double-check no new beam touches were added
                            let stillHasBeamTouch = false;
                            for (const [id, a] of this.activeTouches) {
                                if (a === 'beam') stillHasBeamTouch = true;
                            }
                            if (!stillHasBeamTouch) {
                                this.touchActions.shoot = false;
                            }
                        }, 50);
                    }

                    if (action === 'jump' && !hasOtherJumpTouch) {
                        setTimeout(() => {
                            let stillHasJumpTouch = false;
                            for (const [id, a] of this.activeTouches) {
                                if (a === 'jump') stillHasJumpTouch = true;
                            }
                            if (!stillHasJumpTouch) {
                                this.touchActions.jump = false;
                            }
                        }, 50);
                    }

                    // V4.2: Handle guard release
                    if (action === 'guard' && !hasOtherGuardTouch) {
                        setTimeout(() => {
                            let stillHasGuardTouch = false;
                            for (const [id, a] of this.activeTouches) {
                                if (a === 'guard') stillHasGuardTouch = true;
                            }
                            if (!stillHasGuardTouch) {
                                this.touchActions.guard = false;
                            }
                        }, 50);
                    }
                }
            }
        }
    }

    createTouchFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.className = 'touch-feedback';
        feedback.style.left = x + 'px';
        feedback.style.top = y + 'px';
        document.body.appendChild(feedback);

        // Remove after animation completes
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }

    showZoneGuideBriefly() {
        const guide = document.getElementById('mobile-zone-guide');
        if (guide) {
            guide.classList.add('visible');
            setTimeout(() => {
                guide.classList.remove('visible');
            }, 3000);
        }
    }

    getGyroInput() {
        if (!this.gyro.enabled || !this.gyro.permissionGranted) {
            return { x: 0, y: 0 };
        }

        // Determine tilt based on orientation
        let tiltX;
        if (this.gyro.isLandscape) {
            // Landscape: use beta for left/right
            tiltX = this.gyro.beta;
        } else {
            // Portrait: use gamma for left/right
            tiltX = this.gyro.gamma;
        }

        // Apply dead zone
        if (Math.abs(tiltX) < this.gyro.deadZone) {
            tiltX = 0;
        }

        // Normalize and apply sensitivity
        const x = clamp(tiltX / this.gyro.maxTilt, -1, 1) * this.gyro.sensitivity;

        return { x, y: 0 };
    }

    // Call this once per frame to update input states
    updateInputStates() {
        let currentShoot = false;
        let currentJump = false;

        if (this.isMobileDevice) {
            currentShoot = this.touchActions.shoot;
            currentJump = this.touchActions.jump;
        } else {
            currentShoot = this.keys['KeyJ'] || this.keys['KeyZ'];
            currentJump = this.keys['KeyW'] || this.keys['ArrowUp'] || this.keys['Space'];
        }

        // Detect state transitions for shoot
        this.shootState.justPressed = currentShoot && !this.shootState.held;
        this.shootState.justReleased = !currentShoot && this.shootState.held;
        this.shootState.held = currentShoot;

        // Detect state transitions for jump
        this.jumpState.justPressed = currentJump && !this.jumpState.held;
        this.jumpState.justReleased = !currentJump && this.jumpState.held;
        this.jumpState.held = currentJump;
    }

    getInput() {
        if (this.isMobileDevice) {
            const movement = this.getGyroInput();

            return {
                moveX: movement.x,
                moveY: 0,
                jump: this.touchActions.jump,
                jumpDown: this.jumpState.justPressed,  // Edge-triggered jump for network
                shoot: this.touchActions.shoot,
                shootDown: this.shootState.justPressed,
                shootUp: this.shootState.justReleased,
                shootHeld: this.shootState.held,
                kick: false,  // Kick disabled on mobile for simplicity
                guard: this.touchActions.guard  // V4.2: Guard from mobile touch
            };
        }

        // Keyboard input
        return {
            moveX: (this.keys['KeyD'] || this.keys['ArrowRight'] ? 1 : 0) -
                   (this.keys['KeyA'] || this.keys['ArrowLeft'] ? 1 : 0),
            moveY: 0,
            jump: this.keys['KeyW'] || this.keys['ArrowUp'] || this.keys['Space'],
            jumpDown: this.jumpState.justPressed,  // Edge-triggered jump for network
            shoot: this.keys['KeyJ'] || this.keys['KeyZ'],
            shootDown: this.shootState.justPressed,
            shootUp: this.shootState.justReleased,
            shootHeld: this.shootState.held,
            kick: this.keys['KeyK'] || this.keys['KeyX'],
            guard: this.keys['KeyS'] || this.keys['ArrowDown']  // V4.2: Guard input
        };
    }
}

// ============================================================================
// UI RENDERER
// ============================================================================

class UIRenderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawHPBar(x, y, width, height, hp, maxHp, color) {
        const ctx = this.ctx;
        const ratio = hp / maxHp;

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, width, height);

        // HP bar
        const gradient = ctx.createLinearGradient(x, y, x + width * ratio, y);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, ratio < 0.3 ? '#ff0000' : color);
        ctx.fillStyle = gradient;
        ctx.fillRect(x + 2, y + 2, (width - 4) * ratio, height - 4);

        // Border
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // HP text
        ctx.fillStyle = '#fff';
        ctx.font = '12px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.ceil(hp)}/${maxHp}`, x + width / 2, y + height - 5);
    }

    drawButton(x, y, width, height, text, isHovered) {
        const ctx = this.ctx;

        // Button background
        ctx.fillStyle = isHovered ? '#0088ff' : '#0066cc';
        ctx.fillRect(x, y, width, height);

        // Highlight
        ctx.fillStyle = isHovered ? '#00aaff' : '#0088ff';
        ctx.fillRect(x + 2, y + 2, width - 4, height / 2 - 2);

        // Border
        ctx.strokeStyle = isHovered ? '#00ffff' : '#00aaff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        // Text
        ctx.fillStyle = '#fff';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + width / 2, y + height / 2);
    }

    drawSlider(x, y, width, height, value, maxValue, label) {
        const ctx = this.ctx;
        const ratio = value / maxValue;

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '14px Courier New';
        ctx.textAlign = 'left';
        ctx.fillText(label, x, y - 5);

        // Value
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), x + width, y - 5);

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y, width, height);

        // Fill
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(x + 2, y + 2, (width - 4) * ratio, height - 4);

        // Border
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
    }

    drawText(x, y, text, size, color, align = 'center') {
        const ctx = this.ctx;
        ctx.fillStyle = color || '#fff';
        ctx.font = `${size}px Courier New`;
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
    }

    drawLogo(x, y) {
        const ctx = this.ctx;

        // ROBO
        ctx.font = 'bold 48px Courier New';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff3333';
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 2;
        ctx.fillText('ROBO', x, y);
        ctx.strokeText('ROBO', x, y);

        // BATTLE
        ctx.font = 'bold 36px Courier New';
        ctx.fillStyle = '#3333ff';
        ctx.strokeStyle = '#00ffff';
        ctx.fillText('BATTLE', x, y + 40);
        ctx.strokeText('BATTLE', x, y + 40);
    }
}

// ============================================================================
// GAME CLASS
// ============================================================================

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.state = GameState.LOADING;
        this.lastTime = 0;
        this.accumulator = 0;

        // Game objects
        this.player = null;
        this.enemy = null;
        this.beams = [];
        this.weaponProjectiles = [];  // V4: Weapon projectiles
        this.activeBeasts = [];       // V4.3: Active beast summons
        this.effects = [];
        this.currentStage = 0;

        // Systems
        this.input = new InputSystem(this.canvas);
        this.input.setGameStateGetter(() => this.state);  // Pass state getter
        this.ui = new UIRenderer(this.ctx);
        this.ai = null;

        // V4: Weapon Announcement System (using global object, not class)
        // WeaponAnnouncement is a global object, accessed directly

        // Settings
        this.settings = {
            playerParams: { jump: 5, walk: 5, beam: 5, kick: 5 },
            difficulty: 'normal',
            stage: 0,
            itemsMode: true,  // V4.2: Items Mode ON by default (warp zones, death zones, items)
            // V4: Enabled items configuration (all ON by default)
            enabledItems: {
                // Powerups
                HP: true,
                RAPID: true,
                MEGA: true,
                SHIELD: true,
                // Original weapons
                W_BAZOOKA: true,
                W_MACHINEGUN: true,
                W_SPREAD: true,
                W_SWORD: true,
                // V4 New weapons
                W_HOMING: true,
                W_CLONE: true,
                W_TIGER: true,
                W_AERIAL: true,
                W_DRAGON: true,     // V4.3: 龍召喚
                W_METEOR: true,     // V4.3: メテオストライク
                W_BEAST: true       // V4.3: 魔獣召喚
            }
        };

        // Items Mode state
        this.activeItems = [];      // Collectible items on stage
        this.itemSpawnTimer = 0;    // Timer for spawning new items

        // UI state
        this.menuSelection = 0;
        this.setupSelection = 0;
        this.itemConfigSelection = 0;  // V4: Item config screen selection
        this.winner = null;
        this.hoveredButton = -1;

        // Input state for menus
        this.inputCooldown = 0;

        // KO演出用
        this.koTimer = 0;
        this.koTarget = null;      // 倒されたロボット
        this.koEffects = [];       // KO演出用エフェクト
        this.koTextScale = 0;      // KO!テキストのスケール

        // Online mode
        this.isOnlineMode = false;
        this.onlineController = null;
        this.roomCode = '';
        this.roomCodeInput = '';
        this.onlineLobbySelection = 0;  // 0=Create, 1=Join, 2=Back
        this.onlineStatus = '';
        this.isHost = false;

        // Online Ready system
        this.myReady = false;           // Am I ready?
        this.opponentReady = false;     // Is opponent ready?
        this.opponentParams = null;     // Opponent's robot parameters
        this.readyCountdown = 0;        // Countdown timer (ms) when one player is ready
        this.readyCountdownStart = 0;   // Timestamp when countdown started
        this.READY_TIMEOUT = 10000;     // 10 seconds timeout

        // Battle countdown (3-2-1-FIGHT)
        this.battleCountdown = 0;       // Countdown before battle starts (seconds)
        this.battleCountdownStart = 0;  // Timestamp when battle countdown started

        // Online Rematch consent system
        this.rematchRequestSent = false;      // Did I send a rematch request?
        this.rematchRequestReceived = false;  // Did opponent send a rematch request?
        this.rematchWaitingResponse = false;  // Am I waiting for opponent's response?
        this.rematchSelection = 0;            // 0 = OK, 1 = 拒否 (for keyboard navigation)

        // Setup mouse click handler
        this.setupMouseHandler();

        // Load resources
        this.loadResources();
    }

    setupMouseHandler() {
        // Click handler (desktop)
        this.canvas.addEventListener('click', (e) => {
            this.processCanvasInput(e.clientX, e.clientY, 'click');
        });

        // Touch handler (mobile) - critical for menu interactions
        this.canvas.addEventListener('touchend', (e) => {
            // Only handle touch for menu states (TITLE, SETUP, RESULT)
            // During BATTLE/KO, the zone touch handler in InputSystem handles touches
            if (this.state === GameState.BATTLE || this.state === GameState.KO) {
                return;
            }

            if (e.changedTouches.length > 0) {
                const touch = e.changedTouches[0];
                this.processCanvasInput(touch.clientX, touch.clientY, 'touch');
                // Prevent click event from also firing (avoid double handling)
                e.preventDefault();
            }
        }, { passive: false });

        // Also handle touchstart to provide immediate feedback
        this.canvas.addEventListener('touchstart', (e) => {
            if (this.state === GameState.BATTLE || this.state === GameState.KO) {
                return;
            }
            // Visual feedback could be added here
            console.log('[Touch] Canvas touchstart in menu state');
        }, { passive: true });
    }

    processCanvasInput(clientX, clientY, inputType) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = GAME_WIDTH / rect.width;
        const scaleY = GAME_HEIGHT / rect.height;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        console.log(`[DEBUG] ${inputType} at game coords: (${x.toFixed(0)}, ${y.toFixed(0)}), state: ${this.state}`);
        this.handleClick(x, y);
    }

    handleClick(x, y) {
        console.log(`[DEBUG] handleClick called. State: "${this.state}", GameState.SETUP: "${GameState.SETUP}"`);
        console.log(`[DEBUG] State comparison: this.state === GameState.SETUP is ${this.state === GameState.SETUP}`);
        switch (this.state) {
            case GameState.TITLE:
                console.log('[DEBUG] Routing to handleTitleClick');
                this.handleTitleClick(x, y);
                break;
            case GameState.SETUP:
                console.log('[DEBUG] Routing to handleSetupClick');
                this.handleSetupClick(x, y);
                break;
            case GameState.RESULT:
                console.log('[DEBUG] Routing to handleResultClick');
                this.handleResultClick(x, y);
                break;
            case GameState.ONLINE_LOBBY:
                this.handleOnlineLobbyClick(x, y);
                break;
            case GameState.ITEM_CONFIG:
                this.handleItemConfigClick(x, y);
                break;
            default:
                console.log(`[DEBUG] Unknown state: ${this.state}`);
        }
    }

    handleTitleClick(x, y) {
        // Menu items: VS CPU, ONLINE BATTLE, HOW TO PLAY, SETTINGS
        const menuItems = 4;
        const startY = 400;
        const itemHeight = 40;

        for (let i = 0; i < menuItems; i++) {
            const itemY = startY + i * itemHeight - 20;
            if (x >= 250 && x <= 550 && y >= itemY && y <= itemY + itemHeight) {
                this.menuSelection = i;
                SoundManager.playMenuSelect();
                // Execute selection
                switch (i) {
                    case 0: // VS CPU
                        this.isOnlineMode = false;
                        this.state = GameState.SETUP;
                        break;
                    case 1: // Online Battle
                        this.isOnlineMode = true;
                        this.state = GameState.ONLINE_LOBBY;
                        this.onlineLobbySelection = 0;
                        break;
                    case 2: // How to Play
                    case 3: // Settings
                        this.isOnlineMode = false;
                        this.state = GameState.SETUP;
                        break;
                }
                return;
            }
        }
    }

    handleSetupClick(x, y) {
        // Parameter sliders (JUMP, WALK, BEAM, KICK)
        const startY = 130;
        for (let i = 0; i < 4; i++) {
            const sliderY = startY + i * 60 - 15;
            // Left arrow area (decrease)
            if (x >= 200 && x <= 280 && y >= sliderY && y <= sliderY + 30) {
                this.setupSelection = i;
                this.adjustSetup(-1);
                return;
            }
            // Slider bar area (click to set value)
            if (x >= 300 && x <= 500 && y >= sliderY && y <= sliderY + 30) {
                this.setupSelection = i;
                return;
            }
            // Right arrow area (increase)
            if (x >= 520 && x <= 600 && y >= sliderY && y <= sliderY + 30) {
                this.setupSelection = i;
                this.adjustSetup(1);
                return;
            }
        }

        // Stage selection
        const stageY = startY + 4 * 60 + 20 - 15;
        if (y >= stageY && y <= stageY + 30) {
            this.setupSelection = 4;
            if (x >= 200 && x <= 350) this.adjustSetup(-1);
            if (x >= 400 && x <= 600) this.adjustSetup(1);
            return;
        }

        // Difficulty selection
        const diffY = stageY + 50;
        if (y >= diffY && y <= diffY + 30) {
            this.setupSelection = 5;
            if (x >= 200 && x <= 350) this.adjustSetup(-1);
            if (x >= 400 && x <= 600) this.adjustSetup(1);
            return;
        }

        // V4.2: Calculate button selections based on Items Mode (must match renderSetup and updateSetup)
        const itemConfigSelectionIdx = 7;  // Only used when Items Mode is ON
        const startButtonSelectionIdx = this.settings.itemsMode ? 8 : 7;
        const backButtonSelectionIdx = this.settings.itemsMode ? 9 : 8;

        // Items Mode toggle Y position
        const itemsY = diffY + 50;

        // Items Mode toggle (simple row click)
        if (y >= itemsY - 15 && y <= itemsY + 25) {  // Items Mode row only
            this.setupSelection = 6;
            this.adjustSetup(1);
            return;
        }

        // V4.2: ITEM CONFIG button - positioned BELOW Items Mode toggle (separated to avoid tap conflicts)
        if (this.settings.itemsMode) {
            const configBtnWidth = 180;
            const configBtnHeight = 32;
            const configBtnX = GAME_WIDTH / 2 - configBtnWidth / 2;  // Centered
            const configBtnY = itemsY + 35;  // Below Items Mode toggle with clear separation

            if (x >= configBtnX && x <= configBtnX + configBtnWidth &&
                y >= configBtnY && y <= configBtnY + configBtnHeight) {
                console.log('[DEBUG] ITEM CONFIG clicked!');
                SoundManager.playMenuSelect();
                this.setupSelection = itemConfigSelectionIdx;
                this.itemConfigSelection = 0;
                this.state = GameState.ITEM_CONFIG;
                return;
            }
        }

        // Button positions (must match renderSetup)
        const btnY = GAME_HEIGHT - 50;       // Updated to match render
        const btnHeight = 50;

        // BACK button
        const backBtnX = GAME_WIDTH / 2 - 220;  // 180
        const backBtnWidth = 100;

        if (x >= backBtnX && x <= backBtnX + backBtnWidth && y >= btnY && y <= btnY + btnHeight) {
            console.log('[DEBUG] BACK clicked! Returning to title');
            SoundManager.playMenuSelect();
            this.setupSelection = backButtonSelectionIdx;
            // Reset ready state when leaving
            this.myReady = false;
            this.opponentReady = false;
            this.opponentParams = null;
            this.readyCountdownStart = 0;
            this.state = GameState.TITLE;
            this.menuSelection = 0;
            SoundManager.playBGM('title');
            return;
        }

        // START BATTLE / READY button
        const startBtnX = GAME_WIDTH / 2 - 100;  // 300
        const startBtnWidth = 200;

        console.log(`[DEBUG] START/READY button area: x=${startBtnX}-${startBtnX+startBtnWidth}, y=${btnY}-${btnY+btnHeight}`);
        console.log(`[DEBUG] Click position: x=${x.toFixed(0)}, y=${y.toFixed(0)}`);
        console.log(`[DEBUG] In button? x: ${x >= startBtnX && x <= startBtnX + startBtnWidth}, y: ${y >= btnY && y <= btnY + btnHeight}`);

        if (x >= startBtnX && x <= startBtnX + startBtnWidth && y >= btnY && y <= btnY + btnHeight) {
            this.setupSelection = startButtonSelectionIdx;

            if (this.isOnlineMode) {
                // Online mode: Handle Ready button
                if (!this.myReady) {
                    console.log('[DEBUG] READY clicked!');
                    SoundManager.playMenuSelect();
                    this.myReady = true;
                    console.log('[Online] I am ready! Sending params:', this.settings.playerParams);
                    this.onlineController.sendReady(this.settings.playerParams);

                    // If opponent is already ready, start battle (host only)
                    if (this.opponentReady && this.isHost) {
                        console.log('[Online] Both ready - starting battle!');
                        this.startOnlineBattle();
                    }
                    // If opponent is not ready, start countdown
                    else if (!this.opponentReady && this.readyCountdownStart === 0) {
                        this.readyCountdownStart = Date.now();
                        console.log('[Online] I am ready first - starting 10s countdown');
                    }
                }
            } else {
                // Offline mode: Start battle directly
                console.log('[DEBUG] START BATTLE clicked! Calling startBattle()');
                SoundManager.playMenuSelect();
                this.startBattle();
            }
            return;
        }
        console.log('[DEBUG] Click not on any interactive element');
    }

    // V4: Item Config Screen click handler
    handleItemConfigClick(x, y) {
        const itemKeys = Object.keys(this.settings.enabledItems);
        const totalItems = itemKeys.length;  // 14 items
        const startY = 100;
        const rowHeight = 38;
        const leftX = 180;
        const rightX = 480;
        const btnY = GAME_HEIGHT - 70;

        // Check left column items (0-6)
        for (let i = 0; i < 7 && i < itemKeys.length; i++) {
            const itemY = startY + i * rowHeight;
            if (x >= leftX - 10 && x <= leftX + 250 && y >= itemY - 12 && y <= itemY + 20) {
                this.itemConfigSelection = i;
                const key = itemKeys[i];
                this.settings.enabledItems[key] = !this.settings.enabledItems[key];
                SoundManager.playMenuSelect();
                return;
            }
        }

        // Check right column items (7-13)
        for (let i = 0; i < 7 && i + 7 < itemKeys.length; i++) {
            const itemY = startY + i * rowHeight;
            if (x >= rightX - 10 && x <= rightX + 250 && y >= itemY - 12 && y <= itemY + 20) {
                this.itemConfigSelection = 7 + i;
                const key = itemKeys[7 + i];
                this.settings.enabledItems[key] = !this.settings.enabledItems[key];
                SoundManager.playMenuSelect();
                return;
            }
        }

        // V4.2: Button layout - centered (same as render)
        const btnWidth = 90;
        const btnGap = 20;
        const totalBtnWidth = btnWidth * 3 + btnGap * 2;
        const btnStartX = (GAME_WIDTH - totalBtnWidth) / 2;

        // ALL ON button
        if (x >= btnStartX && x <= btnStartX + btnWidth && y >= btnY && y <= btnY + 40) {
            this.itemConfigSelection = totalItems;
            for (const key of itemKeys) {
                this.settings.enabledItems[key] = true;
            }
            SoundManager.playMenuSelect();
            return;
        }

        // ALL OFF button
        if (x >= btnStartX + btnWidth + btnGap && x <= btnStartX + btnWidth * 2 + btnGap && y >= btnY && y <= btnY + 40) {
            this.itemConfigSelection = totalItems + 1;
            for (const key of itemKeys) {
                this.settings.enabledItems[key] = false;
            }
            SoundManager.playMenuSelect();
            return;
        }

        // BACK button
        if (x >= btnStartX + (btnWidth + btnGap) * 2 && x <= btnStartX + btnWidth * 3 + btnGap * 2 && y >= btnY && y <= btnY + 40) {
            this.itemConfigSelection = totalItems + 2;
            SoundManager.playMenuSelect();
            this.state = GameState.SETUP;
            return;
        }
    }

    handleResultClick(x, y) {
        // Online mode with rematch request received - handle accept/reject buttons
        if (this.isOnlineMode && this.rematchRequestReceived && !this.rematchRequestSent) {
            // Accept button area (left side)
            if (x >= 200 && x <= 350 && y >= 510 && y <= 560) {
                console.log('[Online] Accepting rematch request');
                SoundManager.playMenuSelect();
                if (this.onlineController) {
                    this.onlineController.sendRematchAccept();
                }
                this.goToRematchSetup();
                return;
            }
            // Reject button area (right side)
            if (x >= 450 && x <= 600 && y >= 510 && y <= 560) {
                console.log('[Online] Rejecting rematch request');
                SoundManager.playMenuSelect();
                if (this.onlineController) {
                    this.onlineController.sendRematchReject();
                }
                // Return to title
                this.rematchRequestReceived = false;
                this.rematchRequestSent = false;
                this.rematchWaitingResponse = false;
                this.state = GameState.TITLE;
                this.menuSelection = 0;
                SoundManager.playBGM('title');
                return;
            }
            return; // Ignore other clicks while showing accept/reject
        }

        // If waiting for response, only allow TITLE button
        if (this.isOnlineMode && this.rematchWaitingResponse && !this.rematchRequestReceived) {
            // TITLE button area (same position as in rendering)
            const titleY = 550;
            if (x >= 250 && x <= 550 && y >= titleY - 20 && y <= titleY + 20) {
                console.log('[Online] Cancelling rematch wait - going to TITLE');
                SoundManager.playMenuSelect();
                // Notify opponent we're leaving
                if (this.onlineController) {
                    this.onlineController.sendRematchReject();
                }
                this.rematchRequestSent = false;
                this.rematchRequestReceived = false;
                this.rematchWaitingResponse = false;
                this.state = GameState.TITLE;
                this.menuSelection = 0;
                SoundManager.playBGM('title');
            }
            return;
        }

        // Menu items: REMATCH, CHANGE SETTINGS, TITLE
        const menuItems = 3;
        const startY = 430;
        const itemHeight = 40;

        for (let i = 0; i < menuItems; i++) {
            const itemY = startY + i * itemHeight - 20;
            if (x >= 250 && x <= 550 && y >= itemY && y <= itemY + itemHeight) {
                this.menuSelection = i;
                SoundManager.playMenuSelect();
                switch (i) {
                    case 0: // Rematch
                        if (this.isOnlineMode) {
                            // Online mode: Send rematch request and wait for response
                            console.log('[Online] REMATCH clicked - sending rematch request');
                            this.rematchRequestSent = true;
                            this.rematchWaitingResponse = true;
                            if (this.onlineController) {
                                this.onlineController.sendRematchRequest();
                            }
                            // Check if opponent already sent request (mutual rematch)
                            if (this.rematchRequestReceived) {
                                console.log('[Online] Both want rematch - going to SETUP');
                                this.goToRematchSetup();
                            }
                        } else {
                            // Offline mode: Start immediately
                            this.startBattle();
                        }
                        break;
                    case 1: // Change Settings
                        this.myReady = false;
                        this.opponentReady = false;
                        this.opponentParams = null;
                        this.readyCountdownStart = 0;
                        this.rematchRequestSent = false;
                        this.rematchRequestReceived = false;
                        this.rematchWaitingResponse = false;
                        // V4.4: Reset setup screen state for proper interaction
                        this.setupSelection = 0;
                        this.inputCooldown = 0;
                        this.state = GameState.SETUP;
                        SoundManager.playBGM('title');
                        break;
                    case 2: // Title
                        // If in online mode, notify opponent we're leaving
                        if (this.isOnlineMode && this.rematchRequestReceived) {
                            if (this.onlineController) {
                                this.onlineController.sendRematchReject();
                            }
                        }
                        this.rematchRequestSent = false;
                        this.rematchRequestReceived = false;
                        this.rematchWaitingResponse = false;
                        this.state = GameState.TITLE;
                        this.menuSelection = 0;
                        SoundManager.playBGM('title');
                        break;
                }
                return;
            }
        }
    }

    // Go to setup screen for rematch (resets ready states)
    goToRematchSetup() {
        this.myReady = false;
        this.opponentReady = false;
        this.opponentParams = null;
        this.readyCountdownStart = 0;
        this.rematchRequestSent = false;
        this.rematchRequestReceived = false;
        this.rematchWaitingResponse = false;
        this.rematchSelection = 0;
        // V4.4: Reset setup screen state for proper interaction
        this.setupSelection = 0;
        this.inputCooldown = 0;
        this.state = GameState.SETUP;
        console.log('[Online] Going to SETUP for rematch');
    }

    async loadResources() {
        // Simulate loading
        const loadingProgress = document.getElementById('loading-progress');

        // Load high-quality sprites (parallel with progress bar)
        console.log('🎨 Loading high-quality sprites...');
        const spriteLoadPromise = SpriteLoader.loadAll();

        for (let i = 0; i <= 80; i += 10) {
            loadingProgress.style.width = i + '%';
            await new Promise(r => setTimeout(r, 50));
        }

        // Wait for sprites to finish loading
        await spriteLoadPromise;
        loadingProgress.style.width = '100%';
        await new Promise(r => setTimeout(r, 100));

        // Hide loading screen
        document.getElementById('loading').style.display = 'none';

        // Resize canvas for mobile (including orientation changes)
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('orientationchange', () => {
            // Delay to allow browser to complete rotation
            setTimeout(() => this.resizeCanvas(), 100);
        });

        // Start game
        this.state = GameState.TITLE;
        // Start title BGM (will only play after user interaction)
        SoundManager.playBGM('title');
        this.start();
    }

    resizeCanvas() {
        const isMobileDevice = isMobile();

        // Get available space (full screen on mobile, with minimal padding)
        const padding = isMobileDevice ? 0 : 10;
        const availWidth = window.innerWidth - padding * 2;
        const availHeight = window.innerHeight - padding * 2;

        // Calculate optimal scale while maintaining aspect ratio
        const scaleX = availWidth / GAME_WIDTH;
        const scaleY = availHeight / GAME_HEIGHT;
        const scale = Math.min(scaleX, scaleY);

        // On mobile, allow larger scale to fill screen better
        // On desktop, cap at 1.2x to avoid pixelation
        const maxScale = isMobileDevice ? scale : Math.min(scale, 1.2);

        const canvasWidth = GAME_WIDTH * maxScale;
        const canvasHeight = GAME_HEIGHT * maxScale;

        this.canvas.style.width = canvasWidth + 'px';
        this.canvas.style.height = canvasHeight + 'px';

        // Center the canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = ((window.innerWidth - canvasWidth) / 2) + 'px';
        this.canvas.style.top = ((window.innerHeight - canvasHeight) / 2) + 'px';

        console.log(`[Resize] Screen ${window.innerWidth}x${window.innerHeight} -> canvas ${canvasWidth.toFixed(0)}x${canvasHeight.toFixed(0)} (scale: ${maxScale.toFixed(2)})`);
    }

    start() {
        requestAnimationFrame((time) => this.loop(time));
    }

    loop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.accumulator += deltaTime;

        // Fixed timestep for physics
        while (this.accumulator >= FRAME_DURATION) {
            this.update(FRAME_DURATION);
            this.accumulator -= FRAME_DURATION;
        }

        this.render();

        requestAnimationFrame((time) => this.loop(time));
    }

    update(deltaTime) {
        this.inputCooldown = Math.max(0, this.inputCooldown - deltaTime);

        switch (this.state) {
            case GameState.TITLE:
                this.updateTitle(deltaTime);
                break;
            case GameState.SETUP:
                this.updateSetup(deltaTime);
                break;
            case GameState.ITEM_CONFIG:
                this.updateItemConfig(deltaTime);
                break;
            case GameState.BATTLE:
                this.updateBattle(deltaTime);
                break;
            case GameState.KO:
                this.updateKO(deltaTime);
                break;
            case GameState.RESULT:
                this.updateResult(deltaTime);
                break;
            case GameState.ONLINE_LOBBY:
                this.updateOnlineLobby(deltaTime);
                break;
            case GameState.ONLINE_WAITING:
            case GameState.ONLINE_CONNECTING:
                // Waiting for connection, handled by callbacks
                break;
        }
    }

    updateTitle(deltaTime) {
        const input = this.input.getInput();

        if (this.inputCooldown > 0) return;

        if (input.moveY < -0.5 || this.input.keys['ArrowUp']) {
            this.menuSelection = Math.max(0, this.menuSelection - 1);
            this.inputCooldown = 200;
        }
        if (input.moveY > 0.5 || this.input.keys['ArrowDown']) {
            this.menuSelection = Math.min(3, this.menuSelection + 1);
            this.inputCooldown = 200;
        }

        if (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys['Space']) {
            SoundManager.playMenuSelect();
            switch (this.menuSelection) {
                case 0: // VS CPU
                    this.isOnlineMode = false;
                    this.state = GameState.SETUP;
                    break;
                case 1: // Online Battle
                    this.isOnlineMode = true;
                    this.state = GameState.ONLINE_LOBBY;
                    this.onlineLobbySelection = 0;
                    break;
                case 2: // How to Play
                case 3: // Settings
                    this.isOnlineMode = false;
                    this.state = GameState.SETUP;
                    break;
            }
            this.inputCooldown = 200;
        }
    }

    updateSetup(deltaTime) {
        const input = this.input.getInput();

        // Online mode: Check countdown timer
        if (this.isOnlineMode && this.readyCountdownStart > 0) {
            const elapsed = Date.now() - this.readyCountdownStart;
            if (elapsed >= this.READY_TIMEOUT) {
                console.log('[Online] Countdown timeout - starting battle!');
                // Timeout reached - auto-start battle
                if (this.isHost) {
                    // Host handles the start
                    if (!this.myReady) {
                        // I wasn't ready, but opponent was - set myself as ready
                        this.myReady = true;
                        this.onlineController.sendReady(this.settings.playerParams);
                    }
                    this.startOnlineBattle();
                }
                return;
            }
        }

        if (this.inputCooldown > 0) return;

        // Navigate parameters (only if not ready in online mode)
        if (!this.isOnlineMode || !this.myReady) {
            // V4.1: Reorganized navigation order
            // 0-6: Parameters and settings
            // 7: ITEM CONFIG (when Items Mode ON) or START BATTLE (when OFF)
            // 8: START BATTLE (when Items Mode ON) or BACK (when OFF)
            // 9: BACK (when Items Mode ON)
            const maxSelection = this.settings.itemsMode ? 9 : 8;

            if (input.moveY < -0.5 || this.input.keys['ArrowUp']) {
                this.setupSelection = Math.max(0, this.setupSelection - 1);
                this.inputCooldown = 150;
            }
            if (input.moveY > 0.5 || this.input.keys['ArrowDown']) {
                this.setupSelection = Math.min(maxSelection, this.setupSelection + 1);
                this.inputCooldown = 150;
            }

            // Adjust values (only for items 0-6)
            if (this.setupSelection <= 6) {
                if (input.moveX < -0.5 || this.input.keys['ArrowLeft']) {
                    this.adjustSetup(-1);
                    this.inputCooldown = 150;
                }
                if (input.moveX > 0.5 || this.input.keys['ArrowRight']) {
                    this.adjustSetup(1);
                    this.inputCooldown = 150;
                }
            }
        }

        // V4.1: ITEM CONFIG button (selection 7 when Items Mode is ON)
        if (this.settings.itemsMode && this.setupSelection === 7 &&
            (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys[' '])) {
            SoundManager.playMenuSelect();
            this.itemConfigSelection = 0;
            this.state = GameState.ITEM_CONFIG;
            this.inputCooldown = 200;
            return;
        }

        // V4.1: Start battle / Ready button
        // Selection 8 when Items Mode ON, Selection 7 when OFF
        const startButtonSelection = this.settings.itemsMode ? 8 : 7;
        if (this.setupSelection === startButtonSelection &&
            (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys[' '])) {
            if (this.isOnlineMode) {
                // Online mode: Handle Ready button
                if (!this.myReady) {
                    this.myReady = true;
                    console.log('[Online] I am ready! Sending params:', this.settings.playerParams);
                    this.onlineController.sendReady(this.settings.playerParams);
                    SoundManager.playMenuSelect();

                    // If opponent is already ready, start battle (host only)
                    if (this.opponentReady && this.isHost) {
                        console.log('[Online] Both ready - starting battle!');
                        this.startOnlineBattle();
                    }
                    // If opponent is not ready, start countdown
                    else if (!this.opponentReady && this.readyCountdownStart === 0) {
                        this.readyCountdownStart = Date.now();
                        console.log('[Online] I am ready first - starting 10s countdown');
                    }
                }
            } else {
                // Offline mode: Start battle directly
                this.startBattle();
            }
            this.inputCooldown = 200;
        }

        // Back to title
        if (this.input.keys['Escape']) {
            console.log('[DEBUG] ESC pressed! Returning to title');
            SoundManager.playMenuSelect();
            // Reset ready state when leaving
            this.myReady = false;
            this.opponentReady = false;
            this.opponentParams = null;
            this.readyCountdownStart = 0;

            this.state = GameState.TITLE;
            this.menuSelection = 0;
            SoundManager.playBGM('title');
            this.inputCooldown = 200;
        }
    }

    adjustSetup(direction) {
        const params = this.settings.playerParams;
        const total = params.jump + params.walk + params.beam + params.kick;

        switch (this.setupSelection) {
            case 0: // JUMP
                if (direction > 0 && total < 20 && params.jump < 10) params.jump++;
                if (direction < 0 && params.jump > 1) params.jump--;
                break;
            case 1: // WALK
                if (direction > 0 && total < 20 && params.walk < 10) params.walk++;
                if (direction < 0 && params.walk > 1) params.walk--;
                break;
            case 2: // BEAM
                if (direction > 0 && total < 20 && params.beam < 10) params.beam++;
                if (direction < 0 && params.beam > 1) params.beam--;
                break;
            case 3: // KICK
                if (direction > 0 && total < 20 && params.kick < 10) params.kick++;
                if (direction < 0 && params.kick > 1) params.kick--;
                break;
            case 4: // Stage
                this.settings.stage = (this.settings.stage + direction + STAGES.length) % STAGES.length;
                break;
            case 5: // Difficulty
                const difficulties = ['easy', 'normal', 'hard'];
                const currentIdx = difficulties.indexOf(this.settings.difficulty);
                const newIdx = (currentIdx + direction + 3) % 3;
                this.settings.difficulty = difficulties[newIdx];
                break;
            case 6: // Items Mode
                this.settings.itemsMode = !this.settings.itemsMode;
                break;
        }
    }

    // V4: Item Configuration screen input handling
    updateItemConfig(deltaTime) {
        const input = this.input.getInput();
        const itemKeys = Object.keys(this.settings.enabledItems);
        const totalItems = itemKeys.length;
        const maxSelection = totalItems + 2; // Items + ALL ON + ALL OFF + BACK

        // Initialize navigation lock timer (prevents horizontal toggle after vertical nav)
        if (this.itemConfigNavLock === undefined) this.itemConfigNavLock = 0;
        if (this.itemConfigNavLock > 0) this.itemConfigNavLock -= deltaTime;

        // Track previous key states for "key just pressed" detection
        if (!this.prevKeys) this.prevKeys = {};

        if (this.inputCooldown > 0) {
            this.inputCooldown -= deltaTime;
            // Update previous key states even during cooldown
            this.prevKeys.ArrowLeft = this.input.keys['ArrowLeft'];
            this.prevKeys.ArrowRight = this.input.keys['ArrowRight'];
            return;
        }

        // Navigation (up/down only) - sets navigation lock to prevent accidental toggle
        if (this.input.keys['ArrowUp'] && !this.input.keys['ArrowDown']) {
            this.itemConfigSelection = Math.max(0, this.itemConfigSelection - 1);
            this.inputCooldown = 150;
            this.itemConfigNavLock = 300; // Lock horizontal for 300ms after vertical nav
            SoundManager.playMenuSelect();
            this.prevKeys.ArrowLeft = this.input.keys['ArrowLeft'];
            this.prevKeys.ArrowRight = this.input.keys['ArrowRight'];
            return;
        }
        if (this.input.keys['ArrowDown'] && !this.input.keys['ArrowUp']) {
            this.itemConfigSelection = Math.min(maxSelection, this.itemConfigSelection + 1);
            this.inputCooldown = 150;
            this.itemConfigNavLock = 300;
            SoundManager.playMenuSelect();
            this.prevKeys.ArrowLeft = this.input.keys['ArrowLeft'];
            this.prevKeys.ArrowRight = this.input.keys['ArrowRight'];
            return;
        }
        // Gamepad/touch vertical navigation
        if (input.moveY < -0.5 && Math.abs(input.moveX) < 0.3) {
            this.itemConfigSelection = Math.max(0, this.itemConfigSelection - 1);
            this.inputCooldown = 150;
            this.itemConfigNavLock = 300;
            SoundManager.playMenuSelect();
            this.prevKeys.ArrowLeft = this.input.keys['ArrowLeft'];
            this.prevKeys.ArrowRight = this.input.keys['ArrowRight'];
            return;
        }
        if (input.moveY > 0.5 && Math.abs(input.moveX) < 0.3) {
            this.itemConfigSelection = Math.min(maxSelection, this.itemConfigSelection + 1);
            this.inputCooldown = 150;
            this.itemConfigNavLock = 300;
            SoundManager.playMenuSelect();
            this.prevKeys.ArrowLeft = this.input.keys['ArrowLeft'];
            this.prevKeys.ArrowRight = this.input.keys['ArrowRight'];
            return;
        }

        // Left/Right only when:
        // 1. Navigation lock has expired (300ms after last vertical nav)
        // 2. Key was JUST pressed (not held from before)
        // 3. On an item row (not buttons)
        if (this.itemConfigNavLock <= 0 && this.itemConfigSelection < totalItems) {
            const key = itemKeys[this.itemConfigSelection];
            // Detect fresh key press (key is down now but wasn't before)
            const leftJustPressed = this.input.keys['ArrowLeft'] && !this.prevKeys.ArrowLeft;
            const rightJustPressed = this.input.keys['ArrowRight'] && !this.prevKeys.ArrowRight;

            if (leftJustPressed && !this.input.keys['ArrowRight']) {
                this.settings.enabledItems[key] = false;
                this.inputCooldown = 250;
                SoundManager.playMenuSelect();
                console.log(`[ItemConfig] ${key} set to OFF`);
            }
            if (rightJustPressed && !this.input.keys['ArrowLeft']) {
                this.settings.enabledItems[key] = true;
                this.inputCooldown = 250;
                SoundManager.playMenuSelect();
                console.log(`[ItemConfig] ${key} set to ON`);
            }
        }

        // Update previous key states
        this.prevKeys.ArrowLeft = this.input.keys['ArrowLeft'];
        this.prevKeys.ArrowRight = this.input.keys['ArrowRight'];

        // Button actions with Enter or Space (explicit press required)
        if (this.input.keys['Enter'] || this.input.keys[' ']) {
            if (this.itemConfigSelection === totalItems) {
                // ALL ON
                for (const key of itemKeys) {
                    this.settings.enabledItems[key] = true;
                }
                SoundManager.playMenuSelect();
                this.inputCooldown = 200;
            } else if (this.itemConfigSelection === totalItems + 1) {
                // ALL OFF
                for (const key of itemKeys) {
                    this.settings.enabledItems[key] = false;
                }
                SoundManager.playMenuSelect();
                this.inputCooldown = 200;
            } else if (this.itemConfigSelection === totalItems + 2) {
                // BACK
                SoundManager.playMenuSelect();
                this.state = GameState.SETUP;
                this.inputCooldown = 200;
            } else {
                // Toggle individual item with Enter/Space
                const key = itemKeys[this.itemConfigSelection];
                this.settings.enabledItems[key] = !this.settings.enabledItems[key];
                SoundManager.playMenuSelect();
                this.inputCooldown = 200;
                console.log(`[ItemConfig] ${key} toggled to ${this.settings.enabledItems[key]}`);
            }
        }

        // ESC to go back
        if (this.input.keys['Escape']) {
            SoundManager.playMenuSelect();
            this.state = GameState.SETUP;
            this.inputCooldown = 200;
        }
    }

    startBattle() {
        console.log('[DEBUG] startBattle() called!');
        console.log('[DEBUG] Current state before:', this.state);
        console.log('[DEBUG] isHost:', this.isHost, 'isOnlineMode:', this.isOnlineMode);
        this.currentStage = this.settings.stage;
        const stage = STAGES[this.currentStage];

        // Create player
        console.log(`[DEBUG] Creating PLAYER robot at x=${stage.spawnPoints.player.x}, isPlayer=true, color=red`);
        this.player = new Robot(
            stage.spawnPoints.player.x,
            stage.spawnPoints.player.y,
            true,
            'red'
        );
        console.log(`[DEBUG] PLAYER created: isPlayer=${this.player.isPlayer}, color=${this.player.color}, x=${this.player.x}`);
        this.player.setParameters(
            this.settings.playerParams.jump,
            this.settings.playerParams.walk,
            this.settings.playerParams.beam,
            this.settings.playerParams.kick
        );

        // Create enemy
        console.log(`[DEBUG] Creating ENEMY robot at x=${stage.spawnPoints.enemy.x}, isPlayer=false, color=blue`);
        this.enemy = new Robot(
            stage.spawnPoints.enemy.x,
            stage.spawnPoints.enemy.y,
            false,
            'blue'
        );
        console.log(`[DEBUG] ENEMY created: isPlayer=${this.enemy.isPlayer}, color=${this.enemy.color}, x=${this.enemy.x}`);

        // Random enemy parameters
        const enemyTotal = 20;
        const dist = [5, 5, 5, 5];
        for (let i = 0; i < enemyTotal - 20; i++) {
            dist[Math.floor(Math.random() * 4)]++;
        }
        this.enemy.setParameters(dist[0], dist[1], dist[2], dist[3]);

        // Create AI or NetworkPlayer
        if (this.isOnlineMode && this.onlineController) {
            // Online mode: use NetworkPlayer for opponent
            this.ai = this.onlineController.createNetworkPlayer(this.enemy);
            console.log('[Online] Using NetworkPlayer for opponent');

            // If host, signal battle start to client
            if (this.isHost) {
                this.onlineController.sendBattleStart({
                    stage: this.currentStage,
                    difficulty: this.settings.difficulty,
                    playerParams: this.settings.playerParams,
                    itemsMode: this.settings.itemsMode  // Sync Items Mode setting
                });
                console.log('[HOST] Sent battle settings to client:', {
                    stage: this.currentStage,
                    difficulty: this.settings.difficulty,
                    itemsMode: this.settings.itemsMode
                });
            }
        } else {
            // CPU mode: use EnemyAI
            this.ai = new EnemyAI(this.enemy);
            this.ai.setDifficulty(this.settings.difficulty);
        }

        // Clear projectiles and effects
        this.beams = [];
        this.weaponProjectiles = [];  // V4: Clear weapon projectiles
        this.activeBeasts = [];       // V4.3: Clear beast summons
        this.effects = [];
        ParticleSystem.clear();

        // Reset Items Mode state
        this.activeItems = [];
        this.itemSpawnTimer = 0;
        this.activeWarpZones = [];
        this.warpSpawnTimer = 0;

        this.winner = null;
        this.state = GameState.BATTLE;

        // Start 3-second countdown before battle begins
        this.battleCountdown = 3;
        this.battleCountdownStart = Date.now();

        // Start battle BGM
        SoundManager.playBGM('battle');

        console.log('[DEBUG] State changed to:', this.state);
        console.log('[DEBUG] Battle countdown started!');
        console.log('[DEBUG] Player created at:', this.player.x, this.player.y);
        console.log('[DEBUG] Enemy created at:', this.enemy.x, this.enemy.y);
    }

    // Called by host to start online battle when both are ready
    startOnlineBattle() {
        console.log('[HOST] Starting online battle - both ready!');

        // Send bothReady signal to client with host's settings and client's params
        this.onlineController.sendBothReady({
            stage: this.settings.stage,
            itemsMode: this.settings.itemsMode,
            enabledItems: this.settings.enabledItems,  // V4: Host's item settings
            opponentParams: this.settings.playerParams  // Host's params for client's enemy
        });

        // Start battle with params
        this.startBattleWithParams();
    }

    // Start battle with opponent's parameters applied to enemy robot
    startBattleWithParams() {
        console.log('[Online] startBattleWithParams called');
        console.log('[Online] My params:', this.settings.playerParams);
        console.log('[Online] Opponent params:', this.opponentParams);

        this.currentStage = this.settings.stage;
        const stage = STAGES[this.currentStage];

        // Create MY robot (player) with MY parameters
        this.player = new Robot(
            stage.spawnPoints.player.x,
            stage.spawnPoints.player.y,
            true,
            'red'
        );
        this.player.setParameters(
            this.settings.playerParams.jump,
            this.settings.playerParams.walk,
            this.settings.playerParams.beam,
            this.settings.playerParams.kick
        );
        console.log('[Online] Created MY robot with MY params:', this.settings.playerParams);

        // Create OPPONENT's robot (enemy) with OPPONENT's parameters
        this.enemy = new Robot(
            stage.spawnPoints.enemy.x,
            stage.spawnPoints.enemy.y,
            false,
            'blue'
        );

        // Apply opponent's parameters if available, otherwise use defaults
        if (this.opponentParams) {
            this.enemy.setParameters(
                this.opponentParams.jump,
                this.opponentParams.walk,
                this.opponentParams.beam,
                this.opponentParams.kick
            );
            console.log('[Online] Created OPPONENT robot with OPPONENT params:', this.opponentParams);
        } else {
            // Fallback to default parameters
            this.enemy.setParameters(5, 5, 5, 5);
            console.log('[Online] Warning: No opponent params, using defaults');
        }

        // Create NetworkPlayer for opponent
        if (this.onlineController) {
            this.ai = this.onlineController.createNetworkPlayer(this.enemy);
            console.log('[Online] Using NetworkPlayer for opponent');
        }

        // Clear projectiles and effects
        this.beams = [];
        this.weaponProjectiles = [];  // V4: Clear weapon projectiles
        this.activeBeasts = [];       // V4.3: Clear beast summons
        this.effects = [];
        ParticleSystem.clear();

        // Reset Items Mode state
        this.activeItems = [];
        this.itemSpawnTimer = 0;
        this.activeWarpZones = [];
        this.warpSpawnTimer = 0;

        // Reset Ready state for next match
        this.myReady = false;
        this.opponentReady = false;
        this.readyCountdownStart = 0;

        this.winner = null;
        this.state = GameState.BATTLE;

        // Start 3-second countdown before battle begins
        this.battleCountdown = 3;
        this.battleCountdownStart = Date.now();

        // Start battle BGM
        SoundManager.playBGM('battle');

        console.log('[Online] Battle screen shown - 3 second countdown started!');
        console.log('[Online] Player at:', this.player.x, this.player.y);
        console.log('[Online] Enemy at:', this.enemy.x, this.enemy.y);
    }

    updateBattle(deltaTime) {
        // Update input states for charge detection
        this.input.updateInputStates();

        const input = this.input.getInput();
        const stage = STAGES[this.currentStage];

        // =====================================================
        // BATTLE COUNTDOWN: 3-2-1-FIGHT before battle starts
        // =====================================================
        if (this.battleCountdown > 0) {
            const elapsed = Date.now() - this.battleCountdownStart;
            const secondsElapsed = Math.floor(elapsed / 1000);
            const newCountdown = 3 - secondsElapsed;

            if (newCountdown !== this.battleCountdown) {
                this.battleCountdown = Math.max(0, newCountdown);
                if (this.battleCountdown > 0) {
                    console.log('[Battle] Countdown:', this.battleCountdown);
                    SoundManager.playMenuSelect(); // Sound for each countdown tick
                } else {
                    console.log('[Battle] FIGHT!');
                    SoundManager.playBeamShoot(1.0); // Sound for FIGHT (charged beam sound)
                }
            }

            // During countdown, only update physics for idle animations
            this.player.update(deltaTime, stage.platforms);
            this.enemy.update(deltaTime, stage.platforms);
            ParticleSystem.update();
            return; // Skip all input processing during countdown
        }

        // Pause
        if (this.input.keys['Escape'] || this.input.keys['KeyP']) {
            this.state = GameState.PAUSED;
            this.inputCooldown = 200;
            return;
        }

        // =====================================================
        // ONLINE MODE: Client only sends input, doesn't process locally
        // =====================================================
        if (this.isOnlineMode && this.onlineController && !this.isHost) {
            // Client: Send input to host, skip local processing
            if (this.onlineController.isConnected) {
                const networkInput = {
                    left: input.moveX < -0.5,
                    right: input.moveX > 0.5,
                    // Use edge-triggered jumpDown for network (prevents continuous jumping)
                    jump: input.jumpDown,  // Only true on press, not during hold
                    // Charge beam support: send separate states
                    shoot: input.shoot,
                    shootDown: input.shootDown,  // Charge start
                    shootUp: input.shootUp,      // Charge release
                    kick: input.kick
                };
                // Debug: Log when one-frame events are sent
                if (networkInput.jump || networkInput.shootDown || networkInput.shootUp) {
                    console.log('[Client] Sending input:', networkInput);
                }
                this.onlineController.sendInput(networkInput);
            }
            // Client still needs to update physics for smooth display
            // BUT preserve synced state values (don't let Robot.update reset them)
            const playerState = {
                state: this.player.state,
                isCharging: this.player.isCharging,
                chargeLevel: this.player.chargeLevel,
                facingRight: this.player.facingRight
            };
            const enemyState = {
                state: this.enemy.state,
                isCharging: this.enemy.isCharging,
                chargeLevel: this.enemy.chargeLevel,
                facingRight: this.enemy.facingRight
            };

            this.player.update(deltaTime, stage.platforms);
            this.enemy.update(deltaTime, stage.platforms);

            // Restore synced state (HOST is authoritative)
            this.player.state = playerState.state;
            this.player.isCharging = playerState.isCharging;
            this.player.chargeLevel = playerState.chargeLevel;
            this.player.facingRight = playerState.facingRight;
            this.enemy.state = enemyState.state;
            this.enemy.isCharging = enemyState.isCharging;
            this.enemy.chargeLevel = enemyState.chargeLevel;
            this.enemy.facingRight = enemyState.facingRight;
            // Update beams (for visual only)
            for (const beam of this.beams) {
                beam.update();
            }
            this.beams = this.beams.filter(b => b.active);
            // Update effects
            for (const effect of this.effects) {
                effect.update();
            }
            this.effects = this.effects.filter(e => e.active);
            ParticleSystem.update();
            ScreenEffects.update();
            return; // Skip all other processing for client
        }

        // =====================================================
        // HOST or CPU mode: Normal processing below
        // =====================================================

        // V4.3: Skip player input if knocked down (can't act)
        if (!this.player.canAct()) {
            // Force stop any ongoing actions
            this.player.velocityX = 0;
            this.player.isCharging = false;
            this.player.isGuarding = false;
        } else {
            // Player input (only when not knocked down)
            this.player.move(input.moveX);

            // Face direction logic: ALWAYS face opponent
            // This gives a fighting game feel where you always watch your enemy
            // When moving toward enemy = walk forward, when moving away = walk backward
            if (this.enemy) {
                this.player.facingRight = this.enemy.x > this.player.x;
            }

            if (input.jump) {
                this.player.jump();
            }

            // V4.2: Guard input handling
            if (input.guard && this.player.onGround && !this.player.isGuarding) {
                this.player.guard();
            } else if (!input.guard && this.player.isGuarding) {
                this.player.stopGuarding();
            }
        }

        // V4.2: Prevent movement while guarding
        if (this.player.isGuarding) {
            this.player.velocityX = 0;
        }

        // V4.3: Only allow attacks if not knocked down
        if (this.player.canAct()) {
            // Charge beam mechanics
            if (input.shootDown) {
                // Start charging when button pressed
                this.player.startCharging();
            }

            if (this.player.isCharging) {
                // Always face enemy while charging (critical for beam direction)
                if (this.enemy) {
                    this.player.facingRight = this.enemy.x > this.player.x;
                }

                // Update charge level while holding
                this.player.updateCharge();

                // Release charged beam when button released
                if (input.shootUp) {
                    // Face enemy before firing (ensure correct beam direction)
                    if (this.enemy) {
                        this.player.facingRight = this.enemy.x > this.player.x;
                    }

                    // Check if enemy is close - if so, kick instead of beam
                    const distanceToEnemy = Math.abs(this.player.x - this.enemy.x);
                    const heightDiff = Math.abs(this.player.y - this.enemy.y);
                    const kickRange = 60; // Range for kick-on-beam
                    const heightThreshold = 50;

                    if (distanceToEnemy < kickRange && heightDiff < heightThreshold && this.player.kickCooldown <= 0) {
                        // Close range: Kick instead of beam
                        this.player.cancelCharge();

                        if (this.player.kick(this.enemy)) {
                            const knockbackDir = this.player.facingRight ? 1 : -1;
                            const died = this.enemy.takeDamage(this.player.kickDamage, knockbackDir);
                            this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit'));
                            SoundManager.playKick();

                            if (died) {
                                this.triggerKO('player', this.enemy);
                                return;
                            }
                        }
                    } else {
                        // Normal range: Fire charged beam
                        this.player.releaseChargedBeam(this.beams);
                        // V4: Also fire equipped weapon
                        // V4.3: Pass activeBeasts and enemy target for beast summon
                        this.player.fireWeapon(this.weaponProjectiles, this.activeBeasts, this.enemy);
                    }
                }
            }

            if (input.kick) {
                // Face enemy before kicking
                if (this.enemy) {
                    this.player.facingRight = this.enemy.x > this.player.x;
                }
                if (this.player.kick(this.enemy)) {
                    const knockbackDir = this.player.facingRight ? 1 : -1;
                    const died = this.enemy.takeDamage(this.player.kickDamage, knockbackDir);
                    this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit'));
                    SoundManager.playKick();

                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                }
            }
        }

        // AI update
        // V4.2: Pass weaponProjectiles so CPU can fire equipped weapons
        // V4.3: Pass activeBeasts for beast summon
        // V4.4: Pass activeItems for item pursuit AI
        this.ai.update(deltaTime, this.player, this.beams, this.weaponProjectiles, this.activeBeasts, this.activeItems);

        // AI kick check
        if (this.ai.currentAction === 'kick') {
            if (this.enemy.kick(this.player)) {
                const knockbackDir = this.enemy.facingRight ? 1 : -1;
                const died = this.player.takeDamage(this.enemy.kickDamage, knockbackDir);
                this.effects.push(new Effect(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 'hit'));

                // AI kick sound
                SoundManager.playKick();

                if (died) {
                    this.triggerKO('enemy', this.player);
                    return;
                }
            }
        }

        // Update robots
        this.player.update(deltaTime, stage.platforms);
        this.enemy.update(deltaTime, stage.platforms);

        // =====================================================
        // ROBOT-TO-ROBOT COLLISION (Push mechanics)
        // =====================================================
        this.handleRobotCollision(this.player, this.enemy);

        // Post-update: Ensure correct facing direction during charge (HOST)
        // This must be after Robot.update() to prevent any accidental resets
        if (this.player.isCharging && this.enemy) {
            this.player.facingRight = this.enemy.x > this.player.x;
        }

        // Update beams
        for (const beam of this.beams) {
            beam.update();

            // V4.1: Check collision with player (uses getHitbox for crouch support)
            if (beam.owner === 'enemy' && checkCollisionWithHitbox(beam, this.player)) {
                beam.active = false;
                const knockbackDir = beam.direction;
                const died = this.player.takeDamage(beam.damage, knockbackDir);
                this.effects.push(new Effect(beam.x, beam.y, 'hit'));

                // Beam hit sound and effects
                SoundManager.playBeamHit();
                ScreenEffects.flash('#ff0000', 0.2);

                if (died) {
                    this.triggerKO('enemy', this.player);
                    return;
                }
            }

            // V4.1: Check collision with enemy (uses getHitbox for crouch support)
            if (beam.owner === 'player' && checkCollisionWithHitbox(beam, this.enemy)) {
                beam.active = false;
                const knockbackDir = beam.direction;
                const died = this.enemy.takeDamage(beam.damage, knockbackDir);
                this.effects.push(new Effect(beam.x, beam.y, 'hit'));

                // Beam hit sound and effects
                SoundManager.playBeamHit();
                ScreenEffects.flash('#0066ff', 0.2);

                if (died) {
                    this.triggerKO('player', this.enemy);
                    return;
                }
            }
        }

        // Remove inactive beams
        this.beams = this.beams.filter(b => b.active);

        // ====================================================================
        // V4: WEAPON PROJECTILE UPDATE AND COLLISION
        // ====================================================================
        for (const proj of this.weaponProjectiles) {
            // V4: Set target for homing missiles before update
            if (proj.weaponType === 'HOMING_MISSILE') {
                if (proj.owner === 'player') {
                    proj.target = this.enemy;
                } else {
                    proj.target = this.player;
                }
            }

            proj.update();

            // V4.3: Handle Spirit Tiger collision (explodes on hit with dramatic effect)
            if (proj.weaponType === 'SPIRIT_TIGER' && proj.active) {
                if (proj.owner === 'player' && checkCollisionWithHitbox(proj, this.enemy)) {
                    proj.active = false;
                    const knockbackDir = proj.direction * 2;  // Strong knockback
                    const died = this.enemy.takeDamage(proj.damage, knockbackDir);
                    // V4.3: Dramatic tiger explosion effect
                    this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit', {
                        isItemHit: true, color: '#ff9900', size: 100, particleCount: 20
                    }));
                    // V4.3: Extra tiger particles for explosion feel
                    ParticleSystem.emit(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 15, {
                        color: '#ff9900', size: 8, life: 40, type: 'spark'
                    });
                    SoundManager.playKick();
                    ScreenEffects.flash('#ff9900', 0.6);
                    ScreenEffects.shake(22, 35);
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                } else if (proj.owner === 'enemy' && checkCollisionWithHitbox(proj, this.player)) {
                    proj.active = false;
                    const knockbackDir = proj.direction * 2;
                    const died = this.player.takeDamage(proj.damage, knockbackDir);
                    // V4.3: Dramatic tiger explosion effect
                    this.effects.push(new Effect(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 'hit', {
                        isItemHit: true, color: '#ff9900', size: 100, particleCount: 20
                    }));
                    // V4.3: Extra tiger particles for explosion feel
                    ParticleSystem.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 15, {
                        color: '#ff9900', size: 8, life: 40, type: 'spark'
                    });
                    SoundManager.playKick();
                    ScreenEffects.flash('#ff9900', 0.6);
                    ScreenEffects.shake(22, 35);
                    if (died) {
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
                continue;
            }

            // V4: Handle Aerial Bomb explosion on ground
            if (proj.weaponType === 'AERIAL_BOMB' && proj.active && proj.exploded) {
                const explosionRadius = 60;
                // V4.1: Add explosion effect at bomb location
                if (!proj._effectAdded) {
                    this.effects.push(new Effect(proj.x, proj.y, 'hit', {
                        isItemHit: true, color: '#00ffff', size: 100, particleCount: 20
                    }));
                    proj._effectAdded = true;
                }
                // Check player damage
                const distToPlayer = Math.hypot(
                    proj.x - (this.player.x + this.player.width/2),
                    proj.y - (this.player.y + this.player.height/2)
                );
                if (distToPlayer < explosionRadius && proj.owner !== 'player') {
                    const died = this.player.takeDamage(proj.damage, 0);
                    ScreenEffects.flash('#00ffff', 0.4);
                    ScreenEffects.shake(12, 20);
                    if (died) {
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
                // Check enemy damage
                const distToEnemy = Math.hypot(
                    proj.x - (this.enemy.x + this.enemy.width/2),
                    proj.y - (this.enemy.y + this.enemy.height/2)
                );
                if (distToEnemy < explosionRadius && proj.owner !== 'enemy') {
                    const died = this.enemy.takeDamage(proj.damage, 0);
                    ScreenEffects.flash('#00ffff', 0.4);
                    ScreenEffects.shake(12, 20);
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                }
                continue;
            }

            // V4.3: Handle Green Dragon collision (similar to Spirit Tiger - explodes on hit)
            if (proj.weaponType === 'GREEN_DRAGON' && proj.active) {
                if (proj.owner === 'player' && checkCollisionWithHitbox(proj, this.enemy)) {
                    proj.active = false;
                    const knockbackDir = proj.direction * 2;  // Strong knockback
                    const died = this.enemy.takeDamage(proj.damage, knockbackDir);
                    // V4.3: Dramatic dragon explosion effect
                    this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit', {
                        isItemHit: true, color: '#00ff66', size: 100, particleCount: 20
                    }));
                    // Extra dragon particles
                    ParticleSystem.emit(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 15, {
                        color: '#00ff66', size: 8, life: 40, type: 'spark'
                    });
                    SoundManager.playKick();
                    ScreenEffects.flash('#00ff66', 0.6);
                    ScreenEffects.shake(20, 35);
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                } else if (proj.owner === 'enemy' && checkCollisionWithHitbox(proj, this.player)) {
                    proj.active = false;
                    const knockbackDir = proj.direction * 2;
                    const died = this.player.takeDamage(proj.damage, knockbackDir);
                    // V4.3: Dramatic dragon explosion effect
                    this.effects.push(new Effect(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 'hit', {
                        isItemHit: true, color: '#00ff66', size: 100, particleCount: 20
                    }));
                    // Extra dragon particles
                    ParticleSystem.emit(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 15, {
                        color: '#00ff66', size: 8, life: 40, type: 'spark'
                    });
                    SoundManager.playKick();
                    ScreenEffects.flash('#00ff66', 0.6);
                    ScreenEffects.shake(20, 35);
                    if (died) {
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
                continue;
            }

            // V4.3: Handle Meteor Strike collision (area damage on impact)
            if (proj.weaponType === 'METEOR_STRIKE' && proj.active && proj.exploded) {
                const explosionRadius = proj.radius || 80;
                // Add explosion effect once
                if (!proj._explosionEffectAdded) {
                    this.effects.push(new Effect(proj.x, proj.y, 'hit', {
                        isItemHit: true, color: '#ff6600', size: 120, particleCount: 25
                    }));
                    // Meteor debris particles
                    ParticleSystem.explosion(proj.x, proj.y);
                    ParticleSystem.emit(proj.x, proj.y, 20, {
                        color: '#ff6600', size: 10, life: 50, type: 'spark'
                    });
                    ScreenEffects.flash('#ff6600', 0.5);
                    ScreenEffects.shake(25, 40);
                    proj._explosionEffectAdded = true;
                }
                // Check player damage (only in first 100ms of explosion)
                const elapsed = Date.now() - proj.explosionTime;
                if (elapsed < 100) {
                    const distToPlayer = Math.hypot(
                        proj.x - (this.player.x + this.player.width/2),
                        proj.y - (this.player.y + this.player.height/2)
                    );
                    if (distToPlayer < explosionRadius && proj.owner !== 'player' && !proj._hitPlayer) {
                        const died = this.player.takeDamage(proj.damage, 0);
                        proj._hitPlayer = true;
                        if (died) {
                            this.triggerKO('enemy', this.player);
                            return;
                        }
                    }
                    // Check enemy damage
                    const distToEnemy = Math.hypot(
                        proj.x - (this.enemy.x + this.enemy.width/2),
                        proj.y - (this.enemy.y + this.enemy.height/2)
                    );
                    if (distToEnemy < explosionRadius && proj.owner !== 'enemy' && !proj._hitEnemy) {
                        const died = this.enemy.takeDamage(proj.damage, 0);
                        proj._hitEnemy = true;
                        if (died) {
                            this.triggerKO('player', this.enemy);
                            return;
                        }
                    }
                }
                continue;
            }

            // V4.3: Handle Homing Missile collision (enhanced effects)
            if (proj.weaponType === 'HOMING_MISSILE' && proj.active) {
                if (proj.owner === 'player' && checkCollisionWithHitbox(proj, this.enemy)) {
                    proj.active = false;
                    const knockbackDir = proj.direction * 1.5;  // V4.3: 強いノックバック
                    const died = this.enemy.takeDamage(proj.damage, knockbackDir);
                    // V4.3: Dramatic missile explosion effect
                    this.effects.push(new Effect(proj.x, proj.y, 'hit', {
                        isItemHit: true, color: '#ff3333', size: 90, particleCount: 18
                    }));
                    ParticleSystem.explosion(proj.x, proj.y);
                    ParticleSystem.emit(proj.x, proj.y, 12, {
                        color: '#ff6600', size: 6, life: 35, type: 'spark'
                    });
                    SoundManager.playBeamHit();
                    ScreenEffects.flash('#ff3333', 0.5);
                    ScreenEffects.shake(18, 28);
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                } else if (proj.owner === 'enemy' && checkCollisionWithHitbox(proj, this.player)) {
                    proj.active = false;
                    const knockbackDir = proj.direction * 1.5;  // V4.3: 強いノックバック
                    const died = this.player.takeDamage(proj.damage, knockbackDir);
                    // V4.3: Dramatic missile explosion effect
                    this.effects.push(new Effect(proj.x, proj.y, 'hit', {
                        isItemHit: true, color: '#ff3333', size: 90, particleCount: 18
                    }));
                    ParticleSystem.explosion(proj.x, proj.y);
                    ParticleSystem.emit(proj.x, proj.y, 12, {
                        color: '#ff6600', size: 6, life: 35, type: 'spark'
                    });
                    SoundManager.playBeamHit();
                    ScreenEffects.flash('#ff3333', 0.5);
                    ScreenEffects.shake(18, 28);
                    if (died) {
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
                continue;
            }

            // Handle Sword slash collision (uses getHitbox)
            if (proj.weaponType === 'SWORD' && proj.active) {
                const hitbox = proj.getHitbox();
                if (proj.owner === 'player' && checkCollision(hitbox, this.enemy)) {
                    proj.active = false;
                    const knockbackDir = proj.direction;
                    const died = this.enemy.takeDamage(proj.damage, knockbackDir);
                    // V4.1: Enhanced item hit effect for Sword
                    this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit', {
                        isItemHit: true, color: '#ff00ff', size: 60, particleCount: 10
                    }));
                    SoundManager.playKick();  // Sword hit sound
                    ScreenEffects.flash('#ff00ff', 0.4);
                    ScreenEffects.shake(10, 15);
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                } else if (proj.owner === 'enemy' && checkCollision(hitbox, this.player)) {
                    proj.active = false;
                    const knockbackDir = proj.direction;
                    const died = this.player.takeDamage(proj.damage, knockbackDir);
                    // V4.1: Enhanced item hit effect for Sword
                    this.effects.push(new Effect(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 'hit', {
                        isItemHit: true, color: '#ff00ff', size: 60, particleCount: 10
                    }));
                    SoundManager.playKick();
                    ScreenEffects.flash('#ff00ff', 0.4);
                    ScreenEffects.shake(10, 15);
                    if (died) {
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
                continue;
            }

            // Handle Bazooka explosion (V4.1: crouch-aware)
            if (proj.weaponType === 'BAZOOKA' && proj.active) {
                // Check collision with player
                if (proj.owner === 'enemy' && checkCollisionWithHitbox(proj, this.player)) {
                    const explosion = proj.explode();
                    if (explosion) {
                        // Area damage (could hit both robots if close)
                        const distToPlayer = Math.hypot(
                            explosion.x - (this.player.x + this.player.width/2),
                            explosion.y - (this.player.y + this.player.height/2)
                        );
                        if (distToPlayer <= explosion.radius) {
                            const died = this.player.takeDamage(explosion.damage, proj.direction);
                            // V4.1: Enhanced item hit effect for Bazooka
                            this.effects.push(new Effect(explosion.x, explosion.y, 'hit', {
                                isItemHit: true, color: '#ff6600', size: 90, particleCount: 18
                            }));
                            SoundManager.playBeamHit();
                            ScreenEffects.flash('#ff6600', 0.5);
                            ScreenEffects.shake(15, 25);
                            if (died) {
                                this.triggerKO('enemy', this.player);
                                return;
                            }
                        }
                    }
                }
                // Check collision with enemy (V4.1: crouch-aware)
                if (proj.owner === 'player' && checkCollisionWithHitbox(proj, this.enemy)) {
                    const explosion = proj.explode();
                    if (explosion) {
                        const distToEnemy = Math.hypot(
                            explosion.x - (this.enemy.x + this.enemy.width/2),
                            explosion.y - (this.enemy.y + this.enemy.height/2)
                        );
                        if (distToEnemy <= explosion.radius) {
                            const died = this.enemy.takeDamage(explosion.damage, proj.direction);
                            // V4.1: Enhanced item hit effect for Bazooka
                            this.effects.push(new Effect(explosion.x, explosion.y, 'hit', {
                                isItemHit: true, color: '#ff6600', size: 90, particleCount: 18
                            }));
                            SoundManager.playBeamHit();
                            ScreenEffects.flash('#ff6600', 0.5);
                            ScreenEffects.shake(15, 25);
                            if (died) {
                                this.triggerKO('player', this.enemy);
                                return;
                            }
                        }
                    }
                }
                continue;
            }

            // Standard projectile collision (Machinegun, Spread) - V4.1: crouch-aware
            if (proj.owner === 'enemy' && checkCollisionWithHitbox(proj, this.player)) {
                proj.active = false;
                const knockbackDir = proj.direction;
                const died = this.player.takeDamage(proj.damage, knockbackDir);
                // V4.1: Enhanced item hit effect for Machinegun/Spread
                const effectColor = proj.weaponType === 'SPREAD' ? '#ffff00' : '#00ff66';
                this.effects.push(new Effect(proj.x, proj.y, 'hit', {
                    isItemHit: true, color: effectColor, size: 45, particleCount: 8
                }));
                SoundManager.playBeamHit();
                if (died) {
                    this.triggerKO('enemy', this.player);
                    return;
                }
            }

            if (proj.owner === 'player' && checkCollisionWithHitbox(proj, this.enemy)) {
                proj.active = false;
                const knockbackDir = proj.direction;
                const died = this.enemy.takeDamage(proj.damage, knockbackDir);
                // V4.1: Enhanced item hit effect for Machinegun/Spread
                const effectColor = proj.weaponType === 'SPREAD' ? '#ffff00' : '#00ff66';
                this.effects.push(new Effect(proj.x, proj.y, 'hit', {
                    isItemHit: true, color: effectColor, size: 45, particleCount: 8
                }));
                SoundManager.playBeamHit();
                if (died) {
                    this.triggerKO('player', this.enemy);
                    return;
                }
            }
        }

        // Remove inactive weapon projectiles
        this.weaponProjectiles = this.weaponProjectiles.filter(p => p.active);

        // ====================================================================
        // V4.3: BEAST UPDATE AND COLLISION
        // ====================================================================
        for (const beast of this.activeBeasts) {
            if (!beast.active) continue;

            // Update beast AI and physics
            beast.update(stage.platforms);

            // Check if beast's flame attack hits target
            const flameHitbox = beast.getFlameHitbox();
            if (flameHitbox) {
                if (beast.owner === 'player' && checkCollision(flameHitbox, this.enemy.getHitbox())) {
                    const died = this.enemy.takeDamage(beast.damage, beast.facingRight ? 1 : -1);
                    this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit', {
                        isItemHit: true, color: '#ff6600', size: 40, particleCount: 8
                    }));
                    ScreenEffects.flash('#ff6600', 0.3);
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                } else if (beast.owner === 'enemy' && checkCollision(flameHitbox, this.player.getHitbox())) {
                    const died = this.player.takeDamage(beast.damage, beast.facingRight ? 1 : -1);
                    this.effects.push(new Effect(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 'hit', {
                        isItemHit: true, color: '#ff6600', size: 40, particleCount: 8
                    }));
                    ScreenEffects.flash('#ff6600', 0.3);
                    if (died) {
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
            }

            // Check if beams hit the beast (beast can take damage from enemy attacks)
            for (const beam of this.beams) {
                if (beam.active && checkCollision(beam, beast.getHitbox())) {
                    // Only damage beast if beam is from the opposite side
                    if ((beast.owner === 'player' && beam.owner === 'enemy') ||
                        (beast.owner === 'enemy' && beam.owner === 'player')) {
                        beam.active = false;
                        const defeated = beast.takeDamage(beam.damage);
                        if (defeated) {
                            // Beast defeated effect
                            ParticleSystem.emit(beast.x + beast.width/2, beast.y + beast.height/2, 20, {
                                color: beast.color, size: 6, life: 30, type: 'spark'
                            });
                            SoundManager.playBeamHit();
                        }
                    }
                }
            }

            // Check if weapon projectiles hit the beast
            for (const proj of this.weaponProjectiles) {
                if (proj.active && checkCollisionWithHitbox(proj, beast)) {
                    // Only damage beast if projectile is from the opposite side
                    if ((beast.owner === 'player' && proj.owner === 'enemy') ||
                        (beast.owner === 'enemy' && proj.owner === 'player')) {
                        proj.active = false;
                        const defeated = beast.takeDamage(proj.damage);
                        if (defeated) {
                            // Beast defeated effect
                            ParticleSystem.emit(beast.x + beast.width/2, beast.y + beast.height/2, 20, {
                                color: beast.color, size: 6, life: 30, type: 'spark'
                            });
                            SoundManager.playBeamHit();
                        }
                    }
                }
            }
        }

        // Remove inactive beasts
        this.activeBeasts = this.activeBeasts.filter(b => b.active);

        // ====================================================================
        // ITEMS MODE: Zone and Item Processing
        // ====================================================================
        if (this.settings.itemsMode) {
            // Update powerups for both robots (also updates weapon timeout)
            this.player.updatePowerups();
            this.enemy.updatePowerups();

            // V4.1: Update shadow clones
            this.player.updateShadowClones(deltaTime);
            this.enemy.updateShadowClones(deltaTime);

            // V4: Update weapon cooldowns
            if (this.player.equippedWeapon.cooldown > 0) {
                this.player.equippedWeapon.cooldown -= deltaTime;
            }
            if (this.enemy.equippedWeapon.cooldown > 0) {
                this.enemy.equippedWeapon.cooldown -= deltaTime;
            }

            // Update warp cooldowns
            if (this.player.warpCooldown > 0) {
                this.player.warpCooldown -= deltaTime;
            }
            if (this.enemy.warpCooldown > 0) {
                this.enemy.warpCooldown -= deltaTime;
            }

            // Check warp zones (dynamic only - static zones removed for better UX)
            const activeWarps = (this.activeWarpZones || []).filter(w => w.isActive);
            for (const warp of activeWarps) {
                // Player warp check (only if cooldown is 0 and warp is active)
                if (this.player.warpCooldown <= 0 && this.checkZoneCollision(this.player, warp.entry)) {
                    this.teleportRobot(this.player, warp.exit);
                }
                // Enemy warp check (only if cooldown is 0 and warp is active)
                if (this.enemy.warpCooldown <= 0 && this.checkZoneCollision(this.enemy, warp.entry)) {
                    this.teleportRobot(this.enemy, warp.exit);
                }
            }

            // Check death zones
            for (const death of stage.deathZones) {
                // Player death zone check
                if (this.checkZoneCollision(this.player, death)) {
                    // Instant KO from death zone (unless shield is active)
                    if (!this.player.powerups.shield.active) {
                        this.player.hp = 0;
                        ScreenEffects.flash('#ff0000', 0.6);
                        this.triggerKO('enemy', this.player);
                        return;
                    }
                }
                // Enemy death zone check
                if (this.checkZoneCollision(this.enemy, death)) {
                    if (!this.enemy.powerups.shield.active) {
                        this.enemy.hp = 0;
                        ScreenEffects.flash('#0066ff', 0.6);
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                }
            }

            // Item spawning
            this.itemSpawnTimer += deltaTime;
            if (this.itemSpawnTimer >= ITEMS.spawnInterval && stage.itemSpawns.length > 0) {
                this.itemSpawnTimer = 0;
                // Pick random spawn point
                const spawnPoint = stage.itemSpawns[Math.floor(Math.random() * stage.itemSpawns.length)];

                // V4.3: Filter items based on enabledItems settings (Laser/BlackHole removed, Dragon/Meteor/Beast added)
                // W_BEAST appears 3x more often (added multiple times for weighting)
                const allWeaponTypes = [
                    'W_BAZOOKA', 'W_MACHINEGUN', 'W_SPREAD', 'W_SWORD',
                    'W_HOMING', 'W_CLONE', 'W_TIGER', 'W_AERIAL', 'W_DRAGON', 'W_METEOR',
                    'W_BEAST', 'W_BEAST', 'W_BEAST'  // V4.3: 3x weight for more frequent beast spawns
                ];
                const enabledWeapons = allWeaponTypes.filter(t => this.settings.enabledItems[t]);
                const enabledPowerups = spawnPoint.types.filter(t => this.settings.enabledItems[t]);

                // V4.3: 40% chance to spawn a weapon item (increased from 30% for more action)
                let itemType = null;
                if (Math.random() < 0.4 && enabledWeapons.length > 0) {
                    // Spawn weapon item from enabled weapons
                    itemType = enabledWeapons[Math.floor(Math.random() * enabledWeapons.length)];
                } else if (enabledPowerups.length > 0) {
                    // Pick regular item type from enabled powerups
                    itemType = enabledPowerups[Math.floor(Math.random() * enabledPowerups.length)];
                } else if (enabledWeapons.length > 0) {
                    // Fallback to weapons if no powerups enabled
                    itemType = enabledWeapons[Math.floor(Math.random() * enabledWeapons.length)];
                }

                // Only spawn if we have a valid item type
                if (itemType) {
                    this.activeItems.push(new Item(spawnPoint.x - 16, spawnPoint.y - 16, itemType));
                }
            }

            // Dynamic warp zone spawning (UX optimized: less frequent, with warning)
            this.warpSpawnTimer += deltaTime;
            const warpInterval = ITEMS.warpZone.spawnIntervalMin +
                Math.random() * (ITEMS.warpZone.spawnIntervalMax - ITEMS.warpZone.spawnIntervalMin);
            const maxWarpZones = ITEMS.warpZone.maxActive || 1;
            if (this.warpSpawnTimer >= warpInterval && this.activeWarpZones.length < maxWarpZones) {
                this.warpSpawnTimer = 0;
                // Generate random entry and exit positions on platforms
                const platforms = stage.platforms.filter(p => p.width >= 80); // Need space for warp zone
                if (platforms.length >= 2) {
                    const shuffled = platforms.sort(() => Math.random() - 0.5);
                    const entryPlatform = shuffled[0];
                    const exitPlatform = shuffled[1];

                    const warpWidth = ITEMS.warpZone.width;
                    const warpHeight = ITEMS.warpZone.height;

                    // Entry zone (random position on platform)
                    const entryX = entryPlatform.x + Math.random() * (entryPlatform.width - warpWidth);
                    const entryY = entryPlatform.y - warpHeight;

                    // Exit zone (random position on different platform)
                    const exitX = exitPlatform.x + Math.random() * (exitPlatform.width - warpWidth);
                    const exitY = exitPlatform.y - warpHeight;

                    this.activeWarpZones.push({
                        entry: { x: entryX, y: entryY, w: warpWidth, h: warpHeight },
                        exit: { x: exitX + warpWidth/2, y: exitY + warpHeight/2 },
                        spawnTime: Date.now(),
                        warningTime: ITEMS.warpZone.warningTime || 1500,
                        lifetime: ITEMS.warpZone.lifetime,
                        isActive: false  // Starts in warning state
                    });

                    // Visual effect for warning (spawn preview)
                    ParticleSystem.warpEffect(entryX + warpWidth/2, entryY + warpHeight/2, 'in');
                }
            }

            // Update warp zones: handle warning → active transition and expiration
            const now = Date.now();
            this.activeWarpZones = this.activeWarpZones.filter(warp => {
                const age = now - warp.spawnTime;

                // Transition from warning to active state
                if (!warp.isActive && age >= warp.warningTime) {
                    warp.isActive = true;
                    // Visual effect when becoming active
                    ParticleSystem.warpEffect(warp.entry.x + warp.entry.w/2, warp.entry.y + warp.entry.h/2, 'in');
                }

                // Remove expired warp zones
                if (age >= warp.lifetime + warp.warningTime) {
                    // Visual effect on despawn
                    ParticleSystem.warpEffect(warp.entry.x + warp.entry.w/2, warp.entry.y + warp.entry.h/2, 'out');
                    return false;
                }
                return true;
            });

            // Update and check item collisions
            for (const item of this.activeItems) {
                item.update();

                // Player item pickup
                if (item.active && checkCollision(item, this.player)) {
                    item.active = false;
                    this.player.applyPowerup(item.type);
                    SoundManager.playItemPickup();
                    // Visual feedback
                    ParticleSystem.itemPickup(item.x + item.width/2, item.y + item.height/2, item.type);
                    // V4: Show weapon name announcement for weapon items
                    if (item.type.startsWith('W_')) {
                        const weaponType = ITEMS.types[item.type].weaponType;
                        WeaponAnnouncement.show(weaponType);
                    }
                }

                // Enemy item pickup
                if (item.active && checkCollision(item, this.enemy)) {
                    item.active = false;
                    this.enemy.applyPowerup(item.type);
                    // Visual feedback
                    ParticleSystem.itemPickup(item.x + item.width/2, item.y + item.height/2, item.type);
                    // V4: Show weapon name announcement for weapon items (enemy)
                    if (item.type.startsWith('W_')) {
                        const weaponType = ITEMS.types[item.type].weaponType;
                        WeaponAnnouncement.show(weaponType);
                    }
                }
            }

            // Remove inactive items
            this.activeItems = this.activeItems.filter(i => i.active);
        }

        // Update effects
        for (const effect of this.effects) {
            effect.update();
        }
        this.effects = this.effects.filter(e => e.active);

        // V4: Update weapon announcement
        WeaponAnnouncement.update();

        // Update particle system and screen effects
        ParticleSystem.update();
        ScreenEffects.update();

        // Online mode sync (Host only - client returns early above)
        if (this.isOnlineMode && this.onlineController && this.onlineController.isConnected && this.isHost) {
            // Host sends full game state to client
            this.onlineController.sendGameState({
                player: {
                    x: this.player.x,
                    y: this.player.y,
                    hp: this.player.hp,
                    maxHp: this.player.maxHp,
                    velocityX: this.player.velocityX,
                    velocityY: this.player.velocityY,
                    facingRight: this.player.facingRight,
                    isOnGround: this.player.isOnGround,
                    state: this.player.state,
                    isCharging: this.player.isCharging,
                    chargeLevel: this.player.chargeLevel,
                    // Powerup states for visual indicators
                    powerups: {
                        rapid: { active: this.player.powerups.rapid.active, endTime: this.player.powerups.rapid.endTime },
                        mega: { active: this.player.powerups.mega.active, endTime: this.player.powerups.mega.endTime },
                        shield: { active: this.player.powerups.shield.active, endTime: this.player.powerups.shield.endTime }
                    },
                    // V4: Weapon state
                    equippedWeapon: {
                        type: this.player.equippedWeapon.type,
                        endTime: this.player.equippedWeapon.endTime,
                        cooldown: this.player.equippedWeapon.cooldown
                    }
                },
                enemy: {
                    x: this.enemy.x,
                    y: this.enemy.y,
                    hp: this.enemy.hp,
                    maxHp: this.enemy.maxHp,
                    velocityX: this.enemy.velocityX,
                    velocityY: this.enemy.velocityY,
                    facingRight: this.enemy.facingRight,
                    isOnGround: this.enemy.isOnGround,
                    state: this.enemy.state,
                    isCharging: this.enemy.isCharging,
                    chargeLevel: this.enemy.chargeLevel,
                    // Powerup states for visual indicators
                    powerups: {
                        rapid: { active: this.enemy.powerups.rapid.active, endTime: this.enemy.powerups.rapid.endTime },
                        mega: { active: this.enemy.powerups.mega.active, endTime: this.enemy.powerups.mega.endTime },
                        shield: { active: this.enemy.powerups.shield.active, endTime: this.enemy.powerups.shield.endTime }
                    },
                    // V4: Weapon state
                    equippedWeapon: {
                        type: this.enemy.equippedWeapon.type,
                        endTime: this.enemy.equippedWeapon.endTime,
                        cooldown: this.enemy.equippedWeapon.cooldown
                    }
                },
                beams: this.beams.map(b => ({
                    x: b.x,
                    y: b.y,
                    direction: b.direction,
                    owner: b.owner,  // 'player' or 'enemy' - determines beam color
                    damage: b.damage,
                    width: b.width,
                    height: b.height,
                    chargeLevel: b.chargeLevel || 0
                })),
                // V4: Sync weapon projectiles
                weaponProjectiles: (this.weaponProjectiles || []).map(p => ({
                    x: p.x,
                    y: p.y,
                    direction: p.direction,
                    owner: p.owner,
                    damage: p.damage,
                    weaponType: p.weaponType,
                    width: p.width,
                    height: p.height,
                    active: p.active,
                    // Sword-specific
                    swingProgress: p.swingProgress || 0,
                    // Spread-specific
                    velocityX: p.velocityX || 0,
                    velocityY: p.velocityY || 0
                })),
                // Sync items for client display
                items: (this.activeItems || []).map(item => ({
                    x: item.x,
                    y: item.y,
                    type: item.type,
                    active: item.active
                })),
                // Sync warp zones for client display (include all properties for rendering)
                warpZones: (this.activeWarpZones || []).map(warp => ({
                    entry: warp.entry,
                    exit: warp.exit,
                    isActive: warp.isActive,
                    spawnTime: warp.spawnTime,
                    lifetime: warp.lifetime,
                    warningTime: warp.warningTime
                })),
                gameState: this.state,
                winner: this.winner
            });
        }
    }

    // Check if a robot is in a zone (warp entry or death zone)
    checkZoneCollision(robot, zone) {
        const robotCenterX = robot.x + robot.width / 2;
        const robotCenterY = robot.y + robot.height / 2;
        return robotCenterX >= zone.x &&
               robotCenterX <= zone.x + zone.w &&
               robotCenterY >= zone.y &&
               robotCenterY <= zone.y + zone.h;
    }

    // =========================================================================
    // ROBOT-TO-ROBOT COLLISION: Push mechanics based on kickPower
    // =========================================================================
    handleRobotCollision(robotA, robotB) {
        // Check if robots overlap
        if (!checkCollision(robotA, robotB)) {
            return; // No collision
        }

        // Calculate overlap
        const overlapLeft = (robotA.x + robotA.width) - robotB.x;   // A's right into B's left
        const overlapRight = (robotB.x + robotB.width) - robotA.x;  // B's right into A's left

        // Determine push direction (horizontal only, vertical handled by platforms)
        const pushFromLeft = overlapLeft < overlapRight;
        const overlap = Math.min(overlapLeft, overlapRight);

        if (overlap <= 0) return;

        // Calculate push strength ratio based on kickPower
        // Higher kickPower = more push strength = less pushed back
        const powerA = robotA.kickPower + 1; // +1 to avoid division by zero
        const powerB = robotB.kickPower + 1;
        const totalPower = powerA + powerB;

        // Robot with LOWER power gets pushed MORE
        // ratioA = how much of the overlap robotA absorbs (gets pushed)
        const ratioA = powerB / totalPower; // If B is stronger, A gets pushed more
        const ratioB = powerA / totalPower; // If A is stronger, B gets pushed more

        // Add minimum push to prevent complete stalemate when powers are equal
        const minPush = 1;
        const pushA = Math.max(overlap * ratioA, minPush);
        const pushB = Math.max(overlap * ratioB, minPush);

        // Apply push based on direction
        if (pushFromLeft) {
            // A is on left, B is on right
            robotA.x -= pushA;
            robotB.x += pushB;
        } else {
            // B is on left, A is on right
            robotA.x += pushA;
            robotB.x -= pushB;
        }

        // Keep robots within screen bounds
        robotA.x = clamp(robotA.x, 0, GAME_WIDTH - robotA.width);
        robotB.x = clamp(robotB.x, 0, GAME_WIDTH - robotB.width);

        // Apply small velocity change for natural feel
        // The weaker robot gets pushed back with some momentum
        const velocityPush = 0.5;
        if (pushFromLeft) {
            // A pushed left, B pushed right
            if (powerA < powerB) {
                robotA.velocityX = -velocityPush * (powerB / powerA);
            }
            if (powerB < powerA) {
                robotB.velocityX = velocityPush * (powerA / powerB);
            }
        } else {
            // A pushed right, B pushed left
            if (powerA < powerB) {
                robotA.velocityX = velocityPush * (powerB / powerA);
            }
            if (powerB < powerA) {
                robotB.velocityX = -velocityPush * (powerA / powerB);
            }
        }

        // Visual feedback: Small spark particles at collision point
        const collisionX = (robotA.x + robotA.width / 2 + robotB.x + robotB.width / 2) / 2;
        const collisionY = Math.max(robotA.y, robotB.y) + 30;

        // Only show particles occasionally to avoid spam
        if (Math.random() < 0.3) {
            ParticleSystem.emit(collisionX, collisionY, 3, {
                color: '#ffaa00',
                size: 3,
                life: 15,
                type: 'spark'
            });
        }
    }

    // Teleport a robot to exit position with visual effect
    teleportRobot(robot, exit) {
        // Set warp cooldown to prevent immediate re-warp
        robot.warpCooldown = 1500; // 1.5 seconds

        // Visual effect at source
        ParticleSystem.warpEffect(robot.x + robot.width/2, robot.y + robot.height/2, 'out');

        // Move robot
        robot.x = exit.x - robot.width / 2;
        robot.y = exit.y - robot.height / 2;
        robot.velocityY = 0; // Reset falling velocity

        // Visual effect at destination
        ParticleSystem.warpEffect(robot.x + robot.width/2, robot.y + robot.height/2, 'in');

        // Screen flash
        ScreenEffects.flash('#9900ff', 0.3);
    }

    // Render a warp zone (purple portal effect)
    renderWarpZone(ctx, zone, alpha = 1.0, isWarning = false) {
        const time = Date.now() * 0.003;
        const pulseAlpha = (0.3 + Math.sin(time) * 0.15) * alpha;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Different visual style for warning vs active state
        if (isWarning) {
            // Warning state: yellow/orange outline, dashed border
            ctx.shadowColor = 'rgba(255, 200, 0, 0.8)';
            ctx.shadowBlur = 15 + Math.sin(time * 4) * 10;

            // Dashed border
            ctx.setLineDash([8, 4]);
            ctx.strokeStyle = '#ffcc00';
            ctx.lineWidth = 3;
            ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);

            // Warning label
            ctx.setLineDash([]);
            ctx.shadowBlur = 0;
            ctx.font = 'bold 10px Courier New';
            ctx.fillStyle = '#ffcc00';
            ctx.textAlign = 'center';
            const centerX = zone.x + zone.w / 2;
            ctx.fillText('WARP!', centerX, zone.y - 5);
        } else {
            // Active state: full purple portal
            ctx.shadowColor = ITEMS.warpZone.glowColor;
            ctx.shadowBlur = 20 + Math.sin(time * 2) * 10;

            // Portal background
            ctx.fillStyle = `rgba(153, 0, 255, ${pulseAlpha})`;
            ctx.fillRect(zone.x, zone.y, zone.w, zone.h);

            // Border
            ctx.strokeStyle = ITEMS.warpZone.color;
            ctx.lineWidth = 3;
            ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);

            // Inner swirl effect (simplified)
            const centerX = zone.x + zone.w / 2;
            const centerY = zone.y + zone.h / 2;
            for (let i = 0; i < 3; i++) {
                const angle = time * 2 + (i * Math.PI * 2 / 3);
                const radius = 15 + i * 5;
                const px = centerX + Math.cos(angle) * radius;
                const py = centerY + Math.sin(angle) * radius * 0.5;

                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }

            // WARP label
            ctx.shadowBlur = 0;
            ctx.font = 'bold 10px Courier New';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('WARP', centerX, zone.y - 5);
        }

        ctx.restore();
    }

    // Render a death zone (red danger area)
    renderDeathZone(ctx, zone) {
        const time = Date.now() * 0.004;
        const flashAlpha = 0.2 + Math.sin(time) * 0.1;

        ctx.save();

        // Danger stripes pattern
        ctx.fillStyle = `rgba(255, 0, 0, ${flashAlpha})`;
        ctx.fillRect(zone.x, zone.y, zone.w, zone.h);

        // Warning stripes
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.6)';
        ctx.lineWidth = 2;
        const stripeSpacing = 12;
        for (let i = 0; i < zone.w + zone.h; i += stripeSpacing) {
            ctx.beginPath();
            ctx.moveTo(zone.x + i, zone.y);
            ctx.lineTo(zone.x + i - zone.h, zone.y + zone.h);
            ctx.stroke();
        }

        // Border
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 3;
        ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);

        // DANGER label
        ctx.font = 'bold 10px Courier New';
        ctx.fillStyle = '#ff0000';
        ctx.textAlign = 'center';
        ctx.fillText('DANGER', zone.x + zone.w / 2, zone.y - 5);

        ctx.restore();
    }

    // Render powerup indicators above robot
    renderPowerupIndicators(ctx, robot) {
        const now = Date.now();
        let iconX = robot.x + robot.width / 2 - 40;
        const iconY = robot.y - 25;
        const iconSize = 16;
        const iconSpacing = 20;

        ctx.save();

        // V4: Draw equipped weapon first (with larger indicator)
        if (robot.equippedWeapon.type) {
            const remaining = (robot.equippedWeapon.endTime - now) / WEAPONS.duration;
            this.drawWeaponIcon(ctx, iconX, iconY - 18, robot.equippedWeapon.type, remaining);
            iconX += iconSpacing + 5;
        }

        // Draw active powerup icons
        if (robot.powerups.rapid.active) {
            const remaining = (robot.powerups.rapid.endTime - now) / ITEMS.types.RAPID.duration;
            this.drawPowerupIcon(ctx, iconX, iconY, 'RAPID', remaining);
            iconX += iconSpacing;
        }
        if (robot.powerups.mega.active) {
            const remaining = (robot.powerups.mega.endTime - now) / ITEMS.types.MEGA.duration;
            this.drawPowerupIcon(ctx, iconX, iconY, 'MEGA', remaining);
            iconX += iconSpacing;
        }
        if (robot.powerups.shield.active) {
            const remaining = (robot.powerups.shield.endTime - now) / ITEMS.types.SHIELD.duration;
            this.drawPowerupIcon(ctx, iconX, iconY, 'SHIELD', remaining);

            // Draw shield aura around robot
            ctx.shadowColor = ITEMS.types.SHIELD.glowColor;
            ctx.shadowBlur = 15;
            ctx.strokeStyle = ITEMS.types.SHIELD.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(
                robot.x + robot.width / 2,
                robot.y + robot.height / 2,
                robot.width * 0.7,
                robot.height * 0.6,
                0, 0, Math.PI * 2
            );
            ctx.stroke();
        }

        ctx.restore();
    }

    // V4: Draw weapon icon with timer
    drawWeaponIcon(ctx, x, y, weaponType, remaining) {
        const config = WEAPONS.types[weaponType];
        const size = 20;

        ctx.save();

        // Background with glow
        ctx.shadowColor = config.glowColor;
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 2, y - 2, size + 4, size + 10);

        // Icon
        ctx.fillStyle = config.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;

        const cx = x + size / 2;
        const cy = y + size / 2;
        const s = size * 0.35;

        switch(weaponType) {
            case 'BAZOOKA':
                // Rocket shape
                ctx.beginPath();
                ctx.moveTo(cx - s, cy);
                ctx.lineTo(cx + s * 0.8, cy - s * 0.4);
                ctx.lineTo(cx + s, cy);
                ctx.lineTo(cx + s * 0.8, cy + s * 0.4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
            case 'MACHINEGUN':
                // Two barrels
                ctx.fillRect(cx - s, cy - s * 0.4, s * 1.5, s * 0.3);
                ctx.fillRect(cx - s, cy + s * 0.1, s * 1.5, s * 0.3);
                ctx.stroke();
                break;
            case 'SPREAD':
                // Three dots in spread
                ctx.beginPath();
                ctx.arc(cx, cy, s * 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(cx - s * 0.5, cy - s * 0.5, s * 0.25, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(cx - s * 0.5, cy + s * 0.5, s * 0.25, 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'SWORD':
                // Sword blade
                ctx.beginPath();
                ctx.moveTo(cx, cy - s);
                ctx.lineTo(cx + s * 0.3, cy + s * 0.3);
                ctx.lineTo(cx, cy + s);
                ctx.lineTo(cx - s * 0.3, cy + s * 0.3);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                break;
        }

        // Timer bar below
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y + size + 2, size, 4);
        ctx.fillStyle = config.color;
        ctx.fillRect(x, y + size + 2, size * Math.max(0, remaining), 4);

        // Weapon name
        ctx.font = 'bold 8px Courier New';
        ctx.fillStyle = config.color;
        ctx.textAlign = 'center';
        ctx.fillText(weaponType, cx, y + size + 18);

        ctx.restore();
    }

    // Draw a single powerup icon with timer bar
    drawPowerupIcon(ctx, x, y, type, remaining) {
        const config = ITEMS.types[type];
        const size = 14;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x - 2, y - 2, size + 4, size + 6);

        // Icon
        ctx.fillStyle = config.color;
        ctx.fillRect(x, y, size, size);

        // Timer bar below
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y + size + 1, size, 3);
        ctx.fillStyle = config.color;
        ctx.fillRect(x, y + size + 1, size * remaining, 3);
    }

    updateResult(deltaTime) {
        const input = this.input.getInput();

        if (this.inputCooldown > 0) return;

        // Online mode: Handle rematch consent UI with keyboard
        if (this.isOnlineMode) {
            // Waiting for opponent's response - only TITLE option available
            if (this.rematchWaitingResponse && !this.rematchRequestReceived) {
                if (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys['Space'] || this.input.keys['Escape']) {
                    console.log('[Online] Cancelling rematch wait (keyboard) - going to TITLE');
                    SoundManager.playMenuSelect();
                    if (this.onlineController) {
                        this.onlineController.sendRematchReject();
                    }
                    this.rematchRequestSent = false;
                    this.rematchRequestReceived = false;
                    this.rematchWaitingResponse = false;
                    this.state = GameState.TITLE;
                    this.menuSelection = 0;
                    SoundManager.playBGM('title');
                    this.inputCooldown = 200;
                }
                return;
            }

            // Received rematch request - handle accept/reject with keyboard
            if (this.rematchRequestReceived && !this.rematchRequestSent) {
                // Left/Right to switch between OK and 拒否
                if (input.moveX < -0.5 || this.input.keys['ArrowLeft']) {
                    this.rematchSelection = 0; // OK
                    this.inputCooldown = 200;
                }
                if (input.moveX > 0.5 || this.input.keys['ArrowRight']) {
                    this.rematchSelection = 1; // 拒否
                    this.inputCooldown = 200;
                }

                // Confirm selection
                if (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys['Space']) {
                    SoundManager.playMenuSelect();
                    if (this.rematchSelection === 0) {
                        // Accept
                        console.log('[Online] Accepting rematch (keyboard)');
                        if (this.onlineController) {
                            this.onlineController.sendRematchAccept();
                        }
                        this.goToRematchSetup();
                    } else {
                        // Reject
                        console.log('[Online] Rejecting rematch (keyboard)');
                        if (this.onlineController) {
                            this.onlineController.sendRematchReject();
                        }
                        this.rematchRequestReceived = false;
                        this.rematchRequestSent = false;
                        this.rematchWaitingResponse = false;
                        this.state = GameState.TITLE;
                        this.menuSelection = 0;
                        SoundManager.playBGM('title');
                    }
                    this.inputCooldown = 200;
                }
                return;
            }
        }

        // Normal menu navigation
        if (input.moveY < -0.5 || this.input.keys['ArrowUp']) {
            this.menuSelection = Math.max(0, this.menuSelection - 1);
            this.inputCooldown = 200;
        }
        if (input.moveY > 0.5 || this.input.keys['ArrowDown']) {
            this.menuSelection = Math.min(2, this.menuSelection + 1);
            this.inputCooldown = 200;
        }

        if (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys['Space']) {
            SoundManager.playMenuSelect();
            switch (this.menuSelection) {
                case 0: // Rematch
                    if (this.isOnlineMode) {
                        // Online mode: Send rematch request and wait for response
                        console.log('[Online] REMATCH selected - sending rematch request');
                        this.rematchRequestSent = true;
                        this.rematchWaitingResponse = true;
                        this.rematchSelection = 0; // Default to OK
                        if (this.onlineController) {
                            this.onlineController.sendRematchRequest();
                        }
                        // Check if opponent already sent request (mutual rematch)
                        if (this.rematchRequestReceived) {
                            console.log('[Online] Both want rematch - going to SETUP');
                            this.goToRematchSetup();
                        }
                    } else {
                        // Offline mode: Start immediately
                        this.startBattle();
                    }
                    break;
                case 1: // Change Settings
                    // Reset Ready states when going to settings
                    this.myReady = false;
                    this.opponentReady = false;
                    this.opponentParams = null;
                    this.readyCountdownStart = 0;
                    this.rematchRequestSent = false;
                    this.rematchRequestReceived = false;
                    this.rematchWaitingResponse = false;
                    this.state = GameState.SETUP;
                    SoundManager.playBGM('title');
                    break;
                case 2: // Title
                    // If in online mode with pending rematch, notify opponent
                    if (this.isOnlineMode && this.rematchRequestReceived) {
                        if (this.onlineController) {
                            this.onlineController.sendRematchReject();
                        }
                    }
                    this.rematchRequestSent = false;
                    this.rematchRequestReceived = false;
                    this.rematchWaitingResponse = false;
                    this.state = GameState.TITLE;
                    this.menuSelection = 0;
                    SoundManager.playBGM('title');
                    break;
            }
            this.inputCooldown = 200;
        }

        // =====================================================
        // ONLINE MODE: Sync RESULT state to client (Host only)
        // =====================================================
        if (this.isOnlineMode && this.onlineController && this.onlineController.isConnected && this.isHost) {
            this.onlineController.sendGameState({
                player: {
                    x: this.player.x,
                    y: this.player.y,
                    hp: this.player.hp,
                    maxHp: this.player.maxHp
                },
                enemy: {
                    x: this.enemy.x,
                    y: this.enemy.y,
                    hp: this.enemy.hp,
                    maxHp: this.enemy.maxHp
                },
                beams: [],
                gameState: this.state,
                winner: this.winner
            });
        }
    }

    // KO演出を開始
    triggerKO(winner, defeatedRobot) {
        this.winner = winner;
        this.koTarget = defeatedRobot;
        this.koTimer = 0;
        this.koTextScale = 0;
        this.koEffects = [];
        this.state = GameState.KO;

        // Stop battle BGM
        SoundManager.stopBGM();

        // KO sound effect
        SoundManager.playKO();

        // Screen shake and flash
        ScreenEffects.shake(15, 30);
        ScreenEffects.flash('#ffffff', 0.8);

        // Particle explosion
        ParticleSystem.explosion(
            defeatedRobot.x + defeatedRobot.width / 2,
            defeatedRobot.y + defeatedRobot.height / 2
        );

        // 敗者の位置に爆発エフェクトを大量生成
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * defeatedRobot.width * 1.5;
            const offsetY = (Math.random() - 0.5) * defeatedRobot.height * 1.5;
            const effect = new Effect(
                defeatedRobot.x + defeatedRobot.width / 2 + offsetX,
                defeatedRobot.y + defeatedRobot.height / 2 + offsetY,
                'explosion'
            );
            effect.maxFrames = 30;  // 長めに表示
            this.koEffects.push(effect);
        }

        // Victory/Defeat sound (delayed)
        setTimeout(() => {
            if (winner === 'player') {
                SoundManager.playVictory();
            } else {
                SoundManager.playDefeat();
            }
        }, 600);

        console.log(`[KO] ${winner} wins! KO演出開始`);
    }

    // KO演出の更新
    updateKO(deltaTime) {
        // =====================================================
        // ONLINE MODE: Client receives koTimer from host
        // Only host increments koTimer and controls state transition
        // =====================================================
        const isOnlineClient = this.isOnlineMode && this.onlineController && !this.isHost;

        if (!isOnlineClient) {
            // Host or offline: increment timer normally
            this.koTimer += deltaTime;
        }
        // Client: koTimer is synced from host via applyNetworkState

        // KO!テキストのスケールアニメーション（ズームイン）
        const scaleProgress = Math.min(this.koTimer / 300, 1);  // 300msでズームイン完了
        this.koTextScale = scaleProgress * KO_SETTINGS.koTextScale;

        // スローモーションでロボット更新
        const slowDelta = deltaTime * KO_SETTINGS.slowMotionFactor;
        const stage = STAGES[this.currentStage];
        this.player.update(slowDelta, stage.platforms);
        this.enemy.update(slowDelta, stage.platforms);

        // エフェクト更新
        for (const effect of this.koEffects) {
            effect.update();
        }
        this.koEffects = this.koEffects.filter(e => e.active);

        // 通常のエフェクトもスロー更新
        for (const effect of this.effects) {
            effect.update();
        }
        this.effects = this.effects.filter(e => e.active);

        // Update particle system and screen effects
        ParticleSystem.update();
        ScreenEffects.update();

        // フリーズ時間終了後、結果画面へ（Hostのみ遷移、Clientはホストから同期）
        if (!isOnlineClient && this.koTimer >= KO_SETTINGS.freezeTime) {
            this.state = GameState.RESULT;
            this.menuSelection = 0;
            console.log('[KO] 演出終了 → RESULT画面へ');
        }

        // =====================================================
        // ONLINE MODE: Sync KO state to client (Host only)
        // =====================================================
        if (this.isOnlineMode && this.onlineController && this.onlineController.isConnected && this.isHost) {
            this.onlineController.sendGameState({
                player: {
                    x: this.player.x,
                    y: this.player.y,
                    hp: this.player.hp,
                    maxHp: this.player.maxHp,
                    velocityX: this.player.velocityX,
                    velocityY: this.player.velocityY,
                    facingRight: this.player.facingRight,
                    isOnGround: this.player.isOnGround,
                    state: this.player.state,
                    isCharging: this.player.isCharging,
                    chargeLevel: this.player.chargeLevel
                },
                enemy: {
                    x: this.enemy.x,
                    y: this.enemy.y,
                    hp: this.enemy.hp,
                    maxHp: this.enemy.maxHp,
                    velocityX: this.enemy.velocityX,
                    velocityY: this.enemy.velocityY,
                    facingRight: this.enemy.facingRight,
                    isOnGround: this.enemy.isOnGround,
                    state: this.enemy.state,
                    isCharging: this.enemy.isCharging,
                    chargeLevel: this.enemy.chargeLevel
                },
                beams: [],
                gameState: this.state,
                winner: this.winner,
                koTimer: this.koTimer
            });
        }
    }

    render() {
        const ctx = this.ctx;

        // Clear
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        switch (this.state) {
            case GameState.TITLE:
                this.renderTitle();
                break;
            case GameState.SETUP:
                this.renderSetup();
                break;
            case GameState.ITEM_CONFIG:
                this.renderItemConfig();
                break;
            case GameState.BATTLE:
                this.renderBattle();
                break;
            case GameState.KO:
                this.renderKO();
                break;
            case GameState.RESULT:
                this.renderResult();
                break;
            case GameState.PAUSED:
                this.renderBattle();
                this.renderPauseOverlay();
                break;
            case GameState.ONLINE_LOBBY:
                this.renderOnlineLobby();
                break;
            case GameState.ONLINE_WAITING:
            case GameState.ONLINE_CONNECTING:
                this.renderOnlineWaiting();
                break;
        }
    }

    renderTitle() {
        const ctx = this.ctx;

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
        gradient.addColorStop(0, '#0d0221');
        gradient.addColorStop(1, '#1a0a30');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Logo
        this.ui.drawLogo(GAME_WIDTH / 2, 150);

        // Robots (use high-quality sprites if available)
        const playerSprite = SpriteLoader.getSprite(true, 'idle');
        const enemySprite = SpriteLoader.getSprite(false, 'idle');

        // Sprite native directions:
        // - Player (red) sprites face RIGHT natively
        // - Enemy (blue) sprites face LEFT natively
        //
        // Title screen layout:
        // - Player on left side should face RIGHT (toward enemy) → no flip needed
        // - Enemy on right side should face LEFT (toward player) → no flip needed (already faces left)

        // Draw player robot (no flip - native right-facing is correct for left side)
        ctx.save();
        ctx.shadowColor = '#FF4400';
        ctx.shadowBlur = 20;
        if (playerSprite) {
            ctx.drawImage(playerSprite, 100, 210, 180, 240);
        } else {
            ctx.drawImage(svgToImage(SPRITES.robotRed), 120, 230, 144, 192);
        }
        ctx.restore();

        // Draw enemy robot (no flip needed - native left-facing is correct for right side)
        ctx.save();
        ctx.shadowColor = '#0066FF';
        ctx.shadowBlur = 20;
        if (enemySprite) {
            ctx.drawImage(enemySprite, 520, 210, 180, 240);
        } else {
            ctx.drawImage(svgToImage(SPRITES.robotBlue), 540, 230, 144, 192);
        }
        ctx.restore();

        // VS
        ctx.font = 'bold 48px Courier New';
        ctx.fillStyle = '#ffff00';
        ctx.textAlign = 'center';
        ctx.fillText('VS', GAME_WIDTH / 2, 330);

        // Menu
        const menuItems = ['VS CPU', 'ONLINE BATTLE', 'HOW TO PLAY', 'SETTINGS'];
        const startY = 400;

        for (let i = 0; i < menuItems.length; i++) {
            const isSelected = i === this.menuSelection;
            ctx.font = isSelected ? 'bold 20px Courier New' : '18px Courier New';
            ctx.fillStyle = isSelected ? '#ffff00' : '#888888';
            ctx.fillText((isSelected ? '> ' : '  ') + menuItems[i], GAME_WIDTH / 2, startY + i * 40);
        }

        // Instructions
        ctx.font = '14px Courier New';
        ctx.fillStyle = '#666666';
        ctx.fillText('Use Arrow Keys / WASD to navigate, SPACE to select', GAME_WIDTH / 2, GAME_HEIGHT - 30);
    }

    renderSetup() {
        const ctx = this.ctx;
        const params = this.settings.playerParams;
        const total = params.jump + params.walk + params.beam + params.kick;

        // Background
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Title
        ctx.font = 'bold 24px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('ROBOT CUSTOMIZATION', GAME_WIDTH / 2, 50);

        // Points remaining
        ctx.font = '18px Courier New';
        ctx.fillStyle = total <= 20 ? '#00ff00' : '#ff0000';
        ctx.fillText(`Points: ${total}/20`, GAME_WIDTH / 2, 80);

        // Parameters
        const paramNames = ['JUMP', 'WALK', 'BEAM', 'KICK'];
        const paramValues = [params.jump, params.walk, params.beam, params.kick];
        const startY = 130;

        for (let i = 0; i < 4; i++) {
            const isSelected = i === this.setupSelection;
            const y = startY + i * 60;

            // Label
            ctx.font = isSelected ? 'bold 18px Courier New' : '16px Courier New';
            ctx.fillStyle = isSelected ? '#ffff00' : '#ffffff';
            ctx.textAlign = 'left';
            ctx.fillText(paramNames[i], 200, y);

            // Value bar
            const barX = 300;
            const barWidth = 200;
            const barHeight = 20;

            ctx.fillStyle = '#333';
            ctx.fillRect(barX, y - 15, barWidth, barHeight);

            const fillColor = isSelected ? '#ffff00' : '#00ff00';
            ctx.fillStyle = fillColor;
            ctx.fillRect(barX + 2, y - 13, (barWidth - 4) * (paramValues[i] / 10), barHeight - 4);

            ctx.strokeStyle = isSelected ? '#ffff00' : '#666';
            ctx.lineWidth = isSelected ? 2 : 1;
            ctx.strokeRect(barX, y - 15, barWidth, barHeight);

            // Value
            ctx.textAlign = 'right';
            ctx.fillStyle = isSelected ? '#ffff00' : '#ffffff';
            ctx.fillText(paramValues[i].toString(), 550, y);

            // Arrows
            if (isSelected) {
                ctx.fillText('< >', 590, y);
            }
        }

        // Stage selection
        const stageY = startY + 4 * 60 + 20;
        const isStageSelected = this.setupSelection === 4;
        ctx.font = isStageSelected ? 'bold 18px Courier New' : '16px Courier New';
        ctx.fillStyle = isStageSelected ? '#ffff00' : '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText('STAGE', 200, stageY);
        ctx.textAlign = 'right';
        const stageName = `${this.settings.stage + 1}. ${STAGES[this.settings.stage].displayName}`;
        ctx.fillText(stageName, 550, stageY);
        if (isStageSelected) ctx.fillText('< >', 590, stageY);

        // Difficulty
        const diffY = stageY + 50;
        const isDiffSelected = this.setupSelection === 5;
        ctx.font = isDiffSelected ? 'bold 18px Courier New' : '16px Courier New';
        ctx.fillStyle = isDiffSelected ? '#ffff00' : '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText('DIFFICULTY', 200, diffY);
        ctx.textAlign = 'right';
        ctx.fillText(this.settings.difficulty.toUpperCase(), 550, diffY);
        if (isDiffSelected) ctx.fillText('< >', 590, diffY);

        // Items Mode toggle
        const itemsY = diffY + 50;
        const isItemsSelected = this.setupSelection === 6;
        ctx.font = isItemsSelected ? 'bold 18px Courier New' : '16px Courier New';
        ctx.fillStyle = isItemsSelected ? '#ffff00' : '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText('ITEMS MODE', 200, itemsY);
        ctx.textAlign = 'right';

        // Show ON/OFF with color coding
        if (this.settings.itemsMode) {
            ctx.fillStyle = isItemsSelected ? '#00ff00' : '#00cc00';
            ctx.fillText('ON', 550, itemsY);
        } else {
            ctx.fillStyle = isItemsSelected ? '#ff6666' : '#888888';
            ctx.fillText('OFF', 550, itemsY);
        }
        if (isItemsSelected) {
            ctx.fillStyle = isItemsSelected ? '#ffff00' : '#ffffff';
            ctx.fillText('< >', 590, itemsY);
        }

        // Items Mode description (when selected)
        if (isItemsSelected) {
            ctx.font = '12px Courier New';
            ctx.fillStyle = '#9900ff';
            ctx.textAlign = 'center';
            ctx.fillText('ワープゾーン・デスゾーン・回復アイテム・特殊武器が出現！', GAME_WIDTH / 2, itemsY + 22);
        }

        // V4.2: ITEM CONFIG button - positioned BELOW Items Mode toggle (separated to avoid tap conflicts)
        // Calculate button selections based on Items Mode
        const itemConfigSelection = 7;  // Only used when Items Mode is ON
        const startButtonSelection = this.settings.itemsMode ? 8 : 7;
        const backButtonSelection = this.settings.itemsMode ? 9 : 8;

        if (this.settings.itemsMode) {
            // V4.2: Show ITEM CONFIG as a separate centered button below Items Mode
            const isConfigSelected = this.setupSelection === itemConfigSelection;

            // Draw centered button below Items Mode row (with enough spacing to avoid tap conflicts)
            const configBtnWidth = 180;
            const configBtnHeight = 32;
            const configBtnX = GAME_WIDTH / 2 - configBtnWidth / 2;  // Centered
            const configBtnY = itemsY + 35;  // Below Items Mode toggle with clear separation

            ctx.fillStyle = isConfigSelected ? '#6600ff' : '#440088';
            ctx.fillRect(configBtnX, configBtnY, configBtnWidth, configBtnHeight);
            ctx.strokeStyle = isConfigSelected ? '#ff00ff' : '#9900ff';
            ctx.lineWidth = isConfigSelected ? 2 : 1;
            ctx.strokeRect(configBtnX, configBtnY, configBtnWidth, configBtnHeight);

            ctx.font = isConfigSelected ? 'bold 14px Courier New' : '13px Courier New';
            ctx.fillStyle = isConfigSelected ? '#ffffff' : '#ccaaff';
            ctx.textAlign = 'center';

            // Count enabled items
            const enabledCount = Object.values(this.settings.enabledItems).filter(v => v).length;
            const totalCount = Object.keys(this.settings.enabledItems).length;
            ctx.fillText(`⚙ ITEM CONFIG (${enabledCount}/${totalCount})`, configBtnX + configBtnWidth / 2, configBtnY + 21);

            // V4.2: Show hint for online mode guests
            if (this.isOnlineMode && !this.isHost) {
                ctx.font = '10px Courier New';
                ctx.fillStyle = '#888800';
                ctx.textAlign = 'center';
                ctx.fillText('※ ホストの設定が使用されます', GAME_WIDTH / 2, configBtnY + configBtnHeight + 15);
            }
        }

        // Buttons row
        const btnY = GAME_HEIGHT - 50;

        // BACK button (left side) - V4.1: Dynamic selection
        const backBtnX = GAME_WIDTH / 2 - 220;
        const isBackSelected = this.setupSelection === backButtonSelection;
        ctx.fillStyle = isBackSelected ? '#666666' : '#444444';
        ctx.fillRect(backBtnX, btnY, 100, 50);
        ctx.strokeStyle = isBackSelected ? '#ffffff' : '#888888';
        ctx.lineWidth = 2;
        ctx.strokeRect(backBtnX, btnY, 100, 50);
        ctx.font = 'bold 16px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('BACK', backBtnX + 50, btnY + 32);

        // START BATTLE / READY button (right side) - V4.1: Dynamic selection
        const startBtnX = GAME_WIDTH / 2 - 100;
        const isStartSelected = this.setupSelection === startButtonSelection;

        if (this.isOnlineMode) {
            // Online mode: Show READY button
            if (this.myReady) {
                // Already ready - show waiting state
                ctx.fillStyle = '#006600';
                ctx.fillRect(startBtnX, btnY, 200, 50);
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                ctx.strokeRect(startBtnX, btnY, 200, 50);
                ctx.font = 'bold 20px Courier New';
                ctx.fillStyle = '#00ff00';
                ctx.textAlign = 'center';
                ctx.fillText('READY!', GAME_WIDTH / 2, btnY + 32);
            } else {
                // Not ready yet - show READY button
                ctx.fillStyle = isStartSelected ? '#0088ff' : '#0066cc';
                ctx.fillRect(startBtnX, btnY, 200, 50);
                ctx.strokeStyle = isStartSelected ? '#00ffff' : '#00aaff';
                ctx.lineWidth = 2;
                ctx.strokeRect(startBtnX, btnY, 200, 50);
                ctx.font = 'bold 20px Courier New';
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.fillText('READY', GAME_WIDTH / 2, btnY + 32);
            }

            // Show Ready status above buttons
            const statusY = btnY - 60;
            ctx.font = '16px Courier New';
            ctx.textAlign = 'center';

            // My status
            ctx.fillStyle = this.myReady ? '#00ff00' : '#ff6666';
            const myStatus = this.myReady ? '● YOU: READY' : '○ YOU: WAITING';
            ctx.fillText(myStatus, GAME_WIDTH / 2 - 100, statusY);

            // Opponent status
            ctx.fillStyle = this.opponentReady ? '#00ff00' : '#ff6666';
            const opponentStatus = this.opponentReady ? '● OPPONENT: READY' : '○ OPPONENT: WAITING';
            ctx.fillText(opponentStatus, GAME_WIDTH / 2 + 100, statusY);

            // Show countdown timer if one player is ready
            if (this.readyCountdownStart > 0) {
                const elapsed = Date.now() - this.readyCountdownStart;
                const remaining = Math.max(0, Math.ceil((this.READY_TIMEOUT - elapsed) / 1000));
                ctx.font = 'bold 24px Courier New';
                ctx.fillStyle = remaining <= 3 ? '#ff0000' : '#ffff00';
                ctx.fillText(`Battle starts in ${remaining}...`, GAME_WIDTH / 2, statusY - 30);
            }
        } else {
            // Offline mode: Show START BATTLE button
            ctx.fillStyle = isStartSelected ? '#0088ff' : '#0066cc';
            ctx.fillRect(startBtnX, btnY, 200, 50);
            ctx.strokeStyle = isStartSelected ? '#00ffff' : '#00aaff';
            ctx.lineWidth = 2;
            ctx.strokeRect(startBtnX, btnY, 200, 50);
            ctx.font = 'bold 20px Courier New';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText('START BATTLE', GAME_WIDTH / 2, btnY + 32);
        }

        // Instructions
        ctx.font = '14px Courier New';
        ctx.fillStyle = '#666666';
        if (this.isOnlineMode) {
            ctx.fillText('Arrow Keys to adjust, READY when done!', GAME_WIDTH / 2, GAME_HEIGHT - 20);
        } else {
            ctx.fillText('Arrow Keys to adjust, ESC to go back', GAME_WIDTH / 2, GAME_HEIGHT - 20);
        }
    }

    // V4: Item Configuration Screen
    renderItemConfig() {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Title
        ctx.font = 'bold 28px Courier New';
        ctx.fillStyle = '#ff00ff';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#ff00ff';
        ctx.shadowBlur = 15;
        ctx.fillText('⚙ ITEM CONFIG', GAME_WIDTH / 2, 45);
        ctx.shadowBlur = 0;

        ctx.font = '14px Courier New';
        ctx.fillStyle = '#aaaaaa';
        ctx.fillText('Select items to enable/disable', GAME_WIDTH / 2, 70);

        // V4.2: Legend for weapon stats (visual bars) - improved layout
        ctx.font = 'bold 12px Courier New';
        ctx.textAlign = 'left';
        const legendY = 88;
        // Power legend
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(GAME_WIDTH / 2 - 120, legendY - 8, 30, 10);
        ctx.fillStyle = '#cccccc';
        ctx.fillText('= 威力', GAME_WIDTH / 2 - 85, legendY);
        // Rate legend
        ctx.fillStyle = '#00ccff';
        ctx.fillRect(GAME_WIDTH / 2 + 30, legendY - 8, 30, 10);
        ctx.fillStyle = '#cccccc';
        ctx.fillText('= 連射', GAME_WIDTH / 2 + 65, legendY);

        // Item list - organized in two columns
        const itemKeys = Object.keys(this.settings.enabledItems);
        const leftColumnItems = itemKeys.slice(0, 7);   // First 7 items
        const rightColumnItems = itemKeys.slice(7);     // Remaining items

        const startY = 110;
        const rowHeight = 36;

        // V4.2: Define display names, colors, and stats for items
        // power: 1-5 (威力バー), rate: 1-5 (連射バー)
        const itemDisplayInfo = {
            HP: { name: 'HP回復', color: '#ff6666', desc: '+50HP', power: 0, rate: 0 },
            RAPID: { name: '連射UP', color: '#ffff00', desc: '2倍速', power: 0, rate: 0 },
            MEGA: { name: 'メガ弾', color: '#00ff00', desc: '2.5倍', power: 3, rate: 0 },
            SHIELD: { name: 'シールド', color: '#00ffff', desc: '無敵', power: 0, rate: 0 },
            W_BAZOOKA: { name: 'バズーカ', color: '#ff6600', desc: '爆発', power: 2, rate: 2 },
            W_MACHINEGUN: { name: 'マシンガン', color: '#ffff00', desc: '連射', power: 1, rate: 5 },
            W_SPREAD: { name: 'スプレッド', color: '#00ff99', desc: '3方向', power: 2, rate: 3 },
            W_SWORD: { name: '斬撃', color: '#ff00ff', desc: '近接', power: 3, rate: 2 },
            W_HOMING: { name: '誘導弾', color: '#ff3333', desc: '追尾', power: 3, rate: 1 },
            W_CLONE: { name: '分身', color: '#9933ff', desc: '撹乱', power: 0, rate: 0 },
            W_TIGER: { name: '虎召喚', color: '#ff9900', desc: '大型', power: 4, rate: 1 },
            W_AERIAL: { name: '空爆', color: '#00ffff', desc: '4発', power: 5, rate: 1 },
            W_DRAGON: { name: '龍召喚', color: '#00ff66', desc: '大型', power: 3, rate: 1 },   // V4.3
            W_METEOR: { name: 'メテオ', color: '#ff6600', desc: '範囲', power: 3, rate: 1 },   // V4.3
            W_BEAST: { name: '魔獣召喚', color: '#ff33ff', desc: 'AI追尾', power: 3, rate: 1 }   // V4.3
        };

        // Draw left column (powerups + original weapons)
        const leftX = 30;
        leftColumnItems.forEach((key, i) => {
            const isSelected = this.itemConfigSelection === i;
            const isEnabled = this.settings.enabledItems[key];
            const info = itemDisplayInfo[key] || { name: key, color: '#ffffff', desc: '' };
            const y = startY + i * rowHeight;

            this.drawItemConfigRow(ctx, leftX, y, key, info, isSelected, isEnabled);
        });

        // Draw right column (new weapons)
        const rightX = 300;
        rightColumnItems.forEach((key, i) => {
            const selectionIndex = leftColumnItems.length + i;
            const isSelected = this.itemConfigSelection === selectionIndex;
            const isEnabled = this.settings.enabledItems[key];
            const info = itemDisplayInfo[key] || { name: key, color: '#ffffff', desc: '' };
            const y = startY + i * rowHeight;

            this.drawItemConfigRow(ctx, rightX, y, key, info, isSelected, isEnabled);
        });

        // Section labels
        ctx.font = 'bold 11px Courier New';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('── パワーアップ ──', leftX + 125, startY - 12);
        ctx.fillText('── V4 新武器 ──', rightX + 125, startY - 12);

        // Buttons at bottom
        const btnY = GAME_HEIGHT - 70;
        const totalItems = itemKeys.length;

        // Button layout - centered
        const btnWidth = 90;
        const btnGap = 20;
        const totalBtnWidth = btnWidth * 3 + btnGap * 2;
        const btnStartX = (GAME_WIDTH - totalBtnWidth) / 2;

        // ALL ON button
        const allOnSelected = this.itemConfigSelection === totalItems;
        ctx.fillStyle = allOnSelected ? '#006600' : '#333333';
        ctx.fillRect(btnStartX, btnY, btnWidth, 40);
        ctx.strokeStyle = allOnSelected ? '#00ff00' : '#666666';
        ctx.lineWidth = 2;
        ctx.strokeRect(btnStartX, btnY, btnWidth, 40);
        ctx.font = allOnSelected ? 'bold 14px Courier New' : '14px Courier New';
        ctx.fillStyle = '#00ff00';
        ctx.textAlign = 'center';
        ctx.fillText('ALL ON', btnStartX + btnWidth/2, btnY + 26);

        // ALL OFF button
        const allOffSelected = this.itemConfigSelection === totalItems + 1;
        ctx.fillStyle = allOffSelected ? '#660000' : '#333333';
        ctx.fillRect(btnStartX + btnWidth + btnGap, btnY, btnWidth, 40);
        ctx.strokeStyle = allOffSelected ? '#ff0000' : '#666666';
        ctx.strokeRect(btnStartX + btnWidth + btnGap, btnY, btnWidth, 40);
        ctx.font = allOffSelected ? 'bold 14px Courier New' : '14px Courier New';
        ctx.fillStyle = '#ff6666';
        ctx.fillText('ALL OFF', btnStartX + btnWidth + btnGap + btnWidth/2, btnY + 26);

        // BACK button
        const backSelected = this.itemConfigSelection === totalItems + 2;
        ctx.fillStyle = backSelected ? '#444444' : '#222222';
        ctx.fillRect(btnStartX + (btnWidth + btnGap) * 2, btnY, btnWidth, 40);
        ctx.strokeStyle = backSelected ? '#ffffff' : '#666666';
        ctx.strokeRect(btnStartX + (btnWidth + btnGap) * 2, btnY, btnWidth, 40);
        ctx.font = backSelected ? 'bold 14px Courier New' : '14px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('BACK', btnStartX + (btnWidth + btnGap) * 2 + btnWidth/2, btnY + 26);

        // Stats
        const enabledCount = Object.values(this.settings.enabledItems).filter(v => v).length;
        ctx.font = '12px Courier New';
        ctx.fillStyle = '#aaaaaa';
        ctx.textAlign = 'center';
        ctx.fillText(`${enabledCount}/${totalItems} items enabled`, GAME_WIDTH / 2, GAME_HEIGHT - 15);

        // Instructions
        ctx.fillText('↑↓: Select  ←: OFF  →: ON  Enter: Toggle/Confirm', GAME_WIDTH / 2, GAME_HEIGHT - 35);
    }

    // Helper method to draw item config row - V4.2 improved layout
    drawItemConfigRow(ctx, x, y, key, info, isSelected, isEnabled) {
        const rowWidth = 250;
        const rowHeight = 30;

        // Background highlight if selected
        if (isSelected) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fillRect(x - 5, y - 10, rowWidth, rowHeight);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.strokeRect(x - 5, y - 10, rowWidth, rowHeight);
        }

        // Item color indicator (circle)
        ctx.beginPath();
        ctx.arc(x + 10, y + 5, 8, 0, Math.PI * 2);
        ctx.fillStyle = isEnabled ? info.color : '#444444';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#ffffff' : '#666666';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();

        // Item name
        ctx.font = isSelected ? 'bold 13px Courier New' : '13px Courier New';
        ctx.fillStyle = isSelected ? '#ffffff' : (isEnabled ? '#dddddd' : '#666666');
        ctx.textAlign = 'left';
        ctx.fillText(info.name, x + 25, y + 9);

        // V4.2: Visual power/rate bars (only for weapons with stats)
        if (info.power > 0 || info.rate > 0) {
            const barX = x + 105;
            const barWidth = 55;
            const barHeight = 8;

            // Power bar (orange) - top
            ctx.fillStyle = '#222222';
            ctx.fillRect(barX, y - 3, barWidth, barHeight);
            if (info.power > 0) {
                const powerWidth = (info.power / 5) * barWidth;
                ctx.fillStyle = isEnabled ? '#ff6600' : '#442200';
                ctx.fillRect(barX, y - 3, powerWidth, barHeight);
            }
            ctx.strokeStyle = isEnabled ? '#ff9933' : '#333333';
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, y - 3, barWidth, barHeight);

            // Rate bar (cyan) - bottom
            ctx.fillStyle = '#222222';
            ctx.fillRect(barX, y + 8, barWidth, barHeight);
            if (info.rate > 0) {
                const rateWidth = (info.rate / 5) * barWidth;
                ctx.fillStyle = isEnabled ? '#00ccff' : '#003344';
                ctx.fillRect(barX, y + 8, rateWidth, barHeight);
            }
            ctx.strokeStyle = isEnabled ? '#33ccff' : '#333333';
            ctx.strokeRect(barX, y + 8, barWidth, barHeight);
        } else {
            // Non-weapon items: show description
            ctx.font = '11px Courier New';
            ctx.fillStyle = isEnabled ? '#888888' : '#555555';
            ctx.fillText(info.desc, x + 105, y + 9);
        }

        // ON/OFF indicator - simplified
        ctx.font = isSelected ? 'bold 12px Courier New' : '11px Courier New';
        ctx.textAlign = 'right';
        const statusX = x + rowWidth - 10;
        if (isSelected) {
            // Show toggle hint when selected
            ctx.fillStyle = isEnabled ? '#00ff00' : '#ff3333';
            ctx.fillText(isEnabled ? '◀ ON' : 'OFF ▶', statusX, y + 8);
        } else {
            if (isEnabled) {
                ctx.fillStyle = '#00ff00';
                ctx.fillText('ON', statusX, y + 8);
            } else {
                ctx.fillStyle = '#555555';
                ctx.fillText('OFF', statusX, y + 8);
            }
        }
        ctx.textAlign = 'left'; // Reset
    }

    renderBattle() {
        const ctx = this.ctx;
        const stage = STAGES[this.currentStage];

        // Apply screen shake
        const shake = ScreenEffects.getShakeOffset();
        ctx.save();
        ctx.translate(shake.x, shake.y);

        // Background - Use AI-generated image if available
        const bgImage = SpriteLoader.getBackground(stage.name);
        if (bgImage) {
            // Draw photorealistic AI-generated background
            ctx.drawImage(bgImage, -shake.x, -shake.y, GAME_WIDTH + Math.abs(shake.x) * 2, GAME_HEIGHT + Math.abs(shake.y) * 2);
            // Add slight darkening overlay for better robot visibility
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(-shake.x, -shake.y, GAME_WIDTH + Math.abs(shake.x) * 2, GAME_HEIGHT + Math.abs(shake.y) * 2);
        } else {
            // Fallback to solid color + procedural elements
            ctx.fillStyle = stage.bgColor;
            ctx.fillRect(-shake.x, -shake.y, GAME_WIDTH + Math.abs(shake.x) * 2, GAME_HEIGHT + Math.abs(shake.y) * 2);
            // Draw stage-specific background elements
            this.renderStageBackground(stage);
        }

        // Draw platforms
        for (const platform of stage.platforms) {
            ctx.fillStyle = platform.type === 'solid' ? '#4d4d6a' : 'rgba(77, 77, 106, 0.6)';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

            // Platform top highlight
            ctx.fillStyle = platform.type === 'solid' ? '#6d6d8a' : 'rgba(109, 109, 138, 0.6)';
            ctx.fillRect(platform.x, platform.y, platform.width, 4);
        }

        // ====================================================================
        // ITEMS MODE: Draw Zones and Items
        // ====================================================================
        if (this.settings.itemsMode) {
            // Draw death zones (red danger areas)
            for (const death of stage.deathZones) {
                this.renderDeathZone(ctx, death);
            }

            // Draw dynamic warp zones (static zones removed for better UX)
            for (const warp of (this.activeWarpZones || [])) {
                const age = Date.now() - warp.spawnTime;
                const totalLifetime = warp.lifetime + warp.warningTime;
                const fadeStart = totalLifetime - 1500; // Start fading 1.5s before despawn

                let alpha = 1.0;
                let isWarning = !warp.isActive;

                // Fade out near end
                if (age > fadeStart) {
                    alpha = 1.0 - (age - fadeStart) / 1500;
                }

                // During warning: blink effect
                if (isWarning) {
                    const blinkRate = 8; // Blinks per second
                    const blink = Math.sin(age * 0.001 * blinkRate * Math.PI * 2);
                    alpha = 0.3 + blink * 0.3; // Pulsing between 0.0 and 0.6
                }

                this.renderWarpZone(ctx, warp.entry, alpha, isWarning);
            }

            // Draw items
            for (const item of this.activeItems) {
                item.render(ctx);
            }

            // Draw powerup indicators on robots
            this.renderPowerupIndicators(ctx, this.player);
            this.renderPowerupIndicators(ctx, this.enemy);
        }

        // Draw beams
        for (const beam of this.beams) {
            beam.render(ctx);
        }

        // V4: Draw weapon projectiles
        for (const proj of this.weaponProjectiles) {
            proj.render(ctx);
        }

        // V4.3: Draw beasts
        for (const beast of this.activeBeasts) {
            beast.render(ctx);
        }

        // Draw robots
        this.player.render(ctx);
        this.enemy.render(ctx);

        // V4.3: Draw dizzy stars effect (after robot render, before HUD)
        this.player.renderDizzyStars(ctx);
        this.enemy.renderDizzyStars(ctx);

        // Draw charge indicator if player is charging
        if (this.player.isCharging) {
            this.renderChargeIndicator(ctx, this.player);
        }

        // Draw charge indicator if enemy is charging (important for online mode)
        if (this.enemy.isCharging) {
            this.renderChargeIndicator(ctx, this.enemy);
        }

        // Draw effects
        for (const effect of this.effects) {
            effect.render(ctx);
        }

        // V4: Draw weapon announcement (on top of everything)
        WeaponAnnouncement.render(ctx);

        // HUD
        // Player HP
        this.ui.drawHPBar(20, 20, 180, 25, this.player.hp, this.player.maxHp, '#ff3333');
        ctx.font = '12px Courier New';
        ctx.fillStyle = '#ff3333';
        ctx.textAlign = 'left';
        ctx.fillText('PLAYER', 20, 60);

        // Enemy HP
        this.ui.drawHPBar(GAME_WIDTH - 200, 20, 180, 25, this.enemy.hp, this.enemy.maxHp, '#3333ff');
        ctx.fillStyle = '#3333ff';
        ctx.textAlign = 'right';
        ctx.fillText(this.isOnlineMode ? 'OPPONENT' : 'CPU', GAME_WIDTH - 20, 60);

        // Stage name
        ctx.font = '16px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(stage.displayName, GAME_WIDTH / 2, 35);

        // Draw particles
        ParticleSystem.render(ctx);

        // Debug labels removed for production

        // =====================================================
        // BATTLE COUNTDOWN DISPLAY: 3-2-1-FIGHT
        // =====================================================
        if (this.battleCountdownStart > 0) {
            const elapsed = Date.now() - this.battleCountdownStart;
            const countdownValue = 3 - Math.floor(elapsed / 1000);

            // Only show during countdown or shortly after for FIGHT!
            if (countdownValue > 0 || elapsed < 3800) {
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Semi-transparent overlay during countdown only
                if (countdownValue > 0) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                }

                // Calculate pulse animation
                const pulsePhase = (elapsed % 1000) / 1000;
                const scale = 1 + Math.sin(pulsePhase * Math.PI) * 0.2;

                ctx.translate(GAME_WIDTH / 2, GAME_HEIGHT / 2);
                ctx.scale(scale, scale);

                if (countdownValue > 0) {
                    // Countdown numbers: 3, 2, 1
                    ctx.font = 'bold 200px Impact, sans-serif';
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 30;
                    ctx.fillStyle = '#ffffff';
                    ctx.strokeStyle = '#00ffff';
                    ctx.lineWidth = 4;
                    ctx.strokeText(countdownValue.toString(), 0, 0);
                    ctx.fillText(countdownValue.toString(), 0, 0);
                } else {
                    // FIGHT! text (fade out)
                    const fightElapsed = elapsed - 3000;
                    const alpha = Math.max(0, 1 - fightElapsed / 800);
                    ctx.globalAlpha = alpha;
                    ctx.font = 'bold 100px Impact, sans-serif';
                    ctx.shadowColor = '#ff0000';
                    ctx.shadowBlur = 40;
                    ctx.fillStyle = '#ffff00';
                    ctx.strokeStyle = '#ff0000';
                    ctx.lineWidth = 6;
                    ctx.strokeText('FIGHT!', 0, 0);
                    ctx.fillText('FIGHT!', 0, 0);
                }

                ctx.restore();
            }

            // Reset countdown start after animation completes
            if (elapsed >= 3800) {
                this.battleCountdownStart = 0;
            }
        }

        // Restore from shake transform
        ctx.restore();

        // Draw screen flash (outside shake transform)
        ScreenEffects.renderFlash(ctx);
    }

    renderChargeIndicator(ctx, robot) {
        const chargeLevel = robot.chargeLevel;
        const centerX = robot.x + robot.width / 2;
        const centerY = robot.y + robot.height / 2;

        // Determine color based on charge level
        let color, glowColor;
        if (chargeLevel >= 1.0) {
            color = '#ff0000';
            glowColor = 'rgba(255, 0, 0, 0.5)';
        } else if (chargeLevel >= 0.66) {
            color = '#ff6600';
            glowColor = 'rgba(255, 102, 0, 0.4)';
        } else if (chargeLevel >= 0.33) {
            color = '#ffff00';
            glowColor = 'rgba(255, 255, 0, 0.3)';
        } else {
            color = '#00ffff';
            glowColor = 'rgba(0, 255, 255, 0.2)';
        }

        // Draw pulsing aura
        const pulsePhase = (Date.now() % 500) / 500;
        const pulseSize = 1 + Math.sin(pulsePhase * Math.PI * 2) * 0.2;
        const auraRadius = (40 + chargeLevel * 30) * pulseSize;

        ctx.save();

        // Outer glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, auraRadius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.5, glowColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // Charge bar below robot
        const barWidth = 60;
        const barHeight = 8;
        const barX = centerX - barWidth / 2;
        const barY = robot.y + robot.height + 10;

        // Background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);

        // Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);

        // Fill
        ctx.fillStyle = color;
        ctx.fillRect(barX, barY, barWidth * chargeLevel, barHeight);

        // MAX text when fully charged
        if (chargeLevel >= 1.0) {
            // Flashing effect
            const flashAlpha = 0.5 + Math.sin(Date.now() / 100) * 0.5;

            ctx.font = 'bold 16px Courier New';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 255, 0, ${flashAlpha})`;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.strokeText('MAX!', centerX, barY - 5);
            ctx.fillText('MAX!', centerX, barY - 5);

            // Electric sparks around the robot
            for (let i = 0; i < 3; i++) {
                const sparkAngle = Math.random() * Math.PI * 2;
                const sparkDist = 30 + Math.random() * 20;
                const sparkX = centerX + Math.cos(sparkAngle) * sparkDist;
                const sparkY = centerY + Math.sin(sparkAngle) * sparkDist;

                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(sparkX, sparkY);
                ctx.lineTo(sparkX + (Math.random() - 0.5) * 15, sparkY + (Math.random() - 0.5) * 15);
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    renderStageBackground(stage) {
        const ctx = this.ctx;

        switch (stage.name) {
            case 'Urban City':
                // Buildings
                ctx.fillStyle = '#2d2d44';
                ctx.fillRect(50, 200, 80, 320);
                ctx.fillRect(150, 150, 100, 370);
                ctx.fillRect(550, 180, 90, 340);
                ctx.fillRect(660, 220, 100, 300);
                // Windows
                ctx.fillStyle = '#ffff00';
                for (let i = 0; i < 5; i++) {
                    ctx.fillRect(60, 220 + i * 50, 15, 20);
                    ctx.fillRect(560, 200 + i * 50, 15, 20);
                }
                break;

            case 'Pyramid':
                // Sun
                ctx.fillStyle = '#ffcc00';
                ctx.beginPath();
                ctx.arc(100, 100, 50, 0, Math.PI * 2);
                ctx.fill();
                // Pyramid silhouette
                ctx.fillStyle = '#d4a574';
                ctx.beginPath();
                ctx.moveTo(200, 520);
                ctx.lineTo(400, 100);
                ctx.lineTo(600, 520);
                ctx.closePath();
                ctx.fill();
                break;

            case 'Parthenon':
                // Clouds
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(100, 80, 30, 0, Math.PI * 2);
                ctx.arc(130, 80, 40, 0, Math.PI * 2);
                ctx.arc(170, 80, 30, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'Factory':
                // Gears
                ctx.strokeStyle = '#95a5a6';
                ctx.lineWidth = 8;
                ctx.beginPath();
                ctx.arc(350, 300, 80, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(500, 350, 60, 0, Math.PI * 2);
                ctx.stroke();
                // Smoke stacks
                ctx.fillStyle = '#bdc3c7';
                ctx.fillRect(100, 100, 20, 100);
                ctx.fillRect(700, 50, 20, 150);
                break;

            case 'Cave':
                // Crystals
                ctx.fillStyle = 'rgba(0, 255, 204, 0.4)';
                ctx.beginPath();
                ctx.moveTo(150, 150);
                ctx.lineTo(170, 250);
                ctx.lineTo(130, 250);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = 'rgba(255, 0, 255, 0.4)';
                ctx.beginPath();
                ctx.moveTo(600, 100);
                ctx.lineTo(620, 200);
                ctx.lineTo(580, 200);
                ctx.closePath();
                ctx.fill();
                // Stalactites
                ctx.fillStyle = '#444';
                for (let i = 0; i < 10; i++) {
                    const x = 50 + i * 80;
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x + 15, 40 + Math.random() * 30);
                    ctx.lineTo(x - 15, 40 + Math.random() * 30);
                    ctx.closePath();
                    ctx.fill();
                }
                break;

            case 'Neo City':
                // Neon buildings
                ctx.fillStyle = '#1a0a30';
                ctx.fillRect(30, 180, 100, 420);
                ctx.fillRect(160, 120, 120, 480);
                ctx.fillRect(320, 80, 150, 520);
                ctx.fillRect(510, 150, 110, 450);
                ctx.fillRect(660, 200, 100, 400);
                // Neon lights
                ctx.fillStyle = '#ff00ff';
                ctx.fillRect(35, 200, 20, 30);
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(180, 180, 30, 40);
                ctx.fillStyle = '#ff00ff';
                ctx.fillRect(340, 120, 40, 50);
                // Flying cars (lines)
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(200, 100);
                ctx.lineTo(400, 80);
                ctx.stroke();
                break;
        }
    }

    renderPauseOverlay() {
        const ctx = this.ctx;

        // Dim background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Pause text
        ctx.font = 'bold 48px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', GAME_WIDTH / 2, GAME_HEIGHT / 2);

        ctx.font = '18px Courier New';
        ctx.fillText('Press ESC or P to resume', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
    }

    // KO演出の描画
    renderKO() {
        const ctx = this.ctx;

        // まず通常のバトル画面を描画
        this.renderBattle();

        // 画面全体を少し暗くする（フラッシュ効果）
        const flashProgress = Math.min(this.koTimer / 200, 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * (1 - flashProgress)})`;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // KOエフェクトを描画
        for (const effect of this.koEffects) {
            effect.render(ctx);
        }

        // KO!テキスト（スケールアニメーション付き）
        if (this.koTextScale > 0) {
            ctx.save();
            ctx.translate(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50);
            ctx.scale(this.koTextScale, this.koTextScale);

            // 外枠
            ctx.font = 'bold 72px Courier New';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 8;
            ctx.strokeText('KO!', 0, 0);

            // グラデーション塗り
            const gradient = ctx.createLinearGradient(-80, -40, 80, 40);
            gradient.addColorStop(0, '#FF0000');
            gradient.addColorStop(0.5, '#FFFF00');
            gradient.addColorStop(1, '#FF0000');
            ctx.fillStyle = gradient;
            ctx.fillText('KO!', 0, 0);

            // ハイライト
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.strokeText('KO!', 0, 0);

            ctx.restore();
        }

        // 勝者表示（少し遅れて表示）
        if (this.koTimer > 500) {
            let winnerText;
            if (this.winner === 'player') {
                winnerText = 'YOU WIN!';
            } else {
                winnerText = this.isOnlineMode ? 'OPPONENT WINS!' : 'CPU WINS!';
            }
            const winnerColor = this.winner === 'player' ? '#FF3333' : '#3333FF';

            ctx.font = 'bold 36px Courier New';
            ctx.textAlign = 'center';
            ctx.fillStyle = winnerColor;
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.fillText(winnerText, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
            ctx.strokeText(winnerText, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
        }
    }

    renderResult() {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Winner announcement
        const isPlayerWinner = this.winner === 'player';

        ctx.font = 'bold 48px Courier New';
        ctx.fillStyle = isPlayerWinner ? '#ff3333' : '#3333ff';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.fillText(isPlayerWinner ? 'YOU WIN!' : 'YOU LOSE...', GAME_WIDTH / 2, 100);
        ctx.strokeText(isPlayerWinner ? 'YOU WIN!' : 'YOU LOSE...', GAME_WIDTH / 2, 100);

        // Get sprites for both robots
        // Winner: idle/standing, Loser: ko
        const winnerSprite = SpriteLoader.getSprite(isPlayerWinner, 'idle');
        const loserSprite = SpriteLoader.getSprite(!isPlayerWinner, 'ko');

        // Robot positions - winner on left, loser on right
        const winnerX = 120;
        const loserX = 480;
        const robotY = 140;
        const robotWidth = 180;
        const robotHeight = 240;

        // Draw winner robot (standing, idle state)
        ctx.save();
        ctx.shadowColor = isPlayerWinner ? '#FF4400' : '#0066FF';
        ctx.shadowBlur = 25;

        if (winnerSprite) {
            // Sprite native directions:
            // - Player (red) faces RIGHT, Enemy (blue) faces LEFT
            // Winner should face toward center (toward loser)
            if (isPlayerWinner) {
                // Player won - red robot on left, should face RIGHT (native) → no flip
                ctx.drawImage(winnerSprite, winnerX, robotY, robotWidth, robotHeight);
            } else {
                // Enemy won - blue robot on left, should face RIGHT → flip needed
                ctx.save();
                ctx.translate(winnerX + robotWidth / 2, robotY + robotHeight / 2);
                ctx.scale(-1, 1);
                ctx.drawImage(winnerSprite, -robotWidth / 2, -robotHeight / 2, robotWidth, robotHeight);
                ctx.restore();
            }
        }
        ctx.restore();

        // Draw "WINNER" label above winner
        ctx.font = 'bold 18px Courier New';
        ctx.fillStyle = '#ffff00';
        ctx.fillText('WINNER', winnerX + robotWidth / 2, robotY - 10);

        // Draw loser robot (KO state, lying down)
        ctx.save();
        ctx.shadowColor = !isPlayerWinner ? '#FF4400' : '#0066FF';
        ctx.shadowBlur = 15;
        ctx.globalAlpha = 0.8;  // Slightly faded

        if (loserSprite) {
            // Loser should face toward center (toward winner)
            if (!isPlayerWinner) {
                // Player lost - red robot on right, should face LEFT → flip needed
                ctx.save();
                ctx.translate(loserX + robotWidth / 2, robotY + robotHeight / 2);
                ctx.scale(-1, 1);
                ctx.drawImage(loserSprite, -robotWidth / 2, -robotHeight / 2, robotWidth, robotHeight);
                ctx.restore();
            } else {
                // Enemy lost - blue robot on right, should face LEFT (native) → no flip
                ctx.drawImage(loserSprite, loserX, robotY, robotWidth, robotHeight);
            }
        }
        ctx.restore();

        // Draw "K.O." label above loser
        ctx.font = 'bold 18px Courier New';
        ctx.fillStyle = '#ff0000';
        ctx.fillText('K.O.', loserX + robotWidth / 2, robotY - 10);

        // VS text between robots
        ctx.font = 'bold 36px Courier New';
        ctx.fillStyle = '#888888';
        ctx.fillText('VS', GAME_WIDTH / 2, robotY + robotHeight / 2);

        // Online mode rematch UI
        if (this.isOnlineMode) {
            // If waiting for opponent's response
            if (this.rematchWaitingResponse && !this.rematchRequestReceived) {
                ctx.font = 'bold 18px Courier New';
                ctx.fillStyle = '#00ffff';
                ctx.fillText('相手の応答を待っています...', GAME_WIDTH / 2, 440);

                // Animated dots
                const dots = '.'.repeat((Math.floor(Date.now() / 500) % 3) + 1);
                ctx.fillText(dots, GAME_WIDTH / 2, 470);

                // Cancel option
                ctx.font = '16px Courier New';
                ctx.fillStyle = '#888888';
                ctx.fillText('TITLE で戻る', GAME_WIDTH / 2, 520);

                // Draw TITLE button only
                const titleY = 550;
                const isSelected = this.menuSelection === 2;
                ctx.font = isSelected ? 'bold 20px Courier New' : '18px Courier New';
                ctx.fillStyle = isSelected ? '#ffff00' : '#888888';
                ctx.fillText((isSelected ? '> ' : '  ') + 'TITLE', GAME_WIDTH / 2, titleY);
                return;
            }

            // If received rematch request from opponent
            if (this.rematchRequestReceived && !this.rematchRequestSent) {
                ctx.font = 'bold 20px Courier New';
                ctx.fillStyle = '#ffff00';
                ctx.fillText('再戦依頼が来ています', GAME_WIDTH / 2, 440);

                ctx.font = '18px Courier New';
                ctx.fillStyle = '#ffffff';
                ctx.fillText('再戦しますか？', GAME_WIDTH / 2, 470);

                // Accept button (highlight if selected)
                const okSelected = this.rematchSelection === 0;
                ctx.fillStyle = okSelected ? '#00ff88' : '#00aa44';
                ctx.fillRect(200, 510, 150, 50);
                ctx.strokeStyle = okSelected ? '#ffffff' : '#00ff66';
                ctx.lineWidth = okSelected ? 4 : 2;
                ctx.strokeRect(200, 510, 150, 50);
                ctx.font = 'bold 20px Courier New';
                ctx.fillStyle = okSelected ? '#ffffff' : '#000000';
                ctx.fillText('OK', 275, 542);

                // Reject button (highlight if selected)
                const rejectSelected = this.rematchSelection === 1;
                ctx.fillStyle = rejectSelected ? '#ff5588' : '#aa2244';
                ctx.fillRect(450, 510, 150, 50);
                ctx.strokeStyle = rejectSelected ? '#ffffff' : '#ff3366';
                ctx.lineWidth = rejectSelected ? 4 : 2;
                ctx.strokeRect(450, 510, 150, 50);
                ctx.fillStyle = '#ffffff';
                ctx.fillText('拒否', 525, 542);

                // Keyboard hint
                ctx.font = '14px Courier New';
                ctx.fillStyle = '#888888';
                ctx.fillText('← → で選択、Enter で決定', GAME_WIDTH / 2, 580);
                return;
            }
        }

        // Menu
        const menuItems = ['REMATCH', 'CHANGE SETTINGS', 'TITLE'];
        const startY = 430;

        for (let i = 0; i < menuItems.length; i++) {
            const isSelected = i === this.menuSelection;
            ctx.font = isSelected ? 'bold 20px Courier New' : '18px Courier New';
            ctx.fillStyle = isSelected ? '#ffff00' : '#888888';
            ctx.fillText((isSelected ? '> ' : '  ') + menuItems[i], GAME_WIDTH / 2, startY + i * 40);
        }
    }

    // ========================================================================
    // ONLINE MODE METHODS
    // ========================================================================

    updateOnlineLobby(deltaTime) {
        const input = this.input.getInput();
        if (this.inputCooldown > 0) return;

        // Navigate
        if (input.moveY < -0.5 || this.input.keys['ArrowUp']) {
            this.onlineLobbySelection = Math.max(0, this.onlineLobbySelection - 1);
            this.inputCooldown = 200;
        }
        if (input.moveY > 0.5 || this.input.keys['ArrowDown']) {
            this.onlineLobbySelection = Math.min(2, this.onlineLobbySelection + 1);
            this.inputCooldown = 200;
        }

        // Select
        if (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys['Space']) {
            this.handleOnlineLobbySelect();
            this.inputCooldown = 300;
        }
    }

    handleOnlineLobbyClick(x, y) {
        // Button positions (same as renderOnlineLobby)
        const buttons = [
            { label: 'CREATE ROOM', y: 280 },
            { label: 'JOIN ROOM', y: 350 },
            { label: 'BACK', y: 500 }
        ];

        for (let i = 0; i < buttons.length; i++) {
            const btnY = buttons[i].y;
            if (y >= btnY && y <= btnY + 50 && x >= GAME_WIDTH/2 - 120 && x <= GAME_WIDTH/2 + 120) {
                this.onlineLobbySelection = i;
                this.handleOnlineLobbySelect();
                break;
            }
        }
    }

    async handleOnlineLobbySelect() {
        SoundManager.playMenuSelect();

        switch (this.onlineLobbySelection) {
            case 0: // Create Room
                await this.createOnlineRoom();
                break;
            case 1: // Join Room
                await this.joinOnlineRoom();
                break;
            case 2: // Back
                this.isOnlineMode = false;
                this.state = GameState.TITLE;
                this.menuSelection = 0;
                break;
        }
    }

    async createOnlineRoom() {
        this.onlineStatus = 'Creating room...';
        this.state = GameState.ONLINE_WAITING;

        try {
            if (!this.onlineController) {
                this.onlineController = new OnlineModeController(this);
            }
            this.setupOnlineCallbacks();
            this.roomCode = await this.onlineController.createRoom();
            this.isHost = true;
            this.onlineStatus = `Room: ${this.roomCode}\nWaiting for opponent...`;
        } catch (e) {
            console.error('[Online] Create room failed:', e);
            this.onlineStatus = 'Failed to create room.\nCheck your connection.';
            setTimeout(() => {
                this.state = GameState.ONLINE_LOBBY;
            }, 2000);
        }
    }

    async joinOnlineRoom() {
        const code = prompt('Enter 6-digit Room Code:');
        if (!code) {
            return;  // User cancelled
        }

        // Clean up input: remove spaces, get only digits
        const cleanCode = code.replace(/\s/g, '').replace(/\D/g, '');

        if (cleanCode.length !== 6) {
            this.onlineStatus = 'Invalid code (need 6 digits)';
            return;
        }

        this.roomCodeInput = cleanCode;
        this.onlineStatus = 'Joining room...';
        this.state = GameState.ONLINE_CONNECTING;

        try {
            if (!this.onlineController) {
                this.onlineController = new OnlineModeController(this);
            }
            this.setupOnlineCallbacks();
            await this.onlineController.joinRoom(this.roomCodeInput);
            this.isHost = false;
            this.roomCode = this.roomCodeInput;
            this.onlineStatus = `Joined: ${this.roomCode}\nConnecting...`;
        } catch (e) {
            console.error('[Online] Join room failed:', e);
            this.onlineStatus = e.message || 'Failed to join room';
            setTimeout(() => {
                this.state = GameState.ONLINE_LOBBY;
            }, 2000);
        }
    }

    setupOnlineCallbacks() {
        // Called when P2P connection is established
        this.onOnlineConnected = () => {
            console.log('[Online] Connected! Entering setup...');
            this.onlineStatus = 'Connected! Set your parameters!';

            // Reset Ready states for new match
            this.myReady = false;
            this.opponentReady = false;
            this.opponentParams = null;
            this.readyCountdownStart = 0;

            setTimeout(() => {
                this.state = GameState.SETUP;
            }, 1000);
        };

        // Called when connection is lost
        this.onOnlineDisconnected = () => {
            console.log('[Online] Disconnected');
            this.onlineStatus = 'Connection lost';
            // Reset Ready states
            this.myReady = false;
            this.opponentReady = false;
            this.opponentParams = null;
            this.readyCountdownStart = 0;
            this.state = GameState.ONLINE_LOBBY;
            if (this.onlineController) {
                this.onlineController.disconnect();
                this.onlineController = null;
            }
        };

        // Called when opponent signals battle start (for client)
        this.onNetworkBattleStart = (data) => {
            console.log('[Online] Battle start signal received', data);
            console.log('[CLIENT] About to call startBattle() - isHost:', this.isHost);
            console.log('[CLIENT] Current state:', this.state);

            // IMPORTANT: Only start battle if we're NOT already in BATTLE state
            // This prevents infinite loop when host sends battleStart during rematch
            // while also sending gameState with RESULT
            if (this.state === GameState.BATTLE) {
                console.log('[CLIENT] Already in BATTLE state - ignoring battleStart message');
                return;
            }

            // Apply ALL settings from HOST before starting battle
            // Stage/Background
            if (data.stage !== undefined) {
                this.settings.stage = data.stage;
                console.log('[CLIENT] Stage set to:', this.settings.stage);
            }
            // Difficulty
            if (data.difficulty !== undefined) {
                this.settings.difficulty = data.difficulty;
                console.log('[CLIENT] Difficulty set to:', this.settings.difficulty);
            }
            // Items Mode
            if (data.itemsMode !== undefined) {
                this.settings.itemsMode = data.itemsMode;
                console.log('[CLIENT] Items Mode set to:', this.settings.itemsMode);
            }

            console.log('[CLIENT] Applied host settings:', {
                stage: this.settings.stage,
                difficulty: this.settings.difficulty,
                itemsMode: this.settings.itemsMode
            });

            // Client receives battle start from host
            this.startBattle();
            // DEBUG: Verify robot creation on CLIENT side
            console.log('[CLIENT] After startBattle():');
            console.log(`[CLIENT] this.player: isPlayer=${this.player?.isPlayer}, color=${this.player?.color}, x=${this.player?.x}`);
            console.log(`[CLIENT] this.enemy: isPlayer=${this.enemy?.isPlayer}, color=${this.enemy?.color}, x=${this.enemy?.x}`);
        };

        // Called when opponent signals ready
        this.onOpponentReady = (data) => {
            console.log('[Online] Opponent is ready!', data);
            this.opponentReady = true;
            if (data.params) {
                this.opponentParams = data.params;
                console.log('[Online] Received opponent params:', this.opponentParams);
            }

            // If I'm also ready, check if we should start (host decides)
            if (this.myReady && this.isHost) {
                this.startOnlineBattle();
            }
            // If I'm not ready yet, start countdown
            else if (!this.myReady && this.readyCountdownStart === 0) {
                this.readyCountdownStart = Date.now();
                console.log('[Online] Opponent ready first - starting 10s countdown');
            }
        };

        // Called when receiving opponent's parameters
        this.onOpponentParams = (params) => {
            console.log('[Online] Received opponent params:', params);
            this.opponentParams = params;
        };

        // Called when host signals both players are ready (for client)
        this.onBothReady = (data) => {
            console.log('[Online] Both ready signal received - starting battle!', data);
            // Apply game settings from host
            if (data.stage !== undefined) {
                this.settings.stage = data.stage;
            }
            if (data.itemsMode !== undefined) {
                this.settings.itemsMode = data.itemsMode;
            }
            // V4: Apply host's item settings (host priority)
            if (data.enabledItems !== undefined) {
                this.settings.enabledItems = data.enabledItems;
                console.log('[Online] Applied host item settings:', data.enabledItems);
            }
            // Start battle with opponent's params
            if (data.opponentParams) {
                this.opponentParams = data.opponentParams;
            }
            this.startBattleWithParams();
        };

        // Called when opponent requests a rematch
        this.onRematchRequest = (data) => {
            console.log('[Online] Opponent wants a rematch!');
            this.rematchRequestReceived = true;
            this.rematchSelection = 0; // Default to OK
            // If I also sent a request, both want rematch - go to SETUP
            if (this.rematchRequestSent) {
                console.log('[Online] Both want rematch - going to SETUP');
                this.goToRematchSetup();
            }
        };

        // Called when opponent accepts rematch
        this.onRematchAccept = (data) => {
            console.log('[Online] Opponent accepted rematch!');
            this.rematchWaitingResponse = false;
            this.goToRematchSetup();
        };

        // Called when opponent rejects rematch
        this.onRematchReject = (data) => {
            console.log('[Online] Opponent rejected rematch - returning to title');
            this.rematchWaitingResponse = false;
            this.rematchRequestSent = false;
            this.rematchRequestReceived = false;
            this.rematchSelection = 0;
            // Both go to title
            this.state = GameState.TITLE;
            this.menuSelection = 0;
            SoundManager.playBGM('title');
        };

        // Apply network state (client only)
        this.applyNetworkState = (state) => {
            if (this.isHost) return; // Host controls state

            // DEBUG: Log robot position verification (periodically)
            if (Math.random() < 0.02) { // 2% chance to log (reduce spam)
                console.log('[CLIENT] State sync - Robots:');
                console.log(`[CLIENT] state.player.x=${Math.round(state.player?.x)}, state.enemy.x=${Math.round(state.enemy?.x)}`);
                console.log(`[CLIENT] this.player.isPlayer=${this.player?.isPlayer}, this.enemy.isPlayer=${this.enemy?.isPlayer}`);
            }

            // Update player robot (host's robot - red)
            if (this.player && state.player) {
                this.player.x = state.player.x;
                this.player.y = state.player.y;
                this.player.hp = state.player.hp;
                this.player.velocityX = state.player.velocityX || 0;
                this.player.velocityY = state.player.velocityY || 0;
                this.player.facingRight = state.player.facingRight;
                this.player.isOnGround = state.player.isOnGround;
                if (state.player.state) this.player.state = state.player.state;
                // Sync charge state for proper visual display
                if (state.player.isCharging !== undefined) {
                    this.player.isCharging = state.player.isCharging;
                    this.player.chargeLevel = state.player.chargeLevel || 0;
                }
                // Sync powerup states for visual indicators
                if (state.player.powerups) {
                    this.player.powerups.rapid.active = state.player.powerups.rapid?.active || false;
                    this.player.powerups.rapid.endTime = state.player.powerups.rapid?.endTime || 0;
                    this.player.powerups.mega.active = state.player.powerups.mega?.active || false;
                    this.player.powerups.mega.endTime = state.player.powerups.mega?.endTime || 0;
                    this.player.powerups.shield.active = state.player.powerups.shield?.active || false;
                    this.player.powerups.shield.endTime = state.player.powerups.shield?.endTime || 0;
                }
                // V4: Sync equipped weapon state
                if (state.player.equippedWeapon) {
                    this.player.equippedWeapon.type = state.player.equippedWeapon.type;
                    this.player.equippedWeapon.endTime = state.player.equippedWeapon.endTime;
                    this.player.equippedWeapon.cooldown = state.player.equippedWeapon.cooldown;
                }
            }

            // Update enemy robot (client's robot - blue)
            if (this.enemy && state.enemy) {
                this.enemy.x = state.enemy.x;
                this.enemy.y = state.enemy.y;
                this.enemy.hp = state.enemy.hp;
                this.enemy.velocityX = state.enemy.velocityX || 0;
                this.enemy.velocityY = state.enemy.velocityY || 0;
                this.enemy.facingRight = state.enemy.facingRight;
                this.enemy.isOnGround = state.enemy.isOnGround;
                if (state.enemy.state) this.enemy.state = state.enemy.state;
                // Sync charge state for proper visual display
                if (state.enemy.isCharging !== undefined) {
                    this.enemy.isCharging = state.enemy.isCharging;
                    this.enemy.chargeLevel = state.enemy.chargeLevel || 0;
                }
                // Sync powerup states for visual indicators
                if (state.enemy.powerups) {
                    this.enemy.powerups.rapid.active = state.enemy.powerups.rapid?.active || false;
                    this.enemy.powerups.rapid.endTime = state.enemy.powerups.rapid?.endTime || 0;
                    this.enemy.powerups.mega.active = state.enemy.powerups.mega?.active || false;
                    this.enemy.powerups.mega.endTime = state.enemy.powerups.mega?.endTime || 0;
                    this.enemy.powerups.shield.active = state.enemy.powerups.shield?.active || false;
                    this.enemy.powerups.shield.endTime = state.enemy.powerups.shield?.endTime || 0;
                }
                // V4: Sync equipped weapon state
                if (state.enemy.equippedWeapon) {
                    this.enemy.equippedWeapon.type = state.enemy.equippedWeapon.type;
                    this.enemy.equippedWeapon.endTime = state.enemy.equippedWeapon.endTime;
                    this.enemy.equippedWeapon.cooldown = state.enemy.equippedWeapon.cooldown;
                }
            }

            // Sync beams from host
            if (state.beams && Array.isArray(state.beams)) {
                // Debug: log received beam data with detailed analysis
                if (state.beams.length > 0) {
                    const playerX = Math.round(this.player.x);
                    const enemyX = Math.round(this.enemy.x);

                    state.beams.forEach((b, i) => {
                        const beamX = Math.round(b.x);
                        const distToPlayer = Math.abs(beamX - playerX);
                        const distToEnemy = Math.abs(beamX - enemyX);
                        const nearestRobot = distToPlayer < distToEnemy ? 'PLAYER(red)' : 'ENEMY(blue)';
                        const expectedColor = b.owner === 'player' ? 'RED' : 'BLUE';

                        console.log(`[Client] Beam ${i}: x=${beamX}, owner=${b.owner}, color=${expectedColor}`);
                        console.log(`[Client] Beam ${i} nearest to: ${nearestRobot} (distPlayer=${distToPlayer}, distEnemy=${distToEnemy})`);
                        console.log(`[Client] Robot positions - Player(red): x=${playerX}, Enemy(blue): x=${enemyX}`);
                    });
                }
                // Create proper Beam objects for correct rendering
                this.beams = state.beams.map(b => {
                    // Create a real Beam object for proper rendering (color, glow, etc.)
                    const beam = new Beam(
                        b.x,
                        b.y,
                        b.direction,
                        b.damage,
                        b.owner,  // 'player' or 'enemy' - determines red or blue color
                        b.chargeLevel || 0
                    );
                    // Debug: verify sprite assignment
                    console.log(`[Client] Created Beam with owner='${b.owner}', sprite should be ${b.owner === 'player' ? 'RED' : 'BLUE'}`);
                    // Override size from host
                    if (b.width) beam.width = b.width;
                    if (b.height) beam.height = b.height;
                    return beam;
                });
            }

            // V4: Sync weapon projectiles from host
            if (state.weaponProjectiles && Array.isArray(state.weaponProjectiles)) {
                this.weaponProjectiles = state.weaponProjectiles.map(p => {
                    let projectile;
                    switch (p.type) {
                        case 'BAZOOKA':
                            projectile = Object.assign(new BazookaProjectile(p.x, p.y, p.direction, p.owner), {
                                damage: p.damage,
                                width: p.width,
                                height: p.height
                            });
                            break;
                        case 'MACHINEGUN':
                            projectile = Object.assign(new MachinegunProjectile(p.x, p.y, p.direction, p.owner), {
                                damage: p.damage,
                                width: p.width,
                                height: p.height,
                                distanceTraveled: p.distanceTraveled || 0
                            });
                            break;
                        case 'SPREAD':
                            projectile = Object.assign(new SpreadProjectile(p.x, p.y, p.direction, p.angle || 0, p.owner), {
                                damage: p.damage,
                                width: p.width,
                                height: p.height
                            });
                            break;
                        case 'SWORD':
                            projectile = Object.assign(new SwordSlash(p.x, p.y, p.direction, p.owner), {
                                damage: p.damage,
                                width: p.width,
                                height: p.height,
                                lifetime: p.lifetime || 200,
                                createdAt: p.createdAt || Date.now()
                            });
                            break;
                        default:
                            // Generic weapon projectile fallback
                            projectile = new WeaponProjectile(p.x, p.y, p.direction, p.type, p.owner);
                            projectile.damage = p.damage;
                            projectile.width = p.width;
                            projectile.height = p.height;
                    }
                    return projectile;
                });
            }

            // Sync game state (KO, RESULT, etc.)
            if (state.gameState && state.gameState !== this.state) {
                // IMPORTANT: Validate state transitions to prevent infinite loops
                // Only allow RESULT state if coming from KO (proper game end flow)
                // Don't allow BATTLE -> RESULT directly (must go through KO)
                if (state.gameState === GameState.RESULT && this.state === GameState.BATTLE) {
                    console.log('[Client] Ignoring invalid state transition: BATTLE -> RESULT (must go through KO)');
                    return;
                }

                // Don't allow forcing client back to RESULT from menu states (SETUP, TITLE)
                // This prevents flickering when client selects REMATCH but host is still in RESULT
                if (state.gameState === GameState.RESULT &&
                    (this.state === GameState.SETUP || this.state === GameState.TITLE)) {
                    console.log('[Client] Ignoring state sync: staying in menu state');
                    return;
                }

                // Don't allow forcing client back to KO from menu states
                if (state.gameState === GameState.KO &&
                    (this.state === GameState.SETUP || this.state === GameState.TITLE || this.state === GameState.RESULT)) {
                    console.log('[Client] Ignoring state sync: KO after menu transition');
                    return;
                }

                console.log(`[Client] State sync: ${this.state} -> ${state.gameState}`);
                const previousState = this.state;
                this.state = state.gameState;

                // If winner is set, update it
                if (state.winner) {
                    this.winner = state.winner;
                }

                // If transitioned to KO, start KO effects on client
                if (state.gameState === GameState.KO && previousState !== GameState.KO) {
                    console.log(`[Client] KO state triggered! Winner: ${state.winner}`);
                    this.koTimer = 0;
                    this.koTextScale = 0;
                    this.koEffects = [];

                    if (state.winner === 'player') {
                        this.koTarget = this.enemy;
                    } else {
                        this.koTarget = this.player;
                    }

                    // Trigger KO effects on client (sound, visual)
                    SoundManager.stopBGM();
                    SoundManager.playKO();
                    ScreenEffects.shake(15, 30);
                    ScreenEffects.flash('#ffffff', 0.8);

                    // Particle explosion at defeated robot
                    if (this.koTarget) {
                        ParticleSystem.explosion(
                            this.koTarget.x + this.koTarget.width / 2,
                            this.koTarget.y + this.koTarget.height / 2
                        );

                        // Explosion effects
                        for (let i = 0; i < 8; i++) {
                            const offsetX = (Math.random() - 0.5) * this.koTarget.width * 1.5;
                            const offsetY = (Math.random() - 0.5) * this.koTarget.height * 1.5;
                            const effect = new Effect(
                                this.koTarget.x + this.koTarget.width / 2 + offsetX,
                                this.koTarget.y + this.koTarget.height / 2 + offsetY,
                                'explosion'
                            );
                            effect.maxFrames = 30;
                            this.koEffects.push(effect);
                        }
                    }

                    // Victory/Defeat sound (delayed)
                    setTimeout(() => {
                        if (state.winner === 'player') {
                            SoundManager.playVictory();
                        } else {
                            SoundManager.playDefeat();
                        }
                    }, 600);
                }

                // If transitioned to RESULT
                if (state.gameState === GameState.RESULT && previousState !== GameState.RESULT) {
                    console.log(`[Client] RESULT state - Winner: ${state.winner}`);
                    this.menuSelection = 0;
                }
            }

            // Sync koTimer during KO state for animation sync
            if (state.gameState === GameState.KO && typeof state.koTimer === 'number') {
                this.koTimer = state.koTimer;
            }

            // Sync items from host (for display)
            if (state.items && Array.isArray(state.items)) {
                this.activeItems = state.items.filter(i => i.active).map(itemData => {
                    const item = new Item(itemData.x, itemData.y, itemData.type);
                    item.active = itemData.active;
                    return item;
                });
            }

            // Sync warp zones from host (for display - include all properties for rendering)
            if (state.warpZones && Array.isArray(state.warpZones)) {
                this.activeWarpZones = state.warpZones.map(warpData => ({
                    entry: warpData.entry,
                    exit: warpData.exit,
                    isActive: warpData.isActive,
                    spawnTime: warpData.spawnTime,
                    lifetime: warpData.lifetime,
                    warningTime: warpData.warningTime
                }));
            }
        };
    }

    renderOnlineLobby() {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Title
        ctx.font = 'bold 36px Courier New';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'center';
        ctx.fillText('ONLINE BATTLE', GAME_WIDTH / 2, 80);

        // Subtitle
        ctx.font = '16px Courier New';
        ctx.fillStyle = '#888888';
        ctx.fillText('Fight against real players!', GAME_WIDTH / 2, 120);

        // Network icon
        ctx.font = '64px Courier New';
        ctx.fillStyle = '#00ff88';
        ctx.fillText('🌐', GAME_WIDTH / 2, 200);

        // Buttons
        const buttons = [
            { label: 'CREATE ROOM', y: 280, desc: 'Host a battle' },
            { label: 'JOIN ROOM', y: 350, desc: 'Join with code' },
            { label: 'BACK', y: 500, desc: '' }
        ];

        for (let i = 0; i < buttons.length; i++) {
            const isSelected = i === this.onlineLobbySelection;
            const btn = buttons[i];

            // Button background
            ctx.fillStyle = isSelected ? '#0088ff' : '#333355';
            ctx.fillRect(GAME_WIDTH/2 - 120, btn.y, 240, 50);

            // Button border
            ctx.strokeStyle = isSelected ? '#00ffff' : '#555577';
            ctx.lineWidth = 2;
            ctx.strokeRect(GAME_WIDTH/2 - 120, btn.y, 240, 50);

            // Button text
            ctx.font = 'bold 18px Courier New';
            ctx.fillStyle = isSelected ? '#ffffff' : '#aaaaaa';
            ctx.fillText(btn.label, GAME_WIDTH / 2, btn.y + 32);

            // Description
            if (btn.desc && isSelected) {
                ctx.font = '12px Courier New';
                ctx.fillStyle = '#888888';
                ctx.fillText(btn.desc, GAME_WIDTH / 2, btn.y + 70);
            }
        }

        // Instructions
        ctx.font = '14px Courier New';
        ctx.fillStyle = '#666666';
        ctx.fillText('Use Arrow Keys to navigate, SPACE to select', GAME_WIDTH / 2, GAME_HEIGHT - 30);
    }

    renderOnlineWaiting() {
        const ctx = this.ctx;

        // Background
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Title
        ctx.font = 'bold 36px Courier New';
        ctx.fillStyle = '#00ffff';
        ctx.textAlign = 'center';
        ctx.fillText('ONLINE BATTLE', GAME_WIDTH / 2, 80);

        // Room code display (for host)
        if (this.isHost && this.roomCode) {
            ctx.font = 'bold 48px Courier New';
            ctx.fillStyle = '#ffff00';
            ctx.fillText(this.roomCode, GAME_WIDTH / 2, 250);

            ctx.font = '16px Courier New';
            ctx.fillStyle = '#888888';
            ctx.fillText('Share this code with your opponent', GAME_WIDTH / 2, 290);
        }

        // Status message
        ctx.font = '20px Courier New';
        ctx.fillStyle = '#00ff88';
        const statusLines = this.onlineStatus.split('\n');
        for (let i = 0; i < statusLines.length; i++) {
            ctx.fillText(statusLines[i], GAME_WIDTH / 2, 350 + i * 30);
        }

        // Loading animation
        const dots = '.'.repeat((Math.floor(Date.now() / 500) % 4));
        ctx.fillText(dots, GAME_WIDTH / 2, 420);

        // Cancel button
        ctx.fillStyle = '#aa3333';
        ctx.fillRect(GAME_WIDTH/2 - 80, 480, 160, 40);
        ctx.strokeStyle = '#ff5555';
        ctx.lineWidth = 2;
        ctx.strokeRect(GAME_WIDTH/2 - 80, 480, 160, 40);
        ctx.font = 'bold 16px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('CANCEL', GAME_WIDTH / 2, 505);

        // Cancel click area (handle in next frame if clicked)
        // Simple keyboard cancel
        if (this.input.keys['Escape']) {
            this.cancelOnlineWaiting();
        }
    }

    cancelOnlineWaiting() {
        if (this.onlineController) {
            this.onlineController.disconnect();
            this.onlineController = null;
        }
        this.roomCode = '';
        this.isHost = false;
        this.state = GameState.ONLINE_LOBBY;
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('=== ROBO BATTLE V3.0 - Online Multiplayer Edition ===');
    console.log('📅 Build: 2026-01-05 DEBUG VERSION');
    console.log('🎨 Features: AI-generated 3D Sprites + Online P2P Battle!');
    console.log('Mobile: Tilt to move, Top tap = Beam, Bottom tap = Jump, Auto-kick when close!');
    console.log('PC: Arrow keys to move, Z = Beam, Space = Jump, X = Kick');
    console.log('Tip: Play in landscape mode for best experience!');
    window.game = new Game();

    // Initialize sound on first user interaction (browser requirement)
    const initSound = () => {
        SoundManager.init();
        SoundManager.resume();
        console.log('🔊 Sound initialized on user interaction');

        // Start title BGM if still on title/setup screen
        if (window.game && (window.game.state === 'title' || window.game.state === 'setup')) {
            SoundManager.playBGM('title');
        }

        // Remove listeners after first activation
        document.removeEventListener('click', initSound);
        document.removeEventListener('touchstart', initSound);
        document.removeEventListener('keydown', initSound);
    };
    document.addEventListener('click', initSound);
    document.addEventListener('touchstart', initSound);
    document.addEventListener('keydown', initSound);
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Game,
        Robot,
        Beam,
        Effect,
        EnemyAI,
        InputSystem,
        PHYSICS,
        ROBOT,
        BEAM,
        STAGES,
        checkCollision,
        clamp,
        distance
    };
}
