'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
// import { SearchIcon } from 'lucide-react'
import './index.scss'
import { ArrowUpRight } from 'lucide-react'
import NavigationLoadingBar from '@/components/NavigationLoadingBar/NavigationLoadingBar'
interface HeaderNavProps {
  header: HeaderType
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ header, isOpen, setIsOpen }) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()
  const [initialPath, setInitialPath] = useState(pathname)
  const [isNavigating, setIsNavigating] = useState(false)

  // Handles the opening and closing of our nav
  const handleClick = () => {
    setIsOpen(!isOpen)
    setInitialPath(pathname) // Reset initial path when menu is opened
  }

  const handleClose = () => {
    if (pathname !== initialPath) {
      setIsOpen(false)
      setIsNavigating(true)
    }
  }

  // Close menu when pathname changes
  useEffect(() => {
    if (pathname !== initialPath && isOpen) {
      setIsOpen(false)
      setInitialPath(pathname)
    }
  }, [pathname, initialPath, isOpen, setIsOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Add effect to reset navigation state
  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false)
    }
  }, [pathname])

  return (
    <>
      <NavigationLoadingBar isNavigating={isNavigating} />
      <div className="nav__main_open">
        <button
          onClick={handleClick}
          className={cn('nav__main_open_btn', isOpen ? 'is_open' : null)}
        >
          <span
            className={cn(isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6 -translate-y-0.5')}
          ></span>
          <span className={cn(isOpen ? 'w-6 opacity-0' : 'w-4 opacity-100')}></span>
          <span
            className={cn(isOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-2.5 translate-y-0.5')}
          ></span>
        </button>
      </div>

      <nav className={cn('nav__main', isOpen ? 'is_open' : null)}>
        <ul className={cn('nav__main_links nav__inline', isOpen ? 'nav__inline_mobile' : null)}>
          {navItems.map(({ link }, i) => {
            return (
              <li className='nav__inline_item' key={i}>
                <CMSLink
                  {...link}
                  onClick={handleClose}
                  appearance="link"
                  className="nav__inline_link nav__main_link"
                />
              </li>
            )
          })}
        </ul>
        <div className="btn__cta_wrap max-lg:px-4 max-lg:w-full lg:h-full">
          <Button
            asChild
            variant="primaryex"
            className="max-lg:w-full max-lg:py-4 max-lg:h-auto lg:h-full"
            onClick={handleClose}
          >
            <Link className="gap-4 px-5" href="/inquiry">
            今すぐ無料相談
            <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
        {/* <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link> */}
      </nav>
    </>
  )
}
