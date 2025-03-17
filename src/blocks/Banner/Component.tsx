import type { BannerBlock as BannerBlockProps, BannerType } from 'src/payload-types'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import './Component.scss'

type Props = {
  className?: string
} & BannerBlockProps

type BannerCardProps = {
  className?: string; // classNameをオプショナルに
  children: React.ReactNode;
  style: BannerType['style'];
}

export const BannerCard: React.FC<BannerCardProps> = ({className, children, style}) => {
  return (
    <div className={cn('comp__banner',
      {
          'border-border bg-card comp__banner_info': style === 'info',
          'border-error bg-error/30 comp__banner_error': style === 'error',
          'border-success bg-success/30 comp__banner_success': style === 'success',
          'border-warning bg-warning/30 comp__banner_warning': style === 'warning',
        },
    className)}>
      {children}
    </div>
  )
}
export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <BannerCard style={style}>
        <RichText content={content} enableGutter={false} enableProse={false} />
      </BannerCard>
    </div>
  )
}
