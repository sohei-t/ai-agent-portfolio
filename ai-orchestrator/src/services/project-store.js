/**
 * project-store.js - JSON file-based persistent project store
 */
const fs = require('fs');
const path = require('path');

class ProjectStore {
  /**
   * @param {string} dataDir - Directory for projects.json
   */
  constructor(dataDir) {
    this.dataDir = dataDir;
    this.filePath = path.join(dataDir, 'projects.json');
    this.projects = new Map();
    this.saveDebounce = null;
    this.DEBOUNCE_MS = 100;
    this._counter = 0;
  }

  /**
   * Initialize store from disk
   */
  async initialize() {
    try {
      await fs.promises.mkdir(this.dataDir, { recursive: true });
      const raw = await fs.promises.readFile(this.filePath, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        data.forEach((p) => this.projects.set(p.id, p));
      }
    } catch (err) {
      // File does not exist or is invalid - start fresh
      this.projects = new Map();
      await this.save();
    }
  }

  /**
   * Generate a unique project ID
   * @returns {string} ID in format proj-YYYYMMDD-NNN
   */
  generateId() {
    const now = new Date();
    const dateStr =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');

    this._counter++;
    const counter = String(this._counter).padStart(3, '0');
    const id = `proj-${dateStr}-${counter}`;

    // Ensure uniqueness
    if (this.projects.has(id)) {
      return this.generateId();
    }
    return id;
  }

  /**
   * Register a new project
   * @param {object} project - { name, path, agent_type }
   * @returns {object} Created project
   * @throws {Error} If path already registered or validation fails
   */
  register(project) {
    if (!project.name || !project.path || !project.agent_type) {
      throw new Error('Missing required fields: name, path, agent_type');
    }

    // Check for duplicate path
    for (const [, existing] of this.projects) {
      if (existing.path === project.path) {
        throw new Error(`Path already registered: ${project.path}`);
      }
    }

    const id = this.generateId();
    const now = new Date().toISOString();

    const newProject = {
      id,
      name: project.name,
      path: project.path,
      agent_type: project.agent_type,
      status: 'idle',
      progress_percent: 0,
      current_phase: null,
      created_at: now,
      updated_at: now,
      progress_data: null,
    };

    this.projects.set(id, newProject);
    this.scheduleSave();
    return newProject;
  }

  /**
   * Get all projects, optionally filtered
   * @param {object} [filter] - { agent_type, status, search, sort, order }
   * @returns {Array} Array of project objects
   */
  getAll(filter = {}) {
    let results = Array.from(this.projects.values());

    if (filter.agent_type) {
      results = results.filter((p) => p.agent_type === filter.agent_type);
    }

    if (filter.status) {
      results = results.filter((p) => p.status === filter.status);
    }

    if (filter.search) {
      const term = filter.search.toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(term));
    }

    // Sort
    const sortField = filter.sort || 'updated_at';
    const sortOrder = filter.order || 'desc';
    results.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    });

    return results;
  }

  /**
   * Get a project by ID
   * @param {string} id
   * @returns {object|null}
   */
  getById(id) {
    return this.projects.get(id) || null;
  }

  /**
   * Update a project
   * @param {string} id
   * @param {object} data - Fields to update
   * @returns {object} Updated project
   * @throws {Error} If project not found
   */
  update(id, data) {
    const project = this.projects.get(id);
    if (!project) {
      throw new Error(`Project not found: ${id}`);
    }

    const updated = {
      ...project,
      ...data,
      id: project.id, // Prevent ID change
      created_at: project.created_at, // Prevent created_at change
      updated_at: new Date().toISOString(),
    };

    this.projects.set(id, updated);
    this.scheduleSave();
    return updated;
  }

  /**
   * Remove a project
   * @param {string} id
   * @returns {boolean} true if removed
   * @throws {Error} If project not found
   */
  remove(id) {
    if (!this.projects.has(id)) {
      throw new Error(`Project not found: ${id}`);
    }
    this.projects.delete(id);
    this.scheduleSave();
    return true;
  }

  /**
   * Get project statistics
   * @returns {object} Stats object
   */
  getStats() {
    const all = Array.from(this.projects.values());
    return {
      total: all.length,
      by_status: {
        idle: all.filter((p) => p.status === 'idle').length,
        in_progress: all.filter((p) => p.status === 'in_progress').length,
        completed: all.filter((p) => p.status === 'completed').length,
        failed: all.filter((p) => p.status === 'failed').length,
        paused: all.filter((p) => p.status === 'paused').length,
      },
      by_agent_type: {},
    };
  }

  /**
   * Schedule a debounced save to disk
   */
  scheduleSave() {
    if (this.saveDebounce) {
      clearTimeout(this.saveDebounce);
    }
    this.saveDebounce = setTimeout(() => this.save(), this.DEBOUNCE_MS);
  }

  /**
   * Save projects to disk (atomic write)
   */
  async save() {
    try {
      await fs.promises.mkdir(this.dataDir, { recursive: true });
      const data = Array.from(this.projects.values());
      const tmp = this.filePath + '.tmp';
      await fs.promises.writeFile(tmp, JSON.stringify(data, null, 2));
      await fs.promises.rename(tmp, this.filePath);
    } catch (err) {
      console.error('Failed to save projects:', err.message);
    }
  }

  /**
   * Find a project by path
   * @param {string} projectPath
   * @returns {object|null}
   */
  findByPath(projectPath) {
    for (const [, project] of this.projects) {
      if (project.path === projectPath) {
        return project;
      }
    }
    return null;
  }
}

module.exports = ProjectStore;
