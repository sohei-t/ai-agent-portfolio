// Input handling - Space Odyssey
class InputManager {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.mouseX = 0;
        this.mouseY = 0;
        this.mousePressed = false;
        this.touchActive = false;

        this.init();
    }

    init() {
        // キーボードイベント
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        // マウスイベント
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
            canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
            canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        }

        // タッチイベント（ゲーム画面タップで攻撃）
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // モバイルコントロール初期化
        if ('ontouchstart' in window) {
            this.initMobileControls();
        }
    }

    initMobileControls() {
        // ジョイスティック初期化
        if (typeof initVirtualJoystick === 'function') {
            initVirtualJoystick(this.game);
        }

        // ジャイロコントロール初期化
        if (typeof initGyroControls === 'function') {
            initGyroControls(this.game);
        }
    }

    handleKeyDown(e) {
        this.keys[e.key.toLowerCase()] = true;

        // プレイヤー入力更新
        if (this.game.player && this.game.state === 'playing') {
            this.updatePlayerInput();

            // 特殊キー処理
            switch (e.key.toLowerCase()) {
                case ' ':
                case 'z':
                    this.game.player.input.fire = true;
                    e.preventDefault();
                    break;
                case 'x':
                case 'b':
                    // ボム使用
                    this.game.player.useBomb();
                    e.preventDefault();
                    break;
                case 'p':
                case 'escape':
                    // ポーズ
                    this.game.pauseGame();
                    e.preventDefault();
                    break;
            }
        }

        // デバッグキー
        if (e.key === 'F1') {
            this.game.settings.showFPS = !this.game.settings.showFPS;
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        this.keys[e.key.toLowerCase()] = false;

        if (this.game.player && this.game.state === 'playing') {
            this.updatePlayerInput();

            if (e.key === ' ' || e.key.toLowerCase() === 'z') {
                this.game.player.input.fire = false;
            }
        }
    }

    updatePlayerInput() {
        if (!this.game.player) return;

        const player = this.game.player;

        // 移動入力
        player.input.left = this.keys['arrowleft'] || this.keys['a'];
        player.input.right = this.keys['arrowright'] || this.keys['d'];
        player.input.up = this.keys['arrowup'] || this.keys['w'];
        player.input.down = this.keys['arrowdown'] || this.keys['s'];
    }

    handleMouseMove(e) {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        this.mouseX = (e.clientX - rect.left) * scaleX;
        this.mouseY = (e.clientY - rect.top) * scaleY;

        // マウスによるプレイヤー移動（PC版）- 常に追従
        if (this.game.player && this.game.state === 'playing' && !this.touchActive) {
            // マウス位置に向かって移動
            const dx = this.mouseX - this.game.player.x;
            const dy = this.mouseY - this.game.player.y;

            // スムーズな移動のために速度を調整（より速く反応）
            this.game.player.x += dx * 0.25;  // 0.15から0.25に増加
            this.game.player.y += dy * 0.25;  // より速い追従
        }
    }

    handleMouseDown(e) {
        this.mousePressed = true;

        if (this.game.player && this.game.state === 'playing') {
            this.game.player.input.fire = true;
        }
    }

    handleMouseUp(e) {
        this.mousePressed = false;

        if (this.game.player && this.game.state === 'playing') {
            this.game.player.input.fire = false;
        }
    }

    handleTouchStart(e) {
        this.touchActive = true;

        // ゲーム画面タップで攻撃
        if (this.game.player && this.game.state === 'playing') {
            const target = e.target;

            // ジョイスティックやボタン以外のタップ
            if (!target.closest('#virtualJoystick') &&
                !target.closest('#controlModeToggle') &&
                !target.closest('.menu-button')) {

                this.game.player.input.fire = true;

                // ダブルタップでボム
                if (this.lastTapTime && Date.now() - this.lastTapTime < 300) {
                    this.game.player.useBomb();
                }
                this.lastTapTime = Date.now();
            }
        }
    }

    handleTouchEnd(e) {
        if (this.game.player && this.game.state === 'playing') {
            const target = e.target;

            if (!target.closest('#virtualJoystick') &&
                !target.closest('#controlModeToggle')) {
                this.game.player.input.fire = false;
            }
        }
    }

    // ゲームパッド対応（オプション）
    updateGamepad() {
        const gamepads = navigator.getGamepads();
        if (!gamepads[0]) return;

        const gamepad = gamepads[0];

        if (this.game.player && this.game.state === 'playing') {
            // アナログスティック
            const deadZone = 0.2;
            const leftX = Math.abs(gamepad.axes[0]) > deadZone ? gamepad.axes[0] : 0;
            const leftY = Math.abs(gamepad.axes[1]) > deadZone ? gamepad.axes[1] : 0;

            this.game.player.input.left = leftX < -deadZone;
            this.game.player.input.right = leftX > deadZone;
            this.game.player.input.up = leftY < -deadZone;
            this.game.player.input.down = leftY > deadZone;

            // ボタン
            this.game.player.input.fire = gamepad.buttons[0].pressed; // A/×ボタン
            if (gamepad.buttons[1].pressed) { // B/○ボタン
                this.game.player.useBomb();
            }
            if (gamepad.buttons[9].pressed) { // スタートボタン
                this.game.pauseGame();
            }
        }
    }

    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }

    getMousePosition() {
        return { x: this.mouseX, y: this.mouseY };
    }
}

// グローバルインスタンス
let inputManager = null;

// 初期化
function initInputManager(game) {
    inputManager = new InputManager(game);
    return inputManager;
}