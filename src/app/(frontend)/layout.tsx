import type { Metadata } from 'next'

import React from 'react'
import { cn } from 'src/utilities/cn'
import { Toaster } from 'sonner'
import { Inter, Syne } from 'next/font/google'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { GoogleAnalytics } from '@/components/Analytics/GoogleAnalytics'
import { AdobeFont } from '@/components/fonts/AdobeFont'
import NotoSansJpFontLoader from '@/components/fonts/NotoSansJpFontLoader'
// import SmoothScroll from '@/components/SmoothScroll'

import './styles/globals.scss'
import { getServerSideURL } from '@/utilities/getURL'

const InterSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const SyneMono = Syne({
  subsets: ['latin'],
  variable: '--font-syne-mono',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(InterSans.variable, SyneMono.variable, 'font-sans')}
      lang="ja"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <AdobeFont />
        <NotoSansJpFontLoader />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <GoogleAnalytics />
      </head>
      <body>
        <Toaster position="top-right" richColors />
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          <LivePreviewListener />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@ainavigation',
  },
}
