'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('light')
  // }, [setHeaderTheme])
  useEffect(() => {
    // 目次のリンクをクリックした時の処理
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.article__index-link')) {
        e.preventDefault()
        const href = (target.closest('.article__index-link') as HTMLAnchorElement).getAttribute('href')
        const targetElement = document.querySelector(href!)

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })

          // URLにハッシュを追加（オプション）
          history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return <React.Fragment />
}

export default PageClient
