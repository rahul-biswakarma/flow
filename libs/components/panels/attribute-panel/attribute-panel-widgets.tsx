'use client';

import { Flex } from '@radix-ui/themes';

import { SettingsPanel } from '../settings-panel';

import { FloatWidgetData, AttributeMode } from '@/libs/context';

export const AttributeContent = ({ data, mode }: { data: FloatWidgetData; mode: AttributeMode }) => {
  const nodeId = data?.nodeId;

  const nodeIdNotFound = (
    <Flex align="center" justify="center" p="24px">
      Node Id not found
    </Flex>
  );

  if (!nodeId) return nodeIdNotFound;

  if (mode === 'settings' && nodeId) return <SettingsPanel nodeId={nodeId} />;

  return null;
};
