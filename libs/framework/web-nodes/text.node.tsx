'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';

import styles from '@/libs/styles/node.module.css';
import { NodeRendererProps } from '@/libs/types/node.type';

export const TextNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeWrapper node={node}>
      <div className={styles.nodeContainer}>
        <div className={styles.topHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-source" nodeId={node.id} />
        </div>
        <Text className={styles.contentContainer}>Text</Text>
      </div>
    </WebNodeWrapper>
  );
};
