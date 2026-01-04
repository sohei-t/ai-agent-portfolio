/**
 * Track.js - Race Track Definition and Rendering
 * Defines the oval track layout and handles track-related logic
 */

export class Track {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    // Track dimensions
    this.trackWidth = 120; // Width of the racing surface
    this.outerRadius = 0;
    this.innerRadius = 0;

    // Track center
    this.centerX = 0;
    this.centerY = 0;

    // Track segments for oval
    this.segments = [];

    // Checkpoints
    this.checkpoints = [];
    this.checkpointCount = 4;

    // Finish line
    this.finishLine = null;

    // Racing line (for AI)
    this.racingLine = [];
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.init();
  }

  init() {
    // Calculate track dimensions based on screen size
    const margin = 60;
    const availableWidth = this.width - margin * 2;
    const availableHeight = this.height - margin * 2;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    // Oval dimensions
    const ovalWidth = availableWidth * 0.45;
    const ovalHeight = availableHeight * 0.4;

    this.outerRadiusX = ovalWidth;
    this.outerRadiusY = ovalHeight;
    this.innerRadiusX = ovalWidth - this.trackWidth;
    this.innerRadiusY = ovalHeight - this.trackWidth;

    // Generate track path points
    this.generateTrackPath();

    // Setup checkpoints
    this.setupCheckpoints();

    // Setup finish line
    this.setupFinishLine();

    // Generate racing line for AI
    this.generateRacingLine();
  }

  generateTrackPath() {
    this.segments = [];
    const segments = 64;

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const nextAngle = ((i + 1) / segments) * Math.PI * 2;

      // Outer edge
      const outerX = this.centerX + Math.cos(angle) * this.outerRadiusX;
      const outerY = this.centerY + Math.sin(angle) * this.outerRadiusY;

      // Inner edge
      const innerX = this.centerX + Math.cos(angle) * this.innerRadiusX;
      const innerY = this.centerY + Math.sin(angle) * this.innerRadiusY;

      this.segments.push({
        angle,
        outerX, outerY,
        innerX, innerY,
        centerX: (outerX + innerX) / 2,
        centerY: (outerY + innerY) / 2
      });
    }
  }

  setupCheckpoints() {
    this.checkpoints = [];
    const checkpointAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];

    checkpointAngles.forEach((angle, index) => {
      const outerX = this.centerX + Math.cos(angle) * this.outerRadiusX;
      const outerY = this.centerY + Math.sin(angle) * this.outerRadiusY;
      const innerX = this.centerX + Math.cos(angle) * this.innerRadiusX;
      const innerY = this.centerY + Math.sin(angle) * this.innerRadiusY;

      this.checkpoints.push({
        index,
        x1: innerX, y1: innerY,
        x2: outerX, y2: outerY,
        angle
      });
    });

    this.checkpointCount = this.checkpoints.length;
  }

  setupFinishLine() {
    const angle = -Math.PI / 2; // Top of track
    const outerX = this.centerX + Math.cos(angle) * this.outerRadiusX;
    const outerY = this.centerY + Math.sin(angle) * this.outerRadiusY;
    const innerX = this.centerX + Math.cos(angle) * this.innerRadiusX;
    const innerY = this.centerY + Math.sin(angle) * this.innerRadiusY;

    this.finishLine = {
      x1: innerX, y1: innerY,
      x2: outerX, y2: outerY
    };
  }

  generateRacingLine() {
    this.racingLine = [];
    const points = 32;

    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2 - Math.PI / 2; // Start from top
      const radiusX = (this.outerRadiusX + this.innerRadiusX) / 2;
      const radiusY = (this.outerRadiusY + this.innerRadiusY) / 2;

      this.racingLine.push({
        x: this.centerX + Math.cos(angle) * radiusX,
        y: this.centerY + Math.sin(angle) * radiusY,
        angle: angle + Math.PI / 2 // Tangent angle
      });
    }
  }

  getStartPositions(count) {
    const positions = [];
    const startAngle = -Math.PI / 2; // Top of track
    const spacing = 50;

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / 2);
      const col = i % 2;

      // Offset along track
      const angleOffset = (row * spacing) / this.outerRadiusY;
      const angle = startAngle + angleOffset;

      // Lateral offset (inside/outside)
      const lateralOffset = col === 0 ? -25 : 25;
      const radiusX = (this.outerRadiusX + this.innerRadiusX) / 2 + lateralOffset;
      const radiusY = (this.outerRadiusY + this.innerRadiusY) / 2 + lateralOffset;

      positions.push({
        x: this.centerX + Math.cos(angle) * radiusX,
        y: this.centerY + Math.sin(angle) * radiusY,
        angle: angle + Math.PI / 2 // Face forward
      });
    }

    return positions;
  }

  getItemBoxPositions() {
    const positions = [];
    const angles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];

    angles.forEach(angle => {
      const radiusX = (this.outerRadiusX + this.innerRadiusX) / 2;
      const radiusY = (this.outerRadiusY + this.innerRadiusY) / 2;

      positions.push({
        x: this.centerX + Math.cos(angle) * radiusX,
        y: this.centerY + Math.sin(angle) * radiusY
      });
    });

    return positions;
  }

  isOnTrack(x, y) {
    // Check if point is within track bounds (between inner and outer oval)
    const dx = (x - this.centerX) / this.outerRadiusX;
    const dy = (y - this.centerY) / this.outerRadiusY;
    const outerDist = dx * dx + dy * dy;

    const dxInner = (x - this.centerX) / this.innerRadiusX;
    const dyInner = (y - this.centerY) / this.innerRadiusY;
    const innerDist = dxInner * dxInner + dyInner * dyInner;

    return outerDist <= 1 && innerDist >= 1;
  }

  isOffTrack(x, y) {
    return !this.isOnTrack(x, y);
  }

  getTrackAngle(x, y) {
    // Get the angle of the track at this position
    return Math.atan2(y - this.centerY, x - this.centerX) + Math.PI / 2;
  }

  isWrongWay(car) {
    const trackAngle = this.getTrackAngle(car.x, car.y);
    let angleDiff = car.angle - trackAngle;

    // Normalize to -PI to PI
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    // Wrong way if facing opposite direction
    return Math.abs(angleDiff) > Math.PI / 2;
  }

  checkFinishLine(car) {
    if (!car.prevX || !car.prevY) return false;

    // Check if car crossed finish line
    const line = this.finishLine;
    return this.linesCross(
      car.prevX, car.prevY, car.x, car.y,
      line.x1, line.y1, line.x2, line.y2
    );
  }

  checkCheckpoints(car) {
    if (!car.prevX || !car.prevY) return;

    this.checkpoints.forEach(cp => {
      if (car.checkpoints === cp.index) {
        const crossed = this.linesCross(
          car.prevX, car.prevY, car.x, car.y,
          cp.x1, cp.y1, cp.x2, cp.y2
        );

        if (crossed) {
          car.checkpoints++;
          car.checkpointProgress = 0;
        }
      }
    });

    // Update progress towards next checkpoint
    const nextCheckpoint = this.checkpoints[car.checkpoints % this.checkpointCount];
    if (nextCheckpoint) {
      const dist = Math.hypot(
        (nextCheckpoint.x1 + nextCheckpoint.x2) / 2 - car.x,
        (nextCheckpoint.y1 + nextCheckpoint.y2) / 2 - car.y
      );
      car.checkpointProgress = 1 / (dist + 1);
    }
  }

  linesCross(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (Math.abs(denom) < 0.001) return false;

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  }

  getNearestRacingLinePoint(x, y) {
    let nearest = this.racingLine[0];
    let minDist = Infinity;
    let nearestIndex = 0;

    this.racingLine.forEach((point, index) => {
      const dist = Math.hypot(point.x - x, point.y - y);
      if (dist < minDist) {
        minDist = dist;
        nearest = point;
        nearestIndex = index;
      }
    });

    return { point: nearest, index: nearestIndex };
  }

  getNextRacingLinePoint(index) {
    return this.racingLine[(index + 1) % this.racingLine.length];
  }

  render(ctx) {
    // Draw grass
    ctx.fillStyle = '#1a5a2a';
    ctx.fillRect(0, 0, this.width, this.height);

    // Draw outer track area (slightly larger for border)
    ctx.fillStyle = '#AA4444';
    ctx.beginPath();
    ctx.ellipse(
      this.centerX, this.centerY,
      this.outerRadiusX + 10, this.outerRadiusY + 10,
      0, 0, Math.PI * 2
    );
    ctx.fill();

    // Draw track surface
    ctx.fillStyle = '#3a3a4a';
    ctx.beginPath();
    ctx.ellipse(
      this.centerX, this.centerY,
      this.outerRadiusX, this.outerRadiusY,
      0, 0, Math.PI * 2
    );
    ctx.fill();

    // Draw inner grass
    ctx.fillStyle = '#1a6a2a';
    ctx.beginPath();
    ctx.ellipse(
      this.centerX, this.centerY,
      this.innerRadiusX, this.innerRadiusY,
      0, 0, Math.PI * 2
    );
    ctx.fill();

    // Draw center line (dashed)
    ctx.strokeStyle = '#FFE135';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.ellipse(
      this.centerX, this.centerY,
      (this.outerRadiusX + this.innerRadiusX) / 2,
      (this.outerRadiusY + this.innerRadiusY) / 2,
      0, 0, Math.PI * 2
    );
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw finish line
    this.renderFinishLine(ctx);

    // Draw checkpoints (optional, for debugging)
    // this.renderCheckpoints(ctx);
  }

  renderFinishLine(ctx) {
    const line = this.finishLine;

    // Checkered pattern
    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate(line.x1, line.y1);
    ctx.rotate(angle);

    const squareSize = 10;
    const rows = 2;
    const cols = Math.ceil(length / squareSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        ctx.fillStyle = (row + col) % 2 === 0 ? '#FFFFFF' : '#000000';
        ctx.fillRect(col * squareSize, row * squareSize - squareSize, squareSize, squareSize);
      }
    }

    ctx.restore();
  }

  renderCheckpoints(ctx) {
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.5)';
    ctx.lineWidth = 3;

    this.checkpoints.forEach(cp => {
      ctx.beginPath();
      ctx.moveTo(cp.x1, cp.y1);
      ctx.lineTo(cp.x2, cp.y2);
      ctx.stroke();
    });
  }

  renderMinimap(ctx, width, height) {
    const scaleX = width / this.width;
    const scaleY = height / this.height;

    ctx.strokeStyle = '#666';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(
      this.centerX * scaleX, this.centerY * scaleY,
      ((this.outerRadiusX + this.innerRadiusX) / 2) * scaleX,
      ((this.outerRadiusY + this.innerRadiusY) / 2) * scaleY,
      0, 0, Math.PI * 2
    );
    ctx.stroke();
  }
}
