import { GAME_CONFIG } from '../config/gameConfig.js';
/**
 * Menu - Main menu screen
 */
export class Menu {
  constructor(renderer) {
    this.renderer = renderer;
    this.selectedOption = 0;
    this.options = ['START GAME', 'INSTRUCTIONS', 'HIGH SCORES'];
    this.shipOrder = ['BALANCED', 'SPEED', 'POWER'];
  }

  /**
   * Render menu
   */
  render(selectedShip = 'BALANCED', shipConfigs = GAME_CONFIG.SHIP_TYPES) {
    const ctx = this.renderer.getContext();
    const canvas = this.renderer.canvas;

    // Title
    this.renderer.renderText(
      'VERTICAL SHOOTER',
      canvas.width / 2,
      100,
      48,
      '#00FFFF',
      'center'
    );

    // Subtitle
    this.renderer.renderText(
      'Press SPACE to Start',
      canvas.width / 2,
      160,
      20,
      '#FFFFFF',
      'center'
    );

    this.renderShipSelection(canvas, selectedShip, shipConfigs);

    // Options
    const startY = 360;
    for (let i = 0; i < this.options.length; i++) {
      const y = startY + i * 50;
      const selected = i === this.selectedOption;

      this.renderer.renderText(
        this.options[i],
        canvas.width / 2,
        y,
        24,
        selected ? '#FFFF00' : '#AAAAAA',
        'center'
      );

      // Selection arrow
      if (selected) {
        this.renderer.renderText(
          '>',
          canvas.width / 2 - 150,
          y,
          24,
          '#FFFF00',
          'right'
        );
        this.renderer.renderText(
          '<',
          canvas.width / 2 + 150,
          y,
          24,
          '#FFFF00',
          'left'
        );
      }
    }

    // Controls
    this.renderControls(ctx, canvas);
  }

  /**
   * Render control instructions
   */
  renderControls(ctx, canvas) {
    const y = 450;

    this.renderer.renderText(
      'CONTROLS',
      canvas.width / 2,
      y,
      20,
      '#00FFFF',
      'center'
    );

    this.renderer.renderText(
      'Arrow Keys / WASD - Move',
      canvas.width / 2,
      y + 30,
      16,
      '#FFFFFF',
      'center'
    );

    this.renderer.renderText(
      'SPACE - Shoot',
      canvas.width / 2,
      y + 55,
      16,
      '#FFFFFF',
      'center'
    );

    this.renderer.renderText(
      'B - Bomb',
      canvas.width / 2,
      y + 80,
      16,
      '#FFFFFF',
      'center'
    );
  }

  /**
   * Render ship selection cards
   */
  renderShipSelection(canvas, selectedShip, shipConfigs) {
    const centerX = canvas.width / 2;
    const baseY = 210;
    const spacing = 200;
    const startX = centerX - spacing;

    this.renderer.renderText(
      'SELECT YOUR SHIP',
      centerX,
      baseY,
      18,
      '#00FFFF',
      'center'
    );

    this.shipOrder.forEach((shipId, idx) => {
      const x = startX + idx * spacing;
      const shipInfo = shipConfigs?.[shipId] || { label: shipId };
      const selected = shipId === selectedShip;
      const panelColor = selected ? 'rgba(0, 180, 216, 0.25)' : 'rgba(0, 0, 0, 0.5)';
      const strokeColor = selected ? '#FFFF00' : '#00b4d8';

      this.renderer.renderPanel(x - 80, baseY + 30, 160, 100, panelColor, strokeColor);

      this.renderer.renderText(
        shipInfo.label || shipId,
        x,
        baseY + 40,
        18,
        selected ? '#FFFF00' : '#AAAAAA',
        'center'
      );

      this.renderer.renderText(
        `SPD ${shipInfo.speed || '-'}`,
        x,
        baseY + 60,
        14,
        '#FFFFFF',
        'center'
      );

      this.renderer.renderText(
        `POW ${shipInfo.power || '-'} / ${shipInfo.maxPower || '-'}`,
        x,
        baseY + 80,
        14,
        '#FFFFFF',
        'center'
      );

      this.renderer.renderText(
        `ROF ${shipInfo.fireRate ? shipInfo.fireRate.toFixed(2) : '-'}`,
        x,
        baseY + 100,
        14,
        '#FFFFFF',
        'center'
      );
    });

    this.renderer.renderText(
      '← → で機体を選択',
      centerX,
      baseY + 135,
      16,
      '#90e0ef',
      'center'
    );
  }

  /**
   * Move selection up
   */
  moveUp() {
    this.selectedOption = (this.selectedOption - 1 + this.options.length) % this.options.length;
  }

  /**
   * Move selection down
   */
  moveDown() {
    this.selectedOption = (this.selectedOption + 1) % this.options.length;
  }

  /**
   * Get ship hit areas for input detection
   */
  getShipHitAreas(canvas) {
    const centerX = canvas.width / 2;
    const baseY = 210;
    const spacing = 200;
    const startX = centerX - spacing;
    const width = 160;
    const height = 100;

    return this.shipOrder.map((shipId, idx) => ({
      id: shipId,
      x: startX + idx * spacing - width / 2,
      y: baseY + 30,
      width,
      height
    }));
  }

  /**
   * Get selected option
   */
  getSelected() {
    return this.options[this.selectedOption];
  }
}
