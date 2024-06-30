'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ContainerPosition {
  left: number;
  top: number;
}

interface ContainerPositionContextType {
  containerPosition: ContainerPosition | null;
  updateContainerPosition: (left: number, top: number) => void;
}

const ContainerPositionContext = createContext<ContainerPositionContextType | undefined>(undefined);

export const ContainerPositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [containerPosition, setContainerPosition] = useState<ContainerPosition | null>(null);

  const updateContainerPosition = useCallback((left: number, top: number) => {
    setContainerPosition({ left, top });
  }, []);

  return (
    <ContainerPositionContext.Provider value={{ containerPosition, updateContainerPosition }}>
      {children}
    </ContainerPositionContext.Provider>
  );
};

export const useContainerPosition = (): ContainerPositionContextType => {
  const context = useContext(ContainerPositionContext);

  if (!context) {
    throw new Error('useContainerPosition must be used within a ContainerPositionProvider');
  }

  return context;
};
