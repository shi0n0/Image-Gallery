# Image-Gallery  
Next.js - 13.4を使用したイメージギャラリーです。  
簡易版Pixiv的な感じを構想しています。  

## 技術スタック  
言語・フレームワーク - TypeScript,Next.js13.4  
デプロイ - Vercel  
データベース - Supabase(Postgresql)  
ストレージ - Supabase  
認証機能 - Auth.js(旧NextAuth.js)  

### 認証機能について  
9/18現在、GITHUBとGOOGLEでの認証ができるようになっています。
できればPixivとかの認証もしたいのですが、可能なのかどうか調査中です。
※X(旧Twitter)の仕様変更で、Auth.jsを使用したX(Twitter)のログインは難しくなっているようなので採用しない方針とします(9/17現在)

### 進行状況  
9/22現在、認証機能の開発が完了。
Auth.jsやSupabaseを使うのが初めてだったので理解に時間がかかってしまいました。  
どうにかあらかたの機能を9月中には完成させたいです。