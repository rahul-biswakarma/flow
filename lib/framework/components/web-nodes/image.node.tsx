'use client';

import { z } from 'zod';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import React from 'react';

const image_node = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string().optional(),
  width: z.string().default('100%'),
  height: z.string().default('auto'),
});

type ImageNodeType = z.infer<typeof image_node>;

type DataType = {
  node: ImageNodeType;
  settings: { [key: string]: any }[];
};

type ImageNodeProps = {
  data: DataType;
  isConnectable: boolean;
};

export const ImageNode: React.FC<ImageNodeProps> = memo(function ImageNodeRenderer({ data, isConnectable }) {
  const { src, alt, width, height } = data.node;

  return (
    <>
      <Handle isConnectable={isConnectable} position={Position.Top} style={{ background: '#555' }} type="target" />
      <img alt={alt} src={src} style={{ width, height }} />
      <Handle isConnectable={isConnectable} position={Position.Bottom} style={{ background: '#555' }} type="source" />
    </>
  );
});
