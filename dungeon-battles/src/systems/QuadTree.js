/**
 * QuadTree - Spatial partitioning for efficient collision detection
 * Reduces collision checks from O(n²) to O(n log n)
 */
export class QuadTree {
  constructor(bounds, maxObjects = 10, maxLevels = 5, level = 0) {
    this.bounds = bounds; // { x, y, width, height }
    this.maxObjects = maxObjects;
    this.maxLevels = maxLevels;
    this.level = level;
    this.objects = [];
    this.nodes = [];
  }

  /**
   * Clear the quadtree
   */
  clear() {
    this.objects = [];
    this.nodes.forEach(node => node.clear());
    this.nodes = [];
  }

  /**
   * Split the node into 4 subnodes
   */
  split() {
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;
    const x = this.bounds.x;
    const y = this.bounds.y;
    const nextLevel = this.level + 1;

    // Top-left
    this.nodes[0] = new QuadTree(
      { x, y, width: subWidth, height: subHeight },
      this.maxObjects,
      this.maxLevels,
      nextLevel
    );

    // Top-right
    this.nodes[1] = new QuadTree(
      { x: x + subWidth, y, width: subWidth, height: subHeight },
      this.maxObjects,
      this.maxLevels,
      nextLevel
    );

    // Bottom-left
    this.nodes[2] = new QuadTree(
      { x, y: y + subHeight, width: subWidth, height: subHeight },
      this.maxObjects,
      this.maxLevels,
      nextLevel
    );

    // Bottom-right
    this.nodes[3] = new QuadTree(
      { x: x + subWidth, y: y + subHeight, width: subWidth, height: subHeight },
      this.maxObjects,
      this.maxLevels,
      nextLevel
    );
  }

  /**
   * Determine which node the object belongs to
   * @returns {number} index of the subnode (0-3), or -1 if object doesn't fit
   */
  getIndex(entity) {
    const bounds = entity.getBounds();
    const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
    const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

    const topQuadrant = bounds.top < horizontalMidpoint && bounds.bottom < horizontalMidpoint;
    const bottomQuadrant = bounds.top > horizontalMidpoint;

    if (bounds.left < verticalMidpoint && bounds.right < verticalMidpoint) {
      // Left quadrants
      if (topQuadrant) return 0;
      if (bottomQuadrant) return 2;
    } else if (bounds.left > verticalMidpoint) {
      // Right quadrants
      if (topQuadrant) return 1;
      if (bottomQuadrant) return 3;
    }

    return -1; // Object doesn't fit completely in any quadrant
  }

  /**
   * Insert an entity into the quadtree
   */
  insert(entity) {
    if (!entity || !entity.alive) return;

    // If we have subnodes, try to insert into them
    if (this.nodes.length > 0) {
      const index = this.getIndex(entity);
      if (index !== -1) {
        this.nodes[index].insert(entity);
        return;
      }
    }

    // Otherwise, add to this node
    this.objects.push(entity);

    // Split if necessary
    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      if (this.nodes.length === 0) {
        this.split();
      }

      // Move objects to subnodes
      let i = 0;
      while (i < this.objects.length) {
        const index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  /**
   * Return all objects that could collide with the given entity
   */
  retrieve(entity) {
    const returnObjects = [];

    if (!entity) return returnObjects;

    const index = this.getIndex(entity);

    if (index !== -1 && this.nodes.length > 0) {
      returnObjects.push(...this.nodes[index].retrieve(entity));
    }

    returnObjects.push(...this.objects);

    return returnObjects;
  }

  /**
   * Get total number of objects in tree
   */
  getObjectCount() {
    let count = this.objects.length;
    this.nodes.forEach(node => {
      count += node.getObjectCount();
    });
    return count;
  }
}
