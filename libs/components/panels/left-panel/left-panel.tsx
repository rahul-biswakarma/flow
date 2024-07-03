'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Box, Separator } from '@radix-ui/themes';

import { TopSection } from './sections/top-section';

export const LeftPanel = () => {
  return (
    <Box style={{ padding: '10px', paddingRight: '0px', zIndex: 10 }}>
      <PanelGroup
        autoSaveId="left-panel"
        direction="vertical"
        style={{
          minWidth: '350px',
          backgroundColor: 'var(--gray-surface)',
          borderRadius: 'var(--radius-4)',
          border: '1px solid var(--gray-4)',
        }}
      >
        <Panel defaultSize={60}>
          <TopSection />
        </Panel>
        <PanelResizeHandle>
          <Separator
            size="4"
            style={{
              backgroundColor: 'var(--gray-3)',
            }}
          />
        </PanelResizeHandle>
        <Panel>Two</Panel>
      </PanelGroup>{' '}
    </Box>
  );
};
