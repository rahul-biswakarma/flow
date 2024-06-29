import { Flex } from '@radix-ui/themes';

import { StyleSetting } from './style-setting/style-setting';

import { useProjectContext } from '@/lib/context';

export const SettingsRightPanel = ({ nodeId }: { nodeId: string }) => {
  const { nodes } = useProjectContext();
  const nodeData = nodes[nodeId];
  const nodeConfig = nodeData?.config;
  let parsedNodeConfig: any = {};

  try {
    parsedNodeConfig = JSON.parse(nodeConfig);
  } catch {
    parsedNodeConfig = {};
  }

  return (
    <Flex direction="column" gap="2">
      <StyleSetting config={parsedNodeConfig.styles ?? {}} />
    </Flex>
  );
};
