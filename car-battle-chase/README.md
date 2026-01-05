# Car Battle Chase Racing

A retro-style vertical scrolling racing game inspired by SEGA's Monaco GP, optimized for mobile devices with gyroscope controls.

## Demo

[Play Now](https://sohei-t.github.io/ai-agent-portfolio/car-battle-chase/)

## Features

- **Monaco GP Style Racing**: Top-down vertical scrolling with varied course zones
- **Mobile-First Design**: Gyroscope tilt controls for immersive steering
- **8 Unique Course Zones**: City, Highway, Mountain Pass, Tunnel, Coastal Road, Rain Zone, Ice Bridge, and Final Stretch
- **Item System**: Boost, Shield, and Slow-Motion power-ups
- **Traffic & Obstacles**: Dodge other cars, puddles, and oil slicks
- **Retro Aesthetics**: Pixel-art style graphics with synthwave BGM

## Controls

### Mobile (Recommended)
- **Tilt Left/Right**: Steer
- **Tilt Forward**: Accelerate
- **Tilt Backward**: Brake
- **Tap Screen**: Use Item

### Desktop
- **Arrow Keys or WASD**: Steer and accelerate
- **Space**: Use Item

## Technical Stack

- **Frontend**: Vanilla JavaScript with ES6 Modules
- **Graphics**: HTML5 Canvas 2D
- **Audio**: Web Audio API with GCP Text-to-Speech generated sounds
- **Controls**: DeviceOrientation API for gyroscope
- **Assets**: Vertex AI Imagen generated graphics

## Game Mechanics

- Complete the course before time runs out (180 seconds)
- Avoid collisions with traffic and obstacles
- Collect items from item boxes on the track
- Navigate through different road conditions (wet, icy)
- Day/night transitions with tunnel sections

## Project Structure

```
project/public/
├── index.html          # Main game page
├── about.html          # About page
├── README.md           # This file
├── assets/
│   ├── css/           # Stylesheets
│   ├── images/        # Game sprites (AI-generated)
│   └── audio/         # BGM and SFX
└── js/
    ├── main.js        # Entry point
    ├── core/          # Game logic
    ├── controls/      # Input handling (Gyro, Touch)
    ├── audio/         # Sound system
    └── assets/        # Asset loader
```

## Version History

- **v1.6.1**: Triple-layer BGM stop on game screen (showScreen + countdown + playBgm), src reset in stopBgm
- **v1.6.0**: Complete iOS BGM fix - deferred playback until user interaction, preload cleanup
- **v1.5.0**: Lap-based racing system (3 laps), multiple random courses, roadside scenery, BGM single-audio fix
- **v1.4.0**: iOS Safari BGM fixes, extended course length for longer gameplay
- **v1.3.0**: Improved gyro sensitivity, 180-second game time
- **v1.2.0**: Speed optimization, smaller cars for better visibility
- **v1.1.0**: Audio system improvements, BGM double-play prevention
- **v1.0.0**: Initial release

---

Generated with [Claude Code](https://claude.com/claude-code) and AI Agent Workflow
