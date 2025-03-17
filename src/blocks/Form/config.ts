import type { Block } from 'payload'
import { spacingField } from '@/fields/spacing'
import { customClassField } from '@/fields/customClass'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    customClassField,
    spacingField as any,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
    name: 'introLayout',
    type: 'select',
    admin: {
      condition: (_, { enableIntro }) => Boolean(enableIntro),
    },
    defaultValue: 'full',
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
        label: 'Full',
        value: 'full',
      },
    ],
  },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: false,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Step List',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon Image',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Text',
        },
        {
          name: 'stepNumber',
          type: 'number',
          required: true,
          label: 'Number',
          min: 1,
        }
      ]
    }
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
