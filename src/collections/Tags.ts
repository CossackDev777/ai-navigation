import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'admin',
    read: anyone,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'タグのURLスラッグ（例：programming, web-development）'
      }
    },
    {
      name: 'parent', // 親タグへの参照
      type: 'relationship',
      relationTo: 'tags', // 自分自身(Tag)を参照
      // 複数選択可能にする場合
      hasMany: false, 
      // 管理画面での表示設定
      admin: {
        description: '親タグが存在する場合は選択してください'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        description: 'タグの説明を入力してください'
      }
    },
  ],
}
