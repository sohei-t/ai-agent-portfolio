/**
 * ItemBox.js - Item Boxes and Item Types
 * Mario Kart style items with position-based distribution
 */

// Item types with their properties
export const ItemType = {
  BANANA: {
    id: 'banana',
    name: 'Banana',
    emoji: '🍌',
    description: 'Drop behind to spin out opponents',
    rarity: { front: 40, middle: 30, back: 10 }
  },
  GREEN_SHELL: {
    id: 'green_shell',
    name: 'Green Shell',
    emoji: '🟢',
    description: 'Shoots straight, bounces off walls',
    rarity: { front: 30, middle: 25, back: 15 }
  },
  RED_SHELL: {
    id: 'red_shell',
    name: 'Red Shell',
    emoji: '🔴',
    description: 'Homes in on the racer ahead',
    rarity: { front: 5, middle: 20, back: 25 }
  },
  MUSHROOM: {
    id: 'mushroom',
    name: 'Mushroom',
    emoji: '🍄',
    description: 'Speed boost!',
    rarity: { front: 15, middle: 15, back: 20 }
  },
  STAR: {
    id: 'star',
    name: 'Star',
    emoji: '⭐',
    description: 'Invincibility and speed boost',
    rarity: { front: 0, middle: 5, back: 15 }
  },
  LIGHTNING: {
    id: 'lightning',
    name: 'Lightning',
    emoji: '⚡',
    description: 'Shrinks all opponents',
    rarity: { front: 0, middle: 0, back: 10 }
  },
  TRIPLE_MUSHROOM: {
    id: 'triple_mushroom',
    name: 'Triple Mushroom',
    emoji: '🍄🍄🍄',
    description: 'Three speed boosts!',
    rarity: { front: 0, middle: 5, back: 5 }
  }
};

// Get random item based on position
export function getRandomItem(position, totalRacers) {
  // Determine position category (rubber-banding)
  let category;
  const relativePosition = position / totalRacers;

  if (relativePosition <= 0.33) {
    category = 'front'; // 1st-2nd place
  } else if (relativePosition <= 0.66) {
    category = 'middle'; // 3rd place
  } else {
    category = 'back'; // 4th-5th place
  }

  // Calculate total weight for this category
  const items = Object.values(ItemType);
  let totalWeight = 0;

  items.forEach(item => {
    totalWeight += item.rarity[category];
  });

  // Random selection based on weight
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.rarity[category];
    if (random <= 0) {
      return item;
    }
  }

  // Fallback
  return ItemType.BANANA;
}

export class ItemBox {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = true;
    this.respawnTime = 5; // seconds
    this.respawnTimer = 0;
    this.size = 30;
    this.rotation = 0;
    this.bobOffset = Math.random() * Math.PI * 2;
  }

  update(dt) {
    // Rotation animation
    this.rotation += dt * 2;

    // Respawn timer
    if (!this.active) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        this.active = true;
      }
    }
  }

  collect() {
    if (!this.active) return null;

    this.active = false;
    this.respawnTimer = this.respawnTime;

    return true; // Item box was collected
  }

  checkCollision(car) {
    if (!this.active) return false;

    const dx = car.x - this.x;
    const dy = car.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.size + 15; // 15 is approximate car radius
  }

  render(ctx, time) {
    if (!this.active) return;

    ctx.save();
    ctx.translate(this.x, this.y);

    // Bobbing animation
    const bob = Math.sin(time * 3 + this.bobOffset) * 5;
    ctx.translate(0, bob);

    // Rotation
    ctx.rotate(this.rotation);

    // Draw box (question mark cube style)
    const size = this.size;

    // Box shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(-size/2 + 3, -size/2 + 3, size, size);

    // Box gradient
    const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
    gradient.addColorStop(0, '#FFE135');
    gradient.addColorStop(0.5, '#FFB800');
    gradient.addColorStop(1, '#FF8C00');

    ctx.fillStyle = gradient;
    ctx.fillRect(-size/2, -size/2, size, size);

    // Box border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(-size/2, -size/2, size, size);

    // Question mark
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', 0, 0);

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(-size/2 + 2, -size/2 + 2, size/3, size/3);

    ctx.restore();
  }
}

// Dropped items (banana, shells)
export class DroppedItem {
  constructor(x, y, type, direction = 0, ownerId = null) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.direction = direction;
    this.ownerId = ownerId;
    this.active = true;
    this.lifetime = 30; // seconds
    this.speed = type.id === 'green_shell' || type.id === 'red_shell' ? 400 : 0;
    this.target = null; // For red shell homing
    this.bounces = 0;
    this.maxBounces = 5;
  }

  update(dt, track, cars) {
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
      return;
    }

    // Movement for shells
    if (this.speed > 0) {
      // Red shell homing
      if (this.type.id === 'red_shell' && this.target) {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const targetAngle = Math.atan2(dy, dx);

        // Smooth turning
        let angleDiff = targetAngle - this.direction;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        this.direction += angleDiff * 5 * dt;
      }

      // Move
      this.x += Math.cos(this.direction) * this.speed * dt;
      this.y += Math.sin(this.direction) * this.speed * dt;

      // Wall bounce (for green shell)
      if (this.type.id === 'green_shell') {
        if (!track.isOnTrack(this.x, this.y)) {
          // Reflect direction
          const trackAngle = track.getTrackAngle(this.x, this.y);
          this.direction = 2 * trackAngle - this.direction + Math.PI;
          this.bounces++;

          if (this.bounces >= this.maxBounces) {
            this.active = false;
          }
        }
      }

      // Red shell off-track destruction
      if (this.type.id === 'red_shell' && !track.isOnTrack(this.x, this.y)) {
        this.active = false;
      }
    }
  }

  checkCollision(car) {
    if (!this.active) return false;
    if (car.starTime > 0) return false; // Star invincibility

    const dx = car.x - this.x;
    const dy = car.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < 25;
  }

  render(ctx) {
    if (!this.active) return;

    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.type.id === 'banana') {
      // Draw banana
      ctx.fillStyle = '#FFE135';
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 8, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Brown tips
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.arc(-10, -5, 4, 0, Math.PI * 2);
      ctx.arc(10, 5, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type.id === 'green_shell' || this.type.id === 'red_shell') {
      // Draw shell
      ctx.rotate(this.direction);

      const color = this.type.id === 'green_shell' ? '#00FF00' : '#FF0000';

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      // Shell pattern
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner spiral
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }
}
