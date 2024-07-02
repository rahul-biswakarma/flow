'use client';

import React, { createContext, useContext } from 'react';

interface ContainerPosition {
  left: number;
  top: number;
}

interface ContainerPositionContextType {}

const ContainerPositionContext = createContext<ContainerPositionContextType | undefined>(undefined);

export const ContainerPositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ContainerPositionContext.Provider value={{}}>{children}</ContainerPositionContext.Provider>;
};

export const useContainerPosition = (): ContainerPositionContextType => {
  const context = useContext(ContainerPositionContext);

  if (!context) {
    throw new Error('useContainerPosition must be used within a ContainerPositionProvider');
  }

  return context;
};
