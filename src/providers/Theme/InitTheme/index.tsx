'use client'
import React, { useEffect } from 'react'
import { useTheme } from '..'
import { Theme, themeLocalStorageKey } from './types'

export const InitTheme: React.FC = () => {
  const { setTheme } = useTheme()

  useEffect(() => {
    const theme = 'light'
    setTheme(theme as Theme)
    window.localStorage.setItem(themeLocalStorageKey, theme)
  }, [setTheme])

  return null
}
