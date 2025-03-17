import React from 'react'
import type { RelationshipFeatureProps } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { formatDate } from '@/utilities/formatDate'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/cn'
import styles from './Component.module.scss'
import { Badge } from "@/components/ui/badge"

export const RelationshipFeature: React.FC<RelationshipFeatureProps> = async (props) => {
  const { id, title, slug, relationTo, value } = props
  const post = value;
  console.log("Related Post:", post);
  const image = post?.meta?.image;
  const categories = post?.categories;
  const publishedAt = post?.publishedAt;
  // console.log("Categories:", categories);
  // console.log("Image:", image);
  // console.log("Published At:", publishedAt);

  return (
    <Link
      href={`/${relationTo}/${slug}`}
      className="inline-flex group hover:shadow-2xl duration-300 transition-all"
    >
      <Card className={cn('relationship-feature block')}>
        <CardHeader className="inline-flex p-4 pl-3.5 sm:pl-4 flex-row items-center space-y-0 gap-4">
          <div className="bg-gray-200 size-[62px] rounded-xl sm:size-[80px] overflow-hidden">
          {typeof image === 'object' && image !== null && (
            <Media
              resource={image}
              src={image.thumbnailURL || image.url || undefined}
              alt={title || '関連記事'}
              className="relative size-full"
              aspect={1/1}
              fill={true}
            />
          )}
          </div>
          <div className="flex-1 my-0">
            <CardTitle className={cn(styles.title, 'text-third group-hover:text-primary')}>
              {title ?? (post && post.title)}
            </CardTitle>
            <CardContent className="posc__metas text-p-xs p-0">
              {categories && categories.length > 0 && (
                <div className="posc__cat_list">
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category
                      const categoryTitle = titleFromCategory || 'Untitled category'

                      return (
                        <Badge className="font-medium bg-light-20 text-third" key={index} variant="outline">{categoryTitle}</Badge>
                      )
                    }
                    return null
                  })}
                </div>
              )}

                {publishedAt && (
                  <span className="posc__date text-xs text-muted-foreground">{formatDate(publishedAt)}</span>
                )}
            </CardContent>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
