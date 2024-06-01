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
          <div key={node.id} className="w-full cursor-pointer rounded-md bg-slate-800 px-2 py-1">
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
};
