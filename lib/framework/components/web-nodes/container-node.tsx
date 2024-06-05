'use client';

import { z } from 'zod';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import React from 'react';

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

const ContainerNode: React.FC<ContainerNodeProps> = memo(function LabelNodeRenderer({ data, isConnectable }) {
  return (
    <>
      <Handle
        isConnectable={isConnectable}
        position={Position.Top}
        style={{ background: '#555' }}
        type="target"
        // onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div className="p-4">Container</div>
      <Handle
        isConnectable={isConnectable}
        position={Position.Bottom}
        style={{ background: '#555' }}
        type="source"
        // onConnect={(params) => console.log('handle onConnect', params)}
      />
    </>
  );
});

export default ContainerNode;
