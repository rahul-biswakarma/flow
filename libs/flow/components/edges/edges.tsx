import React, { useMemo } from 'react';

import { EdgeType, NodeType } from '../../types';
import { getHandlerElement } from '../../utils';

import { Edge } from './edge';

interface EdgesProps {
  edges: Record<string, EdgeType>;
  nodes: Record<string, NodeType>;
  containerPosition: { left: number; top: number } | null;
  scale: number;
  translate: { x: number; y: number };
}

export const Edges: React.FC<EdgesProps> = React.memo(({ edges, nodes, containerPosition, scale, translate }) => {
  const scaledEdges = useMemo(() => {
    if (!containerPosition) return [];

    const edgesArray = Object.values(edges);

    return edgesArray
      .map((edge) => {
        const sourceNode = nodes[edge.source.nodeId];
        const targetNode = nodes[edge.target.nodeId];

        if (!sourceNode || !targetNode) {
          return null;
        }

        const sourceHandler = getHandlerElement(edge.source);
        const targetHandler = getHandlerElement(edge.target);

        if (!sourceHandler || !targetHandler) {
          return null;
        }

        const sourceRect = sourceHandler.getBoundingClientRect();
        const targetRect = targetHandler.getBoundingClientRect();

        const sourcePosition = {
          x: sourceRect.left + sourceRect.width / 2 - containerPosition.left,
          y: sourceRect.top + sourceRect.height / 2 - containerPosition.top,
        };

        const targetPosition = {
          x: targetRect.left + targetRect.width / 2 - containerPosition.left,
          y: targetRect.top + targetRect.height / 2 - containerPosition.top,
        };

        return {
          ...edge,
          sourcePosition,
          targetPosition,
        };
      })
      .filter(Boolean);
  }, [edges, nodes, containerPosition, scale, translate]);

  return (
    <>
      {scaledEdges
        .filter((edge) => edge !== null)
        .map((edge) => (
          <Edge
            key={edge.id}
            fromX={edge.sourcePosition.x}
            fromY={edge.sourcePosition.y}
            scale={scale}
            toX={edge.targetPosition.x}
            toY={edge.targetPosition.y}
          />
        ))}
    </>
  );
});

Edges.displayName = 'Edges';
