/**
 * ROBO BATTLE V3 - Online Multiplayer Edition
 * Lobby UI System for Room Creation and Joining
 *
 * This file contains the lobby screens for online multiplayer functionality.
 * Inherits V2's visual style and adds new game states for matchmaking.
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS;

// Physics constants (inherited from V2)
const PHYSICS = {
    gravity: 0.5,
    maxFallSpeed: 15,
    friction: 0.8,
    airResistance: 0.95
};

// Robot constants (inherited from V2)
const ROBOT = {
    width: 48,
    height: 64,
    maxHp: 200,
    invincibleTime: 500,
    beamCooldown: 500,
    kickCooldown: 1000,
    kickRange: 30,
    kickHeight: 48,
    knockback: 8
};

// V3 Game States (extended from V2)
const GameState = {
    LOADING: 'loading',
    TITLE: 'title',
    LOBBY: 'lobby',           // NEW: Online/Offline mode selection
    CREATE_ROOM: 'create_room', // NEW: Room creation screen
    JOIN_ROOM: 'join_room',     // NEW: Room code input screen
    WAITING: 'waiting',         // NEW: Waiting for opponent
    CONNECTING: 'connecting',   // NEW: P2P connection in progress
    READY_CHECK: 'ready_check', // NEW: Ready confirmation
    SETUP: 'setup',             // Inherited: Robot customization
    STAGE_SELECT: 'stage_select', // NEW: Stage selection (host only)
    BATTLE: 'battle',           // Inherited: Main game
    KO: 'ko',                   // Inherited: KO animation
    RESULT: 'result',           // Inherited: Win/Lose screen
    PAUSED: 'paused'            // Inherited: Pause menu
};

// Online Mode Constants
const ONLINE = {
    ROOM_CODE_LENGTH: 6,
    ROOM_CODE_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    CONNECTION_TIMEOUT: 30000,
    HEARTBEAT_INTERVAL: 1000,
    DISCONNECT_THRESHOLD: 10000
};

// Colors (extended from V2 with online mode colors)
const COLORS = {
    // V2 colors
    playerPrimary: '#FF0000',
    playerSecondary: '#CC0000',
    playerDark: '#990000',
    enemyPrimary: '#0066FF',
    enemySecondary: '#0044CC',
    enemyDark: '#003399',
    beamRed: '#FF6600',
    beamBlue: '#0088FF',
    platform: '#4d4d6a',
    ui: '#ffffff',
    // V3 online colors
    online: '#00FF88',
    offline: '#FF8800',
    waiting: '#FFFF00',
    connected: '#00FF00',
    error: '#FF3333',
    buttonPrimary: '#0088FF',
    buttonHover: '#00AAFF',
    buttonDisabled: '#666666',
    inputBg: '#1a1a2e',
    inputBorder: '#3a1a50',
    inputFocus: '#00FFFF'
};

// UI Fonts
const FONTS = {
    title: 'bold 48px "Courier New", monospace',
    heading: 'bold 28px "Courier New", monospace',
    subheading: 'bold 20px "Courier New", monospace',
    body: '18px "Courier New", monospace',
    small: '14px "Courier New", monospace',
    code: 'bold 32px "Courier New", monospace'
};

// ============================================================================
// ROOM CODE GENERATOR
// ============================================================================

function generateRoomCode() {
    let code = '';
    for (let i = 0; i < ONLINE.ROOM_CODE_LENGTH; i++) {
        code += ONLINE.ROOM_CODE_CHARS[Math.floor(Math.random() * ONLINE.ROOM_CODE_CHARS.length)];
    }
    return code;
}

// ============================================================================
// UI BUTTON CLASS
// ============================================================================

class UIButton {
    constructor(x, y, width, height, text, options = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.color = options.color || COLORS.buttonPrimary;
        this.hoverColor = options.hoverColor || COLORS.buttonHover;
        this.textColor = options.textColor || '#FFFFFF';
        this.disabled = options.disabled || false;
        this.icon = options.icon || null;
        this.isHovered = false;
        this.isPressed = false;
    }

    contains(px, py) {
        return px >= this.x && px <= this.x + this.width &&
               py >= this.y && py <= this.y + this.height;
    }

    render(ctx) {
        const baseColor = this.disabled ? COLORS.buttonDisabled :
                         (this.isHovered ? this.hoverColor : this.color);

        // Button shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(this.x + 4, this.y + 4, this.width, this.height);

        // Button background
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, this.adjustColor(baseColor, -30));
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Button border
        ctx.strokeStyle = this.isHovered ? '#00FFFF' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Button highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(this.x, this.y, this.width, this.height / 3);

        // Text
        ctx.font = FONTS.subheading;
        ctx.fillStyle = this.disabled ? '#888888' : this.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textX = this.x + this.width / 2;
        const textY = this.y + this.height / 2;

        if (this.icon) {
            ctx.fillText(this.icon + ' ' + this.text, textX, textY);
        } else {
            ctx.fillText(this.text, textX, textY);
        }
    }

    adjustColor(hex, amount) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }
}

// ============================================================================
// ROOM CODE INPUT CLASS
// ============================================================================

class RoomCodeInput {
    constructor(x, y, maxLength = 6) {
        this.x = x;
        this.y = y;
        this.maxLength = maxLength;
        this.value = '';
        this.isFocused = true;
        this.cursorVisible = true;
        this.cursorTimer = 0;
        this.charWidth = 40;
        this.charHeight = 50;
        this.charSpacing = 10;
    }

    get totalWidth() {
        return this.maxLength * (this.charWidth + this.charSpacing) - this.charSpacing;
    }

    addChar(char) {
        if (this.value.length < this.maxLength) {
            const upperChar = char.toUpperCase();
            if (ONLINE.ROOM_CODE_CHARS.includes(upperChar)) {
                this.value += upperChar;
            }
        }
    }

    removeChar() {
        if (this.value.length > 0) {
            this.value = this.value.slice(0, -1);
        }
    }

    clear() {
        this.value = '';
    }

    isComplete() {
        return this.value.length === this.maxLength;
    }

    update() {
        this.cursorTimer++;
        if (this.cursorTimer >= 30) {
            this.cursorTimer = 0;
            this.cursorVisible = !this.cursorVisible;
        }
    }

    render(ctx) {
        const startX = this.x - this.totalWidth / 2;

        for (let i = 0; i < this.maxLength; i++) {
            const charX = startX + i * (this.charWidth + this.charSpacing);
            const charY = this.y;

            // Character box
            ctx.fillStyle = COLORS.inputBg;
            ctx.fillRect(charX, charY, this.charWidth, this.charHeight);

            // Border
            const isCurrent = i === this.value.length && this.isFocused;
            ctx.strokeStyle = isCurrent ? COLORS.inputFocus : COLORS.inputBorder;
            ctx.lineWidth = isCurrent ? 3 : 2;
            ctx.strokeRect(charX, charY, this.charWidth, this.charHeight);

            // Character
            if (i < this.value.length) {
                ctx.font = FONTS.code;
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.value[i], charX + this.charWidth / 2, charY + this.charHeight / 2);
            }

            // Cursor
            if (isCurrent && this.cursorVisible) {
                ctx.fillStyle = COLORS.inputFocus;
                ctx.fillRect(charX + this.charWidth / 2 - 2, charY + 10, 4, this.charHeight - 20);
            }
        }
    }
}

// ============================================================================
// LOBBY UI MANAGER
// ============================================================================

class LobbyUIManager {
    constructor() {
        this.animationFrame = 0;
        this.roomCode = '';
        this.roomCodeInput = new RoomCodeInput(GAME_WIDTH / 2, 250);
        this.connectionStatus = 'idle';
        this.errorMessage = '';
        this.playerReady = false;
        this.opponentReady = false;
        this.opponentConnected = false;
        this.loadingDots = 0;

        // Buttons
        this.buttons = {
            lobby: {
                online: new UIButton(GAME_WIDTH / 2 - 150, 250, 300, 60, 'ONLINE MODE', { color: COLORS.online, icon: '' }),
                vsCpu: new UIButton(GAME_WIDTH / 2 - 150, 340, 300, 60, 'VS CPU MODE', { color: COLORS.offline, icon: '' }),
                back: new UIButton(GAME_WIDTH / 2 - 100, 500, 200, 50, 'BACK', { color: '#666666' })
            },
            createRoom: {
                create: new UIButton(GAME_WIDTH / 2 - 150, 250, 300, 60, 'CREATE ROOM', { color: COLORS.online }),
                join: new UIButton(GAME_WIDTH / 2 - 150, 340, 300, 60, 'JOIN ROOM', { color: COLORS.buttonPrimary }),
                back: new UIButton(GAME_WIDTH / 2 - 100, 500, 200, 50, 'BACK', { color: '#666666' })
            },
            waiting: {
                cancel: new UIButton(GAME_WIDTH / 2 - 100, 480, 200, 50, 'CANCEL', { color: '#FF3333' })
            },
            joinRoom: {
                join: new UIButton(GAME_WIDTH / 2 - 100, 380, 200, 50, 'JOIN', { color: COLORS.online }),
                back: new UIButton(GAME_WIDTH / 2 - 100, 450, 200, 50, 'BACK', { color: '#666666' })
            },
            readyCheck: {
                ready: new UIButton(GAME_WIDTH / 2 - 100, 400, 200, 60, 'READY!', { color: COLORS.online })
            }
        };
    }

    update() {
        this.animationFrame++;
        this.roomCodeInput.update();

        // Loading dots animation
        if (this.animationFrame % 20 === 0) {
            this.loadingDots = (this.loadingDots + 1) % 4;
        }
    }

    getLoadingDots() {
        return '.'.repeat(this.loadingDots);
    }

    setRoomCode(code) {
        this.roomCode = code;
    }

    setError(message) {
        this.errorMessage = message;
    }

    clearError() {
        this.errorMessage = '';
    }

    setOpponentConnected(connected) {
        this.opponentConnected = connected;
    }

    setPlayerReady(ready) {
        this.playerReady = ready;
    }

    setOpponentReady(ready) {
        this.opponentReady = ready;
    }
}

// ============================================================================
// GAME CLASS (LOBBY SCREENS)
// ============================================================================

class RoboBattleGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = GameState.TITLE;
        this.menuSelection = 0;
        this.lobbyUI = new LobbyUIManager();
        this.isOnlineMode = false;
        this.isHost = false;

        // Input handling
        this.setupInput();

        // Animation frame tracking
        this.lastTime = 0;
        this.animationFrame = 0;

        // Start game loop
        this.gameLoop();
    }

    setupInput() {
        // Keyboard input
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Mouse/Touch input
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e));
    }

    getCanvasPosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        if (e.touches) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    handleKeyDown(e) {
        switch (this.state) {
            case GameState.TITLE:
                this.handleTitleInput(e.key);
                break;
            case GameState.LOBBY:
                this.handleLobbyInput(e.key);
                break;
            case GameState.CREATE_ROOM:
                this.handleCreateRoomInput(e.key);
                break;
            case GameState.JOIN_ROOM:
                this.handleJoinRoomInput(e.key);
                break;
            case GameState.WAITING:
                this.handleWaitingInput(e.key);
                break;
            case GameState.READY_CHECK:
                this.handleReadyCheckInput(e.key);
                break;
        }
    }

    handleKeyUp(e) {
        // Handle key release events if needed
    }

    handleClick(e) {
        const pos = this.getCanvasPosition(e);
        this.processClick(pos);
    }

    handleTouch(e) {
        e.preventDefault();
        const pos = this.getCanvasPosition(e);
        this.processClick(pos);
    }

    handleMouseMove(e) {
        const pos = this.getCanvasPosition(e);
        this.updateButtonHovers(pos);
    }

    processClick(pos) {
        switch (this.state) {
            case GameState.TITLE:
                this.processTitleClick(pos);
                break;
            case GameState.LOBBY:
                this.processLobbyClick(pos);
                break;
            case GameState.CREATE_ROOM:
                this.processCreateRoomClick(pos);
                break;
            case GameState.JOIN_ROOM:
                this.processJoinRoomClick(pos);
                break;
            case GameState.WAITING:
                this.processWaitingClick(pos);
                break;
            case GameState.READY_CHECK:
                this.processReadyCheckClick(pos);
                break;
        }
    }

    updateButtonHovers(pos) {
        const buttons = this.getCurrentButtons();
        if (buttons) {
            for (const key in buttons) {
                buttons[key].isHovered = buttons[key].contains(pos.x, pos.y);
            }
        }
    }

    getCurrentButtons() {
        switch (this.state) {
            case GameState.LOBBY:
                return this.lobbyUI.buttons.lobby;
            case GameState.CREATE_ROOM:
                return this.lobbyUI.buttons.createRoom;
            case GameState.JOIN_ROOM:
                return this.lobbyUI.buttons.joinRoom;
            case GameState.WAITING:
                return this.lobbyUI.buttons.waiting;
            case GameState.READY_CHECK:
                return this.lobbyUI.buttons.readyCheck;
            default:
                return null;
        }
    }

    // ========== TITLE SCREEN ==========
    handleTitleInput(key) {
        const menuItems = ['START GAME', 'ONLINE', 'HOW TO PLAY'];

        switch (key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.menuSelection = (this.menuSelection - 1 + menuItems.length) % menuItems.length;
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.menuSelection = (this.menuSelection + 1) % menuItems.length;
                break;
            case 'Enter':
            case ' ':
                this.selectTitleMenuItem();
                break;
        }
    }

    selectTitleMenuItem() {
        switch (this.menuSelection) {
            case 0: // START GAME (VS CPU)
                this.isOnlineMode = false;
                this.state = GameState.SETUP;
                break;
            case 1: // ONLINE
                this.state = GameState.LOBBY;
                this.menuSelection = 0;
                break;
            case 2: // HOW TO PLAY
                // Show instructions
                break;
        }
    }

    processTitleClick(pos) {
        const menuItems = ['START GAME', 'ONLINE', 'HOW TO PLAY'];
        const startY = 380;
        const itemHeight = 45;

        for (let i = 0; i < menuItems.length; i++) {
            const itemY = startY + i * itemHeight;
            if (pos.y >= itemY - 20 && pos.y <= itemY + 20 &&
                pos.x >= GAME_WIDTH / 2 - 100 && pos.x <= GAME_WIDTH / 2 + 100) {
                this.menuSelection = i;
                this.selectTitleMenuItem();
                return;
            }
        }
    }

    // ========== LOBBY SCREEN ==========
    handleLobbyInput(key) {
        switch (key) {
            case 'Escape':
                this.state = GameState.TITLE;
                this.menuSelection = 0;
                break;
        }
    }

    processLobbyClick(pos) {
        const buttons = this.lobbyUI.buttons.lobby;

        if (buttons.online.contains(pos.x, pos.y)) {
            this.isOnlineMode = true;
            this.state = GameState.CREATE_ROOM;
        } else if (buttons.vsCpu.contains(pos.x, pos.y)) {
            this.isOnlineMode = false;
            this.state = GameState.SETUP;
        } else if (buttons.back.contains(pos.x, pos.y)) {
            this.state = GameState.TITLE;
            this.menuSelection = 0;
        }
    }

    // ========== CREATE ROOM SCREEN ==========
    handleCreateRoomInput(key) {
        switch (key) {
            case 'Escape':
                this.state = GameState.LOBBY;
                break;
        }
    }

    processCreateRoomClick(pos) {
        const buttons = this.lobbyUI.buttons.createRoom;

        if (buttons.create.contains(pos.x, pos.y)) {
            this.createRoom();
        } else if (buttons.join.contains(pos.x, pos.y)) {
            this.state = GameState.JOIN_ROOM;
            this.lobbyUI.roomCodeInput.clear();
        } else if (buttons.back.contains(pos.x, pos.y)) {
            this.state = GameState.LOBBY;
        }
    }

    createRoom() {
        this.isHost = true;
        this.lobbyUI.roomCode = generateRoomCode();
        this.state = GameState.WAITING;
        this.lobbyUI.connectionStatus = 'waiting';

        // In real implementation, this would create a Firebase room
        console.log('Room created:', this.lobbyUI.roomCode);
    }

    // ========== JOIN ROOM SCREEN ==========
    handleJoinRoomInput(key) {
        const input = this.lobbyUI.roomCodeInput;

        if (key === 'Escape') {
            this.state = GameState.CREATE_ROOM;
            input.clear();
        } else if (key === 'Backspace') {
            input.removeChar();
        } else if (key === 'Enter' && input.isComplete()) {
            this.joinRoom();
        } else if (key.length === 1) {
            input.addChar(key);
        }
    }

    processJoinRoomClick(pos) {
        const buttons = this.lobbyUI.buttons.joinRoom;

        if (buttons.join.contains(pos.x, pos.y) && this.lobbyUI.roomCodeInput.isComplete()) {
            this.joinRoom();
        } else if (buttons.back.contains(pos.x, pos.y)) {
            this.state = GameState.CREATE_ROOM;
            this.lobbyUI.roomCodeInput.clear();
        }
    }

    joinRoom() {
        this.isHost = false;
        this.lobbyUI.roomCode = this.lobbyUI.roomCodeInput.value;
        this.state = GameState.CONNECTING;
        this.lobbyUI.connectionStatus = 'connecting';

        // In real implementation, this would join a Firebase room
        console.log('Joining room:', this.lobbyUI.roomCode);

        // Simulate connection (for demo)
        setTimeout(() => {
            this.state = GameState.READY_CHECK;
            this.lobbyUI.setOpponentConnected(true);
        }, 2000);
    }

    // ========== WAITING SCREEN ==========
    handleWaitingInput(key) {
        if (key === 'Escape') {
            this.cancelRoom();
        }
    }

    processWaitingClick(pos) {
        const buttons = this.lobbyUI.buttons.waiting;

        if (buttons.cancel.contains(pos.x, pos.y)) {
            this.cancelRoom();
        }
    }

    cancelRoom() {
        this.state = GameState.CREATE_ROOM;
        this.lobbyUI.roomCode = '';
        this.lobbyUI.connectionStatus = 'idle';
    }

    // ========== READY CHECK SCREEN ==========
    handleReadyCheckInput(key) {
        if (key === 'Enter' || key === ' ') {
            this.toggleReady();
        } else if (key === 'Escape') {
            this.state = GameState.LOBBY;
        }
    }

    processReadyCheckClick(pos) {
        const buttons = this.lobbyUI.buttons.readyCheck;

        if (buttons.ready.contains(pos.x, pos.y)) {
            this.toggleReady();
        }
    }

    toggleReady() {
        this.lobbyUI.playerReady = !this.lobbyUI.playerReady;

        // Check if both players are ready
        if (this.lobbyUI.playerReady && this.lobbyUI.opponentReady) {
            if (this.isHost) {
                this.state = GameState.STAGE_SELECT;
            } else {
                // Wait for host to select stage
                this.state = GameState.WAITING;
                this.lobbyUI.connectionStatus = 'stage_select';
            }
        }
    }

    // ========== GAME LOOP ==========
    gameLoop(timestamp = 0) {
        const deltaTime = timestamp - this.lastTime;

        if (deltaTime >= FRAME_DURATION) {
            this.lastTime = timestamp;
            this.animationFrame++;

            this.update();
            this.render();
        }

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update() {
        this.lobbyUI.update();
    }

    render() {
        const ctx = this.ctx;

        // Clear canvas
        ctx.fillStyle = '#0d0221';
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        switch (this.state) {
            case GameState.TITLE:
                this.renderTitle();
                break;
            case GameState.LOBBY:
                this.renderLobby();
                break;
            case GameState.CREATE_ROOM:
                this.renderCreateRoom();
                break;
            case GameState.JOIN_ROOM:
                this.renderJoinRoom();
                break;
            case GameState.WAITING:
                this.renderWaiting();
                break;
            case GameState.CONNECTING:
                this.renderConnecting();
                break;
            case GameState.READY_CHECK:
                this.renderReadyCheck();
                break;
            case GameState.SETUP:
                this.renderSetup();
                break;
        }
    }

    // ========== RENDER METHODS ==========

    renderBackground() {
        const ctx = this.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
        gradient.addColorStop(0, '#0d0221');
        gradient.addColorStop(0.5, '#1a0a30');
        gradient.addColorStop(1, '#0d0221');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Animated grid
        ctx.strokeStyle = 'rgba(138, 43, 226, 0.1)';
        ctx.lineWidth = 1;

        const offset = (this.animationFrame * 0.5) % 40;

        for (let x = -40 + offset; x < GAME_WIDTH + 40; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, GAME_HEIGHT);
            ctx.stroke();
        }

        for (let y = 0; y < GAME_HEIGHT; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(GAME_WIDTH, y);
            ctx.stroke();
        }
    }

    renderTitle() {
        const ctx = this.ctx;
        this.renderBackground();

        // Logo
        ctx.font = FONTS.title;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Glow effect
        ctx.shadowColor = '#FF3333';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#FF3333';
        ctx.fillText('ROBO BATTLE', GAME_WIDTH / 2, 120);

        // V3 badge
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00FFFF';
        ctx.font = FONTS.heading;
        ctx.fillStyle = '#00FFFF';
        ctx.fillText('V3', GAME_WIDTH / 2 + 180, 100);

        ctx.shadowBlur = 0;

        // Robot silhouettes (placeholder)
        this.renderRobotSilhouettes();

        // VS
        ctx.font = 'bold 36px "Courier New", monospace';
        ctx.fillStyle = '#FFFF00';
        ctx.fillText('VS', GAME_WIDTH / 2, 280);

        // Menu
        const menuItems = ['START GAME', 'ONLINE', 'HOW TO PLAY'];
        const startY = 380;

        for (let i = 0; i < menuItems.length; i++) {
            const isSelected = i === this.menuSelection;
            const y = startY + i * 45;

            ctx.font = isSelected ? 'bold 22px "Courier New", monospace' : '18px "Courier New", monospace';
            ctx.fillStyle = isSelected ? '#FFFF00' : '#888888';

            if (isSelected) {
                ctx.shadowColor = '#FFFF00';
                ctx.shadowBlur = 10;
            }

            const prefix = isSelected ? '> ' : '  ';
            ctx.fillText(prefix + menuItems[i], GAME_WIDTH / 2, y);

            ctx.shadowBlur = 0;
        }

        // Instructions
        ctx.font = FONTS.small;
        ctx.fillStyle = '#666666';
        ctx.fillText('Arrow Keys / WASD to navigate, SPACE to select', GAME_WIDTH / 2, GAME_HEIGHT - 30);
    }

    renderRobotSilhouettes() {
        const ctx = this.ctx;

        // Player robot (red glow)
        ctx.save();
        ctx.shadowColor = '#FF4400';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#FF3333';
        this.drawRobotShape(180, 200, 100, 130, 1);
        ctx.restore();

        // Enemy robot (blue glow)
        ctx.save();
        ctx.shadowColor = '#0066FF';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#3366FF';
        this.drawRobotShape(520, 200, 100, 130, -1);
        ctx.restore();
    }

    drawRobotShape(x, y, width, height, direction) {
        const ctx = this.ctx;

        // Head
        ctx.fillRect(x + width * 0.3, y, width * 0.4, height * 0.25);

        // Body
        ctx.fillRect(x + width * 0.25, y + height * 0.25, width * 0.5, height * 0.4);

        // Arms
        ctx.fillRect(x, y + height * 0.3, width * 0.25, height * 0.25);
        ctx.fillRect(x + width * 0.75, y + height * 0.3, width * 0.25, height * 0.25);

        // Legs
        ctx.fillRect(x + width * 0.25, y + height * 0.65, width * 0.2, height * 0.35);
        ctx.fillRect(x + width * 0.55, y + height * 0.65, width * 0.2, height * 0.35);

        // Eyes
        ctx.fillStyle = '#FFFF00';
        const eyeSize = width * 0.08;
        ctx.fillRect(x + width * 0.35, y + height * 0.08, eyeSize, eyeSize);
        ctx.fillRect(x + width * 0.57, y + height * 0.08, eyeSize, eyeSize);
    }

    renderLobby() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('ROBO BATTLE V3', GAME_WIDTH / 2, 80);

        // Subtitle
        ctx.font = FONTS.body;
        ctx.fillStyle = '#00FFFF';
        ctx.fillText('Select Game Mode', GAME_WIDTH / 2, 130);

        // Decorative line
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(GAME_WIDTH / 2 - 150, 160);
        ctx.lineTo(GAME_WIDTH / 2 + 150, 160);
        ctx.stroke();

        // Buttons
        const buttons = this.lobbyUI.buttons.lobby;
        buttons.online.render(ctx);
        buttons.vsCpu.render(ctx);
        buttons.back.render(ctx);

        // Mode descriptions
        ctx.font = FONTS.small;
        ctx.fillStyle = '#888888';
        ctx.fillText('Battle against players online', GAME_WIDTH / 2, 330);
        ctx.fillText('Practice against CPU opponent', GAME_WIDTH / 2, 420);
    }

    renderCreateRoom() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00FF88';
        ctx.fillText('ONLINE BATTLE', GAME_WIDTH / 2, 80);

        // Subtitle
        ctx.font = FONTS.body;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Create or Join a Room', GAME_WIDTH / 2, 130);

        // Decorative line
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(GAME_WIDTH / 2 - 150, 160);
        ctx.lineTo(GAME_WIDTH / 2 + 150, 160);
        ctx.stroke();

        // Buttons
        const buttons = this.lobbyUI.buttons.createRoom;
        buttons.create.render(ctx);
        buttons.join.render(ctx);
        buttons.back.render(ctx);

        // Button descriptions
        ctx.font = FONTS.small;
        ctx.fillStyle = '#888888';
        ctx.fillText('Host a new game room', GAME_WIDTH / 2, 330);
        ctx.fillText('Enter a room code to join', GAME_WIDTH / 2, 420);
    }

    renderJoinRoom() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#0088FF';
        ctx.fillText('JOIN ROOM', GAME_WIDTH / 2, 80);

        // Instructions
        ctx.font = FONTS.body;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Enter Room Code:', GAME_WIDTH / 2, 200);

        // Room code input
        this.lobbyUI.roomCodeInput.render(ctx);

        // Keyboard hint
        ctx.font = FONTS.small;
        ctx.fillStyle = '#888888';
        ctx.fillText('Type 6-character code (A-Z, 0-9)', GAME_WIDTH / 2, 330);

        // Buttons
        const buttons = this.lobbyUI.buttons.joinRoom;
        buttons.join.disabled = !this.lobbyUI.roomCodeInput.isComplete();
        buttons.join.render(ctx);
        buttons.back.render(ctx);

        // Error message
        if (this.lobbyUI.errorMessage) {
            ctx.font = FONTS.body;
            ctx.fillStyle = COLORS.error;
            ctx.fillText(this.lobbyUI.errorMessage, GAME_WIDTH / 2, 520);
        }
    }

    renderWaiting() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFF00';
        ctx.fillText('WAITING FOR OPPONENT', GAME_WIDTH / 2, 80);

        // Room code display
        ctx.font = FONTS.body;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Room Code:', GAME_WIDTH / 2, 180);

        // Large room code
        ctx.save();
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 15;
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.fillStyle = '#00FFFF';
        ctx.fillText(this.lobbyUI.roomCode, GAME_WIDTH / 2, 240);
        ctx.restore();

        // Share instruction
        ctx.font = FONTS.body;
        ctx.fillStyle = '#888888';
        ctx.fillText('Share this code with your opponent!', GAME_WIDTH / 2, 300);

        // Waiting animation
        const dots = this.lobbyUI.getLoadingDots();
        ctx.font = FONTS.body;
        ctx.fillStyle = '#FFFF00';
        ctx.fillText('Waiting for player' + dots, GAME_WIDTH / 2, 380);

        // Connection animation (pulsing circles)
        this.renderConnectionAnimation(GAME_WIDTH / 2, 420);

        // Cancel button
        this.lobbyUI.buttons.waiting.cancel.render(ctx);
    }

    renderConnecting() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00FFFF';
        ctx.fillText('CONNECTING', GAME_WIDTH / 2, 200);

        // Loading animation
        const dots = this.lobbyUI.getLoadingDots();
        ctx.font = FONTS.body;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('Establishing P2P connection' + dots, GAME_WIDTH / 2, 260);

        // Connection visualization
        this.renderP2PAnimation();

        // Status
        ctx.font = FONTS.small;
        ctx.fillStyle = '#888888';
        ctx.fillText('Exchanging signaling data via Firebase', GAME_WIDTH / 2, 450);
    }

    renderP2PAnimation() {
        const ctx = this.ctx;
        const centerY = 350;
        const leftX = 250;
        const rightX = 550;

        // Left node (You)
        ctx.beginPath();
        ctx.arc(leftX, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3333';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = FONTS.small;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText('YOU', leftX, centerY + 60);

        // Right node (Opponent)
        ctx.beginPath();
        ctx.arc(rightX, centerY, 30, 0, Math.PI * 2);
        ctx.fillStyle = '#3366FF';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillText('OPPONENT', rightX, centerY + 60);

        // Animated connection line
        const progress = (this.animationFrame % 60) / 60;
        const dashOffset = progress * 40;

        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = -dashOffset;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(leftX + 35, centerY);
        ctx.lineTo(rightX - 35, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    renderReadyCheck() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00FF00';
        ctx.fillText('CONNECTED!', GAME_WIDTH / 2, 80);

        // Room code
        ctx.font = FONTS.small;
        ctx.fillStyle = '#888888';
        ctx.fillText('Room: ' + this.lobbyUI.roomCode, GAME_WIDTH / 2, 120);

        // Player boxes
        const boxWidth = 200;
        const boxHeight = 180;
        const boxY = 180;
        const spacing = 80;

        // Player box
        const playerX = GAME_WIDTH / 2 - boxWidth - spacing / 2;
        this.renderPlayerBox(playerX, boxY, boxWidth, boxHeight, 'YOU', true, this.lobbyUI.playerReady);

        // Opponent box
        const opponentX = GAME_WIDTH / 2 + spacing / 2;
        this.renderPlayerBox(opponentX, boxY, boxWidth, boxHeight, 'OPPONENT', this.lobbyUI.opponentConnected, this.lobbyUI.opponentReady);

        // Ready button
        const readyBtn = this.lobbyUI.buttons.readyCheck.ready;
        readyBtn.text = this.lobbyUI.playerReady ? 'READY!' : 'PRESS TO READY';
        readyBtn.color = this.lobbyUI.playerReady ? '#00AA00' : COLORS.online;
        readyBtn.render(ctx);

        // Status message
        ctx.font = FONTS.body;
        ctx.fillStyle = '#FFFF00';
        if (this.lobbyUI.playerReady && !this.lobbyUI.opponentReady) {
            ctx.fillText('Waiting for opponent to ready...', GAME_WIDTH / 2, 500);
        } else if (!this.lobbyUI.playerReady && this.lobbyUI.opponentReady) {
            ctx.fillText('Opponent is ready! Press READY to start', GAME_WIDTH / 2, 500);
        } else if (this.lobbyUI.playerReady && this.lobbyUI.opponentReady) {
            ctx.fillText('Both ready! Starting battle...', GAME_WIDTH / 2, 500);
        }
    }

    renderPlayerBox(x, y, width, height, label, connected, ready) {
        const ctx = this.ctx;

        // Box background
        ctx.fillStyle = connected ? 'rgba(0, 100, 0, 0.3)' : 'rgba(50, 50, 50, 0.3)';
        ctx.fillRect(x, y, width, height);

        // Box border
        ctx.strokeStyle = connected ? (ready ? '#00FF00' : '#FFFF00') : '#666666';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        // Label
        ctx.font = FONTS.subheading;
        ctx.textAlign = 'center';
        ctx.fillStyle = connected ? '#FFFFFF' : '#666666';
        ctx.fillText(label, x + width / 2, y + 30);

        // Robot icon or waiting
        if (connected) {
            // Simple robot icon
            ctx.fillStyle = label === 'YOU' ? '#FF3333' : '#3366FF';
            this.drawRobotShape(x + width / 2 - 40, y + 50, 80, 80, 1);
        } else {
            ctx.font = FONTS.body;
            ctx.fillStyle = '#666666';
            ctx.fillText('Waiting...', x + width / 2, y + height / 2);
        }

        // Ready status
        if (connected) {
            ctx.font = FONTS.body;
            if (ready) {
                ctx.fillStyle = '#00FF00';
                ctx.fillText('READY', x + width / 2, y + height - 20);
            } else {
                ctx.fillStyle = '#FFFF00';
                ctx.fillText('NOT READY', x + width / 2, y + height - 20);
            }
        }
    }

    renderConnectionAnimation(x, y) {
        const ctx = this.ctx;
        const time = this.animationFrame * 0.1;

        for (let i = 0; i < 3; i++) {
            const phase = (time + i * 0.7) % 3;
            const alpha = 1 - (phase / 3);
            const radius = 10 + phase * 15;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    renderSetup() {
        const ctx = this.ctx;
        this.renderBackground();

        // Title
        ctx.font = FONTS.heading;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('ROBOT CUSTOMIZATION', GAME_WIDTH / 2, 80);

        // Placeholder for setup screen
        ctx.font = FONTS.body;
        ctx.fillStyle = '#888888';
        ctx.fillText('(Setup screen - inherited from V2)', GAME_WIDTH / 2, GAME_HEIGHT / 2);

        ctx.font = FONTS.small;
        ctx.fillStyle = '#666666';
        ctx.fillText('Press ESC to go back', GAME_WIDTH / 2, GAME_HEIGHT - 30);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // Hide loading screen
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }

    // Initialize game
    window.game = new RoboBattleGame(canvas);
    console.log('ROBO BATTLE V3 initialized');
});
