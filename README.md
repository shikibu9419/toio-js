# ゆるDJ (in ゆる楽器ハッカソン2021)

## 動作確認環境

- macOS Catalina 10.15.7
- TouchDesigner 2021.14360
- Node.js v17.0.1

## Setup

### 音源再生・エフェクトプログラムのセットアップ

音源の再生やエフェクトの適用にはTouchDesignerというツールを使用しています.  
以下のリンクからインストールしてください.  
https://derivative.ca

インストールしたあと, `audiosystem.toe`を起動し、各種設定をしてください.(`README`オペレータ内に説明があります)

### サーバプログラムのセットアップ

サーバとなるプログラム (`main.js`) では, toioやSpresenseなどから取得したデータを処理し, Open Sound Controlを通してTouchDesignerプログラムに渡しています.  
Node.jsをランタイムとして実行しています. 以下のリンクからNode.jsをインストールしてください.  
https://nodejs.org/ja/

[`main.js`の`SERIAL_PORT`](https://github.com/shikibu9419/yuru-DJ/blob/main/main.js#L9)を, 対応するポートに書き換えてください.

インストールしたあと, toioを起動しspresenseを接続した状態で以下のコマンドを実行すればサーバが起動します.

```shell
# ライブラリのインストール
$ npm i
# プログラムの起動
$ node main.js
```
