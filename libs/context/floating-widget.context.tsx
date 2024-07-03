'use client';

import React, { createContext, useContext, useState } from 'react';

export type FloatingWidgetMode = 'settings' | null;
export type FloatWidgetData = Record<string, any> | null;

interface FloatingWidgetContextType {
  isOpen: boolean;
  mode: FloatingWidgetMode;
  setMode: (mode: FloatingWidgetMode) => void;
  data: FloatWidgetData;
  openPanel: (panelData: FloatWidgetData, mode: FloatingWidgetMode) => void;
  closePanel: () => void;
}

const FloatingWidgetContext = createContext<FloatingWidgetContextType | undefined>(undefined);

export const FloatingWidgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<FloatingWidgetMode>(null);
  const [data, setData] = useState<FloatWidgetData>(null);

  const openPanel = (panelData: FloatWidgetData, mode: FloatingWidgetMode) => {
    setMode(mode);
    setData(panelData);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setData(null);
  };

  return (
    <FloatingWidgetContext.Provider value={{ isOpen, data, openPanel, closePanel, setMode, mode }}>
      {children}
    </FloatingWidgetContext.Provider>
  );
};

export const useFloatingWidget = () => {
  const context = useContext(FloatingWidgetContext);

  if (context === undefined) {
    throw new Error('useFloatingWidget must be used within a FloatingWidgetProvider');
  }

  return context;
};
