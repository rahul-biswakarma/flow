'use client';

import React, { useRef } from 'react';

import { Preview } from './preview';

export const PreviewPage = () => {
  const parentRef = useRef(null);

  return (
    <div ref={parentRef} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Preview />
    </div>
  );
};
