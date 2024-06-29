'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { WebNodeContentWrapper } from '../web-node-content-wrapper';

import styles from './node.module.css';

import { NodeType } from '@/lib/types';

type ContainerNodeProps = {
  node: NodeType;
};

export const ContainerNode = ({ node }: ContainerNodeProps) => {
  return (
    <div className={styles.nodeContainer}>
      <div className={styles.topHandlerContainer}>
        <div className={styles.handler} />
      </div>
      <WebNodeContentWrapper node={node}>
        <Text className={styles.contentContainer}>Container</Text>
      </WebNodeContentWrapper>
      <div className={styles.bottomHandlerContainer}>
        <div className={styles.handler} />
        <div className={styles.handler} />
      </div>
    </div>
  );
};
