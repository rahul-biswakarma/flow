import { FC } from 'react';
import { z } from 'zod';

import { NodeType } from '../types';

import { TextNode, ButtonNode, FlexNode, GridNode, BoxNode } from './components';
import { styleSettingSchema } from './schemas/setting.schema';

export type WebNodeTypesType = {
  type: string;
  name: string;
  renderer: FC<any>;
};

export const webNodeTypes: WebNodeTypesType[] = [
  {
    type: 'system-box-node',
    name: 'Box',
    renderer: BoxNode,
  },
  {
    type: 'system-flex-node',
    name: 'Flex',
    renderer: FlexNode,
  },
  {
    type: 'system-grid-node',
    name: 'Grid',
    renderer: GridNode,
  },
  {
    type: 'system-text-node',
    name: 'Text',
    renderer: TextNode,
  },
  {
    type: 'system-button-node',
    name: 'Button',
    renderer: ButtonNode,
  },
];

export const getWebNode = (type: string) => webNodeTypes.find((node) => node.type === type);

export type StyleSettingType = z.infer<typeof styleSettingSchema>;

export type NodeRendererProps = {
  node: NodeType;
};
