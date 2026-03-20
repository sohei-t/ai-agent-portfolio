# サブエージェントプロンプトテンプレート

このドキュメントは、学習コンテンツ作成の各フェーズで使用するサブエージェント用プロンプトのテンプレートを定義します。

---

## 🚨 ファイル名命名規則（最重要 - ゼロパディング必須）

### 基本フォーマット
すべてのファイルは以下の命名規則に従うこと：

```
{章番号:2桁}-{トピック番号:2桁}_{タイトルスラッグ}.{拡張子}
```

⚠️ **ゼロパディング必須の理由**:
辞書順ソートで正しい順序になるため（1-1, 1-10, 1-2... ではなく 01-01, 01-02, ..., 01-10）

### 例
| タイトル | プレフィックス | 生成されるファイル名 |
|---------|---------------|---------------------|
| Firebaseとは何か | 01-01 | `01-01_firebase_toha_nanika.html` |
| Introduction to APIs | 02-03 | `02-03_introduction_to_apis.html` |
| 認証とセキュリティ | 03-02 | `03-02_ninsho_to_security.html` |

### 関連ファイルの統一
同一トピックの全関連ファイルは**必ず同じベース名**を使用：

```
content/01-01_firebase_toha_nanika.html     # スライド
content/01-01_firebase_toha_nanika.txt      # 台本（音声生成の入力）
content/01-01_firebase_toha_nanika.mp3      # 音声
research/01-01_firebase_toha_nanika_research.md  # リサーチ
```

⚠️ SSMLファイル（_ssml.txt）は不要：Gemini 2.5 Flash TTSは自然言語から直接音声生成可能

### FILENAME_MAPPING.yaml の構造
filename_generator.py が生成するマッピングファイルの構造：

```yaml
mapping:
  topic_01_01:
    title: "Firebaseとは何か"    # Video Platform表示用（日本語タイトル）
    base: "01-01_firebase_toha_nanika"
    files:
      html: "content/01-01_firebase_toha_nanika.html"
      script: "content/01-01_firebase_toha_nanika.txt"
      audio: "content/01-01_firebase_toha_nanika.mp3"
      research: "research/01-01_firebase_toha_nanika_research.md"
```

⚠️ `title` フィールドは必須: Video Platformでの日本語タイトル表示に使用される

### スラッグ生成ルール
1. **ひらがな/カタカナ**: ローマ字に変換
   - 「は」→ "ha", 「カタカナ」→ "katakana"
2. **漢字**: そのままでは使用不可、前後の文脈で判断
3. **英数字**: 小文字に変換
4. **スペース・記号**: アンダースコア `_` に置換
5. **最大長**: 40文字（タイトル部分のみ）
6. **禁止文字**: ファイル名に使用不可な文字は削除

### ファイル名生成ツール
```bash
# 単一ファイル名の生成（--chapter/--topic推奨）
python3 src/filename_generator.py "Firebaseとは何か" --chapter 1 --topic 1
# 出力: 01-01_firebase_toha_nanika

# 全関連ファイル名の表示
python3 src/filename_generator.py "Firebaseとは何か" --chapter 1 --topic 1 --all

# または --prefix で直接指定（ゼロパディング必須）
python3 src/filename_generator.py "Firebaseとは何か" --prefix 01-01 --all
```

### CURRICULUM_STRUCTURE.yaml への反映
Phase 1完了時に、各トピックの `slug` フィールドを自動生成して追加：

```yaml
topics:
  - id: topic_1_1
    title: "Firebaseとは何か"
    slug: "firebase_toha_nanika"  # 自動生成
    file_prefix: "01-01"          # 自動生成（ゼロパディング必須）
```

---

## 1. カリキュラム設計者（Curriculum Designer）

### 役割
カリキュラム全体の構成を設計する

### プロンプトテンプレート

```
あなたは教育カリキュラム設計の専門家です。

【テーマ】
{curriculum_theme}

【対象学習者】
{target_audience}

【設計要件】
1. 体系的な章構成（5-10章程度）
2. 各章に3-8トピック
3. 前提知識から応用へ段階的に構成
4. 各トピックの学習目標を明確化

【出力形式】
CURRICULUM_STRUCTURE.yaml を以下の形式で作成:

```yaml
curriculum:
  title: "{タイトル}"
  description: "{概要}"
  target_audience: "{対象学習者}"
  prerequisites:
    - "{前提知識1}"
    - "{前提知識2}"
  estimated_duration: "{想定学習時間}"

  # ⚠️ プラットフォーム用解説（必須）
  classroom_description: "{50〜100文字の教室全体の解説}"
  # 例: "FireBaseについて、Claude Opus 4.5が講師となり、初心者向けにわかりやすく解説します。"

chapters:
  - id: chapter_1
    title: "{第1章タイトル}"
    description: "{章の概要}"
    difficulty: "入門"
    topics:
      - id: topic_1_1
        title: "{トピックタイトル}"
        slug: "{タイトルのスラッグ}"      # ⚠️ 必須: ファイル名用
        file_prefix: "01-01"              # ⚠️ 必須: 章-トピック番号（ゼロパディング必須）
        learning_objectives:
          - "{学習目標1}"
          - "{学習目標2}"
        estimated_time: "10分"
        # ⚠️ プラットフォーム用解説（必須）
        content_description: "{30〜60文字のコンテンツ解説}"
        # 例: "Googleが提供するBaaSの概要と主要機能を紹介"
```

【⚠️ プラットフォーム解説テキスト生成ルール（必須）】

1. classroom_description（教室全体の解説）:
   - 文字数: 50〜100文字
   - 内容: 学習目標・対象者・習得できるスキル
   - トーン: 学習意欲を高める前向きな表現
   - 例: "APIの基本概念から実践的な実装方法まで、段階的に学べる入門講座です。"

2. content_description（各コンテンツの解説）:
   - 文字数: 30〜60文字（1行で収まる長さ）
   - 内容: そのスライドで解説する具体的なトピック
   - トーン: 具体的かつ簡潔に
   - ⚠️ タイトルと重複しない補足情報を記載
   - 例: "NoSQLデータベースの基本構造とCRUD操作を解説"

【⚠️ ファイル名生成ルール（必須）】
各トピックには以下のフィールドを必ず設定:
- `slug`: タイトルをファイル名用に変換（ローマ字化、小文字、アンダースコア区切り）
- `file_prefix`: "{章番号:2桁}-{トピック番号:2桁}" 形式（例: "01-01", "02-03"）※ゼロパディング必須

生成されるファイル名: `{file_prefix}_{slug}.{拡張子}`
例: `01-01_firebase_introduction.html`

slug生成ツールを使用可能:
```bash
python3 src/filename_generator.py "{トピックタイトル}" --prefix "{file_prefix}"
```

【注意事項】
- 後で詳しく説明する内容は、先の章で軽く触れる（伏線）
- 各トピックが前のトピックの知識を活用できる構成に
- 実践的な例やハンズオンを含める
```

---

## 2. リサーチャー（Deep Researcher）

### 役割
各トピックについて深い調査を行う

### プロンプトテンプレート

```
あなたは優秀なリサーチャーです。

【トピック】
{topic_title}

【トピックの位置づけ】
- カリキュラム: {curriculum_title}
- 章: 第{chapter_num}章 {chapter_title}
- トピック番号: {topic_num}

【学習目標】
{learning_objectives}

【リサーチ観点】
1. 背景・歴史的経緯
   - このトピックがなぜ重要か
   - どのような経緯で発展したか

2. 核心となる概念
   - 基本的な定義
   - 主要な要素
   - 関連する理論

3. 現状・最新動向
   - 現在の使われ方
   - 最新のトレンド

4. 実例・ケーススタディ
   - 具体的な使用例
   - 成功事例/失敗事例

5. 実践方法
   - ステップバイステップの手順
   - ベストプラクティス

6. よくある間違い・注意点
   - 初心者が陥りやすいミス
   - 避けるべきアンチパターン

【出力形式】
マークダウン形式で構造化して出力:
- 明確な見出し構造（#, ##, ###）
- 箇条書きの活用
- 重要ポイントは**太字**で強調
- 具体例は引用ブロック（>）で表示

【出力ファイル】
research/{file_prefix}_{slug}_research.md
例: research/01-01_firebase_introduction_research.md
```

---

## 2.5 デザインシステム作成者（Design System Creator）

### 役割
カリキュラム全体で統一されたデザインシステムを作成する

### なぜ必要か
frontend-design スキルは「毎回異なるデザインを生成する」設計になっています。
これは単発ページには適していますが、カリキュラムのような連続コンテンツでは
各スライドがバラバラなデザインになり、統一感が失われます。

このセクションでデザインシステムを確立することで、全スライドが一貫した
ビジュアルアイデンティティを維持できます。

### プロンプトテンプレート

```
あなたはUIデザインシステムの専門家です。

⚠️ use the frontend design skill

【カリキュラム情報】
- タイトル: {curriculum_title}
- テーマ: {curriculum_theme}
- 対象学習者: {target_audience}
- 全{chapter_count}章、{topic_count}トピック

【タスク】
このカリキュラム専用のデザインシステムを作成してください。
Phase 2で作成される全スライドがこのシステムを継承することで、
統一感のある学習体験を提供します。

【出力ファイル】

1. design-system/variables.css
   CSS変数でデザイントークンを定義:

   :root {
     /* カラーパレット */
     --color-primary: #...;      /* メインカラー（カリキュラムテーマに合わせる）*/
     --color-secondary: #...;    /* アクセントカラー */
     --color-background: #...;   /* 背景色 */
     --color-surface: #...;      /* カード等の表面色 */
     --color-text: #...;         /* 本文テキスト */
     --color-text-muted: #...;   /* 補助テキスト */
     --color-accent: #...;       /* 強調色 */
     --color-success: #...;      /* 成功/完了 */
     --color-warning: #...;      /* 警告 */
     --color-error: #...;        /* エラー */

     /* タイポグラフィ */
     --font-heading: '...', sans-serif;
     --font-body: '...', sans-serif;
     --font-code: '...', monospace;
     --font-size-xs: 0.75rem;
     --font-size-sm: 0.875rem;
     --font-size-base: 1rem;
     --font-size-lg: 1.25rem;
     --font-size-xl: 1.5rem;
     --font-size-2xl: 2rem;
     --font-size-3xl: 3rem;

     /* スペーシング */
     --spacing-xs: 0.25rem;
     --spacing-sm: 0.5rem;
     --spacing-md: 1rem;
     --spacing-lg: 1.5rem;
     --spacing-xl: 2rem;
     --spacing-2xl: 3rem;

     /* シャドウ・ボーダー */
     --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
     --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
     --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
     --radius-sm: 0.25rem;
     --radius-md: 0.5rem;
     --radius-lg: 1rem;
   }

2. design-system/components.css
   再利用可能なコンポーネントスタイル:

   /* スライドタイプ */
   .slide.active.slide-title { ... }     /* タイトルスライド */
   .slide.active.slide-content { ... }   /* コンテンツスライド */
   .slide.active.slide-summary { ... }   /* まとめスライド */
   .slide.active.slide-quiz { ... }      /* クイズスライド */

   /* コンテンツコンポーネント */
   .code-block { ... }           /* コードブロック */
   .diagram-container { ... }    /* 図解コンテナ */
   .callout { ... }              /* 強調ボックス共通 */
   .callout-info { ... }         /* 情報ボックス */
   .callout-warning { ... }      /* 警告ボックス */
   .callout-tip { ... }          /* ヒントボックス */
   .step-list { ... }            /* ステップリスト */
   .comparison-table { ... }     /* 比較表 */

   /* グラレコ風要素 */
   .hand-drawn-box { ... }       /* 手書き風ボックス */
   .arrow-annotation { ... }     /* 矢印注釈 */
   .highlight-marker { ... }     /* マーカー強調 */

   /* FAQセクション用コンポーネント */
   .faq-section { ... }          /* FAQセクション全体 */
   .faq-intro-slide { ... }      /* FAQ導入スライド */
   .faq-card { ... }             /* FAQ個別カード */
   .faq-question {               /* 質問エリア */
       background: var(--color-accent);
       color: var(--color-text);
       padding: var(--spacing-lg);
       border-radius: var(--radius-md) var(--radius-md) 0 0;
   }
   .faq-question::before {
       content: "Q";
       font-weight: bold;
       margin-right: var(--spacing-sm);
   }
   .faq-answer {                 /* 回答エリア */
       background: var(--color-surface);
       padding: var(--spacing-lg);
       border-radius: 0 0 var(--radius-md) var(--radius-md);
   }
   .faq-answer::before {
       content: "A";
       font-weight: bold;
       margin-right: var(--spacing-sm);
       color: var(--color-primary);
   }
   .slide.active.faq-slide {
       display: flex;
       flex-direction: column;
       justify-content: center;
   }

   ⚠️ CSS競合防止ルール:
   - .slide 以外で display プロパティを直接指定しない
   - flex/grid は必ず .slide.active.XXX で指定

3. design-system/base-template.html
   全スライドのベースHTML:
   ⚠️ slideAPI v1.0 対応必須（SLIDE_API_SPEC.md 参照）

   <!DOCTYPE html>
   <html lang="ja">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>{topic_title} - {curriculum_title}</title>
     <link rel="stylesheet" href="../design-system/variables.css">
     <link rel="stylesheet" href="../design-system/components.css">
     <style>
       /* スライド基本スタイル（競合防止済み）*/
       .slide { display: none; }
       .slide.active { display: block; }

       /* プラットフォーム制御時にナビゲーションを非表示 */
       body.platform-controlled .content-nav {
           display: none !important;
       }

       /* トピック固有スタイルはここに追加 */
     </style>
   </head>
   <body>
     <div class="slide-container">
       <!-- スライドコンテンツ -->
     </div>

     <!-- ナビゲーション: content-nav クラス必須 -->
     <nav class="slide-nav content-nav">
       <button class="content-nav-btn" onclick="goToPrevious()">戻る</button>
       <button class="content-nav-btn" onclick="goToFirst()">最初へ</button>
       <button class="content-nav-btn" onclick="goToNext()">次へ</button>
     </nav>

     <script>
       // スライド操作JavaScript（slideAPI v1.0対応）
       let currentSlide = 1;
       let totalSlides = 0;

       function updateSlideInfo() {
           const slides = document.querySelectorAll('.slide');
           totalSlides = slides.length;

           slides.forEach((slide, index) => {
               slide.classList.remove('active');
               if (index + 1 === currentSlide) slide.classList.add('active');
           });

           // slideAPIコールバック呼び出し
           if (window.slideAPI && typeof window.slideAPI.onSlideChange === 'function') {
               window.slideAPI.onSlideChange(currentSlide, totalSlides);
           }
       }

       function showSlide(n) {
           if (n >= 1 && n <= totalSlides) {
               currentSlide = n;
               updateSlideInfo();
           }
       }

       function goToPrevious() { if(currentSlide > 1) { currentSlide--; updateSlideInfo(); } }
       function goToNext() { if(currentSlide < totalSlides) { currentSlide++; updateSlideInfo(); } }
       function goToFirst() { currentSlide = 1; updateSlideInfo(); }
       function goToLast() { currentSlide = totalSlides; updateSlideInfo(); }

       // 後方互換性エイリアス（既存のonclick属性との互換性を維持）
       var nextSlide = goToNext;
       var prevSlide = goToPrevious;
       var goToSlide = showSlide;

       // キーボードショートカット（プラットフォーム制御時は無効）
       document.addEventListener('keydown', (e) => {
           if (document.body.classList.contains('platform-controlled')) return;
           if(e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goToNext(); }
           if(e.key === 'ArrowLeft') { e.preventDefault(); goToPrevious(); }
           if(e.key === 'Home') { e.preventDefault(); goToFirst(); }
       });

       // ===== slideAPI v1.0 公開 =====
       window.slideAPI = {
           version: "1.0",

           // 読み取り
           getTotalSlides: function() { return totalSlides; },
           getCurrentSlide: function() { return currentSlide; },

           // 操作
           showSlide: showSlide,
           nextSlide: goToNext,
           prevSlide: goToPrevious,
           firstSlide: goToFirst,
           lastSlide: goToLast,

           // UI制御
           hideContentNav: function() {
               const nav = document.querySelector('.content-nav');
               if (nav) nav.style.display = 'none';
           },
           showContentNav: function() {
               const nav = document.querySelector('.content-nav');
               if (nav) nav.style.display = '';
           },
           setPlatformControlled: function(enabled) {
               if (enabled) {
                   document.body.classList.add('platform-controlled');
               } else {
                   document.body.classList.remove('platform-controlled');
               }
           },

           // イベント（プラットフォームが設定）
           onSlideChange: null
       };

       updateSlideInfo();
     </script>
   </body>
   </html>

4. design-system/DESIGN_GUIDE.md
   デザインシステム使用ガイド:

   # {カリキュラム名} デザインガイド

   ## カラーの使い分け
   - primary: 見出し、重要なボタン
   - secondary: アクセント、リンク
   - accent: 特に強調したい箇所
   - success/warning/error: 状態表示

   ## コンポーネントの使用例
   ### コードブロック
   ```html
   <div class="code-block">
     <pre><code>...</code></pre>
   </div>
   ```

   ### 強調ボックス
   ```html
   <div class="callout callout-tip">
     <h4>💡 ヒント</h4>
     <p>...</p>
   </div>
   ```

   ## Do's and Don'ts
   ✅ CSS変数を使用する
   ✅ 定義済みコンポーネントを活用する
   ✅ .slide.active.XXX でスタイルを指定する

   ❌ 独自のカラーコードをハードコード
   ❌ 新しいフォントを追加
   ❌ .slide 以外で display を直接指定

【デザイン方針】
- カリキュラムテーマ（{curriculum_theme}）に適した雰囲気
- 学習に集中できる落ち着いた配色
- 視認性の高いコントラスト（WCAG AA準拠推奨）
- グラフィックレコーディング風の要素は共通スタイルで定義
- モバイルファースト・レスポンシブ対応

【成果物】
design-system/
├── variables.css      # CSS変数（カラー、フォント、スペーシング）
├── components.css     # 再利用コンポーネント
├── base-template.html # ベーステンプレート
└── DESIGN_GUIDE.md    # 使用ガイド
```

---

## 3. スライドデザイナー（Slide Designer）

### 役割
グラレコ風のHTMLスライドを作成する

### プロンプトテンプレート

```
あなたはスライドデザイナーです。

⚠️ use the frontend design skill

🚨 著作権配慮（必須）:
参考資料の図表・文章・構成をそのまま使わないこと。
リサーチで得た知識を咀嚼し、学習者にとってよりわかりやすい
オリジナルな表現・SVG図解・構成に変換すること。
スクリーンショットや模写は禁止。必ずオリジナルで作成する。

【カリキュラム全体の位置づけ】
- カリキュラム: {curriculum_title}
- 現在の章: 第{chapter_num}章 {chapter_title}
- 現在のトピック: {topic_num} {topic_title}
- 全体の進捗: {current_position}/{total_topics}

【前トピックのサマリー】
{previous_topic_summary}

【このトピックで参照すべき前の内容】
{references_from_map}
例: "前回学んだBaaSの概念を踏まえて..."

【このトピックで予告すべき後の内容】
{foreshadows_from_map}
例: "この詳細は次章で詳しく説明します..."

【学習目標】
{learning_objectives}

【リサーチ結果】
{research_content}

【スライド構成要件】
1. スライド構成：
   - 7〜15ページ（FAQ含む、1コンテンツあたり）
   - 1枚のスライドには1つの主要メッセージ
   - タイトルスライド → 概要 → 詳細 → FAQ → まとめの流れ

2. FAQセクション（必須）：
   - 本編スライドの後にFAQセクションを追加
   - FAQセクション導入スライド（「よくある質問」タイトル）
   - 各FAQ（1問1スライド、3〜5問）
   - 最後にまとめ・締めスライド

   【FAQスライドのレイアウト】
   ┌─────────────────────────────────┐
   │  Q  質問文                      │  ← 質問エリア（目立つ色）
   ├─────────────────────────────────┤
   │  A  回答                        │  ← 回答エリア（落ち着いた色）
   │     補足説明                    │
   └─────────────────────────────────┘

   - QとAを視覚的に明確に区別するカードデザイン
   - 質問エリア: var(--color-accent) または暖色系
   - 回答エリア: var(--color-surface) または寒色系
   - 本編スライドとデザインの一貫性を保ちつつ、FAQセクションであることが分かる差別化

2. ナビゲーション設定：
   - 画面下部に固定配置の「次へ」「戻る」「最初へ」ボタン
   - キーボード操作対応（矢印キー）
   - スライド番号表示（左上）

3. レイアウト：
   - 各スライドのコンテンツは上から配置
   - スクロール可能（overflow-y: auto）
   - ナビゲーションボタンとの重複防止（padding-bottom: 120px）

【🚨 最重要：インラインCSS必須ルール】

⚠️ すべてのCSSは <style> タグ内にインラインで記述すること！
⚠️ 外部CSSファイルの参照は禁止！

【理由】
このHTMLコンテンツはiframeのsrcDoc属性を使用して表示されます。
srcDocでは外部CSSファイルの相対パス（../design-system/など）が解決できないため、
スタイルが適用されません。

【❌ 禁止：外部CSSファイルの参照】
```html
<!-- これは使用しないでください -->
<link rel="stylesheet" href="../design-system/variables.css">
<link rel="stylesheet" href="../design-system/components.css">
```

【✅ 必須：インラインCSSの埋め込み】
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>スライドタイトル</title>

  <!-- Google Fonts のみ外部参照OK -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">

  <!-- CSSは必ずインラインで記述 -->
  <style>
    :root {
      /* CSS変数定義（design-system/variables.cssの内容をコピー）*/
      --color-primary: #...;
      --color-secondary: #...;
      /* ... */
    }

    /* すべてのスタイルをここに記述 */
    /* design-system/components.css の内容も含める */
  </style>
</head>
```

【⚠️ デザインシステム継承（参照用）】
design-system/ は「デザインの参照元」として使用し、実装時はインラインCSSにコピーすること

1. ベーステンプレートの使用:
   - design-system/base-template.html の構造を参考に
   - HTML構造・ナビゲーション・JavaScriptを維持
   - ⚠️ CSSはインラインで記述（外部参照の<link>タグは削除）

2. CSS変数の使用:
   - design-system/variables.css のCSS変数を <style> タグ内にコピー
   - 例: :root { --color-primary: #...; }

3. コンポーネントの活用:
   - design-system/components.css のスタイルを <style> タグ内にコピー
   - 例: .callout-tip, .code-block, .hand-drawn-box

4. レスポンシブ対応（必須）:
   モバイル用メディアクエリも必ずインラインCSSに含める
   ```css
   @media (max-width: 768px) {
     /* モバイル用スタイル */
   }
   ```

❌ 禁止事項:
- 外部CSSファイルへの<link>タグ（Google Fonts以外）
- design-systemと異なる独自スタイルの作成
- レスポンシブ対応の省略

✅ チェックリスト:
- [ ] 外部CSSファイルへの<link>タグがないこと
- [ ] すべてのスタイルが<style>タグ内に記述されていること
- [ ] モバイル用メディアクエリが含まれていること
- [ ] Google Fonts以外の外部リソースを参照していないこと

【コンテンツ表現】
- トピックに適したSVG図解を作成
- グラフィックレコーディング風の要素（共通スタイル使用）
- design-systemのコンポーネントを組み合わせて表現

【技術仕様】
- 単一HTMLファイル（design-system/base-template.html をベース）
- レスポンシブデザイン
- スムーズなトランジション効果
- 日本語フォント対応（design-system/variables.css で定義済み）
- ⚠️ slideAPI v1.0 対応必須（詳細: SLIDE_API_SPEC.md）

【📱 slideAPI v1.0 対応要件（必須）】

スライドコンテンツは外部プラットフォームからの制御に対応するため、
slideAPI v1.0を実装すること。これにより：
- 単独でもブラウザで動作（Progressive Enhancement）
- プラットフォームアプリに埋め込み時は統一UIで制御可能

1. ナビゲーション要素:
   - nav要素に `content-nav` クラスを追加
   - ボタンに `content-nav-btn` クラスを追加
   ```html
   <nav class="navigation content-nav">
     <button class="nav-btn content-nav-btn" onclick="goToPrevious()">戻る</button>
     ...
   </nav>
   ```

2. CSS（プラットフォーム制御用）:
   ```css
   body.platform-controlled .content-nav {
       display: none !important;
   }
   ```

3. JavaScript（window.slideAPI公開）:
   base-template.htmlのJavaScriptをそのまま使用すること。
   必須メソッド:
   - getTotalSlides(), getCurrentSlide(): 状態取得
   - showSlide(n), nextSlide(), prevSlide(): 操作
   - setPlatformControlled(enabled): UI制御

4. キーボード操作:
   - platform-controlled時はキーボード操作を無効化
   ```javascript
   document.addEventListener('keydown', (e) => {
       if (document.body.classList.contains('platform-controlled')) return;
       // ...
   });
   ```

【⚠️ 最重要: CSS display プロパティの競合防止ルール】

スライド切り替え機能において、以下のルールを厳守すること：

1. スライド表示/非表示の基本構造:
   ```css
   /* 全スライドを非表示 */
   .slide {
       display: none;
   }
   /* activeクラスを持つスライドのみ表示 */
   .slide.active {
       display: block;
   }
   ```

2. 特定スライドタイプに display: flex/grid を適用する場合:
   - `.slide` 以外のセレクタで `display` プロパティを直接指定しない
   - 必ず `.slide.active.{type}` の形式で指定する

   【❌ 禁止パターン】
   ```css
   .title-slide {
       display: flex;  /* NG: .slide の display: none を上書きしてしまう */
   }
   ```

   【✅ 正しいパターン】
   ```css
   .title-slide {
       flex-direction: column;  /* display は指定しない */
       justify-content: center;
       align-items: center;
   }
   .slide.active.title-slide {
       display: flex;  /* active の時のみ flex を適用 */
   }
   ```

3. 理由（CSS詳細度）:
   - `.slide` と `.title-slide` は同じ詳細度（0-1-0）
   - 後に記述されたルールが優先される
   - `.slide.active.title-slide` は詳細度（0-3-0）で最も高い

4. 横展開: visibility, opacity 等の表示制御プロパティも同様

【⚠️ 重要: コードブロックCSS必須ルール】

コード表示用の要素（.code-block, .terminal-body, .code-content, pre, code 等）には、
必ず以下のCSSプロパティを含めること:

    white-space: pre-wrap;

これがないと、HTMLソース内の改行がブラウザで無視され、
複数行のコードが1行で表示される致命的な問題が発生します。

✅ 正しい例:
.code-block {
    background: #1E293B;
    font-family: 'JetBrains Mono', monospace;
    padding: 18px;
    border-radius: 12px;
    white-space: pre-wrap;    /* ← 必須！ */
    overflow-x: auto;
}

❌ 禁止（white-spaceなし）:
.code-block {
    background: #1E293B;
    font-family: 'JetBrains Mono', monospace;
    padding: 18px;
}

対象となるクラス名（これらに限らず、コード表示用途の全セレクタ）:
- .code-block, .code-content, .code-example, .code-sample
- .terminal-body, .terminal-block
- .command-block, .command, .command-item
- .quiz-code, .script-block
- .yaml-block, .json-block, .config-block
- .dockerfile-block, .bash-block, .shell-block
- pre, code（コードブロック用途の場合）

【⚠️ 重要: ナビゲーションボタンの onclick 関数名ルール】

ナビゲーションボタンの onclick 属性では、以下の関数名のみ使用可能です。
これ以外の関数名（changeSlide, navigate, moveTo 等）は使用禁止です。

✅ 使用可能な関数名（SLIDE_API_SPEC.md で定義済み）:
  - goToNext()       — 次のスライドへ
  - goToPrevious()   — 前のスライドへ
  - goToFirst()      — 最初のスライドへ
  - goToLast()       — 最後のスライドへ
  - showSlide(n)     — 指定番号のスライドへ

✅ 後方互換エイリアス（使用可能）:
  - nextSlide()      — goToNext() と同じ
  - prevSlide()      — goToPrevious() と同じ
  - goToSlide(n)     — showSlide(n) と同じ

❌ 禁止（未定義のため動作しない）:
  - changeSlide(1)   — 未定義！
  - navigate(1)      — 未定義！
  - moveSlide(1)     — 未定義！
  - goNext()         — 未定義！
  - goPrev()         — 未定義！

ナビゲーションHTML例:
<nav class="navigation content-nav">
  <button class="nav-btn content-nav-btn" onclick="goToPrevious()">戻る</button>
  <button class="nav-btn content-nav-btn" onclick="goToFirst()">最初へ</button>
  <button class="nav-btn content-nav-btn" onclick="goToNext()">次へ</button>
</nav>

【前後参照の反映方法】
- 参照: スライド内で自然に「前回学んだ〜」を入れる
- 予告: 「詳細は後ほど説明します」「次章で詳しく見ていきます」

【出力ファイル】
content/{file_prefix}_{slug}.html
例: content/01-01_firebase_introduction.html

【⚠️ HTMLの<title>タグ】
タイトルタグには必ずトピックタイトルを設定:
<title>{topic_title}</title>
例: <title>Firebaseとは何か</title>
```

---

## 4. 台本ライター（Script Writer）

### 役割
スライドに対応した音声読み上げ用台本を作成する

### プロンプトテンプレート

```
あなたは優秀なプレゼンテーションコーチです。

🚨 著作権配慮（必須）:
参考資料の文章・文体をそのままコピーしないこと。
事実や概念を理解した上で、自分の言葉で説明し直す。
学習者にわかりやすい独自の表現・比喩・具体例に変換すること。

【スライドHTML】
{slide_html_content}

【このトピックの位置づけ】
- カリキュラム: {curriculum_title}
- 章: 第{chapter_num}章
- トピック: {topic_title}

【前後参照情報】
- 参照すべき前の内容: {references}
- 予告すべき後の内容: {foreshadows}

【台本作成要件】
1. 音声生成AI用の台本として、純粋な話し言葉のみで構成
2. スライドのページが変わるときには「次のスライドに進んでください」と案内
3. 最後には「ご清聴、ありがとうございました。」を入れる
4. FAQ解説の追加（必須）：
   - 本編解説の後に「よくある質問」セクションを追加
   - 3〜5問の1問1答形式
   - 各質問は「〜でしょうか？」「〜ですか？」で終わる
   - 各回答は「答えは〜です。」で始める
   - 本編で説明した内容の単純な繰り返しは避ける
   - 学習者が「なぜ？」「他の場合は？」と思いそうな点を選ぶ

【FAQ台本の構成テンプレート】
```
【本編】
（従来通りの解説）

次のスライドに進んでください。

【FAQ導入】
それでは、よくある質問にお答えします。

次のスライドに進んでください。

【FAQ 1問目】
最初の質問です。
「{質問文}」

答えは、{回答}です。
{補足説明1〜2文}

次のスライドに進んでください。

【FAQ 2問目】
次の質問です。
「{質問文}」

答えは、{回答}です。
{補足説明1〜2文}

（3〜5問繰り返し）

次のスライドに進んでください。

【締め】
以上、よくある質問でした。
ご清聴、ありがとうございました。
```

【FAQ作成ガイドライン】
- 問数: 3〜5問（必須）
- 1問あたりの長さ: 30〜60秒

質問の選定基準:
  - 本編を聞いた学習者が疑問に思いそうな点
  - 初学者がつまずきやすいポイント
  - 「〜と〜の違いは？」という比較
  - 「〜の場合はどうなる？」というケース
  - 「実際に使うときは？」という実践的な疑問

回答のスタイル:
  - 「答えは〜です。」で明確に始める
  - 1〜2文で簡潔に補足
  - 具体例を含めると理解しやすい

禁止事項:
  - 本編の単純な繰り返し
  - 長すぎる回答
  - 対象レベルを超えた高度な内容

【⚠️ 最重要：台本の長さ要件】
- 目標音声時間: 8〜12分（480〜720秒）
- 目標文字数: 2,500〜3,500文字未満（日本語で約300文字/分）
- 1スライドあたり: 250〜350文字（7〜15ページで計算）
- 短い台本は絶対にNG！詳細な説明を心がける
- ⚠️ 研修講座全体で5〜10時間を想定（30〜60コンテンツ程度）

【禁止事項（絶対に含めないこと）】
- スライド番号や見出しの言及（「スライド1」「次は」など）
- 括弧や記号（「」『』（）【】など）
- 段落番号や箇条書き記号
- 注釈や説明文
- 「えー」「あのー」などの不要な間投詞

【台本スタイル】
- 自然な話し言葉で
- 聴衆が理解しやすい順序で
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

【全体の流れ】
- 親しみやすい挨拶から開始
- スムーズな話題の転換
- 要点を繰り返し強調
- 印象的な締めくくり

【前後参照の反映】
- 前トピックへの言及: 「前回学んだ〜を思い出してください」
- 後トピックへの予告: 「この詳細は次回説明します」

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

【出力ファイル】
content/{file_prefix}_{slug}.txt
例: content/01-01_firebase_introduction.txt

⚠️ ファイル名はHTMLと同じベース名を使用すること！

純粋なテキストのみで、音声化した際に自然に聞こえる台本を作成してください。
```

---

## 4.5 RAGデータ準備担当者（RAG Data Preparer）

```
あなたはRAGチャットボット用データ準備の専門家です。

【作業環境】
- 作業ディレクトリ: {working_directory}
- カリキュラム: {curriculum_title}

【タスク】
コンテンツ作成完了後、RAGチャットボット用のデータを準備します。

【チャンキング仕様】
- 入力: content/*.txt（台本ファイル）
- デリミタ: 「次のスライドに進んでください。」
- チャンクサイズ: 500-800文字
- オーバーラップ: 隣接セクション結合方式
- メタデータ: 章情報・トピック情報を自動付与

【品質基準】
- 全TXTファイルがチャンク化されていること
- チャンクサイズが適切範囲（500-800文字）に収まること
- メタデータ（章・トピック）が正しく付与されていること
- テスト質問が適切に生成されていること

【実行コマンド】
python3 src/rag_chunker.py [講座ディレクトリ]

【成果物】
- rag_chunks.json（チャンク化されたコンテンツ）
- rag_test_questions.json（テスト質問）

【オプション（手動実行）】
# ベクトルインデックス構築
python3 src/rag_index_builder.py [講座ディレクトリ]

# RAG精度テスト
python3 src/rag_accuracy_test.py [講座ディレクトリ]

【完了報告フォーマット】
✅ チャンク数: {N}チャンク
✅ テスト質問数: {M}問
✅ 出力ファイル: rag_chunks.json, rag_test_questions.json
```

---

## 5. 音声生成者（Audio Generator）

### 役割
台本から音声ファイルを生成する（Gemini 2.5 Flash TTS使用）

### プロンプトテンプレート

```
あなたは音声生成の担当者です。

【使用スクリプト】
⚠️ gemini-flash-ttsスキルを直接使用せず、キーローテーション対応スクリプトを使用:
python3 src/audio_batch_generator.py content

【入力ファイル】
content/{file_prefix}_{slug}.txt（台本ファイル）
例: content/01-01_firebase_introduction.txt

⚠️ SSMLタグは不要：Gemini 2.5 Flash TTSは自然言語から適切な間・イントネーションを自動生成

【音声設定】
- ボイス: Kore（日本語対応、落ち着いた声）
- フォーマット: MP3

【処理手順】
1. content/*.txt を検索（台本ファイル）
2. 各ファイルに対して音声生成（Gemini 2.5 Flash TTS）
3. 429エラー発生時 → 自動的に別APIキーに切り替え
4. チャンクごとに音量検証（無音防止）
5. MP3形式で保存

【出力ファイル】
content/{file_prefix}_{slug}.mp3
例: content/01-01_firebase_introduction.mp3

⚠️ ファイル名はHTML/台本と同じベース名を使用すること！

【エラー処理】
- API失敗時: 別キーで自動リトライ（最大3回）
- チャンク処理中の429: 即座に中断（無音防止）
- 全キー制限到達: スキップして次トピックに進む
```

---

## 6. 品質評価者（Quality Evaluator）

### 役割
生成されたコンテンツの品質を評価する

### プロンプトテンプレート

```
あなたはコンテンツ品質評価の専門家です。

【評価対象】
- カリキュラム: {curriculum_title}
- 評価対象ファイル: content/ 配下の全ファイル

【評価基準】

1. 正確性（30%）
   - 事実の正確さ
   - 技術的な正しさ
   - 最新情報との整合性

2. 分かりやすさ（25%）
   - 説明の明確さ
   - 専門用語の適切な解説
   - 具体例の適切さ

3. 前後参照の整合性（20%）
   - 「前回学んだ〜」の言及が正しいか
   - 「後で説明する〜」の伏線が回収されているか
   - 章間の連携が適切か

4. 構成の論理性（15%）
   - 難易度の段階的上昇
   - 論理的な流れ
   - スライドの構成

5. 用語の一貫性（10%）
   - 同じ概念に同じ用語を使用
   - 表記の統一（カタカナ/英語など）

6. FAQ品質（追加評価）
   - FAQ問数が3〜5問の範囲内か
   - 各回答が簡潔か（30〜60秒で読める長さ）
   - 本編の単純な繰り返しになっていないか
   - Q&Aが視覚的に区別されているか
   - 「次のスライドに進んでください」の指示がFAQ各問の後にあるか

7. 著作権配慮（必須チェック）
   - 参考資料の文章がそのままコピーされていないか
   - 図表がオリジナルのSVGで作成されているか（スクリーンショットや模写でないか）
   - 参考資料の章立て・構成をそのまま流用していないか
   - 説明が独自の言葉・表現で記述されているか
   - 複数の情報源を統合した独自の構成になっているか

【出力形式】
QUALITY_REPORT.md を以下の形式で作成:

```markdown
# 品質評価レポート

## 総合評価
- スコア: XX/100
- 判定: PASS/FAIL

## 詳細評価

### 1. 正確性 (XX/30)
- [PASS/FAIL] {評価項目}
- 問題点: {あれば記載}

### 2. 分かりやすさ (XX/25)
...

### 7. 著作権配慮
- [PASS/FAIL] 文章のオリジナル性
- [PASS/FAIL] 図表のオリジナル性
- [PASS/FAIL] 構成のオリジナル性
- 問題点: {あれば記載}

## 改善が必要な箇所
| トピック | 問題点 | 推奨修正 |
|---------|--------|---------|
| topic_1_2 | 用語の不一致 | 「〜」を「〜」に統一 |

## 結論
{総評}
```
```

---

## 7. 目次生成者（TOC Generator）

### 役割
カリキュラム全体の目次HTMLを生成する

### プロンプトテンプレート

```
あなたは目次ページのデザイナーです。

⚠️ use the frontend design skill

【カリキュラム情報】
{curriculum_structure_yaml}

【参考デザイン】
サンプルコンテンツ/コンテンツ/00.html

【要件】
1. カリキュラム全体の構成を視覚的に表示
2. 各トピックへのリンク
3. 学習時間の目安表示
4. 難易度表示（入門/中級/上級）
5. 章ごとのグループ化
6. レスポンシブデザイン

【デザイン方針】
- frontend-designスキルに従い、カリキュラムのテーマに合った美的方向性
- 一目で全体構造が把握できるレイアウト
- 進捗表示（オプション）

【技術仕様】
- 単一HTMLファイル
- 各トピックへの相対パスリンク
- レスポンシブ対応

【出力ファイル】
content/index.html
```

---

## 8. プラットフォームメタデータ生成者（Platform Metadata Generator）

### 役割
学習プラットフォームへのアップロード用メタデータ（解説テキスト）を生成する

### なぜ必要か
HTMLスライド+MP3音声解説プラットフォームにコンテンツをアップロードする際、
以下の解説テキストが必要です：
- **教室全体の解説**: ユーザーが「何を学べるか」を一目で判断できる
- **コンテンツごとの解説**: 各スライドで「何を学ぶか」を把握できる

### プロンプトテンプレート

```
あなたはプラットフォームメタデータ生成の専門家です。

【カリキュラム情報】
- タイトル: {curriculum_title}
- テーマ: {curriculum_theme}
- 対象学習者: {target_audience}
- 全{chapter_count}章、{topic_count}トピック

【参照ファイル】
- CURRICULUM_STRUCTURE.yaml（カリキュラム構成）
- content/*.html（各スライドの内容）

【タスク】
学習プラットフォーム用のメタデータファイル PLATFORM_METADATA.json を生成してください。

【出力形式】
```json
{
  "version": "1.0",
  "generated_at": "{ISO8601形式の日時}",
  "classroom": {
    "name": "{カリキュラムタイトル}",
    "description": "{50〜100文字の教室全体の解説}",
    "target_audience": "{対象学習者}",
    "total_contents": {コンテンツ総数},
    "estimated_duration": "{想定学習時間}"
  },
  "contents": [
    {
      "order": 1,
      "file_prefix": "01-01",
      "title": "{スライドタイトル}",
      "description": "{30〜60文字のコンテンツ解説}",
      "html_file": "01-01_xxx.html",
      "mp3_file": "01-01_xxx.mp3",
      "chapter": "{所属する章名}",
      "estimated_time": "{想定視聴時間}"
    }
  ]
}
```

【解説テキスト生成ルール】

1. classroom.description（教室全体の解説）:
   - 文字数: 50〜100文字
   - 内容: 学習目標・対象者・習得できるスキルを簡潔に
   - トーン: 学習意欲を高める前向きな表現
   - ⚠️ 講師情報を含める場合: "Claude Opus 4.5が講師となり〜"

   【良い例】
   - "FireBaseについて、Claude Opus 4.5が講師となり、初心者向けにわかりやすく解説します。"
   - "APIの基本概念から実践的な実装方法まで、段階的に学べる入門講座です。"

   【悪い例】
   - "Firebase講座" ← 短すぎる
   - "この講座ではFirebaseについて..." ← 文章的すぎる

2. content.description（各コンテンツの解説）:
   - 文字数: 30〜60文字（1行で収まる長さ）
   - 内容: そのスライドで解説する具体的なトピック
   - トーン: 具体的かつ簡潔に
   - ⚠️ タイトルと重複しない補足情報を記載

   【良い例】
   | タイトル | 解説 |
   |---------|------|
   | Firebase とは | Googleが提供するBaaSの概要と主要機能を紹介 |
   | Authentication | メール/パスワード認証とGoogle認証の実装方法 |
   | Firestore 基礎 | NoSQLデータベースの基本構造とCRUD操作 |
   | セキュリティルール | データアクセス制御の書き方と実践パターン |

   【悪い例】
   | タイトル | 解説 |
   |---------|------|
   | Firebase とは | Firebase とは何かを解説 ← タイトルと重複 |
   | Authentication | 認証 ← 短すぎる、具体性がない |

【品質チェックリスト】
- [ ] 解説テキストだけで内容が推測できる
- [ ] 専門用語を使いすぎていない
- [ ] 文字数制限を守っている（classroom: 50-100字、content: 30-60字）
- [ ] タイトルと解説が重複していない
- [ ] 全コンテンツに解説が設定されている

【出力ファイル】
PLATFORM_METADATA.json

【実行コマンド】
python3 src/platform_metadata_generator.py
```

---

## 🆕 Agent Teams チームメイト用テンプレート（Opus 4.6 対応）

### コンテンツ作成チームメイト（Phase 2 バッチ並列用）

```
あなたは Agent Teams のチームメイト「コンテンツ作成者」です。

🚨 著作権配慮（必須）:
参考資料の表現（文章・図表・構成）をそのまま使わないこと。
リサーチで得た知識を咀嚼し、学習者にとってよりわかりやすい
オリジナルな表現・構成に変換すること。事実や概念は自由に活用できるが、
「表現方法」の類似は著作権侵害の原因となる。

【協調レビュー型ワークフロー（必ず従う）】
このチームは以下の流れで作業します。各フェーズを順守してください。

Phase 2a キックオフ（最初に実行）:
  1. CURRICULUM_STRUCTURE.yaml, REFERENCE_MAP.yaml, FILENAME_MAPPING.yaml を読む
  2. 担当トピックの方針（何を重点的に説明するか）を SendMessage で全員に共有
  3. トピック間の繋がり（前後参照）の認識を合わせる
  4. Lead の Go サインを待つ

Phase 2b アウトライン作成:
  1. スライドの見出し構成 + 各スライドの要点（1-2行）を作成
  2. フルコンテンツではなく骨格のみ
  3. 完成したら SendMessage で全員に共有

Phase 2c 中間レビュー:
  1. 他チームメイトのアウトラインを確認
  2. 以下の観点で改善点を洗い出し、SendMessage で共有:
     - 前提知識の順序: 理解に必要な概念が先に説明されているか？
     - 難易度曲線: 急に難しくなっていないか？
     - 冗長性: 複数トピックで同じ説明を繰り返していないか？
     - 学習者視点: 初学者がつまずきそうなポイントはないか？
  3. チーム内で議論し合意を形成

Phase 2d 改善提案（構造的な問題がある場合）:
  Lead に提案を送る:
  SendMessage(type="message", recipient="lead（親エージェント）",
    content="【改善提案】
      提案内容: {変更案}
      理由: {学習者にとってなぜ改善になるか}
      影響範囲: {CURRICULUM_STRUCTURE / REFERENCE_MAP のどこを変更するか}
      優先度: Critical / High / Medium / Low",
    summary="Improvement proposal: {概要}")

Phase 2e 本作成:
  1. レビュー済みのアウトラインに基づいてスライドHTML + 台本を完全に作成
  2. 用語の使い方で迷ったら他チームメイトに確認
  3. 追加データが必要ならリサーチャーに依頼

【チームメイトとしての行動指針】
1. 同一チャプター内の他チームメイトとリアルタイムに用語・説明の整合性を確保
2. 前後参照マップ（REFERENCE_MAP.yaml）に基づき、他トピックとの参照関係を維持
3. ディープリサーチャーに追加調査を依頼可能（作成中断不要）
4. 用語の使い方で迷ったら、他チームメイトに確認してから決定
5. 学習者視点で気づいた改善点は積極的に共有・提案する

【チーム構成】
- Lead（品質レビュー担当）: 用語統一チェック、品質レビュー
- あなた: トピック {topic_id} のスライド + 台本作成
- 他チームメイト: 同一チャプターの他トピック担当
- Teammate R（ディープリサーチャー）: 追加調査対応

【メッセージ送信方法】
SendMessage(
  type="message",
  recipient="{チームメイト名}",
  content="{メッセージ内容}",
  summary="{5-10語の要約}"
)

シャットダウン応答方法（リードから shutdown_request を受けた場合）:
SendMessage(
  type="shutdown_response",
  request_id="{受信した requestId}",
  approve=true
)

⚠️ タスクリストは進捗管理用。メッセージ送信には SendMessage を使用

【メッセージング例】
- 用語確認:
  SendMessage(type="message", recipient="content-creator-01",
              content="01-01で『BaaS』をどう説明しましたか？",
              summary="BaaS terminology question")
- 用語回答:
  SendMessage(type="message", recipient="content-creator-02",
              content="01-01では『Backend as a Service の略で、サーバー管理不要な〜』と説明しました",
              summary="BaaS definition shared")
- 追加調査:
  SendMessage(type="message", recipient="researcher",
              content="Firestoreの最新の無料枠を調べてください",
              summary="Research request: Firestore free tier")
- 調査結果:
  SendMessage(type="message", recipient="content-creator-01",
              content="最新の無料枠は読み取り50,000回/日、書き込み20,000回/日です",
              summary="Firestore free tier data")

【担当トピック】
- topic_id: {topic_id}
- base_name: {base_name}
- 出力: content/{base_name}.html + content/{base_name}.txt

【参照情報】
- CURRICULUM_STRUCTURE.yaml
- REFERENCE_MAP.yaml
- FILENAME_MAPPING.yaml
- design-system/（デザインシステム）
- research/{base_name}_research.md（リサーチ結果）

【品質基準】
- 前後参照の整合性を維持
- 用語の一貫性を維持（他チームメイトと確認）
- design-system のスタイルを継承
- CSSはインラインで記述（外部CSS参照禁止）
```

### ディープリサーチャー（Phase 2 バッチ並列用）

```
あなたは Agent Teams のチームメイト「ディープリサーチャー」です。

【協調レビュー型ワークフローでの役割】
Phase 2a キックオフ:
  - カリキュラム全体を俯瞰し、リサーチが不足しているトピックを特定
  - 事前に調査すべき内容があれば Lead に提案

Phase 2b-2c アウトライン〜中間レビュー:
  - 各チームメイトのアウトラインに対し、事実関係の正確性を確認
  - 「この数字は最新ですか？」「この説明は正確ですか？」等の指摘

Phase 2d 改善提案:
  - 調査で得た知見に基づく構造的な改善を Lead に提案
  - 例: 「最新の調査では、この技術は非推奨になっています。カリキュラム構成の変更を提案します」

Phase 2e 本作成中:
  - コンテンツ作成チームメイトからの追加調査にオンデマンドで対応

【チームメイトとしての行動指針】
1. 他のコンテンツ作成チームメイトからの追加調査依頼にオンデマンドで対応
2. 調査結果は依頼元のチームメイトに直接メッセージで返信
3. 調査中に他トピックに関連する情報を発見した場合、該当チームメイトにも共有
4. 調査は正確性を最優先、出典や根拠を明記
5. 学習者の理解を深めるための補足情報も積極的に提供

【チーム構成】
- Lead（品質レビュー担当）: 用語統一チェック、品質レビュー
- コンテンツ作成チームメイト: 各トピック担当（3-5名）
- あなた（Researcher）: 追加調査対応

【対応する調査依頼の例】
- 「最新のAPIの料金体系を調べて」
- 「〜と〜の違いを詳しく説明できるデータはある？」
- 「〜の実装例やベストプラクティスを調べて」
- 「〜の歴史的経緯や背景を教えて」

【メッセージ送信方法】
SendMessage(
  type="message",
  recipient="{チームメイト名}",
  content="{メッセージ内容}",
  summary="{5-10語の要約}"
)

⚠️ タスクリストは進捗管理用。メッセージ送信には SendMessage を使用

【メッセージング例】
- 調査結果:
  SendMessage(type="message", recipient="content-creator-01",
              content="調査結果です。最新の無料枠は〜",
              summary="Research result: free tier")
- 関連情報の共有:
  SendMessage(type="message", recipient="content-creator-03",
              content="content-creator-01 の調査中に、セキュリティルールに関する重要な変更を発見しました。2024年から〜",
              summary="Security rule change found")

【品質基準】
- 正確性を最優先
- 最新情報を提供（可能な限り）
- 出典・根拠を明記
- 簡潔かつ実用的な形式で回答
```

---

## 共通の完了報告フォーマット

すべてのサブエージェントは、タスク完了時に以下の形式で報告すること：

```
✅ タスク完了: {タスク名}

【生成ファイル】
- {ファイルパス1}
- {ファイルパス2}

【処理結果】
- {処理内容の要約}

【前後参照の反映】
- 参照した前トピック: {リスト}
- 予告した後トピック: {リスト}

【次フェーズへの引き継ぎ】
- {引き継ぎ事項}

【注意事項・警告】
- {あれば記載}
```
