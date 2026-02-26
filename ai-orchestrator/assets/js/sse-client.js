/**
 * sse-client.js - SSE connection manager with auto-reconnect
 */
class SSEClient {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.retryCount = 0;
    this.maxRetry = 10;
    this.handlers = new Map();
    this.statusCallback = null;
    this.reconnectTimer = null;
  }

  /**
   * Set a callback for connection status changes
   * @param {function} callback - (status: string) => void
   */
  onStatusChange(callback) {
    this.statusCallback = callback;
  }

  /**
   * Update connection status
   * @param {string} status - 'connected' | 'connecting' | 'disconnected' | 'failed'
   */
  _setStatus(status) {
    if (this.statusCallback) {
      this.statusCallback(status);
    }
  }

  /**
   * Connect to the SSE endpoint
   */
  connect() {
    if (this.eventSource) {
      this.eventSource.close();
    }

    this._setStatus('connecting');

    try {
      this.eventSource = new EventSource(this.url);
    } catch (e) {
      this._setStatus('failed');
      return;
    }

    this.eventSource.onopen = () => {
      this.retryCount = 0;
      this._setStatus('connected');
    };

    this.eventSource.onerror = () => {
      this._setStatus('disconnected');
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
      this._reconnect();
    };

    // Register all event handlers
    for (const [type, handler] of this.handlers) {
      this.eventSource.addEventListener(type, handler);
    }
  }

  /**
   * Register an event handler
   * @param {string} eventType - SSE event type
   * @param {function} handler - Event handler
   */
  on(eventType, handler) {
    const wrappedHandler = (event) => {
      try {
        const data = JSON.parse(event.data);
        handler(data);
      } catch (e) {
        console.error(`SSE parse error for ${eventType}:`, e);
      }
    };

    this.handlers.set(eventType, wrappedHandler);

    if (this.eventSource) {
      this.eventSource.addEventListener(eventType, wrappedHandler);
    }
  }

  /**
   * Reconnect with exponential backoff
   */
  _reconnect() {
    if (this.retryCount >= this.maxRetry) {
      this._setStatus('failed');
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.retryCount), 30000);
    this.retryCount++;

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * Manually reconnect
   */
  reconnect() {
    this.retryCount = 0;
    this.connect();
  }

  /**
   * Disconnect and cleanup
   */
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this._setStatus('disconnected');
  }
}

// Export for browser
if (typeof window !== 'undefined') {
  window.SSEClient = SSEClient;
}
