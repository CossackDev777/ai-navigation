import type { ServerEditorConfig } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from 'lexical'
import type { CollectionConfig } from 'payload'
import { getEnabledNodes } from '@payloadcms/richtext-lexical'
import { sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical'

import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
  RelationshipFeature,
  EXPERIMENTAL_TableFeature,
  defaultEditorFeatures,
} from '@payloadcms/richtext-lexical'

import { isAdmin, isAdminAccess, isAdminOrEditor } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
// import { Code } from '../../blocks/Code/config'
import { EmbedUrl } from '@/blocks/EmbedUrl/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { handleEmbedUrlMetadata } from './hooks/embedUrlMetadata'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { getServerSideURL } from '@/utilities/getURL'
import { preprocessContent } from './hooks/preprocessContent'

const editorConfig: ServerEditorConfig = {
  features: [
    ...defaultEditorFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    BlocksFeature({ blocks: [Banner, MediaBlock, EmbedUrl] }),
    BlockquoteFeature(),
    AlignFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    ChecklistFeature(),
    RelationshipFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HorizontalRuleFeature(),
    EXPERIMENTAL_TableFeature(),
  ]
}
export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    admin: isAdminAccess,
    create: isAdminOrEditor,
    delete: isAdmin,
    read: authenticatedOrPublished,
    update: isAdminOrEditor,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    // tags: true,
    isFeature: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isFeature',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mark as a featured article',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: editorConfig.features,
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'tags',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'tags',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [
      preprocessContent,
      handleEmbedUrlMetadata,
      ({ data }) => {
        console.log('Before Change Hook:', data.content);
        return data;
      }
    ],
    afterChange: [revalidatePost],
    afterRead: [
      populateAuthors,
    ],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}
