import { Page } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { IconFile } from '@tabler/icons-react';

import styles from '@/libs/styles/left-panel.module.css';

type PageListItemProps = {
  page: Page;
  isActive: boolean;
  onClickHandler: () => void;
};

export const PageListItem = ({ page, isActive, onClickHandler }: PageListItemProps) => {
  return (
    <Flex align="center" className={styles.pageListItem} data-active={isActive} gap="1" onClick={onClickHandler}>
      <IconFile size="18px" />
      {page.name}
    </Flex>
  );
};
