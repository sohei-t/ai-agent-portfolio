/**
 * Pins - Manages all 10 bowling pins
 * Handles creation, physics, knockdown detection, and reset
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Pins {
  constructor(scene, world, material) {
    this.scene = scene;
    this.world = world;
    this.material = material;

    this.pins = [];
    this.pinPositions = [];

    // Pin dimensions
    this.pinHeight = 1.5;
    this.pinRadius = 0.15;
    this.pinMass = 1.5;

    // Pin area position (end of course)
    this.pinAreaZ = 50;

    // Calculate standard pin positions
    this.calculatePositions();
  }

  /**
   * Calculate standard 10-pin bowling formation
   * Layout:
   *     7 8 9 10
   *      4 5 6
   *       2 3
   *        1
   */
  calculatePositions() {
    const spacing = 0.9; // Distance between pins
    const rowSpacing = spacing * 0.866; // Triangular spacing

    // Row 1 (front): 1 pin
    // Row 2: 2 pins
    // Row 3: 3 pins
    // Row 4 (back): 4 pins
    let pinIndex = 0;

    for (let row = 0; row < 4; row++) {
      const pinsInRow = row + 1;
      const rowOffset = row * rowSpacing;

      for (let col = 0; col < pinsInRow; col++) {
        const x = (col - row / 2) * spacing;
        const z = this.pinAreaZ + rowOffset;
        const y = this.pinHeight / 2 + 0.01; // Slightly above ground

        this.pinPositions.push({
          x, y, z,
          index: pinIndex++
        });
      }
    }
  }

  /**
   * Create all pins
   */
  create() {
    this.pinPositions.forEach(pos => {
      const pin = this.createPin(pos);
      this.pins.push(pin);
    });
  }

  /**
   * Create a single pin
   */
  createPin(position) {
    // Create pin mesh (simplified cylinder + dome)
    const group = new THREE.Group();

    // Body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(
      this.pinRadius * 0.7,  // top radius (narrower)
      this.pinRadius,         // bottom radius
      this.pinHeight * 0.8,   // height
      16
    );
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = this.pinHeight * 0.4;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Neck (thinner part)
    const neckGeometry = new THREE.CylinderGeometry(
      this.pinRadius * 0.4,
      this.pinRadius * 0.7,
      this.pinHeight * 0.15,
      16
    );
    const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
    neck.position.y = this.pinHeight * 0.85;
    neck.castShadow = true;
    group.add(neck);

    // Head (sphere)
    const headGeometry = new THREE.SphereGeometry(this.pinRadius * 0.5, 16, 16);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = this.pinHeight * 0.95;
    head.castShadow = true;
    group.add(head);

    // Red stripes
    const stripeGeometry = new THREE.CylinderGeometry(
      this.pinRadius * 0.72,
      this.pinRadius * 1.02,
      0.08,
      16
    );
    const stripeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.3,
      metalness: 0.1
    });

    const stripe1 = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe1.position.y = this.pinHeight * 0.25;
    group.add(stripe1);

    const stripe2 = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe2.position.y = this.pinHeight * 0.35;
    group.add(stripe2);

    // Position the group
    group.position.set(position.x, 0, position.z);
    this.scene.add(group);

    // Create physics body (compound shape for stability)
    const shape = new CANNON.Cylinder(
      this.pinRadius * 0.7,
      this.pinRadius,
      this.pinHeight,
      8
    );

    const physicsBody = new CANNON.Body({
      mass: this.pinMass,
      material: this.material,
      linearDamping: 0.4,
      angularDamping: 0.4
    });

    // Rotate shape to align with Three.js
    const quat = new CANNON.Quaternion();
    quat.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0);
    physicsBody.addShape(shape, new CANNON.Vec3(0, this.pinHeight / 2, 0), quat);

    physicsBody.position.set(position.x, position.y, position.z);
    this.world.addBody(physicsBody);

    return {
      mesh: group,
      body: physicsBody,
      originalPosition: { ...position },
      knocked: false
    };
  }

  /**
   * Update all pin meshes to match physics
   */
  update() {
    this.pins.forEach(pin => {
      pin.mesh.position.copy(pin.body.position);
      pin.mesh.position.y -= this.pinHeight / 2; // Adjust for pivot
      pin.mesh.quaternion.copy(pin.body.quaternion);

      // Check if knocked over
      if (!pin.knocked) {
        pin.knocked = this.isPinKnocked(pin);
      }
    });
  }

  /**
   * Check if a pin is knocked over
   * A pin is knocked if tilted more than 45 degrees
   */
  isPinKnocked(pin) {
    // Get up vector of pin
    const up = new THREE.Vector3(0, 1, 0);
    up.applyQuaternion(pin.mesh.quaternion);

    // Dot product with world up (1 = upright, 0 = horizontal, -1 = upside down)
    const uprightness = up.dot(new THREE.Vector3(0, 1, 0));

    // Knocked if tilted more than 45 degrees (cos(45) ~ 0.707)
    return uprightness < 0.707;
  }

  /**
   * Count how many pins are knocked down
   */
  countKnockedDown() {
    return this.pins.filter(pin => this.isPinKnocked(pin)).length;
  }

  /**
   * Count how many pins are still standing
   */
  countStanding() {
    return 10 - this.countKnockedDown();
  }

  /**
   * Reset all pins to original positions
   */
  resetAll() {
    this.pins.forEach(pin => {
      const pos = pin.originalPosition;

      // Reset physics
      pin.body.position.set(pos.x, pos.y, pos.z);
      pin.body.velocity.set(0, 0, 0);
      pin.body.angularVelocity.set(0, 0, 0);
      pin.body.quaternion.set(0, 0, 0, 1);
      pin.body.wakeUp();

      // Reset mesh
      pin.mesh.position.set(pos.x, 0, pos.z);
      pin.mesh.quaternion.set(0, 0, 0, 1);

      // Reset state
      pin.knocked = false;

      // Show mesh
      pin.mesh.visible = true;
    });
  }

  /**
   * Clear knocked pins (remove from scene/physics)
   * Used between throws in same frame
   */
  clearKnockedPins() {
    this.pins.forEach(pin => {
      if (this.isPinKnocked(pin)) {
        // Move far away instead of removing (simpler for reset)
        pin.body.position.set(100, -100, 100);
        pin.body.velocity.set(0, 0, 0);
        pin.body.sleep();
        pin.mesh.visible = false;
      }
    });
  }

  /**
   * Get pins data for debugging
   */
  getStatus() {
    return {
      total: this.pins.length,
      standing: this.countStanding(),
      knocked: this.countKnockedDown()
    };
  }

  /**
   * Dispose all pins
   */
  dispose() {
    this.pins.forEach(pin => {
      // Remove mesh
      this.scene.remove(pin.mesh);
      pin.mesh.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });

      // Remove body
      this.world.removeBody(pin.body);
    });

    this.pins = [];
  }
}
