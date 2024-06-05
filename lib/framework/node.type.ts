import { FC } from 'react';

import LabelNode from './components/web-nodes/label-node';
import ContainerNode from './components/web-nodes/container-node';

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
];
