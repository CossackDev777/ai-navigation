'use client'

import React from 'react'
import type { Media as MediaType, IconBlock as IconBlockType } from '@/payload-types'
import { Media } from '../../components/Media'
import { cn } from '@/utilities/cn'
import Image, { type StaticImageData } from 'next/image'
import RichText from '@/components/RichText'
import './Component.scss'

type Props = IconBlockType & {
  imgClassName?: string
  staticImage?: StaticImageData
}

export const IconBlock: React.FC<Props> = (props) => {
  const {
    iconImage,
    iconTitle,
    staticImage,
    imgClassName,
    iconDesc
  } = props

  return (
    <div className={cn("icon-block")}>
      <Media
        resource={iconImage}
        src={staticImage}
        className="icon-block__icon"
        imgClassName={cn("icon-block__image", imgClassName)}
      />
      <div className="icon-block__content">
        <p className="icon-block__title">{iconTitle}</p>
        {iconDesc && <RichText className="icon-block__text" content={iconDesc} enableGutter={false} />}
      </div>
    </div>
  )
}
