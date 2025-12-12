# Dungeon Battles - Debug Features Specification

## Overview
This document specifies all debugging tools and features built into Dungeon Battles, following the principle that debug capabilities should be included from day 1, not added later.

---

## 1. Debug System Architecture

### 1.1 Core Components
```javascript
class DebugSystem {
  // State
  enabled: boolean = true
  showCollisionBoxes: boolean = false
  showFPS: boolean = true
  showEntityCount: boolean = true
  showPerformance: boolean = true
  paused: boolean = false
  stepFrame: boolean = false
  godMode: boolean = false

  // Logs
  logs: Array<DebugLog> = []
  maxLogs: number = 50

  // Performance tracking
  frameTimeHistory: number[] = []
  maxFrameTimeHistory: number = 60
}
```

### 1.2 File Location
- **File**: `js/systems/DebugSystem.js`
- **Size Limit**: ≤ 500 lines
- **Dependencies**: None (standalone system)

---

## 2. Keyboard Shortcuts

### 2.1 Primary Debug Controls

| Key | Function | Description |
|-----|----------|-------------|
| **F1** | Toggle Debug Mode | Enable/disable all debug features |
| **F2** | Toggle Collision Boxes | Show/hide collision boundary boxes |
| **F3** | Pause Game | Pause/unpause game loop |
| **F4** | Frame Step | Advance exactly 1 frame (when paused) |
| **F5** | Restart Stage | Reload current stage from beginning |
| **F6** | Skip Stage | Advance to next stage immediately |
| **F7** | Toggle God Mode | Enable/disable player invincibility |
| **F8** | Spawn Test Enemy | Spawn a test enemy at mouse position |
| **F9** | Toggle Performance | Show/hide detailed performance metrics |
| **F10** | Save Debug State | Export current game state to console |
| **F11** | Toggle Fullscreen | Enter/exit fullscreen mode |
| **F12** | Open Dev Console | (Browser default) |

### 2.2 Advanced Debug Shortcuts

| Key Combo | Function | Description |
|-----------|----------|-------------|
| **Ctrl+D** | Dump State | Log entire game state to console |
| **Ctrl+R** | Reload Config | Hot-reload game_parameters.json |
| **Ctrl+Shift+C** | Clear Console | Clear debug log history |
| **Ctrl+Shift+E** | Export Log | Download debug log as .txt file |

---

## 3. Visual Debug Overlays

### 3.1 Collision Box Visualization (F2)

#### Display Rules
- **Player**: Green rectangle outline (2px)
- **Enemies**: Red rectangle outline (2px)
- **Bullets**: Yellow rectangle outline (1px)
- **Items/Powerups**: Blue rectangle outline (2px)
- **QuadTree Bounds**: White dashed rectangle (1px, opacity 0.3)

#### Information Labels
- Entity ID (top-left of box)
- Entity type (top-center of box)
- HP (if applicable, bottom-center of box)

#### Example Rendering
```javascript
if (debugSystem.showCollisionBoxes) {
  ctx.strokeStyle = entity.type === 'player' ? '#00ff00' : '#ff0000';
  ctx.lineWidth = 2;
  ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);

  ctx.fillStyle = '#ffffff';
  ctx.font = '10px monospace';
  ctx.fillText(`#${entity.id} ${entity.type}`, entity.x, entity.y - 5);

  if (entity.hp !== undefined) {
    ctx.fillText(`HP: ${entity.hp}`, entity.x, entity.y + entity.height + 12);
  }
}
```

### 3.2 FPS Display (Default ON)

#### Display Location
- **Position**: Top-left corner (10, 20)
- **Font**: 16px monospace
- **Color**: White with black shadow for readability

#### Information Shown
- Current FPS
- Average FPS (last 60 frames)
- Frame time (ms)
- Frame time graph (last 60 frames)

#### Example Display
```
FPS: 60 (avg: 59.8)
Frame Time: 16.7ms
[Mini graph showing frame time history]
```

### 3.3 Entity Count Display (Default ON)

#### Display Location
- **Position**: Top-left corner (10, 45)
- **Font**: 14px monospace
- **Color**: White

#### Information Shown
- Total entity count
- Breakdown by type (Player, Enemy, Bullet, Item, Particle)

#### Example Display
```
Entities: 87
  Player: 1
  Enemy: 1
  Bullets: 15
  Items: 2
  Particles: 68
```

### 3.4 Performance Metrics (F9)

#### Display Location
- **Position**: Top-right corner
- **Font**: 12px monospace
- **Color**: Yellow

#### Information Shown
```
=== PERFORMANCE ===
Update Time: 5.2ms
Render Time: 8.1ms
Collision Checks: 342
QuadTree Depth: 3
Memory: ~45 MB
Pool Usage:
  Bullets: 23/100
  Particles: 168/500
  Enemies: 1/10
```

### 3.5 System State Display (Always visible when debug enabled)

#### Display Location
- **Position**: Bottom-left corner
- **Font**: 12px monospace
- **Color**: Cyan

#### Information Shown
```
State: PlayState
Stage: 3/5
Score: 1850
Player HP: 75/100
Player MP: 30/50
Combo: 12x (1.5x multiplier)
```

---

## 4. Debug Console Commands

### 4.1 Access Method
Browser console: Open with F12, type commands

### 4.2 Available Commands

#### Game State Manipulation
```javascript
// Enable/disable god mode
game.debug.godMode(true);  // Player invincible
game.debug.godMode(false); // Normal mode

// Set player stats
game.debug.setHP(100);     // Set HP to 100
game.debug.setMP(50);      // Set MP to 50
game.debug.setAttack(50);  // Set attack power to 50
game.debug.setMagic(100);  // Set magic power to 100

// Stage control
game.debug.skipStage();    // Advance to next stage
game.debug.restartStage(); // Restart current stage
game.debug.goToStage(3);   // Jump to specific stage

// Enemy spawning
game.debug.spawnEnemy('enemy_1');     // Spawn specific enemy type
game.debug.spawnEnemy('boss_1');      // Spawn boss
game.debug.spawnEnemyAt(400, 200, 'enemy_2'); // Spawn at position

// Clear entities
game.debug.clearEnemies();   // Remove all enemies
game.debug.clearBullets();   // Remove all bullets
game.debug.clearItems();     // Remove all items
game.debug.clearAll();       // Clear everything except player
```

#### Item/Powerup Spawning
```javascript
// Spawn items
game.debug.spawnItem('hp_potion', 400, 300);
game.debug.spawnItem('mp_potion', 500, 300);
game.debug.spawnPowerup('weapon_upgrade', 400, 400);
game.debug.spawnPowerup('magic_upgrade', 500, 400);
```

#### Performance Analysis
```javascript
// Get performance report
game.debug.getPerformanceReport();

// Log collision statistics
game.debug.getCollisionStats();

// Memory usage
game.debug.getMemoryUsage();

// Entity details
game.debug.listEntities();           // List all entities
game.debug.getEntityById(42);        // Get specific entity
game.debug.getEntitiesByType('enemy'); // Filter by type
```

#### Visual Settings
```javascript
// Toggle visual debug features
game.debug.toggleCollisionBoxes();
game.debug.toggleFPS();
game.debug.toggleEntityCount();
game.debug.togglePerformance();

// Set custom colors
game.debug.setCollisionColor('player', '#00ff00');
game.debug.setCollisionColor('enemy', '#ff0000');
```

#### Data Export
```javascript
// Export game state
game.debug.exportState();        // Log to console
game.debug.downloadState();      // Download as JSON

// Export logs
game.debug.downloadLogs();       // Download debug logs as .txt

// Screenshot (canvas capture)
game.debug.screenshot();         // Download canvas as PNG
```

---

## 5. Debug Logging System

### 5.1 Log Levels
```javascript
enum LogLevel {
  DEBUG = 0,   // Verbose development info
  INFO = 1,    // General information
  WARN = 2,    // Warning messages
  ERROR = 3,   // Error messages
  CRITICAL = 4 // Critical failures
}
```

### 5.2 Log Methods
```javascript
debugSystem.log('Player took damage', LogLevel.INFO);
debugSystem.warn('Low FPS detected');
debugSystem.error('Asset loading failed');
debugSystem.critical('Collision system crashed');
```

### 5.3 Log Display
- **Max Logs Shown**: 5 most recent
- **Position**: Bottom-left corner (above system state)
- **Format**: `[timestamp] [level] message`
- **Color Coding**:
  - DEBUG: Gray
  - INFO: White
  - WARN: Yellow
  - ERROR: Orange
  - CRITICAL: Red

#### Example Display
```
[1234.56] INFO: Stage 3 started
[1235.12] WARN: FPS dropped to 45
[1235.89] INFO: Enemy defeated
[1236.45] DEBUG: QuadTree rebuilt (depth: 3)
[1237.02] INFO: Player collected HP potion
```

---

## 6. Pause & Frame Stepping

### 6.1 Pause Mode (F3)

#### Behavior
- Game loop stops updating
- Render continues (frozen frame)
- Input still captured (for frame step)
- Display "PAUSED" overlay (center screen)

#### Overlay Design
```
╔═══════════════════════════════════╗
║           GAME PAUSED             ║
║                                   ║
║   F3: Resume                      ║
║   F4: Advance 1 Frame             ║
║   ESC: Return to Menu             ║
╚═══════════════════════════════════╝
```

### 6.2 Frame Step Mode (F4)

#### Behavior
- Only works when paused
- Advances game exactly 1 frame (16.67ms @ 60fps)
- Re-renders screen
- Returns to paused state

#### Use Case
- Analyze collision detection frame-by-frame
- Debug timing issues
- Study enemy AI patterns

---

## 7. God Mode (F7)

### 7.1 Features
- Player takes no damage
- Infinite MP (no magic cost)
- No collision damage from enemies or bullets
- Visual indicator: Golden aura around player

### 7.2 Limitations
- Does NOT auto-kill enemies
- Does NOT skip stages automatically
- Can still collect items (for testing)

### 7.3 Visual Indicator
```javascript
if (player.godMode) {
  // Draw golden aura
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#ffdd00';
  ctx.beginPath();
  ctx.arc(player.x + player.width/2, player.y + player.height/2,
          player.width, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Display "GOD MODE" text
  ctx.fillStyle = '#ffdd00';
  ctx.font = 'bold 12px monospace';
  ctx.fillText('GOD MODE', player.x, player.y - 10);
}
```

---

## 8. Test Scenarios

### 8.1 Built-in Test Scenarios

#### Scenario 1: Collision Test
```javascript
game.debug.runScenario('collision_test');
// Spawns grid of enemies and fires bullets in all directions
```

#### Scenario 2: Performance Stress Test
```javascript
game.debug.runScenario('stress_test');
// Spawns 200 entities to test max load
```

#### Scenario 3: Boss Battle Test
```javascript
game.debug.runScenario('boss_test');
// Jumps to boss stage with full HP/MP
```

#### Scenario 4: Item Collection Test
```javascript
game.debug.runScenario('item_test');
// Spawns all item types on screen
```

---

## 9. Error Visualization

### 9.1 Error Overlay
When critical errors occur, display full-screen overlay:

```
╔════════════════════════════════════════╗
║         CRITICAL ERROR                 ║
║                                        ║
║  CollisionSystem.update() failed       ║
║  TypeError: Cannot read 'x' of null   ║
║                                        ║
║  Stack Trace:                          ║
║    at CollisionSystem.update (L142)   ║
║    at GameCore.update (L87)           ║
║    at gameLoop (L23)                  ║
║                                        ║
║  Press F5 to reload                    ║
╚════════════════════════════════════════╝
```

### 9.2 Warning Indicators
- **Low FPS Warning**: Yellow border around screen if FPS < 30
- **Memory Warning**: Red text if memory usage > 80MB
- **Entity Limit Warning**: Orange text if entities > 180

---

## 10. Hot Reload Configuration

### 10.1 Supported Files
- `config/game_parameters.json`
- `config/level_progression.json`

### 10.2 Reload Method
```javascript
// In console
game.debug.reloadConfig();

// Or keyboard shortcut
Ctrl + R
```

### 10.3 What Gets Updated
- Player stats (HP, MP, attack, etc.)
- Enemy stats (HP, damage, speed, etc.)
- Item values
- Effect parameters
- Does NOT reload: JavaScript code, assets

---

## 11. Performance Profiling

### 11.1 Built-in Profiler
```javascript
game.debug.startProfiling();
// ... play game for 60 seconds ...
game.debug.stopProfiling();
game.debug.getProfilingReport();
```

### 11.2 Profiling Report
```
=== PROFILING REPORT (60s) ===
Average FPS: 59.2
Min FPS: 42
Max FPS: 60

System Performance:
  InputSystem:     0.5ms avg
  PhysicsSystem:   2.1ms avg
  CollisionSystem: 4.8ms avg (slowest)
  RenderSystem:    6.2ms avg
  EffectSystem:    1.3ms avg

Collision Checks:
  Total: 1,234,567
  Avg per frame: 342
  QuadTree Efficiency: 87%

Memory:
  Avg Usage: 48 MB
  Peak Usage: 62 MB
  GC Pauses: 12 (avg 8ms)
```

---

## 12. Implementation Checklist

### Phase 1: Core Debug System
- [ ] DebugSystem class created
- [ ] Keyboard shortcuts registered (F1-F12)
- [ ] Basic overlay rendering (FPS, entity count)

### Phase 2: Visual Debug Tools
- [ ] Collision box rendering
- [ ] Performance metrics display
- [ ] Log display system

### Phase 3: Console Commands
- [ ] State manipulation commands
- [ ] Spawning commands
- [ ] Export/download commands

### Phase 4: Advanced Features
- [ ] Pause & frame step
- [ ] God mode
- [ ] Test scenarios
- [ ] Hot reload configuration

### Phase 5: Profiling & Analytics
- [ ] Performance profiler
- [ ] Memory tracking
- [ ] Error visualization

---

## 13. Best Practices

### 13.1 Debug Code Organization
```javascript
// ❌ BAD: Debug code mixed with game logic
class Player {
  update() {
    if (debugMode) console.log('updating player');
    this.x += this.vx;
    if (debugMode) console.log('new x:', this.x);
  }
}

// ✅ GOOD: Debug code in separate system
class Player {
  update() {
    this.x += this.vx;
  }
}

class DebugSystem {
  logPlayerUpdate(player) {
    if (this.enabled) {
      this.log(`Player update: x=${player.x}, vx=${player.vx}`);
    }
  }
}
```

### 13.2 Performance Impact
- Debug rendering should add < 5ms to frame time
- Disable heavy debug features in production build
- Use conditional compilation or build flags

### 13.3 User Experience
- Debug UI should not obstruct gameplay
- Use semi-transparent overlays
- Provide easy toggle (F1) to hide everything

---

## 14. Production Build

### 14.1 Debug Features in Production
- **Keep**: Basic error logging, crash reporting
- **Remove**: Console commands, god mode, frame step
- **Optional**: FPS display (user preference)

### 14.2 Build Flags
```javascript
const DEBUG_MODE = process.env.NODE_ENV === 'development';

if (DEBUG_MODE) {
  // Enable all debug features
  debugSystem.enabled = true;
} else {
  // Production mode
  debugSystem.enabled = false;
  debugSystem.allowConsoleCommands = false;
}
```

---

## Version History
- **v1.0** - Initial debug features specification (2025-12-11)
