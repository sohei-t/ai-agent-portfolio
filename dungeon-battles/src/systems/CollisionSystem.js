/**
 * CollisionSystem - Handles all collision detection and responses
 * Uses QuadTree for spatial partitioning to optimize performance
 * Callback-based architecture for flexible collision responses
 */
import { QuadTree } from './QuadTree.js';

export class CollisionSystem {
  constructor(canvasWidth, canvasHeight) {
    this.quadTree = new QuadTree({ x: 0, y: 0, width: canvasWidth, height: canvasHeight });
    this.collisionPairs = new Map();
    this.collisionHistory = new Set();
    this.debugMode = false;
  }

  /**
   * Initialize the collision system
   */
  init() {
    console.log('[CollisionSystem] Initialized');
  }

  /**
   * Register a collision pair with a callback
   * @param {string} typeA - First entity type
   * @param {string} typeB - Second entity type
   * @param {Function} callback - Called when collision occurs (entityA, entityB)
   */
  registerPair(typeA, typeB, callback) {
    const key = this.getPairKey(typeA, typeB);
    this.collisionPairs.set(key, callback);
    console.log(`[CollisionSystem] Registered pair: ${typeA} <-> ${typeB}`);
  }

  /**
   * Get unique key for collision pair (order-independent)
   */
  getPairKey(typeA, typeB) {
    return typeA < typeB ? `${typeA}-${typeB}` : `${typeB}-${typeA}`;
  }

  /**
   * Get collision key for specific entity pair (to prevent duplicate handling)
   */
  getCollisionKey(entityA, entityB) {
    const idA = entityA.id;
    const idB = entityB.id;
    return idA < idB ? `${idA}-${idB}` : `${idB}-${idA}`;
  }

  /**
   * Update collision detection for all entities
   */
  update(entities) {
    // Clear quadtree
    this.quadTree.clear();

    // Insert all alive entities
    const aliveEntities = entities.filter(e => e.alive);
    aliveEntities.forEach(entity => {
      this.quadTree.insert(entity);
    });

    // Clear collision history for this frame
    this.collisionHistory.clear();

    // Check collisions
    aliveEntities.forEach(entity => {
      const nearby = this.quadTree.retrieve(entity);
      nearby.forEach(other => {
        if (entity.id !== other.id && !this.hasChecked(entity, other)) {
          if (this.checkCollision(entity, other)) {
            this.handleCollision(entity, other);
          }
        }
      });
    });
  }

  /**
   * Check if we've already processed this collision pair
   */
  hasChecked(entityA, entityB) {
    const key = this.getCollisionKey(entityA, entityB);
    if (this.collisionHistory.has(key)) {
      return true;
    }
    this.collisionHistory.add(key);
    return false;
  }

  /**
   * AABB collision detection
   */
  checkCollision(entityA, entityB) {
    const a = entityA.getBounds();
    const b = entityB.getBounds();

    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );
  }

  /**
   * Handle collision between two entities
   */
  handleCollision(entityA, entityB) {
    // Try both type orders
    const key1 = this.getPairKey(entityA.type, entityB.type);
    const callback = this.collisionPairs.get(key1);

    if (callback) {
      // Determine correct order for callback
      if (entityA.type < entityB.type) {
        callback(entityA, entityB);
      } else {
        callback(entityB, entityA);
      }

      if (this.debugMode) {
        console.log(`[Collision] ${entityA.type} <-> ${entityB.type}`);
      }
    }
  }

  /**
   * Enable/disable debug logging
   */
  setDebugMode(enabled) {
    this.debugMode = enabled;
  }

  /**
   * Get collision statistics
   */
  getStats() {
    return {
      totalObjects: this.quadTree.getObjectCount(),
      registeredPairs: this.collisionPairs.size,
      collisionsThisFrame: this.collisionHistory.size
    };
  }

  /**
   * Render debug visualization
   */
  renderDebug(ctx) {
    this.renderQuadTreeDebug(ctx, this.quadTree);
  }

  /**
   * Recursively render quadtree boundaries
   */
  renderQuadTreeDebug(ctx, node) {
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(node.bounds.x, node.bounds.y, node.bounds.width, node.bounds.height);

    node.nodes.forEach(subnode => {
      this.renderQuadTreeDebug(ctx, subnode);
    });
  }
}
