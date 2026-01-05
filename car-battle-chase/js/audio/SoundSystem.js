/**
 * SoundSystem.js - Audio Management for Racing Game
 * v2.0 - Single Audio Element for BGM (iOS Safari fix)
 *
 * Uses a single audio element for BGM to guarantee only one track plays at a time.
 * This completely eliminates the BGM duplication issue on iOS Safari.
 */

export class SoundSystem {
  constructor() {
    // Volume settings
    this.masterVolume = 0.7;
    this.bgmVolume = 0.35;
    this.sfxVolume = 0.5;

    // Mute states
    this.bgmMuted = false;
    this.sfxMuted = false;

    // Audio context for better control
    this.audioContext = null;

    // CRITICAL: Track user interaction state (iOS requires user gesture for audio)
    this.userInteracted = false;
    this.pendingBgm = null; // BGM to play after first interaction

    // SINGLE BGM audio element (guarantees only one BGM at a time)
    this.bgmPlayer = null;
    this.currentBgm = null;

    // BGM track URLs (loaded but not as Audio elements)
    this.bgmTracks = {
      title: null,
      race: null,
      highway: null,
      victory: null,
      gameover: null
    };

    // Which tracks should loop
    this.bgmLoopSettings = {
      title: true,
      race: true,
      highway: true,
      victory: false,
      gameover: false
    };

    // SFX sounds (keep as separate elements for overlapping)
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
      lap_complete: null,
      button: null
    };

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
      // Mark that user has interacted (critical for iOS)
      this.userInteracted = true;

      // Clear any pending BGM - we don't auto-play on init
      // Title BGM will play when user navigates back to title from other screens
      this.pendingBgm = null;

      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Create single BGM player (fresh instance)
      if (!this.bgmPlayer) {
        this.bgmPlayer = new Audio();
        this.bgmPlayer.preload = 'auto';
      }

      console.log('Audio context initialized (Single BGM mode)');
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

    // Store BGM URLs (don't create Audio elements)
    for (const key of Object.keys(this.bgmTracks)) {
      this.bgmTracks[key] = this.basePath + `bgm_${key}.wav`;
      // Preload by creating temporary Audio and loading
      loadPromises.push(this._preloadAudio(this.bgmTracks[key], `bgm_${key}`));
    }

    // Load SFX
    for (const key of Object.keys(this.sfx)) {
      loadPromises.push(this._loadSfx(`sfx_${key}.wav`, key));
    }

    const results = await Promise.allSettled(loadPromises);

    const loaded = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Audio loaded: ${loaded} success, ${failed} failed`);
    this.loaded = true;

    return { loaded, failed };
  }

  async _preloadAudio(url, name) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = url;
      audio.preload = 'auto';
      audio.volume = 0; // Mute during preload to prevent accidental playback

      const cleanup = () => {
        // CRITICAL: Clean up the temporary audio element to prevent ghost playback
        audio.pause();
        audio.src = '';
        audio.load(); // Reset the audio element
      };

      audio.addEventListener('canplaythrough', () => {
        console.log(`Preloaded: ${name}`);
        cleanup();
        resolve(url);
      }, { once: true });

      audio.addEventListener('error', (e) => {
        console.warn(`Failed to preload ${name}:`, e);
        cleanup();
        reject(e);
      }, { once: true });

      audio.load();
    });
  }

  async _loadSfx(filename, key) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = this.basePath + filename;
      audio.preload = 'auto';

      audio.addEventListener('canplaythrough', () => {
        this.sfx[key] = audio;
        resolve(audio);
      }, { once: true });

      audio.addEventListener('error', (e) => {
        console.warn(`Failed to load ${filename}:`, e);
        reject(e);
      }, { once: true });

      audio.load();
    });
  }

  /**
   * Play BGM track (uses single audio element - guaranteed no duplication)
   */
  playBgm(track) {
    // CRITICAL: If user hasn't interacted yet, store as pending (iOS fix)
    if (!this.userInteracted) {
      console.log(`BGM ${track} deferred until user interaction`);
      this.pendingBgm = track;
      return;
    }

    // Prevent playing the same track
    if (this.currentBgm === track && this.bgmPlayer && !this.bgmPlayer.paused) {
      console.log(`BGM ${track} already playing, skipping`);
      return;
    }

    const trackUrl = this.bgmTracks[track];
    if (!trackUrl) {
      console.warn(`BGM track not found: ${track}`);
      return;
    }

    console.log(`Playing BGM: ${track} (Single Audio Mode)`);

    // Stop current playback first
    if (this.bgmPlayer) {
      this.bgmPlayer.pause();
      this.bgmPlayer.currentTime = 0;
    }

    // Create new player if needed
    if (!this.bgmPlayer) {
      this.bgmPlayer = new Audio();
    }

    // Set new track
    this.bgmPlayer.src = trackUrl;
    this.bgmPlayer.loop = this.bgmLoopSettings[track] || false;
    this.bgmPlayer.volume = this.bgmMuted ? 0 : this.bgmVolume * this.masterVolume;

    // Play with error handling
    const playPromise = this.bgmPlayer.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        console.warn('BGM play failed:', e);
      });
    }

    this.currentBgm = track;
  }

  /**
   * Stop BGM (aggressive cleanup for iOS Safari)
   */
  stopBgm() {
    console.log('stopBgm called - aggressive cleanup');

    // Clear any pending BGM request (critical for iOS)
    this.pendingBgm = null;

    if (this.bgmPlayer) {
      this.bgmPlayer.pause();
      this.bgmPlayer.currentTime = 0;
      // CRITICAL: Clear src to fully stop any pending playback
      this.bgmPlayer.src = '';
      this.bgmPlayer.load(); // Reset the element
    }

    this.currentBgm = null;
  }

  /**
   * Pause current BGM
   */
  pauseBgm() {
    if (this.bgmPlayer && this.currentBgm) {
      this.bgmPlayer.pause();
    }
  }

  /**
   * Resume current BGM
   */
  resumeBgm() {
    if (this.bgmPlayer && this.currentBgm) {
      this.bgmPlayer.play().catch(e => console.warn('Resume failed:', e));
    }
  }

  /**
   * Play sound effect
   */
  playSfx(effect) {
    if (this.sfxMuted) return;

    const audio = this.sfx[effect];
    if (!audio) {
      // Don't warn for missing effects, just skip
      return;
    }

    // Clone audio for overlapping sounds
    const clone = audio.cloneNode();
    clone.volume = this.sfxVolume * this.masterVolume;
    clone.play().catch(e => {
      // Silently ignore SFX failures (common on iOS without interaction)
    });
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
    if (this.bgmPlayer) {
      this.bgmPlayer.volume = this.bgmMuted ? 0 : this.bgmVolume * this.masterVolume;
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    this.stopBgm();

    if (this.bgmPlayer) {
      this.bgmPlayer.src = '';
      this.bgmPlayer = null;
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
