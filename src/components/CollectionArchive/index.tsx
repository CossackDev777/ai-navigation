import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Post } from '@/payload-types'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  className?: string
  posts: CardPostData[]
  isHorizon?: boolean
  columns?: 1 | 2 | 3 | 4
  excerpt?: boolean
  container?: boolean
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { className, posts, isHorizon = false, excerpt = false, columns = 3, container = true } = props
  const gridSpace = isHorizon ? "gap-2" : "gap-4 lg:gap-4 xl:gap-4";

  const getGridConfig = () => {
    if (isHorizon) return {
      grid: "grid-cols-4",
      colSpan: "col-span-4"
    }

    switch (columns) {
      case 4:
        return {
          grid: "columns__4 grid-cols-12",
          colSpan: "col-span-12 @3xl/grids:col-span-6 @5xl/grids:col-span-4 @7xl/grids:col-span-3"
        }
      case 3:
        return {
          grid: "columns__3 grid-cols-4 sm:grid-cols-8 lg:grid-cols-12",
          colSpan: "col-span-4"
        }
      case 2:
        return {
          grid: "columns__2 grid-cols-6 sm:grid-cols-6 lg:grid-cols-12",
          colSpan: "col-span-6"
        }
      case 1:
        return {
          grid: "columns__1 grid-cols-12",
          colSpan: "col-span-12"
        }
      default:
        return {
          grid: "columns__3 grid-cols-4 sm:grid-cols-8 lg:grid-cols-12",
          colSpan: "col-span-4"
        }
    }
  }

  const { grid, colSpan } = getGridConfig()
  return (
    <div className={cn(container ? 'container' : '', className)}>
      <div className={cn("post__list @container/grids grid", grid, gridSpace)}>
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className={colSpan} key={index}>
                <Card className={cn("h-full", columns ? `cols__${columns}` : 'cols__nothing')} doc={result} columns={columns} relationTo="posts" showCategories showDescription={excerpt ? true : false} layout={isHorizon ? "horizontal" : "vertical"} />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
