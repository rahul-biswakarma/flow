import { FC } from 'react';

import { LabelNode, ContainerNode, ButtonNode } from './components';

type WebNodeTypesType = {
  id: string;
  name: string;
  renderer: FC<any>;
}[];

export const webNodeTypes: WebNodeTypesType = [
  {
    id: 'label-node',
    name: 'Label',
    renderer: LabelNode,
  },
  {
    id: 'container-node',
    name: 'Container',
    renderer: ContainerNode,
  },
  {
    id: 'button-node',
    name: 'Button',
    renderer: ButtonNode,
  },
];
