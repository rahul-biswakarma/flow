import { Flex, IconButton, Tooltip } from '@radix-ui/themes';
import { IconPlus } from '@tabler/icons-react';
import { ReactNode } from 'react';

import { LeftPanelProjectView } from '@/libs/types';

type TopSectionHeaderProps = {
  label: string;
  onClick?: () => void;
  view: LeftPanelProjectView;
  trigger?: ReactNode;
};

export const ProjectPanelHeader = ({ label, onClick, trigger }: TopSectionHeaderProps) => (
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
      {trigger ? (
        trigger
      ) : (
        <IconButton color="gray" variant="ghost" onClick={onClick}>
          <IconPlus
            size="18px"
            style={{
              color: 'var(--gray-9)',
            }}
          />
        </IconButton>
      )}
    </Tooltip>
  </Flex>
);
