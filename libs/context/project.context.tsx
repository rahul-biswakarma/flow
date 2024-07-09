'use client';

import { createContext, useContext, useState } from 'react';
import { Page, Project } from '@prisma/client';

import { CanvasViewMode } from '../types';
import { FlowContextProvider } from '../flow';
import { defaultProjectConfig } from '../constants';

type ProjectWithPages = Project & {
  pages: Page[];
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

  viewMode: CanvasViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<CanvasViewMode>>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectContextProviderProps = {
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
};

export const ProjectContextProvider = ({ children, projectWithPages }: ProjectContextProviderProps) => {
  const isProjectConfigEmpty = projectWithPages.config && Object.keys(projectWithPages.config).length === 0;

  const [project, setProject] = useState<ProjectWithPages>(projectWithPages);
  const [projectConfig, setProjectConfig] = useState<any>(
    isProjectConfigEmpty ? JSON.parse(projectWithPages.config) : defaultProjectConfig,
  );
  const [viewMode, setViewMode] = useState<CanvasViewMode>('both');
  const [currentPageId, setCurrentPageId] = useState<string>(project?.pages[0]?.id ?? '');

  const currentPage = project.pages.find((page) => page.id === currentPageId);
  const currentPagesConfig = currentPage?.config as string;
  const currentPagesConfigParsed = currentPagesConfig ? JSON.parse(currentPagesConfig) : {};

  return (
    <ProjectContext.Provider
      value={{
        project,
        defaultProjectConfig,
        setProject,
        currentPageId,
        setCurrentPageId,
        projectConfig,
        setProjectConfig,
        viewMode,
        setViewMode,
        currentPage,
      }}
    >
      <FlowContextProvider edges={currentPagesConfigParsed.edges} nodes={currentPagesConfigParsed?.nodes}>
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
