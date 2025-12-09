/**
 * Unit Tests for GameOver.js
 * Tests game over/victory screen rendering, input handling, and high score management
 */

const GameOver = require('../../src/ui/GameOver.js');

describe('GameOver', () => {
  let gameOver, mockCanvas, mockCtx;

  beforeEach(() => {
    // Create mock canvas and context
    mockCanvas = document.createElement('canvas');
    mockCanvas.width = 800;
    mockCanvas.height = 600;
    mockCtx = mockCanvas.getContext('2d');

    // Mock Date.now for consistent testing
    jest.spyOn(Date, 'now').mockReturnValue(1000000);

    gameOver = new GameOver(mockCanvas, mockCtx);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Initialization', () => {
    test('should initialize with correct default values', () => {
      expect(gameOver.canvas).toBe(mockCanvas);
      expect(gameOver.ctx).toBe(mockCtx);
      expect(gameOver.isVictory).toBe(false);
      expect(gameOver.score).toBe(0);
      expect(gameOver.wave).toBe(1);
      expect(gameOver.selectedOption).toBe(0);
      expect(gameOver.options).toEqual(['RESTART', 'MAIN MENU']);
      expect(gameOver.animationFrame).toBe(0);
      expect(gameOver.highScoreAchieved).toBe(false);
    });

    test('should have cyberpunk color scheme', () => {
      expect(gameOver.colors.primary).toBeDefined();
      expect(gameOver.colors.secondary).toBeDefined();
      expect(gameOver.colors.accent).toBeDefined();
      expect(gameOver.colors.background).toBeDefined();
      expect(gameOver.colors.success).toBe('#00ff00');
      expect(gameOver.colors.failure).toBe('#ff0000');
    });

    test('should initialize particles array', () => {
      expect(gameOver.particles).toBeDefined();
      expect(Array.isArray(gameOver.particles)).toBe(true);
      expect(gameOver.particles.length).toBe(50);
    });

    test('should initialize particles with valid properties', () => {
      const particle = gameOver.particles[0];
      expect(particle.x).toBeGreaterThanOrEqual(0);
      expect(particle.x).toBeLessThanOrEqual(800);
      expect(particle.y).toBeGreaterThanOrEqual(0);
      expect(particle.y).toBeLessThanOrEqual(600);
      expect(particle.vx).toBeDefined();
      expect(particle.vy).toBeDefined();
      expect(particle.size).toBeGreaterThan(0);
      expect(particle.opacity).toBeGreaterThan(0);
    });
  });

  describe('setGameOver Method', () => {
    test('should set defeat state correctly', () => {
      gameOver.setGameOver(false, 5000, 3);
      expect(gameOver.isVictory).toBe(false);
      expect(gameOver.score).toBe(5000);
      expect(gameOver.wave).toBe(3);
      expect(gameOver.selectedOption).toBe(0);
      expect(gameOver.animationFrame).toBe(0);
    });

    test('should set victory state correctly', () => {
      gameOver.setGameOver(true, 10000, 10);
      expect(gameOver.isVictory).toBe(true);
      expect(gameOver.score).toBe(10000);
      expect(gameOver.wave).toBe(10);
    });

    test('should check for high score achievement', () => {
      global.localStorage.getItem.mockReturnValue(JSON.stringify([5000, 3000, 1000]));
      gameOver.setGameOver(false, 8000, 5);
      expect(gameOver.highScoreAchieved).toBe(true);
    });

    test('should save high score when achieved', () => {
      global.localStorage.getItem.mockReturnValue(null);
      gameOver.setGameOver(false, 5000, 3);
      expect(global.localStorage.setItem).toHaveBeenCalled();
    });

    test('should reset particles on setGameOver', () => {
      const originalParticles = gameOver.particles;
      gameOver.setGameOver(false, 1000, 1);
      expect(gameOver.particles).not.toBe(originalParticles);
      expect(gameOver.particles.length).toBe(50);
    });
  });

  describe('Keyboard Input Handling', () => {
    test('should move selection up on ArrowUp', () => {
      gameOver.selectedOption = 1;
      gameOver.handleInput('ArrowUp');
      expect(gameOver.selectedOption).toBe(0);
    });

    test('should move selection up on w key', () => {
      gameOver.selectedOption = 1;
      gameOver.handleInput('w');
      expect(gameOver.selectedOption).toBe(0);
    });

    test('should move selection down on ArrowDown', () => {
      gameOver.selectedOption = 0;
      gameOver.handleInput('ArrowDown');
      expect(gameOver.selectedOption).toBe(1);
    });

    test('should move selection down on s key', () => {
      gameOver.selectedOption = 0;
      gameOver.handleInput('s');
      expect(gameOver.selectedOption).toBe(1);
    });

    test('should wrap selection from top to bottom', () => {
      gameOver.selectedOption = 0;
      gameOver.handleInput('ArrowUp');
      expect(gameOver.selectedOption).toBe(1);
    });

    test('should wrap selection from bottom to top', () => {
      gameOver.selectedOption = 1;
      gameOver.handleInput('ArrowDown');
      expect(gameOver.selectedOption).toBe(0);
    });

    test('should return RESTART on Enter when first option selected', () => {
      gameOver.selectedOption = 0;
      const result = gameOver.handleInput('Enter');
      expect(result).toBe('RESTART');
    });

    test('should return RESTART on Space when first option selected', () => {
      gameOver.selectedOption = 0;
      const result = gameOver.handleInput(' ');
      expect(result).toBe('RESTART');
    });

    test('should return MENU on Enter when second option selected', () => {
      gameOver.selectedOption = 1;
      const result = gameOver.handleInput('Enter');
      expect(result).toBe('MENU');
    });

    test('should return MENU on Space when second option selected', () => {
      gameOver.selectedOption = 1;
      const result = gameOver.handleInput(' ');
      expect(result).toBe('MENU');
    });

    test('should return null for invalid keys', () => {
      const result = gameOver.handleInput('Escape');
      expect(result).toBeNull();
    });
  });

  describe('Touch Input Handling', () => {
    test('should return RESTART when touching first option', () => {
      const centerX = mockCanvas.width / 2;
      const y = mockCanvas.height / 2 + 150;
      const result = gameOver.handleTouch(centerX, y);
      expect(result).toBe('RESTART');
    });

    test('should return MENU when touching second option', () => {
      const centerX = mockCanvas.width / 2;
      const y = mockCanvas.height / 2 + 150 + 70;
      const result = gameOver.handleTouch(centerX, y);
      expect(result).toBe('MENU');
    });

    test('should return null when touching outside menu items', () => {
      const result = gameOver.handleTouch(0, 0);
      expect(result).toBeNull();
    });

    test('should work with different canvas positions', () => {
      const centerX = mockCanvas.width / 2;
      const firstItemY = mockCanvas.height / 2 + 150;
      const result = gameOver.handleTouch(centerX, firstItemY + 20);
      expect(result).toBe('RESTART');
    });
  });

  describe('Update Method', () => {
    test('should update animation frame', () => {
      const initialFrame = gameOver.animationFrame;
      gameOver.update(16);
      expect(gameOver.animationFrame).toBe(initialFrame + 16);
    });

    test('should update particle positions', () => {
      const initialX = gameOver.particles[0].x;
      gameOver.update(16);
      expect(gameOver.particles[0].x).not.toBe(initialX);
    });

    test('should wrap particles around screen horizontally', () => {
      const particle = gameOver.particles[0];
      particle.x = -1;
      particle.vx = -0.5;
      gameOver.update(16);
      expect(particle.x).toBe(mockCanvas.width);
    });

    test('should wrap particles around screen when moving right', () => {
      const particle = gameOver.particles[0];
      particle.x = mockCanvas.width + 1;
      particle.vx = 0.5;
      gameOver.update(16);
      expect(particle.x).toBe(0);
    });

    test('should wrap particles vertically when moving up', () => {
      const particle = gameOver.particles[0];
      particle.y = -1;
      particle.vy = -0.5;
      gameOver.update(16);
      expect(particle.y).toBe(mockCanvas.height);
    });

    test('should wrap particles vertically when moving down', () => {
      const particle = gameOver.particles[0];
      particle.y = mockCanvas.height + 1;
      particle.vy = 0.5;
      gameOver.update(16);
      expect(particle.y).toBe(0);
    });
  });

  describe('Rendering - Defeat Screen', () => {
    beforeEach(() => {
      gameOver.setGameOver(false, 5000, 3);
    });

    test('should clear canvas with background color', () => {
      const fillRectSpy = jest.spyOn(mockCtx, 'fillRect');
      gameOver.render();
      expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 800, 600);
    });

    test('should render GAME OVER text', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('GAME OVER', expect.any(Number), expect.any(Number));
    });

    test('should render failure subtitle', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('// INVASION FAILED //', expect.any(Number), expect.any(Number));
    });

    test('should use failure color for game over text', () => {
      gameOver.render();
      expect(mockCtx.shadowColor).toBe(gameOver.colors.failure);
    });

    test('should render particles with failure color', () => {
      const arcSpy = jest.spyOn(mockCtx, 'arc');
      gameOver.render();
      expect(arcSpy).toHaveBeenCalled();
    });
  });

  describe('Rendering - Victory Screen', () => {
    beforeEach(() => {
      gameOver.setGameOver(true, 10000, 10);
    });

    test('should render VICTORY text', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('VICTORY!', expect.any(Number), expect.any(Number));
    });

    test('should render victory subtitle', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('// ALL WAVES CLEARED //', expect.any(Number), expect.any(Number));
    });

    test('should use success color for victory text', () => {
      gameOver.render();
      expect(mockCtx.shadowColor).toBe(gameOver.colors.success);
    });
  });

  describe('Rendering - Stats Display', () => {
    beforeEach(() => {
      gameOver.setGameOver(false, 12345, 7);
    });

    test('should render final score label', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('FINAL SCORE', expect.any(Number), expect.any(Number));
    });

    test('should render score with formatting', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('12,345', expect.any(Number), expect.any(Number));
    });

    test('should render wave reached text', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('Wave 7 Reached', expect.any(Number), expect.any(Number));
    });

    test('should render stats box outline', () => {
      const strokeRectSpy = jest.spyOn(mockCtx, 'strokeRect');
      gameOver.render();
      expect(strokeRectSpy).toHaveBeenCalled();
    });
  });

  describe('Rendering - High Score Achievement', () => {
    test('should render high score message when achieved', () => {
      global.localStorage.getItem.mockReturnValue(null);
      gameOver.setGameOver(false, 5000, 3);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('★ NEW HIGH SCORE! ★', expect.any(Number), expect.any(Number));
    });

    test('should not render high score message when not achieved', () => {
      global.localStorage.getItem.mockReturnValue(JSON.stringify([10000]));
      gameOver.setGameOver(false, 5000, 3);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).not.toHaveBeenCalledWith('★ NEW HIGH SCORE! ★', expect.any(Number), expect.any(Number));
    });

    test('should render high score message on victory screen', () => {
      global.localStorage.getItem.mockReturnValue(null);
      gameOver.setGameOver(true, 10000, 10);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('★ NEW HIGH SCORE! ★', expect.any(Number), expect.any(Number));
    });
  });

  describe('Rendering - Menu Options', () => {
    beforeEach(() => {
      gameOver.setGameOver(false, 1000, 1);
    });

    test('should render all menu options', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('RESTART', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('MAIN MENU', expect.any(Number), expect.any(Number));
    });

    test('should render selection brackets for selected option', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.selectedOption = 0;
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('>', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('<', expect.any(Number), expect.any(Number));
    });

    test('should render footer instruction', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith(
        'USE ARROW KEYS OR TAP TO SELECT',
        expect.any(Number),
        expect.any(Number)
      );
    });
  });

  describe('Rendering - Particles', () => {
    test('should render all particles', () => {
      const arcSpy = jest.spyOn(mockCtx, 'arc');
      gameOver.render();
      expect(arcSpy.mock.calls.length).toBeGreaterThanOrEqual(50);
    });

    test('should apply opacity to particles', () => {
      gameOver.render();
      expect(mockCtx.globalAlpha).toBeLessThan(1);
    });

    test('should use correct color for particles based on victory state', () => {
      const fillSpy = jest.spyOn(mockCtx, 'fill');
      gameOver.setGameOver(true, 1000, 1);
      gameOver.render();
      expect(fillSpy).toHaveBeenCalled();
    });
  });

  describe('High Score Management', () => {
    test('should check high score returns true when no scores exist', () => {
      global.localStorage.getItem.mockReturnValue(null);
      const isHighScore = gameOver.checkHighScore(1000);
      expect(isHighScore).toBe(true);
    });

    test('should check high score returns true when score is in top 10', () => {
      const existingScores = [5000, 3000, 1000];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));
      const isHighScore = gameOver.checkHighScore(4000);
      expect(isHighScore).toBe(true);
    });

    test('should check high score returns true when list has less than 10 scores', () => {
      const existingScores = [5000];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));
      const isHighScore = gameOver.checkHighScore(100);
      expect(isHighScore).toBe(true);
    });

    test('should check high score returns false when score is below top 10', () => {
      const existingScores = Array.from({ length: 10 }, (_, i) => (10 - i) * 1000);
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));
      const isHighScore = gameOver.checkHighScore(500);
      expect(isHighScore).toBe(false);
    });

    test('should save high score to localStorage', () => {
      global.localStorage.getItem.mockReturnValue(JSON.stringify([5000, 3000]));
      gameOver.saveHighScore(4000);

      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'spaceInvadersHighScores',
        JSON.stringify([5000, 4000, 3000])
      );
    });

    test('should save high score when localStorage is empty', () => {
      global.localStorage.getItem.mockReturnValue(null);
      gameOver.saveHighScore(1000);

      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'spaceInvadersHighScores',
        JSON.stringify([1000])
      );
    });

    test('should keep only top 10 scores', () => {
      const existingScores = Array.from({ length: 10 }, (_, i) => (10 - i) * 1000);
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));
      gameOver.saveHighScore(5500);

      const savedData = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
      expect(savedData.length).toBe(10);
      expect(savedData[0]).toBe(10000);
      expect(savedData[savedData.length - 1]).toBe(2000);
    });

    test('should sort scores in descending order', () => {
      global.localStorage.getItem.mockReturnValue(JSON.stringify([3000, 1000]));
      gameOver.saveHighScore(2000);

      const savedData = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
      expect(savedData).toEqual([3000, 2000, 1000]);
    });

    test('should handle localStorage errors in checkHighScore', () => {
      global.localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      const isHighScore = gameOver.checkHighScore(1000);
      expect(isHighScore).toBe(false);
    });

    test('should handle localStorage errors in saveHighScore', () => {
      global.localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      expect(() => gameOver.saveHighScore(1000)).not.toThrow();
    });
  });

  describe('Reset Method', () => {
    test('should reset all values to defaults', () => {
      gameOver.setGameOver(true, 10000, 10);
      gameOver.selectedOption = 1;

      gameOver.reset();

      expect(gameOver.isVictory).toBe(false);
      expect(gameOver.score).toBe(0);
      expect(gameOver.wave).toBe(1);
      expect(gameOver.selectedOption).toBe(0);
      expect(gameOver.animationFrame).toBe(0);
      expect(gameOver.highScoreAchieved).toBe(false);
    });

    test('should reinitialize particles on reset', () => {
      gameOver.reset();
      expect(gameOver.particles.length).toBe(50);
    });
  });

  describe('Canvas Context Methods', () => {
    test('should use save and restore', () => {
      const saveSpy = jest.spyOn(mockCtx, 'save');
      const restoreSpy = jest.spyOn(mockCtx, 'restore');
      gameOver.render();
      expect(saveSpy).toHaveBeenCalled();
      expect(restoreSpy).toHaveBeenCalled();
    });

    test('should apply shadow blur for glow effects', () => {
      gameOver.render();
      expect(mockCtx.shadowBlur).toBeGreaterThan(0);
    });

    test('should set text alignment', () => {
      gameOver.render();
      expect(mockCtx.textAlign).toBe('center');
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero score', () => {
      gameOver.setGameOver(false, 0, 1);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('0', expect.any(Number), expect.any(Number));
    });

    test('should handle very high score', () => {
      gameOver.setGameOver(false, 9999999, 1);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('9,999,999', expect.any(Number), expect.any(Number));
    });

    test('should handle wave 1', () => {
      gameOver.setGameOver(false, 1000, 1);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      gameOver.render();
      expect(fillTextSpy).toHaveBeenCalledWith('Wave 1 Reached', expect.any(Number), expect.any(Number));
    });

    test('should handle corrupted localStorage data in checkHighScore', () => {
      global.localStorage.getItem.mockReturnValue('invalid json');
      const isHighScore = gameOver.checkHighScore(1000);
      expect(isHighScore).toBe(false);
    });

    test('should handle corrupted localStorage data in saveHighScore', () => {
      global.localStorage.getItem.mockReturnValue('invalid json');
      expect(() => gameOver.saveHighScore(1000)).not.toThrow();
    });

    test('should handle rapid input changes', () => {
      gameOver.handleInput('ArrowDown'); // 0 -> 1
      gameOver.handleInput('ArrowDown'); // 1 -> 0 (wrap)
      gameOver.handleInput('ArrowUp');   // 0 -> 1 (wrap)
      expect(gameOver.selectedOption).toBe(1);
    });
  });

  describe('Animation Effects', () => {
    test('should have pulsing glow effect', () => {
      gameOver.animationFrame = 0;
      const glow1 = Math.sin(gameOver.animationFrame * 0.004) * 0.3 + 0.7;

      gameOver.animationFrame = 1000;
      const glow2 = Math.sin(gameOver.animationFrame * 0.004) * 0.3 + 0.7;

      expect(glow1).not.toBe(glow2);
    });

    test('should animate selection pulse', () => {
      gameOver.animationFrame = 0;
      const pulse1 = Math.sin(gameOver.animationFrame * 0.005) * 0.3 + 0.7;

      gameOver.animationFrame = 1000;
      const pulse2 = Math.sin(gameOver.animationFrame * 0.005) * 0.3 + 0.7;

      expect(pulse1).not.toBe(pulse2);
    });
  });

  describe('Particle System', () => {
    test('should initialize 50 particles', () => {
      expect(gameOver.particles.length).toBe(50);
    });

    test('should have particles with random positions', () => {
      const positions = gameOver.particles.map(p => ({ x: p.x, y: p.y }));
      const uniquePositions = new Set(positions.map(p => `${p.x},${p.y}`));
      expect(uniquePositions.size).toBeGreaterThan(1);
    });

    test('should have particles with velocity', () => {
      gameOver.particles.forEach(particle => {
        expect(typeof particle.vx).toBe('number');
        expect(typeof particle.vy).toBe('number');
      });
    });

    test('should move particles over time', () => {
      const initialPositions = gameOver.particles.map(p => ({ x: p.x, y: p.y }));
      gameOver.update(100);
      const newPositions = gameOver.particles.map(p => ({ x: p.x, y: p.y }));

      const positionsChanged = initialPositions.some((pos, i) =>
        pos.x !== newPositions[i].x || pos.y !== newPositions[i].y
      );
      expect(positionsChanged).toBe(true);
    });
  });
});
