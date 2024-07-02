import React from 'react';
import { ChevronDownIcon, Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

import {
  AlignItemsOptionType,
  DisplayOptionType,
  FlexDirectionOptionType,
  JustifyContentOptionType,
  PositionOptionType,
  TextAlignOptionType,
} from './types';
import { ColorRenderer, EnumRenderer, StringRenderer, StringWithUnitRenderer } from './option-renderer';

import styles from '@/lib/styles/setting.module.css';
import { styleSettingSchema } from '@/lib/framework/schemas/setting.schema';
import { StyleSettingType } from '@/lib/framework/types';

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
        <Accordion.Content className={styles.settingFieldContainer} style={{ padding: '0 24px' }}>
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
          <ColorRenderer
            label="Background Color"
            value={config?.backgroundColor}
            onChange={(value) => {
              updateStyleConfig({ ...config, backgroundColor: value });
            }}
          />
          <ColorRenderer
            label="Color"
            value={config?.color}
            onChange={(value) => {
              updateStyleConfig({ ...config, color: value });
            }}
          />
          <StringWithUnitRenderer
            label="Font Size"
            value={config?.fontSize}
            onChange={(value) => {
              updateStyleConfig({ ...config, fontSize: value });
            }}
          />
          <StringRenderer
            label="Font Weight"
            value={config?.fontWeight}
            onChange={(value) => {
              updateStyleConfig({ ...config, fontWeight: value });
            }}
          />
          <StringWithUnitRenderer
            label="Width"
            value={config?.width}
            onChange={(value) => {
              updateStyleConfig({ ...config, width: value });
            }}
          />
          <StringWithUnitRenderer
            label="Height"
            value={config?.height}
            onChange={(value) => {
              updateStyleConfig({ ...config, height: value });
            }}
          />
          <StringWithUnitRenderer
            label="Margin"
            value={config?.margin}
            onChange={(value) => {
              updateStyleConfig({ ...config, margin: value });
            }}
          />
          <StringWithUnitRenderer
            label="Padding"
            value={config?.padding}
            onChange={(value) => {
              updateStyleConfig({ ...config, padding: value });
            }}
          />
          <StringWithUnitRenderer
            label="Border"
            value={config?.border}
            onChange={(value) => {
              updateStyleConfig({ ...config, border: value });
            }}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
