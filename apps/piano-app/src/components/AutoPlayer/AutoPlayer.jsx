/**
 * Auto Player Component
 * Plays predefined songs automatically
 */
import React, { useState, useCallback, useRef } from 'react';
import { SONGS } from '../../data/songs';
import styles from './AutoPlayer.module.css';

/**
 * Auto player component
 * @param {Object} props
 * @param {Function} props.onNotePlay - Callback when note starts
 * @param {Function} props.onNoteStop - Callback when note stops
 * @param {string} props.theme - Current theme
 * @param {Object} props.drumEngine - Drum engine reference
 * @param {string} props.drumPattern - Drum pattern to use
 * @param {boolean} props.syncDrums - Whether to sync drums with auto-play
 */
export const AutoPlayer = ({
  onNotePlay,
  onNoteStop,
  theme = 'classic',
  drumEngine = null,
  drumPattern = 'rock_8beat',
  syncDrums = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSong, setSelectedSong] = useState('jingleBells');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [drumsEnabled, setDrumsEnabled] = useState(true);
  const [selectedDrumPattern, setSelectedDrumPattern] = useState(drumPattern);
  const timeoutsRef = useRef([]);
  const notesPlayingRef = useRef([]);
  const drumEngineInitialized = useRef(false);

  // Stop all playing notes and drums
  const stopAllNotes = useCallback(() => {
    // Clear all timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Stop all playing notes
    notesPlayingRef.current.forEach(({ note, octave }) => {
      if (onNoteStop) {
        onNoteStop(note, octave);
      }
    });
    notesPlayingRef.current = [];

    // Stop drums if enabled
    if (syncDrums && drumsEnabled && drumEngine?.current) {
      drumEngine.current.stop();
    }
  }, [onNoteStop, syncDrums, drumsEnabled, drumEngine]);

  // Play a song
  const playSong = useCallback(async () => {
    const song = SONGS[selectedSong];
    if (!song) return;

    // Clear any existing playback
    stopAllNotes();

    // Start drums if enabled
    if (syncDrums && drumsEnabled && drumEngine?.current) {
      // Initialize drum engine if needed
      if (!drumEngineInitialized.current) {
        await drumEngine.current.initialize();
        drumEngineInitialized.current = true;
      }

      // Set pattern and BPM
      drumEngine.current.setPattern(selectedDrumPattern);

      // Calculate BPM from song tempo (assuming default tempo is 120)
      const songBPM = song.bpm || 120;
      drumEngine.current.setBPM(Math.round(songBPM * playbackSpeed));
      drumEngine.current.setMasterVolume(0.5);

      // Start drums
      drumEngine.current.play();
    }

    // Schedule all notes
    song.notes.forEach(({ note, octave, duration, delay }) => {
      // Adjust timing based on playback speed
      const adjustedDelay = delay / playbackSpeed;
      const adjustedDuration = duration / playbackSpeed;

      // Schedule note start
      const startTimeout = setTimeout(() => {
        if (onNotePlay) {
          onNotePlay(note, octave);
          notesPlayingRef.current.push({ note, octave });
        }
      }, adjustedDelay);

      // Schedule note end
      const endTimeout = setTimeout(() => {
        if (onNoteStop) {
          onNoteStop(note, octave);
          // Remove from playing notes
          notesPlayingRef.current = notesPlayingRef.current.filter(
            (n) => !(n.note === note && n.octave === octave)
          );
        }
      }, adjustedDelay + adjustedDuration);

      timeoutsRef.current.push(startTimeout, endTimeout);
    });

    // Schedule end of song
    const lastNote = song.notes[song.notes.length - 1];
    const songEndTime = (lastNote.delay + lastNote.duration) / playbackSpeed;
    const endTimeout = setTimeout(() => {
      setIsPlaying(false);
      // Stop drums when song ends
      if (syncDrums && drumsEnabled && drumEngine?.current) {
        drumEngine.current.stop();
      }
    }, songEndTime);
    timeoutsRef.current.push(endTimeout);
  }, [selectedSong, playbackSpeed, onNotePlay, onNoteStop, stopAllNotes, syncDrums, drumsEnabled, drumEngine, selectedDrumPattern]);

  // Handle play/stop button
  const handlePlayStop = useCallback(async () => {
    if (isPlaying) {
      stopAllNotes();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      await playSong();
    }
  }, [isPlaying, playSong, stopAllNotes]);

  // Handle song selection
  const handleSongChange = useCallback((event) => {
    const newSong = event.target.value;
    setSelectedSong(newSong);

    // Set recommended drum pattern for the selected song
    const song = SONGS[newSong];
    if (song && song.recommendedDrumKey) {
      setSelectedDrumPattern(song.recommendedDrumKey);
    }

    // Stop current playback if playing
    if (isPlaying) {
      stopAllNotes();
      setIsPlaying(false);
    }
  }, [isPlaying, stopAllNotes]);

  // Handle speed change
  const handleSpeedChange = useCallback((event) => {
    const newSpeed = parseFloat(event.target.value);
    setPlaybackSpeed(newSpeed);

    // Stop current playback if playing
    if (isPlaying) {
      stopAllNotes();
      setIsPlaying(false);
    }
  }, [isPlaying, stopAllNotes]);

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      stopAllNotes();
    };
  }, [stopAllNotes]);

  return (
    <div className={styles.autoPlayer} data-theme={theme}>
      <div className={styles.controls}>
        <div className={styles.songSelector}>
          <label htmlFor="song-select" className={styles.label}>
            曲を選択:
          </label>
          <select
            id="song-select"
            className={styles.select}
            value={selectedSong}
            onChange={handleSongChange}
            disabled={isPlaying}
          >
            {Object.entries(SONGS).map(([key, song]) => (
              <option key={key} value={key}>
                {song.title} {song.recommendedDrum ? `(${song.recommendedDrum})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.speedControl}>
          <label htmlFor="speed-select" className={styles.label}>
            速度:
          </label>
          <select
            id="speed-select"
            className={styles.select}
            value={playbackSpeed}
            onChange={handleSpeedChange}
            disabled={isPlaying}
          >
            <option value="0.5">0.5x (ゆっくり)</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x (標準)</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x (速い)</option>
            <option value="2">2x (とても速い)</option>
          </select>
        </div>

        {/* Drum sync controls */}
        {syncDrums && drumEngine && (
          <div className={styles.drumControls}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={drumsEnabled}
                onChange={(e) => setDrumsEnabled(e.target.checked)}
                disabled={isPlaying}
              />
              ドラム同期
            </label>

            {drumsEnabled && (
              <select
                className={styles.select}
                value={selectedDrumPattern}
                onChange={(e) => setSelectedDrumPattern(e.target.value)}
                disabled={isPlaying}
              >
                <option value="rock_8beat">8ビート</option>
                <option value="rock_16beat">16ビート</option>
                <option value="pop">ポップ</option>
                <option value="ballad">バラード</option>
                <option value="funk">ファンク</option>
                <option value="disco">ディスコ</option>
                <option value="bossa_nova">ボサノバ</option>
                <option value="latin">ラテン</option>
                <option value="metronome">メトロノーム</option>
              </select>
            )}
          </div>
        )}

        <button
          className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
          onClick={handlePlayStop}
        >
          {isPlaying ? '⏹️ 停止' : '▶️ 再生'}
        </button>
      </div>

      {isPlaying && (
        <div className={styles.nowPlaying}>
          <span className={styles.playingIndicator}>♪</span>
          <span>再生中: {SONGS[selectedSong].title}</span>
          {syncDrums && drumsEnabled && SONGS[selectedSong].recommendedDrum && (
            <span> 🥁 {SONGS[selectedSong].recommendedDrum}</span>
          )}
        </div>
      )}
    </div>
  );
};