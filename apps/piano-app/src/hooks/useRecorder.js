/**
 * useRecorder Hook
 * Handles recording of piano performances
 * Tracks note events with timestamps
 */

import { useState, useCallback } from 'react';

/**
 * Custom hook for recording piano performances
 * @returns {Object} Recorder state and controls
 */
const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedEvents, setRecordedEvents] = useState([]);
  const [startTime, setStartTime] = useState(null);

  /**
   * Start recording
   * Initializes recording state and timestamp
   */
  const startRecording = useCallback(() => {
    setIsRecording(true);
    setRecordedEvents([]);
    setStartTime(Date.now());
  }, []);

  /**
   * Stop recording
   * Returns recording data with events and duration
   * @returns {Object} Recording data { events, duration }
   */
  const stopRecording = useCallback(() => {
    setIsRecording(false);

    return {
      events: recordedEvents,
      duration: startTime ? (Date.now() - startTime) / 1000 : 0,
    };
  }, [recordedEvents, startTime]);

  /**
   * Record an event (note on/off or drum)
   * @param {Object} event - Event data
   * @param {string} event.type - Event type ('noteOn' | 'noteOff' | 'drum')
   * @param {string} event.note - Note name (e.g., 'C4') for piano
   * @param {string} event.drumType - Drum type for drum events
   * @param {number} [event.frequency] - Note frequency in Hz
   * @param {number} [event.velocity] - Note velocity (0-1)
   */
  const recordEvent = useCallback((event) => {
    if (!isRecording) return;

    const timestamp = startTime ? (Date.now() - startTime) / 1000 : 0;
    const eventWithTimestamp = {
      ...event,
      timestamp,
    };

    setRecordedEvents(prev => [...prev, eventWithTimestamp]);
  }, [isRecording, startTime]);

  /**
   * Clear recording data
   * Resets events and start time
   */
  const clearRecording = useCallback(() => {
    setRecordedEvents([]);
    setStartTime(null);
  }, []);

  /**
   * Pause recording
   * Stops adding events but maintains state
   */
  const pauseRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  /**
   * Resume recording
   * Continues adding events from current timestamp
   */
  const resumeRecording = useCallback(() => {
    if (startTime) {
      setIsRecording(true);
    }
  }, [startTime]);

  return {
    isRecording,
    recordedEvents,
    startRecording,
    stopRecording,
    recordEvent,
    clearRecording,
    pauseRecording,
    resumeRecording,
  };
};

export default useRecorder;
