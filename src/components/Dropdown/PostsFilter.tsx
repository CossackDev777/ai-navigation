'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/utilities/cn'

interface Category {
  id: string
  title: string
  slug: string
}

interface Tag {
  id: string
  title: string
  slug: string
}

interface PostsFilterProps {
  categories: Category[]
  tags: Tag[]
}

const PostsFilter = ({ categories, tags }: PostsFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value) {
      params.set('category', e.target.value)
    } else {
      params.delete('category')
    }
    router.push(`/posts?${params.toString()}`)
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value) {
      params.set('tag', e.target.value)
    } else {
      params.delete('tag')
    }
    router.push(`/posts?${params.toString()}`)
  }
  const selectClass = 'w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'

  return (
    <div className="flex gap-4">
      <select
        value={searchParams.get('category') || ''}
        onChange={handleCategoryChange}
        className={cn(selectClass)}
      >
        <option value="">すべてのカテゴリー</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.title}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get('tag') || ''}
        onChange={handleTagChange}
        className={cn(selectClass)}
      >
        <option value="">すべてのタグ</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.slug}>
            {tag.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PostsFilter
