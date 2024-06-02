import { useState } from 'react';

import { TopSectionHeader } from '../../header';

import { webNodeTypes } from '@/lib/framework';

export const ComponentList = () => {
  const [isCreateComponentEnable, setIsCreateComponentEnable] = useState(false);

  return (
    <div>
      <TopSectionHeader label="Components" onClick={() => setIsCreateComponentEnable(!isCreateComponentEnable)} />
      <div className="flex flex-col gap-2">
        {webNodeTypes.map((node) => (
          <div
            key={node.id}
            draggable
            className="dndnode w-full cursor-pointer rounded-md bg-slate-800 px-2 py-1"
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', node.id);
            }}
          >
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
};
