# Asset Integration Quick Reference
## Dungeon Battles - Vertical Scrolling RPG

This document provides a quick reference for the Asset Requirements Agent deliverables.

---

## Generated Documents

### 1. Asset Requirements Document
**Location**: `docs/asset_requirements.md`

Comprehensive 300+ line document covering:
- Complete asset inventory
- Detailed specifications for all asset types
- Directory structure design
- Size optimization guidelines
- Automatic resize strategy
- Placeholder fallback system
- Loading & validation requirements
- Performance considerations
- Visual style guide
- Testing checklist

### 2. Sprite Specifications (JSON)
**Location**: `config/sprite_specifications.json`

Machine-readable configuration including:
- All sprite definitions with optimal sizes
- Player, enemies, boss specifications
- Bullets, items, effects configurations
- Background and UI element specs
- Placeholder definitions for missing assets
- Animation frame specifications
- Resize settings and algorithms
- Loading strategy (critical/essential/optional)

**Key Features**:
- Required vs optional assets clearly marked
- Optimal sizes for 800x600 canvas
- Placeholder specifications for missing assets
- Animation support for effects

### 3. Asset Sizes Configuration (JSON)
**Location**: `config/asset_sizes.json`

Detailed size recommendations including:
- Size categories (player, enemies, bullets, etc.)
- Recommended and acceptable ranges
- Rationale for each size choice
- Auto-resize rules and thresholds
- Quality settings for resampling
- Performance targets and memory budget
- Validation rules

**Key Features**:
- Performance-optimized sizes
- Flexible acceptable ranges
- Automatic resize logic
- Memory budget tracking

### 4. Asset Checker Script (JavaScript)
**Location**: `scripts/asset_checker.js`

Executable validation script that:
- Checks existence of all defined assets
- Validates critical vs optional assets
- Warns about size mismatches
- Generates detailed reports
- Color-coded terminal output
- Saves report to `docs/asset_check_report.txt`

**Usage**:
```bash
# Run the asset checker
node scripts/asset_checker.js

# Or make it executable and run directly
chmod +x scripts/asset_checker.js
./scripts/asset_checker.js
```

---

## Critical Assets Required

These 6 assets are **REQUIRED** for the game to function:

1. **Player**: `assets/sprites/player/player_ship.png` (64x64px)
2. **Enemy 1**: `assets/sprites/enemies/enemy_1.png` (32x32px)
3. **Enemy 2**: `assets/sprites/enemies/enemy_2.png` (48x48px)
4. **Enemy 3**: `assets/sprites/enemies/enemy_3.png` (48x48px)
5. **Enemy 4**: `assets/sprites/enemies/enemy_4.png` (64x64px)
6. **Boss**: `assets/sprites/boss/boss_1.png` (128x128px)

**Note**: These match the assets specified in `PROJECT_INFO.yaml`:
- `player_ship.png` (player character)
- `enemy_1.png` through `enemy_4.png` (stage enemies)
- `boss_1.png` (final boss)

---

## Directory Structure

The complete asset directory structure has been created:

```
assets/
├── sprites/
│   ├── player/          # Player character sprite
│   ├── enemies/         # Enemy sprites (enemy_1 to enemy_4)
│   ├── boss/            # Boss sprite (boss_1)
│   ├── bullets/         # Projectile sprites
│   └── items/           # Item/powerup sprites
├── backgrounds/
│   ├── dungeon/         # Dungeon background images
│   └── ui/              # Menu/UI backgrounds
├── ui/
│   ├── hud/             # HUD elements (HP/MP bars, score, stage)
│   └── mobile/          # Mobile controls (joystick, buttons)
├── effects/
│   ├── explosion/       # Explosion animation frames
│   ├── hit/             # Hit flash effects
│   ├── spawn/           # Spawn/appearance effects
│   └── magic/           # Magic attack effects
└── audio/               # Sound effects and music
```

---

## Image Size Guidelines

### Recommended Sizes (for 800x600 Canvas)

| Asset Type | Size (px) | Rationale |
|------------|-----------|-----------|
| Player | 64x64 | ~10% of canvas height, clearly visible |
| Enemy Small | 32x32 | Fast enemies, smaller target |
| Enemy Medium | 48x48 | Standard enemy size |
| Enemy Large | 64x64 | Tough enemies, larger hitbox |
| Boss | 128x128 | ~21% of canvas, imposing presence |
| Player Bullet | 8x16 | Small, rapid fire |
| Magic Bullet | 16x16 | Powerful, visible |
| Enemy Bullet | 12x12 | Visible threat, dodgeable |
| Items/Powerups | 32x32 | Noticeable, not obstructive |
| Effects | 48-96 | Satisfying feedback |

---

## Auto-Resize Strategy

The ImageProcessor will automatically handle size optimization:

### When Images Are Too Large (>2x recommended)
- **Action**: Downscale using Lanczos3 algorithm
- **Quality**: High-quality resampling with antialiasing
- **Preserve**: Aspect ratio and transparency

### When Images Are Too Small (<0.5x recommended)
- **Action**: Upscale using bicubic interpolation
- **Limit**: Maximum 2x upscaling to preserve quality
- **Preserve**: Aspect ratio and transparency

### When Images Are Within Range
- **Action**: Use original image
- **Benefit**: No quality loss

---

## Placeholder System

If assets are missing, the system will generate procedural placeholders:

### Player Placeholder
- Shape: Triangle/Arrow pointing up
- Color: Blue (#4A90E2)
- Border: 2px white outline
- Size: 64x64px

### Enemy Placeholders
- Shapes: Circle/Square (varying by tier)
- Colors: Red, Orange, Purple (by enemy number)
- Labels: "E1", "E2", "E3", "E4"
- Sizes: Based on enemy tier

### Boss Placeholder
- Shape: Large hexagon
- Color: Dark Red (#C0392B)
- Border: 4px glowing red outline
- Label: "BOSS"
- Size: 128x128px

### Effect Placeholders
- Explosion: Expanding circles with fade
- Hit: Flash effect
- Spawn: Growing ring
- Magic: Particle burst

**Console Warning**: All placeholder usage is logged to help identify missing assets.

---

## Integration with Asset Integration Agent

The Asset Integration Agent should:

1. **Read these specifications**:
   - `config/sprite_specifications.json`
   - `config/asset_sizes.json`

2. **Run the asset checker**:
   ```bash
   node scripts/asset_checker.js
   ```

3. **Implement ImageProcessor class** with:
   - Auto-resize functionality
   - High-quality resampling (Lanczos/bicubic)
   - Aspect ratio preservation
   - Transparency support
   - Placeholder generation for missing assets

4. **Create AssetLoader class** with:
   - Priority-based loading (critical → essential → optional)
   - Progress tracking
   - Error handling with fallbacks
   - Caching of processed images

5. **Implement placeholder generators**:
   - Procedural shapes using Canvas API
   - Console warnings for missing assets
   - Easy replacement when real assets arrive

---

## Performance Targets

### Memory Budget: 50MB Total
- Sprites: ~5MB
- Backgrounds: ~10MB
- Effects: ~15MB
- UI: ~5MB
- Audio: ~15MB

### Loading Targets
- Critical assets: < 2 seconds
- All assets: < 5 seconds
- Target FPS: 60

---

## Testing Checklist

Before integration is complete:

- [ ] All critical assets load successfully
- [ ] Images display at correct sizes
- [ ] Transparency works correctly
- [ ] Auto-resize produces quality results
- [ ] Placeholders generate for missing assets
- [ ] Performance maintains 60 FPS
- [ ] Visual clarity on dark backgrounds
- [ ] Mobile UI elements are touch-friendly
- [ ] Asset checker script runs without errors
- [ ] All console warnings are appropriate

---

## Next Steps for Asset Integration Agent

1. **Implement ImageProcessor class**:
   - Use Canvas API for client-side resizing
   - Reference `config/asset_sizes.json` for optimal sizes
   - Apply resize rules from specifications

2. **Create AssetLoader class**:
   - Load assets based on priority (critical first)
   - Handle missing assets with placeholders
   - Cache processed images

3. **Implement placeholder generators**:
   - Create procedural shapes matching specifications
   - Log warnings for missing assets

4. **Create SpriteManager**:
   - Manage loaded/processed sprites
   - Provide easy access to sprite objects
   - Handle animations for effects

5. **Test with asset_checker.js**:
   - Verify all critical assets can be loaded
   - Ensure placeholders work for optional assets
   - Validate sizes are optimized

---

## Document Version

**Version**: 1.0
**Created**: 2025-12-11
**Created By**: Asset Requirements Agent
**Purpose**: Quick reference for asset integration implementation
