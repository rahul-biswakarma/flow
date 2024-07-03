import React from 'react';
import clsx from 'clsx';
import { Card, Flex, Text, Tooltip } from '@radix-ui/themes';
import { IconBox } from '@tabler/icons-react';

import styles from '@/libs/styles/left-panel.module.css';
import { WebNodeTypesType, NodeDragWrapper } from '@/libs/flow';

export const ComponentListItem = ({ node }: { node: WebNodeTypesType }) => {
  const IconComponent = node.icon ?? IconBox;

  const renderer = (
    <Card
      style={{
        width: '100%',
      }}
    >
      <Flex align="center" gap="4">
        <IconComponent size="20px" />
        <Text>{node.name}</Text>
      </Flex>
    </Card>
  );

  return (
    <div className={clsx(styles.pageListItem, styles.componentListItem)}>
      <NodeDragWrapper node={node}>
        {node.description ? <Tooltip content={node.description}>{renderer}</Tooltip> : renderer}
      </NodeDragWrapper>
    </div>
  );
};
