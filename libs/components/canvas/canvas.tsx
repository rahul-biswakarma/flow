import { Separator } from '@radix-ui/themes';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useHotkeys } from 'react-hotkeys-hook';

import { PreviewPage } from '../preview-page/preview-page';

import { getWebNodeRendererByType } from '@/libs/types';
import { FlowPage } from '@/libs/flow';
import { useProjectContext } from '@/libs/context';
import { useOnSave } from '@/libs/hooks/use-on-save';
import { HotKeys } from '@/libs/utils/hotkeys';

export const Canvas = () => {
  const { currentPage, project, viewMode } = useProjectContext();
  const onSave = useOnSave();

  useHotkeys(HotKeys.SAVE, onSave, {
    preventDefault: true,
  });

  const flowPage = (
    <FlowPage
      getNodeRendererByType={getWebNodeRendererByType}
      watermarks={`${project.name} / ${currentPage?.name}.tsx`}
    />
  );
  const previewPage = <PreviewPage />;

  return (
    <div>
      {viewMode === 'node' && flowPage}
      {viewMode === 'preview' && previewPage}
      {viewMode === 'both' && (
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
