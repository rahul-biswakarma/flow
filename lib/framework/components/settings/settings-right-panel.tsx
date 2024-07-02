import { ChevronDownIcon, Flex, Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

import { StyleSettingType } from '../../types';

import { StyleSetting } from './style-setting/style-setting';
import { AttributeFields } from './attribute-fields';

import { useProjectContext } from '@/lib/context';
import styles from '@/lib/styles/setting.module.css';

const AccordionHeader = ({ label }: { label: string }) => {
  return (
    <Accordion.Header style={{ margin: 0 }}>
      <Accordion.Trigger className={styles.settingGroupTrigger}>
        <Text>{label}</Text>
        <ChevronDownIcon className={styles.settingGroupTriggerIcon} />
      </Accordion.Trigger>
    </Accordion.Header>
  );
};

export const SettingsRightPanel = ({ nodeId }: { nodeId: string }) => {
  const { nodes, setNodes } = useProjectContext();
  const nodeData = nodes[nodeId];
  const nodeConfig = nodeData?.config;

  const getAttributeValue = (attrName: string) => {
    return nodeConfig?.attributes?.[attrName];
  };

  const updateStyleConfig = (newConfig: StyleSettingType) => {
    setNodes((prev) => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        config: {
          ...(prev[nodeId]?.config ?? {}),
          styles: newConfig,
        },
      },
    }));
  };

  const updateAttributeConfig = (attrName: string, value: any) => {
    setNodes((prev) => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        config: {
          ...(prev[nodeId]?.config ?? {}),
          attributes: {
            ...(prev[nodeId]?.config?.attributes ?? {}),
            [attrName]: value,
          },
        },
      },
    }));
  };

  return (
    <Flex direction="column" gap="3">
      <Accordion.Root collapsible type="single">
        <Accordion.Item value="attributes">
          <AccordionHeader label="Attributes" />
          <Accordion.Content className={styles.settingFieldContainer} style={{ padding: '0 24px' }}>
            <AttributeFields
              getAttributeValue={getAttributeValue}
              updateAttributeConfig={updateAttributeConfig}
              webNodeType={nodeData.type}
            />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="style">
          <AccordionHeader label="Style" />
          <Accordion.Content className={styles.settingFieldContainer} style={{ padding: '0 24px' }}>
            <StyleSetting config={nodeConfig?.styles ?? {}} updateStyleConfig={updateStyleConfig} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Flex>
  );
};
