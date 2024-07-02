'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Separator } from '@radix-ui/themes';

import { TopSection } from './sections/top-section';

export const LeftPanel = () => {
  return (
    <PanelGroup
      autoSaveId="left-panel"
      direction="vertical"
      style={{
        backgroundColor: 'var(--gray-surface)',
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
    </PanelGroup>
  );
};
