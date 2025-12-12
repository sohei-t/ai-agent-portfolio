# Dungeon Battles - Game Design Document

## 1. Game Overview

### 1.1 Concept
Dungeon Battles is a vertical scrolling action RPG where players navigate through a ruined dungeon, engaging in real-time 1-on-1 battles with increasingly powerful enemies, culminating in an epic boss fight.

### 1.2 Genre
Vertical Scrolling Action RPG

### 1.3 Platform
Web (PC & Mobile)
- PC: Keyboard controls
- Mobile: Touch controls with virtual joystick and buttons

### 1.4 Core Gameplay Loop
1. Player moves through vertical scrolling dungeon
2. Encounters enemy in 1-on-1 real-time battle
3. Defeats enemy to progress to next area (auto-scroll)
4. Collects items and power-ups
5. Faces increasingly difficult enemies
6. Defeats final boss to complete game

---

## 2. Game Rules

### 2.1 Player Controls

#### PC Controls
- **Arrow Keys**: Movement (Up, Down, Left, Right)
- **Space**: Normal Attack (Attack Power: 10)
- **B Key**: Magic Attack (Attack Power: 20, MP Cost: 10)
- **F1**: Toggle Debug Mode
- **F2**: Toggle Collision Boxes Display
- **F3**: Pause Game
- **F4**: Frame Step (Debug)

#### Mobile Controls
- **Virtual Joystick**: Movement (bottom-left corner)
- **Attack Button**: Normal Attack (bottom-right)
- **Magic Button**: Magic Attack (next to attack button)

### 2.2 Progression System
- **Vertical Scrolling**: Game progresses upward through the dungeon
- **Auto-Scroll Trigger**: When enemy is defeated, screen auto-scrolls to next area
- **Stage Completion**: Clear all 5 stages to win

### 2.3 Battle System
- **Real-Time Combat**: Both player and enemy can attack at any time
- **Attack Types**:
  - Normal Attack: Low damage, no cost, fast cooldown
  - Magic Attack: High damage, MP cost, longer cooldown
- **Damage Calculation**: Direct damage application (no defense stat)
- **Victory Condition**: Reduce enemy HP to 0
- **Defeat Condition**: Player HP reaches 0

### 2.4 Continue System
- **Continues Available**: 3 times per game
- **Continue Effect**: Restore player HP to 100, MP to 50
- **Continue Position**: Current stage (doesn't reset progress)
- **Game Over**: After using all 3 continues

---

## 3. Level Design

### 3.1 Stage Progression

#### Stage 1: Entrance Guardian
- **Enemy**: enemy_1.png
- **HP**: 30
- **Attack Pattern**: Simple linear projectiles
- **Behavior**: Fires straight down at regular intervals
- **Difficulty**: Easy
- **Item Drop**: 50% chance for Weapon Upgrade (+5 attack)

#### Stage 2: Corridor Defender
- **Enemy**: enemy_2.png
- **HP**: 50
- **Attack Pattern**: 2-way diagonal spread shots
- **Behavior**: Alternates between left and right diagonal patterns
- **Difficulty**: Medium
- **Item Drop**: 50% chance for Weapon Upgrade (+5 attack)

#### Stage 3: Chamber Hunter
- **Enemy**: enemy_3.png
- **HP**: 70
- **Attack Pattern**: Homing projectiles
- **Behavior**: Fires tracking bullets that follow player
- **Difficulty**: Medium-Hard
- **Item Drop**: 50% chance for Magic Upgrade (+10 magic attack)

#### Stage 4: Hall Sentinel
- **Enemy**: enemy_4.png
- **HP**: 90
- **Attack Pattern**: Complex composite attacks
- **Behavior**:
  - Phase 1 (HP > 45): Spiral pattern shots
  - Phase 2 (HP ≤ 45): Burst fire + linear shots
- **Difficulty**: Hard
- **Item Drop**: 50% chance for Magic Upgrade (+10 magic attack)

#### Stage 5: Dungeon Lord (Boss)
- **Enemy**: boss_1.png
- **HP**: 300
- **Attack Patterns**:
  - **Pattern A**: 360° radial burst (8 directions)
  - **Pattern B**: Sweeping laser beam
  - **Pattern C**: Triple-shot homing missiles
  - **Pattern D**: Screen-wide wave attack
- **Behavior**:
  - Phase 1 (HP > 200): Patterns A + B, alternating every 5 seconds
  - Phase 2 (HP 100-200): Patterns A + B + C, random selection
  - Phase 3 (HP < 100): All patterns, increased speed
  - **Summon Mechanic**: Spawns 2 minions every 30 seconds
    - Minion HP: 20
    - Minion Attack: Simple straight shots
- **Difficulty**: Very Hard
- **Rewards**:
  - 1000 points base score
  - 500 bonus points if defeated without taking damage

### 3.2 Environmental Design

#### Dungeon Atmosphere
- **Setting**: Ancient ruined dungeon
- **Visual Style**: Dark stone corridors with mystical elements
- **Lighting**: Dim ambient with torch effects
- **Particle Effects**: Dust, magical energy, crumbling debris

#### Background Layers
- **Layer 1**: Far background (slow parallax)
- **Layer 2**: Mid-ground pillars/columns (medium parallax)
- **Layer 3**: Foreground debris (fast parallax)

---

## 4. Game Parameters

### 4.1 Player Statistics
```
Base Stats:
- HP: 100
- MP: 50
- Attack Power: 10
- Magic Attack Power: 20
- Magic Cost: 10 MP per cast
- Movement Speed: 200 px/second
- Attack Cooldown: 0.3 seconds
- Magic Cooldown: 1.0 second
```

### 4.2 Enemy Statistics

| Stage | Enemy | HP | Damage | Fire Rate | Move Speed |
|-------|-------|-----|--------|-----------|------------|
| 1 | enemy_1 | 30 | 10 | 2.0s | 50 px/s |
| 2 | enemy_2 | 50 | 15 | 1.5s | 75 px/s |
| 3 | enemy_3 | 70 | 20 | 1.2s | 100 px/s |
| 4 | enemy_4 | 90 | 25 | 1.0s | 125 px/s |
| 5 (Boss) | boss_1 | 300 | 30 | 0.8s | 150 px/s |
| Boss Minion | minion | 20 | 10 | 2.0s | 100 px/s |

### 4.3 Item System

#### HP Recovery Item
- **Effect**: Restore 30 HP (max 100)
- **Spawn Rate**: 1 per stage, random position
- **Spawn Timing**: 5-15 seconds after stage start
- **Duration**: 10 seconds before disappearing
- **Visual**: Red potion icon

#### MP Recovery Item
- **Effect**: Restore 20 MP (max 50)
- **Spawn Rate**: 1 per stage, random position
- **Spawn Timing**: 5-15 seconds after stage start
- **Duration**: 10 seconds before disappearing
- **Visual**: Blue potion icon

### 4.4 Power-Up System

#### Weapon Upgrade
- **Effect**: +5 Attack Power (permanent for current run)
- **Drop Rate**: 50% from defeated enemies
- **Maximum Stacks**: Unlimited
- **Visual**: Orange weapon icon

#### Magic Upgrade
- **Effect**: +10 Magic Attack Power (permanent for current run)
- **Drop Rate**: 50% from defeated enemies
- **Maximum Stacks**: Unlimited
- **Visual**: Purple spell icon

### 4.5 Scoring System

#### Base Points
- Stage 1 Clear: 100 points
- Stage 2 Clear: 200 points
- Stage 3 Clear: 300 points
- Stage 4 Clear: 400 points
- Boss Defeat: 1000 points

#### Bonus Points
- No Damage Bonus (per stage): 100 points
- Boss No Damage Bonus: 500 points
- Time Bonus: 1 point per second remaining (if time limit exists)

#### Score Multipliers
- Combo System: Consecutive hits without taking damage
  - x1.0: 0-9 hits
  - x1.5: 10-19 hits
  - x2.0: 20+ hits

---

## 5. Visual & Audio Design

### 5.1 Visual Effects

#### Combat Effects
- **Normal Attack Hit**: Small white spark particles
- **Magic Attack Hit**: Large colorful explosion (cyan/purple)
- **Enemy Death**: Red/orange explosion with debris
- **Player Hit**: White flash with red damage indicator
- **Power-Up Collect**: Golden shimmer effect

#### Environmental Effects
- **Dungeon Dust**: Floating particles in background
- **Torch Flames**: Flickering fire effects
- **Scroll Transition**: Smooth vertical pan with fade

### 5.2 UI Elements

#### HUD (Heads-Up Display)
- **Top-Left**: Player HP bar (green), MP bar (blue)
- **Top-Right**: Current score
- **Top-Center**: Stage indicator (1/5, 2/5, etc.)
- **Bottom-Left**: Virtual joystick (mobile only)
- **Bottom-Right**: Attack/Magic buttons (mobile only)

#### Debug Display (F1)
- **FPS Counter**: Current frames per second
- **Entity Count**: Active game objects
- **Collision Boxes**: Red outlines (F2)
- **System Logs**: Recent game events

---

## 6. Technical Specifications

### 6.1 Game Resolution
- **Canvas Size**: 800x600 pixels
- **Aspect Ratio**: 4:3
- **Scaling**: Responsive scaling for different screen sizes

### 6.2 Performance Targets
- **Target FPS**: 60 FPS
- **Maximum Entities**: 200 simultaneous objects
- **Memory Budget**: < 100 MB

### 6.3 File Structure
```
dungeon-battles/
├── index.html
├── css/
│   └── game.css
├── js/
│   ├── core/
│   │   ├── GameCore.js (< 200 lines)
│   │   ├── EntityManager.js
│   │   └── ObjectPool.js
│   ├── systems/
│   │   ├── InputSystem.js
│   │   ├── PhysicsSystem.js
│   │   ├── CollisionSystem.js
│   │   ├── RenderSystem.js
│   │   ├── EffectSystem.js
│   │   └── DebugSystem.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   ├── Bullet.js
│   │   └── Item.js
│   └── states/
│       ├── MenuState.js
│       ├── GameState.js
│       └── GameOverState.js
├── assets/
│   ├── images/
│   ├── audio/
│   └── data/
└── config/
    ├── game_parameters.json
    └── level_progression.json
```

---

## 7. Debug Features

### 7.1 Keyboard Shortcuts
- **F1**: Toggle debug mode on/off
- **F2**: Toggle collision box visualization
- **F3**: Pause/unpause game
- **F4**: Advance one frame (when paused)
- **F5**: Restart current stage
- **F6**: Skip to next stage
- **F7**: Toggle invincibility
- **F8**: Spawn test enemy

### 7.2 Debug Information Display
- FPS and frame time
- Entity count (total, by type)
- Memory usage
- Current game state
- Player stats (HP, MP, position)
- Active collision pairs
- Performance warnings

### 7.3 Debug Console Commands
- `game.debug.godMode(true)` - Enable invincibility
- `game.debug.setHP(value)` - Set player HP
- `game.debug.setMP(value)` - Set player MP
- `game.debug.skipStage()` - Advance to next stage
- `game.debug.spawnEnemy(type)` - Spawn specific enemy
- `game.debug.clearStage()` - Clear all enemies

---

## 8. Success Metrics

### 8.1 Player Experience Goals
- **Accessibility**: New players can complete Stage 1 within 3 attempts
- **Challenge**: Skilled players need 5-10 attempts to beat boss
- **Engagement**: Average session length 10-15 minutes
- **Progression Feel**: Clear sense of getting stronger through upgrades

### 8.2 Technical Performance Goals
- **Load Time**: < 3 seconds on average connection
- **FPS**: Stable 60 FPS on mid-range devices
- **Responsive**: Input lag < 50ms
- **Bug-Free**: No game-breaking bugs in critical path

---

## 9. Future Enhancements (Post-MVP)

### 9.1 Potential Features
- Multiple character classes with different abilities
- Procedurally generated dungeon layouts
- Leaderboard system
- Achievement system
- Additional stages and bosses
- Difficulty modes (Easy, Normal, Hard)
- New weapon types and special attacks
- Mini-bosses between regular stages

### 9.2 Monetization (if applicable)
- Cosmetic skins for player character
- Additional dungeons as DLC
- Premium power-ups (cosmetic only)

---

## 10. Development Priorities

### 10.1 Critical Path (Must-Have)
1. Core game loop (movement, shooting, enemies)
2. Collision detection system
3. All 5 stages with proper progression
4. Basic UI (HP, MP, score)
5. Mobile controls

### 10.2 High Priority (Should-Have)
1. Visual effects for attacks and deaths
2. Item system (HP/MP recovery)
3. Power-up drops (weapon/magic upgrades)
4. Score system with bonuses
5. Continue system

### 10.3 Nice-to-Have
1. Advanced particle effects
2. Background parallax scrolling
3. Sound effects and music
4. Boss summon mechanic
5. Combo system

---

## Document Version
- **Version**: 1.0
- **Last Updated**: 2025-12-11
- **Author**: Game Design Agent
- **Status**: Final
