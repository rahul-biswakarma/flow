'use client';

import { useState } from 'react';
import { Flex } from '@radix-ui/themes';

import { TopSectionHeader } from '../../header';

import { PageListItem } from './page-list-item';
import { CreatePage } from './create-page';

import { useProjectContext } from '@/lib/context';

export const ListPage = () => {
  const { project, currentPageId, setCurrentPageId } = useProjectContext();

  const [isCreatePageEnable, setIsCreatePageEnable] = useState(false);

  const pages = project?.pages;

  return (
    <>
      <TopSectionHeader label="Pages" view="pages" onClick={() => setIsCreatePageEnable(!isCreatePageEnable)} />
      <Flex direction="column">
        {pages?.map((page) => (
          <PageListItem
            key={page.id}
            isActive={currentPageId === page.id}
            page={page}
            onClickHandler={() => setCurrentPageId(page.id)}
          />
        ))}
        <CreatePage
          isCreateEnable={isCreatePageEnable}
          projectId={project.id}
          onReset={() => setIsCreatePageEnable(false)}
        />
      </Flex>
    </>
  );
};
