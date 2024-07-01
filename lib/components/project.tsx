'use client';

import { Box } from '@radix-ui/themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FlowPage } from '../framework';
import { ContainerPositionProvider, RightPanelProvider } from '../context';

import { LeftPanel } from './left-panel/left-panel';
import { RightPanel } from './right-panel/right-panel';

export const Product = () => {
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
            }}
          >
            <LeftPanel />
            <ContainerPositionProvider>
              <FlowPage />
            </ContainerPositionProvider>
          </div>
        </DndProvider>
      </Box>
      <RightPanel />
    </RightPanelProvider>
  );
};
