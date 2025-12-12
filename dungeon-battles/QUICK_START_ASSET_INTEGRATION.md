# Quick Start: Asset Integration v2.0

## 5-Minute Integration Guide

### Step 1: Import Systems (30 seconds)

```javascript
import { AssetLoader } from './src/assets/AssetLoader.js';
import { SpriteManager } from './src/assets/SpriteManager.js';
import { AnimationController } from './src/assets/AnimationController.js';
import { EffectSystem } from './src/systems/EffectSystem.js';
import { RenderSystem } from './src/systems/RenderSystem.js';
import { BackgroundGenerator } from './src/assets/BackgroundGenerator.js';
```

### Step 2: Initialize in Game Constructor (1 minute)

```javascript
class Game {
  async init() {
    // 1. Asset Loading
    this.assetLoader = new AssetLoader();
    await this.assetLoader.initialize();

    // Show loading progress
    this.assetLoader.onProgress((stats) => {
      console.log(`Loading: ${stats.progress.toFixed(1)}%`);
    });

    await this.assetLoader.loadAll();

    // 2. Systems
    this.spriteManager = new SpriteManager(this.assetLoader);
    this.animController = new AnimationController();
    this.effectSystem = new EffectSystem();
    this.renderSystem = new RenderSystem(this.canvas);

    // 3. Create sprites (auto-resized!)
    this.sprites = {
      player: this.spriteManager.createSprite('player'),
      enemy1: this.spriteManager.createSprite('enemy_1'),
      enemy2: this.spriteManager.createSprite('enemy_2'),
      enemy3: this.spriteManager.createSprite('enemy_3'),
      enemy4: this.spriteManager.createSprite('enemy_4'),
      boss: this.spriteManager.createSprite('boss')
    };

    // 4. Generate backgrounds
    const bgGen = new BackgroundGenerator(800, 600);
    this.backgrounds = bgGen.generateAll();
  }
}
```

### Step 3: Update Loop (1 minute)

```javascript
update(deltaTime) {
  // Update effects
  this.effectSystem.update(deltaTime);

  // Update animations
  this.animController.update(deltaTime);

  // ... rest of your game logic
}
```

### Step 4: Render Loop (2 minutes)

```javascript
render() {
  this.renderSystem.begin();

  // 1. Render backgrounds (parallax)
  this.backgrounds.forEach(layer => {
    const offsetY = this.scrollY * layer.scrollSpeed;
    this.renderSystem.ctx.drawImage(
      layer.canvas,
      0,
      offsetY % layer.canvas.height - layer.canvas.height
    );
  });

  // 2. Render player
  this.spriteManager.drawSprite(
    this.renderSystem.ctx,
    this.sprites.player,
    this.player.x,
    this.player.y
  );

  // 3. Render enemies
  this.enemies.forEach(enemy => {
    const sprite = this.sprites[`enemy${enemy.type}`];
    this.spriteManager.drawSprite(
      this.renderSystem.ctx,
      sprite,
      enemy.x,
      enemy.y
    );
  });

  // 4. Render effects
  this.effectSystem.render(this.renderSystem.ctx);

  this.renderSystem.end();
}
```

### Step 5: Add Effects (30 seconds)

```javascript
// When enemy dies
onEnemyDeath(x, y) {
  this.effectSystem.spawn('explosion', x, y);
}

// When hit occurs
onHit(x, y) {
  this.effectSystem.spawn('hit', x, y);
}

// When magic is cast
onMagicCast(x, y) {
  this.effectSystem.spawn('magic', x, y);
}
```

---

## That's It! 🎉

Your game now has:
- ✅ Automatic image resizing (any size → optimal size)
- ✅ Placeholder generation (missing images = automatic placeholders)
- ✅ Professional particle effects (6 types included)
- ✅ Procedural dungeon backgrounds (3-layer parallax)
- ✅ 60 FPS optimized rendering
- ✅ Complete animation system

---

## Verification

```javascript
// Check if images loaded or using placeholders
console.log('Player sprite:',
  this.assetLoader.isPlaceholder('player') ? 'Placeholder' : 'Loaded'
);

// Check sprite sizes (should be optimal)
console.log('Player size:', this.sprites.player.width, 'x', this.sprites.player.height);
console.log('Boss size:', this.sprites.boss.width, 'x', this.sprites.boss.height);

// Check performance
const stats = this.renderSystem.getStats();
console.log('FPS:', stats.fps);
console.log('Render calls:', stats.renderCalls);
```

---

## Optional: Advanced Features

### Custom Effects

```javascript
this.effectSystem.registerEffect('myEffect', {
  particleCount: 20,
  lifetime: 800,
  speed: { min: 50, max: 100 },
  size: { min: 3, max: 7 },
  colors: ['#FF0000', '#00FF00'],
  gravity: 50,
  fade: true,
  glow: true
});

this.effectSystem.spawn('myEffect', x, y);
```

### Sprite Animations

```javascript
// Fade in/out
this.animController.createTween(this.sprites.player,
  { alpha: 0 },
  500,
  { easing: 'easeInOutQuad', yoyo: true }
);

// Scale pulse
this.animController.createTween(this.sprites.boss,
  { scale: 1.5 },
  1000,
  { easing: 'easeOutElastic', repeat: Infinity }
);
```

### Debug Mode

```javascript
// Enable debug overlay (shows FPS, render calls, etc.)
this.renderSystem.setDebugMode(true);
```

---

## Image Requirements (All Optional!)

### Option 1: Provide Your Images
Place images here (any size - will auto-resize):
```
assets/sprites/player/player_ship.png     (auto → 64x64)
assets/sprites/enemies/enemy_1.png        (auto → 32x32)
assets/sprites/enemies/enemy_2.png        (auto → 48x48)
assets/sprites/enemies/enemy_3.png        (auto → 48x48)
assets/sprites/enemies/enemy_4.png        (auto → 64x64)
assets/sprites/boss/boss_1.png            (auto → 128x128)
```

### Option 2: Use Placeholders
Don't have images? No problem!
- System generates color-coded placeholders automatically
- Game works perfectly with placeholders
- Replace with real images anytime

---

## Performance Tips

1. **Enable Offscreen Canvas** (smoother rendering):
   ```javascript
   this.renderSystem.initializeOffscreenCanvas();
   ```

2. **Adjust Max Particles** (if needed):
   ```javascript
   this.effectSystem.setMaxParticles(300); // default: 500
   ```

3. **Check Stats**:
   ```javascript
   console.log('Effect stats:', this.effectSystem.getStats());
   console.log('Render stats:', this.renderSystem.getStats());
   ```

---

## Need Help?

- 📖 Full Guide: `docs/ASSET_INTEGRATION_GUIDE.md`
- 📊 Summary: `docs/ASSET_INTEGRATION_SUMMARY.md`
- 🧪 Tests: `tests/asset_integration.test.js`

---

**Integration Time**: 5 minutes
**Lines of Code Required**: ~50 lines
**Dependencies**: None (pure Canvas API)
**Browser Support**: All modern browsers

**Ready to go! 🚀**
