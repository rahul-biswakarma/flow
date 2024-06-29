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
