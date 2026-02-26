/**
 * projects.js - REST API router for project CRUD operations
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const { EVENTS } = require('../event-bus');
const yamlHelpers = require('../utils/yaml-helpers');

/**
 * Create projects router
 * @param {ProjectStore} store
 * @param {WatcherService} watcher
 * @param {EventEmitter} eventBus
 * @returns {express.Router}
 */
function createProjectsRouter(store, watcher, eventBus) {
  const router = express.Router();

  // GET /api/projects - List all projects
  router.get('/', (req, res) => {
    try {
      const filter = {
        agent_type: req.query.agent_type,
        status: req.query.status,
        search: req.query.search,
        sort: req.query.sort,
        order: req.query.order,
      };

      const projects = store.getAll(filter);
      res.json({ projects, total: projects.length });
    } catch (err) {
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  // GET /api/projects/:id - Get project details
  router.get('/:id', (req, res) => {
    try {
      const project = store.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found', code: 'NOT_FOUND' });
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  // GET /api/projects/:id/progress - Get progress data
  router.get('/:id/progress', (req, res) => {
    try {
      const project = store.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found', code: 'NOT_FOUND' });
      }
      res.json({
        id: project.id,
        progress_percent: project.progress_percent,
        current_phase: project.current_phase,
        progress_data: project.progress_data,
      });
    } catch (err) {
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  // POST /api/projects/register - Register a new project
  router.post('/register', (req, res) => {
    try {
      const { name, path: projectPath, agent_type } = req.body;

      // Validation
      if (!name || !projectPath || !agent_type) {
        return res.status(400).json({
          error: 'Missing required fields: name, path, agent_type',
          code: 'VALIDATION_ERROR',
        });
      }

      // Path traversal check
      if (yamlHelpers.hasPathTraversal(projectPath)) {
        return res.status(403).json({
          error: 'Path traversal detected',
          code: 'PATH_TRAVERSAL',
        });
      }

      const validTypes = [
        'git-worktree-agent',
        'learning-content-agent',
        'learning-content-agent-gcp',
        'skill-publish-agent',
        'video-generator-agent',
      ];

      if (!validTypes.includes(agent_type)) {
        return res.status(400).json({
          error: `Invalid agent_type. Must be one of: ${validTypes.join(', ')}`,
          code: 'VALIDATION_ERROR',
        });
      }

      const project = store.register({ name, path: projectPath, agent_type });

      // Start watching for progress updates
      watcher.watch(projectPath);

      // Emit event
      eventBus.emit(EVENTS.PROJECT_REGISTERED, project);

      res.status(201).json(project);
    } catch (err) {
      if (err.message.includes('already registered')) {
        return res.status(409).json({ error: err.message, code: 'DUPLICATE' });
      }
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  // POST /api/projects/scan - Scan directories for projects
  router.post('/scan', async (req, res) => {
    try {
      const { directories } = req.body;
      const dirs = directories || ['~/Desktop/AI-Apps', '~/Desktop/Learning-Curricula'];

      const added = [];
      const existing = [];

      for (const dir of dirs) {
        const expandedDir = yamlHelpers.expandTilde(dir);
        try {
          const entries = await fs.promises.readdir(expandedDir, { withFileTypes: true });
          for (const entry of entries) {
            if (!entry.isDirectory()) continue;

            const projectPath = path.join(expandedDir, entry.name);
            const progressPath = path.join(projectPath, 'PROGRESS.yaml');

            try {
              await fs.promises.access(progressPath, fs.constants.R_OK);
            } catch {
              continue; // No PROGRESS.yaml
            }

            // Check if already registered
            const existingProject = store.findByPath(projectPath);
            if (existingProject) {
              existing.push(existingProject);
              continue;
            }

            // Determine agent type from PROGRESS.yaml
            let agentType = 'git-worktree-agent';
            try {
              const content = await yamlHelpers.readYamlFile(progressPath);
              if (content && content.project && content.project.agent_type) {
                agentType = content.project.agent_type;
              }
            } catch {
              // Use default agent type
            }

            try {
              const project = store.register({
                name: entry.name,
                path: projectPath,
                agent_type: agentType,
              });

              watcher.watch(projectPath);
              eventBus.emit(EVENTS.PROJECT_REGISTERED, project);
              added.push(project);
            } catch {
              // Skip duplicates during scan
            }
          }
        } catch {
          // Directory does not exist or is not accessible
        }
      }

      res.json({
        added,
        existing,
        total: added.length + existing.length,
      });
    } catch (err) {
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  // PATCH /api/projects/:id - Update a project
  router.patch('/:id', (req, res) => {
    try {
      const project = store.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found', code: 'NOT_FOUND' });
      }

      const allowedFields = ['name', 'status', 'progress_percent', 'current_phase', 'progress_data'];
      const updates = {};

      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }

      const updated = store.update(req.params.id, updates);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  // DELETE /api/projects/:id - Remove a project
  router.delete('/:id', async (req, res) => {
    try {
      const project = store.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found', code: 'NOT_FOUND' });
      }

      // Stop watching
      await watcher.unwatch(project.path);

      // Remove from store
      store.remove(req.params.id);

      // Emit event
      eventBus.emit(EVENTS.PROJECT_REMOVED, { id: req.params.id });

      res.json({ message: 'Project removed', id: req.params.id });
    } catch (err) {
      res.status(500).json({ error: err.message, code: 'INTERNAL_ERROR' });
    }
  });

  return router;
}

module.exports = createProjectsRouter;
