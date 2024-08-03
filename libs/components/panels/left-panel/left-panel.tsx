'use client';

import { Grid } from '@radix-ui/themes';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { SessionPanel, ProjectPanel, ConfigPanel } from './panels';
import { PanelWrapper } from './common/panel-wrapper';

export const LeftPanel = ({ setIsLeftPanelCollapsed }: { setIsLeftPanelCollapsed: (value: boolean) => void }) => {
  const [isConfigPanelCollapsed, setIsConfigPanelCollapsed] = useState(false);

  return (
    <Grid
      gap="2"
      rows={isConfigPanelCollapsed ? '1fr max-content max-content' : '1fr minmax(auto, 40vh) max-content'}
      style={{
        backgroundColor: 'transparent',
        padding: '10px',
        paddingRight: '0px',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '370px',
        height: '100vh',
      }}
    >
      <AnimatePresence>
        <PanelWrapper>
          <ProjectPanel />
        </PanelWrapper>
        <PanelWrapper>
          <ConfigPanel isCollapsed={isConfigPanelCollapsed} setIsCollapsed={setIsConfigPanelCollapsed} />
        </PanelWrapper>
        <PanelWrapper>
          <SessionPanel setIsLeftPanelCollapsed={setIsLeftPanelCollapsed} />
        </PanelWrapper>
      </AnimatePresence>
    </Grid>
  );
};
