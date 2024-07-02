'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { NodeHandler, WebNodeContentWrapper } from '../web-node-helper';
import { NodeRendererProps } from '../../node.type';

import styles from './node.module.css';

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
