import React, { RefObject } from 'react';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import { Component1Icon } from '@radix-ui/react-icons';

import styles from '../../../left-panel.module.css';

import { WebNodeTypesType } from '@/libs/framework';
import { DragDropItemType } from '@/libs/constants';

export const ComponentListItem = ({ node }: { node: WebNodeTypesType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragDropItemType,
    item: { name: node.name, type: node.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as RefObject<HTMLDivElement>}
      className={clsx(styles.pageListItem)}
      role="Handle"
      style={{ opacity: isDragging ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '4px' }}
    >
      <Component1Icon />
      {node.name}
    </div>
  );
};
