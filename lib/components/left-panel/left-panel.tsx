'use client';

import { Page } from '@prisma/client';

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable';

import { TopSection } from './top-section';

interface LeftPanelProps {
  pages: Page[];
}

export const LeftPanel = ({ pages }: LeftPanelProps) => {
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={60}>
          <TopSection pages={pages} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
