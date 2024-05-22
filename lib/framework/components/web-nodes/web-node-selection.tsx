import { z } from 'zod';

import { action_nodes, visual_nodes } from '../../schemas';

import { TextNodeWireFrame } from './text-node';

type VisualNodeProps = z.infer<typeof visual_nodes>;
type ActionNodeProps = z.infer<typeof action_nodes>;

type NodeProps = {
  node: VisualNodeProps | ActionNodeProps;
};

export const WebNodesSelection = ({ node }: NodeProps) => {
  switch (node.type) {
    case 'text':
      return <TextNodeWireFrame {...node} />;
    default:
      return null;
  }
};
