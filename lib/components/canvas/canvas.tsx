'use client';

import '@xyflow/react/dist/style.css';

import { FC, useCallback, useRef, useState } from 'react';
import { Connection, Node, ReactFlow, ReactFlowInstance, addEdge } from '@xyflow/react';
import { nanoid } from 'nanoid';

import { webNodeTypes } from '@/lib/framework';
import { useProjectContext } from '@/lib/context';

const proOptions = { hideAttribution: true };

const nodeTypes: Record<string, FC<any>> = {};

webNodeTypes.map((node) => (nodeTypes[node.id] = node.renderer));

export const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useProjectContext();
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
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
    },
    [reactFlowInstance],
  );

  return (
    <div ref={reactFlowWrapper} className="h-full w-full">
      <ReactFlow
        fitView
        nodesDraggable
        edges={edges}
        nodeTypes={nodeTypes}
        nodes={nodes}
        proOptions={proOptions}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
      />
    </div>
  );
};
