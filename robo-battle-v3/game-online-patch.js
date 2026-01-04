/**
 * game-online-patch.js - Online Mode Patch for ROBO BATTLE V3
 *
 * This file patches the existing game.js to add online multiplayer support.
 * Include this file after game.js to enable online mode capabilities.
 *
 * Usage:
 * 1. Include in HTML: <script src="game-online-patch.js"></script>
 * 2. Call game.initOnlineMode(networkManager, isHost) to enable
 *
 * @version 3.0.0
 * @author Game Sync Engineer
 */

// ============================================================================
// STATE BUFFER CLASS - For network interpolation
// ============================================================================

class StateBuffer {
    constructor(bufferSize = 10, interpolationDelay = 100) {
        this.buffer = [];
        this.bufferSize = bufferSize;
        this.interpolationDelay = interpolationDelay;
    }

    push(state, timestamp) {
        this.buffer.push({
            state: { ...state },
            timestamp: timestamp
        });

        this.buffer.sort((a, b) => a.timestamp - b.timestamp);

        while (this.buffer.length > this.bufferSize) {
            this.buffer.shift();
        }
    }

    getInterpolationStates(renderTime) {
        if (this.buffer.length < 2) {
            if (this.buffer.length === 1) {
                return {
                    prevState: this.buffer[0].state,
                    nextState: this.buffer[0].state,
                    alpha: 0
                };
            }
            return null;
        }

        let prevEntry = null;
        let nextEntry = null;

        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i].timestamp <= renderTime) {
                prevEntry = this.buffer[i];
            } else {
                nextEntry = this.buffer[i];
                break;
            }
        }

        if (!prevEntry) {
            prevEntry = this.buffer[0];
            nextEntry = this.buffer[1];
        }

        if (!nextEntry) {
            if (this.buffer.length >= 2) {
                prevEntry = this.buffer[this.buffer.length - 2];
                nextEntry = this.buffer[this.buffer.length - 1];
            } else {
                return {
                    prevState: prevEntry.state,
                    nextState: prevEntry.state,
                    alpha: 0
                };
            }
        }

        const timeDiff = nextEntry.timestamp - prevEntry.timestamp;
        let alpha = 0;
        if (timeDiff > 0) {
            alpha = (renderTime - prevEntry.timestamp) / timeDiff;
            alpha = Math.max(0, Math.min(1, alpha));
        }

        return {
            prevState: prevEntry.state,
            nextState: nextEntry.state,
            alpha: alpha
        };
    }

    getLatestState() {
        if (this.buffer.length === 0) return null;
        return this.buffer[this.buffer.length - 1].state;
    }

    getSize() {
        return this.buffer.length;
    }

    isReady() {
        return this.buffer.length >= 2;
    }

    clear() {
        this.buffer = [];
    }

    getInterpolationDelay() {
        return this.interpolationDelay;
    }
}

// ============================================================================
// GAME SYNC CLASS - Main synchronization manager
// ============================================================================

const RobotStateEnum = {
    IDLE: 0, WALKING: 1, JUMPING: 2, FALLING: 3,
    ATTACKING: 4, KICKING: 5, HURT: 6, KO: 7
};

const ActionTypeEnum = {
    BEAM: 0, KICK: 1, JUMP: 2, DASH: 3,
    ITEM_PICKUP: 4, WARP: 5, CHARGE_BEAM: 6
};

const EventTypeEnum = {
    DAMAGE: 0, HP_SYNC: 1, ITEM_SPAWN: 2, ITEM_PICKUP: 3,
    WARP_SPAWN: 4, GAME_START: 5, GAME_END: 6, DISCONNECT: 7
};

class GameSyncManager {
    constructor(networkManager, isHost) {
        this.networkManager = networkManager;
        this.isHost = isHost;

        this.localPlayer = null;
        this.remotePlayer = null;
        this.stateBuffer = new StateBuffer(10, 100);

        this.stateSeq = 0;
        this.actionSeq = 0;
        this.eventSeq = 0;

        this.gameStartTime = 0;
        this.lastSendTime = 0;
        this.sendInterval = 1000 / 60;

        this.pendingActions = [];
        this.localHP = 200;
        this.remoteHP = 200;

        this.onRemoteAction = null;
        this.onHPSync = null;
        this.onGameEvent = null;
    }

    setLocalPlayer(player) {
        this.localPlayer = player;
        this.localHP = player.hp;
    }

    setRemotePlayer(player) {
        this.remotePlayer = player;
        this.remoteHP = player.hp;
    }

    startGame() {
        this.gameStartTime = Date.now();
    }

    getGameTime() {
        return Date.now() - this.gameStartTime;
    }

    sendLocalState(player) {
        if (!this.networkManager || !this.networkManager.isConnected()) return;

        const now = Date.now();
        if (now - this.lastSendTime < this.sendInterval) return;
        this.lastSendTime = now;

        const statePacket = {
            type: 0,
            seq: this.stateSeq++,
            ts: this.getGameTime(),
            x: player.x,
            y: player.y,
            vx: player.vx,
            vy: player.vy,
            facing: player.facingRight ? 1 : -1,
            hp: player.hp,
            state: this.getRobotState(player),
            charging: player.isCharging ? Math.floor((player.chargeTime / 3000) * 255) : 0,
            flags: this.encodeFlags(player)
        };

        this.networkManager.send(statePacket);
    }

    receiveRemoteState(state) {
        if (state.type !== 0) return;
        const timestamp = this.gameStartTime + state.ts;
        this.stateBuffer.push(state, timestamp);
        if (!this.isHost) {
            this.remoteHP = state.hp;
        }
    }

    updateRemotePlayer(remotePlayer, deltaTime) {
        if (!remotePlayer) return;

        const renderTime = Date.now() - this.stateBuffer.getInterpolationDelay();
        const interpData = this.stateBuffer.getInterpolationStates(renderTime);
        if (!interpData) return;

        const { prevState, nextState, alpha } = interpData;

        remotePlayer.x = prevState.x + (nextState.x - prevState.x) * alpha;
        remotePlayer.y = prevState.y + (nextState.y - prevState.y) * alpha;
        remotePlayer.vx = prevState.vx + (nextState.vx - prevState.vx) * alpha;
        remotePlayer.vy = prevState.vy + (nextState.vy - prevState.vy) * alpha;
        remotePlayer.facingRight = nextState.facing > 0;

        if (!this.isHost) {
            remotePlayer.hp = nextState.hp;
        }

        const flags = this.decodeFlags(nextState.flags);
        remotePlayer.hasShield = flags.shield;
        remotePlayer.isInvincible = flags.invincible;

        if (nextState.charging > 0) {
            remotePlayer.isCharging = true;
            remotePlayer.chargeTime = (nextState.charging / 255) * 3000;
        } else {
            remotePlayer.isCharging = false;
            remotePlayer.chargeTime = 0;
        }
    }

    sendAction(action) {
        if (!this.networkManager || !this.networkManager.isConnected()) return;

        const actionPacket = {
            type: 1,
            seq: this.actionSeq++,
            ts: this.getGameTime(),
            actionType: action.type,
            x: action.x || 0,
            y: action.y || 0,
            direction: action.direction || 1,
            param: action.param || 0
        };

        this.networkManager.send(actionPacket);
    }

    receiveAction(action) {
        if (action.type !== 1) return;
        this.pendingActions.push({
            actionType: action.actionType,
            x: action.x,
            y: action.y,
            direction: action.direction,
            param: action.param,
            timestamp: action.ts
        });
        if (this.onRemoteAction) {
            this.onRemoteAction(action);
        }
    }

    getPendingActions() {
        const actions = [...this.pendingActions];
        this.pendingActions = [];
        return actions;
    }

    calculateDamage(attacker, defender, attack) {
        if (!this.isHost) return 0;
        if (defender.isInvincible || defender.hasShield) return 0;

        let damage = 0;
        switch (attack.type) {
            case ActionTypeEnum.BEAM:
                damage = 15;
                break;
            case ActionTypeEnum.KICK:
                damage = 25;
                break;
            case ActionTypeEnum.CHARGE_BEAM:
                const chargeMultiplier = 1 + (attack.chargeLevel || 0) * 2;
                damage = Math.floor(15 * chargeMultiplier);
                break;
            default:
                damage = 10;
        }
        return damage;
    }

    applyDamage(target, damage, isLocalTarget) {
        if (!this.isHost) return;
        target.hp = Math.max(0, target.hp - damage);
        if (isLocalTarget) {
            this.localHP = target.hp;
        } else {
            this.remoteHP = target.hp;
        }
        this.sendHPSync();
    }

    sendHPSync() {
        if (!this.networkManager || !this.networkManager.isConnected()) return;

        const hpEvent = {
            type: 2,
            seq: this.eventSeq++,
            ts: this.getGameTime(),
            eventType: EventTypeEnum.HP_SYNC,
            hostHP: this.localPlayer ? this.localPlayer.hp : this.localHP,
            guestHP: this.remotePlayer ? this.remotePlayer.hp : this.remoteHP
        };

        this.networkManager.send(hpEvent);
    }

    receiveHPSync(hpData) {
        if (this.isHost) return;

        if (this.localPlayer) {
            this.localPlayer.hp = hpData.guestHP;
            this.localHP = hpData.guestHP;
        }
        if (this.remotePlayer) {
            this.remotePlayer.hp = hpData.hostHP;
            this.remoteHP = hpData.hostHP;
        }
        if (this.onHPSync) {
            this.onHPSync(hpData);
        }
    }

    getRobotState(player) {
        if (player.hp <= 0) return RobotStateEnum.KO;
        if (player.isHurt) return RobotStateEnum.HURT;
        if (player.isKicking) return RobotStateEnum.KICKING;
        if (player.isAttacking) return RobotStateEnum.ATTACKING;
        if (player.vy < 0) return RobotStateEnum.JUMPING;
        if (player.vy > 1) return RobotStateEnum.FALLING;
        if (Math.abs(player.vx) > 0.5) return RobotStateEnum.WALKING;
        return RobotStateEnum.IDLE;
    }

    encodeFlags(player) {
        let flags = 0;
        if (player.hasShield) flags |= 0x01;
        if (player.isInvincible) flags |= 0x02;
        if (player.hasRapidFire) flags |= 0x04;
        if (player.hasMegaBeam) flags |= 0x08;
        return flags;
    }

    decodeFlags(flags) {
        return {
            shield: !!(flags & 0x01),
            invincible: !!(flags & 0x02),
            rapidFire: !!(flags & 0x04),
            megaBeam: !!(flags & 0x08)
        };
    }

    handleNetworkData(data) {
        switch (data.type) {
            case 0:
                this.receiveRemoteState(data);
                break;
            case 1:
                this.receiveAction(data);
                break;
            case 2:
                this.handleEvent(data);
                break;
        }
    }

    handleEvent(event) {
        switch (event.eventType) {
            case EventTypeEnum.HP_SYNC:
                this.receiveHPSync(event);
                break;
            case EventTypeEnum.GAME_START:
                this.startGame();
                break;
            case EventTypeEnum.GAME_END:
                if (this.onGameEvent) {
                    this.onGameEvent('gameEnd', { winner: event.value });
                }
                break;
            case EventTypeEnum.DISCONNECT:
                if (this.onGameEvent) {
                    this.onGameEvent('disconnect', {});
                }
                break;
        }
    }

    sendEvent(eventType, data = {}) {
        if (!this.networkManager || !this.networkManager.isConnected()) return;

        const eventPacket = {
            type: 2,
            seq: this.eventSeq++,
            ts: this.getGameTime(),
            eventType: eventType,
            target: data.target || 0,
            value: data.value || 0,
            param: data.param || 0
        };

        this.networkManager.send(eventPacket);
    }

    reset() {
        this.stateBuffer.clear();
        this.pendingActions = [];
        this.stateSeq = 0;
        this.actionSeq = 0;
        this.eventSeq = 0;
        this.localHP = 200;
        this.remoteHP = 200;
    }

    getStats() {
        return {
            isHost: this.isHost,
            stateBufferSize: this.stateBuffer.getSize(),
            stateBufferReady: this.stateBuffer.isReady(),
            interpolationDelay: this.stateBuffer.getInterpolationDelay(),
            pendingActions: this.pendingActions.length,
            localHP: this.localHP,
            remoteHP: this.remoteHP
        };
    }
}

// ============================================================================
// GAME CLASS EXTENSION - Add online methods to Game prototype
// ============================================================================

(function() {
    'use strict';

    // Wait for Game class to be available
    if (typeof Game === 'undefined') {
        console.error('[GameOnlinePatch] Game class not found. Make sure game.js is loaded first.');
        return;
    }

    // Add online mode properties to Game constructor
    const originalConstructor = Game.prototype.constructor;

    // Override constructor to add online properties
    const originalGameConstructor = Game;
    Game = function() {
        originalGameConstructor.call(this);

        // Online mode properties
        this.isOnlineMode = false;
        this.isHost = false;
        this.networkManager = null;
        this.gameSync = null;
        this.remotePlayer = null;
    };
    Game.prototype = originalGameConstructor.prototype;

    // Store original updateBattle
    const originalUpdateBattle = Game.prototype.updateBattle;

    // Override updateBattle to support online mode
    Game.prototype.updateBattle = function(deltaTime) {
        if (this.isOnlineMode) {
            this.updateOnlineBattle(deltaTime);
        } else {
            originalUpdateBattle.call(this, deltaTime);
        }
    };

    // Initialize online mode
    Game.prototype.initOnlineMode = function(networkManager, isHost) {
        this.isOnlineMode = true;
        this.isHost = isHost;
        this.networkManager = networkManager;

        this.gameSync = new GameSyncManager(networkManager, isHost);

        if (networkManager) {
            networkManager.onData = (data) => {
                this.gameSync.handleNetworkData(data);
            };
        }

        this.gameSync.onRemoteAction = (action) => {
            console.log('[GameSync] Remote action:', action.actionType);
        };

        this.gameSync.onHPSync = (hpData) => {
            console.log('[GameSync] HP sync:', hpData);
        };

        this.gameSync.onGameEvent = (eventType, data) => {
            this.handleOnlineGameEvent(eventType, data);
        };

        console.log(`[GameSync] Online mode initialized. Host: ${isHost}`);
    };

    // Disable online mode
    Game.prototype.disableOnlineMode = function() {
        this.isOnlineMode = false;
        this.isHost = false;
        this.networkManager = null;
        this.gameSync = null;
        this.remotePlayer = null;
        console.log('[GameSync] Online mode disabled.');
    };

    // Start online battle
    Game.prototype.startOnlineBattle = function(settings) {
        this.settings = settings || this.settings;
        this.currentStage = this.settings.stage;

        const stage = STAGES[this.currentStage];

        // Create local player
        const localSpawn = this.isHost ? stage.spawnPoints.player : stage.spawnPoints.enemy;
        const localColor = this.isHost ? COLORS.playerPrimary : COLORS.enemyPrimary;

        this.player = new Robot(localSpawn.x, localSpawn.y, { isPlayer: true, color: localColor });
        const params = this.settings.playerParams;
        this.player.setParameters(params.jump, params.walk, params.beam, params.kick);

        // Create remote player
        const remoteSpawn = this.isHost ? stage.spawnPoints.enemy : stage.spawnPoints.player;
        const remoteColor = this.isHost ? COLORS.enemyPrimary : COLORS.playerPrimary;

        this.remotePlayer = new Robot(remoteSpawn.x, remoteSpawn.y, { isPlayer: false, color: remoteColor });
        this.remotePlayer.setParameters(5, 5, 5, 5);

        // Set references in GameSync
        this.gameSync.setLocalPlayer(this.player);
        this.gameSync.setRemotePlayer(this.remotePlayer);
        this.gameSync.startGame();

        // Clear game state
        this.beams = [];
        this.effects = [];
        ParticleSystem.clear();
        this.activeItems = [];
        this.itemSpawnTimer = 0;
        this.activeWarpZones = [];
        this.warpSpawnTimer = 0;
        this.winner = null;
        this.state = GameState.BATTLE;

        SoundManager.playBGM('battle');

        if (this.isHost) {
            this.gameSync.sendEvent(EventTypeEnum.GAME_START, {});
        }

        console.log('[GameSync] Online battle started.');
    };

    // Update battle in online mode
    Game.prototype.updateOnlineBattle = function(deltaTime) {
        this.input.updateInputStates();
        const input = this.input.getInput();
        const stage = STAGES[this.currentStage];

        if (this.input.keys['Escape'] || this.input.keys['KeyP']) {
            this.state = GameState.PAUSED;
            this.inputCooldown = 200;
            return;
        }

        // Update local player
        this.updateLocalPlayerOnline(input, stage, deltaTime);

        // Send state to remote
        this.gameSync.sendLocalState(this.player);

        // Update remote player
        this.gameSync.updateRemotePlayer(this.remotePlayer, deltaTime);

        // Process remote actions
        this.processRemoteActionsOnline(stage);

        // Update beams
        this.updateBeamsOnline();

        // Damage calculation (host only)
        if (this.isHost) {
            this.checkDamageOnline();
        }

        // Items mode
        if (this.settings.itemsMode) {
            this.player.updatePowerups();
            this.remotePlayer.updatePowerups();
        }

        // Update effects
        for (const effect of this.effects) {
            effect.update();
        }
        this.effects = this.effects.filter(e => e.active);

        ParticleSystem.update(deltaTime);
        ScreenEffects.update(deltaTime);
    };

    // Update local player in online mode
    Game.prototype.updateLocalPlayerOnline = function(input, stage, deltaTime) {
        this.player.move(input.moveX);

        if (input.jump) {
            this.player.jump();
            this.gameSync.sendAction({ type: ActionTypeEnum.JUMP });
        }

        if (input.shootDown) {
            this.player.startCharging();
        }

        if (this.player.isCharging) {
            this.player.updateCharge();

            if (input.shootUp) {
                const distanceToEnemy = Math.abs(this.player.x - this.remotePlayer.x);
                const heightDiff = Math.abs(this.player.y - this.remotePlayer.y);
                const kickRange = 60;
                const heightThreshold = 50;

                if (distanceToEnemy < kickRange && heightDiff < heightThreshold && this.player.kickCooldown <= 0) {
                    this.player.cancelCharge();
                    this.player.facingRight = this.remotePlayer.x > this.player.x;

                    if (this.player.kick(this.remotePlayer)) {
                        this.gameSync.sendAction({
                            type: ActionTypeEnum.KICK,
                            x: this.player.x,
                            y: this.player.y,
                            direction: this.player.facingRight ? 1 : -1
                        });
                        SoundManager.playKick();
                    }
                } else {
                    const chargeLevel = this.player.chargeLevel;
                    this.player.releaseChargedBeam(this.beams);

                    this.gameSync.sendAction({
                        type: ActionTypeEnum.CHARGE_BEAM,
                        x: this.player.x,
                        y: this.player.y + this.player.height / 2,
                        direction: this.player.facingRight ? 1 : -1,
                        param: chargeLevel
                    });
                }
            }
        }

        if (input.kick) {
            if (this.player.kick(this.remotePlayer)) {
                this.gameSync.sendAction({
                    type: ActionTypeEnum.KICK,
                    x: this.player.x,
                    y: this.player.y,
                    direction: this.player.facingRight ? 1 : -1
                });
                SoundManager.playKick();
            }
        }

        this.player.facingRight = this.remotePlayer.x > this.player.x;
        this.player.update(deltaTime, stage.platforms);
    };

    // Process remote actions
    Game.prototype.processRemoteActionsOnline = function(stage) {
        const actions = this.gameSync.getPendingActions();

        for (const action of actions) {
            switch (action.actionType) {
                case ActionTypeEnum.BEAM:
                case ActionTypeEnum.CHARGE_BEAM:
                    this.createRemoteBeamOnline(action);
                    SoundManager.playBeam();
                    break;
                case ActionTypeEnum.KICK:
                    this.remotePlayer.isKicking = true;
                    this.remotePlayer.kickTimer = 200;
                    SoundManager.playKick();
                    break;
                case ActionTypeEnum.JUMP:
                    SoundManager.playJump();
                    break;
            }
        }
    };

    // Create remote beam
    Game.prototype.createRemoteBeamOnline = function(action) {
        const chargeLevel = action.param || 0;
        const baseDamage = 15;
        const multiplier = 1 + chargeLevel * 2;
        const damage = Math.floor(baseDamage * multiplier);
        const sizeMultiplier = 1 + chargeLevel;

        const beamX = action.x + (action.direction > 0 ? this.remotePlayer.width : 0);
        const beamY = action.y;

        const beam = new Beam(beamX, beamY, action.direction, damage, 'enemy', chargeLevel);
        beam.width *= sizeMultiplier;
        beam.height *= sizeMultiplier;

        this.beams.push(beam);
    };

    // Update beams in online mode
    Game.prototype.updateBeamsOnline = function() {
        for (const beam of this.beams) {
            beam.update();
        }
        this.beams = this.beams.filter(b => b.active && b.x > -50 && b.x < GAME_WIDTH + 50);
    };

    // Check damage in online mode (host only)
    Game.prototype.checkDamageOnline = function() {
        if (!this.isHost) return;

        for (const beam of this.beams) {
            // Remote beams hitting local player
            if (beam.owner === 'enemy' && checkCollision(beam, this.player)) {
                beam.active = false;
                const knockbackDir = beam.direction;
                const died = this.player.takeDamage(beam.damage, knockbackDir);
                this.effects.push(new Effect(beam.x, beam.y, 'hit'));
                SoundManager.playBeamHit();
                ScreenEffects.flash('#ff0000', 0.2);
                this.gameSync.applyDamage(this.player, beam.damage, true);

                if (died) {
                    this.triggerOnlineKO(false);
                    return;
                }
            }

            // Local beams hitting remote player
            if (beam.owner === 'player' && checkCollision(beam, this.remotePlayer)) {
                beam.active = false;
                const knockbackDir = beam.direction;
                const died = this.remotePlayer.takeDamage(beam.damage, knockbackDir);
                this.effects.push(new Effect(beam.x, beam.y, 'hit'));
                SoundManager.playBeamHit();
                ScreenEffects.flash('#0066ff', 0.2);
                this.gameSync.applyDamage(this.remotePlayer, beam.damage, false);

                if (died) {
                    this.triggerOnlineKO(true);
                    return;
                }
            }
        }

        // Kick damage
        if (this.player.isKicking && this.checkKickCollision(this.player, this.remotePlayer)) {
            const knockbackDir = this.player.facingRight ? 1 : -1;
            const died = this.remotePlayer.takeDamage(this.player.kickDamage, knockbackDir);
            this.effects.push(new Effect(
                this.remotePlayer.x + this.remotePlayer.width / 2,
                this.remotePlayer.y + this.remotePlayer.height / 2,
                'hit'
            ));
            this.gameSync.applyDamage(this.remotePlayer, this.player.kickDamage, false);

            if (died) {
                this.triggerOnlineKO(true);
                return;
            }
        }

        if (this.remotePlayer.isKicking && this.checkKickCollision(this.remotePlayer, this.player)) {
            const knockbackDir = this.remotePlayer.facingRight ? 1 : -1;
            const died = this.player.takeDamage(this.remotePlayer.kickDamage, knockbackDir);
            this.effects.push(new Effect(
                this.player.x + this.player.width / 2,
                this.player.y + this.player.height / 2,
                'hit'
            ));
            this.gameSync.applyDamage(this.player, this.remotePlayer.kickDamage, true);

            if (died) {
                this.triggerOnlineKO(false);
                return;
            }
        }
    };

    // Check kick collision helper
    Game.prototype.checkKickCollision = function(attacker, defender) {
        if (!attacker.isKicking) return false;

        const kickRange = 30;
        const kickHeight = 48;
        const kickX = attacker.facingRight ?
            attacker.x + attacker.width :
            attacker.x - kickRange;

        return kickX < defender.x + defender.width &&
               kickX + kickRange > defender.x &&
               attacker.y + attacker.height / 2 - kickHeight / 2 < defender.y + defender.height &&
               attacker.y + attacker.height / 2 + kickHeight / 2 > defender.y;
    };

    // Trigger KO in online mode
    Game.prototype.triggerOnlineKO = function(localWon) {
        this.winner = localWon ? 'player' : 'enemy';
        this.koTarget = localWon ? this.remotePlayer : this.player;

        if (this.isHost) {
            this.gameSync.sendEvent(EventTypeEnum.GAME_END, {
                value: localWon ? 0 : 1
            });
        }

        this.triggerKO(this.winner, this.koTarget);
    };

    // Handle online game events
    Game.prototype.handleOnlineGameEvent = function(eventType, data) {
        switch (eventType) {
            case 'gameEnd':
                const localWon = this.isHost ? (data.winner === 0) : (data.winner === 1);
                if (this.state === GameState.BATTLE) {
                    this.triggerOnlineKO(localWon);
                }
                break;
            case 'disconnect':
                console.log('[GameSync] Opponent disconnected');
                this.state = GameState.RESULT;
                this.winner = 'player';
                break;
        }
    };

    // Store original render method
    const originalRender = Game.prototype.render;

    // Override render to add online UI
    Game.prototype.render = function() {
        originalRender.call(this);

        if (this.isOnlineMode && this.state === GameState.BATTLE) {
            this.renderOnlineUI();
        }
    };

    // Render online mode UI
    Game.prototype.renderOnlineUI = function() {
        const ctx = this.ctx;

        ctx.save();
        ctx.font = '14px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'right';

        const roleText = this.isHost ? 'HOST' : 'GUEST';
        ctx.fillText(roleText, GAME_WIDTH - 10, 20);

        if (this.gameSync) {
            const stats = this.gameSync.getStats();
            ctx.fillText(`Buffer: ${stats.stateBufferSize}`, GAME_WIDTH - 10, 40);
        }

        ctx.restore();
    };

    console.log('[GameOnlinePatch] Game class successfully patched for online mode.');

    // Export for external use
    window.GameSyncManager = GameSyncManager;
    window.StateBuffer = StateBuffer;
    window.RobotStateEnum = RobotStateEnum;
    window.ActionTypeEnum = ActionTypeEnum;
    window.EventTypeEnum = EventTypeEnum;

})();
