/**
 * App Component - Root Application Component
 * Manages global state and coordinates child components
 */
import React, { useState } from 'react';
import { Piano } from '../Piano/Piano';
import { OctaveSelector } from '../Controls/OctaveSelector';
import { VolumeControl } from '../Controls/VolumeControl';
import { ThemeSelector } from '../Controls/ThemeSelector';
import { NoteLabelToggle } from '../Controls/NoteLabelToggle';
import { InstrumentSelector } from '../InstrumentSelector/InstrumentSelector';
import { AutoPlayer } from '../AutoPlayer/AutoPlayer';
import { RecorderControls } from '../RecorderControls/RecorderControls';
import { DrumControls } from '../DrumControls/DrumControls';
import { Accordion, AccordionItem } from '../Accordion/Accordion';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import useRecorder from '../../hooks/useRecorder';
import { createDrumEngine } from '../../utils/drumEngine';
import './App.css';

const DEFAULT_OCTAVE = 4;
const DEFAULT_VOLUME = 0.5;
const DEFAULT_THEME = 'classic';
const DEFAULT_LABEL_MODE = 'english';

export const App = () => {
  // Global state
  const [octave, setOctave] = useState(DEFAULT_OCTAVE);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [labelMode, setLabelMode] = useState(DEFAULT_LABEL_MODE);
  const [pressedKeys, setPressedKeys] = useState(new Set());

  // Store active notes (nodeId mapping)
  const activeNotesRef = React.useRef(new Map());
  // Drum engine reference
  const drumEngineRef = React.useRef(null);

  // Initialize audio engine
  const {
    playNote,
    stopNote,
    setVolume: setEngineVolume,
    setMuted,
    currentInstrument,
    setInstrument,
    getAvailableInstruments
  } = useAudioEngine();

  // Initialize drum engine
  React.useEffect(() => {
    drumEngineRef.current = createDrumEngine();
    return () => {
      if (drumEngineRef.current) {
        drumEngineRef.current.cleanup?.();
      }
    };
  }, []);

  // Initialize recorder
  const {
    isRecording,
    recordedEvents,
    startRecording,
    stopRecording,
    recordEvent,
    clearRecording,
  } = useRecorder();

  // Note event handlers with audio engine
  const handleNotePlay = React.useCallback((note, octave, velocity = 0.8) => {
    const noteKey = `${note}${octave}`;

    // Prevent duplicate plays
    if (activeNotesRef.current.has(noteKey)) {
      return;
    }

    setPressedKeys(prev => new Set([...prev, noteKey]));
    const nodeId = playNote(note, octave, velocity);

    if (nodeId !== null) {
      activeNotesRef.current.set(noteKey, nodeId);
    }

    // Record the event if recording
    if (isRecording) {
      recordEvent({
        type: 'noteOn',
        note,
        octave,
        velocity,
      });
    }

    console.log(`Playing: ${note}${octave}`);
  }, [playNote, isRecording, recordEvent]);

  const handleNoteStop = React.useCallback((note, octave) => {
    const noteKey = `${note}${octave}`;

    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(noteKey);
      return newSet;
    });

    const nodeId = activeNotesRef.current.get(noteKey);
    if (nodeId !== undefined) {
      stopNote(nodeId);
      activeNotesRef.current.delete(noteKey);
    }

    // Record the event if recording
    if (isRecording) {
      recordEvent({
        type: 'noteOff',
        note,
        octave,
      });
    }

    console.log(`Stopping: ${note}${octave}`);
  }, [stopNote, isRecording, recordEvent]);

  // Volume handlers
  const handleVolumeChange = React.useCallback((newVolume) => {
    setVolume(newVolume);
    setEngineVolume(newVolume);
    console.log(`Volume: ${Math.round(newVolume * 100)}%`);
  }, [setEngineVolume]);

  const handleMuteToggle = React.useCallback(() => {
    setIsMuted(prev => !prev);
    setMuted(!isMuted);
  }, [isMuted, setMuted]);

  // Theme handler
  const handleThemeChange = React.useCallback((newTheme) => {
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  }, []);

  // Label mode handler
  const handleLabelModeChange = React.useCallback((newMode) => {
    setLabelMode(newMode);
  }, []);

  // Octave handler
  const handleOctaveChange = React.useCallback((newOctave) => {
    setOctave(newOctave);
  }, []);

  // Instrument handler
  const handleInstrumentChange = React.useCallback((newInstrument) => {
    setInstrument(newInstrument);
    console.log(`Switched to: ${newInstrument}`);
  }, [setInstrument]);

  // Drum handlers
  const handleDrumPlay = React.useCallback((drumType) => {
    // Record drum event if recording
    if (isRecording) {
      recordEvent({
        type: 'drum',
        drumType,
      });
    }
  }, [isRecording, recordEvent]);

  const handlePlayDrumFromRecording = React.useCallback(async (drumType) => {
    if (drumEngineRef.current) {
      // Initialize if needed
      if (drumEngineRef.current.initialize) {
        await drumEngineRef.current.initialize();
      }
      drumEngineRef.current.playSound?.(drumType);
    }
  }, []);

  // Apply theme on mount
  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Piano App</h1>
      </header>

      <main className="app-main">
        <div className="controls-panel">
          <InstrumentSelector
            currentInstrument={currentInstrument}
            onInstrumentChange={handleInstrumentChange}
            availableInstruments={getAvailableInstruments()}
            theme={theme}
            language="ja"
          />
          <OctaveSelector
            octave={octave}
            onOctaveChange={handleOctaveChange}
          />
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={handleMuteToggle}
          />
          <ThemeSelector
            theme={theme}
            onThemeChange={handleThemeChange}
          />
          <NoteLabelToggle
            labelMode={labelMode}
            onLabelModeChange={handleLabelModeChange}
          />
        </div>

        <Accordion theme={theme}>
          <AccordionItem
            title="録音 & 再生"
            icon="🎙️"
            defaultExpanded={false}
            status={isRecording ? { text: '録音中', type: 'recording' } : null}
            theme={theme}
          >
            <RecorderControls
              isRecording={isRecording}
              recordedEvents={recordedEvents}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              onClearRecording={clearRecording}
              onPlayNote={handleNotePlay}
              onStopNote={handleNoteStop}
              onPlayDrum={handlePlayDrumFromRecording}
              theme={theme}
            />
          </AccordionItem>

          <AccordionItem
            title="ドラムマシン"
            icon="🥁"
            defaultExpanded={false}
            theme={theme}
          >
            <DrumControls
              theme={theme}
              isRecording={isRecording}
              onDrumPlay={handleDrumPlay}
            />
          </AccordionItem>

          <AccordionItem
            title="自動演奏"
            icon="🎵"
            defaultExpanded={false}
            theme={theme}
          >
            <AutoPlayer
              onNotePlay={handleNotePlay}
              onNoteStop={handleNoteStop}
              theme={theme}
              drumEngine={drumEngineRef}
              drumPattern="rock_8beat"
              syncDrums={true}
            />
          </AccordionItem>
        </Accordion>

        <div className="piano-container">
          <Piano
            octave={octave}
            onNotePlay={handleNotePlay}
            onNoteStop={handleNoteStop}
            theme={theme}
            showLabels={labelMode}
            pressedKeys={pressedKeys}
          />
        </div>
      </main>
    </div>
  );
};
