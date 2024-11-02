"use client";

import { ComponentBuilder } from "@/components/product/component-builder/component-builder";
import { Connections } from "@/components/product/connections/connections";
import { LogicBuilder } from "@/components/product/logic-builder/logic-builder";
import { Marketplace } from "@/components/product/marketplace/marketplace";
import { SchemaEditor } from "@/components/product/schema-editor/schema-editor";
import { Settings } from "@/components/product/settings/settings";
import { VisualEditor } from "@/components/product/visual-editor/visual-editor";
import type { ProjectWithPages, User } from "@/types";
import { Icons } from "@v1/ui/icons";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

type NavigationBarMenuItem = {
  icon: React.ReactNode;
  title: string;
  key: string;
  component: React.ReactNode;
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

const navigationBarMenuItems: NavigationBarMenuItem[] = [
  {
    icon: <Icons.AppWindow />,
    title: "visual_editor",
    component: <VisualEditor />,
    key: "nav-bar-visual-editor",
  },
  {
    icon: <Icons.Workflow />,
    title: "logic_builder",
    key: "nav-bar-logic-builder",
    component: <LogicBuilder />,
  },
  {
    icon: <Icons.Database />,
    title: "schema_editor",
    key: "nav-bar-schema-editor",
    component: <SchemaEditor />,
  },
  {
    icon: <Icons.Layers />,
    title: "component_builder",
    key: "nav-bar-component-builder",
    component: <ComponentBuilder />,
  },
  {
    icon: <Icons.Globe />,
    title: "marketplace",
    key: "nav-bar-marketplace",
    component: <Marketplace />,
  },
  {
    icon: <Icons.Cable />,
    title: "connections",
    key: "nav-bar-connections",
    component: <Connections />,
  },
  {
    icon: <Icons.Settings />,
    title: "setting",
    key: "nav-bar-setting",
    component: <Settings />,
  },
];
