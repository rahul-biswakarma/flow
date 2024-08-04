import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { Box } from '@radix-ui/themes';

import '@/libs/styles/resizeable-handle.css';

import { Preview } from '../../preview-page/preview';

import { PreviewHeader } from './preview-header';

import { useResizeableBox } from '@/libs/hooks';
import { PreviewScaleType } from '@/libs/types';

const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;
const LOCAL_STORAGE_KEY = 'preview_panel_size';

export const PreviewPanel = ({ style, panelMargin }: { style?: React.CSSProperties; panelMargin: number }) => {
  const [previewScale, setPreviewScale] = useState<PreviewScaleType>('100%');

  const { size, handleResizeStop, maxHeight, maxWidth } = useResizeableBox({
    panelMargin,
    isPreserveEnabled: false,
    storageKey: LOCAL_STORAGE_KEY,
  });

  return (
    <ResizableBox
      height={size.height}
      maxConstraints={[maxWidth, maxHeight]}
      minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
      resizeHandles={['s', 'w', 'sw']}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        right: panelMargin + 'px',
        top: panelMargin + 'px',
        border: '1px solid var(--gray-4)',
        borderRadius: 'var(--radius-4)',
        backgroundColor: 'var(--gray-surface)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        isolation: 'isolate',
        zIndex: 'auto',
        ...style,
      }}
      width={size.width}
      onResizeStop={handleResizeStop}
    >
      <PreviewHeader {...{ previewScale, setPreviewScale }} />
      <Box
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          paddingLeft: 'var(--handler-width)',
          paddingBottom: 'var(--handler-width)',
        }}
      >
        <Preview />
      </Box>
    </ResizableBox>
  );
};
