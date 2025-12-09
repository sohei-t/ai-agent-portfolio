/**
 * Unit Tests for ScoreSystem.js
 * Tests score calculation and combo system
 * ITERATION 1: Basic scoring and combo mechanics
 */

const ScoreSystem = require('../../src/systems/ScoreSystem.js');

describe('ScoreSystem', () => {
  let scoreSystem;

  beforeEach(() => {
    scoreSystem = new ScoreSystem();
  });

  describe('Basic Scoring', () => {
    test('should start with score 0', () => {
      expect(scoreSystem.score).toBe(0);
    });

    test('should add points correctly', () => {
      scoreSystem.addScore(100);

      expect(scoreSystem.score).toBe(100);
    });

    test('should accumulate score', () => {
      scoreSystem.addScore(100);
      scoreSystem.addScore(200);
      scoreSystem.addScore(50);

      expect(scoreSystem.score).toBe(350);
    });

    test('should handle zero points', () => {
      scoreSystem.addScore(0);

      expect(scoreSystem.score).toBe(0);
    });

    test('should handle large point values', () => {
      scoreSystem.addScore(999999);

      expect(scoreSystem.score).toBe(999999);
    });
  });

  describe('Combo System', () => {
    test('should start with no combo', () => {
      expect(scoreSystem.consecutiveHits).toBe(0);
    });

    test('should increment combo on hit', () => {
      const now = Date.now();
      scoreSystem.addHit(100, now);

      expect(scoreSystem.consecutiveHits).toBe(1);
    });

    test('should build combo with consecutive hits', () => {
      const now = Date.now();

      for (let i = 0; i < 5; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      expect(scoreSystem.consecutiveHits).toBe(5);
    });

    test('should apply 2x multiplier at 5 hits', () => {
      const now = Date.now();

      // Build up to 4 hits
      for (let i = 0; i < 4; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      // 5th hit should get 2x
      const points = scoreSystem.addHit(100, now + 400);

      expect(points).toBe(200); // 100 * 2
    });

    test('should apply 3x multiplier at 10 hits', () => {
      const now = Date.now();

      // Build up to 9 hits
      for (let i = 0; i < 9; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      // 10th hit should get 3x
      const points = scoreSystem.addHit(100, now + 900);

      expect(points).toBe(300); // 100 * 3
    });

    test('should maintain 3x multiplier after 10 hits', () => {
      const now = Date.now();

      // Build up to 15 hits
      for (let i = 0; i < 15; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      const multiplier = scoreSystem.getComboMultiplier();

      expect(multiplier).toBe(3);
    });

    test('should reset combo after delay', () => {
      const now = Date.now();

      scoreSystem.addHit(100, now);
      scoreSystem.update(now + 2001); // After 2 second delay

      expect(scoreSystem.consecutiveHits).toBe(0);
    });

    test('should not reset combo before delay', () => {
      const now = Date.now();

      scoreSystem.addHit(100, now);
      scoreSystem.update(now + 1000); // Only 1 second

      expect(scoreSystem.consecutiveHits).toBe(1);
    });

    test('should preserve combo with rapid hits', () => {
      const now = Date.now();

      scoreSystem.addHit(100, now);
      scoreSystem.addHit(100, now + 100);
      scoreSystem.update(now + 200);

      expect(scoreSystem.consecutiveHits).toBe(2);
    });
  });

  describe('Score Calculation with Combos', () => {
    test('should calculate correct total score with combo', () => {
      const now = Date.now();

      // First 4 hits: 100 points each (no multiplier)
      for (let i = 0; i < 4; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      // Next 5 hits: 100 points each (2x multiplier)
      for (let i = 4; i < 9; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      // Next hit: 100 points (3x multiplier)
      scoreSystem.addHit(100, now + 900);

      // Total: 4*100 + 5*200 + 1*300 = 400 + 1000 + 300 = 1700
      expect(scoreSystem.score).toBe(1700);
    });

    test('should calculate score with different point values', () => {
      const now = Date.now();

      // Enemy type 1: 100 points
      for (let i = 0; i < 5; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      // Enemy type 2: 150 points (with 2x)
      scoreSystem.addHit(150, now + 500);

      // Enemy type 3: 200 points (with 2x)
      scoreSystem.addHit(200, now + 600);

      // Total: 4*100 + 1*200 + 1*300 + 1*400 = 400 + 200 + 300 + 400 = 1300
      expect(scoreSystem.score).toBe(1300);
    });

    test('should handle combo reset and rebuild', () => {
      const now = Date.now();

      // First combo
      for (let i = 0; i < 5; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      const scoreAfterFirstCombo = scoreSystem.score;

      // Reset
      scoreSystem.update(now + 3000);

      // Second combo
      for (let i = 0; i < 5; i++) {
        scoreSystem.addHit(100, now + 3000 + i * 100);
      }

      // Total: (4*100 + 1*200) + (4*100 + 1*200) = 600 + 600 = 1200
      expect(scoreSystem.score).toBe(1200);
    });
  });

  describe('Enemy Type Points', () => {
    test('should award 100 points for type 0 enemy', () => {
      scoreSystem.addScore(100);

      expect(scoreSystem.score).toBe(100);
    });

    test('should award 150 points for type 1 enemy', () => {
      scoreSystem.addScore(150);

      expect(scoreSystem.score).toBe(150);
    });

    test('should award 200 points for type 2 enemy', () => {
      scoreSystem.addScore(200);

      expect(scoreSystem.score).toBe(200);
    });

    test('should calculate correct score for mixed enemy types', () => {
      scoreSystem.addScore(100); // Type 0
      scoreSystem.addScore(150); // Type 1
      scoreSystem.addScore(200); // Type 2

      expect(scoreSystem.score).toBe(450);
    });
  });

  describe('Reset Functionality', () => {
    test('should reset score to 0', () => {
      scoreSystem.score = 1000;
      scoreSystem.reset();

      expect(scoreSystem.score).toBe(0);
    });

    test('should reset combo', () => {
      scoreSystem.consecutiveHits = 10;
      scoreSystem.reset();

      expect(scoreSystem.consecutiveHits).toBe(0);
    });

    test('should reset all state', () => {
      const now = Date.now();

      scoreSystem.addHit(100, now);
      scoreSystem.addHit(100, now + 100);
      scoreSystem.reset();

      expect(scoreSystem.score).toBe(0);
      expect(scoreSystem.consecutiveHits).toBe(0);
      expect(scoreSystem.lastHitTime).toBe(0);
    });
  });

  describe('Getter Methods', () => {
    test('should get current score', () => {
      scoreSystem.score = 500;

      expect(scoreSystem.getScore()).toBe(500);
    });

    test('should get current combo count', () => {
      scoreSystem.consecutiveHits = 7;

      expect(scoreSystem.getCombo()).toBe(7);
    });

    test('should get correct multiplier for current combo', () => {
      scoreSystem.consecutiveHits = 0;
      expect(scoreSystem.getComboMultiplier()).toBe(1);

      scoreSystem.consecutiveHits = 5;
      expect(scoreSystem.getComboMultiplier()).toBe(2);

      scoreSystem.consecutiveHits = 10;
      expect(scoreSystem.getComboMultiplier()).toBe(3);
    });
  });

  describe('Edge Cases', () => {
    test('should handle rapid score additions', () => {
      for (let i = 0; i < 1000; i++) {
        scoreSystem.addScore(10);
      }

      expect(scoreSystem.score).toBe(10000);
    });

    test('should handle very high combo count', () => {
      const now = Date.now();

      for (let i = 0; i < 100; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      expect(scoreSystem.consecutiveHits).toBe(100);
      expect(scoreSystem.getComboMultiplier()).toBe(3);
    });

    test('should handle combo at exact threshold', () => {
      const now = Date.now();

      // Exactly 5 hits
      for (let i = 0; i < 5; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      expect(scoreSystem.getComboMultiplier()).toBe(2);

      // Exactly 10 hits
      for (let i = 5; i < 10; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      expect(scoreSystem.getComboMultiplier()).toBe(3);
    });

    test('should handle combo at exact reset time', () => {
      const now = Date.now();

      scoreSystem.addHit(100, now);
      scoreSystem.update(now + 2000); // Exactly at delay

      expect(scoreSystem.consecutiveHits).toBe(1);

      scoreSystem.update(now + 2001); // Just over

      expect(scoreSystem.consecutiveHits).toBe(0);
    });

    test('should handle manual combo reset', () => {
      const now = Date.now();

      for (let i = 0; i < 7; i++) {
        scoreSystem.addHit(100, now + i * 100);
      }

      scoreSystem.resetCombo();

      expect(scoreSystem.consecutiveHits).toBe(0);
      expect(scoreSystem.combo).toBe(0);
    });

    test('should handle score overflow safely', () => {
      scoreSystem.score = Number.MAX_SAFE_INTEGER - 100;
      scoreSystem.addScore(50);

      expect(scoreSystem.score).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('Performance', () => {
    test('should handle many score updates efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 10000; i++) {
        scoreSystem.addScore(10);
      }

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50); // Should take less than 50ms
    });

    test('should handle many combo updates efficiently', () => {
      const now = Date.now();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        scoreSystem.addHit(100, now + i);
        scoreSystem.update(now + i);
      }

      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50); // Should take less than 50ms
    });
  });
});
