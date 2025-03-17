// collections/Posts/hooks/embedUrlMetadata.ts
import type { CollectionBeforeChangeHook } from 'payload';
import { fetchUrlMetadata } from '@/utilities/fetchUrlMetadata';

export const handleEmbedUrlMetadata: CollectionBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (req.context?.metadataProcessing) return data;
  req.context = { ...req.context, metadataProcessing: true };

  try {
    const blocks = data.content?.root?.children || [];
    const updatedBlocks = await Promise.all(
      blocks.map(async (block: any) => {
        if (block.type === 'embed-url' && block.fields?.embedUrl) {
          const metadata = await fetchUrlMetadata(block.fields.embedUrl);
          return {
            ...block,
            fields: {
              ...block.fields,
              metadata: {
                ...metadata,
                fetchedAt: new Date().toISOString(),
              },
            },
          };
        }
        return block;
      })
    );

    return {
      ...data,
      content: {
        ...data.content,
        root: {
          ...data.content?.root,
          children: updatedBlocks,
        },
      },
    };
  } catch (error) {
    req.payload.logger.error(`Metadata fetch error: ${error}`);
    return data;
  } finally {
    req.context.metadataProcessing = false;
  }
};
