import { Flex, RadioCards, Text } from '@radix-ui/themes';

import { RadioCardItemWrapper } from '../common/radio-card-wrapper';
import styles from '../styles/project-config-widget.module.css';

import { useProjectContext } from '@/libs/context';
import { CanvasViewMode } from '@/libs/types';

export const ProjectSettingsWidget = () => {
  const { viewMode, setViewMode } = useProjectContext();

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>View Mode</Text>
        <RadioCards.Root
          color="gray"
          columns="3"
          defaultValue={viewMode}
          gap="2"
          onValueChange={(value) => setViewMode(value as CanvasViewMode)}
        >
          <RadioCardItemWrapper value="node">
            <Text size="1">Node</Text>
          </RadioCardItemWrapper>
          <RadioCardItemWrapper value="preview">
            <Text size="1">Preview</Text>
          </RadioCardItemWrapper>
          <RadioCardItemWrapper value="both">
            <Text size="1">Both</Text>
          </RadioCardItemWrapper>
        </RadioCards.Root>
      </Flex>
    </Flex>
  );
};
