import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import clsx from 'clsx';
import { Flex } from '@radix-ui/themes';
import { Component1Icon } from '@radix-ui/react-icons';

import styles from '../../../left-panel.module.css';

import { WebNodeTypesType } from '@/lib/framework';

const ItemType = 'COMPONENT';

export const ComponentListItem = ({ node }: { node: WebNodeTypesType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: node.id, name: node.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <Flex
      ref={ref}
      align="center"
      className={clsx(styles.pageListItem, 'dndnode')}
      gap="1"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Component1Icon />
      {node.name}
    </Flex>
  );
};
