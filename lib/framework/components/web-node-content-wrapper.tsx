'use client';

import { ReactNode } from 'react';

import { useRightPanel } from '@/lib/context';
import { NodeType } from '@/lib/types';

export const WebNodeContentWrapper = ({ node, children }: { node: NodeType; children: ReactNode }) => {
  const { openPanel } = useRightPanel();

  return (
    <div
      style={{
        cursor: 'pointer',
      }}
      onClick={() => openPanel(node)}
    >
      {children}
    </div>
  );
};
