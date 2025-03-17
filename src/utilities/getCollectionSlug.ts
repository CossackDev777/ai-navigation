import type { CollectionConfig } from 'payload'

/**
 * Function to get the slug from the collection configuration
 * @param collection - The collection configuration object
 * @returns The slug of the collection
 */
export const getCollectionSlug = (collection: CollectionConfig): string => {
  return collection.slug
}
