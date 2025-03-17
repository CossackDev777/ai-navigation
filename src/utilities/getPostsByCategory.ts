import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getPostsByCategory = cache(async ({ categoryIds, limit = 4 }: { categoryIds: string[], limit?: number }) => {
  const payload = await getPayload({ config: configPromise })

  // console.log('Querying posts with category IDs:', categoryIds)

  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit,
    overrideAccess: false,
    pagination: false,
    where: {
      categories: {
        in: categoryIds, // ObjectIdの配列に一致する記事を取得
      },
    },
  })

  // console.log('Found posts:', result.docs)

  return result.docs || []
})
