'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

import { NodeType, EdgeType, ConnectionType, NodeHandlerType } from '../types';
import { generateEdgeId, getAffectedEdges } from '../utils';

interface ContainerPosition {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface FlowContextType {
  dropRef: React.RefObject<HTMLDivElement>;

  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;

  edges: Record<string, EdgeType>;
  setEdges: React.Dispatch<React.SetStateAction<Record<string, EdgeType>>>;

  connection: ConnectionType | null;
  setConnection: React.Dispatch<React.SetStateAction<ConnectionType | null>>;

  deleteNode: (nodeId: string) => void;
  createEdge: (from: NodeHandlerType, to: NodeHandlerType) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;

  containerPosition: ContainerPosition | null;
  updateContainerPosition: (left: number, top: number, right: number, bottom: number) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowContextProvider: React.FC<{
  children: React.ReactNode;
  nodes?: Record<string, NodeType>;
  edges?: Record<string, EdgeType>;
}> = ({ children, nodes: initialNodes, edges: initialEdges }) => {
  const [nodes, setNodes] = useState<Record<string, NodeType>>(initialNodes ?? {});
  const [edges, setEdges] = useState<Record<string, EdgeType>>(initialEdges ?? {});
  const [connection, setConnection] = useState<ConnectionType | null>(null);

  const dropRef = useRef<HTMLDivElement>(null);

  const [containerPosition, setContainerPosition] = useState<ContainerPosition | null>(null);

  const updateContainerPosition = useCallback((left: number, top: number, right: number, bottom: number) => {
    setContainerPosition({ left, top, right, bottom });
  }, []);

  const createEdge = useCallback(
    (from: NodeHandlerType, to: NodeHandlerType) => {
      const newEdgeId = generateEdgeId(from, to);

      setEdges((prevEdges) => ({
        ...prevEdges,
        [newEdgeId]: {
          id: newEdgeId,
          source: from,
          target: to,
        },
      }));
    },
    [setEdges],
  );

  const updateNodePosition = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      setNodes((prevNodes) => ({
        ...prevNodes,
        [nodeId]: {
          ...prevNodes[nodeId],
          position,
        },
      }));

      const affectedEdges = getAffectedEdges(edges, nodeId);

      affectedEdges.forEach((edgeId) => {
        if (edgeId) {
          const currentEdge = edges[edgeId];

          setEdges((prevEdges) => {
            return {
              ...prevEdges,
              [edgeId]: {
                ...currentEdge,
                source: currentEdge.source.nodeId === nodeId ? { ...currentEdge.source, position } : currentEdge.source,
                target: currentEdge.target.nodeId === nodeId ? { ...currentEdge.target, position } : currentEdge.target,
              },
            };
          });
        }
      });
    },
    [setNodes, setEdges],
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => {
        const newNodes = { ...prevNodes };

        delete newNodes[nodeId];

        return newNodes;
      });

      const affectedEdges = getAffectedEdges(edges, nodeId);

      affectedEdges.forEach((edgeId) => {
        if (edgeId) {
          setEdges((prevEdges) => {
            const newEdges = { ...prevEdges };

            delete newEdges[edgeId];

            return newEdges;
          });
        }
      });
    },
    [setNodes, setEdges],
  );

  return (
    <FlowContext.Provider
      value={{
        dropRef,
        nodes,
        setNodes,
        edges,
        setEdges,
        deleteNode,
        connection,
        setConnection,
        createEdge,
        updateNodePosition,
        containerPosition,
        updateContainerPosition,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlowContext = (): FlowContextType => {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error('useFlowContext must be used within a FlowContextProvider');
  }

  return context;
};
