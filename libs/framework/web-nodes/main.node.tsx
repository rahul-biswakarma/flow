'use client';

import React from 'react';
import { Flex, Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';
import { NodeIconRenderer } from '../components/node-icon-renderer';

import { NodeRendererProps, WebNodeTypes, getWebNodeByType } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const MainNode = ({ node }: NodeRendererProps) => {
  const mainNodeSchema = getWebNodeByType(WebNodeTypes.Main);

  return (
    <WebNodeWrapper disableDelete={true} node={node}>
      <div className={styles.nodeContainer}>
        <Flex className={styles.contentContainer}>
          <NodeIconRenderer nodeSchema={mainNodeSchema} />
          <Text>{mainNodeSchema?.name}</Text>
        </Flex>
        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeWrapper>
  );
};
