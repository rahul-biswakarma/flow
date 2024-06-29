import { Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

import styles from '../setting.module.css';

import { PositionRenderer } from './option-renderer/position-renderer';

import { StyleSettingType } from '@/lib/framework/node.type';

export const StyleSetting = ({
  config,
  updateStyleConfig,
}: {
  config: StyleSettingType;
  updateStyleConfig: (newConfig: StyleSettingType) => void;
}) => {
  return (
    <Accordion.Root collapsible defaultValue="setting" type="single">
      <Accordion.Item value="setting">
        <Accordion.Header>
          <Accordion.Trigger className={styles.settingGroupTrigger}>
            <Text>Styles</Text>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <PositionRenderer
            value={config?.position}
            onChange={(value) => {
              updateStyleConfig({
                ...config,
                position: value,
              });
            }}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
