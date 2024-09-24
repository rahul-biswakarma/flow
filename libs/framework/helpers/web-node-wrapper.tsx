'use client';

import { ContextMenu } from '@radix-ui/themes';
import { ReactNode } from 'react';

import { useAttribute } from '@/libs/context';
import { NodeType, useFlowContext } from '@/libs/flow';

type WebNodeWrapperProps = {
  node: NodeType;
  children: ReactNode;
  disableDelete?: boolean;
};

export const WebNodeWrapper = ({ node, children, disableDelete }: WebNodeWrapperProps) => {
  const { openPanel, closePanel } = useAttribute();
  const { deleteNode, edges, removeEdge } = useFlowContext();

  const handleDeleteParentConnection = () => {
    // Find the edge where this node is the target
    const parentEdge = Object.values(edges).find((edge) => edge.source.nodeId === node.id);

    if (parentEdge) {
      removeEdge(parentEdge.id);
    }
  };

  const hasParentConnection = Object.values(edges).some((edge) => edge.source.nodeId === node.id);

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
          width: '200px',
        }}
        variant="soft"
      >
        {hasParentConnection && (
          <ContextMenu.Item
            color="orange"
            onClick={() => {
              closePanel?.();
              handleDeleteParentConnection();
            }}
          >
            Delete Source Edge
          </ContextMenu.Item>
        )}
        <ContextMenu.Item
          color="red"
          disabled={disableDelete}
          onClick={() => {
            closePanel?.();
            deleteNode(node.id);
          }}
        >
          Delete Node
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
