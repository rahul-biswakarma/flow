import { Box, Flex, SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { PagesWidget, ComponentsWidget } from '../widgets';

import { LeftPanelProjectView } from '@/libs/types';

export const ProjectPanel = () => {
  const [view, setView] = useState<LeftPanelProjectView>('pages');

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
    </Flex>
  );
};
