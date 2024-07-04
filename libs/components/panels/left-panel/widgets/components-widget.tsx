import { useState } from 'react';
import React from 'react';
import clsx from 'clsx';
import { Card, Flex, Text, Tooltip, ScrollArea } from '@radix-ui/themes';
import { IconBox } from '@tabler/icons-react';

import { ProjectPanelHeader } from '../common/project-panel-header';

import styles from '@/libs/styles/left-panel.module.css';
import { WebNodeTypesType, NodeDragWrapper } from '@/libs/flow';
import { webNodeTypes } from '@/libs/types';

export const ComponentsWidget = () => {
  const [isCreateComponentEnable, setIsCreateComponentEnable] = useState(false);

  return (
    <>
      <ProjectPanelHeader
        label="Components"
        view="components"
        onClick={() => setIsCreateComponentEnable(!isCreateComponentEnable)}
      />
      <ScrollArea>
        <Flex direction="column">
          {webNodeTypes.map(
            (node) => node.visibility === 'public' && <ComponentListItem key={node.name} node={node} />,
          )}
        </Flex>
      </ScrollArea>
    </>
  );
};

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
