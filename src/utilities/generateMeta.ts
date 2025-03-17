import type { Metadata } from 'next'
import type { Media, Page, Post, Config } from '../payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = serverUrl + '/website-template-OG.webp' // Default image

  if (image && typeof image === 'object' && 'url' in image) {
    // Use image's og size if available
    url = serverUrl + (image.sizes?.og?.url || image.url || '')
  }

  return url
}

export const generateMeta = async ({ doc }: { doc: Partial<Page> | Partial<Post> }): Promise<Metadata> => {
  const serverUrl = getServerSideURL()
  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title || doc?.title || '生成AI専門サポート AIナビ'

  const description = doc?.meta?.description || doc?.description || ''

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title: `${title} | 生成AI専門サポート AIナビ`, // Title concatenation is moved to return statement
  }
}
