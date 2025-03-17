import React from 'react'
import Link from 'next/link'
import type { Tag } from '@/payload-types'
import './index.scss'
type TagsListProps = {
  tags: Tag[]
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <div className="tags__block">
      <h2 className="tags__title">Related Tags</h2>
      <ul className="tags__list flex flex-wrap gap-1.5">
        {tags.map((tag, index) => {
          if (typeof tag === 'object' && tag !== null) {
            const { title: tagTitle } = tag
            const titleToUse = tagTitle || 'Untitled category'

            return (
              <li key={index} className="posc__cat_item tags__list_item">
                <Link href={`/posts?tag=${tag.slug}`}>
                  {typeof titleToUse === 'object' ? (titleToUse as { ja: string }).ja : titleToUse}
                </Link>
              </li>
            )
          }
          return null
        })}
      </ul>
    </div>
  )
}

export default TagsList
