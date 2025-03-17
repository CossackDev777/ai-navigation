'use client';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import { toolbarFormatGroupWithItems } from '@payloadcms/richtext-lexical/client';
import { INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { List } from 'lucide-react';

export const CustomListFeature = createClientFeature<undefined>({
  toolbarFixed: {
    groups: [
      toolbarFormatGroupWithItems([
        {
          ChildComponent: List,
          key: 'customList',
          label: 'Custom List',
          onSelect: ({ editor }) => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          },
        },
      ]),
    ],
  }
});
