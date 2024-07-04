import { Flex, IconButton, Tooltip } from '@radix-ui/themes';
import { IconPlus } from '@tabler/icons-react';

import { LeftPanelTopSectionView } from '@/libs/types';

type TopSectionHeaderProps = {
  label: string;
  onClick: () => void;
  view: LeftPanelTopSectionView;
};

export const TopSectionHeader = ({ label, onClick }: TopSectionHeaderProps) => (
  <Flex align="center" gap="2" justify="between" p="2">
    <Flex
      align="center"
      gap="1"
      style={{
        color: 'var(--gray-9)',
      }}
    >
      {label}
    </Flex>
    <Tooltip content={`Create new ${label}`}>
      <IconButton aria-label="Add new page" color="gray" variant="ghost" onClick={onClick}>
        <IconPlus
          size="18px"
          style={{
            color: 'var(--gray-9)',
          }}
        />
      </IconButton>
    </Tooltip>
  </Flex>
);
