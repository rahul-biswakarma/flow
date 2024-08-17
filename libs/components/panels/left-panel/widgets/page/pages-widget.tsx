'use client';

import { Flex, ScrollArea, IconButton } from '@radix-ui/themes';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { ProjectPanelHeader } from '../../common/project-panel-header';

import { PageForm } from './page-form';
import { PageListItem } from './page-list-item';

import { useProjectContext } from '@/libs/context';

export const PagesWidget = () => {
  const { project, currentPageId, setCurrentPageId } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);

  const pages = project?.pages;

  return (
    <>
      <ProjectPanelHeader
        label="Pages"
        trigger={
          <IconButton color="gray" variant="ghost" onClick={() => setIsOpen(true)}>
            <IconPlus size="18px" style={{ color: 'var(--gray-9)' }} />
          </IconButton>
        }
        view="pages"
      />
      <PageForm isOpen={isOpen} projectId={project.id} setIsOpen={setIsOpen} />
      <ScrollArea>
        <Flex direction="column">
          {pages?.map((page) => (
            <PageListItem
              key={page.id}
              isActive={currentPageId === page.id}
              page={page}
              projectId={project.id}
              onClickHandler={() => setCurrentPageId(page.id)}
            />
          ))}
        </Flex>
      </ScrollArea>
    </>
  );
};
