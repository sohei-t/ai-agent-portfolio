/**
 * SoundSystem.js - Audio Management System
 * Handles BGM and SFX playback
 */

export class SoundSystem {
  constructor() {
    // Audio context
    this.audioContext = null;
    this.initialized = false;

    // Volume settings
    this.masterVolume = 1.0;
    this.bgmVolume = 0.3;
    this.sfxVolume = 0.7;

    // Mute states
    this.bgmMuted = false;
    this.sfxMuted = false;

    // Current BGM
    this.currentBgm = null;
    this.bgmGainNode = null;

    // Sound pools for frequently used SFX
    this.soundPools = {};
    this.poolSize = 5;

    // Loaded sounds
    this.sounds = {};

    // Sound definitions
    this.soundDefs = {
      // BGM
      bgm_title: { src: 'assets/audio/bgm_title.mp3', loop: true, volume: 0.3 },
      bgm_game: { src: 'assets/audio/bgm_game.mp3', loop: true, volume: 0.3 },
      bgm_victory: { src: 'assets/audio/bgm_victory.mp3', loop: false, volume: 0.4 },
      bgm_gameover: { src: 'assets/audio/bgm_gameover.mp3', loop: false, volume: 0.4 },

      // SFX
      sfx_bomb: { src: 'assets/audio/sfx_bomb.mp3', loop: false, volume: 0.6 },
      sfx_explosion: { src: 'assets/audio/sfx_explosion.mp3', loop: false, volume: 0.7 },
      sfx_missile: { src: 'assets/audio/sfx_missile.mp3', loop: false, volume: 0.5 },
      sfx_hit: { src: 'assets/audio/sfx_hit.mp3', loop: false, volume: 0.6 },
      sfx_powerup: { src: 'assets/audio/sfx_powerup.mp3', loop: false, volume: 0.5 },
      sfx_engine: { src: 'assets/audio/sfx_engine.mp3', loop: true, volume: 0.2 },
      sfx_button: { src: 'assets/audio/sfx_button.mp3', loop: false, volume: 0.4 },
      sfx_countdown: { src: 'assets/audio/sfx_countdown.mp3', loop: false, volume: 0.5 },
      sfx_start: { src: 'assets/audio/sfx_start.mp3', loop: false, volume: 0.6 }
    };
  }

  /**
   * Initialize audio context (must be called from user gesture)
   */
  async init() {
    if (this.initialized) return true;

    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      // Create master gain node
      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.connect(this.audioContext.destination);
      this.masterGainNode.gain.value = this.masterVolume;

      // Create BGM gain node
      this.bgmGainNode = this.audioContext.createGain();
      this.bgmGainNode.connect(this.masterGainNode);
      this.bgmGainNode.gain.value = this.bgmVolume;

      // Create SFX gain node
      this.sfxGainNode = this.audioContext.createGain();
      this.sfxGainNode.connect(this.masterGainNode);
      this.sfxGainNode.gain.value = this.sfxVolume;

      this.initialized = true;
      console.log('Sound system initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize sound system:', error);
      return false;
    }
  }

  /**
   * Resume audio context (required after user interaction on mobile)
   */
  async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Load a sound
   */
  async loadSound(name) {
    const def = this.soundDefs[name];
    if (!def) {
      console.warn('Sound not defined:', name);
      return null;
    }

    if (this.sounds[name]) {
      return this.sounds[name];
    }

    try {
      const response = await fetch(def.src);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      this.sounds[name] = {
        buffer: audioBuffer,
        def: def
      };

      console.log('Loaded sound:', name);
      return this.sounds[name];
    } catch (error) {
      console.warn('Failed to load sound:', name, error.message);
      return null;
    }
  }

  /**
   * Load all sounds
   */
  async loadAll() {
    const promises = Object.keys(this.soundDefs).map(name => this.loadSound(name));
    await Promise.allSettled(promises);
    console.log('All sounds loaded');
  }

  /**
   * Play BGM
   */
  async playBgm(name, fadeIn = true) {
    if (!this.initialized) {
      console.warn('Sound system not initialized');
      return;
    }

    // Stop current BGM
    this.stopBgm(fadeIn);

    // Load and play new BGM
    const sound = await this.loadSound(name);
    if (!sound) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = sound.buffer;
    source.loop = sound.def.loop;

    // Create gain node for this BGM
    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.bgmGainNode);

    if (fadeIn) {
      gainNode.gain.value = 0;
      gainNode.gain.linearRampToValueAtTime(
        sound.def.volume,
        this.audioContext.currentTime + 1
      );
    } else {
      gainNode.gain.value = sound.def.volume;
    }

    source.connect(gainNode);
    source.start();

    this.currentBgm = {
      source,
      gainNode,
      name
    };

    if (this.bgmMuted) {
      this.bgmGainNode.gain.value = 0;
    }
  }

  /**
   * Stop BGM
   */
  stopBgm(fadeOut = true) {
    if (!this.currentBgm) return;

    const bgm = this.currentBgm;

    if (fadeOut) {
      bgm.gainNode.gain.linearRampToValueAtTime(
        0,
        this.audioContext.currentTime + 0.5
      );
      setTimeout(() => {
        try {
          bgm.source.stop();
        } catch (e) {
          // Already stopped
        }
      }, 500);
    } else {
      try {
        bgm.source.stop();
      } catch (e) {
        // Already stopped
      }
    }

    this.currentBgm = null;
  }

  /**
   * Play SFX
   */
  async playSfx(name) {
    if (!this.initialized || this.sfxMuted) return;

    const sound = this.sounds[name] || await this.loadSound(name);
    if (!sound) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = sound.buffer;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = sound.def.volume;
    gainNode.connect(this.sfxGainNode);

    source.connect(gainNode);
    source.start();

    return source;
  }

  /**
   * Set master volume
   */
  setMasterVolume(value) {
    this.masterVolume = Math.max(0, Math.min(1, value));
    if (this.masterGainNode) {
      this.masterGainNode.gain.value = this.masterVolume;
    }
  }

  /**
   * Set BGM volume
   */
  setBgmVolume(value) {
    this.bgmVolume = Math.max(0, Math.min(1, value));
    if (this.bgmGainNode && !this.bgmMuted) {
      this.bgmGainNode.gain.value = this.bgmVolume;
    }
  }

  /**
   * Set SFX volume
   */
  setSfxVolume(value) {
    this.sfxVolume = Math.max(0, Math.min(1, value));
    if (this.sfxGainNode && !this.sfxMuted) {
      this.sfxGainNode.gain.value = this.sfxVolume;
    }
  }

  /**
   * Toggle BGM mute
   */
  toggleBgmMute() {
    this.bgmMuted = !this.bgmMuted;
    if (this.bgmGainNode) {
      this.bgmGainNode.gain.value = this.bgmMuted ? 0 : this.bgmVolume;
    }
    return this.bgmMuted;
  }

  /**
   * Toggle SFX mute
   */
  toggleSfxMute() {
    this.sfxMuted = !this.sfxMuted;
    if (this.sfxGainNode) {
      this.sfxGainNode.gain.value = this.sfxMuted ? 0 : this.sfxVolume;
    }
    return this.sfxMuted;
  }

  /**
   * Mute all
   */
  muteAll() {
    this.bgmMuted = true;
    this.sfxMuted = true;
    if (this.bgmGainNode) this.bgmGainNode.gain.value = 0;
    if (this.sfxGainNode) this.sfxGainNode.gain.value = 0;
  }

  /**
   * Unmute all
   */
  unmuteAll() {
    this.bgmMuted = false;
    this.sfxMuted = false;
    if (this.bgmGainNode) this.bgmGainNode.gain.value = this.bgmVolume;
    if (this.sfxGainNode) this.sfxGainNode.gain.value = this.sfxVolume;
  }

  /**
   * Get current volumes
   */
  getVolumes() {
    return {
      master: this.masterVolume,
      bgm: this.bgmVolume,
      sfx: this.sfxVolume,
      bgmMuted: this.bgmMuted,
      sfxMuted: this.sfxMuted
    };
  }

  /**
   * Cleanup
   */
  destroy() {
    this.stopBgm(false);

    if (this.audioContext) {
      this.audioContext.close();
    }

    this.sounds = {};
    this.initialized = false;
  }
}

export default SoundSystem;
