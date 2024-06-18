import { ArchiveIcon, Component1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Flex, IconButton } from '@radix-ui/themes';

import { LeftPanelTopSectionView } from '../type';

type TopSectionHeaderProps = {
  label: string;
  onClick: () => void;
  view: LeftPanelTopSectionView;
};

export const TopSectionHeader = ({ label, view, onClick }: TopSectionHeaderProps) => (
  <Flex align="center" gap="2" justify="between" p="2">
    <Flex
      align="center"
      gap="1"
      style={{
        color: 'var(--gray-11)',
      }}
    >
      {view === 'pages' ? <ArchiveIcon /> : <Component1Icon />}
      {label}
    </Flex>
    <IconButton aria-label="Add new page" color="gray" variant="ghost" onClick={onClick}>
      <PlusIcon />
    </IconButton>
  </Flex>
);
