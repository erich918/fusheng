import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Serif_SC, Zhi_Mang_Xing, Geist_Mono } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_SC({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})
const zhiMang = Zhi_Mang_Xing({
  variable: '--font-zhi-mang',
  subsets: ['latin'],
  weight: ['400'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '菩提苑 · 为家人祈福求灵签',
  description:
    '以古籍为根，以师父为引。为家人祈福、求灵签、看八字、解周公梦、批八字、占六爻、看手相、宝宝起名、静心禅坐。一念慈悲，一灯长明。',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2a2218',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`dark ${notoSerif.variable} ${zhiMang.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
