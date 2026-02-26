/**
 * EventBus - Central event system based on Node.js EventEmitter
 * All inter-module communication goes through this singleton
 */
const EventEmitter = require('events');

const EVENTS = {
  // File watcher events
  FILE_CHANGED: 'file:changed',
  FILE_ADDED: 'file:added',
  FILE_REMOVED: 'file:removed',

  // Progress events
  PROGRESS_UPDATED: 'progress:updated',
  PROGRESS_ERROR: 'progress:error',

  // Project events
  PROJECT_REGISTERED: 'project:registered',
  PROJECT_REMOVED: 'project:removed',
  PROJECT_SCANNED: 'project:scanned',

  // System events
  HEARTBEAT: 'system:heartbeat',
};

class EventBus extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }
}

// Singleton instance
const eventBus = new EventBus();

module.exports = { eventBus, EVENTS };
