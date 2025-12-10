/**
 * Jest Test Setup
 * Global test configuration and mocks
 */

import '@testing-library/jest-dom';

// Mock Web Audio API for testing
class MockAudioContext {
  constructor() {
    this.destination = {};
    this.currentTime = 0;
    this.state = 'running';
    this.sampleRate = 44100;
  }

  createOscillator() {
    return {
      type: 'sine',
      frequency: { value: 440 },
      connect: jest.fn(),
      disconnect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      onended: null,
    };
  }

  createGain() {
    return {
      gain: {
        value: 1,
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn(),
        cancelScheduledValues: jest.fn(),
      },
      connect: jest.fn(),
      disconnect: jest.fn(),
    };
  }

  async resume() {
    this.state = 'running';
    return Promise.resolve();
  }

  async close() {
    this.state = 'closed';
    return Promise.resolve();
  }
}

// Set up Web Audio API mocks
global.AudioContext = MockAudioContext;
global.webkitAudioContext = MockAudioContext;
window.AudioContext = MockAudioContext;
window.webkitAudioContext = MockAudioContext;

// Suppress console errors in tests (optional)
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
