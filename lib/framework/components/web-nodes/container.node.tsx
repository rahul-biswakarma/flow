'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper, WebNodeContextMenu } from '../web-node-helper';
import { NodeRendererProps } from '../../node.type';

import styles from './node.module.css';

export const ContainerNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeContextMenu node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <div className={styles.handler} />
        </div>
        <WebNodeContentWrapper node={node}>
          <Text className={styles.contentContainer}>Container</Text>
        </WebNodeContentWrapper>
        <div className={styles.bottomHandlerContainer}>
          <div className={styles.handler} />
        </div>
      </div>
    </WebNodeContextMenu>
  );
};
