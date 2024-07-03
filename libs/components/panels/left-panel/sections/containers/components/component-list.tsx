import { useState } from 'react';
import { Flex } from '@radix-ui/themes';

import { TopSectionHeader } from '../../header';

import { ComponentListItem } from './component-list-item';

import { webNodeTypes } from '@/libs/types';

export const ComponentList = () => {
  const [isCreateComponentEnable, setIsCreateComponentEnable] = useState(false);

  return (
    <>
      <TopSectionHeader
        label="Components"
        view="components"
        onClick={() => setIsCreateComponentEnable(!isCreateComponentEnable)}
      />
      <Flex direction="column">
        {webNodeTypes.map((node) => node.visibility === 'public' && <ComponentListItem key={node.name} node={node} />)}
      </Flex>
    </>
  );
};
