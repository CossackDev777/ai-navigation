import type { Block } from 'payload'
import { customClassField } from '@/fields/customClass'
import { CardBlock } from '../Card/config'
import { IconBlock } from '../IconBlock/config'


export const GridBlock: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  fields: [
    customClassField,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: '表示カラム数',
      options: [
        {
          label: '1カラム',
          value: '1',
        },
        {
          label: '2カラム',
          value: '2',
        },
        {
          label: '3カラム',
          value: '3',
        },
        {
          label: '4カラム',
          value: '4',
        },
      ],
    },
    {
      name: 'item',
      type: 'blocks',
      blocks: [CardBlock, IconBlock],
    },
  ],
  labels: {
    plural: 'Grid Blocks',
    singular: 'Grid Block',
  },
}
