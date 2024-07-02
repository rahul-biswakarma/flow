'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper, WebNodeContextMenu } from '../helpers';
import { NodeHandler } from '../node-handler';

import { NodeRendererProps } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

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
