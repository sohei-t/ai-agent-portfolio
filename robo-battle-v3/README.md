# ROBO BATTLE V3 - Online Multiplayer

2D Robot Fighting Game with Real-Time Online Battles

## Live Demo

[Play Now](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v3/)

[About Page](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v3/about.html)

## New in V3

- **Online 2-Player Battles** - Fight real opponents over the internet
- **WebRTC P2P Connection** - Low-latency direct peer-to-peer communication
- **Room System** - Create or join rooms with 6-digit codes
- **Real-time State Sync** - Smooth, responsive gameplay

## How to Play

### Online Mode
1. Select **ONLINE MODE** from the title screen
2. **CREATE ROOM** to host a match, or **JOIN ROOM** to enter an existing one
3. Share your room code with a friend
4. Both players press **READY** to start the battle!

### Controls

| Action | Keyboard | Alt Key |
|--------|----------|---------|
| Move Left/Right | Arrow Keys | A / D |
| Jump | Up Arrow | W |
| Attack | Z | Space |
| Dash | X | Shift |

Mobile devices automatically display touch controls.

## Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | Vanilla JavaScript, Canvas API |
| Networking | WebRTC DataChannel |
| Signaling | Firebase Realtime Database |
| Hosting | Firebase Hosting / GitHub Pages |
| Frame Rate | 60 FPS |
| Resolution | 800x600 (responsive scaling) |

## Architecture

```
Player 1  <--WebRTC DataChannel-->  Player 2
    |                                    |
    +-----> Firebase Signaling <---------+
            (connection setup only)
```

- **P2P Direct Connection**: Game data travels directly between players
- **Firebase Signaling**: Only used for initial connection handshake
- **UDP-like Protocol**: WebRTC DataChannel provides fast, unreliable delivery
- **Input Synchronization**: Both players see consistent game state

## Cost

**$0/month** - Fully free-tier operation

- Firebase Spark Plan (free tier)
- GitHub Pages (free)
- No server-side compute costs

## Privacy

- Room codes are random 6-character alphanumeric strings
- Game data is transmitted P2P (does not pass through servers)
- Rooms are automatically deleted after disconnection

## Files

```
robo-battle-v3/
  index.html        - Game entry point
  game.js           - Core game engine
  game-online-patch.js - Online multiplayer module
  about.html        - About page
  README.md         - This file
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

Mobile browsers supported with touch controls.

## Development

This game was developed using:
- [Claude Code](https://claude.com/claude-code) - AI-assisted development
- [AI Agent Workflow](https://github.com/sohei-t/ai-agent-portfolio) - Automated development pipeline

---

Generated with [Claude Code](https://claude.com/claude-code)
