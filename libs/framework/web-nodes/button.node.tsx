'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper, WebNodeContextMenu } from '../helpers';
import { NodeHandler } from '../node-handler';

import { NodeRendererProps } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const ButtonNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeContextMenu node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>
        <WebNodeContentWrapper node={node}>
          <Text className={styles.contentContainer}>Button</Text>
        </WebNodeContentWrapper>
        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="right-slot" handlerType="visual-target" nodeId={node.id} />
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
          <NodeHandler handlerKey="left-slot" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeContextMenu>
  );
};
