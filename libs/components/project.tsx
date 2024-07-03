'use client';

import { Box } from '@radix-ui/themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';

import { FlowContextProvider } from '../flow';
import { RightPanelProvider } from '../context';
import { CanvasViewMode } from '../types';

import { RightPanel } from './panels/floating-panel/right-panel';
import { LeftPanel } from './panels';
import { Canvas } from './canvas/canvas';

export const Product = () => {
  return (
    <RightPanelProvider>
      <Box
        style={{
          height: '100vh',
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <FlowContextProvider>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                height: '100%',
              }}
            >
              <LeftPanel />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  isolation: 'isolate',
                }}
              >
                <Canvas />
              </div>
            </div>
          </FlowContextProvider>
        </DndProvider>
      </Box>
      <RightPanel />
    </RightPanelProvider>
  );
};
