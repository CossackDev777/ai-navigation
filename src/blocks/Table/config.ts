// import plugin
import type { Block } from 'payload'
import {
  InlineToolbarFeature,
  lexicalEditor,
  // OrderedListFeature,
  // UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const TableBlock: Block = {
  slug: 'table',
  interfaceName: 'Table',
  fields: [
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      fields: [
        {
          type: 'text',
          name: 'label',
          label: 'Label',
        },
        {
          name: 'value',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                InlineToolbarFeature(),
              ]
            },
          }),
          required: true,
          label: 'Value',
        }
      ]
    },
    {
      name: 'className',
      type: 'text',
      label: 'Class Name',
      required: false,
    }
  ]
}
