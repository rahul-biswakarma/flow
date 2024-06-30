import { StyleSettingType } from '../framework';

export type NodeType = {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  config?: NodeConfigType;
};

export type EdgeType = {
  id: string;
  source: string;
  target: string;
};

export type DropItemType = {
  type: string;
  name: string;
};

export type NodeConfigType = {
  styles?: StyleSettingType;
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

export type EdgeTypes = 'visual-target' | 'visual-source' | 'action-target' | 'action-source';

export type EdgeKeys = 'content' | 'right-slot' | 'left-slot' | 'on-click';
