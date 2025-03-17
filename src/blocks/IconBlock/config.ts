import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  // OrderedListFeature,
  // UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
// import { link } from '@/fields/link'

export const IconBlock: Block = {
  slug: 'iconBlock',
  interfaceName: 'IconBlock',
  fields: [
    {
      name: 'iconImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Icon',
    },
    {
      name: 'iconTitle',
      type: 'textarea',
      required: true,
      label: 'Icon Title',
    },
    {
      name: 'iconDesc',
      type: 'richText',
      editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
      required: false,
      label: false,
    }
  ],
}
