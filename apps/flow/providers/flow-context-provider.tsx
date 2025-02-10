"use client";

import { ComponentBuilder } from "@flow/components/product/component-builder";
import { Connections } from "@flow/components/product/connections";
import { LogicBuilder } from "@flow/components/product/logic-builder";
import { Marketplace } from "@flow/components/product/marketplace";
import { SchemaEditor } from "@flow/components/product/schema-editor/schema-editor";
import { Settings } from "@flow/components/product/settings";
import { VisualBuilder } from "@flow/components/product/visual-builder";
import type { ProjectWithPages, User } from "@flow/data-layer/types";
import { useScopedI18n } from "@flow/locales/client";
import { Icons } from "@ren/ui/icons";

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

  const scopedT = useScopedI18n("navigation_bar");

  const navigationBarMenuItems: NavigationBarMenuItem[] = [
    {
      icon: <Icons.LayoutGridAdd />,
      title: scopedT("visual_editor"),
      component: <VisualBuilder />,
      key: "nav-bar-visual-editor",
    },
    {
      icon: <Icons.Sitemap />,
      title: scopedT("logic_builder"),
      key: "nav-bar-logic-builder",
      component: <LogicBuilder />,
    },
    {
      icon: <Icons.Database />,
      title: scopedT("schema_editor"),
      key: "nav-bar-schema-editor",
      component: <SchemaEditor />,
    },
    {
      icon: <Icons.Box />,
      title: scopedT("component_builder"),
      key: "nav-bar-component-builder",
      component: <ComponentBuilder />,
    },
    {
      icon: <Icons.World />,
      title: scopedT("marketplace"),
      key: "nav-bar-marketplace",
      component: <Marketplace />,
    },
    {
      icon: <Icons.Bolt />,
      title: scopedT("connections"),
      key: "nav-bar-connections",
      component: <Connections />,
    },
    {
      icon: <Icons.Settings />,
      title: scopedT("setting"),
      key: "nav-bar-setting",
      component: <Settings />,
    },
  ];

  useEffect(() => {
    if (projectWithPages && projectWithPages?.id !== projectData?.id)
      setProjectData(projectWithPages);
  }, [projectWithPages, projectData?.id]);

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
