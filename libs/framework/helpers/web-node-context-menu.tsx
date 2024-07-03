import { ContextMenu } from '@radix-ui/themes';
import { ReactNode } from 'react';

import { NodeType, useFlowContext } from '@/libs/flow';
import { useFloatingWidget } from '@/libs/context';

export const WebNodeContextMenu = ({ children, node }: { children: ReactNode; node: NodeType }) => {
  const { closePanel } = useFloatingWidget();
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
        <ContextMenu.Item
          color="red"
          onClick={() => {
            closePanel?.();
            deleteNode(node.id);
          }}
        >
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
