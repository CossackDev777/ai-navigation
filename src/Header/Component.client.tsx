'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/cn'
import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import './Component.scss'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrollUp, setIsScrollUp] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY === 0) {
        setIsScrollUp(false)
      } else {
        setIsScrollUp(currentScrollY < lastScrollY)
      }
      setIsScrolling(currentScrollY > 60)
      lastScrollY = currentScrollY
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHeaderTheme('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

useEffect(() => {
  console.log('headerTheme:', headerTheme)
  console.log('theme:', theme)
  console.log('isNavOpen:', isNavOpen)

  if (!isNavOpen && headerTheme && headerTheme !== theme) {
    console.log('Setting theme to:', headerTheme)
    setTheme(headerTheme)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [headerTheme, isNavOpen])

  return (
    <header
      className={cn(
        'header__main z-20',
        isScrolling && 'is_scrolling',
        isScrollUp && 'is_scroll_up',
        isNavOpen && 'is_open',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="header__main_inner container">
        <Link className={cn('header__main_logo', isNavOpen ? 'is_open' : null)} href="/">
          <Logo
            loading="eager"
            priority="high"
            dark={theme === 'dark' && !isNavOpen && !isScrolling ? false : true}
            className={cn('', isNavOpen ? null : '')}
          />
        </Link>
        <HeaderNav header={header} isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      </div>
    </header>
  )
}
