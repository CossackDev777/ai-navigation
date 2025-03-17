import type { Block } from 'payload'
import { fetchUrlMetadata } from '@/utilities/fetchUrlMetadata'

export const EmbedUrl: Block = {
  slug: 'embed-url',
  fields: [
    {
      name: 'embedUrl',
      type: 'text',
      required: true,
      // hooks: {
      //   afterChange: [
      //     async ({ data, req, originalDoc, value, operation }) => {
      //       console.log('Operation:', operation)

      //       // 無限ループ防止ロジック
      //       // if (req.context?.metadataProcessing || originalDoc?.embedUrl === data.embedUrl) {
      //       //   return data
      //       // }

      //       req.context = { ...req.context, metadataProcessing: true }

      //       try {
      //         const metadata = await fetchUrlMetadata(value)

      //         console.log('Metadata fetched:', metadata)

      //         return metadata
      //       } catch (error) {
      //         console.error('Metadata fetch failed:', error)
      //         return data
      //       } finally {
      //         req.context.metadataProcessing = false
      //       }
      //     },
      //   ],
      // },
    },
    {
      name: 'metadata',
      type: 'group',
      hooks: {
        beforeChange: [
          async ({ siblingData, value }) => {

            const embedUrl = siblingData?.embedUrl

            if (!embedUrl) {
              return {
                title: '',
                description: '',
                image: '',
                url: '',
              }
            }

            try {
              const metadata = await fetchUrlMetadata(embedUrl)

              return metadata
            } catch (error) {
              console.error('Metadata fetch failed:', error)
              return {
                title: '',
                description: '',
                image: '',
                url: '',
              }
            } finally {
            }
          },
        ],
        // afterRead: [
        //   ({ value, req, data, siblingData, originalDoc }) => {
        //     console.log('AfterRead:', value)
        //     return value
        //   },
        // ],
      },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'text' },
        { name: 'fetchedAt', type: 'text', admin: { hidden: true } }, // デバッグ用
      ],
      admin: {
        condition: (data) => {
          // console.log('Condition:', data)
          return Boolean(data?.embedUrl)
        },
      },
    },
  ],
  interfaceName: 'EmbedUrlBlock',
}
