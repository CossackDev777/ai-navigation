import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { ArchiveHead } from '@/components/Parts/ArchiveHead'
import PostsFilter from '@/components/Dropdown/PostsFilter'
import { Suspense } from 'react'

export const revalidate = 600

async function fetchFilterOptions() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch categories and tags
    const [categories, tags] = await Promise.all([
      payload.find({
        collection: 'categories',
        limit: 100,
      }),
      payload.find({
        collection: 'tags',
        limit: 100,
      }),
    ])

    return { categories, tags }
  } catch (error) {
    return { categories: { doc: [] }, tags: { doc: [] } }
  }
}

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  // Fetch categories and tags
  const { categories, tags }: any = await fetchFilterOptions()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
  })
  return (
    <div className="archive__posts">
      <PageClient />
      <ArchiveHead title={`AI Magazine`} className="archive__header_posts" />
      <div className="archive__controls container">
        <Suspense fallback={<p>Loading...</p>}>
          <PostsFilter categories={categories.docs} tags={tags.docs} />
        </Suspense>

        <PageRange
          className="archive__rangecounts"
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
