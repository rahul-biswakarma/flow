'use client';

import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';
import { NodeIconRenderer } from '../components/node-icon-renderer';

import { NodeRendererProps, WebNodeTypes, getWebNodeByType } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const ContainerNode = ({ node }: NodeRendererProps) => {
  const containerNodeSchema = getWebNodeByType(WebNodeTypes.Container);

  return (
    <WebNodeWrapper node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>
        <Flex className={styles.contentContainer}>
          <NodeIconRenderer nodeSchema={containerNodeSchema} />
          <Text>{containerNodeSchema?.name}</Text>
        </Flex>

        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeWrapper>
  );
};
