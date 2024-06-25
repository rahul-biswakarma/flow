'use client';

import { z } from 'zod';
import { memo } from 'react';
import React from 'react';
import { Text } from '@radix-ui/themes';

import { SettingsTypes, NodeSettingType, container_node } from '../../schemas';

import styles from './node.module.css';

type ContainerNodeType = z.infer<typeof container_node>;

type DataType = {
  node: ContainerNodeType & typeof NodeSettingType;
  settings: (typeof SettingsTypes)[];
};

type ContainerNodeProps = {
  data: DataType;
  isConnectable: boolean;
};

export const ContainerNode: React.FC<ContainerNodeProps> = memo(function LabelNodeRenderer({ data, isConnectable }) {
  return (
    <div className={styles.nodeContainer}>
      <div className={styles.topHandlerContainer}>
        <div className={styles.handler} />
      </div>
      <Text className={styles.contentContainer}>Container</Text>
      <div className={styles.bottomHandlerContainer}>
        <div className={styles.handler} />
      </div>
    </div>
  );
});
