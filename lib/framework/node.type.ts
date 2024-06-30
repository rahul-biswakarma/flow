import { FC } from 'react';
import { z } from 'zod';

import { NodeType } from '../types';

import { LabelNode, ContainerNode, ButtonNode } from './components';
import { styleSettingSchema } from './schemas/setting.schema';

export type WebNodeTypesType = {
  type: string;
  name: string;
  renderer: FC<any>;
};

export const webNodeTypes: WebNodeTypesType[] = [
  {
    type: 'system-label-node',
    name: 'Label',
    renderer: LabelNode,
  },
  {
    type: 'system-container-node',
    name: 'Container',
    renderer: ContainerNode,
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
