'use client';
import { createContext, useContext, useState } from 'react';

import { PreviewScaleType } from '../types';

export type PreviewType = 'hide' | 'same_tab' | 'new_tab';

type PreviewContextType = {
  previewPanelType: PreviewType;
  previewScale: PreviewScaleType;
  togglePreviewPanel: (value: PreviewType) => void;
  setPreviewScale: (value: PreviewScaleType) => void;
};

const PreviewContext = createContext<PreviewContextType | null>(null);

export const PreviewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [previewScale, setPreviewScale] = useState<PreviewScaleType>('100%');
  const [previewPanelType, setPreviewPanelType] = useState<PreviewType>('hide');

  const togglePreviewPanel = (value: PreviewType) => {
    setPreviewPanelType(value);
  };

  return (
    <PreviewContext.Provider value={{ previewScale, previewPanelType, togglePreviewPanel, setPreviewScale }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreviewContext = () => {
  const context = useContext(PreviewContext);

  if (!context) {
    throw new Error('usePreviewContext must be used within a PreviewContextProvider');
  }

  return context;
};
