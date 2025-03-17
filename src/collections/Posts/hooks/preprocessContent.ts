import type { CollectionBeforeChangeHook } from 'payload';

export const preprocessContent: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  console.log('Preprocess Content Hook Triggered:', { data, originalDoc });

  if (data.content && data.content.root) {
    // Ensure the root has children and is properly structured
    if (!Array.isArray(data.content.root.children) || data.content.root.children.length === 0) {
      data.content.root.children = [
        {
          children: [],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
          textFormat: 0,
          textStyle: '',
        },
      ];
    }
  } else {
    // Initialize content if it doesn't exist
    data.content = {
      root: {
        children: [
          {
            children: [],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    };
  }
  return data;
}; 