/**
 * Audio Engine for Piano App
 * Web Audio API wrapper with iOS Safari support
 * Handles note playback, ADSR envelope, volume control, and memory management
 */

// Constants
const MAX_POLYPHONY = 10; // Maximum simultaneous notes
const MIN_GAIN = 0.01; // Minimum gain value (for exponentialRamp)

// Instrument definitions with various sound characteristics
const INSTRUMENTS = {
  piano: {
    waveform: 'sine',
    harmonics: [1, 0.4, 0.2, 0.1, 0.05], // Natural harmonics for piano
    attack: 0.01,
    decay: 0.1,
    sustain: 0.3,
    release: 0.5
  },
  organ: {
    waveform: 'sine',
    harmonics: [1, 1, 0.5, 0.33, 0.25, 0.2, 0.16, 0.14, 0.12], // Hammond organ harmonics
    attack: 0.01,
    decay: 0.01,
    sustain: 0.9,
    release: 0.01
  },
  pipeOrgan: {
    waveform: 'sine',
    harmonics: [1, 0.8, 0.6, 0.4, 0.3, 0.25, 0.2, 0.15, 0.1, 0.08], // Pipe organ with rich harmonics
    attack: 0.05,
    decay: 0.02,
    sustain: 0.95,
    release: 0.5,
    reverb: { wet: 0.4, roomSize: 0.8 } // Cathedral reverb
  },
  strings: {
    waveform: 'sawtooth',
    harmonics: [1, 0.5, 0.33, 0.25],
    attack: 0.2,
    decay: 0.1,
    sustain: 0.7,
    release: 0.3,
    filter: { type: 'lowpass', frequency: 2000 }
  },
  brass: {
    waveform: 'sawtooth',
    harmonics: [1, 0.8, 0.6, 0.4],
    attack: 0.05,
    decay: 0.05,
    sustain: 0.8,
    release: 0.1,
    filter: { type: 'lowpass', frequency: 3000 }
  },
  flute: {
    waveform: 'sine',
    harmonics: [1, 0.05, 0.02],
    attack: 0.1,
    decay: 0.02,
    sustain: 0.8,
    release: 0.2
  },
  synth: {
    waveform: 'square',
    harmonics: [1],
    attack: 0.001,
    decay: 0.2,
    sustain: 0.5,
    release: 0.1,
    filter: { type: 'lowpass', frequency: 1500 }
  },
  bells: {
    waveform: 'sine',
    harmonics: [1, 0.6, 0.4, 0.25, 0.2, 0.15], // Metallic bell harmonics
    attack: 0.001,
    decay: 1.0,
    sustain: 0.001,
    release: 2.0
  },
  marimba: {
    waveform: 'sine',
    harmonics: [1, 0.3, 0.1, 0.05],
    attack: 0.001,
    decay: 0.2,
    sustain: 0.2,
    release: 0.4
  },
  guitar: {
    waveform: 'triangle',
    harmonics: [1, 0.3, 0.15, 0.08],
    attack: 0.002,
    decay: 0.3,
    sustain: 0.4,
    release: 0.5
  },
  bass: {
    waveform: 'sawtooth',
    harmonics: [1, 0.7, 0.5],
    attack: 0.01,
    decay: 0.1,
    sustain: 0.6,
    release: 0.2,
    filter: { type: 'lowpass', frequency: 500 }
  },
  vibraphone: {
    waveform: 'sine',
    harmonics: [1, 0.2, 0.1],
    attack: 0.01,
    decay: 0.5,
    sustain: 0.4,
    release: 1.0,
    tremolo: { rate: 4, depth: 0.2 } // Vibrato effect
  },
  harpsichord: {
    waveform: 'sawtooth',
    harmonics: [1, 0.7, 0.5, 0.4, 0.3],
    attack: 0.001,
    decay: 0.05,
    sustain: 0.1,
    release: 0.2,
    filter: { type: 'highpass', frequency: 200 }
  },
  // Fun animal sounds
  dog: {
    waveform: 'sawtooth',
    harmonics: [1, 0.3, 0.2], // Simple harmonics for bark
    attack: 0.01,
    decay: 0.05,
    sustain: 0.2,
    release: 0.1,
    filter: { type: 'bandpass', frequency: 800, Q: 2 },
    pitchModulation: { rate: 6, depth: 0.3 } // Wobble for "woof" effect
  },
  cat: {
    waveform: 'sine',
    harmonics: [1, 0.4, 0.2, 0.1], // Softer harmonics for meow
    attack: 0.05,
    decay: 0.1,
    sustain: 0.3,
    release: 0.2,
    filter: { type: 'bandpass', frequency: 1200, Q: 3 },
    pitchModulation: { rate: 4, depth: 0.2 } // Gentle vibrato for "meow"
  },
  bird: {
    waveform: 'sine',
    harmonics: [1, 0.1, 0.05], // Pure tones for chirp
    attack: 0.001,
    decay: 0.02,
    sustain: 0.1,
    release: 0.05,
    filter: { type: 'highpass', frequency: 1500 },
    pitchModulation: { rate: 8, depth: 0.4 } // Fast vibrato for chirping
  },
  cow: {
    waveform: 'sawtooth',
    harmonics: [1, 0.8, 0.6, 0.4], // Rich harmonics for "moo"
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 0.3,
    filter: { type: 'lowpass', frequency: 400 },
    pitchModulation: { rate: 2, depth: 0.15 } // Slow wobble for "moo"
  },
  robot: {
    waveform: 'square',
    harmonics: [1, 0, 0.33, 0, 0.2], // Square wave harmonics
    attack: 0.001,
    decay: 0.01,
    sustain: 0.9,
    release: 0.01,
    filter: { type: 'lowpass', frequency: 1000 },
    distortion: 0.3 // Add digital distortion
  },
  alien: {
    waveform: 'sine',
    harmonics: [1, 0.5, 0.33, 0.25, 0.2], // Weird harmonics
    attack: 0.02,
    decay: 0.1,
    sustain: 0.4,
    release: 0.3,
    filter: { type: 'bandpass', frequency: 600, Q: 5 },
    pitchModulation: { rate: 11, depth: 0.5 }, // Strange warbling
    phaser: { rate: 0.5, depth: 0.8 } // Phase shifting for alien effect
  }
};

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
  let currentInstrument = 'piano'; // Current selected instrument

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
          if (oldestNodes.oscillators) {
            oldestNodes.oscillators.forEach(osc => {
              osc.stop();
              osc.disconnect();
            });
          }
          if (oldestNodes.lfo) {
            oldestNodes.lfo.stop();
            oldestNodes.lfo.disconnect();
          }
          if (oldestNodes.lfoGain) {
            oldestNodes.lfoGain.disconnect();
          }
          if (oldestNodes.gainNode) {
            oldestNodes.gainNode.disconnect();
          }
        } catch (e) {
          // Node may already be stopped
        }
        activeNodes.delete(oldestId);
      }
    }

    // Get current instrument configuration
    const instrument = INSTRUMENTS[currentInstrument] || INSTRUMENTS.piano;

    // Create audio nodes
    const oscillators = [];
    const gainNode = audioContext.createGain();
    let finalNode = gainNode;

    // Create multiple oscillators for harmonics
    instrument.harmonics.forEach((harmonicGain, index) => {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();

      // Configure oscillator
      osc.type = instrument.waveform;
      osc.frequency.value = frequency * (index + 1); // Harmonic frequencies
      oscGain.gain.value = harmonicGain;

      // Connect oscillator to its gain
      osc.connect(oscGain);
      oscGain.connect(gainNode);

      oscillators.push(osc);
    });

    // Add filter if specified
    if (instrument.filter) {
      const filter = audioContext.createBiquadFilter();
      filter.type = instrument.filter.type;
      filter.frequency.value = instrument.filter.frequency;
      if (instrument.filter.Q) {
        filter.Q.value = instrument.filter.Q;
      }
      gainNode.connect(filter);
      finalNode = filter;
      filter.connect(audioContext.destination);
    } else {
      gainNode.connect(audioContext.destination);
    }

    // ADSR Envelope with instrument-specific values
    const now = audioContext.currentTime;

    // Add pitch modulation for animal sounds
    let lfo = null;
    let lfoGain = null;
    if (instrument.pitchModulation) {
      lfo = audioContext.createOscillator();
      lfoGain = audioContext.createGain();

      lfo.frequency.value = instrument.pitchModulation.rate;
      lfoGain.gain.value = instrument.pitchModulation.depth * frequency * 0.01;

      lfo.connect(lfoGain);
      oscillators.forEach(osc => {
        lfoGain.connect(osc.frequency);
      });

      lfo.start(now);
      // Do NOT add LFO to oscillators array - keep it separate
    }
    const peakGain = velocity * masterVolume;
    const sustainGain = peakGain * instrument.sustain;

    // Start at silence
    gainNode.gain.setValueAtTime(MIN_GAIN, now);

    // Attack: Ramp up to peak gain
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(peakGain, MIN_GAIN),
      now + instrument.attack
    );

    // Decay: Ramp down to sustain level
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(sustainGain, MIN_GAIN),
      now + instrument.attack + instrument.decay
    );

    // Start all oscillators
    oscillators.forEach(osc => osc.start(now));

    // Generate unique node ID
    const nodeId = Date.now() + Math.random();

    // Store active nodes for cleanup
    activeNodes.set(nodeId, { oscillators, gainNode, frequency, instrument, lfo, lfoGain });

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

    const { oscillators, gainNode, instrument, lfo, lfoGain } = nodes;
    const now = audioContext.currentTime;

    // Remove from active nodes immediately (for accurate count)
    activeNodes.delete(nodeId);

    try {
      // Release: Ramp down to silence
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(MIN_GAIN, now + instrument.release);

      // Stop all oscillators after release
      oscillators.forEach(osc => {
        osc.stop(now + instrument.release);

        // Cleanup after note ends
        osc.onended = () => {
          try {
            osc.disconnect();
          } catch (e) {
            // Already disconnected
          }
        };
      });

      // Stop LFO if present
      if (lfo) {
        lfo.stop(now + instrument.release);
        lfo.onended = () => {
          try {
            lfo.disconnect();
            if (lfoGain) lfoGain.disconnect();
          } catch (e) {
            // Already disconnected
          }
        };
      }

      // Cleanup gain node after release
      setTimeout(() => {
        try {
          gainNode.disconnect();
        } catch (e) {
          // Already disconnected
        }
      }, instrument.release * 1000 + 100);
    } catch (error) {
      // Node may already be stopped or disconnected
      // Cleanup immediately
      try {
        oscillators.forEach(osc => {
          osc.disconnect();
        });
        if (lfo) {
          lfo.disconnect();
        }
        if (lfoGain) {
          lfoGain.disconnect();
        }
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
        if (nodes.oscillators) {
          nodes.oscillators.forEach(osc => {
            osc.stop();
            osc.disconnect();
          });
        }
        if (nodes.lfo) {
          nodes.lfo.stop();
          nodes.lfo.disconnect();
        }
        if (nodes.lfoGain) {
          nodes.lfoGain.disconnect();
        }
        if (nodes.gainNode) {
          nodes.gainNode.disconnect();
        }
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

  /**
   * Stop all notes with a specific frequency
   * @param {number} frequency - Frequency to stop
   */
  function stopAllNotesWithFrequency(frequency) {
    // Find and stop all notes with matching frequency
    const nodesToStop = [];
    activeNodes.forEach((nodes, nodeId) => {
      if (nodes.frequency && Math.abs(nodes.frequency - frequency) < 0.01) {
        nodesToStop.push(nodeId);
      }
    });

    nodesToStop.forEach((nodeId) => {
      stopNote(nodeId);
    });
  }

  /**
   * Set the current instrument
   * @param {string} instrumentName - Name of the instrument (from INSTRUMENTS keys)
   */
  function setInstrument(instrumentName) {
    if (INSTRUMENTS[instrumentName]) {
      currentInstrument = instrumentName;
      return true;
    }
    return false;
  }

  /**
   * Get the current instrument name
   * @returns {string} Current instrument name
   */
  function getCurrentInstrument() {
    return currentInstrument;
  }

  /**
   * Get list of available instruments
   * @returns {string[]} Array of instrument names
   */
  function getAvailableInstruments() {
    return Object.keys(INSTRUMENTS);
  }

  // Return public interface
  return {
    initialize,
    playNote,
    stopNote,
    stopAllNotesWithFrequency,
    setVolume,
    getVolume,
    setMuted,
    isMuted: checkIsMuted,
    getActiveNoteCount,
    getMaxPolyphony,
    cleanup,
    getState,
    setInstrument,
    getCurrentInstrument,
    getAvailableInstruments,
  };
}

export default createAudioEngine;
