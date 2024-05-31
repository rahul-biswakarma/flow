'use client';

import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { Button } from '../../../../ui/button';

import { ListPageItem } from './list-page-item';
import { CreatePage } from './create-page';

import { IconSize, IconStrokeWidth } from '@/lib/constants/ui';
import { useProjectContext } from '@/lib/context';

export const PagesContainer = () => {
  const { project, currentPageId, setCurrentPageId } = useProjectContext();

  const [isCreatePageEnable, setIsCreatePageEnable] = useState(false);

  const pages = project?.pages;

  const Header = () => (
    <div className="flex w-full items-center justify-between">
      <span>Pages</span>
      <Button
        aria-label="Add new page"
        size="icon"
        variant="ghost"
        onClick={() => setIsCreatePageEnable(!isCreatePageEnable)}
      >
        <IconPlus size={IconSize.MD} strokeWidth={IconStrokeWidth} />
      </Button>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <div className="flex flex-col gap-1">
        {pages?.map((page) => (
          <ListPageItem
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
