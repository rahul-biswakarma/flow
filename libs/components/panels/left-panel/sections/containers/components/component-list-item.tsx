import React from 'react';
import clsx from 'clsx';
import { Component1Icon } from '@radix-ui/react-icons';

import styles from '@/libs/styles/left-panel.module.css';
import { WebNodeTypesType } from '@/libs/flow';
import { NodeDragWrapper } from '@/libs/flow/components/nodes/node-drag-wrapper';

export const ComponentListItem = ({ node }: { node: WebNodeTypesType }) => {
  return (
    <NodeDragWrapper className={clsx(styles.pageListItem)} node={node}>
      <Component1Icon />
      {node.name}
    </NodeDragWrapper>
  );
};
