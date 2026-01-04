/**
 * Road.js - Pseudo-3D Road Rendering System
 * OutRun-style road with perspective, curves, and elevation
 */

export class Road {
  constructor() {
    // Road geometry
    this.segmentLength = 200;    // Length of each road segment in world units
    this.roadWidth = 2000;       // Road width in world units
    this.rumbleLength = 3;       // Number of segments per rumble strip
    this.lanes = 3;              // Number of lanes

    // Camera settings
    this.cameraHeight = 100;     // Camera height above road (reduced for proper projection)
    this.cameraDepth = 0.84;     // Camera depth (affects FOV)
    this.drawDistance = 300;     // How many segments to draw

    // Road segments
    this.segments = [];
    this.totalLength = 0;

    // Track definition
    this.trackLength = 0;

    // Colors for road rendering
    this.colors = {
      light: {
        road: '#555555',
        grass: '#228B22',
        rumble: '#FF0000',
        lane: '#FFFFFF'
      },
      dark: {
        road: '#444444',
        grass: '#006400',
        rumble: '#FFFFFF',
        lane: '#444444'
      },
      start: {
        road: '#FFFFFF',
        grass: '#10AA10',
        rumble: '#FFFFFF'
      },
      finish: {
        road: '#000000',
        grass: '#10AA10',
        rumble: '#000000'
      }
    };

    // Loaded images
    this.images = {};
    this.imagesLoaded = false;
  }

  /**
   * Load all road-related images
   */
  async loadImages() {
    const imageFiles = {
      road_straight: 'road_straight.png',
      road_curve_left: 'road_curve_left.png',
      road_curve_right: 'road_curve_right.png',
      road_uphill: 'road_uphill.png',
      road_downhill: 'road_downhill.png',
      background_mountains: 'background_mountains.png',
      background_city: 'background_city.png',
      background_coastal: 'background_coastal.png'
    };

    const loadPromises = Object.entries(imageFiles).map(([key, filename]) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.images[key] = img;
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load: ${filename}`);
          resolve();
        };
        img.src = `assets/images/${filename}`;
      });
    });

    await Promise.all(loadPromises);
    this.imagesLoaded = true;
    console.log('Road images loaded');
  }

  /**
   * Create the race track with varied segments
   */
  createTrack() {
    this.segments = [];

    // Track definition: [length, curve, elevation]
    // curve: negative = left, positive = right
    // elevation: negative = downhill, positive = uphill
    const trackDef = [
      // Start/Finish straight
      { length: 25, curve: 0, elevation: 0, zone: 'mountains' },

      // Gentle S-curve into mountains
      { length: 30, curve: 2, elevation: 0, zone: 'mountains' },
      { length: 30, curve: -2, elevation: 0, zone: 'mountains' },

      // Uphill section
      { length: 40, curve: 0, elevation: 30, zone: 'mountains' },
      { length: 20, curve: -3, elevation: 20, zone: 'mountains' },

      // Mountain peak - tight curves
      { length: 25, curve: 4, elevation: 0, zone: 'mountains' },
      { length: 25, curve: -4, elevation: 0, zone: 'mountains' },

      // Downhill into city
      { length: 30, curve: 0, elevation: -40, zone: 'city' },
      { length: 20, curve: 2, elevation: -20, zone: 'city' },

      // City section - technical curves
      { length: 35, curve: -3, elevation: 0, zone: 'city' },
      { length: 20, curve: 0, elevation: 0, zone: 'city' },
      { length: 35, curve: 3, elevation: 0, zone: 'city' },

      // Chicane
      { length: 15, curve: -5, elevation: 0, zone: 'city' },
      { length: 15, curve: 5, elevation: 0, zone: 'city' },

      // Exit to coastal
      { length: 25, curve: 0, elevation: -10, zone: 'coastal' },

      // Coastal section - flowing curves
      { length: 40, curve: 2.5, elevation: 0, zone: 'coastal' },
      { length: 40, curve: -2.5, elevation: 0, zone: 'coastal' },

      // Seaside straight with slight curves
      { length: 30, curve: 1, elevation: 5, zone: 'coastal' },
      { length: 30, curve: -1, elevation: -5, zone: 'coastal' },

      // Final corner
      { length: 25, curve: 3, elevation: 0, zone: 'coastal' },

      // Back to start
      { length: 35, curve: 0, elevation: 0, zone: 'mountains' }
    ];

    let segmentIndex = 0;

    for (const section of trackDef) {
      this.addSection(section.length, section.curve, section.elevation, section.zone);
    }

    this.totalLength = this.segments.length * this.segmentLength;
    this.trackLength = this.totalLength;

    // Mark start/finish
    this.segments[0].color = this.colors.start;
    this.segments[1].color = this.colors.finish;
    this.segments[2].color = this.colors.start;

    console.log(`Track created: ${this.segments.length} segments, ${this.totalLength}m`);
  }

  /**
   * Add a section of road segments
   */
  addSection(numSegments, curve, elevation, zone) {
    const startIndex = this.segments.length;

    for (let i = 0; i < numSegments; i++) {
      const segment = {
        index: this.segments.length,
        p1: { world: { z: this.segments.length * this.segmentLength }, camera: {}, screen: {} },
        p2: { world: { z: (this.segments.length + 1) * this.segmentLength }, camera: {}, screen: {} },
        curve: this.easeInOut(i, numSegments, curve),
        elevation: this.easeInOut(i, numSegments, elevation),
        color: (Math.floor(this.segments.length / this.rumbleLength) % 2) ? this.colors.dark : this.colors.light,
        zone: zone,
        sprites: [],
        cars: []
      };

      this.segments.push(segment);
    }
  }

  /**
   * Ease in/out function for smooth curve transitions
   */
  easeInOut(current, total, value) {
    if (total === 0) return 0;
    const t = current / total;
    return value * (1 - Math.cos(t * Math.PI)) / 2;
  }

  /**
   * Get segment at a given Z position
   */
  getSegment(z) {
    const index = Math.floor(z / this.segmentLength) % this.segments.length;
    return this.segments[index < 0 ? this.segments.length + index : index];
  }

  /**
   * Project a 3D point to 2D screen coordinates
   */
  project(p, cameraX, cameraY, cameraZ, cameraDepth, width, height, roadWidth) {
    p.camera.x = (p.world.x || 0) - cameraX;
    p.camera.y = (p.world.y || 0) - cameraY;
    p.camera.z = (p.world.z || 0) - cameraZ;

    if (p.camera.z <= 0) {
      p.screen.scale = 0;
      return;
    }

    p.screen.scale = cameraDepth / p.camera.z;
    p.screen.x = Math.round((width / 2) + (p.screen.scale * p.camera.x * width / 2));
    p.screen.y = Math.round((height / 2) - (p.screen.scale * p.camera.y * height / 2));
    p.screen.w = Math.round((p.screen.scale * roadWidth * width / 2));
  }

  /**
   * Render the road
   */
  render(ctx, width, height, playerX, playerZ, playerY) {
    // Skip rendering if dimensions are invalid
    if (!width || !height) return;

    const baseSegment = this.getSegment(playerZ);
    if (!baseSegment) return;

    const basePercent = (playerZ % this.segmentLength) / this.segmentLength;
    const playerSegment = this.getSegment(playerZ + this.cameraHeight * this.cameraDepth);

    // Calculate player Y based on road elevation
    const playerWorldY = this.calculateY(playerZ);

    // Clear and draw sky/background
    this.renderBackground(ctx, width, height, baseSegment.zone, playerX);

    let maxy = height;
    let miny = 0;  // Track closest segment for asphalt fill
    let x = 0;
    let dx = 0;

    // Render segments from back to front
    for (let n = 0; n < this.drawDistance; n++) {
      const segmentIndex = (baseSegment.index + n) % this.segments.length;
      const segment = this.segments[segmentIndex];
      const looped = segmentIndex < baseSegment.index;

      // Calculate world positions
      segment.p1.world.y = this.calculateY(segment.p1.world.z);
      segment.p2.world.y = this.calculateY(segment.p2.world.z);

      // Apply road curve offset
      segment.p1.world.x = x;
      segment.p2.world.x = x + dx;

      const camZ = playerZ - (looped ? this.totalLength : 0);

      this.project(
        segment.p1,
        playerX * this.roadWidth,
        playerWorldY + this.cameraHeight,
        camZ,
        this.cameraDepth,
        width,
        height,
        this.roadWidth
      );

      this.project(
        segment.p2,
        playerX * this.roadWidth,
        playerWorldY + this.cameraHeight,
        camZ,
        this.cameraDepth,
        width,
        height,
        this.roadWidth
      );

      // Accumulate curve
      x += dx;
      dx += segment.curve;

      // Skip if behind camera or off screen
      if (segment.p1.camera.z <= this.cameraDepth ||
          segment.p2.screen.y >= maxy) {
        continue;
      }

      this.renderSegment(
        ctx,
        width,
        height,
        segment.p1.screen.x, segment.p1.screen.y, segment.p1.screen.w,
        segment.p2.screen.x, segment.p2.screen.y, segment.p2.screen.w,
        segment.color,
        segment.zone
      );

      // Track horizon (furthest rendered segment)
      maxy = segment.p2.screen.y;
      // Track closest segment for bottom fill
      if (segment.p1.screen.y > miny) {
        miny = segment.p1.screen.y;
      }
    }

    // Fill remaining area below road (from closest segment to bottom of canvas)
    if (miny < height && miny > 0) {
      ctx.fillStyle = '#2A2A3A';
      ctx.fillRect(0, miny, width, height - miny);
    }

    // Render sprites and cars (back to front)
    for (let n = this.drawDistance - 1; n >= 0; n--) {
      const segmentIndex = (baseSegment.index + n) % this.segments.length;
      const segment = this.segments[segmentIndex];

      // Render cars on this segment
      for (const car of segment.cars) {
        this.renderSprite(ctx, width, height, car, segment, playerX, playerZ);
      }
    }
  }

  /**
   * Calculate Y position at a given Z
   */
  calculateY(z) {
    const segment = this.getSegment(z);
    const percent = (z % this.segmentLength) / this.segmentLength;

    let y = 0;
    const segmentIndex = Math.floor(z / this.segmentLength) % this.segments.length;

    // Sum up elevation changes
    for (let i = 0; i < segmentIndex; i++) {
      y += this.segments[i].elevation;
    }

    // Add interpolated current segment elevation
    y += segment.elevation * percent;

    return y;
  }

  /**
   * Render background based on zone
   */
  renderBackground(ctx, width, height, zone, playerX) {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height / 2);

    switch (zone) {
      case 'mountains':
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#4a90a4');
        gradient.addColorStop(1, '#87CEEB');
        break;
      case 'city':
        gradient.addColorStop(0, '#2d1b4e');
        gradient.addColorStop(0.5, '#e96443');
        gradient.addColorStop(1, '#904e95');
        break;
      case 'coastal':
        gradient.addColorStop(0, '#0077B6');
        gradient.addColorStop(0.5, '#00B4D8');
        gradient.addColorStop(1, '#90E0EF');
        break;
      default:
        gradient.addColorStop(0, '#72D6FF');
        gradient.addColorStop(1, '#B0E0E6');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height / 2);

    // Background image with parallax
    const bgKey = `background_${zone}`;
    if (this.images[bgKey]) {
      const parallaxOffset = (playerX * 200) % width;
      const img = this.images[bgKey];
      const scale = height / 2 / img.height;
      const scaledWidth = img.width * scale;

      // Draw twice for seamless scrolling
      ctx.drawImage(img, -parallaxOffset, 0, scaledWidth, height / 2);
      ctx.drawImage(img, scaledWidth - parallaxOffset, 0, scaledWidth, height / 2);
    }
  }

  /**
   * Render a single road segment
   */
  renderSegment(ctx, width, height, x1, y1, w1, x2, y2, w2, color, zone) {
    // Grass
    ctx.fillStyle = color.grass;
    ctx.fillRect(0, y2, width, y1 - y2);

    // Road
    this.renderPolygon(ctx,
      x1 - w1, y1, x1 + w1, y1,
      x2 + w2, y2, x2 - w2, y2,
      color.road);

    // Rumble strips
    const rumbleW1 = w1 / 5;
    const rumbleW2 = w2 / 5;

    // Left rumble
    this.renderPolygon(ctx,
      x1 - w1, y1, x1 - w1 + rumbleW1, y1,
      x2 - w2 + rumbleW2, y2, x2 - w2, y2,
      color.rumble);

    // Right rumble
    this.renderPolygon(ctx,
      x1 + w1 - rumbleW1, y1, x1 + w1, y1,
      x2 + w2, y2, x2 + w2 - rumbleW2, y2,
      color.rumble);

    // Lane markers (only on light segments)
    if (color === this.colors.light) {
      const laneW1 = w1 / 40;
      const laneW2 = w2 / 40;
      const laneSpace1 = w1 / this.lanes;
      const laneSpace2 = w2 / this.lanes;

      for (let lane = 1; lane < this.lanes; lane++) {
        const laneX1 = x1 - w1 + (lane * laneSpace1 * 2);
        const laneX2 = x2 - w2 + (lane * laneSpace2 * 2);

        this.renderPolygon(ctx,
          laneX1 - laneW1, y1, laneX1 + laneW1, y1,
          laneX2 + laneW2, y2, laneX2 - laneW2, y2,
          color.lane);
      }
    }
  }

  /**
   * Render a polygon (trapezoid for road segments)
   */
  renderPolygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Render a sprite (car, object) on the road
   */
  renderSprite(ctx, width, height, sprite, segment, playerX, playerZ) {
    if (!sprite.image) return;

    const scale = segment.p1.screen.scale;
    if (scale <= 0) return;

    const spriteScale = scale * sprite.scale;
    const spriteX = segment.p1.screen.x + (scale * sprite.offset * width / 2);
    const spriteY = segment.p1.screen.y;

    const w = sprite.image.width * spriteScale * 2.5;
    const h = sprite.image.height * spriteScale * 2.5;

    ctx.drawImage(sprite.image, spriteX - w / 2, spriteY - h, w, h);
  }

  /**
   * Get the curve value at a given Z position
   */
  getCurveAt(z) {
    const segment = this.getSegment(z);
    return segment ? segment.curve : 0;
  }

  /**
   * Get track information for lap counting
   */
  getTrackInfo() {
    return {
      length: this.totalLength,
      segments: this.segments.length
    };
  }
}
