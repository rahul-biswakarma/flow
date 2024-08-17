import { nanoid } from 'nanoid';

import { WebNodeTypes } from '../types';

import { EdgeType, NodeHandlerType } from './types';

export const generateHandlerId = (data: NodeHandlerType) => {
  return `flow-handler-${data.nodeId}-${data.handlerType}-${data.handlerKey}`;
};

export const generateEdgeId = (fromData: NodeHandlerType, toData: NodeHandlerType) => {
  return `flow-edge-${fromData.nodeId}-${fromData.handlerType}-${fromData.handlerKey}_${toData.nodeId}-${toData.handlerType}-${toData.handlerKey}`;
};

export const getHandlerElement = (data: NodeHandlerType): Element | null => {
  const handlerId = generateHandlerId(data);

  return document.querySelector(`[data-handler-id="${handlerId}"]`);
};

export function validateConnection(from: NodeHandlerType, to: NodeHandlerType) {
  if (from.nodeId === to.nodeId) return false;
  if (from.handlerType === to.handlerType) return false;
  if (
    (from.handlerType === 'visual-source' && to.handlerType === 'action-target') ||
    (from.handlerType === 'visual-target' && to.handlerType === 'action-source') ||
    (from.handlerType === 'action-source' && to.handlerType === 'visual-target') ||
    (from.handlerType === 'action-target' && to.handlerType === 'visual-source')
  )
    return false;

  return true;
}

export const getAffectedEdges = (edges: Record<string, EdgeType>, nodeId: string): string[] => {
  return Object.keys(edges)
    .map((edgeId) => {
      const edge = edges[edgeId];

      if (edge.source.nodeId === nodeId || edge.target.nodeId === nodeId) {
        return edgeId;
      }

      return null;
    })
    .filter((edgeId) => edgeId !== null) as string[];
};

export const generateMainNodeData = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const mainNodeId = nanoid();
  const containerXCenter = (containerRef.current?.clientWidth ?? 1) / 2;

  return {
    [mainNodeId]: {
      id: mainNodeId,
      type: WebNodeTypes.Main,
      name: 'Main',
      position: { x: containerXCenter, y: 100 },
      config: {},
    },
  };
};
