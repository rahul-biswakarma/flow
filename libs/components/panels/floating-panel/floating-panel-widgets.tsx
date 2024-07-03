'use client';

import { Flex } from '@radix-ui/themes';

import { SettingsPanel } from '../settings-panel';

import { FloatWidgetData, FloatingWidgetMode } from '@/libs/context';

export const FloatingWidgetContent = ({ data, mode }: { data: FloatWidgetData; mode: FloatingWidgetMode }) => {
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
