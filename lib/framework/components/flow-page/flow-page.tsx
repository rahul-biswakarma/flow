'use client';

import { Box } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

import { ContainerNode } from '../web-nodes';

import { useProjectContext } from '@/lib/context';
import { AcceptedDropItem } from '@/lib/constants';

export const FlowPage: React.FC = () => {
  const { nodes, setNodes, edges, setEdges } = useProjectContext();
  const handleDrop = (item: unknown, monitor: DropTargetMonitor<unknown, unknown>) => {
    const clientOffset = monitor.getClientOffset();
    const position = {
      x: clientOffset?.x ?? 0,
      y: clientOffset?.y ?? 0,
    };

    setNodes((prevNodes) => [...prevNodes, { id: nanoid(), type: item?.type, position, config: {} }]);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: AcceptedDropItem,
    drop: (item, monitor) => handleDrop(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      style={{
        padding: '40px',
        height: '100vh',
        width: '100%',
      }}
    >
      <ContainerNode />
    </Box>
  );
};
