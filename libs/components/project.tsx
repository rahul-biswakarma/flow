'use client';

import { Box } from '@radix-ui/themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { FlowContextProvider } from '../flow';
import { FloatingWidgetProvider } from '../context';

import { FloatingWidget, LeftPanel } from './panels';
import { Canvas } from './canvas/canvas';
import { CollapsedLeftPanel } from './panels/left-panel/collapsed-left-panel';

export const Product = () => {
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(
    localStorage.getItem('isLeftPanelCollapsed') === 'true' ? true : false,
  );

  useEffect(() => {
    localStorage.setItem('isLeftPanelCollapsed', isLeftPanelCollapsed.toString());
  }, [isLeftPanelCollapsed]);

  return (
    <FloatingWidgetProvider>
      <FlowContextProvider>
        <Box
          style={{
            height: '100vh',
          }}
        >
          <DndProvider backend={HTML5Backend}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isLeftPanelCollapsed ? '1fr' : 'auto 1fr',
                height: '100%',
              }}
            >
              <AnimatePresence>
                {!isLeftPanelCollapsed && <LeftPanel {...{ setIsLeftPanelCollapsed }} />}
              </AnimatePresence>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  isolation: 'isolate',
                }}
              >
                <AnimatePresence>
                  {isLeftPanelCollapsed && <CollapsedLeftPanel {...{ setIsLeftPanelCollapsed }} />}
                </AnimatePresence>
                <Canvas />
              </div>
            </div>
          </DndProvider>
        </Box>
        <FloatingWidget />
      </FlowContextProvider>
    </FloatingWidgetProvider>
  );
};
