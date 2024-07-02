'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

import { NodeType, EdgeType, ConnectionType, NodeHandlerType } from '../types';
import { generateEdgeId } from '../utils';

interface ContainerPosition {
  left: number;
  top: number;
}

interface FlowContextType {
  dragRef: React.RefObject<HTMLDivElement>;
  dropRef: React.RefObject<HTMLDivElement>;

  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;

  edges: EdgeType[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeType[]>>;

  connection: ConnectionType | null;
  setConnection: React.Dispatch<React.SetStateAction<ConnectionType | null>>;

  deleteNode: (nodeId: string) => void;
  createEdge: (from: NodeHandlerType, to: NodeHandlerType) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;

  containerPosition: ContainerPosition | null;
  updateContainerPosition: (left: number, top: number) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Record<string, NodeType>>({});
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [connection, setConnection] = useState<ConnectionType | null>(null);

  const dragRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const [containerPosition, setContainerPosition] = useState<ContainerPosition | null>(null);

  const updateContainerPosition = useCallback((left: number, top: number) => {
    setContainerPosition({ left, top });
  }, []);

  const createEdge = useCallback(
    (from: NodeHandlerType, to: NodeHandlerType) => {
      setEdges((prevEdges) => {
        return [
          ...prevEdges,
          {
            id: `${generateEdgeId(from)}-${generateEdgeId(to)}`,
            source: from,
            target: to,
          },
        ];
      });
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

      setEdges((prevEdges) => {
        return prevEdges.map((edge) => {
          if (edge.source.nodeId === nodeId || edge.target.nodeId === nodeId) {
            return {
              ...edge,
              source: edge.source.nodeId === nodeId ? { ...edge.source, position } : edge.source,
              target: edge.target.nodeId === nodeId ? { ...edge.target, position } : edge.target,
            };
          }

          return edge;
        });
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

      setEdges((prevEdges) => {
        return prevEdges.filter((edge) => edge.source.nodeId !== nodeId && edge.target.nodeId !== nodeId);
      });
    },
    [setNodes, setEdges],
  );

  return (
    <FlowContext.Provider
      value={{
        dragRef,
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
