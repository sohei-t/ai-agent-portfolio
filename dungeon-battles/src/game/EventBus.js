/**
 * EventBus.js - Event-based communication system
 * Enables loose coupling between game modules
 */

export class EventBus {
  constructor() {
    this.listeners = new Map();
    this.onceListeners = new Map();
  }

  /**
   * Subscribe to an event
   */
  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName).push(callback);
  }

  /**
   * Subscribe to an event (fires only once)
   */
  once(eventName, callback) {
    if (!this.onceListeners.has(eventName)) {
      this.onceListeners.set(eventName, []);
    }
    this.onceListeners.get(eventName).push(callback);
  }

  /**
   * Unsubscribe from an event
   */
  off(eventName, callback) {
    if (this.listeners.has(eventName)) {
      const callbacks = this.listeners.get(eventName);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Emit an event
   */
  emit(eventName, data = {}) {
    // Regular listeners
    if (this.listeners.has(eventName)) {
      const callbacks = this.listeners.get(eventName);
      callbacks.forEach(callback => callback(data));
    }

    // Once listeners
    if (this.onceListeners.has(eventName)) {
      const callbacks = this.onceListeners.get(eventName);
      callbacks.forEach(callback => callback(data));
      this.onceListeners.delete(eventName); // Clear after firing
    }
  }

  /**
   * Clear all listeners for an event
   */
  clear(eventName) {
    if (eventName) {
      this.listeners.delete(eventName);
      this.onceListeners.delete(eventName);
    } else {
      this.listeners.clear();
      this.onceListeners.clear();
    }
  }

  /**
   * Get listener count for an event
   */
  listenerCount(eventName) {
    const regular = this.listeners.has(eventName) ? this.listeners.get(eventName).length : 0;
    const once = this.onceListeners.has(eventName) ? this.onceListeners.get(eventName).length : 0;
    return regular + once;
  }
}

// Global event bus instance
export const globalEventBus = new EventBus();
