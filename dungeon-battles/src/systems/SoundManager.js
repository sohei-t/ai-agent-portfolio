/**
 * SoundManager.js - Simple sound effects manager
 */

export class SoundManager {
  constructor() {
    this.enabled = true;
    this.sounds = {};
    this.audioContext = null;

    // Initialize Web Audio API
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
    } catch (error) {
      console.warn('[SoundManager] Web Audio API not supported');
      this.enabled = false;
    }
  }

  /**
   * Play a laser/beam sound effect using Web Audio API
   */
  playBeam(type = 'player') {
    if (!this.enabled || !this.audioContext) return;

    try {
      // Resume context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;

      // Create oscillator for beam sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Different sounds for player vs enemy
      if (type === 'player') {
        // Player beam - higher pitch, shorter
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.1);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
      } else {
        // Enemy beam - lower pitch, longer
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.2);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
      }
    } catch (error) {
      console.warn('[SoundManager] Error playing beam sound:', error);
    }
  }

  /**
   * Play explosion sound effect
   */
  playExplosion() {
    if (!this.enabled || !this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;

      // Create noise for explosion
      const bufferSize = this.audioContext.sampleRate * 0.3;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const output = buffer.getChannelData(0);

      // Fill with white noise
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      noise.buffer = buffer;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.3);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      noise.start(now);
      noise.stop(now + 0.3);
    } catch (error) {
      console.warn('[SoundManager] Error playing explosion sound:', error);
    }
  }

  /**
   * Play item pickup sound
   */
  playPickup() {
    if (!this.enabled || !this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Rising tone for pickup
      oscillator.frequency.setValueAtTime(400, now);
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);

      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      oscillator.start(now);
      oscillator.stop(now + 0.1);
    } catch (error) {
      console.warn('[SoundManager] Error playing pickup sound:', error);
    }
  }

  /**
   * Play hit sound
   */
  playHit() {
    if (!this.enabled || !this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const now = this.audioContext.currentTime;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Short burst for hit
      oscillator.frequency.setValueAtTime(150, now);
      oscillator.type = 'square';

      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      oscillator.start(now);
      oscillator.stop(now + 0.05);
    } catch (error) {
      console.warn('[SoundManager] Error playing hit sound:', error);
    }
  }

  /**
   * Toggle sound on/off
   */
  toggle() {
    this.enabled = !this.enabled;
    console.log(`[SoundManager] Sound ${this.enabled ? 'enabled' : 'disabled'}`);
  }
}

// Create singleton instance
export const soundManager = new SoundManager();