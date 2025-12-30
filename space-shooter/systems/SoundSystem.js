/**
 * SoundSystem.js
 * Retro sound effects and dynamic BGM using Web Audio API
 */

class SoundSystem {
  constructor() {
    this.enabled = true;
    this.context = null;
    this.masterVolume = 0.3;
    this.bgmOscillator = null;
    this.bgmGain = null;
    this.bgmTempo = 120; // BPM
    this.bgmPattern = 0;
    this.lastBeatTime = 0;
    this.enemyMoveSound = 0; // Alternating bass notes

    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.context.destination);
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
      this.enabled = false;
    }
  }

  init() {
    if (!this.enabled) return;

    // Start audio context on user interaction
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  playShoot() {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.1);
  }

  playExplosion() {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    // White noise for explosion
    const bufferSize = this.context.sampleRate * 0.2;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.context.createBufferSource();
    noise.buffer = buffer;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.context.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.2);

    gain.gain.setValueAtTime(0.5, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);

    noise.start(this.context.currentTime);
    noise.stop(this.context.currentTime + 0.2);
  }

  playHit() {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.1);
  }

  playPowerUp() {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'sine';

    // Ascending tone
    const notes = [523, 659, 784, 1047]; // C, E, G, High C
    notes.forEach((freq, index) => {
      osc.frequency.setValueAtTime(freq, this.context.currentTime + index * 0.1);
    });

    gain.gain.setValueAtTime(0.2, this.context.currentTime);
    gain.gain.setValueAtTime(0.2, this.context.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.4);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.4);
  }

  playEnemyMove(enemyCount, maxEnemies) {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    // Classic Space Invaders alternating bass notes
    const baseFreq = 55; // Low A
    const frequencies = [baseFreq, baseFreq * 1.5, baseFreq * 1.25, baseFreq * 0.75];

    osc.type = 'square';
    osc.frequency.setValueAtTime(frequencies[this.enemyMoveSound % 4], this.context.currentTime);

    // Increase tempo as enemies decrease
    const speedRatio = 1 - (enemyCount / maxEnemies);
    const duration = 0.05 + speedRatio * 0.05;

    gain.gain.setValueAtTime(0.3, this.context.currentTime);
    gain.gain.setValueAtTime(0.3, this.context.currentTime + duration);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration + 0.01);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + duration + 0.01);

    this.enemyMoveSound++;
  }

  playUFO() {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const lfo = this.context.createOscillator();
    const lfoGain = this.context.createGain();

    // LFO for wobble effect
    lfo.frequency.value = 10;
    lfoGain.gain.value = 100;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.context.currentTime);

    gain.gain.setValueAtTime(0.2, this.context.currentTime);

    lfo.start(this.context.currentTime);
    osc.start(this.context.currentTime);

    // Continue playing until stopped
    return {
      stop: () => {
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);
        lfo.stop(this.context.currentTime + 0.1);
        osc.stop(this.context.currentTime + 0.1);
      }
    };
  }

  playGameOver() {
    if (!this.enabled) return;

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'sawtooth';

    // Descending tones
    osc.frequency.setValueAtTime(440, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.context.currentTime + 1);

    gain.gain.setValueAtTime(0.3, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 1);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 1);
  }

  playUFODestroy() {
    if (!this.enabled) return;

    // High-pitched descending sound for UFO destruction
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 0.3);

    gain.gain.setValueAtTime(0.4, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.3);

    // Add some noise for impact
    setTimeout(() => {
      this.playExplosion();
    }, 100);
  }

  playVictory() {
    if (!this.enabled) return;

    const notes = [523, 659, 784, 1047, 784, 1047]; // Victory fanfare

    notes.forEach((freq, index) => {
      setTimeout(() => {
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.context.currentTime);

        gain.gain.setValueAtTime(0.2, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.2);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.2);
      }, index * 150);
    });
  }

  startBGM() {
    if (!this.enabled || this.bgmOscillator) return;

    // Simple rhythmic background beat
    this.playBeat();
  }

  playBeat() {
    if (!this.enabled) return;

    const now = this.context.currentTime;
    const beatInterval = 60 / this.bgmTempo;

    // Schedule next beat
    if (this.bgmOscillator) {
      setTimeout(() => this.playBeat(), beatInterval * 1000);
    }

    // Create a simple drum-like beat
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  stopBGM() {
    this.bgmOscillator = null;
  }

  updateBGMTempo(enemyCount, maxEnemies) {
    if (!this.enabled) return;

    // Increase tempo as enemies decrease
    const ratio = enemyCount / maxEnemies;
    this.bgmTempo = 120 + (1 - ratio) * 180; // 120-300 BPM
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.value = this.masterVolume;
    }
  }

  mute() {
    this.setVolume(0);
  }

  unmute() {
    this.setVolume(0.3);
  }

  destroy() {
    this.stopBGM();
    if (this.context) {
      this.context.close();
    }
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.SoundSystem = SoundSystem;
}