/**
 * events.js - SSE (Server-Sent Events) endpoint and manager
 */
const { EVENTS } = require('../event-bus');

class SSEManager {
  /**
   * @param {EventEmitter} eventBus
   */
  constructor(eventBus) {
    this.clients = new Set();
    this.eventBus = eventBus;
    this.heartbeatInterval = null;

    // Forward EventBus events to SSE clients
    this.eventBus.on(EVENTS.PROGRESS_UPDATED, (data) => {
      this.broadcast('progress_update', data);
    });

    this.eventBus.on(EVENTS.PROJECT_REGISTERED, (data) => {
      this.broadcast('project_added', data);
    });

    this.eventBus.on(EVENTS.PROJECT_REMOVED, (data) => {
      this.broadcast('project_removed', data);
    });

    this.eventBus.on(EVENTS.PROGRESS_ERROR, (data) => {
      this.broadcast('error', data);
    });

    // Start heartbeat
    this.heartbeatInterval = setInterval(() => {
      this.broadcast('heartbeat', { timestamp: Date.now() });
    }, 30000);
  }

  /**
   * Express request handler for SSE endpoint
   * @param {Request} req
   * @param {Response} res
   */
  handler(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    // Send initial connected event
    res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: Date.now() })}\n\n`);

    this.clients.add(res);

    // Cleanup on disconnect
    req.on('close', () => {
      this.clients.delete(res);
    });
  }

  /**
   * Broadcast an event to all connected clients
   * @param {string} eventType
   * @param {object} data
   */
  broadcast(eventType, data) {
    const message = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
    const deadClients = [];

    for (const client of this.clients) {
      try {
        client.write(message);
      } catch {
        deadClients.push(client);
      }
    }

    // Clean up dead clients
    deadClients.forEach((client) => this.clients.delete(client));
  }

  /**
   * Get number of connected clients
   * @returns {number}
   */
  getClientCount() {
    return this.clients.size;
  }

  /**
   * Shutdown: close all connections and stop heartbeat
   */
  shutdown() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    for (const client of this.clients) {
      try {
        client.end();
      } catch {
        // Ignore errors during shutdown
      }
    }
    this.clients.clear();
  }
}

module.exports = SSEManager;
