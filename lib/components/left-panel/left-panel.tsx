'use client';

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable';

import { TopSection } from './sections/top-section';

export const LeftPanel = () => {
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <TopSection />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
