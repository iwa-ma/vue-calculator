## アプリケーション名
シンプルな電卓アプリ

## 開発目的
 - big.jsを用いて誤差の無い少数点計算検証
 - CI/CDの理解

## 機能
- 四則演算（+, -, ×, ÷）と連続計算
- 数値入力（複数桁・先頭ゼロの扱い）
- 小数点入力（重複禁止、末尾小数点の維持）
- クリア（CA/AE）
- ⌫ (バックスペース)

## スクリーンショット
<img width="30%" alt="image" src="https://github.com/user-attachments/assets/fa5c2795-7c76-4c20-b199-0690da7053bc" />
<img width="30%" alt="image" src="https://github.com/user-attachments/assets/ccbb4c09-8592-4a7a-bebc-a03586c873eb" />
<img width="30%" alt="image" src="https://github.com/user-attachments/assets/a467b272-9600-48ec-abc3-5f8ffe4b0dff" />
<img width="30%" alt="image" src="https://github.com/user-attachments/assets/71ed2c77-84d6-4818-8d94-38460302f0b1" />


## 技術スタック
- **フレームワーク**
- Vue 3 (Composition API)
- TypeScript
- Vite
- Big.js（精度の高い数値計算）

- **バックエンド**
  - Firebase
    - Hosting

- **開発ツール**
  - Vitest
  - @vue/test-utils
  - jsdom

## 公開URL
https://vue-calculator-5d7a5.web.app/

## Zenn記事
[0.2×0.2が0.04000000000000001？ Big.jsで精度問題を検証してみた](https://zenn.dev/iw_mari/articles/c700db8981fb84)

## 開発環境の準備
1. このリポジトリをclone
```bash
git https://github.com/iwa-ma/vue-calculator.git
cd vue-calculator
```

2. 依存パッケージのインストール
```bash
npm install
```

## アプリケーションの起動
開発サーバーを起動するには、以下のコマンドを実行します：
```bash
npm run dev
```
開発サーバーが起動したら、ターミナルに表示されるURLにアクセスしてください。
（デフォルトでは http://localhost:5173 で起動します）

## 課題や今後の改善点
- キーボード操作の充実（NumPad・ショートカット・IME考慮）
- 表示フォーマットの拡張（桁区切り、指数表記、ロケール対応）
など

## ライセンス
MIT
