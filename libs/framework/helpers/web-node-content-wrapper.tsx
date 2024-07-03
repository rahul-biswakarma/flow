'use client';

import { ReactNode } from 'react';

import { useFloatingWidget } from '@/libs/context';
import { NodeType } from '@/libs/flow';

export const WebNodeContentWrapper = ({ node, children }: { node: NodeType; children: ReactNode }) => {
  const { openPanel } = useFloatingWidget();

  return (
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
  );
};
