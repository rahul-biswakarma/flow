import React, { createContext, useState } from "react";
import type {
  VisualBuilderComponent,
  VisualBuilderContainer,
  VisualBuilderContextType,
} from "./types";

const VisualBuilderContext = createContext<VisualBuilderContextType>(
  {} as VisualBuilderContextType,
);

export const VisualBuilderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vbData, setVbData] = useState<VisualBuilderContainer[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<VisualBuilderComponent | null>(null);
  const [selectedContainer, setSelectedContainer] =
    useState<VisualBuilderContainer | null>(null);

  const value: VisualBuilderContextType = {
    vbData,
    setVbData,
    selectedComponent,
    setSelectedComponent,
    selectedContainer,
    setSelectedContainer,
  };

  return (
    <VisualBuilderContext.Provider value={value}>
      {children}
    </VisualBuilderContext.Provider>
  );
};

export const useVisualBuilderContext = () => {
  const context = React.useContext(VisualBuilderContext);
  if (context === undefined) {
    throw new Error(
      "useVisualBuilderContext must be used within a VisualBuilderContext",
    );
  }
  return context;
};
