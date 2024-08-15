import { WebNodeTypes } from '@/libs/types';

interface Attribute {
  label: string;
  name: string;
  type: AttributeType;
  required: boolean;
}

type AttributeType = 'string' | 'number' | 'boolean' | 'object' | 'array';

export const webNodeAttribute: Record<string, Attribute[]> = {
  [WebNodeTypes.Text]: [
    {
      label: 'Content',
      name: 'children',
      type: 'string',
      required: true,
    },
  ],
  [WebNodeTypes.Button]: [
    {
      label: 'Content',
      name: 'children',
      type: 'string',
      required: true,
    },
  ],
};
