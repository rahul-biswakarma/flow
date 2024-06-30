'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper, WebNodeContextMenu } from '../web-node-helper';
import { NodeRendererProps } from '../../node.type';

import styles from './node.module.css';

export const LabelNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeContextMenu node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <div className={styles.handler} />
        </div>
        <WebNodeContentWrapper node={node}>
          <Text className={styles.contentContainer}>Label</Text>
        </WebNodeContentWrapper>
      </div>
    </WebNodeContextMenu>
  );
};
