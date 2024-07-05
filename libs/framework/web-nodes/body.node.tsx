'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';

import { NodeRendererProps } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const BodyNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeWrapper node={node}>
      <div className={styles.nodeContainer}>
        <Text className={styles.contentContainer}>Body</Text>
        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeWrapper>
  );
};
