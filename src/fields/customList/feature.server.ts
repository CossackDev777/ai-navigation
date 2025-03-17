// src/fields/customList/feature.server.ts
import { createServerFeature } from '@payloadcms/richtext-lexical';

export const CustomListFeature = createServerFeature({
  key: 'customList',
  feature: () => ({
    floatingSelectToolbar: {
      sections: [],
    },
    props: undefined,
    nodes: []
  })
});
