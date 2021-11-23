# ゆるDJ (in ゆる楽器ハッカソン2021)

## 動作環境

- macOS Catalina
- Touch Designer
- Node.js

## Setup

### 音源再生・エフェクトプログラムのセットアップ

音源の再生やエフェクトの適用にはTouch Designerというツールを使用しています.  
以下のリンクからインストールしてください.  
https://derivative.ca

インストールしたあと, `hoge.toe`を起動すれば音源プログラムの準備は完了です.

### サーバプログラムのセットアップ

サーバとなるプログラム (`main.js`) では, toioやSpresenseなどから取得したデータを処理し, Open Sound Controlを通してTouch Designerプログラムに渡しています.  
Node.jsをランタイムとして実行しています. 以下のリンクからNode.jsをインストールしてください.  
https://nodejs.org/ja/

[`main.js`の`SERIAL_PORT`](https://github.com/shikibu9419/yuru-DJ/blob/main/main.js#L9)を, 対応するポートに書き換えてください.

インストールしたあと, 以下のコマンドを実行すればサーバが起動します.

```shell
# ライブラリのインストール
$ npm ci
# プログラムの起動
$ node main.js
```
