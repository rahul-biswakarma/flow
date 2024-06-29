import { Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { z } from 'zod';

import styles from '../setting.module.css';

import { PositionRenderer } from './option-renderer/position-renderer';

import { styleSettingSchema } from '@/lib/framework/schemas';

type StyleSettingType = z.infer<typeof styleSettingSchema>;

export const StyleSetting = ({ config }: { config: StyleSettingType }) => {
  return (
    <Accordion.Root collapsible defaultValue="setting" type="single">
      <Accordion.Item value="setting">
        <Accordion.Header>
          <Accordion.Trigger className={styles.settingGroupTrigger}>
            <Text>Styles</Text>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <PositionRenderer value={config?.position} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
