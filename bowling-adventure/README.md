# Bowling Adventure

An innovative 3D obstacle course bowling game built with Three.js and Cannon.js physics. Navigate your bowling ball through challenging terrain and obstacles to knock down pins!

## Live Demo

[Play Bowling Adventure](https://sohei-t.github.io/ai-agent-portfolio/bowling-adventure/)

## Features

- **3D Physics-Based Gameplay**: Realistic ball and pin physics using Cannon.js
- **Obstacle Course**: Navigate through rocks, barriers, and terrain changes
- **Multiple Terrain Types**:
  - Standard grass lanes
  - Sand sections (high friction, slows the ball)
  - Ice sections (low friction, slippery and fast)
- **Dual Control System**:
  - Virtual joystick (default) for precise control
  - Tilt/gyroscope controls for mobile devices (iOS 18 compatible)
- **Full 10-Frame Bowling**: Complete bowling scoring system with strikes and spares
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful 3D Environment**: Sky, clouds, distant hills, and shadows

## Technology Stack

| Category | Technology |
|----------|------------|
| **3D Rendering** | Three.js (v0.160.0) |
| **Physics Engine** | Cannon-es (v0.20.0) |
| **Input Handling** | DeviceOrientation API, Touch Events |
| **Build Tool** | Vite (v5.0.10) |
| **Testing** | Vitest (v1.1.0) |
| **Language** | JavaScript (ES Modules) |

## How to Play

1. **Start the Game**: Click "Start Game" on the title screen
2. **Control the Ball**:
   - **Joystick Mode** (default): Drag the virtual joystick to roll the ball
   - **Tilt Mode**: Tilt your device to control the ball (tap "Joystick" button to switch)
3. **Navigate Obstacles**: Avoid rocks and barriers, use terrain to your advantage
4. **Knock Down Pins**: Roll the ball through the obstacle course to hit the pins
5. **Score Points**: Standard bowling scoring - strikes (10 pins, 1 throw) and spares (10 pins, 2 throws)
6. **Complete 10 Frames**: Play through all 10 frames to get your final score

### Tips

- Use sand sections to slow down before obstacles
- Use ice sections for speed boosts
- The speed gauge shows your current ball velocity
- Falling off the course counts as a gutter ball (0 points)

## Installation

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/sohei-t/ai-agent-portfolio.git
cd ai-agent-portfolio/bowling-adventure

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The project includes comprehensive tests for:

- `BowlingScore.js` - Scoring logic (strikes, spares, frame completion)
- `Ball.js` - Ball entity creation and physics
- `Pins.js` - Pin management and knock-down detection
- `Course.js` - Course creation and terrain types
- `Controls.js` - Input handling (joystick and gyroscope)

## Project Structure

```
bowling-adventure/
├── index.html          # Main HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.js         # Entry point - creates game instance
│   ├── BowlingGame.js  # Main game controller
│   ├── BowlingScore.js # Bowling scoring system
│   ├── Controls.js     # Joystick and gyroscope input
│   ├── Course.js       # Obstacle course creation
│   ├── UI.js           # HUD and screen management
│   └── entities/
│       ├── Ball.js     # Bowling ball entity
│       └── Pins.js     # Pin entities and management
└── tests/
    └── *.test.js       # Unit tests
```

## Architecture

### Game Loop

```
BowlingGame.animate()
├── Physics Update (Cannon.js world.step)
├── Game State Update
│   ├── Input Processing (Controls.getInput)
│   ├── Ball Movement (Ball.applyInput)
│   ├── Camera Follow
│   └── Pin Detection
└── Render (Three.js renderer.render)
```

### State Machine

```
title -> playing -> throwing -> waiting -> result
  ^                                          |
  └──────────── restartGame ─────────────────┘
```

## Controls Reference

| Control | Desktop | Mobile |
|---------|---------|--------|
| Move Ball | Drag joystick | Drag joystick or tilt device |
| Switch Mode | Click toggle button | Tap toggle button |
| Start Game | Click "Start Game" | Tap "Start Game" |
| Restart | Click "Play Again" | Tap "Play Again" |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome for Android

## Performance

- Optimized for 60fps gameplay
- Shadow mapping for realistic lighting
- Efficient physics with sleep detection
- Responsive design adapts to screen size

## Developer Notes

### Adding New Obstacles

```javascript
// In Course.js
this.createRock(new THREE.Vector3(x, 0, z), size);
this.createBarrier(new THREE.Vector3(x, 0, z), width, height, rotation);
```

### Adding New Terrain Types

```javascript
// In Course.js
this.createTerrainSection({
  start: 10,
  end: 20,
  color: 0xHEXCOLOR,
  friction: 0.0 - 1.0,
  restitution: 0.0 - 1.0,
  name: 'terrainName'
});
```

## License

MIT License - See LICENSE file for details.

## Credits

Built with:
- [Three.js](https://threejs.org/) - 3D graphics library
- [Cannon-es](https://pmndrs.github.io/cannon-es/) - Physics engine
- [Vite](https://vitejs.dev/) - Build tool

---

Generated with [Claude Code](https://github.com/anthropics/claude-code) and AI Agent Workflow
