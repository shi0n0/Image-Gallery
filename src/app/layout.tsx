import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthProvider from '@/providers/NextAuth'
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image-Gallery',
  description: 'shi0n0が個人で開発している画像投稿サイト',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className='px-16 py-10'>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  )
}
