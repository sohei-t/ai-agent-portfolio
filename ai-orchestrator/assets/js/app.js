/**
 * app.js - Application initialization, event wiring, keyboard shortcuts
 * Improvements: keyboard shortcuts, form validation, modal trap focus,
 *               toast icons, register-empty button, shortcuts panel
 */
(function () {
  'use strict';

  // Wait for DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const grid = document.getElementById('projects-grid');
    const progressCard = new ProgressCard(grid);
    const dashboard = new Dashboard(progressCard);

    // SSE Client
    const sseClient = new SSEClient('/api/events');

    // Wire up SSE status indicator
    sseClient.onStatusChange((status) => {
      const icon = document.getElementById('sse-icon');
      const text = document.getElementById('sse-text');
      if (icon) {
        icon.className = `w-2 h-2 rounded-full ${status}`;
      }
      if (text) {
        const key = `sse.${status}`;
        text.textContent = I18n.t(key);
      }
    });

    // SSE event handlers
    sseClient.on('progress_update', (data) => {
      if (data && data.projectPath) {
        dashboard.loadProjects();
      }
    });

    sseClient.on('project_added', (project) => {
      if (project && project.id) {
        dashboard.setProject(project);
        showToast(I18n.t('toast.added', { name: project.name }), 'success');
      }
    });

    sseClient.on('project_removed', (data) => {
      if (data && data.id) {
        dashboard.removeProject(data.id);
      }
    });

    sseClient.on('heartbeat', () => {
      // Connection alive
    });

    sseClient.on('error', (data) => {
      showToast(I18n.t('toast.error', { message: data.error ? data.error.message : 'Unknown' }), 'error');
    });

    // Initialize dashboard
    dashboard.init();
    dashboard.loadProjects();

    // Connect SSE
    sseClient.connect();

    // Delete handler
    progressCard.onDelete = async (projectId) => {
      if (!confirm(I18n.t('confirm.remove'))) return;
      try {
        const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
        if (res.ok) {
          dashboard.removeProject(projectId);
          showToast(I18n.t('toast.removed'), 'success');
        } else {
          const err = await res.json();
          showToast(err.error || I18n.t('toast.remove.fail'), 'error');
        }
      } catch (err) {
        showToast(I18n.t('toast.network'), 'error');
      }
    };

    // ===== Modal Management =====
    const modal = document.getElementById('register-modal');
    const btnRegister = document.getElementById('btn-register');
    const btnRegisterEmpty = document.getElementById('btn-register-empty');
    const btnClose = document.getElementById('btn-close-modal');
    const registerForm = document.getElementById('register-form');

    function openModal() {
      if (!modal) return;
      modal.classList.add('show');
      // Focus first input after animation
      setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 100);
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('show');
      // Return focus to register button
      if (btnRegister) btnRegister.focus();
    }

    if (btnRegister) {
      btnRegister.addEventListener('click', openModal);
    }

    if (btnRegisterEmpty) {
      btnRegisterEmpty.addEventListener('click', openModal);
    }

    if (btnClose) {
      btnClose.addEventListener('click', closeModal);
    }

    // Close modal on backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      // Trap focus inside modal when open
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeModal();
          return;
        }

        if (e.key === 'Tab') {
          const focusable = modal.querySelectorAll(
            'input, select, button, [tabindex]:not([tabindex="-1"])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
    }

    // ===== Form Submission with Validation =====
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        registerForm.querySelectorAll('.field-error').forEach((el) => el.remove());

        const formData = new FormData(registerForm);
        const body = {
          name: formData.get('name'),
          path: formData.get('path'),
          agent_type: formData.get('agent_type'),
        };

        // Client-side validation
        let hasError = false;

        if (!body.name || body.name.trim().length < 2) {
          showFieldError('field-name', I18n.t('validate.name'));
          hasError = true;
        }

        if (!body.path || !body.path.startsWith('/')) {
          showFieldError('field-path', I18n.t('validate.path'));
          hasError = true;
        }

        if (hasError) return;

        const submitBtn = registerForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = I18n.t('modal.submitting');
        }

        try {
          const res = await fetch('/api/projects/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });

          if (res.ok) {
            const project = await res.json();
            dashboard.setProject(project);
            closeModal();
            registerForm.reset();
            showToast(I18n.t('toast.register.ok', { name: project.name }), 'success');
          } else {
            const err = await res.json();
            showToast(err.error || I18n.t('toast.register.fail'), 'error');
          }
        } catch (err) {
          showToast(I18n.t('toast.network'), 'error');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = I18n.t('modal.submit');
          }
        }
      });
    }

    /**
     * Show field-level validation error
     */
    function showFieldError(inputId, message) {
      const input = document.getElementById(inputId);
      if (!input) return;

      const existing = input.parentElement.querySelector('.field-error');
      if (existing) existing.remove();

      const error = document.createElement('p');
      error.className = 'field-error';
      error.textContent = message;
      error.setAttribute('role', 'alert');
      input.parentElement.appendChild(error);
      input.focus();
    }

    // ===== Scan Button =====
    const btnScan = document.getElementById('btn-scan');
    const btnScanEmpty = document.getElementById('btn-scan-empty');

    const doScan = async () => {
      try {
        showToast(I18n.t('toast.scan'), 'info');
        const res = await fetch('/api/projects/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (res.ok) {
          const data = await res.json();
          showToast(I18n.t('toast.scan.result', { new: data.added.length, existing: data.existing.length }), 'success');
          dashboard.loadProjects();
        } else {
          showToast(I18n.t('toast.scan.fail'), 'error');
        }
      } catch (err) {
        showToast(I18n.t('toast.network'), 'error');
      }
    };

    if (btnScan) btnScan.addEventListener('click', doScan);
    if (btnScanEmpty) btnScanEmpty.addEventListener('click', doScan);

    // ===== Settings Button =====
    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        showToast(I18n.t('toast.settings'), 'info');
      });
    }

    // ===== Keyboard Shortcuts Panel =====
    const shortcutsPanel = document.getElementById('shortcuts-panel');
    const btnShortcuts = document.getElementById('btn-shortcuts');
    const btnCloseShortcuts = document.getElementById('btn-close-shortcuts');

    function toggleShortcuts() {
      if (!shortcutsPanel) return;
      shortcutsPanel.classList.toggle('hidden');
    }

    if (btnShortcuts) {
      btnShortcuts.addEventListener('click', toggleShortcuts);
    }

    if (btnCloseShortcuts) {
      btnCloseShortcuts.addEventListener('click', () => {
        if (shortcutsPanel) shortcutsPanel.classList.add('hidden');
      });
    }

    // ===== Keyboard Shortcuts =====
    document.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        if (e.key === 'Escape') {
          target.blur();
        }
        return;
      }

      // Don't trigger with modifier keys (except shift for ?)
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const tabs = document.querySelectorAll('.tab-btn');
      const tabArray = Array.from(tabs);

      switch (e.key) {
        case '1':
          e.preventDefault();
          if (tabArray[0]) dashboard.setActiveTab(tabArray[0].dataset.tab);
          break;
        case '2':
          e.preventDefault();
          if (tabArray[1]) dashboard.setActiveTab(tabArray[1].dataset.tab);
          break;
        case '3':
          e.preventDefault();
          if (tabArray[2]) dashboard.setActiveTab(tabArray[2].dataset.tab);
          break;
        case '4':
          e.preventDefault();
          if (tabArray[3]) dashboard.setActiveTab(tabArray[3].dataset.tab);
          break;
        case 's':
        case 'S':
          e.preventDefault();
          if (btnSettings) btnSettings.click();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          openModal();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          showToast(I18n.t('toast.reload'), 'info');
          dashboard.loadProjects();
          break;
        case '/':
          e.preventDefault();
          const searchInput = document.getElementById('search-input');
          if (searchInput) searchInput.focus();
          break;
        case '?':
          e.preventDefault();
          toggleShortcuts();
          break;
        case 'Escape':
          // Close shortcuts panel
          if (shortcutsPanel && !shortcutsPanel.classList.contains('hidden')) {
            shortcutsPanel.classList.add('hidden');
          }
          break;
      }
    });

    // ===== Language Toggle =====
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      const updateLangButtons = () => {
        const lang = I18n.getLang();
        langToggle.querySelectorAll('.lang-btn').forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.lang === lang);
        });
      };

      langToggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (btn && btn.dataset.lang) {
          I18n.setLang(btn.dataset.lang);
          updateLangButtons();
          // Re-render cards with new language
          dashboard.filterAndRender();
        }
      });

      // Listen for language change events (e.g. from other components)
      window.addEventListener('langchange', () => {
        updateLangButtons();
        dashboard.filterAndRender();
      });

      // Set initial active state
      updateLangButtons();
    }

    // ===== Init i18n =====
    I18n.applyTranslations();

    // ===== Init Lucide Icons =====
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // ===== Toast Notification System =====
  const TOAST_ICONS = {
    success: '<svg class="toast-icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#10b981" stroke-width="1.5"/><path d="M5 8l2 2 4-4" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error: '<svg class="toast-icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#ef4444" stroke-width="1.5"/><path d="M6 6l4 4M10 6l-4 4" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>',
    info: '<svg class="toast-icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3b82f6" stroke-width="1.5"/><path d="M8 7v4M8 5.5v0" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg>',
    warning: '<svg class="toast-icon" viewBox="0 0 16 16" fill="none"><path d="M8 2L1 14h14L8 2z" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6v4M8 12v0" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  /**
   * Show a toast notification
   * @param {string} message
   * @param {string} type - 'success' | 'error' | 'info' | 'warning'
   */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');

    const icon = TOAST_ICONS[type] || TOAST_ICONS.info;
    toast.innerHTML = `${icon}<span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    // Auto-remove
    setTimeout(() => {
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
  }

  /**
   * Escape HTML for safe rendering
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Export for use in other scripts
  if (typeof window !== 'undefined') {
    window.showToast = showToast;
  }
})();
