/**
 * dashboard.js - Dashboard tab management, filtering, and summary
 * Improvements: counter animation, tab keyboard nav, optimized timestamp updates
 */
class Dashboard {
  constructor(progressCard) {
    this.card = progressCard;
    this.projects = new Map();
    this.activeTab = 'all';
    this.searchTerm = '';
    this.timeUpdateInterval = null;
    this._previousCounts = { running: -1, completed: -1, failed: -1, idle: -1 };
  }

  /**
   * Initialize dashboard event listeners
   */
  init() {
    // Tab clicks
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setActiveTab(btn.dataset.tab);
      });
    });

    // Tab keyboard navigation (arrow keys)
    const tabList = document.getElementById('tabs');
    if (tabList) {
      tabList.addEventListener('keydown', (e) => {
        const tabArray = Array.from(tabs);
        const currentIndex = tabArray.findIndex((t) => t.dataset.tab === this.activeTab);

        let newIndex = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabArray.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = tabArray.length - 1;
        }

        if (newIndex >= 0) {
          tabArray[newIndex].focus();
          this.setActiveTab(tabArray[newIndex].dataset.tab);
        }
      });
    }

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.searchTerm = e.target.value.toLowerCase();
          this.filterAndRender();
        }, 150);
      });
    }

    // Periodically update relative times (1 minute interval)
    this.timeUpdateInterval = setInterval(() => {
      this._updateTimestampsInPlace();
    }, 60000);
  }

  /**
   * Set active tab and re-render
   */
  setActiveTab(tab) {
    this.activeTab = tab;

    // Update tab button styles and ARIA
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    this.filterAndRender();

    // Announce tab change to screen readers
    const announcer = document.getElementById('sr-announcer');
    if (announcer) {
      const tabLabel = tab === 'all' ? 'All projects' : tab;
      announcer.textContent = `Showing ${tabLabel}`;
    }
  }

  /**
   * Add or update a project
   */
  setProject(project) {
    this.projects.set(project.id, project);
    this.updateSummary();
    this.filterAndRender();
  }

  /**
   * Remove a project
   */
  removeProject(projectId) {
    this.projects.delete(projectId);
    this.card.remove(projectId);
    this.updateSummary();
    this.filterAndRender();
  }

  /**
   * Load all projects from API
   */
  async loadProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();

      this.projects.clear();
      this.card.clear();

      if (data.projects) {
        data.projects.forEach((p) => {
          this.projects.set(p.id, p);
        });
      }

      this.updateSummary();
      this.filterAndRender();
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  }

  /**
   * Filter projects based on active tab and search, then render
   */
  filterAndRender() {
    let filtered = Array.from(this.projects.values());

    // Filter by tab
    if (this.activeTab !== 'all') {
      filtered = filtered.filter((p) => p.agent_type === this.activeTab);
    }

    // Filter by search
    if (this.searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(this.searchTerm)
      );
    }

    // Sort by updated_at desc
    filtered.sort((a, b) => {
      const aTime = new Date(a.updated_at || 0).getTime();
      const bTime = new Date(b.updated_at || 0).getTime();
      return bTime - aTime;
    });

    // Clear and re-render visible cards
    this.card.clear();
    filtered.forEach((p) => this.card.render(p));

    // Show/hide empty state
    const emptyState = document.getElementById('empty-state');
    const grid = document.getElementById('projects-grid');
    if (emptyState && grid) {
      if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        grid.classList.add('hidden');
      } else {
        emptyState.classList.add('hidden');
        grid.classList.remove('hidden');
      }
    }

    // Re-init lucide icons for new elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /**
   * Update summary counts with animation
   */
  updateSummary() {
    const all = Array.from(this.projects.values());

    const counts = {
      running: all.filter((p) => p.status === 'in_progress').length,
      completed: all.filter((p) => p.status === 'completed').length,
      failed: all.filter((p) => p.status === 'failed').length,
      idle: all.filter((p) => ['idle', 'paused'].includes(p.status)).length,
    };

    this._animateCounter('count-running', counts.running, this._previousCounts.running);
    this._animateCounter('count-completed', counts.completed, this._previousCounts.completed);
    this._animateCounter('count-failed', counts.failed, this._previousCounts.failed);
    this._animateCounter('count-idle', counts.idle, this._previousCounts.idle);

    this._previousCounts = { ...counts };
  }

  /**
   * Animate counter update with bump effect
   */
  _animateCounter(elementId, newValue, oldValue) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.textContent = newValue;

    // Only animate if value actually changed and is not the initial render
    if (oldValue >= 0 && newValue !== oldValue) {
      el.classList.remove('counter-update');
      // Force reflow to restart animation
      void el.offsetWidth;
      el.classList.add('counter-update');
    }
  }

  /**
   * Update timestamps in-place without full re-render (performance optimization)
   */
  _updateTimestampsInPlace() {
    for (const [id, project] of this.projects) {
      const card = this.card.cards.get(id);
      if (!card) continue;

      const timeText = card.querySelector('.time-text');
      if (timeText && project.updated_at) {
        timeText.textContent = this.card._relativeTime(project.updated_at);
      }
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }
  }
}

if (typeof window !== 'undefined') {
  window.Dashboard = Dashboard;
}
