# AI Agent Portfolio

> End-to-end AI-driven application development -- from requirements to deployment, fully automated.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://sohei-t.github.io/ai-agent-portfolio/)
[![Apps](https://img.shields.io/badge/Apps-14+-blue)](#portfolio-applications)
[![Workflow](https://img.shields.io/badge/Workflow-7%20Phases-purple)](#development-workflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[Live Demo](https://sohei-t.github.io/ai-agent-portfolio/)** | **[Audio Walkthrough](https://sohei-t.github.io/ai-agent-portfolio/portfolio_explanation.mp3)**

---

## Table of Contents

- [Overview](#overview)
- [How It Differs from Conventional AI-Assisted Development](#how-it-differs-from-conventional-ai-assisted-development)
- [Architecture](#architecture)
- [Development Workflow](#development-workflow)
- [Portfolio Applications](#portfolio-applications)
- [Results](#results)
- [Tech Stack](#tech-stack)
- [Skills Demonstrated](#skills-demonstrated)
- [Author](#author)
- [License](#license)

---

## Overview

This portfolio is a collection of **14+ interactive web applications** built through a custom AI agent workflow powered by Claude Code. Every application was developed end-to-end -- from requirements analysis through production deployment -- using a 7-phase automated pipeline with parallel execution via Git Worktrees.

The workflow does not merely use AI as a coding assistant. Instead, it orchestrates **multiple specialized sub-agents** working in parallel across physically isolated Git Worktrees, with an autonomous evaluation system that selects the best implementation from competing prototypes.

---

## How It Differs from Conventional AI-Assisted Development

| Dimension | Conventional AI-Assisted Development | This Workflow |
|-----------|--------------------------------------|---------------|
| **Execution model** | Sequential (one task at a time) | **9 Git Worktrees for true physical parallelism** |
| **Reasoning depth** | Context dilution over long conversations | **Context splitting for deep, specialized reasoning** |
| **Quality control** | Manual human review | **Autonomous evaluation system with automated selection** |
| **Deliverables** | Code only | **Code + tests + documentation + audio walkthrough -- all auto-generated** |
| **Security** | Manual checks | **63-pattern automated detection + independent security audit** |

---

## Architecture

### Parallel Development via Git Worktrees

```
worktrees/
  phase1-planning-a/           # Plan A (conservative approach)
  phase1-planning-b/           # Plan B (innovative approach)
  phase2-impl-prototype-a/     # Implementation prototype A
  phase2-impl-prototype-b/     # Implementation prototype B
  phase2-impl-prototype-c/     # Implementation prototype C
  phase3-testing/              # Testing environment
  phase4-quality-opt-a/        # Optimization approach A
  phase4-quality-opt-b/        # Optimization approach B
  phase5-delivery/             # Final deliverables
```

**Why Git Worktrees?**

1. **Physical context isolation** -- Each approach lives in an independent directory, preventing cross-contamination between competing implementations.
2. **True parallel execution** -- Multiple sub-agents work simultaneously in different directories without file-locking conflicts.
3. **Side-by-side evaluation** -- Multiple implementations can be compared directly, enabling principled selection of the best candidate.

### Context Splitting Strategy

To overcome LLM context window limitations, tasks are delegated to specialized sub-agents:

```
Main Agent (Orchestrator)
  |
  +-- Requirements Analyst
  |     Produces: REQUIREMENTS.md
  |
  +-- System Architect
  |     Produces: SPEC.md, TECH_STACK.md
  |
  +-- Implementation Agents (3x parallel)
  |     +-- Frontend Developer
  |     +-- Backend Developer
  |     +-- Database Engineer
  |
  +-- Test Agent
  |     Runs until 100% pass rate
  |
  +-- Documentation Agent
        Produces: README, about.html, audio walkthrough
```

Each sub-agent operates within a focused context, enabling deeper and more specialized reasoning than a single agent handling everything.

---

## Development Workflow

The workflow consists of 7 phases, each with clearly defined inputs, outputs, and quality gates.

```
Phase 0: Initialize
    |
    v
Phase 1: Parallel Planning ----------------+
    |  Plan A (conservative)               | Autonomous evaluation
    |  Plan B (innovative)                 | selects the best plan
    |                                      |
    v  <-----------------------------------+
Phase 2: Parallel Implementation -----------+
    |  Prototype A                         |
    |  Prototype B                         | UX-weighted evaluation
    |  Prototype C                         | selects the best build
    |                                      |
    v  <-----------------------------------+
Phase 3: Testing
    |  Automated fix loop until 100% pass
    |
    v
Phase 4: Quality Optimization
    |  Target: 80-90% coverage
    |
    v
Phase 5: Finalization
    |  Auto-generate README.md
    |  Auto-generate about.html
    |  Auto-generate audio walkthrough (GCP TTS)
    |
    v
Phase 6: GitHub Publishing
    |  Automated GitHub Pages deployment
    |
    v
Phase 6.5: Security Verification
       Independent agent-based audit
```

### Autonomous Evaluation System

When multiple implementations compete, the system selects the best candidate using weighted criteria:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **User Experience** | **35%** | Core Web Vitals, intuitive interaction, WCAG 2.1 AA accessibility, responsive design |
| Feature Completeness | 20% | All specified requirements implemented |
| Performance | 15% | Load times, rendering efficiency |
| Test Quality | 15% | Coverage, edge case handling |
| Security | 10% | Vulnerability scanning, input validation |
| Maintainability | 5% | Code readability, documentation |

User experience carries the highest weight, reflecting the principle that software must be usable first and foremost.

---

## Portfolio Applications

### Robo Battle Series

| Version | Description | Demo |
|---------|-------------|------|
| [Robo Battle v5](./robo-battle-v5/) | Match format edition -- best-of-3/best-of-5, ending cinematics | [Live](https://robo-battle-v5-game.web.app/) |
| [Robo Battle v4](./robo-battle-v4/) | Beast summoning system + enhanced CPU AI | [Live](https://robo-battle-v4-game.web.app/) |
| [Robo Battle v3](./robo-battle-v3/) | WebRTC peer-to-peer online multiplayer | [Live](https://robo-battle-v3-game.web.app/) |
| [Robo Battle v2](./robo-battle-v2/) | Photorealistic 3D graphics with AI-generated sprites | [Live](https://sohei-t.github.io/ai-agent-portfolio/robo-battle-v2/) |
| [Robo Battle](./robo-battle/) | Original robot battle game | [Live](https://sohei-t.github.io/ai-agent-portfolio/robo-battle/) |

### Shooting Games

| Application | Description | Demo |
|-------------|-------------|------|
| [Boss Shooter 2](./boss-shooter2/) | 10-stage boss battle shooter (enhanced edition) | [Live](https://sohei-t.github.io/ai-agent-portfolio/boss-shooter2/) |
| [Boss Shooting](./boss-shooting/) | Retro-style vertical scrolling shooter | [Live](https://sohei-t.github.io/ai-agent-portfolio/boss-shooting/) |
| [Space Shooter](./space-shooter/) | Space Invaders-inspired arcade shooter | [Live](https://sohei-t.github.io/ai-agent-portfolio/space-shooter/) |
| [Gradius Clone](./gradius-clone/) | Gradius-style horizontal scrolling STG (Phaser 3) | [Live](https://sohei-t.github.io/ai-agent-portfolio/gradius-clone/) |

### Other Games

| Application | Description | Demo |
|-------------|-------------|------|
| [Bowling Adventure v2](./bowling-adventure-v2/) | 3D obstacle course bowling (Three.js + Cannon.js) | [Live](https://sohei-t.github.io/ai-agent-portfolio/bowling-adventure-v2/) |
| [Bowling Adventure](./bowling-adventure/) | 3D bowling game (original edition) | [Live](https://sohei-t.github.io/ai-agent-portfolio/bowling-adventure/) |
| [Dungeon Battles](./dungeon-battles/) | Vertical-scrolling dungeon RPG | [Live](https://sohei-t.github.io/ai-agent-portfolio/dungeon-battles/) |

### Utilities and Tools

| Application | Description | Demo |
|-------------|-------------|------|
| [CLI Sticky Notes](./cli-sticky-notes/) | Terminal sticky notes with global hotkey support (Electron) | [About](https://sohei-t.github.io/ai-agent-portfolio/cli-sticky-notes/about.html) |
| [Piano App](./piano-app/) | Piano application with 18 instrument sounds (Web Audio API) | [Live](https://sohei-t.github.io/ai-agent-portfolio/piano-app/) |

---

## Results

### Quantitative Outcomes

| Metric | Result |
|--------|--------|
| Development speed | Requirements to deployment in **hours, not days** |
| Test coverage | **80-90%** automatically achieved |
| Documentation | README + about.html + audio walkthrough **100% auto-generated** |
| Security | **63+ patterns** for sensitive file detection and exclusion |

### Technical Innovations

1. **Physical parallelism** -- Git Worktrees enable true concurrent development across isolated directories, going beyond simple branch-based workflows.
2. **Deep specialized reasoning** -- Context splitting ensures each sub-agent focuses on a single domain, producing higher-quality output than a monolithic approach.
3. **Autonomous quality control** -- UX-first evaluation criteria (35% weight) drive automated selection between competing implementations.
4. **End-to-end automation** -- The pipeline covers every stage from requirements analysis through code, testing, documentation, and deployment.

---

## Tech Stack

### Workflow Infrastructure

| Technology | Role |
|-----------|------|
| Claude Code (Claude Opus) | Main AI agent and orchestrator |
| Git Worktree | Parallel development environments |
| Task Tool | Sub-agent parallel execution |

### Application Development

| Technology | Role |
|-----------|------|
| HTML5 Canvas | Game rendering |
| Vanilla JavaScript | Core application logic |
| WebGL / Three.js | 3D graphics |
| Phaser 3 | Game framework |
| WebRTC | Peer-to-peer multiplayer |
| Web Audio API | Audio synthesis |
| Electron | Desktop application |

### Infrastructure and Services

| Technology | Role |
|-----------|------|
| GitHub Pages | Static hosting and deployment |
| Firebase | Real-time database and hosting for select apps |
| GCP Text-to-Speech | Audio walkthrough generation |
| Vertex AI Imagen | AI image generation (select apps) |

---

## Skills Demonstrated

### AI Engineering

- Multi-agent system design and implementation
- LLM context management and prompt engineering
- Autonomous evaluation system architecture

### Software Engineering

- Test-driven development (TDD)
- CI/CD pipeline design
- Security-conscious development practices

### Process Design

- Development workflow automation
- Quantitative quality metrics with automated verification
- Reproducible, templated project scaffolding

---

## Author

**Sohei T.**

- GitHub: [@sohei-t](https://github.com/sohei-t)
- Portfolio: [ai-agent-portfolio](https://sohei-t.github.io/ai-agent-portfolio/)

---

## License

MIT License -- See individual application directories for details.

---

<p align="center">
  <strong>Built with Claude Code + Custom AI Agent Workflow</strong><br>
  <em>Demonstrating the future of AI-driven software development</em>
</p>
