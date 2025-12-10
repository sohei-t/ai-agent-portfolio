/**
 * AudioManager.js
 * Manages sound effects and background music
 */

export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.music = new Map();
    this.currentMusic = null;
    this.musicVolume = 0.5;
    this.sfxVolume = 0.8;
    this.masterVolume = 0.7;
    this.enabled = true;
    this.musicEnabled = true;
    this.sfxEnabled = true;

    // Initialize Web Audio API
    this.initAudioContext();
  }

  /**
   * Initialize Audio Context
   */
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.error('Web Audio API not supported:', error);
    }
  }

  /**
   * Resume audio context (required for some browsers)
   */
  async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Add sound effect
   * @param {string} key - Sound key
   * @param {HTMLAudioElement} audio - Audio element
   */
  addSound(key, audio) {
    this.sounds.set(key, audio);
  }

  /**
   * Add background music
   * @param {string} key - Music key
   * @param {HTMLAudioElement} audio - Audio element
   */
  addMusic(key, audio) {
    audio.loop = true;
    this.music.set(key, audio);
  }

  /**
   * Play sound effect
   * @param {string} key - Sound key
   * @param {number} volume - Volume override (0-1)
   */
  playSound(key, volume = null) {
    if (!this.enabled || !this.sfxEnabled) return;

    const sound = this.sounds.get(key);
    if (!sound) {
      console.warn(`Sound not found: ${key}`);
      return;
    }

    this.resumeContext();

    // Clone audio for overlapping sounds
    const clone = sound.cloneNode();
    const effectiveVolume = volume !== null ? volume : this.sfxVolume;
    clone.volume = effectiveVolume * this.masterVolume;

    clone.play().catch(error => {
      console.error(`Failed to play sound ${key}:`, error);
    });
  }

  /**
   * Play background music
   * @param {string} key - Music key
   * @param {boolean} fadeIn - Whether to fade in
   */
  playMusic(key, fadeIn = true) {
    if (!this.enabled || !this.musicEnabled) return;

    // Stop current music
    if (this.currentMusic) {
      this.stopMusic(fadeIn);
    }

    const music = this.music.get(key);
    if (!music) {
      console.warn(`Music not found: ${key}`);
      return;
    }

    this.resumeContext();

    this.currentMusic = music;
    music.volume = fadeIn ? 0 : this.musicVolume * this.masterVolume;

    music.play().catch(error => {
      console.error(`Failed to play music ${key}:`, error);
    });

    // Fade in
    if (fadeIn) {
      this.fadeVolume(music, this.musicVolume * this.masterVolume, 1000);
    }
  }

  /**
   * Stop background music
   * @param {boolean} fadeOut - Whether to fade out
   */
  stopMusic(fadeOut = true) {
    if (!this.currentMusic) return;

    if (fadeOut) {
      this.fadeVolume(this.currentMusic, 0, 1000, () => {
        this.currentMusic.pause();
        this.currentMusic.currentTime = 0;
        this.currentMusic = null;
      });
    } else {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.currentMusic = null;
    }
  }

  /**
   * Pause background music
   */
  pauseMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
  }

  /**
   * Resume background music
   */
  resumeMusic() {
    if (this.currentMusic) {
      this.currentMusic.play().catch(error => {
        console.error('Failed to resume music:', error);
      });
    }
  }

  /**
   * Fade volume
   * @param {HTMLAudioElement} audio - Audio element
   * @param {number} targetVolume - Target volume (0-1)
   * @param {number} duration - Duration in ms
   * @param {Function} onComplete - Callback on completion
   */
  fadeVolume(audio, targetVolume, duration, onComplete = null) {
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const startTime = Date.now();

    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      audio.volume = startVolume + volumeDiff * progress;

      if (progress < 1) {
        requestAnimationFrame(fade);
      } else if (onComplete) {
        onComplete();
      }
    };

    fade();
  }

  /**
   * Set master volume
   * @param {number} volume - Volume (0-1)
   */
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateMusicVolume();
  }

  /**
   * Set music volume
   * @param {number} volume - Volume (0-1)
   */
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.updateMusicVolume();
  }

  /**
   * Set SFX volume
   * @param {number} volume - Volume (0-1)
   */
  setSfxVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Update current music volume
   */
  updateMusicVolume() {
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  /**
   * Toggle audio on/off
   * @returns {boolean} New state
   */
  toggleAudio() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopMusic(false);
    }
    return this.enabled;
  }

  /**
   * Toggle music on/off
   * @returns {boolean} New state
   */
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (!this.musicEnabled && this.currentMusic) {
      this.currentMusic.pause();
    } else if (this.musicEnabled && this.currentMusic) {
      this.currentMusic.play();
    }
    return this.musicEnabled;
  }

  /**
   * Toggle SFX on/off
   * @returns {boolean} New state
   */
  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }

  /**
   * Create a simple beep sound using Web Audio API
   * @param {number} frequency - Frequency in Hz
   * @param {number} duration - Duration in seconds
   * @param {string} type - Oscillator type ('sine', 'square', 'sawtooth', 'triangle')
   * @returns {AudioBuffer} Audio buffer
   */
  createBeep(frequency = 440, duration = 0.1, type = 'sine') {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = this.audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const value = Math.sin(2 * Math.PI * frequency * t);

      // Apply envelope (fade in/out)
      const envelope = Math.min(i / (sampleRate * 0.01), 1) *
                      Math.min((numSamples - i) / (sampleRate * 0.01), 1);

      data[i] = value * envelope;
    }

    return buffer;
  }

  /**
   * Play a generated beep sound
   * @param {number} frequency - Frequency in Hz
   * @param {number} duration - Duration in seconds
   * @param {string} type - Oscillator type
   */
  playBeep(frequency = 440, duration = 0.1, type = 'sine') {
    if (!this.audioContext || !this.enabled || !this.sfxEnabled) return;

    this.resumeContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      this.sfxVolume * this.masterVolume,
      this.audioContext.currentTime + 0.01
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + duration
    );

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  /**
   * Create placeholder sound effects using Web Audio API
   */
  createPlaceholderSounds() {
    // These will be played using playBeep() method
    // Store configurations instead of actual audio
    this.placeholderConfigs = {
      shoot: { frequency: 800, duration: 0.05, type: 'square' },
      explosion: { frequency: 100, duration: 0.3, type: 'sawtooth' },
      powerup: { frequency: 600, duration: 0.2, type: 'sine' },
      hit: { frequency: 200, duration: 0.1, type: 'triangle' },
      boss: { frequency: 80, duration: 0.5, type: 'sawtooth' }
    };
  }

  /**
   * Play placeholder sound by name
   * @param {string} name - Sound name
   */
  playPlaceholder(name) {
    const config = this.placeholderConfigs?.[name];
    if (config) {
      this.playBeep(config.frequency, config.duration, config.type);
    }
  }

  /**
   * Clean up resources
   */
  destroy() {
    this.stopMusic(false);
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.sounds.clear();
    this.music.clear();
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
