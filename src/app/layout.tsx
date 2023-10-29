import './globals.css'
import type { Metadata } from 'next'
import NextAuthProvider from '@/providers/NextAuth'
import Navbar from './components/commonComponents/navbar'


export const metadata: Metadata = {
  title: 'Image-Gallery',
  description: 'shi0n0が個人で開発している画像投稿サイト',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className="bg-white">
        <NextAuthProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  )
}
