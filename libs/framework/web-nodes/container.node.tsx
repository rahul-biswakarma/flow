'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper } from '../helpers';
import { NodeHandler } from '../node-handler';

import { NodeRendererProps } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const ContainerNode = ({ node }: NodeRendererProps) => {
  return (
    <div className={styles.nodeContainer}>
      <div className={styles.topHandlerContainer}>
        <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
      </div>
      <WebNodeContentWrapper node={node}>
        <Text className={styles.contentContainer}>Container</Text>
      </WebNodeContentWrapper>
      <div className={styles.bottomHandlerContainer}>
        <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
      </div>
    </div>
  );
};
