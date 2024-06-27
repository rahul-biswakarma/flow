import { FC } from 'react';

import { LabelNode, ContainerNode, ButtonNode } from './components';

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
