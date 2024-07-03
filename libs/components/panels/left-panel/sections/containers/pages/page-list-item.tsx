import { Page } from '@prisma/client';
import { FileIcon } from '@radix-ui/react-icons';
import { Flex } from '@radix-ui/themes';

import styles from '@/libs/styles/left-panel.module.css';

type PageListItemProps = {
  page: Page;
  isActive: boolean;
  onClickHandler: () => void;
};

export const PageListItem = ({ page, isActive, onClickHandler }: PageListItemProps) => {
  return (
    <Flex align="center" className={styles.pageListItem} data-active={isActive} gap="1" onClick={onClickHandler}>
      <FileIcon />
      {page.name}
    </Flex>
  );
};
