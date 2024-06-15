'use client';

import '@xyflow/react/dist/style.css';

import { FC, useCallback, useRef, useState } from 'react';
import { Connection, ReactFlow, ReactFlowInstance, addEdge } from '@xyflow/react';
import { useHotkeys } from 'react-hotkeys-hook';

import { webNodeTypes } from '@/lib/framework';
import { useProjectContext } from '@/lib/context';
import { HotKeys } from '@/lib/utils/hotkeys';
import { useOnSave } from '@/lib/hooks/use-on-save';
import { onDropHandler } from '@/lib/utils/canvas';

const proOptions = { hideAttribution: true };

const nodeTypes: Record<string, FC<any>> = {};

webNodeTypes.map((node) => (nodeTypes[node.id] = node.renderer));

export const Canvas = () => {
  const onSave = useOnSave();
  const reactFlowWrapper = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useProjectContext();

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  useHotkeys(HotKeys.SAVE, onSave, {
    preventDefault: true,
  });

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

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
        onDrop={(e) => onDropHandler({ event: e, setNodes, reactFlowInstance })}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
      />
    </div>
  );
};
