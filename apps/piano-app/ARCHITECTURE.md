# System Architecture - Smartphone Piano App

**Version**: 1.0
**Date**: 2024-12-09
**Status**: Design Complete

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [Component Architecture](#3-component-architecture)
4. [Data Flow](#4-data-flow)
5. [State Management](#5-state-management)
6. [Module Structure](#6-module-structure)
7. [Audio System Design](#7-audio-system-design)
8. [Theme System](#8-theme-system)
9. [Storage Architecture](#9-storage-architecture)
10. [Performance Optimization](#10-performance-optimization)
11. [Error Handling Strategy](#11-error-handling-strategy)
12. [Testing Architecture](#12-testing-architecture)
13. [Implementation Guidelines](#13-implementation-guidelines)

---

## 1. System Overview

### 1.1 Architecture Style
- **Type**: Single Page Application (SPA)
- **Pattern**: Component-Based Architecture
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite 5
- **Rendering**: Client-Side Rendering (CSR)

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    App Component                      │  │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │  Controls  │  │    Piano     │  │   Recorder  │ │  │
│  │  │ Components │  │  Keyboard    │  │  (Phase 2)  │ │  │
│  │  └────────────┘  └──────────────┘  └─────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Audio Engine │  │   Storage    │  │   Keyboard   │    │
│  │    Utils     │  │   Manager    │  │   Handler    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Browser APIs Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ Web Audio API│  │ LocalStorage │  │   Keyboard   │    │
│  │              │  │     API      │  │     API      │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 System Characteristics
- **Responsive**: Adapts to screen sizes (mobile-first)
- **Real-time**: Low-latency audio processing (<30ms)
- **Stateful**: Local state management with React hooks
- **Persistent**: Settings saved to LocalStorage
- **Accessible**: WCAG AA compliant

---

## 2. Architecture Principles

### 2.1 Design Principles
1. **Separation of Concerns**: UI, business logic, and data layers are separated
2. **Component Reusability**: Small, focused components
3. **Testability**: Pure functions and isolated components
4. **Performance**: Lazy loading, memoization, optimized re-renders
5. **Maintainability**: Clear naming, modular structure, documentation

### 2.2 Technology Constraints
- **No Backend**: Pure frontend application
- **Minimal Dependencies**: React only, no state management libraries
- **Browser Compatibility**: Modern browsers with Web Audio API support
- **Bundle Size**: Target <300KB
- **Load Time**: <2 seconds on 3G

### 2.3 Quality Attributes
| Attribute | Requirement | Implementation Strategy |
|-----------|-------------|------------------------|
| Performance | <30ms latency | AudioContext optimization, requestAnimationFrame |
| Scalability | Up to 10 simultaneous notes | Active node management, automatic cleanup |
| Usability | 30-second learning curve | Intuitive UI, visual feedback |
| Accessibility | WCAG AA | ARIA labels, keyboard navigation |
| Maintainability | 80%+ test coverage | Unit tests, E2E tests, code reviews |

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
App
├── Controls (Container)
│   ├── OctaveSelector
│   ├── VolumeControl
│   ├── ThemeSelector
│   └── NoteLabelToggle
├── Piano (Container)
│   └── Key (x12-30, dynamic)
└── Recorder (Phase 2)
    ├── RecordButton
    ├── PlaybackControls
    └── SavedRecordings
```

### 3.2 Component Responsibilities

#### 3.2.1 App Component (Root)
**Purpose**: Application orchestration and global state management

**Responsibilities**:
- Initialize audio engine
- Manage global state (octave, volume, theme, labels)
- Coordinate child components
- Handle keyboard events (PC)
- Persist settings to LocalStorage

**Props**: None (root component)

**State**:
```typescript
{
  octave: number,              // Current octave (3-7)
  volume: number,              // Master volume (0-1)
  isMuted: boolean,            // Mute state
  theme: 'classic' | 'modern' | 'neon',
  labelMode: 'english' | 'japanese' | 'none',
  isAudioInitialized: boolean  // iOS Safari workaround
}
```

#### 3.2.2 Piano Component (Container)
**Purpose**: Keyboard rendering and note event handling

**Responsibilities**:
- Render 12 keys (1 octave)
- Calculate responsive key sizes
- Handle touch/mouse events
- Visual feedback for pressed keys
- Pass note events to audio engine

**Props**:
```typescript
{
  octave: number,
  onNotePlay: (note: string, octave: number) => void,
  onNoteStop: (note: string, octave: number) => void,
  theme: ThemeType,
  showLabels: LabelMode
}
```

**State**: None (stateless, controlled component)

#### 3.2.3 Key Component (Presentational)
**Purpose**: Individual piano key rendering and interaction

**Responsibilities**:
- Render single key (white or black)
- Handle touch/mouse down/up events
- Display note label (optional)
- Visual press animation
- Accessibility (aria-label)

**Props**:
```typescript
{
  note: string,                // 'C', 'C#', 'D', etc.
  isBlackKey: boolean,
  octave: number,
  onPress: () => void,
  onRelease: () => void,
  isPressed: boolean,
  label: string | null,        // Display label or null
  theme: ThemeType
}
```

#### 3.2.4 OctaveSelector Component
**Purpose**: Octave range control

**Props**:
```typescript
{
  octave: number,
  onOctaveChange: (newOctave: number) => void,
  minOctave: number,           // 3
  maxOctave: number            // 7
}
```

#### 3.2.5 VolumeControl Component
**Purpose**: Master volume and mute control

**Props**:
```typescript
{
  volume: number,              // 0-1
  isMuted: boolean,
  onVolumeChange: (volume: number) => void,
  onMuteToggle: () => void
}
```

#### 3.2.6 ThemeSelector Component
**Purpose**: Visual theme switching

**Props**:
```typescript
{
  theme: ThemeType,
  onThemeChange: (theme: ThemeType) => void
}
```

#### 3.2.7 NoteLabelToggle Component
**Purpose**: Note label display mode control

**Props**:
```typescript
{
  labelMode: LabelMode,
  onLabelModeChange: (mode: LabelMode) => void
}
```

### 3.3 Component Communication Patterns

1. **Parent-to-Child**: Props passing (unidirectional data flow)
2. **Child-to-Parent**: Callback functions (event bubbling)
3. **Global State**: Lifted state in App component
4. **Side Effects**: Custom hooks (useAudioEngine, useKeyboard)

---

## 4. Data Flow

### 4.1 User Interaction Flow

```
User Action (Touch/Click/Keyboard)
    ↓
Key Component (onPress)
    ↓
Piano Component (onNotePlay)
    ↓
App Component (handleNotePlay)
    ↓
Audio Engine (playNote)
    ↓
Web Audio API (OscillatorNode + GainNode)
    ↓
Browser Audio Output
```

### 4.2 State Update Flow

```
User Changes Setting (e.g., Volume Slider)
    ↓
Control Component (onChange callback)
    ↓
App Component (setState)
    ↓
React Re-render (Virtual DOM diff)
    ↓
Updated UI Reflection
    ↓
LocalStorage Sync (for persistent settings)
```

### 4.3 Theme Change Flow

```
User Selects Theme
    ↓
ThemeSelector (onThemeChange)
    ↓
App Component (setState)
    ↓
Update CSS Variables (data-theme attribute)
    ↓
CSS Transition (0.3s smooth animation)
```

---

## 5. State Management

### 5.1 State Architecture

**No Redux/MobX** - Using React's built-in state management:
- `useState` for component state
- `useEffect` for side effects
- `useCallback` for memoized callbacks
- `useMemo` for expensive computations
- Custom hooks for reusable logic

### 5.2 State Distribution

| State | Location | Persistence |
|-------|----------|-------------|
| Octave | App (useState) | LocalStorage |
| Volume | App (useState) | LocalStorage |
| Mute | App (useState) | Session only |
| Theme | App (useState) | LocalStorage |
| Label Mode | App (useState) | LocalStorage |
| Audio Context | useAudioEngine hook | In-memory |
| Active Notes | useAudioEngine hook | In-memory |
| Pressed Keys | Piano (useState) | In-memory |

### 5.3 State Persistence

**LocalStorage Schema**:
```json
{
  "pianoApp": {
    "version": "1.0",
    "settings": {
      "octave": 4,
      "volume": 0.5,
      "theme": "classic",
      "labelMode": "english"
    },
    "recordings": [
      // Phase 2: Recording data
    ]
  }
}
```

---

## 6. Module Structure

### 6.1 Directory Structure

```
src/
├── components/
│   ├── Piano/
│   │   ├── Piano.jsx              # Container component
│   │   ├── Piano.module.css       # Scoped styles
│   │   ├── Key.jsx                # Key component
│   │   └── Key.module.css
│   ├── Controls/
│   │   ├── OctaveSelector.jsx
│   │   ├── VolumeControl.jsx
│   │   ├── ThemeSelector.jsx
│   │   ├── NoteLabelToggle.jsx
│   │   └── Controls.module.css
│   └── Recorder/                  # Phase 2
│       ├── Recorder.jsx
│       └── Recorder.module.css
├── hooks/
│   ├── useAudioEngine.js          # Web Audio API abstraction
│   ├── useKeyboard.js             # Keyboard event handler
│   ├── useRecorder.js             # Recording logic (Phase 2)
│   └── useLocalStorage.js         # Storage abstraction
├── utils/
│   ├── audioEngine.js             # Core audio logic
│   ├── noteFrequencies.js         # Note-to-frequency mapping
│   ├── storage.js                 # LocalStorage helper
│   └── constants.js               # App constants
├── types/
│   └── index.ts                   # TypeScript type definitions
├── styles/
│   ├── themes.css                 # Theme CSS variables
│   ├── global.css                 # Global styles
│   └── reset.css                  # CSS reset
├── App.jsx                        # Root component
├── App.css                        # App-level styles
└── main.jsx                       # Entry point
```

### 6.2 Module Dependencies

```
main.jsx
    ↓
App.jsx
    ├── useAudioEngine (audioEngine.js, noteFrequencies.js)
    ├── useKeyboard
    ├── useLocalStorage (storage.js)
    ├── Piano → Key
    └── Controls → [OctaveSelector, VolumeControl, ThemeSelector, NoteLabelToggle]
```

---

## 7. Audio System Design

### 7.1 Audio Engine Architecture

```
AudioEngine
├── AudioContext (initialize on user gesture)
├── Master GainNode (volume control)
├── Active Node Pool (Map<nodeId, {osc, gain}>)
├── Note Frequency Table (noteFrequencies.js)
└── ADSR Envelope Generator
```

### 7.2 Audio Engine API

```javascript
// Core Interface
{
  initialize(): Promise<boolean>,
  playNote(frequency: number, velocity: number): NodeId,
  stopNote(nodeId: NodeId): void,
  setVolume(volume: number): void,
  getVolume(): number,
  setMuted(muted: boolean): void,
  isMuted(): boolean,
  getActiveNoteCount(): number,
  cleanup(): Promise<void>
}
```

### 7.3 Audio Processing Pipeline

```
Note Trigger
    ↓
Create OscillatorNode (sine wave)
    ↓
Create GainNode (ADSR envelope)
    ↓
Connect: Oscillator → GainNode → Master → Destination
    ↓
Apply Attack (0-0.01s, 0 → velocity)
    ↓
Apply Decay (0.01-0.1s, velocity → velocity*0.7)
    ↓
Sustain (hold at velocity*0.7)
    ↓
[On Note Release]
    ↓
Apply Release (0.1s, current → 0.01)
    ↓
Stop Oscillator
    ↓
Disconnect & Cleanup
```

### 7.4 iOS Safari Workaround

```javascript
// Problem: AudioContext starts in 'suspended' state on iOS
// Solution: Resume on first user interaction

document.addEventListener('touchstart', async () => {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
}, { once: true });

// Visual indicator if audio not initialized
if (!audioContext || audioContext.state !== 'running') {
  showAudioInitializationPrompt();
}
```

### 7.5 Note Frequency Calculation

**Formula**: `frequency = 440 * 2^((n-49)/12)`
- A4 (440Hz) is reference note (n=49)
- Each semitone is 2^(1/12) ratio

**Example Table**:
```javascript
{
  'C3': 130.81,
  'C#3': 138.59,
  'D3': 146.83,
  // ...
  'C4': 261.63,  // Middle C
  'A4': 440.00,  // Concert A
  'C5': 523.25,
  // ...
  'C7': 2093.00
}
```

### 7.6 Memory Management

**Problem**: OscillatorNodes can leak if not properly cleaned up

**Solution**:
1. Track active nodes in Map
2. Set `oscillator.onended` callback
3. Disconnect nodes in callback
4. Delete from Map
5. Automatic cleanup after 10 active notes (FIFO)

```javascript
const activeNodes = new Map();
const MAX_ACTIVE_NODES = 10;

function playNote(frequency) {
  // If at max capacity, stop oldest note
  if (activeNodes.size >= MAX_ACTIVE_NODES) {
    const oldestId = activeNodes.keys().next().value;
    stopNote(oldestId);
  }

  const nodeId = generateUniqueId();
  const { oscillator, gainNode } = createNode(frequency);

  oscillator.onended = () => {
    oscillator.disconnect();
    gainNode.disconnect();
    activeNodes.delete(nodeId);
  };

  activeNodes.set(nodeId, { oscillator, gainNode });
  return nodeId;
}
```

---

## 8. Theme System

### 8.1 Theme Architecture

**Implementation**: CSS Variables + data-theme attribute

```html
<body data-theme="classic">
  <!-- All components inherit theme variables -->
</body>
```

### 8.2 Theme Variable Schema

```css
[data-theme="classic"] {
  /* Colors */
  --bg-color: #1a1a1a;
  --key-white: #ffffff;
  --key-white-pressed: #e0e0e0;
  --key-black: #000000;
  --key-black-pressed: #333333;
  --key-border: #999999;

  /* Shadows */
  --key-shadow: 0 4px 6px rgba(0,0,0,0.3);
  --key-pressed-shadow: inset 0 2px 4px rgba(0,0,0,0.3);

  /* Text */
  --text-color: #ffffff;
  --label-color: #000000;

  /* Transition */
  --theme-transition: all 0.3s ease;
}

[data-theme="modern"] {
  --bg-color: #2c3e50;
  --key-white: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
  --key-black: linear-gradient(180deg, #333333 0%, #111111 100%);
  /* ... */
}

[data-theme="neon"] {
  --bg-color: #000000;
  --key-white: #00ffff;
  --key-black: #ff00ff;
  --glow-effect: 0 0 10px currentColor, 0 0 20px currentColor;
  /* ... */
}
```

### 8.3 Theme Switching Logic

```javascript
function changeTheme(newTheme) {
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('pianoApp.settings.theme', newTheme);
}

// On mount
useEffect(() => {
  const savedTheme = localStorage.getItem('pianoApp.settings.theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
  }
}, []);
```

---

## 9. Storage Architecture

### 9.1 LocalStorage Strategy

**Key**: `pianoApp`
**Max Size**: 5MB (plan for 1MB usage)
**Format**: JSON

### 9.2 Storage API

```javascript
class StorageManager {
  static save(key, value) {
    try {
      const data = this.load();
      data[key] = value;
      localStorage.setItem('pianoApp', JSON.stringify(data));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        // Handle storage full
      }
    }
  }

  static load() {
    try {
      const data = localStorage.getItem('pianoApp');
      return data ? JSON.parse(data) : this.getDefaults();
    } catch (e) {
      return this.getDefaults();
    }
  }

  static getDefaults() {
    return {
      version: '1.0',
      settings: {
        octave: 4,
        volume: 0.5,
        theme: 'classic',
        labelMode: 'english'
      },
      recordings: []
    };
  }
}
```

### 9.3 Data Migration Strategy

```javascript
// When app version changes
if (storedData.version !== currentVersion) {
  storedData = migrateData(storedData, currentVersion);
}

function migrateData(oldData, newVersion) {
  // Version-specific migrations
  if (oldData.version === '1.0' && newVersion === '1.1') {
    // Add new fields with defaults
    oldData.settings.newFeature = defaultValue;
  }
  oldData.version = newVersion;
  return oldData;
}
```

---

## 10. Performance Optimization

### 10.1 Optimization Strategies

| Area | Strategy | Expected Impact |
|------|----------|----------------|
| Rendering | React.memo for Key components | Reduce re-renders by 70% |
| Audio | Pre-calculate frequency table | Save 5ms per note |
| Events | useCallback for handlers | Prevent unnecessary re-renders |
| Bundle | Code splitting (Phase 2 Recorder) | Reduce initial bundle by 20% |
| Images | CSS-only visuals (no images) | Faster load time |

### 10.2 React Performance Patterns

```javascript
// Memoize Key component (only re-render if props change)
const Key = React.memo(({ note, isPressed, onPress, onRelease }) => {
  return <button onMouseDown={onPress} onMouseUp={onRelease}>
    {note}
  </button>;
});

// Memoize callbacks
const handleNotePlay = useCallback((note, octave) => {
  const frequency = getNoteFrequency(note, octave);
  audioEngine.playNote(frequency);
}, [audioEngine]);

// Memoize expensive computations
const keyLayout = useMemo(() => {
  return calculateResponsiveLayout(screenWidth);
}, [screenWidth]);
```

### 10.3 Audio Latency Optimization

1. **AudioContext Settings**:
   ```javascript
   const audioContext = new AudioContext({
     latencyHint: 'interactive',  // Prioritize low latency
     sampleRate: 44100            // Standard sample rate
   });
   ```

2. **Event Handling**:
   ```javascript
   // Use touchstart (not click) for mobile
   onTouchStart={(e) => {
     e.preventDefault();  // Prevent 300ms delay
     handleNotePlay(note);
   }}
   ```

3. **Pre-connection**:
   ```javascript
   // Keep AudioContext running
   setInterval(() => {
     if (audioContext.state === 'suspended') {
       audioContext.resume();
     }
   }, 1000);
   ```

### 10.4 Bundle Size Optimization

**Target**: <300KB total
- React + ReactDOM: ~130KB (gzipped)
- Application code: ~50KB
- CSS: ~20KB
- Buffer: ~100KB

**Techniques**:
- Vite tree-shaking
- CSS minification
- No large dependencies (no Lodash, etc.)

---

## 11. Error Handling Strategy

### 11.1 Error Categories

| Category | Example | Handling Strategy |
|----------|---------|------------------|
| Audio Init Failure | Safari permissions | User prompt with instructions |
| Storage Full | LocalStorage quota | Clear old recordings, notify user |
| Browser Incompatibility | No Web Audio API | Show fallback message |
| Note Play Failure | Context suspended | Auto-resume, retry once |

### 11.2 Error Handling Implementation

```javascript
// Global Error Boundary (React 18)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
    // Optional: Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Audio initialization with retry
async function initializeAudio() {
  try {
    await audioContext.resume();
    return { success: true };
  } catch (error) {
    console.error('Audio init failed:', error);
    return {
      success: false,
      error: 'AUDIO_INIT_FAILED',
      message: 'Please tap the screen to enable audio.'
    };
  }
}

// LocalStorage with fallback
function saveSettings(settings) {
  try {
    localStorage.setItem('pianoApp', JSON.stringify(settings));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      // Clear old data and retry
      clearOldRecordings();
      try {
        localStorage.setItem('pianoApp', JSON.stringify(settings));
      } catch (retryError) {
        console.warn('Storage unavailable, settings not saved');
      }
    }
  }
}
```

### 11.3 User-Facing Error Messages

```javascript
const ERROR_MESSAGES = {
  AUDIO_NOT_SUPPORTED: {
    title: 'Audio Not Supported',
    message: 'Your browser does not support Web Audio API. Please use Chrome, Safari, or Firefox.',
    action: null
  },
  AUDIO_INIT_FAILED: {
    title: 'Audio Initialization',
    message: 'Tap anywhere to enable audio playback.',
    action: 'Tap to Enable'
  },
  STORAGE_FULL: {
    title: 'Storage Full',
    message: 'Cannot save recording. Delete old recordings to free up space.',
    action: 'Manage Recordings'
  }
};
```

---

## 12. Testing Architecture

### 12.1 Testing Strategy

| Test Type | Coverage | Tools | Focus |
|-----------|----------|-------|-------|
| Unit Tests | 80%+ | Jest + RTL | Components, utils, hooks |
| Integration | Key flows | Jest + RTL | Component interactions |
| E2E | Critical paths | Playwright | User scenarios |
| Performance | Latency, FPS | Performance API | Audio latency, render time |

### 12.2 Test Structure

```
tests/
├── unit/
│   ├── audioEngine.test.js           # Audio logic
│   ├── audioEngine.edge.test.js      # Edge cases
│   ├── noteFrequencies.test.js       # Frequency calculations
│   ├── Piano.test.jsx                # Piano component
│   ├── Controls.test.jsx             # Control components
│   ├── storage.test.js               # Storage utils
│   ├── storage.edge.test.js          # Storage edge cases
│   └── hooks.test.js                 # Custom hooks
├── e2e/
│   ├── basic-playback.spec.js        # Play notes
│   ├── theme-switching.spec.js       # Theme changes
│   ├── mobile-touch.spec.js          # Touch events
│   └── keyboard-control.spec.js      # PC keyboard
└── performance/
    └── audio-latency.spec.js         # Latency measurement
```

### 12.3 Testing Utilities

```javascript
// Test helpers
export const mockAudioContext = () => {
  return {
    createOscillator: jest.fn(() => ({
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      frequency: { value: 440 },
      type: 'sine'
    })),
    createGain: jest.fn(() => ({
      connect: jest.fn(),
      gain: {
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn()
      }
    })),
    currentTime: 0,
    destination: {},
    state: 'running',
    resume: jest.fn().mockResolvedValue(undefined)
  };
};

export const renderWithTheme = (component, theme = 'classic') => {
  document.body.setAttribute('data-theme', theme);
  return render(component);
};
```

---

## 13. Implementation Guidelines

### 13.1 Development Workflow

1. **Setup Phase** (Day 1):
   - Initialize Vite + React
   - Configure Jest + Playwright
   - Setup folder structure
   - Create base CSS (reset, themes)

2. **Core Development** (Day 2-3):
   - Implement audioEngine.js (TDD)
   - Build Key → Piano components
   - Add OctaveSelector, VolumeControl
   - Integrate Web Audio API
   - Test on mobile devices

3. **UI/UX Features** (Day 3-4):
   - Implement theme system
   - Add NoteLabelToggle
   - Keyboard controls (PC)
   - Visual feedback animations
   - Accessibility (ARIA)

4. **Testing & Polish** (Day 4-5):
   - Run all tests (unit + E2E)
   - Fix bugs
   - Performance profiling
   - Cross-browser testing
   - Documentation

### 13.2 Code Style Guidelines

**Naming Conventions**:
- Components: PascalCase (`Piano.jsx`)
- Functions: camelCase (`playNote()`)
- Constants: UPPER_SNAKE_CASE (`MAX_OCTAVE`)
- CSS classes: kebab-case (`.piano-key`)
- CSS modules: camelCase (`styles.whiteKey`)

**File Organization**:
- One component per file
- Co-locate styles with components
- Group related utilities
- Separate concerns (UI, logic, data)

**Documentation**:
```javascript
/**
 * Plays a note with given frequency and velocity
 * @param {number} frequency - Note frequency in Hz (e.g., 440 for A4)
 * @param {number} velocity - Note velocity 0-1 (default: 0.8)
 * @returns {number} nodeId - Unique identifier for this note instance
 */
function playNote(frequency, velocity = 0.8) {
  // Implementation
}
```

### 13.3 Git Commit Strategy

**Commit Message Format**:
```
feat: add octave selector component
fix: resolve iOS Safari audio initialization issue
test: add unit tests for audioEngine
docs: update architecture documentation
refactor: optimize Piano component re-renders
perf: reduce audio latency to <30ms
```

### 13.4 Code Review Checklist

- [ ] All tests pass (unit + E2E)
- [ ] Test coverage ≥80%
- [ ] No console errors
- [ ] Performance metrics met (<30ms latency)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Cross-browser compatible (Chrome, Safari, Firefox)
- [ ] Code follows style guidelines
- [ ] Documentation updated

### 13.5 Deployment Checklist

- [ ] Bundle size <300KB
- [ ] Lighthouse score ≥90
- [ ] All success criteria met (REQUIREMENTS.md)
- [ ] README.md complete
- [ ] LICENSE file included
- [ ] Environment variables documented
- [ ] Production build tested

---

## Appendix A: API Reference

### Audio Engine API

```typescript
interface AudioEngine {
  initialize(): Promise<boolean>;
  playNote(frequency: number, velocity?: number): NodeId;
  stopNote(nodeId: NodeId): void;
  setVolume(volume: number): void;
  getVolume(): number;
  setMuted(muted: boolean): void;
  isMuted(): boolean;
  getActiveNoteCount(): number;
  cleanup(): Promise<void>;
}
```

### Storage API

```typescript
interface StorageManager {
  static save(key: string, value: any): void;
  static load(): AppData;
  static clear(): void;
  static getDefaults(): AppData;
}

interface AppData {
  version: string;
  settings: {
    octave: number;
    volume: number;
    theme: ThemeType;
    labelMode: LabelMode;
  };
  recordings: Recording[];
}
```

---

## Appendix B: Performance Benchmarks

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Initial Load | <2s | Lighthouse |
| Audio Latency | <30ms | Performance.now() |
| Key Press Response | <16ms | requestAnimationFrame |
| Theme Switch | <200ms | Visual inspection |
| Memory Usage | <50MB | Chrome DevTools |
| Bundle Size | <300KB | Vite build report |

---

## Appendix C: Browser Compatibility Matrix

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 90+ | ✅ Full | Recommended |
| Safari | 14+ | ✅ Full | iOS workaround needed |
| Firefox | 88+ | ✅ Full | Supported |
| Edge | 90+ | ✅ Full | Chromium-based |
| Safari iOS | 14+ | ⚠️ Limited | Requires user gesture |
| Chrome Android | 90+ | ✅ Full | Supported |

---

**Document Status**: Design Complete
**Next Steps**: Proceed to implementation (WBS Task T005+)
**Review Required**: Yes (by team lead before implementation)
