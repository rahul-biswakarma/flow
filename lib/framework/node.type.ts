import { FC } from 'react';
import { z } from 'zod';

import { NodeType } from '../types';

import { TextNode, ButtonNode, FlexNode, GridNode, BoxNode, ContainerNode } from './components';
import { styleSettingSchema } from './schemas/setting.schema';

export type WebNodeTypesType = {
  type: string;
  name: string;
  renderer: FC<any>;
  visibility: 'public' | 'private';
};

export const webNodeTypes: WebNodeTypesType[] = [
  {
    type: 'system-box-node',
    name: 'Box',
    renderer: BoxNode,
    visibility: 'public',
  },
  {
    type: 'system-flex-node',
    name: 'Flex',
    renderer: FlexNode,
    visibility: 'public',
  },
  {
    type: 'system-grid-node',
    name: 'Grid',
    renderer: GridNode,
    visibility: 'public',
  },
  {
    type: 'system-text-node',
    name: 'Text',
    renderer: TextNode,
    visibility: 'public',
  },
  {
    type: 'system-button-node',
    name: 'Button',
    renderer: ButtonNode,
    visibility: 'public',
  },
  {
    type: 'system-container-node',
    name: 'Container',
    renderer: ContainerNode,
    visibility: 'private',
  },
];

export const getWebNode = (type: string) => webNodeTypes.find((node) => node.type === type);

export type StyleSettingType = z.infer<typeof styleSettingSchema>;

export type NodeRendererProps = {
  node: NodeType;
};
