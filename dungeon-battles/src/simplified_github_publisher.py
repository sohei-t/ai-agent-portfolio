#!/usr/bin/env python3
"""
🚀 シンプル化されたGitHub公開スクリプト v7.0
DELIVERYフォルダの内容を直接ai-agent-portfolioにプッシュ
"""

import os
import sys
import subprocess
import shutil
import re
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Optional

class SimplifiedGitHubPublisher:
    """シンプル化されたGitHub公開クラス"""

    def __init__(self, project_path: str = None):
        """
        Args:
            project_path: プロジェクトのパス（AI-Apps内のフォルダ）
        """
        self.project_path = Path(project_path or os.getcwd())
        self.delivery_path = self.project_path / "DELIVERY"
        self.portfolio_repo = Path.home() / "Desktop" / "GitHub" / "ai-agent-portfolio"

        # GitHub username取得
        self.github_username = self._get_github_username()

    def _get_github_username(self) -> str:
        """GitHub usernameを取得"""
        try:
            result = subprocess.run(
                ['gh', 'api', 'user', '--jq', '.login'],
                capture_output=True,
                text=True
            )
            if result.returncode == 0:
                return result.stdout.strip()
        except:
            pass
        return "username"

    def _run_command(self, cmd: str, cwd: Path = None) -> bool:
        """コマンド実行"""
        try:
            result = subprocess.run(
                cmd,
                shell=True,
                cwd=cwd or self.project_path,
                capture_output=True,
                text=True
            )
            if result.returncode != 0:
                print(f"❌ エラー: {result.stderr}")
                return False
            return True
        except Exception as e:
            print(f"❌ コマンド実行エラー: {e}")
            return False

    def get_slug(self, project_name: str = None) -> str:
        """プロジェクト名からslugを生成（日付除去）"""
        if not project_name:
            project_name = self.project_path.name

        # 日付プレフィックス除去（YYYYMMDD- or YYYY-MM-DD-）
        slug = re.sub(r'^\d{8}-', '', project_name)
        slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', slug)

        # -agent サフィックス除去
        slug = re.sub(r'-agent$', '', slug)

        # 正規化
        slug = slug.lower()
        slug = re.sub(r'[^a-z0-9]+', '-', slug)
        slug = slug.strip('-')

        return slug

    def validate_delivery(self) -> bool:
        """DELIVERYフォルダの検証"""
        if not self.delivery_path.exists():
            print("❌ DELIVERYフォルダが見つかりません")
            print("  Phase 5を先に実行してください")
            return False

        # 必須ファイルチェック
        required_files = ['README.md', 'about.html']
        missing = []
        for file in required_files:
            if not (self.delivery_path / file).exists():
                missing.append(file)

        if missing:
            print(f"⚠️ 必須ファイルが不足: {', '.join(missing)}")
            return False

        print("✅ DELIVERYフォルダ検証OK")
        return True

    def clean_delivery(self):
        """DELIVERYフォルダから不要ファイルを除去"""
        exclude_patterns = [
            '__pycache__', '.pyc', '.pyo',
            '.DS_Store', 'Thumbs.db',
            '.env', '.git',
            # エージェント関連ファイル
            '*agent*.py', '*orchestrator*.py',
            'launcher_generator.py', 'workflow*.py',
            'improvement*.py', 'requirements_gatherer.py'
        ]

        print("🧹 不要ファイルをクリーニング中...")

        for pattern in exclude_patterns:
            # glob patternとして処理
            if '*' in pattern:
                for file in self.delivery_path.rglob(pattern):
                    if file.is_file():
                        file.unlink()
                        print(f"  ✅ 削除: {file.name}")
                    elif file.is_dir():
                        shutil.rmtree(file)
                        print(f"  ✅ 削除: {file.name}/")

    def prepare_target(self, slug: str) -> Path:
        """ターゲットディレクトリを準備"""
        target_path = self.portfolio_repo / slug

        # ポートフォリオリポジトリが存在しない場合は作成
        if not self.portfolio_repo.exists():
            print(f"📁 ポートフォリオリポジトリを作成: {self.portfolio_repo}")
            self.portfolio_repo.mkdir(parents=True, exist_ok=True)

            # Git初期化
            self._run_command("git init", cwd=self.portfolio_repo)

            # .gitignore作成
            self._create_portfolio_gitignore()

        # 既存ディレクトリがあれば削除（クリーンな状態から）
        if target_path.exists():
            print(f"🔄 既存の {slug} を更新します")
            shutil.rmtree(target_path)

        return target_path

    def _create_portfolio_gitignore(self):
        """ポートフォリオ用.gitignore作成"""
        gitignore_path = self.portfolio_repo / ".gitignore"
        if gitignore_path.exists():
            return

        gitignore_content = """# 管理ファイル（公開不要）
.slug_mapping.json
.processed_apps.json
processed_apps.json
slug_mapping.json
*.mapping.json

# OS関連
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# 環境ファイル
.env
.env.local
*.env

# ビルドキャッシュ
__pycache__/
*.pyc
*.pyo
node_modules/
dist/
build/

# バックアップ
*.backup
*.bak
*~

# 一時ファイル
*.tmp
*.temp
.cache/
"""

        with open(gitignore_path, 'w') as f:
            f.write(gitignore_content)

        print("✅ .gitignore作成完了")

    def build_static_app(self):
        """Node.jsアプリを静的サイト用にビルド（GitHub Pages対応）"""
        package_json_path = self.delivery_path / "package.json"
        if not package_json_path.exists():
            return

        print("🔨 アプリケーションのビルドを確認中...")

        with open(package_json_path, 'r') as f:
            package = json.load(f)
            scripts = package.get('scripts', {})

            # buildスクリプトがある場合は実行
            if 'build' in scripts:
                print("📦 プロダクションビルド実行中...")
                self._run_command("npm install", cwd=self.delivery_path)
                self._run_command("npm run build", cwd=self.delivery_path)

                # distまたはbuildフォルダの内容を配置
                dist_path = self.delivery_path / "dist"
                build_path = self.delivery_path / "build"

                if dist_path.exists():
                    # distの内容をDELIVERY直下にコピー（GitHub Pages用）
                    for item in dist_path.iterdir():
                        dest = self.delivery_path / item.name
                        if item.is_dir():
                            shutil.copytree(item, dest, dirs_exist_ok=True)
                        else:
                            shutil.copy2(item, dest)
                    print("✅ distフォルダの内容を配置")
                elif build_path.exists():
                    # buildの内容をDELIVERY直下にコピー
                    for item in build_path.iterdir():
                        dest = self.delivery_path / item.name
                        if item.is_dir():
                            shutil.copytree(item, dest, dirs_exist_ok=True)
                        else:
                            shutil.copy2(item, dest)
                    print("✅ buildフォルダの内容を配置")

    def copy_to_portfolio(self, slug: str) -> Path:
        """DELIVERYフォルダをポートフォリオにコピー"""
        target_path = self.prepare_target(slug)

        print(f"📦 {slug} をポートフォリオにコピー中...")
        shutil.copytree(self.delivery_path, target_path)

        print(f"✅ コピー完了: {target_path}")
        return target_path

    def update_readme_with_links(self, target_path: Path, slug: str):
        """README.mdにGitHub PagesのURLを追加"""
        readme_path = target_path / "README.md"
        if not readme_path.exists():
            return

        # GitHub Pages URL
        pages_base_url = f"https://{self.github_username}.github.io/ai-agent-portfolio/{slug}"

        # README.mdの先頭にリンクセクションを追加
        with open(readme_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # 既にリンクセクションがある場合はスキップ
        if "## 🌐 Live Demo" in original_content:
            return

        links_section = f"""## 🌐 Live Demo & Documentation

<div align="center">

### [🎮 Live Demo]({pages_base_url}/)
### [📱 Visual Presentation]({pages_base_url}/about.html)
### [🎵 Audio Explanation]({pages_base_url}/explanation.mp3)

</div>

---

"""

        # タイトル行の後に挿入
        lines = original_content.split('\n')
        if lines and lines[0].startswith('#'):
            # 最初のタイトルの後に挿入
            updated_content = lines[0] + '\n\n' + links_section + '\n'.join(lines[1:])
        else:
            # 先頭に挿入
            updated_content = links_section + original_content

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)

        print("✅ README.mdにライブリンクを追加")

    def git_operations(self, slug: str) -> bool:
        """Git操作（add, commit, push）"""
        print("\n📤 GitHubにプッシュ中...")

        # リモートリポジトリの設定確認
        remote_check = subprocess.run(
            ['git', 'remote', 'get-url', 'origin'],
            cwd=self.portfolio_repo,
            capture_output=True,
            text=True
        )

        if remote_check.returncode != 0:
            # リモート設定
            print("🔗 GitHubリモートを設定中...")
            remote_url = f"https://github.com/{self.github_username}/ai-agent-portfolio.git"
            self._run_command(f"git remote add origin {remote_url}", cwd=self.portfolio_repo)

        # Git操作
        commands = [
            "git add .",
            f'git commit -m "feat: {slug} - AI-generated portfolio app with documentation"',
            "git push -u origin main"
        ]

        for cmd in commands:
            if not self._run_command(cmd, cwd=self.portfolio_repo):
                # pushが失敗した場合、リポジトリ作成を試みる
                if "git push" in cmd:
                    print("📝 GitHubリポジトリを作成中...")
                    create_cmd = f'gh repo create ai-agent-portfolio --public -d "AI Agent Portfolio" --source . --push'
                    if self._run_command(create_cmd, cwd=self.portfolio_repo):
                        print("✅ リポジトリ作成・プッシュ成功")
                        return True
                return False

        print("✅ GitHubプッシュ完了")
        return True

    def setup_github_pages(self, slug: str):
        """GitHub Pages設定"""
        print("\n🌐 GitHub Pages設定中...")

        # .nojekyllファイル作成（Jekyll無効化）
        nojekyll_path = self.portfolio_repo / ".nojekyll"
        if not nojekyll_path.exists():
            nojekyll_path.touch()
            self._run_command(
                'git add .nojekyll && git commit -m "Add .nojekyll for GitHub Pages" && git push',
                cwd=self.portfolio_repo
            )

        # GitHub Pages有効化の案内
        print("""
📌 GitHub Pages有効化手順:
1. https://github.com/{0}/ai-agent-portfolio/settings/pages
2. Source: Deploy from a branch
3. Branch: main, Folder: / (root)
4. Save

数分後にアクセス可能:
- ポートフォリオ: https://{0}.github.io/ai-agent-portfolio/
- {1}: https://{0}.github.io/ai-agent-portfolio/{1}/about.html
""".format(self.github_username, slug))

    def display_completion(self, slug: str):
        """完了メッセージ表示"""
        print(f"""
{"="*60}
🎉 GitHub公開完了！
{"="*60}

📦 リポジトリ:
https://github.com/{self.github_username}/ai-agent-portfolio/{slug}

🌐 GitHub Pages（有効化後）:
- アプリ: https://{self.github_username}.github.io/ai-agent-portfolio/{slug}/
- ビジュアル説明: https://{self.github_username}.github.io/ai-agent-portfolio/{slug}/about.html
- 音声解説: https://{self.github_username}.github.io/ai-agent-portfolio/{slug}/explanation.mp3

📋 含まれる内容:
- src/: ソースコード
- tests/: テストコード
- docs/: 仕様書・設計書・テスト結果
- about.html: ビジュアルプレゼンテーション
- README.md: 技術仕様（ライブリンク付き）

✨ ポートフォリオ効果:
- AIエージェント並列処理の実証
- 自動ドキュメント生成の実例
- テスト駆動開発の証明

{"="*60}
        """)

    def publish(self) -> bool:
        """メイン実行関数"""
        print("\n" + "="*60)
        print("🚀 シンプル化GitHub公開 v7.0")
        print("="*60)

        # 1. DELIVERY検証
        if not self.validate_delivery():
            return False

        # 2. slug決定
        slug = self.get_slug()
        print(f"📝 アプリ名: {slug}")

        # 3. クリーニング
        self.clean_delivery()

        # 4. 静的ビルド（Node.jsアプリの場合）
        self.build_static_app()

        # 5. ポートフォリオにコピー
        target_path = self.copy_to_portfolio(slug)

        # 6. README.md更新
        self.update_readme_with_links(target_path, slug)

        # 7. Git操作
        if not self.git_operations(slug):
            return False

        # 8. GitHub Pages設定案内
        self.setup_github_pages(slug)

        # 9. 完了メッセージ
        self.display_completion(slug)

        return True


def main():
    """コマンドライン実行用"""
    if len(sys.argv) > 1:
        project_path = sys.argv[1]
    else:
        # カレントディレクトリを使用
        project_path = os.getcwd()

    # 絶対パスに変換
    project_path = os.path.abspath(project_path)

    if not os.path.exists(project_path):
        print(f"❌ パスが見つかりません: {project_path}")
        sys.exit(1)

    publisher = SimplifiedGitHubPublisher(project_path)
    success = publisher.publish()

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()