import { PlusIcon } from '@radix-ui/react-icons';
import { Flex, Button, Text } from '@radix-ui/themes';

import { ProjectSections } from './type';

export const CreateProjectButton = ({ changeSection }: { changeSection: (view: ProjectSections) => void }) => {
  return (
    <Flex align="center" direction="column" gap="1">
      <Button
        style={{
          width: '100%',
        }}
        onClick={() => changeSection('creation')}
      >
        <PlusIcon />
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
