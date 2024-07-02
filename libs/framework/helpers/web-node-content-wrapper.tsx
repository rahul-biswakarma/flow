'use client';

import { ReactNode } from 'react';

import { useRightPanel } from '@/libs/context';
import { NodeType } from '@/libs/flow';

export const WebNodeContentWrapper = ({ node, children }: { node: NodeType; children: ReactNode }) => {
  const { openPanel } = useRightPanel();

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
