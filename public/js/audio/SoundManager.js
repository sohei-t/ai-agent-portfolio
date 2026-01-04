/**
 * SoundManager.js - Audio System
 * Handles BGM and sound effects with Web Audio API
 */

export class SoundManager {
  constructor() {
    this.audioContext = null;
    this.initialized = false;

    // Volume settings
    this.bgmVolume = 0.5;
    this.sfxVolume = 0.7;

    // Audio buffers
    this.sounds = {};
    this.bgmSource = null;
    this.bgmGain = null;
    this.sfxGain = null;

    // Current state
    this.bgmPlaying = false;
    this.muted = false;
  }

  /**
   * Initialize audio context - must be called from user gesture
   */
  async init() {
    if (this.initialized) return true;

    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create gain nodes
      this.bgmGain = this.audioContext.createGain();
      this.bgmGain.gain.value = this.bgmVolume;
      this.bgmGain.connect(this.audioContext.destination);

      this.sfxGain = this.audioContext.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.audioContext.destination);

      // Generate synthesized sounds
      await this.generateSounds();

      this.initialized = true;
      console.log('[SoundManager] Initialized successfully');
      return true;
    } catch (error) {
      console.error('[SoundManager] Failed to initialize:', error);
      return false;
    }
  }

  /**
   * Generate synthesized 8-bit style sounds
   */
  async generateSounds() {
    // Generate each sound
    this.sounds.engine = this.createEngineSound();
    this.sounds.drift = this.createDriftSound();
    this.sounds.boost = this.createBoostSound();
    this.sounds.item = this.createItemSound();
    this.sounds.hit = this.createHitSound();
    this.sounds.countdown = this.createCountdownSound();
    this.sounds.go = this.createGoSound();
    this.sounds.lap = this.createLapSound();
    this.sounds.finish = this.createFinishSound();
    this.sounds.bgmRace = this.createRaceBGM();
    this.sounds.bgmTitle = this.createTitleBGM();

    console.log('[SoundManager] Sounds generated');
  }

  // Synthesized sound generators
  createEngineSound() {
    const duration = 0.1;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Engine rumble with harmonics
      data[i] = (
        Math.sin(2 * Math.PI * 60 * t) * 0.3 +
        Math.sin(2 * Math.PI * 120 * t) * 0.2 +
        Math.sin(2 * Math.PI * 180 * t) * 0.1 +
        (Math.random() - 0.5) * 0.1
      ) * 0.5;
    }

    return buffer;
  }

  createDriftSound() {
    const duration = 0.3;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Tire screech - filtered noise with pitch
      const noise = (Math.random() - 0.5);
      const freq = 800 + Math.sin(t * 20) * 200;
      data[i] = (
        Math.sin(2 * Math.PI * freq * t) * 0.3 +
        noise * 0.3
      ) * (1 - t / duration) * 0.6;
    }

    return buffer;
  }

  createBoostSound() {
    const duration = 0.5;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Rising whoosh
      const freq = 200 + t * 1000;
      data[i] = (
        Math.sin(2 * Math.PI * freq * t) * 0.4 +
        (Math.random() - 0.5) * 0.2
      ) * Math.min(1, (1 - t / duration) * 2) * 0.7;
    }

    return buffer;
  }

  createItemSound() {
    const duration = 0.3;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Happy chime
      const freq1 = 523.25; // C5
      const freq2 = 659.25; // E5
      const freq3 = 783.99; // G5
      data[i] = (
        Math.sin(2 * Math.PI * freq1 * t) * 0.3 * (t < 0.1 ? 1 : 0) +
        Math.sin(2 * Math.PI * freq2 * t) * 0.3 * (t > 0.1 && t < 0.2 ? 1 : 0) +
        Math.sin(2 * Math.PI * freq3 * t) * 0.3 * (t > 0.2 ? 1 : 0)
      ) * (1 - t / duration) * 0.8;
    }

    return buffer;
  }

  createHitSound() {
    const duration = 0.2;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Crash sound
      const noise = (Math.random() - 0.5);
      data[i] = (
        noise * 0.8 +
        Math.sin(2 * Math.PI * 100 * t) * 0.3
      ) * (1 - t / duration) * 0.7;
    }

    return buffer;
  }

  createCountdownSound() {
    const duration = 0.2;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Beep
      data[i] = Math.sin(2 * Math.PI * 440 * t) * (1 - t / duration) * 0.6;
    }

    return buffer;
  }

  createGoSound() {
    const duration = 0.4;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Higher pitched fanfare
      const freq = 880 * (1 + t);
      data[i] = (
        Math.sin(2 * Math.PI * freq * t) * 0.4 +
        Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.2
      ) * (1 - t / duration) * 0.8;
    }

    return buffer;
  }

  createLapSound() {
    const duration = 0.5;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Ascending notes
      const note = Math.floor(t * 8);
      const frequencies = [523, 587, 659, 784];
      const freq = frequencies[note % 4];
      data[i] = Math.sin(2 * Math.PI * freq * t) * (1 - t / duration) * 0.6;
    }

    return buffer;
  }

  createFinishSound() {
    const duration = 1.5;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      // Victory fanfare
      const notes = [
        { start: 0, end: 0.2, freq: 523 },
        { start: 0.2, end: 0.4, freq: 659 },
        { start: 0.4, end: 0.6, freq: 784 },
        { start: 0.6, end: 1.2, freq: 1047 }
      ];

      let value = 0;
      for (const note of notes) {
        if (t >= note.start && t < note.end) {
          const noteT = t - note.start;
          const envelope = Math.min(1, (note.end - t) * 5);
          value = Math.sin(2 * Math.PI * note.freq * noteT) * envelope * 0.5;
          break;
        }
      }
      data[i] = value;
    }

    return buffer;
  }

  createRaceBGM() {
    // Simple looping race music
    const duration = 4; // 4 second loop
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    const bpm = 140;
    const beatDuration = 60 / bpm;

    // Simple bass and melody pattern
    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const beat = Math.floor(t / beatDuration);
      const beatPhase = (t % beatDuration) / beatDuration;

      // Bass drum on beat
      let value = 0;
      if (beat % 2 === 0 && beatPhase < 0.1) {
        value += Math.sin(2 * Math.PI * 60 * t) * (0.1 - beatPhase) * 5;
      }

      // Hi-hat on off-beat
      if (beat % 2 === 1 && beatPhase < 0.05) {
        value += (Math.random() - 0.5) * (0.05 - beatPhase) * 10;
      }

      // Simple melody
      const melodyNotes = [392, 440, 523, 440, 523, 587, 659, 587]; // G4, A4, C5, etc.
      const noteIndex = beat % 8;
      const freq = melodyNotes[noteIndex];
      value += Math.sin(2 * Math.PI * freq * t) * 0.15 * (1 - beatPhase * 0.5);

      // Bass line
      const bassNotes = [196, 196, 220, 220, 262, 262, 220, 220]; // G3, A3, C4
      const bassFreq = bassNotes[beat % 8];
      value += Math.sin(2 * Math.PI * bassFreq * t) * 0.2;

      data[i] = value * 0.4;
    }

    return buffer;
  }

  createTitleBGM() {
    // Chill title screen music
    const duration = 8;
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * duration, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / this.audioContext.sampleRate;

      // Pad chord
      const chord = [261.63, 329.63, 392]; // C, E, G
      let value = 0;
      for (const freq of chord) {
        value += Math.sin(2 * Math.PI * freq * t + Math.sin(t * 2) * 0.5) * 0.1;
      }

      // Soft arpeggio
      const arpNotes = [523, 659, 784, 659];
      const noteT = (t * 2) % 1;
      const noteIndex = Math.floor((t * 2) % 4);
      const arpFreq = arpNotes[noteIndex];
      value += Math.sin(2 * Math.PI * arpFreq * t) * 0.1 * Math.max(0, 1 - noteT * 2);

      data[i] = value * 0.5;
    }

    return buffer;
  }

  // Playback methods
  play(soundName, loop = false) {
    if (!this.initialized || this.muted) return null;

    const buffer = this.sounds[soundName];
    if (!buffer) {
      console.warn(`[SoundManager] Sound not found: ${soundName}`);
      return null;
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(this.sfxGain);
    source.start();

    return source;
  }

  playBGM(trackName) {
    if (!this.initialized) return;

    // Stop current BGM
    this.stopBGM();

    const buffer = this.sounds[trackName];
    if (!buffer) {
      console.warn(`[SoundManager] BGM not found: ${trackName}`);
      return;
    }

    this.bgmSource = this.audioContext.createBufferSource();
    this.bgmSource.buffer = buffer;
    this.bgmSource.loop = true;
    this.bgmSource.connect(this.bgmGain);
    this.bgmSource.start();
    this.bgmPlaying = true;

    console.log(`[SoundManager] Playing BGM: ${trackName}`);
  }

  stopBGM() {
    if (this.bgmSource) {
      try {
        this.bgmSource.stop();
      } catch (e) {
        // Already stopped
      }
      this.bgmSource = null;
      this.bgmPlaying = false;
    }
  }

  setBgmVolume(value) {
    this.bgmVolume = value;
    if (this.bgmGain) {
      this.bgmGain.gain.value = value;
    }
  }

  setSfxVolume(value) {
    this.sfxVolume = value;
    if (this.sfxGain) {
      this.sfxGain.gain.value = value;
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted) {
      this.stopBGM();
    }
  }

  // Convenience methods for common sounds
  playEngine() {
    return this.play('engine', false);
  }

  playDrift() {
    return this.play('drift', false);
  }

  playBoost() {
    return this.play('boost', false);
  }

  playItem() {
    return this.play('item', false);
  }

  playItemGet() {
    return this.play('item', false);
  }

  playHit() {
    return this.play('hit', false);
  }

  playPowerUp() {
    return this.play('boost', false);
  }

  playCountdown(isGo = false) {
    if (isGo) {
      return this.play('go', false);
    }
    return this.play('countdown', false);
  }

  playGo() {
    return this.play('go', false);
  }

  playLap() {
    return this.play('lap', false);
  }

  playFinish() {
    return this.play('finish', false);
  }

  // Pause/Resume BGM
  pauseBGM() {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  resumeBGM() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
