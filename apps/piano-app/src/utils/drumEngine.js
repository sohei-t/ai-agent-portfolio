/**
 * Drum Engine for Piano App
 * Provides rhythm backing tracks and drum sounds
 */

// Drum sound parameters
const DRUM_SOUNDS = {
  kick: {
    frequency: 60,
    attack: 0.01,
    decay: 0.08,
    pitch_decay: 0.01,
    tone: 0.5,
    click: 0.8,
  },
  snare: {
    frequency: 200,
    noise_frequency: 2000,
    attack: 0.005,
    decay: 0.1,
    tone: 0.5,
    noise: 0.8,
  },
  hihat_closed: {
    frequency: 6000,
    attack: 0.001,
    decay: 0.03,
    filter_frequency: 8000,
  },
  hihat_open: {
    frequency: 6000,
    attack: 0.001,
    decay: 0.3,
    filter_frequency: 8000,
  },
  crash: {
    frequency: 4000,
    attack: 0.001,
    decay: 1.5,
    filter_frequency: 5000,
  },
  ride: {
    frequency: 3000,
    attack: 0.001,
    decay: 0.8,
    filter_frequency: 4000,
  },
  tom_high: {
    frequency: 150,
    attack: 0.01,
    decay: 0.2,
    pitch_decay: 0.02,
  },
  tom_mid: {
    frequency: 100,
    attack: 0.01,
    decay: 0.25,
    pitch_decay: 0.02,
  },
  tom_low: {
    frequency: 80,
    attack: 0.01,
    decay: 0.3,
    pitch_decay: 0.02,
  },
  clap: {
    frequency: 1500,
    attack: 0.001,
    decay: 0.05,
    reverb: 0.2,
  },
  cowbell: {
    frequency: 800,
    attack: 0.001,
    decay: 0.1,
    harmonics: [1, 0.5, 0.3],
  },
  rimshot: {
    frequency: 500,
    attack: 0.001,
    decay: 0.04,
    click: 1.0,
  },
};

// Rhythm patterns (16 steps = 1 bar at 16th note resolution)
const RHYTHM_PATTERNS = {
  none: {
    name: 'なし',
    nameEn: 'None',
    bpm: 120,
    pattern: {},
  },
  rock_8beat: {
    name: '8ビート（ロック）',
    nameEn: '8 Beat (Rock)',
    bpm: 120,
    pattern: {
      kick:         [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
      snare:        [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      hihat_closed: [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    },
  },
  rock_16beat: {
    name: '16ビート（ロック）',
    nameEn: '16 Beat (Rock)',
    bpm: 110,
    pattern: {
      kick:         [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0],
      snare:        [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      hihat_closed: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    },
  },
  disco: {
    name: 'ディスコ',
    nameEn: 'Disco',
    bpm: 120,
    pattern: {
      kick:         [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
      snare:        [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      hihat_open:   [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
      hihat_closed: [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    },
  },
  funk: {
    name: 'ファンク',
    nameEn: 'Funk',
    bpm: 110,
    pattern: {
      kick:         [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
      snare:        [0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0],
      hihat_closed: [1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
      hihat_open:   [0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0],
    },
  },
  jazz: {
    name: 'ジャズ',
    nameEn: 'Jazz',
    bpm: 140,
    pattern: {
      kick:         [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
      snare:        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ride:         [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],
      hihat_closed: [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
    },
  },
  bossa_nova: {
    name: 'ボサノヴァ',
    nameEn: 'Bossa Nova',
    bpm: 130,
    pattern: {
      kick:         [1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0],
      rimshot:      [0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
      hihat_closed: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    },
  },
  latin: {
    name: 'ラテン',
    nameEn: 'Latin',
    bpm: 125,
    pattern: {
      kick:         [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],
      snare:        [0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0],
      cowbell:      [1,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0],
      hihat_closed: [0,1,0,1,0,1,0,0,1,0,1,0,1,0,0,1],
    },
  },
  reggae: {
    name: 'レゲエ',
    nameEn: 'Reggae',
    bpm: 90,
    pattern: {
      kick:         [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0],
      snare:        [0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
      hihat_closed: [1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0],
      rimshot:      [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    },
  },
  hip_hop: {
    name: 'ヒップホップ',
    nameEn: 'Hip Hop',
    bpm: 90,
    pattern: {
      kick:         [1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],
      snare:        [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      hihat_closed: [1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1],
      hihat_open:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    },
  },
  waltz: {
    name: 'ワルツ',
    nameEn: 'Waltz',
    bpm: 150,
    pattern: {
      // 3/4 time - using 12 steps instead of 16
      kick:         [1,0,0,0,0,0,0,0,0,0,0,0],
      snare:        [0,0,0,0,1,0,0,0,1,0,0,0],
      hihat_closed: [1,0,0,1,0,0,1,0,0,0,0,0],
    },
  },
  shuffle: {
    name: 'シャッフル',
    nameEn: 'Shuffle',
    bpm: 120,
    pattern: {
      kick:         [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
      snare:        [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      ride:         [1,0,0,1,0,1,1,0,0,1,0,1,1,0,0,1],
    },
  },
  edm: {
    name: 'EDM',
    nameEn: 'EDM',
    bpm: 128,
    pattern: {
      kick:         [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
      clap:         [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      hihat_closed: [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
      crash:        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
  },
  metronome: {
    name: 'メトロノーム',
    nameEn: 'Metronome',
    bpm: 120,
    pattern: {
      cowbell: [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
    },
  },
};

/**
 * Create drum engine
 * @returns {Object} Drum engine interface
 */
export function createDrumEngine() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  let isPlaying = false;
  let currentPattern = 'none';
  let currentBPM = 120;
  let currentStep = 0;
  let intervalId = null;
  let masterVolume = 0.7;

  /**
   * Initialize audio context
   */
  async function initialize() {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    return audioContext.state === 'running';
  }

  /**
   * Play a drum sound
   * @param {string} drumType - Type of drum sound
   * @param {number} time - When to play (audioContext time)
   */
  function playDrumSound(drumType, time = audioContext.currentTime) {
    const drum = DRUM_SOUNDS[drumType];
    if (!drum) return;

    const now = time;

    // Special handling for different drum types
    switch (drumType) {
      case 'kick':
        playKick(drum, now);
        break;
      case 'snare':
        playSnare(drum, now);
        break;
      case 'hihat_closed':
      case 'hihat_open':
        playHiHat(drum, now);
        break;
      case 'crash':
      case 'ride':
        playCymbal(drum, now);
        break;
      case 'clap':
        playClap(drum, now);
        break;
      case 'cowbell':
        playCowbell(drum, now);
        break;
      case 'rimshot':
        playRimshot(drum, now);
        break;
      default:
        playTom(drum, now);
    }
  }

  /**
   * Play kick drum
   */
  function playKick(params, time) {
    // Main tone
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.frequency.setValueAtTime(params.frequency, time);
    osc.frequency.exponentialRampToValueAtTime(params.frequency * 0.5, time + params.pitch_decay);

    gain.gain.setValueAtTime(masterVolume * params.tone, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + params.decay);

    // Click sound
    const clickOsc = audioContext.createOscillator();
    const clickGain = audioContext.createGain();

    clickOsc.frequency.value = params.frequency * 4;
    clickGain.gain.setValueAtTime(masterVolume * params.click, time);
    clickGain.gain.exponentialRampToValueAtTime(0.01, time + params.attack);

    clickOsc.connect(clickGain);
    clickGain.connect(audioContext.destination);

    clickOsc.start(time);
    clickOsc.stop(time + params.attack);
  }

  /**
   * Play snare drum
   */
  function playSnare(params, time) {
    // Tone component
    const toneOsc = audioContext.createOscillator();
    const toneGain = audioContext.createGain();

    toneOsc.frequency.value = params.frequency;
    toneGain.gain.setValueAtTime(masterVolume * params.tone, time);
    toneGain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    toneOsc.connect(toneGain);
    toneGain.connect(audioContext.destination);

    toneOsc.start(time);
    toneOsc.stop(time + params.decay);

    // Noise component
    const noiseBuffer = createNoiseBuffer();
    const noiseSource = audioContext.createBufferSource();
    const noiseGain = audioContext.createGain();
    const noiseFilter = audioContext.createBiquadFilter();

    noiseSource.buffer = noiseBuffer;
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = params.noise_frequency;

    noiseGain.gain.setValueAtTime(masterVolume * params.noise, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioContext.destination);

    noiseSource.start(time);
    noiseSource.stop(time + params.decay);
  }

  /**
   * Play hi-hat
   */
  function playHiHat(params, time) {
    const noiseBuffer = createNoiseBuffer();
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    source.buffer = noiseBuffer;
    filter.type = 'highpass';
    filter.frequency.value = params.frequency;
    filter.Q.value = 10;

    gain.gain.setValueAtTime(masterVolume * 0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    source.start(time);
    source.stop(time + params.decay);
  }

  /**
   * Play cymbal (crash/ride)
   */
  function playCymbal(params, time) {
    const noiseBuffer = createNoiseBuffer();
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const filter2 = audioContext.createBiquadFilter();

    source.buffer = noiseBuffer;
    filter.type = 'highpass';
    filter.frequency.value = params.frequency;
    filter.Q.value = 5;

    filter2.type = 'highpass';
    filter2.frequency.value = params.filter_frequency;
    filter2.Q.value = 8;

    gain.gain.setValueAtTime(masterVolume * 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    source.connect(filter);
    filter.connect(filter2);
    filter2.connect(gain);
    gain.connect(audioContext.destination);

    source.start(time);
    source.stop(time + params.decay);
  }

  /**
   * Play clap
   */
  function playClap(params, time) {
    for (let i = 0; i < 3; i++) {
      const noiseBuffer = createNoiseBuffer();
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      source.buffer = noiseBuffer;
      filter.type = 'bandpass';
      filter.frequency.value = params.frequency;
      filter.Q.value = 10;

      const startTime = time + i * 0.01;
      gain.gain.setValueAtTime(masterVolume * 0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + params.decay);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      source.start(startTime);
      source.stop(startTime + params.decay);
    }
  }

  /**
   * Play cowbell
   */
  function playCowbell(params, time) {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc1.frequency.value = params.frequency;
    osc2.frequency.value = params.frequency * 1.48;

    gain.gain.setValueAtTime(masterVolume * 0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioContext.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + params.decay);
    osc2.stop(time + params.decay);
  }

  /**
   * Play rimshot
   */
  function playRimshot(params, time) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    osc.frequency.value = params.frequency;
    filter.type = 'highpass';
    filter.frequency.value = params.frequency * 2;
    filter.Q.value = 10;

    gain.gain.setValueAtTime(masterVolume * 0.8, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + params.decay);
  }

  /**
   * Play tom
   */
  function playTom(params, time) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.frequency.setValueAtTime(params.frequency, time);
    osc.frequency.exponentialRampToValueAtTime(params.frequency * 0.8, time + params.pitch_decay);

    gain.gain.setValueAtTime(masterVolume * 0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + params.decay);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + params.decay);
  }

  /**
   * Create white noise buffer
   */
  function createNoiseBuffer() {
    const bufferSize = audioContext.sampleRate * 0.5;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  /**
   * Play rhythm pattern step
   */
  function playStep() {
    const pattern = RHYTHM_PATTERNS[currentPattern];
    if (!pattern || !pattern.pattern) return;

    const patternLength = pattern.name === 'ワルツ' ? 12 : 16;

    // Play all drums for current step
    Object.entries(pattern.pattern).forEach(([drum, steps]) => {
      if (steps[currentStep]) {
        playDrumSound(drum);
      }
    });

    // Move to next step
    currentStep = (currentStep + 1) % patternLength;
  }

  /**
   * Start playing rhythm
   */
  function startRhythm() {
    if (isPlaying) return;

    isPlaying = true;
    currentStep = 0;

    // Calculate interval from BPM (16th notes)
    const intervalMs = (60000 / currentBPM) / 4;

    // Play first step immediately
    playStep();

    // Set up interval for subsequent steps
    intervalId = setInterval(playStep, intervalMs);
  }

  /**
   * Stop playing rhythm
   */
  function stopRhythm() {
    if (!isPlaying) return;

    isPlaying = false;
    currentStep = 0;

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  /**
   * Set rhythm pattern
   * @param {string} patternName - Name of the pattern
   */
  function setPattern(patternName) {
    const wasPlaying = isPlaying;

    if (wasPlaying) {
      stopRhythm();
    }

    currentPattern = patternName;

    // Update BPM to pattern's default
    const pattern = RHYTHM_PATTERNS[patternName];
    if (pattern) {
      currentBPM = pattern.bpm;
    }

    if (wasPlaying && patternName !== 'none') {
      startRhythm();
    }
  }

  /**
   * Set BPM
   * @param {number} bpm - Beats per minute
   */
  function setBPM(bpm) {
    currentBPM = Math.max(60, Math.min(200, bpm));

    // Restart if playing to apply new BPM
    if (isPlaying) {
      stopRhythm();
      startRhythm();
    }
  }

  /**
   * Set master volume
   * @param {number} volume - Volume (0-1)
   */
  function setVolume(volume) {
    masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get available patterns
   * @returns {Array} Pattern names and info
   */
  function getAvailablePatterns() {
    return Object.entries(RHYTHM_PATTERNS).map(([key, pattern]) => ({
      key,
      name: pattern.name,
      nameEn: pattern.nameEn,
      bpm: pattern.bpm,
    }));
  }

  /**
   * Cleanup
   */
  async function cleanup() {
    stopRhythm();
    if (audioContext.state !== 'closed') {
      await audioContext.close();
    }
  }

  return {
    initialize,
    play: startRhythm,
    stop: stopRhythm,
    setPattern,
    setBPM,
    setMasterVolume: setVolume,
    getPatterns: () => RHYTHM_PATTERNS,
    getAvailablePatterns,
    playSound: playDrumSound,
    cleanup,
    get isPlaying() { return isPlaying; },
    get currentPattern() { return currentPattern; },
    get currentBPM() { return currentBPM; },
  };
}

export default createDrumEngine;