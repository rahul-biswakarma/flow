import { Box, Flex, SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { LeftPanelTopSectionView } from '../type';

import { ListPage } from './containers/pages/page-list';
import { ComponentList } from './containers/components/component-list';

export const TopSection = () => {
  const [view, setView] = useState<LeftPanelTopSectionView>('pages');

  return (
    <Flex direction="column">
      <Box p="2">
        <SegmentedControl.Root
          defaultValue="pages"
          style={{
            width: '100%',
          }}
          value={view}
          onValueChange={(view: LeftPanelTopSectionView) => setView(view)}
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
          <ListPage />
        </Box>
        <Box
          style={{
            display: view === 'components' ? 'block' : 'none',
          }}
        >
          <ComponentList />
        </Box>
      </AnimatePresence>
    </Flex>
  );
};
