# ROBO BATTLE V4 - Beast Summon Edition

魔獣召喚システムと強化されたCPU AIを搭載した、究極のロボット対戦アクションゲーム。

## Play Now

**[Live Demo](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v4/)** | **[About](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v4/about.html)** | **[Audio Guide](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v4/explanation.mp3)**

## V4 New Features

### V4.4: Beast Summon System
- **Beast Summon Item**: Summons an AI-controlled beast that attacks your opponent
- **Beast AI**: Maintains optimal distance, breathes fire, and auto-targets
- **Beast Sprites**: Blue/Red variants with 5 animations (idle, walk, jump, flame, down)
- **Balance**: HP 45 (3 normal shots), Flame damage 15, 1 beast per player

### V4.4: Enhanced CPU AI
- **Active Item Pursuit**: CPU actively chases nearby items (400px range)
- **Immediate Weapon Use**: Fires equipped weapon immediately after pickup
- **Beast Targeting**: Prioritizes attacking enemy beasts when threatened

### V4.3: Knockdown System & New Weapons
- **Knockdown Mechanic**: Heavy attacks cause knockdown state with recovery animation
- **Green Dragon**: Powerful dragon flame attack
- **Meteor Strike**: Devastating meteor shower from above

### V4.2: Guard System
- **Shield/Guard**: Block incoming attacks (replaces crouch)
- **Guard Break**: Heavy attacks break through guards

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

## Weapon Items

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

## Online Battle

### Host (Create Room)
1. Select ONLINE BATTLE
2. Click CREATE ROOM
3. Share the 6-digit room code
4. Press START BATTLE when opponent joins

### Client (Join Room)
1. Select ONLINE BATTLE
2. Click JOIN ROOM
3. Enter the room code
4. Wait for host to start

## Customization System

Allocate 20 points across JUMP, WALK, BEAM, KICK:
- **JUMP**: Jump height
- **WALK**: Movement speed
- **BEAM**: Beam attack power
- **KICK**: Kick attack power

## Stages

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
- **Hosting**: GitHub Pages
- **AI Image Generation**: Vertex AI Imagen 3.0
- **Sprites**: Photorealistic 3D-style PNG
- **Beast Sprites**: AI-generated demon beast animations

## File Structure

```
robo-battle-v4/
├── index.html           # Game entry point
├── game.js              # Game logic (10000+ lines)
├── online-mode.js       # Online battle module
├── firebase-config.js   # Firebase config
├── assets/
│   ├── sprites/         # Robot & Beast sprites
│   │   ├── player_*.png # Player robot (8 poses)
│   │   ├── enemy_*.png  # Enemy robot (8 poses)
│   │   ├── beast_blue_*.png # Blue beast (5 animations)
│   │   └── beast_red_*.png  # Red beast (5 animations)
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

---

Generated with [Claude Code](https://claude.com/claude-code)
