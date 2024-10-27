"use client";

import { useScopedI18n } from "@/locales/client";
import type { ProjectWithPages, User } from "@/types";
import { Icons } from "@v1/ui/icons";
import React, { useEffect, useState } from "react";
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
  const navigationScopedT = useScopedI18n("navigation_bar");
  const navigationBarMenuItems: NavigationBarMenuItem[] = [
    {
      icon: <Icons.AppWindow />,
      title: navigationScopedT("visual_editor"),
      key: "nav-bar-visual-editor",
    },
    {
      icon: <Icons.Workflow />,
      title: navigationScopedT("logic_builder"),
      key: "nav-bar-logic-builder",
    },
    {
      icon: <Icons.Database />,
      title: navigationScopedT("schema_editor"),
      key: "nav-bar-schema-editor",
    },
    {
      icon: <Icons.Layers />,
      title: navigationScopedT("component_builder"),
      key: "nav-bar-component-builder",
    },
    {
      icon: <Icons.Globe />,
      title: navigationScopedT("marketplace"),
      key: "nav-bar-marketplace",
    },
    {
      icon: <Icons.Cable />,
      title: navigationScopedT("connections"),
      key: "nav-bar-connections",
    },
    {
      icon: <Icons.Settings />,
      title: navigationScopedT("setting"),
      key: "nav-bar-setting",
    },
  ];

  const [projectData, setProjectData] =
    useState<ProjectWithPages>(projectWithPages);
  const [activeNavBarItem, setActiveNavBarItem] = useState<string>(
    "nav-bar-visual-editor",
  );

  useEffect(() => {
    if (projectWithPages && projectWithPages?.id !== projectData?.id)
      setProjectData(projectWithPages);
  }, [projectWithPages]);

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
