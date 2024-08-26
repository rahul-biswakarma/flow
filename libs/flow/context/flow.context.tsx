'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';

import { NodeType, EdgeType, ConnectionType, NodeHandlerType } from '../types';
import { generateEdgeId } from '../utils';

type FlowContextType = {
  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;
  deleteNode: (nodeId: string) => void;
  edges: Record<string, EdgeType>;
  setEdges: React.Dispatch<React.SetStateAction<Record<string, EdgeType>>>;
  connection: ConnectionType | null;
  setConnection: React.Dispatch<React.SetStateAction<ConnectionType | null>>;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  addEdge: (from: NodeHandlerType, to: NodeHandlerType) => void;
  removeEdge: (edgeId: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

const FlowContext = createContext<FlowContextType | null>(null);

type FlowContextProviderProps = {
  children: React.ReactNode;
  edges?: Record<string, EdgeType>;
  nodes?: Record<string, NodeType>;
};

export const FlowContextProvider: React.FC<FlowContextProviderProps> = ({
  children,
  edges: initialEdges,
  nodes: initialNodes,
}) => {
  const [nodes, setNodes] = useState<Record<string, NodeType>>({});
  const [edges, setEdges] = useState<Record<string, EdgeType>>({});
  const [connection, setConnection] = useState<ConnectionType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNodes(initialNodes || {});
    setEdges(initialEdges || {});
  }, [initialNodes, initialEdges]);

  const deleteNode = (nodeId: string) => {
    setNodes((prevNodes) => {
      const newNodes = { ...prevNodes };

      delete newNodes[nodeId];

      return newNodes;
    });
  };

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setNodes((prevNodes) => ({
      ...prevNodes,
      [nodeId]: {
        ...prevNodes[nodeId],
        position,
      },
    }));
  }, []);

  const addEdge = useCallback((from: NodeHandlerType, to: NodeHandlerType) => {
    const newEdgeId = generateEdgeId(from, to);

    setEdges((prevEdges) => ({
      ...prevEdges,
      [newEdgeId]: {
        id: newEdgeId,
        source: from,
        target: to,
      },
    }));
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges((prevEdges) => {
      const newEdges = { ...prevEdges };

      delete newEdges[edgeId];

      return newEdges;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      nodes,
      setNodes,
      edges,
      deleteNode,
      setEdges,
      connection,
      setConnection,
      updateNodePosition,
      addEdge,
      removeEdge,
      containerRef,
    }),
    [nodes, edges, connection, updateNodePosition, addEdge, removeEdge],
  );

  return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};

export const useFlowContext = () => {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error('useFlowContext must be used within a FlowContextProvider');
  }

  return context;
};
