import clsx from 'clsx';
import { Flex } from '@radix-ui/themes';
import { Component1Icon } from '@radix-ui/react-icons';

import styles from '../../../left-panel.module.css';

import { WebNodeTypesType } from '@/lib/framework';

export const ComponentListItem = ({ node }: { node: WebNodeTypesType }) => {
  return (
    <Flex
      draggable
      align="center"
      className={clsx(styles.pageListItem, 'dndnode')}
      gap="1"
      onDragStart={(event) => {
        event.dataTransfer.setData('application/reactflow', node.id);
      }}
    >
      <Component1Icon />
      {node.name}
    </Flex>
  );
};
