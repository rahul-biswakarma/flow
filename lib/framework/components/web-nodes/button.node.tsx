'use client';

import { z } from 'zod';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import React from 'react';

import { button_node } from '../../schemas';

type ButtonNodeType = z.infer<typeof button_node>;

type DataType = {
  node: ButtonNodeType;
  settings: { [key: string]: any }[];
};

type ButtonNodeProps = {
  data: DataType;
  isConnectable: boolean;
};

export const ButtonNode: React.FC<ButtonNodeProps> = memo(function ButtonNodeRenderer({ data, isConnectable }) {
  const { properties } = data.node;
  const { text } = properties;

  return (
    <>
      <Handle isConnectable={isConnectable} position={Position.Top} style={{ background: '#555' }} type="target" />
      <button>{text}</button>
      <Handle
        id="button-left-slot"
        isConnectable={isConnectable}
        position={Position.Bottom}
        style={{ background: '#555' }}
        type="source"
      />
      <Handle
        id="button-content"
        isConnectable={isConnectable}
        position={Position.Bottom}
        style={{ background: '#555' }}
        type="source"
      />
      <Handle
        id="button-right-slot"
        isConnectable={isConnectable}
        position={Position.Bottom}
        style={{ background: '#555' }}
        type="source"
      />
    </>
  );
});
