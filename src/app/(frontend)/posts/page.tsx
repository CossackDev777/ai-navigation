import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { Metadata } from 'next'
import { ArchiveHead } from '@/components/Parts/ArchiveHead'
import PostsFilter from '@/components/Dropdown/PostsFilter'
import { Suspense } from 'react'

export const revalidate = 60

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

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await searchParams
  // Extract all searchParams values early
  const page = params.page ? Number(params.page) : 1
  const limit = 12
  const selectedCategory = params.category
  const selectedTag = params.tag

  const payload = await getPayload({ config: configPromise })

  // Fetch categories and tags
  const { categories, tags }: any = await fetchFilterOptions()

  // Build the query with proper filtering
  const query: any = {
    collection: 'posts',
    depth: 1,
    limit,
    overrideAccess: false,
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      tags: true,
      meta: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
    where: {
      and: [],
      _status: {
        equals: 'published',
      },
    },
    page,
  }

  // Handle category filter by slug
  if (selectedCategory) {
    const categorySlugs = Array.isArray(selectedCategory) ? selectedCategory : [selectedCategory]

    query.where.and.push({
      categories: {
        relationTo: 'categories',
        exists: true,
      },
      'categories.slug': {
        in: categorySlugs,
      },
    })
  }

  // Handle tag filter by slug
  if (selectedTag) {
    const tagSlugs = Array.isArray(selectedTag) ? selectedTag : [selectedTag]

    query.where.and.push({
      tags: {
        relationTo: 'tags',
        exists: true,
      },
      'tags.slug': {
        in: tagSlugs,
      },
    })
  }

  // If no filters are applied, remove the empty 'and' array
  if (query.where.and.length === 0) {
    delete query.where.and
  }

  try {
    const posts = await payload.find(query)

    if (!posts?.docs?.length && page !== 1) {
      notFound()
    }

    const filteredPosts = posts.docs.map((post) => ({
      ...post,
      slug: post.slug || post.id,
    }))

    return (
      <div className="archive__posts">
        <ArchiveHead title={`AI Magazine`} className="archive__header_posts" />
        <div className="archive__controls container">
          <Suspense fallback={<p>Loading...</p>}>
            <PostsFilter
              categories={categories.docs}
              tags={tags.docs}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
            />
          </Suspense>
          <PageRange
            className="archive__rangecounts"
            collection="posts"
            currentPage={posts.page}
            limit={limit}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={filteredPosts} />

        <div className="archive__pagenation container">
          {posts.totalPages > 1 && (
            <Pagination
              page={posts.page}
              totalPages={posts.totalPages}
              currentFilters={{
                category: selectedCategory,
                tag: selectedTag,
              }}
            />
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    notFound()
  }
}

export async function generateMetadata({ searchParams }: any) {
  const params = await searchParams
  const payload = await getPayload({ config: configPromise })

  let metaDescription = '全ての企業にAIの力を。AI navi(AIナビ)がお届けする生成AI活用マガジン。'
  let title: any

  if (params?.tag) {
    try {
      const tagData: any = await payload.find({
        collection: 'tags',
        where: { slug: { equals: params.tag } },
        limit: 1,
      })

      if (tagData?.docs?.length > 0 && tagData.docs[0]?.description) {
        metaDescription = tagData.docs[0]?.description
        title = tagData.docs[0]?.title
      }
    } catch (error) {
      console.error('Error fetching tag description:', error)
    }
  }

  return {
    title: title
      ? `${title} に関する記事 | 生成AI専門サポート AIナビ`
      : `記事一覧 | 生成AI専門サポート AIナビ`,
    description: metaDescription,
    openGraph: {
      description: metaDescription,
    },
    twitter: {
      description: metaDescription,
    },
  }
}
