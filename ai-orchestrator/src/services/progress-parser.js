/**
 * progress-parser.js - PROGRESS.yaml parser with validation and fallback
 */
const fs = require('fs');
const path = require('path');
const yamlHelpers = require('../utils/yaml-helpers');

const VALID_PROJECT_STATUSES = ['idle', 'in_progress', 'completed', 'failed', 'paused'];
const VALID_PHASE_STATUSES = ['pending', 'in_progress', 'completed', 'failed', 'skipped', 'paused'];
const VALID_AGENT_TYPES = [
  'git-worktree-agent',
  'learning-content-agent',
  'learning-content-agent-gcp',
  'skill-publish-agent',
  'video-generator-agent',
];

class ProgressParser {
  constructor() {
    this.lastValidData = new Map();
  }

  /**
   * Parse a PROGRESS.yaml file
   * @param {string} filePath - Absolute path to PROGRESS.yaml
   * @returns {Promise<{success: boolean, data?: object, error?: object, fallbackData?: object}>}
   */
  async parse(filePath) {
    try {
      const content = await fs.promises.readFile(filePath, 'utf8');
      const parsed = yamlHelpers.safeLoad(content);
      const validated = this.validate(parsed);
      const enriched = this.enrich(validated, filePath);

      this.lastValidData.set(filePath, enriched);

      return { success: true, data: enriched };
    } catch (error) {
      const fallback = this.lastValidData.get(filePath) || null;
      return {
        success: false,
        error: { message: error.message, filePath },
        fallbackData: fallback,
      };
    }
  }

  /**
   * Validate parsed YAML data
   * @param {object} data - Parsed YAML object
   * @returns {object} Validated data
   * @throws {Error} If required fields are missing
   */
  validate(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid YAML: root must be an object');
    }

    if (!data.project) {
      throw new Error('Missing required field: project');
    }

    if (!data.project.name) {
      throw new Error('Missing required field: project.name');
    }

    if (!data.project.agent_type) {
      throw new Error('Missing required field: project.agent_type');
    }

    if (!VALID_AGENT_TYPES.includes(data.project.agent_type)) {
      throw new Error(`Invalid agent_type: ${data.project.agent_type}`);
    }

    // Normalize status
    if (data.project.status && !VALID_PROJECT_STATUSES.includes(data.project.status)) {
      data.project.status = 'idle';
    }

    if (!data.project.status) {
      data.project.status = 'idle';
    }

    // Validate phases if present
    if (data.phases && Array.isArray(data.phases)) {
      data.phases = data.phases.map((phase) => {
        if (phase.status && !VALID_PHASE_STATUSES.includes(phase.status)) {
          phase.status = 'pending';
        }
        return phase;
      });
    }

    return data;
  }

  /**
   * Enrich parsed data with computed fields
   * @param {object} data - Validated data
   * @param {string} filePath - Source file path
   * @returns {object} Enriched data
   */
  enrich(data, filePath) {
    const phases = data.phases || [];
    const totalSteps = phases.reduce((sum, p) => sum + (p.steps ? p.steps.length : 0), 0);
    const doneSteps = phases.reduce(
      (sum, p) => sum + (p.steps ? p.steps.filter((s) => s.done).length : 0),
      0
    );

    const calculatedPercent = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

    return {
      ...data,
      progress: {
        ...data.progress,
        overall_percent:
          data.progress && data.progress.overall_percent != null
            ? data.progress.overall_percent
            : calculatedPercent,
      },
      _meta: {
        filePath,
        parsedAt: new Date().toISOString(),
        calculatedPercent,
        totalSteps,
        doneSteps,
      },
    };
  }

  /**
   * Get last valid data for a file path
   * @param {string} filePath
   * @returns {object|null}
   */
  getLastValid(filePath) {
    return this.lastValidData.get(filePath) || null;
  }

  /**
   * Clear cached data
   */
  clearCache() {
    this.lastValidData.clear();
  }
}

module.exports = ProgressParser;
