import { Flex, Box, SegmentedControl } from '@radix-ui/themes';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { LeftPanelBottomSectionView } from '@/libs/types';

export const BottomSection = () => {
  const [view, setView] = useState<LeftPanelBottomSectionView>('config');

  return (
    <Flex direction="column">
      <Box p="2">
        <SegmentedControl.Root
          defaultValue="pages"
          style={{
            width: '100%',
          }}
          value={view}
          onValueChange={(view: LeftPanelBottomSectionView) => setView(view)}
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
          Config
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
