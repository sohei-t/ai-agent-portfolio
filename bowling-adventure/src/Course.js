/**
 * Course - Creates the bowling course with terrain and obstacles
 * Simple version with basic course, obstacles, and different terrain types
 */

import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Course {
  constructor(scene, world, materials) {
    this.scene = scene;
    this.world = world;
    this.materials = materials;

    // Course dimensions
    this.width = 8;
    this.length = 60;

    // Course sections
    this.sections = [];

    // Obstacles
    this.obstacles = [];
  }

  /**
   * Create the entire course
   */
  create() {
    this.createGround();
    this.createWalls();
    this.createTerrainSections();
    this.createObstacles();
    this.createPinArea();
    this.createSkybox();
  }

  /**
   * Create the main ground
   */
  createGround() {
    // Visual ground
    const groundGeometry = new THREE.PlaneGeometry(this.width, this.length);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a7c59,
      roughness: 0.8,
      metalness: 0.1
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, 0, this.length / 2);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Physics ground
    const groundShape = new CANNON.Box(new CANNON.Vec3(this.width / 2, 0.1, this.length / 2));
    const groundBody = new CANNON.Body({
      mass: 0,
      shape: groundShape,
      material: this.materials.ground
    });
    groundBody.position.set(0, -0.1, this.length / 2);
    this.world.addBody(groundBody);

    // Store reference
    this.ground = { mesh: ground, body: groundBody };
  }

  /**
   * Create side walls (gutters)
   */
  createWalls() {
    const wallHeight = 0.5;
    const wallThickness = 0.3;

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.7
    });

    // Left wall
    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, this.length);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-this.width / 2 - wallThickness / 2, wallHeight / 2, this.length / 2);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);

    const leftWallShape = new CANNON.Box(new CANNON.Vec3(wallThickness / 2, wallHeight / 2, this.length / 2));
    const leftWallBody = new CANNON.Body({
      mass: 0,
      shape: leftWallShape,
      material: this.materials.wall
    });
    leftWallBody.position.copy(leftWall.position);
    this.world.addBody(leftWallBody);

    // Right wall
    const rightWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    rightWall.position.set(this.width / 2 + wallThickness / 2, wallHeight / 2, this.length / 2);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    this.scene.add(rightWall);

    const rightWallBody = new CANNON.Body({
      mass: 0,
      shape: leftWallShape,
      material: this.materials.wall
    });
    rightWallBody.position.copy(rightWall.position);
    this.world.addBody(rightWallBody);
  }

  /**
   * Create different terrain sections along the course
   */
  createTerrainSections() {
    // Sand section (slow, high friction)
    this.createTerrainSection({
      start: 15,
      end: 25,
      color: 0xC2B280,
      friction: 0.8,
      restitution: 0.1,
      name: 'sand'
    });

    // Ice section (slippery, low friction)
    this.createTerrainSection({
      start: 35,
      end: 45,
      color: 0xADD8E6,
      friction: 0.05,
      restitution: 0.4,
      name: 'ice'
    });
  }

  /**
   * Create a terrain section with different physics properties
   */
  createTerrainSection(config) {
    const length = config.end - config.start;

    // Visual overlay
    const geometry = new THREE.PlaneGeometry(this.width - 0.1, length);
    const material = new THREE.MeshStandardMaterial({
      color: config.color,
      roughness: config.name === 'ice' ? 0.1 : 0.9,
      metalness: config.name === 'ice' ? 0.3 : 0,
      transparent: true,
      opacity: 0.8
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0.01, config.start + length / 2);
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // Create material for this terrain
    const terrainMaterial = new CANNON.Material(config.name);
    this.materials[config.name] = terrainMaterial;

    // Physics body for terrain
    const shape = new CANNON.Box(new CANNON.Vec3(this.width / 2, 0.1, length / 2));
    const body = new CANNON.Body({
      mass: 0,
      shape: shape,
      material: terrainMaterial
    });
    body.position.set(0, -0.05, config.start + length / 2);
    this.world.addBody(body);

    // Create contact material with ball
    const contactMaterial = new CANNON.ContactMaterial(
      this.materials.ball,
      terrainMaterial,
      {
        friction: config.friction,
        restitution: config.restitution
      }
    );
    this.world.addContactMaterial(contactMaterial);

    this.sections.push({
      mesh,
      body,
      config
    });
  }

  /**
   * Create obstacles along the course
   */
  createObstacles() {
    // Rocks
    this.createRock(new THREE.Vector3(-2, 0, 20), 0.8);
    this.createRock(new THREE.Vector3(2.5, 0, 28), 0.6);
    this.createRock(new THREE.Vector3(-1.5, 0, 40), 0.7);
    this.createRock(new THREE.Vector3(1, 0, 32), 0.5);

    // Walls/Barriers
    this.createBarrier(new THREE.Vector3(0, 0, 12), 3, 0.5, 0);
    this.createBarrier(new THREE.Vector3(-1.5, 0, 47), 2, 0.3, Math.PI / 6);
    this.createBarrier(new THREE.Vector3(1.5, 0, 47), 2, 0.3, -Math.PI / 6);
  }

  /**
   * Create a rock obstacle
   */
  createRock(position, size) {
    // Visual (icosahedron looks rock-like)
    const geometry = new THREE.IcosahedronGeometry(size, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.9,
      flatShading: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.position.y = size * 0.8;
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // Physics (sphere for simplicity)
    const shape = new CANNON.Sphere(size);
    const body = new CANNON.Body({
      mass: 0,
      shape: shape,
      material: this.materials.wall
    });
    body.position.set(position.x, size, position.z);
    this.world.addBody(body);

    this.obstacles.push({ mesh, body, type: 'rock' });
  }

  /**
   * Create a barrier/wall obstacle
   */
  createBarrier(position, width, height, rotation) {
    const depth = 0.3;

    // Visual
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.7
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.position.y = height / 2;
    mesh.rotation.y = rotation;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // Physics
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const body = new CANNON.Body({
      mass: 0,
      shape: shape,
      material: this.materials.wall
    });
    body.position.copy(mesh.position);
    body.quaternion.setFromEuler(0, rotation, 0);
    this.world.addBody(body);

    this.obstacles.push({ mesh, body, type: 'barrier' });
  }

  /**
   * Create the pin area at the end of the course
   */
  createPinArea() {
    // Slightly different colored area for pins
    const geometry = new THREE.PlaneGeometry(this.width, 10);
    const material = new THREE.MeshStandardMaterial({
      color: 0x654321,
      roughness: 0.6
    });

    const pinArea = new THREE.Mesh(geometry, material);
    pinArea.rotation.x = -Math.PI / 2;
    pinArea.position.set(0, 0.02, 55);
    pinArea.receiveShadow = true;
    this.scene.add(pinArea);
  }

  /**
   * Create simple skybox
   */
  createSkybox() {
    // Simple gradient sky using large sphere
    const skyGeometry = new THREE.SphereGeometry(200, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0x87CEEB,
      side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    this.scene.add(sky);

    // Add some simple clouds
    this.createClouds();

    // Add distant hills
    this.createHills();
  }

  /**
   * Create simple cloud shapes
   */
  createClouds() {
    const cloudMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });

    for (let i = 0; i < 8; i++) {
      const cloudGroup = new THREE.Group();

      // Create cloud from several spheres
      const numPuffs = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < numPuffs; j++) {
        const puffSize = 3 + Math.random() * 4;
        const puffGeometry = new THREE.SphereGeometry(puffSize, 8, 8);
        const puff = new THREE.Mesh(puffGeometry, cloudMaterial);
        puff.position.set(
          (j - numPuffs / 2) * 3,
          Math.random() * 2,
          Math.random() * 2
        );
        cloudGroup.add(puff);
      }

      cloudGroup.position.set(
        (Math.random() - 0.5) * 150,
        30 + Math.random() * 20,
        Math.random() * 100
      );
      this.scene.add(cloudGroup);
    }
  }

  /**
   * Create distant hills
   */
  createHills() {
    const hillMaterial = new THREE.MeshStandardMaterial({
      color: 0x228B22,
      roughness: 0.9
    });

    for (let i = 0; i < 5; i++) {
      const hillGeometry = new THREE.ConeGeometry(
        20 + Math.random() * 15,
        15 + Math.random() * 10,
        8
      );

      const hill = new THREE.Mesh(hillGeometry, hillMaterial);
      hill.position.set(
        (Math.random() - 0.5) * 100,
        -5,
        80 + Math.random() * 40
      );
      hill.rotation.y = Math.random() * Math.PI;
      this.scene.add(hill);
    }
  }

  /**
   * Get terrain type at position
   */
  getTerrainAt(z) {
    for (const section of this.sections) {
      if (z >= section.config.start && z <= section.config.end) {
        return section.config.name;
      }
    }
    return 'normal';
  }
}
