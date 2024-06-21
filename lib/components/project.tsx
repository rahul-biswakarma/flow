'use client';

import { Box, Separator } from '@radix-ui/themes';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { FlowPage } from '../framework';

import { LeftPanel } from './left-panel/left-panel';

export const Product = () => {
  return (
    <Box
      style={{
        height: '100vh',
      }}
    >
      <PanelGroup autoSaveId="project-container" direction="horizontal">
        <Panel defaultSize={25}>
          <LeftPanel />
        </Panel>
        <PanelResizeHandle>
          <Separator
            orientation="vertical"
            size="4"
            style={{
              backgroundColor: 'var(--gray-3)',
            }}
          />
        </PanelResizeHandle>
        <Panel>
          <FlowPage />
        </Panel>
      </PanelGroup>
    </Box>
  );
};
