/**
 * EntityManager - Lifecycle management for all game objects
 * Handles adding/removing entities safely
 */
export class EntityManager {
  constructor() {
    this.entities = [];
    this.entitiesToAdd = [];
    this.entitiesToRemove = [];
    this.entityIdCounter = 0;
  }

  /**
   * Add an entity (deferred to avoid mid-loop issues)
   */
  addEntity(entity) {
    if (!entity.id) {
      entity.id = this.entityIdCounter++;
    }
    this.entitiesToAdd.push(entity);
  }

  /**
   * Remove an entity (deferred to avoid mid-loop issues)
   */
  removeEntity(entity) {
    this.entitiesToRemove.push(entity);
  }

  /**
   * Get all entities of a specific type
   */
  getEntitiesByType(type) {
    return this.entities.filter(e => e.type === type && e.alive);
  }

  /**
   * Get all alive entities
   */
  getAliveEntities() {
    return this.entities.filter(e => e.alive);
  }

  /**
   * Get all entities (including dead ones)
   */
  getAllEntities() {
    return this.entities;
  }

  /**
   * Get entity count
   */
  getEntityCount() {
    return this.entities.filter(e => e.alive).length;
  }

  /**
   * Get entity count by type
   */
  getEntityCountByType(type) {
    return this.entities.filter(e => e.type === type && e.alive).length;
  }

  /**
   * Update all entities
   */
  update(deltaTime) {
    // Add new entities
    if (this.entitiesToAdd.length > 0) {
      this.entities.push(...this.entitiesToAdd);
      this.entitiesToAdd = [];
    }

    // Update all entities
    this.entities.forEach(entity => {
      if (entity.alive && entity.update) {
        entity.update(deltaTime);
      }
    });

    // Remove marked entities
    if (this.entitiesToRemove.length > 0) {
      this.entitiesToRemove.forEach(entity => {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
          this.entities.splice(index, 1);
        }
      });
      this.entitiesToRemove = [];
    }

    // Remove dead entities
    this.entities = this.entities.filter(e => e.alive);
  }

  /**
   * Clear all entities
   */
  clear() {
    this.entities = [];
    this.entitiesToAdd = [];
    this.entitiesToRemove = [];
  }

  /**
   * Clear entities of specific type
   */
  clearByType(type) {
    this.entities = this.entities.filter(e => e.type !== type);
  }

  /**
   * Find nearest entity of type to position
   */
  findNearest(x, y, type) {
    const entities = this.getEntitiesByType(type);
    if (entities.length === 0) return null;

    let nearest = null;
    let minDistance = Infinity;

    entities.forEach(entity => {
      const dx = entity.x - x;
      const dy = entity.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < minDistance) {
        minDistance = distance;
        nearest = entity;
      }
    });

    return nearest;
  }

  /**
   * Get entities within radius of position
   */
  getEntitiesInRadius(x, y, radius, type = null) {
    let entities = type ? this.getEntitiesByType(type) : this.getAliveEntities();

    return entities.filter(entity => {
      const dx = entity.x - x;
      const dy = entity.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= radius;
    });
  }

  /**
   * Get statistics
   */
  getStats() {
    const typeCount = {};

    this.entities.forEach(entity => {
      if (entity.alive) {
        typeCount[entity.type] = (typeCount[entity.type] || 0) + 1;
      }
    });

    return {
      total: this.getEntityCount(),
      byType: typeCount,
      pendingAdd: this.entitiesToAdd.length,
      pendingRemove: this.entitiesToRemove.length
    };
  }
}
