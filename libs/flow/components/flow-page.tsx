'use client';

import { Box, Text } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';

import { DragDropItemType } from '../constant';
import { ConnectionType, DropItemType, EdgeType, NodeType } from '../types';
import { useFlowContext } from '../context/flow.context';

import { NodeRenderer } from './nodes/node-renderer';
import { Connection, Edges } from './edges';

import { useResizeObserver } from '@/libs/hooks';

interface FlowPageProps {
  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;
  edges: EdgeType[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeType[]>>;
  connection: ConnectionType;
  setConnection: React.Dispatch<React.SetStateAction<ConnectionType | null>>;
  watermarks?: string;
  updateNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
  getNodeRendererById: (nodeId: string) => React.FC<{ node: NodeType }> | undefined;
}

export const FlowPage = ({
  nodes,
  edges,
  setNodes,
  connection,
  setConnection,
  watermarks,
  updateNodePosition,
  getNodeRendererById,
}: FlowPageProps) => {
  const { updateContainerPosition, dropRef } = useFlowContext();

  const containerRect = useResizeObserver(dropRef);

  useEffect(() => {
    if (containerRect) {
      updateContainerPosition(containerRect.left, containerRect.top);
    }
  }, [containerRect, updateContainerPosition]);

  const handleDrop = (item: DropItemType, monitor: DropTargetMonitor) => {
    const clientOffset = monitor.getClientOffset();
    const dropTargetRect = dropRef.current?.getBoundingClientRect();

    if (clientOffset) {
      const position = {
        x: clientOffset.x - (dropTargetRect?.left ?? 0),
        y: clientOffset.y - (dropTargetRect?.top ?? 0),
      };

      const newNodeId = nanoid();
      const newNodeData = {
        id: newNodeId,
        type: item.type,
        name: item.name,
        position,
        config: {},
      };

      setNodes((prevNodes) => {
        return {
          ...prevNodes,
          [newNodeId]: newNodeData,
        };
      });
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragDropItemType,
    drop: (item: DropItemType, monitor) => handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(dropRef);

  return (
    <Box
      ref={dropRef}
      style={{
        padding: '40px',
        height: '100vh',
        width: '100%',
        position: 'relative',
        background: isOver ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
      }}
      onMouseUp={() => setConnection(null)}
    >
      <Text
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          userSelect: 'none',
          top: '20px',
          left: '20px',
          color: 'var(--gray-8)',
          fontSize: '14px',
        }}
      >
        {watermarks}
      </Text>
      {Object.values(nodes).map((node) => (
        <NodeRenderer
          key={node.id}
          getNodeRendererById={getNodeRendererById}
          node={node}
          updateNodePosition={updateNodePosition}
        />
      ))}
      <Connection connection={connection} />
      <Edges edges={edges} />
    </Box>
  );
};
