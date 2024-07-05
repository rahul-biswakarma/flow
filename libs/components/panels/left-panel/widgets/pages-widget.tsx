'use client';

import { Flex, Text, ScrollArea, TextField, Box } from '@radix-ui/themes';
import { Page } from '@prisma/client';
import { IconFile } from '@tabler/icons-react';
import { useRef, useState } from 'react';

import { ProjectPanelHeader } from '../common/project-panel-header';

import { useOnClickOutside } from '@/libs/hooks';
// eslint-disable-next-line import/order
import { createPage } from '@/libs/actions/page';

type CreatePageType = {
  projectId: string;
  onReset: () => void;
  isCreateEnable: boolean;
};

import styles from '@/libs/styles/left-panel.module.css';
import { useProjectContext } from '@/libs/context';

type PageListItemProps = {
  page: Page;
  isActive: boolean;
  onClickHandler: () => void;
};

export const PagesWidget = () => {
  const { project, currentPageId, setCurrentPageId } = useProjectContext();

  const [isCreatePageEnable, setIsCreatePageEnable] = useState(false);

  const pages = project?.pages;

  return (
    <>
      <ProjectPanelHeader label="Pages" view="pages" onClick={() => setIsCreatePageEnable(!isCreatePageEnable)} />
      <ScrollArea>
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
      </ScrollArea>
    </>
  );
};

export const PageListItem = ({ page, isActive, onClickHandler }: PageListItemProps) => {
  return (
    <Box
      style={{
        background: isActive ? 'var(--gray-a4)' : 'transparent',
      }}
    >
      <Flex align="center" className={styles.pageListItem} data-active={isActive} gap="1" onClick={onClickHandler}>
        <IconFile size="20px" />
        <Text>{page.name}</Text>
      </Flex>
    </Box>
  );
};

export const CreatePage = ({ isCreateEnable, onReset, projectId }: CreatePageType) => {
  const [newPageName, setNewPageName] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setNewPageName('');
    onReset();
  };

  useOnClickOutside([inputRef], reset);

  if (!isCreateEnable) {
    return null;
  }

  return (
    <TextField.Root
      ref={inputRef}
      autoFocus
      name="page-name"
      placeholder="Page Name"
      type="text"
      value={newPageName}
      onChange={(e) => setNewPageName(e.target.value)}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await createPage(newPageName, projectId);
          setNewPageName('');
          onReset();
        }
      }}
    />
  );
};
