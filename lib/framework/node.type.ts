import { FC } from 'react';

import LabelNode from './components/web-nodes/label-node';

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
];
