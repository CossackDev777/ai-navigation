import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'
import { Media } from '@/components/Media'
import './index.scss'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const {
    categories,
    tags,
    meta: { image: metaImage } = {},
    populatedAuthors,
    publishedAt,
    title,
  } = post

  return (
    <div className="posc__hero">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="posc__cat mb-6">
            <div className="posc__cat_list">
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled category'

                  return (
                    <span key={index} className="posc__cat_item">
                      {typeof titleToUse === 'object' ? (titleToUse as { ja: string }).ja : titleToUse}
                    </span>
                  )
                }
                return null
              })}
              {tags?.slice(0, 2).map((tag, index) => {
                if (typeof tag === 'object' && tag !== null) {
                  const { title: tagTitle } = tag
                  const titleToUse = tagTitle || 'Untitled category'

                  return (
                    <span key={index} className="posc__cat_item">
                      {typeof titleToUse === 'object' ? titleToUse.ja : titleToUse}
                    </span>
                  )
                }
                return null
              })}
            </div>
          </div>

          <div className="post__heading">
            <h1 className="post__title">{typeof title === 'object' ? title.ja : title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {populatedAuthors && populatedAuthors.length > 1 && (
              <div className="flex flex-col gap-1">
                  <p className="post__hero_author text-xs">

                      By&nbsp;
                      {populatedAuthors.map((author, index) => {
                        const { name } = author

                        const isLast = index === populatedAuthors.length - 1
                        const secondToLast = index === populatedAuthors.length - 2

                        return (
                          <React.Fragment key={index}>
                            {name}
                            {secondToLast && populatedAuthors.length > 2 && (
                              <React.Fragment>, </React.Fragment>
                            )}
                            {secondToLast && populatedAuthors.length === 2 && (
                              <React.Fragment> </React.Fragment>
                            )}
                            {!isLast && populatedAuthors.length > 1 && (
                              <React.Fragment>and </React.Fragment>
                            )}
                          </React.Fragment>
                        )
                      })}
                    </p>
              </div>
            )}

            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="post__hero_date text-xs">
                  <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="post__hero_cover min-h-[80vh] select-none">
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            fill
            priority={false}
            loading="lazy"
            imgClassName="-z-10 object-cover"
            resource={metaImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
