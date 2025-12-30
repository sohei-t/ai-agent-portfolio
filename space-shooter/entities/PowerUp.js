/**
 * PowerUp.js
 * Power-up entities, drops, and pickup mechanics
 */


const POWER_UP_TYPES = {
  RAPID_FIRE: 'RAPID_FIRE',
  SHIELD: 'SHIELD',
  MULTI_SHOT: 'MULTI_SHOT'
};

class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.type = type;
    this.speed = 2;
    this.isActive = true;
    this.duration = Config.powerUps.duration;
  }

  update() {
    this.y += this.speed;
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  deactivate() {
    this.isActive = false;
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  getEffect() {
    return Config.powerUpEffects[this.type];
  }
}

class PowerUpSpawner {
  constructor(canvasHeight) {
    this.dropRate = Config.powerUps.dropRate;
    this.activePowerUps = [];
    this.canvasHeight = canvasHeight;
  }

  shouldDrop() {
    return Math.random() < this.dropRate;
  }

  getRandomType() {
    const types = Config.powerUps.types;
    return types[Math.floor(Math.random() * types.length)];
  }

  spawn(x, y) {
    if (this.shouldDrop()) {
      const powerUp = new PowerUp(x, y, this.getRandomType());
      this.activePowerUps.push(powerUp);
      return powerUp;
    }
    return null;
  }

  update() {
    this.activePowerUps.forEach(powerUp => {
      if (powerUp.isActive) {
        powerUp.update();
        if (powerUp.isOffScreen(this.canvasHeight)) {
          powerUp.isActive = false;
        }
      }
    });
  }

  cleanup() {
    this.activePowerUps = this.activePowerUps.filter(p => p.isActive);
  }

  getActivePowerUps() {
    return this.activePowerUps.filter(p => p.isActive);
  }
}

// Expose to global scope for browser
if (typeof window !== 'undefined') {
  window.POWER_UP_TYPES = POWER_UP_TYPES;
  window.PowerUp = PowerUp;
  window.PowerUpSpawner = PowerUpSpawner;
}

