export type NodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  config: any;
};

export type EdgeType = {
  id: string;
  source: string;
  target: string;
};
