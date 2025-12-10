/**
 * TypeScript Type Definitions for Smartphone Piano App
 *
 * This file contains all type definitions used throughout the application.
 * Even though we're using JavaScript (.jsx files), these types serve as
 * documentation and can be used for JSDoc type hints.
 *
 * @version 1.0
 * @date 2024-12-09
 */

// ============================================================================
// ENUMS AND CONSTANTS
// ============================================================================

/**
 * Available visual themes
 */
export type ThemeType = 'classic' | 'modern' | 'neon';

/**
 * Note label display modes
 */
export type LabelMode = 'english' | 'japanese' | 'none';

/**
 * Musical note names (chromatic scale)
 */
export type NoteName =
  | 'C' | 'C#'
  | 'D' | 'D#'
  | 'E'
  | 'F' | 'F#'
  | 'G' | 'G#'
  | 'A' | 'A#'
  | 'B';

/**
 * Octave range (C3 to C7)
 */
export type Octave = 3 | 4 | 5 | 6 | 7;

/**
 * Full note identifier (e.g., "C4", "A#5")
 */
export type NoteIdentifier = `${NoteName}${Octave}`;

/**
 * Audio node unique identifier
 */
export type NodeId = number;

/**
 * Recording event types (Phase 2)
 */
export type RecordingEventType = 'noteOn' | 'noteOff';

// ============================================================================
// COMPONENT PROPS
// ============================================================================

/**
 * Props for the root App component
 */
export interface AppProps {
  // Root component has no props
}

/**
 * Props for Piano component (keyboard container)
 */
export interface PianoProps {
  /** Current octave to display */
  octave: Octave;

  /** Callback when a note starts playing */
  onNotePlay: (note: NoteName, octave: Octave) => void;

  /** Callback when a note stops playing */
  onNoteStop: (note: NoteName, octave: Octave) => void;

  /** Current theme */
  theme: ThemeType;

  /** Note label display mode */
  showLabels: LabelMode;

  /** Currently pressed keys (for visual feedback) */
  pressedKeys?: Set<NoteIdentifier>;
}

/**
 * Props for individual Key component
 */
export interface KeyProps {
  /** Note name (e.g., "C", "C#") */
  note: NoteName;

  /** Whether this is a black key */
  isBlackKey: boolean;

  /** Current octave */
  octave: Octave;

  /** Callback when key is pressed */
  onPress: () => void;

  /** Callback when key is released */
  onRelease: () => void;

  /** Whether key is currently pressed */
  isPressed: boolean;

  /** Label to display (or null if hidden) */
  label: string | null;

  /** Current theme */
  theme: ThemeType;

  /** Optional CSS class name */
  className?: string;
}

/**
 * Props for OctaveSelector component
 */
export interface OctaveSelectorProps {
  /** Current octave */
  octave: Octave;

  /** Callback when octave changes */
  onOctaveChange: (newOctave: Octave) => void;

  /** Minimum octave (default: 3) */
  minOctave?: Octave;

  /** Maximum octave (default: 7) */
  maxOctave?: Octave;
}

/**
 * Props for VolumeControl component
 */
export interface VolumeControlProps {
  /** Current volume (0-1) */
  volume: number;

  /** Whether audio is muted */
  isMuted: boolean;

  /** Callback when volume changes */
  onVolumeChange: (volume: number) => void;

  /** Callback when mute is toggled */
  onMuteToggle: () => void;
}

/**
 * Props for ThemeSelector component
 */
export interface ThemeSelectorProps {
  /** Current theme */
  theme: ThemeType;

  /** Callback when theme changes */
  onThemeChange: (theme: ThemeType) => void;
}

/**
 * Props for NoteLabelToggle component
 */
export interface NoteLabelToggleProps {
  /** Current label mode */
  labelMode: LabelMode;

  /** Callback when label mode changes */
  onLabelModeChange: (mode: LabelMode) => void;
}

/**
 * Props for Recorder component (Phase 2)
 */
export interface RecorderProps {
  /** Whether recording is in progress */
  isRecording: boolean;

  /** Callback to start recording */
  onStartRecording: () => void;

  /** Callback to stop recording */
  onStopRecording: () => void;

  /** Callback to play recording */
  onPlayRecording: (recordingId: string) => void;

  /** Callback to save recording */
  onSaveRecording: (name: string) => void;

  /** List of saved recordings */
  recordings: Recording[];
}

// ============================================================================
// STATE TYPES
// ============================================================================

/**
 * Global application state
 */
export interface AppState {
  /** Current octave */
  octave: Octave;

  /** Master volume (0-1) */
  volume: number;

  /** Whether audio is muted */
  isMuted: boolean;

  /** Current visual theme */
  theme: ThemeType;

  /** Note label display mode */
  labelMode: LabelMode;

  /** Whether audio engine is initialized (iOS Safari workaround) */
  isAudioInitialized: boolean;

  /** Currently pressed keys */
  pressedKeys: Set<NoteIdentifier>;
}

/**
 * User settings (persisted to LocalStorage)
 */
export interface UserSettings {
  /** Octave preference */
  octave: Octave;

  /** Volume preference (0-1) */
  volume: number;

  /** Theme preference */
  theme: ThemeType;

  /** Label mode preference */
  labelMode: LabelMode;
}

// ============================================================================
// AUDIO ENGINE TYPES
// ============================================================================

/**
 * Audio node (OscillatorNode + GainNode pair)
 */
export interface AudioNode {
  /** Web Audio API OscillatorNode */
  oscillator: OscillatorNode;

  /** Web Audio API GainNode */
  gainNode: GainNode;

  /** Note being played */
  note: NoteIdentifier;

  /** Start time */
  startTime: number;
}

/**
 * ADSR Envelope parameters
 */
export interface ADSREnvelope {
  /** Attack time in seconds */
  attack: number;

  /** Decay time in seconds */
  decay: number;

  /** Sustain level (0-1) */
  sustain: number;

  /** Release time in seconds */
  release: number;
}

/**
 * Audio engine interface
 */
export interface AudioEngine {
  /**
   * Initialize audio context (must be called after user gesture)
   * @returns Promise<boolean> - True if initialization successful
   */
  initialize(): Promise<boolean>;

  /**
   * Play a note with given frequency
   * @param frequency - Frequency in Hz (e.g., 440 for A4)
   * @param velocity - Note velocity 0-1 (default: 0.8)
   * @returns NodeId - Unique identifier for this note
   */
  playNote(frequency: number, velocity?: number): NodeId | null;

  /**
   * Stop a playing note
   * @param nodeId - Unique identifier from playNote()
   */
  stopNote(nodeId: NodeId): void;

  /**
   * Set master volume
   * @param volume - Volume level 0-1
   */
  setVolume(volume: number): void;

  /**
   * Get current master volume
   * @returns Current volume (0-1)
   */
  getVolume(): number;

  /**
   * Set mute state
   * @param muted - True to mute, false to unmute
   */
  setMuted(muted: boolean): void;

  /**
   * Check if audio is muted
   * @returns True if muted
   */
  isMuted(): boolean;

  /**
   * Get count of currently playing notes
   * @returns Number of active notes
   */
  getActiveNoteCount(): number;

  /**
   * Cleanup all resources
   * @returns Promise that resolves when cleanup is complete
   */
  cleanup(): Promise<void>;
}

/**
 * Note frequency mapping
 */
export interface NoteFrequencyMap {
  [key: string]: number; // e.g., { "C4": 261.63, "A4": 440.00 }
}

// ============================================================================
// STORAGE TYPES
// ============================================================================

/**
 * LocalStorage data structure
 */
export interface StorageData {
  /** App version (for migration) */
  version: string;

  /** User settings */
  settings: UserSettings;

  /** Saved recordings (Phase 2) */
  recordings: Recording[];
}

/**
 * Recording data structure (Phase 2)
 */
export interface Recording {
  /** Unique recording ID */
  id: string;

  /** Recording name (user-provided) */
  name: string;

  /** Creation timestamp */
  createdAt: number;

  /** Recording duration in seconds */
  duration: number;

  /** Tempo (BPM) */
  tempo: number;

  /** Recording events */
  events: RecordingEvent[];
}

/**
 * Recording event (noteOn or noteOff)
 */
export interface RecordingEvent {
  /** Event type */
  type: RecordingEventType;

  /** Note identifier (e.g., "C4") */
  note: NoteIdentifier;

  /** Frequency in Hz */
  frequency: number;

  /** Timestamp in seconds (relative to recording start) */
  timestamp: number;

  /** Velocity (0-1, only for noteOn) */
  velocity?: number;
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

/**
 * Return type for useAudioEngine hook
 */
export interface UseAudioEngineReturn {
  /** Audio engine instance */
  audioEngine: AudioEngine | null;

  /** Whether audio is initialized */
  isInitialized: boolean;

  /** Initialization error (if any) */
  error: Error | null;

  /** Function to initialize audio */
  initialize: () => Promise<void>;
}

/**
 * Return type for useKeyboard hook
 */
export interface UseKeyboardReturn {
  /** Currently pressed keyboard keys */
  pressedKeys: Set<string>;

  /** Enable keyboard listener */
  enable: () => void;

  /** Disable keyboard listener */
  disable: () => void;
}

/**
 * Return type for useLocalStorage hook
 */
export interface UseLocalStorageReturn<T> {
  /** Current value */
  value: T;

  /** Function to update value */
  setValue: (newValue: T | ((prev: T) => T)) => void;

  /** Function to remove value */
  removeValue: () => void;
}

/**
 * Return type for useRecorder hook (Phase 2)
 */
export interface UseRecorderReturn {
  /** Whether recording is in progress */
  isRecording: boolean;

  /** Start recording */
  startRecording: () => void;

  /** Stop recording */
  stopRecording: () => void;

  /** Play recorded events */
  playRecording: (recording: Recording) => void;

  /** Stop playback */
  stopPlayback: () => void;

  /** Whether playback is in progress */
  isPlaying: boolean;

  /** Current recording events */
  currentRecording: RecordingEvent[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Keyboard key to note mapping
 */
export interface KeyboardMapping {
  [key: string]: {
    note: NoteName;
    octaveOffset: number; // Relative to current octave
  };
}

/**
 * Responsive breakpoint configuration
 */
export interface ResponsiveConfig {
  /** Mobile portrait (<375px) */
  mobile: {
    keys: number;
    keyWidth: number;
  };

  /** Mobile landscape (375-768px) */
  mobileLandscape: {
    keys: number;
    keyWidth: number;
  };

  /** Tablet (768-1024px) */
  tablet: {
    keys: number;
    keyWidth: number;
  };

  /** Desktop (>1024px) */
  desktop: {
    keys: number;
    keyWidth: number;
  };
}

/**
 * Theme CSS variables
 */
export interface ThemeVariables {
  '--bg-color': string;
  '--key-white': string;
  '--key-white-pressed': string;
  '--key-black': string;
  '--key-black-pressed': string;
  '--key-border': string;
  '--key-shadow': string;
  '--key-pressed-shadow': string;
  '--text-color': string;
  '--label-color': string;
  '--glow-effect'?: string; // Neon theme only
}

/**
 * Error types
 */
export interface AppError {
  /** Error code */
  code: string;

  /** User-friendly message */
  message: string;

  /** Technical details */
  details?: string;

  /** Suggested action */
  action?: string;
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  /** Audio latency in milliseconds */
  audioLatency: number;

  /** Initial load time in milliseconds */
  loadTime: number;

  /** Average frame rate */
  fps: number;

  /** Memory usage in MB */
  memoryUsage: number;

  /** Bundle size in KB */
  bundleSize: number;
}

// ============================================================================
// EVENT TYPES
// ============================================================================

/**
 * Custom note event
 */
export interface NoteEvent {
  /** Note being played */
  note: NoteName;

  /** Octave */
  octave: Octave;

  /** Frequency */
  frequency: number;

  /** Velocity (0-1) */
  velocity: number;

  /** Timestamp */
  timestamp: number;
}

/**
 * Keyboard event handler type
 */
export type KeyboardEventHandler = (event: KeyboardEvent) => void;

/**
 * Touch event handler type
 */
export type TouchEventHandler = (event: TouchEvent) => void;

/**
 * Mouse event handler type
 */
export type MouseEventHandler = (event: MouseEvent) => void;

// ============================================================================
// CONSTANTS (exported as types for documentation)
// ============================================================================

/**
 * App constants
 */
export interface AppConstants {
  /** App version */
  VERSION: string;

  /** Default octave */
  DEFAULT_OCTAVE: Octave;

  /** Default volume (0-1) */
  DEFAULT_VOLUME: number;

  /** Default theme */
  DEFAULT_THEME: ThemeType;

  /** Default label mode */
  DEFAULT_LABEL_MODE: LabelMode;

  /** Minimum octave */
  MIN_OCTAVE: Octave;

  /** Maximum octave */
  MAX_OCTAVE: Octave;

  /** Maximum simultaneous notes */
  MAX_SIMULTANEOUS_NOTES: number;

  /** Target audio latency in milliseconds */
  TARGET_AUDIO_LATENCY: number;

  /** LocalStorage key */
  STORAGE_KEY: string;

  /** Maximum recordings (Phase 2) */
  MAX_RECORDINGS: number;

  /** Maximum recording duration in seconds */
  MAX_RECORDING_DURATION: number;
}

// ============================================================================
// TYPE GUARDS (for runtime type checking)
// ============================================================================

/**
 * Check if a value is a valid ThemeType
 */
export function isThemeType(value: unknown): value is ThemeType {
  return typeof value === 'string' && ['classic', 'modern', 'neon'].includes(value);
}

/**
 * Check if a value is a valid LabelMode
 */
export function isLabelMode(value: unknown): value is LabelMode {
  return typeof value === 'string' && ['english', 'japanese', 'none'].includes(value);
}

/**
 * Check if a value is a valid Octave
 */
export function isOctave(value: unknown): value is Octave {
  return typeof value === 'number' && [3, 4, 5, 6, 7].includes(value);
}

/**
 * Check if a value is a valid NoteName
 */
export function isNoteName(value: unknown): value is NoteName {
  const validNotes: NoteName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return typeof value === 'string' && validNotes.includes(value as NoteName);
}

// ============================================================================
// JSDOC TYPE HINTS (for use in .jsx files)
// ============================================================================

/**
 * Example JSDoc usage in .jsx files:
 *
 * @example
 * // In Piano.jsx:
 *
 * /**
 *  * Piano keyboard component
 *  * @param {import('../types').PianoProps} props
 *  * @returns {JSX.Element}
 *  *\/
 * export function Piano(props) {
 *   // ...
 * }
 *
 * @example
 * // In audioEngine.js:
 *
 * /**
 *  * Play a note
 *  * @param {number} frequency
 *  * @param {number} [velocity=0.8]
 *  * @returns {import('../types').NodeId | null}
 *  *\/
 * function playNote(frequency, velocity = 0.8) {
 *   // ...
 * }
 */

export {};
