# gh-obs-crx 🔭

GitHub 観測所（bonsai repos-analyze / repo-snapshot-skill / profile）への
クイックアクセス Chrome 拡張（Manifest V3 / 最小権限）。

## ビルド済み

- `bonsai-obs.crx` — CRX3 パック済み
- `extension/` — ソース（load unpacked 用）

## インストール

1. `chrome://extensions` → デベロッパーモード ON
2. 推奨: 「パッケージ化されていない拡張機能を読み込む」で `extension/` を選択
   （*.crx のドラッグ＆ドロップは Web Store 非経由だと拒否される場合あり）

## 機能

- ポップアップに repos-analyze / repo-snapshot-skill / profile のリンク
- 現在タブが GitHub repo なら `owner/repo` 表示 + URL ワンクリックコピー
- 開いているタブ数をバッジ表示

## 鍵の扱い

`bonsai-obs.pem` は **リポジトリ外**（ローカルのみ）に保持。
更新時に同じ鍵で再パックすれば拡張IDが変わらない。パック:

```bash
cd /tmp && npm install crx
node -e '
const fs=require("fs"),path=require("path"),Crx=require("crx");
const crx=new Crx({privateKey:fs.readFileSync("bonsai-obs.pem"),codebase:null});
crx.load("/home/sexy/repo/bonsai-crx/extension").then(()=>crx.pack()).then(b=>fs.writeFileSync("bonsai-obs.crx",b));'
```