# HTMLスライド API仕様書 (Progressive Enhancement方式)

## 1. 概要

このドキュメントでは、HTMLスライドコンテンツとプラットフォームアプリ間の標準インターフェースを定義します。

### 設計思想: Progressive Enhancement

- **単独動作**: コンテンツは単体でも完全に動作する（他プラットフォームでも使用可能）
- **外部制御対応**: プラットフォームがコンテンツを検出・制御できるAPIを公開
- **UIの切り替え**: プラットフォームはコンテンツのナビゲーションUIを非表示にして自前UIで制御可能

---

## 2. window.slideAPI インターフェース

コンテンツは以下のグローバルAPIを公開します：

```javascript
window.slideAPI = {
  // ===== 読み取り専用 =====

  /** 総スライド数を取得 */
  getTotalSlides: function() { return totalSlides; },

  /** 現在のスライド番号を取得（1から開始） */
  getCurrentSlide: function() { return currentSlide; },

  /** APIバージョン */
  version: "1.0",

  // ===== スライド操作 =====

  /** 指定スライドへ移動（1から開始） */
  showSlide: function(n) { ... },

  /** 次のスライドへ */
  nextSlide: function() { ... },

  /** 前のスライドへ */
  prevSlide: function() { ... },

  /** 最初のスライドへ */
  firstSlide: function() { ... },

  /** 最後のスライドへ */
  lastSlide: function() { ... },

  // ===== UI制御 =====

  /** コンテンツ内ナビゲーションを非表示にする */
  hideContentNav: function() { ... },

  /** コンテンツ内ナビゲーションを表示する */
  showContentNav: function() { ... },

  /** プラットフォーム制御モードを設定 */
  setPlatformControlled: function(enabled) { ... },

  // ===== イベントコールバック =====

  /** スライド変更時のコールバック（プラットフォームが設定） */
  onSlideChange: null,  // function(slideNum, totalSlides) { ... }
};
```

---

## 3. window.slideTimestamps（オプション）

音声と同期する場合、タイムスタンプ情報を公開します：

```javascript
window.slideTimestamps = [
  { slide: 1, startTime: 0 },       // スライド1: 0秒から
  { slide: 2, startTime: 45.5 },    // スライド2: 45.5秒から
  { slide: 3, startTime: 92.0 },    // スライド3: 92秒から
  // ...
];
```

**注意**: タイムスタンプは音声生成時に自動計算される場合があります。

---

## 4. CSS クラス規約

### 4.1. ナビゲーション要素

```html
<!-- コンテンツのナビゲーション -->
<nav class="navigation content-nav">
  <button class="nav-btn content-nav-btn" onclick="goToPrevious()">⬅️ 前へ</button>
  <button class="nav-btn content-nav-btn" onclick="goToFirst()">🏠 最初へ</button>
  <button class="nav-btn content-nav-btn" onclick="goToNext()">次へ ➡️</button>
</nav>
```

**必須クラス**:
- `.content-nav`: ナビゲーションコンテナ
- `.content-nav-btn`: ナビゲーションボタン

**onclick属性で使用する関数名は以下に限定すること:**
- `goToNext()`, `goToPrevious()`, `goToFirst()`, `goToLast()`, `showSlide(n)`
- エイリアス: `nextSlide()`, `prevSlide()`, `goToSlide(n)`
- これ以外の関数名（changeSlide, navigate 等）は禁止

### 4.2. プラットフォーム制御時の非表示

```css
/* プラットフォームが制御する場合、コンテンツのナビゲーションを非表示 */
body.platform-controlled .content-nav {
  display: none !important;
}
```

---

## 5. プラットフォーム側の実装例

### 5.1. slideAPI検出

```javascript
// iframeのコンテンツがslideAPIを持っているか確認
function detectSlideAPI(iframe) {
  try {
    const contentWindow = iframe.contentWindow;
    if (contentWindow && contentWindow.slideAPI) {
      return contentWindow.slideAPI;
    }
  } catch (e) {
    // クロスオリジンエラーの場合はnull
    console.warn('slideAPI detection failed:', e);
  }
  return null;
}
```

### 5.2. プラットフォーム制御モードの有効化

```javascript
// iframeロード後に実行
iframe.onload = function() {
  const api = detectSlideAPI(iframe);
  if (api) {
    // プラットフォーム制御モードを有効化
    api.setPlatformControlled(true);

    // スライド変更のコールバックを設定
    api.onSlideChange = function(slideNum, total) {
      updatePlatformUI(slideNum, total);
    };

    // 初期状態を取得
    const total = api.getTotalSlides();
    const current = api.getCurrentSlide();
    updatePlatformUI(current, total);
  }
};
```

### 5.3. プラットフォームUIからの制御

```javascript
// プラットフォームの「次へ」ボタン
function onPlatformNextClick() {
  const api = detectSlideAPI(iframe);
  if (api) {
    api.nextSlide();
  }
}

// プラットフォームの「前へ」ボタン
function onPlatformPrevClick() {
  const api = detectSlideAPI(iframe);
  if (api) {
    api.prevSlide();
  }
}
```

### 5.4. 音声同期（オプション）

```javascript
// 音声の再生位置に基づいてスライドを自動切り替え
function syncSlideWithAudio(audioElement) {
  const iframe = document.getElementById('slideIframe');
  const contentWindow = iframe.contentWindow;

  if (!contentWindow || !contentWindow.slideTimestamps) return;

  const timestamps = contentWindow.slideTimestamps;
  const currentTime = audioElement.currentTime;

  // 現在の再生位置に対応するスライドを特定
  let targetSlide = 1;
  for (const ts of timestamps) {
    if (currentTime >= ts.startTime) {
      targetSlide = ts.slide;
    } else {
      break;
    }
  }

  // スライドが変わった場合のみ更新
  const api = contentWindow.slideAPI;
  if (api && api.getCurrentSlide() !== targetSlide) {
    api.showSlide(targetSlide);
  }
}

// タイムアップデートイベントで同期
audioElement.addEventListener('timeupdate', () => {
  syncSlideWithAudio(audioElement);
});
```

---

## 6. キーボードショートカットの競合回避

### 6.1. コンテンツ側の対応

```javascript
// プラットフォーム制御モード時はキーボード操作を無効化
document.addEventListener('keydown', (e) => {
  // プラットフォーム制御モードの場合はイベントを処理しない
  if (document.body.classList.contains('platform-controlled')) {
    return;
  }

  // 通常の操作
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault();
    goToNext();
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    goToPrevious();
  }
});
```

### 6.2. プラットフォーム側の対応

プラットフォームはキーボードイベントを親ウィンドウで処理し、slideAPIを通じてコンテンツを制御します。

---

## 7. 完全な実装例（コンテンツ側）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>スライドタイトル</title>
  <style>
    /* 🚨 スクロール・高さの必須ルール */
    body { margin: 0; padding: 0; }
    .slides-container {
      position: relative;
      width: 100%;
      height: calc(100dvh - var(--nav-height, 64px));
      height: calc(100vh - var(--nav-height, 64px)); /* fallback */
      overflow: hidden;
    }
    .slide {
      display: none;
      position: absolute;
      inset: 0;
      padding: 40px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .slide.active { display: flex; flex-direction: column; justify-content: center; align-items: center; }

    /* ❌ 以下は禁止:
       body { overflow: hidden; height: 100vh; }
       .slides-container { overflow: hidden; }  （heightなしの場合）
    */

    /* コードブロック共通（white-space: pre-wrap 必須） */
    .code-block, pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    /* プラットフォーム制御時にコンテンツナビゲーションを非表示 */
    body.platform-controlled .content-nav {
      display: none !important;
    }
  </style>
</head>
<body>
  <!-- スライドコンテナ -->
  <div class="slides-container" id="slidesContainer">
    <div class="slide active">スライド1</div>
    <div class="slide">スライド2</div>
    <div class="slide">スライド3</div>
  </div>

  <!-- ナビゲーション（content-navクラス付き） -->
  <nav class="navigation content-nav">
    <button class="nav-btn content-nav-btn" id="prevBtn" onclick="goToPrevious()">⬅️ 前へ</button>
    <button class="nav-btn content-nav-btn" onclick="goToFirst()">🏠 最初へ</button>
    <button class="nav-btn content-nav-btn" id="nextBtn" onclick="goToNext()">次へ ➡️</button>
  </nav>

  <script>
    // スライド状態
    let currentSlide = 1;
    let totalSlides = 0;

    // スライド情報を更新
    function updateSlideInfo() {
      const slides = document.querySelectorAll('.slide');
      totalSlides = slides.length;

      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index + 1 === currentSlide) {
          slide.classList.add('active');
        }
      });

      // ボタン状態更新
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      if (prevBtn) prevBtn.disabled = (currentSlide === 1);
      if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides);

      // スライド番号表示更新
      const slideNum = document.getElementById('slideNumber');
      if (slideNum) {
        slideNum.textContent = `Step (${currentSlide}/${totalSlides})`;
      }

      // コールバック呼び出し
      if (window.slideAPI && window.slideAPI.onSlideChange) {
        window.slideAPI.onSlideChange(currentSlide, totalSlides);
      }
    }

    // ナビゲーション関数
    function showSlide(n) {
      if (n >= 1 && n <= totalSlides) {
        currentSlide = n;
        updateSlideInfo();
      }
    }

    function goToPrevious() {
      if (currentSlide > 1) {
        currentSlide--;
        updateSlideInfo();
      }
    }

    function goToNext() {
      if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlideInfo();
      }
    }

    function goToFirst() {
      currentSlide = 1;
      updateSlideInfo();
    }

    function goToLast() {
      currentSlide = totalSlides;
      updateSlideInfo();
    }

    // キーボードショートカット（プラットフォーム制御時は無効）
    document.addEventListener('keydown', (e) => {
      if (document.body.classList.contains('platform-controlled')) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      }
    });

    // ===== slideAPI公開 =====
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

      // イベント
      onSlideChange: null
    };

    // オプション: 音声同期用タイムスタンプ
    // window.slideTimestamps = [
    //   { slide: 1, startTime: 0 },
    //   { slide: 2, startTime: 45.5 },
    //   ...
    // ];

    // 初期化
    window.onload = updateSlideInfo;
  </script>
</body>
</html>
```

---

## 8. 互換性

| 環境 | 対応状況 |
|------|----------|
| 単独表示（ブラウザ直接） | ✅ 完全動作 |
| personal-video-platform | ✅ slideAPI連携 |
| AIKENシステム | ✅ 単独動作 |
| 他プラットフォーム | ✅ slideAPI検出時は連携、なければ単独動作 |

---

## 9. バージョン履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|----------|
| 1.0 | 2026-01-18 | 初版作成 |
| 1.1 | 2026-02-24 | onclick関数名制約追加、コードブロックCSS必須ルール追加 |
