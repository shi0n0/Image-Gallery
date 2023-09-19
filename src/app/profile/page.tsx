"use client"
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'

export default function NotFound() {
    return(
        <>
            <div className='text-xl'>プロフィール</div>
            <Link className='underline hover:text-blue-500' href="/">ホームへ戻る</Link>
            <button onClick={() => signIn()} className="text-gray-600 hover:text-gray-800 px-4 py-2">
              ログイン
            </button>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}