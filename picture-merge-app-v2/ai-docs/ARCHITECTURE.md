# Architecture & Tech Stack

> Auto-generated: 2026-03-14

# ARCHITECTURE.md - Picture Merge App v2 システムアーキテクチャ

## 1. システム構成図

```
┌──────────────────────────────────────────────────────────────────┐
│                        ブラウザ (Chrome/Edge)                      │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │              React 18 + TypeScript (Vite :5173)              │ │
│  │                                                              │ │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────────┐  │ │
│  │  │ ImageInput   │  │ MergeCanvas  │  │ SettingsPanel     │  │ │
│  │  │ (D&D/選択)  │  │ (プレビュー) │  │ (パラメータ調整)  │  │ │
│  │  └──────┬──────┘  └──────┬───────┘  └────────┬──────────┘  │ │
│  │         │                │                    │              │ │
│  │  ┌──────▼────────────────▼────────────────────▼──────────┐  │ │
│  │  │                  API Client (fetch)                    │  │ │
│  │  │  POST /api/segment  │  POST /api/merge  │ GET /health │  │ │
│  │  └──────────────────────┼──────────────────────────────────┘  │ │
│  └─────────────────────────┼────────────────────────────────────┘ │
│                            │ HTTP (localhost)                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                  FastAPI Server (uvicorn :8000)                    │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │  CORS Middleware (./ のみ許可)                    │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────────┐  │
│  │ POST           │  │ POST           │  │ GET               │  │
│  │ /api/segment   │  │ /api/merge     │  │ /api/health       │  │
│  │                │  │                │  │                   │  │
│  │ ┌────────────┐ │  │ ┌────────────┐ │  │ rembg状態確認     │  │
│  │ │ 画像デコード │ │  │ │ パラメータ  │ │  └───────────────────┘  │
│  │ │ + リサイズ  │ │  │ │ バリデーション│ │                        │
│  │ └─────┬──────┘ │  │ └─────┬──────┘ │                        │
│  │       ▼        │  │       ▼        │                        │
│  │ ┌────────────┐ │  │ ┌────────────┐ │  ┌───────────────────┐  │
│  │ │ rembg      │ │  │ │ 合成       │ │  │ Segmentation      │  │
│  │ │ (U2Net)    │ │  │ │ Pipeline   │ │  │ Store (LRU 10件)  │  │
│  │ └─────┬──────┘ │  │ └─────┬──────┘ │  │                   │  │
│  │       ▼        │  │       ▼        │  │ seg_id → RGBA画像 │  │
│  │ ┌────────────┐ │  │ ┌────────────┐ │  │ + BBox + foot_y   │  │
│  │ │ BBox算出   │ │  │ │ base64     │ │  └───────────────────┘  │
│  │ │ + 足元検出 │ │  │ │ エンコード │ │                        │
│  │ └─────┬──────┘ │  │ └────────────┘ │                        │
│  │       ▼        │  │                │                        │
│  │ LRUキャッシュ保存│  │                │                        │
│  └────────────────┘  └────────────────┘                        │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. データフロー

### 2.1 全体フロー（写真入力 → セグメンテーション → 合成 → ダウンロード）

```
[ユーザー: 写真1をD&D]
    │
    ▼
[フロントエンド: ファイルバリデーション（形式・サイズ）]
    │ multipart/form-data
    ▼
[POST /api/segment] → [rembg U2Net] → [透過PNG + BBox + foot_y]
    │                                        │
    │                                  [LRUキャッシュ保存: seg_id1]
    ▼
[フロントエンド: セグメンテーション結果表示（サムネイル）]

[ユーザー: 写真2をD&D]  ← 写真1と同様の処理
    │
    ▼
[POST /api/segment] → [seg_id2]

[2枚のセグメンテーション完了]
    │ 自動でプレビューリクエスト
    ▼
[POST /api/merge (preview_mode=true)]
    │  image1_id=seg_id1, image2_id=seg_id2
    ▼
[合成パイプライン: クロップ → 色調補正 → スケール → 影 → 合成]
    │  512x512 JPEG 返却
    ▼
[Canvas: プレビュー画像描画]

[ユーザー: パラメータ調整 / ドラッグ操作]
    │  デバウンス 300ms
    ▼
[POST /api/merge (preview_mode=true)] ← プレビュー更新ループ
    │
    ▼
[Canvas: プレビュー再描画]

[ユーザー: ダウンロードボタン押下]
    │
    ▼
[POST /api/merge (preview_mode=false)]
    │  フル解像度 PNG 返却
    ▼
[ブラウザ: ファイルダウンロード (merged_{timestamp}.png)]
```

### 2.2 合成パイプライン詳細

```
入力: SegmentedOutput × 2 + MergeSettings + preview_mode
    │
    ▼
[Step 1: クロップ]
    BBoxで不要な透明領域を除去
    → CroppedPerson × 2
    │
    ▼
[Step 2: 色調補正] (color_correction=true の場合)
    LAB色空間ヒストグラムマッチング
    person1基準 → person2を補正
    → ColorCorrectedPerson × 2
    │
    ▼
[Step 3: スケール計算]
    自動: BBox高さ比率 → 0.8-1.2倍クランプ
    手動: settings.personN.scale 優先
    → ScaledPerson × 2 (画像リサイズ済み)
    │
    ▼
[Step 4: 位置計算]
    X = personN.x × canvas_width (人物中心)
    Y = canvas_height × 0.8 - 足元位置 + y_offset
    → ScaledPerson × 2 (座標決定済み)
    │
    ▼
[Step 5: 影生成] (shadow.enabled=true の場合)
    足元にガウシアンブラー楕円
    幅: person_width × 0.8, 高さ: person_width × 0.15
    不透明度: intensity × 0.6
    → ShadowLayer
    │
    ▼
[Step 6: 最終合成]
    背景キャンバス (background_color) 生成
    + 影レイヤー合成
    + person1 アルファブレンディング
    + person2 アルファブレンディング
    │
    ▼
[Step 7: 出力]
    preview_mode=true:  512x512 リサイズ → JPEG (quality=70)
    preview_mode=false: 指定サイズ → PNG
    → base64エンコード → JSONレスポンス
```

---

## 3. ディレクトリ構成

```
picture-merge-app-v2/
├── frontend/                          # フロントエンド (React + TypeScript)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── main.tsx                   # エントリーポイント
│   │   ├── App.tsx                    # ルートコンポーネント
│   │   ├── components/                # UIコンポーネント
│   │   │   ├── ImageInput/
│   │   │   │   ├── ImageInput.tsx     # ドロップゾーンコンポーネント
│   │   │   │   ├── DropZone.tsx       # 個別ドロップゾーン
│   │   │   │   └── ImageThumbnail.tsx # サムネイル表示
│   │   │   ├── MergeCanvas/
│   │   │   │   ├── MergeCanvas.tsx    # Canvas合成プレビュー
│   │   │   │   └── useDragHandler.ts  # ドラッグ操作フック
│   │   │   ├── SettingsPanel/
│   │   │   │   ├── SettingsPanel.tsx  # 設定パネル全体
│   │   │   │   ├── ColorPicker.tsx    # 背景色ピッカー
│   │   │   │   ├── SizePreset.tsx     # 出力サイズプリセット
│   │   │   │   ├── ScaleSlider.tsx    # スケールスライダー
│   │   │   │   └── ShadowControls.tsx # 影設定
│   │   │   ├── ActionBar/
│   │   │   │   └── ActionBar.tsx      # 合成実行・DL・リセットボタン
│   │   │   ├── StatusIndicator/
│   │   │   │   ├── StatusIndicator.tsx# 処理状態表示
│   │   │   │   └── Spinner.tsx        # ローディングスピナー
│   │   │   └── ErrorBoundary/
│   │   │       └── ErrorBoundary.tsx  # エラーバウンダリ
│   │   ├── hooks/                     # カスタムフック
│   │   │   ├── useAppState.ts         # アプリ全体の状態管理
│   │   │   ├── useSegmentation.ts     # セグメンテーションAPI呼び出し
│   │   │   ├── useMerge.ts            # 合成API呼び出し（プレビュー/フル）
│   │   │   ├── useMergeSettings.ts    # 合成設定の状態管理
│   │   │   ├── useHealthCheck.ts      # サーバーヘルスチェック
│   │   │   └── useDebounce.ts         # デバウンスユーティリティ
│   │   ├── api/                       # APIクライアント
│   │   │   ├── client.ts              # fetch ラッパー（エラーハンドリング）
│   │   │   ├── segment.ts             # POST /api/segment
│   │   │   ├── merge.ts               # POST /api/merge
│   │   │   └── health.ts              # GET /api/health
│   │   ├── types/                     # TypeScript型定義
│   │   │   ├── app.ts                 # AppState, AppPhase 等
│   │   │   ├── api.ts                 # API リクエスト/レスポンス型
│   │   │   ├── settings.ts            # MergeSettings, PersonSettings 等
│   │   │   └── canvas.ts              # CanvasState, ドラッグ関連型
│   │   ├── constants/                 # 定数定義
│   │   │   ├── defaults.ts            # デフォルト設定値
│   │   │   ├── presets.ts             # 出力サイズプリセット
│   │   │   └── validation.ts          # バリデーション定数
│   │   └── utils/                     # ユーティリティ関数
│   │       ├── fileValidation.ts      # ファイル形式・サイズ検証
│   │       ├── imageUtils.ts          # base64変換、サイズ計算
│   │       └── downloadUtils.ts       # ファイルダウンロードヘルパー
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vitest.config.ts
│
├── backend/                           # バックエンド (Python FastAPI)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPIアプリケーション（エントリーポイント）
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── segment.py             # POST /api/segment ルーター
│   │   │   ├── merge.py               # POST /api/merge ルーター
│   │   │   └── health.py              # GET /api/health ルーター
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── segment.py             # SegmentResponse, BBoxModel 等
│   │   │   ├── merge.py               # MergeRequest, MergeResponse 等
│   │   │   ├── health.py              # HealthResponse
│   │   │   └── errors.py              # ErrorResponse, エラーコード定義
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── segmentation.py        # rembgセグメンテーションサービス
│   │   │   ├── merge_pipeline.py      # 合成パイプライン（メインオーケストレーター）
│   │   │   ├── color_correction.py    # LABヒストグラムマッチング
│   │   │   ├── shadow_generator.py    # ガウシアンブラー楕円影生成
│   │   │   ├── auto_scale.py          # 自動スケール計算
│   │   │   └── image_utils.py         # 画像変換ユーティリティ
│   │   ├── store/
│   │   │   ├── __init__.py
│   │   │   └── segmentation_store.py  # LRUインメモリキャッシュ
│   │   └── middleware/
│   │       ├── __init__.py
│   │       └── file_validation.py     # ファイルサイズ・形式検証
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py                # pytest fixtures（テスト用画像等）
│   │   ├── test_segment.py            # セグメンテーションAPIテスト
│   │   ├── test_merge.py              # 合成APIテスト
│   │   ├── test_health.py             # ヘルスチェックテスト
│   │   ├── test_color_correction.py   # 色調補正ユニットテスト
│   │   ├── test_shadow_generator.py   # 影生成ユニットテスト
│   │   ├── test_auto_scale.py         # 自動スケールユニットテスト
│   │   ├── test_segmentation_store.py # LRUキャッシュテスト
│   │   └── fixtures/
│   │       ├── test_person1.png       # テスト用画像
│   │       └── test_person2.png
│   ├── requirements.txt
│   └── pytest.ini
│
├── project/
│   └── public/                        # GitHub Pages 公開用
│       ├── index.html                 # ビルド済みフロントエンド
│       ├── about.html                 # プロジェクト紹介ページ
│       ├── README.md                  # 公開用README
│       ├── explanation.mp3            # 音声解説（オプション）
│       └── assets/                    # 静的ファイル
│
├── CLAUDE.md                          # ワークフローガイド
├── PROJECT_INFO.yaml                  # プロジェクト情報
├── REQUIREMENTS.md                    # 要件定義書
├── SPEC.md                            # 詳細仕様書
├── TECH_STACK.md                      # 技術スタック決定書
├── API_DESIGN.md                      # API仕様書
├── ARCHITECTURE.md                    # アーキテクチャ設計書（本書）
├── data_models.md                     # データモデル定義
└── launch_app.command                 # ワンクリック起動スクリプト
```

---

## 4. フロントエンドコンポーネント構成

### 4.1 コンポーネントツリー

```
<App>
├── <ErrorBoundary>
│   ├── <StatusIndicator />           # サーバー接続状態 / 処理状態
│   ├── <main> (2カラムレイアウト)
│   │   ├── <aside> (左カラム: 入力)
│   │   │   ├── <ImageInput>
│   │   │   │   ├── <DropZone slot="person1" />
│   │   │   │   ├── <DropZone slot="person2" />
│   │   │   │   ├── <ImageThumbnail person="1" /> (条件付き)
│   │   │   │   └── <ImageThumbnail person="2" /> (条件付き)
│   │   │   └── </ImageInput>
│   │   └── <section> (右カラム: プレビュー + 設定)
│   │       ├── <MergeCanvas />        # Canvas プレビュー
│   │       └── <SettingsPanel>
│   │           ├── <ColorPicker />
│   │           ├── <SizePreset />
│   │           ├── <ScaleSlider person="1" />
│   │           ├── <ScaleSlider person="2" />
│   │           ├── <ShadowControls />
│   │           └── <Toggle label="色調補正" />
│   │           </SettingsPanel>
│   └── </main>
│   └── <ActionBar>
│       ├── <Button>合成実行</Button>    (PREVIEW状態で有効)
│       ├── <Button>ダウンロード</Button> (PREVIEW/COMPLETE状態で有効)
│       └── <Button>リセット</Button>
│       </ActionBar>
└── </ErrorBoundary>
```

### 4.2 状態管理フロー

```
useAppState (ルートフック)
├── phase: AppPhase            # IDLE → ONE_UPLOADED → SEGMENTING → PREVIEW → ...
├── error: AppError | null
│
├── useHealthCheck
│   └── serverStatus           # connected, rembgLoaded, version
│
├── useSegmentation
│   ├── person1, person2       # SegmentationResult | null
│   ├── isProcessing
│   └── segment(file)          # POST /api/segment 呼び出し
│
├── useMergeSettings
│   ├── settings               # MergeSettings (背景色、スケール、影等)
│   ├── updateSettings()       # 設定更新（デバウンス付きプレビュー再取得）
│   └── resetSettings()        # デフォルトに戻す
│
├── useMerge
│   ├── previewImage           # プレビュー画像 (base64)
│   ├── isLoading
│   ├── fetchPreview()         # POST /api/merge (preview_mode=true)
│   └── fetchFullResolution()  # POST /api/merge (preview_mode=false)
│
└── useDebounce
    └── debouncedValue         # 設定変更のデバウンス (300ms)
```

### 4.3 コンポーネント責務

| コンポーネント | 責務 | Props |
|---------------|------|-------|
| App | 全体レイアウト、状態管理の統合 | — |
| ImageInput | 2枚の画像入力管理 | onImage1, onImage2 |
| DropZone | 個別のD&Dゾーン | onDrop, accept, maxSize |
| ImageThumbnail | 入力/切り抜き画像のサムネイル表示 | src, alt, isSegmented |
| MergeCanvas | Canvas上に合成プレビュー描画 + ドラッグ操作 | previewImage, onDragEnd |
| SettingsPanel | 合成パラメータ調整UI | settings, onChange |
| ColorPicker | 背景色選択 | color, onChange |
| SizePreset | 出力サイズプリセット選択 | preset, onSelect |
| ScaleSlider | 人物スケールスライダー | value, onChange, person |
| ShadowControls | 影ON/OFF + 強度スライダー | shadow, onChange |
| ActionBar | 実行・DL・リセットボタン群 | phase, onMerge, onDownload, onReset |
| StatusIndicator | 処理状態表示（スピナー/テキスト） | phase, serverStatus |
| ErrorBoundary | 予期しないエラーのキャッチ | children |

---

## 5. バックエンドモジュール構成

### 5.1 モジュール依存関係

```
main.py (FastAPIアプリ)
├── middleware/
│   └── file_validation.py       # リクエストサイズ制限
├── routers/
│   ├── segment.py               # /api/segment
│   │   ├── services/segmentation.py
│   │   └── store/segmentation_store.py
│   ├── merge.py                 # /api/merge
│   │   ├── services/merge_pipeline.py
│   │   │   ├── services/color_correction.py
│   │   │   ├── services/shadow_generator.py
│   │   │   ├── services/auto_scale.py
│   │   │   └── services/image_utils.py
│   │   └── store/segmentation_store.py
│   └── health.py                # /api/health
│       └── services/segmentation.py (rembg状態確認)
└── models/
    ├── segment.py               # Pydantic: SegmentResponse, BBoxModel
    ├── merge.py                 # Pydantic: MergeRequest, MergeResponse
    ├── health.py                # Pydantic: HealthResponse
    └── errors.py                # Pydantic: ErrorResponse
```

### 5.2 サービス層の責務

| サービス | 責務 | 主要メソッド |
|---------|------|------------|
| segmentation.py | rembgによる人物切り抜き | `segment(image: Image) → SegmentedOutput` |
| merge_pipeline.py | 合成パイプライン全体のオーケストレーション | `merge(ctx: MergeContext) → Image` |
| color_correction.py | LAB色空間ヒストグラムマッチング | `match_color(source, reference) → Image` |
| shadow_generator.py | ガウシアンブラー楕円による影生成 | `generate_shadow(canvas, foot_x, foot_y, width, intensity) → ndarray` |
| auto_scale.py | BBox高さ比率による自動スケール算出 | `calculate_auto_scale(person1, person2) → AutoScaleResult` |
| image_utils.py | base64変換、リサイズ、フォーマット変換 | `to_base64(image, format) → str`, `resize(image, size) → Image` |

### 5.3 ストア層

| ストア | 責務 | 仕様 |
|--------|------|------|
| segmentation_store.py | セグメンテーション結果のLRUキャッシュ | 最大10件、OrderedDictベース |

---

## 6. 画像処理パイプライン詳細

### 6.1 セグメンテーションパイプライン

```
入力: UploadFile (multipart/form-data)
    │
    ▼
[1. デコード]
    PIL.Image.open(file.file)
    EXIF回転の自動補正 (ImageOps.exif_transpose)
    │
    ▼
[2. リサイズ判定]
    長辺 > 4000px → アスペクト比維持でリサイズ
    長辺 ≤ 4000px → そのまま
    │
    ▼
[3. rembg実行]
    rembg.remove(image) → RGBA画像
    │
    ▼
[4. アルファ検証]
    alpha_channel = np.array(result)[:,:,3]
    np.max(alpha_channel) == 0 → 人物未検出 → 422エラー
    │
    ▼
[5. アルファマット後処理]
    GaussianBlur(alpha, ksize=(5,5), sigma=1.5)
    エッジの段差を滑らかに
    │
    ▼
[6. BBox算出]
    非透明ピクセル (alpha > 10) の min/max座標
    → (x, y, width, height)
    │
    ▼
[7. 足元Y座標]
    foot_y = bbox.y + bbox.height
    │
    ▼
[8. キャッシュ保存]
    id = f"seg_{uuid4().hex[:8]}"
    SegmentationStore.put(id, result)
    │
    ▼
出力: SegmentResponse (JSON)
```

### 6.2 合成パイプライン

```
入力: MergeRequest (JSON)
    │
    ▼
[1. キャッシュ参照]
    store.get(image1_id) → SegmentedOutput1
    store.get(image2_id) → SegmentedOutput2
    見つからない → 404
    │
    ▼
[2. クロップ]
    image.crop((bbox.x, bbox.y, bbox.x+bbox.width, bbox.y+bbox.height))
    foot_y_relative = foot_y - bbox.y
    │
    ▼
[3. 色調補正] (color_correction=true)
    # person1 を基準に person2 を補正
    src = cv2.cvtColor(person2_rgb, COLOR_RGB2LAB)
    ref = cv2.cvtColor(person1_rgb, COLOR_RGB2LAB)
    for ch in [L, A, B]:
        src_ch = (src_ch - src_mean) * (ref_std / src_std) + ref_mean
        clip(0, 255)
    person2_corrected = cv2.cvtColor(result, COLOR_LAB2RGB)
    │
    ▼
[4. スケール計算]
    # 自動スケール
    height_ratio = person1.height / person2.height
    clamped_ratio = clamp(height_ratio, 0.8, 1.2)
    # 出力キャンバスに対する相対スケール
    target_height = canvas_height * 0.7  # キャンバスの70%を人物に使用
    scale1 = target_height / person1.height * settings.person1.scale
    scale2 = target_height / person2.height * clamped_ratio * settings.person2.scale
    │
    ▼
[5. 位置計算]
    # X位置（人物中心基準）
    p1_center_x = canvas_width * settings.person1.x
    p1_left = p1_center_x - (person1.width * scale1) / 2
    # Y位置（足元揃え）
    foot_line_y = canvas_height * 0.8  # キャンバス下端80%
    p1_top = foot_line_y - (person1.foot_y_relative * scale1) + settings.person1.y_offset
    │
    ▼
[6. 影生成] (shadow.enabled=true)
    shadow_layer = np.zeros((canvas_h, canvas_w, 4), dtype=uint8)
    for person in [p1, p2]:
        cv2.ellipse(shadow_layer,
            center=(person.foot_x, person.foot_y),
            axes=(person.width*0.4, person.width*0.075),
            color=(0,0,0,int(255 * intensity * 0.6)),
            thickness=-1)
    shadow_layer = cv2.GaussianBlur(shadow_layer, (21,21), 10)
    │
    ▼
[7. 合成]
    canvas = Image.new("RGB", (w, h), background_color)
    canvas = alpha_composite(canvas, shadow_layer)
    canvas = alpha_composite(canvas, person1_scaled)
    canvas = alpha_composite(canvas, person2_scaled)
    │
    ▼
[8. 出力]
    if preview_mode:
        canvas = canvas.resize((512, 512), Image.LANCZOS)
        → JPEG quality=70 → base64
    else:
        → PNG → base64
```

---

## 7. 通信プロトコル

### 7.1 REST API（唯一の通信方式）

```
フロントエンド (./) ←── HTTP ──→ バックエンド (./)

セグメンテーション: multipart/form-data → JSON
プレビュー:         JSON → JSON (JPEG base64)
フル合成:           JSON → JSON (PNG base64)
ヘルスチェック:     GET → JSON
```

### 7.2 WebSocket不使用の理由

| 項目 | REST API方式 | WebSocket方式 |
|------|-------------|--------------|
| 複雑さ | 低い | 高い（接続管理、再接続処理） |
| デバッグ | 容易（Swagger UI、curl） | 困難（専用ツール必要） |
| プレビュー更新 | デバウンス300ms + fetch | リアルタイムだが帯域消費大 |
| 遅延 | 300ms(デバウンス) + 200ms(処理) = 500ms | 200ms(処理のみ) |
| 実用性 | 十分（ユーザーの操作速度に対して500msは許容範囲） | 過剰最適化 |

**結論:** 500ms遅延は写真合成の操作感として十分。WebSocketの複雑さを避けてREST APIのみで実装。

---

## 8. 起動構成

### 8.1 開発時

```bash
# ターミナル1: バックエンド
cd backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# ターミナル2: フロントエンド
cd frontend/
npm install
npm run dev   # → http://./
```

### 8.2 launch_app.command（ワンクリック起動）

```bash
#!/bin/bash
# 1. バックエンド起動（バックグラウンド）
cd "$(dirname "$0")/backend"
python3 -m venv venv 2>/dev/null
source venv/bin/activate
pip install -r requirements.txt --quiet
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 2. フロントエンド起動
cd "$(dirname "$0")/frontend"
npm install --silent
npm run dev &
FRONTEND_PID=$!

# 3. ブラウザオープン（3秒待機）
sleep 3
open http://./

# 4. 終了処理
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
```

### 8.3 本番ビルド（GitHub Pages公開用）

```bash
cd frontend/
npm run build
# dist/ の中身を project/public/ にコピー
cp -r dist/* ../project/public/
```

**注意:** バックエンドはローカル実行のため、GitHub Pages公開はフロントエンドの静的ファイルのみ。
デモ用にはサーバーが必要な旨をREADMEに記載。

---

## 9. セキュリティ設計

| 対策 | 実装箇所 | 詳細 |
|------|---------|------|
| CORS制限 | FastAPI Middleware | ./のみ許可 |
| ファイルサイズ制限 | FastAPI Middleware | 20MB上限 |
| ファイル形式検証 | Backend Router | Content-Type + マジックバイト二重検証 |
| 入力バリデーション | Pydantic Models | 全パラメータに型・範囲制約 |
| メモリ管理 | SegmentationStore | LRU 10件上限で無制限メモリ消費を防止 |
| ディスク書き込み禁止 | 設計方針 | 全処理をメモリ上で完結。一時ファイル不使用 |
| エラー情報制限 | ErrorResponse | ユーザー向けメッセージは汎用。detail は開発時のみ参照 |


---

# TECH_STACK.md - Picture Merge App v2 技術スタック決定書

## 1. 技術スタック概要

| レイヤー | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| **フロントエンド** | React | 18.x | UIフレームワーク |
| | TypeScript | 5.x (strict) | 型安全な開発 |
| | Vite | 5.x | ビルドツール・開発サーバー |
| | Tailwind CSS | 3.x | ユーティリティファーストCSS |
| | react-dropzone | 14.x | ドラッグ&ドロップファイル入力 |
| | Canvas API | (ブラウザネイティブ) | プレビュー表示・ドラッグ操作 |
| **バックエンド** | Python | 3.11+ | サーバーランタイム |
| | FastAPI | 0.115+ | REST APIフレームワーク |
| | uvicorn | 0.30+ | ASGIサーバー |
| | rembg | 2.0+ | 人物セグメンテーション (U2Net) |
| | Pillow | 10.x+ | 画像処理基盤 |
| | OpenCV (headless) | 4.9+ | 色調補正・影生成 |
| | python-multipart | 0.0.9+ | ファイルアップロード処理 |
| **テスト** | Vitest | 1.x | フロントエンドユニットテスト |
| | React Testing Library | 14.x | コンポーネントテスト |
| | pytest | 8.x | バックエンドテスト |
| | httpx | 0.27+ | FastAPI非同期テストクライアント |

---

## 2. フロントエンド技術選定

### 2.1 React 18 + TypeScript (strict)

**選定理由:**
- FINDY偏差値60+で高評価されるモダンフロントエンド構成
- React 18のConcurrent Renderingにより、重い画像処理中でもUIがスムーズに動作
- TypeScript strictモードで型安全性を保証し、バグの早期発見を実現
- AIがReactのベストプラクティスを最も多く学習しており、高品質コード生成に有利
- コンポーネント単位の構造がAIへの具体的指示と相性が良い

**バージョン:** React 18.3.x / TypeScript 5.5+

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| Vue 3 | Reactほどの型安全エコシステムがない。FINDY評価でもReact+TSが優位 |
| Svelte 5 | エコシステムがまだ成熟途上。テストツールチェーンが弱い |
| vanilla JS + Canvas | 状態管理が複雑化。UIコンポーネントの再利用性が低い |

### 2.2 Vite 5

**選定理由:**
- ESBuildベースの高速HMR（Hot Module Replacement）で開発体験が良好
- TypeScript・Tailwind CSSとのゼロコンフィグ統合
- ビルド時はRollupで最適化されたバンドル出力
- Create React Appは非推奨、Viteが現在のデファクトスタンダード

**バージョン:** Vite 5.4+

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| webpack | 設定が複雑。ビルド速度が遅い |
| Next.js | SSRが不要なローカルアプリに過剰。FastAPIバックエンドとの二重構成になる |
| Parcel | TypeScript strict + Tailwindの統合でViteに劣る |

### 2.3 Tailwind CSS 3

**選定理由:**
- ユーティリティファーストでスタイリングの一貫性と開発速度を両立
- JIT（Just-in-Time）モードで未使用CSSが自動除去され、バンドルサイズが最小化
- レスポンシブ・ダークモード対応が容易（本アプリはデスクトップ専用だが拡張性を確保）
- MUI等のUIライブラリよりも軽量で、カスタムデザインの自由度が高い

**バージョン:** Tailwind CSS 3.4+

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| MUI (Material UI) | バンドルサイズが大きい。本アプリのUIにはオーバースペック |
| CSS Modules | ユーティリティクラスの再利用性が低い |
| styled-components | ランタイムCSSのオーバーヘッド。型との統合がTailwindに劣る |

### 2.4 react-dropzone 14

**選定理由:**
- React向けファイルドロップの事実上の標準ライブラリ
- アクセシビリティ対応（キーボード操作、スクリーンリーダー）が組み込み
- ファイルタイプ・サイズのバリデーションが宣言的に記述可能
- 軽量（gzip ~7KB）で依存関係が少ない

**バージョン:** 14.x

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| react-dnd | 汎用D&Dライブラリでファイルドロップ特化ではない。設定が複雑 |
| ネイティブHTML D&D API | ブラウザ差異の吸収コードが必要。バリデーション手動実装 |
| FilePond | 高機能だがバンドルサイズが大きい。本アプリの要件にはオーバースペック |

### 2.5 Canvas API（ブラウザネイティブ）

**選定理由:**
- プレビュー画像の描画とドラッグ操作の両方をCanvas上で実現
- 追加ライブラリ不要でバンドルサイズに影響なし
- React RefとuseEffectで制御可能
- バックエンドから受け取った合成画像をそのまま描画するシンプルな構成

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| Konva.js / react-konva | 高機能だが、本アプリでは画像1枚描画+ドラッグのみなので過剰 |
| Fabric.js | テキスト・図形操作向け。写真合成プレビューには不向き |
| img要素 + CSS transform | ドラッグ操作のヒットテストが困難。Canvas APIの方が制御しやすい |

---

## 3. バックエンド技術選定

### 3.1 Python 3.11+

**選定理由:**
- rembg、Pillow、OpenCVなど画像処理ライブラリの最も豊富なエコシステム
- 3.11以降のパフォーマンス改善（CPython高速化 10-25%）
- async/awaitネイティブサポートでFastAPIとの相性が良い
- Mac mini M4でネイティブ動作

**バージョン:** 3.11+（3.12推奨）

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| Node.js | 画像処理ライブラリ（sharp等）はPythonほど充実していない。rembg相当がない |
| Rust | 開発速度が遅い。画像処理エコシステムがPythonに劣る |
| Go | 画像処理ライブラリが少ない。rembg相当のセグメンテーション実装が困難 |

### 3.2 FastAPI 0.115+

**選定理由:**
- Pydanticベースの自動バリデーション・ドキュメント生成（Swagger UI）
- async対応で画像処理の並列実行が可能
- 型ヒント活用による開発者体験の良さ
- `/docs` エンドポイントで自動生成されるAPI仕様書がFINDY評価に寄与
- REST APIのみの構成でシンプル（WebSocket不要の設計判断）

**バージョン:** 0.115+

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| Flask | async非対応。バリデーション・ドキュメント生成が手動 |
| Django REST Framework | ORMベースの重厚な構成。本アプリにはオーバースペック |
| Starlette | FastAPIの基盤だが、Pydantic統合やSwagger UIの自動生成がない |

### 3.3 rembg 2.0+ (U2Net)

**選定理由:**
- `pip install rembg` のみで動作する手軽さ
- U2Netモデルによる高精度な人物セグメンテーション
- アルファマット出力で髪の毛のエッジも自然に処理
- Mac mini M4でCPU推論 1-3秒/枚の実用的な速度
- 初回起動時にモデルを自動ダウンロード・キャッシュ

**バージョン:** 2.0+

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| Apple Vision Framework (pyobjc) | macOS限定。pyobjcの依存関係が複雑。ポートフォリオ公開時の再現性が低い |
| MediaPipe | セグメンテーション精度がU2Netに劣る（特に髪の毛のエッジ） |
| SAM (Segment Anything) | モデルサイズが大きく（>2GB）、推論速度が遅い。本アプリには過剰 |
| backgroundremover | rembgのフォークで更新頻度が低い |

### 3.4 Pillow 10.x+

**選定理由:**
- Python画像処理の事実上の標準ライブラリ
- RGBA画像のアルファブレンディング、リサイズ、フォーマット変換をカバー
- base64エンコード/デコードとの統合が容易
- HEIC対応は pillow-heif プラグインで拡張可能（P1機能）

**バージョン:** 10.4+

### 3.5 OpenCV (opencv-python-headless) 4.9+

**選定理由:**
- `headless` パッケージでGUI依存を排除し、サーバー環境で安定動作
- LAB色空間でのヒストグラムマッチング（色調補正）が標準機能
- ガウシアンブラー・楕円描画による高品質な影生成
- NumPy配列との相互運用でPillowとシームレスに連携

**バージョン:** 4.9+

**代替案と却下理由:**
| 代替案 | 却下理由 |
|--------|---------|
| scikit-image | OpenCVほど高速でない。色調補正の実装が複雑 |
| Pillowのみ | 色調補正（LABヒストグラムマッチング）の実装が困難。影生成の品質が低い |
| ImageMagick (Wand) | Pythonバインディングの品質がOpenCVに劣る。インストールが複雑 |

### 3.6 python-multipart 0.0.9+

**選定理由:**
- FastAPIの`UploadFile`が内部的に依存
- multipart/form-dataのパースに必須
- 軽量で追加の設定不要

### 3.7 uvicorn 0.30+

**選定理由:**
- FastAPI公式推奨のASGIサーバー
- 開発時のホットリロード対応（`--reload`）
- 本番モードでのワーカープロセス管理

---

## 4. テスト技術選定

### 4.1 Vitest 1.x + React Testing Library 14.x

**選定理由:**
- Viteプロジェクトとのゼロコンフィグ統合（vite.config.ts共有）
- Jestと互換のAPI（`describe`, `it`, `expect`）で学習コスト最小
- React Testing Libraryでユーザー視点のコンポーネントテストが記述可能
- HMR対応のウォッチモードで開発中のテスト実行が高速

**カバレッジ目標:**
- コンポーネント: 80%+
- カスタムフック: 90%+
- ユーティリティ関数: 95%+

### 4.2 pytest 8.x + httpx 0.27+

**選定理由:**
- Pythonテストの事実上の標準
- httpxのAsyncClientでFastAPIのTestClientとして使用（公式推奨パターン）
- fixtureベースのテストデータ管理
- pytest-covでカバレッジ計測

**カバレッジ目標:**
- APIエンドポイント: 90%+
- 画像処理パイプライン: 85%+
- エラーハンドリング: 90%+

---

## 5. 開発ツール・インフラ

| ツール | バージョン | 用途 |
|--------|-----------|------|
| Node.js | 18+ (LTS) | フロントエンドランタイム |
| npm | 10+ | パッケージ管理（フロントエンド） |
| pip | 23+ | パッケージ管理（バックエンド） |
| venv | (標準ライブラリ) | Python仮想環境 |
| ESLint | 8.x | コード品質チェック |
| Prettier | 3.x | コードフォーマット |

---

## 6. HEIC対応（P1）

| パッケージ | 用途 | 備考 |
|-----------|------|------|
| pillow-heif | HEIC/HEIFデコード | Pillowプラグイン。`pip install pillow-heif` で追加 |

**判断:** P1機能としてオプション。JPEG/PNG/WebPの3形式はP0で必須対応。
HEIC入力時に pillow-heif が未インストールの場合は、ユーザーフレンドリーなエラーメッセージで変換を案内。

---

## 7. 外部API・クラウドサービス

**不使用**（$0運用）

- 全処理をローカルで完結
- 外部通信なし（rembgモデルの初回ダウンロードのみ例外）
- クラウドデプロイ不要（ローカルサーバー構成）

---

## 8. アーキテクチャ方針

| 方針 | 詳細 |
|------|------|
| フロントエンド/バックエンド分離 | React (Vite) + FastAPI の2プロセス構成 |
| REST APIのみ | WebSocket不使用。プレビューはPOST /api/merge (preview_mode=true) で実現 |
| サーバーサイドキャッシュ | セグメンテーション結果をLRU方式でインメモリ保持（ID参照でmerge時のbase64再送回避） |
| 画像処理はバックエンド集約 | Pillow + OpenCVのフルパワーを活用。フロントはUI操作に専念 |
| プレビュー最適化 | preview_mode=true: 512x512 JPEG (quality=70) で高速返却 |
| フルレンダリング | preview_mode=false: 指定サイズ PNG で高品質出力 |

---

## 9. パッケージ一覧

### 9.1 フロントエンド (package.json)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-dropzone": "^14.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "postcss": "^8.4.0",
    "prettier": "^3.3.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0",
    "vitest": "^1.6.0",
    "jsdom": "^24.0.0"
  }
}
```

### 9.2 バックエンド (requirements.txt)

```
fastapi>=0.115.0
uvicorn[standard]>=0.30.0
rembg>=2.0.0
Pillow>=10.4.0
opencv-python-headless>=4.9.0
python-multipart>=0.0.9
pydantic>=2.7.0

# P1: HEIC対応（オプション）
# pillow-heif>=0.16.0

# テスト
pytest>=8.2.0
httpx>=0.27.0
pytest-asyncio>=0.23.0
pytest-cov>=5.0.0
```
