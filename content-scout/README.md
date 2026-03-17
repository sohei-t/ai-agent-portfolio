# Content Scout

Autonomous tech-trend monitoring pipeline that detects emerging technology signals, analyzes them with Claude AI, and proposes training curriculum topics via Slack -- with human-in-the-loop approval.

**Agentic AI Level 4**: Autonomous judgment, execution, and human approval loop.

---

## Architecture

```
                         Content Scout Pipeline
 ============================================================================

  [Web Sources]                                             [Human Manager]
  8 RSS/API/HTML          Daily Pipeline (launchd)           Slack DM
       |                                                        ^
       | 05:00 JST                                              |
       v                                                        |
  +----------+     +----------------+     +-------------------+ |
  | scout.py |---->| analyst.py     |---->| proposal_notifier | |
  | (Step 1) |     | (Step 2)       |     | .py (Step 3)      |-+
  | Crawl &  |     | Claude --print |     | Slack Block Kit   |
  | Collect  |     | Analysis       |     | DM Notification   |
  +----------+     +-------+--------+     +-------------------+
       |                   |                       |
       v                   v                       v
  raw_signals        proposals/              +-----------+
  .jsonl             {date}_{id}.yaml        | Slack DM  |
                                             | [Approve] |
                                             | [Reject ] |
                                             | [Defer  ] |
                                             +-----+-----+
                                                   |
                                          +--------v---------+
                                          | bot.py (Handlers)|
                                          | proposal_approve |
                                          | proposal_reject  |
                                          | proposal_defer   |
                                          +--------+---------+
                                                   |
                                          +--------v---------+
                                          | create_new_      |
                                          | curriculum_      |
                                          | auto.sh          |
                                          +--------+---------+
                                                   |
                                          +--------v---------+
                                          | Learning-        |
                                          | Curricula/{name}/|
                                          | (Git initialized)|
                                          +------------------+

  Planning B Enhancements:
  +-----------------------+  +---------------------+  +------------------+
  | Feedback Learning     |  | Cross-Source         |  | Deferred         |
  | feedback.jsonl        |  | Signal Amplification |  | Re-evaluation    |
  | +0.1 approved         |  | 2 sources -> 1.5x   |  | 7-day cycle      |
  | -0.15 rejected        |  | 3+ sources -> 2.0x  |  | max 3 extensions |
  +-----------------------+  +---------------------+  +------------------+
```

---

## Components

| Component | File | Role |
|-----------|------|------|
| Signal Crawler | `src/scout.py` | Crawls 8 sources daily at 05:00 JST; collects keyword-matched tech signals |
| Signal Analyst | `src/analyst.py` | Analyzes signals with `claude --print`; generates proposal YAML (max 2/day) |
| Slack Notifier | `src/proposal_notifier.py` | Sends Block Kit proposal cards to Slack DM with Approve/Reject/Defer buttons |
| Action Handlers | `src/proposal_handlers.py` | Handles Slack button actions; records history and feedback |
| Curriculum Creator | `src/create_new_curriculum_auto.sh` | Non-interactive curriculum environment setup (Git init, worktree, CONTENT_INFO) |
| Pipeline Launcher | `src/analyst_launcher.sh` | Lock-guarded pipeline runner: analyst -> notifier sequence |

### Planning B Enhancements (Integrated)

| Feature | Description |
|---------|-------------|
| Feedback Learning | Learns from approve/reject patterns to adjust signal scores over time |
| Cross-Source Amplification | Boosts signals detected across 2+ independent sources (1.5x-2.0x) |
| Deferred Re-evaluation | Auto-re-evaluates deferred proposals after 7 days with new signal data |

---

## Data Flow

```
1. scout.py (05:00 JST)
   - Crawls 8 sources (RSS, API, HTML scraping)
   - Appends to ~/.scout/data/raw_signals.jsonl

2. analyst.py (06:00 JST via analyst_launcher.sh)
   - Reads signals from last 3 days (excluding already-analyzed)
   - Applies feedback weights from feedback.jsonl
   - Clusters signals by keyword overlap (Jaccard >= 0.5)
   - Applies cross-source boost (2 sources: 1.5x, 3+: 2.0x)
   - Re-evaluates deferred proposals from defer_queue.json
   - Sends prompt + signals to Claude CLI (--print mode)
   - Parses YAML output, validates, checks duplicates
   - Saves proposals to ~/.scout/proposals/{date}_{id}.yaml

3. proposal_notifier.py
   - Detects unnotified proposals (notified_at: null)
   - Builds Slack Block Kit cards with action buttons
   - Sends DM via Slack API (urllib.request)

4. bot.py handlers (on button press)
   - Approve: runs create_new_curriculum_auto.sh
   - Reject: records to history + feedback (negative weight)
   - Defer: adds to defer_queue.json (7-day re-evaluation)
```

---

## Setup

### Prerequisites

- macOS (Mac mini M4 recommended)
- Python 3 (system default)
- `claude` CLI installed and authenticated
- Slack Bot Token (`SLACK_BOT_TOKEN`) and App Token (`SLACK_APP_TOKEN`)
- PyYAML (`pip install pyyaml`)
- slack_bolt (for bot.py: `pip install slack_bolt`)

### Installation

```bash
# 1. Clone or copy project
cd ~/Desktop/AI-Apps/content-scout-agent/

# 2. Set environment variables in ~/.config/ai-agents/profiles/default.env
#    Required variables:
#    SLACK_BOT_TOKEN=xoxb-...
#    SLACK_APP_TOKEN=xapp-...
#    SLACK_ALLOWED_USER=U...

# 3. Initialize runtime directories
mkdir -p ~/.scout/{data,proposals,state,logs,lock}
chmod 700 ~/.scout

# 4. Install launchd jobs (automated scheduling)
cp project/launchd/com.ai-agents.analyst.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ai-agents.analyst.plist
```

### Configuration Files

| File | Location | Purpose |
|------|----------|---------|
| `scout_sources.yaml` | `config/` | Source definitions (8 sources with priority and keywords) |
| `content_strategy.yaml` | `config/` | Analysis criteria and content strategy |
| `analyst_prompt.txt` | `config/` | Claude analysis prompt template |
| `paths.yaml` | `config/` | External path references (template, curricula dir) |

---

## Usage

### Manual Execution

```bash
# Run analysis manually
python3 project/src/analyst.py

# Dry run (no save, no Slack notification)
python3 project/src/analyst.py --dry-run

# Analyze last 5 days of signals
python3 project/src/analyst.py --days 5

# Run notifier separately
python3 project/src/proposal_notifier.py

# Dry run notifier
python3 project/src/proposal_notifier.py --dry-run
```

### Scheduled Execution (launchd)

| Job | Schedule | Target |
|-----|----------|--------|
| `com.ai-agents.scout` | 05:00 JST daily | `scout.py` (existing) |
| `com.ai-agents.analyst` | 06:00 JST daily | `analyst_launcher.sh` -> `analyst.py` -> `proposal_notifier.py` |

### Slack Bot Integration

The bot runs continuously via Socket Mode. Proposal cards appear in DM with three buttons:

- **Approve**: Creates curriculum environment automatically
- **Reject**: Records negative feedback for future scoring
- **Defer**: Schedules 7-day re-evaluation

---

## Runtime Data

```
~/.scout/
  data/
    raw_signals.jsonl        # Crawled signal data (append-only)
  proposals/
    {date}_{id}.yaml         # Individual proposals
    history.jsonl            # Approve/reject/defer history
    feedback.jsonl           # Feedback learning data
    defer_queue.json         # Deferred proposal queue
  state/
    last_analysis.json       # Last analysis state
  logs/
    scout.log                # Crawler logs
    analyst.log              # Analyst logs
    notifier.log             # Notifier logs
  lock/
    analyst.lock             # Double-execution prevention
```

---

## Technology Stack

| Category | Technology | Rationale |
|----------|-----------|-----------|
| Language | Python 3 (system) | Same as scout.py; no additional install |
| Shell | Bash (zsh-compatible) | macOS standard; same as existing scripts |
| AI Analysis | Claude CLI (`--print` mode) | No API key management; local subprocess |
| HTTP Client | `urllib.request` (stdlib) | No external dependency (no `requests`) |
| Data Format | JSONL + YAML | File-based, human-readable, low overhead |
| Scheduling | launchd | macOS native; coexists with existing scout plist |
| Messaging | Slack (Block Kit + Socket Mode) | Reuses existing slack-bridge infrastructure |
| Version Control | Git | Curriculum environments are Git-initialized |

### Deliberately Not Used

| Technology | Reason |
|-----------|--------|
| LangChain | Overkill for single Claude CLI call |
| SQLite/TinyDB | JSONL sufficient for ~1000 records/year |
| Docker | Single Mac mini; no containerization benefit |
| Redis/MQ | File-based state management sufficient |
| cron | launchd is macOS standard (cron deprecated) |

---

## Test Results

```
164 passed in 0.20s

Name                               Stmts   Miss  Cover
----------------------------------------------------------------
analyst.py                           486     56    88%
proposal_handlers.py                 141      8    94%
proposal_notifier.py                 158     11    93%
----------------------------------------------------------------
TOTAL                                785     75    90%
```

- **164 tests**: All passing
- **90% coverage**: Overall
- **Critical path**: 100% covered (signal loading, analysis, notification, handlers)
- **Mock isolation**: Claude CLI and Slack API fully mocked; no external calls in tests
- **Environment isolation**: All tests use `tmp_path`; never touch `~/.scout/`

---

## Development Process

### Planning Phase (Phase 1)

Two planning approaches were generated in parallel using Git worktrees:

| Approach | Strategy | Key Differentiator |
|----------|----------|--------------------|
| Planning A (Selected) | Conservative, proven patterns | Minimal dependencies, file-based architecture |
| Planning B | Innovative, advanced features | Feedback learning, cross-source amplification, deferred re-evaluation |

**Result**: Planning A was selected as the base, with Planning B's three key innovations integrated:
1. Feedback Learning (approve/reject weight adjustment)
2. Cross-Source Signal Amplification (multi-source boost)
3. Deferred Proposal Re-evaluation (7-day cycle)

### Implementation Phase (Phase 2-4)

- Phase 2: Core implementation with 3 prototype approaches (monolithic selected)
- Phase 3: 164 tests written and passing (100% pass rate)
- Phase 4: Coverage improved from 70% to 90%; code quality optimization

### Quality Metrics

| Metric | Value |
|--------|-------|
| Test Count | 164 |
| Test Pass Rate | 100% |
| Code Coverage | 90% |
| Components | 6 (scout, analyst, notifier, handlers, auto_sh, launcher) |
| External Dependencies | 2 (PyYAML, slack_bolt) |
| Lines of Code | ~2,500 (Python + Bash) |

---

## Error Handling

| Failure | Impact | Recovery |
|---------|--------|----------|
| Scout crawl failure (partial) | Some sources skipped | Other sources continue |
| Scout crawl failure (all) | No new signals | Analyst uses previous data |
| Claude CLI down | No proposals generated | Auto-retry next day |
| Claude output parse error | No proposals | Logged; continues |
| Slack API down | Proposals not notified | YAML preserved; notified next run |
| Bot restart | No state loss | Button values are self-contained |
| Template not found | Cannot create curriculum | Slack message: "manual creation needed" |
| Double execution | Prevented | Lock file with PID check |

---

## Security

- **Authentication**: All credentials in `~/.config/ai-agents/profiles/default.env`
- **Slack authorization**: Single-user restriction via `SLACK_ALLOWED_USER`
- **Network access**: Only `scout.py` accesses the internet; `analyst.py` is local-only
- **File permissions**: `~/.scout/` is `0700` (owner only)
- **Shell injection**: Curriculum names are sanitized (regex whitelist)

---

## License

MIT
