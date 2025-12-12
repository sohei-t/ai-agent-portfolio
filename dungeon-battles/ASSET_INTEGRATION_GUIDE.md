# Asset Integration Guide v2.0

## Overview

This guide explains how to integrate the Asset Integration Agent v2.0 into the Dungeon Battles game.

## New Features

### Automatic Image Resizing
- All images are automatically resized to optimal game dimensions
- High-quality resampling with anti-aliasing
- Multi-pass downscaling for large images
- Aspect ratio preservation

### Placeholder Generation
- Missing images are replaced with procedural placeholders
- Color-coded by entity type
- Labeled for easy identification
- Maintains game balance

## File Structure

```
src/
├── assets/
│   ├── ImageProcessor.js         # Image resizing and optimization
│   ├── AssetLoader.js             # Asset loading with auto-resize
│   ├── SpriteManager.js           # Sprite management and rendering
│   ├── AnimationController.js     # Animation system
│   ├── Particle.js                # Particle class for effects
│   └── BackgroundGenerator.js     # Procedural background generation
└── systems/
    ├── EffectSystem.js            # Visual effects system
    └── RenderSystem.js            # Layer-based rendering
```

## Integration Steps

### Step 1: Initialize Asset Systems

```javascript
import { AssetLoader } from './assets/AssetLoader.js';
import { SpriteManager } from './assets/SpriteManager.js';
import { AnimationController } from './assets/AnimationController.js';
import { EffectSystem } from './systems/EffectSystem.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { BackgroundGenerator } from './assets/BackgroundGenerator.js';

// Initialize systems
const assetLoader = new AssetLoader();
const spriteManager = new SpriteManager(assetLoader);
const animationController = new AnimationController();
const effectSystem = new EffectSystem();
const renderSystem = new RenderSystem(canvas);

// Initialize and load assets
await assetLoader.initialize();

// Show loading progress
assetLoader.onProgress((stats) => {
  console.log(`Loading: ${stats.progress.toFixed(1)}%`);
});

// Load all assets
await assetLoader.loadAll();
```

### Step 2: Create Sprites

```javascript
// Create player sprite (automatically resized to 64x64)
const playerSprite = spriteManager.createSprite('player', {
  scale: 1.0
});

// Create enemy sprites (automatically resized to optimal sizes)
const enemy1Sprite = spriteManager.createSprite('enemy_1', { scale: 1.0 });
const enemy2Sprite = spriteManager.createSprite('enemy_2', { scale: 1.0 });
const enemy3Sprite = spriteManager.createSprite('enemy_3', { scale: 1.0 });
const enemy4Sprite = spriteManager.createSprite('enemy_4', { scale: 1.0 });

// Create boss sprite (automatically resized to 128x128)
const bossSprite = spriteManager.createSprite('boss', { scale: 1.0 });
```

### Step 3: Generate Backgrounds

```javascript
// Generate procedural dungeon backgrounds
const bgGenerator = new BackgroundGenerator(800, 600);
const backgroundLayers = bgGenerator.generateAll();

// Add backgrounds to render system
backgroundLayers.forEach(layer => {
  renderSystem.addToLayer('background', {
    render: (ctx) => {
      // Parallax scrolling
      const offsetY = scrollY * layer.scrollSpeed;
      ctx.drawImage(layer.canvas, 0, offsetY % layer.canvas.height - layer.canvas.height);
      ctx.drawImage(layer.canvas, 0, offsetY % layer.canvas.height);
    }
  });
});
```

### Step 4: Render Entities

```javascript
// In your game loop
function render() {
  renderSystem.begin();

  // Render player
  spriteManager.drawSprite(
    renderSystem.ctx,
    playerSprite,
    player.x,
    player.y
  );

  // Render enemies
  enemies.forEach(enemy => {
    const sprite = spriteManager.getSprite(`enemy_${enemy.type}`);
    spriteManager.drawSprite(renderSystem.ctx, sprite, enemy.x, enemy.y);
  });

  // Render effects
  effectSystem.render(renderSystem.ctx);

  renderSystem.end();
}
```

### Step 5: Add Visual Effects

```javascript
// Spawn explosion when enemy dies
function onEnemyDeath(x, y) {
  effectSystem.spawn('explosion', x, y);
}

// Spawn hit effect when damage is taken
function onHit(x, y) {
  effectSystem.spawn('hit', x, y);
}

// Spawn magic effect for magic attacks
function onMagicAttack(x, y) {
  effectSystem.spawn('magic', x, y);
}

// Update effects in game loop
function update(deltaTime) {
  effectSystem.update(deltaTime);
  animationController.update(deltaTime);
}
```

## Image Size Specifications

### Automatic Resizing

All images are automatically resized to these optimal dimensions:

| Asset Type | Optimal Size | Purpose |
|------------|--------------|---------|
| Player | 64x64px | Main character |
| Enemy Small | 32x32px | Fast enemies (Stage 1) |
| Enemy Medium | 48x48px | Standard enemies (Stage 2-3) |
| Enemy Large | 64x64px | Tough enemies (Stage 4) |
| Boss | 128x128px | Final boss |
| Player Bullet | 8x16px | Normal attack |
| Magic Bullet | 16x16px | Magic attack |
| Enemy Bullet | 12x12px | Enemy projectiles |
| Items | 32x32px | Power-ups |

### How It Works

1. **Image Analysis**: Original image dimensions are detected
2. **Resize Decision**: Determines if resizing is needed (>20% difference)
3. **Quality Resize**: Uses multi-pass algorithm for large downscaling
4. **Caching**: Processed images are cached for performance

### User-Provided Images

Simply place your images in these locations:

```
assets/sprites/
├── player/player_ship.png        # Any size - will be resized to 64x64
├── enemies/
│   ├── enemy_1.png                # Any size - will be resized to 32x32
│   ├── enemy_2.png                # Any size - will be resized to 48x48
│   ├── enemy_3.png                # Any size - will be resized to 48x48
│   └── enemy_4.png                # Any size - will be resized to 64x64
└── boss/boss_1.png                # Any size - will be resized to 128x128
```

**The system will automatically:**
- Detect the original size
- Resize to optimal dimensions
- Preserve transparency
- Maintain high quality
- Generate placeholders if images are missing

## Placeholder System

If images are missing, the system generates color-coded placeholders:

| Entity | Shape | Color | Label |
|--------|-------|-------|-------|
| Player | Triangle | Blue | - |
| Enemy 1 | Circle | Red | E1 |
| Enemy 2 | Circle | Orange | E2 |
| Enemy 3 | Square | Purple | E3 |
| Enemy 4 | Square | Dark Purple | E4 |
| Boss | Hexagon | Dark Red | BOSS |

## Performance Optimization

### Render System Features

1. **Layer-based Rendering**
   - Background, Game, Effects, UI, Debug layers
   - Render in correct order automatically

2. **Viewport Culling**
   - Only renders entities visible on screen
   - Significant performance improvement

3. **60 FPS Target**
   - Optimized rendering pipeline
   - Minimal draw calls

### Effect System Features

1. **Particle Pooling**
   - Reuses particle objects
   - Reduces garbage collection

2. **Effect Types**
   - explosion, hit, spawn, death, magic, sparkle
   - Customizable parameters

## Testing

### Verify Asset Loading

```javascript
// Check loading stats
const stats = assetLoader.getStats();
console.log(`Loaded: ${stats.loaded}/${stats.total}`);
console.log(`Failed: ${stats.failed}`);

// Check for placeholders
if (assetLoader.isPlaceholder('player')) {
  console.warn('Player sprite is using placeholder!');
}
```

### Verify Image Sizes

```javascript
// Check processed sizes
const playerAsset = assetLoader.getAsset('player');
console.log(`Player sprite: ${playerAsset.width}x${playerAsset.height}`);

const bossAsset = assetLoader.getAsset('boss');
console.log(`Boss sprite: ${bossAsset.width}x${bossAsset.height}`);
```

### Performance Monitoring

```javascript
// Enable debug mode
renderSystem.setDebugMode(true);

// Check render stats
const renderStats = renderSystem.getStats();
console.log(`FPS: ${renderStats.fps}`);
console.log(`Render calls: ${renderStats.renderCalls}`);

// Check effect stats
const effectStats = effectSystem.getStats();
console.log(`Active particles: ${effectStats.active}`);
```

## Troubleshooting

### Images Not Loading

1. Check file paths match configuration
2. Verify image format (PNG recommended)
3. Check browser console for errors
4. Verify CORS settings if loading from different domain

### Poor Image Quality

1. Use PNG format for sprites (preserves transparency)
2. Provide images close to optimal size
3. Avoid extreme upscaling (>2x)

### Performance Issues

1. Enable viewport culling
2. Reduce max particles: `effectSystem.setMaxParticles(300)`
3. Use offscreen canvas: `renderSystem.initializeOffscreenCanvas()`
4. Check render stats and optimize

## Advanced Usage

### Custom Effect Types

```javascript
// Register custom effect
effectSystem.registerEffect('custom', {
  particleCount: 15,
  lifetime: 600,
  speed: { min: 30, max: 90 },
  size: { min: 3, max: 7 },
  colors: ['#FF00FF', '#00FFFF'],
  gravity: 0,
  fade: true,
  glow: true
});

// Spawn custom effect
effectSystem.spawn('custom', x, y);
```

### Animation Tweens

```javascript
// Animate sprite position
animationController.createTween(
  sprite,
  { x: 400, y: 300 },
  1000,
  {
    easing: 'easeInOutQuad',
    onComplete: () => console.log('Animation complete!')
  }
);

// Animate sprite scale
animationController.createTween(
  sprite,
  { scale: 2.0 },
  500,
  {
    easing: 'easeOutElastic',
    yoyo: true
  }
);
```

## Summary

The Asset Integration Agent v2.0 provides:

1. **Automatic Image Resizing** - No manual image editing required
2. **Placeholder Generation** - Game works even without all assets
3. **Visual Effects System** - Professional particle effects
4. **High Performance** - 60 FPS maintained
5. **Easy Integration** - Simple API, minimal configuration

Simply provide your images, and the system handles the rest!
