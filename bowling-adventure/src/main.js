/**
 * Bowling Adventure - Main Entry Point
 * Simple integrated architecture for obstacle course bowling game
 */

import { BowlingGame } from './BowlingGame.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the game
  const game = new BowlingGame();

  // Store game instance globally for debugging
  window.game = game;

  // Handle visibility change to pause/resume
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      game.pause();
    } else {
      game.resume();
    }
  });

  // Log startup info
  console.log('Bowling Adventure - Simple Integrated Architecture');
  console.log('Version: 1.0.0');
});
