/**
 * DebugSystem - Development tools and visualization
 * Provides FPS counter, collision boxes, pause/step, logging
 */
export class DebugSystem {
  constructor() {
    this.enabled = false;
    this.showCollisionBoxes = false;
    this.showFPS = true;
    this.showEntityCount = true;
    this.showQuadTree = false;
    this.logs = [];
    this.maxLogs = 10;
    this.paused = false;
    this.stepFrame = false;
    this.godMode = false;
  }

  /**
   * Initialize debug system
   */
  init() {
    this.setupKeyboardShortcuts();
    console.log('[DebugSystem] Initialized');
  }

  /**
   * Setup keyboard shortcuts for debug functions
   */
  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'F1':
          this.enabled = !this.enabled;
          this.log(`Debug mode: ${this.enabled ? 'ON' : 'OFF'}`, 'system');
          e.preventDefault();
          break;

        case 'F2':
          this.showCollisionBoxes = !this.showCollisionBoxes;
          this.log(`Collision boxes: ${this.showCollisionBoxes ? 'ON' : 'OFF'}`, 'system');
          e.preventDefault();
          break;

        case 'F3':
          this.togglePause();
          e.preventDefault();
          break;

        case 'F4':
          if (this.paused) {
            this.stepFrame = true;
            this.log('Step frame', 'system');
          }
          e.preventDefault();
          break;

        case 'F5':
          this.log('Restart stage (not implemented)', 'system');
          e.preventDefault();
          break;

        case 'F6':
          this.log('Skip stage (not implemented)', 'system');
          e.preventDefault();
          break;

        case 'F7':
          this.godMode = !this.godMode;
          this.log(`God mode: ${this.godMode ? 'ON' : 'OFF'}`, 'system');
          e.preventDefault();
          break;

        case 'F8':
          this.showQuadTree = !this.showQuadTree;
          this.log(`QuadTree: ${this.showQuadTree ? 'ON' : 'OFF'}`, 'system');
          e.preventDefault();
          break;
      }
    });
  }

  /**
   * Toggle pause state
   */
  togglePause() {
    this.paused = !this.paused;
    this.log(`Game ${this.paused ? 'PAUSED' : 'RESUMED'}`, 'system');
  }

  /**
   * Check if game should update this frame
   */
  shouldUpdate() {
    if (!this.paused) return true;
    if (this.stepFrame) {
      this.stepFrame = false;
      return true;
    }
    return false;
  }

  /**
   * Add log entry
   */
  log(message, type = 'info') {
    const timestamp = performance.now().toFixed(2);
    const logEntry = {
      timestamp,
      type,
      message
    };

    this.logs.push(logEntry);

    // Keep only last N logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Also log to console
    console.log(`[${timestamp}ms] ${type}: ${message}`);
  }

  /**
   * Update debug system
   */
  update() {
    // Nothing to update
  }

  /**
   * Render debug information
   */
  render(ctx, game) {
    if (!this.enabled) return;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, 250, 200);

    ctx.fillStyle = '#00ff00';
    ctx.font = '12px monospace';
    let y = 15;

    // Title
    ctx.fillStyle = '#ffff00';
    ctx.fillText('=== DEBUG INFO ===', 10, y);
    y += 20;

    // FPS
    ctx.fillStyle = '#00ff00';
    if (this.showFPS && game.performance) {
      const fps = game.performance.getFPS();
      const frameTime = game.performance.getFrameTime();
      ctx.fillText(`FPS: ${fps}`, 10, y);
      y += 15;
      ctx.fillText(`Frame: ${frameTime.toFixed(2)}ms`, 10, y);
      y += 15;
    }

    // Entity count
    if (this.showEntityCount && game.entityManager) {
      const count = game.entityManager.getEntityCount();
      ctx.fillText(`Entities: ${count}`, 10, y);
      y += 15;
    }

    // Collision stats
    if (game.systems && game.systems.collision) {
      const stats = game.systems.collision.getStats();
      ctx.fillText(`Collisions: ${stats.collisionsThisFrame}`, 10, y);
      y += 15;
    }

    // God mode indicator
    if (this.godMode) {
      ctx.fillStyle = '#ff0000';
      ctx.fillText('GOD MODE: ON', 10, y);
      y += 15;
    }

    // Pause indicator
    if (this.paused) {
      ctx.fillStyle = '#ff00ff';
      ctx.fillText('PAUSED (F4: step)', 10, y);
      y += 15;
    }

    ctx.restore();

    // Render logs
    this.renderLogs(ctx);

    // Render collision boxes
    if (this.showCollisionBoxes && game.entityManager) {
      this.renderCollisionBoxes(ctx, game.entityManager.getAllEntities());
    }

    // Render QuadTree
    if (this.showQuadTree && game.systems && game.systems.collision) {
      game.systems.collision.renderDebug(ctx);
    }

    // Render pause overlay
    if (this.paused) {
      this.renderPauseOverlay(ctx);
    }
  }

  /**
   * Render recent logs
   */
  renderLogs(ctx) {
    if (this.logs.length === 0) return;

    ctx.save();
    const startY = 220;
    const logHeight = 15;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, startY, 400, this.logs.length * logHeight + 10);

    ctx.font = '11px monospace';

    this.logs.forEach((log, i) => {
      const color = {
        'info': '#ffffff',
        'warning': '#ffaa00',
        'error': '#ff0000',
        'system': '#00ffff'
      }[log.type] || '#ffffff';

      ctx.fillStyle = color;
      ctx.fillText(`[${log.timestamp}ms] ${log.message}`, 5, startY + 15 + i * logHeight);
    });

    ctx.restore();
  }

  /**
   * Render collision boxes for all entities
   */
  renderCollisionBoxes(ctx, entities) {
    ctx.save();
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;

    entities.forEach(entity => {
      if (!entity.alive) return;

      const bounds = entity.getBounds();
      ctx.strokeRect(
        bounds.left,
        bounds.top,
        bounds.right - bounds.left,
        bounds.bottom - bounds.top
      );

      // Draw center point
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(entity.x, entity.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  /**
   * Render pause overlay
   */
  renderPauseOverlay(ctx) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAUSED', ctx.canvas.width / 2, ctx.canvas.height / 2);

    ctx.font = '24px Arial';
    ctx.fillText('Press F3 to resume', ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    ctx.fillText('Press F4 to step frame', ctx.canvas.width / 2, ctx.canvas.height / 2 + 80);

    ctx.restore();
  }

  /**
   * Check if in god mode
   */
  isGodMode() {
    return this.godMode;
  }

  /**
   * Check if paused
   */
  isPaused() {
    return this.paused;
  }

  /**
   * Get debug commands for console access
   */
  getConsoleCommands() {
    return {
      godMode: (enabled) => { this.godMode = enabled; },
      pause: () => { this.togglePause(); },
      showCollisions: (enabled) => { this.showCollisionBoxes = enabled; }
    };
  }
}
