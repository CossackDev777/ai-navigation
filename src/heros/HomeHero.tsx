import React, { Suspense } from 'react'
import type { Page } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Card, CardPostData } from '@/components/Card'
import { Banner } from '@/components/Banner'
import { cn } from '@/utilities/cn'


type FeatureContentProps = {
  slug: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  showTitle?: boolean
  showSubTitle?: boolean
  showCatchPhrase?: boolean
  showDescription?: boolean
}

async function FeatureContent({
  slug,
  className,
  size = 'medium',
  showTitle = true,
  showSubTitle = false,
  showCatchPhrase = false,
  showDescription = false
}: FeatureContentProps) {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug
      }
    },
    depth: 1,
  })
  // console.log('Feature Content:', page.docs)

  return (
    <Banner
      className={cn("h-full rounded-common", className)}
      doc={page.docs[0]}
      showTitle={showTitle}
      showDescription={showDescription}
      showSubTitle={showSubTitle}
      showCatchPhrase={showCatchPhrase}
      styleType='overlay'
      size={size}
    />
  )
}

async function FeatureSection() {
  return (
    <div className="block__feature block__render bg-odd-row py-12 md:py-24">
      <div className="container @container/common gap-4 grid lg:grid-rows-[340px] lg:grid-cols-7">
        <FeatureContent
          slug="services"
          size="medium"
          showTitle={false}
          showSubTitle={true}
          showCatchPhrase={true}
          className="lg:col-span-5" />
        <FeatureContent
          slug="applicant"
          size="small"
          showSubTitle={true}
          className="lg:col-span-2" />
      </div>
    </div>
  )
}

export default async function HomeHero() {
  const payload = await getPayload({ config: configPromise })

  // Feature付きの投稿を1件取得
  const featuredPost = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    where: {
      isFeature: {
        equals: true
      }
    },
    sort: '-publishedAt', // 最新のfeature投稿を取得
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
  })
  // console.log('Featured Post:', featuredPost.docs)
  // 通常の投稿を3件取得（featureは除外）
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    where: {
      isFeature: {
        equals: false
      },
      // 'meta.image': {
      //   exists: true
      // }
    },
    sort: '-publishedAt',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
  })

  // console.log('Featured Post:', featuredPost.docs)
  // console.log('Posts for Side:', posts.docs)

  return (
    <div className="home__content_top flex flex-col">
      <div className="hero__posts grid gap-4 lg:grid-cols-5 lg:gap-0">
        <div className="post__feature lg:col-span-3">
          <Suspense fallback={<p>Loading...</p>}>
            <Card
              className="h-full rounded-none"
              doc={featuredPost.docs[0]}
              relationTo="posts"
              showCategories
              showDescription={false}
              styleType='overlay'
            /></Suspense>
        </div>
        <CollectionArchive className="post__side px-4 lg:p-2 lg:pb-0 lg:col-span-2" posts={posts.docs} isHorizon={true} excerpt={false} container={false} />
      </div>
      <FeatureSection />
    </div>
  )
}
