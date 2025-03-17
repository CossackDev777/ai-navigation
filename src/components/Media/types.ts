import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'
import type { Media as MediaType } from '@/payload-types'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData | string // for static media
  videoClassName?: string
  aspect?: number
  breakpoints?: Record<string, number> // Allows external breakpoints definition
  generateSrcSet?: (imageSrc: string, widths: number[]) => string // Allows dynamic srcSet generation
  layout?: 'horizontal' | 'vertical' // Determines dynamic sizes attribute
  styleType?: 'default' | 'overlay' // Supports different styles like overlay mode
}

