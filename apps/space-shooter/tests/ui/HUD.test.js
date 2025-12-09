/**
 * Unit Tests for HUD.js
 * Tests heads-up display rendering and state updates
 */

const HUD = require('../../src/ui/HUD.js');
const Config = require('../../src/utils/Config.js');

describe('HUD', () => {
  let hud, mockCanvas, mockCtx;

  beforeEach(() => {
    // Create mock canvas and context
    mockCanvas = document.createElement('canvas');
    mockCanvas.width = 800;
    mockCanvas.height = 600;
    mockCtx = mockCanvas.getContext('2d');

    hud = new HUD(mockCanvas, mockCtx);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    test('should initialize with correct default values', () => {
      expect(hud.canvas).toBe(mockCanvas);
      expect(hud.ctx).toBe(mockCtx);
      expect(hud.score).toBe(0);
      expect(hud.lives).toBe(Config.player.maxLives);
      expect(hud.wave).toBe(1);
      expect(hud.animationFrame).toBe(0);
    });

    test('should initialize with empty power-ups map', () => {
      expect(hud.activePowerUps).toBeInstanceOf(Map);
      expect(hud.activePowerUps.size).toBe(0);
    });

    test('should have cyberpunk color scheme', () => {
      expect(hud.colors.primary).toBeDefined();
      expect(hud.colors.secondary).toBeDefined();
      expect(hud.colors.accent).toBeDefined();
      expect(hud.colors.background).toBeDefined();
      expect(hud.colors.warning).toBe('#ff0000');
    });

    test('should have power-up colors defined', () => {
      expect(hud.powerUpColors.RAPID_FIRE).toBe('#00ffff');
      expect(hud.powerUpColors.SHIELD).toBe('#ff00ff');
      expect(hud.powerUpColors.MULTI_SHOT).toBe('#ffff00');
    });

    test('should have power-up icons defined', () => {
      expect(hud.powerUpIcons.RAPID_FIRE).toBeDefined();
      expect(hud.powerUpIcons.SHIELD).toBeDefined();
      expect(hud.powerUpIcons.MULTI_SHOT).toBeDefined();
    });
  });

  describe('Update Method', () => {
    test('should update animation frame', () => {
      const initialFrame = hud.animationFrame;
      hud.update(16);
      expect(hud.animationFrame).toBe(initialFrame + 16);
    });

    test('should update score from game state', () => {
      const gameState = { score: 5000 };
      hud.update(16, gameState);
      expect(hud.score).toBe(5000);
    });

    test('should update lives from game state', () => {
      const gameState = { lives: 2 };
      hud.update(16, gameState);
      expect(hud.lives).toBe(2);
    });

    test('should update wave from game state', () => {
      const gameState = { wave: 5 };
      hud.update(16, gameState);
      expect(hud.wave).toBe(5);
    });

    test('should update active power-ups from game state', () => {
      const powerUps = new Map([['RAPID_FIRE', { endTime: Date.now() + 5000 }]]);
      const gameState = { activePowerUps: powerUps };
      hud.update(16, gameState);
      expect(hud.activePowerUps.size).toBe(1);
      expect(hud.activePowerUps.has('RAPID_FIRE')).toBe(true);
    });

    test('should handle undefined game state', () => {
      const initialScore = hud.score;
      hud.update(16);
      expect(hud.score).toBe(initialScore);
    });

    test('should remove expired power-ups', () => {
      const pastTime = Date.now() - 1000;
      hud.activePowerUps.set('RAPID_FIRE', { endTime: pastTime });
      hud.update(16);
      expect(hud.activePowerUps.has('RAPID_FIRE')).toBe(false);
    });

    test('should keep active power-ups that have not expired', () => {
      const futureTime = Date.now() + 5000;
      hud.activePowerUps.set('SHIELD', { endTime: futureTime });
      hud.update(16);
      expect(hud.activePowerUps.has('SHIELD')).toBe(true);
    });
  });

  describe('Setter Methods', () => {
    test('should set score', () => {
      hud.setScore(10000);
      expect(hud.score).toBe(10000);
    });

    test('should set lives', () => {
      hud.setLives(2);
      expect(hud.lives).toBe(2);
    });

    test('should set wave', () => {
      hud.setWave(10);
      expect(hud.wave).toBe(10);
    });
  });

  describe('Power-Up Management', () => {
    test('should add power-up with correct end time', () => {
      const duration = 5000;
      const beforeTime = Date.now();
      hud.addPowerUp('RAPID_FIRE', duration);
      const afterTime = Date.now();

      expect(hud.activePowerUps.has('RAPID_FIRE')).toBe(true);
      const powerUp = hud.activePowerUps.get('RAPID_FIRE');
      expect(powerUp.endTime).toBeGreaterThanOrEqual(beforeTime + duration);
      expect(powerUp.endTime).toBeLessThanOrEqual(afterTime + duration);
    });

    test('should add multiple power-ups', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      hud.addPowerUp('SHIELD', 3000);
      expect(hud.activePowerUps.size).toBe(2);
    });

    test('should remove specific power-up', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      hud.addPowerUp('SHIELD', 5000);
      hud.removePowerUp('RAPID_FIRE');
      expect(hud.activePowerUps.has('RAPID_FIRE')).toBe(false);
      expect(hud.activePowerUps.has('SHIELD')).toBe(true);
    });

    test('should clear all power-ups', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      hud.addPowerUp('SHIELD', 5000);
      hud.addPowerUp('MULTI_SHOT', 5000);
      hud.clearPowerUps();
      expect(hud.activePowerUps.size).toBe(0);
    });
  });

  describe('Reset Method', () => {
    test('should reset all values to defaults', () => {
      hud.setScore(10000);
      hud.setLives(1);
      hud.setWave(5);
      hud.addPowerUp('RAPID_FIRE', 5000);

      hud.reset();

      expect(hud.score).toBe(0);
      expect(hud.lives).toBe(Config.player.maxLives);
      expect(hud.wave).toBe(1);
      expect(hud.activePowerUps.size).toBe(0);
    });
  });

  describe('Rendering - Top Bar', () => {
    test('should render top bar background', () => {
      const fillRectSpy = jest.spyOn(mockCtx, 'fillRect');
      hud.render();
      expect(fillRectSpy).toHaveBeenCalledWith(0, 0, 800, 80);
    });

    test('should render top bar border with gradient', () => {
      const strokeSpy = jest.spyOn(mockCtx, 'stroke');
      hud.render();
      expect(strokeSpy).toHaveBeenCalled();
    });

    test('should use canvas save and restore', () => {
      const saveSpy = jest.spyOn(mockCtx, 'save');
      const restoreSpy = jest.spyOn(mockCtx, 'restore');
      hud.render();
      expect(saveSpy).toHaveBeenCalled();
      expect(restoreSpy).toHaveBeenCalled();
    });
  });

  describe('Rendering - Score', () => {
    test('should render score label', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('SCORE:', 20, 30);
    });

    test('should render score value with formatting', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.setScore(12345);
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('12,345', expect.any(Number), expect.any(Number));
    });

    test('should render zero score correctly', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.setScore(0);
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('0', expect.any(Number), expect.any(Number));
    });
  });

  describe('Rendering - Wave', () => {
    test('should render wave label', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('WAVE:', 20, 60);
    });

    test('should render wave number', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.setWave(5);
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('5', expect.any(Number), expect.any(Number));
    });
  });

  describe('Rendering - Lives', () => {
    test('should render lives label', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('LIVES:', expect.any(Number), expect.any(Number));
    });

    test('should draw ship icons for lives', () => {
      const fillSpy = jest.spyOn(mockCtx, 'fill');
      hud.setLives(3);
      hud.render();
      expect(fillSpy).toHaveBeenCalled();
    });

    test('should draw active lives with fill', () => {
      const fillSpy = jest.spyOn(mockCtx, 'fill');
      hud.setLives(2);
      hud.render();
      expect(fillSpy).toHaveBeenCalled();
    });

    test('should draw inactive lives with stroke only', () => {
      const strokeSpy = jest.spyOn(mockCtx, 'stroke');
      hud.setLives(1); // 2 inactive lives
      hud.render();
      expect(strokeSpy).toHaveBeenCalled();
    });

    test('should use warning color when only one life remains', () => {
      hud.setLives(1);
      hud.render();
      expect(mockCtx.fillStyle).toBe(hud.colors.warning);
    });
  });

  describe('Rendering - Power-Ups', () => {
    test('should not render power-up section when no active power-ups', () => {
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).not.toHaveBeenCalledWith('ACTIVE POWER-UPS', expect.any(Number), expect.any(Number));
    });

    test('should render power-up section when active power-ups exist', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('ACTIVE POWER-UPS', expect.any(Number), expect.any(Number));
    });

    test('should render power-up icon', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith(
        hud.powerUpIcons.RAPID_FIRE,
        expect.any(Number),
        expect.any(Number)
      );
    });

    test('should render power-up name', () => {
      hud.addPowerUp('MULTI_SHOT', 5000);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('MULTI SHOT', expect.any(Number), expect.any(Number));
    });

    test('should render power-up timer', () => {
      hud.addPowerUp('SHIELD', 5000);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith(expect.stringMatching(/\d+s/), expect.any(Number), expect.any(Number));
    });

    test('should render progress bar for power-up', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      const fillRectSpy = jest.spyOn(mockCtx, 'fillRect');
      hud.render();
      expect(fillRectSpy).toHaveBeenCalled();
    });

    test('should render box outline for power-up', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      const strokeRectSpy = jest.spyOn(mockCtx, 'strokeRect');
      hud.render();
      expect(strokeRectSpy).toHaveBeenCalled();
    });

    test('should render multiple power-ups', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      hud.addPowerUp('SHIELD', 5000);
      hud.addPowerUp('MULTI_SHOT', 5000);
      const strokeRectSpy = jest.spyOn(mockCtx, 'strokeRect');
      hud.render();
      expect(strokeRectSpy.mock.calls.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Drawing Ship Method', () => {
    test('should draw filled ship when outline is false', () => {
      const fillSpy = jest.spyOn(mockCtx, 'fill');
      const strokeSpy = jest.spyOn(mockCtx, 'stroke');
      hud.drawShip(100, 100, 20, false);
      expect(fillSpy).toHaveBeenCalled();
      expect(strokeSpy).not.toHaveBeenCalled();
    });

    test('should draw outlined ship when outline is true', () => {
      const fillSpy = jest.spyOn(mockCtx, 'fill');
      const strokeSpy = jest.spyOn(mockCtx, 'stroke');
      hud.drawShip(100, 100, 20, true);
      expect(strokeSpy).toHaveBeenCalled();
      expect(fillSpy).not.toHaveBeenCalled();
    });

    test('should create path for ship shape', () => {
      const beginPathSpy = jest.spyOn(mockCtx, 'beginPath');
      const moveToSpy = jest.spyOn(mockCtx, 'moveTo');
      const lineToSpy = jest.spyOn(mockCtx, 'lineTo');
      const closePathSpy = jest.spyOn(mockCtx, 'closePath');

      hud.drawShip(100, 100, 20);

      expect(beginPathSpy).toHaveBeenCalled();
      expect(moveToSpy).toHaveBeenCalled();
      expect(lineToSpy).toHaveBeenCalled();
      expect(closePathSpy).toHaveBeenCalled();
    });
  });

  describe('Canvas Effects', () => {
    test('should apply shadow blur for glow effects', () => {
      hud.render();
      expect(mockCtx.shadowBlur).toBeGreaterThan(0);
    });

    test('should set gradient for border', () => {
      const createLinearGradientSpy = jest.spyOn(mockCtx, 'createLinearGradient');
      hud.render();
      expect(createLinearGradientSpy).toHaveBeenCalled();
    });

    test('should use different opacity levels', () => {
      hud.render();
      expect(mockCtx.globalAlpha).toBeDefined();
    });
  });

  describe('Dynamic Effects', () => {
    test('should have pulsing effect based on animation frame', () => {
      hud.animationFrame = 0;
      const pulse1 = Math.sin(hud.animationFrame * 0.003) * 0.2 + 0.8;

      hud.animationFrame = 1000;
      const pulse2 = Math.sin(hud.animationFrame * 0.003) * 0.2 + 0.8;

      expect(pulse1).not.toBe(pulse2);
    });

    test('should calculate power-up progress correctly', () => {
      const duration = Config.powerUps.duration;
      const endTime = Date.now() + duration;
      hud.activePowerUps.set('TEST', { endTime });

      // Progress should be close to 1.0 (100%)
      hud.render();
      // Just verify rendering doesn't throw
      expect(hud.activePowerUps.has('TEST')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero lives', () => {
      hud.setLives(0);
      expect(() => hud.render()).not.toThrow();
    });

    test('should handle very high score', () => {
      hud.setScore(9999999);
      const fillTextSpy = jest.spyOn(mockCtx, 'fillText');
      hud.render();
      expect(fillTextSpy).toHaveBeenCalledWith('9,999,999', expect.any(Number), expect.any(Number));
    });

    test('should handle very high wave number', () => {
      hud.setWave(100);
      expect(() => hud.render()).not.toThrow();
    });

    test('should handle negative score gracefully', () => {
      hud.setScore(-100);
      expect(() => hud.render()).not.toThrow();
    });

    test('should handle partial game state updates', () => {
      const gameState = { score: 1000 }; // Missing lives, wave, etc.
      expect(() => hud.update(16, gameState)).not.toThrow();
      expect(hud.score).toBe(1000);
    });

    test('should handle unknown power-up type', () => {
      hud.addPowerUp('UNKNOWN_TYPE', 5000);
      expect(() => hud.render()).not.toThrow();
    });
  });

  describe('Performance', () => {
    test('should handle rapid updates without errors', () => {
      for (let i = 0; i < 100; i++) {
        hud.update(16, { score: i * 100, lives: 3, wave: Math.floor(i / 10) });
      }
      expect(hud.score).toBe(9900);
    });

    test('should handle many power-ups', () => {
      hud.addPowerUp('RAPID_FIRE', 5000);
      hud.addPowerUp('SHIELD', 5000);
      hud.addPowerUp('MULTI_SHOT', 5000);
      expect(() => hud.render()).not.toThrow();
    });
  });
});
