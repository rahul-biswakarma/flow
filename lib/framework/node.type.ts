import { FC } from 'react';

import { LabelNode, ContainerNode, ButtonNode } from './components';

export type WebNodeTypesType = {
  name: string;
  renderer: FC<any>;
};

export const webNodeTypes: WebNodeTypesType[] = [
  {
    name: 'system-label-node',
    renderer: LabelNode,
  },
  {
    name: 'system-container-node',
    renderer: ContainerNode,
  },
  {
    name: 'system-button-node',
    renderer: ButtonNode,
  },
];
