import React, { useMemo, useEffect, useState } from 'react';

import { EdgeType, NodeType } from '../../types';
import { getHandlerElement } from '../../utils';

import { Edge } from './edge';

import { useFlowContext } from '@/libs/flow';

interface EdgesProps {
  edges: Record<string, EdgeType>;
  nodes: Record<string, NodeType>;
  containerPosition: { left: number; top: number } | null;
  scale: number;
  translate: { x: number; y: number };
}

export const Edges: React.FC<EdgesProps> = React.memo(({ edges, nodes, containerPosition, scale, translate }) => {
  const [renderedEdges, setRenderedEdges] = useState<JSX.Element[]>([]);
  const { deleteEdge } = useFlowContext();

  const edgesArray = useMemo(() => Object.values(edges), [edges]);

  useEffect(() => {
    if (!containerPosition) return;

    const renderEdges = () => {
      const newRenderedEdges: JSX.Element[] = edgesArray
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

          return (
            <Edge
              key={`edge-${edge.id}`}
              fromX={sourcePosition.x}
              fromY={sourcePosition.y}
              scale={scale}
              toX={targetPosition.x}
              toY={targetPosition.y}
            />
          );
        })
        .filter((edge): edge is JSX.Element => edge !== null);

      setRenderedEdges(newRenderedEdges);
    };

    // Initial render
    renderEdges();

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver(renderEdges);

    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, [edgesArray, nodes, containerPosition, scale, translate, deleteEdge]);

  return <>{renderedEdges}</>;
});

Edges.displayName = 'Edges';
