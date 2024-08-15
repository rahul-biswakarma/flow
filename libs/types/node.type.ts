import { IconAlignJustified, IconBox, IconBoxModel } from '@tabler/icons-react';

import { TextNode, ButtonNode, ContainerNode, MainNode } from '@/libs/framework';
import { WebNodeTypesType, NodeType } from '@/libs/flow';

export enum WebNodeTypes {
  Button = 'system-button-node',
  Container = 'system-container-node',
  Main = 'system-main-node',
  Text = 'system-text-node',
}

export const webNodeTypes: WebNodeTypesType[] = [
  {
    type: WebNodeTypes.Text,
    name: 'Text',
    renderer: TextNode,
    visibility: 'public',
    description: 'Node for displaying text content.',
    icon: IconAlignJustified,
  },
  {
    type: WebNodeTypes.Button,
    name: 'Button',
    renderer: ButtonNode,
    visibility: 'public',
    icon: IconBoxModel,
  },
  {
    type: WebNodeTypes.Container,
    name: 'Container',
    renderer: ContainerNode,
    visibility: 'public',
    icon: IconBox,
  },
  {
    type: WebNodeTypes.Main,
    name: 'Main',
    renderer: MainNode,
    visibility: 'private',
  },
];

export const getWebNodeByType = (type: string) => webNodeTypes.find((node) => node.type === type);

export const getWebNodeRendererByType = (type: string) => webNodeTypes.find((node) => node.type === type)?.renderer;
export type NodeRendererProps = {
  node: NodeType;
};
