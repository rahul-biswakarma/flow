import { FC } from 'react';
import { ReactFlow } from '@xyflow/react';

import { webNodeTypes } from '@/lib/framework';

import '@xyflow/react/dist/style.css';

const proOptions = { hideAttribution: true };

const nodeTypes: Record<string, FC<any>> = {};

webNodeTypes.map((node) => (nodeTypes[node.id] = node.renderer));

export const Canvas = () => {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <div className="h-full w-full">
      <ReactFlow
        fitView
        nodesDraggable
        defaultEdges={initialEdges}
        defaultNodes={initialNodes}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
      />
    </div>
  );
};
