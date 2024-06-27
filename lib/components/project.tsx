'use client';

import { Box, Separator } from '@radix-ui/themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </Box>
  );
};
