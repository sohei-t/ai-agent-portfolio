/**
 * Drum Controls Component
 * Provides interface for controlling drum rhythm patterns and playback
 */
import React, { useState, useEffect, useCallback } from 'react';
import { createDrumEngine } from '../../utils/drumEngine';
import styles from './DrumControls.module.css';

/**
 * Drum controls component
 * @param {Object} props
 * @param {string} props.theme - Current theme
 * @param {boolean} props.isRecording - Whether recording is active
 * @param {Function} props.onDrumPlay - Callback when drum is played
 */
export const DrumControls = ({
  theme = 'classic',
  isRecording = false,
  onDrumPlay
}) => {
  const [drumEngine, setDrumEngine] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('rock_8beat');
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(0.5);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [showDrumPads, setShowDrumPads] = useState(false);
  const [engineInitialized, setEngineInitialized] = useState(false);

  // Initialize drum engine
  useEffect(() => {
    const engine = createDrumEngine();
    setDrumEngine(engine);

    // Set initial BPM from patterns
    const patterns = engine.getPatterns();
    if (patterns[selectedPattern]) {
      setBpm(patterns[selectedPattern].bpm);
    }

    // Cleanup on unmount
    return () => {
      if (engine) {
        engine.stop();
      }
    };
  }, []);

  // Update beat indicator
  useEffect(() => {
    if (!drumEngine || !isPlaying) return;

    let stepCounter = 0;
    const updateBeat = () => {
      stepCounter = (stepCounter + 1) % 16;
      setCurrentBeat(stepCounter);
    };

    const bpmMs = 60000 / (bpm * 4); // 16th note interval
    const interval = setInterval(updateBeat, bpmMs);
    return () => clearInterval(interval);
  }, [drumEngine, isPlaying, bpm]);

  // Initialize audio context on first user interaction
  const initializeEngineIfNeeded = useCallback(async () => {
    if (!engineInitialized && drumEngine) {
      await drumEngine.initialize();
      setEngineInitialized(true);
    }
  }, [drumEngine, engineInitialized]);

  // Handle play/stop
  const handlePlayStop = useCallback(async () => {
    if (!drumEngine) return;

    await initializeEngineIfNeeded();

    if (isPlaying) {
      drumEngine.stop();
      setIsPlaying(false);
      setCurrentBeat(-1);
    } else {
      drumEngine.setPattern(selectedPattern);
      drumEngine.setBPM(bpm);
      drumEngine.setMasterVolume(volume);
      drumEngine.play();
      setIsPlaying(true);
    }
  }, [drumEngine, isPlaying, selectedPattern, bpm, volume, initializeEngineIfNeeded]);

  // Handle pattern change
  const handlePatternChange = useCallback((patternKey) => {
    if (!drumEngine) return;

    setSelectedPattern(patternKey);

    // Update BPM to pattern's default
    const patterns = drumEngine.getPatterns();
    if (patterns[patternKey]) {
      setBpm(patterns[patternKey].bpm);
    }

    // If playing, switch pattern immediately
    if (isPlaying) {
      drumEngine.stop();
      drumEngine.setPattern(patternKey);
      drumEngine.setBPM(patterns[patternKey].bpm);
      drumEngine.setMasterVolume(volume);
      drumEngine.play();
    }
  }, [drumEngine, isPlaying, volume]);

  // Handle BPM change
  const handleBPMChange = useCallback((event) => {
    const newBPM = parseInt(event.target.value, 10);
    setBpm(newBPM);

    if (drumEngine) {
      drumEngine.setBPM(newBPM);
    }
  }, [drumEngine]);

  // Handle volume change
  const handleVolumeChange = useCallback((event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    if (drumEngine) {
      drumEngine.setMasterVolume(newVolume);
    }
  }, [drumEngine]);

  // Handle drum pad play
  const handleDrumPadPlay = useCallback(async (drumType) => {
    if (!drumEngine) return;
    await initializeEngineIfNeeded();
    drumEngine.playSound(drumType);

    // Record drum event if recording
    if (isRecording && onDrumPlay) {
      onDrumPlay(drumType);
    }
  }, [drumEngine, initializeEngineIfNeeded, isRecording, onDrumPlay]);

  // Get available patterns
  const patterns = drumEngine ? drumEngine.getPatterns() : {};

  // Group patterns by category
  const patternsByCategory = {
    basic: ['rock_8beat', 'rock_16beat', 'pop', 'ballad'],
    groove: ['funk', 'disco', 'shuffle'],
    world: ['bossa_nova', 'reggae', 'samba', 'latin'],
    modern: ['hiphop', 'trap', 'edm', 'metronome'],
  };

  return (
    <div className={styles.drumControls} data-theme={theme}>

      {/* Main Controls */}
      <div className={styles.mainControls}>
        <button
          className={`${styles.playButton} ${isPlaying ? styles.stopButton : styles.startButton}`}
          onClick={handlePlayStop}
        >
          {isPlaying ? '⏹️ 停止' : '▶️ 再生'}
        </button>

        <button
          className={styles.playButton}
          onClick={() => setShowDrumPads(!showDrumPads)}
        >
          🎹 {showDrumPads ? 'パッドを隠す' : 'ドラムパッド'}
        </button>
      </div>

      {/* Pattern Selector */}
      <div className={styles.patternSection}>
        <label className={styles.sectionLabel}>リズムパターン</label>
        {Object.entries(patternsByCategory).map(([category, patternKeys]) => (
          <div key={category}>
            <div className={styles.patternGrid}>
              {patternKeys.map((patternKey) => (
                <button
                  key={patternKey}
                  className={`${styles.patternButton} ${selectedPattern === patternKey ? styles.selected : ''}`}
                  onClick={() => handlePatternChange(patternKey)}
                >
                  {patterns[patternKey]?.name || patternKey}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.controlsSection}>
        <div className={styles.control}>
          <label htmlFor="bpm-slider" className={styles.controlLabel}>
            テンポ (BPM)
          </label>
          <input
            id="bpm-slider"
            type="range"
            min="60"
            max="200"
            value={bpm}
            onChange={handleBPMChange}
            className={styles.slider}
          />
          <span className={styles.controlValue}>{bpm}</span>
        </div>

        <div className={styles.control}>
          <label htmlFor="volume-slider" className={styles.controlLabel}>
            音量
          </label>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.slider}
          />
          <span className={styles.controlValue}>{Math.round(volume * 100)}%</span>
        </div>
      </div>

      {/* Beat Visualizer */}
      {isPlaying && (
        <div className={styles.visualizerSection}>
          <div className={styles.visualizer}>
            {[...Array(16)].map((_, index) => (
              <div
                key={index}
                className={`${styles.beat} ${currentBeat === index ? styles.active : ''} ${
                  index % 4 === 0 ? styles.kick : index % 8 === 4 ? styles.snare : styles.hihat
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Drum Pads */}
      {showDrumPads && (
        <div className={styles.drumPadSection}>
          <label className={styles.sectionLabel}>ドラムパッド（タップして演奏）</label>
          <div className={styles.drumPadGrid}>
            <button
              className={`${styles.drumPad} ${styles.kick}`}
              onMouseDown={() => handleDrumPadPlay('kick')}
              onTouchStart={() => handleDrumPadPlay('kick')}
            >
              キック
            </button>
            <button
              className={`${styles.drumPad} ${styles.snare}`}
              onMouseDown={() => handleDrumPadPlay('snare')}
              onTouchStart={() => handleDrumPadPlay('snare')}
            >
              スネア
            </button>
            <button
              className={`${styles.drumPad} ${styles.hihat}`}
              onMouseDown={() => handleDrumPadPlay('hihat_closed')}
              onTouchStart={() => handleDrumPadPlay('hihat_closed')}
            >
              ハイハット
            </button>
            <button
              className={`${styles.drumPad} ${styles.hihat}`}
              onMouseDown={() => handleDrumPadPlay('hihat_open')}
              onTouchStart={() => handleDrumPadPlay('hihat_open')}
            >
              オープンHH
            </button>
            <button
              className={`${styles.drumPad} ${styles.crash}`}
              onMouseDown={() => handleDrumPadPlay('crash')}
              onTouchStart={() => handleDrumPadPlay('crash')}
            >
              クラッシュ
            </button>
            <button
              className={`${styles.drumPad} ${styles.crash}`}
              onMouseDown={() => handleDrumPadPlay('ride')}
              onTouchStart={() => handleDrumPadPlay('ride')}
            >
              ライド
            </button>
            <button
              className={styles.drumPad}
              onMouseDown={() => handleDrumPadPlay('tom_high')}
              onTouchStart={() => handleDrumPadPlay('tom_high')}
            >
              ハイタム
            </button>
            <button
              className={styles.drumPad}
              onMouseDown={() => handleDrumPadPlay('tom_mid')}
              onTouchStart={() => handleDrumPadPlay('tom_mid')}
            >
              ミッドタム
            </button>
            <button
              className={styles.drumPad}
              onMouseDown={() => handleDrumPadPlay('tom_low')}
              onTouchStart={() => handleDrumPadPlay('tom_low')}
            >
              ロータム
            </button>
            <button
              className={styles.drumPad}
              onMouseDown={() => handleDrumPadPlay('clap')}
              onTouchStart={() => handleDrumPadPlay('clap')}
            >
              クラップ
            </button>
            <button
              className={styles.drumPad}
              onMouseDown={() => handleDrumPadPlay('cowbell')}
              onTouchStart={() => handleDrumPadPlay('cowbell')}
            >
              カウベル
            </button>
            <button
              className={styles.drumPad}
              onMouseDown={() => handleDrumPadPlay('tambourine')}
              onTouchStart={() => handleDrumPadPlay('tambourine')}
            >
              タンバリン
            </button>
          </div>
        </div>
      )}
    </div>
  );
};