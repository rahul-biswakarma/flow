'use client';

import { z } from 'zod';
import { memo } from 'react';
import React from 'react';
import { Box, Card, Text } from '@radix-ui/themes';

import { SettingsTypes, NodeSettingType, container_node } from '../../schemas';

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
    <Card style={{ position: 'relative', isolation: 'isolate', padding: '40px', overflow: 'auto', margin: '40px' }}>
      <div
        style={{
          zIndex: 30,
          width: '60%',
          height: '10px',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'var(--gray-3)',
          borderRadius: 4,
          pointerEvents: 'none',
          border: '1px solid var(--gray-5)',
        }}
      />
      <Text
        style={{
          zIndex: 2,
        }}
      >
        Container
      </Text>
      <Box
        style={{
          zIndex: 1,
          width: '60%',
          height: '10px',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          background: 'var(--gray-3)',
          borderRadius: 4,
          pointerEvents: 'none',
          border: '1px solid var(--gray-5)',
        }}
      />
    </Card>
  );
});
