import { FC } from 'react';
import { z } from 'zod';

import { TextNode, ButtonNode, ContainerNode, BodyNode } from '../components';
import { styleSettingSchema } from '../schemas/setting.schema';

import { NodeType } from '@/lib/types';

export type WebNodeTypesType = {
  type: string;
  name: string;
  renderer: FC<any>;
  visibility: 'public' | 'private';
};

export const webNodeTypes: WebNodeTypesType[] = [
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
    visibility: 'public',
  },
  {
    type: 'system-body-node',
    name: 'Body',
    renderer: BodyNode,
    visibility: 'private',
  },
];

export const getWebNode = (type: string) => webNodeTypes.find((node) => node.type === type);

export type StyleSettingType = z.infer<typeof styleSettingSchema>;

export type NodeRendererProps = {
  node: NodeType;
};
