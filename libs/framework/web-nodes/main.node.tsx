'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';

import { NodeHandler } from '../node-handler';
import { WebNodeWrapper } from '../helpers';

import { NodeRendererProps } from '@/libs/types/node.type';
import styles from '@/libs/styles/node.module.css';

export const MainNode = ({ node }: NodeRendererProps) => {
  return (
    <WebNodeWrapper disableDelete={true} node={node}>
      <div className={styles.nodeContainer}>
        <Text className={styles.contentContainer}>Main</Text>
        <div className={styles.bottomHandlerContainer}>
          <NodeHandler handlerKey="content" handlerType="visual-target" nodeId={node.id} />
        </div>
      </div>
    </WebNodeWrapper>
  );
};
