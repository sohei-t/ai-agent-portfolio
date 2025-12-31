/**
 * Ball - Player-controlled bowling ball
 * Handles physics body and visual mesh synchronization
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Ball {
  constructor(scene, world, material) {
    this.scene = scene;
    this.world = world;
    this.material = material;

    this.mesh = null;
    this.body = null;

    // Ball properties
    this.radius = 0.5;
    this.mass = 5;
    this.maxSpeed = 30;

    // Control sensitivity
    this.steerForce = 15;
    this.moveForce = 25;
  }

  /**
   * Create ball mesh and physics body
   */
  create(position) {
    // Three.js mesh
    const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff4444,
      metalness: 0.4,
      roughness: 0.3,
      envMapIntensity: 0.5
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    // Add decorative swirl
    this.addSwirl();

    // Cannon.js body
    const shape = new CANNON.Sphere(this.radius);
    this.body = new CANNON.Body({
      mass: this.mass,
      shape: shape,
      material: this.material,
      linearDamping: 0.3,
      angularDamping: 0.5,
      allowSleep: false
    });

    this.body.position.set(position.x, position.y, position.z);
    this.world.addBody(this.body);

    // Initial mesh position
    this.mesh.position.copy(this.body.position);
  }

  /**
   * Add decorative swirl to ball
   */
  addSwirl() {
    const swirlGeometry = new THREE.TorusGeometry(this.radius * 0.4, 0.05, 8, 32);
    const swirlMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.6,
      roughness: 0.2
    });

    const swirl = new THREE.Mesh(swirlGeometry, swirlMaterial);
    swirl.rotation.x = Math.PI / 2;
    this.mesh.add(swirl);
  }

  /**
   * Apply input forces to ball
   * @param {number} directionX - Left/right (-1 to 1)
   * @param {number} accelerationY - Forward/back (-1 to 1)
   */
  applyInput(directionX, accelerationY) {
    // Steering force (left/right)
    const steer = directionX * this.steerForce;
    this.body.applyForce(
      new CANNON.Vec3(steer, 0, 0),
      this.body.position
    );

    // Movement force (forward/back)
    const move = accelerationY * this.moveForce;
    this.body.applyForce(
      new CANNON.Vec3(0, 0, move),
      this.body.position
    );

    // Speed cap
    this.enforceSpeedLimit();
  }

  /**
   * Enforce maximum speed
   */
  enforceSpeedLimit() {
    const speed = this.body.velocity.length();
    if (speed > this.maxSpeed) {
      this.body.velocity.scale(this.maxSpeed / speed, this.body.velocity);
    }
  }

  /**
   * Update mesh position to match physics body
   */
  update() {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);
  }

  /**
   * Get current speed
   */
  getSpeed() {
    return this.body.velocity.length();
  }

  /**
   * Get current position
   */
  getPosition() {
    return new THREE.Vector3().copy(this.body.position);
  }

  /**
   * Reset ball to starting position
   */
  reset(position) {
    // Reset physics
    this.body.position.set(position.x, position.y, position.z);
    this.body.velocity.set(0, 0, 0);
    this.body.angularVelocity.set(0, 0, 0);
    this.body.quaternion.set(0, 0, 0, 1);

    // Reset mesh
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion);

    // Wake up body
    this.body.wakeUp();
  }

  /**
   * Check if ball has essentially stopped
   */
  isStopped() {
    return this.getSpeed() < 0.3;
  }

  /**
   * Remove ball from scene and world
   */
  dispose() {
    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();
    }
    if (this.body) {
      this.world.removeBody(this.body);
    }
  }
}
