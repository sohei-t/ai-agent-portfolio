/**
 * BowlingGame - Main game controller with all functionality integrated
 * Simple architecture: Scene, Physics, Input, State all in one class
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Ball } from './entities/Ball.js';
import { Pins } from './entities/Pins.js';
import { Controls } from './Controls.js';
import { Course } from './Course.js';
import { UI } from './UI.js';
import { BowlingScore } from './BowlingScore.js';

export class BowlingGame {
  constructor() {
    // Game state
    this.state = 'title'; // 'title', 'playing', 'throwing', 'waiting', 'result'
    this.paused = false;
    this.currentFrame = 0;
    this.currentThrow = 0;
    this.lastPinCount = 10;

    // Three.js
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // Cannon.js
    this.world = null;
    this.materials = {};

    // Game entities
    this.ball = null;
    this.pins = null;
    this.course = null;

    // Systems
    this.controls = null;
    this.ui = null;
    this.scoreManager = new BowlingScore();

    // Camera follow settings
    this.cameraOffset = new THREE.Vector3(0, 8, -12);
    this.cameraLookOffset = new THREE.Vector3(0, 0, 10);

    // Ball state tracking
    this.ballStartPosition = new THREE.Vector3(0, 1, 0);
    this.ballStopped = false;
    this.ballStopTimer = 0;
    this.pinSettleTimer = 0;

    // Initialize
    this.init();
  }

  /**
   * Initialize all game systems
   */
  init() {
    this.initRenderer();
    this.initPhysics();
    this.initScene();
    this.initEntities();
    this.initControls();
    this.initUI();
    this.setupEventListeners();

    // Start game loop
    this.animate();
  }

  /**
   * Initialize Three.js renderer
   */
  initRenderer() {
    const container = document.getElementById('game-container');

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    this.scene.fog = new THREE.Fog(0x87CEEB, 50, 200);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    this.camera.position.set(0, 10, -15);
    this.camera.lookAt(0, 0, 20);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.insertBefore(this.renderer.domElement, container.firstChild);

    // Resize handler
    window.addEventListener('resize', () => this.onResize());
  }

  /**
   * Initialize Cannon.js physics world
   */
  initPhysics() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.solver.iterations = 10;
    this.world.allowSleep = true;

    // Materials
    this.materials.ball = new CANNON.Material('ball');
    this.materials.ground = new CANNON.Material('ground');
    this.materials.pin = new CANNON.Material('pin');
    this.materials.wall = new CANNON.Material('wall');

    // Contact materials
    this.world.addContactMaterial(new CANNON.ContactMaterial(
      this.materials.ball, this.materials.ground,
      { friction: 0.3, restitution: 0.3 }
    ));

    this.world.addContactMaterial(new CANNON.ContactMaterial(
      this.materials.ball, this.materials.pin,
      { friction: 0.5, restitution: 0.6 }
    ));

    this.world.addContactMaterial(new CANNON.ContactMaterial(
      this.materials.ball, this.materials.wall,
      { friction: 0.3, restitution: 0.4 }
    ));

    this.world.addContactMaterial(new CANNON.ContactMaterial(
      this.materials.pin, this.materials.ground,
      { friction: 0.8, restitution: 0.2 }
    ));

    this.world.addContactMaterial(new CANNON.ContactMaterial(
      this.materials.pin, this.materials.pin,
      { friction: 0.5, restitution: 0.3 }
    ));
  }

  /**
   * Initialize scene with lighting
   */
  initScene() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    // Directional light (sun)
    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(30, 50, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 150;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    this.scene.add(sun);

    // Hemisphere light for better ambient
    const hemi = new THREE.HemisphereLight(0x87CEEB, 0x98D98D, 0.3);
    this.scene.add(hemi);
  }

  /**
   * Initialize game entities (ball, pins, course)
   */
  initEntities() {
    // Course
    this.course = new Course(this.scene, this.world, this.materials);
    this.course.create();

    // Ball
    this.ball = new Ball(this.scene, this.world, this.materials.ball);
    this.ball.create(this.ballStartPosition);

    // Pins
    this.pins = new Pins(this.scene, this.world, this.materials.pin);
    this.pins.create();
  }

  /**
   * Initialize input controls
   */
  initControls() {
    this.controls = new Controls();
    this.controls.init();
  }

  /**
   * Initialize UI system
   */
  initUI() {
    this.ui = new UI(this);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Start button
    document.getElementById('start-btn')?.addEventListener('click', () => {
      this.startGame();
    });

    // Restart button
    document.getElementById('restart-btn')?.addEventListener('click', () => {
      this.restartGame();
    });

    // Control toggle
    document.getElementById('control-toggle')?.addEventListener('click', () => {
      this.controls.toggleMode();
    });
  }

  /**
   * Start the game
   */
  startGame() {
    this.state = 'playing';
    this.currentFrame = 0;
    this.currentThrow = 0;
    this.lastPinCount = 10;
    this.scoreManager.reset();
    this.resetForThrow();
    this.ui.hideScreen('title-screen');
    this.ui.showHUD();
  }

  /**
   * Restart the game
   */
  restartGame() {
    this.ui.hideScreen('result-screen');
    this.startGame();
  }

  /**
   * Reset for a new throw
   */
  resetForThrow() {
    this.ball.reset(this.ballStartPosition);
    this.ballStopped = false;
    this.ballStopTimer = 0;
    this.state = 'playing';

    // Reset camera
    this.camera.position.copy(this.ballStartPosition).add(this.cameraOffset);
    this.camera.lookAt(this.ballStartPosition.clone().add(this.cameraLookOffset));
  }

  /**
   * Reset pins for new frame
   */
  resetPinsForNewFrame() {
    this.pins.resetAll();
    this.lastPinCount = 10;
  }

  /**
   * Handle end of throw
   */
  endThrow() {
    const knockedDown = this.pins.countKnockedDown();
    const pinsHit = knockedDown - (10 - this.lastPinCount);
    this.lastPinCount = 10 - knockedDown;

    // Record throw in score
    this.scoreManager.recordThrow(pinsHit);

    // Update UI
    this.ui.updateScore(this.scoreManager.getTotalScore());
    this.ui.updateFrame(this.currentFrame + 1, this.currentThrow + 1);

    // Check if frame is complete
    if (this.scoreManager.isFrameComplete(this.currentFrame)) {
      this.currentThrow = 0;
      this.currentFrame++;

      if (this.currentFrame >= 10) {
        // Game over
        this.endGame();
        return;
      }

      // Reset pins for new frame
      this.resetPinsForNewFrame();
    } else {
      // Same frame, next throw
      this.currentThrow++;

      // Clear knocked pins (not standing pins)
      this.pins.clearKnockedPins();
    }

    // Reset for next throw
    this.resetForThrow();
  }

  /**
   * End the game and show results
   */
  endGame() {
    this.state = 'result';
    this.ui.showResults(this.scoreManager.getTotalScore(), this.scoreManager.getFrames());
  }

  /**
   * Pause game
   */
  pause() {
    this.paused = true;
  }

  /**
   * Resume game
   */
  resume() {
    this.paused = false;
    this.clock.getDelta(); // Reset delta
  }

  /**
   * Handle window resize
   */
  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Main game loop
   */
  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.paused) return;

    const delta = Math.min(this.clock.getDelta(), 0.1);

    // Update physics
    this.world.step(1 / 60, delta, 3);

    // Update game logic
    this.update(delta);

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Update game logic
   */
  update(delta) {
    if (this.state !== 'playing' && this.state !== 'throwing' && this.state !== 'waiting') {
      return;
    }

    // Get input
    const input = this.controls.getInput();

    // Update ball
    if (this.state === 'playing' || this.state === 'throwing') {
      // Apply input to ball
      if (input.x !== 0 || input.y !== 0) {
        this.state = 'throwing';
        this.ball.applyInput(input.x, input.y);
      }

      this.ball.update();

      // Update camera to follow ball
      this.updateCamera();

      // Update speed gauge
      this.ui.updateSpeedGauge(this.ball.getSpeed() / this.ball.maxSpeed);
    }

    // Check if ball has stopped or fallen
    if (this.state === 'throwing') {
      const speed = this.ball.getSpeed();
      const ballY = this.ball.getPosition().y;

      // Ball fell off course
      if (ballY < -5) {
        this.scoreManager.recordThrow(0); // Gutter/fall = 0 points
        this.handleFallOff();
        return;
      }

      // Ball has nearly stopped
      if (speed < 0.5) {
        this.ballStopTimer += delta;
        if (this.ballStopTimer > 1.5) {
          this.state = 'waiting';
          this.pinSettleTimer = 0;
        }
      } else {
        this.ballStopTimer = 0;
      }
    }

    // Wait for pins to settle
    if (this.state === 'waiting') {
      this.pinSettleTimer += delta;
      if (this.pinSettleTimer > 2) {
        this.endThrow();
      }
    }

    // Sync physics bodies with meshes
    this.pins.update();
  }

  /**
   * Handle ball falling off course
   */
  handleFallOff() {
    // Move to next throw/frame
    if (this.scoreManager.isFrameComplete(this.currentFrame)) {
      this.currentThrow = 0;
      this.currentFrame++;

      if (this.currentFrame >= 10) {
        this.endGame();
        return;
      }

      this.resetPinsForNewFrame();
    } else {
      this.currentThrow++;
      this.pins.clearKnockedPins();
    }

    this.resetForThrow();
  }

  /**
   * Update camera to follow ball
   */
  updateCamera() {
    const ballPos = this.ball.getPosition();
    const targetPos = ballPos.clone().add(this.cameraOffset);

    // Smooth camera follow
    this.camera.position.lerp(targetPos, 0.05);

    // Look ahead of ball
    const lookTarget = ballPos.clone().add(this.cameraLookOffset);
    const currentLook = new THREE.Vector3();
    this.camera.getWorldDirection(currentLook);
    const targetLook = lookTarget.clone().sub(this.camera.position).normalize();
    currentLook.lerp(targetLook, 0.05);
    this.camera.lookAt(this.camera.position.clone().add(currentLook.multiplyScalar(10)));
  }
}
