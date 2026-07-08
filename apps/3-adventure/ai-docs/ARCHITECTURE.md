# Architecture & Tech Stack

> Auto-generated: 2026-07-06

# ARCHITECTURE.md — 3-Adventure システムアーキテクチャ（確定版）

> Phase 1-A（計画評価）で採用された保守的アプローチの草案を、SPEC.md / data_models.md / TECH_STACK.md / API_DESIGN.md
> （すべて確定済み）と整合させ、Phase 2 実装の基盤として確定させたものである。
> フィールドレベルのスキーマは SPEC.md §5 / API_DESIGN.md §2 を正とし、本書は「構造」（誰が何に依存し、何が並列開発の分岐点か）を定義する。

---

## 1. 設計方針

「実績のあるパターンを再利用し、リスクを最小化する」ことを基本方針としつつ、SPEC.md §4.5 が要求する
大量描画（8分地点で同時アクティブ敵最大139体、プール上限150体）に対しては、Phase 2 で2つの実装アプローチを
並列開発し自律評価で選ぶ（§5 実装差別化戦略）。

アセット生成パイプライン（Meshyクライアント・ジョブ管理）は `robo-battle-v5-agent/tools/meshy-3d-studio` から
**コード変更なしでほぼそのまま流用**し、マニフェスト管理・グレースフルデグレードのパターンも
`robo-battle-v5-agent`（キャラ側）・`nova-clash-agent`（武器・ボーンアタッチ側）から踏襲する。

---

## 2. 全体構成（ゲーム本体とスタジオツールの分離）

```
3-adventure-agent/
├── project/                        # 公開対象：ゲーム本体（静的ホスティング、実行時外部API不要）
│   ├── src/                        # Vite + TypeScript ソース（ビルド前）
│   │   ├── logic/                  # ★three.js/DOM非依存の純粋関数・クラス（テスト最優先層）
│   │   │   ├── xpCurve.ts
│   │   │   ├── waveCurve.ts
│   │   │   ├── damageCalc.ts
│   │   │   ├── weaponCooldown.ts
│   │   │   ├── evolution.ts
│   │   │   ├── synergy.ts
│   │   │   ├── metaProgression.ts
│   │   │   ├── manifestValidation.ts
│   │   │   ├── saveMigration.ts
│   │   │   └── dropTable.ts
│   │   ├── entities/                # Player, Enemy, Boss, Weapon等の描画オブジェクト保持クラス
│   │   ├── systems/                 # spawner, pool, weaponAttach, autoAttack, levelUp, metaProgression, persistence
│   │   ├── input/                   # VirtualJoystick, KeyboardInput
│   │   ├── ui/                      # HUD, レベルアップ3択モーダル, 各画面（軽量DOM/CSS、TECH_STACK.md §1.3）
│   │   ├── core/
│   │   │   ├── game.ts              # メインループ（固定タイムステップ）
│   │   │   ├── sceneManager.ts      # シーングラフ構築・カメラ
│   │   │   ├── manifestLoader.ts    # characters.json/weapons.json/passives.jsonのfetch＋グレースフルデグレード
│   │   │   └── rendererFallback.ts  # WebGL2/WebGL1判定・品質スケーリング
│   │   └── main.ts                  # エントリポイント
│   ├── public/                      # Viteの静的配信対象（ビルド後にそのまま出力へコピーされる）
│   │   ├── index.html
│   │   ├── about.html
│   │   └── assets/
│   │       ├── characters.json      # キャラクター/敵/ボスマニフェスト（SPEC.md §5.1, API_DESIGN.md §2.2）
│   │       ├── weapons.json         # 武器マニフェスト（SPEC.md §5.2, API_DESIGN.md §2.2）
│   │       ├── passives.json        # パッシブマニフェスト（SPEC.md §5.3, API_DESIGN.md §2.2）
│   │       ├── models/*.glb         # キャラクター/敵/ボスGLB（Draco圧縮）
│   │       ├── weapons/*.glb        # 武器GLB（Draco圧縮）
│   │       ├── audio/*              # 効果音・BGM（SPEC.md §7、事前生成の静的ファイルのみ）
│   │       └── libs/draco/          # DRACOLoaderデコーダ（自己ホスト、TECH_STACK.md §1.2）
│   ├── tests/                       # Vitest（logic中心）+ 統合テスト
│   ├── e2e/                         # Playwright
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   └── package.json
│
├── tools/
│   └── asset-studio/                # 開発専用：ゲームには同梱・公開しない（ポート3050、TECH_STACK.md §2.1）
│       ├── server.py                # meshy-3d-studioのserver.pyを改修（API_DESIGN.md §1のエンドポイント）
│       ├── meshy_client.py          # robo-battle-v5-agentからコード変更なしで流用
│       ├── jobs.py                  # 同上（JobManagerそのまま）
│       ├── character_registry.py    # custom_mechs.jsonパターンをcharacters.json向けに踏襲
│       ├── weapon_registry.py       # registry.jsonの武器フィールドパターンをweapons.json向けに踏襲
│       ├── passive_registry.py      # passives.json向け新規実装（GLBを伴わない軽量レジストリ）
│       ├── scripts/
│       │   └── gen_weapon.py        # nova-clash方式：Blenderヘッドレスでの武器プロシージャル生成
│       ├── app.js / index.html      # スタジオUI（three.jsプレビュー、ビルド不要の素のHTML/JS）
│       ├── tests/                   # Python unittest（TEST_DESIGN.md §1.4）
│       └── state.json               # ジョブ履歴（Meshyジョブの進行状態、原子的書き込み）
│
└── (SPEC.md / data_models.md / TECH_STACK.md / API_DESIGN.md / WBS.json 等)
```

**分離の理由（変更なし）**: スタジオツールはPythonローカルサーバー・APIキー参照を必要とするが、
ゲーム本体は静的ファイルのみで完結しなければならない（$0・外部API不要の要件）。ディレクトリを分けることで
「スタジオのコードやAPIキー参照が誤ってゲームに同梱される」事故を構造的に防ぐ。

---

## 3. コンポーネント図（ゲーム本体）

```
┌──────────────────────────────── project/src ────────────────────────────────┐
│                                                                              │
│   input/            ui/                 core/                              │
│   ├ VirtualJoystick  ├ Hud              ├ game.ts (固定タイムステップループ) │
│   └ KeyboardInput    ├ LevelUpModal     ├ sceneManager.ts (three.js Scene)  │
│         │            └ TitleScreen等    ├ manifestLoader.ts                │
│         │                 ▲             └ rendererFallback.ts              │
│         ▼                 │                     │ fetch                    │
│   systems/ ◄───────────────┘                     ▼                          │
│   ├ spawner        ┌─────────────────────────────────────────┐             │
│   ├ pool           │  entities/ (Player/Enemy/Boss/Weapon)    │             │
│   ├ weaponAttach   │  three.js Group/SkinnedMesh/InstancedMesh│             │
│   ├ autoAttack     └─────────────────────────────────────────┘             │
│   ├ levelUp                     ▲                                          │
│   ├ metaProgression             │ 計算結果を適用するだけ（薄いラッパー）      │
│   └ persistence                 │                                          │
│         │                       │                                          │
│         ▼                       │                                          │
│   ┌──────────────────────────────────────────────────────┐                 │
│   │ logic/ （three.js/DOM非依存の純粋関数・クラス）           │                 │
│   │ xpCurve / waveCurve / damageCalc / weaponCooldown /    │                 │
│   │ evolution / synergy / metaProgression / dropTable /   │                 │
│   │ manifestValidation / saveMigration                    │                 │
│   └──────────────────────────────────────────────────────┘                 │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────┘
                 │ fetch (assetVersion cache-bust)         │ localStorage
                 ▼                                          ▼
   public/assets/{characters,weapons,passives}.json    3adventure_save_v{n}
   public/assets/{models,weapons}/*.glb (Draco)
```

**依存関係の絶対原則**（data_models.md §4.1、テスト境界の根拠）:
- `logic/*` → 何にも依存しない（three.js import禁止、DOM API禁止、Node環境で完結してテスト可能）。ESLintの `no-restricted-imports` で機械的に強制する（TECH_STACK.md §1.6）。
- `entities/*` → `logic/*` の計算結果を受け取り three.js オブジェクトへ反映するだけの薄いラッパー。
- `systems/*` → `logic/*` を呼び出し `entities/*` を操作するオーケストレーション層。三者の境界を越えた直接依存（例: `logic/*` が `entities/*` をimportする）は禁止。

---

## 4. ゲームループ・オブジェクトプール・レンダリング基盤

### 4.1 ゲームループ（固定タイムステップ、両プロトタイプ共通仕様）

```typescript
// core/game.ts
const FIXED_DT = 1 / 60;
let accumulator = 0;
let lastTime = performance.now();

function frame(now: number) {
  const frameTime = Math.min((now - lastTime) / 1000, 0.25); // スパイク時のスパイラル防止
  lastTime = now;
  accumulator += frameTime;

  while (accumulator >= FIXED_DT) {
    update(FIXED_DT);       // ロジック更新（プレイヤー、敵、当たり判定、プーリング等）
    accumulator -= FIXED_DT;
  }
  render(accumulator / FIXED_DT); // 補間描画
  requestAnimationFrame(frame);
}
```

- ロジック更新と描画を分離することで、ローエンドスマホでフレームが落ちてもゲームロジックの進行速度は一定に保つ。
- **全敵の`update(dt)`は間引かない**（画面外の敵もロジックは毎tick更新する）。間引くのは描画側の最適化のみ（§5 案Bの差別化ポイント）。これによりロジック層のテスト容易性（decouple from rendering）が両プロトタイプで揺らがない。

### 4.2 オブジェクトプール（両プロトタイプ必須実装）

敵・弾・ヒットエフェクトはウェーブが進むほど大量に生成/破棄されるため、`new`/GCのコストを避けるプール制を必須とする。
上限（敵150体・弾300発・エフェクト200個、SPEC.md §6.1）到達時はカメラ外/最古の個体を優先解放する。

```typescript
// systems/pool.ts
class ObjectPool<T> {
  private free: T[];
  private active = new Set<T>();
  constructor(private factory: () => T, private resetFn: (obj: T, ...args: any[]) => void, initialSize = 50) {
    this.free = Array.from({ length: initialSize }, factory);
  }
  acquire(...args: any[]): T {
    const obj = this.free.pop() ?? this.factory();
    this.resetFn(obj, ...args);
    this.active.add(obj);
    return obj;
  }
  release(obj: T) {
    this.active.delete(obj);
    this.free.push(obj);
  }
}
```

### 4.3 WebGL2/WebGL1フォールバック

```typescript
// core/rendererFallback.ts
const gl2 = canvas.getContext('webgl2');
const capability = gl2 ? 'webgl2' : 'webgl1';
// webgl1判定時: ポストプロセス(Bloom等)を無効化、影を簡略化、パーティクル密度を下げる
```

### 4.4 武器のボーンアタッチ（両プロトタイプ共通仕様）

`nova-clash-agent` の `weapon.js` パターンをほぼそのまま移植する（保守的判断・実績重視）。

```typescript
// systems/weaponAttach.ts
function findHandBone(root: THREE.Object3D, side: 'right' | 'left' = 'right'): THREE.Bone | null {
  const re = new RegExp(side + 'hand$', 'i');
  let bone: THREE.Bone | null = null;
  root.traverse((o) => { if (!bone && (o as THREE.Bone).isBone && re.test(o.name)) bone = o as THREE.Bone; });
  if (!bone) {
    const re2 = new RegExp(side + 'forearm$', 'i');
    root.traverse((o) => { if (!bone && (o as THREE.Bone).isBone && re2.test(o.name)) bone = o as THREE.Bone; });
  }
  // 本プロジェクト独自の追加フォールバック: hand/forearmいずれも見つからない場合は
  // ルート直下の固定オフセットにアタッチする（CRITICAL_PATH.md リスク対応）。
  return bone;
}
```

- グリップ（`THREE.Group`）をボーンに追加し、`grip.scale = 1 / handWorldScale` でキャラクターの正規化スケールを
  打ち消すことで、`attach.scale`（API_DESIGN.md §2.2）を実寸ベースで指定できるようにする。
- GLB読み込み失敗時・武器未指定時は、プロシージャルな簡易ジオメトリ（例: シンプルな刀身形状）にフォールバックする。
- ジオメトリ/マテリアルの明示的 `dispose()` をローダー・武器アタッチ解除（`detach()`）双方に実装し、メモリリークを防ぐ（CRITICAL_PATH.md §3.2）。

---

## 5. 実装差別化戦略（最重要・Phase 2 並列開発の定義）

### 5.0 判定: 2案（プロトタイプC は不使用）

本プロジェクトの入力方式・カメラ挙動・ビジュアルスタイルは SPEC.md で既に固定仕様（バーチャルスティック固定、
自動攻撃、見下ろし〜クォータービューの単純追従カメラ）であり、「入力/カメラ体験特化」のような第3の軸を
実質的な差別化要素として立てることができない。したがって**意味のある独立した軸は「エンティティ・描画層の
実装方式」1本のみ**であり、それを2方向（堅実 / パフォーマンス特化）に振った2案とする。

**`phase2-impl-prototype-c` は本プロジェクトでは不使用。** WBS.json（Phase 1-A版）は `replication: "x3_per_prototype"`
を仮置きしていたが、Phase 1-7（WBS最終版）ではゲームコア系統（`GL-*`, `IN-*`, `ML-*`, `RD-*`）を
`x2_per_prototype` に修正すること（引き継ぎ事項として次工程へ明記）。

両案に共通する仕様（差別化しない部分）:
- `src/logic/*` は完全に共通仕様・共通テスト（data_models.md §4.1、両案とも同一の純粋関数シグネチャを実装し、
  TEST_DESIGN.md のユニットテストカタログをそのまま満たす）
- `manifestLoader.ts` の契約（API_DESIGN.md §2）、HUD実装方式（軽量DOM/CSS、TECH_STACK.md §1.3）、
  入力系（VirtualJoystick/KeyboardInput）、カメラ追従方式、ゲームループの固定タイムステップ構造
- 武器ボーンアタッチ（§4.4）、WebGL2/1フォールバック（§4.3）

### 5.1 案A: 堅実シーングラフ（Proven Scene Graph）

- **設計方針**: 標準的な three.js `Object3D` 階層。敵・弾・エフェクトはそれぞれ独立した `Group`/`Mesh` インスタンスとして
  シーングラフに保持し、毎フレーム配列を for-loop で走査して `update(dt)` を呼ぶ素直な実装。`SkinnedMesh` は
  `SkeletonUtils.clone()` によるプール複製で複数体表示に対応する（§4.2のプールで管理）。
- **差別化の狙い**: 実装リスクの最小化・可読性・保守性。実績パターン（nova-clash/robo-battle-v5と同系統の書き方）の
  踏襲によりバグ密度を下げ、Phase 2の手戻りリスクを抑える。
- **現実性の根拠**: three.jsの最も標準的な使い方であり、既存参考実装のコードをほぼそのまま転用できるため学習コスト・
  実装コストが低い。コード品質評価基準（可読性・保守性）でも有利。
- **想定リスクと対策**: 敵150体+弾300発+エフェクト200個（合計650オブジェクト規模）でドローコール・JS側のオブジェクト
  参照処理が肩を並べたときに、ローエンドスマホで30fps割れの可能性がある（CRITICAL_PATH.md §3.2）。対策として
  §4.2のオブジェクトプール必須実装、three.jsのフラスタムカリング任せ、RD-11（描画品質自動スケーリング）でのパーティクル
  ・影の段階的削減で緩和する。

### 5.2 案B: パフォーマンス特化（Data-Oriented / Instancing-Heavy）

- **設計方針**: 敵・弾・エフェクトの位置/速度/HP等の実行時状態を `Float32Array` ベースの SoA（Structure of Arrays）で
  保持するデータ指向設計とし、`logic/*` の純粋関数群への入出力もこの配列表現で受け渡しする（`logic/*`自体のシグネチャ
  は共通仕様のため、系統だった単一エントリの引数/戻り値としては共通、内部でのバッチ処理適用が異なる）。
  描画は非スケルタルなオブジェクト（弾・ヒットエフェクト・GLB読込失敗時のプロシージャル代替、および同時大量出現する
  雑魚敵 `shambler`/`skitterling` の簡易表現）を `InstancedMesh` で一括描画する。スケルタルGLB（リグ済みキャラ/敵）は
  引き続き `SkeletonUtils.clone()` プールを使うが、画面上で密集・遠方にある個体は簡易ジオメトリ表現へLODダウングレード
  する切替ロジックを持つ。
- **差別化の狙い**: モバイル低スペック機での大量描画時のフレームレート優位性。CPU側（TypedArray再利用によるGC負荷削減）
  とGPU側（instancingによるドローコール削減）の両輪で最適化する。
- **現実性の根拠**: SPEC.md §4.5が「8分地点で同時アクティブ最大139体、プール上限150体」という明確な大量描画要件を
  課しており、これは three.js の `InstancedMesh` が実際に効果を発揮する典型的シナリオである。ARCHITECTURE.md（本書）
  §4.2・CRITICAL_PATH.md §3.2 が既に「非スケルタル代替メッシュのInstancedMesh化」を示唆しており、その適用範囲を
  雑魚敵本体にまで広げる一貫性のある拡張である。
- **想定リスクと対策**: データ指向設計は実装複雑度が上がり、`AnimationMixer`（スケルタルアニメーション）と
  `InstancedMesh` は相性が悪い（instancingは通常非アニメーションメッシュ向け）。雑魚敵をInstancedMesh化する場合、
  アニメーションなし/簡易な回転・スケール脈動等の疑似モーションに留まり見た目品質が案Aより落ちる可能性がある。
  SPEC.mdに「雑魚敵の見た目品質」を評価基準とする明示要件はないため許容範囲と判断するが、Phase 2実装エージェントは
  Brute/Spitter/EliteWarden/Boss等の**個体数が少なく視認性が重要な敵は通常のSkinnedMesh表現を維持**し、
  InstancedMesh化はShambler/Skitterling（大量沸き系、SPEC.md §4.5）に限定適用すること。

### 5.3 評価観点（Phase 2完了後の自律評価で重点確認する差分）

| 観点 | 案A | 案B |
|------|-----|-----|
| モバイル実機/エミュレート相当でのフレーム安定性（8分地点想定の高密度シーン） | 標準実装のベースライン | 優位性を狙う本命 |
| コードの可読性・変更容易性 | 優位 | データ指向のぶん学習コストあり |
| 実装リスク（Phase 2内で完成する見込み） | 低リスク | 中リスク（LOD切替ロジックの分だけ複雑） |
| `src/logic/*` テスト結果 | 共通仕様のため同一（差がないことの確認が目的） | 同上 |

---

## 6. Meshy リギング済みGLBのアニメーション再生方針

- **歩行/走行**: `AnimationMixer` で `{model}_walking.glb` / `{model}_running.glb`（data_models.md §2の命名規則）の
  クリップを再生する。`moveSpeed`の閾値でwalking⇔runningをクロスフェード切替（`crossFadeTo`, 0.2秒程度）。
  移動していない場合は先頭フレームで停止（アイドル専用クリップは生成しない。Meshyリギングのコスト・失敗リスク
  最小化のため、MVPでは「歩行クリップの最初のフレーム」をアイドル代用とする）。
- **攻撃は武器エフェクトで表現し、キャラクターの専用攻撃アニメーションには依存しない**（SPEC.md §4.3の武器仕様
  ―薙ぎ払い・投擲・発射・電撃・爆発・回転する蔓―はすべて武器側モデル・パーティクル・軌道計算で表現する）。
  これはCRITICAL_PATH.md §3.3（アニメーション・リターゲットリスク: RD-5）を踏まえたリスク低減設計であり、
  Meshy/Mixamoの`rigging`エンドポイントに要求するクリップ種別を「歩行・走行」の2種のみに絞ることで、
  リギング失敗率・工数を最小化する（S-03のスコープをwalking/runningのみに限定）。
- **リギング失敗時**（`TaskFailed`/`TaskStalled`、API_DESIGN.md §1.2）: `modelType: "static"` として登録し、
  `AnimationMixer`を使わない静止ポーズ表示に切り替える（M-06のプロシージャル代替とは別の、リグなしGLB表示の
  中間フォールバック）。ゲームプレイ上の機能（移動・攻撃）には影響しない設計とする。
- **ボス（`boss_voidmaw`）の予兆（地面叩きつけ1秒）**: 専用クリップは持たず、`telegraphState`（data_models.md §1.2の
  `Boss`型）による発光エフェクト/スケールアニメーション（Tweenではなく`logic`層の時間進行値をentities側で
  補間適用）で表現する。ボス用の追加リギングコストを発生させない。

---

## 7. Meshyアセットパイプライン（スタジオツール、コード変更なしで流用する部分）

`tools/asset-studio/meshy_client.py` と `jobs.py` は `robo-battle-v5-agent/tools/meshy-3d-studio/` から
**ゲーム非依存のためそのままコピーして流用**する（再実装しない＝保守的判断）。エンドポイント仕様は
API_DESIGN.md §1 を正とする。

- 認証: 環境変数 `MESHY_API_KEY`（`~/.config/ai-agents/profiles/default.env` から読込、`setdefault` のみでアプリ側に
  ハードコードしない、SPEC.md §6.2）
- ジョブ管理: `JobManager.submit(kind, opts)` がバックグラウンドスレッドでポーリングし、フェーズ進捗
  （preview→refine→rig→download）を `state.json` に原子的に永続化。サーバー再起動時、進行中ジョブは
  `interrupted` として明示し自動再開しない（曖昧な自動復帰よりも人間の目視確認を優先する保守的判断）。
- 武器生成: `modelSource: "blender_headless"` をデフォルト（$0・高速・寸法再現性が高い）とし、`"meshy"` は
  選択式のフォールバック経路とする（TECH_STACK.md §2.2）。

---

## 8. まとめ：設計判断一覧（確定版）

| 判断 | 内容 | 理由 |
|------|------|------|
| 言語 | TypeScript（strict） | TECH_STACK.md §1.1。data_models.mdの型シグネチャをそのまま実装できる |
| ゲームループ | 固定タイムステップ + 独自ECS不使用（案A）/ データ指向だが同一ループ構造（案B） | 両案とも§4.1の構造は共通、内部データ表現のみ異なる |
| プーリング | 敵/弾/エフェクトを対象に両案とも必須実装 | bullet-heavenジャンル特有の大量オブジェクト生成に対する構造的対策 |
| マニフェスト形式 | JSON配列 + per-entry `assetVersion` | robo-battle-v5で実績のあるキャッシュ回避・二重検証パターンをそのまま踏襲（API_DESIGN.md §2.3） |
| 武器アタッチ | ボーン名正規表現 + グリップスケール補正 | nova-clashで実績のあるパターン。フォールバック段階をさらに1段追加 |
| 実装差別化 | 2案（堅実シーングラフ／パフォーマンス特化データ指向）。第3案は不採用 | SPEC.mdが入力・カメラ・ビジュアルスタイルを固定仕様としており、独立した第3の軸が存在しないため |
| キャラアニメーション | walking/runningの2クリップのみMeshyリギング対象、攻撃はキャラ非依存 | リギング失敗リスク（CRITICAL_PATH.md §3.3）の最小化 |
| 武器生成 | Blenderヘッドレスをデフォルト、Meshyも選択可 | 無料・高速・再現性の高い方をデフォルトにし、コストとリスクを抑える |
| Meshyクライアント/ジョブ管理 | コード変更なしで流用 | 実績のあるコードの再実装は不要なリスクを生むため避ける |
| ディレクトリ分離 | `project/`（公開）と `tools/asset-studio/`（非公開・開発専用） | 秘密情報・開発専用コードの誤同梱を構造的に防止 |


---

# TECH_STACK.md — 3-Adventure 技術スタック決定書

> 前提: SPEC.md / data_models.md / WBS.json / CRITICAL_PATH.md / TEST_DESIGN.md（確定済み）を実装可能な技術選定に落とし込む。
> 判定基準: DEFAULT_POLICY.md（$0優先・全自動）、コード品質基準（型定義必須）、モバイル性能最優先（UX評価35%）。

---

## 1. ゲーム本体（`project/public/`）

### 1.1 言語: TypeScript

**採用: TypeScript（strict mode）**

理由:
- data_models.md がすでに `interface Player`, `interface Enemy`, `function xpToNextLevel(level: number): number` 等、TypeScript の型シグネチャで確定仕様を記述している。vanilla JS を選ぶとこの確定仕様を JSDoc 等で再翻訳する二度手間が生じ、仕様とコードが乖離するリスクが生まれる。
- `src/logic/*`（xpCurve, waveCurve, damageCalc, evolution, manifestValidation, dropTable, saveMigration）は SPEC.md §4 の数値設計をそのまま関数化する層であり、型で入出力を固定することが TEST_DESIGN.md §1.1 のユニットテスト（TC-U-001〜060）の信頼性に直結する（境界値・成長式の型崩れを早期発見）。
- コード品質評価基準（型定義必須・保守性）に対応し、Meshy 生成キャラ/武器/敵/ボスをすべて共通の `role` 判別ユニオン型（`"player" | "enemy" | "boss"`）で扱えるため、マニフェスト二重検証（M-04）の型安全性が高い。
- ビルドは Vite（esbuild による transpile-only）を使うため、TypeScript 採用による追加ビルドコストはほぼゼロ（型チェックは CI/ローカルで `tsc --noEmit` として独立実行し、本番バンドルサイズに影響しない）。

トレードオフとして学習コスト増はあるが、既に data_models.md が型で確定仕様を書いているため実質コストはゼロと判断する。

### 1.2 three.js バージョン・ロード方式

- **バージョン固定**: `three@^0.182.0`（package.json に記載し `package-lock.json` でロック。この環境内の他プロジェクト実績値 `bowling-adventure-v2` の稼働実績に合わせる）。
- **ロード方式: npm パッケージ + Vite バンドル**（importmap/CDN 読込は不採用）。
  - 理由: 本プロジェクトは実行時ゼロ外部通信が要件（SPEC.md §7, DEFAULT_POLICY.md）。CDN importmap（`unpkg.com` 等）は開発中のスタジオツール（`tools/asset-studio/`）では許容されるパターンだが、公開するゲーム本体でCDN依存を持つと「外部ホスト障害時にゲームが起動しない」リスクを抱える。npm バンドルなら `dist/` に必要なコードが完全に内包され、GitHub Pages 等の静的ホスティングで完結する。
  - Vite の tree-shaking により、three.js のうち実際に import したモジュール（Scene, GLTFLoader, DRACOLoader, AnimationMixer, SkeletonUtils, InstancedMesh 等）のみがバンドルされ、SPEC.md §6.3 の初回ロード5MB以内の制約に寄与する。
- **GLTFLoader**: 必須採用（`three/examples/jsm/loaders/GLTFLoader.js`）。全キャラ/武器/敵/ボスの GLB 読込に使用。
- **DRACOLoader**: 必須採用。SPEC.md §6.3 が GLB への Draco 圧縮適用・300KB以下を要求しているため、デコーダなしでは読込不可。
  - デコーダファイル（`draco_decoder.wasm` 等）は `node_modules/three/examples/jsm/libs/draco/` から `project/public/assets/libs/draco/` へビルド時にコピーし、`DRACOLoader.setDecoderPath('./assets/libs/draco/')` で**自ホスト**する（Google Static CDN 参照は不採用。実行時外部通信ゼロの要件を厳守するため）。
- **SkeletonUtils**: 必須採用（`three/examples/jsm/utils/SkeletonUtils.js`）。ARCHITECTURE.md の設計判断どおり、`SkinnedMesh` はインスタンシング非対応のため `SkeletonUtils.clone()` によるプール複製で敵/キャラの複数体表示に対応する。
- **InstancedMesh**: 必須採用。GLB読込失敗時のプロシージャル代替メッシュ（非スケルタル）、および弾・ヒットエフェクトの大量描画に使用（ARCHITECTURE.md §6.1、CRITICAL_PATH.md §3.2 のドローコール増加リスク対策）。

### 1.3 HUD/メニューUI: 軽量 vanilla TypeScript + DOM/CSS（React 不採用）

**判定: 軽量 DOM/CSS を採用し、React は採用しない。**

判断根拠（モバイル性能最優先、評価基準のユーザー体験35%に直結）:
1. **メインスレッド競合**: このゲームは 60fps 目標の固定タイムステップループ（ARCHITECTURE.md §2.1）で毎フレーム HP・タイマー・キル数・レベルを更新する。React を使うと HUD の高頻度更新（毎フレーム相当）が VDOM 差分計算・reconciliation を経由することになり、ゲームループ本体（衝突判定・自動攻撃・スポナー）と同じメインスレッドを取り合う。素の `textContent`/`style` 直接更新はこのオーバーヘッドを完全に回避できる。
2. **バンドルサイズ**: React 18 + ReactDOM は gzip 後で約 40〜45KB。three.js 本体（GLTFLoader/DRACOLoader込み）だけで数百KB規模になる本プロジェクトでは、SPEC.md §6.3 の「初回ロード5MB以内」自体には収まるが、LCP/FID（Core Web Vitals、評価基準）への影響はゼロではない。ゲームロジックと二重の実行系（React の状態更新 + `src/logic`/`src/systems` の純粋関数群）を持つ必要性がなく、素の DOM で十分に賄える画面数・複雑度（タイトル/キャラ選択/ゲーム本編/レベルアップモーダル/リザルト/メタショップの6画面、SPEC.md §2）である。
3. **アーキテクチャ一貫性**: `src/logic/*` は状態を持たない純粋関数、`src/systems/*` がオーケストレーションを担う設計（data_models.md §4.1）であり、すでに「独自の軽量な状態管理層」を持つ。ここに React の props/state というもう一つの状態管理パラダイムを追加すると二重管理になり、保守性が下がる。
4. SUBAGENT_PROMPT_TEMPLATE.md の例外規定（Canvas/WebGLゲームは vanilla、HUD は React 推奨）に対し、本プロジェクトは HUD 自体も軽量実装が優位と判断し例外を適用する。ただし CLAUDE.md の設計思想（保守性・型安全性）は TypeScript 採用により担保する。

実装方針:
- `src/ui/` 配下に画面ごとの薄いクラス/関数モジュール（`Hud.ts`, `LevelUpModal.ts`, `TitleScreen.ts` 等）を置き、テンプレート文字列 or `document.createElement` で DOM を構築、CSS は BEM 風の命名で `src/ui/*.css` に分離。
- 状態変化の検知は `src/systems/*` から明示的に呼び出す薄い `render(state)` 関数（差分検知なしの直接更新、必要な要素のみ毎フレーム触る）とし、フレームワークのレンダーサイクルに依存しない。
- アクセシビリティ（WCAG 2.1 AA）はセマンティック HTML・ARIA 属性・フォーカス管理を手動で担保する（フレームワーク依存なしでも達成可能な範囲）。

### 1.4 状態管理・セーブ

- **外部状態管理ライブラリは不採用**（Redux/Zustand等は導入しない）。単一プレイヤー・ローカル完結型ゲームであり、`src/systems/gameState.ts` に単一の `GameState` オブジェクト（Player, 敵/弾/エフェクトのプール参照, ラン経過時間等）を持たせ、`src/logic/*` の純粋関数へ都度渡す設計で十分（data_models.md §1 のランタイムエンティティ定義に対応）。過剰な抽象化は保守性評価基準に反する。
- **セーブ**: LocalStorage。キー・スキーマは data_models.md §3 を正とする（`3adventure_save_v{saveVersion}`、マイグレーション方針は §3.1 準拠）。実装は `src/logic/saveMigration.ts`（純粋関数、Node環境でテスト可能）+ `src/systems/persistence.ts`（実際の `localStorage.getItem/setItem` 呼び出しの薄いラッパー、統合テスト対象）に分離する。

### 1.5 ビルド: Vite

- **ビルドツール: Vite 7.x**（`vite@^7.x`。同環境内の稼働実績 `bowling-adventure-v2` に準拠）。
- `vite.config.ts`:
  - `base: './'`（GitHub Pages の相対パス配信要件、REQUIREMENTS/CLAUDE.md 既定ルール）
  - `build.target`: `es2020`（iOS 18以降のSafari・主要モバイルブラウザのネイティブESM/BigInt等をカバーしつつ広い互換性を維持）
  - `build.sourcemap: false`（本番配布物にソースマップを含めない。デバッグ用は開発時 `vite dev` のみ）
  - Draco デコーダファイルのコピーは `vite-plugin-static-copy`（または `publicDir` 配置）で `project/public/assets/libs/draco/` へ出力する設定を明記
- **Phase 2〜5 のビルド・デプロイ手順**（phase1-planning.md 1-6 の React 標準手順を vanilla TS+Vite 向けに読み替え）:
  1. Phase 2: `project/` 直下で Vite + TypeScript プロジェクトを作成（`npm create vite@latest . -- --template vanilla-ts` 相当の構成を手動整備、`src/` は本書 ARCHITECTURE.md のディレクトリ構成に従う）
  2. Phase 3/4: `npm run dev` でローカル確認、`vitest run --coverage` でユニットテスト、`playwright test` でE2E
  3. Phase 5: `npm run build` で `project/dist/` を生成 → `dist/` の中身（`index.html`, `assets/` 等）を `project/public/` にコピー（`dist/` フォルダ自体を`public/`に置き換えない。既存の `project/public/assets/{characters,weapons,passives}.json` 等マニフェスト・GLBは事前に `project/public/assets/` へ配置しビルド対象の `public/`（Viteの`publicDir`）としてそのまま出力に含める）
  4. `about.html`, `README.md`, `explanation.mp3` を `project/public/` に追加
  5. 相対パス検証（GitHub Pages対応、CLAUDE.md既定ルール）

### 1.6 開発ツール

| ツール | 用途 |
|--------|------|
| ESLint（`typescript-eslint`） | 静的解析。`src/logic/*` の three.js/DOM 非依存境界を `no-restricted-imports` ルールで機械的に強制（data_models.md §4.1 の境界をLintで担保） |
| Prettier | フォーマット統一 |
| `tsc --noEmit` | 型チェック専用実行（ビルドとは分離、CIで独立実行） |
| Vitest + `@vitest/coverage-v8` | ユニット/統合テスト・カバレッジ計測（TEST_DESIGN.md §4.1 のしきい値をそのまま `vitest.config.ts` に反映） |
| Playwright | E2E（TEST_DESIGN.md §1.3、SwiftShaderソフトウェアレンダリング前提） |

---

## 2. アセットスタジオ（`tools/asset-studio/`、開発専用・非公開）

### 2.1 サーバー構成

- **言語/フレームワーク: Python 標準ライブラリのみ**（`http.server.BaseHTTPRequestHandler` + `ThreadingHTTPServer`）。Flask 等の外部依存を追加しない。
  - 理由: `robo-battle-v5-agent/tools/meshy-3d-studio/server.py` が同一パターンで実績があり（`meshy_client.py`/`jobs.py` をコード変更なしで流用する前提、ARCHITECTURE.md §5）、依存追加ゼロで $0・セットアップレス起動を維持できる。
- **ポート番号: `3050`**（固定デフォルト、`--port` 引数で上書き可）。
  - 同一マシン内の既存スタジオツールとの衝突を避けるため選定: `robo-battle-v5-agent/tools/meshy-3d-studio` は `3010`、`nova-clash-agent/tools/studio` は `3030` を使用中。本プロジェクトは両者と共存する可能性があるため `3050` を採用する。
  - 起動スクリプト（`.command`）はポート使用中プロセスの検出・停止（既存2プロジェクトの `.command` パターン踏襲）を実装する。
- **フロントエンド（スタジオUI自体）**: `tools/asset-studio/index.html` + `app.js`（vanilla JS、three.js は importmap 経由のローカル `/lib/` 配信 or CDN — スタジオは開発専用ローカルツールのため CDN 参照も許容範囲。既存2参考実装と同様の構成でよい）。ゲーム本体とは別のバンドルパイプラインであり、Vite を介さない（開発専用ツールにビルドステップを持ち込まず、素の静的HTML+JSで即起動できることを優先）。

### 2.2 依存ライブラリ

- `meshy_client.py` / `jobs.py`: `robo-battle-v5-agent` から**コード変更なしで流用**（ARCHITECTURE.md既定路線）。requests 等の最小限の外部ライブラリのみ（既存実装の依存範囲を踏襲、新規追加なし）。
- `character_registry.py` / `weapon_registry.py` / `passive_registry.py`: 新規実装。SPEC.md §5 のスキーマ制約をそのままバリデーションルールとして実装し、`src/logic/manifestValidation.ts`（クライアント側）と同一のルールセットであることを TEST_DESIGN.md TC-P-001〜003 で担保する。
- Blenderヘッドレス生成（`scripts/gen_weapon.py`）: システムにインストール済みの Blender CLI（`blender --background --python gen_weapon.py`）をサブプロセス実行。追加のPython依存なし。

---

## 3. 外部API要否判定の結論

| フェーズ | API | 判定 | コスト |
|---------|-----|------|--------|
| 実行時（ゲーム本体） | なし | **ゼロ外部通信**。`characters.json`/`weapons.json`/`passives.json`/GLB は同一オリジンの静的ファイル fetch のみ | $0 |
| 開発時（アセット生成） | Meshy API（text-to-3d, rigging） | ユーザー明示要求済み・承認済み | 約$7.2〜13.5（MVP必須分、CRITICAL_PATH.md §3.1 試算。武器はBlenderヘッドレス優先で$0） |
| 開発時（アセット生成・武器） | Blenderヘッドレス（`gen_weapon.py`） | デフォルト経路、ローカル実行 | $0 |
| Phase 5（完成処理） | GCP Text-to-Speech | 既存認証（`~/.config/ai-agents/credentials/gcp/default.json`）、無料枠内 | $0 |

**合計開発コスト試算: 約$7.2〜13.5**（実行時ランニングコストは恒久的に$0）。

---

## 4. まとめ（技術決定サマリ）

| 項目 | 決定 |
|------|------|
| 言語 | TypeScript（strict） |
| ゲームエンジン | three.js `^0.182.0`（npm + Vite バンドル、CDN不使用） |
| GLB読込 | GLTFLoader + DRACOLoader（デコーダ自己ホスト） |
| HUD/UI | 軽量 vanilla TS + DOM/CSS（React不採用、モバイル性能優先） |
| 状態管理 | 外部ライブラリ不使用、`GameState` 単一オブジェクト + `src/logic` 純粋関数 |
| セーブ | LocalStorage（data_models.md §3準拠） |
| ビルド | Vite 7.x、`base: './'`、`dist/`→`project/public/`コピー |
| スタジオサーバー | Python標準ライブラリ（`http.server`）、ポート `3050` |
| テスト | Vitest+coverage-v8 / Playwright / Python unittest+coverage.py |
| 外部API | 実行時ゼロ／開発時Meshy(承認済・$7.2〜13.5)／Phase5 GCP TTS(既存認証・$0) |
