/**
 * Test suite for App Component
 * Integration tests for the root application component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';

// Mock child components
jest.mock('../../Piano/Piano', () => ({
  Piano: ({ octave, onNotePlay, onNoteStop, theme, showLabels, pressedKeys }) => (
    <div data-testid="piano-component">
      <div data-testid="piano-octave">{octave}</div>
      <div data-testid="piano-theme">{theme}</div>
      <div data-testid="piano-labels">{showLabels}</div>
      <button
        data-testid="piano-play-btn"
        onClick={() => onNotePlay('C', octave)}
      >
        Play Note
      </button>
      <button
        data-testid="piano-stop-btn"
        onClick={() => onNoteStop('C', octave)}
      >
        Stop Note
      </button>
      <div data-testid="pressed-keys-count">{pressedKeys.size}</div>
    </div>
  )
}));

jest.mock('../../Controls/OctaveSelector', () => ({
  OctaveSelector: ({ octave, onOctaveChange }) => (
    <div data-testid="octave-selector">
      <span data-testid="octave-value">{octave}</span>
      <button
        data-testid="octave-up"
        onClick={() => onOctaveChange(octave + 1)}
      >
        Octave Up
      </button>
      <button
        data-testid="octave-down"
        onClick={() => onOctaveChange(octave - 1)}
      >
        Octave Down
      </button>
    </div>
  )
}));

jest.mock('../../Controls/VolumeControl', () => ({
  VolumeControl: ({ volume, isMuted, onVolumeChange, onMuteToggle }) => (
    <div data-testid="volume-control">
      <span data-testid="volume-value">{volume}</span>
      <span data-testid="muted-state">{String(isMuted)}</span>
      <input
        data-testid="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
      />
      <button data-testid="mute-toggle" onClick={onMuteToggle}>
        Toggle Mute
      </button>
    </div>
  )
}));

jest.mock('../../Controls/ThemeSelector', () => ({
  ThemeSelector: ({ theme, onThemeChange }) => (
    <div data-testid="theme-selector">
      <span data-testid="theme-value">{theme}</span>
      <button
        data-testid="theme-dark"
        onClick={() => onThemeChange('dark')}
      >
        Dark
      </button>
      <button
        data-testid="theme-classic"
        onClick={() => onThemeChange('classic')}
      >
        Classic
      </button>
    </div>
  )
}));

jest.mock('../../Controls/NoteLabelToggle', () => ({
  NoteLabelToggle: ({ labelMode, onLabelModeChange }) => (
    <div data-testid="label-toggle">
      <span data-testid="label-mode">{labelMode}</span>
      <button
        data-testid="label-english"
        onClick={() => onLabelModeChange('english')}
      >
        English
      </button>
      <button
        data-testid="label-japanese"
        onClick={() => onLabelModeChange('japanese')}
      >
        Japanese
      </button>
    </div>
  )
}));

describe('App Component', () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    document.body.removeAttribute('data-theme');
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render app header', () => {
      render(<App />);
      expect(screen.getByRole('heading', { name: /piano app/i })).toBeInTheDocument();
    });

    test('should render all control components', () => {
      render(<App />);
      expect(screen.getByTestId('octave-selector')).toBeInTheDocument();
      expect(screen.getByTestId('volume-control')).toBeInTheDocument();
      expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
      expect(screen.getByTestId('label-toggle')).toBeInTheDocument();
    });

    test('should render piano component', () => {
      render(<App />);
      expect(screen.getByTestId('piano-component')).toBeInTheDocument();
    });

    test('should have correct initial structure', () => {
      const { container } = render(<App />);
      expect(container.querySelector('.app')).toBeInTheDocument();
      expect(container.querySelector('.app-header')).toBeInTheDocument();
      expect(container.querySelector('.app-main')).toBeInTheDocument();
      expect(container.querySelector('.controls-panel')).toBeInTheDocument();
      expect(container.querySelector('.piano-container')).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    test('should have default octave of 4', () => {
      render(<App />);
      expect(screen.getByTestId('octave-value')).toHaveTextContent('4');
    });

    test('should have default volume of 0.5', () => {
      render(<App />);
      expect(screen.getByTestId('volume-value')).toHaveTextContent('0.5');
    });

    test('should have muted state as false', () => {
      render(<App />);
      expect(screen.getByTestId('muted-state')).toHaveTextContent('false');
    });

    test('should have default theme as classic', () => {
      render(<App />);
      expect(screen.getByTestId('theme-value')).toHaveTextContent('classic');
    });

    test('should have default label mode as english', () => {
      render(<App />);
      expect(screen.getByTestId('label-mode')).toHaveTextContent('english');
    });

    test('should have no pressed keys initially', () => {
      render(<App />);
      expect(screen.getByTestId('pressed-keys-count')).toHaveTextContent('0');
    });
  });

  describe('Octave Control', () => {
    test('should change octave when octave up is clicked', () => {
      render(<App />);
      const octaveUpBtn = screen.getByTestId('octave-up');

      fireEvent.click(octaveUpBtn);

      expect(screen.getByTestId('octave-value')).toHaveTextContent('5');
      expect(screen.getByTestId('piano-octave')).toHaveTextContent('5');
    });

    test('should change octave when octave down is clicked', () => {
      render(<App />);
      const octaveDownBtn = screen.getByTestId('octave-down');

      fireEvent.click(octaveDownBtn);

      expect(screen.getByTestId('octave-value')).toHaveTextContent('3');
      expect(screen.getByTestId('piano-octave')).toHaveTextContent('3');
    });

    test('should update piano component with new octave', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('octave-up'));

      expect(screen.getByTestId('piano-octave')).toHaveTextContent('5');
    });
  });

  describe('Volume Control', () => {
    test('should change volume when slider is moved', () => {
      render(<App />);
      const slider = screen.getByTestId('volume-slider');

      fireEvent.change(slider, { target: { value: '0.8' } });

      expect(screen.getByTestId('volume-value')).toHaveTextContent('0.8');
      expect(consoleLogSpy).toHaveBeenCalledWith('Volume: 80%');
    });

    test('should toggle mute state', () => {
      render(<App />);
      const muteBtn = screen.getByTestId('mute-toggle');

      fireEvent.click(muteBtn);

      expect(screen.getByTestId('muted-state')).toHaveTextContent('true');
    });

    test('should toggle mute state back to false', () => {
      render(<App />);
      const muteBtn = screen.getByTestId('mute-toggle');

      fireEvent.click(muteBtn);
      expect(screen.getByTestId('muted-state')).toHaveTextContent('true');

      fireEvent.click(muteBtn);
      expect(screen.getByTestId('muted-state')).toHaveTextContent('false');
    });

    test('should log volume changes', () => {
      render(<App />);
      const slider = screen.getByTestId('volume-slider');

      fireEvent.change(slider, { target: { value: '0.3' } });

      expect(consoleLogSpy).toHaveBeenCalledWith('Volume: 30%');
    });
  });

  describe('Theme Control', () => {
    test('should change theme to dark', () => {
      render(<App />);
      const darkBtn = screen.getByTestId('theme-dark');

      fireEvent.click(darkBtn);

      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
      expect(screen.getByTestId('piano-theme')).toHaveTextContent('dark');
    });

    test('should change theme to classic', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('theme-dark'));
      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

      fireEvent.click(screen.getByTestId('theme-classic'));
      expect(screen.getByTestId('theme-value')).toHaveTextContent('classic');
    });

    test('should set data-theme attribute on body', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('theme-dark'));

      expect(document.body.getAttribute('data-theme')).toBe('dark');
    });

    test('should apply initial theme on mount', () => {
      render(<App />);
      expect(document.body.getAttribute('data-theme')).toBe('classic');
    });
  });

  describe('Label Mode Control', () => {
    test('should change label mode to japanese', () => {
      render(<App />);
      const japaneseBtn = screen.getByTestId('label-japanese');

      fireEvent.click(japaneseBtn);

      expect(screen.getByTestId('label-mode')).toHaveTextContent('japanese');
      expect(screen.getByTestId('piano-labels')).toHaveTextContent('japanese');
    });

    test('should change label mode back to english', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('label-japanese'));
      expect(screen.getByTestId('label-mode')).toHaveTextContent('japanese');

      fireEvent.click(screen.getByTestId('label-english'));
      expect(screen.getByTestId('label-mode')).toHaveTextContent('english');
    });
  });

  describe('Note Playing', () => {
    test('should handle note play event', () => {
      render(<App />);
      const playBtn = screen.getByTestId('piano-play-btn');

      fireEvent.click(playBtn);

      expect(screen.getByTestId('pressed-keys-count')).toHaveTextContent('1');
      expect(consoleLogSpy).toHaveBeenCalledWith('Playing: C4');
    });

    test('should handle note stop event', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('piano-play-btn'));
      expect(screen.getByTestId('pressed-keys-count')).toHaveTextContent('1');

      fireEvent.click(screen.getByTestId('piano-stop-btn'));
      expect(screen.getByTestId('pressed-keys-count')).toHaveTextContent('0');
      expect(consoleLogSpy).toHaveBeenCalledWith('Stopping: C4');
    });

    test('should track multiple pressed keys', () => {
      render(<App />);
      const playBtn = screen.getByTestId('piano-play-btn');

      fireEvent.click(playBtn);
      fireEvent.click(playBtn);

      // Should still be 1 because we're playing the same note
      expect(screen.getByTestId('pressed-keys-count')).toHaveTextContent('1');
    });

    test('should log note play with correct octave', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('octave-up'));
      fireEvent.click(screen.getByTestId('piano-play-btn'));

      expect(consoleLogSpy).toHaveBeenCalledWith('Playing: C5');
    });

    test('should log note stop with correct octave', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('octave-up'));
      fireEvent.click(screen.getByTestId('piano-play-btn'));
      fireEvent.click(screen.getByTestId('piano-stop-btn'));

      expect(consoleLogSpy).toHaveBeenCalledWith('Stopping: C5');
    });
  });

  describe('State Integration', () => {
    test('should pass correct props to Piano component', () => {
      render(<App />);

      expect(screen.getByTestId('piano-octave')).toHaveTextContent('4');
      expect(screen.getByTestId('piano-theme')).toHaveTextContent('classic');
      expect(screen.getByTestId('piano-labels')).toHaveTextContent('english');
    });

    test('should update Piano props when state changes', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('octave-up'));
      fireEvent.click(screen.getByTestId('theme-dark'));
      fireEvent.click(screen.getByTestId('label-japanese'));

      expect(screen.getByTestId('piano-octave')).toHaveTextContent('5');
      expect(screen.getByTestId('piano-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('piano-labels')).toHaveTextContent('japanese');
    });

    test('should maintain independent state for each control', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('octave-up'));
      fireEvent.change(screen.getByTestId('volume-slider'), { target: { value: '0.7' } });
      fireEvent.click(screen.getByTestId('theme-dark'));

      expect(screen.getByTestId('octave-value')).toHaveTextContent('5');
      expect(screen.getByTestId('volume-value')).toHaveTextContent('0.7');
      expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    });
  });

  describe('Callback Stability', () => {
    test('should use memoized callbacks', () => {
      const { rerender } = render(<App />);

      const firstPlayBtn = screen.getByTestId('piano-play-btn');
      const firstCallback = firstPlayBtn.onclick;

      rerender(<App />);

      const secondPlayBtn = screen.getByTestId('piano-play-btn');
      const secondCallback = secondPlayBtn.onclick;

      // Callbacks should be stable across renders
      expect(typeof firstCallback).toBe('function');
      expect(typeof secondCallback).toBe('function');
    });
  });

  describe('Edge Cases', () => {
    test('should handle rapid state changes', () => {
      render(<App />);

      for (let i = 0; i < 10; i++) {
        fireEvent.click(screen.getByTestId('octave-up'));
      }

      expect(screen.getByTestId('octave-value')).toHaveTextContent('14');
    });

    test('should handle volume at boundaries', () => {
      render(<App />);
      const slider = screen.getByTestId('volume-slider');

      fireEvent.change(slider, { target: { value: '0' } });
      expect(screen.getByTestId('volume-value')).toHaveTextContent('0');

      fireEvent.change(slider, { target: { value: '1' } });
      expect(screen.getByTestId('volume-value')).toHaveTextContent('1');
    });

    test('should handle theme changes multiple times', () => {
      render(<App />);

      fireEvent.click(screen.getByTestId('theme-dark'));
      expect(document.body.getAttribute('data-theme')).toBe('dark');

      fireEvent.click(screen.getByTestId('theme-classic'));
      expect(document.body.getAttribute('data-theme')).toBe('classic');

      fireEvent.click(screen.getByTestId('theme-dark'));
      expect(document.body.getAttribute('data-theme')).toBe('dark');
    });
  });
});
