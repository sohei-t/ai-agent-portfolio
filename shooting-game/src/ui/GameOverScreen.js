/**
 * GameOverScreen - Game over display
 */
export class GameOverScreen {
  constructor(renderer) {
    this.renderer = renderer;
  }

  /**
   * Render game over screen
   */
  render(score, highScore, isNewHighScore) {
    const ctx = this.renderer.getContext();
    const canvas = this.renderer.canvas;

    // Overlay
    this.renderer.renderPanel(
      0,
      0,
      canvas.width,
      canvas.height,
      'rgba(0, 0, 0, 0.8)'
    );

    // Game Over text
    this.renderer.renderText(
      'GAME OVER',
      canvas.width / 2,
      200,
      56,
      '#FF0000',
      'center'
    );

    // New high score
    if (isNewHighScore) {
      this.renderer.renderText(
        'NEW HIGH SCORE!',
        canvas.width / 2,
        270,
        32,
        '#FFFF00',
        'center'
      );
    }

    // Score
    this.renderer.renderText(
      `SCORE: ${score.toString().padStart(8, '0')}`,
      canvas.width / 2,
      330,
      32,
      '#00FFFF',
      'center'
    );

    // High score
    this.renderer.renderText(
      `HIGH SCORE: ${highScore.toString().padStart(8, '0')}`,
      canvas.width / 2,
      380,
      24,
      '#FFFF00',
      'center'
    );

    // Continue message
    this.renderer.renderText(
      'Press SPACE to Continue',
      canvas.width / 2,
      460,
      20,
      '#FFFFFF',
      'center'
    );
  }
}
