import { Flex, RadioCards, Text } from '@radix-ui/themes';

import { RadioCardItemWrapper } from '../common/radio-card-wrapper';
import styles from '../styles/project-config-widget.module.css';

import { PreviewType, usePreviewContext } from '@/libs/context';

export const ProjectSettingsWidget = () => {
  const { previewPanelType, togglePreviewPanel } = usePreviewContext();

  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="2">
        <Text className={styles.sectionTitle}>View Mode</Text>
        <RadioCards.Root
          color="gray"
          columns="3"
          defaultValue={previewPanelType}
          gap="2"
          onValueChange={(value) => togglePreviewPanel(value as PreviewType)}
        >
          <RadioCardItemWrapper value="hide">
            <Text size="1">Hide</Text>
          </RadioCardItemWrapper>
          <RadioCardItemWrapper value="same_tab">
            <Text size="1">Same Tab</Text>
          </RadioCardItemWrapper>
          <RadioCardItemWrapper value="new_tab">
            <Text size="1">New Tab</Text>
          </RadioCardItemWrapper>
        </RadioCards.Root>
      </Flex>
    </Flex>
  );
};
