'use client';

import { Box } from '@radix-ui/themes';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { useHotkeys } from 'react-hotkeys-hook';

import { FloatingWidgetProvider, useProjectContext } from '../context';
import { FlowPage } from '../flow';
import { useOnSave } from '../hooks/use-on-save';
import { getWebNodeRendererByType } from '../types';
import { HotKeys } from '../utils/hotkeys';

import { CollapsedLeftPanel } from './panels/left-panel/collapsed-left-panel';
import { FloatingWidget, LeftPanel, PreviewPanel } from './panels';

const PANEL_MARGIN = 10;

export const Product = () => {
  const { currentPage, project } = useProjectContext();
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(
    localStorage.getItem('isLeftPanelCollapsed') === 'true' ? true : false,
  );

  useEffect(() => {
    localStorage.setItem('isLeftPanelCollapsed', isLeftPanelCollapsed.toString());
  }, [isLeftPanelCollapsed]);

  const onSave = useOnSave();

  useHotkeys(HotKeys.SAVE, onSave, {
    preventDefault: true,
  });

  const flowPage = (
    <FlowPage
      getNodeRendererByType={getWebNodeRendererByType}
      watermarks={
        <span
          style={{
            color: 'var(--indigo-10)',
            textTransform: 'lowercase',
            fontSize: '13px',
          }}
        >
          {currentPage?.name}.tsx
        </span>
      }
    />
  );

  let leftPanel = <CollapsedLeftPanel {...{ setIsLeftPanelCollapsed }} />;

  if (!isLeftPanelCollapsed) {
    leftPanel = <LeftPanel {...{ setIsLeftPanelCollapsed }} />;
  }

  return (
    <FloatingWidgetProvider>
      <AnimatePresence>
        <Box
          style={{
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <DndProvider backend={HTML5Backend}>
            <div
              style={{
                height: '100%',
                isolation: 'isolate',
                zIndex: 'auto',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  isolation: 'isolate',
                  zIndex: 5,
                }}
              >
                {flowPage}
              </div>

              <PreviewPanel
                panelMargin={PANEL_MARGIN}
                style={{
                  isolation: 'isolate',
                  zIndex: 10,
                }}
              />

              <div
                style={{
                  isolation: 'isolate',
                  zIndex: 20,
                }}
              >
                {leftPanel}
              </div>
            </div>
          </DndProvider>
        </Box>
      </AnimatePresence>
      <FloatingWidget />
    </FloatingWidgetProvider>
  );
};
