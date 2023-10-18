import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar'
import Player from '@/components/Player'

import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongByUserId from '@/actions/getSongByUserId'

const font = Figtree({ subsets: ['latin'] })

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Spotify - Web Player: Music for everyone',
  description: 'open.spotify.com',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const songs = await getSongByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={songs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
