import * as React from 'react'
import { cn } from '@/utilities/cn'
import './index.scss'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
  type?: string
}> = ({ children, className, width, type }) => {
  const isFull = width === 100
  const isHalf = width === 50
  return (
    <div className={cn("form__field_minimal", isHalf ? 'form__field_half' : 'form__field_full', type && `__${type}`, className)} style={{ maxWidth: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}
