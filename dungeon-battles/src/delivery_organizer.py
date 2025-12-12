#!/usr/bin/env python3
"""
📦 成果物集約システム (Delivery Organizer)
Generated files are consolidated into a DELIVERY folder for better UX
"""

import os
import shutil
import json
from pathlib import Path
from datetime import datetime
import subprocess
import sys

class DeliveryOrganizer:
    """成果物を整理してDELIVERYフォルダに集約"""

    def __init__(self, project_path):
        self.project_path = Path(project_path)
        self.delivery_path = self.project_path / "DELIVERY"
        self.project_info = self._load_project_info()

    def _load_project_info(self):
        """PROJECT_INFO.yamlから情報を読み込み"""
        info_file = self.project_path / "PROJECT_INFO.yaml"
        if info_file.exists():
            import yaml
            with open(info_file, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        return {
            "project_name": self.project_path.name,
            "development_type": "Portfolio App",
            "database_type": "SQLite",
            "cost": "$0"
        }

    def organize_deliverables(self):
        """Phase 5完了後に実行"""
        print("\n" + "="*60)
        print("📦 成果物を DELIVERY フォルダに集約中...")
        print("="*60)

        # 1. DELIVERYフォルダ作成
        self.delivery_path.mkdir(exist_ok=True)
        print(f"✅ DELIVERYフォルダ作成: {self.delivery_path}")

        # 2. 重要ファイルをコピー
        self.copy_essentials()

        # 3. サマリーページ生成
        self.generate_summary()

        # 4. ドキュメント整理
        self.organize_docs()

        # 5. 完了メッセージ
        self.show_completion_message()

    def copy_essentials(self):
        """必須ファイルをDELIVERYにコピー"""
        essentials = {
            "README.md": "📄 使い方ガイド",
            "launch_app.command": "🚀 アプリ起動",
            "about.html": "🌐 プロジェクト紹介",
            "explanation.mp3": "🔊 音声解説",
            "presentation.html": "📊 プレゼン資料",
            "invoice_template.pdf": "💰 請求書テンプレート"
        }

        copied_count = 0
        for file, description in essentials.items():
            src = self.project_path / file
            if src.exists():
                dst = self.delivery_path / file
                shutil.copy2(src, dst)
                print(f"  ✅ {description}: {file}")
                copied_count += 1
            else:
                # ファイルが見つからない場合は警告のみ
                if file in ["README.md", "launch_app.command"]:
                    print(f"  ⚠️  {description}: {file} (見つかりません - 重要)")
                else:
                    print(f"  ℹ️  {description}: {file} (スキップ)")

        print(f"\n  📦 {copied_count} ファイルをコピーしました")

    def organize_docs(self):
        """重要ドキュメントを整理（ポートフォリオ用に拡充）"""
        docs_path = self.delivery_path / "docs"

        # カテゴリ別にドキュメントを整理
        doc_categories = {
            "design": {
                "name": "📐 設計書",
                "files": [
                    "requirements.md",
                    "requirements.txt",
                    "architecture.md",
                    "system_design.md",
                    "database_schema.sql",
                    "database_design.md",
                    "api_spec.yaml",
                    "api_design.md",
                    "wbs.json",
                    "wbs.md"
                ]
            },
            "test": {
                "name": "🧪 テスト関連",
                "files": [
                    "test_plan.md",
                    "test_report.md",
                    "test_results.md",
                    "coverage_report.html",
                    "coverage.txt",
                    "test_summary.md"
                ]
            },
            "management": {
                "name": "📋 管理文書",
                "files": [
                    "COST_ESTIMATE.md",
                    "USER_GUIDE.md",
                    "API_DOCS.md",
                    "DEPLOYMENT_GUIDE.md",
                    "MAINTENANCE_GUIDE.md",
                    "PROJECT_INFO.yaml",
                    "PROJECT_OVERVIEW.md"
                ]
            }
        }

        total_docs = 0
        category_summary = []

        for category, info in doc_categories.items():
            category_path = docs_path / category
            category_found = False

            print(f"\n  {info['name']}:")

            for doc_file in info['files']:
                # ルートディレクトリから探す
                src = self.project_path / doc_file
                if not src.exists():
                    # docsディレクトリからも探す
                    src = self.project_path / "docs" / doc_file
                if not src.exists():
                    # testsディレクトリからも探す（テスト関連）
                    if category == "test":
                        src = self.project_path / "tests" / doc_file

                if src.exists():
                    if not category_path.exists():
                        category_path.mkdir(parents=True, exist_ok=True)
                    dst = category_path / doc_file
                    shutil.copy2(src, dst)
                    category_found = True
                    total_docs += 1
                    print(f"    ✅ {doc_file}")

            if category_found:
                category_summary.append(f"{info['name']}")
            else:
                print(f"    ℹ️ このカテゴリのドキュメントは見つかりませんでした")

        # ワイルドカード検索で追加のドキュメントを探す
        print(f"\n  📄 その他のドキュメント検索中...")

        # 拡張子でドキュメントを検索
        doc_extensions = ['.md', '.txt', '.pdf', '.html', '.json', '.yaml', '.yml', '.sql']
        other_docs_path = docs_path / "other"
        other_found = False

        for ext in doc_extensions:
            for doc_file in self.project_path.glob(f"*{ext}"):
                # 既にコピー済みのファイルはスキップ
                if doc_file.name in ["README.md", "package.json", "package-lock.json",
                                     "tsconfig.json", "about.html", "summary.html"]:
                    continue

                # PROJECT_で始まるファイルは重要
                if doc_file.name.startswith("PROJECT_") or \
                   doc_file.name.endswith("_spec" + ext) or \
                   doc_file.name.endswith("_design" + ext) or \
                   doc_file.name.endswith("_report" + ext):
                    if not other_docs_path.exists():
                        other_docs_path.mkdir(parents=True, exist_ok=True)
                    dst = other_docs_path / doc_file.name
                    if not dst.exists():
                        shutil.copy2(doc_file, dst)
                        other_found = True
                        total_docs += 1
                        print(f"    ✅ {doc_file.name}")

        if other_found:
            category_summary.append("📑 その他")

        # PlantUMLやMermaid図も探す
        for diagram_ext in ['*.puml', '*.plantuml', '*.mmd', '*.mermaid']:
            for diagram_file in self.project_path.glob(f"**/{diagram_ext}"):
                diagram_path = docs_path / "diagrams"
                if not diagram_path.exists():
                    diagram_path.mkdir(parents=True, exist_ok=True)
                dst = diagram_path / diagram_file.name
                if not dst.exists():
                    shutil.copy2(diagram_file, dst)
                    total_docs += 1
                    print(f"    ✅ 図: {diagram_file.name}")
                    if "📊 図表" not in category_summary:
                        category_summary.append("📊 図表")

        if total_docs > 0:
            print(f"\n  📚 合計 {total_docs} 個のドキュメントを整理しました")
            print(f"  📂 カテゴリ: {', '.join(category_summary)}")
        else:
            print(f"\n  ℹ️ 追加のドキュメントは見つかりませんでした")

    def _generate_docs_section(self, doc_categories_found):
        """ドキュメントセクションのHTMLを生成"""
        if not doc_categories_found or not any(doc_categories_found.values()):
            return ""

        html_parts = ['<div class="section docs-section">']
        html_parts.append('<h2>📚 技術ドキュメント（ポートフォリオ用）</h2>')
        html_parts.append('<p>プロジェクトの設計書、テスト結果、管理文書が整理されています。</p>')

        category_info = {
            "design": {
                "title": "📐 設計書",
                "desc": "要件定義、アーキテクチャ、DB設計など"
            },
            "test": {
                "title": "🧪 テスト関連",
                "desc": "テスト計画、実行結果、カバレッジレポート"
            },
            "management": {
                "title": "📋 管理文書",
                "desc": "プロジェクト管理、ユーザーガイド、デプロイ手順"
            },
            "diagrams": {
                "title": "📊 図表・設計図",
                "desc": "PlantUML、Mermaid図など"
            },
            "other": {
                "title": "📑 その他",
                "desc": "追加のドキュメント"
            }
        }

        for category, files in doc_categories_found.items():
            if files:
                info = category_info.get(category, {"title": category, "desc": ""})
                html_parts.append(f'<div class="doc-category">')
                html_parts.append(f'<h4>{info["title"]}</h4>')
                if info["desc"]:
                    html_parts.append(f'<p style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">{info["desc"]}</p>')
                html_parts.append('<ul class="doc-list">')

                # ファイル名のみ表示（最大5個まで、それ以上は省略）
                for i, file_path in enumerate(files[:5]):
                    html_parts.append(f'<li>{file_path.name}</li>')

                if len(files) > 5:
                    html_parts.append(f'<li style="color: #999;">... 他 {len(files) - 5} ファイル</li>')

                html_parts.append('</ul>')
                html_parts.append('</div>')

        html_parts.append('<div style="margin-top: 1.5rem; padding: 1rem; background: #e8f4ff; border-radius: 5px;">')
        html_parts.append('<strong>💡 ポートフォリオとして活用</strong><br>')
        html_parts.append('これらのドキュメントは技術力をアピールする重要な資料です。<br>')
        html_parts.append('GitHubにpushする際は、docs/フォルダも含めることをお勧めします。')
        html_parts.append('</div>')

        html_parts.append('</div>')

        return '\n'.join(html_parts)

    def generate_summary(self):
        """統合サマリーページを生成"""

        # プロジェクト情報を取得
        project_name = self.project_info.get("project_name", "Project")
        development_type = self.project_info.get("development_type", "Portfolio App")
        database_type = self.project_info.get("database_type", "SQLite")
        cost = self.project_info.get("cost", "$0")

        # ファイルの存在チェック
        files_exist = {
            "readme": (self.delivery_path / "README.md").exists(),
            "about": (self.delivery_path / "about.html").exists(),
            "audio": (self.delivery_path / "explanation.mp3").exists(),
            "launch": (self.delivery_path / "launch_app.command").exists()
        }

        # ドキュメントの存在チェック
        docs_path = self.delivery_path / "docs"
        doc_categories_found = {}

        if docs_path.exists():
            doc_categories_found["design"] = list((docs_path / "design").glob("*")) if (docs_path / "design").exists() else []
            doc_categories_found["test"] = list((docs_path / "test").glob("*")) if (docs_path / "test").exists() else []
            doc_categories_found["management"] = list((docs_path / "management").glob("*")) if (docs_path / "management").exists() else []
            doc_categories_found["other"] = list((docs_path / "other").glob("*")) if (docs_path / "other").exists() else []
            doc_categories_found["diagrams"] = list((docs_path / "diagrams").glob("*")) if (docs_path / "diagrams").exists() else []

        # JavaScript部分を先に定義
        if files_exist["launch"]:
            launch_alert = 'alert("launch_app.command をダブルクリックしてください\\n\\n起動しない場合は、ターミナルで:\\nchmod +x launch_app.command\\n./launch_app.command");'
        else:
            launch_alert = 'alert("起動スクリプトが見つかりません。\\nプロジェクトフォルダを確認してください。");'

        if files_exist["audio"]:
            audio_script = "const audio = document.getElementById('audioPlayer'); if (audio) { if (audio.paused) { audio.play(); } else { audio.pause(); } }"
        else:
            audio_script = "alert('音声ファイルが見つかりません。');"

        summary_html = f'''<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📦 {project_name} - 成果物一覧</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }}
        .container {{
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #333;
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 2rem;
        }}
        .section {{
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: #f8f9fa;
            border-radius: 10px;
        }}
        .file-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.2rem;
            margin-top: 1rem;
        }}
        .file-card {{
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            border: 2px solid #e0e0e0;
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }}
        .file-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            border-color: #667eea;
        }}
        .file-card.disabled {{
            opacity: 0.5;
            cursor: not-allowed;
        }}
        .file-card.disabled:hover {{
            transform: none;
            box-shadow: none;
            border-color: #e0e0e0;
        }}
        .file-icon {{ font-size: 2rem; margin-bottom: 0.5rem; }}
        .file-name {{ font-weight: bold; color: #333; margin-bottom: 0.5rem; }}
        .file-desc {{ color: #666; font-size: 0.9rem; line-height: 1.4; }}
        .quick-start {{
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 2rem;
        }}
        .start-button {{
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 1rem;
            transition: transform 0.3s;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }}
        .start-button:hover {{
            transform: scale(1.05);
        }}
        .start-button.disabled {{
            opacity: 0.5;
            cursor: not-allowed;
        }}
        .start-button.disabled:hover {{
            transform: none;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
        }}
        td {{
            padding: 0.8rem;
            border-bottom: 1px solid #e0e0e0;
        }}
        td:first-child {{
            font-weight: 600;
            width: 40%;
        }}
        .status-badge {{
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }}
        .status-ready {{
            background: #d4edda;
            color: #155724;
        }}
        .status-missing {{
            background: #f8d7da;
            color: #721c24;
        }}
        .next-steps {{
            background: #d1ecf1;
            border-left: 4px solid #0c5460;
        }}
        ol {{
            margin-left: 1.5rem;
            line-height: 1.8;
        }}
        .audio-player {{
            width: 100%;
            margin-top: 1rem;
        }}
        .docs-section {{
            background: #f0f7ff;
            border: 2px solid #0066cc;
        }}
        .doc-category {{
            margin-bottom: 1rem;
        }}
        .doc-category h4 {{
            color: #0066cc;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }}
        .doc-list {{
            list-style: none;
            padding-left: 1.5rem;
        }}
        .doc-list li {{
            padding: 0.25rem 0;
            color: #555;
        }}
        .doc-list li:before {{
            content: "📄 ";
            margin-right: 0.5rem;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📦 {project_name} - 成果物一覧</h1>

        <div class="quick-start">
            <h2>🚀 クイックスタート</h2>
            <p>アプリを今すぐ起動できます！</p>
            {"<button class='start-button' onclick='launchApp()'>アプリを起動</button>" if files_exist["launch"] else "<button class='start-button disabled' disabled>起動スクリプトが見つかりません</button>"}
        </div>

        <div class="section">
            <h2>📄 重要ファイル</h2>
            <div class="file-grid">
                {"<a href='README.md' target='_blank' class='file-card'>" if files_exist["readme"] else "<div class='file-card disabled'>"}
                    <div class="file-icon">📄</div>
                    <div class="file-name">README.md</div>
                    <div class="file-desc">使い方・インストール方法<br>技術仕様の詳細</div>
                {"</a>" if files_exist["readme"] else "</div>"}

                {"<a href='about.html' target='_blank' class='file-card'>" if files_exist["about"] else "<div class='file-card disabled'>"}
                    <div class="file-icon">🌐</div>
                    <div class="file-name">about.html</div>
                    <div class="file-desc">プロジェクト紹介ページ<br>ビジュアル付き説明</div>
                {"</a>" if files_exist["about"] else "</div>"}

                {"<div class='file-card' onclick='toggleAudio()'>" if files_exist["audio"] else "<div class='file-card disabled'>"}
                    <div class="file-icon">🔊</div>
                    <div class="file-name">explanation.mp3</div>
                    <div class="file-desc">音声解説<br>{"クリックで再生/停止" if files_exist["audio"] else "ファイルが見つかりません"}</div>
                </div>

                {"<div class='file-card' onclick='launchApp()'>" if files_exist["launch"] else "<div class='file-card disabled'>"}
                    <div class="file-icon">🚀</div>
                    <div class="file-name">launch_app.command</div>
                    <div class="file-desc">ワンクリック起動<br>{"ダブルクリックでも起動可" if files_exist["launch"] else "ファイルが見つかりません"}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>📊 プロジェクト情報</h2>
            <table>
                <tr>
                    <td>開発方式</td>
                    <td>{development_type}</td>
                </tr>
                <tr>
                    <td>データベース</td>
                    <td>{database_type}</td>
                </tr>
                <tr>
                    <td>実行コスト</td>
                    <td><span class="status-badge status-ready">{cost}</span></td>
                </tr>
                <tr>
                    <td>生成日時</td>
                    <td>{datetime.now().strftime('%Y-%m-%d %H:%M')}</td>
                </tr>
                <tr>
                    <td>ファイル状態</td>
                    <td>
                        {"<span class='status-badge status-ready'>✅ 全ファイル揃っています</span>" if all(files_exist.values()) else f"<span class='status-badge status-missing'>⚠️ 一部ファイルが不足</span>"}
                    </td>
                </tr>
            </table>
        </div>

        {self._generate_docs_section(doc_categories_found)}

        <div class="section next-steps">
            <h2>✨ 次のステップ</h2>
            <ol>
                <li>{"<strong>launch_app.command</strong> をダブルクリックして起動" if files_exist["launch"] else "起動スクリプトを確認してください"}</li>
                <li>{"<strong>about.html</strong> でプロジェクトの詳細を確認" if files_exist["about"] else "プロジェクト紹介ページを確認"}</li>
                <li>{"<strong>README.md</strong> で技術的な詳細を確認" if files_exist["readme"] else "READMEファイルを確認"}</li>
                <li>{"<strong>docs/</strong> フォルダで設計書・テスト資料を確認" if docs_path.exists() and any(doc_categories_found.values()) else "ドキュメントを確認"}</li>
                <li>必要に応じてソースコードをカスタマイズ</li>
            </ol>
        </div>

        {"<div class='section'><h2>🎵 音声解説</h2><audio id='audioPlayer' controls class='audio-player'><source src='explanation.mp3' type='audio/mpeg'>お使いのブラウザは音声再生に対応していません。</audio></div>" if files_exist["audio"] else ""}
    </div>

    <script>
        function launchApp() {{
            {launch_alert}
        }}

        function toggleAudio() {{
            {audio_script}
        }}
    </script>
</body>
</html>'''

        # summary.html を生成
        summary_path = self.delivery_path / "summary.html"
        with open(summary_path, 'w', encoding='utf-8') as f:
            f.write(summary_html)
        print(f"\n  ✅ サマリーページ生成: summary.html")

    def show_completion_message(self):
        """完了メッセージ表示"""
        print(f'''
========================================
🎉 開発完了！成果物を確認してください
========================================

📁 確認フォルダ: DELIVERY/

重要ファイル:
''')

        files_to_check = [
            ("launch_app.command", "🚀", "ダブルクリックで起動"),
            ("summary.html", "📊", "全体サマリー（まずこれを開く）"),
            ("about.html", "🌐", "プロジェクト紹介"),
            ("README.md", "📄", "詳細ドキュメント"),
            ("explanation.mp3", "🔊", "音声解説")
        ]

        for filename, icon, desc in files_to_check:
            if (self.delivery_path / filename).exists():
                print(f"  {icon} {filename:<20} - {desc}")

        print(f'''
起動方法:
  1. DELIVERY フォルダを開く
  2. summary.html をブラウザで開く
  3. launch_app.command をダブルクリック

ブラウザで確認:
  open {self.delivery_path}/summary.html

========================================
        ''')

def main():
    """コマンドライン実行用"""
    if len(sys.argv) > 1:
        project_path = sys.argv[1]
    else:
        project_path = os.getcwd()

    organizer = DeliveryOrganizer(project_path)
    organizer.organize_deliverables()

if __name__ == "__main__":
    main()