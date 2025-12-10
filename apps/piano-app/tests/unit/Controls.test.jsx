/**
 * Unit Tests for Control Components
 * Tests octave selector, volume control, theme selector, and note label toggle
 *
 * ITERATION 1: Happy path tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OctaveSelector } from '../../src/components/Controls/OctaveSelector';
import { VolumeControl } from '../../src/components/Controls/VolumeControl';
import { ThemeSelector } from '../../src/components/Controls/ThemeSelector';
import { NoteLabelToggle } from '../../src/components/Controls/NoteLabelToggle';

describe('OctaveSelector - Iteration 1: Happy Path Tests', () => {
  const mockOctaveChange = jest.fn();

  beforeEach(() => {
    mockOctaveChange.mockClear();
  });

  describe('Rendering', () => {
    test('should render octave selector', () => {
      render(<OctaveSelector onOctaveChange={mockOctaveChange} />);
      expect(screen.getByTestId('octave-selector')).toBeInTheDocument();
    });

    test('should display current octave (default C4)', () => {
      render(<OctaveSelector onOctaveChange={mockOctaveChange} />);
      expect(screen.getByTestId('octave-display')).toHaveTextContent('C4');
    });

    test('should display C5 when octave is 5', () => {
      render(<OctaveSelector octave={5} onOctaveChange={mockOctaveChange} />);
      expect(screen.getByTestId('octave-display')).toHaveTextContent('C5');
    });

    test('should have up and down buttons', () => {
      render(<OctaveSelector onOctaveChange={mockOctaveChange} />);
      expect(screen.getByLabelText('Increase octave')).toBeInTheDocument();
      expect(screen.getByLabelText('Decrease octave')).toBeInTheDocument();
    });
  });

  describe('Octave Increase', () => {
    test('should increase octave when up button is clicked', () => {
      render(<OctaveSelector octave={4} onOctaveChange={mockOctaveChange} />);
      fireEvent.click(screen.getByLabelText('Increase octave'));
      expect(mockOctaveChange).toHaveBeenCalledWith(5);
    });

    test('should increase from C3 to C4', () => {
      render(<OctaveSelector octave={3} onOctaveChange={mockOctaveChange} />);
      fireEvent.click(screen.getByLabelText('Increase octave'));
      expect(mockOctaveChange).toHaveBeenCalledWith(4);
    });
  });

  describe('Octave Decrease', () => {
    test('should decrease octave when down button is clicked', () => {
      render(<OctaveSelector octave={4} onOctaveChange={mockOctaveChange} />);
      fireEvent.click(screen.getByLabelText('Decrease octave'));
      expect(mockOctaveChange).toHaveBeenCalledWith(3);
    });

    test('should decrease from C5 to C4', () => {
      render(<OctaveSelector octave={5} onOctaveChange={mockOctaveChange} />);
      fireEvent.click(screen.getByLabelText('Decrease octave'));
      expect(mockOctaveChange).toHaveBeenCalledWith(4);
    });
  });

  describe('Range Limits', () => {
    test('should disable down button at minimum octave (C3)', () => {
      render(<OctaveSelector octave={3} minOctave={3} onOctaveChange={mockOctaveChange} />);
      expect(screen.getByLabelText('Decrease octave')).toBeDisabled();
    });

    test('should disable up button at maximum octave (C7)', () => {
      render(<OctaveSelector octave={7} maxOctave={7} onOctaveChange={mockOctaveChange} />);
      expect(screen.getByLabelText('Increase octave')).toBeDisabled();
    });

    test('should enable both buttons in middle range', () => {
      render(<OctaveSelector octave={5} onOctaveChange={mockOctaveChange} />);
      expect(screen.getByLabelText('Increase octave')).not.toBeDisabled();
      expect(screen.getByLabelText('Decrease octave')).not.toBeDisabled();
    });
  });
});

describe('VolumeControl - Iteration 1: Happy Path Tests', () => {
  const mockVolumeChange = jest.fn();
  const mockMuteToggle = jest.fn();

  beforeEach(() => {
    mockVolumeChange.mockClear();
    mockMuteToggle.mockClear();
  });

  describe('Rendering', () => {
    test('should render volume control', () => {
      render(<VolumeControl onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('volume-control')).toBeInTheDocument();
    });

    test('should display volume slider', () => {
      render(<VolumeControl onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('volume-slider')).toBeInTheDocument();
    });

    test('should display mute button', () => {
      render(<VolumeControl onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('mute-button')).toBeInTheDocument();
    });

    test('should display volume percentage (default 50%)', () => {
      render(<VolumeControl volume={0.5} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('volume-display')).toHaveTextContent('50%');
    });
  });

  describe('Volume Adjustment', () => {
    test('should call onVolumeChange when slider is moved', () => {
      render(<VolumeControl volume={0.5} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      const slider = screen.getByTestId('volume-slider');
      fireEvent.change(slider, { target: { value: '70' } });
      expect(mockVolumeChange).toHaveBeenCalledWith(0.7);
    });

    test('should set volume to 100%', () => {
      render(<VolumeControl volume={0.5} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      const slider = screen.getByTestId('volume-slider');
      fireEvent.change(slider, { target: { value: '100' } });
      expect(mockVolumeChange).toHaveBeenCalledWith(1.0);
    });

    test('should set volume to 0%', () => {
      render(<VolumeControl volume={0.5} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      const slider = screen.getByTestId('volume-slider');
      fireEvent.change(slider, { target: { value: '0' } });
      expect(mockVolumeChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Mute Functionality', () => {
    test('should call onMuteToggle when mute button is clicked', () => {
      render(<VolumeControl onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      fireEvent.click(screen.getByTestId('mute-button'));
      expect(mockMuteToggle).toHaveBeenCalledTimes(1);
    });

    test('should show mute icon when not muted', () => {
      render(<VolumeControl isMuted={false} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('mute-button')).toHaveTextContent('🔊');
    });

    test('should show unmute icon when muted', () => {
      render(<VolumeControl isMuted={true} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('mute-button')).toHaveTextContent('🔇');
    });

    test('should disable slider when muted', () => {
      render(<VolumeControl isMuted={true} onVolumeChange={mockVolumeChange} onMuteToggle={mockMuteToggle} />);
      expect(screen.getByTestId('volume-slider')).toBeDisabled();
    });
  });
});

describe('ThemeSelector - Iteration 1: Happy Path Tests', () => {
  const mockThemeChange = jest.fn();

  beforeEach(() => {
    mockThemeChange.mockClear();
  });

  describe('Rendering', () => {
    test('should render theme selector', () => {
      render(<ThemeSelector onThemeChange={mockThemeChange} />);
      expect(screen.getByTestId('theme-selector')).toBeInTheDocument();
    });

    test('should have label "Theme:"', () => {
      render(<ThemeSelector onThemeChange={mockThemeChange} />);
      expect(screen.getByText('Theme:')).toBeInTheDocument();
    });

    test('should display classic theme by default', () => {
      render(<ThemeSelector theme="classic" onThemeChange={mockThemeChange} />);
      expect(screen.getByTestId('theme-select')).toHaveValue('classic');
    });
  });

  describe('Theme Options', () => {
    test('should have classic theme option', () => {
      render(<ThemeSelector onThemeChange={mockThemeChange} />);
      expect(screen.getByText('Classic')).toBeInTheDocument();
    });

    test('should have modern theme option', () => {
      render(<ThemeSelector onThemeChange={mockThemeChange} />);
      expect(screen.getByText('Modern')).toBeInTheDocument();
    });

    test('should have neon theme option', () => {
      render(<ThemeSelector onThemeChange={mockThemeChange} />);
      expect(screen.getByText('Neon')).toBeInTheDocument();
    });
  });

  describe('Theme Switching', () => {
    test('should call onThemeChange when theme is selected', () => {
      render(<ThemeSelector theme="classic" onThemeChange={mockThemeChange} />);
      fireEvent.change(screen.getByTestId('theme-select'), { target: { value: 'modern' } });
      expect(mockThemeChange).toHaveBeenCalledWith('modern');
    });

    test('should switch to neon theme', () => {
      render(<ThemeSelector theme="classic" onThemeChange={mockThemeChange} />);
      fireEvent.change(screen.getByTestId('theme-select'), { target: { value: 'neon' } });
      expect(mockThemeChange).toHaveBeenCalledWith('neon');
    });
  });
});

describe('NoteLabelToggle - Iteration 1: Happy Path Tests', () => {
  const mockLabelModeChange = jest.fn();

  beforeEach(() => {
    mockLabelModeChange.mockClear();
  });

  describe('Rendering', () => {
    test('should render note label toggle', () => {
      render(<NoteLabelToggle onLabelModeChange={mockLabelModeChange} />);
      expect(screen.getByTestId('note-label-toggle')).toBeInTheDocument();
    });

    test('should have label "Note Labels:"', () => {
      render(<NoteLabelToggle onLabelModeChange={mockLabelModeChange} />);
      expect(screen.getByText('Note Labels:')).toBeInTheDocument();
    });

    test('should display english mode by default', () => {
      render(<NoteLabelToggle labelMode="english" onLabelModeChange={mockLabelModeChange} />);
      expect(screen.getByTestId('label-mode-select')).toHaveValue('english');
    });
  });

  describe('Label Mode Options', () => {
    test('should have English option', () => {
      render(<NoteLabelToggle onLabelModeChange={mockLabelModeChange} />);
      expect(screen.getByText('English (C・D・E)')).toBeInTheDocument();
    });

    test('should have Japanese option', () => {
      render(<NoteLabelToggle onLabelModeChange={mockLabelModeChange} />);
      expect(screen.getByText('Japanese (ド・レ・ミ)')).toBeInTheDocument();
    });

    test('should have Hide Labels option', () => {
      render(<NoteLabelToggle onLabelModeChange={mockLabelModeChange} />);
      expect(screen.getByText('Hide Labels')).toBeInTheDocument();
    });
  });

  describe('Label Mode Switching', () => {
    test('should call onLabelModeChange when mode is selected', () => {
      render(<NoteLabelToggle labelMode="english" onLabelModeChange={mockLabelModeChange} />);
      fireEvent.change(screen.getByTestId('label-mode-select'), { target: { value: 'japanese' } });
      expect(mockLabelModeChange).toHaveBeenCalledWith('japanese');
    });

    test('should switch to hide labels mode', () => {
      render(<NoteLabelToggle labelMode="english" onLabelModeChange={mockLabelModeChange} />);
      fireEvent.change(screen.getByTestId('label-mode-select'), { target: { value: 'none' } });
      expect(mockLabelModeChange).toHaveBeenCalledWith('none');
    });
  });
});
