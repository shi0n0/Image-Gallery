"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  const log = () => {
    console.log(session)
  }

  return (
    <main>

    </main>
  )
}
