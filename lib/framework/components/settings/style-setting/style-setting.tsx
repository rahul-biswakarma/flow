import { ChevronDownIcon, Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

import styles from '../setting.module.css';

import EnumRenderer from './option-renderer/enum-renderer';
import {
  AlignItemsOptionType,
  DisplayOptionType,
  FlexDirectionOptionType,
  JustifyContentOptionType,
  PositionOptionType,
  TextAlignOptionType,
} from './types';

import { StyleSettingType } from '@/lib/framework/node.type';
import { styleSettingSchema } from '@/lib/framework/schemas/setting.schema';

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
        <Accordion.Header style={{ margin: 0 }}>
          <Accordion.Trigger className={styles.settingGroupTrigger}>
            <Text>Styles</Text>
            <ChevronDownIcon className={styles.settingGroupTriggerIcon} />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content style={{ padding: '0 24px' }}>
          <EnumRenderer<PositionOptionType>
            label="Position"
            schema={styleSettingSchema.shape.position}
            value={config?.position}
            onChange={(value) => {
              updateStyleConfig({ ...config, position: value });
            }}
          />
          <EnumRenderer<DisplayOptionType>
            label="Display"
            schema={styleSettingSchema.shape.display}
            value={config?.display}
            onChange={(value) => {
              updateStyleConfig({ ...config, display: value });
            }}
          />
          <EnumRenderer<TextAlignOptionType>
            label="Text Align"
            schema={styleSettingSchema.shape.textAlign}
            value={config?.textAlign}
            onChange={(value) => {
              updateStyleConfig({ ...config, textAlign: value });
            }}
          />
          <EnumRenderer<FlexDirectionOptionType>
            label="Flex Direction"
            schema={styleSettingSchema.shape.flexDirection}
            value={config?.flexDirection}
            onChange={(value) => {
              updateStyleConfig({ ...config, flexDirection: value });
            }}
          />
          <EnumRenderer<JustifyContentOptionType>
            label="Justify Content"
            schema={styleSettingSchema.shape.justifyContent}
            value={config?.justifyContent}
            onChange={(value) => {
              updateStyleConfig({ ...config, justifyContent: value });
            }}
          />
          <EnumRenderer<AlignItemsOptionType>
            label="Align Items"
            schema={styleSettingSchema.shape.alignItems}
            value={config?.alignItems}
            onChange={(value) => {
              updateStyleConfig({ ...config, alignItems: value });
            }}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
