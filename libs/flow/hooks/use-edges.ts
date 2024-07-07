import { useCallback } from 'react';

import { useFlowContext } from '../context/flow.context';

export const useEdges = () => {
  const { nodes, edges, setEdges } = useFlowContext();

  const calculateEdgePositions = useCallback(() => {
    setEdges((prevEdges) => {
      return prevEdges.map((edge) => {
        const sourceNode = nodes[edge.source.nodeId];
        const targetNode = nodes[edge.target.nodeId];

        if (sourceNode && targetNode) {
          return {
            ...edge,
            sourceX: sourceNode.position?.x ?? 0,
            sourceY: sourceNode.position?.y ?? 0,
            targetX: targetNode.position?.x ?? 0,
            targetY: targetNode.position?.y ?? 0,
          };
        }

        return edge;
      });
    });
  }, [nodes, setEdges]);

  return { calculateEdgePositions };
};
