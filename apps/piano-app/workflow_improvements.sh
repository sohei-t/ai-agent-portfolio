#!/bin/bash

# ワークフロー改善実装スクリプト
# 検出された改善点を自動的に実装

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🔧 ワークフロー改善実装${NC}"
echo -e "${BLUE}================================${NC}"

# ======================
# 1. エラーハンドリング改善
# ======================
echo -e "\n${CYAN}1. エラーハンドリング機能の追加${NC}"

# エラー通知スクリプトを作成
cat > src/error_handler.sh << 'EOF'
#!/bin/bash

# エラーハンドリング共通関数

# エラー時の処理
handle_error() {
    local exit_code=$?
    local line_no=$1
    local script_name=$(basename $0)

    echo -e "\033[0;31m❌ エラーが発生しました！\033[0m"
    echo -e "スクリプト: $script_name"
    echo -e "行番号: $line_no"
    echo -e "終了コード: $exit_code"

    # ログファイルに記録
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] ERROR in $script_name at line $line_no (exit: $exit_code)" >> error.log

    exit $exit_code
}

# トラップ設定
set_error_trap() {
    set -eE
    trap 'handle_error $LINENO' ERR
}

# リトライ機能
retry_command() {
    local max_attempts=${1:-3}
    local delay=${2:-5}
    local command="${@:3}"
    local attempt=0

    while [ $attempt -lt $max_attempts ]; do
        attempt=$((attempt + 1))
        echo "実行中 (試行 $attempt/$max_attempts): $command"

        if eval $command; then
            return 0
        fi

        if [ $attempt -lt $max_attempts ]; then
            echo "失敗。${delay}秒後に再試行..."
            sleep $delay
        fi
    done

    echo "最大試行回数に達しました。失敗。"
    return 1
}

# プログレス表示
show_progress() {
    local current=$1
    local total=$2
    local width=50
    local percent=$((current * 100 / total))
    local filled=$((width * current / total))

    printf "\r["
    printf "%${filled}s" | tr ' ' '='
    printf "%$((width - filled))s" | tr ' ' ' '
    printf "] %3d%% (%d/%d)" $percent $current $total

    if [ $current -eq $total ]; then
        echo ""
    fi
}
EOF

chmod +x src/error_handler.sh
echo -e "${GREEN}✅ error_handler.sh 作成完了${NC}"

# ======================
# 2. .env.example の作成
# ======================
echo -e "\n${CYAN}2. 環境変数テンプレートの作成${NC}"

cat > .env.example << 'EOF'
# GitHub設定
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=ai-agent-portfolio

# AI設定（オプション）
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx

# プロジェクト設定
DEFAULT_PROJECT_TYPE=portfolio
DEFAULT_CLIENT_NAME=

# デバッグ設定
DEBUG_MODE=false
VERBOSE_OUTPUT=false

# パフォーマンス設定
MAX_PARALLEL_AGENTS=4
TIMEOUT_SECONDS=300

# 通知設定（オプション）
SLACK_WEBHOOK_URL=
EMAIL_NOTIFICATION=
EOF

echo -e "${GREEN}✅ .env.example 作成完了${NC}"

# ======================
# 3. バージョン管理ファイル
# ======================
echo -e "\n${CYAN}3. バージョン管理の追加${NC}"

cat > VERSION << 'EOF'
1.0.0
EOF

cat > src/version_manager.py << 'EOF'
#!/usr/bin/env python3
"""
バージョン管理ユーティリティ
"""

import os
import json
from datetime import datetime
from pathlib import Path

class VersionManager:
    def __init__(self):
        self.version_file = Path("VERSION")
        self.changelog_file = Path("CHANGELOG.md")

    def get_current_version(self):
        """現在のバージョンを取得"""
        if self.version_file.exists():
            return self.version_file.read_text().strip()
        return "0.0.1"

    def bump_version(self, bump_type="patch"):
        """バージョンを更新（major.minor.patch）"""
        current = self.get_current_version()
        parts = current.split('.')

        if bump_type == "major":
            parts[0] = str(int(parts[0]) + 1)
            parts[1] = "0"
            parts[2] = "0"
        elif bump_type == "minor":
            parts[1] = str(int(parts[1]) + 1)
            parts[2] = "0"
        elif bump_type == "patch":
            parts[2] = str(int(parts[2]) + 1)

        new_version = '.'.join(parts)
        self.version_file.write_text(new_version)

        # 変更履歴に追加
        self.add_to_changelog(new_version)

        return new_version

    def add_to_changelog(self, version, changes=None):
        """変更履歴に追加"""
        date = datetime.now().strftime("%Y-%m-%d")

        if not self.changelog_file.exists():
            content = "# 変更履歴\n\n"
        else:
            content = self.changelog_file.read_text()

        new_entry = f"\n## [{version}] - {date}\n\n"

        if changes:
            for change in changes:
                new_entry += f"- {change}\n"
        else:
            new_entry += "- 更新\n"

        # 最初のバージョンエントリの前に挿入
        if "##" in content:
            parts = content.split("##", 1)
            content = parts[0] + new_entry + "\n##" + parts[1]
        else:
            content += new_entry

        self.changelog_file.write_text(content)

if __name__ == "__main__":
    vm = VersionManager()
    print(f"現在のバージョン: {vm.get_current_version()}")
EOF

chmod +x src/version_manager.py
echo -e "${GREEN}✅ バージョン管理システム作成完了${NC}"

# ======================
# 4. GitHub Actions テンプレート
# ======================
echo -e "\n${CYAN}4. CI/CD設定の作成${NC}"

mkdir -p .github/workflows

cat > .github/workflows/portfolio-deploy.yml << 'EOF'
name: Portfolio Auto Deploy

on:
  push:
    branches: [ main ]
    paths:
      - 'apps/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'

    - name: Install dependencies
      run: |
        npm install
        pip install pyyaml

    - name: Generate documentation
      run: |
        python3 src/portfolio_doc_generator.py || true

    - name: Deploy to GitHub Pages
      if: success()
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./apps
        cname: your-domain.com  # オプション
EOF

echo -e "${GREEN}✅ GitHub Actions設定作成完了${NC}"

# ======================
# 5. プログレスレポーター
# ======================
echo -e "\n${CYAN}5. 進捗レポート機能の追加${NC}"

cat > src/progress_reporter.py << 'EOF'
#!/usr/bin/env python3
"""
進捗レポート生成
"""

import time
import json
from datetime import datetime
from pathlib import Path

class ProgressReporter:
    def __init__(self):
        self.start_time = time.time()
        self.tasks = []
        self.current_task = None

    def start_task(self, name, total_steps=1):
        """タスクを開始"""
        task = {
            "name": name,
            "start": time.time(),
            "total_steps": total_steps,
            "current_step": 0,
            "status": "in_progress"
        }
        self.current_task = task
        self.tasks.append(task)
        print(f"📋 {name} 開始...")

    def update_progress(self, step, message=""):
        """進捗を更新"""
        if self.current_task:
            self.current_task["current_step"] = step
            percent = (step / self.current_task["total_steps"]) * 100
            bar_length = 30
            filled = int(bar_length * step / self.current_task["total_steps"])
            bar = "=" * filled + "-" * (bar_length - filled)

            print(f"\r[{bar}] {percent:.1f}% {message}", end="")

            if step >= self.current_task["total_steps"]:
                print()  # 改行
                self.complete_task()

    def complete_task(self, status="completed"):
        """タスクを完了"""
        if self.current_task:
            self.current_task["end"] = time.time()
            self.current_task["duration"] = self.current_task["end"] - self.current_task["start"]
            self.current_task["status"] = status
            print(f"✅ {self.current_task['name']} 完了 ({self.current_task['duration']:.1f}秒)")
            self.current_task = None

    def generate_report(self):
        """最終レポートを生成"""
        total_duration = time.time() - self.start_time

        report = {
            "generated_at": datetime.now().isoformat(),
            "total_duration": total_duration,
            "tasks": self.tasks,
            "summary": {
                "total_tasks": len(self.tasks),
                "completed": len([t for t in self.tasks if t["status"] == "completed"]),
                "failed": len([t for t in self.tasks if t["status"] == "failed"])
            }
        }

        # レポートを保存
        report_path = Path("progress_report.json")
        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2, default=str)

        # サマリーを表示
        print("\n" + "="*50)
        print("📊 実行完了レポート")
        print("="*50)
        print(f"総実行時間: {total_duration:.1f}秒")
        print(f"完了タスク: {report['summary']['completed']}/{report['summary']['total_tasks']}")

        return report

# 使用例
if __name__ == "__main__":
    reporter = ProgressReporter()

    # タスク1
    reporter.start_task("ファイル処理", 100)
    for i in range(100):
        time.sleep(0.01)
        reporter.update_progress(i + 1, f"ファイル {i+1}/100")

    # タスク2
    reporter.start_task("データベース更新", 50)
    for i in range(50):
        time.sleep(0.01)
        reporter.update_progress(i + 1)

    # レポート生成
    reporter.generate_report()
EOF

chmod +x src/progress_reporter.py
echo -e "${GREEN}✅ 進捗レポーター作成完了${NC}"

# ======================
# 6. ライセンスファイル
# ======================
echo -e "\n${CYAN}6. ライセンスファイルの作成${NC}"

cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024 AI Agent Development System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

echo -e "${GREEN}✅ LICENSE 作成完了${NC}"

# ======================
# 総括
# ======================
echo -e "\n${BLUE}================================${NC}"
echo -e "${BLUE}✨ 改善実装完了！${NC}"
echo -e "${BLUE}================================${NC}"

echo -e "\n${GREEN}追加された機能:${NC}"
echo -e "  ✅ エラーハンドリング機能 (src/error_handler.sh)"
echo -e "  ✅ 環境変数テンプレート (.env.example)"
echo -e "  ✅ バージョン管理 (VERSION, src/version_manager.py)"
echo -e "  ✅ CI/CD設定 (.github/workflows/portfolio-deploy.yml)"
echo -e "  ✅ 進捗レポート (src/progress_reporter.py)"
echo -e "  ✅ ライセンス (LICENSE)"

echo -e "\n${YELLOW}次のステップ:${NC}"
echo -e "1. .env.example を .env にコピーして設定"
echo -e "2. GitHub Actions を有効化"
echo -e "3. 各スクリプトでエラーハンドラーを使用:"
echo -e "   source src/error_handler.sh"
echo -e "   set_error_trap"

echo -e "\n${GREEN}システムがさらに堅牢になりました！${NC}"