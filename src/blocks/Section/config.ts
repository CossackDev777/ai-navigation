import type { Block, Field } from 'payload'
// import { CustomListFeature } from '@/fields/customList'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  // UnorderedListFeature,  // 箇条書き用
  // OrderedListFeature,    // 番号付きリスト用
  // ChecklistFeature, // Checkboxリスト用
  lexicalEditor,
  // BlocksFeature,
} from '@payloadcms/richtext-lexical'
import './editor.scss'
// import { link } from '@/fields/link'
import { customClassField } from '@/fields/customClass'
import { customIdField } from '@/fields/customId'
import { spacingField } from '../../fields/spacing'
// import { Banner } from '../Banner/config'
import { GridBlock } from '../GridBlock/config'
import { SliderBlock } from '../SliderBlock/config'
import { Code } from '../Code/config'
// import { MediaBlock } from '../MediaBlock/config'
import { Archive } from '../ArchiveBlock/config'
import { CallToAction } from '../CallToAction/config'
import { RichTextBlock } from '../RichTextBlock/config'
import { TableBlock } from '../Table/config'
// import { Content } from '../Content/config'
import { FormBlock } from '../Form/config'


export const Section: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',
  fields: [
    customIdField,
    customClassField,
    spacingField as any,
    {
      name: 'richTitle',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Rich Title',
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
      name: 'sectionContentNew',
      type: 'blocks',
      blocks: [CallToAction, GridBlock, RichTextBlock, Code, Archive, FormBlock, SliderBlock, TableBlock],
      required: false,
    },
  ],
}
