"use client"
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function NotFound() {
    return(
        <>
            <div className='text-xl'>プロフィール</div>
            <Link className='underline hover:text-blue-500' href="/">ホームへ戻る</Link>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
}