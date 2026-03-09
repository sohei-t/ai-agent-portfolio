# Picture Merge App

2枚の写真をブラウザ上で結合し、1枚の画像として出力するWebアプリケーション。

## 機能
- ドラッグ&ドロップで2枚の画像をアップロード
- 自動オリエンテーション判定（縦長/横長）
- 出力サイズ: 480x832（縦長）/ 832x480（横長）
- MediaPipe Selfie Segmentation による人物検出（オプション）
- PNG/JPEG形式でダウンロード
- Web Share API対応

## 技術スタック
- React 19 + TypeScript (strict mode)
- Vite + Tailwind CSS v4
- OffscreenCanvas + Web Workers
- MediaPipe Selfie Segmentation
- Framer Motion
- Lucide React

## 使い方
1. 画像を2枚ドラッグ&ドロップ
2. 自動的に結合処理が開始
3. プレビューを確認し、必要に応じて位置調整
4. ダウンロードボタンで保存

## ライブデモ
https://sohei-t.github.io/ai-agent-portfolio/picture-merge-app/

## 開発
```bash
npm install
npm run dev
npm run test
npm run build
```
