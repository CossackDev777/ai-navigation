import clsx from 'clsx'
import React, { Suspense } from 'react'
import RichText from '@/components/RichText'
import { Title } from '@/components/Section/Title'
import { CMSLink } from '@/components/Link'
import type { Post } from '@/payload-types'
import { Card } from '../../components/Card'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('archive__block', className)}>
      <div className="archive__titling">
        <Title subtitle="関連記事" position="center">
          <h2 className="title__h2_en">Related Articles</h2>
        </Title>
        <div className="archive__button">
          <CMSLink
            appearance="primary"
            label="全ての記事"
            size="lg"
            url="/posts/"
          />
        </div>
      </div>
      <div className="container lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]">

        {introContent && <RichText content={introContent} enableGutter={false} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch">
          {docs?.map((doc, index) => {
            if (typeof doc === 'string') return null

            return <Suspense key={index} fallback={<p>Loading...</p>}>
              <Card doc={doc} relationTo="posts" showCategories />
            </Suspense>
          })}
        </div>
      </div>
    </div>
  )
}
