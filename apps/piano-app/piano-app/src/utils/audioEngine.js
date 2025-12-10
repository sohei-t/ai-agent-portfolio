/**
 * Audio Engine for Piano App
 * Web Audio API wrapper with iOS Safari support
 * Handles note playback, ADSR envelope, volume control, and memory management
 */

// Constants
const MAX_POLYPHONY = 10; // Maximum simultaneous notes
const ATTACK_TIME = 0.01; // Attack duration in seconds
const DECAY_TIME = 0.09; // Decay duration (0.01 + 0.09 = 0.1s)
const SUSTAIN_LEVEL = 0.7; // Sustain level multiplier (70% of peak)
const RELEASE_TIME = 0.1; // Release duration in seconds
const MIN_GAIN = 0.01; // Minimum gain value (for exponentialRamp)

/**
 * Create and configure Audio Engine
 * @returns {Object} Audio engine interface
 */
export function createAudioEngine() {
  // Initialize AudioContext with interactive latency for low-latency playback
  const audioContext = new (window.AudioContext || window.webkitAudioContext)({
    latencyHint: 'interactive',
    sampleRate: 44100,
  });

  // State management
  const activeNodes = new Map(); // Track active oscillator nodes
  let masterVolume = 0.5; // Default volume (0-1)
  let isMuted = false; // Mute state

  /**
   * Initialize audio context (iOS Safari workaround)
   * Must be called after user gesture on iOS
   * @returns {Promise<boolean>} True if successfully initialized
   */
  async function initialize() {
    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      return audioContext.state === 'running';
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return false;
    }
  }

  /**
   * Play a note with given frequency
   * @param {number} frequency - Note frequency in Hz
   * @param {number} velocity - Note velocity (0-1, default: 0.8)
   * @returns {number|null} Node ID for stopping the note, or null if muted
   */
  function playNote(frequency, velocity = 0.8) {
    // Validation
    if (typeof frequency !== 'number' || isNaN(frequency) || frequency <= 0 || frequency > 20000) {
      throw new Error(`Invalid frequency: ${frequency}`);
    }

    if (typeof velocity !== 'number' || isNaN(velocity) || velocity < 0 || velocity > 1) {
      throw new Error(`Invalid velocity: ${velocity}`);
    }

    // Don't play if muted
    if (isMuted) {
      return null;
    }

    // Enforce polyphony limit (remove oldest note if at capacity)
    if (activeNodes.size >= MAX_POLYPHONY) {
      const oldestId = activeNodes.keys().next().value;
      const oldestNodes = activeNodes.get(oldestId);
      if (oldestNodes) {
        try {
          oldestNodes.oscillator.stop();
          oldestNodes.oscillator.disconnect();
          oldestNodes.gainNode.disconnect();
        } catch (e) {
          // Node may already be stopped
        }
        activeNodes.delete(oldestId);
      }
    }

    // Create oscillator and gain node
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Configure oscillator
    oscillator.type = 'sine'; // Sine wave for clean piano-like tone
    oscillator.frequency.value = frequency;

    // ADSR Envelope
    const now = audioContext.currentTime;
    const peakGain = velocity * masterVolume;
    const sustainGain = peakGain * SUSTAIN_LEVEL;

    // Start at silence
    gainNode.gain.setValueAtTime(MIN_GAIN, now);

    // Attack: Ramp up to peak gain
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(peakGain, MIN_GAIN),
      now + ATTACK_TIME
    );

    // Decay: Ramp down to sustain level
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(sustainGain, MIN_GAIN),
      now + ATTACK_TIME + DECAY_TIME
    );

    // Connect audio graph
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start oscillator
    oscillator.start(now);

    // Generate unique node ID
    const nodeId = Date.now() + Math.random();

    // Store active node for cleanup
    activeNodes.set(nodeId, { oscillator, gainNode, frequency });

    return nodeId;
  }

  /**
   * Stop a playing note with release envelope
   * @param {number} nodeId - Node ID returned from playNote()
   */
  function stopNote(nodeId) {
    const nodes = activeNodes.get(nodeId);
    if (!nodes) {
      return; // Note already stopped or doesn't exist
    }

    const { oscillator, gainNode } = nodes;
    const now = audioContext.currentTime;

    // Remove from active nodes immediately (for accurate count)
    activeNodes.delete(nodeId);

    try {
      // Release: Ramp down to silence
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(MIN_GAIN, now + RELEASE_TIME);

      // Stop oscillator after release
      oscillator.stop(now + RELEASE_TIME);

      // Cleanup after note ends
      oscillator.onended = () => {
        try {
          oscillator.disconnect();
          gainNode.disconnect();
        } catch (e) {
          // Already disconnected
        }
      };
    } catch (error) {
      // Node may already be stopped or disconnected
      // Cleanup immediately
      try {
        oscillator.disconnect();
        gainNode.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
  }

  /**
   * Set master volume
   * @param {number} volume - Volume level (0-1)
   */
  function setVolume(volume) {
    masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current master volume
   * @returns {number} Current volume (0-1)
   */
  function getVolume() {
    return masterVolume;
  }

  /**
   * Set mute state
   * @param {boolean} muted - True to mute, false to unmute
   */
  function setMuted(muted) {
    isMuted = muted;
  }

  /**
   * Check if audio is muted
   * @returns {boolean} True if muted
   */
  function checkIsMuted() {
    return isMuted;
  }

  /**
   * Get number of active notes
   * @returns {number} Active note count
   */
  function getActiveNoteCount() {
    return activeNodes.size;
  }

  /**
   * Get maximum polyphony
   * @returns {number} Max simultaneous notes
   */
  function getMaxPolyphony() {
    return MAX_POLYPHONY;
  }

  /**
   * Cleanup all resources
   * @returns {Promise<void>}
   */
  async function cleanup() {
    // Stop all active notes
    activeNodes.forEach((nodes, nodeId) => {
      try {
        nodes.oscillator.stop();
        nodes.oscillator.disconnect();
        nodes.gainNode.disconnect();
      } catch (e) {
        // Already stopped/disconnected
      }
    });

    activeNodes.clear();

    // Close audio context
    if (audioContext.state !== 'closed') {
      await audioContext.close();
    }
  }

  /**
   * Get audio context state
   * @returns {string} AudioContext state ('running', 'suspended', 'closed')
   */
  function getState() {
    return audioContext.state;
  }

  // Return public interface
  return {
    initialize,
    playNote,
    stopNote,
    setVolume,
    getVolume,
    setMuted,
    isMuted: checkIsMuted,
    getActiveNoteCount,
    getMaxPolyphony,
    cleanup,
    getState,
  };
}

export default createAudioEngine;
