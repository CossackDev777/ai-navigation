import type { CollectionConfig } from 'payload'

export const Agency: CollectionConfig = {
  slug: 'agency',
  access: {
    read: async ({ req: { user } }) => {
      if (!user) return false;

      if (user.role === 'admin') {
        return true;
      }
      return {
        user: { equals: user.id },
      };
    },
    update: async ({ req: { user, payload }, id }) => {
      if (!user || user.role !== 'agency') return false;
      const existingAgency = await payload.find({
        collection: 'agency',
        where: { user: { equals: user.id } },
        depth: 0,
      });
      return existingAgency.docs.some((agency) => agency.id === id);
    },
    create: async ({ req: { user, payload } }) => {
      if (!user || user.role !== 'agency') return false
      const existingAgency = await payload.find({
        collection: 'agency',
        where: { user: { equals: user.id } },
        depth: 0,
      })
      return existingAgency.docs.length === 0
    },
    delete: () => false,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      index: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          const existingAgency = await req.payload.find({
            collection: 'agency',
            where: { user: { equals: req.user.id } },
            depth: 0,
          })

          if (existingAgency?.docs?.length > 0) {
            throw new Error('You can only create one agency per user.')
          }

          return {
            ...data,
            user: req.user.id,
          }
        }
      },
    ],
  },
}
