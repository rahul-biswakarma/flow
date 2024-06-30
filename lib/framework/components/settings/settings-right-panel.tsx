import { Flex } from '@radix-ui/themes';

import { StyleSettingType } from '../../node.type';

import { StyleSetting } from './style-setting/style-setting';

import { useProjectContext } from '@/lib/context';

export const SettingsRightPanel = ({ nodeId }: { nodeId: string }) => {
  const { nodes, setNodes } = useProjectContext();
  const nodeData = nodes[nodeId];
  const nodeConfig = nodeData?.config;

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

  return (
    <Flex direction="column" gap="3">
      <StyleSetting config={nodeConfig?.styles ?? {}} updateStyleConfig={updateStyleConfig} />
    </Flex>
  );
};
