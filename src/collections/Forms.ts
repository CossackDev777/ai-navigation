// import type { CollectionConfig } from 'payload'
// import { isAdmin, isAdminOrEditor } from '@/access/authenticated'
// import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

// export const Forms: CollectionConfig<'forms'> = {
//   slug: 'forms',
//   access: {
//     create: isAdmin,
//     delete: isAdmin,
//     read: authenticatedOrPublished,
//     update: isAdminOrEditor,
//   },
//   admin: {
//     hidden: ({ user }) => user?.role !== 'admin',
//     defaultColumns: ['title', 'slug', 'updatedAt'],
//   },
// }
