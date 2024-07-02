'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper, WebNodeContextMenu } from '../helpers';
import { NodeHandler } from '../node-handler';

import styles from '@/libs/styles/node.module.css';
import { NodeRendererProps } from '@/libs/types/node.type';

export const TextNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeContextMenu node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>
        <WebNodeContentWrapper node={node}>
          <Text className={styles.contentContainer}>Text</Text>
        </WebNodeContentWrapper>
      </div>
    </WebNodeContextMenu>
  );
};
