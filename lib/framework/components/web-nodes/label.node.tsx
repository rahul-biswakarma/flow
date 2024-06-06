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

export const LabelNode: React.FC<LabelNodeProps> = memo(function LabelNodeRenderer({ data, isConnectable }) {
  const properties = data.node.properties;
  const { htmlTag: specifiedHtmlTag, label: specifiedLabel } = properties;

  const htmlTag = specifiedHtmlTag ?? HTMLTextComponents.p;
  const label = specifiedLabel ?? 'Default Label';

  return (
    <>
      <Handle isConnectable={isConnectable} position={Position.Top} style={{ background: '#555' }} type="target" />
      {React.createElement(htmlTag, {}, label)}
    </>
  );
});
