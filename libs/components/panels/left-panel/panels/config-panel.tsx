import { Flex, Box, SegmentedControl, ScrollArea, Text, Button } from '@radix-ui/themes';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconChevronUp, IconSettings } from '@tabler/icons-react';

import { ProjectConfigWidget } from '../widgets';

import { LeftPanelConfigView } from '@/libs/types';

export const ConfigPanel = () => {
  const [view, setView] = useState<LeftPanelConfigView>('config');
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) return <CollapsedConfigPanel {...{ setIsCollapsed }} />;

  return (
    <Flex direction="column" style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
      <Box p="2">
        <SegmentedControl.Root
          defaultValue="pages"
          style={{ width: '100%' }}
          value={view}
          onValueChange={(view: LeftPanelConfigView) => setView(view)}
        >
          <SegmentedControl.Item value="config">Config</SegmentedControl.Item>
          <SegmentedControl.Item value="setting">Setting</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>

      <ScrollArea>
        <Box p="3" style={{ flex: 1, overflow: 'auto' }}>
          <AnimatePresence>
            <Box
              style={{
                display: view === 'config' ? 'block' : 'none',
              }}
            >
              <ProjectConfigWidget />
            </Box>
            <Box
              style={{
                display: view === 'setting' ? 'block' : 'none',
              }}
            >
              Setting
            </Box>
          </AnimatePresence>
        </Box>
      </ScrollArea>
    </Flex>
  );
};

const CollapsedConfigPanel = ({ setIsCollapsed }: { setIsCollapsed: (value: boolean) => void }) => {
  return (
    <Flex
      align="center"
      gap="2"
      justify="between"
      p="3"
      style={{
        color: 'var(--gray-9)',
      }}
    >
      <Flex align="center" gap="2" justify="start">
        <IconSettings size="20px" />
        <Text>Project Settings</Text>
      </Flex>
      <Button color="gray" variant="ghost" onClick={() => setIsCollapsed(false)}>
        <IconChevronUp
          size="20px"
          style={{
            color: 'var(--gray-9)',
          }}
        />
      </Button>
    </Flex>
  );
};
