/**
 * progress-card.js - Progress card UI component
 * Improvements: shimmer animation control, hover glow, left border accent,
 *               copy path button, ARIA attributes, semantic HTML
 */
class ProgressCard {
  constructor(container) {
    this.container = container;
    this.cards = new Map();
    this.onDelete = null;
  }

  static AGENT_COLORS = {
    'git-worktree-agent': { bg: '#3B82F6', labelKey: 'agent.git-worktree-agent' },
    'learning-content-agent': { bg: '#10B981', labelKey: 'agent.learning-content-agent' },
    'learning-content-agent-gcp': { bg: '#F59E0B', labelKey: 'agent.learning-content-agent-gcp' },
    'skill-publish-agent': { bg: '#8B5CF6', labelKey: 'agent.skill-publish-agent' },
    'video-generator-agent': { bg: '#EF4444', labelKey: 'agent.video-generator-agent' },
  };

  static _agentLabel(agentType) {
    const agent = ProgressCard.AGENT_COLORS[agentType];
    if (!agent) return 'Unknown';
    return I18n.t(agent.labelKey);
  }

  static STATUS_ICONS = {
    pending: '\u2B1C',
    in_progress: '\uD83D\uDD04',
    completed: '\u2705',
    failed: '\u274C',
    skipped: '\u23ED\uFE0F',
    paused: '\u23F8\uFE0F',
  };

  static _statusLabel(status) {
    return I18n.t(`status.${status}`) || status;
  }

  /**
   * Render or update a project card
   */
  render(project) {
    if (this.cards.has(project.id)) {
      this.update(project);
    } else {
      this.create(project);
    }
  }

  /**
   * Create a new card
   */
  create(project) {
    const card = document.createElement('article');
    const agent = ProgressCard.AGENT_COLORS[project.agent_type] || { bg: '#64748b', labelKey: null };

    card.className = 'progress-card bg-slate-800 rounded-xl border border-slate-700 overflow-hidden';
    card.dataset.projectId = project.id;
    card.dataset.agentType = project.agent_type;
    card.style.setProperty('--card-accent-color', agent.bg);
    card.setAttribute('aria-label', `Project: ${this._escape(project.name)} - ${ProgressCard._statusLabel(project.status)}`);
    card.innerHTML = this._template(project);

    // Header click to expand/collapse
    const header = card.querySelector('.card-header');
    header.addEventListener('click', (e) => {
      // Don't toggle when clicking buttons inside header
      if (e.target.closest('button')) return;
      const isExpanded = card.classList.toggle('expanded');
      header.setAttribute('aria-expanded', isExpanded);
    });

    // Keyboard support for expand/collapse
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (e.target.closest('button')) return;
        const isExpanded = card.classList.toggle('expanded');
        header.setAttribute('aria-expanded', isExpanded);
      }
    });

    // Delete button
    const deleteBtn = card.querySelector('.btn-delete');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onDelete) {
          this.onDelete(project.id);
        }
      });
    }

    // Copy path button
    const copyBtn = card.querySelector('.btn-copy');
    if (copyBtn && project.path) {
      copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._copyToClipboard(project.path, copyBtn);
      });
    }

    this.container.appendChild(card);
    this.cards.set(project.id, card);

    // Trigger enter animation
    requestAnimationFrame(() => card.classList.add('card-enter'));
  }

  /**
   * Update existing card data with diff-based approach
   */
  update(project) {
    const card = this.cards.get(project.id);
    if (!card) return;

    const agent = ProgressCard.AGENT_COLORS[project.agent_type] || { bg: '#64748b', labelKey: null };
    const percent = project.progress_percent || 0;
    const status = project.status || 'idle';

    // Update progress bar with shimmer
    const bar = card.querySelector('.progress-bar-fill');
    if (bar) {
      const currentWidth = bar.style.width;
      const newWidth = `${percent}%`;
      if (currentWidth !== newWidth) {
        bar.style.width = newWidth;
      }
      // Add shimmer only when in_progress
      if (status === 'in_progress') {
        bar.classList.add('shimmer');
      } else {
        bar.classList.remove('shimmer');
      }
    }

    // Update percent text
    const percentText = card.querySelector('.percent-text');
    if (percentText && percentText.textContent !== `${percent}%`) {
      percentText.textContent = `${percent}%`;
    }

    // Update status dot
    const statusDot = card.querySelector('.status-dot');
    if (statusDot) {
      statusDot.className = `status-dot ${status}`;
    }

    // Update status text
    const statusText = card.querySelector('.status-text');
    if (statusText) {
      const label = ProgressCard._statusLabel(status);
      if (statusText.textContent !== label) {
        statusText.textContent = label;
      }
    }

    // Update phase
    const phaseText = card.querySelector('.phase-text');
    if (phaseText) {
      const phase = project.current_phase || '--';
      if (phaseText.textContent !== phase) {
        phaseText.textContent = phase;
      }
    }

    // Update timestamp
    const timeText = card.querySelector('.time-text');
    if (timeText) {
      timeText.textContent = this._relativeTime(project.updated_at);
    }

    // Update details if expanded
    const details = card.querySelector('.card-details-content');
    if (details && project.progress_data) {
      details.innerHTML = this._detailsTemplate(project.progress_data);
    }

    // Update ARIA label
    card.setAttribute('aria-label', `Project: ${this._escape(project.name)} - ${ProgressCard._statusLabel(status)}`);

    // Pulse animation (avoid re-triggering if already pulsing)
    if (!card.classList.contains('card-pulse')) {
      card.classList.add('card-pulse');
      setTimeout(() => card.classList.remove('card-pulse'), 1000);
    }
  }

  /**
   * Remove a card with exit animation
   */
  remove(projectId) {
    const card = this.cards.get(projectId);
    if (card) {
      card.classList.add('card-exit');
      card.addEventListener('animationend', () => {
        card.remove();
        this.cards.delete(projectId);
      });
    }
  }

  /**
   * Clear all cards
   */
  clear() {
    for (const [, card] of this.cards) {
      card.remove();
    }
    this.cards.clear();
  }

  /**
   * Copy text to clipboard and provide visual feedback
   */
  async _copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      button.classList.add('copied');
      button.setAttribute('aria-label', I18n.t('card.copied'));

      // Announce to screen readers
      const announcer = document.getElementById('sr-announcer');
      if (announcer) {
        announcer.textContent = I18n.t('a11y.path_copied');
      }

      setTimeout(() => {
        button.classList.remove('copied');
        button.setAttribute('aria-label', I18n.t('card.copy'));
      }, 2000);
    } catch {
      // Fallback
      if (typeof window.showToast === 'function') {
        window.showToast(I18n.t('toast.copy.fail'), 'error');
      }
    }
  }

  /**
   * Card HTML template with semantic elements
   */
  _template(project) {
    const agent = ProgressCard.AGENT_COLORS[project.agent_type] || { bg: '#64748b', labelKey: null };
    const agentLabel = ProgressCard._agentLabel(project.agent_type);
    const percent = project.progress_percent || 0;
    const status = project.status || 'idle';
    const statusLabel = ProgressCard._statusLabel(status);
    const phase = project.current_phase || '--';
    const time = this._relativeTime(project.updated_at);
    const shimmerClass = status === 'in_progress' ? 'shimmer' : '';

    return `
      <div class="card-header cursor-pointer p-4 hover:bg-slate-750 transition-colors"
           role="button" tabindex="0"
           aria-expanded="false"
           aria-label="${I18n.t('card.toggle')} ${this._escape(project.name)}">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2 min-w-0">
            <span class="status-dot ${status}" aria-hidden="true"></span>
            <h3 class="font-semibold text-sm truncate">${this._escape(project.name)}</h3>
            <span class="agent-badge ${project.agent_type}" aria-label="${agentLabel}">${agentLabel}</span>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="percent-text text-sm font-mono font-bold" style="color: ${agent.bg}" aria-label="${percent}%">${percent}%</span>
            <i data-lucide="chevron-down" class="card-chevron w-4 h-4 text-slate-500" aria-hidden="true"></i>
          </div>
        </div>

        <div class="progress-bar mb-2" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" aria-label="${percent}%">
          <div class="progress-bar-fill ${shimmerClass}" style="width: ${percent}%; background-color: ${agent.bg}"></div>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500">
          <div class="flex items-center gap-3">
            <span class="status-text">${statusLabel}</span>
            <span class="phase-text">${this._escape(phase)}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="time-text" title="${project.updated_at || ''}">${time}</span>
            ${project.path ? `
            <button class="btn-copy p-1 rounded hover:bg-slate-700 transition-colors" title="${I18n.t('card.copy')}" aria-label="${I18n.t('card.copy')}">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            </button>` : ''}
            <button class="btn-delete p-1 rounded hover:bg-red-900/30 hover:text-red-400 transition-colors" title="${I18n.t('card.remove')}" aria-label="${I18n.t('card.remove')} ${this._escape(project.name)}">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="card-details" aria-hidden="true">
        <div class="card-details-content border-t border-slate-700 p-4">
          ${project.progress_data ? this._detailsTemplate(project.progress_data) : `<p class="text-xs text-slate-500">${I18n.t('card.nodata')}</p>`}
        </div>
      </div>
    `;
  }

  /**
   * Details panel template (phases + steps)
   */
  _detailsTemplate(data) {
    if (!data || !data.phases) {
      return `<p class="text-xs text-slate-500">${I18n.t('card.nophase')}</p>`;
    }

    return data.phases.map((phase) => {
      const statusIcon = ProgressCard.STATUS_ICONS[phase.status] || '\u2B1C';
      const steps = phase.steps || [];

      return `
        <div class="mb-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm" aria-hidden="true">${statusIcon}</span>
            <span class="text-xs font-medium ${phase.status === 'completed' ? 'text-slate-400' : 'text-slate-200'}">${this._escape(phase.name)}</span>
          </div>
          ${steps.length > 0 ? `
            <ul class="ml-6 space-y-0.5" role="list">
              ${steps.map(step => `
                <li class="step-item ${step.done ? 'done' : 'pending'}">
                  <span aria-hidden="true">${step.done ? '\u2705' : '\u2B1C'}</span>
                  <span>${this._escape(step.name)}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  /**
   * Convert timestamp to relative time string
   */
  _relativeTime(timestamp) {
    if (!timestamp) return '--';
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const diffMs = now - then;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return I18n.t('time.now');
    if (diffMin < 60) return `${diffMin}${I18n.t('time.min')}`;
    if (diffHr < 24) return `${diffHr}${I18n.t('time.hour')}`;
    return `${diffDay}${I18n.t('time.day')}`;
  }

  /**
   * Escape HTML to prevent XSS
   */
  _escape(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

if (typeof window !== 'undefined') {
  window.ProgressCard = ProgressCard;
}
