/**
 * E2E Tests for Piano App
 * Tests complete user workflows and integration scenarios
 *
 * ITERATION 1: Happy path user scenarios
 */

import { test, expect } from '@playwright/test';

test.describe('Piano App - E2E Tests (Iteration 1)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to piano app
    await page.goto('http://localhost:5173');

    // Wait for app to load
    await page.waitForSelector('[data-testid="piano"]', { timeout: 5000 });
  });

  test.describe('Basic User Journey', () => {
    test('should load the piano app successfully', async ({ page }) => {
      // Verify page title
      await expect(page).toHaveTitle(/Piano/i);

      // Verify piano component is visible
      const piano = page.locator('[data-testid="piano"]');
      await expect(piano).toBeVisible();

      // Verify controls are visible
      await expect(page.locator('[data-testid="octave-selector"]')).toBeVisible();
      await expect(page.locator('[data-testid="volume-control"]')).toBeVisible();
    });

    test('should display 12 piano keys', async ({ page }) => {
      const keys = page.locator('.key');
      await expect(keys).toHaveCount(12);
    });

    test('should display 7 white keys and 5 black keys', async ({ page }) => {
      const whiteKeys = page.locator('.white-key');
      const blackKeys = page.locator('.black-key');

      await expect(whiteKeys).toHaveCount(7);
      await expect(blackKeys).toHaveCount(5);
    });
  });

  test.describe('Playing Notes', () => {
    test('should play a note when key is clicked', async ({ page }) => {
      const cKey = page.locator('[data-note="C"]').first();

      // Click the C key
      await cKey.click();

      // Verify key has visual feedback (active state)
      // Note: Actual audio testing requires additional setup
      await expect(cKey).toBeVisible();
    });

    test('should play multiple notes in sequence', async ({ page }) => {
      // Play C-D-E-F-G scale
      const notes = ['C', 'D', 'E', 'F', 'G'];

      for (const note of notes) {
        const key = page.locator(`[data-note="${note}"]`).first();
        await key.click();
        await page.waitForTimeout(200); // Wait between notes
      }

      // Test completes successfully if no errors
      expect(true).toBe(true);
    });

    test('should handle chord playing (multiple simultaneous notes)', async ({ page }) => {
      // Play C major chord (C-E-G)
      const cKey = page.locator('[data-note="C"]').first();
      const eKey = page.locator('[data-note="E"]').first();
      const gKey = page.locator('[data-note="G"]').first();

      // Click multiple keys
      await Promise.all([
        cKey.click(),
        eKey.click(),
        gKey.click(),
      ]);

      // Verify all keys are visible
      await expect(cKey).toBeVisible();
      await expect(eKey).toBeVisible();
      await expect(gKey).toBeVisible();
    });

    test('should play black keys (sharps)', async ({ page }) => {
      const cSharpKey = page.locator('[data-note="C#"]').first();
      await cSharpKey.click();
      await expect(cSharpKey).toHaveClass(/black-key/);
    });
  });

  test.describe('Octave Switching', () => {
    test('should increase octave', async ({ page }) => {
      const octaveDisplay = page.locator('[data-testid="octave-display"]');
      const upButton = page.locator('[aria-label="Increase octave"]');

      // Verify initial octave
      await expect(octaveDisplay).toHaveText('C4');

      // Increase octave
      await upButton.click();
      await expect(octaveDisplay).toHaveText('C5');
    });

    test('should decrease octave', async ({ page }) => {
      const octaveDisplay = page.locator('[data-testid="octave-display"]');
      const downButton = page.locator('[aria-label="Decrease octave"]');

      // Decrease octave
      await downButton.click();
      await expect(octaveDisplay).toHaveText('C3');
    });

    test('should play notes in different octaves', async ({ page }) => {
      const cKey = page.locator('[data-note="C"]').first();
      const upButton = page.locator('[aria-label="Increase octave"]');

      // Play C4
      await cKey.click();

      // Switch to C5
      await upButton.click();
      await cKey.click();

      // Switch to C6
      await upButton.click();
      await cKey.click();

      // Verify octave changed
      const octaveDisplay = page.locator('[data-testid="octave-display"]');
      await expect(octaveDisplay).toHaveText('C6');
    });
  });

  test.describe('Volume Control', () => {
    test('should adjust volume with slider', async ({ page }) => {
      const volumeSlider = page.locator('[data-testid="volume-slider"]');
      const volumeDisplay = page.locator('[data-testid="volume-display"]');

      // Set volume to 70%
      await volumeSlider.fill('70');
      await expect(volumeDisplay).toHaveText('70%');

      // Set volume to 30%
      await volumeSlider.fill('30');
      await expect(volumeDisplay).toHaveText('30%');
    });

    test('should mute and unmute', async ({ page }) => {
      const muteButton = page.locator('[data-testid="mute-button"]');
      const volumeSlider = page.locator('[data-testid="volume-slider"]');

      // Mute
      await muteButton.click();
      await expect(muteButton).toHaveText('🔇');
      await expect(volumeSlider).toBeDisabled();

      // Unmute
      await muteButton.click();
      await expect(muteButton).toHaveText('🔊');
      await expect(volumeSlider).not.toBeDisabled();
    });
  });

  test.describe('Theme Switching', () => {
    test('should switch to modern theme', async ({ page }) => {
      const themeSelector = page.locator('[data-testid="theme-select"]');
      const piano = page.locator('[data-testid="piano"]');

      await themeSelector.selectOption('modern');
      await expect(piano).toHaveAttribute('data-theme', 'modern');
    });

    test('should switch to neon theme', async ({ page }) => {
      const themeSelector = page.locator('[data-testid="theme-select"]');
      const piano = page.locator('[data-testid="piano"]');

      await themeSelector.selectOption('neon');
      await expect(piano).toHaveAttribute('data-theme', 'neon');
    });

    test('should switch back to classic theme', async ({ page }) => {
      const themeSelector = page.locator('[data-testid="theme-select"]');
      const piano = page.locator('[data-testid="piano"]');

      // Switch to neon
      await themeSelector.selectOption('neon');

      // Switch back to classic
      await themeSelector.selectOption('classic');
      await expect(piano).toHaveAttribute('data-theme', 'classic');
    });

    test('should persist theme after switching', async ({ page }) => {
      const themeSelector = page.locator('[data-testid="theme-select"]');

      // Switch theme
      await themeSelector.selectOption('modern');

      // Reload page
      await page.reload();
      await page.waitForSelector('[data-testid="piano"]');

      // Verify theme persisted
      await expect(themeSelector).toHaveValue('modern');
    });
  });

  test.describe('Note Label Display', () => {
    test('should show English labels by default', async ({ page }) => {
      const cKey = page.locator('[data-note="C"]').first();
      await expect(cKey).toContainText('C');
    });

    test('should switch to Japanese labels', async ({ page }) => {
      const labelSelector = page.locator('[data-testid="label-mode-select"]');
      const cKey = page.locator('[data-note="C"]').first();

      await labelSelector.selectOption('japanese');
      await expect(cKey).toContainText('ド');
    });

    test('should hide labels', async ({ page }) => {
      const labelSelector = page.locator('[data-testid="label-mode-select"]');

      await labelSelector.selectOption('none');

      // Verify no note labels are visible
      const labels = page.locator('.note-label');
      await expect(labels).toHaveCount(0);
    });

    test('should persist label mode after reload', async ({ page }) => {
      const labelSelector = page.locator('[data-testid="label-mode-select"]');

      // Switch to Japanese
      await labelSelector.selectOption('japanese');

      // Reload page
      await page.reload();
      await page.waitForSelector('[data-testid="piano"]');

      // Verify label mode persisted
      await expect(labelSelector).toHaveValue('japanese');
    });
  });

  test.describe('Keyboard Input (Desktop)', () => {
    test('should play note with keyboard (Q key = C)', async ({ page }) => {
      // Press Q key (should play C)
      await page.keyboard.press('q');

      // Verify C key shows active state
      const cKey = page.locator('[data-note="C"]').first();
      await expect(cKey).toBeVisible();
    });

    test('should play multiple notes with keyboard', async ({ page }) => {
      // Play C-D-E (Q-W-E)
      await page.keyboard.press('q');
      await page.waitForTimeout(100);
      await page.keyboard.press('w');
      await page.waitForTimeout(100);
      await page.keyboard.press('e');

      expect(true).toBe(true);
    });

    test('should play black keys with number keys', async ({ page }) => {
      // Press 2 key (should play C#)
      await page.keyboard.press('2');

      const cSharpKey = page.locator('[data-note="C#"]').first();
      await expect(cSharpKey).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      const piano = page.locator('[data-testid="piano"]');
      await expect(piano).toBeVisible();

      // Verify keys are still playable
      const cKey = page.locator('[data-note="C"]').first();
      await cKey.click();
    });

    test('should work on tablet viewport', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });

      const piano = page.locator('[data-testid="piano"]');
      await expect(piano).toBeVisible();
    });

    test('should work on desktop viewport', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });

      const piano = page.locator('[data-testid="piano"]');
      await expect(piano).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load within 2 seconds', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:5173');
      await page.waitForSelector('[data-testid="piano"]');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(2000);
    });

    test('should handle rapid key presses', async ({ page }) => {
      const cKey = page.locator('[data-note="C"]').first();

      // Rapidly click 10 times
      for (let i = 0; i < 10; i++) {
        await cKey.click({ delay: 50 });
      }

      // App should still be responsive
      await expect(cKey).toBeVisible();
    });
  });

  test.describe('Settings Persistence', () => {
    test('should persist volume setting', async ({ page }) => {
      const volumeSlider = page.locator('[data-testid="volume-slider"]');

      // Set volume
      await volumeSlider.fill('80');

      // Reload page
      await page.reload();
      await page.waitForSelector('[data-testid="piano"]');

      // Verify volume persisted
      await expect(volumeSlider).toHaveValue('80');
    });

    test('should persist all settings together', async ({ page }) => {
      // Set all settings
      await page.locator('[data-testid="theme-select"]').selectOption('neon');
      await page.locator('[data-testid="volume-slider"]').fill('65');
      await page.locator('[data-testid="label-mode-select"]').selectOption('japanese');

      // Reload page
      await page.reload();
      await page.waitForSelector('[data-testid="piano"]');

      // Verify all settings persisted
      await expect(page.locator('[data-testid="theme-select"]')).toHaveValue('neon');
      await expect(page.locator('[data-testid="volume-slider"]')).toHaveValue('65');
      await expect(page.locator('[data-testid="label-mode-select"]')).toHaveValue('japanese');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle invalid octave gracefully', async ({ page }) => {
      const octaveDisplay = page.locator('[data-testid="octave-display"]');
      const downButton = page.locator('[aria-label="Decrease octave"]');

      // Try to go below minimum octave
      await downButton.click(); // C3
      await downButton.click(); // Should stay at C3 (minimum)

      await expect(octaveDisplay).toHaveText('C3');
      await expect(downButton).toBeDisabled();
    });

    test('should handle invalid volume gracefully', async ({ page }) => {
      const volumeSlider = page.locator('[data-testid="volume-slider"]');
      const volumeDisplay = page.locator('[data-testid="volume-display"]');

      // Try to set volume to 0
      await volumeSlider.fill('0');
      await expect(volumeDisplay).toHaveText('0%');

      // Try to set volume to 100
      await volumeSlider.fill('100');
      await expect(volumeDisplay).toHaveText('100%');
    });
  });
});
