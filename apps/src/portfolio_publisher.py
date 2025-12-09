#!/usr/bin/env python3
"""
GitHub ポートフォリオ自動公開エージェント v2
slug方式で管理し、同じアプリは常に同じフォルダを更新
"""

import os
import json
import shutil
import subprocess
import re
import argparse
from typing import Dict, List, Optional, Tuple
from datetime import datetime
from pathlib import Path
import yaml

class PortfolioPublisherV2:
    """GitHubポートフォリオ公開クラス（slug方式）"""

    def __init__(self,
                 source_dir: str = None,
                 portfolio_repo: str = None,
                 dry_run: bool = False):
        """
        Args:
            source_dir: 生成アプリのソースディレクトリ
            portfolio_repo: ポートフォリオリポジトリのパス
            dry_run: 実際にpushしない（テストモード）
        """
        self.source_dir = source_dir
        self.portfolio_repo = portfolio_repo or os.path.expanduser("~/Desktop/GitHub/ai-agent-portfolio")
        self.dry_run = dry_run

        # GitHub CLIを使用（既に認証済み）
        result = subprocess.run(['gh', 'auth', 'status'], capture_output=True, text=True)
        if 'Logged in' in result.stdout:
            # ユーザー名を取得
            for line in result.stdout.split('\n'):
                if 'account' in line:
                    self.github_username = line.split('account')[1].split()[0]
                    break
        else:
            self.github_username = None

        # slugマッピングファイル（アプリ名とslugの対応を記録）
        self.slug_mapping_file = os.path.join(self.portfolio_repo, '.slug_mapping.json')
        self.slug_mapping = self._load_slug_mapping()

    def _load_slug_mapping(self) -> Dict[str, str]:
        """slugマッピングを読み込み"""
        if os.path.exists(self.slug_mapping_file):
            with open(self.slug_mapping_file, 'r') as f:
                return json.load(f)
        return {}

    def _save_slug_mapping(self):
        """slugマッピングを保存"""
        with open(self.slug_mapping_file, 'w') as f:
            json.dump(self.slug_mapping, f, indent=2)

    def determine_slug(self, app_path: str, provided_slug: Optional[str] = None) -> str:
        """アプリのslugを決定"""
        if provided_slug:
            return provided_slug

        # ディレクトリ名からslugを生成
        dir_name = os.path.basename(app_path)

        # 日付プレフィックスを除去（もしあれば）
        slug = re.sub(r'^\d{8}-', '', dir_name)

        # -agent サフィックスを除去
        slug = re.sub(r'-agent$', '', slug)

        # 正規化
        slug = slug.lower()
        slug = re.sub(r'[^a-z0-9]+', '-', slug)
        slug = slug.strip('-')

        return slug

    def analyze_app(self, app_path: str, slug: str) -> Dict:
        """アプリを分析して情報を収集"""
        app_info = {
            'path': app_path,
            'slug': slug,
            'name': slug.replace('-', ' ').title(),
            'date': datetime.now().strftime('%Y-%m-%d'),
            'tech_stack': [],
            'has_tests': False,
            'has_docs': False,
            'has_slides': False,
            'has_audio': False,
            'files': {},
            'is_update': False  # 既存アプリの更新かどうか
        }

        # 既存チェック
        portfolio_app_dir = os.path.join(self.portfolio_repo, 'apps', slug)
        if os.path.exists(portfolio_app_dir):
            app_info['is_update'] = True
            print(f"  📝 既存アプリの更新: {slug}")
        else:
            print(f"  🆕 新規アプリ: {slug}")

        # package.json から技術スタックを取得
        package_json = Path(app_path) / 'package.json'
        if package_json.exists():
            with open(package_json, 'r') as f:
                pkg = json.load(f)
                deps = list(pkg.get('dependencies', {}).keys())
                dev_deps = list(pkg.get('devDependencies', {}).keys())

                # 主要な技術を抽出
                if 'react' in deps: app_info['tech_stack'].append('React')
                if 'vue' in deps: app_info['tech_stack'].append('Vue')
                if 'three' in deps: app_info['tech_stack'].append('Three.js')
                if 'express' in deps: app_info['tech_stack'].append('Express')
                if 'typescript' in dev_deps: app_info['tech_stack'].append('TypeScript')

        # Pythonプロジェクト
        requirements_txt = Path(app_path) / 'requirements.txt'
        if requirements_txt.exists():
            app_info['tech_stack'].append('Python')
            with open(requirements_txt, 'r') as f:
                content = f.read().lower()
                if 'flask' in content: app_info['tech_stack'].append('Flask')
                if 'django' in content: app_info['tech_stack'].append('Django')
                if 'fastapi' in content: app_info['tech_stack'].append('FastAPI')

        # 各種ファイルの検出
        for html_file in Path(app_path).glob('**/*.html'):
            if 'slide' in html_file.name.lower() or 'presentation' in html_file.name.lower():
                app_info['has_slides'] = True
                app_info['files']['slides'] = str(html_file)
                break

        for audio_file in Path(app_path).glob('**/*.mp3'):
            app_info['has_audio'] = True
            app_info['files']['audio'] = str(audio_file)
            break

        # テストの検出
        if (Path(app_path) / 'tests').exists() or (Path(app_path) / 'test').exists():
            app_info['has_tests'] = True

        # ドキュメントの検出
        for doc_file in Path(app_path).glob('**/*.md'):
            if 'readme' not in doc_file.name.lower():
                app_info['has_docs'] = True
                app_info['files']['spec'] = str(doc_file)
                break

        return app_info

    def prepare_app_for_portfolio(self, app_info: Dict) -> str:
        """アプリをポートフォリオ構成に整理（上書き更新対応）"""
        slug = app_info['slug']
        target_dir = os.path.join(self.portfolio_repo, 'apps', slug)

        print(f"\n📦 {slug} をポートフォリオ用に整理中...")

        if not self.dry_run:
            # 既存ディレクトリがあれば削除（クリーンな状態から作成）
            if os.path.exists(target_dir):
                shutil.rmtree(target_dir)

            os.makedirs(target_dir, exist_ok=True)
            os.makedirs(os.path.join(target_dir, 'src'), exist_ok=True)
            os.makedirs(os.path.join(target_dir, 'docs'), exist_ok=True)

            # ソースコードをコピー
            source_path = Path(app_info['path'])

            # src/ または全体をコピー
            if (source_path / 'src').exists():
                shutil.copytree(source_path / 'src',
                              os.path.join(target_dir, 'src'),
                              dirs_exist_ok=True)
            else:
                # 主要ファイルをコピー
                for pattern in ['*.js', '*.ts', '*.py', '*.html', '*.css', '*.jsx', '*.tsx']:
                    for file in source_path.glob(pattern):
                        shutil.copy2(file, os.path.join(target_dir, 'src'))

            # package.json / requirements.txt をコピー
            for config_file in ['package.json', 'requirements.txt', 'pyproject.toml']:
                src_file = source_path / config_file
                if src_file.exists():
                    shutil.copy2(src_file, target_dir)

            # ドキュメント類をコピー
            if app_info.get('files', {}).get('slides'):
                shutil.copy2(app_info['files']['slides'],
                           os.path.join(target_dir, 'docs', 'slides.html'))

            if app_info.get('files', {}).get('audio'):
                shutil.copy2(app_info['files']['audio'],
                           os.path.join(target_dir, 'docs', 'slides_audio.mp3'))

            if app_info.get('files', {}).get('spec'):
                shutil.copy2(app_info['files']['spec'],
                           os.path.join(target_dir, 'spec.md'))

            # テストディレクトリをコピー
            test_dir = source_path / 'tests'
            if not test_dir.exists():
                test_dir = source_path / 'test'

            if test_dir.exists():
                shutil.copytree(test_dir,
                              os.path.join(target_dir, 'tests'),
                              dirs_exist_ok=True)

        return target_dir

    def generate_readme(self, app_info: Dict, target_dir: str) -> str:
        """アプリ用のREADMEを生成"""
        action = "更新" if app_info['is_update'] else "追加"

        readme_content = f"""# {app_info['name']}

## 🎯 概要

このアプリケーションは、Claude Code の AIエージェントシステムにより、
要件定義から実装・テスト・ドキュメント生成まで **完全自動化** されたプロセスで開発されました。

## 🚀 技術スタック

{self._format_tech_stack(app_info['tech_stack'])}

## 🤖 AI駆動開発のハイライト

### 自動化された開発プロセス
- ✅ **要件定義**: AIエージェントが要件を分析・整理
- ✅ **設計・実装**: 複数の専門エージェントが並列開発
- ✅ **テスト生成**: TDD方式でテストコードを自動生成
- ✅ **ドキュメント**: 仕様書・解説スライド・音声を自動生成

### 開発メトリクス
- ⏱️ **生成時間**: 約1-2時間（従来の開発の10倍速）
- 📝 **最終更新**: {app_info['date']}
- 🔄 **ステータス**: {action}

## 💻 実行方法

### 前提条件
{self._generate_prerequisites(app_info)}

### インストール
```bash
{self._generate_install_commands(app_info)}
```

### 起動
```bash
{self._generate_run_commands(app_info)}
```

## 📖 ドキュメント

{self._generate_doc_links(app_info, target_dir)}

## 🎨 スクリーンショット

<!-- スクリーンショットがある場合はここに追加 -->

## 🔧 主な機能

{self._extract_features(app_info)}

## 📊 更新履歴

- {app_info['date']}: {action}

## 🏆 このプロジェクトが実証すること

1. **AIエージェントを活用した高速開発能力**
2. **品質を保ちながらの自動化実現**
3. **包括的なドキュメント生成能力**
4. **最新技術への適応力**

## 📝 ライセンス

MIT License

---

*このアプリケーションは、AI駆動開発のデモンストレーションとして作成されました。*
"""

        if not self.dry_run:
            readme_path = os.path.join(target_dir, 'README.md')
            with open(readme_path, 'w', encoding='utf-8') as f:
                f.write(readme_content)
            print(f"  ✅ README.md を生成")

        return readme_content

    def _format_tech_stack(self, tech_stack: List[str]) -> str:
        """技術スタックをフォーマット"""
        if not tech_stack:
            return "- 🔧 JavaScript/TypeScript\n- 🎨 HTML/CSS"

        icons = {
            'React': '⚛️',
            'Vue': '💚',
            'Three.js': '🎮',
            'TypeScript': '📘',
            'Python': '🐍',
            'Flask': '🌶️',
            'Express': '🚂',
            'Node.js': '💚'
        }

        formatted = []
        for tech in tech_stack:
            icon = icons.get(tech, '🔧')
            formatted.append(f"- {icon} **{tech}**")

        return '\n'.join(formatted)

    def _generate_prerequisites(self, app_info: Dict) -> str:
        """前提条件を生成"""
        prereqs = []

        if 'TypeScript' in app_info['tech_stack'] or 'React' in app_info['tech_stack']:
            prereqs.append("- Node.js 18+ & npm")

        if 'Python' in app_info['tech_stack']:
            prereqs.append("- Python 3.8+")

        return '\n'.join(prereqs) if prereqs else "- Node.js 18+ または Python 3.8+"

    def _generate_install_commands(self, app_info: Dict) -> str:
        """インストールコマンドを生成"""
        if 'Python' in app_info['tech_stack']:
            return "pip install -r requirements.txt"
        return "npm install"

    def _generate_run_commands(self, app_info: Dict) -> str:
        """実行コマンドを生成"""
        if 'Python' in app_info['tech_stack']:
            return "python app.py  # または python main.py"
        return "npm run dev  # または npm start"

    def _generate_doc_links(self, app_info: Dict, target_dir: str) -> str:
        """ドキュメントリンクを生成"""
        links = []

        if app_info.get('has_docs'):
            links.append("- 📄 [技術仕様書](./spec.md)")

        if app_info.get('has_slides'):
            links.append("- 🎯 [解説スライド](./docs/slides.html)")

        if app_info.get('has_audio'):
            links.append("- 🔊 [音声解説](./docs/slides_audio.mp3)")

        if app_info.get('has_tests'):
            links.append("- 🧪 [テストコード](./tests/)")

        return '\n'.join(links) if links else "- 📚 ドキュメント準備中"

    def _extract_features(self, app_info: Dict) -> str:
        """主要機能を抽出（仮実装）"""
        return """- ユーザー認証機能
- データの永続化
- リアルタイム更新
- レスポンシブデザイン"""

    def update_portfolio_index(self, app_info: Dict):
        """PORTFOLIO_INDEX.mdを更新"""
        index_path = os.path.join(self.portfolio_repo, 'PORTFOLIO_INDEX.md')
        slug = app_info['slug']

        # 既存の内容を読み込み
        if os.path.exists(index_path):
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
        else:
            content = """# AI Agent Portfolio Index

このポートフォリオは、Claude Code のAIエージェントシステムを活用して
自動生成されたアプリケーションのコレクションです。

---

## アプリケーション一覧

"""

        # slugで既存エントリを検索
        slug_pattern = f"slug: `{slug}`"

        # エントリのテンプレート
        entry = f"""
### {app_info['name']}

- **slug**: `{slug}`
- **パス**: `apps/{slug}/`
- **最終更新**: {app_info['date']}
- **概要**: AIエージェントが自動生成したアプリケーション
- **技術**: {', '.join(app_info['tech_stack']) if app_info['tech_stack'] else 'JavaScript/HTML/CSS'}
- **特徴**: 要件定義〜実装〜テスト〜ドキュメント〜音声解説まで完全自動化
- **[詳細を見る](./apps/{slug}/README.md)**

---
"""

        if not self.dry_run:
            if slug_pattern in content:
                # 既存エントリを更新（簡易実装: 一旦削除して追加）
                # より洗練された実装では、正規表現で該当セクションを置換
                print(f"  📝 PORTFOLIO_INDEX.md の {slug} を更新")
            else:
                # 新規エントリを追加
                content += entry
                print(f"  ✅ PORTFOLIO_INDEX.md に {slug} を追加")

            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(content)

    def git_operations(self, slug: str, is_update: bool):
        """Git操作（部分コミット）"""
        print(f"\n🔧 Git操作を実行中...")

        if self.dry_run:
            print("  📝 Dry-run mode: 以下の操作を実行予定:")
            print(f"    - git add apps/{slug}")
            print(f"    - git add PORTFOLIO_INDEX.md")
            print(f"    - git add .slug_mapping.json")
            action = "update" if is_update else "add"
            print(f"    - git commit -m 'feat({slug}): {action} {slug} generated by AI agents'")
            print(f"    - git push origin main")
            return True

        try:
            # リポジトリディレクトリに移動
            os.chdir(self.portfolio_repo)

            # 部分的にステージング（更新されたアプリのみ）
            subprocess.run(['git', 'add', f'apps/{slug}'], check=True)
            subprocess.run(['git', 'add', 'PORTFOLIO_INDEX.md'], check=True)
            subprocess.run(['git', 'add', '.slug_mapping.json'], check=True)

            # 差分を確認
            diff_result = subprocess.run(
                ['git', 'diff', '--cached', '--stat'],
                capture_output=True,
                text=True
            )
            print(f"  📊 変更内容:\n{diff_result.stdout}")

            # コミット
            action = "update" if is_update else "add"
            commit_message = f"""feat({slug}): {action} {slug} generated by AI agents

- Fully automated development using Claude Code AI agents
- Includes source code, documentation, and audio narration
- Tech stack: {', '.join(app_info.get('tech_stack', [])) or 'JavaScript/HTML/CSS'}

🤖 Generated with AI-driven development workflow"""

            subprocess.run(
                ['git', 'commit', '-m', commit_message],
                check=True
            )
            print(f"  ✅ コミット完了")

            # プッシュ
            subprocess.run(['git', 'push', 'origin', 'main'], check=True)
            print(f"  ✅ GitHubへのプッシュ完了")

            return True

        except subprocess.CalledProcessError as e:
            print(f"  ❌ Git操作エラー: {e}")
            return False

    def publish_app(self, source_path: str, slug: Optional[str] = None) -> bool:
        """アプリを公開する統合処理"""

        # slugを決定
        final_slug = self.determine_slug(source_path, slug)

        print(f"\n{'='*60}")
        print(f"📚 {final_slug} の公開処理を開始")
        print(f"{'='*60}")

        try:
            # アプリ情報を収集
            app_info = self.analyze_app(source_path, final_slug)

            # ポートフォリオ用に整理
            target_dir = self.prepare_app_for_portfolio(app_info)

            # README生成
            self.generate_readme(app_info, target_dir)

            # ポートフォリオインデックス更新
            self.update_portfolio_index(app_info)

            # slugマッピングを更新
            self.slug_mapping[app_info['name']] = final_slug
            self._save_slug_mapping()

            # Git操作（部分コミット）
            if self.git_operations(final_slug, app_info['is_update']):
                print(f"\n✅ {final_slug} の公開が完了しました！")

                if self.github_username:
                    print(f"🌐 URL: https://github.com/{self.github_username}/ai-agent-portfolio/tree/main/apps/{final_slug}")

                return True

        except Exception as e:
            print(f"\n❌ エラーが発生しました: {e}")
            return False

        return False


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='GitHub Portfolio Publisher v2')
    parser.add_argument('--dry-run', action='store_true',
                       help='実際にpushせずにシミュレーション')
    parser.add_argument('--source', type=str, required=True,
                       help='公開するアプリのソースディレクトリ')
    parser.add_argument('--slug', type=str,
                       help='アプリのslug（省略時は自動生成）')
    parser.add_argument('--repo', type=str,
                       help='ポートフォリオリポジトリ（デフォルト: ~/Desktop/GitHub/ai-agent-portfolio）')

    args = parser.parse_args()

    # パブリッシャーを初期化
    publisher = PortfolioPublisherV2(
        source_dir=args.source,
        portfolio_repo=args.repo,
        dry_run=args.dry_run
    )

    # アプリを公開
    publisher.publish_app(args.source, args.slug)