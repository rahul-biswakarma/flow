import { IconPlus } from '@tabler/icons-react';

import { Button } from '../../ui';

import { IconSize, IconStrokeWidth } from '@/lib/constants/ui';

type TopSectionHeaderProps = {
  label: string;
  onClick: () => void;
};

export const TopSectionHeader = ({ label, onClick }: TopSectionHeaderProps) => (
  <div className="flex w-full items-center justify-between">
    <span>{label}</span>
    <Button aria-label="Add new page" size="icon" variant="ghost" onClick={onClick}>
      <IconPlus size={IconSize.MD} strokeWidth={IconStrokeWidth} />
    </Button>
  </div>
);
