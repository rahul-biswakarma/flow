'use client';

import { Box } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import React, { ReactNode, useEffect } from 'react';

import { DragDropItemType } from '../constant';
import { DropItemType, NodeType } from '../types';
import { useFlowContext } from '../context/flow.context';

import { NodeRenderer } from './nodes/node-renderer';
import { Connection, Edges } from './edges';

import { useResizeObserver } from '@/libs/hooks';

interface FlowPageProps {
  watermarks?: ReactNode;
  getNodeRendererByType: (nodeId: string) => React.FC<{ node: NodeType }> | undefined;
}

export const FlowPage = ({ watermarks, getNodeRendererByType }: FlowPageProps) => {
  const { updateContainerPosition, dropRef, nodes, setNodes, edges, connection, setConnection, updateNodePosition } =
    useFlowContext();

  const containerRect = useResizeObserver(dropRef);

  useEffect(() => {
    if (containerRect) {
      updateContainerPosition(containerRect.left, containerRect.top);
    }
  }, [containerRect, updateContainerPosition]);

  if (Object.keys(nodes).length === 0) {
    const mainNodeId = nanoid();
    const containerXCenter = (dropRef.current?.clientWidth ?? 1) / 2;

    setNodes({
      [mainNodeId]: {
        id: mainNodeId,
        type: 'system-main-node',
        name: 'Main',
        position: { x: containerXCenter, y: 100 },
        config: {},
      },
    });
  }

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
      <Box
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          userSelect: 'none',
          bottom: '10px',
          right: '10px',
          color: 'var(--gray-8)',
          fontSize: '12px',
        }}
      >
        {watermarks}
      </Box>
      {Object.values(nodes).map((node) => (
        <NodeRenderer
          key={node.id}
          getNodeRendererById={getNodeRendererByType}
          node={node}
          updateNodePosition={updateNodePosition}
        />
      ))}
      <Connection connection={connection} />
      <Edges edges={edges} />
    </Box>
  );
};
