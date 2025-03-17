import type { Block } from 'payload'
import { spacingField } from '@/fields/spacing'
import { customClassField } from '@/fields/customClass'

export const SliderBlock: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  fields: [
    customClassField,
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'cases',
      label: 'Collections To Show',
      options: [
        {
          label: 'Cases',
          value: 'cases',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ['cases'],
    },
  ],
  labels: {
    plural: 'Slider Blocks',
    singular: 'Slider Block',
  },
}
