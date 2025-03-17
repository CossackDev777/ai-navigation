import { getClientSideURL } from '@/utilities/getURL'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'
import './index.scss'
import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  onClick?: () => void
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    onClick,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null
  const currentURL = getClientSideURL()
  const isExternalLink = href && !href.startsWith(currentURL) && !href.startsWith('/') && !href.startsWith('#')

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps =
    newTab || isExternalLink ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const cmsClass = 'btn__cmslink'
  const isPrimary = appearance === 'primary' || appearance === 'primaryex'

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn('inline__link', className)}
        href={href || url || ''}
        {...newTabProps}
        onClick={onClick}
      >
        {label && label}
        {children && children}
        <span className="material-symbols-outlined">link</span>
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={cn(cmsClass, className)}
      size={size}
      variant={isPrimary ? 'primaryex' : appearance}
    >
      <Link className={cn(className)} href={href || url || ''} {...newTabProps} onClick={onClick}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
