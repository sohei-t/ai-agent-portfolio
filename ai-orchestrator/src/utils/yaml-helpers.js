/**
 * yaml-helpers.js - Safe js-yaml wrapper with path utilities
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Expand tilde (~) in file paths
 * @param {string} filePath - Path potentially containing ~
 * @returns {string} Expanded absolute path
 */
function expandTilde(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    return filePath;
  }
  if (filePath.startsWith('~/') || filePath === '~') {
    return path.join(os.homedir(), filePath.slice(1));
  }
  return filePath;
}

/**
 * Detect path traversal attempts
 * @param {string} filePath - Path to check
 * @param {string} [baseDir] - Allowed base directory
 * @returns {boolean} true if traversal detected
 */
function hasPathTraversal(filePath, baseDir) {
  if (!filePath || typeof filePath !== 'string') {
    return false;
  }
  // Check for obvious traversal patterns
  const normalized = path.normalize(filePath);
  if (normalized.includes('..')) {
    if (baseDir) {
      const resolved = path.resolve(baseDir, filePath);
      const resolvedBase = path.resolve(baseDir);
      return !resolved.startsWith(resolvedBase);
    }
    return true;
  }
  return false;
}

/**
 * Safely load a YAML string
 * @param {string} content - YAML string
 * @returns {object} Parsed JavaScript object
 * @throws {Error} If YAML is invalid
 */
function safeLoad(content) {
  if (!content || typeof content !== 'string') {
    throw new Error('Invalid YAML content: input must be a non-empty string');
  }
  return yaml.load(content, { schema: yaml.DEFAULT_SCHEMA });
}

/**
 * Read and parse a YAML file
 * @param {string} filePath - Path to YAML file
 * @returns {Promise<object>} Parsed content
 */
async function readYamlFile(filePath) {
  const expandedPath = expandTilde(filePath);
  const content = await fs.promises.readFile(expandedPath, 'utf8');
  return safeLoad(content);
}

/**
 * Read and parse a YAML file synchronously
 * @param {string} filePath - Path to YAML file
 * @returns {object} Parsed content
 */
function readYamlFileSync(filePath) {
  const expandedPath = expandTilde(filePath);
  const content = fs.readFileSync(expandedPath, 'utf8');
  return safeLoad(content);
}

/**
 * Dump a JavaScript object to YAML string
 * @param {object} obj - Object to serialize
 * @returns {string} YAML string
 */
function dump(obj) {
  return yaml.dump(obj, { indent: 2, lineWidth: 120 });
}

module.exports = {
  safeLoad,
  readYamlFile,
  readYamlFileSync,
  dump,
  expandTilde,
  hasPathTraversal,
};
