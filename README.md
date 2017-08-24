# RNHBFav

[HBFav](http://hbfav.bloghackers.net/)のReactNative版です。iOSでのみテストしてます。

<img src="https://i.gyazo.com/da06c8dbba28957cf2d79da227ffbd53.png" width="300">

# 機能

基本は本家HBFavと同じです。

本家と違う点は下記です。

- 人気/新着のエントリが無い
- ブックマーク時のシェアはTwitterのみ
- ブックマークコメントにフォロワーのコメントまとめが無い
- クリップボードのURLからブックマークする機能が無い
- 公開情報のみ扱う

オリジナルの機能は下記です。

- URLを入力してブックマークする機能
- 表記や色味や文字サイズなどのデザイン
- ナイトモード
  - Twitterみたいなやつ。

# Development

## 1) Download

```
git clone https://github.com/YuheiNakasaka/RNHBFav
```

## 2) 依存ライブラリ等インストール

```
cd RNHBFav
npm install
```

## 3) 環境変数設定

[「Consumer key を取得して OAuth 開発をはじめよう」](http://developer.hatena.ne.jp/ja/documents/auth/apis/oauth/consumer)を読んでconsumer key
を取得しておいてください。

src/constants/config.jsファイルを作成し、取得したCONSUMER_KEY, CONSUMER_SECRETを下記のように設定してください。

```[config.js]
export const CONSUMER_KEY = 'YOUR_CONSUMER_KEY';
export const CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET';
```

## 4) 起動

iOSのみ利用できます。

```
react-native run-ios
```
