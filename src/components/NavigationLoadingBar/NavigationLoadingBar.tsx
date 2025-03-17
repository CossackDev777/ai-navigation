import React, { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface NavigationLoadingBarProps {
  isNavigating: boolean
}

const NavigationLoadingBar: React.FC<NavigationLoadingBarProps> = ({ isNavigating }) => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let timeoutId: NodeJS.Timeout

    if (isNavigating) {
      setLoading(true)
      setProgress(0)

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Finish loading after a short delay
      timeoutId = setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          setProgress(0)
        }, 200)
      }, 500)
    }

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timeoutId)
    }
  }, [isNavigating])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200">
      <div
        className="h-full bg-blue-600 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          transition: 'width 0.2s ease-in-out',
        }}
      />
    </div>
  )
}

export default NavigationLoadingBar
