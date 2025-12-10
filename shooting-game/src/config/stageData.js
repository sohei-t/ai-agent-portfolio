/**
 * Stage and wave configuration data
 */
export const stageData = {
  1: {
    id: 1,
    name: 'Asteroid Field',
    background: '#000033',
    duration: 90, // seconds
    waves: [
      { time: 5, type: 'BASIC', count: 3, formation: 'line' },
      { time: 10, type: 'BASIC', count: 5, formation: 'v_formation' },
      { time: 18, type: 'FAST', count: 4, formation: 'scattered' },
      { time: 25, type: 'MEDIUM', count: 3, formation: 'line' },
      { time: 35, type: 'BASIC', count: 6, formation: 'wave' },
      { time: 45, type: 'FAST', count: 5, formation: 'scattered' },
      { time: 55, type: 'MEDIUM', count: 4, formation: 'v_formation' },
      { time: 65, type: 'HEAVY', count: 2, formation: 'line' },
      { time: 75, type: 'BASIC', count: 8, formation: 'grid' }
    ],
    boss: {
      time: 85,
      type: 'BOSS_1'
    }
  },

  2: {
    id: 2,
    name: 'Nebula Sector',
    background: '#110033',
    duration: 100,
    waves: [
      { time: 5, type: 'FAST', count: 5, formation: 'scattered' },
      { time: 12, type: 'MEDIUM', count: 4, formation: 'line' },
      { time: 20, type: 'KAMIKAZE', count: 6, formation: 'scattered' },
      { time: 28, type: 'HEAVY', count: 2, formation: 'v_formation' },
      { time: 35, type: 'SNIPER', count: 3, formation: 'triangle' },
      { time: 45, type: 'BASIC', count: 8, formation: 'wave' },
      { time: 55, type: 'MEDIUM', count: 5, formation: 'grid' },
      { time: 65, type: 'FAST', count: 7, formation: 'scattered' },
      { time: 75, type: 'HEAVY', count: 3, formation: 'line' },
      { time: 85, type: 'KAMIKAZE', count: 8, formation: 'scattered' }
    ],
    boss: {
      time: 95,
      type: 'BOSS_1'
    }
  },

  3: {
    id: 3,
    name: 'Deep Space',
    background: '#001144',
    duration: 110,
    waves: [
      { time: 5, type: 'MEDIUM', count: 5, formation: 'v_formation' },
      { time: 13, type: 'SNIPER', count: 4, formation: 'scattered' },
      { time: 22, type: 'HEAVY', count: 3, formation: 'line' },
      { time: 32, type: 'KAMIKAZE', count: 10, formation: 'scattered' },
      { time: 42, type: 'FAST', count: 8, formation: 'wave' },
      { time: 52, type: 'MEDIUM', count: 6, formation: 'grid' },
      { time: 62, type: 'HEAVY', count: 4, formation: 'v_formation' },
      { time: 72, type: 'SNIPER', count: 5, formation: 'scattered' },
      { time: 82, type: 'BASIC', count: 10, formation: 'wave' },
      { time: 92, type: 'MEDIUM', count: 7, formation: 'grid' }
    ],
    boss: {
      time: 105,
      type: 'BOSS_2'
    }
  },

  4: {
    id: 4,
    name: 'Alien Territory',
    background: '#330033',
    duration: 120,
    waves: [
      { time: 5, type: 'HEAVY', count: 4, formation: 'line' },
      { time: 14, type: 'SNIPER', count: 5, formation: 'scattered' },
      { time: 24, type: 'KAMIKAZE', count: 12, formation: 'scattered' },
      { time: 34, type: 'MEDIUM', count: 7, formation: 'grid' },
      { time: 44, type: 'FAST', count: 10, formation: 'wave' },
      { time: 54, type: 'HEAVY', count: 5, formation: 'v_formation' },
      { time: 64, type: 'SNIPER', count: 6, formation: 'triangle' },
      { time: 74, type: 'MEDIUM', count: 8, formation: 'grid' },
      { time: 84, type: 'KAMIKAZE', count: 15, formation: 'scattered' },
      { time: 94, type: 'HEAVY', count: 6, formation: 'line' },
      { time: 104, type: 'FAST', count: 12, formation: 'wave' }
    ],
    boss: {
      time: 115,
      type: 'BOSS_2'
    }
  },

  5: {
    id: 5,
    name: 'Final Frontier',
    background: '#440011',
    duration: 130,
    waves: [
      { time: 5, type: 'HEAVY', count: 6, formation: 'grid' },
      { time: 15, type: 'SNIPER', count: 7, formation: 'scattered' },
      { time: 25, type: 'MEDIUM', count: 9, formation: 'wave' },
      { time: 35, type: 'KAMIKAZE', count: 18, formation: 'scattered' },
      { time: 45, type: 'FAST', count: 14, formation: 'wave' },
      { time: 55, type: 'HEAVY', count: 7, formation: 'v_formation' },
      { time: 65, type: 'SNIPER', count: 8, formation: 'triangle' },
      { time: 75, type: 'MEDIUM', count: 10, formation: 'grid' },
      { time: 85, type: 'HEAVY', count: 8, formation: 'line' },
      { time: 95, type: 'FAST', count: 16, formation: 'wave' },
      { time: 105, type: 'KAMIKAZE', count: 20, formation: 'scattered' },
      { time: 115, type: 'HEAVY', count: 9, formation: 'grid' }
    ],
    boss: {
      time: 125,
      type: 'BOSS_3'
    }
  }
};

/**
 * Formation patterns for enemy spawning
 */
export const formations = {
  line: {
    id: 'line',
    getPositions: (count, startX, startY, spacing = 60) => {
      const positions = [];
      const totalWidth = (count - 1) * spacing;
      const offsetX = startX - totalWidth / 2;

      for (let i = 0; i < count; i++) {
        positions.push({
          x: offsetX + i * spacing,
          y: startY
        });
      }
      return positions;
    }
  },

  v_formation: {
    id: 'v_formation',
    getPositions: (count, startX, startY, spacing = 50) => {
      const positions = [];
      const rows = Math.ceil(count / 2);

      for (let i = 0; i < count; i++) {
        const row = Math.floor(i / 2);
        const side = i % 2 === 0 ? -1 : 1;
        positions.push({
          x: startX + side * row * spacing,
          y: startY + row * spacing
        });
      }
      return positions;
    }
  },

  grid: {
    id: 'grid',
    getPositions: (count, startX, startY, spacing = 60) => {
      const positions = [];
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions.push({
          x: startX - (cols - 1) * spacing / 2 + col * spacing,
          y: startY + row * spacing
        });
      }
      return positions;
    }
  },

  scattered: {
    id: 'scattered',
    getPositions: (count, startX, startY, spreadX = 300, spreadY = 150) => {
      const positions = [];
      for (let i = 0; i < count; i++) {
        positions.push({
          x: startX + (Math.random() - 0.5) * spreadX,
          y: startY + Math.random() * spreadY
        });
      }
      return positions;
    }
  },

  wave: {
    id: 'wave',
    getPositions: (count, startX, startY, spacing = 50) => {
      const positions = [];
      const amplitude = 40;

      for (let i = 0; i < count; i++) {
        const x = startX - (count - 1) * spacing / 2 + i * spacing;
        const y = startY + Math.sin(i * 0.8) * amplitude;
        positions.push({ x, y });
      }
      return positions;
    }
  },

  triangle: {
    id: 'triangle',
    getPositions: (count, startX, startY, spacing = 50) => {
      const positions = [];
      let currentRow = 0;
      let posInRow = 0;
      let rowSize = 1;

      for (let i = 0; i < count; i++) {
        const x = startX - (rowSize - 1) * spacing / 2 + posInRow * spacing;
        const y = startY + currentRow * spacing;
        positions.push({ x, y });

        posInRow++;
        if (posInRow >= rowSize) {
          currentRow++;
          rowSize++;
          posInRow = 0;
        }
      }
      return positions;
    }
  }
};

/**
 * Get stage data by level
 * @param {number} level
 * @returns {Object} Stage data
 */
export function getStageData(level) {
  // Loop stages after stage 5
  const stageId = ((level - 1) % 5) + 1;
  return stageData[stageId] || stageData[1];
}

/**
 * Get formation by ID
 * @param {string} formationId
 * @returns {Object} Formation
 */
export function getFormation(formationId) {
  return formations[formationId] || formations.line;
}

export default stageData;
