import { Page } from '@prisma/client';
import clsx from 'clsx';

type ListPageItemProps = {
  page: Page;
  isActive: boolean;
  onClickHandler: () => void;
};

export const ListPageItem = ({ page, isActive, onClickHandler }: ListPageItemProps) => {
  return (
    <div className={clsx('cursor-pointer rounded-md p-1', { 'bg-slate-800': isActive })} onClick={onClickHandler}>
      {page.name}
    </div>
  );
};
