'use client';

import React, { useRef } from 'react';

import ResizablePanel from '../ui/resizable-panel';

import { Preview } from './preview';

export const PreviewPage = () => {
  const parentRef = useRef(null);

  return (
    <div ref={parentRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ResizablePanel localStorageKey="previewPanelSize" parentRef={parentRef}>
        <Preview />
      </ResizablePanel>
    </div>
  );
};
