import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdmin, isAdminOrEditor } from '@/access/authenticated';
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'


export const CaseStudies: CollectionConfig = {
  slug: 'cases',
  access: {
    create: isAdminOrEditor,
    delete: isAdmin,
    read: authenticatedOrPublished,
    update: isAdminOrEditor,
  },
  admin: {
    hidden: ({ user }) => user?.role !== 'admin',
    defaultColumns: ['title', 'slug'],
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
        description: 'URLスラッグ（例：programming, web-development）'
      }
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media', // Assuming 'media' is the collection where images are stored
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'repeatFields',
      type: 'array',
      fields: [
        {
          name: 'slugField',
          type: 'text',
          required: false,
        },
        {
          name: 'label',
          type: 'text',
          required: false,
        },
        {
          name: 'value',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          required: false,
        },
      ]
    }
  ],
}
