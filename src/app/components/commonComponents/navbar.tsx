"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const { data: session } = useSession()

  return (
      <nav className="bg-white shadow-lg sticky top-0 z-50 font-sans">
        <div className="container mx-auto px-1">
          <div className="flex justify-between items-center py-4">
            <Link href={"/"} className="text-2xl font-bold">
              ImageGallery
            </Link>
            <div className="flex items-center space-x-4">
              <Link href={"/"} className='text-gray-600 hover:text-gray-800 px-4 py-2'>
                ホーム
              </Link>
              <Link href={"/upload"} className="text-gray-600 hover:text-gray-800 px-4 py-2">
                投稿する
              </Link>
              <a href="settings" className="text-gray-600 hover:text-gray-800 px-4 py-2">設定</a>
              {session && (
                <div className="relative">
                  <Link href={"/myprofile"}>
                    <Image
                      src={session?.user?.image || 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png'}
                      alt="ユーザーアイコン"
                      width={40}
                      height={40}
                      className="rounded-full transition duration-300 transform hover:scale-110"
                    />
                  </Link>
                </div>
              )}
              {!session && (
                <div className="relative">
                  <Link href={"/profile"}>
                    <Image
                      src={'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png'}
                      alt="ユーザーアイコン"
                      width={40}
                      height={40}
                      className="rounded-full transition duration-300 transform hover:scale-110"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
  )
}