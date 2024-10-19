"use client";

import type { ProjectWithPages, User } from "@/types";
import React, { useState } from "react";
import { createContext } from "react";

type AppContextType = {
  user: User;
  projectData: ProjectWithPages;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectWithPages>>;
};

const FlowContext = createContext<AppContextType | undefined>(undefined);

interface FlowContextProviderProps {
  user: User;
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
}

export const FlowContextProvider = ({
  user,
  children,
  projectWithPages,
}: FlowContextProviderProps) => {
  const [projectData, setProjectData] = useState(projectWithPages);
  return (
    <FlowContext.Provider value={{ user, projectData, setProjectData }}>
      {children}
    </FlowContext.Provider>
  );
};

const useFlowContext = () => {
  const context = React.useContext(FlowContext);
  if (context === undefined) {
    throw new Error("useFlowContext must be used within a FlowContextProvider");
  }
  return context;
};
