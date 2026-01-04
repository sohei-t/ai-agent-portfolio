/**
 * SoundSystem.js - Audio Management for Racing Game
 *
 * Handles BGM and SFX with volume control and graceful fallback
 */

export class SoundSystem {
  constructor() {
    // Volume settings (lower BGM volume to reduce perceived doubling)
    this.masterVolume = 0.7;
    this.bgmVolume = 0.25;
    this.sfxVolume = 0.5;

    // Mute states
    this.bgmMuted = false;
    this.sfxMuted = false;

    // Audio context for better control
    this.audioContext = null;

    // BGM tracks
    this.bgm = {
      title: null,
      race: null,
      highway: null,
      victory: null,
      gameover: null
    };

    // SFX sounds
    this.sfx = {
      engine_idle: null,
      engine_rev: null,
      brake: null,
      crash: null,
      spin: null,
      checkpoint: null,
      countdown_beep: null,
      countdown_go: null,
      overtake: null,
      item_pickup: null,
      item_boost: null,
      item_shield: null,
      item_slowmo: null,
      puddle: null,
      oil_slip: null,
      button: null
    };

    // Currently playing BGM
    this.currentBgm = null;

    // Transition state (prevents race conditions on iOS)
    this._isTransitioning = false;
    this._pendingTrack = null;

    // Base path for audio files
    this.basePath = './assets/audio/';

    // Loading state
    this.loaded = false;
    this.loadPromise = null;
  }

  /**
   * Initialize audio context (must be called from user gesture)
   */
  async init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      console.log('Audio context initialized');
      return true;
    } catch (error) {
      console.warn('Audio context not available:', error);
      return false;
    }
  }

  /**
   * Load all audio files
   */
  async loadAll() {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = this._loadAllAudio();
    return this.loadPromise;
  }

  async _loadAllAudio() {
    const loadPromises = [];

    // Load BGM
    for (const key of Object.keys(this.bgm)) {
      loadPromises.push(this._loadAudio(`bgm_${key}.wav`, 'bgm', key));
    }

    // Load SFX
    for (const key of Object.keys(this.sfx)) {
      loadPromises.push(this._loadAudio(`sfx_${key}.wav`, 'sfx', key));
    }

    const results = await Promise.allSettled(loadPromises);

    const loaded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Audio loaded: ${loaded} success, ${failed} failed`);
    this.loaded = true;

    return { loaded, failed };
  }

  async _loadAudio(filename, type, key) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = this.basePath + filename;
      audio.preload = 'auto';

      audio.addEventListener('canplaythrough', () => {
        if (type === 'bgm') {
          this.bgm[key] = audio;
          audio.loop = key !== 'victory' && key !== 'gameover';
        } else {
          this.sfx[key] = audio;
        }
        resolve(audio);
      }, { once: true });

      audio.addEventListener('error', (e) => {
        console.warn(`Failed to load ${filename}:`, e);
        reject(e);
      }, { once: true });

      // Start loading
      audio.load();
    });
  }

  /**
   * Play BGM track with transition safety
   */
  playBgm(track) {
    // Prevent playing the same track again
    if (this.currentBgm === track) {
      console.log(`BGM ${track} already playing, skipping`);
      return;
    }

    // Prevent rapid transitions (debounce)
    if (this._isTransitioning) {
      console.log(`BGM transition in progress, queueing ${track}`);
      this._pendingTrack = track;
      return;
    }

    this._isTransitioning = true;

    // Stop ALL BGM tracks first
    this.stopBgm();

    const audio = this.bgm[track];
    if (!audio) {
      console.warn(`BGM track not found: ${track}`);
      this._isTransitioning = false;
      return;
    }

    console.log(`Playing BGM: ${track}`);

    // Small delay to ensure previous audio is fully stopped (iOS fix)
    setTimeout(() => {
      audio.volume = this.bgmMuted ? 0 : this.bgmVolume * this.masterVolume;
      audio.currentTime = 0;
      audio.play().catch(e => console.warn('BGM play failed:', e));

      this.currentBgm = track;
      this._isTransitioning = false;

      // Play any queued track
      if (this._pendingTrack && this._pendingTrack !== track) {
        const pending = this._pendingTrack;
        this._pendingTrack = null;
        this.playBgm(pending);
      }
    }, 100);
  }

  /**
   * Stop current BGM (and ensure all BGM tracks are stopped)
   * Uses aggressive stop method for iOS Safari compatibility
   */
  stopBgm() {
    console.log('stopBgm called - stopping ALL BGM tracks');

    // Stop ALL BGM tracks to prevent double-playing
    for (const [key, audio] of Object.entries(this.bgm)) {
      if (audio) {
        try {
          // iOS Safari: need to be thorough
          audio.pause();
          audio.currentTime = 0;
          // Ensure audio is not in a playing state
          audio.muted = true;
          // Small delay then unmute (helps iOS)
          setTimeout(() => {
            if (audio) audio.muted = false;
          }, 50);
        } catch (e) {
          console.warn(`Error stopping BGM ${key}:`, e);
        }
      }
    }
    this.currentBgm = null;
    this._isTransitioning = false;
  }

  /**
   * Force stop a specific track (for debugging)
   */
  forceStopTrack(track) {
    const audio = this.bgm[track];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      console.log(`Force stopped: ${track}`);
    }
  }

  /**
   * Pause current BGM
   */
  pauseBgm() {
    if (this.currentBgm && this.bgm[this.currentBgm]) {
      this.bgm[this.currentBgm].pause();
    }
  }

  /**
   * Resume current BGM
   */
  resumeBgm() {
    if (this.currentBgm && this.bgm[this.currentBgm]) {
      this.bgm[this.currentBgm].play().catch(e => console.warn('Resume failed:', e));
    }
  }

  /**
   * Play sound effect
   */
  playSfx(effect) {
    if (this.sfxMuted) return;

    const audio = this.sfx[effect];
    if (!audio) {
      console.warn(`SFX not found: ${effect}`);
      return;
    }

    // Clone audio for overlapping sounds
    const clone = audio.cloneNode();
    clone.volume = this.sfxVolume * this.masterVolume;
    clone.play().catch(e => console.warn('SFX play failed:', e));
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this._updateVolumes();
  }

  /**
   * Set BGM volume
   */
  setBgmVolume(volume) {
    this.bgmVolume = Math.max(0, Math.min(1, volume));
    this._updateVolumes();
  }

  /**
   * Set SFX volume
   */
  setSfxVolume(volume) {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Toggle BGM mute
   */
  toggleBgmMute() {
    this.bgmMuted = !this.bgmMuted;
    this._updateVolumes();
    return this.bgmMuted;
  }

  /**
   * Toggle SFX mute
   */
  toggleSfxMute() {
    this.sfxMuted = !this.sfxMuted;
    return this.sfxMuted;
  }

  _updateVolumes() {
    // Update BGM volume
    for (const audio of Object.values(this.bgm)) {
      if (audio) {
        audio.volume = this.bgmMuted ? 0 : this.bgmVolume * this.masterVolume;
      }
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    this.stopBgm();

    for (const audio of Object.values(this.bgm)) {
      if (audio) {
        audio.src = '';
      }
    }

    for (const audio of Object.values(this.sfx)) {
      if (audio) {
        audio.src = '';
      }
    }

    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
