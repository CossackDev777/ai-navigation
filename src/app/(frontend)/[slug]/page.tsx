import type { Metadata } from 'next'
// import { headers } from 'next/headers'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import HomeHero from '@/heros/HomeHero'
import { cn } from 'src/utilities/cn'
import AdminEditButton from '@/components/AdminEditButton'

export const revalidate = 60 // ISR: Rebuilds page every 60s instead of fetching every request

// Hero型を Page['hero'] として定義
type HeroType = PageType['hero']

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

type Args = {
  params: { slug?: string }
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params
  const url = '/' + slug

  // const headersList = await headers()
  // const currentLocale = headersList.get('accept-language')?.split(',')[0] || 'en'

  // Fetch page data using ISR-friendly caching
  const page = (await queryPageBySlug({ slug })) || (slug === 'home' ? homeStatic : null)

  if (!page) return <PayloadRedirects url={url} />

  const { id, hero, layout, title, subTitle, catchPhrase, coverImage } = page
  const isHome = slug === 'home'
  // coverImageをログに出力
  // console.log('Page coverImage:', coverImage)
  return (
    <article className={cn(isHome ? 'sections__home' : `page__sections sections__${slug}`)}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <AdminEditButton id={id} type="pages" />

      {isHome ? (
        <HomeHero />
      ) : (
        <RenderHero
          {...(hero as HeroType)}
          title={title}
          subTitle={subTitle || undefined}
          catchPhrase={catchPhrase || undefined}
          coverImage={coverImage || undefined}
        />
      )}

      <RenderBlocks
        className="page__content"
        blocks={layout}
        slug={slug}
        {...(hero.type === 'none' && { title, subTitle: subTitle || undefined })}
      />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}
