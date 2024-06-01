'use client';

import { useState } from 'react';

import { TopSectionHeader } from '../../header';

import { PageListItem } from './page-list-item';
import { CreatePage } from './create-page';

import { useProjectContext } from '@/lib/context';

export const ListPage = () => {
  const { project, currentPageId, setCurrentPageId } = useProjectContext();

  const [isCreatePageEnable, setIsCreatePageEnable] = useState(false);

  const pages = project?.pages;

  return (
    <div className="flex h-full w-full flex-col">
      <TopSectionHeader label="Pages" onClick={() => setIsCreatePageEnable(!isCreatePageEnable)} />
      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  );
};
