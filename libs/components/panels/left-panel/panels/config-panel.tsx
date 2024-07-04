import { Flex, Box, SegmentedControl } from '@radix-ui/themes';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { ProjectConfigWidget } from '../widgets';

import { LeftPanelConfigView } from '@/libs/types';

export const ConfigPanel = () => {
  const [view, setView] = useState<LeftPanelConfigView>('config');

  return (
    <Flex direction="column">
      <Box p="2">
        <SegmentedControl.Root
          defaultValue="pages"
          style={{
            width: '100%',
          }}
          value={view}
          onValueChange={(view: LeftPanelConfigView) => setView(view)}
        >
          <SegmentedControl.Item value="config">Config</SegmentedControl.Item>
          <SegmentedControl.Item value="setting">Setting</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>

      <AnimatePresence>
        <Box
          style={{
            padding: '10px',
            display: view === 'config' ? 'block' : 'none',
          }}
        >
          <ProjectConfigWidget />
        </Box>
        <Box
          style={{
            padding: '10px',
            display: view === 'setting' ? 'block' : 'none',
          }}
        >
          Setting
        </Box>
      </AnimatePresence>
    </Flex>
  );
};
