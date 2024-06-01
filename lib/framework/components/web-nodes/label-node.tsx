'use client';

import { z } from 'zod';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import React from 'react';

import { label_node, SettingsTypes, NodeSettingType } from '../../schemas';

type LabelNodeType = z.infer<typeof label_node>;

const HTMLTextComponents = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
} as const;

type DataType = {
  node: LabelNodeType & typeof NodeSettingType;
  settings: (typeof SettingsTypes)[];
};

type LabelNodeProps = {
  data: DataType;
  isConnectable: boolean;
};

const LabelNode = memo(function LabelNodeRenderer({ data, isConnectable }: LabelNodeProps) {
  return (
    <>
      <Handle
        isConnectable={isConnectable}
        position={Position.Left}
        style={{ background: '#555' }}
        type="target"
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      {React.createElement(HTMLTextComponents[data.node.htmlTag] || HTMLTextComponents.p, data.node.label)}
    </>
  );
});

export default LabelNode;
