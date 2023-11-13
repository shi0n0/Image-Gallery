# Image-Gallery  
Next.js - 13.4を使用したイメージギャラリーです。  
簡易版Pixiv的な感じを構想しています。  

## 技術スタック  
言語・フレームワーク - TypeScript,Next.js13.4  
CSSフレームワーク - Tailwind  
デプロイ - Vercel  
データベース - Supabase(Postgresql)  
ストレージ - Supabase  
認証機能 - Auth.js(旧NextAuth.js)  
スライダー - Swiper  

### 認証機能について  
9/18現在、GITHUBとGOOGLEでの認証ができるようになっています。
できればPixivとかの認証もしたいのですが、可能なのかどうか調査中です。
※X(旧Twitter)の仕様変更で、Auth.jsを使用したX(Twitter)のログインは難しくなっているようなので採用しない方針とします(9/17現在)  

ログインされたアカウントは自動的にデータベースに保存され、セッションの管理までデータベースで完結しています。 

### 進行状況  
10/12現在  
・ログイン  
・アップロード  
・プロフィールページにてアップロードした画像のプレビュー  
・トップページにてアップロードされた全画像のプレビュー  
・プレビューにて一致するタイトルとアイコン、名前を表示  
・マイプロフィールを追加  
・ユーザープロフィールを追加  
・アイコン,ユーザー名からユーザープロフィールに遷移  
・アップロードコンテンツの削除   
・タイトルや概要欄の編集  
・ダッシュボード機能(切り替えタブと投稿作品の一覧)  
・トップページスライダー  
・コメント投稿・読み込み

追加予定  
・閲覧回数  
・いいね  
・いいね回数    
・ダッシュボード機能  
 ・合計リアクション数  
 ・TOP3  
 ・最近投稿されたイラスト etc...  
 ・各ページのレスポンシブ対応

### メモ  
トップページのみある程度のレスポンシブに対応。  
近いうちに随時他ページにもレスポンシブ対応していきたい。  

コメント投稿と読み込み機能を実装(デザインは未実装なので最優先で実装する)
閲覧回数といいねなどは終わり次第優先的に実装したい。  