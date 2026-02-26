# AI Orchestrator Dashboard

Real-time monitoring dashboard for multiple AI agent workflows. Track progress across Web App Development, Learning Content Generation, Skill Publishing, and Video Generation agents -- all in one place.

## Features

- **Real-time SSE Updates** -- Server-Sent Events push progress changes to the browser instantly, with automatic reconnection and heartbeat monitoring
- **5 Agent Types Supported** -- git-worktree-agent (7 phases), learning-content-agent (9 phases), learning-content-agent-gcp (9 phases), skill-publish-agent (6 phases), video-generator-agent (5 phases)
- **File Watching with chokidar** -- Detects PROGRESS.yaml changes with `awaitWriteFinish` stability, ensuring atomic reads
- **190 Tests, 100% Coverage** -- Comprehensive Jest + Supertest test suite covering routes, services, and utilities
- **Dark Theme with Glassmorphism** -- Slate-900 background, backdrop-blur effects, shimmer progress bars, and card hover glow
- **Keyboard Shortcuts** -- `1`-`5` switch tabs, `S` settings, `N` register, `R` reload, `/` search, `?` toggle help
- **WCAG 2.1 AA Accessible** -- Skip-to-content link, ARIA roles/labels, focus-visible outlines, screen-reader live regions, reduced-motion support
- **Responsive Design** -- Mobile-first grid layout, touch-friendly 44px minimum targets, adaptive tab icons

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Frontend | HTML + Vanilla JS + Tailwind CSS (CDN) + Lucide Icons |
| File Watching | chokidar (awaitWriteFinish) |
| Real-time | Server-Sent Events (SSE) with heartbeat |
| YAML Parsing | js-yaml |
| Data Storage | JSON file (atomic writes) |
| Architecture | EventBus pattern |
| Testing | Jest + supertest |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open in browser
open http://127.0.0.1:3456
```

The dashboard will start watching registered project directories for PROGRESS.yaml changes.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | List all registered projects |
| `POST` | `/api/projects` | Register a new project |
| `PATCH` | `/api/projects/:id` | Update a project |
| `DELETE` | `/api/projects/:id` | Remove a project |
| `GET` | `/api/projects/:id/progress` | Get parsed progress data |
| `GET` | `/api/events` | SSE stream for real-time updates |
| `GET` | `/api/stats` | Dashboard statistics |
| `POST` | `/api/scan` | Scan directories for projects |
| `GET` | `/api/health` | Health check |

## Project Structure

```
ai-orchestrator/
├── server.js                    # Express entry point
├── src/
│   ├── event-bus.js             # Central EventEmitter singleton
│   ├── routes/
│   │   ├── projects.js          # REST API for project CRUD
│   │   └── events.js            # SSE manager with heartbeat
│   ├── services/
│   │   ├── project-store.js     # JSON-based project storage
│   │   ├── progress-parser.js   # YAML progress file parser
│   │   └── watcher.js           # chokidar file watcher
│   └── utils/
│       └── yaml-helpers.js      # YAML parsing utilities
├── assets/
│   ├── css/style.css            # Custom styles (glassmorphism, animations)
│   └── js/
│       ├── app.js               # Application bootstrap
│       ├── dashboard.js          # Dashboard state management
│       ├── progress-card.js      # Card component rendering
│       └── sse-client.js         # SSE client with reconnection
├── data/
│   ├── projects.json            # Registered projects data
│   └── sample-projects/         # Sample PROGRESS.yaml files
├── templates/                   # Agent YAML templates
├── orchestrator.config.yaml     # Server configuration
├── package.json                 # Dependencies and scripts
└── index.html                   # Dashboard UI
```

## How It Works

1. **Register Projects** -- Add project paths via the UI or `POST /api/projects`
2. **File Watching** -- chokidar monitors each project directory for PROGRESS.yaml changes
3. **Event Bus** -- File change events propagate through the EventBus singleton
4. **Progress Parsing** -- YAML files are parsed to extract phase, status, and percentage
5. **SSE Broadcast** -- All connected browser clients receive real-time updates
6. **Dashboard Render** -- Cards update with animated progress bars, status dots, and phase details

## Running Tests

```bash
# Run all tests with coverage
npm test

# Watch mode for development
npm run test:watch
```

## Configuration

Edit `orchestrator.config.yaml` to customize:

```yaml
server:
  port: 3456
  host: "127.0.0.1"

watch:
  directories:
    - "~/Desktop/AI-Apps"
  stability_threshold_ms: 300

sse:
  heartbeat_interval_ms: 30000
  max_clients: 100
```

## License

MIT
