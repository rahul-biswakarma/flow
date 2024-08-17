import { Page, SeoModel } from '@prisma/client';
import { ContextMenu, Flex, Box, Text } from '@radix-ui/themes';
import { IconFile } from '@tabler/icons-react';
import { useState } from 'react';

import { PageForm } from './page-form';

import styles from '@/libs/styles/left-panel.module.css';
import { deletePage } from '@/libs/actions/page';

type PageListItemProps = {
  page: Page & { seo: SeoModel };
  isActive: boolean;
  projectId: string;
  onClickHandler: () => void;
};

export const PageListItem = ({ page, isActive, projectId, onClickHandler }: PageListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pageData = {
    id: page.id,
    name: page.name,
    path: page.path,
    title: page.title ?? '',
    description: page.description ?? '',
    seoTitle: page.seo?.title ?? '',
    seoDescription: page.seo?.description ?? '',
    seoImage: page.seo?.image ?? '',
  };

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div
            style={{
              cursor: 'pointer',
            }}
          >
            <Box
              style={{
                background: isActive ? 'var(--gray-a4)' : 'transparent',
              }}
            >
              <Flex
                align="center"
                className={styles.pageListItem}
                data-active={isActive}
                gap="1"
                onClick={onClickHandler}
              >
                <IconFile size="20px" />
                <Text>{page.name}</Text>
              </Flex>
            </Box>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content
          style={{
            width: '150px',
          }}
          variant="soft"
        >
          <ContextMenu.Item color="gray" onClick={() => setIsOpen(true)}>
            Edit
          </ContextMenu.Item>
          <ContextMenu.Item
            color="red"
            onClick={() => {
              deletePage(page.id);
            }}
          >
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <PageForm initialData={pageData} isOpen={isOpen} projectId={projectId} setIsOpen={setIsOpen} />
    </>
  );
};
