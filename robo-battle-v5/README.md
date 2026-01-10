# ROBO BATTLE V5 - Match Format Edition

マッチフォーマット選択と特別エンディング演出を搭載した、究極のロボット対戦アクションゲーム。

## Play Now

**[Live Demo](https://robo-battle-v5-game.web.app/)** | **[About](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v5/about.html)** | **[Audio Guide](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v5/explanation.mp3)**

## V5 New Features

### V5.0: Match Format System
- **Match Format Selection**: Choose from 1本先取 (single match), 2本先取 (best of 3), or 3本先取 (best of 5)
- **Multi-Round Battles**: Track wins across multiple rounds until final victory
- **Round Display**: Shows "ROUND X" and match progress during countdown
- **Auto-Continue**: 4-second countdown between rounds with progress bar
- **Skip Option**: Press Enter or tap to skip to next round immediately

### V5.0: Special Ending Screens
- **CHAMPION! Screen**: Spectacular victory animation with particle effects when winning the match
- **GAME OVER Screen**: Dramatic defeat screen when losing the match
- **Victory BGM**: Triumphant major-key chiptune for winners
- **Defeat BGM**: Melancholic minor-key chiptune for losers
- **Animated Background**: Dynamic gradient animation during endings

### V5.0: Online Match Format Sync
- **Host Controls Format**: Host's match format setting is automatically synced to client
- **Consistent Rules**: Both players play with the same match format

## Previous Features (V1-V4)

### Beast Summon System (V4)
- **Beast Summon Item**: Summons an AI-controlled beast
- **Beast AI**: Maintains optimal distance, breathes fire, auto-targets
- **Balance**: HP 45, Flame damage 15, 1 beast per player

### Guard & Knockdown Systems (V4)
- **Shield/Guard**: Block incoming attacks
- **Guard Break**: Heavy attacks break through guards
- **Knockdown**: Heavy attacks cause knockdown with recovery animation

### Enhanced CPU AI (V4)
- **Active Item Pursuit**: CPU chases nearby items
- **Immediate Weapon Use**: Fires weapons immediately after pickup
- **Beast Targeting**: Prioritizes attacking enemy beasts

## Game Overview

Red robot (Player) vs Blue robot (CPU/Opponent) in 1v1 action combat.
Master beam rifles, jumps, kicks, and special weapons to defeat your enemy!

### Game Modes

- **VS CPU**: Battle against computer AI (Easy/Normal/Hard)
- **ONLINE BATTLE**: Real-time P2P battles via WebRTC

### Controls

**PC (Keyboard)**
- Arrow Left/Right: Move
- Arrow Up / Space: Jump
- Z: Beam (hold to charge)
- X: Kick
- C: Guard/Shield

**Mobile**
- Left side upper: Guard
- Left side lower: Jump
- Right side: Beam
- Virtual joystick / Tilt sensor: Move

## Weapon Items (11 Types)

| Weapon | Description | Power |
|--------|-------------|-------|
| Bazooka | Explosive projectile | High |
| Machinegun | Rapid fire bullets | Medium |
| Spread Shot | Wide-angle attack | Medium |
| Sword | Close-range slash | High |
| Homing Missile | Auto-targeting (1 shot) | Very High |
| Clone | Creates decoy | Special |
| Tiger | Rushing attack | High |
| Aerial | Air-to-ground assault | High |
| Green Dragon | Dragon flame breath | Very High |
| Meteor Strike | Meteor shower | Very High |
| Beast Summon | AI beast companion | Special |

## Customization System

Allocate 20 points across JUMP, WALK, BEAM, KICK:
- **JUMP**: Jump height
- **WALK**: Movement speed
- **BEAM**: Beam attack power
- **KICK**: Kick attack power

## Stages (6 Types)

| Stage | Theme |
|-------|-------|
| NEO CITY | Cyberpunk cityscape |
| PYRAMID | Ancient Egyptian ruins |
| PARTHENON | Greek temple |
| FACTORY | Giant robot factory |
| CAVE | Crystal cavern |
| FINAL ARENA | Space championship arena |

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas (60FPS)
- **Online**: WebRTC (P2P), Firebase Realtime Database
- **Hosting**: Firebase Hosting
- **AI Image Generation**: Vertex AI Imagen 3.0
- **Audio**: Procedural Chiptune BGM (Title/Battle/Victory/Defeat)

## File Structure

```
robo-battle-v5/
├── index.html           # Game entry point
├── game.js              # Game logic (11000+ lines)
├── online-mode.js       # Online battle module
├── firebase-config.js   # Firebase config
├── assets/
│   ├── sprites/         # Robot & Beast sprites
│   └── backgrounds/     # AI-generated backgrounds
├── about.html           # Technical documentation
└── README.md            # This file
```

## Version History

| Version | Features |
|---------|----------|
| V1 | Basic battle system, SVG sprites |
| V2 | AI-generated photorealistic sprites & backgrounds |
| V3 | Online battles, item mode, settings sync |
| V4 | Beast summon, guard system, knockdown, enhanced AI |
| V5 | **Match format selection, multi-round battles, ending screens, victory/defeat BGM** |

---

Generated with [Claude Code](https://claude.com/claude-code)
