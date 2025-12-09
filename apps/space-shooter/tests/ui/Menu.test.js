/**
 * Unit Tests for Menu.js
 * Tests menu UI rendering, navigation, and state management
 */

const Menu = require('../../src/ui/Menu.js');

describe('Menu', () => {
  let menu, mockCanvas, mockCtx;

  beforeEach(() => {
    // Create mock canvas and context
    mockCanvas = document.createElement('canvas');
    mockCanvas.width = 800;
    mockCanvas.height = 600;
    mockCtx = mockCanvas.getContext('2d');

    menu = new Menu(mockCanvas, mockCtx);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    test('should initialize with correct default values', () => {
      expect(menu.canvas).toBe(mockCanvas);
      expect(menu.ctx).toBe(mockCtx);
      expect(menu.selectedOption).toBe(0);
      expect(menu.options).toEqual(['START', 'HOW TO PLAY', 'HIGH SCORE']);
      expect(menu.showHelp).toBe(false);
      expect(menu.showHighScore).toBe(false);
      expect(menu.animationFrame).toBe(0);
    });

    test('should have cyberpunk color scheme', () => {
      expect(menu.colors.primary).toBeDefined();
      expect(menu.colors.secondary).toBeDefined();
      expect(menu.colors.accent).toBeDefined();
      expect(menu.colors.background).toBeDefined();
    });
  });

  describe('Navigation with Keyboard', () => {
    test('should move selection down on ArrowDown', () => {
      expect(menu.selectedOption).toBe(0);
      menu.handleInput('ArrowDown');
      expect(menu.selectedOption).toBe(1);
    });

    test('should move selection down on s key', () => {
      expect(menu.selectedOption).toBe(0);
      menu.handleInput('s');
      expect(menu.selectedOption).toBe(1);
    });

    test('should move selection up on ArrowUp', () => {
      menu.selectedOption = 1;
      menu.handleInput('ArrowUp');
      expect(menu.selectedOption).toBe(0);
    });

    test('should move selection up on w key', () => {
      menu.selectedOption = 1;
      menu.handleInput('w');
      expect(menu.selectedOption).toBe(0);
    });

    test('should wrap selection from top to bottom', () => {
      expect(menu.selectedOption).toBe(0);
      menu.handleInput('ArrowUp');
      expect(menu.selectedOption).toBe(2); // Last option
    });

    test('should wrap selection from bottom to top', () => {
      menu.selectedOption = 2;
      menu.handleInput('ArrowDown');
      expect(menu.selectedOption).toBe(0); // First option
    });
  });

  describe('Menu Option Selection', () => {
    test('should return START when Enter pressed on first option', () => {
      menu.selectedOption = 0;
      const result = menu.handleInput('Enter');
      expect(result).toBe('START');
    });

    test('should return START when Space pressed on first option', () => {
      menu.selectedOption = 0;
      const result = menu.handleInput(' ');
      expect(result).toBe('START');
    });

    test('should show help screen when selecting HOW TO PLAY', () => {
      menu.selectedOption = 1;
      const result = menu.handleInput('Enter');
      expect(menu.showHelp).toBe(true);
      expect(result).toBeNull();
    });

    test('should show high score screen when selecting HIGH SCORE', () => {
      menu.selectedOption = 2;
      const result = menu.handleInput('Enter');
      expect(menu.showHighScore).toBe(true);
      expect(result).toBeNull();
    });
  });

  describe('Help Screen', () => {
    test('should close help screen on Enter key', () => {
      menu.showHelp = true;
      menu.handleInput('Enter');
      expect(menu.showHelp).toBe(false);
    });

    test('should close help screen on Escape key', () => {
      menu.showHelp = true;
      menu.handleInput('Escape');
      expect(menu.showHelp).toBe(false);
    });

    test('should not navigate while help screen is shown', () => {
      menu.showHelp = true;
      menu.selectedOption = 0;
      menu.handleInput('ArrowDown');
      expect(menu.selectedOption).toBe(0); // Should not change
    });
  });

  describe('High Score Screen', () => {
    test('should close high score screen on Enter key', () => {
      menu.showHighScore = true;
      menu.handleInput('Enter');
      expect(menu.showHighScore).toBe(false);
    });

    test('should close high score screen on Escape key', () => {
      menu.showHighScore = true;
      menu.handleInput('Escape');
      expect(menu.showHighScore).toBe(false);
    });

    test('should not navigate while high score screen is shown', () => {
      menu.showHighScore = true;
      menu.selectedOption = 0;
      menu.handleInput('ArrowDown');
      expect(menu.selectedOption).toBe(0); // Should not change
    });
  });

  describe('Touch Input', () => {
    test('should return START when touching first menu item', () => {
      const centerX = mockCanvas.width / 2;
      const startY = mockCanvas.height / 2 + 50;
      const result = menu.handleTouch(centerX, startY);
      expect(result).toBe('START');
    });

    test('should show help when touching second menu item', () => {
      const centerX = mockCanvas.width / 2;
      const startY = mockCanvas.height / 2 + 50 + 70; // First item + spacing
      const result = menu.handleTouch(centerX, startY);
      expect(menu.showHelp).toBe(true);
      expect(result).toBeNull();
    });

    test('should show high score when touching third menu item', () => {
      const centerX = mockCanvas.width / 2;
      const startY = mockCanvas.height / 2 + 50 + 140; // First item + 2*spacing
      const result = menu.handleTouch(centerX, startY);
      expect(menu.showHighScore).toBe(true);
      expect(result).toBeNull();
    });

    test('should close help screen on touch', () => {
      menu.showHelp = true;
      const result = menu.handleTouch(100, 100);
      expect(menu.showHelp).toBe(false);
      expect(result).toBeNull();
    });

    test('should close high score screen on touch', () => {
      menu.showHighScore = true;
      const result = menu.handleTouch(100, 100);
      expect(menu.showHighScore).toBe(false);
      expect(result).toBeNull();
    });
  });

  describe('Update Method', () => {
    test('should update animation frame on update', () => {
      const initialFrame = menu.animationFrame;
      menu.update(16); // ~60fps
      expect(menu.animationFrame).toBe(initialFrame + 16);
    });

    test('should accumulate animation time', () => {
      menu.update(10);
      menu.update(20);
      menu.update(30);
      expect(menu.animationFrame).toBe(60);
    });
  });

  describe('Rendering - Main Menu', () => {
    test('should clear canvas when rendering', () => {
      const fillRectSpy = jest.spyOn(mockCtx, 'fillRect');
      menu.render();
      expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 800, 600);
    });

    test('should render title text', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('SPACE', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('INVADERS', expect.any(Number), expect.any(Number));
    });

    test('should render subtitle', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('// NEON WARFARE //', expect.any(Number), expect.any(Number));
    });

    test('should render all menu options', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('START', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('HOW TO PLAY', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('HIGH SCORE', expect.any(Number), expect.any(Number));
    });

    test('should render selection brackets for selected option', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.selectedOption = 0;
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('>', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('<', expect.any(Number), expect.any(Number));
    });

    test('should render footer instructions', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith(
        'USE ARROW KEYS OR TAP TO SELECT • ENTER TO CONFIRM',
        expect.any(Number),
        expect.any(Number)
      );
    });

    test('should render background grid', () => {
      const strokeSpy = jest.spyOn(mockCtx, 'stroke');
      menu.render();
      expect(strokeSpy).toHaveBeenCalled();
    });
  });

  describe('Rendering - Help Screen', () => {
    beforeEach(() => {
      menu.showHelp = true;
    });

    test('should render help title', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('HOW TO PLAY', expect.any(Number), expect.any(Number));
    });

    test('should render controls section', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('CONTROLS:', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('Arrow Keys / A-D: Move Left/Right', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('Spacebar / Tap: Shoot', expect.any(Number), expect.any(Number));
    });

    test('should render objective section', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('OBJECTIVE:', expect.any(Number), expect.any(Number));
    });

    test('should render power-ups section', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('POWER-UPS:', expect.any(Number), expect.any(Number));
    });

    test('should render back instruction', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('PRESS ENTER OR TAP TO RETURN', expect.any(Number), expect.any(Number));
    });

    test('should render dark overlay', () => {
      const fillRectSpy = jest.spyOn(mockCtx, 'fillRect');
      menu.render();
      expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 800, 600);
    });
  });

  describe('Rendering - High Score Screen', () => {
    beforeEach(() => {
      menu.showHighScore = true;
    });

    test('should render high score title', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('HIGH SCORES', expect.any(Number), expect.any(Number));
    });

    test('should render no scores message when localStorage is empty', () => {
      global.localStorage.getItem.mockReturnValue(null);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('No high scores yet!', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('Be the first to set a record!', expect.any(Number), expect.any(Number));
    });

    test('should render scores from localStorage', () => {
      const mockScores = [10000, 5000, 2500];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(mockScores));
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();

      expect(fillTextSpy).toHaveBeenCalledWith('1.', expect.any(Number), expect.any(Number));
      expect(fillTextSpy).toHaveBeenCalledWith('10,000', expect.any(Number), expect.any(Number));
    });

    test('should render back instruction', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      menu.render();
      expect(fillTextSpy).toHaveBeenCalledWith('PRESS ENTER OR TAP TO RETURN', expect.any(Number), expect.any(Number));
    });
  });

  describe('High Score Management', () => {
    test('should get high scores from localStorage', () => {
      const mockScores = [10000, 5000, 2500];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(mockScores));

      const scores = menu.getHighScores();
      expect(scores).toEqual(mockScores);
      expect(global.localStorage.getItem).toHaveBeenCalledWith('spaceInvadersHighScores');
    });

    test('should return empty array when no scores exist', () => {
      global.localStorage.getItem.mockReturnValue(null);
      const scores = menu.getHighScores();
      expect(scores).toEqual([]);
    });

    test('should return only top 10 scores', () => {
      const mockScores = Array.from({ length: 20 }, (_, i) => (20 - i) * 1000);
      global.localStorage.getItem.mockReturnValue(JSON.stringify(mockScores));

      const scores = menu.getHighScores();
      expect(scores.length).toBe(10);
    });

    test('should handle localStorage errors gracefully', () => {
      global.localStorage.getItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      const scores = menu.getHighScores();
      expect(scores).toEqual([]);
    });

    test('should save score to localStorage', () => {
      const existingScores = [5000, 2500];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));

      menu.saveScore(7500);

      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        'spaceInvadersHighScores',
        JSON.stringify([7500, 5000, 2500])
      );
    });

    test('should sort scores in descending order', () => {
      const existingScores = [5000, 2500];
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));

      menu.saveScore(3000);

      const savedData = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
      expect(savedData).toEqual([5000, 3000, 2500]);
    });

    test('should keep only top 10 scores when saving', () => {
      const existingScores = Array.from({ length: 10 }, (_, i) => (10 - i) * 1000);
      global.localStorage.getItem.mockReturnValue(JSON.stringify(existingScores));

      menu.saveScore(500);

      const savedData = JSON.parse(global.localStorage.setItem.mock.calls[0][1]);
      expect(savedData.length).toBe(10);
      expect(savedData[savedData.length - 1]).toBe(1000); // Lowest should be 1000, not 500
    });

    test('should handle save errors gracefully', () => {
      global.localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });

      expect(() => menu.saveScore(1000)).not.toThrow();
    });
  });

  describe('Canvas Context Methods', () => {
    test('should use canvas save and restore', () => {
      const saveSpy = jest.spyOn(mockCtx, 'save');
      const restoreSpy = jest.spyOn(mockCtx, 'restore');
      menu.render();
      expect(saveSpy).toHaveBeenCalled();
      expect(restoreSpy).toHaveBeenCalled();
    });

    test('should set shadow blur for glow effects', () => {
      menu.render();
      expect(mockCtx.shadowBlur).toBeGreaterThan(0);
    });

    test('should set text alignment', () => {
      menu.render();
      expect(mockCtx.textAlign).toBe('center');
    });
  });

  describe('Edge Cases', () => {
    test('should handle invalid key input gracefully', () => {
      const result = menu.handleInput('InvalidKey');
      expect(result).toBeNull();
    });

    test('should handle multiple rapid key presses', () => {
      menu.handleInput('ArrowDown');
      menu.handleInput('ArrowDown');
      menu.handleInput('ArrowUp');
      expect(menu.selectedOption).toBe(1);
    });

    test('should handle touch outside menu items', () => {
      const result = menu.handleTouch(0, 0);
      expect(result).toBeNull();
    });

    test('should handle corrupted localStorage data', () => {
      global.localStorage.getItem.mockReturnValue('invalid json');
      const scores = menu.getHighScores();
      expect(scores).toEqual([]);
    });
  });
});
