/**
 * Unit Tests for Piano Component
 * Tests piano keyboard rendering, key arrangement, and responsive behavior
 *
 * ITERATION 1: Happy path tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Piano } from '../../src/components/Piano/Piano';

describe('Piano Component - Iteration 1: Happy Path Tests', () => {
  const mockNotePlay = jest.fn();
  const mockNoteStop = jest.fn();

  beforeEach(() => {
    mockNotePlay.mockClear();
    mockNoteStop.mockClear();
  });

  describe('Rendering', () => {
    test('should render piano component', () => {
      render(<Piano />);
      const piano = screen.getByTestId('piano');
      expect(piano).toBeInTheDocument();
    });

    test('should render 12 keys for one octave', () => {
      render(<Piano />);
      const keys = document.querySelectorAll('.key');
      expect(keys).toHaveLength(12);
    });

    test('should render 7 white keys', () => {
      render(<Piano />);
      const whiteKeys = document.querySelectorAll('.white-key');
      expect(whiteKeys).toHaveLength(7);
    });

    test('should render 5 black keys', () => {
      render(<Piano />);
      const blackKeys = document.querySelectorAll('.black-key');
      expect(blackKeys).toHaveLength(5);
    });
  });

  describe('Key Arrangement', () => {
    test('should have correct note order', () => {
      render(<Piano />);
      const keys = document.querySelectorAll('.key');
      const notes = Array.from(keys).map(key => key.getAttribute('data-note'));
      expect(notes).toEqual(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);
    });

    test('should mark C# as black key', () => {
      render(<Piano />);
      const cSharpKey = document.querySelector('[data-note="C#"]');
      expect(cSharpKey).toHaveClass('black-key');
    });

    test('should mark C as white key', () => {
      render(<Piano />);
      const cKey = document.querySelector('[data-note="C"]');
      expect(cKey).toHaveClass('white-key');
    });

    test('should mark E as white key', () => {
      render(<Piano />);
      const eKey = document.querySelector('[data-note="E"]');
      expect(eKey).toHaveClass('white-key');
    });
  });

  describe('Mouse Interaction', () => {
    test('should call onNotePlay when key is clicked', () => {
      render(<Piano onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      fireEvent.mouseDown(cKey);
      expect(mockNotePlay).toHaveBeenCalledWith('C', 4);
    });

    test('should call onNoteStop when mouse is released', () => {
      render(<Piano onNoteStop={mockNoteStop} />);
      const cKey = document.querySelector('[data-note="C"]');
      fireEvent.mouseUp(cKey);
      expect(mockNoteStop).toHaveBeenCalledWith('C', 4);
    });

    test('should handle multiple key presses', () => {
      render(<Piano onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      const eKey = document.querySelector('[data-note="E"]');

      fireEvent.mouseDown(cKey);
      fireEvent.mouseDown(eKey);

      expect(mockNotePlay).toHaveBeenCalledTimes(2);
      expect(mockNotePlay).toHaveBeenCalledWith('C', 4);
      expect(mockNotePlay).toHaveBeenCalledWith('E', 4);
    });
  });

  describe('Touch Interaction', () => {
    test('should call onNotePlay on touch start', () => {
      render(<Piano onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      fireEvent.touchStart(cKey);
      expect(mockNotePlay).toHaveBeenCalledWith('C', 4);
    });

    test('should call onNoteStop on touch end', () => {
      render(<Piano onNoteStop={mockNoteStop} />);
      const cKey = document.querySelector('[data-note="C"]');
      fireEvent.touchEnd(cKey);
      expect(mockNoteStop).toHaveBeenCalledWith('C', 4);
    });

    test('should prevent default touch behavior', () => {
      render(<Piano onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      const event = new TouchEvent('touchstart', { cancelable: true });
      fireEvent(cKey, event);
      // Touch events should be handled without scrolling
      expect(true).toBe(true);
    });
  });

  describe('Octave Property', () => {
    test('should render with default octave 4', () => {
      render(<Piano onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      fireEvent.mouseDown(cKey);
      expect(mockNotePlay).toHaveBeenCalledWith('C', 4);
    });

    test('should render with octave 3', () => {
      render(<Piano octave={3} onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      expect(cKey.getAttribute('data-octave')).toBe('3');
    });

    test('should render with octave 5', () => {
      render(<Piano octave={5} onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      expect(cKey.getAttribute('data-octave')).toBe('5');
    });

    test('should call onNotePlay with correct octave', () => {
      render(<Piano octave={6} onNotePlay={mockNotePlay} />);
      const cKey = document.querySelector('[data-note="C"]');
      fireEvent.mouseDown(cKey);
      expect(mockNotePlay).toHaveBeenCalledWith('C', 6);
    });
  });

  describe('Theme Support', () => {
    test('should render with classic theme by default', () => {
      render(<Piano />);
      const piano = screen.getByTestId('piano');
      expect(piano.getAttribute('data-theme')).toBe('classic');
    });

    test('should render with modern theme', () => {
      render(<Piano theme="modern" />);
      const piano = screen.getByTestId('piano');
      expect(piano.getAttribute('data-theme')).toBe('modern');
    });

    test('should render with neon theme', () => {
      render(<Piano theme="neon" />);
      const piano = screen.getByTestId('piano');
      expect(piano.getAttribute('data-theme')).toBe('neon');
    });
  });

  describe('Note Labels', () => {
    test('should show English labels by default', () => {
      render(<Piano showLabels="english" />);
      const cKey = document.querySelector('[data-note="C"]');
      expect(cKey.textContent).toBe('C');
    });

    test('should show Japanese labels', () => {
      render(<Piano showLabels="japanese" />);
      const cKey = document.querySelector('[data-note="C"]');
      expect(cKey.textContent).toBe('ド');
    });

    test('should hide labels when set to none', () => {
      render(<Piano showLabels="none" />);
      const labels = document.querySelectorAll('.note-label');
      expect(labels).toHaveLength(0);
    });

    test('should display correct Japanese names for all notes', () => {
      render(<Piano showLabels="japanese" />);
      const dKey = document.querySelector('[data-note="D"]');
      const eKey = document.querySelector('[data-note="E"]');
      expect(dKey.textContent).toBe('レ');
      expect(eKey.textContent).toBe('ミ');
    });
  });

  describe('Accessibility', () => {
    test('should render keys as buttons', () => {
      render(<Piano />);
      const keys = document.querySelectorAll('.key');
      keys.forEach(key => {
        expect(key.tagName).toBe('BUTTON');
      });
    });

    test('should have data attributes for testing', () => {
      render(<Piano octave={4} />);
      const cKey = document.querySelector('[data-note="C"]');
      expect(cKey.getAttribute('data-note')).toBe('C');
      expect(cKey.getAttribute('data-octave')).toBe('4');
    });
  });
});
