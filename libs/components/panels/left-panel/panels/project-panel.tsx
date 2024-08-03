import { Box, Flex, ScrollArea, SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { PagesWidget, ComponentsWidget } from '../widgets';

import { LeftPanelProjectView } from '@/libs/types';

export const ProjectPanel = () => {
  const [view, setView] = useState<LeftPanelProjectView>('components');

  return (
    <Flex direction="column">
      <Box p="2">
        <SegmentedControl.Root
          defaultValue="pages"
          style={{
            width: '100%',
          }}
          value={view}
          onValueChange={(view: LeftPanelProjectView) => setView(view)}
        >
          <SegmentedControl.Item value="pages">Pages</SegmentedControl.Item>
          <SegmentedControl.Item value="components">Components</SegmentedControl.Item>
        </SegmentedControl.Root>
      </Box>
      <ScrollArea>
        <Box style={{ flex: 1, overflow: 'auto' }}>
          <AnimatePresence>
            <Box
              style={{
                display: view === 'pages' ? 'block' : 'none',
              }}
            >
              <PagesWidget />
            </Box>
            <Box
              style={{
                display: view === 'components' ? 'block' : 'none',
              }}
            >
              <ComponentsWidget />
            </Box>
          </AnimatePresence>
        </Box>
      </ScrollArea>
    </Flex>
  );
};
