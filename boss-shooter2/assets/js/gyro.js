// Gyro Controls - Space Odyssey
// GYRO_CONTROLS_STANDARD.md v2.0 準拠

class GyroControls {
    constructor(game) {
        this.game = game;
        this.enabled = false;
        this.permissionGranted = false;

        // 設定（v2.0で高感度化）
        this.sensitivity = 2.5;  // 感度を少し下げる（3.5→2.5）
        this.deadZone = 8; // 度（ドリフトを防ぐため増やす 5→8）
        this.maxTilt = 25; // 度（20→25）

        // 現在の値
        this.alpha = 0; // Z軸周りの回転
        this.beta = 0;  // X軸周りの回転（前後の傾き）
        this.gamma = 0; // Y軸周りの回転（左右の傾き）

        // 補正値（水平面に置いた状態を想定）
        // betaの初期値を調整（デバイスによって異なるが、60-90度が一般的）
        this.calibration = {
            beta: 60,  // 水平面に置いた場合の典型的な角度（70→60に調整）
            gamma: 0
        };

        // スムージング
        this.smoothing = 0.2;
        this.smoothedValues = {
            x: 0,
            y: 0
        };

        // 自動キャリブレーション用
        this.calibrationSamples = [];
        this.isAutoCalibrating = false;
    }

    async requestPermission() {
        // iOS 13+ の許可リクエスト
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const response = await DeviceOrientationEvent.requestPermission();
                if (response === 'granted') {
                    this.permissionGranted = true;
                    this.enable();
                    return true;
                } else {
                    console.warn('ジャイロセンサーの許可が拒否されました');
                    return false;
                }
            } catch (error) {
                console.error('ジャイロセンサーの許可リクエストエラー:', error);
                return false;
            }
        } else {
            // Android または古いiOS
            this.permissionGranted = true;
            this.enable();
            return true;
        }
    }

    enable() {
        if (!this.enabled && this.permissionGranted) {
            this.enabled = true;

            // イベントリスナー追加
            window.addEventListener('deviceorientation', this.handleOrientation.bind(this));

            // 初期自動キャリブレーション（1秒後に開始）
            setTimeout(() => {
                this.startAutoCalibration();
            }, 1000);

            console.log('ジャイロコントロール有効化');
        }
    }

    startAutoCalibration() {
        this.isAutoCalibrating = true;
        this.calibrationSamples = [];

        // 0.5秒間サンプルを収集
        const calibrationInterval = setInterval(() => {
            if (this.beta !== 0 || this.gamma !== 0) {
                this.calibrationSamples.push({
                    beta: this.beta,
                    gamma: this.gamma
                });
            }
        }, 50);

        // 0.5秒後に平均値でキャリブレーション
        setTimeout(() => {
            clearInterval(calibrationInterval);
            if (this.calibrationSamples.length > 0) {
                const avgBeta = this.calibrationSamples.reduce((sum, s) => sum + s.beta, 0) / this.calibrationSamples.length;
                const avgGamma = this.calibrationSamples.reduce((sum, s) => sum + s.gamma, 0) / this.calibrationSamples.length;

                this.calibration.beta = avgBeta;
                this.calibration.gamma = avgGamma;

                console.log('自動キャリブレーション完了:', this.calibration);
            }
            this.isAutoCalibrating = false;
        }, 500);
    }

    disable() {
        if (this.enabled) {
            this.enabled = false;
            window.removeEventListener('deviceorientation', this.handleOrientation.bind(this));
            console.log('ジャイロコントロール無効化');
        }
    }

    handleOrientation(event) {
        if (!this.enabled || !this.game.player) return;

        // 値の取得
        this.alpha = event.alpha || 0;
        this.beta = event.beta || 0;
        this.gamma = event.gamma || 0;

        // 入力値の計算
        const input = this.calculateInput();

        // プレイヤーに入力を送信
        if (this.game.player) {
            this.game.player.setInputFromGyro(input.x, input.y);
        }
    }

    calculateInput() {
        // キャリブレーション適用
        let adjustedBeta = this.beta - this.calibration.beta;
        let adjustedGamma = this.gamma - this.calibration.gamma;

        // 縦向き/横向き対応
        const isLandscape = window.innerWidth > window.innerHeight;

        let x, y;
        if (isLandscape) {
            // 横向きの場合
            x = adjustedBeta;
            y = adjustedGamma;
        } else {
            // 縦向きの場合
            x = adjustedGamma;
            y = adjustedBeta;
        }

        // デッドゾーン適用
        if (Math.abs(x) < this.deadZone) x = 0;
        if (Math.abs(y) < this.deadZone) y = 0;

        // 正規化（-1 〜 1）
        x = this.clamp(x / this.maxTilt, -1, 1);
        y = this.clamp(y / this.maxTilt, -1, 1);

        // 感度適用
        x *= this.sensitivity;
        y *= this.sensitivity;

        // スムージング
        this.smoothedValues.x += (x - this.smoothedValues.x) * this.smoothing;
        this.smoothedValues.y += (y - this.smoothedValues.y) * this.smoothing;

        return {
            x: this.smoothedValues.x,
            y: this.smoothedValues.y
        };
    }

    calibrate() {
        // 現在の傾きを基準値として保存
        this.calibration.beta = this.beta;
        this.calibration.gamma = this.gamma;

        console.log('ジャイロキャリブレーション完了', this.calibration);

        // 視覚的フィードバック
        if (typeof showNotification === 'function') {
            showNotification('ジャイロキャリブレーション完了');
        }
    }

    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // デバッグ用
    getDebugInfo() {
        return {
            enabled: this.enabled,
            permissionGranted: this.permissionGranted,
            raw: {
                alpha: this.alpha.toFixed(2),
                beta: this.beta.toFixed(2),
                gamma: this.gamma.toFixed(2)
            },
            calibration: {
                beta: this.calibration.beta.toFixed(2),
                gamma: this.calibration.gamma.toFixed(2)
            },
            input: {
                x: this.smoothedValues.x.toFixed(2),
                y: this.smoothedValues.y.toFixed(2)
            }
        };
    }
}

// グローバルインスタンス
let gyroControls = null;

// 初期化関数
function initGyroControls(game) {
    gyroControls = new GyroControls(game);

    // iOS 18対応: click または touchend イベント内で許可取得
    const requestGyroPermission = async (e) => {
        e.preventDefault();

        const success = await gyroControls.requestPermission();
        if (success) {
            // 成功したらジョイスティックを非表示
            const joystick = document.getElementById('virtualJoystick');
            if (joystick) {
                joystick.style.display = 'none';
            }

            // ボタンテキスト更新
            const toggle = document.getElementById('controlModeToggle');
            if (toggle) {
                toggle.textContent = '🎯 Tilt Active';
                toggle.style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
            }
        } else {
            // 失敗したらジョイスティックモードに戻す
            showNotification('ジャイロ許可が拒否されました。ジョイスティックモードを使用してください。');
        }
    };

    // コントロールモード切り替えボタン
    const toggleButton = document.getElementById('controlModeToggle');
    if (toggleButton) {
        // iOS 18: touchend を使用
        if ('ontouchstart' in window) {
            toggleButton.addEventListener('touchend', requestGyroPermission, { passive: false });
        } else {
            toggleButton.addEventListener('click', requestGyroPermission);
        }
    }

    return gyroControls;
}

// 通知表示
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 16px;
        z-index: 10000;
        pointer-events: none;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}