import { Page } from '@prisma/client';
import clsx from 'clsx';

type PageListItemProps = {
  page: Page;
  isActive: boolean;
  onClickHandler: () => void;
};

export const PageListItem = ({ page, isActive, onClickHandler }: PageListItemProps) => {
  return (
    <div className={clsx('cursor-pointer rounded-md p-1', { 'bg-slate-800': isActive })} onClick={onClickHandler}>
      {page.name}
    </div>
  );
};
