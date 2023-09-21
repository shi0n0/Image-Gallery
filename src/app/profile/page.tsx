"use client"
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'


export default function Profile() {
  const { data: session } = useSession()

    return(
        <>
            <div className='flex items-end'>
              <Image
                src={session?.user?.image || 'https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png'}
                alt="ユーザーアイコン"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className='text-5xl'>{session?.user?.name || "名無し"}</p>
            </div>
            {session && (
              <button onClick={() => signOut()}>ログアウト</button>
            )}
            {!session && (
              <button onClick={() => signIn()} className="text-gray-600 hover:text-gray-800 px-4 py-2">ログイン</button>
            )} 
        </>
    )
}