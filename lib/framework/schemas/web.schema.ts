import { z } from 'zod';

export enum WebNodeTypes {
  Label = 'web-node-label',
  Button = 'web-node-button',
  State = 'web-node-state',
  DataFetcher = 'web-node-data-fetcher',
  Redirect = 'web-node-redirect',
  Container = 'web-node-container',
  Page = 'web-node-page',
  App = 'web-node-app',
}

export const WebNodeTextTypes = z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']);

export const label_node = z.object({
  label: z.string(),
  htmlTag: WebNodeTextTypes,
  type: z.enum([WebNodeTypes.Label]),
});

export const button_node = z.object({
  properties: z.object({
    label: z.string(),
    onClick: z.array(z.lazy(() => action_nodes)),
    style: z.record(z.any()),
  }),
  type: z.enum([WebNodeTypes.Button]),
});

export const state_node = z.object({
  properties: z.object({
    initialValue: z.union([z.string(), z.number(), z.boolean()]),
  }),
  type: z.enum([WebNodeTypes.State]),
});

export const data_fetcher_node = z.object({
  properties: z.object({
    body: z.any().optional(),
    headers: z.record(z.any()),
    method: z.string(),
    onError: z.lazy(() => visual_nodes).optional(),
    onSuccess: z.lazy(() => visual_nodes).optional(),
    url: z.string(),
  }),
  type: z.enum([WebNodeTypes.DataFetcher]),
});

const redirect_node = z.object({
  properties: z.object({
    to: z.string(),
  }),
  type: z.enum([WebNodeTypes.Redirect]),
});

export const container_node = z.object({
  properties: z.object({
    children: z.array(z.lazy(() => visual_nodes)),
    direction: z.enum(['row', 'column']),
  }),
  type: z.enum([WebNodeTypes.Container]),
});

export const page_node = z.object({
  properties: z.object({
    children: z.array(z.lazy(() => visual_nodes)),
    route: z.string(),
  }),
  type: z.enum([WebNodeTypes.Page]),
});

export const app_node = z.object({
  properties: z.object({
    children: z.array(page_node),
  }),
  type: z.enum([WebNodeTypes.App]),
});

export const visual_nodes: any = z.lazy(() => z.union([label_node, button_node, container_node]));
export const action_nodes: any = z.lazy(() => z.union([state_node, data_fetcher_node, redirect_node]));
