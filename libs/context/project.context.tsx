'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { Page, Project, SeoModel } from '@prisma/client';

import { FlowContextProvider } from '../flow';
import { defaultProjectConfig } from '../constants';

type ProjectWithPages = Project & {
  pages: (Page & { seo: SeoModel })[];
};

type ProjectContextType = {
  project: ProjectWithPages;
  setProject: React.Dispatch<React.SetStateAction<ProjectWithPages>>;
  projectConfig: any;
  setProjectConfig: React.Dispatch<React.SetStateAction<any>>;
  defaultProjectConfig: any;
  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;
  currentPage: Page | undefined;
  currentPageConfig: any;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectContextProviderProps = {
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
};

export const ProjectContextProvider = ({ children, projectWithPages }: ProjectContextProviderProps) => {
  const [project, setProject] = useState<ProjectWithPages>(projectWithPages);
  const [projectConfig, setProjectConfig] = useState<any>(() => {
    const isProjectConfigEmpty = projectWithPages.config && Object.keys(projectWithPages.config).length === 0;

    return isProjectConfigEmpty ? JSON.parse(projectWithPages.config) : defaultProjectConfig;
  });
  const [currentPageId, setCurrentPageId] = useState<string>(() => project?.pages[0]?.id ?? '');

  const currentPage = useMemo(
    () => project.pages.find((page) => page.id === currentPageId),
    [project.pages, currentPageId],
  );

  const currentPageConfig = useMemo(() => {
    if (currentPage?.config) {
      try {
        return JSON.parse(currentPage.config as string);
      } catch (error) {
        return {};
      }
    }

    return {};
  }, [currentPage, currentPageId]);

  const contextValue = useMemo(
    () => ({
      project,
      setProject,
      projectConfig,
      setProjectConfig,
      defaultProjectConfig,
      currentPageId,
      setCurrentPageId,
      currentPage,
      currentPageConfig,
    }),
    [project, projectConfig, currentPageId, currentPage, currentPageConfig],
  );

  return (
    <ProjectContext.Provider value={contextValue}>
      <FlowContextProvider edges={currentPageConfig.edges ?? undefined} nodes={currentPageConfig.nodes ?? undefined}>
        {children}
      </FlowContextProvider>
    </ProjectContext.Provider>
  );
};

export function useProjectContext() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectContextProvider');
  }

  return context;
}
