'use client'
import { cn } from '@/utilities/cn'
import { formatDate } from '@/utilities/formatDate'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import './index.scss'
import AdminEditButton from '../AdminEditButton'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'createdAt' | 'publishedAt' | 'id'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  showDescription?: boolean
  title?: string
  layout?: 'vertical' | 'horizontal'
  showDate?: boolean
  styleType?: 'default' | 'overlay'
  columns?: number
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    showDescription = false,
    title: titleFromProps,
    layout = 'vertical', // default layout is vertical
    showDate = true,
    styleType = 'default',
    columns,
  } = props

  const { slug, categories, meta, title, createdAt, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  const isHorizontal = layout === 'horizontal'
  const isVertical = layout === 'vertical'
  const isOverlay = styleType === 'overlay'
  const isDef = !isHorizontal && !isOverlay

  const metasContent = ((showCategories && hasCategories) || (showDate && createdAt)) && (
    <div className="posc__metas">
      {showCategories && hasCategories && (
        <div className={cn('posc__cat uppercase text-xs')}>
          <div className="posc__cat_list">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <Fragment key={index}>
                    <span className="posc__cat_item">{categoryTitle}</span>
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        </div>
      )}
      {showDate && publishedAt && (
        <div
          className={cn(
            'posc__date text-xs font-title',
            isOverlay ? null : 'text-muted-foreground',
          )}
        >
          {formatDate(publishedAt)}
        </div>
      )}
    </div>
  )

  return (
    <article
      className={cn(
        'card__article rounded-xl relative',
        isVertical ? 'card__article_vertical' : 'card__article_horizontal',
        isOverlay ? 'card__article_overlay' : 'card__article_default',
        '@container/card',
        columns ? `columns__${columns}` : 'columns__none',
        className,
      )}
      ref={card.ref}
    >
      <Link
        className={cn(
          'card__article_link flex h-full relative',
          isVertical ? 'flex-col' : 'flex-col md:flex-row',
        )}
        href={href}
        ref={link.ref}
      >
        <div className={cn('card__head relative w-full')}>
          {!metaImage && <div className="bg-slate-400 fit-image"></div>}
          {metaImage && typeof metaImage !== 'string' && (
            <Media resource={metaImage} className="fit-image" layout={layout} styleType={styleType} />
          )}
          {isDef && metasContent}
        </div>
        <div
          className={cn(
            'card__body flex flex-col relative',
            isVertical ? 'p-4 gap-2' : 'px-4 py-6 gap-2',
            isOverlay ? '@lg/card:p-8' : null,
          )}
        >
          {titleToUse && (
            <div className={cn('posc__title prose', isVertical ? 'posc__title_vertical' : 'posc__title_horizontal')}>
              <h3
                className={cn(
                  'posc__h3',
                  // isOverlay ? null : 'line-clamp-2',
                  isOverlay
                    ? 'text-card-main whitespace-pre-wrap'
                    : isVertical
                      ? 'text-card-def'
                      : 'text-card-def leading-[1.4]',
                  'flex gap-2 line-clamp-2',
                )}
              >
                {typeof titleToUse === 'object' ? titleToUse?.ja : titleToUse}
              </h3>
            </div>
          )}
          {description && showDescription && (
            <div className={cn('posc__excerpt')}>
              {description && <p>{JSON.stringify(sanitizedDescription)}</p>}
            </div>
          )}
          {!isDef && metasContent}
        </div>
      </Link>
      <AdminEditButton type="posts" isFixed={false} id={doc.id} />
    </article>
  )
}
