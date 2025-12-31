// Audio management - Space Odyssey
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let bgmGain = audioContext.createGain();
let sfxGain = audioContext.createGain();

bgmGain.connect(audioContext.destination);
sfxGain.connect(audioContext.destination);

bgmGain.gain.value = 0.5;
sfxGain.gain.value = 0.7;

let currentBGM = null;
let audioBuffers = {};
let bgmAudios = {};  // HTML5 Audio要素でBGMを管理
let sfxAudios = {};  // HTML5 Audio要素で効果音を管理

// 音楽ファイルをプリロード
function preloadAudio() {
    // BGMのプリロード
    const bgmFiles = [
        'bgm_title',
        'bgm_stage_1_2',
        'bgm_stage_3_5',
        'bgm_boss',
        'bgm_victory',
        'bgm_game_over'
    ];

    bgmFiles.forEach(name => {
        const audio = new Audio(`assets/audio/bgm/${name}.mp3`);
        audio.loop = true;
        audio.volume = 0.5;
        bgmAudios[name] = audio;
    });

    // 効果音のプリロード（存在する場合）
    const sfxFiles = [
        'sfx_shoot_beam',
        'sfx_enemy_hit',
        'sfx_enemy_destroy'
    ];

    sfxFiles.forEach(name => {
        const audio = new Audio(`assets/audio/sfx/${name}.wav`);
        audio.volume = 0.7;
        sfxAudios[name] = audio;
    });
}

// ページ読み込み時に音楽をプリロード
if (typeof window !== 'undefined') {
    window.addEventListener('load', preloadAudio);
}

// Web Audio API による簡易音源（フォールバック用）
function createSound(frequency, duration, type = 'square') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(sfxGain);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// 効果音生成（Web Audio API）
const soundEffects = {
    shoot_beam: () => {
        createSound(800, 0.1, 'square');
        createSound(600, 0.1, 'square');
    },
    shoot_missile: () => {
        createSound(200, 0.3, 'sawtooth');
        createSound(150, 0.3, 'sawtooth');
    },
    shoot_laser: () => {
        createSound(1200, 0.2, 'sine');
    },
    enemy_hit: () => {
        createSound(150, 0.1, 'square');
        createSound(100, 0.1, 'square');
    },
    enemy_destroy: () => {
        // 爆発音
        const noise = audioContext.createBufferSource();
        const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() - 0.5) * 2;
        }

        noise.buffer = buffer;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.5, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(sfxGain);

        noise.start();
    },
    boss_destroy: () => {
        // 大爆発
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                soundEffects.enemy_destroy();
                createSound(50 + i * 20, 0.5, 'triangle');
            }, i * 100);
        }
    },
    player_damage: () => {
        createSound(100, 0.2, 'sawtooth');
        createSound(50, 0.3, 'square');
    },
    powerup: () => {
        createSound(400, 0.1, 'sine');
        createSound(600, 0.1, 'sine');
        createSound(800, 0.1, 'sine');
    },
    item_get: () => {
        createSound(1000, 0.1, 'sine');
        createSound(1200, 0.1, 'sine');
    },
    bomb: () => {
        // ボム音
        createSound(60, 0.8, 'sawtooth');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSound(100 + i * 50, 0.2, 'square');
            }, i * 50);
        }
    },
    warning: () => {
        // 警告音
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createSound(440, 0.2, 'square');
                setTimeout(() => {
                    createSound(330, 0.2, 'square');
                }, 200);
            }, i * 500);
        }
    },
    game_over: () => {
        // ゲームオーバー音
        createSound(220, 0.3, 'square');
        setTimeout(() => createSound(165, 0.3, 'square'), 300);
        setTimeout(() => createSound(110, 0.5, 'square'), 600);
    },
    boss_hit: () => {
        createSound(80, 0.1, 'sawtooth');
        createSound(120, 0.1, 'square');
    },
    shield_hit: () => {
        createSound(1500, 0.1, 'sine');
        createSound(2000, 0.1, 'sine');
    },
    menu_select: () => {
        createSound(600, 0.05, 'sine');
        createSound(800, 0.05, 'sine');
    },
    menu_move: () => {
        createSound(500, 0.03, 'sine');
    },
    life_up: () => {
        createSound(500, 0.1, 'sine');
        createSound(700, 0.1, 'sine');
        createSound(900, 0.1, 'sine');
    }
};

// BGM生成（簡易的なループ）
function createBGM(name) {
    const bgmPatterns = {
        stage_1_2: {
            tempo: 120,
            notes: [440, 494, 523, 587, 659, 698, 784, 880],
            pattern: [0, 2, 4, 2, 0, 2, 4, 5, 4, 2, 0]
        },
        stage_3_5: {
            tempo: 110,
            notes: [392, 440, 494, 523, 587, 659],
            pattern: [0, 1, 2, 1, 0, 3, 4, 3, 2, 1, 0]
        },
        stage_6_8: {
            tempo: 140,
            notes: [330, 392, 440, 494, 523],
            pattern: [0, 0, 1, 2, 3, 4, 3, 2, 1, 0]
        },
        boss: {
            tempo: 135,
            notes: [220, 247, 262, 294, 330],
            pattern: [0, 0, 1, 0, 2, 0, 3, 0, 4, 3, 2, 1, 0]
        }
    };

    const config = bgmPatterns[name] || bgmPatterns.stage_1_2;
    let noteIndex = 0;

    const playNote = () => {
        if (!currentBGM || currentBGM.name !== name) return;

        const frequency = config.notes[config.pattern[noteIndex % config.pattern.length]];
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(bgmGain);

        oscillator.type = 'square';
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);

        noteIndex++;

        // ベースライン
        if (noteIndex % 4 === 0) {
            const bass = audioContext.createOscillator();
            const bassGain = audioContext.createGain();

            bass.connect(bassGain);
            bassGain.connect(bgmGain);

            bass.type = 'triangle';
            bass.frequency.value = frequency / 2;

            bassGain.gain.setValueAtTime(0.2, audioContext.currentTime);
            bassGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

            bass.start();
            bass.stop(audioContext.currentTime + 0.4);
        }

        // 次のノート
        setTimeout(playNote, 60000 / config.tempo / 4);
    };

    currentBGM = { name, stop: () => { currentBGM = null; } };
    playNote();
}

// API関数
function playSFX(name, volume = 1) {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const tempGain = sfxGain.gain.value;
    sfxGain.gain.value *= volume;

    if (soundEffects[name]) {
        soundEffects[name]();
    }

    sfxGain.gain.value = tempGain;
}

function playBGM(name) {
    stopBGM();

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // プリロードされたBGMがあれば使用
    if (bgmAudios[name]) {
        currentBGM = bgmAudios[name];
        currentBGM.play().catch(e => {
            console.log('BGM再生エラー、Web Audio APIにフォールバック:', e);
            createBGM(name);  // フォールバック
        });
    } else {
        // なければWeb Audio APIで生成
        createBGM(name);
    }
}

function stopBGM() {
    if (currentBGM) {
        if (currentBGM instanceof Audio) {
            currentBGM.pause();
            currentBGM.currentTime = 0;
        } else if (currentBGM.stop) {
            currentBGM.stop();
        }
        currentBGM = null;
    }
}

function setVolumes(bgmVolume, sfxVolume) {
    bgmGain.gain.value = bgmVolume;
    sfxGain.gain.value = sfxVolume;
}

// オーディオコンテキストの初期化（ユーザー操作で）
document.addEventListener('click', () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}, { once: true });