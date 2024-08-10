'use client';

import React, { createContext, useContext, useState } from 'react';

export type AttributeMode = 'settings' | null;
export type FloatWidgetData = Record<string, any> | null;

interface AttributeContextType {
  isOpen: boolean;
  mode: AttributeMode;
  setMode: (mode: AttributeMode) => void;
  data: FloatWidgetData;
  openPanel: (panelData: FloatWidgetData, mode: AttributeMode) => void;
  closePanel: () => void;
}

const AttributeContext = createContext<AttributeContextType | undefined>(undefined);

export const AttributeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AttributeMode>(null);
  const [data, setData] = useState<FloatWidgetData>(null);

  const openPanel = (panelData: FloatWidgetData, mode: AttributeMode) => {
    setMode(mode);
    setData(panelData);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setData(null);
  };

  return (
    <AttributeContext.Provider value={{ isOpen, data, openPanel, closePanel, setMode, mode }}>
      {children}
    </AttributeContext.Provider>
  );
};

export const useAttribute = () => {
  const context = useContext(AttributeContext);

  if (context === undefined) {
    throw new Error('useAttribute must be used within a AttributeProvider');
  }

  return context;
};
