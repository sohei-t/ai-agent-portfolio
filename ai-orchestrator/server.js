/**
 * server.js - AI Orchestrator Express entry point
 */
const express = require('express');
const cors = require('cors');
const path = require('path');

const { eventBus, EVENTS } = require('./src/event-bus');
const ProjectStore = require('./src/services/project-store');
const ProgressParser = require('./src/services/progress-parser');
const WatcherService = require('./src/services/watcher');
const SSEManager = require('./src/routes/events');
const createProjectsRouter = require('./src/routes/projects');

// Initialize services
const store = new ProjectStore(path.join(__dirname, 'data'));
const parser = new ProgressParser();
const watcher = new WatcherService(eventBus, parser);
const sseManager = new SSEManager(eventBus);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.use('/api/projects', createProjectsRouter(store, watcher, eventBus));

// SSE endpoint
app.get('/api/events', (req, res) => sseManager.handler(req, res));

// Stats endpoint
app.get('/api/stats', (req, res) => {
  try {
    const stats = store.getStats();
    stats.sse_clients = sseManager.getClientCount();
    stats.watched_paths = watcher.getWatchedPaths().length;
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
  }
});

// Update project data when progress files change
eventBus.on(EVENTS.PROGRESS_UPDATED, ({ projectPath, data }) => {
  const project = store.findByPath(projectPath);
  if (project && data) {
    try {
      store.update(project.id, {
        status: data.project ? data.project.status : project.status,
        progress_percent: data.progress ? data.progress.overall_percent : project.progress_percent,
        current_phase: data.progress ? data.progress.current_phase : project.current_phase,
        progress_data: data,
      });
    } catch (err) {
      console.error('Failed to update project from progress data:', err.message);
    }
  }
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  sseManager.shutdown();
  await watcher.unwatchAll();
  await store.save();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3456;
  const HOST = '127.0.0.1';

  app.listen(PORT, HOST, async () => {
    await store.initialize();

    // Start watching registered projects
    const projects = store.getAll();
    for (const project of projects) {
      watcher.watch(project.path);
    }

    console.log(`
  ╔══════════════════════════════════════════╗
  ║     AI Orchestrator Dashboard            ║
  ║     http://${HOST}:${PORT}               ║
  ╠══════════════════════════════════════════╣
  ║  Projects: ${String(projects.length).padEnd(29)}║
  ║  SSE:      /api/events                   ║
  ║  API:      /api/projects                 ║
  ╚══════════════════════════════════════════╝
    `);
  });
}

// Export for testing
module.exports = { app, store, watcher, sseManager, parser, eventBus };
