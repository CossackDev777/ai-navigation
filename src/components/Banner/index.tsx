'use client'
import { cn } from '@/utilities/cn'
import { formatDate } from '@/utilities/formatDate'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import './index.scss'

export type CardData = Pick<Page, 'slug' | 'title' | 'meta' | 'subTitle' | 'catchPhrase' | 'coverImage'>

export const Banner: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardData
  showDescription?: boolean
  showSubTitle?: boolean
  showCatchPhrase?: boolean
  showTitle?: boolean
  title?: string
  layout?: 'vertical' | 'horizontal'
  styleType?: 'default' | 'overlay'
  size?: 'small' | 'medium' | 'large'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    showDescription = false,
    showSubTitle = false,
    showCatchPhrase = false,
    showTitle = true,
    title: titleFromProps,
    layout = 'vertical', // default layout is vertical
    styleType = 'default',
    size = 'medium',
  } = props

  const { slug, title, subTitle, catchPhrase, meta, coverImage } = doc || {}
  const { description, image: metaImage } = meta || {}
  const href = `/${slug}`
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const isM = size === 'medium'
  const isL = size === 'large'
  const isS = size === 'small'
  const isOverlay = styleType === 'overlay'
  // console.log("metaImage:", metaImage)
  const imageToUse = metaImage || coverImage

  return (
    <article
      className={cn(
        'banner__article rounded-xl',
        isOverlay && 'banner__article_overlay',
        {
          'banner__article_small': isS,
          'banner__article_medium': isM,
          'banner__article_large': isL,
        },
        isM && "@container/banner",
        // isVertical ? 'flex-col card__article_vertical' : 'card__article_horizontal flex-col md:flex-row',
        // isOverlay ? 'card__article_overlay banner__article_overlay' : 'card__article_default',
        className,
      )}
      ref={card.ref}
    >
      <Link className="banner__link banner__article_link flex flex-col h-full" href={href} ref={link.ref}>
        <div className={cn(
          "banner__head relative w-full"
          )}>
          {isOverlay && <div className="banner__overlay_bg"></div>}
          {!metaImage && !coverImage && <div className="bg-slate-400 fit-image"></div>}
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" className="fit-image" />}
        </div>
        <div className={cn("banner__body flex flex-col p-4 gap-2", isM && "@sm/banner:px-8 @lg/banner:px-12 @xl/banner:px-20")}>

          {titleToUse && showTitle && (
            <div className={cn("posc__title prose")}>
              <h3 className={cn("posc__h3 line-clamp-2")}>
                {titleToUse}
              </h3>
            </div>
          )}
                  {/* subTitleの表示 */}
          {subTitle && showSubTitle && (
            <div className="posc__subtitle">
              <span className="posc__subtitle_label">{subTitle}</span>
            </div>
          )}

          {/* catchPhraseの表示 */}
          {catchPhrase && showCatchPhrase && (
            <RichText
              content={catchPhrase}
              className="posc__catchphrase"
            />
          )}
          {description && showDescription && (
            <div className={cn("posc__excerpt" )}>
              {description && <p>{sanitizedDescription}</p>}
            </div>
          )}

        </div>
      </Link>
    </article>
  )
}
