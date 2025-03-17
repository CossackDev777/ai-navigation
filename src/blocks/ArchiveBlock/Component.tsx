import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import './styles.scss'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    tags,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    columns, // Added
    showExcerpt, // Added
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
              _status: {
                equals: 'published',
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="block__archive" id={`block-${id}`}>
      {introContent && (
        <div className="container @container/common">
          <RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive
        posts={posts}
        columns={(Number(columns) ?? 3) as 1 | 2 | 3 | 4}
        excerpt={showExcerpt ?? true}
      />
    </div>
  )
}
