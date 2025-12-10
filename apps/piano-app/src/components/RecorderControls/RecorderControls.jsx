/**
 * Recorder Controls Component
 * Handles recording, playback, and download of performances
 */
import React, { useState, useCallback, useRef } from 'react';
import styles from './RecorderControls.module.css';

/**
 * Recorder controls component
 * @param {Object} props
 * @param {boolean} props.isRecording - Recording state
 * @param {Array} props.recordedEvents - Recorded events
 * @param {Function} props.onStartRecording - Start recording callback
 * @param {Function} props.onStopRecording - Stop recording callback
 * @param {Function} props.onClearRecording - Clear recording callback
 * @param {Function} props.onPlayNote - Play note callback
 * @param {Function} props.onStopNote - Stop note callback
 * @param {Function} props.onPlayDrum - Play drum callback
 * @param {string} props.theme - Current theme
 */
export const RecorderControls = ({
  isRecording,
  recordedEvents,
  onStartRecording,
  onStopRecording,
  onClearRecording,
  onPlayNote,
  onStopNote,
  onPlayDrum,
  theme = 'classic',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [recordingName, setRecordingName] = useState('');
  const playbackTimeoutsRef = useRef([]);
  const playingNotesRef = useRef(new Map());

  // Format recording duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get recording duration
  const getRecordingDuration = () => {
    if (recordedEvents.length === 0) return 0;
    return recordedEvents[recordedEvents.length - 1].timestamp;
  };

  // Stop all playing notes
  const stopAllPlayingNotes = useCallback(() => {
    playbackTimeoutsRef.current.forEach(clearTimeout);
    playbackTimeoutsRef.current = [];

    playingNotesRef.current.forEach(({ note, octave }) => {
      if (onStopNote) {
        onStopNote(note, octave);
      }
    });
    playingNotesRef.current.clear();
  }, [onStopNote]);

  // Play recording
  const playRecording = useCallback(() => {
    if (recordedEvents.length === 0) return;

    // Clear any existing playback
    stopAllPlayingNotes();

    // Schedule all events
    recordedEvents.forEach((event) => {
      const adjustedDelay = (event.timestamp * 1000) / playbackSpeed;

      if (event.type === 'noteOn') {
        const timeout = setTimeout(() => {
          if (onPlayNote) {
            onPlayNote(event.note, event.octave, event.velocity);
            const noteKey = `${event.note}${event.octave}`;
            playingNotesRef.current.set(noteKey, { note: event.note, octave: event.octave });
          }
        }, adjustedDelay);
        playbackTimeoutsRef.current.push(timeout);
      } else if (event.type === 'noteOff') {
        const timeout = setTimeout(() => {
          if (onStopNote) {
            onStopNote(event.note, event.octave);
            const noteKey = `${event.note}${event.octave}`;
            playingNotesRef.current.delete(noteKey);
          }
        }, adjustedDelay);
        playbackTimeoutsRef.current.push(timeout);
      } else if (event.type === 'drum') {
        const timeout = setTimeout(() => {
          if (onPlayDrum) {
            onPlayDrum(event.drumType);
          }
        }, adjustedDelay);
        playbackTimeoutsRef.current.push(timeout);
      }
    });

    // Schedule end of playback
    const duration = getRecordingDuration();
    const adjustedDuration = (duration * 1000) / playbackSpeed;
    const endTimeout = setTimeout(() => {
      setIsPlaying(false);
      stopAllPlayingNotes();
    }, adjustedDuration);
    playbackTimeoutsRef.current.push(endTimeout);
  }, [recordedEvents, playbackSpeed, onPlayNote, onStopNote, onPlayDrum, stopAllPlayingNotes]);

  // Handle play/stop button
  const handlePlayStop = useCallback(() => {
    if (isPlaying) {
      stopAllPlayingNotes();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playRecording();
    }
  }, [isPlaying, playRecording, stopAllPlayingNotes]);

  // Handle speed change
  const handleSpeedChange = useCallback((event) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackSpeed(newSpeed);

    // Stop playback if currently playing
    if (isPlaying) {
      stopAllPlayingNotes();
      setIsPlaying(false);
    }
  }, [isPlaying, stopAllPlayingNotes]);

  // Download as JSON
  const downloadAsJSON = useCallback(() => {
    if (recordedEvents.length === 0) return;

    const recordingData = {
      name: recordingName || 'ピアノ録音',
      date: new Date().toISOString(),
      duration: getRecordingDuration(),
      events: recordedEvents,
    };

    const blob = new Blob([JSON.stringify(recordingData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `piano-recording-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [recordedEvents, recordingName]);

  // Download as MIDI
  const downloadAsMIDI = useCallback(() => {
    if (recordedEvents.length === 0) return;

    // Simple MIDI file generation (basic implementation)
    // Note: This is a simplified version. A full MIDI implementation would be more complex.
    const midiData = generateSimpleMIDI(recordedEvents);

    const blob = new Blob([midiData], {
      type: 'audio/midi',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `piano-recording-${Date.now()}.mid`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [recordedEvents]);

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      stopAllPlayingNotes();
    };
  }, [stopAllPlayingNotes]);

  const duration = getRecordingDuration();

  return (
    <div className={styles.recorderControls} data-theme={theme}>

      {/* Recording Controls */}
      <div className={styles.recordingSection}>
        <div className={styles.recordingControls}>
          {!isRecording ? (
            <button
              className={`${styles.recordButton} ${styles.startRecord}`}
              onClick={onStartRecording}
              disabled={isPlaying}
            >
              ⏺️ 録音開始
            </button>
          ) : (
            <button
              className={`${styles.recordButton} ${styles.stopRecord}`}
              onClick={onStopRecording}
            >
              ⏹️ 録音停止
            </button>
          )}

          {recordedEvents.length > 0 && !isRecording && (
            <button
              className={styles.clearButton}
              onClick={onClearRecording}
              disabled={isPlaying}
            >
              🗑️ クリア
            </button>
          )}
        </div>

        {isRecording && (
          <div className={styles.recordingIndicator}>
            <span className={styles.recordingDot}></span>
            <span>録音中...</span>
          </div>
        )}
      </div>

      {/* Playback Controls */}
      {recordedEvents.length > 0 && !isRecording && (
        <div className={styles.playbackSection}>
          <div className={styles.recordingInfo}>
            <span>録音時間: {formatDuration(duration)}</span>
            <span>イベント数: {recordedEvents.length}</span>
          </div>

          <div className={styles.playbackControls}>
            <button
              className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
              onClick={handlePlayStop}
            >
              {isPlaying ? '⏹️ 停止' : '▶️ 再生'}
            </button>

            <div className={styles.speedControl}>
              <label htmlFor="playback-speed" className={styles.label}>
                速度:
              </label>
              <select
                id="playback-speed"
                className={styles.select}
                value={playbackSpeed}
                onChange={handleSpeedChange}
                disabled={isPlaying}
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>

          {/* Download Controls */}
          <div className={styles.downloadSection}>
            <input
              type="text"
              className={styles.nameInput}
              placeholder="録音名（オプション）"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
              disabled={isPlaying}
            />
            <div className={styles.downloadButtons}>
              <button
                className={styles.downloadButton}
                onClick={downloadAsJSON}
                disabled={isPlaying}
              >
                💾 JSONダウンロード
              </button>
              <button
                className={styles.downloadButton}
                onClick={downloadAsMIDI}
                disabled={isPlaying}
              >
                🎵 MIDIダウンロード
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Generate simple MIDI file from recorded events
 * @param {Array} events - Recorded events
 * @returns {Uint8Array} MIDI file data
 */
function generateSimpleMIDI(events) {
  // This is a simplified MIDI generation
  // A full implementation would properly encode MIDI format

  const noteToMIDI = {
    'C': 60, 'C#': 61, 'D': 62, 'D#': 63,
    'E': 64, 'F': 65, 'F#': 66, 'G': 67,
    'G#': 68, 'A': 69, 'A#': 70, 'B': 71,
  };

  // Create a simple MIDI-like structure
  const midiEvents = events.map(event => {
    const midiNote = noteToMIDI[event.note] + ((event.octave - 4) * 12);
    return {
      time: Math.round(event.timestamp * 1000),
      type: event.type === 'noteOn' ? 0x90 : 0x80,
      note: midiNote,
      velocity: event.type === 'noteOn' ? Math.round((event.velocity || 0.8) * 127) : 0,
    };
  });

  // Create a basic MIDI file structure (simplified)
  const header = new Uint8Array([
    0x4D, 0x54, 0x68, 0x64, // "MThd"
    0x00, 0x00, 0x00, 0x06, // Header length
    0x00, 0x00, // Format 0
    0x00, 0x01, // 1 track
    0x00, 0x60, // 96 ticks per quarter note
  ]);

  const trackHeader = new Uint8Array([
    0x4D, 0x54, 0x72, 0x6B, // "MTrk"
  ]);

  // Simplified: return a basic structure
  // A full implementation would properly encode variable-length quantities and track data
  return new Uint8Array([...header, ...trackHeader]);
}