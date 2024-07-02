interface Attribute {
  label: string;
  name: string;
  type: AttributeType;
  required: boolean;
}

type AttributeType = 'string' | 'number' | 'boolean' | 'object' | 'array';

export const webNodeAttribute: Record<string, Attribute[]> = {
  ['system-text-node']: [
    {
      label: 'Content',
      name: 'children',
      type: 'string',
      required: true,
    },
  ],
};
