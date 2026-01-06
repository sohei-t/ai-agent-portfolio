# CLI Sticky Notes

Terminal-friendly sticky notes app with global hotkeys for managing multiple terminal sessions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
![Electron](https://img.shields.io/badge/electron-28.x-47848f)

## Features

- **Global Hotkeys**: Create notes instantly without switching focus (`Cmd+Shift+N`)
- **Quick Clipboard Notes**: Paste clipboard content as a new note (`Cmd+Shift+V`)
- **Color Coding**: 6 color themes to categorize your notes
- **Tags**: Add custom tags to organize notes
- **Always on Top**: Pin important notes to stay visible
- **Position Memory**: Notes remember their position and size
- **System Tray**: Access notes from the menu bar

## Installation

### From Source

```bash
# Clone or download this repository
cd cli-sticky-notes-agent

# Install dependencies
npm install

# Run the app
npm start
```

### Build Distributable

```bash
# Build for your platform
npm run build

# Build for macOS only
npm run build:mac
```

## Usage

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+N` | Create new note |
| `Cmd+Shift+V` | Create note from clipboard |
| `Cmd+Shift+H` | Toggle all notes visibility |
| `Escape` | Hide current note |
| `Cmd+S` | Save current note |

### Color Themes

| Color | Suggested Use |
|-------|--------------|
| Yellow | General notes |
| Green | Done / Success |
| Blue | Info / Reference |
| Pink | Important |
| Purple | Ideas |
| Orange | Warning |

### Tips

- **Double-click close button** to delete a note with content (safety feature)
- **Right-click tray icon** to access all controls
- **Drag titlebar** to move notes
- **Drag corner** to resize notes

## Technical Stack

- **Electron** - Cross-platform desktop framework
- **electron-store** - Persistent local storage
- **No external APIs** - Works completely offline

## Project Structure

```
cli-sticky-notes/
├── main/               # Main process (Node.js)
│   ├── index.js        # App entry point
│   ├── windowManager.js # Multi-window handling
│   ├── globalShortcuts.js
│   ├── trayManager.js
│   └── store.js        # Data persistence
├── renderer/           # Renderer process (Chromium)
│   ├── index.html
│   ├── preload.js
│   ├── styles/
│   └── scripts/
├── shared/             # Shared configuration
├── tests/              # Jest tests
└── assets/             # Icons and resources
```

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## License

MIT License - See [LICENSE](LICENSE) for details.

---

Made with Electron and love for terminal productivity.
