import type { Block } from 'payload'

export const stepsBlock: Block = {
  slug: 'steps',
  labels: {
    singular: 'ステップ',
    plural: 'ステップ',
  },
  fields: [
    {
      name: 'steps',
      type: 'array',
      label: 'ステップリスト',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'ステップ画像',
        },
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'ステップテキスト',
        },
        {
          name: 'stepNumber',
          type: 'number',
          required: true,
          label: 'ステップ番号',
          min: 1,
        }
      ]
    }
  ]
}
