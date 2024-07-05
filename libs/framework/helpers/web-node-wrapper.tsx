'use client';
import { ContextMenu } from '@radix-ui/themes';
import { ReactNode } from 'react';

import { useFloatingWidget } from '@/libs/context';
import { NodeType, useFlowContext } from '@/libs/flow';

export const WebNodeWrapper = ({ node, children }: { node: NodeType; children: ReactNode }) => {
  const { openPanel, closePanel } = useFloatingWidget();
  const { deleteNode } = useFlowContext();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={() =>
            openPanel(
              {
                nodeId: node.id,
                title: node.name,
              },
              'settings',
            )
          }
        >
          {children}
        </div>
      </ContextMenu.Trigger>
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
