import { Separator } from '@radix-ui/themes';
import { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import { ViewToggler } from '../ui/view-toggler';
import { PreviewPage } from '../preview-page/preview-page';

import { CanvasViewMode, getWebNodeRendererByType } from '@/libs/types';
import { FlowPage } from '@/libs/flow';
import { useProjectContext } from '@/libs/context';

export const Canvas = () => {
  const [viewMode, setViewMode] = useState<CanvasViewMode>('node');
  const { currentPage } = useProjectContext();

  const flowPage = (
    <FlowPage getNodeRendererByType={getWebNodeRendererByType} watermarks={`${currentPage?.name}.tsx`} />
  );
  const previewPage = <PreviewPage />;

  return (
    <div>
      <ViewToggler setViewMode={setViewMode} viewMode={viewMode} />
      {viewMode === 'node' && flowPage}
      {viewMode === 'preview' && previewPage}
      {viewMode === 'node+preview' && (
        <PanelGroup autoSaveId="view-panel" direction="horizontal">
          <Panel defaultSize={50}>{flowPage}</Panel>
          <PanelResizeHandle>
            <Separator
              orientation="horizontal"
              size="4"
              style={{
                backgroundColor: 'var(--gray-3)',
                width: '2px',
                height: '100%',
              }}
            />
          </PanelResizeHandle>
          <Panel>{previewPage}</Panel>
        </PanelGroup>
      )}
    </div>
  );
};
