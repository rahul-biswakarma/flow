import { z } from 'zod';

import { styleSettingSchema } from './setting.schema';

// these schemas will be used during generation code from nodes

export enum WebNodeTypes {
  Label = 'web-node-label',
  Container = 'web-node-container',
  Button = 'web-node-button',
}

export const WebNodeTextTypes = z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']);

export const label_node = z.object({
  id: z.string(),
  type: z.enum([WebNodeTypes.Label]),
  properties: z.object({
    label: z.string(),
    htmlTag: WebNodeTextTypes,
  }),
  styles: styleSettingSchema,
});

export const container_node = z.object({
  id: z.string(),
  type: z.enum([WebNodeTypes.Container]),
  properties: z.object({
    children: z.array(z.lazy(() => visual_nodes)),
    direction: z.enum(['row', 'column']),
  }),
  styles: styleSettingSchema,
});

export const button_node = z.object({
  id: z.string(),
  type: z.enum([WebNodeTypes.Button]),
  properties: z.object({
    text: z.string().default('Click Me'),
    onClick: z.lazy(() => action_nodes).optional(),
    rightSlot: z.lazy(() => visual_nodes).optional(),
    leftSlot: z.lazy(() => visual_nodes).optional(),
    content: z.lazy(() => visual_nodes).optional(),
  }),
  styles: styleSettingSchema,
});

export const visual_nodes: any = z.lazy(() => z.union([label_node, container_node]));
export const action_nodes: any = z.lazy(() => z.union([]));
