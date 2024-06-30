'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { Page, Project } from '@prisma/client';

import { EdgeType, NodeType, ProjectConfig } from '../types';

type ProjectWithPages = Project & {
  pages: Page[];
};

type ProjectContextType = {
  project: ProjectWithPages;
  setProject: React.Dispatch<React.SetStateAction<ProjectWithPages>>;

  projectConfig: ProjectConfig;
  setProjectConfig: React.Dispatch<React.SetStateAction<ProjectConfig>>;

  currentPageId: string;
  setCurrentPageId: React.Dispatch<React.SetStateAction<string>>;

  edges: EdgeType[];
  setEdges: React.Dispatch<React.SetStateAction<EdgeType[]>>;

  nodes: Record<string, NodeType>;
  setNodes: React.Dispatch<React.SetStateAction<Record<string, NodeType>>>;

  deleteNode: (nodeId: string) => void;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

type ProjectContextProviderProps = {
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
};

export const ProjectContextProvider = ({ children, projectWithPages }: ProjectContextProviderProps) => {
  const [project, setProject] = useState<ProjectWithPages>(projectWithPages);
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    defaultUnit: 'px',
  });
  const [currentPageId, setCurrentPageId] = useState<string>(project?.pages[0]?.id ?? '');

  const [nodes, setNodes] = useState<Record<string, NodeType>>({});
  const [edges, setEdges] = useState<EdgeType[]>([]);

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((prevNodes) => {
        const newNodes = { ...prevNodes };

        delete newNodes[nodeId];

        return newNodes;
      });

      setEdges((prevEdges) => {
        return prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
      });
    },
    [setNodes, setEdges],
  );

  // useEffect(() => {
  //   const currentPage = project.pages.find((page) => page.id === currentPageId);

  //   if (!currentPage) return;

  //   try {
  //     const data = JSON.parse(currentPage.data);

  //     setNodes(data.nodes);
  //     setEdges(data.edges);
  //   } catch {
  //     setNodes([]);
  //     setEdges([]);
  //   }
  // }, [currentPageId, project.pages, setNodes, setEdges]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        currentPageId,
        setCurrentPageId,
        projectConfig,
        setProjectConfig,
        nodes,
        setNodes,
        edges,
        setEdges,
        deleteNode,
      }}
    >
      {children}
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
