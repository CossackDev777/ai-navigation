import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminAccess, isAdminOrSelf } from '@/access/authenticated'
import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAdminAccess,
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrSelf,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Customer', value: 'customer' },
        { label: 'Agency', value: 'agency' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'private',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Private', value: 'private' },
        { label: 'Draft', value: 'draft' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
      admin: {
        condition: (data) => data?.role === 'agency',
      },
    }
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ operation, doc, req }) => {
        if (operation === 'create') {
          const adminUser = req.user
          if (adminUser?.role === 'admin') {
            try {
              await req.payload.sendEmail({
                to: doc.email,
                from: process.env.NEXT_EMAIL_FROM,
                subject: 'Welcome to Our Platform',
                html: `<p>Hello ${doc?.name},</p>
                       <p>You have been added to our platform by an administrator.</p>
                       <p>Here are your login credentials:</p>
                       <ul>
                        <li><strong>Email:</strong> ${doc?.email}</li>
                        <li><strong>Password:</strong> ${req?.data?.password}</li>
                        <li><strong>Role:</strong> ${doc?.role}</li>
                      </ul>

                       <p>Best regards,<br>The Team</p>`,
                text: `Hello ${doc.name},\n\nYou have been added to our platform by an administrator.\n\nBest regards,\nThe Team`,
              })
            } catch (error) {
              console.error(`Failed to send email to ${doc.email}:`, error)
            }
          }
        }
      },
    ],
  },
}

export default Users
