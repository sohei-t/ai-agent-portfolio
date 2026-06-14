// =============================================================================
// モンスト・オリジン — Monster Hunt 3D
//   王道ファンタジーのモンスター狩りゲーム（縦スライス1本）。
//
//   3Dキャラクターの扱いは robo-battle v6 のデータ駆動方式を流用:
//     - assets/characters.json + assets/models/{model}_walking_glb_url.glb
//     - 歩行 glb を AnimationMixer で再生、Meshy 特有の極小スケールを bbox 正規化
//     - glb が無ければプリミティブの仮キャラを自動生成 → API キー無しでも即プレイ可
//
//   キャラ生成・登録は別ツール tools/character-studio/（Meshy 3D Studio 移植）が担当。
//   ゲーム本体は characters.json + glb を読むだけでコードは書き換え不要。
// =============================================================================
import * as THREE from 'three';
import { GLTFLoader } from './lib/loaders/GLTFLoader.js';
import { mergeGeometries } from './lib/utils/BufferGeometryUtils.js';
import { EffectComposer } from './lib/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './lib/postprocessing/UnrealBloomPass.js';
import { OutputPass } from './lib/postprocessing/OutputPass.js';

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const CONFIG = {
  FIELD_RADIUS: 90,           // 円形フィールドの半径
  HUNTER_NORM_HEIGHT: 1.8,    // 仮ハンターの目標表示高(m)
  MONSTER_BASE_HEIGHT: 3.4,   // 仮モンスターの目標表示高(m)
  CUSTOM_NORM_MIN: 0.02,      // glb 正規化倍率の下限(v6 踏襲)
  CUSTOM_NORM_MAX: 50,        // 上限
  MODEL_BASE: './assets/models/',
  CHAR_JSON: './assets/characters.json',
  QUEST_SECONDS: 15 * 60,
};

// ---------------------------------------------------------------------------
// utils
// ---------------------------------------------------------------------------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const TAU = Math.PI * 2;
function angDelta(a, b) { let d = (b - a) % TAU; if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU; return d; }

// ---------------------------------------------------------------------------
// glb 正規化ヘルパー（v6/game3d.js の measureSceneHeight / customNormFactor 踏襲）
// ---------------------------------------------------------------------------
const _box = new THREE.Box3();
const _sz = new THREE.Vector3();
function measureSceneHeight(scene) {
  _box.setFromObject(scene);
  if (!isFinite(_box.min.y) || !isFinite(_box.max.y)) return 1;
  _box.getSize(_sz);
  return Math.max(_sz.x, _sz.y, _sz.z) || 1;  // 最大辺
}
function normFactor(rawMax, targetMax) {
  let f = targetMax / (rawMax || 1);
  return clamp(f, CONFIG.CUSTOM_NORM_MIN, CONFIG.CUSTOM_NORM_MAX);
}

// ---------------------------------------------------------------------------
// glb ローダー（歩行アニメ対応）。失敗時は null を返し呼び出し側がフォールバック。
// ---------------------------------------------------------------------------
const _loader = new GLTFLoader();
function fileExists(url) {
  return fetch(url, { method: 'HEAD', cache: 'no-store' })
    .then(r => r.ok).catch(() => false);
}
function loadGltf(url) {
  return new Promise((resolve) => {
    _loader.load(url, (g) => resolve(g), undefined, () => resolve(null));
  });
}

// glb から「歩く 3Dモデル」を組み立てる。targetHeight に正規化して返す。
//   返り値: { root, mixer|null, setMoving(bool), update(dt), flash(), bbHeight }
function buildGlbModel(gltf, targetHeight, yaw = 0) {
  const root = new THREE.Group();
  const scene = gltf.scene;
  const raw = measureSceneHeight(scene);
  const s = normFactor(raw, targetHeight);
  root.add(scene);                 // SkinnedMesh は直接スケールしない（v6 ベストプラクティス）
  root.scale.setScalar(s);
  scene.rotation.y += yaw;

  const flashMats = [];
  scene.traverse((o) => {
    if (o.isMesh || o.isSkinnedMesh) {
      o.castShadow = true; o.receiveShadow = false;
      if (o.material) { o.material = o.material.clone(); flashMats.push(o.material); }
    }
  });

  let mixer = null, walkAction = null, animated = false;
  if (gltf.animations && gltf.animations.length) {
    // 歩行クリップを優先（名前に walk/run、無ければ先頭）。v6 同様キーフレーム≥2 をガード
    const clips = gltf.animations;
    let clip = clips.find(c => /walk/i.test(c.name)) || clips.find(c => /run/i.test(c.name)) || clips[0];
    const maxKeys = clip.tracks.reduce((m, t) => Math.max(m, t.times ? t.times.length : 0), 0);
    if (maxKeys >= 2) {
      mixer = new THREE.AnimationMixer(scene);
      walkAction = mixer.clipAction(clip);
      walkAction.play();
      mixer.update(0);
      animated = true;
    }
  }

  let flashT = 0;
  return {
    root, mixer, animated,
    bbHeight: raw * s,
    setMoving(on) { if (walkAction) walkAction.timeScale = on ? 1 : 0.15; },
    flash() { flashT = 0.14; },
    update(dt, moving) {
      if (mixer) mixer.update(dt);
      if (flashT > 0) {
        flashT -= dt;
        const k = Math.max(0, flashT / 0.14);
        for (const m of flashMats) { if (m.emissive) { m.emissive.setRGB(k, k * .3, k * .2); m.emissiveIntensity = 1; } }
      }
    },
  };
}

// ---------------------------------------------------------------------------
// プリミティブの仮キャラ（glb 不在時のフォールバック）
// ---------------------------------------------------------------------------
function buildProcHunter(color = 0x9fb6cc) {
  const root = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xe0b89a, roughness: .8 });
  const cloth = new THREE.MeshStandardMaterial({ color, roughness: .7, metalness: .15 });
  const armor = new THREE.MeshStandardMaterial({ color: 0x6a7886, roughness: .4, metalness: .6 });
  const mk = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; root.add(m); return m; };
  // 胴
  mk(new THREE.CapsuleGeometry(0.3, 0.55, 6, 12), cloth, 0, 1.15, 0);
  mk(new THREE.BoxGeometry(0.72, 0.4, 0.4), armor, 0, 1.4, 0);     // 肩当て
  // 頭
  mk(new THREE.SphereGeometry(0.22, 16, 12), skin, 0, 1.72, 0);
  // 脚
  const legL = mk(new THREE.CapsuleGeometry(0.13, 0.5, 4, 8), cloth, -0.16, 0.55, 0);
  const legR = mk(new THREE.CapsuleGeometry(0.13, 0.5, 4, 8), cloth, 0.16, 0.55, 0);
  // 腕 + 剣
  const armR = new THREE.Group(); armR.position.set(0.42, 1.35, 0); root.add(armR);
  const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.45, 4, 8), skin); arm.position.y = -0.2; arm.castShadow = true; armR.add(arm);
  const sword = new THREE.Group(); sword.position.set(0, -0.45, 0.1); armR.add(sword);
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 0.02), new THREE.MeshStandardMaterial({ color: 0xd7e0ea, metalness: .9, roughness: .25 }));
  blade.position.y = -0.4; blade.castShadow = true; sword.add(blade);
  const guard = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.06, 0.08), armor); sword.add(guard);
  const armL = mk(new THREE.CapsuleGeometry(0.1, 0.45, 4, 8), skin, -0.42, 1.15, 0);

  let t = 0;
  return {
    root, mixer: null, animated: true, swordPivot: armR, sword, bbHeight: 1.85,
    setMoving() {},
    flash() {
      [cloth, skin, armor].forEach(m => { m.emissive = new THREE.Color(0.8, 0.2, 0.15); m.emissiveIntensity = 1; });
      setTimeout(() => [cloth, skin, armor].forEach(m => { m.emissiveIntensity = 0; }), 130);
    },
    update(dt, moving) {
      t += dt;
      const sp = moving ? 10 : 2.5, amp = moving ? 0.5 : 0.06;
      legL.rotation.x = Math.sin(t * sp) * amp;
      legR.rotation.x = -Math.sin(t * sp) * amp;
      armL.rotation.x = -Math.sin(t * sp) * amp * 0.7;
    },
  };
}

function buildProcMonster(spec) {
  const root = new THREE.Group();
  const hide = new THREE.MeshStandardMaterial({ color: spec.color || 0x7a5a3a, roughness: .85, metalness: .05 });
  const belly = new THREE.MeshStandardMaterial({ color: 0xcabd96, roughness: .9 });
  const claw = new THREE.MeshStandardMaterial({ color: 0x2a221c, roughness: .5 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffcc33, emissive: 0xaa6600, emissiveIntensity: 1.2 });
  const mk = (geo, mat, x, y, z, parent = root) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; };

  // 胴（四足獣）
  const body = mk(new THREE.SphereGeometry(1.0, 18, 14), hide, 0, 1.5, 0);
  body.scale.set(1.5, 1.0, 1.1);
  mk(new THREE.SphereGeometry(0.85, 16, 12), belly, 0, 1.15, 0.1).scale.set(1.2, .6, .9);
  // 首 + 頭
  const neck = new THREE.Group(); neck.position.set(0, 1.9, 1.2); root.add(neck);
  mk(new THREE.CylinderGeometry(0.4, 0.55, 1.0, 12), hide, 0, 0, 0, neck).rotation.x = 0.9;
  const head = new THREE.Group(); head.position.set(0, 0.45, 0.7); neck.add(head);
  mk(new THREE.SphereGeometry(0.55, 16, 12), hide, 0, 0, 0, head).scale.set(1, .9, 1.3);
  mk(new THREE.ConeGeometry(0.18, 0.5, 8), hide, 0, 0.35, 0.2, head).rotation.x = -0.3;   // 角
  mk(new THREE.SphereGeometry(0.1, 8, 6), eyeMat, -0.25, 0.1, 0.55, head);
  mk(new THREE.SphereGeometry(0.1, 8, 6), eyeMat, 0.25, 0.1, 0.55, head);
  // 牙の口
  mk(new THREE.BoxGeometry(0.5, 0.12, 0.3), claw, 0, -0.25, 0.5, head);
  // 脚 4本
  const legs = [];
  [[-0.8, 1.0], [0.8, 1.0], [-0.8, -1.0], [0.8, -1.0]].forEach(([x, z]) => {
    const lg = new THREE.Group(); lg.position.set(x, 1.1, z); root.add(lg);
    mk(new THREE.CapsuleGeometry(0.28, 0.9, 4, 8), hide, 0, -0.55, 0, lg);
    mk(new THREE.ConeGeometry(0.2, 0.3, 6), claw, 0, -1.05, 0.05, lg);
    legs.push(lg);
  });
  // 尻尾（破壊可能部位）
  const tail = new THREE.Group(); tail.position.set(0, 1.5, -1.4); root.add(tail);
  let seg = tail;
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Group(); s.position.set(0, 0, -0.6); seg.add(s);
    mk(new THREE.SphereGeometry(0.4 - i * 0.07, 10, 8), hide, 0, 0, -0.3, s);
    seg = s;
  }
  mk(new THREE.ConeGeometry(0.2, 0.6, 8), claw, 0, 0, -0.5, seg).rotation.x = -Math.PI / 2;

  let t = 0;
  const allMats = [hide, belly, claw];
  return {
    root, mixer: null, animated: true, bbHeight: 3.4,
    tail, neck, head,
    setMoving() {},
    flash() {
      allMats.forEach(m => { m.emissive = new THREE.Color(0.9, 0.2, 0.1); m.emissiveIntensity = 1; });
      setTimeout(() => allMats.forEach(m => { m.emissiveIntensity = 0; }), 130);
    },
    setEnrage(on) {
      eyeMat.emissive.setHex(on ? 0xff2200 : 0xaa6600);
      eyeMat.emissiveIntensity = on ? 2.2 : 1.2;
    },
    update(dt, moving) {
      t += dt;
      const sp = moving ? 7 : 2, amp = moving ? 0.5 : 0.08;
      legs[0].rotation.x = Math.sin(t * sp) * amp;
      legs[1].rotation.x = -Math.sin(t * sp) * amp;
      legs[2].rotation.x = -Math.sin(t * sp) * amp;
      legs[3].rotation.x = Math.sin(t * sp) * amp;
      neck.rotation.x = 0.05 * Math.sin(t * 1.5);
      tail.rotation.y = 0.18 * Math.sin(t * 2.2);
    },
  };
}

// ---------------------------------------------------------------------------
// キャラ定義（characters.json を読み、なければ既定値）
//   既定モンスタークエスト（縦スライス）はゲーム内に内蔵。json があれば視覚モデルを差し替え。
// ---------------------------------------------------------------------------
const DEFAULT_HUNTER = { id: 'hunter', model: 'hunter', modelType: 'rigged' };
const MONSTER_TIERS = [
  { id: 'forest_boar', emoji: '🐗', name: { ja: 'グランボア', en: 'Granboar' }, rank: '★1',
    desc: { ja: '森に棲む大猪。狩人の入門に最適。', en: 'A giant forest boar.' },
    hp: 900, speed: 5.2, attack: 14, color: 0x7a5a3a, aggro: 26, tier: 1,
    drops: [['獣の毛皮', 2], ['鋭い牙', 1]], unlock: 0 },
  { id: 'crag_lizard', emoji: '🦎', name: { ja: 'ロックドレイク', en: 'Crag Drake' }, rank: '★2',
    desc: { ja: '岩場を駆ける飛竜種。突進に注意。', en: 'A rocky wyvern that charges.' },
    hp: 1600, speed: 6.0, attack: 22, color: 0x5b6e54, aggro: 30, tier: 2,
    drops: [['竜鱗', 2], ['鋭い牙', 2], ['竜の延髄', 1]], unlock: 1 },
  { id: 'ember_wyvern', emoji: '🐉', name: { ja: 'イグドラ', en: 'Ygdra' }, rank: '★3',
    desc: { ja: '灼熱をまとう古龍。最強の試練。', en: 'An ancient flame dragon.' },
    hp: 2600, speed: 6.6, attack: 32, color: 0x8a3326, aggro: 34, tier: 3,
    drops: [['龍の宝玉', 1], ['竜鱗', 3], ['竜の延髄', 2]], unlock: 2 },
];

let CHAR_DATA = [];   // characters.json の生データ
async function loadCharacterData() {
  try {
    const r = await fetch(CONFIG.CHAR_JSON, { cache: 'no-store' });
    if (!r.ok) return [];
    const d = await r.json();
    return Array.isArray(d) ? d : [];
  } catch { return []; }
}
function findCharEntry(role, idOrTier) {
  // role: 'hunter' | 'monster'。monster は id 一致 → tier 一致の順
  const cands = CHAR_DATA.filter(e => e.role === role && e.model);
  if (role === 'hunter') return cands[0] || null;
  return cands.find(e => e.id === idOrTier) || cands.find(e => e.tier === idOrTier) || null;
}
// エントリ → 使う glb URL（rigged: walking → running、static: _static）
async function resolveGlbUrl(entry) {
  if (!entry) return null;
  const base = CONFIG.MODEL_BASE + entry.model;
  const cands = entry.modelType === 'static'
    ? [`${base}_static.glb`]
    : [`${base}_walking_glb_url.glb`, `${base}_running_glb_url.glb`, `${base}_static.glb`];
  for (const u of cands) { if (await fileExists(u)) return u; }
  return null;
}

// ---------------------------------------------------------------------------
// セーブデータ
// ---------------------------------------------------------------------------
const SAVE_KEY = 'monsto_save_v1';
const save = {
  data: { materials: {}, wpnLv: 0, armorLv: 0, cleared: [] },
  load() { try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s) this.data = Object.assign(this.data, s); } catch {} },
  flush() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.data)); } catch {} },
  addMat(name, n) { this.data.materials[name] = (this.data.materials[name] || 0) + n; this.flush(); },
  hasMat(name, n) { return (this.data.materials[name] || 0) >= n; },
  useMat(name, n) { this.data.materials[name] = Math.max(0, (this.data.materials[name] || 0) - n); this.flush(); },
};
save.load();

// 強化値 → ステータス
const wpnAttack = () => 36 + save.data.wpnLv * 10;     // 武器攻撃力
const maxHP = () => 100 + save.data.armorLv * 25;       // 体力上限

// ---------------------------------------------------------------------------
// レンダラ / シーン
// ---------------------------------------------------------------------------
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// 大気っぽい遠景フォグ（地平の霞色に合わせる）。山リングが自然に霞んで奥行きが出る。
const HAZE = new THREE.Color(0xcdd9e2);
scene.fog = new THREE.Fog(HAZE.getHex(), 75, 240);

const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 600);

// ライト
const hemi = new THREE.HemisphereLight(0xaecbe6, 0x4c4636, 0.75);
scene.add(hemi);
const SUN_DIR = new THREE.Vector3(0.55, 0.62, 0.35).normalize(); // 太陽の方向（空と共有）
const sun = new THREE.DirectionalLight(0xfff2da, 2.2);
sun.position.copy(SUN_DIR).multiplyScalar(90);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -60; sun.shadow.camera.right = 60;
sun.shadow.camera.top = 60; sun.shadow.camera.bottom = -60;
sun.shadow.camera.far = 260;
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
scene.add(sun);
scene.add(sun.target);
// 補助のリムライト（逆光で輪郭を出す）
const rim = new THREE.DirectionalLight(0xbcd2ff, 0.35);
rim.position.set(-40, 30, -50);
scene.add(rim);

// ---------------------------------------------------------------------------
// 地形（ハイトフィールド）— 中心は戦闘用にほぼ平坦、外周は山リング
// ---------------------------------------------------------------------------
function terrainHeight(x, z) {
  const r = Math.hypot(x, z);
  // ゆるやかな起伏（複数周波数）
  let h = 0.55 * Math.sin(x * 0.045) * Math.cos(z * 0.05)
        + 0.30 * Math.sin(x * 0.12 + 1.3) * Math.cos(z * 0.10 - 0.7)
        + 0.16 * Math.sin(x * 0.25 - 0.4) * Math.sin(z * 0.23 + 2.1);
  // 中心(戦闘エリア)ほど平坦に
  const flat = clamp((r - 5) / 28, 0, 1);
  h *= 0.25 + 0.75 * flat;
  // 外周の山リング（フィールド境界の外へ向かってせり上がる）
  const edge = CONFIG.FIELD_RADIUS;
  if (r > edge - 20) {
    const t = clamp((r - (edge - 20)) / 30, 0, 1);
    h += t * t * (24 + 8 * Math.sin(Math.atan2(z, x) * 5)); // 稜線に起伏
  }
  return h;
}

// グラデーション空ドーム（シェーダ・追加アセット不要）
function makeSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x3b7fd4) },
    midColor: { value: new THREE.Color(0x8fb6e0) },
    botColor: { value: HAZE.clone() },
    sunDir: { value: SUN_DIR.clone() },
    sunColor: { value: new THREE.Color(0xfff4d6) },
  };
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, uniforms,
    vertexShader: `varying vec3 vDir;
      void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vDir; uniform vec3 topColor, midColor, botColor, sunColor, sunDir;
      void main(){
        float h = clamp(vDir.y, 0.0, 1.0);
        vec3 sky = mix(botColor, midColor, smoothstep(0.0, 0.18, h));
        sky = mix(sky, topColor, smoothstep(0.18, 0.7, h));
        float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        sky += sunColor * (pow(s, 220.0) * 1.2 + pow(s, 18.0) * 0.25); // 太陽＋ハロー
        gl_FragColor = vec4(sky, 1.0);
      }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(480, 32, 16), mat);
  sky.frustumCulled = false;
  return sky;
}
scene.add(makeSky());

// 地形メッシュ（頂点カラーで斜面=岩 / 平地=草を表現）
const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96, metalness: 0.0 });
let terrain = null;
function buildTerrain() {
  if (terrain) { scene.remove(terrain); terrain.geometry.dispose(); }
  const D = (CONFIG.FIELD_RADIUS + 40) * 2, SEG = 200;
  const geo = new THREE.PlaneGeometry(D, D, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = [];
  const cGrass = new THREE.Color(0x5c7a3a), cGrass2 = new THREE.Color(0x47632e);
  const cRock = new THREE.Color(0x6f6a60), cDirt = new THREE.Color(0x6e5a3c), cSnow = new THREE.Color(0xdfe6ea);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    const y = terrainHeight(x, z);
    pos.setY(i, y);
  }
  geo.computeVertexNormals();
  const nrm = geo.attributes.normal;
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i), slope = 1 - nrm.getY(i); // 0=平ら, 1=垂直
    // 平地: 草の濃淡 / 斜面: 岩 / 高所: 雪
    tmp.copy(cGrass).lerp(cGrass2, (Math.sin(pos.getX(i) * 0.3) * 0.5 + 0.5));
    tmp.lerp(cDirt, clamp(slope * 2.2, 0, 1) * 0.5);
    tmp.lerp(cRock, clamp((slope - 0.25) * 2.5, 0, 1));
    if (y > 14) tmp.lerp(cSnow, clamp((y - 14) / 12, 0, 1));
    colors.push(tmp.r, tmp.g, tmp.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  terrain = new THREE.Mesh(geo, terrainMat);
  terrain.receiveShadow = true;
  scene.add(terrain);
}
buildTerrain();

// IBL: 空グラデーションから簡易環境マップを作り PBR を映えさせる
function buildEnvironment() {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const cnv = document.createElement('canvas'); cnv.width = 16; cnv.height = 128;
  const ctx = cnv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, '#3b7fd4'); g.addColorStop(0.55, '#9fc0e2'); g.addColorStop(1, '#7e7156');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 16, 128);
  const tex = new THREE.CanvasTexture(cnv); tex.colorSpace = THREE.SRGBColorSpace;
  const envScene = new THREE.Scene(); envScene.background = tex;
  scene.environment = pmrem.fromScene(envScene, 0).texture;
  tex.dispose();
}

// 草の風 uniform（毎フレーム更新）
const windUniform = { value: 0 };

// ---------------------------------------------------------------------------
// フィールド構築（地形に沿って草・木・岩・採取・山リングを配置）
// ---------------------------------------------------------------------------
const decoGroup = new THREE.Group(); scene.add(decoGroup);
const gatherNodes = [];
let grassMesh = null;

function makeGrassGeometry() {
  // 2枚クロスのブレード。基部 y=0、先端 y≈0.7。
  const blade = new THREE.PlaneGeometry(0.13, 0.7, 1, 2);
  blade.translate(0, 0.35, 0);
  const blade2 = blade.clone(); blade2.rotateY(Math.PI / 2);
  const g = mergeGeometries([blade, blade2]);
  // 頂点カラー: 基部濃い→先端明るい
  const cols = [], p = g.attributes.position;
  const base = new THREE.Color(0x3f5a26), tip = new THREE.Color(0x86a64e), t = new THREE.Color();
  for (let i = 0; i < p.count; i++) { t.copy(base).lerp(tip, clamp(p.getY(i) / 0.7, 0, 1)); cols.push(t.r, t.g, t.b); }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  return g;
}
function buildGrass() {
  if (grassMesh) { scene.remove(grassMesh); grassMesh.geometry.dispose(); }
  const COUNT = 4200;
  const geo = makeGrassGeometry();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, side: THREE.DoubleSide });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = windUniform;
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       vec3 iPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
       float sway = sin(uTime * 1.6 + iPos.x * 0.25 + iPos.z * 0.22);
       float bend = pow(max(position.y, 0.0), 1.4);
       transformed.x += sway * bend * 0.28;
       transformed.z += cos(uTime * 1.25 + iPos.x * 0.2) * bend * 0.14;`);
  };
  grassMesh = new THREE.InstancedMesh(geo, mat, COUNT);
  grassMesh.castShadow = false; grassMesh.receiveShadow = false;
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), pp = new THREE.Vector3();
  let n = 0;
  for (let i = 0; i < COUNT; i++) {
    const a = rand(0, TAU), r = Math.sqrt(Math.random()) * (CONFIG.FIELD_RADIUS - 4);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const sc = rand(0.6, 1.5);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand(0, TAU));
    s.set(sc, rand(0.8, 1.6), sc);
    pp.set(x, terrainHeight(x, z), z);
    m.compose(pp, q, s); grassMesh.setMatrixAt(n++, m);
  }
  grassMesh.count = n; grassMesh.instanceMatrix.needsUpdate = true;
  grassMesh.frustumCulled = false;
  scene.add(grassMesh);
}

function makeTree() {
  const t = new THREE.Group();
  const h = rand(3.5, 7);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.5, h, 8),
    new THREE.MeshStandardMaterial({ color: 0x5a3f28, roughness: 1 }));
  trunk.position.y = h / 2; trunk.castShadow = true; t.add(trunk);
  // 円錐/球を重ねた葉群
  const leafCol = new THREE.Color().setHSL(0.28, 0.45, rand(0.26, 0.4));
  const lmat = new THREE.MeshStandardMaterial({ color: leafCol, roughness: 1 });
  const tiers = Math.random() < 0.5 ? 3 : 1;
  if (tiers === 3) { // 針葉樹
    for (let k = 0; k < 3; k++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(2.2 - k * 0.5, 2.6, 9), lmat);
      cone.position.y = h - 0.5 + k * 1.5; cone.castShadow = true; t.add(cone);
    }
  } else { // 広葉樹
    for (let k = 0; k < 3; k++) {
      const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(rand(1.5, 2.3), 1), lmat);
      blob.position.set(rand(-0.8, 0.8), h + rand(-0.2, 1.2), rand(-0.8, 0.8));
      blob.scale.y = 0.85; blob.castShadow = true; t.add(blob);
    }
  }
  return t;
}

function buildField() {
  decoGroup.clear(); gatherNodes.length = 0;
  buildGrass();
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x70726e, roughness: .92 });
  const bushMat = new THREE.MeshStandardMaterial({ color: 0x3d5a2a, roughness: 1 });
  // 木・岩・茂み
  for (let i = 0; i < 90; i++) {
    const a = rand(0, TAU), r = rand(7, CONFIG.FIELD_RADIUS - 3);
    const x = Math.cos(a) * r, z = Math.sin(a) * r, y = terrainHeight(x, z);
    const roll = Math.random();
    if (roll < 0.42) {
      const t = makeTree(); t.position.set(x, y, z); t.rotation.y = rand(0, TAU);
      const sc = rand(0.8, 1.3); t.scale.setScalar(sc); decoGroup.add(t);
    } else if (roll < 0.75) {
      const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(rand(0.7, 2.2), 0), rockMat);
      rk.position.set(x, y + rand(-0.1, 0.4), z); rk.rotation.set(rand(0, 6), rand(0, 6), rand(0, 6));
      rk.castShadow = true; rk.receiveShadow = true; decoGroup.add(rk);
    } else {
      const bush = new THREE.Mesh(new THREE.IcosahedronGeometry(rand(0.7, 1.3), 1), bushMat);
      bush.position.set(x, y + 0.3, z); bush.scale.y = 0.7; bush.castShadow = true; decoGroup.add(bush);
    }
  }
  // 採取ノード（光る薬草）
  const herbMat = new THREE.MeshStandardMaterial({ color: 0x9bf06a, emissive: 0x3aa028, emissiveIntensity: .8, roughness: .5 });
  for (let i = 0; i < 6; i++) {
    const a = rand(0, TAU), r = rand(14, CONFIG.FIELD_RADIUS - 10);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 0), herbMat.clone());
    node.position.set(x, terrainHeight(x, z) + 0.5, z);
    node.userData.used = false;
    decoGroup.add(node); gatherNodes.push(node);
  }
  // 境界の山岳ロック（地形の山リングに重ねて遮蔽感）
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x595044, roughness: 1 });
  for (let i = 0; i < 70; i++) {
    const a = (i / 70) * TAU, r = CONFIG.FIELD_RADIUS + rand(2, 9);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const rk = new THREE.Mesh(new THREE.DodecahedronGeometry(rand(3, 6), 0), wallMat);
    rk.position.set(x, terrainHeight(x, z) + rand(0, 2), z);
    rk.rotation.set(rand(0, 6), rand(0, 6), rand(0, 6)); rk.castShadow = true; rk.receiveShadow = true; decoGroup.add(rk);
  }
}

// ---------------------------------------------------------------------------
// 入力
// ---------------------------------------------------------------------------
const keys = {};
addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', e => { keys[e.code] = false; });

// マウス：カメラ旋回 + 攻撃
let camYaw = 0, camPitch = 0.42, dragging = false, lastX = 0, lastY = 0;
const input = { lightQueued: false, heavyQueued: false };
renderer.domElement.addEventListener('mousedown', e => {
  if (state.mode !== 'hunt') return;
  if (e.button === 0) { input.lightQueued = true; dragging = true; }
  else if (e.button === 2) { input.heavyQueued = true; }
  lastX = e.clientX; lastY = e.clientY;
});
addEventListener('mousemove', e => {
  if (!dragging) return;
  camYaw -= (e.clientX - lastX) * 0.005;
  camPitch = clamp(camPitch + (e.clientY - lastY) * 0.004, 0.08, 1.2);
  lastX = e.clientX; lastY = e.clientY;
});
addEventListener('mouseup', () => { dragging = false; });
renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());
addEventListener('wheel', e => { camDist = clamp(camDist + Math.sign(e.deltaY) * 0.6, 4, 14); }, { passive: true });
let camDist = 7.5;

addEventListener('keydown', e => {
  if (state.mode !== 'hunt') return;
  if (e.code === 'Space') player.tryDodge();
  if (e.code === 'KeyQ') toggleLock();
  if (e.code === 'KeyE') tryGather();
  if (e.code === 'KeyR') usePotion();
});

// モバイル：仮想ジョイスティック + ボタン
const touchEl = document.getElementById('touch');
const joy = document.getElementById('joy'), joyKnob = document.getElementById('joyKnob');
const moveVec = { x: 0, y: 0 };
let joyId = null;
const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
if (isTouch) touchEl.classList.add('on');
function setupTouch() {
  joy.addEventListener('touchstart', e => { joyId = e.changedTouches[0].identifier; e.preventDefault(); }, { passive: false });
  addEventListener('touchmove', e => {
    for (const t of e.changedTouches) {
      if (t.identifier === joyId) {
        const r = joy.getBoundingClientRect();
        let dx = t.clientX - (r.left + r.width / 2), dy = t.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy), max = r.width / 2;
        if (d > max) { dx *= max / d; dy *= max / d; }
        joyKnob.style.transform = `translate(${dx}px,${dy}px)`;
        moveVec.x = dx / max; moveVec.y = dy / max;
      }
    }
  }, { passive: false });
  addEventListener('touchend', e => {
    for (const t of e.changedTouches) if (t.identifier === joyId) { joyId = null; moveVec.x = moveVec.y = 0; joyKnob.style.transform = ''; }
  });
  // カメラドラッグ（画面右側スワイプ）
  let camTouchId = null, ctx = 0, cty = 0;
  renderer.domElement.addEventListener('touchstart', e => {
    const t = e.changedTouches[0];
    if (t.clientX > innerWidth * 0.4) { camTouchId = t.identifier; ctx = t.clientX; cty = t.clientY; }
  });
  renderer.domElement.addEventListener('touchmove', e => {
    for (const t of e.changedTouches) if (t.identifier === camTouchId) {
      camYaw -= (t.clientX - ctx) * 0.006; camPitch = clamp(camPitch + (t.clientY - cty) * 0.005, 0.08, 1.2);
      ctx = t.clientX; cty = t.clientY;
    }
  }, { passive: true });
  renderer.domElement.addEventListener('touchend', e => { for (const t of e.changedTouches) if (t.identifier === camTouchId) camTouchId = null; });
  const bind = (id, fn) => document.getElementById(id).addEventListener('touchstart', e => { e.preventDefault(); fn(); }, { passive: false });
  bind('tAttack', () => input.lightQueued = true);
  bind('tHeavy', () => input.heavyQueued = true);
  bind('tDodge', () => { player.tryDodge(); });
  bind('tLock', () => toggleLock());
}
setupTouch();

// ---------------------------------------------------------------------------
// プレイヤー
// ---------------------------------------------------------------------------
const player = {
  obj: new THREE.Group(),
  model: null,
  pos: new THREE.Vector3(),
  facing: 0,
  hp: 100, maxhp: 100, sp: 100, maxsp: 100, potions: 3,
  speed: 6.0,
  state: 'idle',     // idle | attack | dodge | hit
  atkT: 0, atkType: 'light', atkHit: false,
  dodgeT: 0, iframe: 0, hitT: 0,
  init() {
    scene.add(this.obj);
  },
  setModel(m) {
    if (this.model) this.obj.remove(this.model.root);
    this.model = m; this.obj.add(m.root);
  },
  reset() {
    this.maxhp = maxHP(); this.hp = this.maxhp; this.sp = this.maxsp = 100; this.potions = 3;
    this.pos.set(0, 0, 18); this.facing = Math.PI; this.state = 'idle';
    this.atkT = this.dodgeT = this.iframe = this.hitT = 0;
    this.obj.position.copy(this.pos);
  },
  tryDodge() {
    if (this.sp < 22 || this.state === 'dodge' || this.hitT > 0) return;
    this.sp -= 22; this.state = 'dodge'; this.dodgeT = 0.45; this.iframe = 0.32;
    // 入力方向 or 前方へローリング
    const mv = currentMoveDir();
    this.dodgeDir = (mv.len > 0.1) ? Math.atan2(mv.x, mv.z) : this.facing;
  },
  damage(dmg) {
    if (this.iframe > 0) { showToast('回避！'); return; }
    this.hp = Math.max(0, this.hp - dmg);
    this.hitT = 0.4; this.state = 'hit'; this.sp = Math.max(0, this.sp - 6);
    if (this.model) this.model.flash();
    spawnDamage(this.obj.position, dmg, 'player', 2.0);
    flashHurt();
    if (this.hp <= 0) onPlayerDown();
  },
  update(dt) {
    // タイマー
    this.iframe = Math.max(0, this.iframe - dt);
    this.hitT = Math.max(0, this.hitT - dt);
    let moving = false;

    if (this.state === 'dodge') {
      this.dodgeT -= dt;
      const v = 11 * Math.max(0, this.dodgeT / 0.45) + 2;
      this.pos.x += Math.sin(this.dodgeDir) * v * dt;
      this.pos.z += Math.cos(this.dodgeDir) * v * dt;
      this.facing = this.dodgeDir;
      // ローリング演出
      if (this.model) this.model.root.rotation.x = -Math.min(1, (0.45 - this.dodgeT) / 0.45) * TAU;
      if (this.dodgeT <= 0) { this.state = 'idle'; if (this.model) this.model.root.rotation.x = 0; }
    } else if (this.state === 'attack') {
      this.atkT -= dt;
      // 攻撃の振り（剣ピボット）
      const dur = this.atkType === 'heavy' ? 0.6 : 0.38;
      const k = 1 - Math.max(0, this.atkT / dur);
      if (this.model && this.model.swordPivot) {
        this.model.swordPivot.rotation.z = -Math.sin(k * Math.PI) * (this.atkType === 'heavy' ? 2.4 : 1.7);
        this.model.swordPivot.rotation.x = Math.sin(k * Math.PI) * 0.6;
      }
      // アクティブフレームで判定
      const activeFrom = this.atkType === 'heavy' ? 0.55 : 0.4, activeTo = this.atkType === 'heavy' ? 0.85 : 0.75;
      if (!this.atkHit && k >= activeFrom && k <= activeTo) this.resolveAttack();
      if (this.atkT <= 0) { this.state = 'idle'; if (this.model && this.model.swordPivot) { this.model.swordPivot.rotation.set(0, 0, 0); } }
    } else {
      // 通常移動
      const mv = currentMoveDir();
      moving = mv.len > 0.12;
      const sprint = (keys['ShiftLeft'] || keys['ShiftRight']) && this.sp > 0 && moving;
      if (sprint) { this.sp = Math.max(0, this.sp - 28 * dt); }
      const sp = (sprint ? this.speed * 1.7 : this.speed);
      if (moving) {
        this.pos.x += mv.x * sp * dt;
        this.pos.z += mv.z * sp * dt;
        const want = Math.atan2(mv.x, mv.z);
        this.facing += angDelta(this.facing, want) * Math.min(1, dt * 14);
      }
      // 入力された攻撃を発動
      if (input.lightQueued) this.startAttack('light');
      else if (input.heavyQueued) this.startAttack('heavy');
    }
    input.lightQueued = input.heavyQueued = false;

    // スタミナ回復
    if (this.state !== 'dodge' && !((keys['ShiftLeft'] || keys['ShiftRight']) && moving))
      this.sp = Math.min(this.maxsp, this.sp + 24 * dt);

    // フィールド境界
    const d = Math.hypot(this.pos.x, this.pos.z);
    if (d > CONFIG.FIELD_RADIUS) { const s = CONFIG.FIELD_RADIUS / d; this.pos.x *= s; this.pos.z *= s; }
    this.pos.y = terrainHeight(this.pos.x, this.pos.z); // 地形に接地

    this.obj.position.copy(this.pos);
    this.obj.rotation.y = this.facing;
    if (this.model) { this.model.update(dt, moving && this.state === 'idle'); this.model.setMoving(moving); }
  },
  startAttack(type) {
    if (this.sp < 8) { showToast('スタミナ切れ'); return; }
    this.state = 'attack'; this.atkType = type; this.atkHit = false;
    this.atkT = type === 'heavy' ? 0.6 : 0.38;
    this.sp = Math.max(0, this.sp - (type === 'heavy' ? 18 : 8));
    // ロックオン中は対象を向く
    if (lockOn && monster.alive) {
      const dx = monster.pos.x - this.pos.x, dz = monster.pos.z - this.pos.z;
      this.facing = Math.atan2(dx, dz);
    }
  },
  resolveAttack() {
    this.atkHit = true;
    if (!monster.alive) return;
    const reach = 3.4, ahead = 1.6;
    // プレイヤー前方の攻撃点
    const ax = this.pos.x + Math.sin(this.facing) * ahead;
    const az = this.pos.z + Math.cos(this.facing) * ahead;
    const dx = monster.pos.x - ax, dz = monster.pos.z - az;
    const dist = Math.hypot(dx, dz);
    if (dist < reach + monster.bodyR) {
      const base = wpnAttack() * (this.atkType === 'heavy' ? 1.9 : 1.0);
      const crit = Math.random() < 0.18;
      const dmg = Math.round(base * (crit ? 1.6 : 1) * rand(0.9, 1.1));
      monster.damage(dmg, crit, this.atkType);
    }
  },
};
player.init();

function currentMoveDir() {
  // 入力ベクトル（カメラ相対）→ ワールド
  let ix = 0, iz = 0;
  if (keys['KeyW']) iz -= 1; if (keys['KeyS']) iz += 1;
  if (keys['KeyA']) ix -= 1; if (keys['KeyD']) ix += 1;
  ix += moveVec.x; iz += moveVec.y;
  const len = Math.hypot(ix, iz);
  if (len < 0.001) return { x: 0, z: 0, len: 0 };
  ix /= len; iz /= len;
  // カメラ yaw に対して回転（カメラの向く水平方向 = (sin camYaw, cos camYaw) が前進 W）
  const cos = Math.cos(camYaw), sin = Math.sin(camYaw);
  const wx = ix * cos - iz * sin;
  const wz = -(ix * sin + iz * cos);
  return { x: wx, z: wz, len: Math.min(1, len) };
}

// ---------------------------------------------------------------------------
// モンスター（FSM AI）
// ---------------------------------------------------------------------------
const monster = {
  obj: new THREE.Group(),
  model: null, spec: null,
  pos: new THREE.Vector3(),
  facing: 0,
  hp: 1, maxhp: 1, alive: false,
  bodyR: 2.4,
  ai: 'wander',     // wander | chase | windup | strike | recover | stagger
  aiT: 0, wanderTarget: new THREE.Vector3(),
  enraged: false,
  tailHP: 1, tailMax: 1, tailBroken: false,
  init() { scene.add(this.obj); },
  setModel(m) { if (this.model) this.obj.remove(this.model.root); this.model = m; this.obj.add(m.root); },
  spawn(spec) {
    this.spec = spec;
    this.maxhp = spec.hp; this.hp = spec.hp; this.alive = true;
    this.bodyR = (this.model ? Math.max(2, this.model.bbHeight * 0.7) : 2.4);
    this.pos.set(rand(-20, 20), 0, -28); this.facing = 0;
    this.ai = 'wander'; this.aiT = 1; this.enraged = false;
    this.tailMax = Math.round(spec.hp * 0.22); this.tailHP = this.tailMax; this.tailBroken = false;
    this.pickWander();
    this.obj.position.copy(this.pos);
  },
  pickWander() { const a = rand(0, TAU), r = rand(10, CONFIG.FIELD_RADIUS - 12); this.wanderTarget.set(Math.cos(a) * r, 0, Math.sin(a) * r); },
  damage(dmg, crit, atkType) {
    if (!this.alive) return;
    this.hp = Math.max(0, this.hp - dmg);
    if (this.model) this.model.flash();
    spawnDamage(this.headWorld(), dmg, crit ? 'crit' : 'monster', this.model ? this.model.bbHeight : 3);
    // 尻尾破壊判定（強斬りで蓄積）
    if (!this.tailBroken) {
      this.tailHP -= dmg * (atkType === 'heavy' ? 1.3 : 0.7);
      if (this.tailHP <= 0) this.breakTail();
    }
    // 怒り
    if (!this.enraged && this.hp < this.maxhp * 0.5) { this.enraged = true; if (this.model && this.model.setEnrage) this.model.setEnrage(true); showToast(`${this.spec.name.ja} は怒り狂った！`); }
    // 被弾でたまにひるみ
    if (this.ai !== 'strike' && Math.random() < (crit ? 0.5 : 0.12)) { this.ai = 'stagger'; this.aiT = 0.6; }
    // アグロ
    if (this.ai === 'wander') { this.ai = 'chase'; this.aiT = 0; }
    updateMonsterHUD();
    if (this.hp <= 0) this.die();
  },
  breakTail() {
    this.tailBroken = true;
    if (this.model && this.model.tail) this.model.tail.visible = false;
    showToast('🦴 尻尾を破壊した！追加素材を獲得');
    huntRewardBonus.push(this.spec.drops[this.spec.drops.length - 1]);
  },
  die() {
    this.alive = false;
    showToast(`${this.spec.name.ja} を討伐した！`);
    setTimeout(() => onMonsterSlain(), 1200);
  },
  headWorld() { const v = this.pos.clone(); v.y += (this.model ? this.model.bbHeight * 0.7 : 2.4); return v; },
  update(dt) {
    if (!this.alive) {
      // 死亡演出：ゆっくり傾いて沈む
      this.obj.rotation.z = Math.min(Math.PI / 2.2, this.obj.rotation.z + dt * 1.2);
      this.obj.position.y = Math.max(-1.2, this.obj.position.y - dt * 0.6);
      if (this.model) this.model.update(dt, false);
      return;
    }
    const toP = new THREE.Vector3(player.pos.x - this.pos.x, 0, player.pos.z - this.pos.z);
    const distP = toP.length();
    const spd = this.spec.speed * (this.enraged ? 1.3 : 1);
    let moving = false;
    this.aiT -= dt;

    switch (this.ai) {
      case 'wander': {
        const toT = new THREE.Vector3().subVectors(this.wanderTarget, this.pos); toT.y = 0;
        if (toT.length() < 3 || this.aiT <= 0) { this.pickWander(); this.aiT = rand(3, 6); }
        else { toT.normalize(); this.pos.addScaledVector(toT, spd * 0.5 * dt); this.faceTo(toT, dt); moving = true; }
        if (distP < this.spec.aggro) { this.ai = 'chase'; this.aiT = 0; showToast(`${this.spec.name.ja} がこちらに気づいた`); }
        break;
      }
      case 'chase': {
        if (distP > this.spec.aggro * 1.8) { this.ai = 'wander'; this.pickWander(); break; }
        toP.normalize(); this.faceTo(toP, dt);
        const atkRange = this.bodyR + 3.2;
        if (distP > atkRange) { this.pos.addScaledVector(toP, spd * dt); moving = true; }
        else if (this.aiT <= 0) { this.ai = 'windup'; this.aiT = this.enraged ? 0.5 : 0.7; this.atkChoice = Math.random() < 0.5 ? 'lunge' : 'swipe'; }
        break;
      }
      case 'windup': {
        this.faceTo(toP.clone().normalize(), dt * 0.5);
        // 予備動作：少し沈み込む
        if (this.model) this.model.root.position.y = -Math.sin((1 - this.aiT / 0.7) * Math.PI) * 0.3;
        if (this.aiT <= 0) {
          this.ai = 'strike'; this.aiT = this.atkChoice === 'lunge' ? 0.4 : 0.5; this.struckThisAtk = false;
          this.strikeDir = Math.atan2(toP.x, toP.z);
        }
        break;
      }
      case 'strike': {
        if (this.model) this.model.root.position.y = 0;
        if (this.atkChoice === 'lunge') {
          this.pos.x += Math.sin(this.strikeDir) * spd * 2.4 * dt;
          this.pos.z += Math.cos(this.strikeDir) * spd * 2.4 * dt;
        }
        // 命中判定（前方扇 / 突進）
        if (!this.struckThisAtk) {
          const hitR = this.atkChoice === 'lunge' ? this.bodyR + 2.0 : this.bodyR + 3.4;
          if (distP < hitR) {
            // swipe は前方のみ
            let hit = true;
            if (this.atkChoice === 'swipe') { const ang = Math.abs(angDelta(this.facing, Math.atan2(toP.x, toP.z))); hit = ang < 1.1; }
            if (hit) { this.struckThisAtk = true; player.damage(Math.round(this.spec.attack * (this.enraged ? 1.25 : 1) * rand(0.9, 1.1))); }
          }
        }
        if (this.aiT <= 0) { this.ai = 'recover'; this.aiT = this.enraged ? 0.4 : 0.8; }
        moving = this.atkChoice === 'lunge';
        break;
      }
      case 'recover': { if (this.aiT <= 0) this.ai = 'chase'; break; }
      case 'stagger': {
        if (this.model) this.model.root.rotation.z = Math.sin(this.aiT * 20) * 0.05;
        if (this.aiT <= 0) { if (this.model) this.model.root.rotation.z = 0; this.ai = 'chase'; }
        break;
      }
    }

    // 境界
    const d = Math.hypot(this.pos.x, this.pos.z);
    if (d > CONFIG.FIELD_RADIUS) { const s = CONFIG.FIELD_RADIUS / d; this.pos.x *= s; this.pos.z *= s; }
    this.pos.y = terrainHeight(this.pos.x, this.pos.z); // 地形に接地
    this.obj.position.copy(this.pos);
    this.obj.rotation.y = this.facing;
    if (this.model) this.model.update(dt, moving);
    updateMonsterHUD();
  },
  faceTo(dir, dt) { const want = Math.atan2(dir.x, dir.z); this.facing += angDelta(this.facing, want) * Math.min(1, dt * 3.5); },
};
monster.init();

// ---------------------------------------------------------------------------
// ロックオン
// ---------------------------------------------------------------------------
let lockOn = false;
function toggleLock() { lockOn = !lockOn; document.getElementById('lockReticle').style.display = (lockOn && monster.alive) ? 'block' : 'none'; showToast(lockOn ? '注視ロック ON' : '注視ロック OFF'); }

// ---------------------------------------------------------------------------
// 採取・回復
// ---------------------------------------------------------------------------
let huntRewardBonus = [];
function tryGather() {
  for (const n of gatherNodes) {
    if (n.userData.used) continue;
    if (n.position.distanceTo(player.pos) < 3) {
      n.userData.used = true; n.visible = false;
      const got = Math.random() < 0.5 ? '薬草' : '獣の毛皮';
      gatheredThisHunt[got] = (gatheredThisHunt[got] || 0) + 1;
      if (got === '薬草' && player.potions < 9) { player.potions++; updateHUD(); showToast('🌿 薬草を採取（回復薬+1）'); }
      else showToast(`🌿 ${got} を採取`);
      return;
    }
  }
  showToast('近くに採取できる物がない');
}
let gatheredThisHunt = {};
function usePotion() {
  if (player.potions <= 0) { showToast('回復薬がない'); return; }
  if (player.hp >= player.maxhp) { showToast('体力は満タンだ'); return; }
  player.potions--; player.hp = Math.min(player.maxhp, player.hp + 45);
  showToast('🧪 体力を回復した'); updateHUD();
}

// ---------------------------------------------------------------------------
// ダメージ表示 / 画面効果
// ---------------------------------------------------------------------------
const fx = document.getElementById('fx');
const _proj = new THREE.Vector3();
function spawnDamage(worldPos, amount, cls, yoff = 2) {
  _proj.copy(worldPos); _proj.y += yoff * 0;
  _proj.project(camera);
  if (_proj.z > 1) return;
  const x = (_proj.x * 0.5 + 0.5) * innerWidth;
  const y = (-_proj.y * 0.5 + 0.5) * innerHeight;
  const el = document.createElement('div');
  el.className = 'dmg ' + cls;
  el.textContent = (cls === 'crit' ? '◆' : '') + amount;
  el.style.left = (x + rand(-15, 15)) + 'px'; el.style.top = y + 'px';
  fx.appendChild(el);
  setTimeout(() => el.remove(), 900);
}
function flashHurt() {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;background:rgba(180,40,30,0.32);z-index:23;pointer-events:none;transition:opacity .35s;';
  fx.appendChild(d); requestAnimationFrame(() => d.style.opacity = '0'); setTimeout(() => d.remove(), 360);
}
let toastT = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1800);
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------
function updateHUD() {
  document.getElementById('hpFill').style.width = clamp(player.hp / player.maxhp * 100, 0, 100) + '%';
  document.getElementById('spFill').style.width = clamp(player.sp / player.maxsp * 100, 0, 100) + '%';
  document.getElementById('potions').textContent = `🧪 回復薬 ×${player.potions}`;
}
function updateMonsterHUD() {
  const f = document.getElementById('monFill');
  f.style.width = clamp(monster.hp / monster.maxhp * 100, 0, 100) + '%';
  const st = { wander: '徘徊', chase: '追跡', windup: '⚠ 攻撃の予備動作', strike: '攻撃中', recover: '隙', stagger: 'ひるみ' }[monster.ai] || '';
  document.getElementById('monState').textContent = (monster.enraged ? '🔥怒り ' : '') + st;
}

// ---------------------------------------------------------------------------
// ゲーム状態管理
// ---------------------------------------------------------------------------
const state = { mode: 'title', activeMonster: null, questT: 0 };
const screens = {
  title: document.getElementById('screen-title'),
  quest: document.getElementById('screen-quest'),
  craft: document.getElementById('screen-craft'),
  reward: document.getElementById('screen-reward'),
  fail: document.getElementById('screen-fail'),
};
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  if (screens[name]) screens[name].classList.remove('hidden');
  document.getElementById('hud').classList.toggle('hidden', name !== 'hunt');
  touchEl.classList.toggle('on', isTouch && name === 'hunt');
}

// --- クエスト掲示板 ---
function openQuestBoard() {
  state.mode = 'board'; showScreen('quest');
  renderMaterials('questMats');
  const grid = document.getElementById('questGrid'); grid.innerHTML = '';
  const maxCleared = save.data.cleared.length;
  MONSTER_TIERS.forEach((mon, i) => {
    const locked = i > 0 && !save.data.cleared.includes(MONSTER_TIERS[i - 1].id);
    const card = document.createElement('div');
    card.className = 'quest-card' + (locked ? ' locked' : '');
    const done = save.data.cleared.includes(mon.id);
    card.innerHTML = `
      <div class="quest-emoji">${mon.emoji}</div>
      <div class="quest-meta">
        <div class="quest-name">${mon.name.ja} <span class="rank-badge">${mon.rank}</span> ${done ? '✅' : ''}</div>
        <div class="quest-desc">${mon.desc.ja}</div>
        <div class="quest-stats">体力 ${mon.hp} ／ 報酬: ${mon.drops.map(d => d[0]).join('・')}</div>
      </div>`;
    if (!locked) card.onclick = () => startHunt(mon);
    grid.appendChild(card);
  });
}
function renderMaterials(elId) {
  const el = document.getElementById(elId); el.innerHTML = '';
  const mats = save.data.materials;
  const keys = Object.keys(mats).filter(k => mats[k] > 0);
  if (!keys.length) { el.innerHTML = '<span class="mat-chip">素材なし — 狩りで集めよう</span>'; return; }
  keys.forEach(k => { const c = document.createElement('span'); c.className = 'mat-chip'; c.innerHTML = `${k} <b>×${mats[k]}</b>`; el.appendChild(c); });
}

// --- クラフト ---
const CRAFTS = [
  { key: 'wpn', name: () => `武器強化 Lv${save.data.wpnLv} → Lv${save.data.wpnLv + 1}`,
    detail: () => `攻撃力 ${wpnAttack()} → ${wpnAttack() + 10}`,
    cost: () => [['鋭い牙', 2 + save.data.wpnLv], ['竜鱗', save.data.wpnLv]],
    apply: () => { save.data.wpnLv++; } },
  { key: 'armor', name: () => `防具強化 Lv${save.data.armorLv} → Lv${save.data.armorLv + 1}`,
    detail: () => `体力 ${maxHP()} → ${maxHP() + 25}`,
    cost: () => [['獣の毛皮', 3 + save.data.armorLv], ['竜の延髄', save.data.armorLv]],
    apply: () => { save.data.armorLv++; } },
];
function openCraft() {
  state.mode = 'craft'; showScreen('craft');
  renderMaterials('craftMats');
  const list = document.getElementById('craftList'); list.innerHTML = '';
  CRAFTS.forEach(c => {
    const cost = c.cost().filter(([, n]) => n > 0);
    const can = cost.every(([m, n]) => save.hasMat(m, n));
    const row = document.createElement('div'); row.className = 'craft-row';
    row.innerHTML = `<div class="craft-info">
        <div class="craft-name">${c.name()}</div>
        <div class="craft-detail">${c.detail()}</div>
        <div class="craft-cost">必要: ${cost.length ? cost.map(([m, n]) => `${m}×${n}`).join('・') : 'なし'}</div>
      </div>`;
    const btn = document.createElement('button'); btn.className = 'btn' + (can ? '' : ' secondary');
    btn.textContent = can ? '強化' : '素材不足'; btn.disabled = !can;
    btn.onclick = () => { cost.forEach(([m, n]) => save.useMat(m, n)); c.apply(); save.flush(); showToast('⚒ 強化に成功した！'); openCraft(); };
    row.appendChild(btn); list.appendChild(row);
  });
}

// --- 狩り開始 ---
async function startHunt(mon) {
  state.activeMonster = mon; state.mode = 'loading';
  showScreen(''); // 全部隠す
  document.getElementById('loadHint').textContent = `${mon.name.ja} の生息域へ向かっている…`;
  // モンスターモデル用意（json に登録があれば glb、なければ仮）
  await ensureMonsterModel(mon);
  buildField();
  player.reset();
  monster.spawn(mon);
  huntRewardBonus = []; gatheredThisHunt = {};
  state.questT = CONFIG.QUEST_SECONDS;
  lockOn = false; document.getElementById('lockReticle').style.display = 'none';
  document.getElementById('monName').textContent = `${mon.emoji} ${mon.name.ja}`;
  document.getElementById('loadHint').textContent = '';
  updateHUD(); updateMonsterHUD();
  state.mode = 'hunt'; showScreen('hunt');
}

// --- 討伐成功 ---
function onMonsterSlain() {
  if (state.mode !== 'hunt') return;
  state.mode = 'reward';
  const mon = state.activeMonster;
  if (!save.data.cleared.includes(mon.id)) save.data.cleared.push(mon.id);
  // 報酬
  const gained = {};
  mon.drops.forEach(([name, n]) => { const got = n + (Math.random() < 0.4 ? 1 : 0); gained[name] = (gained[name] || 0) + got; });
  huntRewardBonus.forEach(([name, n]) => { gained[name] = (gained[name] || 0) + n; });
  Object.entries(gatheredThisHunt).forEach(([k, v]) => { if (k !== '薬草') gained[k] = (gained[k] || 0) + v; });
  Object.entries(gained).forEach(([k, v]) => save.addMat(k, v));
  save.flush();
  document.getElementById('rewardTitle').textContent = `🎉 ${mon.name.ja} 狩猟成功！`;
  document.getElementById('rewardSub').textContent = `${mon.rank} クエスト達成`;
  const rl = document.getElementById('rewardList'); rl.innerHTML = '';
  Object.entries(gained).forEach(([k, v]) => { const c = document.createElement('span'); c.className = 'mat-chip'; c.innerHTML = `${k} <b>+${v}</b>`; rl.appendChild(c); });
  showScreen('reward');
}
function onPlayerDown() {
  if (state.mode !== 'hunt') return;
  state.mode = 'fail';
  document.getElementById('failSub').textContent = `${state.activeMonster.name.ja} に敗北した。装備を鍛えて再挑戦しよう。`;
  setTimeout(() => showScreen('fail'), 900);
}

// ---------------------------------------------------------------------------
// モデル準備（hunter は最初に1回、monster は狩りごと）
// ---------------------------------------------------------------------------
async function ensureHunterModel() {
  const entry = findCharEntry('hunter');
  if (entry) {
    const url = await resolveGlbUrl(entry);
    if (url) { const g = await loadGltf(url); if (g) { player.setModel(buildGlbModel(g, CONFIG.HUNTER_NORM_HEIGHT, (entry.yaw || 0))); return; } }
  }
  player.setModel(buildProcHunter());
}
const _monModelCache = {};
async function ensureMonsterModel(mon) {
  const entry = findCharEntry('monster', mon.id) || findCharEntry('monster', mon.tier);
  if (entry) {
    const url = await resolveGlbUrl(entry);
    if (url) { const g = await loadGltf(url); if (g) { monster.setModel(buildGlbModel(g, CONFIG.MONSTER_BASE_HEIGHT + mon.tier * 0.5, (entry.yaw || 0))); return; } }
  }
  monster.setModel(buildProcMonster(mon));
}

// ---------------------------------------------------------------------------
// カメラ追従
// ---------------------------------------------------------------------------
const _camTarget = new THREE.Vector3();
function updateCamera(dt) {
  // ロックオン中はプレイヤー→モンスターの向きにカメラを寄せる
  if (lockOn && monster.alive) {
    const want = Math.atan2(player.pos.x - monster.pos.x, player.pos.z - monster.pos.z);
    camYaw += angDelta(camYaw, want) * Math.min(1, dt * 3);
  }
  const focusY = 1.4;
  _camTarget.set(player.pos.x, player.pos.y + focusY, player.pos.z);
  const cx = Math.sin(camYaw) * Math.cos(camPitch) * camDist;
  const cy = Math.sin(camPitch) * camDist;
  const cz = Math.cos(camYaw) * Math.cos(camPitch) * camDist;
  camera.position.lerp(new THREE.Vector3(_camTarget.x - cx, _camTarget.y + cy, _camTarget.z - cz), Math.min(1, dt * 9));
  camera.lookAt(_camTarget);
  // ロックレティクル位置
  if (lockOn && monster.alive) {
    const h = monster.headWorld(); h.project(camera);
    const r = document.getElementById('lockReticle');
    if (h.z < 1) { r.style.display = 'block'; r.style.left = (h.x * .5 + .5) * innerWidth + 'px'; r.style.top = (-h.y * .5 + .5) * innerHeight + 'px'; }
    else r.style.display = 'none';
  }
  // 太陽をプレイヤー追従（影範囲確保）
  sun.position.set(player.pos.x + 40, 70, player.pos.z + 30);
  sun.target.position.copy(player.pos);
}

// ---------------------------------------------------------------------------
// メインループ
// ---------------------------------------------------------------------------
// ポストプロセッシング（ブルームで光を柔らかく）
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.42, 0.5, 0.82);
composer.addPass(bloom);
composer.addPass(new OutputPass());

const clock = new THREE.Clock();
let elapsed = 0;
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;
  windUniform.value = elapsed; // 草の風
  if (state.mode === 'hunt') {
    player.update(dt);
    monster.update(dt);
    // クエストタイマー
    state.questT -= dt;
    const m = Math.max(0, Math.floor(state.questT / 60)), s = Math.max(0, Math.floor(state.questT % 60));
    document.getElementById('questTimer').textContent = `${m}:${String(s).padStart(2, '0')}`;
    if (state.questT <= 0) onPlayerDown();
    updateHUD();
  } else if (!monster.alive && (state.mode === 'reward')) {
    monster.update(dt); // 死亡演出継続
  }
  updateCamera(dt);
  // 採取ノードを回す
  for (const n of gatherNodes) if (!n.userData.used) n.rotation.y += dt;
  composer.render();
}

// ---------------------------------------------------------------------------
// ボタン結線・起動
// ---------------------------------------------------------------------------
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});
document.getElementById('btnStart').onclick = () => openQuestBoard();
document.getElementById('btnCraft').onclick = () => openCraft();
document.getElementById('btnCraftBack').onclick = () => openQuestBoard();
document.getElementById('btnRewardNext').onclick = () => openQuestBoard();
document.getElementById('btnFailBack').onclick = () => openQuestBoard();

(async function boot() {
  document.getElementById('loadHint').textContent = '3Dキャラクター情報を読み込み中…';
  buildEnvironment();       // 空グラデーションから IBL 環境マップ生成
  CHAR_DATA = await loadCharacterData();
  await ensureHunterModel();
  document.getElementById('loadHint').textContent = '';
  buildField();             // タイトル背景としてフィールドを表示
  // タイトルではプレイヤーを中央付近に立たせる（地形に接地）
  player.reset(); player.pos.set(0, terrainHeight(0, 0), 0); player.obj.position.copy(player.pos);
  camYaw = 0; camPitch = 0.42; camDist = 9;
  showScreen('title');
  loop();
})();
