// ============================================================
// ROBO BATTLE 3D - Prototype (V7.1)
// War Robots 風 TPS メカ 4 機バトルロイヤル / Three.js (ESM)
//
// V7.1 変更点(WR 準拠のハードポイント制 + 武器 12 種):
//  1. ハードポイント制: スロットにサイズ(light/medium/heavy)。同サイズの武器のみ
//     搭載可。SCOUT [軽,軽] / VANGUARD [中,軽,軽] / BASTION [重,重,軽,軽] /
//     RAIDER [中,中,軽]。発射はスロット順に Space/Z/X/C。武器パネルは動的生成(2〜4)
//  2. 新武器 6 種: NEEDLE(軽・長射程精密)/ SWARM(軽・微誘導 6 連)/
//     ARC BLASTER(中・電撃連鎖)/ REPULSOR(中・ノックバック)/
//     ARTILLERY RAIN(重・着弾予報つき長距離爆撃)/ TEMPEST(重・チャージ 1.8s →
//     3 秒持続稲妻ビーム・全熱量消費)。AI もクラス別ロードアウト(aiWeapons)で使用
//  3. セーブ v3(v6_save_v3): loadouts がスロット数可変。v2/v1 から自動マイグレーション
//     (旧装備はサイズの合うスロットへ引き継ぎ、入らない武器は在庫へ)
//  4. ハンガー: スロットカードを動的生成 + サイズタグ(軽/中/重)。
//     武器リストはスロットサイズで絞り込み(モバイルはタッチスクロール対応)
//
// V7.0 変更点(「正面から撃ち合うだけ」の単調さを壊す):
//  1. ランダム出現: CONFIG.SPAWN_POINTS の 12 候補から毎試合 4 機へランダム割当
//     (相互距離 ≥ 60 / 初期 LOS 回避を 50 回試行でベスト採用)。開幕 2 秒は AI 射撃停止
//  2. 撃破時 HP 回復(残量 2 倍ルール): 撃破した機体は HP=min(maxHp,HP×2)。
//     緑グロー + 上昇パーティクル +「+n REPAIRED」+ 回復 SFX。瀕死撃破ほど大逆転
//  3. 敵インジケーター: (a) 画面外の敵への小型方向矢印(端) + 極小 HP バー /
//     (b) ロック対象の装備武器アイコン×2 + HP 数値(ターゲットボックス下)
//  4. 回避が成立する戦闘へ転換: PULSE/SPREAD を実体弾(エネルギーボルト・プール制)化
//     して飛行中命中判定。MG はヒットスキャン据置。RAILGUN はチャージ式テレグラフ。
//     AI はボルト系で移動予測リード射撃(誤差 0.7〜1.1)。機体速度・加速度を引き上げ
//
// V6.9.1 ホットフィックス(glb 機体に武器が装着されない):
// V6.9.1 ホットフィックス(glb 機体に武器が装着されない):
//  - 原因: glb の Armature に scale=0.01(FBX 由来 cm リグ)。ボーンの子に
//    add した武器が 1/100 サイズ(約 1cm)で描画され不可視だった
//  - 修正: ボーンフォロワー方式。武器は root 直下の等倍 weaponRig に置き、
//    毎フレーム syncWeapons() でボーンのワールド座標へ追従 + 照準方向を向く。
//    マズルも武器銃口の先端を参照するため発射位置も正確になる
//
// V6.9 変更点(装備反映バグ修正 + 武器在庫制 + 装備 UX 明確化):
//  - バグ修正: ドック更新の世代トークンを全呼び出しで取得し、装備は常に
//    SAVE.loadouts から再マウント(単方向データフロー)。glb parse 中の
//    操作で装備変更が見た目に反映されない競合を解消
//  - 武器在庫制(WR 準拠): セーブ v2(v6_save_v2、v1 から自動移行)。
//    inventory: {武器: 所持数}。装備合計 ≤ 在庫を常に保証。
//    在庫切れの武器を装備すると他機体から自動で取り外して移動(トースト通知)
//  - 取り外し(UNEQUIP)・空きスロット対応: 空きは戦闘で発射不可(グレー)。
//    両スロット空での LAUNCH は禁止。同一武器の追加購入(+BUY)可
//  - 装備 UX: 武器リストに「SLOT n に装備する武器を選択」ヘッダー +
//    状態別ボタン(EQUIP / MOVE HERE / UNEQUIP / 🔒BUY)+ 所持/装備中表示。
//    装備変更はドック 3D に即反映 + 機体 0.3s 白フラッシュ
//
// V6.8 変更点(ハンガーの WR 風ビジュアル化。戦闘側は不変):
//  - 3D ドックプレビュー: 専用 Scene(暗背景/グリッド床/発光リング)に
//    選択クラスの機体を装備込みで表示。ターンテーブル回転 + 待機微動。
//    Game の renderer/composer を流用し、ハンガー中は RenderPass の
//    scene/camera を差し替えてブルーム込みで描画(戦闘 update は停止)
//  - 武器サムネ自動生成: 起動時に各武器モデルをオフスクリーン撮影 →
//    toDataURL をキャッシュして <img> に使用(失敗時は絵文字)
//  - レイアウト再構成: 左=機体ステータス / 中央=3D / 右=スロットカード /
//    上=WALLET / 右下=LAUNCH ⚔。購入は confirm 廃止 → カード 2 度押し
//  - Game は起動時に生成(初回からドックを同一レンダラで描画。出撃は常に redeploy)
//
// V6.7 変更点(装備の見える化 + ポイント経済 + ゲームループ完成):
//  - ターゲティング改善(WR準拠): ロック射程 110 / 維持 FOV 80° / 猶予 1.5s
//    ターゲットボックスに機体名+HP+距離を統合 / Tab・ボタンで手動切替 /
//    発見済みマーカー 3 秒記憶(spotted)
//  - ハードポイント: 武器をプリミティブモデルとして機体に装着(arm/shoulder)
//    マズルは武器銃口の先端。AI のロードアウトも見た目で分かる
//  - 2 スロット制(Space/Z)+ 新武器 SPREAD SHOT / RAILGUN(ショップ専売)
//  - ポイント経済: 撃破/与ダメ/生存/勝利で獲得 → localStorage(v6_save_v1)
//  - ハンガー循環: リザルト → RETURN TO HANGAR(装備変更/購入)or REMATCH
//  - ポイントクレート 6 個(リスク地点・接触取得・レーダーに金点)
//
// V6.6 変更点(バトルロイヤル化 + ハンガー + アビリティ + 破壊可能遮蔽):
//  - FFA: 4 機(プレイヤー + AI3)が相互に敵対。AI 同士も撃ち合う
//    (距離 + LOS + ヘイトでターゲット選択 / 過集中回避で自然に分散)
//  - ハンガー: LIGHT/MEDIUM/HEAVY から出撃機体を選択(MECH_CLASSES)
//    モデルレジストリ: glb が無いクラスはプリミティブ機体に自動フォールバック
//  - アビリティ(B): スプリント / エネルギーシールド(前面バリア・CD 制)
//  - ドラム缶(誘爆連鎖)+ コンテナ/バリケードの破壊(遮蔽の恒久破壊)
//
// V6.5 変更点(攻撃演出の強化 + 横移動姿勢の修正):
//  - UnrealBloomPass 導入(構築失敗時は素の renderer.render にフォールバック)
//  - エフェクト強化: 2層ビーム(白コア+色グロー)/ 衝撃波リング(RingPool)/
//    多段爆発(火球→衝撃波→煙柱+破片)/ 3段 KO 爆発 / 距離減衰カメラシェイク
//  - 横移動姿勢: 下半身 yaw は照準から ±LEG_TWIST_CLAMP までしか回さない
//    (横移動=斜め足踏み)。背面方向は後ずさり(歩行アニメ逆再生)。
//    旋回時のみ僅かにバンク(TURN_BANK_*)。TORSO_BONE_CLAMP ±0.8 に縮小
//
// V6.4: レーダー / 武器4種 / プロシージャル SFX+BGM / HUD 仕上げ
// V6.3: Meshy 製 glb 機体(歩行アニメ・フォールバック付き)
// V6.2: 格子状ブロック都市 / クレーター+運河+橋 / 重量感機動 / LOS マーカー
// ============================================================
import * as THREE from 'three';
import { GLTFLoader } from './lib/loaders/GLTFLoader.js';
import { EffectComposer } from './lib/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './lib/postprocessing/UnrealBloomPass.js';
import { OutputPass } from './lib/postprocessing/OutputPass.js';

// ============================================================
// CONFIG: 調整用パラメータ(マジックナンバー集約)
// ============================================================
const CONFIG = {
  // アリーナ(WR 風: 広いマップで接敵まで間がある)
  ARENA_SIZE: 340,        // 地面の一辺
  MOVE_LIMIT: 160,        // 移動可能範囲(±)
  BUILDING_MAX: 60,       // ビル棟数の上限(街区充填で 45〜60 棟)
  BLOCK_SPLIT_CHANCE: 0.35, // 縦長街区を 2 棟に分割する確率(間に小路地)
  STREET_PROPS: 16,       // 街路上の部分遮蔽(コンテナ/バリケード/瓦礫)数

  // メカ(重量感のある低速。加速度モデルで踏み出しに溜め)
  // ※ 速度/HP は V6.6 から MECH_CLASSES(機体クラス)側で定義
  MECH_RADIUS: 1.3,       // 基準衝突半径(クラス scale で伸縮)
  BACK_SPEED_MUL: 0.7,    // 後退(照準と逆方向への移動)の速度倍率
  MECH_ACCEL: 7,          // 加速度 u/s²(V7.0: 4.5→7 で機敏に。横移動回避が成立する)
  TURN_RATE: 10,          // 下半身旋回速度
  TORSO_TURN_RATE: 6,     // 上半身旋回速度
  IDLE_ALIGN_RATE: 2.2,   // 停止時に下半身が照準方向へ整列する速度
  TURN_INERTIA: 7,        // 旋回の慣性(camYaw が目標値を追う速度)
  GRAVITY: -26,
  JUMP_VELOCITY: 9,       // 重量感: 低めのジャンプ
  JUMP_COOLDOWN: 3,       // ジャンプのクールダウン(s。V7.0: 4→3 で回避起動を増やす)
  LAND_SHAKE: 0.25,       // 着地時の画面シェイク量

  // 姿勢(V6.5: 横移動の捻れ修正 + 旋回バンク)
  LEG_TWIST_CLAMP: 0,     // 下半身が照準方向から回れる最大角。0 = 機体全体が常に視点方向を向き、横移動は純粋なサイドステップ(WR 準拠・直感優先)
  BACKPEDAL_ANGLE: 2.36,  // 移動方向がこれ以上背面(±135°超)なら前向きのまま後ずさり
  TURN_BANK_MAX: 0.06,    // 旋回バンクの最大ロール(rad)
  TURN_BANK_GAIN: 0.04,   // 照準角速度 → バンク量の係数
  BANK_SMOOTH: 6,         // バンクの追従速度

  // glb 機体モデル(V6.3)
  MECH_SCALE: 0.9,         // glb 高さ 4.0 → 3.6(胸高 ~2.6 = CHEST_OFFSET と整合)
  WALK_CYCLE_SPEED: 3.1,   // スケール1の歩行1サイクル移動量(timeScale 同期の基準)
  IDLE_ANIM_SPEED: 0.12,   // 待機時の微動 timeScale(機体が生きている感)
  TORSO_BONE_CLAMP: 0.8,   // Spine ボーンへ分配する上半身旋回のクランプ(rad。V6.5: 捻れ過ぎ防止で縮小)
  ANIM_BLEND_RATE: 8,      // timeScale の追従速度(空中で脚を止める等)
  // (V6.7: マズルは装着武器モデルの銃口先端に統合 — MUZZLE_FORWARD は廃止)

  // ============================================================
  // 機体クラス(V6.6 ハンガー)。player 選択可: LIGHT/MEDIUM/HEAVY。
  // ASSAULT は AI 専用。model はモデルレジストリのキー
  // (assets/models/{model}_walking_glb_url.glb が無ければプリミティブに自動フォールバック)
  // ============================================================
  // V7.1: ハードポイント制(WR 準拠)
  //   hardpoints: スロットサイズ配列(light/medium/heavy)。同サイズの武器のみ搭載可
  //   weapons:    プレイヤー既定ロードアウト(サイズ整合必須・初期在庫で成立すること)
  //   aiWeapons:  AI 出撃時のロードアウト(クラスごとの個性。在庫制約なし)
  MECH_CLASSES: {
    LIGHT: {
      name: 'SCOUT', speed: 6.2, hp: 140, // V7.0: 4.6→6.2(回避運動の成立)
      hardpoints: ['light', 'light'],
      weapons: ['mg', 'pulse'],
      aiWeapons: ['needle', 'swarm'], // 遠距離チクチク + マイクロロケット(逃げ撃ち型)
      ability: 'sprint',
      model: 'mech_scout', scale: 0.85,
      colors: { primary: 0x3fa18c, secondary: 0x9fd8cc, dark: 0x1f3330 },
      desc: '高速・軽装甲の偵察機',
    },
    MEDIUM: {
      name: 'VANGUARD', speed: 4.8, hp: 200, // V7.0: 3.5→4.8
      hardpoints: ['medium', 'light', 'light'],
      weapons: ['missile', 'pulse', 'mg'],
      aiWeapons: ['arc', 'pulse', 'mg'],   // 電撃連鎖 + 中近距離の堅実な圧力
      ability: 'shield',
      model: 'mech_player', scale: 1.0,
      colors: { primary: 0x3a6ea8, secondary: 0x8fb4d4, dark: 0x232b36 },
      desc: 'バランス型の主力機',
    },
    HEAVY: {
      name: 'BASTION', speed: 3.6, hp: 290, // V7.0: 2.7→3.6
      hardpoints: ['heavy', 'heavy', 'light', 'light'],
      weapons: ['bazooka', 'bazooka', 'pulse', 'mg'],
      aiWeapons: ['artillery', 'tempest', 'pulse', 'mg'], // 砲撃の脅威(両方とも予兆あり=回避可能)
      ability: 'shield',
      model: 'mech_heavy', scale: 1.15,
      colors: { primary: 0x7a6f3f, secondary: 0xb8ad7a, dark: 0x2e2a1a },
      desc: '重装甲の砲撃機',
    },
    ASSAULT: { // AI 専用
      name: 'RAIDER', speed: 5.0, hp: 180, // V7.0: 3.6→5.0
      hardpoints: ['medium', 'medium', 'light'],
      weapons: ['spread', 'repulsor', 'mg'],
      aiWeapons: ['spread', 'repulsor', 'mg'], // 接近してノックバックで崩す強襲型
      ability: 'sprint',
      model: 'mech_enemy', scale: 1.0,
      colors: { primary: 0xa83a3a, secondary: 0xd49a8f, dark: 0x362323 },
      desc: '突撃型の強襲機',
    },
  },

  // アビリティ(B キー / 専用ボタン)
  SPRINT_DURATION: 3,     // スプリント持続(s)
  SPRINT_MUL: 1.8,        // 速度倍率
  SPRINT_CD: 10,
  SPRINT_FOV_ADD: 6,      // スプリント中の FOV 拡張(プレイヤーのみ)
  SHIELD_DURATION: 4,     // シールド持続(s)
  SHIELD_CD: 14,
  SHIELD_RADIUS: 2.4,     // 前面バリアの半径(幅 ~4 相当の円弧)
  SHIELD_HEIGHT: 3.5,
  SHIELD_FRONT_DOT: 0.25, // 攻撃元がこの dot 以上「前方」なら遮断

  // FFA ターゲティング(V6.6 バトルロイヤル)
  TARGET_REEVAL_MIN: 1,   // 再評価間隔(s)
  TARGET_REEVAL_MAX: 2,
  HATE_TIME: 6,           // 直近この秒数内に攻撃してきた相手へのヘイト持続
  HATE_BONUS: 30,         // ヘイト加点
  LOS_BONUS: 25,          // 視線が通る相手への加点
  CROWD_PENALTY: 40,      // 既に 2 機以上から狙われている相手への減点(自然分散)

  // ドラム缶(誘爆連鎖)
  BARREL_COUNT: 10,
  BARREL_HP: 25,
  BARREL_RADIUS: 7,       // 爆風半径
  BARREL_DMG_CENTER: 35,
  BARREL_DMG_EDGE: 15,
  BARREL_CHAIN_DELAY: 0.15, // 誘爆の遅延(s)

  // 破壊可能遮蔽(コンテナ/バリケード。ビルは破壊不可)
  PROP_HP: 120,

  // ============================================================
  // WEAPONS: 武器定義テーブル(V6.7 / V7.0 kind 再編 / V7.1 サイズ制 + 12 種)
  //   size: light | medium | heavy(V7.1 ハードポイント。同サイズのスロットのみ搭載可)
  //     設計原則: 軽 = 低威力・高取り回し / 中 = バランス / 重 = 高威力・予兆や長 CD
  //   kind: bolt | hitscan | railcharge | missile | rocket | swarm | artillery | tempest
  //     - bolt(V7.0): 発光する実体弾。飛行中に命中判定 → 横移動で回避できる
  //     - hitscan: 即着弾(MG / NEEDLE。低威力の取り回し武器)
  //     - railcharge: チャージ式テレグラフ → chargeTime 後にヒットスキャン射出
  //     - swarm(V7.1): マイクロロケット 6 連(弱ホーミング・ロック不要)
  //     - artillery(V7.1): 長距離爆撃。着弾予報サークル表示 → 山なり弾道 6 発が降る
  //     - tempest(V7.1): チャージ 1.8s → 3 秒間の持続稲妻ビーム(全熱量消費)
  //   mount: arm | shoulder(視覚装着位置。4 スロット時は両手 + 両肩に振り分け)
  //   price: ショップ価格(購入 1 回 = 在庫 +1。武器は実体で在庫制)
  //   heat 系はゲージ共有。interval/cd はスロット個別クールダウン
  // ============================================================
  WEAPONS: {
    // ---------------- 軽(light): 低威力・高取り回し ----------------
    mg: {
      name: 'MACHINE GUN', label: 'MG', kind: 'hitscan', size: 'light', mount: 'arm', price: 500,
      dmgMin: 2, dmgMax: 3, interval: 0.09, heat: 4, range: 30, // V7.1: 射程 80→30(近接チップ専用)
      color: 0xffe9a8, colorE: 0xffc080, sfx: 'mg', recoil: 0.006, spreadAim: 1.5, tag: '軽・近距離速射',
    },
    pulse: {
      name: 'PULSE CANNON', label: 'PULSE', kind: 'bolt', size: 'light', mount: 'arm', price: 600,
      dmgMin: 10, dmgMax: 15, interval: 0.6, heat: 22, range: 70, // V7.1: 軽に再分類・射程 80→70
      boltSpeed: 48, boltScale: 1,
      color: 0x7feaff, colorE: 0xff8866, sfx: 'pulse', recoil: 0.03, spreadAim: 0.3, tag: '軽・エネルギー弾',
    },
    needle: { // V7.1 新規: 高精度の細い長射程ヒットスキャン(遠くからチクチク)
      name: 'NEEDLE LANCER', label: 'NEEDLE', kind: 'hitscan', size: 'light', mount: 'arm', price: 1200,
      dmgMin: 4, dmgMax: 6, interval: 0.4, heat: 6, range: 100,
      color: 0xd8ffe8, colorE: 0xffd8e8, sfx: 'needle', recoil: 0.01, spreadAim: 0.06, tag: '軽・長距離精密',
    },
    swarm: { // V7.1 新規: マイクロロケット 6 連(弱ホーミング・ロック不要の緩追尾)
      name: 'SWARM POD', label: 'SWARM', kind: 'swarm', size: 'light', mount: 'shoulder', price: 1800,
      cd: 4, count: 6, dmgMin: 3, dmgMax: 4, range: 55,
      color: 0xffe9a8, colorE: 0xffb080, sfx: 'swarm', tag: '軽・微誘導 6 連',
    },
    // ---------------- 中(medium): バランス ----------------
    spread: {
      name: 'SPREAD SHOT', label: 'SPREAD', kind: 'bolt', size: 'medium', mount: 'arm', price: 1500,
      pellets: 8, dmgMin: 4, dmgMax: 6, interval: 0.9, heat: 18, range: 28, // V7.1: 中に再分類
      boltSpeed: 40, boltScale: 0.7, boltSpread: 0.1,
      color: 0xffc060, colorE: 0xff9860, sfx: 'spread', recoil: 0.05, spreadAim: 0.2, tag: '中・近距離散弾',
    },
    missile: {
      name: 'MISSILE SALVO', label: 'MISSILE', kind: 'missile', size: 'medium', mount: 'shoulder', price: 900,
      cd: 8, needLock: true, tag: '中・誘導 4 連',
    },
    arc: { // V7.1 新規: 電撃ボルト。命中時 12m 以内の別の敵 1 機へ 40% 連鎖(稲妻)
      name: 'ARC BLASTER', label: 'ARC', kind: 'bolt', size: 'medium', mount: 'arm', price: 2200,
      dmgMin: 14, dmgMax: 18, interval: 1.4, heat: 26, range: 60,
      boltSpeed: 40, boltScale: 1.1, chain: 0.4, chainRange: 12,
      color: 0x9fc8ff, colorE: 0xcf9fff, sfx: 'arc', recoil: 0.04, spreadAim: 0.25, tag: '中・電撃連鎖',
    },
    repulsor: { // V7.1 新規: 命中した敵を後方へ ~6m ノックバック(位置取りを崩す)
      name: 'REPULSOR WAVE', label: 'RPLS', kind: 'bolt', size: 'medium', mount: 'arm', price: 2400,
      dmgMin: 12, dmgMax: 15, interval: 3.0, range: 50, // 熱なし・CD 3s
      boltSpeed: 32, boltScale: 1.6, knockback: 18, // 初速 18 × 減衰 3/s ≈ 6m 押し込み
      color: 0xaef3e0, colorE: 0xffc8a0, sfx: 'repulsor', recoil: 0.06, spreadAim: 0.3, tag: '中・衝撃ノックバック',
    },
    // ---------------- 重(heavy): 高威力・予兆/長 CD ----------------
    bazooka: {
      name: 'BAZOOKA', label: 'BZK', kind: 'rocket', size: 'heavy', mount: 'shoulder', price: 800,
      cd: 3.5, tag: '重・弾道爆発',
    },
    rail: {
      name: 'RAILGUN', label: 'RAIL', kind: 'railcharge', size: 'heavy', mount: 'arm', price: 3500,
      dmgMin: 45, dmgMax: 55, interval: 2.2, heat: 45, range: 120, chargeTime: 0.5,
      color: 0xb8e4ff, colorE: 0xffa0c0, sfx: 'rail', recoil: 0.12, spreadAim: 0.1, tag: '重・狙撃(予兆 0.5s)',
    },
    artillery: { // V7.1 新規: 長距離爆撃 6 発(着弾予報サークル → 山なり弾道で降る)
      name: 'ARTILLERY RAIN', label: 'ARTY', kind: 'artillery', size: 'heavy', mount: 'shoulder', price: 4200,
      cd: 9, count: 6, dmgMin: 18, dmgMax: 24, blast: 4,
      rangeMin: 40, rangeMax: 110, scatter: 9, // 照準方向 40-110 に散布半径 9 のランダム着弾
      color: 0xffb060, colorE: 0xff8050, sfx: 'artillery', tag: '重・長距離爆撃(予報あり)',
    },
    tempest: { // V7.1 新規: チャージ 1.8s → 3s 持続稲妻ビーム(全熱量消費・移動 30% 減)
      name: 'TEMPEST BEAM', label: 'TMPST', kind: 'tempest', size: 'heavy', mount: 'arm', price: 5000,
      dmgTick: 8, tickInterval: 0.25, burnTime: 3, interval: 6, range: 45, chargeTime: 1.8,
      slowMul: 0.7, // 照射中の移動倍率
      color: 0xc8e8ff, colorE: 0xffc8f0, sfx: 'tempest', recoil: 0.02, spreadAim: 0.1, tag: '重・持続電撃照射',
    },
  },

  // 共通武器パラメータ
  WEAPON_RANGE: 80,       // 既定の最大到達距離(range 未指定時 / AI 交戦判定)
  HEAT_MAX: 100,
  HEAT_COOL_RATE: 18,     // 冷却速度 /s
  HEAT_RECOVER_TO: 30,    // オーバーヒート復帰しきい値

  // ============================================================
  // ポイント経済(V6.7。V7.1 から localStorage v6_save_v3 に永続化)
  // ============================================================
  SAVE_KEY: 'v6_save_v3',    // V7.1: ハードポイント制(スロット数可変)
  SAVE_KEY_V2: 'v6_save_v2', // 旧セーブ v2(2 スロット固定。マイグレーション元)
  SAVE_KEY_V1: 'v6_save_v1', // 旧セーブ v1(owned 配列)
  PT_KILL: 100,           // 撃破ボーナス
  PT_PER_DMG: 1,          // 与ダメージ 1pt / dmg
  PT_WIN: 300,            // 勝利ボーナス
  PT_SURVIVE_SEC: 4,      // 生存 1pt / この秒数
  CRATE_COUNT: 6,         // ポイントクレート数
  CRATE_MIN: 50,
  CRATE_MAX: 150,
  CRATE_PICK_RADIUS: 1.8, // 取得判定距離
  // クレート配置(リスク地点: 橋上 / 運河内 / 大通り / クレーター)
  CRATE_SPOTS: [
    [0, 27],     // 大通り橋の上
    [-84, 27],   // 路地橋の上
    [50, 27],    // 運河の中
    [-40, 27],   // 運河の中
    [0, -80],    // 大通りのクレーター内
    [0, 60],     // 大通り中央
  ],

  // ミサイル飛翔体(発射 CD は WEAPONS.missile.cd)
  MISSILE_POOL: 24,       // V7.1: SWARM(6 連)との同時飛翔を考慮して 16→24
  MISSILE_SALVO: 4,       // 1サルボの発射数
  MISSILE_DAMAGE_MIN: 8,
  MISSILE_DAMAGE_MAX: 12,
  ENEMY_MISSILE_COOLDOWN: 12, // 敵 AI の発射間隔(s・低頻度)
  MISSILE_SPEED: 26,      // 最高速度
  MISSILE_ACCEL: 26,      // 加速度
  MISSILE_TURN: 3.2,      // 追尾の旋回強度(比例航法近似)
  MISSILE_ARM_TIME: 0.35, // 発射直後は無誘導(山なり軌道を作る)
  MISSILE_LIFE: 6,        // 寿命(s)
  MISSILE_HIT_RADIUS: 1.9,

  // バズーカ飛翔体(発射 CD は WEAPONS.bazooka.cd)
  ROCKET_POOL: 8,
  BAZOOKA_SPEED: 18,
  BAZOOKA_GRAVITY_MUL: 0.18,  // わずかな弾道落下
  ENEMY_BAZOOKA_COOLDOWN: 6,  // 敵 AI の発射間隔(s)
  BAZOOKA_BLAST_RADIUS: 6,
  BAZOOKA_DMG_CENTER: 30,     // 爆心ダメージ
  BAZOOKA_DMG_EDGE: 12,       // 縁ダメージ(線形減衰)
  BAZOOKA_LIFE: 6,
  BAZOOKA_HIT_RADIUS: 1.6,    // 直撃判定

  // ============================================================
  // V7.0: エネルギーボルト(PULSE / SPREAD の実体弾)
  //   発光する弾体が銃口から照準点へ飛ぶ。飛行中の球 vs 機体で命中判定。
  //   遮蔽・地形・破壊可能物にも着弾する。プール制(毎フレーム new しない)
  // ============================================================
  BOLT_POOL: 24,             // ボルトプール上限(SPREAD 8 ペレット × 同時数を考慮)
  BOLT_LIFE: 2.0,            // 寿命(s。range で先に消えることが多い)
  BOLT_RADIUS: 1.0,         // 弾体の見た目半径(球の表示スケール)
  BOLT_HIT_PAD: 0.6,        // 命中判定の機体半径への加算(高速弾の素抜け防止)
  BOLT_TRAIL: 0.04,         // トレイル間引き間隔(s)

  // V7.0: AI のリード射撃(ボルト系のみ。完璧でない係数でプレイヤーの横移動を外す)
  AI_LEAD_MIN: 0.7,          // リード係数の下限(過小=手前に撃つ)
  AI_LEAD_MAX: 1.1,          // リード係数の上限(過大=先に撃ちすぎる)
  AI_LEAD_MISS_SPREAD: 1.6,  // リード予測へ加える角度ばらつきの基準(距離で増す)

  // ============================================================
  // V7.1: ARTILLERY(長距離爆撃)の飛翔体 + 着弾予報
  // ============================================================
  ARTY_POOL: 18,             // 砲弾プール(6 発/回 × 同時 3 ボレー)
  ARTY_TELEGRAPH_POOL: 4,    // 着弾予報サークルの同時表示数
  ARTY_FLIGHT_BASE: 1.5,     // 飛翔時間の基準(s。距離・発番で加算 → 回避猶予)
  ARTY_FLIGHT_PER_U: 0.004,  // 距離 1u あたりの飛翔時間加算
  ARTY_STAGGER: 0.14,        // 発ごとの着弾時間差(雨のように降る)
  ARTY_ARC_HEIGHT: 16,       // 山なり弾道の頂点高(+距離比例分)

  // V7.1: TEMPEST(持続稲妻ビーム)の演出
  TEMPEST_FX_POOL: 4,        // 同時ビーム数(最大 4 機が全員照射)
  TEMPEST_SEGS: 9,           // 稲妻ポリラインの分割数(ジグザグ)
  TEMPEST_JAG: 0.7,          // ジグザグの最大横ぶれ(u)

  // V7.1: ノックバック(REPULSOR)。速度は指数減衰(decay 3/s)
  KNOCKBACK_DECAY: 3,        // 減衰率 /s(押し込み距離 ≈ 初速 / decay)

  // ロックオン(V6.7: WR 準拠で取得と維持を非対称化)
  LOCK_RANGE: 110,        // 視認できる距離ならロック可
  LOCK_FOV: 55 * Math.PI / 180,      // 取得時の視野半角
  LOCK_FOV_KEEP: 80 * Math.PI / 180, // 維持時の視野半角(視線を振っても外れにくい)
  LOCK_GRACE: 1.5,        // 遮蔽後ロック維持時間(s。琥珀色で予告)
  SPOTTED_TIME: 3,        // 発見済みマーカーの記憶時間(LOS 喪失後・半透明表示)

  // ミニレーダー(WR風)
  RADAR_RANGE: 140,       // 表示レンジ(範囲外は縁にクランプ)
  RADAR_SIZE: 128,        // canvas ピクセルサイズ

  // サウンド
  SFX_VOLUME: 0.5,        // マスターボリューム
  BGM_VOLUME: 0.25,
  MAX_VOICES: 8,          // 同時発音数の上限
  STEP_STRIDE: 1.4,       // 足音の間隔(移動距離 u)

  // HUD 仕上げ
  LOW_HP_RATIO: 0.3,      // 赤ビネット点滅のしきい値
  HIT_ARC_TIME: 0.6,      // 被弾方向インジケータの表示時間(s)
  KILLLOG_TIME: 3,        // キルログの表示時間(s)
  LOCK_FLASH_TIME: 0.9,   // TARGET LOCKED フラッシュ(s)

  // V7.0: 画面外の敵への方向矢印インジケータ(小さめ・控えめ・HP 残量重視)
  EDGE_ARROW_MARGIN: 46,  // 画面端からのインセット(px)。HUD を邪魔しない控えめ配置
  EDGE_ARROW_RANGE: 150,  // この距離以内の画面外の敵のみ矢印を出す
  EDGE_ARROW_SIZE: 28,    // 矢印 + HP バーのおおよその高さ(px)

  // カメラ(TPS)
  CAM_DIST: 6.2,
  CAM_HEIGHT: 4.0,
  CAM_LOOK_HEIGHT: 2.6,
  CAM_SHOULDER: 1.0,      // 肩越しオフセット
  CAM_LERP: 6,            // 追従の遅れを増やして重量感を演出
  CAM_SENS: 0.0045,
  TOUCH_LOOK_MUL: 2.4,    // タッチスワイプの旋回感度倍率(画面半分のスワイプ 1 回で ~180°)
  KEY_TURN_RATE: 2.4,     // Shift+←→ の旋回速度 rad/s
  CAM_PITCH_MIN: -0.32,
  CAM_PITCH_MAX: 0.72,

  // 敵AI(V6.6: FFA 化。攻撃トークン制は廃止 — ターゲット分散で過集中を自然回避)
  ENEMY_COUNT: 3,
  ENEMY_ACCURACY: 0.60,   // 命中率
  ENEMY_COMBAT_RANGE: 55,
  ENEMY_RETREAT_HP: 25,   // この HP 以下で遮蔽へ退避

  // スポーン地点(V6 旧固定配置。V7.0 ランダム出現が無効な場合のフォールバック)
  PLAYER_SPAWN: [0, 140],
  ENEMY_SPAWNS: [[-42, -140], [-126, -110], [126, -110]],

  // ============================================================
  // V7.0: ランダム出現候補(運の要素)
  //   街路上・運河沿い・広場などバラけた 12 地点(ビル内に埋まらない位置)。
  //   毎試合 4 機へランダム割当(相互距離 ≥ SPAWN_MIN_DIST / 初期 LOS 回避を試行)
  // ============================================================
  SPAWN_POINTS: [
    [0, 150],      // 北の大通り(マップ端)
    [0, -150],     // 南の大通り
    [-130, 130],   // 北西の街路
    [130, 130],    // 北東の街路
    [-130, -130],  // 南西の街路
    [130, -130],   // 南東の街路
    [-63, 80],     // 北西の広場(クレーター脇)
    [84, 80],      // 北東の街路
    [-126, 0],     // 西の中通り
    [126, 0],      // 東の中通り
    [-40, 27],     // 運河沿い西(浅瀬の縁)
    [50, 27],      // 運河沿い東
  ],
  SPAWN_RANDOM: true,    // false で旧固定配置(PLAYER_SPAWN/ENEMY_SPAWNS)に戻す
  SPAWN_MIN_DIST: 60,    // 割当機体間の最小距離
  SPAWN_TRIES: 50,       // 制約を満たす組合せの試行回数(ベストを採用)
  OPENING_PEACE: 2.0,    // 開幕この秒数は AI が射撃しない(即交戦の回避)

  // ============================================================
  // V7.0: 撃破時 HP 回復(残量 2 倍ルール)
  //   撃破した機体は HP=min(maxHp, HP×2)。瀕死撃破ほど報酬大の逆転ルール
  // ============================================================
  REPAIR_ON_KILL: true,

  // 視認性(マーカーの記憶は SPOTTED_TIME に統合 / V6.7)
  FOG_NEAR: 70,           // 遠方の輪郭を溶かす(視認性制御)
  FOG_FAR: 430,

  // 演出
  BEAM_LIFE: 0.2,
  SLOWMO_SCALE: 0.3,
  SLOWMO_TIME: 1.5,
  DT_CLAMP: 0.05,

  // ブルーム(V6.5。構築失敗時は素のレンダリングにフォールバック)
  BLOOM_ENABLED: true,
  BLOOM_STRENGTH: 0.55,
  BLOOM_STRENGTH_MOBILE: 0.35, // モバイルは控えめ(性能優先)
  BLOOM_RADIUS: 0.4,
  BLOOM_THRESHOLD: 0.85,
  MOBILE_PIXEL_RATIO: 1.5,     // モバイル時の renderer.setPixelRatio 上限

  // プール上限(V6.5: エフェクト増量に合わせ ~1.5 倍)
  PARTICLE_POOL: 180,
  BEAM_POOL: 16,         // 2層ビーム(コア+グロー)で 1 射 2 本消費
  LIGHT_POOL: 6,
  RING_POOL: 10,         // 衝撃波リング
  DMG_TEXT_POOL: 14,
};

// ============================================================
// セーブデータ(V6.9 在庫制 / V7.1 ハードポイント制)。localStorage。
// 構造 v3: { wallet, inventory: {武器キー: 所持数}, lastClass,
//            loadouts: {クラス: [武器キー|null × hardpoints.length]} }
//   - 武器は「実体」: 装備中の合計数 ≤ 所持数(在庫)を常に保証
//   - V7.1: スロット数はクラスの hardpoints 依存(2〜4)。
//     さらに「武器サイズ = スロットサイズ」を不変条件に追加
//   - null = 空きスロット(戦闘では発射不可)
//   - v2(2 スロット固定)/ v1(owned 配列)からは自動マイグレーション
// ============================================================
const PLAYER_CLASSES = ['LIGHT', 'MEDIUM', 'HEAVY']; // 在庫を共有するプレイヤー用クラス

/** クラスのハードポイント配列(スロットサイズ) */
function hardpointsOf(clsKey) { return CONFIG.MECH_CLASSES[clsKey].hardpoints; }

/** 初期在庫: 全クラスの既定装備が同時成立する最小構成(V7.1 再定義) */
function defaultInventory() {
  // SCOUT [mg,pulse] + VANGUARD [missile,pulse,mg] + BASTION [bazooka,bazooka,pulse,mg]
  return { pulse: 3, mg: 3, missile: 1, bazooka: 2 };
}
function defaultSave() {
  const loadouts = {};
  for (const k of PLAYER_CLASSES) loadouts[k] = [...CONFIG.MECH_CLASSES[k].weapons];
  return {
    wallet: 0,
    inventory: defaultInventory(),
    lastClass: 'MEDIUM',
    loadouts,
  };
}
/**
 * v3 セーブの正規化。構造が壊れていたら null(呼び出し側で初期化)。
 * 不変条件の回復: 在庫超過の装備は後勝ちで null / サイズ不一致の装備も null
 * (在庫としては保持されるので消失はしない)。
 */
function sanitizeSave(s) {
  if (!s || typeof s.wallet !== 'number' || !s.inventory || !s.loadouts) return null;
  const out = defaultSave();
  out.wallet = Math.max(0, Math.floor(s.wallet));
  // 在庫: 既知の武器キーのみ・非負整数のみ採用
  for (const k of Object.keys(CONFIG.WEAPONS)) {
    const n = s.inventory[k];
    out.inventory[k] = (typeof n === 'number' && n >= 0) ? Math.floor(n) : 0;
  }
  if (CONFIG.MECH_CLASSES[s.lastClass] && PLAYER_CLASSES.includes(s.lastClass)) {
    out.lastClass = s.lastClass;
  }
  // ロードアウト: hardpoints 長の [武器キー|null]。サイズ整合 + 在庫内のみ採用
  const used = {};
  for (const c of PLAYER_CLASSES) {
    const hp = hardpointsOf(c);
    const lo = Array.isArray(s.loadouts[c]) ? s.loadouts[c] : [];
    out.loadouts[c] = new Array(hp.length).fill(null);
    for (let i = 0; i < hp.length; i++) {
      const w = lo[i];
      if (w === null || w === undefined || !CONFIG.WEAPONS[w]) continue;
      if (CONFIG.WEAPONS[w].size !== hp[i]) continue; // V7.1: サイズ不一致は外す
      // 在庫超過の装備は外す(装備合計 ≤ 所持数の不変条件を回復)
      if ((used[w] || 0) >= (out.inventory[w] || 0)) continue;
      used[w] = (used[w] || 0) + 1;
      out.loadouts[c][i] = w;
    }
  }
  return out;
}
/**
 * v2(2 スロット固定)→ v3 へのマイグレーション(V7.1)。
 *   - 在庫は引き継ぎ + 新デフォルト在庫との max(既定装備が必ず成立するよう底上げ)
 *   - 旧装備はサイズが合うスロットへ可能な範囲で引き継ぎ。入らない武器は在庫に残る
 *   - 空いたスロットはクラス既定武器で埋める(在庫が許す範囲)
 */
function migrateSaveV2(s) {
  if (!s || typeof s.wallet !== 'number' || !s.inventory) return null;
  // 在庫の底上げ(新デフォルト装備の成立を保証)
  const inv = defaultInventory();
  for (const k of Object.keys(CONFIG.WEAPONS)) {
    const n = s.inventory[k];
    if (typeof n === 'number' && n >= 0) inv[k] = Math.max(inv[k] || 0, Math.floor(n));
  }
  // 旧 2 スロット装備をサイズの合う空きスロットへ詰め直す
  const loadouts = {};
  const used = {};
  const canUse = (w) => (used[w] || 0) < (inv[w] || 0);
  for (const c of PLAYER_CLASSES) {
    const hp = hardpointsOf(c);
    loadouts[c] = new Array(hp.length).fill(null);
    const oldLo = (s.loadouts && Array.isArray(s.loadouts[c])) ? s.loadouts[c] : [];
    for (const w of oldLo) {
      if (!w || !CONFIG.WEAPONS[w] || !canUse(w)) continue;
      const idx = hp.findIndex((sz, i) => loadouts[c][i] === null && CONFIG.WEAPONS[w].size === sz);
      if (idx >= 0) { loadouts[c][idx] = w; used[w] = (used[w] || 0) + 1; }
      // 入らない武器は在庫に残る(消失しない)
    }
    // 空きスロットをクラス既定で補完(在庫が許す範囲)
    const defaults = CONFIG.MECH_CLASSES[c].weapons;
    for (let i = 0; i < hp.length; i++) {
      if (loadouts[c][i] !== null) continue;
      const w = defaults[i];
      if (w && CONFIG.WEAPONS[w] && CONFIG.WEAPONS[w].size === hp[i] && canUse(w)) {
        loadouts[c][i] = w;
        used[w] = (used[w] || 0) + 1;
      }
    }
  }
  return sanitizeSave({
    wallet: s.wallet,
    inventory: inv,
    lastClass: s.lastClass,
    loadouts,
  });
}
/** v1(v6_save_v1: owned 配列)→ v2 相当 → v3 へのマイグレーション */
function migrateSaveV1(s) {
  if (!s || typeof s.wallet !== 'number') return null;
  const inv = defaultInventory();
  if (Array.isArray(s.owned)) {
    // 購入武器(基本装備以外)は所持 1 として引き継ぐ
    for (const k of s.owned) {
      if (CONFIG.WEAPONS[k] && inv[k] === undefined) inv[k] = 1;
    }
  }
  return migrateSaveV2({
    wallet: s.wallet,
    inventory: inv,
    lastClass: s.lastClass,
    loadouts: s.loadouts || {},
  });
}
function loadSave() {
  try {
    const raw = localStorage.getItem(CONFIG.SAVE_KEY);
    if (raw) {
      const s = sanitizeSave(JSON.parse(raw));
      if (s) return s;
      return defaultSave(); // v3 が壊れていたら安全に初期化
    }
    // v3 が無ければ v2 → v1 の順にマイグレーション
    const rawV2 = localStorage.getItem(CONFIG.SAVE_KEY_V2);
    if (rawV2) {
      const s = migrateSaveV2(JSON.parse(rawV2));
      if (s) {
        try { localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(s)); } catch (_) { /* private mode */ }
        console.info('[V7.1] セーブを v2 → v3(ハードポイント制)にマイグレーションしました');
        return s;
      }
    }
    const rawV1 = localStorage.getItem(CONFIG.SAVE_KEY_V1);
    if (rawV1) {
      const s = migrateSaveV1(JSON.parse(rawV1));
      if (s) {
        try { localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(s)); } catch (_) { /* private mode */ }
        console.info('[V7.1] セーブを v1 → v3 にマイグレーションしました');
        return s;
      }
    }
    return defaultSave();
  } catch (_) {
    return defaultSave();
  }
}
function saveSave(s) {
  try { localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(s)); } catch (_) { /* private mode */ }
}
const SAVE = loadSave(); // boot(ハンガー)と Game(リザルト加算)で共有

// ---- 在庫ヘルパー(V6.9 / V7.1 スロット数可変) ----
/** 武器の所持数 */
function invCount(key) { return SAVE.inventory[key] || 0; }
/** 武器が装備されている場所 [{cls, slot}](プレイヤー 3 クラスのみ) */
function equippedSlots(key) {
  const out = [];
  for (const c of PLAYER_CLASSES) {
    const lo = SAVE.loadouts[c];
    for (let i = 0; i < lo.length; i++) if (lo[i] === key) out.push({ cls: c, slot: i });
  }
  return out;
}
/** サイズ表示(ハンガーのタグ用) */
const SIZE_LABEL = { light: '軽', medium: '中', heavy: '重' };

// ============================================================
// ユーティリティ
// ============================================================
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/** 角度を -PI..PI に正規化 */
function normalizeAngle(a) {
  return ((a + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
}
/** 最短経路の角度補間 */
function lerpAngle(a, b, t) {
  return a + normalizeAngle(b - a) * t;
}

/**
 * 移動中の下半身 yaw 目標を計算(V6.5: 横移動の捻れ修正)
 *   - 照準(torsoYaw)から ±LEG_TWIST_CLAMP までしか脚を回さない
 *     (横移動は脚を斜めに踏み出す TPS 標準挙動)
 *   - 移動方向が背面(±BACKPEDAL_ANGLE 超)なら前向きのまま後ずさり
 *     (yaw は照準のまま・歩行アニメは逆再生)
 * 結果は使い回しオブジェクト _legYaw に書き込む(毎フレームの new を避ける)
 */
const _legYaw = { yaw: 0, back: false };
function legYawTarget(torsoYaw, moveYaw) {
  const rel = normalizeAngle(moveYaw - torsoYaw);
  if (Math.abs(rel) > CONFIG.BACKPEDAL_ANGLE) {
    _legYaw.yaw = torsoYaw;
    _legYaw.back = true;
  } else {
    _legYaw.yaw = torsoYaw + clamp(rel, -CONFIG.LEG_TWIST_CLAMP, CONFIG.LEG_TWIST_CLAMP);
    _legYaw.back = false;
  }
  return _legYaw;
}
/** シード付き乱数(ステージレイアウト再現用) */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260611);

/** レイと球の交差距離(交差しなければ -1) */
function raySphereDist(origin, dir, center, radius, tmp) {
  tmp.subVectors(center, origin);
  const t = tmp.dot(dir);
  if (t < 0) return -1;
  const d2 = tmp.lengthSq() - t * t;
  const r2 = radius * radius;
  if (d2 > r2) return -1;
  return t - Math.sqrt(r2 - d2);
}

// 使い回しテンポラリ(毎フレームの new を避ける)
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();
const _v4 = new THREE.Vector3();
const _v5 = new THREE.Vector3();
const _muzzle = new THREE.Vector3(); // 射撃処理専用(onKO 等との競合回避)
const _wpnFollow = new THREE.Vector3(); // 武器ボーンフォロワー専用(V6.9.1)
const _proj = new THREE.Vector3();

// ============================================================
// CITY: 格子状街路レイアウト定義
//   (地面テクスチャ描画と街区=ビル生成の両方で共有する)
//   c: 道路中心線の座標 / w: 道幅
// ============================================================
const CITY = {
  // 南北方向の道路(x = c に沿って z 方向へ走る)
  vRoads: [
    { c: 0, w: 18 },                       // 大通り(長い射線が通る)
    { c: -42, w: 6 }, { c: 42, w: 6 },     // 路地
    { c: -84, w: 6 }, { c: 84, w: 6 },
    { c: -126, w: 6 }, { c: 126, w: 6 },
  ],
  // 東西方向の道路(z = c に沿って x 方向へ走る)
  hRoads: [
    { c: -55, w: 10 }, { c: 55, w: 10 },   // 中通り
    { c: 0, w: 6 },                        // 路地
    { c: -110, w: 6 }, { c: 110, w: 6 },
  ],
};

// ============================================================
// TERRAIN: 高低差定義(クレーター + 涸れ運河 + 橋)
// ============================================================
const TERRAIN = {
  // クレーター(滑らかな窪み)。道路・広場上に配置
  craters: [
    { x: 0, z: -80, r: 14, d: 3.0 },   // 大通り上
    { x: -63, z: 80, r: 12, d: 2.5 },  // 街区内(広場化)
    { x: 84, z: -30, r: 16, d: 3.0 },  // 路地交差点付近
  ],
  // 涸れ運河(東西方向の溝)。大通りと交差し、橋で渡る
  canal: {
    z: 27,          // 中心線
    halfW: 6,       // 床の半幅(全幅 ~12)
    depth: 3,       // 深さ
    wall: 4.5,      // 壁の遷移幅(歩いて出入りできる勾配)
    fadeStart: 135, // |x| がここから先は浅くなる(両端スロープ)
    fadeEnd: 152,
  },
  // 橋(運河を渡るデッキ。桁下クリアランス 3.5 で下も通れる)
  bridges: [
    { x: 0, halfW: 4, top: 1.0, zMin: 19.5, zMax: 34.5, ramp: 5 },   // 大通り橋
    { x: -84, halfW: 4, top: 1.0, zMin: 19.5, zMax: 34.5, ramp: 5 }, // 路地橋
  ],
};

/** 0..1 の smoothstep */
function smooth01(t) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * 地面の高さ(視覚メッシュと物理判定の両方がこの関数を参照する)
 * 平地 = 0。クレーター/運河は負の値。
 */
function getGroundHeight(x, z) {
  let h = 0;
  // クレーター(縁が滑らかなボウル)
  for (const c of TERRAIN.craters) {
    const d = Math.hypot(x - c.x, z - c.z);
    if (d < c.r) h -= c.d * (1 - smooth01(d / c.r));
  }
  // 運河(東西の溝。断面は台形、|x| 両端はスロープで 0 に戻る)
  const ca = TERRAIN.canal;
  const dz = Math.abs(z - ca.z);
  const outer = ca.halfW + ca.wall * 0.5;
  if (dz < outer) {
    const cross = 1 - smooth01((dz - (ca.halfW - ca.wall * 0.5)) / ca.wall);
    const fade = 1 - smooth01((Math.abs(x) - ca.fadeStart) / (ca.fadeEnd - ca.fadeStart));
    h -= ca.depth * cross * fade;
  }
  return h;
}

/**
 * 足元の支持面高さ(地面 + 橋デッキ)。
 * yRef: 現在の足の高さ。デッキ上面付近以上にいる時だけ橋に支持される
 *       (運河内 = デッキ下を通るときは地面に落ちる)
 */
function getSupportHeight(x, z, yRef) {
  let sup = getGroundHeight(x, z);
  for (const b of TERRAIN.bridges) {
    if (Math.abs(x - b.x) > b.halfW) continue;
    let h = null;
    if (z >= b.zMin && z <= b.zMax) h = b.top;
    else if (z >= b.zMin - b.ramp && z < b.zMin) h = b.top * (1 - (b.zMin - z) / b.ramp);
    else if (z > b.zMax && z <= b.zMax + b.ramp) h = b.top * (1 - (z - b.zMax) / b.ramp);
    if (h !== null && h > sup && yRef >= h - 0.35) sup = h;
  }
  return sup;
}

// ============================================================
// プロシージャルテクスチャ(Canvas)
// ============================================================
function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

/** 都市の地面: CITY の街路網と一致する道路 + 街区(歩道) + 運河 + クレーター跡 */
function makeGroundTexture() {
  const size = 1024;
  const S = CONFIG.ARENA_SIZE;
  const u = (w) => (w + S / 2) / S * size; // ワールド座標 → テクセル
  const su = (w) => w / S * size;          // 長さ → テクセル
  const c = makeCanvas(size, size);
  const g = c.getContext('2d');

  // ベース: 街区のコンクリート(歩道)
  g.fillStyle = '#8b8a84';
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 9000; i++) {
    const v = 110 + Math.floor(rng() * 60);
    g.fillStyle = `rgba(${v},${v},${v - 6},${0.12 + rng() * 0.2})`;
    g.fillRect(rng() * size, rng() * size, 1 + rng() * 3, 1 + rng() * 3);
  }

  // 道路を 1 本描くヘルパー(vertical: x=c / horizontal: z=c)
  const drawRoad = (cc, w, vertical) => {
    const a = u(cc - w / 2), b = u(cc + w / 2);
    g.fillStyle = '#54534e'; // アスファルト
    if (vertical) g.fillRect(a, 0, b - a, size);
    else g.fillRect(0, a, size, b - a);
    // 端の白線
    g.fillStyle = 'rgba(207,207,200,0.85)';
    const lw = Math.max(2, su(0.5));
    if (vertical) { g.fillRect(a + 2, 0, lw, size); g.fillRect(b - 2 - lw, 0, lw, size); }
    else { g.fillRect(0, a + 2, size, lw); g.fillRect(0, b - 2 - lw, size, lw); }
    // 広い道路は黄色センターライン(破線)
    if (w >= 10) {
      g.fillStyle = '#d8b13c';
      const mid = u(cc), dash = su(5), gap = su(4);
      for (let t = 0; t < size; t += dash + gap) {
        if (vertical) g.fillRect(mid - lw / 2, t, lw, dash);
        else g.fillRect(t, mid - lw / 2, dash, lw);
      }
    }
  };
  for (const r of CITY.vRoads) drawRoad(r.c, r.w, true);
  for (const r of CITY.hRoads) drawRoad(r.c, r.w, false);

  // 涸れ運河(乾いた川床: 茶系)
  const ca = TERRAIN.canal;
  const cb = ca.halfW + ca.wall;
  g.fillStyle = '#6e6354';
  g.fillRect(0, u(ca.z - cb), size, su(cb * 2));
  g.fillStyle = '#5d5142';
  g.fillRect(0, u(ca.z - ca.halfW), size, su(ca.halfW * 2));
  for (let i = 0; i < 900; i++) { // 川床の砂利
    const x = rng() * size, y = u(ca.z - ca.halfW) + rng() * su(ca.halfW * 2);
    g.fillStyle = `rgba(${90 + rng() * 50 | 0},${78 + rng() * 40 | 0},${60 + rng() * 30 | 0},0.5)`;
    g.fillRect(x, y, 2 + rng() * 3, 2 + rng() * 3);
  }

  // クレーター跡(焦げた円 + 放射状の汚れ)
  for (const cr of TERRAIN.craters) {
    const cx = u(cr.x), cy = u(cr.z), rr = su(cr.r);
    const grad = g.createRadialGradient(cx, cy, rr * 0.1, cx, cy, rr);
    grad.addColorStop(0, 'rgba(40,36,32,0.85)');
    grad.addColorStop(0.7, 'rgba(58,52,46,0.55)');
    grad.addColorStop(1, 'rgba(70,64,56,0)');
    g.fillStyle = grad;
    g.beginPath();
    g.arc(cx, cy, rr, 0, Math.PI * 2);
    g.fill();
  }

  // ひび割れ・シミ
  g.strokeStyle = 'rgba(40,40,38,0.35)';
  g.lineWidth = 2;
  for (let i = 0; i < 30; i++) {
    g.beginPath();
    let x = rng() * size, y = rng() * size;
    g.moveTo(x, y);
    for (let j = 0; j < 5; j++) {
      x += (rng() - 0.5) * 70; y += (rng() - 0.5) * 70;
      g.lineTo(x, y);
    }
    g.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** 昼のオフィスビル外壁(窓グリッド) */
function makeBuildingTexture(baseColor, windowTint) {
  const w = 256, h = 512;
  const c = makeCanvas(w, h);
  const g = c.getContext('2d');

  g.fillStyle = baseColor;
  g.fillRect(0, 0, w, h);

  // 外壁の汚れノイズ
  for (let i = 0; i < 700; i++) {
    g.fillStyle = `rgba(0,0,0,${rng() * 0.08})`;
    g.fillRect(rng() * w, rng() * h, 2, 2 + rng() * 6);
  }

  // 窓グリッド(昼: 空の映り込みでブルーグレー、たまに明るい反射)
  const cols = 6, rows = 14;
  const mx = 10, my = 12;
  const ww = (w - mx * 2) / cols, wh = (h - my * 2) / rows;
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const x = mx + col * ww + 3, y = my + r * wh + 4;
      const rand = rng();
      if (rand > 0.93) g.fillStyle = '#e8f0f4';            // 強い反射
      else if (rand > 0.75) g.fillStyle = windowTint;       // 明るめ
      else g.fillStyle = '#46586a';                         // 通常の窓
      g.fillRect(x, y, ww - 6, wh - 8);
      // 窓枠ハイライト
      g.fillStyle = 'rgba(255,255,255,0.18)';
      g.fillRect(x, y, ww - 6, 2);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** コンテナ(低遮蔽物)の波板風テクスチャ */
function makeContainerTexture(color) {
  const c = makeCanvas(128, 64);
  const g = c.getContext('2d');
  g.fillStyle = color;
  g.fillRect(0, 0, 128, 64);
  for (let x = 0; x < 128; x += 10) {
    g.fillStyle = 'rgba(0,0,0,0.22)';
    g.fillRect(x, 0, 3, 64);
    g.fillStyle = 'rgba(255,255,255,0.10)';
    g.fillRect(x + 5, 0, 2, 64);
  }
  for (let i = 0; i < 90; i++) {
    g.fillStyle = `rgba(60,30,15,${rng() * 0.25})`; // サビ
    g.fillRect(rng() * 128, rng() * 64, 2 + rng() * 5, 2 + rng() * 4);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ============================================================
// 武器モデルファクトリ(V6.7 ハードポイント)
//   全てプリミティブ組み立て・+z が銃口方向。muzzle = 銃口先端の Object3D。
//   マテリアルは共有キャッシュ(機体間で使い回し)
// ============================================================
const WPN_MATS = {};
function wpnMat(key, params) {
  if (!WPN_MATS[key]) WPN_MATS[key] = new THREE.MeshStandardMaterial(params);
  return WPN_MATS[key];
}

/** @returns {{group: THREE.Group, muzzle: THREE.Object3D}} */
function buildWeaponModel(wKey) {
  const g = new THREE.Group();
  const muzzle = new THREE.Object3D();
  const dark = wpnMat('dark', { color: 0x2a2e33, metalness: 0.85, roughness: 0.4 });
  const steel = wpnMat('steel', { color: 0x6a737c, metalness: 0.8, roughness: 0.35 });
  const add = (mesh) => { mesh.castShadow = true; g.add(mesh); return mesh; };

  switch (wKey) {
    case 'pulse': { // 中口径砲身 + エネルギーコイル(発光リング×2)
      const barrel = add(new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 1.3, 10), dark));
      barrel.rotation.x = Math.PI / 2;
      barrel.position.z = 0.5;
      const coilMat = wpnMat('coilCyan', { color: 0x66ddff, emissive: 0x44bbff, emissiveIntensity: 1.6, metalness: 0.3, roughness: 0.3 });
      for (const z of [0.45, 0.8]) {
        const coil = add(new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.045, 8, 14), coilMat));
        coil.position.z = z;
      }
      muzzle.position.set(0, 0, 1.2);
      break;
    }
    case 'mg': { // 3 連ガトリングバレル + 弾倉ボックス
      for (let i = 0; i < 3; i++) {
        const a = i / 3 * Math.PI * 2;
        const b = add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), steel));
        b.rotation.x = Math.PI / 2;
        b.position.set(Math.cos(a) * 0.09, Math.sin(a) * 0.09, 0.5);
      }
      const hub = add(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.35, 10), dark));
      hub.rotation.x = Math.PI / 2;
      hub.position.z = 0.05;
      const mag = add(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.4), dark));
      mag.position.set(0, -0.26, 0.1);
      muzzle.position.set(0, 0, 1.1);
      break;
    }
    case 'spread': { // 太く短いバレル
      const barrel = add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.7, 12), dark));
      barrel.rotation.x = Math.PI / 2;
      barrel.position.z = 0.3;
      const rim = add(new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.12, 12), steel));
      rim.rotation.x = Math.PI / 2;
      rim.position.z = 0.62;
      muzzle.position.set(0, 0, 0.72);
      break;
    }
    case 'rail': { // 細長い 2 本レール + 発光ストリップ
      for (const y of [0.07, -0.07]) {
        const railBar = add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 1.8), steel));
        railBar.position.set(0, y, 0.75);
      }
      const glowMat = wpnMat('railGlow', { color: 0x9fd8ff, emissive: 0x66bbff, emissiveIntensity: 2.0, metalness: 0.2, roughness: 0.3 });
      const strip = add(new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 1.55), glowMat));
      strip.position.z = 0.7;
      const body = add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.6), dark));
      body.position.z = -0.05;
      muzzle.position.set(0, 0, 1.7);
      break;
    }
    case 'missile': { // 4 連チューブの箱型ポッド
      const box = add(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.9), dark));
      box.position.z = 0.1;
      const tubeMat = wpnMat('tube', { color: 0x14161a, metalness: 0.6, roughness: 0.6 });
      for (const [tx, ty] of [[-0.14, 0.14], [0.14, 0.14], [-0.14, -0.14], [0.14, -0.14]]) {
        const t = add(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.1, 10), tubeMat));
        t.rotation.x = Math.PI / 2;
        t.position.set(tx, ty, 0.56);
      }
      muzzle.position.set(0, 0, 0.65);
      break;
    }
    case 'bazooka': { // 大口径単装チューブ
      const tube = add(new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 1.6, 12), dark));
      tube.rotation.x = Math.PI / 2;
      tube.position.z = 0.35;
      const mouth = add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.18, 12), steel));
      mouth.rotation.x = Math.PI / 2;
      mouth.position.z = 1.08;
      muzzle.position.set(0, 0, 1.2);
      break;
    }
    case 'needle': { // V7.1: 極細の長砲身 + 小型スコープ(精密射撃)
      const barrel = add(new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.06, 1.9, 8), steel));
      barrel.rotation.x = Math.PI / 2;
      barrel.position.z = 0.8;
      const body = add(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.55), dark));
      body.position.z = -0.05;
      const scopeMat = wpnMat('needleScope', { color: 0xb8ffd8, emissive: 0x44dd88, emissiveIntensity: 1.4, metalness: 0.3, roughness: 0.3 });
      const scope = add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.26, 8), scopeMat));
      scope.rotation.x = Math.PI / 2;
      scope.position.set(0, 0.15, 0.1);
      muzzle.position.set(0, 0, 1.78);
      break;
    }
    case 'swarm': { // V7.1: 六角クラスタの 6 連マイクロロケットポッド
      const body = add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.7, 6), dark));
      body.rotation.x = Math.PI / 2;
      body.position.z = 0.15;
      const tubeMat = wpnMat('tube', { color: 0x14161a, metalness: 0.6, roughness: 0.6 });
      for (let i = 0; i < 6; i++) {
        const a = i / 6 * Math.PI * 2;
        const t = add(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 8), tubeMat));
        t.rotation.x = Math.PI / 2;
        t.position.set(Math.cos(a) * 0.17, Math.sin(a) * 0.17, 0.51);
      }
      muzzle.position.set(0, 0, 0.6);
      break;
    }
    case 'arc': { // V7.1: 二叉プロング + 中央の放電オーブ
      const body = add(new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.26, 0.7), dark));
      body.position.z = 0;
      for (const y of [0.12, -0.12]) {
        const prong = add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.06, 1.0), steel));
        prong.position.set(0, y, 0.75);
      }
      const orbMat = wpnMat('arcOrb', { color: 0xbfd8ff, emissive: 0x6f9fff, emissiveIntensity: 2.2, metalness: 0.2, roughness: 0.25 });
      const orb = add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), orbMat));
      orb.position.z = 0.55;
      muzzle.position.set(0, 0, 1.25);
      break;
    }
    case 'repulsor': { // V7.1: 末広がりのディッシュエミッタ(衝撃波)
      const body = add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.6, 10), dark));
      body.rotation.x = Math.PI / 2;
      body.position.z = 0.1;
      const dishMat = wpnMat('repDish', { color: 0x9fe8d0, emissive: 0x3fbf9a, emissiveIntensity: 1.5, metalness: 0.4, roughness: 0.35 });
      const dish = add(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.14, 0.35, 12, 1, true), dishMat));
      dish.rotation.x = -Math.PI / 2;
      dish.position.z = 0.55;
      muzzle.position.set(0, 0, 0.78);
      break;
    }
    case 'artillery': { // V7.1: 上向き 6 連チューブの箱型爆撃ランチャー
      const box = add(new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.5, 0.95), dark));
      box.position.z = 0.05;
      const tubeMat = wpnMat('tube', { color: 0x14161a, metalness: 0.6, roughness: 0.6 });
      for (let i = 0; i < 6; i++) {
        const tx = (i % 3 - 1) * 0.18, ty = (i < 3 ? 0.12 : -0.12);
        const t = add(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.16, 8), tubeMat));
        t.rotation.x = Math.PI / 2 - 0.5; // やや上向き(山なり弾道)
        t.position.set(tx, ty + 0.18, 0.5);
      }
      const stripMat = wpnMat('artyStrip', { color: 0xffc080, emissive: 0xff8030, emissiveIntensity: 1.4, metalness: 0.3, roughness: 0.4 });
      const strip = add(new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.05, 0.2), stripMat));
      strip.position.set(0, -0.2, 0.4);
      muzzle.position.set(0, 0.3, 0.6);
      break;
    }
    case 'tempest': { // V7.1: 積層コイル + 中心ロッドの重電撃砲
      const rod = add(new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.7, 8), steel));
      rod.rotation.x = Math.PI / 2;
      rod.position.z = 0.6;
      const coilMat = wpnMat('tempestCoil', { color: 0xd0e8ff, emissive: 0x88c0ff, emissiveIntensity: 2.0, metalness: 0.3, roughness: 0.25 });
      for (const z of [0.15, 0.45, 0.75, 1.05]) {
        const coil = add(new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.05, 8, 14), coilMat));
        coil.position.z = z;
      }
      const body = add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.34, 0.7), dark));
      body.position.z = -0.25;
      muzzle.position.set(0, 0, 1.5);
      break;
    }
    default:
      muzzle.position.set(0, 0, 0.8);
  }
  g.add(muzzle);
  return { group: g, muzzle };
}

// ============================================================
// MechModel: プリミティブ組み立てメカ
// (将来 glb に差し替えられるよう見た目をこのクラスに分離)
// ============================================================
class MechModel {
  /**
   * @param {object} colors {primary, secondary, dark, eye}
   */
  constructor(colors) {
    this.root = new THREE.Group();
    this.phase = 0;          // 歩行位相
    this.flashTime = 0;      // 被弾フラッシュ残時間
    this.flashColor = 0xffffff; // V7.0: フラッシュ色(被弾=白 / 回復=緑)
    this.flashOn = false;
    this.flashMats = [];     // フラッシュ対象マテリアル

    const matP = new THREE.MeshStandardMaterial({ color: colors.primary, metalness: 0.75, roughness: 0.35 });
    const matS = new THREE.MeshStandardMaterial({ color: colors.secondary, metalness: 0.65, roughness: 0.45 });
    const matD = new THREE.MeshStandardMaterial({ color: colors.dark, metalness: 0.8, roughness: 0.5 });
    const matEye = new THREE.MeshStandardMaterial({
      color: colors.eye, emissive: colors.eye, emissiveIntensity: 2.2, metalness: 0.2, roughness: 0.3,
    });
    this.flashMats.push(matP, matS, matD);

    const box = (w, h, d, mat) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.castShadow = true;
      return m;
    };
    const cyl = (rt, rb, h, mat, seg = 10) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
      m.castShadow = true;
      return m;
    };

    const HIP_Y = 1.7;

    // ---- 脚(腿 + 脛 + 足) ----
    const buildLeg = (sideX) => {
      const leg = new THREE.Group();
      leg.position.set(sideX, HIP_Y, 0);
      const hipJoint = cyl(0.26, 0.26, 0.5, matD);
      hipJoint.rotation.z = Math.PI / 2;
      leg.add(hipJoint);
      const thigh = box(0.42, 0.85, 0.5, matP);
      thigh.position.y = -0.48;
      leg.add(thigh);
      const shin = new THREE.Group();
      shin.position.y = -0.92;
      const knee = cyl(0.2, 0.2, 0.44, matD);
      knee.rotation.z = Math.PI / 2;
      shin.add(knee);
      const shinMesh = box(0.32, 0.78, 0.38, matS);
      shinMesh.position.y = -0.42;
      shin.add(shinMesh);
      const foot = box(0.5, 0.18, 0.85, matD);
      foot.position.set(0, -0.82, 0.14);
      shin.add(foot);
      leg.add(shin);
      leg.userData.shin = shin;
      return leg;
    };
    this.legL = buildLeg(0.5);
    this.legR = buildLeg(-0.5);
    this.root.add(this.legL, this.legR);

    // ---- 骨盤 ----
    const pelvis = box(1.15, 0.5, 0.8, matD);
    pelvis.position.y = HIP_Y + 0.22;
    this.root.add(pelvis);

    // ---- 胴体(上半身: 照準方向へ独立旋回) ----
    this.torso = new THREE.Group();
    this.torso.position.y = HIP_Y + 0.5;
    this.root.add(this.torso);

    const chest = box(1.7, 1.0, 1.05, matP);
    chest.position.y = 0.52;
    this.torso.add(chest);
    const chestPlate = box(1.2, 0.6, 0.18, matS);
    chestPlate.position.set(0, 0.55, 0.56);
    this.torso.add(chestPlate);
    const backpack = box(1.1, 0.8, 0.4, matD);
    backpack.position.set(0, 0.5, -0.65);
    this.torso.add(backpack);

    // ---- 頭(センサーアイ) ----
    const head = new THREE.Group();
    head.position.y = 1.28;
    const skull = box(0.6, 0.46, 0.66, matS);
    head.add(skull);
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.06), matEye);
    eye.position.set(0, 0.02, 0.34);
    head.add(eye);
    const antenna = cyl(0.02, 0.02, 0.4, matD, 6);
    antenna.position.set(0.22, 0.4, -0.1);
    head.add(antenna);
    this.torso.add(head);
    this.head = head;

    // ---- 肩 + 前腕(武器はハードポイントとして mountWeapons() で装着) ----
    const buildArm = (sideX) => {
      const shoulder = box(0.6, 0.66, 0.78, matP);
      shoulder.position.set(sideX, 0.82, 0);
      this.torso.add(shoulder);

      const arm = new THREE.Group();
      arm.position.set(sideX, 0.5, 0.1);
      const forearm = box(0.3, 0.3, 0.7, matS); // 短い前腕(武器の台座)
      forearm.position.z = 0.15;
      arm.add(forearm);
      this.torso.add(arm);
      return arm;
    };
    this.armL = buildArm(1.15);
    this.armR = buildArm(-1.15);

    // フォールバックマズル(武器未装着スロット用)
    this.fallbackMuzzle = new THREE.Object3D();
    this.fallbackMuzzle.position.set(0, 0.6, 1.0);
    this.torso.add(this.fallbackMuzzle);
    this.muzzles = [];
  }

  /**
   * 武器スロットを視覚装着(V6.7 ハードポイント / V6.8 付替え / V7.1 最大 4 スロット)
   * 配置: 両手(arm × 2)+ 両肩(shoulder × 2)。
   * arm 系が 3 つ以上などの偏った構成は、空いている肩(または手)へ振り分ける
   */
  mountWeapons(slots) {
    // 既存の装着武器を外す(ドックでの装備変更に対応)
    if (this.weaponGroups) {
      for (const g of this.weaponGroups) if (g.parent) g.parent.remove(g);
    }
    this.weaponGroups = [];
    this.muzzles = [];
    let armN = 0, shoulderN = 0;
    const mountArm = (group) => {
      const arm = armN === 0 ? this.armL : this.armR;
      armN++;
      group.position.set(0, 0, 0.35);
      arm.add(group);
    };
    const mountShoulder = (group) => {
      const sx = shoulderN === 0 ? 0.85 : -0.85;
      shoulderN++;
      group.position.set(sx, 1.5, -0.05);
      this.torso.add(group);
    };
    slots.forEach((key, i) => {
      const w = CONFIG.WEAPONS[key];
      if (!w) { this.muzzles[i] = this.fallbackMuzzle; return; }
      const { group, muzzle } = buildWeaponModel(key);
      // 希望マウントが満杯なら反対側へオーバーフロー(最大 4 スロット = 必ず収まる)
      if (w.mount === 'arm') {
        if (armN < 2) mountArm(group); else mountShoulder(group);
      } else {
        if (shoulderN < 2) mountShoulder(group); else mountArm(group);
      }
      this.weaponGroups.push(group);
      this.muzzles[i] = muzzle;
    });
  }

  /** フラッシュ開始(V7.0: 色/時間指定可。既定は被弾の白 0.09s) */
  flash(color = 0xffffff, dur = 0.09) { this.flashTime = dur; this.flashColor = color; }

  /** スロットのマズル(武器銃口の先端)のワールド座標を取得 */
  getMuzzleWorld(idx, out) {
    const m = this.muzzles[idx] || this.fallbackMuzzle;
    return m.getWorldPosition(out);
  }

  /**
   * 歩行/待機アニメーション更新
   * @param {number} speed01 0=待機, 1=全速(クラス最高速比。振幅に使用)
   * @param {boolean} backpedal 後ずさり中(歩行を逆再生)
   * @param {number} speedAbs 実速度 u/s(クラスで異なるためテンポはこちら)
   */
  update(dt, time, speed01, grounded, backpedal = false, speedAbs = 0) {
    // 歩行テンポは実速度に同期(低速メカの遅い歩幅)。後ずさりは逆再生
    this.phase += dt * (2 + speedAbs * 1.3) * (backpedal ? -1 : 1);
    const swing = Math.sin(this.phase) * 0.62 * speed01;
    const kneeL = Math.max(0, Math.sin(this.phase + 0.6)) * 0.55 * speed01;
    const kneeR = Math.max(0, Math.sin(this.phase + Math.PI + 0.6)) * 0.55 * speed01;

    if (grounded) {
      this.legL.rotation.x = swing;
      this.legR.rotation.x = -swing;
      this.legL.userData.shin.rotation.x = kneeL;
      this.legR.userData.shin.rotation.x = kneeR;
    } else {
      // 空中: 脚を畳む
      this.legL.rotation.x = lerpAngle(this.legL.rotation.x, -0.5, dt * 8);
      this.legR.rotation.x = lerpAngle(this.legR.rotation.x, -0.5, dt * 8);
      this.legL.userData.shin.rotation.x = lerpAngle(this.legL.userData.shin.rotation.x, 0.9, dt * 8);
      this.legR.userData.shin.rotation.x = lerpAngle(this.legR.userData.shin.rotation.x, 0.9, dt * 8);
    }

    // 上下ボブ + 待機時の呼吸の微動
    this.root.position.y = Math.abs(Math.sin(this.phase)) * 0.16 * speed01
      + Math.sin(time * 1.8) * 0.025 * (1 - speed01);

    // 腕の連動(歩行で僅かに上下)
    this.armL.rotation.x = -swing * 0.18;
    this.armR.rotation.x = swing * 0.18;

    // フラッシュ(被弾=白 / V7.0 回復=緑など。flashColor で着色)
    if (this.flashTime > 0) {
      this.flashTime -= dt;
      if (!this.flashOn) {
        const fc = this.flashColor || 0xffffff;
        for (const m of this.flashMats) { m.emissive.setHex(fc); m.emissiveIntensity = 0.85; }
        this.flashOn = true;
      }
      if (this.flashTime <= 0 && this.flashOn) {
        for (const m of this.flashMats) { m.emissive.setHex(0x000000); m.emissiveIntensity = 1; }
        this.flashOn = false;
      }
    }
  }
}

// ============================================================
// GlbMechModel: Meshy 製 glb 機体(スキンメッシュ + 歩行アニメ)
//   MechModel と同一インターフェース:
//     root / torso / update(dt, time, speed01, grounded)
//     getMuzzleWorld(idx, out) / flash()
//   Robot 側は torso.rotation.y に旋回差分を書き込むだけ(従来通り)。
//   本クラスが mixer.update() の後に Spine ボーンへ分配する。
// ============================================================
class GlbMechModel {
  /**
   * @param {object} gltf GLTFLoader.parse の結果(scene + animations)。
   *                      敵 3 機は同じ glb を機体数ぶん parse して渡す
   *                      (スキンメッシュの自前クローンより確実なため)。
   */
  constructor(gltf, scaleMul = 1) {
    this.root = new THREE.Group();
    const scene = gltf.scene; // root は 'Armature'
    this.totalScale = CONFIG.MECH_SCALE * scaleMul; // 基準 0.9 × クラススケール
    scene.scale.setScalar(this.totalScale);
    this.root.add(scene);

    // Robot が rotation.y を書き込むダミー(実际の反映は update 内で Spine へ)
    this.torso = new THREE.Object3D();

    this.flashTime = 0;
    this.flashColor = 0xffffff; // V7.0: フラッシュ色(被弾=白 / 回復=緑)
    this.flashOn = false;
    this.flashMats = [];
    this.baseEmissive = [];
    this.baseEmissiveIntensity = [];
    this.bones = {};

    scene.traverse((o) => {
      if (o.isBone) this.bones[o.name] = o;
      if (o.isMesh || o.isSkinnedMesh) {
        o.castShadow = true;
        if (o.material) {
          // 機体ごとにマテリアルを独立(被弾フラッシュが他機に波及しないように)
          o.material = o.material.clone();
          this.flashMats.push(o.material);
          this.baseEmissive.push(o.material.emissive ? o.material.emissive.getHex() : 0x000000);
          this.baseEmissiveIntensity.push(o.material.emissiveIntensity !== undefined ? o.material.emissiveIntensity : 1);
        }
      }
    });

    // 上半身旋回の分配先(各 50%)
    this.spine1 = this.bones['Spine01'] || null;
    this.spine2 = this.bones['Spine02'] || null;

    // フォールバックマズル(ボーン欠落時の保険: 胸前方)
    this.fallbackMuzzle = new THREE.Object3D();
    this.fallbackMuzzle.position.set(0, 2.5, 1.0);
    this.root.add(this.fallbackMuzzle);
    this.muzzles = [];

    // 歩行クリップを常時再生(timeScale で速度同期)
    // 注: トラック名が 'Armature|...' 形式でも解決できるよう、
    //     mixer は Armature を含む gltf.scene を root にして作る
    this.mixer = new THREE.AnimationMixer(scene);
    this.clipDuration = 1;
    if (gltf.animations && gltf.animations.length > 0) {
      const clip = gltf.animations[0]; // 'Armature|walking_man|baselayer'
      this.clipDuration = clip.duration || 1;
      this.mixer.clipAction(clip).play();
    }
    this.timeScale = CONFIG.IDLE_ANIM_SPEED;
  }

  /**
   * 武器スロットを視覚装着(V6.7 ハードポイント / V6.8: 付替え対応 /
   * V6.9.1: ボーンフォロワー方式)
   *
   * 【V6.9.1 バグ修正の背景】
   * Meshy glb の Armature ノードには scale = 0.01(cm→m 変換の FBX 由来リグ)が
   * 入っており、ボーンの translation は cm 単位(例: Hips y=221.9)。そのため
   * ボーンのワールドスケールは 0.01 × MECH_SCALE ≈ 0.009 で、ボーンの「子」に
   * add した武器モデル(設計サイズ ~1.2 ワールド単位)は 1/100(約 1cm)に
   * 縮んで事実上不可視だった。マズル(位置参照のみの Object3D)はスケールの
   * 影響を受けないため V6.3〜V6.8 では発覚しなかった。
   *
   * 【方式】武器はボーンの子にせず、root 直下の weaponRig(等倍)に置き、
   * 毎フレーム syncWeapons() でボーンのワールド座標へ追従させる。
   * これでワールドスケール正常 + 武器は常に照準方向(+Z 基準)を向く。
   *
   * 【数値検証】(mech_player glb 実測: Armature s=0.01 / Hips t.y=221.9cm)
   *   腰: 221.9cm × 0.01 × MECH_SCALE(0.9) ≈ 2.0 ワールド単位
   *   肩: ~252-268cm(回転無視の鎖長)→ レスト姿勢で ≈ 2.2
   *   手: 腕の下げ回転込みで y ≈ 1.5-2.2 / x ≈ ±0.7-1.2
   *   → 機体高 ~3.6 に対して妥当なハードポイント位置になる
   *
   * arm = Left/RightHand ボーン / shoulder = Right/LeftShoulder ボーン上方。
   * ボーン欠落時は weaponRig に固定配置(プリミティブ同等の位置)
   */
  mountWeapons(slots) {
    // 等倍の武器リグ(Armature の 0.01 スケールを回避する置き場)
    if (!this.weaponRig) {
      this.weaponRig = new THREE.Group();
      this.root.add(this.weaponRig);
    }
    // 既存の装着武器を外す(ドックでの装備変更に対応)
    if (this.weaponGroups) {
      for (const g of this.weaponGroups) if (g.parent) g.parent.remove(g);
    }
    this.weaponGroups = [];
    this.muzzles = [];
    this.followers = []; // { obj, bone, lift, fwd } — 毎フレーム追従
    let armN = 0, shoulderN = 0;
    // V7.1: 最大 4 スロット = 両手 + 両肩。希望マウント満杯時は反対側へオーバーフロー
    const takeArm = () => {
      const bone = this.bones[armN === 0 ? 'LeftHand' : 'RightHand'];
      armN++;
      return { bone, lift: 0.04, fwd: 0.3 }; // 手の中心 → グリップ上面 / 銃身を少し前へ
    };
    const takeShoulder = () => {
      const bone = this.bones[shoulderN === 0 ? 'RightShoulder' : 'LeftShoulder'];
      shoulderN++;
      return { bone, lift: 0.5, fwd: 0.1 }; // 肩上部マウント
    };
    slots.forEach((key, i) => {
      const w = CONFIG.WEAPONS[key];
      if (!w) { this.muzzles[i] = this.fallbackMuzzle; return; }
      const { group, muzzle } = buildWeaponModel(key);
      const pt = (w.mount === 'arm')
        ? (armN < 2 ? takeArm() : takeShoulder())
        : (shoulderN < 2 ? takeShoulder() : takeArm());
      this.weaponRig.add(group);
      if (pt.bone) {
        this.followers.push({ obj: group, bone: pt.bone, lift: pt.lift, fwd: pt.fwd });
      } else {
        // ボーン欠落時の保険: 機体ローカルの固定位置
        group.position.set(armN > 0 ? 0.8 : -0.8, 2.6, 0.5);
      }
      this.weaponGroups.push(group);
      this.muzzles[i] = muzzle;
    });
    this.syncWeapons(); // 装着直後から正しい位置(ドックの静止プレビュー対応)
  }

  /**
   * 武器をボーンへ追従(mixer.update + Spine ひねりの「後」に毎フレーム呼ぶ)。
   * 位置: bone ワールド座標 → weaponRig(等倍)ローカルへ変換 + オフセット。
   * 向き: 常に上半身の照準方向(Spine に適用した twist と同じ yaw)・水平。
   */
  syncWeapons() {
    if (!this.followers || this.followers.length === 0) return;
    const twist = clamp(this.torso.rotation.y, -CONFIG.TORSO_BONE_CLAMP, CONFIG.TORSO_BONE_CLAMP);
    const sinT = Math.sin(twist), cosT = Math.cos(twist);
    this.weaponRig.updateWorldMatrix(true, false); // worldToLocal 用に最新化
    for (const f of this.followers) {
      f.bone.getWorldPosition(_wpnFollow);    // ボーン(0.01 スケール込み)のワールド座標
      this.weaponRig.worldToLocal(_wpnFollow); // 等倍リグのローカルへ
      f.obj.position.set(
        _wpnFollow.x + sinT * f.fwd,
        _wpnFollow.y + f.lift,
        _wpnFollow.z + cosT * f.fwd,
      );
      f.obj.rotation.set(0, twist, 0); // 照準方向(水平)
    }
  }

  /** フラッシュ開始(V7.0: 色/時間指定可。既定は被弾の白 0.09s) */
  flash(color = 0xffffff, dur = 0.09) { this.flashTime = dur; this.flashColor = color; }

  /** スロットのマズル(武器銃口の先端)のワールド座標を取得 */
  getMuzzleWorld(idx, out) {
    const m = this.muzzles[idx] || this.fallbackMuzzle;
    return m.getWorldPosition(out);
  }

  /**
   * アニメ更新(MechModel と同一シグネチャ)
   * @param {number} speed01 0=待機, 1=全速(クラス最高速比)
   * @param {boolean} backpedal 後ずさり中(歩行クリップを逆再生)
   * @param {number} speedAbs 実速度 u/s
   */
  update(dt, time, speed01, grounded, backpedal = false, speedAbs = 0) {
    // ---- timeScale を実移動速度に同期(歩幅スリップ防止) ----
    //   アニメは scale 適用後 1 サイクルで WALK_CYCLE_SPEED × totalScale 移動する想定。
    //   timeScale = 実速度 × クリップ長 / サイクル移動量。後ずさりは負(逆再生)
    let target;
    if (!grounded) {
      target = 0; // 空中: 脚を止める
    } else if (speed01 < 0.05) {
      target = CONFIG.IDLE_ANIM_SPEED; // 待機: 微動
    } else {
      target = speedAbs * this.clipDuration / (CONFIG.WALK_CYCLE_SPEED * this.totalScale);
      if (backpedal) target = -target;
    }
    this.timeScale += (target - this.timeScale) * Math.min(1, dt * CONFIG.ANIM_BLEND_RATE);
    this.mixer.timeScale = this.timeScale;
    this.mixer.update(dt);

    // ---- 上半身旋回: mixer の後に Spine01/Spine02 へ分配加算(各 50%) ----
    const twist = clamp(this.torso.rotation.y, -CONFIG.TORSO_BONE_CLAMP, CONFIG.TORSO_BONE_CLAMP);
    if (this.spine1) this.spine1.rotateY(twist * 0.5);
    if (this.spine2) this.spine2.rotateY(twist * 0.5);
    else if (this.spine1) this.spine1.rotateY(twist * 0.5); // Spine02 が無い場合は全量を Spine01 へ

    // ---- 武器のボーン追従(V6.9.1: mixer + Spine ひねり適用後の最終姿勢に同期) ----
    this.syncWeapons();

    // ---- フラッシュ(被弾=白 / V7.0 回復=緑。flashColor で着色) ----
    if (this.flashTime > 0) {
      this.flashTime -= dt;
      if (!this.flashOn) {
        const fc = this.flashColor || 0xffffff;
        for (const m of this.flashMats) {
          if (m.emissive) { m.emissive.setHex(fc); m.emissiveIntensity = 0.85; }
        }
        this.flashOn = true;
      }
      if (this.flashTime <= 0 && this.flashOn) {
        for (let i = 0; i < this.flashMats.length; i++) {
          const m = this.flashMats[i];
          if (m.emissive) {
            m.emissive.setHex(this.baseEmissive[i]);
            m.emissiveIntensity = this.baseEmissiveIntensity[i];
          }
        }
        this.flashOn = false;
      }
    }
  }
}

// ============================================================
// Robot: メカの実体(物理 + ステータス)
//   V6.6: 機体クラス(MECH_CLASSES)ベース。isPlayer フラグで一元管理
//   (将来の P2P 複数参加でも robots[] に追加するだけで成立する構造)
// ============================================================
const CHEST_Y_BASE = 2.7; // 基準胸高(クラス scale で伸縮)

class Robot {
  /**
   * @param {object} cls  CONFIG.MECH_CLASSES のエントリ
   * @param {string} name 表示名(プレイヤーは 'YOU')
   * @param {object|null} gltf ロード済み glb(null ならクラス色のプリミティブ)
   * @param {boolean} isPlayer
   * @param {string[]} slots 武器スロット 2 つ(省略時はクラス既定)
   */
  constructor(scene, cls, name, gltf = null, isPlayer = false, slots = null) {
    this.cls = cls;
    this.isPlayer = isPlayer;
    this.model = gltf
      ? new GlbMechModel(gltf, cls.scale)
      : new MechModel({ ...cls.colors, eye: isPlayer ? 0x66ddff : 0xff5544 });
    if (!gltf) this.model.root.scale.setScalar(cls.scale); // プリミティブもクラスでスケール
    this.group = new THREE.Group();
    this.group.add(this.model.root);
    scene.add(this.group);

    // クラス由来のステータス
    this.maxHp = cls.hp;
    this.maxSpeed = cls.speed;
    this.radius = CONFIG.MECH_RADIUS * cls.scale;   // 衝突半径
    this.chestY = CHEST_Y_BASE * cls.scale;         // 胸高(照準/被弾点)
    // 武器スロット(V7.1: ハードポイント制。スロット数 = cls.hardpoints.length)
    const slotCount = cls.hardpoints.length;
    this.slots = (slots && slots.length === slotCount) ? [...slots] : [...cls.weapons];
    this.slotCd = new Array(slotCount).fill(0);
    this.model.mountWeapons(this.slots);
    this.ability = cls.ability;                      // 'sprint' | 'shield'
    this.abilityCd = 0;
    this.sprintT = 0;
    this.shieldT = 0;
    this.lastAttacker = null;  // FFA ヘイト用
    this.lastAttackT = -99;

    // エネルギーシールドの見た目(前面の発光円弧。lazy ではなく常設・非表示)
    if (this.ability === 'shield') {
      const geo = new THREE.CylinderGeometry(
        CONFIG.SHIELD_RADIUS, CONFIG.SHIELD_RADIUS, CONFIG.SHIELD_HEIGHT,
        16, 1, true, -0.85, 1.7, // 前面 ~97° の円弧
      );
      this.shieldMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
        color: 0x66ddff, transparent: true, opacity: 0.28,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      }));
      this.shieldMesh.visible = false;
      scene.add(this.shieldMesh);
    } else {
      this.shieldMesh = null;
    }

    this.name = name;
    this.yaw = 0;        // 下半身(移動方向)
    this.torsoYaw = 0;   // 上半身(照準方向)
    this.velY = 0;
    this.velX = 0;       // 水平速度(加速度モデル)
    this.velZ = 0;
    this.justLanded = false; // 着地した瞬間のフラグ(土煙/シェイク用)
    this.grounded = true;
    this.hp = this.maxHp;
    this.heat = 0;
    this.overheated = false;
    this.jumpCd = 0;         // ジャンプのクールダウン
    this.alive = true;
    this.deathT = -1;        // 撃破演出タイマー
    this.speed01 = 0;        // アニメ用移動量(クラス最高速比)
    this.speedAbs = 0;       // 実速度 u/s
    this.stepAcc = 0;        // 足音用の移動距離アキュムレータ
    this.backpedal = false;  // 後ずさり中(歩行アニメ逆再生)
    this.bank = 0;           // 旋回バンク(曲がる時だけ僅かに傾く)
    this._prevTorsoYaw = 0;  // バンク計算用(照準の角速度)
    // V7.0: チャージ式テレグラフ(RAILGUN / V7.1 TEMPEST。スロットごと)。t>0 でチャージ中
    this.chargeT = new Array(slotCount).fill(0); // 残りチャージ時間(s)
    this.chargeSlot = -1;    // 現在チャージ中のスロット(-1 = なし)
    // V7.1: TEMPEST 持続ビーム状態
    this.beamT = 0;          // 残り照射時間(s)
    this.beamSlot = -1;      // 照射中のスロット
    this.beamTarget = null;  // AI の照射対象(プレイヤーは null = 照準方向)
    this.beamTick = 0;       // 次の damage tick までの時間
    // V7.1: ノックバック速度(REPULSOR。指数減衰)
    this.kbX = 0;
    this.kbZ = 0;
  }

  get position() { return this.group.position; }

  /** 胸(照準点)のワールド座標(クラス scale 反映) */
  chest(out) {
    out.copy(this.group.position);
    out.y += this.chestY;
    return out;
  }

  /** スプリント込みの現在の目標最高速(V7.1: TEMPEST 照射中は減速) */
  get effectiveSpeed() {
    let s = this.maxSpeed * (this.sprintT > 0 ? CONFIG.SPRINT_MUL : 1);
    if (this.beamT > 0) {
      const w = CONFIG.WEAPONS[this.slots[this.beamSlot]];
      s *= (w && w.slowMul) || 0.7;
    }
    return s;
  }

  /** アビリティ発動(成功したら true) */
  useAbility() {
    if (!this.alive || this.abilityCd > 0) return false;
    if (this.ability === 'sprint') {
      this.sprintT = CONFIG.SPRINT_DURATION;
      this.abilityCd = CONFIG.SPRINT_CD;
    } else {
      this.shieldT = CONFIG.SHIELD_DURATION;
      this.abilityCd = CONFIG.SHIELD_CD;
    }
    return true;
  }

  /**
   * 加速度モデルで移動(急停止しない・踏み出しに溜め)。
   * dirX/dirZ: 正規化済み移動方向(0,0 で減速停止) / targetSpeed: 目標速度
   */
  applyMove(dirX, dirZ, targetSpeed, dt, obstacles) {
    const tx = dirX * targetSpeed, tz = dirZ * targetSpeed;
    const ax = tx - this.velX, az = tz - this.velZ;
    const al = Math.hypot(ax, az);
    const maxA = CONFIG.MECH_ACCEL * dt * (this.sprintT > 0 ? 1.6 : 1);
    if (al > maxA) {
      this.velX += ax / al * maxA;
      this.velZ += az / al * maxA;
    } else {
      this.velX = tx;
      this.velZ = tz;
    }
    const v = Math.hypot(this.velX, this.velZ);
    if (v > 0.02) {
      this.moveWithCollision(this.velX * dt, this.velZ * dt, obstacles);
    }
    this.speedAbs = v;                                   // 実速度(テンポ/足音)
    this.speed01 = Math.min(1, v / this.maxSpeed);       // クラス比(振幅)
    return v;
  }

  /** 円 vs AABB の押し出しで障害物衝突を解決しつつ移動 */
  moveWithCollision(dx, dz, obstacles) {
    const p = this.position;
    p.x += dx; p.z += dz;
    const r = this.radius;
    for (const o of obstacles) {
      if (p.y > o.height - 0.4) continue; // 上空は通過可
      if (o.minY !== undefined && p.y + 2.0 < o.minY) continue; // 頭上の障害物(橋の欄干など)は通過可
      const cx = clamp(p.x, o.minX, o.maxX);
      const cz = clamp(p.z, o.minZ, o.maxZ);
      let ddx = p.x - cx, ddz = p.z - cz;
      const d2 = ddx * ddx + ddz * ddz;
      if (d2 < r * r) {
        const d = Math.sqrt(d2);
        if (d < 1e-5) { ddx = 1; ddz = 0; }
        else { ddx /= d; ddz /= d; }
        const push = r - d;
        p.x += ddx * push;
        p.z += ddz * push;
      }
    }
    p.x = clamp(p.x, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT);
    p.z = clamp(p.z, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT);
  }

  /** ジャンプ(クールダウン付き。成功したら true) */
  jump() {
    if (!this.grounded || !this.alive || this.jumpCd > 0) return false;
    this.velY = CONFIG.JUMP_VELOCITY;
    this.grounded = false;
    this.jumpCd = CONFIG.JUMP_COOLDOWN;
    return true;
  }

  /** スロット i の武器が発射可能か(熱武器はオーバーヒートも考慮) */
  canFireSlot(i) {
    if (!this.alive || this.slotCd[i] > 0) return false;
    const w = CONFIG.WEAPONS[this.slots[i]];
    if (!w) return false;
    if (w.heat && this.overheated) return false;
    return true;
  }

  /** スロット i の発射を登録(クールダウン + 熱共有ゲージ) */
  registerSlotShot(i) {
    const w = CONFIG.WEAPONS[this.slots[i]];
    if (!w) return;
    this.slotCd[i] = w.interval || w.cd || 0.5;
    if (w.heat) {
      this.heat += w.heat;
      if (this.heat >= CONFIG.HEAT_MAX) {
        this.heat = CONFIG.HEAT_MAX;
        this.overheated = true;
      }
    }
  }

  /** ダメージ適用。死亡したら true */
  takeDamage(amount) {
    if (!this.alive) return false;
    this.hp = Math.max(0, this.hp - amount);
    this.model.flash();
    return this.hp <= 0;
  }

  update(dt, time) {
    // 重力 + 支持面(地形 + 橋デッキ)への接地
    const p = this.position;
    if (!this.grounded) {
      this.velY += CONFIG.GRAVITY * dt;
      p.y += this.velY * dt;
      const sup = getSupportHeight(p.x, p.z, p.y);
      if (p.y <= sup && this.velY <= 0) {
        p.y = sup;
        this.velY = 0;
        this.grounded = true;
        this.justLanded = true; // 着地演出(土煙/シェイク)を Game 側で発火
      }
    } else {
      // 接地中は地形に追従(クレーター/運河/橋を滑らかに昇降)
      const sup = getSupportHeight(p.x, p.z, p.y);
      if (sup < p.y - 0.7) {
        // 橋の縁などから踏み外した → 落下開始
        this.grounded = false;
        this.velY = 0;
      } else {
        p.y = sup;
      }
    }
    // 武器熱の冷却 + 各クールダウン(V7.1: TEMPEST 照射中は冷却しない)
    if (this.beamT <= 0) {
      this.heat = Math.max(0, this.heat - CONFIG.HEAT_COOL_RATE * dt);
    }
    if (this.overheated && this.heat <= CONFIG.HEAT_RECOVER_TO) this.overheated = false;
    for (let i = 0; i < this.slotCd.length; i++) this.slotCd[i] = Math.max(0, this.slotCd[i] - dt);
    this.jumpCd = Math.max(0, this.jumpCd - dt);
    // V7.0: チャージ予兆の減算(発射判定は Game 側。死亡で中断)
    if (this.chargeSlot >= 0) {
      if (!this.alive) { this.chargeSlot = -1; this.chargeT.fill(0); }
      else this.chargeT[this.chargeSlot] = Math.max(0, this.chargeT[this.chargeSlot] - dt);
    }

    // アビリティ(スプリント / シールド)
    this.abilityCd = Math.max(0, this.abilityCd - dt);
    this.sprintT = Math.max(0, this.sprintT - dt);
    this.shieldT = Math.max(0, this.shieldT - dt);
    if (this.shieldMesh) {
      const on = this.shieldT > 0 && this.alive;
      this.shieldMesh.visible = on;
      if (on) {
        // 機体前面(照準方向)に追従 + 揺らぎ
        this.shieldMesh.position.copy(this.position);
        this.shieldMesh.position.y += this.chestY * 0.85;
        this.shieldMesh.rotation.y = this.torsoYaw;
        this.shieldMesh.material.opacity = 0.22 + 0.1 * Math.sin(time * 9)
          + (this.shieldT < 0.8 ? -0.1 : 0); // 終了間際は薄く
      }
    }

    // 向きの反映(下半身=移動方向 / 上半身=照準方向)
    this.group.rotation.y = this.yaw;
    this.model.torso.rotation.y = clamp(normalizeAngle(this.torsoYaw - this.yaw), -2.4, 2.4);

    // 旋回バンク(照準の角速度に応じて曲がる時だけ内側へ僅かに傾く)
    if (dt > 1e-4) {
      const yawRate = normalizeAngle(this.torsoYaw - this._prevTorsoYaw) / dt;
      const bankTarget = (this.alive && this.grounded)
        ? clamp(-yawRate * CONFIG.TURN_BANK_GAIN, -CONFIG.TURN_BANK_MAX, CONFIG.TURN_BANK_MAX)
        : 0;
      this.bank += (bankTarget - this.bank) * Math.min(1, dt * CONFIG.BANK_SMOOTH);
    }
    this._prevTorsoYaw = this.torsoYaw;

    // 撃破演出: 傾いて倒れる(死亡中はバンク無効 = 転倒ロールと干渉させない)
    if (this.deathT >= 0) {
      this.deathT += dt;
      this.model.root.rotation.z = Math.min(1.35, this.deathT * 2.4);
      this.model.root.position.y = -Math.min(0.6, this.deathT * 0.8);
    } else {
      this.model.root.rotation.z = this.bank;
    }
    this.model.update(dt, time, this.speed01, this.grounded, this.backpedal, this.speedAbs);
  }

  reset(x, z, yaw) {
    this.position.set(x, getGroundHeight(x, z), z);
    this.yaw = yaw;
    this.torsoYaw = yaw;
    this.velY = 0;
    this.velX = 0;
    this.velZ = 0;
    this.justLanded = false;
    this.grounded = true;
    this.hp = this.maxHp;
    this.heat = 0;
    this.overheated = false;
    this.slotCd.fill(0);
    this.jumpCd = 0;
    this.alive = true;
    this.deathT = -1;
    this.speed01 = 0;
    this.speedAbs = 0;
    this.stepAcc = 0;
    this.backpedal = false;
    this.bank = 0;
    this._prevTorsoYaw = yaw;
    this.abilityCd = 0;
    this.sprintT = 0;
    this.shieldT = 0;
    this.lastAttacker = null;
    this.lastAttackT = -99;
    this.chargeT.fill(0);
    this.chargeSlot = -1;
    this.beamT = 0;
    this.beamSlot = -1;
    this.beamTarget = null;
    this.beamTick = 0;
    this.kbX = 0;
    this.kbZ = 0;
    if (this.shieldMesh) this.shieldMesh.visible = false;
    this.model.root.rotation.z = 0;
    this.model.root.position.y = 0;
    this.group.visible = true;
  }
}

// ============================================================
// ParticlePool: 火花/爆発/煙トレイルのプール(毎フレーム new しない)
// ============================================================
class ParticlePool {
  constructor(scene) {
    this.items = [];
    this.cursor = 0;
    const geo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    for (let i = 0; i < CONFIG.PARTICLE_POOL; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({
        mesh, vel: new THREE.Vector3(),
        life: 0, maxLife: 1, gravity: 0, scale: 1,
      });
    }
  }

  /**
   * パーティクル発生
   * @param {number} boost 色の HDR ブースト(>1 でブルームに乗る)
   * @param {string} blending 'add' | 'normal'(黒煙などは normal)
   */
  spawn(pos, count, { color = 0xffaa44, speed = 8, life = 0.5, gravity = -10, scale = 1, upBias = 0.4, boost = 1, blending = 'add' } = {}) {
    for (let i = 0; i < count; i++) {
      const p = this.items[this.cursor];
      this.cursor = (this.cursor + 1) % this.items.length;
      p.mesh.visible = true;
      p.mesh.position.copy(pos);
      p.mesh.material.color.setHex(color);
      if (boost !== 1) p.mesh.material.color.multiplyScalar(boost);
      p.mesh.material.blending = blending === 'normal' ? THREE.NormalBlending : THREE.AdditiveBlending;
      p.mesh.material.opacity = 1;
      p.vel.set(
        (rng() - 0.5) * 2 * speed,
        (rng() - 0.5 + upBias) * 2 * speed,
        (rng() - 0.5) * 2 * speed,
      );
      p.life = p.maxLife = life * (0.6 + rng() * 0.6);
      p.gravity = gravity;
      p.scale = scale * (0.6 + rng() * 0.8);
    }
  }

  update(dt) {
    for (const p of this.items) {
      if (p.life <= 0) continue;
      p.life -= dt;
      if (p.life <= 0) { p.mesh.visible = false; p.mesh.material.opacity = 0; continue; }
      p.vel.y += p.gravity * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      const k = p.life / p.maxLife;
      p.mesh.material.opacity = k;
      p.mesh.scale.setScalar(p.scale * (0.4 + k * 0.8));
    }
  }

  clear() {
    for (const p of this.items) { p.life = 0; p.mesh.visible = false; }
  }
}

// ============================================================
// BeamPool: ビーム描画のプール(加算合成の細長ボックス)
// ============================================================
class BeamPool {
  constructor(scene) {
    this.items = [];
    this.cursor = 0;
    const geo = new THREE.BoxGeometry(0.09, 0.09, 1);
    geo.translate(0, 0, 0.5); // 原点を始端に
    for (let i = 0; i < CONFIG.BEAM_POOL; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x88eaff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({ mesh, life: 0 });
    }
  }

  /**
   * @param {number} thickness 太さ係数(コア 0.3〜0.55 / グロー 0.7〜1.6)
   * @param {number} boost 色の HDR ブースト(>1 でブルームが光の筋にする)
   */
  fire(start, end, color, thickness = 1, boost = 1) {
    const b = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    b.mesh.visible = true;
    b.mesh.position.copy(start);
    b.mesh.lookAt(end);
    b.mesh.scale.set(thickness, thickness, Math.max(0.1, start.distanceTo(end)));
    b.mesh.material.color.setHex(color);
    if (boost !== 1) b.mesh.material.color.multiplyScalar(boost);
    b.life = CONFIG.BEAM_LIFE;
  }

  update(dt) {
    for (const b of this.items) {
      if (b.life <= 0) continue;
      b.life -= dt;
      if (b.life <= 0) { b.mesh.visible = false; b.mesh.material.opacity = 0; continue; }
      b.mesh.material.opacity = (b.life / CONFIG.BEAM_LIFE) * 0.95;
    }
  }

  clear() {
    for (const b of this.items) { b.life = 0; b.mesh.visible = false; }
  }
}

// ============================================================
// LightPool: 着弾点の PointLight(最大4個・使い回し)
// ============================================================
class LightPool {
  constructor(scene) {
    this.items = [];
    this.cursor = 0;
    for (let i = 0; i < CONFIG.LIGHT_POOL; i++) {
      const light = new THREE.PointLight(0xffaa44, 0, 16, 2);
      scene.add(light);
      this.items.push({ light, life: 0 });
    }
  }

  spawn(pos, color, intensity = 30) {
    const l = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    l.light.position.copy(pos);
    l.light.color.setHex(color);
    l.light.intensity = intensity;
    l.life = 0.12;
  }

  update(dt) {
    for (const l of this.items) {
      if (l.life <= 0) continue;
      l.life -= dt;
      if (l.life <= 0) { l.light.intensity = 0; continue; }
      l.light.intensity *= Math.exp(-14 * dt);
    }
  }
}

// ============================================================
// RingPool: 拡張する衝撃波リング(加算合成 RingGeometry のスケールアニメ)
//   mode 'ground' = 地面に水平(爆発) / 'billboard' = カメラ向き(着弾)
// ============================================================
class RingPool {
  constructor(scene, camera) {
    this.camera = camera;
    this.items = [];
    this.cursor = 0;
    const geo = new THREE.RingGeometry(0.7, 1, 28);
    for (let i = 0; i < CONFIG.RING_POOL; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffcc88, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({ mesh, life: 0, maxLife: 1, scaleTarget: 5 });
    }
  }

  /**
   * @param {object} opts {color, scale(最終半径), life, mode:'ground'|'billboard', boost, y(高さ上書き)}
   */
  spawn(pos, { color = 0xffcc88, scale = 6, life = 0.4, mode = 'ground', boost = 1.5, y = null } = {}) {
    const r = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    r.mesh.position.copy(pos);
    if (y !== null) r.mesh.position.y = y;
    if (mode === 'ground') {
      r.mesh.rotation.set(-Math.PI / 2, 0, 0);
    } else {
      r.mesh.rotation.set(0, 0, 0);
      r.mesh.lookAt(this.camera.position); // 着弾リングはカメラへ正対
    }
    r.mesh.material.color.setHex(color);
    if (boost !== 1) r.mesh.material.color.multiplyScalar(boost);
    r.life = r.maxLife = life;
    r.scaleTarget = scale;
    r.mesh.scale.setScalar(0.3);
    r.mesh.visible = true;
  }

  update(dt) {
    for (const r of this.items) {
      if (r.life <= 0) continue;
      r.life -= dt;
      if (r.life <= 0) { r.mesh.visible = false; r.mesh.material.opacity = 0; continue; }
      const k = 1 - r.life / r.maxLife;
      const ease = 1 - (1 - k) * (1 - k); // ease-out で勢いよく広がる
      r.mesh.scale.setScalar(0.3 + ease * r.scaleTarget);
      r.mesh.material.opacity = (1 - k) * 0.85;
    }
  }

  clear() {
    for (const r of this.items) { r.life = 0; r.mesh.visible = false; }
  }
}

// ============================================================
// DamageTextPool: フローティングダメージ数値(DOM)
// ============================================================
class DamageTextPool {
  constructor(layerEl) {
    this.items = [];
    this.cursor = 0;
    for (let i = 0; i < CONFIG.DMG_TEXT_POOL; i++) {
      const el = document.createElement('div');
      el.className = 'dmg-pop';
      layerEl.appendChild(el);
      this.items.push({ el, world: new THREE.Vector3(), age: -1 });
    }
  }

  show(worldPos, text, isHurt) {
    const t = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    t.world.copy(worldPos);
    t.world.x += (rng() - 0.5) * 1.2;
    t.world.y += rng() * 0.8;
    t.age = 0;
    t.el.textContent = text;
    t.el.classList.toggle('hurt', !!isHurt);
    t.el.style.display = 'block';
  }

  update(dt, camera, w, h) {
    for (const t of this.items) {
      if (t.age < 0) continue;
      t.age += dt;
      if (t.age > 0.9) { t.age = -1; t.el.style.display = 'none'; continue; }
      _proj.copy(t.world).project(camera);
      if (_proj.z > 1) { t.el.style.display = 'none'; continue; }
      const x = (_proj.x * 0.5 + 0.5) * w;
      const y = (-_proj.y * 0.5 + 0.5) * h - t.age * 70;
      t.el.style.display = 'block';
      t.el.style.transform = `translate(-50%,-50%) translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      t.el.style.opacity = String(1 - t.age / 0.9);
    }
  }

  clear() {
    for (const t of this.items) { t.age = -1; t.el.style.display = 'none'; }
  }
}

// ============================================================
// MissilePool: 4連装ホーミングミサイル(プール制・時間差発射)
// ============================================================
class MissilePool {
  constructor(scene, game) {
    this.game = game;
    this.items = [];
    this.cursor = 0;
    this.pending = [];  // 時間差発射キュー(サルボ)
    const geo = new THREE.ConeGeometry(0.14, 0.6, 8);
    geo.rotateX(Math.PI / 2); // 先端を +z に
    const mat = new THREE.MeshBasicMaterial({ color: 0xffe2b0 });
    for (let i = 0; i < CONFIG.MISSILE_POOL; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({
        mesh,
        vel: new THREE.Vector3(),
        prev: new THREE.Vector3(),
        target: null,
        life: 0,
        armed: 0,       // 無誘導時間(山なり軌道)
        smoke: 0,       // 煙トレイル間隔
        fromPlayer: false,
      });
    }
  }

  /**
   * サルボを時間差で発射キューに積む(slot = ポッドのスロット番号)。
   * V7.1: opts でサルボ特性を上書き(SWARM のマイクロロケット対応)
   *   { count, dmgMin, dmgMax, turn, speed, armTime, sfx, flat }
   *   flat: true で前方初速主体(SWARM。target null なら無誘導の直進弾)
   */
  fireSalvo(shooter, target, slot = 0, opts = null) {
    const count = (opts && opts.count) || CONFIG.MISSILE_SALVO;
    for (let i = 0; i < count; i++) {
      this.pending.push({
        delay: i * 0.12,
        shooter, target, slot, opts,
        side: (i % 2 === 0) ? 1 : -1,
      });
    }
    this.game.sound.playAt((opts && opts.sfx) || 'missile', shooter.position, 18);
  }

  /** 1発を発射(肩のミサイルポッド銃口から上方初速で射出) */
  launch(req) {
    const m = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    const shooter = req.shooter;
    const o = req.opts;

    // 発射位置: 装着ポッドの銃口 + わずかな左右ばらけ
    shooter.model.getMuzzleWorld(req.slot, _v1);
    const yaw = shooter.torsoYaw;
    _v1.x += -Math.cos(yaw) * 0.18 * req.side;
    _v1.z += Math.sin(yaw) * 0.18 * req.side;

    m.mesh.position.copy(_v1);
    m.prev.copy(_v1);
    if (o && o.flat) {
      // SWARM: 前方主体の初速(やや上向き + ばらけ)。低空を這うように飛ぶ
      m.vel.set(
        Math.sin(yaw) * 14 + (rng() - 0.5) * 5,
        3 + rng() * 2,
        Math.cos(yaw) * 14 + (rng() - 0.5) * 5,
      );
    } else {
      // MISSILE: 上方初速 + 前方 + ばらけ(山なり軌道の元)
      m.vel.set(
        Math.sin(yaw) * 5 + (rng() - 0.5) * 4,
        10 + rng() * 4,
        Math.cos(yaw) * 5 + (rng() - 0.5) * 4,
      );
    }
    m.life = CONFIG.MISSILE_LIFE;
    m.armed = (o && o.armTime !== undefined) ? o.armTime : CONFIG.MISSILE_ARM_TIME;
    m.smoke = 0;
    m.target = req.target;
    m.shooter = req.shooter;      // FFA: 発射者以外の全機に当たる
    // V7.1: 弾ごとの特性(SWARM = 弱ホーミング・低ダメージ)
    m.turn = (o && o.turn) || CONFIG.MISSILE_TURN;
    m.maxSpeed = (o && o.speed) || CONFIG.MISSILE_SPEED;
    m.dmgMin = (o && o.dmgMin) || CONFIG.MISSILE_DAMAGE_MIN;
    m.dmgMax = (o && o.dmgMax) || CONFIG.MISSILE_DAMAGE_MAX;
    m.mesh.visible = true;
    // 射出煙
    this.game.particles.spawn(_v1, 3, { color: 0xcccccc, speed: 1.5, life: 0.35, gravity: 1, scale: 1, upBias: 0.2 });
  }

  update(dt) {
    // ---- 時間差発射キュー ----
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const p = this.pending[i];
      p.delay -= dt;
      if (p.delay <= 0) {
        if (p.shooter.alive) this.launch(p);
        this.pending.splice(i, 1);
      }
    }

    // ---- 飛翔体更新 ----
    for (const m of this.items) {
      if (m.life <= 0) continue;
      m.life -= dt;
      m.armed -= dt;

      const speed = m.vel.length();
      if (m.armed <= 0 && m.target && m.target.alive) {
        // 簡易比例航法: 速度方向を目標方向へ徐々に向ける + 加速
        // (V7.1: 旋回/最高速は弾ごと。SWARM は弱ホーミング = 横移動で振り切れる)
        m.target.chest(_v2);
        _v1.subVectors(_v2, m.mesh.position).normalize();
        _v3.copy(m.vel).divideScalar(Math.max(1e-4, speed));
        _v3.lerp(_v1, Math.min(1, (m.turn || CONFIG.MISSILE_TURN) * dt)).normalize();
        const spd = Math.min(m.maxSpeed || CONFIG.MISSILE_SPEED, speed + CONFIG.MISSILE_ACCEL * dt);
        m.vel.copy(_v3).multiplyScalar(spd);
      } else {
        // 無誘導(発射直後 or 目標喪失): 軽い重力で山なりに
        m.vel.y += CONFIG.GRAVITY * 0.35 * dt;
      }

      m.prev.copy(m.mesh.position);
      m.mesh.position.addScaledVector(m.vel, dt);
      _v4.copy(m.mesh.position).add(m.vel);
      m.mesh.lookAt(_v4);

      // 煙トレイル(間引き)
      m.smoke -= dt;
      if (m.smoke <= 0) {
        m.smoke = 0.05;
        this.game.particles.spawn(m.prev, 1, { color: 0xb8b8b8, speed: 0.6, life: 0.4, gravity: 1.5, scale: 0.9, upBias: 0 });
      }

      // ---- 衝突判定 ----
      let exploded = false;

      // 1) メカへの直撃(FFA: 発射者以外の全生存機)
      const r2 = CONFIG.MISSILE_HIT_RADIUS * CONFIG.MISSILE_HIT_RADIUS;
      for (const c of this.game.robots) {
        if (c === m.shooter || !c.alive) continue;
        c.chest(_v2);
        if (m.mesh.position.distanceToSquared(_v2) < r2) {
          this.explode(m, c);
          exploded = true;
          break;
        }
      }

      // 2) 遮蔽物(ビル等): 当たればそこで爆発(ダメージなし)
      if (!exploded) {
        const moveLen = m.prev.distanceTo(m.mesh.position);
        if (moveLen > 1e-4) {
          _v3.subVectors(m.mesh.position, m.prev).divideScalar(moveLen);
          const wd = this.game.raycastWallDist(m.prev, _v3, moveLen);
          if (wd <= moveLen) {
            m.mesh.position.copy(m.prev).addScaledVector(_v3, Math.max(0, wd - 0.1));
            this.explode(m, null);
            exploded = true;
          }
        }
      }

      // 3) 地形(クレーター/運河の底も含む) / 寿命切れ
      if (!exploded
        && (m.mesh.position.y <= getGroundHeight(m.mesh.position.x, m.mesh.position.z) + 0.05
          || m.life <= 0)) {
        this.explode(m, null);
      }
    }
  }

  /** 着弾爆発(hitRobot があればダメージ)。火球 + 衝撃波 + 煙 + 破片 */
  explode(m, hitRobot) {
    m.life = 0;
    m.mesh.visible = false;
    const pos = m.mesh.position;
    // 火球(高輝度でブルームに乗せる)
    this.game.particles.spawn(pos, 11, { color: 0xffa040, speed: 10, life: 0.5, gravity: -7, scale: 1.8, boost: 1.8 });
    // 衝撃波リング
    this.game.rings.spawn(pos, { mode: 'ground', scale: 5, life: 0.35, color: 0xffbb77, boost: 1.6 });
    // 上昇する煙 + 落下する破片
    this.game.particles.spawn(pos, 4, { color: 0x999999, speed: 3, life: 0.7, gravity: 2.5, scale: 1.5 });
    this.game.particles.spawn(pos, 3, { color: 0x4a3a2c, speed: 8, life: 1.0, gravity: -18, scale: 0.9, blending: 'normal' });
    this.game.lights.spawn(pos, 0xff7733, 32);
    this.game.sound.playAt('explosion', pos, 10, 0.6);
    this.game.shakeFrom(pos, 0.22, 20);
    this.game.damageDestructiblesAt(pos, 2.5, 12); // ドラム缶/遮蔽にも当たる
    if (hitRobot) {
      // シールド: 前方からの直撃は遮断(波紋のみ)
      if (this.game.shieldBlocks(hitRobot, m.prev)) {
        this.game.shieldRipple(hitRobot, m.prev);
        return;
      }
      const dMin = m.dmgMin || CONFIG.MISSILE_DAMAGE_MIN;
      const dMax = m.dmgMax || CONFIG.MISSILE_DAMAGE_MAX;
      const dmg = dMin + Math.floor(rng() * (dMax - dMin + 1));
      this.game.dmgTexts.show(pos, String(dmg), hitRobot === this.game.player);
      this.game.dealDamage(hitRobot, dmg, pos, m.shooter);
    }
  }

  clear() {
    this.pending.length = 0;
    for (const m of this.items) { m.life = 0; m.mesh.visible = false; m.target = null; }
  }
}

// ============================================================
// RocketPool: BAZOOKA の実体弾(無誘導・弾道落下・爆風範囲ダメージ)
// ============================================================
class RocketPool {
  constructor(scene, game) {
    this.game = game;
    this.items = [];
    this.cursor = 0;
    const geo = new THREE.ConeGeometry(0.2, 0.85, 8);
    geo.rotateX(Math.PI / 2); // 先端を +z に
    const mat = new THREE.MeshBasicMaterial({ color: 0xd8e0e8 });
    for (let i = 0; i < CONFIG.ROCKET_POOL; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({
        mesh,
        vel: new THREE.Vector3(),
        prev: new THREE.Vector3(),
        life: 0,
        smoke: 0,
        fromPlayer: false,
      });
    }
  }

  /** 発射(origin からdir 方向へ直射) */
  fire(origin, dir, shooter) {
    const m = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    m.mesh.position.copy(origin);
    m.prev.copy(origin);
    m.vel.copy(dir).multiplyScalar(CONFIG.BAZOOKA_SPEED);
    m.life = CONFIG.BAZOOKA_LIFE;
    m.smoke = 0;
    m.shooter = shooter;       // FFA: 発射者以外の全機に当たる
    m.mesh.visible = true;
    _v4.copy(origin).add(dir);
    m.mesh.lookAt(_v4);
  }

  update(dt) {
    for (const m of this.items) {
      if (m.life <= 0) continue;
      m.life -= dt;

      // 弾道(わずかな重力落下)
      m.vel.y += CONFIG.GRAVITY * CONFIG.BAZOOKA_GRAVITY_MUL * dt;
      m.prev.copy(m.mesh.position);
      m.mesh.position.addScaledVector(m.vel, dt);
      _v4.copy(m.mesh.position).add(m.vel);
      m.mesh.lookAt(_v4);

      // 煙トレイル
      m.smoke -= dt;
      if (m.smoke <= 0) {
        m.smoke = 0.06;
        this.game.particles.spawn(m.prev, 1, { color: 0xc8c0a8, speed: 0.5, life: 0.35, gravity: 1, scale: 1, upBias: 0 });
      }

      let exploded = false;

      // 1) 直撃(FFA: 発射者以外。シールド前面なら直撃分は遮断して爆発のみ)
      const r2 = CONFIG.BAZOOKA_HIT_RADIUS * CONFIG.BAZOOKA_HIT_RADIUS;
      for (const c of this.game.robots) {
        if (c === m.shooter || !c.alive) continue;
        c.chest(_v2);
        if (m.mesh.position.distanceToSquared(_v2) < r2) {
          const shielded = this.game.shieldBlocks(c, m.prev) ? c : null;
          if (shielded) this.game.shieldRipple(c, m.prev);
          this.explode(m, shielded);
          exploded = true;
          break;
        }
      }

      // 2) 遮蔽物
      if (!exploded) {
        const moveLen = m.prev.distanceTo(m.mesh.position);
        if (moveLen > 1e-4) {
          _v3.subVectors(m.mesh.position, m.prev).divideScalar(moveLen);
          const wd = this.game.raycastWallDist(m.prev, _v3, moveLen);
          if (wd <= moveLen) {
            m.mesh.position.copy(m.prev).addScaledVector(_v3, Math.max(0, wd - 0.1));
            this.explode(m);
            exploded = true;
          }
        }
      }

      // 3) 地形 / 寿命
      if (!exploded
        && (m.mesh.position.y <= getGroundHeight(m.mesh.position.x, m.mesh.position.z) + 0.05
          || m.life <= 0)) {
        this.explode(m);
      }
    }
  }

  /**
   * 爆風範囲ダメージ(中心 30 → 縁 12 の線形減衰)。多段演出 + 近接シェイク
   * @param {Robot|null} shieldedVictim 直撃をシールドで防いだ機体(爆風から除外)
   */
  explode(m, shieldedVictim = null) {
    m.life = 0;
    m.mesh.visible = false;
    const pos = m.mesh.position;
    // 第1段: 火球バースト(高輝度)
    this.game.particles.spawn(pos, 18, { color: 0xffa040, speed: 13, life: 0.7, gravity: -7, scale: 2.2, boost: 2 });
    this.game.particles.spawn(pos, 6, { color: 0xfff2cc, speed: 6, life: 0.25, gravity: 0, scale: 2.6, boost: 2.6 }); // 閃光
    // 第2段: 地面に水平な衝撃波リング
    const gy = getGroundHeight(pos.x, pos.z);
    this.game.rings.spawn(pos, {
      mode: 'ground', scale: 9, life: 0.5, color: 0xffcc88, boost: 1.8,
      y: (pos.y - gy < 3) ? gy + 0.35 : null, // 地表付近なら地面に沿わせる
    });
    // 第3段: 上昇する煙柱 + 重力落下する破片
    this.game.particles.spawn(pos, 8, { color: 0x999188, speed: 4, life: 1.0, gravity: 3, scale: 2, upBias: 1 });
    this.game.particles.spawn(pos, 6, { color: 0x4a3a2c, speed: 10, life: 1.2, gravity: -18, scale: 1, blending: 'normal' });
    this.game.lights.spawn(pos, 0xff7733, 55);
    this.game.sound.playAt('explosion', pos, 16);
    this.game.shakeFrom(pos, 0.5, 32); // 近距離ほど強いカメラシェイク
    this.game.damageDestructiblesAt(pos, CONFIG.BAZOOKA_BLAST_RADIUS, CONFIG.BAZOOKA_DMG_CENTER); // 樽/遮蔽

    const R = CONFIG.BAZOOKA_BLAST_RADIUS;
    for (const c of this.game.robots) {
      if (c === m.shooter || c === shieldedVictim || !c.alive) continue; // FFA(自爆なし)
      c.chest(_v2);
      const d = pos.distanceTo(_v2);
      if (d >= R) continue;
      const t = d / R;
      const dmg = Math.round(CONFIG.BAZOOKA_DMG_CENTER + (CONFIG.BAZOOKA_DMG_EDGE - CONFIG.BAZOOKA_DMG_CENTER) * t);
      this.game.dmgTexts.show(_v2, String(dmg), c === this.game.player);
      this.game.dealDamage(c, dmg, pos, m.shooter);
    }
  }

  clear() {
    for (const m of this.items) { m.life = 0; m.mesh.visible = false; }
  }
}

// ============================================================
// BoltPool(V7.0): PULSE / SPREAD の実体弾(エネルギーボルト)。
//   発光する球が銃口から照準方向へ直進。飛行中に「球 vs 機体」で命中判定
//   するため、距離があれば横移動で回避できる(回避が成立する戦闘の核)。
//   遮蔽(ビル/地形)・破壊可能物にも着弾。ミサイル/ロケットの流儀を簡略化。
// ============================================================
class BoltPool {
  constructor(scene, game) {
    this.game = game;
    this.items = [];
    this.cursor = 0;
    // 加算合成の発光球(コア)。1 形状を共有し、色だけ per-instance material で差し替え
    const geo = new THREE.SphereGeometry(0.22, 10, 8);
    for (let i = 0; i < CONFIG.BOLT_POOL; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x7feaff, transparent: true, opacity: 0.95,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({
        mesh,
        vel: new THREE.Vector3(),
        prev: new THREE.Vector3(),
        life: 0,
        dist: 0,        // 進んだ距離(range で消す)
        range: 80,
        dmgMin: 0, dmgMax: 0,
        color: 0x7feaff,
        trail: 0,
        shooter: null,  // FFA: 発射者以外に当たる
      });
    }
  }

  /**
   * 1 発を発射。
   * @param {Robot} shooter 発射者
   * @param {THREE.Vector3} origin 銃口ワールド座標
   * @param {THREE.Vector3} dir 正規化済み進行方向
   * @param {object} w WEAPONS エントリ(弾速/ダメージ/射程/色)
   * @param {number} color 弾色(プレイヤー=w.color / 敵=w.colorE)
   */
  fire(shooter, origin, dir, w, color) {
    const b = this.items[this.cursor];
    this.cursor = (this.cursor + 1) % this.items.length;
    b.mesh.position.copy(origin);
    b.prev.copy(origin);
    b.vel.copy(dir).multiplyScalar(w.boltSpeed || 45);
    b.life = CONFIG.BOLT_LIFE;
    b.dist = 0;
    b.range = w.range || CONFIG.WEAPON_RANGE;
    b.dmgMin = w.dmgMin; b.dmgMax = w.dmgMax;
    b.color = color;
    b.trail = 0;
    b.shooter = shooter;
    // V7.1: 武器固有の命中時効果
    b.chain = w.chain || 0;             // ARC: 連鎖ダメージ率(0 = なし)
    b.chainRange = w.chainRange || 12;  // ARC: 連鎖の検索半径
    b.kb = w.knockback || 0;            // REPULSOR: ノックバック初速(0 = なし)
    const sc = (w.boltScale || 1) * CONFIG.BOLT_RADIUS;
    b.mesh.scale.setScalar(sc);
    b.mesh.material.color.setHex(color);
    b.mesh.visible = true;
  }

  update(dt) {
    const game = this.game;
    for (const b of this.items) {
      if (b.life <= 0) continue;
      b.life -= dt;

      const stepLen = (b.vel.length() * dt) || 1e-4;
      b.prev.copy(b.mesh.position);
      b.mesh.position.addScaledVector(b.vel, dt);
      b.dist += stepLen;

      // 発光トレイル(間引き)
      b.trail -= dt;
      if (b.trail <= 0) {
        b.trail = CONFIG.BOLT_TRAIL;
        game.particles.spawn(b.prev, 1, { color: b.color, speed: 0.4, life: 0.18, gravity: 0, scale: 0.8, upBias: 0, boost: 1.6 });
      }

      let done = false;

      // 1) 機体への命中(FFA: 発射者以外の全生存機。線分 vs 球で素抜け防止)
      _v3.copy(b.vel).divideScalar(b.vel.length()); // 進行方向
      let hitDist = Infinity, hitTarget = null;
      for (const c of game.robots) {
        if (c === b.shooter || !c.alive) continue;
        c.chest(_v2);
        const r = 1.7 * c.cls.scale + CONFIG.BOLT_HIT_PAD;
        const d = raySphereDist(b.prev, _v3, _v2, r, _v4);
        if (d >= 0 && d <= stepLen && d < hitDist) { hitDist = d; hitTarget = c; }
      }
      if (hitTarget) {
        _v1.copy(b.prev).addScaledVector(_v3, hitDist);
        // シールド: 前方からの直撃は遮断(波紋のみ・ダメージなし)
        if (game.shieldBlocks(hitTarget, b.prev)) {
          game.shieldRipple(hitTarget, b.prev);
        } else {
          const dmg = b.dmgMin + Math.floor(rng() * (b.dmgMax - b.dmgMin + 1));
          game.dmgTexts.show(_v1, String(dmg), hitTarget === game.player);
          game.particles.spawn(_v1, 8, { color: 0xffcc66, speed: 8, life: 0.4, gravity: -10, scale: 1.1, boost: 1.6 });
          game.rings.spawn(_v1, { mode: 'billboard', scale: 2.2, life: 0.25, color: 0xffd9a0, boost: 1.7 });
          game.lights.spawn(_v1, b.color, 22);
          // V7.1 REPULSOR: 弾の進行方向(水平)へノックバック(dealDamage の前 = KO 時も吹き飛ぶ)
          if (b.kb > 0) {
            const hl = Math.hypot(_v3.x, _v3.z) || 1;
            hitTarget.kbX += (_v3.x / hl) * b.kb;
            hitTarget.kbZ += (_v3.z / hl) * b.kb;
            game.rings.spawn(_v1, { mode: 'billboard', scale: 3.6, life: 0.35, color: b.color, boost: 1.8 });
          }
          game.dealDamage(hitTarget, dmg, b.shooter ? b.shooter.position : b.prev, b.shooter);
          // V7.1 ARC: 12m 以内の別の敵 1 機へ連鎖(稲妻演出 + 40% ダメージ)
          if (b.chain > 0) {
            game.arcChain(hitTarget, Math.round(dmg * b.chain), b.shooter, b.chainRange);
          }
        }
        done = true;
      }

      // 2) 遮蔽物(ビル/破壊可能物)
      if (!done) {
        const wd = game.raycastWallDist(b.prev, _v3, stepLen);
        if (wd <= stepLen) {
          _v1.copy(b.prev).addScaledVector(_v3, Math.max(0, wd - 0.05));
          const mesh = game._lastWallHit;
          game.particles.spawn(_v1, 5, { color: 0xccddee, speed: 5, life: 0.28, gravity: -8, boost: 1.4 });
          game.lights.spawn(_v1, 0x88bbff, 12);
          if (mesh && mesh.userData.destructible) {
            const dmg = b.dmgMin + Math.floor(rng() * (b.dmgMax - b.dmgMin + 1));
            game.damageDestructible(mesh.userData.destructible, dmg);
          }
          done = true;
        }
      }

      // 3) 地形(クレーター/運河の床など)
      if (!done && b.mesh.position.y <= getGroundHeight(b.mesh.position.x, b.mesh.position.z) + 0.05) {
        _v1.copy(b.mesh.position);
        game.particles.spawn(_v1, 4, { color: 0xaa9977, speed: 4, life: 0.3, gravity: -4 });
        done = true;
      }

      // 4) 射程到達 / 寿命
      if (!done && (b.dist >= b.range || b.life <= 0)) {
        game.particles.spawn(b.mesh.position, 2, { color: b.color, speed: 2, life: 0.18, gravity: 0, boost: 1.6 });
        done = true;
      }

      if (done) { b.life = 0; b.mesh.visible = false; }
    }
  }

  clear() {
    for (const b of this.items) { b.life = 0; b.mesh.visible = false; b.shooter = null; }
  }
}

// ============================================================
// ArtilleryPool(V7.1): 長距離爆撃ミサイル(ARTILLERY RAIN)。
//   発射時に着弾予報サークルを地面に表示(食らう側に回避チャンス)→
//   山なり弾道の砲弾 6 発が散布半径内のランダム地点へ時間差で降る。
//   弾道はパラメトリック補間(from→to + 放物線高)で軽量に再現。プール制。
// ============================================================
class ArtilleryPool {
  constructor(scene, game) {
    this.game = game;
    this.items = [];
    this.cursor = 0;
    const geo = new THREE.ConeGeometry(0.18, 0.8, 8);
    geo.rotateX(Math.PI / 2); // 先端を +z に
    const mat = new THREE.MeshBasicMaterial({ color: 0xffd0a0 });
    for (let i = 0; i < CONFIG.ARTY_POOL; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      this.items.push({
        mesh,
        from: new THREE.Vector3(),
        to: new THREE.Vector3(),
        t: 0, T: 1, h: 14,
        delay: 0,        // 発射待ち(時間差射出)
        active: false,
        smoke: 0,
        dmgMin: 18, dmgMax: 24, blast: 4,
        shooter: null,
      });
    }
    // 着弾予報サークル(赤リング・点滅)。ボレー単位で使い回し
    this.telegraphs = [];
    const tgGeo = new THREE.RingGeometry(0.86, 1.0, 40); // scale で半径を合わせる
    tgGeo.rotateX(-Math.PI / 2);
    for (let i = 0; i < CONFIG.ARTY_TELEGRAPH_POOL; i++) {
      const m = new THREE.Mesh(tgGeo, new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xff5030).multiplyScalar(1.6),
        transparent: true, opacity: 0.5,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      }));
      m.visible = false;
      scene.add(m);
      this.telegraphs.push({ mesh: m, until: 0 });
    }
    this.tgCursor = 0;
  }

  /**
   * 1 ボレー(6 発)を発射。
   * @param {Robot} shooter
   * @param {THREE.Vector3} center 着弾の中心点(地表)
   * @param {object} w WEAPONS.artillery
   */
  fireVolley(shooter, center, w) {
    const scatter = w.scatter || 9;
    shooter.chest(_v1); // 発射元は機体上部(肩ポッド相当)
    _v1.y += 1.2;
    const distC = Math.hypot(center.x - _v1.x, center.z - _v1.z);
    let lastImpact = 0;
    for (let i = 0; i < (w.count || 6); i++) {
      const m = this.items[this.cursor];
      this.cursor = (this.cursor + 1) % this.items.length;
      // 散布半径内のランダム着弾点(uniform disk)
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * scatter;
      const ix = clamp(center.x + Math.cos(a) * r, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT);
      const iz = clamp(center.z + Math.sin(a) * r, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT);
      m.from.copy(_v1);
      m.to.set(ix, getGroundHeight(ix, iz), iz);
      m.T = CONFIG.ARTY_FLIGHT_BASE + distC * CONFIG.ARTY_FLIGHT_PER_U;
      m.delay = i * CONFIG.ARTY_STAGGER; // 時間差で「雨のように」降る
      m.t = 0;
      m.h = CONFIG.ARTY_ARC_HEIGHT + distC * 0.08;
      m.active = true;
      m.smoke = 0;
      m.dmgMin = w.dmgMin; m.dmgMax = w.dmgMax; m.blast = w.blast || 4;
      m.shooter = shooter;
      m.mesh.visible = false; // delay 消化後に表示
      lastImpact = Math.max(lastImpact, m.delay + m.T);
    }
    // 着弾予報サークル(最後の着弾まで点滅表示)
    const tg = this.telegraphs[this.tgCursor];
    this.tgCursor = (this.tgCursor + 1) % this.telegraphs.length;
    tg.mesh.scale.setScalar(scatter + (w.blast || 4) * 0.5);
    tg.mesh.position.set(center.x, getGroundHeight(center.x, center.z) + 0.25, center.z);
    tg.mesh.visible = true;
    tg.until = this.game.elapsed + lastImpact;
    this.game.sound.playAt('artillery', shooter.position, 26);
  }

  update(dt) {
    // 予報サークルの点滅 + 期限切れ消灯
    for (const tg of this.telegraphs) {
      if (!tg.mesh.visible) continue;
      if (this.game.elapsed >= tg.until) { tg.mesh.visible = false; continue; }
      tg.mesh.material.opacity = 0.3 + 0.3 * Math.sin(this.game.elapsed * 10);
    }
    for (const m of this.items) {
      if (!m.active) continue;
      if (m.delay > 0) { m.delay -= dt; continue; }
      m.mesh.visible = true;
      m.t += dt;
      const k = Math.min(1, m.t / m.T);
      // パラメトリック弾道: 線形補間 + 放物線高(4k(1-k))
      const px = m.from.x + (m.to.x - m.from.x) * k;
      const py = m.from.y + (m.to.y - m.from.y) * k + m.h * 4 * k * (1 - k);
      const pz = m.from.z + (m.to.z - m.from.z) * k;
      // 進行方向を向く(数値微分)
      _v4.set(px - m.mesh.position.x, py - m.mesh.position.y, pz - m.mesh.position.z);
      m.mesh.position.set(px, py, pz);
      if (_v4.lengthSq() > 1e-6) {
        _v4.add(m.mesh.position);
        m.mesh.lookAt(_v4);
      }
      // 煙トレイル(間引き)
      m.smoke -= dt;
      if (m.smoke <= 0) {
        m.smoke = 0.07;
        this.game.particles.spawn(m.mesh.position, 1, { color: 0xc8b8a0, speed: 0.5, life: 0.4, gravity: 1, scale: 1, upBias: 0 });
      }
      if (k >= 1) this.explodeShell(m);
    }
  }

  /** 砲弾の着弾爆発(爆風 r=blast の範囲ダメージ。FFA・発射者は除外) */
  explodeShell(m) {
    m.active = false;
    m.mesh.visible = false;
    const pos = m.to;
    this.game.particles.spawn(pos, 14, { color: 0xffa040, speed: 11, life: 0.6, gravity: -7, scale: 2, boost: 1.9 });
    this.game.particles.spawn(pos, 5, { color: 0x999188, speed: 3.5, life: 0.9, gravity: 2.5, scale: 1.8, upBias: 1 });
    this.game.rings.spawn(pos, { mode: 'ground', scale: m.blast * 1.6, life: 0.4, color: 0xffbb77, boost: 1.7, y: pos.y + 0.3 });
    this.game.lights.spawn(pos, 0xff7733, 40);
    this.game.sound.playAt('explosion', pos, 13, 0.8);
    this.game.shakeFrom(pos, 0.35, 26);
    this.game.damageDestructiblesAt(pos, m.blast, m.dmgMin); // 樽/遮蔽も巻き込む
    const R = m.blast;
    for (const c of this.game.robots) {
      if (c === m.shooter || !c.alive) continue;
      c.chest(_v2);
      const d = pos.distanceTo(_v2);
      if (d >= R + 1.2) continue; // +機体半径ぶんの猶予
      const t = clamp(d / R, 0, 1);
      const dmg = Math.round(m.dmgMin + (m.dmgMax - m.dmgMin) * (1 - t));
      this.game.dmgTexts.show(_v2, String(dmg), c === this.game.player);
      this.game.dealDamage(c, dmg, pos, m.shooter);
    }
  }

  clear() {
    for (const m of this.items) { m.active = false; m.mesh.visible = false; m.shooter = null; }
    for (const tg of this.telegraphs) tg.mesh.visible = false;
  }
}

// ============================================================
// TempestFX(V7.1): 持続稲妻ビームのジグザグポリライン描画。
//   機体ごとに最大 TEMPEST_FX_POOL 本。毎フレーム頂点をランダムに揺らして
//   「バリバリと走る稲妻」を表現(コア白 + グロー色の 2 本 1 組)。
//   ダメージ判定は Game.updateTempests 側(0.25s tick)。これは描画専用。
// ============================================================
class TempestFX {
  constructor(scene) {
    this.items = [];
    for (let i = 0; i < CONFIG.TEMPEST_FX_POOL; i++) {
      const make = (color, boost) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CONFIG.TEMPEST_SEGS * 3), 3));
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
          color: new THREE.Color(color).multiplyScalar(boost),
          transparent: true, opacity: 0.95,
          blending: THREE.AdditiveBlending, depthWrite: false,
        }));
        line.visible = false;
        line.frustumCulled = false; // 端点が画面外でも稲妻全体を描く
        scene.add(line);
        return line;
      };
      this.items.push({
        core: make(0xffffff, 2.2),  // 白コア
        glow: make(0x88c0ff, 1.5),  // 色グロー(set で武器色に差し替え)
        used: false,
        hold: 0, // 単発稲妻の残光フレーム数
      });
    }
  }

  /**
   * このフレームのビームを 1 本描画(start→end をジグザグに)。
   * @param {number} hold 追加表示フレーム数(0 = 毎フレーム再 draw が前提。
   *                      ARC 連鎖などの単発稲妻は 8 程度で ~0.13s 残す)
   * 注: start/end はテンポラリベクトルが渡されることがあるため、
   *     先頭でスカラへ退避してから内部テンポラリ(_v3/_v4)を使う(エイリアス対策)
   */
  draw(start, end, color, hold = 0) {
    const it = this.items.find((x) => !x.used);
    if (!it) return;
    const sx = start.x, sy = start.y, sz = start.z;
    let dx = end.x - sx, dy = end.y - sy, dz = end.z - sz;
    const len = Math.hypot(dx, dy, dz);
    if (len < 1e-3) return;
    dx /= len; dy /= len; dz /= len;
    // 水平直交軸(横ぶれ用)
    let px = -dz, pz = dx;
    const pl = Math.hypot(px, pz);
    if (pl < 1e-3) { px = 1; pz = 0; } else { px /= pl; pz /= pl; }
    it.used = true;
    it.hold = hold;
    it.glow.material.color.setHex(color).multiplyScalar(1.5);
    const n = CONFIG.TEMPEST_SEGS;
    for (const line of [it.core, it.glow]) {
      const pos = line.geometry.attributes.position;
      for (let i = 0; i < n; i++) {
        const k = i / (n - 1);
        const jag = (i === 0 || i === n - 1) ? 0 : CONFIG.TEMPEST_JAG * Math.sin(k * Math.PI);
        const ox = (rng() - 0.5) * 2 * jag;
        const oy = (rng() - 0.5) * 2 * jag;
        pos.setXYZ(
          i,
          sx + dx * len * k + px * ox,
          sy + dy * len * k + oy,
          sz + dz * len * k + pz * ox,
        );
      }
      pos.needsUpdate = true;
      line.visible = true;
    }
  }

  /** フレーム末: 再 draw されなかったビームを hold 消化後に消す */
  endFrame() {
    for (const it of this.items) {
      if (it.used) {
        it.used = false; // 次フレームの draw 待ち
      } else if (it.hold > 0) {
        it.hold--; // 単発稲妻(ARC 連鎖)の残光
      } else {
        it.core.visible = false;
        it.glow.visible = false;
      }
    }
  }

  clear() {
    for (const it of this.items) {
      it.core.visible = false;
      it.glow.visible = false;
      it.used = false;
      it.hold = 0;
    }
  }
}

// ============================================================
// SoundManager: Web Audio プロシージャル SFX(外部ファイルなし)
//   - 初回 pointerdown で init/resume(iOS 対策)
//   - 同時発音数 MAX_VOICES に制限 / 距離減衰は playAt(1/d)
// ============================================================
class SoundManager {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noiseBuf = null;
    this.voices = 0;
    this.listener = null; // 距離減衰の基準(camera.position 参照)
    this.muted = false;
    try { this.muted = localStorage.getItem('v6_muted') === '1'; } catch (_) { /* private mode */ }
  }

  /** 初回ユーザー操作で呼ぶ(AudioContext 生成 / resume) */
  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : CONFIG.SFX_VOLUME;
    this.master.connect(this.ctx.destination);
    // ホワイトノイズバッファ(爆発/足音/噴射に使い回し)
    const len = this.ctx.sampleRate;
    this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  setMuted(m) {
    this.muted = m;
    try { localStorage.setItem('v6_muted', m ? '1' : '0'); } catch (_) { /* ignore */ }
    if (this.master) this.master.gain.value = m ? 0 : CONFIG.SFX_VOLUME;
  }

  /** 同時発音数の予約(超過時 false) */
  _voice(dur) {
    if (!this.ctx || this.muted) return false;
    if (this.voices >= CONFIG.MAX_VOICES) return false;
    this.voices++;
    setTimeout(() => { this.voices = Math.max(0, this.voices - 1); }, dur * 1000 + 80);
    return true;
  }

  /** オシレータ 1 発(周波数スイープ + 指数減衰) */
  _osc({ type = 'sine', f0 = 440, f1 = null, dur = 0.1, vol = 0.4, delay = 0 }) {
    const t0 = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(Math.max(20, f0), t0);
    if (f1 !== null) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(Math.max(0.001, vol), t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    o.connect(g).connect(this.master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }

  /** ノイズ 1 発(フィルタスイープ + 指数減衰) */
  _noise({ dur = 0.3, f0 = 1000, f1 = null, type = 'lowpass', vol = 0.4, delay = 0 }) {
    const t0 = this.ctx.currentTime + delay;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    src.loop = true;
    const flt = this.ctx.createBiquadFilter();
    flt.type = type;
    flt.frequency.setValueAtTime(Math.max(20, f0), t0);
    if (f1 !== null) flt.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(Math.max(0.001, vol), t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(flt);
    flt.connect(g);
    g.connect(this.master);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  /** 名前付き SFX を再生(vol: 0..1 の距離減衰込み係数) */
  play(name, vol = 1) {
    if (!this.ctx || this.muted || vol <= 0.02) return;
    switch (name) {
      case 'pulse': // パルス発射: スイープするエネルギー音
        if (!this._voice(0.18)) return;
        this._osc({ type: 'square', f0: 900, f1: 180, dur: 0.16, vol: 0.5 * vol });
        this._osc({ type: 'sawtooth', f0: 1500, f1: 320, dur: 0.1, vol: 0.18 * vol });
        break;
      case 'mg': // マシンガン: 短いクラック
        if (!this._voice(0.06)) return;
        this._noise({ dur: 0.05, f0: 2800, type: 'highpass', vol: 0.22 * vol });
        this._osc({ type: 'square', f0: 250, f1: 120, dur: 0.05, vol: 0.28 * vol });
        break;
      case 'missile': // ミサイル発射: 上昇するシュー音
        if (!this._voice(0.5)) return;
        this._noise({ dur: 0.45, f0: 500, f1: 2400, vol: 0.32 * vol });
        break;
      case 'spread': // スプレッドショット: ショットガンの太い発砲音
        if (!this._voice(0.25)) return;
        this._noise({ dur: 0.2, f0: 1400, f1: 300, vol: 0.5 * vol });
        this._osc({ type: 'triangle', f0: 180, f1: 70, dur: 0.18, vol: 0.35 * vol });
        break;
      case 'rail': // レールガン: チャージ済みの鋭い電磁射出音
        if (!this._voice(0.5)) return;
        this._osc({ type: 'sawtooth', f0: 2200, f1: 280, dur: 0.3, vol: 0.4 * vol });
        this._noise({ dur: 0.25, f0: 4000, type: 'highpass', vol: 0.3 * vol });
        this._osc({ type: 'sine', f0: 110, f1: 50, dur: 0.35, vol: 0.35 * vol });
        break;
      case 'crate': // クレート取得: 上昇チャイム
        if (!this._voice(0.35)) return;
        this._osc({ f0: 880, dur: 0.08, vol: 0.3 * vol });
        this._osc({ f0: 1320, dur: 0.12, vol: 0.3 * vol, delay: 0.08 });
        this._osc({ f0: 1760, dur: 0.18, vol: 0.26 * vol, delay: 0.17 });
        break;
      case 'needle': // V7.1: ニードル: 鋭く細い射出チック
        if (!this._voice(0.1)) return;
        this._osc({ type: 'square', f0: 2400, f1: 1400, dur: 0.06, vol: 0.22 * vol });
        this._noise({ dur: 0.04, f0: 5000, type: 'highpass', vol: 0.12 * vol });
        break;
      case 'swarm': // V7.1: スワーム: 複数の小ロケットのシュシュ音
        if (!this._voice(0.5)) return;
        this._noise({ dur: 0.35, f0: 900, f1: 2800, vol: 0.26 * vol });
        this._noise({ dur: 0.3, f0: 700, f1: 2400, vol: 0.2 * vol, delay: 0.1 });
        break;
      case 'arc': // V7.1: アーク: 放電ザップ
        if (!this._voice(0.25)) return;
        this._osc({ type: 'sawtooth', f0: 1800, f1: 300, dur: 0.18, vol: 0.32 * vol });
        this._noise({ dur: 0.12, f0: 3600, type: 'highpass', vol: 0.22 * vol });
        break;
      case 'zap': // V7.1: 連鎖 / TEMPEST tick: 短いバチッ
        if (!this._voice(0.12)) return;
        this._noise({ dur: 0.08, f0: 4200, type: 'highpass', vol: 0.2 * vol });
        this._osc({ type: 'square', f0: 900, f1: 350, dur: 0.07, vol: 0.16 * vol });
        break;
      case 'repulsor': // V7.1: リパルサー: 低い衝撃波ドン
        if (!this._voice(0.35)) return;
        this._osc({ type: 'sine', f0: 220, f1: 55, dur: 0.3, vol: 0.5 * vol });
        this._noise({ dur: 0.18, f0: 600, f1: 150, vol: 0.3 * vol });
        break;
      case 'artillery': // V7.1: アーティラリー: 連続した重い射出ドンドン
        if (!this._voice(0.8)) return;
        for (let i = 0; i < 3; i++) {
          this._osc({ type: 'triangle', f0: 130, f1: 45, dur: 0.18, vol: 0.34 * vol, delay: i * 0.14 });
          this._noise({ dur: 0.14, f0: 700, f1: 180, vol: 0.22 * vol, delay: i * 0.14 });
        }
        break;
      case 'tempest': // V7.1: テンペスト発動: 雷鳴の立ち上がり
        if (!this._voice(0.6)) return;
        this._noise({ dur: 0.5, f0: 2000, f1: 5000, type: 'highpass', vol: 0.3 * vol });
        this._osc({ type: 'sawtooth', f0: 300, f1: 900, dur: 0.4, vol: 0.22 * vol });
        break;
      case 'repair': // V7.0: 撃破時 HP 回復(残量 2 倍): 短い上昇音(きらめき)
        if (!this._voice(0.3)) return;
        this._osc({ type: 'sine', f0: 660, f1: 1320, dur: 0.22, vol: 0.32 * vol });
        this._osc({ type: 'triangle', f0: 990, f1: 1980, dur: 0.18, vol: 0.2 * vol, delay: 0.06 });
        break;
      case 'railcharge': // V7.0: レールガンのチャージ予兆(上昇する収束音)
        if (!this._voice(0.5)) return;
        this._osc({ type: 'sawtooth', f0: 180, f1: 1400, dur: 0.5, vol: 0.22 * vol });
        this._osc({ type: 'sine', f0: 90, f1: 360, dur: 0.5, vol: 0.16 * vol });
        break;
      case 'bazooka': // バズーカ発射: 重い砲撃
        if (!this._voice(0.3)) return;
        this._noise({ dur: 0.25, f0: 900, f1: 200, vol: 0.5 * vol });
        this._osc({ type: 'triangle', f0: 150, f1: 55, dur: 0.25, vol: 0.4 * vol });
        break;
      case 'explosion': // 爆発: ノイズ + ローパススイープ + サブ
        if (!this._voice(0.8)) return;
        this._noise({ dur: 0.7, f0: 800, f1: 80, vol: 0.75 * vol });
        this._osc({ type: 'sine', f0: 90, f1: 34, dur: 0.6, vol: 0.6 * vol });
        break;
      case 'hit': // 被弾: 金属クランク
        if (!this._voice(0.12)) return;
        this._osc({ type: 'triangle', f0: 340, f1: 140, dur: 0.1, vol: 0.4 * vol });
        this._noise({ dur: 0.06, f0: 2000, type: 'highpass', vol: 0.18 * vol });
        break;
      case 'hitConfirm': // 与ダメ確認の小さなチック
        if (!this._voice(0.05)) return;
        this._osc({ f0: 1500, f1: 1100, dur: 0.04, vol: 0.14 * vol });
        break;
      case 'lock': // ロックオン取得: 2 連ビープ
        if (!this._voice(0.2)) return;
        this._osc({ f0: 1250, dur: 0.06, vol: 0.28 * vol });
        this._osc({ f0: 1650, dur: 0.07, vol: 0.28 * vol, delay: 0.09 });
        break;
      case 'overheat': // オーバーヒート警告: 下降ブザー
        if (!this._voice(0.5)) return;
        this._osc({ type: 'square', f0: 240, f1: 85, dur: 0.45, vol: 0.32 * vol });
        break;
      case 'lowhp': // 低 HP 警告
        if (!this._voice(0.3)) return;
        this._osc({ f0: 880, dur: 0.09, vol: 0.3 * vol });
        this._osc({ f0: 880, dur: 0.09, vol: 0.3 * vol, delay: 0.16 });
        break;
      case 'jump': // ジャンプ噴射
        if (!this._voice(0.32)) return;
        this._noise({ dur: 0.3, f0: 300, f1: 1800, vol: 0.28 * vol });
        break;
      case 'sprint': // スプリント: スラスター点火
        if (!this._voice(0.5)) return;
        this._noise({ dur: 0.45, f0: 400, f1: 2600, vol: 0.3 * vol });
        this._osc({ type: 'sawtooth', f0: 120, f1: 280, dur: 0.35, vol: 0.16 * vol });
        break;
      case 'shield': // シールド展開: 立ち上がるシマー
        if (!this._voice(0.4)) return;
        this._osc({ f0: 520, f1: 1040, dur: 0.3, vol: 0.26 * vol });
        this._osc({ f0: 780, f1: 1560, dur: 0.3, vol: 0.18 * vol, delay: 0.05 });
        break;
      case 'shieldHit': // シールド被弾: 高い金属レゾナンス
        if (!this._voice(0.18)) return;
        this._osc({ type: 'triangle', f0: 1800, f1: 900, dur: 0.15, vol: 0.3 * vol });
        break;
      case 'footstep': // 重い足音
        if (!this._voice(0.12)) return;
        this._osc({ type: 'sine', f0: 75, f1: 38, dur: 0.11, vol: 0.2 * vol });
        this._noise({ dur: 0.05, f0: 420, vol: 0.06 * vol });
        break;
      case 'land': // 着地ズン
        if (!this._voice(0.3)) return;
        this._osc({ type: 'sine', f0: 62, f1: 28, dur: 0.26, vol: 0.55 * vol });
        this._noise({ dur: 0.18, f0: 500, f1: 110, vol: 0.25 * vol });
        break;
      case 'ui': // UI タップ
        if (!this._voice(0.06)) return;
        this._osc({ f0: 700, f1: 900, dur: 0.05, vol: 0.2 * vol });
        break;
      case 'win': // 勝利スティング(上昇アルペジオ)
        if (!this._voice(0.9)) return;
        this._osc({ f0: 523, dur: 0.22, vol: 0.32 * vol });
        this._osc({ f0: 659, dur: 0.22, vol: 0.32 * vol, delay: 0.14 });
        this._osc({ f0: 784, dur: 0.42, vol: 0.36 * vol, delay: 0.28 });
        break;
      case 'lose': // 敗北スティング(下降マイナー)
        if (!this._voice(1.0)) return;
        this._osc({ f0: 392, dur: 0.3, vol: 0.32 * vol });
        this._osc({ f0: 311, dur: 0.3, vol: 0.32 * vol, delay: 0.22 });
        this._osc({ f0: 233, dur: 0.55, vol: 0.36 * vol, delay: 0.44 });
        break;
      default:
        break;
    }
  }

  /** 距離減衰付き再生(簡易 1/d。ref = その音の届きやすさ) */
  playAt(name, pos, ref = 14, base = 1) {
    if (!this.ctx || this.muted || !pos) return;
    const d = this.listener ? this.listener.distanceTo(pos) : 10;
    const vol = clamp(ref / Math.max(3, d), 0.05, 1) * base;
    this.play(name, vol);
  }
}

// ============================================================
// BGM パターン(v5 game.js のプロシージャルチップチューンから移植)
//   [音名, 長さ(s), オクターブ]
// ============================================================
const BGM_PATTERNS = {
  title: [
    ['C', 0.2, 4], ['E', 0.2, 4], ['G', 0.2, 4], ['C', 0.2, 5],
    ['G', 0.2, 4], ['E', 0.2, 4], ['C', 0.2, 4], ['G', 0.2, 3],
    ['A', 0.2, 3], ['C', 0.2, 4], ['E', 0.2, 4], ['A', 0.2, 4],
    ['E', 0.2, 4], ['C', 0.2, 4], ['A', 0.2, 3], ['E', 0.2, 3],
  ],
  battle: [
    ['E', 0.15, 4], ['E', 0.15, 4], ['E', 0.15, 5], ['E', 0.15, 4],
    ['G', 0.15, 4], ['G', 0.15, 4], ['E', 0.15, 4], ['D', 0.15, 4],
    ['C', 0.15, 4], ['C', 0.15, 4], ['D', 0.15, 4], ['E', 0.15, 4],
    ['D', 0.15, 4], ['C', 0.15, 4], ['B', 0.15, 3], ['G', 0.15, 3],
    ['A', 0.15, 3], ['A', 0.15, 3], ['B', 0.15, 3], ['C', 0.15, 4],
    ['D', 0.15, 4], ['E', 0.15, 4], ['D', 0.15, 4], ['C', 0.15, 4],
  ],
  victory: [
    ['C', 0.25, 5], ['E', 0.25, 5], ['G', 0.25, 5], ['C', 0.4, 6],
    ['G', 0.2, 5], ['E', 0.2, 5], ['G', 0.2, 5], ['C', 0.4, 6],
    ['A', 0.25, 5], ['C', 0.25, 6], ['E', 0.25, 6], ['A', 0.4, 5],
    ['G', 0.25, 5], ['E', 0.25, 5], ['C', 0.25, 5], ['G', 0.4, 5],
    ['C', 0.3, 5], ['D', 0.15, 5], ['E', 0.15, 5], ['F', 0.15, 5],
    ['G', 0.3, 5], ['A', 0.15, 5], ['G', 0.15, 5], ['E', 0.5, 5],
  ],
  defeat: [
    ['A', 0.3, 3], ['C', 0.3, 4], ['E', 0.3, 4], ['A', 0.4, 4],
    ['G', 0.2, 4], ['E', 0.2, 4], ['C', 0.2, 4], ['A', 0.4, 3],
    ['D', 0.3, 4], ['F', 0.3, 4], ['A', 0.3, 4], ['D', 0.4, 4],
    ['C', 0.2, 4], ['A', 0.2, 3], ['E', 0.2, 3], ['A', 0.6, 3],
    ['E', 0.25, 4], ['D', 0.25, 4], ['C', 0.25, 4], ['B', 0.25, 3],
    ['A', 0.5, 3], ['E', 0.25, 3], ['A', 0.25, 3], ['A', 0.5, 2],
  ],
};
const BGM_INTERVALS = { title: 200, battle: 150, victory: 220, defeat: 280 };

/** 音名 + オクターブ → 周波数(v5 から移植) */
function noteToFreq(note, octave) {
  const notes = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  return 440 * Math.pow(2, (notes[note] - 9) / 12 + (octave - 4));
}

// ============================================================
// BGMManager: BGM 再生口
//   【優先順位】
//   1. assets/audio/bgm_battle.mp3 があればループ再生(Lyria API 生成を想定)
//   2. assets/audio/bgm_battle.wav があればループ再生
//   3. どちらも無ければ v5 移植のプロシージャルチップチューンにフォールバック
//      (title/battle/victory/defeat をシーンに応じて切替)
//   → 後日 Lyria 生成の bgm_battle.(mp3|wav) を置けば自動でそちらが優先される。
//   音は SoundManager の master 配下(チップ係数 0.5)でミュートトグルに従う。
//   チップチューンは square ではなく triangle 主体 + 軽いローパスで
//   リアル系ビジュアルに合わせて落ち着かせている。
// ============================================================
class BGMManager {
  constructor(sound) {
    this.sound = sound;     // SoundManager(AudioContext / master を共有)
    this.audio = null;      // ファイル BGM(存在すれば最優先)
    this.useFile = false;
    this.fileChecked = false;
    this.mode = null;       // 'title' | 'battle' | 'victory' | 'defeat'
    this.timer = null;      // チップチューンのスケジューラ
    this.idx = 0;
    this.chainReady = false;
  }

  /** 起動時に1回: ファイル BGM の存在チェック(無ければチップにフォールバック) */
  async init() {
    if (this.fileChecked) return;
    this.fileChecked = true;
    for (const url of ['./assets/audio/bgm_battle.mp3', './assets/audio/bgm_battle.wav']) {
      try {
        const r = await fetch(url, { method: 'HEAD' });
        if (!r.ok) continue;
        this.audio = new Audio(url);
        this.audio.loop = true;
        this.audio.volume = CONFIG.BGM_VOLUME;
        this.audio.muted = this.sound.muted;
        this.useFile = true;
        this._stopChip(); // ファイル優先: チップは止める
        console.info('[V6.4] BGM ファイル検出(チップチューンより優先):', url);
        return;
      } catch (_) { /* 次の候補へ */ }
    }
    console.info('[V6.4] BGM ファイルなし → プロシージャルチップチューンで再生');
    if (this.mode) this._startChip(); // 既にモード指定済みならチップ開始
  }

  /** シーン切替(intro=title / 戦闘=battle / 勝敗=victory|defeat) */
  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;
    if (this.useFile) {
      // ファイル BGM は単一トラックのループ(シーン切替なし)
      this.audio.play().catch(() => {});
      return;
    }
    if (this.fileChecked) this._startChip();
  }

  setMuted(m) {
    if (this.audio) this.audio.muted = m;
    // チップチューンは SoundManager.master 配下なので自動でミュートされる
  }

  _ensureChain() {
    if (this.chainReady || !this.sound.ctx) return false;
    const ctx = this.sound.ctx;
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.value = 0.5; // BGM 単独係数(master 0.5 配下 → 実効 ~0.25)
    this.lp = ctx.createBiquadFilter();
    this.lp.type = 'lowpass';
    this.lp.frequency.value = 2400; // 軽いローパスで 8bit 感を抑える
    this.lp.connect(this.bgmGain);
    this.bgmGain.connect(this.sound.master);
    this.chainReady = true;
    return true;
  }

  _startChip() {
    this._stopChip();
    this.idx = 0;
    const interval = BGM_INTERVALS[this.mode] || 200;
    this.timer = setInterval(() => this._tick(), interval);
  }

  _stopChip() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /** 1 ノート再生(v5 の playNext を移植・音色を落ち着かせ調整) */
  _tick() {
    const s = this.sound;
    if (!s.ctx || s.muted) return; // ctx 未初期化(初回操作前)/ミュート中はスキップ
    if (!this.chainReady && !this._ensureChain()) return;
    const pat = BGM_PATTERNS[this.mode] || BGM_PATTERNS.title;
    const [note, dur, oct] = pat[this.idx];
    const freq = noteToFreq(note, oct);
    const t0 = s.ctx.currentTime;

    // メロディ(triangle 主体。battle のみ薄い sawtooth を重ねて緊張感)
    const osc = s.ctx.createOscillator();
    const g = s.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.18, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur * 0.9);
    osc.connect(g);
    g.connect(this.lp);
    osc.start(t0);
    osc.stop(t0 + dur);
    if (this.mode === 'battle') {
      const saw = s.ctx.createOscillator();
      const sg = s.ctx.createGain();
      saw.type = 'sawtooth';
      saw.frequency.value = freq;
      sg.gain.setValueAtTime(0.05, t0);
      sg.gain.exponentialRampToValueAtTime(0.001, t0 + dur * 0.8);
      saw.connect(sg);
      sg.connect(this.lp);
      saw.start(t0);
      saw.stop(t0 + dur);
    }

    // ベース(4 音ごと・1 オクターブ下)
    if (this.idx % 4 === 0) {
      const bass = s.ctx.createOscillator();
      const bg = s.ctx.createGain();
      bass.type = 'triangle';
      bass.frequency.value = freq / 2;
      bg.gain.setValueAtTime(0.1, t0);
      bg.gain.exponentialRampToValueAtTime(0.001, t0 + dur * 2);
      bass.connect(bg);
      bg.connect(this.lp);
      bass.start(t0);
      bass.stop(t0 + dur * 2);
    }

    this.idx = (this.idx + 1) % pat.length;
  }
}

// ============================================================
// InputManager: キーボード/マウス(ポインターロック)/タッチ
//   - 左スティック / WASD: 全方位移動
//   - 右スワイプ / マウス: 機体ごと旋回 + 照準
//   - 武器パネル: 中央=全武器 / セグメント=個別(キー 1/2)
// ============================================================
class InputManager {
  constructor() {
    this.keys = Object.create(null);
    this.mouseFire = false;     // クリック = 全武器発射
    this.fireAllHeld = false;   // 中央赤ボタン
    this.segHeld = [false, false, false, false]; // V7.1: スロットセグメント(最大 4)
    this.jumpQueued = false;
    this.abilityQueued = false; // アビリティ(B / 専用ボタン)
    this.targetCycleQueued = false; // ターゲット切替(Tab / 専用ボタン)
    this.lookDX = 0;
    this.lookDY = 0;

    // ジョイスティック状態
    this.joyId = null;
    this.joyOrigin = { x: 0, y: 0 };
    this.joyVec = { x: 0, y: 0 };   // x: 右+, y: 前+
    this.lookId = null;
    this.lookLast = { x: 0, y: 0 };

    // マウスドラッグ(ポインターロック失敗時のフォールバック)
    this.mouseDown = false;
    this.mouseLast = { x: 0, y: 0 };

    this.joyBase = document.getElementById('joystick-base');
    this.joyKnob = document.getElementById('joystick-knob');
    const fireMain = document.getElementById('fire-main');
    // V7.1: 武器セグメントは動的生成(Game.applyLoadoutHUD)→ bindSeg() で後から結線
    const jumpBtn = document.getElementById('jump-btn');
    const abilityBtn = document.getElementById('ability-btn');
    const targetBtn = document.getElementById('target-btn');

    // ---- キーボード(PC はキーボード完結のシンプル操作) ----
    //   カーソル: 移動 / Shift+←→: 方向転換 / Space: 攻撃1 / B: 攻撃2 / V: ジャンプ
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'KeyV' && !e.repeat) this.jumpQueued = true;
      if (e.code === 'KeyB' && !e.repeat) this.abilityQueued = true;
      if (e.code === 'Tab' && !e.repeat) this.targetCycleQueued = true; // ターゲット切替
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });

    // ---- マウス(任意操作: クリック = 攻撃 / ドラッグ = 視点微調整) ----
    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ctl-btn') || e.target.closest('.overlay') || e.target.closest('#mute-btn')) return;
      if (e.button === 0) {
        this.mouseDown = true;
        this.mouseFire = true;
        this.mouseLast.x = e.clientX; this.mouseLast.y = e.clientY;
      }
    });
    window.addEventListener('mousemove', (e) => {
      if (this.mouseDown) {
        this.lookDX += e.clientX - this.mouseLast.x;
        this.lookDY += e.clientY - this.mouseLast.y;
        this.mouseLast.x = e.clientX; this.mouseLast.y = e.clientY;
      }
    });
    window.addEventListener('mouseup', () => { this.mouseDown = false; this.mouseFire = false; });
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // ---- 武器パネル / JUMP(タッチ + マウス両対応・押しっぱなし) ----
    const press = (el, on, off) => {
      el.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); el.classList.add('pressed'); on(); }, { passive: false });
      el.addEventListener('touchend', (e) => { e.preventDefault(); el.classList.remove('pressed'); off(); }, { passive: false });
      el.addEventListener('touchcancel', () => { el.classList.remove('pressed'); off(); });
      el.addEventListener('mousedown', (e) => { e.stopPropagation(); on(); });
      el.addEventListener('mouseup', () => off());
      el.addEventListener('mouseleave', () => off());
    };
    press(fireMain, () => { this.fireAllHeld = true; }, () => { this.fireAllHeld = false; });
    press(jumpBtn, () => { this.jumpQueued = true; }, () => {});
    press(abilityBtn, () => { this.abilityQueued = true; }, () => {});
    press(targetBtn, () => { this.targetCycleQueued = true; }, () => {});
    this._press = press; // V7.1: 動的セグメントの結線に再利用

    // ---- タッチ: 左半分=ジョイスティック / 右半分=機体旋回スワイプ ----
    // ハンガー(ドック)表示中はゲーム操作を一切奪わない:
    // preventDefault するとボタンの click が発火せず、モバイルでハンガーが操作不能になる
    this.hangarEl = document.getElementById('hangar');
    this.isHangarOpen = () => this.hangarEl && !this.hangarEl.classList.contains('hidden');

    window.addEventListener('touchstart', (e) => {
      if (this.isHangarOpen()) return;
      // ゲーム入力として実際に使ったタッチがある時だけ preventDefault する。
      // 一律に呼ぶと UI ボタン(リザルトの RETURN TO HANGAR 等)の click が発火しない
      let claimed = false;
      for (const t of e.changedTouches) {
        if (t.target.closest && (t.target.closest('.ctl-btn') || t.target.closest('.overlay') || t.target.closest('#mute-btn') || t.target.closest('#hangar'))) continue;
        if (t.clientX < window.innerWidth / 2 && this.joyId === null) {
          // フローティングジョイスティック開始(タッチ位置基準)
          this.joyId = t.identifier;
          this.joyOrigin.x = t.clientX; this.joyOrigin.y = t.clientY;
          this.joyVec.x = 0; this.joyVec.y = 0;
          this.joyBase.style.display = 'block';
          this.joyBase.style.left = `${t.clientX}px`;
          this.joyBase.style.top = `${t.clientY}px`;
          this.joyKnob.style.transform = 'translate(-50%,-50%)';
          claimed = true;
        } else if (this.lookId === null) {
          this.lookId = t.identifier;
          this.lookLast.x = t.clientX; this.lookLast.y = t.clientY;
          claimed = true;
        }
      }
      if (claimed && e.cancelable) e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isHangarOpen()) return;
      let handled = false;
      for (const t of e.changedTouches) {
        if (t.identifier === this.joyId) {
          const R = 50;
          let dx = t.clientX - this.joyOrigin.x;
          let dy = t.clientY - this.joyOrigin.y;
          const len = Math.hypot(dx, dy);
          if (len > R) { dx = dx / len * R; dy = dy / len * R; }
          this.joyVec.x = dx / R;
          this.joyVec.y = -dy / R; // 画面上方向 = 前進
          this.joyKnob.style.transform = `translate(-50%,-50%) translate(${dx}px,${dy}px)`;
          handled = true;
        } else if (t.identifier === this.lookId) {
          // スワイプ旋回はマウスより感度を上げる(片手スワイプ 1 回で ~180° 回れる感度)
          this.lookDX += (t.clientX - this.lookLast.x) * CONFIG.TOUCH_LOOK_MUL;
          this.lookDY += (t.clientY - this.lookLast.y) * CONFIG.TOUCH_LOOK_MUL;
          this.lookLast.x = t.clientX; this.lookLast.y = t.clientY;
          handled = true;
        }
      }
      if (handled && e.cancelable) e.preventDefault();
    }, { passive: false });

    const endTouch = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.joyId) {
          this.joyId = null;
          this.joyVec.x = 0; this.joyVec.y = 0;
          this.joyBase.style.display = 'none';
        } else if (t.identifier === this.lookId) {
          this.lookId = null;
        }
      }
    };
    window.addEventListener('touchend', endTouch);
    window.addEventListener('touchcancel', endTouch);
  }

  /** Shift キーが押されているか */
  get shiftHeld() {
    return !!(this.keys['ShiftLeft'] || this.keys['ShiftRight']);
  }

  /** 移動入力 {x: 右+, y: 前+} を取得(キーボード優先)
   *  Shift 押下中の ←→ は旋回に使うため移動から除外する */
  getMove(out) {
    const k = this.keys;
    const shift = this.shiftHeld;
    let x = (k['KeyD'] || (!shift && k['ArrowRight']) ? 1 : 0)
          - (k['KeyA'] || (!shift && k['ArrowLeft']) ? 1 : 0);
    let y = (k['KeyW'] || k['ArrowUp'] ? 1 : 0) - (k['KeyS'] || k['ArrowDown'] ? 1 : 0);
    if (x === 0 && y === 0) { x = this.joyVec.x; y = this.joyVec.y; }
    const len = Math.hypot(x, y);
    if (len > 1) { x /= len; y /= len; }
    out.x = x; out.y = y;
    return out;
  }

  /** キーボード旋回(Shift+→ = +1 / Shift+← = -1) */
  get turnKey() {
    if (!this.shiftHeld) return 0;
    return (this.keys['ArrowRight'] ? 1 : 0) - (this.keys['ArrowLeft'] ? 1 : 0);
  }

  /** 全武器一斉発射(中央ボタン / クリック)— WR 準拠 */
  get fireAll() { return this.fireAllHeld || this.mouseFire; }

  /**
   * V7.1: スロット i の発射ホールド判定(スロット順に Space / Z / X / C。
   * 数字キー 1-4 も併用可。セグメントボタン / 中央 FIRE も加味)
   */
  fireSlot(i) {
    return this.fireAll || this.segHeld[i]
      || !!this.keys[InputManager.FIRE_KEYS[i]]
      || !!this.keys[`Digit${i + 1}`];
  }

  /** V7.1: 動的生成された武器セグメントを結線(redeploy ごとに再呼び出し) */
  bindSeg(el, i) {
    this.segHeld[i] = false;
    this._press(el, () => { this.segHeld[i] = true; }, () => { this.segHeld[i] = false; });
  }

  /** 旋回入力量を消費して返す */
  consumeLook(out) {
    out.x = this.lookDX; out.y = this.lookDY;
    this.lookDX = 0; this.lookDY = 0;
    return out;
  }

  consumeJump() {
    const j = this.jumpQueued;
    this.jumpQueued = false;
    return j;
  }

  consumeAbility() {
    const a = this.abilityQueued;
    this.abilityQueued = false;
    return a;
  }

  consumeTargetCycle() {
    const t = this.targetCycleQueued;
    this.targetCycleQueued = false;
    return t;
  }
}
// V7.1: スロット順の発射キー(ハードポイント数 2〜4 に対応)
InputManager.FIRE_KEYS = ['Space', 'KeyZ', 'KeyX', 'KeyC'];

// ============================================================
// EnemyAI: ステートマシン(接近・牽制/交戦/遮蔽退避/再出撃)
//   V6.6 FFA: 候補 = 自分以外の生存全機。スコア = 距離(近いほど高)
//   + LOS ボーナス + 直近 HATE_TIME 秒以内に自分を撃った相手へのヘイト
//   - 既に 2 機から狙われている相手への減点(過集中の自然分散)。
//   武器/アビリティは機体クラス(robot.cls)由来。
// ============================================================
class EnemyAI {
  constructor(robot, game) {
    this.bot = robot;
    this.game = game;
    this.reset();
  }

  reset() {
    this.state = 'APPROACH';
    this.target = null;             // FFA: 現在のターゲット(Robot)
    this.retargetT = rng() * 0.5;   // 再評価タイマー(機体ごとにずらす)
    this.thinkTimer = rng() * 0.25; // 思考タイミングを機体ごとにずらす
    this.strafeDir = rng() < 0.5 ? 1 : -1;
    this.strafeTimer = 0;
    this.jumpTimer = 3 + rng() * 4;
    this.missileTimer = 5 + rng() * 7; // 初弾は少し待つ
    this.coverPoint = new THREE.Vector3();
    this.coverWait = 0;
    this.retreatCooldown = 0;
    this.flankSign = rng() < 0.5 ? 1 : -1;
    // スタック検知(運河/袋小路でのハマり対策)
    this.stuckTimer = 0;
    this.stuckPos = new THREE.Vector3().copy(this.bot.position);
    this.unstickTimer = 0;
    this.unstickX = 0;
    this.unstickZ = 1;
  }

  /**
   * ターゲット再評価(1〜2 秒ごと / 現ターゲット死亡時は即時)。
   * 距離 + LOS + ヘイト − 過集中ペナルティで採点。
   */
  pickTarget() {
    const bot = this.bot;
    let best = null, bestScore = -Infinity;
    for (const r of this.game.robots) {
      if (r === bot || !r.alive) continue;
      const d = bot.position.distanceTo(r.position);
      let score = 100 - d * 0.6;                       // 近いほど高い
      if (this.game.hasLOS(bot, r)) score += CONFIG.LOS_BONUS;
      if (bot.lastAttacker === r && this.game.elapsed - bot.lastAttackT < CONFIG.HATE_TIME) {
        score += CONFIG.HATE_BONUS;                    // 撃たれた相手にヘイト
      }
      if (this.game.countTargeters(r, this) >= 2) score -= CONFIG.CROWD_PENALTY; // 過集中回避
      if (score > bestScore) { bestScore = score; best = r; }
    }
    this.target = best;
  }

  /** 状態遷移(0.25s ごと) */
  decide(dist, hasLOS) {
    const bot = this.bot;
    this.retreatCooldown = Math.max(0, this.retreatCooldown - 0.25);

    if (this.state === 'COVER') {
      // 遮蔽に到着していたら待機 → 熱回復で再出撃
      if (bot.position.distanceTo(this.coverPoint) < 3.5) this.coverWait -= 0.25;
      if (!bot.overheated && this.coverWait <= 0) {
        this.state = 'APPROACH';
        this.retreatCooldown = 8; // すぐ再退避しない
      }
      return;
    }
    // 退避条件: オーバーヒート中 or HP 低下(クールダウン付き)
    if (bot.overheated || (bot.hp <= CONFIG.ENEMY_RETREAT_HP && this.retreatCooldown <= 0)) {
      this.state = 'COVER';
      this.coverWait = 2.2;
      this.pickCover();
      return;
    }
    // 射程内 + 視線が通れば交戦(FFA: トークン制なし)
    if (dist <= CONFIG.ENEMY_COMBAT_RANGE && hasLOS) {
      this.state = 'COMBAT';
    } else {
      this.state = 'APPROACH';
      if (rng() < 0.15) this.flankSign *= -1; // 回り込み方向を時々変える
    }
  }

  /** 現在のターゲットから見てビルの裏側になる退避点を選ぶ */
  pickCover() {
    const threat = this.target || this.game.player;
    let best = null, bestDist = Infinity;
    for (const b of this.game.buildings) {
      _v1.set(b.cx - threat.position.x, 0, b.cz - threat.position.z).normalize();
      const px = clamp(b.cx + _v1.x * (b.radius + 4.5), -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT);
      const pz = clamp(b.cz + _v1.z * (b.radius + 4.5), -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT);
      const d = this.bot.position.distanceTo(_v2.set(px, 0, pz));
      if (d < bestDist) { bestDist = d; best = { px, pz }; }
    }
    if (best) this.coverPoint.set(best.px, 0, best.pz);
  }

  update(dt, time) {
    const bot = this.bot;
    if (!bot.alive) { bot.speed01 = 0; return; }

    // ---- ターゲット再評価(1〜2 秒ごと / 死亡・喪失時は即時) ----
    this.retargetT -= dt;
    if (!this.target || !this.target.alive || this.retargetT <= 0) {
      this.pickTarget();
      this.retargetT = CONFIG.TARGET_REEVAL_MIN
        + rng() * (CONFIG.TARGET_REEVAL_MAX - CONFIG.TARGET_REEVAL_MIN);
    }
    const tgt = this.target;
    if (!tgt) { // 生存対象なし(決着済み)
      bot.applyMove(0, 0, 0, dt, this.game.obstacles);
      return;
    }

    _v1.subVectors(tgt.position, bot.position);
    _v1.y = 0;
    const dist = _v1.length();
    const hasLOS = this.game.hasLOS(bot, tgt);

    this.thinkTimer -= dt;
    if (this.thinkTimer <= 0) {
      this.thinkTimer = 0.25;
      this.decide(dist, hasLOS);
    }

    // ---- 状態ごとの移動方向を決定 ----
    let mx = 0, mz = 0;
    if (this.state === 'COVER') {
      _v2.subVectors(this.coverPoint, bot.position);
      _v2.y = 0;
      if (_v2.length() > 2.5) {
        _v2.normalize();
        mx = _v2.x; mz = _v2.z;
      }
    } else if (this.state === 'APPROACH') {
      _v2.copy(_v1).normalize();
      if (!hasLOS) {
        // 視線が通らない: 回り込み(進行方向を斜めにずらす)
        const a = this.flankSign * 0.75;
        const cos = Math.cos(a), sin = Math.sin(a);
        mx = _v2.x * cos - _v2.z * sin;
        mz = _v2.x * sin + _v2.z * cos;
      } else if (dist < 45) {
        // 牽制: 交戦距離の外縁 → 距離を保って旋回(撃たない)
        _v3.set(-_v2.z, 0, _v2.x).multiplyScalar(this.flankSign);
        const radial = dist < 28 ? -0.7 : 0.2;
        mx = _v3.x + _v2.x * radial;
        mz = _v3.z + _v2.z * radial;
        const l = Math.hypot(mx, mz);
        if (l > 1e-4) { mx /= l; mz /= l; }
      } else {
        mx = _v2.x; mz = _v2.z;
      }
    } else if (this.state === 'COMBAT') {
      // ストレイフ(横移動)+ 距離調整
      this.strafeTimer -= dt;
      if (this.strafeTimer <= 0) {
        this.strafeTimer = 1.2 + rng() * 1.8;
        this.strafeDir *= -1;
      }
      _v2.copy(_v1).normalize();                       // 前(プレイヤー方向)
      _v3.set(-_v2.z, 0, _v2.x).multiplyScalar(this.strafeDir); // 横
      let radial = 0;
      if (dist > 45) radial = 0.8;
      else if (dist < 22) radial = -0.8;
      mx = _v3.x + _v2.x * radial;
      mz = _v3.z + _v2.z * radial;
      const l = Math.hypot(mx, mz);
      if (l > 1e-4) { mx /= l; mz /= l; }
    }

    // ---- スタック検知: 移動指示があるのに 2 秒間ほぼ動けていない → 別方向へ ----
    if (this.unstickTimer > 0) {
      this.unstickTimer -= dt;
      mx = this.unstickX;
      mz = this.unstickZ;
    } else if (mx !== 0 || mz !== 0) {
      this.stuckTimer += dt;
      if (this.stuckTimer >= 2) {
        if (bot.position.distanceToSquared(this.stuckPos) < 1.0) {
          const a = rng() * Math.PI * 2; // ランダムな別方向へ 1.5 秒退避
          this.unstickX = Math.sin(a);
          this.unstickZ = Math.cos(a);
          this.unstickTimer = 1.5;
        }
        this.stuckTimer = 0;
        this.stuckPos.copy(bot.position);
      }
    } else {
      this.stuckTimer = 0;
      this.stuckPos.copy(bot.position);
    }

    // ---- 移動適用(加速度モデル。速度は機体クラス + スプリント由来) ----
    const speed = (mx !== 0 || mz !== 0) ? bot.effectiveSpeed : 0;
    bot.applyMove(mx, mz, speed, dt, this.game.obstacles);
    // 下半身: 照準から ±LEG_TWIST_CLAMP に制限(敵も横ストレイフで捻れないように)。
    // 背面方向は前向きのまま後ずさり
    if (mx !== 0 || mz !== 0) {
      const leg = legYawTarget(bot.torsoYaw, Math.atan2(mx, mz));
      bot.yaw = lerpAngle(bot.yaw, leg.yaw, Math.min(1, dt * CONFIG.TURN_RATE * 0.7));
      bot.backpedal = leg.back;
    } else {
      bot.backpedal = false;
    }

    // ---- 上半身は常にターゲット方向へ ----
    const aimYaw = Math.atan2(_v1.x, _v1.z);
    bot.torsoYaw = lerpAngle(bot.torsoYaw, aimYaw, Math.min(1, dt * CONFIG.TORSO_TURN_RATE));

    // ---- 時々ジャンプ ----
    this.jumpTimer -= dt;
    if (this.jumpTimer <= 0) {
      this.jumpTimer = 2.5 + rng() * 4;
      if (this.state !== 'COVER' && rng() < 0.65 && bot.jump()) {
        this.game.spawnBoost(bot);
      }
    }

    // ---- アビリティ(クラス由来) ----
    if (bot.abilityCd <= 0) {
      if (bot.ability === 'sprint') {
        // 接近に距離がある時 / 低 HP で離脱する時に加速
        if ((this.state === 'APPROACH' && dist > 30) || (this.state === 'COVER' && bot.hp < 45)) {
          if (bot.useAbility()) this.game.onAbilityUsed(bot);
        }
      } else if (bot.ability === 'shield') {
        // 直近で被弾し、開けた場所を移動している時に展開
        if (this.game.elapsed - bot.lastAttackT < 1.2 && this.state !== 'COVER' && bot.speed01 > 0.3) {
          if (bot.useAbility()) this.game.onAbilityUsed(bot);
        }
      }
    }

    // ---- 射撃(COMBAT のみ。スロット 2〜4 を武器種別ごとに運用 / V7.1) ----
    //   V7.0: 開幕 OPENING_PEACE 秒は射撃禁止(即交戦の回避)。チャージ完了は下で射出
    const peaceOver = this.game.matchTime >= CONFIG.OPENING_PEACE;
    const canShoot = this.state === 'COMBAT' && hasLOS && peaceOver;
    // V7.1: ARTILLERY は攻城武器 — 接近中(APPROACH)でも射程内 + LOS なら撃つ
    const canSiege = (this.state === 'COMBAT' || this.state === 'APPROACH') && hasLOS && peaceOver;
    if (canSiege) {
      for (let i = 0; i < bot.slots.length; i++) {
        const w = CONFIG.WEAPONS[bot.slots[i]];
        if (!w || w.kind !== 'artillery') continue;
        if (bot.slotCd[i] <= 0 && dist >= w.rangeMin && dist <= w.rangeMax) {
          bot.slotCd[i] = w.cd + rng() * 3;
          // 着弾中心 = 目標の現在位置 + 軽いリード(完璧でない)
          _v5.copy(tgt.position);
          _v5.x += tgt.velX * 0.8 * (0.5 + rng());
          _v5.z += tgt.velZ * 0.8 * (0.5 + rng());
          this.game.artillery.fireVolley(bot, _v5, w);
        }
      }
    }
    if (canShoot) {
      for (let i = 0; i < bot.slots.length; i++) {
        const w = CONFIG.WEAPONS[bot.slots[i]];
        if (!w) continue;
        if (w.kind === 'bolt') { // V7.0: リード射撃のエネルギーボルト(ARC/REPULSOR 含む)
          if (dist < (w.range || CONFIG.WEAPON_RANGE) && bot.canFireSlot(i)) {
            this.game.aiBolt(bot, tgt, i);
          }
        } else if (w.kind === 'railcharge' || w.kind === 'tempest') {
          // V7.0/V7.1: チャージ式(予兆あり)。完了は下のチャージ解決が射出
          if (dist < (w.range || CONFIG.WEAPON_RANGE) && bot.chargeSlot < 0 && bot.canFireSlot(i)) {
            this.game.startCharge(bot, i);
          }
        } else if (w.kind === 'hitscan') { // MG / NEEDLE
          if (dist < (w.range || CONFIG.WEAPON_RANGE) && bot.canFireSlot(i)) {
            this.game.aiShot(bot, tgt, i);
          }
        } else if (w.kind === 'missile') {
          // ミサイル(低頻度)
          this.missileTimer -= dt;
          if (this.missileTimer <= 0 && dist >= 20 && dist <= 75 && bot.slotCd[i] <= 0) {
            this.missileTimer = CONFIG.ENEMY_MISSILE_COOLDOWN + rng() * 4;
            bot.slotCd[i] = CONFIG.ENEMY_MISSILE_COOLDOWN;
            this.game.missiles.fireSalvo(bot, tgt, i);
          }
        } else if (w.kind === 'swarm') {
          // V7.1: マイクロロケット(緩追尾・ロック不要)
          if (bot.slotCd[i] <= 0 && dist >= 12 && dist <= (w.range || 55)) {
            bot.slotCd[i] = w.cd + rng() * 2;
            this.game.fireSwarm(bot, tgt, i, w);
          }
        } else if (w.kind === 'rocket') {
          // バズーカ(中近距離で直射)
          if (bot.slotCd[i] <= 0 && dist >= 12 && dist <= 70) {
            bot.slotCd[i] = CONFIG.ENEMY_BAZOOKA_COOLDOWN + rng() * 2;
            this.game.aiBazooka(bot, tgt, i);
          }
        }
      }
    }

    // ---- チャージ完了の解決(RAILGUN → ヒットスキャン / TEMPEST → 持続ビーム) ----
    if (bot.chargeSlot >= 0 && bot.chargeT[bot.chargeSlot] <= 0) {
      tgt.chest(_v5);
      const miss = rng() > CONFIG.ENEMY_ACCURACY;
      const s = miss ? 3.0 : 0.4;
      _v5.x += (rng() - 0.5) * s;
      _v5.y += (rng() - 0.5) * s * 0.5;
      _v5.z += (rng() - 0.5) * s;
      this.game.resolveCharge(bot, _v5, tgt); // tempest はターゲット追尾照射
    }
  }
}

// ============================================================
// Game: 全体統括
// ============================================================
class Game {
  /**
   * @param {object} setup ハンガーでの選択結果
   *   { playerClass: 'MEDIUM', aiClasses: ['LIGHT','HEAVY','ASSAULT'],
   *     gltfs: { player: gltf|null, ais: [gltf|null × 3] } }
   *   gltf が null のクラスはプリミティブ機体で出撃(フォールバック)
   */
  constructor(setup) {
    this.setup = setup;
    this.sound = new SoundManager();
    this.bgm = new BGMManager(this.sound);
    this.initRenderer();
    this.initScene();
    this.initComposer();      // ブルーム(失敗時は null → 素のレンダリング)
    this.buildArena();
    this.initRobots();
    this.initPools();
    this.initHUD();
    this.input = new InputManager();
    this.applyLoadoutHUD(); // V7.1: input 生成後に再構築(セグメントのタッチ結線)
    this.raycaster = new THREE.Raycaster();
    this.fxQueue = [];        // 多段爆発などの遅延エフェクト {t, fn}
    this.sound.listener = this.camera.position; // 距離減衰の基準
    this.bgm.init();          // ファイル存在チェック(無ければチップチューン)
    this.bgm.setMode('battle'); // ハンガーで選択済み → 即戦闘

    // ゲーム状態
    this.started = true;         // ハンガー選択時点で開始(V6.6)
    this.inHangar = false;       // V6.8: true の間はドックシーンを描画(戦闘 update 停止)
    this.gameOver = false;
    this.timeScale = 1;
    this.slowmoTimer = 0;
    this.pendingResult = null;   // 'win' | 'lose'
    this.elapsed = 0;
    this.matchTime = 0;          // 経過タイマー(戦闘中のみ加算)
    this.stats = { kills: 0, damageTaken: 0, ptDamage: 0, ptCrates: 0 };

    // HUD 演出状態
    this.hitArcT = 0;            // 被弾方向インジケータ
    this.hitArcAngle = 0;        // 被弾方向(ワールド角)
    this.lockFlashT = 0;         // TARGET LOCKED フラッシュ
    this._prevLockTarget = null;
    this._prevOverheated = false;
    this.lowHpWarned = false;

    // カメラ状態(camYaw = 機体の照準方向と一体)
    this.camYaw = Math.PI;       // 初期: 敵陣(-z)方向
    this.camYawTarget = Math.PI; // 旋回の慣性: 入力は目標値を動かし camYaw が追従
    this.camPitch = 0.12;
    this.camPos = new THREE.Vector3();
    this.recoil = 0;
    this.shakeAmp = 0;           // 着地シェイク
    this.lookDelta = { x: 0, y: 0 };
    this.moveInput = { x: 0, y: 0 };

    // ロックオン状態(複数敵から1機を選択)
    this.lockTarget = null;
    this.locked = false;
    this.lockLost = 0;           // 遮蔽による猶予タイマー

    this.clock = new THREE.Clock();
    window.addEventListener('resize', () => this.onResize());

    // 初回はカメラを即座に配置
    this.updateCamera(0.1, true);
    this.renderer.setAnimationLoop(() => this.loop());
  }

  // ---------------- 初期化 ----------------
  initRenderer() {
    this.isMobile = 'ontouchstart' in window;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // モバイルはピクセル比を抑えて性能優先(ブルームのコスト対策)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.isMobile ? CONFIG.MOBILE_PIXEL_RATIO : 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  /**
   * ポストプロセス(UnrealBloom)の構築。
   * トーンマッピング整合: three r152+ はトーンマップ/色空間変換を「画面描画時のみ」
   * 適用するため、RenderPass(レンダーターゲットへの描画)では適用されず、
   * 終端の OutputPass が renderer.toneMapping(ACES)を一括適用する。
   * → 二重適用にならず、非ブルーム時と見た目の整合が取れる。
   * 構築に失敗した場合は composer = null とし、従来の renderer.render で続行。
   */
  initComposer() {
    this.composer = null;
    if (!CONFIG.BLOOM_ENABLED) return;
    try {
      const composer = new EffectComposer(this.renderer);
      this.renderPass = new RenderPass(this.scene, this.camera); // V6.8: ドック切替用に保持
      composer.addPass(this.renderPass);
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        this.isMobile ? CONFIG.BLOOM_STRENGTH_MOBILE : CONFIG.BLOOM_STRENGTH,
        CONFIG.BLOOM_RADIUS,
        CONFIG.BLOOM_THRESHOLD,
      );
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
      this.composer = composer;
      console.info('[V6.5] UnrealBloom 有効 (strength=%s)', bloom.strength);
    } catch (err) {
      console.warn('[V6.5] ブルーム構築失敗 → 通常レンダリングにフォールバック:', err);
      this.composer = null;
    }
  }

  initScene() {
    this.scene = new THREE.Scene();

    // 遠景を霞ませる Fog(やや手前から: 遠方の敵の輪郭を溶かす視認性制御)
    this.scene.fog = new THREE.Fog(0xd9c9ab, CONFIG.FOG_NEAR, CONFIG.FOG_FAR);

    // 空: グラデーションの大球(ShaderMaterial)
    const skyGeo = new THREE.SphereGeometry(700, 24, 12);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x4a82c4) },
        horizonColor: { value: new THREE.Color(0xe8d6ae) },
      },
      vertexShader: /* glsl */`
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        varying vec3 vPos;
        void main() {
          float h = clamp(normalize(vPos).y, 0.0, 1.0);
          vec3 col = mix(horizonColor, topColor, pow(h, 0.55));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    this.scene.add(new THREE.Mesh(skyGeo, skyMat));

    // 太陽光(影あり・暖色の自然光)
    const sun = new THREE.DirectionalLight(0xffe6bb, 2.6);
    sun.position.set(90, 130, 60);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -180;
    sun.shadow.camera.right = 180;
    sun.shadow.camera.top = 180;
    sun.shadow.camera.bottom = -180;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 450;
    sun.shadow.bias = -0.0004;
    this.scene.add(sun);

    // 環境光(空色 / 地面色)
    this.scene.add(new THREE.HemisphereLight(0xbdd6ee, 0x8a7f66, 1.0));
  }

  /** 都市型アリーナ生成 */
  buildArena() {
    this.obstacles = [];     // 衝突 AABB { minX,maxX,minZ,maxZ,height }
    this.buildings = [];     // AI 遮蔽候補 { cx, cz, radius }
    this.solidMeshes = [];   // レイキャスト対象(遮蔽判定)
    this.destructibles = []; // V6.6: 破壊可能物(コンテナ/バリケード/ドラム缶)

    // ---- 地面(128×128 セグメント。getGroundHeight で頂点を変位し視覚と物理を一致) ----
    const groundGeo = new THREE.PlaneGeometry(CONFIG.ARENA_SIZE, CONFIG.ARENA_SIZE, 128, 128);
    groundGeo.rotateX(-Math.PI / 2);
    {
      const pos = groundGeo.attributes.position;
      const colors = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), z = pos.getZ(i);
        const h = getGroundHeight(x, z);
        pos.setY(i, h);
        // 窪み(クレーター内/運河内)は頂点カラーで暗く
        const sh = clamp(1 + h * 0.12, 0.55, 1);
        colors[i * 3] = sh; colors[i * 3 + 1] = sh; colors[i * 3 + 2] = sh;
      }
      groundGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      groundGeo.computeVertexNormals();
    }
    const groundMat = new THREE.MeshStandardMaterial({
      map: makeGroundTexture(), roughness: 0.95, metalness: 0, vertexColors: true,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // ================================================================
    // 街区システム: CITY の道路網の間を街区とし、ビルで埋める
    // ================================================================
    const palettes = [
      { base: '#9aa4ac', tint: '#7e98ae', color: 0xa8b2ba },
      { base: '#b0a89a', tint: '#8aa0b0', color: 0xbcb4a4 },
      { base: '#8d9aa8', tint: '#6f8ca6', color: 0x96a4b2 },
    ];
    const texCache = palettes.map((p) => {
      const t = makeBuildingTexture(p.base, p.tint);
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      return t;
    });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x6b6f72, roughness: 0.9 });
    // (palette, repX, repY) ごとにマテリアルを共有してドローコール/メモリ増を抑制
    const sideMatCache = new Map();
    const getSideMat = (pi, repX, repY) => {
      const key = `${pi}_${repX}_${repY}`;
      let m = sideMatCache.get(key);
      if (!m) {
        const t = texCache[pi].clone();
        t.needsUpdate = true;
        t.repeat.set(repX, repY);
        m = new THREE.MeshStandardMaterial({
          map: t, color: palettes[pi].color, roughness: 0.85, metalness: 0.1,
        });
        sideMatCache.set(key, m);
      }
      return m;
    };

    const spawnSafe = [CONFIG.PLAYER_SPAWN, ...CONFIG.ENEMY_SPAWNS];

    // ビル 1 棟を追加(footprint は AABB)
    const addBuilding = (xa, xb, za, zb) => {
      if (this.buildings.length >= CONFIG.BUILDING_MAX) return;
      const bw = xb - xa, bd = zb - za;
      if (bw < 6 || bd < 6) return;
      const x = (xa + xb) / 2, z = (za + zb) / 2;
      // スポーン周辺は開ける
      if (spawnSafe.some(([sx, sz]) => Math.hypot(x - sx, z - sz) < 22)) return;
      // クレーターと重なる街区は広場として空ける
      for (const cr of TERRAIN.craters) {
        const nx = clamp(cr.x, xa, xb), nz = clamp(cr.z, za, zb);
        if (Math.hypot(cr.x - nx, cr.z - nz) < cr.r + 1.5) return;
      }
      // 高さ: 中心部ほど高層寄り
      const bh = 9 + rng() * 22 + (1 - Math.abs(x) / CONFIG.MOVE_LIMIT) * 6;
      const pi = Math.floor(rng() * palettes.length);
      const repX = Math.max(1, Math.round(bw / 12));
      const repY = Math.max(1, Math.round(bh / 24));
      const sideMat = getSideMat(pi, repX, repY);
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(bw, bh, bd),
        [sideMat, sideMat, roofMat, roofMat, sideMat, sideMat],
      );
      mesh.position.set(x, bh / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.solidMeshes.push(mesh);
      this.obstacles.push({ minX: xa, maxX: xb, minZ: za, maxZ: zb, height: bh });
      this.buildings.push({ cx: x, cz: z, radius: Math.hypot(bw, bd) / 2 });
    };

    // 道路リストから街区のインターバル(道路間の帯)を計算
    const computeIntervals = (roads, limit) => {
      const sorted = [...roads].sort((a, b) => a.c - b.c);
      const iv = [];
      let prev = -limit + 2;
      for (const r of sorted) {
        const a = r.c - r.w / 2, b = r.c + r.w / 2;
        if (a - prev >= 8) iv.push([prev, a]);
        prev = Math.max(prev, b);
      }
      if (limit - 2 - prev >= 8) iv.push([prev, limit - 2]);
      return iv;
    };
    // 運河帯も擬似道路として z 方向の街区を分断(運河内にビルが立たないように)
    const ca = TERRAIN.canal;
    const hRoadsAndCanal = [...CITY.hRoads, { c: ca.z, w: (ca.halfW + ca.wall) * 2 }];
    const xSpans = computeIntervals(CITY.vRoads, CONFIG.MOVE_LIMIT);
    const zSpans = computeIntervals(hRoadsAndCanal, CONFIG.MOVE_LIMIT);

    // 各街区にビルを充填(縦長街区は確率で 2 棟に分割 → 間に小路地)
    for (const [za0, zb0] of zSpans) {
      for (const [xa0, xb0] of xSpans) {
        const mX = 1.5 + rng() * 1.5; // 歩道分のセットバック
        const mZ = 1.5 + rng() * 1.5;
        const xa = xa0 + mX, xb = xb0 - mX;
        const za = za0 + mZ, zb = zb0 - mZ;
        if (zb - za > 34 && rng() < CONFIG.BLOCK_SPLIT_CHANCE) {
          const mid = (za + zb) / 2;
          const gap = 2.5; // 小路地(全幅 5)
          addBuilding(xa, xb, za, mid - gap);
          addBuilding(xa, xb, mid + gap, zb);
        } else {
          addBuilding(xa, xb, za, zb);
        }
      }
    }

    // ================================================================
    // 街路上の部分遮蔽(コンテナ / バリケード / 瓦礫)で道幅を局所的に狭める
    // ================================================================
    const containerColors = ['#b5552e', '#3e6e8e', '#6e8e3e', '#8e3e5e'];
    const barricadeMat = new THREE.MeshStandardMaterial({ color: 0x9a958c, roughness: 0.9, metalness: 0.05 });
    const rubbleMat = new THREE.MeshStandardMaterial({ color: 0x7a756c, roughness: 0.95, metalness: 0 });
    const rubbleBitGeo = new THREE.BoxGeometry(1, 1, 1);
    const rubbleConeGeo = new THREE.ConeGeometry(1, 1.4, 5);

    // 配置候補: 道路上のランダム点(スポーン/クレーター/運河/橋を避ける)
    const propOk = (x, z, rad) => {
      if (spawnSafe.some(([sx, sz]) => Math.hypot(x - sx, z - sz) < 16)) return false;
      if (TERRAIN.craters.some((cr) => Math.hypot(x - cr.x, z - cr.z) < cr.r + rad + 2)) return false;
      if (Math.abs(z - ca.z) < ca.halfW + ca.wall + rad + 2) return false; // 運河帯
      return Math.abs(x) < CONFIG.MOVE_LIMIT - 8 && Math.abs(z) < CONFIG.MOVE_LIMIT - 8;
    };
    let propsPlaced = 0;
    let propTries = 0;
    while (propsPlaced < CONFIG.STREET_PROPS && propTries < 200) {
      propTries++;
      // 道路を選ぶ(縦横を交互に)
      const vertical = rng() < 0.5;
      const road = vertical
        ? CITY.vRoads[Math.floor(rng() * CITY.vRoads.length)]
        : CITY.hRoads[Math.floor(rng() * CITY.hRoads.length)];
      const along = (rng() - 0.5) * 2 * (CONFIG.MOVE_LIMIT - 14);
      const wide = road.w >= 10;
      // 狭い路地では端に寄せて通行ギャップを残す / 広い道路は中寄りでもよい
      const lateral = wide
        ? (rng() - 0.5) * (road.w - 5)
        : (rng() < 0.5 ? -1 : 1) * (road.w / 2 - 1.3);
      const x = vertical ? road.c + lateral : along;
      const z = vertical ? along : road.c + lateral;

      const type = wide ? Math.floor(rng() * 3) : 2; // 路地は瓦礫のみ(小さい)
      let hw, hd, h, mesh;
      if (type === 0) {
        // コンテナ
        const cw = 5.5, ch = 2.6, cd = 2.6;
        const mat = new THREE.MeshStandardMaterial({
          map: makeContainerTexture(containerColors[propsPlaced % containerColors.length]),
          roughness: 0.8, metalness: 0.35,
        });
        mesh = new THREE.Mesh(new THREE.BoxGeometry(cw, ch, cd), mat);
        const rot = vertical ? Math.PI / 2 : 0; // 道路に沿わせる(軸平行)
        mesh.rotation.y = rot;
        hw = rot === 0 ? cw / 2 : cd / 2;
        hd = rot === 0 ? cd / 2 : cw / 2;
        h = ch;
      } else if (type === 1) {
        // コンクリートバリケード
        const bw2 = 4.2, bh2 = 1.3, bd2 = 1.1;
        mesh = new THREE.Mesh(new THREE.BoxGeometry(bw2, bh2, bd2), barricadeMat);
        const rot = vertical ? Math.PI / 2 : 0;
        mesh.rotation.y = rot;
        hw = rot === 0 ? bw2 / 2 : bd2 / 2;
        hd = rot === 0 ? bd2 / 2 : bw2 / 2;
        h = bh2;
      } else {
        // 瓦礫の山(メイン箱 + 装飾ビット)
        const rw = 2.4 + rng() * 0.8;
        mesh = new THREE.Mesh(new THREE.BoxGeometry(rw, 1.5, rw), rubbleMat);
        mesh.rotation.y = 0;
        for (let b = 0; b < 3; b++) { // 装飾(衝突なし)
          const bit = new THREE.Mesh(rng() < 0.5 ? rubbleBitGeo : rubbleConeGeo, rubbleMat);
          bit.position.set((rng() - 0.5) * rw, 0.5 + rng() * 0.5, (rng() - 0.5) * rw);
          bit.rotation.y = rng() * Math.PI;
          bit.scale.setScalar(0.5 + rng() * 0.6);
          bit.castShadow = true;
          mesh.add(bit);
        }
        hw = rw / 2;
        hd = rw / 2;
        h = 1.5;
      }
      const rad = Math.max(hw, hd);
      if (!propOk(x, z, rad)) continue;
      const gy = getGroundHeight(x, z);
      mesh.position.set(x, gy + h / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.solidMeshes.push(mesh);
      const obstacle = { minX: x - hw, maxX: x + hw, minZ: z - hd, maxZ: z + hd, height: gy + h };
      this.obstacles.push(obstacle);
      // コンテナ/バリケードは破壊可能(瓦礫は不可壊のまま)
      if (type === 0 || type === 1) {
        const d = {
          mesh, hitMesh: mesh, obstacle,
          hp: CONFIG.PROP_HP, maxHp: CONFIG.PROP_HP,
          type: 'prop', dead: false,
          pos: new THREE.Vector3(x, gy + h / 2, z),
        };
        mesh.userData.destructible = d;
        this.destructibles.push(d);
      }
      propsPlaced++;
    }

    // ================================================================
    // 燃料ドラム缶(V6.6): 被弾で爆発・誘爆連鎖。街路と運河沿いに配置
    // ================================================================
    {
      const bodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.5, 12);
      const bandGeo = new THREE.CylinderGeometry(0.57, 0.57, 0.28, 12);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb83a2a, roughness: 0.55, metalness: 0.35 });
      const bandMat = new THREE.MeshStandardMaterial({
        color: 0xff7a20, emissive: 0xff5510, emissiveIntensity: 1.5, roughness: 0.4, // 発光帯(ブルーム映え)
      });
      let placed2 = 0, tries2 = 0;
      while (placed2 < CONFIG.BARREL_COUNT && tries2 < 200) {
        tries2++;
        let x, z;
        if (rng() < 0.35) {
          // 運河沿い(川床の縁)
          x = (rng() - 0.5) * 2 * 125;
          z = ca.z + (rng() < 0.5 ? -1 : 1) * (ca.halfW - 1.5);
        } else {
          // 街路上(propOk と同様の選び方)
          const vertical = rng() < 0.5;
          const road = vertical
            ? CITY.vRoads[Math.floor(rng() * CITY.vRoads.length)]
            : CITY.hRoads[Math.floor(rng() * CITY.hRoads.length)];
          const along = (rng() - 0.5) * 2 * (CONFIG.MOVE_LIMIT - 16);
          const lateral = (rng() < 0.5 ? -1 : 1) * (road.w / 2 - 1.2);
          x = vertical ? road.c + lateral : along;
          z = vertical ? along : road.c + lateral;
          if (Math.abs(z - ca.z) < ca.halfW + ca.wall + 2) continue; // 運河帯は上の分岐で
        }
        if (spawnSafe.some(([sx, sz]) => Math.hypot(x - sx, z - sz) < 14)) continue;
        if (TERRAIN.craters.some((cr) => Math.hypot(x - cr.x, z - cr.z) < cr.r + 2)) continue;
        if (this.destructibles.some((d) => d.type === 'barrel' && Math.hypot(x - d.pos.x, z - d.pos.z) < 4)) continue;
        if (Math.abs(x) > CONFIG.MOVE_LIMIT - 6 || Math.abs(z) > CONFIG.MOVE_LIMIT - 6) continue;

        const gy = getGroundHeight(x, z);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.set(x, gy + 0.75, z);
        body.castShadow = true;
        const band = new THREE.Mesh(bandGeo, bandMat);
        band.position.y = 0.25;
        body.add(band);
        this.scene.add(body);
        this.solidMeshes.push(body);
        const obstacle = { minX: x - 0.6, maxX: x + 0.6, minZ: z - 0.6, maxZ: z + 0.6, height: gy + 1.5 };
        this.obstacles.push(obstacle);
        const d = {
          mesh: body, hitMesh: body, obstacle,
          hp: CONFIG.BARREL_HP, maxHp: CONFIG.BARREL_HP,
          type: 'barrel', dead: false,
          pos: new THREE.Vector3(x, gy + 0.75, z),
        };
        body.userData.destructible = d;
        this.destructibles.push(d);
        placed2++;
      }
    }

    // ================================================================
    // 橋(運河を渡るデッキ + スロープ + 欄干)
    // ================================================================
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x707880, roughness: 0.7, metalness: 0.4 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0x4c545c, roughness: 0.6, metalness: 0.5 });
    for (const b of TERRAIN.bridges) {
      const spanZ = b.zMax - b.zMin;
      const zc = (b.zMin + b.zMax) / 2;
      // デッキ(上面 = b.top。レイキャスト対象 → ビーム/ミサイルを遮る)
      const deck = new THREE.Mesh(new THREE.BoxGeometry(b.halfW * 2, 0.5, spanZ), bridgeMat);
      deck.position.set(b.x, b.top - 0.25, zc);
      deck.castShadow = true;
      deck.receiveShadow = true;
      this.scene.add(deck);
      this.solidMeshes.push(deck);
      // スロープ(見た目のみ。物理は getSupportHeight が担当)
      for (const side of [-1, 1]) {
        const ramp = new THREE.Mesh(new THREE.BoxGeometry(b.halfW * 2, 0.3, b.ramp + 0.6), bridgeMat);
        const zr = side < 0 ? b.zMin - b.ramp / 2 : b.zMax + b.ramp / 2;
        ramp.position.set(b.x, b.top / 2 - 0.1, zr);
        ramp.rotation.x = side * Math.atan2(b.top, b.ramp);
        ramp.castShadow = true;
        ramp.receiveShadow = true;
        this.scene.add(ramp);
      }
      // 欄干(低い遮蔽として機能。橋の下を通る機体は素通り = minY 付き障害物)
      for (const side of [-1, 1]) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, spanZ), railMat);
        rail.position.set(b.x + side * (b.halfW - 0.2), b.top + 0.45, zc);
        rail.castShadow = true;
        this.scene.add(rail);
        this.solidMeshes.push(rail);
        this.obstacles.push({
          minX: b.x + side * (b.halfW - 0.2) - 0.2, maxX: b.x + side * (b.halfW - 0.2) + 0.2,
          minZ: b.zMin, maxZ: b.zMax,
          height: b.top + 0.9,
          minY: b.top, // 桁下(運河内)を通る機体は衝突しない
        });
      }
    }

    // ---- 外周フェンス(境界壁) ----
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x5a6068, roughness: 0.85, metalness: 0.3 });
    const L = CONFIG.MOVE_LIMIT + 4;
    const wallDefs = [
      { x: 0, z: -L, w: L * 2 + 3, d: 1.5 },
      { x: 0, z: L, w: L * 2 + 3, d: 1.5 },
      { x: -L, z: 0, w: 1.5, d: L * 2 + 3 },
      { x: L, z: 0, w: 1.5, d: L * 2 + 3 },
    ];
    for (const wd of wallDefs) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(wd.w, 3.2, wd.d), wallMat);
      mesh.position.set(wd.x, 1.6, wd.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.solidMeshes.push(mesh);
      this.obstacles.push({
        minX: wd.x - wd.w / 2, maxX: wd.x + wd.w / 2,
        minZ: wd.z - wd.d / 2, maxZ: wd.z + wd.d / 2,
        height: 3.2,
      });
    }

    // ---- フェンス警告灯(発光球を等間隔に / InstancedMesh で1ドローコール) ----
    const lampGeo = new THREE.SphereGeometry(0.17, 8, 6);
    this.lampMat = new THREE.MeshBasicMaterial({ color: 0xff4444 });
    const lampPos = [];
    for (let t = -L + 6; t <= L - 6; t += 14) {
      lampPos.push([t, -L], [t, L], [-L, t], [L, t]);
    }
    const lamps = new THREE.InstancedMesh(lampGeo, this.lampMat, lampPos.length);
    const dummy = new THREE.Object3D();
    lampPos.forEach(([x, z], i) => {
      dummy.position.set(x, 3.45, z);
      dummy.updateMatrix();
      lamps.setMatrixAt(i, dummy.matrix);
    });
    lamps.instanceMatrix.needsUpdate = true;
    this.scene.add(lamps);
  }

  initRobots() {
    // V6.6: robots[] に一元化(robots[0] = プレイヤー)。将来の P2P 参加は
    // robots[] に Robot を追加 + マーカー/レーダーを enemies 相当へ載せるだけで成立する
    const sel = this.setup;
    const playerCls = CONFIG.MECH_CLASSES[sel.playerClass];
    this.player = new Robot(this.scene, playerCls, 'YOU', sel.gltfs.player, true, sel.playerSlots);
    const [px, pz] = CONFIG.PLAYER_SPAWN;
    this.player.reset(px, pz, Math.PI);

    // AI 3 機: プレイヤーが選ばなかったクラス + RAIDER(重複時は名前で区別)
    this.enemies = [];
    this.ais = [];
    const usedNames = Object.create(null);
    const spawns = CONFIG.ENEMY_SPAWNS.slice(0, CONFIG.ENEMY_COUNT);
    spawns.forEach(([x, z], i) => {
      const clsKey = sel.aiClasses[i % sel.aiClasses.length];
      const cls = CONFIG.MECH_CLASSES[clsKey];
      let name = cls.name;
      usedNames[name] = (usedNames[name] || 0) + 1;
      if (usedNames[name] > 1) name = `${name}-${usedNames[name]}`;
      // V7.1: AI はクラスごとの専用ロードアウト(aiWeapons)で出撃
      const e = new Robot(this.scene, cls, name, sel.gltfs.ais[i] || null, false,
        cls.aiWeapons || cls.weapons);
      e.reset(x, z, Math.atan2(px - x, pz - z)); // プレイヤー方向を向いて出現
      this.enemies.push(e);
      this.ais.push(new EnemyAI(e, this));
    });
    this.robots = [this.player, ...this.enemies]; // FFA の一元リスト
    this.allRobots = this.robots;                 // 既存コード互換
  }

  /** robot を現在ターゲットにしている AI の数(except 以外) */
  countTargeters(robot, exceptAi) {
    let n = 0;
    for (const a of this.ais) {
      if (a !== exceptAi && a.bot.alive && a.target === robot) n++;
    }
    return n;
  }

  /** シールド判定: victim が展開中かつ攻撃元が前方(±75°)なら遮断 */
  shieldBlocks(victim, fromPos) {
    if (!victim.shieldT || victim.shieldT <= 0) return false;
    const dx = fromPos.x - victim.position.x;
    const dz = fromPos.z - victim.position.z;
    const d = Math.hypot(dx, dz);
    if (d < 1e-3) return false;
    const dot = (dx * Math.sin(victim.torsoYaw) + dz * Math.cos(victim.torsoYaw)) / d;
    return dot > CONFIG.SHIELD_FRONT_DOT;
  }

  /** シールド被弾の波紋エフェクト */
  shieldRipple(victim, fromPos) {
    victim.chest(_v1);
    _v2.subVectors(fromPos, _v1).normalize();
    _v1.addScaledVector(_v2, CONFIG.SHIELD_RADIUS); // シールド面付近
    this.rings.spawn(_v1, { mode: 'billboard', scale: 3, life: 0.35, color: 0x88e8ff, boost: 1.8 });
    this.particles.spawn(_v1, 4, { color: 0x88e8ff, speed: 3, life: 0.25, gravity: 0, scale: 1.2, boost: 1.8 });
    this.sound.playAt('shieldHit', _v1, 14);
  }

  // ---------------- 破壊可能物(V6.6) ----------------
  /** 配列から要素を除去(プール外の希少操作のみで使用) */
  _spliceItem(arr, item) {
    const i = arr.indexOf(item);
    if (i >= 0) arr.splice(i, 1);
  }

  /** 破壊可能物へのダメージ(0 以下で破壊/爆発) */
  damageDestructible(d, dmg) {
    if (d.dead) return;
    d.hp -= dmg;
    if (d.hp > 0) {
      // 被弾スパーク(まだ壊れない)
      this.particles.spawn(d.pos, 2, { color: 0xffaa66, speed: 4, life: 0.25, gravity: -8, boost: 1.4 });
      return;
    }
    if (d.type === 'barrel') this.explodeBarrel(d);
    else this.destroyProp(d);
  }

  /** 範囲内の破壊可能物にダメージ(爆発系から呼ばれる) */
  damageDestructiblesAt(pos, radius, dmg) {
    for (const d of this.destructibles) {
      if (d.dead) continue;
      if (pos.distanceTo(d.pos) < radius) this.damageDestructible(d, dmg);
    }
  }

  /** 遮蔽の恒久破壊: シーン/obstacles/solidMeshes から除去 → 以後 LOS が通る */
  destroyProp(d) {
    d.dead = true;
    d.mesh.visible = false;
    this._spliceItem(this.solidMeshes, d.hitMesh);
    this._spliceItem(this.obstacles, d.obstacle);
    // 破片演出
    this.particles.spawn(d.pos, 8, { color: 0x8a8276, speed: 7, life: 0.8, gravity: -14, scale: 1.2, blending: 'normal' });
    this.particles.spawn(d.pos, 6, { color: 0xbbb29e, speed: 4, life: 0.6, gravity: -3, scale: 1.5 });
    this.sound.playAt('explosion', d.pos, 8, 0.45);
  }

  /** ドラム缶爆発: 全機に範囲ダメージ(設置者なし)+ 近接ドラム缶へ誘爆連鎖 */
  explodeBarrel(d) {
    if (d.dead) return;
    d.dead = true;
    d.mesh.visible = false;
    this._spliceItem(this.solidMeshes, d.hitMesh);
    this._spliceItem(this.obstacles, d.obstacle);
    const pos = d.pos;

    // 演出(火球 + 地面リング + 光 + シェイク)
    this.particles.spawn(pos, 14, { color: 0xffa040, speed: 11, life: 0.6, gravity: -7, scale: 2, boost: 2 });
    this.particles.spawn(pos, 5, { color: 0x333333, speed: 3, life: 1.2, gravity: 3, scale: 2, upBias: 1, blending: 'normal' });
    this.rings.spawn(pos, { mode: 'ground', scale: CONFIG.BARREL_RADIUS, life: 0.45, color: 0xffaa55, boost: 1.8, y: getGroundHeight(pos.x, pos.z) + 0.3 });
    this.lights.spawn(pos, 0xff6622, 45);
    this.sound.playAt('explosion', pos, 14);
    this.shakeFrom(pos, 0.4, 26);

    // 全機にダメージ(35 → 15 減衰。攻撃者なし = ヘイト変化なし)
    const R = CONFIG.BARREL_RADIUS;
    for (const c of this.robots) {
      if (!c.alive) continue;
      c.chest(_v2);
      const dist = pos.distanceTo(_v2);
      if (dist >= R) continue;
      const t = dist / R;
      const dmg = Math.round(CONFIG.BARREL_DMG_CENTER + (CONFIG.BARREL_DMG_EDGE - CONFIG.BARREL_DMG_CENTER) * t);
      this.dmgTexts.show(_v2, String(dmg), c === this.player);
      this.dealDamage(c, dmg, pos, null);
    }

    // 周囲の破壊可能物: ドラム缶は遅延誘爆(連鎖)、遮蔽は即ダメージ
    for (const d2 of this.destructibles) {
      if (d2.dead || d2 === d) continue;
      const dist = pos.distanceTo(d2.pos);
      if (dist >= R + 1) continue;
      if (d2.type === 'barrel') {
        this.fxQueue.push({ t: this.elapsed + CONFIG.BARREL_CHAIN_DELAY, fn: () => this.explodeBarrel(d2) });
      } else {
        this.damageDestructible(d2, CONFIG.BARREL_DMG_CENTER);
      }
    }
  }

  /** リスタート時に破壊物を復元 */
  restoreDestructibles() {
    for (const d of this.destructibles) {
      d.hp = d.maxHp;
      if (!d.dead) continue;
      d.dead = false;
      d.mesh.visible = true;
      if (this.solidMeshes.indexOf(d.hitMesh) < 0) this.solidMeshes.push(d.hitMesh);
      if (this.obstacles.indexOf(d.obstacle) < 0) this.obstacles.push(d.obstacle);
    }
  }

  /** アビリティ発動時の共通演出 */
  onAbilityUsed(robot) {
    if (robot.ability === 'sprint') {
      _v1.copy(robot.position);
      _v1.y += 0.6;
      this.particles.spawn(_v1, 10, { color: 0x66c8ff, speed: 5, life: 0.4, gravity: 1, scale: 1.4, upBias: -0.5, boost: 1.8 });
      if (robot === this.player) this.sound.play('sprint');
      else this.sound.playAt('sprint', robot.position, 12);
    } else {
      if (robot === this.player) this.sound.play('shield');
      else this.sound.playAt('shield', robot.position, 12);
    }
  }

  initPools() {
    this.particles = new ParticlePool(this.scene);
    this.beams = new BeamPool(this.scene);
    this.lights = new LightPool(this.scene);
    this.rings = new RingPool(this.scene, this.camera);
    this.missiles = new MissilePool(this.scene, this);
    this.rockets = new RocketPool(this.scene, this);
    this.bolts = new BoltPool(this.scene, this);         // V7.0: エネルギーボルト
    this.artillery = new ArtilleryPool(this.scene, this); // V7.1: 長距離爆撃 + 着弾予報
    this.tempestFx = new TempestFX(this.scene);           // V7.1: 持続稲妻ビーム描画
    this.initCrates();
  }

  // ---------------- ポイントクレート(V6.7) ----------------
  /** 発光する小箱をリスク地点に配置(橋上/運河内/大通り) */
  initCrates() {
    const geo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffc850, emissive: 0xff9a00, emissiveIntensity: 1.6, // ブルームで光る
      metalness: 0.5, roughness: 0.3,
    });
    this.crates = CONFIG.CRATE_SPOTS.slice(0, CONFIG.CRATE_COUNT).map(([x, z]) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      const baseY = getSupportHeight(x, z, 5) + 0.9; // 橋上ならデッキ基準で浮遊
      mesh.position.set(x, baseY, z);
      this.scene.add(mesh);
      return { mesh, baseY, taken: false, phase: rng() * Math.PI * 2 };
    });
  }

  /** 回転 + 浮遊 + プレイヤー接触で取得(AI は取らない = リスク・リワード) */
  updateCrates(dt) {
    const p = this.player;
    for (const c of this.crates) {
      if (c.taken) continue;
      c.mesh.rotation.y += dt * 1.6;
      c.mesh.position.y = c.baseY + Math.sin(this.elapsed * 2 + c.phase) * 0.18;
      if (!p.alive || this.gameOver) continue;
      const dx = p.position.x - c.mesh.position.x;
      const dz = p.position.z - c.mesh.position.z;
      if (dx * dx + dz * dz < CONFIG.CRATE_PICK_RADIUS * CONFIG.CRATE_PICK_RADIUS
        && Math.abs(p.position.y - c.baseY) < 3) {
        c.taken = true;
        c.mesh.visible = false;
        const value = CONFIG.CRATE_MIN + Math.floor(rng() * (CONFIG.CRATE_MAX - CONFIG.CRATE_MIN + 1));
        this.stats.ptCrates += value;
        this.dmgTexts.show(c.mesh.position, `+${value}pt`, false);
        this.particles.spawn(c.mesh.position, 8, { color: 0xffc850, speed: 4, life: 0.5, gravity: -3, scale: 1.2, boost: 2 });
        this.sound.play('crate');
      }
    }
  }

  resetCrates() {
    for (const c of this.crates) {
      c.taken = false;
      c.mesh.visible = true;
    }
  }

  /** 距離減衰付きカメラシェイク(爆発の近接感) */
  shakeFrom(pos, maxAmp, range) {
    const d = this.camera.position.distanceTo(pos);
    const amp = maxAmp * clamp(1 - d / range, 0, 1);
    if (amp > this.shakeAmp) this.shakeAmp = amp;
  }

  initHUD() {
    const $ = (id) => document.getElementById(id);
    this.ui = {
      crosshair: $('crosshair'),
      lockon: $('lockon'),
      lockonDist: $('lockon-dist'),
      lockonName: $('lockon-name'),         // V6.7 ターゲットボックス: 機体名
      lockonHpFill: $('lockon-hp-fill'),    // V6.7 ターゲットボックス: HP バー
      lockonWpns: $('lockon-wpns'),         // V7.1 ロック対象の装備アイコン(動的 2〜4)
      lockonHpNum: $('lockon-hpnum'),       // V7.0 ロック対象の HP 数値
      playerHpFill: $('player-hp-fill'),
      heatFill: $('heat-fill'),
      heatLabel: $('heat-label'),
      statusPanel: $('status-panel'),
      overlay: $('overlay'),
      overlayTitle: $('overlay-title'),
      overlaySub: $('overlay-sub'),
      restartBtn: $('restart-btn'),
      resultBreakdown: $('result-breakdown'), // V6.7 リザルトのポイント内訳
      // 武器パネル(V7.1: スロット数ぶん動的生成 → applyLoadoutHUD が segs を構築)
      weaponCluster: $('weapon-cluster'),
      fireMain: $('fire-main'),
      segs: [], // [{ seg, label, cd }]
      jumpBtn: $('jump-btn'),
      jumpCd: $('jump-cd'),
      // アビリティ(V6.6)
      abilityBtn: $('ability-btn'),
      abilityCd: $('ability-cd'),
      abilityIcon: $('ability-icon'),
      // V6.4 HUD
      radarDist: $('radar-dist'),
      muteBtn: $('mute-btn'),
      hitArc: $('hit-arc'),
      vignette: $('low-hp-vignette'),
      killLog: $('kill-log'),
      timer: $('timer'),
      lockFlash: $('lock-flash'),
      overlayStats: $('overlay-stats'),
    };
    this.dmgTexts = new DamageTextPool($('damage-layer'));

    // ---- ミニレーダー(2D canvas) ----
    const radarEl = $('radar');
    this.radarCtx = radarEl ? radarEl.getContext('2d') : null;

    // ---- サウンド: 初回操作で AudioContext を初期化(iOS 対策) ----
    window.addEventListener('pointerdown', () => this.sound.init(), { once: true });

    // ---- ミュートトグル(localStorage 保存) ----
    const refreshMuteIcon = () => {
      this.ui.muteBtn.textContent = this.sound.muted ? '🔇' : '🔊';
      this.ui.muteBtn.classList.toggle('muted', this.sound.muted);
    };
    refreshMuteIcon();
    this.ui.muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.sound.init();
      this.sound.setMuted(!this.sound.muted);
      this.bgm.setMuted(this.sound.muted);
      refreshMuteIcon();
      this.sound.play('ui');
    });

    this.buildMarkers();
    this.applyLoadoutHUD();

    this.ui.restartBtn.addEventListener('click', () => {
      this.sound.play('ui');
      this.restart();
    });
  }

  /** 敵マーカー + 残数カウンター + 画面外矢印を(再)構築。redeploy で再呼び出し可 */
  buildMarkers() {
    const markerLayer = document.getElementById('marker-layer');
    const counter = document.getElementById('enemy-counter');
    const edgeLayer = document.getElementById('edge-arrow-layer');
    markerLayer.innerHTML = '';
    if (edgeLayer) edgeLayer.innerHTML = '';
    if (this.counterIcons) for (const s of this.counterIcons) s.remove();

    // V7.0: 画面外の敵への方向矢印(機数分。三角文字を回転 + 極小 HP バー)
    this.edgeArrows = this.enemies.map(() => {
      const root = document.createElement('div');
      root.className = 'edge-arrow';
      root.innerHTML = '<div class="ea-tri">▲</div><div class="ea-hp"><div class="ea-hp-fill"></div></div>';
      if (edgeLayer) edgeLayer.appendChild(root);
      return { root, tri: root.querySelector('.ea-tri'), fill: root.querySelector('.ea-hp-fill') };
    });

    this.markers = this.enemies.map((e) => {
      const root = document.createElement('div');
      root.className = 'enemy-marker';
      root.innerHTML = `
        <div class="em-name">${e.name}</div>
        <div class="em-hp"><div class="em-hp-fill"></div></div>
        <div class="em-tri">▼</div>`;
      markerLayer.appendChild(root);
      // alpha: LOS 可視性 / spotT: spotted 記憶タイマー(V6.7)
      return { root, fill: root.querySelector('.em-hp-fill'), alpha: 0, spotT: 99, los: false };
    });
    this.counterIcons = this.enemies.map(() => {
      const span = document.createElement('span');
      span.className = 'ec-icon';
      span.textContent = '▼';
      counter.insertBefore(span, this.ui.timer);
      return span;
    });
  }

  /**
   * 出撃ロードアウトを HUD に反映(V7.1: セグメントをスロット数ぶん動的生成)。
   * redeploy のたびに呼ばれ、DOM を作り直して InputManager へ再結線する。
   * 空きスロットはグレー表示(発射不可は canFireSlot 側で担保)
   */
  applyLoadoutHUD() {
    const cluster = this.ui.weaponCluster;
    // 旧セグメントを除去(fire-main / target-btn は残す)
    for (const old of cluster.querySelectorAll('.wpn-seg')) old.remove();
    this.ui.segs = [];
    const keyHints = ['SPC', 'Z', 'X', 'C'];
    this.player.slots.forEach((key, i) => {
      const w = CONFIG.WEAPONS[key];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `ctl-btn wpn-seg seg-pos-${i}`;
      btn.innerHTML = `<span class="seg-label">${w ? w.label : '—'}</span>`
        + `<span class="seg-key">${keyHints[i] || ''}</span>`
        + `<div class="cd-overlay"></div>`;
      cluster.insertBefore(btn, this.ui.fireMain); // FIRE ボタンより手前(z 順は CSS)
      btn.classList.toggle('empty', !w);
      this.ui.segs.push({
        seg: btn,
        label: btn.querySelector('.seg-label'),
        cd: btn.querySelector('.cd-overlay'),
      });
      if (this.input) this.input.bindSeg(btn, i); // タッチ/マウスの押しっぱなし結線
    });
    this.ui.abilityIcon.textContent = this.player.ability === 'sprint' ? '⚡' : '🛡';
  }

  // ---------------- HUD 演出ヘルパー ----------------
  /** 被弾方向インジケータ(攻撃元のワールド座標から方向を記憶) */
  showHitFrom(sourcePos) {
    this.hitArcAngle = Math.atan2(
      sourcePos.x - this.player.position.x,
      sourcePos.z - this.player.position.z,
    );
    this.hitArcT = CONFIG.HIT_ARC_TIME;
  }

  /** キルログ(左上にフェード表示) */
  addKillLog(text) {
    const log = this.ui.killLog;
    if (!log) return;
    const div = document.createElement('div');
    div.className = 'kill-entry';
    div.textContent = text;
    log.prepend(div);
    setTimeout(() => div.classList.add('out'), CONFIG.KILLLOG_TIME * 1000);
    setTimeout(() => div.remove(), CONFIG.KILLLOG_TIME * 1000 + 700);
  }

  /**
   * ダメージ適用の一元処理(統計 / ヘイト / 被弾方向 / 低HP警告 / SFX / KO 判定)
   * V6.6 FFA: AI 同士の与ダメ・キルもここを通る。
   * @param {THREE.Vector3|null} sourcePos 攻撃元(被弾方向インジケータ用)
   * @param {Robot|null} attacker 攻撃者(ヘイト/キルログ用。ドラム缶等は null)
   */
  dealDamage(target, dmg, sourcePos, attacker = null) {
    if (!target.alive) return false;
    const died = target.takeDamage(dmg);
    // FFA ヘイト: 撃たれた相手を記憶(AI のターゲット選択が反応する)
    if (attacker && attacker !== target) {
      target.lastAttacker = attacker;
      target.lastAttackT = this.elapsed;
    }
    if (target === this.player) {
      this.stats.damageTaken += dmg;
      if (sourcePos) this.showHitFrom(sourcePos);
      this.sound.play('hit', 0.9);
      if (!this.lowHpWarned && target.hp <= target.maxHp * CONFIG.LOW_HP_RATIO) {
        this.lowHpWarned = true;
        this.sound.play('lowhp');
      }
    } else if (attacker === this.player) {
      this.sound.play('hitConfirm', 0.6); // 自分の与ダメ確認のチック
      this.stats.ptDamage += dmg;         // 与ダメージポイント(V6.7 経済)
    }
    if (died) this.onKO(target, attacker);
    return died;
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.composer) this.composer.setSize(window.innerWidth, window.innerHeight);
    if (DOCK.camera) { // ドックカメラも追従(V6.8)
      DOCK.camera.aspect = window.innerWidth / window.innerHeight;
      DOCK.camera.updateProjectionMatrix();
    }
  }

  // ---------------- ハンガー(ドック)モード(V6.8) ----------------
  enterHangar() {
    this.inHangar = true;
    this.bgm.setMode('title');
  }

  exitHangar() {
    this.inHangar = false;
    this.bgm.setMode('battle');
  }

  /** ドックシーンをブルーム込みで描画(RenderPass の scene/camera を差し替え) */
  renderDock() {
    if (this.composer && this.renderPass) {
      this.renderPass.scene = DOCK.scene;
      this.renderPass.camera = DOCK.camera;
      this.composer.render();
    } else {
      this.renderer.render(DOCK.scene, DOCK.camera);
    }
  }

  // ---------------- 視線(遮蔽)判定 ----------------
  /** 2機の胸位置間で視線が通っているか(ビル + 地形(運河の縁など)の遮蔽チェック) */
  hasLOS(a, b) {
    a.chest(_v4);
    b.chest(_v5);
    _v3.subVectors(_v5, _v4);
    const d = _v3.length();
    if (d < 1e-3) return true;
    _v3.divideScalar(d);
    this.raycaster.set(_v4, _v3);
    this.raycaster.far = d - 0.5;
    if (this.raycaster.intersectObjects(this.solidMeshes, false).length > 0) return false;
    // 地形による遮蔽(運河内の機体は縁の向こうから見えない)
    return this.raymarchGround(_v4, _v3, d - 0.5) === Infinity;
  }

  /** 障害物との最初の交差距離(なければ Infinity)。命中メッシュは _lastWallHit に保持 */
  raycastWallDist(origin, dir, maxDist) {
    this.raycaster.set(origin, dir);
    this.raycaster.far = maxDist;
    const hits = this.raycaster.intersectObjects(this.solidMeshes, false);
    this._lastWallHit = hits.length > 0 ? hits[0].object : null;
    return hits.length > 0 ? hits[0].distance : Infinity;
  }

  /**
   * 地形(getGroundHeight の高さ場)との交差距離。
   * 粗いステップ + 1 回の線形補間で近似(射撃時のみの点評価なので軽量)
   */
  raymarchGround(origin, dir, maxDist) {
    let prevT = 0;
    let prevDy = origin.y - getGroundHeight(origin.x, origin.z);
    if (prevDy <= 0) return 0;
    const step = 3;
    for (let t = step; t <= maxDist; t += step) {
      const x = origin.x + dir.x * t;
      const y = origin.y + dir.y * t;
      const z = origin.z + dir.z * t;
      const dy = y - getGroundHeight(x, z);
      if (dy <= 0) {
        return prevT + (t - prevT) * prevDy / (prevDy - dy); // 線形補間で交点を近似
      }
      prevT = t;
      prevDy = dy;
    }
    return Infinity;
  }

  // ---------------- 射撃 ----------------
  /**
   * V7.0: エネルギーボルト発射(PULSE / SPREAD)。銃口から照準点へ実体弾を撃つ。
   *  - 命中判定は BoltPool.update が飛行中に行う(回避が成立する)
   *  - pellets > 1 は拡散コーンで複数ボルトを散弾発射
   *  @param {THREE.Vector3} aimPoint 照準点(ロック対象の胸 or カメラ正面)
   */
  shootBolt(shooter, aimPoint, slotIdx) {
    const w = CONFIG.WEAPONS[shooter.slots[slotIdx]];
    if (!w) return;
    shooter.registerSlotShot(slotIdx);
    shooter.model.getMuzzleWorld(slotIdx, _muzzle);
    shooter.model.flash();
    const color = shooter.isPlayer ? w.color : w.colorE;
    _v2.subVectors(aimPoint, _muzzle);
    const aimDist = _v2.length();
    if (aimDist < 1e-3) return;
    _v2.divideScalar(aimDist);
    const bx = _v2.x, by = _v2.y, bz = _v2.z;
    const pellets = w.pellets || 1;
    const cone = w.boltSpread || 0;
    for (let p = 0; p < pellets; p++) {
      _v2.set(bx, by, bz);
      if (pellets > 1) {
        _v2.x += (rng() - 0.5) * 2 * cone;
        _v2.y += (rng() - 0.5) * cone;
        _v2.z += (rng() - 0.5) * 2 * cone;
        _v2.normalize();
      }
      this.bolts.fire(shooter, _muzzle, _v2, w, color);
    }
    // マズルフラッシュ
    this.particles.spawn(_muzzle, pellets > 1 ? 3 : 4, { color, speed: 2.5, life: 0.12, gravity: 0, scale: 1.6, upBias: 0, boost: 2.2 });
    this.lights.spawn(_muzzle, color, 10);
  }

  /**
   * チャージ開始(V7.0 RAILGUN 0.5s / V7.1 TEMPEST 1.8s)。
   *  - チャージ中は銃口に収束光 + チャージ音(敵が使う時は察知できる)
   *  - 既にチャージ/CD 中、オーバーヒート中、照射中は開始しない
   */
  startCharge(shooter, slotIdx) {
    const w = CONFIG.WEAPONS[shooter.slots[slotIdx]];
    if (!w || shooter.chargeSlot >= 0 || shooter.beamT > 0) return false;
    if (!shooter.canFireSlot(slotIdx)) return false;
    shooter.chargeSlot = slotIdx;
    shooter.chargeT[slotIdx] = w.chargeTime || 0.5;
    if (shooter.isPlayer) this.sound.play('railcharge');
    else this.sound.playAt('railcharge', shooter.position, 22); // 敵の予兆は聞こえる
    return true;
  }

  /**
   * チャージ完了の解決。
   *   RAILGUN → aimPoint へヒットスキャン射出(shootBeam 再利用)
   *   TEMPEST → 持続稲妻ビーム開始(targetRobot があれば追尾照射 / null = 照準方向)
   */
  resolveCharge(shooter, aimPoint, targetRobot = null) {
    const slotIdx = shooter.chargeSlot;
    shooter.chargeSlot = -1;
    if (slotIdx < 0) return;
    shooter.chargeT[slotIdx] = 0;
    if (!shooter.alive) return;
    const w = CONFIG.WEAPONS[shooter.slots[slotIdx]];
    if (!w) return;
    if (w.kind === 'tempest') { // V7.1: 3 秒間の持続照射を開始
      shooter.beamT = w.burnTime || 3;
      shooter.beamSlot = slotIdx;
      shooter.beamTarget = targetRobot; // AI はターゲット追尾 / プレイヤーは null(照準)
      shooter.beamTick = 0;
      shooter.slotCd[slotIdx] = w.interval || 6;
      if (shooter.isPlayer) this.sound.play('tempest');
      else this.sound.playAt('tempest', shooter.position, 24);
      return;
    }
    this.shootBeam(shooter, aimPoint, slotIdx);
    if (shooter.isPlayer) {
      this.sound.play('rail');
      this.recoil = Math.min(0.15, this.recoil + w.recoil);
    } else {
      this.sound.playAt('rail', shooter.position, 18);
    }
  }

  /**
   * V7.1: TEMPEST 持続ビームの更新(ダメージ tick + 稲妻描画 + 熱の消費)。
   * 毎フレーム呼ぶ。終了時は全熱量消費(HEAT_MAX → オーバーヒート)。
   */
  updateTempests(dt) {
    for (const r of this.allRobots) {
      if (r.beamT <= 0) continue;
      const w = CONFIG.WEAPONS[r.slots[r.beamSlot]];
      if (!r.alive || !w) { r.beamT = 0; r.beamSlot = -1; r.beamTarget = null; continue; }
      r.beamT -= dt;
      const burn = w.burnTime || 3;
      // 熱を照射時間で線形に消費(終了時にちょうど満タン → オーバーヒート)
      r.heat = Math.min(CONFIG.HEAT_MAX, r.heat + (CONFIG.HEAT_MAX / burn) * dt);
      if (r.beamT <= 0) {
        r.beamT = 0;
        r.beamSlot = -1;
        r.beamTarget = null;
        r.heat = CONFIG.HEAT_MAX;
        r.overheated = true; // 全熱量消費 = 撃ち切り後は息切れ(ハイリスク)
        if (r === this.player) this.sound.play('overheat', 0.7);
        continue;
      }

      // ---- 照準点: AI = ターゲット胸 / プレイヤー = ロック or カメラ正面 ----
      const range = w.range || 45;
      if (r.beamTarget && r.beamTarget.alive) {
        r.beamTarget.chest(_v5);
      } else if (r.isPlayer) {
        this._playerAimPoint(0.1, range); // → _v5
      } else {
        // ターゲット喪失: 照準方向へ垂れ流し
        r.chest(_v5);
        _v5.x += Math.sin(r.torsoYaw) * range;
        _v5.z += Math.cos(r.torsoYaw) * range;
      }

      // ---- ビームの到達点(遮蔽 / 射程 / 機体)を決定 ----
      r.model.getMuzzleWorld(r.beamSlot, _muzzle);
      _v2.subVectors(_v5, _muzzle);
      const aimDist = _v2.length();
      if (aimDist < 1e-3) continue;
      _v2.divideScalar(aimDist);
      const wallDist = Math.min(
        this.raycastWallDist(_muzzle, _v2, range),
        this.raymarchGround(_muzzle, _v2, range),
      );
      let hitDist = Infinity, hitTarget = null;
      for (const c of this.robots) {
        if (c === r || !c.alive) continue;
        c.chest(_v3);
        const d = raySphereDist(_muzzle, _v2, _v3, 1.9 * c.cls.scale, _v4);
        if (d >= 0 && d < hitDist) { hitDist = d; hitTarget = c; }
      }
      let endDist = Math.min(range, wallDist);
      let victim = null;
      if (hitTarget && hitDist < wallDist && hitDist <= range) {
        endDist = hitDist;
        victim = hitTarget;
      }
      _v1.copy(_muzzle).addScaledVector(_v2, endDist);
      // 端点をスカラ退避(dealDamage → onKO/repairOnKill が _v1/_v2 を使うため)
      const ex = _v1.x, ey = _v1.y, ez = _v1.z;
      const mx = _muzzle.x, my = _muzzle.y, mz = _muzzle.z;

      // ---- ダメージ tick(0.25s ごと・シールド考慮) ----
      r.beamTick -= dt;
      if (r.beamTick <= 0) {
        r.beamTick = w.tickInterval || 0.25;
        if (victim) {
          if (this.shieldBlocks(victim, _muzzle)) {
            this.shieldRipple(victim, _muzzle);
          } else {
            const dmg = w.dmgTick || 8;
            this.dmgTexts.show(_v1, String(dmg), victim === this.player);
            this.dealDamage(victim, dmg, r.position, r);
          }
        }
        // 命中点スパーク + バチバチ音(tick 同期)
        _v1.set(ex, ey, ez);
        this.particles.spawn(_v1, 4, { color: w.color, speed: 6, life: 0.25, gravity: -6, scale: 1, boost: 2 });
        this.sound.playAt('zap', _v1, 10, 0.7);
      }

      // ---- 稲妻描画(毎フレーム頂点を揺らす)+ 銃口グロー ----
      const beamColor = r.isPlayer ? w.color : w.colorE;
      _muzzle.set(mx, my, mz);
      _v1.set(ex, ey, ez);
      this.tempestFx.draw(_muzzle, _v1, beamColor);
      if (rng() < 0.5) this.lights.spawn(_v1, beamColor, 18);
    }
    this.tempestFx.endFrame();
  }

  /**
   * V7.1 ARC BLASTER: 命中対象の chainRange 以内にいる「別の敵」1 機へ連鎖。
   * 稲妻ポリライン(TempestFX を 1 フレーム借用)+ ダメージ + バチッ音。
   */
  arcChain(fromRobot, chainDmg, shooter, chainRange) {
    if (chainDmg <= 0) return;
    let best = null, bestD = Infinity;
    for (const c of this.robots) {
      if (c === fromRobot || c === shooter || !c.alive) continue;
      const d = c.position.distanceTo(fromRobot.position);
      if (d <= chainRange && d < bestD) { bestD = d; best = c; }
    }
    if (!best) return;
    // 稲妻演出(2 機の胸を結ぶ。hold=8 フレームで残光)
    fromRobot.chest(_v4);
    best.chest(_v5);
    this.tempestFx.draw(_v4, _v5, 0x9fc8ff, 8);
    this.particles.spawn(_v5, 6, { color: 0x9fc8ff, speed: 5, life: 0.3, gravity: -4, boost: 2 });
    this.lights.spawn(_v5, 0x9fc8ff, 24);
    this.sound.playAt('zap', _v5, 14);
    this.dmgTexts.show(_v5, String(chainDmg), best === this.player);
    this.dealDamage(best, chainDmg, fromRobot.position, shooter);
  }

  /**
   * V7.1 SWARM POD: マイクロロケット 6 連(緩追尾・ロック不要)。
   * target が null の場合は照準コーン内の最寄り敵を自動取得(いなければ無誘導)。
   */
  fireSwarm(shooter, target, slotIdx, w) {
    this.missiles.fireSalvo(shooter, target, slotIdx, {
      count: w.count || 6,
      dmgMin: w.dmgMin, dmgMax: w.dmgMax,
      turn: 1.6,        // 弱ホーミング(MISSILE の半分 → 横移動で振り切れる)
      speed: 30,
      armTime: 0.2,
      flat: true,       // 前方初速主体(肩から真っ直ぐ展開)
      sfx: 'swarm',
    });
  }

  /**
   * ヒットスキャン発射の共通処理(V6.7: WEAPONS テーブル駆動・スロット単位)。
   *  V7.0 では MG(即着弾チップ武器)と RAILGUN チャージ後の射出に使用。
   *  - マズルはスロットに装着した武器モデルの銃口先端
   *  - spread はペレット数ぶんレイを散らして個別判定(細い光条 ×8)
   *  - rail は太く明るいビーム + 大きめ着弾(遮蔽では止まる=貫通は演出のみ)
   */
  shootBeam(shooter, aimPoint, slotIdx) {
    const w = CONFIG.WEAPONS[shooter.slots[slotIdx]];
    if (!w) return;
    const isMG = shooter.slots[slotIdx] === 'mg';
    const isRail = shooter.slots[slotIdx] === 'rail';
    const pellets = w.pellets || 1;
    const range = w.range || CONFIG.WEAPON_RANGE;
    const beamColor = shooter.isPlayer ? w.color : w.colorE;
    shooter.registerSlotShot(slotIdx);
    shooter.model.getMuzzleWorld(slotIdx, _muzzle);
    _v2.subVectors(aimPoint, _muzzle);
    const aimDist = _v2.length();
    if (aimDist < 1e-3) return;
    _v2.divideScalar(aimDist);
    const bx = _v2.x, by = _v2.y, bz = _v2.z; // 基準方向(ペレットで再利用)

    for (let p = 0; p < pellets; p++) {
      _v2.set(bx, by, bz);
      if (pellets > 1) { // ショットガンの拡散コーン
        _v2.x += (rng() - 0.5) * 0.16;
        _v2.y += (rng() - 0.5) * 0.1;
        _v2.z += (rng() - 0.5) * 0.16;
        _v2.normalize();
      }

      // 遮蔽 = ビル等(レイキャスト) と 地形(高さ場マーチ) の近い方
      const meshDist = this.raycastWallDist(_muzzle, _v2, range);
      const wallMesh = this._lastWallHit; // 破壊可能遮蔽の判定用に確保
      const groundDist = this.raymarchGround(_muzzle, _v2, range);
      const wallDist = Math.min(meshDist, groundDist);

      // 最初に交差する対象を探す(発射者以外の全生存機)
      let hitDist = Infinity, hitTarget = null;
      for (const t of this.robots) {
        if (t === shooter || !t.alive) continue;
        t.chest(_v3);
        const d = raySphereDist(_muzzle, _v2, _v3, 1.7 * t.cls.scale, _v4);
        if (d >= 0 && d < hitDist) { hitDist = d; hitTarget = t; }
      }

      const dmg = w.dmgMin + Math.floor(rng() * (w.dmgMax - w.dmgMin + 1));

      let endDist;
      if (hitTarget && hitDist < wallDist && hitDist <= range
        && this.shieldBlocks(hitTarget, _muzzle)) {
        // ---- シールドに遮断(前方からの直撃) ----
        endDist = Math.max(0.5, hitDist - 1.2);
        _v3.copy(_muzzle).addScaledVector(_v2, endDist);
        this.shieldRipple(hitTarget, _muzzle);
      } else if (hitTarget && hitDist < wallDist && hitDist <= range) {
        // ---- 命中: 火花 + 衝撃波リング + 着弾光(レールは大きめ) ----
        endDist = hitDist;
        _v3.copy(_muzzle).addScaledVector(_v2, endDist);
        this.dmgTexts.show(_v3, String(dmg), hitTarget === this.player);
        this.particles.spawn(_v3, (isMG || pellets > 1) ? 3 : (isRail ? 18 : 14),
          { color: 0xffcc66, speed: 9, life: 0.45, gravity: -12, scale: isMG ? 0.9 : 1.3, boost: 1.6 });
        if (!isMG && pellets === 1) {
          this.rings.spawn(_v3, { mode: 'billboard', scale: isRail ? 4 : 2.6, life: 0.3, color: 0xffd9a0, boost: 1.8 });
          this.lights.spawn(_v3, 0xffaa44, isRail ? 50 : 34);
        }
        this.dealDamage(hitTarget, dmg, shooter.position, shooter);
      } else if (wallDist <= range) {
        // ---- ビル/地形/破壊可能遮蔽に着弾 ----
        endDist = wallDist;
        _v3.copy(_muzzle).addScaledVector(_v2, endDist - 0.1);
        const isGround = groundDist <= meshDist;
        this.particles.spawn(_v3, (isMG || pellets > 1) ? 2 : 6, {
          color: isGround ? 0xaa9977 : 0xccddee, // 地面は土埃 / 壁は火花
          speed: 5, life: 0.3, gravity: isGround ? -4 : -8, boost: isGround ? 1 : 1.4,
        });
        if (!isMG && pellets === 1) {
          this.rings.spawn(_v3, { mode: 'billboard', scale: 1.7, life: 0.25, color: 0xbcd4ee, boost: 1.5 });
          this.lights.spawn(_v3, 0x88bbff, 14);
        }
        // 破壊可能遮蔽(コンテナ/バリケード/ドラム缶)に武器ダメージ
        if (!isGround && wallMesh && wallMesh.userData.destructible) {
          this.damageDestructible(wallMesh.userData.destructible, dmg);
        }
      } else {
        // ---- 空振り ----
        endDist = range;
        _v3.copy(_muzzle).addScaledVector(_v2, endDist);
      }

      // ---- ビーム描画(武器ごとのスタイル) ----
      if (isRail) {
        // 太く明るい貫通風ビーム
        this.beams.fire(_muzzle, _v3, 0xffffff, 0.9, 3);
        this.beams.fire(_muzzle, _v3, beamColor, 2.4, 1.6);
      } else if (pellets > 1) {
        this.beams.fire(_muzzle, _v3, beamColor, 0.3, 1.7); // 細いペレット光条
      } else {
        this.beams.fire(_muzzle, _v3, 0xffffff, isMG ? 0.28 : 0.5, 2.2);
        this.beams.fire(_muzzle, _v3, beamColor, isMG ? 0.7 : 1.5, 1.25);
      }
    }

    // ---- マズルフラッシュ(ペレットでも 1 回) ----
    this.particles.spawn(_muzzle, isMG ? 2 : 4, { color: beamColor, speed: 2.5, life: 0.12, gravity: 0, scale: isMG ? 1 : 1.7, upBias: 0, boost: 2.2 });
    if (!isMG) this.lights.spawn(_muzzle, beamColor, isRail ? 16 : 10);
  }

  /** プレイヤーの照準点を計算(ロック中=対象の胸 / 非ロック=カメラ正面)→ _v5 */
  _playerAimPoint(spread, range) {
    if (this.locked && this.lockTarget && this.lockTarget.alive) {
      this.lockTarget.chest(_v5);
      _v5.x += (rng() - 0.5) * spread;
      _v5.y += (rng() - 0.5) * spread;
      _v5.z += (rng() - 0.5) * spread;
    } else {
      this.camera.getWorldDirection(_v4);
      _v5.copy(this.camera.position).addScaledVector(_v4, range * 0.9);
      _v5.x += (rng() - 0.5) * spread * 2;
      _v5.y += (rng() - 0.5) * spread * 2;
      _v5.z += (rng() - 0.5) * spread * 2;
    }
    return _v5;
  }

  /** プレイヤーの射撃ディスパッチ(スロット単位・武器種別で分岐) */
  tryPlayerFireSlot(i) {
    const p = this.player;
    const w = CONFIG.WEAPONS[p.slots[i]];
    if (!w || !p.alive) return;
    if (w.kind === 'bolt') { // V7.0: エネルギーボルト(実体弾)
      if (!p.canFireSlot(i)) return;
      const range = w.range || CONFIG.WEAPON_RANGE;
      this.shootBolt(p, this._playerAimPoint(w.spreadAim, range), i);
      this.sound.play(w.sfx);
      this.recoil = Math.min(0.15, this.recoil + w.recoil);
    } else if (w.kind === 'railcharge' || w.kind === 'tempest') {
      // V7.0/V7.1: チャージ式テレグラフ(完了は updatePlayer のチャージ解決が処理)
      this.startCharge(p, i);
    } else if (w.kind === 'hitscan') {
      if (!p.canFireSlot(i)) return;
      const range = w.range || CONFIG.WEAPON_RANGE;
      this.shootBeam(p, this._playerAimPoint(w.spreadAim, range), i);
      this.sound.play(w.sfx);
      this.recoil = Math.min(0.15, this.recoil + w.recoil);
    } else if (w.kind === 'missile') {
      if (p.slotCd[i] > 0) return;
      if (!this.locked || !this.lockTarget || !this.lockTarget.alive) return; // 要ロック
      p.slotCd[i] = w.cd;
      this.missiles.fireSalvo(p, this.lockTarget, i);
    } else if (w.kind === 'swarm') {
      // V7.1: マイクロロケット(ロック不要)。ロック中はその対象 /
      // 非ロック時は照準コーン内の最寄り敵へ緩追尾(いなければ無誘導の直進)
      if (p.slotCd[i] > 0) return;
      p.slotCd[i] = w.cd;
      let tgt = (this.locked && this.lockTarget && this.lockTarget.alive) ? this.lockTarget : null;
      if (!tgt) tgt = this._swarmAutoTarget(w.range || 55);
      this.fireSwarm(p, tgt, i, w);
    } else if (w.kind === 'artillery') {
      // V7.1: 長距離爆撃(ロック不要)。照準方向の地表 40-110 を着弾中心に
      if (p.slotCd[i] > 0) return;
      p.slotCd[i] = w.cd;
      this._artilleryAimPoint(w); // → _v5
      this.artillery.fireVolley(p, _v5, w);
      this.recoil = Math.min(0.1, this.recoil + 0.04);
    } else { // rocket(バズーカ: ロック不要・直射)
      if (p.slotCd[i] > 0) return;
      p.slotCd[i] = w.cd;
      p.model.getMuzzleWorld(i, _muzzle);
      this.camera.getWorldDirection(_v4);
      _v5.copy(this.camera.position).addScaledVector(_v4, 70);
      _v2.subVectors(_v5, _muzzle).normalize();
      this.rockets.fire(_muzzle, _v2, p);
      this.sound.play('bazooka');
      this.recoil = Math.min(0.08, this.recoil + 0.05);
    }
  }

  /** V7.1 SWARM: 非ロック時の自動取得(照準コーン ~25° 内の最寄り敵・LOS あり) */
  _swarmAutoTarget(range) {
    _v2.set(Math.sin(this.camYaw), 0, Math.cos(this.camYaw));
    const fovCos = Math.cos(25 * Math.PI / 180);
    let best = null, bestD = Infinity;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      _v1.subVectors(e.position, this.player.position);
      _v1.y = 0;
      const d = _v1.length();
      if (d > range || d < 1e-3) continue;
      _v1.divideScalar(d);
      if (_v1.dot(_v2) < fovCos) continue;
      if (!this.hasLOS(this.player, e)) continue;
      if (d < bestD) { bestD = d; best = e; }
    }
    return best;
  }

  /**
   * V7.1 ARTILLERY: プレイヤーの着弾中心を計算 → _v5。
   * カメラ視線と地形の交点(無ければ最大距離)を取り、
   * プレイヤーからの水平距離を rangeMin..rangeMax にクランプ。
   */
  _artilleryAimPoint(w) {
    this.camera.getWorldDirection(_v4);
    const gd = this.raymarchGround(this.camera.position, _v4, 140);
    if (gd !== Infinity) {
      _v5.copy(this.camera.position).addScaledVector(_v4, gd);
    } else {
      _v5.copy(this.camera.position).addScaledVector(_v4, w.rangeMax);
    }
    // プレイヤーからの水平距離をレンジにクランプ
    const px = this.player.position.x, pz = this.player.position.z;
    let dx = _v5.x - px, dz = _v5.z - pz;
    const d = Math.hypot(dx, dz) || 1;
    const cd2 = clamp(d, w.rangeMin, w.rangeMax);
    dx = dx / d * cd2; dz = dz / d * cd2;
    _v5.set(
      clamp(px + dx, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT),
      0,
      clamp(pz + dz, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT),
    );
    _v5.y = getGroundHeight(_v5.x, _v5.z);
    return _v5;
  }

  /** AI のヒットスキャン射撃(MG。FFA: 任意のターゲットへ。命中率で散らす) */
  aiShot(bot, target, slotIdx) {
    const w = CONFIG.WEAPONS[bot.slots[slotIdx]];
    target.chest(_v5);
    const rapid = (w.interval || 1) < 0.2; // 連射系は 1 発あたりの命中率低
    const hitRoll = rng() < CONFIG.ENEMY_ACCURACY * (rapid ? 0.7 : 1);
    const spread = hitRoll ? (rapid ? 0.5 : 0.35) : (rapid ? 4.0 : 3.2);
    _v5.x += (rng() - 0.5) * spread;
    _v5.y += (rng() - 0.5) * spread * 0.6;
    _v5.z += (rng() - 0.5) * spread;
    this.shootBeam(bot, _v5, slotIdx);
    this.sound.playAt(w.sfx, bot.position, rapid ? 11 : 14);
  }

  /**
   * V7.0: AI のボルト射撃(PULSE / SPREAD)。目標の速度ベクトルでリード射撃。
   *   リード = 着弾予想時間 × 目標速度 × 係数(0.7〜1.1 のランダム=完璧でない)。
   *   さらに距離に比例した角度ばらつきを加えるため、横移動する相手は中遠距離で外れる。
   */
  aiBolt(bot, target, slotIdx) {
    const w = CONFIG.WEAPONS[bot.slots[slotIdx]];
    bot.model.getMuzzleWorld(slotIdx, _muzzle);
    target.chest(_v5);
    const dist = _muzzle.distanceTo(_v5);
    const boltSpeed = w.boltSpeed || 45;
    // 着弾予想時間ぶん、目標の現在速度方向へリード(係数で過小/過大にぶれる)
    const tof = dist / boltSpeed;
    const lead = CONFIG.AI_LEAD_MIN + rng() * (CONFIG.AI_LEAD_MAX - CONFIG.AI_LEAD_MIN);
    _v5.x += target.velX * tof * lead;
    _v5.z += target.velZ * tof * lead;
    // 距離に応じた角度ばらつき(近距離はほぼ当たる / 遠距離は散る)
    const jitter = CONFIG.AI_LEAD_MISS_SPREAD * (dist / 60) * (1 - CONFIG.ENEMY_ACCURACY * 0.6);
    _v5.x += (rng() - 0.5) * jitter;
    _v5.y += (rng() - 0.5) * jitter * 0.5;
    _v5.z += (rng() - 0.5) * jitter;
    this.shootBolt(bot, _v5, slotIdx);
    this.sound.playAt(w.sfx, bot.position, 12);
  }

  /** AI のバズーカ(ターゲットへ直射 + 落下分の上向き補正) */
  aiBazooka(bot, target, slotIdx) {
    bot.model.getMuzzleWorld(slotIdx, _muzzle);
    target.chest(_v5);
    const dist = _muzzle.distanceTo(_v5);
    _v5.y += dist * 0.04;             // 弾道落下のリード
    _v5.x += (rng() - 0.5) * 2.2;     // 散らし(直撃しすぎない)
    _v5.z += (rng() - 0.5) * 2.2;
    _v2.subVectors(_v5, _muzzle).normalize();
    this.rockets.fire(_muzzle, _v2, bot);
    this.sound.playAt('bazooka', bot.position, 18);
  }

  /** ジャンプ時のブースト噴射 */
  spawnBoost(robot) {
    _v1.copy(robot.position);
    _v1.y += 0.3;
    this.particles.spawn(_v1, 8, { color: 0x66aaff, speed: 4, life: 0.4, gravity: 4, scale: 1.2, upBias: -0.8 });
    if (robot === this.player) this.sound.play('jump', 0.8);
    else this.sound.playAt('jump', robot.position, 10);
  }

  // ---------------- KO / リスタート ----------------
  /** @param {Robot|null} attacker 撃破者(キルログ「撃破者 ▶ 被撃破者」用) */
  onKO(robot, attacker = null) {
    robot.alive = false;
    robot.deathT = 0;
    robot.chest(_v1);
    const pos = _v1.clone(); // 多段爆発用に固定(KO 時のみの割り当て)

    // ---- KO 爆発: 3 段バースト + 大フラッシュ + 黒煙 ----
    // 第1段: 火球 + 地面衝撃波(スローモーション中なので段差が映える)
    this.particles.spawn(pos, 26, { color: 0xffa040, speed: 13, life: 0.9, gravity: -6, scale: 2.4, boost: 1.7 });
    this.particles.spawn(pos, 12, { color: 0xff4422, speed: 8, life: 1.1, gravity: -4, scale: 3, boost: 1.4 });
    this.rings.spawn(pos, { mode: 'ground', scale: 9, life: 0.5, color: 0xffbb66, boost: 1.8, y: getGroundHeight(pos.x, pos.z) + 0.35 });
    this.lights.spawn(pos, 0xff6622, 60);
    this.shakeFrom(pos, 0.5, 40);
    // 第2段(+0.18s ゲーム時間): 二次火球
    this.fxQueue.push({
      t: this.elapsed + 0.18,
      fn: () => {
        this.particles.spawn(pos, 12, { color: 0xffc060, speed: 9, life: 0.6, gravity: -4, scale: 2, boost: 2.2 });
        this.lights.spawn(pos, 0xffaa44, 45);
      },
    });
    // 第3段(+0.38s): 大フラッシュ + 衝撃波 + 黒煙(normal blend で暗い煙)
    this.fxQueue.push({
      t: this.elapsed + 0.38,
      fn: () => {
        this.particles.spawn(pos, 6, { color: 0xffffff, speed: 5, life: 0.3, gravity: 0, scale: 3.2, boost: 3 });
        this.rings.spawn(pos, { mode: 'billboard', scale: 11, life: 0.45, color: 0xfff0d0, boost: 2 });
        this.particles.spawn(pos, 10, { color: 0x222222, speed: 3.5, life: 1.5, gravity: 3.5, scale: 2.6, upBias: 1, blending: 'normal' });
        this.lights.spawn(pos, 0xffeecc, 90);
      },
    });
    this.sound.playAt('explosion', robot.position, 22);

    // ---- V7.0: 撃破時 HP 回復(残量 2 倍ルール) ----
    //   撃破した機体が生存していれば HP=min(maxHp, HP×2)。瀕死撃破ほど大回復(逆転)
    let repaired = 0;
    if (CONFIG.REPAIR_ON_KILL && attacker && attacker !== robot && attacker.alive) {
      repaired = this.repairOnKill(attacker);
    }

    // キルログ: 「撃破者 ▶ 被撃破者 (+n repair)」(ドラム缶などは ▶ なし)
    const repairTag = repaired > 0 ? ` (+${repaired} repair)` : '';
    this.addKillLog(attacker ? `${attacker.name} ▶ ${robot.name}${repairTag}` : `${robot.name} DESTROYED`);
    if (attacker === this.player) this.stats.kills++;

    if (robot === this.player) {
      // 自機撃破 → その時点で DEFEAT(残存 AI 数は戦績に表示)
      this.startResult('lose');
      return;
    }
    // AI 撃破: ロック解除 + 残数確認
    if (this.lockTarget === robot) {
      this.lockTarget = null;
      this.locked = false;
      this.lockLost = 0;
    }
    const remaining = this.enemies.reduce((n, e) => n + (e.alive ? 1 : 0), 0);
    if (remaining === 0) this.startResult('win'); // プレイヤーが最後の 1 機 → VICTORY
  }

  /**
   * V7.0: 撃破時 HP 回復(残量 2 倍ルール)。
   *   HP=min(maxHp, HP×2)。緑グロー + 上昇する緑パーティクル +「+n REPAIRED」+ 回復 SFX。
   *   @returns {number} 実際に回復した量(0 なら満タンで回復なし)
   */
  repairOnKill(bot) {
    const before = bot.hp;
    const healed = Math.min(bot.maxHp, bot.hp * 2);
    const amount = Math.round(healed - before);
    if (amount <= 0) return 0;
    bot.hp = healed;
    bot.model.flash(0x33ff88, 0.4); // 緑グロー(被弾白より長め)
    // 上昇する緑パーティクル(機体周りから立ち上る)
    bot.chest(_v1);
    this.particles.spawn(_v1, 16, { color: 0x44ff99, speed: 3.5, life: 0.8, gravity: 7, scale: 1.2, upBias: 1.4, boost: 1.8 });
    this.rings.spawn(_v1, { mode: 'billboard', scale: 3.2, life: 0.4, color: 0x66ffaa, boost: 1.6 });
    this.lights.spawn(_v1, 0x33ff88, 30);
    // 「+n REPAIRED」ポップ(頭上)
    _v2.copy(bot.position); _v2.y += bot.chestY + 1.4;
    this.dmgTexts.show(_v2, `+${amount} REPAIRED`, false);
    // 回復 SFX(プレイヤーは直接 / AI は距離減衰)
    if (bot === this.player) this.sound.play('repair');
    else this.sound.playAt('repair', bot.position, 16);
    return amount;
  }

  /** スローモーション → 勝敗表示へ */
  startResult(result) {
    this.gameOver = true;
    this.timeScale = CONFIG.SLOWMO_SCALE;
    this.slowmoTimer = CONFIG.SLOWMO_TIME;
    this.pendingResult = result;
  }

  showResult() {
    // RESTART ボタンを押せるようにポインターロックを解除
    if (document.pointerLockElement) document.exitPointerLock();
    const win = this.pendingResult === 'win';
    this.ui.overlayTitle.textContent = win ? 'VICTORY' : 'DEFEAT';
    this.ui.overlaySub.textContent = win ? 'ALL ENEMIES DESTROYED' : 'UNIT DESTROYED';
    // 戦績(撃破数 / 被ダメージ / 経過時間 / 敗北時は残存 AI 数)
    const m = Math.floor(this.matchTime / 60);
    const s = String(Math.floor(this.matchTime % 60)).padStart(2, '0');
    const survivors = this.enemies.reduce((n, e) => n + (e.alive ? 1 : 0), 0);
    this.ui.overlayStats.textContent =
      `KILLS ${this.stats.kills}/${CONFIG.ENEMY_COUNT} ・ DAMAGE TAKEN ${this.stats.damageTaken} ・ TIME ${m}:${s}`
      + (win ? '' : ` ・ SURVIVORS ${survivors}`);

    // ---- ポイント精算(V6.7 経済): 内訳 + カウントアップ演出 + wallet 保存 ----
    const ptKill = this.stats.kills * CONFIG.PT_KILL;
    const ptDmg = Math.round(this.stats.ptDamage * CONFIG.PT_PER_DMG);
    const ptSurv = Math.floor(this.matchTime / CONFIG.PT_SURVIVE_SEC);
    const ptWin = win ? CONFIG.PT_WIN : 0;
    const ptCrates = this.stats.ptCrates;
    const earned = ptKill + ptDmg + ptSurv + ptWin + ptCrates;
    const walletBefore = SAVE.wallet;
    SAVE.wallet += earned;
    saveSave(SAVE);
    this.ui.resultBreakdown.innerHTML = `
      <div class="rb-row"><span>KILLS ×${this.stats.kills}</span><b>+${ptKill.toLocaleString()}</b></div>
      <div class="rb-row"><span>DAMAGE</span><b>+${ptDmg.toLocaleString()}</b></div>
      <div class="rb-row"><span>SURVIVAL</span><b>+${ptSurv.toLocaleString()}</b></div>
      <div class="rb-row"><span>CRATES</span><b>+${ptCrates.toLocaleString()}</b></div>
      ${win ? `<div class="rb-row rb-win"><span>VICTORY BONUS</span><b>+${ptWin.toLocaleString()}</b></div>` : ''}
      <div class="rb-row rb-total"><span>TOTAL EARNED</span><b id="rb-earned">+0</b></div>
      <div class="rb-row rb-wallet"><span>WALLET</span><b id="rb-wallet">${walletBefore.toLocaleString()}</b></div>`;
    // カウントアップ(0.9 秒)
    const earnedEl = document.getElementById('rb-earned');
    const walletEl = document.getElementById('rb-wallet');
    const t0 = performance.now();
    const tickUp = () => {
      const k = Math.min(1, (performance.now() - t0) / 900);
      const e = Math.round(earned * (1 - (1 - k) * (1 - k))); // ease-out
      earnedEl.textContent = `+${e.toLocaleString()}`;
      walletEl.textContent = (walletBefore + e).toLocaleString();
      if (k < 1) requestAnimationFrame(tickUp);
    };
    requestAnimationFrame(tickUp);

    this.ui.overlay.classList.toggle('defeat', !win);
    this.ui.overlay.classList.remove('hidden');
    this.sound.play(win ? 'win' : 'lose');
    this.bgm.setMode(win ? 'victory' : 'defeat');
  }

  /**
   * 別ロードアウト/機体で再出撃(ハンガーから。V6.7)。
   * 旧機体をシーンから撤去して新セットアップで作り直す(glb は boot 側でバッファ保持)
   */
  redeploy(setup) {
    for (const r of this.robots) {
      this.scene.remove(r.group);
      if (r.shieldMesh) this.scene.remove(r.shieldMesh);
    }
    this.setup = setup;
    this.initRobots();
    this.buildMarkers();
    this.applyLoadoutHUD();
    this.restart();
  }

  /**
   * V7.0: ランダム出現の割当を計算(deploy/redeploy/REMATCH 共通)。
   *   候補 SPAWN_POINTS から 4 地点を選ぶ。制約:
   *     - 相互距離 ≥ SPAWN_MIN_DIST(60)
   *     - 互いの初期 LOS が通らない組合せを優先(ビル円との 2D 交差で近似)
   *   SPAWN_TRIES 回試行し、LOS が通るペア数が最小の組合せを採用。
   *   @returns {Array<[x,z]>} robots[] の順(0=プレイヤー, 1..=AI)に対応する 4 地点
   */
  assignSpawns() {
    const pts = CONFIG.SPAWN_POINTS;
    const n = this.robots.length; // 通常 4
    const minD2 = CONFIG.SPAWN_MIN_DIST * CONFIG.SPAWN_MIN_DIST;
    let best = null, bestLosPairs = Infinity;

    const losClear2D = (a, b) => {
      // a→b の線分がいずれかのビル円を横切れば LOS は通らない(2D 近似)
      const dx = b[0] - a[0], dz = b[1] - a[1];
      const len2 = dx * dx + dz * dz;
      if (len2 < 1e-6) return true;
      for (const bld of this.buildings) {
        const t = ((bld.cx - a[0]) * dx + (bld.cz - a[1]) * dz) / len2;
        const tc = clamp(t, 0, 1);
        const cx = a[0] + dx * tc, cz = a[1] + dz * tc;
        const d2 = (bld.cx - cx) * (bld.cx - cx) + (bld.cz - cz) * (bld.cz - cz);
        if (d2 < bld.radius * bld.radius) return false; // 遮蔽あり
      }
      return true;
    };

    for (let attempt = 0; attempt < CONFIG.SPAWN_TRIES; attempt++) {
      // Fisher-Yates で候補をシャッフルし、距離制約を満たす n 点を貪欲に採る
      const idx = pts.map((_, i) => i);
      for (let i = idx.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [idx[i], idx[j]] = [idx[j], idx[i]];
      }
      const chosen = [];
      for (const i of idx) {
        const p = pts[i];
        let ok = true;
        for (const q of chosen) {
          const d2 = (p[0] - q[0]) * (p[0] - q[0]) + (p[1] - q[1]) * (p[1] - q[1]);
          if (d2 < minD2) { ok = false; break; }
        }
        if (ok) chosen.push(p);
        if (chosen.length === n) break;
      }
      if (chosen.length < n) continue; // 距離制約を満たせなかった

      // 初期 LOS が通るペア数(少ないほど良い=開幕の即見合いを避ける)
      let losPairs = 0;
      for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
          if (losClear2D(chosen[a], chosen[b])) losPairs++;
        }
      }
      if (losPairs < bestLosPairs) { bestLosPairs = losPairs; best = chosen; }
      if (losPairs === 0) break; // 完全に見合わない理想配置
    }

    // フォールバック(候補不足など): 旧固定配置
    if (!best) best = [CONFIG.PLAYER_SPAWN, ...CONFIG.ENEMY_SPAWNS];
    return best;
  }

  restart() {
    // V7.0: ランダム出現(SPAWN_RANDOM)。無効なら旧固定配置
    let spawnsList;
    if (CONFIG.SPAWN_RANDOM) {
      spawnsList = this.assignSpawns();
    } else {
      spawnsList = [CONFIG.PLAYER_SPAWN, ...CONFIG.ENEMY_SPAWNS];
    }
    const [px, pz] = spawnsList[0];
    // プレイヤーは最も近い他機の方を向いて出現(開幕に索敵しやすく)
    let nearest = null, nd = Infinity;
    for (let i = 1; i < spawnsList.length; i++) {
      const [ex, ez] = spawnsList[i];
      const d = (ex - px) * (ex - px) + (ez - pz) * (ez - pz);
      if (d < nd) { nd = d; nearest = spawnsList[i]; }
    }
    const pYaw = nearest ? Math.atan2(nearest[0] - px, nearest[1] - pz) : Math.PI;
    this.player.reset(px, pz, pYaw);
    this.camYaw = pYaw;
    this.camYawTarget = pYaw;
    this.enemies.forEach((e, i) => {
      const [x, z] = spawnsList[i + 1] || CONFIG.ENEMY_SPAWNS[i % CONFIG.ENEMY_SPAWNS.length];
      e.reset(x, z, Math.atan2(px - x, pz - z)); // プレイヤー方向を向いて出現
      this.ais[i].reset();
    });
    this.particles.clear();
    this.beams.clear();
    this.rings.clear();
    this.missiles.clear();
    this.rockets.clear();
    this.bolts.clear();
    this.artillery.clear(); // V7.1: 砲弾 + 着弾予報
    this.tempestFx.clear(); // V7.1: 稲妻ビーム
    this.dmgTexts.clear();
    this.fxQueue.length = 0;        // 未消化の多段爆発を破棄
    this.restoreDestructibles();    // ドラム缶/遮蔽を復元
    this.lockTarget = null;
    this.locked = false;
    this.lockLost = 0;
    this.gameOver = false;
    this.timeScale = 1;
    this.slowmoTimer = 0;
    this.pendingResult = null;
    // camYaw/camYawTarget は assignSpawns 由来の初期向き(上で設定済み)を維持
    this.camPitch = 0.12;
    this.recoil = 0;
    this.shakeAmp = 0;
    // V6.4: 戦績 / HUD 演出のリセット
    this.matchTime = 0;
    this.stats.kills = 0;
    this.stats.damageTaken = 0;
    this.stats.ptDamage = 0;
    this.stats.ptCrates = 0;
    this.resetCrates();
    this.hitArcT = 0;
    this.lockFlashT = 0;
    this._prevLockTarget = null;
    this.lowHpWarned = false;
    if (this.ui.killLog) this.ui.killLog.innerHTML = '';
    this.bgm.setMode('battle');
    for (const m of this.markers) m.alpha = 0; // マーカー残像をリセット
    this.ui.overlay.classList.add('hidden');
    this.updateCamera(0.1, true);
  }

  // ---------------- 更新 ----------------
  updatePlayer(dt) {
    const player = this.player;
    if (!player.alive) { player.speed01 = 0; return; }

    // ---- 移動: カメラ向き基準の全方位ストレイフ + 加速度モデル(重量感) ----
    //   移動しても照準(camYaw)は変わらない。後退はさらに減速
    this.input.getMove(this.moveInput);
    const { x: ix, y: iy } = this.moveInput;
    const mag = Math.hypot(ix, iy);
    if (mag > 0.05) {
      const sy = Math.sin(this.camYaw), cy = Math.cos(this.camYaw);
      // forward=(sy,cy), right=(-cy,sy) ※ y-up 右手系
      let wx = sy * iy + (-cy) * ix;
      let wz = cy * iy + sy * ix;
      const wl = Math.hypot(wx, wz);
      wx /= wl; wz /= wl;
      // 照準と逆方向への移動(後退)は 0.7 倍。速度は機体クラス + スプリント由来
      const backFactor = (wx * sy + wz * cy) < -0.1 ? CONFIG.BACK_SPEED_MUL : 1;
      player.applyMove(wx, wz, player.effectiveSpeed * Math.min(1, mag) * backFactor, dt, this.obstacles);
    } else {
      player.applyMove(0, 0, 0, dt, this.obstacles); // 慣性で滑りながら減速
    }
    // 下半身: 照準から ±LEG_TWIST_CLAMP までしか回さない(横移動=斜め足踏み)。
    // 背面方向への移動は前向きのまま後ずさり(歩行アニメ逆再生)。
    // 停止時は照準方向へゆっくり整列(WR 同様)
    if (player.speed01 > 0.15) {
      const leg = legYawTarget(player.torsoYaw, Math.atan2(player.velX, player.velZ));
      player.yaw = lerpAngle(player.yaw, leg.yaw, Math.min(1, dt * CONFIG.TURN_RATE));
      player.backpedal = leg.back;
    } else {
      player.yaw = lerpAngle(player.yaw, player.torsoYaw, Math.min(1, dt * CONFIG.IDLE_ALIGN_RATE));
      player.backpedal = false;
    }

    // ---- ジャンプ(クールダウン 4s) ----
    if (this.input.consumeJump() && player.jump()) {
      this.spawnBoost(player);
    }
    // 上昇中のブースト噴射(間引き)
    if (!player.grounded && player.velY > 4 && rng() < 0.45) {
      _v1.copy(player.position);
      _v1.y += 0.2;
      this.particles.spawn(_v1, 1, { color: 0x66aaff, speed: 2, life: 0.3, gravity: 3, upBias: -1 });
    }

    // ---- 上半身(照準) = カメラ方向と一体 / ロック中はロック対象へ ----
    if (this.locked && this.lockTarget && this.lockTarget.alive) {
      _v1.subVectors(this.lockTarget.position, player.position);
      const aimYaw = Math.atan2(_v1.x, _v1.z);
      player.torsoYaw = lerpAngle(player.torsoYaw, aimYaw, Math.min(1, dt * CONFIG.TORSO_TURN_RATE * 1.8));
    } else {
      player.torsoYaw = lerpAngle(player.torsoYaw, this.camYaw, Math.min(1, dt * CONFIG.TORSO_TURN_RATE * 1.8));
    }

    // ---- アビリティ(B / 専用ボタン) ----
    if (this.input.consumeAbility() && !this.gameOver && player.useAbility()) {
      this.onAbilityUsed(player);
    }

    // ---- 射撃(V7.1: スロット順に Space / Z / X / C。中央=一斉) ----
    if (!this.gameOver) {
      for (let i = 0; i < player.slots.length; i++) {
        if (this.input.fireSlot(i)) this.tryPlayerFireSlot(i);
      }
      // 手動ターゲット切替(Tab / 専用ボタン)
      if (this.input.consumeTargetCycle()) this.cycleTarget();
    }

    // ---- チャージ完了 → 解決(RAILGUN=射出 / TEMPEST=照射開始) ----
    if (player.chargeSlot >= 0 && player.chargeT[player.chargeSlot] <= 0) {
      const w = CONFIG.WEAPONS[player.slots[player.chargeSlot]];
      const range = w ? (w.range || CONFIG.WEAPON_RANGE) : CONFIG.WEAPON_RANGE;
      // tempest はターゲット null = 照準追従(ロック中は _playerAimPoint が対象を向く)
      this.resolveCharge(player, this._playerAimPoint(w ? w.spreadAim : 0.1, range), null);
    }
  }

  /**
   * ロックオン判定(V6.7: WR 準拠で取得と維持を非対称化)。
   *  - 取得: 射程 LOCK_RANGE + 取得 FOV(55°)+ LOS の敵から画面中央に最も近い 1 機
   *  - 維持: 一度ロックしたら維持 FOV(80°)内なら保持。自動で他へ乗り換えない
   *  - 遮蔽: LOS が切れても LOCK_GRACE(1.5s)はボックスを維持(琥珀色で予告)
   *  - 手動切替は cycleTarget()(Tab / 専用ボタン)
   */
  updateLock(dt) {
    const player = this.player;
    if (!player.alive) { this.locked = false; this.lockTarget = null; return; }

    // カメラ前方(水平)
    _v2.set(Math.sin(this.camYaw), 0, Math.cos(this.camYaw));

    // ---- 維持判定(現ターゲット優先。中央寄りの敵への自動乗り換えはしない) ----
    if (this.locked && this.lockTarget && this.lockTarget.alive) {
      const t = this.lockTarget;
      _v1.subVectors(t.position, player.position);
      _v1.y = 0;
      const dist = _v1.length();
      if (dist > 1e-3 && dist <= CONFIG.LOCK_RANGE) {
        _v1.divideScalar(dist);
        if (_v1.dot(_v2) >= Math.cos(CONFIG.LOCK_FOV_KEEP)) { // 維持 FOV(広め)
          if (this.hasLOS(player, t)) {
            this.lockLost = 0; // 視線回復
            return;
          }
          // 遮蔽中: 猶予タイマー(レティクルは fading=琥珀でボックス維持)
          this.lockLost += dt;
          if (this.lockLost < CONFIG.LOCK_GRACE) return;
        }
      }
      // 範囲外 / 維持 FOV 外 / 猶予切れ → ロック喪失
      this.locked = false;
      this.lockTarget = null;
      this.lockLost = 0;
      this._prevLockTarget = null;
    }

    // ---- 取得判定(取得 FOV は狭め。画面中央に最も近い敵) ----
    const fovCos = Math.cos(CONFIG.LOCK_FOV);
    let best = null, bestScore = -Infinity;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      _v1.subVectors(e.position, player.position);
      _v1.y = 0;
      const dist = _v1.length();
      if (dist > CONFIG.LOCK_RANGE || dist < 1e-3) continue;
      _v1.divideScalar(dist);
      const dot = _v1.dot(_v2);
      if (dot < fovCos) continue;            // 取得視野外
      if (!this.hasLOS(player, e)) continue; // 遮蔽
      if (dot > bestScore) { bestScore = dot; best = e; }
    }
    if (best) this._acquireLock(best);
  }

  /** ロック確定の共通処理(ビープ + TARGET LOCKED フラッシュ) */
  _acquireLock(target) {
    if (target !== this._prevLockTarget) {
      this.sound.play('lock');
      this.lockFlashT = CONFIG.LOCK_FLASH_TIME;
      this._prevLockTarget = target;
    }
    this.lockTarget = target;
    this.locked = true;
    this.lockLost = 0;
  }

  /**
   * 手動ターゲット切替(Tab / 専用ボタン)。
   * ロック可能な敵(射程 + 取得 FOV + LOS)を画面中央に近い順でサイクル。
   */
  cycleTarget() {
    const player = this.player;
    if (!player.alive) return;
    _v2.set(Math.sin(this.camYaw), 0, Math.cos(this.camYaw));
    const fovCos = Math.cos(CONFIG.LOCK_FOV);
    const list = [];
    for (const e of this.enemies) {
      if (!e.alive) continue;
      _v1.subVectors(e.position, player.position);
      _v1.y = 0;
      const dist = _v1.length();
      if (dist > CONFIG.LOCK_RANGE || dist < 1e-3) continue;
      _v1.divideScalar(dist);
      const dot = _v1.dot(_v2);
      if (dot < fovCos) continue;
      if (!this.hasLOS(player, e)) continue;
      list.push({ e, dot });
    }
    if (list.length === 0) return;
    list.sort((a, b) => b.dot - a.dot); // 画面中央に近い順
    const idx = list.findIndex((c) => c.e === this.lockTarget);
    const next = list[(idx + 1) % list.length].e; // 次の候補へサイクル
    this._prevLockTarget = null; // 同一対象でもビープを鳴らす
    this._acquireLock(next);
  }

  updateCamera(dt, snap = false) {
    // ---- 旋回入力 = 機体(照準)ごと回す。自動復帰なし(WR 方式) ----
    //   入力は camYawTarget を動かし、camYaw が慣性付きで追従(重量感)
    this.input.consumeLook(this.lookDelta);
    if (Math.abs(this.lookDelta.x) > 0.01 || Math.abs(this.lookDelta.y) > 0.01) {
      this.camYawTarget -= this.lookDelta.x * CONFIG.CAM_SENS;
      this.camPitch = clamp(this.camPitch + this.lookDelta.y * CONFIG.CAM_SENS, CONFIG.CAM_PITCH_MIN, CONFIG.CAM_PITCH_MAX);
    }
    // キーボード旋回(Shift + ←→)
    const tk = this.input.turnKey;
    if (tk !== 0) this.camYawTarget -= tk * CONFIG.KEY_TURN_RATE * dt;
    // 旋回の慣性
    if (snap) this.camYaw = this.camYawTarget;
    else this.camYaw = lerpAngle(this.camYaw, this.camYawTarget, 1 - Math.exp(-CONFIG.TURN_INERTIA * dt));

    // 注視点(プレイヤー + 肩越しオフセット)
    const sy = Math.sin(this.camYaw), cy = Math.cos(this.camYaw);
    _v1.set(
      this.player.position.x + (-cy) * CONFIG.CAM_SHOULDER,
      this.player.position.y + CONFIG.CAM_LOOK_HEIGHT,
      this.player.position.z + sy * CONFIG.CAM_SHOULDER,
    );

    // 理想カメラ位置(後方 + 上方、ピッチ反映)
    const hd = CONFIG.CAM_DIST * Math.cos(this.camPitch);
    _v2.set(
      _v1.x - sy * hd,
      _v1.y + (CONFIG.CAM_HEIGHT - CONFIG.CAM_LOOK_HEIGHT) + CONFIG.CAM_DIST * Math.sin(this.camPitch),
      _v1.z - cy * hd,
    );

    // カメラの壁めり込み対策(レイキャストで距離を詰める)
    _v3.subVectors(_v2, _v1);
    const camLen = _v3.length();
    _v3.divideScalar(camLen);
    const wallDist = this.raycastWallDist(_v1, _v3, camLen + 0.5);
    if (wallDist < camLen) {
      _v2.copy(_v1).addScaledVector(_v3, Math.max(1.2, wallDist - 0.4));
    }

    // スムーズ追従
    if (snap) this.camPos.copy(_v2);
    else this.camPos.lerp(_v2, 1 - Math.exp(-CONFIG.CAM_LERP * dt));
    // 地形(クレーター縁・運河壁)へのめり込み防止
    this.camPos.y = Math.max(this.camPos.y, getGroundHeight(this.camPos.x, this.camPos.z) + 0.5);
    this.camera.position.copy(this.camPos);

    // 注視(やや前方)
    _v4.set(_v1.x + sy * 4, _v1.y - Math.sin(this.camPitch) * 3, _v1.z + cy * 4);
    this.camera.lookAt(_v4);

    // 射撃リコイル(ピッチに微小加算)
    if (this.recoil > 0.0001) {
      this.camera.rotateX(this.recoil);
      this.recoil *= Math.exp(-11 * dt);
    }
    // 着地シェイク(重量感)
    if (this.shakeAmp > 0.003) {
      this.camera.position.x += (rng() - 0.5) * this.shakeAmp;
      this.camera.position.y += (rng() - 0.5) * this.shakeAmp;
      this.shakeAmp *= Math.exp(-7 * dt);
    }
    // スプリント中は FOV をわずかに広げる(速度感)
    const fovTarget = 62 + (this.player.sprintT > 0 ? CONFIG.SPRINT_FOV_ADD : 0);
    if (Math.abs(this.camera.fov - fovTarget) > 0.05) {
      this.camera.fov += (fovTarget - this.camera.fov) * Math.min(1, dt * 6);
      this.camera.updateProjectionMatrix();
    }
    this.camera.updateMatrixWorld();
  }

  // ---------------- HUD ----------------
  worldToScreen(world, out) {
    _proj.copy(world).project(this.camera);
    out.x = (_proj.x * 0.5 + 0.5) * window.innerWidth;
    out.y = (-_proj.y * 0.5 + 0.5) * window.innerHeight;
    out.visible = _proj.z < 1
      && out.x > -100 && out.x < window.innerWidth + 100
      && out.y > -100 && out.y < window.innerHeight + 100;
    return out;
  }

  /** V7.1: ロック対象の装備武器アイコン 1 つぶんの HTML(THUMBS サムネを縮小) */
  _lockonWpnHTML(key) {
    if (!key || !CONFIG.WEAPONS[key]) return '<span class="lk-wpn empty"></span>';
    if (THUMBS[key]) return `<span class="lk-wpn"><img src="${THUMBS[key]}" alt=""></span>`;
    return `<span class="lk-wpn thumb-fb">${CONFIG.WEAPONS[key].label.slice(0, 2)}</span>`;
  }

  /**
   * V7.0: 画面外の生存敵に小型の方向矢印 + 極小 HP バーを画面端に表示。
   *   画面内 / 死亡 / レンジ外(EDGE_ARROW_RANGE 超)は非表示。矢印は対象方向へ回転。
   *   ロック対象はターゲットボックスがあるので矢印は出さない(重複回避)。
   */
  updateEdgeArrows() {
    if (!this.edgeArrows) return;
    const W = window.innerWidth, H = window.innerHeight;
    const m = CONFIG.EDGE_ARROW_MARGIN;
    const cx = W / 2, cy = H / 2;
    const screen = this._screenTmp || (this._screenTmp = { x: 0, y: 0, visible: false });
    const player = this.player;
    for (let i = 0; i < this.enemies.length; i++) {
      const e = this.enemies[i];
      const a = this.edgeArrows[i];
      if (!a) continue;
      const show = e.alive && player.alive
        && !(this.locked && e === this.lockTarget)
        && player.position.distanceTo(e.position) <= CONFIG.EDGE_ARROW_RANGE;
      if (!show) { a.root.style.display = 'none'; continue; }
      e.chest(_v1);
      this.worldToScreen(_v1, screen);
      // 画面内(かつカメラ前方)なら頭上マーカーに任せる → 矢印は出さない
      const onScreen = _proj.z < 1 && screen.x >= 0 && screen.x <= W && screen.y >= 0 && screen.y <= H;
      if (onScreen) { a.root.style.display = 'none'; continue; }
      // 画面中心から対象スクリーン方向へのベクトル(背後は反転)
      let dx = screen.x - cx, dy = screen.y - cy;
      if (_proj.z >= 1) { dx = -dx; dy = -dy; } // カメラ後方は反対側の端へ
      const ang = Math.atan2(dy, dx);
      // 画面端の長方形枠にクランプした表示位置を求める
      const hw = cx - m, hh = cy - m;
      const cosA = Math.cos(ang), sinA = Math.sin(ang);
      let ex, ey;
      if (Math.abs(cosA) * hh >= Math.abs(sinA) * hw) {
        ex = cx + Math.sign(cosA) * hw;
        ey = cy + Math.sign(cosA) * hw * (sinA / cosA);
      } else {
        ey = cy + Math.sign(sinA) * hh;
        ex = cx + Math.sign(sinA) * hh * (cosA / sinA);
      }
      a.root.style.display = 'flex';
      a.root.style.left = `${ex.toFixed(1)}px`;
      a.root.style.top = `${ey.toFixed(1)}px`;
      // ▲ を対象方向へ回転(▲ は上=−90° が基準)
      a.tri.style.transform = `rotate(${(ang * 180 / Math.PI + 90).toFixed(1)}deg)`;
      a.fill.style.width = `${(e.hp / e.maxHp) * 100}%`;
    }
  }

  updateHUD(dt) {
    const ui = this.ui;
    const player = this.player;
    const screen = this._screenTmp || (this._screenTmp = { x: 0, y: 0, visible: false });

    // ---- プレイヤー HP / ヒート ----
    ui.playerHpFill.style.width = `${(player.hp / player.maxHp) * 100}%`;
    ui.heatFill.style.width = `${player.heat}%`;
    ui.statusPanel.classList.toggle('overheat', player.overheated);
    ui.heatLabel.textContent = player.overheated ? 'OVRHT' : 'HEAT';

    // ---- 武器パネル(V7.1: スロット数可変。熱 / CD / チャージの扇形表示) ----
    const heatFrac = player.heat / CONFIG.HEAT_MAX;
    for (let i = 0; i < ui.segs.length; i++) {
      const { seg, cd: cdEl } = ui.segs[i];
      const w = CONFIG.WEAPONS[player.slots[i]];
      if (!w) { cdEl.style.setProperty('--cd', '0'); continue; } // 空きスロット(グレー表示は applyLoadoutHUD)
      const cdMax = w.interval || w.cd || 1;
      // 熱武器は共有熱ゲージ(長い間隔の rail 等は CD も重ねて表示)
      let frac = w.heat
        ? Math.max(heatFrac, cdMax > 0.5 ? player.slotCd[i] / cdMax : 0)
        : player.slotCd[i] / cdMax;
      // チャージ中はチャージ進捗(RAILGUN/TEMPEST)/ TEMPEST 照射中は残り照射時間
      const charging = player.chargeSlot === i && player.chargeT[i] > 0;
      if (charging) frac = Math.max(frac, player.chargeT[i] / (w.chargeTime || 0.5));
      const beaming = player.beamSlot === i && player.beamT > 0;
      if (beaming) frac = Math.max(frac, 1 - player.beamT / (w.burnTime || 3));
      cdEl.style.setProperty('--cd', Math.min(1, frac).toFixed(3));
      seg.classList.toggle('overheat', !!w.heat && player.overheated);
      seg.classList.toggle('charging', charging || beaming);
      seg.classList.toggle('nolock', !!w.needLock && !this.locked);
      seg.classList.toggle('ready',
        w.heat ? !player.overheated : (player.slotCd[i] <= 0 && (!w.needLock || this.locked)));
    }
    ui.jumpCd.style.setProperty('--cd', (player.jumpCd / CONFIG.JUMP_COOLDOWN).toFixed(3));

    // ---- アビリティ(CD 扇形 + 発動中ハイライト) ----
    const abCdMax = player.ability === 'sprint' ? CONFIG.SPRINT_CD : CONFIG.SHIELD_CD;
    ui.abilityCd.style.setProperty('--cd', (player.abilityCd / abCdMax).toFixed(3));
    ui.abilityBtn.classList.toggle('ready', player.abilityCd <= 0);
    ui.abilityBtn.classList.toggle('on', player.sprintT > 0 || player.shieldT > 0);

    // ---- オーバーヒート警告音(遷移時に 1 回) ----
    if (player.overheated && !this._prevOverheated) this.sound.play('overheat');
    this._prevOverheated = player.overheated;

    // ---- 経過タイマー(戦闘中のみ加算した matchTime を表示) ----
    if (ui.timer) {
      const tm = Math.floor(this.matchTime / 60);
      const ts = String(Math.floor(this.matchTime % 60)).padStart(2, '0');
      ui.timer.textContent = `${tm}:${ts}`;
    }

    // ---- 低 HP の赤ビネット点滅 ----
    ui.vignette.classList.toggle('show', player.alive && player.hp <= player.maxHp * CONFIG.LOW_HP_RATIO);

    // ---- 被弾方向インジケータ(赤い弧を被弾方向へ回転表示) ----
    if (this.hitArcT > 0) {
      this.hitArcT -= dt;
      const rel = normalizeAngle(this.hitArcAngle - this.camYaw);
      const deg = (-rel * 180 / Math.PI).toFixed(1);
      ui.hitArc.style.opacity = Math.min(1, this.hitArcT / (CONFIG.HIT_ARC_TIME * 0.6)).toFixed(2);
      ui.hitArc.style.transform = `translate(-50%,-50%) rotate(${deg}deg)`;
    } else {
      ui.hitArc.style.opacity = '0';
    }

    // ---- TARGET LOCKED フラッシュ ----
    if (this.lockFlashT > 0) {
      this.lockFlashT -= dt;
      ui.lockFlash.style.display = 'block';
      ui.lockFlash.style.opacity = Math.min(1, this.lockFlashT * 3).toFixed(2);
    } else {
      ui.lockFlash.style.display = 'none';
    }

    // ---- ターゲットボックス(V6.7: 機体名 + HP + 距離を統合。切替時はスライド) ----
    if (this.locked && this.lockTarget && this.lockTarget.alive) {
      this.lockTarget.chest(_v1);
      this.worldToScreen(_v1, screen);
      if (screen.visible) {
        const wasActive = ui.lockon.classList.contains('active');
        ui.lockon.classList.add('active');
        ui.lockon.classList.toggle('fading', this.lockLost > 0); // 遮蔽猶予中は琥珀
        // ボックスを新対象へ滑らかにスライド(初回はスナップ)
        if (!wasActive) { this._lockonX = screen.x; this._lockonY = screen.y; }
        const lk = Math.min(1, dt * 14);
        this._lockonX += (screen.x - this._lockonX) * lk;
        this._lockonY += (screen.y - this._lockonY) * lk;
        ui.lockon.style.left = `${this._lockonX.toFixed(1)}px`;
        ui.lockon.style.top = `${this._lockonY.toFixed(1)}px`;
        ui.lockonName.textContent = this.lockTarget.name;
        ui.lockonHpFill.style.width = `${(this.lockTarget.hp / this.lockTarget.maxHp) * 100}%`;
        const dist = player.position.distanceTo(this.lockTarget.position);
        ui.lockonDist.textContent = `${Math.round(dist)} m`;
        // V7.1: ロック対象の装備武器アイコン(スロット数ぶん)+ HP 数値(対象切替時のみ DOM 更新)
        if (this._lockonLoadoutFor !== this.lockTarget) {
          this._lockonLoadoutFor = this.lockTarget;
          ui.lockonWpns.innerHTML = this.lockTarget.slots
            .map((key) => this._lockonWpnHTML(key)).join('');
        }
        ui.lockonHpNum.textContent = `${Math.max(0, Math.round(this.lockTarget.hp))}`;
      } else {
        ui.lockon.classList.remove('active');
      }
      ui.crosshair.classList.add('hidden');
    } else {
      ui.lockon.classList.remove('active');
      ui.crosshair.classList.toggle('hidden', !player.alive);
      this._lockonLoadoutFor = null; // 次ロックで武器アイコンを再描画
    }

    // ---- 敵マーカー(▼ + 名前 + HP)+ 残数カウンター ----
    //   マーカーは「LOS が通っている時だけ」表示(遮蔽に隠れた敵は見えない)。
    //   LOS が切れても SPOTTED_TIME 秒は半透明で記憶表示(V6.7 spotted)。
    //   残数カウンター(上部 ▼)は常時表示で全体状況は把握できる。
    for (let i = 0; i < this.enemies.length; i++) {
      const e = this.enemies[i];
      const m = this.markers[i];
      this.counterIcons[i].classList.toggle('dead', !e.alive);
      if (!e.alive) { m.alpha = 0; m.los = false; m.root.style.display = 'none'; continue; }
      const los = player.alive && this.hasLOS(player, e);
      m.los = los; // レーダーのブリップ明暗にも使う
      // spotted システム(V6.7): 一度視認したら LOS 喪失後も SPOTTED_TIME 秒は
      // 半透明で表示し続け、その後 1 秒でフェードアウト
      if (los) {
        m.alpha = 1;
        m.spotT = 0;
      } else {
        m.spotT = (m.spotT || 0) + dt;
        m.alpha = m.spotT < CONFIG.SPOTTED_TIME
          ? 0.45
          : Math.max(0, 0.45 * (1 - (m.spotT - CONFIG.SPOTTED_TIME)));
      }
      // ロック中の対象はターゲットボックス側に集約(頭上マーカーは非表示)
      if (this.locked && e === this.lockTarget) { m.root.style.display = 'none'; continue; }
      if (m.alpha <= 0) { m.root.style.display = 'none'; continue; }
      _v1.copy(e.position);
      _v1.y += 5.0;
      this.worldToScreen(_v1, screen);
      if (screen.visible) {
        m.root.style.display = 'block';
        m.root.style.opacity = m.alpha.toFixed(2);
        m.root.style.left = `${screen.x.toFixed(1)}px`;
        m.root.style.top = `${screen.y.toFixed(1)}px`;
        m.root.classList.toggle('target', e === this.lockTarget);
        m.fill.style.width = `${(e.hp / e.maxHp) * 100}%`;
      } else {
        m.root.style.display = 'none';
      }
    }

    // ---- V7.0: 画面外の敵への方向矢印(小型・控えめ・HP 残量重視) ----
    this.updateEdgeArrows();

    // ---- ダメージ数値 ----
    this.dmgTexts.update(dt, this.camera, window.innerWidth, window.innerHeight);

    // ---- ミニレーダー(マーカーの LOS 計算結果を再利用) ----
    this.updateRadar();
  }

  /**
   * 円形ミニレーダー(WR風):
   *   プレイヤー中心・カメラ yaw 追従回転(上 = 自分の向き)。
   *   敵ブリップは常時表示(LOS あり=明るい赤● / 遮蔽中=暗い赤○ / ロック=琥珀+リング)。
   *   地形ヒントとして運河・橋・外周をうっすら描画。
   */
  updateRadar() {
    const ctx = this.radarCtx;
    if (!ctx) return;
    const S = CONFIG.RADAR_SIZE, c = S / 2, R = c - 6;
    const k = (R - 2) / CONFIG.RADAR_RANGE;
    const p = this.player.position;

    ctx.clearRect(0, 0, S, S);

    // 背景円
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(8,16,24,0.72)';
    ctx.fill();

    // ---- 地形ヒント(ワールド座標系をレーダーに変換して描画) ----
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.translate(c, c);
    ctx.rotate(this.camYaw + Math.PI); // 上 = カメラ(機体)の向き
    ctx.scale(k, k);
    ctx.translate(-p.x, -p.z);
    const ca = TERRAIN.canal;
    ctx.fillStyle = 'rgba(90,120,150,0.4)'; // 運河の帯
    ctx.fillRect(-CONFIG.MOVE_LIMIT, ca.z - ca.halfW, CONFIG.MOVE_LIMIT * 2, ca.halfW * 2);
    ctx.fillStyle = 'rgba(180,195,210,0.55)'; // 橋
    for (const b of TERRAIN.bridges) {
      ctx.fillRect(b.x - b.halfW, b.zMin, b.halfW * 2, b.zMax - b.zMin);
    }
    ctx.strokeStyle = 'rgba(110,243,255,0.3)'; // 外周
    ctx.lineWidth = 2.5 / k;
    ctx.strokeRect(-CONFIG.MOVE_LIMIT, -CONFIG.MOVE_LIMIT, CONFIG.MOVE_LIMIT * 2, CONFIG.MOVE_LIMIT * 2);
    ctx.restore();

    // レンジリング(目盛り)
    ctx.strokeStyle = 'rgba(110,243,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(c, c, R * 0.5, 0, Math.PI * 2);
    ctx.stroke();

    // ---- 敵ブリップ(スクリーン空間で回転 + 範囲外は縁にクランプ) ----
    const sy = Math.sin(this.camYaw), cy = Math.cos(this.camYaw);

    // ポイントクレート(未取得のみ・金色の小点)
    ctx.fillStyle = '#ffd24a';
    for (const cr of this.crates) {
      if (cr.taken) continue;
      const dxc = cr.mesh.position.x - p.x, dzc = cr.mesh.position.z - p.z;
      const pxc = (dxc * (-cy) + dzc * sy) * k;
      const pyc = -(dxc * sy + dzc * cy) * k;
      if (Math.hypot(pxc, pyc) > R - 5) continue; // レンジ外は表示しない
      ctx.beginPath();
      ctx.arc(c + pxc, c + pyc, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    let nearest = Infinity;
    for (let i = 0; i < this.enemies.length; i++) {
      const e = this.enemies[i];
      if (!e.alive) continue;
      const dx = e.position.x - p.x, dz = e.position.z - p.z;
      const dist = Math.hypot(dx, dz);
      if (dist < nearest) nearest = dist;
      const lr = dx * (-cy) + dz * sy; // ローカル右
      const lf = dx * sy + dz * cy;    // ローカル前
      let px = lr * k, py = -lf * k;
      const rr = Math.hypot(px, py);
      let clamped = false;
      if (rr > R - 5) { // レンジ外は縁に小さく
        const sc = (R - 5) / rr;
        px *= sc; py *= sc;
        clamped = true;
      }
      const isLock = e === this.lockTarget;
      const losVis = !!this.markers[i].los;
      const rad = clamped ? 2.2 : 3.4;
      ctx.beginPath();
      ctx.arc(c + px, c + py, rad, 0, Math.PI * 2);
      if (isLock) {
        ctx.fillStyle = '#ffb02e'; // ロック中: 琥珀 + リング
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,176,46,0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(c + px, c + py, rad + 3, 0, Math.PI * 2);
        ctx.stroke();
      } else if (losVis) {
        ctx.fillStyle = '#ff4040'; // 視認中: 明るい赤●
        ctx.fill();
      } else {
        ctx.strokeStyle = 'rgba(190,60,60,0.85)'; // 遮蔽中: 暗い赤○
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // 自機(中央の上向き三角 = 自分の向き)
    ctx.fillStyle = '#6ef3ff';
    ctx.beginPath();
    ctx.moveTo(c, c - 5.5);
    ctx.lineTo(c - 3.8, c + 3.6);
    ctx.lineTo(c + 3.8, c + 3.6);
    ctx.closePath();
    ctx.fill();

    // ---- レーダー下の距離数値(ロック対象 > 最寄り敵) ----
    const tgt = (this.lockTarget && this.lockTarget.alive) ? this.lockTarget : null;
    const dShow = tgt ? this.player.position.distanceTo(tgt.position)
      : (nearest < Infinity ? nearest : null);
    this.ui.radarDist.textContent = dShow !== null ? `▼ ${Math.round(dShow)}m` : '▼ ---';
    this.ui.radarDist.classList.toggle('locked', !!tgt);
  }

  // ---------------- メインループ ----------------
  loop() {
    const rawDt = Math.min(this.clock.getDelta(), CONFIG.DT_CLAMP);

    // ---- ハンガー(ドック)モード: プレビュー回転 + 描画のみ(V6.8) ----
    if (this.inHangar) {
      this.elapsed += rawDt;
      updateDock(rawDt, this.elapsed);
      this.renderDock();
      return;
    }

    // スローモーション(KO 演出): 実時間で計測して復帰
    if (this.slowmoTimer > 0) {
      this.slowmoTimer -= rawDt;
      if (this.slowmoTimer <= 0) {
        this.timeScale = 1;
        this.showResult();
      }
    }
    const dt = rawDt * this.timeScale;
    this.elapsed += dt;

    if (this.started && !this.gameOver) this.matchTime += dt; // 経過タイマー

    if (this.started && !(this.gameOver && this.slowmoTimer <= 0)) {
      this.updatePlayer(dt);
      for (const ai of this.ais) ai.update(dt, this.elapsed);
      this.updateLock(dt);
    }

    // ロボット本体更新(待機アニメは常時)
    for (const r of this.allRobots) r.update(dt, this.elapsed);

    // 着地演出: 土煙 + ズン音 + (プレイヤーのみ)画面シェイク
    for (const r of this.allRobots) {
      if (r.justLanded) {
        r.justLanded = false;
        _v1.copy(r.position);
        _v1.y += 0.2;
        this.particles.spawn(_v1, 10, { color: 0x9a9484, speed: 3.5, life: 0.5, gravity: -3, scale: 1.4, upBias: 0.5 });
        if (r === this.player) {
          this.shakeAmp = CONFIG.LAND_SHAKE;
          this.sound.play('land');
        } else {
          this.sound.playAt('land', r.position, 12);
        }
      }
    }

    // V7.0: RAILGUN チャージ予兆(銃口に収束する発光 + 光源)。敵が使う時も見える
    for (const r of this.allRobots) {
      if (!r.alive || r.chargeSlot < 0) continue;
      r.model.getMuzzleWorld(r.chargeSlot, _v1);
      const w = CONFIG.WEAPONS[r.slots[r.chargeSlot]];
      const col = r.isPlayer ? (w ? w.color : 0xb8e4ff) : (w ? w.colorE : 0xffa0c0);
      // 周囲から銃口へ吸い込まれる粒子(進捗で密度を上げる)
      const prog = 1 - (r.chargeT[r.chargeSlot] / ((w && w.chargeTime) || 0.5));
      // 銃口近傍で明滅する収束光(進捗で密度・サイズを上げる)
      _v2.set(_v1.x + (rng() - 0.5) * (1.4 - prog), _v1.y + (rng() - 0.5) * (1.4 - prog), _v1.z + (rng() - 0.5) * (1.4 - prog));
      this.particles.spawn(_v2, 1, { color: col, speed: 0.6, life: 0.1, gravity: 0, scale: 0.9 + prog, upBias: 0, boost: 2.4 });
      if (rng() < 0.4) this.lights.spawn(_v1, col, 8 + 18 * prog);
    }

    // スプリントのスラスター噴射
    for (const r of this.allRobots) {
      if (r.alive && r.sprintT > 0 && rng() < 0.5) {
        _v1.copy(r.position);
        _v1.x -= Math.sin(r.yaw) * 0.8;
        _v1.z -= Math.cos(r.yaw) * 0.8;
        _v1.y += 0.8;
        this.particles.spawn(_v1, 1, { color: 0x66c8ff, speed: 1.5, life: 0.3, gravity: 0, scale: 1.1, upBias: -0.3, boost: 1.8 });
      }
    }

    // 重い足音(歩行サイクル同期・速度で音量・距離減衰)
    for (const r of this.allRobots) {
      if (!r.alive || !r.grounded) { r.stepAcc = 0; continue; }
      const v = r.speedAbs;
      if (v < 0.4) continue;
      r.stepAcc += v * dt;
      if (r.stepAcc >= CONFIG.STEP_STRIDE) {
        r.stepAcc = 0;
        if (r === this.player) this.sound.play('footstep', 0.45 + 0.55 * r.speed01);
        else this.sound.playAt('footstep', r.position, 9, 0.4 + 0.6 * r.speed01);
      }
    }

    // 撃破されたメカは倒れた後に残骸として消滅
    for (const r of this.allRobots) {
      if (r.deathT > 0.7 && r.group.visible) {
        r.group.visible = false;
        r.chest(_v1);
        this.particles.spawn(_v1, 20, { color: 0xff7733, speed: 10, life: 0.8, gravity: -5, scale: 2 });
      }
    }

    // フェンス警告灯の点滅
    const s = 0.5 + 0.5 * Math.sin(this.elapsed * 4);
    this.lampMat.color.setRGB(0.45 + 0.55 * s, 0.08 + 0.1 * s, 0.08);

    // 多段爆発などの遅延エフェクト(ゲーム時間基準 = スローモーション中はゆっくり)
    for (let i = this.fxQueue.length - 1; i >= 0; i--) {
      if (this.elapsed >= this.fxQueue[i].t) {
        this.fxQueue[i].fn();
        this.fxQueue.splice(i, 1);
      }
    }

    // ポイントクレート(回転・浮遊・取得判定)
    this.updateCrates(dt);

    // エフェクト・カメラ・HUD
    this.particles.update(dt);
    this.beams.update(dt);
    this.lights.update(dt);
    this.rings.update(dt);
    this.missiles.update(dt);
    this.rockets.update(dt);
    this.bolts.update(dt);    // V7.0: エネルギーボルト飛翔体
    this.artillery.update(dt); // V7.1: 爆撃砲弾 + 着弾予報サークル
    this.updateTempests(dt);   // V7.1: 持続稲妻ビーム(tick + 描画)

    // V7.1: ノックバック(REPULSOR)の適用と指数減衰
    for (const r of this.allRobots) {
      const kb2 = r.kbX * r.kbX + r.kbZ * r.kbZ;
      if (kb2 > 0.01) {
        r.moveWithCollision(r.kbX * dt, r.kbZ * dt, this.obstacles);
        const decay = Math.exp(-CONFIG.KNOCKBACK_DECAY * dt);
        r.kbX *= decay;
        r.kbZ *= decay;
      } else if (kb2 > 0) {
        r.kbX = 0;
        r.kbZ = 0;
      }
    }
    this.updateCamera(rawDt); // カメラは実時間で滑らかに
    this.updateHUD(rawDt);

    // ブルーム合成(構築失敗時は素のレンダリング)。
    // ドックから戻った直後のために RenderPass を戦闘シーンへ戻す(V6.8)
    if (this.composer) {
      this.renderPass.scene = this.scene;
      this.renderPass.camera = this.camera;
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

// ============================================================
// 起動(V6.6): モデルレジストリをロード → ハンガーで機体選択 → Game 生成
//   モデルレジストリ: MECH_CLASSES[*].model →
//     assets/models/{model}_walking_glb_url.glb
//   ファイルが無いクラス(例: mech_scout / mech_heavy は並行生成中)は
//   buffers[key] = null → プリミティブ機体で出撃。glb を配置すれば
//   次回ロードから自動でそちらが使われる。
// ============================================================
const MODEL_BASE = './assets/models/';

/** 全クラスの glb バッファを並列取得(無ければ null) */
async function loadModelBuffers() {
  const keys = [...new Set(Object.values(CONFIG.MECH_CLASSES).map((c) => c.model))];
  const buffers = {};
  await Promise.all(keys.map(async (key) => {
    try {
      const r = await fetch(`${MODEL_BASE}${key}_walking_glb_url.glb`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      buffers[key] = await r.arrayBuffer();
      console.info(`[V6.6] モデルロード: ${key}`);
    } catch (_) {
      buffers[key] = null;
      console.info(`[V6.6] ${key} の glb なし → プリミティブ機体で代用(glb を置けば自動使用)`);
    }
  }));
  return buffers;
}

/** バッファを 1 機分 parse(スキンメッシュ独立のため機体ごとに parse) */
function parseModel(loader, buf) {
  if (!buf) return Promise.resolve(null);
  return new Promise((resolve) => {
    loader.parse(buf, MODEL_BASE, resolve, (err) => {
      console.warn('[V6.6] glb parse 失敗 → プリミティブで代用:', err);
      resolve(null);
    });
  });
}

// ============================================================
// ハンガー(V6.8 WR 風ドック): 3D プレビュー + ステータス + スロットカード + ショップ
// glb バッファは初回ロード後に保持し、再出撃では parse のみ(再ダウンロード不要)。
// ============================================================
const HANGAR = {
  buffers: null,        // モデルレジストリのバッファ(保持)
  selectedClass: SAVE.lastClass,
  game: null,           // Game インスタンス(起動時に生成。出撃は常に redeploy)
  activeSlot: -1,       // 武器リストを開いているスロット(-1 = 閉)
  pendingBuy: null,     // 購入確認中の武器キー(カード 2 度押しで確定)
  deploying: false,
};
const $id = (id) => document.getElementById(id);
const fmtPt = (n) => n.toLocaleString();

// ============================================================
// DOCK: 3D ハンガープレビュー(モジュールレベルで 1 回生成して使い回し)
//   Game の renderer/composer で描画される専用 Scene。
// ============================================================
const DOCK = {
  built: false,
  scene: null, camera: null,
  turntable: null, ring: null,
  mech: null, mechClass: null,
  loadSeq: 0,          // 更新の世代トークン(すべての updateDockMech 呼び出しで加算)
  flashPending: false, // 装備変更の白フラッシュ予約(次のマウント時に消費)
};

function buildDockScene() {
  if (DOCK.built) return;
  DOCK.built = true;
  const sc = new THREE.Scene();
  sc.background = new THREE.Color(0x05070b); // 暗めのドック

  // ライティング(影なしの軽量 3 灯: キー + リム + 環境)
  sc.add(new THREE.HemisphereLight(0x8fa8c8, 0x181e26, 0.85));
  const key = new THREE.DirectionalLight(0xcfe4ff, 2.2);
  key.position.set(4, 6, 5);
  sc.add(key);
  const rim = new THREE.DirectionalLight(0x3a7bd5, 1.0);
  rim.position.set(-5, 3, -5);
  sc.add(rim);

  // 床(暗い円盤 + 控えめグリッド)
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(12, 40),
    new THREE.MeshStandardMaterial({ color: 0x0b0f15, roughness: 0.85, metalness: 0.25 }),
  );
  floor.rotation.x = -Math.PI / 2;
  sc.add(floor);
  const grid = new THREE.GridHelper(22, 26, 0x1c2c3c, 0x10181f);
  grid.position.y = 0.01;
  sc.add(grid);

  // 足元の発光リング(加算合成・高輝度 → ブルームで映える)
  DOCK.ring = new THREE.Mesh(
    new THREE.RingGeometry(2.05, 2.45, 48),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x33ccff).multiplyScalar(1.8),
      transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    }),
  );
  DOCK.ring.rotation.x = -Math.PI / 2;
  DOCK.ring.position.y = 0.04;
  sc.add(DOCK.ring);
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(2.05, 40),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x1188cc).multiplyScalar(0.7),
      transparent: true, opacity: 0.16,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.03;
  sc.add(disc);

  // ターンテーブル(機体を載せてゆっくり回す)
  DOCK.turntable = new THREE.Group();
  sc.add(DOCK.turntable);

  // カメラ: 機体全身が収まる固定位置(わずかに見下ろし)
  const cam = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 60);
  cam.position.set(0, 3.1, 7.8);
  cam.lookAt(0, 1.75, 0);
  DOCK.scene = sc;
  DOCK.camera = cam;
}

/**
 * プレビュー機体を選択クラス + 装備に同期(クラス変更時のみ再 parse)。
 *
 * V6.9 バグ修正: 旧実装は世代トークン(loadSeq)を「parse する呼び出し」しか
 * 取得しなかったため、glb parse 中(全クラスの glb が揃い ~9MB の parse に
 * 数百 ms かかる)に同期パスの呼び出し(同クラス再選択や装備変更)が挟まると、
 * 古い parse が「最新」のまま残って後から機体を上書きし、直前に装着した武器が
 * 消える / 選択と違うクラスが表示されることがあった。さらに mountSig による
 * 再マウント省略が「SAVE は変わったが機体は古い」状態と組み合わさると装備変更が
 * 見た目に反映されなかった。
 * → 全呼び出しが世代を取得し、await 後に世代確認。マウントは省略せず常に
 *   現在の SAVE.loadouts から行う(装備状態 → mountWeapons の単方向データフロー)。
 */
async function updateDockMech(classKey) {
  buildDockScene();
  const seq = ++DOCK.loadSeq; // すべての呼び出しが世代を取得(同期パス含む)
  const cls = CONFIG.MECH_CLASSES[classKey];
  if (DOCK.mechClass !== classKey || !DOCK.mech) {
    const buf = HANGAR.buffers ? HANGAR.buffers[cls.model] : null;
    const gltf = buf ? await parseModel(new GLTFLoader(), buf) : null;
    if (seq !== DOCK.loadSeq) return; // より新しい呼び出しが来たら破棄
    if (DOCK.mech) DOCK.turntable.remove(DOCK.mech.root);
    DOCK.mech = gltf
      ? new GlbMechModel(gltf, cls.scale)
      : new MechModel({ ...cls.colors, eye: 0x66ddff });
    if (!gltf) DOCK.mech.root.scale.setScalar(cls.scale);
    DOCK.turntable.add(DOCK.mech.root);
    DOCK.mechClass = classKey;
  }
  if (seq !== DOCK.loadSeq) return;
  // 装備は常に現在の SAVE.loadouts をそのまま装着(再マウント省略ガード廃止)
  DOCK.mech.mountWeapons(SAVE.loadouts[classKey]);
  if (DOCK.flashPending) {
    DOCK.flashPending = false;
    DOCK.mech.flash();
    DOCK.mech.flashTime = 0.3; // 装備変更の通知フラッシュ(被弾の 0.09s より長め)
  }
}

/** ドックの毎フレーム更新(回転 + 待機微動 + リング脈動)。Game.loop から呼ばれる */
function updateDock(dt, t) {
  if (!DOCK.built) return;
  DOCK.turntable.rotation.y += dt * 0.25; // ゆっくりターンテーブル
  if (DOCK.mech) DOCK.mech.update(dt, t, 0, true, false, 0); // 待機の微動
  DOCK.ring.material.opacity = 0.42 + 0.18 * Math.sin(t * 2.2);
}

// ============================================================
// 武器サムネイル自動生成(V6.8): 一時レンダラで各武器をオフスクリーン撮影
// ============================================================
const THUMBS = {};
function generateWeaponThumbs() {
  try {
    const W = 128, H = 64;
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.setSize(W, H);
    r.setClearColor(0x000000, 0); // 透明背景
    const sc = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(30, W / H, 0.05, 30);
    sc.add(new THREE.HemisphereLight(0xcfe8ff, 0x404a58, 1.4));
    const dl = new THREE.DirectionalLight(0xffffff, 2.2);
    dl.position.set(2, 3, 4);
    sc.add(dl);
    const box = new THREE.Box3();
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    for (const key of Object.keys(CONFIG.WEAPONS)) {
      const { group } = buildWeaponModel(key);
      sc.add(group);
      box.setFromObject(group);
      box.getCenter(center);
      const diag = box.getSize(size).length();
      // 斜め前から撮影
      cam.position.set(center.x + diag * 0.65, center.y + diag * 0.42, center.z + diag * 0.95);
      cam.lookAt(center);
      r.render(sc, cam);
      THUMBS[key] = r.domElement.toDataURL();
      sc.remove(group);
    }
    r.dispose();
    console.info('[V6.8] 武器サムネイル生成完了:', Object.keys(THUMBS).length);
  } catch (err) {
    console.warn('[V6.8] サムネ生成失敗 → テキストフォールバック:', err);
  }
}

/** サムネ HTML(生成失敗時は絵文字フォールバック) */
function thumbHTML(key, cssClass) {
  return THUMBS[key]
    ? `<img class="${cssClass}" src="${THUMBS[key]}" alt="">`
    : `<span class="${cssClass} thumb-fb">🔫</span>`;
}

// ============================================================
// ハンガー UI
// ============================================================
function refreshHangarWallet() {
  $id('hangar-wallet').textContent = `WALLET ${fmtPt(SAVE.wallet)} pt`;
}

/** UI 操作音(AudioContext はユーザー操作で解禁) */
function uiSfx() {
  if (HANGAR.game) {
    HANGAR.game.sound.init();
    HANGAR.game.sound.play('ui');
  }
}

/** トースト通知(在庫の自動移動など。2.2 秒で自動消滅) */
let _toastTimer = 0;
function showToast(msg) {
  const el = $id('hangar-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ============================================================
// 装備変更の単一窓口(V6.9)。
// SAVE.loadouts の書き換えはすべてここを通り、保存 → UI/3D 再同期まで一本道。
// ============================================================
/** スロットへ武器(または null = 取り外し)を設定し、保存して全 UI/3D を再同期 */
function setSlot(clsKey, slotIdx, key) {
  SAVE.loadouts[clsKey][slotIdx] = key;
  saveSave(SAVE);
  DOCK.flashPending = key !== null; // 装着時のみ白フラッシュで「付いた」を通知
  uiSfx();
  refreshHangarUI();
}

/**
 * 武器を装備(在庫の排他制御つき)。
 * 在庫が尽きていれば他の装備先から自動で取り外して移動(WR 準拠)。
 */
function equipWeapon(clsKey, slotIdx, key) {
  if (SAVE.loadouts[clsKey][slotIdx] === key) return; // 既にこのスロットに装備済み
  // この操作で外れる現スロットの分は使用数に数えない
  const used = equippedSlots(key).filter((p) => !(p.cls === clsKey && p.slot === slotIdx));
  if (used.length >= invCount(key)) {
    // 在庫切れ → 別の装備先(他クラス優先)から外して持ってくる
    const from = used.find((p) => p.cls !== clsKey) || used[0];
    if (!from) return; // 在庫 0 かつ未装備(購入前) — 呼び出し側でガード済み
    SAVE.loadouts[from.cls][from.slot] = null;
    showToast(`${CONFIG.WEAPONS[key].name} を ${CONFIG.MECH_CLASSES[from.cls].name} から取り外しました`);
  }
  setSlot(clsKey, slotIdx, key);
}

/** 機体タブ(LIGHT/MEDIUM/HEAVY)を構築 */
function renderClassTabs() {
  const tabsEl = $id('class-tabs');
  tabsEl.innerHTML = '';
  for (const key of ['LIGHT', 'MEDIUM', 'HEAVY']) {
    const cls = CONFIG.MECH_CLASSES[key];
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'class-tab';
    tab.dataset.cls = key;
    tab.textContent = cls.name;
    tab.addEventListener('click', () => {
      if (HANGAR.selectedClass === key) return;
      HANGAR.selectedClass = key;
      HANGAR.activeSlot = -1;
      HANGAR.pendingBuy = null;
      uiSfx();
      refreshHangarUI();
    });
    tabsEl.appendChild(tab);
  }
}

/** ハンガー UI 全体を更新(左パネル / スロットカード / 武器リスト / 3D プレビュー) */
function refreshHangarUI() {
  refreshHangarWallet();
  const clsKey = HANGAR.selectedClass;
  const cls = CONFIG.MECH_CLASSES[clsKey];

  // タブ選択ハイライト
  for (const tab of document.querySelectorAll('.class-tab')) {
    tab.classList.toggle('selected', tab.dataset.cls === clsKey);
  }

  // 左パネル: クラスステータス(HP / SPEED バー + ハードポイント構成 + アビリティ)
  const maxHp = 290, maxSpd = 6.2; // V7.1: 速度上限を SCOUT 6.2 に追従
  const hpTags = CONFIG.MECH_CLASSES[clsKey].hardpoints
    .map((sz) => `<span class="sl-size sz-${sz}">${SIZE_LABEL[sz]}</span>`).join('');
  $id('class-info').innerHTML = `
    <div class="ci-name">${cls.name}${HANGAR.buffers && HANGAR.buffers[cls.model] ? '' : ' *'}</div>
    <div class="ci-class">${clsKey} CLASS</div>
    <div class="ci-stat"><span>HP</span><div class="ci-bar"><i style="width:${Math.round(cls.hp / maxHp * 100)}%"></i></div><b>${cls.hp}</b></div>
    <div class="ci-stat"><span>SPD</span><div class="ci-bar"><i style="width:${Math.round(cls.speed / maxSpd * 100)}%"></i></div><b>${cls.speed}</b></div>
    <div class="ci-ab">SLOTS ${hpTags}</div>
    <div class="ci-ab">${cls.ability === 'sprint' ? '⚡ SPRINT' : '🛡 SHIELD'}</div>
    <div class="ci-desc">${cls.desc}</div>`;

  // 右パネル: 武器スロットカード(V7.1: hardpoints 数ぶん動的生成 + サイズタグ)
  const loadout = SAVE.loadouts[clsKey];
  const hp = hardpointsOf(clsKey);
  const keyHints = ['Space', 'Z', 'X', 'C'];
  const cardsWrap = $id('slot-cards');
  cardsWrap.innerHTML = '';
  for (let i = 0; i < hp.length; i++) {
    const key = loadout[i];
    const w = CONFIG.WEAPONS[key];
    const card = document.createElement('div');
    card.className = 'slot-card';
    card.id = `slot-${i}`;
    const sizeTag = `<span class="sl-size sz-${hp[i]}">${SIZE_LABEL[hp[i]]}</span>`;
    const slotLabel = `${sizeTag}SLOT ${i + 1} [${keyHints[i] || ''}]`;
    if (w) {
      card.innerHTML = `<span class="sl-no"><span>${slotLabel}</span><span class="sl-badge">EQUIPPED</span></span>`
        + thumbHTML(key, 'sl-thumb')
        + `<span class="sl-name">${w.name}</span>`
        + `<span class="sl-tag">${w.tag} ・ ${w.mount === 'arm' ? 'ARM' : 'SHOULDER'}</span>`
        + `<button type="button" class="sl-unequip">✕ UNEQUIP</button>`;
    } else {
      card.classList.add('empty');
      card.innerHTML = `<span class="sl-no"><span>${slotLabel}</span></span>`
        + `<span class="sl-empty">— EMPTY —</span>`
        + `<span class="sl-tag">タップして${SIZE_LABEL[hp[i]]}武器を装備</span>`;
    }
    card.classList.toggle('editing', HANGAR.activeSlot === i);
    // カード開閉(動的生成のためここで結線。V7.1)
    card.addEventListener('click', () => {
      HANGAR.activeSlot = HANGAR.activeSlot === i ? -1 : i;
      HANGAR.pendingBuy = null;
      uiSfx();
      refreshHangarUI();
    });
    // 取り外し(カードの開閉クリックとは独立)
    const unequipBtn = card.querySelector('.sl-unequip');
    if (unequipBtn) {
      unequipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        HANGAR.pendingBuy = null;
        setSlot(clsKey, i, null);
      });
    }
    cardsWrap.appendChild(card);
  }
  if (HANGAR.activeSlot >= hp.length) HANGAR.activeSlot = -1; // クラス切替でスロット数減

  // 武器リスト(ショップ + 装備。開いているスロットがある時のみ)
  // V7.1: そのスロットサイズの武器のみ表示
  const list = $id('weapon-list');
  if (HANGAR.activeSlot < 0) {
    list.classList.add('hidden');
  } else {
    const slotIdx = HANGAR.activeSlot;
    const slotSize = hp[slotIdx];
    list.classList.remove('hidden');
    list.innerHTML = '';
    // ヘッダー: どのスロットを操作中かを常に明示
    const head = document.createElement('div');
    head.className = 'wl-head';
    head.textContent = `SLOT ${slotIdx + 1}(${SIZE_LABEL[slotSize]})に装備する武器を選択`;
    list.appendChild(head);

    for (const [key, w] of Object.entries(CONFIG.WEAPONS)) {
      if (w.size !== slotSize) continue; // V7.1: サイズ不一致は表示しない
      const inv = invCount(key);
      const used = equippedSlots(key);
      const isThisSlot = loadout[slotIdx] === key;
      const confirming = HANGAR.pendingBuy === key;
      // 状態判定: 未所持 / このスロットに装備中 / 在庫あり / 全数が他で使用中
      let state;
      if (inv === 0) state = 'buy';
      else if (isThisSlot) state = 'unequip';
      else if (used.filter((p) => !(p.cls === clsKey && p.slot === slotIdx)).length < inv) state = 'equip';
      else state = 'move';

      const row = document.createElement('div');
      row.className = 'wl-row' + (inv === 0 ? ' locked' : '')
        + (isThisSlot ? ' equipped' : '')
        + (confirming ? ' confirm' : '');
      // 所持/装備状況の表示(所持 n ・ 装備中: 機体名)
      const where = used.map((p) => `${CONFIG.MECH_CLASSES[p.cls].name} S${p.slot + 1}`).join(' / ');
      const status = inv === 0 ? '未所持'
        : `所持 ${inv}${where ? ` ・ 装備中: ${where}` : ''}`;
      // 右端のメインアクション(状態で文言が変わる明確なボタン)
      const btnText = {
        buy: confirming ? `PURCHASE? ${fmtPt(w.price)} pt` : `🔒 BUY ${fmtPt(w.price)}`,
        unequip: 'UNEQUIP',
        equip: 'EQUIP',
        move: 'MOVE HERE',
      }[state];
      row.innerHTML = thumbHTML(key, 'wl-thumb')
        + `<span class="wl-body"><span class="wl-name">${isThisSlot ? '✅ ' : ''}${w.name}</span>`
        + `<span class="wl-tag">${w.tag} ・ ${w.mount === 'arm' ? 'ARM' : 'SHLD'}</span>`
        + `<span class="wl-status">${status}</span></span>`
        + `<span class="wl-actions">`
        + (inv > 0 ? `<button type="button" class="wl-btn wl-buy2${confirming ? ' confirm' : ''}">${
          confirming ? `+1? ${fmtPt(w.price)} pt` : `+BUY ${fmtPt(w.price)}`}</button>` : '')
        + `<button type="button" class="wl-btn wl-main ${state}">${btnText}</button>`
        + `</span>`;

      // 購入(2 度押し確認): 在庫 +1。未所持なら購入後そのまま装備
      const doBuy = (autoEquip) => {
        if (HANGAR.pendingBuy !== key) {
          HANGAR.pendingBuy = key;
          uiSfx();
          refreshHangarUI();
          return;
        }
        HANGAR.pendingBuy = null;
        if (SAVE.wallet < w.price) {
          $id('hangar-status').textContent = `INSUFFICIENT FUNDS — NEED ${fmtPt(w.price - SAVE.wallet)} MORE pt`;
          refreshHangarUI();
          return;
        }
        SAVE.wallet -= w.price;
        SAVE.inventory[key] = invCount(key) + 1;
        showToast(`${w.name} を購入しました(所持 ${invCount(key)})`);
        if (autoEquip) {
          equipWeapon(clsKey, slotIdx, key); // 保存 + 再同期込み
        } else {
          saveSave(SAVE);
          uiSfx();
          refreshHangarUI();
        }
      };

      // メインアクション
      row.querySelector('.wl-main').addEventListener('click', () => {
        if (state === 'buy') { doBuy(true); return; }
        HANGAR.pendingBuy = null;
        if (state === 'unequip') setSlot(clsKey, slotIdx, null);
        else equipWeapon(clsKey, slotIdx, key); // equip / move(自動取り外し込み)
      });
      // 追加購入(所持済み武器の在庫 +1)
      const buy2 = row.querySelector('.wl-buy2');
      if (buy2) buy2.addEventListener('click', () => doBuy(false));
      list.appendChild(row);
    }
  }

  // 3D プレビューを同期(クラス変更=機体差替え / 武器変更=付替え)
  updateDockMech(clsKey);
}

/** 共通: 出撃セットアップを構築(クラス + 装備 + glb parse) */
async function buildSetup(playerClass) {
  const aiClasses = ['LIGHT', 'MEDIUM', 'HEAVY'].filter((k) => k !== playerClass);
  aiClasses.push('ASSAULT'); // AI 3 機 = 非選択 2 クラス + RAIDER
  const loader = new GLTFLoader();
  const playerGltf = await parseModel(loader, HANGAR.buffers[CONFIG.MECH_CLASSES[playerClass].model]);
  const aiGltfs = [];
  for (const k of aiClasses) {
    aiGltfs.push(await parseModel(loader, HANGAR.buffers[CONFIG.MECH_CLASSES[k].model]));
  }
  return {
    playerClass,
    playerSlots: [...SAVE.loadouts[playerClass]],
    aiClasses,
    gltfs: { player: playerGltf, ais: aiGltfs },
  };
}

/** 出撃(Game は常に存在 → redeploy のみ) */
async function deploy() {
  if (HANGAR.deploying || !HANGAR.game) return;
  // 全スロット空での出撃は禁止(最低 1 武器。V7.1: スロット数可変)
  const lo = SAVE.loadouts[HANGAR.selectedClass];
  if (!lo.some(Boolean)) {
    $id('hangar-status').textContent = 'EQUIP AT LEAST ONE WEAPON!';
    showToast('武器がありません — 最低 1 つ装備してください');
    uiSfx();
    return;
  }
  HANGAR.deploying = true;
  $id('hangar-status').textContent = 'DEPLOYING...';
  SAVE.lastClass = HANGAR.selectedClass;
  saveSave(SAVE);

  const setup = await buildSetup(HANGAR.selectedClass);
  HANGAR.game.redeploy(setup);
  HANGAR.game.exitHangar();
  $id('hangar').classList.add('hidden');
  HANGAR.game.sound.init(); // 出撃クリックがユーザー操作 → AudioContext 解禁
  HANGAR.game.sound.play('ui');
  HANGAR.deploying = false;
  $id('hangar-status').textContent = 'SELECT YOUR MECH';
}

/** リザルトからドックへ戻る(装備変更/購入が可能) */
function returnToHangar() {
  $id('overlay').classList.add('hidden');
  HANGAR.activeSlot = -1;
  HANGAR.pendingBuy = null;
  refreshHangarUI();
  $id('hangar').classList.remove('hidden');
  if (HANGAR.game) {
    HANGAR.game.enterHangar(); // ドック描画へ切替 + BGM title
    HANGAR.game.sound.play('ui');
  }
}

(async () => {
  const statusEl = $id('hangar-status');
  if (statusEl) statusEl.textContent = 'LOADING...';
  HANGAR.buffers = await loadModelBuffers();

  // ドックシーン + 武器サムネ + UI 構築
  buildDockScene();
  generateWeaponThumbs();
  renderClassTabs();
  refreshHangarUI();

  // Game を起動時に生成(ドックは Game の renderer/composer で描画される)
  const setup = await buildSetup(HANGAR.selectedClass);
  HANGAR.game = new Game(setup);
  HANGAR.game.enterHangar();
  statusEl.textContent = 'SELECT YOUR MECH';

  // スロットカードの開閉は動的生成時に結線(V7.1: refreshHangarUI 内)
  $id('launch-btn').addEventListener('click', deploy);
  $id('hangar-btn').addEventListener('click', returnToHangar); // リザルト側のボタン
})();
