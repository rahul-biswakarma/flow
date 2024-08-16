import { FC } from 'react';

import { WebNodeTypes } from '@/libs/types';

export type NodeType = {
  id: string;
  type: WebNodeTypes;
  name: string;
  position?: { x: number; y: number };
  config?: NodeConfigType;
  context?: Record<string, any>;
};

export type EdgeType = {
  id: string;
  source: NodeHandlerType;
  target: NodeHandlerType;
};

export type DropItemType = {
  type: WebNodeTypes;
  name: string;
};

export type NodeConfigType = {
  styles?: Record<string, any>;
  attributes?: Record<string, any>;
};

export type NodeHandlerType = {
  nodeId: string;
  handlerType: EdgeTypes;
  handlerKey: EdgeKeys;
};

export type ConnectionType = {
  from?: NodeHandlerType;
  to?: NodeHandlerType;
};

export type WebNodeTypesType = {
  type: string;
  name: string;
  renderer: FC<any>;
  visibility: 'public' | 'private';
  description?: string;
  icon?: FC<any>;
};

export type EdgeTypes = 'visual-target' | 'visual-source' | 'action-target' | 'action-source';

export type EdgeKeys = 'content' | 'right-slot' | 'left-slot' | 'on-click';
