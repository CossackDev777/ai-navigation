import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/authenticated';
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    update: isAdmin,
    read: () => true,
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'admin',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
