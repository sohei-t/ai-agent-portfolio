# 🚀 Space Odyssey - Boss Shooting Game

A retro-style vertical scrolling shooter game with boss battles, mobile controls, and progressive difficulty.

## ✨ Features

- **10 Stages**: Progressive difficulty with unique enemy patterns
- **Epic Boss Battles**: Face powerful bosses at the end of each stage
- **Mobile-Optimized**: Virtual joystick and gyroscope controls
- **Power-Up System**: Weapon upgrades, shields, bombs, and extra lives
- **Responsive Design**: Playable on desktop and mobile devices
- **Multiple Difficulties**: Easy, Normal, Hard, and Expert modes
- **High Score System**: Track your best performances
- **Web Audio API**: Dynamic sound effects (when available)
- **Smooth Performance**: 60 FPS gameplay with optimized rendering

## 🎮 How to Play

### Desktop Controls
- **Arrow Keys / WASD**: Move your ship
- **Mouse**: Move cursor to control ship position
- **Space / Z**: Fire bullets
- **X**: Use bomb (limited)
- **P**: Pause game

### Mobile Controls
- **Virtual Joystick**: Drag to move your ship
- **Auto-Fire**: Ship fires automatically
- **Control Mode Toggle**: Switch between joystick and tilt controls
- **Gyroscope** (optional): Tilt device to move (requires permission)

## 🚀 Quick Start

1. **Open the game**: Double-click `index.html` or use `launch_app.command`
2. **Select difficulty**: Choose your preferred challenge level
3. **Start playing**: Survive waves of enemies and defeat the bosses!

## 📂 Project Structure

```
space-odyssey/
├── index.html              # Main game file
├── test_game.html          # Test suite
├── assets/
│   ├── css/
│   │   └── style.css       # Game styles
│   ├── js/
│   │   ├── game.js         # Game engine
│   │   ├── player.js       # Player mechanics
│   │   ├── enemy.js        # Enemy AI
│   │   ├── boss.js         # Boss battles
│   │   ├── bullet.js       # Projectile system
│   │   ├── powerup.js      # Power-up system
│   │   ├── input.js        # Input handling
│   │   ├── collision.js    # Collision detection
│   │   ├── stage.js        # Stage management
│   │   ├── ui.js           # UI updates
│   │   ├── audio.js        # Sound system
│   │   ├── save.js         # Save/load system
│   │   └── mobile/
│   │       ├── gyro.js     # Gyroscope controls
│   │       └── joystick.js # Virtual joystick
│   └── images/
│       ├── player_ship.svg # Player graphics
│       ├── enemies/        # Enemy sprites
│       ├── bosses/         # Boss sprites
│       └── effects/        # Visual effects
```

## 🎯 Game Mechanics

### Enemy Types
- **Basic Fighter**: Simple movement patterns, low HP
- **Fast Fighter**: Quick movements, harder to hit
- **Tank**: Slow but high HP, heavy damage
- **Sniper**: Long-range attacks, precise shots
- **Bomber**: Area damage attacks

### Power-Ups
- **Weapon Upgrade**: Increases firepower
- **Extra Life**: +1 life
- **Bomb**: Clear screen attack
- **Shield**: Temporary invincibility
- **Speed Boost**: Faster movement

### Difficulty Levels
| Difficulty | Lives | Enemy HP | Score Multiplier |
|------------|-------|----------|------------------|
| Easy       | 5     | 70%      | 0.8x             |
| Normal     | 3     | 100%     | 1.0x             |
| Hard       | 2     | 150%     | 1.5x             |
| Expert     | 1     | 200%     | 2.0x             |

## 🛠️ Technical Details

### Technologies Used
- **HTML5 Canvas**: Game rendering
- **Vanilla JavaScript**: No dependencies
- **Web Audio API**: Sound generation
- **LocalStorage**: Save system
- **SVG Graphics**: Scalable sprites

### Performance Optimizations
- Object pooling for bullets and particles
- Efficient collision detection algorithms
- RequestAnimationFrame for smooth rendering
- Optimized mobile touch handling

## 📱 Mobile Features

### Gyroscope Controls
- Tilt device to move ship
- Automatic calibration
- iOS 18+ compatible
- Permission request handling

### Virtual Joystick
- Responsive touch controls
- Visual feedback
- Adjustable sensitivity
- Default control method

## 🧪 Testing

Run the test suite by opening `test_game.html` in your browser.

Test Coverage:
- Game initialization ✅
- Player mechanics ✅
- Enemy systems ✅
- Collision detection ✅
- Score calculation ✅
- Stage progression ✅
- Mobile controls ✅

## 📄 License

MIT License - Free to use and modify

## 🙏 Credits

Developed using AI-assisted development workflow with Claude Code.

---

**Version**: 1.0.0
**Game Engine**: Custom HTML5 Canvas
**Compatible**: Chrome, Firefox, Safari, Edge (Desktop & Mobile)