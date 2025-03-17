import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  // HeadingFeature,
  InlineToolbarFeature,
  UnorderedListFeature,  // 箇条書き用
  OrderedListFeature,    // 番号付きリスト用
  ChecklistFeature, // Checkboxリスト用
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import '../Content/editor.scss'
import { link } from '@/fields/link'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  labels: {
    singular: 'Rich Text Block',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'enableImage',
      'type': 'checkbox',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { enableImage }) => Boolean(enableImage),
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
      ],
      required: true,
      defaultValue: 'left',
      admin: {
        condition: (_, { enableImage }) => Boolean(enableImage),
      },
    },
    {
      name: 'richText',
      type: 'richText',
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            ChecklistFeature(),
          ]
        },
      }),
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
    link({
      overrides: {
        admin: {
          condition: (_, { enableLink }) => Boolean(enableLink),
        },
      },
    }),
  ],
}
