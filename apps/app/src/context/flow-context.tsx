"use client";

import type { ProjectWithPages, User } from "@/types";
import { Icons } from "@v1/ui/icons";
import React, { useState } from "react";
import { createContext } from "react";

type NavigationBarMenuItem = {
  icon: React.ReactNode;
  title: string;
  key: string;
};

type AppContextType = {
  user: User;
  projectData: ProjectWithPages;
  setProjectData: React.Dispatch<React.SetStateAction<ProjectWithPages>>;
  navigationBarMenuItems: NavigationBarMenuItem[];
  activeNavBarItem: string;
  setActiveNavBarItem: React.Dispatch<React.SetStateAction<string>>;
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
  const navigationBarMenuItems: NavigationBarMenuItem[] = [
    {
      icon: <Icons.AppWindow />,
      title: "Visual Editor",
      key: "nav-bar-visual-editor",
    },
    {
      icon: <Icons.Workflow />,
      title: "Logic Builder",
      key: "nav-bar-logic-builder",
    },
    {
      icon: <Icons.Database />,
      title: "Schema Editor",
      key: "nav-bar-schema-editor",
    },
    {
      icon: <Icons.Layers />,
      title: "Component Builder",
      key: "nav-bar-component-builder",
    },
    { icon: <Icons.Globe />, title: "Marketplace", key: "nav-bar-marketplace" },
    { icon: <Icons.Cable />, title: "Connections", key: "nav-bar-connections" },
  ];

  const [projectData, setProjectData] =
    useState<ProjectWithPages>(projectWithPages);
  const [activeNavBarItem, setActiveNavBarItem] = useState<string>(
    "nav-bar-visual-editor",
  );

  return (
    <FlowContext.Provider
      value={{
        user,
        projectData,
        setProjectData,
        navigationBarMenuItems,
        activeNavBarItem,
        setActiveNavBarItem,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlowContext = () => {
  const context = React.useContext(FlowContext);
  if (context === undefined) {
    throw new Error("useFlowContext must be used within a FlowContextProvider");
  }
  return context;
};
