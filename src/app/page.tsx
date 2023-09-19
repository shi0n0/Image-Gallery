"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  const { data: session } = useSession()

  const log = () => {
    console.log(session)
  }

  return (
    <main className="bg-gray-100 font-sans">
      {/* ナビゲーションバー */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-1">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">ImageGallery</div>
            <div className="flex items-center space-x-4"> {/* ユーザーアイコンを含む flex コンテナ */}
              <a href="#" className="text-gray-600 hover:text-gray-800 px-4 py-2">ホーム</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 px-4 py-2">投稿する</a>
              <a href="#" className="text-gray-600 hover:text-gray-800 px-4 py-2">お気に入り</a>
              {session && ( // セッションが存在する場合にユーザーアイコンを表示
                <div className="relative">
                  <Image
                    src={session?.user?.image || 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png'}
                    alt="ユーザーアイコン"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              {!session && (
                <button onClick={() => signIn()} className="text-gray-600 hover:text-gray-800 px-4 py-2">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </main>
  )
}
