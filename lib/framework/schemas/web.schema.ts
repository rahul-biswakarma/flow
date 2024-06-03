import { z } from 'zod';

export enum WebNodeTypes {
  Label = 'web-node-label',
  Container = 'web-node-container',
}

export const WebNodeTextTypes = z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']);

export const label_node = z.object({
  label: z.string(),
  htmlTag: WebNodeTextTypes,
  type: z.enum([WebNodeTypes.Label]),
});

export const container_node = z.object({
  properties: z.object({
    children: z.array(z.lazy(() => visual_nodes)),
    direction: z.enum(['row', 'column']),
  }),
  type: z.enum([WebNodeTypes.Container]),
});

export const visual_nodes: any = z.lazy(() => z.union([label_node, container_node]));
// export const action_nodes: any = z.lazy(() => z.union([]));
