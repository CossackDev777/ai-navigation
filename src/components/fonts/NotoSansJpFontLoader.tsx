'use client'
import { useEffect } from 'react'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: true,
})

const NotoSansJpFontLoader = () => {
  useEffect(() => {
    document.fonts.load('1rem "Noto Sans JP"').then(() => {
      document.documentElement.classList.add(notoSansJP.variable)
    })
  }, [])

  return null
}

export default NotoSansJpFontLoader
