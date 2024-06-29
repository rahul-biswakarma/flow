import { ContextMenu } from '@radix-ui/themes';
import { ReactNode } from 'react';

import { NodeType } from '@/lib/types';
import { useProjectContext } from '@/lib/context';

export const WebNodeContextMenu = ({ children, node }: { children: ReactNode; node: NodeType }) => {
  const { deleteNode } = useProjectContext();

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
