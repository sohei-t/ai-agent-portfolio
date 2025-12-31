// Virtual Joystick - Space Odyssey
// 必須フォールバックコントロール

class VirtualJoystick {
    constructor(game) {
        this.game = game;
        this.enabled = true;

        // DOM要素
        this.container = document.getElementById('virtualJoystick');
        this.knob = document.getElementById('joystickKnob');

        // ジョイスティック設定
        this.radius = 60; // ジョイスティックの半径
        this.knobRadius = 20; // ノブの半径
        this.centerX = this.radius;
        this.centerY = this.radius;

        // 現在の状態
        this.active = false;
        this.currentX = 0;
        this.currentY = 0;
        this.touchId = null;

        // 入力値
        this.inputX = 0;
        this.inputY = 0;

        // 初期化
        this.init();
    }

    init() {
        if (!this.container || !this.knob) {
            console.error('ジョイスティック要素が見つかりません');
            return;
        }

        // タッチイベント
        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.container.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        this.container.addEventListener('touchcancel', this.handleTouchEnd.bind(this), { passive: false });

        // マウスイベント（デバッグ用）
        this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));

        // サイズ調整
        this.updateSize();
        window.addEventListener('resize', () => this.updateSize());
    }

    updateSize() {
        // コンテナサイズに基づいて調整
        const rect = this.container.getBoundingClientRect();
        this.radius = rect.width / 2;
        this.centerX = this.radius;
        this.centerY = this.radius;
    }

    handleTouchStart(e) {
        e.preventDefault();

        if (this.touchId !== null) return; // 既にアクティブ

        const touch = e.changedTouches[0];
        this.touchId = touch.identifier;
        this.active = true;

        const rect = this.container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.updatePosition(x, y);

        // ハプティックフィードバック（対応デバイスのみ）
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
    }

    handleTouchMove(e) {
        e.preventDefault();

        if (!this.active) return;

        // 正しいタッチを探す
        let touch = null;
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === this.touchId) {
                touch = e.changedTouches[i];
                break;
            }
        }

        if (!touch) return;

        const rect = this.container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.updatePosition(x, y);
    }

    handleTouchEnd(e) {
        e.preventDefault();

        // 終了したタッチを探す
        let touchEnded = false;
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === this.touchId) {
                touchEnded = true;
                break;
            }
        }

        if (touchEnded) {
            this.reset();
        }
    }

    handleMouseDown(e) {
        if ('ontouchstart' in window) return; // タッチデバイスでは無視

        this.active = true;
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.updatePosition(x, y);
    }

    handleMouseMove(e) {
        if (!this.active || 'ontouchstart' in window) return;

        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.updatePosition(x, y);
    }

    handleMouseUp(e) {
        if ('ontouchstart' in window) return;
        this.reset();
    }

    updatePosition(x, y) {
        // 中心からの距離と角度を計算
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // 最大半径に制限
        const limitedDistance = Math.min(distance, this.radius - this.knobRadius);

        // ノブの位置を更新
        this.currentX = Math.cos(angle) * limitedDistance;
        this.currentY = Math.sin(angle) * limitedDistance;

        // 入力値を正規化（-1 〜 1）
        this.inputX = this.currentX / (this.radius - this.knobRadius);
        this.inputY = this.currentY / (this.radius - this.knobRadius);

        // ビジュアル更新
        this.updateVisual();

        // プレイヤーに入力を送信
        if (this.game && this.game.player) {
            this.game.player.setInputFromJoystick(this.inputX, this.inputY);
        }
    }

    reset() {
        this.active = false;
        this.touchId = null;
        this.currentX = 0;
        this.currentY = 0;
        this.inputX = 0;
        this.inputY = 0;

        // ビジュアルをリセット
        this.updateVisual();

        // プレイヤーの入力をリセット
        if (this.game && this.game.player) {
            this.game.player.setInputFromJoystick(0, 0);
        }
    }

    updateVisual() {
        if (!this.knob) return;

        // ノブの位置を更新
        this.knob.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;

        // アクティブ時のビジュアルフィードバック
        if (this.active) {
            this.container.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            this.container.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            this.knob.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            this.container.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            this.container.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            this.knob.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
    }

    enable() {
        this.enabled = true;
        if (this.container) {
            this.container.style.display = 'block';
        }
    }

    disable() {
        this.enabled = false;
        this.reset();
        if (this.container) {
            this.container.style.display = 'none';
        }
    }

    // デバッグ用
    getDebugInfo() {
        return {
            active: this.active,
            input: {
                x: this.inputX.toFixed(2),
                y: this.inputY.toFixed(2)
            },
            position: {
                x: this.currentX.toFixed(2),
                y: this.currentY.toFixed(2)
            }
        };
    }
}

// グローバルインスタンス
let virtualJoystick = null;

// 初期化関数
function initVirtualJoystick(game) {
    virtualJoystick = new VirtualJoystick(game);

    // デフォルトでジョイスティックを表示（フォールバック）
    const isMobile = 'ontouchstart' in window;
    if (isMobile) {
        const joystickElement = document.getElementById('virtualJoystick');
        if (joystickElement) {
            joystickElement.style.display = 'block';
        }
    }

    return virtualJoystick;
}

// コントロールモード切り替え
function toggleControlMode(game) {
    const toggleButton = document.getElementById('controlModeToggle');
    if (!toggleButton) return;

    // ジャイロが有効な場合
    if (gyroControls && gyroControls.enabled) {
        // ジョイスティックモードに切り替え
        gyroControls.disable();
        if (virtualJoystick) {
            virtualJoystick.enable();
        }
        toggleButton.textContent = '🕹️ Stick';
        toggleButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    } else {
        // ジャイロモードを試みる
        if (gyroControls) {
            gyroControls.requestPermission();
        }
    }
}