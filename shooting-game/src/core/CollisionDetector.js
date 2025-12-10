/**
 * CollisionDetector - AABB collision detection with spatial partitioning
 */
export class CollisionDetector {
  constructor(width, height, cellSize = 100) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
  }

  /**
   * Check AABB collision between two entities
   */
  isColliding(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  /**
   * Create spatial grid for optimization
   */
  createSpatialGrid(entities) {
    const grid = Array(this.rows * this.cols).fill(null).map(() => []);

    for (const entity of entities) {
      if (!entity.active) continue;

      const cellX = Math.floor(entity.x / this.cellSize);
      const cellY = Math.floor(entity.y / this.cellSize);
      const index = cellY * this.cols + cellX;

      if (index >= 0 && index < grid.length) {
        grid[index].push(entity);
      }
    }

    return grid;
  }

  /**
   * Get nearby entities in adjacent cells
   */
  getNearbyEntities(entity, grid) {
    const cellX = Math.floor(entity.x / this.cellSize);
    const cellY = Math.floor(entity.y / this.cellSize);
    const nearby = [];

    // Check 3x3 grid around entity
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const checkX = cellX + dx;
        const checkY = cellY + dy;

        if (checkX >= 0 && checkX < this.cols && checkY >= 0 && checkY < this.rows) {
          const index = checkY * this.cols + checkX;
          nearby.push(...grid[index]);
        }
      }
    }

    return nearby;
  }

  /**
   * Check collisions with spatial partitioning
   */
  checkCollisions(entities, handlers) {
    const grid = this.createSpatialGrid(entities);
    const checkedPairs = new Set();

    for (const entity of entities) {
      if (!entity.active) continue;

      const nearby = this.getNearbyEntities(entity, grid);

      for (const other of nearby) {
        if (entity === other || !other.active) continue;

        // Avoid checking same pair twice
        const pairId = entity.id < other.id
          ? `${entity.id}-${other.id}`
          : `${other.id}-${entity.id}`;

        if (checkedPairs.has(pairId)) continue;
        checkedPairs.add(pairId);

        // Check collision
        if (this.isColliding(entity, other)) {
          this.handleCollision(entity, other, handlers);
        }
      }
    }
  }

  /**
   * Handle collision based on entity types
   */
  handleCollision(a, b, handlers) {
    const typeA = a.type;
    const typeB = b.type;
    const handlerKey = `${typeA}-${typeB}`;
    const reverseKey = `${typeB}-${typeA}`;

    if (handlers[handlerKey]) {
      handlers[handlerKey](a, b);
    } else if (handlers[reverseKey]) {
      handlers[reverseKey](b, a);
    }
  }

  /**
   * Check if point is inside bounds
   */
  pointInBounds(x, y, bounds) {
    return (
      x >= bounds.x &&
      x <= bounds.x + bounds.width &&
      y >= bounds.y &&
      y <= bounds.y + bounds.height
    );
  }

  /**
   * Check if entity is on screen
   */
  isOnScreen(entity, padding = 50) {
    return (
      entity.x + entity.width > -padding &&
      entity.x < this.width + padding &&
      entity.y + entity.height > -padding &&
      entity.y < this.height + padding
    );
  }
}
