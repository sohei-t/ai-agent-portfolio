# Content Viewer

HTML slides with synchronized MP3 audio explanations - An interactive educational content platform.

## Overview

Content Viewer is a modern web application that provides an immersive learning experience by combining HTML slides with synchronized audio explanations. Built with React 18, TypeScript, and Firebase, it offers a smooth, fullscreen viewing experience with intuitive controls.

## Live Demo

- [Application](https://sohei-t.github.io/ai-agent-portfolio/content-viewer/)
- [About Page](https://sohei-t.github.io/ai-agent-portfolio/content-viewer/about.html)

## Features

### Core Functionality
- **Fullscreen Viewer** - Immersive, distraction-free content viewing
- **Audio Synchronization** - HTML slides paired with MP3 audio explanations
- **Audio Seekbar** - Precise navigation with visual timeline
- **Content Library** - Organized classrooms with multiple content items

### User Experience
- **Keyboard Shortcuts** - Full control without mouse
  - `Space/K` - Play/Pause
  - `Arrow Left/J` - Backward 10s
  - `Arrow Right/L` - Forward 10s
  - `Arrow Up/Down` - Volume control
  - `M` - Mute/Unmute
  - `F` - Toggle fullscreen
  - `N/P` - Next/Previous content
  - `Escape` - Close viewer
- **Touch Gestures** - Swipe navigation for mobile
- **Responsive Design** - Optimized for all screen sizes
- **PWA Support** - Install as standalone app

### Technical Features
- **Firebase Authentication** - Google and Email sign-in
- **Cloud Firestore** - Real-time data synchronization
- **Google Drive Integration** - Content management via Cloud Run API
- **Code Splitting** - Lazy loading for optimal performance

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 18, TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| Backend | Firebase (Auth, Firestore) |
| Storage | Google Drive (via Cloud Run) |
| PWA | Workbox |
| Icons | Lucide React |
| Testing | Vitest, Testing Library |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project (for full functionality)

### Installation

1. Clone the repository
```bash
git clone https://github.com/sohei-t/ai-agent-portfolio.git
cd ai-agent-portfolio/content-viewer
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.template .env
# Edit .env with your Firebase configuration
```

4. Start development server
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

### Building for Production

```bash
npm run build
npm run preview  # Preview production build
```

## Project Structure

```
content-viewer/
├── src/
│   ├── components/
│   │   ├── Auth/          # Authentication components
│   │   ├── Classroom/     # Classroom list and content
│   │   ├── Layout/        # Header, layout wrapper
│   │   ├── Viewer/        # Fullscreen viewer components
│   │   └── ui/            # Reusable UI components
│   ├── contexts/          # React contexts (Auth, Toast, Viewer)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Route pages
│   ├── services/          # Firebase and API services
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── tests/                 # Test files
```

## API Endpoints

The application connects to a Cloud Run API for Google Drive integration:

| Endpoint | Description |
|----------|-------------|
| `GET /classrooms` | List all classrooms |
| `GET /classrooms/:id` | Get classroom details |
| `GET /content/:id` | Get content metadata |

## Development

### Running Tests
```bash
npm test              # Run tests in watch mode
npm run test:coverage # Run with coverage report
```

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration
- Vitest for unit testing
- Testing Library for component tests

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with React and Firebase | Generated with Claude Code
