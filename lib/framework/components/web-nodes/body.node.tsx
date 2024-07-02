'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { NodeHandler, WebNodeContentWrapper, WebNodeContextMenu } from '../web-node-helper';
import { NodeRendererProps } from '../../node.type';

import styles from './node.module.css';

export const BodyNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeContextMenu node={node}>
      <div className={styles.nodeContainer}>
        <WebNodeContentWrapper node={node}>
          <Text className={styles.contentContainer}>Body</Text>
        </WebNodeContentWrapper>
        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeContextMenu>
  );
};
