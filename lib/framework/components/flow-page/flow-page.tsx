'use client';

import { Box, Text } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef } from 'react';

import { NodeRenderer } from '../node-renderer';

import { TemporaryEdge } from './temporary-edge';
import { Edges } from './edges';

import { useContainerPosition, useProjectContext } from '@/lib/context';
import { DragDropItemType } from '@/lib/constants';
import { DropItemType } from '@/lib/types';
import { useResizeObserver } from '@/lib/hooks';

export const FlowPage: React.FC = () => {
  const { nodes, setNodes, setConnection, currentPage } = useProjectContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const { updateContainerPosition } = useContainerPosition();
  const containerRect = useResizeObserver(containerRef);
  const containerWidth = containerRef.current?.clientWidth ?? 0;

  useEffect(() => {
    if (containerRect) {
      updateContainerPosition(containerRect.left, containerRect.top);
    }
  }, [containerRect, updateContainerPosition]);

  if (nodes && Object.keys(nodes).length === 0) {
    const nodeId = nanoid();

    setNodes({
      [nodeId]: {
        id: nodeId,
        type: 'system-container-node',
        name: 'Container',
        position: { x: containerWidth ? containerWidth / 2 - 100 : 100, y: 100 },
        config: {},
      },
    });
  }

  const handleDrop = (item: DropItemType, monitor: DropTargetMonitor) => {
    const clientOffset = monitor.getClientOffset();
    const dropTargetRect = containerRef.current?.getBoundingClientRect();

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

  drop(containerRef);

  return (
    <Box
      ref={containerRef}
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
        {currentPage?.name}.tsx
      </Text>
      {Object.values(nodes).map((node) => (
        <NodeRenderer key={node.id} node={node} />
      ))}
      <TemporaryEdge />
      <Edges />
    </Box>
  );
};
