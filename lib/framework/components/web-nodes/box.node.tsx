'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { NodeHandler, WebNodeContentWrapper, WebNodeContextMenu } from '../web-node-helper';
import { NodeRendererProps } from '../../node.type';

import styles from './node.module.css';

export const BoxNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeContextMenu node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>
        <WebNodeContentWrapper node={node}>
          <Text className={styles.contentContainer}>Box</Text>
        </WebNodeContentWrapper>
        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeContextMenu>
  );
};
