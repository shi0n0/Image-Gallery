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
10/1現在、認証機能および画像とタイトル、概要のアップロード機能の開発ができています。  
アップロードされた画像はストレージに保存され、同時データベースに保存されます。  
アップロードしたはいいものの、それを表示するのに手こずっていて少し頓挫しています。

### メモ  
画像のアップロードおよび読み込み・表示にはsupabaseClientを使って表示させるようにします。  
Nextで開発しても可能かもしれませんが、単純に開発スピードが遅くなるのとApp Routerになったためドキュメントが少なく挫折する可能性があるためです。  
既存のドキュメントが通用するSupabaseClientで開発して、必要な場合は後から変更や見直しをしていきます。