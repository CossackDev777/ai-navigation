import type { Block, Field } from 'payload'
// import { CustomListFeature } from '@/fields/customList'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  UnorderedListFeature,  // 箇条書き用
  OrderedListFeature,    // 番号付きリスト用
  ChecklistFeature, // Checkboxリスト用
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import './editor.scss'
import { link } from '@/fields/link'
import { customClassField } from '@/fields/customClass'
import { customIdField } from '@/fields/customId'
import { spacingField } from '../../fields/spacing'
import { Banner } from '../Banner/config'
import { Code } from '../Code/config'
import { MediaBlock } from '../MediaBlock/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'caption',
    type: 'text',
    label: 'Caption',
    admin: {
      description: 'Optional caption for the column',
    }
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
          UnorderedListFeature(),  // 箇条書き
          OrderedListFeature(),    // 番号付きリスト
          ChecklistFeature(), // Checkbox List
          // CustomListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
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
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    customIdField,
    customClassField,
    spacingField as any,
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
