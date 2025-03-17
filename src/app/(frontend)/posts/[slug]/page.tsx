import type { Metadata } from 'next'
import type { Tag } from '@/payload-types'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

import type { Post } from '@/payload-types'
import { getPostsByCategory } from '@/utilities/getPostsByCategory'
import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import Link from 'next/link'
import TagsList from '@/components/TagsList/index'
import { Tags } from 'lucide-react'
import AdminEditButton from '@/components/AdminEditButton'

export const revalidate = 60;

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })
  // console.log('post data:', JSON.stringify(post, null, 2));

  if (!post) return <PayloadRedirects url={url} />
  // h2見出しを抽出する関数
  const extractH2Headers = (content: any) => {
    if (!content?.root?.children) return []
    let counter = 1
    return content.root.children
      .filter(
        (node) => node.type === 'heading' && node.tag === 'h2' && Array.isArray(node.children),
      )
      .map((node) => ({
        text: node.children.map((child) => child.text || '').join(''),
        id: `section-${counter++}`,
      }))
  }

  // contentが存在し、配列であることを確認
  const headers = post.content ? extractH2Headers(post.content) : []
  // console.log('post.content:', JSON.stringify(post.content, null, 2));

  // console.log('Post categories:', post.categories);

  const categoryIds = (post.categories || [])
    .map((category) => (typeof category === 'object' && 'id' in category ? category?.id : category))
    .filter((category): category is string => typeof category === 'string')

  // console.log('Querying posts with category IDs:', categoryIds);

  const relatedPosts =
    post.relatedPosts && post.relatedPosts.length > 4
      ? post.relatedPosts.filter((post) => typeof post === 'object')
      : await getPostsByCategory({ categoryIds, limit: 3 })

  // console.log('Related posts:', relatedPosts);
  const tags = post.tags || []

  return (
    <article className="posc__article_body">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <PostHero post={post} />
      <AdminEditButton id={post?.id} type="posts" />

      <div className="posc__article">
        <div className="container">
          {headers.length > 0 && (
            <div className={cn('article__index-container max-w-[48rem] mx-auto')}>
              <div className="article__index-inner">
                <p className="article__index-title">目次</p>
                <nav>
                  <ul className="article__index_list">
                    {headers.map((header, index) => (
                      <li key={index}>
                        <Link
                          data-index={index + 1}
                          className="article__index-link"
                          href={`#${header?.id}`}
                        >
                          {header.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}
          <RichText className="max-w-[48rem] mx-auto" content={post.content} enableGutter={false} />
          <hr className="h-px my-8 bg-border border-0 "></hr>
          {tags && (
            <TagsList
              tags={tags.filter((tag): tag is Tag => typeof tag === 'object' && tag !== null)}
            />
          )}
        </div>
      </div>

      {relatedPosts.length > 0 && <RelatedPosts className="" docs={relatedPosts} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}
