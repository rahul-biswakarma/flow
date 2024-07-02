import { ChevronDownIcon, Flex, Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

import { StyleFields } from './fields/style-fields';
import { AttributeFields } from './fields/attribute-fields';

import { useProjectContext } from '@/libs/context';
import styles from '@/libs/styles/setting.module.css';

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

  const getStyleValue = (styleName: string) => {
    return nodeConfig?.styles?.[styleName];
  };

  const updateStyleConfig = (styleName: string, value: any) => {
    setNodes((prev) => ({
      ...prev,
      [nodeId]: {
        ...prev[nodeId],
        config: {
          ...(prev[nodeId]?.config ?? {}),
          styles: {
            ...(prev[nodeId]?.config?.styles ?? {}),
            [styleName]: value,
          },
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
            <StyleFields getStyleValue={getStyleValue} updateStyleConfig={updateStyleConfig} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </Flex>
  );
};
