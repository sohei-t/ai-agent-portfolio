/**
 * i18n.js - Internationalization support (Japanese / English)
 */
const I18n = (() => {
  const STORAGE_KEY = 'ai-orchestrator-lang';

  const translations = {
    en: {
      // Header
      'sse.connected': 'Connected',
      'sse.connecting': 'Connecting...',
      'sse.disconnected': 'Disconnected',
      'sse.failed': 'Failed',
      'btn.shortcuts': 'Keyboard shortcuts (?)',
      'btn.settings': 'Open settings',

      // Summary cards
      'summary.running': 'Running',
      'summary.completed': 'Completed',
      'summary.failed': 'Failed',
      'summary.idle': 'Idle',

      // Tabs
      'tab.all': 'All',
      'tab.webdev': 'Web Dev',
      'tab.learn': 'Learn',
      'tab.gcp': 'GCP',
      'tab.skill': 'Skill',
      'tab.video': 'Video',

      // Search & Actions
      'search.placeholder': 'Search projects...',
      'btn.scan': 'Scan',
      'btn.register': 'Register',

      // Empty state
      'empty.title': 'No projects found',
      'empty.desc': 'Register a new project or scan your workspace to get started.',
      'empty.scan': 'Scan Directories',
      'empty.register': 'Register Manually',

      // Register modal
      'modal.title': 'Register Project',
      'modal.name': 'Project Name',
      'modal.name.hint': '2-100 characters, alphanumeric and hyphens',
      'modal.name.placeholder': 'e.g. my-todo-app',
      'modal.path': 'Project Path',
      'modal.path.hint': 'Absolute path to the project directory',
      'modal.path.placeholder': '/Users/sohei/Desktop/AI-Apps/...',
      'modal.agent': 'Agent Type',
      'modal.agent.webdev': 'Web App Development',
      'modal.agent.learn': 'Learning Content (Gemini)',
      'modal.agent.gcp': 'Learning Content (GCP)',
      'modal.agent.skill': 'Skill Publishing',
      'modal.agent.video': 'Video Generation',
      'modal.submit': 'Register',
      'modal.submitting': 'Registering...',

      // Keyboard shortcuts
      'shortcuts.title': 'Keyboard Shortcuts',
      'shortcuts.tabs': 'Switch tabs',
      'shortcuts.settings': 'Settings',
      'shortcuts.register': 'Register project',
      'shortcuts.reload': 'Reload projects',
      'shortcuts.search': 'Focus search',
      'shortcuts.toggle': 'Toggle shortcuts',
      'shortcuts.close': 'Close modal/panel',

      // Status labels
      'status.idle': 'Idle',
      'status.in_progress': 'In Progress',
      'status.completed': 'Completed',
      'status.failed': 'Failed',
      'status.paused': 'Paused',

      // Agent labels
      'agent.git-worktree-agent': 'Web Dev',
      'agent.learning-content-agent': 'Learn',
      'agent.learning-content-agent-gcp': 'GCP',
      'agent.skill-publish-agent': 'Skill',
      'agent.video-generator-agent': 'Video',

      // Progress card
      'card.toggle': 'Toggle details for',
      'card.copy': 'Copy project path',
      'card.copied': 'Copied!',
      'card.remove': 'Remove project',
      'card.nodata': 'No progress data yet',
      'card.nophase': 'No phase data available',

      // Time
      'time.now': 'just now',
      'time.min': 'm ago',
      'time.hour': 'h ago',
      'time.day': 'd ago',

      // Toasts
      'toast.scan': 'Scanning directories...',
      'toast.scan.result': 'Found {new} new, {existing} existing',
      'toast.scan.fail': 'Scan failed',
      'toast.register.ok': 'Registered: {name}',
      'toast.register.fail': 'Registration failed',
      'toast.removed': 'Project removed',
      'toast.remove.fail': 'Failed to remove',
      'toast.reload': 'Reloading projects...',
      'toast.settings': 'Settings panel coming soon',
      'toast.network': 'Network error',
      'toast.added': 'Project added: {name}',
      'toast.copy.fail': 'Failed to copy',
      'toast.error': 'Error: {message}',

      // Confirm
      'confirm.remove': 'Remove this project from monitoring?',

      // Accessibility
      'a11y.skip': 'Skip to main content',
      'a11y.summary': 'Project status summary',
      'a11y.tabs': 'Filter by agent type',
      'a11y.actions': 'Project actions',
      'a11y.grid': 'Project cards',
      'a11y.showing': 'Showing {tab}',
      'a11y.all': 'All projects',
      'a11y.path_copied': 'Path copied to clipboard',

      // Validation
      'validate.name': 'Name must be at least 2 characters',
      'validate.path': 'Please enter an absolute path starting with /',
    },
    ja: {
      // Header
      'sse.connected': '接続中',
      'sse.connecting': '接続しています...',
      'sse.disconnected': '切断',
      'sse.failed': '接続失敗',
      'btn.shortcuts': 'ショートカット (?)',
      'btn.settings': '設定を開く',

      // Summary cards
      'summary.running': '実行中',
      'summary.completed': '完了',
      'summary.failed': '失敗',
      'summary.idle': '待機中',

      // Tabs
      'tab.all': 'すべて',
      'tab.webdev': 'Web開発',
      'tab.learn': '学習',
      'tab.gcp': 'GCP',
      'tab.skill': 'スキル',
      'tab.video': '動画',

      // Search & Actions
      'search.placeholder': 'プロジェクトを検索...',
      'btn.scan': 'スキャン',
      'btn.register': '登録',

      // Empty state
      'empty.title': 'プロジェクトが見つかりません',
      'empty.desc': '新しいプロジェクトを登録するか、ワークスペースをスキャンしてください。',
      'empty.scan': 'ディレクトリをスキャン',
      'empty.register': '手動で登録',

      // Register modal
      'modal.title': 'プロジェクト登録',
      'modal.name': 'プロジェクト名',
      'modal.name.hint': '2〜100文字、英数字とハイフン',
      'modal.name.placeholder': '例: my-todo-app',
      'modal.path': 'プロジェクトパス',
      'modal.path.hint': 'プロジェクトディレクトリの絶対パス',
      'modal.path.placeholder': '/Users/sohei/Desktop/AI-Apps/...',
      'modal.agent': 'エージェントタイプ',
      'modal.agent.webdev': 'Webアプリ開発',
      'modal.agent.learn': '学習コンテンツ (Gemini)',
      'modal.agent.gcp': '学習コンテンツ (GCP)',
      'modal.agent.skill': 'スキル公開',
      'modal.agent.video': '動画生成',
      'modal.submit': '登録',
      'modal.submitting': '登録中...',

      // Keyboard shortcuts
      'shortcuts.title': 'キーボードショートカット',
      'shortcuts.tabs': 'タブ切り替え',
      'shortcuts.settings': '設定',
      'shortcuts.register': 'プロジェクト登録',
      'shortcuts.reload': 'プロジェクト再読み込み',
      'shortcuts.search': '検索にフォーカス',
      'shortcuts.toggle': 'ショートカット表示切替',
      'shortcuts.close': 'モーダル/パネルを閉じる',

      // Status labels
      'status.idle': '待機中',
      'status.in_progress': '実行中',
      'status.completed': '完了',
      'status.failed': '失敗',
      'status.paused': '一時停止',

      // Agent labels
      'agent.git-worktree-agent': 'Web開発',
      'agent.learning-content-agent': '学習',
      'agent.learning-content-agent-gcp': 'GCP',
      'agent.skill-publish-agent': 'スキル',
      'agent.video-generator-agent': '動画',

      // Progress card
      'card.toggle': '詳細を表示/非表示:',
      'card.copy': 'パスをコピー',
      'card.copied': 'コピーしました！',
      'card.remove': 'プロジェクトを削除',
      'card.nodata': '進捗データはまだありません',
      'card.nophase': 'フェーズデータがありません',

      // Time
      'time.now': 'たった今',
      'time.min': '分前',
      'time.hour': '時間前',
      'time.day': '日前',

      // Toasts
      'toast.scan': 'ディレクトリをスキャン中...',
      'toast.scan.result': '新規 {new} 件、既存 {existing} 件を検出',
      'toast.scan.fail': 'スキャンに失敗しました',
      'toast.register.ok': '登録完了: {name}',
      'toast.register.fail': '登録に失敗しました',
      'toast.removed': 'プロジェクトを削除しました',
      'toast.remove.fail': '削除に失敗しました',
      'toast.reload': 'プロジェクトを再読み込み中...',
      'toast.settings': '設定パネルは近日公開予定です',
      'toast.network': 'ネットワークエラー',
      'toast.added': 'プロジェクト追加: {name}',
      'toast.copy.fail': 'コピーに失敗しました',
      'toast.error': 'エラー: {message}',

      // Confirm
      'confirm.remove': 'このプロジェクトの監視を解除しますか？',

      // Accessibility
      'a11y.skip': 'メインコンテンツへスキップ',
      'a11y.summary': 'プロジェクトステータス概要',
      'a11y.tabs': 'エージェントタイプでフィルタ',
      'a11y.actions': 'プロジェクト操作',
      'a11y.grid': 'プロジェクトカード',
      'a11y.showing': '{tab} を表示中',
      'a11y.all': 'すべてのプロジェクト',
      'a11y.path_copied': 'パスをクリップボードにコピーしました',

      // Validation
      'validate.name': '名前は2文字以上で入力してください',
      'validate.path': '/ で始まる絶対パスを入力してください',
    },
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || 'ja';

  function t(key, params) {
    const dict = translations[currentLang] || translations.en;
    let text = dict[key] || translations.en[key] || key;
    if (params) {
      Object.keys(params).forEach((k) => {
        text = text.replace(`{${k}}`, params[k]);
      });
    }
    return text;
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations();
    // Dispatch event for dynamic components
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function applyTranslations() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    // Translate titles
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  }

  return { t, getLang, setLang, applyTranslations };
})();

if (typeof window !== 'undefined') {
  window.I18n = I18n;
}
