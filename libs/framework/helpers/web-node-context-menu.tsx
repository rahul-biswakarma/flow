import { ContextMenu } from '@radix-ui/themes';
import { ReactNode } from 'react';

import { NodeType, useFlowContext } from '@/libs/flow';

export const WebNodeContextMenu = ({ children, node }: { children: ReactNode; node: NodeType }) => {
  const { deleteNode } = useFlowContext();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content
        style={{
          width: '150px',
        }}
        variant="soft"
      >
        <ContextMenu.Item color="red" onClick={() => deleteNode(node.id)}>
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
