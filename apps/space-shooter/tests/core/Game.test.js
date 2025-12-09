/**
 * Unit Tests for Game.js
 * Tests main game loop, state management, and game logic
 */

const Game = require('../../src/core/Game.js');
const { GAME_STATES } = require('../../src/core/Game.js');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  describe('Initialization', () => {
    test('should start in MENU state', () => {
      game.init();
      expect(game.state).toBe(GAME_STATES.MENU);
    });

    test('should not be running initially', () => {
      game.init();
      expect(game.isRunning).toBe(false);
    });

    test('should start at wave 1', () => {
      game.init();
      expect(game.wave).toBe(1);
    });

    test('should start with score 0', () => {
      game.init();
      expect(game.score).toBe(0);
    });
  });

  describe('State Transitions', () => {
    test('should transition from MENU to PLAYING on start', () => {
      game.init();
      game.start();

      expect(game.state).toBe(GAME_STATES.PLAYING);
      expect(game.isRunning).toBe(true);
    });

    test('should transition from PLAYING to PAUSED', () => {
      game.start();
      game.pause();

      expect(game.state).toBe(GAME_STATES.PAUSED);
    });

    test('should transition from PAUSED back to PLAYING', () => {
      game.start();
      game.pause();
      expect(game.state).toBe(GAME_STATES.PAUSED);

      game.pause();
      expect(game.state).toBe(GAME_STATES.PLAYING);
    });

    test('should transition to GAME_OVER', () => {
      game.start();
      game.gameOver();

      expect(game.state).toBe(GAME_STATES.GAME_OVER);
      expect(game.isRunning).toBe(false);
    });

    test('should transition to VICTORY', () => {
      game.start();
      game.victory();

      expect(game.state).toBe(GAME_STATES.VICTORY);
      expect(game.isRunning).toBe(false);
    });

    test('should reject invalid state transitions', () => {
      game.init();
      const originalState = game.state;

      game.setState('INVALID_STATE');

      expect(game.state).toBe(originalState);
    });
  });

  describe('Game Loop', () => {
    test('should use fixed timestep of 16.67ms (60 FPS)', () => {
      expect(game.fixedTimeStep).toBeCloseTo(16.67, 2);
    });

    test('should only update when PLAYING', () => {
      game.state = GAME_STATES.MENU;
      game.update(16.67);
      expect(game.accumulator).toBe(0);

      game.state = GAME_STATES.PLAYING;
      game.update(16.67);
      expect(game.accumulator).toBeGreaterThanOrEqual(0);
    });

    test('should accumulate delta time', () => {
      game.state = GAME_STATES.PLAYING;
      game.accumulator = 0;

      game.update(10);
      expect(game.accumulator).toBe(10);

      game.update(20);
      expect(game.accumulator).toBeGreaterThanOrEqual(10);
    });

    test('should handle variable frame rates', () => {
      game.state = GAME_STATES.PLAYING;

      // Fast frame
      game.update(8);
      expect(game.accumulator).toBeLessThan(game.fixedTimeStep);

      // Slow frame
      game.update(33);
      expect(game.accumulator).toBeGreaterThanOrEqual(0);
    });

    test('should not update when paused', () => {
      game.state = GAME_STATES.PAUSED;
      const accumulator = game.accumulator;

      game.update(16.67);

      expect(game.accumulator).toBe(accumulator);
    });
  });

  describe('Score System', () => {
    test('should add score correctly', () => {
      game.score = 0;
      game.addScore(100);

      expect(game.score).toBe(100);
    });

    test('should accumulate score', () => {
      game.score = 0;
      game.addScore(100);
      game.addScore(50);
      game.addScore(200);

      expect(game.score).toBe(350);
    });

    test('should reset score on restart', () => {
      game.score = 1000;
      game.restart();

      expect(game.score).toBe(0);
    });
  });

  describe('Wave Progression', () => {
    test('should advance to next wave', () => {
      game.wave = 1;
      game.nextWave();

      expect(game.wave).toBe(2);
    });

    test('should handle multiple waves', () => {
      game.wave = 1;

      for (let i = 0; i < 5; i++) {
        game.nextWave();
      }

      expect(game.wave).toBe(6);
    });

    test('should reset wave on restart', () => {
      game.wave = 5;
      game.restart();

      expect(game.wave).toBe(1);
    });
  });

  describe('Restart Functionality', () => {
    test('should reset score and wave', () => {
      game.score = 1000;
      game.wave = 5;

      game.restart();

      expect(game.score).toBe(0);
      expect(game.wave).toBe(1);
      expect(game.state).toBe(GAME_STATES.PLAYING);
    });

    test('should start game after restart', () => {
      game.state = GAME_STATES.GAME_OVER;
      game.restart();

      expect(game.state).toBe(GAME_STATES.PLAYING);
      expect(game.isRunning).toBe(true);
    });
  });

  describe('State Queries', () => {
    test('should correctly identify current state', () => {
      game.state = GAME_STATES.PLAYING;
      expect(game.isState(GAME_STATES.PLAYING)).toBe(true);
      expect(game.isState(GAME_STATES.PAUSED)).toBe(false);
    });

    test('should work for all states', () => {
      Object.values(GAME_STATES).forEach(state => {
        game.state = state;
        expect(game.isState(state)).toBe(true);
      });
    });
  });

  describe('Performance', () => {
    test('should handle rapid state changes', () => {
      game.start(); // Start in PLAYING state
      // 100 toggles from PLAYING: ends back in PLAYING (even number)
      // Test expects PAUSED, so we need 99 toggles (odd number) to end in opposite state
      for (let i = 0; i < 99; i++) {
        game.pause();
      }
      // Should end in opposite of starting state
      expect(game.state).toBe(GAME_STATES.PAUSED);
    });

    test('should handle rapid score additions', () => {
      game.score = 0;
      for (let i = 0; i < 1000; i++) {
        game.addScore(10);
      }

      expect(game.score).toBe(10000);
    });
  });
});
