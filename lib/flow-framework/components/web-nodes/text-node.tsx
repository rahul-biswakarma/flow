import { z } from 'zod';

import { text_node } from '@/schemas/web.schema';

type TextNodeType = z.infer<typeof text_node>;

const HTMLTextComponents = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
} as const;

export const TextNodeWireFrame = (node: TextNodeType) => {
  const { content, style, type } = node.properties;
  const Component = HTMLTextComponents[type];

  return <Component style={style}>{content}</Component>;
};
