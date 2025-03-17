'use client'

import NextImage, { StaticImageData } from 'next/image'
import React from 'react'

import { cn } from 'src/utilities/cn'
import { getSizes } from '@/utilities/getSizes'
import { cssVariables } from '@/cssVariables'
import type { Props as MediaProps } from '../types'

const placeholderBlur =
  'data:image/png;base64,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'

export const ResponsiveImageMedia: React.FC<MediaProps> = ({
  alt = '',
  src,
  size: sizeFromProps,
  priority,
  className,
  imgClassName,
  aspect,
  resource,
  loading = 'lazy',
  fill,
  breakpoints = { sm: 768, md: 1024, lg: 1280 },
  generateSrcSet = (imageSrc, widths) =>
    widths.map((w) => `${imageSrc} ${w}w`).join(', '),
  layout = 'horizontal',
  styleType
}) => {
  let imageSrc: string | StaticImageData = src || ''
  let width: number | undefined
  let height: number | undefined
  let imageAlt = alt
  if (!imageSrc && resource && typeof resource === 'object') {
    const {
      url,
      width: fullWidth,
      height: fullHeight,
      alt: altFromResource
    } = resource
    imageSrc = url || ''
    width = fullWidth!
    height = fullHeight!
    imageAlt = altFromResource || ''
  }

  if (typeof imageSrc !== 'string') {
    imageSrc = imageSrc?.src ?? ''
  }

  const sizes = getSizes(layout)

  const overlayStyles = styleType === 'overlay'
    ? { width: '100vw', maxWidth: '60%' }
    : {}

  const predefinedWidths = [240, 320, 640, 960, 1280]
  return (
    <picture className={cn(className)} style={overlayStyles}>
      {Object.entries(breakpoints).map(([key, breakpoint]) => {
        // Filter widths that are lower than the current breakpoint
        const validWidths = predefinedWidths.filter((w) => w <= breakpoint)

        return (
          <source
            key={key}
            media={`(max-width: ${breakpoint}px)`}
            sizes={sizes}
            srcSet={generateSrcSet(imageSrc, validWidths)}
          />
        )
      })}
      <NextImage
        src={imageSrc || placeholderBlur}
        alt={imageAlt}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        className={cn(imgClassName)}
        priority={priority}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        sizes={sizes}
        loading={loading}
        fill={fill}
      />
    </picture>
  )
}
