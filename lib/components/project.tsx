import { Canvas } from './canvas/canvas';
import { LeftPanel } from './left-panel/left-panel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui';

export const Product = async () => {
  return (
    <div className="flex h-full w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Canvas />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
