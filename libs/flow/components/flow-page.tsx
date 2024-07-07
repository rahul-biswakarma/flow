'use client';

import { Box } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import React, { ReactNode, useEffect, useCallback } from 'react';

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

  const resizeObserverRect = useResizeObserver(dropRef);

  useEffect(() => {
    if (resizeObserverRect) {
      updateContainerPosition(resizeObserverRect.left, resizeObserverRect.top);
    }
  }, [resizeObserverRect, updateContainerPosition]);

  useEffect(() => {
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
  }, [dropRef, setNodes, nodes]);

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

  const updateNodeAndEdgesPosition = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      updateNodePosition(nodeId, position);
    },
    [updateNodePosition],
  );

  const alignNodesInTree = useCallback(() => {
    // Implement logic to align nodes in a tree view
    // This function can use an algorithm like Reingold-Tilford to position nodes
  }, [nodes, setNodes]);

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
      <Connection connection={connection} />
      {Object.values(nodes).map((node) => (
        <NodeRenderer
          key={node.id}
          getNodeRendererById={getNodeRendererByType}
          node={node}
          updateNodePosition={updateNodeAndEdgesPosition}
        />
      ))}
      <Edges containerPosition={resizeObserverRect} edges={edges} nodes={nodes} />
    </Box>
  );
};
