# Asset Requirements Document
## Dungeon Battles - Vertical Scrolling RPG

### Project Overview
**Game Type**: Vertical Scrolling RPG
**Platform**: Web (PC & Mobile)
**Rendering**: HTML5 Canvas (800x600px)
**Theme**: Ruined Dungeon Exploration with Real-time Battle

---

## 1. Asset Inventory

### 1.1 Player Character Assets
| Asset Name | File Path | Required | Status |
|------------|-----------|----------|--------|
| Player Sprite | `assets/sprites/player/player_ship.png` | Yes | Required |

**Specifications:**
- Recommended Size: 64x64px
- Format: PNG (transparent background)
- Purpose: Player character visual representation
- Animation: Static or single-frame (expandable to multi-frame later)

### 1.2 Enemy Character Assets
| Asset Name | File Path | Required | Stage |
|------------|-----------|----------|-------|
| Enemy 1 | `assets/sprites/enemies/enemy_1.png` | Yes | Stage 1 (HP: 30) |
| Enemy 2 | `assets/sprites/enemies/enemy_2.png` | Yes | Stage 2 (HP: 50) |
| Enemy 3 | `assets/sprites/enemies/enemy_3.png` | Yes | Stage 3 (HP: 70) |
| Enemy 4 | `assets/sprites/enemies/enemy_4.png` | Yes | Stage 4 (HP: 90) |

**Specifications:**
- Recommended Sizes:
  - Small enemies: 32x32px
  - Medium enemies: 48x48px
  - Large enemies: 64x64px
- Format: PNG (transparent background)
- Purpose: Stage enemy visual representation

### 1.3 Boss Character Assets
| Asset Name | File Path | Required | Stage |
|------------|-----------|----------|-------|
| Boss | `assets/sprites/boss/boss_1.png` | Yes | Boss Stage (HP: 300) |

**Specifications:**
- Recommended Size: 128x128px
- Format: PNG (transparent background)
- Purpose: Final boss visual representation
- Features: Should appear imposing and dangerous

### 1.4 Background Assets
| Asset Name | File Path | Purpose |
|------------|-----------|---------|
| Dungeon Background | `assets/backgrounds/dungeon/dungeon_bg.png` | Main game background |
| Menu Background | `assets/backgrounds/ui/menu_bg.png` | Title/menu screen |

**Specifications:**
- Canvas Size: 800x600px
- Format: PNG or JPEG
- Theme: Dark ruined dungeon (stone walls, debris, atmospheric)
- Color Palette: Dark grays, browns, dim lighting
- Scrolling: Vertical parallax scrolling capability

### 1.5 UI/HUD Assets
| Asset Name | Purpose | Dimensions |
|------------|---------|------------|
| HP Bar (Empty) | Health display background | 200x20px |
| HP Bar (Fill) | Health indicator | 200x20px |
| MP Bar (Empty) | Magic points background | 200x20px |
| MP Bar (Fill) | Magic indicator | 200x20px |
| Score Display Panel | Score background | 150x40px |
| Stage Number Panel | Stage indicator | 100x30px |
| Button Frame | UI button base | 120x40px |

**Specifications:**
- Format: PNG (transparent where needed)
- Style: Medieval/fantasy theme
- Colors: Compatible with dark dungeon theme

### 1.6 Mobile UI Assets
| Asset Name | Purpose | Dimensions |
|------------|---------|------------|
| Virtual Joystick Base | Joystick background | 100x100px |
| Virtual Joystick Stick | Movable joystick | 50x50px |
| Attack Button | Normal attack trigger | 80x80px |
| Magic Button | Magic attack trigger | 80x80px |

**Specifications:**
- Format: PNG (semi-transparent)
- Style: Clear, visible on dark background
- Touch-friendly: Large enough for touch input

### 1.7 Effect Assets
| Effect Type | Purpose | Dimensions | Frames |
|-------------|---------|------------|--------|
| Explosion | Enemy death effect | 64x64px | 4-8 frames |
| Hit Flash | Damage indicator | 48x48px | 2-4 frames |
| Spawn Effect | Enemy appearance | 48x48px | 3-5 frames |
| Death Effect | Player death | 64x64px | 4-8 frames |
| Attack Trail | Normal attack visual | 32x32px | 3-4 frames |
| Magic Burst | Magic attack effect | 96x96px | 6-10 frames |

**Specifications:**
- Format: PNG (transparent background)
- Style: Bright, visible effects
- Animation: Sprite sheet or individual frames

### 1.8 Projectile Assets
| Asset Name | Purpose | Dimensions |
|------------|---------|------------|
| Player Bullet (Normal) | Normal attack projectile | 8x16px |
| Player Magic Bullet | Magic attack projectile | 16x16px |
| Enemy Bullet | Enemy attack projectile | 12x12px |

**Specifications:**
- Format: PNG (transparent background)
- Style: Glowing/energy effect
- Colors: Player (blue/white), Enemy (red/orange)

### 1.9 Item Assets
| Asset Name | Purpose | Dimensions |
|------------|---------|------------|
| HP Potion | Health recovery | 32x32px |
| MP Potion | Magic recovery | 32x32px |
| Weapon Upgrade | Attack power increase | 32x32px |
| Magic Upgrade | Magic power increase | 32x32px |

**Specifications:**
- Format: PNG (transparent background)
- Style: Medieval fantasy items
- Visual Clarity: Easily distinguishable from each other

---

## 2. Directory Structure

```
assets/
├── sprites/
│   ├── player/
│   │   └── player_ship.png          [64x64px]
│   ├── enemies/
│   │   ├── enemy_1.png              [32-48px]
│   │   ├── enemy_2.png              [32-48px]
│   │   ├── enemy_3.png              [48-64px]
│   │   └── enemy_4.png              [48-64px]
│   ├── boss/
│   │   └── boss_1.png               [128x128px]
│   ├── bullets/
│   │   ├── player_normal.png        [8x16px]
│   │   ├── player_magic.png         [16x16px]
│   │   └── enemy_bullet.png         [12x12px]
│   └── items/
│       ├── hp_potion.png            [32x32px]
│       ├── mp_potion.png            [32x32px]
│       ├── weapon_upgrade.png       [32x32px]
│       └── magic_upgrade.png        [32x32px]
├── backgrounds/
│   ├── dungeon/
│   │   ├── dungeon_bg.png           [800x600px]
│   │   └── dungeon_parallax.png     [800x1200px]
│   └── ui/
│       └── menu_bg.png              [800x600px]
├── ui/
│   ├── hud/
│   │   ├── hp_bar_empty.png         [200x20px]
│   │   ├── hp_bar_fill.png          [200x20px]
│   │   ├── mp_bar_empty.png         [200x20px]
│   │   ├── mp_bar_fill.png          [200x20px]
│   │   ├── score_panel.png          [150x40px]
│   │   └── stage_panel.png          [100x30px]
│   └── mobile/
│       ├── joystick_base.png        [100x100px]
│       ├── joystick_stick.png       [50x50px]
│       ├── attack_button.png        [80x80px]
│       └── magic_button.png         [80x80px]
├── effects/
│   ├── explosion/
│   │   ├── explosion_01.png         [64x64px]
│   │   ├── explosion_02.png
│   │   └── ...
│   ├── hit/
│   │   ├── hit_01.png               [48x48px]
│   │   └── hit_02.png
│   ├── spawn/
│   │   ├── spawn_01.png             [48x48px]
│   │   ├── spawn_02.png
│   │   └── ...
│   └── magic/
│       ├── magic_burst_01.png       [96x96px]
│       ├── magic_burst_02.png
│       └── ...
└── audio/
    ├── bgm/
    │   ├── stage_1.mp3
    │   └── boss_battle.mp3
    └── sfx/
        ├── attack.mp3
        ├── hit.mp3
        ├── explosion.mp3
        └── item_get.mp3
```

---

## 3. Asset Size Optimization Guidelines

### 3.1 Size Rationale (Canvas: 800x600px)

**Player Character (64x64px)**
- Ratio: ~10.6% of canvas height
- Visibility: Clearly visible without being overwhelming
- Gameplay: Allows precise movement and dodging

**Enemies**
- Small (32x32px): Quick, agile enemies
- Medium (48x48px): Standard enemies
- Large (64x64px): Tough, slow enemies

**Boss (128x128px)**
- Ratio: ~21% of canvas height
- Impact: Imposing and challenging appearance
- Gameplay: Large hitbox for epic battle feel

**Projectiles**
- Player Normal (8x16px): Small, rapid fire
- Player Magic (16x16px): Powerful, visible
- Enemy (12x12px): Threatening but dodgeable

### 3.2 Automatic Resize Strategy

When user-provided images don't match optimal sizes:

1. **Analyze Original Dimensions**
   - Detect actual image size
   - Calculate aspect ratio
   - Determine optimal target size

2. **Intelligent Resizing**
   - Preserve aspect ratio
   - Use high-quality resampling
   - Apply anti-aliasing
   - Maintain transparency

3. **Quality Preservation**
   - Downscaling: Use Lanczos filter
   - Upscaling: Limit to 2x maximum
   - Sharpening: Apply minimal sharpening after resize

4. **Fallback Strategy**
   - If image too small: Use original size with warning
   - If image too large: Resize to optimal
   - If missing: Generate colored placeholder

---

## 4. Placeholder Asset Strategy

### 4.1 When Assets Are Missing

If specified assets are not found, generate procedural placeholders:

**Player**
```
- Shape: Triangle/Arrow pointing up
- Color: Blue (#4A90E2)
- Size: 64x64px
- Border: 2px white outline
```

**Enemies**
```
- Shape: Circle/Square (varying by enemy number)
- Colors: Red (#E74C3C), Orange (#E67E22), Purple (#9B59B6)
- Size: Based on enemy tier
- Label: Enemy number displayed
```

**Boss**
```
- Shape: Large hexagon
- Color: Dark Red (#C0392B)
- Size: 128x128px
- Border: 4px glowing red outline
- Label: "BOSS" text
```

**Effects**
```
- Explosion: Expanding circles with fade
- Hit: Flash effect
- Spawn: Growing ring
```

### 4.2 Placeholder Implementation

Create placeholder assets using Canvas API:
- Ensure consistent visual style
- Make them easily replaceable
- Add visual indicator they're placeholders
- Log warnings in console

---

## 5. Asset Loading & Validation

### 5.1 Required Asset Check

**Critical Assets (Must Exist)**
1. Player sprite (player_ship.png)
2. All 4 enemy sprites (enemy_1-4.png)
3. Boss sprite (boss_1.png)

**Optional Assets (Fallback Available)**
- Backgrounds
- UI elements
- Effects
- Audio

### 5.2 Loading Priority

**Phase 1: Critical (Blocks game start)**
- Player sprite
- Enemy sprites
- Boss sprite

**Phase 2: Essential (Shows loading bar)**
- Backgrounds
- Bullets
- UI elements

**Phase 3: Enhanced (Loads in background)**
- Effects
- Audio
- Optional visuals

### 5.3 Error Handling

```javascript
assetLoadingStrategy = {
  onMissing: "Use placeholder and log warning",
  onCorrupted: "Skip asset and use placeholder",
  onTimeout: "Retry 3 times, then use placeholder",
  onComplete: "Verify all critical assets loaded"
}
```

---

## 6. Image Processing Requirements

### 6.1 Auto-Resize Specifications

**ImageProcessor Class Features:**
- Detect source image dimensions
- Calculate optimal target size
- Preserve aspect ratio
- Apply high-quality resampling
- Maintain alpha transparency
- Cache processed images

### 6.2 Supported Operations

1. **Resize**
   - Downscale: For oversized assets
   - Upscale: For undersized assets (limited)
   - Maintain ratio: Fit within bounds

2. **Format Conversion**
   - Input: PNG, JPEG, WebP
   - Output: PNG (for transparency)

3. **Optimization**
   - Remove unnecessary metadata
   - Compress without quality loss
   - Convert to optimal bit depth

---

## 7. Performance Considerations

### 7.1 Memory Management

**Total Asset Memory Budget: ~50MB**
- Sprites: ~5MB
- Backgrounds: ~10MB
- Effects: ~15MB
- UI: ~5MB
- Audio: ~15MB

### 7.2 Loading Optimization

- Use sprite sheets where possible
- Lazy load non-critical assets
- Cache processed images
- Preload next stage assets

---

## 8. Visual Style Guide

### 8.1 Color Palette

**Dungeon Theme**
- Primary: Dark Gray (#2C3E50)
- Secondary: Brown (#8B4513)
- Accent: Dim Blue (#34495E)

**Player Theme**
- Primary: Blue (#3498DB)
- Glow: White (#FFFFFF)

**Enemy Theme**
- Small Enemies: Red (#E74C3C)
- Medium Enemies: Orange (#E67E22)
- Large Enemies: Purple (#9B59B6)
- Boss: Dark Red (#C0392B)

**Effects**
- Explosion: Orange to Red gradient
- Hit: White flash
- Magic: Blue/Cyan glow

### 8.2 Visual Consistency

- All sprites should have clear outlines
- Consistent lighting direction (top-left)
- Similar art style across all assets
- Readable at small sizes

---

## 9. Accessibility Considerations

### 9.1 Visual Clarity

- High contrast between sprites and background
- Clear differentiation between player and enemies
- Visible UI elements on dark background
- Colorblind-friendly palette options

### 9.2 Size Recommendations

- Minimum sprite size: 32x32px (for visibility)
- Maximum sprite size: 128x128px (for performance)
- Touch targets: Minimum 80x80px (for mobile)

---

## 10. Testing & Validation Checklist

- [ ] All critical assets load successfully
- [ ] Images display at correct sizes
- [ ] Transparency works correctly
- [ ] Performance is acceptable (60 FPS)
- [ ] Visual clarity on all backgrounds
- [ ] Mobile UI elements are touch-friendly
- [ ] Effects are visible but not overwhelming
- [ ] Placeholder system works for missing assets

---

## Document Version
**Version**: 1.0
**Last Updated**: 2025-12-11
**Created By**: Asset Requirements Agent
