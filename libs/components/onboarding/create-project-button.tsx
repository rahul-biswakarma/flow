import { Flex, Button, Text } from '@radix-ui/themes';
import { IconPlus } from '@tabler/icons-react';

import { ProjectSections } from '@/libs/types';

export const CreateProjectButton = ({ changeSection }: { changeSection: (view: ProjectSections) => void }) => {
  return (
    <Flex align="center" direction="column" gap="1">
      <Button
        style={{
          width: '100%',
        }}
        onClick={() => changeSection('creation')}
      >
        <IconPlus size="16px" />
        <Text>Create Project</Text>
      </Button>
      <Text
        size="1"
        style={{
          color: 'var(--gray-10)',
        }}
      >
        Create your own workspace and invite others to collaborate
      </Text>
    </Flex>
  );
};
