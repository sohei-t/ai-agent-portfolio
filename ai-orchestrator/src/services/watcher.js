/**
 * watcher.js - chokidar-based file watcher service
 */
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { EVENTS } = require('../event-bus');

class WatcherService {
  /**
   * @param {EventEmitter} eventBus
   * @param {ProgressParser} progressParser
   */
  constructor(eventBus, progressParser) {
    this.eventBus = eventBus;
    this.parser = progressParser;
    this.watchers = new Map(); // projectPath -> chokidar.FSWatcher
  }

  /**
   * Start watching a project directory for PROGRESS.yaml / PROGRESS_*.yaml
   * @param {string} projectPath - Absolute path to project root
   */
  watch(projectPath) {
    if (this.watchers.has(projectPath)) {
      return; // Already watching
    }

    const patterns = [
      path.join(projectPath, 'PROGRESS.yaml'),
      path.join(projectPath, 'PROGRESS_*.yaml'),
    ];

    const watcher = chokidar.watch(patterns, {
      persistent: true,
      ignoreInitial: false,
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
    });

    watcher.on('add', (filePath) => this.handleChange(filePath, projectPath));
    watcher.on('change', (filePath) => this.handleChange(filePath, projectPath));
    watcher.on('unlink', (filePath) => this.handleRemove(filePath, projectPath));
    watcher.on('error', (error) => {
      console.error(`Watcher error for ${projectPath}:`, error.message);
    });

    this.watchers.set(projectPath, watcher);
  }

  /**
   * Handle file change or addition
   * @param {string} filePath - Changed file path
   * @param {string} projectPath - Project root path
   */
  async handleChange(filePath, projectPath) {
    try {
      const result = await this.parser.parse(filePath);
      if (result.success) {
        this.eventBus.emit(EVENTS.PROGRESS_UPDATED, {
          projectPath,
          filePath,
          data: result.data,
        });
      } else {
        this.eventBus.emit(EVENTS.PROGRESS_ERROR, {
          projectPath,
          filePath,
          error: result.error,
          fallbackData: result.fallbackData,
        });
      }
    } catch (err) {
      this.eventBus.emit(EVENTS.PROGRESS_ERROR, {
        projectPath,
        filePath,
        error: { message: err.message },
      });
    }
  }

  /**
   * Handle file removal
   * @param {string} filePath
   * @param {string} projectPath
   */
  handleRemove(filePath, projectPath) {
    this.eventBus.emit(EVENTS.FILE_REMOVED, { projectPath, filePath });
  }

  /**
   * Stop watching a specific project
   * @param {string} projectPath
   */
  async unwatch(projectPath) {
    const watcher = this.watchers.get(projectPath);
    if (watcher) {
      await watcher.close();
      this.watchers.delete(projectPath);
    }
  }

  /**
   * Stop all watchers (for graceful shutdown)
   */
  async unwatchAll() {
    const closePromises = [];
    for (const [projectPath, watcher] of this.watchers) {
      closePromises.push(watcher.close());
    }
    await Promise.all(closePromises);
    this.watchers.clear();
  }

  /**
   * Get list of watched paths
   * @returns {string[]}
   */
  getWatchedPaths() {
    return Array.from(this.watchers.keys());
  }
}

module.exports = WatcherService;
