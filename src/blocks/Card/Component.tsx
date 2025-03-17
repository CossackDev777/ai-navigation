import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import React from 'react'
// import RichText from '@/components/RichText'

import type { CardBlock as CardBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import './Component.scss'

type Props = CardBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const CardBlock: React.FC<Props> = (props) => {
  const {
    title,
    image,
    captionClassName,
    className,
    imgClassName,
    staticImage,
    disableInnerContainer,
  } = props

  // let caption
  // if (image && typeof image === 'object') caption = image.caption

  return (
    <div
      className={cn(
        'card__grid',
        className,
      )}
    >
      <Media
      className="relative"
        imgClassName={cn('card__image', imgClassName)}
        resource={image}
        src={staticImage}
      />
      {title && (
        <div
          className={cn(
            'card__content',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <div className="card__title">{title}</div>
        </div>
      )}
    </div>
  )
}
