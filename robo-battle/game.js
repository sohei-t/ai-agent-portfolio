/**
 * ROBO BATTLE v5.0 - High-Quality Sprites Edition
 * Single-file game implementation with AI-generated robot sprites
 *
 * Features:
 * - 1P vs CPU robot battle
 * - 6 stages (Urban, Pyramid, Parthenon, Factory, Cave, Neo City)
 * - 4 parameter customization (JUMP, WALK, BEAM, KICK)
 * - Mobile support (Gyro + Virtual Joystick) with auto-kick
 * - AI-generated 3D robot sprites (Vertex AI Imagen)
 * - Enhanced canvas fallback with gradients and glow effects
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

// Robot constants
const ROBOT = {
    width: 48,
    height: 64,
    maxHp: 100,
    invincibleTime: 500,
    beamCooldown: 500,    // 300 → 500ms に増加（ビームを遅くする）
    kickCooldown: 1000,
    kickRange: 30,
    kickHeight: 48,
    knockback: 8
};

// KO演出の設定
const KO_SETTINGS = {
    freezeTime: 1500,       // 1.5秒フリーズ
    slowMotionFactor: 0.2,  // スローモーション係数
    koTextScale: 3.0,       // KO!テキストの最大スケール
    explosionDuration: 800  // 爆発エフェクト時間
};

// Beam constants
const BEAM = {
    width: 20,
    height: 8,
    speed: 12
};

// Game states
const GameState = {
    LOADING: 'loading',
    TITLE: 'title',
    SETUP: 'setup',
    BATTLE: 'battle',
    KO: 'ko',           // NEW: KO演出状態
    RESULT: 'result',
    PAUSED: 'paused'
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

const STAGES = [
    {
        name: 'Urban City',
        displayName: '市街地',
        bgColor: '#1a1a2e',
        platforms: [
            { x: 0, y: 520, width: 800, height: 80, type: 'solid' },
            { x: 50, y: 400, width: 120, height: 20, type: 'passthrough' },
            { x: 50, y: 280, width: 100, height: 20, type: 'passthrough' },
            { x: 630, y: 400, width: 120, height: 20, type: 'passthrough' },
            { x: 650, y: 280, width: 100, height: 20, type: 'passthrough' },
            { x: 320, y: 350, width: 160, height: 20, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 100, y: 450 }, enemy: { x: 650, y: 450 } }
    },
    {
        name: 'Pyramid',
        displayName: 'ピラミッド',
        bgColor: '#ff9966',
        platforms: [
            { x: 0, y: 520, width: 800, height: 80, type: 'solid' },
            { x: 150, y: 440, width: 500, height: 20, type: 'passthrough' },
            { x: 200, y: 360, width: 400, height: 20, type: 'passthrough' },
            { x: 250, y: 280, width: 300, height: 20, type: 'passthrough' },
            { x: 300, y: 200, width: 200, height: 20, type: 'passthrough' },
            { x: 350, y: 120, width: 100, height: 20, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 100, y: 450 }, enemy: { x: 650, y: 450 } }
    },
    {
        name: 'Parthenon',
        displayName: 'パルテノン神殿',
        bgColor: '#87ceeb',
        platforms: [
            { x: 0, y: 520, width: 800, height: 80, type: 'solid' },
            { x: 100, y: 350, width: 80, height: 170, type: 'solid' },
            { x: 250, y: 350, width: 80, height: 170, type: 'solid' },
            { x: 470, y: 350, width: 80, height: 170, type: 'solid' },
            { x: 620, y: 350, width: 80, height: 170, type: 'solid' },
            { x: 80, y: 330, width: 640, height: 20, type: 'passthrough' },
            { x: 200, y: 200, width: 400, height: 20, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 150, y: 260 }, enemy: { x: 600, y: 260 } }
    },
    {
        name: 'Factory',
        displayName: '工場地帯',
        bgColor: '#2c3e50',
        platforms: [
            { x: 0, y: 520, width: 800, height: 80, type: 'solid' },
            { x: 0, y: 380, width: 200, height: 20, type: 'passthrough' },
            { x: 300, y: 420, width: 200, height: 20, type: 'passthrough' },
            { x: 600, y: 380, width: 200, height: 20, type: 'passthrough' },
            { x: 100, y: 260, width: 150, height: 20, type: 'passthrough' },
            { x: 550, y: 260, width: 150, height: 20, type: 'passthrough' },
            { x: 320, y: 180, width: 160, height: 20, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 100, y: 450 }, enemy: { x: 650, y: 450 } }
    },
    {
        name: 'Cave',
        displayName: '洞窟',
        bgColor: '#1a1a1a',
        platforms: [
            { x: 0, y: 520, width: 800, height: 80, type: 'solid' },
            { x: 0, y: 400, width: 250, height: 20, type: 'passthrough' },
            { x: 550, y: 400, width: 250, height: 20, type: 'passthrough' },
            { x: 200, y: 320, width: 400, height: 20, type: 'passthrough' },
            { x: 0, y: 220, width: 200, height: 20, type: 'passthrough' },
            { x: 600, y: 220, width: 200, height: 20, type: 'passthrough' },
            { x: 300, y: 140, width: 200, height: 20, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 100, y: 450 }, enemy: { x: 650, y: 450 } }
    },
    {
        name: 'Neo City',
        displayName: '未来都市',
        bgColor: '#0d0221',
        platforms: [
            { x: 0, y: 520, width: 800, height: 80, type: 'solid' },
            { x: 0, y: 420, width: 150, height: 20, type: 'passthrough' },
            { x: 650, y: 420, width: 150, height: 20, type: 'passthrough' },
            { x: 100, y: 320, width: 200, height: 20, type: 'passthrough' },
            { x: 500, y: 320, width: 200, height: 20, type: 'passthrough' },
            { x: 300, y: 250, width: 200, height: 20, type: 'passthrough' },
            { x: 150, y: 150, width: 100, height: 20, type: 'passthrough' },
            { x: 550, y: 150, width: 100, height: 20, type: 'passthrough' },
            { x: 350, y: 80, width: 100, height: 20, type: 'passthrough' }
        ],
        spawnPoints: { player: { x: 50, y: 350 }, enemy: { x: 700, y: 350 } }
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
    loaded: false,
    useHighQuality: true, // Enable high-quality rendering

    // Sprite file paths
    spriteFiles: {
        player_idle: 'assets/sprites/player_idle.png',
        enemy_idle: 'assets/sprites/enemy_idle.png'
    },

    // Load all PNG sprites
    async loadAll() {
        const promises = [];

        for (const [key, path] of Object.entries(this.spriteFiles)) {
            const img = new Image();
            promises.push(new Promise((resolve) => {
                img.onload = () => {
                    this.sprites[key] = img;
                    console.log(`✅ Sprite loaded: ${key}`);
                    resolve(true);
                };
                img.onerror = () => {
                    console.log(`⚠️ Sprite not found: ${key}, using fallback`);
                    this.sprites[key] = null;
                    resolve(false);
                };
                img.src = path;
            }));
        }

        await Promise.all(promises);
        this.loaded = true;
        console.log('🎨 Sprite system initialized');
    },

    // Get sprite for a robot state
    getSprite(isPlayer, state) {
        const prefix = isPlayer ? 'player' : 'enemy';
        const key = `${prefix}_${state}`;
        return this.sprites[key] || null;
    },

    // Check if high-quality sprite is available
    hasSprite(isPlayer, state) {
        return this.getSprite(isPlayer, state) !== null;
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
    playBeamShoot() {
        if (!this.ctx) return;
        // Laser "pew" - frequency sweep down
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(this.sfxVolume * this.masterVolume * 0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
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
    beamTrail(x, y, isPlayer) {
        this.emit(x, y, 2, {
            color: isPlayer ? '#ff6600' : '#0088ff',
            size: 3,
            life: 15,
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

        // Animation
        this.animFrame = 0;
        this.animTimer = 0;
        this.state = 'idle'; // idle, walk, jump, attack, hurt

        // Color
        this.color = color || (isPlayer ? 'red' : 'blue');

        // Sprite
        this.sprite = svgToImage(isPlayer ? SPRITES.robotRed : SPRITES.robotBlue);
    }

    get moveSpeed() {
        return 3 + (this.walkSpeed * 0.5);
    }

    get jumpVelocity() {
        return -(8 + (this.jumpPower * 0.8));
    }

    get beamDamage() {
        return 8 + (this.beamPower * 1.2);
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
        if (this.onGround) {
            this.velocityY = this.jumpVelocity;
            this.onGround = false;
            this.state = 'jump';

            // Play jump sound
            SoundManager.playJump();

            // Dust particles at feet
            ParticleSystem.dust(this.x + this.width / 2, this.y + this.height);

            return true;
        }
        return false;
    }

    shoot(beams) {
        if (this.beamCooldown > 0) return null;

        // 1発ずつルール: 自分のビームが画面上にあれば撃てない
        const owner = this.isPlayer ? 'player' : 'enemy';
        const existingBeam = beams.find(b => b.owner === owner && b.active);
        if (existingBeam) return null;

        this.beamCooldown = ROBOT.beamCooldown;
        this.state = 'attack';

        const beam = new Beam(
            this.facingRight ? this.x + this.width : this.x - BEAM.width,
            this.y + this.height / 2 - BEAM.height / 2,
            this.facingRight ? 1 : -1,
            this.beamDamage,
            owner
        );

        beams.push(beam);

        // Play beam shoot sound
        SoundManager.playBeamShoot();

        // Charge particle effect at hand
        const handX = this.facingRight ? this.x + this.width : this.x;
        const handY = this.y + this.height / 2;
        ParticleSystem.charge(handX, handY, this.isPlayer);

        return beam;
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

        this.hp = Math.max(0, this.hp - damage);
        this.state = 'hurt';

        // Knockback
        this.velocityX = knockbackDir * ROBOT.knockback;
        this.velocityY = -4;

        // Invincibility
        this.isInvincible = true;
        this.invincibleTimer = ROBOT.invincibleTime;

        // Screen shake on damage
        ScreenEffects.shake(damage > 20 ? 8 : 5, 12);

        // Hit particles at robot center
        ParticleSystem.hit(this.x + this.width / 2, this.y + this.height / 2);

        return this.hp <= 0;
    }

    update(deltaTime, platforms) {
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
        if (this.onGround && Math.abs(this.velocityX) < 0.5) {
            if (this.state !== 'attack' && this.state !== 'hurt') {
                this.state = 'idle';
            }
        } else if (!this.onGround) {
            this.state = 'jump';
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
        }

        // Apply transforms
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        ctx.translate(centerX + offsetX, centerY + offsetY);
        ctx.rotate(rotation);
        ctx.scale(this.facingRight ? scaleX : -scaleX, scaleY);
        ctx.translate(-this.width / 2, -this.height / 2);

        // Try to use high-quality PNG sprite first
        const hqSprite = SpriteLoader.getSprite(this.isPlayer, 'idle');

        if (SpriteLoader.useHighQuality && hqSprite) {
            // Use PNG sprite with proper sizing
            const spriteSize = Math.min(hqSprite.width, hqSprite.height);
            const sx = (hqSprite.width - spriteSize) / 2;
            const sy = (hqSprite.height - spriteSize) / 2;

            // Add glow effect for high-quality sprites
            ctx.shadowColor = this.isPlayer ? '#FF4400' : '#0066FF';
            ctx.shadowBlur = this.state === 'attack' ? 20 : 10;

            // Draw with slight padding for glow
            ctx.drawImage(
                hqSprite,
                sx, sy, spriteSize, spriteSize,
                -8, -8, this.width + 16, this.height + 16
            );

            // Attack glow overlay
            if (this.state === 'attack') {
                ctx.shadowColor = this.isPlayer ? '#00FFFF' : '#FF3333';
                ctx.shadowBlur = 25;
                ctx.globalAlpha = 0.3;
                ctx.drawImage(
                    hqSprite,
                    sx, sy, spriteSize, spriteSize,
                    -8, -8, this.width + 16, this.height + 16
                );
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
    }
}

// ============================================================================
// BEAM CLASS
// ============================================================================

class Beam {
    constructor(x, y, direction, damage, owner) {
        this.x = x;
        this.y = y;
        this.width = BEAM.width;
        this.height = BEAM.height;
        this.direction = direction;
        this.damage = damage;
        this.owner = owner;
        this.active = true;

        this.sprite = svgToImage(owner === 'player' ? SPRITES.beamRed : SPRITES.beamBlue);
    }

    update() {
        this.x += this.direction * BEAM.speed;

        // Out of bounds
        if (this.x < -this.width || this.x > GAME_WIDTH) {
            this.active = false;
        }

        // Beam trail particles
        if (this.active && Math.random() > 0.5) {
            ParticleSystem.beamTrail(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.owner === 'player'
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

        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}

// ============================================================================
// EFFECT CLASS
// ============================================================================

class Effect {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.frame = 0;
        this.maxFrames = 10;
        this.size = 32;
        this.active = true;

        this.sprite = svgToImage(SPRITES.effectHit);
    }

    update() {
        this.frame++;
        if (this.frame >= this.maxFrames) {
            this.active = false;
        }
    }

    render(ctx) {
        const alpha = 1 - (this.frame / this.maxFrames);
        const scale = 1 + (this.frame / this.maxFrames) * 0.5;
        const size = this.size * scale;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(this.sprite, this.x - size/2, this.y - size/2, size, size);
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

    update(deltaTime, player, beams) {
        this.thinkTimer += deltaTime;

        if (this.thinkTimer >= this.thinkInterval) {
            this.thinkTimer = 0;
            this.decide(player, beams);
        }

        this.executeAction(player, beams);
    }

    decide(player, beams) {
        const dist = Math.abs(player.x - this.robot.x);
        const heightDiff = player.y - this.robot.y;

        // Determine facing direction
        this.robot.facingRight = player.x > this.robot.x;

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

    executeAction(player, beams) {
        switch (this.currentAction) {
            case 'approach':
                const dir = player.x > this.robot.x ? 1 : -1;
                this.robot.move(dir);
                break;

            case 'shoot':
                this.robot.shoot(beams);
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

        // Mobile touch state (simplified: zone-based)
        this.touchActions = {
            shoot: false,
            jump: false
        };

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

        // Setup zone-based touch controls (top = shoot, bottom = jump)
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
            this.handleZoneTouch(e, true);
        }, { passive: false });

        document.addEventListener('touchend', (e) => {
            this.handleZoneTouch(e, false);
        }, { passive: false });

        document.addEventListener('touchcancel', (e) => {
            this.handleZoneTouch(e, false);
        }, { passive: false });
    }

    handleZoneTouch(e, isStart) {
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

        if (isStart) {
            for (const touch of e.changedTouches) {
                const y = touch.clientY;
                const screenHeight = window.innerHeight;
                const midPoint = screenHeight / 2;

                // Create touch feedback effect
                this.createTouchFeedback(touch.clientX, touch.clientY);

                if (y < midPoint) {
                    // Top half = Shoot beam
                    this.touchActions.shoot = true;
                    console.log('[Touch] Top zone - SHOOT');
                } else {
                    // Bottom half = Jump
                    this.touchActions.jump = true;
                    console.log('[Touch] Bottom zone - JUMP');
                }
            }
        } else {
            // On touch end, reset actions after a brief delay
            // This allows the action to be registered for at least one frame
            setTimeout(() => {
                this.touchActions.shoot = false;
                this.touchActions.jump = false;
            }, 50);
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

    getInput() {
        if (this.isMobileDevice) {
            const movement = this.getGyroInput();

            return {
                moveX: movement.x,
                moveY: 0,
                jump: this.touchActions.jump,
                shoot: this.touchActions.shoot,
                kick: false  // Kick disabled on mobile for simplicity
            };
        }

        // Keyboard input (unchanged)
        return {
            moveX: (this.keys['KeyD'] || this.keys['ArrowRight'] ? 1 : 0) -
                   (this.keys['KeyA'] || this.keys['ArrowLeft'] ? 1 : 0),
            moveY: 0,
            jump: this.keys['KeyW'] || this.keys['ArrowUp'] || this.keys['Space'],
            shoot: this.keys['KeyJ'] || this.keys['KeyZ'],
            kick: this.keys['KeyK'] || this.keys['KeyX']
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
        this.effects = [];
        this.currentStage = 0;

        // Systems
        this.input = new InputSystem(this.canvas);
        this.input.setGameStateGetter(() => this.state);  // Pass state getter
        this.ui = new UIRenderer(this.ctx);
        this.ai = null;

        // Settings
        this.settings = {
            playerParams: { jump: 5, walk: 5, beam: 5, kick: 5 },
            difficulty: 'normal',
            stage: 0
        };

        // UI state
        this.menuSelection = 0;
        this.setupSelection = 0;
        this.winner = null;
        this.hoveredButton = -1;

        // Input state for menus
        this.inputCooldown = 0;

        // KO演出用
        this.koTimer = 0;
        this.koTarget = null;      // 倒されたロボット
        this.koEffects = [];       // KO演出用エフェクト
        this.koTextScale = 0;      // KO!テキストのスケール

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
            default:
                console.log(`[DEBUG] Unknown state: ${this.state}`);
        }
    }

    handleTitleClick(x, y) {
        // Menu items: START GAME, HOW TO PLAY, CREDITS
        const menuItems = 3;
        const startY = 420;
        const itemHeight = 40;

        for (let i = 0; i < menuItems; i++) {
            const itemY = startY + i * itemHeight - 20;
            if (x >= 250 && x <= 550 && y >= itemY && y <= itemY + itemHeight) {
                this.menuSelection = i;
                SoundManager.playMenuSelect();
                // Execute selection
                switch (i) {
                    case 0: // Start Game
                    case 1: // How to Play
                    case 2: // Credits
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

        // START BATTLE button
        const btnX = GAME_WIDTH / 2 - 100;  // 300
        const btnY = GAME_HEIGHT - 100;      // 500
        const btnWidth = 200;
        const btnHeight = 50;

        console.log(`[DEBUG] START BATTLE button area: x=${btnX}-${btnX+btnWidth}, y=${btnY}-${btnY+btnHeight}`);
        console.log(`[DEBUG] Click position: x=${x.toFixed(0)}, y=${y.toFixed(0)}`);
        console.log(`[DEBUG] In button? x: ${x >= btnX && x <= btnX + btnWidth}, y: ${y >= btnY && y <= btnY + btnHeight}`);

        if (x >= btnX && x <= btnX + btnWidth && y >= btnY && y <= btnY + btnHeight) {
            console.log('[DEBUG] START BATTLE clicked! Calling startBattle()');
            SoundManager.playMenuSelect();
            this.setupSelection = 6;
            this.startBattle();
            return;
        }
        console.log('[DEBUG] Click not on any interactive element');
    }

    handleResultClick(x, y) {
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
                        this.startBattle();
                        break;
                    case 1: // Change Settings
                        this.state = GameState.SETUP;
                        SoundManager.playBGM('title');
                        break;
                    case 2: // Title
                        this.state = GameState.TITLE;
                        this.menuSelection = 0;
                        SoundManager.playBGM('title');
                        break;
                }
                return;
            }
        }
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
            case GameState.BATTLE:
                this.updateBattle(deltaTime);
                break;
            case GameState.KO:
                this.updateKO(deltaTime);
                break;
            case GameState.RESULT:
                this.updateResult(deltaTime);
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
            this.menuSelection = Math.min(2, this.menuSelection + 1);
            this.inputCooldown = 200;
        }

        if (input.shoot || input.jump || this.input.keys['Enter'] || this.input.keys['Space']) {
            SoundManager.playMenuSelect();
            switch (this.menuSelection) {
                case 0: // Start Game
                    this.state = GameState.SETUP;
                    break;
                case 1: // How to Play - just start for now
                    this.state = GameState.SETUP;
                    break;
                case 2: // Credits - just start
                    this.state = GameState.SETUP;
                    break;
            }
            this.inputCooldown = 200;
        }
    }

    updateSetup(deltaTime) {
        const input = this.input.getInput();

        if (this.inputCooldown > 0) return;

        // Navigate parameters
        if (input.moveY < -0.5 || this.input.keys['ArrowUp']) {
            this.setupSelection = Math.max(0, this.setupSelection - 1);
            this.inputCooldown = 150;
        }
        if (input.moveY > 0.5 || this.input.keys['ArrowDown']) {
            this.setupSelection = Math.min(6, this.setupSelection + 1);
            this.inputCooldown = 150;
        }

        // Adjust values
        if (input.moveX < -0.5 || this.input.keys['ArrowLeft']) {
            this.adjustSetup(-1);
            this.inputCooldown = 150;
        }
        if (input.moveX > 0.5 || this.input.keys['ArrowRight']) {
            this.adjustSetup(1);
            this.inputCooldown = 150;
        }

        // Start battle
        if (this.setupSelection === 6 && (input.shoot || input.jump || this.input.keys['Enter'])) {
            this.startBattle();
            this.inputCooldown = 200;
        }

        // Back to title
        if (this.input.keys['Escape']) {
            this.state = GameState.TITLE;
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
        }
    }

    startBattle() {
        console.log('[DEBUG] startBattle() called!');
        console.log('[DEBUG] Current state before:', this.state);
        this.currentStage = this.settings.stage;
        const stage = STAGES[this.currentStage];

        // Create player
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

        // Create enemy
        this.enemy = new Robot(
            stage.spawnPoints.enemy.x,
            stage.spawnPoints.enemy.y,
            false,
            'blue'
        );

        // Random enemy parameters
        const enemyTotal = 20;
        const dist = [5, 5, 5, 5];
        for (let i = 0; i < enemyTotal - 20; i++) {
            dist[Math.floor(Math.random() * 4)]++;
        }
        this.enemy.setParameters(dist[0], dist[1], dist[2], dist[3]);

        // Create AI
        this.ai = new EnemyAI(this.enemy);
        this.ai.setDifficulty(this.settings.difficulty);

        // Clear projectiles and effects
        this.beams = [];
        this.effects = [];
        ParticleSystem.clear();

        this.winner = null;
        this.state = GameState.BATTLE;

        // Start battle BGM
        SoundManager.playBGM('battle');

        console.log('[DEBUG] State changed to:', this.state);
        console.log('[DEBUG] Player created at:', this.player.x, this.player.y);
        console.log('[DEBUG] Enemy created at:', this.enemy.x, this.enemy.y);
    }

    updateBattle(deltaTime) {
        const input = this.input.getInput();
        const stage = STAGES[this.currentStage];

        // Pause
        if (this.input.keys['Escape'] || this.input.keys['KeyP']) {
            this.state = GameState.PAUSED;
            this.inputCooldown = 200;
            return;
        }

        // Player input
        this.player.move(input.moveX);

        if (input.jump) {
            this.player.jump();
        }

        if (input.shoot) {
            this.player.shoot(this.beams);
        }

        if (input.kick) {
            if (this.player.kick(this.enemy)) {
                const knockbackDir = this.player.facingRight ? 1 : -1;
                const died = this.enemy.takeDamage(this.player.kickDamage, knockbackDir);
                this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit'));

                // Kick sound
                SoundManager.playKick();

                if (died) {
                    this.triggerKO('player', this.enemy);
                    return;
                }
            }
        }

        // Auto-kick for mobile: automatically kick when close to enemy
        if (this.input.isMobileDevice && this.player.kickCooldown <= 0) {
            const distanceToEnemy = Math.abs(this.player.x - this.enemy.x);
            const heightDiff = Math.abs(this.player.y - this.enemy.y);
            const autoKickRange = 55; // Slightly larger than kick range for easier triggering
            const heightThreshold = 40; // Must be at similar height

            if (distanceToEnemy < autoKickRange && heightDiff < heightThreshold) {
                // Face the enemy before kicking
                this.player.facingRight = this.enemy.x > this.player.x;

                if (this.player.kick(this.enemy)) {
                    const knockbackDir = this.player.facingRight ? 1 : -1;
                    const died = this.enemy.takeDamage(this.player.kickDamage, knockbackDir);
                    this.effects.push(new Effect(this.enemy.x + this.enemy.width/2, this.enemy.y + this.enemy.height/2, 'hit'));

                    // Auto-kick sound
                    SoundManager.playKick();

                    console.log('[Auto-Kick] Player kicked enemy!');
                    if (died) {
                        this.triggerKO('player', this.enemy);
                        return;
                    }
                }
            }
        }

        // Auto-aim (face enemy)
        this.player.facingRight = this.enemy.x > this.player.x;

        // AI update
        this.ai.update(deltaTime, this.player, this.beams);

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

        // Update beams
        for (const beam of this.beams) {
            beam.update();

            // Check collision with player
            if (beam.owner === 'enemy' && checkCollision(beam, this.player)) {
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

            // Check collision with enemy
            if (beam.owner === 'player' && checkCollision(beam, this.enemy)) {
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

        // Update effects
        for (const effect of this.effects) {
            effect.update();
        }
        this.effects = this.effects.filter(e => e.active);

        // Update particle system and screen effects
        ParticleSystem.update();
        ScreenEffects.update();
    }

    updateResult(deltaTime) {
        const input = this.input.getInput();

        if (this.inputCooldown > 0) return;

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
                    this.startBattle();
                    break;
                case 1: // Change Settings
                    this.state = GameState.SETUP;
                    SoundManager.playBGM('title');
                    break;
                case 2: // Title
                    this.state = GameState.TITLE;
                    this.menuSelection = 0;
                    SoundManager.playBGM('title');
                    break;
            }
            this.inputCooldown = 200;
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
        this.koTimer += deltaTime;

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

        // フリーズ時間終了後、結果画面へ
        if (this.koTimer >= KO_SETTINGS.freezeTime) {
            this.state = GameState.RESULT;
            this.menuSelection = 0;
            console.log('[KO] 演出終了 → RESULT画面へ');
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

        ctx.save();
        ctx.shadowColor = '#FF4400';
        ctx.shadowBlur = 15;
        if (playerSprite) {
            ctx.drawImage(playerSprite, 180, 230, 120, 160);
        } else {
            ctx.drawImage(svgToImage(SPRITES.robotRed), 200, 250, 96, 128);
        }

        ctx.shadowColor = '#0066FF';
        if (enemySprite) {
            ctx.drawImage(enemySprite, 500, 230, 120, 160);
        } else {
            ctx.drawImage(svgToImage(SPRITES.robotBlue), 504, 250, 96, 128);
        }
        ctx.restore();

        // VS
        ctx.font = 'bold 48px Courier New';
        ctx.fillStyle = '#ffff00';
        ctx.textAlign = 'center';
        ctx.fillText('VS', GAME_WIDTH / 2, 330);

        // Menu
        const menuItems = ['START GAME', 'HOW TO PLAY', 'CREDITS'];
        const startY = 420;

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

        // Start button
        const btnY = GAME_HEIGHT - 100;
        const isStartSelected = this.setupSelection === 6;
        ctx.fillStyle = isStartSelected ? '#0088ff' : '#0066cc';
        ctx.fillRect(GAME_WIDTH / 2 - 100, btnY, 200, 50);
        ctx.strokeStyle = isStartSelected ? '#00ffff' : '#00aaff';
        ctx.lineWidth = 2;
        ctx.strokeRect(GAME_WIDTH / 2 - 100, btnY, 200, 50);
        ctx.font = 'bold 20px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('START BATTLE', GAME_WIDTH / 2, btnY + 32);

        // Instructions
        ctx.font = '14px Courier New';
        ctx.fillStyle = '#666666';
        ctx.fillText('Arrow Keys to adjust, ESC to go back', GAME_WIDTH / 2, GAME_HEIGHT - 20);
    }

    renderBattle() {
        const ctx = this.ctx;
        const stage = STAGES[this.currentStage];

        // Apply screen shake
        const shake = ScreenEffects.getShakeOffset();
        ctx.save();
        ctx.translate(shake.x, shake.y);

        // Background
        ctx.fillStyle = stage.bgColor;
        ctx.fillRect(-shake.x, -shake.y, GAME_WIDTH + Math.abs(shake.x) * 2, GAME_HEIGHT + Math.abs(shake.y) * 2);

        // Draw stage-specific background elements
        this.renderStageBackground(stage);

        // Draw platforms
        for (const platform of stage.platforms) {
            ctx.fillStyle = platform.type === 'solid' ? '#4d4d6a' : 'rgba(77, 77, 106, 0.6)';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

            // Platform top highlight
            ctx.fillStyle = platform.type === 'solid' ? '#6d6d8a' : 'rgba(109, 109, 138, 0.6)';
            ctx.fillRect(platform.x, platform.y, platform.width, 4);
        }

        // Draw beams
        for (const beam of this.beams) {
            beam.render(ctx);
        }

        // Draw robots
        this.player.render(ctx);
        this.enemy.render(ctx);

        // Draw effects
        for (const effect of this.effects) {
            effect.render(ctx);
        }

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
        ctx.fillText('CPU', GAME_WIDTH - 20, 60);

        // Stage name
        ctx.font = '16px Courier New';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(stage.displayName, GAME_WIDTH / 2, 35);

        // Draw particles
        ParticleSystem.render(ctx);

        // Restore from shake transform
        ctx.restore();

        // Draw screen flash (outside shake transform)
        ScreenEffects.renderFlash(ctx);
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
            const winnerText = this.winner === 'player' ? 'YOU WIN!' : 'CPU WINS!';
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
        ctx.fillText(isPlayerWinner ? 'YOU WIN!' : 'YOU LOSE...', GAME_WIDTH / 2, 150);
        ctx.strokeText(isPlayerWinner ? 'YOU WIN!' : 'YOU LOSE...', GAME_WIDTH / 2, 150);

        // Winner robot (use high-quality sprites if available)
        const hqWinnerSprite = SpriteLoader.getSprite(isPlayerWinner, 'idle');
        ctx.save();
        ctx.shadowColor = isPlayerWinner ? '#FF4400' : '#0066FF';
        ctx.shadowBlur = 20;
        if (hqWinnerSprite) {
            ctx.drawImage(hqWinnerSprite, GAME_WIDTH / 2 - 75, 180, 150, 200);
        } else {
            const winnerSprite = isPlayerWinner ? SPRITES.robotRed : SPRITES.robotBlue;
            ctx.drawImage(svgToImage(winnerSprite), GAME_WIDTH / 2 - 64, 200, 128, 170);
        }
        ctx.restore();

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
}

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('=== ROBO BATTLE v5.2 - Sound & Effects Edition ===');
    console.log('🎨 Features: Animated sprites + Procedural BGM + Sound Effects!');
    console.log('Mobile: Tilt to move, Top tap = Beam, Bottom tap = Jump, Auto-kick when close!');
    console.log('PC: Arrow keys to move, Z = Beam, Space = Jump, X = Kick');
    console.log('Tip: Play in landscape mode for best experience!');
    window.game = new Game();

    // Initialize sound on first user interaction (browser requirement)
    const initSound = () => {
        SoundManager.init();
        SoundManager.resume();
        console.log('🔊 Sound initialized on user interaction');
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
