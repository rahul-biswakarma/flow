import React, { useEffect } from 'react';

import { EdgeType, NodeType } from '../../types';
import { getHandlerElement } from '../../utils';

import { Edge } from './edge';

interface EdgesProps {
  edges: EdgeType[];
  nodes: Record<string, NodeType>;
  containerPosition: { left: number; top: number } | null;
}

export const Edges: React.FC<EdgesProps> = ({ edges, nodes, containerPosition }) => {
  useEffect(() => {
    // Recalculate positions when nodes or container position changes
  }, [edges, nodes, containerPosition]);

  return (
    <>
      {edges.map((edge) => {
        const sourceNode = nodes[edge.source.nodeId];
        const targetNode = nodes[edge.target.nodeId];

        if (!sourceNode || !targetNode || !containerPosition) {
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

        return (
          <Edge
            key={edge.id}
            fromX={sourcePosition.x}
            fromY={sourcePosition.y}
            toX={targetPosition.x}
            toY={targetPosition.y}
          />
        );
      })}
    </>
  );
};
