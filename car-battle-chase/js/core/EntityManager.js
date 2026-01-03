/**
 * EntityManager.js - Entity Lifecycle Management
 * Handles creation, update, and destruction of all game entities
 */

export class EntityManager {
  constructor() {
    this.entities = new Map();
    this.groups = new Map();
    this.pendingAdd = [];
    this.pendingRemove = [];
  }

  /**
   * Add an entity
   * @param {Entity} entity - Entity to add
   * @param {string} group - Optional group name
   */
  add(entity, group = 'default') {
    this.pendingAdd.push({ entity, group });
  }

  /**
   * Remove an entity
   * @param {Entity} entity - Entity to remove
   */
  remove(entity) {
    this.pendingRemove.push(entity);
  }

  /**
   * Process pending additions and removals
   */
  processPending() {
    // Add pending entities
    for (const { entity, group } of this.pendingAdd) {
      const id = entity.id || this.generateId();
      entity.id = id;
      this.entities.set(id, entity);

      // Add to group
      if (!this.groups.has(group)) {
        this.groups.set(group, new Set());
      }
      this.groups.get(group).add(entity);
      entity._group = group;
    }
    this.pendingAdd = [];

    // Remove pending entities
    for (const entity of this.pendingRemove) {
      this.entities.delete(entity.id);

      if (entity._group && this.groups.has(entity._group)) {
        this.groups.get(entity._group).delete(entity);
      }

      if (entity.destroy) {
        entity.destroy();
      }
    }
    this.pendingRemove = [];
  }

  /**
   * Update all entities
   * @param {number} deltaTime - Time since last update
   */
  update(deltaTime) {
    this.processPending();

    for (const entity of this.entities.values()) {
      if (entity.active && entity.update) {
        entity.update(deltaTime);
      }

      // Check if entity should be removed
      if (!entity.active) {
        this.remove(entity);
      }
    }
  }

  /**
   * Render all entities
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  render(ctx) {
    // Sort by z-index or y-position for proper layering
    const sorted = Array.from(this.entities.values())
      .filter(e => e.active && e.visible !== false)
      .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    for (const entity of sorted) {
      if (entity.render) {
        entity.render(ctx);
      }
    }
  }

  /**
   * Get entity by ID
   * @param {string} id - Entity ID
   */
  get(id) {
    return this.entities.get(id);
  }

  /**
   * Get all entities in a group
   * @param {string} group - Group name
   * @returns {Array} Array of entities
   */
  getGroup(group) {
    const groupSet = this.groups.get(group);
    return groupSet ? Array.from(groupSet).filter(e => e.active) : [];
  }

  /**
   * Get all entities of a specific type
   * @param {string} type - Entity type
   * @returns {Array} Array of entities
   */
  getByType(type) {
    return Array.from(this.entities.values())
      .filter(e => e.active && e.type === type);
  }

  /**
   * Get all active entities
   * @returns {Array} Array of entities
   */
  getAll() {
    return Array.from(this.entities.values()).filter(e => e.active);
  }

  /**
   * Get entity count
   */
  count() {
    return this.entities.size;
  }

  /**
   * Get active entity count
   */
  activeCount() {
    let count = 0;
    for (const entity of this.entities.values()) {
      if (entity.active) count++;
    }
    return count;
  }

  /**
   * Clear all entities
   */
  clear() {
    for (const entity of this.entities.values()) {
      if (entity.destroy) {
        entity.destroy();
      }
    }
    this.entities.clear();
    this.groups.clear();
    this.pendingAdd = [];
    this.pendingRemove = [];
  }

  /**
   * Clear entities in a specific group
   * @param {string} group - Group name
   */
  clearGroup(group) {
    const groupSet = this.groups.get(group);
    if (groupSet) {
      for (const entity of groupSet) {
        this.remove(entity);
      }
    }
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return 'entity_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Find nearest entity to a position
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {string} type - Optional type filter
   * @param {Entity} exclude - Optional entity to exclude
   */
  findNearest(x, y, type = null, exclude = null) {
    let nearest = null;
    let nearestDistSq = Infinity;

    for (const entity of this.entities.values()) {
      if (!entity.active) continue;
      if (type && entity.type !== type) continue;
      if (exclude && entity === exclude) continue;

      const dx = entity.position.x - x;
      const dy = entity.position.y - y;
      const distSq = dx * dx + dy * dy;

      if (distSq < nearestDistSq) {
        nearestDistSq = distSq;
        nearest = entity;
      }
    }

    return nearest;
  }

  /**
   * Find all entities within radius
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} radius - Search radius
   * @param {string} type - Optional type filter
   */
  findInRadius(x, y, radius, type = null) {
    const result = [];
    const radiusSq = radius * radius;

    for (const entity of this.entities.values()) {
      if (!entity.active) continue;
      if (type && entity.type !== type) continue;

      const dx = entity.position.x - x;
      const dy = entity.position.y - y;
      const distSq = dx * dx + dy * dy;

      if (distSq <= radiusSq) {
        result.push(entity);
      }
    }

    return result;
  }
}

export default EntityManager;
