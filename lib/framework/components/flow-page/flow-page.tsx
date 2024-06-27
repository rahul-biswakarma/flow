'use client';

import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import { RefObject } from 'react';

import { ContainerNode } from '../web-nodes';

import { useProjectContext } from '@/lib/context';
import { DragDropItemType } from '@/lib/constants';

export const FlowPage: React.FC = () => {
  const { nodes, setNodes } = useProjectContext();

  const handleDrop = (item: Record<string, any>, monitor: DropTargetMonitor<unknown, unknown>) => {
    const clientOffset = monitor.getClientOffset();
    const position = {
      x: clientOffset?.x ?? 0,
      y: clientOffset?.y ?? 0,
    };

    setNodes((prevNodes) => [...prevNodes, { id: nanoid(), type: item?.type, name: item?.name, position, config: {} }]);
  };

  const [{ isOver }, drop] = useDrop({
    accept: DragDropItemType,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as unknown as RefObject<HTMLDivElement>}
      role="Dustbin"
      style={{
        padding: '40px',
        height: '100vh',
        width: '100%',
        position: 'relative',
        background: isOver ? 'rgba(0, 0, 0, 0.1)' : 'red',
      }}
    >
      {nodes.map((node) => (
        <ContainerNode
          key={node.id}
          node={node}
          style={{
            position: 'absolute',
            left: node.position.x,
            top: node.position.y,
          }}
        />
      ))}
    </div>
  );
};
