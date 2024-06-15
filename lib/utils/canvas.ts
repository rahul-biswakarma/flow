import { ReactFlowInstance, Node } from '@xyflow/react';
import { nanoid } from 'nanoid';

export const onDropHandler = ({
  event,
  setNodes,
  reactFlowInstance,
}: {
  event: React.DragEvent<HTMLDivElement>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  reactFlowInstance: ReactFlowInstance | null;
}) => {
  event.preventDefault();

  if (!reactFlowInstance) {
    return;
  }

  const type = event.dataTransfer.getData('application/reactflow');

  if (!type) {
    return;
  }

  const position = reactFlowInstance.screenToFlowPosition({
    x: event.clientX,
    y: event.clientY,
  });

  const newNode: Node = {
    id: nanoid(),
    type,
    position,
    data: {
      node: { properties: {} },
    },
  };

  setNodes((nds) => nds.concat(newNode));
};
