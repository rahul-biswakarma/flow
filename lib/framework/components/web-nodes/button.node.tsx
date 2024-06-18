'use client';

import { z } from 'zod';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import React from 'react';
import { Button } from '@radix-ui/themes';

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
  return (
    <>
      <Handle isConnectable={isConnectable} position={Position.Top} style={{ background: '#555' }} type="target" />
      <Button>Button</Button>
      <Handle
        id="button-left-slot"
        isConnectable={isConnectable}
        position={Position.Bottom}
        style={{ background: '#555', left: 8 }}
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
        style={{ background: '#555', left: 70 }}
        type="source"
      />
      <Handle
        id="button-on-click"
        isConnectable={isConnectable}
        position={Position.Right}
        style={{ background: '#555' }}
        type="source"
      />
    </>
  );
});
