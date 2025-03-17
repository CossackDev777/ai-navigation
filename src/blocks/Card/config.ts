import type { Block } from 'payload'

export const CardBlock: Block = {
  slug: 'cardBlock',
  interfaceName: 'CardBlock',
  labels: {
    singular: 'Card',
    plural: 'Cards',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'カード画像',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'カードタイトル',
    },
  ],
}
