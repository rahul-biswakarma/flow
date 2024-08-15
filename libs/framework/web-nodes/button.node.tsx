'use client';

import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';
import { NodeIconRenderer } from '../components/node-icon-renderer';

import { NodeRendererProps, WebNodeTypes, getWebNodeByType } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const ButtonNode = ({ node }: NodeRendererProps) => {
  const buttonNodeSchema = getWebNodeByType(WebNodeTypes.Button);

  return (
    <WebNodeWrapper node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>

        <Flex className={styles.contentContainerWithData} direction="column" gap="2px">
          <Flex align="center" gap="6px">
            <NodeIconRenderer nodeSchema={buttonNodeSchema} />
            <Text>{buttonNodeSchema?.name}</Text>
          </Flex>
          <Text className={styles.contentData}>{node.config?.attributes?.children}</Text>
        </Flex>

        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="right-slot" handlerType="visual-target" nodeId={node.id} />
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
          <NodeHandler handlerKey="left-slot" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeWrapper>
  );
};
