'use client';

import React, { createContext, useContext, useState } from 'react';

interface RightPanelContextType {
  isOpen: boolean;
  data: Record<string, any> | null;
  openPanel: (panelData: Record<string, any>) => void;
  closePanel: () => void;
}

const RightPanelContext = createContext<RightPanelContextType | undefined>(undefined);

export const RightPanelProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Record<string, any> | null>(null);

  const openPanel = (panelData: Record<string, any>) => {
    setData(panelData);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setData(null);
  };

  return (
    <RightPanelContext.Provider value={{ isOpen, data, openPanel, closePanel }}>{children}</RightPanelContext.Provider>
  );
};

export const useRightPanel = () => {
  const context = useContext(RightPanelContext);

  if (context === undefined) {
    throw new Error('useRightPanel must be used within a RightPanelProvider');
  }

  return context;
};
