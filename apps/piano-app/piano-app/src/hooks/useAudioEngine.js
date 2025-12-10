/**
 * React Hook for Audio Engine Integration
 * Manages audio engine lifecycle and provides React-friendly interface
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { createAudioEngine } from '../utils/audioEngine.js';
import { getFrequency } from '../utils/noteFrequencies.js';

/**
 * Custom hook for audio engine management
 * @returns {Object} Audio engine interface with React integration
 */
export function useAudioEngine() {
  const audioEngineRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isMuted, setIsMutedState] = useState(false);

  // Initialize audio engine on mount
  useEffect(() => {
    // Create audio engine instance
    audioEngineRef.current = createAudioEngine();

    // Auto-initialize on first user interaction (iOS Safari workaround)
    const initializeOnUserGesture = async () => {
      if (audioEngineRef.current && !isInitialized) {
        const success = await audioEngineRef.current.initialize();
        if (success) {
          setIsInitialized(true);
        }
      }
    };

    // Listen for first user interaction
    const events = ['touchstart', 'mousedown', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, initializeOnUserGesture, { once: true });
    });

    // Cleanup on unmount
    return () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.cleanup().catch((err) => {
          console.error('Failed to cleanup audio engine:', err);
        });
      }

      // Remove event listeners
      events.forEach((event) => {
        document.removeEventListener(event, initializeOnUserGesture);
      });
    };
  }, [isInitialized]);

  /**
   * Play a note with given note name and octave
   * @param {string} note - Note name (e.g., 'C', 'C#', 'D')
   * @param {number} octave - Octave number (3-7)
   * @param {number} velocity - Note velocity (0-1, default: 0.8)
   * @returns {number|null} Node ID for stopping the note
   */
  const playNote = useCallback((note, octave, velocity = 0.8) => {
    if (!audioEngineRef.current) {
      console.warn('Audio engine not initialized');
      return null;
    }

    try {
      const frequency = getFrequency(note, octave);
      return audioEngineRef.current.playNote(frequency, velocity);
    } catch (error) {
      console.error('Failed to play note:', error);
      return null;
    }
  }, []);

  /**
   * Stop a playing note
   * @param {number} nodeId - Node ID returned from playNote()
   */
  const stopNote = useCallback((nodeId) => {
    if (!audioEngineRef.current || nodeId === null) {
      return;
    }

    try {
      audioEngineRef.current.stopNote(nodeId);
    } catch (error) {
      console.error('Failed to stop note:', error);
    }
  }, []);

  /**
   * Set master volume
   * @param {number} newVolume - Volume level (0-1)
   */
  const setVolume = useCallback((newVolume) => {
    if (!audioEngineRef.current) {
      return;
    }

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioEngineRef.current.setVolume(clampedVolume);
    setVolumeState(clampedVolume);
  }, []);

  /**
   * Set mute state
   * @param {boolean} muted - True to mute, false to unmute
   */
  const setMuted = useCallback((muted) => {
    if (!audioEngineRef.current) {
      return;
    }

    audioEngineRef.current.setMuted(muted);
    setIsMutedState(muted);
  }, []);

  /**
   * Toggle mute state
   */
  const toggleMute = useCallback(() => {
    if (!audioEngineRef.current) {
      return;
    }

    const newMutedState = !audioEngineRef.current.isMuted();
    audioEngineRef.current.setMuted(newMutedState);
    setIsMutedState(newMutedState);
  }, []);

  /**
   * Get number of active notes
   * @returns {number} Active note count
   */
  const getActiveNoteCount = useCallback(() => {
    if (!audioEngineRef.current) {
      return 0;
    }
    return audioEngineRef.current.getActiveNoteCount();
  }, []);

  /**
   * Get audio context state
   * @returns {string} AudioContext state
   */
  const getState = useCallback(() => {
    if (!audioEngineRef.current) {
      return 'closed';
    }
    return audioEngineRef.current.getState();
  }, []);

  /**
   * Manually initialize audio context
   * Useful for explicit initialization on user action
   * @returns {Promise<boolean>} True if successfully initialized
   */
  const initialize = useCallback(async () => {
    if (!audioEngineRef.current) {
      return false;
    }

    const success = await audioEngineRef.current.initialize();
    if (success) {
      setIsInitialized(true);
    }
    return success;
  }, []);

  return {
    // Playback controls
    playNote,
    stopNote,

    // Volume controls
    volume,
    setVolume,

    // Mute controls
    isMuted,
    setMuted,
    toggleMute,

    // Status
    isInitialized,
    getActiveNoteCount,
    getState,

    // Manual initialization
    initialize,
  };
}

export default useAudioEngine;
