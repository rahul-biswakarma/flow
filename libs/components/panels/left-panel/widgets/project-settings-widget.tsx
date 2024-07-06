import { Flex, Text } from '@radix-ui/themes';

import { useProjectContext } from '@/libs/context';
import { ViewToggler } from '@/libs/components/ui/view-toggler';

export const ProjectSettingsWidget = () => {
  const { viewMode, setViewMode } = useProjectContext();

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="1">
        <Text
          size="2"
          style={{
            color: 'var(--gray-9)',
          }}
        >
          View mode
        </Text>
        <ViewToggler setViewMode={setViewMode} viewMode={viewMode} />
      </Flex>
    </Flex>
  );
};
