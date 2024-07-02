import { FC } from 'react';

export type NodeType = {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  config?: NodeConfigType;
};

export type EdgeType = {
  id: string;
  source: NodeHandlerType;
  target: NodeHandlerType;
};

export type DropItemType = {
  type: string;
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
};

export type EdgeTypes = 'visual-target' | 'visual-source' | 'action-target' | 'action-source';

export type EdgeKeys = 'content' | 'right-slot' | 'left-slot' | 'on-click';
