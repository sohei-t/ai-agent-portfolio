# AI-Driven Development Portfolio

Autonomous AI agent system that builds, tests, documents, and deploys full-stack applications — from a single natural language instruction.

## Portfolio Categories

### 1. Development Automation Tools
| Project | Description | Tech Stack | Links |
|---------|-------------|------------|-------|
| **slack-bridge-for-claude-code** | Bidirectional Slack↔Claude Code bridge for mobile AI dev control | Node.js, Slack Bot API, tmux | [GitHub](https://github.com/sohei-t/slack-bridge-for-claude-code) |
| **video-generator-agent** | HTML slides + MP3 → YouTube MP4 auto-generation | Playwright, Whisper, ffmpeg | [GitHub](https://github.com/sohei-t/video-generator-agent) |
| **training-content-progress-tracker** | Real-time training progress dashboard | FastAPI, Vue.js 3, WebSocket | [GitHub](https://github.com/sohei-t/training-content-progress-tracker) |
| **ai-orchestrator** | AI workflow visualization dashboard | React, WebSocket | [About](https://sohei-t.github.io/ai-agent-portfolio/ai-orchestrator/about.html) |
| **claude-agent-skills** | Claude Code extension skills collection | Python, Shell | [GitHub](https://github.com/sohei-t/claude-agent-skills) |

### 2. Productivity Tools
| Project | Description | Tech Stack | Test Coverage |
|---------|-------------|------------|---------------|
| **budget-tracker** | WBS-based task & budget management SPA | React 19, TypeScript, Express, SQLite | 97.92% |
| **text-diff-editor** | Multi-panel diff editor with Myers algorithm | React, TypeScript, File System Access API | High |
| **piano-app** | 18-instrument virtual piano | React 18, Web Audio API | 100% |
| **cli-sticky-notes** | Terminal sticky notes with global hotkey | Electron, Node.js | - |
| **content-viewer** | Content viewer application | JavaScript | - |
| **picture-merge-app-v2** | Image merge tool | JavaScript | - |

### 3. Game Development (Canvas/WebGL/Three.js)
| Project | Description | Key Technology |
|---------|-------------|---------------|
| **robo-battle** series (v1-v5) | Evolution of robot battle game | Canvas, WebRTC, Vertex AI Imagen |
| **boss-shooter2** | 10-stage boss shooting game | Canvas, Mobile Gyro Controls |
| **bowling-adventure** (v1-v2) | 3D bowling game | Three.js, Cannon.js |
| **gradius-clone** | Side-scrolling STG | Phaser 3 |
| **space-shooter** | Space Invaders-style arcade | Canvas |
| **dungeon-battles** | Vertical-scroll dungeon RPG | Canvas |

## Development Workflow

All applications are built autonomously through a 7-phase workflow:

```
Phase 0: Init → Phase 1: Planning (×2 parallel) → Phase 2: Implementation (×3 parallel)
→ Phase 3: Testing (100% pass) → Phase 4: Quality (coverage 80-90%)
→ Phase 5: Documentation → Phase 6: GitHub Deploy
```

- **9 Git Worktrees** for true parallel development
- **Autonomous UX-weighted evaluation** (UX 35%, Features 20%, Performance 15%)
- **Claude Code Action** for automated PR review on all repositories
- **TDD approach** with test coverage up to 97.92%

## Live Portfolio

🌐 **[View Portfolio](https://sohei-t.github.io/ai-agent-portfolio/)**

## Tech Stack

**Frontend:** React 18/19, TypeScript, Vue.js 3, Tailwind CSS, Vite  
**Backend:** FastAPI, Express.js, Node.js  
**Game:** Canvas, WebGL, Three.js, Phaser 3  
**Real-time:** WebSocket, WebRTC, Slack Bot API  
**AI/Automation:** Claude Code, GitHub Actions, Gemini TTS, Vertex AI Imagen  
**Testing:** Vitest, 97%+ coverage  
**Infrastructure:** GitHub Pages, Firebase Hosting

---

Built with [Claude Code](https://claude.ai/claude-code) | Powered by Claude Opus 4.6

