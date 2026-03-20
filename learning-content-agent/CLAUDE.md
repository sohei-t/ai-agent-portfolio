# 学習コンテンツ自動生成エージェント ワークフローガイドライン

## 🤖 Opus 4.6 / Agent Teams 対応（v2.0）

### Agent Teams の有効化確認
```yaml
agent_teams:
  概要: |
    Agent Teams は Claude Code の実験的機能で、複数のチームメイト（サブエージェント）が
    リアルタイムにメッセージをやり取りしながら協調作業できるシステムです。
    学習コンテンツ生成では、同一チャプター内のトピックを並列作成し、
    用語統一・参照整合性をリアルタイムに確保します。

  有効化確認:
    環境変数: "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1"
    設定場所: "~/.claude/settings.json の env セクション"

  利用可能なツール:
    - "TeamCreate: チームを作成（チーム名を指定）"
    - "Task（team_name + name 指定）: チームメイトを起動"
    - "SendMessage（type: 'message'）: チームメイト間のリアルタイムメッセージング"
    - "SendMessage（type: 'shutdown_request'）: チームメイト終了要求"
    - "TaskCreate / TaskUpdate / TaskList / TaskGet: 共有タスクリストで進捗管理"

  Agent_Teams_実行手順:
    1_チーム作成: "TeamCreate(team_name='chapter1-content') でチームを作成"
    2_チームメイト起動: |
      Task(subagent_type='general-purpose', team_name='chapter1-content',
           name='content-creator-01', prompt=...) でチームメイトを起動
    3_メッセージ送信: |
      SendMessage(type='message', recipient='content-creator-02',
                  content='01-01でBaaSを「Backend as a Service」と説明しました',
                  summary='BaaS terminology confirmed')
    4_シャットダウン: |
      SendMessage(type='shutdown_request', recipient='content-creator-01',
                  content='チャプター1完了。シャットダウンしてください')

  フェーズ別ツール対応表:
    Phase_1_設計リサーチ: "Task ツール（独立した2案生成 + 並列リサーチ）"
    Phase_1_3_リサーチ: "Agent Teams オプション（複数リサーチャーの知見共有）"
    Phase_2_コンテンツ作成: "Agent Teams 推奨（チャプター内バッチ並列化）"
    Phase_3_音声生成: "Task ツール（一括バッチスクリプト実行）"
    Phase_4_品質検証: "Agent Teams オプション（並列品質チェック）"
    Phase_5_改善: "Task ツール"
    Phase_6_完成処理: "Task ツール"

  フォールバック:
    条件: "Agent Teams が不安定、またはトークン消費を抑えたい場合"
    方法: "従来の逐次処理 or Task ツール並列実行"
```

---

## 🎯 プロジェクト概要

このエージェントは、指定されたテーマ・キーワードに基づいて、体系的な学習コンテンツを一気通貫で自動生成します。

### 成果物
1. **HTMLスライド** - グラレコ風のビジュアル解説スライド（各トピックごと）
2. **台本テキスト** - 音声読み上げ用台本（自然言語、SSMLは不要）
3. **音声ファイル（MP3）** - Gemini Flash TTSによる解説音声
4. **目次HTML** - カリキュラム全体の構成を示す目次ページ

---

## 🚨 最優先実行ルール

### 0️⃣ ワークフロー遵守の絶対原則（最重要）
```yaml
workflow_enforcement:
  priority: "最優先（他のすべてのルールより優先）"

  絶対ルール:
    - CLAUDE.mdで定義された手順を変更・省略しない
    - 前後参照マップを必ず作成してから各トピックを作成
    - 体系的なコンテンツの一貫性を保つ
    - frontend-designスキルを必ず使用してスライドを作成
    - 著作権に配慮し、参考資料の表現をそのまま使わずオリジナルな記述にする
    - ファイル命名規則を厳守し、WBS.json の base_name と実ファイル名を完全一致させる

  依存関係の遵守:
    - リサーチ → スライド → 台本 → 音声の順序を守る
    - 前のトピックの内容を参照してから次のトピックを作成
    - 章間の関連性を考慮した順次処理
```

### 0.5️⃣ 著作権配慮ルール（コンテンツ作成時の必須原則）
```yaml
copyright_compliance:
  priority: "最優先（コンテンツ作成の全フェーズで常に意識）"

  基本原則: |
    著作権侵害の大半は「表現の類似性」に起因する。
    参考資料の情報（事実・概念・アイデア）は自由に活用できるが、
    その「表現方法」（文章・図表・構成）をそのまま使用してはならない。
    リサーチで得た知識を咀嚼し、学習者にとってよりわかりやすい
    オリジナルな表現・構成に変換すること。

  具体的なルール:
    文章:
      - 参考資料の文章をそのままコピー・翻訳しない
      - 事実や概念を理解した上で、自分の言葉で説明し直す
      - より学習者にわかりやすい表現・比喩・具体例に変換する
    図表:
      - 参考資料の図表をそのまま再現しない
      - 同じデータや概念を、オリジナルのSVG図解で表現する
      - グラレコ風の独自ビジュアルで再構成する
    構成:
      - 参考資料の章立て・段落構成をそのまま流用しない
      - 学習者の理解しやすさを優先したオリジナルの構成にする
      - 複数の参考資料を統合し、独自の視点で再構成する

  推奨アプローチ:
    - "リサーチで得た知識を一度自分の中で咀嚼してから、オリジナルの説明を作成"
    - "「この概念を初学者に説明するならどう伝えるか」を常に考える"
    - "参考資料の表現ではなく、概念の本質を捉えて独自に表現"
    - "図表は必ずSVGでオリジナル作成（スクリーンショットや模写は禁止）"
    - "複数の情報源を組み合わせて、より包括的でわかりやすい説明を構築"

  適用フェーズ:
    Phase_1_リサーチ: "事実・概念の収集は自由。ただし文章の丸写しは禁止"
    Phase_2_スライド: "図表・レイアウトは必ずオリジナルで作成"
    Phase_2_台本: "説明文は自分の言葉で。参考資料の文体を模倣しない"
    Phase_4_品質検証: "著作権配慮チェックを品質評価項目に含める"
```

### 0.5️⃣ ワークフロー変更時の自動検証（必須）
```yaml
workflow_verification:
  trigger:
    - "CLAUDE.md を修正した場合"
    - "agent_config.yaml を修正した場合"
    - "SUBAGENT_PROMPT_TEMPLATE.md を修正した場合"
    - "Phase構成やサブエージェント定義を変更した場合"
  action: "use the workflow-verifier skill"
  判定基準:
    PASS: "CRITICAL 0件 → 変更を確定"
    FAIL: "CRITICAL 1件以上 → 変更を修正してから再検証"
  reason: "ワークフロー定義の矛盾・破綻を早期検出し、実行時エラーを防止"
```

### 1️⃣ 各タスク実行前に必ずCLAUDE.mdを読み直す
```yaml
task_execution_rule:
  before_each_task:
    - "必ずCLAUDE.mdを読み直す"
    - "現在のフェーズを確認"
    - "前後参照マップを確認"
    - "チェックポイントを確認"
  reason: "体系的なコンテンツの一貫性を保つため"
```

### 2️⃣ frontend-designスキルは必ず明示的に宣言
```yaml
slide_generation:
  必須: "use the frontend design skill"
  対象: ["スライドHTML", "目次HTML"]
  理由: "トピックに合わせた独自性のあるデザインを実現"
```

### 2.5️⃣ slideAPI v1.0 対応（必須）
```yaml
slideAPI_v1_compliance:
  必須: true
  仕様書: "SLIDE_API_SPEC.md"

  概要: |
    スライドコンテンツは「Progressive Enhancement」方式で設計する。
    - 単独でブラウザ表示可能（標準ナビゲーションUI付き）
    - プラットフォームアプリ（AIKENシステム等）に埋め込み時は、
      プラットフォームがslideAPIを検出して統一UIで制御可能

  必須実装:
    ナビゲーション:
      - nav要素に `content-nav` クラス追加
      - ボタンに `content-nav-btn` クラス追加

    CSS:
      - |
        body.platform-controlled .content-nav {
            display: none !important;
        }

    JavaScript:
      - window.slideAPI オブジェクトを公開
      - 必須メソッド: getTotalSlides, getCurrentSlide, showSlide, nextSlide, prevSlide
      - UI制御: setPlatformControlled(enabled)
      - イベント: onSlideChange コールバック

    キーボード（必須対応キー）:
      - ArrowRight / ArrowDown / Space → 次のスライド
      - ArrowLeft / ArrowUp → 前のスライド
      - ⚠️ ArrowUp/ArrowDownは必ず含めること（video platformが上下キーで操作するため）      - platform-controlled時はキーボード操作を無効化

  利点:
    - コンテンツ単独でも完全動作（後方互換性）
    - プラットフォームに埋め込み時は統一UX
    - コンテンツとプラットフォームの責務分離
```

### 3️⃣ ファイル名命名規則（重要 - ゼロパディング必須）
```yaml
filename_convention:
  format: "{章番号:2桁}-{トピック番号:2桁}_{タイトルスラッグ}.{拡張子}"

  例:
    - "01-01_firebase_toha_nanika.html"   # スライド
    - "01-01_firebase_toha_nanika.txt"    # 台本（音声生成の入力）
    - "01-01_firebase_toha_nanika.mp3"    # 音声
    # ⚠️ SSMLファイル（_ssml.txt）は不要：Gemini TTSは自然言語から直接生成

  ルール:
    - 章番号・トピック番号は必ず2桁ゼロパディング（01, 02, ..., 10）
    - 同一トピックの全ファイルは同じベース名を使用
    - 日本語タイトルはローマ字に変換
    - スペース・記号はアンダースコアに置換
    - 小文字に統一

  ⚠️ ゼロパディングが必要な理由:
    - 旧形式（1-1）: 辞書順ソートで 1-1, 1-10, 1-2, 1-3... と誤った順序に
    - 新形式（01-01）: 辞書順ソートで 01-01, 01-02, ..., 01-10 と正しい順序に

  生成ツール:
    python3 src/filename_generator.py "タイトル" --chapter 1 --topic 1 --all
    # または
    python3 src/filename_generator.py "タイトル" --prefix "01-01" --all
```

### 4️⃣ 認証情報の発見ルール
```yaml
credential_discovery:
  gemini_api_key:
    - 環境変数: GEMINI_API_KEY_0 〜 GEMINI_API_KEY_9（10個対応）
    - プロファイル: ~/.config/ai-agents/profiles/default.env
    - 複数キー対応: GeminiKeyManager でラウンドロビン・ローテーション
```

### 5️⃣ 音声生成の制限事項
```yaml
audio_generation_limits:
  # Gemini 2.5 Flash TTS Tier 1 制限
  concurrent_connections: 10          # 同時接続上限
  requests_per_minute: 15             # RPM
  requests_per_day: 1500              # RPD（1キーあたり）

  # 対策
  parallel_limit: 10                  # 同時並列処理を10本に制限
  key_rotation: true                  # 複数APIキーをローテーション
  retry_on_429: true                  # 429エラー時は別キーで再試行

  # キーマネージャー
  manager_script: src/gemini_key_manager.py
  usage: |
    from gemini_key_manager import GeminiKeyManager
    manager = GeminiKeyManager()
    key = manager.get_next_key()
```

---

## 📋 ワークフロー実行チェックリスト

### 開始前チェック
- [ ] CLAUDE.md 確認済み
- [ ] gemini-flash-tts スキルの依存関係確認（pip install google-genai pydub, brew install ffmpeg）
- [ ] GEMINI_API_KEY 設定確認
### Phase 0: 初期化
- [ ] Git初期化
- [ ] CONTENT_INFO.yaml生成
- [ ] Worktree作成（6個）
- [ ] CLAUDE.md再読み込み ← 必須

### Phase 1: 全体設計・リサーチ
- [ ] 1-1: カリキュラム全体構成案の作成（2案並列）
- [ ] 1-2: 自律評価・選択・mainへマージ
- [ ] 1-3: ファイル名マッピング生成（FILENAME_MAPPING.yaml）
- [ ] 1-4: 全トピックのディープリサーチ（並列可能）← 1-3で生成したファイル名を使用
- [ ] 1-5: 前後参照マップ作成（REFERENCE_MAP.yaml）
- [ ] 1-6: WBS作成（依存関係を明示）

### Phase 2: コンテンツ作成（章単位ループ）
- [ ] 各章・各トピックのスライドHTML作成（frontend-designスキル使用）
- [ ] 各章・各トピックの台本作成（間の自然言語指示を含む）

### Phase 3: 音声生成（キーローテーション対応・無音防止）
- [ ] 音声一括生成: `python3 src/audio_batch_generator.py content`
- [ ] 生成レポート確認: `cat reports/audio_generation_report.json`
- [ ] 失敗ファイルがあれば再実行（自動スキップされる）
- [ ] 音量チェック（無音検出）: `bash src/check_audio_volume.sh content`

### Phase 4: 品質検証
- [ ] CSS競合チェック: `bash src/check_slide_css.sh content`（最初に実行！）
- [ ] コードブロック white-space チェック（上記スクリプトに統合済み）
- [ ] ナビゲーション onclick 関数チェック（上記スクリプトに統合済み）
- [ ] 音声品質チェック: `bash src/check_audio_volume.sh content`（無音検出）
- [ ] Playwright E2Eテスト
- [ ] 前後参照の整合性チェック
- [ ] 用語の一貫性チェック

### Phase 5: 改善（最大3回）
- [ ] 評価結果に基づく修正

### Phase 6: 完成処理 + RAG構築
- [ ] 目次HTML生成（frontend-designスキル使用）
- [ ] README.md生成
- [ ] RAGチャンキング + Embedding生成（自動実行）
- [ ] rag_index.json が出力されていることを確認
- [ ] （オプション）RAG精度テスト実行

### Phase 7: 修正フロー
- [ ] 既存コンテンツの更新

---

## 🏗️ Worktree構成

```
worktrees/
├── phase1-design-a/          # カリキュラム設計案A
├── phase1-design-b/          # カリキュラム設計案B
├── phase2-content/           # コンテンツ作成
├── phase3-audio/             # 音声生成
├── phase4-review/            # 品質検証
└── phase5-delivery/          # 完成処理
```

---

## 🔴 記憶保持ルール

**各フェーズ開始時に必ずチェックポイントを確認して出力すること**

```
=================================
📌 チェックポイント: [フェーズ名]
=================================
実行すべきタスク:
✅ [タスク1]
✅ [タスク2]
✅ [タスク3]
現在のコンテキスト:
📚 カリキュラム: [タイトル]
📖 現在の章: 第[N]章
📝 現在のトピック: [トピック名]
=================================
```

---

## 📐 コンテンツファイル命名規則

Progress Tracker 等の外部ツールとの連携のため、以下の命名規則を厳守する。
詳細仕様: `/Users/sohei/Desktop/CONTENT_NAMING_CONVENTION.md`

### 基本フォーマット
```
{エピソード番号}_{タイトルスラッグ}.{拡張子}
```

### ルール一覧
| 項目 | ルール | 例 |
|---|---|---|
| エピソード番号 | `NN-NN`（ゼロパディング必須） | `01-01`, `02-03` |
| 番号セパレータ | ハイフン `-`（統一） | `01-01` ○ / `01_01` × |
| スラッグ区切り | アンダースコア `_` | `firebase_toha_nanika` |
| 番号とスラッグ間 | アンダースコア `_` | `01-01_firebase_toha...` |
| 使用可能文字 | 英数字・アンダースコアのみ | `[a-z0-9_]` |
| スラッグ最大長 | 40文字 | |

### WBS.json の `base_name` 一致ルール
```
WBS.json: "base_name": "01-01_firebase_toha_nanika"
実ファイル: content/01-01_firebase_toha_nanika.html  ← 完全一致必須
```

### レベル別構成（該当する場合のみ）
```
# 方式A: サブフォルダ（推奨）
content/beginner/01-01_xxx.html
content/intermediate/01-01_zzz.html

# 方式B: 接頭語
content/intro-1-1_xxx.html
content/basic-1-1_yyy.html
```

使用可能接頭語: `intro`, `beginner`, `basic`, `intermediate`, `advanced`

### GCP版の追加ルール
- SSML ファイル: `{base_name}_ssml.txt` サフィックスを付与
- 例: `content/01-01_firebase_toha_nanika_ssml.txt`
- WBS.json の `base_name` には `_ssml` を含めない

---

## 🚀 ワークフロー詳細

### Phase 0: 初期化

```bash
# 1. ユーザーからカリキュラムテーマを受け取る
# 2. CONTENT_INFO.yaml を生成
# 3. Worktree を作成
```

**CONTENT_INFO.yaml 生成内容:**
```yaml
curriculum:
  title: "{カリキュラムタイトル}"
  description: "{概要説明}"
  target_audience: "{対象学習者}"
  difficulty_level: "入門/中級/上級"
  estimated_duration: "{想定学習時間}"

creation_date: "{作成日}"
status: "phase0_initialized"
```

---

### Phase 1: 全体設計・リサーチ

#### 1-1. カリキュラム構成案の並列作成

```
📌 Task実行前に必須:
1. CLAUDE.mdを読み直す
2. Phase 1のチェックリストを確認
3. ⚠️ 2つのTaskを1つのメッセージで並列実行

Task 1: Curriculum Design A（体系的・段階的）
- worktree: phase1-design-a/
- subagent_type: "general-purpose"
- prompt: |
    あなたは教育カリキュラム設計の専門家です。
    作業ディレクトリ: ./worktrees/phase1-design-a/

    【テーマ】
    {curriculum_theme}

    【設計方針】
    - 基礎から応用への段階的な構成
    - 各章の学習目標を明確に
    - 前提知識と到達目標を定義

    【成果物】
    - CURRICULUM_STRUCTURE.yaml（章・トピック構成）
    - LEARNING_OBJECTIVES.md（学習目標一覧）

Task 2: Curriculum Design B（実践重視・プロジェクト型）
- worktree: phase1-design-b/
- subagent_type: "general-purpose"
- prompt: |
    あなたは実践重視の教育設計者です。
    作業ディレクトリ: ./worktrees/phase1-design-b/

    【テーマ】
    {curriculum_theme}

    【設計方針】
    - 実践プロジェクトを軸にした構成
    - 手を動かしながら学ぶ形式
    - 即座に使える知識を優先

    【成果物】
    - CURRICULUM_STRUCTURE.yaml（章・トピック構成）
    - LEARNING_OBJECTIVES.md（学習目標一覧）
```

#### 1-2. 自律評価・選択・マージ

```bash
# 2つの設計案を評価し、最適なものを選択
python3 ./src/curriculum_evaluator.py . \
  phase1-design-a phase1-design-b \
  --auto-merge

# 評価基準:
# - 学習効果（段階的な難易度上昇）
# - 網羅性（必要な知識のカバー率）
# - 実用性（学習後に実践できるか）
# - 構成の論理性（前後関係の整合性）
```

#### 1-3. ファイル名マッピング生成（NEW）

```
📌 選択された CURRICULUM_STRUCTURE.yaml から全トピックのファイル名を生成
📌 全ファイル（HTML, txt, mp3, research）で統一した名前を使用
📌 ⚠️ プレフィックスは必ず2桁ゼロパディング（01-01形式）

【生成ツール】
python3 src/filename_generator.py

【処理内容】
1. CURRICULUM_STRUCTURE.yaml を読み込み
2. 各トピックのタイトルをスラッグ化（日本語→ローマ字、小文字化、記号除去）
3. FILENAME_MAPPING.yaml を生成

【生成されるFILENAME_MAPPING.yaml の例】
```yaml
generated_at: "2025-01-15T10:30:00"
description: "トピックIDからファイル名へのマッピング"
mapping:
  topic_01_01:
    title: "Firebaseとは何か"
    base: "01-01_firebase_toha_nanika"
    files:
      html: "content/01-01_firebase_toha_nanika.html"
      script: "content/01-01_firebase_toha_nanika.txt"
      audio: "content/01-01_firebase_toha_nanika.mp3"
      research: "research/01-01_firebase_toha_nanika_research.md"
      # ⚠️ SSMLは不要（Gemini TTSは自然言語から直接音声生成）
  topic_01_02:
    title: "Firebaseの機能"
    base: "01-02_firebase_no_kinou"
    files:
      html: "content/01-02_firebase_no_kinou.html"
      # ...
# ⚠️ 注意: プレフィックスは必ず2桁ゼロパディング（01-01形式）
# 辞書順ソートで正しいコンテンツ順序になるために必須
# ⚠️ title フィールドはVideo Platform表示用（日本語タイトル）
```

【タイトル→スラッグ変換例】
- "Firebaseとは何か" → "firebase_toha_nanika"
- "Introduction to APIs" → "introduction_to_apis"
- "認証とセキュリティ" → "ninsho_to_security"
- "第1章: はじめに" → "1_hajimeni"

【変換ルール】
1. Unicode正規化（NFKC）
2. カタカナ→ひらがな→ローマ字
3. 小文字化
4. 特殊文字をアンダースコアに置換（：、:、/、・、-）
5. ASCII英数字とアンダースコアのみ保持
6. 連続アンダースコアを統一
7. 最大40文字（単語の途中で切らない）

【使用タイミング】
- Phase 1-2 で CURRICULUM_STRUCTURE.yaml が確定した直後
- Phase 2 以降の全タスクで FILENAME_MAPPING.yaml を参照
```

#### 1-4. 全トピックのディープリサーチ（並列可能 + Agent Teams オプション）

```
📌 選択された構成に基づき、各トピックをリサーチ
📌 この段階では並列実行可能（トピック間の依存関係なし）
📌 ⚠️ FILENAME_MAPPING.yaml を参照してファイル名を決定

🆕 Agent Teams オプション:
  複数リサーチャーが Agent Teams で知見を共有しながら調査可能。
  あるトピックの調査で別トピックに関連する情報を発見した場合、直接共有できる。
  例: Teammate A が「認証」調査中に「セキュリティルール」の重要情報を発見
      → Teammate B（セキュリティルール担当）に直接共有

各トピックに対して:
Task: Deep Research for Topic {topic_id}
- subagent_type: "general-purpose"
- prompt: |
    あなたは優秀なリサーチャーです。

    【トピック】
    {topic_title}

    【ファイル名】
    FILENAME_MAPPING.yaml から取得:
    - topic_id: {topic_id}
    - base_name: {file_prefix}_{slug}

    【リサーチ観点】
    - 背景・歴史的経緯
    - 現状・最新動向
    - 重要な統計データや事実
    - 関連する理論・概念
    - 実例・ケーススタディ
    - 将来の展望・トレンド
    - 課題と解決策

    【出力】
    research/{file_prefix}_{slug}_research.md（マークダウン形式）
    例: research/01-01_firebase_toha_nanika_research.md
```

#### 1-5. 前後参照マップ作成（最重要）

```yaml
# REFERENCE_MAP.yaml - 各トピック間の参照関係を定義

curriculum:
  title: "{カリキュラムタイトル}"

chapters:
  - id: chapter_1
    title: "{第1章タイトル}"
    topics:
      - id: topic_1_1
        title: "{トピック1-1タイトル}"
        introduces:  # このトピックで初めて導入する概念
          - "{概念A}"
          - "{概念B}"
        foreshadows:  # 後で詳しく説明すると予告する内容
          - topic: "topic_2_1"
            mention: "{後で説明する内容の予告文}"

      - id: topic_1_2
        title: "{トピック1-2タイトル}"
        references:  # 前のトピックから参照する内容
          - topic: "topic_1_1"
            concept: "{概念A}"
            mention: "前回学んだ{概念A}を踏まえて"
        introduces:
          - "{概念C}"
```

#### 1-6. WBS作成

```
📌 依存関係を明示したWBSを作成
📌 WBS_TEMPLATE.json を参考に辞書形式で作成

成果物: WBS.json（辞書形式・chapters構造）
- phases は辞書形式（"phase_0", "phase_1", "phase_1_5", "phase_2", ...）
- Phase 2 には chapters > topics 構造を含む
  - 各トピック: id, title, base_name, tasks
  - title: 日本語タイトル（Video Platform表示用）
  - base_name: ファイル名ベース（FILENAME_MAPPING.yaml と一致）
- 各タスクの依存関係
- 並列可能なタスクの特定
- クリティカルパスの明示
- FILENAME_MAPPING.yaml のファイル名を使用
```

---

### Phase 1.5: デザインシステム確立（NEW - 統一デザインの基盤）

```
📌 カリキュラム全体で統一されたデザインを確保するための重要フェーズ
📌 ⚠️ このフェーズをスキップすると、各スライドがバラバラなデザインになります

【背景】
frontend-design スキルは「毎回異なるデザインを生成する」設計になっています。
これは単発ページには適していますが、カリキュラムのような連続コンテンツでは
統一感が失われる原因となります。

【解決策】
Phase 2の前にデザインシステムを確立し、全スライドがこれを継承します。

Task: Design System Creator
- subagent_type: "general-purpose"
- prompt: |
    あなたはUIデザインシステムの専門家です。

    ⚠️ use the frontend design skill

    【カリキュラム情報】
    - タイトル: {curriculum_title}
    - テーマ: {curriculum_theme}
    - 対象者: {target_audience}
    - 全{chapter_count}章、{topic_count}トピック

    【タスク】
    このカリキュラム専用のデザインシステムを作成してください。
    全スライドがこのシステムを継承することで、統一感のある学習体験を提供します。

    🚨 重要: design-system/は「参照用マスターファイル」として作成します。
    実際のHTMLファイルでは、これらのスタイルを<style>タグ内にインラインでコピーします。
    （理由: iframeのsrcDoc属性では外部CSSパスが解決できないため）

    【出力ファイル】

    1. design-system/variables.css（参照用マスター）
       - カラーパレット（CSS変数）
         * --color-primary: メインカラー
         * --color-secondary: アクセントカラー
         * --color-background: 背景色
         * --color-text: テキスト色
         * --color-accent: 強調色
         * --color-success/warning/error: 状態色
       - タイポグラフィ
         * --font-heading: 見出しフォント
         * --font-body: 本文フォント
         * --font-code: コードフォント
         * --font-size-*: サイズスケール
       - スペーシング
         * --spacing-*: 余白スケール
       - シャドウ・ボーダー
         * --shadow-*: 影のスタイル
         * --radius-*: 角丸

    2. design-system/base-template.html（参照用テンプレート）
       - 全スライドのベースHTML構造
       - 🚨 CSSはインラインで記述（<style>タグ内）
       - ナビゲーションコンポーネント（次へ/戻る/最初へ）
       - スライド切り替えJavaScript
       - レスポンシブ対応のメタタグ
       - ⚠️ CSS競合防止ルール適用済み

    3. design-system/components.css（参照用マスター）
       - 再利用可能なコンポーネント
         * .slide-title: タイトルスライド
         * .slide-content: コンテンツスライド
         * .slide-summary: まとめスライド
         * .code-block: コードブロック
         * .diagram-container: 図解コンテナ
         * .callout-box: 強調ボックス（info/warning/tip）
         * .step-indicator: 進捗インジケーター

    4. design-system/DESIGN_GUIDE.md
       - デザインシステムの使用方法
       - 各コンポーネントの使用例
       - カラーの意味と使い分け
       - Do's and Don'ts

    【デザイン方針】
    - カリキュラムテーマに適した雰囲気
    - 学習に集中できる落ち着いた配色
    - 視認性の高いコントラスト
    - グラフィックレコーディング風の要素は共通スタイルで定義
    - モバイルファースト・レスポンシブ対応

    【⚠️ CSS競合防止ルール】
    - .slide 以外で display プロパティを直接指定しない
    - flex/grid は .slide.active.XXX で指定
    - base-template.html にこのルールを明記

    【🚨 スクロール・高さの必須ルール（iframe/モバイル対応）】
    以下の3点を守らないと、iframe内やモバイルでスクロールが効かなくなる:

    1. body に overflow: hidden を使わない
       ❌ body { overflow: hidden; height: 100vh; }
       ✅ body { margin: 0; padding: 0; min-height: 100vh; }

    2. .slides-container に overflow: hidden を使わない
       ❌ .slides-container { overflow: hidden; height: 100vh; }
       ✅ .slides-container { position: relative; width: 100%; height: calc(100dvh - var(--nav-height, 64px)); overflow: hidden; }
       ※ 100vh ではなく 100dvh を使うこと（モバイルのアドレスバー問題回避）
       ※ 100dvh 非対応ブラウザ用フォールバック: height: calc(100vh - var(--nav-height, 64px));

    3. .slide に overflow-y: auto と タッチスクロール対応を入れる
       ✅ .slide { overflow-y: auto; -webkit-overflow-scrolling: touch; }

    正しい基本構造:
    ```css
    body { margin: 0; padding: 0; }
    .slides-container {
      position: relative; width: 100%;
      height: calc(100dvh - var(--nav-height, 64px));
      height: calc(100vh - var(--nav-height, 64px)); /* fallback */
      overflow: hidden;
    }
    .slide {
      display: none; position: absolute; inset: 0;
      padding: var(--slide-padding, 40px);
      overflow-y: auto; -webkit-overflow-scrolling: touch;
    }
    .slide.active { display: flex; flex-direction: column; }
    ```

【成果物】
design-system/（参照用マスターファイル群）
├── variables.css      # CSS変数（HTMLの<style>にコピーして使用）
├── components.css     # 再利用コンポーネント（HTMLの<style>にコピーして使用）
├── base-template.html # ベーステンプレート（構造とJSの参考用）
└── DESIGN_GUIDE.md    # 使用ガイド

🚨 注意: 実際のHTMLファイルでは外部CSSを参照せず、
   上記ファイルの内容を<style>タグ内にインラインでコピーすること！
```

---

### Phase 2: コンテンツ作成（チャプター内バッチ並列化 - v2.0）

#### 🆕 Agent Teams によるチャプター内バッチ並列処理（推奨）

```yaml
batch_parallel_processing:
  概要: |
    同一チャプター内のトピックを Agent Teams で並列作成。
    キックオフ → アウトライン作成 → 中間レビュー → 改善提案 → 本作成の
    協調レビュー型ワークフローにより、学習者の理解度を最大化する。
    チャプター間は逐次処理（前チャプターの内容確認後に次へ）。

  処理フロー:
    前提: |
      Phase 1 完了済み:
      - CURRICULUM_STRUCTURE.yaml（カリキュラム構造）
      - REFERENCE_MAP.yaml（前後参照マップ）
      - research/ ディレクトリ（各トピックの調査結果）
      - design-system/（統一デザインシステム）
      - FILENAME_MAPPING.yaml（ファイル名マッピング）

    チャプターごとの協調レビュー型ワークフロー:

      phase_2a_キックオフ（認識合わせ）:
        目的: "チャプターの学習目標と各トピックの役割分担を全員で確認"
        手順:
          1: "全チームメイトが CURRICULUM_STRUCTURE.yaml, REFERENCE_MAP.yaml を読む"
          2: "各自が担当トピックの方針（何を重点的に説明するか）を共有"
          3: "トピック間の繋がり（前後参照）の認識を合わせる"
          4: "リサーチャーに事前調査の依頼があれば伝える"
          5: "Lead が方針を確認し、Go サインを出す"
        例: |
          content-creator-02 → 全員:
          「01-02（Firebaseの機能）を担当します。01-01で導入される
           『BaaS』の概念を前提に、具体的な機能を説明する流れにします。
           01-03（セットアップ）への橋渡しとして、各機能の実用例も入れます。」

      phase_2b_アウトライン作成（骨格先行）:
        目的: "本作成前にスライド構成と台本の骨格を作り、全員で確認"
        手順:
          1: "各チームメイトが担当トピックのアウトラインを作成"
          2: "アウトライン = スライドの見出し構成 + 各スライドの要点（1-2行）"
          3: "完成したら SendMessage で全員に共有"
        成果物: "各トピックのアウトライン（フルコンテンツではない）"

      phase_2c_中間レビュー（相互レビュー + 改善議論）:
        目的: "アウトラインを相互レビューし、学習体験の質を議論"
        観点:
          - "前提知識の順序: このトピックを理解するのに、先に説明すべき概念はないか？"
          - "難易度曲線: 急に難しくなっていないか？"
          - "前後参照の自然さ: 『前回学んだ〜』の繋がりは自然か？"
          - "学習者視点の改善: 初学者がつまずきそうなポイントはないか？"
          - "冗長性: 複数トピックで同じ説明を繰り返していないか？"
        手順:
          1: "各チームメイトが他のアウトラインを確認"
          2: "気づき・改善案を SendMessage で共有し議論"
        例: |
          content-creator-02 → content-creator-01:
          「01-01のアウトラインを見ました。『サーバーレス』の概念を
           ここで説明していますが、01-02で私も触れる予定です。
           01-01では概要だけにして、詳細は01-02に任せてもらえますか？
           そうすれば学習者が2回同じ説明を聞かずに済みます。」

          content-creator-03 → content-creator-02:
          「01-02の『認証機能』の説明ですが、学習者はこの時点で
           HTTPリクエストの基礎を知らない可能性があります。
           01-02の冒頭に30秒でHTTPの基本を説明するか、
           順序を変更すべきでは？」

      phase_2d_改善提案（チームメイト → Lead）:
        目的: "レビューで発見した構造的な問題を Lead に提案"
        提案フォーマット: |
          SendMessage(type="message", recipient="lead（親エージェント）",
            content="【改善提案】
              提案内容: {具体的な変更案}
              理由: {学習者にとってなぜ改善になるか}
              影響範囲: {CURRICULUM_STRUCTURE / REFERENCE_MAP のどこを変更するか}
              優先度: Critical / High / Medium / Low",
            summary="Improvement proposal: {概要}")
        Leadの対応:
          - "WBS の依存関係で他チャプターへの影響を分析"
          - "Critical/High は CURRICULUM_STRUCTURE.yaml / REFERENCE_MAP.yaml を修正"
          - "修正内容を SendMessage(type='broadcast') で全チームメイトに通知"
          - "Medium/Low は Phase 5（改善フェーズ）で対応"

      phase_2e_本作成（合意されたアウトラインに基づく）:
        目的: "レビュー済みのアウトラインに基づいてフルコンテンツを作成"
        手順:
          1: "各チームメイトがスライドHTML + 台本を完全に作成"
          2: "作成中も用語の使い方で迷ったら他チームメイトに確認"
          3: "リサーチャーに追加データが必要な場合は即座に依頼"

      phase_2f_チャプターレビュー:
        目的: "チャプター全体の品質を確認してから次のチャプターへ"
        手順:
          1: "Lead が用語統一チェック"
          2: "前後参照の整合性確認"
          3: "難易度曲線の確認"
          4: "問題があれば該当チームメイトに修正依頼"

    チャプター間の連携:
      - "前チャプターの全コンテンツを次チャプターのチームメイトが読む"
      - "前チャプターで得られた改善提案を次チャプターに反映"
      - "累積的に品質が向上するフィードバックループ"

  バッチサイズ:
    推奨: "3-5 トピック/バッチ"
    上限: "5（実用的な制限）"
    理由: "チームメイト数が多すぎると調整コストが増大"

  このワークフローの価値:
    ウォーターフォール的要素: "Phase 1 の設計（CURRICULUM_STRUCTURE, REFERENCE_MAP）を基盤とした体系性"
    アジャイル的要素: "アウトラインレビューで実作者視点の改善を計画にフィードバック"
    AI固有の強み: "キックオフ〜レビュー〜合意が数十秒で完了、人間なら数時間の会議が不要"
    累積効果: "チャプターを重ねるほど改善提案が蓄積され、後半の品質が向上"

  実行手順（具体的なツール呼び出し）:
    step_1_チーム作成: |
      TeamCreate(team_name="chapter{N}-content")
    step_2_チームメイト起動: |
      # トピック数に応じて 3-5 の Task を1メッセージで同時実行
      Task(
        subagent_type="general-purpose",
        team_name="chapter{N}-content",
        name="content-creator-01",
        prompt="SUBAGENT_PROMPT_TEMPLATE.md のコンテンツ作成チームメイト版を使用"
      )
      Task(
        subagent_type="general-purpose",
        team_name="chapter{N}-content",
        name="content-creator-02",
        prompt="..."
      )
      Task(
        subagent_type="general-purpose",
        team_name="chapter{N}-content",
        name="researcher",
        prompt="SUBAGENT_PROMPT_TEMPLATE.md のディープリサーチャー版を使用"
      )
    step_3_キックオフ: |
      Lead が認識合わせを指示:
      SendMessage(type="broadcast",
                  content="キックオフ: CURRICULUM_STRUCTURE.yaml と REFERENCE_MAP.yaml を読み、
                           担当トピックの方針を共有してください。
                           トピック間の繋がりで気になる点があれば質問してください。",
                  summary="Kickoff: share topic approach")
    step_4_アウトラインレビュー指示: |
      アウトライン完成後、Lead がレビューを指示:
      SendMessage(type="broadcast",
                  content="中間レビュー: 他チームメイトのアウトラインを確認し、
                           前提知識の順序・難易度曲線・冗長性の観点で
                           改善点を共有してください。構造的な問題は Lead に提案を。",
                  summary="Mid-review: cross-review outlines")
    step_5_改善提案処理: |
      提案を受けて Lead が影響分析 → CURRICULUM_STRUCTURE / REFERENCE_MAP 修正 → broadcast
    step_6_本作成完了待ち: |
      各チームメイトのフルコンテンツ作成完了を待つ
    step_7_チャプターレビュー: |
      Lead が用語統一・参照整合性・難易度曲線を確認
    step_8_シャットダウン: |
      SendMessage(type="shutdown_request", recipient="content-creator-01", ...)
      SendMessage(type="shutdown_request", recipient="content-creator-02", ...)
      SendMessage(type="shutdown_request", recipient="researcher", ...)

  フォールバック: "Agent Teams が不安定な場合は従来の逐次処理を使用（下記参照）"
```

#### 従来方式: 逐次処理（フォールバック）

```
📌 最重要: 前後参照マップに基づいて順次処理
📌 各トピックは HTML → 台本 の順で作成（SSMLは不要）
📌 ⚠️ FILENAME_MAPPING.yaml を参照してファイル名を決定
📌 🚨 CSSは必ずインラインで記述（外部CSS参照禁止 - iframeのsrcDoc制約）
📌 ⚠️ Gemini 2.5 Flash TTSは自然言語から適切な間を推測するため、SSMLタグは不要

for each chapter:
  for each topic in chapter:

    # まずFILENAME_MAPPING.yamlからファイル名を取得
    file_info = FILENAME_MAPPING.yaml.mapping[topic_id]
    base_name = file_info.base  # 例: "01-01_firebase_toha_nanika"

    Step 1: スライドHTML作成
    ========================
    ⚠️ use the frontend design skill を必ず宣言

    Task: Slide Generator for {topic_id}
    - subagent_type: "general-purpose"
    - prompt: |
        あなたはスライドデザイナーです。

        ⚠️ use the frontend design skill

        【カリキュラム全体の位置づけ】
        - カリキュラム: {curriculum_title}
        - 現在の章: 第{chapter_num}章 {chapter_title}
        - 現在のトピック: {topic_num} {topic_title}
        - 全体の進捗: {current_position}/{total_topics}

        【ファイル名情報】（FILENAME_MAPPING.yamlより）
        - topic_id: {topic_id}
        - base_name: {base_name}  # 例: 01-01_firebase_toha_nanika
        - 出力先: content/{base_name}.html

        【前トピックのサマリー】
        {previous_topic_summary}

        【このトピックで参照すべき前の内容】
        {references_from_map}

        【このトピックで予告すべき後の内容】
        {foreshadows_from_map}

        【学習目標】
        {learning_objectives}

        【リサーチ結果】
        {research_content}

        【スライド要件】
        1. スライド構成：
           - 適切な枚数（4-20枚）
           - 1枚のスライドには1つの主要メッセージ
           - タイトル → 概要 → 詳細 → まとめの流れ

        2. ナビゲーション設定：
           - 画面下部に固定配置の「次へ」「戻る」「最初へ」ボタン
           - キーボード操作対応（矢印キー）

        3. 🚨 インラインCSS必須（最重要）：
           ⚠️ 外部CSSファイルの参照は禁止！（iframeのsrcDoc制約）

           【理由】
           HTMLコンテンツはiframeのsrcDoc属性で表示されるため、
           外部CSSパス（../design-system/など）が解決できない。

           【❌ 禁止】
           <link rel="stylesheet" href="../design-system/variables.css">

           【✅ 必須】
           - すべてのCSSを<style>タグ内にインライン記述
           - design-system/のCSS変数・スタイルを<style>内にコピー
           - Google Fontsのみ外部参照OK

           【継承方法】
           1. design-system/variables.css → :root { } にコピー
           2. design-system/components.css → 必要なスタイルをコピー
           3. カリキュラム全体で統一されたデザインを維持

        4. コンテンツ表現：
           - トピックに適したSVG図解を作成
           - グラフィックレコーディング風の要素（共通スタイル使用）
           - レスポンシブ対応

        【⚠️ 最重要: CSS display 競合防止】
        スライド切り替えが壊れる原因となるため、以下を厳守:
        - .slide 以外で display プロパティを直接指定しない
        - flex/grid を使いたい場合は .slide.active.XXX で指定

        ❌ 禁止: .title-slide { display: flex; }
        ✅ 正解: .slide.active.title-slide { display: flex; }

        詳細は SUBAGENT_PROMPT_TEMPLATE.md の「CSS競合防止ルール」参照

        【注意事項】
        - 「前回学んだ〜」の言及を適切に入れる
        - 「後で詳しく説明する〜」の伏線を入れる
        - 難易度は段階的に上げる
        - 用語は一貫性を保つ

        【出力】
        content/{base_name}.html
        例: content/01-01_firebase_toha_nanika.html

    Step 2: 台本作成
    ================
    Task: Script Generator for {topic_id}
    - subagent_type: "general-purpose"
    - prompt: |
        あなたはプレゼンテーションコーチです。

        【ファイル名情報】（FILENAME_MAPPING.yamlより）
        - topic_id: {topic_id}
        - base_name: {base_name}
        - 入力: content/{base_name}.html
        - 出力: content/{base_name}.txt

        【スライド内容】
        {slide_content}

        【台本作成要件】
        1. 音声生成AI用の台本として、純粋な話し言葉のみで構成
        2. スライドのページが変わるときには「次のスライドに進んでください」と案内
        3. 最後には「ご清聴、ありがとうございました。」を入れる

        【⚠️ 最重要：台本の長さ要件】
        - 目標音声時間: 5〜10分（300〜600秒）
        - 目標文字数: 2,500〜3,500文字（日本語で約300文字/分）
        - 短い台本は絶対にNG！詳細な説明を心がける
        - ※ 詳細は CONTENT_QUALITY_CRITERIA.yaml の content_volume_requirements を参照

        【禁止事項】
        - スライド番号や見出しの言及
        - 括弧や記号（「」『』（）【】など）
        - 段落番号や箇条書き記号
        - 注釈や説明文
        - 「えー」「あのー」などの不要な間投詞

        【台本スタイル】
        - 自然な話し言葉で
        - 専門用語は分かりやすく説明
        - 具体例を交えながら
        - 概念の背景や「なぜ重要か」を丁寧に説明
        - 実務での活用シーンを具体的に描写
        - 初学者が疑問に思いそうな点を先回りして解説

        【詳細な解説を含めるべき内容】
        1. 概念の定義と基本的な説明
        2. なぜこれが重要なのか（背景・動機）
        3. 具体的な使用例・ユースケース
        4. よくある間違いや注意点
        5. 実務でのベストプラクティス
        6. 関連する概念との比較や関係性

        【前後参照の反映】
        - 前トピックへの言及: {references}
        - 後トピックへの予告: {foreshadows}

        【🎙️ 間（ポーズ）の自然言語指示】
        Gemini 2.5 Flash TTSは文脈から適切な間を推測しますが、
        以下のテクニックで明示的に間を作ることができます：

        1. 話題転換時: 「それでは次に、」「さて、」で始める
        2. 重要ポイント前: 「ここで重要なのは、」と前置き
        3. 考えさせたい時: 「少し考えてみてください。」と明示
        4. スライド切り替え後: 空行を入れる（自然な間が入る）
        5. 強調したい部分: 「特に大切なのは、」「ポイントは、」

        ⚠️ SSMLタグ（[pause:Xs]等）は使用しない
        → Gemini TTSは自然言語から適切な間を自動生成するため不要

        【出力】
        content/{base_name}.txt
        例: content/01-01_firebase_toha_nanika.txt
```

---

### Phase 3: 音声生成（キーローテーション対応・無音防止強化）

```
📌 全台本が完成した後、一括音声生成スクリプトを実行
📌 ✅ audio_batch_generator.py を使用（内部で gemini-flash-tts v2.3 を使用）
📌 ✅ オーバーラップ＋クロスフェード対応（チャンク境界の音質改善）
📌 ⚠️ SSMLファイルは不要（Gemini TTSは自然言語から直接音声生成）

【実行コマンド（必須）】
python3 src/audio_batch_generator.py content

【このスクリプトが行うこと】
1. content/*.txt を検索（台本ファイル）
2. 各ファイルに対して音声生成（Gemini 2.5 Flash TTS）
3. 429エラー発生時 → 自動的に別APIキーに切り替え
4. 1日制限到達時 → キーをexhausted状態にして次キーへ
5. 全キー制限到達時 → 該当トピックをスキップして継続（全停止しない）
6. 結果レポートを reports/audio_generation_report.json に保存

【入力】
content/*.txt（台本ファイル）
例: content/01-01_firebase_toha_nanika.txt
⚠️ SSMLタグは不要。Gemini TTSは自然言語から適切な間・イントネーションを自動生成

【出力】
content/{base_name}.mp3
例: content/01-01_firebase_toha_nanika.mp3

【音声設定】
- ボイス: Kore（日本語対応、落ち着いた声）
- フォーマット: MP3

【⚠️ API制限への対応（自動処理）】
- 同時並列処理: 最大10本まで
- RPM制限: 15リクエスト/分（自動待機）
- 429エラー: 別キーで自動リトライ（最大3回）
- 1日制限: 次のAPIキーに自動切り替え
- 全キー制限: スキップして次トピックへ（ワークフロー継続）

【🔊 無音防止対策（重要！）】
長時間の台本は複数チャンクに分割してAPI処理されます。
APIクォータ超過時に空データで続行すると、途中から無音になる問題が発生します。

⚠️ 防止策（gemini_key_manager.py に実装済み）:
1. チャンク処理中に429エラー発生 → 即座に処理中断（空データで続行しない）
2. 各チャンクの音量を検証（-50dBFS未満は無音として拒否）
3. 結合後に全体の音量を検証
4. ChunkProcessingError 例外で詳細なエラー情報を記録

エラー発生時の挙動:
❌ 旧: チャンク3/5で429エラー → チャンク3-5が空データ → 途中から無音のMP3
✅ 新: チャンク3/5で429エラー → 即座に中断 → 該当トピックを失敗としてマーク → 次トピックへ

【音量検証の閾値】
- チャンク最低音量: -50 dBFS
- これより小さい場合は無音として処理を中断

【APIキー設定場所】
~/.config/ai-agents/profiles/default.env
  GEMINI_API_KEY_0=xxx
  GEMINI_API_KEY_1=xxx
  GEMINI_API_KEY_2=xxx
  ...
  GEMINI_API_KEY_9=xxx

【キー状態確認コマンド】
python3 src/gemini_key_manager.py

【エラー時の挙動】
❌ 旧: api_quota_exceeded → ワークフロー全停止
❌ 旧: チャンク処理中の429 → 空データで続行（無音の原因）
✅ 新: api_quota_exceeded → キーローテーション → 全キー制限時はスキップして継続
✅ 新: チャンク処理中の429 → 即座に中断 → 失敗としてマーク → 次トピックへ

【生成結果の確認】
cat reports/audio_generation_report.json

【Phase 3 完了後の必須確認（v2.0 セグメント検査対応）】
bash src/check_audio_volume.sh content

このスクリプトは（v2.0）:
- チェック1: 10秒ごとに全体をスキャンし、-50dBFS未満の無音セグメントを検出
- チェック2: 前半60秒と後半60秒の音量比較（120秒以上のファイル）
- 20dB以上の差がある場合は警告（途中から無音の可能性）
- 問題があれば該当ファイルを削除して再生成（自動リトライで無音を回避）

⚠️ v2.0 の改善点:
- 旧方式: 前半/後半の平均音量のみ → 局所的な無音（20秒程度）を見逃していた
- 新方式: 10秒ごとにスキャン → 局所的な無音も確実に検出
```

---

### Phase 4: 品質検証（Agent Teams オプション対応）

#### 🆕 Agent Teams による並列品質チェック（オプション）

```yaml
agent_teams_phase4:
  概要: |
    Agent Teams で品質チェック担当者を並列化。
    各担当が独立して検証し、問題を発見した場合は即座に共有。

  チーム構成:
    lead: "品質管理リード（問題集約・修正判断）"
    teammates:
      - name: "CSS Checker"
        task: "CSS display 競合チェック（src/check_slide_css.sh）"
      - name: "Audio Quality Checker"
        task: "音声品質チェック（src/check_audio_volume.sh）無音検出"
      - name: "Reference Consistency Checker"
        task: "前後参照の整合性チェック + 用語の一貫性チェック"

  連携例:
    - "CSS Checker → Lead: 3ファイルでCSS競合を検出。修正が必要です"
    - "Audio Checker → Lead: topic_03-02 の後半が無音。再生成が必要です"
    - "Reference Checker → Lead: topic_02-01 で未回収の伏線があります"

  フォールバック: "従来の逐次品質チェック（下記参照）"
```

#### Step 0: ファイル命名規則検証（Phase 4 最初に実行）

```bash
# WBS.json の base_name と実ファイルの一致チェック
python3 -c "
import json
from pathlib import Path

with open('WBS.json') as f:
    wbs = json.load(f)

content = Path('content')
missing = []
misnamed = []

for phase_key, phase in wbs.get('phases', {}).items():
    for ch_key, ch in phase.get('chapters', {}).items():
        for topic in ch.get('topics', []):
            bn = topic.get('base_name', '')
            if not bn:
                continue
            # base_name とファイルの一致チェック
            if not (content / f'{bn}.html').exists():
                missing.append(bn)
            # ゼロパディングチェック（NN-NN 形式）
            import re
            m = re.match(r'^(\d+)-(\d+)_', bn)
            if m and (len(m.group(1)) < 2 or len(m.group(2)) < 2):
                misnamed.append(f'{bn} (ゼロパディング不足)')

if missing:
    print(f'❌ FAIL: {len(missing)} files missing')
    for m in missing[:10]:
        print(f'  - {m}')
elif misnamed:
    print(f'⚠️ WARNING: {len(misnamed)} files with naming issues')
    for m in misnamed[:10]:
        print(f'  - {m}')
else:
    print('✅ PASS: All base_names match and follow naming convention')
"
```

⚠️ このチェックが FAIL の場合、Phase 2 に戻ってファイル名を修正すること。

#### 従来方式: 逐次品質チェック

```
📌 Playwrightによる自動検証 + CSS競合チェック + 音声品質チェック

【Step 1: CSS display 競合チェック（最初に実行）】
bash src/check_slide_css.sh

このチェックが失敗した場合、スライド切り替えが壊れている可能性が高い。
先にCSSを修正してからPlaywrightテストを実行すること。

【Step 2: 音声品質チェック（無音検出 v2.0 セグメント検査対応）】
bash src/check_audio_volume.sh content

このチェックは（v2.0）:
- チェック1: 10秒ごとに全体をスキャンし、-50dBFS未満の無音セグメントを検出
- チェック2: 前半60秒と後半60秒の平均音量を比較（120秒以上のファイル）
- 20dB以上の差がある場合は「途中から無音」の可能性を警告
- 問題があれば該当MP3ファイルを削除してPhase 3を再実行

⚠️ v2.0 の改善点:
- 旧方式: 前半/後半の平均音量のみ → 局所的な無音（20秒程度）を見逃していた
- 新方式: 10秒ごとにスキャン → 局所的な無音も確実に検出

⚠️ 警告が出た場合の対処:
1. 該当するMP3ファイルを削除
2. Phase 3 の音声生成を再実行: python3 src/audio_batch_generator.py content
3. 再度このチェックを実行
4. 問題ゼロになるまで繰り返し

原因: Gemini TTS APIが非決定的に無音データを返すことがある

【Step 3: Playwright検証】
Task: Quality Verification
- subagent_type: "general-purpose"
- prompt: |
    Playwrightを使用して以下を検証:

    【検証項目】
    1. スライド表示・遷移確認
       - 全スライドが正しく表示されるか
       - ナビゲーションボタンが機能するか
       - キーボード操作が機能するか
       - ⚠️ スライド切り替え時に前のスライドが残っていないか（CSS競合の兆候）

    2. レスポンシブ確認
       - PC表示（1920x1080）
       - タブレット表示（768x1024）
       - スマホ表示（375x667）

    3. 前後参照の整合性
       - 「前回学んだ〜」の言及が正しいか
       - 「後で説明する〜」の伏線が回収されているか

    4. 用語の一貫性
       - 同じ概念に異なる用語が使われていないか

    5. CSS競合チェック
       - .title-slide 等で直接 display: flex/grid が指定されていないか
       - src/check_slide_css.sh の結果を確認

    6. 音声品質チェック（新規追加）
       - 各MP3ファイルが途中で無音になっていないか
       - src/check_audio_volume.sh content の結果を確認
       - 前半と後半の音量差が20dB以内であること

    【出力】
    QUALITY_REPORT.md
```

---

### Phase 5: 改善（最大3回）

```
📌 品質検証結果に基づいて修正

改善ループ:
1. QUALITY_REPORT.md を確認
2. 問題点を特定
3. 該当トピックを修正
4. 再検証

収束条件:
- 全検証項目がPASS
- または改善3回完了
```

---

### Phase 6: 完成処理 + RAG構築

```
📌 目次HTML・README.md生成 + RAGチャンキング・Embedding生成
📌 コンテンツ最終確定後にRAGを構築（GitHub直前）

=== Step 1: 目次・README ===

Task 1: 目次HTML生成
- subagent_type: "general-purpose"
- prompt: |
    ⚠️ use the frontend design skill

    カリキュラム全体の目次HTMLを生成してください。

    【参考】
    サンプルコンテンツ/コンテンツ/00.html

    【要件】
    - 全章・全トピックへのリンク
    - 学習時間の目安
    - 難易度表示
    - レスポンシブデザイン

    【出力】
    content/index.html

Task 2: README.md生成
- subagent_type: "general-purpose"
- prompt: |
    カリキュラムのREADME.mdを生成してください。

    【内容】
    - カリキュラム概要
    - 対象学習者
    - 学習目標
    - 章構成
    - 使用方法
    - ライセンス

    【出力】
    README.md

=== Step 2: RAG構築（自動実行） ===

📌 content_orchestrator.py の Phase 6 で自動実行されます
📌 手動実行: python3 src/rag_index_builder.py [講座ディレクトリ]

【処理内容】
1. content/*.txt（台本ファイル）をチャンク分割
2. rag_chunks.json 出力（500-800文字/チャンク）
3. rag_test_questions.json 出力（自動生成テスト質問）
4. Gemini Embedding API でベクトル化
5. rag_index.json 出力（Embedding付き完成品）

【トラッカーとの連携】
- rag_index.json があれば、トラッカーの「公開」ボタンで自動的にFirestoreへアップロード
- トラッカー側での「RAG構築」ボタンは不要（ワークフローで完結）

【コスト】
- チャンキング: 無料（ローカル処理）
- Embedding生成: Gemini Embedding API 無料枠で十分（200チャンク程度は問題なし）

【Embedding生成の前提】
- ~/.config/ai-agents/profiles/default.env に GEMINI_API_KEY_* が設定されていること
- APIキーが未設定の場合、Embeddingはスキップされ rag_chunks.json のみ出力

【成果物】
- rag_chunks.json（チャンク化されたコンテンツ）
- rag_test_questions.json（テスト質問）
- rag_index.json（Embedding付きインデックス ← トラッカーがFirestoreへアップロード）

【後続処理（オプション - 手動実行）】
python3 src/rag_accuracy_test.py [講座ディレクトリ]
```

---

### Phase 7: 修正フロー

```
📌 既存コンテンツの修正・更新

トリガー: ユーザーから修正依頼

修正タイプ:
- 内容修正: 該当トピックのリサーチ → HTML → 台本 → 音声を再生成
- 構成変更: Phase 1から再実行
- デザイン修正: 該当HTMLのみ再生成

フロー:
1. 修正依頼の受付
2. 影響範囲の特定
3. 該当フェーズの再実行
4. 品質検証
```

---

## 📝 サブエージェントへの標準プロンプト

各Taskツール実行時、必ず以下の内容を含める：

```
あなたは{エージェント名}です。

【作業環境】
- 作業ディレクトリ: 各フェーズに応じたworktree
- カリキュラム: {curriculum_title}
- 現在の章: 第{chapter_num}章

【品質基準】
- 前後参照の整合性を維持
- 用語の一貫性を維持
- 難易度の段階的上昇
- エラーフリーで動作すること

【タスク】
{具体的なタスク内容}

【完了条件】
- 成果物が生成されていること
- 前後参照が正しく反映されていること

【完了報告フォーマット】
✅ 生成ファイル: {パスのリスト}
✅ 前後参照: {反映した参照のリスト}
✅ 次フェーズへの引き継ぎ事項: {具体的内容}
```

---

## 🛡️ エラーハンドリング

```yaml
error_recovery:
  level_1_retry:
    - API タイムアウト → 3回自動リトライ
    - 一時的なエラー → exponential backoff

  level_2_fallback:
    - gemini-flash-tts失敗 → エラーログ記録、後で再試行
    - スライド生成失敗 → シンプルテンプレートで代替

  level_3_skip:
    - 音声生成全面失敗 → HTMLと台本のみで公開（音声なし）
```

---

## ✅ 実行前チェックリスト

- [ ] CLAUDE.md を読んだ
- [ ] gemini-flash-tts の依存関係をインストール済み
- [ ] GEMINI_API_KEY を設定済み
- [ ] サンプルコンテンツの構造を理解した

---

## 💡 トラブルシューティング

### 音声生成が失敗する場合
```bash
# 依存関係の確認
pip install google-genai pydub
brew install ffmpeg

# APIキーの確認
echo $GEMINI_API_KEY

# キーマネージャーの状態確認
python3 src/gemini_key_manager.py
```

### 429エラー（レート制限）が発生する場合
```bash
# 複数のAPIキーを設定（最大10個対応）
# ~/.config/ai-agents/profiles/default.env に追加:
GEMINI_API_KEY_0=your-first-key
GEMINI_API_KEY_1=your-second-key
GEMINI_API_KEY_2=your-third-key
...
GEMINI_API_KEY_9=your-tenth-key

# AI Studioで追加のAPIキーを作成:
# https://aistudio.google.com/app/apikey

# キーマネージャーがラウンドロビンでローテーション
# 制限到達時は自動で次のキーに切り替え
```

### 1日の制限に達した場合
- 複数のAPIキーを用意（各キーで1日1500リクエスト）
- 翌日にキーがリセットされるまで待機
- または別のGoogleアカウントでAPIキーを作成

### MP3ファイルが途中から無音になる場合
```bash
# 1. 音量チェックで問題ファイルを特定（v2.0: セグメント検査対応）
bash src/check_audio_volume.sh content
# セグメント検査: 10秒ごとに全体をスキャン、-50dBFS未満を検出
# 前半/後半比較: 120秒以上のファイルで20dB以上の差を検出

# 2. 問題のあるMP3ファイルを削除
rm content/problem_topic.mp3

# 3. 音声を再生成（既存のMP3はスキップされる）
python3 src/audio_batch_generator.py content

# 4. 再度確認（問題ゼロになるまで繰り返し）
bash src/check_audio_volume.sh content
```

原因: Gemini TTS APIが非決定的に無音データを返すことがある
対策:
  1. gemini_key_manager.py にチャンクごとの音量検証を実装済み（-50dBFS閾値）
  2. check_audio_volume.sh v2.0 でセグメント単位の無音検出に対応

### 前後参照が不整合の場合
1. REFERENCE_MAP.yaml を確認
2. 該当トピックを特定
3. 該当部分のみ再生成

---

## AI Orchestrator 進捗レポート規約

### PROGRESS.yaml の管理

プロジェクトルートに `PROGRESS.yaml` が配置されている。このファイルはワークフロー全体を通じて、進捗状況を記録するためのチェックシートである。外部の AI Orchestrator ダッシュボード（localhost:3456）がこのファイルを定期的に読み取り、進捗を視覚化する。

### YAML 構造

```yaml
project:
  name: "カリキュラム名"
  agent_type: "learning-content-agent"   # or "learning-content-agent-gcp"
  status: "in_progress"    # idle | in_progress | completed | failed | paused
  started_at: "ISO8601"
  updated_at: "ISO8601"

progress:
  overall_percent: 25       # 0-100
  current_phase: "phase2-content-generation"

phases:
  - name: "Phase 0: Initialization"
    status: "completed"     # pending | in_progress | completed | failed | skipped | paused
    steps:
      - name: "Environment setup"
        done: true          # true | false
  # ...

errors: []                  # エラーメッセージの配列
```

### 更新タイミング（必須）

以下のタイミングで **必ず** PROGRESS.yaml を更新すること:

1. **フェーズ開始時**:
   - 該当フェーズの `status` → `"in_progress"`
   - `progress.current_phase` を更新（例: `"phase2-content-generation"`）
   - `project.status` → `"in_progress"`（初回のみ）
   - `project.updated_at` に現在時刻を記録

2. **ステップ完了時**:
   - 該当ステップの `done` → `true`
   - `progress.overall_percent` を再計算（完了ステップ数 / 総ステップ数 × 100）

3. **フェーズ完了時**:
   - 該当フェーズの `status` → `"completed"`
   - `progress.overall_percent` を再計算

4. **エラー発生時**:
   - `errors` 配列にエラーメッセージを追加
   - 該当フェーズの `status` → `"failed"`

5. **全体完了時**:
   - `project.status` → `"completed"`
   - `progress.overall_percent` → `100`

### progress.overall_percent の計算方法

```
overall_percent = (全フェーズの done: true のステップ合計 / 全フェーズの総ステップ数) × 100
```

### 厳守事項

- PROGRESS.yaml の構造（キー名、フェーズ数、ステップ数）を変更しないこと
- `project.updated_at` は更新の度に現在時刻で上書きすること
- YAML として valid な形式を維持すること
- ステップの追加・削除はしないこと

