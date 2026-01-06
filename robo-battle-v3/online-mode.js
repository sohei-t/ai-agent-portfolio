/**
 * ROBO BATTLE V3 - Online Mode
 * Minimal addition to V2 for P2P online battles
 *
 * Architecture:
 * - Firebase Realtime Database for signaling (room creation, WebRTC exchange)
 * - WebRTC DataChannel for low-latency game state sync
 * - Host controls game logic, Client sends input
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const ONLINE_CONFIG = {
    roomCodeLength: 6,
    roomExpireTime: 300000,  // 5 minutes
    syncRate: 60,            // 60Hz sync
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
    ]
};

// ============================================================================
// ROOM MANAGER (Firebase Signaling)
// ============================================================================

class RoomManager {
    constructor() {
        this.roomCode = null;
        this.isHost = false;
        this.roomRef = null;
        this.unsubscribe = null;
    }

    generateRoomCode() {
        // Numeric-only code for easier mobile input
        // 6 digits = 1 million combinations (sufficient for casual use)
        let code = '';
        for (let i = 0; i < ONLINE_CONFIG.roomCodeLength; i++) {
            code += Math.floor(Math.random() * 10).toString();
        }
        return code;
    }

    async createRoom() {
        if (!window.isFirebaseReady()) {
            throw new Error('Firebase not initialized');
        }

        this.roomCode = this.generateRoomCode();
        this.isHost = true;

        const roomData = {
            host: {
                joined: Date.now(),
                ready: false
            },
            guest: null,
            offer: null,
            answer: null,
            hostCandidates: [],
            guestCandidates: [],
            state: 'waiting',  // waiting, connecting, ready, playing
            createdAt: Date.now()
        };

        this.roomRef = window.firebaseRef(window.firebaseDB, `rooms/${this.roomCode}`);
        await window.firebaseSet(this.roomRef, roomData);

        console.log(`[Room] Created room: ${this.roomCode}`);
        return this.roomCode;
    }

    async joinRoom(code) {
        if (!window.isFirebaseReady()) {
            throw new Error('Firebase not initialized');
        }

        // Trim whitespace and use as-is (numeric code)
        this.roomCode = code.trim();
        this.isHost = false;

        this.roomRef = window.firebaseRef(window.firebaseDB, `rooms/${this.roomCode}`);
        const snapshot = await window.firebaseGet(this.roomRef);

        if (!snapshot.exists()) {
            throw new Error('Room not found');
        }

        const roomData = snapshot.val();
        if (roomData.guest) {
            throw new Error('Room is full');
        }

        await window.firebaseUpdate(this.roomRef, {
            guest: {
                joined: Date.now(),
                ready: false
            },
            state: 'connecting'
        });

        console.log(`[Room] Joined room: ${this.roomCode}`);
        return true;
    }

    async setOffer(offer) {
        if (!this.roomRef || !this.isHost) return;
        await window.firebaseUpdate(this.roomRef, { offer: offer });
    }

    async setAnswer(answer) {
        if (!this.roomRef || this.isHost) return;
        await window.firebaseUpdate(this.roomRef, { answer: answer });
    }

    async addIceCandidate(candidate) {
        if (!this.roomRef) return;
        const path = this.isHost ? 'hostCandidates' : 'guestCandidates';
        const candidateRef = window.firebaseRef(window.firebaseDB, `rooms/${this.roomCode}/${path}`);
        await window.firebasePush(candidateRef, candidate);
    }

    onRoomUpdate(callback) {
        if (!this.roomRef) return;
        this.unsubscribe = window.firebaseOnValue(this.roomRef, (snapshot) => {
            callback(snapshot.val());
        });
    }

    async setReady() {
        if (!this.roomRef) return;
        const path = this.isHost ? 'host/ready' : 'guest/ready';
        await window.firebaseUpdate(this.roomRef, { [path]: true });
    }

    async setPlaying() {
        if (!this.roomRef || !this.isHost) return;
        await window.firebaseUpdate(this.roomRef, { state: 'playing' });
    }

    async leaveRoom() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }

        if (this.roomRef) {
            if (this.isHost) {
                await window.firebaseRemove(this.roomRef);
            } else {
                await window.firebaseUpdate(this.roomRef, {
                    guest: null,
                    state: 'waiting'
                });
            }
        }

        this.roomCode = null;
        this.isHost = false;
        this.roomRef = null;
    }
}

// ============================================================================
// WEBRTC MANAGER
// ============================================================================

class WebRTCManager {
    constructor(roomManager) {
        this.roomManager = roomManager;
        this.peerConnection = null;
        this.dataChannel = null;
        this.onMessageCallback = null;
        this.onConnectedCallback = null;
        this.onDisconnectedCallback = null;
    }

    async init() {
        this.peerConnection = new RTCPeerConnection({
            iceServers: ONLINE_CONFIG.iceServers
        });

        // ICE candidate handling
        this.peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                await this.roomManager.addIceCandidate(event.candidate.toJSON());
            }
        };

        // Connection state
        this.peerConnection.onconnectionstatechange = () => {
            console.log(`[WebRTC] Connection state: ${this.peerConnection.connectionState}`);
            if (this.peerConnection.connectionState === 'connected') {
                if (this.onConnectedCallback) this.onConnectedCallback();
            } else if (this.peerConnection.connectionState === 'disconnected' ||
                       this.peerConnection.connectionState === 'failed') {
                if (this.onDisconnectedCallback) this.onDisconnectedCallback();
            }
        };

        // Data channel (for receiving on guest side)
        this.peerConnection.ondatachannel = (event) => {
            this.setupDataChannel(event.channel);
        };

        // If host, create data channel
        if (this.roomManager.isHost) {
            const channel = this.peerConnection.createDataChannel('gameSync', {
                ordered: false,
                maxRetransmits: 0
            });
            this.setupDataChannel(channel);
        }
    }

    setupDataChannel(channel) {
        this.dataChannel = channel;

        this.dataChannel.onopen = () => {
            console.log('[WebRTC] Data channel open');
        };

        this.dataChannel.onclose = () => {
            console.log('[WebRTC] Data channel closed');
        };

        this.dataChannel.onmessage = (event) => {
            if (this.onMessageCallback) {
                try {
                    const data = JSON.parse(event.data);
                    this.onMessageCallback(data);
                } catch (e) {
                    console.error('[WebRTC] Message parse error:', e);
                }
            }
        };
    }

    async createOffer() {
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        await this.roomManager.setOffer({
            type: offer.type,
            sdp: offer.sdp
        });
    }

    async handleOffer(offer) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        await this.roomManager.setAnswer({
            type: answer.type,
            sdp: answer.sdp
        });
    }

    async handleAnswer(answer) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }

    async addIceCandidate(candidate) {
        try {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
            console.error('[WebRTC] ICE candidate error:', e);
        }
    }

    send(data) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            this.dataChannel.send(JSON.stringify(data));
        }
    }

    onMessage(callback) {
        this.onMessageCallback = callback;
    }

    onConnected(callback) {
        this.onConnectedCallback = callback;
    }

    onDisconnected(callback) {
        this.onDisconnectedCallback = callback;
    }

    close() {
        if (this.dataChannel) {
            this.dataChannel.close();
            this.dataChannel = null;
        }
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }
    }
}

// ============================================================================
// NETWORK PLAYER (Replaces EnemyAI for online mode)
// ============================================================================

class NetworkPlayer {
    constructor(robot) {
        this.robot = robot;
        // Queues for one-frame events (accumulate until processed)
        this.pendingJump = false;
        this.pendingShootDown = false;
        this.pendingShootUp = false;
        this.pendingKick = false;
        // Continuous states
        this.moveLeft = false;
        this.moveRight = false;
        this.shooting = false;  // true while fire button held
        this.currentAction = 'idle';
    }

    // Called by WebRTC when receiving remote input
    setRemoteInput(input) {
        // One-frame events: accumulate (don't overwrite with false)
        if (input.jump) this.pendingJump = true;
        if (input.shootDown) this.pendingShootDown = true;
        if (input.shootUp) this.pendingShootUp = true;
        if (input.kick) this.pendingKick = true;

        // Continuous states: direct update
        this.moveLeft = input.left || false;
        this.moveRight = input.right || false;
        this.shooting = input.shoot || false;
    }

    // Called every frame (same interface as EnemyAI.update)
    update(deltaTime, opponent, beams) {
        // ===== FACING DIRECTION (ALWAYS face opponent) =====
        // Unified behavior: both robots always face each other
        // This gives a fighting game feel - walk forward toward enemy, backward away
        if (opponent) {
            this.robot.facingRight = opponent.x > this.robot.x;
        }

        // ===== MOVEMENT =====
        // Note: Facing direction is NOT changed by movement - always face opponent
        if (this.moveLeft) {
            this.robot.move(-1);
        } else if (this.moveRight) {
            this.robot.move(1);
        } else {
            // Not moving - stop and reset walk state
            this.robot.velocityX = 0;
            if (this.robot.state === 'walk') {
                this.robot.state = 'idle';
            }
        }

        // ===== JUMP =====
        if (this.pendingJump) {
            this.robot.jump();
            this.pendingJump = false;  // Clear after processing
        }

        // ===== CHARGE BEAM =====
        // Start charging
        if (this.pendingShootDown) {
            if (!this.robot.isCharging && this.robot.beamCooldown <= 0) {
                this.robot.isCharging = true;
                this.robot.chargeStartTime = Date.now();
                this.robot.chargeLevel = 0;
                this.robot.state = 'attack';
            }
            this.pendingShootDown = false;  // Clear after processing
        }

        // Update charge level while charging
        if (this.robot.isCharging) {
            const chargeTime = Date.now() - this.robot.chargeStartTime;
            this.robot.chargeLevel = Math.min(chargeTime / 2000, 1.0);
            this.robot.state = 'attack';

            // Face opponent while charging (important for beam direction)
            if (opponent) {
                this.robot.facingRight = opponent.x > this.robot.x;
            }
        }

        // Release charged beam
        if (this.pendingShootUp) {
            if (this.robot.isCharging && this.robot.chargeLevel > 0) {
                // Face opponent before firing
                if (opponent) {
                    this.robot.facingRight = opponent.x > this.robot.x;
                }

                // Create beam
                const owner = this.robot.isPlayer ? 'player' : 'enemy';
                const existingBeam = beams ? beams.find(b => b.owner === owner && b.active) : null;

                if (!existingBeam && beams) {
                    const chargeMultiplier = 1 + (this.robot.chargeLevel * 2);
                    const damage = Math.round(this.robot.beamDamage * chargeMultiplier);
                    const sizeMultiplier = 1 + (this.robot.chargeLevel * 1.5);

                    const beamWidth = 20 * sizeMultiplier;
                    const beamHeight = 10 * sizeMultiplier;

                    const beam = new Beam(
                        this.robot.facingRight ? this.robot.x + this.robot.width : this.robot.x - beamWidth,
                        this.robot.y + this.robot.height / 2 - beamHeight / 2,
                        this.robot.facingRight ? 1 : -1,
                        damage,
                        owner,
                        this.robot.chargeLevel
                    );
                    beams.push(beam);

                    this.robot.beamCooldown = 500;  // 500ms cooldown

                    // Play sound
                    if (typeof SoundManager !== 'undefined') {
                        SoundManager.playBeamShoot(this.robot.chargeLevel);
                    }
                }

                // Reset charge state
                this.robot.isCharging = false;
                this.robot.chargeLevel = 0;
            }
            this.pendingShootUp = false;  // Clear after processing
        }

        // ===== KICK =====
        if (this.pendingKick && opponent) {
            this.robot.kick(opponent);
            this.pendingKick = false;
            this.currentAction = 'kick';
        } else {
            this.currentAction = 'idle';
        }

        // ===== STATE RESET =====
        // Reset attack state when not charging and cooldown done
        if (this.robot.state === 'attack' && !this.robot.isCharging && this.robot.beamCooldown <= 0) {
            this.robot.state = 'idle';
        }
    }
}

// ============================================================================
// ONLINE MODE CONTROLLER (Main Interface)
// ============================================================================

class OnlineModeController {
    constructor(game) {
        this.game = game;
        this.roomManager = new RoomManager();
        this.webrtc = null;
        this.networkPlayer = null;
        this.isConnected = false;
        this.lastSyncTime = 0;

        // Sync interval (ms)
        this.syncInterval = 1000 / ONLINE_CONFIG.syncRate;
    }

    async createRoom() {
        await initFirebase();
        const code = await this.roomManager.createRoom();

        this.webrtc = new WebRTCManager(this.roomManager);
        await this.webrtc.init();

        this.setupRoomListener();
        return code;
    }

    async joinRoom(code) {
        await initFirebase();
        await this.roomManager.joinRoom(code);

        this.webrtc = new WebRTCManager(this.roomManager);
        await this.webrtc.init();

        this.setupRoomListener();
        return true;
    }

    setupRoomListener() {
        let processedCandidates = new Set();
        let answerProcessed = false;  // Prevent duplicate answer processing
        let offerCreated = false;     // Prevent duplicate offer creation

        this.roomManager.onRoomUpdate(async (room) => {
            if (!room) {
                console.log('[Online] Room deleted');
                this.disconnect();
                return;
            }

            // Host: wait for guest, then create offer
            if (this.roomManager.isHost) {
                if (room.guest && !room.offer && !offerCreated) {
                    offerCreated = true;
                    console.log('[Online] Guest joined, creating offer...');
                    await this.webrtc.createOffer();
                }

                if (room.answer && !answerProcessed && !this.isConnected) {
                    answerProcessed = true;
                    console.log('[Online] Received answer');
                    try {
                        await this.webrtc.handleAnswer(room.answer);
                    } catch (e) {
                        console.warn('[Online] Answer already processed:', e.message);
                    }
                }

                // Process guest's ICE candidates
                if (room.guestCandidates) {
                    for (const [id, candidate] of Object.entries(room.guestCandidates)) {
                        if (!processedCandidates.has(id)) {
                            processedCandidates.add(id);
                            await this.webrtc.addIceCandidate(candidate);
                        }
                    }
                }
            }

            // Guest: wait for offer, then create answer
            if (!this.roomManager.isHost) {
                if (room.offer && !room.answer) {
                    console.log('[Online] Received offer, creating answer...');
                    await this.webrtc.handleOffer(room.offer);
                }

                // Process host's ICE candidates
                if (room.hostCandidates) {
                    for (const [id, candidate] of Object.entries(room.hostCandidates)) {
                        if (!processedCandidates.has(id)) {
                            processedCandidates.add(id);
                            await this.webrtc.addIceCandidate(candidate);
                        }
                    }
                }
            }
        });

        // WebRTC connection established
        this.webrtc.onConnected(() => {
            console.log('[Online] P2P Connected!');
            this.isConnected = true;

            // Notify game
            if (this.game.onOnlineConnected) {
                this.game.onOnlineConnected();
            }
        });

        // WebRTC disconnected
        this.webrtc.onDisconnected(() => {
            console.log('[Online] P2P Disconnected');
            this.isConnected = false;

            if (this.game.onOnlineDisconnected) {
                this.game.onOnlineDisconnected();
            }
        });

        // Handle incoming messages
        this.webrtc.onMessage((data) => {
            this.handleNetworkMessage(data);
        });
    }

    handleNetworkMessage(data) {
        switch (data.type) {
            case 'input':
                // Remote player's input (for NetworkPlayer)
                if (this.networkPlayer) {
                    this.networkPlayer.setRemoteInput(data.input);
                }
                break;

            case 'gameState':
                // Full game state sync (from host to client)
                if (!this.roomManager.isHost && this.game.applyNetworkState) {
                    this.game.applyNetworkState(data.state);
                }
                break;

            case 'startBattle':
                // Host signals battle start
                if (!this.roomManager.isHost && this.game.onNetworkBattleStart) {
                    this.game.onNetworkBattleStart(data);
                }
                break;
        }
    }

    // Called by game to send local input (client -> host)
    sendInput(input) {
        if (!this.isConnected) return;

        this.webrtc.send({
            type: 'input',
            input: input,
            timestamp: Date.now()
        });
    }

    // Called by game to send game state (host -> client)
    sendGameState(state) {
        if (!this.isConnected || !this.roomManager.isHost) return;

        const now = Date.now();
        if (now - this.lastSyncTime < this.syncInterval) return;
        this.lastSyncTime = now;

        this.webrtc.send({
            type: 'gameState',
            state: state,
            timestamp: now
        });
    }

    // Called by host to signal battle start
    sendBattleStart(data) {
        if (!this.isConnected || !this.roomManager.isHost) return;

        this.webrtc.send({
            type: 'startBattle',
            ...data
        });
    }

    // Create NetworkPlayer instance (call when starting online battle)
    createNetworkPlayer(robot) {
        this.networkPlayer = new NetworkPlayer(robot);
        return this.networkPlayer;
    }

    isHost() {
        return this.roomManager.isHost;
    }

    getRoomCode() {
        return this.roomManager.roomCode;
    }

    async disconnect() {
        if (this.webrtc) {
            this.webrtc.close();
            this.webrtc = null;
        }

        await this.roomManager.leaveRoom();
        this.isConnected = false;
        this.networkPlayer = null;
    }
}

// ============================================================================
// EXPORT
// ============================================================================

window.OnlineModeController = OnlineModeController;
window.NetworkPlayer = NetworkPlayer;
