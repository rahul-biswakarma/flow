'use client';

import { Box, Separator } from '@radix-ui/themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import { FlowPage } from '../framework';
import { ContainerPositionProvider, RightPanelProvider } from '../context';

import { LeftPanel } from './left-panel/left-panel';
import { RightPanel } from './right-panel/right-panel';
import { Preview } from './preview/preview';
import { CanvasViewMode } from './type';
import { ViewToggler } from './view-toggler';

export const Product = () => {
  const [viewMode, setViewMode] = useState<CanvasViewMode>('node');

  return (
    <RightPanelProvider>
      <Box
        style={{
          height: '100vh',
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 3fr',
              height: '100%',
            }}
          >
            <LeftPanel />
            <ContainerPositionProvider>
              <Box
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <ViewToggler setViewMode={setViewMode} viewMode={viewMode} />
                {viewMode === 'node' && <FlowPage />}
                {viewMode === 'preview' && <Preview />}
                {viewMode === 'node+preview' && (
                  <PanelGroup autoSaveId="view-panel" direction="horizontal">
                    <Panel defaultSize={50}>
                      <FlowPage />
                    </Panel>
                    <PanelResizeHandle>
                      <Separator
                        size="4"
                        style={{
                          backgroundColor: 'var(--gray-3)',
                        }}
                      />
                    </PanelResizeHandle>
                    <Panel>
                      <Preview />
                    </Panel>
                  </PanelGroup>
                )}
              </Box>
            </ContainerPositionProvider>
          </div>
        </DndProvider>
      </Box>
      <RightPanel />
    </RightPanelProvider>
  );
};
