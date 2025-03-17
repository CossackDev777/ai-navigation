import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  UnorderedListFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  lexicalEditor,
  ServerEditorConfig,
  defaultEditorFeatures,
} from '@payloadcms/richtext-lexical'

const editorConfig: ServerEditorConfig = {
  features: [
    ...defaultEditorFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
  ],
}

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
        editor: lexicalEditor({
        features: editorConfig.features,
      }),
      label: false,
      required: true,
    },
    // {
    //   name: 'content',
    //   type: 'richText',
    //   editor: lexicalEditor({
    //     features: ({ rootFeatures }) => {
    //       return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature(), UnorderedListFeature(), OrderedListFeature()]
    //     },
    //   }),
    //   label: false,
    //   required: true,
    // },
  ],
  interfaceName: 'BannerBlock',
}
