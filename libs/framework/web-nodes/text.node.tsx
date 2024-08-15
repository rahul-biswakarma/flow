'use client';

import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';
import { NodeIconRenderer } from '../components/node-icon-renderer';

import styles from '@/libs/styles/node.module.css';
import { NodeRendererProps, WebNodeTypes, getWebNodeByType } from '@/libs/types/node.type';

export const TextNode = ({ node }: NodeRendererProps) => {
  const textNodeSchema = getWebNodeByType(WebNodeTypes.Text);

  return (
    <WebNodeWrapper node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>
        <Flex className={styles.contentContainerWithData} direction="column" gap="2px">
          <Flex align="center" gap="6px">
            <NodeIconRenderer nodeSchema={textNodeSchema} />
            <Text>{textNodeSchema?.name}</Text>
          </Flex>
          <Text className={styles.contentData}>{node.config?.attributes?.children}</Text>
        </Flex>
      </div>
    </WebNodeWrapper>
  );
};
