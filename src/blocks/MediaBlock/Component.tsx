import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import './Component.scss'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'media__block',
        caption && 'media__block_caption',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <Media
        imgClassName={cn('posc__media_img border border-border rounded-[0.8rem]', imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            'posc__media_caption',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText content={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
