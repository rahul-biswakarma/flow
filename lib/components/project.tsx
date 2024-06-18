'use client';

import { Box, Separator } from '@radix-ui/themes';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { LeftPanel } from './left-panel/left-panel';
import { Canvas } from './canvas/canvas';

export const Product = async () => {
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
          <Canvas />
        </Panel>
      </PanelGroup>
    </Box>
  );
};
