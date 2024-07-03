import { IconAlignJustified } from '@tabler/icons-react';

import { TextNode, ButtonNode, ContainerNode, BodyNode } from '@/libs/framework';
import { WebNodeTypesType, NodeType } from '@/libs/flow';

export const webNodeTypes: WebNodeTypesType[] = [
  {
    type: 'system-text-node',
    name: 'Text',
    renderer: TextNode,
    visibility: 'public',
    description: 'Node for displaying text content.',
    icon: IconAlignJustified,
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

export const getWebNodeRendererByType = (type: string) => webNodeTypes.find((node) => node.type === type)?.renderer;
export type NodeRendererProps = {
  node: NodeType;
};
