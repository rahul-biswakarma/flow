'use client';

import { Box } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import React, { useRef } from 'react';

import { NodeRenderer } from '../node-renderer';

import { useProjectContext } from '@/lib/context';
import { DragDropItemType } from '@/lib/constants';
import { DropItemType } from '@/lib/types';

export const FlowPage: React.FC = () => {
  const { nodes, setNodes } = useProjectContext();
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDrop = (item: DropItemType, monitor: DropTargetMonitor) => {
    const clientOffset = monitor.getClientOffset();
    const dropTargetRect = dropRef.current?.getBoundingClientRect();

    if (clientOffset) {
      const position = {
        x: clientOffset.x - (dropTargetRect?.left ?? 0),
        y: clientOffset.y - (dropTargetRect?.top ?? 0),
      };

      setNodes((prevNodes) => [...prevNodes, { id: nanoid(), type: item.type, position, config: {} }]);
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
    >
      {nodes.map((node) => (
        <NodeRenderer key={node.id} node={node} />
      ))}
    </Box>
  );
};
