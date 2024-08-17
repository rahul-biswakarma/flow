'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';

import { NodeType, EdgeType, ConnectionType } from '../types';

type FlowContextType = {
  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;
  edges: Record<string, EdgeType>;
  setEdges: React.Dispatch<React.SetStateAction<Record<string, EdgeType>>>;
  connection: ConnectionType | null;
  setConnection: React.Dispatch<React.SetStateAction<ConnectionType | null>>;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  addEdge: (edge: EdgeType) => void;
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
  const [nodes, setNodes] = useState<Record<string, NodeType>>(initialNodes || {});
  const [edges, setEdges] = useState<Record<string, EdgeType>>(initialEdges || {});
  const [connection, setConnection] = useState<ConnectionType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setNodes((prevNodes) => ({
      ...prevNodes,
      [nodeId]: {
        ...prevNodes[nodeId],
        position,
      },
    }));
  }, []);

  const addEdge = useCallback((edge: EdgeType) => {
    setEdges((prevEdges) => ({
      ...prevEdges,
      [edge.id]: edge,
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
